/**
 * We have 3 top level node types `Tree`, `Model`, & `React`, each can be broken down further
 */

export enum BaseNodeType {
  React = 'React',
  Tree = 'Tree',
  Model = 'Model',
  Field = 'Field',
}

/**
 * used for forms
 */
export const nodeTypeEntries = Object.entries(BaseNodeType)

// /**
//  * Used with Graphql
//  */
// export enum NodeType {
//   /**
//    * React, requires additional `type` key
//    */
//   React_Fragment,
//   React_Html_Div,
//   React_Html_P,
//   React_Html_A = 'React.Html.a',
//   React_Html_Span = 'React.Html.span',
//   React_Text = 'React.Text',
//   React_Icon = 'React.Icon',
//   React_Menu = 'React.Menu',
//   React_Menu_Item = 'React.Menu.Item',
//   React_Menu_ItemGroup = 'React.Menu.ItemGroup',
//   React_Menu_SubMenu = 'React.Menu.SubMenu',
//   React_Card = 'React.Card',
//   React_Card_Grid = 'React.Card.Grid',
//   React_Card_Meta = 'React.Card.Meta',
//   React_Typography = 'React.Typography',
//   React_Typography_Title = 'React.Typography.Title',
//   React_Typography_Text = 'React.Typography.Text',
//   React_Typography_Paragraph = 'React.Typography.Paragraph',
//   React_Alert = 'React.Alert',
//   React_Affix = 'React.Affix',
//   React_AutoComplete = 'React.AutoComplete',
//   React_Button = 'React.Button',
//   React_Breadcrumb = 'React.Breadcrumb',
//   React_Breadcrumb_Item = 'React.Breadcrumb.Item',
//   React_Dropdown = 'React.Dropdown',
//   React_Form = 'React.Form',
//   React_Form_Item = 'React.Form.Item',
//   React_Form_ItemHook = 'React.Form.ItemHook',
//   React_Form_List = 'React.Form.List',
//   React_Checkbox = 'React.Checkbox',
//   React_Input = 'React.Input',
//   React_InputNumber = 'React.InputNumber',
//   React_Select = 'React.Select',
//   React_Select_Option = 'React.Select.Option',
//   React_Grid = 'React.Grid',
//   React_ResponsiveGrid = 'React.ResponsiveGrid',
//   React_Provider = 'React.Provider',
//   React_Modal = 'React.Modal',
//   React_Radio_Group = 'React.Radio.Group',
//   React_Radio = 'React.Radio',
//   React_Rate = 'React.Rate',
//   React_Slider = 'React.Slider',
//   React_Switch = 'React.Switch',
//   React_Table = 'React.Table',
//   React_Space = 'React.Space',
//   React_DatePicker = 'React.DatePicker',
//   React_Divider = 'React.Divider',
//   React_Pagination = 'React.Pagination',
//   React_PageHeader = 'React.PageHeader',
//   React_Badge = 'React.Badge',
//   React_Avatar = 'React.Avatar',
//   React_Comment = 'React.Comment',
//   React_Calendar = 'React.Calendar',
//   React_Descriptions = 'React.Descriptions',
//   React_Descriptions_Item = 'React.Descriptions.Item',
//   React_Empty = 'React.Empty',
//   React_Timeline = 'React.Timeline',
//   React_Timeline_Item = 'React.Timeline.Item',
//   React_Tabs = 'React.Tabs',
//   React_Tabs_TabPane = 'React.Tabs.TabPane',
//   React_Statistic = 'React.Statistic',
//   React_Tooltip = 'React.Tooltip',
//   React_Tag = 'React.Tag',
//   React_Tree = 'React.Tree',
//   React_Drawer = 'React.Drawer',
//   React_Progress = 'React.Progress',
//   React_Result = 'React.Result',
//   React_Spin = 'React.Spin',
//   React_Skeleton = 'React.Skeleton',
//   React_Anchor = 'React.Anchor',
//   React_Anchor_Link = 'React.Anchor.Link',
//   React_BackTop = 'React.BackTop',
//   React_ConfigProvider = 'React.ConfigProvider',
//   React_Popconfirm = 'React.Popconfirm',
//   React_Transfer = 'React.Transfer',
//   React_TreeSelect = 'React.TreeSelect',
//   React_TreeNode = 'React.TreeNode',
//   React_TimePicker = 'React.TimePicker',
//   React_Upload = 'React.Upload',
//   React_Steps = 'React.Steps',
//   React_Steps_Step = 'React.Steps.Step',
//   React_Collapse = 'React.Collapse',
//   React_Collapse_Panel = 'React.Collapse.Panel',
//   React_Carousel = 'React.Carousel',
//   React_List = 'React.List',
//   React_List_Item = 'React.List.Item',
//   React_List_Item_Meta = 'React.List.Item.Meta',
//   React_Mentions = 'React.Mentions',
//   React_Mentions_Option = 'React.Mentions.Option',
//   React_Layout = 'React.Layout',
//   React_Layout_Header = 'React.Layout.Header',
//   React_Layout_Sider = 'React.Layout.Sider',
//   React_Layout_Content = 'React.Layout.Content',
//   React_Layout_Footer = 'React.Layout.Footer',
//   React_Cascader = 'React.Cascader',
//   React_Popover = 'React.Popover',
//   React_RenderComponent = 'React.RenderComponent',
//   React_RenderContainer = 'React.RenderContainer',
//   /**
//    * Mongoose Model
//    */
//   Model = 'Model',
//   /**
//    * Mongoose Schema
//    */
//   Schema = 'Schema',
//   /**
//    * Non-react tree, requires ID
//    */
//   Tree = 'Tree',
//   /**
//    * Flat array, uses ref to build tree, requires parentRef, childrenRef
//    */
//   Ref = 'Ref',
// }

