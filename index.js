//app entry point

//allows access to env variables
require("dotenv").config();


const express = require("express");
const app = express();

const axios = require("axios");
const port = 8888;


/*************** Database logic ********************/
const cors = require("cors");

//connect to mongoDB
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//sending and recieving json from server
app.use(cors());
app.use(express.json());

/**************************************************************************/

//Google Books env variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

//Spotify env variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

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

/***********Google Books API Logic *********** */

//https://developers.google.com/identity/openid-connect/openid-connect#createxsrftoken
const stateKey = "book_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "openid https://www.googleapis.com/auth/books";

  const queryParams = querystring.stringify({
    client_id: GOOGLE_CLIENT_ID,
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
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${GOOGLE_CLIENT_ID}:${GOOGLE_CLIENT_SECRET}`
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

// https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query || null;

  axios({
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    data: querystring.stringify({
      client_id: GOOGLE_CLIENT_ID,
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
        `${GOOGLE_CLIENT_ID}:${CLIENT_SECRET}`
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

const spotifyStateKey = "spotify_auth_state";
// request authorization from Spotify Accounts Service
app.get("/spotify/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // list of needed scopes from Spotify API
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ].join(" ");

  const queryParams = querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code", // authorization code to be exchanged for access token
    redirect_uri: SPOTIFY_REDIRECT_URI, //redirect user after authorization
    state: state, //bookkeeping value passed back unchanged in redirect URI, OAuth security
    scope: scope,
  });

  // hit Spotify Accounts Service endpoint, redirects to Login Page
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// exchanges the authorization code for access token !!
// pass tokens to React app via query params

app.get("/spotify/callback", (req, res) => {
  //req.query -> from Express, object containing a property for each query string param (i.e code=abc, return abc)
  const code = req.query.code || null; // store authorization code

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      //format required body params
      grant_type: "authorization_code",
      code: code, // authorization code
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded", //body of HTTP Post req sent as query string in simple text/ASCII format
      Authorization: `Basic ${new Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`, //Authorization header should be base 64 encoded string
    },
  })
    //handle resolving the promise axios() returns
    .then((response) => {
      if (response.status === 200) {
        //return stringified data
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token, //retrieve another access token
          expires_in, //number of seconds that access_token is valid
        });
        //res.redirect() Express method to send user to localhost url
        res.redirect(`${FRONTEND_URI}/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      //do not return stringified data :(
      res.send(error);
    });
});

// refresh token so user doesn't have to log in again
app.get("/spotify/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
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



const booksRouter = require("./backend/routes/books");
const sessionsRouter = require("./backend/routes/sessions");

app.use("/sessions", sessionsRouter);
app.use("/books", booksRouter);

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
