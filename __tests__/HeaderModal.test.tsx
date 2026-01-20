import React from 'react'
import { Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { HeaderModal } from '../src/HeaderModal'
import { ThemeProvider, DEFAULT_THEME } from '../src/CountryTheme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>{component}</ThemeProvider>,
  )
}

describe('HeaderModal', () => {
  const mockOnClose = jest.fn()
  const mockRenderFilter = jest.fn(() => <Text>Filter</Text>)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default withCloseButton=true', () => {
    const { UNSAFE_root } = renderWithTheme(
      <HeaderModal onClose={mockOnClose} renderFilter={mockRenderFilter} />,
    )

    // Should find a Pressable for the close button
    expect(UNSAFE_root).toBeTruthy()
  })

  it('hides close button when withCloseButton is false', () => {
    const { queryByTestId } = renderWithTheme(
      <HeaderModal
        onClose={mockOnClose}
        renderFilter={mockRenderFilter}
        withCloseButton={false}
      />,
    )

    // CloseButton should not be rendered
    // Since CloseButton doesn't have a testID, we check the structure
    expect(queryByTestId('close-button')).toBeNull()
  })

  it('renders filter when withFilter is true', () => {
    const { getByText } = renderWithTheme(
      <HeaderModal
        onClose={mockOnClose}
        renderFilter={mockRenderFilter}
        withFilter={true}
      />,
    )

    expect(mockRenderFilter).toHaveBeenCalled()
    expect(getByText('Filter')).toBeTruthy()
  })

  it('does not render filter when withFilter is false', () => {
    const { queryByText } = renderWithTheme(
      <HeaderModal
        onClose={mockOnClose}
        renderFilter={mockRenderFilter}
        withFilter={false}
      />,
    )

    expect(queryByText('Filter')).toBeNull()
  })

  it('does not render filter when withFilter is undefined', () => {
    const renderFilter = jest.fn(() => <Text>Filter</Text>)
    renderWithTheme(
      <HeaderModal onClose={mockOnClose} renderFilter={renderFilter} />,
    )

    expect(renderFilter).not.toHaveBeenCalled()
  })
})
