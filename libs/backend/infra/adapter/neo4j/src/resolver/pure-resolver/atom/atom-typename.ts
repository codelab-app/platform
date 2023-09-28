import type { Atom } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

export const typename: IFieldResolver<Atom, unknown> = (root) => {
  return 'Atom'
}
