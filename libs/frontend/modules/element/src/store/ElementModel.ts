import { DATA_ID } from '@codelab/frontend/abstract/core'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Component, componentRef } from '@codelab/frontend/modules/component'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { computed } from 'mobx'
import {
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
@model('@codelab/ElementModel')
export class ElementModel extends Model({
  id: idProp.withSetter(),
  order: prop<number>().withSetter(),
  parentElement: prop<Nullish<Ref<ElementModel>>>().withSetter(),
  name: prop<Nullish<string>>(),
  css: prop<Nullish<string>>(),
  atom: prop<Nullish<Ref<Atom>>>(() => null),
  children: prop<Array<Ref<ElementModel>>>(() => []),
  props: prop<Nullish<ElementProps>>(),
  propTransformationJs: prop<Nullish<string>>().withSetter(),
  renderIfPropKey: prop<Nullish<string>>().withSetter(),
  renderForEachPropKey: prop<Nullish<string>>().withSetter(),
  propMapBindings: prop(() => objectMap<PropMapBinding>()),

  // component which has this element as rootElement
  component: prop<Nullish<Ref<Component>>>(),

  // Marks the element as an instance of a specific component
  instanceOfComponent: prop<Nullish<Ref<Component>>>(),
}) {
  protected onAttachedToRootStore(): void {
    for (const child of this.children) {
      child.current.setParentElement(elementRef(this))
    }
  }

  @modelAction
  addChild(child: ElementModel, order?: number) {
    order = order ?? this.lastChildOrder + 1
    child.setOrder(order)
    child.setParentElement(elementRef(this))
    this.children.push(elementRef(child))
    this.children.sort((a, b) => a.current.order - b.current.order)
  }

  @computed
  get label() {
    return this.name || this.atom?.current.name || '' // TODO add this.component?.name and this.componentInstance.name to Element.label
  }

  @computed
  get childrenList() {
    return this.children.map((c) => c.current).sort((a, b) => a.order - b.order)
  }

  hasChild(id: string) {
    return !!this.children.find((c) => c.id === id)
  }

  @computed
  get lastChildOrder() {
    const list = this.childrenList

    return list.length ? list[list.length - 1].order : 1
  }

  @computed
  get baseProps() {
    return { [DATA_ID]: this.id, key: this.id }
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
        selfBoundProps = mergeProps(selfBoundProps, selfBoundProps)
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
      this.props?.updateFromFragment(props)
    } else {
      this.props = null
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
    return new ElementModel({
      id,
      name,
      css,
      atom: atom ? atomRef(atom.id) : null,
      props: props ? ElementProps.fromFragment(props) : null,
      propTransformationJs,
      renderIfPropKey,
      renderForEachPropKey,
      parentElement: null,
      order: parentElementConnection.edges[0]?.order ?? 1,
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
