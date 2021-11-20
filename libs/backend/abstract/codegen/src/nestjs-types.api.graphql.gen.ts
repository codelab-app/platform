
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    Admin = "Admin",
    User = "User",
    Guest = "Guest"
}

export enum HookType {
    Query = "Query",
    GraphqlQuery = "GraphqlQuery",
    GraphqlMutation = "GraphqlMutation",
    RecoilState = "RecoilState",
    QueryPage = "QueryPage",
    QueryPages = "QueryPages"
}

export enum QueryMethod {
    Get = "Get",
    Delete = "Delete",
    Head = "Head",
    Options = "Options",
    Post = "Post",
    Put = "Put",
    Patch = "Patch",
    Purge = "Purge",
    Link = "Link",
    Unlink = "Unlink"
}

export enum PersistenceType {
    NotPersisted = "NotPersisted",
    LocalStorage = "LocalStorage",
    SessionStorage = "SessionStorage"
}

export enum TypeKind {
    PrimitiveType = "PrimitiveType",
    ArrayType = "ArrayType",
    InterfaceType = "InterfaceType",
    EnumType = "EnumType",
    LambdaType = "LambdaType",
    ElementType = "ElementType",
    ComponentType = "ComponentType",
    RenderPropsType = "RenderPropsType",
    ReactNodeType = "ReactNodeType",
    UnionType = "UnionType"
}

export enum ElementTypeKind {
    AllElements = "AllElements",
    DescendantsOnly = "DescendantsOnly",
    ChildrenOnly = "ChildrenOnly"
}

export enum PrimitiveTypeKind {
    String = "String",
    Integer = "Integer",
    Float = "Float",
    Boolean = "Boolean"
}

