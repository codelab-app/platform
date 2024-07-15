import { graphql } from '@codelab/frontend/infra/gql'

export const AtomListDocument = graphql(`
  query GetAtoms($options: AtomOptions, $where: AtomWhere) {
    atoms(options: $options, where: $where) {
      ...Atom
    }
  }
`)
