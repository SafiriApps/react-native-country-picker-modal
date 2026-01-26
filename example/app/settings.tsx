import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { SettingRow } from '../components/SettingRow'
import { useSettings } from '../context/SettingsContext'

const SettingsScreen = () => {
  const { settings, setSetting, resetSettings } = useSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  const pickerProps = {
    allowFontScaling: settings.allowFontScaling,
    withCountryNameButton: settings.withCountryNameButton,
    withFlag: settings.withFlag,
    withEmoji: settings.withEmoji,
    withFilter: settings.withFilter,
    withCallingCode: settings.withCallingCode,
    withAlphaFilter: settings.withAlphaFilter,
    withCurrency: settings.withCurrency,
    withModal: settings.withModal,
    disableNativeModal: settings.disableNativeModal,
    withFlagButton: settings.withFlagButton,
    withCallingCodeButton: settings.withCallingCodeButton,
    withCurrencyButton: settings.withCurrencyButton,
    theme: settings.darkTheme ? DARK_THEME : {},
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Options</Text>
      <Text style={styles.subtitle}>
        Use the preview button to see them in action.
      </Text>

      <View style={styles.previewSection}>
        <Text style={styles.previewLabel}>Preview</Text>
        <View style={styles.pickerRow}>
          <CountryPicker
            countryCode={countryCode}
            onSelect={onSelect}
            {...pickerProps}
            modalProps={{ visible }}
            onOpen={() => setVisible(true)}
            onClose={() => setVisible(false)}
          />
        </View>
        <Pressable style={styles.openModalButton} onPress={() => setVisible(true)}>
          <Text style={styles.openModalButtonText}>Open Modal</Text>
        </Pressable>
        <CountrySummary country={country} title="Selected country" />
      </View>

      {/* Button Display Settings */}
      <Text style={styles.sectionTitle}>Button Display</Text>
      <View style={styles.section}>
        <SettingRow
          label="With flag button"
          value={settings.withFlagButton}
          onValueChange={(value) => setSetting('withFlagButton', value)}
        />
        <SettingRow
          label="With country name on button"
          value={settings.withCountryNameButton}
          onValueChange={(value) => setSetting('withCountryNameButton', value)}
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
      </View>

      {/* Modal List Settings */}
      <Text style={styles.sectionTitle}>Modal List</Text>
      <View style={styles.section}>
        <SettingRow
          label="With filter"
          value={settings.withFilter}
          onValueChange={(value) => setSetting('withFilter', value)}
        />
        <SettingRow
          label="With alpha filter"
          value={settings.withAlphaFilter}
          onValueChange={(value) => setSetting('withAlphaFilter', value)}
        />
        <SettingRow
          label="With calling code"
          value={settings.withCallingCode}
          onValueChange={(value) => setSetting('withCallingCode', value)}
        />
        <SettingRow
          label="With currency"
          value={settings.withCurrency}
          onValueChange={(value) => setSetting('withCurrency', value)}
        />
      </View>

      {/* General Settings */}
      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.section}>
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
          label="Disable native modal"
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
  previewSection: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d0e0ff',
    backgroundColor: '#f0f6ff',
    marginBottom: 16,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a7bf6',
    marginBottom: 8,
  },
  pickerRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  openModalButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2a7bf6',
    marginBottom: 12,
  },
  openModalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
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
