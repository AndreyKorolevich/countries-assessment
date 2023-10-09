import { FunctionComponent } from 'react'
import { TLanguage, TState } from '../../api/query/getCountry.ts'

export type TPopover = {
  anchorEl: HTMLButtonElement | null
  onClose: () => void
  languages?: Array<TLanguage>
  currency?: string
  states?: Array<TState>
  open: boolean
}
export type PopoverComponent = FunctionComponent<TPopover>
