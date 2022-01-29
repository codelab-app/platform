import { IType, PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'

export const getPropsByTypeKind = (
  props: PropsData,
  typeKind: TypeKind,
  typesById: Record<string, IType>,
) =>
  pickBy(props, (value: PropsData) => {
    const typeId = value?.type

    if (typeof typeId !== 'string') {
      return false
    }

    const kind = typesById[typeId]?.typeKind

    return kind && typeKind === kind
  })
