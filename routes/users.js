// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const path = require('path');
const usersRouter = require('express').Router();

const usersFile = path.join(__dirname, '../data/users.json');
fs.access(usersFile, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    usersRouter.use('/', (req, res) => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
  } else {
    // eslint-disable-next-line no-unused-vars,global-require,import/no-dynamic-require
    const usersItems = require(usersFile);
    // eslint-disable-next-line global-require
    usersRouter.get('/users', (req, res) => {
      res.send(usersItems);
    });

    usersRouter.get('/users/:id', (req, res) => {
      const { id } = req.params;
      // eslint-disable-next-line no-underscore-dangle
      const user = usersItems.find((item) => item._id === id);

      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    });
  }
});

module.exports = usersRouter;
