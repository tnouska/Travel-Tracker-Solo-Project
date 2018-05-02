const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "track";';
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403)
    }
});

router.post('/', (req, res) => {

if (req.isAuthenticated()) {  
        (async()=>{
            const client = await pool.connect();
                try {            
                    await client.query('BEGIN')
                    let queryText = `INSERT INTO track ("person_id","name","date") VALUES ($1,$2,$3) RETURNING "id"`                    
                    for (let i = 0; i < req.body.gpx.trk.length; i++) {
                        let track = req.body.gpx.trk[i];
                        console.log('track: ',track);                        
                        const trackResult = await client.query(queryText, [req.user.id, track.name[0], track.trkseg[0].trkpt[0].time[0]])
                        console.log(trackResult.rows[0]);
                        
                        const trackId = trackResult.rows[0].id
                        let trackArray = track.trkseg[0].trkpt
                        for (let t = 0; t < trackArray.length; t++) {
                            let newQueryText = `INSERT INTO trackpoint ("latitude","longitude","elevation","time","track_id") VALUES ($1,$2,$3,$4,$5)`
                            let trackpointValues = [trackArray[t].$.lat, trackArray[t].$.lon, trackArray[t].ele[0], trackArray[t].time[0],trackId]
                            const trackPointResult = await client.query(newQueryText, trackpointValues)
                        }
                    }
                    await client.query('COMMIT');
                    res.sendStatus(201);
                } catch (error) {
                    console.log('ROLLBACK', error);
                    await client.query('ROLLBACK');
                    throw error;
                } finally {
                    client.release();
                };// end try/catch
        })().catch((error)=>{
            console.log('CATCH', error);
            res.sendStatus(500)
        })//end async
    }else{
        res.sendStatus(403)
    } ;//end if/else
});//end router.post

module.exports = router;