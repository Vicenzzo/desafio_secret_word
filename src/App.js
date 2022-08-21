// CSS
import './App.css';

// React

import {useCallback, useEffect, useState} from "react";

// data 

import {wordsList} from "./data/word";

// components

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const stages = [
  {id: 1, name: "start"}, 
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const chancesNumber = 3;



function App() {


  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([])
  const [chances, setChances] = useState(chancesNumber)
  const [pontuacao, setPontuacao] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    // PICK A RANDOM CATEGORY, PEFA A MINHA OBJETO CHAVE, QUE SERIA MINHA GAREGORIA 
    // E COLOCA EM NOSSO STATE WORDS
      const categories = Object.keys(words);
      //CRIA UMA VARIAVEL CATEGORY, QUE VAI RECEBER NOSSA CATEGORIES 
      //LOGO APOSTO ELE ABRE COLCHETES PARA RECUPERAR O INDICE DE MINHAS PALAVRA 
      //PEGA NOSSA BIBLIOTECA Math E VAMOS UTILIZAR O floor QUE PEGA O MENOR NUMERO, E 
      // ARREDONDA PRA BAIXO TMB, LOGO APOS ABRE PAREBTESES E DESTA VEZ UTILIZAMOS O random 
      // PARA PEGAR UM NUMERO RANDOMICO, MULTIPLICAMOS PELO QUANTIDADE TOTAL DE CATEGORIAS 
      // QUE TEMOS
      const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];




   // PICK A RANDOM WORD

   const word = words[category][Math.floor(Math.random() * words[category].length)];

   return {word, category};
  }, [words]);

  // FUNCAO PARA MUDAR O STATE DO STAGES E MUDAR PRO COMPONENTE DE GameScreen
  const startGame = useCallback(() =>{  
    // LIMPANDO AS LETRAS 
    clearLetrasStates();

    const {word, category} = pickWordAndCategory();


    // CRIAR UMA ARRAY DE PALAVRAS
    let wordLetter = word.split("");
    wordLetter = wordLetter.map((l) => l.toLowerCase())



    

    // FILL STATES 

    setPickedWord(word);
    setPickedCategory(category);
  setLetters(wordLetter);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process the letter input 
  const verifyLetter = (letter) => {


    const normalizedLetter = letter.toLowerCase()

    // chegagem se a letra foi utilizada

    if(letrasAdivinhadas.includes(normalizedLetter) || letrasErradas.includes(normalizedLetter)){

      return
    }

    // tentativas 

      if(letters.includes(normalizedLetter)){
        setLetrasAdivinhadas((actualLetrasAdivinhadas) => [
          ...actualLetrasAdivinhadas,
          normalizedLetter
        ])
      }else{
        setLetrasErradas((actualLetrasErradas) => [
          ...actualLetrasErradas,
          normalizedLetter
        ]);

        setChances((actualChances) => actualChances - 1);
      }
     

    // const value = null;
    // letters.map((e) => {

    //   if(letter === e){
    //     setLetrasAdivinhadas(e);
        
    //   }
      
    //   if(letter !== e){
    //     setChances(chances - 1);
        
    //   }

  }//)

  const clearLetrasStates = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  }

  //monitorar se nossas tentativas terminaram 

  useEffect(() => {
    if(chances <= 0){
      // ReSETAR O STATE

      clearLetrasStates();
      setGameStage(stages[2].name);
    }
  }, [chances]);
// monitorar se se tivemos uma vitoria

  useEffect(() => {
   
    const unicaLetras = [...new Set(letters)]

    //CONDIÇÂO DO JOGO
   
    if(letrasAdivinhadas.length === unicaLetras.length){
      setPontuacao((actualPontuacao) => ( actualPontuacao += 100))

      startGame();
    }
  }, [letrasAdivinhadas, letters, startGame]);

  
  
  const retry = () => {

    setPontuacao(0);
    setChances(chancesNumber);
    setGameStage(stages[0].name);
  }
  


  // FUNCAO PARA MUDAR O STATE DO STAGES E MUDAR PRO COMPONENTE DE EndScreen




  return (
    <div className="App">
    
  
    {gameStage === "start" && <StartScreen startGame={startGame}/>}
    {gameStage === "game" && <GameScreen
    verifyLetter={verifyLetter}
    pickedWord={pickedWord}
    pickedCategory={pickedCategory}
    letters={letters}
    letrasAdivinhadas={letrasAdivinhadas}
    letrasErradas={letrasErradas}  
    chances={chances} 
    pontuacao={pontuacao} />}
    {gameStage === "end" && <EndScreen retry={retry} pontuacao={pontuacao}/>}
    </div>
  );
}

export default App;
