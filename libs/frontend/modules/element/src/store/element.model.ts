import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { atomRef, getRequiredProps } from '@codelab/frontend/modules/atom'
import { componentRef } from '@codelab/frontend/presenter/container'
import type {
  IAtom,
  IComponent,
  IElement,
  IElementDTO,
  IElementTree,
  IHook,
  IProp,
  IPropData,
  IPropDataByElementId,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
import { cssMap, ELEMENT_NODE_TYPE } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps, pascalCaseToWords } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { computed } from 'mobx'
import {
  findParent,
  getParent,
  getRefsResolvingTo,
  idProp,
  Model,
  model,
  modelAction,
  modelTypeKey,
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
export const hydrate = ({
  id,
  name,
  customCss,
  guiCss,
  atom,

  component,
  instanceOfComponent,
  parentElement,

  preRenderActionId,
  postRenderActionId,
  // TODO Integrate hooks if their usage is not made obsolete by the mobx platform
  hooks,
  propMapBindings,

  props,
  propTransformationJs,
  renderIfPropKey,
  renderForEachPropKey,
  parentElementConnection,
}: Omit<IElementDTO, '__typename'>) => {
  return new Element({
    id,
    name,
    customCss,
    guiCss,
    parentId: parentElement?.id,
    atom: atom ? atomRef(atom.id) : null,
    preRenderActionId,
    postRenderActionId,
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
}

export const getElementTree = (element: IElement): Maybe<IElementTree> => {
  const refs = getRefsResolvingTo<IElement>(element, elementRef)

  return [...refs.values()].reduce((prev, node) => {
    const elementTree = findParent(node, (parent: any) => {
      return parent?.[modelTypeKey] === '@codelab/ElementTree'
    })

    return elementTree ? elementTree : prev
  }, undefined)
}

@model('@codelab/Element')
export class Element
  extends Model({
    id: idProp.withSetter(),
    children: prop(() => objectMap<Ref<IElement>>()),
    __nodeType: prop<ELEMENT_NODE_TYPE>(ELEMENT_NODE_TYPE),
    // parent: prop<Nullish<Element>>(null).withSetter(),

    // Data used for tree initializing, before our Element model is ready
    parentId: prop<Nullable<string>>(null),
    owner: prop<Nullable<string>>(null),

    orderInParent: prop<Nullable<number>>(null).withSetter(),

    name: prop<Nullable<string>>(null).withSetter(),
    customCss: prop<Nullable<string>>(null).withSetter(),
    guiCss: prop<Nullable<string>>(null),
    atom: prop<Nullable<Ref<IAtom>>>(null).withSetter(),
    props: prop<Nullable<IProp>>(null),
    preRenderActionId: prop<Nullish<string>>(null),
    postRenderActionId: prop<Nullish<string>>(null),
    propTransformationJs: prop<Nullable<string>>(null).withSetter(),
    renderIfPropKey: prop<Nullable<string>>(null).withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    propMapBindings: prop(() => objectMap<IPropMapBinding>()),

    // component which has this element as rootElement
    component: prop<Nullable<Ref<IComponent>>>(null).withSetter(),

    // Marks the element as an instance of a specific component
    instanceOfComponent: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),
  })
  implements IElement
{
  @computed
  get childrenSorted(): Array<IElement> {
    return [...this.children.values()].map((x) => x.current).sort(compareOrder)
  }

  /**
   * Using Ref<IElement> doesn't resolve because the ref isn't attached to anything yet, so we must provide an id
   */
  @modelAction
  addChild(id: string, child: Ref<IElement>) {
    this.children.set(id, child)
  }

  @modelAction
  hasChild(child: IElement) {
    return this.children.has(child.id)
  }

  @modelAction
  addPropMapBinding(propMapBinding: PropMapBinding) {
    this.propMapBindings.set(propMapBinding.id, propMapBinding)
  }

  @modelAction
  appendToGuiCss(css: cssMap) {
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    const newGuiCss = { ...curGuiCss, ...css }
    this.guiCss = JSON.stringify(newGuiCss)
  }

  @modelAction
  deleteFromGuiCss(propNames: Array<string>) {
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    propNames.forEach((propName) => {
      if (curGuiCss[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete curGuiCss[propName]
      }
    })

    this.guiCss = JSON.stringify(curGuiCss)
  }

  /**
   * Check to see if this element is part of a component tree
   */
  // @computed
  // get isComponentElement() {
  //   const foundParent = findParent(this, (parent: any) => {
  //     return parent?.$modelType === '@codelab/ComponentService'
  //   })
  //
  //   return Boolean(foundParent)
  // }

  @computed
  get descendants(): Array<IElement> {
    const descendants: Array<IElement> = []

    for (const child of this.childrenSorted) {
      descendants.push(child)
      descendants.push(...child.descendants)
    }

    return descendants
  }

  /** All descendants that are the first child of their parent */
  @computed
  get leftHandDescendants(): Array<IElement> {
    const firstChild = this.childrenSorted[0]

    if (!firstChild) {
      return []
    }

    return [firstChild, ...firstChild.leftHandDescendants]
  }

  @computed
  get deepestDescendant(): IElement | null {
    let deepest: IElement | null = null
    let deepestDepth = 0

    const visitChildren = (child: IElement, depth: number): void => {
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
      this.atom?.current?.name ||
      (this.atom?.current
        ? pascalCaseToWords(this.atom?.current.type)
        : undefined) ||
      this.component?.current?.name ||
      this.instanceOfComponent?.current?.name ||
      ''
    )
  }

  @computed
  get siblings() {
    return this.parentElement?.children
  }

  @computed
  get parentElement() {
    // the parent is ObjectMap items
    return this.parentId ? getParent(this)[this.parentId] : undefined
  }

  @computed
  get lastChildOrder() {
    const childrenSorted = this.childrenSorted

    return childrenSorted[childrenSorted.length - 1]?.orderInParent ?? 0
  }

  /**
   * Internal system props for meta data, use double underline for system-defined identifiers.
   */
  @computed
  get __metadataProps() {
    return { [DATA_ELEMENT_ID]: this.id, key: this.id }
  }

  @computed
  get antdNode() {
    return {
      key: this.id,
      title: this.label,
      type: ELEMENT_NODE_TYPE as ELEMENT_NODE_TYPE,
      children: !this.instanceOfComponent?.current
        ? this.childrenSorted.map((child) => child.antdNode)
        : [],
    }
  }

  @computed
  get atomName() {
    return this.atom?.maybeCurrent?.name || this.atom?.maybeCurrent?.type || ''
  }

  @computed
  get warnings(): Array<string> {
    const warnings: Array<string> = []

    // TODO: Check if there is any issues that can cause suboptimal rendering
    return warnings
  }

  @computed
  get errors(): Array<string> {
    if (!this.atom?.current) {
      return []
    }

    return getRequiredProps(this.atom?.current.type)
      .map((propName) => {
        if (propName === 'children' && this.children.size === 0) {
          return `${this.label} needs at least one child`
        }

        if (propName !== 'children' && !this.props?.data?.[propName]) {
          return `Missing required prop: ${propName}`
        }

        return null
      })
      .filter((x) => x !== null) as Array<string>
  }

  findDescendant(id: string): Maybe<IElement> {
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
  detachChild(element: IElement) {
    this.children.delete(element.id)
  }

  @modelAction
  removeChild(element: IElement) {
    this.children.delete(element.id)
  }

  /**
   * Parses the prop map bindings with the given source props as input
   * and separates them into two categories:
   *
   * - those that are bound this element
   * - those that are bound to other elements
   */
  applyPropMapBindings = (sourceProps: IPropData) => {
    // those are the props that are bound to the element
    let localProps = { ...sourceProps }
    // Those are the props that are bound to the element's descendants
    const globalProps: IPropDataByElementId = {}

    for (const pmb of this.propMapBindings.values()) {
      const appliedProps = pmb.applyBindings(localProps)

      if (pmb.targetElement && pmb.targetElement.id !== this.id) {
        globalProps[pmb.targetElement.id] = mergeProps(
          globalProps[pmb.targetElement.id],
          appliedProps,
        )
      } else {
        localProps = mergeProps(localProps, appliedProps)
      }
    }

    return { localProps, globalProps }
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
    // the parentheses allow us to return a function from eval
    const result = attempt(eval, `(${this.propTransformationJs})`)

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
  executePropTransformJs = (props: IPropData) => {
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
    customCss,
    guiCss,
    atom,
    component,
    instanceOfComponent,
    hooks,
    propMapBindings,
    props,
    propTransformationJs,
    renderIfPropKey,
    postRenderActionId,
    preRenderActionId,
    renderForEachPropKey,
    parentElementConnection,
    parentElement,
  }: Omit<IElementDTO, '__typename'>) {
    this.id = id
    this.name = name ?? null
    this.customCss = customCss ?? null
    this.guiCss = guiCss ?? null
    this.propTransformationJs = propTransformationJs ?? null
    this.renderIfPropKey = renderIfPropKey ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.atom = atom ? atomRef(atom.id) : null

    this.preRenderActionId = preRenderActionId
    this.postRenderActionId = postRenderActionId
    this.orderInParent = parentElementConnection?.edges?.[0]?.order ?? null
    this.props = props ? new Prop({ id: props.id }) : null
    this.parentId = parentElement?.id ?? null

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

    return this
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static hydrate = hydrate

  public static getElementTree = getElementTree
}

export const compareOrder = (a: IElement, b: IElement) =>
  (a.orderInParent ?? 0) - (b.orderInParent ?? 0)
