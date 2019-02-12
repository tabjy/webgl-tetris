import '../styles/main.css'

import tetris from './tetris'
// import test from './tetris/test'

(() => {
  const canvas = document.querySelector('#canvas')
  // test.start(canvas)
  tetris.start(canvas)
})()
