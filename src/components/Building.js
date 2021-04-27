import React,{useState,useEffect} from 'react'
import Elevator from './Elevator'
import Floor from './Floor'

const Building = ({numberOfElevators,numberOfFloors}) => {

    var status = {
      FREE: "black",
      MOVING: "red",
      ARRIVED: "springgreen",
    };
    const GROUND_FLOOR = (numberOfFloors-1) * 60 + 45;
    const SPEED = 3;
    const [elevatorDOM,setElevatorDOM] = useState(null)

    const elevators = [];
    useEffect(() => {
      const elevatorsTemp = document.querySelectorAll(`.elevator`);
      elevatorsTemp.forEach((elevator,index)=>{
        elevators.push({
          id: index,
          query: elevator,
          floor: 0,
          available: true,
          status: "free"
        })
      })
      setElevatorDOM(elevators)
      executeElevators();
    },[])
    const elevatorsDivs = []
    for (let i = 0; i < numberOfElevators; i++) {
      elevatorsDivs.push(
          <Elevator color={status.FREE} key={i}></Elevator>
        );
      }
      const arr = [];
      for(var i=0;i<numberOfFloors;i++){ arr.push(i)}

      const setFloor = (elevator,floor) =>{
        const position = GROUND_FLOOR - (floor * 60);
        elevator.query.style.top = position  + "px"
        elevator.query.style.display = "inline-block"
       }

       const changeElevatorColor = (elevator,newStatus,time) => {
        elevator.query.childNodes[0].childNodes[0].attributes[1].value = newStatus
         setTimeout(()=>{
          elevator.query.childNodes[0].childNodes[0].attributes[1].value = status.FREE
         },time)
       }
      // Getting elevator and floor number and Update the floor in accordance
      const updateFloor = (elevator,floor) =>{
        const position = GROUND_FLOOR - (floor * 60);
        var countTimer = 0;
        var pos = elevator.query.style.top.slice(0,-2)
        var direction = "";

        // Set the direction
        {elevator.floor < floor? direction = "UP" : direction = "DOWN"}
        // Updating the floor number
        elevator.floor = floor;

        const update = (direction) =>{
          switch(direction){
            case "UP":
              if(pos > position){
                elevator.query.style.top = pos  + "px"
                pos = Number(pos) - Number(SPEED);
              }else{
                clearInterval(updateElevator)
                changeElevatorColor(elevator,status.ARRIVED,2000)
                console.log(floorsDivs);
              }
              break;
            case "DOWN":
              if(pos < position){
                elevator.query.style.top = pos  + "px"
                pos = Number(pos) + Number(SPEED);
              }
              else{
                clearInterval(updateElevator)
                changeElevatorColor(elevator,status.ARRIVED,2000)
              }
              break;
            default:
              break;
          }
        }
        // Running the update function every 30 ms
        const updateElevator = setInterval(()=>{
          update(direction);
        },30)
        
       }

      // Set all the elevators to "Ground floor"
      const executeElevators = () =>{
        if(elevatorDOM){
          elevatorDOM.map((elevator)=>{
          setFloor(elevator,elevator.floor)
          })
        }
      }
      executeElevators();

      // Call elevator handle
     const call = (floor) =>{
      if(floor === 'G'){floor = 0};
      // setFloor(elevatorDOM[0],floor)
      updateFloor(elevatorDOM[0],floor)
     }
     const floorsDivs = []
     for (let i = 0; i < numberOfFloors; i++) {
       floorsDivs.push(
         <Floor call={call} numberOfElevators={numberOfElevators} floorNumber={i} key={i}/>
         );
       }
    return (
        <div className="building">
            {/* {arr.map((index)=>(<Floor call={call} numberOfElevators={numberOfElevators} floorNumber={index} key={index}/>))} */}
            {floorsDivs}
            <div className="elevators">
          {elevatorsDivs}
          </div>
        </div>
    )
}

export default Building;