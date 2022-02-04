export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date and time, represented as an ISO-8601 string */
  DateTime: string
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  owner?: Maybe<Array<Maybe<User>>>
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  ownerConnection: AppOwnerConnection
  pages?: Maybe<Array<Maybe<Page>>>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  pagesConnection: AppPagesConnection
}

export type AppOwnerArgs = {
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type AppOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
}

export type AppOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppOwnerConnectionSort>>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppPagesArgs = {
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type AppPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type AppPagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppPagesConnectionSort>>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type AppConnectInput = {
  owner?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>
}

export type AppConnectOrCreateInput = {
  owner?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<AppOwnerFieldInput>
  pages?: InputMaybe<AppPagesFieldInput>
}

export type AppDeleteInput = {
  owner?: InputMaybe<Array<AppOwnerDeleteFieldInput>>
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>
}

export type AppDisconnectInput = {
  owner?: InputMaybe<Array<AppOwnerDisconnectFieldInput>>
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
}

export type AppOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<AppSort>>>
}

export type AppOwnerAggregateInput = {
  AND?: InputMaybe<Array<AppOwnerAggregateInput>>
  OR?: InputMaybe<Array<AppOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppOwnerNodeAggregationWhereInput>
}

export type AppOwnerConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>
  where?: InputMaybe<UserConnectWhere>
}

export type AppOwnerConnectOrCreateFieldInput = {
  onCreate: AppOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type AppOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserCreateInput
}

