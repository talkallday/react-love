import Note from './Note';
import noteValues from '../utils/NoteFrequencies.js';

const getAllNotes = (chord: string[]) => {
  const notes: string[] = [];
  [...noteValues.keys()].forEach((noteName) => {
    let note = noteName.slice(0, -1);
    if (chord.includes(note)) notes.push(noteName);
  })
  return notes;
}

const Chord = (chord: string[]) =>
{
  const chordNotes = getAllNotes(chord);
  return (
    <div className="chord">
      {chordNotes.map((note) => Note(note))}
    </div>
  )
}

export default Chord;