export enum AtomType {
    AntDesignAffix = "AntDesignAffix",
    AntDesignAlert = "AntDesignAlert",
    AntDesignAnchor = "AntDesignAnchor",
    AntDesignAnchorLink = "AntDesignAnchorLink",
    AntDesignAutoComplete = "AntDesignAutoComplete",
    AntDesignAvatar = "AntDesignAvatar",
    AntDesignBackTop = "AntDesignBackTop",
    AntDesignBadge = "AntDesignBadge",
    AntDesignBreadcrumb = "AntDesignBreadcrumb",
    AntDesignBreadcrumbItem = "AntDesignBreadcrumbItem",
    AntDesignButton = "AntDesignButton",
    AntDesignCalendar = "AntDesignCalendar",
    AntDesignCard = "AntDesignCard",
    AntDesignCardGrid = "AntDesignCardGrid",
    AntDesignCardMeta = "AntDesignCardMeta",
    AntDesignCarousel = "AntDesignCarousel",
    AntDesignCascader = "AntDesignCascader",
    AntDesignCheckbox = "AntDesignCheckbox",
    AntDesignCollapse = "AntDesignCollapse",
    AntDesignCollapsePanel = "AntDesignCollapsePanel",
    AntDesignComment = "AntDesignComment",
    AntDesignConfigProvider = "AntDesignConfigProvider",
    AntDesignDatePicker = "AntDesignDatePicker",
    AntDesignDescriptions = "AntDesignDescriptions",
    AntDesignDescriptionsItem = "AntDesignDescriptionsItem",
    AntDesignDivider = "AntDesignDivider",
    AntDesignDrawer = "AntDesignDrawer",
    AntDesignDropdown = "AntDesignDropdown",
    AntDesignEmpty = "AntDesignEmpty",
    AntDesignForm = "AntDesignForm",
    AntDesignFormItem = "AntDesignFormItem",
    AntDesignFormItemHook = "AntDesignFormItemHook",
    AntDesignFormList = "AntDesignFormList",
    AntDesignGridCol = "AntDesignGridCol",
    AntDesignGridRow = "AntDesignGridRow",
    AntDesignIcon = "AntDesignIcon",
    AntDesignInput = "AntDesignInput",
    AntDesignInputNumber = "AntDesignInputNumber",
    AntDesignLayout = "AntDesignLayout",
    AntDesignLayoutContent = "AntDesignLayoutContent",
    AntDesignLayoutFooter = "AntDesignLayoutFooter",
    AntDesignLayoutHeader = "AntDesignLayoutHeader",
    AntDesignLayoutSider = "AntDesignLayoutSider",
    AntDesignList = "AntDesignList",
    AntDesignListItem = "AntDesignListItem",
    AntDesignListItemMeta = "AntDesignListItemMeta",
    AntDesignMapper = "AntDesignMapper",
    AntDesignMentions = "AntDesignMentions",
    AntDesignMentionsOption = "AntDesignMentionsOption",
    AntDesignMenu = "AntDesignMenu",
    AntDesignMenuItem = "AntDesignMenuItem",
    AntDesignMenuItemGroup = "AntDesignMenuItemGroup",
    AntDesignMenuSubMenu = "AntDesignMenuSubMenu",
    AntDesignModal = "AntDesignModal",
    AntDesignPageHeader = "AntDesignPageHeader",
    AntDesignPageContainer = "AntDesignPageContainer",
    AntDesignPagination = "AntDesignPagination",
    AntDesignPopconfirm = "AntDesignPopconfirm",
    AntDesignPopover = "AntDesignPopover",
    AntDesignProgress = "AntDesignProgress",
    AntDesignProvider = "AntDesignProvider",
    AntDesignRglContainer = "AntDesignRglContainer",
    AntDesignRglItem = "AntDesignRglItem",
    AntDesignRglResponsiveContainer = "AntDesignRglResponsiveContainer",
    AntDesignRadio = "AntDesignRadio",
    AntDesignRadioGroup = "AntDesignRadioGroup",
    AntDesignRate = "AntDesignRate",
    AntDesignRenderComponent = "AntDesignRenderComponent",
    AntDesignRenderContainer = "AntDesignRenderContainer",
    AntDesignResult = "AntDesignResult",
    AntDesignSelect = "AntDesignSelect",
    AntDesignSelectOption = "AntDesignSelectOption",
    AntDesignSkeleton = "AntDesignSkeleton",
    AntDesignSlider = "AntDesignSlider",
    AntDesignSpace = "AntDesignSpace",
    AntDesignSpin = "AntDesignSpin",
    AntDesignStatistic = "AntDesignStatistic",
    AntDesignSteps = "AntDesignSteps",
    AntDesignStepsStep = "AntDesignStepsStep",
    AntDesignSwitch = "AntDesignSwitch",
    AntDesignTable = "AntDesignTable",
    AntDesignTabs = "AntDesignTabs",
    AntDesignTabsTabPane = "AntDesignTabsTabPane",
    AntDesignTag = "AntDesignTag",
    AntDesignTimePicker = "AntDesignTimePicker",
    AntDesignTimeline = "AntDesignTimeline",
    AntDesignTimelineItem = "AntDesignTimelineItem",
    AntDesignTooltip = "AntDesignTooltip",
    AntDesignTransfer = "AntDesignTransfer",
    AntDesignTree = "AntDesignTree",
    AntDesignTreeNode = "AntDesignTreeNode",
    AntDesignTreeSelect = "AntDesignTreeSelect",
    AntDesignTypography = "AntDesignTypography",
    AntDesignTypographyParagraph = "AntDesignTypographyParagraph",
    AntDesignTypographyText = "AntDesignTypographyText",
    AntDesignTypographyTitle = "AntDesignTypographyTitle",
    AntDesignUpload = "AntDesignUpload",
    AntDesignImage = "AntDesignImage",
    MuiAccordion = "MuiAccordion",
    MuiAccordionActions = "MuiAccordionActions",
    MuiAccordionDetails = "MuiAccordionDetails",
    MuiAccordionSummary = "MuiAccordionSummary",
    MuiAlert = "MuiAlert",
    MuiAlertTitle = "MuiAlertTitle",
    MuiAppBar = "MuiAppBar",
    MuiAutocomplete = "MuiAutocomplete",
    MuiAvatar = "MuiAvatar",
    MuiAvatarGroup = "MuiAvatarGroup",
    MuiBackdrop = "MuiBackdrop",
    MuiBackdropUnstyled = "MuiBackdropUnstyled",
    MuiBadge = "MuiBadge",
    MuiBadgeUnstyled = "MuiBadgeUnstyled",
    MuiBottomNavigation = "MuiBottomNavigation",
    MuiBottomNavigationAction = "MuiBottomNavigationAction",
    MuiBox = "MuiBox",
    MuiBreadcrumbs = "MuiBreadcrumbs",
    MuiButton = "MuiButton",
    MuiButtonBase = "MuiButtonBase",
    MuiButtonGroup = "MuiButtonGroup",
    MuiButtonUnstyled = "MuiButtonUnstyled",
    MuiCalendarPicker = "MuiCalendarPicker",
    MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton",
    MuiCard = "MuiCard",
    MuiCardActionArea = "MuiCardActionArea",
    MuiCardActions = "MuiCardActions",
    MuiCardContent = "MuiCardContent",
    MuiCardHeader = "MuiCardHeader",
    MuiCardMedia = "MuiCardMedia",
    MuiCheckbox = "MuiCheckbox",
    MuiChip = "MuiChip",
    MuiCircularProgress = "MuiCircularProgress",
    MuiClickAwayListener = "MuiClickAwayListener",
    MuiClockPicker = "MuiClockPicker",
    MuiCollapse = "MuiCollapse",
    MuiContainer = "MuiContainer",
    MuiCssBaseline = "MuiCssBaseline",
    MuiDataGrid = "MuiDataGrid",
    MuiGridColDef = "MuiGridColDef",
    MuiDatePicker = "MuiDatePicker",
    MuiDateRangePicker = "MuiDateRangePicker",
    MuiDateRangePickerDay = "MuiDateRangePickerDay",
    MuiDateTimePicker = "MuiDateTimePicker",
    MuiDesktopDatePicker = "MuiDesktopDatePicker",
    MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker",
    MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker",
    MuiDesktopTimePicker = "MuiDesktopTimePicker",
    MuiDialog = "MuiDialog",
    MuiDialogActions = "MuiDialogActions",
    MuiDialogContent = "MuiDialogContent",
    MuiDialogContentText = "MuiDialogContentText",
    MuiDialogTitle = "MuiDialogTitle",
    MuiDivider = "MuiDivider",
    MuiDrawer = "MuiDrawer",
    MuiFab = "MuiFab",
    MuiFade = "MuiFade",
    MuiFilledInput = "MuiFilledInput",
    MuiFormControl = "MuiFormControl",
    MuiFormControlLabel = "MuiFormControlLabel",
    MuiFormControlUnstyled = "MuiFormControlUnstyled",
    MuiFormGroup = "MuiFormGroup",
    MuiFormHelperText = "MuiFormHelperText",
    MuiFormLabel = "MuiFormLabel",
    MuiGlobalStyles = "MuiGlobalStyles",
    MuiGrid = "MuiGrid",
    MuiGrow = "MuiGrow",
    MuiHidden = "MuiHidden",
    MuiIcon = "MuiIcon",
    MuiIconButton = "MuiIconButton",
    MuiImageList = "MuiImageList",
    MuiImageListItem = "MuiImageListItem",
    MuiImageListItemBar = "MuiImageListItemBar",
    MuiInput = "MuiInput",
    MuiInputAdornment = "MuiInputAdornment",
    MuiInputBase = "MuiInputBase",
    MuiInputLabel = "MuiInputLabel",
    MuiLinearProgress = "MuiLinearProgress",
    MuiLink = "MuiLink",
    MuiList = "MuiList",
    MuiListItem = "MuiListItem",
    MuiListItemAvatar = "MuiListItemAvatar",
    MuiListItemButton = "MuiListItemButton",
    MuiListItemIcon = "MuiListItemIcon",
    MuiListItemSecondaryAction = "MuiListItemSecondaryAction",
    MuiListItemText = "MuiListItemText",
    MuiListSubheader = "MuiListSubheader",
    MuiLoadingButton = "MuiLoadingButton",
    MuiMasonry = "MuiMasonry",
    MuiMasonryItem = "MuiMasonryItem",
    MuiMenu = "MuiMenu",
    MuiMenuItem = "MuiMenuItem",
    MuiMenuList = "MuiMenuList",
    MuiMobileDatePicker = "MuiMobileDatePicker",
    MuiMobileDateRangePicker = "MuiMobileDateRangePicker",
    MuiMobileDateTimePicker = "MuiMobileDateTimePicker",
    MuiMobileStepper = "MuiMobileStepper",
    MuiMobileTimePicker = "MuiMobileTimePicker",
    MuiModal = "MuiModal",
    MuiModalUnstyled = "MuiModalUnstyled",
    MuiMonthPicker = "MuiMonthPicker",
    MuiNativeSelect = "MuiNativeSelect",
    MuiNoSsr = "MuiNoSsr",
    MuiOutlinedInput = "MuiOutlinedInput",
    MuiPagination = "MuiPagination",
    MuiPaginationItem = "MuiPaginationItem",
    MuiPaper = "MuiPaper",
    MuiPickersDay = "MuiPickersDay",
    MuiPopover = "MuiPopover",
    MuiPopper = "MuiPopper",
    MuiPortal = "MuiPortal",
    MuiRadio = "MuiRadio",
    MuiRadioGroup = "MuiRadioGroup",
    MuiRating = "MuiRating",
    MuiScopedCssBaseline = "MuiScopedCssBaseline",
    MuiSelect = "MuiSelect",
    MuiSkeleton = "MuiSkeleton",
    MuiSlide = "MuiSlide",
    MuiSlider = "MuiSlider",
    MuiSliderUnstyled = "MuiSliderUnstyled",
    MuiSnackbar = "MuiSnackbar",
    MuiSnackbarContent = "MuiSnackbarContent",
    MuiSpeedDial = "MuiSpeedDial",
    MuiSpeedDialAction = "MuiSpeedDialAction",
    MuiSpeedDialIcon = "MuiSpeedDialIcon",
    MuiStack = "MuiStack",
    MuiStaticDatePicker = "MuiStaticDatePicker",
    MuiStaticDateRangePicker = "MuiStaticDateRangePicker",
    MuiStaticDateTimePicker = "MuiStaticDateTimePicker",
    MuiStaticTimePicker = "MuiStaticTimePicker",
    MuiStep = "MuiStep",
    MuiStepButton = "MuiStepButton",
    MuiStepConnector = "MuiStepConnector",
    MuiStepContent = "MuiStepContent",
    MuiStepIcon = "MuiStepIcon",
    MuiStepLabel = "MuiStepLabel",
    MuiStepper = "MuiStepper",
    MuiSvgIcon = "MuiSvgIcon",
    MuiSwipeableDrawer = "MuiSwipeableDrawer",
    MuiSwitch = "MuiSwitch",
    MuiSwitchUnstyled = "MuiSwitchUnstyled",
    MuiTab = "MuiTab",
    MuiTabContext = "MuiTabContext",
    MuiTabList = "MuiTabList",
    MuiTabPanel = "MuiTabPanel",
    MuiTabScrollButton = "MuiTabScrollButton",
    MuiTable = "MuiTable",
    MuiTableBody = "MuiTableBody",
    MuiTableCell = "MuiTableCell",
    MuiTableContainer = "MuiTableContainer",
    MuiTableFooter = "MuiTableFooter",
    MuiTableHead = "MuiTableHead",
    MuiTablePagination = "MuiTablePagination",
    MuiTableRow = "MuiTableRow",
    MuiTableSortLabel = "MuiTableSortLabel",
    MuiTabs = "MuiTabs",
    MuiTextField = "MuiTextField",
    MuiTextareaAutosize = "MuiTextareaAutosize",
    MuiTimePicker = "MuiTimePicker",
    MuiTimeline = "MuiTimeline",
    MuiTimelineConnector = "MuiTimelineConnector",
    MuiTimelineContent = "MuiTimelineContent",
    MuiTimelineDot = "MuiTimelineDot",
    MuiTimelineItem = "MuiTimelineItem",
    MuiTimelineOppositeContent = "MuiTimelineOppositeContent",
    MuiTimelineSeparator = "MuiTimelineSeparator",
    MuiToggleButton = "MuiToggleButton",
    MuiToggleButtonGroup = "MuiToggleButtonGroup",
    MuiToolbar = "MuiToolbar",
    MuiTooltip = "MuiTooltip",
    MuiTreeItem = "MuiTreeItem",
    MuiTreeView = "MuiTreeView",
    MuiTypography = "MuiTypography",
    MuiUnstableTrapFocus = "MuiUnstableTrapFocus",
    MuiYearPicker = "MuiYearPicker",
    MuiZoom = "MuiZoom",
    Query = "Query",
    TextList = "TextList",
    Text = "Text",
    State = "State",
    ReactFragment = "ReactFragment",
    HtmlA = "HtmlA",
    HtmlP = "HtmlP",
    HtmlVideo = "HtmlVideo",
    HtmlUList = "HtmlUList",
    HtmlTrack = "HtmlTrack",
    HtmlTitle = "HtmlTitle",
    HtmlTime = "HtmlTime",
    HtmlTextarea = "HtmlTextarea",
    HtmlTemplate = "HtmlTemplate",
    HtmlTableRow = "HtmlTableRow",
    HtmlTable = "HtmlTable",
    HtmlTableCol = "HtmlTableCol",
    HtmlTableCell = "HtmlTableCell",
    HtmlTableCaption = "HtmlTableCaption",
    HtmlStyle = "HtmlStyle",
    HtmlSpan = "HtmlSpan",
    HtmlSource = "HtmlSource",
    HtmlSelect = "HtmlSelect",
    HtmlQuote = "HtmlQuote",
    HtmlProgress = "HtmlProgress",
    HtmlPre = "HtmlPre",
    HtmlPicture = "HtmlPicture",
    HtmlParam = "HtmlParam",
    HtmlOutput = "HtmlOutput",
    HtmlOption = "HtmlOption",
    HtmlOptgroup = "HtmlOptgroup",
    HtmlObject = "HtmlObject",
    HtmlOList = "HtmlOList",
    HtmlMeter = "HtmlMeter",
    HtmlMeta = "HtmlMeta",
    HtmlMap = "HtmlMap",
    HtmlLink = "HtmlLink",
    HtmlLegend = "HtmlLegend",
    HtmlLabel = "HtmlLabel",
    HtmlLi = "HtmlLi",
    HtmlInput = "HtmlInput",
    HtmlImage = "HtmlImage",
    HtmlIframe = "HtmlIframe",
    HtmlH1 = "HtmlH1",
    HtmlH2 = "HtmlH2",
    HtmlH3 = "HtmlH3",
    HtmlH4 = "HtmlH4",
    HtmlH5 = "HtmlH5",
    HtmlH6 = "HtmlH6",
    HtmlHead = "HtmlHead",
    HtmlHr = "HtmlHr",
    HtmlFrameset = "HtmlFrameset",
    HtmlFrame = "HtmlFrame",
    HtmlForm = "HtmlForm",
    HtmlFont = "HtmlFont",
    HtmlFieldset = "HtmlFieldset",
    HtmlEmbed = "HtmlEmbed",
    HtmlDiv = "HtmlDiv",
    HtmlDialog = "HtmlDialog",
    HtmlDetails = "HtmlDetails",
    HtmlDatalist = "HtmlDatalist",
    HtmlData = "HtmlData",
    HtmlDList = "HtmlDList",
    HtmlCanvas = "HtmlCanvas",
    HtmlButton = "HtmlButton",
    HtmlBase = "HtmlBase",
    HtmlBr = "HtmlBr",
    HtmlAudio = "HtmlAudio",
    HtmlArea = "HtmlArea",
    HtmlFooter = "HtmlFooter",
    HtmlAside = "HtmlAside",
    HtmlHeader = "HtmlHeader",
    HtmlMain = "HtmlMain",
    HtmlNav = "HtmlNav",
    HtmlSection = "HtmlSection",
    HtmlCode = "HtmlCode",
    HtmlEm = "HtmlEm",
    HtmlI = "HtmlI",
    HtmlS = "HtmlS",
    HtmlSmall = "HtmlSmall",
    HtmlStrong = "HtmlStrong",
    HtmlSub = "HtmlSub",
    HtmlSup = "HtmlSup"
}

