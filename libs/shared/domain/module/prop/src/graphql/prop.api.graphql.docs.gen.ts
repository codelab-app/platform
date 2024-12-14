import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { PropFragmentDoc } from '@codelab/shared/infra/gql'

export const CreatePropsDocument = graphql(`
  mutation CreateProps($input: [PropCreateInput!]!) {
    createProps(input: $input) {
      props {
        id
      }
    }
  }
`)

export const UpdatePropsDocument = graphql(`
  mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
    updateProps(update: $update, where: $where) {
      props {
        id
      }
    }
  }
`)

export const DeletePropsDocument = graphql(`
  mutation DeleteProps($where: PropWhere!) {
    deleteProps(where: $where) {
      nodesDeleted
    }
  }
`)

export const GetPropsDocument = graphql(`
  query GetProps($options: PropOptions, $where: PropWhere) {
    aggregate: propsAggregate(where: $where) {
      count
    }
    items: props(options: $options, where: $where) {
      ...Prop
    }
  }
`)
