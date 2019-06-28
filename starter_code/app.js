require("dotenv").config()
const express = require('express');
const hbs = require('hbs');
const spotifyAPP = require("spotify-web-api-node")
hbs.registerPartials( __dirname+ "/views/partials")
const app=express()


const clientId=process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new spotifyAPP({
    clientId : clientId,
    clientSecret : clientSecret 
  });

spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })

app.get("/",(req,res)=>{
    res.render("index") 
})
app.get("/artist",(req,res)=>{
    console.log(req.query.name)
    spotifyApi.searchArtists(req.query.name)
    .then(data => {

      console.log("The received data from the API: ", data.body);
      res.render("artist",data.body.artists)
      console.log(data)

    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
})
// the routes go here:



app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));

