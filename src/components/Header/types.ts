import { FunctionComponent } from 'react'

type THeaderProps = {
  updateSearchInput: (countryName: string) => void
}
export type HeaderComponent = FunctionComponent<THeaderProps>
