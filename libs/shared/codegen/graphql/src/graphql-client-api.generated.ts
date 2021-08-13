import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Void: void
}

export type App = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
  pages: App
}

export type AppByIdFilter = {
  appId: Scalars['String']
}

export type AppByPageFilter = {
  pageId: Scalars['String']
}

export type ArrayType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
}

export type Atom = {
  id: Scalars['ID']
  type: AtomType
  name: Scalars['String']
  api: InterfaceType
}

export enum AtomType {
  AntDesignAffix = 'AntDesignAffix',
  AntDesignAlert = 'AntDesignAlert',
  AntDesignAnchor = 'AntDesignAnchor',
  AntDesignAnchorLink = 'AntDesignAnchorLink',
  AntDesignAutoComplete = 'AntDesignAutoComplete',
  AntDesignAvatar = 'AntDesignAvatar',
  AntDesignBackTop = 'AntDesignBackTop',
  AntDesignBadge = 'AntDesignBadge',
  AntDesignBreadcrumb = 'AntDesignBreadcrumb',
  AntDesignBreadcrumbItem = 'AntDesignBreadcrumbItem',
  AntDesignButton = 'AntDesignButton',
  AntDesignCalendar = 'AntDesignCalendar',
  AntDesignCard = 'AntDesignCard',
  AntDesignCardGrid = 'AntDesignCardGrid',
  AntDesignCardMeta = 'AntDesignCardMeta',
  AntDesignCarousel = 'AntDesignCarousel',
  AntDesignCascader = 'AntDesignCascader',
  AntDesignCheckbox = 'AntDesignCheckbox',
  AntDesignCollapse = 'AntDesignCollapse',
  AntDesignCollapsePanel = 'AntDesignCollapsePanel',
  AntDesignComment = 'AntDesignComment',
  AntDesignConfigProvider = 'AntDesignConfigProvider',
  AntDesignDatePicker = 'AntDesignDatePicker',
  AntDesignDescriptions = 'AntDesignDescriptions',
  AntDesignDescriptionsItem = 'AntDesignDescriptionsItem',
  AntDesignDivider = 'AntDesignDivider',
  AntDesignDrawer = 'AntDesignDrawer',
  AntDesignDropdown = 'AntDesignDropdown',
  AntDesignEmpty = 'AntDesignEmpty',
  AntDesignForm = 'AntDesignForm',
  AntDesignFormItem = 'AntDesignFormItem',
  AntDesignFormItemHook = 'AntDesignFormItemHook',
  AntDesignFormList = 'AntDesignFormList',
  AntDesignGridCol = 'AntDesignGridCol',
  AntDesignGridRow = 'AntDesignGridRow',
  AntDesignIcon = 'AntDesignIcon',
  AntDesignInput = 'AntDesignInput',
  AntDesignInputNumber = 'AntDesignInputNumber',
  AntDesignLayout = 'AntDesignLayout',
  AntDesignLayoutContent = 'AntDesignLayoutContent',
  AntDesignLayoutFooter = 'AntDesignLayoutFooter',
  AntDesignLayoutHeader = 'AntDesignLayoutHeader',
  AntDesignLayoutSider = 'AntDesignLayoutSider',
  AntDesignList = 'AntDesignList',
  AntDesignListItem = 'AntDesignListItem',
  AntDesignListItemMeta = 'AntDesignListItemMeta',
  AntDesignMapper = 'AntDesignMapper',
  AntDesignMentions = 'AntDesignMentions',
  AntDesignMentionsOption = 'AntDesignMentionsOption',
  AntDesignMenu = 'AntDesignMenu',
  AntDesignMenuItem = 'AntDesignMenuItem',
  AntDesignMenuItemGroup = 'AntDesignMenuItemGroup',
  AntDesignMenuSubMenu = 'AntDesignMenuSubMenu',
  AntDesignModal = 'AntDesignModal',
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
  AntDesignSelect = 'AntDesignSelect',
  AntDesignSelectOption = 'AntDesignSelectOption',
  AntDesignSkeleton = 'AntDesignSkeleton',
  AntDesignSlider = 'AntDesignSlider',
  AntDesignSpace = 'AntDesignSpace',
  AntDesignSpin = 'AntDesignSpin',
  AntDesignStatistic = 'AntDesignStatistic',
  AntDesignSteps = 'AntDesignSteps',
  AntDesignStepsStep = 'AntDesignStepsStep',
  AntDesignSwitch = 'AntDesignSwitch',
  AntDesignTable = 'AntDesignTable',
  AntDesignTabs = 'AntDesignTabs',
  AntDesignTabsTabPane = 'AntDesignTabsTabPane',
  AntDesignTag = 'AntDesignTag',
  AntDesignTimePicker = 'AntDesignTimePicker',
  AntDesignTimeline = 'AntDesignTimeline',
  AntDesignTimelineItem = 'AntDesignTimelineItem',
  AntDesignTooltip = 'AntDesignTooltip',
  AntDesignTransfer = 'AntDesignTransfer',
  AntDesignTree = 'AntDesignTree',
  AntDesignTreeNode = 'AntDesignTreeNode',
  AntDesignTreeSelect = 'AntDesignTreeSelect',
  AntDesignTypography = 'AntDesignTypography',
  AntDesignTypographyParagraph = 'AntDesignTypographyParagraph',
  AntDesignTypographyText = 'AntDesignTypographyText',
  AntDesignTypographyTitle = 'AntDesignTypographyTitle',
  AntDesignUpload = 'AntDesignUpload',
  AntDesignImage = 'AntDesignImage',
  Query = 'Query',
  TextList = 'TextList',
  Text = 'Text',
  State = 'State',
  PropMapper = 'PropMapper',
  Mapper = 'Mapper',
  ReactFragment = 'ReactFragment',
  HtmlA = 'HtmlA',
  HtmlP = 'HtmlP',
  HtmlVideo = 'HtmlVideo',
  HtmlUList = 'HtmlUList',
  HtmlTrack = 'HtmlTrack',
  HtmlTitle = 'HtmlTitle',
  HtmlTime = 'HtmlTime',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTable = 'HtmlTable',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlStyle = 'HtmlStyle',
  HtmlSpan = 'HtmlSpan',
  HtmlSource = 'HtmlSource',
  HtmlSelect = 'HtmlSelect',
  HtmlQuote = 'HtmlQuote',
  HtmlProgress = 'HtmlProgress',
  HtmlPre = 'HtmlPre',
  HtmlPicture = 'HtmlPicture',
  HtmlParam = 'HtmlParam',
  HtmlOutput = 'HtmlOutput',
  HtmlOption = 'HtmlOption',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlObject = 'HtmlObject',
  HtmlOList = 'HtmlOList',
  HtmlMeter = 'HtmlMeter',
  HtmlMeta = 'HtmlMeta',
  HtmlMap = 'HtmlMap',
  HtmlLink = 'HtmlLink',
  HtmlLegend = 'HtmlLegend',
  HtmlLabel = 'HtmlLabel',
  HtmlLi = 'HtmlLi',
  HtmlInput = 'HtmlInput',
  HtmlImage = 'HtmlImage',
  HtmlIframe = 'HtmlIframe',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHr = 'HtmlHr',
  HtmlFrameset = 'HtmlFrameset',
  HtmlFrame = 'HtmlFrame',
  HtmlForm = 'HtmlForm',
  HtmlFont = 'HtmlFont',
  HtmlFieldset = 'HtmlFieldset',
  HtmlEmbed = 'HtmlEmbed',
  HtmlDiv = 'HtmlDiv',
  HtmlDialog = 'HtmlDialog',
  HtmlDetails = 'HtmlDetails',
  HtmlDatalist = 'HtmlDatalist',
  HtmlData = 'HtmlData',
  HtmlDList = 'HtmlDList',
  HtmlCanvas = 'HtmlCanvas',
  HtmlButton = 'HtmlButton',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlAudio = 'HtmlAudio',
  HtmlArea = 'HtmlArea',
  HtmlFooter = 'HtmlFooter',
  HtmlAside = 'HtmlAside',
  HtmlHeader = 'HtmlHeader',
  HtmlMain = 'HtmlMain',
  HtmlNav = 'HtmlNav',
  HtmlSection = 'HtmlSection',
  HtmlCode = 'HtmlCode',
  HtmlEm = 'HtmlEm',
  HtmlI = 'HtmlI',
  HtmlS = 'HtmlS',
  HtmlSmall = 'HtmlSmall',
  HtmlStrong = 'HtmlStrong',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
}

export type AtomWhereUniqueInput = {
  id?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
  element?: Maybe<Scalars['String']>
}

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
}

/** The ComponentType allows selecting a Component in the props form. The value is stored as the componentId  */
export type ComponentType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
}

export type CreateAppInput = {
  name: Scalars['String']
}

export type CreateArrayTypeInput = {
  itemTypeId: Scalars['String']
}

export type CreateAtomInput = {
  name: Scalars['String']
  type: AtomType
}

export type CreateComponentInput = {
  name: Scalars['String']
}

export type CreateElementInput = {
  name?: Maybe<Scalars['String']>
  atomId?: Maybe<Scalars['String']>
  componentId?: Maybe<Scalars['String']>
  parentElementId?: Maybe<Scalars['String']>
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>
}

export type CreateElementTypeInput = {
  kind: ElementTypeKind
}

export type CreateEnumTypeInput = {
  allowedValues: Array<CreateEnumTypeValueInput>
}

export type CreateEnumTypeValueInput = {
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type CreateFieldInput = {
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** The interface to add fields to */
  interfaceId: Scalars['String']
  type: TypeRef
}

export type CreateLambdaInput = {
  /** Name of the Lambda function to be executed */
  name: Scalars['String']
  /** Content of the Lambda function */
  body: Scalars['String']
}

export type CreatePageInput = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type CreatePrimitiveTypeInput = {
  primitiveKind: PrimitiveKind
}

export type CreateResponse = {
  id: Scalars['String']
}

export type CreateTagInput = {
  name: Scalars['String']
  parentTagId?: Maybe<Scalars['String']>
}

/** Provide one of the properties */
export type CreateTypeInput = {
  name: Scalars['String']
  primitiveType?: Maybe<CreatePrimitiveTypeInput>
  arrayType?: Maybe<CreateArrayTypeInput>
  enumType?: Maybe<CreateEnumTypeInput>
  interfaceType?: Maybe<Scalars['Boolean']>
  lambdaType?: Maybe<Scalars['Boolean']>
  componentType?: Maybe<Scalars['Boolean']>
  elementType?: Maybe<CreateElementTypeInput>
}

export type DeleteAppInput = {
  appId: Scalars['String']
}

export type DeleteAtomInput = {
  atomId: Scalars['String']
}

export type DeleteComponentInput = {
  componentId: Scalars['String']
}

export type DeleteElementInput = {
  elementId: Scalars['String']
}

export type DeleteFieldInput = {
  fieldId: Scalars['String']
}

export type DeleteLambdaInput = {
  lambdaId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type DeleteTagInput = {
  id: Scalars['String']
}

export type DeleteTypeInput = {
  typeId: Scalars['String']
}

export type DeleteUserInput = {
  userId: Scalars['String']
}

export type Element = {
  id: Scalars['ID']
  /** Due to union nullability issue, we have to make this non-nullable. Defaults to atom type */
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atom?: Maybe<Atom>
  /** Props in a json format */
  props: Scalars['String']
}

/** An edge between two element nodes */
export type ElementEdge = {
  /** The id of the source Element/Component */
  source: Scalars['String']
  /** The id of the target Element/Component */
  target: Scalars['String']
  order?: Maybe<Scalars['Int']>
}

export type ElementGraph = {
  /** All descendant Elements or Components, at any level */
  vertices: Array<ElementVertex>
  /** All the links connecting the descendant elements/components */
  edges: Array<ElementEdge>
}

/** The ElementType allows selecting an Element in the props form. The value is stored as the elementId  */
export type ElementType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
  kind: ElementTypeKind
}

export enum ElementTypeKind {
  AllElements = 'AllElements',
  DescendantsOnly = 'DescendantsOnly',
  ChildrenOnly = 'ChildrenOnly',
}

export type ElementVertex = Element | Component

export type EnumType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
  allowedValues: Array<EnumTypeValue>
}

