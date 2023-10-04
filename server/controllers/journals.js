var express = require('express');
var router = express.Router();
var Journal = require('../models/journal');
var Activity = require('../models/activity');
var Location = require('../models/location');

/*
This is the previous code that doesn't work due to .save() not allowing callbacks:
router.post('/api/journals', function(req, res, next){
    var journal = new Journal(req.body);
    journal.save(function(err, journal) {
        if (err) { return next(err); }
        res.status(201).json(journal);
    })
});
The code below for post is inspired from chatGPT to use async to wait for a response:
*/

router.post('/api/journals', async (req, res, next) => {
    try {
      const journal = new Journal(req.body);
      const savedJournal = await journal.save();
      res.status(201).json(savedJournal);
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  });

  router.get('/api/journals', async (req, res, next) => {
    try {
        const journals = await Journal.find();
        res.json({ 'journals': journals });
      } catch (err) {
        return next(err);
      }
});

  router.get('/api/journals/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const journal = await Journal.findById(id);
        if (journal == null) {
            return res.status(404).json({ 'message': 'Journal not found' });
        }
        res.json(journal);
    } catch (err) {
        next(err); 
    }
});


router.delete('/api/journals/:id', async(req, res) => {
    try {
        var journal = await Journal.findOneAndDelete({_id:req.params.id});
    res.status(200).send(journal);
    } catch {
        res.status(500).send({ message: 'Error in DELETE /journals/id', error: error.message });
    }
});


router.put('/api/journals/:id', async (req, res) => {
    try {
        const journal = await Journal.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (!journal) {
            return res.status(404).send({ message: 'Journal not found' });
        }
        res.status(200).send(journal);
    } catch (error) {
        res.status(500).send({ message: 'Error in PUT /journal/id', error: error.message });
    }
});

router.patch('/api/journals/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, journal) {
        if (err) { return next(err); }
        if (journal == null) {
            return res.status(404).json({"message": "Journal not found"});
        }
        journal.title = (req.body.title || journal.title);
        journal.journalTextEntry = (req.body.journalTextEntry || journal.journalTextEntry);
        journal.date = (req.body.date || journal.date);
        journal.save();
        res.json(journal);
    });
});

// POST location to journal
router.post('/api/journals/:jid/locations', async (req, res) => {
    var location = new Location(req.body);
    var jid = req.params.jid;
    Journal.findById(jid).then( async(journal, journalres) => {
        if (journal == null) {
            return journalres.status(404).json({"message": "Journal not found"});
        }
        journal.locations.push(location);
        await journal.save();
        location.journals = journal;
        await location.save();
        res.status(201).send(location);
    });
});

// GET activities that are reviewed
router.get('/api/journals/:jid/locations', async (req, res) => {
    var jid = req.params.jid;
    Journal.findById(jid).then( async(journal, journalres) => {
        if (journal == null) {
            return journalres.status(404).json({"message": "Journal not found"});
        }
        Location.findById(journal.locations).then(async(location, locationres) => {
            res.json({ 'locations': location });
        });
    });
});

// DELETE a specific review (id) for an activity (id)
// TODO

// POST activity to journal
router.post('/api/journals/:jid/activities', async (req, res) => {
    var activity = new Activity(req.body);
    var jid = req.params.jid;
    Journal.findById(jid).then( async(journal, journalres) => {
        if (journal == null) {
            return journalres.status(404).json({"message": "Journal not found"});
        }
        journal.activities.push(activity);
        await journal.save();
        activity.journals = activity;
        await activity.save();
        res.status(201).send(activity);
    });
});


// GET activities that are in a journal
router.get('/api/journals/:jid/activities', async (req, res) => {
    var jid = req.params.jid;
    Journal.findById(jid).then( async(journal, journalres) => {
        if (journal == null) {
            return journalres.status(404).json({"message": "Journal not found"});
        }
        Activity.findById(journal.activities).then(async(activity, activityres) => {
            res.json({ 'activities': activity });
        });
    });
});

// DELETE a specific activity (id) froma journal (id)
// TODO
module.exports = router;

