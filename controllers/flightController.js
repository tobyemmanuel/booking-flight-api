const flightsData = require("../models/flights.json"); //load flight data json

exports.example = (req, res) => {
    //console.log("example")
    return res.status(404).json({
        "message": "No Parameters or Route Added to URL"
    })
}

exports.addFlight = (req, res) => {
    console.log("add flight")
    res.send("Flight added")
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
    console.log("fetch flight")
    res.send("Flight fetching")
}

exports.updateFlight = (req, res) => {
    console.log("update flights")
    res.send("Flight update")
}

exports.deleteFlight = (req, res) => {
    console.log("delete flight")
    res.send("Flight delete")
}