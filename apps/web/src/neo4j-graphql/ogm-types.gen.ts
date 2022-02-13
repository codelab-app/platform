import { DocumentNode, SelectionSetNode } from 'graphql'

export type Maybe<T> = T | null
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
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number
  /** A date and time, represented as an ISO-8601 string */
  DateTime: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
}

export type Query = {
  __typename?: 'Query'
  users: Array<User>
  usersCount: Scalars['Int']
  usersAggregate: UserAggregateSelection
  apps: Array<App>
  appsCount: Scalars['Int']
  appsAggregate: AppAggregateSelection
  atoms: Array<Atom>
  atomsCount: Scalars['Int']
  atomsAggregate: AtomAggregateSelection
  createInfos: Array<CreateInfo>
  createInfosCount: Scalars['Int']
  createInfosAggregate: CreateInfoAggregateSelection
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
  importAtomsMutationResponsesCount: Scalars['Int']
  importAtomsMutationResponsesAggregate: ImportAtomsMutationResponseAggregateSelection
  pages: Array<Page>
  pagesCount: Scalars['Int']
  pagesAggregate: PageAggregateSelection
  tags: Array<Tag>
  tagsCount: Scalars['Int']
  tagsAggregate: TagAggregateSelection
  tagEdges: Array<TagEdge>
  tagEdgesCount: Scalars['Int']
  tagEdgesAggregate: TagEdgeAggregateSelection
  elements: Array<Element>
  elementsCount: Scalars['Int']
  elementsAggregate: ElementAggregateSelection
  tagGraphs?: Maybe<TagGraph>
}

export type QueryUsersArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type QueryUsersCountArgs = {
  where?: Maybe<UserWhere>
}

export type QueryUsersAggregateArgs = {
  where?: Maybe<UserWhere>
}

export type QueryAppsArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type QueryAppsCountArgs = {
  where?: Maybe<AppWhere>
}

export type QueryAppsAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type QueryAtomsArgs = {
  where?: Maybe<AtomWhere>
  options?: Maybe<AtomOptions>
}

export type QueryAtomsCountArgs = {
  where?: Maybe<AtomWhere>
}

export type QueryAtomsAggregateArgs = {
  where?: Maybe<AtomWhere>
}

export type QueryCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
  options?: Maybe<CreateInfoOptions>
}

export type QueryCreateInfosCountArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type QueryCreateInfosAggregateArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type QueryImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
  options?: Maybe<ImportAtomsMutationResponseOptions>
}

export type QueryImportAtomsMutationResponsesCountArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type QueryImportAtomsMutationResponsesAggregateArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type QueryPagesArgs = {
  where?: Maybe<PageWhere>
  options?: Maybe<PageOptions>
}

export type QueryPagesCountArgs = {
  where?: Maybe<PageWhere>
}

export type QueryPagesAggregateArgs = {
  where?: Maybe<PageWhere>
}

export type QueryTagsArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type QueryTagsCountArgs = {
  where?: Maybe<TagWhere>
}

export type QueryTagsAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type QueryTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
  options?: Maybe<TagEdgeOptions>
}

export type QueryTagEdgesCountArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type QueryTagEdgesAggregateArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type QueryElementsArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type QueryElementsCountArgs = {
  where?: Maybe<ElementWhere>
}

export type QueryElementsAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type Mutation = {
  __typename?: 'Mutation'
  importAtoms?: Maybe<ImportAtomsMutationResponse>
  createUsers: CreateUsersMutationResponse
  deleteUsers: DeleteInfo
  updateUsers: UpdateUsersMutationResponse
  createApps: CreateAppsMutationResponse
  deleteApps: DeleteInfo
  updateApps: UpdateAppsMutationResponse
  createAtoms: CreateAtomsMutationResponse
  deleteAtoms: DeleteInfo
  updateAtoms: UpdateAtomsMutationResponse
  createCreateInfos: CreateCreateInfosMutationResponse
  deleteCreateInfos: DeleteInfo
  updateCreateInfos: UpdateCreateInfosMutationResponse
  createImportAtomsMutationResponses: CreateImportAtomsMutationResponsesMutationResponse
  deleteImportAtomsMutationResponses: DeleteInfo
  updateImportAtomsMutationResponses: UpdateImportAtomsMutationResponsesMutationResponse
  createPages: CreatePagesMutationResponse
  deletePages: DeleteInfo
  updatePages: UpdatePagesMutationResponse
  createTags: CreateTagsMutationResponse
  deleteTags: DeleteInfo
  updateTags: UpdateTagsMutationResponse
  createTagEdges: CreateTagEdgesMutationResponse
  deleteTagEdges: DeleteInfo
  updateTagEdges: UpdateTagEdgesMutationResponse
  createElements: CreateElementsMutationResponse
  deleteElements: DeleteInfo
  updateElements: UpdateElementsMutationResponse
}

export type MutationImportAtomsArgs = {
  input: ImportAtomsInput
}

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>
}

export type MutationDeleteUsersArgs = {
  where?: Maybe<UserWhere>
  delete?: Maybe<UserDeleteInput>
}

export type MutationUpdateUsersArgs = {
  where?: Maybe<UserWhere>
  update?: Maybe<UserUpdateInput>
  connect?: Maybe<UserConnectInput>
  disconnect?: Maybe<UserDisconnectInput>
  create?: Maybe<UserRelationInput>
  delete?: Maybe<UserDeleteInput>
  connectOrCreate?: Maybe<UserConnectOrCreateInput>
}

export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>
}

export type MutationDeleteAppsArgs = {
  where?: Maybe<AppWhere>
  delete?: Maybe<AppDeleteInput>
}

export type MutationUpdateAppsArgs = {
  where?: Maybe<AppWhere>
  update?: Maybe<AppUpdateInput>
  connect?: Maybe<AppConnectInput>
  disconnect?: Maybe<AppDisconnectInput>
  create?: Maybe<AppRelationInput>
  delete?: Maybe<AppDeleteInput>
  connectOrCreate?: Maybe<AppConnectOrCreateInput>
}

export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>
}

export type MutationDeleteAtomsArgs = {
  where?: Maybe<AtomWhere>
}

export type MutationUpdateAtomsArgs = {
  where?: Maybe<AtomWhere>
  update?: Maybe<AtomUpdateInput>
}

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>
}

export type MutationDeleteCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type MutationUpdateCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
  update?: Maybe<CreateInfoUpdateInput>
}

export type MutationCreateImportAtomsMutationResponsesArgs = {
  input: Array<ImportAtomsMutationResponseCreateInput>
}

export type MutationDeleteImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type MutationUpdateImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
  update?: Maybe<ImportAtomsMutationResponseUpdateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
}

export type MutationDeletePagesArgs = {
  where?: Maybe<PageWhere>
  delete?: Maybe<PageDeleteInput>
}

export type MutationUpdatePagesArgs = {
  where?: Maybe<PageWhere>
  update?: Maybe<PageUpdateInput>
  connect?: Maybe<PageConnectInput>
  disconnect?: Maybe<PageDisconnectInput>
  create?: Maybe<PageRelationInput>
  delete?: Maybe<PageDeleteInput>
  connectOrCreate?: Maybe<PageConnectOrCreateInput>
}

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>
}

