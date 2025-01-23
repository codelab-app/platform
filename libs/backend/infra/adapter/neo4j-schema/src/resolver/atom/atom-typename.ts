import type { Atom } from '@codelab/shared/infra/gqlgen'
import type { IFieldResolver } from '@graphql-tools/utils'

export const typename: IFieldResolver<Atom, unknown> = (root) => {
  return 'Atom'
}
