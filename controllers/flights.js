const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
}

function show(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        res.render('flights/show', { flightHeader: `Flight Number ${flight.flightNo} Details:`, flight });
    })
}

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights/index', { flights });
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    for (let key in req.body) {
        req.body[key] = req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(err => {
        if (err) return res.render('flights/index');
        console.log(flight);
        res.redirect('/flights')
    })
}