import type {
  ElementWrapperProps,
  IRuntimeComponentModel,
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeElementPropModel,
  IRuntimeElementStyleModel,
  IRuntimeModel,
  IRuntimePageModel,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import {
  getRendererService,
  getRuntimeComponentService,
  getRuntimeElementService,
  IElementTreeViewDataNode,
  IRuntimeNodeType,
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import {
  getComponentDomainService,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import { Nullable } from '@codelab/shared/abstract/types'
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
import { ArrayOrSingle } from 'ts-essentials/dist/types'

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

const create = (dto: IRuntimeElementDTO) => new RuntimeElementModel(dto)

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
    lastChildMapperChildrenKeys: prop<Array<string>>(() => []),
    parentElementKey: prop<Nullable<string>>(null),
    postRenderActionDone: prop(false).withSetter(),
    preRenderActionDone: prop(false).withSetter(),
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
  get render(): Nullable<ReactElement> {
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
        await this.runPostRenderAction()
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
  get treeViewNode(): IElementTreeViewDataNode {
    const children = this.children.flatMap((child) =>
      // if element is instance of component we render the element's children instead of component
      isRuntimeComponent(child) && !child.isChildMapperComponentInstance
        ? child.children.map(
            // if element is instance of component we render the element's children instead of component
            (instanceChild) => instanceChild.treeViewNode,
          )
        : [child.treeViewNode],
    )

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

    return {
      atomMeta,
      children,
      componentMeta,
      element: { id: this.element.current.id },
      errorMessage,
      key: this.compositeKey,
      primaryTitle,
      rootKey: this.closestContainerNode.current.compositeKey,
      secondaryTitle,
      title: `${primaryTitle} (${secondaryTitle})`,
      type: IRuntimeNodeType.Element,
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
    this.runtimeElementService.delete(this)
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
}
