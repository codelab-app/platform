import { flatMap } from 'lodash'
import { computed } from 'mobx'
import { idProp, Model, modelAction, ObjectMap, prop, Ref } from 'mobx-keystone'

type BaseEdge = { source: string; target: string }
type BaseFragment = { id: string }

type BaseGraphFragment<NodeFragment = BaseFragment, EdgeFragment = BaseEdge> = {
  vertices: Array<NodeFragment>
  edges: Array<EdgeFragment>
}

export abstract class BaseModel<M, Edge> extends Model(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  <M extends object, Edge>() => ({
    id: idProp,
    children: prop<Array<Ref<M>>>(() => []),
  }),
)<M, Edge> {
  @computed
  get childrenList(): Array<M> {
    return this.children.map((x) => x.current)
  }

  abstract hasParent(): boolean

  abstract addChild(child: M): void

  abstract setParent(parent: M): void

  abstract setEdgeInfo(edge: Edge): void
}

/**
 * BaseTree is a mobx node that holds the tree of nodes.
 * It is used as a local observable node for a tree of nodes.
 * It doesn't handle remote data, use nodeNode for that
 */
export abstract class BaseTreeService<
  NodeFragment extends BaseFragment,
  EdgeFragment extends BaseEdge,
  Node extends BaseModel<any, EdgeFragment>,
  GraphFragment extends BaseGraphFragment<NodeFragment, EdgeFragment>,
> extends Model({}) {
  abstract nodes: ObjectMap<Node>

  abstract nodeFromFragment(fragment: BaseFragment): Node

  addChild(parent: Node, child: Node, edge: EdgeFragment) {
    parent.addChild(child)
    child.setParent(parent)
    child.setEdgeInfo(edge)
  }

  @computed
  get nodesList() {
    return [...this.nodes.values()]
  }

  @computed
  get rootNodes() {
    return this.nodesList.filter((x) => !x.hasParent())
  }

  node(id: string) {
    return this.nodes.get(id)
  }

  @modelAction
  addNode(node: Node) {
    this.nodes.set(node.id, node)

    return node
  }

  /**
   * Returns the node with the given id and all of its descendant nodes
   */
  getNodeAndDescendants(id: string): Array<Node> {
    const node = this.node(id)

    if (!node) {
      return []
    }

    const cache = new Set<string>()

    const getDescendants = (_e: Node): Array<Node> => {
      if (cache.has(_e.id)) {
        return []
      }

      cache.add(_e.id)

      const children = _e.childrenList

      return [...children, ...flatMap(children, getDescendants)]
    }

    const descendants = getDescendants(node)

    return [node, ...descendants]
  }

  @modelAction
  removeNodeAndDescendants(node: Node) {
    for (const item of this.getNodeAndDescendants(node.id)) {
      this.nodes.delete(item.id)
    }
  }

  @modelAction
  updateFromFragment({ vertices, edges }: GraphFragment) {
    this.nodes.clear()
    vertices
      .map((fragment) => this.nodeFromFragment(fragment))
      .forEach((x) => this.addNode(x))

    // Attach the children. Sort the edges to match the children order to the db edge order
    edges.forEach((edge) => {
      const source = this.node(edge.source)
      const target = this.node(edge.target)

      if (!source || !target) {
        throw new Error('Can not find source or target node of edge')
      }

      this.addChild(source, target, edge)
    })

    return this
  }
}
