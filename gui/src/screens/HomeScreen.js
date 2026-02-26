import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const MENU_ITEMS = [
  { id: 'Moisture', title: 'Moisture Meter', subtitle: 'Live soil moisture & history' },
  { id: 'CropHealth', title: 'Crop Health', subtitle: 'Coming soon' },
  { id: 'LocationMap', title: 'Location Map', subtitle: 'Robot position (coming later)' },
  { id: 'Settings', title: 'Settings', subtitle: 'Appearance & preferences' },
  { id: 'About', title: 'About', subtitle: 'App info' },
];

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    header: {
      marginBottom: 32,
    },
    title: {
      fontSize: theme.fontSizeLarge + 8,
      fontWeight: '700',
      color: theme.text,
      letterSpacing: 0.5,
    },
    subtitle: {
      fontSize: theme.fontSizeSmall,
      color: theme.textMuted,
      marginTop: 4,
    },
    list: {
      gap: 12,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    cardTitle: {
      fontSize: theme.fontSize,
      fontWeight: '600',
      color: theme.text,
    },
    cardSubtitle: {
      fontSize: theme.fontSizeSmall,
      color: theme.textMuted,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>app name</Text>
        <Text style={styles.subtitle}>Precision agriculture monitoring</Text>
      </View>
      <View style={styles.list}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
