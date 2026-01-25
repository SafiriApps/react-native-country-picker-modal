import React, { memo } from 'react'
import { Text } from 'react-native'

/**
 * Convert a 2-letter ISO country code to a flag emoji using Unicode regional indicator symbols.
 * Each letter A-Z maps to U+1F1E6 to U+1F1FF (regional indicator symbols).
 * Two regional indicators together form a flag emoji.
 */
const countryCodeToFlag = (countryCode: string): string => {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) {
    return ''
  }
  // Convert each letter to regional indicator symbol
  // 'A' = 65, regional indicator 'A' = 0x1F1E6, so offset = 0x1F1E6 - 65 = 127397
  const offset = 0x1F1E6 - 65
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
  )
}

const Emoji = memo(({ name }: { name: string }) => {
  // Handle undefined/null name gracefully (can happen during async loading)
  if (!name) {
    return null;
  }

  // All country flags use 'flag-XX' format where XX is the country code
  // The countryCodeToFlag function converts this to Unicode regional indicator symbols
  if (name.startsWith('flag-')) {
    const countryCode = name.replace('flag-', '')
    const emoji = countryCodeToFlag(countryCode)
    return <Text allowFontScaling={false}>{emoji}</Text>
  }

  // For any other emoji format, return the name as-is (shouldn't happen in this library)
  return <Text allowFontScaling={false}>{name}</Text>
})

export { Emoji }