export type EnumTypeValue = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type ExecuteLambdaInput = {
  lambdaId: Scalars['String']
  payload?: Maybe<Scalars['String']>
}

export type Field = {
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type FieldByIdFilter = {
  fieldId: Scalars['String']
}

export type FieldByInterfaceFilter = {
  interfaceId: Scalars['String']
  fieldKey: Scalars['String']
}

export type GetAppInput = {
  byId?: Maybe<AppByIdFilter>
  byPage?: Maybe<AppByPageFilter>
}

export type GetAtomInput = {
  where: AtomWhereUniqueInput
}

export type GetComponentInput = {
  componentId: Scalars['String']
}

export type GetComponentsInput = {
  componentIds?: Maybe<Array<Scalars['String']>>
}

export type GetElementGraphInput = {
  elementId: Scalars['String']
}

export type GetElementInput = {
  elementId: Scalars['String']
}

export type GetFieldInput = {
  byInterface?: Maybe<FieldByInterfaceFilter>
  byId?: Maybe<FieldByIdFilter>
}

export type GetLambdaInput = {
  lambdaId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type GetPagesInput = {
  byApp: PageByAppFilter
}

export type GetTagInput = {
  id: Scalars['String']
}

export type GetTypeInput = {
  where: WhereUniqueType
}

/** Filters are optional and you can provide all three of them together */
export type GetTypesInput = {
  byIds?: Maybe<TypesByIdsFilter>
  byKind?: Maybe<TypesByKindFilter>
  byName?: Maybe<TypesByNameFilter>
}

export type GetUsersInput = {
  page: Scalars['Int']
  perPage: Scalars['Int']
  query: Scalars['String']
  sort: Scalars['String']
}

export type InterfaceType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
}

export type Lambda = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
  body: Scalars['String']
}

export type LambdaPayload = {
  payload: Scalars['String']
}

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId  */
export type LambdaType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
}

export type MoveData = {
  order: Scalars['Int']
  parentElementId: Scalars['String']
}

export type MoveElementInput = {
  elementId: Scalars['String']
  moveData: MoveData
}

export type Mutation = {
  createApp: CreateResponse
  updateApp?: Maybe<Scalars['Void']>
  deleteApp?: Maybe<Scalars['Void']>
  updateUser: User
  deleteUser: Scalars['Boolean']
  createPage: CreateResponse
  deletePage?: Maybe<Scalars['Void']>
  updatePage?: Maybe<Scalars['Void']>
  createElement: CreateResponse
  updateElement?: Maybe<Scalars['Void']>
  moveElement?: Maybe<Scalars['Void']>
  updateElementProps?: Maybe<Scalars['Void']>
  /** Deletes an element and all the descending elements */
  deleteElement?: Maybe<Scalars['Void']>
  createComponent: CreateResponse
  updateComponent?: Maybe<Scalars['Void']>
  deleteComponent?: Maybe<Scalars['Void']>
  createAtom: CreateResponse
  deleteAtom?: Maybe<Scalars['Void']>
  updateAtom?: Maybe<Scalars['Void']>
  createField: CreateResponse
  updateField?: Maybe<Scalars['Void']>
  deleteField?: Maybe<Scalars['Void']>
  createType: CreateResponse
  updateEnumType?: Maybe<Scalars['Void']>
  updatePrimitiveType?: Maybe<Scalars['Void']>
  updateType?: Maybe<Scalars['Void']>
  deleteType?: Maybe<Scalars['Void']>
  createLambda: Lambda
  deleteLambda?: Maybe<Scalars['Void']>
  updateLambda?: Maybe<Lambda>
  executeLambda?: Maybe<LambdaPayload>
  createTag: CreateResponse
  updateTag?: Maybe<Scalars['Void']>
  deleteTag?: Maybe<Scalars['Void']>
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationCreateElementArgs = {
  input: CreateElementInput
}

export type MutationUpdateElementArgs = {
  input: UpdateElementInput
}

export type MutationMoveElementArgs = {
  input: MoveElementInput
}

export type MutationUpdateElementPropsArgs = {
  input: UpdateElementPropsInput
}

export type MutationDeleteElementArgs = {
  input: DeleteElementInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationUpdateComponentArgs = {
  input: UpdateComponentInput
}

export type MutationDeleteComponentArgs = {
  input: DeleteComponentInput
}

export type MutationCreateAtomArgs = {
  input: CreateAtomInput
}

export type MutationDeleteAtomArgs = {
  input: DeleteAtomInput
}

export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput
}

export type MutationCreateFieldArgs = {
  input: CreateFieldInput
}

export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput
}

export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput
}

export type MutationCreateTypeArgs = {
  input: CreateTypeInput
}

export type MutationUpdateEnumTypeArgs = {
  input: UpdateEnumTypeInput
}

export type MutationUpdatePrimitiveTypeArgs = {
  input: UpdatePrimitiveTypeInput
}

export type MutationUpdateTypeArgs = {
  input: UpdateTypeInput
}

export type MutationDeleteTypeArgs = {
  input: DeleteTypeInput
}

export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput
}

export type MutationDeleteLambdaArgs = {
  input: DeleteLambdaInput
}

export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput
}

export type MutationExecuteLambdaArgs = {
  input: ExecuteLambdaInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type MutationDeleteTagArgs = {
  input: DeleteTagInput
}

export type Page = {
  id: Scalars['ID']
  name: Scalars['String']
  elements?: Maybe<ElementGraph>
}

export type PageByAppFilter = {
  appId: Scalars['String']
}

export enum PrimitiveKind {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
}

export type PrimitiveType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
  primitiveKind: PrimitiveKind
}

export type Query = {
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getUsers: Array<User>
  getPages: Array<Page>
  getPage?: Maybe<Page>
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge */
  getElementGraph?: Maybe<ElementGraph>
  /** Get a single element. */
  getElement?: Maybe<Element>
  getComponent?: Maybe<Component>
  getComponentElements?: Maybe<ElementGraph>
  getComponents: Array<Component>
  getAtoms: Array<Atom>
  getAtom?: Maybe<Atom>
  getField?: Maybe<Field>
  getType?: Maybe<Type>
  getTypeGraph?: Maybe<TypeGraph>
  getTypes: Array<Type>
  getLambda?: Maybe<Lambda>
  getLambdas: Array<Lambda>
  getTag: Tag
  getTags: Array<Tag>
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraph?: Maybe<TagGraph>
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetElementGraphArgs = {
  input: GetElementGraphInput
}

export type QueryGetElementArgs = {
  input: GetElementInput
}

export type QueryGetComponentArgs = {
  input: GetComponentInput
}

export type QueryGetComponentElementsArgs = {
  input: GetComponentInput
}

export type QueryGetComponentsArgs = {
  input?: Maybe<GetComponentsInput>
}

export type QueryGetAtomArgs = {
  input: GetAtomInput
}

export type QueryGetFieldArgs = {
  input: GetFieldInput
}

export type QueryGetTypeArgs = {
  input: GetTypeInput
}

export type QueryGetTypeGraphArgs = {
  input: GetTypeInput
}

export type QueryGetTypesArgs = {
  input?: Maybe<GetTypesInput>
}

export type QueryGetLambdaArgs = {
  input: GetLambdaInput
}

export type QueryGetTagArgs = {
  input: GetTagInput
}

export type QueryGetTagGraphArgs = {
  input: GetTagInput
}

export type Tag = {
  id: Scalars['String']
  name: Scalars['String']
}

/** An edge between two element nodes */
export type TagEdge = {
  /** The id of the source Tag */
  source: Scalars['String']
  /** The id of the target Tag */
  target: Scalars['String']
  order?: Maybe<Scalars['Int']>
}

export type TagGraph = {
  /** All descendant Elements or Components, at any level */
  vertices: Array<TagVertex>
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>
}

export type TagVertex = Tag

export type Type = {
  id: Scalars['ID']
  name: Scalars['String']
  typeKind: TypeKindFilter
}

/**
 * A edge between types. Depending on the kind can mean a couple of things:
 *   TypeEdgeKind.Field - it represents a Field object, the field property will contain the metadata;
 *   TypeEdgeKind.ArrayItem - it represents the generic array item type of an array type. The field property will be empty
 */
export type TypeEdge = {
  source: Scalars['String']
  target: Scalars['String']
  kind: TypeEdgeKind
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: Maybe<Field>
}

export enum TypeEdgeKind {
  Field = 'Field',
  ArrayItem = 'ArrayItem',
}

export type TypeGraph = {
  vertices: Array<Type>
  edges: Array<TypeEdge>
}

export enum TypeKindFilter {
  PrimitiveType = 'PrimitiveType',
  ArrayType = 'ArrayType',
  InterfaceType = 'InterfaceType',
  EnumType = 'EnumType',
  LambdaType = 'LambdaType',
  ElementType = 'ElementType',
  ComponentType = 'ComponentType',
}

export type TypeRef = {
  existingTypeId?: Maybe<Scalars['String']>
  newType?: Maybe<CreateTypeInput>
}

export type TypesByIdsFilter = {
  typeIds: Array<Scalars['String']>
}

export type TypesByKindFilter = {
  kind: TypeKindFilter
}

export type TypesByNameFilter = {
  name: Scalars['String']
}

export type UpdateAppData = {
  name: Scalars['String']
}

export type UpdateAppInput = {
  id: Scalars['String']
  data: UpdateAppData
}

export type UpdateAtomInput = {
  id: Scalars['String']
  data: CreateAtomInput
}

export type UpdateComponentData = {
  name: Scalars['String']
}

export type UpdateComponentInput = {
  componentId: Scalars['String']
  updateData: UpdateComponentData
}

export type UpdateElementData = {
  name?: Maybe<Scalars['String']>
  atomId?: Maybe<Scalars['String']>
  componentId?: Maybe<Scalars['String']>
  css?: Maybe<Scalars['String']>
}

export type UpdateElementInput = {
  data: UpdateElementData
  id: Scalars['String']
}

export type UpdateElementPropsInput = {
  props: Scalars['String']
  elementId: Scalars['String']
}

export type UpdateEnumTypeData = {
  allowedValues: Array<UpdateEnumTypeValueData>
  name: Scalars['String']
}

export type UpdateEnumTypeInput = {
  typeId: Scalars['String']
  updateData: UpdateEnumTypeData
}

export type UpdateEnumTypeValueData = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type UpdateFieldData = {
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: TypeRef
}

export type UpdateFieldInput = {
  fieldId: Scalars['String']
  updateData: UpdateFieldData
}

export type UpdateLambdaInput = {
  /** Name of the Lambda function to be executed */
  name: Scalars['String']
  /** Content of the Lambda function */
  body: Scalars['String']
  id: Scalars['String']
}

export type UpdatePageData = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type UpdatePageInput = {
  pageId: Scalars['String']
  updateData: UpdatePageData
}

export type UpdatePrimitiveKindData = {
  primitiveKind: PrimitiveKind
  name: Scalars['String']
}

export type UpdatePrimitiveTypeInput = {
  typeId: Scalars['String']
  updateData: UpdatePrimitiveKindData
}

export type UpdateTagData = {
  name: Scalars['String']
}

export type UpdateTagInput = {
  id: Scalars['String']
  data: UpdateTagData
}

export type UpdateTypeData = {
  name: Scalars['String']
}

export type UpdateTypeInput = {
  updateData: UpdateTypeData
  typeId: Scalars['String']
}

export type UpdateUserData = {
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  userId: Scalars['String']
  updateData: UpdateUserData
}

export type User = {
  blocked?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_verified?: Maybe<Scalars['Boolean']>
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  last_ip?: Maybe<Scalars['String']>
  last_login?: Maybe<Scalars['String']>
  last_password_reset?: Maybe<Scalars['String']>
  logins_count?: Maybe<Scalars['Float']>
  multifactor?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  phone_verified?: Maybe<Scalars['Boolean']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type WhereUniqueType = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type CreateAppMutationVariables = Exact<{
  input: CreateAppInput
}>

export type CreateAppMutation = { createApp: { id: string } }

export type DeleteAppMutationVariables = Exact<{
  input: DeleteAppInput
}>

export type DeleteAppMutation = { deleteApp?: Maybe<void> }

export type GetAppQueryVariables = Exact<{
  input: GetAppInput
}>

export type GetAppQuery = { getApp?: Maybe<{ id: string; name: string }> }

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { apps: Array<{ id: string; name: string }> }

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { updateApp?: Maybe<void> }

export type GetElementGraphQueryVariables = Exact<{
  input: GetElementGraphInput
}>

export type GetElementGraphQuery = {
  getElementGraph?: Maybe<{
    vertices: Array<
      | {
          __typename: 'Element'
          id: string
          name: string
          css?: Maybe<string>
          props: string
          atom?: Maybe<{
            id: string
            name: string
            type: AtomType
            api: { id: string; name: string }
          }>
        }
      | { __typename: 'Component'; id: string; name: string }
    >
    edges: Array<{ order?: Maybe<number>; source: string; target: string }>
  }>
}

export type GetElementQueryVariables = Exact<{
  input: GetElementInput
}>

export type GetElementQuery = {
  getElement?: Maybe<{
    __typename: 'Element'
    id: string
    name: string
    css?: Maybe<string>
    props: string
    atom?: Maybe<{
      id: string
      name: string
      type: AtomType
      api: { id: string; name: string }
    }>
  }>
}

export type __LambdaFragment = {
  id: string
  name: string
  body: string
  ownerId: string
}

export type __LambdaPayloadFragment = { payload: string }

export type CreateLambdaMutationVariables = Exact<{
  input: CreateLambdaInput
}>

export type CreateLambdaMutation = {
  createLambda: { id: string; name: string; body: string; ownerId: string }
}

export type DeleteLambdaMutationVariables = Exact<{
  input: DeleteLambdaInput
}>

export type DeleteLambdaMutation = { deleteLambda?: Maybe<void> }

export type ExecuteLambdaMutationVariables = Exact<{
  input: ExecuteLambdaInput
}>

export type ExecuteLambdaMutation = {
  executeLambda?: Maybe<{ payload: string }>
}

export type GetLambdaQueryVariables = Exact<{
  input: GetLambdaInput
}>

export type GetLambdaQuery = {
  getLambda?: Maybe<{ id: string; name: string; body: string; ownerId: string }>
}

export type GetLambdasQueryVariables = Exact<{ [key: string]: never }>

export type GetLambdasQuery = {
  getLambdas: Array<{ id: string; name: string; body: string; ownerId: string }>
}

export type UpdateLambdaMutationVariables = Exact<{
  input: UpdateLambdaInput
}>

export type UpdateLambdaMutation = {
  updateLambda?: Maybe<{
    id: string
    name: string
    body: string
    ownerId: string
  }>
}

export type __TagFragment = { id: string; name: string }

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput
}>

export type CreateTagMutation = { createTag: { id: string } }

export type DeleteTagMutationVariables = Exact<{
  input: DeleteTagInput
}>

export type DeleteTagMutation = { deleteTag?: Maybe<void> }

export type GetTagQueryVariables = Exact<{
  input: GetTagInput
}>

export type GetTagQuery = { getTag: { id: string; name: string } }

export type GetTagsQueryVariables = Exact<{ [key: string]: never }>

export type GetTagsQuery = { getTags: Array<{ id: string; name: string }> }

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput
}>

