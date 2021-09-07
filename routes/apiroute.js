const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const router = require('express').Router();

router.get('/notes', (req, res) => {
    fs.readFile ('./db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    //const title = req.body.title;

    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        
        // reading and turning the old notes into JS to be pushed
        const oldNote = JSON.parse(data);

        const newNote = {
            title: title,
            text: text,
            id: uuidv4()
            
        };

        oldNote.push (newNote);

        // catch and throw errors in every call back
        fs.writeFile ('./db/db.json', JSON.stringify(oldNote), (err) => {
            if (err) throw err;

            res.json({ ok: true });
        })
    })
})


module.exports = router;