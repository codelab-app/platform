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
  type?: Maybe<Scalars['String']>
  target: Scalars['String']
  props?: Maybe<Scalars['JSONObject']>
  order: Scalars['Float']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  email: Scalars['String']
  accessToken: Scalars['String']
  apps: Array<App>
}

export type Lambda = {
  __typename?: 'Lambda'
  id: Scalars['String']
  name: Scalars['String']
  body: Scalars['String']
  user: User
}

export type App = {
  __typename?: 'App'
  id: Scalars['String']
  title: Scalars['String']
  pages: Array<Page>
  styles: Array<Style>
  lambdas: Array<Lambda>
}

export type Style = {
  __typename?: 'Style'
  id: Scalars['String']
  name: Scalars['String']
  props?: Maybe<Scalars['JSONObject']>
  app: App
  vertices?: Maybe<Array<Vertex>>
}

export type Vertex = {
  __typename?: 'Vertex'
  id: Scalars['String']
  type?: Maybe<Scalars['String']>
  props?: Maybe<Scalars['JSONObject']>
  graph?: Maybe<Graph>
  parent?: Maybe<Vertex>
  styles?: Maybe<Array<Style>>
  children: Array<Vertex>
}

export type Graph = {
  __typename?: 'Graph'
  id: Scalars['String']
  type?: Maybe<Scalars['String']>
  props?: Maybe<Scalars['JSONObject']>
  label: Scalars['String']
  vertices: Array<Vertex>
  edges: Array<Edge>
  tree: Scalars['JSONObject']
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['String']
  title: Scalars['String']
  graphs: Array<Graph>
}

