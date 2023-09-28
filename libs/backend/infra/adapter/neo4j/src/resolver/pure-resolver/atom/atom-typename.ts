import { Atom } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'

export const typename: IFieldResolver<Atom, unknown> = (root) => {
  return 'Atom'
}
