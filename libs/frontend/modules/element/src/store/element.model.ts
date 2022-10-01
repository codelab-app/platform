import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/modules/atom'
import {
  componentRef,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ElementUpdateInput } from '@codelab/shared/abstract/codegen'
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
import { connectNode, disconnectNode } from '@codelab/shared/data'
import { mergeProps, pascalCaseToWords } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
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
import { makeUpdateElementInput } from './api.utils'
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
  renderAtomType,
  parent,

  parentComponent,
  renderComponentType,

  nextSibling,
  prevSibling,
  firstChild,
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
    // parent of first child
    parentId: parent?.id,
    nextSiblingId: nextSibling?.id,
    prevSiblingId: prevSibling?.id,
    firstChildId: firstChild?.id,
    atom: renderAtomType ? atomRef(renderAtomType.id) : null,
    preRenderActionId,
    postRenderActionId,
    props: props ? Prop.hydrate(props) : null,
    propTransformationJs,
    renderIfPropKey,
    renderForEachPropKey,
    parentComponent: parentComponent ? componentRef(parentComponent.id) : null,
    renderComponentType: renderComponentType
      ? componentRef(renderComponentType.id)
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
    nextSiblingId: prop<Nullable<string>>(null),
    prevSiblingId: prop<Nullable<string>>(null),
    firstChildId: prop<Nullable<string>>(null),
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
    parentComponent: prop<Nullable<Ref<IComponent>>>(null).withSetter(),

    // Marks the element as an instance of a specific component
    renderComponentType: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),
  })
  implements IElement
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get children(): Array<IElement> {
    const firstChild = this.firstChild

    if (!firstChild) {
      return []
    }

    const results = []
    let currentTraveledNode: Maybe<IElement> = firstChild

    // parent = el1 -> el2 -> el3 -> end
    // given el1, travel next using next sibling until next = no more next sibling
    while (currentTraveledNode) {
      results.push(currentTraveledNode)
      currentTraveledNode = currentTraveledNode.nextSibling
    }

    return results
  }

  @computed
  get isRoot() {
    // check no parent by
    // travel first child
    // travel siblng -> first child
    return !this.parentElement?.id
  }

  @computed
  get parentElement() {
    // parent - first child (this)
    const getParentElement = (element: IElement) => {
      if (element.parentId) {
        return this.elementService.element(element.parentId)
      }

      return
    }

    const thisParentElementFromId = getParentElement(this)

    if (thisParentElementFromId) {
      return thisParentElementFromId
    }

    // parent - first child - prev sibling 1 ... prev sibling n - element (this)
    let traveledNode = this.prevSibling

    while (traveledNode) {
      const travledNodeParentElement = getParentElement(traveledNode)

      if (travledNodeParentElement) {
        return travledNodeParentElement
      }

      // keep traversing backward
      traveledNode = traveledNode.prevSibling
    }

    return
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

    for (const child of this.children) {
      descendants.push(child)
      descendants.push(...child.descendants)
    }

    return descendants
  }

  /** All descendants that are the first child of their parent */
  @computed
  get leftHandDescendants(): Array<IElement> {
    const firstChild = this.children[0]

    if (!firstChild) {
      return []
    }

    return [firstChild, ...firstChild.leftHandDescendants]
  }

  // TODO: this function isn't used anywhere, update implementation if requires
  // @computed
  // get deepestDescendant(): IElement | null {
  //   let deepest: IElement | null = null
  //   let deepestDepth = 0

  //   const visitChildren = (child: IElement, depth: number): void => {
  //     if (child.children.size) {
  //       for (const subChild of child.children) {
  //         visitChildren(subChild, depth + 1)
  //       }
  //     } else {
  //       if (depth > deepestDepth) {
  //         deepest = child
  //         deepestDepth = depth
  //       }
  //     }
  //   }

  //   visitChildren(this, 0)

  //   return deepest
  // }

  @computed
  get label() {
    return (
      this.name ||
      this.atom?.current?.name ||
      (this.atom?.current
        ? pascalCaseToWords(this.atom?.current.type)
        : undefined) ||
      this.parentComponent?.current?.name ||
      this.renderComponentType?.current?.name ||
      ''
    )
  }

  @computed
  get firstChild() {
    return this.firstChildId
      ? this.elementService.element(this.firstChildId)
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
      children: !this.renderComponentType?.current
        ? this.children.map((child) => child.antdNode)
        : [],
    }
  }

  @computed
  get atomName() {
    return this.atom?.maybeCurrent?.name || this.atom?.maybeCurrent?.type || ''
  }

  // TODO: this function isn't used anywhere, update implementation if requires
  // findDescendant(id: string): Maybe<IElement> {
  //   if (this.id === id) {
  //     return this as IElement
  //   }

  //   if (this.children.has(id)) {
  //     return this.children.get(id)?.current
  //   }

  //   for (const child of this.childrenSorted) {
  //     const descendant = child.findDescendant(id)

  //     if (descendant) {
  //       return descendant
  //     }
  //   }

  //   return undefined
  // }

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
    return () => {
      if (!this.nextSibling) {
        return
      }

      this.nextSiblingId = null
    }
  }

  @modelAction
  attachPrevToNextSibling() {
    return () => {
      if (this.nextSibling) {
        this.nextSibling.prevSiblingId = this.prevSiblingId
      }

      if (this.prevSibling) {
        this.prevSibling.nextSiblingId = this.nextSiblingId
      }
    }
  }

  @modelAction
  detachPrevSibling() {
    return () => {
      if (!this.prevSibling) {
        return
      }

      this.prevSiblingId = null
    }
  }

  @modelAction
  detachParent() {
    return () => {
      if (!this.parentElement) {
        return
      }

      // parent = [element] - next sibling
      // element is first child
      if (this.parentElement.firstChildId === this.id) {
        this.parentElement.firstChildId = this.nextSiblingId
      }

      this.parentId = null
    }
  }

  @modelAction
  attachToParent(parentElementId: string) {
    return () => {
      const parentElement = this.elementService.element(parentElementId)

      if (!parentElement) {
        throw new Error(`parent element id ${parentElementId} not found`)
      }

      this.parentId = parentElementId
    }
  }

  @modelAction
  attachToParentAsFirstChild(parentElementId: string) {
    return () => {
      const parentElement = this.elementService.element(parentElementId)
      this.attachToParent(parentElementId)()

      if (!parentElement) {
        throw new Error(`parent element id ${parentElementId} not found`)
      }

      parentElement.firstChildId = this.id
      this.parentId = parentElement.id
    }
  }

  makeAttachToParentAsFirstChildInput(parentElementId: string) {
    const parentElement = this.elementService.element(parentElementId)

    if (!parentElement) {
      throw new Error(`parent element id ${parentElementId} not found`)
    }

    return makeUpdateElementInput(parentElement, {
      firstChild: {
        ...connectNode(this.id),
        ...disconnectNode(parentElement.firstChild?.id),
      },
    })
  }

  makeDetachParentInput() {
    if (!this.parentElement) {
      return null
    }

    const parentElementChanges: ElementUpdateInput = {}

    if (this.parentElement.firstChildId === this.id) {
      parentElementChanges.firstChild = {
        ...disconnectNode(this.id),
        ...connectNode(this.nextSibling?.id),
      }
    }

    return makeUpdateElementInput(this.parentElement, parentElementChanges)
  }

  makeDetachPrevSiblingInput() {
    if (!this.prevSibling) {
      return null
    }

    // prev Sibling - [element] - next sbiling
    return makeUpdateElementInput(this.prevSibling, {
      nextSibling: {
        // disconnect element
        ...disconnectNode(this.id),
        // connect next sibling
        ...connectNode(this.nextSibling?.id),
      },
    })
  }

  makeDetachNextSiblingInput() {
    if (!this.nextSibling) {
      return null
    }

    // prev Sibling - [element] - next sbiling
    return makeUpdateElementInput(this.nextSibling, {
      prevSibling: {
        // detach element
        ...disconnectNode(this.id),
        // attach prev sibling
        ...connectNode(this.prevSibling?.id),
      },
    })
  }

  makePrependSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not found`)
    }

    // sibling - next sibling
    // sibling - [element]
    return makeUpdateElementInput(sibling, {
      nextSibling: {
        // sibling detaches
        ...disconnectNode(sibling.nextSibling?.id),
        // appends element
        ...connectNode(this?.id),
      },
    })
  }

  makeAppendSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    if (!sibling) {
      throw new Error(`sibling element ${siblingId} not found`)
    }

    // sibling.prevSibling - sibling
    // [element] - sibling
    return makeUpdateElementInput(sibling, {
      prevSibling: {
        // sibling detaches its prev sibling
        ...disconnectNode(sibling.prevSibling?.id),
        // sibling prepends element
        ...connectNode(this?.id),
      },
    })
  }

  @modelAction
  appendSibling(siblingId: string) {
    // update both element and sibling in cache
    return () => {
      const sibling = this.elementService.element(siblingId)

      if (!sibling) {
        throw new Error(`sibling element ${siblingId} not found`)
      }

      // sibling - next sibling
      // sibling - [element]
      // sibling prepends element
      sibling.prevSiblingId = this.id
      // element appends sibling
      this.nextSiblingId = sibling.id
    }
  }

  @modelAction
  prependSibling(siblingId: string) {
    return () => {
      const sibling = this.elementService.element(siblingId)

      if (!sibling) {
        throw new Error(`sibling element ${siblingId} not found`)
      }

      // sibling - next sibling
      // sibling - [element]
      // sibling appends element
      sibling.nextSiblingId = this.id
      // prepend element sibling
      this.prevSiblingId = sibling.id
    }
  }

  @modelAction
  writeCache({
    id,
    name,
    customCss,
    guiCss,
    renderAtomType,
    renderComponentType,
    hooks,
    propMapBindings,
    props,
    propTransformationJs,
    renderIfPropKey,
    postRenderActionId,
    preRenderActionId,
    renderForEachPropKey,
    parent,
    nextSibling,
    prevSibling,
    firstChild,
  }: Omit<IElementDTO, '__typename'>) {
    this.id = id
    this.name = name ?? null
    this.customCss = customCss ?? null
    this.guiCss = guiCss ?? null
    this.propTransformationJs = propTransformationJs ?? null
    this.renderIfPropKey = renderIfPropKey ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.atom = renderAtomType ? atomRef(renderAtomType.id) : null

    this.preRenderActionId = preRenderActionId
    this.postRenderActionId = postRenderActionId
    this.props = props ? new Prop({ id: props.id }) : null
    this.parentId = parent?.id ?? null

    this.nextSiblingId = nextSibling?.id ?? null
    this.prevSiblingId = prevSibling?.id ?? null
    this.firstChildId = firstChild?.id ?? null

    if (props) {
      this.props?.writeCache(props)
    } else {
      this.props = null
    }

    for (const pmb of propMapBindings) {
      if (this.propMapBindings.has(pmb.id)) {
        this.propMapBindings.get(pmb.id)?.writeCache(pmb)
      } else {
        this.propMapBindings.set(pmb.id, PropMapBinding.hydrate(pmb))
      }
    }

    this.parentComponent = renderComponentType
      ? componentRef(renderComponentType.id)
      : null
    this.renderComponentType = renderComponentType
      ? componentRef(renderComponentType.id)
      : null

    return this
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static hydrate = hydrate

  public static getElementTree = getElementTree
}
