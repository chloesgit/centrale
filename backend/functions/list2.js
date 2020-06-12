const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    try{
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    function f(parame) {
        return ({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'title'
        },
        ExpressionAttributeValues: {
            ':type': parame,
        },}
        )
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result1 = await dynamoDb.query(f("Movie")).promise();



    return {
            headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
    },
        statusCode: 200,
        body: JSON.stringify({page : 1 , results : result1.Items}),
    }}
    catch (e) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            body: JSON.stringify(e),
        }
    }
}