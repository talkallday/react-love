import Box from '@mui/system/Box';

import { Chord, ChordInfo } from './Chord';

type BoardProps = {
  chords: ChordInfo[] | null,
  playingChord: number | null
}

const Board = ({chords, playingChord}: BoardProps) => {
  return (
    <Box className="board" id="sound-board">
      {
        chords
        ? chords.map((chord, index) => <Chord key={index} chord={chord} index={index} playingChordIndex={playingChord} />)
        : "no chords available"
      }
    </Box>
  )
}

export default Board;
