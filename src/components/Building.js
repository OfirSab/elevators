import React from 'react'
import Elevator from './Elevator'

const Building = () => {
    const elevators = 4;
    const elevatorsArr = [];
    for (let i = 0; i < elevators; i++) {
        elevatorsArr.push(
          <Elevator key={i}></Elevator>
        );
        // elevatorsObjectArr.push({
        //   index: i,
        //   elevatorId: [`e${i + 1}`],
        //   currentFloor: 0,
        //   isFree: true
        // });
      }
    return (
        <div className="building">
            {elevatorsArr}
        </div>
    )
}

export default Building;