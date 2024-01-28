import { useState } from 'react';
import * as Tone from 'tone';

import ChordStatus from './ChordStatus';
import LoopStatus from './LoopStatus';
import PlayButton from './PlayButton';
import TimesForm from './TimesForm';
import VolumeSlider from './VolumeSlider';
import { ChordInfo } from './Chord'

type BottomBarProps = {
  chords: ChordInfo[],
  volumeCallback: Function,
  playingChordCallback: Function,
  playingChord: number | null,
  synth: Tone.PolySynth | null,
  volume: number,
  disabled: boolean,
  enableCallback: Function
}

const BottomBar = ({
  chords,
  volumeCallback,
  synth,
  enableCallback,
  playingChordCallback,
  playingChord,
  volume,
  disabled}: BottomBarProps) => {
  const [totalLoops, setTotalLoops] = useState(4);
  const [loop, setLoop] = useState(0);

  return (
    <div className="chord">
      <PlayButton
        chords={chords}
        setLoopCallback={setLoop}
        playingChordCallback={playingChordCallback}
        disabled={disabled}
        enableCallback={enableCallback}
        totalLoops={totalLoops}
        synth={synth}
        />
      <TimesForm loopTimes={totalLoops} setLoopTimesCallback={setTotalLoops} />
      <LoopStatus loop={loop} loopTimes={totalLoops} />
      <ChordStatus playingChord={playingChord} />
      <VolumeSlider volumeCallback={volumeCallback} volume={volume} />
    </div>
  )
}

export default BottomBar;
