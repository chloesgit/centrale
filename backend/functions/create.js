
'use strict';
module.exports.handle = async event => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(event.body),
    };
  };
  