import { DATA_ID } from '@codelab/frontend/abstract/core'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Component, componentRef } from '@codelab/frontend/modules/component'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { computed } from 'mobx'
import {
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
} from 'mobx-keystone'
import { ElementFragment } from '../graphql/Element.fragment.v2.1.graphql.gen'
import { ElementProps } from './ElementProps'
import { elementRef } from './elementRef'
import { PropMapBinding } from './PropMapBinding'

type TransformFn = (props: PropsData) => PropsData

// Renamed from 'Element' because ts doesn't pick it up, because of the native Element type
// and auto-import doesn't work
@model('@codelab/Element')
export class Element extends Model({
  id: idProp.withSetter(),
  parentElement: prop<Nullish<Ref<Element>>>(() => null).withSetter(),
  name: prop<Nullish<string>>(() => null).withSetter(),
  css: prop<Nullish<string>>(() => null).withSetter(),
  atom: prop<Nullish<Ref<Atom>>>(() => null).withSetter(),
  children: prop<Array<Ref<Element>>>(() => []),
  props: prop<ElementProps>(() => new ElementProps({})),
  propTransformationJs: prop<Nullish<string>>(() => null).withSetter(),
  renderIfPropKey: prop<Nullish<string>>(() => null).withSetter(),
  renderForEachPropKey: prop<Nullish<string>>(() => null).withSetter(),
  propMapBindings: prop(() => objectMap<PropMapBinding>()),

  // component which has this element as rootElement
  component: prop<Nullish<Ref<Component>>>().withSetter(),

  // Marks the element as an instance of a specific component
  instanceOfComponent: prop<Nullish<Ref<Component>>>().withSetter(),
}) {
  protected onAttachedToRootStore(): void {
    for (const child of this.children) {
      child.current.setParentElement(elementRef(this))
    }
  }

  @modelAction
  addChild(child: Element, order?: number) {
    order = order ?? this.lastChildOrder + 1
    child.setParentElement(elementRef(this))
    this.children.splice(order - 1, 0, elementRef(child))
  }

  @modelAction
  addPropMapBinding(propMapBinding: PropMapBinding) {
    this.propMapBindings.set(propMapBinding.id, propMapBinding)
  }

  @computed
  get label() {
    return (
      this.name ||
      this.atom?.current.name ||
      this.component?.current?.name ||
      this.instanceOfComponent?.current?.name ||
      ''
    )
  }

  @computed
  get isRoot() {
    return !this.parentElement && !this.component
  }

  @computed
  get isRootOfComponent() {
    return !this.parentElement && !!this.component
  }

  @computed
  get childrenList() {
    return this.children.map((c) => c.current)
  }

  hasChild(id: string) {
    return !!this.children.find((c) => c.id === id)
  }

  @computed
  get lastChildOrder() {
    return this.childrenList.length
  }

  @computed
  get baseProps() {
    return { [DATA_ID]: this.id, key: this.id }
  }

  orderOfElement(element: Element) {
    return this.childrenList.indexOf(element)
  }

  @modelAction
  removeChild(id: string) {
    const child = this.children.find((c) => c.id === id)

    if (child) {
      this.children.splice(this.children.indexOf(child), 1)
    }
  }

  /**
   * Parses the prop map bindings with the given source props as input
   * and separates them into two categories:
   * - those that are bound this element
   * - those that are bound to other elements
   */
  applyPropMapBindings(sourceProps: PropsData) {
    // those are the props that are bound to the element
    let selfBoundProps = { ...sourceProps }
    // Those are the props that are bound to the element's descendants
    const descendantBoundProps: PropsDataByElementId = {}

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
  executePropTransformJs(props: PropsData): PropsData {
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
  updateFromFragment({
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
  }: Omit<ElementFragment, '__typename'>) {
    this.id = id
    this.name = name
    this.css = css
    this.propTransformationJs = propTransformationJs
    this.renderIfPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
    this.atom = atom ? atomRef(atom.id) : null

    if (props) {
      this.props.updateFromFragment(props)
    } else {
      this.props.clear()
    }

    if (parentElement) {
      if (this.parentElement?.id !== parentElement.id) {
        this.parentElement?.current?.removeChild(this.id)
        this.parentElement = elementRef(parentElement.id)

        // This sets the order too
        this.parentElement.current?.addChild(
          this,
          parentElementConnection.edges[0]?.order ?? undefined,
        )
      }
    } else {
      this.parentElement = null
    }

    for (const pmb of propMapBindings) {
      if (this.propMapBindings.has(pmb.id)) {
        this.propMapBindings.get(pmb.id)?.updateFromFragment(pmb)
      } else {
        this.propMapBindings.set(pmb.id, PropMapBinding.fromFragment(pmb))
      }
    }

    this.component = component ? componentRef(component.id) : null
    this.instanceOfComponent = instanceOfComponent
      ? componentRef(instanceOfComponent.id)
      : null
  }

  @modelAction
  removePropMapBinding(propMapBinding: PropMapBinding): void {
    this.propMapBindings.delete(propMapBinding.id)
  }

  /**
   * Creates a new element from a GraphQL fragment object. Doesn't attach any children or parent
   */
  public static fromFragment({
    id,
    name,
    css,
    atom,

    component,
    instanceOfComponent,

    hooks, // TODO Integrate hooks if their usage is not made obsolete by the mobx platform
    propMapBindings,

    props,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    parentElementConnection,
  }: Omit<ElementFragment, '__typename'>) {
    return new Element({
      id,
      name,
      css,
      atom: atom ? atomRef(atom.id) : null,
      props: props
        ? ElementProps.fromFragment(props)
        : new ElementProps({ data: frozen({}) }),
      propTransformationJs,
      renderIfPropKey,
      renderForEachPropKey,
      parentElement: null,
      component: component ? componentRef(component.id) : null,
      instanceOfComponent: instanceOfComponent
        ? componentRef(instanceOfComponent.id)
        : null,
      propMapBindings: objectMap(
        propMapBindings
          ? propMapBindings.map((b) => [b.id, PropMapBinding.fromFragment(b)])
          : [],
      ),
    })
  }
}
