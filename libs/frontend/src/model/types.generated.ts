export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
}

export type App = {
  __typename?: 'App'
  id?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export type User = {
  __typename?: 'User'
  accessToken: Scalars['String']
  apps: Array<App>
  email: Scalars['String']
  id?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getPage: Page
  getPages: Array<Page>
  graph: Graph
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGraphArgs = {
  input: GetGraphInput
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addChildNode: Graph
  createApp: App
  createGraph: Graph
  createPage: Page
  deleteApp: App
  deleteNode: Graph
  deletePage: Page
  deleteUser: User
  loginUser: User
  moveNode: Graph
  registerUser: User
  updateApp: App
  updateNode: Graph
  updateUser: User
}

export type MutationAddChildNodeArgs = {
  input: AddChildNodeInput
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationCreateGraphArgs = {
  input: CreateGraphInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationDeleteNodeArgs = {
  input: DeleteNodeInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationMoveNodeArgs = {
  input: MoveNodeInput
}

export type MutationRegisterUserArgs = {
  input: RegisterUserInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationUpdateNodeArgs = {
  input: UpdateNodeInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type CreateAppInput = {
  title: Scalars['String']
}

export type UpdateAppInput = {
  id: Scalars['String']
  title: Scalars['String']
}

export type DeleteAppInput = {
  id: Scalars['String']
}

export type DeleteUserInput = {
  email: Scalars['String']
}

export type UpdateUserInput = {
  email: Scalars['String']
  id: Scalars['String']
}

export type RegisterUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Edge = {
  __typename?: 'Edge'
  id?: Maybe<Scalars['String']>
  source: Scalars['String']
  target: Scalars['String']
  props: Scalars['JSONObject']
  order: Scalars['Float']
}

export type Vertex = {
  __typename?: 'Vertex'
  id?: Maybe<Scalars['String']>
  type: NodeType
  props: Scalars['JSONObject']
}

export enum NodeType {
  ReactFragment = 'React_Fragment',
  ReactHtmlDiv = 'React_Html_Div',
  ReactHtmlP = 'React_Html_P',
  ReactHtmlA = 'React_Html_A',
  ReactHtmlSpan = 'React_Html_Span',
  ReactText = 'React_Text',
  ReactIcon = 'React_Icon',
  ReactMenu = 'React_Menu',
  ReactMenuItem = 'React_Menu_Item',
  ReactMenuItemGroup = 'React_Menu_ItemGroup',
  ReactMenuSubMenu = 'React_Menu_SubMenu',
  ReactCard = 'React_Card',
  ReactCardGrid = 'React_Card_Grid',
  ReactCardMeta = 'React_Card_Meta',
  ReactTypography = 'React_Typography',
  ReactTypographyTitle = 'React_Typography_Title',
  ReactTypographyText = 'React_Typography_Text',
  ReactTypographyParagraph = 'React_Typography_Paragraph',
  ReactAlert = 'React_Alert',
  ReactAffix = 'React_Affix',
  ReactAutoComplete = 'React_AutoComplete',
  ReactButton = 'React_Button',
  ReactBreadcrumb = 'React_Breadcrumb',
  ReactBreadcrumbItem = 'React_Breadcrumb_Item',
  ReactDropdown = 'React_Dropdown',
  ReactForm = 'React_Form',
  ReactFormItem = 'React_Form_Item',
  ReactFormItemHook = 'React_Form_ItemHook',
  ReactFormList = 'React_Form_List',
  ReactCheckbox = 'React_Checkbox',
  ReactInput = 'React_Input',
  ReactInputNumber = 'React_InputNumber',
  ReactSelect = 'React_Select',
  ReactSelectOption = 'React_Select_Option',
  ReactGridLayoutContainer = 'React_Grid_Layout_Container',
  ReactGrid = 'React_Grid',
  ReactResponsiveGrid = 'React_ResponsiveGrid',
  ReactProvider = 'React_Provider',
  ReactModal = 'React_Modal',
  ReactRadioGroup = 'React_Radio_Group',
  ReactRadio = 'React_Radio',
  ReactRate = 'React_Rate',
  ReactSlider = 'React_Slider',
  ReactSwitch = 'React_Switch',
  ReactTable = 'React_Table',
  ReactSpace = 'React_Space',
  ReactDatePicker = 'React_DatePicker',
  ReactDivider = 'React_Divider',
  ReactPagination = 'React_Pagination',
  ReactPageHeader = 'React_PageHeader',
  ReactBadge = 'React_Badge',
  ReactAvatar = 'React_Avatar',
  ReactComment = 'React_Comment',
  ReactCalendar = 'React_Calendar',
  ReactDescriptions = 'React_Descriptions',
  ReactDescriptionsItem = 'React_Descriptions_Item',
  ReactEmpty = 'React_Empty',
  ReactTimeline = 'React_Timeline',
  ReactTimelineItem = 'React_Timeline_Item',
  ReactTabs = 'React_Tabs',
  ReactTabsTabPane = 'React_Tabs_TabPane',
  ReactStatistic = 'React_Statistic',
  ReactTooltip = 'React_Tooltip',
  ReactTag = 'React_Tag',
  ReactTree = 'React_Tree',
  ReactDrawer = 'React_Drawer',
  ReactProgress = 'React_Progress',
  ReactResult = 'React_Result',
  ReactSpin = 'React_Spin',
  ReactSkeleton = 'React_Skeleton',
  ReactAnchor = 'React_Anchor',
  ReactAnchorLink = 'React_Anchor_Link',
  ReactBackTop = 'React_BackTop',
  ReactConfigProvider = 'React_ConfigProvider',
  ReactPopconfirm = 'React_Popconfirm',
  ReactTransfer = 'React_Transfer',
  ReactTreeSelect = 'React_TreeSelect',
  ReactTreeNode = 'React_TreeNode',
  ReactTimePicker = 'React_TimePicker',
  ReactUpload = 'React_Upload',
  ReactSteps = 'React_Steps',
  ReactStepsStep = 'React_Steps_Step',
  ReactCollapse = 'React_Collapse',
  ReactCollapsePanel = 'React_Collapse_Panel',
  ReactCarousel = 'React_Carousel',
  ReactList = 'React_List',
  ReactListItem = 'React_List_Item',
  ReactListItemMeta = 'React_List_Item_Meta',
  ReactMentions = 'React_Mentions',
  ReactMentionsOption = 'React_Mentions_Option',
  ReactLayout = 'React_Layout',
  ReactLayoutHeader = 'React_Layout_Header',
  ReactLayoutSider = 'React_Layout_Sider',
  ReactLayoutContent = 'React_Layout_Content',
  ReactLayoutFooter = 'React_Layout_Footer',
  ReactCascader = 'React_Cascader',
  ReactPopover = 'React_Popover',
  ReactRenderComponent = 'React_RenderComponent',
  ReactRenderContainer = 'React_RenderContainer',
  ReactMapper = 'React_Mapper',
  Tree = 'Tree',
  Ref = 'Ref',
}

export type Graph = {
  __typename?: 'Graph'
  id?: Maybe<Scalars['String']>
  label: Scalars['String']
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export type Page = {
  __typename?: 'Page'
  id?: Maybe<Scalars['String']>
  title: Scalars['String']
}

export type GetGraphInput = {
  graphId?: Maybe<Scalars['String']>
  pageId?: Maybe<Scalars['String']>
}

export type GetPagesInput = {
  appId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type CreateGraphInput = {
  label: Scalars['String']
}

export type AddChildNodeInput = {
  graphId: Scalars['String']
  parentVertexId?: Maybe<Scalars['String']>
  vertex: AddChildNodeVertexType
  order?: Maybe<Scalars['Float']>
}

export type AddChildNodeVertexType = {
  type: NodeType
  props: Scalars['JSONObject']
}

export type UpdateNodeInput = {
  graphId: Scalars['String']
  vertexId: Scalars['String']
  type: UpdateNodeVertexType
}

export type UpdateNodeVertexType = {
  id: Scalars['String']
  type: NodeType
  props: Scalars['JSONObject']
}

export type DeleteNodeInput = {
  vertexId: Scalars['String']
}

export type MoveNodeInput = {
  graphId: Scalars['String']
  type: EdgeType
}

export type EdgeType = {
  source: Scalars['String']
  target: Scalars['String']
}

export type CreatePageInput = {
  title: Scalars['String']
  appId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  pageCreated: Page
}
