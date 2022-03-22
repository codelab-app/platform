import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, pickBy } from 'lodash'
import { RenderContext, RenderPipeFactory } from './types'

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

const handledTypeKinds = new Set<TypeKind>([
  TypeKind.AppType,
  TypeKind.ArrayType,
  TypeKind.EnumType,
  TypeKind.ElementType,
  TypeKind.InterfaceType,
  TypeKind.LambdaType,
  TypeKind.MonacoType,
  TypeKind.PageType,
  TypeKind.PrimitiveType,
])

const isHandledTypeKind = (context: RenderContext) => (prop: PropsData) => {
  const typeId = prop?.type

  if (typeof typeId !== 'string') {
    return false
  }

  const typeKind = context.typesById[typeId]?.typeKind

  return typeKind && handledTypeKinds.has(typeKind)
}

const getPropValue = (prop: PropsData) => prop.value

/** Transforms the {@see handledTypeKinds} from the shape of `field: {type: x, value: y}`, aka {@see TypedValue} to `field: value` */
export const typedPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const typedProps = pickBy(props, isHandledTypeKind(context))
    const transformedProps = mapValues(typedProps, getPropValue)

    return next(element, context, mergeProps(props, transformedProps))
  }
