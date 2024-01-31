import Box from '@mui/system/Box';
import * as Tone from 'tone';

import Chord from './Chord';
import ChordInfo from '../../types/ChordInfo';

type BoardProps = {
  disabled: boolean,
  chords: ChordInfo[],
  playingChord: number | null,
  volume: number,
  userSynth: Tone.Synth | null,
  setUserSynth: Function,
}

const Board = ({disabled, chords, playingChord, volume, userSynth, setUserSynth}: BoardProps) => {
  return (
    <Box className="board" id="sound-board" sx={{ justifyContent: 'center' }}>
      {chords.map(
        (chord, index) =>
        <Chord
          disabled={disabled}
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
