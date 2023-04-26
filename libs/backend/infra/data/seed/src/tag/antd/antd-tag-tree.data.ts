import type { TagNode } from '@codelab/backend/abstract/core'
import { AntdTag, ReactTag } from '@codelab/backend/abstract/core'

/**
 * This contains hierarchical tag data for Ant Design
 */
export const antdTagTree: TagNode<AntdTag> = {
  [AntdTag.General]: [
    AntdTag.Button,
    AntdTag.Icon,
    {
      [AntdTag.Typography]: [
        AntdTag.TypographyText,
        AntdTag.TypographyTitle,
        AntdTag.TypographyParagraph,
      ],
    },
  ],
  [AntdTag.Layout]: [
    AntdTag.Divider,
    AntdTag.Grid,
    AntdTag.Row,
    AntdTag.Col,
    AntdTag.LayoutSider,
    AntdTag.Space,
  ],
  [AntdTag.Navigation]: [
    AntdTag.Affix,
    {
      [AntdTag.Breadcrumb]: [
        AntdTag.BreadcrumbItem,
        AntdTag.BreadcrumbSeparator,
      ],
    },
    { [AntdTag.Dropdown]: [AntdTag.DropdownButton] },
    AntdTag.Menu,
    AntdTag.Pagination,
    AntdTag.PageHeader,
    { [AntdTag.Steps]: [AntdTag.StepsStep] },
  ],
  [AntdTag.DataEntry]: [
    AntdTag.AutoComplete,
    AntdTag.Cascader,
    { [AntdTag.Checkbox]: [AntdTag.CheckboxGroup] },
    AntdTag.DatePicker,
    {
      [AntdTag.Form]: [
        AntdTag.FormItem,
        AntdTag.FormList,
        AntdTag.FormErrorList,
        AntdTag.FormProvider,
      ],
    },
    AntdTag.Input,
    AntdTag.InputNumber,
    { [AntdTag.Mentions]: [AntdTag.MentionsOption] },
    { [AntdTag.Radio]: [AntdTag.RadioGroup] },
    AntdTag.Rate,
    { [AntdTag.Select]: [AntdTag.SelectOption] },
    AntdTag.Slider,
    AntdTag.Switch,
    AntdTag.TimePicker,
    AntdTag.Transfer,
    AntdTag.TreeSelect,
    AntdTag.Upload,
  ],
  [AntdTag.DataDisplay]: [
    AntdTag.Avatar,
    AntdTag.Badge,
    AntdTag.Comment,
    { [AntdTag.Collapse]: [AntdTag.CollapsePanel] },
    AntdTag.Carousel,
    { [AntdTag.Card]: [AntdTag.CardGrid, AntdTag.CardMeta] },
    AntdTag.Calendar,
    { [AntdTag.Descriptions]: [AntdTag.DescriptionsItem] },
    AntdTag.Empty,
    AntdTag.Image,
    { [AntdTag.List]: [{ [AntdTag.ListItem]: [AntdTag.ListItemMeta] }] },
    AntdTag.Popover,
    AntdTag.Segmented,
    AntdTag.Statistic,
    AntdTag.Tree,
    AntdTag.Tooltip,
    { [AntdTag.Timeline]: [AntdTag.TimelineItem] },
    AntdTag.Tag,
    { [AntdTag.Tabs]: [AntdTag.TabsTabPane] },
    AntdTag.Table,
  ],
  [AntdTag.Feedback]: [
    AntdTag.Alert,
    AntdTag.Drawer,
    AntdTag.Modal,
    AntdTag.Message,
    AntdTag.Notification,
    AntdTag.Progress,
    AntdTag.Popconfirm,
    AntdTag.Result,
    AntdTag.Spin,
    AntdTag.Skeleton,
  ],
  [AntdTag.Other]: [
    { [AntdTag.Anchor]: [AntdTag.AnchorLink] },
    AntdTag.BackTop,
    AntdTag.ConfigProvider,
  ],
}
