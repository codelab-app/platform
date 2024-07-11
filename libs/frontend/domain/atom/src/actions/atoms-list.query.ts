import { graphql } from '@codelab/frontend/infra/gql'

export const GetAtomsListQuery = graphql(`
  query GetAtoms($options: AtomOptions, $where: AtomWhere) {
    atoms(options: $options, where: $where) {
      ...Atom
    }
  }
`)
