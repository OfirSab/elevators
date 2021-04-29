import React, { useState } from "react";
import Pagination from './Pagination'

const Preference = ({setValues}) => {
  const [el,setEl] = useState(null)
  const [fl,setFl] = useState(null)
  const [sp,setSp] = useState(null)
  return (
    <nav aria-label="Page navigation example">
      <div className="pagination"><Pagination setSelection={(value)=>{setEl(value)}} length={5} type="Elevators"/> <div className="selection">{el}</div></div>
      <div className="pagination"><Pagination setSelection={(value)=>{setFl(value)}} length={10} type="Floors"/><div className="selection">{fl}</div></div>
      <div className="pagination"><Pagination setSelection={(value)=>{setSp(value)}} length={10} type="Speed"/><div className="selection">{sp}</div></div>

      <button className="btn btn-success p-btn" type="submit" onClick={()=>{setValues(el,fl,sp)}}>Ok</button>
    </nav>
  );
};

export default Preference;
