const https = require('https')

exports.handler = async function(event, context) {

    let payload
    try { 
        payload = JSON.parse(event.body)
    } catch(e) { 
        console.error(`Invalid JSON payload: ${event.body}`)
        return {
            statusCode: 500,
            body: 'Invalid JSON payload'
        };
    }
    const formData = payload.data
    const body =
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
            'Content-Length': body.length
        }        
    }

    const gitHubRequest = new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let body = '';
            res.on('data', (chunk) => (body += chunk.toString()));
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({statusCode: res.statusCode, headers: res.headers, body: body});
                } else {
                    reject('GitHub request failed. status: ' + res.statusCode + ', body: ' + body);
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
    
        req.write(body)
        req.end()
    })

    return await(gitHubRequest)
}