export type MutationDeleteTagsArgs = {
  where?: Maybe<TagWhere>
  delete?: Maybe<TagDeleteInput>
}

export type MutationUpdateTagsArgs = {
  where?: Maybe<TagWhere>
  update?: Maybe<TagUpdateInput>
  connect?: Maybe<TagConnectInput>
  disconnect?: Maybe<TagDisconnectInput>
  create?: Maybe<TagRelationInput>
  delete?: Maybe<TagDeleteInput>
  connectOrCreate?: Maybe<TagConnectOrCreateInput>
}

export type MutationCreateTagEdgesArgs = {
  input: Array<TagEdgeCreateInput>
}

export type MutationDeleteTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type MutationUpdateTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
  update?: Maybe<TagEdgeUpdateInput>
}

export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>
}

export type MutationDeleteElementsArgs = {
  where?: Maybe<ElementWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type MutationUpdateElementsArgs = {
  where?: Maybe<ElementWhere>
  update?: Maybe<ElementUpdateInput>
  connect?: Maybe<ElementConnectInput>
  disconnect?: Maybe<ElementDisconnectInput>
  create?: Maybe<ElementRelationInput>
  delete?: Maybe<ElementDeleteInput>
  connectOrCreate?: Maybe<ElementConnectOrCreateInput>
}

export enum AtomType {
  HookQueryLambda = 'HookQueryLambda',
  HookQueryConfig = 'HookQueryConfig',
  HookGraphqlQuery = 'HookGraphqlQuery',
  HookGraphqlMutation = 'HookGraphqlMutation',
  HookRecoilState = 'HookRecoilState',
  HookQueryPage = 'HookQueryPage',
  HookQueryPages = 'HookQueryPages',
  HookRouter = 'HookRouter',
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
  MuiGridColDef = 'MuiGridColDef',
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
  TextList = 'TextList',
  Text = 'Text',
  State = 'State',
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

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type IElementGraph = {
  root?: Maybe<Element>
  vertices?: Maybe<Array<Element>>
}

export type TagGraph = {
  /** All descendant Elements or Components, at any level */
  vertices: Array<Tag>
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  owner?: Maybe<Array<Maybe<User>>>
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  pages?: Maybe<Array<Maybe<Page>>>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  ownerConnection: AppOwnerConnection
  pagesConnection: AppPagesConnection
}

export type AppOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type AppOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

export type AppPagesArgs = {
  where?: Maybe<PageWhere>
  options?: Maybe<PageOptions>
}

export type AppPagesAggregateArgs = {
  where?: Maybe<PageWhere>
}

export type AppOwnerConnectionArgs = {
  where?: Maybe<AppOwnerConnectionWhere>
  sort?: Maybe<Array<AppOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AppPagesConnectionArgs = {
  where?: Maybe<AppPagesConnectionWhere>
  sort?: Maybe<Array<AppPagesConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type AppOwnerConnection = {
  __typename?: 'AppOwnerConnection'
  edges: Array<AppOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppOwnerRelationship = {
  __typename?: 'AppOwnerRelationship'
  cursor: Scalars['String']
  node: User
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

export type AppPagesConnection = {
  __typename?: 'AppPagesConnection'
  edges: Array<AppPagesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppPagesRelationship = {
  __typename?: 'AppPagesRelationship'
  cursor: Scalars['String']
  node: Page
}

export type AppUserOwnerAggregationSelection = {
  __typename?: 'AppUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: 'AppUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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

export type CreateAppsMutationResponse = {
  __typename?: 'CreateAppsMutationResponse'
  info: CreateInfo
  apps: Array<App>
}

export type CreateAtomsMutationResponse = {
  __typename?: 'CreateAtomsMutationResponse'
  info: CreateInfo
  atoms: Array<Atom>
}

export type CreateCreateInfosMutationResponse = {
  __typename?: 'CreateCreateInfosMutationResponse'
  info: CreateInfo
  createInfos: Array<CreateInfo>
}

export type CreateElementsMutationResponse = {
  __typename?: 'CreateElementsMutationResponse'
  info: CreateInfo
  elements: Array<Element>
}

export type CreateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'CreateImportAtomsMutationResponsesMutationResponse'
  info: CreateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
}

export type CreateInfo = {
  __typename?: 'CreateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoAggregateSelection = {
  __typename?: 'CreateInfoAggregateSelection'
  count: Scalars['Int']
  bookmark: StringAggregateSelection
  nodesCreated: IntAggregateSelection
  relationshipsCreated: IntAggregateSelection
}

export type CreatePagesMutationResponse = {
  __typename?: 'CreatePagesMutationResponse'
  info: CreateInfo
  pages: Array<Page>
}

export type CreateTagEdgesMutationResponse = {
  __typename?: 'CreateTagEdgesMutationResponse'
  info: CreateInfo
  tagEdges: Array<TagEdge>
}

export type CreateTagsMutationResponse = {
  __typename?: 'CreateTagsMutationResponse'
  info: CreateInfo
  tags: Array<Tag>
}

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse'
  info: CreateInfo
  users: Array<User>
}

export type DateTimeAggregateSelection = {
  __typename?: 'DateTimeAggregateSelection'
  min?: Maybe<Scalars['DateTime']>
  max?: Maybe<Scalars['DateTime']>
}

export type DeleteInfo = {
  __typename?: 'DeleteInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type Element = {
  __typename?: 'Element'
  id: Scalars['ID']
  name: Scalars['String']
  ownerId: Scalars['String']
  graph: IElementGraph
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
  parent?: Maybe<Element>
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>
  children?: Maybe<Array<Element>>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  parentConnection: ElementParentConnection
  childrenConnection: ElementChildrenConnection
}

export type ElementParentArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementParentAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementChildrenArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementChildrenAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementParentConnectionArgs = {
  where?: Maybe<ElementParentConnectionWhere>
  sort?: Maybe<Array<ElementParentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementChildrenConnectionArgs = {
  where?: Maybe<ElementChildrenConnectionWhere>
  sort?: Maybe<Array<ElementChildrenConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementChildrenConnection = {
  __typename?: 'ElementChildrenConnection'
  edges: Array<ElementChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementChildrenRelationship = {
  __typename?: 'ElementChildrenRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementElementParentAggregationSelection = {
  __typename?: 'ElementElementParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentNodeAggregateSelection>
}

export type ElementElementParentNodeAggregateSelection = {
  __typename?: 'ElementElementParentNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementParentConnection = {
  __typename?: 'ElementParentConnection'
  edges: Array<ElementParentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementParentRelationship = {
  __typename?: 'ElementParentRelationship'
  cursor: Scalars['String']
  node: Element
}

export type IdAggregateSelection = {
  __typename?: 'IDAggregateSelection'
  shortest?: Maybe<Scalars['ID']>
  longest?: Maybe<Scalars['ID']>
}

export type ImportAtomsMutationResponse = {
  __typename?: 'ImportAtomsMutationResponse'
  atoms?: Maybe<Array<Atom>>
}

export type ImportAtomsMutationResponseAggregateSelection = {
  __typename?: 'ImportAtomsMutationResponseAggregateSelection'
  count: Scalars['Int']
}

export type IntAggregateSelection = {
  __typename?: 'IntAggregateSelection'
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
  average?: Maybe<Scalars['Float']>
  sum?: Maybe<Scalars['Int']>
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['ID']
  name: Scalars['String']
  rootElement?: Maybe<Element>
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  app?: Maybe<App>
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  rootElementConnection: PageRootElementConnection
  appConnection: PageAppConnection
}

export type PageRootElementArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type PageRootElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type PageAppArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type PageAppAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type PageRootElementConnectionArgs = {
  where?: Maybe<PageRootElementConnectionWhere>
  sort?: Maybe<Array<PageRootElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PageAppConnectionArgs = {
  where?: Maybe<PageAppConnectionWhere>
  sort?: Maybe<Array<PageAppConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PageAggregateSelection = {
  __typename?: 'PageAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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

export type PageAppConnection = {
  __typename?: 'PageAppConnection'
  edges: Array<PageAppRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PageAppRelationship = {
  __typename?: 'PageAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type PageElementRootElementAggregationSelection = {
  __typename?: 'PageElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageElementRootElementNodeAggregateSelection>
}

export type PageElementRootElementNodeAggregateSelection = {
  __typename?: 'PageElementRootElementNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type PageRootElementConnection = {
  __typename?: 'PageRootElementConnection'
  edges: Array<PageRootElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PageRootElementRelationship = {
  __typename?: 'PageRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection'
  shortest?: Maybe<Scalars['String']>
  longest?: Maybe<Scalars['String']>
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['ID']
  name: Scalars['String']
  isRoot?: Maybe<Scalars['Boolean']>
  parent?: Maybe<Tag>
  parentAggregate?: Maybe<TagTagParentAggregationSelection>
  children?: Maybe<Array<Maybe<Tag>>>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  parentConnection: TagParentConnection
  childrenConnection: TagChildrenConnection
}

export type TagParentArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type TagParentAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type TagChildrenArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type TagChildrenAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type TagParentConnectionArgs = {
  where?: Maybe<TagParentConnectionWhere>
  sort?: Maybe<Array<TagParentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type TagChildrenConnectionArgs = {
  where?: Maybe<TagChildrenConnectionWhere>
  sort?: Maybe<Array<TagChildrenConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type TagAggregateSelection = {
  __typename?: 'TagAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type TagChildrenConnection = {
  __typename?: 'TagChildrenConnection'
  edges: Array<TagChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TagChildrenRelationship = {
  __typename?: 'TagChildrenRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagEdge = {
  __typename?: 'TagEdge'
  source: Scalars['ID']
  target: Scalars['ID']
}

export type TagEdgeAggregateSelection = {
  __typename?: 'TagEdgeAggregateSelection'
  count: Scalars['Int']
  source: IdAggregateSelection
  target: IdAggregateSelection
}

export type TagParentConnection = {
  __typename?: 'TagParentConnection'
  edges: Array<TagParentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TagParentRelationship = {
  __typename?: 'TagParentRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagTagChildrenAggregationSelection = {
  __typename?: 'TagTagChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagTagChildrenNodeAggregateSelection>
}

export type TagTagChildrenNodeAggregateSelection = {
  __typename?: 'TagTagChildrenNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type TagTagParentAggregationSelection = {
  __typename?: 'TagTagParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagTagParentNodeAggregateSelection>
}

export type TagTagParentNodeAggregateSelection = {
  __typename?: 'TagTagParentNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type UpdateAppsMutationResponse = {
  __typename?: 'UpdateAppsMutationResponse'
  info: UpdateInfo
  apps: Array<App>
}

export type UpdateAtomsMutationResponse = {
  __typename?: 'UpdateAtomsMutationResponse'
  info: UpdateInfo
  atoms: Array<Atom>
}

export type UpdateCreateInfosMutationResponse = {
  __typename?: 'UpdateCreateInfosMutationResponse'
  info: UpdateInfo
  createInfos: Array<CreateInfo>
}

export type UpdateElementsMutationResponse = {
  __typename?: 'UpdateElementsMutationResponse'
  info: UpdateInfo
  elements: Array<Element>
}

export type UpdateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'UpdateImportAtomsMutationResponsesMutationResponse'
  info: UpdateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
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

export type UpdateTagEdgesMutationResponse = {
  __typename?: 'UpdateTagEdgesMutationResponse'
  info: UpdateInfo
  tagEdges: Array<TagEdge>
}

export type UpdateTagsMutationResponse = {
  __typename?: 'UpdateTagsMutationResponse'
  info: UpdateInfo
  tags: Array<Tag>
}

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse'
  info: UpdateInfo
  users: Array<User>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  auth0Id: Scalars['String']
  email: Scalars['String']
  apps?: Maybe<Array<Maybe<App>>>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  appsConnection: UserAppsConnection
}

export type UserAppsArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type UserAppsAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type UserAppsConnectionArgs = {
  where?: Maybe<UserAppsConnectionWhere>
  sort?: Maybe<Array<UserAppsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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

export type UserAppsConnection = {
  __typename?: 'UserAppsConnection'
  edges: Array<UserAppsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserAppsRelationship = {
  __typename?: 'UserAppsRelationship'
  cursor: Scalars['String']
  node: App
}

export type AppConnectInput = {
  owner?: Maybe<Array<AppOwnerConnectFieldInput>>
  pages?: Maybe<Array<AppPagesConnectFieldInput>>
}

export type AppConnectOrCreateInput = {
  owner?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
  pages?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  name: Scalars['String']
  owner?: Maybe<AppOwnerFieldInput>
  pages?: Maybe<AppPagesFieldInput>
}

export type AppDeleteInput = {
  owner?: Maybe<Array<AppOwnerDeleteFieldInput>>
  pages?: Maybe<Array<AppPagesDeleteFieldInput>>
}

export type AppDisconnectInput = {
  owner?: Maybe<Array<AppOwnerDisconnectFieldInput>>
  pages?: Maybe<Array<AppPagesDisconnectFieldInput>>
}

export type AppOptions = {
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AppSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AppOwnerAggregateInput>>
  OR?: Maybe<Array<AppOwnerAggregateInput>>
  node?: Maybe<AppOwnerNodeAggregationWhereInput>
}

export type AppOwnerConnectFieldInput = {
  where?: Maybe<UserConnectWhere>
  connect?: Maybe<Array<UserConnectInput>>
}

export type AppOwnerConnectionSort = {
  node?: Maybe<UserSort>
}

export type AppOwnerConnectionWhere = {
  AND?: Maybe<Array<AppOwnerConnectionWhere>>
  OR?: Maybe<Array<AppOwnerConnectionWhere>>
  node?: Maybe<UserWhere>
  node_NOT?: Maybe<UserWhere>
}

export type AppOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: AppOwnerConnectOrCreateFieldInputOnCreate
}

export type AppOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserCreateInput
}

export type AppOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type AppOwnerDeleteFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  delete?: Maybe<UserDeleteInput>
}

export type AppOwnerDisconnectFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  disconnect?: Maybe<UserDisconnectInput>
}

export type AppOwnerFieldInput = {
  create?: Maybe<Array<AppOwnerCreateFieldInput>>
  connect?: Maybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
}

export type AppOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<AppOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<AppOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AppOwnerUpdateConnectionInput = {
  node?: Maybe<UserUpdateInput>
}

export type AppOwnerUpdateFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  update?: Maybe<AppOwnerUpdateConnectionInput>
  connect?: Maybe<Array<AppOwnerConnectFieldInput>>
  disconnect?: Maybe<Array<AppOwnerDisconnectFieldInput>>
  create?: Maybe<Array<AppOwnerCreateFieldInput>>
  delete?: Maybe<Array<AppOwnerDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
}

export type AppPagesAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AppPagesAggregateInput>>
  OR?: Maybe<Array<AppPagesAggregateInput>>
  node?: Maybe<AppPagesNodeAggregationWhereInput>
}

export type AppPagesConnectFieldInput = {
  where?: Maybe<PageConnectWhere>
  connect?: Maybe<Array<PageConnectInput>>
}

export type AppPagesConnectionSort = {
  node?: Maybe<PageSort>
}

export type AppPagesConnectionWhere = {
  AND?: Maybe<Array<AppPagesConnectionWhere>>
  OR?: Maybe<Array<AppPagesConnectionWhere>>
  node?: Maybe<PageWhere>
  node_NOT?: Maybe<PageWhere>
}

export type AppPagesConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate
}

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageCreateInput
}

export type AppPagesCreateFieldInput = {
  node: PageCreateInput
}

export type AppPagesDeleteFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  delete?: Maybe<PageDeleteInput>
}

export type AppPagesDisconnectFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  disconnect?: Maybe<PageDisconnectInput>
}

export type AppPagesFieldInput = {
  create?: Maybe<Array<AppPagesCreateFieldInput>>
  connect?: Maybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppPagesNodeAggregationWhereInput = {
  AND?: Maybe<Array<AppPagesNodeAggregationWhereInput>>
  OR?: Maybe<Array<AppPagesNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AppPagesUpdateConnectionInput = {
  node?: Maybe<PageUpdateInput>
}

export type AppPagesUpdateFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  update?: Maybe<AppPagesUpdateConnectionInput>
  connect?: Maybe<Array<AppPagesConnectFieldInput>>
  disconnect?: Maybe<Array<AppPagesDisconnectFieldInput>>
  create?: Maybe<Array<AppPagesCreateFieldInput>>
  delete?: Maybe<Array<AppPagesDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppRelationInput = {
  owner?: Maybe<Array<AppOwnerCreateFieldInput>>
  pages?: Maybe<Array<AppPagesCreateFieldInput>>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type AppUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type AppUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<Array<AppOwnerUpdateFieldInput>>
  pages?: Maybe<Array<AppPagesUpdateFieldInput>>
}

export type AppWhere = {
  OR?: Maybe<Array<AppWhere>>
  AND?: Maybe<Array<AppWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<AppOwnerAggregateInput>
  pages?: Maybe<PageWhere>
  pages_NOT?: Maybe<PageWhere>
  pagesAggregate?: Maybe<AppPagesAggregateInput>
  ownerConnection?: Maybe<AppOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<AppOwnerConnectionWhere>
  pagesConnection?: Maybe<AppPagesConnectionWhere>
  pagesConnection_NOT?: Maybe<AppPagesConnectionWhere>
}

export type AtomCreateInput = {
  name: Scalars['String']
  type: AtomType
}

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AtomSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  type?: Maybe<SortDirection>
}

export type AtomUpdateInput = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
}

export type AtomWhere = {
  OR?: Maybe<Array<AtomWhere>>
  AND?: Maybe<Array<AtomWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
  type_NOT?: Maybe<AtomType>
  type_IN?: Maybe<Array<Maybe<AtomType>>>
  type_NOT_IN?: Maybe<Array<Maybe<AtomType>>>
}

export type CreateInfoCreateInput = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoOptions = {
  /** Specify one or more CreateInfoSort objects to sort CreateInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<CreateInfoSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort CreateInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one CreateInfoSort object. */
export type CreateInfoSort = {
  bookmark?: Maybe<SortDirection>
  nodesCreated?: Maybe<SortDirection>
  relationshipsCreated?: Maybe<SortDirection>
}

export type CreateInfoUpdateInput = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated?: Maybe<Scalars['Int']>
  relationshipsCreated?: Maybe<Scalars['Int']>
}

export type CreateInfoWhere = {
  OR?: Maybe<Array<CreateInfoWhere>>
  AND?: Maybe<Array<CreateInfoWhere>>
  bookmark?: Maybe<Scalars['String']>
  bookmark_NOT?: Maybe<Scalars['String']>
  bookmark_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  bookmark_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  bookmark_CONTAINS?: Maybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: Maybe<Scalars['String']>
  bookmark_STARTS_WITH?: Maybe<Scalars['String']>
  bookmark_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  bookmark_ENDS_WITH?: Maybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  nodesCreated?: Maybe<Scalars['Int']>
  nodesCreated_NOT?: Maybe<Scalars['Int']>
  nodesCreated_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesCreated_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesCreated_LT?: Maybe<Scalars['Int']>
  nodesCreated_LTE?: Maybe<Scalars['Int']>
  nodesCreated_GT?: Maybe<Scalars['Int']>
  nodesCreated_GTE?: Maybe<Scalars['Int']>
  relationshipsCreated?: Maybe<Scalars['Int']>
  relationshipsCreated_NOT?: Maybe<Scalars['Int']>
  relationshipsCreated_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsCreated_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsCreated_LT?: Maybe<Scalars['Int']>
  relationshipsCreated_LTE?: Maybe<Scalars['Int']>
  relationshipsCreated_GT?: Maybe<Scalars['Int']>
  relationshipsCreated_GTE?: Maybe<Scalars['Int']>
}

export type ElementChildrenAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementChildrenAggregateInput>>
  OR?: Maybe<Array<ElementChildrenAggregateInput>>
  node?: Maybe<ElementChildrenNodeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<Array<ElementConnectInput>>
}

export type ElementChildrenConnectionSort = {
  node?: Maybe<ElementSort>
}

export type ElementChildrenConnectionWhere = {
  AND?: Maybe<Array<ElementChildrenConnectionWhere>>
  OR?: Maybe<Array<ElementChildrenConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementChildrenConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementChildrenDeleteFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementChildrenDisconnectFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementChildrenFieldInput = {
  create?: Maybe<Array<ElementChildrenCreateFieldInput>>
  connect?: Maybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementChildrenNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementChildrenNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type ElementChildrenUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type ElementChildrenUpdateFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  update?: Maybe<ElementChildrenUpdateConnectionInput>
  connect?: Maybe<Array<ElementChildrenConnectFieldInput>>
  disconnect?: Maybe<Array<ElementChildrenDisconnectFieldInput>>
  create?: Maybe<Array<ElementChildrenCreateFieldInput>>
  delete?: Maybe<Array<ElementChildrenDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementConnectInput = {
  parent?: Maybe<ElementParentConnectFieldInput>
  children?: Maybe<Array<ElementChildrenConnectFieldInput>>
}

export type ElementConnectOrCreateInput = {
  parent?: Maybe<ElementParentConnectOrCreateFieldInput>
  children?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere
}

export type ElementConnectWhere = {
  node: ElementWhere
}

export type ElementCreateInput = {
  name: Scalars['String']
  ownerId: Scalars['String']
  parent?: Maybe<ElementParentFieldInput>
  children?: Maybe<ElementChildrenFieldInput>
}

export type ElementDeleteInput = {
  parent?: Maybe<ElementParentDeleteFieldInput>
  children?: Maybe<Array<ElementChildrenDeleteFieldInput>>
}

export type ElementDisconnectInput = {
  parent?: Maybe<ElementParentDisconnectFieldInput>
  children?: Maybe<Array<ElementChildrenDisconnectFieldInput>>
}

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementParentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementParentAggregateInput>>
  OR?: Maybe<Array<ElementParentAggregateInput>>
  node?: Maybe<ElementParentNodeAggregationWhereInput>
}

export type ElementParentConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type ElementParentConnectionSort = {
  node?: Maybe<ElementSort>
}

export type ElementParentConnectionWhere = {
  AND?: Maybe<Array<ElementParentConnectionWhere>>
  OR?: Maybe<Array<ElementParentConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementParentConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementParentConnectOrCreateFieldInputOnCreate
}

export type ElementParentConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementParentCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementParentDeleteFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementParentDisconnectFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementParentFieldInput = {
  create?: Maybe<ElementParentCreateFieldInput>
  connect?: Maybe<ElementParentConnectFieldInput>
  connectOrCreate?: Maybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementParentNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementParentNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementParentNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type ElementParentUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type ElementParentUpdateFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  update?: Maybe<ElementParentUpdateConnectionInput>
  connect?: Maybe<ElementParentConnectFieldInput>
  disconnect?: Maybe<ElementParentDisconnectFieldInput>
  create?: Maybe<ElementParentCreateFieldInput>
  delete?: Maybe<ElementParentDeleteFieldInput>
  connectOrCreate?: Maybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementRelationInput = {
  parent?: Maybe<ElementParentCreateFieldInput>
  children?: Maybe<Array<ElementChildrenCreateFieldInput>>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  ownerId?: Maybe<SortDirection>
  createdAt?: Maybe<SortDirection>
  updatedAt?: Maybe<SortDirection>
}

export type ElementUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
  parent?: Maybe<ElementParentUpdateFieldInput>
  children?: Maybe<Array<ElementChildrenUpdateFieldInput>>
}

export type ElementWhere = {
  OR?: Maybe<Array<ElementWhere>>
  AND?: Maybe<Array<ElementWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
  ownerId_NOT?: Maybe<Scalars['String']>
  ownerId_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  ownerId_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  ownerId_CONTAINS?: Maybe<Scalars['String']>
  ownerId_NOT_CONTAINS?: Maybe<Scalars['String']>
  ownerId_STARTS_WITH?: Maybe<Scalars['String']>
  ownerId_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  ownerId_ENDS_WITH?: Maybe<Scalars['String']>
  ownerId_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_NOT?: Maybe<Scalars['DateTime']>
  createdAt_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  createdAt_NOT_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_NOT?: Maybe<Scalars['DateTime']>
  updatedAt_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updatedAt_NOT_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  parent?: Maybe<ElementWhere>
  parent_NOT?: Maybe<ElementWhere>
  parentAggregate?: Maybe<ElementParentAggregateInput>
  children?: Maybe<ElementWhere>
  children_NOT?: Maybe<ElementWhere>
  childrenAggregate?: Maybe<ElementChildrenAggregateInput>
  parentConnection?: Maybe<ElementParentConnectionWhere>
  parentConnection_NOT?: Maybe<ElementParentConnectionWhere>
  childrenConnection?: Maybe<ElementChildrenConnectionWhere>
  childrenConnection_NOT?: Maybe<ElementChildrenConnectionWhere>
}

export type ImportAtomsInput = {
  payload: Scalars['JSONObject']
}

export type ImportAtomsMutationResponseCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type ImportAtomsMutationResponseOptions = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ImportAtomsMutationResponseUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type ImportAtomsMutationResponseWhere = {
  OR?: Maybe<Array<ImportAtomsMutationResponseWhere>>
  AND?: Maybe<Array<ImportAtomsMutationResponseWhere>>
}

export type PageAppAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PageAppAggregateInput>>
  OR?: Maybe<Array<PageAppAggregateInput>>
  node?: Maybe<PageAppNodeAggregationWhereInput>
}

export type PageAppConnectFieldInput = {
  where?: Maybe<AppConnectWhere>
  connect?: Maybe<AppConnectInput>
}

export type PageAppConnectionSort = {
  node?: Maybe<AppSort>
}

export type PageAppConnectionWhere = {
  AND?: Maybe<Array<PageAppConnectionWhere>>
  OR?: Maybe<Array<PageAppConnectionWhere>>
  node?: Maybe<AppWhere>
  node_NOT?: Maybe<AppWhere>
}

export type PageAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: PageAppConnectOrCreateFieldInputOnCreate
}

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type PageAppCreateFieldInput = {
  node: AppCreateInput
}

export type PageAppDeleteFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  delete?: Maybe<AppDeleteInput>
}

export type PageAppDisconnectFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  disconnect?: Maybe<AppDisconnectInput>
}

export type PageAppFieldInput = {
  create?: Maybe<PageAppCreateFieldInput>
  connect?: Maybe<PageAppConnectFieldInput>
  connectOrCreate?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageAppNodeAggregationWhereInput = {
  AND?: Maybe<Array<PageAppNodeAggregationWhereInput>>
  OR?: Maybe<Array<PageAppNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PageAppUpdateConnectionInput = {
  node?: Maybe<AppUpdateInput>
}

export type PageAppUpdateFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  update?: Maybe<PageAppUpdateConnectionInput>
  connect?: Maybe<PageAppConnectFieldInput>
  disconnect?: Maybe<PageAppDisconnectFieldInput>
  create?: Maybe<PageAppCreateFieldInput>
  delete?: Maybe<PageAppDeleteFieldInput>
  connectOrCreate?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectInput = {
  rootElement?: Maybe<PageRootElementConnectFieldInput>
  app?: Maybe<PageAppConnectFieldInput>
}

export type PageConnectOrCreateInput = {
  rootElement?: Maybe<PageRootElementConnectOrCreateFieldInput>
  app?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere
}

export type PageConnectWhere = {
  node: PageWhere
}

export type PageCreateInput = {
  name: Scalars['String']
  rootElement?: Maybe<PageRootElementFieldInput>
  app?: Maybe<PageAppFieldInput>
}

export type PageDeleteInput = {
  rootElement?: Maybe<PageRootElementDeleteFieldInput>
  app?: Maybe<PageAppDeleteFieldInput>
}

export type PageDisconnectInput = {
  rootElement?: Maybe<PageRootElementDisconnectFieldInput>
  app?: Maybe<PageAppDisconnectFieldInput>
}

export type PageOptions = {
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PageSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PageRelationInput = {
  rootElement?: Maybe<PageRootElementCreateFieldInput>
  app?: Maybe<PageAppCreateFieldInput>
}

export type PageRootElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PageRootElementAggregateInput>>
  OR?: Maybe<Array<PageRootElementAggregateInput>>
  node?: Maybe<PageRootElementNodeAggregationWhereInput>
}

export type PageRootElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type PageRootElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type PageRootElementConnectionWhere = {
  AND?: Maybe<Array<PageRootElementConnectionWhere>>
  OR?: Maybe<Array<PageRootElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type PageRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate
}

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PageRootElementDeleteFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type PageRootElementDisconnectFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type PageRootElementFieldInput = {
  create?: Maybe<PageRootElementCreateFieldInput>
  connect?: Maybe<PageRootElementConnectFieldInput>
  connectOrCreate?: Maybe<PageRootElementConnectOrCreateFieldInput>
}

export type PageRootElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<PageRootElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<PageRootElementNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type PageRootElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type PageRootElementUpdateFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  update?: Maybe<PageRootElementUpdateConnectionInput>
  connect?: Maybe<PageRootElementConnectFieldInput>
  disconnect?: Maybe<PageRootElementDisconnectFieldInput>
  create?: Maybe<PageRootElementCreateFieldInput>
  delete?: Maybe<PageRootElementDeleteFieldInput>
  connectOrCreate?: Maybe<PageRootElementConnectOrCreateFieldInput>
}

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type PageUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type PageUpdateInput = {
  name?: Maybe<Scalars['String']>
  rootElement?: Maybe<PageRootElementUpdateFieldInput>
  app?: Maybe<PageAppUpdateFieldInput>
}

export type PageWhere = {
  OR?: Maybe<Array<PageWhere>>
  AND?: Maybe<Array<PageWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  rootElement?: Maybe<ElementWhere>
  rootElement_NOT?: Maybe<ElementWhere>
  rootElementAggregate?: Maybe<PageRootElementAggregateInput>
  app?: Maybe<AppWhere>
  app_NOT?: Maybe<AppWhere>
  appAggregate?: Maybe<PageAppAggregateInput>
  rootElementConnection?: Maybe<PageRootElementConnectionWhere>
  rootElementConnection_NOT?: Maybe<PageRootElementConnectionWhere>
  appConnection?: Maybe<PageAppConnectionWhere>
  appConnection_NOT?: Maybe<PageAppConnectionWhere>
}

export type TagChildrenAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<TagChildrenAggregateInput>>
  OR?: Maybe<Array<TagChildrenAggregateInput>>
  node?: Maybe<TagChildrenNodeAggregationWhereInput>
}

export type TagChildrenConnectFieldInput = {
  where?: Maybe<TagConnectWhere>
  connect?: Maybe<Array<TagConnectInput>>
}

export type TagChildrenConnectionSort = {
  node?: Maybe<TagSort>
}

export type TagChildrenConnectionWhere = {
  AND?: Maybe<Array<TagChildrenConnectionWhere>>
  OR?: Maybe<Array<TagChildrenConnectionWhere>>
  node?: Maybe<TagWhere>
  node_NOT?: Maybe<TagWhere>
}

export type TagChildrenConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagChildrenConnectOrCreateFieldInputOnCreate
}

export type TagChildrenConnectOrCreateFieldInputOnCreate = {
  node: TagCreateInput
}

export type TagChildrenCreateFieldInput = {
  node: TagCreateInput
}

export type TagChildrenDeleteFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  delete?: Maybe<TagDeleteInput>
}

export type TagChildrenDisconnectFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  disconnect?: Maybe<TagDisconnectInput>
}

export type TagChildrenFieldInput = {
  create?: Maybe<Array<TagChildrenCreateFieldInput>>
  connect?: Maybe<Array<TagChildrenConnectFieldInput>>
  connectOrCreate?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagChildrenNodeAggregationWhereInput = {
  AND?: Maybe<Array<TagChildrenNodeAggregationWhereInput>>
  OR?: Maybe<Array<TagChildrenNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type TagChildrenUpdateConnectionInput = {
  node?: Maybe<TagUpdateInput>
}

export type TagChildrenUpdateFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  update?: Maybe<TagChildrenUpdateConnectionInput>
  connect?: Maybe<Array<TagChildrenConnectFieldInput>>
  disconnect?: Maybe<Array<TagChildrenDisconnectFieldInput>>
  create?: Maybe<Array<TagChildrenCreateFieldInput>>
  delete?: Maybe<Array<TagChildrenDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectInput = {
  parent?: Maybe<TagParentConnectFieldInput>
  children?: Maybe<Array<TagChildrenConnectFieldInput>>
}

export type TagConnectOrCreateInput = {
  parent?: Maybe<TagParentConnectOrCreateFieldInput>
  children?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere
}

export type TagConnectWhere = {
  node: TagWhere
}

export type TagCreateInput = {
  name: Scalars['String']
  isRoot?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagParentFieldInput>
  children?: Maybe<TagChildrenFieldInput>
}

export type TagDeleteInput = {
  parent?: Maybe<TagParentDeleteFieldInput>
  children?: Maybe<Array<TagChildrenDeleteFieldInput>>
}

export type TagDisconnectInput = {
  parent?: Maybe<TagParentDisconnectFieldInput>
  children?: Maybe<Array<TagChildrenDisconnectFieldInput>>
}

export type TagEdgeCreateInput = {
  source: Scalars['ID']
  target: Scalars['ID']
}

export type TagEdgeOptions = {
  /** Specify one or more TagEdgeSort objects to sort TagEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TagEdgeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort TagEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagEdgeSort object. */
export type TagEdgeSort = {
  source?: Maybe<SortDirection>
  target?: Maybe<SortDirection>
}

export type TagEdgeUpdateInput = {
  source?: Maybe<Scalars['ID']>
  target?: Maybe<Scalars['ID']>
}

export type TagEdgeWhere = {
  OR?: Maybe<Array<TagEdgeWhere>>
  AND?: Maybe<Array<TagEdgeWhere>>
  source?: Maybe<Scalars['ID']>
  source_NOT?: Maybe<Scalars['ID']>
  source_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  source_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  source_CONTAINS?: Maybe<Scalars['ID']>
  source_NOT_CONTAINS?: Maybe<Scalars['ID']>
  source_STARTS_WITH?: Maybe<Scalars['ID']>
  source_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  source_ENDS_WITH?: Maybe<Scalars['ID']>
  source_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  target?: Maybe<Scalars['ID']>
  target_NOT?: Maybe<Scalars['ID']>
  target_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  target_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  target_CONTAINS?: Maybe<Scalars['ID']>
  target_NOT_CONTAINS?: Maybe<Scalars['ID']>
  target_STARTS_WITH?: Maybe<Scalars['ID']>
  target_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  target_ENDS_WITH?: Maybe<Scalars['ID']>
  target_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
}

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TagSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type TagParentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<TagParentAggregateInput>>
  OR?: Maybe<Array<TagParentAggregateInput>>
  node?: Maybe<TagParentNodeAggregationWhereInput>
}

export type TagParentConnectFieldInput = {
  where?: Maybe<TagConnectWhere>
  connect?: Maybe<TagConnectInput>
}

export type TagParentConnectionSort = {
  node?: Maybe<TagSort>
}

export type TagParentConnectionWhere = {
  AND?: Maybe<Array<TagParentConnectionWhere>>
  OR?: Maybe<Array<TagParentConnectionWhere>>
  node?: Maybe<TagWhere>
  node_NOT?: Maybe<TagWhere>
}

export type TagParentConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagParentConnectOrCreateFieldInputOnCreate
}

export type TagParentConnectOrCreateFieldInputOnCreate = {
  node: TagCreateInput
}

export type TagParentCreateFieldInput = {
  node: TagCreateInput
}

export type TagParentDeleteFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  delete?: Maybe<TagDeleteInput>
}

export type TagParentDisconnectFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  disconnect?: Maybe<TagDisconnectInput>
}

export type TagParentFieldInput = {
  create?: Maybe<TagParentCreateFieldInput>
  connect?: Maybe<TagParentConnectFieldInput>
  connectOrCreate?: Maybe<TagParentConnectOrCreateFieldInput>
}

export type TagParentNodeAggregationWhereInput = {
  AND?: Maybe<Array<TagParentNodeAggregationWhereInput>>
  OR?: Maybe<Array<TagParentNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type TagParentUpdateConnectionInput = {
  node?: Maybe<TagUpdateInput>
}

export type TagParentUpdateFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  update?: Maybe<TagParentUpdateConnectionInput>
  connect?: Maybe<TagParentConnectFieldInput>
  disconnect?: Maybe<TagParentDisconnectFieldInput>
  create?: Maybe<TagParentCreateFieldInput>
  delete?: Maybe<TagParentDeleteFieldInput>
  connectOrCreate?: Maybe<TagParentConnectOrCreateFieldInput>
}

export type TagRelationInput = {
  parent?: Maybe<TagParentCreateFieldInput>
  children?: Maybe<Array<TagChildrenCreateFieldInput>>
}

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  isRoot?: Maybe<SortDirection>
}

export type TagUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type TagUpdateInput = {
  name?: Maybe<Scalars['String']>
  isRoot?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagParentUpdateFieldInput>
  children?: Maybe<Array<TagChildrenUpdateFieldInput>>
}

export type TagWhere = {
  OR?: Maybe<Array<TagWhere>>
  AND?: Maybe<Array<TagWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  isRoot?: Maybe<Scalars['Boolean']>
  isRoot_NOT?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagWhere>
  parent_NOT?: Maybe<TagWhere>
  parentAggregate?: Maybe<TagParentAggregateInput>
  children?: Maybe<TagWhere>
  children_NOT?: Maybe<TagWhere>
  childrenAggregate?: Maybe<TagChildrenAggregateInput>
  parentConnection?: Maybe<TagParentConnectionWhere>
  parentConnection_NOT?: Maybe<TagParentConnectionWhere>
  childrenConnection?: Maybe<TagChildrenConnectionWhere>
  childrenConnection_NOT?: Maybe<TagChildrenConnectionWhere>
}

export type UserAppsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<UserAppsAggregateInput>>
  OR?: Maybe<Array<UserAppsAggregateInput>>
  node?: Maybe<UserAppsNodeAggregationWhereInput>
}

