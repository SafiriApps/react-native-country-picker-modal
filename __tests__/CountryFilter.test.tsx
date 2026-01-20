import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { CountryFilter } from '../src/CountryFilter'
import { ThemeProvider, DEFAULT_THEME } from '../src/CountryTheme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>{component}</ThemeProvider>,
  )
}

describe('CountryFilter', () => {
  it('renders with default props', () => {
    const { getByTestId } = renderWithTheme(<CountryFilter />)

    const input = getByTestId('text-input-country-filter')
    expect(input).toBeTruthy()
    expect(input.props.placeholder).toBe('Enter country name')
    expect(input.props.autoFocus).toBe(false)
  })

  it('renders with custom placeholder', () => {
    const { getByTestId } = renderWithTheme(
      <CountryFilter placeholder="Search countries..." />,
    )

    const input = getByTestId('text-input-country-filter')
    expect(input.props.placeholder).toBe('Search countries...')
  })

  it('renders with autoFocus enabled', () => {
    const { getByTestId } = renderWithTheme(<CountryFilter autoFocus={true} />)

    const input = getByTestId('text-input-country-filter')
    expect(input.props.autoFocus).toBe(true)
  })

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = renderWithTheme(
      <CountryFilter onChangeText={onChangeText} />,
    )

    const input = getByTestId('text-input-country-filter')
    fireEvent.changeText(input, 'France')

    expect(onChangeText).toHaveBeenCalledWith('France')
  })

  it('calls onFocus when focused', () => {
    const onFocus = jest.fn()
    const { getByTestId } = renderWithTheme(<CountryFilter onFocus={onFocus} />)

    const input = getByTestId('text-input-country-filter')
    fireEvent(input, 'focus')

    expect(onFocus).toHaveBeenCalled()
  })

  it('calls onBlur when blurred', () => {
    const onBlur = jest.fn()
    const { getByTestId } = renderWithTheme(<CountryFilter onBlur={onBlur} />)

    const input = getByTestId('text-input-country-filter')
    fireEvent(input, 'blur')

    expect(onBlur).toHaveBeenCalled()
  })

  it('has autoCorrect disabled', () => {
    const { getByTestId } = renderWithTheme(<CountryFilter />)

    const input = getByTestId('text-input-country-filter')
    expect(input.props.autoCorrect).toBe(false)
  })

  it('displays controlled value', () => {
    const { getByTestId } = renderWithTheme(<CountryFilter value="Germany" />)

    const input = getByTestId('text-input-country-filter')
    expect(input.props.value).toBe('Germany')
  })
})
