import { TypeBaseFragment } from '@codelab/frontend/modules/type'
import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'

export const getPropsByTypeKind = (
  props: PropsData,
  typeKind: TypeKind,
  typesById: Record<string, TypeBaseFragment>,
) =>
  pickBy(props, (value: PropsData) => {
    const typeId = value?.type

    if (typeof typeId !== 'string') {
      return false
    }

    const kind = typesById[typeId]?.typeKind

    return kind && typeKind === kind
  })
