import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './atom.api.graphql.api.gen'
import {
  AtomList,
  CreateAtoms,
  DeleteAtoms,
  UpdateAtoms,
} from './atom.api.graphql.web.gen'

export const atomApi = () => getSdk(graphqlClient)

export const atomServerActions = {
  AtomList,
  CreateAtoms,
  DeleteAtoms,
  UpdateAtoms,
}
