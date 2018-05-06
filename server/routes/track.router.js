const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "track" WHERE person_id = $1 ORDER BY id ASC;';
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        })
            .catch((error) => {
                console.log('error in track.router.get',error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403)
    }
});

router.post('/', (req, res) => {
if (req.isAuthenticated()) {  
    //checking if user is authenticated
        (async()=>{
        //creates async function 
            const client = await pool.connect();
            //await will wait for a return on the given function and then do something
                try {            
                    await client.query('BEGIN')
                    let queryText = `INSERT INTO track ("person_id","name","date") VALUES ($1,$2,$3) RETURNING "id"`                    
                    for (let i = 0; i < req.body.gpx.trk.length; i++) {
                        let track = req.body.gpx.trk[i];
                        const trackResult = await client.query(queryText, [req.user.id, track.name[0], track.trkseg[0].trkpt[0].time[0]]);//posting to DB
                        const trackId = trackResult.rows[0].id
                        let trackArray = track.trkseg[0].trkpt
                        for (let t = 0; t < trackArray.length; t++) {
                            let newQueryText = `INSERT INTO trackpoint ("latitude","longitude","elevation","time","track_id","person_id") VALUES ($1,$2,$3,$4,$5,$6)`
                            let trackpointValues = [trackArray[t].$.lat, trackArray[t].$.lon, trackArray[t].ele[0], trackArray[t].time[0],trackId,req.user.id]
                            const trackPointResult = await client.query(newQueryText, trackpointValues);//posting to DB
                        };//end for loop to add each point of a track to the trackpoint table tying the ID from the track created in query before.
                    };//end for loop to create a track and then run another for loop to add trackpoints tied to that track
                    await client.query('COMMIT');//will try to push queries to DB
                    res.sendStatus(201);
                } catch (error) {
                    console.log('ROLLBACK', error);
                    await client.query('ROLLBACK');
                    throw error;
                } finally {
                    client.release();
                    //will release end query('BEGIN')
                };// end try/catch
        })().catch((error)=>{
            console.log('CATCH', error);
            res.sendStatus(500)
        })//end async
    }else{
        res.sendStatus(403)
    } ;//end if/else
});//end router.post

router.delete('/:id', (req,res)=>{
    if (req.isAuthenticated()) {
        let queryText = 'DELETE FROM track WHERE id = $1 AND person_id = $2';
        pool.query(queryText,[req.params.id,req.user.id])
        .then((result)=>{
            if (result.rowCount === 0) {
                res.sendStatus(403);
                console.log('cannot delete that item: ', result);
                
            } else {
                res.sendStatus(201);
            };
        }).catch((error)=>{
            console.log('error in track.router.delete: ', error);
            res.sendStatus(500);
        });//end pool.query to delete by id.
    } else {
        res.sendStatus(403);
    };// end if/else
});//end track.router.delete;

router.put('/:id', (req,res)=>{
    if (req.isAuthenticated()) {
        let queryText = 'UPDATE track SET name = $1, date = $2 WHERE id = $3 AND person_id = $4';
        pool.query(queryText, [req.body.name,req.body.date,req.params.id,req.user.id])
        .then((result)=>{
            if (result.rowCoutn === 0) {
                res.sendStatus(403);
                console.log('cannot update that item: ', result);
            } else {
                res.sendStatus(201);
            };//end if/else
        }).catch((error)=>{
            console.log('error in track.router.put: ', error);
            res.sendStatus(500);
        });//end pool.query to update track with new name and date and verify the person name
    } else {
        res.sendStatus(403)
        console.log('not signed in');
    };//end if/else for authentication
});//end track.router.put

module.exports = router;