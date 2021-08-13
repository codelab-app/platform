import { __TypeFragment } from '@codelab/shared/codegen/graphql'
import { ITypeVertex } from '@codelab/shared/graph'
import { typenameToTypeKind } from './typenameToTypeKind'

export const typeFragmentToTypeVertex = (
  typeFragment: __TypeFragment,
): ITypeVertex => ({
  ...(typeFragment as any),
  typeKind: typenameToTypeKind(typeFragment.__typename),
})
