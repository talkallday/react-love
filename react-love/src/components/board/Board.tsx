import { Chord, ChordInfo } from './Chord';

type BoardProps = {
  chords: ChordInfo[] | null,
  playingChord: number | null
}

const Board = ({chords, playingChord}: BoardProps) => {
  return (
    <div className="board" id="sound-board">
      {
        chords
        ? chords.map((chord, index) => <Chord key={index} chord={chord} index={index} playingChordIndex={playingChord} />)
        : "no chords available"
      }
    </div>
  )
}

export default Board;
