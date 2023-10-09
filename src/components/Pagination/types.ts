import { ChangeEvent, FunctionComponent } from 'react'

type TPagination = {
  onChangePage: (event: ChangeEvent<unknown>, page: number) => void
  page: number
  countriesCount: number
}
export type PaginationComponent = FunctionComponent<TPagination>
