import { PopoverComponent } from './types'

import { Popover as MUPopover, Typography, Stack, Chip } from '@mui/material'

export const Popover: PopoverComponent = ({ anchorEl, onClose, languages, currency, states, open }) => {
  return (
    <MUPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{
        '.MuiPopover-paper': {
          p: 2,
        },
      }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Stack direction='row' spacing={1}>
        <Typography sx={{ p: 1 }} fontWeight='bold'>
          Language{languages?.length && languages.length > 1 ? 's' : ''}:
        </Typography>
        {languages?.length ? (
          <Stack direction='row' spacing={1} alignItems='center' overflow='auto'>
            {languages.map((language) => (
              <Chip key={language.name} label={language.name} color='success' variant='outlined' />
            ))}
          </Stack>
        ) : (
          <Typography sx={{ p: 1 }} color='gray'>
            None
          </Typography>
        )}
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography sx={{ p: 1 }} fontWeight='bold'>
          Currency:
        </Typography>
        {currency ? (
          <Chip label={currency} color='primary' variant='outlined' sx={{ ml: 1 }} />
        ) : (
          <Typography sx={{ p: 1 }} color='gray'>
            None
          </Typography>
        )}
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography sx={{ p: 1 }} fontWeight='bold'>
          Number of States:{' '}
        </Typography>
        {states?.length ? (
          <Chip label={states.length} variant='outlined' sx={{ ml: 1 }} />
        ) : (
          <Typography sx={{ p: 1 }} color='gray'>
            0
          </Typography>
        )}
      </Stack>
    </MUPopover>
  )
}

export default Popover
