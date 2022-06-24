const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.index)
router.post('/addflight', controller.addFlight) //add flights via POST
router.get('/fetchflights', controller.fetchFlights) //fetch all flights via GET
router.get('/fetchflight/:id', controller.fetchFlight) //fetch a flight via GET
router.put('/updateflight/:id', controller.updateFlight) //update flight changes via PUT
router.delete('/deleteflight/:id', controller.deleteFlight) //delete flight via DELETE
module.exports = router;