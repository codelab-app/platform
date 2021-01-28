import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

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

export type Edge = {
  __typename?: 'Edge'
  id: Scalars['String']
  source: Scalars['String']
  target: Scalars['String']
  props: Scalars['JSONObject']
  order: Scalars['Float']
}

export type Vertex = {
  __typename?: 'Vertex'
  id: Scalars['String']
  type: NodeType
  props?: Maybe<Scalars['JSONObject']>
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
  id: Scalars['String']
  label: Scalars['String']
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['String']
  title: Scalars['String']
  graphs: Array<Graph>
}

export type App = {
  __typename?: 'App'
  id: Scalars['String']
  title: Scalars['String']
  pages: Array<Page>
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  email: Scalars['String']
  accessToken: Scalars['String']
  apps: Array<App>
}

export type Query = {
  __typename?: 'Query'
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getGraph: Graph
  getGraphBy: Graph
  getPages: Array<Page>
  getPage: Page
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetGraphArgs = {
  input: GetGraphInput
}

export type QueryGetGraphByArgs = {
  input: GetGraphByInput
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type GetGraphInput = {
  id?: Maybe<Scalars['String']>
}

export type GetGraphByInput = {
  appId?: Maybe<Scalars['String']>
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
  createApp: App
  updateApp: App
  deleteApp: App
  deleteUser: User
  updateUser: User
  registerUser: User
  loginUser: User
  createGraph: Graph
  addChildNode: Graph
  updateNode: Graph
  deleteNode: Graph
  moveNode: Graph
  createPage: Page
  deletePage: Page
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationRegisterUserArgs = {
  input: RegisterUserInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationCreateGraphArgs = {
  input: CreateGraphInput
}

export type MutationAddChildNodeArgs = {
  input: AddChildNodeInput
}

export type MutationUpdateNodeArgs = {
  input: UpdateNodeInput
}

export type MutationDeleteNodeArgs = {
  input: DeleteNodeInput
}

export type MutationMoveNodeArgs = {
  input: MoveNodeInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
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
  id: Scalars['String']
  email: Scalars['String']
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
  parentVertexId?: Maybe<Scalars['String']>
  vertex: CreateVertexInput
  order?: Maybe<Scalars['Float']>
  props?: Maybe<Scalars['JSONObject']>
}

export type CreateVertexInput = {
  type: NodeType
  props: Scalars['JSONObject']
}

export type UpdateNodeInput = {
  graphId: Scalars['String']
  vertexId: Scalars['String']
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
  title: Scalars['String']
  appId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type AppFragmentsFragment = { __typename?: 'App' } & Pick<
  App,
  'id' | 'title'
> & { pages: Array<{ __typename?: 'Page' } & PageFragmentsFragment> }

export type EdgeFragmentsFragment = { __typename?: 'Edge' } & Pick<Edge, 'id'>

export type GraphFragmentsFragment = { __typename?: 'Graph' } & Pick<
  Graph,
  'id' | 'label'
> & {
    vertices: Array<{ __typename?: 'Vertex' } & VertexFragmentsFragment>
    edges: Array<{ __typename?: 'Edge' } & EdgeFragmentsFragment>
  }

export type VertexFragmentsFragment = { __typename?: 'Vertex' } & Pick<
  Vertex,
  'id' | 'type'
>

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput
}>

export type CreatePageMutation = { __typename?: 'Mutation' } & {
  createPage: { __typename?: 'Page' } & PageFragmentsFragment
}

export type PageFragmentsFragment = { __typename?: 'Page' } & Pick<
  Page,
  'id' | 'title'
> & { graphs: Array<{ __typename?: 'Graph' } & GraphFragmentsFragment> }

export type UserFragmentsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email'
> & { apps: Array<{ __typename?: 'App' } & AppFragmentsFragment> }

export const VertexFragments = gql`
  fragment vertexFragments on Vertex {
    id
    type
  }
`
export const EdgeFragments = gql`
  fragment edgeFragments on Edge {
    id
  }
`
export const GraphFragments = gql`
  fragment graphFragments on Graph {
    id
    label
    vertices {
      ...vertexFragments
    }
    edges {
      ...edgeFragments
    }
  }
  ${VertexFragments}
  ${EdgeFragments}
`
export const PageFragments = gql`
  fragment pageFragments on Page {
    id
    title
    graphs {
      ...graphFragments
    }
  }
  ${GraphFragments}
`
export const AppFragments = gql`
  fragment appFragments on App {
    id
    title
    pages {
      ...pageFragments
    }
  }
  ${PageFragments}
`
export const UserFragments = gql`
  fragment userFragments on User {
    id
    email
    apps {
      ...appFragments
    }
  }
  ${AppFragments}
`
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...pageFragments
    }
  }
  ${PageFragments}
`
export const VertexFragmentsFragmentDoc = gql`
  fragment vertexFragments on Vertex {
    id
    type
  }
`
export const EdgeFragmentsFragmentDoc = gql`
  fragment edgeFragments on Edge {
    id
  }
`
export const GraphFragmentsFragmentDoc = gql`
  fragment graphFragments on Graph {
    id
    label
    vertices {
      ...vertexFragments
    }
    edges {
      ...edgeFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
  ${EdgeFragmentsFragmentDoc}
`
export const PageFragmentsFragmentDoc = gql`
  fragment pageFragments on Page {
    id
    title
    graphs {
      ...graphFragments
    }
  }
  ${GraphFragmentsFragmentDoc}
`
export const AppFragmentsFragmentDoc = gql`
  fragment appFragments on App {
    id
    title
    pages {
      ...pageFragments
    }
  }
  ${PageFragmentsFragmentDoc}
`
export const UserFragmentsFragmentDoc = gql`
  fragment userFragments on User {
    id
    email
    apps {
      ...appFragments
    }
  }
  ${AppFragmentsFragmentDoc}
`
export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...pageFragments
    }
  }
  ${PageFragmentsFragmentDoc}
`
export type CreatePageMutationFn = Apollo.MutationFunction<
  CreatePageMutation,
  CreatePageMutationVariables
>

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageMutation,
    CreatePageMutationVariables
  >,
) {
  return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(
    CreatePageGql,
    baseOptions,
  )
}
export type CreatePageMutationHookResult = ReturnType<
  typeof useCreatePageMutation
>
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  CreatePageMutation,
  CreatePageMutationVariables
>
