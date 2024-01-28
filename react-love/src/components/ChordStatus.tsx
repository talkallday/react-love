type ChordStatusProps = {
  playingChord: number
}
const ChordStatus = ({playingChord}: ChordStatusProps) => {
  return (
    <div
      className="cell"
      id="play-color">
      { playingChord !== null ? "Chord " + playingChord : "Not playing" }
    </div>
  )
}

export default ChordStatus;
