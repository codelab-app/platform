import type {
  ElementCssRules,
  IActionModel,
  IAtomModel,
  IComponentModel,
  IElementRenderTypeModel,
  IElementRuntimeProp,
  IHook,
  IPageModel,
  IPropModel,
  IStoreModel,
  RenderingError,
  RenderingMetadata,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  BuilderWidthBreakPoint,
  componentRef,
  CssMap,
  DATA_ELEMENT_ID,
  defaultBuilderWidthBreakPoints,
  elementRef,
  getBuilderService,
  getComponentService,
  getElementService,
  getRenderService,
  IElementModel,
  IElementStyle,
  IElementTreeViewDataNode,
  IEvaluationContext,
  isAtom,
  isAtomRef,
  isComponent,
  pageRef,
  propRef,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IElementDTO, IPropData } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  disconnectNodeId,
  ElementProperties,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { compoundCaseToTitleCase, slugify } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import {
  clone,
  idProp,
  Model,
  model,
  modelAction,
  patchRecorder,
  prop,
  Ref,
} from 'mobx-keystone'
import { validateElement } from '../services/element.validate'
import { getRenderType } from './element-render-type.field'
import { jsonStringToCss, parseCssStringIntoObject } from './utils'

const create = (element: IElementDTO): IElementModel => {
  const {
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    firstChild,
    id,
    name,
    nextSibling,
    page,
    parentComponent,
    parentElement,
    postRenderAction,
    preRenderAction,
    prevSibling,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
    tailwindClassNames,
  } = element

  return new Element({
    childMapperComponent: childMapperComponent
      ? componentRef(childMapperComponent.id)
      : null,
    childMapperPreviousSibling: childMapperPreviousSibling
      ? elementRef(childMapperPreviousSibling.id)
      : null,
    childMapperPropKey,
    firstChild: firstChild?.id ? elementRef(firstChild.id) : undefined,
    id,
    isTextContentEditable: false,
    name,
    nextSibling: nextSibling?.id ? elementRef(nextSibling.id) : undefined,
    page: page ? pageRef(page.id) : null,
    parentComponent: parentComponent ? componentRef(parentComponent.id) : null,
    // parent of first child
    parentElement: parentElement?.id ? elementRef(parentElement.id) : undefined,
    postRenderAction: postRenderAction?.id
      ? actionRef(postRenderAction.id)
      : undefined,
    preRenderAction: preRenderAction?.id
      ? actionRef(preRenderAction.id)
      : undefined,
    prevSibling: prevSibling?.id ? elementRef(prevSibling.id) : undefined,
    props: propRef(props.id),
    renderForEachPropKey,
    renderIfExpression,
    renderingMetadata: null,
    renderType: getRenderType(renderType),
    style,
    tailwindClassNames,
  })
}

