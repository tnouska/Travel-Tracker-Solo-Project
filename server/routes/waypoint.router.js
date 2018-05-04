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

router.get('/',(req,res)=>{
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM waypoint WHERE `
    }
})


module.exports = router;