const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

routes.use('/', require('./swagger'));
routes.use('/toDoList', require('./toDoList'));
routes.use('/auth', require('./auth'));



// @desc    Login/Landing page
// @route   GET /
routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
routes.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      name: req.user.firstName
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = routes