@model('@codelab/Element')
export class Element
  extends Model({
    // The patches don't record until attached to root, so initial creation won't be tracked
    _modified: prop(true).withSetter(),
    childMapperComponent:
      prop<Nullable<Ref<IComponentModel>>>(null).withSetter(),
    childMapperPreviousSibling:
      prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    childMapperPropKey: prop<Nullable<string>>(null).withSetter(),
    firstChild: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),
    id: idProp.withSetter(),
    isTextContentEditable: prop<boolean>(false).withSetter(),
    name: prop<string>().withSetter(),
    nextSibling: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    orderInParent: prop<Nullable<number>>(null).withSetter(),
    owner: prop<Nullable<IEntity>>(null),
    // page which has this element as rootElement
    page: prop<Nullable<Ref<IPageModel>>>(null),
    // component which has this element as rootElement
    parentComponent: prop<Nullable<Ref<IComponentModel>>>(null).withSetter(),
    // Data used for tree initializing, before our Element model is ready
    parentElement: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    postRenderAction: prop<Nullable<Ref<IActionModel>>>(null).withSetter(),
    preRenderAction: prop<Nullable<Ref<IActionModel>>>(null).withSetter(),
    prevSibling: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    props: prop<Ref<IPropModel>>().withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    renderIfExpression: prop<Nullable<string>>(null).withSetter(),
    renderingMetadata: prop<Nullable<RenderingMetadata>>(null),
    renderType: prop<IElementRenderTypeModel>().withSetter(),
    // .withTransform(renderTypeTransform()),
    // if this is a duplicate, trace source element id else null
    sourceElement: prop<Nullable<IEntity>>(null).withSetter(),
    style: prop<Nullable<string>>(null).withSetter(),
    tailwindClassNames: prop<Nullable<Array<string>>>(null).withSetter(),
  })
  implements IElementModel
{
  static create = create

  onAttachedToRootStore() {
    const recorder = patchRecorder(this, {
      filter: (patches, inversePatches) => {
        // Skip patches related to setting '_modified' to false

        return !patches.some((patch) => {
          return patch.path.includes('_modified')
        })
      },
      onPatches: (patches, inversePatches) => {
        this.set_modified(true)
      },
      recording: true,
    })

    return () => recorder.dispose()
  }

  /**
   * Internal system props for meta data, use double underline for system-defined identifiers.
   */
  @computed
  get __metadataProps() {
    return { [DATA_ELEMENT_ID]: this.id, key: this.id }
  }

  @computed
  get ancestorError() {
    const parent = this.closestParentElement?.current

    if (!parent) {
      return null
    }

    if (parent.renderingMetadata?.error) {
      return parent.renderingMetadata.error
    }

    return parent.ancestorError
  }

  @computed
  get atomName() {
    if (isAtom(this.renderType.current)) {
      return this.renderType.current.name || this.renderType.current.type
    }

    return ''
  }

  get breakpointsByPrecedence() {
    const breakpoints = [
      BuilderWidthBreakPoint.MobilePortrait,
      BuilderWidthBreakPoint.MobileLandscape,
      BuilderWidthBreakPoint.Tablet,
      BuilderWidthBreakPoint.Desktop,
    ]

    return breakpoints
  }

  @computed
  get children(): Array<IElementModel> {
    const firstChild = this.firstChild

    if (!firstChild) {
      return []
    }

    const results = []
    let currentTraveledNode: Maybe<IElementModel> = firstChild.current

    // parent = el1 -> el2 -> el3 -> end
    // given el1, travel next using next sibling until next = no more next sibling
    while (currentTraveledNode) {
      results.push(currentTraveledNode)
      currentTraveledNode = currentTraveledNode.nextSibling?.current
    }

    return results
  }

  @computed
  get closestContainerNode() {
    const closestContainerNode =
      this.closestSubTreeRootElement.parentComponent?.current ??
      this.closestSubTreeRootElement.page?.current

    if (!closestContainerNode) {
      console.log(this.toTreeNode, this.closestSubTreeRootElement.toTreeNode)
      throw new Error('Element has no node attached to')
    }

    return closestContainerNode
  }

  /**
   * We have the concept of `parent` and `closestParent`.
   closestParentElement?.maybeCurrent?.toTreeNode,*
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
  get closestParentElement() {
    const parent = this.parentElement

    if (parent) {
      return parent
    }

    let traveledNode = this.prevSibling?.maybeCurrent

    while (traveledNode) {
      const currentParent = traveledNode.parentElement

      if (currentParent) {
        return currentParent
      }

      /**
       * If we don't find a parent, traverse up the sibling chain
       */
      traveledNode = traveledNode.prevSibling?.current
    }

    return null
  }

  /**
   * The root element is the child of a container node, a tree could have many root elements
   */
  @computed
  get closestSubTreeRootElement(): IElementModel {
    return this.closestParentElement
      ? this.closestParentElement.current.closestSubTreeRootElement
      : this
  }

  @computed
  get customCss() {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { cssString } = this.styleParsed[breakpoint] ?? {}

    return cssString
  }

  /**
   * We could fetch descendantElements for each element, but that would require too much GraphQL data, instead we can compute it from children.
   *
   * We reserve descendantElements for rootElements only
   */
  @computed
  get descendantElements(): Array<IElementModel> {
    const descendants: Array<IElementModel> = []

    for (const child of this.children) {
      descendants.push(child)
      descendants.push(...child.descendantElements)
    }

    return descendants
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.runtimeProp?.evaluatedProps || {},
    }
  }

  @computed
  get guiCss() {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { guiString } = this.styleParsed[breakpoint] ?? {}

    return guiString
  }

  /**
   * Only the root doesn't have a closestParent
   */
  @computed
  get isRoot() {
    return !this.closestParentElement?.id
  }

  @computed
  get label() {
    return (
      this.name ||
      this.renderType.maybeCurrent?.name ||
      (isAtomRef(this.renderType)
        ? compoundCaseToTitleCase((this.renderType.current as IAtomModel).type)
        : undefined) ||
      this.parentComponent?.maybeCurrent?.name ||
      ''
    )
  }

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    const component = this.parentComponent?.current

    return {
      actions: this.store.current.actionRunners,
      componentProps: component?.runtimeProp?.componentEvaluatedProps || {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.store.current.refs,
      rendererType: this.renderService.activeRenderer?.current.rendererType,
      rootActions: this.providerStore?.current.actionRunners ?? {},
      rootRefs: this.providerStore?.current.refs || {},
      rootState: this.providerStore?.current.state || {},
      state: this.store.current.state,
      url: this.urlProps ?? {},
    }
  }

  @computed
  get providerStore(): Ref<IStoreModel> | undefined {
    return this.renderService.activeRenderer?.current.providerTree?.current
      .rootElement.current.store
  }

  @computed
  get runtimeProp(): Maybe<IElementRuntimeProp> {
    return this.renderService.activeRenderer?.current.runtimeProps.get(
      this.id,
    ) as Maybe<IElementRuntimeProp>
  }

  @computed
  get slug(): string {
    return slugify(this.name)
  }

  @computed
  get store(): Ref<IStoreModel> {
    return this.closestContainerNode.store
  }

  @computed
  get styleParsed(): IElementStyle {
    return JSON.parse(this.style || '{}')
  }

  @computed
  get styleStringWithBreakpoints(): string {
    const parsedCss = this.styleParsed
    const activeRenderer = this.renderService.activeRenderer?.current
    const rendererType = activeRenderer?.rendererType

    const isProduction =
      rendererType === RendererType.Production ||
      rendererType === RendererType.Preview

    const mediaQueryString = isProduction ? '@media' : '@container root'
    const breakpointStyles = []

    for (const breakpoint of this.breakpointsByPrecedence) {
      const breakpointStyle = parsedCss[breakpoint as BuilderWidthBreakPoint]

      const breakpointWidth =
        defaultBuilderWidthBreakPoints[breakpoint as BuilderWidthBreakPoint]

      const lowerBound =
        breakpoint === BuilderWidthBreakPoint.MobilePortrait
          ? 0
          : breakpointWidth.min

      if (breakpointStyle) {
        breakpointStyles.push(
          `${mediaQueryString} (width >= ${lowerBound}px) {
            ${breakpointStyle.cssString ?? ''}
            ${jsonStringToCss(breakpointStyle.guiString ?? '{}')}
          }`,
        )
      }
    }

    return breakpointStyles.join('\n')
  }

  @computed
  get stylesInheritedFromOtherBreakpoints() {
    const currentBreakpoint = this.builderService.selectedBuilderBreakpoint
    const parsedStyle = this.styleParsed
    let inheritedStyles = {} as ElementCssRules

    for (const breakpoint of this.breakpointsByPrecedence) {
      if (breakpoint === currentBreakpoint) {
        break
      }

      const { cssString, guiString } = parsedStyle[breakpoint] ?? {}
      const cssObject = parseCssStringIntoObject(cssString ?? '')
      const guiObject = JSON.parse(guiString ?? '{}')

      inheritedStyles = { ...inheritedStyles, ...cssObject, ...guiObject }
    }

    const { cssString, guiString } = parsedStyle[currentBreakpoint] ?? {}
    const cssObject = parseCssStringIntoObject(cssString ?? '')
    const guiObject = JSON.parse(guiString ?? '{}')
    const currentStyles = { ...cssObject, ...guiObject }

    return { currentStyles, inheritedStyles }
  }

  @computed
  get toJson() {
    return {
      childMapperComponent: this.childMapperComponent,
      childMapperPreviousSibling: this.childMapperPreviousSibling,
      childMapperPropKey: this.childMapperPropKey,
      closestContainerNode: this.closestContainerNode,
      firstChild: this.firstChild,
      id: this.id,
      // isRoot: this.isRoot,
      name: this.name,
      nextSibling: this.nextSibling,
      page: this.page,
      parentComponent: this.parentComponent,
      parentElement: this.parentElement,
      postRenderAction: this.postRenderAction,
      preRenderAction: this.preRenderAction,
      prevSibling: this.prevSibling,
      props: this.props.current.toJson,
      renderForEachPropKey: this.renderForEachPropKey,
      renderIfExpression: this.renderIfExpression,
      renderType: this.renderType.current.toJson,
      style: this.style,
    }
  }

  @computed
  get toTreeNode() {
    return {
      firstChild: this.firstChild?.current.toId,
      id: this.id,
      name: this.name,
      nextSibling: this.nextSibling?.current.toId,
      parentElement: this.parentElement?.current.toId,
      prevSibling: this.prevSibling?.current.toId,
    }
  }

  @computed
  get toId() {
    return {
      id: this.id,
      name: this.name,
    }
  }

  @computed
  get treeTitle() {
    return {
      primary: this.label,
      secondary:
        this.renderType.maybeCurrent?.name ||
        (isAtom(this.renderType.current)
          ? compoundCaseToTitleCase(this.renderType.current.type)
          : undefined),
    }
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    const extraChildren: Array<IElementModel> = []

    // Creates the tree node n times for the component based on the child mapper prop
    if (
      this.childMapperComponent?.id &&
      this.childMapperPropKey &&
      this.runtimeProp?.evaluatedChildMapperProp.length
    ) {
      const keys = [
        ...Array(this.runtimeProp.evaluatedChildMapperProp.length).keys(),
      ]

      keys.forEach((i) => {
        const clonedComponent = this.componentService.clonedComponents.get(
          `${this.id}-${i}`,
        )

        if (clonedComponent) {
          extraChildren.push(clonedComponent.rootElement.current)
        }
      })
    }

    // Add assigned ReactNode props as children
    const reactNodesChildren: Array<IElementTreeViewDataNode> = []
    Object.keys(this.props.current.values).forEach((key, index) => {
      const propData = this.props.current.values[key]

      const component = this.componentService.components.get(propData.value)
        ?.rootElement.current

      if (propData.kind === ITypeKind.ReactNodeType && component) {
        reactNodesChildren.push({
          ...component.treeViewNode,
          children: [],
          isChildMapperComponentInstance: true,
          key: `${propData.value}${index}`,
          primaryTitle: `${key}:`,
          selectable: false,
        })
      }
    })

    const childMapperRenderIndex =
      this.children.findIndex(
        (child) => child.id === this.childMapperPreviousSibling?.id,
      ) + 1

    const children = [...this.children.map((child) => child.treeViewNode)]
    children.splice(
      childMapperRenderIndex,
      0,
      ...extraChildren.map((child) => ({
        ...child.treeViewNode,
        children: [],
        isChildMapperComponentInstance: true,
      })),
      ...reactNodesChildren,
    )

    return {
      children,
      key: this.id,
      node: this,
      primaryTitle: this.treeTitle.primary,
      rootKey: this.closestSubTreeRootElement.id,
      secondaryTitle: this.treeTitle.secondary,
      title: `${this.treeTitle.primary} (${this.treeTitle.secondary})`,
    }
  }

  @computed
  get urlProps(): IPropData | undefined {
    return this.renderService.activeRenderer?.current.urlSegments
  }

  @modelAction
  appendToGuiCss(css: CssMap) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    const newGuiCss = { ...curGuiCss, ...css }
    const guiString = JSON.stringify(newGuiCss)

    styleObject[breakpoint] = { ...styleObject[breakpoint], guiString }
    this.style = JSON.stringify(styleObject)
  }

  /**
   * Attach the new element as as nextSibling. Leaves `nextSibling` still connected to `sibling`.
   *
   * (sibling)-(nextSibling)
   * (sibling)-[element]-x-(nextSibling)
   *
   * @param prevSibling
   * @returns
   */
  @modelAction
  attachAsNextSibling(prevSibling: IElementModel) {
    console.debug('Element.attachAsNextSibling()', prevSibling.toTreeNode)

    const oldNextSibling = prevSibling.nextSibling?.current

    if (oldNextSibling) {
      oldNextSibling.prevSibling = elementRef(this)
      this.setNextSibling(elementRef(oldNextSibling))
    }

    this.prevSibling = elementRef(prevSibling.id)

    prevSibling.nextSibling = elementRef(this.id)
  }

  /**
   * Attach the new element as prevSibling. Leaves `prevSibling` still connected to `sibling`.
   *
   * (prevSibling)-(sibling)
   * (prevSibling)-[element]-(sibling)
   *
   * There is a special case, if prevSibling is the firstChild, we need to connect the new element to the parent as well
   */
  @modelAction
  attachAsPrevSibling(nextSibling: IElementModel) {
    const nextSiblingParentElement = nextSibling.parentElement?.current

    if (nextSiblingParentElement) {
      this.attachAsFirstChild(nextSiblingParentElement)

      return
    }

    const oldPrevSibling = nextSibling.prevSibling?.current

    nextSibling.prevSibling = elementRef(this)

    if (oldPrevSibling) {
      oldPrevSibling.nextSibling = elementRef(this)
      console.log(oldPrevSibling.toTreeNode)

      this.prevSibling = elementRef(oldPrevSibling)
    }

    this.nextSibling = elementRef(nextSibling)
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
  attachAsFirstChild(parentElement: IElementModel) {
    /**
     * If parent has existing first child, detach it
     */
    const parentElementsFirstChild = parentElement.firstChild?.current

    if (parentElementsFirstChild) {
      parentElementsFirstChild.parentElement = null

      parentElementsFirstChild.prevSibling = elementRef(this)

      this.nextSibling = elementRef(parentElementsFirstChild)
    }

    /**
     * Add new first child
     */
    parentElement.firstChild = elementRef(this.id)

    this.parentElement = elementRef(parentElement)
  }

  @modelAction
  clone(cloneIndex?: number) {
    const clonedElement: IElementModel = clone<IElementModel>(this, {
      generateNewIds: true,
    })

    // FIXME: add atom and props
    clonedElement.setName(
      `${this.name}${isNil(cloneIndex) ? '' : ` ${cloneIndex}`}`,
    )
    clonedElement.setSourceElement(elementRef(this.id))

    // store elements in elementService
    this.elementService.clonedElements.set(clonedElement.id, clonedElement)

    return clonedElement
  }

  @modelAction
  deleteFromGuiCss(propNames: Array<string>) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    propNames.forEach((propName) => {
      if (curGuiCss[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete curGuiCss[propName]
      }
    })

    const guiString = JSON.stringify(curGuiCss)
    styleObject[breakpoint] = { ...styleObject[breakpoint], guiString }
    this.style = JSON.stringify(styleObject)
  }

  @modelAction
  detachFromTree() {
    console.debug('Element.detachFromTree()', this)

    const { nextSibling, parentElement, prevSibling } = this

    /**
     * If we are in the middle of a sibling chain
     */
    if (nextSibling && prevSibling) {
      nextSibling.current.prevSibling = elementRef(prevSibling.current)
      prevSibling.current.nextSibling = elementRef(nextSibling.current)
    }

    /**
     * Move nextSibling to firstChild
     */
    if (parentElement) {
      if (nextSibling) {
        parentElement.current.firstChild = elementRef(nextSibling.current)
        nextSibling.current.parentElement = elementRef(parentElement.current)
      } else {
        parentElement.current.firstChild = null
      }
    }

    this.nextSibling = null
    this.prevSibling = null
    this.parentElement = null
  }

  @modelAction
  setCustomCss(cssString: string) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    styleObject[breakpoint] = { ...styleObject[breakpoint], cssString }
    this.style = JSON.stringify(styleObject)
  }

  @modelAction
  setRenderingError(error: Nullish<RenderingError>) {
    this.renderingMetadata = {
      error,
    }
  }

  @modelAction
  toCreateInput(): ElementCreateInput {
    return {
      compositeKey: ElementProperties.elementCompositeKey(
        this.name,
        this.closestContainerNode,
      ),
      firstChild: connectNodeId(this.firstChild?.id),
      id: this.id,
      nextSibling: connectNodeId(this.nextSibling?.id),
      parentElement: connectNodeId(this.parentElement?.id),
      prevSibling: connectNodeId(this.prevSibling?.id),
      props: {
        create: {
          node: this.props.current.toCreateInput(),
        },
      },
      renderType: {
        Atom: isAtomRef(this.renderType)
          ? connectNodeId(this.renderType.id)
          : undefined,
        Component: isComponent(this.renderType)
          ? connectNodeId(this.renderType.id)
          : undefined,
      },
      style: this.style,
    }
  }

  @modelAction
  toUpdateInput(): ElementUpdateInput {
    // We need to disconnect the atom if render type changed to component or empty
    const renderAtomType = isAtomRef(this.renderType)
      ? reconnectNodeId(this.renderType.id)
      : disconnectNodeId(undefined)

    // We need to disconnect the component if render type changed to atom or empty
    const renderComponentType = isComponent(this.renderType)
      ? reconnectNodeId(this.renderType.id)
      : disconnectNodeId(undefined)

    const preRenderAction = this.preRenderAction?.id
      ? reconnectNodeId(this.preRenderAction.id)
      : disconnectNodeId(undefined)

    const postRenderAction = this.postRenderAction?.id
      ? reconnectNodeId(this.postRenderAction.id)
      : disconnectNodeId(undefined)

    const childMapperComponent = this.childMapperComponent?.id
      ? reconnectNodeId(this.childMapperComponent.id)
      : disconnectNodeId(undefined)

    const childMapperPreviousSibling = this.childMapperPreviousSibling?.id
      ? reconnectNodeId(this.childMapperPreviousSibling.id)
      : disconnectNodeId(undefined)

    return {
      childMapperComponent,
      childMapperPreviousSibling,
      childMapperPropKey: this.childMapperPropKey,
      compositeKey: ElementProperties.elementCompositeKey(
        this.name,
        this.closestContainerNode,
      ),
      postRenderAction,
      preRenderAction,
      renderForEachPropKey: this.renderForEachPropKey,
      renderIfExpression: this.renderIfExpression,
      renderType: {
        Atom: isAtomRef(this.renderType)
          ? connectNodeId(this.renderType.id)
          : undefined,
        Component: isComponent(this.renderType)
          ? connectNodeId(this.renderType.id)
          : undefined,
      },
      style: this.style,
      tailwindClassNames: this.tailwindClassNames,
    }
  }

  @modelAction
  toUpdateNodesInput(): Pick<
    ElementUpdateInput,
    | 'compositeKey'
    | 'firstChild'
    | 'nextSibling'
    | 'parentElement'
    | 'prevSibling'
  > {
    return {
      compositeKey: ElementProperties.elementCompositeKey(
        this.name,
        this.closestContainerNode,
      ),
      firstChild: reconnectNodeId(this.firstChild?.id),
      nextSibling: reconnectNodeId(this.nextSibling?.id),
      parentElement: reconnectNodeId(this.parentElement?.id),
      prevSibling: reconnectNodeId(this.prevSibling?.id),
    }
  }

  @modelAction
  writeCache({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    firstChild,
    name,
    nextSibling,
    parentComponent,
    parentElement,
    postRenderAction,
    preRenderAction,
    prevSibling,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
  }: Partial<IElementDTO>) {
    this.name = name ?? this.name
    this.style = style ?? this.style
    this.renderIfExpression = renderIfExpression ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.renderType = renderType ? getRenderType(renderType) : this.renderType
    this.props = props?.id ? propRef(props.id) : this.props
    this.childMapperPropKey = childMapperPropKey ?? null
    this.parentElement = parentElement?.id
      ? elementRef(parentElement.id)
      : this.parentElement
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
      : this.parentComponent
    this.preRenderAction = preRenderAction
      ? actionRef(preRenderAction.id)
      : null
    this.postRenderAction = postRenderAction
      ? actionRef(postRenderAction.id)
      : null
    this.childMapperComponent = childMapperComponent
      ? componentRef(childMapperComponent.id)
      : null
    this.childMapperPreviousSibling = childMapperPreviousSibling
      ? elementRef(childMapperPreviousSibling.id)
      : null

    validateElement(this)

    return this
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get renderService() {
    return getRenderService(this)
  }
}
