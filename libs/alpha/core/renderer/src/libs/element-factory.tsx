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
import { propsFilter, withFilters } from '@codelab/alpha/core/props'
import { mouseEventHandlerKeys } from '@codelab/alpha/shared/event'
import {
  ElementParameters,
  NodeA,
  NodeFactory,
  NodeType,
} from '@codelab/alpha/shared/interface/node'
import { Props } from '@codelab/alpha/shared/interface/props'
import {
  Button as ButtonTypes,
  CodelabForm,
  CodelabHtml,
  CodelabMapper,
  CodelabTable,
  Provider,
  RGL,
  RenderComponent,
} from '@codelab/alpha/ui/antd'

export const elementParameterFactory: NodeFactory<
  ElementParameters<Props>,
  NodeA
> = <P extends Props>(node: NodeA) => {
  const { type, props } = node

  switch (type) {
    case NodeType.React_Fragment:
      return [React.Fragment, props]
    case NodeType.React_Html_Div:
      return ['div', props]
    case NodeType.React_Html_P:
      return ['p', props]
    case NodeType.React_Html_A:
      return ['a', props]
    case NodeType.React_Html_Span:
      return ['span', props]
    case NodeType.React_Text:
      return [CodelabHtml.Text as any, props]
    case NodeType.React_Icon:
      return [Icon as any, props]
    case NodeType.React_Menu:
      return [Menu as any, props]
    case NodeType.React_Menu_Item:
      return [Menu.Item as any, props]
    case NodeType.React_Menu_ItemGroup:
      return [Menu.ItemGroup as any, props]
    case NodeType.React_Menu_SubMenu:
      return [Menu.SubMenu as any, props]
    case NodeType.React_Card:
      return [Card, props]
    case NodeType.React_Card_Grid:
      return [Card.Grid, props]
    case NodeType.React_Card_Meta:
      return [Card.Meta, props]
    case NodeType.React_Typography:
      return [Typography as any, props]
    case NodeType.React_Typography_Title:
      return [Typography.Title as any, props]
    case NodeType.React_Typography_Text:
      return [Typography.Text as any, props]
    case NodeType.React_Typography_Paragraph:
      return [Typography.Paragraph as any, props]
    case NodeType.React_Alert:
      return [Alert as any, props]
    case NodeType.React_Affix:
      return [Affix as any, props]
    case NodeType.React_AutoComplete:
      return [AutoComplete as any, props]
    case NodeType.React_Button:
      return [
        withFilters(
          propsFilter([...mouseEventHandlerKeys, ...ButtonTypes.propKeys]),
          Button,
        ),
        props,
      ]
    case NodeType.React_Breadcrumb:
      return [Breadcrumb as any, props]
    case NodeType.React_Breadcrumb_Item:
      return [Breadcrumb.Item as any, props]
    case NodeType.React_Dropdown:
      return [Dropdown as any, props]
    case NodeType.React_Form:
      return [Form, props]
    case NodeType.React_Form_Item:
      return [Form.Item as any, props]
    case NodeType.React_Form_List:
      return [CodelabForm.List as any, props]
    case NodeType.React_Form_ItemHook:
      return [CodelabForm.ItemHook as any, props]
    case NodeType.React_Checkbox:
      return [Checkbox as any, props]
    case NodeType.React_Input: // can't have children
      return [Input as any, props]
    case NodeType.React_InputNumber:
      return [InputNumber as any, props]
    case NodeType.React_Select:
      return [Select as any, props]
    case NodeType.React_Select_Option:
      return [Select.Option as any, props]
    case NodeType.React_ResponsiveGrid:
      return [RGL.ResponsiveContainer, props]
    case NodeType.React_Grid:
      return [RGL.Container, props]
    case NodeType.React_Provider:
      return [Provider.Default, props]
    case NodeType.React_Modal:
      return [Modal as any, props]
    case NodeType.React_Radio_Group:
      return [Radio.Group as any, props]
    case NodeType.React_Radio:
      return [Radio as any, props]
    case NodeType.React_Rate:
      return [Rate as any, props]
    case NodeType.React_Slider:
      return [Slider as any, props]
    case NodeType.React_Switch:
      return [Switch as any, props]
    case NodeType.React_Space:
      return [Space as any, props]
    case NodeType.React_DatePicker:
      return [DatePicker as any, props]
    case NodeType.React_Divider:
      return [Divider as any, props]
    case NodeType.React_Pagination:
      return [Pagination as any, props]
    case NodeType.React_PageHeader:
      return [PageHeader as any, props]
    case NodeType.React_Badge:
      return [Badge as any, props]
    case NodeType.React_Avatar:
      return [Avatar as any, props]
    case NodeType.React_Comment:
      return [Comment as any, props]
    case NodeType.React_Calendar:
      return [Calendar as any, props]
    case NodeType.React_Descriptions:
      return [Descriptions as any, props]
    case NodeType.React_Descriptions_Item:
      return [Descriptions.Item as any, props]
    case NodeType.React_Empty:
      return [Empty as any, props]
    case NodeType.React_Timeline:
      return [Timeline as any, props]
    case NodeType.React_Timeline_Item:
      return [Timeline.Item as any, props]
    case NodeType.React_Tabs:
      return [Tabs as any, props]
    case NodeType.React_Tabs_TabPane:
      return [Tabs.TabPane as any, props]
    case NodeType.React_Statistic:
      return [Statistic as any, props]
    case NodeType.React_Tooltip:
      return [Tooltip as any, props]
    case NodeType.React_Tag:
      return [Tag as any, props]
    case NodeType.React_Tree:
      return [Tree as any, props]
    case NodeType.React_Drawer:
      return [Drawer as any, props]
    case NodeType.React_Progress:
      return [Progress as any, props]
    case NodeType.React_Result:
      return [Result as any, props]
    case NodeType.React_Spin:
      return [Spin as any, props]
    case NodeType.React_Skeleton:
      return [Skeleton as any, props]
    case NodeType.React_Anchor:
      return [Anchor as any, props]
    case NodeType.React_Anchor_Link:
      return [Anchor.Link as any, props]
    case NodeType.React_BackTop:
      return [BackTop as any, props]
    case NodeType.React_ConfigProvider:
      return [ConfigProvider as any, props]
    case NodeType.React_Popconfirm:
      return [Popconfirm as any, props]
    case NodeType.React_Transfer:
      return [Transfer as any, props]
    case NodeType.React_TreeSelect:
      return [TreeSelect as any, props]
    case NodeType.React_TreeNode:
      return [TreeSelect.TreeNode as any, props]
    case NodeType.React_TimePicker:
      return [TimePicker as any, props]
    case NodeType.React_Upload:
      return [Upload as any, props]
    case NodeType.React_Steps:
      return [Steps as any, props]
    case NodeType.React_Steps_Step:
      return [Steps.Step as any, props]
    case NodeType.React_Collapse:
      return [Collapse as any, props]
    case NodeType.React_Collapse_Panel:
      return [Collapse.Panel as any, props]
    case NodeType.React_Carousel:
      return [Carousel as any, props]
    case NodeType.React_List:
      return [List as any, props]
    case NodeType.React_List_Item:
      return [List.Item as any, props]
    case NodeType.React_List_Item_Meta:
      return [List.Item.Meta as any, props]
    case NodeType.React_Mentions:
      return [Mentions as any, props]
    case NodeType.React_Mentions_Option:
      return [Mentions.Option as any, props]
    case NodeType.React_Layout:
      return [Layout as any, props]
    case NodeType.React_Layout_Header:
      return [Layout.Header as any, props]
    case NodeType.React_Layout_Sider:
      return [Layout.Sider as any, props]
    case NodeType.React_Layout_Content:
      return [Layout.Content as any, props]
    case NodeType.React_Layout_Footer:
      return [Layout.Footer as any, props]
    case NodeType.React_Cascader:
      return [Cascader as any, props]
    case NodeType.React_Popover:
      return [Popover as any, props]
    case NodeType.React_Table:
      return [CodelabTable.Default as any, props]
    case NodeType.React_RenderComponent:
      return [RenderComponent.Default as any, props]
    case NodeType.React_RenderContainer:
      return [RenderComponent.Container as any, props]
    case NodeType.React_Mapper:
      return [CodelabMapper.Default as any, props]
    default:
      throw new Error('Missing element in ElementFactory')
    // return ['div', props]
  }
}
