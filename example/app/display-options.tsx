import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { SettingRow } from '../components/SettingRow'
import { usePickerSettings } from '../hooks/usePickerSettings'
import { useSettings } from '../context/SettingsContext'

const DisplayOptionsScreen = () => {
  const { pickerProps } = usePickerSettings()
  const { settings, setSetting } = useSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Display Options</Text>
      <Text style={styles.subtitle}>
        Toggle common display props and see the picker update instantly.
      </Text>
      <View style={styles.controls}>
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
          label="With alpha filter code"
          value={settings.withAlphaFilter}
          onValueChange={(value) => setSetting('withAlphaFilter', value)}
        />
        <SettingRow
          label="With calling code (list)"
          value={settings.withCallingCode}
          onValueChange={(value) => setSetting('withCallingCode', value)}
        />
        <SettingRow
          label="With currency (list)"
          value={settings.withCurrency}
          onValueChange={(value) => setSetting('withCurrency', value)}
        />
        <SettingRow
          label="With country name button"
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
        <SettingRow
          label="With flag button"
          value={settings.withFlagButton}
          onValueChange={(value) => setSetting('withFlagButton', value)}
        />
      </View>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
        />
      </View>
      <CountrySummary country={country} title="Selected country" />
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
  controls: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  pickerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

export default DisplayOptionsScreen
