import {
  Element,
  ElementTree,
  elementTreeRef,
} from '@codelab/frontend/modules/element'
import { getTypeServiceFromContext } from '@codelab/frontend/modules/type'
import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
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
  getSnapshot,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import React, { ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from './abstract/IRenderPipe'
import { ITypedValueTransformer } from './abstract/ITypedValueTransformer'
import { RenderOutput } from './abstract/RenderOutput'
import { ElementWrapper, ElementWrapperProps } from './ElementWrapper'
import { ExtraElementProps } from './ExtraElementProps'
import { rootRenderPipeFactory } from './renderPipes/rootRenderPipeFactory'
import { typedValueTransformersFactory } from './typedValueTransformers/typedValueTransformersFactory'
import { isTypedValue } from './utils/isTypedValue'
import { getTemplateFn } from './utils/platformState'
import { mapOutput } from './utils/renderOutputUtils'

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
@model('@codelab/RenderService')
export class RenderService extends Model({
  /** The tree that's being rendered */
  treeRef: prop<Nullable<Ref<ElementTree>>>(() => null),

  /** A tree of providers that will get rendered before all of the regular elements */
  providerTreeRef: prop<Nullable<Ref<ElementTree>>>(() => null),

  /** Props passed to specific elements */
  extraElementProps: prop(() => new ExtraElementProps({})),

  /** Props passed to specific elements, mapped by the element id */
  extraElementProps: prop(() => objectMap<Frozen<PropsData>>()),

  /** Those transform different kinds of typed values into render-ready props */
  typedValueTransformers: prop<Array<ITypedValueTransformer>>(
    typedValueTransformersFactory,
  ),

  /** The render pipe handles and augments the render process */
  renderPipe: prop<IRenderPipe>(rootRenderPipeFactory),

  isInitialized: prop(() => false),

  /** Will log the render output and render pipe info to the console */
  debugMode: prop(() => false).withSetter(),
}) {
  private platformState: any

  @modelFlow
  init = _async(function* (
    this: RenderService,
    tree: ElementTree,
    providerTree?: ElementTree,
    platformState?: any, // pass in any observable
  ) {
    this.treeRef = elementTreeRef(tree)
    this.providerTreeRef = providerTree ? elementTreeRef(providerTree) : null
    this.platformState = platformState

    if (this.isInitialized) {
      return
    }

    // Make sure all types are fetched first, because we need
    // them when transforming the rendered props. We could cache
    // the common types in the browser later on
    const typeStore = getTypeServiceFromContext(this)

    if (typeStore?.types.size <= 1) {
      yield* _await(typeStore.getAll())
    }

    this.isInitialized = true
  })

  /**
   * Like init, but skips the type fetching
   * Useful if you're sure that all types are already fetched
   * or for unit testing
   */
  @modelAction
  initForce(
    tree: ElementTree,
    platformState?: any, // pass in a observable
  ) {
    this.treeRef = elementTreeRef(tree)
    this.platformState = platformState
    this.isInitialized = true
  }

  @computed
  get tree() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.treeRef!.current
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement(element: Element): ReactElement {
    const wrapperProps: ElementWrapperProps & { key: string } = {
      key: `element-wrapper-${element.id}`,
      renderService: this,
      element,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   * createTransformer memoizes the result in an observer-friendly cache
   */
  renderElementIntermediate = createTransformer(
    (element: Element): ArrayOrSingle<RenderOutput> => {
      const { props, descendantBoundProps } = this.getPropsForRender(element)

      this.extraElementProps.addAll(descendantBoundProps)

      const extraProps = this.extraElementProps.elementPropMap.get(element.id)

      const renderOutput = this.renderPipe.render(
        element,
        mergeProps(props, extraProps),
      )

      return mapOutput(renderOutput, (output) => ({
        ...output,
        descendantPropBindings: descendantBoundProps,
      }))
    },
  )

  /** Renders the elements children */
  renderChildren = createTransformer((parentOutput: RenderOutput): any => {
    const element = this.tree.element(parentOutput.elementId)

    if (!element) {
      console.warn(
        `RenderService: Element ${parentOutput.elementId} not found in tree`,
      )

      return undefined
    }

    const children: ReactNode = element.childrenList?.map((child) =>
      this.renderElement(child),
    )

    const hasChildren = Array.isArray(children)
      ? children.length > 0
      : !!children

    if (!hasChildren) {
      // It's important to be undefined if we have no children to display,
      // since void components like input will throw an error if their children prop isn't undefined
      return undefined
    }

    // If we have only one child, just return it.
    // Ant Design doesn't handle array children well in some cases, like Forms
    if (Array.isArray(children) && children.length === 1) {
      const innerChild = children[0]

      // Do it again, because we could have nested arrays because of mapOutput
      if (Array.isArray(innerChild) && innerChild.length === 1) {
        return innerChild[0]
      }

      return innerChild
    }

    return children
  })

  logRendered(element: Element, rendered: ArrayOrSingle<RenderOutput>) {
    if (this.debugMode) {
      console.dir({ element: getSnapshot(element), rendered })
    }
  }

  /**
   * Parses and transforms the props for a given element, so they are ready for rendering
   */
  private getPropsForRender(element: Element) {
    let props = mergeProps(element.baseProps, element.props.propsData)

    const { descendantBoundProps, selfBoundProps } =
      element.applyPropMapBindings(props)

    props = mergeProps(props, selfBoundProps)
    props = this.applyTypedValuedTransformers(props)
    props = element.executePropTransformJs(props)
    props = this.replaceStateInProps(props)

    return { props, descendantBoundProps }
  }

  // Proof of concept implementation of state replacement
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
  private applyTypedValuedTransformers(props: PropsData): PropsData {
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
          !propTransformer.canHandleTypeKind(typeKind) ||
          !propTransformer.canHandleValue(value)
        ) {
          continue
        }

        return propTransformer.transform(value, typeKind)
      }
    })
  }

  private getTypeKindById(typeId: string): TypeKind | undefined {
    return getTypeServiceFromContext(this).type(typeId)?.typeKind
  }
}

export const renderServiceRef = rootRef<RenderService>(
  'codelab/RenderServiceRef',
  {
    onResolvedValueChange(ref, newType, oldType) {
      if (oldType && !newType) {
        detach(ref)
      }
    },
  },
)
