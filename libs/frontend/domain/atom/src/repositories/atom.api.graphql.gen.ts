import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { AtomFragmentDoc } from '@codelab/frontend/infra/gql'

export const CreateAtomsDocument = graphql(`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      atoms {
        id
      }
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`)

export const DeleteAtomsDocument = graphql(`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const AtomListDocument = graphql(`
  query AtomList($where: AtomWhere, $options: AtomOptions) {
    aggregate: atomsAggregate(where: $where) {
      count
    }
    items: atoms(options: $options, where: $where) {
      ...Atom
    }
  }
`)

export const GetSelectAtomOptionsDocument = graphql(`
  query GetSelectAtomOptions {
    atoms {
      __typename
      id
      name
      requiredParents {
        id
        type
      }
      type
    }
  }
`)

export const UpdateAtomsDocument = graphql(`
  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
    updateAtoms(update: $update, where: $where) {
      atoms {
        id
      }
    }
  }
`)
import {
  type CreateAtomsMutationVariables,
  type DeleteAtomsMutationVariables,
  type AtomListQueryVariables,
  type GetSelectAtomOptionsQueryVariables,
  type UpdateAtomsMutationVariables,
} from '@codelab/frontend/infra/gql'

const CreateAtoms = (
  variables: CreateAtomsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAtomsDocument, variables, next)

const DeleteAtoms = (
  variables: DeleteAtomsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAtomsDocument, variables, next)

const AtomList = (
  variables: AtomListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(AtomListDocument, variables, next)

const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetSelectAtomOptionsDocument, variables, next)

const UpdateAtoms = (
  variables: UpdateAtomsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAtomsDocument, variables, next)

export const getSdk = () => ({
  CreateAtoms,
  DeleteAtoms,
  AtomList,
  GetSelectAtomOptions,
  UpdateAtoms,
})