export type UserAppsConnectFieldInput = {
  where?: Maybe<AppConnectWhere>
  connect?: Maybe<Array<AppConnectInput>>
}

export type UserAppsConnectionSort = {
  node?: Maybe<AppSort>
}

export type UserAppsConnectionWhere = {
  AND?: Maybe<Array<UserAppsConnectionWhere>>
  OR?: Maybe<Array<UserAppsConnectionWhere>>
  node?: Maybe<AppWhere>
  node_NOT?: Maybe<AppWhere>
}

export type UserAppsConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate
}

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type UserAppsCreateFieldInput = {
  node: AppCreateInput
}

export type UserAppsDeleteFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  delete?: Maybe<AppDeleteInput>
}

export type UserAppsDisconnectFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  disconnect?: Maybe<AppDisconnectInput>
}

export type UserAppsFieldInput = {
  create?: Maybe<Array<UserAppsCreateFieldInput>>
  connect?: Maybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserAppsNodeAggregationWhereInput = {
  AND?: Maybe<Array<UserAppsNodeAggregationWhereInput>>
  OR?: Maybe<Array<UserAppsNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type UserAppsUpdateConnectionInput = {
  node?: Maybe<AppUpdateInput>
}

export type UserAppsUpdateFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  update?: Maybe<UserAppsUpdateConnectionInput>
  connect?: Maybe<Array<UserAppsConnectFieldInput>>
  disconnect?: Maybe<Array<UserAppsDisconnectFieldInput>>
  create?: Maybe<Array<UserAppsCreateFieldInput>>
  delete?: Maybe<Array<UserAppsDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserConnectInput = {
  apps?: Maybe<Array<UserAppsConnectFieldInput>>
}

export type UserConnectOrCreateInput = {
  apps?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere
}

export type UserConnectWhere = {
  node: UserWhere
}

export type UserCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
  apps?: Maybe<UserAppsFieldInput>
}

export type UserDeleteInput = {
  apps?: Maybe<Array<UserAppsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: Maybe<Array<UserAppsDisconnectFieldInput>>
}

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<UserSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UserRelationInput = {
  apps?: Maybe<Array<UserAppsCreateFieldInput>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: Maybe<SortDirection>
  auth0Id?: Maybe<SortDirection>
  email?: Maybe<SortDirection>
}

export type UserUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type UserUpdateInput = {
  auth0Id?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  apps?: Maybe<Array<UserAppsUpdateFieldInput>>
}

export type UserWhere = {
  OR?: Maybe<Array<UserWhere>>
  AND?: Maybe<Array<UserWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  auth0Id?: Maybe<Scalars['String']>
  auth0Id_NOT?: Maybe<Scalars['String']>
  auth0Id_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  auth0Id_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  auth0Id_CONTAINS?: Maybe<Scalars['String']>
  auth0Id_NOT_CONTAINS?: Maybe<Scalars['String']>
  auth0Id_STARTS_WITH?: Maybe<Scalars['String']>
  auth0Id_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  auth0Id_ENDS_WITH?: Maybe<Scalars['String']>
  auth0Id_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_NOT?: Maybe<Scalars['String']>
  email_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  email_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  email_CONTAINS?: Maybe<Scalars['String']>
  email_NOT_CONTAINS?: Maybe<Scalars['String']>
  email_STARTS_WITH?: Maybe<Scalars['String']>
  email_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  email_ENDS_WITH?: Maybe<Scalars['String']>
  email_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  apps?: Maybe<AppWhere>
  apps_NOT?: Maybe<AppWhere>
  appsAggregate?: Maybe<UserAppsAggregateInput>
  appsConnection?: Maybe<UserAppsConnectionWhere>
  appsConnection_NOT?: Maybe<UserAppsConnectionWhere>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface UserAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  auth0Id?: StringAggregateInput
  email?: StringAggregateInput
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere

    options?: UserOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<User>>

  public count(args?: { where?: UserWhere }): Promise<number>

  public create(args: {
    input: Array<UserCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateUsersMutationResponse>

  public update(args: {
    where?: UserWhere
    update?: UserUpdateInput
    connect?: UserConnectInput
    disconnect?: UserDisconnectInput
    create?: UserCreateInput
    connectOrCreate?: UserConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateUsersMutationResponse>

  public delete(args: {
    where?: UserWhere
    delete?: UserDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: UserWhere

    aggregate: UserAggregateInput
    context?: any
    rootValue?: any
  }): Promise<UserAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface AppAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class AppModel {
  public find(args?: {
    where?: AppWhere

    options?: AppOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<App>>

  public count(args?: { where?: AppWhere }): Promise<number>

  public create(args: {
    input: Array<AppCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateAppsMutationResponse>

  public update(args: {
    where?: AppWhere
    update?: AppUpdateInput
    connect?: AppConnectInput
    disconnect?: AppDisconnectInput
    create?: AppCreateInput
    connectOrCreate?: AppConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateAppsMutationResponse>

  public delete(args: {
    where?: AppWhere
    delete?: AppDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: AppWhere

    aggregate: AppAggregateInput
    context?: any
    rootValue?: any
  }): Promise<AppAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface AtomAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class AtomModel {
  public find(args?: {
    where?: AtomWhere

    options?: AtomOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Atom>>

  public count(args?: { where?: AtomWhere }): Promise<number>

  public create(args: {
    input: Array<AtomCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateAtomsMutationResponse>

  public update(args: {
    where?: AtomWhere
    update?: AtomUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateAtomsMutationResponse>

  public delete(args: {
    where?: AtomWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: AtomWhere

    aggregate: AtomAggregateInput
    context?: any
    rootValue?: any
  }): Promise<AtomAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface CreateInfoAggregateInput {
  count?: boolean
  bookmark?: StringAggregateInput
  nodesCreated?: IntAggregateInput
  relationshipsCreated?: IntAggregateInput
}

export declare class CreateInfoModel {
  public find(args?: {
    where?: CreateInfoWhere

    options?: CreateInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<CreateInfo>>

  public count(args?: { where?: CreateInfoWhere }): Promise<number>

  public create(args: {
    input: Array<CreateInfoCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateCreateInfosMutationResponse>

  public update(args: {
    where?: CreateInfoWhere
    update?: CreateInfoUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateCreateInfosMutationResponse>

  public delete(args: {
    where?: CreateInfoWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: CreateInfoWhere

    aggregate: CreateInfoAggregateInput
    context?: any
    rootValue?: any
  }): Promise<CreateInfoAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ImportAtomsMutationResponseAggregateInput {
  count?: boolean
}

export declare class ImportAtomsMutationResponseModel {
  public find(args?: {
    where?: ImportAtomsMutationResponseWhere

    options?: ImportAtomsMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ImportAtomsMutationResponse>>

  public count(args?: {
    where?: ImportAtomsMutationResponseWhere
  }): Promise<number>

  public create(args: {
    input: Array<ImportAtomsMutationResponseCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateImportAtomsMutationResponsesMutationResponse>

  public update(args: {
    where?: ImportAtomsMutationResponseWhere
    update?: ImportAtomsMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateImportAtomsMutationResponsesMutationResponse>

  public delete(args: {
    where?: ImportAtomsMutationResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: ImportAtomsMutationResponseWhere

    aggregate: ImportAtomsMutationResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ImportAtomsMutationResponseAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PageAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class PageModel {
  public find(args?: {
    where?: PageWhere

    options?: PageOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Page>>

  public count(args?: { where?: PageWhere }): Promise<number>

  public create(args: {
    input: Array<PageCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePagesMutationResponse>

  public update(args: {
    where?: PageWhere
    update?: PageUpdateInput
    connect?: PageConnectInput
    disconnect?: PageDisconnectInput
    create?: PageCreateInput
    connectOrCreate?: PageConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePagesMutationResponse>

  public delete(args: {
    where?: PageWhere
    delete?: PageDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: PageWhere

    aggregate: PageAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PageAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere

    options?: TagOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Tag>>

  public count(args?: { where?: TagWhere }): Promise<number>

  public create(args: {
    input: Array<TagCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagsMutationResponse>

  public update(args: {
    where?: TagWhere
    update?: TagUpdateInput
    connect?: TagConnectInput
    disconnect?: TagDisconnectInput
    create?: TagCreateInput
    connectOrCreate?: TagConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagsMutationResponse>

  public delete(args: {
    where?: TagWhere
    delete?: TagDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: TagWhere

    aggregate: TagAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagEdgeAggregateInput {
  count?: boolean
  source?: IdAggregateInput
  target?: IdAggregateInput
}

export declare class TagEdgeModel {
  public find(args?: {
    where?: TagEdgeWhere

    options?: TagEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TagEdge>>

  public count(args?: { where?: TagEdgeWhere }): Promise<number>

  public create(args: {
    input: Array<TagEdgeCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagEdgesMutationResponse>

  public update(args: {
    where?: TagEdgeWhere
    update?: TagEdgeUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagEdgesMutationResponse>

  public delete(args: {
    where?: TagEdgeWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: TagEdgeWhere

    aggregate: TagEdgeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagEdgeAggregateSelection>
}

export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DateTimeAggregateInput {
  min?: boolean
  max?: boolean
}
export interface ElementAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
  ownerId?: StringAggregateInput
  createdAt?: DateTimeAggregateInput
  updatedAt?: DateTimeAggregateInput
}

export declare class ElementModel {
  public find(args?: {
    where?: ElementWhere

    options?: ElementOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Element>>

  public count(args?: { where?: ElementWhere }): Promise<number>

  public create(args: {
    input: Array<ElementCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateElementsMutationResponse>

  public update(args: {
    where?: ElementWhere
    update?: ElementUpdateInput
    connect?: ElementConnectInput
    disconnect?: ElementDisconnectInput
    create?: ElementCreateInput
    connectOrCreate?: ElementConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateElementsMutationResponse>

  public delete(args: {
    where?: ElementWhere
    delete?: ElementDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: ElementWhere

    aggregate: ElementAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ElementAggregateSelection>
}

export interface ModelMap {
  User: UserModel
  App: AppModel
  Atom: AtomModel
  CreateInfo: CreateInfoModel
  ImportAtomsMutationResponse: ImportAtomsMutationResponseModel
  Page: PageModel
  Tag: TagModel
  TagEdge: TagEdgeModel
  Element: ElementModel
}
