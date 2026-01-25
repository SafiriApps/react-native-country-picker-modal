import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ExampleCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export const ExampleCard = ({ title, description, children }: ExampleCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#e2e2e2',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  content: {
    gap: 8,
  },
})
