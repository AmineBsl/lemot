import './App.css';
import Header from './Components/Header';
import GameBoard from './Components/GameBoard';

function App() {



  return (
    <div className='flex justify-center bg-slate-700 h-screen w-screen focus: outline-none'>
      <div className='h-screen'>
        <Header />
        <GameBoard/>
      </div>
    </div>
  );
}

export default App;
