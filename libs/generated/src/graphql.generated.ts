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

export type CreateAppMutationVariables = Exact<{
  input: CreateAppInput
}>

export type CreateAppMutation = { __typename?: 'Mutation' } & {
  createApp: { __typename?: 'App' } & Pick<App, 'id' | 'title'>
}

export type DeleteAppMutationVariables = Exact<{
  input: DeleteAppInput
}>

export type DeleteAppMutation = { __typename?: 'Mutation' } & {
  deleteApp: { __typename?: 'App' } & Pick<App, 'id' | 'title'>
}

export type GetAppQueryVariables = Exact<{
  input: GetAppInput
}>

export type GetAppQuery = { __typename?: 'Query' } & {
  getApp?: Maybe<{ __typename?: 'App' } & Pick<App, 'id' | 'title'>>
}

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { __typename?: 'Query' } & {
  getApps: Array<{ __typename?: 'App' } & Pick<App, 'title'>>
}

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { __typename?: 'Mutation' } & {
  updateApp: { __typename?: 'App' } & Pick<App, 'id' | 'title'>
}

export type AppFragmentsFragment = { __typename?: 'App' } & Pick<
  App,
  'id' | 'title'
> & { pages: Array<{ __typename?: 'Page' } & PageFragmentsFragment> }

export type AddChildNodeMutationVariables = Exact<{
  input: AddChildNodeInput
}>

export type AddChildNodeMutation = { __typename?: 'Mutation' } & {
  addChildNode: { __typename?: 'Graph' } & Pick<Graph, 'label'> & {
      vertices: Array<
        { __typename?: 'Vertex' } & Pick<Vertex, 'id' | 'type' | 'props'>
      >
      edges: Array<
        { __typename?: 'Edge' } & Pick<
          Edge,
          'id' | 'order' | 'source' | 'target' | 'props'
        >
      >
    }
}

export type CreateGraphMutationVariables = Exact<{
  input: CreateGraphInput
}>

export type CreateGraphMutation = { __typename?: 'Mutation' } & {
  createGraph: { __typename?: 'Graph' } & Pick<Graph, 'id' | 'label'>
}

export type DeleteNodeMutationVariables = Exact<{
  input: DeleteNodeInput
}>

export type DeleteNodeMutation = { __typename?: 'Mutation' } & {
  deleteNode: { __typename?: 'Graph' } & Pick<Graph, 'label'> & {
      vertices: Array<
        { __typename?: 'Vertex' } & Pick<Vertex, 'id' | 'type' | 'props'>
      >
      edges: Array<
        { __typename?: 'Edge' } & Pick<
          Edge,
          'source' | 'target' | 'order' | 'props'
        >
      >
    }
}

export type GetGraphQueryVariables = Exact<{
  input: GetGraphInput
}>

export type GetGraphQuery = { __typename?: 'Query' } & {
  getGraph: { __typename?: 'Graph' } & Pick<Graph, 'id' | 'label'>
}

export type MoveNodeMutationVariables = Exact<{
  input: MoveNodeInput
}>

export type MoveNodeMutation = { __typename?: 'Mutation' } & {
  moveNode: { __typename?: 'Graph' } & Pick<Graph, 'id' | 'label'> & {
      edges: Array<
        { __typename?: 'Edge' } & Pick<
          Edge,
          'order' | 'source' | 'target' | 'props'
        >
      >
    }
}

export type UpdateNodeMutationVariables = Exact<{
  input: UpdateNodeInput
}>

export type UpdateNodeMutation = { __typename?: 'Mutation' } & {
  updateNode: { __typename?: 'Graph' } & Pick<Graph, 'label'> & {
      vertices: Array<
        { __typename?: 'Vertex' } & Pick<Vertex, 'id' | 'type' | 'props'>
      >
    }
}

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

export type DeletePageMutationVariables = Exact<{
  input: DeletePageInput
}>

export type DeletePageMutation = { __typename?: 'Mutation' } & {
  deletePage: { __typename?: 'Page' } & Pick<Page, 'title'>
}

export type GetPageQueryVariables = Exact<{
  input: GetPageInput
}>

export type GetPageQuery = { __typename?: 'Query' } & {
  getPage: { __typename?: 'Page' } & Pick<Page, 'title'>
}

