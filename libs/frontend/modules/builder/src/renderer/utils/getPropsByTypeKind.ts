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
    // should have either typekind directly or id as value.type
    const propTypeKind = value?.typekind || typeKindsById[value?.type]

    if (!propTypeKind) {
      return false
    }

    if (propTypeKind === typeKind) {
      return true
    }

    return false
  })
}
