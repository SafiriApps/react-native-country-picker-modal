import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { SettingRow } from '../components/SettingRow'
import { usePickerSettings } from '../hooks/usePickerSettings'

const customTheme = {
  primaryColor: '#2a7bf6',
  primaryColorVariant: '#d9e6ff',
  backgroundColor: '#f7f9ff',
  onBackgroundTextColor: '#1b1f2a',
}

const ThemingScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [useCustomTheme, setUseCustomTheme] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Theming</Text>
      <Text style={styles.subtitle}>
        Toggle a custom theme on top of the global settings.
      </Text>
      <View style={styles.controls}>
        <SettingRow
          label="Use custom theme"
          value={useCustomTheme}
          onValueChange={setUseCustomTheme}
        />
      </View>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          theme={useCustomTheme ? customTheme : pickerProps.theme}
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
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#fff',
  },
  pickerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

export default ThemingScreen
