

const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid');


module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    
    const newKey = uuid.v1()
    try{
        const dynamoDb = new DynamoDB.DocumentClient();
        const item = {
            type: 'note',
            name : data.User,
            Film : data.Film,
            Note : data.Note,
            uuid: newKey
        }

        const result = await dynamoDb.query({
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type',

            },
            ExpressionAttributeValues: {
                ':type': "note",
            },}
            ).promise();
        var s = false
        var arrayLength = result.Items.length
        for (var i = 0; i < arrayLength; i++) {
             if(result.Items[i].name == data.User && result.Items[i].Film == data.Film){ s= true; }}

  
        if (s) {
            return {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                  },
                statusCode: 200,
                  body: "already voted",
            }
        }
        else{
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
                      body: "vote success"
                }
        }
    

    }
    catch (e) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
              },
            body: "ERROR",
        }
    }
    
}