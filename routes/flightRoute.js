const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.index)
router.post('/addflight', controller.addFlight) //add flights via post
router.get('/fetchflights', controller.fetchFlights) //fetch all flights via get
router.get('/fetchflight/:id', controller.fetchFlight) //fetch a flight via get
router.put('/updateflight/:id', controller.updateFlight) //update flight changes
router.delete('/deleteflight/:id', controller.deleteFlight) //delete flight
module.exports = router;