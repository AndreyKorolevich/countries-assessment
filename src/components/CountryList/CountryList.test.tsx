import { render, screen } from '@testing-library/react'
import CountryList from './CountryList'
import { PLACEHOLDER_CARD_COUNT } from '../../constants.ts'
import { TCountryCard } from '../CountryCard/types.ts'

// Mock localStorage to avoid issues with localStorage in tests
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
  },
  writable: true,
})

jest.mock('../CountryCard/CountryCard.tsx', () => () => <div data-testid='country-card' />)

describe('CountryList Component', () => {
  test('renders loading skeleton cards correctly', async () => {
    render(<CountryList countries={[]} loading={true} />)
    const skeletonCards = await screen.findAllByLabelText('skeleton-card')
    expect(skeletonCards).toHaveLength(PLACEHOLDER_CARD_COUNT)
  })

  test('renders country cards when data is loaded', async () => {
    const countries: Array<Omit<TCountryCard, 'storage'>> = [
      { code: 'US', name: 'United States', continent: { name: 'North America' } },
      { code: 'CA', name: 'Canada', continent: { name: 'North America' } },
    ]

    render(<CountryList countries={countries} loading={false} />)
    const countryCards = await screen.findAllByTestId('country-card')
    expect(countryCards).toHaveLength(countries.length)
  })
})
