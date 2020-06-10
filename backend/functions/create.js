const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    

    try{
        const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'items',
        uuid: uuid.v1(),
        title: data.name,
        description: data.descript,
        createdAt: Date.now(),
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();
    
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            body: JSON.stringify(item),
        }
    }
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