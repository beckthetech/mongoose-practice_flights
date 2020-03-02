const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/new', ticketsCtrl.new);
// router.post('/flight/:id/tickets', ticketsCtrl.create);

module.exports = router;