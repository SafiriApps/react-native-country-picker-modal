import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
  Region,
  RegionList,
  Subregion,
  SubregionList,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { ExampleCard } from '../components/ExampleCard'
import { usePickerSettings } from '../hooks/usePickerSettings'

const cycleValue = <T,>(values: readonly T[], current?: T): T | undefined => {
  if (!values.length) {
    return undefined
  }
  if (!current) {
    return values[0]
  }
  const index = values.indexOf(current)
  const nextIndex = index === -1 || index === values.length - 1 ? 0 : index + 1
  return values[nextIndex]
}

const FilteringScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [region, setRegion] = React.useState<Region | undefined>()
  const [subregion, setSubregion] = React.useState<Subregion | undefined>()
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Filtering + Performance</Text>
      <Text style={styles.subtitle}>
        Filter by region/subregion and tune list performance with flatListProps.
      </Text>
      <ExampleCard title="Filter controls">
        <View style={styles.buttonRow}>
          <Button
            title={`Region: ${region ?? 'All'}`}
            onPress={() => setRegion(cycleValue(RegionList, region))}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            title={`Subregion: ${subregion ?? 'All'}`}
            onPress={() => setSubregion(cycleValue(SubregionList, subregion))}
          />
        </View>
      </ExampleCard>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          region={region}
          subregion={subregion}
          countryCodes={['US', 'GB', 'FR', 'DE', 'BR', 'ZA']}
          excludeCountries={['FR']}
          preferredCountries={['US', 'GB']}
          flatListProps={{
            initialNumToRender: 20,
            windowSize: 10,
          }}
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
  buttonRow: {
    marginBottom: 8,
  },
  pickerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

export default FilteringScreen
