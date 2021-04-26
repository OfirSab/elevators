import React, { useEffect, Fragment } from 'react'
import elevatorIcon from '../elevator-icon.svg';
import ElevatorSvg from './ElevatorSvg'
import Floor from './Floor'

const elevator = () => {
    const floors = [1,2,3,4,5,6,7];
    const callsButtons = []
    for (let i = 0; i < floors; i++) {
      callsButtons.push(
        <button>Call</button>
      );
    }
    return (
            <div className="elevator">
            {floors.map(user => (<Floor key={user}/>))}
            <ElevatorSvg color="black"/>
            </div>
    )
  }

export default elevator;
