import { Chord, ChordInfo } from './Chord';

type BoardProps = {
  chords: ChordInfo[],
  playingChord: number | null
}

const Board = ({chords, playingChord}: BoardProps) => {
  return (
    <div className="board" id="sound-board">
      {chords.map((chord, index) => <Chord key={index} chord={chord} index={index} playingChordIndex={playingChord} />)}
    </div>
  )
}

export default Board;
