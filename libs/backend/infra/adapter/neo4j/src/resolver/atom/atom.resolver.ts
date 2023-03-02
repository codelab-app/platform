import type {
  Atom,
  GetAtomsQueryVariables,
} from '@codelab/shared/abstract/codegen'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import { Repository } from '../../infra'
import { atomSelectionSet, tagSelectionSet } from '../../selectionSet'
import { atoms } from './field/atoms'

export const atomResolver: IResolvers = {
  Mutation: {},
  Query: {
    atoms,
  },
}
