import { reduce } from 'lodash'
import { pipe } from 'ramda'
import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  propsFactoryEval,
  propsFactoryReact,
  propsFilterRenderProps,
  propsMapGetter,
  propsRemoveSingle,
} from '@codelab/core/props'
import {
  HasChildren,
  Node,
  NodeCreate,
  NodeTypeLiteral,
  nodeTypeLiterals,
} from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

/**
 * Node is instantiated during Tree traversal
 */
export class NodeEntity<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = any
> implements Node<T, P> {
  public Component: FunctionComponent<any> = () => null

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

    if (!type || !nodeTypeLiterals.includes(type)) {
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
    // console.log('renderProps', propsMapGetter(renderProps))
    // console.log('current', this.props)

    const props = pipe(
      propsFactoryEval(renderProps),
      propsFactoryReact,
      propsMapGetter,
    )(this.props)

    // console.log('evaled', props)

    return props
  }

  /**
   * Build up the renderProps that will be passed on to the children.
   *
   * @param oldRenderProps
   */
  nextRenderProps(oldRenderProps: Props = {}): Props {
    const props = pipe(
      propsFilterRenderProps,
      propsRemoveSingle,
      propsFactoryEval(oldRenderProps),
    )({
      ...oldRenderProps,
      ...this.props,
    })

    // console.log('nextRenderProps', props)

    return props
  }

  get key(): React.Key {
    return (this.props.key as React.Key) ?? this.id
  }

  public addChild(child: Node<T, P>) {
    this.children.push(child)
    child.addParent(this)
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
   *
   * @param rootChildren Children passed programatically from root tree component.
   * @param renderProps Props passed with `__type` intact.
   * @constructor
   */
  public Children(
    rootChildren: ReactNode,
    oldRenderProps: Props = {},
  ): ReactNode | Array<ReactNode> {
    const children = reduce<NodeEntity<T, P>, Array<ReactNode>>(
      this.children as Array<any>,
      (Components: Array<ReactNode>, child: NodeEntity) => {
        const { Component: Child, key } = child

        let ChildComponent: ReactNode = rootChildren ? (
          <Child key={key} {...child.evalProps(oldRenderProps)}>
            {rootChildren}
          </Child>
        ) : (
          <Child key={key} {...child.evalProps(oldRenderProps)} />
        )

        if (child.hasChildren()) {
          ChildComponent = (
            <Child key={key} {...child.evalProps(oldRenderProps)}>
              {child.Children(
                rootChildren,
                child.nextRenderProps(oldRenderProps),
              )}
            </Child>
          )
        }

        return [...Components, ChildComponent]
      },
      [],
    )

    return React.Children.count(children) === 1 ? children[0] : children
  }
}
