import { AtomType } from '@codelab/frontend/abstract/codegen'

/**
 * Maps the name of the csv files to their atom type
 */
export const csvNameToAtomTypeMap: Record<string, AtomType> = {
  //
  // Antd:
  //
  Affix: AtomType.AntDesignAffix,
  // 'Alert--Alert.ErrorBoundary': AtomType.AntDesignAlert,
  'Anchor--Anchor Props': AtomType.AntDesignAnchor,
  'Anchor--Link Props': AtomType.AntDesignAnchorLink,
  Avatar: AtomType.AntDesignAvatar,
  // 'Avatar--Avatar.Group (4.5.0+)': AtomType.AntDesignAvatar,
  BackTop: AtomType.AntDesignBackTop,
  Badge: AtomType.AntDesignBadge,
  // 'Badge--Badge.Ribbon (4.5.0+)': AtomType.AntDesignBadge,
  Breadcrumb: AtomType.AntDesignBreadcrumb,
  'Breadcrumb--Breadcrumb.Item': AtomType.AntDesignBreadcrumbItem,
  // 'Breadcrumb--Breadcrumb.Separator': AtomType.AntDesignBreadcrumb,
  Button: AtomType.AntDesignButton,
  Calendar: AtomType.AntDesignCalendar,
  Card: AtomType.AntDesignCard,
  'Card--Card.Grid': AtomType.AntDesignCardGrid,
  'Card--Card.Meta': AtomType.AntDesignCardMeta,
  // 'Cascader--showSearch': AtomType.AntDesignCascader,
  'Checkbox--Props': AtomType.AntDesignCheckbox,
  Collapse: AtomType.AntDesignCollapse,
  'Collapse--Collapse.Panel': AtomType.AntDesignCollapsePanel,
  Comment: AtomType.AntDesignComment,
  ConfigProvider: AtomType.AntDesignConfigProvider,
  DatePicker: AtomType.AntDesignDatePicker,
  'DatePicker--Common API': AtomType.AntDesignDatePicker,
  'DatePicker--DatePicker[picker=month]': AtomType.AntDesignDatePicker,
  'DatePicker--DatePicker[picker=quarter]': AtomType.AntDesignDatePicker,
  'DatePicker--DatePicker[picker=week]': AtomType.AntDesignDatePicker,
  'DatePicker--DatePicker[picker=year]': AtomType.AntDesignDatePicker,
  // 'DatePicker--RangePicker': AtomType.AntDesignDatePicker,
  Descriptions: AtomType.AntDesignDescriptions,
  'Descriptions--DescriptionItem': AtomType.AntDesignDescriptionsItem,
  Divider: AtomType.AntDesignDivider,
  Drawer: AtomType.AntDesignDrawer,
  Dropdown: AtomType.AntDesignDropdown,
  // 'Dropdown--Dropdown.Button': AtomType.AntDesignDropdown,
  Empty: AtomType.AntDesignEmpty,
  Form: AtomType.AntDesignForm,
  // 'Form--FormInstance': AtomType.AntDesignForm,
  'Grid--Col': AtomType.AntDesignGridCol,
  'Grid--Row': AtomType.AntDesignGridRow,
  'Icon--Common Icon': AtomType.AntDesignIcon,
  // 'Icon--Custom Icon': AtomType.AntDesignIcon,
  // Image: AtomType.AntDesignImage,
  Input: AtomType.AntDesignInput,
  // 'Input--Input.TextArea': AtomType.AntDesignInput,
  Layout: AtomType.AntDesignLayout,
  'Layout--Layout.Sider': AtomType.AntDesignLayoutSider,
  List: AtomType.AntDesignList,
  'List--List.Item': AtomType.AntDesignListItem,
  'List--List.Item.Meta': AtomType.AntDesignListItemMeta,
  // 'List--List grid props': AtomType.AntDesignList,
  // 'List--pagination': AtomType.AntDesignList,
  'Mentions--Mention': AtomType.AntDesignMentions,
  'Mentions--Option': AtomType.AntDesignMentionsOption,
  Menu: AtomType.AntDesignMenu,
  'Menu--Menu.Item': AtomType.AntDesignMenuItem,
  'Menu--Menu.ItemGroup': AtomType.AntDesignMenuItemGroup,
  'Menu--Menu.SubMenu': AtomType.AntDesignMenuSubMenu,
  PageHeader: AtomType.AntDesignPageHeader,
  Pagination: AtomType.AntDesignPagination,
  Popconfirm: AtomType.AntDesignPopconfirm,
  Popover: AtomType.AntDesignPopover,
  'Progress--type=circle': AtomType.AntDesignProgress,
  'Progress--type=dashboard': AtomType.AntDesignProgress,
  'Progress--type=line': AtomType.AntDesignProgress,
  'Radio--Radio_Radio.Button': AtomType.AntDesignRadio,
  'Radio--RadioGroup': AtomType.AntDesignRadioGroup,
  Result: AtomType.AntDesignResult,
  // 'Select--OptGroup props': AtomType.AntDesignSelect,
  'Select--Option props': AtomType.AntDesignSelectOption,
  'Select--Select props': AtomType.AntDesignSelect,
  Skeleton: AtomType.AntDesignSkeleton,
  'Skeleton--SkeletonAvatarProps': AtomType.AntDesignSkeleton,
  'Skeleton--SkeletonButtonProps': AtomType.AntDesignSkeleton,
  'Skeleton--SkeletonInputProps': AtomType.AntDesignSkeleton,
  'Skeleton--SkeletonParagraphProps': AtomType.AntDesignSkeleton,
  'Skeleton--SkeletonTitleProps': AtomType.AntDesignSkeleton,
  'Slider--range': AtomType.AntDesignSlider,
  Space: AtomType.AntDesignSpace,
  Spin: AtomType.AntDesignSpin,
  Steps: AtomType.AntDesignSteps,
  'Steps--Steps.Step': AtomType.AntDesignStepsStep,
  Table: AtomType.AntDesignTable,
  // 'Table--Column': AtomType.AntDesignTable,
  // 'Table--ColumnGroup': AtomType.AntDesignTable,
  // 'Table--expandable': AtomType.AntDesignTable,
  // 'Table--pagination': AtomType.AntDesignTable,
  // 'Table--rowSelection': AtomType.AntDesignTable,
  // 'Table--scroll': AtomType.AntDesignTable,
  // 'Table--selection': AtomType.AntDesignTable,
  Tabs: AtomType.AntDesignTabs,
  'Tabs--Tabs.TabPane': AtomType.AntDesignTabsTabPane,
  Tag: AtomType.AntDesignTag,
  // 'Tag--Tag.CheckableTag': AtomType.AntDesignTag,
  Timeline: AtomType.AntDesignTimeline,
  'Timeline--Timeline.Item': AtomType.AntDesignTimelineItem,
  // 'TimePicker--RangePicker': AtomType.AntDesignTimePicker,
  'Tooltip--Common API': AtomType.AntDesignTooltip,
  // 'Transfer--Render Props': AtomType.AntDesignTransfer,
  // 'Tree--DirectoryTree props': AtomType.AntDesignTree,
  'Tree--Tree props': AtomType.AntDesignTree,
  'Tree--TreeNode props': AtomType.AntDesignTreeNode,
  'TreeSelect--Tree props': AtomType.AntDesignTreeSelect,
  'TreeSelect--TreeNode props': AtomType.AntDesignTreeSelect,
  // 'Typography--copyable': AtomType.AntDesignTypography,
  // 'Typography--editable': AtomType.AntDesignTypography,
  // 'Typography--ellipsis': AtomType.AntDesignTypography,
  'Typography--Typography.Paragraph': AtomType.AntDesignTypographyParagraph,
  'Typography--Typography.Text': AtomType.AntDesignTypographyText,
  'Typography--Typography.Title': AtomType.AntDesignTypographyTitle,
  'Upload--UploadFile': AtomType.AntDesignUpload,
  Image: AtomType.AntDesignImage,

  //
  // Custom components:
  //
  Query: AtomType.Query,
  TextList: AtomType.TextList,
  Text: AtomType.Text,
  State: AtomType.State,
}