export type AppOwnerConnection = {
  __typename?: 'AppOwnerConnection'
  edges: Array<AppOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type AppOwnerConnectionWhere = {
  AND?: InputMaybe<Array<AppOwnerConnectionWhere>>
  OR?: InputMaybe<Array<AppOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type AppOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type AppOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppOwnerFieldInput = {
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
}

export type AppOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type AppOwnerRelationship = {
  __typename?: 'AppOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type AppOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type AppOwnerUpdateFieldInput = {
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  delete?: InputMaybe<Array<AppOwnerDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AppOwnerDisconnectFieldInput>>
  update?: InputMaybe<AppOwnerUpdateConnectionInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppPagePagesAggregationSelection = {
  __typename?: 'AppPagePagesAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppPagePagesNodeAggregateSelection>
}

export type AppPagePagesNodeAggregateSelection = {
  __typename?: 'AppPagePagesNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type AppPagesAggregateInput = {
  AND?: InputMaybe<Array<AppPagesAggregateInput>>
  OR?: InputMaybe<Array<AppPagesAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppPagesNodeAggregationWhereInput>
}

export type AppPagesConnectFieldInput = {
  connect?: InputMaybe<Array<PageConnectInput>>
  where?: InputMaybe<PageConnectWhere>
}

export type AppPagesConnectOrCreateFieldInput = {
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate
  where: PageConnectOrCreateWhere
}

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageCreateInput
}

export type AppPagesConnection = {
  __typename?: 'AppPagesConnection'
  edges: Array<AppPagesRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppPagesConnectionSort = {
  node?: InputMaybe<PageSort>
}

export type AppPagesConnectionWhere = {
  AND?: InputMaybe<Array<AppPagesConnectionWhere>>
  OR?: InputMaybe<Array<AppPagesConnectionWhere>>
  node?: InputMaybe<PageWhere>
  node_NOT?: InputMaybe<PageWhere>
}

export type AppPagesCreateFieldInput = {
  node: PageCreateInput
}

export type AppPagesDeleteFieldInput = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppPagesDisconnectFieldInput = {
  disconnect?: InputMaybe<PageDisconnectInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppPagesFieldInput = {
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
}

export type AppPagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppPagesRelationship = {
  __typename?: 'AppPagesRelationship'
  cursor: Scalars['String']
  node: Page
}

export type AppPagesUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>
}

export type AppPagesUpdateFieldInput = {
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
  delete?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  update?: InputMaybe<AppPagesUpdateConnectionInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppRelationInput = {
  owner?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type AppUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<AppOwnerUpdateFieldInput>>
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>
}

export type AppUserOwnerAggregationSelection = {
  __typename?: 'AppUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: 'AppUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
  id: IdAggregateSelection
}

export type AppWhere = {
  AND?: InputMaybe<Array<AppWhere>>
  OR?: InputMaybe<Array<AppWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>
  ownerConnection?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<AppOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  pages?: InputMaybe<PageWhere>
  pagesAggregate?: InputMaybe<AppPagesAggregateInput>
  pagesConnection?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_NOT?: InputMaybe<AppPagesConnectionWhere>
  pages_NOT?: InputMaybe<PageWhere>
}

export type Atom = {
  __typename?: 'Atom'
  id: Scalars['ID']
  name: Scalars['String']
  type: AtomType
}

export type AtomAggregateSelection = {
  __typename?: 'AtomAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type AtomCreateInput = {
  name: Scalars['String']
  type: AtomType
}

export type AtomOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<AtomSort>>>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
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
  AntDesignImage = 'AntDesignImage',
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
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
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
  HookGraphqlMutation = 'HookGraphqlMutation',
  HookGraphqlQuery = 'HookGraphqlQuery',
  HookQueryConfig = 'HookQueryConfig',
  HookQueryLambda = 'HookQueryLambda',
  HookQueryPage = 'HookQueryPage',
  HookQueryPages = 'HookQueryPages',
  HookRecoilState = 'HookRecoilState',
  HookRouter = 'HookRouter',
  HtmlA = 'HtmlA',
  HtmlArea = 'HtmlArea',
  HtmlAside = 'HtmlAside',
  HtmlAudio = 'HtmlAudio',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlButton = 'HtmlButton',
  HtmlCanvas = 'HtmlCanvas',
  HtmlCode = 'HtmlCode',
  HtmlDList = 'HtmlDList',
  HtmlData = 'HtmlData',
  HtmlDatalist = 'HtmlDatalist',
  HtmlDetails = 'HtmlDetails',
  HtmlDialog = 'HtmlDialog',
  HtmlDiv = 'HtmlDiv',
  HtmlEm = 'HtmlEm',
  HtmlEmbed = 'HtmlEmbed',
  HtmlFieldset = 'HtmlFieldset',
  HtmlFont = 'HtmlFont',
  HtmlFooter = 'HtmlFooter',
  HtmlForm = 'HtmlForm',
  HtmlFrame = 'HtmlFrame',
  HtmlFrameset = 'HtmlFrameset',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHeader = 'HtmlHeader',
  HtmlHr = 'HtmlHr',
  HtmlI = 'HtmlI',
  HtmlIframe = 'HtmlIframe',
  HtmlImage = 'HtmlImage',
  HtmlInput = 'HtmlInput',
  HtmlLabel = 'HtmlLabel',
  HtmlLegend = 'HtmlLegend',
  HtmlLi = 'HtmlLi',
  HtmlLink = 'HtmlLink',
  HtmlMain = 'HtmlMain',
  HtmlMap = 'HtmlMap',
  HtmlMeta = 'HtmlMeta',
  HtmlMeter = 'HtmlMeter',
  HtmlNav = 'HtmlNav',
  HtmlOList = 'HtmlOList',
  HtmlObject = 'HtmlObject',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlOption = 'HtmlOption',
  HtmlOutput = 'HtmlOutput',
  HtmlP = 'HtmlP',
  HtmlParam = 'HtmlParam',
  HtmlPicture = 'HtmlPicture',
  HtmlPre = 'HtmlPre',
  HtmlProgress = 'HtmlProgress',
  HtmlQuote = 'HtmlQuote',
  HtmlS = 'HtmlS',
  HtmlSection = 'HtmlSection',
  HtmlSelect = 'HtmlSelect',
  HtmlSmall = 'HtmlSmall',
  HtmlSource = 'HtmlSource',
  HtmlSpan = 'HtmlSpan',
  HtmlStrong = 'HtmlStrong',
  HtmlStyle = 'HtmlStyle',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
  HtmlTable = 'HtmlTable',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTime = 'HtmlTime',
  HtmlTitle = 'HtmlTitle',
  HtmlTrack = 'HtmlTrack',
  HtmlUList = 'HtmlUList',
  HtmlVideo = 'HtmlVideo',
  MuiAccordion = 'MuiAccordion',
  MuiAccordionActions = 'MuiAccordionActions',
  MuiAccordionDetails = 'MuiAccordionDetails',
  MuiAccordionSummary = 'MuiAccordionSummary',
  MuiAlert = 'MuiAlert',
  MuiAlertTitle = 'MuiAlertTitle',
  MuiAppBar = 'MuiAppBar',
  MuiAutocomplete = 'MuiAutocomplete',
  MuiAvatar = 'MuiAvatar',
  MuiAvatarGroup = 'MuiAvatarGroup',
  MuiBackdrop = 'MuiBackdrop',
  MuiBackdropUnstyled = 'MuiBackdropUnstyled',
  MuiBadge = 'MuiBadge',
  MuiBadgeUnstyled = 'MuiBadgeUnstyled',
  MuiBottomNavigation = 'MuiBottomNavigation',
  MuiBottomNavigationAction = 'MuiBottomNavigationAction',
  MuiBox = 'MuiBox',
  MuiBreadcrumbs = 'MuiBreadcrumbs',
  MuiButton = 'MuiButton',
  MuiButtonBase = 'MuiButtonBase',
  MuiButtonGroup = 'MuiButtonGroup',
  MuiButtonUnstyled = 'MuiButtonUnstyled',
  MuiCalendarPicker = 'MuiCalendarPicker',
  MuiCalendarPickerSkeleton = 'MuiCalendarPickerSkeleton',
  MuiCard = 'MuiCard',
  MuiCardActionArea = 'MuiCardActionArea',
  MuiCardActions = 'MuiCardActions',
  MuiCardContent = 'MuiCardContent',
  MuiCardHeader = 'MuiCardHeader',
  MuiCardMedia = 'MuiCardMedia',
  MuiCheckbox = 'MuiCheckbox',
  MuiChip = 'MuiChip',
  MuiCircularProgress = 'MuiCircularProgress',
  MuiClickAwayListener = 'MuiClickAwayListener',
  MuiClockPicker = 'MuiClockPicker',
  MuiCollapse = 'MuiCollapse',
  MuiContainer = 'MuiContainer',
  MuiCssBaseline = 'MuiCssBaseline',
  MuiDataGrid = 'MuiDataGrid',
  MuiDatePicker = 'MuiDatePicker',
  MuiDateRangePicker = 'MuiDateRangePicker',
  MuiDateRangePickerDay = 'MuiDateRangePickerDay',
  MuiDateTimePicker = 'MuiDateTimePicker',
  MuiDesktopDatePicker = 'MuiDesktopDatePicker',
  MuiDesktopDateRangePicker = 'MuiDesktopDateRangePicker',
  MuiDesktopDateTimePicker = 'MuiDesktopDateTimePicker',
  MuiDesktopTimePicker = 'MuiDesktopTimePicker',
  MuiDialog = 'MuiDialog',
  MuiDialogActions = 'MuiDialogActions',
  MuiDialogContent = 'MuiDialogContent',
  MuiDialogContentText = 'MuiDialogContentText',
  MuiDialogTitle = 'MuiDialogTitle',
  MuiDivider = 'MuiDivider',
  MuiDrawer = 'MuiDrawer',
  MuiFab = 'MuiFab',
  MuiFade = 'MuiFade',
  MuiFilledInput = 'MuiFilledInput',
  MuiFormControl = 'MuiFormControl',
  MuiFormControlLabel = 'MuiFormControlLabel',
  MuiFormControlUnstyled = 'MuiFormControlUnstyled',
  MuiFormGroup = 'MuiFormGroup',
  MuiFormHelperText = 'MuiFormHelperText',
  MuiFormLabel = 'MuiFormLabel',
  MuiGlobalStyles = 'MuiGlobalStyles',
  MuiGrid = 'MuiGrid',
  MuiGridColDef = 'MuiGridColDef',
  MuiGrow = 'MuiGrow',
  MuiHidden = 'MuiHidden',
  MuiIcon = 'MuiIcon',
  MuiIconButton = 'MuiIconButton',
  MuiImageList = 'MuiImageList',
  MuiImageListItem = 'MuiImageListItem',
  MuiImageListItemBar = 'MuiImageListItemBar',
  MuiInput = 'MuiInput',
  MuiInputAdornment = 'MuiInputAdornment',
  MuiInputBase = 'MuiInputBase',
  MuiInputLabel = 'MuiInputLabel',
  MuiLinearProgress = 'MuiLinearProgress',
  MuiLink = 'MuiLink',
  MuiList = 'MuiList',
  MuiListItem = 'MuiListItem',
  MuiListItemAvatar = 'MuiListItemAvatar',
  MuiListItemButton = 'MuiListItemButton',
  MuiListItemIcon = 'MuiListItemIcon',
  MuiListItemSecondaryAction = 'MuiListItemSecondaryAction',
  MuiListItemText = 'MuiListItemText',
  MuiListSubheader = 'MuiListSubheader',
  MuiLoadingButton = 'MuiLoadingButton',
  MuiMasonry = 'MuiMasonry',
  MuiMasonryItem = 'MuiMasonryItem',
  MuiMenu = 'MuiMenu',
  MuiMenuItem = 'MuiMenuItem',
  MuiMenuList = 'MuiMenuList',
  MuiMobileDatePicker = 'MuiMobileDatePicker',
  MuiMobileDateRangePicker = 'MuiMobileDateRangePicker',
  MuiMobileDateTimePicker = 'MuiMobileDateTimePicker',
  MuiMobileStepper = 'MuiMobileStepper',
  MuiMobileTimePicker = 'MuiMobileTimePicker',
  MuiModal = 'MuiModal',
  MuiModalUnstyled = 'MuiModalUnstyled',
  MuiMonthPicker = 'MuiMonthPicker',
  MuiNativeSelect = 'MuiNativeSelect',
  MuiNoSsr = 'MuiNoSsr',
  MuiOutlinedInput = 'MuiOutlinedInput',
  MuiPagination = 'MuiPagination',
  MuiPaginationItem = 'MuiPaginationItem',
  MuiPaper = 'MuiPaper',
  MuiPickersDay = 'MuiPickersDay',
  MuiPopover = 'MuiPopover',
  MuiPopper = 'MuiPopper',
  MuiPortal = 'MuiPortal',
  MuiRadio = 'MuiRadio',
  MuiRadioGroup = 'MuiRadioGroup',
  MuiRating = 'MuiRating',
  MuiScopedCssBaseline = 'MuiScopedCssBaseline',
  MuiSelect = 'MuiSelect',
  MuiSkeleton = 'MuiSkeleton',
  MuiSlide = 'MuiSlide',
  MuiSlider = 'MuiSlider',
  MuiSliderUnstyled = 'MuiSliderUnstyled',
  MuiSnackbar = 'MuiSnackbar',
  MuiSnackbarContent = 'MuiSnackbarContent',
  MuiSpeedDial = 'MuiSpeedDial',
  MuiSpeedDialAction = 'MuiSpeedDialAction',
  MuiSpeedDialIcon = 'MuiSpeedDialIcon',
  MuiStack = 'MuiStack',
  MuiStaticDatePicker = 'MuiStaticDatePicker',
  MuiStaticDateRangePicker = 'MuiStaticDateRangePicker',
  MuiStaticDateTimePicker = 'MuiStaticDateTimePicker',
  MuiStaticTimePicker = 'MuiStaticTimePicker',
  MuiStep = 'MuiStep',
  MuiStepButton = 'MuiStepButton',
  MuiStepConnector = 'MuiStepConnector',
  MuiStepContent = 'MuiStepContent',
  MuiStepIcon = 'MuiStepIcon',
  MuiStepLabel = 'MuiStepLabel',
  MuiStepper = 'MuiStepper',
  MuiSvgIcon = 'MuiSvgIcon',
  MuiSwipeableDrawer = 'MuiSwipeableDrawer',
  MuiSwitch = 'MuiSwitch',
  MuiSwitchUnstyled = 'MuiSwitchUnstyled',
  MuiTab = 'MuiTab',
  MuiTabContext = 'MuiTabContext',
  MuiTabList = 'MuiTabList',
  MuiTabPanel = 'MuiTabPanel',
  MuiTabScrollButton = 'MuiTabScrollButton',
  MuiTable = 'MuiTable',
  MuiTableBody = 'MuiTableBody',
  MuiTableCell = 'MuiTableCell',
  MuiTableContainer = 'MuiTableContainer',
  MuiTableFooter = 'MuiTableFooter',
  MuiTableHead = 'MuiTableHead',
  MuiTablePagination = 'MuiTablePagination',
  MuiTableRow = 'MuiTableRow',
  MuiTableSortLabel = 'MuiTableSortLabel',
  MuiTabs = 'MuiTabs',
  MuiTextField = 'MuiTextField',
  MuiTextareaAutosize = 'MuiTextareaAutosize',
  MuiTimePicker = 'MuiTimePicker',
  MuiTimeline = 'MuiTimeline',
  MuiTimelineConnector = 'MuiTimelineConnector',
  MuiTimelineContent = 'MuiTimelineContent',
  MuiTimelineDot = 'MuiTimelineDot',
  MuiTimelineItem = 'MuiTimelineItem',
  MuiTimelineOppositeContent = 'MuiTimelineOppositeContent',
  MuiTimelineSeparator = 'MuiTimelineSeparator',
  MuiToggleButton = 'MuiToggleButton',
  MuiToggleButtonGroup = 'MuiToggleButtonGroup',
  MuiToolbar = 'MuiToolbar',
  MuiTooltip = 'MuiTooltip',
  MuiTreeItem = 'MuiTreeItem',
  MuiTreeView = 'MuiTreeView',
  MuiTypography = 'MuiTypography',
  MuiUnstableTrapFocus = 'MuiUnstableTrapFocus',
  MuiYearPicker = 'MuiYearPicker',
  MuiZoom = 'MuiZoom',
  Query = 'Query',
  ReactFragment = 'ReactFragment',
  State = 'State',
  Text = 'Text',
  TextList = 'TextList',
}

export type AtomUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
}

export type AtomWhere = {
  AND?: InputMaybe<Array<AtomWhere>>
  OR?: InputMaybe<Array<AtomWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<InputMaybe<AtomType>>>
  type_NOT?: InputMaybe<AtomType>
  type_NOT_IN?: InputMaybe<Array<InputMaybe<AtomType>>>
}

export type CreateAppsMutationResponse = {
  __typename?: 'CreateAppsMutationResponse'
  apps: Array<App>
  info: CreateInfo
}

export type CreateAtomsMutationResponse = {
  __typename?: 'CreateAtomsMutationResponse'
  atoms: Array<Atom>
  info: CreateInfo
}

export type CreateElementsMutationResponse = {
  __typename?: 'CreateElementsMutationResponse'
  elements: Array<Element>
  info: CreateInfo
}

export type CreateInfo = {
  __typename?: 'CreateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreatePagesMutationResponse = {
  __typename?: 'CreatePagesMutationResponse'
  info: CreateInfo
  pages: Array<Page>
}

export type DateTimeAggregateSelection = {
  __typename?: 'DateTimeAggregateSelection'
  max?: Maybe<Scalars['DateTime']>
  min?: Maybe<Scalars['DateTime']>
}

export type DeleteInfo = {
  __typename?: 'DeleteInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type Element = {
  __typename?: 'Element'
  children?: Maybe<Array<Element>>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  childrenConnection: ElementChildrenConnection
  createdAt: Scalars['DateTime']
  graph: IElementGraph
  id: Scalars['ID']
  name: Scalars['String']
  ownerId: Scalars['String']
  parent?: Maybe<Element>
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>
  parentConnection: ElementParentConnection
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type ElementChildrenArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementChildrenConnectionSort>>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementParentArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementParentAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type ElementParentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementParentConnectionSort>>
  where?: InputMaybe<ElementParentConnectionWhere>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  createdAt: DateTimeAggregateSelection
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementChildrenAggregateInput = {
  AND?: InputMaybe<Array<ElementChildrenAggregateInput>>
  OR?: InputMaybe<Array<ElementChildrenAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementChildrenNodeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  connect?: InputMaybe<Array<ElementConnectInput>>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementChildrenConnectOrCreateFieldInput = {
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementChildrenConnection = {
  __typename?: 'ElementChildrenConnection'
  edges: Array<ElementChildrenRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementChildrenConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementChildrenConnectionWhere = {
  AND?: InputMaybe<Array<ElementChildrenConnectionWhere>>
  OR?: InputMaybe<Array<ElementChildrenConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementChildrenDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementChildrenDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementChildrenFieldInput = {
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
}

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
  createdAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  ownerId_EQUAL?: InputMaybe<Scalars['String']>
  ownerId_GT?: InputMaybe<Scalars['Int']>
  ownerId_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_LT?: InputMaybe<Scalars['Int']>
  ownerId_LTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  updatedAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
}

export type ElementChildrenRelationship = {
  __typename?: 'ElementChildrenRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementChildrenUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementChildrenUpdateFieldInput = {
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  disconnect?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  update?: InputMaybe<ElementChildrenUpdateConnectionInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementConnectInput = {
  children?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  parent?: InputMaybe<ElementParentConnectFieldInput>
}

export type ElementConnectOrCreateInput = {
  children?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  parent?: InputMaybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere
}

export type ElementConnectWhere = {
  node: ElementWhere
}

export type ElementCreateInput = {
  children?: InputMaybe<ElementChildrenFieldInput>
  name: Scalars['String']
  ownerId: Scalars['String']
  parent?: InputMaybe<ElementParentFieldInput>
}

export type ElementDeleteInput = {
  children?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  parent?: InputMaybe<ElementParentDeleteFieldInput>
}

export type ElementDisconnectInput = {
  children?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  parent?: InputMaybe<ElementParentDisconnectFieldInput>
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  createdAt: DateTimeAggregateSelection
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementElementParentAggregationSelection = {
  __typename?: 'ElementElementParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentNodeAggregateSelection>
}

export type ElementElementParentNodeAggregateSelection = {
  __typename?: 'ElementElementParentNodeAggregateSelection'
  createdAt: DateTimeAggregateSelection
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<ElementSort>>>
}

export type ElementParentAggregateInput = {
  AND?: InputMaybe<Array<ElementParentAggregateInput>>
  OR?: InputMaybe<Array<ElementParentAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementParentNodeAggregationWhereInput>
}

export type ElementParentConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementParentConnectOrCreateFieldInput = {
  onCreate: ElementParentConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementParentConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementParentConnection = {
  __typename?: 'ElementParentConnection'
  edges: Array<ElementParentRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementParentConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementParentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentConnectionWhere>>
  OR?: InputMaybe<Array<ElementParentConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementParentCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementParentDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementParentConnectionWhere>
}

export type ElementParentDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementParentConnectionWhere>
}

export type ElementParentFieldInput = {
  connect?: InputMaybe<ElementParentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementParentCreateFieldInput>
}

export type ElementParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>
  createdAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  ownerId_EQUAL?: InputMaybe<Scalars['String']>
  ownerId_GT?: InputMaybe<Scalars['Int']>
  ownerId_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_LT?: InputMaybe<Scalars['Int']>
  ownerId_LTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  updatedAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
}

export type ElementParentRelationship = {
  __typename?: 'ElementParentRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementParentUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementParentUpdateFieldInput = {
  connect?: InputMaybe<ElementParentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementParentCreateFieldInput>
  delete?: InputMaybe<ElementParentDeleteFieldInput>
  disconnect?: InputMaybe<ElementParentDisconnectFieldInput>
  update?: InputMaybe<ElementParentUpdateConnectionInput>
  where?: InputMaybe<ElementParentConnectionWhere>
}

export type ElementRelationInput = {
  children?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  parent?: InputMaybe<ElementParentCreateFieldInput>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  createdAt?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  ownerId?: InputMaybe<SortDirection>
  updatedAt?: InputMaybe<SortDirection>
}

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  children?: InputMaybe<Array<ElementChildrenUpdateFieldInput>>
  name?: InputMaybe<Scalars['String']>
  ownerId?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<ElementParentUpdateFieldInput>
}

export type ElementWhere = {
  AND?: InputMaybe<Array<ElementWhere>>
  OR?: InputMaybe<Array<ElementWhere>>
  children?: InputMaybe<ElementWhere>
  childrenAggregate?: InputMaybe<ElementChildrenAggregateInput>
  childrenConnection?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_NOT?: InputMaybe<ElementChildrenConnectionWhere>
  children_NOT?: InputMaybe<ElementWhere>
  createdAt?: InputMaybe<Scalars['DateTime']>
  createdAt_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  createdAt_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_NOT?: InputMaybe<Scalars['DateTime']>
  createdAt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  ownerId?: InputMaybe<Scalars['String']>
  ownerId_CONTAINS?: InputMaybe<Scalars['String']>
  ownerId_ENDS_WITH?: InputMaybe<Scalars['String']>
  ownerId_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  ownerId_NOT?: InputMaybe<Scalars['String']>
  ownerId_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  ownerId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  ownerId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  ownerId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  ownerId_STARTS_WITH?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<ElementWhere>
  parentAggregate?: InputMaybe<ElementParentAggregateInput>
  parentConnection?: InputMaybe<ElementParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<ElementParentConnectionWhere>
  parent_NOT?: InputMaybe<ElementWhere>
  updatedAt?: InputMaybe<Scalars['DateTime']>
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_NOT?: InputMaybe<Scalars['DateTime']>
  updatedAt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
}

export type IdAggregateSelection = {
  __typename?: 'IDAggregateSelection'
  longest?: Maybe<Scalars['ID']>
  shortest?: Maybe<Scalars['ID']>
}

export type IElementGraph = {
  root?: Maybe<Element>
  vertices?: Maybe<Array<Element>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createApps: CreateAppsMutationResponse
  createAtoms: CreateAtomsMutationResponse
  createElements: CreateElementsMutationResponse
  createPages: CreatePagesMutationResponse
  deleteApps: DeleteInfo
  deleteAtoms: DeleteInfo
  deleteElements: DeleteInfo
  deletePages: DeleteInfo
  deleteUsers: DeleteInfo
  updateApps: UpdateAppsMutationResponse
  updateAtoms: UpdateAtomsMutationResponse
  updateElements: UpdateElementsMutationResponse
  updatePages: UpdatePagesMutationResponse
}

export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>
}

export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>
}

export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
}

export type MutationDeleteAppsArgs = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<AppWhere>
}

export type MutationDeleteAtomsArgs = {
  where?: InputMaybe<AtomWhere>
}

export type MutationDeleteElementsArgs = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationDeletePagesArgs = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<PageWhere>
}

export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<UserWhere>
}

