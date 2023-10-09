import { FunctionComponent } from 'react'

export type TStorage =  {
  [code: string]: number | null
}

export type TCountryCard = {
  name: string
  continent: {
    name: string
  }
  code: string
  storage: TStorage
}
export type CountryCardComponent = FunctionComponent<TCountryCard>
