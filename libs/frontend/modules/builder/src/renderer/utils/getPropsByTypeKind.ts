import { TypeKind } from '@codelab/frontend/abstract/codegen'
import * as _ from 'lodash'

export const getPropsByTypeKind = (
  props: Record<string, any>,
  typeKind: TypeKind,
  typeKindsById: Record<string, TypeKind>,
) => {
  if (!typeKindsById) {
    return {}
  }

  return _.pickBy(props, (value) => {
    const propTypeKind = value?.type
      ? typeKindsById[value?.type]
      : (value?.typeKind as TypeKind)

    if (!propTypeKind) {
      return false
    }

    if (propTypeKind === typeKind) {
      return true
    }

    return false
  })
}
