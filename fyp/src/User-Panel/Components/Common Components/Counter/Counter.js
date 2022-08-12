import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

function Counter(props) {
  return (
    <div className="travelers-buttons">
      <button
        className="traveler traveler-btn"
        onClick={() => props.onDecrement(props.counter)}
      >
        <AiOutlineMinusCircle />
      </button>
      <span className="traveler">{formatCount(props)}</span>
      <button
        className="traveler traveler-btn"
        onClick={() => props.onIncrement(props.counter)}
      >
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
}

function formatCount(props) {
  const { value } = props.counter;
  return value === 0 ? 0 : value;
}

export default Counter;
