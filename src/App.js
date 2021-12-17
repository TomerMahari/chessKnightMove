import './App.css';
import { ChessBoard } from './components/chessBoard/chessBoard';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the self played chess</h1>
      <h2>Choose the column you want to start with!</h2>
      <h4>And we will try to make the best of it</h4>
      <ChessBoard />
    </div>
  );
}

export default App;
