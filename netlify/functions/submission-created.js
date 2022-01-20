const https = require('https')

exports.handler = async function(event, context) {

    let body
    try { 
        body = JSON.parse(event.body)
        console.info(body)
    } catch(e) { 
        console.error(`Invalid JSON payload: ${event.body}`)
        return {
            statusCode: 500,
            body: 'Invalid JSON payload'
        };
    }

    const {
        number: form_number,
        created_at: form_created_at, 
        form_name,
        data: {
            'submitter-name':submitter_name,
            'submitter-email' :submitter_email,
            ip, user_agent, referrer,  // scratch these
            ...data 
            }
        } = body.payload
   // const {'submitter-name':submitter_name, 'submitter-email' :submitter_email, ip, user_agent, referrer, ...data} = payload.data
    const private = { submitter_name, submitter_email }
    const public = { form_number, form_created_at, form_name, data }
    const formData = { provate, public }

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

    const gitHubRequest = new Promise((resolve, reject) => {
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

    return await(gitHubRequest)
}
