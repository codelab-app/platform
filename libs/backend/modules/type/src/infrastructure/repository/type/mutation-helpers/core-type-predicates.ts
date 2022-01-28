import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  IArrayType,
  IElementType,
  IMonacoType,
  IPrimitiveType,
  IType,
  SpecificIType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'

//
// Type Predicates for all types
//
export const coreBasePredicates = (type: IType, uid: string) => ({
  uid,
  'dgraph.type': [DgraphEntityType.Type],
  name: type.name,
  typeKind: type.typeKind,
  /** We use owner field to determine policy */
  owner: type.owner ? { uid: type.owner.id } : null,
})

//
// Type Predicates for specific types
//

const coreArrayPredicates = (type: IArrayType) => ({
  itemType: { uid: type.itemType.id },
})

const coreElementPredicates = (type: IElementType) => ({
  elementKind: type.elementKind,
})

const corePrimitivePredicates = (type: IPrimitiveType) => ({
  primitiveKind: type.primitiveKind,
})

const coreMonacoPredicates = (type: IMonacoType) => ({
  language: type.language,
})

//
// TypeKind -> specific predicates function map.
// Add predicate fns for new types here
//
export const coreTypePredicates: CoreTypePredicates = {
  [TypeKind.ArrayType]: coreArrayPredicates,
  [TypeKind.ElementType]: coreElementPredicates,
  [TypeKind.PrimitiveType]: corePrimitivePredicates,
  [TypeKind.MonacoType]: coreMonacoPredicates,
}

//
// Utilities:
//
export type TypePredicateFn<TKind extends TypeKind> = (
  t: SpecificIType<TKind>,
) => Record<string, any>

type CoreTypePredicates = Partial<{
  [TKind in TypeKind]: TypePredicateFn<TKind>
}>

export const getTypeSpecificPredicates = <TType extends IType>(type: TType) => {
  const fn = coreTypePredicates[type.typeKind] as Maybe<
    TypePredicateFn<typeof type.typeKind>
  >

  return fn ? fn(type) : {}
}
