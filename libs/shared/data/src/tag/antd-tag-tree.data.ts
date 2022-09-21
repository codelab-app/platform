import { AntdTag } from './antd-tags.data'

type TagNode = Array<string | { [key: string]: TagNode }>

/**
 * This contains hierarchical tag data for Ant Design
 */
export const antdTagTree: Record<string, TagNode> = {
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
    AntdTag.Dropdown,
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
    AntdTag.Mentions,
    AntdTag.Radio,
    AntdTag.Rate,
    AntdTag.Select,
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
    AntdTag.Collapse,
    AntdTag.Carousel,
    AntdTag.Card,
    AntdTag.Calendar,
    AntdTag.Descriptions,
    AntdTag.Empty,
    AntdTag.Image,
    AntdTag.List,
    AntdTag.Popover,
    AntdTag.Statistic,
    AntdTag.Tree,
    AntdTag.Tooltip,
    AntdTag.Timeline,
    AntdTag.Tag,
    AntdTag.Tabs,
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
  ],
}
