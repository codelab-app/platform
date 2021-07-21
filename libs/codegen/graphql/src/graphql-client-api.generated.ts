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
}

export type App = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
}

export type ArrayType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  typeId: Scalars['String']
}

export type ArrayValue = {
  id: Scalars['ID']
  values: Array<PropValue>
}

export type ArrayValueInput = {
  values: Array<UpsertValueInput>
}

export type Atom = {
  id: Scalars['ID']
  type: AtomType
  label: Scalars['String']
  propTypes: Interface
}

export type AtomByElementFilter = {
  elementId: Scalars['String']
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

export type BoleanValueInput = {
  value: Scalars['Boolean']
}

export type BooleanValue = {
  id: Scalars['ID']
  booleanValue: Scalars['Boolean']
}

export type CreateAppInput = {
  name: Scalars['String']
}

export type CreateArrayTypeInput = {
  itemTypeId: Scalars['String']
}

export type CreateAtomInput = {
  label: Scalars['String']
  type: AtomType
}

export type CreateElementInput = {
  name: Scalars['String']
  atomId?: Maybe<Scalars['String']>
  parentElementId: Scalars['String']
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>
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
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interfaceId: Scalars['String']
  type: TypeRef
}

export type CreateInterfaceInput = {
  name: Scalars['String']
}

export type CreateLambdaInput = {
  name: Scalars['String']
}

export type CreatePageInput = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type CreatePrimitiveTypeInput = {
  primitiveKind: PrimitiveKind
}

/** Provide one of the properties */
export type CreateTypeInput = {
  name: Scalars['String']
  primitiveType?: Maybe<CreatePrimitiveTypeInput>
  arrayType?: Maybe<CreateArrayTypeInput>
  enumType?: Maybe<CreateEnumTypeInput>
  interfaceType?: Maybe<Scalars['Boolean']>
}

export type DeleteAppInput = {
  appId: Scalars['String']
}

export type DeleteAtomInput = {
  atomId: Scalars['String']
}

export type DeleteElementInput = {
  elementId: Scalars['String']
}

export type DeleteFieldInput = {
  fieldId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type DeleteResponse = {
  affected: Scalars['Int']
}

export type DeleteTypeInput = {
  typeId: Scalars['String']
}

export type DeleteUserInput = {
  userId: Scalars['String']
}

export type Element = {
  id: Scalars['ID']
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atom?: Maybe<Atom>
  props: Array<PropAggregate>
}

export type ElementAggregate = {
  id: Scalars['ID']
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atom?: Maybe<Atom>
  props: Array<PropAggregate>
  /** All descendant Elements that are under this root, at any level */
  descendants: Array<Element>
  /** All the links connecting the descendant elements */
  links: Array<ElementLink>
}

/** An edge between two element nodes */
export type ElementLink = {
  /** The id of the source Element */
  from: Scalars['String']
  /** The id of the target Element */
  to: Scalars['String']
  order: Scalars['Int']
}

export type EnumType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  allowedValues: Array<EnumTypeValue>
}

export type EnumTypeValue = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type Field = {
  id: Scalars['ID']
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  typeId: Scalars['String']
  interface: Interface
}

export type FieldByIdFilter = {
  fieldId: Scalars['String']
}

export type FieldByInterfaceFilter = {
  interfaceId: Scalars['String']
  fieldKey: Scalars['String']
}

export type FieldCollection = {
  fields: Array<Field>
  /** Flattened array of all types that are used inside this interface */
  types: Array<Type>
}

export type FloatValue = {
  id: Scalars['ID']
  floatValue: Scalars['Float']
}

export type FloatValueInput = {
  value: Scalars['Float']
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type GetAtomByInput = {
  byElement?: Maybe<AtomByElementFilter>
}

export type GetAtomInput = {
  atomId: Scalars['String']
}

export type GetElementAggregateInput = {
  elementId: Scalars['String']
}

export type GetElementInput = {
  elementId: Scalars['String']
}

export type GetFieldInput = {
  byInterface?: Maybe<FieldByInterfaceFilter>
  byId?: Maybe<FieldByIdFilter>
}

export type GetInterfaceInput = {
  interfaceId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type GetPagesInput = {
  appId: Scalars['String']
}

export type GetPropsInput = {
  byElement?: Maybe<PropsByElementFilter>
  byIds?: Maybe<PropsByIdsFilter>
  byInterfaceValue?: Maybe<PropsByInterfaceValueId>
}

export type GetTypeInput = {
  typeId: Scalars['String']
}

export type GetTypesInput = {
  byIds?: Maybe<TypesByIdsFilter>
}

export type GetUsersInput = {
  page: Scalars['Int']
  perPage: Scalars['Int']
  query: Scalars['String']
  sort: Scalars['String']
}

export type IntValue = {
  id: Scalars['ID']
  intValue: Scalars['Int']
}

export type IntValueInput = {
  value: Scalars['Int']
}

export type Interface = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  fieldCollection: FieldCollection
}

export type InterfaceValue = {
  id: Scalars['ID']
  props: Array<Prop>
}

export type InterfaceValueInput = {
  props: Array<UpsertPropsInput>
}

export type Lambda = {
  id: Scalars['ID']
  name: Scalars['String']
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
  createApp: App
  updateApp: App
  deleteApp: App
  createLambda: Lambda
  updateUser: User
  deleteUser: Scalars['Boolean']
  createPage: Page
  deletePage: DeleteResponse
  updatePage: Page
  createElement: Element
  updateElement: Element
  moveElement: Element
  /** Deletes an element and all the descending elements */
  deleteElement: DeleteResponse
  createAtom: Atom
  deleteAtom: DeleteResponse
  updateAtom: Atom
  createInterface: Interface
  updateInterface: Interface
  createField: Field
  updateField: Field
  deleteField: DeleteResponse
  createType: Type
  updateEnumType: EnumType
  updatePrimitiveType: PrimitiveType
  updateType: Type
  deleteType: DeleteResponse
  upsertProp: UpsertPropsResponse
  deleteProp: DeleteResponse
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

export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput
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

export type MutationDeleteElementArgs = {
  input: DeleteElementInput
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

export type MutationCreateInterfaceArgs = {
  input: CreateInterfaceInput
}

export type MutationUpdateInterfaceArgs = {
  input: UpdateInterfaceInput
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

export type MutationUpsertPropArgs = {
  input: Array<UpsertPropsInput>
}

export type Page = {
  id: Scalars['ID']
  name: Scalars['String']
  app: App
  rootElement: ElementAggregate
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
  primitiveKind: PrimitiveKind
}

export type Prop = {
  id: Scalars['ID']
  field: Field
  value?: Maybe<PropValue>
}

/** Contains all nested props and values from the whole prop tree */
export type PropAggregate = {
  rootProp: Prop
  /** All props that are descendant of this Prop, normalized to an array, including the root prop */
  props: Array<Prop>
  /** All values that are descendant of this Prop, normalized to an array, including the root prop's value */
  values: Array<PropValue>
}

export type PropValue =
  | StringValue
  | IntValue
  | FloatValue
  | BooleanValue
  | ArrayValue
  | InterfaceValue
  | EnumTypeValue

export type PropsByElementFilter = {
  elementIds: Array<Scalars['String']>
  fieldId?: Maybe<Scalars['String']>
}

export type PropsByIdsFilter = {
  propIds: Array<Scalars['String']>
}

export type PropsByInterfaceValueId = {
  interfaceValueId: Scalars['String']
}

export type Query = {
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getUsers: Array<User>
  getPages: Array<Page>
  getPage?: Maybe<Page>
  getElement?: Maybe<Element>
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of array of Element and array of ElementLink */
  getElementAggregate?: Maybe<ElementAggregate>
  getAtoms: Array<Atom>
  getAtom?: Maybe<Atom>
  getAtomBy?: Maybe<Atom>
  getInterface?: Maybe<Interface>
  getInterfaces: Array<Interface>
  getField?: Maybe<Field>
  getType?: Maybe<Type>
  getTypes: Array<Type>
  getProps: Array<PropAggregate>
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

export type QueryGetElementArgs = {
  input: GetElementInput
}

export type QueryGetElementAggregateArgs = {
  input: GetElementAggregateInput
}

export type QueryGetAtomArgs = {
  input: GetAtomInput
}

export type QueryGetAtomByArgs = {
  input: GetAtomByInput
}

export type QueryGetInterfaceArgs = {
  input: GetInterfaceInput
}

export type QueryGetFieldArgs = {
  input: GetFieldInput
}

export type QueryGetTypeArgs = {
  input: GetTypeInput
}

export type QueryGetTypesArgs = {
  input?: Maybe<GetTypesInput>
}

export type QueryGetPropsArgs = {
  input: GetPropsInput
}

export type StringValue = {
  id: Scalars['ID']
  stringValue: Scalars['String']
}

export type StringValueInput = {
  value: Scalars['String']
}

export type Type = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type TypeRef = {
  existingTypeId?: Maybe<Scalars['String']>
  newType?: Maybe<CreateTypeInput>
}

export type TypesByIdsFilter = {
  typeIds: Array<Scalars['String']>
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

export type UpdateElementData = {
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atomId?: Maybe<Scalars['String']>
}

export type UpdateElementInput = {
  updateData: UpdateElementData
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
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type UpdateFieldData = {
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interfaceId: Scalars['String']
  type: TypeRef
}

export type UpdateFieldInput = {
  fieldId: Scalars['String']
  updateData: UpdateFieldData
}

export type UpdateInterfaceData = {
  name: Scalars['String']
}

export type UpdateInterfaceInput = {
  interfaceId: Scalars['String']
  updateData: UpdateInterfaceData
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

export type UpsertPropsInput = {
  propId?: Maybe<Scalars['String']>
  fieldId: Scalars['String']
  elementId?: Maybe<Scalars['String']>
  value?: Maybe<UpsertValueInput>
}

export type UpsertPropsResponse = {
  ok: Scalars['Boolean']
}

export type UpsertValueInput = {
  stringValue?: Maybe<StringValueInput>
  intValue?: Maybe<IntValueInput>
  floatValue?: Maybe<FloatValueInput>
  booleanValue?: Maybe<BoleanValueInput>
  arrayValue?: Maybe<ArrayValueInput>
  interfaceValue?: Maybe<InterfaceValueInput>
  enumValueId?: Maybe<Scalars['String']>
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

export type CreateAppMutationVariables = Exact<{
  input: CreateAppInput
}>

export type CreateAppMutation = { createApp: __AppFragment }

export type DeleteAppMutationVariables = Exact<{
  input: DeleteAppInput
}>

export type DeleteAppMutation = { deleteApp: Pick<App, 'id'> }

export type GetAppQueryVariables = Exact<{
  input: GetAppInput
}>

export type GetAppQuery = { app?: Maybe<__AppFragment> }

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { apps: Array<__AppFragment> }

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { app: __AppFragment }

export type __AppFragment = Pick<App, 'id' | 'name'>

export type __AtomFragment = Pick<Atom, 'id' | 'label' | 'type'> & {
  propTypes: __InterfaceWithoutFieldsFragment
}

export type CreateAtomMutationVariables = Exact<{
  input: CreateAtomInput
}>

export type CreateAtomMutation = { createAtom: __AtomFragment }

export type DeleteAtomMutationVariables = Exact<{
  input: DeleteAtomInput
}>

export type DeleteAtomMutation = {
  deleteAtom: Pick<DeleteResponse, 'affected'>
}

export type GetAtomQueryVariables = Exact<{
  input: GetAtomInput
}>

export type GetAtomQuery = { atom?: Maybe<__AtomFragment> }

export type GetAtomsQueryVariables = Exact<{ [key: string]: never }>

export type GetAtomsQuery = { atoms: Array<__AtomFragment> }

export type UpdateAtomMutationVariables = Exact<{
  input: UpdateAtomInput
}>

export type UpdateAtomMutation = { atom: __AtomFragment }

export type ElementFragment = Pick<Element, 'id' | 'name' | 'css'> & {
  atom?: Maybe<__AtomFragment>
  props: Array<__PropAggregateFragment>
}

export type ElementAggregateFragment = Pick<
  ElementAggregate,
  'id' | 'name' | 'css'
> & {
  atom?: Maybe<__AtomFragment>
  descendants: Array<ElementFragment>
  links: Array<ElementLinkFragment>
}

export type ElementLinkFragment = Pick<ElementLink, 'from' | 'order' | 'to'>

export type CreateElementMutationVariables = Exact<{
  input: CreateElementInput
}>

export type CreateElementMutation = { createElement: ElementFragment }

export type DeleteElementMutationVariables = Exact<{
  input: DeleteElementInput
}>

export type DeleteElementMutation = {
  deleteElement: Pick<DeleteResponse, 'affected'>
}

export type GetElementQueryVariables = Exact<{
  input: GetElementInput
}>

export type GetElementQuery = { getElement?: Maybe<ElementFragment> }

export type GetElementRootQueryVariables = Exact<{
  input: GetElementAggregateInput
}>

export type GetElementRootQuery = {
  getElementAggregate?: Maybe<ElementAggregateFragment>
}

export type MoveElementMutationVariables = Exact<{
  input: MoveElementInput
}>

export type MoveElementMutation = { moveElement: ElementFragment }

export type UpdateElementMutationVariables = Exact<{
  input: UpdateElementInput
}>

export type UpdateElementMutation = { updateElement: ElementFragment }

export type __LambdaFragment = Pick<Lambda, 'id' | 'name'>

export type CreateLambdaMutationVariables = Exact<{
  input: CreateLambdaInput
}>

export type CreateLambdaMutation = { createLambda: __LambdaFragment }

export type PageBaseFragment = Pick<Page, 'id' | 'name'> & {
  app: Pick<App, 'id' | 'name' | 'ownerId'>
}

export type PageFullFragment = {
  rootElement: ElementAggregateFragment
} & PageBaseFragment

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput
}>

export type CreatePageMutation = { createPage: PageBaseFragment }

export type DeletePageMutationVariables = Exact<{
  input: DeletePageInput
}>

export type DeletePageMutation = {
  deletePage: Pick<DeleteResponse, 'affected'>
}

export type GetPageQueryVariables = Exact<{
  input: GetPageInput
}>

export type GetPageQuery = { page?: Maybe<PageFullFragment> }

export type GetPagesQueryVariables = Exact<{
  input: GetPagesInput
}>

export type GetPagesQuery = { pages: Array<PageBaseFragment> }

export type UpdatePageMutationVariables = Exact<{
  input: UpdatePageInput
}>

export type UpdatePageMutation = { updatePage: PageBaseFragment }

export type __PropAggregateFragment = {
  props: Array<__PropFragment>
  values: Array<
    | __PropValue_StringValue_Fragment
    | __PropValue_IntValue_Fragment
    | __PropValue_FloatValue_Fragment
    | __PropValue_BooleanValue_Fragment
    | __PropValue_ArrayValue_Fragment
    | __PropValue_InterfaceValue_Fragment
    | __PropValue_EnumTypeValue_Fragment
  >
  rootProp: __PropFragment
}

export type __PropShallowFragment = Pick<Prop, 'id'> & {
  value?: Maybe<
    | __PropValueShallow_StringValue_Fragment
    | __PropValueShallow_IntValue_Fragment
    | __PropValueShallow_FloatValue_Fragment
    | __PropValueShallow_BooleanValue_Fragment
    | __PropValueShallow_ArrayValue_Fragment
    | __PropValueShallow_InterfaceValue_Fragment
    | __PropValueShallow_EnumTypeValue_Fragment
  >
  field: __FieldFragment
}

export type __PropFragment = Pick<Prop, 'id'> & {
  value?: Maybe<
    | __PropValueShallow_StringValue_Fragment
    | __PropValueShallow_IntValue_Fragment
    | __PropValueShallow_FloatValue_Fragment
    | __PropValueShallow_BooleanValue_Fragment
    | __PropValueShallow_ArrayValue_Fragment
    | __PropValueShallow_InterfaceValue_Fragment
    | __PropValueShallow_EnumTypeValue_Fragment
  >
  field: __FieldFragment
}

type __PropValue_StringValue_Fragment = {
  __typename: 'StringValue'
} & __PropValueShallow_StringValue_Fragment

type __PropValue_IntValue_Fragment = {
  __typename: 'IntValue'
} & __PropValueShallow_IntValue_Fragment

type __PropValue_FloatValue_Fragment = {
  __typename: 'FloatValue'
} & __PropValueShallow_FloatValue_Fragment

type __PropValue_BooleanValue_Fragment = {
  __typename: 'BooleanValue'
} & __PropValueShallow_BooleanValue_Fragment

type __PropValue_ArrayValue_Fragment = {
  __typename: 'ArrayValue'
} & __ArrayValueFragment &
  __PropValueShallow_ArrayValue_Fragment

type __PropValue_InterfaceValue_Fragment = {
  __typename: 'InterfaceValue'
} & __InterfaceValueFragment &
  __PropValueShallow_InterfaceValue_Fragment

type __PropValue_EnumTypeValue_Fragment = {
  __typename: 'EnumTypeValue'
} & __PropValueShallow_EnumTypeValue_Fragment

export type __PropValueFragment =
  | __PropValue_StringValue_Fragment
  | __PropValue_IntValue_Fragment
  | __PropValue_FloatValue_Fragment
  | __PropValue_BooleanValue_Fragment
  | __PropValue_ArrayValue_Fragment
  | __PropValue_InterfaceValue_Fragment
  | __PropValue_EnumTypeValue_Fragment

type __PropValueShallow_StringValue_Fragment = {
  __typename: 'StringValue'
} & __StringValueFragment

type __PropValueShallow_IntValue_Fragment = {
  __typename: 'IntValue'
} & __IntValueFragment

type __PropValueShallow_FloatValue_Fragment = {
  __typename: 'FloatValue'
} & __FloatValueFragment

type __PropValueShallow_BooleanValue_Fragment = {
  __typename: 'BooleanValue'
} & __BooleanValueFragment

type __PropValueShallow_ArrayValue_Fragment = {
  __typename: 'ArrayValue'
} & Pick<ArrayValue, 'id'>

type __PropValueShallow_InterfaceValue_Fragment = {
  __typename: 'InterfaceValue'
} & Pick<InterfaceValue, 'id'>

type __PropValueShallow_EnumTypeValue_Fragment = {
  __typename: 'EnumTypeValue'
} & __EnumTypeValueFragment

export type __PropValueShallowFragment =
  | __PropValueShallow_StringValue_Fragment
  | __PropValueShallow_IntValue_Fragment
  | __PropValueShallow_FloatValue_Fragment
  | __PropValueShallow_BooleanValue_Fragment
  | __PropValueShallow_ArrayValue_Fragment
  | __PropValueShallow_InterfaceValue_Fragment
  | __PropValueShallow_EnumTypeValue_Fragment

export type __StringValueFragment = Pick<StringValue, 'id' | 'stringValue'>

export type __IntValueFragment = Pick<IntValue, 'id' | 'intValue'>

export type __FloatValueFragment = Pick<FloatValue, 'id' | 'floatValue'>

export type __BooleanValueFragment = Pick<BooleanValue, 'id' | 'booleanValue'>

export type __ArrayValueFragment = Pick<ArrayValue, 'id'> & {
  values: Array<
    | __PropValueShallow_StringValue_Fragment
    | __PropValueShallow_IntValue_Fragment
    | __PropValueShallow_FloatValue_Fragment
    | __PropValueShallow_BooleanValue_Fragment
    | __PropValueShallow_ArrayValue_Fragment
    | __PropValueShallow_InterfaceValue_Fragment
    | __PropValueShallow_EnumTypeValue_Fragment
  >
}

export type __ArrayValueShallowFragment = Pick<ArrayValue, 'id'> & {
  values: Array<
    | __PropValueShallow_StringValue_Fragment
    | __PropValueShallow_IntValue_Fragment
    | __PropValueShallow_FloatValue_Fragment
    | __PropValueShallow_BooleanValue_Fragment
    | __PropValueShallow_ArrayValue_Fragment
    | __PropValueShallow_InterfaceValue_Fragment
    | __PropValueShallow_EnumTypeValue_Fragment
  >
}

export type __InterfaceValueFragment = Pick<InterfaceValue, 'id'> & {
  props: Array<__PropShallowFragment>
}

export type GetPropsQueryVariables = Exact<{
  input: GetPropsInput
}>

export type GetPropsQuery = { getProps: Array<__PropAggregateFragment> }

export type UpsertPropsMutationVariables = Exact<{
  input: Array<UpsertPropsInput> | UpsertPropsInput
}>

export type UpsertPropsMutation = {
  upsertProp: Pick<UpsertPropsResponse, 'ok'>
}

export type TestCreateFieldMutationVariables = Exact<{
  input: CreateFieldInput
}>

export type TestCreateFieldMutation = { createField: __FieldFragment }

export type TestCreateInterfaceMutationVariables = Exact<{
  input: CreateInterfaceInput
}>

export type TestCreateInterfaceMutation = {
  createInterface: __InterfaceFragment
}

export type TestDeleteFieldMutationVariables = Exact<{
  input: DeleteFieldInput
}>

export type TestDeleteFieldMutation = {
  deleteField: Pick<DeleteResponse, 'affected'>
}

export type TestGetFieldQueryVariables = Exact<{
  input: GetFieldInput
}>

export type TestGetFieldQuery = { getField?: Maybe<__FieldFragment> }

export type TestGetInterfaceQueryVariables = Exact<{
  input: GetInterfaceInput
}>

export type TestGetInterfaceQuery = {
  getInterface?: Maybe<__InterfaceFragment>
}

export type TestGetInterfacesQueryVariables = Exact<{ [key: string]: never }>

export type TestGetInterfacesQuery = {
  getInterfaces: Array<__InterfaceFragment>
}

export type TestGetTypeQueryVariables = Exact<{
  input: GetTypeInput
}>

export type TestGetTypeQuery = {
  getType?: Maybe<
    | __Type_ArrayType_Fragment
    | __Type_EnumType_Fragment
    | __Type_Interface_Fragment
    | __Type_PrimitiveType_Fragment
  >
}

export type TestUpdateFieldMutationVariables = Exact<{
  input: UpdateFieldInput
}>

export type TestUpdateFieldMutation = { updateField: __FieldFragment }

export type TestUpdateInterfaceMutationVariables = Exact<{
  input: UpdateInterfaceInput
}>

export type TestUpdateInterfaceMutation = {
  updateInterface: __InterfaceFragment
}

export type __FieldFragment = Pick<
  Field,
  'id' | 'key' | 'name' | 'typeId' | 'description'
>

export type __ArrayTypeFragment = Pick<ArrayType, 'id' | 'name' | 'typeId'>

export type __EnumTypeValueFragment = Pick<
  EnumTypeValue,
  'id' | 'name' | 'value'
>

export type __EnumTypeFragment = Pick<EnumType, 'id' | 'name'> & {
  allowedValues: Array<__EnumTypeValueFragment>
}

export type __PrimitiveTypeFragment = Pick<
  PrimitiveType,
  'id' | 'name' | 'primitiveKind'
>

type __Type_ArrayType_Fragment = { __typename: 'ArrayType' } & Pick<
  ArrayType,
  'id' | 'name'
> &
  __ArrayTypeFragment

type __Type_EnumType_Fragment = { __typename: 'EnumType' } & Pick<
  EnumType,
  'id' | 'name'
> &
  __EnumTypeFragment

type __Type_Interface_Fragment = { __typename: 'Interface' } & Pick<
  Interface,
  'id' | 'name'
> &
  __InterfaceWithoutTypesFragment

type __Type_PrimitiveType_Fragment = { __typename: 'PrimitiveType' } & Pick<
  PrimitiveType,
  'id' | 'name'
> &
  __PrimitiveTypeFragment

export type __TypeFragment =
  | __Type_ArrayType_Fragment
  | __Type_EnumType_Fragment
  | __Type_Interface_Fragment
  | __Type_PrimitiveType_Fragment

type __TypeShallow_ArrayType_Fragment = { __typename: 'ArrayType' } & Pick<
  ArrayType,
  'id'
>

type __TypeShallow_EnumType_Fragment = {
  __typename: 'EnumType'
} & __EnumTypeFragment

type __TypeShallow_Interface_Fragment = { __typename: 'Interface' } & Pick<
  Interface,
  'id'
>

type __TypeShallow_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
} & __PrimitiveTypeFragment

export type __TypeShallowFragment =
  | __TypeShallow_ArrayType_Fragment
  | __TypeShallow_EnumType_Fragment
  | __TypeShallow_Interface_Fragment
  | __TypeShallow_PrimitiveType_Fragment

export type __InterfaceWithoutFieldsFragment = Pick<Interface, 'id' | 'name'>

export type __InterfaceWithoutTypesFragment = {
  fieldCollection: {
    types: Array<
      | __TypeShallow_ArrayType_Fragment
      | __TypeShallow_EnumType_Fragment
      | __TypeShallow_Interface_Fragment
      | __TypeShallow_PrimitiveType_Fragment
    >
  } & __FieldCollectionWithoutTypesFragment
} & __InterfaceWithoutFieldsFragment

export type __FieldCollectionWithoutTypesFragment = {
  fields: Array<__FieldFragment>
}

export type __FieldCollectionFragment = {
  types: Array<
    | __Type_ArrayType_Fragment
    | __Type_EnumType_Fragment
    | __Type_Interface_Fragment
    | __Type_PrimitiveType_Fragment
  >
} & __FieldCollectionWithoutTypesFragment

export type __InterfaceFragment = {
  fieldCollection: __FieldCollectionFragment
} & __InterfaceWithoutFieldsFragment

export type CreateFieldMutationVariables = Exact<{
  input: CreateFieldInput
}>

export type CreateFieldMutation = { createField: __FieldFragment }

export type DeleteFieldMutationVariables = Exact<{
  input: DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteField: Pick<DeleteResponse, 'affected'>
}

export type GetFieldQueryVariables = Exact<{
  input: GetFieldInput
}>

export type GetFieldQuery = { getField?: Maybe<__FieldFragment> }

export type UpdateFieldMutationVariables = Exact<{
  input: UpdateFieldInput
}>

export type UpdateFieldMutation = { updateField: __FieldFragment }

export type CreateTypeMutationVariables = Exact<{
  input: CreateTypeInput
}>

export type CreateTypeMutation = {
  createType:
    | __Type_ArrayType_Fragment
    | __Type_EnumType_Fragment
    | __Type_Interface_Fragment
    | __Type_PrimitiveType_Fragment
}

export type DeleteTypeMutationVariables = Exact<{
  input: DeleteTypeInput
}>

export type DeleteTypeMutation = {
  deleteType: Pick<DeleteResponse, 'affected'>
}

export type GetInterfaceQueryVariables = Exact<{
  input: GetInterfaceInput
}>

export type GetInterfaceQuery = { getInterface?: Maybe<__InterfaceFragment> }

export type GetTypesQueryVariables = Exact<{ [key: string]: never }>

export type GetTypesQuery = {
  getTypes: Array<
    | ({ __typename: 'ArrayType' } & __Type_ArrayType_Fragment)
    | ({ __typename: 'EnumType' } & __Type_EnumType_Fragment)
    | ({ __typename: 'Interface' } & __Type_Interface_Fragment)
    | ({ __typename: 'PrimitiveType' } & __Type_PrimitiveType_Fragment)
  >
}

export type UpdateEnumTypeMutationVariables = Exact<{
  input: UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = { updateEnumType: __EnumTypeFragment }

export type UpdateTypeMutationVariables = Exact<{
  input: UpdateTypeInput
}>

export type UpdateTypeMutation = {
  updateType:
    | __Type_ArrayType_Fragment
    | __Type_EnumType_Fragment
    | __Type_Interface_Fragment
    | __Type_PrimitiveType_Fragment
}

export type UpdatePrimitiveTypeMutationVariables = Exact<{
  input: UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = {
  updatePrimitiveType: __PrimitiveTypeFragment
}

export type __UserFragment = Pick<User, 'email' | 'name'> & {
  id: User['user_id']
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = Pick<Mutation, 'deleteUser'>

export type GetUsersQueryVariables = Exact<{
  input?: Maybe<GetUsersInput>
}>

export type GetUsersQuery = { users: Array<__UserFragment> }

export const __AppFragmentDoc = gql`
  fragment __App on App {
    id
    name
  }
`
export const __LambdaFragmentDoc = gql`
  fragment __Lambda on Lambda {
    id
    name
  }
`
export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
    app {
      id
      name
      ownerId
    }
  }
`
export const __InterfaceWithoutFieldsFragmentDoc = gql`
  fragment __InterfaceWithoutFields on Interface {
    id
    name
  }
`
export const __AtomFragmentDoc = gql`
  fragment __Atom on Atom {
    id
    label
    type
    propTypes {
      ...__InterfaceWithoutFields
    }
  }
  ${__InterfaceWithoutFieldsFragmentDoc}
`
export const __StringValueFragmentDoc = gql`
  fragment __StringValue on StringValue {
    id
    stringValue
  }
`
export const __IntValueFragmentDoc = gql`
  fragment __IntValue on IntValue {
    id
    intValue
  }
`
export const __FloatValueFragmentDoc = gql`
  fragment __FloatValue on FloatValue {
    id
    floatValue
  }
`
export const __BooleanValueFragmentDoc = gql`
  fragment __BooleanValue on BooleanValue {
    id
    booleanValue
  }
`
export const __EnumTypeValueFragmentDoc = gql`
  fragment __EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const __PropValueShallowFragmentDoc = gql`
  fragment __PropValueShallow on PropValue {
    __typename
    ... on StringValue {
      ...__StringValue
    }
    ... on IntValue {
      ...__IntValue
    }
    ... on FloatValue {
      ...__FloatValue
    }
    ... on BooleanValue {
      ...__BooleanValue
    }
    ... on EnumTypeValue {
      ...__EnumTypeValue
    }
    ... on ArrayValue {
      id
    }
    ... on InterfaceValue {
      id
    }
  }
  ${__StringValueFragmentDoc}
  ${__IntValueFragmentDoc}
  ${__FloatValueFragmentDoc}
  ${__BooleanValueFragmentDoc}
  ${__EnumTypeValueFragmentDoc}
`
export const __FieldFragmentDoc = gql`
  fragment __Field on Field {
    id
    key
    name
    typeId
    description
  }
`
export const __PropFragmentDoc = gql`
  fragment __Prop on Prop {
    id
    value {
      ...__PropValueShallow
    }
    field {
      ...__Field
    }
  }
  ${__PropValueShallowFragmentDoc}
  ${__FieldFragmentDoc}
`
export const __PropShallowFragmentDoc = gql`
  fragment __PropShallow on Prop {
    id
    value {
      ...__PropValueShallow
    }
    field {
      ...__Field
    }
  }
  ${__PropValueShallowFragmentDoc}
  ${__FieldFragmentDoc}
`
export const __InterfaceValueFragmentDoc = gql`
  fragment __InterfaceValue on InterfaceValue {
    id
    props {
      ...__PropShallow
    }
  }
  ${__PropShallowFragmentDoc}
`
export const __ArrayValueFragmentDoc = gql`
  fragment __ArrayValue on ArrayValue {
    id
    values {
      ...__PropValueShallow
    }
  }
  ${__PropValueShallowFragmentDoc}
`
export const __PropValueFragmentDoc = gql`
  fragment __PropValue on PropValue {
    __typename
    ...__PropValueShallow
    ... on InterfaceValue {
      ...__InterfaceValue
    }
    ... on ArrayValue {
      ...__ArrayValue
    }
  }
  ${__PropValueShallowFragmentDoc}
  ${__InterfaceValueFragmentDoc}
  ${__ArrayValueFragmentDoc}
`
export const __PropAggregateFragmentDoc = gql`
  fragment __PropAggregate on PropAggregate {
    props {
      ...__Prop
    }
    values {
      ...__PropValue
    }
    rootProp {
      ...__Prop
    }
  }
  ${__PropFragmentDoc}
  ${__PropValueFragmentDoc}
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    id
    name
    css
    atom {
      ...__Atom
    }
    props {
      ...__PropAggregate
    }
  }
  ${__AtomFragmentDoc}
  ${__PropAggregateFragmentDoc}
`
export const ElementLinkFragmentDoc = gql`
  fragment ElementLink on ElementLink {
    from
    order
    to
  }
`
export const ElementAggregateFragmentDoc = gql`
  fragment ElementAggregate on ElementAggregate {
    id
    name
    css
    atom {
      ...__Atom
    }
    descendants {
      ...Element
    }
    links {
      ...ElementLink
    }
  }
  ${__AtomFragmentDoc}
  ${ElementFragmentDoc}
  ${ElementLinkFragmentDoc}
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...ElementAggregate
    }
  }
  ${PageBaseFragmentDoc}
  ${ElementAggregateFragmentDoc}
`
export const __ArrayValueShallowFragmentDoc = gql`
  fragment __ArrayValueShallow on ArrayValue {
    id
    values {
      ...__PropValueShallow
    }
  }
  ${__PropValueShallowFragmentDoc}
`
export const __FieldCollectionWithoutTypesFragmentDoc = gql`
  fragment __FieldCollectionWithoutTypes on FieldCollection {
    fields {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`
export const __ArrayTypeFragmentDoc = gql`
  fragment __ArrayType on ArrayType {
    id
    name
    typeId
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
export const __TypeShallowFragmentDoc = gql`
  fragment __TypeShallow on Type {
    __typename
    ... on ArrayType {
      id
    }
    ... on EnumType {
      ...__EnumType
    }
    ... on Interface {
      id
    }
    ... on PrimitiveType {
      ...__PrimitiveType
    }
  }
  ${__EnumTypeFragmentDoc}
  ${__PrimitiveTypeFragmentDoc}
`
export const __InterfaceWithoutTypesFragmentDoc = gql`
  fragment __InterfaceWithoutTypes on Interface {
    ...__InterfaceWithoutFields
    fieldCollection {
      ...__FieldCollectionWithoutTypes
      types {
        ...__TypeShallow
      }
    }
  }
  ${__InterfaceWithoutFieldsFragmentDoc}
  ${__FieldCollectionWithoutTypesFragmentDoc}
  ${__TypeShallowFragmentDoc}
`
export const __TypeFragmentDoc = gql`
  fragment __Type on Type {
    __typename
    id
    name
    ... on ArrayType {
      ...__ArrayType
    }
    ... on EnumType {
      ...__EnumType
    }
    ... on Interface {
      ...__InterfaceWithoutTypes
    }
    ... on PrimitiveType {
      ...__PrimitiveType
    }
  }
  ${__ArrayTypeFragmentDoc}
  ${__EnumTypeFragmentDoc}
  ${__InterfaceWithoutTypesFragmentDoc}
  ${__PrimitiveTypeFragmentDoc}
`
export const __FieldCollectionFragmentDoc = gql`
  fragment __FieldCollection on FieldCollection {
    ...__FieldCollectionWithoutTypes
    types {
      ...__Type
    }
  }
  ${__FieldCollectionWithoutTypesFragmentDoc}
  ${__TypeFragmentDoc}
`
export const __InterfaceFragmentDoc = gql`
  fragment __Interface on Interface {
    ...__InterfaceWithoutFields
    fieldCollection {
      ...__FieldCollection
    }
  }
  ${__InterfaceWithoutFieldsFragmentDoc}
  ${__FieldCollectionFragmentDoc}
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
      ...__App
    }
  }
  ${__AppFragmentDoc}
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
    deleteApp(input: $input) {
      id
    }
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
    app: getApp(input: $input) {
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
    app: updateApp(input: $input) {
      ...__App
    }
  }
  ${__AppFragmentDoc}
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
export const CreateAtomGql = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
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
    deleteAtom(input: $input) {
      affected
    }
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
    atom: updateAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
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
export const CreateElementGql = gql`
  mutation CreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
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
    deleteElement(input: $input) {
      affected
    }
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
export const GetElementRootGql = gql`
  query GetElementRoot($input: GetElementAggregateInput!) {
    getElementAggregate(input: $input) {
      ...ElementAggregate
    }
  }
  ${ElementAggregateFragmentDoc}
`

/**
 * __useGetElementRootQuery__
 *
 * To run a query within a React component, call `useGetElementRootQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementRootQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementRootQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetElementRootQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementRootQuery,
    GetElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementRootQuery, GetElementRootQueryVariables>(
    GetElementRootGql,
    options,
  )
}
export function useGetElementRootLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementRootQuery,
    GetElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElementRootQuery, GetElementRootQueryVariables>(
    GetElementRootGql,
    options,
  )
}
export type GetElementRootQueryHookResult = ReturnType<
  typeof useGetElementRootQuery
>
export type GetElementRootLazyQueryHookResult = ReturnType<
  typeof useGetElementRootLazyQuery
>
export type GetElementRootQueryResult = Apollo.QueryResult<
  GetElementRootQuery,
  GetElementRootQueryVariables
>
export function refetchGetElementRootQuery(
  variables?: GetElementRootQueryVariables,
) {
  return { query: GetElementRootGql, variables: variables }
}
export const MoveElementGql = gql`
  mutation MoveElement($input: MoveElementInput!) {
    moveElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
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
export const UpdateElementGql = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
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
export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
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
    deletePage(input: $input) {
      affected
    }
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
    updatePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
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
export const GetPropsGql = gql`
  query GetProps($input: GetPropsInput!) {
    getProps(input: $input) {
      ...__PropAggregate
    }
  }
  ${__PropAggregateFragmentDoc}
`

/**
 * __useGetPropsQuery__
 *
 * To run a query within a React component, call `useGetPropsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPropsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPropsQuery, GetPropsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPropsQuery, GetPropsQueryVariables>(
    GetPropsGql,
    options,
  )
}
export function useGetPropsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPropsQuery,
    GetPropsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPropsQuery, GetPropsQueryVariables>(
    GetPropsGql,
    options,
  )
}
export type GetPropsQueryHookResult = ReturnType<typeof useGetPropsQuery>
export type GetPropsLazyQueryHookResult = ReturnType<
  typeof useGetPropsLazyQuery
>
export type GetPropsQueryResult = Apollo.QueryResult<
  GetPropsQuery,
  GetPropsQueryVariables
>
export function refetchGetPropsQuery(variables?: GetPropsQueryVariables) {
  return { query: GetPropsGql, variables: variables }
}
export const UpsertPropsGql = gql`
  mutation UpsertProps($input: [UpsertPropsInput!]!) {
    upsertProp(input: $input) {
      ok
    }
  }
`
export type UpsertPropsMutationFn = Apollo.MutationFunction<
  UpsertPropsMutation,
  UpsertPropsMutationVariables
>

/**
 * __useUpsertPropsMutation__
 *
 * To run a mutation, you first call `useUpsertPropsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPropsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPropsMutation, { data, loading, error }] = useUpsertPropsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertPropsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPropsMutation,
    UpsertPropsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpsertPropsMutation, UpsertPropsMutationVariables>(
    UpsertPropsGql,
    options,
  )
}
export type UpsertPropsMutationHookResult = ReturnType<
  typeof useUpsertPropsMutation
>
export type UpsertPropsMutationResult =
  Apollo.MutationResult<UpsertPropsMutation>
export type UpsertPropsMutationOptions = Apollo.BaseMutationOptions<
  UpsertPropsMutation,
  UpsertPropsMutationVariables
>
export const TestCreateFieldGql = gql`
  mutation TestCreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`
export type TestCreateFieldMutationFn = Apollo.MutationFunction<
  TestCreateFieldMutation,
  TestCreateFieldMutationVariables
>

/**
 * __useTestCreateFieldMutation__
 *
 * To run a mutation, you first call `useTestCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateFieldMutation, { data, loading, error }] = useTestCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateFieldMutation,
    TestCreateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateFieldMutation,
    TestCreateFieldMutationVariables
  >(TestCreateFieldGql, options)
}
export type TestCreateFieldMutationHookResult = ReturnType<
  typeof useTestCreateFieldMutation
>
export type TestCreateFieldMutationResult =
  Apollo.MutationResult<TestCreateFieldMutation>
export type TestCreateFieldMutationOptions = Apollo.BaseMutationOptions<
  TestCreateFieldMutation,
  TestCreateFieldMutationVariables
>
export const TestCreateInterfaceGql = gql`
  mutation TestCreateInterface($input: CreateInterfaceInput!) {
    createInterface(input: $input) {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`
export type TestCreateInterfaceMutationFn = Apollo.MutationFunction<
  TestCreateInterfaceMutation,
  TestCreateInterfaceMutationVariables
>

/**
 * __useTestCreateInterfaceMutation__
 *
 * To run a mutation, you first call `useTestCreateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateInterfaceMutation, { data, loading, error }] = useTestCreateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateInterfaceMutation,
    TestCreateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateInterfaceMutation,
    TestCreateInterfaceMutationVariables
  >(TestCreateInterfaceGql, options)
}
export type TestCreateInterfaceMutationHookResult = ReturnType<
  typeof useTestCreateInterfaceMutation
>
export type TestCreateInterfaceMutationResult =
  Apollo.MutationResult<TestCreateInterfaceMutation>
export type TestCreateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  TestCreateInterfaceMutation,
  TestCreateInterfaceMutationVariables
>
export const TestDeleteFieldGql = gql`
  mutation TestDeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      affected
    }
  }
`
export type TestDeleteFieldMutationFn = Apollo.MutationFunction<
  TestDeleteFieldMutation,
  TestDeleteFieldMutationVariables
>

/**
 * __useTestDeleteFieldMutation__
 *
 * To run a mutation, you first call `useTestDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteFieldMutation, { data, loading, error }] = useTestDeleteFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteFieldMutation,
    TestDeleteFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteFieldMutation,
    TestDeleteFieldMutationVariables
  >(TestDeleteFieldGql, options)
}
export type TestDeleteFieldMutationHookResult = ReturnType<
  typeof useTestDeleteFieldMutation
>
export type TestDeleteFieldMutationResult =
  Apollo.MutationResult<TestDeleteFieldMutation>
export type TestDeleteFieldMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteFieldMutation,
  TestDeleteFieldMutationVariables
>
export const TestGetFieldGql = gql`
  query TestGetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`

/**
 * __useTestGetFieldQuery__
 *
 * To run a query within a React component, call `useTestGetFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetFieldQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetFieldQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetFieldQuery,
    TestGetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetFieldQuery, TestGetFieldQueryVariables>(
    TestGetFieldGql,
    options,
  )
}
export function useTestGetFieldLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetFieldQuery,
    TestGetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetFieldQuery, TestGetFieldQueryVariables>(
    TestGetFieldGql,
    options,
  )
}
export type TestGetFieldQueryHookResult = ReturnType<
  typeof useTestGetFieldQuery
>
export type TestGetFieldLazyQueryHookResult = ReturnType<
  typeof useTestGetFieldLazyQuery
>
export type TestGetFieldQueryResult = Apollo.QueryResult<
  TestGetFieldQuery,
  TestGetFieldQueryVariables
>
export function refetchTestGetFieldQuery(
  variables?: TestGetFieldQueryVariables,
) {
  return { query: TestGetFieldGql, variables: variables }
}
export const TestGetInterfaceGql = gql`
  query TestGetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`

/**
 * __useTestGetInterfaceQuery__
 *
 * To run a query within a React component, call `useTestGetInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetInterfaceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetInterfaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetInterfaceQuery, TestGetInterfaceQueryVariables>(
    TestGetInterfaceGql,
    options,
  )
}
export function useTestGetInterfaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >(TestGetInterfaceGql, options)
}
export type TestGetInterfaceQueryHookResult = ReturnType<
  typeof useTestGetInterfaceQuery
>
export type TestGetInterfaceLazyQueryHookResult = ReturnType<
  typeof useTestGetInterfaceLazyQuery
>
export type TestGetInterfaceQueryResult = Apollo.QueryResult<
  TestGetInterfaceQuery,
  TestGetInterfaceQueryVariables
>
export function refetchTestGetInterfaceQuery(
  variables?: TestGetInterfaceQueryVariables,
) {
  return { query: TestGetInterfaceGql, variables: variables }
}
export const TestGetInterfacesGql = gql`
  query TestGetInterfaces {
    getInterfaces {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`

/**
 * __useTestGetInterfacesQuery__
 *
 * To run a query within a React component, call `useTestGetInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetInterfacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestGetInterfacesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestGetInterfacesQuery,
    TestGetInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    TestGetInterfacesQuery,
    TestGetInterfacesQueryVariables
  >(TestGetInterfacesGql, options)
}
export function useTestGetInterfacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetInterfacesQuery,
    TestGetInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetInterfacesQuery,
    TestGetInterfacesQueryVariables
  >(TestGetInterfacesGql, options)
}
export type TestGetInterfacesQueryHookResult = ReturnType<
  typeof useTestGetInterfacesQuery
>
export type TestGetInterfacesLazyQueryHookResult = ReturnType<
  typeof useTestGetInterfacesLazyQuery
>
export type TestGetInterfacesQueryResult = Apollo.QueryResult<
  TestGetInterfacesQuery,
  TestGetInterfacesQueryVariables
>
export function refetchTestGetInterfacesQuery(
  variables?: TestGetInterfacesQueryVariables,
) {
  return { query: TestGetInterfacesGql, variables: variables }
}
export const TestGetTypeGql = gql`
  query TestGetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...__Type
    }
  }
  ${__TypeFragmentDoc}
`

/**
 * __useTestGetTypeQuery__
 *
 * To run a query within a React component, call `useTestGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTypeQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetTypeQuery,
    TestGetTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(
    TestGetTypeGql,
    options,
  )
}
export function useTestGetTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetTypeQuery,
    TestGetTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(
    TestGetTypeGql,
    options,
  )
}
export type TestGetTypeQueryHookResult = ReturnType<typeof useTestGetTypeQuery>
export type TestGetTypeLazyQueryHookResult = ReturnType<
  typeof useTestGetTypeLazyQuery
>
export type TestGetTypeQueryResult = Apollo.QueryResult<
  TestGetTypeQuery,
  TestGetTypeQueryVariables
>
export function refetchTestGetTypeQuery(variables?: TestGetTypeQueryVariables) {
  return { query: TestGetTypeGql, variables: variables }
}
export const TestUpdateFieldGql = gql`
  mutation TestUpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
`
export type TestUpdateFieldMutationFn = Apollo.MutationFunction<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>

/**
 * __useTestUpdateFieldMutation__
 *
 * To run a mutation, you first call `useTestUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateFieldMutation, { data, loading, error }] = useTestUpdateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >(TestUpdateFieldGql, options)
}
export type TestUpdateFieldMutationHookResult = ReturnType<
  typeof useTestUpdateFieldMutation
>
export type TestUpdateFieldMutationResult =
  Apollo.MutationResult<TestUpdateFieldMutation>
export type TestUpdateFieldMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>
export const TestUpdateInterfaceGql = gql`
  mutation TestUpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`
export type TestUpdateInterfaceMutationFn = Apollo.MutationFunction<
  TestUpdateInterfaceMutation,
  TestUpdateInterfaceMutationVariables
>

/**
 * __useTestUpdateInterfaceMutation__
 *
 * To run a mutation, you first call `useTestUpdateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateInterfaceMutation, { data, loading, error }] = useTestUpdateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateInterfaceMutation,
    TestUpdateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateInterfaceMutation,
    TestUpdateInterfaceMutationVariables
  >(TestUpdateInterfaceGql, options)
}
export type TestUpdateInterfaceMutationHookResult = ReturnType<
  typeof useTestUpdateInterfaceMutation
>
export type TestUpdateInterfaceMutationResult =
  Apollo.MutationResult<TestUpdateInterfaceMutation>
export type TestUpdateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateInterfaceMutation,
  TestUpdateInterfaceMutationVariables
>
export const CreateFieldGql = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
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
    deleteField(input: $input) {
      affected
    }
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
    updateField(input: $input) {
      ...__Field
    }
  }
  ${__FieldFragmentDoc}
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
      ...__Type
    }
  }
  ${__TypeFragmentDoc}
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
    deleteType(input: $input) {
      affected
    }
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
export const GetInterfaceGql = gql`
  query GetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...__Interface
    }
  }
  ${__InterfaceFragmentDoc}
`

/**
 * __useGetInterfaceQuery__
 *
 * To run a query within a React component, call `useGetInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterfaceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetInterfaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInterfaceQuery,
    GetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetInterfaceQuery, GetInterfaceQueryVariables>(
    GetInterfaceGql,
    options,
  )
}
export function useGetInterfaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInterfaceQuery,
    GetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetInterfaceQuery, GetInterfaceQueryVariables>(
    GetInterfaceGql,
    options,
  )
}
export type GetInterfaceQueryHookResult = ReturnType<
  typeof useGetInterfaceQuery
>
export type GetInterfaceLazyQueryHookResult = ReturnType<
  typeof useGetInterfaceLazyQuery
>
export type GetInterfaceQueryResult = Apollo.QueryResult<
  GetInterfaceQuery,
  GetInterfaceQueryVariables
>
export function refetchGetInterfaceQuery(
  variables?: GetInterfaceQueryVariables,
) {
  return { query: GetInterfaceGql, variables: variables }
}
export const GetTypesGql = gql`
  query GetTypes {
    getTypes {
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
    updateEnumType(input: $input) {
      ...__EnumType
    }
  }
  ${__EnumTypeFragmentDoc}
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
    updateType(input: $input) {
      ...__Type
    }
  }
  ${__TypeFragmentDoc}
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
    updatePrimitiveType(input: $input) {
      ...__PrimitiveType
    }
  }
  ${__PrimitiveTypeFragmentDoc}
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
export const __App = gql`
  fragment __App on App {
    id
    name
  }
`
export const __Lambda = gql`
  fragment __Lambda on Lambda {
    id
    name
  }
`
export const PageBase = gql`
  fragment PageBase on Page {
    id
    name
    app {
      id
      name
      ownerId
    }
  }
`
export const __InterfaceWithoutFields = gql`
  fragment __InterfaceWithoutFields on Interface {
    id
    name
  }
`
export const __Atom = gql`
  fragment __Atom on Atom {
    id
    label
    type
    propTypes {
      ...__InterfaceWithoutFields
    }
  }
  ${__InterfaceWithoutFields}
`
export const __StringValue = gql`
  fragment __StringValue on StringValue {
    id
    stringValue
  }
`
export const __IntValue = gql`
  fragment __IntValue on IntValue {
    id
    intValue
  }
`
export const __FloatValue = gql`
  fragment __FloatValue on FloatValue {
    id
    floatValue
  }
`
export const __BooleanValue = gql`
  fragment __BooleanValue on BooleanValue {
    id
    booleanValue
  }
`
export const __EnumTypeValue = gql`
  fragment __EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const __PropValueShallow = gql`
  fragment __PropValueShallow on PropValue {
    __typename
    ... on StringValue {
      ...__StringValue
    }
    ... on IntValue {
      ...__IntValue
    }
    ... on FloatValue {
      ...__FloatValue
    }
    ... on BooleanValue {
      ...__BooleanValue
    }
    ... on EnumTypeValue {
      ...__EnumTypeValue
    }
    ... on ArrayValue {
      id
    }
    ... on InterfaceValue {
      id
    }
  }
  ${__StringValue}
  ${__IntValue}
  ${__FloatValue}
  ${__BooleanValue}
  ${__EnumTypeValue}
`
export const __Field = gql`
  fragment __Field on Field {
    id
    key
    name
    typeId
    description
  }
`
export const __Prop = gql`
  fragment __Prop on Prop {
    id
    value {
      ...__PropValueShallow
    }
    field {
      ...__Field
    }
  }
  ${__PropValueShallow}
  ${__Field}
`
export const __PropShallow = gql`
  fragment __PropShallow on Prop {
    id
    value {
      ...__PropValueShallow
    }
    field {
      ...__Field
    }
  }
  ${__PropValueShallow}
  ${__Field}
`
export const __InterfaceValue = gql`
  fragment __InterfaceValue on InterfaceValue {
    id
    props {
      ...__PropShallow
    }
  }
  ${__PropShallow}
`
export const __ArrayValue = gql`
  fragment __ArrayValue on ArrayValue {
    id
    values {
      ...__PropValueShallow
    }
  }
  ${__PropValueShallow}
`
export const __PropValue = gql`
  fragment __PropValue on PropValue {
    __typename
    ...__PropValueShallow
    ... on InterfaceValue {
      ...__InterfaceValue
    }
    ... on ArrayValue {
      ...__ArrayValue
    }
  }
  ${__PropValueShallow}
  ${__InterfaceValue}
  ${__ArrayValue}
`
export const __PropAggregate = gql`
  fragment __PropAggregate on PropAggregate {
    props {
      ...__Prop
    }
    values {
      ...__PropValue
    }
    rootProp {
      ...__Prop
    }
  }
  ${__Prop}
  ${__PropValue}
`
export const Element = gql`
  fragment Element on Element {
    id
    name
    css
    atom {
      ...__Atom
    }
    props {
      ...__PropAggregate
    }
  }
  ${__Atom}
  ${__PropAggregate}
`
export const ElementLink = gql`
  fragment ElementLink on ElementLink {
    from
    order
    to
  }
`
export const ElementAggregate = gql`
  fragment ElementAggregate on ElementAggregate {
    id
    name
    css
    atom {
      ...__Atom
    }
    descendants {
      ...Element
    }
    links {
      ...ElementLink
    }
  }
  ${__Atom}
  ${Element}
  ${ElementLink}
`
export const PageFull = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...ElementAggregate
    }
  }
  ${PageBase}
  ${ElementAggregate}
`
export const __ArrayValueShallow = gql`
  fragment __ArrayValueShallow on ArrayValue {
    id
    values {
      ...__PropValueShallow
    }
  }
  ${__PropValueShallow}
`
export const __FieldCollectionWithoutTypes = gql`
  fragment __FieldCollectionWithoutTypes on FieldCollection {
    fields {
      ...__Field
    }
  }
  ${__Field}
`
export const __ArrayType = gql`
  fragment __ArrayType on ArrayType {
    id
    name
    typeId
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
export const __TypeShallow = gql`
  fragment __TypeShallow on Type {
    __typename
    ... on ArrayType {
      id
    }
    ... on EnumType {
      ...__EnumType
    }
    ... on Interface {
      id
    }
    ... on PrimitiveType {
      ...__PrimitiveType
    }
  }
  ${__EnumType}
  ${__PrimitiveType}
`
export const __InterfaceWithoutTypes = gql`
  fragment __InterfaceWithoutTypes on Interface {
    ...__InterfaceWithoutFields
    fieldCollection {
      ...__FieldCollectionWithoutTypes
      types {
        ...__TypeShallow
      }
    }
  }
  ${__InterfaceWithoutFields}
  ${__FieldCollectionWithoutTypes}
  ${__TypeShallow}
`
export const __Type = gql`
  fragment __Type on Type {
    __typename
    id
    name
    ... on ArrayType {
      ...__ArrayType
    }
    ... on EnumType {
      ...__EnumType
    }
    ... on Interface {
      ...__InterfaceWithoutTypes
    }
    ... on PrimitiveType {
      ...__PrimitiveType
    }
  }
  ${__ArrayType}
  ${__EnumType}
  ${__InterfaceWithoutTypes}
  ${__PrimitiveType}
`
export const __FieldCollection = gql`
  fragment __FieldCollection on FieldCollection {
    ...__FieldCollectionWithoutTypes
    types {
      ...__Type
    }
  }
  ${__FieldCollectionWithoutTypes}
  ${__Type}
`
export const __Interface = gql`
  fragment __Interface on Interface {
    ...__InterfaceWithoutFields
    fieldCollection {
      ...__FieldCollection
    }
  }
  ${__InterfaceWithoutFields}
  ${__FieldCollection}
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
      ...__App
    }
  }
  ${__App}
`
export const DeleteApp = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
    }
  }
`
export const GetApp = gql`
  query GetApp($input: GetAppInput!) {
    app: getApp(input: $input) {
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
    app: updateApp(input: $input) {
      ...__App
    }
  }
  ${__App}
`
export const CreateAtom = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const DeleteAtom = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      affected
    }
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
    atom: updateAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const CreateElement = gql`
  mutation CreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      ...Element
    }
  }
  ${Element}
`
export const DeleteElement = gql`
  mutation DeleteElement($input: DeleteElementInput!) {
    deleteElement(input: $input) {
      affected
    }
  }
`
export const GetElement = gql`
  query GetElement($input: GetElementInput!) {
    getElement(input: $input) {
      ...Element
    }
  }
  ${Element}
`
export const GetElementRoot = gql`
  query GetElementRoot($input: GetElementAggregateInput!) {
    getElementAggregate(input: $input) {
      ...ElementAggregate
    }
  }
  ${ElementAggregate}
`
export const MoveElement = gql`
  mutation MoveElement($input: MoveElementInput!) {
    moveElement(input: $input) {
      ...Element
    }
  }
  ${Element}
`
export const UpdateElement = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
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
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const DeletePage = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      affected
    }
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
    updatePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const GetProps = gql`
  query GetProps($input: GetPropsInput!) {
    getProps(input: $input) {
      ...__PropAggregate
    }
  }
  ${__PropAggregate}
`
export const UpsertProps = gql`
  mutation UpsertProps($input: [UpsertPropsInput!]!) {
    upsertProp(input: $input) {
      ok
    }
  }
`
export const TestCreateField = gql`
  mutation TestCreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const TestCreateInterface = gql`
  mutation TestCreateInterface($input: CreateInterfaceInput!) {
    createInterface(input: $input) {
      ...__Interface
    }
  }
  ${__Interface}
`
export const TestDeleteField = gql`
  mutation TestDeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      affected
    }
  }
`
export const TestGetField = gql`
  query TestGetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const TestGetInterface = gql`
  query TestGetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...__Interface
    }
  }
  ${__Interface}
`
export const TestGetInterfaces = gql`
  query TestGetInterfaces {
    getInterfaces {
      ...__Interface
    }
  }
  ${__Interface}
`
export const TestGetType = gql`
  query TestGetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...__Type
    }
  }
  ${__Type}
`
export const TestUpdateField = gql`
  mutation TestUpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const TestUpdateInterface = gql`
  mutation TestUpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      ...__Interface
    }
  }
  ${__Interface}
`
export const CreateField = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const DeleteField = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      affected
    }
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
    updateField(input: $input) {
      ...__Field
    }
  }
  ${__Field}
`
export const CreateType = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      ...__Type
    }
  }
  ${__Type}
`
export const DeleteType = gql`
  mutation DeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input) {
      affected
    }
  }
`
export const GetInterface = gql`
  query GetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...__Interface
    }
  }
  ${__Interface}
`
export const GetTypes = gql`
  query GetTypes {
    getTypes {
      __typename
      ...__Type
    }
  }
  ${__Type}
`
export const UpdateEnumType = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      ...__EnumType
    }
  }
  ${__EnumType}
`
export const UpdateType = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      ...__Type
    }
  }
  ${__Type}
`
export const UpdatePrimitiveType = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      ...__PrimitiveType
    }
  }
  ${__PrimitiveType}
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
