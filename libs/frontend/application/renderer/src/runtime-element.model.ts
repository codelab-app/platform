import type {
  ElementWrapperProps,
  IRuntimeElementDTO,
  IRuntimeElementPropModel,
  IRuntimePageModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IRuntimeComponentModel,
  IRuntimeElementModel,
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
  RendererType,
  runtimeComponentRef,
  runtimeElementRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  CUSTOM_TEXT_PROP_KEY,
  elementRef,
  IComponentModel,
  IElementModel,
  IElementTreeViewDataNode,
  IPageModel,
  isAtom,
  isComponent,
  isTypedProp,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { IRef, ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { evaluateExpression, hasExpression } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  patchRecorder,
  prop,
} from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { ArrayOrSingle } from 'ts-essentials/dist/types'
import { v4 } from 'uuid'
import { ElementWrapper } from './element/ElementWrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'
import { RuntimeComponentModel } from './runtime-component.model'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'
import { RuntimePageModel } from './runtime-page.model'
import { RuntimeStoreModel } from './runtime-store.model'

const create = (dto: IRuntimeElementDTO) => new RuntimeElementModel(dto)

@model('@codelab/RuntimeElement')
export class RuntimeElementModel
  extends Model({
    _childPage: prop<Maybe<IRuntimePageModel>>(),
    _runtimeComponents: prop<ObjectMap<IRuntimeComponentModel>>(() =>
      objectMap([]),
    ),
    _runtimeElements: prop<ObjectMap<IRuntimeElementModel>>(() =>
      objectMap([]),
    ),
    closestContainerNode: prop<
      Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
    >(),
    element: prop<Ref<IElementModel>>(),
    id: idProp,
    postRenderActionDone: prop(false).withSetter(),
    preRenderActionDone: prop(false).withSetter(),
    runtimeProps: prop<IRuntimeElementPropModel>(),
  })
  implements IRuntimeElementModel
{
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
      const runtimeComponent = this.addComponent(
        component,
        { id: this.id },
        undefined,
        index,
      )

      childMapperChildren.push(runtimeComponent)
    }

    this.cleanupChildMapperNodes(childMapperChildren)

    return childMapperChildren
  }

  @computed
  get children() {
    const runtimeContainer = this.closestContainerNode.current
    const element = this.element.current
    const renderType = element.renderType.current
    const shouldRenderComponent = isComponent(renderType)

    const children: Array<
      IRuntimeComponentModel | IRuntimeElementModel | IRuntimePageModel
    > = shouldRenderComponent
      ? [
          // put component as a child instead of instance element children
          this.addComponent(
            renderType,
            this,
            // pass instance element children to be transformed later
            element.children.map((child) => elementRef(child.id)),
          ),
        ]
      : element.children.map((child) => this.addElement(child))

    /**
     * Attach regular page to runtime element tree
     */
    const shouldAttachPage =
      isRuntimePage(runtimeContainer) &&
      runtimeContainer.childPage &&
      runtimeContainer.page.current.pageContentContainer?.id === this.element.id

    if (shouldAttachPage) {
      const childPage = this.addChildPage(runtimeContainer.childPage!.current)

      children.push(childPage)
    }

    /**
     * Attach instance element children to runtime element tree
     */
    const shouldAddInstanceElementChildren =
      isRuntimeComponent(runtimeContainer) &&
      runtimeContainer.component.current.childrenContainerElement.id ===
        this.element.id

    if (shouldAddInstanceElementChildren) {
      const instanceChildren = runtimeContainer.children.map((child) =>
        this.addElement(child.current),
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
      // Inject text, but only if we have no regular children
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
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get runtimeStore() {
    return this.closestContainerNode.current.runtimeStore
  }

  @modelAction
  addChildPage(page: IPageModel) {
    if (this._childPage) {
      return this._childPage
    }

    this._childPage = RuntimePageModel.create({
      page: pageRef(page.id),
      runtimeParent: runtimeElementRef(this.id),
      runtimeStore: RuntimeStoreModel.create({
        runtimeProviderStore: runtimeStoreRef(this.runtimeStore.id),
        store: storeRef(page.store.id),
      }),
    })

    return this._childPage
  }

  @modelAction
  addComponent(
    component: IComponentModel,
    runtimeParent: IRef,
    children: Array<Ref<IElementModel>> = [],
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel {
    const componentsList = [...this._runtimeComponents.values()]

    const foundComponent = componentsList.find(
      (runtimeComponent) =>
        runtimeComponent.component.id === component.id &&
        isNil(childMapperIndex),
    )

    if (foundComponent) {
      return foundComponent
    }

    const id = v4()

    const runtimeComponent = RuntimeComponentModel.create({
      childMapperIndex,
      children,
      component: componentRef(component.id),
      id,
      isTypedProp,
      runtimeParent: runtimeElementRef(runtimeParent.id),
      runtimeProps: RuntimeComponentPropModel.create({
        runtimeComponent: runtimeComponentRef(id),
      }),
      runtimeStore: RuntimeStoreModel.create({
        store: storeRef(component.store.id),
      }),
    })

    this._runtimeComponents.set(runtimeComponent.id, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  addElement(element: IElementModel): IRuntimeElementModel {
    const elementsList = [...this._runtimeElements.values()]

    const foundElement = elementsList.find(
      (runtimeElement) => runtimeElement.element.id === element.id,
    )

    if (foundElement) {
      return foundElement
    }

    const id = v4()

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: runtimeComponentRef(this.id),
      element: elementRef(element),
      id,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    this._runtimeElements.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }

  /**
   * Used for cleaning up old child mapper nodes when the new evaluated prop has changed
   * e.g. when child mapper element depends on a filtered data
   * @param validNodes new evaluated child mapper prop
   */
  @modelAction
  cleanupChildMapperNodes(validNodes: Array<IRuntimeComponentModel>) {
    const componentLists = [...this._runtimeComponents.values()]

    componentLists.forEach((component) => {
      if (
        !isNil(component.childMapperIndex) &&
        !validNodes.some(
          (validNode) =>
            validNode.childMapperIndex === component.childMapperIndex,
        )
      ) {
        this._runtimeComponents.delete(component.id)
      }
    })
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

      this.postRenderActionDone = true
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

      this.preRenderActionDone = true
    }
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
        const componentRootElement = this.renderService.runtimeContainerNode({
          id: propData.value,
        } as IComponentModel)?.runtimeRootElement

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
      ...this.children.map((child) =>
        isRuntimeContainerNode(child)
          ? {
              ...child.runtimeRootElement.treeViewNode,
              ...(!isNil(child.childMapperIndex) ? { children: [] } : {}),
              isChildMapperComponentInstance:
                !isNil(child.childMapperIndex) &&
                isComponent(child.containerNode.current),
              key: `${child.runtimeRootElement.element.current.id}${
                !isNil(child.childMapperIndex)
                  ? `-${child.childMapperIndex}`
                  : ''
              }`,
              primaryTitle: `${child.runtimeRootElement.element.current.name}${
                !isNil(child.childMapperIndex)
                  ? ` ${child.childMapperIndex}`
                  : ''
              }`,
            }
          : child.treeViewNode,
      ),
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
