import Box from '@mui/system/Box';
import * as Tone from 'tone';

import ChordInfo from '../../types/ChordInfo';
import { getAllNotes } from '../../utils/notes';
import Note from './Note';

type ChordProps = {
  disabled: boolean,
  chord: ChordInfo,
  playingChordIndex: number | null,
  volume: number,
  userSynth: Tone.Synth | null,
  setUserSynth: Function,
  index: number
}

const Chord = ({
  disabled,
  chord,
  playingChordIndex,
  volume,
  userSynth,
  setUserSynth,
  index}: ChordProps) =>
{
  const chordNotes = getAllNotes(chord.notes);
  return (
    <Box className="row">
      <Box key={index} className="index">{index + 1}</Box>
      {chordNotes.map(
        (note) =>
        <Note
          disabled={disabled}
          isPlaying={index === playingChordIndex}
          key={note}
          note={note}
          volume={volume}
          userSynth={userSynth}
          setUserSynth={setUserSynth}
          />
      )}
      <Box key={"" + index + chord.duration} className="index">{chord.duration}</Box>
    </Box>
  )
}

export default Chord;
