import { decode } from '@codelab/shared/common'
import { filterRenderProps } from '@codelab/entity/props'
import { reduce } from 'lodash'
import React, { FunctionComponent, ReactNode, ReactElement } from 'react'
import { Props } from '@codelab/shared/interface/props'
import {
  HasChildren,
  NodeInterface,
  NodeI,
  NodeTypeEnum,
  isReactNode,
} from '@codelab/shared/interface/node'
import { nodeC } from '../codec/node.codec'

/**
 * Node is instantiated during Tree traversal
 */
export class Node<P extends Props = {}>
  implements NodeInterface<P>, HasChildren<P> {
  public Component: FunctionComponent<any> = () => null

  public id: string

  public type: string

  public nodeType: NodeTypeEnum

  // eslint-disable-next-line react/static-property-placement
  public props: P

  public parent?: Node<P>

  public children: Array<Node<P>> = []

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeI) {
    const { data } = decode(node, nodeC)
    const { props, nodeType, id } = data

    this.type = isReactNode(data) ? data.type : ''
    this.nodeType = NodeTypeEnum[nodeType]
    this.props = props
    this.id = id
  }

  get key(): React.Key {
    return (this.props.key as React.Key) ?? this.id
  }

  public addChild(child: Node<P>) {
    this.children.push(child)
    child.addParent(this)
  }

  public addParent(parent: Node<P>) {
    this.parent = parent
  }

  static hasChildren<TreeNode extends HasChildren<TreeNode>>(node: TreeNode) {
    return !!node.children?.length
  }

  /**
   * Check children assigned from json structure
   */
  public hasChildren() {
    return !!this.children.length
  }

  public get leafRenderProps() {
    return filterRenderProps(this.parent?.props, 'leaf') ?? {}
  }

  public get parentRenderProps() {
    return filterRenderProps(this.parent?.props, 'single') ?? {}
  }

  get mergedProps() {
    this.props = { ...this.props, ...this.leafRenderProps }

    return {
      key: this.key,
      ...this.props,
      ...this.parentRenderProps,
    }
  }

  render(
    Component: any,
    props: Props,
    children: ReactNode,
    hasRootChildren: boolean,
  ): ReactElement {
    return this.hasChildren() || hasRootChildren ? (
      <Component {...props}>{children}</Component>
    ) : (
      <Component {...props} />
    )
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
   */
  public Children(rootChildren: ReactNode): ReactNode | Array<ReactNode> {
    const children = reduce<Node<P>, Array<ReactNode>>(
      this.children,
      (Components: Array<ReactNode>, child: Node<P>) => {
        const { Component: Child, mergedProps } = child

        // console.debug(`${this.type} -> ${child.type}`, props)

        let ChildComponent: ReactNode = rootChildren ? (
          <Child {...mergedProps}>{rootChildren}</Child>
        ) : (
          <Child {...mergedProps} />
        )

        if (child.hasChildren()) {
          ChildComponent = (
            <Child {...mergedProps}>{child.Children(rootChildren)}</Child>
          )
        }

        return [...Components, ChildComponent]
      },
      [],
    )

    return React.Children.count(children) === 1 ? children[0] : children
  }
}
