import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'

interface SettingRowProps {
  label: string
  value: boolean
  onValueChange(value: boolean): void
}

export const SettingRow = ({ label, value, onValueChange }: SettingRowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 12,
  },
})
