import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { AtomFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateAtomsDocument = graphql(`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      atoms {
        __typename
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
  mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
    deleteAtoms(where: $where, delete: $delete) {
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
        __typename
        id
      }
    }
  }
`)
