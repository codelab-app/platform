import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

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
  id?: Maybe<Scalars['String']>
  email: Scalars['String']
  accessToken: Scalars['String']
  apps: Array<App>
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
  type: VertexType
  props: Scalars['JSONObject']
}

export enum VertexType {
  ReactGridLayoutContainer = 'React_Grid_Layout_Container',
  ReactGrid = 'React_Grid',
  ReactResponsiveGrid = 'React_ResponsiveGrid',
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

export type Query = {
  __typename?: 'Query'
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getGraph: Graph
  getPages: Array<Page>
  getPage: Page
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetGraphArgs = {
  input: GetGraphInput
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
  props: Scalars['JSONObject']
}

export type CreateVertexInput = {
  type: VertexType
  props: Scalars['JSONObject']
}

export type UpdateNodeInput = {
  graphId: Scalars['String']
  vertexId: Scalars['String']
  type: VertexType
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

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { __typename?: 'Mutation' } & {
  updateApp: { __typename?: 'App' } & Pick<App, 'id' | 'title'>
}

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { __typename?: 'Query' } & {
  getApps: Array<{ __typename?: 'App' } & Pick<App, 'id' | 'title'>>
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
  getApp?: Maybe<{ __typename?: 'App' } & Pick<App, 'title'>>
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

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput
}>

export type RegisterUserMutation = { __typename?: 'Mutation' } & {
  registerUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'accessToken'
  >
}

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

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<User, 'email'>
}

export const CreateAppDocument: DocumentNode<
  CreateAppMutation,
  CreateAppMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateApp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateAppInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createApp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const UpdateAppDocument: DocumentNode<
  UpdateAppMutation,
  UpdateAppMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateApp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateAppInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateApp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const GetAppsDocument: DocumentNode<
  GetAppsQuery,
  GetAppsQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetApps' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getApps' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const DeleteAppDocument: DocumentNode<
  DeleteAppMutation,
  DeleteAppMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteApp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DeleteAppInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteApp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const GetAppDocument: DocumentNode<GetAppQuery, GetAppQueryVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetApp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GetAppInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getApp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const DeletePageDocument: DocumentNode<
  DeletePageMutation,
  DeletePageMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeletePage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DeletePageInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deletePage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const GetPageDocument: DocumentNode<
  GetPageQuery,
  GetPageQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GetPageInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const GetPagesDocument: DocumentNode<
  GetPagesQuery,
  GetPagesQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GetPagesInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const RegisterUserDocument: DocumentNode<
  RegisterUserMutation,
  RegisterUserMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const DeleteUserDocument: DocumentNode<
  DeleteUserMutation,
  DeleteUserMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DeleteUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const GetMeDocument: DocumentNode<GetMeQuery, GetMeQueryVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMe' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const LoginUserDocument: DocumentNode<
  LoginUserMutation,
  LoginUserMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LoginUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'loginUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export const UpdateUserDocument: DocumentNode<
  UpdateUserMutation,
  UpdateUserMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