export interface GetAppInput {
    byId?: Nullable<AppByIdFilter>;
    byPage?: Nullable<AppByPageFilter>;
}

export interface AppByIdFilter {
    appId: string;
}

export interface AppByPageFilter {
    pageId: string;
}

export interface ExportAppInput {
    appId: string;
}

export interface GetElementGraphInput {
    where: WhereUniqueElement;
}

export interface WhereUniqueElement {
    id?: Nullable<string>;
}

export interface GetElementInput {
    where: WhereUniqueElement;
}

export interface GetComponentsInput {
    componentIds?: Nullable<string[]>;
}

export interface GetAtomsInput {
    where?: Nullable<AtomsWhereInput>;
}

export interface AtomsWhereInput {
    ids?: Nullable<string[]>;
    types?: Nullable<AtomType[]>;
}

export interface GetAtomInput {
    where: AtomWhereUniqueInput;
}

export interface AtomWhereUniqueInput {
    id?: Nullable<string>;
    type?: Nullable<AtomType>;
    element?: Nullable<string>;
}

export interface GetTypeInput {
    where: WhereUniqueType;
}

export interface WhereUniqueType {
    id?: Nullable<string>;
    name?: Nullable<string>;
    atomId?: Nullable<string>;
}

export interface GetTypeGraphInput {
    where: WhereUniqueType;
}

