import Box from '@mui/system/Box';
import * as Tone from 'tone';

import { Chord, ChordInfo } from './Chord';

type BoardProps = {
  chords: ChordInfo[],
  playingChord: number | null,
  volume: number,
  userSynth: Tone.Synth | null,
  setUserSynth: Function,
}

const Board = ({chords, playingChord, volume, userSynth, setUserSynth}: BoardProps) => {
  return (
    <Box className="board" id="sound-board" sx={{ justifyContent: 'center' }}>
      {chords.map(
        (chord, index) =>
        <Chord
          key={index}
          chord={chord}
          index={index}
          playingChordIndex={playingChord}
          volume={volume}
          userSynth={userSynth}
          setUserSynth={setUserSynth}
          />
      )}
    </Box>
  )
}

export default Board;
