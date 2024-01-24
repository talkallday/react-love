import { useState } from 'react';
import playNoteKey from '../utils/playNoteKey'

const Note = (note: string) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
      setIsPlaying(true);
      playNoteKey(note);
      setTimeout(() => {
          setIsPlaying(false);
        },
        (1 / 4) * (2.5 * 1000)
      )
  }

  return (
  <div className={"cell key "  + (isPlaying ? "playing" : "")} onClick={handleClick}>
    {note}
  </div>
  );
}

export default Note;
