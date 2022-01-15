exports.handler = async function(event, context) {

    console.log(`form submittedt:\n ${JSON.stringify(event)}`);

    return {
        statusCode: 200,
    };
}
