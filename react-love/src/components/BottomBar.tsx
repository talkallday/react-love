import {
    toggleSynth,
    loopPlay
 } from "../listeners.js";
import ChordStatus from './ChordStatus';
import LoopStatus from './LoopStatus';
import PlayButton from './PlayButton';
import TimesForm from './TimesForm';
import ToneJSOption from './ToneJSOption';
import play from '../utils/play';
import { useState } from 'react';

const BottomBar = () => {
  const [loopTimes, setLoopTimes] = useState(4);
  return (
    <div className="chord">
      <PlayButton playFunction={loopPlay}/>
      <TimesForm defaultLoopTimes={loopTimes} setLoopTimesCallback={setLoopTimes} />
      <LoopStatus loopTimes={loopTimes} />
      <ChordStatus />
      <ToneJSOption synthToggle={toggleSynth} />
    </div>
  )
}

export default BottomBar;
