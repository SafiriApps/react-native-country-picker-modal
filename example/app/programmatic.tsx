import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'

const ProgrammaticScreen = () => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Programmatic Control</Text>
      <Text style={styles.subtitle}>
        Open/close the modal externally using the visible prop.
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
      <View style={styles.spacer} />
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
  spacer: {
    height: 12,
  },
})

export default ProgrammaticScreen
