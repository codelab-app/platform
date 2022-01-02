import { TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'
import { RenderPipeProps } from '../../store'

export const getPropsByTypeKind = (
  props: RenderPipeProps,
  typeKind: TypeKind,
) =>
  pickBy(props, (value: RenderPipeProps) => {
    return Boolean(value?.typeKind) && typeKind === value?.typeKind
  })
