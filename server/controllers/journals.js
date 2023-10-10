var express = require('express');
var router = express.Router();
var Journal = require('../models/journal');
var Activity = require('../models/activity');
var Location = require('../models/location');

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


//yet to test
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
router.post('/api/journals/:id/locations', async (req, res) => {
    var location = new Location(req.body);
    var jid = req.params.id;
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

  router.get('/api/journals/:id/locations', async (req, res, next) => {
    const journalId = req.params.id 
    try {
        const journal = await Journal.findById(journalId);
        if (!journal) {
          return res.status(404).json({ message: 'Journal not found' });
        }     
        res.status(200).json(journal.locations);
      } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
      }
  });
// DELETE a specific review (id) for an activity (id)
// TODO

// POST activity to journal
router.post('/api/journals/:jid/activities', async (req, res) => {
    var activity = new Activity(req.body);
    var jid = req.params.id;
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

router.get('/api/journals/:id/activities', async (req, res, next) => {
    try {
      const journal = await Journal.findById(req.params.id).populate('activities');
      res.send(journal.activities); 
  } catch (error) {
      res.status(500).send({ message: 'Error', error: error.message });
  }
  });

// DELETE a specific activity (id) froma journal (id)
// TODO
module.exports = router;

