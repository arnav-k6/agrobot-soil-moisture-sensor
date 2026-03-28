import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, scheme, setScheme, fontSize, setFontSize, background, setBackground, schemes, schemeNames } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      padding: 20,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: theme.fontSizeSmall,
      color: theme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    option: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.card,
    },
    optionActive: {
      borderColor: theme.accent,
      backgroundColor: theme.primary,
    },
    optionText: {
      fontSize: theme.fontSizeSmall,
      color: theme.text,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color scheme</Text>
        <View style={styles.row}>
          {schemes.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.option, scheme === key && styles.optionActive]}
              onPress={() => setScheme(key)}
            >
              <Text style={styles.optionText}>{schemeNames[key].name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font size</Text>
        <View style={styles.row}>
          {['small', 'medium', 'large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.option, fontSize === size && styles.optionActive]}
              onPress={() => setFontSize(size)}
            >
              <Text style={styles.optionText}>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Background</Text>
        <View style={styles.row}>
          {['default', 'light', 'dark'].map((bg) => (
            <TouchableOpacity
              key={bg}
              style={[styles.option, background === bg && styles.optionActive]}
              onPress={() => setBackground(bg)}
            >
              <Text style={styles.optionText}>{bg.charAt(0).toUpperCase() + bg.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