export interface GetTypesInput {
    byIds?: Nullable<TypesByIdsFilter>;
    byKind?: Nullable<TypesByKindFilter>;
    byName?: Nullable<TypesByNameFilter>;
}

export interface TypesByIdsFilter {
    typeIds: string[];
}

export interface TypesByKindFilter {
    kind: TypeKind;
}

export interface TypesByNameFilter {
    name: string;
}

export interface GetFieldInput {
    byInterface?: Nullable<FieldByInterfaceFilter>;
    byId?: Nullable<FieldByIdFilter>;
}

export interface FieldByInterfaceFilter {
    interfaceId: string;
    fieldKey: string;
}

export interface FieldByIdFilter {
    fieldId: string;
}

export interface GetUserInput {
    id?: Nullable<string>;
    auth0Id?: Nullable<string>;
}

export interface GetUsersInput {
    page: number;
    perPage: number;
    query: string;
    sort: string;
}

export interface GetPagesInput {
    byApp: PageByAppFilter;
}

export interface PageByAppFilter {
    appId: string;
}

export interface GetPageInput {
    pageId: string;
}

export interface GetLambdaInput {
    lambdaId: string;
}

export interface GetTagInput {
    where: WhereUniqueTag;
}

export interface WhereUniqueTag {
    name?: Nullable<string>;
    id?: Nullable<string>;
}

