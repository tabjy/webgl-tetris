import '../styles/main.scss'

import tetris from './tetris'

(() => {
  const canvas = document.querySelector('#canvas')
  tetris.start(canvas)
})()
