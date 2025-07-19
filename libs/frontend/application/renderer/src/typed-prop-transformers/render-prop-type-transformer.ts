import type { IFieldModel, TypedProp } from '@codelab/frontend-abstract-domain'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'

import {
  type IRuntimePageNode,
  isRuntimeElement,
  type ITypedPropTransformer,
} from '@codelab/frontend-abstract-application'
import { extractTypedPropValue } from '@codelab/frontend-abstract-domain'
import { Prop } from '@codelab/frontend-domain-prop/store'
import { hasExpression } from '@codelab/shared-infra-eval'
import { ExtendedModel, model } from 'mobx-keystone'
import { v4 } from 'uuid'

import { BaseRenderPipe } from '../render-pipes'

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
  props: Array<ObjectLike>,
): IPropData =>
  props.reduce(
    (acc, val, index) =>
      fields[index]?.key ? { ...acc, [fields[index].key as string]: val } : acc,
    {},
  )

@model('@codelab/RenderPropTypeTransformer')
export class RenderPropTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(
    prop: TypedProp,
    key: string,
    runtimeNode: IRuntimePageNode,
  ) {
    const { expressionTransformer } = this.rendererService
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    if (hasExpression(propValue)) {
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
    return (...renderPropArgs: Array<ObjectLike>) => {
      // match props to fields by order first to first and so on.
      const props = matchPropsToFields(fields, renderPropArgs)

      const runtimeParent = isRuntimeElement(runtimeNode)
        ? runtimeNode
        : undefined

      const runtimeComponent = this.runtimeComponentService.add(
        component,
        runtimeParent,
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

      runtimeComponent.render()

      return runtimeComponent.rendered
    }
  }
}
