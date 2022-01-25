import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'
import { RenderContext } from '../pipes'

export const getPropsByTypeKind = (
  props: PropsData,
  typeKind: TypeKind,
  context: RenderContext,
) =>
  pickBy(props, (value: PropsData) => {
    const typeId = value?.type

    if (typeof typeId !== 'string') {
      return false
    }

    const kind = context.typesById[typeId]?.typeKind

    return kind && typeKind === kind
  })
