const atoms = [
  { label: 'Affix', type: 'React_Affix' },
  { label: 'Alert', type: 'React_Alert' },
  { label: 'Anchor', type: 'React_Anchor' },
  { label: 'Anchor Link', type: 'React_Anchor_Link' },
  { label: 'Autocomplete', type: 'React_AutoComplete' },
  { label: 'Avatar', type: 'React_Avatar' },
  { label: 'Backtop', type: 'React_BackTop' },
  { label: 'Badge', type: 'React_Badge' },
  { label: 'Breadcrumb', type: 'React_Breadcrumb' },
  { label: 'Breadcrumb Item', type: 'React_Breadcrumb_Item' },
  { label: 'Button', type: 'React_Button' },
  { label: 'Calendar', type: 'React_Calendar' },
  { label: 'Card', type: 'React_Card' },
  { label: 'Card Grid', type: 'React_Card_Grid' },
  { label: 'Card Meta', type: 'React_Card_Meta' },
  { label: 'Carousel', type: 'React_Carousel' },
  { label: 'Cascader', type: 'React_Cascader' },
  { label: 'Checkbox', type: 'React_Checkbox' },
  { label: 'Collapse', type: 'React_Collapse' },
  { label: 'Collapse_Panel', type: 'React_Collapse_Panel' },
  { label: 'Comment', type: 'React_Comment' },
  { label: 'ConfigProvider', type: 'React_ConfigProvider' },
  { label: 'DatePicker', type: 'React_DatePicker' },
  { label: 'Descriptions', type: 'React_Descriptions' },
  { label: 'Descriptions Item', type: 'React_Descriptions_Item' },
  { label: 'Divider', type: 'React_Divider' },
  { label: 'Drawer', type: 'React_Drawer' },
  { label: 'Dropdown', type: 'React_Dropdown' },
  { label: 'Empty', type: 'React_Empty' },
  { label: 'Form', type: 'React_Form' },
  { label: 'Form Item', type: 'React_Form_Item' },
  { label: 'Form ItemHook', type: 'React_Form_ItemHook' },
  { label: 'Form List', type: 'React_Form_List' },
  { label: 'Fragment', type: 'React_Fragment' },
  { label: 'Grid Col', type: 'React_Grid_Col' },
  { label: 'Grid Row', type: 'React_Grid_Row' },
  { label: 'Html A', type: 'React_Html_A' },
  { label: 'Html Div', type: 'React_Html_Div' },
  { label: 'Html P', type: 'React_Html_P' },
  { label: 'Html Span', type: 'React_Html_Span' },
  { label: 'Icon', type: 'React_Icon' },
  { label: 'Input', type: 'React_Input' },
  { label: 'InputNumber', type: 'React_InputNumber' },
  { label: 'Layout', type: 'React_Layout' },
  { label: 'Layout Content', type: 'React_Layout_Content' },
  { label: 'Layout Footer', type: 'React_Layout_Footer' },
  { label: 'Layout Header', type: 'React_Layout_Header' },
  { label: 'Layout Sider', type: 'React_Layout_Sider' },
  { label: 'List', type: 'React_List' },
  { label: 'List Item', type: 'React_List_Item' },
  { label: 'List Item Meta', type: 'React_List_Item_Meta' },
  { label: 'Mapper', type: 'React_Mapper' },
  { label: 'Mentions', type: 'React_Mentions' },
  { label: 'Mentions Option', type: 'React_Mentions_Option' },
  { label: 'Menu', type: 'React_Menu' },
  { label: 'Menu Item', type: 'React_Menu_Item' },
  { label: 'Menu ItemGroup', type: 'React_Menu_ItemGroup' },
  { label: 'Menu SubMenu', type: 'React_Menu_SubMenu' },
  { label: 'Modal', type: 'React_Modal' },
  { label: 'PageHeader', type: 'React_PageHeader' },
  { label: 'Page Container', type: 'React_Page_Container' },
  { label: 'Pagination', type: 'React_Pagination' },
  { label: 'Popconfirm', type: 'React_Popconfirm' },
  { label: 'Popover', type: 'React_Popover' },
  { label: 'Progress', type: 'React_Progress' },
  { label: 'Provider', type: 'React_Provider' },
  { label: 'RGL Container', type: 'React_RGL_Container' },
  { label: 'RGL Item', type: 'React_RGL_Item' },
  { label: 'RGL ResponsiveContainer', type: 'React_RGL_ResponsiveContainer' },
  { label: 'Radio', type: 'React_Radio' },
  { label: 'Radio Group', type: 'React_Radio_Group' },
  { label: 'Rate', type: 'React_Rate' },
  { label: 'RenderComponent', type: 'React_RenderComponent' },
  { label: 'RenderContainer', type: 'React_RenderContainer' },
  { label: 'Result', type: 'React_Result' },
  { label: 'Select', type: 'React_Select' },
  { label: 'Select Option', type: 'React_Select_Option' },
  { label: 'Skeleton', type: 'React_Skeleton' },
  { label: 'Slider', type: 'React_Slider' },
  { label: 'Space', type: 'React_Space' },
  { label: 'Spin', type: 'React_Spin' },
  { label: 'Statistic', type: 'React_Statistic' },
  { label: 'Steps', type: 'React_Steps' },
  { label: 'Steps Step', type: 'React_Steps_Step' },
  { label: 'Switch', type: 'React_Switch' },
  { label: 'Table', type: 'React_Table' },
  { label: 'Tabs', type: 'React_Tabs' },
  { label: 'Tabs TabPane', type: 'React_Tabs_TabPane' },
  { label: 'Tag', type: 'React_Tag' },
  { label: 'Text', type: 'React_Text' },
  { label: 'TimePicker', type: 'React_TimePicker' },
  { label: 'Timeline', type: 'React_Timeline' },
  { label: 'Timeline Item', type: 'React_Timeline_Item' },
  { label: 'Tooltip', type: 'React_Tooltip' },
  { label: 'Transfer', type: 'React_Transfer' },
  { label: 'Tree', type: 'React_Tree' },
  { label: 'TreeNode', type: 'React_TreeNode' },
  { label: 'TreeSelect', type: 'React_TreeSelect' },
  { label: 'Typography', type: 'React_Typography' },
  { label: 'Typography Paragraph', type: 'React_Typography_Paragraph' },
  { label: 'Typography Text', type: 'React_Typography_Text' },
  { label: 'Typography Title', type: 'React_Typography_Title' },
  { label: 'Upload', type: 'React_Upload' },
]

module.exports = `
  _:adminUser <User.email> "admin@codelab.ai" .
  _:adminUser <dgraph.type> "User" .
  _:adminUser <User.libraries> _:antdlib .
  
  _:antdlib <Library.owner> _:adminUser .
  _:antdlib <Library.name> "Ant design Library" .
  _:antdlib <dgraph.type> "Library" .
  
  ${atoms.reduce(
    (prev, atom, n) =>
      prev +
      `

      _:atom${n} <Atom.library> _:antdlib .
      _:atom${n} <dgraph.type> "Atom" .
      _:atom${n} <Atom.label> "${atom.label}" .
      _:atom${n} <Atom.type> "${atom.type}" .
      
      _:antdlib <Library.atoms> _:atom${n} .

  `,
    '',
  )}
`
