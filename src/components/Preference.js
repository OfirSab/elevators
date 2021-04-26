import React, { useState } from "react";

const MAX_FLOORS = 10;
const MAX_ELEVATORS = 5;

const Preference = props => {
  const [floorsNum, setFloorsNum] = useState(4);
  const [elevatorsNum, setElevatorsNum] = useState(2);
  const { setChange } = props;

  const handleChange = (evt, func) => {
    evt.preventDefault();
    func(+evt.target.value);
  };

  const renderOptions = (element, length) => {
    let tempArr = [];
    let prefix;
    switch (element) {
      case "floors":
        prefix = "fo";
        break;
      case "elevators":
        prefix = "eo";
        break;
      default:
    }
    for (let i = 1; i <= length; i++) {
      tempArr.push(
        <option value={i} key={`${prefix}${i}`}>
          {i}
        </option>
      );
    }
    return tempArr;
  };

  return (
    <div className="settings">
      <div className="setting">
        <label htmlFor="floorsSelect" className="select-label me-1">
          Number Of Floors
        </label>
        <select
          name="floorsSelect"
          className="form-select"
          onChange={evt => handleChange(evt, setFloorsNum)}
          defaultValue={floorsNum}
        >
          {renderOptions("floors", MAX_FLOORS)}
        </select>
      </div>
      <div className="setting">
        <label htmlFor="elevatorsSelect" className="select-label me-1">
          Number Of Elevators
        </label>
        <select
          name="elevatorsSelect"
          className="form-select"
          onChange={evt => handleChange(evt, setElevatorsNum)}
          defaultValue={elevatorsNum}
        >
          {renderOptions("elevators", MAX_ELEVATORS)}
        </select>
      </div>
      <button
        className="confirm-btn"
        onClick={() => setChange(floorsNum, elevatorsNum)}>
        Confirm
      </button>
    </div>
  );
};

export default Preference;
