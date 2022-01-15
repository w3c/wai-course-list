exports.handler = async function(event, context) {

    const body = event.body

    console.log(`form submittedt:\n ${JSON.stringify(body)}`);

    return {
        statusCode: 200,
    };
}
