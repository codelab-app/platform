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
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: string
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: number
}

export type AddAppInput = {
  owner?: Maybe<UserRef>
  name: Scalars['String']
}

export type AddAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddGetAllUsersPayloadInput = {
  email?: Maybe<Scalars['String']>
}

export type AddGetAllUsersPayloadPayload = {
  getAllUsersPayload?: Maybe<Array<Maybe<GetAllUsersPayload>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddGetAllUsersPayloadPayloadGetAllUsersPayloadArgs = {
  filter?: Maybe<GetAllUsersPayloadFilter>
  order?: Maybe<GetAllUsersPayloadOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddLibraryInput = {
  name: Scalars['String']
}

export type AddLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddUserInput = {
  email: Scalars['String']
  apps?: Maybe<Array<AppRef>>
  libraries?: Maybe<Array<LibraryRef>>
}

export type AddUserPayload = {
  user?: Maybe<Array<Maybe<User>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>
  order?: Maybe<UserOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type App = {
  id: Scalars['ID']
  owner?: Maybe<User>
  name: Scalars['String']
}

export type AppOwnerArgs = {
  filter?: Maybe<UserFilter>
}

export type AppAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type AppFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<AppHasFilter>>>
  and?: Maybe<Array<Maybe<AppFilter>>>
  or?: Maybe<Array<Maybe<AppFilter>>>
  not?: Maybe<AppFilter>
}

export enum AppHasFilter {
  Owner = 'owner',
  Name = 'name',
}

export type AppOrder = {
  asc?: Maybe<AppOrderable>
  desc?: Maybe<AppOrderable>
  then?: Maybe<AppOrder>
}

export enum AppOrderable {
  Name = 'name',
}

export type AppPatch = {
  owner?: Maybe<UserRef>
  name?: Maybe<Scalars['String']>
}

export type AppRef = {
  id?: Maybe<Scalars['ID']>
  owner?: Maybe<UserRef>
  name?: Maybe<Scalars['String']>
}

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>
  or?: Maybe<Array<Maybe<AuthRule>>>
  not?: Maybe<AuthRule>
  rule?: Maybe<Scalars['String']>
}

export type ContainsFilter = {
  point?: Maybe<PointRef>
  polygon?: Maybe<PolygonRef>
}

export type CustomHttp = {
  url: Scalars['String']
  method: HttpMethod
  body?: Maybe<Scalars['String']>
  graphql?: Maybe<Scalars['String']>
  mode?: Maybe<Mode>
  forwardHeaders?: Maybe<Array<Scalars['String']>>
  secretHeaders?: Maybe<Array<Scalars['String']>>
  introspectionHeaders?: Maybe<Array<Scalars['String']>>
  skipIntrospection?: Maybe<Scalars['Boolean']>
}

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  le?: Maybe<Scalars['DateTime']>
  lt?: Maybe<Scalars['DateTime']>
  ge?: Maybe<Scalars['DateTime']>
  gt?: Maybe<Scalars['DateTime']>
  between?: Maybe<DateTimeRange>
}

export type DateTimeRange = {
  min: Scalars['DateTime']
  max: Scalars['DateTime']
}

export type DeleteAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteGetAllUsersPayloadPayload = {
  getAllUsersPayload?: Maybe<Array<Maybe<GetAllUsersPayload>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteGetAllUsersPayloadPayloadGetAllUsersPayloadArgs = {
  filter?: Maybe<GetAllUsersPayloadFilter>
  order?: Maybe<GetAllUsersPayloadOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteUserPayload = {
  user?: Maybe<Array<Maybe<User>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>
  order?: Maybe<UserOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo',
}

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>
  in?: Maybe<Array<Maybe<Scalars['Float']>>>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  between?: Maybe<FloatRange>
}

export type FloatRange = {
  min: Scalars['Float']
  max: Scalars['Float']
}

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>
  update?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>
  query?: Maybe<Scalars['Boolean']>
  password?: Maybe<Scalars['Boolean']>
  aggregate?: Maybe<Scalars['Boolean']>
}

export type GetAllUsersPayload = {
  id: Scalars['ID']
  email?: Maybe<Scalars['String']>
}

