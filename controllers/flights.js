const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
}

function deleteFlight(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    Flight.findOneAndDelete((req.params.id), (err, result) => console.log(result));
    res.redirect('/flights');
}

function show(req, res) {
    Flight.findById(req.params.id).populate('tickets').exec((err, flight) => {
        Ticket.find({ flight: flight._id }, (err, tickets) => {
            res.render('flights/show', { flightHeader: `Flight Number ${flight.flightNo} Details:`, flight, tickets });
        });
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
        res.redirect('/flights')
    })
}