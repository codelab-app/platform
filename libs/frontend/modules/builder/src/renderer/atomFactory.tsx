import { AtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import React from 'react'

const Row = dynamic(() => import('antd/lib/grid/row'))
const Icon = dynamic(() => import('antd/lib/icon'))
const Menu = dynamic(() => import('antd/lib/menu'))
const MenuItem = dynamic(() => import('antd/lib/menu/MenuItem'))

const ItemGroup = dynamic(() =>
  import('antd/lib/menu').then((mod) => mod.default.ItemGroup as any),
)

const SubMenu = dynamic(() => import('antd/lib/menu/SubMenu'))
const Col = dynamic(() => import('antd/lib/grid/col'))
const Card = dynamic(() => import('antd/lib/card'))
const CardGrid = dynamic(() => import('antd/lib/card/Grid'))
const CardMeta = dynamic(() => import('antd/lib/card/Meta'))
const Typography = dynamic(() => import('antd/lib/typography'))
const TypographyTitle = dynamic(() => import('antd/lib/typography/Title'))
const TypographyText = dynamic(() => import('antd/lib/typography/Text'))

const TypographyParagraph = dynamic(
  () => import('antd/lib/typography/Paragraph'),
)

const Alert = dynamic(() => import('antd/lib/alert'))
const Affix = dynamic(() => import('antd/lib/affix'))
const AutoComplete = dynamic(() => import('antd/lib/auto-complete'))
const Button = dynamic(() => import('antd/lib/button'))
const Breadcrumb = dynamic(() => import('antd/lib/breadcrumb'))

const BreadcrumbItem = dynamic(() =>
  import('antd/lib/breadcrumb').then((mod) => mod.default.Item as any),
)

const Dropdown = dynamic(() => import('antd/lib/dropdown'))
const Form = dynamic(() => import('antd/lib/form'))
const FormItem = dynamic(() => import('antd/lib/form/FormItem'))
const FormList = dynamic(() => import('antd/lib/form/FormList'))
const Checkbox = dynamic(() => import('antd/lib/checkbox'))
const Input = dynamic(() => import('antd/lib/input'))
const InputNumber = dynamic(() => import('antd/lib/input-number'))
const Select = dynamic(() => import('antd/lib/select'))

const SelectOption = dynamic(() =>
  import('antd/lib/select').then((mod) => mod.default.Option as any),
)

const ReactGridLayout = dynamic(() => import('react-grid-layout'))

const ReactGridLayoutResponsive = dynamic(
  () =>
    import('react-grid-layout').then(({ WidthProvider, Responsive }) =>
      WidthProvider(Responsive),
    ) as any,
)

const Modal = dynamic(() => import('antd/lib/modal'))
const RadioGroup = dynamic(() => import('antd/lib/radio/group'))
const Radio = dynamic(() => import('antd/lib/radio'))
const Rate = dynamic(() => import('antd/lib/rate'))
const Slider = dynamic(() => import('antd/lib/slider') as any)
const Switch = dynamic(() => import('antd/lib/switch'))
const Space = dynamic(() => import('antd/lib/space'))
const DatePicker = dynamic(() => import('antd/lib/date-picker'))
const Divider = dynamic(() => import('antd/lib/divider'))
const Pagination = dynamic(() => import('antd/lib/pagination'))
const PageHeader = dynamic(() => import('antd/lib/page-header'))
const Badge = dynamic(() => import('antd/lib/badge'))
const Avatar = dynamic(() => import('antd/lib/avatar'))
const Comment = dynamic(() => import('antd/lib/comment'))
const Calendar = dynamic(() => import('antd/lib/calendar'))
const Descriptions = dynamic(() => import('antd/lib/descriptions'))
const DescriptionsItem = dynamic(() => import('antd/lib/descriptions/Item'))
const Empty = dynamic(() => import('antd/lib/empty'))
const Timeline = dynamic(() => import('antd/lib/timeline'))
const TimelineItem = dynamic(() => import('antd/lib/timeline/TimelineItem'))
const Tabs = dynamic(() => import('antd/lib/tabs'))

const TabPane = dynamic(
  () => import('antd/lib/tabs').then((mod) => mod.default.TabPane) as any,
)

const Statistic = dynamic(() => import('antd/lib/statistic'))
const Tooltip = dynamic(() => import('antd/lib/tooltip'))
const Tag = dynamic(() => import('antd/lib/tag'))
const Tree = dynamic(() => import('antd/lib/tree'))
const Drawer = dynamic(() => import('antd/lib/drawer'))
const Progress = dynamic(() => import('antd/lib/progress') as any)
const Result = dynamic(() => import('antd/lib/result'))
const Spin = dynamic(() => import('antd/lib/spin'))
const Skeleton = dynamic(() => import('antd/lib/skeleton'))
const Anchor = dynamic(() => import('antd/lib/anchor'))
const AnchorLink = dynamic(() => import('antd/lib/anchor/AnchorLink'))
const BackTop = dynamic(() => import('antd/lib/back-top'))
const ConfigProvider = dynamic(() => import('antd/lib/config-provider'))
const PopConfirm = dynamic(() => import('antd/lib/popconfirm'))
const TreeSelect = dynamic(() => import('antd/lib/tree-select'))

const TreeNode = dynamic(
  () =>
    import('antd/lib/tree-select').then((mod) => mod.default.TreeNode) as any,
)

const TimePicker = dynamic(() => import('antd/lib/time-picker'))
const Upload = dynamic(() => import('antd/lib/upload'))
const Steps = dynamic(() => import('antd/lib/steps'))

const Step = dynamic(
  () => import('antd/lib/steps').then((mod) => mod.default.Step) as any,
)

const Collapse = dynamic(() => import('antd/lib/collapse'))
const CollapsePanel = dynamic(() => import('antd/lib/collapse/CollapsePanel'))
const Carousel = dynamic(() => import('antd/lib/carousel'))
const List = dynamic(() => import('antd/lib/list'))
const ListItem = dynamic(() => import('antd/lib/list/Item'))

const ListItemMeta = dynamic(
  () => import('antd/lib/list/Item').then((mod) => mod.default.Meta) as any,
)

const Mentions = dynamic(() => import('antd/lib/mentions'))

const MentionsOption = dynamic(
  () => import('antd/lib/mentions').then((mod) => mod.Option) as any,
)

const Layout = dynamic(() => import('antd/lib/layout'))

const LayoutHeader = dynamic(
  () => import('antd/lib/layout').then((mod) => mod.default.Header) as any,
)

const LayoutSider = dynamic(() => import('antd/lib/layout/Sider'))

const LayoutContent = dynamic(
  () => import('antd/lib/layout').then((mod) => mod.default.Content) as any,
)

const LayoutFooter = dynamic(
  () => import('antd/lib/layout').then((mod) => mod.default.Footer) as any,
)

const Popover = dynamic(() => import('antd/lib/popover'))
const Table = dynamic(() => import('antd/lib/table'))
const Image = dynamic(() => import('antd/lib/image'))

const CodelabQuery = dynamic(
  () =>
    import('@codelab/frontend/view/components').then((mod) => mod.Query) as any,
)

const CodelabTextList = dynamic(
  () =>
    import('@codelab/frontend/view/components').then(
      (mod) => mod.TextList,
    ) as any,
)

const CodelabText = dynamic(
  () =>
    import('@codelab/frontend/view/components').then((mod) => mod.Text) as any,
)

const CodelabState = dynamic(
  () =>
    import('@codelab/frontend/view/components').then((mod) => mod.State) as any,
)

/**
 * Returns a ReactComponent corresponding to the input AtomType
 * Returns null if a mapping is not found
 */
export const atomFactory = (
  atomType: AtomType,
): React.ComponentType<any> | string | null => {
  // Switch statement instead of a map, since otherwise they would all get loaded into memory
  switch (atomType) {
    //
    // HTML
    //
    case AtomType.ReactFragment:
      return React.Fragment
    case AtomType.HtmlDiv:
      return 'div'
    case AtomType.HtmlSpan:
      return 'span'
    case AtomType.HtmlA:
      return 'a'
    case AtomType.HtmlP:
      return 'p'
    case AtomType.HtmlVideo:
      return 'video'
    case AtomType.HtmlUList:
      return 'ul'
    case AtomType.HtmlTrack:
      return 'track'
    case AtomType.HtmlTitle:
      return 'title'
    case AtomType.HtmlTime:
      return 'time'
    case AtomType.HtmlTextarea:
      return 'textarea'
    case AtomType.HtmlTemplate:
      return 'template'
    case AtomType.HtmlTableRow:
      return 'tr'
    case AtomType.HtmlTable:
      return 'table'
    case AtomType.HtmlTableCol:
      return 'col'
    case AtomType.HtmlTableCell:
      return 'td'
    case AtomType.HtmlTableCaption:
      return 'caption'
    case AtomType.HtmlStyle:
      return 'style'
    case AtomType.HtmlSource:
      return 'source'
    case AtomType.HtmlSelect:
      return 'select'
    case AtomType.HtmlQuote:
      return 'blockquote'
    case AtomType.HtmlProgress:
      return 'progress'
    case AtomType.HtmlPre:
      return 'pre'
    case AtomType.HtmlPicture:
      return 'picture'
    case AtomType.HtmlParam:
      return 'param'
    case AtomType.HtmlOutput:
      return 'output'
    case AtomType.HtmlOption:
      return 'option'
    case AtomType.HtmlOptgroup:
      return 'optgroup'
    case AtomType.HtmlObject:
      return 'object'
    case AtomType.HtmlOList:
      return 'ol'
    case AtomType.HtmlMeter:
      return 'meter'
    case AtomType.HtmlMeta:
      return 'meta'
    case AtomType.HtmlMap:
      return 'map'
    case AtomType.HtmlLink:
      return 'link'
    case AtomType.HtmlLegend:
      return 'legend'
    case AtomType.HtmlLabel:
      return 'label'
    case AtomType.HtmlLi:
      return 'li'
    case AtomType.HtmlInput:
      return 'input'
    case AtomType.HtmlImage:
      return 'img'
    case AtomType.HtmlIframe:
      return 'iframe'
    case AtomType.HtmlH1:
      return 'h1'
    case AtomType.HtmlH2:
      return 'h2'
    case AtomType.HtmlH3:
      return 'h3'
    case AtomType.HtmlH4:
      return 'h4'
    case AtomType.HtmlH5:
      return 'h5'
    case AtomType.HtmlH6:
      return 'h6'
    case AtomType.HtmlHead:
      return 'head'
    case AtomType.HtmlHr:
      return 'hr'
    case AtomType.HtmlFrameset:
      return 'frameset'
    case AtomType.HtmlFrame:
      return 'frame'
    case AtomType.HtmlForm:
      return 'form'
    case AtomType.HtmlFont:
      return 'font'
    case AtomType.HtmlFieldset:
      return 'fieldset'
    case AtomType.HtmlEmbed:
      return 'embed'
    case AtomType.HtmlDialog:
      return 'dialog'
    case AtomType.HtmlDetails:
      return 'details'
    case AtomType.HtmlDatalist:
      return 'datalist'
    case AtomType.HtmlData:
      return 'data'
    case AtomType.HtmlDList:
      return 'dl'
    case AtomType.HtmlCanvas:
      return 'canvas'
    case AtomType.HtmlButton:
      return 'button'
    case AtomType.HtmlBase:
      return 'base'
    case AtomType.HtmlBr:
      return 'br'
    case AtomType.HtmlAudio:
      return 'audio'
    case AtomType.HtmlArea:
      return 'area'
    case AtomType.HtmlFooter:
      return 'footer'
    case AtomType.HtmlHeader:
      return 'header'
    case AtomType.HtmlAside:
      return 'aside'
    case AtomType.HtmlMain:
      return 'main'
    case AtomType.HtmlNav:
      return 'nav'
    case AtomType.HtmlSection:
      return 'section'
    case AtomType.HtmlCode:
      return 'code'
    case AtomType.HtmlEm:
      return 'em'
    case AtomType.HtmlI:
      return 'i'
    case AtomType.HtmlS:
      return 's'
    case AtomType.HtmlSmall:
      return 'small'
    case AtomType.HtmlStrong:
      return 'strong'
    case AtomType.HtmlSub:
      return 'sub'
    case AtomType.HtmlSup:
      return 'sup'
    //
    // Ant Design
    //
    case AtomType.AntDesignIcon:
      return Icon
    case AtomType.AntDesignMenu:
      return Menu
    case AtomType.AntDesignMenuItem:
      return MenuItem
    case AtomType.AntDesignMenuItemGroup:
      return ItemGroup
    case AtomType.AntDesignMenuSubMenu:
      return SubMenu
    case AtomType.AntDesignGridCol:
      return Col
    case AtomType.AntDesignGridRow:
      return Row
    case AtomType.AntDesignCard:
      return Card
    case AtomType.AntDesignCardGrid:
      return CardGrid
    case AtomType.AntDesignCardMeta:
      return CardMeta
    case AtomType.AntDesignTypography:
      return Typography
    case AtomType.AntDesignTypographyTitle:
      return TypographyTitle
    case AtomType.AntDesignTypographyText:
      return TypographyText
    case AtomType.AntDesignTypographyParagraph:
      return TypographyParagraph
    case AtomType.AntDesignAlert:
      return Alert
    case AtomType.AntDesignAffix:
      return Affix
    case AtomType.AntDesignAutoComplete:
      return AutoComplete
    case AtomType.AntDesignButton:
      return Button
    case AtomType.AntDesignBreadcrumb:
      return Breadcrumb
    case AtomType.AntDesignBreadcrumbItem:
      return BreadcrumbItem
    case AtomType.AntDesignDropdown:
      return Dropdown
    case AtomType.AntDesignForm:
      return Form
    case AtomType.AntDesignFormItem:
      return FormItem
    case AtomType.AntDesignFormList:
      return FormList
    case AtomType.AntDesignCheckbox:
      return Checkbox
    case AtomType.AntDesignInput:
      return Input
    case AtomType.AntDesignInputNumber:
      return InputNumber
    case AtomType.AntDesignSelect:
      return Select
    case AtomType.AntDesignSelectOption:
      return SelectOption
    case AtomType.AntDesignRglContainer:
      return ReactGridLayout
    case AtomType.AntDesignRglItem:
      return 'div'
    case AtomType.AntDesignRglResponsiveContainer:
      return ReactGridLayoutResponsive
    case AtomType.AntDesignModal:
      return Modal
    case AtomType.AntDesignRadioGroup:
      return RadioGroup
    case AtomType.AntDesignRadio:
      return Radio
    case AtomType.AntDesignRate:
      return Rate
    case AtomType.AntDesignSlider:
      return Slider
    case AtomType.AntDesignSwitch:
      return Switch
    case AtomType.AntDesignSpace:
      return Space
    case AtomType.AntDesignDatePicker:
      return DatePicker
    case AtomType.AntDesignDivider:
      return Divider
    case AtomType.AntDesignPagination:
      return Pagination
    case AtomType.AntDesignPageHeader:
      return PageHeader
    case AtomType.AntDesignBadge:
      return Badge
    case AtomType.AntDesignAvatar:
      return Avatar
    case AtomType.AntDesignComment:
      return Comment
    case AtomType.AntDesignCalendar:
      return Calendar
    case AtomType.AntDesignDescriptions:
      return Descriptions
    case AtomType.AntDesignDescriptionsItem:
      return DescriptionsItem
    case AtomType.AntDesignEmpty:
      return Empty
    case AtomType.AntDesignTimeline:
      return Timeline
    case AtomType.AntDesignTimelineItem:
      return TimelineItem
    case AtomType.AntDesignTabs:
      return Tabs
    case AtomType.AntDesignTabsTabPane:
      return TabPane
    case AtomType.AntDesignStatistic:
      return Statistic
    case AtomType.AntDesignTooltip:
      return Tooltip
    case AtomType.AntDesignTag:
      return Tag
    case AtomType.AntDesignTree:
      return Tree
    case AtomType.AntDesignDrawer:
      return Drawer
    case AtomType.AntDesignProgress:
      return Progress
    case AtomType.AntDesignResult:
      return Result
    case AtomType.AntDesignSpin:
      return Spin
    case AtomType.AntDesignSkeleton:
      return Skeleton
    case AtomType.AntDesignAnchor:
      return Anchor
    case AtomType.AntDesignAnchorLink:
      return AnchorLink
    case AtomType.AntDesignBackTop:
      return BackTop
    case AtomType.AntDesignConfigProvider:
      return ConfigProvider
    case AtomType.AntDesignPopconfirm:
      return PopConfirm
    case AtomType.AntDesignTransfer:
      return 'null'
    case AtomType.AntDesignTreeSelect:
      return TreeSelect
    case AtomType.AntDesignTreeNode:
      return TreeNode
    case AtomType.AntDesignTimePicker:
      return TimePicker
    case AtomType.AntDesignUpload:
      return Upload
    case AtomType.AntDesignSteps:
      return Steps
    case AtomType.AntDesignStepsStep:
      return Step
    case AtomType.AntDesignCollapse:
      return Collapse
    case AtomType.AntDesignCollapsePanel:
      return CollapsePanel
    case AtomType.AntDesignCarousel:
      return Carousel
    case AtomType.AntDesignList:
      return List
    case AtomType.AntDesignListItem:
      return ListItem
    case AtomType.AntDesignListItemMeta:
      return ListItemMeta
    case AtomType.AntDesignMentions:
      return Mentions
    case AtomType.AntDesignMentionsOption:
      return MentionsOption
    case AtomType.AntDesignLayout:
      return Layout
    case AtomType.AntDesignLayoutHeader:
      return LayoutHeader
    case AtomType.AntDesignLayoutSider:
      return LayoutSider
    case AtomType.AntDesignLayoutContent:
      return LayoutContent
    case AtomType.AntDesignLayoutFooter:
      return LayoutFooter
    case AtomType.AntDesignCascader:
      return ''
    case AtomType.AntDesignPopover:
      return Popover
    case AtomType.AntDesignTable:
      return Table
    case AtomType.AntDesignImage:
      return Image
    case AtomType.AntDesignRenderComponent:
      return ''
    case AtomType.AntDesignRenderContainer:
      return ''
    case AtomType.AntDesignMapper:
      return ''
    case AtomType.AntDesignFormItemHook:
      return ''
    case AtomType.AntDesignPageContainer:
      return ''
    //
    // Custom
    //
    case AtomType.Query:
      return CodelabQuery
    case AtomType.TextList:
      return CodelabTextList
    case AtomType.Text:
      return CodelabText
    case AtomType.State:
      return CodelabState
    default:
      return null
  }
}
