import { useState } from 'react';
import playNoteKey from '../utils/playNoteKey'

type NoteProps = {
  note: string,
  isPlaying: boolean
}

const Note = ({note, isPlaying}: NoteProps) => {

  return (
  <div
    className={"cell key "  + (isPlaying ? "playing" : "")}
    style={{backgroundColor: isPlaying ? "yellow" : "blue"}}
  >
    {note}
  </div>
  );
}

export default Note;
