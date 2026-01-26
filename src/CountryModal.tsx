import * as React from 'react'
import {
  ModalProps,
  StyleSheet,
  Platform,
} from 'react-native'
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context'
import { AnimatedModal } from './AnimatedModal'
import { Modal } from './Modal'
import { useTheme } from './CountryTheme'
import { CountryModalContext } from './CountryModalProvider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const CountryModal = ({
  children,
  withModal = true,
  disableNativeModal = false,
  animationType = 'slide',
  animated = true,
  ...props
}: ModalProps & {
  children: React.ReactNode
  withModal?: boolean
  disableNativeModal?: boolean
}) => {
  const { backgroundColor } = useTheme()
  const { teleport } = React.useContext(CountryModalContext)
  const { visible } = props
  const content = React.useMemo(
    () => (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    ),
    [children, backgroundColor]
  )
  React.useEffect(() => {
    if (disableNativeModal && teleport) {
      teleport(<AnimatedModal {...props}>{content}</AnimatedModal>)
    }
  }, [disableNativeModal, teleport, content, visible])
  if (withModal) {
    if (Platform.OS === 'web') {
      return <Modal {...props}>{content}</Modal>
    }
    if (disableNativeModal) {
      return null
    }
    return (
      <Modal {...props} animationType={animationType} animated={animated}>
        {content}
      </Modal>
    )
  }
  return content
}
