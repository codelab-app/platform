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

export type AtomByPageElementFilter = {
  pageElementId: Scalars['String']
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

export type CreatePageElementInput = {
  name: Scalars['String']
  atomId?: Maybe<Scalars['String']>
  parentPageElementId: Scalars['String']
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>
}

export type CreatePageInput = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type CreateSimpleTypeInput = {
  primitiveType: PrimitiveType
}

/** Provide one of the properties */
export type CreateTypeInput = {
  name: Scalars['String']
  simpleType?: Maybe<CreateSimpleTypeInput>
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

export type DeleteFieldInput = {
  fieldId: Scalars['String']
}

export type DeletePageElementInput = {
  pageElementId: Scalars['String']
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
  byPageElement?: Maybe<AtomByPageElementFilter>
}

export type GetAtomInput = {
  atomId: Scalars['String']
}

export type GetFieldInput = {
  byInterface?: Maybe<FieldByInterfaceFilter>
  byId?: Maybe<FieldByIdFilter>
}

export type GetInterfaceInput = {
  interfaceId: Scalars['String']
}

export type GetPageElementInput = {
  pageElementId: Scalars['String']
}

export type GetPageElementRootInput = {
  pageElementId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type GetPagesInput = {
  appId: Scalars['String']
}

export type GetPropsInput = {
  byPageElement?: Maybe<PropsByPageElementFilter>
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

export type MoveData = {
  order: Scalars['Int']
  parentElementId: Scalars['String']
}

export type MovePageElementInput = {
  pageElementId: Scalars['String']
  moveData: MoveData
}

export type Mutation = {
  createApp: App
  updateApp: App
  deleteApp: App
  updateUser: User
  deleteUser: Scalars['Boolean']
  createPage: Page
  deletePage: DeleteResponse
  updatePage: Page
  createPageElement: PageElement
  updatePageElement: PageElement
  movePageElement: PageElement
  /** Deletes a page element and all the descending page elements */
  deletePageElement: DeleteResponse
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
  updateSimpleType: SimpleType
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

export type MutationCreatePageElementArgs = {
  input: CreatePageElementInput
}

export type MutationUpdatePageElementArgs = {
  input: UpdatePageElementInput
}

export type MutationMovePageElementArgs = {
  input: MovePageElementInput
}

export type MutationDeletePageElementArgs = {
  input: DeletePageElementInput
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

export type MutationUpdateSimpleTypeArgs = {
  input: UpdateSimpleTypeInput
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
  rootElement: PageElementRoot
}

export type PageElement = {
  id: Scalars['ID']
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atom?: Maybe<Atom>
  props: Array<PropAggregate>
}

export type PageElementLink = {
  /** The id of the source PageElement */
  from: Scalars['String']
  /** The id of the target PageElement */
  to: Scalars['String']
  order: Scalars['Int']
}

export type PageElementRoot = {
  id: Scalars['ID']
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atom?: Maybe<Atom>
  props: Array<PropAggregate>
  /** All descendant PageElements that are under this root, at any level */
  descendants: Array<PageElement>
  /** All the links connecting the descendant page elements */
  links: Array<PageElementLink>
}

export enum PrimitiveType {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
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

export type PropsByIdsFilter = {
  propIds: Array<Scalars['String']>
}

export type PropsByInterfaceValueId = {
  interfaceValueId: Scalars['String']
}

export type PropsByPageElementFilter = {
  pageElementIds: Array<Scalars['String']>
  fieldId?: Maybe<Scalars['String']>
}

export type Query = {
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getUsers: Array<User>
  getPages: Array<Page>
  getPage?: Maybe<Page>
  getPageElement?: Maybe<PageElement>
  /** Aggregates the requested page element and all of its descendant elements (infinitely deep) in the form of array of PageElement and array of PageElementLink */
  getPageElementRoot?: Maybe<PageElementRoot>
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

export type QueryGetPageElementArgs = {
  input: GetPageElementInput
}

export type QueryGetPageElementRootArgs = {
  input: GetPageElementRootInput
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

export type SimpleType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  primitiveType: PrimitiveType
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

export type UpdatePageElementData = {
  name: Scalars['String']
  css?: Maybe<Scalars['String']>
  atomId?: Maybe<Scalars['String']>
}

export type UpdatePageElementInput = {
  updateData: UpdatePageElementData
  pageElementId: Scalars['String']
}

export type UpdatePageInput = {
  pageId: Scalars['String']
  updateData: UpdatePageData
}

export type UpdateSimpleTypeData = {
  primitiveType: PrimitiveType
  name: Scalars['String']
}

export type UpdateSimpleTypeInput = {
  typeId: Scalars['String']
  updateData: UpdateSimpleTypeData
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
  pageElementId?: Maybe<Scalars['String']>
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

export type PageBaseFragment = Pick<Page, 'id' | 'name'> & {
  app: Pick<App, 'id' | 'name' | 'ownerId'>
}

export type PageFullFragment = {
  rootElement: PageElementRootFragment
} & PageBaseFragment

export type PageElementFragment = Pick<PageElement, 'id' | 'name' | 'css'> & {
  atom?: Maybe<__AtomFragment>
  props: Array<__PropAggregateFragment>
}

export type PageElementRootFragment = Pick<
  PageElementRoot,
  'id' | 'name' | 'css'
> & {
  atom?: Maybe<__AtomFragment>
  descendants: Array<PageElementFragment>
  links: Array<PageElementLinkFragment>
}

export type PageElementLinkFragment = Pick<
  PageElementLink,
  'from' | 'order' | 'to'
>

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

export type CreatePageElementMutationVariables = Exact<{
  input: CreatePageElementInput
}>

export type CreatePageElementMutation = {
  createPageElement: PageElementFragment
}

export type DeletePageElementMutationVariables = Exact<{
  input: DeletePageElementInput
}>

export type DeletePageElementMutation = {
  deletePageElement: Pick<DeleteResponse, 'affected'>
}

export type GetPageElementQueryVariables = Exact<{
  input: GetPageElementInput
}>

export type GetPageElementQuery = {
  getPageElement?: Maybe<PageElementFragment>
}

export type GetPageElementRootQueryVariables = Exact<{
  input: GetPageElementRootInput
}>

export type GetPageElementRootQuery = {
  getPageElementRoot?: Maybe<PageElementRootFragment>
}

export type MovePageElementMutationVariables = Exact<{
  input: MovePageElementInput
}>

export type MovePageElementMutation = { movePageElement: PageElementFragment }

export type UpdatePageElementMutationVariables = Exact<{
  input: UpdatePageElementInput
}>

export type UpdatePageElementMutation = {
  updatePageElement: PageElementFragment
}

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
    | __Type_SimpleType_Fragment
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

export type __SimpleTypeFragment = Pick<
  SimpleType,
  'id' | 'name' | 'primitiveType'
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

type __Type_SimpleType_Fragment = { __typename: 'SimpleType' } & Pick<
  SimpleType,
  'id' | 'name'
> &
  __SimpleTypeFragment

export type __TypeFragment =
  | __Type_ArrayType_Fragment
  | __Type_EnumType_Fragment
  | __Type_Interface_Fragment
  | __Type_SimpleType_Fragment

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

type __TypeShallow_SimpleType_Fragment = {
  __typename: 'SimpleType'
} & __SimpleTypeFragment

export type __TypeShallowFragment =
  | __TypeShallow_ArrayType_Fragment
  | __TypeShallow_EnumType_Fragment
  | __TypeShallow_Interface_Fragment
  | __TypeShallow_SimpleType_Fragment

export type __InterfaceWithoutFieldsFragment = Pick<Interface, 'id' | 'name'>

export type __InterfaceWithoutTypesFragment = {
  fieldCollection: {
    types: Array<
      | __TypeShallow_ArrayType_Fragment
      | __TypeShallow_EnumType_Fragment
      | __TypeShallow_Interface_Fragment
      | __TypeShallow_SimpleType_Fragment
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
    | __Type_SimpleType_Fragment
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
    | __Type_SimpleType_Fragment
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
    | ({ __typename: 'SimpleType' } & __Type_SimpleType_Fragment)
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
    | __Type_SimpleType_Fragment
}

export type UpdateSimpleTypeMutationVariables = Exact<{
  input: UpdateSimpleTypeInput
}>

export type UpdateSimpleTypeMutation = {
  updateSimpleType: __SimpleTypeFragment
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
export const PageElementFragmentDoc = gql`
  fragment PageElement on PageElement {
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
export const PageElementLinkFragmentDoc = gql`
  fragment PageElementLink on PageElementLink {
    from
    order
    to
  }
`
export const PageElementRootFragmentDoc = gql`
  fragment PageElementRoot on PageElementRoot {
    id
    name
    css
    atom {
      ...__Atom
    }
    descendants {
      ...PageElement
    }
    links {
      ...PageElementLink
    }
  }
  ${__AtomFragmentDoc}
  ${PageElementFragmentDoc}
  ${PageElementLinkFragmentDoc}
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...PageElementRoot
    }
  }
  ${PageBaseFragmentDoc}
  ${PageElementRootFragmentDoc}
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
export const __SimpleTypeFragmentDoc = gql`
  fragment __SimpleType on SimpleType {
    id
    name
    primitiveType
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
    ... on SimpleType {
      ...__SimpleType
    }
  }
  ${__EnumTypeFragmentDoc}
  ${__SimpleTypeFragmentDoc}
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
    ... on SimpleType {
      ...__SimpleType
    }
  }
  ${__ArrayTypeFragmentDoc}
  ${__EnumTypeFragmentDoc}
  ${__InterfaceWithoutTypesFragmentDoc}
  ${__SimpleTypeFragmentDoc}
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
export const CreatePageElementGql = gql`
  mutation CreatePageElement($input: CreatePageElementInput!) {
    createPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type CreatePageElementMutationFn = Apollo.MutationFunction<
  CreatePageElementMutation,
  CreatePageElementMutationVariables
>

/**
 * __useCreatePageElementMutation__
 *
 * To run a mutation, you first call `useCreatePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageElementMutation, { data, loading, error }] = useCreatePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageElementMutation,
    CreatePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePageElementMutation,
    CreatePageElementMutationVariables
  >(CreatePageElementGql, options)
}
export type CreatePageElementMutationHookResult = ReturnType<
  typeof useCreatePageElementMutation
>
export type CreatePageElementMutationResult =
  Apollo.MutationResult<CreatePageElementMutation>
export type CreatePageElementMutationOptions = Apollo.BaseMutationOptions<
  CreatePageElementMutation,
  CreatePageElementMutationVariables
>
export const DeletePageElementGql = gql`
  mutation DeletePageElement($input: DeletePageElementInput!) {
    deletePageElement(input: $input) {
      affected
    }
  }
`
export type DeletePageElementMutationFn = Apollo.MutationFunction<
  DeletePageElementMutation,
  DeletePageElementMutationVariables
>

/**
 * __useDeletePageElementMutation__
 *
 * To run a mutation, you first call `useDeletePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageElementMutation, { data, loading, error }] = useDeletePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageElementMutation,
    DeletePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeletePageElementMutation,
    DeletePageElementMutationVariables
  >(DeletePageElementGql, options)
}
export type DeletePageElementMutationHookResult = ReturnType<
  typeof useDeletePageElementMutation
>
export type DeletePageElementMutationResult =
  Apollo.MutationResult<DeletePageElementMutation>
export type DeletePageElementMutationOptions = Apollo.BaseMutationOptions<
  DeletePageElementMutation,
  DeletePageElementMutationVariables
>
export const GetPageElementGql = gql`
  query GetPageElement($input: GetPageElementInput!) {
    getPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`

/**
 * __useGetPageElementQuery__
 *
 * To run a query within a React component, call `useGetPageElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementQuery,
    GetPageElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageElementQuery, GetPageElementQueryVariables>(
    GetPageElementGql,
    options,
  )
}
export function useGetPageElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementQuery,
    GetPageElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageElementQuery, GetPageElementQueryVariables>(
    GetPageElementGql,
    options,
  )
}
export type GetPageElementQueryHookResult = ReturnType<
  typeof useGetPageElementQuery
>
export type GetPageElementLazyQueryHookResult = ReturnType<
  typeof useGetPageElementLazyQuery
>
export type GetPageElementQueryResult = Apollo.QueryResult<
  GetPageElementQuery,
  GetPageElementQueryVariables
>
export function refetchGetPageElementQuery(
  variables?: GetPageElementQueryVariables,
) {
  return { query: GetPageElementGql, variables: variables }
}
export const GetPageElementRootGql = gql`
  query GetPageElementRoot($input: GetPageElementRootInput!) {
    getPageElementRoot(input: $input) {
      ...PageElementRoot
    }
  }
  ${PageElementRootFragmentDoc}
`

/**
 * __useGetPageElementRootQuery__
 *
 * To run a query within a React component, call `useGetPageElementRootQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementRootQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementRootQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageElementRootQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >(GetPageElementRootGql, options)
}
export function useGetPageElementRootLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >(GetPageElementRootGql, options)
}
export type GetPageElementRootQueryHookResult = ReturnType<
  typeof useGetPageElementRootQuery
>
export type GetPageElementRootLazyQueryHookResult = ReturnType<
  typeof useGetPageElementRootLazyQuery
>
export type GetPageElementRootQueryResult = Apollo.QueryResult<
  GetPageElementRootQuery,
  GetPageElementRootQueryVariables
>
export function refetchGetPageElementRootQuery(
  variables?: GetPageElementRootQueryVariables,
) {
  return { query: GetPageElementRootGql, variables: variables }
}
export const MovePageElementGql = gql`
  mutation MovePageElement($input: MovePageElementInput!) {
    movePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type MovePageElementMutationFn = Apollo.MutationFunction<
  MovePageElementMutation,
  MovePageElementMutationVariables
>

/**
 * __useMovePageElementMutation__
 *
 * To run a mutation, you first call `useMovePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePageElementMutation, { data, loading, error }] = useMovePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMovePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MovePageElementMutation,
    MovePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    MovePageElementMutation,
    MovePageElementMutationVariables
  >(MovePageElementGql, options)
}
export type MovePageElementMutationHookResult = ReturnType<
  typeof useMovePageElementMutation
>
export type MovePageElementMutationResult =
  Apollo.MutationResult<MovePageElementMutation>
export type MovePageElementMutationOptions = Apollo.BaseMutationOptions<
  MovePageElementMutation,
  MovePageElementMutationVariables
>
export const UpdatePageElementGql = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type UpdatePageElementMutationFn = Apollo.MutationFunction<
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables
>

/**
 * __useUpdatePageElementMutation__
 *
 * To run a mutation, you first call `useUpdatePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageElementMutation, { data, loading, error }] = useUpdatePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageElementMutation,
    UpdatePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePageElementMutation,
    UpdatePageElementMutationVariables
  >(UpdatePageElementGql, options)
}
export type UpdatePageElementMutationHookResult = ReturnType<
  typeof useUpdatePageElementMutation
>
export type UpdatePageElementMutationResult =
  Apollo.MutationResult<UpdatePageElementMutation>
export type UpdatePageElementMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables
>
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
export const UpdateSimpleTypeGql = gql`
  mutation UpdateSimpleType($input: UpdateSimpleTypeInput!) {
    updateSimpleType(input: $input) {
      ...__SimpleType
    }
  }
  ${__SimpleTypeFragmentDoc}
`
export type UpdateSimpleTypeMutationFn = Apollo.MutationFunction<
  UpdateSimpleTypeMutation,
  UpdateSimpleTypeMutationVariables
>

/**
 * __useUpdateSimpleTypeMutation__
 *
 * To run a mutation, you first call `useUpdateSimpleTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSimpleTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSimpleTypeMutation, { data, loading, error }] = useUpdateSimpleTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSimpleTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSimpleTypeMutation,
    UpdateSimpleTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSimpleTypeMutation,
    UpdateSimpleTypeMutationVariables
  >(UpdateSimpleTypeGql, options)
}
export type UpdateSimpleTypeMutationHookResult = ReturnType<
  typeof useUpdateSimpleTypeMutation
>
export type UpdateSimpleTypeMutationResult =
  Apollo.MutationResult<UpdateSimpleTypeMutation>
export type UpdateSimpleTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateSimpleTypeMutation,
  UpdateSimpleTypeMutationVariables
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
export const PageElement = gql`
  fragment PageElement on PageElement {
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
export const PageElementLink = gql`
  fragment PageElementLink on PageElementLink {
    from
    order
    to
  }
`
export const PageElementRoot = gql`
  fragment PageElementRoot on PageElementRoot {
    id
    name
    css
    atom {
      ...__Atom
    }
    descendants {
      ...PageElement
    }
    links {
      ...PageElementLink
    }
  }
  ${__Atom}
  ${PageElement}
  ${PageElementLink}
`
export const PageFull = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...PageElementRoot
    }
  }
  ${PageBase}
  ${PageElementRoot}
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
export const __SimpleType = gql`
  fragment __SimpleType on SimpleType {
    id
    name
    primitiveType
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
    ... on SimpleType {
      ...__SimpleType
    }
  }
  ${__EnumType}
  ${__SimpleType}
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
    ... on SimpleType {
      ...__SimpleType
    }
  }
  ${__ArrayType}
  ${__EnumType}
  ${__InterfaceWithoutTypes}
  ${__SimpleType}
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
export const CreatePageElement = gql`
  mutation CreatePageElement($input: CreatePageElementInput!) {
    createPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const DeletePageElement = gql`
  mutation DeletePageElement($input: DeletePageElementInput!) {
    deletePageElement(input: $input) {
      affected
    }
  }
`
export const GetPageElement = gql`
  query GetPageElement($input: GetPageElementInput!) {
    getPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const GetPageElementRoot = gql`
  query GetPageElementRoot($input: GetPageElementRootInput!) {
    getPageElementRoot(input: $input) {
      ...PageElementRoot
    }
  }
  ${PageElementRoot}
`
export const MovePageElement = gql`
  mutation MovePageElement($input: MovePageElementInput!) {
    movePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const UpdatePageElement = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
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
export const UpdateSimpleType = gql`
  mutation UpdateSimpleType($input: UpdateSimpleTypeInput!) {
    updateSimpleType(input: $input) {
      ...__SimpleType
    }
  }
  ${__SimpleType}
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
