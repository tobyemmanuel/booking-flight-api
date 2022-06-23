const fs = require("fs")
const flightsData = require("../models/flights.json"); //load flight data json

exports.example = (req, res) => {
    //console.log("example")
    return res.status(404).json({
        "message": "No Parameters or Route Added to URL"
    })
}

exports.addFlight = (req, res) => {
    let countFlights = flightsData.length
    flightsData.push(req.body.newFlight)
    let stringData = JSON.stringify(flightsData, null, 2)
    fs.writeFile('models/flights.json', stringData, function (error) {
        if (error) {
            return res.status(500).json({
                "message": error
            })
        } else {
            return res.status(200).json({
                "message": "New Flight Created"
            })
        }
    })

}

exports.fetchFlights = (req, res) => {
    //console.log(flightsData)
    //check if data exists in the JSON file
    if (Object.keys(flightsData).length > 0) {
        //returns data if JSON file is not empty
        return res.status(200).json({
            flightsData
        })
    }
    //returns 404 error and message if JSON file is empty
    return res.status(404).json({
        "message": "Not data available"
    })

}

exports.fetchFlight = (req, res) => {
    let flightId = Number(req.params.id) //ensure params is a NUMBER to ensure logic compatibilty
    //console.log(flightId)
    if (typeof flightId === "number") { //security check
        //returns data if JSON file contains that ID
        let foundFlight = flightsData.find(flight => {
            return Number(flight.id) === flightId //compares params and id in JSON file
        })
        if (foundFlight) { //if ID exist, deliver JSON response
            return res.status(200).json({
                foundFlight
            })
        }
    }
    //returns 404 error and message if ID is not found
    return res.status(404).json({
        "message": "Flight ID does not exist"
    })
}

exports.updateFlight = (req, res) => {
    console.log("update flights")
    res.send("Flight update")
}

exports.deleteFlight = (req, res) => {
    console.log("delete flight")
    res.send("Flight delete")
}