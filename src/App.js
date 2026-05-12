import React, { useState } from 'react';
import NotesListScreen from './screens/NotesListScreen';
import NoteEditorScreen from './screens/NoteEditorScreen';

export default function App() {
  const [screen, setScreen] = useState('list');

  if (screen === 'editor') {
    return <NoteEditorScreen onGoBack={() => setScreen('list')} />;
  }

  return <NotesListScreen onAddNote={() => setScreen('editor')} />;
}