export interface GetTagsInput {
    ids?: Nullable<string[]>;
}

export interface GetTagGraphsInput {
    where?: Nullable<TagsWhereInput>;
}

export interface TagsWhereInput {
    ids?: Nullable<string[]>;
}

export interface CreateAppInput {
    name: string;
}

export interface UpdateAppInput {
    id: string;
    data: UpdateAppData;
}

export interface UpdateAppData {
    name: string;
}

export interface DeleteAppInput {
    appId: string;
}

export interface CreatePropMapBindingInput {
    elementId: string;
    targetElementId?: Nullable<string>;
    sourceKey: string;
    targetKey: string;
}

export interface UpdatePropMapBindingInput {
    propMapBindingId: string;
    data: UpdatePropMapBindingData;
}

export interface UpdatePropMapBindingData {
    targetElementId?: Nullable<string>;
    sourceKey: string;
    targetKey: string;
}

export interface DeletePropMapBindingInput {
    propMapBindingIds: string[];
}

export interface AddHookToElementInput {
    elementId: string;
    queryHook?: Nullable<QueryHookConfigInput>;
    graphqlQueryHook?: Nullable<GraphqlHookConfigInput>;
    graphqlMutationHook?: Nullable<GraphqlHookConfigInput>;
    recoilStateHook?: Nullable<RecoilStateHookConfigInput>;
    queryPageHook?: Nullable<QueryPageHookConfigInput>;
    queryPagesHook?: Nullable<QueryPagesHookConfigInput>;
}

export interface QueryHookConfigInput {
    queryKey: string;
    url?: Nullable<string>;
    body?: Nullable<string>;
    method?: Nullable<QueryMethod>;
    lambdaId?: Nullable<string>;
}

export interface GraphqlHookConfigInput {
    graphqlUrl: string;
    graphqlBody: string;
    dataKey?: Nullable<string>;
}

export interface RecoilStateHookConfigInput {
    stateKey: string;
    defaultValue?: Nullable<string>;
    persisted: PersistenceType;
}

export interface QueryPageHookConfigInput {
    pageId: string;
}

export interface QueryPagesHookConfigInput {
    appId: string;
}

export interface RemoveHookFromElementInput {
    elementId: string;
    hookId: string;
}

