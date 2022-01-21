// NETLIFY function to call a github repositry-dispatch Web hook 
// when a Netlify form submission occurs
//

const https = require('https')
const crypto = require('crypto');

function parseSubmission(payload){
    const {
        number,
        created_at, 
        form_name : name,
        data: {
            ip, user_agent, // ignore these as sensitive 
            referrer,
            ...data 
            }
        } = payload
    const meta = { id: crypto.randomUUID(), name, number, created_at, referrer }
    return { meta, ...data }
}

function callGitHubWebhook(formData)
{
    const reqBody =
    `{
        "event_type": "netlify-form-submission",
        "client_payload": 
            ${JSON.stringify(formData)}
    }`

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/w3c/wai-course-list/dispatches',
        method: 'POST',
        headers: {
            'User-Agent': 'W3C WAI Website list',
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
            'Content-Length': reqBody.length
        }        
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let respBody = '';
            res.on('data', (chunk) => (respBody += chunk.toString()))
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({statusCode: res.statusCode, headers: res.headers, body: respBody})
                } else {
                    reject(`GitHub request failed. status: ${res.statusCode} body: ${respBody}`)
                }
            });
        })

        req.on('error', error => {
            console.error(error)
            reject( {
                statusCode: 500,
                body: `Error calling GitHub action - ${error}`
            })
        })    
    
        req.write(reqBody)
        req.end()
    })
}

exports.handler = async function(event, context) {
    let body
    try { 
        body = JSON.parse(event.body)
    } catch(e) { 
        console.error(`Invalid JSON payload: ${event.body}`)
        return {
            statusCode: 500,
            body: 'Invalid JSON payload'
        };
    }
    
    const formData = parseSubmission(body.payload);

    return await(callGitHubWebhook(formData))
}
