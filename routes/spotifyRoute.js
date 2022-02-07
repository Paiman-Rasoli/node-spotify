const route = require("express").Router();
const spotifyWebApi = require("spotify-web-api-node");

route.post("/connect", (req, res) => {
  // get if request is login or refresh
  const { code, refresh } = req.body;
  // spotify developer account credentials
  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.FRONT_URL_REACT,
  };
  let spotifyApi = new spotifyWebApi(credentials);
  // if clients request for refresh
  if (refresh) {
    // code should be the refresh token which saved in client storage
    spotifyApi.setRefreshToken(code);
    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        return res.status(200).json({
          accessToken: data.body.access_token,
        });
      })
      .catch((err) => {
        console.error("spot refresh", err);
        return res.status(400);
      });
  } else {
    // if request was login code is the value which passed in redirect url by spotify
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        // Returning the User's AccessToken in the json formate
        res.status(200).json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
});
module.exports = route;
