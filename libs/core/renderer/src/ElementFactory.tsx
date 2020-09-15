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
import { ElementParameters } from './element-factory.interface'
import {
  Button as ButtonTypes,
  CodelabForm,
  CodelabHtml,
  CodelabTable,
  Grid,
  Provider,
} from '@codelab/components/ui'
import { Node } from '@codelab/core/node'
import { propsFilter, withFilters } from '@codelab/core/props'
import { mouseEventHandlerKeys } from '@codelab/shared/event'
import { Props } from '@codelab/shared/interface/props'

export const elementParameterFactory = <P extends Props>(
  node: Node,
): ElementParameters<Props> => {
  const { type, props } = node

  switch (type) {
    case 'React.Fragment':
      return [React.Fragment, props]
    case 'React.Html.div':
      return ['div', props]
    case 'React.Html.p':
      return ['p', props]
    case 'React.Html.a':
      return ['a', props]
    case 'React.Html.span':
      return ['span', props]
    case 'React.Text':
      return [CodelabHtml.Text as any, props]
    case 'React.Icon':
      return [Icon as any, props]
    case 'React.Menu':
      return [Menu as any, props]
    case 'React.Menu.Item':
      return [Menu.Item as any, props]
    case 'React.Menu.ItemGroup':
      return [Menu.ItemGroup as any, props]
    case 'React.Menu.SubMenu':
      return [Menu.SubMenu as any, props]
    case 'React.Card':
      return [Card, props]
    case 'React.Card.Grid':
      return [Card.Grid, props]
    case 'React.Card.Meta':
      return [Card.Meta, props]
    case 'React.Typography':
      return [Typography as any, props]
    case 'React.Typography.Title':
      return [Typography.Title as any, props]
    case 'React.Typography.Text':
      return [Typography.Text as any, props]
    case 'React.Typography.Paragraph':
      return [Typography.Paragraph as any, props]
    case 'React.Alert':
      return [Alert as any, props]
    case 'React.Affix':
      return [Affix as any, props]
    case 'React.AutoComplete':
      return [AutoComplete as any, props]
    case 'React.Button':
      return [
        withFilters(
          propsFilter([...mouseEventHandlerKeys, ...ButtonTypes.propKeys]),
          Button,
        ),
        props,
      ]
    case 'React.Breadcrumb':
      return [Breadcrumb as any, props]
    case 'React.Breadcrumb.Item':
      return [Breadcrumb.Item as any, props]
    case 'React.Dropdown':
      return [Dropdown as any, props]
    case 'React.Form':
      return [Form, props]
    case 'React.Form.Item':
      return [Form.Item as any, props]
    case 'React.Form.List':
      return [CodelabForm.List as any, props]
    case 'React.Form.ItemHook':
      return [CodelabForm.ItemHook as any, props]
    case 'React.Checkbox':
      return [Checkbox as any, props]
    case 'React.Input': // can't have children
      return [Input as any, props]
    case 'React.InputNumber':
      return [InputNumber as any, props]
    case 'React.Select':
      return [Select as any, props]
    case 'React.Select.Option':
      return [Select.Option as any, props]
    case 'React.Grid':
      return [Grid.Default, props]
    case 'React.ResponsiveGrid':
      return [Grid.Responsive, props]
    case 'React.Provider':
      return [Provider.Default, props]
    case 'React.Modal':
      return [Modal as any, props]
    case 'React.Radio.Group':
      return [Radio.Group as any, props]
    case 'React.Radio':
      return [Radio as any, props]
    case 'React.Rate':
      return [Rate as any, props]
    case 'React.Slider':
      return [Slider as any, props]
    case 'React.Switch':
      return [Switch as any, props]
    case 'React.Space':
      return [Space as any, props]
    case 'React.DatePicker':
      return [DatePicker as any, props]
    case 'React.Divider':
      return [Divider as any, props]
    case 'React.Pagination':
      return [Pagination as any, props]
    case 'React.PageHeader':
      return [PageHeader as any, props]
    case 'React.Badge':
      return [Badge as any, props]
    case 'React.Avatar':
      return [Avatar as any, props]
    case 'React.Comment':
      return [Comment as any, props]
    case 'React.Calendar':
      return [Calendar as any, props]
    case 'React.Descriptions':
      return [Descriptions as any, props]
    case 'React.Descriptions.Item':
      return [Descriptions.Item as any, props]
    case 'React.Empty':
      return [Empty as any, props]
    case 'React.Timeline':
      return [Timeline as any, props]
    case 'React.Timeline.Item':
      return [Timeline.Item as any, props]
    case 'React.Tabs':
      return [Tabs as any, props]
    case 'React.Tabs.TabPane':
      return [Tabs.TabPane as any, props]
    case 'React.Statistic':
      return [Statistic as any, props]
    case 'React.Tooltip':
      return [Tooltip as any, props]
    case 'React.Tag':
      return [Tag as any, props]
    case 'React.Tree':
      return [Tree as any, props]
    case 'React.Drawer':
      return [Drawer as any, props]
    case 'React.Progress':
      return [Progress as any, props]
    case 'React.Result':
      return [Result as any, props]
    case 'React.Spin':
      return [Spin as any, props]
    case 'React.Skeleton':
      return [Skeleton as any, props]
    case 'React.Anchor':
      return [Anchor as any, props]
    case 'React.Anchor.Link':
      return [Anchor.Link as any, props]
    case 'React.BackTop':
      return [BackTop as any, props]
    case 'React.ConfigProvider':
      return [ConfigProvider as any, props]
    case 'React.Popconfirm':
      return [Popconfirm as any, props]
    case 'React.Transfer':
      return [Transfer as any, props]
    case 'React.TreeSelect':
      return [TreeSelect as any, props]
    case 'React.TreeNode':
      return [TreeSelect.TreeNode as any, props]
    case 'React.TimePicker':
      return [TimePicker as any, props]
    case 'React.Upload':
      return [Upload as any, props]
    case 'React.Steps':
      return [Steps as any, props]
    case 'React.Steps.Step':
      return [Steps.Step as any, props]
    case 'React.Collapse':
      return [Collapse as any, props]
    case 'React.Collapse.Panel':
      return [Collapse.Panel as any, props]
    case 'React.Carousel':
      return [Carousel as any, props]
    case 'React.List':
      return [List as any, props]
    case 'React.List.Item':
      return [List.Item as any, props]
    case 'React.List.Item.Meta':
      return [List.Item.Meta as any, props]
    case 'React.Mentions':
      return [Mentions as any, props]
    case 'React.Mentions.Option':
      return [Mentions.Option as any, props]
    case 'React.Layout':
      return [Layout as any, props]
    case 'React.Layout.Header':
      return [Layout.Header as any, props]
    case 'React.Layout.Sider':
      return [Layout.Sider as any, props]
    case 'React.Layout.Content':
      return [Layout.Content as any, props]
    case 'React.Layout.Footer':
      return [Layout.Footer as any, props]
    case 'React.Cascader':
      return [Cascader as any, props]
    case 'React.Popover':
      return [Popover as any, props]
    case 'React.Table':
      return [CodelabTable.Default as any, props]
    default:
      throw new Error('Missing element in ElementFactory')
    // return ['div', props]
  }
}
