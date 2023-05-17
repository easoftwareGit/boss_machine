const express = require('express');
const apiRouter = express.Router();

const ideasRouter = require('./ideas.js');
const meetingRouter = require('./meetings.js');
const minionsRounter = require('./minions.js');

apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingRouter);
apiRouter.use('/minions', minionsRounter);

module.exports = apiRouter;
