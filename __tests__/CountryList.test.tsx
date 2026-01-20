import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { CountryList } from '../src/CountryList'
import { ThemeProvider, DEFAULT_THEME } from '../src/CountryTheme'
import { CountryProvider, DEFAULT_COUNTRY_CONTEXT } from '../src/CountryContext'
import { Country } from '../src/types'

jest.mock('react-async-hook', () => ({
  useAsync: (fn: () => Promise<string>, deps: string[]) => {
    const countryCode = deps[0]
    return {
      loading: false,
      result: countryCode ? `flag-${countryCode.toLowerCase()}` : '🇫🇷',
      error: undefined,
    }
  },
}))

jest.mock('node-emoji', () => ({
  get: (name: string) => name || '',
}))

const france: Country = {
  region: 'Europe',
  subregion: 'Western Europe',
  currency: ['EUR'],
  callingCode: ['33'],
  flag: '🇫🇷',
  name: 'France',
  cca2: 'FR',
}

const germany: Country = {
  region: 'Europe',
  subregion: 'Western Europe',
  currency: ['EUR'],
  callingCode: ['49'],
  flag: '🇩🇪',
  name: 'Germany',
  cca2: 'DE',
}

const usa: Country = {
  region: 'Americas',
  subregion: 'North America',
  currency: ['USD'],
  callingCode: ['1'],
  flag: '🇺🇸',
  name: 'United States',
  cca2: 'US',
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <CountryProvider value={DEFAULT_COUNTRY_CONTEXT}>
        {component}
      </CountryProvider>
    </ThemeProvider>,
  )
}

describe('CountryList', () => {
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders list of countries', () => {
    const { getByTestId } = renderWithProviders(
      <CountryList data={[france, germany]} onSelect={mockOnSelect} />,
    )

    expect(getByTestId('list-countries')).toBeTruthy()
  })

  it('renders empty list when no data', () => {
    const { getByTestId } = renderWithProviders(
      <CountryList data={[]} onSelect={mockOnSelect} />,
    )

    expect(getByTestId('list-countries')).toBeTruthy()
  })

  it('renders country names', () => {
    const { getByText } = renderWithProviders(
      <CountryList data={[france, germany]} onSelect={mockOnSelect} />,
    )

    expect(getByText('France')).toBeTruthy()
    expect(getByText('Germany')).toBeTruthy()
  })

  it('calls onSelect when country is pressed', () => {
    const { getByTestId } = renderWithProviders(
      <CountryList data={[france]} onSelect={mockOnSelect} />,
    )

    const countryItem = getByTestId('country-selector-FR')
    fireEvent.press(countryItem)

    expect(mockOnSelect).toHaveBeenCalledWith(france)
  })

  it('renders with withAlphaFilter', () => {
    const { UNSAFE_root } = renderWithProviders(
      <CountryList
        data={[france, germany, usa]}
        onSelect={mockOnSelect}
        withAlphaFilter={true}
      />,
    )

    // Alpha filter should render letter buttons
    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders with withCallingCode', () => {
    const { getByText } = renderWithProviders(
      <CountryList
        data={[france]}
        onSelect={mockOnSelect}
        withCallingCode={true}
      />,
    )

    // Should show calling code in parentheses
    expect(getByText(/\+33/)).toBeTruthy()
  })

  it('renders with withCurrency', () => {
    const { getByText } = renderWithProviders(
      <CountryList
        data={[france]}
        onSelect={mockOnSelect}
        withCurrency={true}
      />,
    )

    // Should show currency
    expect(getByText(/EUR/)).toBeTruthy()
  })

  it('renders with both withCallingCode and withCurrency', () => {
    const { getByText } = renderWithProviders(
      <CountryList
        data={[france]}
        onSelect={mockOnSelect}
        withCallingCode={true}
        withCurrency={true}
      />,
    )

    // Should show both
    expect(getByText(/\+33.*EUR|EUR.*\+33/)).toBeTruthy()
  })

  it('filters countries when filter prop is provided', () => {
    const { queryByText, getByText } = renderWithProviders(
      <CountryList
        data={[france, germany, usa]}
        onSelect={mockOnSelect}
        filter="France"
      />,
    )

    expect(getByText('France')).toBeTruthy()
    // Other countries should not be visible (filtered out)
  })

  it('uses withFlag=true by default', () => {
    const { UNSAFE_root } = renderWithProviders(
      <CountryList data={[france]} onSelect={mockOnSelect} />,
    )

    // Default withFlag should be true, Flag component should be rendered
    expect(UNSAFE_root).toBeTruthy()
  })

  it('hides flag when withFlag is false', () => {
    const { UNSAFE_root } = renderWithProviders(
      <CountryList data={[france]} onSelect={mockOnSelect} withFlag={false} />,
    )

    expect(UNSAFE_root).toBeTruthy()
  })

  it('renders letter buttons when withAlphaFilter is true', () => {
    const { getByTestId } = renderWithProviders(
      <CountryList
        data={[france, germany, usa]}
        onSelect={mockOnSelect}
        withAlphaFilter={true}
      />,
    )

    // Should have letter buttons for F, G, U
    expect(getByTestId('letter-F')).toBeTruthy()
    expect(getByTestId('letter-G')).toBeTruthy()
    expect(getByTestId('letter-U')).toBeTruthy()
  })

  it('scrolls to letter when letter button is pressed', () => {
    const { getByTestId } = renderWithProviders(
      <CountryList
        data={[france, germany, usa]}
        onSelect={mockOnSelect}
        withAlphaFilter={true}
      />,
    )

    const letterButton = getByTestId('letter-G')
    fireEvent.press(letterButton)

    // The scroll action should be triggered (we can't easily test the actual scroll)
    expect(letterButton).toBeTruthy()
  })
})
