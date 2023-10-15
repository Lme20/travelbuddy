var express = require('express');
var router = express.Router();
var Journal = require('../models/journal');
var Location = require('../models/location');

router.post('/api/journals', async (req, res, next) => {
    try {
      const journal = new Journal(req.body);
      const savedJournal = await journal.save();
      res.status(201).json(savedJournal);
    } catch (error) {
      next(error);
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


router.patch('/api/journals/:id', async function (req, res, next) {
    try {
        const journal = await Journal.findById(req.params.id);

        if (journal == null) {
            return res.status(404).json({"message": "Journal not found"});
        }

        journal.title = (req.body.title || journal.title);
        journal.journalTextEntry = (req.body.journalTextEntry || journal.journalTextEntry);
        journal.date = (req.body.date || journal.date);
        journal.locations = (req.body.locations || journal.locations)
        journal.owner = (req.body.owner || journal.owner)
        await journal.save();

        res.json(journal);
    } catch (err) {
        return next(err);
    }
});

router.post('/api/journals/:id/locations', async (req, res) => {
    try {
        const location = new Location(req.body);
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({ "message": "Journal not found" });
        }

        journal.locations = location;
        await journal.save();
        location.journals = journal;
        await location.save();

        res.status(201).json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
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
module.exports = router;

