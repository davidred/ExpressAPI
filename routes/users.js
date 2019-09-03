const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const passport = require('passport')
require('../passport')

/* GET user */
router.get('/:user_id', passport.authenticate('jwt', {session: false}), users.get_user)

/* GET users. */
router.get('/', passport.authenticate('jwt', {session: false}), users.get_users)

/* POST users. */
router.post('/', users.validate('create_user'), users.create_user)

/* POST login */
router.post('/login', users.validate('login'), users.login)

module.exports = router;
