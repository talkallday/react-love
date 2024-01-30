import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Option from './Option';

import { useState, ChangeEvent } from 'react';

type LoopsProps = {
  loopTimes: number,
  setLoopTimesCallback: Function
}

const Loops = ({loopTimes, setLoopTimesCallback}: LoopsProps) => {
  const timeOptions = [...Array(17).keys()].slice(1);

  return (
    <form id="loop-form" style={{ width: '5rem', color: 'white' }}>
      <Select
        sx={{ color: 'white' }}
        id="loops-select"
        name="loops"
        defaultValue={loopTimes}
        onChange={e => setLoopTimesCallback((e.target as HTMLInputElement).value)}
        >
        {timeOptions.map((option, index) => <MenuItem value={option}>{option}</MenuItem>)}
      </Select>
      <label color="white">Loops</label>
    </form>
  )
}

export default Loops;