export type UpdateTagMutation = { updateTag?: Maybe<void> }

export type __AppFragment = { id: string; name: string }

export type __AtomFragment = {
  id: string
  name: string
  type: AtomType
  api: { id: string; name: string }
}

export type CreateAtomMutationVariables = Exact<{
  input: CreateAtomInput
}>

export type CreateAtomMutation = { createAtom: { id: string } }

export type DeleteAtomMutationVariables = Exact<{
  input: DeleteAtomInput
}>

export type DeleteAtomMutation = { deleteAtom?: Maybe<void> }

export type GetAtomQueryVariables = Exact<{
  input: GetAtomInput
}>

export type GetAtomQuery = {
  atom?: Maybe<{
    id: string
    name: string
    type: AtomType
    api: { id: string; name: string }
  }>
}

export type GetAtomsQueryVariables = Exact<{ [key: string]: never }>

export type GetAtomsQuery = {
  atoms: Array<{
    id: string
    name: string
    type: AtomType
    api: { id: string; name: string }
  }>
}

export type UpdateAtomMutationVariables = Exact<{
  input: UpdateAtomInput
}>

export type UpdateAtomMutation = { updateAtom?: Maybe<void> }

export type ComponentFragment = {
  __typename: 'Component'
  id: string
  name: string
}

export type CreateComponentMutationVariables = Exact<{
  input: CreateComponentInput
}>

export type CreateComponentMutation = { createComponent: { id: string } }

export type DeleteComponentMutationVariables = Exact<{
  input: DeleteComponentInput
}>

export type DeleteComponentMutation = { deleteComponent?: Maybe<void> }

export type GetComponentElementsQueryVariables = Exact<{
  input: GetComponentInput
}>

export type GetComponentElementsQuery = {
  getComponentElements?: Maybe<{
    vertices: Array<
      | {
          __typename: 'Element'
          id: string
          name: string
          css?: Maybe<string>
          props: string
          atom?: Maybe<{
            id: string
            name: string
            type: AtomType
            api: { id: string; name: string }
          }>
        }
      | { __typename: 'Component'; id: string; name: string }
    >
    edges: Array<{ order?: Maybe<number>; source: string; target: string }>
  }>
}

export type GetComponentQueryVariables = Exact<{
  input: GetComponentInput
}>

export type GetComponentQuery = {
  getComponent?: Maybe<{ __typename: 'Component'; id: string; name: string }>
}

export type GetComponentsQueryVariables = Exact<{ [key: string]: never }>

export type GetComponentsQuery = {
  getComponents: Array<{ __typename: 'Component'; id: string; name: string }>
}

export type UpdateComponentMutationVariables = Exact<{
  input: UpdateComponentInput
}>

export type UpdateComponentMutation = { updateComponent?: Maybe<void> }

export type ElementFragment = {
  __typename: 'Element'
  id: string
  name: string
  css?: Maybe<string>
  props: string
  atom?: Maybe<{
    id: string
    name: string
    type: AtomType
    api: { id: string; name: string }
  }>
}

export type ElementGraphFragment = {
  vertices: Array<
    | {
        __typename: 'Element'
        id: string
        name: string
        css?: Maybe<string>
        props: string
        atom?: Maybe<{
          id: string
          name: string
          type: AtomType
          api: { id: string; name: string }
        }>
      }
    | { __typename: 'Component'; id: string; name: string }
  >
  edges: Array<{ order?: Maybe<number>; source: string; target: string }>
}

export type ElementEdgeFragment = {
  order?: Maybe<number>
  source: string
  target: string
}

export type CreateElementMutationVariables = Exact<{
  input: CreateElementInput
}>

export type CreateElementMutation = { createElement: { id: string } }

export type DeleteElementMutationVariables = Exact<{
  input: DeleteElementInput
}>

export type DeleteElementMutation = { deleteElement?: Maybe<void> }

export type MoveElementMutationVariables = Exact<{
  input: MoveElementInput
}>

export type MoveElementMutation = { moveElement?: Maybe<void> }

export type UpdateElementPropsMutationVariables = Exact<{
  input: UpdateElementPropsInput
}>

export type UpdateElementPropsMutation = { updateElementProps?: Maybe<void> }

export type UpdateElementMutationVariables = Exact<{
  input: UpdateElementInput
}>

export type UpdateElementMutation = { updateElement?: Maybe<void> }

export type PageBaseFragment = { id: string; name: string }

export type PageFullFragment = {
  id: string
  name: string
  elements?: Maybe<{
    vertices: Array<
      | {
          __typename: 'Element'
          id: string
          name: string
          css?: Maybe<string>
          props: string
          atom?: Maybe<{
            id: string
            name: string
            type: AtomType
            api: { id: string; name: string }
          }>
        }
      | { __typename: 'Component'; id: string; name: string }
    >
    edges: Array<{ order?: Maybe<number>; source: string; target: string }>
  }>
}

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput
}>

export type CreatePageMutation = { createPage: { id: string } }

export type DeletePageMutationVariables = Exact<{
  input: DeletePageInput
}>

export type DeletePageMutation = { deletePage?: Maybe<void> }

export type GetPageQueryVariables = Exact<{
  input: GetPageInput
}>

export type GetPageQuery = {
  page?: Maybe<{
    id: string
    name: string
    elements?: Maybe<{
      vertices: Array<
        | {
            __typename: 'Element'
            id: string
            name: string
            css?: Maybe<string>
            props: string
            atom?: Maybe<{
              id: string
              name: string
              type: AtomType
              api: { id: string; name: string }
            }>
          }
        | { __typename: 'Component'; id: string; name: string }
      >
      edges: Array<{ order?: Maybe<number>; source: string; target: string }>
    }>
  }>
}

export type GetPagesQueryVariables = Exact<{
  input: GetPagesInput
}>

export type GetPagesQuery = { pages: Array<{ id: string; name: string }> }

export type UpdatePageMutationVariables = Exact<{
  input: UpdatePageInput
}>

export type UpdatePageMutation = { updatePage?: Maybe<void> }

export type __FieldFragment = {
  id: string
  key: string
  name?: Maybe<string>
  description?: Maybe<string>
}

export type __ArrayTypeFragment = { id: string; name: string }

export type __EnumTypeValueFragment = {
  id: string
  name?: Maybe<string>
  value: string
}

export type __LambdaTypeFragment = { id: string; name: string }

export type __ComponentTypeFragment = { id: string; name: string }

export type __ElementTypeFragment = {
  id: string
  name: string
  kind: ElementTypeKind
}

export type __EnumTypeFragment = {
  id: string
  name: string
  allowedValues: Array<{ id: string; name?: Maybe<string>; value: string }>
}

export type __PrimitiveTypeFragment = {
  id: string
  name: string
  primitiveKind: PrimitiveKind
}

type __Type_ArrayType_Fragment = {
  __typename: 'ArrayType'
  id: string
  name: string
  typeKind: TypeKindFilter
}

type __Type_ComponentType_Fragment = {
  __typename: 'ComponentType'
  id: string
  name: string
  typeKind: TypeKindFilter
}

