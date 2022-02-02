import { AtomType } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'

const atomTypeSchema = `enum AtomType {
    ${Object.values(AtomType).join('\n')}
  }`

export const atomSchema = gql`
  ${atomTypeSchema}

  type Atom {
    id: ID! @id
    type: AtomType!
    name: String!
    # api: InterfaceType  TODO: add atom api after type module
  }
`
