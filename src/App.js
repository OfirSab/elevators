import './App.css';
import Elevators from './components/Elevators'
import Preference from './components/Preference'
import Building from './components/Building'

function App() {
  const elevatorNumber = 5;
  const floorsNumber = 10;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Elevators</h1>
        <Building numberOfElevators={elevatorNumber} numberOfFloors={floorsNumber}/>
      </header>
    </div>
  );
}

export default App;
