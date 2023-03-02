import type {
  IAtom,
  IAuth0Owner,
  IComponent,
  IElementDTO,
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
  IRenderTypeModel,
  isAtomModel,
  isComponentModel,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import { getPropService, Prop, propRef } from '@codelab/frontend/domain/prop'
import { actionRef } from '@codelab/frontend/domain/store'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  componentRef,
  getElementService,
} from '@codelab/frontend/presenter/container'
import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId, disconnectNodeId } from '@codelab/shared/domain/mapper'
import { compoundCaseToTitleCase, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import type { AnyModel } from 'mobx-keystone'
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
  Ref,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { makeUpdateElementInput } from './api.utils'
import { elementRef } from './element.ref'
import { getElementTree } from './element-tree.util'
import { getRenderType } from './utils'

type TransformFn = (props: IPropData) => IPropData

const createRootElement = () => {
  const id = v4()

  return new Element({
    id,
    name: ROOT_ELEMENT_NAME,
  })
}

const create = ({
  id,
  name,
  customCss,
  guiCss,
  renderType,
  parentComponent,
  props,
  page,
  propTransformationJs,
  renderIfExpression,
  postRenderAction,
  preRenderAction,
  renderForEachPropKey,
  parent,
  nextSibling,
  prevSibling,
  firstChild,
}: IElementDTO) => {
  const elementRenderType = getRenderType(renderType)

  return new Element({
    id,
    name,
    customCss,
    guiCss,
    // parent of first child
    parent: parent?.id ? elementRef(parent.id) : undefined,
    page,
    nextSibling: nextSibling?.id ? elementRef(nextSibling.id) : undefined,
    prevSibling: prevSibling?.id ? elementRef(prevSibling.id) : undefined,
    firstChild: firstChild?.id ? elementRef(firstChild.id) : undefined,
    renderType: elementRenderType,
    preRenderAction,
    postRenderAction,
    props: props?.id ? propRef(props.id) : null,
    propTransformationJs,
    renderIfExpression,
    renderForEachPropKey,
    renderingMetadata: null,
    parentComponent: parentComponent ? componentRef(parentComponent.id) : null,
  })
}

@model('@codelab/Element')
export class Element
  extends Model({
    id: idProp.withSetter(),
    __nodeType: prop<ELEMENT_NODE_TYPE>(ELEMENT_NODE_TYPE),

    // Data used for tree initializing, before our Element model is ready
    parent: prop<Maybe<Ref<IElement>>>().withSetter(),
    nextSibling: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    prevSibling: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    firstChild: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    owner: prop<Nullable<IAuth0Owner>>(null),
    orderInParent: prop<Nullable<number>>(null).withSetter(),

    name: prop<string>().withSetter(),
    // slug: prop<string>().withSetter(),
    customCss: prop<Nullable<string>>(null).withSetter(),
    guiCss: prop<Nullable<string>>(null),
    // atom: prop<Nullable<Ref<IAtom>>>(null).withSetter(),
    renderType: prop<Ref<IAtom> | Ref<IComponent> | null>(null).withSetter(),
    props: prop<Nullable<Ref<IProp>>>(null).withSetter(),
    preRenderAction: prop<Nullish<IEntity>>(null),
    postRenderAction: prop<Nullish<IEntity>>(null),
    propTransformationJs: prop<Nullable<string>>(null).withSetter(),
    renderIfExpression: prop<Nullable<string>>(null).withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    renderingMetadata: prop<Nullable<RenderingMetadata>>(null),

    // component which has this element as rootElement
    parentComponent: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    // page which has this element as rootElement
    page: prop<Nullable<IEntity>>(null),

    // Marks the element as an instance of a specific component
    // renderComponentType: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),

    // if this is a duplicate, trace source element id else null
    sourceElement: prop<Nullable<IEntity>>(null).withSetter(),
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
  get rootElement(): IElement {
    return this.parentElement ? this.parentElement.rootElement : this
  }

  @computed
  get baseId() {
    if (this.parentElement) {
      return this.parentElement.baseId
    }

    const baseId = this.page?.id || this.parentComponent?.id

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
    let currentTraveledNode: Maybe<IElement> = firstChild.current

    // parent = el1 -> el2 -> el3 -> end
    // given el1, travel next using next sibling until next = no more next sibling
    while (currentTraveledNode) {
      results.push(currentTraveledNode)
      currentTraveledNode = currentTraveledNode.nextSibling?.current
    }

    return results
  }

  @computed
  get isRoot() {
    // check no parent by
    // travel first child
    // travel sibling -> first child
    return !this.parentElement?.id
  }

  @computed
  get parentElement() {
    // parent - first child (this)
    const getParentElement = (element: IElement) => {
      if (element.parent) {
        return this.elementService.element(element.parent.id)
      }

      return
    }

    const thisParentElementFromId = getParentElement(this)

    if (thisParentElementFromId) {
      return thisParentElementFromId
    }

    // parent - first child - prev sibling 1 ... prev sibling n - element (this)
    let traveledNode = this.prevSibling?.maybeCurrent

    while (traveledNode) {
      const traveledNodeParentElement = getParentElement(traveledNode)

      if (traveledNodeParentElement) {
        return traveledNodeParentElement
      }

      // keep traversing backward
      traveledNode = traveledNode.prevSibling?.current
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

  @computed
  get label() {
    return (
      this.name ||
      this.renderType?.current.name ||
      (isAtomModel(this.renderType)
        ? compoundCaseToTitleCase((this.renderType.current as IAtom).type)
        : undefined) ||
      this.parentComponent?.current.name ||
      ''
    )
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
    if (isAtomModel(this.renderType)) {
      return this.renderType.current.name || this.renderType.current.type
    }

    return ''
  }

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

  static createRootElement = createRootElement

  static create = create

  toCreateInput(): ElementCreateInput {
    /**
     * Here we'll want to set default value based on the interface
     */
    const props: ElementCreateInput['props'] = {
      create: {
        node: {
          data: JSON.stringify(this.props?.current.data.data ?? {}),
        },
      },
    }

    const renderAtomType = isAtomModel(this.renderType)
      ? connectNodeId(this.renderType.id)
      : undefined

    const renderComponentType = isComponentModel(this.renderType)
      ? connectNodeId(this.renderType.id)
      : undefined

    return {
      renderComponentType,
      renderAtomType,
      props,
      // postRenderAction,
      // preRenderAction,
      name: this.name,
      id: this.id,
    }
  }

  @modelAction
  clone(cloneIndex: number) {
    const clonedElement: IElement = clone<IElement>(this, {
      generateNewIds: true,
    })

    clonedElement.setName(`${this.name} ${cloneIndex}`)
    clonedElement.setSourceElement(elementRef(this.id))

    // if (this.atom) {
    //   clonedElement.setAtom(atomRef(this.atom.id))
    // }

    // if (this.props) {
    //   clonedElement.setProps(this.props.clone())
    // }

    // store elements in elementService
    this.elementService.clonedElements.set(clonedElement.id, clonedElement)

    return clonedElement
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
      this.nextSibling = null
    }
  }

  @modelAction
  attachPrevToNextSibling() {
    return () => {
      if (this.nextSibling) {
        this.nextSibling.current.prevSibling = this.prevSibling
      }

      if (this.prevSibling) {
        this.prevSibling.current.nextSibling = this.nextSibling
      }
    }
  }

  @modelAction
  detachPrevSibling() {
    return () => {
      this.prevSibling = null
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
      const parentElementFirstChild =
        this.parentElement.firstChild?.maybeCurrent

      if (parentElementFirstChild && parentElementFirstChild.id === this.id) {
        parentElementFirstChild.nextSibling = this.nextSibling

        // We need to set the parent of the next sibling here, because
        // when we compute the parentElement, we traverse up the tree until the
        // first child, hence, the first child should always have parentId set
        if (this.nextSibling) {
          this.nextSibling.maybeCurrent?.setParent(
            elementRef(this.parentElement.id),
          )
        }
      }

      this.parent = undefined
    }
  }

  @modelAction
  attachToParent(parentElement: Ref<IElement>) {
    return () => {
      this.parent = parentElement
    }
  }

  @modelAction
  attachToParentAsFirstChild(parentElement: Ref<IElement>) {
    return () => {
      this.attachToParent(parentElement)()

      parentElement.current.firstChild = elementRef(this.id)
      this.parent = parentElement
    }
  }

  makeAttachToParentAsFirstChildInput(parentElement: Ref<IElement>) {
    return makeUpdateElementInput(parentElement, {
      firstChild: {
        ...connectNodeId(this.id),
        ...disconnectNodeId(parentElement.current.firstChild?.id),
      },
    })
  }

  makeDetachParentInput() {
    if (!this.parentElement) {
      return null
    }

    const parentElementChanges: ElementUpdateInput = {}

    if (this.parentElement.firstChild?.maybeCurrent?.id === this.id) {
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
  appendSibling(sibling: Ref<IElement>) {
    // update both element and sibling in cache
    return () => {
      // sibling - next sibling
      // sibling - [element]
      // sibling prepends element
      sibling.current.prevSibling = elementRef(this.id)
      // element appends sibling
      this.nextSibling = elementRef(sibling.current.id)
    }
  }

  @modelAction
  prependSibling(sibling: Ref<IElement>) {
    return () => {
      // sibling - next sibling
      // sibling - [element]
      // sibling appends element
      sibling.current.nextSibling = elementRef(this.id)
      // prepend element sibling
      this.prevSibling = elementRef(sibling.current.id)
    }
  }

  @modelAction
  @modelAction
  writeCache({
    id,
    name,
    customCss,
    guiCss,
    parentComponent,
    renderType,
    props,
    propTransformationJs,
    renderIfExpression,
    postRenderAction,
    preRenderAction,
    renderForEachPropKey,
    parent,
    nextSibling,
    prevSibling,
    firstChild,
  }: Partial<IElementDTO>) {
    const elementRenderType = getRenderType(renderType)

    this.name = name ?? this.name
    this.customCss = customCss ?? this.customCss
    this.guiCss = guiCss ?? this.guiCss
    this.propTransformationJs =
      propTransformationJs ?? this.propTransformationJs
    this.renderIfExpression = renderIfExpression ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.renderType = elementRenderType ?? this.renderType
    this.preRenderAction = preRenderAction
      ? actionRef(preRenderAction.id)
      : this.preRenderAction
    this.postRenderAction = postRenderAction
      ? actionRef(postRenderAction.id)
      : this.postRenderAction
    this.props = props?.id ? propRef(props.id) : this.props
    this.parent = parent?.id ? elementRef(parent.id) : this.parent
    this.nextSibling = nextSibling?.id
      ? elementRef(nextSibling.id)
      : this.nextSibling
    this.prevSibling = prevSibling?.id
      ? elementRef(prevSibling.id)
      : this.prevSibling
    this.firstChild = firstChild?.id
      ? elementRef(firstChild.id)
      : this.firstChild
    this.parentComponent = parentComponent
      ? componentRef(parentComponent.id)
      : null

    return this
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  // public static hydrate = hydrate

  public static getElementTree = getElementTree
}
