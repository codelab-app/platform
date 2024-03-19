import type {
  ElementWrapperProps,
  IRuntimeComponentModel,
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeElementPropModel,
  IRuntimeModel,
  IRuntimePageModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  getRuntimeComponentService,
  getRuntimeElementService,
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  getComponentDomainService,
  type IElementModel,
  type IElementTreeViewDataNode,
  isAtom,
  isComponent,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { evaluateExpression, hasExpression } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  patchRecorder,
  prop,
} from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { ArrayOrSingle } from 'ts-essentials/dist/types'
import { ElementWrapper } from './element/ElementWrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'
import { RuntimeComponentModel } from './runtime-component.model'

const compositeKey = (element: IElementModel, propKey?: string) => {
  /**
   * sub trees of components may repeat which but they will never have the same root (instanceElement)
   * therefor use it to create a unique key
   */

  let instanceKeyToRoot = ''
  let parentNode = element.closestContainerNode

  while (isComponent(parentNode) && parentNode.instanceElement?.id) {
    instanceKeyToRoot += parentNode.instanceElement.id
    parentNode = parentNode.instanceElement.current.closestContainerNode
  }

  return `runtime.${element.id}${instanceKeyToRoot}${propKey}`
}

const create = (dto: IRuntimeElementDTO) => new RuntimeElementModel(dto)

