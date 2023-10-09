import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_COUNTRIES from '../../api/query/getContries.ts'
import App from './App.tsx'
import '@testing-library/jest-dom'


const mockCountries = Array(60).fill(0).map((_, i) => ({
  name: `Country${i}`, code: `C${i}`, continent: { name: 'Continent1' },
}))

const mockData = {
  countries: mockCountries,
}

// Mocking the IntersectionObserver since it's not available in the testing environment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))


describe('App Component', () => {
  const renderHelper = () => {
    const mocks = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: { name: '' },
        },
        result: { data: mockData },
      },
    ]

    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>,
    )
  }

  test('renders the App component with initial data', async () => {
    renderHelper()

    // Wait for the data to be loaded
    await waitFor(() => screen.getByText('Country1'))

    // Check if the initial data is rendered
    expect(screen.getByText('Country1')).toBeInTheDocument()
    expect(screen.getByText('Country2')).toBeInTheDocument()
    expect(screen.queryByText('Country50')).not.toBeInTheDocument()
  })

  test('handles pagination', async () => {
    renderHelper()

    // Wait for the data to be loaded
    await waitFor(() => screen.getByText('Country1'))

    expect(screen.getByText('Country3')).toBeInTheDocument()
    expect(screen.queryByText('Country50')).not.toBeInTheDocument()


    // Change the page
    fireEvent.click(screen.getByLabelText('Go to page 2'))

    // Check if the new page data is rendered
    expect(screen.queryByText('Country50')).toBeInTheDocument()
    expect(screen.queryByText('Country1')).not.toBeInTheDocument()
  })
})
