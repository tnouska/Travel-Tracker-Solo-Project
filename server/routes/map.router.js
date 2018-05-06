const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "trackpoint" WHERE "track_id" = $1 AND "person_id" = $2 ORDER BY id ASC;';
        pool.query(queryText, [req.params.id ,req.user.id]).then((result) => {
            res.send(result.rows);
        })//end .then
            .catch((error) => {
                console.log('error in track.router.get', error);
                res.sendStatus(500);
            });//end .catch and pool.query
    } else {
        res.sendStatus(403)
    };//end if/else
});//end map.router.get

module.exports = router;