import {
  ElementModel,
  ElementTree,
  elementTreeRef,
} from '@codelab/frontend/modules/element'
import { getTypeStoreFromContext } from '@codelab/frontend/modules/type'
import {
  PropsData,
  PropsDataByElementId,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import {
  deepReplaceObjectValues,
  deepReplaceObjectValuesAndKeys,
  mergeProps,
} from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  Frozen,
  Model,
  model,
  modelFlow,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from './abstract/IRenderPipe'
import { ITypedValueTransformer } from './abstract/ITypedValueTransformer'
import { RenderOutput } from './RenderOutput'
import { rootRenderPipeFactory } from './renderPipes/rootRenderPipeFactory'
import { typedValueTransformersFactory } from './typedValueTransformers/typedValueTransformersFactory'
import { isTypedValue } from './utils/isTypedValue'
import { getTemplateFn } from './utils/platformState'

/**
 * Handles the logic of rendering a tree of models
 *
 * NB! call .init() and wait for it to finish before using .render()
 *
 * Calling .render() renders a single Element (without it's children)
 * This ensures that each render() call can be used for a single isolated observer() - wrapped React Element
 * and it will get re-rendered only if the source Element model is changed
 *
 * The last render results are stored in .renderOutput.
 *
 * The renderPipe and typedValueTransformers replace the previous render pipeline.
 * It's useful to keep them as mobx-keystone models because they can access the context of the state tree
 * which in practice can act as a DI container, so we can get outside data in the render pipeline easily.
 * For example - we use the renderContext from ./renderContext inside the pipes to get the renderer model itself and its tree.
 */
@model('@codelab/RendererModel')
export class RendererModel extends Model({
  /** The tree that's being rendered */
  treeRef: prop<Nullable<Ref<ElementTree>>>(() => null),

  /** Props passed to each element */
  globalProps: prop<Nullish<Frozen<PropsData>>>(() => null),

  /** Those transform different kinds of typed values into render-ready props */
  typedValueTransformers: prop<Array<ITypedValueTransformer>>(
    typedValueTransformersFactory,
  ),

  /** The render pipe handles and augments the render process */
  renderPipe: prop<IRenderPipe>(rootRenderPipeFactory),

  isInitialized: prop(() => false),
}) {
  private platformState: any

  @modelFlow
  init = _async(function* (
    this: RendererModel,
    tree: ElementTree,
    platformState: any, // pass in a observable
  ) {
    if (this.isInitialized) {
      return
    }

    this.treeRef = elementTreeRef(tree)
    this.platformState = platformState

    // Make sure all types are fetched first, because we need
    // them when transforming the rendered props. We could cache
    // the common types in the browser later on
    const typeStore = getTypeStoreFromContext(this)

    if (typeStore?.types.size <= 1) {
      yield* _await(typeStore.getAll())
    }

    this.isInitialized = true
  })

  @computed
  get tree() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.treeRef!.current
  }

  /**
   * Renders a single to a RenderOutput without its children
   */
  renderElement(
    element: ElementModel,
    extraProps?: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    const { props, descendantBoundProps } = this.getPropsForRender(
      element,
      extraProps,
    )

    return this.renderPipe.render(element, props, {
      ...extraElementProps,
      ...descendantBoundProps,
    })
  }

  /**
   * Parses and transforms the props for a given element, so they are ready for rendering
   */
  private getPropsForRender(element: ElementModel, extraProps?: PropsData) {
    const baseProps = element.baseProps
    const elementProps = element.props?.propsData ?? {}
    let props = mergeProps(baseProps, elementProps, extraProps)

    props = this.applyPropTransformers(props)

    props = element.executePropTransformJs(props)

    const { descendantBoundProps, selfBoundProps } =
      element.applyPropMapBindings(props)

    props = mergeProps(props, selfBoundProps)
    props = this.replaceStateInProps(props)

    return { props, descendantBoundProps }
  }

  private replaceStateInProps(props: PropsData) {
    if (!this.platformState) {
      return props
    }

    return deepReplaceObjectValuesAndKeys(props, (value, key) => {
      try {
        const keyFn = getTemplateFn(key)

        if (keyFn) {
          key = keyFn(this.platformState)
        }
      } catch (e) {
        console.log("Couldn't parse props template", `${key}`)
      }

      if (typeof value === 'string') {
        try {
          const valueFn = getTemplateFn(value)

          if (valueFn) {
            value = valueFn(this.platformState)

            if (typeof value === 'function') {
              value = value.bind(this.platformState)
            }
          }
        } catch (e) {
          console.log("Couldn't parse props template", `${value}`)
        }
      }

      return { key, value }
    })
  }

  /**
   * Applies all the typed value transformers to the props
   */
  private applyPropTransformers(props: PropsData): PropsData {
    return deepReplaceObjectValues(props, (value, key, innerObj) => {
      if (!isTypedValue(value)) {
        return value
      }

      const typeKind = this.getTypeKindById(value.type)

      if (!typeKind) {
        return value
      }

      for (const propTransformer of this.typedValueTransformers) {
        if (
          !propTransformer.canHandleValue(value) ||
          !propTransformer.canHandleTypeKind(typeKind)
        ) {
          continue
        }

        return propTransformer.transform(value, typeKind)
      }
    })
  }

  private getTypeKindById(typeId: string): TypeKind | undefined {
    return getTypeStoreFromContext(this).type(typeId)?.typeKind
  }
}

export const rendererRef = rootRef<RendererModel>('codelab/RendererRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