export interface CreateElementInput {
    name?: Nullable<string>;
    atomId?: Nullable<string>;
    parentElementId?: Nullable<string>;
    order?: Nullable<number>;
    childrenIds?: Nullable<string[]>;
}

export interface UpdateElementInput {
    data: UpdateElementData;
    id: string;
}

export interface UpdateElementData {
    name?: Nullable<string>;
    atomId?: Nullable<string>;
    css?: Nullable<string>;
    renderForEachPropKey?: Nullable<string>;
    renderIfPropKey?: Nullable<string>;
    propTransformationJs?: Nullable<string>;
}

export interface MoveElementInput {
    elementId: string;
    moveData: MoveData;
}

export interface MoveData {
    order: number;
    parentElementId: string;
}

export interface UpdateElementPropsInput {
    props: string;
    elementId: string;
}

export interface DeleteElementInput {
    elementId: string;
}

export interface CreateComponentInput {
    name: string;
}

export interface CreateAtomInput {
    name: string;
    type: AtomType;
    api?: Nullable<string>;
}

export interface DeleteAtomInput {
    atomId: string;
}

export interface ImportAtomsInput {
    payload: string;
}

export interface UpdateAtomInput {
    id: string;
    data: CreateAtomInput;
}

export interface UpsertAtomsInput {
    atoms: UpsertAtomInput[];
}

export interface UpsertAtomInput {
    name: string;
    type: AtomType;
    api?: Nullable<string>;
    id?: Nullable<string>;
}

export interface CreateTypeInput {
    name: string;
    typeKind: TypeKind;
    primitiveType?: Nullable<CreatePrimitiveTypeInput>;
    arrayType?: Nullable<CreateArrayTypeInput>;
    enumType?: Nullable<CreateEnumTypeInput>;
    unionType?: Nullable<CreateUnionType>;
    elementType?: Nullable<CreateElementTypeInput>;
}

export interface CreatePrimitiveTypeInput {
    primitiveKind: PrimitiveTypeKind;
}

export interface CreateArrayTypeInput {
    itemTypeId: string;
}

export interface CreateEnumTypeInput {
    allowedValues: CreateEnumTypeValueInput[];
}

export interface CreateEnumTypeValueInput {
    name?: Nullable<string>;
    value: string;
}

export interface CreateUnionType {
    typeIdsOfUnionType: string[];
}

export interface CreateElementTypeInput {
    kind: ElementTypeKind;
}

export interface UpdateEnumTypeInput {
    typeId: string;
    updateData: UpdateEnumTypeData;
}

export interface UpdateEnumTypeData {
    allowedValues: UpdateEnumTypeValueData[];
    name: string;
}

export interface UpdateEnumTypeValueData {
    id?: Nullable<string>;
    name?: Nullable<string>;
    value: string;
}

export interface UpdatePrimitiveTypeInput {
    typeId: string;
    updateData: UpdatePrimitiveKindData;
}

export interface UpdatePrimitiveKindData {
    primitiveKind: PrimitiveTypeKind;
    name: string;
}

export interface UpdateUnionTypeInput {
    updateData: UpdateUnionTypeData;
    typeId: string;
}

export interface UpdateUnionTypeData {
    name: string;
    typeIdsOfUnionType: string[];
}

export interface UpdateTypeInput {
    updateData: UpdateTypeData;
    typeId: string;
}

export interface UpdateTypeData {
    name: string;
}

export interface DeleteTypeInput {
    typeId: string;
}

export interface CreateFieldInput {
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    interfaceId: string;
    type: TypeRef;
}

export interface TypeRef {
    existingTypeId?: Nullable<string>;
    newType?: Nullable<CreateTypeInput>;
}

export interface UpdateFieldInput {
    fieldId: string;
    updateData: UpdateFieldData;
}

export interface UpdateFieldData {
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    type: TypeRef;
}

export interface DeleteFieldInput {
    fieldId: string;
}

export interface UpsertUserInput {
    data: UpsertUserDataInput;
    where?: Nullable<UserWhereUniqueInput>;
}

export interface UpsertUserDataInput {
    auth0Id: string;
    roles: Role[];
}

export interface UserWhereUniqueInput {
    id?: Nullable<string>;
    auth0Id?: Nullable<string>;
}

export interface DeleteUserInput {
    id: string;
}

export interface CreatePageInput {
    name: string;
    appId: string;
}

export interface DeletePageInput {
    pageId: string;
}

export interface UpdatePageInput {
    pageId: string;
    updateData: UpdatePageData;
}

export interface UpdatePageData {
    name: string;
    appId: string;
}

export interface CreateLambdaInput {
    name: string;
    body: string;
}

export interface DeleteLambdaInput {
    lambdaId: string;
}

export interface UpdateLambdaInput {
    name: string;
    body: string;
    id: string;
}

export interface ExecuteLambdaInput {
    lambdaId: string;
    payload?: Nullable<string>;
}

export interface CreateTagInput {
    name: string;
    parentTagId?: Nullable<string>;
}

export interface UpdateTagInput {
    id: string;
    data: UpdateTagData;
}

