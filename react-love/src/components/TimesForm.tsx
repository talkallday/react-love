import { useState, ChangeEvent } from 'react';
import Option from './Option';

type TimeFormProps = {
  defaultLoopTimes: number,
  setLoopTimesCallback: Function
}

const TimesForm = ({defaultLoopTimes, setLoopTimesCallback}: TimeFormProps) => {
  const [loopTimes, setLoopTimes] = useState(defaultLoopTimes)
  const timeOptions = [];
  for (let v = 0; v < 16; v++) {
    var optionValue = v + 1;
    timeOptions.push(optionValue)
  }

  const submitTimes = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const timesInput = document.getElementById('loops-select') as HTMLInputElement;
    const newLoopTimes = Number(timesInput?.value) ?? defaultLoopTimes;
    setLoopTimes(newLoopTimes);
    setLoopTimesCallback(newLoopTimes)
  }

  return (
    <form id="loop-form">
      <select id="loops-select" name="loops" value={loopTimes} onChange={(e) => submitTimes(e)}>
        {timeOptions.map((option, index) => Option(option, index))}
      </select>
      <label color="white">Loops</label>
    </form>
  )
}

export default TimesForm;
