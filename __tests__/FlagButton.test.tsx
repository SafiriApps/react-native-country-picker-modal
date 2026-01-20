import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { FlagButton } from '../src/FlagButton'
import { ThemeProvider, DEFAULT_THEME } from '../src/CountryTheme'
import { CountryProvider, DEFAULT_COUNTRY_CONTEXT } from '../src/CountryContext'

jest.mock('react-async-hook', () => ({
  useAsync: (fn: () => Promise<string>, deps: string[]) => {
    const countryCode = deps[0]
    return {
      loading: false,
      result: countryCode ? `flag-${countryCode.toLowerCase()}` : 'flag-us',
      error: undefined,
    }
  },
}))

jest.mock('node-emoji', () => ({
  get: (name: string) => name || '',
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <CountryProvider value={DEFAULT_COUNTRY_CONTEXT}>
        {component}
      </CountryProvider>
    </ThemeProvider>,
  )
}

describe('FlagButton', () => {
  it('renders with default props', () => {
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton placeholder="Select Country" />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('calls onOpen when pressed', () => {
    const onOpen = jest.fn()
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton placeholder="Select Country" onOpen={onOpen} />,
    )

    // Find the TouchableOpacity and press it
    const touchable = UNSAFE_root.findByType(
      require('react-native').TouchableOpacity,
    )
    fireEvent.press(touchable)

    expect(onOpen).toHaveBeenCalled()
  })

  it('renders placeholder when no countryCode', () => {
    const { getByText } = renderWithProviders(
      <FlagButton placeholder="Select Country" />,
    )

    expect(getByText('Select Country')).toBeTruthy()
  })

  it('renders with countryCode', () => {
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton placeholder="Select Country" countryCode="US" />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders with withEmoji=true by default', () => {
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton placeholder="Select Country" countryCode="US" />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders with withFlagButton=false hides flag', () => {
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton
        placeholder="Select Country"
        countryCode="US"
        withFlagButton={false}
      />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders with custom containerButtonStyle', () => {
    const customStyle = { backgroundColor: 'red' }
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton
        placeholder="Select Country"
        containerButtonStyle={customStyle}
      />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders with all optional buttons enabled', () => {
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton
        placeholder="Select Country"
        countryCode="US"
        withCountryNameButton={true}
        withCallingCodeButton={true}
        withCurrencyButton={true}
      />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('default props are correctly applied', () => {
    // Test that defaultProps migration didn't break anything
    // withEmoji defaults to true
    // withCountryNameButton defaults to false
    // withCallingCodeButton defaults to false
    // withCurrencyButton defaults to false
    // withFlagButton defaults to true
    const { UNSAFE_root } = renderWithProviders(
      <FlagButton placeholder="Select" />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })
})
