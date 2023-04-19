import type {
  IElement,
  IElementTree,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementTreeRef,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { getTypeService } from '@codelab/frontend/domain/type'
import {
  expressionTransformer,
  replaceStateInProps,
} from '@codelab/frontend/shared/utils'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { mapDeep, mergeProps } from '@codelab/shared/utils'
import isObject from 'lodash/isObject'
import type { Ref } from 'mobx-keystone'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { ITypedValueTransformer } from './abstract/ITypedValueTransformer'
import type { ElementWrapperProps } from './element/ElementWrapper'
import { ElementWrapper } from './element/ElementWrapper'
import { makeCustomTextContainer } from './element/wrapper.utils'
import {
  defaultPipes,
  renderPipeFactory,
} from './renderPipes/renderPipe.factory'
import { typedValueTransformersFactory } from './typedValueTransformers/typedValueTransformersFactory'
import { isTypedValue } from './utils/isTypedValue'

/**
 * Handles the logic of rendering treeElements. Takes in an optional appTree
 *
 * NB! call .init() and wait for it to finish before using .render()
 *
 * Calling .render() renders a single Element (without it's children)
 * This ensures that each render() call can be used for a single isolated observer() - wrapped React Element
 * and it will get re-rendered only if the source Element model is changed
 *
 * The renderPipe and typedValueTransformers replace the previous render pipeline.
 * It's useful to keep them as mobx-keystone models because they can access the context of the state tree
 * which in practice can act as a DI container, so we can get outside data in the render pipeline easily.
 *
 * For example - we use the renderContext from ./renderContext inside the pipes to get the renderer model itself and its tree.
 */

const create = async ({
  elementTree,
  providerTree,
  rendererType,
  setSelectedNode,
}: RendererProps) => {
  /**
   * Use a builder-specific render service that overwrites each onClick handler with a void click handler.
   */
  const builderGlobals = {
    /*
    FIXME: mobx-keystone 1.2.0 requires frozen data to be serializable.
    onClick: (e: React.MouseEvent) => {
      if (!isBuilder) {
        return
      }

      e.stopPropagation()

      const elementId = e.currentTarget.getAttribute(DATA_ELEMENT_ID)

      if (elementId !== null) {
        setSelectedNode?.(elementRef(elementId))
      }
    },
    */
    href: '#',
  }

  await expressionTransformer.init()

  return new Renderer({
    //  appStore: storeRef(appStore),
    elementTree: elementTreeRef(elementTree),
    providerTree: providerTree ? elementTreeRef(providerTree) : null,
    rendererType,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
    /**
     * Will log the render output and render pipe info to the console
     */
    debugMode: prop(false).withSetter(),
    /**
     * The tree that's being rendered, we assume that this is properly constructed
     */
    elementTree: prop<Ref<IElementTree>>(),
    id: idProp,
    /**
     * Store attached to app, needed to access its actions
     */
    providerTree: prop<Nullable<Ref<IElementTree>>>(null),
    /**
     * Different types of renderer requires behaviors in some cases.
     */
    rendererType: prop<RendererType>(),
    /**
     * The render pipe handles and augments the render process. This is a linked list / chain of render pipes
     */
    renderPipe: prop<IRenderPipe>(() => renderPipeFactory(defaultPipes)),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedValueTransformers: prop<Array<ITypedValueTransformer>>(() =>
      typedValueTransformersFactory(),
    ),
  })
  implements IRenderer
{
  renderRoot() {
    const root = this.elementTree.maybeCurrent?.rootElement.current
    const providerRoot = this.providerTree?.current.rootElement.current

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    return providerRoot && root.page?.current.kind === IPageKind.Regular
      ? this.renderElement(providerRoot)
      : this.renderElement(root)
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (element: IElement, extraProps?: IPropData): ReactElement => {
    const wrapperProps: ElementWrapperProps & { key: string } = {
      element,
      extraProps,
      key: `element-wrapper-${element.id}`,
      renderService: this,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   *
   * @param extraProps props passed down from parent components, these have high priority than element.props
   */
  renderIntermediateElement = (
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput> => {
    const component = element.parentComponent?.current
    const componentInstance = component?.instanceElement?.current
    const componentApi = component?.api.maybeCurrent

    let props = mergeProps(
      element.__metadataProps,
      componentApi?.defaultValues,
      component?.props.current.values,
      componentInstance?.props.current.values,
      element.props.current.values,
      extraProps,
    )

    props = this.processPropsForRender(props, element)

    return this.renderPipe.render(element, props)
  }

  getComponentInstanceChildren(element: IElement) {
    const parentComponent = element.parentComponent?.current

    const isContainer =
      element.id === parentComponent?.childrenContainerElement.id

    if (!isContainer || !parentComponent.instanceElement?.current) {
      return []
    }

    return parentComponent.instanceElement.current.children
  }

  getChildPageChildren(element: IElement) {
    const providerTreeRoot = this.providerTree?.current.rootElement.current
    const providerPage = providerTreeRoot?.page?.current
    const pageContentContainer = providerPage?.pageContentContainer?.current
    const pageRoot = this.elementTree.current.rootElement.current
    const pageKind = pageRoot.page?.current.kind

    // 1. check if this is the element in _app page where child page needs to be rendered
    // 2. do not self-wrap _app page, and do not wrap 404 and 500
    if (
      pageContentContainer?.id === element.id &&
      pageKind === IPageKind.Regular
    ) {
      return [this.elementTree.current.rootElement.current]
    }

    return []
  }

  /**
   * Renders the elements children, createTransformer memoizes the function
   */
  renderChildren = createTransformer(
    ({
      extraProps,
      parentOutput,
    }: Parameters<
      IRenderer['renderChildren']
    >[0]): ArrayOrSingle<ReactNode> => {
      const children = [
        ...parentOutput.element.children,
        ...this.getComponentInstanceChildren(parentOutput.element),
        ...this.getChildPageChildren(parentOutput.element),
      ]

      // This will pass down the props from the component instance to the descendants
      const componentInstanceProps = {
        ...parentOutput.element.parentComponent?.current.instanceElement
          ?.current.props.current.values,
        ...extraProps,
      }

      const renderedChildren = children.map((child) =>
        this.renderElement(child, componentInstanceProps),
      )

      const hasChildren = renderedChildren.length > 0

      if (!hasChildren) {
        // Inject text, but only if we have no regular children
        const injectedText = parentOutput.props?.[CUSTOM_TEXT_PROP_KEY]

        const shouldInjectText =
          isAtomInstance(parentOutput.element.renderType) &&
          parentOutput.element.renderType.current.allowCustomTextInjection

        if (shouldInjectText && injectedText) {
          return makeCustomTextContainer(injectedText)
        }

        /*
         * It's important to be undefined if we have no children to display,
         * since void components like input will throw an error if their children prop isn't undefined
         */
        return undefined
      }

      /*
       * If we have only one child, just return it.
       * Ant Design doesn't handle array children well in some cases, like Forms
       */
      if (Array.isArray(children) && children.length === 1) {
        return renderedChildren[0]
      }

      return renderedChildren
    },
  )

  logRendered = (element: IElement, rendered: ArrayOrSingle<IRenderOutput>) => {
    if (this.debugMode) {
      console.dir({ element: element, rendered })
    }
  }

  /**
   * Parses and transforms the props for a given element, so they are ready for rendering
   */
  private processPropsForRender = (props: IPropData, element: IElement) => {
    props = this.applyPropTypeTransformers(props)
    props = element.executePropTransformJs(props)

    // FIXME:
    const context =
      this.rendererType === RendererType.ComponentBuilder
        ? props
        : mergeProps(element.store.state, props)

    props = replaceStateInProps(props, context)

    return props
  }

  /**
   * Applies all the type transformers to the props
   */
  private applyPropTypeTransformers = (props: IPropData) =>
    mapDeep(props, (value) => {
      if (!isTypedValue(value)) {
        return value
      }

      const typeKind = this.getTypeKindById(value.type)

      if (!typeKind) {
        return value
      }

      let preTransformedValue = value

      // This uses the value of the ReactNodeType when selected in a UnionType
      // instead of the value of UnionType
      if (isObject(value.value) && isTypedValue(value.value)) {
        preTransformedValue = value.value
      }

      for (const propTransformer of this.typedValueTransformers) {
        if (
          !propTransformer.canHandleTypeKind(typeKind) ||
          !propTransformer.canHandleValue(preTransformedValue)
        ) {
          continue
        }

        return propTransformer.transform(preTransformedValue, typeKind)
      }

      /*
       * We need to return an empty string here, if the prop cannot be transformed, otherwise
       * the empty object will be passed as React Child, which will throw an error
       */
      if (
        typeKind === ITypeKind.ReactNodeType ||
        typeKind === ITypeKind.RenderPropsType
      ) {
        return ''
      }

      return {}
    })

  private getTypeKindById(typeId: string): ITypeKind | undefined {
    return getTypeService(this).type(typeId)?.kind
  }

  static create = create
}

export const renderServiceRef = rootRef<IRenderer>(
  '@codelab/RenderServiceRef',
  {
    onResolvedValueChange: (ref, newType, oldType) => {
      if (oldType && !newType) {
        detach(ref)
      }
    },
  },
)
