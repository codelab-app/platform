import type {
  ElementCssRules,
  IAction,
  IAtomModel,
  IComponentModel,
  IElementRenderType,
  IElementRuntimeProp,
  IHook,
  IPageModel,
  IProp,
  IPropData,
  IStore,
  RenderingError,
  RenderingMetadata,
} from '@codelab/frontend/abstract/core'
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
  isAtomInstance,
  isComponentInstance,
  pageRef,
  propRef,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { schemaTransformer } from '@codelab/frontend/domain/type'
import { createValidator } from '@codelab/frontend/presentation/view'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { type IElementDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
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
  prop,
  Ref,
} from 'mobx-keystone'
import {
  getRenderType,
  jsonStringToCss,
  parseCssStringIntoObject,
} from './utils'

const create = ({
  childMapperComponent,
  childMapperPreviousSibling,
  childMapperPropKey,
  firstChild,
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
  renderForEachPropKey,
  renderIfExpression,
  renderType,
  style,
}: IElementDTO) => {
  const elementRenderType = getRenderType(renderType)

  return new Element({
    _page: page ? pageRef(page.id) : null,
    _parentComponent: parentComponent ? componentRef(parentComponent.id) : null,
    childMapperComponent: childMapperComponent
      ? componentRef(childMapperComponent.id)
      : null,
    childMapperPreviousSibling: childMapperPreviousSibling
      ? elementRef(childMapperPreviousSibling.id)
      : null,
    childMapperPropKey,
    firstChild: firstChild?.id ? elementRef(firstChild.id) : undefined,
    id,
    name,
    nextSibling: nextSibling?.id ? elementRef(nextSibling.id) : undefined,

    // parent of first child
    parent: parent?.id ? elementRef(parent.id) : undefined,
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
    renderType: elementRenderType,
    style,
  })
}

