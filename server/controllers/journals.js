var express = require('express');
var router = express.Router();
var Journal = require('../models/journal');

router.post('/api/journals', function(req, res, next){
    var journal = new Journal(req.body);
    journal.save(function(err, journal) {
        if (err) { return next(err); }
        res.status(201).json(journal);
    })
});

router.get('/api/journals/:id', function(req, res, next) {
    var id = req.params.id;
    Journal.findById(id, function(err, journal) {
        if (err) { return next(err); }
        if (journal === null) {
            return res.status(404).json({'message': 'Journal not found'});
        }
        res.json(journal);
    });
});

router.delete('/api/journals/:id', function(req, res, next) {
    var id = req.params.id;
    Journal.findOneAndDelete({_id: id}, function(err, journal) {
        if (err) { return next(err); }
        if (journal === null) {
            return res.status(404).json({'message': 'Journal not found'});
        }
        res.json(journal);
    });
});

router.put('/api/journals/:id', function(req, res, next) {
    var id = req.params.id;
    Journal.findById(id, function(err, journal) {
        if (err) { return next(err); }
        if (journal == null) {
            return res.status(404).json({"message": "Journal not found"});
        }
        journal.title = req.body.title;
        journal.mainBodyText = req.body.mainBodyText;
        journal.date = req.body.date;
        journal.save();
        res.json(journal);
    });
});

router.patch('/api/journals/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, journal) {
        if (err) { return next(err); }
        if (journal == null) {
            return res.status(404).json({"message": "Journal not found"});
        }
        camel.color = (req.body.color || camel.color);
        camel.position = (req.body.position || camel.position);
        
        journal.title = (req.body.title || journal.title);
        journal.mainBodyText = (req.body.mainBodyText || journal.mainBodyText);
        journal.date = (req.body.date || journal.date);
        journal.save();
        res.json(journal);
    });
});


module.exports = router;


