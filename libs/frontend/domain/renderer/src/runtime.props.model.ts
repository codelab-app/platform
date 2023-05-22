import type { IElement, IRuntimeProp } from '@codelab/frontend/abstract/core'
import { DATA_ELEMENT_ID, elementRef } from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import { replaceStateInProps } from '@codelab/frontend/shared/utils'
import { mapDeep, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './renderPipes/render-pipe.base'
import { isTypedProp } from './utils'

/**
 * The pipeline is as follow
 *
 * element.props ->
 *         customTransformedProps ->
 *               renderedTypedProps ->
 *                        renderedProps ->
 *                                evaluatedProps
 */

const create = ({ elementId }: { elementId: string }) =>
  new RuntimeProps({ element: elementRef(elementId) })

@model('@codelab/RuntimeProps')
export class RuntimeProps
  extends ExtendedModel(BaseRenderPipe, {
    element: prop<Ref<IElement>>(),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
  })
  implements IRuntimeProp
{
  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get props() {
    return {
      ...this.element.current.props.current.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.element.current.id,
      key: this.element.current.id,
    }
  }

  /**
   * Executes the prop transformation function
   * If successful, merges the result with the original props and returns it
   * If failed, returns the original props
   */
  @computed
  get customTransformedProps() {
    const transformFn = this.element.current.transformPropsFn

    if (!transformFn) {
      return this.props
    }

    const result = attempt(transformFn, this.props)

    if (isError(result)) {
      console.warn('Unable to transform props', result)

      return this.props
    }

    return mergeProps(this.props, result)
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.customTransformedProps, (value) => {
      if (!isTypedProp(value)) {
        return value
      }

      if (!value.value) {
        return undefined
      }

      const typeKind = this.typeService.type(value.type)?.kind

      if (!typeKind) {
        return value
      }

      const transformer = this.renderer.typedPropTransformers.get(typeKind)

      if (!transformer) {
        return value
      }

      return transformer.transform(value, this.element.current)
    })
  }

  @computed
  get evaluatedProps() {
    return replaceStateInProps(
      this.renderedTypedProps,
      this.element.current.store.current.state,
    )
  }

  static create = create
}

/**
 * Use for getting the actual value if the prop data is a UnionType
 * @param value the prop data
 * @returns the actual typed value if prop is a UnionType
const preTransformPropTypeValue = (value: IPropData) => {
  if (isTypedProp(value) && isObject(value.value) && isTypedProp(value.value)) {
    return value.value
  }
  return value
}
*/
