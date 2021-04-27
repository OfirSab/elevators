import React,{useState} from 'react'

const Square = ({text}) => {
    // const [currText,setCurrText] = useState("")
    
    return (
        <div className="floor-square">
            <p className="square-text">{text}</p>
        </div>
    )
}

export default Square
