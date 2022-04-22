import { DATA_ID } from '@codelab/frontend/abstract/core'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Component, componentRef } from '@codelab/frontend/modules/component'
import {
  IElement,
  IElementDTO,
  IHook,
  IPropData,
  IPropDataByElementId,
} from '@codelab/shared/abstract/core'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps, pascalCaseToWords } from '@codelab/shared/utils'
import { DataNode } from 'antd/lib/tree'
import { attempt, isError } from 'lodash'
import { computed } from 'mobx'
import {
  detach,
  getParent,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
} from 'mobx-keystone'
import { elementRef } from './element.ref'
import { Prop } from './prop.model'
import { PropMapBinding } from './prop-map-binding.model'

type TransformFn = (props: IPropData) => IPropData

/**
 * Creates a new element from a GraphQL fragment object. Doesn't attach any children or parent
 */
export const hydrateElement = ({
  id,
  name,
  css,
  atom,

  component,
  instanceOfComponent,
  parentElement,

  hooks, // TODO Integrate hooks if their usage is not made obsolete by the mobx platform
  propMapBindings,

  props,
  propTransformationJs,
  renderIfPropKey,
  renderForEachPropKey,
  parentElementConnection,
}: Omit<IElementDTO, '__typename'>) =>
  new Element({
    id,
    name,
    css,
    parentId: parentElement?.id,
    atom: atom ? atomRef(atom.id) : null,
    props: props ? Prop.hydrate(props) : null,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    orderInParent: parentElementConnection?.edges?.[0]?.order ?? null,
    component: component ? componentRef(component.id) : null,
    instanceOfComponent: instanceOfComponent
      ? componentRef(instanceOfComponent.id)
      : null,
    propMapBindings: objectMap(
      propMapBindings
        ? propMapBindings.map((b) => [b.id, PropMapBinding.hydrate(b)])
        : [],
    ),
  })

