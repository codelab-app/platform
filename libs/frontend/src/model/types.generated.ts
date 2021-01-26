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
  email: Scalars['String']
  id?: Maybe<Scalars['String']>
}

export type Edge = {
  __typename?: 'Edge'
  id?: Maybe<Scalars['String']>
  order: Scalars['Float']
  props: Scalars['JSONObject']
  source: Scalars['String']
  target: Scalars['String']
}

export type Vertex = {
  __typename?: 'Vertex'
  id?: Maybe<Scalars['String']>
  props: Scalars['JSONObject']
  type: NodeType
}

export enum NodeType {
  ReactAffix = 'React_Affix',
  ReactAlert = 'React_Alert',
  ReactAnchor = 'React_Anchor',
  ReactAnchorLink = 'React_Anchor_Link',
  ReactAutoComplete = 'React_AutoComplete',
  ReactAvatar = 'React_Avatar',
  ReactBackTop = 'React_BackTop',
  ReactBadge = 'React_Badge',
  ReactBreadcrumb = 'React_Breadcrumb',
  ReactBreadcrumbItem = 'React_Breadcrumb_Item',
  ReactButton = 'React_Button',
  ReactCalendar = 'React_Calendar',
  ReactCard = 'React_Card',
  ReactCardGrid = 'React_Card_Grid',
  ReactCardMeta = 'React_Card_Meta',
  ReactCarousel = 'React_Carousel',
  ReactCascader = 'React_Cascader',
  ReactCheckbox = 'React_Checkbox',
  ReactCollapse = 'React_Collapse',
  ReactCollapsePanel = 'React_Collapse_Panel',
  ReactComment = 'React_Comment',
  ReactConfigProvider = 'React_ConfigProvider',
  ReactDatePicker = 'React_DatePicker',
  ReactDescriptions = 'React_Descriptions',
  ReactDescriptionsItem = 'React_Descriptions_Item',
  ReactDivider = 'React_Divider',
  ReactDrawer = 'React_Drawer',
  ReactDropdown = 'React_Dropdown',
  ReactEmpty = 'React_Empty',
  ReactForm = 'React_Form',
  ReactFormItem = 'React_Form_Item',
  ReactFormItemHook = 'React_Form_ItemHook',
  ReactFormList = 'React_Form_List',
  ReactFragment = 'React_Fragment',
  ReactGrid = 'React_Grid',
  ReactGridLayoutContainer = 'React_Grid_Layout_Container',
  ReactHtmlA = 'React_Html_A',
  ReactHtmlDiv = 'React_Html_Div',
  ReactHtmlP = 'React_Html_P',
  ReactHtmlSpan = 'React_Html_Span',
  ReactIcon = 'React_Icon',
  ReactInput = 'React_Input',
  ReactInputNumber = 'React_InputNumber',
  ReactLayout = 'React_Layout',
  ReactLayoutContent = 'React_Layout_Content',
  ReactLayoutFooter = 'React_Layout_Footer',
  ReactLayoutHeader = 'React_Layout_Header',
  ReactLayoutSider = 'React_Layout_Sider',
  ReactList = 'React_List',
  ReactListItem = 'React_List_Item',
  ReactListItemMeta = 'React_List_Item_Meta',
  ReactMapper = 'React_Mapper',
  ReactMentions = 'React_Mentions',
  ReactMentionsOption = 'React_Mentions_Option',
  ReactMenu = 'React_Menu',
  ReactMenuItem = 'React_Menu_Item',
  ReactMenuItemGroup = 'React_Menu_ItemGroup',
  ReactMenuSubMenu = 'React_Menu_SubMenu',
  ReactModal = 'React_Modal',
  ReactPageHeader = 'React_PageHeader',
  ReactPagination = 'React_Pagination',
  ReactPopconfirm = 'React_Popconfirm',
  ReactPopover = 'React_Popover',
  ReactProgress = 'React_Progress',
  ReactProvider = 'React_Provider',
  ReactRadio = 'React_Radio',
  ReactRadioGroup = 'React_Radio_Group',
  ReactRate = 'React_Rate',
  ReactRenderComponent = 'React_RenderComponent',
  ReactRenderContainer = 'React_RenderContainer',
  ReactResponsiveGrid = 'React_ResponsiveGrid',
  ReactResult = 'React_Result',
  ReactSelect = 'React_Select',
  ReactSelectOption = 'React_Select_Option',
  ReactSkeleton = 'React_Skeleton',
  ReactSlider = 'React_Slider',
  ReactSpace = 'React_Space',
  ReactSpin = 'React_Spin',
  ReactStatistic = 'React_Statistic',
  ReactSteps = 'React_Steps',
  ReactStepsStep = 'React_Steps_Step',
  ReactSwitch = 'React_Switch',
  ReactTable = 'React_Table',
  ReactTabs = 'React_Tabs',
  ReactTabsTabPane = 'React_Tabs_TabPane',
  ReactTag = 'React_Tag',
  ReactText = 'React_Text',
  ReactTimePicker = 'React_TimePicker',
  ReactTimeline = 'React_Timeline',
  ReactTimelineItem = 'React_Timeline_Item',
  ReactTooltip = 'React_Tooltip',
  ReactTransfer = 'React_Transfer',
  ReactTree = 'React_Tree',
  ReactTreeNode = 'React_TreeNode',
  ReactTreeSelect = 'React_TreeSelect',
  ReactTypography = 'React_Typography',
  ReactTypographyParagraph = 'React_Typography_Paragraph',
  ReactTypographyText = 'React_Typography_Text',
  ReactTypographyTitle = 'React_Typography_Title',
  ReactUpload = 'React_Upload',
  Ref = 'Ref',
  Tree = 'Tree',
}

export type Graph = {
  __typename?: 'Graph'
  edges: Array<Edge>
  id?: Maybe<Scalars['String']>
  label: Scalars['String']
  vertices: Array<Vertex>
}

export type Page = {
  __typename?: 'Page'
  id?: Maybe<Scalars['String']>
  title: Scalars['String']
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

export type CreateGraphInput = {
  label: Scalars['String']
}

export type AddChildNodeInput = {
  graphId: Scalars['String']
  order?: Maybe<Scalars['Float']>
  parentVertexId?: Maybe<Scalars['String']>
  vertex: AddChildNodeVertexType
}

export type AddChildNodeVertexType = {
  props: Scalars['JSONObject']
  type: NodeType
}

export type UpdateNodeInput = {
  graphId: Scalars['String']
  type: UpdateNodeVertexType
  vertexId: Scalars['String']
}

export type UpdateNodeVertexType = {
  id: Scalars['String']
  props: Scalars['JSONObject']
  type: NodeType
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
  appId: Scalars['String']
  title: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  pageCreated: Page
}
