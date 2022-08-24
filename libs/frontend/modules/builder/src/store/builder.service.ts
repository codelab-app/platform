import { getAtomService } from '@codelab/frontend/modules/atom'
import { Element, elementRef } from '@codelab/frontend/modules/element'
import { getTagService, Tag } from '@codelab/frontend/modules/tag'
import {
  BuilderDragData,
  BuilderTab,
  IBuilderService,
  INode,
  isComponent,
  isElement,
  RendererTab,
  TagWithComponents,
} from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { componentTagName } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  findParent,
  Frozen,
  getRefsResolvingTo,
  getSnapshot,
  Model,
  model,
  modelAction,
  modelTypeKey,
  prop,
  Ref,
} from 'mobx-keystone'
import { StateModalService } from './state-modal.service'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTree: prop<RendererTab>(RendererTab.Page).withSetter(),

    _selectedNode: prop<Nullable<Ref<INode>>>(null),
    _hoveredNode: prop<Nullable<Ref<INode>>>(null).withSetter(),

    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    activeBuilderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),
    stateModal: prop(() => new StateModalService({})),

    expandedNodeIds: prop<Array<string>>(() => []).withSetter(),

    // configPaneWidth: prop(0),
  })
  implements IBuilderService
{
  get componentTags() {
    const tagService = getTagService(this)
    const tags = tagService.tags

    const componentUsecaseTag = tags.find(
      (tag) => tag.name === componentTagName,
    )

    if (!componentUsecaseTag) {
      return []
    }

    return (
      componentUsecaseTag.children
        .map((id) => tagService.tag(id))
        // filter empty
        .filter((t) => t)
        // cast as truthy
        .map((tag) => getSnapshot(tag) as Tag)
    )
  }

  get tagsWithComponents() {
    const atomService = getAtomService(this)
    // const componentService = getComponentService(this)

    const components = [
      ...atomService.atoms,
      // ...[...componentService.components.values()],
    ]

    const componentTags = this.componentTags.map((t) => ({
      ...t,
      components: [],
    }))

    components.forEach((component) => {
      const tagNames = component.tags.map((t) => t.current.name)

      const foundComponentusecaseTag = componentTags.find((usecaseTag) =>
        tagNames.includes(usecaseTag.name),
      ) as TagWithComponents | undefined

      if (!foundComponentusecaseTag) {
        return
      }

      foundComponentusecaseTag.components.push(component)
    })

    return componentTags
  }

  @computed
  get selectedNode() {
    return this._selectedNode?.current ?? null
  }

  @computed
  get hoveredNode() {
    return this._hoveredNode?.current ?? null
  }

  @modelAction
  set_selectedNode(node: Nullable<Ref<INode>>) {
    this._selectedNode = node

    if (!node) {
      return
    }

    const findNodesToExpand = (
      selectedNode: INode,
      alreadyExpandedNodeIds: Array<string>,
    ): Array<string> => {
      /**
       * If we delete an element, the whole tree collapses. Instead,
       * we want to show the sibling or parent as selected.
       */
      const pathResult = this.activeElementTree?.getPathFromRoot(selectedNode)
      const expandedSet = new Set(alreadyExpandedNodeIds)

      // go through each node of the path and keep track of all nodes that need to get expanded
      const toExpand = pathResult
        ?.filter((el) => !expandedSet.has(el.id))
        .map((el) => {
          return el.id
        })

      return toExpand ?? []
    }

    this.expandedNodeIds = [
      ...this.expandedNodeIds,
      ...findNodesToExpand(node.current, this.expandedNodeIds),
    ]
  }

  // @modelAction
  // setSelectedTreeNode(node: IBuilderDataNode) {
  //   this._selectedNode = elementRef(node.key.toString())
  //
  //   // If this is the component container
  //   if (node.type === COMPONENT_NODE_TYPE) {
  //     this._selectedNode = componentRef(node.key.toString())
  //   }
  // }

  /**
   * When we select an element within a component tree, we need to know which component we're in. This allows us to find the component and return it
   */
  @computed
  get activeComponent() {
    if (isComponent(this.selectedNode)) {
      return this.selectedNode
    }

    /**
     * If it's an element, we need to check whether this element is part of a Component
     */
    if (isElement(this.selectedNode)) {
      const refs = getRefsResolvingTo(this.selectedNode, elementRef)

      return [...refs.values()].reduce((prev, node) => {
        const component = findParent(node, (parent: any) => {
          return parent?.[modelTypeKey] === '@codelab/Component'
        })

        return component ? component : prev
      }, null)
    }

    return null
  }

  /**
   * Based on which node is selected in the builder tree, we will display a different element tree for the rendered view
   */
  @computed
  get activeElementTree() {
    const selectedNode = this.selectedNode

    /**
     * If we're selecting the component
     */
    if (isComponent(selectedNode)) {
      return selectedNode.elementTree
    }

    /**
     * If we're selecting an element within the component
     */
    if (isElement(selectedNode)) {
      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      return Element.getElementTree(selectedNode)
    }

    return undefined
  }
}
