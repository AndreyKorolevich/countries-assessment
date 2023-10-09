import { CountryListComponent } from './types'
import CountryCard from '../CountryCard/CountryCard.tsx'
import { Grid, Skeleton } from '@mui/material'
import { FAVORITE_COUNTRIES, PLACEHOLDER_CARD_COUNT } from '../../constants.ts'

export const CountryList: CountryListComponent = ({ countries, loading }) => {
  // Retrieve favorite countries from local storage
  const storage = JSON.parse(localStorage.getItem(FAVORITE_COUNTRIES) as string) || {}

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {loading
        ? // Display skeleton cards while data is loading
          Array(PLACEHOLDER_CARD_COUNT)
            .fill(0)
            .map((_, index) => (
              <Grid item xs={6} sm={4} md={4} maxWidth='100%' key={index}>
                <Skeleton
                  animation='wave'
                  variant='rectangular'
                  width='100%'
                  height={125}
                  style={{ borderRadius: '5px' }}
                  aria-label={'skeleton-card'}
                />
              </Grid>
            ))
        : countries.map((country) => <CountryCard {...country} key={country.code} storage={storage} />)}
    </Grid>
  )
}

export default CountryList
