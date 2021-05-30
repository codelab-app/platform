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
const defaultOptions = { operationName: 'dgraph' }
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

export type AddAtomInput = {
  type: AtomType
  label: Scalars['String']
  library?: Maybe<LibraryRef>
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

export type AddPageElementInput = {
  name: Scalars['String']
  page: PageRef
  parent?: Maybe<PageElementRef>
  children?: Maybe<Array<Maybe<PageElementRef>>>
  atom?: Maybe<AtomRef>
  component?: Maybe<ComponentRef>
}

export type AddPageElementPayload = {
  pageElement?: Maybe<Array<Maybe<PageElement>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPageElementPayloadPageElementArgs = {
  filter?: Maybe<PageElementFilter>
  order?: Maybe<PageElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddPageInput = {
  name: Scalars['String']
  app: AppRef
  rootElement: PageElementRef
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

export type AddPropInput = {
  description?: Maybe<Scalars['String']>
  type: ValueTypeRef
  props?: Maybe<Array<Maybe<PropRef>>>
}

export type AddPropPayload = {
  prop?: Maybe<Array<Maybe<Prop>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPropPayloadPropArgs = {
  filter?: Maybe<PropFilter>
  order?: Maybe<PropOrder>
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

export type AddValueTypeInput = {
  label: Scalars['String']
  type: Scalars['String']
}

export type AddValueTypePayload = {
  valueType?: Maybe<Array<Maybe<ValueType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddValueTypePayloadValueTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
  order?: Maybe<ValueTypeOrder>
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

export type Atom = {
  id: Scalars['ID']
  type: AtomType
  label: Scalars['String']
  library?: Maybe<Library>
}

export type AtomLibraryArgs = {
  filter?: Maybe<LibraryFilter>
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
}

export type AtomRef = {
  id?: Maybe<Scalars['ID']>
  type?: Maybe<AtomType>
  label?: Maybe<Scalars['String']>
  library?: Maybe<LibraryRef>
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
  HtmlDiv = 'HtmlDiv',
  HtmlP = 'HtmlP',
  HtmlSpan = 'HtmlSpan',
  HtmlText = 'HtmlText',
}

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>
  or?: Maybe<Array<Maybe<AuthRule>>>
  not?: Maybe<AuthRule>
  rule?: Maybe<Scalars['String']>
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

export type DeletePageElementPayload = {
  pageElement?: Maybe<Array<Maybe<PageElement>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePageElementPayloadPageElementArgs = {
  filter?: Maybe<PageElementFilter>
  order?: Maybe<PageElementOrder>
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

export type DeletePropPayload = {
  prop?: Maybe<Array<Maybe<Prop>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePropPayloadPropArgs = {
  filter?: Maybe<PropFilter>
  order?: Maybe<PropOrder>
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

export type DeleteValueTypePayload = {
  valueType?: Maybe<Array<Maybe<ValueType>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteValueTypePayloadValueTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
  order?: Maybe<ValueTypeOrder>
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
  addPageElement?: Maybe<AddPageElementPayload>
  updatePageElement?: Maybe<UpdatePageElementPayload>
  deletePageElement?: Maybe<DeletePageElementPayload>
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
  addProp?: Maybe<AddPropPayload>
  updateProp?: Maybe<UpdatePropPayload>
  deleteProp?: Maybe<DeletePropPayload>
  addValueType?: Maybe<AddValueTypePayload>
  updateValueType?: Maybe<UpdateValueTypePayload>
  deleteValueType?: Maybe<DeleteValueTypePayload>
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

export type MutationAddPageElementArgs = {
  input: Array<AddPageElementInput>
}

export type MutationUpdatePageElementArgs = {
  input: UpdatePageElementInput
}

export type MutationDeletePageElementArgs = {
  filter: PageElementFilter
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

export type MutationAddPropArgs = {
  input: Array<AddPropInput>
}

export type MutationUpdatePropArgs = {
  input: UpdatePropInput
}

export type MutationDeletePropArgs = {
  filter: PropFilter
}

export type MutationAddValueTypeArgs = {
  input: Array<AddValueTypeInput>
}

export type MutationUpdateValueTypeArgs = {
  input: UpdateValueTypeInput
}

export type MutationDeleteValueTypeArgs = {
  filter: ValueTypeFilter
}

export type NearFilter = {
  distance: Scalars['Float']
  coordinate: PointRef
}

export type Page = {
  id: Scalars['ID']
  name: Scalars['String']
  app: App
  rootElement: PageElement
}

export type PageAppArgs = {
  filter?: Maybe<AppFilter>
}

export type PageRootElementArgs = {
  filter?: Maybe<PageElementFilter>
}

export type PageAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type PageElement = {
  id: Scalars['ID']
  name: Scalars['String']
  page: Page
  parent?: Maybe<PageElement>
  children?: Maybe<Array<Maybe<PageElement>>>
  atom?: Maybe<Atom>
  component?: Maybe<Component>
  childrenAggregate?: Maybe<PageElementAggregateResult>
}

export type PageElementPageArgs = {
  filter?: Maybe<PageFilter>
}

export type PageElementParentArgs = {
  filter?: Maybe<PageElementFilter>
}

export type PageElementChildrenArgs = {
  filter?: Maybe<PageElementFilter>
  order?: Maybe<PageElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PageElementAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type PageElementComponentArgs = {
  filter?: Maybe<ComponentFilter>
}

export type PageElementChildrenAggregateArgs = {
  filter?: Maybe<PageElementFilter>
}

export type PageElementAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type PageElementFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  name?: Maybe<StringFullTextFilter_StringTermFilter>
  has?: Maybe<Array<Maybe<PageElementHasFilter>>>
  and?: Maybe<Array<Maybe<PageElementFilter>>>
  or?: Maybe<Array<Maybe<PageElementFilter>>>
  not?: Maybe<PageElementFilter>
}

export enum PageElementHasFilter {
  Name = 'name',
  Page = 'page',
  Parent = 'parent',
  Children = 'children',
  Atom = 'atom',
  Component = 'component',
}

export type PageElementOrder = {
  asc?: Maybe<PageElementOrderable>
  desc?: Maybe<PageElementOrderable>
  then?: Maybe<PageElementOrder>
}

export enum PageElementOrderable {
  Name = 'name',
}

export type PageElementPatch = {
  name?: Maybe<Scalars['String']>
  page?: Maybe<PageRef>
  parent?: Maybe<PageElementRef>
  children?: Maybe<Array<Maybe<PageElementRef>>>
  atom?: Maybe<AtomRef>
  component?: Maybe<ComponentRef>
}

export type PageElementRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  page?: Maybe<PageRef>
  parent?: Maybe<PageElementRef>
  children?: Maybe<Array<Maybe<PageElementRef>>>
  atom?: Maybe<AtomRef>
  component?: Maybe<ComponentRef>
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
  rootElement?: Maybe<PageElementRef>
}

export type PageRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  app?: Maybe<AppRef>
  rootElement?: Maybe<PageElementRef>
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

export type Prop = {
  id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  type: ValueType
  props?: Maybe<Array<Maybe<Prop>>>
  propsAggregate?: Maybe<PropAggregateResult>
}

export type PropTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
}

export type PropPropsArgs = {
  filter?: Maybe<PropFilter>
  order?: Maybe<PropOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PropPropsAggregateArgs = {
  filter?: Maybe<PropFilter>
}

export type PropAggregateResult = {
  count?: Maybe<Scalars['Int']>
  descriptionMin?: Maybe<Scalars['String']>
  descriptionMax?: Maybe<Scalars['String']>
}

export type PropFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<PropHasFilter>>>
  and?: Maybe<Array<Maybe<PropFilter>>>
  or?: Maybe<Array<Maybe<PropFilter>>>
  not?: Maybe<PropFilter>
}

export enum PropHasFilter {
  Description = 'description',
  Type = 'type',
  Props = 'props',
}

export type PropOrder = {
  asc?: Maybe<PropOrderable>
  desc?: Maybe<PropOrderable>
  then?: Maybe<PropOrder>
}

export enum PropOrderable {
  Description = 'description',
}

export type PropPatch = {
  description?: Maybe<Scalars['String']>
  type?: Maybe<ValueTypeRef>
  props?: Maybe<Array<Maybe<PropRef>>>
}

export type PropRef = {
  id?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<ValueTypeRef>
  props?: Maybe<Array<Maybe<PropRef>>>
}

export type Query = {
  getApp?: Maybe<App>
  queryApp?: Maybe<Array<Maybe<App>>>
  aggregateApp?: Maybe<AppAggregateResult>
  getPage?: Maybe<Page>
  queryPage?: Maybe<Array<Maybe<Page>>>
  aggregatePage?: Maybe<PageAggregateResult>
  getPageElement?: Maybe<PageElement>
  queryPageElement?: Maybe<Array<Maybe<PageElement>>>
  aggregatePageElement?: Maybe<PageElementAggregateResult>
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
  getProp?: Maybe<Prop>
  queryProp?: Maybe<Array<Maybe<Prop>>>
  aggregateProp?: Maybe<PropAggregateResult>
  getValueType?: Maybe<ValueType>
  queryValueType?: Maybe<Array<Maybe<ValueType>>>
  aggregateValueType?: Maybe<ValueTypeAggregateResult>
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

export type QueryGetPageElementArgs = {
  id: Scalars['ID']
}

export type QueryQueryPageElementArgs = {
  filter?: Maybe<PageElementFilter>
  order?: Maybe<PageElementOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePageElementArgs = {
  filter?: Maybe<PageElementFilter>
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

export type QueryGetPropArgs = {
  id: Scalars['ID']
}

export type QueryQueryPropArgs = {
  filter?: Maybe<PropFilter>
  order?: Maybe<PropOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePropArgs = {
  filter?: Maybe<PropFilter>
}

export type QueryGetValueTypeArgs = {
  id: Scalars['ID']
}

export type QueryQueryValueTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
  order?: Maybe<ValueTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateValueTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
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

export type UpdatePageElementInput = {
  filter: PageElementFilter
  set?: Maybe<PageElementPatch>
  remove?: Maybe<PageElementPatch>
}

export type UpdatePageElementPayload = {
  pageElement?: Maybe<Array<Maybe<PageElement>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdatePageElementPayloadPageElementArgs = {
  filter?: Maybe<PageElementFilter>
  order?: Maybe<PageElementOrder>
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
  order?: Maybe<PropOrder>
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

export type UpdateValueTypeInput = {
  filter: ValueTypeFilter
  set?: Maybe<ValueTypePatch>
  remove?: Maybe<ValueTypePatch>
}

export type UpdateValueTypePayload = {
  valueType?: Maybe<Array<Maybe<ValueType>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateValueTypePayloadValueTypeArgs = {
  filter?: Maybe<ValueTypeFilter>
  order?: Maybe<ValueTypeOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ValueType = {
  id: Scalars['ID']
  label: Scalars['String']
  type: Scalars['String']
}

export type ValueTypeAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
  typeMin?: Maybe<Scalars['String']>
  typeMax?: Maybe<Scalars['String']>
}

export type ValueTypeFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<ValueTypeHasFilter>>>
  and?: Maybe<Array<Maybe<ValueTypeFilter>>>
  or?: Maybe<Array<Maybe<ValueTypeFilter>>>
  not?: Maybe<ValueTypeFilter>
}

export enum ValueTypeHasFilter {
  Label = 'label',
  Type = 'type',
}

export type ValueTypeOrder = {
  asc?: Maybe<ValueTypeOrderable>
  desc?: Maybe<ValueTypeOrderable>
  then?: Maybe<ValueTypeOrder>
}

export enum ValueTypeOrderable {
  Label = 'label',
  Type = 'type',
}

export type ValueTypePatch = {
  label?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type ValueTypeRef = {
  id?: Maybe<Scalars['ID']>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
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

export type DGraph__AtomFragment = Pick<Atom, 'id' | 'label' | 'type'>

export type CreateAtomMutationVariables = Exact<{
  input: Array<AddAtomInput> | AddAtomInput
}>

export type CreateAtomMutation = {
  addAtom?: Maybe<{ atom?: Maybe<Array<Maybe<DGraph__AtomFragment>>> }>
}

export type DeleteAtomMutationVariables = Exact<{
  filter: AtomFilter
}>

export type DeleteAtomMutation = {
  deleteAtom?: Maybe<{ atom?: Maybe<Array<Maybe<DGraph__AtomFragment>>> }>
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
}>

export type DeletePageMutation = {
  deletePage?: Maybe<
    Pick<DeletePagePayload, 'numUids'> & {
      page?: Maybe<Array<Maybe<Dgraph__PageFragment>>>
    }
  >
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

export type Dgraph_PageElementFragment = Pick<PageElement, 'id' | 'name'> & {
  atom?: Maybe<DGraph__AtomFragment>
  parent?: Maybe<Pick<PageElement, 'id'>>
  page: Dgraph__PageFragment
}

export type DeletePageElementMutationVariables = Exact<{
  filter: PageElementFilter
}>

export type DeletePageElementMutation = {
  deletePageElement?: Maybe<Pick<DeletePageElementPayload, 'numUids'>>
}

export type GetPageElementOwnerQueryVariables = Exact<{
  pageElementId: Scalars['ID']
}>

export type GetPageElementOwnerQuery = {
  getPageElement?: Maybe<
    {
      page: { app: Pick<App, 'ownerId'> } & Dgraph__PageFragment
    } & Dgraph_PageElementFragment
  >
}

export type GetPageElementParentQueryVariables = Exact<{
  pageElementId: Scalars['ID']
}>

export type GetPageElementParentQuery = {
  getPageElement?: Maybe<{ parent?: Maybe<Dgraph_PageElementFragment> }>
}

export type GetPageElementQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetPageElementQuery = {
  getPageElement?: Maybe<Dgraph_PageElementFragment>
}

export type UpdatePageElementMutationVariables = Exact<{
  input: UpdatePageElementInput
}>

export type UpdatePageElementMutation = {
  updatePageElement?: Maybe<
    Pick<UpdatePageElementPayload, 'numUids'> & {
      pageElement?: Maybe<Array<Maybe<Dgraph_PageElementFragment>>>
    }
  >
}

export type GetValueTypesQueryVariables = Exact<{ [key: string]: never }>

export type GetValueTypesQuery = {
  valueTypes?: Maybe<Array<Maybe<Dgraph__ValueTypeFragment>>>
}

export type Dgraph__ValueTypeFragment = Pick<ValueType, 'id' | 'type' | 'label'>

export const __ComponentFragmentDoc = gql`
  fragment __Component on Component {
    id
    label
  }
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
export const DGraph__AtomFragmentDoc = gql`
  fragment DGraph__Atom on Atom {
    id
    label
    type
  }
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
export const Dgraph_PageElementFragmentDoc = gql`
  fragment Dgraph_PageElement on PageElement {
    id
    name
    atom {
      ...DGraph__Atom
    }
    parent {
      id
    }
    page {
      ...Dgraph__Page
    }
  }
  ${DGraph__AtomFragmentDoc}
  ${Dgraph__PageFragmentDoc}
`
export const Dgraph__ValueTypeFragmentDoc = gql`
  fragment Dgraph__ValueType on ValueType {
    id
    type
    label
  }
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
export const DeleteAtomGql = gql`
  mutation DeleteAtom($filter: AtomFilter!) {
    deleteAtom(filter: $filter) {
      atom {
        ...DGraph__Atom
      }
    }
  }
  ${DGraph__AtomFragmentDoc}
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
 *      filter: // value for 'filter'
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
  mutation DeletePage($filter: PageFilter!) {
    deletePage(filter: $filter) {
      numUids
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__PageFragmentDoc}
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
export const DeletePageElementGql = gql`
  mutation DeletePageElement($filter: PageElementFilter!) {
    deletePageElement(filter: $filter) {
      numUids
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
 *      filter: // value for 'filter'
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
export const GetPageElementOwnerGql = gql`
  query GetPageElementOwner($pageElementId: ID!) {
    getPageElement(id: $pageElementId) {
      page {
        app {
          ownerId
        }
        ...Dgraph__Page
      }
      ...Dgraph_PageElement
    }
  }
  ${Dgraph__PageFragmentDoc}
  ${Dgraph_PageElementFragmentDoc}
`

/**
 * __useGetPageElementOwnerQuery__
 *
 * To run a query within a React component, call `useGetPageElementOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementOwnerQuery({
 *   variables: {
 *      pageElementId: // value for 'pageElementId'
 *   },
 * });
 */
export function useGetPageElementOwnerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementOwnerQuery,
    GetPageElementOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetPageElementOwnerQuery,
    GetPageElementOwnerQueryVariables
  >(GetPageElementOwnerGql, options)
}
export function useGetPageElementOwnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementOwnerQuery,
    GetPageElementOwnerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetPageElementOwnerQuery,
    GetPageElementOwnerQueryVariables
  >(GetPageElementOwnerGql, options)
}
export type GetPageElementOwnerQueryHookResult = ReturnType<
  typeof useGetPageElementOwnerQuery
>
export type GetPageElementOwnerLazyQueryHookResult = ReturnType<
  typeof useGetPageElementOwnerLazyQuery
>
export type GetPageElementOwnerQueryResult = Apollo.QueryResult<
  GetPageElementOwnerQuery,
  GetPageElementOwnerQueryVariables
>
export function refetchGetPageElementOwnerQuery(
  variables?: GetPageElementOwnerQueryVariables,
) {
  return { query: GetPageElementOwnerGql, variables: variables }
}
export const GetPageElementParentGql = gql`
  query GetPageElementParent($pageElementId: ID!) {
    getPageElement(id: $pageElementId) {
      parent {
        ...Dgraph_PageElement
      }
    }
  }
  ${Dgraph_PageElementFragmentDoc}
`

/**
 * __useGetPageElementParentQuery__
 *
 * To run a query within a React component, call `useGetPageElementParentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementParentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementParentQuery({
 *   variables: {
 *      pageElementId: // value for 'pageElementId'
 *   },
 * });
 */
export function useGetPageElementParentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementParentQuery,
    GetPageElementParentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetPageElementParentQuery,
    GetPageElementParentQueryVariables
  >(GetPageElementParentGql, options)
}
export function useGetPageElementParentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementParentQuery,
    GetPageElementParentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetPageElementParentQuery,
    GetPageElementParentQueryVariables
  >(GetPageElementParentGql, options)
}
export type GetPageElementParentQueryHookResult = ReturnType<
  typeof useGetPageElementParentQuery
>
export type GetPageElementParentLazyQueryHookResult = ReturnType<
  typeof useGetPageElementParentLazyQuery
>
export type GetPageElementParentQueryResult = Apollo.QueryResult<
  GetPageElementParentQuery,
  GetPageElementParentQueryVariables
>
export function refetchGetPageElementParentQuery(
  variables?: GetPageElementParentQueryVariables,
) {
  return { query: GetPageElementParentGql, variables: variables }
}
export const GetPageElementGql = gql`
  query GetPageElement($id: ID!) {
    getPageElement(id: $id) {
      ...Dgraph_PageElement
    }
  }
  ${Dgraph_PageElementFragmentDoc}
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
 *      id: // value for 'id'
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
export const UpdatePageElementGql = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      numUids
      pageElement {
        ...Dgraph_PageElement
      }
    }
  }
  ${Dgraph_PageElementFragmentDoc}
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
export const GetValueTypesGql = gql`
  query GetValueTypes {
    valueTypes: queryValueType {
      ...Dgraph__ValueType
    }
  }
  ${Dgraph__ValueTypeFragmentDoc}
`

/**
 * __useGetValueTypesQuery__
 *
 * To run a query within a React component, call `useGetValueTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValueTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValueTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetValueTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetValueTypesQuery,
    GetValueTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetValueTypesQuery, GetValueTypesQueryVariables>(
    GetValueTypesGql,
    options,
  )
}
export function useGetValueTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetValueTypesQuery,
    GetValueTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetValueTypesQuery, GetValueTypesQueryVariables>(
    GetValueTypesGql,
    options,
  )
}
export type GetValueTypesQueryHookResult = ReturnType<
  typeof useGetValueTypesQuery
>
export type GetValueTypesLazyQueryHookResult = ReturnType<
  typeof useGetValueTypesLazyQuery
>
export type GetValueTypesQueryResult = Apollo.QueryResult<
  GetValueTypesQuery,
  GetValueTypesQueryVariables
>
export function refetchGetValueTypesQuery(
  variables?: GetValueTypesQueryVariables,
) {
  return { query: GetValueTypesGql, variables: variables }
}
export const __Component = gql`
  fragment __Component on Component {
    id
    label
  }
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
export const DGraph__Atom = gql`
  fragment DGraph__Atom on Atom {
    id
    label
    type
  }
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
export const Dgraph_PageElement = gql`
  fragment Dgraph_PageElement on PageElement {
    id
    name
    atom {
      ...DGraph__Atom
    }
    parent {
      id
    }
    page {
      ...Dgraph__Page
    }
  }
  ${DGraph__Atom}
  ${Dgraph__Page}
`
export const Dgraph__ValueType = gql`
  fragment Dgraph__ValueType on ValueType {
    id
    type
    label
  }
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
export const DeleteAtom = gql`
  mutation DeleteAtom($filter: AtomFilter!) {
    deleteAtom(filter: $filter) {
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
  mutation DeletePage($filter: PageFilter!) {
    deletePage(filter: $filter) {
      numUids
      page {
        ...Dgraph__Page
      }
    }
  }
  ${Dgraph__Page}
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
export const DeletePageElement = gql`
  mutation DeletePageElement($filter: PageElementFilter!) {
    deletePageElement(filter: $filter) {
      numUids
    }
  }
`
export const GetPageElementOwner = gql`
  query GetPageElementOwner($pageElementId: ID!) {
    getPageElement(id: $pageElementId) {
      page {
        app {
          ownerId
        }
        ...Dgraph__Page
      }
      ...Dgraph_PageElement
    }
  }
  ${Dgraph__Page}
  ${Dgraph_PageElement}
`
export const GetPageElementParent = gql`
  query GetPageElementParent($pageElementId: ID!) {
    getPageElement(id: $pageElementId) {
      parent {
        ...Dgraph_PageElement
      }
    }
  }
  ${Dgraph_PageElement}
`
export const GetPageElement = gql`
  query GetPageElement($id: ID!) {
    getPageElement(id: $id) {
      ...Dgraph_PageElement
    }
  }
  ${Dgraph_PageElement}
`
export const UpdatePageElement = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      numUids
      pageElement {
        ...Dgraph_PageElement
      }
    }
  }
  ${Dgraph_PageElement}
`
export const GetValueTypes = gql`
  query GetValueTypes {
    valueTypes: queryValueType {
      ...Dgraph__ValueType
    }
  }
  ${Dgraph__ValueType}
`
