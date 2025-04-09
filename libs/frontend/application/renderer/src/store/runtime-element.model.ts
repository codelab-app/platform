import type {
  ElementWrapperProps,
  IElementTreeViewDataNode,
  IElementTreeViewDataNodePreview,
  IRuntimeComponentModel,
  IRuntimeElementDto,
  IRuntimeElementModel,
  IRuntimeElementPropModel,
  IRuntimeElementStyleModel,
  IRuntimeModel,
  IRuntimePageModel,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref, SnapshotInOf } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'

import {
  getRendererService,
  getRuntimeComponentService,
  getRuntimeElementService,
  IRuntimeNodeType,
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import {
  getComponentDomainService,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import { evaluateExpression, hasExpression } from '@codelab/shared-infra-eval'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  patchRecorder,
  prop,
} from 'mobx-keystone'
import { createElement, type ReactElement, type ReactNode } from 'react'
import { difference, filter, isTruthy } from 'remeda'

import { ElementWrapper } from '../components'

const compositeKey = (
  element: IElementModel,
  container: IRuntimeComponentModel | IRuntimePageModel,
  propKey = '',
) => {
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

  return `${container.compositeKey}.${element.id}${instanceKeyToRoot}${propKey}`
}

const getPropertiesFromLocalStorage = (key: string) => {
  const storedItem = localStorage.getItem(key)

  const storedSnapshot: SnapshotInOf<IRuntimeElementModel> = storedItem
    ? JSON.parse(storedItem)
    : null

  return storedSnapshot
}

const create = (dto: IRuntimeElementDto) => {
  const properties = getPropertiesFromLocalStorage(dto.compositeKey)

  return new RuntimeElementModel({ ...dto, ...properties })
}

/**
 * In cases of `childMapper`, the `runtimeElement's` renderType matters. If `component` type, then these children are not rendered nor passed to component to render
 */
@model('@codelab/RuntimeElement')
export class RuntimeElementModel
  extends Model({
    closestContainerNode: prop<
      Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
    >(),
    compositeKey: idProp,
    element: prop<Ref<IElementModel>>(),
    expanded: prop<boolean>(true),
    lastChildMapperChildrenKeys: prop<Array<string>>(() => []),
    parentElementKey: prop<Nullable<string>>(null),
    postRenderActionsDone: prop(false).withSetter(),
    preRenderActionsDone: prop(false).withSetter(),
    propKey: prop<Maybe<string>>(),
    runtimeProps: prop<IRuntimeElementPropModel>(),
    style: prop<IRuntimeElementStyleModel>(),
  })
  implements IRuntimeElementModel
{
  static compositeKey = compositeKey

  static create = create

  @computed
  get childMapperChildren() {
    const childMapperComponent = this.element.current.childMapperComponent

    // when renderType is component we don't create child mapper
    if (
      isComponent(this.element.current.renderType.current) ||
      !childMapperComponent
    ) {
      return []
    }

    const props = this.runtimeProps.evaluatedChildMapperProps || []
    const component = childMapperComponent.current
    const childMapperChildren = []

    for (let index = 0; index < props.length; index++) {
      const runtimeComponent = this.runtimeComponentService.add(
        component,
        this,
        this.propKey,
        index,
      )

      childMapperChildren.push(runtimeComponent)
    }

    const newKeys = childMapperChildren.map((child) => child.compositeKey)

    this.cleanupChildMapperNodes(newKeys)

    return childMapperChildren
  }

  @computed
  get children() {
    const container = this.closestContainerNode.current
    const element = this.element.current

    const children: Array<IRuntimeModel> = this.component
      ? [
          // put component as a child instead of instance element children
          this.runtimeComponentService.add(this.component, this, this.propKey),
        ]
      : element.children.map((child) =>
          this.runtimeElementService.add(child, container, this, this.propKey),
        )

    /**
     * Attach regular page to runtime element tree
     */

    if (isRuntimePage(container)) {
      const page = container.page.current
      const shouldAttachPage = page.pageContentContainer?.id === this.element.id

      if (container.childPage?.current && shouldAttachPage) {
        children.push(container.childPage.current)
      }
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
  get closestElement(): IRuntimeElementModel {
    return this.parentElement || this
  }

  @computed
  get component() {
    return isComponent(this.element.current.renderType.current)
      ? this.element.current.renderType.current
      : undefined
  }

  @computed
  get componentDomainService() {
    return getComponentDomainService(this)
  }

  @computed
  get descendantElements() {
    return this.children
      .flatMap((child) =>
        isRuntimeElement(child) ? child.descendantElements : child.elements,
      )
      .concat(this.children.filter((child) => isRuntimeElement(child)))
  }

  @computed
  get mainTreeElement(): IRuntimeElementModel {
    const treeRoot = this.renderer.runtimeContainerNode
    const closestContainerNode = this.closestContainerNode.current

    // element belongs to main tree
    if (treeRoot?.compositeKey === closestContainerNode.compositeKey) {
      return this
    }

    if (!closestContainerNode.mainTreeElement) {
      throw new Error('Unable to find element that belongs to main tree')
    }

    return closestContainerNode.mainTreeElement
  }

  @computed
  get parentElement() {
    return this.parentElementKey
      ? this.runtimeElementService.elements.get(this.parentElementKey)
      : undefined
  }

  @computed
  get pathFromRoot(): Array<IRuntimeElementModel> {
    return this.parentElement
      ? [...this.parentElement.pathFromRoot, this]
      : [this]
  }

  @computed
  get render(): Nullable<ReactElement<unknown>> {
    if (this.shouldRender === false) {
      return null
    }

    // Render the element to an intermediate output
    const renderOutput = this.renderer.renderPipe.render(this)

    const wrapperProps: ElementWrapperProps = {
      errorBoundary: {
        onError: ({ message, stack }) => {
          this.element.current.setRenderingError({ message, stack })
        },
        onReset: ({ reason }) => {
          if (reason === 'keys') {
            this.element.current.setRenderingError(null)
          }
        },
      },
      key: this.compositeKey,
      onRendered: async () => {
        await this.runPostRenderActions()
      },
      renderer: this.renderer,
      renderOutput,
      runtimeElement: this,
    }

    return createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders the elements children
   */
  @computed
  get renderChildren(): ArrayOrSingle<ReactNode> {
    const rendered = filter(
      this.children.map((child) => child.render),
      isTruthy,
    )

    if (!rendered.length) {
      return undefined
    }

    /*
     * If we have only one child, just return it.
     * Ant Design doesn't handle array children well in some cases, like Forms
     */
    return rendered.length === 1 ? rendered[0] : rendered
  }

  @computed
  get renderService() {
    return getRendererService(this)
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
      this.runtimeProps.runtimeContext,
    )
  }

  @computed
  get toJson() {
    return {
      closestContainerNode: this.closestContainerNode,
      compositeKey: this.compositeKey,
      element: this.element,
      expanded: this.expanded,
      parentElementKey: this.parentElementKey,
      propKey: this.propKey,
      runtimeProps: this.runtimeProps,
      style: this.style,
    }
  }

  /**
   * Don't access this unless it's for constructing the tree, this will cause components to re-render
   */
  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    const element = this.element.current
    const primaryTitle = element.treeTitle.primary

    const componentMeta = this.component
      ? `instance of ${this.component.name}`
      : undefined

    const atomMeta = element.atomName ? element.atomName : undefined

    const secondaryTitle =
      componentMeta ?? atomMeta ?? element.treeTitle.secondary

    const errorMessage = element.renderingMetadata?.error
      ? `Error: ${element.renderingMetadata.error.message}`
      : element.ancestorError
      ? 'Something went wrong in a parent element'
      : element.propsHaveErrors
      ? 'Some props are not correctly set'
      : undefined

    const children = this.children.flatMap((child) =>
      // if element is instance of component we render the element's children instead of component
      isRuntimeComponent(child) && !child.isChildMapperComponentInstance
        ? child.children.map(
            // if element is instance of component we render the element's children instead of component
            (instanceChild) => instanceChild.treeViewNode,
          )
        : [child.treeViewNode],
    )

    return {
      ...this.treeViewNodePreview,
      atomMeta,
      children,
      componentMeta,
      errorMessage,
      primaryTitle,
      rootKey: this.closestContainerNode.current.compositeKey,
      secondaryTitle,
      title: `${primaryTitle} (${secondaryTitle})`,
      type: IRuntimeNodeType.Element,
    }
  }

  /**
   * Create a separate version for common usage, this removes `children` property to help with re-rendering issues
   */
  @computed
  get treeViewNodePreview(): IElementTreeViewDataNodePreview {
    return {
      element: { id: this.element.current.id },
      key: this.compositeKey,
    }
  }

  /**
   * Used for cleaning up old child mapper nodes when the new evaluated prop has changed
   * e.g. when child mapper element depends on a filtered data
   * @param validNodes new evaluated child mapper prop
   */
  @modelAction
  cleanupChildMapperNodes(newKeys: Array<string>) {
    const toRemove = difference(this.lastChildMapperChildrenKeys, newKeys)

    toRemove.forEach((key) => {
      const component = this.runtimeComponentService.maybeRuntimeComponent(key)

      component?.detach()
    })

    this.lastChildMapperChildrenKeys = newKeys
  }

  @modelAction
  detach(): void {
    this.children.forEach((child) => {
      child.detach()
    })
    this.runtimeElementService.remove(this)
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

    return () => {
      recorder.dispose()
    }
  }

  @modelAction
  runPostRenderActions() {
    if (this.postRenderActionsDone) {
      return
    }

    const { postRenderActions } = this.element.current
    const actions = postRenderActions?.map((action) => action.current)

    actions?.forEach((action) => this.runRenderAction(action))

    this.setPostRenderActionsDone(true)
  }

  @modelAction
  runPreRenderActions() {
    if (this.preRenderActionsDone) {
      return
    }

    const { preRenderActions } = this.element.current
    const actions = preRenderActions?.map((action) => action.current)

    actions?.forEach((action) => this.runRenderAction(action))

    this.setPreRenderActionsDone(true)
  }

  @modelAction
  setExpanded(expanded: boolean) {
    this.expanded = expanded
    localStorage.setItem(this.compositeKey, JSON.stringify({ expanded }))
  }

  @modelAction
  private runRenderAction(action: IActionModel) {
    const runner = this.runtimeProps.getActionRunner(action.name)

    runner()
  }
}
