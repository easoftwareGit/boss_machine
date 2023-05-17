const express = require('express');
const minionsRouter = express.Router();
module.exports = minionsRouter;

const { 
  getAllFromDatabase, 
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

const minionsName = 'minions';
const workName = 'work';

minionsRouter.param('minionId', (req, res, next, id) => {    
  const foundMinion = getFromDatabaseById(minionsName, id)
  if (foundMinion) {
    req.minion = foundMinion;
    next();
  } else {
    res.status(404).send(`Minion with id: ${id} not found in ${minionsName}`);
  }
});

minionsRouter.get('/', (req, res, next) => {
  const allMinions = getAllFromDatabase(minionsName);
  if (allMinions) {
    res.send(allMinions);
  } else {
    res.status(404).send(`Type ${minionsName} not found.`);
  }
  res.send()
});

minionsRouter.get('/:minionId', (req, res, next) => {  
  res.send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
  const addedMinion = addToDatabase(minionsName, req.body);
  if (addedMinion) {
    res.status(201).send(addedMinion);
  } else {
    res.status(400).send(`Could not create/add new entry for type "${minionsName}".`);
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase(minionsName, req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {    
    res.status(404).send(`cound not update minion with id: ${req.params.minionId}`);
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId(minionsName, req.minion.id);
  if (deletedMinion) {
    res.status(204).send(req.minion.id);
  } else {
    res.status(404).send(`Could not delete minion with id ${req.minion.id}`);
  }
});

minionsRouter.param('workId', (req, res, next, id) => {    
  const foundWork = getFromDatabaseById(workName, id)
  if (foundWork) {
    req.work = foundWork;
    next();
  } else {
    res.status(404).send(`Work with id: ${id} not found in ${workName}`);
  }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const allWork = getAllFromDatabase(workName);
  const workForMinion = allWork.filter(work => work.minionId = req.minion.id);
  res.send(workForMinion);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const workToAdd = req.body;
  if (workToAdd) {
    workToAdd.minionId = req.minion.id;
    const addedWork = addToDatabase(workName, workToAdd);
    if (addedWork) {
      res.status(201).send(addedWork);
    } else {
      res.status(400).send(`Could not add work ${workToAdd.title} for minion with id: ${req.minion.id}`);
    }
  } else {
    res.status(400).send(`No work to add for minion with id: ${req.minion.id}`);
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send(`Could not update. Minion id: ${req.params.minionId} not equal to Minion Id in Work ${req.params.workId}`);
  } else {    
    const updatedWork = updateInstanceInDatabase(workName, req.body);
    if (updatedWork) {
      res.send(updatedWork);
    } else {
      res.status(404).send(`Could not update work with id: ${req.params.workId}`)
    }
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId(workName, req.work.id);
  if (deletedWork) {
    res.status(204).send(req.work.id);
  } else {
    res.status(404).send(`Could not delete work with id: ${req.params.work}`);
  }
});