import type {
  IAtom,
  IComponent,
  IElementTree,
  IHook,
  IInterfaceType,
  IProp,
  IPropData,
  RenderingError,
  RenderingMetadata,
} from '@codelab/frontend/abstract/core'
import {
  CssMap,
  DATA_ELEMENT_ID,
  ELEMENT_NODE_TYPE,
  IBuilderDataNode,
  IElement,
  IElementDTO,
} from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import { getPropService, Prop, propRef } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  componentRef,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { extractName } from '@codelab/frontend/shared/utils'
import type { ElementUpdateInput } from '@codelab/shared/abstract/codegen'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId, disconnectNodeId } from '@codelab/shared/domain/mapper'
import { compoundCaseToTitleCase, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import type { AnyModel, Ref } from 'mobx-keystone'
import {
  clone,
  findParent,
  getRefsResolvingTo,
  idProp,
  Model,
  model,
  modelAction,
  modelTypeKey,
  prop,
} from 'mobx-keystone'
import { slugify } from 'voca'
import { makeUpdateElementInput } from './api.utils'
import { elementRef } from './element.ref'

type TransformFn = (props: IPropData) => IPropData

export const getElementTree = (element: IElement): Maybe<IElementTree> => {
  const refs = getRefsResolvingTo<IElement>(element, elementRef)

  return [...refs.values()].reduce((prev, node) => {
    const elementTree = findParent(node, (parent) => {
      return (parent as AnyModel)[modelTypeKey] === '@codelab/ElementTree'
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
    parentId: prop<Nullable<string>>(null).withSetter(),
    nextSiblingId: prop<Nullable<string>>(null).withSetter(),
    prevSiblingId: prop<Nullable<string>>(null).withSetter(),
    firstChildId: prop<Nullable<string>>(null).withSetter(),
    owner: prop<Nullable<string>>(null),
    orderInParent: prop<Nullable<number>>(null).withSetter(),

    name: prop<string>().withSetter(),
    customCss: prop<Nullable<string>>(null).withSetter(),
    guiCss: prop<Nullable<string>>(null),
    atom: prop<Nullable<Ref<IAtom>>>(null).withSetter(),
    props: prop<Nullable<IProp>>(null).withSetter(),
    preRenderActionId: prop<Nullish<string>>(null),
    postRenderActionId: prop<Nullish<string>>(null),
    propTransformationJs: prop<Nullable<string>>(null).withSetter(),
    renderIfExpression: prop<Nullable<string>>(null).withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    renderingMetadata: prop<Nullable<RenderingMetadata>>(null),

    // component which has this element as rootElement
    parentComponent: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    // page which has this element as rootElement
    pageId: prop<Nullable<string>>(null),

    // Marks the element as an instance of a specific component
    renderComponentType: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),

    // if this is a duplicate, trace source element id else null
    sourceElementId: prop<Nullable<string>>(null).withSetter(),
  })
  implements IElement
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get propService() {
    return getPropService(this)
  }

  @computed
  get slug() {
    return slugify(this.name)
  }

  @computed
  get rootElement(): IElement {
    return this.parentElement ? this.parentElement.rootElement : this
  }

  @computed
  get baseId() {
    if (this.parentElement) {
      return this.parentElement.baseId
    }

    const baseId = this.pageId || this.parentComponent?.id

    if (!baseId) {
      throw new Error('Element has no baseId')
    }

    return baseId
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
      const traveledNodeParentElement = getParentElement(traveledNode)

      if (traveledNodeParentElement) {
        return traveledNodeParentElement
      }

      // keep traversing backward
      traveledNode = traveledNode.prevSibling
    }

    return
  }

  @modelAction
  appendToGuiCss(css: CssMap) {
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

  @modelAction
  setRenderingError(error: Nullish<RenderingError>) {
    this.renderingMetadata = {
      error,
    }
  }

  @computed
  get ancestorError() {
    const parent = this.parentElement

    if (!parent) {
      return null
    }

    if (parent.renderingMetadata?.error) {
      return parent.renderingMetadata.error
    }

    return parent.ancestorError
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
      this.atom?.current.name ||
      (this.atom?.current
        ? compoundCaseToTitleCase(this.atom.current.type)
        : undefined) ||
      this.parentComponent?.current.name ||
      this.renderComponentType?.current.name ||
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
  get antdNode(): IBuilderDataNode {
    return {
      key: this.id,
      title: this.label,
      type: ELEMENT_NODE_TYPE as ELEMENT_NODE_TYPE,
      children: this.children.map((child) => child.antdNode),
      rootKey: getElementTree(this)?._root?.id ?? null,
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
   * Parses and materializes the propTransformationJs
   */
  @computed
  get transformFn(): Maybe<TransformFn> {
    if (!this.propTransformationJs) {
      return undefined
    }

    // the parentheses allow us to return a function from eval
    // eslint-disable-next-line no-eval
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

  @modelAction
  clone(cloneIndex: number) {
    const clonedElement: IElement = clone<IElement>(this, {
      generateNewIds: true,
    })

    clonedElement.setName(`${this.name} ${cloneIndex}`)
    clonedElement.setSourceElementId(this.id)

    if (this.atom) {
      clonedElement.setAtom(atomRef(this.atom.id))
    }

    // if (this.props) {
    //   clonedElement.setProps(this.props.clone())
    // }

    // store elements in elementService
    this.elementService.clonedElements.set(clonedElement.id, clonedElement)

    return clonedElement
  }

  @modelAction
  updateCloneIds(elementMap: Map<string, string>) {
    this.parentId = (this.parentId && elementMap.get(this.parentId)) || null

    this.nextSiblingId =
      (this.nextSiblingId && elementMap.get(this.nextSiblingId)) || null

    this.prevSiblingId =
      (this.prevSiblingId && elementMap.get(this.prevSiblingId)) || null

    this.firstChildId =
      (this.firstChildId && elementMap.get(this.firstChildId)) || null

    return this
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

        // We need to set the parent of the next sibling here, because
        // when we compute the parentElement, we traverse up the tree until the
        // first child, hence, the first child should always have parentId set
        if (this.nextSibling) {
          this.nextSibling.parentId = this.parentElement.id
        }
      }

      this.parentId = null
    }
  }

  @modelAction
  attachToParent(parentElementId: string) {
    return () => {
      const parentElement = this.elementService.element(parentElementId)

      this.parentId = parentElement.id
    }
  }

  @modelAction
  attachToParentAsFirstChild(parentElementId: string) {
    return () => {
      const parentElement = this.elementService.element(parentElementId)
      this.attachToParent(parentElementId)()

      parentElement.firstChildId = this.id
      this.parentId = parentElement.id
    }
  }

  makeAttachToParentAsFirstChildInput(parentElementId: string) {
    const parentElement = this.elementService.element(parentElementId)

    return makeUpdateElementInput(parentElement, {
      firstChild: {
        ...connectNodeId(this.id),
        ...disconnectNodeId(parentElement.firstChild?.id),
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
        ...disconnectNodeId(this.id),
        ...connectNodeId(this.nextSibling?.id),
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
        ...disconnectNodeId(this.id),
        // connect next sibling
        ...connectNodeId(this.nextSibling?.id),
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
        ...disconnectNodeId(this.id),
        // attach prev sibling
        ...connectNodeId(this.prevSibling?.id),
      },
    })
  }

  makePrependSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    // sibling - next sibling
    // sibling - [element]
    return makeUpdateElementInput(sibling, {
      nextSibling: {
        // sibling detaches
        ...disconnectNodeId(sibling.nextSibling?.id),
        // appends element
        ...connectNodeId(this.id),
      },
    })
  }

  makeAppendSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    // sibling.prevSibling - sibling
    // [element] - sibling
    return makeUpdateElementInput(sibling, {
      prevSibling: {
        // sibling detaches its prev sibling
        ...disconnectNodeId(sibling.prevSibling?.id),
        // sibling prepends element
        ...connectNodeId(this.id),
      },
    })
  }

  @modelAction
  appendSibling(siblingId: string) {
    // update both element and sibling in cache
    return () => {
      const sibling = this.elementService.element(siblingId)

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

      // sibling - next sibling
      // sibling - [element]
      // sibling appends element
      sibling.nextSiblingId = this.id
      // prepend element sibling
      this.prevSiblingId = sibling.id
    }
  }

  @modelAction
  create({
    id,
    name,
    customCss,
    guiCss,
    slug,
    renderAtomType,
    renderComponentType,
    parentComponent,
    props,
    propTransformationJs,
    renderIfExpression,
    postRenderActionId,
    preRenderActionId,
    renderForEachPropKey,
    parent,
    nextSibling,
    prevSibling,
    firstChild,
  }: IElementDTO) {
    const apiRef = renderAtomType
      ? (typeRef(renderAtomType.api.id) as Ref<IInterfaceType>)
      : undefined

    this.id = id
    this.name = extractName(name)
    this.customCss = customCss ?? null
    this.guiCss = guiCss ?? null
    this.propTransformationJs = propTransformationJs ?? null
    this.renderIfExpression = renderIfExpression ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.atom = renderAtomType ? atomRef(renderAtomType.id) : null

    this.preRenderActionId = preRenderActionId
    this.postRenderActionId = postRenderActionId
    this.props = props ? new Prop({ id: props.id, api: apiRef }) : null
    this.parentId = parent?.id ?? null

    this.nextSiblingId = nextSibling?.id ?? null
    this.prevSiblingId = prevSibling?.id ?? null
    this.firstChildId = firstChild?.id ?? null

    this.parentComponent = parentComponent
      ? componentRef(parentComponent.id)
      : null
    this.renderComponentType = renderComponentType
      ? componentRef(renderComponentType.id)
      : null

    return this
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  // public static hydrate = hydrate

  public static getElementTree = getElementTree
}
