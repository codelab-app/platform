import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { pickBy } from 'lodash'
import { RenderProps } from '../../store'

export const getPropsByTypeKind = (props: RenderProps, typeKind: TypeKind) => {
  return pickBy(props, (value: RenderProps) => {
    const { typeKind: propTypeKind } = value

    return Boolean(propTypeKind) && typeKind === propTypeKind
  })
}
