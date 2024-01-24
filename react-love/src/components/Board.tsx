import Chord from './Chord';

const boardChords = [
  ['Eb', 'G', 'Bb'], // Eb
  ['C', 'Eb', 'G', 'Bb'], // Cm7
  ['G', 'Bb', 'D'], // Gm
  ['F', 'Ab', 'C'], // Fm
  ['C', 'Eb', 'G'], // Cm
];

type BoardProps = {
  chords: string[][]
}

const Board = ({chords}: BoardProps) => {
  if ( chords === null) {
    chords = boardChords;
  }
  return (
    <div className="board" id="sound-board">
      { chords.map((chord) => Chord(chord)) }
    </div>
  )
}

export default Board;
