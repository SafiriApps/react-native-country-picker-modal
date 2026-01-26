import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, { Country, CountryCode, DARK_THEME } from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { SettingRow } from '../components/SettingRow'

const customTheme = {
  primaryColor: '#2a7bf6',
  primaryColorVariant: '#d9e6ff',
  backgroundColor: '#f7f9ff',
  onBackgroundTextColor: '#1b1f2a',
}

const ThemingScreen = () => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visible, setVisible] = React.useState(false)

  // Local state for theming options - scoped to this screen only
  const [useCustomTheme, setUseCustomTheme] = React.useState(false)
  const [useDarkTheme, setUseDarkTheme] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  const getTheme = () => {
    if (useCustomTheme) return customTheme
    if (useDarkTheme) return DARK_THEME
    return {}
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Theming</Text>
      <Text style={styles.subtitle}>
        Toggle between default, dark, and custom themes.
      </Text>
      <View style={styles.controls}>
        <SettingRow
          label="Use custom theme"
          value={useCustomTheme}
          onValueChange={(value) => {
            setUseCustomTheme(value)
            if (value) setUseDarkTheme(false)
          }}
        />
        <SettingRow
          label="Use dark theme"
          value={useDarkTheme}
          onValueChange={(value) => {
            setUseDarkTheme(value)
            if (value) setUseCustomTheme(false)
          }}
        />
      </View>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          withFilter
          withEmoji
          theme={getTheme()}
          modalProps={{ visible }}
          onOpen={() => setVisible(true)}
          onClose={() => setVisible(false)}
        />
      </View>
      <Button title="Open modal" onPress={() => setVisible(true)} />
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
