import './App.css';
import Header from './Components/Header';
import GameBoard from './Components/GameBoard';
import { useState } from 'react';
import Rules from './Components/Rules';

function App() {
  const [displayRules, setDisplayRules] = useState(false)

  function showRules(){
    setDisplayRules(!displayRules)
  }

  return (
    <div className='flex justify-center bg-slate-700 h-screen w-screen focus: outline-none'>
      <div className='min-w-[320px] max-w-screen'>
        <Header handleShowRulesClick={showRules} rulesDisplayed={displayRules}/>
        <Rules displayed={displayRules} /> 
        <GameBoard displayed={!displayRules} />
      </div>
    </div>
  );
}

export default App;
