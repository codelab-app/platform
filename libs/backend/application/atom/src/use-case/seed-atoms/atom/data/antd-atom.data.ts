import { IAtomType } from '@codelab/shared/abstract/core'
import { AntdTag } from '@codelab/shared/data/seed'
import type { AtomSeedData } from '../atom-seed-data.interface'

/**
 * Assign all data that is related to the atom here
 */
// TODO: remove the partial in key
// https://www.learn-codes.net/javascript/typescript-typescript-types-key-value-enum/
export const antdAtomData: Partial<Record<IAtomType, AtomSeedData>> = {
  //
  // Antd:
  //
  [IAtomType.AntDesignAffix]: {
    file: 'Affix',
    icon: AntdTag.Affix,
    tag: AntdTag.Affix,
  },
  [IAtomType.AntDesignAlert]: {
    file: 'Alert--Alert.ErrorBoundary',
    icon: AntdTag.Alert,
    tag: AntdTag.Alert,
  },
  [IAtomType.AntDesignAnchor]: {
    file: 'Anchor--Anchor Props',
    icon: AntdTag.Anchor,
    tag: AntdTag.Anchor,
  },
  [IAtomType.AntDesignAnchorLink]: {
    file: 'Anchor--Link Props',
    icon: AntdTag.Anchor,
    tag: AntdTag.AnchorLink,
  },
  [IAtomType.AntDesignAvatar]: {
    file: 'Avatar',
    icon: AntdTag.Avatar,
    tag: AntdTag.Avatar,
  },
  // 'Avatar--Avatar.Group (4.5.0+)': IAtomType.AntDesignAvatar,
  [IAtomType.AntDesignBackTop]: {
    file: 'BackTop',
    icon: AntdTag.BackTop,
    tag: AntdTag.BackTop,
  },
  [IAtomType.AntDesignBadge]: {
    file: 'Badge',
    icon: AntdTag.Badge,
    tag: AntdTag.Badge,
  },
  // 'Badge--Badge.Ribbon (4.5.0+)': IAtomType.AntDesignBadge,
  [IAtomType.AntDesignBreadcrumb]: {
    file: 'Breadcrumb',
    icon: AntdTag.Breadcrumb,
    tag: AntdTag.Breadcrumb,
  },
  [IAtomType.AntDesignBreadcrumbItem]: {
    file: 'Breadcrumb--Breadcrumb.Item',
    icon: AntdTag.Breadcrumb,
    tag: AntdTag.BreadcrumbItem,
  },
  [IAtomType.AntDesignBreadcrumbSeparator]: {
    // file: 'Breadcrumb--Breadcrumb.Separator',
    file: null,
    icon: AntdTag.Breadcrumb,
    tag: AntdTag.BreadcrumbSeparator,
  },
  [IAtomType.AntDesignButton]: {
    file: 'Button',
    icon: AntdTag.Button,
    tag: AntdTag.Button,
  },
  [IAtomType.AntDesignCalendar]: {
    file: 'Calendar',
    icon: AntdTag.Calendar,
    tag: AntdTag.Calendar,
  },
  [IAtomType.AntDesignCard]: {
    file: 'Card',
    icon: AntdTag.Card,
    tag: AntdTag.Card,
  },
  [IAtomType.AntDesignCardGrid]: {
    file: 'Card--Card.Grid',
    icon: AntdTag.Card,
    tag: AntdTag.CardGrid,
  },
  [IAtomType.AntDesignCardMeta]: {
    file: 'Card--Card.Meta',
    icon: AntdTag.Card,
    tag: AntdTag.CardMeta,
  },
  [IAtomType.AntDesignAutoComplete]: {
    file: null,
    icon: AntdTag.AutoComplete,
    tag: AntdTag.AutoComplete,
  },
  [IAtomType.AntDesignCascader]: {
    // file: Cascader--showSearch',
    file: null,
    icon: AntdTag.Cascader,
    tag: AntdTag.Cascader,
  },
  [IAtomType.AntDesignCheckbox]: {
    file: 'Checkbox--Props',
    icon: AntdTag.Checkbox,
    tag: AntdTag.Checkbox,
  },
  [IAtomType.AntDesignCheckboxGroup]: {
    file: 'Checkbox--Props',
    icon: AntdTag.Checkbox,
    tag: AntdTag.CheckboxGroup,
  },
  [IAtomType.AntDesignCarousel]: {
    file: null,
    icon: AntdTag.Carousel,
    tag: AntdTag.Carousel,
  },
  [IAtomType.AntDesignCollapse]: {
    file: 'Collapse',
    icon: AntdTag.Collapse,
    tag: AntdTag.Collapse,
  },
  [IAtomType.AntDesignCollapsePanel]: {
    file: 'Collapse--Collapse.Panel',
    icon: AntdTag.Collapse,
    tag: AntdTag.CollapsePanel,
  },
  [IAtomType.AntDesignComment]: {
    file: 'Comment',
    icon: AntdTag.Comment,
    tag: AntdTag.Comment,
  },
  [IAtomType.AntDesignConfigProvider]: {
    file: 'ConfigProvider',
    icon: AntdTag.ConfigProvider,
    tag: AntdTag.ConfigProvider,
  },
  [IAtomType.AntDesignDatePicker]: {
    file: 'DatePicker',
    icon: AntdTag.DatePicker,
    tag: AntdTag.DatePicker,
  },
  // 'DatePicker--Common API': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=month]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=quarter]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=week]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=year]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--RangePicker': IAtomType.AntDesignDatePicker,
  [IAtomType.AntDesignDescriptions]: {
    file: 'Descriptions',
    icon: AntdTag.Descriptions,
    tag: AntdTag.Descriptions,
  },
  [IAtomType.AntDesignDescriptionsItem]: {
    file: 'Descriptions--DescriptionItem',
    icon: AntdTag.Descriptions,
    tag: AntdTag.DescriptionsItem,
  },
  [IAtomType.AntDesignDivider]: {
    file: 'Divider',
    icon: AntdTag.Divider,
    tag: AntdTag.Divider,
  },
  [IAtomType.AntDesignDrawer]: {
    file: 'Drawer',
    icon: AntdTag.Drawer,
    tag: AntdTag.Drawer,
  },
  [IAtomType.AntDesignMessage]: {
    file: null,
    icon: AntdTag.Message,
    tag: AntdTag.Message,
  },
  [IAtomType.AntDesignDropdown]: {
    file: 'Dropdown',
    icon: AntdTag.Dropdown,
    tag: AntdTag.Dropdown,
  },
  [IAtomType.AntDesignDropdownButton]: {
    // file: 'Dropdown--Dropdown.Button',
    file: null,
    icon: AntdTag.Dropdown,
    tag: AntdTag.DropdownButton,
  },
  [IAtomType.AntDesignEmpty]: {
    file: 'Empty',
    icon: AntdTag.Empty,
    tag: AntdTag.Empty,
  },
  [IAtomType.AntDesignForm]: {
    allowedChildren: [IAtomType.AntDesignFormItem],
    file: 'Form',
    icon: AntdTag.Form,
    tag: AntdTag.Form,
  },
  [IAtomType.AntDesignFormItem]: {
    allowedChildren: [
      IAtomType.AntDesignInput,
      IAtomType.AntDesignButton,
      IAtomType.AntDesignCheckbox,
      IAtomType.AntDesignRadioGroup,
    ],
    file: 'Form--Item',
    icon: AntdTag.Form,
    tag: AntdTag.FormItem,
  },
  [IAtomType.AntDesignFormList]: {
    file: null,
    icon: AntdTag.Form,
    tag: AntdTag.FormList,
  },
  [IAtomType.AntDesignFormErrorList]: {
    file: null,
    icon: AntdTag.Form,
    tag: AntdTag.FormErrorList,
  },
  [IAtomType.AntDesignFormProvider]: {
    file: null,
    icon: AntdTag.Form,
    tag: AntdTag.FormProvider,
  },
  // 'Form--FormInstance': IAtomType.AntDesignForm,
  [IAtomType.AntDesignGridCol]: {
    file: 'Grid--Col',
    icon: AntdTag.Grid,
    tag: AntdTag.Col,
  },
  [IAtomType.AntDesignGridRow]: {
    file: 'Grid--Row',
    icon: AntdTag.Grid,
    tag: AntdTag.Row,
  },
  [IAtomType.AntDesignIcon]: {
    file: 'Icon--Common Icon',
    icon: AntdTag.Icon,
    tag: AntdTag.Icon,
  },
  // 'Icon--Custom Icon': IAtomType.AntDesignIcon,
  // Image: IAtomType.AntDesignImage,
  [IAtomType.AntDesignInput]: {
    file: 'Input',
    icon: AntdTag.Input,
    tag: AntdTag.Input,
  },
  [IAtomType.AntDesignInputNumber]: {
    file: null,
    icon: AntdTag.InputNumber,
    tag: AntdTag.InputNumber,
  },
  // 'Input--Input.TextArea': IAtomType.AntDesignInput,
  [IAtomType.AntDesignLayout]: {
    file: 'Layout',
    icon: AntdTag.Layout,
    tag: AntdTag.Layout,
  },
  [IAtomType.AntDesignLayoutSider]: {
    file: 'Layout--Layout.Sider',
    icon: AntdTag.Layout,
    tag: AntdTag.LayoutSider,
  },
  [IAtomType.AntDesignList]: {
    file: 'List',
    icon: AntdTag.List,
    tag: AntdTag.List,
  },
  [IAtomType.AntDesignListItem]: {
    file: 'List--List.Item',
    icon: AntdTag.List,
    tag: AntdTag.ListItem,
  },
  [IAtomType.AntDesignListItemMeta]: {
    file: 'List--List.Item.Meta',
    icon: AntdTag.List,
    tag: AntdTag.ListItemMeta,
  },
  // 'List--List grid props': IAtomType.AntDesignList,
  // 'List--pagination': IAtomType.AntDesignList,
  [IAtomType.AntDesignMentions]: {
    file: 'Mentions--Mention',
    icon: AntdTag.Mentions,
    tag: AntdTag.Mentions,
  },
  [IAtomType.AntDesignMentionsOption]: {
    file: 'Mentions--Option',
    icon: AntdTag.Mentions,
    tag: AntdTag.MentionsOption,
  },
  [IAtomType.AntDesignMenu]: {
    file: 'Menu',
    icon: AntdTag.Menu,
    tag: AntdTag.Menu,
  },
  [IAtomType.AntDesignPageHeader]: {
    file: 'PageHeader',
    icon: AntdTag.PageHeader,
    tag: AntdTag.PageHeader,
  },
  [IAtomType.AntDesignPagination]: {
    file: 'Pagination',
    icon: AntdTag.Pagination,
    tag: AntdTag.Pagination,
  },
  [IAtomType.AntDesignPopconfirm]: {
    file: 'Popconfirm',
    icon: AntdTag.Popconfirm,
    tag: AntdTag.Popconfirm,
  },
  [IAtomType.AntDesignPopover]: {
    file: 'Popover',
    icon: AntdTag.Popover,
    tag: AntdTag.Popover,
  },
  [IAtomType.AntDesignSegmented]: {
    file: 'Popover',
    icon: AntdTag.Segmented,
    tag: AntdTag.Segmented,
  },
  [IAtomType.AntDesignStatistic]: {
    file: null,
    icon: AntdTag.Statistic,
    tag: AntdTag.Statistic,
  },
  [IAtomType.AntDesignProgress]: {
    file: 'Progress--type=circle',
    icon: AntdTag.Progress,
    tag: AntdTag.Progress,
  },
  [IAtomType.AntDesignRadio]: {
    file: 'Radio--Radio_Radio.Button',
    icon: AntdTag.Radio,
    tag: AntdTag.Radio,
  },
  [IAtomType.AntDesignRadioGroup]: {
    file: 'Radio--RadioGroup',
    icon: AntdTag.Radio,
    tag: AntdTag.RadioGroup,
  },
  [IAtomType.AntDesignRate]: {
    file: null,
    icon: AntdTag.Rate,
    tag: AntdTag.Rate,
  },
  [IAtomType.AntDesignResult]: {
    file: 'Result',
    icon: AntdTag.Result,
    tag: AntdTag.Result,
  },
  // 'Select--OptGroup props': IAtomType.AntDesignSelect,
  [IAtomType.AntDesignSelect]: {
    file: 'Select--Select props',
    icon: AntdTag.Select,
    tag: AntdTag.Select,
  },
  [IAtomType.AntDesignSelectOption]: {
    file: 'Select--Option props',
    icon: AntdTag.Select,
    tag: AntdTag.SelectOption,
  },
  [IAtomType.AntDesignSkeleton]: {
    file: 'Skeleton',
    icon: AntdTag.Skeleton,
    tag: AntdTag.Skeleton,
  },
  [IAtomType.AntDesignSlider]: {
    file: 'Slider--range',
    icon: AntdTag.Slider,
    tag: AntdTag.Slider,
  },
  [IAtomType.AntDesignSwitch]: {
    file: null,
    icon: AntdTag.Switch,
    tag: AntdTag.Switch,
  },
  [IAtomType.AntDesignTimePicker]: {
    file: null,
    icon: AntdTag.TimePicker,
    tag: AntdTag.TimePicker,
  },
  [IAtomType.AntDesignTransfer]: {
    file: null,
    icon: AntdTag.Transfer,
    tag: AntdTag.Transfer,
  },
  [IAtomType.AntDesignSpace]: {
    file: 'Space',
    icon: AntdTag.Space,
    tag: AntdTag.Space,
  },
  [IAtomType.AntDesignSpin]: {
    file: 'Spin',
    icon: AntdTag.Spin,
    tag: AntdTag.Spin,
  },
  [IAtomType.AntDesignSteps]: {
    file: 'Steps',
    icon: AntdTag.Steps,
    tag: AntdTag.Steps,
  },
  [IAtomType.AntDesignStepsStep]: {
    file: 'Steps--Steps.Step',
    icon: AntdTag.Steps,
    tag: AntdTag.StepsStep,
  },
  [IAtomType.AntDesignTable]: {
    file: 'Table',
    icon: AntdTag.Table,
    tag: AntdTag.Table,
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
    icon: AntdTag.Tabs,
    tag: AntdTag.Tabs,
  },
  [IAtomType.AntDesignTabsTabPane]: {
    file: 'Tabs--Tabs.TabPane',
    icon: AntdTag.Tabs,
    tag: AntdTag.TabsTabPane,
  },
  [IAtomType.AntDesignTag]: {
    file: 'Tag',
    icon: AntdTag.Tag,
    tag: AntdTag.Tag,
  },
  // 'Tag--Tag.CheckableTag': IAtomType.AntDesignTag,
  [IAtomType.AntDesignTimeline]: {
    file: 'Timeline',
    icon: AntdTag.Timeline,
    tag: AntdTag.Timeline,
  },
  [IAtomType.AntDesignTimelineItem]: {
    file: 'Timeline--Timeline.Item',
    icon: AntdTag.Timeline,
    tag: AntdTag.TimelineItem,
  },
  // 'TimePicker--RangePicker': IAtomType.AntDesignTimePicker,
  [IAtomType.AntDesignTooltip]: {
    file: 'Tooltip--Common API',
    icon: AntdTag.Tooltip,
    tag: AntdTag.Tooltip,
  },
  // 'Transfer--Render Props': IAtomType.AntDesignTransfer,
  // 'Tree--DirectoryTree props': IAtomType.AntDesignTree,
  [IAtomType.AntDesignTree]: {
    file: 'Tree--Tree props',
    icon: AntdTag.Tree,
    tag: AntdTag.Tree,
  },
  [IAtomType.AntDesignTreeSelect]: {
    file: 'TreeSelect--Tree props',
    icon: AntdTag.TreeSelect,
    tag: AntdTag.TreeSelect,
  },
  // 'Typography--copyable': IAtomType.AntDesignTypography,
  // 'Typography--editable': IAtomType.AntDesignTypography,
  // 'Typography--ellipsis': IAtomType.AntDesignTypography,
  [IAtomType.AntDesignTypographyParagraph]: {
    file: 'Typography--Typography.Paragraph',
    icon: AntdTag.Typography,
    tag: AntdTag.TypographyParagraph,
  },
  [IAtomType.AntDesignTypographyText]: {
    file: 'Typography--Typography.Text',
    icon: AntdTag.Typography,
    tag: AntdTag.TypographyText,
  },
  [IAtomType.AntDesignTypographyTitle]: {
    file: 'Typography--Typography.Title',
    icon: AntdTag.Typography,
    tag: AntdTag.TypographyTitle,
  },
  [IAtomType.AntDesignUpload]: {
    file: 'Upload--UploadFile',
    icon: AntdTag.Upload,
    tag: AntdTag.Upload,
  },
  [IAtomType.AntDesignImage]: {
    file: 'Image',
    icon: AntdTag.Image,
    tag: AntdTag.Image,
  },
  [IAtomType.AntDesignModal]: {
    file: 'Modal',
    icon: AntdTag.Modal,
    tag: AntdTag.Modal,
  },
  [IAtomType.AntDesignNotification]: {
    file: null,
    icon: AntdTag.Notification,
    tag: AntdTag.Notification,
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
