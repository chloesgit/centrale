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
    var l = []
    for (var i = 0; i < result.Item.genres.values.length; i++)
    {
       var res = await dynamoDb.get(getParams(result.Item.genres.values[i])).promise();
       l.push(res.Item)
    }
    
    if (result.Item) {

        return {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            statusCode: 200,
            
              body: JSON.stringify({ results : l}),
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


