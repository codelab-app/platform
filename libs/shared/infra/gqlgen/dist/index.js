var p = Object.defineProperty;
var o = (e, t, a) => t in e ? p(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var i = (e, t, a) => o(e, typeof t != "symbol" ? t + "" : t, a);
var d = /* @__PURE__ */ ((e) => (e.ApiAction = "ApiAction", e.CodeAction = "CodeAction", e))(d || {}), s = /* @__PURE__ */ ((e) => (e.AntDesignAffix = "AntDesignAffix", e.AntDesignAlert = "AntDesignAlert", e.AntDesignAnchor = "AntDesignAnchor", e.AntDesignAutoComplete = "AntDesignAutoComplete", e.AntDesignAvatar = "AntDesignAvatar", e.AntDesignBackTop = "AntDesignBackTop", e.AntDesignBadge = "AntDesignBadge", e.AntDesignBreadcrumb = "AntDesignBreadcrumb", e.AntDesignButton = "AntDesignButton", e.AntDesignCalendar = "AntDesignCalendar", e.AntDesignCard = "AntDesignCard", e.AntDesignCardMeta = "AntDesignCardMeta", e.AntDesignCarousel = "AntDesignCarousel", e.AntDesignCascader = "AntDesignCascader", e.AntDesignCheckbox = "AntDesignCheckbox", e.AntDesignCheckboxGroup = "AntDesignCheckboxGroup", e.AntDesignCollapse = "AntDesignCollapse", e.AntDesignConfigProvider = "AntDesignConfigProvider", e.AntDesignDatePicker = "AntDesignDatePicker", e.AntDesignDescriptions = "AntDesignDescriptions", e.AntDesignDivider = "AntDesignDivider", e.AntDesignDrawer = "AntDesignDrawer", e.AntDesignDropdown = "AntDesignDropdown", e.AntDesignDropdownButton = "AntDesignDropdownButton", e.AntDesignEmpty = "AntDesignEmpty", e.AntDesignForm = "AntDesignForm", e.AntDesignFormErrorList = "AntDesignFormErrorList", e.AntDesignFormItem = "AntDesignFormItem", e.AntDesignFormList = "AntDesignFormList", e.AntDesignFormProvider = "AntDesignFormProvider", e.AntDesignGridCol = "AntDesignGridCol", e.AntDesignGridRow = "AntDesignGridRow", e.AntDesignIcon = "AntDesignIcon", e.AntDesignImage = "AntDesignImage", e.AntDesignInput = "AntDesignInput", e.AntDesignInputNumber = "AntDesignInputNumber", e.AntDesignInputSearch = "AntDesignInputSearch", e.AntDesignInputTextArea = "AntDesignInputTextArea", e.AntDesignLayout = "AntDesignLayout", e.AntDesignLayoutContent = "AntDesignLayoutContent", e.AntDesignLayoutFooter = "AntDesignLayoutFooter", e.AntDesignLayoutHeader = "AntDesignLayoutHeader", e.AntDesignLayoutSider = "AntDesignLayoutSider", e.AntDesignList = "AntDesignList", e.AntDesignListItem = "AntDesignListItem", e.AntDesignListItemMeta = "AntDesignListItemMeta", e.AntDesignMentions = "AntDesignMentions", e.AntDesignMenu = "AntDesignMenu", e.AntDesignMessage = "AntDesignMessage", e.AntDesignModal = "AntDesignModal", e.AntDesignNotification = "AntDesignNotification", e.AntDesignPagination = "AntDesignPagination", e.AntDesignPopconfirm = "AntDesignPopconfirm", e.AntDesignPopover = "AntDesignPopover", e.AntDesignProgress = "AntDesignProgress", e.AntDesignRadioGroup = "AntDesignRadioGroup", e.AntDesignRate = "AntDesignRate", e.AntDesignResult = "AntDesignResult", e.AntDesignSegmented = "AntDesignSegmented", e.AntDesignSelect = "AntDesignSelect", e.AntDesignSkeleton = "AntDesignSkeleton", e.AntDesignSlider = "AntDesignSlider", e.AntDesignSpace = "AntDesignSpace", e.AntDesignSpin = "AntDesignSpin", e.AntDesignStatistic = "AntDesignStatistic", e.AntDesignSteps = "AntDesignSteps", e.AntDesignSwitch = "AntDesignSwitch", e.AntDesignTable = "AntDesignTable", e.AntDesignTabs = "AntDesignTabs", e.AntDesignTag = "AntDesignTag", e.AntDesignTimePicker = "AntDesignTimePicker", e.AntDesignTimeline = "AntDesignTimeline", e.AntDesignTooltip = "AntDesignTooltip", e.AntDesignTransfer = "AntDesignTransfer", e.AntDesignTree = "AntDesignTree", e.AntDesignTreeSelect = "AntDesignTreeSelect", e.AntDesignTypographyParagraph = "AntDesignTypographyParagraph", e.AntDesignTypographyText = "AntDesignTypographyText", e.AntDesignTypographyTitle = "AntDesignTypographyTitle", e.AntDesignUpload = "AntDesignUpload", e.ExternalComponent = "ExternalComponent", e.GridLayout = "GridLayout", e.HookGraphqlMutation = "HookGraphqlMutation", e.HookGraphqlQuery = "HookGraphqlQuery", e.HookQueryConfig = "HookQueryConfig", e.HookQueryLambda = "HookQueryLambda", e.HookQueryPage = "HookQueryPage", e.HookQueryPages = "HookQueryPages", e.HookRecoilState = "HookRecoilState", e.HookRouter = "HookRouter", e.HtmlA = "HtmlA", e.HtmlAbbr = "HtmlAbbr", e.HtmlArea = "HtmlArea", e.HtmlArticle = "HtmlArticle", e.HtmlAside = "HtmlAside", e.HtmlAudio = "HtmlAudio", e.HtmlB = "HtmlB", e.HtmlBase = "HtmlBase", e.HtmlBdo = "HtmlBdo", e.HtmlBlockquote = "HtmlBlockquote", e.HtmlBr = "HtmlBr", e.HtmlButton = "HtmlButton", e.HtmlCanvas = "HtmlCanvas", e.HtmlCaption = "HtmlCaption", e.HtmlCite = "HtmlCite", e.HtmlCode = "HtmlCode", e.HtmlCol = "HtmlCol", e.HtmlData = "HtmlData", e.HtmlDatalist = "HtmlDatalist", e.HtmlDetails = "HtmlDetails", e.HtmlDfn = "HtmlDfn", e.HtmlDialog = "HtmlDialog", e.HtmlDiv = "HtmlDiv", e.HtmlDl = "HtmlDl", e.HtmlEm = "HtmlEm", e.HtmlEmbed = "HtmlEmbed", e.HtmlFieldset = "HtmlFieldset", e.HtmlFooter = "HtmlFooter", e.HtmlForm = "HtmlForm", e.HtmlH1 = "HtmlH1", e.HtmlH2 = "HtmlH2", e.HtmlH3 = "HtmlH3", e.HtmlH4 = "HtmlH4", e.HtmlH5 = "HtmlH5", e.HtmlH6 = "HtmlH6", e.HtmlHead = "HtmlHead", e.HtmlHeader = "HtmlHeader", e.HtmlHr = "HtmlHr", e.HtmlI = "HtmlI", e.HtmlIframe = "HtmlIframe", e.HtmlImg = "HtmlImg", e.HtmlInput = "HtmlInput", e.HtmlKbd = "HtmlKbd", e.HtmlLabel = "HtmlLabel", e.HtmlLegend = "HtmlLegend", e.HtmlLi = "HtmlLi", e.HtmlLink = "HtmlLink", e.HtmlMain = "HtmlMain", e.HtmlMap = "HtmlMap", e.HtmlMark = "HtmlMark", e.HtmlMath = "HtmlMath", e.HtmlMeta = "HtmlMeta", e.HtmlMeter = "HtmlMeter", e.HtmlNav = "HtmlNav", e.HtmlNoscript = "HtmlNoscript", e.HtmlObject = "HtmlObject", e.HtmlOl = "HtmlOl", e.HtmlOptgroup = "HtmlOptgroup", e.HtmlOption = "HtmlOption", e.HtmlOutput = "HtmlOutput", e.HtmlP = "HtmlP", e.HtmlPicture = "HtmlPicture", e.HtmlPre = "HtmlPre", e.HtmlProgress = "HtmlProgress", e.HtmlQ = "HtmlQ", e.HtmlRuby = "HtmlRuby", e.HtmlS = "HtmlS", e.HtmlSamp = "HtmlSamp", e.HtmlScript = "HtmlScript", e.HtmlSection = "HtmlSection", e.HtmlSelect = "HtmlSelect", e.HtmlSmall = "HtmlSmall", e.HtmlSource = "HtmlSource", e.HtmlSpan = "HtmlSpan", e.HtmlStrong = "HtmlStrong", e.HtmlStyle = "HtmlStyle", e.HtmlSub = "HtmlSub", e.HtmlSup = "HtmlSup", e.HtmlTable = "HtmlTable", e.HtmlTd = "HtmlTd", e.HtmlTextarea = "HtmlTextarea", e.HtmlTh = "HtmlTh", e.HtmlTime = "HtmlTime", e.HtmlTitle = "HtmlTitle", e.HtmlTr = "HtmlTr", e.HtmlTrack = "HtmlTrack", e.HtmlU = "HtmlU", e.HtmlUl = "HtmlUl", e.HtmlVar = "HtmlVar", e.HtmlVideo = "HtmlVideo", e.HtmlWbr = "HtmlWbr", e.LexicalEditor = "LexicalEditor", e.MuiAccordion = "MuiAccordion", e.MuiAccordionActions = "MuiAccordionActions", e.MuiAccordionDetails = "MuiAccordionDetails", e.MuiAccordionSummary = "MuiAccordionSummary", e.MuiAlert = "MuiAlert", e.MuiAlertTitle = "MuiAlertTitle", e.MuiAppBar = "MuiAppBar", e.MuiAutocomplete = "MuiAutocomplete", e.MuiAvatar = "MuiAvatar", e.MuiAvatarGroup = "MuiAvatarGroup", e.MuiBackdrop = "MuiBackdrop", e.MuiBadge = "MuiBadge", e.MuiBadgeUnstyled = "MuiBadgeUnstyled", e.MuiBottomNavigation = "MuiBottomNavigation", e.MuiBottomNavigationAction = "MuiBottomNavigationAction", e.MuiBox = "MuiBox", e.MuiBreadcrumbs = "MuiBreadcrumbs", e.MuiButton = "MuiButton", e.MuiButtonBase = "MuiButtonBase", e.MuiButtonGroup = "MuiButtonGroup", e.MuiButtonUnstyled = "MuiButtonUnstyled", e.MuiCalendarPicker = "MuiCalendarPicker", e.MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton", e.MuiCard = "MuiCard", e.MuiCardActionArea = "MuiCardActionArea", e.MuiCardActions = "MuiCardActions", e.MuiCardContent = "MuiCardContent", e.MuiCardHeader = "MuiCardHeader", e.MuiCardMedia = "MuiCardMedia", e.MuiCheckbox = "MuiCheckbox", e.MuiChip = "MuiChip", e.MuiCircularProgress = "MuiCircularProgress", e.MuiClickAwayListener = "MuiClickAwayListener", e.MuiClockPicker = "MuiClockPicker", e.MuiCollapse = "MuiCollapse", e.MuiContainer = "MuiContainer", e.MuiCssBaseline = "MuiCssBaseline", e.MuiDataGrid = "MuiDataGrid", e.MuiDatePicker = "MuiDatePicker", e.MuiDateRangePicker = "MuiDateRangePicker", e.MuiDateRangePickerDay = "MuiDateRangePickerDay", e.MuiDateTimePicker = "MuiDateTimePicker", e.MuiDesktopDatePicker = "MuiDesktopDatePicker", e.MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker", e.MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker", e.MuiDesktopTimePicker = "MuiDesktopTimePicker", e.MuiDialog = "MuiDialog", e.MuiDialogActions = "MuiDialogActions", e.MuiDialogContent = "MuiDialogContent", e.MuiDialogContentText = "MuiDialogContentText", e.MuiDialogTitle = "MuiDialogTitle", e.MuiDivider = "MuiDivider", e.MuiDrawer = "MuiDrawer", e.MuiFab = "MuiFab", e.MuiFade = "MuiFade", e.MuiFilledInput = "MuiFilledInput", e.MuiFormControl = "MuiFormControl", e.MuiFormControlLabel = "MuiFormControlLabel", e.MuiFormControlUnstyled = "MuiFormControlUnstyled", e.MuiFormGroup = "MuiFormGroup", e.MuiFormHelperText = "MuiFormHelperText", e.MuiFormLabel = "MuiFormLabel", e.MuiGlobalStyles = "MuiGlobalStyles", e.MuiGrid = "MuiGrid", e.MuiGridColDef = "MuiGridColDef", e.MuiGrow = "MuiGrow", e.MuiHidden = "MuiHidden", e.MuiIcon = "MuiIcon", e.MuiIconButton = "MuiIconButton", e.MuiImageList = "MuiImageList", e.MuiImageListItem = "MuiImageListItem", e.MuiImageListItemBar = "MuiImageListItemBar", e.MuiInput = "MuiInput", e.MuiInputAdornment = "MuiInputAdornment", e.MuiInputBase = "MuiInputBase", e.MuiInputLabel = "MuiInputLabel", e.MuiLinearProgress = "MuiLinearProgress", e.MuiLink = "MuiLink", e.MuiList = "MuiList", e.MuiListItem = "MuiListItem", e.MuiListItemAvatar = "MuiListItemAvatar", e.MuiListItemButton = "MuiListItemButton", e.MuiListItemIcon = "MuiListItemIcon", e.MuiListItemSecondaryAction = "MuiListItemSecondaryAction", e.MuiListItemText = "MuiListItemText", e.MuiListSubheader = "MuiListSubheader", e.MuiLoadingButton = "MuiLoadingButton", e.MuiMasonry = "MuiMasonry", e.MuiMasonryItem = "MuiMasonryItem", e.MuiMenu = "MuiMenu", e.MuiMenuItem = "MuiMenuItem", e.MuiMenuList = "MuiMenuList", e.MuiMobileDatePicker = "MuiMobileDatePicker", e.MuiMobileDateRangePicker = "MuiMobileDateRangePicker", e.MuiMobileDateTimePicker = "MuiMobileDateTimePicker", e.MuiMobileStepper = "MuiMobileStepper", e.MuiMobileTimePicker = "MuiMobileTimePicker", e.MuiModal = "MuiModal", e.MuiModalUnstyled = "MuiModalUnstyled", e.MuiMonthPicker = "MuiMonthPicker", e.MuiNativeSelect = "MuiNativeSelect", e.MuiNoSsr = "MuiNoSsr", e.MuiOutlinedInput = "MuiOutlinedInput", e.MuiPagination = "MuiPagination", e.MuiPaginationItem = "MuiPaginationItem", e.MuiPaper = "MuiPaper", e.MuiPickersDay = "MuiPickersDay", e.MuiPopover = "MuiPopover", e.MuiPopper = "MuiPopper", e.MuiPortal = "MuiPortal", e.MuiRadio = "MuiRadio", e.MuiRadioGroup = "MuiRadioGroup", e.MuiRating = "MuiRating", e.MuiScopedCssBaseline = "MuiScopedCssBaseline", e.MuiSelect = "MuiSelect", e.MuiSkeleton = "MuiSkeleton", e.MuiSlide = "MuiSlide", e.MuiSlider = "MuiSlider", e.MuiSliderUnstyled = "MuiSliderUnstyled", e.MuiSnackbar = "MuiSnackbar", e.MuiSnackbarContent = "MuiSnackbarContent", e.MuiSpeedDial = "MuiSpeedDial", e.MuiSpeedDialAction = "MuiSpeedDialAction", e.MuiSpeedDialIcon = "MuiSpeedDialIcon", e.MuiStack = "MuiStack", e.MuiStaticDatePicker = "MuiStaticDatePicker", e.MuiStaticDateRangePicker = "MuiStaticDateRangePicker", e.MuiStaticDateTimePicker = "MuiStaticDateTimePicker", e.MuiStaticTimePicker = "MuiStaticTimePicker", e.MuiStep = "MuiStep", e.MuiStepButton = "MuiStepButton", e.MuiStepConnector = "MuiStepConnector", e.MuiStepContent = "MuiStepContent", e.MuiStepIcon = "MuiStepIcon", e.MuiStepLabel = "MuiStepLabel", e.MuiStepper = "MuiStepper", e.MuiSvgIcon = "MuiSvgIcon", e.MuiSwipeableDrawer = "MuiSwipeableDrawer", e.MuiSwitch = "MuiSwitch", e.MuiSwitchUnstyled = "MuiSwitchUnstyled", e.MuiTab = "MuiTab", e.MuiTabContext = "MuiTabContext", e.MuiTabList = "MuiTabList", e.MuiTabPanel = "MuiTabPanel", e.MuiTabScrollButton = "MuiTabScrollButton", e.MuiTable = "MuiTable", e.MuiTableBody = "MuiTableBody", e.MuiTableCell = "MuiTableCell", e.MuiTableContainer = "MuiTableContainer", e.MuiTableFooter = "MuiTableFooter", e.MuiTableHead = "MuiTableHead", e.MuiTablePagination = "MuiTablePagination", e.MuiTableRow = "MuiTableRow", e.MuiTableSortLabel = "MuiTableSortLabel", e.MuiTabs = "MuiTabs", e.MuiTextField = "MuiTextField", e.MuiTextareaAutosize = "MuiTextareaAutosize", e.MuiTimePicker = "MuiTimePicker", e.MuiTimeline = "MuiTimeline", e.MuiTimelineConnector = "MuiTimelineConnector", e.MuiTimelineContent = "MuiTimelineContent", e.MuiTimelineDot = "MuiTimelineDot", e.MuiTimelineItem = "MuiTimelineItem", e.MuiTimelineOppositeContent = "MuiTimelineOppositeContent", e.MuiTimelineSeparator = "MuiTimelineSeparator", e.MuiToggleButton = "MuiToggleButton", e.MuiToggleButtonGroup = "MuiToggleButtonGroup", e.MuiToolbar = "MuiToolbar", e.MuiTooltip = "MuiTooltip", e.MuiTreeItem = "MuiTreeItem", e.MuiTreeView = "MuiTreeView", e.MuiTypography = "MuiTypography", e.MuiUnstableTrapFocus = "MuiUnstableTrapFocus", e.MuiYearPicker = "MuiYearPicker", e.MuiZoom = "MuiZoom", e.NextLink = "NextLink", e.Query = "Query", e.ReactFragment = "ReactFragment", e.Script = "Script", e.State = "State", e.Text = "Text", e.TextList = "TextList", e))(s || {}), y = /* @__PURE__ */ ((e) => (e.ApiAction = "ApiAction", e.CodeAction = "CodeAction", e))(y || {}), m = /* @__PURE__ */ ((e) => (e.Desktop = "Desktop", e.MobileLandscape = "MobileLandscape", e.MobilePortrait = "MobilePortrait", e.Tablet = "Tablet", e))(m || {}), T = /* @__PURE__ */ ((e) => (e.Css = "Css", e.CssInJs = "CssInJs", e.Graphql = "Graphql", e.Javascript = "Javascript", e.Json = "Json", e.Typescript = "Typescript", e))(T || {}), c = /* @__PURE__ */ ((e) => (e.Css = "CSS", e.Component = "Component", e.Node = "Node", e.Page = "Page", e.Props = "Props", e.PropsInspector = "PropsInspector", e.PropsMap = "PropsMap", e.PropsTransformation = "PropsTransformation", e))(c || {}), u = /* @__PURE__ */ ((e) => (e.AllElements = "AllElements", e.ChildrenOnly = "ChildrenOnly", e.DescendantsOnly = "DescendantsOnly", e.ExcludeDescendantsElements = "ExcludeDescendantsElements", e))(u || {}), l = /* @__PURE__ */ ((e) => (e.Create = "CREATE", e.CreateRelationship = "CREATE_RELATIONSHIP", e.Delete = "DELETE", e.DeleteRelationship = "DELETE_RELATIONSHIP", e.Update = "UPDATE", e))(l || {}), g = /* @__PURE__ */ ((e) => (e.ActionType = "ActionType", e.AppType = "AppType", e.ArrayType = "ArrayType", e.CodeMirrorType = "CodeMirrorType", e.ElementType = "ElementType", e.EnumType = "EnumType", e.InterfaceType = "InterfaceType", e.LambdaType = "LambdaType", e.PageType = "PageType", e.PrimitiveType = "PrimitiveType", e.ReactNodeType = "ReactNodeType", e.RenderPropType = "RenderPropType", e.RichTextType = "RichTextType", e.UnionType = "UnionType", e))(g || {}), f = /* @__PURE__ */ ((e) => (e.InternalServerError = "InternalServerError", e.NotFound = "NotFound", e.Provider = "Provider", e.Regular = "Regular", e))(f || {}), B = /* @__PURE__ */ ((e) => (e.Boolean = "Boolean", e.Integer = "Integer", e.Number = "Number", e.String = "String", e))(B || {}), A = /* @__PURE__ */ ((e) => (e.Page = "Page", e.Url = "Url", e))(A || {}), P = /* @__PURE__ */ ((e) => (e.GraphQl = "GraphQl", e.Rest = "Rest", e))(P || {}), w = /* @__PURE__ */ ((e) => (e.Admin = "Admin", e.User = "User", e))(w || {}), h = /* @__PURE__ */ ((e) => (e.Asc = "ASC", e.Desc = "DESC", e))(h || {}), D = /* @__PURE__ */ ((e) => (e.ActionType = "ActionType", e.AppType = "AppType", e.ArrayType = "ArrayType", e.CodeMirrorType = "CodeMirrorType", e.ElementType = "ElementType", e.EnumType = "EnumType", e.InterfaceType = "InterfaceType", e.LambdaType = "LambdaType", e.PageType = "PageType", e.PrimitiveType = "PrimitiveType", e.ReactNodeType = "ReactNodeType", e.RenderPropType = "RenderPropType", e.RichTextType = "RichTextType", e.UnionType = "UnionType", e))(D || {}), R = /* @__PURE__ */ ((e) => (e.ArrayType = "ArrayType", e.InterfaceType = "InterfaceType", e.UnionType = "UnionType", e))(R || {}), I = /* @__PURE__ */ ((e) => (e.App = "App", e.Atom = "Atom", e.AuthGuard = "AuthGuard", e.Component = "Component", e.Preference = "Preference", e.Resource = "Resource", e.Tag = "Tag", e))(I || {});
class n extends String {
  constructor(a, r) {
    super(a);
    i(this, "__apiType");
    this.value = a, this.__meta__ = r;
  }
  toString() {
    return this.value;
  }
}
const _ = new n(`
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
    `, { fragmentName: "Domain" }), M = new n(`
    fragment Owner on User {
  id
}
    `, { fragmentName: "Owner" }), E = new n(`
    fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
    `, { fragmentName: "PagePreview" }), $ = new n(`
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`, { fragmentName: "AppPreview" }), v = new n(`
    fragment Prop on Prop {
  data
  id
}
    `, { fragmentName: "Prop" }), S = new n(`
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
    `, { fragmentName: "BaseType" }), b = new n(`
    fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "Field" }), U = new n(`
    fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`, { fragmentName: "InterfaceType" }), k = new n(`
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
    `, { fragmentName: "TagPreview" }), F = new n(`
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "AtomBuilder" }), x = new n(`
    fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "ElementRenderType" }), H = new n(`
    fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Element" }), N = new n(`
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
    `, { fragmentName: "BaseAction" }), L = new n(`
    fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}`, { fragmentName: "CodeAction" }), G = new n(`
    fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}`, { fragmentName: "Resource" }), V = new n(`
    fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "ApiAction" }), O = new n(`
    fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "Action" }), W = new n(`
    fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Store" }), K = new n(`
    fragment ActionType on ActionType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ActionType" }), q = new n(`
    fragment AppType on AppType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "AppType" }), Q = new n(`
    fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ArrayType" }), J = new n(`
    fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "CodeMirrorType" }), j = new n(`
    fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ElementType" }), z = new n(`
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `, { fragmentName: "EnumTypeValue" }), Y = new n(`
    fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}`, { fragmentName: "EnumType" }), Z = new n(`
    fragment LambdaType on LambdaType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "LambdaType" }), X = new n(`
    fragment PageType on PageType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "PageType" }), ee = new n(`
    fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "PrimitiveType" }), ne = new n(`
    fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ReactNodeType" }), te = new n(`
    fragment RenderPropType on RenderPropType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "RenderPropType" }), ae = new n(`
    fragment RichTextType on RichTextType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "RichTextType" }), ie = new n(`
    fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "UnionType" }), re = new n(`
    fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "Type" }), pe = new n(`
    fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "Page" }), oe = new n(`
    fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "App" }), de = new n(`
    fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "PageDevelopment" }), se = new n(`
    fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "AppBuilder" }), ye = new n(`
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
    `, { fragmentName: "AtomProduction" }), me = new n(`
    fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}`, { fragmentName: "ElementRenderTypeProduction" }), Te = new n(`
    fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment Prop on Prop {
  data
  id
}`, { fragmentName: "ElementProduction" }), ce = new n(`
    fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "PageProduction" }), ue = new n(`
    fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "AppProduction" }), le = new n(`
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Atom" }), ge = new n(`
    fragment Component on Component {
  __typename
  api {
    __typename
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "Component" }), fe = new n(`
    fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "ComponentBuilder" }), Be = new n(`
    fragment ComponentProduction on Component {
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "ComponentProduction" }), Ae = new n(`
    fragment HookProp on Prop {
  data
  id
}
    `, { fragmentName: "HookProp" }), Pe = new n(`
    fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}
    fragment HookProp on Prop {
  data
  id
}`, { fragmentName: "Hook" }), we = new n(`
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "AuthGuard" }), he = new n(`
    fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "Redirect" }), De = new n(`
    fragment RedirectPreview on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}
    `, { fragmentName: "RedirectPreview" }), Re = new n(`
    fragment ProductionStore on Store {
  actions {
    ...Action
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "ProductionStore" }), Ie = new n(`
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
    name
  }
}
    `, { fragmentName: "Tag" }), Ce = new n(`
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}
    `, { fragmentName: "Preference" }), _e = new n(`
    fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
  name
  picture
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}`, { fragmentName: "User" }), Me = new n(`
    query GetPageBuilder($appId: ID!, $pageIds: [ID!]) {
  actionTypes {
    ...ActionType
  }
  apps(where: {id: $appId}) {
    ...AppBuilder
  }
  atoms {
    ...AtomBuilder
  }
  authGuards {
    ...AuthGuard
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  redirects(where: {source: {app: {id: $appId}}}) {
    ...Redirect
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`), Ee = new n(`
    query GetComponentBuilder($componentId: ID!) {
  actionTypes {
    ...ActionType
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components(where: {id: $componentId}) {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`), $e = new n(`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      __typename
      id
    }
  }
}
    `), ve = new n(`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      __typename
      id
    }
  }
}
    `), Se = new n(`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), be = new n(`
    query AppListPreview($options: AppOptions, $where: AppWhere) {
  aggregate: appsAggregate(where: $where) {
    count
  }
  items: apps(options: $options, where: $where) {
    ...AppPreview
  }
}
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`), Ue = new n(`
    query AppList($options: AppOptions, $where: AppWhere) {
  items: apps(options: $options, where: $where) {
    ...App
  }
  aggregate: appsAggregate(where: $where) {
    count
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`), ke = new n(`
    query GetAppProduction($domain: String!, $pageUrlPattern: String!) {
  apps(where: {domains_SOME: {name_IN: [$domain]}}) {
    ...AppProduction
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomProduction
  }
  resources {
    ...Resource
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`), Fe = new n(`
    mutation CreateAtoms($input: [AtomCreateInput!]!) {
  createAtoms(input: $input) {
    atoms {
      __typename
      id
    }
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}
    `), xe = new n(`
    mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
  deleteAtoms(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), He = new n(`
    query AtomList($where: AtomWhere, $options: AtomOptions) {
  aggregate: atomsAggregate(where: $where) {
    count
  }
  items: atoms(options: $options, where: $where) {
    ...Atom
  }
}
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`), Ne = new n(`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      __typename
      id
    }
  }
}
    `), Le = new n(`
    query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {
  aggregate: authGuardsAggregate(where: $where) {
    count
  }
  items: authGuards(options: $options, where: $where) {
    ...AuthGuard
  }
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`), Ge = new n(`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      __typename
      id
    }
  }
}
    `), Ve = new n(`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      __typename
      id
    }
  }
}
    `), Oe = new n(`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `), We = new n(`
    mutation CreateComponents($input: [ComponentCreateInput!]!) {
  createComponents(input: $input) {
    components {
      __typename
      id
      store {
        id
      }
      rootElement {
        id
      }
    }
  }
}
    `), Ke = new n(`
    mutation DeleteComponents($where: ComponentWhere, $delete: ComponentDeleteInput) {
  deleteComponents(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), qe = new n(`
    mutation UpdateComponents($where: ComponentWhere, $update: ComponentUpdateInput) {
  updateComponents(update: $update, where: $where) {
    components {
      __typename
      id
    }
  }
}
    `), Qe = new n(`
    query ComponentList($options: ComponentOptions, $where: ComponentWhere) {
  aggregate: componentsAggregate(where: $where) {
    count
  }
  items: components(options: $options, where: $where) {
    ...Component
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Component on Component {
  __typename
  api {
    __typename
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`), Je = new n(`
    query DomainList($options: DomainOptions, $where: DomainWhere) {
  aggregate: domainsAggregate(where: $where) {
    count
  }
  items: domains(options: $options, where: $where) {
    ...Domain
  }
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}`), je = new n(`
    mutation CreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      __typename
      id
    }
  }
}
    `), ze = new n(`
    mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      __typename
      id
    }
  }
}
    `), Ye = new n(`
    mutation DeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `), Ze = new n(`
    mutation CreateElements($input: [ElementCreateInput!]!) {
  createElements(input: $input) {
    elements {
      __typename
      id
    }
  }
}
    `), Xe = new n(`
    mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
  deleteElements(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), en = new n(`
    mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
  updateElements(update: $update, where: $where) {
    elements {
      __typename
      id
    }
  }
}
    `), nn = new n(`
    query ElementList($options: ElementOptions, $where: ElementWhere) {
  aggregate: elementsAggregate(where: $where) {
    count
  }
  items: elements(options: $options, where: $where) {
    ...Element
  }
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`), tn = new n(`
    mutation CreateHooks($input: [HookCreateInput!]!) {
  createHooks(input: $input) {
    hooks {
      ...Hook
    }
  }
}
    fragment HookProp on Prop {
  data
  id
}
fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}`), an = new n(`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `), rn = new n(`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      __typename
      id
    }
  }
}
    `), pn = new n(`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      __typename
      id
    }
  }
}
    `), on = new n(`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `), dn = new n(`
    query GetFields($where: FieldWhere, $options: FieldOptions) {
  aggregate: fieldsAggregate(where: $where) {
    count
  }
  items: fields(options: $options, where: $where) {
    ...Field
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`), sn = new n(`
    mutation CreatePages($input: [PageCreateInput!]!) {
  createPages(input: $input) {
    pages {
      __typename
      id
      rootElement {
        id
      }
    }
  }
}
    `), yn = new n(`
    mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
  deletePages(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), mn = new n(`
    mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
  updatePages(update: $update, where: $where) {
    pages {
      __typename
      id
    }
  }
}
    `), Tn = new n(`
    query PageList($options: PageOptions, $where: PageWhere) {
  aggregate: pagesAggregate(where: $where) {
    count
  }
  items: pages(options: $options, where: $where) {
    ...Page
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), cn = new n(`
    query GetRenderedPage($pageId: ID!) {
  pages(where: {id: $pageId}) {
    ...PageDevelopment
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), un = new n(`
    mutation CreatePreferences($input: [PreferenceCreateInput!]!) {
  createPreferences(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    preferences {
      __typename
      id
    }
  }
}
    `), ln = new n(`
    mutation DeletePreferences($where: PreferenceWhere, $delete: PreferenceDeleteInput) {
  deletePreferences(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), gn = new n(`
    query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {
  aggregate: preferencesAggregate(where: $where) {
    count
  }
  items: preferences(options: $options, where: $where) {
    ...Preference
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}`), fn = new n(`
    mutation UpdatePreferences($where: PreferenceWhere, $update: PreferenceUpdateInput) {
  updatePreferences(update: $update, where: $where) {
    preferences {
      __typename
      id
    }
  }
}
    `), Bn = new n(`
    mutation CreateProps($input: [PropCreateInput!]!) {
  createProps(input: $input) {
    props {
      __typename
      id
    }
  }
}
    `), An = new n(`
    mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
  updateProps(update: $update, where: $where) {
    props {
      __typename
      id
    }
  }
}
    `), Pn = new n(`
    mutation DeleteProps($where: PropWhere!) {
  deleteProps(where: $where) {
    nodesDeleted
  }
}
    `), wn = new n(`
    query GetProps($options: PropOptions, $where: PropWhere) {
  aggregate: propsAggregate(where: $where) {
    count
  }
  items: props(options: $options, where: $where) {
    ...Prop
  }
}
    fragment Prop on Prop {
  data
  id
}`), hn = new n(`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      __typename
      id
    }
  }
}
    `), Dn = new n(`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), Rn = new n(`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      __typename
      id
    }
  }
}
    `), In = new n(`
    query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...Redirect
  }
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`), Cn = new n(`
    query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...RedirectPreview
  }
}
    fragment RedirectPreview on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}`), _n = new n(`
    query ResourceList($options: ResourceOptions, $where: ResourceWhere) {
  aggregate: resourcesAggregate(where: $where) {
    count
  }
  items: resources(options: $options, where: $where) {
    ...Resource
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`), Mn = new n(`
    mutation CreateResources($input: [ResourceCreateInput!]!) {
  createResources(input: $input) {
    resources {
      __typename
      id
    }
  }
}
    `), En = new n(`
    mutation UpdateResources($where: ResourceWhere, $update: ResourceUpdateInput) {
  updateResources(update: $update, where: $where) {
    resources {
      __typename
      id
    }
  }
}
    `), $n = new n(`
    mutation DeleteResources($where: ResourceWhere, $delete: ResourceDeleteInput) {
  deleteResources(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `), vn = new n(`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      __typename
      id
    }
  }
}
    `), Sn = new n(`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
    apiActions {
      __typename
      id
    }
  }
}
    `), bn = new n(`
    mutation DeleteCodeActions($where: CodeActionWhere!, $delete: CodeActionDeleteInput) {
  deleteCodeActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), Un = new n(`
    mutation DeleteApiActions($where: ApiActionWhere!, $delete: ApiActionDeleteInput) {
  deleteApiActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), kn = new n(`
    query GetActions($codeActionWhere: CodeActionWhere, $apiActionWhere: ApiActionWhere, $codeActionOptions: CodeActionOptions, $apiActionOptions: ApiActionOptions) {
  apiActions(where: $apiActionWhere, options: $apiActionOptions) {
    ...Action
  }
  codeActions(where: $codeActionWhere, options: $codeActionOptions) {
    ...Action
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`), Fn = new n(`
    mutation CreateStores($input: [StoreCreateInput!]!) {
  createStores(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    stores {
      __typename
      id
    }
  }
}
    `), xn = new n(`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `), Hn = new n(`
    query GetStores($where: StoreWhere, $options: StoreOptions) {
  aggregate: storesAggregate(where: $where) {
    count
  }
  items: stores(options: $options, where: $where) {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`), Nn = new n(`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      __typename
      id
    }
  }
}
    `), Ln = new n(`
    mutation UpdateCodeActions($update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(update: $update, where: $where) {
    codeActions {
      __typename
      id
    }
  }
}
    `), Gn = new n(`
    mutation UpdateApiActions($update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(update: $update, where: $where) {
    apiActions {
      __typename
      id
    }
  }
}
    `), Vn = new n(`
    mutation CreateTags($input: [TagCreateInput!]!) {
  createTags(input: $input) {
    tags {
      __typename
      id
    }
  }
}
    `), On = new n(`
    mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
  updateTags(update: $update, where: $where) {
    tags {
      __typename
      id
    }
  }
}
    `), Wn = new n(`
    mutation DeleteTags($where: TagWhere!) {
  deleteTags(where: $where) {
    nodesDeleted
  }
}
    `), Kn = new n(`
    query GetTags($options: TagOptions, $where: TagWhere) {
  aggregate: tagsAggregate(where: $where) {
    count
  }
  items: tags(options: $options, where: $where) {
    ...Tag
  }
}
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
    name
  }
}`), qn = new n(`
    mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
  types: createPrimitiveTypes(input: $input) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `), Qn = new n(`
    mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
  types: createArrayTypes(input: $input) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `), Jn = new n(`
    mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
  types: createUnionTypes(input: $input) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `), jn = new n(`
    mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
  types: createInterfaceTypes(input: $input) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `), zn = new n(`
    mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
  types: createElementTypes(input: $input) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `), Yn = new n(`
    mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
  types: createRenderPropTypes(input: $input) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `), Zn = new n(`
    mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
  types: createReactNodeTypes(input: $input) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `), Xn = new n(`
    mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
  types: createEnumTypes(input: $input) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `), et = new n(`
    mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
  types: createLambdaTypes(input: $input) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `), nt = new n(`
    mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
  types: createPageTypes(input: $input) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `), tt = new n(`
    mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
  types: createAppTypes(input: $input) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `), at = new n(`
    mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
  types: createRichTextTypes(input: $input) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `), it = new n(`
    mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
  types: createActionTypes(input: $input) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `), rt = new n(`
    mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
  types: createCodeMirrorTypes(input: $input) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `), pt = new n(`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), ot = new n(`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), dt = new n(`
    mutation DeleteReactNodeTypes($delete: ReactNodeTypeDeleteInput, $where: ReactNodeTypeWhere) {
  deleteReactNodeTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), st = new n(`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), yt = new n(`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), mt = new n(`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), Tt = new n(`
    mutation DeleteRenderPropTypes($delete: RenderPropTypeDeleteInput, $where: RenderPropTypeWhere) {
  deleteRenderPropTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), ct = new n(`
    mutation DeleteRichTextTypes($delete: RichTextTypeDeleteInput, $where: RichTextTypeWhere) {
  deleteRichTextTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), ut = new n(`
    mutation DeleteEnumTypes($delete: EnumTypeDeleteInput, $where: EnumTypeWhere) {
  deleteEnumTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
  deleteEnumTypeValues(where: {enumTypeConnection: {node: $where}}) {
    nodesDeleted
  }
}
    `), lt = new n(`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), gt = new n(`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), ft = new n(`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), Bt = new n(`
    mutation DeleteActionTypes($delete: ActionTypeDeleteInput, $where: ActionTypeWhere) {
  deleteActionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), At = new n(`
    mutation DeleteCodeMirrorTypes($delete: CodeMirrorTypeDeleteInput, $where: CodeMirrorTypeWhere) {
  deleteCodeMirrorTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `), Pt = new n(`
    query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {
  iBaseTypes(where: $where, options: $options) {
    ...BaseType
  }
  aggregate: iBaseTypesAggregate(where: $where) {
    count
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`), wt = new n(`
    query GetTypes($ids: [ID!]) {
  actionTypes(where: {id_IN: $ids}) {
    ...Type
  }
  appTypes(where: {id_IN: $ids}) {
    ...Type
  }
  arrayTypes(where: {id_IN: $ids}) {
    ...Type
  }
  codeMirrorTypes(where: {id_IN: $ids}) {
    ...Type
  }
  elementTypes(where: {id_IN: $ids}) {
    ...Type
  }
  enumTypes(where: {id_IN: $ids}) {
    ...Type
  }
  interfaceTypes(where: {id_IN: $ids}) {
    ...Type
  }
  lambdaTypes(where: {id_IN: $ids}) {
    ...Type
  }
  pageTypes(where: {id_IN: $ids}) {
    ...Type
  }
  primitiveTypes(where: {id_IN: $ids}) {
    ...Type
  }
  reactNodeTypes(where: {id_IN: $ids}) {
    ...Type
  }
  renderPropTypes(where: {id_IN: $ids}) {
    ...Type
  }
  richTextTypes(where: {id_IN: $ids}) {
    ...Type
  }
  unionTypes(where: {id_IN: $ids}) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), ht = new n(`
    query GetDescendants($ids: [ID!]) {
  arrayTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  interfaceTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  unionTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
}
    `), Dt = new n(`
    query GetPrimitiveTypes($options: PrimitiveTypeOptions, $where: PrimitiveTypeWhere) {
  types: primitiveTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Rt = new n(`
    query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
  types: arrayTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), It = new n(`
    query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
  types: unionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Ct = new n(`
    query GetInterfaceTypes($options: InterfaceTypeOptions, $where: InterfaceTypeWhere) {
  types: interfaceTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), _t = new n(`
    query GetElementTypes($options: ElementTypeOptions, $where: ElementTypeWhere) {
  types: elementTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Mt = new n(`
    query GetRenderPropTypes($options: RenderPropTypeOptions, $where: RenderPropTypeWhere) {
  types: renderPropTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Et = new n(`
    query GetReactNodeTypes($options: ReactNodeTypeOptions, $where: ReactNodeTypeWhere) {
  types: reactNodeTypes(options: $options, where: $where) {
    ...ReactNodeType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}`), $t = new n(`
    query GetRichTextTypes($options: RichTextTypeOptions, $where: RichTextTypeWhere) {
  types: richTextTypes(options: $options, where: $where) {
    ...RichTextType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment RichTextType on RichTextType {
  ...BaseType
}`), vt = new n(`
    query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
  types: enumTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), St = new n(`
    query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
  types: lambdaTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), bt = new n(`
    query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
  types: pageTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Ut = new n(`
    query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
  types: appTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), kt = new n(`
    query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {
  types: actionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), Ft = new n(`
    query GetCodeMirrorTypes($options: CodeMirrorTypeOptions, $where: CodeMirrorTypeWhere) {
  types: codeMirrorTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`), xt = new n(`
    query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    id
    name
  }
}
    `), Ht = new n(`
    query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
  atoms(options: $options, where: $where) {
    id
    name
    type
  }
}
    `), Nt = new n(`
    query InterfaceForm_GetActions($appId: ID) {
  apiActions {
    id
    name
  }
  codeActions {
    id
    name
  }
}
    `), Lt = new n(`
    query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
  stores(options: $options, where: $where) {
    id
    name
  }
}
    `), Gt = new n(`
    query InterfaceForm_GetResource($options: ResourceOptions, $where: ResourceWhere) {
  resources(options: $options, where: $where) {
    id
    name
  }
}
    `), Vt = new n(`
    query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
  pages(options: $options, where: $where) {
    id
    name
  }
}
    `), Ot = new n(`
    query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
  isTypeDescendantOf(
    descendantTypeId: $descendantTypeId
    parentTypeId: $parentTypeId
  )
}
    `), Wt = new n(`
    query GetTypeReferences($typeId: ID!) {
  getTypeReferences(typeId: $typeId) {
    label
    name
  }
}
    `), Kt = new n(`
    mutation UpdatePrimitiveTypes($update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  types: updatePrimitiveTypes(update: $update, where: $where) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `), qt = new n(`
    mutation UpdateArrayTypes($update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  types: updateArrayTypes(update: $update, where: $where) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `), Qt = new n(`
    mutation UpdateUnionTypes($update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  types: updateUnionTypes(update: $update, where: $where) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `), Jt = new n(`
    mutation UpdateInterfaceTypes($update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  types: updateInterfaceTypes(update: $update, where: $where) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `), jt = new n(`
    mutation UpdateReactNodeTypes($update: ReactNodeTypeUpdateInput, $where: ReactNodeTypeWhere) {
  types: updateReactNodeTypes(update: $update, where: $where) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `), zt = new n(`
    mutation UpdateElementTypes($update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  types: updateElementTypes(update: $update, where: $where) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `), Yt = new n(`
    mutation UpdateRenderPropTypes($update: RenderPropTypeUpdateInput, $where: RenderPropTypeWhere) {
  types: updateRenderPropTypes(update: $update, where: $where) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `), Zt = new n(`
    mutation UpdateEnumTypes($update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  types: updateEnumTypes(update: $update, where: $where) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `), Xt = new n(`
    mutation UpdateLambdaTypes($update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  types: updateLambdaTypes(update: $update, where: $where) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `), ea = new n(`
    mutation UpdatePageTypes($update: PageTypeUpdateInput, $where: PageTypeWhere) {
  types: updatePageTypes(update: $update, where: $where) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `), na = new n(`
    mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
  types: updateAppTypes(update: $update, where: $where) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `), ta = new n(`
    mutation UpdateRichTextTypes($update: RichTextTypeUpdateInput, $where: RichTextTypeWhere) {
  types: updateRichTextTypes(update: $update, where: $where) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `), aa = new n(`
    mutation UpdateActionTypes($update: ActionTypeUpdateInput, $where: ActionTypeWhere) {
  types: updateActionTypes(update: $update, where: $where) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `), ia = new n(`
    mutation UpdateCodeMirrorTypes($update: CodeMirrorTypeUpdateInput, $where: CodeMirrorTypeWhere) {
  types: updateCodeMirrorTypes(update: $update, where: $where) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `), ra = new n(`
    query GetUsers($where: UserWhere) {
  aggregate: usersAggregate(where: $where) {
    count
  }
  items: users(where: $where) {
    ...User
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}
fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
  name
  picture
}`), pa = new n(`
    mutation CreateUser($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    users {
      email
      __typename
      id
    }
  }
}
    `), oa = new n(`
    mutation DeleteUsers($where: UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
    `), da = new n(`
    mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {
  updateUsers(update: $update, where: $where) {
    users {
      __typename
      id
    }
  }
}
    `);
export {
  O as ActionFragmentDoc,
  d as ActionKind,
  K as ActionTypeFragmentDoc,
  V as ApiActionFragmentDoc,
  se as AppBuilderFragmentDoc,
  oe as AppFragmentDoc,
  Ue as AppListDocument,
  be as AppListPreviewDocument,
  $ as AppPreviewFragmentDoc,
  ue as AppProductionFragmentDoc,
  q as AppTypeFragmentDoc,
  Q as ArrayTypeFragmentDoc,
  F as AtomBuilderFragmentDoc,
  le as AtomFragmentDoc,
  He as AtomListDocument,
  ye as AtomProductionFragmentDoc,
  s as AtomType,
  we as AuthGuardFragmentDoc,
  N as BaseActionFragmentDoc,
  y as BaseActionImplementation,
  S as BaseTypeFragmentDoc,
  m as BreakpointType,
  L as CodeActionFragmentDoc,
  T as CodeMirrorLanguage,
  J as CodeMirrorTypeFragmentDoc,
  fe as ComponentBuilderFragmentDoc,
  ge as ComponentFragmentDoc,
  Qe as ComponentListDocument,
  Be as ComponentProductionFragmentDoc,
  c as ConfigPaneTab,
  it as CreateActionTypesDocument,
  Sn as CreateApiActionsDocument,
  tt as CreateAppTypesDocument,
  $e as CreateAppsDocument,
  Qn as CreateArrayTypesDocument,
  Fe as CreateAtomsDocument,
  Ge as CreateAuthGuardsDocument,
  vn as CreateCodeActionsDocument,
  rt as CreateCodeMirrorTypesDocument,
  We as CreateComponentsDocument,
  je as CreateDomainsDocument,
  zn as CreateElementTypesDocument,
  Ze as CreateElementsDocument,
  Xn as CreateEnumTypesDocument,
  rn as CreateFieldsDocument,
  tn as CreateHooksDocument,
  jn as CreateInterfaceTypesDocument,
  et as CreateLambdaTypesDocument,
  nt as CreatePageTypesDocument,
  sn as CreatePagesDocument,
  un as CreatePreferencesDocument,
  qn as CreatePrimitiveTypesDocument,
  Bn as CreatePropsDocument,
  Zn as CreateReactNodeTypesDocument,
  hn as CreateRedirectsDocument,
  Yn as CreateRenderPropTypesDocument,
  Mn as CreateResourcesDocument,
  at as CreateRichTextTypesDocument,
  Fn as CreateStoresDocument,
  Vn as CreateTagsDocument,
  Jn as CreateUnionTypesDocument,
  pa as CreateUserDocument,
  Bt as DeleteActionTypesDocument,
  Un as DeleteApiActionsDocument,
  ft as DeleteAppTypesDocument,
  Se as DeleteAppsDocument,
  ot as DeleteArrayTypesDocument,
  xe as DeleteAtomsDocument,
  Oe as DeleteAuthGuardsDocument,
  bn as DeleteCodeActionsDocument,
  At as DeleteCodeMirrorTypesDocument,
  Ke as DeleteComponentsDocument,
  Ye as DeleteDomainsDocument,
  mt as DeleteElementTypesDocument,
  Xe as DeleteElementsDocument,
  ut as DeleteEnumTypesDocument,
  on as DeleteFieldsDocument,
  an as DeleteHooksDocument,
  yt as DeleteInterfaceTypesDocument,
  lt as DeleteLambdaTypesDocument,
  gt as DeletePageTypesDocument,
  yn as DeletePagesDocument,
  ln as DeletePreferencesDocument,
  pt as DeletePrimitiveTypesDocument,
  Pn as DeletePropsDocument,
  dt as DeleteReactNodeTypesDocument,
  Dn as DeleteRedirectsDocument,
  Tt as DeleteRenderPropTypesDocument,
  $n as DeleteResourcesDocument,
  ct as DeleteRichTextTypesDocument,
  xn as DeleteStoresDocument,
  Wn as DeleteTagsDocument,
  st as DeleteUnionTypesDocument,
  oa as DeleteUsersDocument,
  _ as DomainFragmentDoc,
  Je as DomainListDocument,
  H as ElementFragmentDoc,
  nn as ElementListDocument,
  Te as ElementProductionFragmentDoc,
  x as ElementRenderTypeFragmentDoc,
  me as ElementRenderTypeProductionFragmentDoc,
  j as ElementTypeFragmentDoc,
  u as ElementTypeKind,
  Y as EnumTypeFragmentDoc,
  z as EnumTypeValueFragmentDoc,
  l as EventType,
  b as FieldFragmentDoc,
  kt as GetActionTypesDocument,
  kn as GetActionsDocument,
  ke as GetAppProductionDocument,
  Ut as GetAppTypesDocument,
  Rt as GetArrayTypesDocument,
  Le as GetAuthGuardsDocument,
  Pt as GetBaseTypesDocument,
  Ft as GetCodeMirrorTypesDocument,
  Ee as GetComponentBuilderDocument,
  ht as GetDescendantsDocument,
  _t as GetElementTypesDocument,
  vt as GetEnumTypesDocument,
  dn as GetFieldsDocument,
  Ct as GetInterfaceTypesDocument,
  St as GetLambdaTypesDocument,
  Me as GetPageBuilderDocument,
  bt as GetPageTypesDocument,
  gn as GetPreferencesDocument,
  Dt as GetPrimitiveTypesDocument,
  wn as GetPropsDocument,
  Et as GetReactNodeTypesDocument,
  In as GetRedirectsDocument,
  Cn as GetRedirectsPreviewDocument,
  Mt as GetRenderPropTypesDocument,
  cn as GetRenderedPageDocument,
  $t as GetRichTextTypesDocument,
  Hn as GetStoresDocument,
  Kn as GetTagsDocument,
  Wt as GetTypeReferencesDocument,
  wt as GetTypesDocument,
  It as GetUnionTypesDocument,
  ra as GetUsersDocument,
  Pe as HookFragmentDoc,
  Ae as HookPropFragmentDoc,
  g as IBaseTypeImplementation,
  Nt as InterfaceForm_GetActionsDocument,
  xt as InterfaceForm_GetAppsDocument,
  Ht as InterfaceForm_GetAtomsDocument,
  Vt as InterfaceForm_GetPagesDocument,
  Gt as InterfaceForm_GetResourceDocument,
  Lt as InterfaceForm_GetStoresDocument,
  U as InterfaceTypeFragmentDoc,
  Ot as IsTypeDescendantOfDocument,
  Z as LambdaTypeFragmentDoc,
  M as OwnerFragmentDoc,
  de as PageDevelopmentFragmentDoc,
  pe as PageFragmentDoc,
  f as PageKind,
  Tn as PageListDocument,
  E as PagePreviewFragmentDoc,
  ce as PageProductionFragmentDoc,
  X as PageTypeFragmentDoc,
  Ce as PreferenceFragmentDoc,
  ee as PrimitiveTypeFragmentDoc,
  B as PrimitiveTypeKind,
  Re as ProductionStoreFragmentDoc,
  v as PropFragmentDoc,
  ne as ReactNodeTypeFragmentDoc,
  he as RedirectFragmentDoc,
  De as RedirectPreviewFragmentDoc,
  A as RedirectTargetType,
  te as RenderPropTypeFragmentDoc,
  G as ResourceFragmentDoc,
  _n as ResourceListDocument,
  P as ResourceType,
  ae as RichTextTypeFragmentDoc,
  w as Role,
  h as SortDirection,
  W as StoreFragmentDoc,
  Ie as TagFragmentDoc,
  k as TagPreviewFragmentDoc,
  re as TypeFragmentDoc,
  D as TypeKind,
  n as TypedDocumentString,
  ie as UnionTypeFragmentDoc,
  aa as UpdateActionTypesDocument,
  Gn as UpdateApiActionsDocument,
  na as UpdateAppTypesDocument,
  ve as UpdateAppsDocument,
  qt as UpdateArrayTypesDocument,
  Ne as UpdateAtomsDocument,
  Ve as UpdateAuthGuardDocument,
  Ln as UpdateCodeActionsDocument,
  ia as UpdateCodeMirrorTypesDocument,
  qe as UpdateComponentsDocument,
  ze as UpdateDomainsDocument,
  zt as UpdateElementTypesDocument,
  en as UpdateElementsDocument,
  Zt as UpdateEnumTypesDocument,
  pn as UpdateFieldsDocument,
  Jt as UpdateInterfaceTypesDocument,
  Xt as UpdateLambdaTypesDocument,
  ea as UpdatePageTypesDocument,
  mn as UpdatePagesDocument,
  fn as UpdatePreferencesDocument,
  Kt as UpdatePrimitiveTypesDocument,
  An as UpdatePropsDocument,
  jt as UpdateReactNodeTypesDocument,
  Rn as UpdateRedirectsDocument,
  Yt as UpdateRenderPropTypesDocument,
  En as UpdateResourcesDocument,
  ta as UpdateRichTextTypesDocument,
  Nn as UpdateStoresDocument,
  On as UpdateTagsDocument,
  Qt as UpdateUnionTypesDocument,
  da as UpdateUsersDocument,
  _e as UserFragmentDoc,
  R as WithDescendantsImplementation,
  I as WithOwnerImplementation
};
