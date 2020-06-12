const DynamoDB = require('aws-sdk/clients/dynamodb');

function getParams(id){
    return {
        TableName: process.env.tableName,
        Key: {
            type: 'Movie',
            uuid: id,
        },
    }
}
module.exports.handle = async event => {
    try
    {
        const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'rec',
            uuid: event.pathParameters.id,
        },
    }).promise();

    if (result.Item) {
    result1 = await dynamoDb.get(getParams(result.Item.genres[0])).promise()
        // for (var i =0; i <result.Item.genres.length;i++)
        // {        }



        return {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            statusCode: 200,
              body: JSON.stringify(result.Item.result1),
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


