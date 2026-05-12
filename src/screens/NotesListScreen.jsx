import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { notes } from '../data/notes';
import NoteCard from '../components/NoteCard';
import ThemeToggle from '../components/ThemeToggle';

const NotesListScreen = () => {
  const [search, setSearch] = useState('');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View
      style={[styles.container, {
        backgroundColor: isDark ? '#121212' : '#f4f4f4',
      }]}
    >
      <Text style={[styles.heading, { color: isDark ? '#fff' : '#111' }]}>
        My Notes
      </Text>

      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={isDark ? '#888' : '#999'}
        value={search}
        onChangeText={setSearch}
        style={StyleSheet.flatten([
          styles.searchInput,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
            color: isDark ? '#fff' : '#111',
          },
        ])}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard note={item} isDark={isDark} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
  },

  searchInput: {
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 22,
  },
});