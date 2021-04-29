import React from "react";

const Pagination = ({length,setSelection,type}) => {
    const il = Array(length).fill(0);
    return (
    <ul className="pagination">
        <p className="type">{type}:</p>
        <li className="page-item">
            </li>
                {il.map((il,i)=>{
                return (<li className="page-item" key={i}><a className="page-link" href="#" onClick={()=>{setSelection(i+1)}}>{i+1}</a></li>)})}
            <li className="page-item">
        </li>
    </ul>
    )
}

export default Pagination
