import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';

type TempoProps = {
  synth: Tone.PolySynth | null
}

const Tempo = ({synth}: TempoProps) => {
  const [tempo, setTempo] = useState(60);

  const setOnTempo = (desiredTempo: number) => {
    if (synth) {
      setTempo(desiredTempo);
      Tone.Transport.bpm.value = desiredTempo;
    }
  }

  return (
    <Stack sx={{ paddingLeft: '0.5rem'}}>
      <Box sx={{ display: 'inline', color: "white", width: "8rem", fontSize: "0.7rem" }}>
        BPM: {tempo}
      </Box>
      <input
        style={{ width: '8rem' }}
        disabled={synth === null}
        type="range"
        min={40}
        max={400}
        step={10}
        value={tempo}
        onChange={(event) => setOnTempo(event.target.valueAsNumber)}
      />
    </Stack>
  )
}

export default Tempo;
