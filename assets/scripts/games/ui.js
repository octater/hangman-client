'use strict'

const game = require('../game.js')
const api = require('./api')
// const ui = require('./ui')
const gamePhrase = require('../gamePhrase.js')
const player1 = require('../player1.js')

// const gamePlay = require('../gameplay.js')

const playGameSuccess = (data) => {
  game.game = data.game
  game.lettersPlayed = 0
  game.userId = player1.user.id
  game.phraseId = gamePhrase.content.phrase_content
  game.gameStatus = 0
  game.bodyParts = 0
  game.gameOver = 'N'

  $('.hangman-frames').css('opacity', 0)
  $('#hangman-frame0').css('opacity', 1)
  resetAlphabetKeypad()
  removeGraveyardLetters()
  removeCorrectlyGuessedLetters()
  removeFillInTheBlanksAroundOldWord()
  setWordToBeGuessed()
  console.log('playGameSuccess ', data)
}

const playGameFailure = (error) => {
  console.error('playGameFailure ', error)
  const title = 'ERROR'
  const body = 'Error with creating a new game -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const getPhraseSuccess = (data) => {
  console.log('getPhraseSuccess', data)
  // gamePhrase.content = data.phrase
  gamePhrase.content = data.phrase

  // console.log('here is gamePhrase.js from getPhraseSuccess ', gamePhrase)
  // console.log('here is id from gamePhrase.js from getPhraseSuccess ', gamePhrase.content.id)
  // console.log('here is the id + 1', gamePhrase.content.id + 1)

  api.playGame()
  .done(playGameSuccess)
  .fail(playGameFailure)
}

const getPhraseFailure = (error) => {
  console.error('getPhraseFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with getting phrase for the game -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const updateMoveSuccess = (data) => {
  // console.log('here is the game after an update move was issued', game)
}

const updateMoveFailure = (error) => {
  // console.error('createGameFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with move update for the game -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const myStatsSuccess = (data) => {
  console.log('here is the result of myStatsSuccess ', data)

  const gameRecord = getRecord(data)
  console.log('here is the game record: ', gameRecord)
  const title = 'Here are your game stats'
  const body = gameRecord
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const myStatsFailure = (error) => {
  // console.error('myStatsFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with my Stats.  Sorry bud -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const purgeMyStatsSuccess = (data) => {
  console.log('here is the result of purgeMyStatsSuccess ', data)

  const totalGames = purgeGames(data)
  // const gameRecord = getRecord(data)
  console.log('here is the totalGames: ', totalGames)
  const title = 'Purge Games'
  const body = totalGames
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const purgeMyStatsFailure = (error) => {
  // console.error('myStatsFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with purging your stats.  Sorry bud -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const purgeGameSuccess = (data) => {
  console.log('here is the result of myStatsSuccess ', data)
}

const purgeGameFailure = (error) => {
  // console.error('myStatsFailiure log', error)
  const title = 'ERROR'
  const body = 'Error with deleting game.  Sorry bud -- ' + error.statusText
  $('#alert-modal-title').html(title)
  $('#alert-modal-body').html(body)
  $('#alert-modal').modal('show')
}

const getRecord = function (data) {
  const games = data.games
  console.log('here is the const game ', games)
  // const obj = {}
  let winner = 0
  let loser = 0
  let incomplete = 0
  let finalRecord = ' '

  games.forEach(function (item) {
    // obj.game = item.game_status
    // obj.cells = item.cells
    console.log('here is the game_status is: ', item.game_status)
    // console.log('obj.cells is: ', obj.cells)

    if (item.game_status === 1) {
      winner += 1
    } else {
      if (item.game_status === 2) {
        loser += 1
      } else {
        incomplete += 1
      }
    }
  })

  finalRecord = winner + '-' + loser + ' you also have ' + incomplete + ' incomplete games'
  return finalRecord
}

const purgeGames = function (data) {
  const games = data.games
  console.log('here is the const game ', games)
  // const obj = {}
  const gamesToDelete = games.length

  games.forEach(function (item) {
    // obj.game = item.game_status
    // obj.cells = item.cells
    // console.log('here is the game_status is: ', item.game_status)
    // console.log('obj.cells is: ', obj.cells)

    api.purgeGame(item.id)
      .done(purgeGameSuccess)
      .fail(purgeGameFailure)
  })

  const finalRecord = 'You have just deleted ' + gamesToDelete + ' games'
  return finalRecord
}

function resetAlphabetKeypad () {
  $('#alphabet-keypad > .letter-disabled').each(function (index, element) {
    $(element).removeClass().addClass('letter-button')
  })
}

function removeGraveyardLetters () {
  $('#letter-graveyard > div').each(function (index, element) {
    $(element).remove()
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

function setWordToBeGuessed () {
  // gamePhrase.content.phrase_content
  // // set an all upper case version of the current word
  // currentWord = currentWordFull.toUpperCase()
  // // creates blocks in the DOM indicating where there are letters and spaces

  gamePhrase.content.phrase_content.split('').map(function (character) {
    const guessWordBlock = document.getElementById('word-to-guess')

    const domElem = document.createElement('div')

    if (character.match(/[a-z]/i)) {
      domElem.className = 'character-block is-letter'
    } else {
      domElem.className = 'character-block'
    }

    guessWordBlock.appendChild(domElem)
  })
}

module.exports = {
  playGameSuccess,
  playGameFailure,
  getPhraseSuccess,
  getPhraseFailure,
  updateMoveSuccess,
  updateMoveFailure,
  myStatsSuccess,
  myStatsFailure,
  purgeMyStatsSuccess,
  purgeMyStatsFailure,
  purgeGameSuccess,
  purgeGameFailure,
  getRecord
}
