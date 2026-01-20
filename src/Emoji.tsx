import React, { memo } from 'react'
import { Text } from 'react-native'
import { get as getEmoji } from 'node-emoji'

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

  let emoji: string

  // Check if this is a flag emoji (format: 'flag-XX' where XX is country code)
  if (name.startsWith('flag-')) {
    const countryCode = name.replace('flag-', '')
    emoji = countryCodeToFlag(countryCode)
  } else {
    // Use node-emoji for non-flag emojis
    emoji = (getEmoji as (value: string) => string)(name) || ''
  }

  return <Text allowFontScaling={false}>{emoji}</Text>
})

export { Emoji }
