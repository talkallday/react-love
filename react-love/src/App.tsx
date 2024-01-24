import React from 'react';
import Board from './components/Board'
import BottomBar from './components/BottomBar'
import './style.css';

const boardChords = [
  ['Eb', 'G', 'Bb'], // Eb
  ['C', 'Eb', 'G', 'Bb'], // Cm7
  ['G', 'Bb', 'D'], // Gm
  ['F', 'Ab', 'C'], // Fm
  ['C', 'Eb', 'G'], // Cm
];

function App() {
  return (
    <div className="app">
      <Board chords={boardChords} />
      <BottomBar />
    </div>
  );
}

export default App;
