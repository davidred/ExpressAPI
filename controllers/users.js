const models = require ('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.get_user = function(req, res, next) {
  return models.User.findOne({
    where: {
      id: req.params.user_id
    }
  }).then(user => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(user))
  })
}

exports.get_users = function(req, res, next) {
  return models.User.findAll().then(users => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(users))
  })
}

exports.create_user = function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    return models.User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
    }).then(user => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(user))
    })
  })
}

// Generate JWT after successful login
exports.login = function(req, res, next) {
  const user = models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user == null) {
      res.status(401).send('Incorrect username and password combination')
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result) {
          const token = jwt.sign({ foo: 'bar' }, process.env.SECRET);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(token))
        } else {
          res.status(401).send('Incorrect username and password combination')
        }
      })
    }
  })
}
