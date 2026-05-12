import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <Switch value={isDark} onValueChange={toggleTheme} />
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});