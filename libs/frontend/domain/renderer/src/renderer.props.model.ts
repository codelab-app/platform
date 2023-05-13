import type {
  IElement,
  IPropData,
  IRendererProps,
  ITypedPropTransformer,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import { replaceStateInProps } from '@codelab/frontend/shared/utils'
import { mapDeep, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { Model, model, prop } from 'mobx-keystone'
import { typedPropTransformersFactory } from './typedPropTransformers'
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

const create = ({
  elementId,
  extraProps,
}: {
  elementId: string
  extraProps: IPropData
}) =>
  new RendererProps({
    element: elementRef(elementId),
    extraProps,
  })

@model('@codelab/RendererProps')
export class RendererProps
  extends Model({
    element: prop<Ref<IElement>>(),
    /**
     * Extra props that comes from upper components
     */
    extraProps: prop<IPropData>(),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
  })
  implements IRendererProps
{
  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get props() {
    return this.element.current.props.current.values
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

      const typeKind = this.typeService.type(value.type)?.kind

      if (!typeKind) {
        return value
      }

      const transformer = this.typedPropTransformers.get(typeKind)

      if (transformer) {
        return transformer.transform(value, this.element.current)
      }

      return value
    })
  }

  /**
   * Parses and transforms the props for a given element, so they are ready for rendering
   */
  @computed
  get renderedProps() {
    const props = mergeProps(
      this.element.current.__metadataProps,
      this.renderedTypedProps,
      this.extraProps,
    )

    return props
  }

  @computed
  get evaluatedProps() {
    return replaceStateInProps(
      this.renderedProps,
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
