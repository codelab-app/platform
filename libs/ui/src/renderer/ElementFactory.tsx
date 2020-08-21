import { mouseEventHandlerKeys } from '@codelab/event'
import { Node } from '@codelab/graph'
import { Props, propsFilter, withFilters } from '@codelab/props'
import {
  Affix,
  Alert,
  Anchor,
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
  List,
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
  Tag,
  Timeline,
  TimePicker,
  Tabs,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
} from 'antd'
import React from 'react'
import { Icon } from '@ant-design/compatible'
import { ElementParameters } from './ElementFactory.interface'
import { buttonPropKeys } from '../components/button/Button'
import { Form as CodelabForm } from '../components/form/Form'
import { Grid } from '../components/grid/Grid'
import { Html } from '../components/html/Html'
import { Provider } from '../components/provider/Provider'

export const elementParameterFactory = <P extends Props>(
  node: Node<P>,
): ElementParameters<Props> => {
  const { type, props } = node

  switch (type) {
    case 'React.Fragment':
      return [React.Fragment, props]
    case 'Html.div':
      return ['div', props]
    case 'Html.p':
      return ['p', props]
    case 'Html.a':
      return ['a', props]
    case 'Html.span':
      return ['span', props]
    case 'Text':
      return [Html.Text as any, props]
    case 'Icon':
      return [Icon as any, props]
    case 'Menu':
      return [Menu as any, props]
    case 'Menu.Item':
      return [Menu.Item as any, props]
    case 'Menu.ItemGroup':
      return [Menu.ItemGroup as any, props]
    case 'Menu.SubMenu':
      return [Menu.SubMenu as any, props]
    case 'Card':
      return [Card, props]
    case 'Card.Grid':
      return [Card.Grid, props]
    case 'Card.Meta':
      return [Card.Meta, props]
    case 'Typography':
      return [Typography as any, props]
    case 'Typography.Title':
      return [Typography.Title as any, props]
    case 'Typography.Text':
      return [Typography.Text as any, props]
    case 'Typography.Paragraph':
      return [Typography.Paragraph as any, props]
    case 'Alert':
      return [Alert as any, props]
    case 'Affix':
      return [Affix as any, props]
    case 'Button':
      return [
        withFilters(
          propsFilter([...mouseEventHandlerKeys, ...buttonPropKeys]),
          Button,
        ),
        props,
      ]
    case 'Breadcrumb':
      return [Breadcrumb as any, props]
    case 'Breadcrumb.Item':
      return [Breadcrumb.Item as any, props]
    case 'Dropdown':
      return [Dropdown as any, props]
    case 'Form':
      return [Form, props]
    case 'Form.Item':
      return [Form.Item as any, props]
    case 'Form.List':
      return [CodelabForm.List as any, props]
    case 'Checkbox':
      return [Checkbox as any, props]
    case 'Input': // can't have children
      return [Input as any, props]
    case 'InputNumber':
      return [InputNumber as any, props]
    case 'Select':
      return [Select as any, props]
    case 'Select.Option':
      return [Select.Option as any, props]
    case 'Grid':
      return [Grid.Default, props]
    case 'Provider':
      return [Provider.Default, props]
    case 'Modal':
      return [Modal as any, props]
    case 'Radio.Group':
      return [Radio.Group as any, props]
    case 'Radio':
      return [Radio as any, props]
    case 'Rate':
      return [Rate as any, props]
    case 'Slider':
      return [Slider as any, props]
    case 'Switch':
      return [Switch as any, props]
    case 'Space':
      return [Space as any, props]
    case 'DatePicker':
      return [DatePicker as any, props]
    case 'Divider':
      return [Divider as any, props]
    case 'Pagination':
      return [Pagination as any, props]
    case 'PageHeader':
      return [PageHeader as any, props]
    case 'Badge':
      return [Badge as any, props]
    case 'Avatar':
      return [Avatar as any, props]
    case 'Comment':
      return [Comment as any, props]
    case 'Calendar':
      return [Calendar as any, props]
    case 'Descriptions':
      return [Descriptions as any, props]
    case 'Descriptions.Item':
      return [Descriptions.Item as any, props]
    case 'Empty':
      return [Empty as any, props]
    case 'Timeline':
      return [Timeline as any, props]
    case 'Timeline.Item':
      return [Timeline.Item as any, props]
    case 'Tabs':
      return [Tabs as any, props]
    case 'Tabs.TabPane':
      return [Tabs.TabPane as any, props]
    case 'Statistic':
      return [Statistic as any, props]
    case 'Tooltip':
      return [Tooltip as any, props]
    case 'Tag':
      return [Tag as any, props]
    case 'Tree':
      return [Tree as any, props]
    case 'Drawer':
      return [Drawer as any, props]
    case 'Progress':
      return [Progress as any, props]
    case 'Result':
      return [Result as any, props]
    case 'Spin':
      return [Spin as any, props]
    case 'Skeleton':
      return [Skeleton as any, props]
    case 'Anchor':
      return [Anchor as any, props]
    case 'Anchor.Link':
      return [Anchor.Link as any, props]
    case 'BackTop':
      return [BackTop as any, props]
    case 'ConfigProvider':
      return [ConfigProvider as any, props]
    // case 'Anchor':
    //   return [Anchor as any, props]
    // case 'Message':
    //   return [Message as any, props]
    case 'Popconfirm':
      return [Popconfirm as any, props]
    case 'Transfer':
      return [Transfer as any, props]
    case 'TreeSelect':
      return [TreeSelect as any, props]
    case 'TreeNode':
      return [TreeSelect.TreeNode as any, props]
    case 'TimePicker':
      return [TimePicker as any, props]
    case 'Upload':
      return [Upload as any, props]
    case 'Steps':
      return [Steps as any, props]
    case 'Steps.Step':
      return [Steps.Step as any, props]
    case 'Collapse':
      return [Collapse as any, props]
    case 'Collapse.Panel':
      return [Collapse.Panel as any, props]
    case 'Carousel':
      return [Carousel as any, props]
    case 'List':
      return [List as any, props]
    case 'List.Item':
      return [List.Item as any, props]
    case 'List.Item.Meta':
      return [List.Item.Meta as any, props]
    case 'Cascader':
      return [Cascader as any, props]
    case 'Popover':
      return [Popover as any, props]
    default:
      return ['div', props]
  }
}
