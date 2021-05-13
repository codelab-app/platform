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
  owner: UserRef
  pages?: Maybe<Array<Maybe<PageRef>>>
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

export type AddAtomInput = {
  library: LibraryRef
  label: Scalars['String']
  type: Scalars['String']
}

export type AddAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddComponentInput = {
  library: LibraryRef
  atom: AtomRef
  label: Scalars['String']
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type AddComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
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
  owner: UserRef
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
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

export type AddPageInput = {
  title: Scalars['String']
  app?: Maybe<AppRef>
}

export type AddPagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddPagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AddTagInput = {
  label: Scalars['String']
}

export type AddTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  numUids?: Maybe<Scalars['Int']>
}

export type AddTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
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
  owner: User
  pages?: Maybe<Array<Maybe<Page>>>
  name: Scalars['String']
  pagesAggregate?: Maybe<PageAggregateResult>
}

export type AppOwnerArgs = {
  filter?: Maybe<UserFilter>
}

export type AppPagesArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppPagesAggregateArgs = {
  filter?: Maybe<PageFilter>
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
  Pages = 'pages',
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
  pages?: Maybe<Array<Maybe<PageRef>>>
  name?: Maybe<Scalars['String']>
}

export type AppRef = {
  id?: Maybe<Scalars['ID']>
  owner?: Maybe<UserRef>
  pages?: Maybe<Array<Maybe<PageRef>>>
  name?: Maybe<Scalars['String']>
}

export type Atom = {
  id: Scalars['ID']
  library: Library
  label: Scalars['String']
  type: Scalars['String']
}

export type AtomLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type AtomAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
  typeMin?: Maybe<Scalars['String']>
  typeMax?: Maybe<Scalars['String']>
}

export type AtomFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<AtomHasFilter>>>
  and?: Maybe<Array<Maybe<AtomFilter>>>
  or?: Maybe<Array<Maybe<AtomFilter>>>
  not?: Maybe<AtomFilter>
}

export enum AtomHasFilter {
  Library = 'library',
  Label = 'label',
  Type = 'type',
}

export type AtomOrder = {
  asc?: Maybe<AtomOrderable>
  desc?: Maybe<AtomOrderable>
  then?: Maybe<AtomOrder>
}

export enum AtomOrderable {
  Label = 'label',
  Type = 'type',
}

export type AtomPatch = {
  library?: Maybe<LibraryRef>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type AtomRef = {
  id?: Maybe<Scalars['ID']>
  library?: Maybe<LibraryRef>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>
  or?: Maybe<Array<Maybe<AuthRule>>>
  not?: Maybe<AuthRule>
  rule?: Maybe<Scalars['String']>
}

export type Component = {
  id: Scalars['ID']
  library: Library
  atom: Atom
  label: Scalars['String']
  children?: Maybe<Array<Maybe<Component>>>
  tags?: Maybe<Array<Maybe<Tag>>>
  childrenAggregate?: Maybe<ComponentAggregateResult>
  tagsAggregate?: Maybe<TagAggregateResult>
}

export type ComponentLibraryArgs = {
  filter?: Maybe<LibraryFilter>
}

export type ComponentAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type ComponentChildrenArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ComponentTagsArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ComponentChildrenAggregateArgs = {
  filter?: Maybe<ComponentFilter>
}

export type ComponentTagsAggregateArgs = {
  filter?: Maybe<TagFilter>
}

export type ComponentAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type ComponentFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  has?: Maybe<Array<Maybe<ComponentHasFilter>>>
  and?: Maybe<Array<Maybe<ComponentFilter>>>
  or?: Maybe<Array<Maybe<ComponentFilter>>>
  not?: Maybe<ComponentFilter>
}

export enum ComponentHasFilter {
  Library = 'library',
  Atom = 'atom',
  Label = 'label',
  Children = 'children',
  Tags = 'tags',
}

export type ComponentOrder = {
  asc?: Maybe<ComponentOrderable>
  desc?: Maybe<ComponentOrderable>
  then?: Maybe<ComponentOrder>
}

export enum ComponentOrderable {
  Label = 'label',
}

export type ComponentPatch = {
  library?: Maybe<LibraryRef>
  atom?: Maybe<AtomRef>
  label?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
}

export type ComponentRef = {
  id?: Maybe<Scalars['ID']>
  library?: Maybe<LibraryRef>
  atom?: Maybe<AtomRef>
  label?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<ComponentRef>>>
  tags?: Maybe<Array<Maybe<TagRef>>>
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

export type DeleteAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
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

export type DeletePagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeletePagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DeleteTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  msg?: Maybe<Scalars['String']>
  numUids?: Maybe<Scalars['Int']>
}

export type DeleteTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
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
  owner: User
  name: Scalars['String']
  atoms?: Maybe<Array<Maybe<Atom>>>
  components?: Maybe<Array<Maybe<Component>>>
  atomsAggregate?: Maybe<AtomAggregateResult>
  componentsAggregate?: Maybe<ComponentAggregateResult>
}

