import { gql } from '@apollo/client'

const GET_COUNTRIES = gql`
  query GetCountries($name: String) {
    countries(filter: { name: { regex: $name } }) {
      name
      code
      continent {
        name
      }
    }
  }
`

export default GET_COUNTRIES
