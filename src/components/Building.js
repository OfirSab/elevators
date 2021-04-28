import React,{useState,useEffect} from 'react'
import Elevator from './Elevator'
import Floor from './Floor'

const Building = ({numberOfElevators,numberOfFloors}) => {

    var status = {
      FREE: "black",
      MOVING: "red",
      ARRIVED: "springgreen",
    };
    var btnStatus = {
      FREE: {btn:"btn btn-success",text:"Call"},
      WATING: {btn:"btn btn-danger",text:"Wating"},
      ARRIVED: {btn:"btn btn-outline-success",text:"Arrived"}
    };
    var countTimer = Array(numberOfFloors).fill(7)
    const [countTimerr,setCountTimerr] = useState(()=>{return Array(numberOfFloors).fill(8)})
    const GROUND_FLOOR = (numberOfFloors-1) * 60 + 45;
    const SPEED = 4;
    const [elevatorDOM,setElevatorDOM] = useState(null)
    var floorSquares = document.querySelectorAll(`.floor-square`);
    var floors = document.querySelectorAll(`.floor`);

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

      const changeElevatorColor = (floor,elevator,newStatus,time) => {
        elevator.query.childNodes[0].childNodes[0].attributes[1].value = newStatus
         setTimeout(()=>{
          elevator.query.childNodes[0].childNodes[0].attributes[1].value = status.FREE
          changeCallBtn(floor,btnStatus.FREE)
         },time)
       }

       const changeCallBtn = (floor,newStatus) => {
        floors[floor].children[floors[floor].children.length-1].className = newStatus.btn
        floors[floor].children[floors[floor].children.length-1].innerText = newStatus.text
       }




      // Getting elevator and floor number and Update the floor in accordance
      const updateFloor = (elevator,floor) =>{
        const position = GROUND_FLOOR - (floor * 60);
        var pos = elevator.query.style.top.slice(0,-2)
        var calcSpeed = SPEED * 0.5
        var seconds = Math.floor((Math.abs((elevator.floor-floor)*60)/(33.3*calcSpeed)))
        changeCallBtn(floor,btnStatus.WATING,seconds)
        setCountTime(seconds-1,floor,elevator.id);
        elevator.query.childNodes[0].childNodes[0].attributes[1].value = status.MOVING
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
                pos = Number(pos) - Number(calcSpeed);
              }else{
                clearInterval(updateElevator)
                changeElevatorColor(floor,elevator,status.ARRIVED,2000)
                changeCallBtn(floor,btnStatus.ARRIVED)
              }
              break;
            case "DOWN":
              if(pos < position){
                elevator.query.style.top = pos  + "px"
                pos = Number(pos) + Number(calcSpeed);
              }
              else{
                clearInterval(updateElevator)
                changeElevatorColor(floor,elevator,status.ARRIVED,2000)
                changeCallBtn(floor,btnStatus.ARRIVED)
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
      updateFloor(elevatorDOM[0],floor)

     }
     const floorsDivs = []
     for (let i = 0; i < numberOfFloors; i++) {
       floorsDivs.push(
         <Floor call={call} timeToArrive={countTimerr[i]} numberOfElevators={numberOfElevators} floorNumber={i} key={i}/>
         );
       }


       const setCountTime = (timer,floor,elevatorNumber) => {
        const calculate = floor * 5 + elevatorNumber;
        floorSquares[calculate].children[elevatorNumber].innerText = `${timer+1} Sec`
        changeCallBtn(floor,btnStatus.WATING)
        const interval = setInterval(()=>{
          if(timer>0){
            floorSquares[calculate].children[elevatorNumber].innerText = `${timer} Sec`
            timer--;
          }else{
            setInterval(()=>{clearInterval(interval)},900)
            floorSquares[calculate].children[elevatorNumber].innerText = ""
          }
        },1100)
    }

    return (
        <div className="building">
            {floorsDivs}
            <div className="elevators">
          {elevatorsDivs}
          </div>
        </div>
    )
}

export default Building;