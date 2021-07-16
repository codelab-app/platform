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

export type AddAppDeprecatedInput = {
  ownerId: Scalars['String']
  pages?: Maybe<Array<Maybe<PageRef>>>
  name: Scalars['String']
}

export type AddAppDeprecatedPayload = {
  appDeprecated?: Maybe<Array<Maybe<AppDeprecated>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAppDeprecatedPayloadAppDeprecatedArgs = {
  filter?: Maybe<AppDeprecatedFilter>
  order?: Maybe<AppDeprecatedOrder>
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

export type AddAtomDeprecatedInput = {
  type: AtomType
  label: Scalars['String']
  library?: Maybe<LibraryRef>
  propTypes: InterfaceRef
}

export type AddAtomDeprecatedPayload = {
  atomDeprecated?: Maybe<Array<Maybe<AtomDeprecated>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAtomDeprecatedPayloadAtomDeprecatedArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
  order?: Maybe<AtomDeprecatedOrder>
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
  atom: AtomDeprecatedRef
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
  atom?: Maybe<AtomDeprecatedRef>
  ownedBy?: Maybe<ElementOwnerRef>
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
  atom?: Maybe<AtomDeprecatedRef>
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

export type AddLambdaInput = {
  ownerId: Scalars['String']
  name: Scalars['String']
  body: Scalars['String']
}

export type AddLambdaPayload = {
  lambda?: Maybe<Array<Maybe<Lambda>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddLambdaPayloadLambdaArgs = {
  filter?: Maybe<LambdaFilter>
  order?: Maybe<LambdaOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddLibraryInput = {
  ownerId: Scalars['String']
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<AtomDeprecatedRef>>>
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
  app: AppDeprecatedRef
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

export type AppDeprecated = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  pages?: Maybe<Array<Maybe<Page>>>
  name: Scalars['String']
  pagesAggregate?: Maybe<PageAggregateResult>
}

export type AppDeprecatedPagesArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppDeprecatedPagesAggregateArgs = {
  filter?: Maybe<PageFilter>
}

export type AppDeprecatedAggregateResult = {
  count?: Maybe<Scalars['Int']>
  ownerIdMin?: Maybe<Scalars['String']>
  ownerIdMax?: Maybe<Scalars['String']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type AppDeprecatedFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  ownerId?: Maybe<StringHashFilter>
  has?: Maybe<Array<Maybe<AppDeprecatedHasFilter>>>
  and?: Maybe<Array<Maybe<AppDeprecatedFilter>>>
  or?: Maybe<Array<Maybe<AppDeprecatedFilter>>>
  not?: Maybe<AppDeprecatedFilter>
}

export enum AppDeprecatedHasFilter {
  OwnerId = 'ownerId',
  Pages = 'pages',
  Name = 'name',
}

export type AppDeprecatedOrder = {
  asc?: Maybe<AppDeprecatedOrderable>
  desc?: Maybe<AppDeprecatedOrderable>
  then?: Maybe<AppDeprecatedOrder>
}

export enum AppDeprecatedOrderable {
  OwnerId = 'ownerId',
  Name = 'name',
}

export type AppDeprecatedPatch = {
  ownerId?: Maybe<Scalars['String']>
  pages?: Maybe<Array<Maybe<PageRef>>>
  name?: Maybe<Scalars['String']>
}

export type AppDeprecatedRef = {
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

export type AtomDeprecated = {
  id: Scalars['ID']
  type: AtomType
  label: Scalars['String']
  library?: Maybe<Library>
  propTypes: Interface
}

export type AtomDeprecatedLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type AtomDeprecatedPropTypesArgs = {
  filter?: Maybe<InterfaceFilter>
}

export type AtomDeprecatedAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type AtomDeprecatedFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<AtomDeprecatedHasFilter>>>
  and?: Maybe<Array<Maybe<AtomDeprecatedFilter>>>
  or?: Maybe<Array<Maybe<AtomDeprecatedFilter>>>
  not?: Maybe<AtomDeprecatedFilter>
}

export enum AtomDeprecatedHasFilter {
  Type = 'type',
  Label = 'label',
  Library = 'library',
  PropTypes = 'propTypes',
}

export type AtomDeprecatedOrder = {
  asc?: Maybe<AtomDeprecatedOrderable>
  desc?: Maybe<AtomDeprecatedOrderable>
  then?: Maybe<AtomDeprecatedOrder>
}

export enum AtomDeprecatedOrderable {
  Label = 'label',
}

export type AtomDeprecatedPatch = {
  type?: Maybe<AtomType>
  label?: Maybe<Scalars['String']>
  library?: Maybe<LibraryRef>
  propTypes?: Maybe<InterfaceRef>
}

export type AtomDeprecatedRef = {
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
  atom: AtomDeprecated
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
  filter?: Maybe<AtomDeprecatedFilter>
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
  atom?: Maybe<AtomDeprecatedRef>
  label?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type ComponentRef = {
  id?: Maybe<Scalars['ID']>
  library?: Maybe<LibraryRef>
  atom?: Maybe<AtomDeprecatedRef>
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

export type DeleteAppDeprecatedPayload = {
  appDeprecated?: Maybe<Array<Maybe<AppDeprecated>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAppDeprecatedPayloadAppDeprecatedArgs = {
  filter?: Maybe<AppDeprecatedFilter>
  order?: Maybe<AppDeprecatedOrder>
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

export type DeleteAtomDeprecatedPayload = {
  atomDeprecated?: Maybe<Array<Maybe<AtomDeprecated>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAtomDeprecatedPayloadAtomDeprecatedArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
  order?: Maybe<AtomDeprecatedOrder>
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

export type DeleteLambdaPayload = {
  lambda?: Maybe<Array<Maybe<Lambda>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteLambdaPayloadLambdaArgs = {
  filter?: Maybe<LambdaFilter>
  order?: Maybe<LambdaOrder>
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
  atom?: Maybe<AtomDeprecated>
  ownedBy?: Maybe<ElementOwner>
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
  filter?: Maybe<AtomDeprecatedFilter>
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
  atom?: Maybe<AtomDeprecatedRef>
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
  atom?: Maybe<AtomDeprecatedRef>
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
  atom?: Maybe<AtomDeprecated>
  fields?: Maybe<Array<Maybe<Field>>>
  fieldsAggregate?: Maybe<FieldAggregateResult>
}

export type InterfaceAtomArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
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
  atom?: Maybe<AtomDeprecatedRef>
  fields?: Maybe<Array<Maybe<FieldRef>>>
}

export type InterfaceRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  atom?: Maybe<AtomDeprecatedRef>
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

export type Lambda = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
  body: Scalars['String']
}

export type LambdaAggregateResult = {
  count?: Maybe<Scalars['Int']>
  ownerIdMin?: Maybe<Scalars['String']>
  ownerIdMax?: Maybe<Scalars['String']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
  bodyMin?: Maybe<Scalars['String']>
  bodyMax?: Maybe<Scalars['String']>
}

export type LambdaFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  ownerId?: Maybe<StringHashFilter>
  has?: Maybe<Array<Maybe<LambdaHasFilter>>>
  and?: Maybe<Array<Maybe<LambdaFilter>>>
  or?: Maybe<Array<Maybe<LambdaFilter>>>
  not?: Maybe<LambdaFilter>
}

export enum LambdaHasFilter {
  OwnerId = 'ownerId',
  Name = 'name',
  Body = 'body',
}

export type LambdaOrder = {
  asc?: Maybe<LambdaOrderable>
  desc?: Maybe<LambdaOrderable>
  then?: Maybe<LambdaOrder>
}

export enum LambdaOrderable {
  OwnerId = 'ownerId',
  Name = 'name',
  Body = 'body',
}

export type LambdaPatch = {
  ownerId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type LambdaRef = {
  id?: Maybe<Scalars['ID']>
  ownerId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type Library = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<AtomDeprecated>>>
  components?: Maybe<Array<Maybe<Component>>>
  atomsAggregate?: Maybe<AtomDeprecatedAggregateResult>
  componentsAggregate?: Maybe<ComponentAggregateResult>
}

export type LibraryAtomsArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
  order?: Maybe<AtomDeprecatedOrder>
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
  filter?: Maybe<AtomDeprecatedFilter>
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
  atoms?: Maybe<Array<Maybe<AtomDeprecatedRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
}

export type LibraryRef = {
  id?: Maybe<Scalars['ID']>
  ownerId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  atoms?: Maybe<Array<Maybe<AtomDeprecatedRef>>>
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
  addAppDeprecated?: Maybe<AddAppDeprecatedPayload>
  updateAppDeprecated?: Maybe<UpdateAppDeprecatedPayload>
  deleteAppDeprecated?: Maybe<DeleteAppDeprecatedPayload>
  addLambda?: Maybe<AddLambdaPayload>
  updateLambda?: Maybe<UpdateLambdaPayload>
  deleteLambda?: Maybe<DeleteLambdaPayload>
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
  addAtomDeprecated?: Maybe<AddAtomDeprecatedPayload>
  updateAtomDeprecated?: Maybe<UpdateAtomDeprecatedPayload>
  deleteAtomDeprecated?: Maybe<DeleteAtomDeprecatedPayload>
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

export type MutationAddAppDeprecatedArgs = {
  input: Array<AddAppDeprecatedInput>
}

export type MutationUpdateAppDeprecatedArgs = {
  input: UpdateAppDeprecatedInput
}

export type MutationDeleteAppDeprecatedArgs = {
  filter: AppDeprecatedFilter
}

export type MutationAddLambdaArgs = {
  input: Array<AddLambdaInput>
}

export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput
}

export type MutationDeleteLambdaArgs = {
  filter: LambdaFilter
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

export type MutationAddAtomDeprecatedArgs = {
  input: Array<AddAtomDeprecatedInput>
}

export type MutationUpdateAtomDeprecatedArgs = {
  input: UpdateAtomDeprecatedInput
}

export type MutationDeleteAtomDeprecatedArgs = {
  filter: AtomDeprecatedFilter
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
  app: AppDeprecated
  rootElement: Element
}

export type PageAppArgs = {
  filter?: Maybe<AppDeprecatedFilter>
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
  app?: Maybe<AppDeprecatedRef>
  rootElement?: Maybe<ElementRef>
}

export type PageRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  app?: Maybe<AppDeprecatedRef>
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
  getAppDeprecated?: Maybe<AppDeprecated>
  queryAppDeprecated?: Maybe<Array<Maybe<AppDeprecated>>>
  aggregateAppDeprecated?: Maybe<AppDeprecatedAggregateResult>
  getLambda?: Maybe<Lambda>
  queryLambda?: Maybe<Array<Maybe<Lambda>>>
  aggregateLambda?: Maybe<LambdaAggregateResult>
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
  getAtomDeprecated?: Maybe<AtomDeprecated>
  queryAtomDeprecated?: Maybe<Array<Maybe<AtomDeprecated>>>
  aggregateAtomDeprecated?: Maybe<AtomDeprecatedAggregateResult>
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

export type QueryGetAppDeprecatedArgs = {
  id: Scalars['ID']
}

export type QueryQueryAppDeprecatedArgs = {
  filter?: Maybe<AppDeprecatedFilter>
  order?: Maybe<AppDeprecatedOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAppDeprecatedArgs = {
  filter?: Maybe<AppDeprecatedFilter>
}

export type QueryGetLambdaArgs = {
  id: Scalars['ID']
}

export type QueryQueryLambdaArgs = {
  filter?: Maybe<LambdaFilter>
  order?: Maybe<LambdaOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateLambdaArgs = {
  filter?: Maybe<LambdaFilter>
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

export type QueryGetAtomDeprecatedArgs = {
  id: Scalars['ID']
}

export type QueryQueryAtomDeprecatedArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
  order?: Maybe<AtomDeprecatedOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAtomDeprecatedArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
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

export type UpdateAppDeprecatedInput = {
  filter: AppDeprecatedFilter
  set?: Maybe<AppDeprecatedPatch>
  remove?: Maybe<AppDeprecatedPatch>
}

export type UpdateAppDeprecatedPayload = {
  appDeprecated?: Maybe<Array<Maybe<AppDeprecated>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAppDeprecatedPayloadAppDeprecatedArgs = {
  filter?: Maybe<AppDeprecatedFilter>
  order?: Maybe<AppDeprecatedOrder>
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

export type UpdateAtomDeprecatedInput = {
  filter: AtomDeprecatedFilter
  set?: Maybe<AtomDeprecatedPatch>
  remove?: Maybe<AtomDeprecatedPatch>
}

export type UpdateAtomDeprecatedPayload = {
  atomDeprecated?: Maybe<Array<Maybe<AtomDeprecated>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAtomDeprecatedPayloadAtomDeprecatedArgs = {
  filter?: Maybe<AtomDeprecatedFilter>
  order?: Maybe<AtomDeprecatedOrder>
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

export type UpdateLambdaInput = {
  filter: LambdaFilter
  set?: Maybe<LambdaPatch>
  remove?: Maybe<LambdaPatch>
}

export type UpdateLambdaPayload = {
  lambda?: Maybe<Array<Maybe<Lambda>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateLambdaPayloadLambdaArgs = {
  filter?: Maybe<LambdaFilter>
  order?: Maybe<LambdaOrder>
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

export const __ComponentFragmentDoc = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const LibraryExplorer__ComponentFragmentDoc = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
`
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
export const __Component = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const LibraryExplorer__Component = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
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
