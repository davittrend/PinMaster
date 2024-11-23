const axios = require('axios');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Extract the code from the query parameter
    const { code } = event.queryStringParameters || {};
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
      client_id: '1507772',  // Your Pinterest App ID
      client_secret: '12e86e7dd050a39888c5e753908e80fae94f7367',  // Your Pinterest App Secret
      redirect_uri: 'https://pinmaster.netlify.app/callback',  // Ensure this matches Pinterest app settings
    });

    // Log the tokenResponse for debugging
    console.log('Token Response:', tokenResponse);

    // Fetch user info using the access token
    const userResponse = await axios.get('https://api.pinterest.com/v5/user_account', {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,  // Use the access token
      },
    });

    // Log the userResponse for debugging
    console.log('User Response:', userResponse);

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
