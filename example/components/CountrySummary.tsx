import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Country } from 'react-native-country-picker-modal'

interface CountrySummaryProps {
  country?: Country
  title?: string
}

export const CountrySummary = ({ country, title }: CountrySummaryProps) => {
  const name =
    typeof country?.name === 'string'
      ? country?.name
      : country?.name?.common

  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.line}>
        {country ? name || 'Unnamed country' : 'No country selected yet.'}
      </Text>
      {country ? (
        <>
          <Text style={styles.line}>Code: {country.cca2}</Text>
          <Text style={styles.line}>
            Calling code: {country.callingCode?.[0] || '-'}
          </Text>
          <Text style={styles.line}>
            Currency: {country.currency?.[0] || '-'}
          </Text>
        </>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  line: {
    fontSize: 12,
    color: '#444',
  },
})
