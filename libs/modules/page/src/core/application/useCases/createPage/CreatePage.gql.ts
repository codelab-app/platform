import { gql } from '@apollo/client'
import { PageFragmentsGql } from '../../../domain/Page.fragments.gql'

export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...pageFragments
    }
  }
  ${PageFragmentsGql}
`
