const express = require('express');
const router = express.Router();
var geo = require('mapbox-geocoding');
const Place = require("../models/place")
 
  geo.setAccessToken('pk.eyJ1IjoidHViYS1rYXNhcCIsImEiOiJjanh1ZTI0YXcwMDM4M2dtbnZ6eXJuOGs2In0.L_TRnX4VuwoBAP4cSCFCVQ');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/map', (req, res, next) => {
  res.render('map');
});

router.get('/api/locations',(req,res,next)=>{
  Place.find().then(place=>{
    res.json(place)
  })
})

router.post('/map', (req, res, next) => {
  const { name, locations } = req.body

  geo.geocode('mapbox.places', locations, function (err, geoData) {
    console.log(geoData);
     Place.create({
      name, location: {
        type: "Point",
        coordinates: 
        geoData.features[0].center
      }
    })
      .then(data => { res.redirect('/secret') })
      .catch(err => { console.log(err) }) 
});

});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
  };
};

router.get("/secret", loginCheck(), (req, res) => {
  console.log("secret: ", req.session);
  res.render("secret");
});


function start(){

  document.getElementById("/").style.display="block";
  document.getElementById("index").style.display="block";
  document.getElementById("secret").style.display="none";

  //document.getElementById("intro").style.display="none";
  //document.getElementById("start-button").style.display="none";
  //document.getElementById("h3").style.display="none";
  //scrollSpeed = 2;
}
module.exports = router;
