type PlayButtonProps = {
  playFunction: Function
}

const PlayButton = ({playFunction}: PlayButtonProps) => {
  return (
    <div style={{backgroundColor: "green"}} className="cell" id="play" onClick={() => playFunction()}>Play</div>
  )
}

export default PlayButton;