export type LibraryOwnerArgs = {
  filter?: Maybe<UserFilter>
}

export type LibraryAtomsArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type LibraryComponentsArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type LibraryAtomsAggregateArgs = {
  filter?: Maybe<AtomFilter>
}

export type LibraryComponentsAggregateArgs = {
  filter?: Maybe<ComponentFilter>
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
  Owner = 'owner',
  Name = 'name',
  Atoms = 'atoms',
  Components = 'components',
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
  owner?: Maybe<UserRef>
  name?: Maybe<Scalars['String']>
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
}

export type LibraryRef = {
  id?: Maybe<Scalars['ID']>
  owner?: Maybe<UserRef>
  name?: Maybe<Scalars['String']>
  atoms?: Maybe<Array<Maybe<AtomRef>>>
  components?: Maybe<Array<Maybe<ComponentRef>>>
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
  addPage?: Maybe<AddPagePayload>
  updatePage?: Maybe<UpdatePagePayload>
  deletePage?: Maybe<DeletePagePayload>
  addLibrary?: Maybe<AddLibraryPayload>
  updateLibrary?: Maybe<UpdateLibraryPayload>
  deleteLibrary?: Maybe<DeleteLibraryPayload>
  addComponent?: Maybe<AddComponentPayload>
  updateComponent?: Maybe<UpdateComponentPayload>
  deleteComponent?: Maybe<DeleteComponentPayload>
  addAtom?: Maybe<AddAtomPayload>
  updateAtom?: Maybe<UpdateAtomPayload>
  deleteAtom?: Maybe<DeleteAtomPayload>
  addTag?: Maybe<AddTagPayload>
  updateTag?: Maybe<UpdateTagPayload>
  deleteTag?: Maybe<DeleteTagPayload>
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

export type MutationAddPageArgs = {
  input: Array<AddPageInput>
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationDeletePageArgs = {
  filter: PageFilter
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

export type MutationAddComponentArgs = {
  input: Array<AddComponentInput>
}

export type MutationUpdateComponentArgs = {
  input: UpdateComponentInput
}

export type MutationDeleteComponentArgs = {
  filter: ComponentFilter
}

export type MutationAddAtomArgs = {
  input: Array<AddAtomInput>
}

export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput
}

export type MutationDeleteAtomArgs = {
  filter: AtomFilter
}

export type MutationAddTagArgs = {
  input: Array<AddTagInput>
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type MutationDeleteTagArgs = {
  filter: TagFilter
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

export type Page = {
  id: Scalars['ID']
  title: Scalars['String']
  app?: Maybe<App>
}

export type PageAppArgs = {
  filter?: Maybe<AppFilter>
}

export type PageAggregateResult = {
  count?: Maybe<Scalars['Int']>
  titleMin?: Maybe<Scalars['String']>
  titleMax?: Maybe<Scalars['String']>
}

export type PageFilter = {
  id?: Maybe<Array<Scalars['ID']>>
  title?: Maybe<StringFullTextFilter_StringTermFilter>
  has?: Maybe<Array<Maybe<PageHasFilter>>>
  and?: Maybe<Array<Maybe<PageFilter>>>
  or?: Maybe<Array<Maybe<PageFilter>>>
  not?: Maybe<PageFilter>
}

export enum PageHasFilter {
  Title = 'title',
  App = 'app',
}

export type PageOrder = {
  asc?: Maybe<PageOrderable>
  desc?: Maybe<PageOrderable>
  then?: Maybe<PageOrder>
}

export enum PageOrderable {
  Title = 'title',
}

export type PagePatch = {
  title?: Maybe<Scalars['String']>
  app?: Maybe<AppRef>
}

export type PageRef = {
  id?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  app?: Maybe<AppRef>
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
  getPage?: Maybe<Page>
  queryPage?: Maybe<Array<Maybe<Page>>>
  aggregatePage?: Maybe<PageAggregateResult>
  getLibrary?: Maybe<Library>
  queryLibrary?: Maybe<Array<Maybe<Library>>>
  aggregateLibrary?: Maybe<LibraryAggregateResult>
  getComponent?: Maybe<Component>
  queryComponent?: Maybe<Array<Maybe<Component>>>
  aggregateComponent?: Maybe<ComponentAggregateResult>
  getAtom?: Maybe<Atom>
  queryAtom?: Maybe<Array<Maybe<Atom>>>
  aggregateAtom?: Maybe<AtomAggregateResult>
  queryTag?: Maybe<Array<Maybe<Tag>>>
  aggregateTag?: Maybe<TagAggregateResult>
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

export type QueryGetPageArgs = {
  id: Scalars['ID']
}

export type QueryQueryPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregatePageArgs = {
  filter?: Maybe<PageFilter>
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

export type QueryGetComponentArgs = {
  id: Scalars['ID']
}

export type QueryQueryComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateComponentArgs = {
  filter?: Maybe<ComponentFilter>
}

export type QueryGetAtomArgs = {
  id: Scalars['ID']
}

export type QueryQueryAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateAtomArgs = {
  filter?: Maybe<AtomFilter>
}

export type QueryQueryTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAggregateTagArgs = {
  filter?: Maybe<TagFilter>
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

export type StringFullTextFilter_StringTermFilter = {
  alloftext?: Maybe<Scalars['String']>
  anyoftext?: Maybe<Scalars['String']>
  allofterms?: Maybe<Scalars['String']>
  anyofterms?: Maybe<Scalars['String']>
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

export type Tag = {
  label: Scalars['String']
}

export type TagAggregateResult = {
  count?: Maybe<Scalars['Int']>
  labelMin?: Maybe<Scalars['String']>
  labelMax?: Maybe<Scalars['String']>
}

export type TagFilter = {
  has?: Maybe<Array<Maybe<TagHasFilter>>>
  and?: Maybe<Array<Maybe<TagFilter>>>
  or?: Maybe<Array<Maybe<TagFilter>>>
  not?: Maybe<TagFilter>
}

export enum TagHasFilter {
  Label = 'label',
}

export type TagOrder = {
  asc?: Maybe<TagOrderable>
  desc?: Maybe<TagOrderable>
  then?: Maybe<TagOrder>
}

export enum TagOrderable {
  Label = 'label',
}

export type TagPatch = {
  label?: Maybe<Scalars['String']>
}

export type TagRef = {
  label?: Maybe<Scalars['String']>
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

export type UpdateAtomInput = {
  filter: AtomFilter
  set?: Maybe<AtomPatch>
  remove?: Maybe<AtomPatch>
}

export type UpdateAtomPayload = {
  atom?: Maybe<Array<Maybe<Atom>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateAtomPayloadAtomArgs = {
  filter?: Maybe<AtomFilter>
  order?: Maybe<AtomOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateComponentInput = {
  filter: ComponentFilter
  set?: Maybe<ComponentPatch>
  remove?: Maybe<ComponentPatch>
}

export type UpdateComponentPayload = {
  component?: Maybe<Array<Maybe<Component>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateComponentPayloadComponentArgs = {
  filter?: Maybe<ComponentFilter>
  order?: Maybe<ComponentOrder>
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

export type UpdatePageInput = {
  filter: PageFilter
  set?: Maybe<PagePatch>
  remove?: Maybe<PagePatch>
}

export type UpdatePagePayload = {
  page?: Maybe<Array<Maybe<Page>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdatePagePayloadPageArgs = {
  filter?: Maybe<PageFilter>
  order?: Maybe<PageOrder>
  first?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UpdateTagInput = {
  filter: TagFilter
  set?: Maybe<TagPatch>
  remove?: Maybe<TagPatch>
}

export type UpdateTagPayload = {
  tag?: Maybe<Array<Maybe<Tag>>>
  numUids?: Maybe<Scalars['Int']>
}

export type UpdateTagPayloadTagArgs = {
  filter?: Maybe<TagFilter>
  order?: Maybe<TagOrder>
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

export type User__AppFragment = Pick<App, 'id' | 'name'>

export type CreateAppMutationVariables = Exact<{
  input: AddAppInput
}>

export type CreateAppMutation = {
  addApp?: Maybe<{ app?: Maybe<Array<Maybe<User__AppFragment>>> }>
}

export type DeleteAppMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteAppMutation = {
  app?: Maybe<{ app?: Maybe<Array<Maybe<User__AppFragment>>> }>
}

export type GetAppQueryVariables = Exact<{
  appId: Scalars['ID']
}>

export type GetAppQuery = { app?: Maybe<User__AppFragment> }

export type GetAppsListQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsListQuery = { apps?: Maybe<Array<Maybe<User__AppFragment>>> }

export type EditAppMutationVariables = Exact<{
  input: AppPatch
  id: Scalars['ID']
}>

export type EditAppMutation = {
  updateApp?: Maybe<{ app?: Maybe<Array<Maybe<User__AppFragment>>> }>
}

export type __AtomFragment = Pick<Atom, 'id' | 'type' | 'label'>

export type LibraryExplorer__AtomFragment = Pick<Atom, 'id' | 'label' | 'type'>

export type CreateAtomMutationVariables = Exact<{
  input: Array<AddAtomInput> | AddAtomInput
}>

export type CreateAtomMutation = {
  addAtom?: Maybe<{ atom?: Maybe<Array<Maybe<__AtomFragment>>> }>
}

export type DeleteAtomMutationVariables = Exact<{
  filter: AtomFilter
}>

export type DeleteAtomMutation = {
  deleteAtom?: Maybe<Pick<DeleteAtomPayload, 'msg' | 'numUids'>>
}

export type GetAtomsQueryVariables = Exact<{
  filter?: Maybe<AtomFilter>
}>

export type GetAtomsQuery = { queryAtom?: Maybe<Array<Maybe<__AtomFragment>>> }

export type UpdateAtomMutationVariables = Exact<{
  input: UpdateAtomInput
}>

export type UpdateAtomMutation = {
  updateAtom?: Maybe<
    Pick<UpdateAtomPayload, 'numUids'> & {
      atom?: Maybe<Array<Maybe<__AtomFragment>>>
    }
  >
}

export type __ComponentFragment = Pick<Component, 'id' | 'label'>

export type LibraryExplorer__ComponentFragment = Pick<Component, 'id' | 'label'>

export type CreateComponentMutationVariables = Exact<{
  input: Array<AddComponentInput> | AddComponentInput
}>

export type CreateComponentMutation = {
  components?: Maybe<{
    component?: Maybe<Array<Maybe<Pick<Component, 'id' | 'label'>>>>
  }>
}

export type DeleteComponentMutationVariables = Exact<{
  filter: ComponentFilter
}>

export type DeleteComponentMutation = {
  deleteComponent?: Maybe<Pick<DeleteComponentPayload, 'numUids' | 'msg'>>
}

export type GetComponentDetailQueryVariables = Exact<{
  componentId: Scalars['ID']
}>

export type GetComponentDetailQuery = { component?: Maybe<__ComponentFragment> }

export type GetComponentsQueryVariables = Exact<{
  filter?: Maybe<ComponentFilter>
}>

export type GetComponentsQuery = {
  components?: Maybe<Array<Maybe<Pick<Component, 'id' | 'label'>>>>
}

export type __LibraryFragment = Pick<Library, 'id' | 'name'>

export type CreateLibraryMutationVariables = Exact<{
  input: Array<AddLibraryInput> | AddLibraryInput
}>

export type CreateLibraryMutation = {
  libraries?: Maybe<{ library?: Maybe<Array<Maybe<__LibraryFragment>>> }>
}

export type LibraryExplorerQueryVariables = Exact<{
  filter?: Maybe<LibraryFilter>
}>

export type LibraryExplorerQuery = {
  libraries?: Maybe<Array<Maybe<LibraryExplorer__LibraryFragment>>>
}

export type LibraryExplorer__LibraryFragment = Pick<Library, 'id' | 'name'> & {
  atoms?: Maybe<Array<Maybe<LibraryExplorer__AtomFragment>>>
  components?: Maybe<Array<Maybe<LibraryExplorer__ComponentFragment>>>
}

export type App__PageFragment = Pick<Page, 'id' | 'title'>

export type CreatePageMutationVariables = Exact<{
  input: AddPageInput
}>

export type CreatePageMutation = {
  page?: Maybe<{ page?: Maybe<Array<Maybe<App__PageFragment>>> }>
}

export type DeletePageMutationVariables = Exact<{
  pageId: Scalars['ID']
}>

export type DeletePageMutation = {
  page?: Maybe<{ page?: Maybe<Array<Maybe<App__PageFragment>>> }>
}

export type GetPageQueryVariables = Exact<{
  pageId: Scalars['ID']
}>

export type GetPageQuery = { page?: Maybe<App__PageFragment> }

export type GetPagesListQueryVariables = Exact<{
  appId: Scalars['ID']
}>

export type GetPagesListQuery = {
  app?: Maybe<{ pages?: Maybe<Array<Maybe<App__PageFragment>>> }>
}

export type UpdatePageMutationVariables = Exact<{
  input: PagePatch
  pageId: Scalars['ID']
}>

export type UpdatePageMutation = {
  page?: Maybe<{ page?: Maybe<Array<Maybe<App__PageFragment>>> }>
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

export const User__AppFragmentDoc = gql`
  fragment User__App on App {
    id
    name
  }
`
export const __AtomFragmentDoc = gql`
  fragment __Atom on Atom {
    id
    type
    label
  }
`
export const __ComponentFragmentDoc = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const __LibraryFragmentDoc = gql`
  fragment __Library on Library {
    id
    name
  }
`
export const LibraryExplorer__AtomFragmentDoc = gql`
  fragment LibraryExplorer__Atom on Atom {
    id
    label
    type
  }
`
export const LibraryExplorer__ComponentFragmentDoc = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
`
export const LibraryExplorer__LibraryFragmentDoc = gql`
  fragment LibraryExplorer__Library on Library {
    id
    name
    atoms {
      ...LibraryExplorer__Atom
    }
    components {
      ...LibraryExplorer__Component
    }
  }
  ${LibraryExplorer__AtomFragmentDoc}
  ${LibraryExplorer__ComponentFragmentDoc}
`
export const App__PageFragmentDoc = gql`
  fragment App__Page on Page {
    id
    title
  }
`
export const __UserFragmentDoc = gql`
  fragment __User on User {
    id
    email
  }
`
export const CreateAppGql = gql`
  mutation CreateApp($input: AddAppInput!) {
    addApp(input: [$input]) {
      app {
        ...User__App
      }
    }
  }
  ${User__AppFragmentDoc}
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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(
    CreateAppGql,
    options,
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
  mutation DeleteApp($id: ID!) {
    app: deleteApp(filter: { id: [$id] }) {
      app {
        ...User__App
      }
    }
  }
  ${User__AppFragmentDoc}
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppGql,
    options,
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
  query GetApp($appId: ID!) {
    app: getApp(id: $appId) {
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
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(GetAppGql, options)
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppGql,
    options,
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export function refetchGetAppQuery(variables?: GetAppQueryVariables) {
  return { query: GetAppGql, variables: variables }
}
export const GetAppsListGql = gql`
  query GetAppsList {
    apps: queryApp {
      ...User__App
    }
  }
  ${User__AppFragmentDoc}
`

/**
 * __useGetAppsListQuery__
 *
 * To run a query within a React component, call `useGetAppsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAppsListQuery,
    GetAppsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppsListQuery, GetAppsListQueryVariables>(
    GetAppsListGql,
    options,
  )
}
export function useGetAppsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsListQuery,
    GetAppsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppsListQuery, GetAppsListQueryVariables>(
    GetAppsListGql,
    options,
  )
}
export type GetAppsListQueryHookResult = ReturnType<typeof useGetAppsListQuery>
export type GetAppsListLazyQueryHookResult = ReturnType<
  typeof useGetAppsListLazyQuery
>
export type GetAppsListQueryResult = Apollo.QueryResult<
  GetAppsListQuery,
  GetAppsListQueryVariables
>
export function refetchGetAppsListQuery(variables?: GetAppsListQueryVariables) {
  return { query: GetAppsListGql, variables: variables }
}
export const EditAppGql = gql`
  mutation EditApp($input: AppPatch!, $id: ID!) {
    updateApp(input: { filter: { id: [$id] }, set: $input }) {
      app {
        ...User__App
      }
    }
  }
  ${User__AppFragmentDoc}
`
export type EditAppMutationFn = Apollo.MutationFunction<
  EditAppMutation,
  EditAppMutationVariables
>

/**
 * __useEditAppMutation__
 *
 * To run a mutation, you first call `useEditAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAppMutation, { data, loading, error }] = useEditAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAppMutation,
    EditAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditAppMutation, EditAppMutationVariables>(
    EditAppGql,
    options,
  )
}
export type EditAppMutationHookResult = ReturnType<typeof useEditAppMutation>
export type EditAppMutationResult = Apollo.MutationResult<EditAppMutation>
export type EditAppMutationOptions = Apollo.BaseMutationOptions<
  EditAppMutation,
  EditAppMutationVariables
>
export const CreateAtomGql = gql`
  mutation CreateAtom($input: [AddAtomInput!]!) {
    addAtom(input: $input) {
      atom {
        ...__Atom
      }
    }
  }
  ${__AtomFragmentDoc}
`
export type CreateAtomMutationFn = Apollo.MutationFunction<
  CreateAtomMutation,
  CreateAtomMutationVariables
>

/**
 * __useCreateAtomMutation__
 *
 * To run a mutation, you first call `useCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAtomMutation, { data, loading, error }] = useCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAtomMutation,
    CreateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAtomMutation, CreateAtomMutationVariables>(
    CreateAtomGql,
    options,
  )
}
export type CreateAtomMutationHookResult = ReturnType<
  typeof useCreateAtomMutation
>
export type CreateAtomMutationResult = Apollo.MutationResult<CreateAtomMutation>
export type CreateAtomMutationOptions = Apollo.BaseMutationOptions<
  CreateAtomMutation,
  CreateAtomMutationVariables
>
export const DeleteAtomGql = gql`
  mutation DeleteAtom($filter: AtomFilter!) {
    deleteAtom(filter: $filter) {
      msg
      numUids
    }
  }
`
export type DeleteAtomMutationFn = Apollo.MutationFunction<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>

/**
 * __useDeleteAtomMutation__
 *
 * To run a mutation, you first call `useDeleteAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAtomMutation, { data, loading, error }] = useDeleteAtomMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDeleteAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAtomMutation,
    DeleteAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAtomMutation, DeleteAtomMutationVariables>(
    DeleteAtomGql,
    options,
  )
}
export type DeleteAtomMutationHookResult = ReturnType<
  typeof useDeleteAtomMutation
>
export type DeleteAtomMutationResult = Apollo.MutationResult<DeleteAtomMutation>
export type DeleteAtomMutationOptions = Apollo.BaseMutationOptions<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>
export const GetAtomsGql = gql`
  query GetAtoms($filter: AtomFilter) {
    queryAtom(filter: $filter) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`

/**
 * __useGetAtomsQuery__
 *
 * To run a query within a React component, call `useGetAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAtomsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAtomsQuery, GetAtomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export function useGetAtomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsQuery,
    GetAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export type GetAtomsQueryHookResult = ReturnType<typeof useGetAtomsQuery>
export type GetAtomsLazyQueryHookResult = ReturnType<
  typeof useGetAtomsLazyQuery
>
export type GetAtomsQueryResult = Apollo.QueryResult<
  GetAtomsQuery,
  GetAtomsQueryVariables
>
export function refetchGetAtomsQuery(variables?: GetAtomsQueryVariables) {
  return { query: GetAtomsGql, variables: variables }
}
export const UpdateAtomGql = gql`
  mutation UpdateATOM($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      numUids
      atom {
        ...__Atom
      }
    }
  }
  ${__AtomFragmentDoc}
`
export type UpdateAtomMutationFn = Apollo.MutationFunction<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>

/**
 * __useUpdateAtomMutation__
 *
 * To run a mutation, you first call `useUpdateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAtomMutation, { data, loading, error }] = useUpdateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAtomMutation,
    UpdateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAtomMutation, UpdateAtomMutationVariables>(
    UpdateAtomGql,
    options,
  )
}
export type UpdateAtomMutationHookResult = ReturnType<
  typeof useUpdateAtomMutation
>
export type UpdateAtomMutationResult = Apollo.MutationResult<UpdateAtomMutation>
export type UpdateAtomMutationOptions = Apollo.BaseMutationOptions<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>
export const CreateComponentGql = gql`
  mutation CreateComponent($input: [AddComponentInput!]!) {
    components: addComponent(input: $input) {
      component {
        id
        label
      }
    }
  }
`
export type CreateComponentMutationFn = Apollo.MutationFunction<
  CreateComponentMutation,
  CreateComponentMutationVariables
>

/**
 * __useCreateComponentMutation__
 *
 * To run a mutation, you first call `useCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComponentMutation, { data, loading, error }] = useCreateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >(CreateComponentGql, options)
}
export type CreateComponentMutationHookResult = ReturnType<
  typeof useCreateComponentMutation
>
export type CreateComponentMutationResult = Apollo.MutationResult<CreateComponentMutation>
export type CreateComponentMutationOptions = Apollo.BaseMutationOptions<
  CreateComponentMutation,
  CreateComponentMutationVariables
>
export const DeleteComponentGql = gql`
  mutation DeleteComponent($filter: ComponentFilter!) {
    deleteComponent(filter: $filter) {
      numUids
      msg
    }
  }
`
export type DeleteComponentMutationFn = Apollo.MutationFunction<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>

/**
 * __useDeleteComponentMutation__
 *
 * To run a mutation, you first call `useDeleteComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComponentMutation, { data, loading, error }] = useDeleteComponentMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDeleteComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >(DeleteComponentGql, options)
}
export type DeleteComponentMutationHookResult = ReturnType<
  typeof useDeleteComponentMutation
>
export type DeleteComponentMutationResult = Apollo.MutationResult<DeleteComponentMutation>
export type DeleteComponentMutationOptions = Apollo.BaseMutationOptions<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>
export const GetComponentDetailGql = gql`
  query GetComponentDetail($componentId: ID!) {
    component: getComponent(id: $componentId) {
      ...__Component
    }
  }
  ${__ComponentFragmentDoc}
`

/**
 * __useGetComponentDetailQuery__
 *
 * To run a query within a React component, call `useGetComponentDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentDetailQuery({
 *   variables: {
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useGetComponentDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >(GetComponentDetailGql, options)
}
export function useGetComponentDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >(GetComponentDetailGql, options)
}
export type GetComponentDetailQueryHookResult = ReturnType<
  typeof useGetComponentDetailQuery
>
export type GetComponentDetailLazyQueryHookResult = ReturnType<
  typeof useGetComponentDetailLazyQuery
>
export type GetComponentDetailQueryResult = Apollo.QueryResult<
  GetComponentDetailQuery,
  GetComponentDetailQueryVariables
>
export function refetchGetComponentDetailQuery(
  variables?: GetComponentDetailQueryVariables,
) {
  return { query: GetComponentDetailGql, variables: variables }
}
export const GetComponentsGql = gql`
  query GetComponents($filter: ComponentFilter) {
    components: queryComponent(filter: $filter) {
      id
      label
    }
  }
`

/**
 * __useGetComponentsQuery__
 *
 * To run a query within a React component, call `useGetComponentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetComponentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetComponentsQuery,
    GetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetComponentsQuery, GetComponentsQueryVariables>(
    GetComponentsGql,
    options,
  )
}
export function useGetComponentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentsQuery,
    GetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetComponentsQuery, GetComponentsQueryVariables>(
    GetComponentsGql,
    options,
  )
}
export type GetComponentsQueryHookResult = ReturnType<
  typeof useGetComponentsQuery
>
export type GetComponentsLazyQueryHookResult = ReturnType<
  typeof useGetComponentsLazyQuery
>
export type GetComponentsQueryResult = Apollo.QueryResult<
  GetComponentsQuery,
  GetComponentsQueryVariables
>
export function refetchGetComponentsQuery(
  variables?: GetComponentsQueryVariables,
) {
  return { query: GetComponentsGql, variables: variables }
}
export const CreateLibraryGql = gql`
  mutation CreateLibrary($input: [AddLibraryInput!]!) {
    libraries: addLibrary(input: $input) {
      library {
        ...__Library
      }
    }
  }
  ${__LibraryFragmentDoc}
`
export type CreateLibraryMutationFn = Apollo.MutationFunction<
  CreateLibraryMutation,
  CreateLibraryMutationVariables
>

/**
 * __useCreateLibraryMutation__
 *
 * To run a mutation, you first call `useCreateLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLibraryMutation, { data, loading, error }] = useCreateLibraryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLibraryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLibraryMutation,
    CreateLibraryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateLibraryMutation,
    CreateLibraryMutationVariables
  >(CreateLibraryGql, options)
}
export type CreateLibraryMutationHookResult = ReturnType<
  typeof useCreateLibraryMutation
>
export type CreateLibraryMutationResult = Apollo.MutationResult<CreateLibraryMutation>
export type CreateLibraryMutationOptions = Apollo.BaseMutationOptions<
  CreateLibraryMutation,
  CreateLibraryMutationVariables
>
export const LibraryExplorerGql = gql`
  query LibraryExplorer($filter: LibraryFilter) {
    libraries: queryLibrary(filter: $filter) {
      ...LibraryExplorer__Library
    }
  }
  ${LibraryExplorer__LibraryFragmentDoc}
`

/**
 * __useLibraryExplorerQuery__
 *
 * To run a query within a React component, call `useLibraryExplorerQuery` and pass it any options that fit your needs.
 * When your component renders, `useLibraryExplorerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLibraryExplorerQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLibraryExplorerQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LibraryExplorerQuery, LibraryExplorerQueryVariables>(
    LibraryExplorerGql,
    options,
  )
}
export function useLibraryExplorerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    LibraryExplorerQuery,
    LibraryExplorerQueryVariables
  >(LibraryExplorerGql, options)
}
export type LibraryExplorerQueryHookResult = ReturnType<
  typeof useLibraryExplorerQuery
>
export type LibraryExplorerLazyQueryHookResult = ReturnType<
  typeof useLibraryExplorerLazyQuery
>
export type LibraryExplorerQueryResult = Apollo.QueryResult<
  LibraryExplorerQuery,
  LibraryExplorerQueryVariables
>
export function refetchLibraryExplorerQuery(
  variables?: LibraryExplorerQueryVariables,
) {
  return { query: LibraryExplorerGql, variables: variables }
}
export const CreatePageGql = gql`
  mutation CreatePage($input: AddPageInput!) {
    page: addPage(input: [$input]) {
      page {
        ...App__Page
      }
    }
  }
  ${App__PageFragmentDoc}
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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(
    CreatePageGql,
    options,
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
  mutation DeletePage($pageId: ID!) {
    page: deletePage(filter: { id: [$pageId] }) {
      page {
        ...App__Page
      }
    }
  }
  ${App__PageFragmentDoc}
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
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageGql,
    options,
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
  query GetPage($pageId: ID!) {
    page: getPage(id: $pageId) {
      ...App__Page
    }
  }
  ${App__PageFragmentDoc}
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
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuery,
    GetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = Apollo.QueryResult<
  GetPageQuery,
  GetPageQueryVariables
>
export function refetchGetPageQuery(variables?: GetPageQueryVariables) {
  return { query: GetPageGql, variables: variables }
}
export const GetPagesListGql = gql`
  query GetPagesList($appId: ID!) {
    app: getApp(id: $appId) {
      pages {
        ...App__Page
      }
    }
  }
  ${App__PageFragmentDoc}
`

/**
 * __useGetPagesListQuery__
 *
 * To run a query within a React component, call `useGetPagesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesListQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetPagesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPagesListQuery,
    GetPagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPagesListQuery, GetPagesListQueryVariables>(
    GetPagesListGql,
    options,
  )
}
export function useGetPagesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesListQuery,
    GetPagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPagesListQuery, GetPagesListQueryVariables>(
    GetPagesListGql,
    options,
  )
}
export type GetPagesListQueryHookResult = ReturnType<
  typeof useGetPagesListQuery
>
export type GetPagesListLazyQueryHookResult = ReturnType<
  typeof useGetPagesListLazyQuery
>
export type GetPagesListQueryResult = Apollo.QueryResult<
  GetPagesListQuery,
  GetPagesListQueryVariables
>
export function refetchGetPagesListQuery(
  variables?: GetPagesListQueryVariables,
) {
  return { query: GetPagesListGql, variables: variables }
}
export const UpdatePageGql = gql`
  mutation UpdatePage($input: PagePatch!, $pageId: ID!) {
    page: updatePage(input: { filter: { id: [$pageId] }, set: $input }) {
      page {
        ...App__Page
      }
    }
  }
  ${App__PageFragmentDoc}
`
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
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageMutation,
    UpdatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(
    UpdatePageGql,
    options,
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
export const User__App = gql`
  fragment User__App on App {
    id
    name
  }
`
export const __Atom = gql`
  fragment __Atom on Atom {
    id
    type
    label
  }
`
export const __Component = gql`
  fragment __Component on Component {
    id
    label
  }
`
export const __Library = gql`
  fragment __Library on Library {
    id
    name
  }
`
export const LibraryExplorer__Atom = gql`
  fragment LibraryExplorer__Atom on Atom {
    id
    label
    type
  }
`
export const LibraryExplorer__Component = gql`
  fragment LibraryExplorer__Component on Component {
    id
    label
  }
`
export const LibraryExplorer__Library = gql`
  fragment LibraryExplorer__Library on Library {
    id
    name
    atoms {
      ...LibraryExplorer__Atom
    }
    components {
      ...LibraryExplorer__Component
    }
  }
  ${LibraryExplorer__Atom}
  ${LibraryExplorer__Component}
`
export const App__Page = gql`
  fragment App__Page on Page {
    id
    title
  }
`
export const __User = gql`
  fragment __User on User {
    id
    email
  }
`
export const CreateApp = gql`
  mutation CreateApp($input: AddAppInput!) {
    addApp(input: [$input]) {
      app {
        ...User__App
      }
    }
  }
  ${User__App}
`
export const DeleteApp = gql`
  mutation DeleteApp($id: ID!) {
    app: deleteApp(filter: { id: [$id] }) {
      app {
        ...User__App
      }
    }
  }
  ${User__App}
`
export const GetApp = gql`
  query GetApp($appId: ID!) {
    app: getApp(id: $appId) {
      ...User__App
    }
  }
  ${User__App}
`
export const GetAppsList = gql`
  query GetAppsList {
    apps: queryApp {
      ...User__App
    }
  }
  ${User__App}
`
export const EditApp = gql`
  mutation EditApp($input: AppPatch!, $id: ID!) {
    updateApp(input: { filter: { id: [$id] }, set: $input }) {
      app {
        ...User__App
      }
    }
  }
  ${User__App}
`
export const CreateAtom = gql`
  mutation CreateAtom($input: [AddAtomInput!]!) {
    addAtom(input: $input) {
      atom {
        ...__Atom
      }
    }
  }
  ${__Atom}
`
export const DeleteAtom = gql`
  mutation DeleteAtom($filter: AtomFilter!) {
    deleteAtom(filter: $filter) {
      msg
      numUids
    }
  }
`
export const GetAtoms = gql`
  query GetAtoms($filter: AtomFilter) {
    queryAtom(filter: $filter) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const UpdateAtom = gql`
  mutation UpdateATOM($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      numUids
      atom {
        ...__Atom
      }
    }
  }
  ${__Atom}
`
export const CreateComponent = gql`
  mutation CreateComponent($input: [AddComponentInput!]!) {
    components: addComponent(input: $input) {
      component {
        id
        label
      }
    }
  }
`
export const DeleteComponent = gql`
  mutation DeleteComponent($filter: ComponentFilter!) {
    deleteComponent(filter: $filter) {
      numUids
      msg
    }
  }
`
export const GetComponentDetail = gql`
  query GetComponentDetail($componentId: ID!) {
    component: getComponent(id: $componentId) {
      ...__Component
    }
  }
  ${__Component}
`
export const GetComponents = gql`
  query GetComponents($filter: ComponentFilter) {
    components: queryComponent(filter: $filter) {
      id
      label
    }
  }
`
export const CreateLibrary = gql`
  mutation CreateLibrary($input: [AddLibraryInput!]!) {
    libraries: addLibrary(input: $input) {
      library {
        ...__Library
      }
    }
  }
  ${__Library}
`
export const LibraryExplorer = gql`
  query LibraryExplorer($filter: LibraryFilter) {
    libraries: queryLibrary(filter: $filter) {
      ...LibraryExplorer__Library
    }
  }
  ${LibraryExplorer__Library}
`
export const CreatePage = gql`
  mutation CreatePage($input: AddPageInput!) {
    page: addPage(input: [$input]) {
      page {
        ...App__Page
      }
    }
  }
  ${App__Page}
`
export const DeletePage = gql`
  mutation DeletePage($pageId: ID!) {
    page: deletePage(filter: { id: [$pageId] }) {
      page {
        ...App__Page
      }
    }
  }
  ${App__Page}
`
export const GetPage = gql`
  query GetPage($pageId: ID!) {
    page: getPage(id: $pageId) {
      ...App__Page
    }
  }
  ${App__Page}
`
export const GetPagesList = gql`
  query GetPagesList($appId: ID!) {
    app: getApp(id: $appId) {
      pages {
        ...App__Page
      }
    }
  }
  ${App__Page}
`
export const UpdatePage = gql`
  mutation UpdatePage($input: PagePatch!, $pageId: ID!) {
    page: updatePage(input: { filter: { id: [$pageId] }, set: $input }) {
      page {
        ...App__Page
      }
    }
  }
  ${App__Page}
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
