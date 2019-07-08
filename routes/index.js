const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/map', (req, res, next) => {
  res.render('map');
});

router.post('/map', (req, res, next) => {
  const { name, latitude, longitude } = req.body

  Place.create({
    name, location: {
      type: "Point",
      coordinates: [latitude, longitude]
    }
  })
    .then(data => { res.redirect('/') })
    .catch(err => { console.log(err) })
})

module.exports = router;
