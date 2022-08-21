import { useState, useRef } from 'react';
import './GameScreen.css';


const GameScreen = ({
  verifyLetter, pickedWord, pickedCategory, letters, letrasAdivinhadas,letrasErradas, chances, pontuacao}) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault();

      verifyLetter(letter);
      setLetter("");

      letterInputRef.current.focus();
    } 
  return (
    
    
    <div className="game">
      <p className="points">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {chances} tentativa(s).</p>
      <div className="wordContainer">

      {letters.map((letter, i) => (
        letrasAdivinhadas.includes(letter) ? (<span key={i} className="letter" value>{letter}</span>) :
        (<span key={i} className="blankSquare"></span> )
      ))}


     
      </div>
      <div className="letterContainer">
        <p>tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name='letter' maxLength="1" required 
          onChange={(e) => setLetter(e.target.value)} 
          value={letter}
          ref={letterInputRef}/>
          <button>jogar!</button>

        </form>
      </div>
      <div className="wrongLettersContainer">

        <p>Letras já utilizadas: </p>

        {letrasErradas.map((letter, i) => (
          <span key={i}>{letter}, </span>
        )) }

      </div>
    </div>
  )
}

export default GameScreen