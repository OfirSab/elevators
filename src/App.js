import './App.css';
import React, { useState } from 'react';
import Preference from './components/Preference'
import Building from './components/Building'


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
        {(elevator&&floor&&speed) ? <Building numberOfElevators={elevator} numberOfFloors={floor} speed={speed}/> : <Preference setValues={setValues}/>}
      </header>
    </div>
  );
}

export default App;
