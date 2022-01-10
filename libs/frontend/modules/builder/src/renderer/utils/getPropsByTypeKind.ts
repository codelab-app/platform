import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'

export const getPropsByTypeKind = (props: PropsData, typeKind: TypeKind) =>
  pickBy(props, (value: PropsData) => {
    return Boolean(value?.typeKind) && typeKind === value?.typeKind
  })
