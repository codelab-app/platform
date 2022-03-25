import { flatMap } from 'lodash'
import { computed } from 'mobx'
import {
  idProp,
  Model,
  modelAction,
  ObjectMap,
  objectMap,
  prop,
  Ref,
} from 'mobx-keystone'

type BaseEdge = { source: string; target: string }
type BaseFragment = { id: string }

type BaseGraphFragment<NodeFragment = BaseFragment, EdgeFragment = BaseEdge> = {
  vertices: Array<NodeFragment>
  edges: Array<EdgeFragment>
}

export abstract class BaseModel<Edge extends BaseEdge = BaseEdge> extends Model(
  {
    id: idProp,
    children: prop(() => Array<Ref<BaseModel>>()),
  },
) {
  @computed
  get childrenList(): Array<BaseModel<Edge>> {
    return this.getChildren().map((x) => x.current)
  }

  abstract hasParent(): boolean

  abstract getChildren(): Array<Ref<BaseModel<Edge>>>

  abstract addChild(child: BaseModel<Edge>): void

  abstract setParent(parent: BaseModel<Edge>): void

  abstract setEdgeInfo(edge: Edge): void
}

/**
 * BaseTree is a mobx node that holds the tree of nodes.
 * It is used as a local observable node for a tree of nodes.
 * It doesn't handle remote data, use nodeNode for that
 */
export abstract class BaseTreeService<
  Node extends BaseModel,
  NodeFragment extends BaseFragment,
  EdgeFragment extends BaseEdge,
  GraphFragment extends BaseGraphFragment<NodeFragment, EdgeFragment>,
> extends Model({}) {
  nodes: ObjectMap<Node> = objectMap()

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

      const children = _e.childrenList as Array<Node>

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

    vertices.map(this.nodeFromFragment).forEach(this.addNode)
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
