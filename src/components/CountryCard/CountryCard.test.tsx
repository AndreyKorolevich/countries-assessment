import { render, screen, fireEvent, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import CountryCard from './CountryCard'
import GET_COUNTRY, { TCountry } from '../../api/query/getCountry'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { TStorage } from './types.ts'
import { FAVORITE_COUNTRIES } from '../../constants.ts'

const mockData: TCountry = {
  country: {
    languages: [{ name: 'English' }, { name: 'Spanish' }],
    currency: 'USD',
    states: [{ name: 'State1' }, { name: 'State2' }],
  },
}

const renderHelper = (storage: TStorage = {}) => {
  const mocks = [
    {
      request: {
        query: GET_COUNTRY,
        variables: { code: 'mockCountryCode' },
      },
      result: { data: mockData },
    },
  ]

  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CountryCard name='MockCountry' continent={{ name: 'MockContinent' }} code='mockCountryCode' storage={storage} />
    </MockedProvider>,
  )
}

describe('CountryCard Component', () => {
  test('renders the component with initial data', async () => {
    renderHelper()

    expect(screen.getByText('MockCountry')).toBeInTheDocument()
    expect(screen.getByText('MockContinent')).toBeInTheDocument()
    expect(screen.queryByText('English')).not.toBeInTheDocument()
    expect(screen.queryByText('Spanish')).not.toBeInTheDocument()
    expect(screen.queryByText('USD')).not.toBeInTheDocument()
  })

  test('opens the popover on click', async () => {
    renderHelper()

    fireEvent.click(screen.getByText('MockCountry'))

    // Wait for the data to be loaded
    await screen.findByText('English')

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
    expect(screen.getByText(mockData.country.states.length)).toBeInTheDocument()
  })

  test('marks/unmarks as favorite on rating change', async () => {
    const storage: TStorage = {}
    renderHelper(storage)

    const emptyRating = screen.getByRole('radio', { name: 'Empty' })

    expect(storage['mockCountryCode']).toBeUndefined()

    // Mark as favorite
    await userEvent.click(emptyRating)

    expect(storage['mockCountryCode']).toBe(1)

    // Unmark as favorite
    const checkedRating = screen.getByRole('radio', { name: 'Empty' })
    await userEvent.click(checkedRating)

    expect(storage['mockCountryCode']).toBeUndefined()
    // Save to localStorage
    act(() => {
      window.localStorage.setItem(FAVORITE_COUNTRIES, JSON.stringify(storage))
    })

    // Retrieve from localStorage
    const retrievedStorage = JSON.parse(window.localStorage.getItem(FAVORITE_COUNTRIES) || '{}')
    expect(retrievedStorage['mockCountryCode']).toBeUndefined()
  })
})
