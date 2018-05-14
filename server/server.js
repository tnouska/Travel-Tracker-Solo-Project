
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const trackRouter = require('./routes/track.router')
const waypointRouter = require('./routes/waypoint.router')
const mapRouter = require('./routes/map.router')
// Body parser middleware
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ limit: '50MB', extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/track', trackRouter);
app.use('/api/waypoint', waypointRouter)
app.use('/api/map', mapRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Listening on port: ${PORT}`);
});
