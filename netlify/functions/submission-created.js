exports.handler = async function(event, context) {

    const body = event.body
    const url = 'https://api.github.com/repos/wai/wai-course-list/dispatches';
    const githubPAT = process.env.GITHUB_PAT; // keep this secret

/*
    const https = require("https")
    https.get("https://jsonplaceholder.typicode.com/todos/1", function(response) {
    response.setEncoding("utf8")
    response.on("data", console.log)
    response.on("error", console.error)
    }).on("error", console.error)

      json: {
        event_type: 'publish_blog',
      },
      headers: {
        Authorization: "token " + githubPAT,
      },
*/
      console.log(`PAT: ${githubPAT}\n form body: ${JSON.stringify(body)}`);

    return {
        statusCode: 200,
        body: 'Form submission processed'
    };
}
