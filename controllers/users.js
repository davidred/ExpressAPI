const models = require ('../models')

exports.get_users = function(req, res, next) {
  res.json({users: []})
}

exports.create_user = function(req, res, next) {
  console.log('request body: ', req.body)
  // console.log('user email: ', req.body.email);
  return models.User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }).then(user => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(user))
  })
}
