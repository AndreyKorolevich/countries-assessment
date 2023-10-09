import { FunctionComponent } from 'react'
import { TCountryCard } from '../CountryCard/types.ts'

type TCountryList = {
  countries: Array<Omit<TCountryCard, 'storage'>>
  loading: boolean
}
export type CountryListComponent = FunctionComponent<TCountryList>
