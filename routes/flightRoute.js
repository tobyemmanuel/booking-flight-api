const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)
router.get('/addflight', controller.addFlight) //add flights via post
router.get('/fetchflights', controller.fetchFlights) //fetch all flights via get
router.get('/fetchflight', controller.fetchFlight) //fetch a flight via get
router.get('/updateflight', controller.updateFlight) //update flight changes
router.get('/deleteflight', controller.deleteFlight) //delete flight
module.exports = router;