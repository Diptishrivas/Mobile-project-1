import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      color: getRandomColor(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id, title, content) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
              date: new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
            }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{ notes, isDark, toggleTheme, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const COLORS = [
  '#6C63FF',
  '#FF6B6B',
  '#4ECDC4',
  '#FFD93D',
  '#FF8A5C',
  '#A78BFA',
  '#34D399',
  '#F472B6',
  '#38BDF8',
  '#FB923C',
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
