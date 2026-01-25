import * as React from 'react'
import { TranslationLanguageCode } from './types'
import {
  getEmojiFlagAsync,
  getImageFlagAsync,
  getCountryNameAsync,
  getCountriesAsync,
  getLetters,
  getCountryCallingCodeAsync,
  getCountryCurrencyAsync,
  getCountryInfoAsync,
  search,
} from './CountryService'

export interface CountryContextParam {
  translation?: TranslationLanguageCode
  getCountryNameAsync: typeof getCountryNameAsync
  getImageFlagAsync: typeof getImageFlagAsync
  getEmojiFlagAsync: typeof getEmojiFlagAsync
  getCountriesAsync: typeof getCountriesAsync
  getLetters: typeof getLetters
  getCountryCallingCodeAsync: typeof getCountryCallingCodeAsync
  getCountryCurrencyAsync: typeof getCountryCurrencyAsync
  search: typeof search
  getCountryInfoAsync: typeof getCountryInfoAsync
}

export const DEFAULT_COUNTRY_CONTEXT: CountryContextParam = {
  translation: 'common' as TranslationLanguageCode,
  getCountryNameAsync,
  getImageFlagAsync,
  getEmojiFlagAsync,
  getCountriesAsync,
  getCountryCallingCodeAsync,
  getCountryCurrencyAsync,
  search,
  getLetters,
  getCountryInfoAsync,
}

export const CountryContext = React.createContext<CountryContextParam>(
  DEFAULT_COUNTRY_CONTEXT,
)

export const useContext = () => React.useContext(CountryContext)

// Memoized provider that prevents unnecessary re-renders when translation hasn't changed
interface CountryProviderProps {
  value: CountryContextParam
  children: React.ReactNode
}

export const CountryProvider = ({ value, children }: CountryProviderProps) => {
  // Memoize the context value - only recreate when translation changes
  // All other values are stable module-level functions
  const memoizedValue = React.useMemo(
    () => value,
    [value.translation]
  )

  return (
    <CountryContext.Provider value={memoizedValue}>
      {children}
    </CountryContext.Provider>
  )
}

export const CountryConsumer = CountryContext.Consumer
