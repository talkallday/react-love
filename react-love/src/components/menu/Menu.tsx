import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

import ChangeSong from './ChangeSong';
import ChordStatus from './ChordStatus';
import LoopStatus from './LoopStatus';
import Play from './Play';
import Loops from './Loops';
import Tempo from './Tempo';
import Volume from './Volume';
import { ChordInfo } from '../board/Chord'

type MenuProps = {
  chords: ChordInfo[],
  playingChordCallback: Function,
  playingChord: number | null,
  synth: Tone.PolySynth | null,
  disabled: boolean,
  setChordsCallback: Function,
  enableCallback: Function
}

const Menu = ({
  chords,
  synth,
  enableCallback,
  playingChordCallback,
  playingChord,
  setChordsCallback,
  disabled}: MenuProps) => {
  const [totalLoops, setTotalLoops] = useState(4);
  const [loop, setLoop] = useState(0);

  return (
    <div className="chord">
      <Play
        chords={chords}
        setLoopCallback={setLoop}
        playingChordCallback={playingChordCallback}
        disabled={disabled}
        enableCallback={enableCallback}
        totalLoops={totalLoops}
        synth={synth}
        />
      <Loops loopTimes={totalLoops} setLoopTimesCallback={setTotalLoops} />
      <LoopStatus loop={loop} loopTimes={totalLoops} />
      <ChordStatus playingChord={playingChord} />
      <Volume synth={synth} />
      <Tempo synth={synth} />
      <ChangeSong chords={chords} setChordsCallback={setChordsCallback} />
    </div>
  )
}

export default Menu;