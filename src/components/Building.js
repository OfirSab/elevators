import React from 'react'
import Elevator from './Elevator'
import Floor from './Floor'

const Building = ({numberOfElevators,numberOfFloors}) => {
    const elevators = []
    for (let i = 0; i < numberOfElevators; i++) {
      elevators.push(
          <Elevator key={i}></Elevator>
        );
      }
      const arr = [];
      for(var i=0;i<numberOfFloors;i++){ arr.push(i)}
    return (
        <div className="building">
          <div className="elevators">
          {elevators}
          </div>
            {arr.map((index)=>(<Floor numberOfElevators={numberOfElevators} floorNumber={index} key={index}/>))}
            
        </div>
    )
}

export default Building;