var express = require('express');
var router = express.Router();
var users = require('../controllers/users')

/* GET users. */
router.get('/', function(req, res, next) {
  res.send('respond with users');
});

/* POST users. */
router.post('/', users.create_user)

module.exports = router;
