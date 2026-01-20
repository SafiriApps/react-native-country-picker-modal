import * as React from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('window')

const duration = 300
const useNativeDriver = true

interface Props {
  visible?: boolean
  children: React.ReactNode
}

export const AnimatedModal = ({ children, visible = false }: Props) => {
  const translateY = React.useRef(new Animated.Value(height)).current

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver,
      }).start()
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration,
        useNativeDriver,
      }).start()
    }
  }, [visible, translateY])

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        transform: [{ translateY }],
        zIndex: 99,
      }}
    >
      {children}
    </Animated.View>
  )
}
