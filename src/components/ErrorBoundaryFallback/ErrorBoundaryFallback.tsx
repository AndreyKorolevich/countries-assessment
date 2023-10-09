import { useState } from 'react'
import { ErrorBoundaryFallbackComponent } from './types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export const ErrorBoundaryFallback: ErrorBoundaryFallbackComponent = () => {
  const [isOpen, setIsOpen] = useState(true)

  const confirmAction = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={confirmAction}>
      <DialogTitle
        id='alert-dialog-title'
        sx={{ backgroundColor: '#d32f2f', color: '#f8f8f2', display: 'flex', alignItems: 'center' }}
      >
        Error!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Sorry for this inconvenience, but some unknown error has occurred.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={confirmAction}
          autoFocus
          disableElevation
          color={'error'}
          sx={{ color: '#f8f8f2' }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorBoundaryFallback
