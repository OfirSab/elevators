import React,{useState,useEffect} from 'react'
import Square from './Square'

const Floor = ({numberOfElevators,floorNumber,call}) => {
    const [time,setTime] = useState("")
    const clicked = false;
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
            // <div className="floor-square" key={i}></div>
            <Square text={time} key={i}/>
        );
      }
    // setWholeFloor(floors)
    // console.log(wholeFloor);
    const setCountTime = (time,elevatorNumber) => {
        // floors[elevatorNumber].innerHTML = time
        // floors.squars[0].innerText = time
        // floors.squars[elevatorNumber].props.text = "100"
        // floors.squars[elevatorNumber].props.text = "1"
        // setTime("2")
        console.log(floors.squars[elevatorNumber]);
    }
      const clickHandle = () => {
        call(floors.name.slice(0,1))
        setCountTime(time,0)
      }
    return (
        <div className="floor">
            <p>{floors.name}</p>
            {floors.squars}
            {/* {wholeFloor.squars} */}
            <button type="button" className="btn btn-success" onClick={clickHandle} >Call</button>
        </div>
    )
}

export default Floor;