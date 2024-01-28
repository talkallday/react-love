import Note from './Note';
import noteValues from '../utils/NoteFrequencies.js';

export const getAllNotes = (chord: string[]) => {
  const notes: string[] = [];
  [...noteValues.keys()].forEach((noteName) => {
    let note = noteName.slice(0, -1);
    if (chord.includes(note)) notes.push(noteName);
  })
  return notes;
}

export type ChordInfo = {
  notes: string[],
  duration: number
}

type ChordProps = {
  chord: ChordInfo,
  playingChordIndex: number | null,
  index: number
}

export const Chord = ({chord, playingChordIndex, index}: ChordProps) =>
{
  const chordNotes = getAllNotes(chord.notes);
  return (
    <div className="chord">
      <div key={index} className="index">{index + 1}</div>
      {chordNotes.map((note) => <Note isPlaying={index === playingChordIndex} key={note} note={note}/>)}
      <div key={"" + index + chord.duration} className="index">{chord.duration}</div>
    </div>
  )
}
