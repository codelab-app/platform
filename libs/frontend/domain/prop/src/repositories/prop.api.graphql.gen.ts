import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
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

import {
  type CreatePropsMutationVariables,
  type UpdatePropsMutationVariables,
  type DeletePropsMutationVariables,
  type GetPropsQueryVariables,
} from '@codelab/frontend/infra/gql'

export const CreateProps = (
  variables: CreatePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePropsDocument.toString(), variables, next)

export const UpdateProps = (
  variables: UpdatePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePropsDocument.toString(), variables, next)

export const DeleteProps = (
  variables: DeletePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePropsDocument.toString(), variables, next)

export const GetProps = (
  variables: GetPropsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPropsDocument.toString(), variables, next)
