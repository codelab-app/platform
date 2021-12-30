import { TypeKind } from '@codelab/shared/abstract/core'
import { pickBy } from 'lodash'
import { RenderProps } from '../../store'

export const getPropsByTypeKind = (props: RenderProps, typeKind: TypeKind) =>
  pickBy(props, (value: RenderProps) => {
    return Boolean(value?.typeKind) && typeKind === value?.typeKind
  })
