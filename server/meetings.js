const express = require('express');
const meetingRouter = express.Router();
module.exports = meetingRouter;

const { 
  getAllFromDatabase,   
  addToDatabase,  
  deleteAllFromDatabase,
  createMeeting
} = require('./db');

const meetingsName = 'meetings';

meetingRouter.get('/', (req, res, next) => {
  const allMeetings = getAllFromDatabase(meetingsName);
  if (allMeetings) {
    res.send(allMeetings);
  } else {
    res.status(404).send(`Type ${meetingsName} not found.`);
  }
  res.send()
});

meetingRouter.post('/', (req, res, next) => {
  const createdMeeting = createMeeting()
  const addedMeeting = addToDatabase(meetingsName, createdMeeting);
  if (addedMeeting) {
    res.status(201).send(addedMeeting);
  } else {
    res.status(400).send(`Could not create/add new entry for type "${meetingsName}".`);
  }
});

meetingRouter.delete('/', (req, res, next) => {
  const allGone = deleteAllFromDatabase(meetingsName);
  if (allGone) {
    res.status(204).send(allGone);
  } else {
    res.status(404).send(`Could not delete all "${meetingsName}".`);
  }
});