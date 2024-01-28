import { useState } from 'react';
import playNoteKey from '../utils/playNoteKey'

type NoteProps = {
  note: string,
  isPlaying: boolean,
  chordOrd: number
}

const Note = ({note, isPlaying, chordOrd}: NoteProps) => {

  return (
  <div
    key={chordOrd}
    className={"cell key "  + (isPlaying ? "playing" : "")}
    style={{backgroundColor: isPlaying ? "yellow" : "blue"}}
  >
    {note}
  </div>
  );
}

export default Note;
