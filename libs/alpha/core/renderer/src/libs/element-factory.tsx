/* eslint-disable import/no-cycle */
import { Icon } from '@ant-design/compatible'
import {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  InputNumber,
  Layout,
  List,
  Mentions,
  Menu,
  Modal,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
} from 'antd'
import React from 'react'
import { Props } from '@codelab/alpha/shared/interface/props'
import {
  CodelabForm,
  CodelabHtml,
  CodelabMapper,
  CodelabTable,
  Provider,
  RGL,
  RenderComponent,
} from '@codelab/alpha/ui/antd'
import { AtomType, NodeA } from '@codelab/frontend'

export const elementParameterFactory = <P extends Props>(node: NodeA) => {
  const { type, props } = node

  switch (type) {
    case AtomType.ReactFragment:
      return [React.Fragment, props]
    case AtomType.ReactHtmlDiv:
      return ['div', props]
    case AtomType.ReactHtmlP:
      return ['p', props]
    case AtomType.ReactHtmlA:
      return ['a', props]
    case AtomType.ReactHtmlSpan:
      return ['span', props]
    case AtomType.ReactText:
      return [CodelabHtml.Text as any, props]
    case AtomType.ReactIcon:
      return [Icon as any, props]
    case AtomType.ReactMenu:
      return [Menu as any, props]
    case AtomType.ReactMenuItem:
      return [Menu.Item as any, props]
    case AtomType.ReactMenuItemGroup:
      return [Menu.ItemGroup as any, props]
    case AtomType.ReactMenuSubMenu:
      return [Menu.SubMenu as any, props]
    case AtomType.ReactCard:
      return [Card, props]
    case AtomType.ReactCardGrid:
      return [Card.Grid, props]
    case AtomType.ReactCardMeta:
      return [Card.Meta, props]
    case AtomType.ReactTypography:
      return [Typography as any, props]
    case AtomType.ReactTypographyTitle:
      return [Typography.Title as any, props]
    case AtomType.ReactTypographyText:
      return [Typography.Text as any, props]
    case AtomType.ReactTypographyParagraph:
      return [Typography.Paragraph as any, props]
    case AtomType.ReactAlert:
      return [Alert as any, props]
    case AtomType.ReactAffix:
      return [Affix as any, props]
    case AtomType.ReactAutoComplete:
      return [AutoComplete as any, props]
    case AtomType.ReactButton:
      return [Button, props]
    case AtomType.ReactBreadcrumb:
      return [Breadcrumb as any, props]
    case AtomType.ReactBreadcrumbItem:
      return [Breadcrumb.Item as any, props]
    case AtomType.ReactDropdown:
      return [Dropdown as any, props]
    case AtomType.ReactForm:
      return [Form, props]
    case AtomType.ReactFormItem:
      return [Form.Item as any, props]
    case AtomType.ReactFormList:
      return [CodelabForm.List as any, props]
    case AtomType.ReactFormItemHook:
      return [CodelabForm.ItemHook as any, props]
    case AtomType.ReactCheckbox:
      return [Checkbox as any, props]
    case AtomType.ReactInput: // can't have children
      return [Input as any, props]
    case AtomType.ReactInputNumber:
      return [InputNumber as any, props]
    case AtomType.ReactSelect:
      return [Select as any, props]
    case AtomType.ReactSelectOption:
      return [Select.Option as any, props]
    case AtomType.ReactRglResponsiveContainer:
      return [RGL.ResponsiveContainer, props]
    case AtomType.ReactRglContainer:
      return [RGL.Container, props]
    case AtomType.ReactProvider:
      return [Provider.Default, props]
    case AtomType.ReactModal:
      return [Modal as any, props]
    case AtomType.ReactRadioGroup:
      return [Radio.Group as any, props]
    case AtomType.ReactRadio:
      return [Radio as any, props]
    case AtomType.ReactRate:
      return [Rate as any, props]
    case AtomType.ReactSlider:
      return [Slider as any, props]
    case AtomType.ReactSwitch:
      return [Switch as any, props]
    case AtomType.ReactSpace:
      return [Space as any, props]
    case AtomType.ReactDatePicker:
      return [DatePicker as any, props]
    case AtomType.ReactDivider:
      return [Divider as any, props]
    case AtomType.ReactPagination:
      return [Pagination as any, props]
    case AtomType.ReactPageHeader:
      return [PageHeader as any, props]
    case AtomType.ReactBadge:
      return [Badge as any, props]
    case AtomType.ReactAvatar:
      return [Avatar as any, props]
    case AtomType.ReactComment:
      return [Comment as any, props]
    case AtomType.ReactCalendar:
      return [Calendar as any, props]
    case AtomType.ReactDescriptions:
      return [Descriptions as any, props]
    case AtomType.ReactDescriptionsItem:
      return [Descriptions.Item as any, props]
    case AtomType.ReactEmpty:
      return [Empty as any, props]
    case AtomType.ReactTimeline:
      return [Timeline as any, props]
    case AtomType.ReactTimelineItem:
      return [Timeline.Item as any, props]
    case AtomType.ReactTabs:
      return [Tabs as any, props]
    case AtomType.ReactTabsTabPane:
      return [Tabs.TabPane as any, props]
    case AtomType.ReactStatistic:
      return [Statistic as any, props]
    case AtomType.ReactTooltip:
      return [Tooltip as any, props]
    case AtomType.ReactTag:
      return [Tag as any, props]
    case AtomType.ReactTree:
      return [Tree as any, props]
    case AtomType.ReactDrawer:
      return [Drawer as any, props]
    case AtomType.ReactProgress:
      return [Progress as any, props]
    case AtomType.ReactResult:
      return [Result as any, props]
    case AtomType.ReactSpin:
      return [Spin as any, props]
    case AtomType.ReactSkeleton:
      return [Skeleton as any, props]
    case AtomType.ReactAnchor:
      return [Anchor as any, props]
    case AtomType.ReactAnchorLink:
      return [Anchor.Link as any, props]
    case AtomType.ReactBackTop:
      return [BackTop as any, props]
    case AtomType.ReactConfigProvider:
      return [ConfigProvider as any, props]
    case AtomType.ReactPopconfirm:
      return [Popconfirm as any, props]
    case AtomType.ReactTransfer:
      return [Transfer as any, props]
    case AtomType.ReactTreeSelect:
      return [TreeSelect as any, props]
    case AtomType.ReactTreeNode:
      return [TreeSelect.TreeNode as any, props]
    case AtomType.ReactTimePicker:
      return [TimePicker as any, props]
    case AtomType.ReactUpload:
      return [Upload as any, props]
    case AtomType.ReactSteps:
      return [Steps as any, props]
    case AtomType.ReactStepsStep:
      return [Steps.Step as any, props]
    case AtomType.ReactCollapse:
      return [Collapse as any, props]
    case AtomType.ReactCollapsePanel:
      return [Collapse.Panel as any, props]
    case AtomType.ReactCarousel:
      return [Carousel as any, props]
    case AtomType.ReactList:
      return [List as any, props]
    case AtomType.ReactListItem:
      return [List.Item as any, props]
    case AtomType.ReactListItemMeta:
      return [List.Item.Meta as any, props]
    case AtomType.ReactMentions:
      return [Mentions as any, props]
    case AtomType.ReactMentionsOption:
      return [Mentions.Option as any, props]
    case AtomType.ReactLayout:
      return [Layout as any, props]
    case AtomType.ReactLayoutHeader:
      return [Layout.Header as any, props]
    case AtomType.ReactLayoutSider:
      return [Layout.Sider as any, props]
    case AtomType.ReactLayoutContent:
      return [Layout.Content as any, props]
    case AtomType.ReactLayoutFooter:
      return [Layout.Footer as any, props]
    case AtomType.ReactCascader:
      return [Cascader as any, props]
    case AtomType.ReactPopover:
      return [Popover as any, props]
    case AtomType.ReactTable:
      return [CodelabTable.Default as any, props]
    case AtomType.ReactRenderComponent:
      return [RenderComponent.Default as any, props]
    case AtomType.ReactRenderContainer:
      return [RenderComponent.Container as any, props]
    case AtomType.ReactMapper:
      return [CodelabMapper.Default as any, props]
    default:
      throw new Error('Missing element in ElementFactory')
    // return ['div', props]
  }
}
