import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context'
import { CountryModal } from '../src/CountryModal'

jest.mock('react-native-safe-area-context', () => {
  const React = require('react')
  const { View } = require('react-native')

  const SafeAreaView = (props: React.ComponentProps<typeof View>) => (
    <View {...props} />
  )
  const SafeAreaProvider = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )

  return {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowMetrics: null,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  }
})

it('renders content inside SafeAreaView', () => {
  const { UNSAFE_getAllByType } = render(
    <SafeAreaProvider>
      <CountryModal withModal={false}>
        <Text>Modal content</Text>
      </CountryModal>
    </SafeAreaProvider>,
  )

  const safeAreaViews = UNSAFE_getAllByType(SafeAreaView)
  expect(safeAreaViews).toHaveLength(1)
})

it('renders children text', () => {
  const { getByText } = render(
    <SafeAreaProvider>
      <CountryModal withModal={false}>
        <Text>Country modal body</Text>
      </CountryModal>
    </SafeAreaProvider>,
  )

  expect(getByText('Country modal body')).toBeTruthy()
})
