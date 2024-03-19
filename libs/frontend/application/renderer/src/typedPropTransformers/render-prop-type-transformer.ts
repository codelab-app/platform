import type {
  IRuntimeModel,
  ITypedPropTransformer,
} from '@codelab/frontend/abstract/application'
import type { IFieldModel, TypedProp } from '@codelab/frontend/abstract/domain'
import { extractTypedPropValue } from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { hasExpression } from '@codelab/shared/utils'
import { ExtendedModel, model } from 'mobx-keystone'
import { v4 } from 'uuid'
import { BaseRenderPipe } from '../renderPipes'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind RenderPropType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <(...args) => ReactNode - A function that renders the component with id: $componentId>
 * }
 */

const matchPropsToFields = (
  fields: Array<IFieldModel> = [],
  props: Array<object>,
): IPropData =>
  props.reduce(
    (acc, val, index) =>
      fields[index]?.key
        ? { ...acc, [fields[index]?.key as string]: val }
        : acc,
    {},
  )

@model('@codelab/RenderPropTypeTransformer')
export class RenderPropTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, key: string, runtimeNode: IRuntimeModel) {
    const { expressionTransformer } = this.renderer
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    if (hasExpression(propValue) && expressionTransformer.initialized) {
      return expressionTransformer.transpileAndEvaluateExpression(propValue)
    }

    const component = this.componentDomainService.components.get(propValue)
    const fields = component?.api.current.fields
    // can't return prop object because it will be passed as React Child, which will throw an error
    const fallback = ''

    if (!component) {
      console.error('Component not found')

      return fallback
    }

    // spread is required to access all args not just the first one
    return (...renderPropArgs: Array<object>) => {
      // match props to fields by order first to first and so on.
      const props = matchPropsToFields(fields, renderPropArgs)

      const runtimeComponent = this.runtimeComponentService.add(
        component,
        runtimeNode,
        [],
        key,
        undefined,
        true,
      )

      runtimeComponent.runtimeProps.setCustomProps(
        Prop.create({
          data: JSON.stringify(props),
          id: v4(),
        }),
      )

      return runtimeComponent.render
    }
  }
}
