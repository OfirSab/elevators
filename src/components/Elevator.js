import React, { useEffect, Fragment } from 'react'
import ElevatorSvg from './ElevatorSvg'

const Elevator = ({color}) => {
    return (
            <div className="elevator">
            <ElevatorSvg color={color}/>
            </div>
    )
  }

export default Elevator;
