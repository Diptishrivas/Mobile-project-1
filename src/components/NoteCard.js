import React, { useRef, useEffect } from 'react';
import { View,Text,StyleSheet,Pressable,Animated,Alert} from 'react-native';

const NoteCard = ({ note, isDark, index, onEdit, onDelete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      `"${note.title}" delete karna hai?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(note.id),
        },
      ]
    );
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
        onPress={() => onEdit(note)}
      >
        <Text
          style={[styles.title, { color: isDark ? '#F5F5F7' : '#1C1C1E' }]}
          numberOfLines={1}
        >
          {note.title}
        </Text>

        <Text
          numberOfLines={2}
          style={[styles.content, { color: isDark ? '#8E8E93' : '#6C6C70' }]}
        >
          {note.content}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.date, { color: isDark ? '#48484A' : '#AEAEB2' }]}>
            {note.date}
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => onEdit(note)}
              hitSlop={10}
            >
              <Text style={[styles.actionText, { color: '#3478F6' }]}>Edit</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={handleDelete}
              hitSlop={10}
            >
              <Text style={[styles.actionText, { color: '#FF3B30' }]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 12,
  },

  actions: {
    flexDirection: 'row',
    gap: 16,
  },

  actionBtn: {
    paddingVertical: 2,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});