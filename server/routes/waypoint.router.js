const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/',(req,res)=>{
    if (req.isAuthenticated()) {
    //checking if user is authenticated
        (async()=>{
        //creates async function 
            const client = await pool.connect();
            //await will wait for a return on the given function and then do something
            try {
                await client.query('BEGIN')
                let waypointArray = req.body.waypoint.gpx.wpt
                for (let i = 0; i < waypointArray.length; i++) {                    
                    let queryText = `INSERT INTO waypoint ("latitude","longitude","description","img_url","elevation",
                    "time","track_id","person_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
                    let waypointValues = [waypointArray[i].$.lat, waypointArray[i].$.lon, "", "", waypointArray[i].ele[0], waypointArray[i].time[0],req.body.track, req.user.id]
                    await client.query(queryText,waypointValues)   
                };//end for loop
                await client.query('COMMIT');//will try to push queries to DB
                res.sendStatus(201);
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            };//end try/catch/finally
        })().catch((error)=>{
            console.log('error in CATCH: ',error);
            res.sendStatus(500);
        });//end async/await 
    } else {
        res.sendStatus(403)
    };//end auth if/else
});//end waypoint router post

router.get('/:id',(req,res)=>{
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM waypoint WHERE track_id = $1 AND person_id = $2 ORDER BY id ASC;`;
        pool.query(queryText, [req.params.id,req.user.id]).then((result)=>{
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error in waypoint.router.get: ', error);
            res.sendStatus(500);
        });//end pool.query
    } else {
        res.sendStatus(403);
    };//end if/else
});//end router.get

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'DELETE FROM waypoint WHERE id = $1 AND person_id = $2';
        pool.query(queryText, [req.params.id, req.user.id])
            .then((result) => {
                if (result.rowCount === 0) {
                    res.sendStatus(403);
                    console.log('cannot delete that item: ', result);

                } else {
                    res.sendStatus(201);
                };
            }).catch((error) => {
                console.log('error in track.router.delete: ', error);
                res.sendStatus(500);
            });//end pool.query to delete by id.
    } else {
        res.sendStatus(403);
    };// end if/else
});//end waypoint.router.delete;

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = 'UPDATE waypoint SET description = $1, img_url = $2 WHERE id = $3 AND person_id = $4';
        pool.query(queryText, [req.body.waypointState.description, req.body.waypointState.img_url, req.params.id, req.user.id])
            .then((result) => {
                if (result.rowCoutn === 0) {
                    res.sendStatus(403);
                    console.log('cannot update that item: ', result);
                } else {
                    res.sendStatus(201);
                };//end if/else
            }).catch((error) => {
                console.log('error in waypoint.router.put: ', error);
                res.sendStatus(500);
            });//end pool.query to update waypoint with new description and to verify the person name
    } else {
        res.sendStatus(403)
        console.log('not signed in');
    };//end if/else for authentication
});//end track.router.put

module.exports = router;