@model('@codelab/RuntimeElement')
export class RuntimeElementModel
  extends Model({
    closestContainerNode: prop<
      Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
    >(),
    compositeKey: idProp,
    element: prop<Ref<IElementModel>>(),
    postRenderActionDone: prop(false).withSetter(),
    preRenderActionDone: prop(false).withSetter(),
    propKey: prop<Maybe<string>>(),
    runtimeProps: prop<IRuntimeElementPropModel>(),
  })
  implements IRuntimeElementModel
{
  static compositeKey = compositeKey

  static create = create

  @computed
  get childMapperChildren() {
    const childMapperComponent = this.element.current.childMapperComponent

    if (!childMapperComponent) {
      return []
    }

    const props = this.runtimeProps.evaluatedChildMapperProps || []
    const component = childMapperComponent.current
    const childMapperChildren = []

    for (let index = 0; index < props.length; index++) {
      const runtimeComponent = this.runtimeComponentService.add(
        component,
        this,
        [],
        this.propKey,
        index,
      )

      childMapperChildren.push(runtimeComponent)
    }

    const keyStart = RuntimeComponentModel.compositeKey(component, this.propKey)

    const newKeys = childMapperChildren.map(
      (runtimeComponent) => runtimeComponent.compositeKey,
    )

    this.cleanupChildMapperNodes(keyStart, newKeys)

    return childMapperChildren
  }

  @computed
  get children() {
    const container = this.closestContainerNode.current
    const element = this.element.current
    const renderType = element.renderType.current
    const shouldRenderComponent = isComponent(renderType)

    const children: Array<IRuntimeModel> = shouldRenderComponent
      ? [
          // put component as a child instead of instance element children
          this.runtimeComponentService.add(
            renderType,
            this,
            // pass instance element children to be transformed later
            element.children.map((child) => elementRef(child.id)),
            this.propKey,
          ),
        ]
      : element.children.map((child) =>
          this.runtimeElementService.add(child, container, this.propKey),
        )

    /**
     * Attach regular page to runtime element tree
     */

    if (isRuntimePage(container)) {
      const page = container.page.current
      const shouldAttachPage = page.pageContentContainer?.id === this.element.id

      if (container.childPage && shouldAttachPage) {
        children.push(container.childPage)
      }
    }

    /**
     * Attach instance element children to runtime element tree
     */
    const shouldAddInstanceElementChildren =
      isRuntimeComponent(container) &&
      container.component.current.childrenContainerElement.id ===
        this.element.id

    if (shouldAddInstanceElementChildren) {
      const instanceChildren = container.children.map((child) =>
        this.runtimeElementService.add(child.current, container, this.propKey),
      )

      children.push(...instanceChildren)
    }

    const previousSibling = element.childMapperPreviousSibling

    const previousSiblingIndex = children.findIndex((child) => {
      return isRuntimeElement(child) && child.element.id === previousSibling?.id
    })

    // if no previous sibling, previousSiblingIndex will be -1 and we will insert at the beginning
    children.splice(previousSiblingIndex + 1, 0, ...this.childMapperChildren)

    return children
  }

  @computed
  get componentDomainService() {
    return getComponentDomainService(this)
  }

  @computed
  get render(): Nullable<ReactElement> {
    if (this.shouldRender === false) {
      return null
    }

    // Render the element to an intermediate output
    const renderOutput = this.renderer.renderPipe.render(this)
    const children = this.renderChildren

    const wrapperProps: ElementWrapperProps = {
      children,
      element: this.element.current,
      errorBoundary: {
        onError: ({ message, stack }) => {
          this.element.current.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          this.element.current.setRenderingError(null)
        },
      },
      key: this.element.id,
      onRendered: async () => {
        await this.runPostRenderAction()
      },
      renderer: this.renderer,
      renderOutput,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders the elements children
   */
  @computed
  get renderChildren(): ArrayOrSingle<ReactNode> {
    const renderedChildren = compact(this.children.map((child) => child.render))
    const hasNoChildren = this.children.length === 0
    const hasOneChild = this.children.length === 1

    if (hasNoChildren) {
      // Inject children prop or text, but only if we have no regular children
      // (children from props has precedence)
      if (this.runtimeProps.evaluatedProps['children']) {
        return this.runtimeProps.evaluatedProps['children']
      }

      const injectedText =
        this.runtimeProps.evaluatedProps[CUSTOM_TEXT_PROP_KEY] || '""'

      const shouldInjectText =
        isAtom(this.element.current.renderType.current) &&
        this.element.current.renderType.current.allowCustomTextInjection

      if (shouldInjectText) {
        const readOnly = !this.element.current.isTextContentEditable

        return this.renderer.rendererType === RendererType.Preview ||
          this.renderer.rendererType === RendererType.Production
          ? createTextRenderer(injectedText)
          : createTextEditor(injectedText, this.element.id, readOnly)
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
    if (hasOneChild) {
      return renderedChildren[0]
    }

    return renderedChildren
  }

  @computed
  get renderer() {
    const activeRenderer = this.renderService.activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get runtimeStore() {
    return this.closestContainerNode.current.runtimeStore
  }

  @computed
  get shouldRender() {
    const { renderIfExpression } = this.element.current

    if (!renderIfExpression || !hasExpression(renderIfExpression)) {
      return true
    }

    return evaluateExpression(
      renderIfExpression,
      this.runtimeProps.expressionEvaluationContext,
    )
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    // Add assigned ReactNode props as children
    const reactNodesChildren: Array<IElementTreeViewDataNode> = []

    Object.keys(this.runtimeProps.props).forEach((key, index) => {
      const propData = this.runtimeProps.props[key]

      if (
        isTypedProp(propData) &&
        propData.kind === ITypeKind.ReactNodeType &&
        typeof propData.value === 'string'
      ) {
        const component = this.componentDomainService.component(propData.value)

        const runtimeComponentKey = RuntimeComponentModel.compositeKey(
          component,
          key,
        )

        const runtimeComponent =
          this.runtimeComponentService.components.get(runtimeComponentKey)

        const componentRootElement = runtimeComponent?.runtimeRootElement

        if (componentRootElement) {
          reactNodesChildren.push({
            ...componentRootElement.treeViewNode,
            children: [],
            isChildMapperComponentInstance: true,
            key: `${propData.value}${index}`,
            primaryTitle: `${key}:`,
            selectable: false,
          })
        }
      }
    })

    const children = [
      ...this.children.map((child) => child.treeViewNode),
      ...reactNodesChildren,
    ]

    return {
      children,
      key: this.element.id,
      node: this.element.current,
      primaryTitle: this.element.current.treeTitle.primary,
      rootKey: this.element.current.closestSubTreeRootElement.id,
      secondaryTitle: this.element.current.treeTitle.secondary,
      title: `${this.element.current.treeTitle.primary} (${this.element.current.treeTitle.secondary})`,
    }
  }

  /**
   * Used for cleaning up old child mapper nodes when the new evaluated prop has changed
   * e.g. when child mapper element depends on a filtered data
   * @param validNodes new evaluated child mapper prop
   */
  @modelAction
  cleanupChildMapperNodes(keyStart: string, newKeys: Array<string>) {
    this.runtimeComponentService.componentsList.forEach((runtimeComponent) => {
      if (
        runtimeComponent.compositeKey.startsWith(keyStart) &&
        !newKeys.includes(runtimeComponent.compositeKey)
      ) {
        this.runtimeComponentService.delete(runtimeComponent)
      }
    })
  }

  onAttachedToRootStore() {
    const recorder = patchRecorder(this, {
      filter: (patches, inversePatches) => {
        // record when patches are setting 'element'
        return patches.some((patch) => patch.path.includes('element'))
      },
      onPatches: (patches, inversePatches) => {
        detach(this)
      },
      recording: true,
    })

    return () => recorder.dispose()
  }

  runPostRenderAction = () => {
    if (this.postRenderActionDone) {
      return
    }

    const { postRenderAction } = this.element.current
    const currentPostRenderAction = postRenderAction?.current

    if (currentPostRenderAction) {
      const runner = this.runtimeProps.getActionRunner(
        currentPostRenderAction.name,
      )

      runner()
      this.setPostRenderActionDone(true)
    }
  }

  runPreRenderAction = () => {
    if (this.preRenderActionDone) {
      return
    }

    const { preRenderAction } = this.element.current
    const currentPreRenderAction = preRenderAction?.current

    if (currentPreRenderAction) {
      const runner = this.runtimeProps.getActionRunner(
        preRenderAction.current.name,
      )

      runner()
      this.setPreRenderActionDone(true)
    }
  }

  @computed
  private get renderService() {
    return getRendererService(this)
  }
}
