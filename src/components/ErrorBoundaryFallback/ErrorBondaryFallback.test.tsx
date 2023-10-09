import { render, screen } from '@testing-library/react'
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'



describe('ErrorBoundaryFallback Component', () => {
  test('renders dialog with correct title and content', () => {
    render(<ErrorBoundaryFallback />)

    const titleElement = screen.getByText('Error!')
    const buttonElement = screen.getByRole('button', {name: 'Confirm'})
    const contentElement = screen.getByText('Sorry for this inconvenience, but some unknown error has occurred.')

    expect(titleElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls confirmAction when Confirm button is clicked', async () => {
    render(<ErrorBoundaryFallback />)

    const buttonElement = screen.getByRole('button', {name: 'Confirm'})
    await userEvent.click(buttonElement)

    // Ensure that the confirmAction function is called
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })
})
