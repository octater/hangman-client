'use strict'

const gamePhrase = require('./gamePhrase.js')

function resetAlphabetKeys () {
  $('#alphabet-keypad > .letter-disabled').each(function (index, element) {
    $(element).removeClass().addClass('letter-button')
  })
}

function removeLetters () {
  $('#word-to-guess').each(function (index, element) {
    $(element).children().html('')
  })
}

function removeBlanksAroundWord () {
  $('#word-to-guess').html('')
}

function setWord () {
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
  resetAlphabetKeys,
  removeLetters,
  removeBlanksAroundWord,
  setWord
}
