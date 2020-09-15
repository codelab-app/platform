import { reduce } from 'lodash'
import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { filterRenderProps } from '@codelab/core/props'
import { decode } from '@codelab/shared/common'
import {
  HasChildren,
  NodeDtoA,
  NodeDtoI,
  NodeInterface,
  NodeTypeEnum,
} from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

/**
 * Node is instantiated during Tree traversal
 */
export class Node implements NodeInterface, HasChildren<Node>, NodeDtoA {
  public Component: FunctionComponent<any> = () => null

  public id: string

  public type: NodeTypeEnum

  public parent?: Node

  public children: Array<Node> = []

  // eslint-disable-next-line react/static-property-placement
  public props: Props

  /**
   * The class Node & the codec Node should be kept separate. Node is the container for behavior, while codec Node holds the shape of the data
   */
  public data: NodeDtoI

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeDtoI) {
    const { props, id, type } = node

    if (
      !type ||
      !(Object.values(NodeTypeEnum) ?? []).includes(type as NodeTypeEnum)
    ) {
      throw new Error(`${type} is not a valid Node type`)
    }

    this.data = node
    this.type = type as NodeTypeEnum
    this.props = props ?? {}
    this.id = id ?? uuidv4()
  }

  get key(): React.Key {
    return (this.props.key as React.Key) ?? this.id
  }

  public addChild(child: Node) {
    this.children.push(child)
    child.addParent(this)
  }

  public addParent(parent: Node) {
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
    const children = reduce<Node, Array<ReactNode>>(
      this.children,
      (Components: Array<ReactNode>, child: Node) => {
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
