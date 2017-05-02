'use strict'

const player1 = require('../player1.js')
const game = require('../game.js')
// const ui = require('../games/ui.js')

const signUpSuccess = (data) => {
  // console.log('ui success: ', data)
  $('#signUp').modal('hide')
}

const signUpFailure = (error) => {
  // console.error('failiure log', error)
  const title = 'ERROR'
  const body = 'Error with sign-up -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const signInSuccess = (data) => {
  console.log('signInSuccess data is: ', data)
  // if (Object.keys(player1).length === 0) {
  if (player1.user.id === 0) {
    player1.user = data.user
    console.log('success log, signin player1 is ', player1)
  }

  $('#signIn').modal('hide')
}

const signInFailure = (error) => {
  // console.error('signInFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with sign-in -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const signOutSuccess = () => {
  player1.user.id = 0
  // console.log('success log, signout player1 is ', player1)

  game.lettersPlayed = 0
  game.gameStatus = 0
  game.bodyParts = 0
  game.gameOver = 'N'

  $('.hangman-frames').css('opacity', 0)
  $('#hangman-frame0').css('opacity', 1)
  resetAlphabetKeypad()
  // removeGraveyardLetters()
  removeCorrectlyGuessedLetters()
  removeFillInTheBlanksAroundOldWord()
  $('#signOut').modal('hide')
}

const signOutFailure = (error) => {
  // console.error('signOutFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with sign-out -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const changePasswordSuccess = () => {
  // console.log('change password success')
  $('#changePassword').modal('hide')
}

const changePasswordFailure = (error) => {
  // console.error('change password Failiure log', error)
  const title = 'ERROR'
  const body = 'Error with changing password -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

function resetAlphabetKeypad () {
  $('#alphabet-keypad > .letter-disabled').each(function (index, element) {
    $(element).removeClass().addClass('letter-button')
  })
}

function removeCorrectlyGuessedLetters () {
  $('#word-to-guess').each(function (index, element) {
    $(element).children().html('')
  })
}

function removeFillInTheBlanksAroundOldWord () {
  $('#word-to-guess').html('')
}

module.exports = {
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
