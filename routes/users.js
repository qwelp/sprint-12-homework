const usersRouter = require('express').Router();
const usersItems = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  res.send(usersItems);
});

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

module.exports = usersRouter;