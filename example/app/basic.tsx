import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
  FlagType,
  getAllCountries,
  getCallingCode,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'

const BasicScreen = () => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [callingCode, setCallingCode] = React.useState<string>('-')
  const [totalCountries, setTotalCountries] = React.useState<number | null>(null)
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  const loadServiceData = async () => {
    const countries = await getAllCountries(FlagType.EMOJI, 'common')
    const code = await getCallingCode(countryCode)
    setTotalCountries(countries.length)
    setCallingCode(code)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Basic Usage + Services</Text>
      <Text style={styles.subtitle}>
        Demonstrates the default picker plus service helpers.
      </Text>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          withFilter
          withEmoji
          modalProps={{ visible }}
          onOpen={() => setVisible(true)}
          onClose={() => setVisible(false)}
        />
      </View>
      <Button title="Open modal" onPress={() => setVisible(true)} />
      <CountrySummary country={country} title="Selected country" />
      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Service helpers</Text>
        <Text style={styles.serviceText}>Total countries: {totalCountries ?? '-'}</Text>
        <Text style={styles.serviceText}>Calling code: {callingCode}</Text>
        <Button title="Load service data" onPress={loadServiceData} />
      </View>
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
  serviceCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#fff',
    gap: 6,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  serviceText: {
    fontSize: 12,
    color: '#444',
  },
})

export default BasicScreen
