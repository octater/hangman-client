'use strict'

const player1 = require('../player1.js')

const signUpSuccess = (data) => {
  // console.log('ui success: ', data)
  $('#signUp').modal('hide')
}

const signUpFailure = (error) => {
  // console.error('failiure log', error)
  const title = 'Danger Will Robinson'
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
  const title = 'Danger Will Robinson'
  const body = 'Error with sign-in -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const signOutSuccess = () => {
  player1.user.id = 0
  // console.log('success log, signout player1 is ', player1)

  $('#signOut').modal('hide')
  $('#box1').css('background-color', '#fff')
  $('#box2').css('background-color', '#fff')
  $('#box3').css('background-color', '#fff')
  $('#box4').css('background-color', '#fff')
  $('#box5').css('background-color', '#fff')
  $('#box6').css('background-color', '#fff')
  $('#box7').css('background-color', '#fff')
  $('#box8').css('background-color', '#fff')
  $('#box9').css('background-color', '#fff')
  $('#player-now-up').text(' ')
}

const signOutFailure = (error) => {
  // console.error('signOutFailiure log', error)
  const title = 'Danger Will Robinson'
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
  const title = 'Danger Will Robinson'
  const body = 'Error with changing password -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
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
