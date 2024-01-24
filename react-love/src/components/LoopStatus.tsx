type StatusProps = {
  loopTimes: number
}

const LoopStatus = ({loopTimes}: StatusProps) => {
  return (
    <div className="cell" id="play-status">Loop 0 of {loopTimes}</div>
  )
}

export default LoopStatus;
