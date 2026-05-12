import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNotes } from '../src/context/NotesContext';

export default function EditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addNote, updateNote, isDark } = useNotes();

  const isEditing = !!params.noteId;
  const [title, setTitle] = useState(params.noteTitle || '');
  const [content, setContent] = useState(params.noteContent || '');

  const bg = isDark ? '#000000' : '#F2F2F7';
  const textColor = isDark ? '#F5F5F7' : '#1C1C1E';
  const subColor = isDark ? '#8E8E93' : '#6C6C70';
  const inputBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const borderColor = isDark ? '#2C2C2E' : '#E5E5EA';

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Title required', 'Please enter a title for your note.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Content required', 'Please write something in your note.');
      return;
    }

    if (isEditing) {
      updateNote(params.noteId, title.trim(), content.trim());
    } else {
      addNote(title.trim(), content.trim());
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />

      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          hitSlop={10}
        >
          <Text style={[styles.headerLink, { color: '#3478F6' }]}>Cancel</Text>
        </Pressable>

        <Text style={[styles.headerTitle, { color: textColor }]}>
          {isEditing ? 'Edit Note' : 'New Note'}
        </Text>

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          hitSlop={10}
        >
          <Text style={[styles.headerLink, styles.saveLink]}>
            {isEditing ? 'Update' : 'Save'}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          placeholder="Title"
          placeholderTextColor={isDark ? '#48484A' : '#AEAEB2'}
          value={title}
          onChangeText={setTitle}
          style={[styles.titleInput, {
            color: textColor,
            borderBottomColor: borderColor,
          }]}
          maxLength={80}
        />

        <TextInput
          placeholder="Start writing..."
          placeholderTextColor={isDark ? '#48484A' : '#AEAEB2'}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          style={[styles.contentInput, { color: textColor }]}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  headerLink: {
    fontSize: 16,
    fontWeight: '400',
  },

  saveLink: {
    color: '#3478F6',
    fontWeight: '600',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  body: {
    flex: 1,
  },

  bodyContent: {
    padding: 20,
    paddingBottom: 60,
  },

  titleInput: {
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  contentInput: {
    flex: 1,
    minHeight: 300,
    fontSize: 16,
    lineHeight: 24,
  },
});
