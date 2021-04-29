import React, { Component } from 'react';
import { randomWord } from './words';
import '../styles/Hangman.css';

import img0 from '../img/0.png';
import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4 from '../img/4.png';
import img5 from '../img/5.png';
import img6 from '../img/6.png';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  /** Reset the game & choose a new word */
  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });

  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    //let guess=this.state.answer
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    //console.log(answer);
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}   // attached key
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /* render: render game */
  /* to end the game: 
  if state(nWrong) <= props(maxWrong)
  if {(this.state.nWrong < this.props.maxWrong) {
  this.generateButtons()
  }else {
  `You lose: ${this.state.answer}`
  }*/
  render() {
    let gameState = <p className='Hangman-btns'>{this.generateButtons()}</p>;
    let altImg = `Guesses Remain: ${this.state.nWrong}/${this.props.maxWrong}`;

    if (this.state.nWrong >= this.props.maxWrong) {
      gameState = <p className='Hangman-lose'>Incorrect! The Word Was: {this.state.answer}</p>
    }

    if (this.state.answer.split("").map(ltr => this.state.guessed.has(ltr)).every(x => x === true)) {
      gameState = <p className='Hangman-win'>You Win</p>
    }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altImg} />
        <p className='Hangman-guess'>Guesses Remaining: {this.props.maxWrong - this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>

        {/*
        {this.state.nWrong != this.props.maxWrong &&
          <p className='Hangman-btns>{this.generateButtons()}</p>
        }
        */}
        {gameState}
        <div>
          <button id='btn-reset' onClick={this.resetGame}>Restart</button>
        </div>
      </div >
    );
  }
}

export default Hangman;
