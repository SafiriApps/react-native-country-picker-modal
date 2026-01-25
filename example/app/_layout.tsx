import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CountryModalProvider } from 'react-native-country-picker-modal'
import { SettingsProvider } from '../context/SettingsContext'

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <CountryModalProvider>
          <Stack screenOptions={{ headerTitleAlign: 'center' }} />
        </CountryModalProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout
