import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { usePickerSettings } from '../hooks/usePickerSettings'

const QuickStartScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quick Start</Text>
      <Text style={styles.subtitle}>
        Minimal usage: pass a country code and handle onSelect.
      </Text>
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
  pickerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

export default QuickStartScreen