/**
 * Used with Graphql
 */
export enum NodeType {
  /**
   * React, requires additional `type` key
   */
  'React.Fragment' = 'React.Fragment',
  'React.Html.div' = 'React.Html.div',
  'React.Html.p' = 'React.Html.p',
  'React.Html.a' = 'React.Html.a',
  'React.Html.span' = 'React.Html.span',
  'React.Text' = 'React.Text',
  'React.Icon' = 'React.Icon',
  'React.Menu' = 'React.Menu',
  'React.Menu.Item' = 'React.Menu.Item',
  'React.Menu.ItemGroup' = 'React.Menu.ItemGroup',
  'React.Menu.SubMenu' = 'React.Menu.SubMenu',
  'React.Card' = 'React.Card',
  'React.Card.Grid' = 'React.Card.Grid',
  'React.Card.Meta' = 'React.Card.Meta',
  'React.Typography' = 'React.Typography',
  'React.Typography.Title' = 'React.Typography.Title',
  'React.Typography.Text' = 'React.Typography.Text',
  'React.Typography.Paragraph' = 'React.Typography.Paragraph',
  'React.Alert' = 'React.Alert',
  'React.Affix' = 'React.Affix',
  'React.AutoComplete' = 'React.AutoComplete',
  'React.Button' = 'React.Button',
  'React.Breadcrumb' = 'React.Breadcrumb',
  'React.Breadcrumb.Item' = 'React.Breadcrumb.Item',
  'React.Dropdown' = 'React.Dropdown',
  'React.Form' = 'React.Form',
  'React.Form.Item' = 'React.Form.Item',
  'React.Form.ItemHook' = 'React.Form.ItemHook',
  'React.Form.List' = 'React.Form.List',
  'React.Checkbox' = 'React.Checkbox',
  'React.Input' = 'React.Input',
  'React.InputNumber' = 'React.InputNumber',
  'React.Select' = 'React.Select',
  'React.Select.Option' = 'React.Select.Option',
  'React.Grid' = 'React.Grid',
  'React.ResponsiveGrid' = 'React.ResponsiveGrid',
  'React.Provider' = 'React.Provider',
  'React.Modal' = 'React.Modal',
  'React.Radio.Group' = 'React.Radio.Group',
  'React.Radio' = 'React.Radio',
  'React.Rate' = 'React.Rate',
  'React.Slider' = 'React.Slider',
  'React.Switch' = 'React.Switch',
  'React.Table' = 'React.Table',
  'React.Space' = 'React.Space',
  'React.DatePicker' = 'React.DatePicker',
  'React.Divider' = 'React.Divider',
  'React.Pagination' = 'React.Pagination',
  'React.PageHeader' = 'React.PageHeader',
  'React.Badge' = 'React.Badge',
  'React.Avatar' = 'React.Avatar',
  'React.Comment' = 'React.Comment',
  'React.Calendar' = 'React.Calendar',
  'React.Descriptions' = 'React.Descriptions',
  'React.Descriptions.Item' = 'React.Descriptions.Item',
  'React.Empty' = 'React.Empty',
  'React.Timeline' = 'React.Timeline',
  'React.Timeline.Item' = 'React.Timeline.Item',
  'React.Tabs' = 'React.Tabs',
  'React.Tabs.TabPane' = 'React.Tabs.TabPane',
  'React.Statistic' = 'React.Statistic',
  'React.Tooltip' = 'React.Tooltip',
  'React.Tag' = 'React.Tag',
  'React.Tree' = 'React.Tree',
  'React.Drawer' = 'React.Drawer',
  'React.Progress' = 'React.Progress',
  'React.Result' = 'React.Result',
  'React.Spin' = 'React.Spin',
  'React.Skeleton' = 'React.Skeleton',
  'React.Anchor' = 'React.Anchor',
  'React.Anchor.Link' = 'React.Anchor.Link',
  'React.BackTop' = 'React.BackTop',
  'React.ConfigProvider' = 'React.ConfigProvider',
  'React.Popconfirm' = 'React.Popconfirm',
  'React.Transfer' = 'React.Transfer',
  'React.TreeSelect' = 'React.TreeSelect',
  'React.TreeNode' = 'React.TreeNode',
  'React.TimePicker' = 'React.TimePicker',
  'React.Upload' = 'React.Upload',
  'React.Steps' = 'React.Steps',
  'React.Steps.Step' = 'React.Steps.Step',
  'React.Collapse' = 'React.Collapse',
  'React.Collapse.Panel' = 'React.Collapse.Panel',
  'React.Carousel' = 'React.Carousel',
  'React.List' = 'React.List',
  'React.List.Item' = 'React.List.Item',
  'React.List.Item.Meta' = 'React.List.Item.Meta',
  'React.Mentions' = 'React.Mentions',
  'React.Mentions.Option' = 'React.Mentions.Option',
  'React.Layout' = 'React.Layout',
  'React.Layout.Header' = 'React.Layout.Header',
  'React.Layout.Sider' = 'React.Layout.Sider',
  'React.Layout.Content' = 'React.Layout.Content',
  'React.Layout.Footer' = 'React.Layout.Footer',
  'React.Cascader' = 'React.Cascader',
  'React.Popover' = 'React.Popover',
  'React.RenderComponent' = 'React.RenderComponent',
  'React.RenderContainer' = 'React.RenderContainer',
  'React.Mapper' = 'React.Mapper',
  /**
   * Mongoose Model
   */
  Model = 'Model',
  /**
   * Mongoose Schema
   */
  Schema = 'Schema',
  /**
   * Non-react tree, requires ID
   */
  Tree = 'Tree',
  /**
   * Flat array, uses ref to build tree, requires parentRef, childrenRef
   */
  Ref = 'Ref',
}

/**
 * All possible values
 */
export const nodeTypeLiterals: Array<NodeTypeLiteral> = [
  ...Object.values(NodeType),
]

export type NodeTypeLiteral = keyof typeof NodeType
