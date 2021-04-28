import React, { Component } from 'react';
import { randomWord } from './words';
import '../styles/Hangman.css';

import img0 from '../img/0.jpg';
import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';
import img4 from '../img/4.jpg';
import img5 from '../img/5.jpg';
import img6 from '../img/6.jpg';

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
    let showButtons;

    if (this.state.nWrong < this.props.maxWrong) {
      showButtons = <p className='Hangman-btns'>{this.generateButtons()}</p>
      console.log(this.state.answer);
      console.log(this.state.guessed);
    } else {
      showButtons = <p className='Hangman-lose'>Incorrect! The Word Was: {this.state.answer}</p>
    }

    if (this.state.answer === this.state.guessed) {
      showButtons = <p className='Hangman-win'>You Win</p>
    }

    let altImg = `Guesses Remain: ${this.state.nWrong}/${this.props.maxWrong}`;

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altImg} />
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-guess'>Guesses Remaining: {this.props.maxWrong - this.state.nWrong}</p>
        {/*
        {this.state.nWrong != this.props.maxWrong &&
          <p className='Hangman-btns>{this.generateButtons()}</p>
        }
        */}
        {showButtons}
        <div>
          <button className='btn-reset' onClick={this.resetGame}>Restart</button>
        </div>
      </div >

    );
  }
}

export default Hangman;
