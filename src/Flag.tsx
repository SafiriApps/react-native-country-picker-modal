import React, { memo, useState, useEffect } from 'react'
import { Emoji } from './Emoji'
import { CountryCode } from './types'
import { useContext } from './CountryContext'
import {
  Image,
  StyleSheet,
  PixelRatio,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    marginRight: 10,
  },
  emojiFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  imageFlag: {
    resizeMode: 'contain',
    width: 25,
    height: 19,
    borderWidth: 1 / PixelRatio.get(),
    opacity: 0.8,
  },
})

interface FlagType {
  countryCode: CountryCode
  withEmoji?: boolean
  withFlagButton?: boolean
  flagSize: number
}

const ImageFlag = memo(({ countryCode, flagSize }: FlagType) => {
  const { getImageFlagAsync } = useContext()
  const [loading, setLoading] = useState(true)
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getImageFlagAsync(countryCode)
      .then((uri) => {
        if (!cancelled) {
          setImageUri(uri)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [countryCode, getImageFlagAsync])

  if (loading) {
    return <ActivityIndicator size={'small'} />
  }

  return (
    <Image
      resizeMode={'contain'}
      style={[
        styles.imageFlag,
        { borderColor: 'transparent', height: flagSize },
      ]}
      source={{ uri: imageUri }}
    />
  )
})

const EmojiFlag = memo(({ countryCode, flagSize }: FlagType) => {
  const { getEmojiFlagAsync } = useContext()
  const [loading, setLoading] = useState(true)
  const [emojiName, setEmojiName] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getEmojiFlagAsync(countryCode)
      .then((name) => {
        if (!cancelled) {
          setEmojiName(name)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [countryCode, getEmojiFlagAsync])

  if (loading) {
    return <ActivityIndicator size={'small'} />
  }

  if (!emojiName) {
    return null
  }

  return (
    <Text
      style={[styles.emojiFlag, { fontSize: flagSize }]}
      allowFontScaling={false}
    >
      <Emoji name={emojiName} />
    </Text>
  )
})

export const Flag = ({
  countryCode,
  withEmoji = true,
  withFlagButton = true,
  flagSize,
}: FlagType) =>
  withFlagButton ? (
    <View style={styles.container}>
      {withEmoji ? (
        <EmojiFlag {...{ countryCode, flagSize }} />
      ) : (
        <ImageFlag {...{ countryCode, flagSize }} />
      )}
    </View>
  ) : null
