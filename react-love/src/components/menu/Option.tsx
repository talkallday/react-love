import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';

const Option = (choice: number, key: number) => {
  return (
    <MenuItem value={choice} key={key}>{choice}</MenuItem>
  )
}

export default Option;
