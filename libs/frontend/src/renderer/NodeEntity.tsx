import { VertexType } from '@prisma/client'
import { reduce } from 'lodash'
import { pipe } from 'ramda'
import React, { ReactElement, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NodeA, NodeI } from '../../../modules/graph/src/core/domain/node/Node'
import {
  propsFactoryEval,
  propsFactoryReact,
  propsFilterRenderProps,
  propsMapGetter,
  propsRemoveSingle,
} from '@codelab/alpha/core/props'
import {
  HasChildren,
  NodeCreate,
  NodeType,
} from '@codelab/alpha/shared/interface/node'
import { Props } from '@codelab/alpha/shared/interface/props'

/**
 * Node is instantiated during Tree traversal
 */
export class NodeEntity implements NodeI {
  public Component: ReactElement<any> = React.createElement('')

  public id: string

  public type: VertexType

  public parent?: NodeEntity

  public children: Array<NodeA> = []

  public props: Props

  /**
   * The class Node & the codec Node should be kept separate. Node is the container for behavior, while codec Node holds the shape of the data
   */
  public data: NodeI

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeI) {
    const { props, type, id } = node

    if (type === undefined || type === null || !(type in VertexType)) {
      throw new Error(`${type} is not a valid Node type`)
    }

    this.data = node
    this.type = type
    this.props = (props ?? {}) as Props
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

  public addChild(child: NodeEntity) {
    this.children.push(child)
    child.addParent(this)
  }

  public removeChild(child: NodeA) {
    const indexOfChild = this.children.indexOf(child)

    this.children.splice(indexOfChild, 1)
  }

  public move(newParentNode: NodeEntity) {
    if (this.parent !== undefined) {
      this.parent.removeChild(this)
      newParentNode.addChild(this)
    }
  }

  public getRoot(node: NodeEntity = this): NodeI {
    return node.parent === undefined ? node : this.getRoot(node.parent)
  }

  public addParent(parent: NodeEntity) {
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
    const children = reduce<NodeEntity, Array<ReactNode>>(
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
