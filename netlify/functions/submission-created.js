const https = require('https')

exports.handler = async function(event, context) {

    const formData = event.body
    console.log(process.env.GITHUB_PAT, formData)
    const body= `{
        "event_type": "netlify-form-submission",
        "client_payload": {
            ${formData}
        }`
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: '/repos/w3c/wai-course-list/dispatches',
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
//                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
//                'Content-Length': body.length
            }        
        }
    
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        
        res.on('data', d => {
            console.info(d)
        })
    })
        
    req.on('error', error => {
        console.error(error)
    })    
    
    req.write(body)
    req.end()
    
    return {
        statusCode: 200,
        body: 'Form submission processed'
    };
}
