import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import * as _ from 'lodash'
import { RenderPipeFactory } from '../types/RenderTypes'

export const propsWithTypePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const handledTypeKinds = new Set([
      TypeKind.PrimitiveType,
      TypeKind.ArrayType,
      TypeKind.InterfaceType,
      TypeKind.EnumType,
      TypeKind.LambdaType,
      TypeKind.AppType,
      TypeKind.PageType,
      TypeKind.ElementType,
      TypeKind.ComponentType,
      TypeKind.MonacoType,
    ])

    const propsWithType = _.pickBy(props, (value) => {
      const propTypeKind = value?.typeKind

      return handledTypeKinds.has(propTypeKind)
    })

    const transformedProps = _.mapValues(propsWithType, (value) => value.value)

    return next(element, context, mergeProps(props, transformedProps))
  }
