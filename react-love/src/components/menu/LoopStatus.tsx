import Box from '@mui/system/Box';

type StatusProps = {
  loopTimes: number,
  loop: number
}

const LoopStatus = ({loopTimes, loop}: StatusProps) => {
  return (
    <div className="cell" id="play-status">Loop {loop} of {loopTimes}</div>
  )
}

export default LoopStatus;
