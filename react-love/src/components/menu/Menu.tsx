import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

import ChangeSong from './ChangeSong';
import ChordInfo from '../../types/ChordInfo';
import ChordStatus from './ChordStatus';
import LoopStatus from './LoopStatus';
import Play from './Play';
import Loops from './Loops';
import Tempo from './Tempo';
import Volume from './Volume';

type MenuProps = {
  chords: ChordInfo[],
  setPlayingChordIndex: Function,
  playingChord: number | null,
  synth: Tone.PolySynth | null,
  userSynth: Tone.Synth | null,
  disabled: boolean,
  volume: number,
  setVolume: Function,
  setChords: Function,
  enablePlay: Function
}

const Menu = ({
  chords,
  synth,
  userSynth,
  enablePlay,
  setPlayingChordIndex,
  playingChord,
  setChords,
  volume,
  setVolume,
  disabled}: MenuProps) => {
  const [totalLoops, setTotalLoops] = useState(4);
  const [loop, setLoop] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <Box className="row">
      <Play
        chords={chords}
        setLoopCallback={setLoop}
        setPlayingChordIndex={setPlayingChordIndex}
        disabled={disabled}
        enablePlay={enablePlay}
        playing={playing}
        setPlaying={setPlaying}
        totalLoops={totalLoops}
        synth={synth}
        />
      <Tempo synth={synth} />
      <LoopStatus loop={loop} playing={playing} totalLoops={totalLoops} setTotalLoops={setTotalLoops} />
      <ChordStatus playingChord={playingChord} />
      <Volume volume={volume} setVolume={setVolume} synth={synth} userSynth={userSynth} />
      <ChangeSong chords={chords} setChords={setChords} />
    </Box>
  )
}

export default Menu;
