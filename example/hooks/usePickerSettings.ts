import { DARK_THEME } from 'react-native-country-picker-modal'
import { useSettings } from '../context/SettingsContext'

export const usePickerSettings = () => {
  const { settings } = useSettings()

  return {
    settings,
    pickerProps: {
      allowFontScaling: settings.allowFontScaling,
      withCountryNameButton: settings.withCountryNameButton,
      withFlag: settings.withFlag,
      withEmoji: settings.withEmoji,
      withFilter: settings.withFilter,
      withCallingCode: settings.withCallingCode,
      withAlphaFilter: settings.withAlphaFilter,
      withCurrency: settings.withCurrency,
      withModal: settings.withModal,
      disableNativeModal: settings.disableNativeModal,
      withFlagButton: settings.withFlagButton,
      withCallingCodeButton: settings.withCallingCodeButton,
      withCurrencyButton: settings.withCurrencyButton,
      theme: settings.darkTheme ? DARK_THEME : {},
    },
  }
}
