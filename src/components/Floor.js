import React from 'react'

const floor = ({numberOfElevators,floorNumber}) => {
    const floors = {
        squars: [],
        name: "",
    }
    // console.log(floorNumber);
    switch(parseInt(floorNumber)){
        case 0:
            floors.name = "Ground Floor"
            break;
        case 1:
            floors.name = "1st"
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
            <div className="floor-square" key={i}></div>
        );
      }
    return (
        <div className="floor">
            <p>{floors.name}</p>
            {floors.squars}
            <button type="button" className="btn btn-success">Call</button>
        </div>
    )
}

export default floor;