import { Icon } from '@ant-design/compatible'
import { VertexType } from '@prisma/client'
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
import React, { ReactHTMLElement } from 'react'
import { DashboardHandlerProps } from '../../../../apps/web/src/dashboard/drawer/Dashboard-handlers'
import { onResizeStop } from '../../../alpha/ui/antd/src/components/rgl/RGL-handlers'
import { propsFilter, withFilters } from '@codelab/alpha/core/props'
import { mouseEventHandlerKeys } from '@codelab/alpha/shared/event'
import {
  Button as ButtonTypes,
  CodelabForm,
  CodelabHtml,
  CodelabMapper,
  CodelabTable,
  Provider,
  RGL,
  RenderComponent,
  onDragStart,
} from '@codelab/alpha/ui/antd'

export const elementParameterFactory = ({
  type,
  props = {},
  handlers,
}: {
  type: VertexType
  props?: Record<string, any>
  handlers: DashboardHandlerProps // Function hooks injected to pass to handlers
}): [ReactHTMLElement<any> | React.FunctionComponent<any> | string, object] => {
  switch (type) {
    case VertexType.React_Fragment:
      return [React.Fragment, props]
    case VertexType.React_Html_Div:
      return ['div', props]
    case VertexType.React_Html_P:
      return ['p', props]
    case VertexType.React_Html_A:
      return ['a', props]
    case VertexType.React_Html_Span:
      return ['span', props]
    case VertexType.React_Text:
      return [CodelabHtml.Text as any, props]
    case VertexType.React_Icon:
      return [Icon as any, props]
    case VertexType.React_Menu:
      return [Menu as any, props]
    case VertexType.React_Menu_Item:
      return [Menu.Item as any, props]
    case VertexType.React_Menu_ItemGroup:
      return [Menu.ItemGroup as any, props]
    case VertexType.React_Menu_SubMenu:
      return [Menu.SubMenu as any, props]
    case VertexType.React_Card:
      return [Card, props]
    case VertexType.React_Card_Grid:
      return [Card.Grid, props]
    case VertexType.React_Card_Meta:
      return [Card.Meta, props]
    case VertexType.React_Typography:
      return [Typography as any, props]
    case VertexType.React_Typography_Title:
      return [Typography.Title as any, props]
    case VertexType.React_Typography_Text:
      return [Typography.Text as any, props]
    case VertexType.React_Typography_Paragraph:
      return [Typography.Paragraph as any, props]
    case VertexType.React_Alert:
      return [Alert as any, props]
    case VertexType.React_Affix:
      return [Affix as any, props]
    case VertexType.React_AutoComplete:
      return [AutoComplete as any, props]
    case VertexType.React_Button:
      return [
        withFilters(
          propsFilter([...mouseEventHandlerKeys, ...ButtonTypes.propKeys]),
          Button,
        ),
        props,
      ]
    case VertexType.React_Breadcrumb:
      return [Breadcrumb as any, props]
    case VertexType.React_Breadcrumb_Item:
      return [Breadcrumb.Item as any, props]
    case VertexType.React_Dropdown:
      return [Dropdown as any, props]
    case VertexType.React_Form:
      return [Form, props]
    case VertexType.React_Form_Item:
      return [Form.Item as any, props]
    case VertexType.React_Form_List:
      return [CodelabForm.List as any, props]
    case VertexType.React_Form_ItemHook:
      return [CodelabForm.ItemHook as any, props]
    case VertexType.React_Checkbox:
      return [Checkbox as any, props]
    case VertexType.React_Input: // can't have children
      return [Input as any, props]
    case VertexType.React_InputNumber:
      return [InputNumber as any, props]
    case VertexType.React_Select:
      return [Select as any, props]
    case VertexType.React_Select_Option:
      return [Select.Option as any, props]
    case VertexType.React_RGL_Container:
      return [RGL.Container, props]
    case VertexType.React_RGL_Item:
      return [
        RGL.Item,
        // Currently the react-grid-layout library, for some reason, re-renders the layout
        // only if it detects a change in the key of the child, and doesn't care about the data-grid property
        // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
        // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo
        {
          ...props,
          key: props['data-grid']
            ? props.key + JSON.stringify(props['data-grid'])
            : props.key,
        },
      ]
    case VertexType.React_RGL_ResponsiveContainer:
      return [
        RGL.ResponsiveContainer,
        {
          ...props,
          onDragStart: onDragStart(handlers),
          onResizeStop: onResizeStop(handlers),
        },
      ]
    case VertexType.React_Provider:
      return [Provider.Default, props]
    case VertexType.React_Modal:
      return [Modal as any, props]
    case VertexType.React_Radio_Group:
      return [Radio.Group as any, props]
    case VertexType.React_Radio:
      return [Radio as any, props]
    case VertexType.React_Rate:
      return [Rate as any, props]
    case VertexType.React_Slider:
      return [Slider as any, props]
    case VertexType.React_Switch:
      return [Switch as any, props]
    case VertexType.React_Space:
      return [Space as any, props]
    case VertexType.React_DatePicker:
      return [DatePicker as any, props]
    case VertexType.React_Divider:
      return [Divider as any, props]
    case VertexType.React_Pagination:
      return [Pagination as any, props]
    case VertexType.React_PageHeader:
      return [PageHeader as any, props]
    case VertexType.React_Badge:
      return [Badge as any, props]
    case VertexType.React_Avatar:
      return [Avatar as any, props]
    case VertexType.React_Comment:
      return [Comment as any, props]
    case VertexType.React_Calendar:
      return [Calendar as any, props]
    case VertexType.React_Descriptions:
      return [Descriptions as any, props]
    case VertexType.React_Descriptions_Item:
      return [Descriptions.Item as any, props]
    case VertexType.React_Empty:
      return [Empty as any, props]
    case VertexType.React_Timeline:
      return [Timeline as any, props]
    case VertexType.React_Timeline_Item:
      return [Timeline.Item as any, props]
    case VertexType.React_Tabs:
      return [Tabs as any, props]
    case VertexType.React_Tabs_TabPane:
      return [Tabs.TabPane as any, props]
    case VertexType.React_Statistic:
      return [Statistic as any, props]
    case VertexType.React_Tooltip:
      return [Tooltip as any, props]
    case VertexType.React_Tag:
      return [Tag as any, props]
    case VertexType.React_Tree:
      return [Tree as any, props]
    case VertexType.React_Drawer:
      return [Drawer as any, props]
    case VertexType.React_Progress:
      return [Progress as any, props]
    case VertexType.React_Result:
      return [Result as any, props]
    case VertexType.React_Spin:
      return [Spin as any, props]
    case VertexType.React_Skeleton:
      return [Skeleton as any, props]
    case VertexType.React_Anchor:
      return [Anchor as any, props]
    case VertexType.React_Anchor_Link:
      return [Anchor.Link as any, props]
    case VertexType.React_BackTop:
      return [BackTop as any, props]
    case VertexType.React_ConfigProvider:
      return [ConfigProvider as any, props]
    case VertexType.React_Popconfirm:
      return [Popconfirm as any, props]
    case VertexType.React_Transfer:
      return [Transfer as any, props]
    case VertexType.React_TreeSelect:
      return [TreeSelect as any, props]
    case VertexType.React_TreeNode:
      return [TreeSelect.TreeNode as any, props]
    case VertexType.React_TimePicker:
      return [TimePicker as any, props]
    case VertexType.React_Upload:
      return [Upload as any, props]
    case VertexType.React_Steps:
      return [Steps as any, props]
    case VertexType.React_Steps_Step:
      return [Steps.Step as any, props]
    case VertexType.React_Collapse:
      return [Collapse as any, props]
    case VertexType.React_Collapse_Panel:
      return [Collapse.Panel as any, props]
    case VertexType.React_Carousel:
      return [Carousel as any, props]
    case VertexType.React_List:
      return [List as any, props]
    case VertexType.React_List_Item:
      return [List.Item as any, props]
    case VertexType.React_List_Item_Meta:
      return [List.Item.Meta as any, props]
    case VertexType.React_Mentions:
      return [Mentions as any, props]
    case VertexType.React_Mentions_Option:
      return [Mentions.Option as any, props]
    case VertexType.React_Layout:
      return [Layout as any, props]
    case VertexType.React_Layout_Header:
      return [Layout.Header as any, props]
    case VertexType.React_Layout_Sider:
      return [Layout.Sider as any, props]
    case VertexType.React_Layout_Content:
      return [Layout.Content as any, props]
    case VertexType.React_Layout_Footer:
      return [Layout.Footer as any, props]
    case VertexType.React_Cascader:
      return [Cascader as any, props]
    case VertexType.React_Popover:
      return [Popover as any, props]
    case VertexType.React_Table:
      return [CodelabTable.Default as any, props]
    case VertexType.React_RenderComponent:
      return [RenderComponent.Default as any, props]
    case VertexType.React_RenderContainer:
      return [RenderComponent.Container as any, props]
    case VertexType.React_Mapper:
      return [CodelabMapper.Default as any, props]
    default:
      throw new Error('Missing element in ElementFactory')
  }
}
