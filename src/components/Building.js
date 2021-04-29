import React,{useState,useEffect} from 'react'
import Elevator from './Elevator'
import Floor from './Floor'
import elevatorSound from '../assets/elevator-bell.mp3'

const Building = ({numberOfElevators,numberOfFloors,speed}) => {
  const ARRIVED_SOUND = new Audio(elevatorSound);
    var status = {
      FREE: "black",
      MOVING: "red",
      ARRIVED: "springgreen",
    };
    var btnStatus = {
      FREE: {btn:"btn btn-success",text:"Call"},
      WATING: {btn:"btn btn-danger disabled",text:"Wating"},
      ARRIVED: {btn:"btn btn-outline-success disabled",text:"Arrived"}
    };
    var SPEED = [0.25,0.5,1,2,3]
    var callsQueue = [];
    // const SPEED = speed;
    const GROUND_FLOOR = (numberOfFloors-1) * 60 + 45;
    const [elevatorDOM,setElevatorDOM] = useState(null)
    var floorSquares = document.querySelectorAll(`.floor-square`);
    var floors = document.querySelectorAll(`.floor`);
    var availableElevators = [null];
    const elevators = [];
    /**
    * Gets all the quary elevators and adding each one to an uniq object...
    * ...with suitables parameters.
    *
    * @param {integer} floor Floor "G" for the first time
    * @param {Object} elevator The suitable elevator
    */
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
      /**
      * Get elevator and floor and move the elevator to this floor
      *
      * @param {integer} floor Floor "G" for the first time
      * @param {Object} elevator The suitable elevator
      */
      const setFloor = (elevator,floor) =>{
        const position = GROUND_FLOOR - (floor * 60);
        elevator.query.style.top = position  + "px"
        elevator.query.style.display = "inline-block"
       }
      /**
      * Change the elevator color when to {newStatus} for {time} seconds
      *
      * @param {integer} floor Floor number who maked the call
      * @param {Object} elevator The suitable elevator
      * @param {Object(enum)} newStatus The appropirate status who represent the color
      * @param {Integer} time dest` floor who maked the call
      */
      const changeElevatorColor = (floor,elevator,newStatus,time) => {
        elevator.query.childNodes[0].childNodes[0].attributes[1].value = newStatus
         setTimeout(()=>{
          elevator.query.childNodes[0].childNodes[0].attributes[1].value = status.FREE
          elevator.status = "free"
          changeCallBtn(floor,btnStatus.FREE)
         },time)
       }
      /**
      * Change the call btn color
      *
      * @param {integer} floor Call floor
      * @param {Object(enum)} newStatus Enum who present the appropriate status
      */
       const changeCallBtn = (floor,newStatus) => {
        floors[floor].children[floors[floor].children.length-1].className = newStatus.btn
        floors[floor].children[floors[floor].children.length-1].innerText = newStatus.text
       }
      /**
      * Updating the position and color of the elevator till it gets to the dest` floor
      * ...also measure the time it will takes to reach the destination..
      * ...and passing it to setCountTime function for presentation.
      * 
      * @param {Object} elevator The free & closest elevator to the number of the floor call
      * @param {Integer} floor Destination floor
      */
        const updateFloor = (elevator,floor) =>{
        elevator.status = "busy"
        const position = GROUND_FLOOR - (floor * 60);
        var pos = elevator.query.style.top.slice(0,-2)
        console.log("speed: "+speed);
        console.log(SPEED[speed-1]);
        var calcSpeed = SPEED * 0.5
        var seconds = Math.floor((((Math.abs(elevator.floor-floor)-1)*60)/(15*SPEED[speed])))
        // console.log(Math.abs(elevator.floor-floor)-1);
        changeCallBtn(floor,btnStatus.WATING,seconds)
        setCountTime(seconds,floor,elevator.id);
        elevator.query.childNodes[0].childNodes[0].attributes[1].value = status.MOVING
        var direction = ""
        {elevator.floor < floor? direction = "UP" : direction = "DOWN"}
        elevator.floor = floor;
        const updateElevator = setInterval(()=>{
          switch(direction){
            case "UP":
              if(pos > position){
                elevator.query.style.top = pos  + "px"
                pos = Number(pos) - Number(SPEED[speed-1]);
              }else{
                stopIterval();
              }
              break;
            case "DOWN":
              if(pos < position){
                elevator.query.style.top = pos  + "px"
                pos = Number(pos) + Number(SPEED[speed-1]);
              }else{
                stopIterval();
              }
              break;
            default:
              break;
          }
        },30)
        const stopIterval = ()=>{
          clearInterval(updateElevator)
          changeElevatorColor(floor,elevator,status.ARRIVED,2000)
          changeCallBtn(floor,btnStatus.ARRIVED)
          ARRIVED_SOUND.play();
        }
       }

      /**
      * Set all the elevators to "G" floor at the first time
      */
      const executeElevators = () =>{
        if(elevatorDOM){
          elevatorDOM.map((elevator)=>{
          setFloor(elevator,elevator.floor)
          })
        }
      }
      executeElevators();
      /**
      * Handling calls: Adding calls to queue calls in case of unavailable elevator
      *
      * @param {integer} floor Floor number who maked the call
      */
     const call = (floor) =>{
      if(floor === 'G'){floor = 0};
        availableElevators = elevatorDOM.filter((el)=>{if(el.status == "free") {return el}})
        if(availableElevators.length == 0){
            watingTillFree(floor);
        }else{
            availableElevators.sort((a,b)=>{return Math.abs(a.floor-floor) - Math.abs(b.floor-floor)})
            updateFloor(availableElevators[0],floor)
        }
     }
      /**
      * Creates the elevators & floors elements who displayed in the component
      */
      const floorsDivs = []
        for (let i = 0; i < numberOfFloors; i++) {
        floorsDivs.push(
         <Floor call={call} numberOfElevators={numberOfElevators} floorNumber={i} key={i}/>
         );
       }
      const elevatorsDivs = []
        for (let i = 0; i < numberOfElevators; i++) {
        elevatorsDivs.push(
             <Elevator color={status.FREE} key={i}></Elevator>
          );
        }
      /**
      * Adding calls to the waiting queue till some elevator gets free
      *
      * @param {integer} floor dest` floor who maked the call
      */
       const watingTillFree = (floor) =>{
        if(callsQueue.indexOf(floor) == -1){
          callsQueue.push(floor) 

          const checking = setInterval(() => {
          availableElevators = elevatorDOM.filter((el)=>{if(el.status == "free") {return el}})
           if(availableElevators.length > 0){
             call(callsQueue.shift())
             clearInterval(checking)
           }
         },1000)
       }
      }
      /**
      * Set time stemp to the square destination
      *
      * @param {integer} timer the time it takes to reach the dest` floor
      * @param {integer} floor dest` floor inportant to calculate the correct square
      * @param {integer} elevatorNumber the elevator number who got the call
      */
      const setCountTime = (timer,floor,elevatorNumber) => {
        const calculate = floor * numberOfElevators + elevatorNumber;
        floorSquares[calculate].children[0].innerText = timer+1 > 60 ? `${Math.floor((timer+1)/60)} Min ${(timer+1)%60} Sec` : `${timer+1} Sec`
        changeCallBtn(floor,btnStatus.WATING)
        const interval = setInterval(()=>{
          if(timer>=0){
            floorSquares[calculate].children[0].innerText = timer > 60 ? `${Math.floor((timer)/60)} Min ${timer%60} Sec` : `${timer} Sec`
            timer--;
          }else{
            // setInterval(()=>{clearInterval(interval)},900)
            clearInterval(interval)
            floorSquares[calculate].children[0].innerText = ""
          }
        },1000)
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