export interface UpdateTagData {
    name: string;
}

export interface DeleteTagsInput {
    ids: string[];
}

export interface UpsertTagInput {
    data: CreateTagInput;
    where?: Nullable<TagWhereUniqueInput>;
}

export interface TagWhereUniqueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface ImportTagsInput {
    payload: string;
}

export interface TypeEdge {
    source: string;
    target: string;
}

export interface Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface CreateResponse {
    id: string;
}

export interface PayloadResponse {
    payload: string;
}

export interface User {
    id: string;
    auth0Id: string;
    roles: Role[];
}

export interface Hook {
    id: string;
    type: HookType;
    config: HookConfig;
}

export interface QueryHookConfig {
    queryKey: string;
    url?: Nullable<string>;
    body?: Nullable<string>;
    method?: Nullable<QueryMethod>;
    lambdaId?: Nullable<string>;
}

export interface GraphqlHookConfig {
    graphqlBody: string;
    graphqlUrl: string;
    dataKey?: Nullable<string>;
}

export interface RecoilStateHookConfig {
    stateKey: string;
    defaultValue?: Nullable<string>;
    persisted: PersistenceType;
}

export interface QueryPageHookConfig {
    pageId: string;
}

export interface QueryPagesHookConfig {
    appId: string;
}

export interface Field {
    id: string;
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    target: string;
    source: string;
}

export interface BaseTypeEdge extends TypeEdge {
    source: string;
    target: string;
}

export interface FieldTypeEdge extends TypeEdge {
    source: string;
    target: string;
    id: string;
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface ArrayType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface ComponentType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface ElementType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
    elementKind: ElementTypeKind;
}

export interface EnumTypeValue {
    id: string;
    name?: Nullable<string>;
    value: string;
}

export interface EnumType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
    allowedValues: EnumTypeValue[];
}

export interface InterfaceType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface LambdaType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface PrimitiveType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
    primitiveKind: PrimitiveTypeKind;
}

export interface ReactNodeType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface RenderPropsType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
}

export interface UnionType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    typeGraph: TypeGraph;
    typeIdsOfUnionType: string[];
}

export interface TypeGraph {
    vertices: TypeVertex[];
    edges: TypeEdge[];
}

export interface Atom {
    id: string;
    type: AtomType;
    name: string;
    api: InterfaceType;
    apiGraph: TypeGraph;
}

export interface Tag {
    id: string;
    name: string;
    parent?: Nullable<string>;
    children: string[];
    isRoot: boolean;
}

export interface TagEdge {
    source: string;
    target: string;
    order?: Nullable<number>;
}

export interface TagGraph {
    vertices: TagVertex[];
    edges: TagEdge[];
}

export interface PropMapBinding {
    id: string;
    targetElementId?: Nullable<string>;
    sourceKey: string;
    targetKey: string;
}

export interface Element {
    id: string;
    name?: Nullable<string>;
    componentTag?: Nullable<Tag>;
    css?: Nullable<string>;
    atom?: Nullable<Atom>;
    props: string;
    hooks: Hook[];
    renderForEachPropKey?: Nullable<string>;
    renderIfPropKey?: Nullable<string>;
    propMapBindings: PropMapBinding[];
    propTransformationJs?: Nullable<string>;
    graph: ElementGraph;
}

export interface ElementEdge {
    source: string;
    target: string;
    order?: Nullable<number>;
}

export interface ElementGraph {
    vertices: Element[];
    edges: ElementEdge[];
}

export interface App {
    id: string;
    ownerId: string;
    name: string;
    pages: Page[];
}

export interface Lambda {
    id: string;
    ownerId: string;
    name: string;
    body: string;
}

export interface LambdaPayload {
    payload: string;
}

export interface Page {
    id: string;
    name: string;
    elements?: Nullable<ElementGraph>;
    rootElementId: string;
}

