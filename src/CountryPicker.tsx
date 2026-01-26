import React, { ReactNode, useState, useEffect } from 'react'
import {
  ModalProps,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native'
import { CountryModal } from './CountryModal'
import { HeaderModal } from './HeaderModal'
import { Country, CountryCode, FlagType, Region, Subregion, TranslationLanguageCode } from './types'
import { CountryFilter, CountryFilterProps } from './CountryFilter'
import { FlagButton } from './FlagButton'
import { useContext } from './CountryContext'
import { CountryList } from './CountryList'

interface State {
  visible: boolean
  countries: Country[]
  filter?: string
  filterFocus?: boolean
}

interface RenderFlagButtonProps
  extends React.ComponentProps<typeof FlagButton> {
  renderFlagButton?(props: React.ComponentProps<typeof FlagButton>): ReactNode
}

interface RenderCountryFilterProps
  extends React.ComponentProps<typeof CountryFilter> {
  renderCountryFilter?(
    props: React.ComponentProps<typeof CountryFilter>,
  ): ReactNode
}

const renderFlagButton = (props: RenderFlagButtonProps): ReactNode =>
  props.renderFlagButton ? (
    props.renderFlagButton(props)
  ) : (
    <FlagButton {...props} />
  )

const renderFilter = (props: RenderCountryFilterProps): ReactNode =>
  props.renderCountryFilter ? (
    props.renderCountryFilter(props)
  ) : (
    <CountryFilter {...props} />
  )

interface CountryPickerProps {
  allowFontScaling?: boolean
  countryCode?: CountryCode
  region?: Region
  subregion?: Subregion
  countryCodes?: CountryCode[]
  excludeCountries?: CountryCode[]
  preferredCountries?: CountryCode[]
  modalProps?: ModalProps
  filterProps?: CountryFilterProps
  translation?: TranslationLanguageCode
  withEmoji?: boolean
  withCountryNameButton?: boolean
  withCurrencyButton?: boolean
  withCallingCodeButton?: boolean
  withFlagButton?: boolean
  withCloseButton?: boolean
  withFilter?: boolean
  withAlphaFilter?: boolean
  withCallingCode?: boolean
  withCurrency?: boolean
  withFlag?: boolean
  withModal?: boolean
  disableNativeModal?: boolean
  visible?: boolean
  placeholder?: string
  containerButtonStyle?: StyleProp<ViewStyle>
  closeButtonImage?: ImageSourcePropType
  closeButtonStyle?: StyleProp<ViewStyle>
  closeButtonImageStyle?: StyleProp<ImageStyle>
  renderFlagButton?(props: React.ComponentProps<typeof FlagButton>): ReactNode
  renderCountryFilter?(
    props: React.ComponentProps<typeof CountryFilter>,
  ): ReactNode
  onSelect(country: Country): void
  onOpen?(): void
  onClose?(): void
}

export const CountryPicker = (props: CountryPickerProps) => {
  const {
    allowFontScaling = true,
    countryCode,
    region,
    subregion,
    countryCodes,
    renderFlagButton: renderButton,
    renderCountryFilter,
    filterProps,
    modalProps,
    onSelect,
    withEmoji,
    withFilter,
    withCloseButton,
    withCountryNameButton,
    withCallingCodeButton,
    withCurrencyButton,
    containerButtonStyle,
    withAlphaFilter = false,
    withCallingCode = false,
    withCurrency,
    withFlag,
    withModal = true,
    disableNativeModal,
    withFlagButton,
    onClose: handleClose,
    onOpen: handleOpen,
    closeButtonImage,
    closeButtonStyle,
    closeButtonImageStyle,
    excludeCountries,
    placeholder = 'Select Country',
    preferredCountries,
    translation: translationProp,
  } = props
  const [state, setState] = useState<State>({
    visible: props.visible || false,
    countries: [],
    filter: '',
    filterFocus: false,
  })
  const { translation: contextTranslation, getCountriesAsync } = useContext()
  const translation = translationProp ?? contextTranslation
  const { visible, filter, countries, filterFocus } = state

  useEffect(() => {
    if (state.visible !== props.visible) {
      setState((prev) => ({ ...prev, visible: props.visible || false }))
    }
  }, [props.visible, state.visible])

  const onOpen = () => {
    setState((prev) => ({ ...prev, visible: true }))
    handleOpen?.()
  }

  const onClose = () => {
    setState((prev) => ({ ...prev, filter: '', visible: false }))
    handleClose?.()
  }

  const setFilter = (filter: string) => setState((prev) => ({ ...prev, filter }))

  const setCountries = (countries: Country[]) => setState((prev) => ({ ...prev, countries }))

  const onSelectClose = (country: Country) => {
    onSelect(country)
    onClose?.()
  }

  const onFocus = () => setState((prev) => ({ ...prev, filterFocus: true }))

  const onBlur = () => setState((prev) => ({ ...prev, filterFocus: false }))

  const flagProp = {
    allowFontScaling,
    countryCode,
    withEmoji,
    withCountryNameButton,
    withCallingCodeButton,
    withCurrencyButton,
    withFlagButton,
    renderFlagButton: renderButton,
    onOpen,
    containerButtonStyle,
    placeholder: placeholder || 'Select Country',
  }

  useEffect(() => {
    let cancel = false
    getCountriesAsync(
      withEmoji ? FlagType.EMOJI : FlagType.FLAT,
      translation,
      region,
      subregion,
      countryCodes,
      excludeCountries,
      preferredCountries,
      withAlphaFilter,
    )
      .then((countries) => (cancel ? null : setCountries(countries)))
      .catch(console.warn)

    return () => {
      cancel = true
    }
  }, [
    translation,
    withEmoji,
    region,
    subregion,
    countryCodes,
    excludeCountries,
    preferredCountries,
    withAlphaFilter,
    getCountriesAsync,
  ])

  return (
    <>
      {withModal && renderFlagButton(flagProp)}
      <CountryModal
        {...{ visible, withModal, disableNativeModal, ...modalProps }}
        onRequestClose={onClose}
        onDismiss={onClose}
      >
        <HeaderModal
          {...{
            withFilter,
            onClose,
            closeButtonImage,
            closeButtonImageStyle,
            closeButtonStyle,
            withCloseButton,
          }}
          renderFilter={(props) =>
            renderFilter({
              ...props,
              allowFontScaling,
              renderCountryFilter,
              onChangeText: setFilter,
              value: filter,
              onFocus,
              onBlur,
              ...filterProps,
            })
          }
        />
        <CountryList
          {...{
            onSelect: onSelectClose,
            data: countries,
            letters: [],
            withAlphaFilter: withAlphaFilter && filter === '',
            withCallingCode,
            withCurrency,
            withFlag,
            withEmoji,
            filter,
            filterFocus,
          }}
        />
      </CountryModal>
    </>
  )
}
