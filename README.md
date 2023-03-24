# PaigesPages
- Bookly 2.0 (worse)

- Tools and fun things utilized
  - Node.js ==> execute javascript code outside of a web browser, cross-platform JavaScript env
  - nvm: node version manager
  - Express:
    - provides HTTP utility methods & middleware / route handling --> SAVES TIME
    - app.METHOD(PATH, HANDLER) <-- basic structure
  - nodemon:
    - restarts Node server automatically w/changes in index.js file
  - OAuth: https://developers.google.com/books/docs/v1/using#OAuth2Authorizing
  
    - one app can interact w/another w/out needing your password<3
    - pass authorization tokens over HTTPS via access tokens
      - tokens expire and need to be refreshed for security
    - Axios library: provides easy API and works both client-side/browser and server-side/Express app
    - Concurrently: runs multiple npm commands at the same time, used to simplify project setup
    - Styled Components & Styled Components Babel plugin: CSS-in-JS library for easier UI styling. They are React components so can be passed as props!
     - prettier: to make it prettier<3
     -eslint: so I stop messing up hooks
    - Database 
        - MongoDB Atlas as the database
        - mongoose for connecting with Node.js, provides schema validation, manages relationships
        - insomnia for testing queries

     ## Local Installation & Set Up
     1. Register a Google App in your dashboard and add `http://localhost:8888/callback` as a Redirect URI in the app settings
     2. Create a `.env` file at the root of the project based on `.env.example` and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the dashboard
     3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally


   4. Install the correct version of Node

    ```shell
    nvm install
    ```

5. Install dependencies

    ```shell
    npm install
    ```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8888>

    ```shell
    npm start
    ```

  ## Deploying to Heroku with Git

1. Create a [Heroku](https://www.heroku.com/) app

2. Add your Heroku app as a git remote

    ```shell
    heroku git:remote -a your-app-name
    ```

3. Add `http://your-app-name.herokuapp.com/callback` as a Redirect URI in your Google app's settings

4. In your app's **Settings** tab in the Heroku dashboard, add [config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).

   Based on the values in your `.env` file, the `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, and `FRONTEND_URI` key value pairs. Make sure to replace the `localhost` URLs with your heroku app's URL.

   ```env
   REDIRECT_URI: http://your-app-name.herokuapp.com/callback
   FRONTEND_URI: http://your-app-name.herokuapp.com
   ```

5. Push to Heroku

    ```shell
    git push heroku main
    ```
