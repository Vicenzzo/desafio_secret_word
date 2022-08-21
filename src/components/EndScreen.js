import './EndScreen.css';

const EndScreen = ({retry, pontuacao}) => {
  return (
    <div>
      <h1>FIM DE JOGO</h1>
      <h2>A sua Pontuação foi: <span>{pontuacao}</span></h2>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default EndScreen