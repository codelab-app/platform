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
  /** Date custom scalar type */
  Void: void
}

/** Provide exactly one of the config fields */
export type AddHookToElementInput = {
  config: Scalars['String']
  elementId: Scalars['String']
  type: AtomType
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  ownerId: Scalars['String']
  pages: Array<Page>
}

export type AppByIdFilter = {
  appId: Scalars['String']
}

export type AppByPageFilter = {
  pageId: Scalars['String']
}

/** The AppType allows selecting a App in the props form. The value is stored as the appId  */
export type AppType = Type & {
  __typename?: 'AppType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type ArrayType = Type & {
  __typename?: 'ArrayType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type Atom = {
  __typename?: 'Atom'
  api: InterfaceType
  apiGraph: TypeGraph
  id: Scalars['ID']
  /** This is a unique ID suitable for seeders to lookup */
  name: Scalars['String']
  type: AtomType
}

/** Provide either id or type */
export type AtomRef = {
  atomId?: InputMaybe<Scalars['String']>
  atomType?: InputMaybe<AtomType>
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

export type AtomWhereUniqueInput = {
  element?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
}

/** Provide no more than 1 filter */
export type AtomsWhereInput = {
  ids?: InputMaybe<Array<Scalars['String']>>
  searchQuery?: InputMaybe<Scalars['String']>
  types?: InputMaybe<Array<AtomType>>
}

export type BaseTypeEdge = TypeEdge & {
  __typename?: 'BaseTypeEdge'
  source: Scalars['String']
  target: Scalars['String']
}

/** The ComponentType allows selecting a Component in the props form. The value is stored as the componentId  */
export type ComponentType = Type & {
  __typename?: 'ComponentType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type ConvertElementToComponentInput = {
  elementId: Scalars['String']
}

export type CreateAppInput = {
  name: Scalars['String']
}

export type CreateArrayTypeInput = {
  itemTypeId: Scalars['String']
}

export type CreateAtomInput = {
  /** Pass in an existing interface ID to assign it to the atom */
  api?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  type: AtomType
}

export type CreateComponentInput = {
  name: Scalars['String']
}

export type CreateElementChildInput = {
  atom?: InputMaybe<AtomRef>
  /** Creates new elements or attaches existing ones, can be used to create a whole tree at once */
  children?: InputMaybe<Array<ElementRef>>
  css?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<Array<HookRef>>
  isComponent?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  /** Leave it out to automatically set it as the last order of all the children */
  order?: InputMaybe<Scalars['Int']>
  propMapBindings?: InputMaybe<Array<NewPropMapBindingRef>>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<Scalars['String']>
  /** Set to any unique value and use that to identify the created element in other references in the same input, like targetId in Prop Map Binding */
  refId?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type CreateElementInput = {
  atom?: InputMaybe<AtomRef>
  /** Creates new elements or attaches existing ones, can be used to create a whole tree at once */
  children?: InputMaybe<Array<ElementRef>>
  css?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<Array<HookRef>>
  isComponent?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  /** Leave it out to automatically set it as the last order of all the children */
  order?: InputMaybe<Scalars['Int']>
  /** Attaches the newly created element to an existing element as child */
  parentElementId?: InputMaybe<Scalars['String']>
  propMapBindings?: InputMaybe<Array<NewPropMapBindingRef>>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<Scalars['String']>
  /** Set to any unique value and use that to identify the created element in other references in the same input, like targetId in Prop Map Binding */
  refId?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type CreateElementTypeInput = {
  kind: ElementTypeKind
}

export type CreateEnumTypeInput = {
  allowedValues: Array<CreateEnumTypeValueInput>
}

export type CreateEnumTypeValueInput = {
  name?: InputMaybe<Scalars['String']>
  value: Scalars['String']
}

export type CreateFieldInput = {
  description?: InputMaybe<Scalars['String']>
  /** The interface to add fields to */
  interfaceId: Scalars['String']
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  type: TypeRef
}

export type CreateLambdaInput = {
  /** Content of the Lambda function */
  body: Scalars['String']
  /** Name of the Lambda function to be executed */
  name: Scalars['String']
}

export type CreateMonacoTypeInput = {
  language: MonacoLanguage
}

export type CreatePageInput = {
  appId: Scalars['String']
  name: Scalars['String']
  rootElement?: InputMaybe<CreateElementChildInput>
}

export type CreatePrimitiveTypeInput = {
  primitiveKind: PrimitiveTypeKind
}

export type CreatePropMapBindingInput = {
  elementId: Scalars['String']
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String']
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: InputMaybe<Scalars['String']>
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String']
}

export type CreateResponse = {
  __typename?: 'CreateResponse'
  id: Scalars['String']
}

export type CreateTagInput = {
  name: Scalars['String']
  /** Parent tag id, empty parent means it's root */
  parentTagId?: InputMaybe<Scalars['String']>
}

/** Provide one of the properties */
export type CreateTypeInput = {
  arrayType?: InputMaybe<CreateArrayTypeInput>
  elementType?: InputMaybe<CreateElementTypeInput>
  enumType?: InputMaybe<CreateEnumTypeInput>
  monacoType?: InputMaybe<CreateMonacoTypeInput>
  name: Scalars['String']
  primitiveType?: InputMaybe<CreatePrimitiveTypeInput>
  typeKind: TypeKind
  unionType?: InputMaybe<CreateUnionType>
}

export type CreateUnionType = {
  typeIdsOfUnionType: Array<Scalars['String']>
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

export type DeleteLambdaInput = {
  lambdaId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type DeletePropMapBindingInput = {
  propMapBindingIds: Array<Scalars['String']>
}

export type DeleteTagsInput = {
  ids: Array<Scalars['String']>
}

export type DeleteTypeInput = {
  typeId: Scalars['String']
}

export type DeleteUserInput = {
  id: Scalars['String']
}

export type Element = {
  __typename?: 'Element'
  atom?: Maybe<Atom>
  /** An Element tagged with componentTag is a reusable component */
  componentTag?: Maybe<Tag>
  css?: Maybe<Scalars['String']>
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge */
  graph: ElementGraph
  hooks: Array<Hook>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  propMapBindings: Array<PropMapBinding>
  propTransformationJs?: Maybe<Scalars['String']>
  props: Prop
  /** If set, the element will get rendered for each item in the array found in its props by the given key, if it exists */
  renderForEachPropKey?: Maybe<Scalars['String']>
  /** If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy) */
  renderIfPropKey?: Maybe<Scalars['String']>
}

/** An edge between two element nodes */
export type ElementEdge = {
  __typename?: 'ElementEdge'
  order?: Maybe<Scalars['Int']>
  /** The id of the source Element */
  source: Scalars['String']
  /** The id of the target Element */
  target: Scalars['String']
}

export type ElementGraph = {
  __typename?: 'ElementGraph'
  /** All the links connecting the descendant elements */
  edges: Array<ElementEdge>
  vertices: Array<Element>
}

/** Provide either id or new element input */
export type ElementRef = {
  /** Pass in either refId, or existing elementId */
  elementId?: InputMaybe<Scalars['String']>
  newElement?: InputMaybe<CreateElementChildInput>
}

/** The ElementType allows selecting an Element in the props form. The value is stored as the elementId  */
export type ElementType = Type & {
  __typename?: 'ElementType'
  elementKind: ElementTypeKind
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export enum ElementTypeKind {
  AllElements = 'AllElements',
  ChildrenOnly = 'ChildrenOnly',
  DescendantsOnly = 'DescendantsOnly',
}

export type EnumType = Type & {
  __typename?: 'EnumType'
  allowedValues: Array<EnumTypeValue>
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type EnumTypeValue = {
  __typename?: 'EnumTypeValue'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type ExecuteLambdaInput = {
  lambdaId: Scalars['String']
  payload?: InputMaybe<Scalars['String']>
}

export type ExportAppInput = {
  appId: Scalars['String']
}

export type Field = {
  __typename?: 'Field'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  source: Scalars['String']
  target: Scalars['String']
}

export type FieldByIdFilter = {
  fieldId: Scalars['String']
}

export type FieldByInterfaceFilter = {
  fieldKey: Scalars['String']
  interfaceId: Scalars['String']
}

export type FieldTypeEdge = TypeEdge & {
  __typename?: 'FieldTypeEdge'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  source: Scalars['String']
  target: Scalars['String']
}

export type GetAppInput = {
  byId?: InputMaybe<AppByIdFilter>
  byPage?: InputMaybe<AppByPageFilter>
}

export type GetAtomInput = {
  where: AtomWhereUniqueInput
}

export type GetAtomsInput = {
  where?: InputMaybe<AtomsWhereInput>
}

export type GetComponentsInput = {
  componentIds?: InputMaybe<Array<Scalars['String']>>
  searchQuery?: InputMaybe<Scalars['String']>
}

export type GetElementGraphInput = {
  where: WhereUniqueElement
}

export type GetElementInput = {
  where: WhereUniqueElement
}

export type GetFieldInput = {
  byId?: InputMaybe<FieldByIdFilter>
  byInterface?: InputMaybe<FieldByInterfaceFilter>
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

export type GetTagGraphsInput = {
  where?: InputMaybe<TagsWhereInput>
}

export type GetTagInput = {
  where: WhereUniqueTag
}

export type GetTagsInput = {
  ids?: InputMaybe<Array<Scalars['String']>>
}

export type GetTypeGraphInput = {
  where: WhereUniqueType
}

export type GetTypeInput = {
  where: WhereUniqueType
}

/** Filters are optional and you can provide all three of them together */
export type GetTypesInput = {
  byIds?: InputMaybe<TypesByIdsFilter>
  byKind?: InputMaybe<TypesByKindFilter>
  byName?: InputMaybe<TypesByNameFilter>
}

export type GetUserInput = {
  auth0Id?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
}

export type GetUsersInput = {
  page: Scalars['Int']
  perPage: Scalars['Int']
  query: Scalars['String']
  sort: Scalars['String']
}

export type Hook = {
  __typename?: 'Hook'
  config: Prop
  id: Scalars['ID']
  type: AtomType
}

export type HookRef = {
  config: Scalars['String']
  type: AtomType
}

export type ImportAppInput = {
  payload: Scalars['String']
}

export type ImportAtomsInput = {
  payload: Scalars['String']
}

export type ImportTagsInput = {
  payload: Scalars['String']
}

export type InterfaceType = Type & {
  __typename?: 'InterfaceType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type Lambda = {
  __typename?: 'Lambda'
  body: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  ownerId: Scalars['String']
}

export type LambdaPayload = {
  __typename?: 'LambdaPayload'
  payload: Scalars['String']
}

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId  */
export type LambdaType = Type & {
  __typename?: 'LambdaType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export enum MonacoLanguage {
  CSS = 'CSS',
  Graphql = 'Graphql',
  JSON = 'JSON',
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
}

/** The MonacoType allows inserting code using Monaco Editor in the props form. */
export type MonacoType = Type & {
  __typename?: 'MonacoType'
  id: Scalars['ID']
  language: MonacoLanguage
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
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
  __typename?: 'Mutation'
  addHookToElement: CreateResponse
  convertElementToComponent: Element
  createApp: App
  createAtom: Atom
  /** Facade for creating a element with component tag */
  createComponent: Element
  createElement: Element
  createField: Field
  createLambda: Lambda
  createPage: Page
  createPropMapBinding: CreateResponse
  createTag: Tag
  createType: Type
  deleteApp?: Maybe<App>
  deleteAtom?: Maybe<Atom>
  /** Deletes an element and all the descending elements */
  deleteElement: Element
  deleteField?: Maybe<Field>
  deleteLambda: Lambda
  deletePage: Page
  deletePropMapBinding?: Maybe<Scalars['Void']>
  deleteTags?: Maybe<Array<Tag>>
  deleteType?: Maybe<Type>
  deleteUser: Scalars['Boolean']
  executeLambda?: Maybe<LambdaPayload>
  importApp: App
  importAtoms?: Maybe<Scalars['Void']>
  importTags?: Maybe<Scalars['Void']>
  moveElement: Element
  removeHookFromElement?: Maybe<Scalars['Void']>
  resetData?: Maybe<Scalars['Void']>
  seedBaseTypes?: Maybe<Scalars['Void']>
  updateApp?: Maybe<App>
  updateAtom?: Maybe<Atom>
  updateElement: Element
  updateElementProps: Element
  updateEnumType?: Maybe<EnumType>
  updateField?: Maybe<Field>
  updateLambda?: Maybe<Lambda>
  updatePage: Page
  updatePrimitiveType?: Maybe<PrimitiveType>
  updatePropMapBinding?: Maybe<Scalars['Void']>
  updateTag?: Maybe<Tag>
  updateType?: Maybe<Type>
  updateUnionType?: Maybe<UnionType>
  upsertAtoms: Array<Atom>
  upsertTag: Tag
  upsertUser: User
}

export type MutationAddHookToElementArgs = {
  input: AddHookToElementInput
}

export type MutationConvertElementToComponentArgs = {
  input: ConvertElementToComponentInput
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationCreateAtomArgs = {
  input: CreateAtomInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationCreateElementArgs = {
  input: CreateElementInput
}

export type MutationCreateFieldArgs = {
  input: CreateFieldInput
}

export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationCreatePropMapBindingArgs = {
  input: CreatePropMapBindingInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
}

export type MutationCreateTypeArgs = {
  input: CreateTypeInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationDeleteAtomArgs = {
  input: DeleteAtomInput
}

export type MutationDeleteElementArgs = {
  input: DeleteElementInput
}

export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput
}

export type MutationDeleteLambdaArgs = {
  input: DeleteLambdaInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
}

export type MutationDeletePropMapBindingArgs = {
  input: DeletePropMapBindingInput
}

export type MutationDeleteTagsArgs = {
  input: DeleteTagsInput
}

export type MutationDeleteTypeArgs = {
  input: DeleteTypeInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationExecuteLambdaArgs = {
  input: ExecuteLambdaInput
}

export type MutationImportAppArgs = {
  input: ImportAppInput
}

export type MutationImportAtomsArgs = {
  input: ImportAtomsInput
}

export type MutationImportTagsArgs = {
  input: ImportTagsInput
}

export type MutationMoveElementArgs = {
  input: MoveElementInput
}

export type MutationRemoveHookFromElementArgs = {
  input: RemoveHookFromElementInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput
}

export type MutationUpdateElementArgs = {
  input: UpdateElementInput
}

export type MutationUpdateElementPropsArgs = {
  input: UpdateElementPropsInput
}

export type MutationUpdateEnumTypeArgs = {
  input: UpdateEnumTypeInput
}

export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput
}

export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationUpdatePrimitiveTypeArgs = {
  input: UpdatePrimitiveTypeInput
}

export type MutationUpdatePropMapBindingArgs = {
  input: UpdatePropMapBindingInput
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type MutationUpdateTypeArgs = {
  input: UpdateTypeInput
}

export type MutationUpdateUnionTypeArgs = {
  input: UpdateUnionTypeInput
}

export type MutationUpsertAtomsArgs = {
  input: UpsertAtomsInput
}

export type MutationUpsertTagArgs = {
  input: UpsertTagInput
}

export type MutationUpsertUserArgs = {
  input: UpsertUserInput
}

export type NewPropMapBindingRef = {
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String']
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: InputMaybe<Scalars['String']>
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String']
}

export type Page = {
  __typename?: 'Page'
  elements?: Maybe<ElementGraph>
  id: Scalars['ID']
  name: Scalars['String']
  rootElementId: Scalars['String']
}

export type PageByAppFilter = {
  appId: Scalars['String']
}

/** The PageType allows selecting a Page in the props form. The value is stored as the pageId  */
export type PageType = Type & {
  __typename?: 'PageType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type PayloadResponse = {
  __typename?: 'PayloadResponse'
  payload: Scalars['String']
}

export type PrimitiveType = Type & {
  __typename?: 'PrimitiveType'
  id: Scalars['ID']
  name: Scalars['String']
  primitiveKind: PrimitiveTypeKind
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export enum PrimitiveTypeKind {
  Boolean = 'Boolean',
  Float = 'Float',
  Integer = 'Integer',
  String = 'String',
}

export type Prop = {
  __typename?: 'Prop'
  data: Scalars['String']
  id: Scalars['ID']
}

export type PropMapBinding = {
  __typename?: 'PropMapBinding'
  id: Scalars['ID']
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String']
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: Maybe<Scalars['String']>
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  exportApp: PayloadResponse
  getApp?: Maybe<App>
  getApps: Array<App>
  getAtom?: Maybe<Atom>
  getAtoms?: Maybe<Array<Atom>>
  getAtomsTypeHook?: Maybe<Array<Atom>>
  getComponents: Array<Element>
  /** Get a single element. */
  getElement?: Maybe<Element>
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge */
  getElementGraph: ElementGraph
  getField?: Maybe<Field>
  getLambda?: Maybe<Lambda>
  getLambdas: Array<Lambda>
  getMe?: Maybe<User>
  getPage?: Maybe<Page>
  getPages: Array<Page>
  getTag?: Maybe<Tag>
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraph?: Maybe<TagGraph>
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraphs: TagGraph
  /** Get all Tag graphs */
  getTags: Array<Tag>
  getType?: Maybe<Type>
  getTypeGraph?: Maybe<TypeGraph>
  getTypes: Array<Type>
  getUser?: Maybe<User>
  getUsers: Array<User>
}

export type QueryExportAppArgs = {
  input: ExportAppInput
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetAtomArgs = {
  input: GetAtomInput
}

export type QueryGetAtomsArgs = {
  input?: InputMaybe<GetAtomsInput>
}

export type QueryGetComponentsArgs = {
  input?: InputMaybe<GetComponentsInput>
}

export type QueryGetElementArgs = {
  input: GetElementInput
}

export type QueryGetElementGraphArgs = {
  input: GetElementGraphInput
}

export type QueryGetFieldArgs = {
  input: GetFieldInput
}

export type QueryGetLambdaArgs = {
  input: GetLambdaInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGetTagArgs = {
  input: GetTagInput
}

export type QueryGetTagGraphsArgs = {
  input?: InputMaybe<GetTagGraphsInput>
}

export type QueryGetTagsArgs = {
  input?: InputMaybe<GetTagsInput>
}

export type QueryGetTypeArgs = {
  input: GetTypeInput
}

export type QueryGetTypeGraphArgs = {
  input: GetTypeGraphInput
}

export type QueryGetTypesArgs = {
  input?: InputMaybe<GetTypesInput>
}

export type QueryGetUserArgs = {
  input: GetUserInput
}

export type QueryGetUsersArgs = {
  input?: InputMaybe<GetUsersInput>
}

export type ReactNodeType = Type & {
  __typename?: 'ReactNodeType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type RemoveHookFromElementInput = {
  elementId: Scalars['String']
  hookId: Scalars['String']
}

export type RenderPropsType = Type & {
  __typename?: 'RenderPropsType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export enum Role {
  Admin = 'Admin',
  Guest = 'Guest',
  User = 'User',
}

export type Tag = {
  __typename?: 'Tag'
  children: Array<Scalars['String']>
  id: Scalars['String']
  isRoot: Scalars['Boolean']
  name: Scalars['String']
  parent?: Maybe<Scalars['String']>
}

/** An edge between two element nodes */
export type TagEdge = {
  __typename?: 'TagEdge'
  order?: Maybe<Scalars['Int']>
  /** The id of the source Tag */
  source: Scalars['String']
  /** The id of the target Tag */
  target: Scalars['String']
}

export type TagGraph = {
  __typename?: 'TagGraph'
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>
  /** All descendant Elements or Components, at any level */
  vertices: Array<TagVertex>
}

export type TagVertex = Tag

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type TagsWhereInput = {
  ids?: InputMaybe<Array<Scalars['String']>>
}

export type Type = {
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeKind: TypeKind
}

export type TypeEdge = {
  source: Scalars['String']
  target: Scalars['String']
}

export type TypeGraph = {
  __typename?: 'TypeGraph'
  edges: Array<TypeEdge>
  vertices: Array<TypeVertex>
}

export enum TypeKind {
  AppType = 'AppType',
  ArrayType = 'ArrayType',
  ComponentType = 'ComponentType',
  ElementType = 'ElementType',
  EnumType = 'EnumType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  MonacoType = 'MonacoType',
  PageType = 'PageType',
  PrimitiveType = 'PrimitiveType',
  ReactNodeType = 'ReactNodeType',
  RenderPropsType = 'RenderPropsType',
  UnionType = 'UnionType',
}

export type TypeRef = {
  existingTypeId?: InputMaybe<Scalars['String']>
  newType?: InputMaybe<CreateTypeInput>
}

export type TypeVertex =
  | AppType
  | ArrayType
  | ComponentType
  | ElementType
  | EnumType
  | InterfaceType
  | LambdaType
  | MonacoType
  | PageType
  | PrimitiveType
  | ReactNodeType
  | RenderPropsType
  | UnionType

export type TypesByIdsFilter = {
  typeIds: Array<Scalars['String']>
}

export type TypesByKindFilter = {
  kind: TypeKind
}

export type TypesByNameFilter = {
  name: Scalars['String']
}

export type UnionType = Type & {
  __typename?: 'UnionType'
  id: Scalars['ID']
  name: Scalars['String']
  typeGraph: TypeGraph
  typeIdsOfUnionType: Array<Scalars['String']>
  typeKind: TypeKind
}

export type UpdateAppData = {
  name: Scalars['String']
}

export type UpdateAppInput = {
  data: UpdateAppData
  id: Scalars['String']
}

export type UpdateAtomInput = {
  data: CreateAtomInput
  id: Scalars['String']
}

export type UpdateElementData = {
  atomId?: InputMaybe<Scalars['String']>
  css?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  /** If set, the element will get rendered for each item in the array found in its props by the given key, if it exists */
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  /** If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy) */
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type UpdateElementInput = {
  data: UpdateElementData
  id: Scalars['String']
}

export type UpdateElementPropsInput = {
  data: Scalars['String']
  elementId: Scalars['String']
  propsId: Scalars['String']
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
  id?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  value: Scalars['String']
}

export type UpdateFieldData = {
  description?: InputMaybe<Scalars['String']>
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  type: TypeRef
}

export type UpdateFieldInput = {
  fieldId: Scalars['String']
  updateData: UpdateFieldData
}

export type UpdateLambdaInput = {
  /** Content of the Lambda function */
  body: Scalars['String']
  id: Scalars['String']
  /** Name of the Lambda function to be executed */
  name: Scalars['String']
}

export type UpdatePageData = {
  appId: Scalars['String']
  name: Scalars['String']
  rootElement?: Maybe<CreateElementChildInput>
}

export type UpdatePageInput = {
  pageId: Scalars['String']
  updateData: UpdatePageData
}

export type UpdatePrimitiveKindData = {
  name: Scalars['String']
  primitiveKind: PrimitiveTypeKind
}

export type UpdatePrimitiveTypeInput = {
  typeId: Scalars['String']
  updateData: UpdatePrimitiveKindData
}

export type UpdatePropMapBindingData = {
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String']
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: InputMaybe<Scalars['String']>
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String']
}

export type UpdatePropMapBindingInput = {
  data: UpdatePropMapBindingData
  propMapBindingId: Scalars['String']
}

export type UpdateTagData = {
  name: Scalars['String']
}

export type UpdateTagInput = {
  data: UpdateTagData
  id: Scalars['String']
}

export type UpdateTypeData = {
  name: Scalars['String']
}

export type UpdateTypeInput = {
  typeId: Scalars['String']
  updateData: UpdateTypeData
}

export type UpdateUnionTypeData = {
  name: Scalars['String']
  typeIdsOfUnionType: Array<Scalars['String']>
}

export type UpdateUnionTypeInput = {
  typeId: Scalars['String']
  updateData: UpdateUnionTypeData
}

export type UpsertAtomInput = {
  /** Pass in an existing interface ID to assign it to the atom */
  api?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  type: AtomType
}

export type UpsertAtomsInput = {
  atoms: Array<UpsertAtomInput>
}

export type UpsertTagInput = {
  data: CreateTagInput
  where?: InputMaybe<TagWhereUniqueInput>
}

export type UpsertUserDataInput = {
  auth0Id: Scalars['String']
  roles: Array<Role>
}

export type UpsertUserInput = {
  data: UpsertUserDataInput
  where?: InputMaybe<UserWhereUniqueInput>
}

export type User = {
  __typename?: 'User'
  auth0Id: Scalars['String']
  id: Scalars['String']
  roles: Array<Role>
}

export type UserWhereUniqueInput = {
  auth0Id?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
}

export type WhereUniqueElement = {
  id?: InputMaybe<Scalars['String']>
}

export type WhereUniqueTag = {
  id?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

/** Provide exactly 1 field */
export type WhereUniqueType = {
  atomId?: InputMaybe<Scalars['String']>
  enumTypeValueId?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}
