export enum ReactNodeTypeEnum {
  'React.Fragment' = 'React.Fragment',
  'Html.div' = 'Html.div',
  'Html.p' = 'Html.p',
  'Html.a' = 'Html.a',
  'Html.span' = 'Html.span',
  'Text' = 'Text',
  'Icon' = 'Icon',
  'Menu' = 'Menu',
  'Menu.Item' = 'Menu.Item',
  'Menu.ItemGroup' = 'Menu.ItemGroup',
  'Menu.SubMenu' = 'Menu.SubMenu',
  'Card' = 'Card',
  'Card.Grid' = 'Card.Grid',
  'Card.Meta' = 'Card.Meta',
  'Typography' = 'Typography',
  'Typography.Title' = 'Typography.Title',
  'Typography.Text' = 'Typography.Text',
  'Typography.Paragraph' = 'Typography.Paragraph',
  'Alert' = 'Alert',
  'Affix' = 'Affix',
  'AutoComplete' = 'AutoComplete',
  'Button' = 'Button',
  'Breadcrumb' = 'Breadcrumb',
  'Breadcrumb.Item' = 'Breadcrumb.Item',
  'Dropdown' = 'Dropdown',
  'Form' = 'Form',
  'Form.Item' = 'Form.Item',
  'Form.ItemHook' = 'Form.ItemHook',
  'Form.List' = 'Form.List',
  'Checkbox' = 'Checkbox',
  'Input' = 'Input',
  'InputNumber' = 'InputNumber',
  'Select' = 'Select',
  'Select.Option' = 'Select.Option',
  'Grid' = 'Grid',
  'ResponsiveGrid' = 'ResponsiveGrid',
  'Provider' = 'Provider',
  'Modal' = 'Modal',
  'Radio.Group' = 'Radio.Group',
  'Radio' = 'Radio',
  'Rate' = 'Rate',
  'Slider' = 'Slider',
  'Switch' = 'Switch',
  'Table' = 'Table',
  'Space' = 'Space',
  'DatePicker' = 'DatePicker',
  'Divider' = 'Divider',
  'Pagination' = 'Pagination',
  'PageHeader' = 'PageHeader',
  'Badge' = 'Badge',
  'Avatar' = 'Avatar',
  'Comment' = 'Comment',
  'Calendar' = 'Calendar',
  'Descriptions' = 'Descriptions',
  'Descriptions.Item' = 'Descriptions.Item',
  'Empty' = 'Empty',
  'Timeline' = 'Timeline',
  'Timeline.Item' = 'Timeline.Item',
  'Tabs' = 'Tabs',
  'Tabs.TabPane' = 'Tabs.TabPane',
  'Statistic' = 'Statistic',
  'Tooltip' = 'Tooltip',
  'Tag' = 'Tag',
  'Tree' = 'Tree',
  'Drawer' = 'Drawer',
  'Progress' = 'Progress',
  'Result' = 'Result',
  'Spin' = 'Spin',
  'Skeleton' = 'Skeleton',
  'Anchor' = 'Anchor',
  'Anchor.Link' = 'Anchor.Link',
  'BackTop' = 'BackTop',
  'ConfigProvider' = 'ConfigProvider',
  'Popconfirm' = 'Popconfirm',
  'Transfer' = 'Transfer',
  'TreeSelect' = 'TreeSelect',
  'TreeNode' = 'TreeNode',
  'TimePicker' = 'TimePicker',
  'Upload' = 'Upload',
  'Steps' = 'Steps',
  'Steps.Step' = 'Steps.Step',
  'Collapse' = 'Collapse',
  'Collapse.Panel' = 'Collapse.Panel',
  'Carousel' = 'Carousel',
  'List' = 'List',
  'List.Item' = 'List.Item',
  'List.Item.Meta' = 'List.Item.Meta',
  'Mentions' = 'Mentions',
  'Mentions.Option' = 'Mentions.Option',
  'Layout' = 'Layout',
  'Layout.Header' = 'Layout.Header',
  'Layout.Sider' = 'Layout.Sider',
  'Layout.Content' = 'Layout.Content',
  'Layout.Footer' = 'Layout.Footer',
  'Cascader' = 'Cascader',
  'Popover' = 'Popover',
}

export type ReactNodeType = keyof typeof ReactNodeTypeEnum
