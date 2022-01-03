import { PropData, TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'

export const getPropsByTypeKind = (props: PropData, typeKind: TypeKind) =>
  pickBy(props, (value: PropData) => {
    return Boolean(value?.typeKind) && typeKind === value?.typeKind
  })
