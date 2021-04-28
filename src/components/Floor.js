import React,{useState,useEffect} from 'react'
import Square from './Square'

const Floor = ({numberOfElevators,floorNumber,call,timeToArrive}) => {
    const [time,setTime] = useState("")
     const floors = {
        squars: [],
        name: "",
    }
    switch(parseInt(floorNumber)){
        case 0:
            floors.name = "Ground Floor"
            break;
        case 1:
            floors.name = floorNumber+"st"
            break;
        case 2:
            floors.name = floorNumber+"nd"
            break;
        case 3:
            floors.name = floorNumber+"rd"
            break;
        default:
            floors.name = floorNumber+"th"
            break;
    }
    for (let i = 0; i < numberOfElevators; i++) {
        floors.squars.push(
            <Square text={time} key={i}/>
        );
      }
      const clickHandle = () => {
        call(floors.name.slice(0,1))
      }
    return (
        <div className="floor">
            <p>{floors.name}</p>
            {floors.squars}
            <button type="button" className="btn btn-success" onClick={clickHandle} >Call</button>
        </div>
    )
}

export default Floor;