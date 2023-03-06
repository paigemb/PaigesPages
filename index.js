require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

//parse and stringify query strings
const querystring = require("querystring");

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  //https://developers.google.com/identity/openid-connect/openid-connect#createxsrftoken
  const stateKey = 'book_auth_state';
  
  app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    const scope = 'openid https://www.googleapis.com/auth/books';
  
    const queryParams = querystring.stringify({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: scope,
    });
  
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
  });
  //https://developers.google.com/identity/openid-connect/openid-connect#java
  app.get('/callback', (req, res) => {
  const code = req.query.code || null; //authorization code from initial request

  axios({
    method: 'post',
    url: 'https://oauth2.googleapis.com/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
  .then(response => {
    if (response.status === 200) {
        console.log('good job')
      const { access_token, token_type } = response.data;

      axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes', {
        headers: {
          Authorization: `${token_type} ${access_token}`
        }
      })
        .then(response => {
          res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        })
        .catch(error => {
          res.send(error);
        });

    } else {
      res.send(response);
    }
  })
  .catch(error => {
    res.send(error);
  });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});