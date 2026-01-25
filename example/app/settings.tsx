import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SettingRow } from '../components/SettingRow'
import { useSettings } from '../context/SettingsContext'

const SettingsScreen = () => {
  const { settings, setSetting, resetSettings } = useSettings()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Options</Text>
      <Text style={styles.subtitle}>
        These settings mirror the GIF-style toggles and feed into the demos.
      </Text>
      <View style={styles.section}>
        <SettingRow
          label="With country name on button"
          value={settings.withCountryNameButton}
          onValueChange={(value) => setSetting('withCountryNameButton', value)}
        />
        <SettingRow
          label="With flag"
          value={settings.withFlag}
          onValueChange={(value) => setSetting('withFlag', value)}
        />
        <SettingRow
          label="With emoji"
          value={settings.withEmoji}
          onValueChange={(value) => setSetting('withEmoji', value)}
        />
        <SettingRow
          label="With filter"
          value={settings.withFilter}
          onValueChange={(value) => setSetting('withFilter', value)}
        />
        <SettingRow
          label="With calling code (list)"
          value={settings.withCallingCode}
          onValueChange={(value) => setSetting('withCallingCode', value)}
        />
        <SettingRow
          label="With alpha filter code"
          value={settings.withAlphaFilter}
          onValueChange={(value) => setSetting('withAlphaFilter', value)}
        />
        <SettingRow
          label="With currency (list)"
          value={settings.withCurrency}
          onValueChange={(value) => setSetting('withCurrency', value)}
        />
        <SettingRow
          label="With calling code button"
          value={settings.withCallingCodeButton}
          onValueChange={(value) => setSetting('withCallingCodeButton', value)}
        />
        <SettingRow
          label="With currency button"
          value={settings.withCurrencyButton}
          onValueChange={(value) => setSetting('withCurrencyButton', value)}
        />
        <SettingRow
          label="With flag button"
          value={settings.withFlagButton}
          onValueChange={(value) => setSetting('withFlagButton', value)}
        />
        <SettingRow
          label="With font scaling"
          value={settings.allowFontScaling}
          onValueChange={(value) => setSetting('allowFontScaling', value)}
        />
        <SettingRow
          label="With modal"
          value={settings.withModal}
          onValueChange={(value) => setSetting('withModal', value)}
        />
        <SettingRow
          label="Without native modal"
          value={settings.disableNativeModal}
          onValueChange={(value) => setSetting('disableNativeModal', value)}
        />
        <SettingRow
          label="Dark theme"
          value={settings.darkTheme}
          onValueChange={(value) => setSetting('darkTheme', value)}
        />
      </View>
      <Pressable style={styles.resetButton} onPress={resetSettings}>
        <Text style={styles.resetText}>Reset to defaults</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resetButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#111',
  },
  resetText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
})

export default SettingsScreen
