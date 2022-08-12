import React from "react";
import Counters from "./Counters";

function HandleCounters({ getCount, counters, setCounters }) {
  const handleIncrement = (counter) => {
    const newCounters = [...counters];
    const index = newCounters.indexOf(counter);
    newCounters[index] = { ...counter };
    newCounters[index].value++;
    getCount(index, newCounters[index].value);
    setCounters(newCounters);
  };

  const handleDecrement = (counter) => {
    const newCounters = [...counters];
    const index = newCounters.indexOf(counter);
    newCounters[index] = { ...counter };
    if (index === 0 || index === 2) {
      newCounters[index].value > 1
        ? newCounters[index].value--
        : (newCounters[index].value = 1);
    } else {
      newCounters[index].value > 0
        ? newCounters[index].value--
        : (newCounters[index].value = 0);
    }
    getCount(index, newCounters[index].value);
    setCounters(newCounters);
  };

  return (
    <Counters
      counters={counters}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
}

export default HandleCounters;