export type GetAllUsersPayloadAggregateResult = {
  count?: Maybe<Scalars['Int']>
  emailMin?: Maybe<Scalars['String']>
  emailMax?: Maybe<Scalars['String']>
}

export type GetAllUsersPayloadFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<GetAllUsersPayloadHasFilter>>>
  and?: Maybe<Array<Maybe<GetAllUsersPayloadFilter>>>
  or?: Maybe<Array<Maybe<GetAllUsersPayloadFilter>>>
  not?: Maybe<GetAllUsersPayloadFilter>
}

export enum GetAllUsersPayloadHasFilter {
  Email = 'email',
}

export type GetAllUsersPayloadOrder = {
  asc?: Maybe<GetAllUsersPayloadOrderable>
  desc?: Maybe<GetAllUsersPayloadOrderable>
  then?: Maybe<GetAllUsersPayloadOrder>
}

export enum GetAllUsersPayloadOrderable {
  Email = 'email',
}

export type GetAllUsersPayloadPatch = {
  email?: Maybe<Scalars['String']>
}

export type GetAllUsersPayloadRef = {
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>
  in?: Maybe<Array<Maybe<Scalars['Int64']>>>
  le?: Maybe<Scalars['Int64']>
  lt?: Maybe<Scalars['Int64']>
  ge?: Maybe<Scalars['Int64']>
  gt?: Maybe<Scalars['Int64']>
  between?: Maybe<Int64Range>
}

export type Int64Range = {
  min: Scalars['Int64']
  max: Scalars['Int64']
}

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>
  in?: Maybe<Array<Maybe<Scalars['Int']>>>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  between?: Maybe<IntRange>
}

export type IntRange = {
  min: Scalars['Int']
  max: Scalars['Int']
}

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>
  multiPolygon?: Maybe<MultiPolygonRef>
}

export type Library = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type LibraryAggregateResult = {
  count?: Maybe<Scalars['Int']>
  nameMin?: Maybe<Scalars['String']>
  nameMax?: Maybe<Scalars['String']>
}

export type LibraryFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<LibraryHasFilter>>>
  and?: Maybe<Array<Maybe<LibraryFilter>>>
  or?: Maybe<Array<Maybe<LibraryFilter>>>
  not?: Maybe<LibraryFilter>
}

export enum LibraryHasFilter {
  Name = 'name',
}

export type LibraryOrder = {
  asc?: Maybe<LibraryOrderable>
  desc?: Maybe<LibraryOrderable>
  then?: Maybe<LibraryOrder>
}

export enum LibraryOrderable {
  Name = 'name',
}

export type LibraryPatch = {
  name?: Maybe<Scalars['String']>
}

export type LibraryRef = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE',
}

export type MultiPolygon = {
  polygons: Array<Polygon>
}

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>
}

export type Mutation = {
  addUser?: Maybe<AddUserPayload>
  updateUser?: Maybe<UpdateUserPayload>
  deleteUser?: Maybe<DeleteUserPayload>
  addApp?: Maybe<AddAppPayload>
  updateApp?: Maybe<UpdateAppPayload>
  deleteApp?: Maybe<DeleteAppPayload>
  addLibrary?: Maybe<AddLibraryPayload>
  updateLibrary?: Maybe<UpdateLibraryPayload>
  deleteLibrary?: Maybe<DeleteLibraryPayload>
  addGetAllUsersPayload?: Maybe<AddGetAllUsersPayloadPayload>
  updateGetAllUsersPayload?: Maybe<UpdateGetAllUsersPayloadPayload>
  deleteGetAllUsersPayload?: Maybe<DeleteGetAllUsersPayloadPayload>
}

export type MutationAddUserArgs = {
  input: Array<AddUserInput>
  upsert?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  filter: UserFilter
}

