const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    try
    {
        const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.delete({
        TableName: process.env.tableName,
        Key: {
            
            type: "note",
            uuid: event.pathParameters.id,
        },
    }).promise();

    if (result.Item) {
        return {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            statusCode: 200,
              body: JSON.stringify(result.Item),
        }
    }
    else {
        return {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            statusCode: 404,
            body: 'Not found'
        }

    }
    }
catch (e)
{
return {
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    statusCode: 404,
    body: JSON.stringify(e)
}
}
}

