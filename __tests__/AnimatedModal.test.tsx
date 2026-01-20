import React from 'react'
import { Text, Animated } from 'react-native'
import { render } from '@testing-library/react-native'
import { AnimatedModal } from '../src/AnimatedModal'

// Polyfill setImmediate for jsdom environment
global.setImmediate =
  global.setImmediate || ((fn: () => void) => setTimeout(fn, 0))

describe('AnimatedModal', () => {
  it('renders children', () => {
    const { getByText } = render(
      <AnimatedModal visible={true}>
        <Text>Modal Content</Text>
      </AnimatedModal>,
    )

    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('renders with visible=false by default', () => {
    const { getByText } = render(
      <AnimatedModal>
        <Text>Modal Content</Text>
      </AnimatedModal>,
    )

    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('renders with visible=true', () => {
    const { getByText } = render(
      <AnimatedModal visible={true}>
        <Text>Visible Modal</Text>
      </AnimatedModal>,
    )

    expect(getByText('Visible Modal')).toBeTruthy()
  })

  it('applies animation styles with transform', () => {
    const { UNSAFE_root } = render(
      <AnimatedModal visible={true}>
        <Text>Animated Content</Text>
      </AnimatedModal>,
    )

    // Find the Animated.View
    const animatedView = UNSAFE_root.findByType(Animated.View)
    expect(animatedView).toBeTruthy()
    expect(animatedView.props.style).toBeDefined()
    expect(animatedView.props.style.transform).toBeDefined()
  })

  it('has absoluteFillObject style', () => {
    const { UNSAFE_root } = render(
      <AnimatedModal visible={true}>
        <Text>Content</Text>
      </AnimatedModal>,
    )

    const animatedView = UNSAFE_root.findByType(Animated.View)
    const style = animatedView.props.style

    // Should have position absolute properties from absoluteFillObject
    expect(style.position).toBe('absolute')
    expect(style.zIndex).toBe(99)
  })

  it('content persists when visibility changes', () => {
    const { rerender, getByText } = render(
      <AnimatedModal visible={false}>
        <Text>Content</Text>
      </AnimatedModal>,
    )

    // Content should still be in DOM (just translated off screen)
    expect(getByText('Content')).toBeTruthy()

    // Change visibility
    rerender(
      <AnimatedModal visible={true}>
        <Text>Content</Text>
      </AnimatedModal>,
    )

    expect(getByText('Content')).toBeTruthy()
  })
})
