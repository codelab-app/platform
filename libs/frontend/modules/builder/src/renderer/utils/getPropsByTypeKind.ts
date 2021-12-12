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
    const propTypeKind = value?.typeKind

    if (!propTypeKind) {
      return false
    }

    if (propTypeKind === typeKind) {
      return true
    }

    return false
  })
}
