const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../config')
const Users = require('./model')
const { checkUsernameExists, validatateRegister, validatateLogin } = require('./middleware')

router.post('/register', validatateRegister, (req, res, next) => {

    let user = req.body

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)

    user.password = hash
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved)
      })
      .catch(next)

  });


  router.post('/login', validatateLogin, checkUsernameExists, (req, res, next) => {

    let { username, password } = req.body
  
    Users.findBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome, ${user.username}`,
            token,
          })
        } else {
          next({ status: 401, message: 'invalid credentials' })
        }
      })
      .catch(next)
  });

  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };
    
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

module.exports = router