export type MutationAddAppArgs = {
  input: Array<AddAppInput>
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationDeleteAppArgs = {
  filter: AppFilter
}

export type MutationAddLibraryArgs = {
  input: Array<AddLibraryInput>
}

export type MutationUpdateLibraryArgs = {
  input: UpdateLibraryInput
}

export type MutationDeleteLibraryArgs = {
  filter: LibraryFilter
}

export type MutationAddGetAllUsersPayloadArgs = {
  input: Array<AddGetAllUsersPayloadInput>
}

export type MutationUpdateGetAllUsersPayloadArgs = {
  input: UpdateGetAllUsersPayloadInput
}

export type MutationDeleteGetAllUsersPayloadArgs = {
  filter: GetAllUsersPayloadFilter
}

export type NearFilter = {
  distance: Scalars['Float']
  coordinate: PointRef
}

export type Point = {
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type PointGeoFilter = {
  near?: Maybe<NearFilter>
  within?: Maybe<WithinFilter>
}

export type PointList = {
  points: Array<Point>
}

export type PointListRef = {
  points: Array<PointRef>
}

export type PointRef = {
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type Polygon = {
  coordinates: Array<PointList>
}

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>
  within?: Maybe<WithinFilter>
  contains?: Maybe<ContainsFilter>
  intersects?: Maybe<IntersectsFilter>
}

export type PolygonRef = {
  coordinates: Array<PointListRef>
}

export type Query = {
  GetAllUsers?: Maybe<Array<Maybe<GetAllUsersPayload>>>
  userWhere?: Maybe<User>
  getUser?: Maybe<User>
  queryUser?: Maybe<Array<Maybe<User>>>
  aggregateUser?: Maybe<UserAggregateResult>
  getApp?: Maybe<App>
  queryApp?: Maybe<Array<Maybe<App>>>
  aggregateApp?: Maybe<AppAggregateResult>
  getLibrary?: Maybe<Library>
  queryLibrary?: Maybe<Array<Maybe<Library>>>
  aggregateLibrary?: Maybe<LibraryAggregateResult>
  getGetAllUsersPayload?: Maybe<GetAllUsersPayload>
  queryGetAllUsersPayload?: Maybe<Array<Maybe<GetAllUsersPayload>>>
  aggregateGetAllUsersPayload?: Maybe<GetAllUsersPayloadAggregateResult>
}

export type QueryUserWhereArgs = {
  email: Scalars['String']
}

export type QueryGetUserArgs = {
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
}

export type QueryQueryUserArgs = {
  filter?: Maybe<UserFilter>
  order?: Maybe<UserOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateUserArgs = {
  filter?: Maybe<UserFilter>
}

export type QueryGetAppArgs = {
  id: Scalars['ID']
}

export type QueryQueryAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAppArgs = {
  filter?: Maybe<AppFilter>
}

export type QueryGetLibraryArgs = {
  id: Scalars['ID']
}

export type QueryQueryLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type QueryGetGetAllUsersPayloadArgs = {
  id: Scalars['ID']
}

export type QueryQueryGetAllUsersPayloadArgs = {
  filter?: Maybe<GetAllUsersPayloadFilter>
  order?: Maybe<GetAllUsersPayloadOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateGetAllUsersPayloadArgs = {
  filter?: Maybe<GetAllUsersPayloadFilter>
}

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  between?: Maybe<StringRange>
}

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>
  anyoftext?: Maybe<Scalars['String']>
}

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>
  in?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type StringRange = {
  min: Scalars['String']
  max: Scalars['String']
}

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>
}

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>
  anyofterms?: Maybe<Scalars['String']>
}

export type UpdateAppInput = {
  filter: AppFilter
  set?: Maybe<AppPatch>
  remove?: Maybe<AppPatch>
}

