import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/modules/atom'
import {
  componentRef,
  getElementService,
} from '@codelab/frontend/presenter/container'
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
import { connectId, disconnectId } from '@codelab/shared/data'
import { mergeProps, pascalCaseToWords } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { computed } from 'mobx'
import {
  findParent,
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
import { makePatchElementInput } from './api.utils'
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

  rootOf,
  nextSibling,
  prevSibling,
  childrenRoot,
  preRenderActionId,
  postRenderActionId,
  // TODO Integrate hooks if their usage is not made obsolete by the mobx platform
  hooks,
  propMapBindings,

  props,
  propTransformationJs,
  renderIfPropKey,
  renderForEachPropKey,
}: Omit<IElementDTO, '__typename'>) => {
  return new Element({
    id,
    name,
    customCss,
    guiCss,
    rootOfId: rootOf?.id,
    nextSiblingId: nextSibling?.id,
    prevSiblingId: prevSibling?.id,
    childrenRootId: childrenRoot?.id,
    atom: atom ? atomRef(atom.id) : null,
    preRenderActionId,
    postRenderActionId,
    props: props ? Prop.hydrate(props) : null,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
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
    __nodeType: prop<ELEMENT_NODE_TYPE>(ELEMENT_NODE_TYPE),
    // parent: prop<Nullish<Element>>(null).withSetter(),

    // Data used for tree initializing, before our Element model is ready
    parentId: prop<Nullable<string>>(null),
    rootOfId: prop<Nullable<string>>(null),
    nextSiblingId: prop<Nullable<string>>(null),
    prevSiblingId: prop<Nullable<string>>(null),
    childrenRootId: prop<Nullable<string>>(null),
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
  get elementService() {
    return getElementService(this)
  }

  @computed
  get childrenSorted(): Array<IElement> {
    const childrenRoot = this.childrenRoot

    if (!childrenRoot) {
      return []
    }

    const results = []
    let currentTraveledNode: Maybe<IElement> = childrenRoot

    while (currentTraveledNode) {
      results.push(currentTraveledNode)
      currentTraveledNode = currentTraveledNode.nextSibling
    }

    return results
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
      if (child.childrenSorted.length) {
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
  get childrenRoot() {
    return this.childrenRootId
      ? this.elementService.element(this.childrenRootId)
      : undefined
  }

  @computed
  get rootOf() {
    return this.rootOfId
      ? this.elementService.element(this.rootOfId)
      : undefined
  }

  @computed
  get nextSibling() {
    return this.nextSiblingId
      ? this.elementService.element(this.nextSiblingId)
      : undefined
  }

  @computed
  get prevSibling() {
    return this.prevSiblingId
      ? this.elementService.element(this.prevSiblingId)
      : undefined
  }

  @computed
  get parentElement() {
    // the parent is ObjectMap items
    if (this.rootOf) {
      return this.rootOf
    }

    let travledNode = this.prevSibling

    while (travledNode) {
      if (travledNode.rootOf) {
        return travledNode.rootOf
      }

      travledNode = travledNode.prevSibling
    }

    return undefined
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

  findDescendant(id: string): Maybe<IElement> {
    if (this.id === id) {
      return this as IElement
    }

    for (const child of this.childrenSorted) {
      if (child.id === id) {
        return child
      }

      const descendant = child.findDescendant(id)

      if (descendant) {
        return descendant
      }
    }

    return undefined
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
  detachNextSibling() {
    if (!this.nextSibling) {
      return
    }

    this.nextSibling.prevSiblingId = this.prevSiblingId
    this.nextSiblingId = null
  }

  @modelAction
  detachPrevSibling() {
    if (!this.prevSibling) {
      return
    }

    this.prevSibling.nextSiblingId = this.nextSiblingId
    this.prevSiblingId = null
  }

  @modelAction
  detachParent() {
    if (!this.parentElement) {
      return
    }

    if (this.parentElement.childrenRootId === this.id) {
      this.parentElement.childrenRootId = this.nextSiblingId
    }

    this.parentId = null
  }

  @modelAction
  attachToParent(parentElementId: string) {
    const parentElement = this.elementService.element(parentElementId)

    if (!parentElement) {
      throw new Error(`parent element id ${parentElementId} not found`)
    }

    this.parentId = parentElementId
  }

  @modelAction
  attachToParentAsSubRoot(parentElementId: string) {
    const parentElement = this.elementService.element(parentElementId)
    this.attachToParent(parentElementId)

    if (!parentElement) {
      throw new Error(`parent element id ${parentElementId} not found`)
    }

    parentElement.childrenRootId = this.id
    this.rootOfId = parentElement.id
  }

  makeAttachToParentAsSubRootInput(parentElementId: string) {
    const parentElement = this.elementService.element(parentElementId)

    if (!parentElement) {
      throw new Error(`parent element id ${parentElementId} not found`)
    }

    const input = makePatchElementInput(parentElement, {
      childrenRoot: {
        ...connectId(this.id),
        ...disconnectId(parentElement.childrenRoot?.id),
      },
    })

    return input
  }

  makeDetachParentInput() {
    if (!this.parentElement) {
      return null
    }

    const parentElementChanges: any = {
      children: {
        ...disconnectId(this.id),
      },
    }

    if (this.parentElement.childrenRootId === this.id) {
      parentElementChanges.childrenRoot = {
        ...disconnectId(this.id),
        ...connectId(this.nextSibling?.id),
      }
    }

    return makePatchElementInput(this.parentElement, parentElementChanges)
  }

  makeDetachPrevSiblingInput() {
    if (!this.prevSibling) {
      return null
    }

    return makePatchElementInput(this.prevSibling, {
      nextSibling: {
        ...disconnectId(this.id),
        ...connectId(this.nextSibling?.id),
      },
    })
  }

  makeDetachNextSiblingInput() {
    if (!this.nextSibling) {
      return null
    }

    return makePatchElementInput(this.nextSibling, {
      prevSibling: {
        ...disconnectId(this.id),
        ...connectId(this.prevSibling?.id),
      },
    })
  }

  makePrependSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not ond`)
    }

    return makePatchElementInput(sibling, {
      prevSibling: {
        ...disconnectId(sibling.prevSibling?.id),
        ...connectId(this?.id),
      },
    })
  }

  makeAppendSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not ond`)
    }

    return makePatchElementInput(sibling, {
      nextSibling: {
        ...disconnectId(sibling.nextSibling?.id),
        ...connectId(this?.id),
      },
    })
  }

  @modelAction
  appendSibling(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not ond`)
    }

    sibling.nextSiblingId = this.id
    this.prevSiblingId = sibling.id
  }

  @modelAction
  prependSibling(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not ond`)
    }

    sibling.prevSiblingId = this.id
    this.nextSiblingId = sibling.id
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
    nextSibling,
    prevSibling,
    childrenRoot,
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
    this.props = props ? new Prop({ id: props.id }) : null

    this.nextSiblingId = nextSibling?.id ?? null
    this.prevSiblingId = prevSibling?.id ?? null
    this.childrenRootId = childrenRoot?.id ?? null

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
