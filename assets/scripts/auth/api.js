'use strict'

// const app = require('../app')
const player1 = require('../player1.js')
const config = require('../config')

const signUp = function (data) {
  console.log('here is my data: ', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  // console.log('here is my signIn data', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    // url: app.host + '/sign-in/',
    method: 'POST',
    data
  })
}

const signOut = function () {
  let playerId = 0
  let playerToken = 0

  playerId = player1.user.id
  playerToken = player1.user.token
    // console.log('user player1 for signout ', player1)

  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + playerId,
    headers: {
      Authorization: 'Token token=' + playerToken
    }
  })
}

const changePassword = function (data) {
  let playerId = 0
  let playerToken = 0

  playerId = player1.user.id
  playerToken = player1.user.token
    // console.log('user player1 for signout ', player1)

  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + playerId,
    headers: {
      Authorization: 'Token token=' + playerToken
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
