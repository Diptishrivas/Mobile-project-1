import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes } from '../src/context/NotesContext';
import NoteCard from '../src/components/NoteCard';
import ThemeToggle from '../src/components/ThemeToggle';

export default function HomeScreen() {
  const { notes, isDark, toggleTheme, deleteNote } = useNotes();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fabScale = useRef(new Animated.Value(1)).current;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (note) => {
    router.push({
      pathname: '/editor',
      params: {
        noteId: note.id,
        noteTitle: note.title,
        noteContent: note.content,
      },
    });
  };

  const handleFabPressIn = () => {
    Animated.spring(fabScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const bg = isDark ? '#000000' : '#F2F2F7';
  const textColor = isDark ? '#F5F5F7' : '#1C1C1E';
  const subColor = isDark ? '#8E8E93' : '#6C6C70';
  const inputBg = isDark ? '#1C1C1E' : '#FFFFFF';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />

      <View style={styles.header}>
        <Text style={[styles.heading, { color: textColor }]}>
          Notes
        </Text>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </View>

      <TextInput
        placeholder="Search..."
        placeholderTextColor={isDark ? '#48484A' : '#AEAEB2'}
        value={search}
        onChangeText={setSearch}
        style={[styles.searchInput, {
          backgroundColor: inputBg,
          color: textColor,
        }]}
      />

      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: textColor }]}>
            No notes yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: subColor }]}>
            Tap + to add your first note
          </Text>
        </View>
      ) : filteredNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: textColor }]}>
            Nothing found
          </Text>
          <Text style={[styles.emptySubtitle, { color: subColor }]}>
            Try searching something else
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <NoteCard
              note={item}
              isDark={isDark}
              index={index}
              onEdit={handleEdit}
              onDelete={deleteNote}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Animated.View
        style={[styles.fabWrapper, { transform: [{ scale: fabScale }] }]}
      >
        <Pressable
          style={styles.fab}
          onPress={() => router.push('/editor')}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
  },

  searchInput: {
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 16,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
  },

  fabWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },

  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#3478F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -1,
  },
});