type __Type_ElementType_Fragment = {
  __typename: 'ElementType'
  id: string
  name: string
  typeKind: TypeKindFilter
  kind: ElementTypeKind
}

type __Type_EnumType_Fragment = {
  __typename: 'EnumType'
  id: string
  name: string
  typeKind: TypeKindFilter
  allowedValues: Array<{ id: string; name?: Maybe<string>; value: string }>
}

type __Type_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
  typeKind: TypeKindFilter
}

type __Type_LambdaType_Fragment = {
  __typename: 'LambdaType'
  id: string
  name: string
  typeKind: TypeKindFilter
}

type __Type_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  id: string
  name: string
  typeKind: TypeKindFilter
  primitiveKind: PrimitiveKind
}

export type __TypeFragment =
  | __Type_ArrayType_Fragment
  | __Type_ComponentType_Fragment
  | __Type_ElementType_Fragment
  | __Type_EnumType_Fragment
  | __Type_InterfaceType_Fragment
  | __Type_LambdaType_Fragment
  | __Type_PrimitiveType_Fragment

export type __InterfaceFragment = { id: string; name: string }

export type __TypeGraphFragment = {
  edges: Array<{
    source: string
    target: string
    kind: TypeEdgeKind
    field?: Maybe<{
      id: string
      key: string
      name?: Maybe<string>
      description?: Maybe<string>
    }>
  }>
  vertices: Array<
    | {
        __typename: 'ArrayType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ComponentType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ElementType'
        id: string
        name: string
        typeKind: TypeKindFilter
        kind: ElementTypeKind
      }
    | {
        __typename: 'EnumType'
        id: string
        name: string
        typeKind: TypeKindFilter
        allowedValues: Array<{
          id: string
          name?: Maybe<string>
          value: string
        }>
      }
    | {
        __typename: 'InterfaceType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'LambdaType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'PrimitiveType'
        id: string
        name: string
        typeKind: TypeKindFilter
        primitiveKind: PrimitiveKind
      }
  >
}

export type __TypeEdgeFragment = {
  source: string
  target: string
  kind: TypeEdgeKind
  field?: Maybe<{
    id: string
    key: string
    name?: Maybe<string>
    description?: Maybe<string>
  }>
}

export type CreateFieldMutationVariables = Exact<{
  input: CreateFieldInput
}>

export type CreateFieldMutation = { createField: { id: string } }

export type DeleteFieldMutationVariables = Exact<{
  input: DeleteFieldInput
}>

export type DeleteFieldMutation = { deleteField?: Maybe<void> }

export type GetFieldQueryVariables = Exact<{
  input: GetFieldInput
}>

export type GetFieldQuery = {
  getField?: Maybe<{
    id: string
    key: string
    name?: Maybe<string>
    description?: Maybe<string>
  }>
}

export type UpdateFieldMutationVariables = Exact<{
  input: UpdateFieldInput
}>

export type UpdateFieldMutation = { updateField?: Maybe<void> }

export type CreateTypeMutationVariables = Exact<{
  input: CreateTypeInput
}>

export type CreateTypeMutation = { createType: { id: string } }

export type DeleteTypeMutationVariables = Exact<{
  input: DeleteTypeInput
}>

export type DeleteTypeMutation = { deleteType?: Maybe<void> }

export type GetTypeGraphQueryVariables = Exact<{
  input: GetTypeInput
}>

export type GetTypeGraphQuery = {
  getTypeGraph?: Maybe<{
    edges: Array<{
      source: string
      target: string
      kind: TypeEdgeKind
      field?: Maybe<{
        id: string
        key: string
        name?: Maybe<string>
        description?: Maybe<string>
      }>
    }>
    vertices: Array<
      | {
          __typename: 'ArrayType'
          id: string
          name: string
          typeKind: TypeKindFilter
        }
      | {
          __typename: 'ComponentType'
          id: string
          name: string
          typeKind: TypeKindFilter
        }
      | {
          __typename: 'ElementType'
          id: string
          name: string
          typeKind: TypeKindFilter
          kind: ElementTypeKind
        }
      | {
          __typename: 'EnumType'
          id: string
          name: string
          typeKind: TypeKindFilter
          allowedValues: Array<{
            id: string
            name?: Maybe<string>
            value: string
          }>
        }
      | {
          __typename: 'InterfaceType'
          id: string
          name: string
          typeKind: TypeKindFilter
        }
      | {
          __typename: 'LambdaType'
          id: string
          name: string
          typeKind: TypeKindFilter
        }
      | {
          __typename: 'PrimitiveType'
          id: string
          name: string
          typeKind: TypeKindFilter
          primitiveKind: PrimitiveKind
        }
    >
  }>
}

export type GetTypeQueryVariables = Exact<{
  input: GetTypeInput
}>

export type GetTypeQuery = {
  getType?: Maybe<
    | {
        __typename: 'ArrayType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ComponentType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ElementType'
        id: string
        name: string
        typeKind: TypeKindFilter
        kind: ElementTypeKind
      }
    | {
        __typename: 'EnumType'
        id: string
        name: string
        typeKind: TypeKindFilter
        allowedValues: Array<{
          id: string
          name?: Maybe<string>
          value: string
        }>
      }
    | {
        __typename: 'InterfaceType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'LambdaType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'PrimitiveType'
        id: string
        name: string
        typeKind: TypeKindFilter
        primitiveKind: PrimitiveKind
      }
  >
}

export type GetTypesQueryVariables = Exact<{
  input?: Maybe<GetTypesInput>
}>

export type GetTypesQuery = {
  getTypes: Array<
    | {
        __typename: 'ArrayType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ComponentType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'ElementType'
        id: string
        name: string
        typeKind: TypeKindFilter
        kind: ElementTypeKind
      }
    | {
        __typename: 'EnumType'
        id: string
        name: string
        typeKind: TypeKindFilter
        allowedValues: Array<{
          id: string
          name?: Maybe<string>
          value: string
        }>
      }
    | {
        __typename: 'InterfaceType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'LambdaType'
        id: string
        name: string
        typeKind: TypeKindFilter
      }
    | {
        __typename: 'PrimitiveType'
        id: string
        name: string
        typeKind: TypeKindFilter
        primitiveKind: PrimitiveKind
      }
  >
}

export type UpdateEnumTypeMutationVariables = Exact<{
  input: UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = { updateEnumType?: Maybe<void> }

export type UpdateTypeMutationVariables = Exact<{
  input: UpdateTypeInput
}>

export type UpdateTypeMutation = { updateType?: Maybe<void> }

export type UpdatePrimitiveTypeMutationVariables = Exact<{
  input: UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = { updatePrimitiveType?: Maybe<void> }

export type __UserFragment = {
  email?: Maybe<string>
  name?: Maybe<string>
  id?: Maybe<string>
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = { deleteUser: boolean }

export type GetUsersQueryVariables = Exact<{
  input?: Maybe<GetUsersInput>
}>

export type GetUsersQuery = {
  users: Array<{
    email?: Maybe<string>
    name?: Maybe<string>
    id?: Maybe<string>
  }>
}

export const __LambdaFragmentDoc = gql`
  fragment __Lambda on Lambda {
    id
    name
    body
    ownerId
  }
`
export const __LambdaPayloadFragmentDoc = gql`
  fragment __LambdaPayload on LambdaPayload {
    payload
  }
`
export const __TagFragmentDoc = gql`
  fragment __Tag on Tag {
    id
    name
  }
`
export const __AppFragmentDoc = gql`
  fragment __App on App {
    id
    name
  }
`
export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
  }
`
export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    __typename
    id
    name
  }
`
export const __InterfaceFragmentDoc = gql`
  fragment __Interface on InterfaceType {
    id
    name
  }
`
export const __AtomFragmentDoc = gql`
  fragment __Atom on Atom {
    id
    name
    type
    api {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    css
    atom {
      ...__Atom
    }
    props
  }
  ${__AtomFragmentDoc}
`
export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    order
    source
    target
  }
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    vertices {
      __typename
      ...Component
      ...Element
    }
    edges {
      ...ElementEdge
    }
  }
  ${ComponentFragmentDoc}
  ${ElementFragmentDoc}
  ${ElementEdgeFragmentDoc}
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
    elements {
      ...ElementGraph
    }
  }
  ${PageBaseFragmentDoc}
  ${ElementGraphFragmentDoc}
`
export const __FieldFragmentDoc = gql`
  fragment __Field on Field {
    id
    key
    name
    description
  }
`
export const __TypeEdgeFragmentDoc = gql`
  fragment __TypeEdge on TypeEdge {
    source
    target
    kind
    field {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`
export const __ArrayTypeFragmentDoc = gql`
  fragment __ArrayType on ArrayType {
    id
    name
  }
`
export const __EnumTypeValueFragmentDoc = gql`
  fragment __EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const __EnumTypeFragmentDoc = gql`
  fragment __EnumType on EnumType {
    id
    name
    allowedValues {
      ...__EnumTypeValue
    }
  }
  ${__EnumTypeValueFragmentDoc}
`
export const __PrimitiveTypeFragmentDoc = gql`
  fragment __PrimitiveType on PrimitiveType {
    id
    name
    primitiveKind
  }
`
export const __ElementTypeFragmentDoc = gql`
  fragment __ElementType on ElementType {
    id
    name
    kind
  }
`
export const __LambdaTypeFragmentDoc = gql`
  fragment __LambdaType on LambdaType {
    id
    name
  }
`
export const __ComponentTypeFragmentDoc = gql`
  fragment __ComponentType on ComponentType {
    id
    name
  }
`
export const __TypeFragmentDoc = gql`
  fragment __Type on Type {
    __typename
    id
    name
    typeKind
    ...__ArrayType
    ...__EnumType
    ...__Interface
    ...__PrimitiveType
    ...__ElementType
    ...__LambdaType
    ...__ComponentType
  }
  ${__ArrayTypeFragmentDoc}
  ${__EnumTypeFragmentDoc}
  ${__InterfaceFragmentDoc}
  ${__PrimitiveTypeFragmentDoc}
  ${__ElementTypeFragmentDoc}
  ${__LambdaTypeFragmentDoc}
  ${__ComponentTypeFragmentDoc}
`
export const __TypeGraphFragmentDoc = gql`
  fragment __TypeGraph on TypeGraph {
    edges {
      ...__TypeEdge
    }
    vertices {
      ...__Type
    }
  }
  ${__TypeEdgeFragmentDoc}
  ${__TypeFragmentDoc}
`
export const __UserFragmentDoc = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
    }
  }
`
export type CreateAppMutationFn = Apollo.MutationFunction<
  CreateAppMutation,
  CreateAppMutationVariables
>

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAppMutation,
    CreateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(
    CreateAppGql,
    options,
  )
}
export type CreateAppMutationHookResult = ReturnType<
  typeof useCreateAppMutation
>
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<
  CreateAppMutation,
  CreateAppMutationVariables
>
export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input)
  }
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  DeleteAppMutation,
  DeleteAppMutationVariables
>

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppGql,
    options,
  )
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  DeleteAppMutation,
  DeleteAppMutationVariables
>
export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(GetAppGql, options)
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppGql,
    options,
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export function refetchGetAppQuery(variables?: GetAppQueryVariables) {
  return { query: GetAppGql, variables: variables }
}
export const GetAppsGql = gql`
  query GetApps {
    apps: getApps {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export function useGetAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsQuery,
    GetAppsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>
export type GetAppsQueryResult = Apollo.QueryResult<
  GetAppsQuery,
  GetAppsQueryVariables
>
export function refetchGetAppsQuery(variables?: GetAppsQueryVariables) {
  return { query: GetAppsGql, variables: variables }
}
export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input)
  }
