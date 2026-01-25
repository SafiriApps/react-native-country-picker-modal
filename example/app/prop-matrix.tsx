import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
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
        />
      </ExampleCard>
      <ExampleCard title="Flag + Calling Code Button">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withFlag
          withCallingCodeButton
          withFlagButton
        />
      </ExampleCard>
      <ExampleCard title="Filter + Alpha Filter">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withFilter
          withAlphaFilter
        />
      </ExampleCard>
      <ExampleCard title="Currency + Calling Code in List">
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          {...pickerProps}
          withCurrency
          withCallingCode
        />
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
})

export default PropMatrixScreen
