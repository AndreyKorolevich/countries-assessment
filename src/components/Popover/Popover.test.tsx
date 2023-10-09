import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Popover from './Popover'
import '@testing-library/jest-dom'

const sampleLanguages = [
  { name: 'English' },
  { name: 'Spanish' },
  // Add more sample languages as needed
]

const anchorEl = document.createElement('button')
const onClose = jest.fn()

describe('Popover Component', () => {
  const renderHelper = () => {
    render(
      <Popover
        anchorEl={anchorEl}
        onClose={onClose}
        languages={sampleLanguages}
        currency='USD'
        states={[{ name: 'California' }]}
        open={true}
      />,
    )
  }
  test('renders popover with correct content when open', () => {
    renderHelper()

    // Check if language chips are rendered
    sampleLanguages.forEach((language) => {
      const languageChip = screen.getByText(language.name)
      expect(languageChip).toBeInTheDocument()
    })

    // Check if currency chip is rendered
    const currencyChip = screen.getByText('USD')
    expect(currencyChip).toBeInTheDocument()

    // Check if the number of states chip is rendered
    const statesChip = screen.getByText('1')
    expect(statesChip).toBeInTheDocument()

    // Ensure that onClose is not called yet
    expect(onClose).not.toHaveBeenCalled()
  })

  test('calls onClose when popover is closed', async () => {
    renderHelper()

    const backdrop = document.querySelector('.MuiPopover-root .MuiBackdrop-root') as Element

    // Close the popover
    await userEvent.click(backdrop)

    // Ensure that onClose is called
    expect(onClose).toHaveBeenCalled()
  })
})
