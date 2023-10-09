import { gql } from '@apollo/client'

export type TLanguage = {
  name: string
}

export type TState = {
  name: string
}

export type TCountry = {
  country: {
    currency: string
    states: Array<TState>
    languages: Array<TLanguage>
  }
}

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      currency
      states {
        name
      }
      languages {
        name
      }
    }
  }
`

export default GET_COUNTRY