@model('@codelab/Element')
export class Element
  extends Model({
    id: idProp.withSetter(),
    children: prop(() => objectMap<Ref<Element>>()),
    // parent: prop<Nullish<Element>>(null).withSetter(),

    // Data used for tree initializing, before our Element model is ready
    parentId: prop<Nullish<string>>(),

    orderInParent: prop<Nullable<number>>(null).withSetter(),

    name: prop<Nullish<string>>(() => null).withSetter(),
    css: prop<Nullish<string>>(() => null).withSetter(),
    atom: prop<Nullish<Ref<Atom>>>(() => null).withSetter(),
    props: prop<Nullish<Prop>>(() => null),
    propTransformationJs: prop<Nullish<string>>(() => null).withSetter(),
    renderIfPropKey: prop<Nullish<string>>(() => null).withSetter(),
    renderForEachPropKey: prop<Nullish<string>>(() => null).withSetter(),
    propMapBindings: prop(() => objectMap<PropMapBinding>()),

    // component which has this element as rootElement
    component: prop<Nullish<Ref<Component>>>().withSetter(),

    // Marks the element as an instance of a specific component
    instanceOfComponent: prop<Nullish<Ref<Component>>>().withSetter(),
    hooks: prop<Array<IHook>>(() => []),
  })
  implements IElement
{
  @computed
  get childrenSorted(): Array<Element> {
    return [...this.children.values()].map((x) => x.current).sort(compareOrder)
  }

  @modelAction
  addChild(child: Element) {
    this.children.set(child.id, elementRef(child))
  }

  @modelAction
  hasChild(child: Element) {
    return this.children.has(child.id)
  }

  @modelAction
  addPropMapBinding(propMapBinding: PropMapBinding) {
    this.propMapBindings.set(propMapBinding.id, propMapBinding)
  }

  @computed
  get descendants(): Array<Element> {
    const descendants: Array<Element> = []

    for (const child of this.childrenSorted) {
      descendants.push(child)
      descendants.push(...child.descendants)
    }

    return descendants
  }

  /** All descendants that are the first child of their parent */
  @computed
  get leftHandDescendants(): Array<Element> {
    const firstChild = this.childrenSorted[0]

    if (!firstChild) {
      return []
    }

    return [firstChild, ...firstChild.leftHandDescendants]
  }

  @computed
  get deepestDescendant(): Element | null {
    let deepest: Element | null = null
    let deepestDepth = 0

    const visitChildren = (child: Element, depth: number): void => {
      if (child.children.size) {
        for (const subChild of child.childrenSorted) {
          visitChildren(subChild, depth + 1)
        }
      } else {
        if (depth > deepestDepth) {
          deepest = child
          deepestDepth = depth
        }
      }
    }

    visitChildren(this, 0)

    return deepest
  }

  @computed
  get label() {
    return (
      this.name ||
      this.atom?.current.name ||
      (this.atom?.current
        ? pascalCaseToWords(this.atom.current.type)
        : undefined) ||
      this.component?.current?.name ||
      this.instanceOfComponent?.current?.name ||
      ''
    )
  }

  @computed
  get parentElement(): Maybe<Element> {
    let parent: any = getParent(this)

    if (parent?.$modelType === '@codelab/ElementTree') {
      return undefined // This is the root of the tree
    }

    // usually the first parent will be the 'children' objectMap. To get to the parent element, we need to get the parent of the objectMap
    // For some reason it's two levels deep
    parent = getParent(parent)
    parent = getParent(parent)

    if (parent?.$modelType === '@codelab/Element') {
      return parent
    }

    return undefined
  }

  @computed
  get lastChildOrder() {
    const childrenSorted = this.childrenSorted

    return childrenSorted[childrenSorted.length - 1]?.orderInParent ?? 0
  }

  @computed
  get baseProps() {
    return { [DATA_ID]: this.id, key: this.id }
  }

  @computed
  get antdNode(): DataNode {
    return {
      key: this.id,
      title: this.label,
      children: this.childrenSorted.map((child) => child.antdNode),
    }
  }

  findDescendant(id: string): Maybe<Element> {
    if (this.id === id) {
      return this
    }

    if (this.children.has(id)) {
      return this.children.get(id)?.current
    }

    for (const child of this.childrenSorted) {
      const descendant = child.findDescendant(id)

      if (descendant) {
        return descendant
      }
    }

    return undefined
  }

  @modelAction
  removeChild(element: Element) {
    detach(element)
  }

  /**
   * Parses the prop map bindings with the given source props as input
   * and separates them into two categories:
   * - those that are bound this element
   * - those that are bound to other elements
   */
  applyPropMapBindings = (sourceProps: IPropData) => {
    // those are the props that are bound to the element
    let selfBoundProps = { ...sourceProps }
    // Those are the props that are bound to the element's descendants
    const descendantBoundProps: IPropDataByElementId = {}

    for (const pmb of this.propMapBindings.values()) {
      const appliedProps = pmb.applyBindings(selfBoundProps)

      if (pmb.targetElement && pmb.targetElement.id !== this.id) {
        descendantBoundProps[pmb.targetElement.id] = mergeProps(
          descendantBoundProps[pmb.targetElement.id],
          appliedProps,
        )
      } else {
        selfBoundProps = mergeProps(selfBoundProps, appliedProps)
      }
    }

    return { selfBoundProps, descendantBoundProps }
  }

  /**
   * Parses and materializes the propTransformationJs
   */
  @computed
  get transformFn(): Maybe<TransformFn> {
    if (!this.propTransformationJs) {
      return undefined
    }

    // eslint-disable-next-line no-eval
    const result = attempt(eval, `(${this.propTransformationJs})`) // the parentheses allow us to return a function from eval

    if (isError(result)) {
      console.warn('Error while evaluating prop transformation', result)

      return undefined
    }

    if (typeof result != 'function') {
      console.warn('Invalid transformation function')

      return undefined
    }

    return result
  }

  /**
   * Executes the prop transformation function
   * If successful, merges the result with the original props and returns it
   * If failed, returns the original props
   */
  executePropTransformJs = (props: IPropData): IPropData => {
    const transformFn = this.transformFn

    if (!transformFn) {
      return props
    }

    const result = attempt(transformFn, props)

    if (isError(result)) {
      console.warn('Unable to transform props')

      return props
    }

    return mergeProps(props, result)
  }

  @modelAction
  removePropMapBinding(propMapBinding: PropMapBinding): void {
    this.propMapBindings.delete(propMapBinding.id)
  }

  @modelAction
  updateCache({
    id,
    name,
    css,
    atom,
    component,
    instanceOfComponent,
    hooks,
    propMapBindings,
    props,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    parentElementConnection,
    parentElement,
  }: Omit<IElementDTO, '__typename'>) {
    this.id = id
    this.name = name
    this.css = css
    this.propTransformationJs = propTransformationJs
    this.renderIfPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
    this.atom = atom ? atomRef(atom.id) : null
    this.orderInParent = parentElementConnection?.edges?.[0]?.order ?? null
    this.props = props ? new Prop({ id: props.id }) : null
    this.parentId = parentElement?.id

    if (props) {
      this.props?.updateCache(props)
    } else {
      this.props = null
    }

    for (const pmb of propMapBindings) {
      if (this.propMapBindings.has(pmb.id)) {
        this.propMapBindings.get(pmb.id)?.updateCache(pmb)
      } else {
        this.propMapBindings.set(pmb.id, PropMapBinding.hydrate(pmb))
      }
    }

    this.component = component ? componentRef(component.id) : null
    this.instanceOfComponent = instanceOfComponent
      ? componentRef(instanceOfComponent.id)
      : null
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static hydrate = hydrateElement
}

export const compareOrder = (a: Element, b: Element) =>
  (a.orderInParent ?? 0) - (b.orderInParent ?? 0)
