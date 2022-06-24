const fs = require("fs")
const flightsData = require("../models/flights.json"); //load flight data json

exports.index = (req, res) => {
    return res.status(404).json({
        "message": "No Parameters or Route Added to URL"
    })
}

exports.addFlight = (req, res) => {
    let generateId = Math.max(...flightsData.map(o => o.id)) + 1 //generates unique ID from last data's ID
    let newData = req.body.newFlight //assign new data to variable
    //give ID to new flight data
    let updatedNewFlight = {
        ...newData,
        id: generateId
    }
    flightsData.push(updatedNewFlight) // add new data to the exisiting data
    let stringData = JSON.stringify(flightsData, null, 2) //tringify data
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
    let flightId = Number(req.params.id) //ensure params is a NUMBER to ensure logic compatibilty
    let newData = req.body.updateFlight //assign new data to variable
    if (typeof flightId === "number") { //security check
        //returns data if JSON file contains that ID
        let foundFlight = flightsData.find(flight => {
            return Number(flight.id) === flightId //compares params and id in JSON file
        })
        if (foundFlight) {
            //get index of the original data from JSON file
            let getIndex = flightsData.indexOf(foundFlight)
            //Since ID cannot be modified, add the ID to the new Data
            let updatedNewFlight = {
                ...newData,
                id: flightId
            }
            //replace the old data in th flight JSON file with the update and the id
            flightsData.splice(getIndex, 1, updatedNewFlight)
            let stringData = JSON.stringify(flightsData, null, 2) //tringify data
            fs.writeFile('models/flights.json', stringData, function (error) {
                if (error) {
                    //output errors if any
                    return res.status(500).json({
                        "message": error
                    })
                } else {
                    //deliver a positive JSON response
                    return res.status(200).json({
                        "message": "Flight Update Successful"
                    })
                }
            })
        } else {
            //returns 404 error and message if ID is not found
            return res.status(404).json({
                "message": "Flight ID does not exist"
            })
        }
    }
}

exports.deleteFlight = (req, res) => {
    console.log("delete flight")
    let flightId = Number(req.params.id) //ensure params is a NUMBER to ensure logic compatibilty
    //console.log(flightId)
    if (typeof flightId === "number") { //security check
        //returns data if JSON file contains that ID
        let delFlight = flightsData.filter(flight => {
            return flight.id !== flightId
        })
        if (delFlight) { //if ID exist and removed
            let stringData = JSON.stringify(delFlight, null, 2) //tringify data
            fs.writeFile('models/flights.json', stringData, function (error) {
                if (error) {
                    //output errors if any
                    return res.status(500).json({
                        "message": error
                    })
                } else {
                    //deliver a positive JSON response
                    return res.status(200).json({
                        "message": "Flight Deletion Successful"
                    })
                }
            })
        } else {
            //returns 404 error and message if ID is not found
            return res.status(404).json({
                "message": "Flight ID does not exist"
            })
        }
    }

}