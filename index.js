require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const port = 8888;
const cors = require("cors");

//connect to mongoDB
const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;


mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

//sending and recieving json from server
app.use(cors());
app.use(express.json())

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
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//https://developers.google.com/identity/openid-connect/openid-connect#createxsrftoken
const stateKey = "book_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "openid https://www.googleapis.com/auth/books";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
    access_type: "offline",
    prompt: "consent",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
});
//https://developers.google.com/identity/openid-connect/openid-connect#java
app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });
        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

/*  app.get('/callback', (req, res) => {
  const code = req.query.code || null; //authorization code from initial request

  //https://developers.google.com/books/docs/v1/reference/?apix=true#mylibrary.bookshelves
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
      const { access_token, refresh_token } = response.data;

      const queryParams = querystring.stringify({
        access_token,
        refresh_token,
      });

      res.redirect(`http://localhost:3000/?${queryParams}`);

    } else {
      res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
    }
  })
  .catch(error => {
    res.send(error);
  });
}); */

// https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query || null;

  axios({
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    data: querystring.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: refresh_token,
      grant_type: "refresh_token",
      redirect_uri: REDIRECT_URI,
      access_type: "offline",
      prompt: "consent",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

const booksRouter = require('./routes/books');
const sessionsRouter = require('./routes/sessions');

app.use('/sessions', sessionsRouter);
app.use('/books', booksRouter)

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
