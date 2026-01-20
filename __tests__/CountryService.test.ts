import { getLetters, search } from '../src/CountryService'
import { Country } from '../src/types'

const france: Country = {
  region: 'Europe',
  subregion: 'Western Europe',
  currency: ['EUR'],
  callingCode: ['33'],
  flag: '🇫🇷',
  name: 'France',
  cca2: 'FR',
}

const germany: Country = {
  region: 'Europe',
  subregion: 'Western Europe',
  currency: ['EUR'],
  callingCode: ['49'],
  flag: '🇩🇪',
  name: 'Germany',
  cca2: 'DE',
}

const usa: Country = {
  region: 'Americas',
  subregion: 'North America',
  currency: ['USD'],
  callingCode: ['1'],
  flag: '🇺🇸',
  name: 'United States',
  cca2: 'US',
}

const japan: Country = {
  region: 'Asia',
  subregion: 'Eastern Asia',
  currency: ['JPY'],
  callingCode: ['81'],
  flag: '🇯🇵',
  name: 'Japan',
  cca2: 'JP',
}

describe('search', () => {
  it('returns Country items with Fuse v7 (not wrapped objects)', () => {
    const result = search('fra', [france, germany])

    expect(result).toHaveLength(1)
    expect(result[0].cca2).toBe('FR')
    // Ensure we get unwrapped Country objects, not Fuse result objects
    expect('item' in (result[0] as unknown as Record<string, unknown>)).toBe(
      false,
    )
  })

  it('returns full data when filter is empty', () => {
    const data = [france, germany]
    const result = search('', data)

    expect(result).toHaveLength(2)
    expect(result.map((country) => country.cca2)).toEqual(['FR', 'DE'])
  })

  it('returns empty array when data is empty', () => {
    const result = search('test', [])
    expect(result).toEqual([])
  })

  it('returns full data when filter is undefined', () => {
    const data = [france, germany]
    const result = search(undefined, data)

    expect(result).toHaveLength(2)
  })

  it('searches by country code (cca2)', () => {
    const data = [france, germany, usa]
    const result = search('US', data)

    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.some((c) => c.cca2 === 'US')).toBe(true)
  })

  it('searches by calling code', () => {
    const data = [france, germany, usa, japan]
    const result = search('81', data)

    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.some((c) => c.cca2 === 'JP')).toBe(true)
  })

  it('searches by currency', () => {
    const data = [france, germany, usa, japan]
    const result = search('EUR', data)

    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.every((c) => c.currency.includes('EUR'))).toBe(true)
  })

  it('handles partial name matches', () => {
    const data = [france, germany, usa]
    const result = search('Unit', data)

    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.some((c) => c.cca2 === 'US')).toBe(true)
  })

  it('reinitializes fuse when data length changes', () => {
    // First search with 2 countries
    const result1 = search('fra', [france, germany])
    expect(result1).toHaveLength(1)

    // Second search with different data set
    const result2 = search('jap', [france, germany, usa, japan])
    expect(result2.length).toBeGreaterThanOrEqual(1)
    expect(result2.some((c) => c.cca2 === 'JP')).toBe(true)
  })
})

describe('getLetters', () => {
  it('returns unique sorted uppercase letters', () => {
    const guatemala: Country = { ...germany, name: 'guatemala', cca2: 'GT' }
    const data = [
      { ...france, name: 'france' },
      { ...germany, name: 'germany' },
      guatemala,
    ]

    expect(getLetters(data)).toEqual(['F', 'G'])
  })

  it('returns empty array for empty data', () => {
    expect(getLetters([])).toEqual([])
  })

  it('handles multiple countries with same first letter', () => {
    const data = [france, { ...france, name: 'Finland', cca2: 'FI' }]
    expect(getLetters(data)).toEqual(['F'])
  })

  it('sorts letters alphabetically', () => {
    const data = [usa, japan, france, germany]
    const letters = getLetters(data)

    expect(letters).toEqual([...letters].sort())
  })

  it('handles lowercase names correctly', () => {
    const data = [
      { ...france, name: 'france' },
      { ...germany, name: 'GERMANY' },
    ]
    const letters = getLetters(data)

    expect(letters).toEqual(['F', 'G'])
  })
})
