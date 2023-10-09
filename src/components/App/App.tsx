import { AppComponent } from './types.ts'
import Header from '../Header/Header.tsx'
import CountryList from '../CountryList/CountryList.tsx'
import { useLazyQuery } from '@apollo/client'
import { ChangeEvent, useEffect, useState } from 'react'
import GET_COUNTRIES from '../../api/query/getContries.ts'
import { Container, debounce } from '@mui/material'
import Pagination from '../Pagination/Pagination.tsx'
import { PAGE_SIZE } from '../../constants.ts'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '../ErrorBoundaryFallback/ErrorBoundaryFallback.tsx'

const App: AppComponent = () => {
  // useQuery hook to fetch countries based on the search input
  const [page, setPage] = useState(1)
  const [getCountries, { data, loading, error }] = useLazyQuery(GET_COUNTRIES)

  useEffect(() => {
    getCountries({ variables: { name: '' } })
  }, [])

  // Debounce the input change to avoid frequent refetching
  const handleInputChange = debounce((countryName: string) => {
    // If a country name is provided, refetch the data with the new name
    getCountries({ variables: { name: countryName.trim() || '' } })

    // Reset to the first page when the search input changes
    setPage(1)
  }, 300)

  const onChangePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  // Calculate the range of countries to display based on the current page
  const startIndex = (page - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const countriesToDisplay = data?.countries?.slice(startIndex, endIndex)

  return (
    <Container maxWidth='xl' sx={{ position: 'relative', pb: 12 }}>
      {error && <ErrorBoundaryFallback />}
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <Header updateSearchInput={handleInputChange} />
        <CountryList countries={countriesToDisplay} loading={loading || !data} />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          countriesCount={data?.countries?.length || 0}
        />
      </ErrorBoundary>
    </Container>
  )
}

export default App
