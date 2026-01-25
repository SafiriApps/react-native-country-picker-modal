import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { ExampleCard } from '../components/ExampleCard'
import { usePickerSettings } from '../hooks/usePickerSettings'

const PropMatrixScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visibleEmoji, setVisibleEmoji] = React.useState(false)
  const [visibleFlag, setVisibleFlag] = React.useState(false)
  const [visibleFilter, setVisibleFilter] = React.useState(false)
  const [visibleCurrency, setVisibleCurrency] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Prop Matrix</Text>
      <Text style={styles.subtitle}>
        Quick comparisons of common prop combinations.
      </Text>
      <ExampleCard title="Emoji + Country Name">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withEmoji
          withCountryNameButton
          withFlagButton
          modalProps={{ visible: visibleEmoji }}
          onOpen={() => setVisibleEmoji(true)}
          onClose={() => setVisibleEmoji(false)}
        />
        <View style={styles.buttonRow}>
          <Button title="Open modal" onPress={() => setVisibleEmoji(true)} />
        </View>
      </ExampleCard>
      <ExampleCard title="Flag + Calling Code Button">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withFlag
          withCallingCodeButton
          withFlagButton
          modalProps={{ visible: visibleFlag }}
          onOpen={() => setVisibleFlag(true)}
          onClose={() => setVisibleFlag(false)}
        />
        <View style={styles.buttonRow}>
          <Button title="Open modal" onPress={() => setVisibleFlag(true)} />
        </View>
      </ExampleCard>
      <ExampleCard title="Filter + Alpha Filter">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withFilter
          withAlphaFilter
          modalProps={{ visible: visibleFilter }}
          onOpen={() => setVisibleFilter(true)}
          onClose={() => setVisibleFilter(false)}
        />
        <View style={styles.buttonRow}>
          <Button title="Open modal" onPress={() => setVisibleFilter(true)} />
        </View>
      </ExampleCard>
      <ExampleCard title="Currency + Calling Code in List">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withCurrency
          withCallingCode
          modalProps={{ visible: visibleCurrency }}
          onOpen={() => setVisibleCurrency(true)}
          onClose={() => setVisibleCurrency(false)}
        />
        <View style={styles.buttonRow}>
          <Button title="Open modal" onPress={() => setVisibleCurrency(true)} />
        </View>
      </ExampleCard>
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
  buttonRow: {
    marginTop: 8,
  },
})

export default PropMatrixScreen