export type GetPagesQueryVariables = Exact<{
  input: GetPagesInput
}>

export type GetPagesQuery = { __typename?: 'Query' } & {
  getPages: Array<{ __typename?: 'Page' } & Pick<Page, 'id' | 'title'>>
}

export type PageFragmentsFragment = { __typename?: 'Page' } & Pick<
  Page,
  'id' | 'title'
> & { graphs: Array<{ __typename?: 'Graph' } & GraphFragmentsFragment> }

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = { __typename?: 'Query' } & {
  getMe: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
}

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput
}>

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  loginUser: { __typename?: 'User' } & Pick<User, 'email' | 'accessToken'>
}

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput
}>

export type RegisterUserMutation = { __typename?: 'Mutation' } & {
  registerUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'accessToken'
  >
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<User, 'email'>
}

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
export const CreateApp = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
      title
    }
  }
`
export const DeleteApp = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
      title
    }
  }
`
export const GetApp = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      id
      title
    }
  }
`
export const GetApps = gql`
  query GetApps {
    getApps {
      title
    }
  }
`
export const UpdateApp = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      id
      title
    }
  }
`
export const AddChildNode = gql`
  mutation AddChildNode($input: AddChildNodeInput!) {
    addChildNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
      edges {
        id
        order
        source
        target
        props
      }
    }
  }
`
export const CreateGraph = gql`
  mutation CreateGraph($input: CreateGraphInput!) {
    createGraph(input: $input) {
      id
      label
    }
  }
`
export const DeleteNode = gql`
  mutation DeleteNode($input: DeleteNodeInput!) {
    deleteNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
      edges {
        source
        target
        order
        props
      }
    }
  }
`
export const GetGraph = gql`
  query GetGraph($input: GetGraphInput!) {
    getGraph(input: $input) {
      id
      label
    }
  }
`
export const MoveNode = gql`
  mutation MoveNode($input: MoveNodeInput!) {
    moveNode(input: $input) {
      id
      label
      edges {
        order
        source
        target
        props
      }
    }
  }
`
export const UpdateNode = gql`
  mutation UpdateNode($input: UpdateNodeInput!) {
    updateNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
    }
  }
`
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...pageFragments
    }
  }
  ${PageFragments}
`
export const DeletePage = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      title
    }
  }
`
export const GetPage = gql`
  query GetPage($input: GetPageInput!) {
    getPage(input: $input) {
      title
    }
  }
`
export const GetPages = gql`
  query GetPages($input: GetPagesInput!) {
    getPages(input: $input) {
      id
      title
    }
  }
`
export const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      email
    }
  }
`
export const GetMe = gql`
  query GetMe {
    getMe {
      id
      email
    }
  }
`
export const LoginUser = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      accessToken
    }
  }
`
export const RegisterUser = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
      accessToken
    }
  }
`
export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
    }
  }
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
export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
      title
    }
  }
`
export type CreateAppMutationFn = Apollo.MutationFunction<
  CreateAppMutation,
  CreateAppMutationVariables
>

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAppMutation,
    CreateAppMutationVariables
  >,
) {
  return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(
    CreateAppGql,
    baseOptions,
  )
}
export type CreateAppMutationHookResult = ReturnType<
  typeof useCreateAppMutation
>
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<
  CreateAppMutation,
  CreateAppMutationVariables
>
export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
      title
    }
  }
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  DeleteAppMutation,
  DeleteAppMutationVariables
>

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppGql,
    baseOptions,
  )
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  DeleteAppMutation,
  DeleteAppMutationVariables
>
export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      id
      title
    }
  }
`

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppGql,
    baseOptions,
  )
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppGql,
    baseOptions,
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export const GetAppsGql = gql`
  query GetApps {
    getApps {
      title
    }
  }
`

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>,
) {
  return Apollo.useQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    baseOptions,
  )
}
export function useGetAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsQuery,
    GetAppsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    baseOptions,
  )
}
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>
export type GetAppsQueryResult = Apollo.QueryResult<
  GetAppsQuery,
  GetAppsQueryVariables
>
export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      id
      title
    }
  }
`
export type UpdateAppMutationFn = Apollo.MutationFunction<
  UpdateAppMutation,
  UpdateAppMutationVariables
>

