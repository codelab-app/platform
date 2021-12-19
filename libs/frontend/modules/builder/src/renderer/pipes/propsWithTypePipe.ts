import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, pickBy } from 'lodash'
import { RenderPipeFactory } from './types'

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

export const propsWithTypePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const propsWithType = pickBy(props, (value) =>
      handledTypeKinds.includes(value?.typeKind),
    )

    const transformedProps = mapValues(propsWithType, (value) => value.value)

    return next(element, context, mergeProps(props, transformedProps))
  }
