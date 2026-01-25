import React from 'react'

export interface SettingsState {
  withCountryNameButton: boolean
  withFlag: boolean
  withEmoji: boolean
  withFilter: boolean
  withCallingCode: boolean
  withAlphaFilter: boolean
  withCurrency: boolean
  withModal: boolean
  disableNativeModal: boolean
  withFlagButton: boolean
  allowFontScaling: boolean
  darkTheme: boolean
  withCallingCodeButton: boolean
  withCurrencyButton: boolean
}

export const DEFAULT_SETTINGS: SettingsState = {
  withCountryNameButton: false,
  withFlag: true,
  withEmoji: true,
  withFilter: true,
  withCallingCode: false,
  withAlphaFilter: false,
  withCurrency: false,
  withModal: true,
  disableNativeModal: false,
  withFlagButton: true,
  allowFontScaling: true,
  darkTheme: false,
  withCallingCodeButton: false,
  withCurrencyButton: false,
}

interface SettingsContextValue {
  settings: SettingsState
  setSetting<K extends keyof SettingsState>(key: K, value: SettingsState[K]): void
  resetSettings(): void
}

const SettingsContext = React.createContext<SettingsContextValue | undefined>(
  undefined,
)

interface SettingsProviderProps {
  children: React.ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = React.useState<SettingsState>(DEFAULT_SETTINGS)

  const setSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => setSettings(DEFAULT_SETTINGS)

  const value = React.useMemo(
    () => ({
      settings,
      setSetting,
      resetSettings,
    }),
    [settings],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
