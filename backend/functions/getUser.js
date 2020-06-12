const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    

    try{
        const dynamoDb = new DynamoDB.DocumentClient();
        const result = await dynamoDb.query({
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type',

            },
            ExpressionAttributeValues: {
                ':type': "User",
            },}
            ).promise();
        var s = false
        var arrayLength = result.Items.length
        for (var i = 0; i < arrayLength; i++) {
             if(result.Items[i].name == data.User){ s= true; }}
            
        if (s) {
            return {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                  },
                statusCode: 200,
                  body: "Authentified",
            }
        }
        else{
            return {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                  },
                statusCode: 200,
                  body: "Not Authentified ",
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
            body: JSON.stringify(data),
        }
    }
    
}