/**
 * __useUpdateAppMutation__
 *
 * To run a mutation, you first call `useUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppMutation, { data, loading, error }] = useUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAppMutation,
    UpdateAppMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(
    UpdateAppGql,
    baseOptions,
  )
}
export type UpdateAppMutationHookResult = ReturnType<
  typeof useUpdateAppMutation
>
export type UpdateAppMutationResult = Apollo.MutationResult<UpdateAppMutation>
export type UpdateAppMutationOptions = Apollo.BaseMutationOptions<
  UpdateAppMutation,
  UpdateAppMutationVariables
>
export const AddChildNodeGql = gql`
  mutation AddChildNode($input: AddChildNodeInput!) {
    addChildNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
      edges {
        id
        order
        source
        target
        props
      }
    }
  }
`
export type AddChildNodeMutationFn = Apollo.MutationFunction<
  AddChildNodeMutation,
  AddChildNodeMutationVariables
>

/**
 * __useAddChildNodeMutation__
 *
 * To run a mutation, you first call `useAddChildNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChildNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChildNodeMutation, { data, loading, error }] = useAddChildNodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddChildNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddChildNodeMutation,
    AddChildNodeMutationVariables
  >,
) {
  return Apollo.useMutation<
    AddChildNodeMutation,
    AddChildNodeMutationVariables
  >(AddChildNodeGql, baseOptions)
}
export type AddChildNodeMutationHookResult = ReturnType<
  typeof useAddChildNodeMutation
>
export type AddChildNodeMutationResult = Apollo.MutationResult<AddChildNodeMutation>
export type AddChildNodeMutationOptions = Apollo.BaseMutationOptions<
  AddChildNodeMutation,
  AddChildNodeMutationVariables
>
export const CreateGraphGql = gql`
  mutation CreateGraph($input: CreateGraphInput!) {
    createGraph(input: $input) {
      id
      label
    }
  }
`
export type CreateGraphMutationFn = Apollo.MutationFunction<
  CreateGraphMutation,
  CreateGraphMutationVariables
>

/**
 * __useCreateGraphMutation__
 *
 * To run a mutation, you first call `useCreateGraphMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGraphMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGraphMutation, { data, loading, error }] = useCreateGraphMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGraphMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGraphMutation,
    CreateGraphMutationVariables
  >,
) {
  return Apollo.useMutation<CreateGraphMutation, CreateGraphMutationVariables>(
    CreateGraphGql,
    baseOptions,
  )
}
export type CreateGraphMutationHookResult = ReturnType<
  typeof useCreateGraphMutation
>
export type CreateGraphMutationResult = Apollo.MutationResult<CreateGraphMutation>
export type CreateGraphMutationOptions = Apollo.BaseMutationOptions<
  CreateGraphMutation,
  CreateGraphMutationVariables
>
export const DeleteNodeGql = gql`
  mutation DeleteNode($input: DeleteNodeInput!) {
    deleteNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
      edges {
        source
        target
        order
        props
      }
    }
  }
`
export type DeleteNodeMutationFn = Apollo.MutationFunction<
  DeleteNodeMutation,
  DeleteNodeMutationVariables
>

/**
 * __useDeleteNodeMutation__
 *
 * To run a mutation, you first call `useDeleteNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNodeMutation, { data, loading, error }] = useDeleteNodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNodeMutation,
    DeleteNodeMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteNodeMutation, DeleteNodeMutationVariables>(
    DeleteNodeGql,
    baseOptions,
  )
}
export type DeleteNodeMutationHookResult = ReturnType<
  typeof useDeleteNodeMutation
>
export type DeleteNodeMutationResult = Apollo.MutationResult<DeleteNodeMutation>
export type DeleteNodeMutationOptions = Apollo.BaseMutationOptions<
  DeleteNodeMutation,
  DeleteNodeMutationVariables
>
export const GetGraphGql = gql`
  query GetGraph($input: GetGraphInput!) {
    getGraph(input: $input) {
      id
      label
    }
  }
`

/**
 * __useGetGraphQuery__
 *
 * To run a query within a React component, call `useGetGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetGraphQuery(
  baseOptions: Apollo.QueryHookOptions<GetGraphQuery, GetGraphQueryVariables>,
) {
  return Apollo.useQuery<GetGraphQuery, GetGraphQueryVariables>(
    GetGraphGql,
    baseOptions,
  )
}
export function useGetGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGraphQuery,
    GetGraphQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGraphQuery, GetGraphQueryVariables>(
    GetGraphGql,
    baseOptions,
  )
}
export type GetGraphQueryHookResult = ReturnType<typeof useGetGraphQuery>
export type GetGraphLazyQueryHookResult = ReturnType<
  typeof useGetGraphLazyQuery
>
export type GetGraphQueryResult = Apollo.QueryResult<
  GetGraphQuery,
  GetGraphQueryVariables
>
export const MoveNodeGql = gql`
  mutation MoveNode($input: MoveNodeInput!) {
    moveNode(input: $input) {
      id
      label
      edges {
        order
        source
        target
        props
      }
    }
  }
`
export type MoveNodeMutationFn = Apollo.MutationFunction<
  MoveNodeMutation,
  MoveNodeMutationVariables
>

/**
 * __useMoveNodeMutation__
 *
 * To run a mutation, you first call `useMoveNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveNodeMutation, { data, loading, error }] = useMoveNodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveNodeMutation,
    MoveNodeMutationVariables
  >,
) {
  return Apollo.useMutation<MoveNodeMutation, MoveNodeMutationVariables>(
    MoveNodeGql,
    baseOptions,
  )
}
export type MoveNodeMutationHookResult = ReturnType<typeof useMoveNodeMutation>
export type MoveNodeMutationResult = Apollo.MutationResult<MoveNodeMutation>
export type MoveNodeMutationOptions = Apollo.BaseMutationOptions<
  MoveNodeMutation,
  MoveNodeMutationVariables
>
export const UpdateNodeGql = gql`
  mutation UpdateNode($input: UpdateNodeInput!) {
    updateNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
    }
  }
`
export type UpdateNodeMutationFn = Apollo.MutationFunction<
  UpdateNodeMutation,
  UpdateNodeMutationVariables
>

/**
 * __useUpdateNodeMutation__
 *
 * To run a mutation, you first call `useUpdateNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNodeMutation, { data, loading, error }] = useUpdateNodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNodeMutation,
    UpdateNodeMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateNodeMutation, UpdateNodeMutationVariables>(
    UpdateNodeGql,
    baseOptions,
  )
}
export type UpdateNodeMutationHookResult = ReturnType<
  typeof useUpdateNodeMutation
>
export type UpdateNodeMutationResult = Apollo.MutationResult<UpdateNodeMutation>
export type UpdateNodeMutationOptions = Apollo.BaseMutationOptions<
  UpdateNodeMutation,
  UpdateNodeMutationVariables
>
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
export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      title
    }
  }
`
export type DeletePageMutationFn = Apollo.MutationFunction<
  DeletePageMutation,
  DeletePageMutationVariables
>

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageGql,
    baseOptions,
  )
}
export type DeletePageMutationHookResult = ReturnType<
  typeof useDeletePageMutation
>
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<
  DeletePageMutation,
  DeletePageMutationVariables
>
export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    getPage(input: $input) {
      title
    }
  }
`

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>,
) {
  return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    baseOptions,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuery,
    GetPageQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    baseOptions,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = Apollo.QueryResult<
  GetPageQuery,
  GetPageQueryVariables
>
export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    getPages(input: $input) {
      id
      title
    }
  }
`

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesQuery(
  baseOptions: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>,
) {
  return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    baseOptions,
  )
}
export function useGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesQuery,
    GetPagesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    baseOptions,
  )
}
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>
export type GetPagesLazyQueryHookResult = ReturnType<
  typeof useGetPagesLazyQuery
>
export type GetPagesQueryResult = Apollo.QueryResult<
  GetPagesQuery,
  GetPagesQueryVariables
>
export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      email
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserGql,
    baseOptions,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const GetMeGql = gql`
  query GetMe {
    getMe {
      id
      email
    }
  }
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeGql, baseOptions)
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeGql,
    baseOptions,
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
export const LoginUserGql = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      accessToken
    }
  }
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >,
) {
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserGql,
    baseOptions,
  )
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const RegisterUserGql = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
      accessToken
    }
  }
`
export type RegisterUserMutationFn = Apollo.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >,
) {
  return Apollo.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserGql, baseOptions)
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>
export const UpdateUserGql = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserGql,
    baseOptions,
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
