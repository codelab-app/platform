import { reduce } from 'lodash'
import { pipe } from 'ramda'
import React, { ReactElement, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  propsFactoryEval,
  propsFactoryReact,
  propsFilterRenderProps,
  propsMapGetter,
  propsRemoveSingle,
} from '@codelab/alpha/core/props'
import {
  HasChildren,
  Node,
  NodeCreate,
  NodeType,
} from '@codelab/alpha/shared/interface/node'
import { Props } from '@codelab/alpha/shared/interface/props'

/**
 * Node is instantiated during Tree traversal
 */
export class NodeEntity<T extends NodeType = NodeType, P extends Props = any>
  implements Node<T, P> {
  public Component: ReactElement<any> = React.createElement('')

  public id: string

  public type: T

  public parent?: Node<T, P>

  public children: Array<Node<T, P>> = []

  // eslint-disable-next-line react/static-property-placement
  public props: P

  /**
   * The class Node & the codec Node should be kept separate. Node is the container for behavior, while codec Node holds the shape of the data
   */
  public data: NodeCreate<T, P>

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeCreate<T, P>) {
    const { props, id, type } = node

    if (type === undefined || type === null || !(type in NodeType)) {
      throw new Error(`${type} is not a valid Node type`)
    }

    this.data = node
    this.type = type
    this.props = (props ?? {}) as P
    this.id = id ?? uuidv4()
  }

  /**
   * Props that has been transformed, ready to bind to component.
   *
   * @param renderProps
   */
  evalProps(renderProps: Props = {}): Props {
    return pipe(
      propsFactoryEval(renderProps),
      propsFactoryReact,
      propsMapGetter,
    )(this.props)
  }

  /**
   * Build up the renderProps that will be passed on to the children.
   *
   * @param oldRenderProps
   */
  nextRenderProps(oldRenderProps: Props = {}): Props {
    return pipe(
      propsFilterRenderProps,
      propsRemoveSingle,
      propsFactoryEval(oldRenderProps),
    )({
      ...oldRenderProps,
      ...this.props,
    })
  }

  get key(): React.Key {
    return (this.props.key as React.Key) ?? this.id
  }

  public addChild(child: Node<T, P>) {
    this.children.push(child)
    child.addParent(this)
  }

  public removeChild(child: Node<T, P>) {
    const indexOfChild = this.children.indexOf(child)

    this.children.splice(indexOfChild, 1)
  }

  public move(newParentNode: Node<T, P>) {
    if (this.parent !== undefined) {
      this.parent.removeChild(this)
      newParentNode.addChild(this)
    }
  }

  public getRoot(node: Node<T, P> = this): Node {
    return node.parent === undefined ? node : this.getRoot(node.parent)
  }

  public addParent(parent: Node<T, P>) {
    this.parent = parent
  }

  static hasChildren<N extends HasChildren<N>>(node: N) {
    return !!node.children?.length
  }

  /**
   * Check children assigned from json structure
   */
  public hasChildren() {
    return !!this.children.length
  }

  /**
   * For current node/component, build a React tree comprising of current parent & all children.
   *
   * Allow recursive building of React tree from the bottom up.
   *
   * Children passed from root tree component
   *
   * const Component = Tree.render(data)
   *
   * ```
   * <Component>{jsxChildren}</Component>
   * ```
   *
   * @param rootChildren Children passed programatically from root tree component.
   * @param renderProps Props passed with `__type` intact.
   * @constructor
   */
  public Children(
    rootChildren: ReactNode,
    oldRenderProps: Props = {},
  ): ReactNode | Array<ReactNode> {
    /**
     * Handle case where no children exists, since reduce block won't fire
     */
    if (rootChildren && !this.hasChildren()) {
      return rootChildren
    }

    // If have children
    const children = reduce<NodeEntity<T, P>, Array<ReactNode>>(
      this.children as Array<any>,
      (Components: Array<ReactNode>, child: NodeEntity) => {
        const { Component: Child, key } = child

        let ChildComponent: ReactNode = rootChildren
          ? React.cloneElement(
              Child,
              { key, ...child.evalProps(oldRenderProps) },
              rootChildren,
            )
          : React.cloneElement(Child, {
              key,
              ...child.evalProps(oldRenderProps),
            })

        if (child.hasChildren()) {
          ChildComponent = React.cloneElement(
            Child,
            { key, ...child.evalProps(oldRenderProps) },
            child.Children(rootChildren, child.nextRenderProps(oldRenderProps)),
          )
        }

        return [...Components, ChildComponent]
      },
      [],
    )

    return React.Children.count(children) === 1 ? children[0] : children
  }
}
