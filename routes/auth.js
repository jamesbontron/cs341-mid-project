const passport = require('passport')
const routes = require('express').Router()

// @desc    Auth with Google
// @route   GET /auth/google
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
routes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
routes.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = routes