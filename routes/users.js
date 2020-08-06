const usersRouter = require('express').Router();
const usersItems = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  res.send(usersItems);
});

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = usersItems.filter((item) => item._id === id);

  if(user.length) {
    res.send(user);
  } else {
    res.send({ "message": "Нет пользователя с таким id" })
  }

});

module.exports = usersRouter;