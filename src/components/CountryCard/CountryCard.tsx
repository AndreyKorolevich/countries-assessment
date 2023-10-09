import { useState, MouseEvent, SyntheticEvent } from 'react'
import { CountryCardComponent } from './types'
import CountryFlag from 'react-country-flag'
import { Grid, Typography, CardActionArea, Paper, Rating, Tooltip } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import GET_COUNTRY, { TCountry } from '../../api/query/getCountry.ts'
import Popover from '../Popover/Popover.tsx'
import { FAVORITE_COUNTRIES } from '../../constants.ts'
import ErrorBoundaryFallback from '../ErrorBoundaryFallback/ErrorBoundaryFallback.tsx'

export const CountryCard: CountryCardComponent = ({ name, continent, code, storage }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [favorite, setFavorite] = useState<number | null>(storage[code] || 0)
  const [getCountry, { data, loading, error }] = useLazyQuery<TCountry>(GET_COUNTRY)

  // Handle click event to open popover and fetch additional country data
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

    // Manually trigger the query with the country code
    getCountry({ variables: { code } })
  }

  // Handle close event to close popover
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Handle marking/unmarking a country as favorite
  const handleMarkFaforite = (_: SyntheticEvent<unknown>, newValue: number | null) => {
    setFavorite(newValue)

    // Update the storage with favorite status
    if (code in storage) {
      delete storage[code]
    } else {
      storage[code] = 1
    }

    localStorage.setItem(FAVORITE_COUNTRIES, JSON.stringify(storage))
  }

  // Check if the popover is open
  const open = Boolean(anchorEl)

  return (
    <Grid item xs={6} sm={4} md={4} maxWidth='100%' position='relative' aria-label={'country-card'}>
      <CardActionArea onClick={handleClick} sx={{ borderRadius: '5px' }}>
        <Paper sx={{ cursor: 'pointer', p: 2, textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant='h5'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
            component='div'
          >
            {name}
          </Typography>
          <CountryFlag
            countryCode={code}
            svg
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
          <Typography variant='body2' color='text.secondary'>
            {continent.name}
          </Typography>
        </Paper>
      </CardActionArea>
      <Tooltip title='Mark as favorite' placement='top-start'>
        <Rating
          max={1}
          value={favorite}
          sx={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}
          onChange={handleMarkFaforite}
          aria-label={'rating-label'}
        />
      </Tooltip>
      {!loading && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          languages={data?.country?.languages}
          currency={data?.country?.currency}
          states={data?.country?.states}
        />
      )}
      {error && <ErrorBoundaryFallback />}
    </Grid>
  )
}

export default CountryCard
