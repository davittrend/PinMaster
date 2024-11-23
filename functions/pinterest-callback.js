const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Extract authorization code from query parameters
    const { code } = event.queryStringParameters || {};
    
    console.log('Received code:', code);  // Debugging: Log the code
    
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is missing' }),
      };
    }

    // Exchange code for an access token
    const tokenResponse = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: '1507772',  // Replace with your Pinterest App ID
      client_secret: '12e86e7dd050a39888c5e753908e80fae94f7367',  // Replace with your Pinterest App Secret
      redirect_uri: 'https://pinmaster.netlify.app/.netlify/functions/pinterest-callback',  // Ensure this matches Pinterest app settings
    });

    console.log('Token Response:', tokenResponse.data);  // Debugging: Log the token response

    // Fetch user info
    const userResponse = await axios.get('https://api.pinterest.com/v5/user_account', {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,  // Use the access token
      },
    });

    console.log('User Response:', userResponse.data);  // Debugging: Log the user response

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        access_token: tokenResponse.data.access_token,
        user: userResponse.data,
      }),
    };
  } catch (error) {
    console.error('Authentication Error:', error.response ? error.response.data : error.message);

    return {
      statusCode: error.response ? error.response.status : 500,
      headers,
      body: JSON.stringify({
        error: error.response ? error.response.data : 'Internal Server Error',
      }),
    };
  }
};
