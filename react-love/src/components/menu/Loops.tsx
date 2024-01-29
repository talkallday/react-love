import Option from './Option';

import { useState, ChangeEvent } from 'react';

type LoopsProps = {
  loopTimes: number,
  setLoopTimesCallback: Function
}

const Loops = ({loopTimes, setLoopTimesCallback}: LoopsProps) => {
  const timeOptions = [];
  for (let v = 0; v < 16; v++) {
    var optionValue = v + 1;
    timeOptions.push(optionValue)
  }

  const submitLoops = (newLoopTimes: number) => {
    setLoopTimesCallback(newLoopTimes)
  }

  return (
    <form id="loop-form" style={{ width: '5rem' }}>
      <select id="loops-select" name="loops" value={loopTimes} onChange={(e) => submitLoops(e.target.value)}>
        {timeOptions.map((option, index) => Option(option, index))}
      </select>
      <label color="white">Loops</label>
    </form>
  )
}

export default Loops;
