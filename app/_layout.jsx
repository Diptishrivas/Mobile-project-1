import { Stack } from 'expo-router';
import { NotesProvider } from '../src/context/NotesContext';

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="editor"
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </NotesProvider>
  );
}
