import './App.css';
import Game from "./components/Game";

function App() {


  return (
    <div className="App">
      <header className="header">
        <h1>Ordle</h1>
      </header>
        <div className="page-container">
          <Game />
        </div>
    </div>
  );
}

export default App;
