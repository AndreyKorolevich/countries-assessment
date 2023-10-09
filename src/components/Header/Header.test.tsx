import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import '@testing-library/jest-dom'

// Mocking the IntersectionObserver since it's not available in the testing environment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Header Component', () => {
  test('renders header with input and endAdornment', () => {
    const updateSearchInput = jest.fn()

    render(<Header updateSearchInput={updateSearchInput} />)

    const inputElement = screen.getByRole('textbox')
    const endAdornment = screen.getByText('Name')

    expect(inputElement).toBeInTheDocument()
    expect(endAdornment).toBeInTheDocument()
  })

  test('calls updateSearchInput when input value changes', () => {
    const updateSearchInput = jest.fn()

    render(<Header updateSearchInput={updateSearchInput} />)

    const inputElement = screen.getByRole('textbox')

    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    // Ensure that updateSearchInput is called with the correct value
    expect(updateSearchInput).toHaveBeenCalledWith('New Value')
  })

})
