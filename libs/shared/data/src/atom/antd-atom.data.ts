import { IAtomType } from '@codelab/shared/abstract/core'
import { AntdTag } from '../tag/antd-tags.data'

interface AtomData {
  /**
   * File name of the CSV file containing the scraped API data for the Ant Design component
   */
  file: string
  /**
   * Name of the tag to assign
   */
  tag: string | null

  /**
   * Name of the icon file
   */
  icon?: string | null
}

const antDesignIconPrefix = 'assets/atoms/antd'

/**
 * Assign all data that is related to the atom here
 */
// TODO: remove the partial in key
// https://www.learn-codes.net/javascript/typescript-typescript-types-key-value-enum/
export const antdAtomData: Partial<Record<IAtomType, AtomData>> = {
  //
  // Antd:
  //
  [IAtomType.AntDesignAffix]: {
    file: 'Affix',
    tag: AntdTag.Affix,
    icon: AntdTag.Affix,
  },
  [IAtomType.AntDesignAlert]: {
    file: 'Alert--Alert.ErrorBoundary',
    tag: AntdTag.Alert,
    icon: AntdTag.Alert,
  },
  [IAtomType.AntDesignAnchor]: {
    file: 'Anchor--Anchor Props',
    tag: AntdTag.Anchor,
    icon: AntdTag.Anchor,
  },
  [IAtomType.AntDesignAnchorLink]: {
    file: 'Anchor--Link Props',
    tag: AntdTag.AnchorLink,
    icon: AntdTag.AnchorLink,
  },
  [IAtomType.AntDesignAvatar]: {
    file: 'Avatar',
    tag: AntdTag.Avatar,
    icon: AntdTag.Avatar,
  },
  // 'Avatar--Avatar.Group (4.5.0+)': IAtomType.AntDesignAvatar,
  [IAtomType.AntDesignBackTop]: {
    file: 'BackTop',
    tag: AntdTag.BackTop,
    icon: AntdTag.BackTop,
  },
  [IAtomType.AntDesignBadge]: {
    file: 'Badge',
    tag: AntdTag.Badge,
    icon: AntdTag.Badge,
  },
  // 'Badge--Badge.Ribbon (4.5.0+)': IAtomType.AntDesignBadge,
  [IAtomType.AntDesignBreadcrumb]: {
    file: 'Breadcrumb',
    tag: AntdTag.Breadcrumb,
    icon: AntdTag.Breadcrumb,
  },
  [IAtomType.AntDesignBreadcrumbItem]: {
    file: 'Breadcrumb--Breadcrumb.Item',
    tag: AntdTag.BreadcrumbItem,
    icon: AntdTag.Breadcrumb,
  },
  // 'Breadcrumb--Breadcrumb.Separator': IAtomType.AntDesignBreadcrumb,
  [IAtomType.AntDesignButton]: {
    file: 'Button',
    tag: AntdTag.Button,
    icon: AntdTag.Button,
  },
  [IAtomType.AntDesignCalendar]: {
    file: 'Calendar',
    tag: AntdTag.Calendar,
    icon: AntdTag.Calendar,
  },
  [IAtomType.AntDesignCard]: {
    file: 'Card',
    tag: AntdTag.Card,
    icon: AntdTag.Card,
  },
  [IAtomType.AntDesignCardGrid]: {
    file: 'Card--Card.Grid',
    tag: AntdTag.CardGrid,
    icon: AntdTag.Card,
  },
  [IAtomType.AntDesignCardMeta]: {
    file: 'Card--Card.Meta',
    tag: AntdTag.CardMeta,
    icon: AntdTag.Card,
  },
  // 'Cascader--showSearch': IAtomType.AntDesignCascader,
  [IAtomType.AntDesignCheckbox]: {
    file: 'Checkbox--Props',
    tag: AntdTag.Checkbox,
    icon: AntdTag.Checkbox,
  },
  [IAtomType.AntDesignCollapse]: {
    file: 'Collapse',
    tag: AntdTag.Collapse,
    icon: AntdTag.Collapse,
  },
  [IAtomType.AntDesignCollapsePanel]: {
    file: 'Collapse--Collapse.Panel',
    tag: AntdTag.CollapsePanel,
    icon: AntdTag.Collapse,
  },
  [IAtomType.AntDesignComment]: {
    file: 'Comment',
    tag: AntdTag.Comment,
    icon: AntdTag.Comment,
  },
  [IAtomType.AntDesignConfigProvider]: {
    file: 'ConfigProvider',
    tag: AntdTag.ConfigProvider,
    icon: AntdTag.ConfigProvider,
  },
  [IAtomType.AntDesignDatePicker]: {
    file: 'DatePicker',
    tag: AntdTag.DatePicker,
    icon: AntdTag.DatePicker,
  },
  // 'DatePicker--Common API': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=month]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=quarter]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=week]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=year]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--RangePicker': IAtomType.AntDesignDatePicker,
  [IAtomType.AntDesignDescriptions]: {
    file: 'Descriptions',
    tag: AntdTag.Descriptions,
    icon: AntdTag.Descriptions,
  },
  [IAtomType.AntDesignDescriptionsItem]: {
    file: 'Descriptions--DescriptionItem',
    tag: AntdTag.DescriptionsItem,
    icon: AntdTag.DescriptionsItem,
  },
  [IAtomType.AntDesignDivider]: {
    file: 'Divider',
    tag: AntdTag.Divider,
    icon: AntdTag.Divider,
  },
  [IAtomType.AntDesignDrawer]: {
    file: 'Drawer',
    tag: AntdTag.Drawer,
    icon: AntdTag.Drawer,
  },
  [IAtomType.AntDesignDropdown]: {
    file: 'Dropdown',
    tag: AntdTag.Dropdown,
    icon: AntdTag.Dropdown,
  },
  // 'Dropdown--Dropdown.Button': IAtomType.AntDesignDropdown,
  [IAtomType.AntDesignEmpty]: {
    file: 'Empty',
    tag: AntdTag.Empty,
    icon: AntdTag.Empty,
  },
  [IAtomType.AntDesignForm]: {
    file: 'Form',
    tag: AntdTag.Form,
    icon: AntdTag.Form,
  },
  // 'Form--FormInstance': IAtomType.AntDesignForm,
  [IAtomType.AntDesignGridCol]: {
    file: 'Grid--Col',
    tag: AntdTag.Col,
    icon: AntdTag.Col,
  },
  [IAtomType.AntDesignGridRow]: {
    file: 'Grid--Row',
    tag: AntdTag.Row,
    icon: AntdTag.Row,
  },
  [IAtomType.AntDesignIcon]: {
    file: 'Icon--Common Icon',
    tag: AntdTag.Icon,
    icon: AntdTag.Icon,
  },
  // 'Icon--Custom Icon': IAtomType.AntDesignIcon,
  // Image: IAtomType.AntDesignImage,
  [IAtomType.AntDesignInput]: {
    file: 'Input',
    tag: AntdTag.Input,
    icon: AntdTag.Input,
  },
  // 'Input--Input.TextArea': IAtomType.AntDesignInput,
  [IAtomType.AntDesignLayout]: {
    file: 'Layout',
    tag: AntdTag.Layout,
    icon: AntdTag.Layout,
  },
  [IAtomType.AntDesignLayoutSider]: {
    file: 'Layout--Layout.Sider',
    tag: AntdTag.LayoutSider,
    icon: AntdTag.LayoutSider,
  },
  [IAtomType.AntDesignList]: {
    file: 'List',
    tag: AntdTag.List,
    icon: AntdTag.List,
  },
  [IAtomType.AntDesignListItem]: {
    file: 'List--List.Item',
    tag: AntdTag.ListItem,
    icon: AntdTag.ListItem,
  },
  [IAtomType.AntDesignListItemMeta]: {
    file: 'List--List.Item.Meta',
    tag: AntdTag.ListItem,
    icon: AntdTag.ListItem,
  },
  // 'List--List grid props': IAtomType.AntDesignList,
  // 'List--pagination': IAtomType.AntDesignList,
  [IAtomType.AntDesignMentions]: {
    file: 'Mentions--Mention',
    tag: AntdTag.Mentions,
    icon: AntdTag.Mentions,
  },
  [IAtomType.AntDesignMentionsOption]: {
    file: 'Mentions--Option',
    tag: AntdTag.MentionsOption,
    icon: AntdTag.MentionsOption,
  },
  [IAtomType.AntDesignMenu]: {
    file: 'Menu',
    tag: AntdTag.Menu,
    icon: AntdTag.Menu,
  },
  [IAtomType.AntDesignPageHeader]: {
    file: 'PageHeader',
    tag: AntdTag.PageHeader,
    icon: AntdTag.PageHeader,
  },
  [IAtomType.AntDesignPagination]: {
    file: 'Pagination',
    tag: AntdTag.Pagination,
    icon: AntdTag.Pagination,
  },
  [IAtomType.AntDesignPopconfirm]: {
    file: 'Popconfirm',
    tag: AntdTag.Popconfirm,
    icon: AntdTag.Popconfirm,
  },
  [IAtomType.AntDesignPopover]: {
    file: 'Popover',
    tag: AntdTag.Popover,
    icon: AntdTag.Popover,
  },
  [IAtomType.AntDesignProgress]: {
    file: 'Progress--type=circle',
    tag: AntdTag.Progress,
    icon: AntdTag.Progress,
  },
  [IAtomType.AntDesignRadio]: {
    file: 'Radio--Radio_Radio.Button',
    tag: AntdTag.Radio,
    icon: AntdTag.Radio,
  },
  [IAtomType.AntDesignRadioGroup]: {
    file: 'Radio--RadioGroup',
    tag: AntdTag.RadioGroup,
    icon: AntdTag.RadioGroup,
  },
  [IAtomType.AntDesignResult]: {
    file: 'Result',
    tag: AntdTag.Result,
    icon: AntdTag.Result,
  },
  // 'Select--OptGroup props': IAtomType.AntDesignSelect,
  [IAtomType.AntDesignSelect]: {
    file: 'Select--Select props',
    tag: AntdTag.Select,
    icon: AntdTag.Select,
  },
  [IAtomType.AntDesignSelectOption]: {
    file: 'Select--Option props',
    tag: AntdTag.SelectOption,
    icon: AntdTag.SelectOption,
  },
  [IAtomType.AntDesignSkeleton]: {
    file: 'Skeleton',
    tag: AntdTag.Skeleton,
    icon: AntdTag.Skeleton,
  },
  [IAtomType.AntDesignSlider]: {
    file: 'Slider--range',
    tag: AntdTag.Slider,
    icon: AntdTag.Slider,
  },
  [IAtomType.AntDesignSpace]: {
    file: 'Space',
    tag: AntdTag.Space,
    icon: AntdTag.Space,
  },
  [IAtomType.AntDesignSpin]: {
    file: 'Spin',
    tag: AntdTag.Spin,
    icon: AntdTag.Spin,
  },
  [IAtomType.AntDesignSteps]: {
    file: 'Steps',
    tag: AntdTag.Steps,
    icon: AntdTag.Steps,
  },
  [IAtomType.AntDesignStepsStep]: {
    file: 'Steps--Steps.Step',
    tag: AntdTag.StepsStep,
    icon: AntdTag.StepsStep,
  },
  [IAtomType.AntDesignTable]: {
    file: 'Table',
    tag: AntdTag.Table,
    icon: AntdTag.Table,
  },
  // 'Table--Column': IAtomType.AntDesignTable,
  // 'Table--ColumnGroup': IAtomType.AntDesignTable,
  // 'Table--expandable': IAtomType.AntDesignTable,
  // 'Table--pagination': IAtomType.AntDesignTable,
  // 'Table--rowSelection': IAtomType.AntDesignTable,
  // 'Table--scroll': IAtomType.AntDesignTable,
  // 'Table--selection': IAtomType.AntDesignTable,
  [IAtomType.AntDesignTabs]: {
    file: 'Tabs',
    tag: AntdTag.Tabs,
    icon: AntdTag.Tabs,
  },
  [IAtomType.AntDesignTabsTabPane]: {
    file: 'Tabs--Tabs.TabPane',
    tag: AntdTag.TabsTabPane,
    icon: AntdTag.TabsTabPane,
  },
  [IAtomType.AntDesignTag]: {
    file: 'Tag',
    tag: AntdTag.Tag,
    icon: AntdTag.Tag,
  },
  // 'Tag--Tag.CheckableTag': IAtomType.AntDesignTag,
  [IAtomType.AntDesignTimeline]: {
    file: 'Timeline',
    tag: AntdTag.Timeline,
    icon: AntdTag.Timeline,
  },
  [IAtomType.AntDesignTimelineItem]: {
    file: 'Timeline--Timeline.Item',
    tag: AntdTag.TimelineItem,
    icon: AntdTag.TimelineItem,
  },
  // 'TimePicker--RangePicker': IAtomType.AntDesignTimePicker,
  [IAtomType.AntDesignTooltip]: {
    file: 'Tooltip--Common API',
    tag: AntdTag.Tooltip,
    icon: AntdTag.Tooltip,
  },
  // 'Transfer--Render Props': IAtomType.AntDesignTransfer,
  // 'Tree--DirectoryTree props': IAtomType.AntDesignTree,
  [IAtomType.AntDesignTree]: {
    file: 'Tree--Tree props',
    tag: AntdTag.Tree,
    icon: AntdTag.Tree,
  },
  [IAtomType.AntDesignTreeSelect]: {
    file: 'TreeSelect--Tree props',
    tag: AntdTag.TreeSelect,
    icon: AntdTag.TreeSelect,
  },
  // 'Typography--copyable': IAtomType.AntDesignTypography,
  // 'Typography--editable': IAtomType.AntDesignTypography,
  // 'Typography--ellipsis': IAtomType.AntDesignTypography,
  [IAtomType.AntDesignTypographyParagraph]: {
    file: 'Typography--Typography.Paragraph',
    tag: AntdTag.TypographyParagraph,
    icon: AntdTag.TypographyParagraph,
  },
  [IAtomType.AntDesignTypographyText]: {
    file: 'Typography--Typography.Text',
    tag: AntdTag.TypographyText,
    icon: AntdTag.TypographyText,
  },
  [IAtomType.AntDesignTypographyTitle]: {
    file: 'Typography--Typography.Title',
    tag: AntdTag.TypographyTitle,
    icon: AntdTag.TypographyTitle,
  },
  [IAtomType.AntDesignUpload]: {
    file: 'Upload--UploadFile',
    tag: AntdTag.Upload,
    icon: AntdTag.Upload,
  },
  [IAtomType.AntDesignImage]: {
    file: 'Image',
    tag: AntdTag.Image,
    icon: AntdTag.Image,
  },
  [IAtomType.AntDesignModal]: {
    file: 'Modal',
    tag: AntdTag.Modal,
    icon: AntdTag.Modal,
  },
  [IAtomType.AntDesignFormItem]: {
    file: 'Form--Item',
    tag: AntdTag.FormItem,
    icon: AntdTag.FormItem,
  },

  //
  // Custom components:
  //
  // [IAtomType.Query]: {
  //   file: 'Query',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.TextList]: {
  //   file: 'TextList',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.Text]: {
  //   file: 'Text',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.State]: {
  //   file: 'State',
  //   tag: null,
  //   icon: null,
  // },
}
