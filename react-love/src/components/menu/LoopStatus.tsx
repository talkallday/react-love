import Box from '@mui/system/Box';

import Loops from './Loops';

type StatusProps = {
  totalLoops: number,
  setTotalLoops: Function,
  playing: boolean,
  loop: number
}

const LoopStatus = ({totalLoops, setTotalLoops, playing, loop}: StatusProps) => {
  return (
    <Box
      sx={{ maxWidth: '8rem', fontSize: "0.7rem" }}
      className="cell"
      id="play-status"
    >
      Loop {loop} of {<Loops playing={playing} totalLoops={totalLoops} setTotalLoops={setTotalLoops} />}
    </Box>
  )
}

export default LoopStatus;
