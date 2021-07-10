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
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: string
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: number
}

export type AddAppInput = {
  ownerId: Scalars['String']
  pages?: Maybe<Array<Maybe<PageRef>>>
  name: Scalars['String']
}

export type AddAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddArrayTypeInput = {
  name: Scalars['String']
  type: TypeRef
}

export type AddArrayTypePayload = {
  arrayType?: Maybe<Array<Maybe<ArrayType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddArrayTypePayloadArrayTypeArgs = {
  filter?: Maybe<ArrayTypeFilter>
  order?: Maybe<ArrayTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddArrayValueInput = {
  values: Array<PropValueRef>
}

export type AddArrayValuePayload = {
  arrayValue?: Maybe<Array<Maybe<ArrayValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddArrayValuePayloadArrayValueArgs = {
  filter?: Maybe<ArrayValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddAtomInput = {
  type: AtomType
  label: Scalars['String']
  library?: Maybe<LibraryRef>
  propTypes: InterfaceRef
}

export type AddAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddBooleanValueInput = {
  booleanValue: Scalars['Boolean']
}

export type AddBooleanValuePayload = {
  booleanValue?: Maybe<Array<Maybe<BooleanValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddBooleanValuePayloadBooleanValueArgs = {
  filter?: Maybe<BooleanValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddComponentInput = {
  library: LibraryRef
  atom: AtomRef
  label: Scalars['String']
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type AddComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddElementInput = {
  name: Scalars['String']
  children?: Maybe<Array<Maybe<ElementRef>>>
  parent?: Maybe<ElementRef>
  atom?: Maybe<AtomRef>
  ownedBy: ElementOwnerRef
  component?: Maybe<ComponentRef>
  props: Array<PropRef>
  css?: Maybe<Scalars['String']>
}

export type AddElementPayload = {
  element?: Maybe<Array<Maybe<Element>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddElementPayloadElementArgs = {
  filter?: Maybe<ElementFilter>
  order?: Maybe<ElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddEnumTypeInput = {
  name: Scalars['String']
  allowedValues: Array<EnumTypeValueRef>
}

export type AddEnumTypePayload = {
  enumType?: Maybe<Array<Maybe<EnumType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddEnumTypePayloadEnumTypeArgs = {
  filter?: Maybe<EnumTypeFilter>
  order?: Maybe<EnumTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddEnumTypeValueInput = {
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type AddEnumTypeValuePayload = {
  enumTypeValue?: Maybe<Array<Maybe<EnumTypeValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddEnumTypeValuePayloadEnumTypeValueArgs = {
  filter?: Maybe<EnumTypeValueFilter>
  order?: Maybe<EnumTypeValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddFieldInput = {
  type: TypeRef
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interface: InterfaceRef
}

export type AddFieldPayload = {
  field?: Maybe<Array<Maybe<Field>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddFieldPayloadFieldArgs = {
  filter?: Maybe<FieldFilter>
  order?: Maybe<FieldOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddFloatValueInput = {
  floatValue: Scalars['Float']
}

export type AddFloatValuePayload = {
  floatValue?: Maybe<Array<Maybe<FloatValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddFloatValuePayloadFloatValueArgs = {
  filter?: Maybe<FloatValueFilter>
  order?: Maybe<FloatValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddIntValueInput = {
  intValue: Scalars['Int']
}

export type AddIntValuePayload = {
  intValue?: Maybe<Array<Maybe<IntValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddIntValuePayloadIntValueArgs = {
  filter?: Maybe<IntValueFilter>
  order?: Maybe<IntValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddInterfaceInput = {
  name: Scalars['String']
  atom?: Maybe<AtomRef>
  fields?: Maybe<Array<Maybe<FieldRef>>>
}

export type AddInterfacePayload = {
  interface?: Maybe<Array<Maybe<Interface>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddInterfacePayloadInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
  order?: Maybe<InterfaceOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddInterfaceValueInput = {
  props: Array<PropRef>
}

export type AddInterfaceValuePayload = {
  interfaceValue?: Maybe<Array<Maybe<InterfaceValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddInterfaceValuePayloadInterfaceValueArgs = {
  filter?: Maybe<InterfaceValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddLibraryInput = {
  ownerId: Scalars['String']
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
}

export type AddLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddPageInput = {
  name: Scalars['String']
  app: AppRef
  rootElement: ElementRef
}

export type AddPagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddPrimitiveTypeInput = {
  name: Scalars['String']
  primitiveKind: PrimitiveKind
}

export type AddPrimitiveTypePayload = {
  primitiveType?: Maybe<Array<Maybe<PrimitiveType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPrimitiveTypePayloadPrimitiveTypeArgs = {
  filter?: Maybe<PrimitiveTypeFilter>
  order?: Maybe<PrimitiveTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddPropInput = {
  field: FieldRef
  value?: Maybe<PropValueRef>
  element?: Maybe<ElementRef>
}

export type AddPropPayload = {
  prop?: Maybe<Array<Maybe<Prop>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPropPayloadPropArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddStringValueInput = {
  stringValue: Scalars['String']
}

export type AddStringValuePayload = {
  stringValue?: Maybe<Array<Maybe<StringValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddStringValuePayloadStringValueArgs = {
  filter?: Maybe<StringValueFilter>
  order?: Maybe<StringValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddTagInput = {
  label: Scalars['String']
}

export type AddTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type App = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  pages?: Maybe<Array<Maybe<Page>>>
  name: Scalars['String']
  pagesAggregate?: Maybe<PageAggregateResult>
}

export type AppPagesArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppPagesAggregateArgs = {
  filter?: Maybe<PageFilter>
}

export type AppAggregateResult = {
  count?: Maybe<Scalars['Int']>
  ownerIdMin?: Maybe<Scalars['String']>
  ownerIdMax?: Maybe<Scalars['String']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type AppFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  ownerId?: Maybe<StringHashFilter>
  has?: Maybe<Array<Maybe<AppHasFilter>>>
  and?: Maybe<Array<Maybe<AppFilter>>>
  or?: Maybe<Array<Maybe<AppFilter>>>
  not?: Maybe<AppFilter>
}

export enum AppHasFilter {
  OwnerId = 'ownerId',
  Pages = 'pages',
  Name = 'name',
}

export type AppOrder = {
  asc?: Maybe<AppOrderable>
  desc?: Maybe<AppOrderable>
  then?: Maybe<AppOrder>
}

export enum AppOrderable {
  OwnerId = 'ownerId',
  Name = 'name',
}

export type AppPatch = {
  ownerId?: Maybe<Scalars['String']>
  pages?: Maybe<Array<Maybe<PageRef>>>
  name?: Maybe<Scalars['String']>
}

export type AppRef = {
  id?: Maybe<Scalars['ID']>
  ownerId?: Maybe<Scalars['String']>
  pages?: Maybe<Array<Maybe<PageRef>>>
  name?: Maybe<Scalars['String']>
}

export type ArrayType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  type: Type
}

export type ArrayTypeTypeArgs = {
  filter?: Maybe<TypeFilter>
}

export type ArrayTypeAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type ArrayTypeFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<ArrayTypeHasFilter>>>
  and?: Maybe<Array<Maybe<ArrayTypeFilter>>>
  or?: Maybe<Array<Maybe<ArrayTypeFilter>>>
  not?: Maybe<ArrayTypeFilter>
}

export enum ArrayTypeHasFilter {
  Name = 'name',
  Type = 'type',
}

export type ArrayTypeOrder = {
  asc?: Maybe<ArrayTypeOrderable>
  desc?: Maybe<ArrayTypeOrderable>
  then?: Maybe<ArrayTypeOrder>
}

export enum ArrayTypeOrderable {
  Name = 'name',
}

export type ArrayTypePatch = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<TypeRef>
}

export type ArrayTypeRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<TypeRef>
}

export type ArrayValue = {
  id: Scalars['ID']
  values: Array<PropValue>
}

export type ArrayValueValuesArgs = {
  filter?: Maybe<PropValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ArrayValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
}

export type ArrayValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<ArrayValueHasFilter>>>
  and?: Maybe<Array<Maybe<ArrayValueFilter>>>
  or?: Maybe<Array<Maybe<ArrayValueFilter>>>
  not?: Maybe<ArrayValueFilter>
}

export enum ArrayValueHasFilter {
  Values = 'values',
}

export type ArrayValuePatch = {
  values?: Maybe<Array<PropValueRef>>
}

export type ArrayValueRef = {
  id?: Maybe<Scalars['ID']>
  values?: Maybe<Array<PropValueRef>>
}

export type Atom = {
  id: Scalars['ID']
  type: AtomType
  label: Scalars['String']
  library?: Maybe<Library>
  propTypes: Interface
}

export type AtomLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type AtomPropTypesArgs = {
  filter?: Maybe<InterfaceFilter>
}

export type AtomAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type AtomFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<AtomHasFilter>>>
  and?: Maybe<Array<Maybe<AtomFilter>>>
  or?: Maybe<Array<Maybe<AtomFilter>>>
  not?: Maybe<AtomFilter>
}

export enum AtomHasFilter {
  Type = 'type',
  Label = 'label',
  Library = 'library',
  PropTypes = 'propTypes',
}

export type AtomOrder = {
  asc?: Maybe<AtomOrderable>
  desc?: Maybe<AtomOrderable>
  then?: Maybe<AtomOrder>
}

export enum AtomOrderable {
  Label = 'label',
}

export type AtomPatch = {
  type?: Maybe<AtomType>
  label?: Maybe<Scalars['String']>
  library?: Maybe<LibraryRef>
  propTypes?: Maybe<InterfaceRef>
}

export type AtomRef = {
  id?: Maybe<Scalars['ID']>
  type?: Maybe<AtomType>
  label?: Maybe<Scalars['String']>
  library?: Maybe<LibraryRef>
  propTypes?: Maybe<InterfaceRef>
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

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>
  or?: Maybe<Array<Maybe<AuthRule>>>
  not?: Maybe<AuthRule>
  rule?: Maybe<Scalars['String']>
}

export type BooleanValue = {
  id: Scalars['ID']
  booleanValue: Scalars['Boolean']
}

export type BooleanValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
}

export type BooleanValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<BooleanValueHasFilter>>>
  and?: Maybe<Array<Maybe<BooleanValueFilter>>>
  or?: Maybe<Array<Maybe<BooleanValueFilter>>>
  not?: Maybe<BooleanValueFilter>
}

export enum BooleanValueHasFilter {
  BooleanValue = 'booleanValue',
}

export type BooleanValuePatch = {
  booleanValue?: Maybe<Scalars['Boolean']>
}

export type BooleanValueRef = {
  id?: Maybe<Scalars['ID']>
  booleanValue?: Maybe<Scalars['Boolean']>
}

export type Component = {
  id: Scalars['ID']
  library: Library
  atom: Atom
  label: Scalars['String']
  children?: Maybe<Array<Maybe<Component>>>
  tags?: Maybe<Array<Maybe<Tag>>>
  childrenAggregate?: Maybe<ComponentAggregateResult>
  tagsAggregate?: Maybe<TagAggregateResult>
}

export type ComponentLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type ComponentAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type ComponentChildrenArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ComponentTagsArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ComponentChildrenAggregateArgs = {
  filter?: Maybe<ComponentFilter>
}

export type ComponentTagsAggregateArgs = {
  filter?: Maybe<TagFilter>
}

export type ComponentAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type ComponentFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<ComponentHasFilter>>>
  and?: Maybe<Array<Maybe<ComponentFilter>>>
  or?: Maybe<Array<Maybe<ComponentFilter>>>
  not?: Maybe<ComponentFilter>
}

export enum ComponentHasFilter {
  Library = 'library',
  Atom = 'atom',
  Label = 'label',
  Children = 'children',
  Tags = 'tags',
}

export type ComponentOrder = {
  asc?: Maybe<ComponentOrderable>
  desc?: Maybe<ComponentOrderable>
  then?: Maybe<ComponentOrder>
}

export enum ComponentOrderable {
  Label = 'label',
}

export type ComponentPatch = {
  library?: Maybe<LibraryRef>
  atom?: Maybe<AtomRef>
  label?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type ComponentRef = {
  id?: Maybe<Scalars['ID']>
  library?: Maybe<LibraryRef>
  atom?: Maybe<AtomRef>
  label?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type ContainsFilter = {
  point?: Maybe<PointRef>
  polygon?: Maybe<PolygonRef>
}

export type CustomHttp = {
  url: Scalars['String']
  method: HttpMethod
  body?: Maybe<Scalars['String']>
  graphql?: Maybe<Scalars['String']>
  mode?: Maybe<Mode>
  forwardHeaders?: Maybe<Array<Scalars['String']>>
  secretHeaders?: Maybe<Array<Scalars['String']>>
  introspectionHeaders?: Maybe<Array<Scalars['String']>>
  skipIntrospection?: Maybe<Scalars['Boolean']>
}

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  le?: Maybe<Scalars['DateTime']>
  lt?: Maybe<Scalars['DateTime']>
  ge?: Maybe<Scalars['DateTime']>
  gt?: Maybe<Scalars['DateTime']>
  between?: Maybe<DateTimeRange>
}

export type DateTimeRange = {
  min: Scalars['DateTime']
  max: Scalars['DateTime']
}

export type DeleteAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteArrayTypePayload = {
  arrayType?: Maybe<Array<Maybe<ArrayType>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteArrayTypePayloadArrayTypeArgs = {
  filter?: Maybe<ArrayTypeFilter>
  order?: Maybe<ArrayTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteArrayValuePayload = {
  arrayValue?: Maybe<Array<Maybe<ArrayValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteArrayValuePayloadArrayValueArgs = {
  filter?: Maybe<ArrayValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteBooleanValuePayload = {
  booleanValue?: Maybe<Array<Maybe<BooleanValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteBooleanValuePayloadBooleanValueArgs = {
  filter?: Maybe<BooleanValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteElementPayload = {
  element?: Maybe<Array<Maybe<Element>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteElementPayloadElementArgs = {
  filter?: Maybe<ElementFilter>
  order?: Maybe<ElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteEnumTypePayload = {
  enumType?: Maybe<Array<Maybe<EnumType>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteEnumTypePayloadEnumTypeArgs = {
  filter?: Maybe<EnumTypeFilter>
  order?: Maybe<EnumTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteEnumTypeValuePayload = {
  enumTypeValue?: Maybe<Array<Maybe<EnumTypeValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteEnumTypeValuePayloadEnumTypeValueArgs = {
  filter?: Maybe<EnumTypeValueFilter>
  order?: Maybe<EnumTypeValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteFieldPayload = {
  field?: Maybe<Array<Maybe<Field>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteFieldPayloadFieldArgs = {
  filter?: Maybe<FieldFilter>
  order?: Maybe<FieldOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteFloatValuePayload = {
  floatValue?: Maybe<Array<Maybe<FloatValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteFloatValuePayloadFloatValueArgs = {
  filter?: Maybe<FloatValueFilter>
  order?: Maybe<FloatValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteIntValuePayload = {
  intValue?: Maybe<Array<Maybe<IntValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteIntValuePayloadIntValueArgs = {
  filter?: Maybe<IntValueFilter>
  order?: Maybe<IntValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteInterfacePayload = {
  interface?: Maybe<Array<Maybe<Interface>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteInterfacePayloadInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
  order?: Maybe<InterfaceOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteInterfaceValuePayload = {
  interfaceValue?: Maybe<Array<Maybe<InterfaceValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteInterfaceValuePayloadInterfaceValueArgs = {
  filter?: Maybe<InterfaceValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeletePagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeletePrimitiveTypePayload = {
  primitiveType?: Maybe<Array<Maybe<PrimitiveType>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePrimitiveTypePayloadPrimitiveTypeArgs = {
  filter?: Maybe<PrimitiveTypeFilter>
  order?: Maybe<PrimitiveTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeletePropPayload = {
  prop?: Maybe<Array<Maybe<Prop>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePropPayloadPropArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteStringValuePayload = {
  stringValue?: Maybe<Array<Maybe<StringValue>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteStringValuePayloadStringValueArgs = {
  filter?: Maybe<StringValueFilter>
  order?: Maybe<StringValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteTypePayload = {
  type?: Maybe<Array<Maybe<Type>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteTypePayloadTypeArgs = {
  filter?: Maybe<TypeFilter>
  order?: Maybe<TypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo',
}

export type Element = {
  id: Scalars['ID']
  name: Scalars['String']
  children?: Maybe<Array<Maybe<Element>>>
  parent?: Maybe<Element>
  atom?: Maybe<Atom>
  ownedBy: ElementOwner
  component?: Maybe<Component>
  props: Array<Prop>
  css?: Maybe<Scalars['String']>
  childrenAggregate?: Maybe<ElementAggregateResult>
  propsAggregate?: Maybe<PropAggregateResult>
}

export type ElementChildrenArgs = {
  filter?: Maybe<ElementFilter>
  order?: Maybe<ElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementParentArgs = {
  filter?: Maybe<ElementFilter>
}

export type ElementAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type ElementOwnedByArgs = {
  filter?: Maybe<ElementOwnerFilter>
}

export type ElementComponentArgs = {
  filter?: Maybe<ComponentFilter>
}

export type ElementPropsArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementChildrenAggregateArgs = {
  filter?: Maybe<ElementFilter>
}

export type ElementPropsAggregateArgs = {
  filter?: Maybe<PropFilter>
}

export type ElementAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
  cssMin?: Maybe<Scalars['String']>
  cssMax?: Maybe<Scalars['String']>
}

export type ElementFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  name?: Maybe<StringFullTextFilter_StringTermFilter>
  has?: Maybe<Array<Maybe<ElementHasFilter>>>
  and?: Maybe<Array<Maybe<ElementFilter>>>
  or?: Maybe<Array<Maybe<ElementFilter>>>
  not?: Maybe<ElementFilter>
}

export enum ElementHasFilter {
  Name = 'name',
  Children = 'children',
  Parent = 'parent',
  Atom = 'atom',
  OwnedBy = 'ownedBy',
  Component = 'component',
  Props = 'props',
  Css = 'css',
}

export type ElementOrder = {
  asc?: Maybe<ElementOrderable>
  desc?: Maybe<ElementOrderable>
  then?: Maybe<ElementOrder>
}

export enum ElementOrderable {
  Name = 'name',
  Css = 'css',
}

export type ElementOwner = Page

export type ElementOwnerFilter = {
  memberTypes?: Maybe<Array<ElementOwnerType>>
  pageFilter?: Maybe<PageFilter>
}

export type ElementOwnerRef = {
  pageRef?: Maybe<PageRef>
}

export enum ElementOwnerType {
  Page = 'Page',
}

export type ElementPatch = {
  name?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ElementRef>>>
  parent?: Maybe<ElementRef>
  atom?: Maybe<AtomRef>
  ownedBy?: Maybe<ElementOwnerRef>
  component?: Maybe<ComponentRef>
  props?: Maybe<Array<PropRef>>
  css?: Maybe<Scalars['String']>
}

export type ElementRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ElementRef>>>
  parent?: Maybe<ElementRef>
  atom?: Maybe<AtomRef>
  ownedBy?: Maybe<ElementOwnerRef>
  component?: Maybe<ComponentRef>
  props?: Maybe<Array<PropRef>>
  css?: Maybe<Scalars['String']>
}

export type EnumType = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  allowedValues: Array<EnumTypeValue>
  allowedValuesAggregate?: Maybe<EnumTypeValueAggregateResult>
}

export type EnumTypeAllowedValuesArgs = {
  filter?: Maybe<EnumTypeValueFilter>
  order?: Maybe<EnumTypeValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type EnumTypeAllowedValuesAggregateArgs = {
  filter?: Maybe<EnumTypeValueFilter>
}

export type EnumTypeAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type EnumTypeFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<EnumTypeHasFilter>>>
  and?: Maybe<Array<Maybe<EnumTypeFilter>>>
  or?: Maybe<Array<Maybe<EnumTypeFilter>>>
  not?: Maybe<EnumTypeFilter>
}

export enum EnumTypeHasFilter {
  Name = 'name',
  AllowedValues = 'allowedValues',
}

export type EnumTypeOrder = {
  asc?: Maybe<EnumTypeOrderable>
  desc?: Maybe<EnumTypeOrderable>
  then?: Maybe<EnumTypeOrder>
}

export enum EnumTypeOrderable {
  Name = 'name',
}

export type EnumTypePatch = {
  name?: Maybe<Scalars['String']>
  allowedValues?: Maybe<Array<EnumTypeValueRef>>
}

export type EnumTypeRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  allowedValues?: Maybe<Array<EnumTypeValueRef>>
}

export type EnumTypeValue = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type EnumTypeValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
  valueMin?: Maybe<Scalars['String']>
  valueMax?: Maybe<Scalars['String']>
}

export type EnumTypeValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<EnumTypeValueHasFilter>>>
  and?: Maybe<Array<Maybe<EnumTypeValueFilter>>>
  or?: Maybe<Array<Maybe<EnumTypeValueFilter>>>
  not?: Maybe<EnumTypeValueFilter>
}

export enum EnumTypeValueHasFilter {
  Name = 'name',
  Value = 'value',
}

export type EnumTypeValueOrder = {
  asc?: Maybe<EnumTypeValueOrderable>
  desc?: Maybe<EnumTypeValueOrderable>
  then?: Maybe<EnumTypeValueOrder>
}

export enum EnumTypeValueOrderable {
  Name = 'name',
  Value = 'value',
}

export type EnumTypeValuePatch = {
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type EnumTypeValueRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type Field = {
  id: Scalars['ID']
  type: Type
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interface: Interface
}

export type FieldTypeArgs = {
  filter?: Maybe<TypeFilter>
}

export type FieldInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
}

export type FieldAggregateResult = {
  count?: Maybe<Scalars['Int']>
  keyMin?: Maybe<Scalars['String']>
  keyMax?: Maybe<Scalars['String']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
  descriptionMin?: Maybe<Scalars['String']>
  descriptionMax?: Maybe<Scalars['String']>
}

export type FieldFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  key?: Maybe<StringFullTextFilter_StringHashFilter>
  has?: Maybe<Array<Maybe<FieldHasFilter>>>
  and?: Maybe<Array<Maybe<FieldFilter>>>
  or?: Maybe<Array<Maybe<FieldFilter>>>
  not?: Maybe<FieldFilter>
}

export enum FieldHasFilter {
  Type = 'type',
  Key = 'key',
  Name = 'name',
  Description = 'description',
  Interface = 'interface',
}

export type FieldOrder = {
  asc?: Maybe<FieldOrderable>
  desc?: Maybe<FieldOrderable>
  then?: Maybe<FieldOrder>
}

export enum FieldOrderable {
  Key = 'key',
  Name = 'name',
  Description = 'description',
}

export type FieldPatch = {
  type?: Maybe<TypeRef>
  key?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  interface?: Maybe<InterfaceRef>
}

export type FieldRef = {
  id?: Maybe<Scalars['ID']>
  type?: Maybe<TypeRef>
  key?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  interface?: Maybe<InterfaceRef>
}

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>
  in?: Maybe<Array<Maybe<Scalars['Float']>>>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  between?: Maybe<FloatRange>
}

export type FloatRange = {
  min: Scalars['Float']
  max: Scalars['Float']
}

export type FloatValue = {
  id: Scalars['ID']
  floatValue: Scalars['Float']
}

export type FloatValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
  floatValueMin?: Maybe<Scalars['Float']>
  floatValueMax?: Maybe<Scalars['Float']>
  floatValueSum?: Maybe<Scalars['Float']>
  floatValueAvg?: Maybe<Scalars['Float']>
}

export type FloatValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<FloatValueHasFilter>>>
  and?: Maybe<Array<Maybe<FloatValueFilter>>>
  or?: Maybe<Array<Maybe<FloatValueFilter>>>
  not?: Maybe<FloatValueFilter>
}

export enum FloatValueHasFilter {
  FloatValue = 'floatValue',
}

export type FloatValueOrder = {
  asc?: Maybe<FloatValueOrderable>
  desc?: Maybe<FloatValueOrderable>
  then?: Maybe<FloatValueOrder>
}

export enum FloatValueOrderable {
  FloatValue = 'floatValue',
}

export type FloatValuePatch = {
  floatValue?: Maybe<Scalars['Float']>
}

export type FloatValueRef = {
  id?: Maybe<Scalars['ID']>
  floatValue?: Maybe<Scalars['Float']>
}

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>
  update?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>
  query?: Maybe<Scalars['Boolean']>
  password?: Maybe<Scalars['Boolean']>
  aggregate?: Maybe<Scalars['Boolean']>
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>
  in?: Maybe<Array<Maybe<Scalars['Int64']>>>
  le?: Maybe<Scalars['Int64']>
  lt?: Maybe<Scalars['Int64']>
  ge?: Maybe<Scalars['Int64']>
  gt?: Maybe<Scalars['Int64']>
  between?: Maybe<Int64Range>
}

export type Int64Range = {
  min: Scalars['Int64']
  max: Scalars['Int64']
}

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>
  in?: Maybe<Array<Maybe<Scalars['Int']>>>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  between?: Maybe<IntRange>
}

export type IntRange = {
  min: Scalars['Int']
  max: Scalars['Int']
}

export type IntValue = {
  id: Scalars['ID']
  intValue: Scalars['Int']
}

export type IntValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
  intValueMin?: Maybe<Scalars['Int']>
  intValueMax?: Maybe<Scalars['Int']>
  intValueSum?: Maybe<Scalars['Int']>
  intValueAvg?: Maybe<Scalars['Float']>
}

export type IntValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<IntValueHasFilter>>>
  and?: Maybe<Array<Maybe<IntValueFilter>>>
  or?: Maybe<Array<Maybe<IntValueFilter>>>
  not?: Maybe<IntValueFilter>
}

export enum IntValueHasFilter {
  IntValue = 'intValue',
}

export type IntValueOrder = {
  asc?: Maybe<IntValueOrderable>
  desc?: Maybe<IntValueOrderable>
  then?: Maybe<IntValueOrder>
}

export enum IntValueOrderable {
  IntValue = 'intValue',
}

export type IntValuePatch = {
  intValue?: Maybe<Scalars['Int']>
}

export type IntValueRef = {
  id?: Maybe<Scalars['ID']>
  intValue?: Maybe<Scalars['Int']>
}

export type Interface = Type & {
  id: Scalars['ID']
  name: Scalars['String']
  atom?: Maybe<Atom>
  fields?: Maybe<Array<Maybe<Field>>>
  fieldsAggregate?: Maybe<FieldAggregateResult>
}

export type InterfaceAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type InterfaceFieldsArgs = {
  filter?: Maybe<FieldFilter>
  order?: Maybe<FieldOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type InterfaceFieldsAggregateArgs = {
  filter?: Maybe<FieldFilter>
}

export type InterfaceAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type InterfaceFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<InterfaceHasFilter>>>
  and?: Maybe<Array<Maybe<InterfaceFilter>>>
  or?: Maybe<Array<Maybe<InterfaceFilter>>>
  not?: Maybe<InterfaceFilter>
}

export enum InterfaceHasFilter {
  Name = 'name',
  Atom = 'atom',
  Fields = 'fields',
}

export type InterfaceOrder = {
  asc?: Maybe<InterfaceOrderable>
  desc?: Maybe<InterfaceOrderable>
  then?: Maybe<InterfaceOrder>
}

export enum InterfaceOrderable {
  Name = 'name',
}

export type InterfacePatch = {
  name?: Maybe<Scalars['String']>
  atom?: Maybe<AtomRef>
  fields?: Maybe<Array<Maybe<FieldRef>>>
}

export type InterfaceRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  atom?: Maybe<AtomRef>
  fields?: Maybe<Array<Maybe<FieldRef>>>
}

export type InterfaceValue = {
  id: Scalars['ID']
  props: Array<Prop>
  propsAggregate?: Maybe<PropAggregateResult>
}

export type InterfaceValuePropsArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type InterfaceValuePropsAggregateArgs = {
  filter?: Maybe<PropFilter>
}

export type InterfaceValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
}

export type InterfaceValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<InterfaceValueHasFilter>>>
  and?: Maybe<Array<Maybe<InterfaceValueFilter>>>
  or?: Maybe<Array<Maybe<InterfaceValueFilter>>>
  not?: Maybe<InterfaceValueFilter>
}

export enum InterfaceValueHasFilter {
  Props = 'props',
}

export type InterfaceValuePatch = {
  props?: Maybe<Array<PropRef>>
}

export type InterfaceValueRef = {
  id?: Maybe<Scalars['ID']>
  props?: Maybe<Array<PropRef>>
}

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>
  multiPolygon?: Maybe<MultiPolygonRef>
}

export type Library = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<Atom>>>
  components?: Maybe<Array<Maybe<Component>>>
  atomsAggregate?: Maybe<AtomAggregateResult>
  componentsAggregate?: Maybe<ComponentAggregateResult>
}

export type LibraryAtomsArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type LibraryComponentsArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type LibraryAtomsAggregateArgs = {
  filter?: Maybe<AtomFilter>
}

export type LibraryComponentsAggregateArgs = {
  filter?: Maybe<ComponentFilter>
}

export type LibraryAggregateResult = {
  count?: Maybe<Scalars['Int']>
  ownerIdMin?: Maybe<Scalars['String']>
  ownerIdMax?: Maybe<Scalars['String']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type LibraryFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<LibraryHasFilter>>>
  and?: Maybe<Array<Maybe<LibraryFilter>>>
  or?: Maybe<Array<Maybe<LibraryFilter>>>
  not?: Maybe<LibraryFilter>
}

export enum LibraryHasFilter {
  OwnerId = 'ownerId',
  Name = 'name',
  Atoms = 'atoms',
  Components = 'components',
}

export type LibraryOrder = {
  asc?: Maybe<LibraryOrderable>
  desc?: Maybe<LibraryOrderable>
  then?: Maybe<LibraryOrder>
}

export enum LibraryOrderable {
  OwnerId = 'ownerId',
  Name = 'name',
}

export type LibraryPatch = {
  ownerId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
}

export type LibraryRef = {
  id?: Maybe<Scalars['ID']>
  ownerId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
}

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE',
}

export type MultiPolygon = {
  polygons: Array<Polygon>
}

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>
}

export type Mutation = {
  addApp?: Maybe<AddAppPayload>
  updateApp?: Maybe<UpdateAppPayload>
  deleteApp?: Maybe<DeleteAppPayload>
  addPage?: Maybe<AddPagePayload>
  updatePage?: Maybe<UpdatePagePayload>
  deletePage?: Maybe<DeletePagePayload>
  addElement?: Maybe<AddElementPayload>
  updateElement?: Maybe<UpdateElementPayload>
  deleteElement?: Maybe<DeleteElementPayload>
  addLibrary?: Maybe<AddLibraryPayload>
  updateLibrary?: Maybe<UpdateLibraryPayload>
  deleteLibrary?: Maybe<DeleteLibraryPayload>
  addComponent?: Maybe<AddComponentPayload>
  updateComponent?: Maybe<UpdateComponentPayload>
  deleteComponent?: Maybe<DeleteComponentPayload>
  addAtom?: Maybe<AddAtomPayload>
  updateAtom?: Maybe<UpdateAtomPayload>
  deleteAtom?: Maybe<DeleteAtomPayload>
  addTag?: Maybe<AddTagPayload>
  updateTag?: Maybe<UpdateTagPayload>
  deleteTag?: Maybe<DeleteTagPayload>
  addPrimitiveType?: Maybe<AddPrimitiveTypePayload>
  updatePrimitiveType?: Maybe<UpdatePrimitiveTypePayload>
  deletePrimitiveType?: Maybe<DeletePrimitiveTypePayload>
  addArrayType?: Maybe<AddArrayTypePayload>
  updateArrayType?: Maybe<UpdateArrayTypePayload>
  deleteArrayType?: Maybe<DeleteArrayTypePayload>
  addEnumTypeValue?: Maybe<AddEnumTypeValuePayload>
  updateEnumTypeValue?: Maybe<UpdateEnumTypeValuePayload>
  deleteEnumTypeValue?: Maybe<DeleteEnumTypeValuePayload>
  addEnumType?: Maybe<AddEnumTypePayload>
  updateEnumType?: Maybe<UpdateEnumTypePayload>
  deleteEnumType?: Maybe<DeleteEnumTypePayload>
  addInterface?: Maybe<AddInterfacePayload>
  updateInterface?: Maybe<UpdateInterfacePayload>
  deleteInterface?: Maybe<DeleteInterfacePayload>
  updateType?: Maybe<UpdateTypePayload>
  deleteType?: Maybe<DeleteTypePayload>
  addField?: Maybe<AddFieldPayload>
  updateField?: Maybe<UpdateFieldPayload>
  deleteField?: Maybe<DeleteFieldPayload>
  addStringValue?: Maybe<AddStringValuePayload>
  updateStringValue?: Maybe<UpdateStringValuePayload>
  deleteStringValue?: Maybe<DeleteStringValuePayload>
  addIntValue?: Maybe<AddIntValuePayload>
  updateIntValue?: Maybe<UpdateIntValuePayload>
  deleteIntValue?: Maybe<DeleteIntValuePayload>
  addFloatValue?: Maybe<AddFloatValuePayload>
  updateFloatValue?: Maybe<UpdateFloatValuePayload>
  deleteFloatValue?: Maybe<DeleteFloatValuePayload>
  addBooleanValue?: Maybe<AddBooleanValuePayload>
  updateBooleanValue?: Maybe<UpdateBooleanValuePayload>
  deleteBooleanValue?: Maybe<DeleteBooleanValuePayload>
  addArrayValue?: Maybe<AddArrayValuePayload>
  updateArrayValue?: Maybe<UpdateArrayValuePayload>
  deleteArrayValue?: Maybe<DeleteArrayValuePayload>
  addInterfaceValue?: Maybe<AddInterfaceValuePayload>
  updateInterfaceValue?: Maybe<UpdateInterfaceValuePayload>
  deleteInterfaceValue?: Maybe<DeleteInterfaceValuePayload>
  addProp?: Maybe<AddPropPayload>
  updateProp?: Maybe<UpdatePropPayload>
  deleteProp?: Maybe<DeletePropPayload>
}

export type MutationAddAppArgs = {
  input: Array<AddAppInput>
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationDeleteAppArgs = {
  filter: AppFilter
}

export type MutationAddPageArgs = {
  input: Array<AddPageInput>
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationDeletePageArgs = {
  filter: PageFilter
}

export type MutationAddElementArgs = {
  input: Array<AddElementInput>
}

export type MutationUpdateElementArgs = {
  input: UpdateElementInput
}

export type MutationDeleteElementArgs = {
  filter: ElementFilter
}

export type MutationAddLibraryArgs = {
  input: Array<AddLibraryInput>
}

export type MutationUpdateLibraryArgs = {
  input: UpdateLibraryInput
}

export type MutationDeleteLibraryArgs = {
  filter: LibraryFilter
}

export type MutationAddComponentArgs = {
  input: Array<AddComponentInput>
}

export type MutationUpdateComponentArgs = {
  input: UpdateComponentInput
}

export type MutationDeleteComponentArgs = {
  filter: ComponentFilter
}

export type MutationAddAtomArgs = {
  input: Array<AddAtomInput>
}

export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput
}

export type MutationDeleteAtomArgs = {
  filter: AtomFilter
}

export type MutationAddTagArgs = {
  input: Array<AddTagInput>
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type MutationDeleteTagArgs = {
  filter: TagFilter
}

export type MutationAddPrimitiveTypeArgs = {
  input: Array<AddPrimitiveTypeInput>
}

export type MutationUpdatePrimitiveTypeArgs = {
  input: UpdatePrimitiveTypeInput
}

export type MutationDeletePrimitiveTypeArgs = {
  filter: PrimitiveTypeFilter
}

export type MutationAddArrayTypeArgs = {
  input: Array<AddArrayTypeInput>
}

export type MutationUpdateArrayTypeArgs = {
  input: UpdateArrayTypeInput
}

export type MutationDeleteArrayTypeArgs = {
  filter: ArrayTypeFilter
}

export type MutationAddEnumTypeValueArgs = {
  input: Array<AddEnumTypeValueInput>
}

export type MutationUpdateEnumTypeValueArgs = {
  input: UpdateEnumTypeValueInput
}

export type MutationDeleteEnumTypeValueArgs = {
  filter: EnumTypeValueFilter
}

export type MutationAddEnumTypeArgs = {
  input: Array<AddEnumTypeInput>
}

export type MutationUpdateEnumTypeArgs = {
  input: UpdateEnumTypeInput
}

export type MutationDeleteEnumTypeArgs = {
  filter: EnumTypeFilter
}

export type MutationAddInterfaceArgs = {
  input: Array<AddInterfaceInput>
}

export type MutationUpdateInterfaceArgs = {
  input: UpdateInterfaceInput
}

export type MutationDeleteInterfaceArgs = {
  filter: InterfaceFilter
}

export type MutationUpdateTypeArgs = {
  input: UpdateTypeInput
}

export type MutationDeleteTypeArgs = {
  filter: TypeFilter
}

export type MutationAddFieldArgs = {
  input: Array<AddFieldInput>
}

export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput
}

export type MutationDeleteFieldArgs = {
  filter: FieldFilter
}

export type MutationAddStringValueArgs = {
  input: Array<AddStringValueInput>
}

export type MutationUpdateStringValueArgs = {
  input: UpdateStringValueInput
}

export type MutationDeleteStringValueArgs = {
  filter: StringValueFilter
}

export type MutationAddIntValueArgs = {
  input: Array<AddIntValueInput>
}

export type MutationUpdateIntValueArgs = {
  input: UpdateIntValueInput
}

export type MutationDeleteIntValueArgs = {
  filter: IntValueFilter
}

export type MutationAddFloatValueArgs = {
  input: Array<AddFloatValueInput>
}

export type MutationUpdateFloatValueArgs = {
  input: UpdateFloatValueInput
}

export type MutationDeleteFloatValueArgs = {
  filter: FloatValueFilter
}

export type MutationAddBooleanValueArgs = {
  input: Array<AddBooleanValueInput>
}

export type MutationUpdateBooleanValueArgs = {
  input: UpdateBooleanValueInput
}

export type MutationDeleteBooleanValueArgs = {
  filter: BooleanValueFilter
}

export type MutationAddArrayValueArgs = {
  input: Array<AddArrayValueInput>
}

export type MutationUpdateArrayValueArgs = {
  input: UpdateArrayValueInput
}

export type MutationDeleteArrayValueArgs = {
  filter: ArrayValueFilter
}

export type MutationAddInterfaceValueArgs = {
  input: Array<AddInterfaceValueInput>
}

export type MutationUpdateInterfaceValueArgs = {
  input: UpdateInterfaceValueInput
}

export type MutationDeleteInterfaceValueArgs = {
  filter: InterfaceValueFilter
}

export type MutationAddPropArgs = {
  input: Array<AddPropInput>
}

export type MutationUpdatePropArgs = {
  input: UpdatePropInput
}

export type MutationDeletePropArgs = {
  filter: PropFilter
}

export type NearFilter = {
  distance: Scalars['Float']
  coordinate: PointRef
}

export type Page = {
  id: Scalars['ID']
  name: Scalars['String']
  app: App
  rootElement: Element
}

export type PageAppArgs = {
  filter?: Maybe<AppFilter>
}

export type PageRootElementArgs = {
  filter?: Maybe<ElementFilter>
}

export type PageAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type PageFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  name?: Maybe<StringFullTextFilter_StringTermFilter>
  has?: Maybe<Array<Maybe<PageHasFilter>>>
  and?: Maybe<Array<Maybe<PageFilter>>>
  or?: Maybe<Array<Maybe<PageFilter>>>
  not?: Maybe<PageFilter>
}

export enum PageHasFilter {
  Name = 'name',
  App = 'app',
  RootElement = 'rootElement',
}

export type PageOrder = {
  asc?: Maybe<PageOrderable>
  desc?: Maybe<PageOrderable>
  then?: Maybe<PageOrder>
}

export enum PageOrderable {
  Name = 'name',
}

export type PagePatch = {
  name?: Maybe<Scalars['String']>
  app?: Maybe<AppRef>
  rootElement?: Maybe<ElementRef>
}

export type PageRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  app?: Maybe<AppRef>
  rootElement?: Maybe<ElementRef>
}

export type Point = {
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type PointGeoFilter = {
  near?: Maybe<NearFilter>
  within?: Maybe<WithinFilter>
}

export type PointList = {
  points: Array<Point>
}

export type PointListRef = {
  points: Array<PointRef>
}

export type PointRef = {
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type Polygon = {
  coordinates: Array<PointList>
}

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>
  within?: Maybe<WithinFilter>
  contains?: Maybe<ContainsFilter>
  intersects?: Maybe<IntersectsFilter>
}

export type PolygonRef = {
  coordinates: Array<PointListRef>
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

export type PrimitiveTypeAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type PrimitiveTypeFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<PrimitiveTypeHasFilter>>>
  and?: Maybe<Array<Maybe<PrimitiveTypeFilter>>>
  or?: Maybe<Array<Maybe<PrimitiveTypeFilter>>>
  not?: Maybe<PrimitiveTypeFilter>
}

export enum PrimitiveTypeHasFilter {
  Name = 'name',
  PrimitiveKind = 'primitiveKind',
}

export type PrimitiveTypeOrder = {
  asc?: Maybe<PrimitiveTypeOrderable>
  desc?: Maybe<PrimitiveTypeOrderable>
  then?: Maybe<PrimitiveTypeOrder>
}

export enum PrimitiveTypeOrderable {
  Name = 'name',
}

export type PrimitiveTypePatch = {
  name?: Maybe<Scalars['String']>
  primitiveKind?: Maybe<PrimitiveKind>
}

export type PrimitiveTypeRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  primitiveKind?: Maybe<PrimitiveKind>
}

export type Prop = {
  id: Scalars['ID']
  field: Field
  value?: Maybe<PropValue>
  element?: Maybe<Element>
}

export type PropFieldArgs = {
  filter?: Maybe<FieldFilter>
}

export type PropValueArgs = {
  filter?: Maybe<PropValueFilter>
}

export type PropElementArgs = {
  filter?: Maybe<ElementFilter>
}

export type PropAggregateResult = {
  count?: Maybe<Scalars['Int']>
}

export type PropFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<PropHasFilter>>>
  and?: Maybe<Array<Maybe<PropFilter>>>
  or?: Maybe<Array<Maybe<PropFilter>>>
  not?: Maybe<PropFilter>
}

export enum PropHasFilter {
  Field = 'field',
  Value = 'value',
  Element = 'element',
}

export type PropPatch = {
  field?: Maybe<FieldRef>
  value?: Maybe<PropValueRef>
  element?: Maybe<ElementRef>
}

export type PropRef = {
  id?: Maybe<Scalars['ID']>
  field?: Maybe<FieldRef>
  value?: Maybe<PropValueRef>
  element?: Maybe<ElementRef>
}

export type PropValue =
  | StringValue
  | IntValue
  | FloatValue
  | BooleanValue
  | ArrayValue
  | InterfaceValue
  | EnumTypeValue

export type PropValueFilter = {
  memberTypes?: Maybe<Array<PropValueType>>
  stringValueFilter?: Maybe<StringValueFilter>
  intValueFilter?: Maybe<IntValueFilter>
  floatValueFilter?: Maybe<FloatValueFilter>
  booleanValueFilter?: Maybe<BooleanValueFilter>
  arrayValueFilter?: Maybe<ArrayValueFilter>
  interfaceValueFilter?: Maybe<InterfaceValueFilter>
  enumTypeValueFilter?: Maybe<EnumTypeValueFilter>
}

export type PropValueRef = {
  stringValueRef?: Maybe<StringValueRef>
  intValueRef?: Maybe<IntValueRef>
  floatValueRef?: Maybe<FloatValueRef>
  booleanValueRef?: Maybe<BooleanValueRef>
  arrayValueRef?: Maybe<ArrayValueRef>
  interfaceValueRef?: Maybe<InterfaceValueRef>
  enumTypeValueRef?: Maybe<EnumTypeValueRef>
}

export enum PropValueType {
  StringValue = 'StringValue',
  IntValue = 'IntValue',
  FloatValue = 'FloatValue',
  BooleanValue = 'BooleanValue',
  ArrayValue = 'ArrayValue',
  InterfaceValue = 'InterfaceValue',
  EnumTypeValue = 'EnumTypeValue',
}

export type Query = {
  getApp?: Maybe<App>
  queryApp?: Maybe<Array<Maybe<App>>>
  aggregateApp?: Maybe<AppAggregateResult>
  getPage?: Maybe<Page>
  queryPage?: Maybe<Array<Maybe<Page>>>
  aggregatePage?: Maybe<PageAggregateResult>
  getElement?: Maybe<Element>
  queryElement?: Maybe<Array<Maybe<Element>>>
  aggregateElement?: Maybe<ElementAggregateResult>
  getLibrary?: Maybe<Library>
  queryLibrary?: Maybe<Array<Maybe<Library>>>
  aggregateLibrary?: Maybe<LibraryAggregateResult>
  getComponent?: Maybe<Component>
  queryComponent?: Maybe<Array<Maybe<Component>>>
  aggregateComponent?: Maybe<ComponentAggregateResult>
  getAtom?: Maybe<Atom>
  queryAtom?: Maybe<Array<Maybe<Atom>>>
  aggregateAtom?: Maybe<AtomAggregateResult>
  queryTag?: Maybe<Array<Maybe<Tag>>>
  aggregateTag?: Maybe<TagAggregateResult>
  getPrimitiveType?: Maybe<PrimitiveType>
  queryPrimitiveType?: Maybe<Array<Maybe<PrimitiveType>>>
  aggregatePrimitiveType?: Maybe<PrimitiveTypeAggregateResult>
  getArrayType?: Maybe<ArrayType>
  queryArrayType?: Maybe<Array<Maybe<ArrayType>>>
  aggregateArrayType?: Maybe<ArrayTypeAggregateResult>
  getEnumTypeValue?: Maybe<EnumTypeValue>
  queryEnumTypeValue?: Maybe<Array<Maybe<EnumTypeValue>>>
  aggregateEnumTypeValue?: Maybe<EnumTypeValueAggregateResult>
  getEnumType?: Maybe<EnumType>
  queryEnumType?: Maybe<Array<Maybe<EnumType>>>
  aggregateEnumType?: Maybe<EnumTypeAggregateResult>
  getInterface?: Maybe<Interface>
  queryInterface?: Maybe<Array<Maybe<Interface>>>
  aggregateInterface?: Maybe<InterfaceAggregateResult>
  getType?: Maybe<Type>
  queryType?: Maybe<Array<Maybe<Type>>>
  aggregateType?: Maybe<TypeAggregateResult>
  getField?: Maybe<Field>
  queryField?: Maybe<Array<Maybe<Field>>>
  aggregateField?: Maybe<FieldAggregateResult>
  getStringValue?: Maybe<StringValue>
  queryStringValue?: Maybe<Array<Maybe<StringValue>>>
  aggregateStringValue?: Maybe<StringValueAggregateResult>
  getIntValue?: Maybe<IntValue>
  queryIntValue?: Maybe<Array<Maybe<IntValue>>>
  aggregateIntValue?: Maybe<IntValueAggregateResult>
  getFloatValue?: Maybe<FloatValue>
  queryFloatValue?: Maybe<Array<Maybe<FloatValue>>>
  aggregateFloatValue?: Maybe<FloatValueAggregateResult>
  getBooleanValue?: Maybe<BooleanValue>
  queryBooleanValue?: Maybe<Array<Maybe<BooleanValue>>>
  aggregateBooleanValue?: Maybe<BooleanValueAggregateResult>
  getArrayValue?: Maybe<ArrayValue>
  queryArrayValue?: Maybe<Array<Maybe<ArrayValue>>>
  aggregateArrayValue?: Maybe<ArrayValueAggregateResult>
  getInterfaceValue?: Maybe<InterfaceValue>
  queryInterfaceValue?: Maybe<Array<Maybe<InterfaceValue>>>
  aggregateInterfaceValue?: Maybe<InterfaceValueAggregateResult>
  getProp?: Maybe<Prop>
  queryProp?: Maybe<Array<Maybe<Prop>>>
  aggregateProp?: Maybe<PropAggregateResult>
}

export type QueryGetAppArgs = {
  id: Scalars['ID']
}

export type QueryQueryAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAppArgs = {
  filter?: Maybe<AppFilter>
}

export type QueryGetPageArgs = {
  id: Scalars['ID']
}

export type QueryQueryPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePageArgs = {
  filter?: Maybe<PageFilter>
}

export type QueryGetElementArgs = {
  id: Scalars['ID']
}

export type QueryQueryElementArgs = {
  filter?: Maybe<ElementFilter>
  order?: Maybe<ElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateElementArgs = {
  filter?: Maybe<ElementFilter>
}

export type QueryGetLibraryArgs = {
  id: Scalars['ID']
}

export type QueryQueryLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type QueryGetComponentArgs = {
  id: Scalars['ID']
}

export type QueryQueryComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateComponentArgs = {
  filter?: Maybe<ComponentFilter>
}

export type QueryGetAtomArgs = {
  id: Scalars['ID']
}

export type QueryQueryAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type QueryQueryTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateTagArgs = {
  filter?: Maybe<TagFilter>
}

export type QueryGetPrimitiveTypeArgs = {
  id: Scalars['ID']
}

export type QueryQueryPrimitiveTypeArgs = {
  filter?: Maybe<PrimitiveTypeFilter>
  order?: Maybe<PrimitiveTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePrimitiveTypeArgs = {
  filter?: Maybe<PrimitiveTypeFilter>
}

export type QueryGetArrayTypeArgs = {
  id: Scalars['ID']
}

export type QueryQueryArrayTypeArgs = {
  filter?: Maybe<ArrayTypeFilter>
  order?: Maybe<ArrayTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateArrayTypeArgs = {
  filter?: Maybe<ArrayTypeFilter>
}

export type QueryGetEnumTypeValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryEnumTypeValueArgs = {
  filter?: Maybe<EnumTypeValueFilter>
  order?: Maybe<EnumTypeValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateEnumTypeValueArgs = {
  filter?: Maybe<EnumTypeValueFilter>
}

export type QueryGetEnumTypeArgs = {
  id: Scalars['ID']
}

export type QueryQueryEnumTypeArgs = {
  filter?: Maybe<EnumTypeFilter>
  order?: Maybe<EnumTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateEnumTypeArgs = {
  filter?: Maybe<EnumTypeFilter>
}

export type QueryGetInterfaceArgs = {
  id: Scalars['ID']
}

export type QueryQueryInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
  order?: Maybe<InterfaceOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
}

export type QueryGetTypeArgs = {
  id: Scalars['ID']
}

export type QueryQueryTypeArgs = {
  filter?: Maybe<TypeFilter>
  order?: Maybe<TypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateTypeArgs = {
  filter?: Maybe<TypeFilter>
}

export type QueryGetFieldArgs = {
  id: Scalars['ID']
}

export type QueryQueryFieldArgs = {
  filter?: Maybe<FieldFilter>
  order?: Maybe<FieldOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateFieldArgs = {
  filter?: Maybe<FieldFilter>
}

export type QueryGetStringValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryStringValueArgs = {
  filter?: Maybe<StringValueFilter>
  order?: Maybe<StringValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateStringValueArgs = {
  filter?: Maybe<StringValueFilter>
}

export type QueryGetIntValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryIntValueArgs = {
  filter?: Maybe<IntValueFilter>
  order?: Maybe<IntValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateIntValueArgs = {
  filter?: Maybe<IntValueFilter>
}

export type QueryGetFloatValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryFloatValueArgs = {
  filter?: Maybe<FloatValueFilter>
  order?: Maybe<FloatValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateFloatValueArgs = {
  filter?: Maybe<FloatValueFilter>
}

export type QueryGetBooleanValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryBooleanValueArgs = {
  filter?: Maybe<BooleanValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateBooleanValueArgs = {
  filter?: Maybe<BooleanValueFilter>
}

export type QueryGetArrayValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryArrayValueArgs = {
  filter?: Maybe<ArrayValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateArrayValueArgs = {
  filter?: Maybe<ArrayValueFilter>
}

export type QueryGetInterfaceValueArgs = {
  id: Scalars['ID']
}

export type QueryQueryInterfaceValueArgs = {
  filter?: Maybe<InterfaceValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateInterfaceValueArgs = {
  filter?: Maybe<InterfaceValueFilter>
}

export type QueryGetPropArgs = {
  id: Scalars['ID']
}

export type QueryQueryPropArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePropArgs = {
  filter?: Maybe<PropFilter>
}

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  between?: Maybe<StringRange>
}

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>
  anyoftext?: Maybe<Scalars['String']>
}

export type StringFullTextFilter_StringHashFilter = {
  alloftext?: Maybe<Scalars['String']>
  anyoftext?: Maybe<Scalars['String']>
  eq?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type StringFullTextFilter_StringTermFilter = {
  alloftext?: Maybe<Scalars['String']>
  anyoftext?: Maybe<Scalars['String']>
  allofterms?: Maybe<Scalars['String']>
  anyofterms?: Maybe<Scalars['String']>
}

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type StringRange = {
  min: Scalars['String']
  max: Scalars['String']
}

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>
}

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>
  anyofterms?: Maybe<Scalars['String']>
}

export type StringValue = {
  id: Scalars['ID']
  stringValue: Scalars['String']
}

export type StringValueAggregateResult = {
  count?: Maybe<Scalars['Int']>
  stringValueMin?: Maybe<Scalars['String']>
  stringValueMax?: Maybe<Scalars['String']>
}

export type StringValueFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<StringValueHasFilter>>>
  and?: Maybe<Array<Maybe<StringValueFilter>>>
  or?: Maybe<Array<Maybe<StringValueFilter>>>
  not?: Maybe<StringValueFilter>
}

export enum StringValueHasFilter {
  StringValue = 'stringValue',
}

export type StringValueOrder = {
  asc?: Maybe<StringValueOrderable>
  desc?: Maybe<StringValueOrderable>
  then?: Maybe<StringValueOrder>
}

export enum StringValueOrderable {
  StringValue = 'stringValue',
}

export type StringValuePatch = {
  stringValue?: Maybe<Scalars['String']>
}

export type StringValueRef = {
  id?: Maybe<Scalars['ID']>
  stringValue?: Maybe<Scalars['String']>
}

export type Tag = {
  label: Scalars['String']
}

export type TagAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type TagFilter = {
  has?: Maybe<Array<Maybe<TagHasFilter>>>
  and?: Maybe<Array<Maybe<TagFilter>>>
  or?: Maybe<Array<Maybe<TagFilter>>>
  not?: Maybe<TagFilter>
}

export enum TagHasFilter {
  Label = 'label',
}

export type TagOrder = {
  asc?: Maybe<TagOrderable>
  desc?: Maybe<TagOrderable>
  then?: Maybe<TagOrder>
}

export enum TagOrderable {
  Label = 'label',
}

export type TagPatch = {
  label?: Maybe<Scalars['String']>
}

export type TagRef = {
  label?: Maybe<Scalars['String']>
}

export type Type = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type TypeAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type TypeFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<TypeHasFilter>>>
  and?: Maybe<Array<Maybe<TypeFilter>>>
  or?: Maybe<Array<Maybe<TypeFilter>>>
  not?: Maybe<TypeFilter>
}

export enum TypeHasFilter {
  Name = 'name',
}

export type TypeOrder = {
  asc?: Maybe<TypeOrderable>
  desc?: Maybe<TypeOrderable>
  then?: Maybe<TypeOrder>
}

export enum TypeOrderable {
  Name = 'name',
}

export type TypePatch = {
  name?: Maybe<Scalars['String']>
}

export type TypeRef = {
  id: Scalars['ID']
}

export type TypeUnion = Interface | EnumType | ArrayType | PrimitiveType

export type TypeUnionFilter = {
  memberTypes?: Maybe<Array<TypeUnionType>>
  interfaceFilter?: Maybe<InterfaceFilter>
  enumTypeFilter?: Maybe<EnumTypeFilter>
  arrayTypeFilter?: Maybe<ArrayTypeFilter>
  primitiveTypeFilter?: Maybe<PrimitiveTypeFilter>
}

export type TypeUnionRef = {
  interfaceRef?: Maybe<InterfaceRef>
  enumTypeRef?: Maybe<EnumTypeRef>
  arrayTypeRef?: Maybe<ArrayTypeRef>
  primitiveTypeRef?: Maybe<PrimitiveTypeRef>
}

export enum TypeUnionType {
  Interface = 'Interface',
  EnumType = 'EnumType',
  ArrayType = 'ArrayType',
  PrimitiveType = 'PrimitiveType',
}

export type UpdateAppInput = {
  filter: AppFilter
  set?: Maybe<AppPatch>
  remove?: Maybe<AppPatch>
}

export type UpdateAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateArrayTypeInput = {
  filter: ArrayTypeFilter
  set?: Maybe<ArrayTypePatch>
  remove?: Maybe<ArrayTypePatch>
}

export type UpdateArrayTypePayload = {
  arrayType?: Maybe<Array<Maybe<ArrayType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateArrayTypePayloadArrayTypeArgs = {
  filter?: Maybe<ArrayTypeFilter>
  order?: Maybe<ArrayTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateArrayValueInput = {
  filter: ArrayValueFilter
  set?: Maybe<ArrayValuePatch>
  remove?: Maybe<ArrayValuePatch>
}

export type UpdateArrayValuePayload = {
  arrayValue?: Maybe<Array<Maybe<ArrayValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateArrayValuePayloadArrayValueArgs = {
  filter?: Maybe<ArrayValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateAtomInput = {
  filter: AtomFilter
  set?: Maybe<AtomPatch>
  remove?: Maybe<AtomPatch>
}

export type UpdateAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateBooleanValueInput = {
  filter: BooleanValueFilter
  set?: Maybe<BooleanValuePatch>
  remove?: Maybe<BooleanValuePatch>
}

export type UpdateBooleanValuePayload = {
  booleanValue?: Maybe<Array<Maybe<BooleanValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateBooleanValuePayloadBooleanValueArgs = {
  filter?: Maybe<BooleanValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateComponentInput = {
  filter: ComponentFilter
  set?: Maybe<ComponentPatch>
  remove?: Maybe<ComponentPatch>
}

export type UpdateComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateElementInput = {
  filter: ElementFilter
  set?: Maybe<ElementPatch>
  remove?: Maybe<ElementPatch>
}

export type UpdateElementPayload = {
  element?: Maybe<Array<Maybe<Element>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateElementPayloadElementArgs = {
  filter?: Maybe<ElementFilter>
  order?: Maybe<ElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateEnumTypeInput = {
  filter: EnumTypeFilter
  set?: Maybe<EnumTypePatch>
  remove?: Maybe<EnumTypePatch>
}

export type UpdateEnumTypePayload = {
  enumType?: Maybe<Array<Maybe<EnumType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateEnumTypePayloadEnumTypeArgs = {
  filter?: Maybe<EnumTypeFilter>
  order?: Maybe<EnumTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateEnumTypeValueInput = {
  filter: EnumTypeValueFilter
  set?: Maybe<EnumTypeValuePatch>
  remove?: Maybe<EnumTypeValuePatch>
}

export type UpdateEnumTypeValuePayload = {
  enumTypeValue?: Maybe<Array<Maybe<EnumTypeValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateEnumTypeValuePayloadEnumTypeValueArgs = {
  filter?: Maybe<EnumTypeValueFilter>
  order?: Maybe<EnumTypeValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateFieldInput = {
  filter: FieldFilter
  set?: Maybe<FieldPatch>
  remove?: Maybe<FieldPatch>
}

export type UpdateFieldPayload = {
  field?: Maybe<Array<Maybe<Field>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateFieldPayloadFieldArgs = {
  filter?: Maybe<FieldFilter>
  order?: Maybe<FieldOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateFloatValueInput = {
  filter: FloatValueFilter
  set?: Maybe<FloatValuePatch>
  remove?: Maybe<FloatValuePatch>
}

export type UpdateFloatValuePayload = {
  floatValue?: Maybe<Array<Maybe<FloatValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateFloatValuePayloadFloatValueArgs = {
  filter?: Maybe<FloatValueFilter>
  order?: Maybe<FloatValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateIntValueInput = {
  filter: IntValueFilter
  set?: Maybe<IntValuePatch>
  remove?: Maybe<IntValuePatch>
}

export type UpdateIntValuePayload = {
  intValue?: Maybe<Array<Maybe<IntValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateIntValuePayloadIntValueArgs = {
  filter?: Maybe<IntValueFilter>
  order?: Maybe<IntValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateInterfaceInput = {
  filter: InterfaceFilter
  set?: Maybe<InterfacePatch>
  remove?: Maybe<InterfacePatch>
}

export type UpdateInterfacePayload = {
  interface?: Maybe<Array<Maybe<Interface>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateInterfacePayloadInterfaceArgs = {
  filter?: Maybe<InterfaceFilter>
  order?: Maybe<InterfaceOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateInterfaceValueInput = {
  filter: InterfaceValueFilter
  set?: Maybe<InterfaceValuePatch>
  remove?: Maybe<InterfaceValuePatch>
}

export type UpdateInterfaceValuePayload = {
  interfaceValue?: Maybe<Array<Maybe<InterfaceValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateInterfaceValuePayloadInterfaceValueArgs = {
  filter?: Maybe<InterfaceValueFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateLibraryInput = {
  filter: LibraryFilter
  set?: Maybe<LibraryPatch>
  remove?: Maybe<LibraryPatch>
}

export type UpdateLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdatePageInput = {
  filter: PageFilter
  set?: Maybe<PagePatch>
  remove?: Maybe<PagePatch>
}

export type UpdatePagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdatePagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdatePrimitiveTypeInput = {
  filter: PrimitiveTypeFilter
  set?: Maybe<PrimitiveTypePatch>
  remove?: Maybe<PrimitiveTypePatch>
}

export type UpdatePrimitiveTypePayload = {
  primitiveType?: Maybe<Array<Maybe<PrimitiveType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdatePrimitiveTypePayloadPrimitiveTypeArgs = {
  filter?: Maybe<PrimitiveTypeFilter>
  order?: Maybe<PrimitiveTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdatePropInput = {
  filter: PropFilter
  set?: Maybe<PropPatch>
  remove?: Maybe<PropPatch>
}

export type UpdatePropPayload = {
  prop?: Maybe<Array<Maybe<Prop>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdatePropPayloadPropArgs = {
  filter?: Maybe<PropFilter>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateStringValueInput = {
  filter: StringValueFilter
  set?: Maybe<StringValuePatch>
  remove?: Maybe<StringValuePatch>
}

export type UpdateStringValuePayload = {
  stringValue?: Maybe<Array<Maybe<StringValue>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateStringValuePayloadStringValueArgs = {
  filter?: Maybe<StringValueFilter>
  order?: Maybe<StringValueOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateTagInput = {
  filter: TagFilter
  set?: Maybe<TagPatch>
  remove?: Maybe<TagPatch>
}

export type UpdateTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateTypeInput = {
  filter: TypeFilter
  set?: Maybe<TypePatch>
  remove?: Maybe<TypePatch>
}

export type UpdateTypePayload = {
  type?: Maybe<Array<Maybe<Type>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateTypePayloadTypeArgs = {
  filter?: Maybe<TypeFilter>
  order?: Maybe<TypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type WithinFilter = {
  polygon: PolygonRef
}

export type DeleteUserAppsMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type DeleteUserAppsMutation = {
  deleteApp?: Maybe<Pick<DeleteAppPayload, 'numUids'>>
}

export type Dgraph__AppFragment = Pick<App, 'id' | 'name' | 'ownerId'>

export type CreateAppMutationVariables = Exact<{
  input: Array<AddAppInput> | AddAppInput
}>

export type CreateAppMutation = {
  addApp?: Maybe<{ app?: Maybe<Array<Maybe<Dgraph__AppFragment>>> }>
}

export type DeleteAppMutationVariables = Exact<{
  filter: AppFilter
}>

export type DeleteAppMutation = {
  deleteApp?: Maybe<{ app?: Maybe<Array<Maybe<Dgraph__AppFragment>>> }>
}

export type GetAppQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetAppQuery = { app?: Maybe<Dgraph__AppFragment> }

export type GetAppsQueryVariables = Exact<{
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetAppsQuery = { apps?: Maybe<Array<Maybe<Dgraph__AppFragment>>> }

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = {
  updateApp?: Maybe<{ app?: Maybe<Array<Maybe<Dgraph__AppFragment>>> }>
}

export type DGraph__AtomFragment = Pick<Atom, 'id' | 'label' | 'type'> & {
  propTypes: Dgraph__InterfaceFragment
}

export type CreateAtomMutationVariables = Exact<{
  input: Array<AddAtomInput> | AddAtomInput
}>

export type CreateAtomMutation = {
  addAtom?: Maybe<{ atom?: Maybe<Array<Maybe<DGraph__AtomFragment>>> }>
}

export type DeleteAtomAndInterfaceMutationVariables = Exact<{
  filter: AtomFilter
  interfaceFilter: InterfaceFilter
  fieldFilter: FieldFilter
}>

export type DeleteAtomAndInterfaceMutation = {
  deleteAtom?: Maybe<Pick<DeleteAtomPayload, 'numUids'>>
  deleteInterface?: Maybe<Pick<DeleteInterfacePayload, 'numUids'>>
  deleteField?: Maybe<Pick<DeleteFieldPayload, 'numUids'>>
}

export type GetAtomByElementQueryVariables = Exact<{
  elementId: Scalars['ID']
}>

export type GetAtomByElementQuery = {
  getElement?: Maybe<{ atom?: Maybe<DGraph__AtomFragment> }>
}

export type GetAtomQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetAtomQuery = { atom?: Maybe<DGraph__AtomFragment> }

export type GetAtomsQueryVariables = Exact<{
  filter?: Maybe<AtomFilter>
}>

export type GetAtomsQuery = {
  atoms?: Maybe<Array<Maybe<DGraph__AtomFragment>>>
}

export type UpdateAtomMutationVariables = Exact<{
  input: UpdateAtomInput
}>

export type UpdateAtomMutation = {
  updateAtom?: Maybe<{ atom?: Maybe<Array<Maybe<DGraph__AtomFragment>>> }>
}

export type LibraryExplorer__AtomFragment = Pick<Atom, 'id' | 'label' | 'type'>

export type __ComponentFragment = Pick<Component, 'id' | 'label'>

export type LibraryExplorer__ComponentFragment = Pick<Component, 'id' | 'label'>

export type CreateComponentMutationVariables = Exact<{
  input: Array<AddComponentInput> | AddComponentInput
}>

export type CreateComponentMutation = {
  components?: Maybe<{
    component?: Maybe<Array<Maybe<Pick<Component, 'id' | 'label'>>>>
  }>
}

export type DeleteComponentMutationVariables = Exact<{
  filter: ComponentFilter
}>

export type DeleteComponentMutation = {
  deleteComponent?: Maybe<Pick<DeleteComponentPayload, 'numUids' | 'msg'>>
}

export type GetComponentDetailQueryVariables = Exact<{
  componentId: Scalars['ID']
}>

export type GetComponentDetailQuery = { component?: Maybe<__ComponentFragment> }

export type GetComponentsQueryVariables = Exact<{
  filter?: Maybe<ComponentFilter>
}>

export type GetComponentsQuery = {
  components?: Maybe<Array<Maybe<Pick<Component, 'id' | 'label'>>>>
}

export type Dgraph_ElementFragment = Pick<Element, 'id' | 'name' | 'css'> & {
  atom?: Maybe<DGraph__AtomFragment>
  parent?: Maybe<Pick<Element, 'id'>>
  ownedBy: { __typename: 'Page' } & Dgraph__PageFragment
}

export type DeleteElementMutationVariables = Exact<{
  filter: ElementFilter
  propsFilter: PropFilter
}>

export type DeleteElementMutation = {
  deleteElement?: Maybe<Pick<DeleteElementPayload, 'numUids'>>
  deleteProp?: Maybe<Pick<DeletePropPayload, 'numUids'>>
}

export type GetElementOwnerQueryVariables = Exact<{
  elementId: Scalars['ID']
}>

export type GetElementOwnerQuery = {
  getElement?: Maybe<
    {
      ownedBy: { __typename: 'Page' } & {
        app: Pick<App, 'ownerId'>
      } & Dgraph__PageFragment
    } & Dgraph_ElementFragment
  >
}

export type GetElementParentQueryVariables = Exact<{
  elementId: Scalars['ID']
}>

export type GetElementParentQuery = {
  getElement?: Maybe<{ parent?: Maybe<Dgraph_ElementFragment> }>
}

export type GetElementQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetElementQuery = { getElement?: Maybe<Dgraph_ElementFragment> }

export type UpdateElementMutationVariables = Exact<{
  input: UpdateElementInput
}>

export type UpdateElementMutation = {
  updateElement?: Maybe<
    Pick<UpdateElementPayload, 'numUids'> & {
      element?: Maybe<Array<Maybe<Dgraph_ElementFragment>>>
    }
  >
}

export type __LibraryFragment = Pick<Library, 'id' | 'name'>

export type CreateLibraryMutationVariables = Exact<{
  input: Array<AddLibraryInput> | AddLibraryInput
}>

export type CreateLibraryMutation = {
  libraries?: Maybe<{ library?: Maybe<Array<Maybe<__LibraryFragment>>> }>
}

export type LibraryExplorerQueryVariables = Exact<{
  filter?: Maybe<LibraryFilter>
}>

export type LibraryExplorerQuery = {
  libraries?: Maybe<Array<Maybe<LibraryExplorer__LibraryFragment>>>
}

export type LibraryExplorer__LibraryFragment = Pick<Library, 'id' | 'name'> & {
  atoms?: Maybe<Array<Maybe<LibraryExplorer__AtomFragment>>>
  components?: Maybe<Array<Maybe<LibraryExplorer__ComponentFragment>>>
}

export type Dgraph__PageFragment = Pick<Page, 'id' | 'name'> & {
  app: Dgraph__AppFragment
}

export type CreatePageMutationVariables = Exact<{
  input: Array<AddPageInput> | AddPageInput
}>

export type CreatePageMutation = {
  addPage?: Maybe<{ page?: Maybe<Array<Maybe<Dgraph__PageFragment>>> }>
}

export type DeletePageMutationVariables = Exact<{
  filter: PageFilter
  elementFilter: ElementFilter
  propsFilter: PropFilter
}>

export type DeletePageMutation = {
  deletePage?: Maybe<Pick<DeletePagePayload, 'numUids'>>
  deleteElement?: Maybe<Pick<DeleteElementPayload, 'numUids'>>
  deleteProp?: Maybe<Pick<DeletePropPayload, 'numUids'>>
}

export type GetPageOwnerQueryVariables = Exact<{
  pageId: Scalars['ID']
}>

export type GetPageOwnerQuery = {
  getPage?: Maybe<{ app: Pick<App, 'ownerId'> }>
}

export type GetPageQueryVariables = Exact<{
  pageId: Scalars['ID']
}>

export type GetPageQuery = { getPage?: Maybe<Dgraph__PageFragment> }

export type GetPagesQueryVariables = Exact<{
  appId: Scalars['ID']
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetPagesQuery = {
  getApp?: Maybe<{ pages?: Maybe<Array<Maybe<Dgraph__PageFragment>>> }>
}

export type UpdatePageMutationVariables = Exact<{
  input: UpdatePageInput
}>

export type UpdatePageMutation = {
  updatePage?: Maybe<
    Pick<UpdatePagePayload, 'numUids'> & {
      page?: Maybe<Array<Maybe<Dgraph__PageFragment>>>
    }
  >
}

export type DgraphPropFragment = Pick<Prop, 'id'> & {
  field: Dgraph__FieldFragment
  value?: Maybe<
    | DgraphPropValue_StringValue_Fragment
    | DgraphPropValue_IntValue_Fragment
    | DgraphPropValue_FloatValue_Fragment
    | DgraphPropValue_BooleanValue_Fragment
    | DgraphPropValue_ArrayValue_Fragment
    | DgraphPropValue_InterfaceValue_Fragment
    | DgraphPropValue_EnumTypeValue_Fragment
  >
}

type DgraphPropValue_StringValue_Fragment = {
  __typename: 'StringValue'
} & DgraphStringValueFragment

type DgraphPropValue_IntValue_Fragment = {
  __typename: 'IntValue'
} & DgraphIntValueFragment

type DgraphPropValue_FloatValue_Fragment = {
  __typename: 'FloatValue'
} & DgraphFloatValueFragment

type DgraphPropValue_BooleanValue_Fragment = {
  __typename: 'BooleanValue'
} & DgraphBooleanValueFragment

type DgraphPropValue_ArrayValue_Fragment = {
  __typename: 'ArrayValue'
} & DgraphArrayValueFragment

type DgraphPropValue_InterfaceValue_Fragment = {
  __typename: 'InterfaceValue'
} & DgraphInterfaceValueFragment

type DgraphPropValue_EnumTypeValue_Fragment = {
  __typename: 'EnumTypeValue'
} & DgrapEnumTypeValueFragment

export type DgraphPropValueFragment =
  | DgraphPropValue_StringValue_Fragment
  | DgraphPropValue_IntValue_Fragment
  | DgraphPropValue_FloatValue_Fragment
  | DgraphPropValue_BooleanValue_Fragment
  | DgraphPropValue_ArrayValue_Fragment
  | DgraphPropValue_InterfaceValue_Fragment
  | DgraphPropValue_EnumTypeValue_Fragment

export type DgraphStringValueFragment = Pick<StringValue, 'id' | 'stringValue'>

export type DgraphEnumTypeValueFragment = Pick<
  StringValue,
  'id' | 'stringValue'
>

export type DgraphIntValueFragment = Pick<IntValue, 'id' | 'intValue'>

export type DgraphFloatValueFragment = Pick<FloatValue, 'id' | 'floatValue'>

type DgraphArrayInnerValue_StringValue_Fragment = {
  __typename: 'StringValue'
} & DgraphStringValueFragment

type DgraphArrayInnerValue_IntValue_Fragment = {
  __typename: 'IntValue'
} & DgraphIntValueFragment

type DgraphArrayInnerValue_FloatValue_Fragment = {
  __typename: 'FloatValue'
} & DgraphFloatValueFragment

type DgraphArrayInnerValue_BooleanValue_Fragment = {
  __typename: 'BooleanValue'
} & DgraphBooleanValueFragment

type DgraphArrayInnerValue_ArrayValue_Fragment = {
  __typename: 'ArrayValue'
} & Pick<ArrayValue, 'id'>

type DgraphArrayInnerValue_InterfaceValue_Fragment = {
  __typename: 'InterfaceValue'
} & Pick<InterfaceValue, 'id'>

type DgraphArrayInnerValue_EnumTypeValue_Fragment = {
  __typename: 'EnumTypeValue'
}

export type DgraphArrayInnerValueFragment =
  | DgraphArrayInnerValue_StringValue_Fragment
  | DgraphArrayInnerValue_IntValue_Fragment
  | DgraphArrayInnerValue_FloatValue_Fragment
  | DgraphArrayInnerValue_BooleanValue_Fragment
  | DgraphArrayInnerValue_ArrayValue_Fragment
  | DgraphArrayInnerValue_InterfaceValue_Fragment
  | DgraphArrayInnerValue_EnumTypeValue_Fragment

export type DgraphArrayValueFragment = Pick<ArrayValue, 'id'> & {
  values: Array<
    | DgraphArrayInnerValue_StringValue_Fragment
    | DgraphArrayInnerValue_IntValue_Fragment
    | DgraphArrayInnerValue_FloatValue_Fragment
    | DgraphArrayInnerValue_BooleanValue_Fragment
    | DgraphArrayInnerValue_ArrayValue_Fragment
    | DgraphArrayInnerValue_InterfaceValue_Fragment
    | DgraphArrayInnerValue_EnumTypeValue_Fragment
  >
}

export type DgraphBooleanValueFragment = Pick<
  BooleanValue,
  'id' | 'booleanValue'
>

export type DgraphInterfaceValueFragment = Pick<InterfaceValue, 'id'> & {
  props: Array<Pick<Prop, 'id'>>
}

export type GetArrayValuesQueryVariables = Exact<{
  arrayValueId: Scalars['ID']
}>

export type GetArrayValuesQuery = {
  getArrayValue?: Maybe<DgraphArrayValueFragment>
}

export type Dgraph__InterfaceWithoutFieldsFragment = Pick<
  Interface,
  'id' | 'name'
>

export type Dgraph__InterfaceFragment = {
  fields?: Maybe<Array<Maybe<Dgraph__FieldFragment>>>
} & Dgraph__InterfaceWithoutFieldsFragment

export type Dgraph__FieldFragment = Pick<
  Field,
  'id' | 'key' | 'name' | 'description'
> & {
  type:
    | Dgraph__Type_ArrayType_Fragment
    | Dgraph__Type_EnumType_Fragment
    | Dgraph__Type_Interface_Fragment
    | Dgraph__Type_PrimitiveType_Fragment
  interface: Dgraph__InterfaceWithoutFieldsFragment
}

type Dgraph__Type_ArrayType_Fragment = Pick<ArrayType, 'id' | 'name'> & {
  type:
    | Pick<ArrayType, 'id' | 'name'>
    | (Pick<EnumType, 'id' | 'name'> & {
        allowedValues: Array<Pick<EnumTypeValue, 'id' | 'name'>>
      })
    | Pick<Interface, 'id' | 'name'>
    | Pick<PrimitiveType, 'primitiveKind' | 'id' | 'name'>
}

type Dgraph__Type_EnumType_Fragment = Pick<EnumType, 'id' | 'name'> & {
  allowedValues: Array<DgrapEnumTypeValueFragment>
}

type Dgraph__Type_Interface_Fragment = Pick<Interface, 'id' | 'name'>

type Dgraph__Type_PrimitiveType_Fragment = Pick<
  PrimitiveType,
  'primitiveKind' | 'id' | 'name'
>

export type Dgraph__TypeFragment =
  | Dgraph__Type_ArrayType_Fragment
  | Dgraph__Type_EnumType_Fragment
  | Dgraph__Type_Interface_Fragment
  | Dgraph__Type_PrimitiveType_Fragment

export type DgrapEnumTypeValueFragment = Pick<
  EnumTypeValue,
  'id' | 'name' | 'value'
>

export type CreateFieldMutationVariables = Exact<{
  input: Array<AddFieldInput> | AddFieldInput
}>

export type CreateFieldMutation = {
  addField?: Maybe<{ field?: Maybe<Array<Maybe<Dgraph__FieldFragment>>> }>
}

export type DeleteFieldMutationVariables = Exact<{
  filter: FieldFilter
}>

export type DeleteFieldMutation = {
  deleteField?: Maybe<Pick<DeleteFieldPayload, 'numUids'>>
}

export type UpdateFieldMutationVariables = Exact<{
  input: UpdateFieldInput
}>

export type UpdateFieldMutation = {
  updateField?: Maybe<
    Pick<UpdateFieldPayload, 'numUids'> & {
      field?: Maybe<Array<Maybe<Dgraph__FieldFragment>>>
    }
  >
}

export type CreateInterfaceMutationVariables = Exact<{
  input: Array<AddInterfaceInput> | AddInterfaceInput
}>

export type CreateInterfaceMutation = {
  addInterface?: Maybe<{
    interface?: Maybe<Array<Maybe<Dgraph__InterfaceFragment>>>
  }>
}

export type Dgraph__InterfaceWithAtomFragment = {
  atom?: Maybe<DGraph__AtomFragment>
} & Dgraph__InterfaceWithoutFieldsFragment

export type GetInterfaceWithAtomQueryVariables = Exact<{
  interfaceId: Scalars['ID']
}>

export type GetInterfaceWithAtomQuery = {
  getInterface?: Maybe<Dgraph__InterfaceWithAtomFragment>
}

export type GetInterfaceQueryVariables = Exact<{
  interfaceId: Scalars['ID']
}>

export type GetInterfaceQuery = {
  getInterface?: Maybe<Dgraph__InterfaceWithoutFieldsFragment>
}

export type GetInterfacesQueryVariables = Exact<{
  filter?: Maybe<InterfaceFilter>
  order?: Maybe<InterfaceOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetInterfacesQuery = {
  queryInterface?: Maybe<Array<Maybe<Dgraph__InterfaceWithoutFieldsFragment>>>
}

export type UpdateInterfaceMutationVariables = Exact<{
  input: UpdateInterfaceInput
}>

export type UpdateInterfaceMutation = {
  updateInterface?: Maybe<Pick<UpdateInterfacePayload, 'numUids'>>
}

export type CreateArrayTypeMutationVariables = Exact<{
  input: Array<AddArrayTypeInput> | AddArrayTypeInput
}>

export type CreateArrayTypeMutation = {
  addArrayType?: Maybe<{
    arrayType?: Maybe<Array<Maybe<Pick<ArrayType, 'id'>>>>
  }>
}

export type CreatePrimitiveTypeMutationVariables = Exact<{
  input: Array<AddPrimitiveTypeInput> | AddPrimitiveTypeInput
}>

export type CreatePrimitiveTypeMutation = {
  addPrimitiveType?: Maybe<{
    primitiveType?: Maybe<Array<Maybe<Dgraph__Type_PrimitiveType_Fragment>>>
  }>
}

export type CreateEnumTypeMutationVariables = Exact<{
  input: Array<AddEnumTypeInput> | AddEnumTypeInput
}>

export type CreateEnumTypeMutation = {
  addEnumType?: Maybe<{
    enumType?: Maybe<Array<Maybe<Dgraph__Type_EnumType_Fragment>>>
  }>
}

export type DeleteTypeMutationVariables = Exact<{
  filter: TypeFilter
  fieldFilter: FieldFilter
}>

export type DeleteTypeMutation = {
  deleteType?: Maybe<Pick<DeleteTypePayload, 'numUids'>>
  deleteField?: Maybe<Pick<DeleteFieldPayload, 'numUids'>>
}

export type GetFieldsByTypeQueryVariables = Exact<{
  typeId: Scalars['ID']
}>

export type GetFieldsByTypeQuery = {
  queryField?: Maybe<
    Array<
      Maybe<
        Pick<Field, 'id' | 'name'> & {
          type:
            | Pick<ArrayType, 'id'>
            | Pick<EnumType, 'id'>
            | Pick<Interface, 'id'>
            | Pick<PrimitiveType, 'id'>
        }
      >
    >
  >
}

export type UpdateEnumTypeMutationVariables = Exact<{
  input: UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = {
  updateEnumType?: Maybe<{
    enumType?: Maybe<Array<Maybe<Dgraph__Type_EnumType_Fragment>>>
  }>
}

export type UpdatePrimitiveTypeMutationVariables = Exact<{
  input: UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = {
  updatePrimitiveType?: Maybe<{
    primitiveType?: Maybe<Array<Maybe<Dgraph__Type_PrimitiveType_Fragment>>>
  }>
}

export type UpdateTypeMutationVariables = Exact<{
  input: UpdateTypeInput
}>

export type UpdateTypeMutation = {
  updateType?: Maybe<{
    type?: Maybe<
      Array<
        Maybe<
          | Pick<ArrayType, 'id' | 'name'>
          | Pick<EnumType, 'id' | 'name'>
          | Pick<Interface, 'id' | 'name'>
          | Pick<PrimitiveType, 'id' | 'name'>
        >
      >
    >
  }>
}

export const __ComponentFragmentDoc = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const Dgraph__InterfaceWithoutFieldsFragmentDoc = gql`
  fragment Dgraph__InterfaceWithoutFields on Interface {
    id
    name
  }
`
export const DgrapEnumTypeValueFragmentDoc = gql`
  fragment DgrapEnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const Dgraph__TypeFragmentDoc = gql`
  fragment Dgraph__Type on Type {
    id
    name
    ... on ArrayType {
      type {
        id
        name
        ... on EnumType {
          allowedValues {
            id
            name
          }
        }
        ... on PrimitiveType {
          primitiveKind
        }
      }
    }
    ... on EnumType {
      allowedValues {
        ...DgrapEnumTypeValue
      }
    }
    ... on PrimitiveType {
      primitiveKind
    }
  }
  ${DgrapEnumTypeValueFragmentDoc}
`
export const Dgraph__FieldFragmentDoc = gql`
  fragment Dgraph__Field on Field {
    id
    key
    name
    description
    type {
      ...Dgraph__Type
    }
    interface {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__TypeFragmentDoc}
  ${Dgraph__InterfaceWithoutFieldsFragmentDoc}
`
export const Dgraph__InterfaceFragmentDoc = gql`
  fragment Dgraph__Interface on Interface {
    ...Dgraph__InterfaceWithoutFields
    fields {
      ...Dgraph__Field
    }
  }
  ${Dgraph__InterfaceWithoutFieldsFragmentDoc}
  ${Dgraph__FieldFragmentDoc}
`
export const DGraph__AtomFragmentDoc = gql`
  fragment DGraph__Atom on Atom {
    id
    label
    type
    propTypes {
      ...Dgraph__Interface
    }
  }
  ${Dgraph__InterfaceFragmentDoc}
`
export const Dgraph__AppFragmentDoc = gql`
  fragment Dgraph__App on App {
    id
    name
    ownerId
  }
`
export const Dgraph__PageFragmentDoc = gql`
  fragment Dgraph__Page on Page {
    id
    name
    app {
      ...Dgraph__App
    }
  }
  ${Dgraph__AppFragmentDoc}
`
export const Dgraph_ElementFragmentDoc = gql`
  fragment Dgraph_Element on Element {
    id
    name
    css
    atom {
      ...DGraph__Atom
    }
    parent {
      id
    }
    ownedBy {
      __typename
      ... on Page {
        ...Dgraph__Page
      }
    }
  }
  ${DGraph__AtomFragmentDoc}
  ${Dgraph__PageFragmentDoc}
`
export const __LibraryFragmentDoc = gql`
  fragment __Library on Library {
    id
    name
  }
`
export const LibraryExplorer__AtomFragmentDoc = gql`
  fragment LibraryExplorer__Atom on Atom {
    id
    label
    type
  }
`
export const LibraryExplorer__ComponentFragmentDoc = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
`
export const LibraryExplorer__LibraryFragmentDoc = gql`
  fragment LibraryExplorer__Library on Library {
    id
    name
    atoms {
      ...LibraryExplorer__Atom
    }
    components {
      ...LibraryExplorer__Component
    }
  }
  ${LibraryExplorer__AtomFragmentDoc}
  ${LibraryExplorer__ComponentFragmentDoc}
`
export const DgraphBooleanValueFragmentDoc = gql`
  fragment DgraphBooleanValue on BooleanValue {
    id
    booleanValue
  }
`
export const DgraphFloatValueFragmentDoc = gql`
  fragment DgraphFloatValue on FloatValue {
    id
    floatValue
  }
`
export const DgraphIntValueFragmentDoc = gql`
  fragment DgraphIntValue on IntValue {
    id
    intValue
  }
`
export const DgraphStringValueFragmentDoc = gql`
  fragment DgraphStringValue on StringValue {
    id
    stringValue
  }
`
export const DgraphArrayInnerValueFragmentDoc = gql`
  fragment DgraphArrayInnerValue on PropValue {
    __typename
    ... on ArrayValue {
      id
    }
    ... on BooleanValue {
      ...DgraphBooleanValue
    }
    ... on FloatValue {
      ...DgraphFloatValue
    }
    ... on InterfaceValue {
      id
    }
    ... on IntValue {
      ...DgraphIntValue
    }
    ... on StringValue {
      ...DgraphStringValue
    }
  }
  ${DgraphBooleanValueFragmentDoc}
  ${DgraphFloatValueFragmentDoc}
  ${DgraphIntValueFragmentDoc}
  ${DgraphStringValueFragmentDoc}
`
export const DgraphArrayValueFragmentDoc = gql`
  fragment DgraphArrayValue on ArrayValue {
    id
    values {
      ...DgraphArrayInnerValue
    }
  }
  ${DgraphArrayInnerValueFragmentDoc}
`
export const DgraphInterfaceValueFragmentDoc = gql`
  fragment DgraphInterfaceValue on InterfaceValue {
    id
    props {
      id
    }
  }
`
export const DgraphPropValueFragmentDoc = gql`
  fragment DgraphPropValue on PropValue {
    __typename
    ... on ArrayValue {
      ...DgraphArrayValue
    }
    ... on BooleanValue {
      ...DgraphBooleanValue
    }
    ... on FloatValue {
      ...DgraphFloatValue
    }
    ... on InterfaceValue {
      ...DgraphInterfaceValue
    }
    ... on IntValue {
      ...DgraphIntValue
    }
    ... on StringValue {
      ...DgraphStringValue
    }
    ... on EnumTypeValue {
      ...DgrapEnumTypeValue
    }
  }
  ${DgraphArrayValueFragmentDoc}
  ${DgraphBooleanValueFragmentDoc}
  ${DgraphFloatValueFragmentDoc}
  ${DgraphInterfaceValueFragmentDoc}
  ${DgraphIntValueFragmentDoc}
  ${DgraphStringValueFragmentDoc}
  ${DgrapEnumTypeValueFragmentDoc}
`
export const DgraphPropFragmentDoc = gql`
  fragment DgraphProp on Prop {
    id
    field {
      ...Dgraph__Field
    }
    value {
      ...DgraphPropValue
    }
  }
  ${Dgraph__FieldFragmentDoc}
  ${DgraphPropValueFragmentDoc}
`
export const DgraphEnumTypeValueFragmentDoc = gql`
  fragment DgraphEnumTypeValue on StringValue {
    id
    stringValue
  }
`
export const Dgraph__InterfaceWithAtomFragmentDoc = gql`
  fragment Dgraph__InterfaceWithAtom on Interface {
    ...Dgraph__InterfaceWithoutFields
    atom {
      ...DGraph__Atom
    }
  }
  ${Dgraph__InterfaceWithoutFieldsFragmentDoc}
  ${DGraph__AtomFragmentDoc}
`
export const DeleteUserAppsGql = gql`
  mutation DeleteUserApps($userId: String!) {
    deleteApp(filter: { ownerId: { eq: $userId } }) {
      numUids
    }
  }
`
export type DeleteUserAppsMutationFn = Apollo.MutationFunction<
  DeleteUserAppsMutation,
  DeleteUserAppsMutationVariables
>

/**
 * __useDeleteUserAppsMutation__
 *
 * To run a mutation, you first call `useDeleteUserAppsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAppsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAppsMutation, { data, loading, error }] = useDeleteUserAppsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserAppsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserAppsMutation,
    DeleteUserAppsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteUserAppsMutation,
    DeleteUserAppsMutationVariables
  >(DeleteUserAppsGql, options)
}
export type DeleteUserAppsMutationHookResult = ReturnType<
  typeof useDeleteUserAppsMutation
>
export type DeleteUserAppsMutationResult =
  Apollo.MutationResult<DeleteUserAppsMutation>
export type DeleteUserAppsMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserAppsMutation,
  DeleteUserAppsMutationVariables
>
export const CreateAppGql = gql`
  mutation CreateApp($input: [AddAppInput!]!) {
    addApp(input: $input) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__AppFragmentDoc}
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
  mutation DeleteApp($filter: AppFilter!) {
    deleteApp(filter: $filter) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__AppFragmentDoc}
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
 *      filter: // value for 'filter'
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
  query GetApp($id: ID!) {
    app: getApp(id: $id) {
      ...Dgraph__App
    }
  }
  ${Dgraph__AppFragmentDoc}
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
 *      id: // value for 'id'
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
  query GetApps(
    $filter: AppFilter
    $order: AppOrder
    $first: Int
    $offset: Int
  ) {
    apps: queryApp(
      filter: $filter
      order: $order
      first: $first
      offset: $offset
    ) {
      ...Dgraph__App
    }
  }
  ${Dgraph__AppFragmentDoc}
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
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
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
    updateApp(input: $input) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__AppFragmentDoc}
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
  mutation CreateAtom($input: [AddAtomInput!]!) {
    addAtom(input: $input) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__AtomFragmentDoc}
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
export const DeleteAtomAndInterfaceGql = gql`
  mutation DeleteAtomAndInterface(
    $filter: AtomFilter!
    $interfaceFilter: InterfaceFilter!
    $fieldFilter: FieldFilter!
  ) {
    deleteAtom(filter: $filter) {
      numUids
    }
    deleteInterface(filter: $interfaceFilter) {
      numUids
    }
    deleteField(filter: $fieldFilter) {
      numUids
    }
  }
`
export type DeleteAtomAndInterfaceMutationFn = Apollo.MutationFunction<
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables
>

/**
 * __useDeleteAtomAndInterfaceMutation__
 *
 * To run a mutation, you first call `useDeleteAtomAndInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAtomAndInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAtomAndInterfaceMutation, { data, loading, error }] = useDeleteAtomAndInterfaceMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      interfaceFilter: // value for 'interfaceFilter'
 *      fieldFilter: // value for 'fieldFilter'
 *   },
 * });
 */
export function useDeleteAtomAndInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAtomAndInterfaceMutation,
    DeleteAtomAndInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteAtomAndInterfaceMutation,
    DeleteAtomAndInterfaceMutationVariables
  >(DeleteAtomAndInterfaceGql, options)
}
export type DeleteAtomAndInterfaceMutationHookResult = ReturnType<
  typeof useDeleteAtomAndInterfaceMutation
>
export type DeleteAtomAndInterfaceMutationResult =
  Apollo.MutationResult<DeleteAtomAndInterfaceMutation>
export type DeleteAtomAndInterfaceMutationOptions = Apollo.BaseMutationOptions<
  DeleteAtomAndInterfaceMutation,
  DeleteAtomAndInterfaceMutationVariables
>
export const GetAtomByElementGql = gql`
  query GetAtomByElement($elementId: ID!) {
    getElement(id: $elementId) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__AtomFragmentDoc}
`

/**
 * __useGetAtomByElementQuery__
 *
 * To run a query within a React component, call `useGetAtomByElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomByElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomByElementQuery({
 *   variables: {
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useGetAtomByElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAtomByElementQuery,
    GetAtomByElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomByElementQuery, GetAtomByElementQueryVariables>(
    GetAtomByElementGql,
    options,
  )
}
export function useGetAtomByElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomByElementQuery,
    GetAtomByElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAtomByElementQuery,
    GetAtomByElementQueryVariables
  >(GetAtomByElementGql, options)
}
export type GetAtomByElementQueryHookResult = ReturnType<
  typeof useGetAtomByElementQuery
>
export type GetAtomByElementLazyQueryHookResult = ReturnType<
  typeof useGetAtomByElementLazyQuery
>
export type GetAtomByElementQueryResult = Apollo.QueryResult<
  GetAtomByElementQuery,
  GetAtomByElementQueryVariables
>
export function refetchGetAtomByElementQuery(
  variables?: GetAtomByElementQueryVariables,
) {
  return { query: GetAtomByElementGql, variables: variables }
}
export const GetAtomGql = gql`
  query GetAtom($id: ID!) {
    atom: getAtom(id: $id) {
      ...DGraph__Atom
    }
  }
  ${DGraph__AtomFragmentDoc}
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
 *      id: // value for 'id'
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
  query GetAtoms($filter: AtomFilter) {
    atoms: queryAtom(filter: $filter) {
      ...DGraph__Atom
    }
  }
  ${DGraph__AtomFragmentDoc}
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
 *      filter: // value for 'filter'
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
    updateAtom(input: $input) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__AtomFragmentDoc}
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
  mutation CreateComponent($input: [AddComponentInput!]!) {
    components: addComponent(input: $input) {
      component {
        id
        label
      }
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
  mutation DeleteComponent($filter: ComponentFilter!) {
    deleteComponent(filter: $filter) {
      numUids
      msg
    }
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
 *      filter: // value for 'filter'
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
export const GetComponentDetailGql = gql`
  query GetComponentDetail($componentId: ID!) {
    component: getComponent(id: $componentId) {
      ...__Component
    }
  }
  ${__ComponentFragmentDoc}
`

/**
 * __useGetComponentDetailQuery__
 *
 * To run a query within a React component, call `useGetComponentDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentDetailQuery({
 *   variables: {
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useGetComponentDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >(GetComponentDetailGql, options)
}
export function useGetComponentDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >(GetComponentDetailGql, options)
}
export type GetComponentDetailQueryHookResult = ReturnType<
  typeof useGetComponentDetailQuery
>
export type GetComponentDetailLazyQueryHookResult = ReturnType<
  typeof useGetComponentDetailLazyQuery
>
export type GetComponentDetailQueryResult = Apollo.QueryResult<
  GetComponentDetailQuery,
  GetComponentDetailQueryVariables
>
export function refetchGetComponentDetailQuery(
  variables?: GetComponentDetailQueryVariables,
) {
  return { query: GetComponentDetailGql, variables: variables }
}
export const GetComponentsGql = gql`
  query GetComponents($filter: ComponentFilter) {
    components: queryComponent(filter: $filter) {
      id
      label
    }
  }
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
 *      filter: // value for 'filter'
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
export const DeleteElementGql = gql`
  mutation DeleteElement($filter: ElementFilter!, $propsFilter: PropFilter!) {
    deleteElement(filter: $filter) {
      numUids
    }
    deleteProp(filter: $propsFilter) {
      numUids
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
 *      filter: // value for 'filter'
 *      propsFilter: // value for 'propsFilter'
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
export const GetElementOwnerGql = gql`
  query GetElementOwner($elementId: ID!) {
    getElement(id: $elementId) {
      ownedBy {
        __typename
        ... on Page {
          app {
            ownerId
          }
          ...Dgraph__Page
        }
      }
      ...Dgraph_Element
    }
  }
  ${Dgraph__PageFragmentDoc}
  ${Dgraph_ElementFragmentDoc}
`

/**
 * __useGetElementOwnerQuery__
 *
 * To run a query within a React component, call `useGetElementOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementOwnerQuery({
 *   variables: {
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useGetElementOwnerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementOwnerQuery,
    GetElementOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementOwnerQuery, GetElementOwnerQueryVariables>(
    GetElementOwnerGql,
    options,
  )
}
export function useGetElementOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementOwnerQuery,
    GetElementOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetElementOwnerQuery,
    GetElementOwnerQueryVariables
  >(GetElementOwnerGql, options)
}
export type GetElementOwnerQueryHookResult = ReturnType<
  typeof useGetElementOwnerQuery
>
export type GetElementOwnerLazyQueryHookResult = ReturnType<
  typeof useGetElementOwnerLazyQuery
>
export type GetElementOwnerQueryResult = Apollo.QueryResult<
  GetElementOwnerQuery,
  GetElementOwnerQueryVariables
>
export function refetchGetElementOwnerQuery(
  variables?: GetElementOwnerQueryVariables,
) {
  return { query: GetElementOwnerGql, variables: variables }
}
export const GetElementParentGql = gql`
  query GetElementParent($elementId: ID!) {
    getElement(id: $elementId) {
      parent {
        ...Dgraph_Element
      }
    }
  }
  ${Dgraph_ElementFragmentDoc}
`

/**
 * __useGetElementParentQuery__
 *
 * To run a query within a React component, call `useGetElementParentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementParentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementParentQuery({
 *   variables: {
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useGetElementParentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementParentQuery,
    GetElementParentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementParentQuery, GetElementParentQueryVariables>(
    GetElementParentGql,
    options,
  )
}
export function useGetElementParentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementParentQuery,
    GetElementParentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetElementParentQuery,
    GetElementParentQueryVariables
  >(GetElementParentGql, options)
}
export type GetElementParentQueryHookResult = ReturnType<
  typeof useGetElementParentQuery
>
export type GetElementParentLazyQueryHookResult = ReturnType<
  typeof useGetElementParentLazyQuery
>
export type GetElementParentQueryResult = Apollo.QueryResult<
  GetElementParentQuery,
  GetElementParentQueryVariables
>
export function refetchGetElementParentQuery(
  variables?: GetElementParentQueryVariables,
) {
  return { query: GetElementParentGql, variables: variables }
}
export const GetElementGql = gql`
  query GetElement($id: ID!) {
    getElement(id: $id) {
      ...Dgraph_Element
    }
  }
  ${Dgraph_ElementFragmentDoc}
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
 *      id: // value for 'id'
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
export const UpdateElementGql = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      numUids
      element {
        ...Dgraph_Element
      }
    }
  }
  ${Dgraph_ElementFragmentDoc}
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
export const CreateLibraryGql = gql`
  mutation CreateLibrary($input: [AddLibraryInput!]!) {
    libraries: addLibrary(input: $input) {
      library {
        ...__Library
      }
    }
  }
  ${__LibraryFragmentDoc}
`
export type CreateLibraryMutationFn = Apollo.MutationFunction<
  CreateLibraryMutation,
  CreateLibraryMutationVariables
>

/**
 * __useCreateLibraryMutation__
 *
 * To run a mutation, you first call `useCreateLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLibraryMutation, { data, loading, error }] = useCreateLibraryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLibraryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLibraryMutation,
    CreateLibraryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateLibraryMutation,
    CreateLibraryMutationVariables
  >(CreateLibraryGql, options)
}
export type CreateLibraryMutationHookResult = ReturnType<
  typeof useCreateLibraryMutation
>
export type CreateLibraryMutationResult =
  Apollo.MutationResult<CreateLibraryMutation>
export type CreateLibraryMutationOptions = Apollo.BaseMutationOptions<
  CreateLibraryMutation,
  CreateLibraryMutationVariables
>
export const LibraryExplorerGql = gql`
  query LibraryExplorer($filter: LibraryFilter) {
    libraries: queryLibrary(filter: $filter) {
      ...LibraryExplorer__Library
    }
  }
  ${LibraryExplorer__LibraryFragmentDoc}
`

/**
 * __useLibraryExplorerQuery__
 *
 * To run a query within a React component, call `useLibraryExplorerQuery` and pass it any options that fit your needs.
 * When your component renders, `useLibraryExplorerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLibraryExplorerQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLibraryExplorerQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LibraryExplorerQuery, LibraryExplorerQueryVariables>(
    LibraryExplorerGql,
    options,
  )
}
export function useLibraryExplorerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >(LibraryExplorerGql, options)
}
export type LibraryExplorerQueryHookResult = ReturnType<
  typeof useLibraryExplorerQuery
>
export type LibraryExplorerLazyQueryHookResult = ReturnType<
  typeof useLibraryExplorerLazyQuery
>
export type LibraryExplorerQueryResult = Apollo.QueryResult<
  LibraryExplorerQuery,
  LibraryExplorerQueryVariables
>
export function refetchLibraryExplorerQuery(
  variables?: LibraryExplorerQueryVariables,
) {
  return { query: LibraryExplorerGql, variables: variables }
}
export const CreatePageGql = gql`
  mutation CreatePage($input: [AddPageInput!]!) {
    addPage(input: $input) {
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__PageFragmentDoc}
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
  mutation DeletePage(
    $filter: PageFilter!
    $elementFilter: ElementFilter!
    $propsFilter: PropFilter!
  ) {
    deletePage(filter: $filter) {
      numUids
    }
    deleteElement(filter: $elementFilter) {
      numUids
    }
    deleteProp(filter: $propsFilter) {
      numUids
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
 *      filter: // value for 'filter'
 *      elementFilter: // value for 'elementFilter'
 *      propsFilter: // value for 'propsFilter'
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
export const GetPageOwnerGql = gql`
  query GetPageOwner($pageId: ID!) {
    getPage(id: $pageId) {
      app {
        ownerId
      }
    }
  }
`

/**
 * __useGetPageOwnerQuery__
 *
 * To run a query within a React component, call `useGetPageOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageOwnerQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetPageOwnerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageOwnerQuery,
    GetPageOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageOwnerQuery, GetPageOwnerQueryVariables>(
    GetPageOwnerGql,
    options,
  )
}
export function useGetPageOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageOwnerQuery,
    GetPageOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageOwnerQuery, GetPageOwnerQueryVariables>(
    GetPageOwnerGql,
    options,
  )
}
export type GetPageOwnerQueryHookResult = ReturnType<
  typeof useGetPageOwnerQuery
>
export type GetPageOwnerLazyQueryHookResult = ReturnType<
  typeof useGetPageOwnerLazyQuery
>
export type GetPageOwnerQueryResult = Apollo.QueryResult<
  GetPageOwnerQuery,
  GetPageOwnerQueryVariables
>
export function refetchGetPageOwnerQuery(
  variables?: GetPageOwnerQueryVariables,
) {
  return { query: GetPageOwnerGql, variables: variables }
}
export const GetPageGql = gql`
  query GetPage($pageId: ID!) {
    getPage(id: $pageId) {
      ...Dgraph__Page
    }
  }
  ${Dgraph__PageFragmentDoc}
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
 *      pageId: // value for 'pageId'
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
  query GetPages(
    $appId: ID!
    $filter: PageFilter
    $order: PageOrder
    $first: Int
    $offset: Int
  ) {
    getApp(id: $appId) {
      pages(filter: $filter, first: $first, offset: $offset, order: $order) {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__PageFragmentDoc}
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
 *      appId: // value for 'appId'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
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
      numUids
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__PageFragmentDoc}
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
export const GetArrayValuesGql = gql`
  query GetArrayValues($arrayValueId: ID!) {
    getArrayValue(id: $arrayValueId) {
      ...DgraphArrayValue
    }
  }
  ${DgraphArrayValueFragmentDoc}
`

/**
 * __useGetArrayValuesQuery__
 *
 * To run a query within a React component, call `useGetArrayValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArrayValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArrayValuesQuery({
 *   variables: {
 *      arrayValueId: // value for 'arrayValueId'
 *   },
 * });
 */
export function useGetArrayValuesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArrayValuesQuery,
    GetArrayValuesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetArrayValuesQuery, GetArrayValuesQueryVariables>(
    GetArrayValuesGql,
    options,
  )
}
export function useGetArrayValuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArrayValuesQuery,
    GetArrayValuesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetArrayValuesQuery, GetArrayValuesQueryVariables>(
    GetArrayValuesGql,
    options,
  )
}
export type GetArrayValuesQueryHookResult = ReturnType<
  typeof useGetArrayValuesQuery
>
export type GetArrayValuesLazyQueryHookResult = ReturnType<
  typeof useGetArrayValuesLazyQuery
>
export type GetArrayValuesQueryResult = Apollo.QueryResult<
  GetArrayValuesQuery,
  GetArrayValuesQueryVariables
>
export function refetchGetArrayValuesQuery(
  variables?: GetArrayValuesQueryVariables,
) {
  return { query: GetArrayValuesGql, variables: variables }
}
export const CreateFieldGql = gql`
  mutation CreateField($input: [AddFieldInput!]!) {
    addField(input: $input) {
      field {
        ...Dgraph__Field
      }
    }
  }
  ${Dgraph__FieldFragmentDoc}
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
  mutation DeleteField($filter: FieldFilter!) {
    deleteField(filter: $filter) {
      numUids
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
 *      filter: // value for 'filter'
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
export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      field {
        ...Dgraph__Field
      }
      numUids
    }
  }
  ${Dgraph__FieldFragmentDoc}
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
export const CreateInterfaceGql = gql`
  mutation CreateInterface($input: [AddInterfaceInput!]!) {
    addInterface(input: $input) {
      interface {
        ...Dgraph__Interface
      }
    }
  }
  ${Dgraph__InterfaceFragmentDoc}
`
export type CreateInterfaceMutationFn = Apollo.MutationFunction<
  CreateInterfaceMutation,
  CreateInterfaceMutationVariables
>

/**
 * __useCreateInterfaceMutation__
 *
 * To run a mutation, you first call `useCreateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInterfaceMutation, { data, loading, error }] = useCreateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInterfaceMutation,
    CreateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateInterfaceMutation,
    CreateInterfaceMutationVariables
  >(CreateInterfaceGql, options)
}
export type CreateInterfaceMutationHookResult = ReturnType<
  typeof useCreateInterfaceMutation
>
export type CreateInterfaceMutationResult =
  Apollo.MutationResult<CreateInterfaceMutation>
export type CreateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  CreateInterfaceMutation,
  CreateInterfaceMutationVariables
>
export const GetInterfaceWithAtomGql = gql`
  query GetInterfaceWithAtom($interfaceId: ID!) {
    getInterface(id: $interfaceId) {
      ...Dgraph__InterfaceWithAtom
    }
  }
  ${Dgraph__InterfaceWithAtomFragmentDoc}
`

/**
 * __useGetInterfaceWithAtomQuery__
 *
 * To run a query within a React component, call `useGetInterfaceWithAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterfaceWithAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterfaceWithAtomQuery({
 *   variables: {
 *      interfaceId: // value for 'interfaceId'
 *   },
 * });
 */
export function useGetInterfaceWithAtomQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInterfaceWithAtomQuery,
    GetInterfaceWithAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetInterfaceWithAtomQuery,
    GetInterfaceWithAtomQueryVariables
  >(GetInterfaceWithAtomGql, options)
}
export function useGetInterfaceWithAtomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInterfaceWithAtomQuery,
    GetInterfaceWithAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetInterfaceWithAtomQuery,
    GetInterfaceWithAtomQueryVariables
  >(GetInterfaceWithAtomGql, options)
}
export type GetInterfaceWithAtomQueryHookResult = ReturnType<
  typeof useGetInterfaceWithAtomQuery
>
export type GetInterfaceWithAtomLazyQueryHookResult = ReturnType<
  typeof useGetInterfaceWithAtomLazyQuery
>
export type GetInterfaceWithAtomQueryResult = Apollo.QueryResult<
  GetInterfaceWithAtomQuery,
  GetInterfaceWithAtomQueryVariables
>
export function refetchGetInterfaceWithAtomQuery(
  variables?: GetInterfaceWithAtomQueryVariables,
) {
  return { query: GetInterfaceWithAtomGql, variables: variables }
}
export const GetInterfaceGql = gql`
  query GetInterface($interfaceId: ID!) {
    getInterface(id: $interfaceId) {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__InterfaceWithoutFieldsFragmentDoc}
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
 *      interfaceId: // value for 'interfaceId'
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
export const GetInterfacesGql = gql`
  query GetInterfaces(
    $filter: InterfaceFilter
    $order: InterfaceOrder
    $first: Int
    $offset: Int
  ) {
    queryInterface(
      filter: $filter
      order: $order
      first: $first
      offset: $offset
    ) {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__InterfaceWithoutFieldsFragmentDoc}
`

/**
 * __useGetInterfacesQuery__
 *
 * To run a query within a React component, call `useGetInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterfacesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetInterfacesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInterfacesQuery,
    GetInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetInterfacesQuery, GetInterfacesQueryVariables>(
    GetInterfacesGql,
    options,
  )
}
export function useGetInterfacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInterfacesQuery,
    GetInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetInterfacesQuery, GetInterfacesQueryVariables>(
    GetInterfacesGql,
    options,
  )
}
export type GetInterfacesQueryHookResult = ReturnType<
  typeof useGetInterfacesQuery
>
export type GetInterfacesLazyQueryHookResult = ReturnType<
  typeof useGetInterfacesLazyQuery
>
export type GetInterfacesQueryResult = Apollo.QueryResult<
  GetInterfacesQuery,
  GetInterfacesQueryVariables
>
export function refetchGetInterfacesQuery(
  variables?: GetInterfacesQueryVariables,
) {
  return { query: GetInterfacesGql, variables: variables }
}
export const UpdateInterfaceGql = gql`
  mutation UpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      numUids
    }
  }
`
export type UpdateInterfaceMutationFn = Apollo.MutationFunction<
  UpdateInterfaceMutation,
  UpdateInterfaceMutationVariables
>

/**
 * __useUpdateInterfaceMutation__
 *
 * To run a mutation, you first call `useUpdateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInterfaceMutation, { data, loading, error }] = useUpdateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateInterfaceMutation,
    UpdateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateInterfaceMutation,
    UpdateInterfaceMutationVariables
  >(UpdateInterfaceGql, options)
}
export type UpdateInterfaceMutationHookResult = ReturnType<
  typeof useUpdateInterfaceMutation
>
export type UpdateInterfaceMutationResult =
  Apollo.MutationResult<UpdateInterfaceMutation>
export type UpdateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  UpdateInterfaceMutation,
  UpdateInterfaceMutationVariables
>
export const CreateArrayTypeGql = gql`
  mutation CreateArrayType($input: [AddArrayTypeInput!]!) {
    addArrayType(input: $input) {
      arrayType {
        id
      }
    }
  }
`
export type CreateArrayTypeMutationFn = Apollo.MutationFunction<
  CreateArrayTypeMutation,
  CreateArrayTypeMutationVariables
>

/**
 * __useCreateArrayTypeMutation__
 *
 * To run a mutation, you first call `useCreateArrayTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArrayTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArrayTypeMutation, { data, loading, error }] = useCreateArrayTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArrayTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateArrayTypeMutation,
    CreateArrayTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateArrayTypeMutation,
    CreateArrayTypeMutationVariables
  >(CreateArrayTypeGql, options)
}
export type CreateArrayTypeMutationHookResult = ReturnType<
  typeof useCreateArrayTypeMutation
>
export type CreateArrayTypeMutationResult =
  Apollo.MutationResult<CreateArrayTypeMutation>
export type CreateArrayTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateArrayTypeMutation,
  CreateArrayTypeMutationVariables
>
export const CreatePrimitiveTypeGql = gql`
  mutation CreatePrimitiveType($input: [AddPrimitiveTypeInput!]!) {
    addPrimitiveType(input: $input) {
      primitiveType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__TypeFragmentDoc}
`
export type CreatePrimitiveTypeMutationFn = Apollo.MutationFunction<
  CreatePrimitiveTypeMutation,
  CreatePrimitiveTypeMutationVariables
>

/**
 * __useCreatePrimitiveTypeMutation__
 *
 * To run a mutation, you first call `useCreatePrimitiveTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrimitiveTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrimitiveTypeMutation, { data, loading, error }] = useCreatePrimitiveTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePrimitiveTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePrimitiveTypeMutation,
    CreatePrimitiveTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePrimitiveTypeMutation,
    CreatePrimitiveTypeMutationVariables
  >(CreatePrimitiveTypeGql, options)
}
export type CreatePrimitiveTypeMutationHookResult = ReturnType<
  typeof useCreatePrimitiveTypeMutation
>
export type CreatePrimitiveTypeMutationResult =
  Apollo.MutationResult<CreatePrimitiveTypeMutation>
export type CreatePrimitiveTypeMutationOptions = Apollo.BaseMutationOptions<
  CreatePrimitiveTypeMutation,
  CreatePrimitiveTypeMutationVariables
>
export const CreateEnumTypeGql = gql`
  mutation CreateEnumType($input: [AddEnumTypeInput!]!) {
    addEnumType(input: $input) {
      enumType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__TypeFragmentDoc}
`
export type CreateEnumTypeMutationFn = Apollo.MutationFunction<
  CreateEnumTypeMutation,
  CreateEnumTypeMutationVariables
>

/**
 * __useCreateEnumTypeMutation__
 *
 * To run a mutation, you first call `useCreateEnumTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnumTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnumTypeMutation, { data, loading, error }] = useCreateEnumTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEnumTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEnumTypeMutation,
    CreateEnumTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateEnumTypeMutation,
    CreateEnumTypeMutationVariables
  >(CreateEnumTypeGql, options)
}
export type CreateEnumTypeMutationHookResult = ReturnType<
  typeof useCreateEnumTypeMutation
>
export type CreateEnumTypeMutationResult =
  Apollo.MutationResult<CreateEnumTypeMutation>
export type CreateEnumTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateEnumTypeMutation,
  CreateEnumTypeMutationVariables
>
export const DeleteTypeGql = gql`
  mutation DeleteType($filter: TypeFilter!, $fieldFilter: FieldFilter!) {
    deleteType(filter: $filter) {
      numUids
    }
    deleteField(filter: $fieldFilter) {
      numUids
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
 *      filter: // value for 'filter'
 *      fieldFilter: // value for 'fieldFilter'
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
export const GetFieldsByTypeGql = gql`
  query GetFieldsByType($typeId: ID!) {
    queryField {
      id
      name
      type(filter: { id: [$typeId] }) {
        id
      }
    }
  }
`

/**
 * __useGetFieldsByTypeQuery__
 *
 * To run a query within a React component, call `useGetFieldsByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFieldsByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFieldsByTypeQuery({
 *   variables: {
 *      typeId: // value for 'typeId'
 *   },
 * });
 */
export function useGetFieldsByTypeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFieldsByTypeQuery,
    GetFieldsByTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFieldsByTypeQuery, GetFieldsByTypeQueryVariables>(
    GetFieldsByTypeGql,
    options,
  )
}
export function useGetFieldsByTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFieldsByTypeQuery,
    GetFieldsByTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetFieldsByTypeQuery,
    GetFieldsByTypeQueryVariables
  >(GetFieldsByTypeGql, options)
}
export type GetFieldsByTypeQueryHookResult = ReturnType<
  typeof useGetFieldsByTypeQuery
>
export type GetFieldsByTypeLazyQueryHookResult = ReturnType<
  typeof useGetFieldsByTypeLazyQuery
>
export type GetFieldsByTypeQueryResult = Apollo.QueryResult<
  GetFieldsByTypeQuery,
  GetFieldsByTypeQueryVariables
>
export function refetchGetFieldsByTypeQuery(
  variables?: GetFieldsByTypeQueryVariables,
) {
  return { query: GetFieldsByTypeGql, variables: variables }
}
export const UpdateEnumTypeGql = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      enumType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__TypeFragmentDoc}
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
export const UpdatePrimitiveTypeGql = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      primitiveType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__TypeFragmentDoc}
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
export const UpdateTypeGql = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      type {
        id
        name
      }
    }
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
export const __Component = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const Dgraph__InterfaceWithoutFields = gql`
  fragment Dgraph__InterfaceWithoutFields on Interface {
    id
    name
  }
`
export const DgrapEnumTypeValue = gql`
  fragment DgrapEnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const Dgraph__Type = gql`
  fragment Dgraph__Type on Type {
    id
    name
    ... on ArrayType {
      type {
        id
        name
        ... on EnumType {
          allowedValues {
            id
            name
          }
        }
        ... on PrimitiveType {
          primitiveKind
        }
      }
    }
    ... on EnumType {
      allowedValues {
        ...DgrapEnumTypeValue
      }
    }
    ... on PrimitiveType {
      primitiveKind
    }
  }
  ${DgrapEnumTypeValue}
`
export const Dgraph__Field = gql`
  fragment Dgraph__Field on Field {
    id
    key
    name
    description
    type {
      ...Dgraph__Type
    }
    interface {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__Type}
  ${Dgraph__InterfaceWithoutFields}
`
export const Dgraph__Interface = gql`
  fragment Dgraph__Interface on Interface {
    ...Dgraph__InterfaceWithoutFields
    fields {
      ...Dgraph__Field
    }
  }
  ${Dgraph__InterfaceWithoutFields}
  ${Dgraph__Field}
`
export const DGraph__Atom = gql`
  fragment DGraph__Atom on Atom {
    id
    label
    type
    propTypes {
      ...Dgraph__Interface
    }
  }
  ${Dgraph__Interface}
`
export const Dgraph__App = gql`
  fragment Dgraph__App on App {
    id
    name
    ownerId
  }
`
export const Dgraph__Page = gql`
  fragment Dgraph__Page on Page {
    id
    name
    app {
      ...Dgraph__App
    }
  }
  ${Dgraph__App}
`
export const Dgraph_Element = gql`
  fragment Dgraph_Element on Element {
    id
    name
    css
    atom {
      ...DGraph__Atom
    }
    parent {
      id
    }
    ownedBy {
      __typename
      ... on Page {
        ...Dgraph__Page
      }
    }
  }
  ${DGraph__Atom}
  ${Dgraph__Page}
`
export const __Library = gql`
  fragment __Library on Library {
    id
    name
  }
`
export const LibraryExplorer__Atom = gql`
  fragment LibraryExplorer__Atom on Atom {
    id
    label
    type
  }
`
export const LibraryExplorer__Component = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
`
export const LibraryExplorer__Library = gql`
  fragment LibraryExplorer__Library on Library {
    id
    name
    atoms {
      ...LibraryExplorer__Atom
    }
    components {
      ...LibraryExplorer__Component
    }
  }
  ${LibraryExplorer__Atom}
  ${LibraryExplorer__Component}
`
export const DgraphBooleanValue = gql`
  fragment DgraphBooleanValue on BooleanValue {
    id
    booleanValue
  }
`
export const DgraphFloatValue = gql`
  fragment DgraphFloatValue on FloatValue {
    id
    floatValue
  }
`
export const DgraphIntValue = gql`
  fragment DgraphIntValue on IntValue {
    id
    intValue
  }
`
export const DgraphStringValue = gql`
  fragment DgraphStringValue on StringValue {
    id
    stringValue
  }
`
export const DgraphArrayInnerValue = gql`
  fragment DgraphArrayInnerValue on PropValue {
    __typename
    ... on ArrayValue {
      id
    }
    ... on BooleanValue {
      ...DgraphBooleanValue
    }
    ... on FloatValue {
      ...DgraphFloatValue
    }
    ... on InterfaceValue {
      id
    }
    ... on IntValue {
      ...DgraphIntValue
    }
    ... on StringValue {
      ...DgraphStringValue
    }
  }
  ${DgraphBooleanValue}
  ${DgraphFloatValue}
  ${DgraphIntValue}
  ${DgraphStringValue}
`
export const DgraphArrayValue = gql`
  fragment DgraphArrayValue on ArrayValue {
    id
    values {
      ...DgraphArrayInnerValue
    }
  }
  ${DgraphArrayInnerValue}
`
export const DgraphInterfaceValue = gql`
  fragment DgraphInterfaceValue on InterfaceValue {
    id
    props {
      id
    }
  }
`
export const DgraphPropValue = gql`
  fragment DgraphPropValue on PropValue {
    __typename
    ... on ArrayValue {
      ...DgraphArrayValue
    }
    ... on BooleanValue {
      ...DgraphBooleanValue
    }
    ... on FloatValue {
      ...DgraphFloatValue
    }
    ... on InterfaceValue {
      ...DgraphInterfaceValue
    }
    ... on IntValue {
      ...DgraphIntValue
    }
    ... on StringValue {
      ...DgraphStringValue
    }
    ... on EnumTypeValue {
      ...DgrapEnumTypeValue
    }
  }
  ${DgraphArrayValue}
  ${DgraphBooleanValue}
  ${DgraphFloatValue}
  ${DgraphInterfaceValue}
  ${DgraphIntValue}
  ${DgraphStringValue}
  ${DgrapEnumTypeValue}
`
export const DgraphProp = gql`
  fragment DgraphProp on Prop {
    id
    field {
      ...Dgraph__Field
    }
    value {
      ...DgraphPropValue
    }
  }
  ${Dgraph__Field}
  ${DgraphPropValue}
`
export const DgraphEnumTypeValue = gql`
  fragment DgraphEnumTypeValue on StringValue {
    id
    stringValue
  }
`
export const Dgraph__InterfaceWithAtom = gql`
  fragment Dgraph__InterfaceWithAtom on Interface {
    ...Dgraph__InterfaceWithoutFields
    atom {
      ...DGraph__Atom
    }
  }
  ${Dgraph__InterfaceWithoutFields}
  ${DGraph__Atom}
`
export const DeleteUserApps = gql`
  mutation DeleteUserApps($userId: String!) {
    deleteApp(filter: { ownerId: { eq: $userId } }) {
      numUids
    }
  }
`
export const CreateApp = gql`
  mutation CreateApp($input: [AddAppInput!]!) {
    addApp(input: $input) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__App}
`
export const DeleteApp = gql`
  mutation DeleteApp($filter: AppFilter!) {
    deleteApp(filter: $filter) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__App}
`
export const GetApp = gql`
  query GetApp($id: ID!) {
    app: getApp(id: $id) {
      ...Dgraph__App
    }
  }
  ${Dgraph__App}
`
export const GetApps = gql`
  query GetApps(
    $filter: AppFilter
    $order: AppOrder
    $first: Int
    $offset: Int
  ) {
    apps: queryApp(
      filter: $filter
      order: $order
      first: $first
      offset: $offset
    ) {
      ...Dgraph__App
    }
  }
  ${Dgraph__App}
`
export const UpdateApp = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      app {
        ...Dgraph__App
      }
    }
  }
  ${Dgraph__App}
`
export const CreateAtom = gql`
  mutation CreateAtom($input: [AddAtomInput!]!) {
    addAtom(input: $input) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__Atom}
`
export const DeleteAtomAndInterface = gql`
  mutation DeleteAtomAndInterface(
    $filter: AtomFilter!
    $interfaceFilter: InterfaceFilter!
    $fieldFilter: FieldFilter!
  ) {
    deleteAtom(filter: $filter) {
      numUids
    }
    deleteInterface(filter: $interfaceFilter) {
      numUids
    }
    deleteField(filter: $fieldFilter) {
      numUids
    }
  }
`
export const GetAtomByElement = gql`
  query GetAtomByElement($elementId: ID!) {
    getElement(id: $elementId) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__Atom}
`
export const GetAtom = gql`
  query GetAtom($id: ID!) {
    atom: getAtom(id: $id) {
      ...DGraph__Atom
    }
  }
  ${DGraph__Atom}
`
export const GetAtoms = gql`
  query GetAtoms($filter: AtomFilter) {
    atoms: queryAtom(filter: $filter) {
      ...DGraph__Atom
    }
  }
  ${DGraph__Atom}
`
export const UpdateAtom = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__Atom}
`
export const CreateComponent = gql`
  mutation CreateComponent($input: [AddComponentInput!]!) {
    components: addComponent(input: $input) {
      component {
        id
        label
      }
    }
  }
`
export const DeleteComponent = gql`
  mutation DeleteComponent($filter: ComponentFilter!) {
    deleteComponent(filter: $filter) {
      numUids
      msg
    }
  }
`
export const GetComponentDetail = gql`
  query GetComponentDetail($componentId: ID!) {
    component: getComponent(id: $componentId) {
      ...__Component
    }
  }
  ${__Component}
`
export const GetComponents = gql`
  query GetComponents($filter: ComponentFilter) {
    components: queryComponent(filter: $filter) {
      id
      label
    }
  }
`
export const DeleteElement = gql`
  mutation DeleteElement($filter: ElementFilter!, $propsFilter: PropFilter!) {
    deleteElement(filter: $filter) {
      numUids
    }
    deleteProp(filter: $propsFilter) {
      numUids
    }
  }
`
export const GetElementOwner = gql`
  query GetElementOwner($elementId: ID!) {
    getElement(id: $elementId) {
      ownedBy {
        __typename
        ... on Page {
          app {
            ownerId
          }
          ...Dgraph__Page
        }
      }
      ...Dgraph_Element
    }
  }
  ${Dgraph__Page}
  ${Dgraph_Element}
`
export const GetElementParent = gql`
  query GetElementParent($elementId: ID!) {
    getElement(id: $elementId) {
      parent {
        ...Dgraph_Element
      }
    }
  }
  ${Dgraph_Element}
`
export const GetElement = gql`
  query GetElement($id: ID!) {
    getElement(id: $id) {
      ...Dgraph_Element
    }
  }
  ${Dgraph_Element}
`
export const UpdateElement = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      numUids
      element {
        ...Dgraph_Element
      }
    }
  }
  ${Dgraph_Element}
`
export const CreateLibrary = gql`
  mutation CreateLibrary($input: [AddLibraryInput!]!) {
    libraries: addLibrary(input: $input) {
      library {
        ...__Library
      }
    }
  }
  ${__Library}
`
export const LibraryExplorer = gql`
  query LibraryExplorer($filter: LibraryFilter) {
    libraries: queryLibrary(filter: $filter) {
      ...LibraryExplorer__Library
    }
  }
  ${LibraryExplorer__Library}
`
export const CreatePage = gql`
  mutation CreatePage($input: [AddPageInput!]!) {
    addPage(input: $input) {
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__Page}
`
export const DeletePage = gql`
  mutation DeletePage(
    $filter: PageFilter!
    $elementFilter: ElementFilter!
    $propsFilter: PropFilter!
  ) {
    deletePage(filter: $filter) {
      numUids
    }
    deleteElement(filter: $elementFilter) {
      numUids
    }
    deleteProp(filter: $propsFilter) {
      numUids
    }
  }
`
export const GetPageOwner = gql`
  query GetPageOwner($pageId: ID!) {
    getPage(id: $pageId) {
      app {
        ownerId
      }
    }
  }
`
export const GetPage = gql`
  query GetPage($pageId: ID!) {
    getPage(id: $pageId) {
      ...Dgraph__Page
    }
  }
  ${Dgraph__Page}
`
export const GetPages = gql`
  query GetPages(
    $appId: ID!
    $filter: PageFilter
    $order: PageOrder
    $first: Int
    $offset: Int
  ) {
    getApp(id: $appId) {
      pages(filter: $filter, first: $first, offset: $offset, order: $order) {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__Page}
`
export const UpdatePage = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      numUids
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__Page}
`
export const GetArrayValues = gql`
  query GetArrayValues($arrayValueId: ID!) {
    getArrayValue(id: $arrayValueId) {
      ...DgraphArrayValue
    }
  }
  ${DgraphArrayValue}
`
export const CreateField = gql`
  mutation CreateField($input: [AddFieldInput!]!) {
    addField(input: $input) {
      field {
        ...Dgraph__Field
      }
    }
  }
  ${Dgraph__Field}
`
export const DeleteField = gql`
  mutation DeleteField($filter: FieldFilter!) {
    deleteField(filter: $filter) {
      numUids
    }
  }
`
export const UpdateField = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      field {
        ...Dgraph__Field
      }
      numUids
    }
  }
  ${Dgraph__Field}
`
export const CreateInterface = gql`
  mutation CreateInterface($input: [AddInterfaceInput!]!) {
    addInterface(input: $input) {
      interface {
        ...Dgraph__Interface
      }
    }
  }
  ${Dgraph__Interface}
`
export const GetInterfaceWithAtom = gql`
  query GetInterfaceWithAtom($interfaceId: ID!) {
    getInterface(id: $interfaceId) {
      ...Dgraph__InterfaceWithAtom
    }
  }
  ${Dgraph__InterfaceWithAtom}
`
export const GetInterface = gql`
  query GetInterface($interfaceId: ID!) {
    getInterface(id: $interfaceId) {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__InterfaceWithoutFields}
`
export const GetInterfaces = gql`
  query GetInterfaces(
    $filter: InterfaceFilter
    $order: InterfaceOrder
    $first: Int
    $offset: Int
  ) {
    queryInterface(
      filter: $filter
      order: $order
      first: $first
      offset: $offset
    ) {
      ...Dgraph__InterfaceWithoutFields
    }
  }
  ${Dgraph__InterfaceWithoutFields}
`
export const UpdateInterface = gql`
  mutation UpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      numUids
    }
  }
`
export const CreateArrayType = gql`
  mutation CreateArrayType($input: [AddArrayTypeInput!]!) {
    addArrayType(input: $input) {
      arrayType {
        id
      }
    }
  }
`
export const CreatePrimitiveType = gql`
  mutation CreatePrimitiveType($input: [AddPrimitiveTypeInput!]!) {
    addPrimitiveType(input: $input) {
      primitiveType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__Type}
`
export const CreateEnumType = gql`
  mutation CreateEnumType($input: [AddEnumTypeInput!]!) {
    addEnumType(input: $input) {
      enumType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__Type}
`
export const DeleteType = gql`
  mutation DeleteType($filter: TypeFilter!, $fieldFilter: FieldFilter!) {
    deleteType(filter: $filter) {
      numUids
    }
    deleteField(filter: $fieldFilter) {
      numUids
    }
  }
`
export const GetFieldsByType = gql`
  query GetFieldsByType($typeId: ID!) {
    queryField {
      id
      name
      type(filter: { id: [$typeId] }) {
        id
      }
    }
  }
`
export const UpdateEnumType = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      enumType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__Type}
`
export const UpdatePrimitiveType = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      primitiveType {
        ...Dgraph__Type
      }
    }
  }
  ${Dgraph__Type}
`
export const UpdateType = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      type {
        id
        name
      }
    }
  }
`
