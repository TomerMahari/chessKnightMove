import './App.css';
import { ChessBoard } from './components/chessBoard/chessBoard';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the self played chess</h1>
      <h2>Chose the column ou want to start with!</h2>
      <ChessBoard />
    </div>
  );
}

export default App;
