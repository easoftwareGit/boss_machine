const express = require('express');
const ideasRouter = express.Router();
module.exports = ideasRouter;

const { 
  getAllFromDatabase, 
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideasName = 'ideas';

ideasRouter.param('ideaId', (req, res, next, id) => {    
  const foundIdea = getFromDatabaseById(ideasName, id)
  if (foundIdea) {
    req.idea = foundIdea;
    next();
  } else {
    res.status(404).send(`Idea with id: ${id} not found in ${ideasName}`);
  }
});

ideasRouter.get('/', (req, res, next) => {
  const allIdeas = getAllFromDatabase(ideasName);
  if (allIdeas) {
    res.send(allIdeas);
  } else {
    res.status(404).send(`Type ${ideasName} not found.`)
  }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const addedIdea = addToDatabase(ideasName, req.body);
  if (addedIdea) {
    res.status(201).send(addedIdea);
  } else {
    res.status(400).send(`Could not create/add new entry for type "${ideasName}".`);
  }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase(ideasName, req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(404).send(`cound not update idea with id: ${req.params.ideaId}`);
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId(ideasName, req.idea.id);
  if (deletedIdea) {
    res.status(204).send(req.idea.id);
  } else {
    res.status(404).send(`Could not delete idea with id ${req.idea.id}`);
  }
});
