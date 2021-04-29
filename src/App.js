import './App.css';
import React, { useState } from 'react';
import Preferences from './components/Preferences'
import Building from './components/Building'
import Footer from './components/Footer'


function App() {
  const [elevator, setElevator] = useState(null);
  const [floor, setFloor] = useState(null);
  const [speed, setSpeed] = useState(null);
  const setValues = (el,fl,sp) => {
    setElevator(el);
    setFloor(fl)
    setSpeed(sp)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Elevators Exercise</h2>
        {(elevator&&floor&&speed) ? <Building numberOfElevators={elevator} numberOfFloors={floor} speed={speed}/> : <Preferences setValues={setValues}/>}
      </header>
      <Footer/>
    </div>
  );
}

export default App;
