import React from 'react'
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
  CountryFilter,
  Flag,
  FlagButton,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { usePickerSettings } from '../hooks/usePickerSettings'

type FlagButtonProps = React.ComponentProps<typeof FlagButton>
type CountryFilterProps = React.ComponentProps<typeof CountryFilter>

const CustomRenderingScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  const renderFlagButton = (props: FlagButtonProps) => {
    return (
      <Pressable onPress={props.onOpen} style={styles.customButton}>
        <Flag countryCode={props.countryCode || 'US'} flagSize={24} />
        <Text style={styles.customButtonText}>Choose country</Text>
      </Pressable>
    )
  }

  const renderCountryFilter = (props: CountryFilterProps) => {
    return (
      <View style={styles.filterWrapper}>
        <Text style={styles.filterLabel}>Search</Text>
        <TextInput
          {...props}
          placeholder="Search countries"
          style={[styles.filterInput, props.style]}
        />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Custom Rendering</Text>
      <Text style={styles.subtitle}>
        Customize the flag button and filter input UI.
      </Text>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          renderFlagButton={renderFlagButton}
          renderCountryFilter={renderCountryFilter}
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
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#111',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  filterLabel: {
    marginRight: 6,
    fontSize: 12,
    color: '#666',
  },
  filterInput: {
    flex: 1,
    paddingVertical: 6,
  },
})

export default CustomRenderingScreen
