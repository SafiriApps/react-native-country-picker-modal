import React from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import CountryPicker, {
  Country,
  CountryCode,
  TranslationLanguageCode,
  TranslationLanguageCodeList,
} from 'react-native-country-picker-modal'
import { CountrySummary } from '../components/CountrySummary'
import { usePickerSettings } from '../hooks/usePickerSettings'

const TranslationScreen = () => {
  const { pickerProps } = usePickerSettings()
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US')
  const [country, setCountry] = React.useState<Country>()
  const [translation, setTranslation] =
    React.useState<TranslationLanguageCode>('common')
  const [visible, setVisible] = React.useState(false)

  const onSelect = (selected: Country) => {
    setCountryCode(selected.cca2)
    setCountry(selected)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Translation</Text>
      <Text style={styles.subtitle}>
        Choose a language and see localized country names.
      </Text>
      <View style={styles.translationList}>
        {TranslationLanguageCodeList.map((code) => (
          <Pressable
            key={code}
            onPress={() => setTranslation(code)}
            style={[
              styles.translationItem,
              code === translation && styles.translationItemActive,
            ]}
          >
            <Text
              style={[
                styles.translationText,
                code === translation && styles.translationTextActive,
              ]}
            >
              {code}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.pickerRow}>
        <CountryPicker
          countryCode={countryCode}
          onSelect={onSelect}
          translation={translation}
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
  translationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  translationItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    backgroundColor: '#fff',
  },
  translationItemActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  translationText: {
    fontSize: 12,
    color: '#333',
  },
  translationTextActive: {
    color: '#fff',
  },
  pickerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

export default TranslationScreen
