// NETLIFY function to call a github repositry-dispatch Web hook 
// when a Netlify form submission occurs

const https = require('https')
const { v1: uuidv1 } = require('uuid')  // use vq, timebased so unique each call

function parseSubmission(payload){
    const {
        number,
        created_at, 
        form_name : name,
        data: {
            ip, user_agent, // ignore these as sensitive 
            'form-id': form_id,
            referrer,
            ...data 
            }
        } = payload
    const UUID = form_id || uuidv1()    // new id if not in form - v1 date based to avoid dupications
    const meta = { id: UUID, name, number, created_at, referrer }
    return { meta, form: {...data} }
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
            let respBody = ''
            res.on('data', (chunk) => (respBody += chunk.toString()))
            res.on('end', () => {
                    resolve({statusCode: res.statusCode, headers: res.headers, body: respBody})
                })
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
        }
    }

    let formData
    try {
        formData = parseSubmission(body.payload)
    }
    catch(e) {
        return {
            statusCode: 500,
            body: 'Payload is missing fields'
        }        
    }

    const res = await(callGitHubWebhook(formData))
    
    const success = (res.statusCode >= 200 && res.statusCode <= 299)
    console.info(`Form '${formData.meta.name}' ${success ? 'processed' : 'processing failed'}, ${res.body}, ${formData.meta.referrer}`)

    return res
}
