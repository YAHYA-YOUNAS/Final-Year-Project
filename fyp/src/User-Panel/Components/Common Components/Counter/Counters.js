import React from "react";
import Counter from "./Counter";

function Counters(props) {
  const { counters, onIncrement, onDecrement } = props;
  const handleCount = (count) => {
    props.count(count);
  };
  return (
    <div>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          counter={counter}
          count={handleCount}
        />
      ))}
    </div>
  );
}

export default Counters;
