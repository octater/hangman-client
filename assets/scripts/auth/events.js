'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const player1 = require('../player1.js')

const setAPIOrigin = require('../../../lib/set-api-origin')

const onSignUp = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)

  // console.log('made it to onSignUp, data is: ', data)

  api.signUp(data)
    .done(ui.signUpSuccess)
    .fail(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)

  // console.log('made it to onSignIn, data is: ', data)
  if (player1.user.id !== 0) {
    const title = 'Danger Will Robinson'
    const body = 'User is are already signed in.  Please sign-out'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  api.signIn(data)
    .done(ui.signInSuccess)
    .fail(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    const title = 'Danger Will Robinson'
    const body = 'Player is already signed out.  Please sign in to play'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  api.signOut(data)
    .done(ui.signOutSuccess)
    .fail(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    const title = 'Danger Will Robinson'
    const body = 'Player is not signed in.  You must be signed in to change your password'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .fail(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers,
  setAPIOrigin
}
