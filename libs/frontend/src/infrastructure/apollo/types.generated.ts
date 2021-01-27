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
  type: VertexType
}

export enum VertexType {
  ReactGrid = 'React_Grid',
  ReactGridLayoutContainer = 'React_Grid_Layout_Container',
  ReactResponsiveGrid = 'React_ResponsiveGrid',
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
  getGraph: Graph
  getMe: User
  getPage: Page
  getPages: Array<Page>
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetGraphArgs = {
  input: GetGraphInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type GetGraphInput = {
  id?: Maybe<Scalars['String']>
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
  props: Scalars['JSONObject']
  vertex: CreateVertexInput
}

export type CreateVertexInput = {
  props: Scalars['JSONObject']
  type: VertexType
}

export type UpdateNodeInput = {
  graphId: Scalars['String']
  type: VertexType
  vertexId: Scalars['String']
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
