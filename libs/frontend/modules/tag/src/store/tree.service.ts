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
export interface INode {
  id: string
  label: string
  children: Array<string>
}

@model('@codelab/Node')
export class Node extends Model({
  id: idProp,
  label: prop<string>(),
  children: prop(() => objectMap<Node>()),
}) {
  addChildren(node: Node) {
    this.children.set(node.id, node)
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
export class TreeService<TNode extends INode, TEdge> extends Model(<
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TNode extends INode,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TEdge,
>() => ({
  /**
   * The list of nodes must be in order from leaf to root, since we'll need to create the children first for assigning children reference
   */
  roots: prop(() => objectMap<Node>()),
  nodes: prop(() => objectMap<Ref<Node>>()),
}))<TNode, TEdge> {
  /**
   * Only use this to initialize TreeService class, convert GraphQL data to Tree
   */
  static init<TNode extends INode & { isRoot: boolean }>({
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

  static generateTreeDataNodes(roots: ObjectMap<Node>): Array<DataNode> {
    const convertNodeToDataNode = (root: Node): DataNode => {
      return {
        key: root.id,
        title: root.label,
        children: [...root.children.values()].map((child) =>
          convertNodeToDataNode(child),
        ),
      }
    }

    return [...roots.values()].map((item) => convertNodeToDataNode(item))
  }
}
