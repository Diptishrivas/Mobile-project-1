import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';

const NoteEditorScreen = ({ onGoBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Missing Fields', 'Please enter both a title and content.');
      return;
    }
    Alert.alert('Saved!', `Note "${title}" has been saved.`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800' }}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerText}>New Note</Text>
        </View>
      </ImageBackground>

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <TextInput
          placeholder="Note title..."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={[styles.titleInput, { backgroundColor: '#f0f0f0', color: '#111' }]}
        />

        <TextInput
          placeholder="Write your note here..."
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          style={[styles.contentInput, { backgroundColor: '#f0f0f0', color: '#111' }]}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.backButton} onPress={onGoBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NoteEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 220,
    justifyContent: 'center',
    marginBottom: 24,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },

  titleInput: {
    padding: 18,
    borderRadius: 16,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
  },

  contentInput: {
    flex: 1,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  backButton: {
    backgroundColor: '#777',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },

  saveButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});