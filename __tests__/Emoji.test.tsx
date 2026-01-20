import React from 'react'
import { render } from '@testing-library/react-native'
import { Emoji } from '../src/Emoji'

describe('Emoji', () => {
  describe('non-flag emojis', () => {
    it('renders smile emoji', () => {
      const { getByText } = render(<Emoji name="smile" />)
      expect(getByText('😄')).toBeTruthy()
    })

    it('renders heart emoji', () => {
      const { getByText } = render(<Emoji name="heart" />)
      expect(getByText('❤️')).toBeTruthy()
    })
  })

  describe('flag emojis using Unicode regional indicators', () => {
    // These tests verify the countryCodeToFlag function works correctly
    // by converting ISO country codes to flag emojis

    it('renders US flag', () => {
      const { getByText } = render(<Emoji name="flag-us" />)
      expect(getByText('🇺🇸')).toBeTruthy()
    })

    it('renders French flag', () => {
      const { getByText } = render(<Emoji name="flag-fr" />)
      expect(getByText('🇫🇷')).toBeTruthy()
    })

    it('renders UK flag', () => {
      const { getByText } = render(<Emoji name="flag-gb" />)
      expect(getByText('🇬🇧')).toBeTruthy()
    })

    it('renders German flag', () => {
      const { getByText } = render(<Emoji name="flag-de" />)
      expect(getByText('🇩🇪')).toBeTruthy()
    })

    it('renders Japanese flag', () => {
      const { getByText } = render(<Emoji name="flag-jp" />)
      expect(getByText('🇯🇵')).toBeTruthy()
    })

    // These flags previously failed with node-emoji v2 naming issues
    it('renders Canadian flag', () => {
      const { getByText } = render(<Emoji name="flag-ca" />)
      expect(getByText('🇨🇦')).toBeTruthy()
    })

    it('renders Australian flag', () => {
      const { getByText } = render(<Emoji name="flag-au" />)
      expect(getByText('🇦🇺')).toBeTruthy()
    })

    it('renders Brazilian flag', () => {
      const { getByText } = render(<Emoji name="flag-br" />)
      expect(getByText('🇧🇷')).toBeTruthy()
    })

    it('renders Indian flag', () => {
      const { getByText } = render(<Emoji name="flag-in" />)
      expect(getByText('🇮🇳')).toBeTruthy()
    })

    it('renders Chinese flag', () => {
      const { getByText } = render(<Emoji name="flag-cn" />)
      expect(getByText('🇨🇳')).toBeTruthy()
    })

    it('renders Mexican flag', () => {
      const { getByText } = render(<Emoji name="flag-mx" />)
      expect(getByText('🇲🇽')).toBeTruthy()
    })

    it('renders South African flag', () => {
      const { getByText } = render(<Emoji name="flag-za" />)
      expect(getByText('🇿🇦')).toBeTruthy()
    })

    it('renders Nigerian flag', () => {
      const { getByText } = render(<Emoji name="flag-ng" />)
      expect(getByText('🇳🇬')).toBeTruthy()
    })

    it('renders South Korean flag', () => {
      const { getByText } = render(<Emoji name="flag-kr" />)
      expect(getByText('🇰🇷')).toBeTruthy()
    })

    it('renders Italian flag', () => {
      const { getByText } = render(<Emoji name="flag-it" />)
      expect(getByText('🇮🇹')).toBeTruthy()
    })

    it('renders Spanish flag', () => {
      const { getByText } = render(<Emoji name="flag-es" />)
      expect(getByText('🇪🇸')).toBeTruthy()
    })

    it('renders Russian flag', () => {
      const { getByText } = render(<Emoji name="flag-ru" />)
      expect(getByText('🇷🇺')).toBeTruthy()
    })
  })

  describe('edge cases', () => {
    it('returns null for undefined name', () => {
      const { toJSON } = render(<Emoji name={undefined as unknown as string} />)
      expect(toJSON()).toBeNull()
    })

    it('returns null for empty string name', () => {
      const { toJSON } = render(<Emoji name="" />)
      expect(toJSON()).toBeNull()
    })

    it('handles lowercase country codes', () => {
      const { getByText } = render(<Emoji name="flag-us" />)
      expect(getByText('🇺🇸')).toBeTruthy()
    })
  })
})
