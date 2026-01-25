import React from 'react'
import { Link } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const routes = [
  { title: 'Settings (GIF-style toggles)', href: '/settings' },
  { title: 'Quick Start', href: '/quick-start' },
  { title: 'Basic Usage + Services', href: '/basic' },
  { title: 'Theming', href: '/theming' },
  { title: 'Filtering + Performance', href: '/filtering' },
  { title: 'Translation', href: '/translation' },
  { title: 'Display Options', href: '/display-options' },
  { title: 'Prop Matrix', href: '/prop-matrix' },
  { title: 'Custom Rendering', href: '/custom-rendering' },
  { title: 'Programmatic Control', href: '/programmatic' },
]

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Country Picker Modal Showcase</Text>
      <Text style={styles.subtitle}>
        Explore the demos below and adjust options in Settings.
      </Text>
      <View style={styles.list}>
        {routes.map((route) => (
          <Link key={route.href} href={route.href} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardText}>{route.title}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
  },
})

export default HomeScreen
