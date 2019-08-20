var express = require('express');
var router = express.Router();
var users = require('../controllers/users')

/* GET user */
router.get('/:user_id', users.get_user)

/* GET users. */
router.get('/', users.get_users)

/* POST users. */
router.post('/', users.validate('create_user'), users.create_user)

/* POST login */
router.post('/login', users.validate('login'), users.login)

module.exports = router;
