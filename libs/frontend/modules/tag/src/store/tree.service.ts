import {
  detach,
  getSnapshot,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

interface RelationshipInput {
  id: string
  props: Record<string, any>
}

/**
 * Data coming from GraphQL
 */
export interface INode {
  id: string
  label: string
  children: Array<string>
  // edge: RelationshipInput
}

@model('codelab/Node')
export class Node extends Model({
  id: idProp,
  children: prop(() => objectMap<Node>()),
}) {
  addChildren(node: Node) {
    this.children.set(node.id, node)
  }
}

export const nodeRef = rootRef<Node>('NodeRef', {
  onResolvedValueChange(ref, newNode, oldNode) {
    if (oldNode && !newNode) {
      detach(ref)
    }
  },
})

@model('codelab/TreeService')
export class TreeService<TNode extends INode, TEdge> extends Model(<
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TNode extends INode,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TEdge,
>() => ({
  /**
   * The list of nodes must be in order from leaf to root, since we'll need to create the children first for assigning children reference
   */
  nodes: prop(() => objectMap<Ref<Node>>()),
  root: prop<TNode | null>(null),
}))<TNode, TEdge> {
  /**
   * Only use this to initialize TreeService class, convert GraphQL data to Tree
   */
  static init<TNode extends INode>({ nodes }: { nodes: Array<TNode> }) {
    const reversedNodes = nodes.reverse()
    const treeService = new TreeService({ nodes: objectMap<Ref<Node>>([]) })

    reversedNodes.forEach((vertex) => {
      const node = new Node({
        id: vertex.id,
        children: objectMap<any>(
          vertex.children.map((child) => [child, treeService.nodes.get(child)]),
        ),
      })

      treeService.nodes.set(node.id, nodeRef(node))
    })

    return treeService
  }
}
