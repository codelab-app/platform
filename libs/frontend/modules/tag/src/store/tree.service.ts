import {
  IGraphQLTagNode,
  ITagTreeNode,
  ITagTreeService,
  TagFragment,
} from '@codelab/shared/abstract/core'
import { DataNode } from 'antd/lib/tree'
import {
  detach,
  getParent,
  idProp,
  Model,
  model,
  ObjectMap,
  objectMap,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

/**
 * Data coming from GraphQL
 */

@model('@codelab/Node')
export class Node
  extends Model({
    id: idProp,
    label: prop<string>(),
    children: prop(() => objectMap<Node>()),
  })
  implements ITagTreeNode
{
  addChildren(node: Node) {
    this.children.set(node.id, node)
  }

  updateCache(tagFragment: TagFragment): void {
    this.label = tagFragment.name
  }
}

export const nodeRef = rootRef<Node>('@codelab/NodeRef', {
  onResolvedValueChange(ref, newNode, oldNode) {
    if (oldNode && !newNode) {
      detach(ref)
    }
  },
})

@model('@codelab/TreeService')
export class TreeService<TNode extends IGraphQLTagNode, TEdge>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TNode extends IGraphQLTagNode,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TEdge,
  >() => ({
    /**
     * The list of nodes must be in order from leaf to root, since we'll need to create the children first for assigning children reference
     */
    roots: prop(() => objectMap<Node>()),
    nodes: prop(() => objectMap<Ref<Node>>()),
  }))<TNode, TEdge>
  implements ITagTreeService
{
  /**
   * Only use this to initialize TreeService class, convert GraphQL data to Tree
   */
  static init<TNode extends IGraphQLTagNode>({
    nodes,
  }: {
    nodes: Array<TNode>
  }) {
    const sortedNode = nodes.sort((a, b) => {
      if (a.children.length > b.children.length) {
        return 1
      } else {
        return -1
      }
    })

    // Create Nodes and connect their children to them and also add roots to `this.roots`
    const treeService = new TreeService({ nodes: objectMap<Ref<Node>>([]) })
    const nodeArray: { [id: string]: Node } = {}
    sortedNode.forEach((tagNode) => {
      const newNode = new Node({ id: tagNode.id, label: tagNode.label })

      treeService.nodes.set(newNode.id, nodeRef(newNode))
      nodeArray[newNode.id] = newNode

      if (tagNode.isRoot) {
        treeService.roots.set(tagNode.id, newNode)
      }

      tagNode.children.forEach((childId) => {
        const childNode = nodeArray[childId]
        const hasParent = getParent(childNode)

        // Prevents from having more than one parent for one node
        if (!hasParent) {
          newNode.addChildren(childNode)
        }
      })
    })

    return treeService
  }

  addNodesFromFragments(data: Array<TagFragment>) {
    data.forEach((tagNode) => {
      const newNode = new Node({
        id: tagNode.id,
        label: tagNode.name,
      })

      this.nodes.set(newNode.id, nodeRef(newNode))

      if (tagNode.isRoot) {
        this.roots.set(tagNode.id, newNode)

        return
      }

      if (!tagNode.parent) {
        return
      }

      const parent = this.nodes.get(tagNode.parent?.id)

      if (!parent?.current) {
        return
      }

      parent.current.addChildren(newNode)
    })
  }

  delete(id: string) {
    const node = this.nodes.get(id)

    if (!node) {
      console.log('delete tag node - not found id:', id)

      return
    }

    const childrenMapOfParent = getParent<ObjectMap<any>>(
      getParent<any>(node.current),
    )

    if (childrenMapOfParent?.$modelType === 'mobx-keystone/ObjectMap') {
      childrenMapOfParent.delete(id)
    }

    this.roots.delete(id)
    this.nodes.delete(id)
  }

  updateNodeFromFragment(tagFragment: TagFragment) {
    const tagId = tagFragment.id

    if (!tagId) {
      console.warn("Updated tag doesn't have id", tagFragment)

      return
    }

    const tagNodeRef = this.nodes.get(tagId)
    const tagNode = tagNodeRef?.current

    if (!tagNode) {
      console.warn('tag id not found')

      return
    }

    tagNode.updateCache(tagFragment)
  }

  // static updateNode()
  // static deleteNode()

  generateTreeDataNodes(): Array<DataNode> {
    const convertNodeToDataNode = (root: Node): DataNode => {
      return {
        key: root.id,
        title: root.label,
        children: [...root.children.values()].map((child) =>
          convertNodeToDataNode(child),
        ),
      }
    }

    return [...this.roots.values()].map((item) => convertNodeToDataNode(item))
  }
}
