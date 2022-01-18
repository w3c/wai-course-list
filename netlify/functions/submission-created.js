const https = require('https')

exports.handler = async function(event, context) {

    var payload
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

    console.log("running")

    const body= `{
        "event_type": "netlify-form-submission",
        "client_payload": 
            ${JSON.stringify(formData)}`

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/w3c/wai-course-list/dispatches',
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
            'Content-Length': body.length
        }        
    }

    // TODO maybe promisify so we can return the final outcome(s)
    const req = https.request(options, res => {
        console.log(`Github statusCode: ${res.statusCode}`)
        res.on('data', d => {
            console.info(d.toString())
        })
    })
        
    req.on('error', error => {
        console.error(error)
        return {
            statusCode: 500,
            body: `Error calling GitHub action - ${error}`
        };
    })    
  
    req.write(body)
    req.end()
    
    return {
        statusCode: 200,
        body: 'Form submission processed'
    };
}
