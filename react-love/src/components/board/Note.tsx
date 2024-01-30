import Box from '@mui/system/Box';

import { useState } from 'react';

type NoteProps = {
  note: string,
  isPlaying: boolean
}

const Note = ({note, isPlaying}: NoteProps) => {

  return (
  <Box
    className={"cell key "  + (isPlaying ? "playing" : "")}
    style={{backgroundColor: isPlaying ? "yellow" : "blue"}}
    >
    {note}
  </Box>
  );
}

export default Note;
