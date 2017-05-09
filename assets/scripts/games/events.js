'use strict'

const api = require('./api')
const ui = require('./ui')
const player1 = require('../player1.js')
const gamePhrase = require('../gamePhrase.js')
const game = require('../game.js')
// const bodyParts = 0
// let currentWordFull = ' '
// let currentWord = ' '

const setAPIOrigin = require('../../../lib/set-api-origin')

const onPlayGame = function (event) {
  event.preventDefault()

  // const data = getFormFields(event.target)

  // console.log('made it to onCreateGame')

  // if (Object.keys(player1).length === 0) {
  if (player1.user.id === 0) {
    // console.log('user player1 requested new game ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before creating a new game'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  } else {
    // console.log('player1 info is: ', player1)
  }

  api.getPhrase()
  .done(ui.getPhraseSuccess)
  .fail(ui.getPhraseFailure)
}

const onMyStats = function () {
  // event.preventDefault()

  // const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    // console.log('user player1 requested game stats ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before getting their stats'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  // console.log('made it to my stats logic: ', player1)

  api.myStats()
  .done(ui.myStatsSuccess)
  .fail(ui.myStatsFailure)
}

const purgeMyStats = function () {
  // event.preventDefault()

  // const data = getFormFields(event.target)

  if (player1.user.id === 0) {
    // console.log('user player1 requested game stats ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before purging their games'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  if (game.gameOver === 'N') {
    // console.log('user player1 requested game stats ', player1)
    const title = 'ERROR'
    const body = 'Please finish current game prior to deleting games.'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }
  // console.log('made it to my stats logic: ', player1)

  api.myStats()
  .done(ui.purgeMyStatsSuccess)
  .fail(ui.purgeMyStatsFailure)
}

function pickLetter () {
  if (player1.user.id === 0) {
    // console.log('user player1 requested new game ', player1)
    const title = 'ERROR'
    const body = 'Player must be signed in before playing a game'
    $('#alert-modal-title').html(title)
    $('#alert-modal-body').html(body)
    $('#alert-modal').modal('show')
    return
  }

  if (game.gameOver === 'Y') {
    return
  }

  let letterPicked = $(this)

  letterPicked
    .removeClass('letter-button')
    .addClass('letter-disabled')

  letterPicked = letterPicked.html()
  // console.log('Here is my picked letter ', letterPicked)
  // console.log('here is the phrase object ', gamePhrase)
  // console.log('here is the game object ', game)
  handlePickedLetter(letterPicked)
}

function handlePickedLetter (letterPicked) {
  game.lettersPlayed = game.lettersPlayed + 1
  const resultMatches = []
  // console.log('here is the phrase content ', gamePhrase.content.phrase_content)
  let ind = gamePhrase.content.phrase_content.indexOf(letterPicked)

  // if letterPicked matches one or more letters in the current word
  // push all instances of that letter to resultMatches
  while (ind !== -1) {
    resultMatches.push(ind)
    ind = gamePhrase.content.phrase_content.indexOf(letterPicked, ind + 1)
  }

  // if resultMatches is greater than 0 proceed to place them in the dom

  if (resultMatches.length > 0) {
    const letterBlocks = document.getElementsByClassName('is-letter')
    resultMatches.map(function (num) {
      const domElem = document.createElement('span')
      domElem.innerHTML = gamePhrase.content.phrase_content[num].toUpperCase()
      letterBlocks[num].appendChild(domElem)
      displayCongratulatoryMessageOnWin()
    })
  // if letterBlock is not greater than 0 put the letter in the graveyard
  } else {
    addBodyPart()
    displayGameOverMessageOnLose()
  }
  updtGame()
}

function displayCongratulatoryMessageOnWin () {
  const correctlyGuessedLettersCount = $('.is-letter > span').length
  // console.log('here is the correctly guessed letter count: ', correctlyGuessedLettersCount)
  // console.log('here is the length of the phrase: ', gamePhrase.content.phrase_content.length)
  if (correctlyGuessedLettersCount === gamePhrase.content.phrase_content.length) {
    game.gameOver = 'Y'
    game.gameStatus = 1
    $('#congratulatory_message').modal('show')
    const gameWinnerMessage = "Congratulations, you've won the game in only - '" + game.lettersPlayed + "' letters"
    $('.winmess').text(gameWinnerMessage)
  }
}

function displayGameOverMessageOnLose () {
  // If number of letters guessed is equal to maxParts
  // console.log('here is the number of incorrect guesses: ', game.bodyParts)
  if (game.bodyParts === 7) {
    game.gameOver = 'Y'
    game.gameStatus = 2
    $('#gameover_message').modal('show')
    const gameOverMessage = "You took too many tries to guess the word. The correct word is - '" + gamePhrase.content.phrase_content + "'"
    $('.losemess').text(gameOverMessage)
  }
}

function addBodyPart () {
  const maxParts = 7
  if (game.bodyParts < maxParts) {
    ++game.bodyParts
    $('#hangman-frame' + game.bodyParts).css('opacity', 1)
  }
}

const updtGame = function () {
  // event.preventDefault()
  // const data = getFormFields(event.target)
  api.updateMove()
  .done(ui.updateMoveSuccess)
  .fail(ui.updateMoveFailure)
}

const addHandlers = () => {
  $('.play').on('click', onPlayGame)
  $('.stats').on('click', onMyStats)
  $('.purge').on('click', purgeMyStats)
  $('#alphabet-keypad').on('click', '.letter-button', pickLetter)
}

module.exports = {
  addHandlers,
  onMyStats,
  purgeMyStats,
  setAPIOrigin
}
