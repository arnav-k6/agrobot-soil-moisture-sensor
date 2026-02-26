import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      padding: 20,
    },
    title: {
      fontSize: theme.fontSizeLarge,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 16,
    },
    body: {
      fontSize: theme.fontSize,
      color: theme.textMuted,
      lineHeight: 24,
    },
    paragraph: {
      marginBottom: 16,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>About app name</Text>
      <Text style={[styles.body, styles.paragraph]}>
        Placeholder: This app helps farmers using precision agriculture robots to monitor soil
        moisture in real time. Data is streamed from your ESP32 sensor and stored in the cloud so you
        can track conditions from your phone.
      </Text>
      <Text style={[styles.body, styles.paragraph]}>
        Placeholder: Sustainable farming and innovation are at the heart of what we build. More
        features and integrations are coming soon.
      </Text>
      <Text style={[styles.body, styles.paragraph]}>
        Placeholder: Replace this text with your own about section, version info, and links.
      </Text>
    </ScrollView>
  );
}
