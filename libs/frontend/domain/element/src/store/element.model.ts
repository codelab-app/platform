import type {
  IAtom,
  IAuth0Owner,
  IComponent,
  IElementDTO,
  IElementRenderType,
  IHook,
  IProp,
  IPropData,
  RenderingError,
  RenderingMetadata,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  CssMap,
  DATA_ELEMENT_ID,
  elementRef,
  getElementService,
  IBuilderDataNode,
  IElement,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { getPropService, propRef } from '@codelab/frontend/domain/prop'
import { actionRef } from '@codelab/frontend/domain/store'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  disconnectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { compoundCaseToTitleCase, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import {
  clone,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
} from 'mobx-keystone'
import { makeUpdateElementInput } from './api.utils'
import { getElementTree } from './element-tree/element-tree.util'
import { getRenderType } from './utils'

type TransformFn = (props: IPropData) => IPropData

const create = ({
  customCss,
  firstChild,
  guiCss,
  id,
  name,
  nextSibling,
  page,
  parent,
  parentComponent,
  postRenderAction,
  preRenderAction,
  prevSibling,
  props,
  propTransformationJs,
  renderForEachPropKey,
  renderIfExpression,
  renderType,
}: IElementDTO) => {
  const elementRenderType = getRenderType(renderType)

  return new Element({
    customCss,
    firstChild: firstChild?.id ? elementRef(firstChild.id) : undefined,
    guiCss,
    id,
    name,
    nextSibling: nextSibling?.id ? elementRef(nextSibling.id) : undefined,
    page,
    // parent of first child
    parent: parent?.id ? elementRef(parent.id) : undefined,
    parentComponent: parentComponent ? componentRef(parentComponent.id) : null,
    postRenderAction,
    preRenderAction,
    prevSibling: prevSibling?.id ? elementRef(prevSibling.id) : undefined,
    props: propRef(props.id),
    propTransformationJs,
    renderForEachPropKey,
    renderIfExpression,
    renderingMetadata: null,
    renderType: elementRenderType,
  })
}

@model('@codelab/Element')
export class Element
  extends Model({
    // slug: prop<string>().withSetter(),
    customCss: prop<Nullable<string>>(null).withSetter(),
    firstChild: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    guiCss: prop<Nullable<string>>(null),
    // Marks the element as an instance of a specific component
    // renderComponentType: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),
    id: idProp.withSetter(),
    name: prop<string>().withSetter(),
    nextSibling: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    orderInParent: prop<Nullable<number>>(null).withSetter(),
    owner: prop<Nullable<IAuth0Owner>>(null),
    // page which has this element as rootElement
    page: prop<Nullable<IEntity>>(null),
    // Data used for tree initializing, before our Element model is ready
    parent: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    // component which has this element as rootElement
    parentComponent: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    postRenderAction: prop<Nullish<IEntity>>(null),
    preRenderAction: prop<Nullish<IEntity>>(null),
    prevSibling: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    props: prop<Ref<IProp>>().withSetter(),
    propTransformationJs: prop<Nullable<string>>(null).withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    renderIfExpression: prop<Nullable<string>>(null).withSetter(),
    renderingMetadata: prop<Nullable<RenderingMetadata>>(null),
    // atom: prop<Nullable<Ref<IAtom>>>(null).withSetter(),
    renderType: prop<IElementRenderType | null>(null).withSetter(),
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
    return this.closestParent ? this.closestParent.rootElement : this
  }

  @computed
  get baseId() {
    if (this.closestParent) {
      return this.closestParent.baseId
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

  /**
   * Only the root doesn't have a closestParent
   */
  @computed
  get isRoot() {
    return !this.closestParent?.id
  }

  /**
   * We have the concept of `parent` and `closestParent`.
   *
   * `parent` has an edge connection like `siblings` in the database.
   *
   * `closestParent` is a conceptual value, we traverse up the sibling chain until we find the first parent
   *
   * (parentA)
   * \
   * (firstChild)-(nextSibling)
   *
   * `nextSibling` has no `parent`, but has a `closestParent` of `parentA`
   */
  @computed
  private get closestParent(): IElement | undefined {
    const parent = this.parent

    if (parent) {
      return parent.current
    }

    let traveledNode = this.prevSibling?.maybeCurrent

    while (traveledNode) {
      const currentParent = traveledNode.parent

      if (currentParent) {
        return currentParent.current
      }

      /**
       * If we don't find a parent, traverse up the sibling chain
       */
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
    const parent = this.closestParent

    if (!parent) {
      return null
    }

    if (parent.renderingMetadata?.error) {
      return parent.renderingMetadata.error
    }

    return parent.ancestorError
  }

  @computed
  get descendantElements(): Array<IElement> {
    const descendants: Array<IElement> = []

    for (const child of this.children) {
      descendants.push(child)
      descendants.push(...child.descendantElements)
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
      (isAtomInstance(this.renderType)
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
      children: this.children.map((child) => child.antdNode),
      key: this.id,
      node: this,
      rootKey: getElementTree(this)?._root?.id ?? null,
      title: this.label,
    }
  }

  @computed
  get atomName() {
    if (isAtomInstance(this.renderType)) {
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

  static create = create

  @modelAction
  toCreateInput(): ElementCreateInput {
    /**
     * Here we'll want to set default value based on the interface
     */
    const renderAtomType = isAtomInstance(this.renderType)
      ? connectNodeId(this.renderType.id)
      : undefined

    const renderComponentType = isComponentInstance(this.renderType)
      ? connectNodeId(this.renderType.id)
      : undefined

    return {
      id: this.id,
      name: this.name,
      postRenderAction: connectNodeId(this.postRenderAction?.id),
      preRenderAction: connectNodeId(this.preRenderAction?.id),
      props: {
        create: {
          node: this.props.current.toCreateInput(),
        },
      },
      renderAtomType,
      renderComponentType,
    }
  }

  @modelAction
  toUpdateInput(): ElementUpdateInput {
    // We need to disconnect the atom if render type changed to component or empty
    const renderAtomType = isAtomInstance(this.renderType)
      ? reconnectNodeId(this.renderType.id)
      : disconnectNodeId(undefined)

    // We need to disconnect the component if render type changed to atom or empty
    const renderComponentType = isComponentInstance(this.renderType)
      ? reconnectNodeId(this.renderType.id)
      : disconnectNodeId(undefined)

    return {
      customCss: this.customCss,
      guiCss: this.guiCss,
      name: this.name,
      postRenderAction: reconnectNodeId(this.postRenderAction?.id),
      preRenderAction: reconnectNodeId(this.preRenderAction?.id),
      props: {
        update: { node: { data: JSON.stringify(this.props.current.data) } },
      },
      renderAtomType,
      renderComponentType,
      renderForEachPropKey: this.renderForEachPropKey,
      renderIfExpression: this.renderIfExpression,
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

  /**
   * This removes the `element` and attaches the siblings together
   *
   * (prevSibling)-[element]-(nextSibling)
   *
   * (prevSibling)-(nextSibling)
   */
  @modelAction
  connectPrevToNextSibling() {
    return () => {
      console.log(this)

      if (this.nextSibling) {
        this.nextSibling.current.prevSibling = this.prevSibling
      }

      if (this.prevSibling) {
        this.prevSibling.current.nextSibling = this.nextSibling
      }
    }
  }

  /**
   * This will connect any siblings to the current element's parent
   *
   * (parent)
   * \
   *  [element]-(nextSibling)
   */
  @modelAction
  detachFromParent() {
    return () => {
      if (!this.parent) {
        return
      }

      /**
       * Connect nextSibling to the parent
       */
      if (this.nextSibling) {
        // Connect parent to nextSibling
        this.parent.current.firstChild = elementRef(this.nextSibling.current)

        // Connect nextSibling to parent
        this.nextSibling.current.setParent(elementRef(this.parent.id))
      }

      this.parent = null
      this.nextSibling = null

      console.log(this)
    }
  }

  @modelAction
  addParent(parentElement: IElement) {
    return () => {
      this.parent = elementRef(parentElement)
    }
  }

  /**
   * This function will replace the current `firstChild` with our new element. You'll need to call other function to handle attaching firstChild
   *
   * (parent)
   * \
   * (firstChild)
   *
   *    (parent)
   *       \   \
   * [element]  x
   *             \
   *             (firstChild)
   */
  @modelAction
  attachToParentAsFirstChild(parentElement: IElement) {
    return () => {
      this.addParent(parentElement)()
      parentElement.firstChild = elementRef(this.id)
    }
  }

  /**
   * Same as above, but using API
   */
  makeAttachToParentAsFirstChildInput(parentElement: IElement) {
    return makeUpdateElementInput(parentElement, {
      firstChild: {
        ...connectNodeId(this.id),
        ...disconnectNodeId(parentElement.firstChild?.id),
      },
    })
  }

  makeDetachFromParentInput() {
    if (!this.closestParent) {
      return null
    }

    const parentElementChanges: ElementUpdateInput = {}

    if (this.closestParent.firstChild?.maybeCurrent?.id === this.id) {
      parentElementChanges.firstChild = {
        ...disconnectNodeId(this.id),
        ...connectNodeId(this.nextSibling?.id),
      }
    }

    return makeUpdateElementInput(this.closestParent, parentElementChanges)
  }

  makeDetachFromPrevSiblingInput() {
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

  makeDetachFromNextSiblingInput() {
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

  /**
   * (sibling)-(sibling.nextSibling)
   * (sibling)-[element]-x-(sibling.nextSibling)
   *
   * @param siblingId target element to attach as
   * @returns
   */
  makeAttachAsNextSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    return makeUpdateElementInput(sibling, {
      nextSibling: {
        // sibling detaches
        ...disconnectNodeId(sibling.nextSibling?.id),
        // appends element
        ...connectNodeId(this.id),
      },
    })
  }

  /**
   * This will disconnect the current previous sibling, and replace it with the new element
   *
   * (sibling.prevSibling)-(sibling)
   * (sibling.prevSibling)-x-[element]-(sibling)
   */
  makeAttachAsPrevSiblingInput(siblingId: string) {
    const sibling = this.elementService.element(siblingId)

    return makeUpdateElementInput(sibling, {
      prevSibling: {
        // sibling detaches its prev sibling
        ...disconnectNodeId(sibling.prevSibling?.id),
        // sibling prepends element
        ...connectNodeId(this.id),
      },
    })
  }

  /**
   * Attach the new element as prevSibling. Leaves `prevSibling` still connected to `sibling`.
   *
   * (prevSibling)-(sibling)
   * (prevSibling)-x-[element]-(sibling)
   *
   * @param sibling
   * @returns
   */
  @modelAction
  attachAsPrevSibling(sibling: IElement) {
    return () => {
      // Add element as as prevSibling
      sibling.prevSibling = elementRef(this)
      this.nextSibling = elementRef(sibling)
    }
  }

  /**
   * Attach the new element as as nextSibling. Leaves `nextSibling` still connected to `sibling`.
   *
   * (sibling)-(nextSibling)
   * (sibling)-[element]-x-(nextSibling)
   *
   * @param sibling
   * @returns
   */
  @modelAction
  attachAsNextSibling(sibling: Ref<IElement>) {
    return () => {
      sibling.current.nextSibling = elementRef(this.id)
      this.prevSibling = elementRef(sibling.current.id)
    }
  }

  /**
   * An element may have a ref that belongs to an element tree. We want to get all descendants of that ref
   */
  // @computed
  // get getDescendantRefs(): Array<IElement> {
  //   const elementTree = Element.getElementTree(this)

  //   return elementTree?.descendants(this) ?? []
  // }

  @modelAction
  @modelAction
  writeCache({
    customCss,
    firstChild,
    guiCss,
    id,
    name,
    nextSibling,
    parent,
    parentComponent,
    postRenderAction,
    preRenderAction,
    prevSibling,
    props,
    propTransformationJs,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
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
