import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  getComponentDomainService,
  IElementTreeViewDataNode,
  isAtom,
} from '@codelab/frontend/abstract/domain'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, prop } from 'mobx-keystone'

interface ITreeNode {
  _element: Ref<IElementModel>
  treeViewNode: IElementTreeViewDataNode
}

/**
 * We model the tree UI as a node. This is an attempt to separate view info from element.model
 */
@model('@codelab/TreeNode')
export class TreeNode
  extends Model({
    _element: prop<Ref<IElementModel>>(),
  })
  implements ITreeNode
{
  @computed
  get element() {
    return this._element.current
  }

  @computed
  get treeTitle() {
    return {
      primary: this.element.label,
      secondary:
        this.element.renderType.maybeCurrent?.name ||
        (isAtom(this.element.renderType.current)
          ? compoundCaseToTitleCase(this.element.renderType.current.type)
          : undefined),
    }
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    const extraChildren: Array<IElementModel> = []

    // Creates the tree node n times for the component based on the child mapper prop
    if (
      this.element.childMapperComponent?.id &&
      this.element.childMapperPropKey &&
      this.element.runtimeProp?.evaluatedChildMapperProps.length
    ) {
      const keys = [
        ...Array(
          this.element.runtimeProp.evaluatedChildMapperProps.length,
        ).keys(),
      ]

      keys.forEach((i) => {
        const clonedComponent =
          this.componentDomainService.clonedComponents.get(
            `${this.element.id}-${i}`,
          )

        if (clonedComponent) {
          extraChildren.push(clonedComponent.rootElement.current)
        }
      })
    }

    // Add assigned ReactNode props as children
    const reactNodesChildren: Array<IElementTreeViewDataNode> = []

    Object.keys(this.element.props.values).forEach((key, index) => {
      const propData = this.element.props.values[key]

      const component = this.componentDomainService.components.get(
        propData.value,
      )?.rootElement.current

      if (propData.kind === ITypeKind.ReactNodeType && component) {
        reactNodesChildren.push({
          ...component.treeViewNode,
          children: [],
          isChildMapperComponentInstance: true,
          key: `${propData.value}${index}`,
          primaryTitle: `${key}:`,
          selectable: false,
        })
      }
    })

    const childMapperRenderIndex =
      this.element.children.findIndex(
        (child) => child.id === this.element.childMapperPreviousSibling?.id,
      ) + 1

    const children = [
      ...this.element.children.map((child) => child.treeViewNode),
    ]

    children.splice(
      childMapperRenderIndex,
      0,
      ...extraChildren.map((child) => ({
        ...child.treeViewNode,
        children: [],
        isChildMapperComponentInstance: true,
      })),
      ...reactNodesChildren,
    )

    return {
      children,
      key: this.element.id,
      node: this.element,
      primaryTitle: this.treeTitle.primary,
      rootKey: this.element.closestSubTreeRootElement.id,
      secondaryTitle: this.treeTitle.secondary,
      title: `${this.treeTitle.primary} (${this.treeTitle.secondary})`,
    }
  }

  @computed
  private get componentDomainService() {
    return getComponentDomainService(this)
  }
}
