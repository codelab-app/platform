import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { PropData } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, pickBy } from 'lodash'
import { RenderPipeFactory } from './types'

/**
 * Transforms props with the following format
 *
 *     {
 *        [$propName]: {
 *          typeKind: $typeKind,
 *          value: $value,
 *        },
 *     }
 *
 *     into :
 *
 *     {
 *        [$propName] : $value
 *     }
 */

const handledTypeKinds = [
  TypeKind.AppType,
  TypeKind.ArrayType,
  TypeKind.ComponentType,
  TypeKind.EnumType,
  TypeKind.ElementType,
  TypeKind.InterfaceType,
  TypeKind.LambdaType,
  TypeKind.MonacoType,
  TypeKind.PageType,
  TypeKind.PrimitiveType,
]

const isHandledTypeKind = (prop: PropData) => {
  return handledTypeKinds.includes(prop?.typeKind)
}

const getPropValue = (prop: PropData) => prop.value

export const typedPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const typedProps = pickBy(props, isHandledTypeKind)
    const transformedProps = mapValues(typedProps, getPropValue)

    return next(element, context, mergeProps(props, transformedProps))
  }
