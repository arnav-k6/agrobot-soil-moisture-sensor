import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CropHealthScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: theme.fontSize,
      color: theme.textMuted,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crop Health — coming soon</Text>
    </View>
  );
}
