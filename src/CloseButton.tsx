import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from './CountryTheme'

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
})

interface CloseButtonProps {
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  image?: ImageSourcePropType
  onPress?(): void
}

const CloseButton = (props: CloseButtonProps) => {
  const closeImage: ImageSourcePropType = props.image ?? (
    Platform.OS === 'android'
      ? require('./assets/images/close.android.png')
      : require('./assets/images/close.ios.png')
  )
  const { onBackgroundTextColor } = useTheme()

  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ borderless: true, radius: 20 }}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <Image
          source={closeImage}
          style={[
            styles.imageStyle,
            props.imageStyle,
            { tintColor: onBackgroundTextColor },
          ]}
        />
      </Pressable>
    </View>
  )
}

export default CloseButton
