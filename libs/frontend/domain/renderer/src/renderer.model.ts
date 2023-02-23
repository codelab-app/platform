import type {
  IElement,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
  IStore,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  IElementTree,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { elementTreeRef } from '@codelab/frontend/domain/element'
import { getPageService } from '@codelab/frontend/domain/page'
import { getActionService, storeRef } from '@codelab/frontend/domain/store'
import { getTypeService } from '@codelab/frontend/domain/type'
import {
  expressionTransformer,
  replaceStateInProps,
} from '@codelab/frontend/shared/utils'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { mapDeep, mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { ITypedValueTransformer } from './abstract/ITypedValueTransformer'
import type { ElementWrapperProps } from './element/ElementWrapper'
import { ElementWrapper } from './element/ElementWrapper'
import {
  extractValidProps,
  getReactComponent,
  makeCustomTextContainer,
} from './element/wrapper.utils'
import {
  defaultPipes,
  renderPipeFactory,
} from './renderPipes/renderPipe.factory'
import { typedValueTransformersFactory } from './typedValueTransformers/typedValueTransformersFactory'
import { isTypedValue } from './utils/isTypedValue'
import { mapOutput } from './utils/renderOutputUtils'

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

const init = async ({
  pageTree,
  appStore,
  appTree,
  rendererType,
  set_selectedNode,
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
        set_selectedNode?.(elementRef(elementId))
      }
    },
    */
    href: '#',
  }

  await expressionTransformer.init()

  return new Renderer({
    appTree: appTree ? elementTreeRef(appTree) : null,
    pageTree: elementTreeRef(pageTree),
    appStore: storeRef(appStore),
    rendererType,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
    id: idProp,

    /**
     * A tree of providers that will get rendered before all of the regular elements
     */
    appTree: prop<Nullable<Ref<IElementTree>>>(null),

    /**
     * Store attached to app, needed to access its actions
     */
    appStore: prop<Ref<IStore>>(),
    /**
     * The tree that's being rendered, we assume that this is properly constructed
     */
    pageTree: prop<Nullable<Ref<IElementTree>>>(null),

    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedValueTransformers: prop<Array<ITypedValueTransformer>>(() =>
      typedValueTransformersFactory(),
    ),

    /**
     * The render pipe handles and augments the render process. This is a linked list / chain of render pipes
     */
    renderPipe: prop<IRenderPipe>(() => renderPipeFactory(defaultPipes)),

    /**
     * Will log the render output and render pipe info to the console
     */
    debugMode: prop(false).withSetter(),

    /**
     * Different types of renderer requires behaviors in some cases.
     */
    rendererType: prop<RendererType>(),
  })
  implements IRenderer
{
  @modelAction
  initForce(
    pageElementTree: IElementTree,
    appElementTree: Nullable<IElementTree>,
  ) {
    this.pageTree = elementTreeRef(pageElementTree)
    this.appTree = appElementTree ? elementTreeRef(appElementTree) : null
  }

  renderRoot() {
    const root = this.pageTree?.current.root

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    const rootElement = this.renderElement(root)
    const pageService = getPageService(this)
    const { kind } = pageService.page(root.baseId) ?? {}

    // do not self-wrap with providers page if the current page is _app
    return kind === IPageKind.Regular
      ? this.renderWithProviders(rootElement)
      : rootElement
  }

  /**
   * Takes the provider tree and wrap it around our root element
   */
  private renderWithProviders(rootElement: ReactElement) {
    const providerRoot = this.appTree?.current.root

    if (!providerRoot) {
      return rootElement
    }

    const pageService = getPageService(this)
    const providerPageId = providerRoot.baseId
    const { pageContainerElement } = pageService.page(providerPageId) ?? {}

    const renderRecursive = (
      element: IElement,
    ): ArrayOrSingle<ReactElement> => {
      const output = this.renderIntermediateElement(element)

      return mapOutput<ReactElement>(output, (renderOutput) => {
        const Component = getReactComponent(renderOutput)
        const props = extractValidProps(Component, renderOutput) ?? {}

        const children = element.children.map((childElement) =>
          renderRecursive(childElement),
        )

        if (element.id === pageContainerElement?.id) {
          children.push(rootElement)
        }

        const injectedText = renderOutput.props?.[CUSTOM_TEXT_PROP_KEY]

        const shouldInjectText =
          !children.length && element.atom?.current.allowCustomTextInjection

        if (shouldInjectText && injectedText) {
          return makeCustomTextContainer(injectedText)
        }

        // jsx from @emotion is a must use here.
        // React.createElement must not be used, because css prop is not supported out of the box by React.
        return jsx(Component, props, children)
      })
    }

    const result = renderRecursive(providerRoot)

    return Array.isArray(result)
      ? React.createElement(React.Fragment, {}, result)
      : result
  }

  runPreAction = (element: IElement) => {
    if (!element.preRenderActionId) {
      return
    }

    const actionService = getActionService(this)
    const action = actionService.action(element.preRenderActionId)

    if (!action) {
      console.warn(`Pre render action not found for element ${element.label}`)

      return () => undefined
    }

    return this.state.values[action.name].run()
  }

  getPostAction = (element: IElement) => {
    if (!element.postRenderActionId) {
      return null
    }

    const actionService = getActionService(this)
    const action = actionService.action(element.postRenderActionId)

    if (!action) {
      console.warn(`Post render action not found for element ${element.label}`)

      return () => undefined
    }

    return this.state.values[action.name].run
  }

  @computed
  get state() {
    return this.appStore.current.state
  }

  /*
  computePropsForComponentElements(element: IElement) {
    const component = (element.renderComponentType ?? element.parentComponent)
      ?.maybeCurrent

    const componentProps = element.parentComponent
      ? component?.props?.values
      : element.props?.values

    if (!component || !componentProps) {
      return
    }


    const props = this.processPropsForRender(
      {
        ...componentProps,
        ...propsForCurrentElement,
        [COMPONENT_INSTANCE_ID]: element.id,
      },
      element,
    )
  }
  */

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (element: IElement, extraProps?: IPropData): ReactElement => {
    this.runPreAction(element)

    const wrapperProps: ElementWrapperProps & { key: string } = {
      key: `element-wrapper-${element.id}`,
      renderService: this,
      element,
      extraProps,
      postAction: this.getPostAction(element),
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
    const component = element.rootElement.parentComponent?.current
    const componentInstance = component?.instanceElement?.current
    const componentApi = component?.api.maybeCurrent

    let props = mergeProps(
      element.__metadataProps,
      componentApi?.defaultValues,
      component?.props?.values,
      componentInstance?.props?.values,
      element.props?.values,
      extraProps,
    )

    props = this.processPropsForRender(props, element)

    return this.renderPipe.render(element, props)
  }

  getComponentInstanceChildren(element: IElement) {
    const parentComponent = element.rootElement.parentComponent?.current

    const isContainer =
      element.id === parentComponent?.childrenContainerElementId

    if (!isContainer || !parentComponent.instanceElement?.current) {
      return []
    }

    return parentComponent.instanceElement.current.children
  }

  /**
   * Renders the elements children, createTransformer memoizes the function
   */
  renderChildren = createTransformer(
    ({ parentOutput }): ArrayOrSingle<ReactNode> => {
      const children = [
        ...parentOutput.element.children,
        ...this.getComponentInstanceChildren(parentOutput.element),
      ]

      const renderedChildren = children.map((child) =>
        this.renderElement(child),
      )

      const hasChildren = Array.isArray(renderedChildren)
        ? renderedChildren.length > 0
        : Boolean(renderedChildren)

      if (!hasChildren) {
        // Inject text, but only if we have no regular children
        const injectedText = parentOutput.props?.[CUSTOM_TEXT_PROP_KEY]

        const shouldInjectText =
          parentOutput.element.atom?.current.allowCustomTextInjection

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

    const context =
      this.rendererType === RendererType.ComponentBuilder
        ? props
        : mergeProps(this.state.values, props)

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

      for (const propTransformer of this.typedValueTransformers) {
        if (
          !propTransformer.canHandleTypeKind(typeKind) ||
          !propTransformer.canHandleValue(value)
        ) {
          continue
        }

        return propTransformer.transform(value, typeKind)
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

  static init = init
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