export interface IQuery {
    getApp(input: GetAppInput): Nullable<App> | Promise<Nullable<App>>;
    getApps(): App[] | Promise<App[]>;
    exportApp(input: ExportAppInput): PayloadResponse | Promise<PayloadResponse>;
    getElementGraph(input: GetElementGraphInput): ElementGraph | Promise<ElementGraph>;
    getElement(input: GetElementInput): Nullable<Element> | Promise<Nullable<Element>>;
    getComponents(input?: Nullable<GetComponentsInput>): Element[] | Promise<Element[]>;
    getAtoms(input?: Nullable<GetAtomsInput>): Nullable<Atom[]> | Promise<Nullable<Atom[]>>;
    getAtom(input: GetAtomInput): Nullable<Atom> | Promise<Nullable<Atom>>;
    getType(input: GetTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    getTypeGraph(input: GetTypeGraphInput): Nullable<TypeGraph> | Promise<Nullable<TypeGraph>>;
    getTypes(input?: Nullable<GetTypesInput>): Type[] | Promise<Type[]>;
    getField(input: GetFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
    getMe(): Nullable<User> | Promise<Nullable<User>>;
    getUser(input: GetUserInput): Nullable<User> | Promise<Nullable<User>>;
    getUsers(input?: Nullable<GetUsersInput>): User[] | Promise<User[]>;
    getPages(input: GetPagesInput): Page[] | Promise<Page[]>;
    getPage(input: GetPageInput): Nullable<Page> | Promise<Nullable<Page>>;
    getLambda(input: GetLambdaInput): Nullable<Lambda> | Promise<Nullable<Lambda>>;
    getLambdas(): Lambda[] | Promise<Lambda[]>;
    getTag(input: GetTagInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    getTags(input?: Nullable<GetTagsInput>): Tag[] | Promise<Tag[]>;
    getTagGraph(): Nullable<TagGraph> | Promise<Nullable<TagGraph>>;
    getTagGraphs(input?: Nullable<GetTagGraphsInput>): TagGraph | Promise<TagGraph>;
}

export interface IMutation {
    createApp(input: CreateAppInput): App | Promise<App>;
    updateApp(input: UpdateAppInput): Nullable<App> | Promise<Nullable<App>>;
    deleteApp(input: DeleteAppInput): Nullable<App> | Promise<Nullable<App>>;
    createPropMapBinding(input: CreatePropMapBindingInput): CreateResponse | Promise<CreateResponse>;
    updatePropMapBinding(input: UpdatePropMapBindingInput): Nullable<Void> | Promise<Nullable<Void>>;
    deletePropMapBinding(input: DeletePropMapBindingInput): Nullable<Void> | Promise<Nullable<Void>>;
    addHookToElement(input: AddHookToElementInput): CreateResponse | Promise<CreateResponse>;
    removeHookFromElement(input: RemoveHookFromElementInput): Nullable<Void> | Promise<Nullable<Void>>;
    createElement(input: CreateElementInput): Element | Promise<Element>;
    updateElement(input: UpdateElementInput): Element | Promise<Element>;
    moveElement(input: MoveElementInput): Element | Promise<Element>;
    updateElementProps(input: UpdateElementPropsInput): Element | Promise<Element>;
    deleteElement(input: DeleteElementInput): Element | Promise<Element>;
    createComponent(input: CreateComponentInput): Element | Promise<Element>;
    createAtom(input: CreateAtomInput): Atom | Promise<Atom>;
    deleteAtom(input: DeleteAtomInput): Nullable<Atom> | Promise<Nullable<Atom>>;
    importAtoms(input: ImportAtomsInput): Nullable<Void> | Promise<Nullable<Void>>;
    updateAtom(input: UpdateAtomInput): Nullable<Atom> | Promise<Nullable<Atom>>;
    upsertAtoms(input: UpsertAtomsInput): Atom[] | Promise<Atom[]>;
    seedBaseTypes(): Nullable<Void> | Promise<Nullable<Void>>;
    createType(input: CreateTypeInput): Type | Promise<Type>;
    updateEnumType(input: UpdateEnumTypeInput): Nullable<EnumType> | Promise<Nullable<EnumType>>;
    updatePrimitiveType(input: UpdatePrimitiveTypeInput): Nullable<PrimitiveType> | Promise<Nullable<PrimitiveType>>;
    updateUnionType(input: UpdateUnionTypeInput): Nullable<UnionType> | Promise<Nullable<UnionType>>;
    updateType(input: UpdateTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    deleteType(input: DeleteTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    createField(input: CreateFieldInput): Field | Promise<Field>;
    updateField(input: UpdateFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
    deleteField(input: DeleteFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
    upsertUser(input: UpsertUserInput): User | Promise<User>;
    deleteUser(input: DeleteUserInput): boolean | Promise<boolean>;
    resetData(): Nullable<Void> | Promise<Nullable<Void>>;
    createPage(input: CreatePageInput): Page | Promise<Page>;
    deletePage(input: DeletePageInput): Page | Promise<Page>;
    updatePage(input: UpdatePageInput): Page | Promise<Page>;
    createLambda(input: CreateLambdaInput): Lambda | Promise<Lambda>;
    deleteLambda(input: DeleteLambdaInput): Lambda | Promise<Lambda>;
    updateLambda(input: UpdateLambdaInput): Nullable<Lambda> | Promise<Nullable<Lambda>>;
    executeLambda(input: ExecuteLambdaInput): Nullable<LambdaPayload> | Promise<Nullable<LambdaPayload>>;
    createTag(input: CreateTagInput): Tag | Promise<Tag>;
    updateTag(input: UpdateTagInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    deleteTags(input: DeleteTagsInput): Nullable<Tag[]> | Promise<Nullable<Tag[]>>;
    upsertTag(input: UpsertTagInput): Tag | Promise<Tag>;
    importTags(input: ImportTagsInput): Nullable<Void> | Promise<Nullable<Void>>;
}

export type Void = any;
export type HookConfig = QueryHookConfig | GraphqlHookConfig | RecoilStateHookConfig | QueryPageHookConfig | QueryPagesHookConfig;
export type TypeVertex = EnumType | PrimitiveType | ArrayType | ComponentType | ElementType | InterfaceType | LambdaType | RenderPropsType | ReactNodeType | UnionType;
export type TagVertex = Tag;
type Nullable<T> = T | null;
