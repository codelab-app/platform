/*
  Warnings:

  - The migration will remove the values [React_ResponsiveGridLayout,React_GridLayout] on the enum `VertexType`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VertexType_new" AS ENUM ('React_Fragment', 'React_Html_Div', 'React_Html_P', 'React_Html_A', 'React_Html_Span', 'React_Text', 'React_Icon', 'React_Menu', 'React_Menu_Item', 'React_Menu_ItemGroup', 'React_Menu_SubMenu', 'React_Card', 'React_Card_Grid', 'React_Card_Meta', 'React_Typography', 'React_Typography_Title', 'React_Typography_Text', 'React_Typography_Paragraph', 'React_Alert', 'React_Affix', 'React_AutoComplete', 'React_Button', 'React_Breadcrumb', 'React_Breadcrumb_Item', 'React_Dropdown', 'React_Form', 'React_Form_Item', 'React_Form_ItemHook', 'React_Form_List', 'React_Checkbox', 'React_Input', 'React_InputNumber', 'React_Select', 'React_Select_Option', 'React_Grid_ResponsiveLayout', 'React_Grid_Layout', 'React_Grid', 'React_Provider', 'React_Modal', 'React_Radio_Group', 'React_Radio', 'React_Rate', 'React_Slider', 'React_Switch', 'React_Table', 'React_Space', 'React_DatePicker', 'React_Divider', 'React_Pagination', 'React_PageHeader', 'React_Badge', 'React_Avatar', 'React_Comment', 'React_Calendar', 'React_Descriptions', 'React_Descriptions_Item', 'React_Empty', 'React_Timeline', 'React_Timeline_Item', 'React_Tabs', 'React_Tabs_TabPane', 'React_Statistic', 'React_Tooltip', 'React_Tag', 'React_Tree', 'React_Drawer', 'React_Progress', 'React_Result', 'React_Spin', 'React_Skeleton', 'React_Anchor', 'React_Anchor_Link', 'React_BackTop', 'React_ConfigProvider', 'React_Popconfirm', 'React_Transfer', 'React_TreeSelect', 'React_TreeNode', 'React_TimePicker', 'React_Upload', 'React_Steps', 'React_Steps_Step', 'React_Collapse', 'React_Collapse_Panel', 'React_Carousel', 'React_List', 'React_List_Item', 'React_List_Item_Meta', 'React_Mentions', 'React_Mentions_Option', 'React_Layout', 'React_Layout_Header', 'React_Layout_Sider', 'React_Layout_Content', 'React_Layout_Footer', 'React_Cascader', 'React_Popover', 'React_RenderComponent', 'React_RenderContainer', 'React_Mapper');
ALTER TABLE "public"."Vertex" ALTER COLUMN "type" TYPE "VertexType_new" USING ("type"::text::"VertexType_new");
ALTER TYPE "VertexType" RENAME TO "VertexType_old";
ALTER TYPE "VertexType_new" RENAME TO "VertexType";
DROP TYPE "VertexType_old";
COMMIT;
