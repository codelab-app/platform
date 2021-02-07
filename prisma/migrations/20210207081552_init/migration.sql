-- CreateEnum
CREATE TYPE "VertexType" AS ENUM ('React_Fragment', 'React_Html_Div', 'React_Html_P', 'React_Html_A', 'React_Html_Span', 'React_Text', 'React_Icon', 'React_Menu', 'React_Menu_Item', 'React_Menu_ItemGroup', 'React_Menu_SubMenu', 'React_Card', 'React_Card_Grid', 'React_Card_Meta', 'React_Typography', 'React_Typography_Title', 'React_Typography_Text', 'React_Typography_Paragraph', 'React_Alert', 'React_Affix', 'React_AutoComplete', 'React_Button', 'React_Breadcrumb', 'React_Breadcrumb_Item', 'React_Dropdown', 'React_Form', 'React_Form_Item', 'React_Form_ItemHook', 'React_Form_List', 'React_Checkbox', 'React_Input', 'React_InputNumber', 'React_Select', 'React_Select_Option', 'React_RGL_ResponsiveContainer', 'React_RGL_Container', 'React_RGL_Item', 'React_Provider', 'React_Modal', 'React_Radio_Group', 'React_Radio', 'React_Rate', 'React_Slider', 'React_Switch', 'React_Table', 'React_Space', 'React_DatePicker', 'React_Divider', 'React_Pagination', 'React_PageHeader', 'React_Badge', 'React_Avatar', 'React_Comment', 'React_Calendar', 'React_Descriptions', 'React_Descriptions_Item', 'React_Empty', 'React_Timeline', 'React_Timeline_Item', 'React_Tabs', 'React_Tabs_TabPane', 'React_Statistic', 'React_Tooltip', 'React_Tag', 'React_Tree', 'React_Drawer', 'React_Progress', 'React_Result', 'React_Spin', 'React_Skeleton', 'React_Anchor', 'React_Anchor_Link', 'React_BackTop', 'React_ConfigProvider', 'React_Popconfirm', 'React_Transfer', 'React_TreeSelect', 'React_TreeNode', 'React_TimePicker', 'React_Upload', 'React_Steps', 'React_Steps_Step', 'React_Collapse', 'React_Collapse_Panel', 'React_Carousel', 'React_List', 'React_List_Item', 'React_List_Item_Meta', 'React_Mentions', 'React_Mentions_Option', 'React_Layout', 'React_Layout_Header', 'React_Layout_Sider', 'React_Layout_Content', 'React_Layout_Footer', 'React_Cascader', 'React_Popover', 'React_RenderComponent', 'React_RenderContainer', 'React_Mapper');

-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('Vertex', 'Graph');

-- CreateEnum
CREATE TYPE "GraphType" AS ENUM ('Layout', 'Component');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graph" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "GraphType",
    "props" JSONB NOT NULL DEFAULT '{}',
    "appId" TEXT,
    "pageId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vertex" (
    "id" TEXT NOT NULL,
    "type" "VertexType",
    "props" JSONB NOT NULL DEFAULT '{}',
    "graphId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "type" "EdgeType",
    "order" INTEGER NOT NULL DEFAULT 0,
    "props" JSONB NOT NULL DEFAULT '{}',
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "graphId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Edge.target_unique" ON "Edge"("target");

-- AddForeignKey
ALTER TABLE "App" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graph" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graph" ADD FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vertex" ADD FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;
