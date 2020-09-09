import { decode } from '@codelab/common'
import { evalPropsWithContext, filterRenderProps, Props } from '@codelab/props'
import { reduce, merge } from 'lodash'
import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  ReactChildren,
} from 'react'
import { nodeC } from '../codec/Node.codec'
import { HasChildren, NodeInterface } from './Node.i'
import { NodeI } from '../codec/Node.codec.i'
import { NodeTypeEnum } from '../codec/Node--type.i'
import { isReactNode } from '../subtypes/react/Node-react--guard'

/**
 * Node is instantiated during Tree traversal
 */
export class Node<P extends Props = {}> implements NodeInterface<P> {
  public Component: FunctionComponent<any> = () => null

  public id: string

  public type: string

  public nodeType: NodeTypeEnum

  // eslint-disable-next-line react/static-property-placement
  public props: P

  public parent?: Node<P>

  public children: Array<Node<P>> = []

  // Use this to prevent circular dep
  public treeDom: any

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeI) {
    const { data } = decode(node, nodeC)
    const { props, nodeType, id } = data

    this.type = isReactNode(data) ? data.type : undefined
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

  public get renderProps() {
    return filterRenderProps(this.props) ?? {}
  }

  get mergedProps() {
    return {
      key: this.key,
      ...this.props,
      ...this.parent.renderProps,
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