export type UpdateAppPayload = {
  app?: Maybe<Array<Maybe<App>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAppPayloadAppArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateGetAllUsersPayloadInput = {
  filter: GetAllUsersPayloadFilter
  set?: Maybe<GetAllUsersPayloadPatch>
  remove?: Maybe<GetAllUsersPayloadPatch>
}

export type UpdateGetAllUsersPayloadPayload = {
  getAllUsersPayload?: Maybe<Array<Maybe<GetAllUsersPayload>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateGetAllUsersPayloadPayloadGetAllUsersPayloadArgs = {
  filter?: Maybe<GetAllUsersPayloadFilter>
  order?: Maybe<GetAllUsersPayloadOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateLibraryInput = {
  filter: LibraryFilter
  set?: Maybe<LibraryPatch>
  remove?: Maybe<LibraryPatch>
}

export type UpdateLibraryPayload = {
  library?: Maybe<Array<Maybe<Library>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateLibraryPayloadLibraryArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateUserInput = {
  filter: UserFilter
  set?: Maybe<UserPatch>
  remove?: Maybe<UserPatch>
}

export type UpdateUserPayload = {
  user?: Maybe<Array<Maybe<User>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>
  order?: Maybe<UserOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpsertUserInput = {
  email: Scalars['String']
}

export type User = {
  id: Scalars['ID']
  email: Scalars['String']
  apps?: Maybe<Array<App>>
  libraries?: Maybe<Array<Library>>
  appsAggregate?: Maybe<AppAggregateResult>
  librariesAggregate?: Maybe<LibraryAggregateResult>
}

export type UserAppsArgs = {
  filter?: Maybe<AppFilter>
  order?: Maybe<AppOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UserLibrariesArgs = {
  filter?: Maybe<LibraryFilter>
  order?: Maybe<LibraryOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UserAppsAggregateArgs = {
  filter?: Maybe<AppFilter>
}

export type UserLibrariesAggregateArgs = {
  filter?: Maybe<LibraryFilter>
}

export type UserAggregateResult = {
  count?: Maybe<Scalars['Int']>
  emailMin?: Maybe<Scalars['String']>
  emailMax?: Maybe<Scalars['String']>
}

export type UserFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  email?: Maybe<StringHashFilter>
  has?: Maybe<Array<Maybe<UserHasFilter>>>
  and?: Maybe<Array<Maybe<UserFilter>>>
  or?: Maybe<Array<Maybe<UserFilter>>>
  not?: Maybe<UserFilter>
}

export enum UserHasFilter {
  Email = 'email',
  Apps = 'apps',
  Libraries = 'libraries',
}

export type UserOrder = {
  asc?: Maybe<UserOrderable>
  desc?: Maybe<UserOrderable>
  then?: Maybe<UserOrder>
}

export enum UserOrderable {
  Email = 'email',
}

export type UserPatch = {
  apps?: Maybe<Array<AppRef>>
  libraries?: Maybe<Array<LibraryRef>>
}

export type UserRef = {
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  apps?: Maybe<Array<AppRef>>
  libraries?: Maybe<Array<LibraryRef>>
}

export type WithinFilter = {
  polygon: PolygonRef
}

export type __UserFragment = Pick<User, 'id' | 'email'>

export type DeleteUserWhereMutationVariables = Exact<{
  where: UserFilter
}>

export type DeleteUserWhereMutation = {
  deleteUser?: Maybe<{ user?: Maybe<Array<Maybe<Pick<User, 'id'>>>> }>
}

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = {
  GetAllUsers?: Maybe<Array<Maybe<Pick<GetAllUsersPayload, 'id' | 'email'>>>>
}

export type GetUsersWhereQueryVariables = Exact<{
  where: UserFilter
}>

export type GetUsersWhereQuery = {
  queryUser?: Maybe<Array<Maybe<Pick<User, 'id' | 'email'>>>>
}

export type UpsertDgraphUserMutationVariables = Exact<{
  input: AddUserInput
}>

export type UpsertDgraphUserMutation = {
  addUser?: Maybe<{ user?: Maybe<Array<Maybe<Pick<User, 'id' | 'email'>>>> }>
}

export const __UserFragmentDoc = gql`
  fragment __User on User {
    id
    email
  }
`
export const DeleteUserWhereGql = gql`
  mutation DeleteUserWhere($where: UserFilter!) {
    deleteUser(filter: $where) {
      user {
        id
      }
    }
  }
`
export type DeleteUserWhereMutationFn = Apollo.MutationFunction<
  DeleteUserWhereMutation,
  DeleteUserWhereMutationVariables
>

/**
 * __useDeleteUserWhereMutation__
 *
 * To run a mutation, you first call `useDeleteUserWhereMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserWhereMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserWhereMutation, { data, loading, error }] = useDeleteUserWhereMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserWhereMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserWhereMutation,
    DeleteUserWhereMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteUserWhereMutation,
    DeleteUserWhereMutationVariables
  >(DeleteUserWhereGql, options)
}
export type DeleteUserWhereMutationHookResult = ReturnType<
  typeof useDeleteUserWhereMutation
>
export type DeleteUserWhereMutationResult = Apollo.MutationResult<DeleteUserWhereMutation>
export type DeleteUserWhereMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserWhereMutation,
  DeleteUserWhereMutationVariables
>
export const GetAllUsersGql = gql`
  query GetAllUsers {
    GetAllUsers {
      id
      email
    }
  }
`

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersGql,
    options,
  )
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersGql,
    options,
  )
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>
export function refetchGetAllUsersQuery(variables?: GetAllUsersQueryVariables) {
  return { query: GetAllUsersGql, variables: variables }
}
export const GetUsersWhereGql = gql`
  query GetUsersWhere($where: UserFilter!) {
    queryUser(filter: $where) {
      id
      email
    }
  }
`

/**
 * __useGetUsersWhereQuery__
 *
 * To run a query within a React component, call `useGetUsersWhereQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersWhereQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersWhereQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUsersWhereQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUsersWhereQuery,
    GetUsersWhereQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersWhereQuery, GetUsersWhereQueryVariables>(
    GetUsersWhereGql,
    options,
  )
}
export function useGetUsersWhereLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersWhereQuery,
    GetUsersWhereQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersWhereQuery, GetUsersWhereQueryVariables>(
    GetUsersWhereGql,
    options,
  )
}
export type GetUsersWhereQueryHookResult = ReturnType<
  typeof useGetUsersWhereQuery
>
export type GetUsersWhereLazyQueryHookResult = ReturnType<
  typeof useGetUsersWhereLazyQuery
>
export type GetUsersWhereQueryResult = Apollo.QueryResult<
  GetUsersWhereQuery,
  GetUsersWhereQueryVariables
>
export function refetchGetUsersWhereQuery(
  variables?: GetUsersWhereQueryVariables,
) {
  return { query: GetUsersWhereGql, variables: variables }
}
export const UpsertDgraphUserGql = gql`
  mutation UpsertDgraphUser($input: AddUserInput!) {
    addUser(input: [$input], upsert: true) {
      user {
        id
        email
      }
    }
  }
`
export type UpsertDgraphUserMutationFn = Apollo.MutationFunction<
  UpsertDgraphUserMutation,
  UpsertDgraphUserMutationVariables
>

/**
 * __useUpsertDgraphUserMutation__
 *
 * To run a mutation, you first call `useUpsertDgraphUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertDgraphUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertDgraphUserMutation, { data, loading, error }] = useUpsertDgraphUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertDgraphUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertDgraphUserMutation,
    UpsertDgraphUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertDgraphUserMutation,
    UpsertDgraphUserMutationVariables
  >(UpsertDgraphUserGql, options)
}
export type UpsertDgraphUserMutationHookResult = ReturnType<
  typeof useUpsertDgraphUserMutation
>
export type UpsertDgraphUserMutationResult = Apollo.MutationResult<UpsertDgraphUserMutation>
export type UpsertDgraphUserMutationOptions = Apollo.BaseMutationOptions<
  UpsertDgraphUserMutation,
  UpsertDgraphUserMutationVariables
>
export const __User = gql`
  fragment __User on User {
    id
    email
  }
`
export const DeleteUserWhere = gql`
  mutation DeleteUserWhere($where: UserFilter!) {
    deleteUser(filter: $where) {
      user {
        id
      }
    }
  }
`
export const GetAllUsers = gql`
  query GetAllUsers {
    GetAllUsers {
      id
      email
    }
  }
`
export const GetUsersWhere = gql`
  query GetUsersWhere($where: UserFilter!) {
    queryUser(filter: $where) {
      id
      email
    }
  }
`
export const UpsertDgraphUser = gql`
  mutation UpsertDgraphUser($input: AddUserInput!) {
    addUser(input: [$input], upsert: true) {
      user {
        id
        email
      }
    }
  }
`