export type Query = {
  __typename?: 'Query'
  getApp?: Maybe<App>
  getApps: Array<App>
  getBuilder: Builder
  getGraph: Graph
  getLambda: Lambda
  getLambdas: Array<Lambda>
  getMe: User
  getPage: Page
  getPages: Array<Page>
  getStyle: Style
  getStyles: Array<Style>
  getVertex?: Maybe<Vertex>
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetGraphArgs = {
  input: GetGraphInput
}

export type QueryGetLambdaArgs = {
  input: GetLambdaInput
}

export type QueryGetLambdasArgs = {
  input: GetLambdasInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGetStyleArgs = {
  input: GetStyleInput
}

export type QueryGetStylesArgs = {
  input: GetStylesInput
}

export type QueryGetVertexArgs = {
  input: GetVertexInput
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type GetPagesInput = {
  appId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type GetGraphInput = {
  id?: Maybe<Scalars['String']>
}

export type GetVertexInput = {
  id: Scalars['String']
}

export type GetStylesInput = {
  appId: Scalars['String']
}

export type GetStyleInput = {
  styleId: Scalars['String']
}

export type GetLambdaInput = {
  lambdaId: Scalars['String']
}

export type GetLambdasInput = {
  appId: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addChildVertex: Vertex
  assignStyle: Style
  createApp: App
  createGraph: Graph
  createLambda: Lambda
  createPage: Page
  createStyle: Style
  deleteApp: App
  deleteLambda: Lambda
  deletePage: Page
  deleteStyle: Style
  deleteUser: User
  deleteVertex: Vertex
  executeLambda: Lambda
  loginUser: User
  moveVertex: Vertex
  registerUser: User
  setBuilder: Builder
  unAssignStyle: Style
  updateApp: App
  updateEdge: Edge
  updateLambda: Lambda
  updatePage: Page
  updateStyle: Style
  updateUser: User
  updateVertex: Vertex
}

export type MutationAddChildVertexArgs = {
  input: AddChildVertexInput
}

export type MutationAssignStyleArgs = {
  input: AssignStyleInput
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationCreateGraphArgs = {
  input: CreateGraphInput
}

export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationCreateStyleArgs = {
  input: CreateStyleInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationDeleteLambdaArgs = {
  input: DeleteLambdaInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
}

export type MutationDeleteStyleArgs = {
  input: DeleteStyleInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationDeleteVertexArgs = {
  input: DeleteVertexInput
}

export type MutationExecuteLambdaArgs = {
  input: ExecuteLambdaInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationMoveVertexArgs = {
  input: MoveVertexInput
}

export type MutationRegisterUserArgs = {
  input: RegisterUserInput
}

export type MutationSetBuilderArgs = {
  input: SetBuilderInput
}

export type MutationUnAssignStyleArgs = {
  input: UnAssignStyleInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationUpdateEdgeArgs = {
  input: UpdateEdgeInput
}

export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationUpdateStyleArgs = {
  input: UpdateStyleInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateVertexArgs = {
  input: UpdateVertexInput
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

export type CreatePageInput = {
  title: Scalars['String']
  appId: Scalars['String']
}

export type UpdatePageInput = {
  title?: Maybe<Scalars['String']>
  pageId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type CreateGraphInput = {
  label: Scalars['String']
}

export type AddChildVertexInput = {
  parentVertexId?: Maybe<Scalars['String']>
  vertex: CreateVertexInput
  order?: Maybe<Scalars['Float']>
}

export type CreateVertexInput = {
  type: Scalars['String']
  props?: Maybe<Scalars['JSONObject']>
}

export type MoveVertexInput = {
  currentVertexId: Scalars['String']
  parentVertexId: Scalars['String']
}

export type UpdateVertexInput = {
  vertexId: Scalars['String']
  type?: Maybe<Scalars['String']>
  props?: Maybe<Scalars['JSONObject']>
}

export type DeleteVertexInput = {
  vertexId: Scalars['String']
}

export type UpdateEdgeInput = {
  id: Scalars['String']
  order: Scalars['Float']
  type: Scalars['String']
  source: Scalars['String']
  target: Scalars['String']
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

export type CreateStyleInput = {
  appId: Scalars['String']
  name: Scalars['String']
  props?: Maybe<Scalars['JSONObject']>
}

export type AssignStyleInput = {
  styleId: Scalars['String']
  vertexId: Scalars['String']
}

export type UnAssignStyleInput = {
  styleId: Scalars['String']
  vertexId: Scalars['String']
}

export type DeleteStyleInput = {
  styleId: Scalars['String']
}

export type UpdateStyleInput = {
  styleId: Scalars['String']
  name: Scalars['String']
  props?: Maybe<Scalars['JSONObject']>
}

export type CreateLambdaInput = {
  name: Scalars['String']
  body: Scalars['String']
  appId: Scalars['String']
}

export type UpdateLambdaInput = {
  lambdaId: Scalars['String']
  name: Scalars['String']
  body: Scalars['String']
}

export type ExecuteLambdaInput = {
  lambdaId: Scalars['String']
}

export type DeleteLambdaInput = {
  lambdaId: Scalars['String']
}

export type PositionInput = {
  x: Scalars['Int']
  y: Scalars['Int']
}

export type SetBuilderInput = {
  position?: Maybe<PositionInput>
  windowPosition?: Maybe<PositionInput>
  component?: Maybe<Scalars['String']>
}

export type Builder = {
  __typename?: 'Builder'
  position: Position
  windowPosition: Position
  component?: Maybe<Scalars['String']>
  isDragging: Scalars['Boolean']
}

export type Position = {
  __typename?: 'Position'
  x: Scalars['Int']
  y: Scalars['Int']
}

export type GetBuilderQueryVariables = Exact<{ [key: string]: never }>

export type GetBuilderQuery = { __typename?: 'Query' } & {
  getBuilder: { __typename?: 'Builder' } & BuilderFragmentsFragment
}

export type SetBuilderMutationVariables = Exact<{
  input: SetBuilderInput
}>

export type SetBuilderMutation = { __typename?: 'Mutation' } & {
  setBuilder: { __typename?: 'Builder' } & BuilderFragmentsFragment
}

export type BuilderFragmentsFragment = { __typename?: 'Builder' } & Pick<
  Builder,
  'component' | 'isDragging'
> & {
    position: { __typename?: 'Position' } & PositionFragmentsFragment
    windowPosition: { __typename?: 'Position' } & PositionFragmentsFragment
  }

export type PositionFragmentsFragment = { __typename?: 'Position' } & Pick<
  Position,
  'x' | 'y'
>

export type CreateAppMutationVariables = Exact<{
  input: CreateAppInput
}>

export type CreateAppMutation = { __typename?: 'Mutation' } & {
  createApp: { __typename?: 'App' } & User__AppFragment
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
  getApp?: Maybe<{ __typename?: 'App' } & User__AppFragment>
}

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { __typename?: 'Query' } & {
  getApps: Array<{ __typename?: 'App' } & User__AppFragment>
}

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { __typename?: 'Mutation' } & {
  updateApp: { __typename?: 'App' } & Pick<App, 'id' | 'title'>
}

export type User__AppFragment = { __typename?: 'App' } & Pick<
  App,
  'id' | 'title'
> & {
    pages: Array<{ __typename?: 'Page' } & App__PageFragment>
    lambdas: Array<{ __typename?: 'Lambda' } & LambdaFragmentsFragment>
  }

export type AddChildVertexMutationVariables = Exact<{
  input: AddChildVertexInput
}>

export type AddChildVertexMutation = { __typename?: 'Mutation' } & {
  addChildVertex: { __typename?: 'Vertex' } & VertexFragmentsFragment
}

export type CreateGraphMutationVariables = Exact<{
  input: CreateGraphInput
}>

export type CreateGraphMutation = { __typename?: 'Mutation' } & {
  createGraph: { __typename?: 'Graph' } & Pick<Graph, 'id' | 'label'>
}

export type DeleteVertexMutationVariables = Exact<{
  input: DeleteVertexInput
}>

export type DeleteVertexMutation = { __typename?: 'Mutation' } & {
  deleteVertex: { __typename?: 'Vertex' } & VertexFragmentsFragment
}

export type GetGraphQueryVariables = Exact<{
  input: GetGraphInput
}>

export type GetGraphQuery = { __typename?: 'Query' } & {
  getGraph: { __typename?: 'Graph' } & GraphFragmentsFragment
}

export type GetVertexQueryVariables = Exact<{
  input: GetVertexInput
}>

export type GetVertexQuery = { __typename?: 'Query' } & {
  getVertex?: Maybe<{ __typename?: 'Vertex' } & VertexFragmentsFragment>
}

export type MoveVertexMutationVariables = Exact<{
  input: MoveVertexInput
}>

export type MoveVertexMutation = { __typename?: 'Mutation' } & {
  moveVertex: { __typename?: 'Vertex' } & VertexFragmentsFragment
}

export type UpdateEdgeMutationVariables = Exact<{
  input: UpdateEdgeInput
}>

export type UpdateEdgeMutation = { __typename?: 'Mutation' } & {
  updateEdge: { __typename?: 'Edge' } & EdgeFragmentsFragment
}

export type UpdateVertexMutationVariables = Exact<{
  input: UpdateVertexInput
}>

export type UpdateVertexMutation = { __typename?: 'Mutation' } & {
  updateVertex: { __typename?: 'Vertex' } & VertexFragmentsFragment
}

export type EdgeFragmentsFragment = { __typename?: 'Edge' } & Pick<
  Edge,
  'id' | 'type' | 'props' | 'source' | 'target'
>

export type GraphFragmentsFragment = { __typename?: 'Graph' } & Pick<
  Graph,
  'id' | 'type' | 'label'
> & {
    vertices: Array<{ __typename?: 'Vertex' } & VertexFragmentsFragment>
    edges: Array<{ __typename?: 'Edge' } & EdgeFragmentsFragment>
  }

export type VertexFragmentsFragment = { __typename?: 'Vertex' } & Pick<
  Vertex,
  'id' | 'type' | 'props'
> & {
    parent?: Maybe<{ __typename?: 'Vertex' } & Pick<Vertex, 'id' | 'type'>>
    graph?: Maybe<{ __typename?: 'Graph' } & Pick<Graph, 'id'>>
    styles?: Maybe<
      Array<{ __typename?: 'Style' } & Pick<Style, 'id' | 'props' | 'name'>>
    >
  }

export type CreateLambdaMutationVariables = Exact<{
  input: CreateLambdaInput
}>

export type CreateLambdaMutation = { __typename?: 'Mutation' } & {
  createLambda: { __typename?: 'Lambda' } & LambdaFragmentsFragment
}

export type DeleteLambdaMutationVariables = Exact<{
  input: DeleteLambdaInput
}>

export type DeleteLambdaMutation = { __typename?: 'Mutation' } & {
  deleteLambda: { __typename?: 'Lambda' } & LambdaFragmentsFragment
}

export type ExecuteLambdaMutationVariables = Exact<{
  input: ExecuteLambdaInput
}>

export type ExecuteLambdaMutation = { __typename?: 'Mutation' } & {
  executeLambda: { __typename?: 'Lambda' } & LambdaFragmentsFragment
}

export type GetLambdaQueryVariables = Exact<{
  input: GetLambdaInput
}>

export type GetLambdaQuery = { __typename?: 'Query' } & {
  getLambda: { __typename?: 'Lambda' } & LambdaFragmentsFragment
}

export type GetLambdasQueryVariables = Exact<{
  input: GetLambdasInput
}>

export type GetLambdasQuery = { __typename?: 'Query' } & {
  getLambdas: Array<{ __typename?: 'Lambda' } & LambdaFragmentsFragment>
}

export type UpdateLambdaMutationVariables = Exact<{
  input: UpdateLambdaInput
}>

export type UpdateLambdaMutation = { __typename?: 'Mutation' } & {
  updateLambda: { __typename?: 'Lambda' } & LambdaFragmentsFragment
}

export type LambdaFragmentsFragment = { __typename?: 'Lambda' } & Pick<
  Lambda,
  'id' | 'name' | 'body'
>

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput
}>

export type CreatePageMutation = { __typename?: 'Mutation' } & {
  createPage: { __typename?: 'Page' } & App__PageFragment
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
  getPage: { __typename?: 'Page' } & App__PageFragment
}

export type GetPagesQueryVariables = Exact<{
  input: GetPagesInput
}>

export type GetPagesQuery = { __typename?: 'Query' } & {
  getPages: Array<{ __typename?: 'Page' } & App__PageFragment>
}

export type UpdatePageMutationVariables = Exact<{
  input: UpdatePageInput
}>

export type UpdatePageMutation = { __typename?: 'Mutation' } & {
  updatePage: { __typename?: 'Page' } & App__PageFragment
}

export type App__PageFragment = { __typename?: 'Page' } & Pick<
  Page,
  'id' | 'title'
> & { graphs: Array<{ __typename?: 'Graph' } & GraphFragmentsFragment> }

export type AssignStyleMutationVariables = Exact<{
  input: AssignStyleInput
}>

export type AssignStyleMutation = { __typename?: 'Mutation' } & {
  assignStyle: { __typename?: 'Style' } & StyleFragmentsFragment
}

export type CreateStyleMutationVariables = Exact<{
  input: CreateStyleInput
}>

export type CreateStyleMutation = { __typename?: 'Mutation' } & {
  createStyle: { __typename?: 'Style' } & StyleFragmentsFragment
}

export type DeleteStyleMutationVariables = Exact<{
  input: DeleteStyleInput
}>

export type DeleteStyleMutation = { __typename?: 'Mutation' } & {
  deleteStyle: { __typename?: 'Style' } & StyleFragmentsFragment
}

export type GetStyleQueryVariables = Exact<{
  input: GetStyleInput
}>

export type GetStyleQuery = { __typename?: 'Query' } & {
  getStyle: { __typename?: 'Style' } & FullStyleFragmentsFragment
}

export type GetStylesQueryVariables = Exact<{
  input: GetStylesInput
}>

export type GetStylesQuery = { __typename?: 'Query' } & {
  getStyles: Array<{ __typename?: 'Style' } & StyleFragmentsFragment>
}

export type UnAssignStyleMutationVariables = Exact<{
  input: UnAssignStyleInput
}>

export type UnAssignStyleMutation = { __typename?: 'Mutation' } & {
  unAssignStyle: { __typename?: 'Style' } & StyleFragmentsFragment
}

export type UpdateStyleMutationVariables = Exact<{
  input: UpdateStyleInput
}>

export type UpdateStyleMutation = { __typename?: 'Mutation' } & {
  updateStyle: { __typename?: 'Style' } & StyleFragmentsFragment
}

export type FullStyleFragmentsFragment = { __typename?: 'Style' } & Pick<
  Style,
  'id' | 'props' | 'name'
> & { vertices?: Maybe<Array<{ __typename?: 'Vertex' } & Pick<Vertex, 'id'>>> }

export type StyleFragmentsFragment = { __typename?: 'Style' } & Pick<
  Style,
  'id' | 'name'
> & { vertices?: Maybe<Array<{ __typename?: 'Vertex' } & Pick<Vertex, 'id'>>> }

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
> & { apps: Array<{ __typename?: 'App' } & User__AppFragment> }

export const PositionFragments = gql`
  fragment positionFragments on Position {
    x
    y
  }
`
export const BuilderFragments = gql`
  fragment builderFragments on Builder {
    position {
      ...positionFragments
    }
    windowPosition {
      ...positionFragments
    }
    component
    isDragging
  }
  ${PositionFragments}
`
export const FullStyleFragments = gql`
  fragment fullStyleFragments on Style {
    id
    props
    name
    vertices {
      id
    }
  }
`
export const StyleFragments = gql`
  fragment styleFragments on Style {
    id
    name
    vertices {
      id
    }
  }
`
export const VertexFragments = gql`
  fragment vertexFragments on Vertex {
    id
    type
    props
    parent {
      id
      type
    }
    graph {
      id
    }
    styles {
      id
      props
      name
    }
  }
`
export const EdgeFragments = gql`
  fragment edgeFragments on Edge {
    id
    type
    props
    source
    target
  }
`
export const GraphFragments = gql`
  fragment graphFragments on Graph {
    id
    type
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

export const LambdaFragments = gql`
  fragment lambdaFragments on Lambda {
    id
    name
    body
  }
`


export const GetBuilder = gql`
  query GetBuilder {
    getBuilder @client {
      ...builderFragments
    }
  }
  ${BuilderFragments}
`
export const SetBuilder = gql`
  mutation SetBuilder($input: SetBuilderInput!) {
    setBuilder(input: $input) @client {
      ...builderFragments
    }
  }
  ${BuilderFragments}
`
export const AddChildVertex = gql`
  mutation AddChildVertex($input: AddChildVertexInput!) {
    addChildVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragments}
`
export const CreateGraph = gql`
  mutation CreateGraph($input: CreateGraphInput!) {
    createGraph(input: $input) {
      id
      label
    }
  }
`
export const DeleteVertex = gql`
  mutation DeleteVertex($input: DeleteVertexInput!) {
    deleteVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragments}
`
export const GetGraph = gql`
  query GetGraph($input: GetGraphInput!) {
    getGraph(input: $input) {
      ...graphFragments
    }
  }
  ${GraphFragments}
`
export const GetVertex = gql`
  query GetVertex($input: GetVertexInput!) {
    getVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragments}
`
export const MoveVertex = gql`
  mutation MoveVertex($input: MoveVertexInput!) {
    moveVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragments}
`
export const UpdateEdge = gql`
  mutation UpdateEdge($input: UpdateEdgeInput!) {
    updateEdge(input: $input) {
      ...edgeFragments
    }
  }
  ${EdgeFragments}
`
export const UpdateVertex = gql`
  mutation UpdateVertex($input: UpdateVertexInput!) {
    updateVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragments}
`
export const CreateLambda = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`
export const DeleteLambda = gql`
  mutation DeleteLambda($input: DeleteLambdaInput!) {
    deleteLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`
export const ExecuteLambda = gql`
  mutation ExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`
export const GetLambda = gql`
  query GetLambda($input: GetLambdaInput!) {
    getLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`
export const GetLambdas = gql`
  query GetLambdas($input: GetLambdasInput!) {
    getLambdas(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`
export const UpdateLambda = gql`
  mutation UpdateLambda($input: UpdateLambdaInput!) {
    updateLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragments}
`

export const DeletePage = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      title
    }
  }
`

export const AssignStyle = gql`
  mutation AssignStyle($input: AssignStyleInput!) {
    assignStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
`
export const CreateStyle = gql`
  mutation CreateStyle($input: CreateStyleInput!) {
    createStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
`
export const DeleteStyle = gql`
  mutation DeleteStyle($input: DeleteStyleInput!) {
    deleteStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
`
export const GetStyle = gql`
  query GetStyle($input: GetStyleInput!) {
    getStyle(input: $input) {
      ...fullStyleFragments
    }
  }
  ${FullStyleFragments}
`
export const GetStyles = gql`
  query GetStyles($input: GetStylesInput!) {
    getStyles(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
`
export const UnAssignStyle = gql`
  mutation UnAssignStyle($input: UnAssignStyleInput!) {
    unAssignStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
`
export const UpdateStyle = gql`
  mutation UpdateStyle($input: UpdateStyleInput!) {
    updateStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragments}
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
export const PositionFragmentsFragmentDoc = gql`
  fragment positionFragments on Position {
    x
    y
  }
`
export const BuilderFragmentsFragmentDoc = gql`
  fragment builderFragments on Builder {
    position {
      ...positionFragments
    }
    windowPosition {
      ...positionFragments
    }
    component
    isDragging
  }
  ${PositionFragmentsFragmentDoc}
`
export const FullStyleFragmentsFragmentDoc = gql`
  fragment fullStyleFragments on Style {
    id
    props
    name
    vertices {
      id
    }
  }
`
export const StyleFragmentsFragmentDoc = gql`
  fragment styleFragments on Style {
    id
    name
    vertices {
      id
    }
  }
`
export const VertexFragmentsFragmentDoc = gql`
  fragment vertexFragments on Vertex {
    id
    type
    props
    parent {
      id
      type
    }
    graph {
      id
    }
    styles {
      id
      props
      name
    }
  }
`
export const EdgeFragmentsFragmentDoc = gql`
  fragment edgeFragments on Edge {
    id
    type
    props
    source
    target
  }
`
export const GraphFragmentsFragmentDoc = gql`
  fragment graphFragments on Graph {
    id
    type
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
export const LambdaFragmentsFragmentDoc = gql`
  fragment lambdaFragments on Lambda {
    id
    name
    body
  }
`


export const GetBuilderGql = gql`
  query GetBuilder {
    getBuilder @client {
      ...builderFragments
    }
  }
  ${BuilderFragmentsFragmentDoc}
`

/**
 * __useGetBuilderQuery__
 *
 * To run a query within a React component, call `useGetBuilderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuilderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuilderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBuilderQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBuilderQuery,
    GetBuilderQueryVariables
  >,
) {
  return Apollo.useQuery<GetBuilderQuery, GetBuilderQueryVariables>(
    GetBuilderGql,
    baseOptions,
  )
}
export function useGetBuilderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBuilderQuery,
    GetBuilderQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetBuilderQuery, GetBuilderQueryVariables>(
    GetBuilderGql,
    baseOptions,
  )
}
export type GetBuilderQueryHookResult = ReturnType<typeof useGetBuilderQuery>
export type GetBuilderLazyQueryHookResult = ReturnType<
  typeof useGetBuilderLazyQuery
>
export type GetBuilderQueryResult = Apollo.QueryResult<
  GetBuilderQuery,
  GetBuilderQueryVariables
>
export const SetBuilderGql = gql`
  mutation SetBuilder($input: SetBuilderInput!) {
    setBuilder(input: $input) @client {
      ...builderFragments
    }
  }
  ${BuilderFragmentsFragmentDoc}
`
export type SetBuilderMutationFn = Apollo.MutationFunction<
  SetBuilderMutation,
  SetBuilderMutationVariables
>

/**
 * __useSetBuilderMutation__
 *
 * To run a mutation, you first call `useSetBuilderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetBuilderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBuilderMutation, { data, loading, error }] = useSetBuilderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetBuilderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetBuilderMutation,
    SetBuilderMutationVariables
  >,
) {
  return Apollo.useMutation<SetBuilderMutation, SetBuilderMutationVariables>(
    SetBuilderGql,
    baseOptions,
  )
}
export type SetBuilderMutationHookResult = ReturnType<
  typeof useSetBuilderMutation
>
export type SetBuilderMutationResult = Apollo.MutationResult<SetBuilderMutation>
export type SetBuilderMutationOptions = Apollo.BaseMutationOptions<
  SetBuilderMutation,
  SetBuilderMutationVariables
>

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
      ...User__App
    }
  }
  ${User__AppFragmentDoc}
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
      ...User__App
    }
  }
  ${User__AppFragmentDoc}
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
export const AddChildVertexGql = gql`
  mutation AddChildVertex($input: AddChildVertexInput!) {
    addChildVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
`
export type AddChildVertexMutationFn = Apollo.MutationFunction<
  AddChildVertexMutation,
  AddChildVertexMutationVariables
>

/**
 * __useAddChildVertexMutation__
 *
 * To run a mutation, you first call `useAddChildVertexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChildVertexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChildVertexMutation, { data, loading, error }] = useAddChildVertexMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddChildVertexMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddChildVertexMutation,
    AddChildVertexMutationVariables
  >,
) {
  return Apollo.useMutation<
    AddChildVertexMutation,
    AddChildVertexMutationVariables
  >(AddChildVertexGql, baseOptions)
}
export type AddChildVertexMutationHookResult = ReturnType<
  typeof useAddChildVertexMutation
>
export type AddChildVertexMutationResult = Apollo.MutationResult<AddChildVertexMutation>
export type AddChildVertexMutationOptions = Apollo.BaseMutationOptions<
  AddChildVertexMutation,
  AddChildVertexMutationVariables
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
export const DeleteVertexGql = gql`
  mutation DeleteVertex($input: DeleteVertexInput!) {
    deleteVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
`
export type DeleteVertexMutationFn = Apollo.MutationFunction<
  DeleteVertexMutation,
  DeleteVertexMutationVariables
>

/**
 * __useDeleteVertexMutation__
 *
 * To run a mutation, you first call `useDeleteVertexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVertexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVertexMutation, { data, loading, error }] = useDeleteVertexMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteVertexMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVertexMutation,
    DeleteVertexMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeleteVertexMutation,
    DeleteVertexMutationVariables
  >(DeleteVertexGql, baseOptions)
}
export type DeleteVertexMutationHookResult = ReturnType<
  typeof useDeleteVertexMutation
>
export type DeleteVertexMutationResult = Apollo.MutationResult<DeleteVertexMutation>
export type DeleteVertexMutationOptions = Apollo.BaseMutationOptions<
  DeleteVertexMutation,
  DeleteVertexMutationVariables
>
export const GetGraphGql = gql`
  query GetGraph($input: GetGraphInput!) {
    getGraph(input: $input) {
      ...graphFragments
    }
  }
  ${GraphFragmentsFragmentDoc}
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
export const GetVertexGql = gql`
  query GetVertex($input: GetVertexInput!) {
    getVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
`

/**
 * __useGetVertexQuery__
 *
 * To run a query within a React component, call `useGetVertexQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVertexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVertexQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetVertexQuery(
  baseOptions: Apollo.QueryHookOptions<GetVertexQuery, GetVertexQueryVariables>,
) {
  return Apollo.useQuery<GetVertexQuery, GetVertexQueryVariables>(
    GetVertexGql,
    baseOptions,
  )
}
export function useGetVertexLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVertexQuery,
    GetVertexQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetVertexQuery, GetVertexQueryVariables>(
    GetVertexGql,
    baseOptions,
  )
}
export type GetVertexQueryHookResult = ReturnType<typeof useGetVertexQuery>
export type GetVertexLazyQueryHookResult = ReturnType<
  typeof useGetVertexLazyQuery
>
export type GetVertexQueryResult = Apollo.QueryResult<
  GetVertexQuery,
  GetVertexQueryVariables
>
export const MoveVertexGql = gql`
  mutation MoveVertex($input: MoveVertexInput!) {
    moveVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
`
export type MoveVertexMutationFn = Apollo.MutationFunction<
  MoveVertexMutation,
  MoveVertexMutationVariables
>

/**
 * __useMoveVertexMutation__
 *
 * To run a mutation, you first call `useMoveVertexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveVertexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveVertexMutation, { data, loading, error }] = useMoveVertexMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveVertexMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveVertexMutation,
    MoveVertexMutationVariables
  >,
) {
  return Apollo.useMutation<MoveVertexMutation, MoveVertexMutationVariables>(
    MoveVertexGql,
    baseOptions,
  )
}
export type MoveVertexMutationHookResult = ReturnType<
  typeof useMoveVertexMutation
>
export type MoveVertexMutationResult = Apollo.MutationResult<MoveVertexMutation>
export type MoveVertexMutationOptions = Apollo.BaseMutationOptions<
  MoveVertexMutation,
  MoveVertexMutationVariables
>
export const UpdateEdgeGql = gql`
  mutation UpdateEdge($input: UpdateEdgeInput!) {
    updateEdge(input: $input) {
      ...edgeFragments
    }
  }
  ${EdgeFragmentsFragmentDoc}
`
export type UpdateEdgeMutationFn = Apollo.MutationFunction<
  UpdateEdgeMutation,
  UpdateEdgeMutationVariables
>

/**
 * __useUpdateEdgeMutation__
 *
 * To run a mutation, you first call `useUpdateEdgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEdgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEdgeMutation, { data, loading, error }] = useUpdateEdgeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEdgeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEdgeMutation,
    UpdateEdgeMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateEdgeMutation, UpdateEdgeMutationVariables>(
    UpdateEdgeGql,
    baseOptions,
  )
}
export type UpdateEdgeMutationHookResult = ReturnType<
  typeof useUpdateEdgeMutation
>
export type UpdateEdgeMutationResult = Apollo.MutationResult<UpdateEdgeMutation>
export type UpdateEdgeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEdgeMutation,
  UpdateEdgeMutationVariables
>
export const UpdateVertexGql = gql`
  mutation UpdateVertex($input: UpdateVertexInput!) {
    updateVertex(input: $input) {
      ...vertexFragments
    }
  }
  ${VertexFragmentsFragmentDoc}
`
export type UpdateVertexMutationFn = Apollo.MutationFunction<
  UpdateVertexMutation,
  UpdateVertexMutationVariables
>

/**
 * __useUpdateVertexMutation__
 *
 * To run a mutation, you first call `useUpdateVertexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVertexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVertexMutation, { data, loading, error }] = useUpdateVertexMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVertexMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVertexMutation,
    UpdateVertexMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateVertexMutation,
    UpdateVertexMutationVariables
  >(UpdateVertexGql, baseOptions)
}
export type UpdateVertexMutationHookResult = ReturnType<
  typeof useUpdateVertexMutation
>
export type UpdateVertexMutationResult = Apollo.MutationResult<UpdateVertexMutation>
export type UpdateVertexMutationOptions = Apollo.BaseMutationOptions<
  UpdateVertexMutation,
  UpdateVertexMutationVariables
>
export const CreateLambdaGql = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`
export type CreateLambdaMutationFn = Apollo.MutationFunction<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>

/**
 * __useCreateLambdaMutation__
 *
 * To run a mutation, you first call `useCreateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLambdaMutation, { data, loading, error }] = useCreateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateLambdaMutation,
    CreateLambdaMutationVariables
  >(CreateLambdaGql, baseOptions)
}
export type CreateLambdaMutationHookResult = ReturnType<
  typeof useCreateLambdaMutation
>
export type CreateLambdaMutationResult = Apollo.MutationResult<CreateLambdaMutation>
export type CreateLambdaMutationOptions = Apollo.BaseMutationOptions<
  CreateLambdaMutation,
  CreateLambdaMutationVariables
>
export const DeleteLambdaGql = gql`
  mutation DeleteLambda($input: DeleteLambdaInput!) {
    deleteLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`
export type DeleteLambdaMutationFn = Apollo.MutationFunction<
  DeleteLambdaMutation,
  DeleteLambdaMutationVariables
>

/**
 * __useDeleteLambdaMutation__
 *
 * To run a mutation, you first call `useDeleteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLambdaMutation, { data, loading, error }] = useDeleteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteLambdaMutation,
    DeleteLambdaMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeleteLambdaMutation,
    DeleteLambdaMutationVariables
  >(DeleteLambdaGql, baseOptions)
}
export type DeleteLambdaMutationHookResult = ReturnType<
  typeof useDeleteLambdaMutation
>
export type DeleteLambdaMutationResult = Apollo.MutationResult<DeleteLambdaMutation>
export type DeleteLambdaMutationOptions = Apollo.BaseMutationOptions<
  DeleteLambdaMutation,
  DeleteLambdaMutationVariables
>
export const ExecuteLambdaGql = gql`
  mutation ExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`
export type ExecuteLambdaMutationFn = Apollo.MutationFunction<
  ExecuteLambdaMutation,
  ExecuteLambdaMutationVariables
>

/**
 * __useExecuteLambdaMutation__
 *
 * To run a mutation, you first call `useExecuteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeLambdaMutation, { data, loading, error }] = useExecuteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ExecuteLambdaMutation,
    ExecuteLambdaMutationVariables
  >,
) {
  return Apollo.useMutation<
    ExecuteLambdaMutation,
    ExecuteLambdaMutationVariables
  >(ExecuteLambdaGql, baseOptions)
}
export type ExecuteLambdaMutationHookResult = ReturnType<
  typeof useExecuteLambdaMutation
>
export type ExecuteLambdaMutationResult = Apollo.MutationResult<ExecuteLambdaMutation>
export type ExecuteLambdaMutationOptions = Apollo.BaseMutationOptions<
  ExecuteLambdaMutation,
  ExecuteLambdaMutationVariables
>
export const GetLambdaGql = gql`
  query GetLambda($input: GetLambdaInput!) {
    getLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`

/**
 * __useGetLambdaQuery__
 *
 * To run a query within a React component, call `useGetLambdaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdaQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLambdaQuery(
  baseOptions: Apollo.QueryHookOptions<GetLambdaQuery, GetLambdaQueryVariables>,
) {
  return Apollo.useQuery<GetLambdaQuery, GetLambdaQueryVariables>(
    GetLambdaGql,
    baseOptions,
  )
}
export function useGetLambdaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdaQuery,
    GetLambdaQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetLambdaQuery, GetLambdaQueryVariables>(
    GetLambdaGql,
    baseOptions,
  )
}
export type GetLambdaQueryHookResult = ReturnType<typeof useGetLambdaQuery>
export type GetLambdaLazyQueryHookResult = ReturnType<
  typeof useGetLambdaLazyQuery
>
export type GetLambdaQueryResult = Apollo.QueryResult<
  GetLambdaQuery,
  GetLambdaQueryVariables
>
export const GetLambdasGql = gql`
  query GetLambdas($input: GetLambdasInput!) {
    getLambdas(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`

/**
 * __useGetLambdasQuery__
 *
 * To run a query within a React component, call `useGetLambdasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdasQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLambdasQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLambdasQuery,
    GetLambdasQueryVariables
  >,
) {
  return Apollo.useQuery<GetLambdasQuery, GetLambdasQueryVariables>(
    GetLambdasGql,
    baseOptions,
  )
}
export function useGetLambdasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdasQuery,
    GetLambdasQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetLambdasQuery, GetLambdasQueryVariables>(
    GetLambdasGql,
    baseOptions,
  )
}
export type GetLambdasQueryHookResult = ReturnType<typeof useGetLambdasQuery>
export type GetLambdasLazyQueryHookResult = ReturnType<
  typeof useGetLambdasLazyQuery
>
export type GetLambdasQueryResult = Apollo.QueryResult<
  GetLambdasQuery,
  GetLambdasQueryVariables
>
export const UpdateLambdaGql = gql`
  mutation UpdateLambda($input: UpdateLambdaInput!) {
    updateLambda(input: $input) {
      ...lambdaFragments
    }
  }
  ${LambdaFragmentsFragmentDoc}
`
export type UpdateLambdaMutationFn = Apollo.MutationFunction<
  UpdateLambdaMutation,
  UpdateLambdaMutationVariables
>

/**
 * __useUpdateLambdaMutation__
 *
 * To run a mutation, you first call `useUpdateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLambdaMutation, { data, loading, error }] = useUpdateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLambdaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLambdaMutation,
    UpdateLambdaMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateLambdaMutation,
    UpdateLambdaMutationVariables
  >(UpdateLambdaGql, baseOptions)
}
export type UpdateLambdaMutationHookResult = ReturnType<
  typeof useUpdateLambdaMutation
>
export type UpdateLambdaMutationResult = Apollo.MutationResult<UpdateLambdaMutation>
export type UpdateLambdaMutationOptions = Apollo.BaseMutationOptions<
  UpdateLambdaMutation,
  UpdateLambdaMutationVariables
>

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
export type UpdatePageMutationFn = Apollo.MutationFunction<
  UpdatePageMutation,
  UpdatePageMutationVariables
>

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageMutation,
    UpdatePageMutationVariables
  >,
) {
  return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(
    UpdatePageGql,
    baseOptions,
  )
}
export type UpdatePageMutationHookResult = ReturnType<
  typeof useUpdatePageMutation
>
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageMutation,
  UpdatePageMutationVariables
>
export const AssignStyleGql = gql`
  mutation AssignStyle($input: AssignStyleInput!) {
    assignStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`
export type AssignStyleMutationFn = Apollo.MutationFunction<
  AssignStyleMutation,
  AssignStyleMutationVariables
>

/**
 * __useAssignStyleMutation__
 *
 * To run a mutation, you first call `useAssignStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStyleMutation, { data, loading, error }] = useAssignStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AssignStyleMutation,
    AssignStyleMutationVariables
  >,
) {
  return Apollo.useMutation<AssignStyleMutation, AssignStyleMutationVariables>(
    AssignStyleGql,
    baseOptions,
  )
}
export type AssignStyleMutationHookResult = ReturnType<
  typeof useAssignStyleMutation
>
export type AssignStyleMutationResult = Apollo.MutationResult<AssignStyleMutation>
export type AssignStyleMutationOptions = Apollo.BaseMutationOptions<
  AssignStyleMutation,
  AssignStyleMutationVariables
>
export const CreateStyleGql = gql`
  mutation CreateStyle($input: CreateStyleInput!) {
    createStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`
export type CreateStyleMutationFn = Apollo.MutationFunction<
  CreateStyleMutation,
  CreateStyleMutationVariables
>

/**
 * __useCreateStyleMutation__
 *
 * To run a mutation, you first call `useCreateStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStyleMutation, { data, loading, error }] = useCreateStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStyleMutation,
    CreateStyleMutationVariables
  >,
) {
  return Apollo.useMutation<CreateStyleMutation, CreateStyleMutationVariables>(
    CreateStyleGql,
    baseOptions,
  )
}
export type CreateStyleMutationHookResult = ReturnType<
  typeof useCreateStyleMutation
>
export type CreateStyleMutationResult = Apollo.MutationResult<CreateStyleMutation>
export type CreateStyleMutationOptions = Apollo.BaseMutationOptions<
  CreateStyleMutation,
  CreateStyleMutationVariables
>
export const DeleteStyleGql = gql`
  mutation DeleteStyle($input: DeleteStyleInput!) {
    deleteStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`
export type DeleteStyleMutationFn = Apollo.MutationFunction<
  DeleteStyleMutation,
  DeleteStyleMutationVariables
>

/**
 * __useDeleteStyleMutation__
 *
 * To run a mutation, you first call `useDeleteStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStyleMutation, { data, loading, error }] = useDeleteStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteStyleMutation,
    DeleteStyleMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteStyleMutation, DeleteStyleMutationVariables>(
    DeleteStyleGql,
    baseOptions,
  )
}
export type DeleteStyleMutationHookResult = ReturnType<
  typeof useDeleteStyleMutation
>
export type DeleteStyleMutationResult = Apollo.MutationResult<DeleteStyleMutation>
export type DeleteStyleMutationOptions = Apollo.BaseMutationOptions<
  DeleteStyleMutation,
  DeleteStyleMutationVariables
>
export const GetStyleGql = gql`
  query GetStyle($input: GetStyleInput!) {
    getStyle(input: $input) {
      ...fullStyleFragments
    }
  }
  ${FullStyleFragmentsFragmentDoc}
`

/**
 * __useGetStyleQuery__
 *
 * To run a query within a React component, call `useGetStyleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStyleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStyleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetStyleQuery(
  baseOptions: Apollo.QueryHookOptions<GetStyleQuery, GetStyleQueryVariables>,
) {
  return Apollo.useQuery<GetStyleQuery, GetStyleQueryVariables>(
    GetStyleGql,
    baseOptions,
  )
}
export function useGetStyleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStyleQuery,
    GetStyleQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetStyleQuery, GetStyleQueryVariables>(
    GetStyleGql,
    baseOptions,
  )
}
export type GetStyleQueryHookResult = ReturnType<typeof useGetStyleQuery>
export type GetStyleLazyQueryHookResult = ReturnType<
  typeof useGetStyleLazyQuery
>
export type GetStyleQueryResult = Apollo.QueryResult<
  GetStyleQuery,
  GetStyleQueryVariables
>
export const GetStylesGql = gql`
  query GetStyles($input: GetStylesInput!) {
    getStyles(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`

/**
 * __useGetStylesQuery__
 *
 * To run a query within a React component, call `useGetStylesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStylesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStylesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetStylesQuery(
  baseOptions: Apollo.QueryHookOptions<GetStylesQuery, GetStylesQueryVariables>,
) {
  return Apollo.useQuery<GetStylesQuery, GetStylesQueryVariables>(
    GetStylesGql,
    baseOptions,
  )
}
export function useGetStylesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStylesQuery,
    GetStylesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetStylesQuery, GetStylesQueryVariables>(
    GetStylesGql,
    baseOptions,
  )
}
export type GetStylesQueryHookResult = ReturnType<typeof useGetStylesQuery>
export type GetStylesLazyQueryHookResult = ReturnType<
  typeof useGetStylesLazyQuery
>
export type GetStylesQueryResult = Apollo.QueryResult<
  GetStylesQuery,
  GetStylesQueryVariables
>
export const UnAssignStyleGql = gql`
  mutation UnAssignStyle($input: UnAssignStyleInput!) {
    unAssignStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`
export type UnAssignStyleMutationFn = Apollo.MutationFunction<
  UnAssignStyleMutation,
  UnAssignStyleMutationVariables
>

/**
 * __useUnAssignStyleMutation__
 *
 * To run a mutation, you first call `useUnAssignStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnAssignStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unAssignStyleMutation, { data, loading, error }] = useUnAssignStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnAssignStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnAssignStyleMutation,
    UnAssignStyleMutationVariables
  >,
) {
  return Apollo.useMutation<
    UnAssignStyleMutation,
    UnAssignStyleMutationVariables
  >(UnAssignStyleGql, baseOptions)
}
export type UnAssignStyleMutationHookResult = ReturnType<
  typeof useUnAssignStyleMutation
>
export type UnAssignStyleMutationResult = Apollo.MutationResult<UnAssignStyleMutation>
export type UnAssignStyleMutationOptions = Apollo.BaseMutationOptions<
  UnAssignStyleMutation,
  UnAssignStyleMutationVariables
>
export const UpdateStyleGql = gql`
  mutation UpdateStyle($input: UpdateStyleInput!) {
    updateStyle(input: $input) {
      ...styleFragments
    }
  }
  ${StyleFragmentsFragmentDoc}
`
export type UpdateStyleMutationFn = Apollo.MutationFunction<
  UpdateStyleMutation,
  UpdateStyleMutationVariables
>

/**
 * __useUpdateStyleMutation__
 *
 * To run a mutation, you first call `useUpdateStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStyleMutation, { data, loading, error }] = useUpdateStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStyleMutation,
    UpdateStyleMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateStyleMutation, UpdateStyleMutationVariables>(
    UpdateStyleGql,
    baseOptions,
  )
}
export type UpdateStyleMutationHookResult = ReturnType<
  typeof useUpdateStyleMutation
>
export type UpdateStyleMutationResult = Apollo.MutationResult<UpdateStyleMutation>
export type UpdateStyleMutationOptions = Apollo.BaseMutationOptions<
  UpdateStyleMutation,
  UpdateStyleMutationVariables
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