`
export type UpdateAppMutationFn = Apollo.MutationFunction<
  UpdateAppMutation,
  UpdateAppMutationVariables
>

/**
 * __useUpdateAppMutation__
 *
 * To run a mutation, you first call `useUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppMutation, { data, loading, error }] = useUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAppMutation,
    UpdateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(
    UpdateAppGql,
    options,
  )
}
export type UpdateAppMutationHookResult = ReturnType<
  typeof useUpdateAppMutation
>
export type UpdateAppMutationResult = Apollo.MutationResult<UpdateAppMutation>
export type UpdateAppMutationOptions = Apollo.BaseMutationOptions<
  UpdateAppMutation,
  UpdateAppMutationVariables
>
export const GetElementGraphGql = gql`
  query GetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`

/**
 * __useGetElementGraphQuery__
 *
 * To run a query within a React component, call `useGetElementGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetElementGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementGraphQuery, GetElementGraphQueryVariables>(
    GetElementGraphGql,
    options,
  )
}
export function useGetElementGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >(GetElementGraphGql, options)
}
export type GetElementGraphQueryHookResult = ReturnType<
  typeof useGetElementGraphQuery
>
export type GetElementGraphLazyQueryHookResult = ReturnType<
  typeof useGetElementGraphLazyQuery
>
export type GetElementGraphQueryResult = Apollo.QueryResult<
  GetElementGraphQuery,
  GetElementGraphQueryVariables
>
export function refetchGetElementGraphQuery(
  variables?: GetElementGraphQueryVariables,
) {
  return { query: GetElementGraphGql, variables: variables }
}
export const GetElementGql = gql`
  query GetElement($input: GetElementInput!) {
    getElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

/**
 * __useGetElementQuery__
 *
 * To run a query within a React component, call `useGetElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementQuery,
    GetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementQuery, GetElementQueryVariables>(
    GetElementGql,
    options,
  )
}
export function useGetElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementQuery,
    GetElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElementQuery, GetElementQueryVariables>(
    GetElementGql,
    options,
  )
}
export type GetElementQueryHookResult = ReturnType<typeof useGetElementQuery>
export type GetElementLazyQueryHookResult = ReturnType<
  typeof useGetElementLazyQuery
>
export type GetElementQueryResult = Apollo.QueryResult<
  GetElementQuery,
  GetElementQueryVariables
>
export function refetchGetElementQuery(variables?: GetElementQueryVariables) {
  return { query: GetElementGql, variables: variables }
}
export const CreateLambdaGql = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__LambdaFragmentDoc}
`
export type CreateLambdaMutationFn = Apollo.MutationFunction<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>

/**
 * __useCreateLambdaMutation__
 *
 * To run a mutation, you first call `useCreateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLambdaMutation, { data, loading, error }] = useCreateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >(CreateLambdaGql, options)
}
export type CreateLambdaMutationHookResult = ReturnType<
  typeof useCreateLambdaMutation
>
export type CreateLambdaMutationResult =
  Apollo.MutationResult<CreateLambdaMutation>
export type CreateLambdaMutationOptions = Apollo.BaseMutationOptions<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>
export const DeleteLambdaGql = gql`
  mutation DeleteLambda($input: DeleteLambdaInput!) {
    deleteLambda(input: $input)
  }
`
export type DeleteLambdaMutationFn = Apollo.MutationFunction<
  DeleteLambdaMutation,
  DeleteLambdaMutationVariables
>

/**
 * __useDeleteLambdaMutation__
 *
 * To run a mutation, you first call `useDeleteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLambdaMutation, { data, loading, error }] = useDeleteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteLambdaMutation,
    DeleteLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteLambdaMutation,
    DeleteLambdaMutationVariables
  >(DeleteLambdaGql, options)
}
export type DeleteLambdaMutationHookResult = ReturnType<
  typeof useDeleteLambdaMutation
>
export type DeleteLambdaMutationResult =
  Apollo.MutationResult<DeleteLambdaMutation>
export type DeleteLambdaMutationOptions = Apollo.BaseMutationOptions<
  DeleteLambdaMutation,
  DeleteLambdaMutationVariables
>
export const ExecuteLambdaGql = gql`
  mutation ExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...__LambdaPayload
    }
  }
  ${__LambdaPayloadFragmentDoc}
`
export type ExecuteLambdaMutationFn = Apollo.MutationFunction<
  ExecuteLambdaMutation,
  ExecuteLambdaMutationVariables
>

/**
 * __useExecuteLambdaMutation__
 *
 * To run a mutation, you first call `useExecuteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeLambdaMutation, { data, loading, error }] = useExecuteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ExecuteLambdaMutation,
    ExecuteLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ExecuteLambdaMutation,
    ExecuteLambdaMutationVariables
  >(ExecuteLambdaGql, options)
}
export type ExecuteLambdaMutationHookResult = ReturnType<
  typeof useExecuteLambdaMutation
>
export type ExecuteLambdaMutationResult =
  Apollo.MutationResult<ExecuteLambdaMutation>
export type ExecuteLambdaMutationOptions = Apollo.BaseMutationOptions<
  ExecuteLambdaMutation,
  ExecuteLambdaMutationVariables
>
export const GetLambdaGql = gql`
  query GetLambda($input: GetLambdaInput!) {
    getLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__LambdaFragmentDoc}
`

/**
 * __useGetLambdaQuery__
 *
 * To run a query within a React component, call `useGetLambdaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdaQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLambdaQuery(
  baseOptions: Apollo.QueryHookOptions<GetLambdaQuery, GetLambdaQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLambdaQuery, GetLambdaQueryVariables>(
    GetLambdaGql,
    options,
  )
}
export function useGetLambdaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdaQuery,
    GetLambdaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLambdaQuery, GetLambdaQueryVariables>(
    GetLambdaGql,
    options,
  )
}
export type GetLambdaQueryHookResult = ReturnType<typeof useGetLambdaQuery>
export type GetLambdaLazyQueryHookResult = ReturnType<
  typeof useGetLambdaLazyQuery
>
export type GetLambdaQueryResult = Apollo.QueryResult<
  GetLambdaQuery,
  GetLambdaQueryVariables
>
export function refetchGetLambdaQuery(variables?: GetLambdaQueryVariables) {
  return { query: GetLambdaGql, variables: variables }
}
export const GetLambdasGql = gql`
  query GetLambdas {
    getLambdas {
      ...__Lambda
    }
  }
  ${__LambdaFragmentDoc}
`

/**
 * __useGetLambdasQuery__
 *
 * To run a query within a React component, call `useGetLambdasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLambdasQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLambdasQuery,
    GetLambdasQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLambdasQuery, GetLambdasQueryVariables>(
    GetLambdasGql,
    options,
  )
}
export function useGetLambdasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdasQuery,
    GetLambdasQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLambdasQuery, GetLambdasQueryVariables>(
    GetLambdasGql,
    options,
  )
}
export type GetLambdasQueryHookResult = ReturnType<typeof useGetLambdasQuery>
export type GetLambdasLazyQueryHookResult = ReturnType<
  typeof useGetLambdasLazyQuery
>
export type GetLambdasQueryResult = Apollo.QueryResult<
  GetLambdasQuery,
  GetLambdasQueryVariables
>
export function refetchGetLambdasQuery(variables?: GetLambdasQueryVariables) {
  return { query: GetLambdasGql, variables: variables }
}
export const UpdateLambdaGql = gql`
  mutation UpdateLambda($input: UpdateLambdaInput!) {
    updateLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__LambdaFragmentDoc}
`
export type UpdateLambdaMutationFn = Apollo.MutationFunction<
  UpdateLambdaMutation,
  UpdateLambdaMutationVariables
>

/**
 * __useUpdateLambdaMutation__
 *
 * To run a mutation, you first call `useUpdateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLambdaMutation, { data, loading, error }] = useUpdateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLambdaMutation,
    UpdateLambdaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateLambdaMutation,
    UpdateLambdaMutationVariables
  >(UpdateLambdaGql, options)
}
export type UpdateLambdaMutationHookResult = ReturnType<
  typeof useUpdateLambdaMutation
>
export type UpdateLambdaMutationResult =
  Apollo.MutationResult<UpdateLambdaMutation>
export type UpdateLambdaMutationOptions = Apollo.BaseMutationOptions<
  UpdateLambdaMutation,
  UpdateLambdaMutationVariables
>
export const CreateTagGql = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`
export type CreateTagMutationFn = Apollo.MutationFunction<
  CreateTagMutation,
  CreateTagMutationVariables
>

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTagMutation,
    CreateTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(
    CreateTagGql,
    options,
  )
}
export type CreateTagMutationHookResult = ReturnType<
  typeof useCreateTagMutation
>
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<
  CreateTagMutation,
  CreateTagMutationVariables
>
export const DeleteTagGql = gql`
  mutation DeleteTag($input: DeleteTagInput!) {
    deleteTag(input: $input)
  }
`
export type DeleteTagMutationFn = Apollo.MutationFunction<
  DeleteTagMutation,
  DeleteTagMutationVariables
>

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTagMutation,
    DeleteTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(
    DeleteTagGql,
    options,
  )
}
export type DeleteTagMutationHookResult = ReturnType<
  typeof useDeleteTagMutation
>
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<
  DeleteTagMutation,
  DeleteTagMutationVariables
>
export const GetTagGql = gql`
  query GetTag($input: GetTagInput!) {
    getTag(input: $input) {
      ...__Tag
    }
  }
  ${__TagFragmentDoc}
`

/**
 * __useGetTagQuery__
 *
 * To run a query within a React component, call `useGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTagQuery(
  baseOptions: Apollo.QueryHookOptions<GetTagQuery, GetTagQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTagQuery, GetTagQueryVariables>(GetTagGql, options)
}
export function useGetTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTagQuery, GetTagQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagQuery, GetTagQueryVariables>(
    GetTagGql,
    options,
  )
}
export type GetTagQueryHookResult = ReturnType<typeof useGetTagQuery>
export type GetTagLazyQueryHookResult = ReturnType<typeof useGetTagLazyQuery>
export type GetTagQueryResult = Apollo.QueryResult<
  GetTagQuery,
  GetTagQueryVariables
>
export function refetchGetTagQuery(variables?: GetTagQueryVariables) {
  return { query: GetTagGql, variables: variables }
}
export const GetTagsGql = gql`
  query GetTags {
    getTags {
      ...__Tag
    }
  }
  ${__TagFragmentDoc}
`

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsGql,
    options,
  )
}
export function useGetTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTagsQuery,
    GetTagsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsGql,
    options,
  )
}
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>
export type GetTagsQueryResult = Apollo.QueryResult<
  GetTagsQuery,
  GetTagsQueryVariables
>
export function refetchGetTagsQuery(variables?: GetTagsQueryVariables) {
  return { query: GetTagsGql, variables: variables }
}
export const UpdateTagGql = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input)
  }
`
export type UpdateTagMutationFn = Apollo.MutationFunction<
  UpdateTagMutation,
  UpdateTagMutationVariables
>

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTagMutation,
    UpdateTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(
    UpdateTagGql,
    options,
  )
}
export type UpdateTagMutationHookResult = ReturnType<
  typeof useUpdateTagMutation
>
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<
  UpdateTagMutation,
  UpdateTagMutationVariables
>
export const CreateAtomGql = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      id
    }
  }
`
export type CreateAtomMutationFn = Apollo.MutationFunction<
  CreateAtomMutation,
  CreateAtomMutationVariables
>

/**
 * __useCreateAtomMutation__
 *
 * To run a mutation, you first call `useCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAtomMutation, { data, loading, error }] = useCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAtomMutation,
    CreateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAtomMutation, CreateAtomMutationVariables>(
    CreateAtomGql,
    options,
  )
}
export type CreateAtomMutationHookResult = ReturnType<
  typeof useCreateAtomMutation
>
export type CreateAtomMutationResult = Apollo.MutationResult<CreateAtomMutation>
export type CreateAtomMutationOptions = Apollo.BaseMutationOptions<
  CreateAtomMutation,
  CreateAtomMutationVariables
>
export const DeleteAtomGql = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input)
  }
`
export type DeleteAtomMutationFn = Apollo.MutationFunction<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>

/**
 * __useDeleteAtomMutation__
 *
 * To run a mutation, you first call `useDeleteAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAtomMutation, { data, loading, error }] = useDeleteAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAtomMutation,
    DeleteAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAtomMutation, DeleteAtomMutationVariables>(
    DeleteAtomGql,
    options,
  )
}
export type DeleteAtomMutationHookResult = ReturnType<
  typeof useDeleteAtomMutation
>
export type DeleteAtomMutationResult = Apollo.MutationResult<DeleteAtomMutation>
export type DeleteAtomMutationOptions = Apollo.BaseMutationOptions<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>
export const GetAtomGql = gql`
  query GetAtom($input: GetAtomInput!) {
    atom: getAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`

/**
 * __useGetAtomQuery__
 *
 * To run a query within a React component, call `useGetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAtomQuery(
  baseOptions: Apollo.QueryHookOptions<GetAtomQuery, GetAtomQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomGql,
    options,
  )
}
export function useGetAtomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomQuery,
    GetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomGql,
    options,
  )
}
export type GetAtomQueryHookResult = ReturnType<typeof useGetAtomQuery>
export type GetAtomLazyQueryHookResult = ReturnType<typeof useGetAtomLazyQuery>
export type GetAtomQueryResult = Apollo.QueryResult<
  GetAtomQuery,
  GetAtomQueryVariables
>
export function refetchGetAtomQuery(variables?: GetAtomQueryVariables) {
  return { query: GetAtomGql, variables: variables }
}
export const GetAtomsGql = gql`
  query GetAtoms {
    atoms: getAtoms {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`

/**
 * __useGetAtomsQuery__
 *
 * To run a query within a React component, call `useGetAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtomsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAtomsQuery, GetAtomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export function useGetAtomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsQuery,
    GetAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export type GetAtomsQueryHookResult = ReturnType<typeof useGetAtomsQuery>
export type GetAtomsLazyQueryHookResult = ReturnType<
  typeof useGetAtomsLazyQuery
>
export type GetAtomsQueryResult = Apollo.QueryResult<
  GetAtomsQuery,
  GetAtomsQueryVariables
>
export function refetchGetAtomsQuery(variables?: GetAtomsQueryVariables) {
  return { query: GetAtomsGql, variables: variables }
}
export const UpdateAtomGql = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input)
  }
`
export type UpdateAtomMutationFn = Apollo.MutationFunction<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>

/**
 * __useUpdateAtomMutation__
 *
 * To run a mutation, you first call `useUpdateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAtomMutation, { data, loading, error }] = useUpdateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAtomMutation,
    UpdateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAtomMutation, UpdateAtomMutationVariables>(
    UpdateAtomGql,
    options,
  )
}
export type UpdateAtomMutationHookResult = ReturnType<
  typeof useUpdateAtomMutation
>
export type UpdateAtomMutationResult = Apollo.MutationResult<UpdateAtomMutation>
export type UpdateAtomMutationOptions = Apollo.BaseMutationOptions<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>
export const CreateComponentGql = gql`
  mutation CreateComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      id
    }
  }
`
export type CreateComponentMutationFn = Apollo.MutationFunction<
  CreateComponentMutation,
  CreateComponentMutationVariables
>

/**
 * __useCreateComponentMutation__
 *
 * To run a mutation, you first call `useCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComponentMutation, { data, loading, error }] = useCreateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >(CreateComponentGql, options)
}
export type CreateComponentMutationHookResult = ReturnType<
  typeof useCreateComponentMutation
>
export type CreateComponentMutationResult =
  Apollo.MutationResult<CreateComponentMutation>
export type CreateComponentMutationOptions = Apollo.BaseMutationOptions<
  CreateComponentMutation,
  CreateComponentMutationVariables
>
export const DeleteComponentGql = gql`
  mutation DeleteComponent($input: DeleteComponentInput!) {
    deleteComponent(input: $input)
  }
`
export type DeleteComponentMutationFn = Apollo.MutationFunction<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>

/**
 * __useDeleteComponentMutation__
 *
 * To run a mutation, you first call `useDeleteComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComponentMutation, { data, loading, error }] = useDeleteComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >(DeleteComponentGql, options)
}
export type DeleteComponentMutationHookResult = ReturnType<
  typeof useDeleteComponentMutation
>
export type DeleteComponentMutationResult =
  Apollo.MutationResult<DeleteComponentMutation>
export type DeleteComponentMutationOptions = Apollo.BaseMutationOptions<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>
export const GetComponentElementsGql = gql`
  query GetComponentElements($input: GetComponentInput!) {
    getComponentElements(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`

/**
 * __useGetComponentElementsQuery__
 *
 * To run a query within a React component, call `useGetComponentElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentElementsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetComponentElementsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetComponentElementsQuery,
    GetComponentElementsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetComponentElementsQuery,
    GetComponentElementsQueryVariables
  >(GetComponentElementsGql, options)
}
export function useGetComponentElementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentElementsQuery,
    GetComponentElementsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetComponentElementsQuery,
    GetComponentElementsQueryVariables
  >(GetComponentElementsGql, options)
}
export type GetComponentElementsQueryHookResult = ReturnType<
  typeof useGetComponentElementsQuery
>
export type GetComponentElementsLazyQueryHookResult = ReturnType<
  typeof useGetComponentElementsLazyQuery
>
export type GetComponentElementsQueryResult = Apollo.QueryResult<
  GetComponentElementsQuery,
  GetComponentElementsQueryVariables
>
export function refetchGetComponentElementsQuery(
  variables?: GetComponentElementsQueryVariables,
) {
  return { query: GetComponentElementsGql, variables: variables }
}
export const GetComponentGql = gql`
  query GetComponent($input: GetComponentInput!) {
    getComponent(input: $input) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
`

/**
 * __useGetComponentQuery__
 *
 * To run a query within a React component, call `useGetComponentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetComponentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetComponentQuery,
    GetComponentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetComponentQuery, GetComponentQueryVariables>(
    GetComponentGql,
    options,
  )
}
export function useGetComponentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentQuery,
    GetComponentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetComponentQuery, GetComponentQueryVariables>(
    GetComponentGql,
    options,
  )
}
export type GetComponentQueryHookResult = ReturnType<
  typeof useGetComponentQuery
>
export type GetComponentLazyQueryHookResult = ReturnType<
  typeof useGetComponentLazyQuery
>
export type GetComponentQueryResult = Apollo.QueryResult<
  GetComponentQuery,
  GetComponentQueryVariables
>
export function refetchGetComponentQuery(
  variables?: GetComponentQueryVariables,
) {
  return { query: GetComponentGql, variables: variables }
}
export const GetComponentsGql = gql`
  query GetComponents {
    getComponents {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
`

/**
 * __useGetComponentsQuery__
 *
 * To run a query within a React component, call `useGetComponentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetComponentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetComponentsQuery,
    GetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetComponentsQuery, GetComponentsQueryVariables>(
    GetComponentsGql,
    options,
  )
}
export function useGetComponentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentsQuery,
    GetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetComponentsQuery, GetComponentsQueryVariables>(
    GetComponentsGql,
    options,
  )
}
export type GetComponentsQueryHookResult = ReturnType<
  typeof useGetComponentsQuery
>
export type GetComponentsLazyQueryHookResult = ReturnType<
  typeof useGetComponentsLazyQuery
>
export type GetComponentsQueryResult = Apollo.QueryResult<
  GetComponentsQuery,
  GetComponentsQueryVariables
>
export function refetchGetComponentsQuery(
  variables?: GetComponentsQueryVariables,
) {
  return { query: GetComponentsGql, variables: variables }
}
export const UpdateComponentGql = gql`
  mutation UpdateComponent($input: UpdateComponentInput!) {
    updateComponent(input: $input)
  }
`
export type UpdateComponentMutationFn = Apollo.MutationFunction<
  UpdateComponentMutation,
  UpdateComponentMutationVariables
>

/**
 * __useUpdateComponentMutation__
 *
 * To run a mutation, you first call `useUpdateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComponentMutation, { data, loading, error }] = useUpdateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateComponentMutation,
    UpdateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateComponentMutation,
    UpdateComponentMutationVariables
  >(UpdateComponentGql, options)
}
export type UpdateComponentMutationHookResult = ReturnType<
  typeof useUpdateComponentMutation
>
export type UpdateComponentMutationResult =
  Apollo.MutationResult<UpdateComponentMutation>
export type UpdateComponentMutationOptions = Apollo.BaseMutationOptions<
  UpdateComponentMutation,
  UpdateComponentMutationVariables
>
export const CreateElementGql = gql`
  mutation CreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      id
    }
  }
`
export type CreateElementMutationFn = Apollo.MutationFunction<
  CreateElementMutation,
  CreateElementMutationVariables
>

/**
 * __useCreateElementMutation__
 *
 * To run a mutation, you first call `useCreateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createElementMutation, { data, loading, error }] = useCreateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateElementMutation,
    CreateElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateElementMutation,
    CreateElementMutationVariables
  >(CreateElementGql, options)
}
export type CreateElementMutationHookResult = ReturnType<
  typeof useCreateElementMutation
>
export type CreateElementMutationResult =
  Apollo.MutationResult<CreateElementMutation>
export type CreateElementMutationOptions = Apollo.BaseMutationOptions<
  CreateElementMutation,
  CreateElementMutationVariables
>
export const DeleteElementGql = gql`
  mutation DeleteElement($input: DeleteElementInput!) {
    deleteElement(input: $input)
  }
`
export type DeleteElementMutationFn = Apollo.MutationFunction<
  DeleteElementMutation,
  DeleteElementMutationVariables
>

/**
 * __useDeleteElementMutation__
 *
 * To run a mutation, you first call `useDeleteElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteElementMutation, { data, loading, error }] = useDeleteElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteElementMutation,
    DeleteElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteElementMutation,
    DeleteElementMutationVariables
  >(DeleteElementGql, options)
}
export type DeleteElementMutationHookResult = ReturnType<
  typeof useDeleteElementMutation
>
export type DeleteElementMutationResult =
  Apollo.MutationResult<DeleteElementMutation>
export type DeleteElementMutationOptions = Apollo.BaseMutationOptions<
  DeleteElementMutation,
  DeleteElementMutationVariables
>
export const MoveElementGql = gql`
  mutation MoveElement($input: MoveElementInput!) {
    moveElement(input: $input)
  }
`
export type MoveElementMutationFn = Apollo.MutationFunction<
  MoveElementMutation,
  MoveElementMutationVariables
>

/**
 * __useMoveElementMutation__
 *
 * To run a mutation, you first call `useMoveElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveElementMutation, { data, loading, error }] = useMoveElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveElementMutation,
    MoveElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<MoveElementMutation, MoveElementMutationVariables>(
    MoveElementGql,
    options,
  )
}
export type MoveElementMutationHookResult = ReturnType<
  typeof useMoveElementMutation
>
export type MoveElementMutationResult =
  Apollo.MutationResult<MoveElementMutation>
export type MoveElementMutationOptions = Apollo.BaseMutationOptions<
  MoveElementMutation,
  MoveElementMutationVariables
>
export const UpdateElementPropsGql = gql`
  mutation UpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input)
  }
`
export type UpdateElementPropsMutationFn = Apollo.MutationFunction<
  UpdateElementPropsMutation,
  UpdateElementPropsMutationVariables
>

/**
 * __useUpdateElementPropsMutation__
 *
 * To run a mutation, you first call `useUpdateElementPropsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementPropsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementPropsMutation, { data, loading, error }] = useUpdateElementPropsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateElementPropsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateElementPropsMutation,
    UpdateElementPropsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateElementPropsMutation,
    UpdateElementPropsMutationVariables
  >(UpdateElementPropsGql, options)
}
export type UpdateElementPropsMutationHookResult = ReturnType<
  typeof useUpdateElementPropsMutation
>
export type UpdateElementPropsMutationResult =
  Apollo.MutationResult<UpdateElementPropsMutation>
export type UpdateElementPropsMutationOptions = Apollo.BaseMutationOptions<
  UpdateElementPropsMutation,
  UpdateElementPropsMutationVariables
>
export const UpdateElementGql = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input)
  }
`
export type UpdateElementMutationFn = Apollo.MutationFunction<
  UpdateElementMutation,
  UpdateElementMutationVariables
>

/**
 * __useUpdateElementMutation__
 *
 * To run a mutation, you first call `useUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementMutation, { data, loading, error }] = useUpdateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >(UpdateElementGql, options)
}
export type UpdateElementMutationHookResult = ReturnType<
  typeof useUpdateElementMutation
>
export type UpdateElementMutationResult =
  Apollo.MutationResult<UpdateElementMutation>
export type UpdateElementMutationOptions = Apollo.BaseMutationOptions<
  UpdateElementMutation,
  UpdateElementMutationVariables
>
export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
    }
  }
`
export type CreatePageMutationFn = Apollo.MutationFunction<
  CreatePageMutation,
  CreatePageMutationVariables
>

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageMutation,
    CreatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(
    CreatePageGql,
    options,
  )
}
export type CreatePageMutationHookResult = ReturnType<
  typeof useCreatePageMutation
>
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  CreatePageMutation,
  CreatePageMutationVariables
>
export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input)
  }
`
export type DeletePageMutationFn = Apollo.MutationFunction<
  DeletePageMutation,
  DeletePageMutationVariables
>

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageGql,
    options,
  )
}
export type DeletePageMutationHookResult = ReturnType<
  typeof useDeletePageMutation
>
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<
  DeletePageMutation,
  DeletePageMutationVariables
>
export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFullFragmentDoc}
`

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuery,
    GetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = Apollo.QueryResult<
  GetPageQuery,
  GetPageQueryVariables
>
export function refetchGetPageQuery(variables?: GetPageQueryVariables) {
  return { query: GetPageGql, variables: variables }
}
export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesQuery(
  baseOptions: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    options,
  )
}
export function useGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesQuery,
    GetPagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    options,
  )
}
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>
export type GetPagesLazyQueryHookResult = ReturnType<
  typeof useGetPagesLazyQuery
>
export type GetPagesQueryResult = Apollo.QueryResult<
  GetPagesQuery,
  GetPagesQueryVariables
>
export function refetchGetPagesQuery(variables?: GetPagesQueryVariables) {
  return { query: GetPagesGql, variables: variables }
}
export const UpdatePageGql = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input)
  }
`
export type UpdatePageMutationFn = Apollo.MutationFunction<
  UpdatePageMutation,
  UpdatePageMutationVariables
>

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageMutation,
    UpdatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(
    UpdatePageGql,
    options,
  )
}
export type UpdatePageMutationHookResult = ReturnType<
  typeof useUpdatePageMutation
>
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageMutation,
  UpdatePageMutationVariables
>
export const CreateFieldGql = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      id
    }
  }
`
export type CreateFieldMutationFn = Apollo.MutationFunction<
  CreateFieldMutation,
  CreateFieldMutationVariables
>

/**
 * __useCreateFieldMutation__
 *
 * To run a mutation, you first call `useCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFieldMutation, { data, loading, error }] = useCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFieldMutation,
    CreateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateFieldMutation, CreateFieldMutationVariables>(
    CreateFieldGql,
    options,
  )
}
export type CreateFieldMutationHookResult = ReturnType<
  typeof useCreateFieldMutation
>
export type CreateFieldMutationResult =
  Apollo.MutationResult<CreateFieldMutation>
export type CreateFieldMutationOptions = Apollo.BaseMutationOptions<
  CreateFieldMutation,
  CreateFieldMutationVariables
>
export const DeleteFieldGql = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input)
  }
`
export type DeleteFieldMutationFn = Apollo.MutationFunction<
  DeleteFieldMutation,
  DeleteFieldMutationVariables
>

/**
 * __useDeleteFieldMutation__
 *
 * To run a mutation, you first call `useDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFieldMutation, { data, loading, error }] = useDeleteFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFieldMutation,
    DeleteFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteFieldMutation, DeleteFieldMutationVariables>(
    DeleteFieldGql,
    options,
  )
}
export type DeleteFieldMutationHookResult = ReturnType<
  typeof useDeleteFieldMutation
>
export type DeleteFieldMutationResult =
  Apollo.MutationResult<DeleteFieldMutation>
export type DeleteFieldMutationOptions = Apollo.BaseMutationOptions<
  DeleteFieldMutation,
  DeleteFieldMutationVariables
>
export const GetFieldGql = gql`
  query GetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`

/**
 * __useGetFieldQuery__
 *
 * To run a query within a React component, call `useGetFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFieldQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFieldQuery(
  baseOptions: Apollo.QueryHookOptions<GetFieldQuery, GetFieldQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFieldQuery, GetFieldQueryVariables>(
    GetFieldGql,
    options,
  )
}
export function useGetFieldLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFieldQuery,
    GetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFieldQuery, GetFieldQueryVariables>(
    GetFieldGql,
    options,
  )
}
export type GetFieldQueryHookResult = ReturnType<typeof useGetFieldQuery>
export type GetFieldLazyQueryHookResult = ReturnType<
  typeof useGetFieldLazyQuery
>
export type GetFieldQueryResult = Apollo.QueryResult<
  GetFieldQuery,
  GetFieldQueryVariables
>
export function refetchGetFieldQuery(variables?: GetFieldQueryVariables) {
  return { query: GetFieldGql, variables: variables }
}
export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input)
  }
`
export type UpdateFieldMutationFn = Apollo.MutationFunction<
  UpdateFieldMutation,
  UpdateFieldMutationVariables
>

/**
 * __useUpdateFieldMutation__
 *
 * To run a mutation, you first call `useUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldMutation, { data, loading, error }] = useUpdateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFieldMutation,
    UpdateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateFieldMutation, UpdateFieldMutationVariables>(
    UpdateFieldGql,
    options,
  )
}
export type UpdateFieldMutationHookResult = ReturnType<
  typeof useUpdateFieldMutation
>
export type UpdateFieldMutationResult =
  Apollo.MutationResult<UpdateFieldMutation>
export type UpdateFieldMutationOptions = Apollo.BaseMutationOptions<
  UpdateFieldMutation,
  UpdateFieldMutationVariables
>
export const CreateTypeGql = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      id
    }
  }
`
export type CreateTypeMutationFn = Apollo.MutationFunction<
  CreateTypeMutation,
  CreateTypeMutationVariables
>

/**
 * __useCreateTypeMutation__
 *
 * To run a mutation, you first call `useCreateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTypeMutation, { data, loading, error }] = useCreateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTypeMutation,
    CreateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTypeMutation, CreateTypeMutationVariables>(
    CreateTypeGql,
    options,
  )
}
export type CreateTypeMutationHookResult = ReturnType<
  typeof useCreateTypeMutation
>
export type CreateTypeMutationResult = Apollo.MutationResult<CreateTypeMutation>
export type CreateTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateTypeMutation,
  CreateTypeMutationVariables
>
export const DeleteTypeGql = gql`
  mutation DeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input)
  }
`
export type DeleteTypeMutationFn = Apollo.MutationFunction<
  DeleteTypeMutation,
  DeleteTypeMutationVariables
>

/**
 * __useDeleteTypeMutation__
 *
 * To run a mutation, you first call `useDeleteTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTypeMutation, { data, loading, error }] = useDeleteTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTypeMutation,
    DeleteTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTypeMutation, DeleteTypeMutationVariables>(
    DeleteTypeGql,
    options,
  )
}
export type DeleteTypeMutationHookResult = ReturnType<
  typeof useDeleteTypeMutation
>
export type DeleteTypeMutationResult = Apollo.MutationResult<DeleteTypeMutation>
export type DeleteTypeMutationOptions = Apollo.BaseMutationOptions<
  DeleteTypeMutation,
  DeleteTypeMutationVariables
>
export const GetTypeGraphGql = gql`
  query GetTypeGraph($input: GetTypeInput!) {
    getTypeGraph(input: $input) {
      ...__TypeGraph
    }
  }
  ${__TypeGraphFragmentDoc}
`

/**
 * __useGetTypeGraphQuery__
 *
 * To run a query within a React component, call `useGetTypeGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypeGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTypeGraphQuery,
    GetTypeGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTypeGraphQuery, GetTypeGraphQueryVariables>(
    GetTypeGraphGql,
    options,
  )
}
export function useGetTypeGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTypeGraphQuery,
    GetTypeGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTypeGraphQuery, GetTypeGraphQueryVariables>(
    GetTypeGraphGql,
    options,
  )
}
export type GetTypeGraphQueryHookResult = ReturnType<
  typeof useGetTypeGraphQuery
>
export type GetTypeGraphLazyQueryHookResult = ReturnType<
  typeof useGetTypeGraphLazyQuery
>
export type GetTypeGraphQueryResult = Apollo.QueryResult<
  GetTypeGraphQuery,
  GetTypeGraphQueryVariables
>
export function refetchGetTypeGraphQuery(
  variables?: GetTypeGraphQueryVariables,
) {
  return { query: GetTypeGraphGql, variables: variables }
}
export const GetTypeGql = gql`
  query GetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...__Type
    }
  }
  ${__TypeFragmentDoc}
`

/**
 * __useGetTypeQuery__
 *
 * To run a query within a React component, call `useGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypeQuery(
  baseOptions: Apollo.QueryHookOptions<GetTypeQuery, GetTypeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTypeQuery, GetTypeQueryVariables>(
    GetTypeGql,
    options,
  )
}
export function useGetTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTypeQuery,
    GetTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTypeQuery, GetTypeQueryVariables>(
    GetTypeGql,
    options,
  )
}
export type GetTypeQueryHookResult = ReturnType<typeof useGetTypeQuery>
export type GetTypeLazyQueryHookResult = ReturnType<typeof useGetTypeLazyQuery>
export type GetTypeQueryResult = Apollo.QueryResult<
  GetTypeQuery,
  GetTypeQueryVariables
>
export function refetchGetTypeQuery(variables?: GetTypeQueryVariables) {
  return { query: GetTypeGql, variables: variables }
}
export const GetTypesGql = gql`
  query GetTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      __typename
      ...__Type
    }
  }
  ${__TypeFragmentDoc}
`

/**
 * __useGetTypesQuery__
 *
 * To run a query within a React component, call `useGetTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTypesQuery, GetTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTypesQuery, GetTypesQueryVariables>(
    GetTypesGql,
    options,
  )
}
export function useGetTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTypesQuery,
    GetTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTypesQuery, GetTypesQueryVariables>(
    GetTypesGql,
    options,
  )
}
export type GetTypesQueryHookResult = ReturnType<typeof useGetTypesQuery>
export type GetTypesLazyQueryHookResult = ReturnType<
  typeof useGetTypesLazyQuery
>
export type GetTypesQueryResult = Apollo.QueryResult<
  GetTypesQuery,
  GetTypesQueryVariables
>
export function refetchGetTypesQuery(variables?: GetTypesQueryVariables) {
  return { query: GetTypesGql, variables: variables }
}
export const UpdateEnumTypeGql = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input)
  }
`
export type UpdateEnumTypeMutationFn = Apollo.MutationFunction<
  UpdateEnumTypeMutation,
  UpdateEnumTypeMutationVariables
>

/**
 * __useUpdateEnumTypeMutation__
 *
 * To run a mutation, you first call `useUpdateEnumTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnumTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnumTypeMutation, { data, loading, error }] = useUpdateEnumTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEnumTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEnumTypeMutation,
    UpdateEnumTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateEnumTypeMutation,
    UpdateEnumTypeMutationVariables
  >(UpdateEnumTypeGql, options)
}
export type UpdateEnumTypeMutationHookResult = ReturnType<
  typeof useUpdateEnumTypeMutation
>
export type UpdateEnumTypeMutationResult =
  Apollo.MutationResult<UpdateEnumTypeMutation>
export type UpdateEnumTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEnumTypeMutation,
  UpdateEnumTypeMutationVariables
>
export const UpdateTypeGql = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input)
  }
`
export type UpdateTypeMutationFn = Apollo.MutationFunction<
  UpdateTypeMutation,
  UpdateTypeMutationVariables
>

/**
 * __useUpdateTypeMutation__
 *
 * To run a mutation, you first call `useUpdateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTypeMutation, { data, loading, error }] = useUpdateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTypeMutation,
    UpdateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTypeMutation, UpdateTypeMutationVariables>(
    UpdateTypeGql,
    options,
  )
}
export type UpdateTypeMutationHookResult = ReturnType<
  typeof useUpdateTypeMutation
>
export type UpdateTypeMutationResult = Apollo.MutationResult<UpdateTypeMutation>
export type UpdateTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateTypeMutation,
  UpdateTypeMutationVariables
>
export const UpdatePrimitiveTypeGql = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input)
  }
`
export type UpdatePrimitiveTypeMutationFn = Apollo.MutationFunction<
  UpdatePrimitiveTypeMutation,
  UpdatePrimitiveTypeMutationVariables
>

/**
 * __useUpdatePrimitiveTypeMutation__
 *
 * To run a mutation, you first call `useUpdatePrimitiveTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrimitiveTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrimitiveTypeMutation, { data, loading, error }] = useUpdatePrimitiveTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePrimitiveTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePrimitiveTypeMutation,
    UpdatePrimitiveTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePrimitiveTypeMutation,
    UpdatePrimitiveTypeMutationVariables
  >(UpdatePrimitiveTypeGql, options)
}
export type UpdatePrimitiveTypeMutationHookResult = ReturnType<
  typeof useUpdatePrimitiveTypeMutation
>
export type UpdatePrimitiveTypeMutationResult =
  Apollo.MutationResult<UpdatePrimitiveTypeMutation>
export type UpdatePrimitiveTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdatePrimitiveTypeMutation,
  UpdatePrimitiveTypeMutationVariables
>
export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserGql,
    options,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const GetUsersGql = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
  return { query: GetUsersGql, variables: variables }
}
export const __Lambda = gql`
  fragment __Lambda on Lambda {
    id
    name
    body
    ownerId
  }
`
export const __LambdaPayload = gql`
  fragment __LambdaPayload on LambdaPayload {
    payload
  }
`
export const __Tag = gql`
  fragment __Tag on Tag {
    id
    name
  }
`
export const __App = gql`
  fragment __App on App {
    id
    name
  }
`
export const PageBase = gql`
  fragment PageBase on Page {
    id
    name
  }
`
export const Component = gql`
  fragment Component on Component {
    __typename
    id
    name
  }
`
export const __Interface = gql`
  fragment __Interface on InterfaceType {
    id
    name
  }
`
export const __Atom = gql`
  fragment __Atom on Atom {
    id
    name
    type
    api {
      ...__Interface
    }
  }
  ${__Interface}
`
export const Element = gql`
  fragment Element on Element {
    __typename
    id
    name
    css
    atom {
      ...__Atom
    }
    props
  }
  ${__Atom}
`
export const ElementEdge = gql`
  fragment ElementEdge on ElementEdge {
    order
    source
    target
  }
`
export const ElementGraph = gql`
  fragment ElementGraph on ElementGraph {
    vertices {
      __typename
      ...Component
      ...Element
    }
    edges {
      ...ElementEdge
    }
  }
  ${Component}
  ${Element}
  ${ElementEdge}
`
export const PageFull = gql`
  fragment PageFull on Page {
    ...PageBase
    elements {
      ...ElementGraph
    }
  }
  ${PageBase}
  ${ElementGraph}
`
export const __Field = gql`
  fragment __Field on Field {
    id
    key
    name
    description
  }
`
export const __TypeEdge = gql`
  fragment __TypeEdge on TypeEdge {
    source
    target
    kind
    field {
      ...__Field
    }
  }
  ${__Field}
`
export const __ArrayType = gql`
  fragment __ArrayType on ArrayType {
    id
    name
  }
`
export const __EnumTypeValue = gql`
  fragment __EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const __EnumType = gql`
  fragment __EnumType on EnumType {
    id
    name
    allowedValues {
      ...__EnumTypeValue
    }
  }
  ${__EnumTypeValue}
`
export const __PrimitiveType = gql`
  fragment __PrimitiveType on PrimitiveType {
    id
    name
    primitiveKind
  }
`
export const __ElementType = gql`
  fragment __ElementType on ElementType {
    id
    name
    kind
  }
`
export const __LambdaType = gql`
  fragment __LambdaType on LambdaType {
    id
    name
  }
`
export const __ComponentType = gql`
  fragment __ComponentType on ComponentType {
    id
    name
  }
`
export const __Type = gql`
  fragment __Type on Type {
    __typename
    id
    name
    typeKind
    ...__ArrayType
    ...__EnumType
    ...__Interface
    ...__PrimitiveType
    ...__ElementType
    ...__LambdaType
    ...__ComponentType
  }
  ${__ArrayType}
  ${__EnumType}
  ${__Interface}
  ${__PrimitiveType}
  ${__ElementType}
  ${__LambdaType}
  ${__ComponentType}
`
export const __TypeGraph = gql`
  fragment __TypeGraph on TypeGraph {
    edges {
      ...__TypeEdge
    }
    vertices {
      ...__Type
    }
  }
  ${__TypeEdge}
  ${__Type}
`
export const __User = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const CreateApp = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
    }
  }
`
export const DeleteApp = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input)
  }
`
export const GetApp = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      ...__App
    }
  }
  ${__App}
`
export const GetApps = gql`
  query GetApps {
    apps: getApps {
      ...__App
    }
  }
  ${__App}
`
export const UpdateApp = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input)
  }
`
export const GetElementGraph = gql`
  query GetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraph}
`
export const GetElement = gql`
  query GetElement($input: GetElementInput!) {
    getElement(input: $input) {
      ...Element
    }
  }
  ${Element}
`
export const CreateLambda = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__Lambda}
`
export const DeleteLambda = gql`
  mutation DeleteLambda($input: DeleteLambdaInput!) {
    deleteLambda(input: $input)
  }
`
export const ExecuteLambda = gql`
  mutation ExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...__LambdaPayload
    }
  }
  ${__LambdaPayload}
`
export const GetLambda = gql`
  query GetLambda($input: GetLambdaInput!) {
    getLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__Lambda}
`
export const GetLambdas = gql`
  query GetLambdas {
    getLambdas {
      ...__Lambda
    }
  }
  ${__Lambda}
`
export const UpdateLambda = gql`
  mutation UpdateLambda($input: UpdateLambdaInput!) {
    updateLambda(input: $input) {
      ...__Lambda
    }
  }
  ${__Lambda}
`
export const CreateTag = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`
export const DeleteTag = gql`
  mutation DeleteTag($input: DeleteTagInput!) {
    deleteTag(input: $input)
  }
`
export const GetTag = gql`
  query GetTag($input: GetTagInput!) {
    getTag(input: $input) {
      ...__Tag
    }
  }
  ${__Tag}
`
export const GetTags = gql`
  query GetTags {
    getTags {
      ...__Tag
    }
  }
  ${__Tag}
`
export const UpdateTag = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input)
  }
`
export const CreateAtom = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      id
    }
  }
`
export const DeleteAtom = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input)
  }
`
export const GetAtom = gql`
  query GetAtom($input: GetAtomInput!) {
    atom: getAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const GetAtoms = gql`
  query GetAtoms {
    atoms: getAtoms {
      ...__Atom
    }
  }
  ${__Atom}
`
export const UpdateAtom = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input)
  }
`
export const CreateComponent = gql`
  mutation CreateComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      id
    }
  }
`
export const DeleteComponent = gql`
  mutation DeleteComponent($input: DeleteComponentInput!) {
    deleteComponent(input: $input)
  }
`
export const GetComponentElements = gql`
  query GetComponentElements($input: GetComponentInput!) {
    getComponentElements(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraph}
`
export const GetComponent = gql`
  query GetComponent($input: GetComponentInput!) {
    getComponent(input: $input) {
      ...Component
    }
  }
  ${Component}
`
export const GetComponents = gql`
  query GetComponents {
    getComponents {
      ...Component
    }
  }
  ${Component}
`
export const UpdateComponent = gql`
  mutation UpdateComponent($input: UpdateComponentInput!) {
    updateComponent(input: $input)
  }
`
export const CreateElement = gql`
  mutation CreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      id
    }
  }
`
export const DeleteElement = gql`
  mutation DeleteElement($input: DeleteElementInput!) {
    deleteElement(input: $input)
  }
`
export const MoveElement = gql`
  mutation MoveElement($input: MoveElementInput!) {
    moveElement(input: $input)
  }
`
export const UpdateElementProps = gql`
  mutation UpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input)
  }
`
export const UpdateElement = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input)
  }
`
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      id
    }
  }
`
export const DeletePage = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input)
  }
`
export const GetPage = gql`
  query GetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFull}
`
export const GetPages = gql`
  query GetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const UpdatePage = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input)
  }
`
export const CreateField = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      id
    }
  }
`
export const DeleteField = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input)
  }
`
export const GetField = gql`
  query GetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const UpdateField = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input)
  }
`
export const CreateType = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      id
    }
  }
`
export const DeleteType = gql`
  mutation DeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input)
  }
`
export const GetTypeGraph = gql`
  query GetTypeGraph($input: GetTypeInput!) {
    getTypeGraph(input: $input) {
      ...__TypeGraph
    }
  }
  ${__TypeGraph}
`
export const GetType = gql`
  query GetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...__Type
    }
  }
  ${__Type}
`
export const GetTypes = gql`
  query GetTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      __typename
      ...__Type
    }
  }
  ${__Type}
`
export const UpdateEnumType = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input)
  }
`
export const UpdateType = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input)
  }
`
export const UpdatePrimitiveType = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input)
  }
`
export const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export const GetUsers = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__User}
`