export type MutationUpdateAppsArgs = {
  connect?: InputMaybe<AppConnectInput>
  connectOrCreate?: InputMaybe<AppConnectOrCreateInput>
  create?: InputMaybe<AppRelationInput>
  delete?: InputMaybe<AppDeleteInput>
  disconnect?: InputMaybe<AppDisconnectInput>
  update?: InputMaybe<AppUpdateInput>
  where?: InputMaybe<AppWhere>
}

export type MutationUpdateAtomsArgs = {
  update?: InputMaybe<AtomUpdateInput>
  where?: InputMaybe<AtomWhere>
}

export type MutationUpdateElementsArgs = {
  connect?: InputMaybe<ElementConnectInput>
  connectOrCreate?: InputMaybe<ElementConnectOrCreateInput>
  create?: InputMaybe<ElementRelationInput>
  delete?: InputMaybe<ElementDeleteInput>
  disconnect?: InputMaybe<ElementDisconnectInput>
  update?: InputMaybe<ElementUpdateInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationUpdatePagesArgs = {
  connect?: InputMaybe<PageConnectInput>
  connectOrCreate?: InputMaybe<PageConnectOrCreateInput>
  create?: InputMaybe<PageRelationInput>
  delete?: InputMaybe<PageDeleteInput>
  disconnect?: InputMaybe<PageDisconnectInput>
  update?: InputMaybe<PageUpdateInput>
  where?: InputMaybe<PageWhere>
}

export type Page = {
  __typename?: 'Page'
  app?: Maybe<App>
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  appConnection: PageAppConnection
  id: Scalars['ID']
  name: Scalars['String']
  rootElement?: Maybe<Element>
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  rootElementConnection: PageRootElementConnection
}

export type PageAppArgs = {
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type PageAppAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type PageAppConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PageAppConnectionSort>>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageRootElementArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type PageRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type PageRootElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PageRootElementConnectionSort>>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageAggregateSelection = {
  __typename?: 'PageAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type PageAppAggregateInput = {
  AND?: InputMaybe<Array<PageAppAggregateInput>>
  OR?: InputMaybe<Array<PageAppAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PageAppNodeAggregationWhereInput>
}

export type PageAppAppAggregationSelection = {
  __typename?: 'PageAppAppAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageAppAppNodeAggregateSelection>
}

export type PageAppAppNodeAggregateSelection = {
  __typename?: 'PageAppAppNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type PageAppConnectFieldInput = {
  connect?: InputMaybe<AppConnectInput>
  where?: InputMaybe<AppConnectWhere>
}

export type PageAppConnectOrCreateFieldInput = {
  onCreate: PageAppConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type PageAppConnection = {
  __typename?: 'PageAppConnection'
  edges: Array<PageAppRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageAppConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type PageAppConnectionWhere = {
  AND?: InputMaybe<Array<PageAppConnectionWhere>>
  OR?: InputMaybe<Array<PageAppConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type PageAppCreateFieldInput = {
  node: AppCreateInput
}

export type PageAppDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageAppDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageAppFieldInput = {
  connect?: InputMaybe<PageAppConnectFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
  create?: InputMaybe<PageAppCreateFieldInput>
}

export type PageAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageAppRelationship = {
  __typename?: 'PageAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type PageAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type PageAppUpdateFieldInput = {
  connect?: InputMaybe<PageAppConnectFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
  create?: InputMaybe<PageAppCreateFieldInput>
  delete?: InputMaybe<PageAppDeleteFieldInput>
  disconnect?: InputMaybe<PageAppDisconnectFieldInput>
  update?: InputMaybe<PageAppUpdateConnectionInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageConnectInput = {
  app?: InputMaybe<PageAppConnectFieldInput>
  rootElement?: InputMaybe<PageRootElementConnectFieldInput>
}

export type PageConnectOrCreateInput = {
  app?: InputMaybe<PageAppConnectOrCreateFieldInput>
  rootElement?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
}

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere
}

export type PageConnectWhere = {
  node: PageWhere
}

export type PageCreateInput = {
  app?: InputMaybe<PageAppFieldInput>
  name: Scalars['String']
  rootElement?: InputMaybe<PageRootElementFieldInput>
}

export type PageDeleteInput = {
  app?: InputMaybe<PageAppDeleteFieldInput>
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>
}

export type PageDisconnectInput = {
  app?: InputMaybe<PageAppDisconnectFieldInput>
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>
}

export type PageElementRootElementAggregationSelection = {
  __typename?: 'PageElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageElementRootElementNodeAggregateSelection>
}

export type PageElementRootElementNodeAggregateSelection = {
  __typename?: 'PageElementRootElementNodeAggregateSelection'
  createdAt: DateTimeAggregateSelection
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type PageOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<PageSort>>>
}

export type PageRelationInput = {
  app?: InputMaybe<PageAppCreateFieldInput>
  rootElement?: InputMaybe<PageRootElementCreateFieldInput>
}

export type PageRootElementAggregateInput = {
  AND?: InputMaybe<Array<PageRootElementAggregateInput>>
  OR?: InputMaybe<Array<PageRootElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PageRootElementNodeAggregationWhereInput>
}

export type PageRootElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type PageRootElementConnectOrCreateFieldInput = {
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type PageRootElementConnection = {
  __typename?: 'PageRootElementConnection'
  edges: Array<PageRootElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type PageRootElementConnectionWhere = {
  AND?: InputMaybe<Array<PageRootElementConnectionWhere>>
  OR?: InputMaybe<Array<PageRootElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PageRootElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageRootElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageRootElementFieldInput = {
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<PageRootElementCreateFieldInput>
}

export type PageRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  createdAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  ownerId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  ownerId_EQUAL?: InputMaybe<Scalars['String']>
  ownerId_GT?: InputMaybe<Scalars['Int']>
  ownerId_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  ownerId_LT?: InputMaybe<Scalars['Int']>
  ownerId_LTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  updatedAt_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']>
}

export type PageRootElementRelationship = {
  __typename?: 'PageRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PageRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PageRootElementUpdateFieldInput = {
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<PageRootElementCreateFieldInput>
  delete?: InputMaybe<PageRootElementDeleteFieldInput>
  disconnect?: InputMaybe<PageRootElementDisconnectFieldInput>
  update?: InputMaybe<PageRootElementUpdateConnectionInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageUpdateInput = {
  app?: InputMaybe<PageAppUpdateFieldInput>
  name?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>
}

export type PageWhere = {
  AND?: InputMaybe<Array<PageWhere>>
  OR?: InputMaybe<Array<PageWhere>>
  app?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<PageAppAggregateInput>
  appConnection?: InputMaybe<PageAppConnectionWhere>
  appConnection_NOT?: InputMaybe<PageAppConnectionWhere>
  app_NOT?: InputMaybe<AppWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<PageRootElementAggregateInput>
  rootElementConnection?: InputMaybe<PageRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<PageRootElementConnectionWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
}

export type Query = {
  __typename?: 'Query'
  apps: Array<App>
  appsAggregate: AppAggregateSelection
  appsCount: Scalars['Int']
  atoms: Array<Atom>
  atomsAggregate: AtomAggregateSelection
  atomsCount: Scalars['Int']
  elements: Array<Element>
  elementsAggregate: ElementAggregateSelection
  elementsCount: Scalars['Int']
  pages: Array<Page>
  pagesAggregate: PageAggregateSelection
  pagesCount: Scalars['Int']
  users: Array<User>
  usersAggregate: UserAggregateSelection
  usersCount: Scalars['Int']
}

export type QueryAppsArgs = {
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryAppsCountArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryAtomsArgs = {
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsCountArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryElementsArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsCountArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryPagesArgs = {
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryPagesCountArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>
}

export type QueryUsersCountArgs = {
  where?: InputMaybe<UserWhere>
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  ASC = 'ASC',
  /** Sort by field values in descending order. */
  DESC = 'DESC',
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection'
  longest?: Maybe<Scalars['String']>
  shortest?: Maybe<Scalars['String']>
}

export type UpdateAppsMutationResponse = {
  __typename?: 'UpdateAppsMutationResponse'
  apps: Array<App>
  info: UpdateInfo
}

export type UpdateAtomsMutationResponse = {
  __typename?: 'UpdateAtomsMutationResponse'
  atoms: Array<Atom>
  info: UpdateInfo
}

export type UpdateElementsMutationResponse = {
  __typename?: 'UpdateElementsMutationResponse'
  elements: Array<Element>
  info: UpdateInfo
}

export type UpdateInfo = {
  __typename?: 'UpdateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  nodesDeleted: Scalars['Int']
  relationshipsCreated: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type UpdatePagesMutationResponse = {
  __typename?: 'UpdatePagesMutationResponse'
  info: UpdateInfo
  pages: Array<Page>
}

export type User = {
  __typename?: 'User'
  apps?: Maybe<Array<Maybe<App>>>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  appsConnection: UserAppsConnection
  auth0Id: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
}

export type UserAppsArgs = {
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type UserAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type UserAppsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserAppsConnectionSort>>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  auth0Id: StringAggregateSelection
  count: Scalars['Int']
  email: StringAggregateSelection
  id: IdAggregateSelection
}

export type UserAppAppsAggregationSelection = {
  __typename?: 'UserAppAppsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserAppAppsNodeAggregateSelection>
}

export type UserAppAppsNodeAggregateSelection = {
  __typename?: 'UserAppAppsNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type UserAppsAggregateInput = {
  AND?: InputMaybe<Array<UserAppsAggregateInput>>
  OR?: InputMaybe<Array<UserAppsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UserAppsNodeAggregationWhereInput>
}

export type UserAppsConnectFieldInput = {
  connect?: InputMaybe<Array<AppConnectInput>>
  where?: InputMaybe<AppConnectWhere>
}

export type UserAppsConnectOrCreateFieldInput = {
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type UserAppsConnection = {
  __typename?: 'UserAppsConnection'
  edges: Array<UserAppsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserAppsConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type UserAppsConnectionWhere = {
  AND?: InputMaybe<Array<UserAppsConnectionWhere>>
  OR?: InputMaybe<Array<UserAppsConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type UserAppsCreateFieldInput = {
  node: AppCreateInput
}

export type UserAppsDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserAppsDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserAppsFieldInput = {
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
}

export type UserAppsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserAppsRelationship = {
  __typename?: 'UserAppsRelationship'
  cursor: Scalars['String']
  node: App
}

export type UserAppsUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type UserAppsUpdateFieldInput = {
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
  delete?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  update?: InputMaybe<UserAppsUpdateConnectionInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserConnectInput = {
  apps?: InputMaybe<Array<UserAppsConnectFieldInput>>
}

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere
}

export type UserConnectWhere = {
  node: UserWhere
}

export type UserCreateInput = {
  apps?: InputMaybe<UserAppsFieldInput>
  auth0Id: Scalars['String']
  email: Scalars['String']
}

export type UserDeleteInput = {
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
}

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  auth0Id?: InputMaybe<SortDirection>
  email?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
}

export type UserUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type UserUpdateInput = {
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>
  auth0Id?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
}

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>
  OR?: InputMaybe<Array<UserWhere>>
  apps?: InputMaybe<AppWhere>
  appsAggregate?: InputMaybe<UserAppsAggregateInput>
  appsConnection?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_NOT?: InputMaybe<UserAppsConnectionWhere>
  apps_NOT?: InputMaybe<AppWhere>
  auth0Id?: InputMaybe<Scalars['String']>
  auth0Id_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_ENDS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  auth0Id_NOT?: InputMaybe<Scalars['String']>
  auth0Id_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  auth0Id_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_STARTS_WITH?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  email_CONTAINS?: InputMaybe<Scalars['String']>
  email_ENDS_WITH?: InputMaybe<Scalars['String']>
  email_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  email_NOT?: InputMaybe<Scalars['String']>
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  email_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  email_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
}