@model('@codelab/Element')
export class Element
  extends Model({
    // page which has this element as rootElement
    _page: prop<Nullable<Ref<IPageModel>>>(null),
    // component which has this element as rootElement
    _parentComponent: prop<Nullable<Ref<IComponentModel>>>(null),
    childMapperComponent:
      prop<Nullable<Ref<IComponentModel>>>(null).withSetter(),
    childMapperPreviousSibling:
      prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    childMapperPropKey: prop<Nullable<string>>(null).withSetter(),
    firstChild: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    // Marks the element as an instance of a specific component
    // renderComponentType: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
    hooks: prop<Array<IHook>>(() => []),
    id: idProp.withSetter(),
    name: prop<string>().withSetter(),
    nextSibling: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    orderInParent: prop<Nullable<number>>(null).withSetter(),
    owner: prop<Nullable<IEntity>>(null),
    // Data used for tree initializing, before our Element model is ready
    parent: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    postRenderAction: prop<Nullable<Ref<IAction>>>(null).withSetter(),
    preRenderAction: prop<Nullable<Ref<IAction>>>(null).withSetter(),
    prevSibling: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    props: prop<Ref<IProp>>().withSetter(),
    renderForEachPropKey: prop<Nullable<string>>(null).withSetter(),
    renderIfExpression: prop<Nullable<string>>(null).withSetter(),
    renderingMetadata: prop<Nullable<RenderingMetadata>>(null),
    // atom: prop<Nullable<Ref<IAtom>>>(null).withSetter(),
    renderType: prop<IElementRenderType | null>(null).withSetter(),
    // if this is a duplicate, trace source element id else null
    sourceElement: prop<Nullable<IEntity>>(null).withSetter(),
    style: prop<Nullable<string>>(null).withSetter(),
  })
  implements IElementModel
{
  @computed
  get componentService() {
    return getComponentService(this)
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get renderService() {
    return getRenderService(this)
  }

  @computed
  get propService() {
    return getPropService(this)
  }

  @computed
  get builderService() {
    return getBuilderService(this)
  }

  @computed
  get closestRootElement(): IElementModel {
    return this.closestParent
      ? this.closestParent.closestRootElement
      : (this as IElementModel)
  }

  @computed
  get parentComponent(): Nullable<Ref<IComponentModel>> {
    return this.closestParent?.parentComponent ?? this._parentComponent
  }

  @computed
  get page(): Nullable<Ref<IPageModel>> {
    return this.closestParent?.page ?? this._page
  }

  @computed
  get closestContainerNode(): IComponentModel | IPageModel {
    const closestNode = this.page || this.parentComponent

    if (!closestNode) {
      throw new Error('Element has no node attached to')
    }

    return closestNode.current
  }

  @computed
  get store(): Ref<IStore> {
    return this.closestContainerNode.store
  }

  @computed
  get providerStore(): Ref<IStore> | undefined {
    return this.renderService.activeRenderer?.current.providerTree?.current
      .rootElement.current.store
  }

  @computed
  get urlProps(): IPropData | undefined {
    return this.renderService.activeRenderer?.current.urlSegments
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
  get closestParent(): IElementModel | null {
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

    return null
  }

  @computed
  get runtimeProp(): Maybe<IElementRuntimeProp> {
    return this.renderService.activeRenderer?.current.runtimeProps.get(
      this.id,
    ) as Maybe<IElementRuntimeProp>
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
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.runtimeProp?.evaluatedProps || {},
    }
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
  get slug(): string {
    return slugify(this.name)
  }

  get styleStringWithBreakpoints(): string {
    const parsedCss = this.styleParsed
    const activeRenderer = this.renderService.activeRenderer?.current
    const rendererType = activeRenderer?.rendererType
    const isProduction = rendererType === RendererType.Production
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
  get customCss() {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { cssString } = this.styleParsed[breakpoint] ?? {}

    return cssString
  }

  @computed
  get guiCss() {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { guiString } = this.styleParsed[breakpoint] ?? {}

    return guiString
  }

  @computed
  get styleParsed(): IElementStyle {
    return JSON.parse(this.style || '{}')
  }

  @modelAction
  setCustomCss(cssString: string) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    styleObject[breakpoint] = { ...styleObject[breakpoint], cssString }
    this.style = JSON.stringify(styleObject)
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
  setParentComponent(component: Ref<IComponentModel>) {
    this._parentComponent = component
  }

  @modelAction
  setPage(page: Ref<IPageModel>) {
    this._page = page
  }

  @modelAction
  setRenderingError(error: Nullish<RenderingError>) {
    this.renderingMetadata = {
      error,
    }
  }

  @computed
  get propsHaveErrors() {
    if (!this.renderType?.current.api?.current) {
      return false
    }

    const schema = schemaTransformer.transform(
      this.renderType.current.api.current,
    )

    const validate = createValidator(schema)
    const result = validate(this.props.current.values)

    return result ? result.details.length > 0 : false
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
  get label() {
    return (
      this.name ||
      this.renderType?.maybeCurrent?.name ||
      (isAtomInstance(this.renderType)
        ? compoundCaseToTitleCase((this.renderType.current as IAtomModel).type)
        : undefined) ||
      this.parentComponent?.maybeCurrent?.name ||
      ''
    )
  }

  @computed
  get treeTitle() {
    return {
      primary: this.label,
      secondary:
        this.renderType?.maybeCurrent?.name ||
        (isAtomInstance(this.renderType)
          ? compoundCaseToTitleCase(this.renderType.current.type)
          : undefined),
    }
  }

  /**
   * Internal system props for meta data, use double underline for system-defined identifiers.
   */
  @computed
  get __metadataProps() {
    return { [DATA_ELEMENT_ID]: this.id, key: this.id }
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
      rootKey: this.closestRootElement.id,
      secondaryTitle: this.treeTitle.secondary,
      title: `${this.treeTitle.primary} (${this.treeTitle.secondary})`,
    }
  }

  @computed
  get atomName() {
    if (isAtomInstance(this.renderType)) {
      return this.renderType.current.name || this.renderType.current.type
    }

    return ''
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
      compositeKey: ElementProperties.elementCompositeKey(
        this.name,
        this.closestContainerNode,
      ),
      id: this.id,
      props: {
        create: {
          node: this.props.current.toCreateInput(),
        },
      },
      renderAtomType,
      renderComponentType,
      style: this.style,
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
      renderAtomType,
      renderComponentType,
      renderForEachPropKey: this.renderForEachPropKey,
      renderIfExpression: this.renderIfExpression,
      style: this.style,
    }
  }

  @modelAction
  toUpdateNodesInput(): Pick<
    ElementUpdateInput,
    'compositeKey' | 'firstChild' | 'nextSibling' | 'parent' | 'prevSibling'
  > {
    return {
      compositeKey: ElementProperties.elementCompositeKey(
        this.name,
        this.closestContainerNode,
      ),
      firstChild: reconnectNodeId(this.firstChild?.id),
      nextSibling: reconnectNodeId(this.nextSibling?.id),
      parent: reconnectNodeId(this.parent?.id),
      prevSibling: reconnectNodeId(this.prevSibling?.id),
    }
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

  /**
   * This removes the `element` and attaches the siblings together
   *
   * (prevSibling)-[element]-(nextSibling)
   *
   * (prevSibling)-(nextSibling)
   */
  @modelAction
  connectPrevToNextSibling() {
    if (this.nextSibling) {
      this.nextSibling.current.prevSibling = this.prevSibling
        ? elementRef(this.prevSibling.current)
        : null
    }

    if (this.prevSibling) {
      this.prevSibling.current.nextSibling = this.nextSibling
        ? elementRef(this.nextSibling.current)
        : null
    }

    this.nextSibling = null
    this.prevSibling = null
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
    } else {
      this.parent.current.firstChild = null
    }

    this.parent = null
  }

  @modelAction
  detachAsFirstChild() {
    this.parent = null
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
  attachToParentAsFirstChild(parentElement: IElementModel) {
    parentElement.firstChild?.current.detachAsFirstChild()
    this.parent = elementRef(parentElement)
    parentElement.firstChild = elementRef(this.id)
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
  attachAsPrevSibling(sibling: IElementModel) {
    // Add element as as prevSibling
    sibling.prevSibling = elementRef(this)
    this.nextSibling = elementRef(sibling)
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
  attachAsNextSibling(sibling: IElementModel) {
    sibling.nextSibling = elementRef(this.id)
    this.prevSibling = elementRef(sibling.id)
  }

  @modelAction
  writeCache({
    childMapperComponent,
    childMapperPreviousSibling,
    childMapperPropKey,
    firstChild,
    name,
    nextSibling,
    parent,
    parentComponent,
    postRenderAction,
    preRenderAction,
    prevSibling,
    props,
    renderForEachPropKey,
    renderIfExpression,
    renderType,
    style,
  }: Partial<IElementDTO>) {
    const elementRenderType = getRenderType(renderType)

    this.name = name ?? this.name
    this.style = style ?? this.style
    this.renderIfExpression = renderIfExpression ?? null
    this.renderForEachPropKey = renderForEachPropKey ?? null
    this.renderType = elementRenderType ?? null
    this.props = props?.id ? propRef(props.id) : this.props
    this.childMapperPropKey = childMapperPropKey ?? null
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
    this._parentComponent = parentComponent
      ? componentRef(parentComponent.id)
      : this._parentComponent
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

    return this
  }
}
