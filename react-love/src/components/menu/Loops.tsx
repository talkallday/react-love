import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useState, ChangeEvent } from 'react';

type LoopsProps = {
  playing: boolean,
  totalLoops: number,
  setTotalLoops: Function
}

const Loops = ({playing, totalLoops, setTotalLoops}: LoopsProps) => {
  const timeOptions = [...Array(17).keys()].slice(1);

  return (
    <form id="loop-form">
      <Select
        disabled={playing}
        sx={{ color: 'white', width: '5rem', backgroundColor: 'gray', padding: "0rem 1rem", maxHeight: "1.5rem" }}
        id="loops-select"
        name="loops"
        value={totalLoops}
        onChange={e => setTotalLoops((e.target as HTMLInputElement).value)}
        >
        {timeOptions.map((option, index) => <MenuItem key={index} value={option}>{option}</MenuItem>)}
      </Select>
    </form>
  )
}

export default Loops;
