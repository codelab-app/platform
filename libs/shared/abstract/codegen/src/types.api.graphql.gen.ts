export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type ActionBase = {
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit: Scalars['Boolean']
  store: Store
  storeConnection: ActionBaseStoreConnection
  type: ActionKind
}

export type ActionBaseStoreConnectFieldInput = {
  connect?: InputMaybe<StoreConnectInput>
  where?: InputMaybe<StoreConnectWhere>
}

export type ActionBaseStoreConnectOrCreateFieldInput = {
  onCreate: ActionBaseStoreConnectOrCreateFieldInputOnCreate
  where: StoreConnectOrCreateWhere
}

export type ActionBaseStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type ActionBaseStoreConnection = {
  __typename?: 'ActionBaseStoreConnection'
  edges: Array<ActionBaseStoreRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ActionBaseStoreConnectionSort = {
  node?: InputMaybe<StoreSort>
}

export type ActionBaseStoreConnectionWhere = {
  AND?: InputMaybe<Array<ActionBaseStoreConnectionWhere>>
  OR?: InputMaybe<Array<ActionBaseStoreConnectionWhere>>
  node?: InputMaybe<StoreWhere>
  node_NOT?: InputMaybe<StoreWhere>
}

export type ActionBaseStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type ActionBaseStoreDeleteFieldInput = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type ActionBaseStoreDisconnectFieldInput = {
  disconnect?: InputMaybe<StoreDisconnectInput>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type ActionBaseStoreFieldInput = {
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>
}

export type ActionBaseStoreRelationship = {
  __typename?: 'ActionBaseStoreRelationship'
  cursor: Scalars['String']
  node: Store
}

export type ActionBaseStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type ActionBaseStoreUpdateFieldInput = {
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>
  delete?: InputMaybe<ActionBaseStoreDeleteFieldInput>
  disconnect?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
  update?: InputMaybe<ActionBaseStoreUpdateConnectionInput>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export enum ActionKind {
  /** Action with custom code */
  CustomAction = 'CustomAction',
  /** Represents a list of actions that runs in a certain order */
  PipelineAction = 'PipelineAction',
  /** Action responsible for fetching data from a resource */
  ResourceAction = 'ResourceAction',
}

/** Allows picking a action from the list of actions */
export type ActionType = TypeBase & {
  __typename?: 'ActionType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ActionTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type ActionTypeAggregateSelection = {
  __typename?: 'ActionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ActionTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ActionTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ActionTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ActionTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ActionTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ActionTypeEdge = {
  __typename?: 'ActionTypeEdge'
  cursor: Scalars['String']
  node: ActionType
}

export type ActionTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ActionTypeSort objects to sort ActionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionTypeSort>>
}

export type ActionTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ActionTypeOwnerNodeAggregationWhereInput>
}

export type ActionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ActionTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ActionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionTypeSort object. */
export type ActionTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ActionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type ActionTypeUserOwnerAggregationSelection = {
  __typename?: 'ActionTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ActionTypeUserOwnerNodeAggregateSelection>
}

export type ActionTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ActionTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ActionTypeWhere = {
  AND?: InputMaybe<Array<ActionTypeWhere>>
  OR?: InputMaybe<Array<ActionTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ActionTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type ActionTypesConnection = {
  __typename?: 'ActionTypesConnection'
  edges: Array<ActionTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ActionsPipeLine = {
  orders?: Maybe<Array<Scalars['String']>>
}

export type ActionsPipeLineCreateInput = {
  orders?: InputMaybe<Array<Scalars['String']>>
}

export type ActionsPipeLineSort = {
  orders?: InputMaybe<SortDirection>
}

export type ActionsPipeLineUpdateInput = {
  orders?: InputMaybe<Array<Scalars['String']>>
}

export type ActionsPipeLineWhere = {
  AND?: InputMaybe<Array<ActionsPipeLineWhere>>
  OR?: InputMaybe<Array<ActionsPipeLineWhere>>
  orders?: InputMaybe<Array<Scalars['String']>>
  orders_INCLUDES?: InputMaybe<Scalars['String']>
  orders_NOT?: InputMaybe<Array<Scalars['String']>>
  orders_NOT_INCLUDES?: InputMaybe<Scalars['String']>
}

export type AnyAction = CustomAction | PipelineAction | ResourceAction

export type AnyActionWhere = {
  CustomAction?: InputMaybe<CustomActionWhere>
  PipelineAction?: InputMaybe<PipelineActionWhere>
  ResourceAction?: InputMaybe<ResourceActionWhere>
}

export type App = WithOwner & {
  __typename?: 'App'
  domains: Array<Domain>
  domainsAggregate?: Maybe<AppDomainDomainsAggregationSelection>
  domainsConnection: AppDomainsConnection
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  ownerConnection: WithOwnerOwnerConnection
  pages: Array<Page>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  pagesConnection: AppPagesConnection
  slug: Scalars['String']
  store: Store
  storeAggregate?: Maybe<AppStoreStoreAggregationSelection>
  storeConnection: AppStoreConnection
}

export type AppDomainsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<DomainOptions>
  where?: InputMaybe<DomainWhere>
}

export type AppDomainsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<DomainWhere>
}

export type AppDomainsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppDomainsConnectionSort>>
  where?: InputMaybe<AppDomainsConnectionWhere>
}

export type AppOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type AppOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

export type AppOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type AppPagesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type AppPagesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PageWhere>
}

export type AppPagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppPagesConnectionSort>>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type AppStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type AppStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppStoreConnectionSort>>
  where?: InputMaybe<AppStoreConnectionWhere>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type AppConnectInput = {
  domains?: InputMaybe<Array<AppDomainsConnectFieldInput>>
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>
  store?: InputMaybe<AppStoreConnectFieldInput>
}

export type AppConnectOrCreateInput = {
  domains?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  store?: InputMaybe<AppStoreConnectOrCreateFieldInput>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  domains?: InputMaybe<AppDomainsFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
  pages?: InputMaybe<AppPagesFieldInput>
  slug: Scalars['String']
  store?: InputMaybe<AppStoreFieldInput>
}

export type AppDeleteInput = {
  domains?: InputMaybe<Array<AppDomainsDeleteFieldInput>>
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  store?: InputMaybe<AppStoreDeleteFieldInput>
}

export type AppDisconnectInput = {
  domains?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  store?: InputMaybe<AppStoreDisconnectFieldInput>
}

export type AppDomainDomainsAggregationSelection = {
  __typename?: 'AppDomainDomainsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppDomainDomainsNodeAggregateSelection>
}

export type AppDomainDomainsNodeAggregateSelection = {
  __typename?: 'AppDomainDomainsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppDomainsAggregateInput = {
  AND?: InputMaybe<Array<AppDomainsAggregateInput>>
  OR?: InputMaybe<Array<AppDomainsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppDomainsNodeAggregationWhereInput>
}

export type AppDomainsConnectFieldInput = {
  connect?: InputMaybe<Array<DomainConnectInput>>
  where?: InputMaybe<DomainConnectWhere>
}

export type AppDomainsConnectOrCreateFieldInput = {
  onCreate: AppDomainsConnectOrCreateFieldInputOnCreate
  where: DomainConnectOrCreateWhere
}

export type AppDomainsConnectOrCreateFieldInputOnCreate = {
  node: DomainOnCreateInput
}

export type AppDomainsConnection = {
  __typename?: 'AppDomainsConnection'
  edges: Array<AppDomainsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppDomainsConnectionSort = {
  node?: InputMaybe<DomainSort>
}

export type AppDomainsConnectionWhere = {
  AND?: InputMaybe<Array<AppDomainsConnectionWhere>>
  OR?: InputMaybe<Array<AppDomainsConnectionWhere>>
  node?: InputMaybe<DomainWhere>
  node_NOT?: InputMaybe<DomainWhere>
}

export type AppDomainsCreateFieldInput = {
  node: DomainCreateInput
}

export type AppDomainsDeleteFieldInput = {
  delete?: InputMaybe<DomainDeleteInput>
  where?: InputMaybe<AppDomainsConnectionWhere>
}

export type AppDomainsDisconnectFieldInput = {
  disconnect?: InputMaybe<DomainDisconnectInput>
  where?: InputMaybe<AppDomainsConnectionWhere>
}

export type AppDomainsFieldInput = {
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>
}

export type AppDomainsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppDomainsRelationship = {
  __typename?: 'AppDomainsRelationship'
  cursor: Scalars['String']
  node: Domain
}

export type AppDomainsUpdateConnectionInput = {
  node?: InputMaybe<DomainUpdateInput>
}

export type AppDomainsUpdateFieldInput = {
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>
  delete?: InputMaybe<Array<AppDomainsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>
  update?: InputMaybe<AppDomainsUpdateConnectionInput>
  where?: InputMaybe<AppDomainsConnectionWhere>
}

export type AppEdge = {
  __typename?: 'AppEdge'
  cursor: Scalars['String']
  node: App
}

export type AppOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
}

export type AppOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppSort>>
}

export type AppOwnerAggregateInput = {
  AND?: InputMaybe<Array<AppOwnerAggregateInput>>
  OR?: InputMaybe<Array<AppOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppOwnerNodeAggregationWhereInput>
}

export type AppOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppPagePagesAggregationSelection = {
  __typename?: 'AppPagePagesAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppPagePagesNodeAggregateSelection>
}

export type AppPagePagesNodeAggregateSelection = {
  __typename?: 'AppPagePagesNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type AppPagesAggregateInput = {
  AND?: InputMaybe<Array<AppPagesAggregateInput>>
  OR?: InputMaybe<Array<AppPagesAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppPagesNodeAggregationWhereInput>
}

export type AppPagesConnectFieldInput = {
  connect?: InputMaybe<Array<PageConnectInput>>
  where?: InputMaybe<PageConnectWhere>
}

export type AppPagesConnectOrCreateFieldInput = {
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate
  where: PageConnectOrCreateWhere
}

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput
}

export type AppPagesConnection = {
  __typename?: 'AppPagesConnection'
  edges: Array<AppPagesRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppPagesConnectionSort = {
  node?: InputMaybe<PageSort>
}

export type AppPagesConnectionWhere = {
  AND?: InputMaybe<Array<AppPagesConnectionWhere>>
  OR?: InputMaybe<Array<AppPagesConnectionWhere>>
  node?: InputMaybe<PageWhere>
  node_NOT?: InputMaybe<PageWhere>
}

export type AppPagesCreateFieldInput = {
  node: PageCreateInput
}

export type AppPagesDeleteFieldInput = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppPagesDisconnectFieldInput = {
  disconnect?: InputMaybe<PageDisconnectInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppPagesFieldInput = {
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
}

export type AppPagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppPagesRelationship = {
  __typename?: 'AppPagesRelationship'
  cursor: Scalars['String']
  node: Page
}

export type AppPagesUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>
}

export type AppPagesUpdateFieldInput = {
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
  delete?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  update?: InputMaybe<AppPagesUpdateConnectionInput>
  where?: InputMaybe<AppPagesConnectionWhere>
}

export type AppRelationInput = {
  domains?: InputMaybe<Array<AppDomainsCreateFieldInput>>
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>
  store?: InputMaybe<AppStoreCreateFieldInput>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  slug?: InputMaybe<SortDirection>
}

export type AppStoreAggregateInput = {
  AND?: InputMaybe<Array<AppStoreAggregateInput>>
  OR?: InputMaybe<Array<AppStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppStoreNodeAggregationWhereInput>
}

export type AppStoreConnectFieldInput = {
  connect?: InputMaybe<StoreConnectInput>
  where?: InputMaybe<StoreConnectWhere>
}

export type AppStoreConnectOrCreateFieldInput = {
  onCreate: AppStoreConnectOrCreateFieldInputOnCreate
  where: StoreConnectOrCreateWhere
}

export type AppStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type AppStoreConnection = {
  __typename?: 'AppStoreConnection'
  edges: Array<AppStoreRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppStoreConnectionSort = {
  node?: InputMaybe<StoreSort>
}

export type AppStoreConnectionWhere = {
  AND?: InputMaybe<Array<AppStoreConnectionWhere>>
  OR?: InputMaybe<Array<AppStoreConnectionWhere>>
  node?: InputMaybe<StoreWhere>
  node_NOT?: InputMaybe<StoreWhere>
}

export type AppStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type AppStoreDeleteFieldInput = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<AppStoreConnectionWhere>
}

export type AppStoreDisconnectFieldInput = {
  disconnect?: InputMaybe<StoreDisconnectInput>
  where?: InputMaybe<AppStoreConnectionWhere>
}

export type AppStoreFieldInput = {
  connect?: InputMaybe<AppStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>
  create?: InputMaybe<AppStoreCreateFieldInput>
}

export type AppStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppStoreRelationship = {
  __typename?: 'AppStoreRelationship'
  cursor: Scalars['String']
  node: Store
}

export type AppStoreStoreAggregationSelection = {
  __typename?: 'AppStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppStoreStoreNodeAggregateSelection>
}

export type AppStoreStoreNodeAggregateSelection = {
  __typename?: 'AppStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type AppStoreUpdateFieldInput = {
  connect?: InputMaybe<AppStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>
  create?: InputMaybe<AppStoreCreateFieldInput>
  delete?: InputMaybe<AppStoreDeleteFieldInput>
  disconnect?: InputMaybe<AppStoreDisconnectFieldInput>
  update?: InputMaybe<AppStoreUpdateConnectionInput>
  where?: InputMaybe<AppStoreConnectionWhere>
}

/** Allows picking a app from the list of apps */
export type AppType = TypeBase & {
  __typename?: 'AppType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type AppTypeAggregateSelection = {
  __typename?: 'AppTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type AppTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type AppTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type AppTypeEdge = {
  __typename?: 'AppTypeEdge'
  cursor: Scalars['String']
  node: AppType
}

export type AppTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more AppTypeSort objects to sort AppTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppTypeSort>>
}

export type AppTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<AppTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<AppTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppTypeOwnerNodeAggregationWhereInput>
}

export type AppTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type AppTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type AppTypeUserOwnerAggregationSelection = {
  __typename?: 'AppTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>
}

export type AppTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'AppTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type AppTypeWhere = {
  AND?: InputMaybe<Array<AppTypeWhere>>
  OR?: InputMaybe<Array<AppTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type AppTypesConnection = {
  __typename?: 'AppTypesConnection'
  edges: Array<AppTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type AppUpdateInput = {
  domains?: InputMaybe<Array<AppDomainsUpdateFieldInput>>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>
  slug?: InputMaybe<Scalars['String']>
  store?: InputMaybe<AppStoreUpdateFieldInput>
}

export type AppUserOwnerAggregationSelection = {
  __typename?: 'AppUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: 'AppUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type AppWhere = {
  AND?: InputMaybe<Array<AppWhere>>
  OR?: InputMaybe<Array<AppWhere>>
  domainsAggregate?: InputMaybe<AppDomainsAggregateInput>
  domainsConnection_ALL?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_NONE?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_SINGLE?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_SOME?: InputMaybe<AppDomainsConnectionWhere>
  /** Return Apps where all of the related Domains match this filter */
  domains_ALL?: InputMaybe<DomainWhere>
  /** Return Apps where none of the related Domains match this filter */
  domains_NONE?: InputMaybe<DomainWhere>
  /** Return Apps where one of the related Domains match this filter */
  domains_SINGLE?: InputMaybe<DomainWhere>
  /** Return Apps where some of the related Domains match this filter */
  domains_SOME?: InputMaybe<DomainWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  pagesAggregate?: InputMaybe<AppPagesAggregateInput>
  pagesConnection_ALL?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_NONE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SINGLE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SOME?: InputMaybe<AppPagesConnectionWhere>
  /** Return Apps where all of the related Pages match this filter */
  pages_ALL?: InputMaybe<PageWhere>
  /** Return Apps where none of the related Pages match this filter */
  pages_NONE?: InputMaybe<PageWhere>
  /** Return Apps where one of the related Pages match this filter */
  pages_SINGLE?: InputMaybe<PageWhere>
  /** Return Apps where some of the related Pages match this filter */
  pages_SOME?: InputMaybe<PageWhere>
  slug?: InputMaybe<Scalars['String']>
  slug_CONTAINS?: InputMaybe<Scalars['String']>
  slug_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT?: InputMaybe<Scalars['String']>
  slug_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_STARTS_WITH?: InputMaybe<Scalars['String']>
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<AppStoreAggregateInput>
  storeConnection?: InputMaybe<AppStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<AppStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
}

export type AppsConnection = {
  __typename?: 'AppsConnection'
  edges: Array<AppEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = TypeBase &
  WithDescendants & {
    __typename?: 'ArrayType'
    descendantTypesIds: Array<Scalars['ID']>
    id: Scalars['ID']
    itemType: TypeBase
    itemTypeConnection: ArrayTypeItemTypeConnection
    kind: TypeKind
    name: Scalars['String']
    owner: User
    ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>
    ownerConnection: TypeBaseOwnerConnection
  }

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ArrayTypeItemTypeConnectionSort>>
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type ArrayTypeAggregateSelection = {
  __typename?: 'ArrayTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ArrayTypeConnectInput = {
  itemType?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ArrayTypeCreateInput = {
  id: Scalars['ID']
  itemType?: InputMaybe<ArrayTypeItemTypeFieldInput>
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ArrayTypeDeleteInput = {
  itemType?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ArrayTypeDisconnectInput = {
  itemType?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ArrayTypeEdge = {
  __typename?: 'ArrayTypeEdge'
  cursor: Scalars['String']
  node: ArrayType
}

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type ArrayTypeItemTypeConnection = {
  __typename?: 'ArrayTypeItemTypeConnection'
  edges: Array<ArrayTypeItemTypeRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ArrayTypeItemTypeConnectionSort = {
  node?: InputMaybe<TypeBaseSort>
}

export type ArrayTypeItemTypeConnectionWhere = {
  AND?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>
  OR?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>
  node?: InputMaybe<TypeBaseWhere>
  node_NOT?: InputMaybe<TypeBaseWhere>
}

export type ArrayTypeItemTypeCreateFieldInput = {
  node: TypeBaseCreateInput
}

export type ArrayTypeItemTypeDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeItemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeItemTypeFieldInput = {
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
}

export type ArrayTypeItemTypeRelationship = {
  __typename?: 'ArrayTypeItemTypeRelationship'
  cursor: Scalars['String']
  node: TypeBase
}

export type ArrayTypeItemTypeUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>
}

export type ArrayTypeItemTypeUpdateFieldInput = {
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>
  update?: InputMaybe<ArrayTypeItemTypeUpdateConnectionInput>
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ArrayTypeSort objects to sort ArrayTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ArrayTypeSort>>
}

export type ArrayTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ArrayTypeOwnerNodeAggregationWhereInput>
}

export type ArrayTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ArrayTypeRelationInput = {
  itemType?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ArrayTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  itemType?: InputMaybe<ArrayTypeItemTypeUpdateFieldInput>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type ArrayTypeUserOwnerAggregationSelection = {
  __typename?: 'ArrayTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ArrayTypeUserOwnerNodeAggregateSelection>
}

export type ArrayTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ArrayTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ArrayTypeWhere = {
  AND?: InputMaybe<Array<ArrayTypeWhere>>
  OR?: InputMaybe<Array<ArrayTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  itemTypeConnection?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type ArrayTypesConnection = {
  __typename?: 'ArrayTypesConnection'
  edges: Array<ArrayTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Atom = {
  __typename?: 'Atom'
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  apiConnection: AtomApiConnection
  icon?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  tags: Array<Tag>
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>
  tagsConnection: AtomTagsConnection
  type: AtomType
}

export type AtomApiArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type AtomApiAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type AtomApiConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AtomApiConnectionSort>>
  where?: InputMaybe<AtomApiConnectionWhere>
}

export type AtomTagsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type AtomTagsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<TagWhere>
}

export type AtomTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AtomTagsConnectionSort>>
  where?: InputMaybe<AtomTagsConnectionWhere>
}

export type AtomAggregateSelection = {
  __typename?: 'AtomAggregateSelection'
  count: Scalars['Int']
  icon: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AtomApiAggregateInput = {
  AND?: InputMaybe<Array<AtomApiAggregateInput>>
  OR?: InputMaybe<Array<AtomApiAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AtomApiNodeAggregationWhereInput>
}

export type AtomApiConnectFieldInput = {
  connect?: InputMaybe<InterfaceTypeConnectInput>
  where?: InputMaybe<InterfaceTypeConnectWhere>
}

export type AtomApiConnectOrCreateFieldInput = {
  onCreate: AtomApiConnectOrCreateFieldInputOnCreate
  where: InterfaceTypeConnectOrCreateWhere
}

export type AtomApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type AtomApiConnection = {
  __typename?: 'AtomApiConnection'
  edges: Array<AtomApiRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AtomApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type AtomApiConnectionWhere = {
  AND?: InputMaybe<Array<AtomApiConnectionWhere>>
  OR?: InputMaybe<Array<AtomApiConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type AtomApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type AtomApiDeleteFieldInput = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<AtomApiConnectionWhere>
}

export type AtomApiDisconnectFieldInput = {
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  where?: InputMaybe<AtomApiConnectionWhere>
}

export type AtomApiFieldInput = {
  connect?: InputMaybe<AtomApiConnectFieldInput>
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>
  create?: InputMaybe<AtomApiCreateFieldInput>
}

export type AtomApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AtomApiRelationship = {
  __typename?: 'AtomApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type AtomApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type AtomApiUpdateFieldInput = {
  connect?: InputMaybe<AtomApiConnectFieldInput>
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>
  create?: InputMaybe<AtomApiCreateFieldInput>
  delete?: InputMaybe<AtomApiDeleteFieldInput>
  disconnect?: InputMaybe<AtomApiDisconnectFieldInput>
  update?: InputMaybe<AtomApiUpdateConnectionInput>
  where?: InputMaybe<AtomApiConnectionWhere>
}

export type AtomConnectInput = {
  api?: InputMaybe<AtomApiConnectFieldInput>
  tags?: InputMaybe<Array<AtomTagsConnectFieldInput>>
}

export type AtomConnectOrCreateInput = {
  api?: InputMaybe<AtomApiConnectOrCreateFieldInput>
  tags?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
}

export type AtomConnectOrCreateWhere = {
  node: AtomUniqueWhere
}

export type AtomConnectWhere = {
  node: AtomWhere
}

export type AtomCreateInput = {
  api?: InputMaybe<AtomApiFieldInput>
  icon?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  tags?: InputMaybe<AtomTagsFieldInput>
  type: AtomType
}

export type AtomDeleteInput = {
  api?: InputMaybe<AtomApiDeleteFieldInput>
  tags?: InputMaybe<Array<AtomTagsDeleteFieldInput>>
}

export type AtomDisconnectInput = {
  api?: InputMaybe<AtomApiDisconnectFieldInput>
  tags?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>
}

export type AtomEdge = {
  __typename?: 'AtomEdge'
  cursor: Scalars['String']
  node: Atom
}

export type AtomInterfaceTypeApiAggregationSelection = {
  __typename?: 'AtomInterfaceTypeApiAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AtomInterfaceTypeApiNodeAggregateSelection>
}

export type AtomInterfaceTypeApiNodeAggregateSelection = {
  __typename?: 'AtomInterfaceTypeApiNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AtomOnCreateInput = {
  icon?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
}

export type AtomOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AtomSort>>
}

export type AtomRelationInput = {
  api?: InputMaybe<AtomApiCreateFieldInput>
  tags?: InputMaybe<Array<AtomTagsCreateFieldInput>>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  icon?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type AtomTagTagsAggregationSelection = {
  __typename?: 'AtomTagTagsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AtomTagTagsNodeAggregateSelection>
}

export type AtomTagTagsNodeAggregateSelection = {
  __typename?: 'AtomTagTagsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AtomTagsAggregateInput = {
  AND?: InputMaybe<Array<AtomTagsAggregateInput>>
  OR?: InputMaybe<Array<AtomTagsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AtomTagsNodeAggregationWhereInput>
}

export type AtomTagsConnectFieldInput = {
  connect?: InputMaybe<Array<TagConnectInput>>
  where?: InputMaybe<TagConnectWhere>
}

export type AtomTagsConnectOrCreateFieldInput = {
  onCreate: AtomTagsConnectOrCreateFieldInputOnCreate
  where: TagConnectOrCreateWhere
}

export type AtomTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type AtomTagsConnection = {
  __typename?: 'AtomTagsConnection'
  edges: Array<AtomTagsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AtomTagsConnectionSort = {
  node?: InputMaybe<TagSort>
}

export type AtomTagsConnectionWhere = {
  AND?: InputMaybe<Array<AtomTagsConnectionWhere>>
  OR?: InputMaybe<Array<AtomTagsConnectionWhere>>
  node?: InputMaybe<TagWhere>
  node_NOT?: InputMaybe<TagWhere>
}

export type AtomTagsCreateFieldInput = {
  node: TagCreateInput
}

export type AtomTagsDeleteFieldInput = {
  delete?: InputMaybe<TagDeleteInput>
  where?: InputMaybe<AtomTagsConnectionWhere>
}

export type AtomTagsDisconnectFieldInput = {
  disconnect?: InputMaybe<TagDisconnectInput>
  where?: InputMaybe<AtomTagsConnectionWhere>
}

export type AtomTagsFieldInput = {
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>
}

export type AtomTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AtomTagsRelationship = {
  __typename?: 'AtomTagsRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type AtomTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type AtomTagsUpdateFieldInput = {
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>
  delete?: InputMaybe<Array<AtomTagsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>
  update?: InputMaybe<AtomTagsUpdateConnectionInput>
  where?: InputMaybe<AtomTagsConnectionWhere>
}

export enum AtomType {
  AntDesignAffix = 'AntDesignAffix',
  AntDesignAlert = 'AntDesignAlert',
  AntDesignAnchor = 'AntDesignAnchor',
  AntDesignAnchorLink = 'AntDesignAnchorLink',
  AntDesignAutoComplete = 'AntDesignAutoComplete',
  AntDesignAvatar = 'AntDesignAvatar',
  AntDesignBackTop = 'AntDesignBackTop',
  AntDesignBadge = 'AntDesignBadge',
  AntDesignBreadcrumb = 'AntDesignBreadcrumb',
  AntDesignBreadcrumbItem = 'AntDesignBreadcrumbItem',
  AntDesignButton = 'AntDesignButton',
  AntDesignCalendar = 'AntDesignCalendar',
  AntDesignCard = 'AntDesignCard',
  AntDesignCardGrid = 'AntDesignCardGrid',
  AntDesignCardMeta = 'AntDesignCardMeta',
  AntDesignCarousel = 'AntDesignCarousel',
  AntDesignCascader = 'AntDesignCascader',
  AntDesignCheckbox = 'AntDesignCheckbox',
  AntDesignCollapse = 'AntDesignCollapse',
  AntDesignCollapsePanel = 'AntDesignCollapsePanel',
  AntDesignComment = 'AntDesignComment',
  AntDesignConfigProvider = 'AntDesignConfigProvider',
  AntDesignDatePicker = 'AntDesignDatePicker',
  AntDesignDescriptions = 'AntDesignDescriptions',
  AntDesignDescriptionsItem = 'AntDesignDescriptionsItem',
  AntDesignDivider = 'AntDesignDivider',
  AntDesignDrawer = 'AntDesignDrawer',
  AntDesignDropdown = 'AntDesignDropdown',
  AntDesignEmpty = 'AntDesignEmpty',
  AntDesignForm = 'AntDesignForm',
  AntDesignFormItem = 'AntDesignFormItem',
  AntDesignFormItemHook = 'AntDesignFormItemHook',
  AntDesignFormList = 'AntDesignFormList',
  AntDesignGridCol = 'AntDesignGridCol',
  AntDesignGridRow = 'AntDesignGridRow',
  AntDesignIcon = 'AntDesignIcon',
  AntDesignImage = 'AntDesignImage',
  AntDesignInput = 'AntDesignInput',
  AntDesignInputNumber = 'AntDesignInputNumber',
  AntDesignLayout = 'AntDesignLayout',
  AntDesignLayoutContent = 'AntDesignLayoutContent',
  AntDesignLayoutFooter = 'AntDesignLayoutFooter',
  AntDesignLayoutHeader = 'AntDesignLayoutHeader',
  AntDesignLayoutSider = 'AntDesignLayoutSider',
  AntDesignList = 'AntDesignList',
  AntDesignListItem = 'AntDesignListItem',
  AntDesignListItemMeta = 'AntDesignListItemMeta',
  AntDesignMapper = 'AntDesignMapper',
  AntDesignMentions = 'AntDesignMentions',
  AntDesignMentionsOption = 'AntDesignMentionsOption',
  AntDesignMenu = 'AntDesignMenu',
  AntDesignMenuItem = 'AntDesignMenuItem',
  AntDesignMenuItemGroup = 'AntDesignMenuItemGroup',
  AntDesignMenuSubMenu = 'AntDesignMenuSubMenu',
  AntDesignModal = 'AntDesignModal',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
  AntDesignSelect = 'AntDesignSelect',
  AntDesignSelectOption = 'AntDesignSelectOption',
  AntDesignSkeleton = 'AntDesignSkeleton',
  AntDesignSlider = 'AntDesignSlider',
  AntDesignSpace = 'AntDesignSpace',
  AntDesignSpin = 'AntDesignSpin',
  AntDesignStatistic = 'AntDesignStatistic',
  AntDesignSteps = 'AntDesignSteps',
  AntDesignStepsStep = 'AntDesignStepsStep',
  AntDesignSwitch = 'AntDesignSwitch',
  AntDesignTable = 'AntDesignTable',
  AntDesignTabs = 'AntDesignTabs',
  AntDesignTabsTabPane = 'AntDesignTabsTabPane',
  AntDesignTag = 'AntDesignTag',
  AntDesignTimePicker = 'AntDesignTimePicker',
  AntDesignTimeline = 'AntDesignTimeline',
  AntDesignTimelineItem = 'AntDesignTimelineItem',
  AntDesignTooltip = 'AntDesignTooltip',
  AntDesignTransfer = 'AntDesignTransfer',
  AntDesignTree = 'AntDesignTree',
  AntDesignTreeNode = 'AntDesignTreeNode',
  AntDesignTreeSelect = 'AntDesignTreeSelect',
  AntDesignTypography = 'AntDesignTypography',
  AntDesignTypographyParagraph = 'AntDesignTypographyParagraph',
  AntDesignTypographyText = 'AntDesignTypographyText',
  AntDesignTypographyTitle = 'AntDesignTypographyTitle',
  AntDesignUpload = 'AntDesignUpload',
  HookGraphqlMutation = 'HookGraphqlMutation',
  HookGraphqlQuery = 'HookGraphqlQuery',
  HookQueryConfig = 'HookQueryConfig',
  HookQueryLambda = 'HookQueryLambda',
  HookQueryPage = 'HookQueryPage',
  HookQueryPages = 'HookQueryPages',
  HookRecoilState = 'HookRecoilState',
  HookRouter = 'HookRouter',
  HtmlA = 'HtmlA',
  HtmlArea = 'HtmlArea',
  HtmlAside = 'HtmlAside',
  HtmlAudio = 'HtmlAudio',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlButton = 'HtmlButton',
  HtmlCanvas = 'HtmlCanvas',
  HtmlCode = 'HtmlCode',
  HtmlDList = 'HtmlDList',
  HtmlData = 'HtmlData',
  HtmlDatalist = 'HtmlDatalist',
  HtmlDetails = 'HtmlDetails',
  HtmlDialog = 'HtmlDialog',
  HtmlDiv = 'HtmlDiv',
  HtmlEm = 'HtmlEm',
  HtmlEmbed = 'HtmlEmbed',
  HtmlFieldset = 'HtmlFieldset',
  HtmlFont = 'HtmlFont',
  HtmlFooter = 'HtmlFooter',
  HtmlForm = 'HtmlForm',
  HtmlFrame = 'HtmlFrame',
  HtmlFrameset = 'HtmlFrameset',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHeader = 'HtmlHeader',
  HtmlHr = 'HtmlHr',
  HtmlI = 'HtmlI',
  HtmlIframe = 'HtmlIframe',
  HtmlImage = 'HtmlImage',
  HtmlInput = 'HtmlInput',
  HtmlLabel = 'HtmlLabel',
  HtmlLegend = 'HtmlLegend',
  HtmlLi = 'HtmlLi',
  HtmlLink = 'HtmlLink',
  HtmlMain = 'HtmlMain',
  HtmlMap = 'HtmlMap',
  HtmlMeta = 'HtmlMeta',
  HtmlMeter = 'HtmlMeter',
  HtmlNav = 'HtmlNav',
  HtmlOList = 'HtmlOList',
  HtmlObject = 'HtmlObject',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlOption = 'HtmlOption',
  HtmlOutput = 'HtmlOutput',
  HtmlP = 'HtmlP',
  HtmlParam = 'HtmlParam',
  HtmlPicture = 'HtmlPicture',
  HtmlPre = 'HtmlPre',
  HtmlProgress = 'HtmlProgress',
  HtmlQuote = 'HtmlQuote',
  HtmlS = 'HtmlS',
  HtmlSection = 'HtmlSection',
  HtmlSelect = 'HtmlSelect',
  HtmlSmall = 'HtmlSmall',
  HtmlSource = 'HtmlSource',
  HtmlSpan = 'HtmlSpan',
  HtmlStrong = 'HtmlStrong',
  HtmlStyle = 'HtmlStyle',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
  HtmlTable = 'HtmlTable',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTime = 'HtmlTime',
  HtmlTitle = 'HtmlTitle',
  HtmlTrack = 'HtmlTrack',
  HtmlUList = 'HtmlUList',
  HtmlVideo = 'HtmlVideo',
  MuiAccordion = 'MuiAccordion',
  MuiAccordionActions = 'MuiAccordionActions',
  MuiAccordionDetails = 'MuiAccordionDetails',
  MuiAccordionSummary = 'MuiAccordionSummary',
  MuiAlert = 'MuiAlert',
  MuiAlertTitle = 'MuiAlertTitle',
  MuiAppBar = 'MuiAppBar',
  MuiAutocomplete = 'MuiAutocomplete',
  MuiAvatar = 'MuiAvatar',
  MuiAvatarGroup = 'MuiAvatarGroup',
  MuiBackdrop = 'MuiBackdrop',
  MuiBadge = 'MuiBadge',
  MuiBadgeUnstyled = 'MuiBadgeUnstyled',
  MuiBottomNavigation = 'MuiBottomNavigation',
  MuiBottomNavigationAction = 'MuiBottomNavigationAction',
  MuiBox = 'MuiBox',
  MuiBreadcrumbs = 'MuiBreadcrumbs',
  MuiButton = 'MuiButton',
  MuiButtonBase = 'MuiButtonBase',
  MuiButtonGroup = 'MuiButtonGroup',
  MuiButtonUnstyled = 'MuiButtonUnstyled',
  MuiCalendarPicker = 'MuiCalendarPicker',
  MuiCalendarPickerSkeleton = 'MuiCalendarPickerSkeleton',
  MuiCard = 'MuiCard',
  MuiCardActionArea = 'MuiCardActionArea',
  MuiCardActions = 'MuiCardActions',
  MuiCardContent = 'MuiCardContent',
  MuiCardHeader = 'MuiCardHeader',
  MuiCardMedia = 'MuiCardMedia',
  MuiCheckbox = 'MuiCheckbox',
  MuiChip = 'MuiChip',
  MuiCircularProgress = 'MuiCircularProgress',
  MuiClickAwayListener = 'MuiClickAwayListener',
  MuiClockPicker = 'MuiClockPicker',
  MuiCollapse = 'MuiCollapse',
  MuiContainer = 'MuiContainer',
  MuiCssBaseline = 'MuiCssBaseline',
  MuiDataGrid = 'MuiDataGrid',
  MuiDatePicker = 'MuiDatePicker',
  MuiDateRangePicker = 'MuiDateRangePicker',
  MuiDateRangePickerDay = 'MuiDateRangePickerDay',
  MuiDateTimePicker = 'MuiDateTimePicker',
  MuiDesktopDatePicker = 'MuiDesktopDatePicker',
  MuiDesktopDateRangePicker = 'MuiDesktopDateRangePicker',
  MuiDesktopDateTimePicker = 'MuiDesktopDateTimePicker',
  MuiDesktopTimePicker = 'MuiDesktopTimePicker',
  MuiDialog = 'MuiDialog',
  MuiDialogActions = 'MuiDialogActions',
  MuiDialogContent = 'MuiDialogContent',
  MuiDialogContentText = 'MuiDialogContentText',
  MuiDialogTitle = 'MuiDialogTitle',
  MuiDivider = 'MuiDivider',
  MuiDrawer = 'MuiDrawer',
  MuiFab = 'MuiFab',
  MuiFade = 'MuiFade',
  MuiFilledInput = 'MuiFilledInput',
  MuiFormControl = 'MuiFormControl',
  MuiFormControlLabel = 'MuiFormControlLabel',
  MuiFormControlUnstyled = 'MuiFormControlUnstyled',
  MuiFormGroup = 'MuiFormGroup',
  MuiFormHelperText = 'MuiFormHelperText',
  MuiFormLabel = 'MuiFormLabel',
  MuiGlobalStyles = 'MuiGlobalStyles',
  MuiGrid = 'MuiGrid',
  MuiGridColDef = 'MuiGridColDef',
  MuiGrow = 'MuiGrow',
  MuiHidden = 'MuiHidden',
  MuiIcon = 'MuiIcon',
  MuiIconButton = 'MuiIconButton',
  MuiImageList = 'MuiImageList',
  MuiImageListItem = 'MuiImageListItem',
  MuiImageListItemBar = 'MuiImageListItemBar',
  MuiInput = 'MuiInput',
  MuiInputAdornment = 'MuiInputAdornment',
  MuiInputBase = 'MuiInputBase',
  MuiInputLabel = 'MuiInputLabel',
  MuiLinearProgress = 'MuiLinearProgress',
  MuiLink = 'MuiLink',
  MuiList = 'MuiList',
  MuiListItem = 'MuiListItem',
  MuiListItemAvatar = 'MuiListItemAvatar',
  MuiListItemButton = 'MuiListItemButton',
  MuiListItemIcon = 'MuiListItemIcon',
  MuiListItemSecondaryAction = 'MuiListItemSecondaryAction',
  MuiListItemText = 'MuiListItemText',
  MuiListSubheader = 'MuiListSubheader',
  MuiLoadingButton = 'MuiLoadingButton',
  MuiMasonry = 'MuiMasonry',
  MuiMasonryItem = 'MuiMasonryItem',
  MuiMenu = 'MuiMenu',
  MuiMenuItem = 'MuiMenuItem',
  MuiMenuList = 'MuiMenuList',
  MuiMobileDatePicker = 'MuiMobileDatePicker',
  MuiMobileDateRangePicker = 'MuiMobileDateRangePicker',
  MuiMobileDateTimePicker = 'MuiMobileDateTimePicker',
  MuiMobileStepper = 'MuiMobileStepper',
  MuiMobileTimePicker = 'MuiMobileTimePicker',
  MuiModal = 'MuiModal',
  MuiModalUnstyled = 'MuiModalUnstyled',
  MuiMonthPicker = 'MuiMonthPicker',
  MuiNativeSelect = 'MuiNativeSelect',
  MuiNoSsr = 'MuiNoSsr',
  MuiOutlinedInput = 'MuiOutlinedInput',
  MuiPagination = 'MuiPagination',
  MuiPaginationItem = 'MuiPaginationItem',
  MuiPaper = 'MuiPaper',
  MuiPickersDay = 'MuiPickersDay',
  MuiPopover = 'MuiPopover',
  MuiPopper = 'MuiPopper',
  MuiPortal = 'MuiPortal',
  MuiRadio = 'MuiRadio',
  MuiRadioGroup = 'MuiRadioGroup',
  MuiRating = 'MuiRating',
  MuiScopedCssBaseline = 'MuiScopedCssBaseline',
  MuiSelect = 'MuiSelect',
  MuiSkeleton = 'MuiSkeleton',
  MuiSlide = 'MuiSlide',
  MuiSlider = 'MuiSlider',
  MuiSliderUnstyled = 'MuiSliderUnstyled',
  MuiSnackbar = 'MuiSnackbar',
  MuiSnackbarContent = 'MuiSnackbarContent',
  MuiSpeedDial = 'MuiSpeedDial',
  MuiSpeedDialAction = 'MuiSpeedDialAction',
  MuiSpeedDialIcon = 'MuiSpeedDialIcon',
  MuiStack = 'MuiStack',
  MuiStaticDatePicker = 'MuiStaticDatePicker',
  MuiStaticDateRangePicker = 'MuiStaticDateRangePicker',
  MuiStaticDateTimePicker = 'MuiStaticDateTimePicker',
  MuiStaticTimePicker = 'MuiStaticTimePicker',
  MuiStep = 'MuiStep',
  MuiStepButton = 'MuiStepButton',
  MuiStepConnector = 'MuiStepConnector',
  MuiStepContent = 'MuiStepContent',
  MuiStepIcon = 'MuiStepIcon',
  MuiStepLabel = 'MuiStepLabel',
  MuiStepper = 'MuiStepper',
  MuiSvgIcon = 'MuiSvgIcon',
  MuiSwipeableDrawer = 'MuiSwipeableDrawer',
  MuiSwitch = 'MuiSwitch',
  MuiSwitchUnstyled = 'MuiSwitchUnstyled',
  MuiTab = 'MuiTab',
  MuiTabContext = 'MuiTabContext',
  MuiTabList = 'MuiTabList',
  MuiTabPanel = 'MuiTabPanel',
  MuiTabScrollButton = 'MuiTabScrollButton',
  MuiTable = 'MuiTable',
  MuiTableBody = 'MuiTableBody',
  MuiTableCell = 'MuiTableCell',
  MuiTableContainer = 'MuiTableContainer',
  MuiTableFooter = 'MuiTableFooter',
  MuiTableHead = 'MuiTableHead',
  MuiTablePagination = 'MuiTablePagination',
  MuiTableRow = 'MuiTableRow',
  MuiTableSortLabel = 'MuiTableSortLabel',
  MuiTabs = 'MuiTabs',
  MuiTextField = 'MuiTextField',
  MuiTextareaAutosize = 'MuiTextareaAutosize',
  MuiTimePicker = 'MuiTimePicker',
  MuiTimeline = 'MuiTimeline',
  MuiTimelineConnector = 'MuiTimelineConnector',
  MuiTimelineContent = 'MuiTimelineContent',
  MuiTimelineDot = 'MuiTimelineDot',
  MuiTimelineItem = 'MuiTimelineItem',
  MuiTimelineOppositeContent = 'MuiTimelineOppositeContent',
  MuiTimelineSeparator = 'MuiTimelineSeparator',
  MuiToggleButton = 'MuiToggleButton',
  MuiToggleButtonGroup = 'MuiToggleButtonGroup',
  MuiToolbar = 'MuiToolbar',
  MuiTooltip = 'MuiTooltip',
  MuiTreeItem = 'MuiTreeItem',
  MuiTreeView = 'MuiTreeView',
  MuiTypography = 'MuiTypography',
  MuiUnstableTrapFocus = 'MuiUnstableTrapFocus',
  MuiYearPicker = 'MuiYearPicker',
  MuiZoom = 'MuiZoom',
  Query = 'Query',
  ReactFragment = 'ReactFragment',
  Script = 'Script',
  State = 'State',
  Text = 'Text',
  TextList = 'TextList',
}

export type AtomUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
}

export type AtomUpdateInput = {
  api?: InputMaybe<AtomApiUpdateFieldInput>
  icon?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  tags?: InputMaybe<Array<AtomTagsUpdateFieldInput>>
  type?: InputMaybe<AtomType>
}

export type AtomWhere = {
  AND?: InputMaybe<Array<AtomWhere>>
  OR?: InputMaybe<Array<AtomWhere>>
  api?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<AtomApiAggregateInput>
  apiConnection?: InputMaybe<AtomApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<AtomApiConnectionWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  icon?: InputMaybe<Scalars['String']>
  icon_CONTAINS?: InputMaybe<Scalars['String']>
  icon_ENDS_WITH?: InputMaybe<Scalars['String']>
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  icon_NOT?: InputMaybe<Scalars['String']>
  icon_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  icon_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  icon_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  tagsAggregate?: InputMaybe<AtomTagsAggregateInput>
  tagsConnection_ALL?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_NONE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SINGLE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SOME?: InputMaybe<AtomTagsConnectionWhere>
  /** Return Atoms where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>
  /** Return Atoms where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>
  /** Return Atoms where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>
  /** Return Atoms where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>
  type?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<AtomType>>
  type_NOT?: InputMaybe<AtomType>
  type_NOT_IN?: InputMaybe<Array<AtomType>>
}

export type AtomsConnection = {
  __typename?: 'AtomsConnection'
  edges: Array<AtomEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export enum CodeMirrorLanguage {
  Css = 'Css',
  CssInJs = 'CssInJs',
  Graphql = 'Graphql',
  Javascript = 'Javascript',
  Json = 'Json',
  Typescript = 'Typescript',
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorType = TypeBase & {
  __typename?: 'CodeMirrorType'
  id: Scalars['ID']
  kind: TypeKind
  language: CodeMirrorLanguage
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<CodeMirrorTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type CodeMirrorTypeAggregateSelection = {
  __typename?: 'CodeMirrorTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type CodeMirrorTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type CodeMirrorTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type CodeMirrorTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  language: CodeMirrorLanguage
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type CodeMirrorTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type CodeMirrorTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type CodeMirrorTypeEdge = {
  __typename?: 'CodeMirrorTypeEdge'
  cursor: Scalars['String']
  node: CodeMirrorType
}

export type CodeMirrorTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more CodeMirrorTypeSort objects to sort CodeMirrorTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeMirrorTypeSort>>
}

export type CodeMirrorTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<CodeMirrorTypeOwnerNodeAggregationWhereInput>
}

export type CodeMirrorTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type CodeMirrorTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort CodeMirrorTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeMirrorTypeSort object. */
export type CodeMirrorTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  language?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type CodeMirrorTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  language?: InputMaybe<CodeMirrorLanguage>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type CodeMirrorTypeUserOwnerAggregationSelection = {
  __typename?: 'CodeMirrorTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<CodeMirrorTypeUserOwnerNodeAggregateSelection>
}

export type CodeMirrorTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'CodeMirrorTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type CodeMirrorTypeWhere = {
  AND?: InputMaybe<Array<CodeMirrorTypeWhere>>
  OR?: InputMaybe<Array<CodeMirrorTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  language?: InputMaybe<CodeMirrorLanguage>
  language_IN?: InputMaybe<Array<CodeMirrorLanguage>>
  language_NOT?: InputMaybe<CodeMirrorLanguage>
  language_NOT_IN?: InputMaybe<Array<CodeMirrorLanguage>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<CodeMirrorTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type CodeMirrorTypesConnection = {
  __typename?: 'CodeMirrorTypesConnection'
  edges: Array<CodeMirrorTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Component = WithOwner & {
  __typename?: 'Component'
  api: InterfaceType
  apiAggregate?: Maybe<ComponentInterfaceTypeApiAggregationSelection>
  apiConnection: ComponentApiConnection
  descendantComponentIds: Array<Scalars['ID']>
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>
  ownerConnection: WithOwnerOwnerConnection
  rootElement: Element
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>
  rootElementConnection: ComponentRootElementConnection
}

export type ComponentApiArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type ComponentApiAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type ComponentApiConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ComponentApiConnectionSort>>
  where?: InputMaybe<ComponentApiConnectionWhere>
}

export type ComponentOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type ComponentOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

export type ComponentOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type ComponentRootElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ComponentRootElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ComponentRootElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ComponentRootElementConnectionSort>>
  where?: InputMaybe<ComponentRootElementConnectionWhere>
}

export type ComponentAggregateSelection = {
  __typename?: 'ComponentAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ComponentApiAggregateInput = {
  AND?: InputMaybe<Array<ComponentApiAggregateInput>>
  OR?: InputMaybe<Array<ComponentApiAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ComponentApiNodeAggregationWhereInput>
}

export type ComponentApiConnectFieldInput = {
  connect?: InputMaybe<InterfaceTypeConnectInput>
  where?: InputMaybe<InterfaceTypeConnectWhere>
}

export type ComponentApiConnectOrCreateFieldInput = {
  onCreate: ComponentApiConnectOrCreateFieldInputOnCreate
  where: InterfaceTypeConnectOrCreateWhere
}

export type ComponentApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type ComponentApiConnection = {
  __typename?: 'ComponentApiConnection'
  edges: Array<ComponentApiRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ComponentApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type ComponentApiConnectionWhere = {
  AND?: InputMaybe<Array<ComponentApiConnectionWhere>>
  OR?: InputMaybe<Array<ComponentApiConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type ComponentApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type ComponentApiDeleteFieldInput = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<ComponentApiConnectionWhere>
}

export type ComponentApiDisconnectFieldInput = {
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  where?: InputMaybe<ComponentApiConnectionWhere>
}

export type ComponentApiFieldInput = {
  connect?: InputMaybe<ComponentApiConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentApiCreateFieldInput>
}

export type ComponentApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentApiRelationship = {
  __typename?: 'ComponentApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type ComponentApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type ComponentApiUpdateFieldInput = {
  connect?: InputMaybe<ComponentApiConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentApiCreateFieldInput>
  delete?: InputMaybe<ComponentApiDeleteFieldInput>
  disconnect?: InputMaybe<ComponentApiDisconnectFieldInput>
  update?: InputMaybe<ComponentApiUpdateConnectionInput>
  where?: InputMaybe<ComponentApiConnectionWhere>
}

export type ComponentConnectInput = {
  api?: InputMaybe<ComponentApiConnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>
}

export type ComponentConnectOrCreateInput = {
  api?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
}

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere
}

export type ComponentConnectWhere = {
  node: ComponentWhere
}

export type ComponentCreateInput = {
  api?: InputMaybe<ComponentApiFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
  rootElement?: InputMaybe<ComponentRootElementFieldInput>
}

export type ComponentDeleteInput = {
  api?: InputMaybe<ComponentApiDeleteFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>
}

export type ComponentDisconnectInput = {
  api?: InputMaybe<ComponentApiDisconnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>
}

export type ComponentEdge = {
  __typename?: 'ComponentEdge'
  cursor: Scalars['String']
  node: Component
}

export type ComponentElementRootElementAggregationSelection = {
  __typename?: 'ComponentElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ComponentElementRootElementNodeAggregateSelection>
}

export type ComponentElementRootElementNodeAggregateSelection = {
  __typename?: 'ComponentElementRootElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ComponentInterfaceTypeApiAggregationSelection = {
  __typename?: 'ComponentInterfaceTypeApiAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ComponentInterfaceTypeApiNodeAggregateSelection>
}

export type ComponentInterfaceTypeApiNodeAggregateSelection = {
  __typename?: 'ComponentInterfaceTypeApiNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ComponentOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ComponentOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ComponentSort objects to sort Components by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ComponentSort>>
}

export type ComponentOwnerAggregateInput = {
  AND?: InputMaybe<Array<ComponentOwnerAggregateInput>>
  OR?: InputMaybe<Array<ComponentOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ComponentOwnerNodeAggregationWhereInput>
}

export type ComponentOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentRelationInput = {
  api?: InputMaybe<ComponentApiCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  rootElement?: InputMaybe<ComponentRootElementCreateFieldInput>
}

export type ComponentRootElementAggregateInput = {
  AND?: InputMaybe<Array<ComponentRootElementAggregateInput>>
  OR?: InputMaybe<Array<ComponentRootElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ComponentRootElementNodeAggregationWhereInput>
}

export type ComponentRootElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ComponentRootElementConnectOrCreateFieldInput = {
  onCreate: ComponentRootElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ComponentRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ComponentRootElementConnection = {
  __typename?: 'ComponentRootElementConnection'
  edges: Array<ComponentRootElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ComponentRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ComponentRootElementConnectionWhere = {
  AND?: InputMaybe<Array<ComponentRootElementConnectionWhere>>
  OR?: InputMaybe<Array<ComponentRootElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ComponentRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type ComponentRootElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ComponentRootElementConnectionWhere>
}

export type ComponentRootElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ComponentRootElementConnectionWhere>
}

export type ComponentRootElementFieldInput = {
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentRootElementCreateFieldInput>
}

export type ComponentRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentRootElementRelationship = {
  __typename?: 'ComponentRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ComponentRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ComponentRootElementUpdateFieldInput = {
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentRootElementCreateFieldInput>
  delete?: InputMaybe<ComponentRootElementDeleteFieldInput>
  disconnect?: InputMaybe<ComponentRootElementDisconnectFieldInput>
  update?: InputMaybe<ComponentRootElementUpdateConnectionInput>
  where?: InputMaybe<ComponentRootElementConnectionWhere>
}

/** Fields to sort Components by. The order in which sorts are applied is not guaranteed when specifying many fields in one ComponentSort object. */
export type ComponentSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ComponentUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentUpdateInput = {
  api?: InputMaybe<ComponentApiUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>
}

export type ComponentUserOwnerAggregationSelection = {
  __typename?: 'ComponentUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ComponentUserOwnerNodeAggregateSelection>
}

export type ComponentUserOwnerNodeAggregateSelection = {
  __typename?: 'ComponentUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ComponentWhere = {
  AND?: InputMaybe<Array<ComponentWhere>>
  OR?: InputMaybe<Array<ComponentWhere>>
  api?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<ComponentApiAggregateInput>
  apiConnection?: InputMaybe<ComponentApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<ComponentApiConnectionWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ComponentOwnerAggregateInput>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  rootElement?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<ComponentRootElementAggregateInput>
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
}

export type ComponentsConnection = {
  __typename?: 'ComponentsConnection'
  edges: Array<ComponentEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CreateActionTypesMutationResponse = {
  __typename?: 'CreateActionTypesMutationResponse'
  actionTypes: Array<ActionType>
  info: CreateInfo
}

export type CreateAppTypesMutationResponse = {
  __typename?: 'CreateAppTypesMutationResponse'
  appTypes: Array<AppType>
  info: CreateInfo
}

export type CreateAppsMutationResponse = {
  __typename?: 'CreateAppsMutationResponse'
  apps: Array<App>
  info: CreateInfo
}

export type CreateArrayTypesMutationResponse = {
  __typename?: 'CreateArrayTypesMutationResponse'
  arrayTypes: Array<ArrayType>
  info: CreateInfo
}

export type CreateAtomsMutationResponse = {
  __typename?: 'CreateAtomsMutationResponse'
  atoms: Array<Atom>
  info: CreateInfo
}

export type CreateCodeMirrorTypesMutationResponse = {
  __typename?: 'CreateCodeMirrorTypesMutationResponse'
  codeMirrorTypes: Array<CodeMirrorType>
  info: CreateInfo
}

export type CreateComponentsMutationResponse = {
  __typename?: 'CreateComponentsMutationResponse'
  components: Array<Component>
  info: CreateInfo
}

export type CreateCreateInfosMutationResponse = {
  __typename?: 'CreateCreateInfosMutationResponse'
  createInfos: Array<CreateInfo>
  info: CreateInfo
}

export type CreateCustomActionsMutationResponse = {
  __typename?: 'CreateCustomActionsMutationResponse'
  customActions: Array<CustomAction>
  info: CreateInfo
}

export type CreateDeleteInfosMutationResponse = {
  __typename?: 'CreateDeleteInfosMutationResponse'
  deleteInfos: Array<DeleteInfo>
  info: CreateInfo
}

export type CreateDomainMutationInput = {
  appId: Scalars['String']
  name: Scalars['String']
}

export type CreateDomainsMutationResponse = {
  __typename?: 'CreateDomainsMutationResponse'
  domains: Array<Domain>
  info: CreateInfo
}

export type CreateElementTypesMutationResponse = {
  __typename?: 'CreateElementTypesMutationResponse'
  elementTypes: Array<ElementType>
  info: CreateInfo
}

export type CreateElementsMutationResponse = {
  __typename?: 'CreateElementsMutationResponse'
  elements: Array<Element>
  info: CreateInfo
}

export type CreateEnumTypeValuesMutationResponse = {
  __typename?: 'CreateEnumTypeValuesMutationResponse'
  enumTypeValues: Array<EnumTypeValue>
  info: CreateInfo
}

export type CreateEnumTypesMutationResponse = {
  __typename?: 'CreateEnumTypesMutationResponse'
  enumTypes: Array<EnumType>
  info: CreateInfo
}

export type CreateExecuteCommandResponsesMutationResponse = {
  __typename?: 'CreateExecuteCommandResponsesMutationResponse'
  executeCommandResponses: Array<ExecuteCommandResponse>
  info: CreateInfo
}

export type CreateHooksMutationResponse = {
  __typename?: 'CreateHooksMutationResponse'
  hooks: Array<Hook>
  info: CreateInfo
}

export type CreateInfo = {
  __typename?: 'CreateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoAggregateSelection = {
  __typename?: 'CreateInfoAggregateSelection'
  bookmark: StringAggregateSelectionNullable
  count: Scalars['Int']
  nodesCreated: IntAggregateSelectionNonNullable
  relationshipsCreated: IntAggregateSelectionNonNullable
}

export type CreateInfoCreateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoEdge = {
  __typename?: 'CreateInfoEdge'
  cursor: Scalars['String']
  node: CreateInfo
}

export type CreateInfoOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more CreateInfoSort objects to sort CreateInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CreateInfoSort>>
}

/** Fields to sort CreateInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one CreateInfoSort object. */
export type CreateInfoSort = {
  bookmark?: InputMaybe<SortDirection>
  nodesCreated?: InputMaybe<SortDirection>
  relationshipsCreated?: InputMaybe<SortDirection>
}

export type CreateInfoUpdateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesCreated?: InputMaybe<Scalars['Int']>
  relationshipsCreated?: InputMaybe<Scalars['Int']>
}

export type CreateInfoWhere = {
  AND?: InputMaybe<Array<CreateInfoWhere>>
  OR?: InputMaybe<Array<CreateInfoWhere>>
  bookmark?: InputMaybe<Scalars['String']>
  bookmark_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT?: InputMaybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_STARTS_WITH?: InputMaybe<Scalars['String']>
  nodesCreated?: InputMaybe<Scalars['Int']>
  nodesCreated_GT?: InputMaybe<Scalars['Int']>
  nodesCreated_GTE?: InputMaybe<Scalars['Int']>
  nodesCreated_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesCreated_LT?: InputMaybe<Scalars['Int']>
  nodesCreated_LTE?: InputMaybe<Scalars['Int']>
  nodesCreated_NOT?: InputMaybe<Scalars['Int']>
  nodesCreated_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsCreated?: InputMaybe<Scalars['Int']>
  relationshipsCreated_GT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_GTE?: InputMaybe<Scalars['Int']>
  relationshipsCreated_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsCreated_LT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_LTE?: InputMaybe<Scalars['Int']>
  relationshipsCreated_NOT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
}

export type CreateInfosConnection = {
  __typename?: 'CreateInfosConnection'
  edges: Array<CreateInfoEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CreateInterfaceTypesMutationResponse = {
  __typename?: 'CreateInterfaceTypesMutationResponse'
  info: CreateInfo
  interfaceTypes: Array<InterfaceType>
}

export type CreateLambdaTypesMutationResponse = {
  __typename?: 'CreateLambdaTypesMutationResponse'
  info: CreateInfo
  lambdaTypes: Array<LambdaType>
}

export type CreatePageTypesMutationResponse = {
  __typename?: 'CreatePageTypesMutationResponse'
  info: CreateInfo
  pageTypes: Array<PageType>
}

export type CreatePagesMutationResponse = {
  __typename?: 'CreatePagesMutationResponse'
  info: CreateInfo
  pages: Array<Page>
}

export type CreatePipelineActionsMutationResponse = {
  __typename?: 'CreatePipelineActionsMutationResponse'
  info: CreateInfo
  pipelineActions: Array<PipelineAction>
}

export type CreatePrimitiveTypesMutationResponse = {
  __typename?: 'CreatePrimitiveTypesMutationResponse'
  info: CreateInfo
  primitiveTypes: Array<PrimitiveType>
}

export type CreatePropMapBindingsMutationResponse = {
  __typename?: 'CreatePropMapBindingsMutationResponse'
  info: CreateInfo
  propMapBindings: Array<PropMapBinding>
}

export type CreatePropsMutationResponse = {
  __typename?: 'CreatePropsMutationResponse'
  info: CreateInfo
  props: Array<Prop>
}

export type CreateReactNodeTypesMutationResponse = {
  __typename?: 'CreateReactNodeTypesMutationResponse'
  info: CreateInfo
  reactNodeTypes: Array<ReactNodeType>
}

export type CreateRenderPropsTypesMutationResponse = {
  __typename?: 'CreateRenderPropsTypesMutationResponse'
  info: CreateInfo
  renderPropsTypes: Array<RenderPropsType>
}

export type CreateResetDatabaseMutationResponsesMutationResponse = {
  __typename?: 'CreateResetDatabaseMutationResponsesMutationResponse'
  info: CreateInfo
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
}

export type CreateResourceActionsMutationResponse = {
  __typename?: 'CreateResourceActionsMutationResponse'
  info: CreateInfo
  resourceActions: Array<ResourceAction>
}

export type CreateResourcesMutationResponse = {
  __typename?: 'CreateResourcesMutationResponse'
  info: CreateInfo
  resources: Array<Resource>
}

export type CreateStoresMutationResponse = {
  __typename?: 'CreateStoresMutationResponse'
  info: CreateInfo
  stores: Array<Store>
}

export type CreateTagGraphOptionsMutationResponse = {
  __typename?: 'CreateTagGraphOptionsMutationResponse'
  info: CreateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type CreateTagsMutationResponse = {
  __typename?: 'CreateTagsMutationResponse'
  info: CreateInfo
  tags: Array<Tag>
}

export type CreateTypeReferencesMutationResponse = {
  __typename?: 'CreateTypeReferencesMutationResponse'
  info: CreateInfo
  typeReferences: Array<TypeReference>
}

export type CreateUnionTypesMutationResponse = {
  __typename?: 'CreateUnionTypesMutationResponse'
  info: CreateInfo
  unionTypes: Array<UnionType>
}

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse'
  info: CreateInfo
  users: Array<User>
}

export type CreateVercelDomainConfigDataMutationResponse = {
  __typename?: 'CreateVercelDomainConfigDataMutationResponse'
  info: CreateInfo
  vercelDomainConfigData: Array<VercelDomainConfigData>
}

export type CreateVercelProjectDomainDataMutationResponse = {
  __typename?: 'CreateVercelProjectDomainDataMutationResponse'
  info: CreateInfo
  vercelProjectDomainData: Array<VercelProjectDomainData>
}

export type CustomAction = ActionBase & {
  __typename?: 'CustomAction'
  /** Code to run when action is triggered */
  code: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit: Scalars['Boolean']
  store: Store
  storeAggregate?: Maybe<CustomActionStoreStoreAggregationSelection>
  storeConnection: ActionBaseStoreConnection
  type: ActionKind
}

export type CustomActionStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type CustomActionStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type CustomActionStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type CustomActionAggregateSelection = {
  __typename?: 'CustomActionAggregateSelection'
  code: StringAggregateSelectionNonNullable
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type CustomActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>
}

export type CustomActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
}

export type CustomActionConnectOrCreateWhere = {
  node: CustomActionUniqueWhere
}

export type CustomActionConnectWhere = {
  node: CustomActionWhere
}

export type CustomActionCreateInput = {
  code: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
  store?: InputMaybe<ActionBaseStoreFieldInput>
  type?: ActionKind
}

export type CustomActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>
}

export type CustomActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
}

export type CustomActionEdge = {
  __typename?: 'CustomActionEdge'
  cursor: Scalars['String']
  node: CustomAction
}

export type CustomActionOnCreateInput = {
  code: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
}

export type CustomActionOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more CustomActionSort objects to sort CustomActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CustomActionSort>>
}

export type CustomActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>
}

/** Fields to sort CustomActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one CustomActionSort object. */
export type CustomActionSort = {
  code?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  runOnInit?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type CustomActionStoreAggregateInput = {
  AND?: InputMaybe<Array<CustomActionStoreAggregateInput>>
  OR?: InputMaybe<Array<CustomActionStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<CustomActionStoreNodeAggregationWhereInput>
}

export type CustomActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CustomActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<CustomActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type CustomActionStoreStoreAggregationSelection = {
  __typename?: 'CustomActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<CustomActionStoreStoreNodeAggregateSelection>
}

export type CustomActionStoreStoreNodeAggregateSelection = {
  __typename?: 'CustomActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type CustomActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type CustomActionUpdateInput = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>
}

export type CustomActionWhere = {
  AND?: InputMaybe<Array<CustomActionWhere>>
  OR?: InputMaybe<Array<CustomActionWhere>>
  code?: InputMaybe<Scalars['String']>
  code_CONTAINS?: InputMaybe<Scalars['String']>
  code_ENDS_WITH?: InputMaybe<Scalars['String']>
  code_IN?: InputMaybe<Array<Scalars['String']>>
  code_NOT?: InputMaybe<Scalars['String']>
  code_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  code_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  code_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  code_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  code_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  runOnInit_NOT?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<CustomActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
  type?: InputMaybe<ActionKind>
  type_IN?: InputMaybe<Array<ActionKind>>
  type_NOT?: InputMaybe<ActionKind>
  type_NOT_IN?: InputMaybe<Array<ActionKind>>
}

export type CustomActionsConnection = {
  __typename?: 'CustomActionsConnection'
  edges: Array<CustomActionEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type DeleteInfo = {
  __typename?: 'DeleteInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type DeleteInfoAggregateSelection = {
  __typename?: 'DeleteInfoAggregateSelection'
  bookmark: StringAggregateSelectionNullable
  count: Scalars['Int']
  nodesDeleted: IntAggregateSelectionNonNullable
  relationshipsDeleted: IntAggregateSelectionNonNullable
}

export type DeleteInfoCreateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type DeleteInfoEdge = {
  __typename?: 'DeleteInfoEdge'
  cursor: Scalars['String']
  node: DeleteInfo
}

export type DeleteInfoOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more DeleteInfoSort objects to sort DeleteInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteInfoSort>>
}

/** Fields to sort DeleteInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteInfoSort object. */
export type DeleteInfoSort = {
  bookmark?: InputMaybe<SortDirection>
  nodesDeleted?: InputMaybe<SortDirection>
  relationshipsDeleted?: InputMaybe<SortDirection>
}

export type DeleteInfoUpdateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesDeleted?: InputMaybe<Scalars['Int']>
  relationshipsDeleted?: InputMaybe<Scalars['Int']>
}

export type DeleteInfoWhere = {
  AND?: InputMaybe<Array<DeleteInfoWhere>>
  OR?: InputMaybe<Array<DeleteInfoWhere>>
  bookmark?: InputMaybe<Scalars['String']>
  bookmark_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT?: InputMaybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_STARTS_WITH?: InputMaybe<Scalars['String']>
  nodesDeleted?: InputMaybe<Scalars['Int']>
  nodesDeleted_GT?: InputMaybe<Scalars['Int']>
  nodesDeleted_GTE?: InputMaybe<Scalars['Int']>
  nodesDeleted_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesDeleted_LT?: InputMaybe<Scalars['Int']>
  nodesDeleted_LTE?: InputMaybe<Scalars['Int']>
  nodesDeleted_NOT?: InputMaybe<Scalars['Int']>
  nodesDeleted_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsDeleted?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_GT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_GTE?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsDeleted_LT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_LTE?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_NOT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
}

export type DeleteInfosConnection = {
  __typename?: 'DeleteInfosConnection'
  edges: Array<DeleteInfoEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Domain = {
  __typename?: 'Domain'
  app: App
  appAggregate?: Maybe<DomainAppAppAggregationSelection>
  appConnection: DomainAppConnection
  domainConfig: VercelDomainConfigData
  id: Scalars['ID']
  name: Scalars['String']
  projectDomain: VercelProjectDomainData
}

export type DomainAppArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type DomainAppAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AppWhere>
}

export type DomainAppConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<DomainAppConnectionSort>>
  where?: InputMaybe<DomainAppConnectionWhere>
}

export type DomainAggregateSelection = {
  __typename?: 'DomainAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type DomainAppAggregateInput = {
  AND?: InputMaybe<Array<DomainAppAggregateInput>>
  OR?: InputMaybe<Array<DomainAppAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<DomainAppNodeAggregationWhereInput>
}

export type DomainAppAppAggregationSelection = {
  __typename?: 'DomainAppAppAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<DomainAppAppNodeAggregateSelection>
}

export type DomainAppAppNodeAggregateSelection = {
  __typename?: 'DomainAppAppNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type DomainAppConnectFieldInput = {
  connect?: InputMaybe<AppConnectInput>
  where?: InputMaybe<AppConnectWhere>
}

export type DomainAppConnectOrCreateFieldInput = {
  onCreate: DomainAppConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type DomainAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type DomainAppConnection = {
  __typename?: 'DomainAppConnection'
  edges: Array<DomainAppRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type DomainAppConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type DomainAppConnectionWhere = {
  AND?: InputMaybe<Array<DomainAppConnectionWhere>>
  OR?: InputMaybe<Array<DomainAppConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type DomainAppCreateFieldInput = {
  node: AppCreateInput
}

export type DomainAppDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<DomainAppConnectionWhere>
}

export type DomainAppDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<DomainAppConnectionWhere>
}

export type DomainAppFieldInput = {
  connect?: InputMaybe<DomainAppConnectFieldInput>
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>
  create?: InputMaybe<DomainAppCreateFieldInput>
}

export type DomainAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type DomainAppRelationship = {
  __typename?: 'DomainAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type DomainAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type DomainAppUpdateFieldInput = {
  connect?: InputMaybe<DomainAppConnectFieldInput>
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>
  create?: InputMaybe<DomainAppCreateFieldInput>
  delete?: InputMaybe<DomainAppDeleteFieldInput>
  disconnect?: InputMaybe<DomainAppDisconnectFieldInput>
  update?: InputMaybe<DomainAppUpdateConnectionInput>
  where?: InputMaybe<DomainAppConnectionWhere>
}

export type DomainConnectInput = {
  app?: InputMaybe<DomainAppConnectFieldInput>
}

export type DomainConnectOrCreateInput = {
  app?: InputMaybe<DomainAppConnectOrCreateFieldInput>
}

export type DomainConnectOrCreateWhere = {
  node: DomainUniqueWhere
}

export type DomainConnectWhere = {
  node: DomainWhere
}

export type DomainCreateInput = {
  app?: InputMaybe<DomainAppFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
}

export type DomainDeleteInput = {
  app?: InputMaybe<DomainAppDeleteFieldInput>
}

export type DomainDisconnectInput = {
  app?: InputMaybe<DomainAppDisconnectFieldInput>
}

export type DomainEdge = {
  __typename?: 'DomainEdge'
  cursor: Scalars['String']
  node: Domain
}

export type DomainOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type DomainOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more DomainSort objects to sort Domains by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DomainSort>>
}

export type DomainRelationInput = {
  app?: InputMaybe<DomainAppCreateFieldInput>
}

/** Fields to sort Domains by. The order in which sorts are applied is not guaranteed when specifying many fields in one DomainSort object. */
export type DomainSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type DomainUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type DomainUpdateInput = {
  app?: InputMaybe<DomainAppUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type DomainWhere = {
  AND?: InputMaybe<Array<DomainWhere>>
  OR?: InputMaybe<Array<DomainWhere>>
  app?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<DomainAppAggregateInput>
  appConnection?: InputMaybe<DomainAppConnectionWhere>
  appConnection_NOT?: InputMaybe<DomainAppConnectionWhere>
  app_NOT?: InputMaybe<AppWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type DomainsConnection = {
  __typename?: 'DomainsConnection'
  edges: Array<DomainEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Element = {
  __typename?: 'Element'
  atom?: Maybe<Atom>
  atomAggregate?: Maybe<ElementAtomAtomAggregationSelection>
  atomConnection: ElementAtomConnection
  children: Array<Element>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  childrenConnection: ElementChildrenConnection
  childrenRoot?: Maybe<Element>
  childrenRootAggregate?: Maybe<ElementElementChildrenRootAggregationSelection>
  childrenRootConnection: ElementChildrenRootConnection
  component?: Maybe<Component>
  componentAggregate?: Maybe<ElementComponentComponentAggregationSelection>
  componentConnection: ElementComponentConnection
  customCss?: Maybe<Scalars['String']>
  descendantElements?: Maybe<Array<Element>>
  guiCss?: Maybe<Scalars['String']>
  hooks: Array<Hook>
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>
  hooksConnection: ElementHooksConnection
  id: Scalars['ID']
  instanceOfComponent?: Maybe<Component>
  instanceOfComponentAggregate?: Maybe<ElementComponentInstanceOfComponentAggregationSelection>
  instanceOfComponentConnection: ElementInstanceOfComponentConnection
  name?: Maybe<Scalars['String']>
  nextSibling?: Maybe<Element>
  nextSiblingAggregate?: Maybe<ElementElementNextSiblingAggregationSelection>
  nextSiblingConnection: ElementNextSiblingConnection
  page?: Maybe<Page>
  pageAggregate?: Maybe<ElementPagePageAggregationSelection>
  pageConnection: ElementPageConnection
  parentElement?: Maybe<Element>
  parentElementAggregate?: Maybe<ElementElementParentElementAggregationSelection>
  parentElementConnection: ElementParentElementConnection
  postRenderActionId?: Maybe<Scalars['String']>
  preRenderActionId?: Maybe<Scalars['String']>
  prevSibling?: Maybe<Element>
  prevSiblingAggregate?: Maybe<ElementElementPrevSiblingAggregationSelection>
  prevSiblingConnection: ElementPrevSiblingConnection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingPropMapBindingsAggregationSelection>
  propMapBindingsConnection: ElementPropMapBindingsConnection
  propTransformationJs?: Maybe<Scalars['String']>
  props?: Maybe<Prop>
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>
  propsConnection: ElementPropsConnection
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  rootOf?: Maybe<Element>
  rootOfAggregate?: Maybe<ElementElementRootOfAggregationSelection>
  rootOfConnection: ElementRootOfConnection
}

export type ElementAtomArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}

export type ElementAtomAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AtomWhere>
}

export type ElementAtomConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementAtomConnectionSort>>
  where?: InputMaybe<ElementAtomConnectionWhere>
}

export type ElementChildrenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementChildrenConnectionSort>>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementChildrenRootArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenRootAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementChildrenRootConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementChildrenRootConnectionSort>>
  where?: InputMaybe<ElementChildrenRootConnectionWhere>
}

export type ElementComponentArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}

export type ElementComponentAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ComponentWhere>
}

export type ElementComponentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementComponentConnectionSort>>
  where?: InputMaybe<ElementComponentConnectionWhere>
}

export type ElementHooksArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<HookOptions>
  where?: InputMaybe<HookWhere>
}

export type ElementHooksAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<HookWhere>
}

export type ElementHooksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementHooksConnectionSort>>
  where?: InputMaybe<ElementHooksConnectionWhere>
}

export type ElementInstanceOfComponentArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}

export type ElementInstanceOfComponentAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ComponentWhere>
}

export type ElementInstanceOfComponentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementInstanceOfComponentConnectionSort>>
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
}

export type ElementNextSiblingArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementNextSiblingAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementNextSiblingConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementNextSiblingConnectionSort>>
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
}

export type ElementPageArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type ElementPageAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PageWhere>
}

export type ElementPageConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementPageConnectionSort>>
  where?: InputMaybe<ElementPageConnectionWhere>
}

export type ElementParentElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementParentElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementParentElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementParentElementConnectionSort>>
  where?: InputMaybe<ElementParentElementConnectionWhere>
}

export type ElementPrevSiblingArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementPrevSiblingAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementPrevSiblingConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementPrevSiblingConnectionSort>>
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
}

export type ElementPropMapBindingsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropMapBindingOptions>
  where?: InputMaybe<PropMapBindingWhere>
}

export type ElementPropMapBindingsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropMapBindingWhere>
}

export type ElementPropMapBindingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementPropMapBindingsConnectionSort>>
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
}

export type ElementPropsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type ElementPropsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropWhere>
}

export type ElementPropsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementPropsConnectionSort>>
  where?: InputMaybe<ElementPropsConnectionWhere>
}

export type ElementRootOfArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type ElementRootOfAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type ElementRootOfConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ElementRootOfConnectionSort>>
  where?: InputMaybe<ElementRootOfConnectionWhere>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementAtomAggregateInput = {
  AND?: InputMaybe<Array<ElementAtomAggregateInput>>
  OR?: InputMaybe<Array<ElementAtomAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementAtomNodeAggregationWhereInput>
}

export type ElementAtomAtomAggregationSelection = {
  __typename?: 'ElementAtomAtomAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementAtomAtomNodeAggregateSelection>
}

export type ElementAtomAtomNodeAggregateSelection = {
  __typename?: 'ElementAtomAtomNodeAggregateSelection'
  icon: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementAtomConnectFieldInput = {
  connect?: InputMaybe<AtomConnectInput>
  where?: InputMaybe<AtomConnectWhere>
}

export type ElementAtomConnectOrCreateFieldInput = {
  onCreate: ElementAtomConnectOrCreateFieldInputOnCreate
  where: AtomConnectOrCreateWhere
}

export type ElementAtomConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type ElementAtomConnection = {
  __typename?: 'ElementAtomConnection'
  edges: Array<ElementAtomRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementAtomConnectionSort = {
  node?: InputMaybe<AtomSort>
}

export type ElementAtomConnectionWhere = {
  AND?: InputMaybe<Array<ElementAtomConnectionWhere>>
  OR?: InputMaybe<Array<ElementAtomConnectionWhere>>
  node?: InputMaybe<AtomWhere>
  node_NOT?: InputMaybe<AtomWhere>
}

export type ElementAtomCreateFieldInput = {
  node: AtomCreateInput
}

export type ElementAtomDeleteFieldInput = {
  delete?: InputMaybe<AtomDeleteInput>
  where?: InputMaybe<ElementAtomConnectionWhere>
}

export type ElementAtomDisconnectFieldInput = {
  disconnect?: InputMaybe<AtomDisconnectInput>
  where?: InputMaybe<ElementAtomConnectionWhere>
}

export type ElementAtomFieldInput = {
  connect?: InputMaybe<ElementAtomConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
  create?: InputMaybe<ElementAtomCreateFieldInput>
}

export type ElementAtomNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementAtomNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementAtomNodeAggregationWhereInput>>
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  icon_EQUAL?: InputMaybe<Scalars['String']>
  icon_GT?: InputMaybe<Scalars['Int']>
  icon_GTE?: InputMaybe<Scalars['Int']>
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  icon_LT?: InputMaybe<Scalars['Int']>
  icon_LTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementAtomRelationship = {
  __typename?: 'ElementAtomRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type ElementAtomUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type ElementAtomUpdateFieldInput = {
  connect?: InputMaybe<ElementAtomConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
  create?: InputMaybe<ElementAtomCreateFieldInput>
  delete?: InputMaybe<ElementAtomDeleteFieldInput>
  disconnect?: InputMaybe<ElementAtomDisconnectFieldInput>
  update?: InputMaybe<ElementAtomUpdateConnectionInput>
  where?: InputMaybe<ElementAtomConnectionWhere>
}

export type ElementChildrenAggregateInput = {
  AND?: InputMaybe<Array<ElementChildrenAggregateInput>>
  OR?: InputMaybe<Array<ElementChildrenAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  edge?: InputMaybe<ElementChildrenEdgeAggregationWhereInput>
  node?: InputMaybe<ElementChildrenNodeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  connect?: InputMaybe<Array<ElementConnectInput>>
  edge?: InputMaybe<ParentOfElementCreateInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementChildrenConnectOrCreateFieldInput = {
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<ParentOfElementCreateInput>
  node: ElementOnCreateInput
}

export type ElementChildrenConnection = {
  __typename?: 'ElementChildrenConnection'
  edges: Array<ElementChildrenRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementChildrenConnectionSort = {
  edge?: InputMaybe<ParentOfElementSort>
  node?: InputMaybe<ElementSort>
}

export type ElementChildrenConnectionWhere = {
  AND?: InputMaybe<Array<ElementChildrenConnectionWhere>>
  OR?: InputMaybe<Array<ElementChildrenConnectionWhere>>
  edge?: InputMaybe<ParentOfElementWhere>
  edge_NOT?: InputMaybe<ParentOfElementWhere>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementChildrenCreateFieldInput = {
  edge?: InputMaybe<ParentOfElementCreateInput>
  node: ElementCreateInput
}

export type ElementChildrenDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementChildrenDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementChildrenEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  order_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  order_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  order_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  order_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  order_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  order_EQUAL?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
  order_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_MAX_EQUAL?: InputMaybe<Scalars['Int']>
  order_MAX_GT?: InputMaybe<Scalars['Int']>
  order_MAX_GTE?: InputMaybe<Scalars['Int']>
  order_MAX_LT?: InputMaybe<Scalars['Int']>
  order_MAX_LTE?: InputMaybe<Scalars['Int']>
  order_MIN_EQUAL?: InputMaybe<Scalars['Int']>
  order_MIN_GT?: InputMaybe<Scalars['Int']>
  order_MIN_GTE?: InputMaybe<Scalars['Int']>
  order_MIN_LT?: InputMaybe<Scalars['Int']>
  order_MIN_LTE?: InputMaybe<Scalars['Int']>
  order_SUM_EQUAL?: InputMaybe<Scalars['Int']>
  order_SUM_GT?: InputMaybe<Scalars['Int']>
  order_SUM_GTE?: InputMaybe<Scalars['Int']>
  order_SUM_LT?: InputMaybe<Scalars['Int']>
  order_SUM_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementChildrenFieldInput = {
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
}

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementChildrenRelationship = ParentOfElement & {
  __typename?: 'ElementChildrenRelationship'
  cursor: Scalars['String']
  node: Element
  order?: Maybe<Scalars['Int']>
}

export type ElementChildrenRootAggregateInput = {
  AND?: InputMaybe<Array<ElementChildrenRootAggregateInput>>
  OR?: InputMaybe<Array<ElementChildrenRootAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementChildrenRootNodeAggregationWhereInput>
}

export type ElementChildrenRootConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementChildrenRootConnectOrCreateFieldInput = {
  onCreate: ElementChildrenRootConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementChildrenRootConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementChildrenRootConnection = {
  __typename?: 'ElementChildrenRootConnection'
  edges: Array<ElementChildrenRootRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementChildrenRootConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementChildrenRootConnectionWhere = {
  AND?: InputMaybe<Array<ElementChildrenRootConnectionWhere>>
  OR?: InputMaybe<Array<ElementChildrenRootConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementChildrenRootCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementChildrenRootDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementChildrenRootConnectionWhere>
}

export type ElementChildrenRootDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementChildrenRootConnectionWhere>
}

export type ElementChildrenRootFieldInput = {
  connect?: InputMaybe<ElementChildrenRootConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementChildrenRootConnectOrCreateFieldInput>
  create?: InputMaybe<ElementChildrenRootCreateFieldInput>
}

export type ElementChildrenRootNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenRootNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenRootNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementChildrenRootRelationship = {
  __typename?: 'ElementChildrenRootRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementChildrenRootUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementChildrenRootUpdateFieldInput = {
  connect?: InputMaybe<ElementChildrenRootConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementChildrenRootConnectOrCreateFieldInput>
  create?: InputMaybe<ElementChildrenRootCreateFieldInput>
  delete?: InputMaybe<ElementChildrenRootDeleteFieldInput>
  disconnect?: InputMaybe<ElementChildrenRootDisconnectFieldInput>
  update?: InputMaybe<ElementChildrenRootUpdateConnectionInput>
  where?: InputMaybe<ElementChildrenRootConnectionWhere>
}

export type ElementChildrenUpdateConnectionInput = {
  edge?: InputMaybe<ParentOfElementUpdateInput>
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementChildrenUpdateFieldInput = {
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  disconnect?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  update?: InputMaybe<ElementChildrenUpdateConnectionInput>
  where?: InputMaybe<ElementChildrenConnectionWhere>
}

export type ElementComponentAggregateInput = {
  AND?: InputMaybe<Array<ElementComponentAggregateInput>>
  OR?: InputMaybe<Array<ElementComponentAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementComponentNodeAggregationWhereInput>
}

export type ElementComponentComponentAggregationSelection = {
  __typename?: 'ElementComponentComponentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementComponentComponentNodeAggregateSelection>
}

export type ElementComponentComponentNodeAggregateSelection = {
  __typename?: 'ElementComponentComponentNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementComponentConnectFieldInput = {
  connect?: InputMaybe<ComponentConnectInput>
  where?: InputMaybe<ComponentConnectWhere>
}

export type ElementComponentConnectOrCreateFieldInput = {
  onCreate: ElementComponentConnectOrCreateFieldInputOnCreate
  where: ComponentConnectOrCreateWhere
}

export type ElementComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementComponentConnection = {
  __typename?: 'ElementComponentConnection'
  edges: Array<ElementComponentRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>
}

export type ElementComponentConnectionWhere = {
  AND?: InputMaybe<Array<ElementComponentConnectionWhere>>
  OR?: InputMaybe<Array<ElementComponentConnectionWhere>>
  node?: InputMaybe<ComponentWhere>
  node_NOT?: InputMaybe<ComponentWhere>
}

export type ElementComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementComponentDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>
  where?: InputMaybe<ElementComponentConnectionWhere>
}

export type ElementComponentDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>
  where?: InputMaybe<ElementComponentConnectionWhere>
}

export type ElementComponentFieldInput = {
  connect?: InputMaybe<ElementComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementComponentCreateFieldInput>
}

export type ElementComponentInstanceOfComponentAggregationSelection = {
  __typename?: 'ElementComponentInstanceOfComponentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementComponentInstanceOfComponentNodeAggregateSelection>
}

export type ElementComponentInstanceOfComponentNodeAggregateSelection = {
  __typename?: 'ElementComponentInstanceOfComponentNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementComponentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementComponentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementComponentRelationship = {
  __typename?: 'ElementComponentRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementComponentUpdateFieldInput = {
  connect?: InputMaybe<ElementComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementComponentCreateFieldInput>
  delete?: InputMaybe<ElementComponentDeleteFieldInput>
  disconnect?: InputMaybe<ElementComponentDisconnectFieldInput>
  update?: InputMaybe<ElementComponentUpdateConnectionInput>
  where?: InputMaybe<ElementComponentConnectionWhere>
}

export type ElementConnectInput = {
  atom?: InputMaybe<ElementAtomConnectFieldInput>
  children?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootConnectFieldInput>
  component?: InputMaybe<ElementComponentConnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  nextSibling?: InputMaybe<ElementNextSiblingConnectFieldInput>
  page?: InputMaybe<ElementPageConnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  props?: InputMaybe<ElementPropsConnectFieldInput>
  rootOf?: InputMaybe<ElementRootOfConnectFieldInput>
}

export type ElementConnectOrCreateInput = {
  atom?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
  children?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootConnectOrCreateFieldInput>
  component?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  nextSibling?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
  page?: InputMaybe<ElementPageConnectOrCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
  rootOf?: InputMaybe<ElementRootOfConnectOrCreateFieldInput>
}

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere
}

export type ElementConnectWhere = {
  node: ElementWhere
}

export type ElementCreateInput = {
  atom?: InputMaybe<ElementAtomFieldInput>
  children?: InputMaybe<ElementChildrenFieldInput>
  childrenRoot?: InputMaybe<ElementChildrenRootFieldInput>
  component?: InputMaybe<ElementComponentFieldInput>
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<ElementHooksFieldInput>
  id: Scalars['ID']
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentFieldInput>
  name?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementNextSiblingFieldInput>
  page?: InputMaybe<ElementPageFieldInput>
  parentElement?: InputMaybe<ElementParentElementFieldInput>
  postRenderActionId?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  prevSibling?: InputMaybe<ElementPrevSiblingFieldInput>
  propMapBindings?: InputMaybe<ElementPropMapBindingsFieldInput>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<ElementPropsFieldInput>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  rootOf?: InputMaybe<ElementRootOfFieldInput>
}

export type ElementDeleteInput = {
  atom?: InputMaybe<ElementAtomDeleteFieldInput>
  children?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootDeleteFieldInput>
  component?: InputMaybe<ElementComponentDeleteFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDeleteFieldInput>
  nextSibling?: InputMaybe<ElementNextSiblingDeleteFieldInput>
  page?: InputMaybe<ElementPageDeleteFieldInput>
  parentElement?: InputMaybe<ElementParentElementDeleteFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingDeleteFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
  props?: InputMaybe<ElementPropsDeleteFieldInput>
  rootOf?: InputMaybe<ElementRootOfDeleteFieldInput>
}

export type ElementDisconnectInput = {
  atom?: InputMaybe<ElementAtomDisconnectFieldInput>
  children?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootDisconnectFieldInput>
  component?: InputMaybe<ElementComponentDisconnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDisconnectFieldInput>
  nextSibling?: InputMaybe<ElementNextSiblingDisconnectFieldInput>
  page?: InputMaybe<ElementPageDisconnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementDisconnectFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsDisconnectFieldInput>
  >
  props?: InputMaybe<ElementPropsDisconnectFieldInput>
  rootOf?: InputMaybe<ElementRootOfDisconnectFieldInput>
}

export type ElementEdge = {
  __typename?: 'ElementEdge'
  cursor: Scalars['String']
  node: Element
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  edge?: Maybe<ElementElementChildrenEdgeAggregateSelection>
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
}

export type ElementElementChildrenEdgeAggregateSelection = {
  __typename?: 'ElementElementChildrenEdgeAggregateSelection'
  order: IntAggregateSelectionNullable
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementChildrenRootAggregationSelection = {
  __typename?: 'ElementElementChildrenRootAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenRootNodeAggregateSelection>
}

export type ElementElementChildrenRootNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenRootNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementNextSiblingAggregationSelection = {
  __typename?: 'ElementElementNextSiblingAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementNextSiblingNodeAggregateSelection>
}

export type ElementElementNextSiblingNodeAggregateSelection = {
  __typename?: 'ElementElementNextSiblingNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementParentElementAggregationSelection = {
  __typename?: 'ElementElementParentElementAggregationSelection'
  count: Scalars['Int']
  edge?: Maybe<ElementElementParentElementEdgeAggregateSelection>
  node?: Maybe<ElementElementParentElementNodeAggregateSelection>
}

export type ElementElementParentElementEdgeAggregateSelection = {
  __typename?: 'ElementElementParentElementEdgeAggregateSelection'
  order: IntAggregateSelectionNullable
}

export type ElementElementParentElementNodeAggregateSelection = {
  __typename?: 'ElementElementParentElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementPrevSiblingAggregationSelection = {
  __typename?: 'ElementElementPrevSiblingAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementPrevSiblingNodeAggregateSelection>
}

export type ElementElementPrevSiblingNodeAggregateSelection = {
  __typename?: 'ElementElementPrevSiblingNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementRootOfAggregationSelection = {
  __typename?: 'ElementElementRootOfAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementRootOfNodeAggregateSelection>
}

export type ElementElementRootOfNodeAggregateSelection = {
  __typename?: 'ElementElementRootOfNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementGraph = {
  __typename?: 'ElementGraph'
  descendants: Array<Scalars['ID']>
  id: Scalars['ID']
}

export type ElementGraphInput = {
  rootId: Scalars['String']
}

export type ElementHookHooksAggregationSelection = {
  __typename?: 'ElementHookHooksAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementHookHooksNodeAggregateSelection>
}

export type ElementHookHooksNodeAggregateSelection = {
  __typename?: 'ElementHookHooksNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
}

export type ElementHooksAggregateInput = {
  AND?: InputMaybe<Array<ElementHooksAggregateInput>>
  OR?: InputMaybe<Array<ElementHooksAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementHooksNodeAggregationWhereInput>
}

export type ElementHooksConnectFieldInput = {
  connect?: InputMaybe<Array<HookConnectInput>>
  where?: InputMaybe<HookConnectWhere>
}

export type ElementHooksConnectOrCreateFieldInput = {
  onCreate: ElementHooksConnectOrCreateFieldInputOnCreate
  where: HookConnectOrCreateWhere
}

export type ElementHooksConnectOrCreateFieldInputOnCreate = {
  node: HookOnCreateInput
}

export type ElementHooksConnection = {
  __typename?: 'ElementHooksConnection'
  edges: Array<ElementHooksRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementHooksConnectionSort = {
  node?: InputMaybe<HookSort>
}

export type ElementHooksConnectionWhere = {
  AND?: InputMaybe<Array<ElementHooksConnectionWhere>>
  OR?: InputMaybe<Array<ElementHooksConnectionWhere>>
  node?: InputMaybe<HookWhere>
  node_NOT?: InputMaybe<HookWhere>
}

export type ElementHooksCreateFieldInput = {
  node: HookCreateInput
}

export type ElementHooksDeleteFieldInput = {
  delete?: InputMaybe<HookDeleteInput>
  where?: InputMaybe<ElementHooksConnectionWhere>
}

export type ElementHooksDisconnectFieldInput = {
  disconnect?: InputMaybe<HookDisconnectInput>
  where?: InputMaybe<ElementHooksConnectionWhere>
}

export type ElementHooksFieldInput = {
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>
}

export type ElementHooksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type ElementHooksRelationship = {
  __typename?: 'ElementHooksRelationship'
  cursor: Scalars['String']
  node: Hook
}

export type ElementHooksUpdateConnectionInput = {
  node?: InputMaybe<HookUpdateInput>
}

export type ElementHooksUpdateFieldInput = {
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  delete?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  disconnect?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  update?: InputMaybe<ElementHooksUpdateConnectionInput>
  where?: InputMaybe<ElementHooksConnectionWhere>
}

export type ElementInstanceOfComponentAggregateInput = {
  AND?: InputMaybe<Array<ElementInstanceOfComponentAggregateInput>>
  OR?: InputMaybe<Array<ElementInstanceOfComponentAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementInstanceOfComponentNodeAggregationWhereInput>
}

export type ElementInstanceOfComponentConnectFieldInput = {
  connect?: InputMaybe<ComponentConnectInput>
  where?: InputMaybe<ComponentConnectWhere>
}

export type ElementInstanceOfComponentConnectOrCreateFieldInput = {
  onCreate: ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate
  where: ComponentConnectOrCreateWhere
}

export type ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementInstanceOfComponentConnection = {
  __typename?: 'ElementInstanceOfComponentConnection'
  edges: Array<ElementInstanceOfComponentRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementInstanceOfComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>
}

export type ElementInstanceOfComponentConnectionWhere = {
  AND?: InputMaybe<Array<ElementInstanceOfComponentConnectionWhere>>
  OR?: InputMaybe<Array<ElementInstanceOfComponentConnectionWhere>>
  node?: InputMaybe<ComponentWhere>
  node_NOT?: InputMaybe<ComponentWhere>
}

export type ElementInstanceOfComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementInstanceOfComponentDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
}

export type ElementInstanceOfComponentDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
}

export type ElementInstanceOfComponentFieldInput = {
  connect?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
}

export type ElementInstanceOfComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementInstanceOfComponentRelationship = {
  __typename?: 'ElementInstanceOfComponentRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementInstanceOfComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementInstanceOfComponentUpdateFieldInput = {
  connect?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  create?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  delete?: InputMaybe<ElementInstanceOfComponentDeleteFieldInput>
  disconnect?: InputMaybe<ElementInstanceOfComponentDisconnectFieldInput>
  update?: InputMaybe<ElementInstanceOfComponentUpdateConnectionInput>
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
}

export type ElementNextSiblingAggregateInput = {
  AND?: InputMaybe<Array<ElementNextSiblingAggregateInput>>
  OR?: InputMaybe<Array<ElementNextSiblingAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementNextSiblingNodeAggregationWhereInput>
}

export type ElementNextSiblingConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementNextSiblingConnectOrCreateFieldInput = {
  onCreate: ElementNextSiblingConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementNextSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementNextSiblingConnection = {
  __typename?: 'ElementNextSiblingConnection'
  edges: Array<ElementNextSiblingRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementNextSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementNextSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>
  OR?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementNextSiblingCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementNextSiblingDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
}

export type ElementNextSiblingDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
}

export type ElementNextSiblingFieldInput = {
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>
}

export type ElementNextSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementNextSiblingRelationship = {
  __typename?: 'ElementNextSiblingRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementNextSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementNextSiblingUpdateFieldInput = {
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>
  delete?: InputMaybe<ElementNextSiblingDeleteFieldInput>
  disconnect?: InputMaybe<ElementNextSiblingDisconnectFieldInput>
  update?: InputMaybe<ElementNextSiblingUpdateConnectionInput>
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
}

export type ElementOnCreateInput = {
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  postRenderActionId?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type ElementOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementSort>>
}

export type ElementPageAggregateInput = {
  AND?: InputMaybe<Array<ElementPageAggregateInput>>
  OR?: InputMaybe<Array<ElementPageAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementPageNodeAggregationWhereInput>
}

export type ElementPageConnectFieldInput = {
  connect?: InputMaybe<PageConnectInput>
  where?: InputMaybe<PageConnectWhere>
}

export type ElementPageConnectOrCreateFieldInput = {
  onCreate: ElementPageConnectOrCreateFieldInputOnCreate
  where: PageConnectOrCreateWhere
}

export type ElementPageConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput
}

export type ElementPageConnection = {
  __typename?: 'ElementPageConnection'
  edges: Array<ElementPageRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementPageConnectionSort = {
  node?: InputMaybe<PageSort>
}

export type ElementPageConnectionWhere = {
  AND?: InputMaybe<Array<ElementPageConnectionWhere>>
  OR?: InputMaybe<Array<ElementPageConnectionWhere>>
  node?: InputMaybe<PageWhere>
  node_NOT?: InputMaybe<PageWhere>
}

export type ElementPageCreateFieldInput = {
  node: PageCreateInput
}

export type ElementPageDeleteFieldInput = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<ElementPageConnectionWhere>
}

export type ElementPageDisconnectFieldInput = {
  disconnect?: InputMaybe<PageDisconnectInput>
  where?: InputMaybe<ElementPageConnectionWhere>
}

export type ElementPageFieldInput = {
  connect?: InputMaybe<ElementPageConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPageCreateFieldInput>
}

export type ElementPageNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPagePageAggregationSelection = {
  __typename?: 'ElementPagePageAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementPagePageNodeAggregateSelection>
}

export type ElementPagePageNodeAggregateSelection = {
  __typename?: 'ElementPagePageNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type ElementPageRelationship = {
  __typename?: 'ElementPageRelationship'
  cursor: Scalars['String']
  node: Page
}

export type ElementPageUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>
}

export type ElementPageUpdateFieldInput = {
  connect?: InputMaybe<ElementPageConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPageCreateFieldInput>
  delete?: InputMaybe<ElementPageDeleteFieldInput>
  disconnect?: InputMaybe<ElementPageDisconnectFieldInput>
  update?: InputMaybe<ElementPageUpdateConnectionInput>
  where?: InputMaybe<ElementPageConnectionWhere>
}

export type ElementParentElementAggregateInput = {
  AND?: InputMaybe<Array<ElementParentElementAggregateInput>>
  OR?: InputMaybe<Array<ElementParentElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  edge?: InputMaybe<ElementParentElementEdgeAggregationWhereInput>
  node?: InputMaybe<ElementParentElementNodeAggregationWhereInput>
}

export type ElementParentElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  edge?: InputMaybe<ParentOfElementCreateInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementParentElementConnectOrCreateFieldInput = {
  onCreate: ElementParentElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementParentElementConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<ParentOfElementCreateInput>
  node: ElementOnCreateInput
}

export type ElementParentElementConnection = {
  __typename?: 'ElementParentElementConnection'
  edges: Array<ElementParentElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementParentElementConnectionSort = {
  edge?: InputMaybe<ParentOfElementSort>
  node?: InputMaybe<ElementSort>
}

export type ElementParentElementConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentElementConnectionWhere>>
  OR?: InputMaybe<Array<ElementParentElementConnectionWhere>>
  edge?: InputMaybe<ParentOfElementWhere>
  edge_NOT?: InputMaybe<ParentOfElementWhere>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementParentElementCreateFieldInput = {
  edge?: InputMaybe<ParentOfElementCreateInput>
  node: ElementCreateInput
}

export type ElementParentElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementParentElementConnectionWhere>
}

export type ElementParentElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementParentElementConnectionWhere>
}

export type ElementParentElementEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  order_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  order_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  order_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  order_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  order_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  order_EQUAL?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
  order_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_MAX_EQUAL?: InputMaybe<Scalars['Int']>
  order_MAX_GT?: InputMaybe<Scalars['Int']>
  order_MAX_GTE?: InputMaybe<Scalars['Int']>
  order_MAX_LT?: InputMaybe<Scalars['Int']>
  order_MAX_LTE?: InputMaybe<Scalars['Int']>
  order_MIN_EQUAL?: InputMaybe<Scalars['Int']>
  order_MIN_GT?: InputMaybe<Scalars['Int']>
  order_MIN_GTE?: InputMaybe<Scalars['Int']>
  order_MIN_LT?: InputMaybe<Scalars['Int']>
  order_MIN_LTE?: InputMaybe<Scalars['Int']>
  order_SUM_EQUAL?: InputMaybe<Scalars['Int']>
  order_SUM_GT?: InputMaybe<Scalars['Int']>
  order_SUM_GTE?: InputMaybe<Scalars['Int']>
  order_SUM_LT?: InputMaybe<Scalars['Int']>
  order_SUM_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementParentElementFieldInput = {
  connect?: InputMaybe<ElementParentElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
  create?: InputMaybe<ElementParentElementCreateFieldInput>
}

export type ElementParentElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementParentElementRelationship = ParentOfElement & {
  __typename?: 'ElementParentElementRelationship'
  cursor: Scalars['String']
  node: Element
  order?: Maybe<Scalars['Int']>
}

export type ElementParentElementUpdateConnectionInput = {
  edge?: InputMaybe<ParentOfElementUpdateInput>
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementParentElementUpdateFieldInput = {
  connect?: InputMaybe<ElementParentElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
  create?: InputMaybe<ElementParentElementCreateFieldInput>
  delete?: InputMaybe<ElementParentElementDeleteFieldInput>
  disconnect?: InputMaybe<ElementParentElementDisconnectFieldInput>
  update?: InputMaybe<ElementParentElementUpdateConnectionInput>
  where?: InputMaybe<ElementParentElementConnectionWhere>
}

export type ElementPrevSiblingAggregateInput = {
  AND?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>
  OR?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementPrevSiblingNodeAggregationWhereInput>
}

export type ElementPrevSiblingConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementPrevSiblingConnectOrCreateFieldInput = {
  onCreate: ElementPrevSiblingConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementPrevSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementPrevSiblingConnection = {
  __typename?: 'ElementPrevSiblingConnection'
  edges: Array<ElementPrevSiblingRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementPrevSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementPrevSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>
  OR?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementPrevSiblingCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementPrevSiblingDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
}

export type ElementPrevSiblingDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
}

export type ElementPrevSiblingFieldInput = {
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>
}

export type ElementPrevSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPrevSiblingRelationship = {
  __typename?: 'ElementPrevSiblingRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementPrevSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementPrevSiblingUpdateFieldInput = {
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>
  delete?: InputMaybe<ElementPrevSiblingDeleteFieldInput>
  disconnect?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>
  update?: InputMaybe<ElementPrevSiblingUpdateConnectionInput>
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
}

export type ElementPropMapBindingPropMapBindingsAggregationSelection = {
  __typename?: 'ElementPropMapBindingPropMapBindingsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementPropMapBindingPropMapBindingsNodeAggregateSelection>
}

export type ElementPropMapBindingPropMapBindingsNodeAggregateSelection = {
  __typename?: 'ElementPropMapBindingPropMapBindingsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  sourceKey: StringAggregateSelectionNonNullable
  targetKey: StringAggregateSelectionNonNullable
}

export type ElementPropMapBindingsAggregateInput = {
  AND?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>
  OR?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementPropMapBindingsNodeAggregationWhereInput>
}

export type ElementPropMapBindingsConnectFieldInput = {
  connect?: InputMaybe<Array<PropMapBindingConnectInput>>
  where?: InputMaybe<PropMapBindingConnectWhere>
}

export type ElementPropMapBindingsConnectOrCreateFieldInput = {
  onCreate: ElementPropMapBindingsConnectOrCreateFieldInputOnCreate
  where: PropMapBindingConnectOrCreateWhere
}

export type ElementPropMapBindingsConnectOrCreateFieldInputOnCreate = {
  node: PropMapBindingOnCreateInput
}

export type ElementPropMapBindingsConnection = {
  __typename?: 'ElementPropMapBindingsConnection'
  edges: Array<ElementPropMapBindingsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementPropMapBindingsConnectionSort = {
  node?: InputMaybe<PropMapBindingSort>
}

export type ElementPropMapBindingsConnectionWhere = {
  AND?: InputMaybe<Array<ElementPropMapBindingsConnectionWhere>>
  OR?: InputMaybe<Array<ElementPropMapBindingsConnectionWhere>>
  node?: InputMaybe<PropMapBindingWhere>
  node_NOT?: InputMaybe<PropMapBindingWhere>
}

export type ElementPropMapBindingsCreateFieldInput = {
  node: PropMapBindingCreateInput
}

export type ElementPropMapBindingsDeleteFieldInput = {
  delete?: InputMaybe<PropMapBindingDeleteInput>
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
}

export type ElementPropMapBindingsDisconnectFieldInput = {
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
}

export type ElementPropMapBindingsFieldInput = {
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
}

export type ElementPropMapBindingsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  sourceKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  sourceKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  sourceKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  sourceKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  sourceKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  sourceKey_EQUAL?: InputMaybe<Scalars['String']>
  sourceKey_GT?: InputMaybe<Scalars['Int']>
  sourceKey_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  sourceKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  sourceKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  sourceKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  sourceKey_LT?: InputMaybe<Scalars['Int']>
  sourceKey_LTE?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  targetKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  targetKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  targetKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  targetKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  targetKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  targetKey_EQUAL?: InputMaybe<Scalars['String']>
  targetKey_GT?: InputMaybe<Scalars['Int']>
  targetKey_GTE?: InputMaybe<Scalars['Int']>
  targetKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  targetKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  targetKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  targetKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  targetKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  targetKey_LT?: InputMaybe<Scalars['Int']>
  targetKey_LTE?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPropMapBindingsRelationship = {
  __typename?: 'ElementPropMapBindingsRelationship'
  cursor: Scalars['String']
  node: PropMapBinding
}

export type ElementPropMapBindingsUpdateConnectionInput = {
  node?: InputMaybe<PropMapBindingUpdateInput>
}

export type ElementPropMapBindingsUpdateFieldInput = {
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
  delete?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<ElementPropMapBindingsDisconnectFieldInput>>
  update?: InputMaybe<ElementPropMapBindingsUpdateConnectionInput>
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
}

export type ElementPropPropsAggregationSelection = {
  __typename?: 'ElementPropPropsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementPropPropsNodeAggregateSelection>
}

export type ElementPropPropsNodeAggregateSelection = {
  __typename?: 'ElementPropPropsNodeAggregateSelection'
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type ElementPropsAggregateInput = {
  AND?: InputMaybe<Array<ElementPropsAggregateInput>>
  OR?: InputMaybe<Array<ElementPropsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementPropsNodeAggregationWhereInput>
}

export type ElementPropsConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type ElementPropsConnectOrCreateFieldInput = {
  onCreate: ElementPropsConnectOrCreateFieldInputOnCreate
  where: PropConnectOrCreateWhere
}

export type ElementPropsConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type ElementPropsConnection = {
  __typename?: 'ElementPropsConnection'
  edges: Array<ElementPropsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementPropsConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type ElementPropsConnectionWhere = {
  AND?: InputMaybe<Array<ElementPropsConnectionWhere>>
  OR?: InputMaybe<Array<ElementPropsConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type ElementPropsCreateFieldInput = {
  node: PropCreateInput
}

export type ElementPropsDeleteFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>
}

export type ElementPropsDisconnectFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>
}

export type ElementPropsFieldInput = {
  connect?: InputMaybe<ElementPropsConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPropsCreateFieldInput>
}

export type ElementPropsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type ElementPropsRelationship = {
  __typename?: 'ElementPropsRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ElementPropsUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ElementPropsUpdateFieldInput = {
  connect?: InputMaybe<ElementPropsConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
  create?: InputMaybe<ElementPropsCreateFieldInput>
  delete?: InputMaybe<ElementPropsDeleteFieldInput>
  disconnect?: InputMaybe<ElementPropsDisconnectFieldInput>
  update?: InputMaybe<ElementPropsUpdateConnectionInput>
  where?: InputMaybe<ElementPropsConnectionWhere>
}

export type ElementRelationInput = {
  atom?: InputMaybe<ElementAtomCreateFieldInput>
  children?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootCreateFieldInput>
  component?: InputMaybe<ElementComponentCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  nextSibling?: InputMaybe<ElementNextSiblingCreateFieldInput>
  page?: InputMaybe<ElementPageCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementCreateFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingCreateFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
  props?: InputMaybe<ElementPropsCreateFieldInput>
  rootOf?: InputMaybe<ElementRootOfCreateFieldInput>
}

export type ElementRootOfAggregateInput = {
  AND?: InputMaybe<Array<ElementRootOfAggregateInput>>
  OR?: InputMaybe<Array<ElementRootOfAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementRootOfNodeAggregationWhereInput>
}

export type ElementRootOfConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type ElementRootOfConnectOrCreateFieldInput = {
  onCreate: ElementRootOfConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type ElementRootOfConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementRootOfConnection = {
  __typename?: 'ElementRootOfConnection'
  edges: Array<ElementRootOfRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementRootOfConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementRootOfConnectionWhere = {
  AND?: InputMaybe<Array<ElementRootOfConnectionWhere>>
  OR?: InputMaybe<Array<ElementRootOfConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementRootOfCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementRootOfDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementRootOfConnectionWhere>
}

export type ElementRootOfDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<ElementRootOfConnectionWhere>
}

export type ElementRootOfFieldInput = {
  connect?: InputMaybe<ElementRootOfConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementRootOfConnectOrCreateFieldInput>
  create?: InputMaybe<ElementRootOfCreateFieldInput>
}

export type ElementRootOfNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementRootOfNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementRootOfNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementRootOfRelationship = {
  __typename?: 'ElementRootOfRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementRootOfUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementRootOfUpdateFieldInput = {
  connect?: InputMaybe<ElementRootOfConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementRootOfConnectOrCreateFieldInput>
  create?: InputMaybe<ElementRootOfCreateFieldInput>
  delete?: InputMaybe<ElementRootOfDeleteFieldInput>
  disconnect?: InputMaybe<ElementRootOfDisconnectFieldInput>
  update?: InputMaybe<ElementRootOfUpdateConnectionInput>
  where?: InputMaybe<ElementRootOfConnectionWhere>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  customCss?: InputMaybe<SortDirection>
  guiCss?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  postRenderActionId?: InputMaybe<SortDirection>
  preRenderActionId?: InputMaybe<SortDirection>
  propTransformationJs?: InputMaybe<SortDirection>
  renderForEachPropKey?: InputMaybe<SortDirection>
  renderIfPropKey?: InputMaybe<SortDirection>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ElementType = TypeBase & {
  __typename?: 'ElementType'
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ElementTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ElementTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ElementTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ElementTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type ElementTypeAggregateSelection = {
  __typename?: 'ElementTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ElementTypeCreateInput = {
  elementKind: ElementTypeKind
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ElementTypeEdge = {
  __typename?: 'ElementTypeEdge'
  cursor: Scalars['String']
  node: ElementType
}

export enum ElementTypeKind {
  /** Pick any element in the current tree */
  AllElements = 'AllElements',
  /** Pick any element from the children of the current element */
  ChildrenOnly = 'ChildrenOnly',
  /** Pick any element from the descendants of the current element */
  DescendantsOnly = 'DescendantsOnly',
  /** Pick parents and siblings of parents of elements (used to move element) */
  ExcludeDescendantsElements = 'ExcludeDescendantsElements',
}

export type ElementTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ElementTypeSort objects to sort ElementTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementTypeSort>>
}

export type ElementTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ElementTypeOwnerNodeAggregationWhereInput>
}

export type ElementTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  elementKind?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ElementTypeUpdateInput = {
  elementKind?: InputMaybe<ElementTypeKind>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type ElementTypeUserOwnerAggregationSelection = {
  __typename?: 'ElementTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>
}

export type ElementTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ElementTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ElementTypeWhere = {
  AND?: InputMaybe<Array<ElementTypeWhere>>
  OR?: InputMaybe<Array<ElementTypeWhere>>
  elementKind?: InputMaybe<ElementTypeKind>
  elementKind_IN?: InputMaybe<Array<ElementTypeKind>>
  elementKind_NOT?: InputMaybe<ElementTypeKind>
  elementKind_NOT_IN?: InputMaybe<Array<ElementTypeKind>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type ElementTypesConnection = {
  __typename?: 'ElementTypesConnection'
  edges: Array<ElementTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  atom?: InputMaybe<ElementAtomUpdateFieldInput>
  children?: InputMaybe<Array<ElementChildrenUpdateFieldInput>>
  childrenRoot?: InputMaybe<ElementChildrenRootUpdateFieldInput>
  component?: InputMaybe<ElementComponentUpdateFieldInput>
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<Array<ElementHooksUpdateFieldInput>>
  id?: InputMaybe<Scalars['ID']>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentUpdateFieldInput>
  name?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementNextSiblingUpdateFieldInput>
  page?: InputMaybe<ElementPageUpdateFieldInput>
  parentElement?: InputMaybe<ElementParentElementUpdateFieldInput>
  postRenderActionId?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  prevSibling?: InputMaybe<ElementPrevSiblingUpdateFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsUpdateFieldInput>>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<ElementPropsUpdateFieldInput>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  rootOf?: InputMaybe<ElementRootOfUpdateFieldInput>
}

export type ElementWhere = {
  AND?: InputMaybe<Array<ElementWhere>>
  OR?: InputMaybe<Array<ElementWhere>>
  atom?: InputMaybe<AtomWhere>
  atomAggregate?: InputMaybe<ElementAtomAggregateInput>
  atomConnection?: InputMaybe<ElementAtomConnectionWhere>
  atomConnection_NOT?: InputMaybe<ElementAtomConnectionWhere>
  atom_NOT?: InputMaybe<AtomWhere>
  childrenAggregate?: InputMaybe<ElementChildrenAggregateInput>
  childrenConnection_ALL?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<ElementChildrenConnectionWhere>
  childrenRoot?: InputMaybe<ElementWhere>
  childrenRootAggregate?: InputMaybe<ElementChildrenRootAggregateInput>
  childrenRootConnection?: InputMaybe<ElementChildrenRootConnectionWhere>
  childrenRootConnection_NOT?: InputMaybe<ElementChildrenRootConnectionWhere>
  childrenRoot_NOT?: InputMaybe<ElementWhere>
  /** Return Elements where all of the related Elements match this filter */
  children_ALL?: InputMaybe<ElementWhere>
  /** Return Elements where none of the related Elements match this filter */
  children_NONE?: InputMaybe<ElementWhere>
  /** Return Elements where one of the related Elements match this filter */
  children_SINGLE?: InputMaybe<ElementWhere>
  /** Return Elements where some of the related Elements match this filter */
  children_SOME?: InputMaybe<ElementWhere>
  component?: InputMaybe<ComponentWhere>
  componentAggregate?: InputMaybe<ElementComponentAggregateInput>
  componentConnection?: InputMaybe<ElementComponentConnectionWhere>
  componentConnection_NOT?: InputMaybe<ElementComponentConnectionWhere>
  component_NOT?: InputMaybe<ComponentWhere>
  customCss?: InputMaybe<Scalars['String']>
  customCss_CONTAINS?: InputMaybe<Scalars['String']>
  customCss_ENDS_WITH?: InputMaybe<Scalars['String']>
  customCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  customCss_NOT?: InputMaybe<Scalars['String']>
  customCss_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  customCss_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  customCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  customCss_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  customCss_STARTS_WITH?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  guiCss_CONTAINS?: InputMaybe<Scalars['String']>
  guiCss_ENDS_WITH?: InputMaybe<Scalars['String']>
  guiCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  guiCss_NOT?: InputMaybe<Scalars['String']>
  guiCss_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  guiCss_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  guiCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  guiCss_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  guiCss_STARTS_WITH?: InputMaybe<Scalars['String']>
  hooksAggregate?: InputMaybe<ElementHooksAggregateInput>
  hooksConnection_ALL?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_NONE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SINGLE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SOME?: InputMaybe<ElementHooksConnectionWhere>
  /** Return Elements where all of the related Hooks match this filter */
  hooks_ALL?: InputMaybe<HookWhere>
  /** Return Elements where none of the related Hooks match this filter */
  hooks_NONE?: InputMaybe<HookWhere>
  /** Return Elements where one of the related Hooks match this filter */
  hooks_SINGLE?: InputMaybe<HookWhere>
  /** Return Elements where some of the related Hooks match this filter */
  hooks_SOME?: InputMaybe<HookWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  instanceOfComponent?: InputMaybe<ComponentWhere>
  instanceOfComponentAggregate?: InputMaybe<ElementInstanceOfComponentAggregateInput>
  instanceOfComponentConnection?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  instanceOfComponentConnection_NOT?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  instanceOfComponent_NOT?: InputMaybe<ComponentWhere>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementWhere>
  nextSiblingAggregate?: InputMaybe<ElementNextSiblingAggregateInput>
  nextSiblingConnection?: InputMaybe<ElementNextSiblingConnectionWhere>
  nextSiblingConnection_NOT?: InputMaybe<ElementNextSiblingConnectionWhere>
  nextSibling_NOT?: InputMaybe<ElementWhere>
  page?: InputMaybe<PageWhere>
  pageAggregate?: InputMaybe<ElementPageAggregateInput>
  pageConnection?: InputMaybe<ElementPageConnectionWhere>
  pageConnection_NOT?: InputMaybe<ElementPageConnectionWhere>
  page_NOT?: InputMaybe<PageWhere>
  parentElement?: InputMaybe<ElementWhere>
  parentElementAggregate?: InputMaybe<ElementParentElementAggregateInput>
  parentElementConnection?: InputMaybe<ElementParentElementConnectionWhere>
  parentElementConnection_NOT?: InputMaybe<ElementParentElementConnectionWhere>
  parentElement_NOT?: InputMaybe<ElementWhere>
  postRenderActionId?: InputMaybe<Scalars['String']>
  postRenderActionId_CONTAINS?: InputMaybe<Scalars['String']>
  postRenderActionId_ENDS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postRenderActionId_NOT?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_STARTS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  preRenderActionId_CONTAINS?: InputMaybe<Scalars['String']>
  preRenderActionId_ENDS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  preRenderActionId_NOT?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  preRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_STARTS_WITH?: InputMaybe<Scalars['String']>
  prevSibling?: InputMaybe<ElementWhere>
  prevSiblingAggregate?: InputMaybe<ElementPrevSiblingAggregateInput>
  prevSiblingConnection?: InputMaybe<ElementPrevSiblingConnectionWhere>
  prevSiblingConnection_NOT?: InputMaybe<ElementPrevSiblingConnectionWhere>
  prevSibling_NOT?: InputMaybe<ElementWhere>
  propMapBindingsAggregate?: InputMaybe<ElementPropMapBindingsAggregateInput>
  propMapBindingsConnection_ALL?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_NONE?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_SINGLE?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_SOME?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  /** Return Elements where all of the related PropMapBindings match this filter */
  propMapBindings_ALL?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where none of the related PropMapBindings match this filter */
  propMapBindings_NONE?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where one of the related PropMapBindings match this filter */
  propMapBindings_SINGLE?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where some of the related PropMapBindings match this filter */
  propMapBindings_SOME?: InputMaybe<PropMapBindingWhere>
  propTransformationJs?: InputMaybe<Scalars['String']>
  propTransformationJs_CONTAINS?: InputMaybe<Scalars['String']>
  propTransformationJs_ENDS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  propTransformationJs_NOT?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  propTransformationJs_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_STARTS_WITH?: InputMaybe<Scalars['String']>
  props?: InputMaybe<PropWhere>
  propsAggregate?: InputMaybe<ElementPropsAggregateInput>
  propsConnection?: InputMaybe<ElementPropsConnectionWhere>
  propsConnection_NOT?: InputMaybe<ElementPropsConnectionWhere>
  props_NOT?: InputMaybe<PropWhere>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderForEachPropKey_CONTAINS?: InputMaybe<Scalars['String']>
  renderForEachPropKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderForEachPropKey_NOT?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderForEachPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey_CONTAINS?: InputMaybe<Scalars['String']>
  renderIfPropKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderIfPropKey_NOT?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderIfPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  rootOf?: InputMaybe<ElementWhere>
  rootOfAggregate?: InputMaybe<ElementRootOfAggregateInput>
  rootOfConnection?: InputMaybe<ElementRootOfConnectionWhere>
  rootOfConnection_NOT?: InputMaybe<ElementRootOfConnectionWhere>
  rootOf_NOT?: InputMaybe<ElementWhere>
}

export type ElementsConnection = {
  __typename?: 'ElementsConnection'
  edges: Array<ElementEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumType = TypeBase & {
  __typename?: 'EnumType'
  allowedValues: Array<EnumTypeValue>
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>
  allowedValuesConnection: EnumTypeAllowedValuesConnection
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<EnumTypeValueOptions>
  where?: InputMaybe<EnumTypeValueWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<EnumTypeValueWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<EnumTypeAllowedValuesConnectionSort>>
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type EnumTypeAggregateSelection = {
  __typename?: 'EnumTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type EnumTypeAllowedValuesAggregateInput = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<EnumTypeAllowedValuesNodeAggregationWhereInput>
}

export type EnumTypeAllowedValuesConnectFieldInput = {
  connect?: InputMaybe<Array<EnumTypeValueConnectInput>>
  where?: InputMaybe<EnumTypeValueConnectWhere>
}

export type EnumTypeAllowedValuesConnection = {
  __typename?: 'EnumTypeAllowedValuesConnection'
  edges: Array<EnumTypeAllowedValuesRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type EnumTypeAllowedValuesConnectionSort = {
  node?: InputMaybe<EnumTypeValueSort>
}

export type EnumTypeAllowedValuesConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>
  OR?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>
  node?: InputMaybe<EnumTypeValueWhere>
  node_NOT?: InputMaybe<EnumTypeValueWhere>
}

export type EnumTypeAllowedValuesCreateFieldInput = {
  node: EnumTypeValueCreateInput
}

export type EnumTypeAllowedValuesDeleteFieldInput = {
  delete?: InputMaybe<EnumTypeValueDeleteInput>
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

export type EnumTypeAllowedValuesDisconnectFieldInput = {
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

export type EnumTypeAllowedValuesFieldInput = {
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
}

export type EnumTypeAllowedValuesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  value_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  value_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  value_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  value_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  value_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  value_EQUAL?: InputMaybe<Scalars['String']>
  value_GT?: InputMaybe<Scalars['Int']>
  value_GTE?: InputMaybe<Scalars['Int']>
  value_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  value_LONGEST_GT?: InputMaybe<Scalars['Int']>
  value_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  value_LONGEST_LT?: InputMaybe<Scalars['Int']>
  value_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  value_LT?: InputMaybe<Scalars['Int']>
  value_LTE?: InputMaybe<Scalars['Int']>
  value_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  value_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  value_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  value_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  value_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeAllowedValuesRelationship = {
  __typename?: 'EnumTypeAllowedValuesRelationship'
  cursor: Scalars['String']
  node: EnumTypeValue
}

export type EnumTypeAllowedValuesUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeValueUpdateInput>
}

export type EnumTypeAllowedValuesUpdateFieldInput = {
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  delete?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
  disconnect?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
  update?: InputMaybe<EnumTypeAllowedValuesUpdateConnectionInput>
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

export type EnumTypeConnectInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type EnumTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere
}

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere
}

export type EnumTypeCreateInput = {
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type EnumTypeDeleteInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type EnumTypeDisconnectInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type EnumTypeEdge = {
  __typename?: 'EnumTypeEdge'
  cursor: Scalars['String']
  node: EnumType
}

export type EnumTypeEnumTypeValueAllowedValuesAggregationSelection = {
  __typename?: 'EnumTypeEnumTypeValueAllowedValuesAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection>
}

export type EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection = {
  __typename?: 'EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  value: StringAggregateSelectionNonNullable
}

export type EnumTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type EnumTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more EnumTypeSort objects to sort EnumTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeSort>>
}

export type EnumTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<EnumTypeOwnerNodeAggregationWhereInput>
}

export type EnumTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeRelationInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type EnumTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type EnumTypeUpdateInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesUpdateFieldInput>>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type EnumTypeUserOwnerAggregationSelection = {
  __typename?: 'EnumTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>
}

export type EnumTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'EnumTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type EnumTypeValue = {
  __typename?: 'EnumTypeValue'
  enumType?: Maybe<EnumType>
  enumTypeAggregate?: Maybe<EnumTypeValueEnumTypeEnumTypeAggregationSelection>
  enumTypeConnection: EnumTypeValueEnumTypeConnection
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
}

export type EnumTypeValueEnumTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<EnumTypeOptions>
  where?: InputMaybe<EnumTypeWhere>
}

export type EnumTypeValueEnumTypeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<EnumTypeWhere>
}

export type EnumTypeValueEnumTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionSort>>
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeValueAggregateSelection = {
  __typename?: 'EnumTypeValueAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  value: StringAggregateSelectionNonNullable
}

export type EnumTypeValueConnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>
}

export type EnumTypeValueConnectOrCreateInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueConnectWhere = {
  node: EnumTypeValueWhere
}

export type EnumTypeValueCreateInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeFieldInput>
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  value: Scalars['String']
}

export type EnumTypeValueDeleteInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>
}

export type EnumTypeValueDisconnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>
}

export type EnumTypeValueEdge = {
  __typename?: 'EnumTypeValueEdge'
  cursor: Scalars['String']
  node: EnumTypeValue
}

export type EnumTypeValueEnumTypeAggregateInput = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>
}

export type EnumTypeValueEnumTypeConnectFieldInput = {
  connect?: InputMaybe<EnumTypeConnectInput>
  where?: InputMaybe<EnumTypeConnectWhere>
}

export type EnumTypeValueEnumTypeConnectOrCreateFieldInput = {
  onCreate: EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate
  where: EnumTypeConnectOrCreateWhere
}

export type EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeOnCreateInput
}

export type EnumTypeValueEnumTypeConnection = {
  __typename?: 'EnumTypeValueEnumTypeConnection'
  edges: Array<EnumTypeValueEnumTypeRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type EnumTypeValueEnumTypeConnectionSort = {
  node?: InputMaybe<EnumTypeSort>
}

export type EnumTypeValueEnumTypeConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>
  node?: InputMaybe<EnumTypeWhere>
  node_NOT?: InputMaybe<EnumTypeWhere>
}

export type EnumTypeValueEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput
}

export type EnumTypeValueEnumTypeDeleteFieldInput = {
  delete?: InputMaybe<EnumTypeDeleteInput>
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeValueEnumTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeValueEnumTypeEnumTypeAggregationSelection = {
  __typename?: 'EnumTypeValueEnumTypeEnumTypeAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection>
}

export type EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection = {
  __typename?: 'EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type EnumTypeValueEnumTypeFieldInput = {
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
}

export type EnumTypeValueEnumTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeValueEnumTypeRelationship = {
  __typename?: 'EnumTypeValueEnumTypeRelationship'
  cursor: Scalars['String']
  node: EnumType
}

export type EnumTypeValueEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>
}

export type EnumTypeValueEnumTypeUpdateFieldInput = {
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
  delete?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>
  disconnect?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>
  update?: InputMaybe<EnumTypeValueEnumTypeUpdateConnectionInput>
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeValueOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more EnumTypeValueSort objects to sort EnumTypeValues by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeValueSort>>
}

export type EnumTypeValueRelationInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
}

/** Fields to sort EnumTypeValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeValueSort object. */
export type EnumTypeValueSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  value?: InputMaybe<SortDirection>
}

export type EnumTypeValueUpdateInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type EnumTypeValueWhere = {
  AND?: InputMaybe<Array<EnumTypeValueWhere>>
  OR?: InputMaybe<Array<EnumTypeValueWhere>>
  enumType?: InputMaybe<EnumTypeWhere>
  enumTypeAggregate?: InputMaybe<EnumTypeValueEnumTypeAggregateInput>
  enumTypeConnection?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  enumTypeConnection_NOT?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  enumType_NOT?: InputMaybe<EnumTypeWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
  value_CONTAINS?: InputMaybe<Scalars['String']>
  value_ENDS_WITH?: InputMaybe<Scalars['String']>
  value_IN?: InputMaybe<Array<Scalars['String']>>
  value_NOT?: InputMaybe<Scalars['String']>
  value_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  value_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  value_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  value_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  value_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type EnumTypeValuesConnection = {
  __typename?: 'EnumTypeValuesConnection'
  edges: Array<EnumTypeValueEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type EnumTypeWhere = {
  AND?: InputMaybe<Array<EnumTypeWhere>>
  OR?: InputMaybe<Array<EnumTypeWhere>>
  allowedValuesAggregate?: InputMaybe<EnumTypeAllowedValuesAggregateInput>
  allowedValuesConnection_ALL?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_NONE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SINGLE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SOME?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  /** Return EnumTypes where all of the related EnumTypeValues match this filter */
  allowedValues_ALL?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where none of the related EnumTypeValues match this filter */
  allowedValues_NONE?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where one of the related EnumTypeValues match this filter */
  allowedValues_SINGLE?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where some of the related EnumTypeValues match this filter */
  allowedValues_SOME?: InputMaybe<EnumTypeValueWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type EnumTypesConnection = {
  __typename?: 'EnumTypesConnection'
  edges: Array<EnumTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export enum ExecuteCommandHandler {
  Download = 'Download',
  Void = 'Void',
}

export type ExecuteCommandInput = {
  command: Scalars['String']
}

export type ExecuteCommandResponse = {
  __typename?: 'ExecuteCommandResponse'
  data: Scalars['String']
  handler: ExecuteCommandHandler
  success: Scalars['Boolean']
}

export type ExecuteCommandResponseAggregateSelection = {
  __typename?: 'ExecuteCommandResponseAggregateSelection'
  count: Scalars['Int']
  data: StringAggregateSelectionNonNullable
}

export type ExecuteCommandResponseCreateInput = {
  data: Scalars['String']
  handler: ExecuteCommandHandler
  success: Scalars['Boolean']
}

export type ExecuteCommandResponseEdge = {
  __typename?: 'ExecuteCommandResponseEdge'
  cursor: Scalars['String']
  node: ExecuteCommandResponse
}

export type ExecuteCommandResponseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ExecuteCommandResponseSort objects to sort ExecuteCommandResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ExecuteCommandResponseSort>>
}

/** Fields to sort ExecuteCommandResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ExecuteCommandResponseSort object. */
export type ExecuteCommandResponseSort = {
  data?: InputMaybe<SortDirection>
  handler?: InputMaybe<SortDirection>
  success?: InputMaybe<SortDirection>
}

export type ExecuteCommandResponseUpdateInput = {
  data?: InputMaybe<Scalars['String']>
  handler?: InputMaybe<ExecuteCommandHandler>
  success?: InputMaybe<Scalars['Boolean']>
}

export type ExecuteCommandResponseWhere = {
  AND?: InputMaybe<Array<ExecuteCommandResponseWhere>>
  OR?: InputMaybe<Array<ExecuteCommandResponseWhere>>
  data?: InputMaybe<Scalars['String']>
  data_CONTAINS?: InputMaybe<Scalars['String']>
  data_ENDS_WITH?: InputMaybe<Scalars['String']>
  data_IN?: InputMaybe<Array<Scalars['String']>>
  data_NOT?: InputMaybe<Scalars['String']>
  data_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  data_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  data_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  data_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  data_STARTS_WITH?: InputMaybe<Scalars['String']>
  handler?: InputMaybe<ExecuteCommandHandler>
  handler_IN?: InputMaybe<Array<ExecuteCommandHandler>>
  handler_NOT?: InputMaybe<ExecuteCommandHandler>
  handler_NOT_IN?: InputMaybe<Array<ExecuteCommandHandler>>
  success?: InputMaybe<Scalars['Boolean']>
  success_NOT?: InputMaybe<Scalars['Boolean']>
}

export type ExecuteCommandResponsesConnection = {
  __typename?: 'ExecuteCommandResponsesConnection'
  edges: Array<ExecuteCommandResponseEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Field = {
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export type FieldCreateInput = {
  description?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
}

export type FieldSort = {
  description?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  key?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type FieldUpdateInput = {
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type FieldWhere = {
  AND?: InputMaybe<Array<FieldWhere>>
  OR?: InputMaybe<Array<FieldWhere>>
  description?: InputMaybe<Scalars['String']>
  description_CONTAINS?: InputMaybe<Scalars['String']>
  description_ENDS_WITH?: InputMaybe<Scalars['String']>
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  description_NOT?: InputMaybe<Scalars['String']>
  description_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  description_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  description_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  description_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  key_CONTAINS?: InputMaybe<Scalars['String']>
  key_ENDS_WITH?: InputMaybe<Scalars['String']>
  key_IN?: InputMaybe<Array<Scalars['String']>>
  key_NOT?: InputMaybe<Scalars['String']>
  key_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  key_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  key_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  key_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  key_STARTS_WITH?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type Hook = {
  __typename?: 'Hook'
  config: Prop
  configAggregate?: Maybe<HookPropConfigAggregationSelection>
  configConnection: HookConfigConnection
  element: Element
  elementAggregate?: Maybe<HookElementElementAggregationSelection>
  elementConnection: HookElementConnection
  id: Scalars['ID']
  type: AtomType
}

export type HookConfigArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type HookConfigAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropWhere>
}

export type HookConfigConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<HookConfigConnectionSort>>
  where?: InputMaybe<HookConfigConnectionWhere>
}

export type HookElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type HookElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type HookElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<HookElementConnectionSort>>
  where?: InputMaybe<HookElementConnectionWhere>
}

export type HookAggregateSelection = {
  __typename?: 'HookAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
}

export type HookConfigAggregateInput = {
  AND?: InputMaybe<Array<HookConfigAggregateInput>>
  OR?: InputMaybe<Array<HookConfigAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<HookConfigNodeAggregationWhereInput>
}

export type HookConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type HookConfigConnectOrCreateFieldInput = {
  onCreate: HookConfigConnectOrCreateFieldInputOnCreate
  where: PropConnectOrCreateWhere
}

export type HookConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type HookConfigConnection = {
  __typename?: 'HookConfigConnection'
  edges: Array<HookConfigRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type HookConfigConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type HookConfigConnectionWhere = {
  AND?: InputMaybe<Array<HookConfigConnectionWhere>>
  OR?: InputMaybe<Array<HookConfigConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type HookConfigCreateFieldInput = {
  node: PropCreateInput
}

export type HookConfigDeleteFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>
}

export type HookConfigDisconnectFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>
}

export type HookConfigFieldInput = {
  connect?: InputMaybe<HookConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>
  create?: InputMaybe<HookConfigCreateFieldInput>
}

export type HookConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type HookConfigRelationship = {
  __typename?: 'HookConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type HookConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type HookConfigUpdateFieldInput = {
  connect?: InputMaybe<HookConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>
  create?: InputMaybe<HookConfigCreateFieldInput>
  delete?: InputMaybe<HookConfigDeleteFieldInput>
  disconnect?: InputMaybe<HookConfigDisconnectFieldInput>
  update?: InputMaybe<HookConfigUpdateConnectionInput>
  where?: InputMaybe<HookConfigConnectionWhere>
}

export type HookConnectInput = {
  config?: InputMaybe<HookConfigConnectFieldInput>
  element?: InputMaybe<HookElementConnectFieldInput>
}

export type HookConnectOrCreateInput = {
  config?: InputMaybe<HookConfigConnectOrCreateFieldInput>
  element?: InputMaybe<HookElementConnectOrCreateFieldInput>
}

export type HookConnectOrCreateWhere = {
  node: HookUniqueWhere
}

export type HookConnectWhere = {
  node: HookWhere
}

export type HookCreateInput = {
  config?: InputMaybe<HookConfigFieldInput>
  element?: InputMaybe<HookElementFieldInput>
  type: AtomType
}

export type HookDeleteInput = {
  config?: InputMaybe<HookConfigDeleteFieldInput>
  element?: InputMaybe<HookElementDeleteFieldInput>
}

export type HookDisconnectInput = {
  config?: InputMaybe<HookConfigDisconnectFieldInput>
  element?: InputMaybe<HookElementDisconnectFieldInput>
}

export type HookEdge = {
  __typename?: 'HookEdge'
  cursor: Scalars['String']
  node: Hook
}

export type HookElementAggregateInput = {
  AND?: InputMaybe<Array<HookElementAggregateInput>>
  OR?: InputMaybe<Array<HookElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<HookElementNodeAggregationWhereInput>
}

export type HookElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type HookElementConnectOrCreateFieldInput = {
  onCreate: HookElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type HookElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type HookElementConnection = {
  __typename?: 'HookElementConnection'
  edges: Array<HookElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type HookElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type HookElementConnectionWhere = {
  AND?: InputMaybe<Array<HookElementConnectionWhere>>
  OR?: InputMaybe<Array<HookElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type HookElementCreateFieldInput = {
  node: ElementCreateInput
}

export type HookElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<HookElementConnectionWhere>
}

export type HookElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<HookElementConnectionWhere>
}

export type HookElementElementAggregationSelection = {
  __typename?: 'HookElementElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<HookElementElementNodeAggregateSelection>
}

export type HookElementElementNodeAggregateSelection = {
  __typename?: 'HookElementElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type HookElementFieldInput = {
  connect?: InputMaybe<HookElementConnectFieldInput>
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>
  create?: InputMaybe<HookElementCreateFieldInput>
}

export type HookElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type HookElementRelationship = {
  __typename?: 'HookElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type HookElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type HookElementUpdateFieldInput = {
  connect?: InputMaybe<HookElementConnectFieldInput>
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>
  create?: InputMaybe<HookElementCreateFieldInput>
  delete?: InputMaybe<HookElementDeleteFieldInput>
  disconnect?: InputMaybe<HookElementDisconnectFieldInput>
  update?: InputMaybe<HookElementUpdateConnectionInput>
  where?: InputMaybe<HookElementConnectionWhere>
}

export type HookOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>
}

export type HookOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more HookSort objects to sort Hooks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HookSort>>
}

export type HookPropConfigAggregationSelection = {
  __typename?: 'HookPropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<HookPropConfigNodeAggregateSelection>
}

export type HookPropConfigNodeAggregateSelection = {
  __typename?: 'HookPropConfigNodeAggregateSelection'
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type HookRelationInput = {
  config?: InputMaybe<HookConfigCreateFieldInput>
  element?: InputMaybe<HookElementCreateFieldInput>
}

/** Fields to sort Hooks by. The order in which sorts are applied is not guaranteed when specifying many fields in one HookSort object. */
export type HookSort = {
  id?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type HookUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type HookUpdateInput = {
  config?: InputMaybe<HookConfigUpdateFieldInput>
  element?: InputMaybe<HookElementUpdateFieldInput>
  type?: InputMaybe<AtomType>
}

export type HookWhere = {
  AND?: InputMaybe<Array<HookWhere>>
  OR?: InputMaybe<Array<HookWhere>>
  config?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<HookConfigAggregateInput>
  configConnection?: InputMaybe<HookConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<HookConfigConnectionWhere>
  config_NOT?: InputMaybe<PropWhere>
  element?: InputMaybe<ElementWhere>
  elementAggregate?: InputMaybe<HookElementAggregateInput>
  elementConnection?: InputMaybe<HookElementConnectionWhere>
  elementConnection_NOT?: InputMaybe<HookElementConnectionWhere>
  element_NOT?: InputMaybe<ElementWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  type?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<AtomType>>
  type_NOT?: InputMaybe<AtomType>
  type_NOT_IN?: InputMaybe<Array<AtomType>>
}

export type HooksConnection = {
  __typename?: 'HooksConnection'
  edges: Array<HookEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable'
  longest: Scalars['ID']
  shortest: Scalars['ID']
}

export type IntAggregateSelectionNonNullable = {
  __typename?: 'IntAggregateSelectionNonNullable'
  average: Scalars['Float']
  max: Scalars['Int']
  min: Scalars['Int']
  sum: Scalars['Int']
}

export type IntAggregateSelectionNullable = {
  __typename?: 'IntAggregateSelectionNullable'
  average?: Maybe<Scalars['Float']>
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
  sum?: Maybe<Scalars['Int']>
}

/** Represents an object type with multiple fields */
export type InterfaceType = TypeBase &
  WithDescendants & {
    __typename?: 'InterfaceType'
    apiOfAtoms: Array<Atom>
    apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>
    apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection
    descendantTypesIds: Array<Scalars['ID']>
    fieldFor: Array<TypeBase>
    fields: Array<TypeBase>
    fieldsConnection: InterfaceTypeFieldsConnection
    id: Scalars['ID']
    kind: TypeKind
    name: Scalars['String']
    owner: User
    ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>
    ownerConnection: TypeBaseOwnerConnection
  }

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AtomWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionSort>>
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InterfaceTypeFieldsConnectionSort>>
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type InterfaceTypeAggregateSelection = {
  __typename?: 'InterfaceTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type InterfaceTypeApiOfAtomsAggregateInput = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>
}

export type InterfaceTypeApiOfAtomsConnectFieldInput = {
  connect?: InputMaybe<Array<AtomConnectInput>>
  where?: InputMaybe<AtomConnectWhere>
}

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInput = {
  onCreate: InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate
  where: AtomConnectOrCreateWhere
}

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type InterfaceTypeApiOfAtomsConnection = {
  __typename?: 'InterfaceTypeApiOfAtomsConnection'
  edges: Array<InterfaceTypeApiOfAtomsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type InterfaceTypeApiOfAtomsConnectionSort = {
  node?: InputMaybe<AtomSort>
}

export type InterfaceTypeApiOfAtomsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>
  node?: InputMaybe<AtomWhere>
  node_NOT?: InputMaybe<AtomWhere>
}

export type InterfaceTypeApiOfAtomsCreateFieldInput = {
  node: AtomCreateInput
}

export type InterfaceTypeApiOfAtomsDeleteFieldInput = {
  delete?: InputMaybe<AtomDeleteInput>
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
}

export type InterfaceTypeApiOfAtomsDisconnectFieldInput = {
  disconnect?: InputMaybe<AtomDisconnectInput>
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
}

export type InterfaceTypeApiOfAtomsFieldInput = {
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
}

export type InterfaceTypeApiOfAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  icon_EQUAL?: InputMaybe<Scalars['String']>
  icon_GT?: InputMaybe<Scalars['Int']>
  icon_GTE?: InputMaybe<Scalars['Int']>
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  icon_LT?: InputMaybe<Scalars['Int']>
  icon_LTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeApiOfAtomsRelationship = {
  __typename?: 'InterfaceTypeApiOfAtomsRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type InterfaceTypeApiOfAtomsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type InterfaceTypeApiOfAtomsUpdateFieldInput = {
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  delete?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  update?: InputMaybe<InterfaceTypeApiOfAtomsUpdateConnectionInput>
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
}

export type InterfaceTypeAtomApiOfAtomsAggregationSelection = {
  __typename?: 'InterfaceTypeAtomApiOfAtomsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeAtomApiOfAtomsNodeAggregateSelection>
}

export type InterfaceTypeAtomApiOfAtomsNodeAggregateSelection = {
  __typename?: 'InterfaceTypeAtomApiOfAtomsNodeAggregateSelection'
  icon: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type InterfaceTypeConnectInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type InterfaceTypeConnectOrCreateInput = {
  apiOfAtoms?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type InterfaceTypeConnectOrCreateWhere = {
  node: InterfaceTypeUniqueWhere
}

export type InterfaceTypeConnectWhere = {
  node: InterfaceTypeWhere
}

export type InterfaceTypeCreateInput = {
  apiOfAtoms?: InputMaybe<InterfaceTypeApiOfAtomsFieldInput>
  fields?: InputMaybe<InterfaceTypeFieldsFieldInput>
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type InterfaceTypeDeleteInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type InterfaceTypeDisconnectInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type InterfaceTypeEdge = {
  __typename?: 'InterfaceTypeEdge'
  cursor: Scalars['String']
  node: InterfaceType
}

export type InterfaceTypeFieldsConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  edge: FieldCreateInput
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type InterfaceTypeFieldsConnection = {
  __typename?: 'InterfaceTypeFieldsConnection'
  edges: Array<InterfaceTypeFieldsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type InterfaceTypeFieldsConnectionSort = {
  edge?: InputMaybe<FieldSort>
  node?: InputMaybe<TypeBaseSort>
}

export type InterfaceTypeFieldsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>
  OR?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>
  edge?: InputMaybe<FieldWhere>
  edge_NOT?: InputMaybe<FieldWhere>
  node?: InputMaybe<TypeBaseWhere>
  node_NOT?: InputMaybe<TypeBaseWhere>
}

export type InterfaceTypeFieldsCreateFieldInput = {
  edge: FieldCreateInput
  node: TypeBaseCreateInput
}

export type InterfaceTypeFieldsDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeFieldsDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeFieldsFieldInput = {
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
}

export type InterfaceTypeFieldsRelationship = Field & {
  __typename?: 'InterfaceTypeFieldsRelationship'
  cursor: Scalars['String']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  node: TypeBase
}

export type InterfaceTypeFieldsUpdateConnectionInput = {
  edge?: InputMaybe<FieldUpdateInput>
  node?: InputMaybe<TypeBaseUpdateInput>
}

export type InterfaceTypeFieldsUpdateFieldInput = {
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  delete?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
  update?: InputMaybe<InterfaceTypeFieldsUpdateConnectionInput>
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type InterfaceTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more InterfaceTypeSort objects to sort InterfaceTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InterfaceTypeSort>>
}

export type InterfaceTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<InterfaceTypeOwnerNodeAggregationWhereInput>
}

export type InterfaceTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeRelationInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort InterfaceTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeSort object. */
export type InterfaceTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type InterfaceTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type InterfaceTypeUpdateInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsUpdateFieldInput>>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type InterfaceTypeUserOwnerAggregationSelection = {
  __typename?: 'InterfaceTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeUserOwnerNodeAggregateSelection>
}

export type InterfaceTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'InterfaceTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type InterfaceTypeWhere = {
  AND?: InputMaybe<Array<InterfaceTypeWhere>>
  OR?: InputMaybe<Array<InterfaceTypeWhere>>
  apiOfAtomsAggregate?: InputMaybe<InterfaceTypeApiOfAtomsAggregateInput>
  apiOfAtomsConnection_ALL?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_NONE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SINGLE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SOME?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  /** Return InterfaceTypes where all of the related Atoms match this filter */
  apiOfAtoms_ALL?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where none of the related Atoms match this filter */
  apiOfAtoms_NONE?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where one of the related Atoms match this filter */
  apiOfAtoms_SINGLE?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where some of the related Atoms match this filter */
  apiOfAtoms_SOME?: InputMaybe<AtomWhere>
  fieldsConnection_ALL?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_NONE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SOME?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type InterfaceTypesConnection = {
  __typename?: 'InterfaceTypesConnection'
  edges: Array<InterfaceTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/** Allows picking a lambda */
export type LambdaType = TypeBase & {
  __typename?: 'LambdaType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a lambda */
export type LambdaTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type LambdaTypeAggregateSelection = {
  __typename?: 'LambdaTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type LambdaTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type LambdaTypeEdge = {
  __typename?: 'LambdaTypeEdge'
  cursor: Scalars['String']
  node: LambdaType
}

export type LambdaTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more LambdaTypeSort objects to sort LambdaTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LambdaTypeSort>>
}

export type LambdaTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<LambdaTypeOwnerNodeAggregationWhereInput>
}

export type LambdaTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type LambdaTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type LambdaTypeUserOwnerAggregationSelection = {
  __typename?: 'LambdaTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>
}

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'LambdaTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type LambdaTypeWhere = {
  AND?: InputMaybe<Array<LambdaTypeWhere>>
  OR?: InputMaybe<Array<LambdaTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type LambdaTypesConnection = {
  __typename?: 'LambdaTypesConnection'
  edges: Array<LambdaTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  createActionTypes: CreateActionTypesMutationResponse
  createAppTypes: CreateAppTypesMutationResponse
  createApps: CreateAppsMutationResponse
  createArrayTypes: CreateArrayTypesMutationResponse
  createAtoms: CreateAtomsMutationResponse
  createCodeMirrorTypes: CreateCodeMirrorTypesMutationResponse
  createComponents: CreateComponentsMutationResponse
  createCreateInfos: CreateCreateInfosMutationResponse
  createCustomActions: CreateCustomActionsMutationResponse
  createDeleteInfos: CreateDeleteInfosMutationResponse
  createDomain: Domain
  createDomains: CreateDomainsMutationResponse
  createElementTypes: CreateElementTypesMutationResponse
  createElements: CreateElementsMutationResponse
  createEnumTypeValues: CreateEnumTypeValuesMutationResponse
  createEnumTypes: CreateEnumTypesMutationResponse
  createExecuteCommandResponses: CreateExecuteCommandResponsesMutationResponse
  createHooks: CreateHooksMutationResponse
  createInterfaceTypes: CreateInterfaceTypesMutationResponse
  createLambdaTypes: CreateLambdaTypesMutationResponse
  createPageTypes: CreatePageTypesMutationResponse
  createPages: CreatePagesMutationResponse
  createPipelineActions: CreatePipelineActionsMutationResponse
  createPrimitiveTypes: CreatePrimitiveTypesMutationResponse
  createPropMapBindings: CreatePropMapBindingsMutationResponse
  createProps: CreatePropsMutationResponse
  createReactNodeTypes: CreateReactNodeTypesMutationResponse
  createRenderPropsTypes: CreateRenderPropsTypesMutationResponse
  createResetDatabaseMutationResponses: CreateResetDatabaseMutationResponsesMutationResponse
  createResourceActions: CreateResourceActionsMutationResponse
  createResources: CreateResourcesMutationResponse
  createStores: CreateStoresMutationResponse
  createTagGraphOptions: CreateTagGraphOptionsMutationResponse
  createTags: CreateTagsMutationResponse
  createTypeReferences: CreateTypeReferencesMutationResponse
  createUnionTypes: CreateUnionTypesMutationResponse
  createUsers: CreateUsersMutationResponse
  createVercelDomainConfigData: CreateVercelDomainConfigDataMutationResponse
  createVercelProjectDomainData: CreateVercelProjectDomainDataMutationResponse
  deleteActionTypes: DeleteInfo
  deleteAppTypes: DeleteInfo
  deleteApps: DeleteInfo
  deleteArrayTypes: DeleteInfo
  deleteAtoms: DeleteInfo
  deleteCodeMirrorTypes: DeleteInfo
  deleteComponents: DeleteInfo
  deleteCreateInfos: DeleteInfo
  deleteCustomActions: DeleteInfo
  deleteDeleteInfos: DeleteInfo
  deleteDomain: DeleteInfo
  deleteDomains: DeleteInfo
  deleteElementTypes: DeleteInfo
  deleteElements: DeleteInfo
  deleteEnumTypeValues: DeleteInfo
  deleteEnumTypes: DeleteInfo
  deleteExecuteCommandResponses: DeleteInfo
  deleteHooks: DeleteInfo
  deleteInterfaceTypes: DeleteInfo
  deleteLambdaTypes: DeleteInfo
  deletePageTypes: DeleteInfo
  deletePages: DeleteInfo
  deletePipelineActions: DeleteInfo
  deletePrimitiveTypes: DeleteInfo
  deletePropMapBindings: DeleteInfo
  deleteProps: DeleteInfo
  deleteReactNodeTypes: DeleteInfo
  deleteRenderPropsTypes: DeleteInfo
  deleteResetDatabaseMutationResponses: DeleteInfo
  deleteResourceActions: DeleteInfo
  deleteResources: DeleteInfo
  deleteStores: DeleteInfo
  deleteTagGraphOptions: DeleteInfo
  deleteTags: DeleteInfo
  deleteTypeReferences: DeleteInfo
  deleteUnionTypes: DeleteInfo
  deleteUsers: DeleteInfo
  deleteVercelDomainConfigData: DeleteInfo
  deleteVercelProjectDomainData: DeleteInfo
  executeCommand: ExecuteCommandResponse
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>
  updateActionTypes: UpdateActionTypesMutationResponse
  updateAppTypes: UpdateAppTypesMutationResponse
  updateApps: UpdateAppsMutationResponse
  updateArrayTypes: UpdateArrayTypesMutationResponse
  updateAtoms: UpdateAtomsMutationResponse
  updateCodeMirrorTypes: UpdateCodeMirrorTypesMutationResponse
  updateComponents: UpdateComponentsMutationResponse
  updateCreateInfos: UpdateCreateInfosMutationResponse
  updateCustomActions: UpdateCustomActionsMutationResponse
  updateDeleteInfos: UpdateDeleteInfosMutationResponse
  updateDomain: Domain
  updateDomains: UpdateDomainsMutationResponse
  updateElementTypes: UpdateElementTypesMutationResponse
  updateElements: UpdateElementsMutationResponse
  updateEnumTypeValues: UpdateEnumTypeValuesMutationResponse
  updateEnumTypes: UpdateEnumTypesMutationResponse
  updateExecuteCommandResponses: UpdateExecuteCommandResponsesMutationResponse
  updateHooks: UpdateHooksMutationResponse
  updateInterfaceTypes: UpdateInterfaceTypesMutationResponse
  updateLambdaTypes: UpdateLambdaTypesMutationResponse
  updatePageTypes: UpdatePageTypesMutationResponse
  updatePages: UpdatePagesMutationResponse
  updatePipelineActions: UpdatePipelineActionsMutationResponse
  updatePrimitiveTypes: UpdatePrimitiveTypesMutationResponse
  updatePropMapBindings: UpdatePropMapBindingsMutationResponse
  updateProps: UpdatePropsMutationResponse
  updateReactNodeTypes: UpdateReactNodeTypesMutationResponse
  updateRenderPropsTypes: UpdateRenderPropsTypesMutationResponse
  updateResetDatabaseMutationResponses: UpdateResetDatabaseMutationResponsesMutationResponse
  updateResourceActions: UpdateResourceActionsMutationResponse
  updateResources: UpdateResourcesMutationResponse
  updateStores: UpdateStoresMutationResponse
  updateTagGraphOptions: UpdateTagGraphOptionsMutationResponse
  updateTags: UpdateTagsMutationResponse
  updateTypeReferences: UpdateTypeReferencesMutationResponse
  updateUnionTypes: UpdateUnionTypesMutationResponse
  updateVercelDomainConfigData: UpdateVercelDomainConfigDataMutationResponse
  updateVercelProjectDomainData: UpdateVercelProjectDomainDataMutationResponse
  upsertField: InterfaceType
}

export type MutationCreateActionTypesArgs = {
  input: Array<ActionTypeCreateInput>
}

export type MutationCreateAppTypesArgs = {
  input: Array<AppTypeCreateInput>
}

export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>
}

export type MutationCreateArrayTypesArgs = {
  input: Array<ArrayTypeCreateInput>
}

export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>
}

export type MutationCreateCodeMirrorTypesArgs = {
  input: Array<CodeMirrorTypeCreateInput>
}

export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>
}

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>
}

export type MutationCreateCustomActionsArgs = {
  input: Array<CustomActionCreateInput>
}

export type MutationCreateDeleteInfosArgs = {
  input: Array<DeleteInfoCreateInput>
}

export type MutationCreateDomainArgs = {
  input?: InputMaybe<CreateDomainMutationInput>
}

export type MutationCreateDomainsArgs = {
  input: Array<DomainCreateInput>
}

export type MutationCreateElementTypesArgs = {
  input: Array<ElementTypeCreateInput>
}

export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>
}

export type MutationCreateEnumTypeValuesArgs = {
  input: Array<EnumTypeValueCreateInput>
}

export type MutationCreateEnumTypesArgs = {
  input: Array<EnumTypeCreateInput>
}

export type MutationCreateExecuteCommandResponsesArgs = {
  input: Array<ExecuteCommandResponseCreateInput>
}

export type MutationCreateHooksArgs = {
  input: Array<HookCreateInput>
}

export type MutationCreateInterfaceTypesArgs = {
  input: Array<InterfaceTypeCreateInput>
}

export type MutationCreateLambdaTypesArgs = {
  input: Array<LambdaTypeCreateInput>
}

export type MutationCreatePageTypesArgs = {
  input: Array<PageTypeCreateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
}

export type MutationCreatePipelineActionsArgs = {
  input: Array<PipelineActionCreateInput>
}

export type MutationCreatePrimitiveTypesArgs = {
  input: Array<PrimitiveTypeCreateInput>
}

export type MutationCreatePropMapBindingsArgs = {
  input: Array<PropMapBindingCreateInput>
}

export type MutationCreatePropsArgs = {
  input: Array<PropCreateInput>
}

export type MutationCreateReactNodeTypesArgs = {
  input: Array<ReactNodeTypeCreateInput>
}

export type MutationCreateRenderPropsTypesArgs = {
  input: Array<RenderPropsTypeCreateInput>
}

export type MutationCreateResetDatabaseMutationResponsesArgs = {
  input: Array<ResetDatabaseMutationResponseCreateInput>
}

export type MutationCreateResourceActionsArgs = {
  input: Array<ResourceActionCreateInput>
}

export type MutationCreateResourcesArgs = {
  input: Array<ResourceCreateInput>
}

export type MutationCreateStoresArgs = {
  input: Array<StoreCreateInput>
}

export type MutationCreateTagGraphOptionsArgs = {
  input: Array<TagGraphOptionsCreateInput>
}

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>
}

export type MutationCreateTypeReferencesArgs = {
  input: Array<TypeReferenceCreateInput>
}

export type MutationCreateUnionTypesArgs = {
  input: Array<UnionTypeCreateInput>
}

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>
}

export type MutationCreateVercelDomainConfigDataArgs = {
  input: Array<VercelDomainConfigDataCreateInput>
}

export type MutationCreateVercelProjectDomainDataArgs = {
  input: Array<VercelProjectDomainDataCreateInput>
}

export type MutationDeleteActionTypesArgs = {
  delete?: InputMaybe<ActionTypeDeleteInput>
  where?: InputMaybe<ActionTypeWhere>
}

export type MutationDeleteAppTypesArgs = {
  delete?: InputMaybe<AppTypeDeleteInput>
  where?: InputMaybe<AppTypeWhere>
}

export type MutationDeleteAppsArgs = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<AppWhere>
}

export type MutationDeleteArrayTypesArgs = {
  delete?: InputMaybe<ArrayTypeDeleteInput>
  where?: InputMaybe<ArrayTypeWhere>
}

export type MutationDeleteAtomsArgs = {
  delete?: InputMaybe<AtomDeleteInput>
  where?: InputMaybe<AtomWhere>
}

export type MutationDeleteCodeMirrorTypesArgs = {
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type MutationDeleteComponentsArgs = {
  delete?: InputMaybe<ComponentDeleteInput>
  where?: InputMaybe<ComponentWhere>
}

export type MutationDeleteCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type MutationDeleteCustomActionsArgs = {
  delete?: InputMaybe<CustomActionDeleteInput>
  where?: InputMaybe<CustomActionWhere>
}

export type MutationDeleteDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>
}

export type MutationDeleteDomainArgs = {
  id: Scalars['String']
}

export type MutationDeleteDomainsArgs = {
  delete?: InputMaybe<DomainDeleteInput>
  where?: InputMaybe<DomainWhere>
}

export type MutationDeleteElementTypesArgs = {
  delete?: InputMaybe<ElementTypeDeleteInput>
  where?: InputMaybe<ElementTypeWhere>
}

export type MutationDeleteElementsArgs = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationDeleteEnumTypeValuesArgs = {
  delete?: InputMaybe<EnumTypeValueDeleteInput>
  where?: InputMaybe<EnumTypeValueWhere>
}

export type MutationDeleteEnumTypesArgs = {
  delete?: InputMaybe<EnumTypeDeleteInput>
  where?: InputMaybe<EnumTypeWhere>
}

export type MutationDeleteExecuteCommandResponsesArgs = {
  where?: InputMaybe<ExecuteCommandResponseWhere>
}

export type MutationDeleteHooksArgs = {
  delete?: InputMaybe<HookDeleteInput>
  where?: InputMaybe<HookWhere>
}

export type MutationDeleteInterfaceTypesArgs = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type MutationDeleteLambdaTypesArgs = {
  delete?: InputMaybe<LambdaTypeDeleteInput>
  where?: InputMaybe<LambdaTypeWhere>
}

export type MutationDeletePageTypesArgs = {
  delete?: InputMaybe<PageTypeDeleteInput>
  where?: InputMaybe<PageTypeWhere>
}

export type MutationDeletePagesArgs = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<PageWhere>
}

export type MutationDeletePipelineActionsArgs = {
  delete?: InputMaybe<PipelineActionDeleteInput>
  where?: InputMaybe<PipelineActionWhere>
}

export type MutationDeletePrimitiveTypesArgs = {
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type MutationDeletePropMapBindingsArgs = {
  delete?: InputMaybe<PropMapBindingDeleteInput>
  where?: InputMaybe<PropMapBindingWhere>
}

export type MutationDeletePropsArgs = {
  where?: InputMaybe<PropWhere>
}

export type MutationDeleteReactNodeTypesArgs = {
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type MutationDeleteRenderPropsTypesArgs = {
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type MutationDeleteResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type MutationDeleteResourceActionsArgs = {
  delete?: InputMaybe<ResourceActionDeleteInput>
  where?: InputMaybe<ResourceActionWhere>
}

export type MutationDeleteResourcesArgs = {
  delete?: InputMaybe<ResourceDeleteInput>
  where?: InputMaybe<ResourceWhere>
}

export type MutationDeleteStoresArgs = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<StoreWhere>
}

export type MutationDeleteTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type MutationDeleteTagsArgs = {
  delete?: InputMaybe<TagDeleteInput>
  where?: InputMaybe<TagWhere>
}

export type MutationDeleteTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type MutationDeleteUnionTypesArgs = {
  delete?: InputMaybe<UnionTypeDeleteInput>
  where?: InputMaybe<UnionTypeWhere>
}

export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<UserWhere>
}

export type MutationDeleteVercelDomainConfigDataArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>
}

export type MutationDeleteVercelProjectDomainDataArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>
}

export type MutationExecuteCommandArgs = {
  input: ExecuteCommandInput
}

export type MutationUpdateActionTypesArgs = {
  connect?: InputMaybe<ActionTypeConnectInput>
  connectOrCreate?: InputMaybe<ActionTypeConnectOrCreateInput>
  create?: InputMaybe<ActionTypeRelationInput>
  delete?: InputMaybe<ActionTypeDeleteInput>
  disconnect?: InputMaybe<ActionTypeDisconnectInput>
  update?: InputMaybe<ActionTypeUpdateInput>
  where?: InputMaybe<ActionTypeWhere>
}

export type MutationUpdateAppTypesArgs = {
  connect?: InputMaybe<AppTypeConnectInput>
  connectOrCreate?: InputMaybe<AppTypeConnectOrCreateInput>
  create?: InputMaybe<AppTypeRelationInput>
  delete?: InputMaybe<AppTypeDeleteInput>
  disconnect?: InputMaybe<AppTypeDisconnectInput>
  update?: InputMaybe<AppTypeUpdateInput>
  where?: InputMaybe<AppTypeWhere>
}

export type MutationUpdateAppsArgs = {
  connect?: InputMaybe<AppConnectInput>
  connectOrCreate?: InputMaybe<AppConnectOrCreateInput>
  create?: InputMaybe<AppRelationInput>
  delete?: InputMaybe<AppDeleteInput>
  disconnect?: InputMaybe<AppDisconnectInput>
  update?: InputMaybe<AppUpdateInput>
  where?: InputMaybe<AppWhere>
}

export type MutationUpdateArrayTypesArgs = {
  connect?: InputMaybe<ArrayTypeConnectInput>
  connectOrCreate?: InputMaybe<ArrayTypeConnectOrCreateInput>
  create?: InputMaybe<ArrayTypeRelationInput>
  delete?: InputMaybe<ArrayTypeDeleteInput>
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>
  update?: InputMaybe<ArrayTypeUpdateInput>
  where?: InputMaybe<ArrayTypeWhere>
}

export type MutationUpdateAtomsArgs = {
  connect?: InputMaybe<AtomConnectInput>
  connectOrCreate?: InputMaybe<AtomConnectOrCreateInput>
  create?: InputMaybe<AtomRelationInput>
  delete?: InputMaybe<AtomDeleteInput>
  disconnect?: InputMaybe<AtomDisconnectInput>
  update?: InputMaybe<AtomUpdateInput>
  where?: InputMaybe<AtomWhere>
}

export type MutationUpdateCodeMirrorTypesArgs = {
  connect?: InputMaybe<CodeMirrorTypeConnectInput>
  connectOrCreate?: InputMaybe<CodeMirrorTypeConnectOrCreateInput>
  create?: InputMaybe<CodeMirrorTypeRelationInput>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>
  update?: InputMaybe<CodeMirrorTypeUpdateInput>
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type MutationUpdateComponentsArgs = {
  connect?: InputMaybe<ComponentConnectInput>
  connectOrCreate?: InputMaybe<ComponentConnectOrCreateInput>
  create?: InputMaybe<ComponentRelationInput>
  delete?: InputMaybe<ComponentDeleteInput>
  disconnect?: InputMaybe<ComponentDisconnectInput>
  update?: InputMaybe<ComponentUpdateInput>
  where?: InputMaybe<ComponentWhere>
}

export type MutationUpdateCreateInfosArgs = {
  update?: InputMaybe<CreateInfoUpdateInput>
  where?: InputMaybe<CreateInfoWhere>
}

export type MutationUpdateCustomActionsArgs = {
  connect?: InputMaybe<CustomActionConnectInput>
  connectOrCreate?: InputMaybe<CustomActionConnectOrCreateInput>
  create?: InputMaybe<CustomActionRelationInput>
  delete?: InputMaybe<CustomActionDeleteInput>
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  update?: InputMaybe<CustomActionUpdateInput>
  where?: InputMaybe<CustomActionWhere>
}

export type MutationUpdateDeleteInfosArgs = {
  update?: InputMaybe<DeleteInfoUpdateInput>
  where?: InputMaybe<DeleteInfoWhere>
}

export type MutationUpdateDomainArgs = {
  input?: InputMaybe<UpdateDomainMutationInput>
}

export type MutationUpdateDomainsArgs = {
  connect?: InputMaybe<DomainConnectInput>
  connectOrCreate?: InputMaybe<DomainConnectOrCreateInput>
  create?: InputMaybe<DomainRelationInput>
  delete?: InputMaybe<DomainDeleteInput>
  disconnect?: InputMaybe<DomainDisconnectInput>
  update?: InputMaybe<DomainUpdateInput>
  where?: InputMaybe<DomainWhere>
}

export type MutationUpdateElementTypesArgs = {
  connect?: InputMaybe<ElementTypeConnectInput>
  connectOrCreate?: InputMaybe<ElementTypeConnectOrCreateInput>
  create?: InputMaybe<ElementTypeRelationInput>
  delete?: InputMaybe<ElementTypeDeleteInput>
  disconnect?: InputMaybe<ElementTypeDisconnectInput>
  update?: InputMaybe<ElementTypeUpdateInput>
  where?: InputMaybe<ElementTypeWhere>
}

export type MutationUpdateElementsArgs = {
  connect?: InputMaybe<ElementConnectInput>
  connectOrCreate?: InputMaybe<ElementConnectOrCreateInput>
  create?: InputMaybe<ElementRelationInput>
  delete?: InputMaybe<ElementDeleteInput>
  disconnect?: InputMaybe<ElementDisconnectInput>
  update?: InputMaybe<ElementUpdateInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationUpdateEnumTypeValuesArgs = {
  connect?: InputMaybe<EnumTypeValueConnectInput>
  connectOrCreate?: InputMaybe<EnumTypeValueConnectOrCreateInput>
  create?: InputMaybe<EnumTypeValueRelationInput>
  delete?: InputMaybe<EnumTypeValueDeleteInput>
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>
  update?: InputMaybe<EnumTypeValueUpdateInput>
  where?: InputMaybe<EnumTypeValueWhere>
}

export type MutationUpdateEnumTypesArgs = {
  connect?: InputMaybe<EnumTypeConnectInput>
  connectOrCreate?: InputMaybe<EnumTypeConnectOrCreateInput>
  create?: InputMaybe<EnumTypeRelationInput>
  delete?: InputMaybe<EnumTypeDeleteInput>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
  update?: InputMaybe<EnumTypeUpdateInput>
  where?: InputMaybe<EnumTypeWhere>
}

export type MutationUpdateExecuteCommandResponsesArgs = {
  update?: InputMaybe<ExecuteCommandResponseUpdateInput>
  where?: InputMaybe<ExecuteCommandResponseWhere>
}

export type MutationUpdateHooksArgs = {
  connect?: InputMaybe<HookConnectInput>
  connectOrCreate?: InputMaybe<HookConnectOrCreateInput>
  create?: InputMaybe<HookRelationInput>
  delete?: InputMaybe<HookDeleteInput>
  disconnect?: InputMaybe<HookDisconnectInput>
  update?: InputMaybe<HookUpdateInput>
  where?: InputMaybe<HookWhere>
}

export type MutationUpdateInterfaceTypesArgs = {
  connect?: InputMaybe<InterfaceTypeConnectInput>
  connectOrCreate?: InputMaybe<InterfaceTypeConnectOrCreateInput>
  create?: InputMaybe<InterfaceTypeRelationInput>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  update?: InputMaybe<InterfaceTypeUpdateInput>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type MutationUpdateLambdaTypesArgs = {
  connect?: InputMaybe<LambdaTypeConnectInput>
  connectOrCreate?: InputMaybe<LambdaTypeConnectOrCreateInput>
  create?: InputMaybe<LambdaTypeRelationInput>
  delete?: InputMaybe<LambdaTypeDeleteInput>
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>
  update?: InputMaybe<LambdaTypeUpdateInput>
  where?: InputMaybe<LambdaTypeWhere>
}

export type MutationUpdatePageTypesArgs = {
  connect?: InputMaybe<PageTypeConnectInput>
  connectOrCreate?: InputMaybe<PageTypeConnectOrCreateInput>
  create?: InputMaybe<PageTypeRelationInput>
  delete?: InputMaybe<PageTypeDeleteInput>
  disconnect?: InputMaybe<PageTypeDisconnectInput>
  update?: InputMaybe<PageTypeUpdateInput>
  where?: InputMaybe<PageTypeWhere>
}

export type MutationUpdatePagesArgs = {
  connect?: InputMaybe<PageConnectInput>
  connectOrCreate?: InputMaybe<PageConnectOrCreateInput>
  create?: InputMaybe<PageRelationInput>
  delete?: InputMaybe<PageDeleteInput>
  disconnect?: InputMaybe<PageDisconnectInput>
  update?: InputMaybe<PageUpdateInput>
  where?: InputMaybe<PageWhere>
}

export type MutationUpdatePipelineActionsArgs = {
  connect?: InputMaybe<PipelineActionConnectInput>
  connectOrCreate?: InputMaybe<PipelineActionConnectOrCreateInput>
  create?: InputMaybe<PipelineActionRelationInput>
  delete?: InputMaybe<PipelineActionDeleteInput>
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  update?: InputMaybe<PipelineActionUpdateInput>
  where?: InputMaybe<PipelineActionWhere>
}

export type MutationUpdatePrimitiveTypesArgs = {
  connect?: InputMaybe<PrimitiveTypeConnectInput>
  connectOrCreate?: InputMaybe<PrimitiveTypeConnectOrCreateInput>
  create?: InputMaybe<PrimitiveTypeRelationInput>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>
  update?: InputMaybe<PrimitiveTypeUpdateInput>
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type MutationUpdatePropMapBindingsArgs = {
  connect?: InputMaybe<PropMapBindingConnectInput>
  connectOrCreate?: InputMaybe<PropMapBindingConnectOrCreateInput>
  create?: InputMaybe<PropMapBindingRelationInput>
  delete?: InputMaybe<PropMapBindingDeleteInput>
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>
  update?: InputMaybe<PropMapBindingUpdateInput>
  where?: InputMaybe<PropMapBindingWhere>
}

export type MutationUpdatePropsArgs = {
  update?: InputMaybe<PropUpdateInput>
  where?: InputMaybe<PropWhere>
}

export type MutationUpdateReactNodeTypesArgs = {
  connect?: InputMaybe<ReactNodeTypeConnectInput>
  connectOrCreate?: InputMaybe<ReactNodeTypeConnectOrCreateInput>
  create?: InputMaybe<ReactNodeTypeRelationInput>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>
  update?: InputMaybe<ReactNodeTypeUpdateInput>
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type MutationUpdateRenderPropsTypesArgs = {
  connect?: InputMaybe<RenderPropsTypeConnectInput>
  connectOrCreate?: InputMaybe<RenderPropsTypeConnectOrCreateInput>
  create?: InputMaybe<RenderPropsTypeRelationInput>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>
  update?: InputMaybe<RenderPropsTypeUpdateInput>
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type MutationUpdateResetDatabaseMutationResponsesArgs = {
  update?: InputMaybe<ResetDatabaseMutationResponseUpdateInput>
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type MutationUpdateResourceActionsArgs = {
  connect?: InputMaybe<ResourceActionConnectInput>
  connectOrCreate?: InputMaybe<ResourceActionConnectOrCreateInput>
  create?: InputMaybe<ResourceActionRelationInput>
  delete?: InputMaybe<ResourceActionDeleteInput>
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  update?: InputMaybe<ResourceActionUpdateInput>
  where?: InputMaybe<ResourceActionWhere>
}

export type MutationUpdateResourcesArgs = {
  connect?: InputMaybe<ResourceConnectInput>
  connectOrCreate?: InputMaybe<ResourceConnectOrCreateInput>
  create?: InputMaybe<ResourceRelationInput>
  delete?: InputMaybe<ResourceDeleteInput>
  disconnect?: InputMaybe<ResourceDisconnectInput>
  update?: InputMaybe<ResourceUpdateInput>
  where?: InputMaybe<ResourceWhere>
}

export type MutationUpdateStoresArgs = {
  connect?: InputMaybe<StoreConnectInput>
  connectOrCreate?: InputMaybe<StoreConnectOrCreateInput>
  create?: InputMaybe<StoreRelationInput>
  delete?: InputMaybe<StoreDeleteInput>
  disconnect?: InputMaybe<StoreDisconnectInput>
  update?: InputMaybe<StoreUpdateInput>
  where?: InputMaybe<StoreWhere>
}

export type MutationUpdateTagGraphOptionsArgs = {
  update?: InputMaybe<TagGraphOptionsUpdateInput>
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type MutationUpdateTagsArgs = {
  connect?: InputMaybe<TagConnectInput>
  connectOrCreate?: InputMaybe<TagConnectOrCreateInput>
  create?: InputMaybe<TagRelationInput>
  delete?: InputMaybe<TagDeleteInput>
  disconnect?: InputMaybe<TagDisconnectInput>
  update?: InputMaybe<TagUpdateInput>
  where?: InputMaybe<TagWhere>
}

export type MutationUpdateTypeReferencesArgs = {
  update?: InputMaybe<TypeReferenceUpdateInput>
  where?: InputMaybe<TypeReferenceWhere>
}

export type MutationUpdateUnionTypesArgs = {
  connect?: InputMaybe<UnionTypeConnectInput>
  connectOrCreate?: InputMaybe<UnionTypeConnectOrCreateInput>
  create?: InputMaybe<UnionTypeRelationInput>
  delete?: InputMaybe<UnionTypeDeleteInput>
  disconnect?: InputMaybe<UnionTypeDisconnectInput>
  update?: InputMaybe<UnionTypeUpdateInput>
  where?: InputMaybe<UnionTypeWhere>
}

export type MutationUpdateVercelDomainConfigDataArgs = {
  update?: InputMaybe<VercelDomainConfigDataUpdateInput>
  where?: InputMaybe<VercelDomainConfigDataWhere>
}

export type MutationUpdateVercelProjectDomainDataArgs = {
  update?: InputMaybe<VercelProjectDomainDataUpdateInput>
  where?: InputMaybe<VercelProjectDomainDataWhere>
}

export type MutationUpsertFieldArgs = {
  field: FieldCreateInput
  fieldTypeId: Scalars['ID']
  interfaceTypeId: Scalars['ID']
}

export type Page = {
  __typename?: 'Page'
  app: App
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  appConnection: PageAppConnection
  id: Scalars['ID']
  name: Scalars['String']
  rootElement: Element
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  rootElementConnection: PageRootElementConnection
  slug: Scalars['String']
}

export type PageAppArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type PageAppAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AppWhere>
}

export type PageAppConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PageAppConnectionSort>>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageRootElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type PageRootElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type PageRootElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PageRootElementConnectionSort>>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageAggregateSelection = {
  __typename?: 'PageAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type PageAppAggregateInput = {
  AND?: InputMaybe<Array<PageAppAggregateInput>>
  OR?: InputMaybe<Array<PageAppAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PageAppNodeAggregationWhereInput>
}

export type PageAppAppAggregationSelection = {
  __typename?: 'PageAppAppAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageAppAppNodeAggregateSelection>
}

export type PageAppAppNodeAggregateSelection = {
  __typename?: 'PageAppAppNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type PageAppConnectFieldInput = {
  connect?: InputMaybe<AppConnectInput>
  where?: InputMaybe<AppConnectWhere>
}

export type PageAppConnectOrCreateFieldInput = {
  onCreate: PageAppConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type PageAppConnection = {
  __typename?: 'PageAppConnection'
  edges: Array<PageAppRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageAppConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type PageAppConnectionWhere = {
  AND?: InputMaybe<Array<PageAppConnectionWhere>>
  OR?: InputMaybe<Array<PageAppConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type PageAppCreateFieldInput = {
  node: AppCreateInput
}

export type PageAppDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageAppDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageAppFieldInput = {
  connect?: InputMaybe<PageAppConnectFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
  create?: InputMaybe<PageAppCreateFieldInput>
}

export type PageAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageAppRelationship = {
  __typename?: 'PageAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type PageAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type PageAppUpdateFieldInput = {
  connect?: InputMaybe<PageAppConnectFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
  create?: InputMaybe<PageAppCreateFieldInput>
  delete?: InputMaybe<PageAppDeleteFieldInput>
  disconnect?: InputMaybe<PageAppDisconnectFieldInput>
  update?: InputMaybe<PageAppUpdateConnectionInput>
  where?: InputMaybe<PageAppConnectionWhere>
}

export type PageConnectInput = {
  app?: InputMaybe<PageAppConnectFieldInput>
  rootElement?: InputMaybe<PageRootElementConnectFieldInput>
}

export type PageConnectOrCreateInput = {
  app?: InputMaybe<PageAppConnectOrCreateFieldInput>
  rootElement?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
}

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere
}

export type PageConnectWhere = {
  node: PageWhere
}

export type PageCreateInput = {
  app?: InputMaybe<PageAppFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  rootElement?: InputMaybe<PageRootElementFieldInput>
  slug: Scalars['String']
}

export type PageDeleteInput = {
  app?: InputMaybe<PageAppDeleteFieldInput>
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>
}

export type PageDisconnectInput = {
  app?: InputMaybe<PageAppDisconnectFieldInput>
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>
}

export type PageEdge = {
  __typename?: 'PageEdge'
  cursor: Scalars['String']
  node: Page
}

export type PageElementRootElementAggregationSelection = {
  __typename?: 'PageElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageElementRootElementNodeAggregateSelection>
}

export type PageElementRootElementNodeAggregateSelection = {
  __typename?: 'PageElementRootElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type PageOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
}

export type PageOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageSort>>
}

export type PageRelationInput = {
  app?: InputMaybe<PageAppCreateFieldInput>
  rootElement?: InputMaybe<PageRootElementCreateFieldInput>
}

export type PageRootElementAggregateInput = {
  AND?: InputMaybe<Array<PageRootElementAggregateInput>>
  OR?: InputMaybe<Array<PageRootElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PageRootElementNodeAggregationWhereInput>
}

export type PageRootElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type PageRootElementConnectOrCreateFieldInput = {
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PageRootElementConnection = {
  __typename?: 'PageRootElementConnection'
  edges: Array<PageRootElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type PageRootElementConnectionWhere = {
  AND?: InputMaybe<Array<PageRootElementConnectionWhere>>
  OR?: InputMaybe<Array<PageRootElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PageRootElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageRootElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

export type PageRootElementFieldInput = {
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<PageRootElementCreateFieldInput>
}

export type PageRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageRootElementRelationship = {
  __typename?: 'PageRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PageRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PageRootElementUpdateFieldInput = {
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
  create?: InputMaybe<PageRootElementCreateFieldInput>
  delete?: InputMaybe<PageRootElementDeleteFieldInput>
  disconnect?: InputMaybe<PageRootElementDisconnectFieldInput>
  update?: InputMaybe<PageRootElementUpdateConnectionInput>
  where?: InputMaybe<PageRootElementConnectionWhere>
}

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  slug?: InputMaybe<SortDirection>
}

/** Allows picking a page from the list of pages */
export type PageType = TypeBase & {
  __typename?: 'PageType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type PageTypeAggregateSelection = {
  __typename?: 'PageTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PageTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PageTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type PageTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type PageTypeEdge = {
  __typename?: 'PageTypeEdge'
  cursor: Scalars['String']
  node: PageType
}

export type PageTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PageTypeSort objects to sort PageTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageTypeSort>>
}

export type PageTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<PageTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<PageTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PageTypeOwnerNodeAggregationWhereInput>
}

export type PageTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type PageTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type PageTypeUserOwnerAggregationSelection = {
  __typename?: 'PageTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>
}

export type PageTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PageTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type PageTypeWhere = {
  AND?: InputMaybe<Array<PageTypeWhere>>
  OR?: InputMaybe<Array<PageTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type PageTypesConnection = {
  __typename?: 'PageTypesConnection'
  edges: Array<PageTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageUpdateInput = {
  app?: InputMaybe<PageAppUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>
  slug?: InputMaybe<Scalars['String']>
}

export type PageWhere = {
  AND?: InputMaybe<Array<PageWhere>>
  OR?: InputMaybe<Array<PageWhere>>
  app?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<PageAppAggregateInput>
  appConnection?: InputMaybe<PageAppConnectionWhere>
  appConnection_NOT?: InputMaybe<PageAppConnectionWhere>
  app_NOT?: InputMaybe<AppWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<PageRootElementAggregateInput>
  rootElementConnection?: InputMaybe<PageRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<PageRootElementConnectionWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
  slug?: InputMaybe<Scalars['String']>
  slug_CONTAINS?: InputMaybe<Scalars['String']>
  slug_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT?: InputMaybe<Scalars['String']>
  slug_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type PagesConnection = {
  __typename?: 'PagesConnection'
  edges: Array<PageEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ParentOfElement = {
  order?: Maybe<Scalars['Int']>
}

export type ParentOfElementCreateInput = {
  order?: InputMaybe<Scalars['Int']>
}

export type ParentOfElementSort = {
  order?: InputMaybe<SortDirection>
}

export type ParentOfElementUpdateInput = {
  order?: InputMaybe<Scalars['Int']>
}

export type ParentOfElementWhere = {
  AND?: InputMaybe<Array<ParentOfElementWhere>>
  OR?: InputMaybe<Array<ParentOfElementWhere>>
  order?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
  order_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  order_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_NOT?: InputMaybe<Scalars['Int']>
  order_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
}

export type PipelineAction = ActionBase & {
  __typename?: 'PipelineAction'
  /** List of actions to run in order */
  actions: Array<AnyAction>
  actionsConnection: PipelineActionActionsConnection
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit: Scalars['Boolean']
  store: Store
  storeAggregate?: Maybe<PipelineActionStoreStoreAggregationSelection>
  storeConnection: ActionBaseStoreConnection
  type: ActionKind
}

export type PipelineActionActionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
}

export type PipelineActionActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PipelineActionActionsConnectionSort>>
  where?: InputMaybe<PipelineActionActionsConnectionWhere>
}

export type PipelineActionStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type PipelineActionStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type PipelineActionStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type PipelineActionActionsConnectInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >
}

export type PipelineActionActionsConnectOrCreateInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >
}

export type PipelineActionActionsConnection = {
  __typename?: 'PipelineActionActionsConnection'
  edges: Array<PipelineActionActionsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PipelineActionActionsConnectionSort = {
  edge?: InputMaybe<ActionsPipeLineSort>
}

export type PipelineActionActionsConnectionWhere = {
  CustomAction?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>
  PipelineAction?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>
  ResourceAction?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>
}

export type PipelineActionActionsCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionCreateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >
}

export type PipelineActionActionsCreateInput = {
  CustomAction?: InputMaybe<PipelineActionActionsCustomActionFieldInput>
  PipelineAction?: InputMaybe<PipelineActionActionsPipelineActionFieldInput>
  ResourceAction?: InputMaybe<PipelineActionActionsResourceActionFieldInput>
}

export type PipelineActionActionsCustomActionConnectFieldInput = {
  connect?: InputMaybe<Array<CustomActionConnectInput>>
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  where?: InputMaybe<CustomActionConnectWhere>
}

export type PipelineActionActionsCustomActionConnectOrCreateFieldInput = {
  onCreate: PipelineActionActionsCustomActionConnectOrCreateFieldInputOnCreate
  where: CustomActionConnectOrCreateWhere
}

export type PipelineActionActionsCustomActionConnectOrCreateFieldInputOnCreate =
  {
    edge?: InputMaybe<ActionsPipeLineCreateInput>
    node: CustomActionOnCreateInput
  }

export type PipelineActionActionsCustomActionConnectionWhere = {
  AND?: InputMaybe<Array<PipelineActionActionsCustomActionConnectionWhere>>
  OR?: InputMaybe<Array<PipelineActionActionsCustomActionConnectionWhere>>
  edge?: InputMaybe<ActionsPipeLineWhere>
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>
  node?: InputMaybe<CustomActionWhere>
  node_NOT?: InputMaybe<CustomActionWhere>
}

export type PipelineActionActionsCustomActionCreateFieldInput = {
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  node: CustomActionCreateInput
}

export type PipelineActionActionsCustomActionDeleteFieldInput = {
  delete?: InputMaybe<CustomActionDeleteInput>
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>
}

export type PipelineActionActionsCustomActionDisconnectFieldInput = {
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>
}

export type PipelineActionActionsCustomActionFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<PipelineActionActionsCustomActionCreateFieldInput>>
}

export type PipelineActionActionsCustomActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>
  node?: InputMaybe<CustomActionUpdateInput>
}

export type PipelineActionActionsCustomActionUpdateFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<PipelineActionActionsCustomActionCreateFieldInput>>
  delete?: InputMaybe<Array<PipelineActionActionsCustomActionDeleteFieldInput>>
  disconnect?: InputMaybe<
    Array<PipelineActionActionsCustomActionDisconnectFieldInput>
  >
  update?: InputMaybe<PipelineActionActionsCustomActionUpdateConnectionInput>
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>
}

export type PipelineActionActionsDeleteInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionDeleteFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDeleteFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionDeleteFieldInput>
  >
}

export type PipelineActionActionsDisconnectInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionDisconnectFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDisconnectFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionDisconnectFieldInput>
  >
}

export type PipelineActionActionsPipelineActionConnectFieldInput = {
  connect?: InputMaybe<Array<PipelineActionConnectInput>>
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  where?: InputMaybe<PipelineActionConnectWhere>
}

export type PipelineActionActionsPipelineActionConnectOrCreateFieldInput = {
  onCreate: PipelineActionActionsPipelineActionConnectOrCreateFieldInputOnCreate
  where: PipelineActionConnectOrCreateWhere
}

export type PipelineActionActionsPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    edge?: InputMaybe<ActionsPipeLineCreateInput>
    node: PipelineActionOnCreateInput
  }

export type PipelineActionActionsPipelineActionConnectionWhere = {
  AND?: InputMaybe<Array<PipelineActionActionsPipelineActionConnectionWhere>>
  OR?: InputMaybe<Array<PipelineActionActionsPipelineActionConnectionWhere>>
  edge?: InputMaybe<ActionsPipeLineWhere>
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>
  node?: InputMaybe<PipelineActionWhere>
  node_NOT?: InputMaybe<PipelineActionWhere>
}

export type PipelineActionActionsPipelineActionCreateFieldInput = {
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  node: PipelineActionCreateInput
}

export type PipelineActionActionsPipelineActionDeleteFieldInput = {
  delete?: InputMaybe<PipelineActionDeleteInput>
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>
}

export type PipelineActionActionsPipelineActionDisconnectFieldInput = {
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>
}

export type PipelineActionActionsPipelineActionFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >
}

export type PipelineActionActionsPipelineActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>
  node?: InputMaybe<PipelineActionUpdateInput>
}

export type PipelineActionActionsPipelineActionUpdateFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDeleteFieldInput>
  >
  disconnect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDisconnectFieldInput>
  >
  update?: InputMaybe<PipelineActionActionsPipelineActionUpdateConnectionInput>
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>
}

export type PipelineActionActionsRelationship = ActionsPipeLine & {
  __typename?: 'PipelineActionActionsRelationship'
  cursor: Scalars['String']
  node: AnyAction
  orders?: Maybe<Array<Scalars['String']>>
}

export type PipelineActionActionsResourceActionConnectFieldInput = {
  connect?: InputMaybe<Array<ResourceActionConnectInput>>
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  where?: InputMaybe<ResourceActionConnectWhere>
}

export type PipelineActionActionsResourceActionConnectOrCreateFieldInput = {
  onCreate: PipelineActionActionsResourceActionConnectOrCreateFieldInputOnCreate
  where: ResourceActionConnectOrCreateWhere
}

export type PipelineActionActionsResourceActionConnectOrCreateFieldInputOnCreate =
  {
    edge?: InputMaybe<ActionsPipeLineCreateInput>
    node: ResourceActionOnCreateInput
  }

export type PipelineActionActionsResourceActionConnectionWhere = {
  AND?: InputMaybe<Array<PipelineActionActionsResourceActionConnectionWhere>>
  OR?: InputMaybe<Array<PipelineActionActionsResourceActionConnectionWhere>>
  edge?: InputMaybe<ActionsPipeLineWhere>
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>
  node?: InputMaybe<ResourceActionWhere>
  node_NOT?: InputMaybe<ResourceActionWhere>
}

export type PipelineActionActionsResourceActionCreateFieldInput = {
  edge?: InputMaybe<ActionsPipeLineCreateInput>
  node: ResourceActionCreateInput
}

export type PipelineActionActionsResourceActionDeleteFieldInput = {
  delete?: InputMaybe<ResourceActionDeleteInput>
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>
}

export type PipelineActionActionsResourceActionDisconnectFieldInput = {
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>
}

export type PipelineActionActionsResourceActionFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >
}

export type PipelineActionActionsResourceActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>
  node?: InputMaybe<ResourceActionUpdateInput>
}

export type PipelineActionActionsResourceActionUpdateFieldInput = {
  connect?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<PipelineActionActionsResourceActionDeleteFieldInput>
  >
  disconnect?: InputMaybe<
    Array<PipelineActionActionsResourceActionDisconnectFieldInput>
  >
  update?: InputMaybe<PipelineActionActionsResourceActionUpdateConnectionInput>
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>
}

export type PipelineActionActionsUpdateInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionUpdateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionUpdateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionUpdateFieldInput>
  >
}

export type PipelineActionAggregateSelection = {
  __typename?: 'PipelineActionAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PipelineActionConnectInput = {
  actions?: InputMaybe<PipelineActionActionsConnectInput>
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>
}

export type PipelineActionConnectOrCreateInput = {
  actions?: InputMaybe<PipelineActionActionsConnectOrCreateInput>
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
}

export type PipelineActionConnectOrCreateWhere = {
  node: PipelineActionUniqueWhere
}

export type PipelineActionConnectWhere = {
  node: PipelineActionWhere
}

export type PipelineActionCreateInput = {
  actions?: InputMaybe<PipelineActionActionsCreateInput>
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
  store?: InputMaybe<ActionBaseStoreFieldInput>
  type?: ActionKind
}

export type PipelineActionDeleteInput = {
  actions?: InputMaybe<PipelineActionActionsDeleteInput>
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>
}

export type PipelineActionDisconnectInput = {
  actions?: InputMaybe<PipelineActionActionsDisconnectInput>
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
}

export type PipelineActionEdge = {
  __typename?: 'PipelineActionEdge'
  cursor: Scalars['String']
  node: PipelineAction
}

export type PipelineActionOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
}

export type PipelineActionOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PipelineActionSort objects to sort PipelineActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PipelineActionSort>>
}

export type PipelineActionRelationInput = {
  actions?: InputMaybe<PipelineActionActionsCreateFieldInput>
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>
}

/** Fields to sort PipelineActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one PipelineActionSort object. */
export type PipelineActionSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  runOnInit?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type PipelineActionStoreAggregateInput = {
  AND?: InputMaybe<Array<PipelineActionStoreAggregateInput>>
  OR?: InputMaybe<Array<PipelineActionStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PipelineActionStoreNodeAggregationWhereInput>
}

export type PipelineActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PipelineActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PipelineActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PipelineActionStoreStoreAggregationSelection = {
  __typename?: 'PipelineActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PipelineActionStoreStoreNodeAggregateSelection>
}

export type PipelineActionStoreStoreNodeAggregateSelection = {
  __typename?: 'PipelineActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PipelineActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PipelineActionUpdateInput = {
  actions?: InputMaybe<PipelineActionActionsUpdateInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>
}

export type PipelineActionWhere = {
  AND?: InputMaybe<Array<PipelineActionWhere>>
  OR?: InputMaybe<Array<PipelineActionWhere>>
  actionsConnection_ALL?: InputMaybe<PipelineActionActionsConnectionWhere>
  actionsConnection_NONE?: InputMaybe<PipelineActionActionsConnectionWhere>
  actionsConnection_SINGLE?: InputMaybe<PipelineActionActionsConnectionWhere>
  actionsConnection_SOME?: InputMaybe<PipelineActionActionsConnectionWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  runOnInit_NOT?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<PipelineActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
  type?: InputMaybe<ActionKind>
  type_IN?: InputMaybe<Array<ActionKind>>
  type_NOT?: InputMaybe<ActionKind>
  type_NOT_IN?: InputMaybe<Array<ActionKind>>
}

export type PipelineActionsConnection = {
  __typename?: 'PipelineActionsConnection'
  edges: Array<PipelineActionEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = TypeBase & {
  __typename?: 'PrimitiveType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
  primitiveKind: PrimitiveTypeKind
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type PrimitiveTypeAggregateSelection = {
  __typename?: 'PrimitiveTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PrimitiveTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  primitiveKind: PrimitiveTypeKind
}

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type PrimitiveTypeEdge = {
  __typename?: 'PrimitiveTypeEdge'
  cursor: Scalars['String']
  node: PrimitiveType
}

export enum PrimitiveTypeKind {
  Boolean = 'Boolean',
  Float = 'Float',
  Integer = 'Integer',
  String = 'String',
}

export type PrimitiveTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PrimitiveTypeSort objects to sort PrimitiveTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PrimitiveTypeSort>>
}

export type PrimitiveTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PrimitiveTypeOwnerNodeAggregationWhereInput>
}

export type PrimitiveTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  primitiveKind?: InputMaybe<SortDirection>
}

export type PrimitiveTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
}

export type PrimitiveTypeUserOwnerAggregationSelection = {
  __typename?: 'PrimitiveTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>
}

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PrimitiveTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type PrimitiveTypeWhere = {
  AND?: InputMaybe<Array<PrimitiveTypeWhere>>
  OR?: InputMaybe<Array<PrimitiveTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  primitiveKind_NOT?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_NOT_IN?: InputMaybe<Array<PrimitiveTypeKind>>
}

export type PrimitiveTypesConnection = {
  __typename?: 'PrimitiveTypesConnection'
  edges: Array<PrimitiveTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Prop = {
  __typename?: 'Prop'
  data: Scalars['String']
  id: Scalars['ID']
}

export type PropAggregateSelection = {
  __typename?: 'PropAggregateSelection'
  count: Scalars['Int']
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type PropConnectOrCreateWhere = {
  node: PropUniqueWhere
}

export type PropConnectWhere = {
  node: PropWhere
}

export type PropCreateInput = {
  data?: Scalars['String']
}

export type PropEdge = {
  __typename?: 'PropEdge'
  cursor: Scalars['String']
  node: Prop
}

export type PropMapBinding = {
  __typename?: 'PropMapBinding'
  element: Element
  elementAggregate?: Maybe<PropMapBindingElementElementAggregationSelection>
  elementConnection: PropMapBindingElementConnection
  id: Scalars['ID']
  sourceKey: Scalars['String']
  targetElement?: Maybe<Element>
  targetElementAggregate?: Maybe<PropMapBindingElementTargetElementAggregationSelection>
  targetElementConnection: PropMapBindingTargetElementConnection
  targetKey: Scalars['String']
}

export type PropMapBindingElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type PropMapBindingElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type PropMapBindingElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PropMapBindingElementConnectionSort>>
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
}

export type PropMapBindingTargetElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type PropMapBindingTargetElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type PropMapBindingTargetElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<PropMapBindingTargetElementConnectionSort>>
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropMapBindingAggregateSelection = {
  __typename?: 'PropMapBindingAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  sourceKey: StringAggregateSelectionNonNullable
  targetKey: StringAggregateSelectionNonNullable
}

export type PropMapBindingConnectInput = {
  element?: InputMaybe<PropMapBindingElementConnectFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>
}

export type PropMapBindingConnectOrCreateInput = {
  element?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
}

export type PropMapBindingConnectOrCreateWhere = {
  node: PropMapBindingUniqueWhere
}

export type PropMapBindingConnectWhere = {
  node: PropMapBindingWhere
}

export type PropMapBindingCreateInput = {
  element?: InputMaybe<PropMapBindingElementFieldInput>
  sourceKey: Scalars['String']
  targetElement?: InputMaybe<PropMapBindingTargetElementFieldInput>
  targetKey: Scalars['String']
}

export type PropMapBindingDeleteInput = {
  element?: InputMaybe<PropMapBindingElementDeleteFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>
}

export type PropMapBindingDisconnectInput = {
  element?: InputMaybe<PropMapBindingElementDisconnectFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>
}

export type PropMapBindingEdge = {
  __typename?: 'PropMapBindingEdge'
  cursor: Scalars['String']
  node: PropMapBinding
}

export type PropMapBindingElementAggregateInput = {
  AND?: InputMaybe<Array<PropMapBindingElementAggregateInput>>
  OR?: InputMaybe<Array<PropMapBindingElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PropMapBindingElementNodeAggregationWhereInput>
}

export type PropMapBindingElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type PropMapBindingElementConnectOrCreateFieldInput = {
  onCreate: PropMapBindingElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type PropMapBindingElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PropMapBindingElementConnection = {
  __typename?: 'PropMapBindingElementConnection'
  edges: Array<PropMapBindingElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PropMapBindingElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type PropMapBindingElementConnectionWhere = {
  AND?: InputMaybe<Array<PropMapBindingElementConnectionWhere>>
  OR?: InputMaybe<Array<PropMapBindingElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type PropMapBindingElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
}

export type PropMapBindingElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
}

export type PropMapBindingElementElementAggregationSelection = {
  __typename?: 'PropMapBindingElementElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PropMapBindingElementElementNodeAggregateSelection>
}

export type PropMapBindingElementElementNodeAggregateSelection = {
  __typename?: 'PropMapBindingElementElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type PropMapBindingElementFieldInput = {
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>
}

export type PropMapBindingElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PropMapBindingElementRelationship = {
  __typename?: 'PropMapBindingElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PropMapBindingElementTargetElementAggregationSelection = {
  __typename?: 'PropMapBindingElementTargetElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PropMapBindingElementTargetElementNodeAggregateSelection>
}

export type PropMapBindingElementTargetElementNodeAggregateSelection = {
  __typename?: 'PropMapBindingElementTargetElementNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type PropMapBindingElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PropMapBindingElementUpdateFieldInput = {
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>
  delete?: InputMaybe<PropMapBindingElementDeleteFieldInput>
  disconnect?: InputMaybe<PropMapBindingElementDisconnectFieldInput>
  update?: InputMaybe<PropMapBindingElementUpdateConnectionInput>
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
}

export type PropMapBindingOnCreateInput = {
  sourceKey: Scalars['String']
  targetKey: Scalars['String']
}

export type PropMapBindingOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PropMapBindingSort objects to sort PropMapBindings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropMapBindingSort>>
}

export type PropMapBindingRelationInput = {
  element?: InputMaybe<PropMapBindingElementCreateFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>
}

/** Fields to sort PropMapBindings by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropMapBindingSort object. */
export type PropMapBindingSort = {
  id?: InputMaybe<SortDirection>
  sourceKey?: InputMaybe<SortDirection>
  targetKey?: InputMaybe<SortDirection>
}

export type PropMapBindingTargetElementAggregateInput = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>
  OR?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<PropMapBindingTargetElementNodeAggregationWhereInput>
}

export type PropMapBindingTargetElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type PropMapBindingTargetElementConnectOrCreateFieldInput = {
  onCreate: PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PropMapBindingTargetElementConnection = {
  __typename?: 'PropMapBindingTargetElementConnection'
  edges: Array<PropMapBindingTargetElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PropMapBindingTargetElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type PropMapBindingTargetElementConnectionWhere = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementConnectionWhere>>
  OR?: InputMaybe<Array<PropMapBindingTargetElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type PropMapBindingTargetElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingTargetElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropMapBindingTargetElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropMapBindingTargetElementFieldInput = {
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>
}

export type PropMapBindingTargetElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PropMapBindingTargetElementRelationship = {
  __typename?: 'PropMapBindingTargetElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PropMapBindingTargetElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PropMapBindingTargetElementUpdateFieldInput = {
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>
  delete?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>
  disconnect?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>
  update?: InputMaybe<PropMapBindingTargetElementUpdateConnectionInput>
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropMapBindingUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PropMapBindingUpdateInput = {
  element?: InputMaybe<PropMapBindingElementUpdateFieldInput>
  sourceKey?: InputMaybe<Scalars['String']>
  targetElement?: InputMaybe<PropMapBindingTargetElementUpdateFieldInput>
  targetKey?: InputMaybe<Scalars['String']>
}

export type PropMapBindingWhere = {
  AND?: InputMaybe<Array<PropMapBindingWhere>>
  OR?: InputMaybe<Array<PropMapBindingWhere>>
  element?: InputMaybe<ElementWhere>
  elementAggregate?: InputMaybe<PropMapBindingElementAggregateInput>
  elementConnection?: InputMaybe<PropMapBindingElementConnectionWhere>
  elementConnection_NOT?: InputMaybe<PropMapBindingElementConnectionWhere>
  element_NOT?: InputMaybe<ElementWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  sourceKey?: InputMaybe<Scalars['String']>
  sourceKey_CONTAINS?: InputMaybe<Scalars['String']>
  sourceKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_IN?: InputMaybe<Array<Scalars['String']>>
  sourceKey_NOT?: InputMaybe<Scalars['String']>
  sourceKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  sourceKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  sourceKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  targetElement?: InputMaybe<ElementWhere>
  targetElementAggregate?: InputMaybe<PropMapBindingTargetElementAggregateInput>
  targetElementConnection?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  targetElementConnection_NOT?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  targetElement_NOT?: InputMaybe<ElementWhere>
  targetKey?: InputMaybe<Scalars['String']>
  targetKey_CONTAINS?: InputMaybe<Scalars['String']>
  targetKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  targetKey_IN?: InputMaybe<Array<Scalars['String']>>
  targetKey_NOT?: InputMaybe<Scalars['String']>
  targetKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  targetKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  targetKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  targetKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  targetKey_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type PropMapBindingsConnection = {
  __typename?: 'PropMapBindingsConnection'
  edges: Array<PropMapBindingEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PropOnCreateInput = {
  data?: Scalars['String']
}

export type PropOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more PropSort objects to sort Props by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropSort>>
}

/** Fields to sort Props by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropSort object. */
export type PropSort = {
  data?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
}

export type PropUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PropUpdateInput = {
  data?: InputMaybe<Scalars['String']>
}

export type PropWhere = {
  AND?: InputMaybe<Array<PropWhere>>
  OR?: InputMaybe<Array<PropWhere>>
  data?: InputMaybe<Scalars['String']>
  data_CONTAINS?: InputMaybe<Scalars['String']>
  data_ENDS_WITH?: InputMaybe<Scalars['String']>
  data_IN?: InputMaybe<Array<Scalars['String']>>
  data_NOT?: InputMaybe<Scalars['String']>
  data_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  data_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  data_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  data_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  data_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
}

export type PropsConnection = {
  __typename?: 'PropsConnection'
  edges: Array<PropEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  actionTypes: Array<ActionType>
  actionTypesAggregate: ActionTypeAggregateSelection
  actionTypesConnection: ActionTypesConnection
  appTypes: Array<AppType>
  appTypesAggregate: AppTypeAggregateSelection
  appTypesConnection: AppTypesConnection
  apps: Array<App>
  appsAggregate: AppAggregateSelection
  appsConnection: AppsConnection
  arrayTypes: Array<ArrayType>
  arrayTypesAggregate: ArrayTypeAggregateSelection
  arrayTypesConnection: ArrayTypesConnection
  atoms: Array<Atom>
  atomsAggregate: AtomAggregateSelection
  atomsConnection: AtomsConnection
  codeMirrorTypes: Array<CodeMirrorType>
  codeMirrorTypesAggregate: CodeMirrorTypeAggregateSelection
  codeMirrorTypesConnection: CodeMirrorTypesConnection
  components: Array<Component>
  componentsAggregate: ComponentAggregateSelection
  componentsConnection: ComponentsConnection
  createInfos: Array<CreateInfo>
  createInfosAggregate: CreateInfoAggregateSelection
  createInfosConnection: CreateInfosConnection
  customActions: Array<CustomAction>
  customActionsAggregate: CustomActionAggregateSelection
  customActionsConnection: CustomActionsConnection
  deleteInfos: Array<DeleteInfo>
  deleteInfosAggregate: DeleteInfoAggregateSelection
  deleteInfosConnection: DeleteInfosConnection
  domains: Array<Domain>
  domainsAggregate: DomainAggregateSelection
  domainsConnection: DomainsConnection
  elementGraph: ElementGraph
  elementTypes: Array<ElementType>
  elementTypesAggregate: ElementTypeAggregateSelection
  elementTypesConnection: ElementTypesConnection
  elements: Array<Element>
  elementsAggregate: ElementAggregateSelection
  elementsConnection: ElementsConnection
  enumTypeValues: Array<EnumTypeValue>
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection
  enumTypeValuesConnection: EnumTypeValuesConnection
  enumTypes: Array<EnumType>
  enumTypesAggregate: EnumTypeAggregateSelection
  enumTypesConnection: EnumTypesConnection
  executeCommandResponses: Array<ExecuteCommandResponse>
  executeCommandResponsesAggregate: ExecuteCommandResponseAggregateSelection
  executeCommandResponsesConnection: ExecuteCommandResponsesConnection
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>
  hooks: Array<Hook>
  hooksAggregate: HookAggregateSelection
  hooksConnection: HooksConnection
  interfaceTypes: Array<InterfaceType>
  interfaceTypesAggregate: InterfaceTypeAggregateSelection
  interfaceTypesConnection: InterfaceTypesConnection
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']>
  lambdaTypes: Array<LambdaType>
  lambdaTypesAggregate: LambdaTypeAggregateSelection
  lambdaTypesConnection: LambdaTypesConnection
  pageTypes: Array<PageType>
  pageTypesAggregate: PageTypeAggregateSelection
  pageTypesConnection: PageTypesConnection
  pages: Array<Page>
  pagesAggregate: PageAggregateSelection
  pagesConnection: PagesConnection
  pipelineActions: Array<PipelineAction>
  pipelineActionsAggregate: PipelineActionAggregateSelection
  pipelineActionsConnection: PipelineActionsConnection
  primitiveTypes: Array<PrimitiveType>
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection
  primitiveTypesConnection: PrimitiveTypesConnection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate: PropMapBindingAggregateSelection
  propMapBindingsConnection: PropMapBindingsConnection
  props: Array<Prop>
  propsAggregate: PropAggregateSelection
  propsConnection: PropsConnection
  reactNodeTypes: Array<ReactNodeType>
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection
  reactNodeTypesConnection: ReactNodeTypesConnection
  renderPropsTypes: Array<RenderPropsType>
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection
  renderPropsTypesConnection: RenderPropsTypesConnection
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
  resetDatabaseMutationResponsesAggregate: ResetDatabaseMutationResponseAggregateSelection
  resetDatabaseMutationResponsesConnection: ResetDatabaseMutationResponsesConnection
  resourceActions: Array<ResourceAction>
  resourceActionsAggregate: ResourceActionAggregateSelection
  resourceActionsConnection: ResourceActionsConnection
  resources: Array<Resource>
  resourcesAggregate: ResourceAggregateSelection
  resourcesConnection: ResourcesConnection
  stores: Array<Store>
  storesAggregate: StoreAggregateSelection
  storesConnection: StoresConnection
  tagGraphOptions: Array<TagGraphOptions>
  tagGraphOptionsAggregate: TagGraphOptionsAggregateSelection
  tagGraphOptionsConnection: TagGraphOptionsConnection
  tagGraphs: Array<TagGraph>
  tags: Array<Tag>
  tagsAggregate: TagAggregateSelection
  tagsConnection: TagsConnection
  typeReferences: Array<TypeReference>
  typeReferencesAggregate: TypeReferenceAggregateSelection
  typeReferencesConnection: TypeReferencesConnection
  unionTypes: Array<UnionType>
  unionTypesAggregate: UnionTypeAggregateSelection
  unionTypesConnection: UnionTypesConnection
  users: Array<User>
  usersAggregate: UserAggregateSelection
  usersConnection: UsersConnection
  vercelDomainConfigData: Array<VercelDomainConfigData>
  vercelDomainConfigDataAggregate: VercelDomainConfigDataAggregateSelection
  vercelDomainConfigDataConnection: VercelDomainConfigDataConnection
  vercelProjectDomainData: Array<VercelProjectDomainData>
  vercelProjectDomainDataAggregate: VercelProjectDomainDataAggregateSelection
  vercelProjectDomainDataConnection: VercelProjectDomainDataConnection
}

export type QueryActionTypesArgs = {
  options?: InputMaybe<ActionTypeOptions>
  where?: InputMaybe<ActionTypeWhere>
}

export type QueryActionTypesAggregateArgs = {
  where?: InputMaybe<ActionTypeWhere>
}

export type QueryActionTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ActionTypeSort>>>
  where?: InputMaybe<ActionTypeWhere>
}

export type QueryAppTypesArgs = {
  options?: InputMaybe<AppTypeOptions>
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppTypesAggregateArgs = {
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<AppTypeSort>>>
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppsArgs = {
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryAppsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<AppSort>>>
  where?: InputMaybe<AppWhere>
}

export type QueryArrayTypesArgs = {
  options?: InputMaybe<ArrayTypeOptions>
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryArrayTypesAggregateArgs = {
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryArrayTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ArrayTypeSort>>>
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryAtomsArgs = {
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<AtomSort>>>
  where?: InputMaybe<AtomWhere>
}

export type QueryCodeMirrorTypesArgs = {
  options?: InputMaybe<CodeMirrorTypeOptions>
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type QueryCodeMirrorTypesAggregateArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type QueryCodeMirrorTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<CodeMirrorTypeSort>>>
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type QueryComponentsArgs = {
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}

export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
}

export type QueryComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ComponentSort>>>
  where?: InputMaybe<ComponentWhere>
}

export type QueryCreateInfosArgs = {
  options?: InputMaybe<CreateInfoOptions>
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryCreateInfosAggregateArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryCreateInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<CreateInfoSort>>>
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryCustomActionsArgs = {
  options?: InputMaybe<CustomActionOptions>
  where?: InputMaybe<CustomActionWhere>
}

export type QueryCustomActionsAggregateArgs = {
  where?: InputMaybe<CustomActionWhere>
}

export type QueryCustomActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<CustomActionSort>>>
  where?: InputMaybe<CustomActionWhere>
}

export type QueryDeleteInfosArgs = {
  options?: InputMaybe<DeleteInfoOptions>
  where?: InputMaybe<DeleteInfoWhere>
}

export type QueryDeleteInfosAggregateArgs = {
  where?: InputMaybe<DeleteInfoWhere>
}

export type QueryDeleteInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<DeleteInfoSort>>>
  where?: InputMaybe<DeleteInfoWhere>
}

export type QueryDomainsArgs = {
  options?: InputMaybe<DomainOptions>
  where?: InputMaybe<DomainWhere>
}

export type QueryDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>
}

export type QueryDomainsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<DomainSort>>>
  where?: InputMaybe<DomainWhere>
}

export type QueryElementGraphArgs = {
  input: ElementGraphInput
}

export type QueryElementTypesArgs = {
  options?: InputMaybe<ElementTypeOptions>
  where?: InputMaybe<ElementTypeWhere>
}

export type QueryElementTypesAggregateArgs = {
  where?: InputMaybe<ElementTypeWhere>
}

export type QueryElementTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ElementTypeSort>>>
  where?: InputMaybe<ElementTypeWhere>
}

export type QueryElementsArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ElementSort>>>
  where?: InputMaybe<ElementWhere>
}

export type QueryEnumTypeValuesArgs = {
  options?: InputMaybe<EnumTypeValueOptions>
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypeValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypeValuesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<EnumTypeValueSort>>>
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypesArgs = {
  options?: InputMaybe<EnumTypeOptions>
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryEnumTypesAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryEnumTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<EnumTypeSort>>>
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryExecuteCommandResponsesArgs = {
  options?: InputMaybe<ExecuteCommandResponseOptions>
  where?: InputMaybe<ExecuteCommandResponseWhere>
}

export type QueryExecuteCommandResponsesAggregateArgs = {
  where?: InputMaybe<ExecuteCommandResponseWhere>
}

export type QueryExecuteCommandResponsesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ExecuteCommandResponseSort>>>
  where?: InputMaybe<ExecuteCommandResponseWhere>
}

export type QueryGetTypeReferencesArgs = {
  typeId: Scalars['ID']
}

export type QueryHooksArgs = {
  options?: InputMaybe<HookOptions>
  where?: InputMaybe<HookWhere>
}

export type QueryHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>
}

export type QueryHooksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<HookSort>>>
  where?: InputMaybe<HookWhere>
}

export type QueryInterfaceTypesArgs = {
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryInterfaceTypesAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryInterfaceTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<InterfaceTypeSort>>>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryIsTypeDescendantOfArgs = {
  descendantTypeId: Scalars['ID']
  parentTypeId: Scalars['ID']
}

export type QueryLambdaTypesArgs = {
  options?: InputMaybe<LambdaTypeOptions>
  where?: InputMaybe<LambdaTypeWhere>
}

export type QueryLambdaTypesAggregateArgs = {
  where?: InputMaybe<LambdaTypeWhere>
}

export type QueryLambdaTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<LambdaTypeSort>>>
  where?: InputMaybe<LambdaTypeWhere>
}

export type QueryPageTypesArgs = {
  options?: InputMaybe<PageTypeOptions>
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPageTypesAggregateArgs = {
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPageTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PageTypeSort>>>
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPagesArgs = {
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryPagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PageSort>>>
  where?: InputMaybe<PageWhere>
}

export type QueryPipelineActionsArgs = {
  options?: InputMaybe<PipelineActionOptions>
  where?: InputMaybe<PipelineActionWhere>
}

export type QueryPipelineActionsAggregateArgs = {
  where?: InputMaybe<PipelineActionWhere>
}

export type QueryPipelineActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PipelineActionSort>>>
  where?: InputMaybe<PipelineActionWhere>
}

export type QueryPrimitiveTypesArgs = {
  options?: InputMaybe<PrimitiveTypeOptions>
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPrimitiveTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PrimitiveTypeSort>>>
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPropMapBindingsArgs = {
  options?: InputMaybe<PropMapBindingOptions>
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropMapBindingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PropMapBindingSort>>>
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropsArgs = {
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type QueryPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>
}

export type QueryPropsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<PropSort>>>
  where?: InputMaybe<PropWhere>
}

export type QueryReactNodeTypesArgs = {
  options?: InputMaybe<ReactNodeTypeOptions>
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryReactNodeTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ReactNodeTypeSort>>>
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryRenderPropsTypesArgs = {
  options?: InputMaybe<RenderPropsTypeOptions>
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryRenderPropsTypesAggregateArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryRenderPropsTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<RenderPropsTypeSort>>>
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryResetDatabaseMutationResponsesArgs = {
  options?: InputMaybe<ResetDatabaseMutationResponseOptions>
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryResetDatabaseMutationResponsesAggregateArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryResetDatabaseMutationResponsesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ResetDatabaseMutationResponseSort>>>
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryResourceActionsArgs = {
  options?: InputMaybe<ResourceActionOptions>
  where?: InputMaybe<ResourceActionWhere>
}

export type QueryResourceActionsAggregateArgs = {
  where?: InputMaybe<ResourceActionWhere>
}

export type QueryResourceActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ResourceActionSort>>>
  where?: InputMaybe<ResourceActionWhere>
}

export type QueryResourcesArgs = {
  options?: InputMaybe<ResourceOptions>
  where?: InputMaybe<ResourceWhere>
}

export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
}

export type QueryResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<ResourceSort>>>
  where?: InputMaybe<ResourceWhere>
}

export type QueryStoresArgs = {
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type QueryStoresAggregateArgs = {
  where?: InputMaybe<StoreWhere>
}

export type QueryStoresConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<StoreSort>>>
  where?: InputMaybe<StoreWhere>
}

export type QueryTagGraphOptionsArgs = {
  options?: InputMaybe<TagGraphOptionsOptions>
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagGraphOptionsAggregateArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagGraphOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<TagGraphOptionsSort>>>
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagsArgs = {
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
}

export type QueryTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>
  where?: InputMaybe<TagWhere>
}

export type QueryTypeReferencesArgs = {
  options?: InputMaybe<TypeReferenceOptions>
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryTypeReferencesAggregateArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryTypeReferencesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<TypeReferenceSort>>>
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryUnionTypesArgs = {
  options?: InputMaybe<UnionTypeOptions>
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUnionTypesAggregateArgs = {
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUnionTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<UnionTypeSort>>>
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>
}

export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>
  where?: InputMaybe<UserWhere>
}

export type QueryVercelDomainConfigDataArgs = {
  options?: InputMaybe<VercelDomainConfigDataOptions>
  where?: InputMaybe<VercelDomainConfigDataWhere>
}

export type QueryVercelDomainConfigDataAggregateArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>
}

export type QueryVercelDomainConfigDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<VercelDomainConfigDataSort>>>
  where?: InputMaybe<VercelDomainConfigDataWhere>
}

export type QueryVercelProjectDomainDataArgs = {
  options?: InputMaybe<VercelProjectDomainDataOptions>
  where?: InputMaybe<VercelProjectDomainDataWhere>
}

export type QueryVercelProjectDomainDataAggregateArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>
}

export type QueryVercelProjectDomainDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<InputMaybe<VercelProjectDomainDataSort>>>
  where?: InputMaybe<VercelProjectDomainDataWhere>
}

export type QueryOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ReactNodeType = TypeBase & {
  __typename?: 'ReactNodeType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ReactNodeTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ReactNodeTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ReactNodeTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ReactNodeTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type ReactNodeTypeAggregateSelection = {
  __typename?: 'ReactNodeTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ReactNodeTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ReactNodeTypeEdge = {
  __typename?: 'ReactNodeTypeEdge'
  cursor: Scalars['String']
  node: ReactNodeType
}

export type ReactNodeTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ReactNodeTypeSort objects to sort ReactNodeTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ReactNodeTypeSort>>
}

export type ReactNodeTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ReactNodeTypeOwnerNodeAggregationWhereInput>
}

export type ReactNodeTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ReactNodeTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type ReactNodeTypeUserOwnerAggregationSelection = {
  __typename?: 'ReactNodeTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>
}

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ReactNodeTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ReactNodeTypeWhere = {
  AND?: InputMaybe<Array<ReactNodeTypeWhere>>
  OR?: InputMaybe<Array<ReactNodeTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type ReactNodeTypesConnection = {
  __typename?: 'ReactNodeTypesConnection'
  edges: Array<ReactNodeTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type RenderPropsType = TypeBase & {
  __typename?: 'RenderPropsType'
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<RenderPropsTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type RenderPropsTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type RenderPropsTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type RenderPropsTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type RenderPropsTypeAggregateSelection = {
  __typename?: 'RenderPropsTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type RenderPropsTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type RenderPropsTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type RenderPropsTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type RenderPropsTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type RenderPropsTypeEdge = {
  __typename?: 'RenderPropsTypeEdge'
  cursor: Scalars['String']
  node: RenderPropsType
}

export type RenderPropsTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more RenderPropsTypeSort objects to sort RenderPropsTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RenderPropsTypeSort>>
}

export type RenderPropsTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<RenderPropsTypeOwnerNodeAggregationWhereInput>
}

export type RenderPropsTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type RenderPropsTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type RenderPropsTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type RenderPropsTypeUserOwnerAggregationSelection = {
  __typename?: 'RenderPropsTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<RenderPropsTypeUserOwnerNodeAggregateSelection>
}

export type RenderPropsTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'RenderPropsTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type RenderPropsTypeWhere = {
  AND?: InputMaybe<Array<RenderPropsTypeWhere>>
  OR?: InputMaybe<Array<RenderPropsTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<RenderPropsTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export type RenderPropsTypesConnection = {
  __typename?: 'RenderPropsTypesConnection'
  edges: Array<RenderPropsTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResetDatabaseMutationResponse = {
  __typename?: 'ResetDatabaseMutationResponse'
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseAggregateSelection = {
  __typename?: 'ResetDatabaseMutationResponseAggregateSelection'
  count: Scalars['Int']
}

export type ResetDatabaseMutationResponseCreateInput = {
  success?: InputMaybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseEdge = {
  __typename?: 'ResetDatabaseMutationResponseEdge'
  cursor: Scalars['String']
  node: ResetDatabaseMutationResponse
}

export type ResetDatabaseMutationResponseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ResetDatabaseMutationResponseSort objects to sort ResetDatabaseMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResetDatabaseMutationResponseSort>>
}

/** Fields to sort ResetDatabaseMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResetDatabaseMutationResponseSort object. */
export type ResetDatabaseMutationResponseSort = {
  success?: InputMaybe<SortDirection>
}

export type ResetDatabaseMutationResponseUpdateInput = {
  success?: InputMaybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseWhere = {
  AND?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>
  OR?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>
  success?: InputMaybe<Scalars['Boolean']>
  success_NOT?: InputMaybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponsesConnection = {
  __typename?: 'ResetDatabaseMutationResponsesConnection'
  edges: Array<ResetDatabaseMutationResponseEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Resource = WithOwner & {
  __typename?: 'Resource'
  config: Prop
  configAggregate?: Maybe<ResourcePropConfigAggregationSelection>
  configConnection: ResourceConfigConnection
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ResourceUserOwnerAggregationSelection>
  ownerConnection: WithOwnerOwnerConnection
  type: ResourceType
}

export type ResourceConfigArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type ResourceConfigAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropWhere>
}

export type ResourceConfigConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ResourceConfigConnectionSort>>
  where?: InputMaybe<ResourceConfigConnectionWhere>
}

export type ResourceOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type ResourceOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

export type ResourceOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type ResourceAction = ActionBase & {
  __typename?: 'ResourceAction'
  config: Prop
  configAggregate?: Maybe<ResourceActionPropConfigAggregationSelection>
  configConnection: ResourceActionConfigConnection
  errorAction: AnyAction
  errorActionConnection: ResourceActionErrorActionConnection
  id: Scalars['ID']
  name: Scalars['String']
  /** Resource to fetch data from */
  resource: Resource
  resourceAggregate?: Maybe<ResourceActionResourceResourceAggregationSelection>
  resourceConnection: ResourceActionResourceConnection
  runOnInit: Scalars['Boolean']
  store: Store
  storeAggregate?: Maybe<ResourceActionStoreStoreAggregationSelection>
  storeConnection: ActionBaseStoreConnection
  /** Response handlers */
  successAction: AnyAction
  successActionConnection: ResourceActionSuccessActionConnection
  type: ActionKind
}

export type ResourceActionConfigArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type ResourceActionConfigAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropWhere>
}

export type ResourceActionConfigConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ResourceActionConfigConnectionSort>>
  where?: InputMaybe<ResourceActionConfigConnectionWhere>
}

export type ResourceActionErrorActionArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
}

export type ResourceActionErrorActionConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ResourceActionErrorActionConnectionWhere>
}

export type ResourceActionResourceArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ResourceOptions>
  where?: InputMaybe<ResourceWhere>
}

export type ResourceActionResourceAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ResourceWhere>
}

export type ResourceActionResourceConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ResourceActionResourceConnectionSort>>
  where?: InputMaybe<ResourceActionResourceConnectionWhere>
}

export type ResourceActionStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type ResourceActionStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type ResourceActionStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type ResourceActionSuccessActionArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
}

export type ResourceActionSuccessActionConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ResourceActionSuccessActionConnectionWhere>
}

export type ResourceActionAggregateSelection = {
  __typename?: 'ResourceActionAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ResourceActionConfigAggregateInput = {
  AND?: InputMaybe<Array<ResourceActionConfigAggregateInput>>
  OR?: InputMaybe<Array<ResourceActionConfigAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ResourceActionConfigNodeAggregationWhereInput>
}

export type ResourceActionConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type ResourceActionConfigConnectOrCreateFieldInput = {
  onCreate: ResourceActionConfigConnectOrCreateFieldInputOnCreate
  where: PropConnectOrCreateWhere
}

export type ResourceActionConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type ResourceActionConfigConnection = {
  __typename?: 'ResourceActionConfigConnection'
  edges: Array<ResourceActionConfigRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceActionConfigConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type ResourceActionConfigConnectionWhere = {
  AND?: InputMaybe<Array<ResourceActionConfigConnectionWhere>>
  OR?: InputMaybe<Array<ResourceActionConfigConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type ResourceActionConfigCreateFieldInput = {
  node: PropCreateInput
}

export type ResourceActionConfigDeleteFieldInput = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>
}

export type ResourceActionConfigDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>
}

export type ResourceActionConfigFieldInput = {
  connect?: InputMaybe<ResourceActionConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionConfigCreateFieldInput>
}

export type ResourceActionConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceActionConfigNodeAggregationWhereInput>>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type ResourceActionConfigRelationship = {
  __typename?: 'ResourceActionConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ResourceActionConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ResourceActionConfigUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionConfigCreateFieldInput>
  delete?: InputMaybe<ResourceActionConfigDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionConfigDisconnectFieldInput>
  update?: InputMaybe<ResourceActionConfigUpdateConnectionInput>
  where?: InputMaybe<ResourceActionConfigConnectionWhere>
}

export type ResourceActionConnectInput = {
  config?: InputMaybe<ResourceActionConfigConnectFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionConnectInput>
  resource?: InputMaybe<ResourceActionResourceConnectFieldInput>
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionConnectInput>
}

export type ResourceActionConnectOrCreateInput = {
  config?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionConnectOrCreateInput>
  resource?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionConnectOrCreateInput>
}

export type ResourceActionConnectOrCreateWhere = {
  node: ResourceActionUniqueWhere
}

export type ResourceActionConnectWhere = {
  node: ResourceActionWhere
}

export type ResourceActionCreateInput = {
  config?: InputMaybe<ResourceActionConfigFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionCreateInput>
  id: Scalars['ID']
  name: Scalars['String']
  resource?: InputMaybe<ResourceActionResourceFieldInput>
  runOnInit?: Scalars['Boolean']
  store?: InputMaybe<ActionBaseStoreFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionCreateInput>
  type?: ActionKind
}

export type ResourceActionDeleteInput = {
  config?: InputMaybe<ResourceActionConfigDeleteFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionDeleteInput>
  resource?: InputMaybe<ResourceActionResourceDeleteFieldInput>
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionDeleteInput>
}

export type ResourceActionDisconnectInput = {
  config?: InputMaybe<ResourceActionConfigDisconnectFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionDisconnectInput>
  resource?: InputMaybe<ResourceActionResourceDisconnectFieldInput>
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionDisconnectInput>
}

export type ResourceActionEdge = {
  __typename?: 'ResourceActionEdge'
  cursor: Scalars['String']
  node: ResourceAction
}

export type ResourceActionErrorActionConnectInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>
}

export type ResourceActionErrorActionConnectOrCreateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>
}

export type ResourceActionErrorActionConnection = {
  __typename?: 'ResourceActionErrorActionConnection'
  edges: Array<ResourceActionErrorActionRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceActionErrorActionConnectionWhere = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>
}

export type ResourceActionErrorActionCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<ResourceActionErrorActionCustomActionCreateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<ResourceActionErrorActionPipelineActionCreateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<ResourceActionErrorActionResourceActionCreateFieldInput>
  >
}

export type ResourceActionErrorActionCreateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionFieldInput>
}

export type ResourceActionErrorActionCustomActionConnectFieldInput = {
  connect?: InputMaybe<CustomActionConnectInput>
  where?: InputMaybe<CustomActionConnectWhere>
}

export type ResourceActionErrorActionCustomActionConnectOrCreateFieldInput = {
  onCreate: ResourceActionErrorActionCustomActionConnectOrCreateFieldInputOnCreate
  where: CustomActionConnectOrCreateWhere
}

export type ResourceActionErrorActionCustomActionConnectOrCreateFieldInputOnCreate =
  {
    node: CustomActionOnCreateInput
  }

export type ResourceActionErrorActionCustomActionConnectionWhere = {
  AND?: InputMaybe<Array<ResourceActionErrorActionCustomActionConnectionWhere>>
  OR?: InputMaybe<Array<ResourceActionErrorActionCustomActionConnectionWhere>>
  node?: InputMaybe<CustomActionWhere>
  node_NOT?: InputMaybe<CustomActionWhere>
}

export type ResourceActionErrorActionCustomActionCreateFieldInput = {
  node: CustomActionCreateInput
}

export type ResourceActionErrorActionCustomActionDeleteFieldInput = {
  delete?: InputMaybe<CustomActionDeleteInput>
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>
}

export type ResourceActionErrorActionCustomActionDisconnectFieldInput = {
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>
}

export type ResourceActionErrorActionCustomActionFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionCustomActionCreateFieldInput>
}

export type ResourceActionErrorActionCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>
}

export type ResourceActionErrorActionCustomActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionCustomActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionErrorActionCustomActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionErrorActionCustomActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionErrorActionCustomActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>
}

export type ResourceActionErrorActionDeleteInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionDeleteFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionDeleteFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionDeleteFieldInput>
}

export type ResourceActionErrorActionDisconnectInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionDisconnectFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionDisconnectFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionDisconnectFieldInput>
}

export type ResourceActionErrorActionPipelineActionConnectFieldInput = {
  connect?: InputMaybe<PipelineActionConnectInput>
  where?: InputMaybe<PipelineActionConnectWhere>
}

export type ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput = {
  onCreate: ResourceActionErrorActionPipelineActionConnectOrCreateFieldInputOnCreate
  where: PipelineActionConnectOrCreateWhere
}

export type ResourceActionErrorActionPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    node: PipelineActionOnCreateInput
  }

export type ResourceActionErrorActionPipelineActionConnectionWhere = {
  AND?: InputMaybe<
    Array<ResourceActionErrorActionPipelineActionConnectionWhere>
  >
  OR?: InputMaybe<Array<ResourceActionErrorActionPipelineActionConnectionWhere>>
  node?: InputMaybe<PipelineActionWhere>
  node_NOT?: InputMaybe<PipelineActionWhere>
}

export type ResourceActionErrorActionPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput
}

export type ResourceActionErrorActionPipelineActionDeleteFieldInput = {
  delete?: InputMaybe<PipelineActionDeleteInput>
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>
}

export type ResourceActionErrorActionPipelineActionDisconnectFieldInput = {
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>
}

export type ResourceActionErrorActionPipelineActionFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionPipelineActionCreateFieldInput>
}

export type ResourceActionErrorActionPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>
}

export type ResourceActionErrorActionPipelineActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionPipelineActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionErrorActionPipelineActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionErrorActionPipelineActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionErrorActionPipelineActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>
}

export type ResourceActionErrorActionRelationship = {
  __typename?: 'ResourceActionErrorActionRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type ResourceActionErrorActionResourceActionConnectFieldInput = {
  connect?: InputMaybe<ResourceActionConnectInput>
  where?: InputMaybe<ResourceActionConnectWhere>
}

export type ResourceActionErrorActionResourceActionConnectOrCreateFieldInput = {
  onCreate: ResourceActionErrorActionResourceActionConnectOrCreateFieldInputOnCreate
  where: ResourceActionConnectOrCreateWhere
}

export type ResourceActionErrorActionResourceActionConnectOrCreateFieldInputOnCreate =
  {
    node: ResourceActionOnCreateInput
  }

export type ResourceActionErrorActionResourceActionConnectionWhere = {
  AND?: InputMaybe<
    Array<ResourceActionErrorActionResourceActionConnectionWhere>
  >
  OR?: InputMaybe<Array<ResourceActionErrorActionResourceActionConnectionWhere>>
  node?: InputMaybe<ResourceActionWhere>
  node_NOT?: InputMaybe<ResourceActionWhere>
}

export type ResourceActionErrorActionResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput
}

export type ResourceActionErrorActionResourceActionDeleteFieldInput = {
  delete?: InputMaybe<ResourceActionDeleteInput>
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>
}

export type ResourceActionErrorActionResourceActionDisconnectFieldInput = {
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>
}

export type ResourceActionErrorActionResourceActionFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionResourceActionCreateFieldInput>
}

export type ResourceActionErrorActionResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>
}

export type ResourceActionErrorActionResourceActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionErrorActionResourceActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionErrorActionResourceActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionErrorActionResourceActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionErrorActionResourceActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>
}

export type ResourceActionErrorActionUpdateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionUpdateFieldInput>
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionUpdateFieldInput>
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionUpdateFieldInput>
}

export type ResourceActionOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
}

export type ResourceActionOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ResourceActionSort objects to sort ResourceActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceActionSort>>
}

export type ResourceActionPropConfigAggregationSelection = {
  __typename?: 'ResourceActionPropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceActionPropConfigNodeAggregateSelection>
}

export type ResourceActionPropConfigNodeAggregateSelection = {
  __typename?: 'ResourceActionPropConfigNodeAggregateSelection'
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type ResourceActionRelationInput = {
  config?: InputMaybe<ResourceActionConfigCreateFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionCreateFieldInput>
  resource?: InputMaybe<ResourceActionResourceCreateFieldInput>
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionCreateFieldInput>
}

export type ResourceActionResourceAggregateInput = {
  AND?: InputMaybe<Array<ResourceActionResourceAggregateInput>>
  OR?: InputMaybe<Array<ResourceActionResourceAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ResourceActionResourceNodeAggregationWhereInput>
}

export type ResourceActionResourceConnectFieldInput = {
  connect?: InputMaybe<ResourceConnectInput>
  where?: InputMaybe<ResourceConnectWhere>
}

export type ResourceActionResourceConnectOrCreateFieldInput = {
  onCreate: ResourceActionResourceConnectOrCreateFieldInputOnCreate
  where: ResourceConnectOrCreateWhere
}

export type ResourceActionResourceConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput
}

export type ResourceActionResourceConnection = {
  __typename?: 'ResourceActionResourceConnection'
  edges: Array<ResourceActionResourceRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceActionResourceConnectionSort = {
  node?: InputMaybe<ResourceSort>
}

export type ResourceActionResourceConnectionWhere = {
  AND?: InputMaybe<Array<ResourceActionResourceConnectionWhere>>
  OR?: InputMaybe<Array<ResourceActionResourceConnectionWhere>>
  node?: InputMaybe<ResourceWhere>
  node_NOT?: InputMaybe<ResourceWhere>
}

export type ResourceActionResourceCreateFieldInput = {
  node: ResourceCreateInput
}

export type ResourceActionResourceDeleteFieldInput = {
  delete?: InputMaybe<ResourceDeleteInput>
  where?: InputMaybe<ResourceActionResourceConnectionWhere>
}

export type ResourceActionResourceDisconnectFieldInput = {
  disconnect?: InputMaybe<ResourceDisconnectInput>
  where?: InputMaybe<ResourceActionResourceConnectionWhere>
}

export type ResourceActionResourceFieldInput = {
  connect?: InputMaybe<ResourceActionResourceConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionResourceCreateFieldInput>
}

export type ResourceActionResourceNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionResourceNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceActionResourceNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ResourceActionResourceRelationship = {
  __typename?: 'ResourceActionResourceRelationship'
  cursor: Scalars['String']
  node: Resource
}

export type ResourceActionResourceResourceAggregationSelection = {
  __typename?: 'ResourceActionResourceResourceAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceActionResourceResourceNodeAggregateSelection>
}

export type ResourceActionResourceResourceNodeAggregateSelection = {
  __typename?: 'ResourceActionResourceResourceNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ResourceActionResourceUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>
}

export type ResourceActionResourceUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionResourceConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionResourceCreateFieldInput>
  delete?: InputMaybe<ResourceActionResourceDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionResourceDisconnectFieldInput>
  update?: InputMaybe<ResourceActionResourceUpdateConnectionInput>
  where?: InputMaybe<ResourceActionResourceConnectionWhere>
}

/** Fields to sort ResourceActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceActionSort object. */
export type ResourceActionSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  runOnInit?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type ResourceActionStoreAggregateInput = {
  AND?: InputMaybe<Array<ResourceActionStoreAggregateInput>>
  OR?: InputMaybe<Array<ResourceActionStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ResourceActionStoreNodeAggregationWhereInput>
}

export type ResourceActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ResourceActionStoreStoreAggregationSelection = {
  __typename?: 'ResourceActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceActionStoreStoreNodeAggregateSelection>
}

export type ResourceActionStoreStoreNodeAggregateSelection = {
  __typename?: 'ResourceActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ResourceActionSuccessActionConnectInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>
}

export type ResourceActionSuccessActionConnectOrCreateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>
}

export type ResourceActionSuccessActionConnection = {
  __typename?: 'ResourceActionSuccessActionConnection'
  edges: Array<ResourceActionSuccessActionRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceActionSuccessActionConnectionWhere = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>
}

export type ResourceActionSuccessActionCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<ResourceActionSuccessActionCustomActionCreateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionCreateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionCreateFieldInput>
  >
}

export type ResourceActionSuccessActionCreateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionFieldInput>
}

export type ResourceActionSuccessActionCustomActionConnectFieldInput = {
  connect?: InputMaybe<CustomActionConnectInput>
  where?: InputMaybe<CustomActionConnectWhere>
}

export type ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput = {
  onCreate: ResourceActionSuccessActionCustomActionConnectOrCreateFieldInputOnCreate
  where: CustomActionConnectOrCreateWhere
}

export type ResourceActionSuccessActionCustomActionConnectOrCreateFieldInputOnCreate =
  {
    node: CustomActionOnCreateInput
  }

export type ResourceActionSuccessActionCustomActionConnectionWhere = {
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionCustomActionConnectionWhere>
  >
  OR?: InputMaybe<Array<ResourceActionSuccessActionCustomActionConnectionWhere>>
  node?: InputMaybe<CustomActionWhere>
  node_NOT?: InputMaybe<CustomActionWhere>
}

export type ResourceActionSuccessActionCustomActionCreateFieldInput = {
  node: CustomActionCreateInput
}

export type ResourceActionSuccessActionCustomActionDeleteFieldInput = {
  delete?: InputMaybe<CustomActionDeleteInput>
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>
}

export type ResourceActionSuccessActionCustomActionDisconnectFieldInput = {
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>
}

export type ResourceActionSuccessActionCustomActionFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionCustomActionCreateFieldInput>
}

export type ResourceActionSuccessActionCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>
}

export type ResourceActionSuccessActionCustomActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionCustomActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionSuccessActionCustomActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionSuccessActionCustomActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionSuccessActionCustomActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>
}

export type ResourceActionSuccessActionDeleteInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionDeleteFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionDeleteFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionDeleteFieldInput>
}

export type ResourceActionSuccessActionDisconnectInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionDisconnectFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionDisconnectFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionDisconnectFieldInput>
}

export type ResourceActionSuccessActionPipelineActionConnectFieldInput = {
  connect?: InputMaybe<PipelineActionConnectInput>
  where?: InputMaybe<PipelineActionConnectWhere>
}

export type ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput =
  {
    onCreate: ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInputOnCreate
    where: PipelineActionConnectOrCreateWhere
  }

export type ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    node: PipelineActionOnCreateInput
  }

export type ResourceActionSuccessActionPipelineActionConnectionWhere = {
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionConnectionWhere>
  >
  OR?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionConnectionWhere>
  >
  node?: InputMaybe<PipelineActionWhere>
  node_NOT?: InputMaybe<PipelineActionWhere>
}

export type ResourceActionSuccessActionPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput
}

export type ResourceActionSuccessActionPipelineActionDeleteFieldInput = {
  delete?: InputMaybe<PipelineActionDeleteInput>
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>
}

export type ResourceActionSuccessActionPipelineActionDisconnectFieldInput = {
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>
}

export type ResourceActionSuccessActionPipelineActionFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionPipelineActionCreateFieldInput>
}

export type ResourceActionSuccessActionPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>
}

export type ResourceActionSuccessActionPipelineActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionPipelineActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionSuccessActionPipelineActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionSuccessActionPipelineActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionSuccessActionPipelineActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>
}

export type ResourceActionSuccessActionRelationship = {
  __typename?: 'ResourceActionSuccessActionRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type ResourceActionSuccessActionResourceActionConnectFieldInput = {
  connect?: InputMaybe<ResourceActionConnectInput>
  where?: InputMaybe<ResourceActionConnectWhere>
}

export type ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput =
  {
    onCreate: ResourceActionSuccessActionResourceActionConnectOrCreateFieldInputOnCreate
    where: ResourceActionConnectOrCreateWhere
  }

export type ResourceActionSuccessActionResourceActionConnectOrCreateFieldInputOnCreate =
  {
    node: ResourceActionOnCreateInput
  }

export type ResourceActionSuccessActionResourceActionConnectionWhere = {
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionConnectionWhere>
  >
  OR?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionConnectionWhere>
  >
  node?: InputMaybe<ResourceActionWhere>
  node_NOT?: InputMaybe<ResourceActionWhere>
}

export type ResourceActionSuccessActionResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput
}

export type ResourceActionSuccessActionResourceActionDeleteFieldInput = {
  delete?: InputMaybe<ResourceActionDeleteInput>
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>
}

export type ResourceActionSuccessActionResourceActionDisconnectFieldInput = {
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>
}

export type ResourceActionSuccessActionResourceActionFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionResourceActionCreateFieldInput>
}

export type ResourceActionSuccessActionResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>
}

export type ResourceActionSuccessActionResourceActionUpdateFieldInput = {
  connect?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceActionSuccessActionResourceActionCreateFieldInput>
  delete?: InputMaybe<ResourceActionSuccessActionResourceActionDeleteFieldInput>
  disconnect?: InputMaybe<ResourceActionSuccessActionResourceActionDisconnectFieldInput>
  update?: InputMaybe<ResourceActionSuccessActionResourceActionUpdateConnectionInput>
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>
}

export type ResourceActionSuccessActionUpdateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionUpdateFieldInput>
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionUpdateFieldInput>
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionUpdateFieldInput>
}

export type ResourceActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ResourceActionUpdateInput = {
  config?: InputMaybe<ResourceActionConfigUpdateFieldInput>
  errorAction?: InputMaybe<ResourceActionErrorActionUpdateInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  resource?: InputMaybe<ResourceActionResourceUpdateFieldInput>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>
  successAction?: InputMaybe<ResourceActionSuccessActionUpdateInput>
}

export type ResourceActionWhere = {
  AND?: InputMaybe<Array<ResourceActionWhere>>
  OR?: InputMaybe<Array<ResourceActionWhere>>
  config?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<ResourceActionConfigAggregateInput>
  configConnection?: InputMaybe<ResourceActionConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<ResourceActionConfigConnectionWhere>
  config_NOT?: InputMaybe<PropWhere>
  errorActionConnection?: InputMaybe<ResourceActionErrorActionConnectionWhere>
  errorActionConnection_NOT?: InputMaybe<ResourceActionErrorActionConnectionWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  resource?: InputMaybe<ResourceWhere>
  resourceAggregate?: InputMaybe<ResourceActionResourceAggregateInput>
  resourceConnection?: InputMaybe<ResourceActionResourceConnectionWhere>
  resourceConnection_NOT?: InputMaybe<ResourceActionResourceConnectionWhere>
  resource_NOT?: InputMaybe<ResourceWhere>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  runOnInit_NOT?: InputMaybe<Scalars['Boolean']>
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<ResourceActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
  successActionConnection?: InputMaybe<ResourceActionSuccessActionConnectionWhere>
  successActionConnection_NOT?: InputMaybe<ResourceActionSuccessActionConnectionWhere>
  type?: InputMaybe<ActionKind>
  type_IN?: InputMaybe<Array<ActionKind>>
  type_NOT?: InputMaybe<ActionKind>
  type_NOT_IN?: InputMaybe<Array<ActionKind>>
}

export type ResourceActionsConnection = {
  __typename?: 'ResourceActionsConnection'
  edges: Array<ResourceActionEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceAggregateSelection = {
  __typename?: 'ResourceAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ResourceConfigAggregateInput = {
  AND?: InputMaybe<Array<ResourceConfigAggregateInput>>
  OR?: InputMaybe<Array<ResourceConfigAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ResourceConfigNodeAggregationWhereInput>
}

export type ResourceConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type ResourceConfigConnectOrCreateFieldInput = {
  onCreate: ResourceConfigConnectOrCreateFieldInputOnCreate
  where: PropConnectOrCreateWhere
}

export type ResourceConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type ResourceConfigConnection = {
  __typename?: 'ResourceConfigConnection'
  edges: Array<ResourceConfigRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResourceConfigConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type ResourceConfigConnectionWhere = {
  AND?: InputMaybe<Array<ResourceConfigConnectionWhere>>
  OR?: InputMaybe<Array<ResourceConfigConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type ResourceConfigCreateFieldInput = {
  node: PropCreateInput
}

export type ResourceConfigDeleteFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>
}

export type ResourceConfigDisconnectFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>
}

export type ResourceConfigFieldInput = {
  connect?: InputMaybe<ResourceConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceConfigCreateFieldInput>
}

export type ResourceConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type ResourceConfigRelationship = {
  __typename?: 'ResourceConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ResourceConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ResourceConfigUpdateFieldInput = {
  connect?: InputMaybe<ResourceConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>
  create?: InputMaybe<ResourceConfigCreateFieldInput>
  delete?: InputMaybe<ResourceConfigDeleteFieldInput>
  disconnect?: InputMaybe<ResourceConfigDisconnectFieldInput>
  update?: InputMaybe<ResourceConfigUpdateConnectionInput>
  where?: InputMaybe<ResourceConfigConnectionWhere>
}

export type ResourceConnectInput = {
  config?: InputMaybe<ResourceConfigConnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>
}

export type ResourceConnectOrCreateInput = {
  config?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
}

export type ResourceConnectOrCreateWhere = {
  node: ResourceUniqueWhere
}

export type ResourceConnectWhere = {
  node: ResourceWhere
}

export type ResourceCreateInput = {
  config?: InputMaybe<ResourceConfigFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
  type: ResourceType
}

export type ResourceDeleteInput = {
  config?: InputMaybe<ResourceConfigDeleteFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
}

export type ResourceDisconnectInput = {
  config?: InputMaybe<ResourceConfigDisconnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
}

export type ResourceEdge = {
  __typename?: 'ResourceEdge'
  cursor: Scalars['String']
  node: Resource
}

export type ResourceOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ResourceOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>
}

export type ResourceOwnerAggregateInput = {
  AND?: InputMaybe<Array<ResourceOwnerAggregateInput>>
  OR?: InputMaybe<Array<ResourceOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ResourceOwnerNodeAggregationWhereInput>
}

export type ResourceOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ResourcePropConfigAggregationSelection = {
  __typename?: 'ResourcePropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourcePropConfigNodeAggregateSelection>
}

export type ResourcePropConfigNodeAggregateSelection = {
  __typename?: 'ResourcePropConfigNodeAggregateSelection'
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type ResourceRelationInput = {
  config?: InputMaybe<ResourceConfigCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>
}

/** Fields to sort Resources by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceSort object. */
export type ResourceSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export type ResourceUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ResourceUpdateInput = {
  config?: InputMaybe<ResourceConfigUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
  type?: InputMaybe<ResourceType>
}

export type ResourceUserOwnerAggregationSelection = {
  __typename?: 'ResourceUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceUserOwnerNodeAggregateSelection>
}

export type ResourceUserOwnerNodeAggregateSelection = {
  __typename?: 'ResourceUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ResourceWhere = {
  AND?: InputMaybe<Array<ResourceWhere>>
  OR?: InputMaybe<Array<ResourceWhere>>
  config?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<ResourceConfigAggregateInput>
  configConnection?: InputMaybe<ResourceConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<ResourceConfigConnectionWhere>
  config_NOT?: InputMaybe<PropWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ResourceOwnerAggregateInput>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  type?: InputMaybe<ResourceType>
  type_IN?: InputMaybe<Array<ResourceType>>
  type_NOT?: InputMaybe<ResourceType>
  type_NOT_IN?: InputMaybe<Array<ResourceType>>
}

export type ResourcesConnection = {
  __typename?: 'ResourcesConnection'
  edges: Array<ResourceEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  ASC = 'ASC',
  /** Sort by field values in descending order. */
  DESC = 'DESC',
}

export type Store = {
  __typename?: 'Store'
  actions: Array<AnyAction>
  actionsConnection: StoreActionsConnection
  app: App
  appAggregate?: Maybe<StoreAppAppAggregationSelection>
  appConnection: StoreAppConnection
  id: Scalars['ID']
  name: Scalars['String']
  state: Prop
  stateAggregate?: Maybe<StorePropStateAggregationSelection>
  stateApi: InterfaceType
  stateApiAggregate?: Maybe<StoreInterfaceTypeStateApiAggregationSelection>
  stateApiConnection: StoreStateApiConnection
  stateConnection: StoreStateConnection
}

export type StoreActionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
}

export type StoreActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<StoreActionsConnectionWhere>
}

export type StoreAppArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type StoreAppAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AppWhere>
}

export type StoreAppConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreAppConnectionSort>>
  where?: InputMaybe<StoreAppConnectionWhere>
}

export type StoreStateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type StoreStateAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<PropWhere>
}

export type StoreStateApiArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateApiAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateApiConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreStateApiConnectionSort>>
  where?: InputMaybe<StoreStateApiConnectionWhere>
}

export type StoreStateConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreStateConnectionSort>>
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreActionsConnectInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionConnectFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionConnectFieldInput>
  >
}

export type StoreActionsConnectOrCreateInput = {
  CustomAction?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >
}

export type StoreActionsConnection = {
  __typename?: 'StoreActionsConnection'
  edges: Array<StoreActionsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type StoreActionsConnectionWhere = {
  CustomAction?: InputMaybe<StoreActionsCustomActionConnectionWhere>
  PipelineAction?: InputMaybe<StoreActionsPipelineActionConnectionWhere>
  ResourceAction?: InputMaybe<StoreActionsResourceActionConnectionWhere>
}

export type StoreActionsCreateFieldInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>
  PipelineAction?: InputMaybe<Array<StoreActionsPipelineActionCreateFieldInput>>
  ResourceAction?: InputMaybe<Array<StoreActionsResourceActionCreateFieldInput>>
}

export type StoreActionsCreateInput = {
  CustomAction?: InputMaybe<StoreActionsCustomActionFieldInput>
  PipelineAction?: InputMaybe<StoreActionsPipelineActionFieldInput>
  ResourceAction?: InputMaybe<StoreActionsResourceActionFieldInput>
}

export type StoreActionsCustomActionConnectFieldInput = {
  connect?: InputMaybe<Array<CustomActionConnectInput>>
  where?: InputMaybe<CustomActionConnectWhere>
}

export type StoreActionsCustomActionConnectOrCreateFieldInput = {
  onCreate: StoreActionsCustomActionConnectOrCreateFieldInputOnCreate
  where: CustomActionConnectOrCreateWhere
}

export type StoreActionsCustomActionConnectOrCreateFieldInputOnCreate = {
  node: CustomActionOnCreateInput
}

export type StoreActionsCustomActionConnectionWhere = {
  AND?: InputMaybe<Array<StoreActionsCustomActionConnectionWhere>>
  OR?: InputMaybe<Array<StoreActionsCustomActionConnectionWhere>>
  node?: InputMaybe<CustomActionWhere>
  node_NOT?: InputMaybe<CustomActionWhere>
}

export type StoreActionsCustomActionCreateFieldInput = {
  node: CustomActionCreateInput
}

export type StoreActionsCustomActionDeleteFieldInput = {
  delete?: InputMaybe<CustomActionDeleteInput>
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>
}

export type StoreActionsCustomActionDisconnectFieldInput = {
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>
}

export type StoreActionsCustomActionFieldInput = {
  connect?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>
}

export type StoreActionsCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>
}

export type StoreActionsCustomActionUpdateFieldInput = {
  connect?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsCustomActionDeleteFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsCustomActionDisconnectFieldInput>>
  update?: InputMaybe<StoreActionsCustomActionUpdateConnectionInput>
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>
}

export type StoreActionsDeleteInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionDeleteFieldInput>>
  PipelineAction?: InputMaybe<Array<StoreActionsPipelineActionDeleteFieldInput>>
  ResourceAction?: InputMaybe<Array<StoreActionsResourceActionDeleteFieldInput>>
}

export type StoreActionsDisconnectInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionDisconnectFieldInput>>
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionDisconnectFieldInput>
  >
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionDisconnectFieldInput>
  >
}

export type StoreActionsPipelineActionConnectFieldInput = {
  connect?: InputMaybe<Array<PipelineActionConnectInput>>
  where?: InputMaybe<PipelineActionConnectWhere>
}

export type StoreActionsPipelineActionConnectOrCreateFieldInput = {
  onCreate: StoreActionsPipelineActionConnectOrCreateFieldInputOnCreate
  where: PipelineActionConnectOrCreateWhere
}

export type StoreActionsPipelineActionConnectOrCreateFieldInputOnCreate = {
  node: PipelineActionOnCreateInput
}

export type StoreActionsPipelineActionConnectionWhere = {
  AND?: InputMaybe<Array<StoreActionsPipelineActionConnectionWhere>>
  OR?: InputMaybe<Array<StoreActionsPipelineActionConnectionWhere>>
  node?: InputMaybe<PipelineActionWhere>
  node_NOT?: InputMaybe<PipelineActionWhere>
}

export type StoreActionsPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput
}

export type StoreActionsPipelineActionDeleteFieldInput = {
  delete?: InputMaybe<PipelineActionDeleteInput>
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>
}

export type StoreActionsPipelineActionDisconnectFieldInput = {
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>
}

export type StoreActionsPipelineActionFieldInput = {
  connect?: InputMaybe<Array<StoreActionsPipelineActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsPipelineActionCreateFieldInput>>
}

export type StoreActionsPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>
}

export type StoreActionsPipelineActionUpdateFieldInput = {
  connect?: InputMaybe<Array<StoreActionsPipelineActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsPipelineActionCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsPipelineActionDeleteFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsPipelineActionDisconnectFieldInput>>
  update?: InputMaybe<StoreActionsPipelineActionUpdateConnectionInput>
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>
}

export type StoreActionsRelationship = {
  __typename?: 'StoreActionsRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type StoreActionsResourceActionConnectFieldInput = {
  connect?: InputMaybe<Array<ResourceActionConnectInput>>
  where?: InputMaybe<ResourceActionConnectWhere>
}

export type StoreActionsResourceActionConnectOrCreateFieldInput = {
  onCreate: StoreActionsResourceActionConnectOrCreateFieldInputOnCreate
  where: ResourceActionConnectOrCreateWhere
}

export type StoreActionsResourceActionConnectOrCreateFieldInputOnCreate = {
  node: ResourceActionOnCreateInput
}

export type StoreActionsResourceActionConnectionWhere = {
  AND?: InputMaybe<Array<StoreActionsResourceActionConnectionWhere>>
  OR?: InputMaybe<Array<StoreActionsResourceActionConnectionWhere>>
  node?: InputMaybe<ResourceActionWhere>
  node_NOT?: InputMaybe<ResourceActionWhere>
}

export type StoreActionsResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput
}

export type StoreActionsResourceActionDeleteFieldInput = {
  delete?: InputMaybe<ResourceActionDeleteInput>
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>
}

export type StoreActionsResourceActionDisconnectFieldInput = {
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>
}

export type StoreActionsResourceActionFieldInput = {
  connect?: InputMaybe<Array<StoreActionsResourceActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsResourceActionCreateFieldInput>>
}

export type StoreActionsResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>
}

export type StoreActionsResourceActionUpdateFieldInput = {
  connect?: InputMaybe<Array<StoreActionsResourceActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >
  create?: InputMaybe<Array<StoreActionsResourceActionCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsResourceActionDeleteFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsResourceActionDisconnectFieldInput>>
  update?: InputMaybe<StoreActionsResourceActionUpdateConnectionInput>
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>
}

export type StoreActionsUpdateInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionUpdateFieldInput>>
  PipelineAction?: InputMaybe<Array<StoreActionsPipelineActionUpdateFieldInput>>
  ResourceAction?: InputMaybe<Array<StoreActionsResourceActionUpdateFieldInput>>
}

export type StoreAggregateSelection = {
  __typename?: 'StoreAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreAppAggregateInput = {
  AND?: InputMaybe<Array<StoreAppAggregateInput>>
  OR?: InputMaybe<Array<StoreAppAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<StoreAppNodeAggregationWhereInput>
}

export type StoreAppAppAggregationSelection = {
  __typename?: 'StoreAppAppAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreAppAppNodeAggregateSelection>
}

export type StoreAppAppNodeAggregateSelection = {
  __typename?: 'StoreAppAppNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type StoreAppConnectFieldInput = {
  connect?: InputMaybe<AppConnectInput>
  where?: InputMaybe<AppConnectWhere>
}

export type StoreAppConnectOrCreateFieldInput = {
  onCreate: StoreAppConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type StoreAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type StoreAppConnection = {
  __typename?: 'StoreAppConnection'
  edges: Array<StoreAppRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type StoreAppConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type StoreAppConnectionWhere = {
  AND?: InputMaybe<Array<StoreAppConnectionWhere>>
  OR?: InputMaybe<Array<StoreAppConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type StoreAppCreateFieldInput = {
  node: AppCreateInput
}

export type StoreAppDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<StoreAppConnectionWhere>
}

export type StoreAppDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<StoreAppConnectionWhere>
}

export type StoreAppFieldInput = {
  connect?: InputMaybe<StoreAppConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>
  create?: InputMaybe<StoreAppCreateFieldInput>
}

export type StoreAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreAppRelationship = {
  __typename?: 'StoreAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type StoreAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type StoreAppUpdateFieldInput = {
  connect?: InputMaybe<StoreAppConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>
  create?: InputMaybe<StoreAppCreateFieldInput>
  delete?: InputMaybe<StoreAppDeleteFieldInput>
  disconnect?: InputMaybe<StoreAppDisconnectFieldInput>
  update?: InputMaybe<StoreAppUpdateConnectionInput>
  where?: InputMaybe<StoreAppConnectionWhere>
}

export type StoreConnectInput = {
  actions?: InputMaybe<StoreActionsConnectInput>
  app?: InputMaybe<StoreAppConnectFieldInput>
  state?: InputMaybe<StoreStateConnectFieldInput>
  stateApi?: InputMaybe<StoreStateApiConnectFieldInput>
}

export type StoreConnectOrCreateInput = {
  actions?: InputMaybe<StoreActionsConnectOrCreateInput>
  app?: InputMaybe<StoreAppConnectOrCreateFieldInput>
  state?: InputMaybe<StoreStateConnectOrCreateFieldInput>
  stateApi?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>
}

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere
}

export type StoreConnectWhere = {
  node: StoreWhere
}

export type StoreCreateInput = {
  actions?: InputMaybe<StoreActionsCreateInput>
  app?: InputMaybe<StoreAppFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  state?: InputMaybe<StoreStateFieldInput>
  stateApi?: InputMaybe<StoreStateApiFieldInput>
}

export type StoreDeleteInput = {
  actions?: InputMaybe<StoreActionsDeleteInput>
  app?: InputMaybe<StoreAppDeleteFieldInput>
  state?: InputMaybe<StoreStateDeleteFieldInput>
  stateApi?: InputMaybe<StoreStateApiDeleteFieldInput>
}

export type StoreDisconnectInput = {
  actions?: InputMaybe<StoreActionsDisconnectInput>
  app?: InputMaybe<StoreAppDisconnectFieldInput>
  state?: InputMaybe<StoreStateDisconnectFieldInput>
  stateApi?: InputMaybe<StoreStateApiDisconnectFieldInput>
}

export type StoreEdge = {
  __typename?: 'StoreEdge'
  cursor: Scalars['String']
  node: Store
}

export type StoreInterfaceTypeStateApiAggregationSelection = {
  __typename?: 'StoreInterfaceTypeStateApiAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreInterfaceTypeStateApiNodeAggregateSelection>
}

export type StoreInterfaceTypeStateApiNodeAggregateSelection = {
  __typename?: 'StoreInterfaceTypeStateApiNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type StoreOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>
}

export type StorePropStateAggregationSelection = {
  __typename?: 'StorePropStateAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StorePropStateNodeAggregateSelection>
}

export type StorePropStateNodeAggregateSelection = {
  __typename?: 'StorePropStateNodeAggregateSelection'
  data: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type StoreRelationInput = {
  actions?: InputMaybe<StoreActionsCreateFieldInput>
  app?: InputMaybe<StoreAppCreateFieldInput>
  state?: InputMaybe<StoreStateCreateFieldInput>
  stateApi?: InputMaybe<StoreStateApiCreateFieldInput>
}

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type StoreStateAggregateInput = {
  AND?: InputMaybe<Array<StoreStateAggregateInput>>
  OR?: InputMaybe<Array<StoreStateAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<StoreStateNodeAggregationWhereInput>
}

export type StoreStateApiAggregateInput = {
  AND?: InputMaybe<Array<StoreStateApiAggregateInput>>
  OR?: InputMaybe<Array<StoreStateApiAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<StoreStateApiNodeAggregationWhereInput>
}

export type StoreStateApiConnectFieldInput = {
  connect?: InputMaybe<InterfaceTypeConnectInput>
  where?: InputMaybe<InterfaceTypeConnectWhere>
}

export type StoreStateApiConnectOrCreateFieldInput = {
  onCreate: StoreStateApiConnectOrCreateFieldInputOnCreate
  where: InterfaceTypeConnectOrCreateWhere
}

export type StoreStateApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type StoreStateApiConnection = {
  __typename?: 'StoreStateApiConnection'
  edges: Array<StoreStateApiRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type StoreStateApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type StoreStateApiConnectionWhere = {
  AND?: InputMaybe<Array<StoreStateApiConnectionWhere>>
  OR?: InputMaybe<Array<StoreStateApiConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type StoreStateApiDeleteFieldInput = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<StoreStateApiConnectionWhere>
}

export type StoreStateApiDisconnectFieldInput = {
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  where?: InputMaybe<StoreStateApiConnectionWhere>
}

export type StoreStateApiFieldInput = {
  connect?: InputMaybe<StoreStateApiConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>
  create?: InputMaybe<StoreStateApiCreateFieldInput>
}

export type StoreStateApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreStateApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreStateApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreStateApiRelationship = {
  __typename?: 'StoreStateApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type StoreStateApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type StoreStateApiUpdateFieldInput = {
  connect?: InputMaybe<StoreStateApiConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>
  create?: InputMaybe<StoreStateApiCreateFieldInput>
  delete?: InputMaybe<StoreStateApiDeleteFieldInput>
  disconnect?: InputMaybe<StoreStateApiDisconnectFieldInput>
  update?: InputMaybe<StoreStateApiUpdateConnectionInput>
  where?: InputMaybe<StoreStateApiConnectionWhere>
}

export type StoreStateConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type StoreStateConnectOrCreateFieldInput = {
  onCreate: StoreStateConnectOrCreateFieldInputOnCreate
  where: PropConnectOrCreateWhere
}

export type StoreStateConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type StoreStateConnection = {
  __typename?: 'StoreStateConnection'
  edges: Array<StoreStateRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type StoreStateConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type StoreStateConnectionWhere = {
  AND?: InputMaybe<Array<StoreStateConnectionWhere>>
  OR?: InputMaybe<Array<StoreStateConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type StoreStateCreateFieldInput = {
  node: PropCreateInput
}

export type StoreStateDeleteFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreStateDisconnectFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreStateFieldInput = {
  connect?: InputMaybe<StoreStateConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>
  create?: InputMaybe<StoreStateCreateFieldInput>
}

export type StoreStateNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type StoreStateRelationship = {
  __typename?: 'StoreStateRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type StoreStateUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type StoreStateUpdateFieldInput = {
  connect?: InputMaybe<StoreStateConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>
  create?: InputMaybe<StoreStateCreateFieldInput>
  delete?: InputMaybe<StoreStateDeleteFieldInput>
  disconnect?: InputMaybe<StoreStateDisconnectFieldInput>
  update?: InputMaybe<StoreStateUpdateConnectionInput>
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type StoreUpdateInput = {
  actions?: InputMaybe<StoreActionsUpdateInput>
  app?: InputMaybe<StoreAppUpdateFieldInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  state?: InputMaybe<StoreStateUpdateFieldInput>
  stateApi?: InputMaybe<StoreStateApiUpdateFieldInput>
}

export type StoreWhere = {
  AND?: InputMaybe<Array<StoreWhere>>
  OR?: InputMaybe<Array<StoreWhere>>
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>
  app?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<StoreAppAggregateInput>
  appConnection?: InputMaybe<StoreAppConnectionWhere>
  appConnection_NOT?: InputMaybe<StoreAppConnectionWhere>
  app_NOT?: InputMaybe<AppWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  state?: InputMaybe<PropWhere>
  stateAggregate?: InputMaybe<StoreStateAggregateInput>
  stateApi?: InputMaybe<InterfaceTypeWhere>
  stateApiAggregate?: InputMaybe<StoreStateApiAggregateInput>
  stateApiConnection?: InputMaybe<StoreStateApiConnectionWhere>
  stateApiConnection_NOT?: InputMaybe<StoreStateApiConnectionWhere>
  stateApi_NOT?: InputMaybe<InterfaceTypeWhere>
  stateConnection?: InputMaybe<StoreStateConnectionWhere>
  stateConnection_NOT?: InputMaybe<StoreStateConnectionWhere>
  state_NOT?: InputMaybe<PropWhere>
}

export type StoresConnection = {
  __typename?: 'StoresConnection'
  edges: Array<StoreEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type StringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable'
  longest: Scalars['String']
  shortest: Scalars['String']
}

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable'
  longest?: Maybe<Scalars['String']>
  shortest?: Maybe<Scalars['String']>
}

export type Tag = {
  __typename?: 'Tag'
  children: Array<Tag>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  childrenConnection: TagChildrenConnection
  id: Scalars['ID']
  isRoot?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<TagUserOwnerAggregationSelection>
  ownerConnection: TagOwnerConnection
  parent?: Maybe<Tag>
  parentAggregate?: Maybe<TagTagParentAggregationSelection>
  parentConnection: TagParentConnection
}

export type TagChildrenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type TagChildrenAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<TagWhere>
}

export type TagChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TagChildrenConnectionSort>>
  where?: InputMaybe<TagChildrenConnectionWhere>
}

export type TagOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type TagOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

export type TagOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TagOwnerConnectionSort>>
  where?: InputMaybe<TagOwnerConnectionWhere>
}

export type TagParentArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type TagParentAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<TagWhere>
}

export type TagParentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TagParentConnectionSort>>
  where?: InputMaybe<TagParentConnectionWhere>
}

export type TagAggregateSelection = {
  __typename?: 'TagAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagChildrenAggregateInput = {
  AND?: InputMaybe<Array<TagChildrenAggregateInput>>
  OR?: InputMaybe<Array<TagChildrenAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<TagChildrenNodeAggregationWhereInput>
}

export type TagChildrenConnectFieldInput = {
  connect?: InputMaybe<Array<TagConnectInput>>
  where?: InputMaybe<TagConnectWhere>
}

export type TagChildrenConnectOrCreateFieldInput = {
  onCreate: TagChildrenConnectOrCreateFieldInputOnCreate
  where: TagConnectOrCreateWhere
}

export type TagChildrenConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type TagChildrenConnection = {
  __typename?: 'TagChildrenConnection'
  edges: Array<TagChildrenRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TagChildrenConnectionSort = {
  node?: InputMaybe<TagSort>
}

export type TagChildrenConnectionWhere = {
  AND?: InputMaybe<Array<TagChildrenConnectionWhere>>
  OR?: InputMaybe<Array<TagChildrenConnectionWhere>>
  node?: InputMaybe<TagWhere>
  node_NOT?: InputMaybe<TagWhere>
}

export type TagChildrenCreateFieldInput = {
  node: TagCreateInput
}

export type TagChildrenDeleteFieldInput = {
  delete?: InputMaybe<TagDeleteInput>
  where?: InputMaybe<TagChildrenConnectionWhere>
}

export type TagChildrenDisconnectFieldInput = {
  disconnect?: InputMaybe<TagDisconnectInput>
  where?: InputMaybe<TagChildrenConnectionWhere>
}

export type TagChildrenFieldInput = {
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>
}

export type TagChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagChildrenRelationship = {
  __typename?: 'TagChildrenRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagChildrenUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type TagChildrenUpdateFieldInput = {
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
  disconnect?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
  update?: InputMaybe<TagChildrenUpdateConnectionInput>
  where?: InputMaybe<TagChildrenConnectionWhere>
}

export type TagConnectInput = {
  children?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  owner?: InputMaybe<TagOwnerConnectFieldInput>
  parent?: InputMaybe<TagParentConnectFieldInput>
}

export type TagConnectOrCreateInput = {
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
  owner?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
  parent?: InputMaybe<TagParentConnectOrCreateFieldInput>
}

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere
}

export type TagConnectWhere = {
  node: TagWhere
}

export type TagCreateInput = {
  children?: InputMaybe<TagChildrenFieldInput>
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TagOwnerFieldInput>
  parent?: InputMaybe<TagParentFieldInput>
}

export type TagDeleteInput = {
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
  owner?: InputMaybe<TagOwnerDeleteFieldInput>
  parent?: InputMaybe<TagParentDeleteFieldInput>
}

export type TagDisconnectInput = {
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
  owner?: InputMaybe<TagOwnerDisconnectFieldInput>
  parent?: InputMaybe<TagParentDisconnectFieldInput>
}

export type TagEdge = {
  __typename?: 'TagEdge'
  cursor: Scalars['String']
  node: Tag
}

export type TagGraph = {
  __typename?: 'TagGraph'
  descendants: Array<Scalars['ID']>
  id: Scalars['ID']
  isRoot: Scalars['Boolean']
  name: Scalars['String']
}

export type TagGraphOptions = {
  __typename?: 'TagGraphOptions'
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsAggregateSelection = {
  __typename?: 'TagGraphOptionsAggregateSelection'
  count: Scalars['Int']
  limit: IntAggregateSelectionNullable
  sort: IntAggregateSelectionNullable
}

export type TagGraphOptionsConnection = {
  __typename?: 'TagGraphOptionsConnection'
  edges: Array<TagGraphOptionsEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TagGraphOptionsCreateInput = {
  limit?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Scalars['Int']>
}

export type TagGraphOptionsEdge = {
  __typename?: 'TagGraphOptionsEdge'
  cursor: Scalars['String']
  node: TagGraphOptions
}

export type TagGraphOptionsOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TagGraphOptionsSort objects to sort TagGraphOptions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagGraphOptionsSort>>
}

/** Fields to sort TagGraphOptions by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagGraphOptionsSort object. */
export type TagGraphOptionsSort = {
  limit?: InputMaybe<SortDirection>
  sort?: InputMaybe<SortDirection>
}

export type TagGraphOptionsUpdateInput = {
  limit?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Scalars['Int']>
}

export type TagGraphOptionsWhere = {
  AND?: InputMaybe<Array<TagGraphOptionsWhere>>
  OR?: InputMaybe<Array<TagGraphOptionsWhere>>
  limit?: InputMaybe<Scalars['Int']>
  limit_GT?: InputMaybe<Scalars['Int']>
  limit_GTE?: InputMaybe<Scalars['Int']>
  limit_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  limit_LT?: InputMaybe<Scalars['Int']>
  limit_LTE?: InputMaybe<Scalars['Int']>
  limit_NOT?: InputMaybe<Scalars['Int']>
  limit_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  sort?: InputMaybe<Scalars['Int']>
  sort_GT?: InputMaybe<Scalars['Int']>
  sort_GTE?: InputMaybe<Scalars['Int']>
  sort_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  sort_LT?: InputMaybe<Scalars['Int']>
  sort_LTE?: InputMaybe<Scalars['Int']>
  sort_NOT?: InputMaybe<Scalars['Int']>
  sort_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
}

export type TagOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type TagOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>
}

export type TagOwnerAggregateInput = {
  AND?: InputMaybe<Array<TagOwnerAggregateInput>>
  OR?: InputMaybe<Array<TagOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<TagOwnerNodeAggregationWhereInput>
}

export type TagOwnerConnectFieldInput = {
  connect?: InputMaybe<UserConnectInput>
  where?: InputMaybe<UserConnectWhere>
}

export type TagOwnerConnectOrCreateFieldInput = {
  onCreate: TagOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type TagOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type TagOwnerConnection = {
  __typename?: 'TagOwnerConnection'
  edges: Array<TagOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TagOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type TagOwnerConnectionWhere = {
  AND?: InputMaybe<Array<TagOwnerConnectionWhere>>
  OR?: InputMaybe<Array<TagOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type TagOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type TagOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<TagOwnerConnectionWhere>
}

export type TagOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<TagOwnerConnectionWhere>
}

export type TagOwnerFieldInput = {
  connect?: InputMaybe<TagOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<TagOwnerCreateFieldInput>
}

export type TagOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagOwnerRelationship = {
  __typename?: 'TagOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type TagOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type TagOwnerUpdateFieldInput = {
  connect?: InputMaybe<TagOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<TagOwnerCreateFieldInput>
  delete?: InputMaybe<TagOwnerDeleteFieldInput>
  disconnect?: InputMaybe<TagOwnerDisconnectFieldInput>
  update?: InputMaybe<TagOwnerUpdateConnectionInput>
  where?: InputMaybe<TagOwnerConnectionWhere>
}

export type TagParentAggregateInput = {
  AND?: InputMaybe<Array<TagParentAggregateInput>>
  OR?: InputMaybe<Array<TagParentAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<TagParentNodeAggregationWhereInput>
}

export type TagParentConnectFieldInput = {
  connect?: InputMaybe<TagConnectInput>
  where?: InputMaybe<TagConnectWhere>
}

export type TagParentConnectOrCreateFieldInput = {
  onCreate: TagParentConnectOrCreateFieldInputOnCreate
  where: TagConnectOrCreateWhere
}

export type TagParentConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type TagParentConnection = {
  __typename?: 'TagParentConnection'
  edges: Array<TagParentRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TagParentConnectionSort = {
  node?: InputMaybe<TagSort>
}

export type TagParentConnectionWhere = {
  AND?: InputMaybe<Array<TagParentConnectionWhere>>
  OR?: InputMaybe<Array<TagParentConnectionWhere>>
  node?: InputMaybe<TagWhere>
  node_NOT?: InputMaybe<TagWhere>
}

export type TagParentCreateFieldInput = {
  node: TagCreateInput
}

export type TagParentDeleteFieldInput = {
  delete?: InputMaybe<TagDeleteInput>
  where?: InputMaybe<TagParentConnectionWhere>
}

export type TagParentDisconnectFieldInput = {
  disconnect?: InputMaybe<TagDisconnectInput>
  where?: InputMaybe<TagParentConnectionWhere>
}

export type TagParentFieldInput = {
  connect?: InputMaybe<TagParentConnectFieldInput>
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>
  create?: InputMaybe<TagParentCreateFieldInput>
}

export type TagParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagParentRelationship = {
  __typename?: 'TagParentRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagParentUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type TagParentUpdateFieldInput = {
  connect?: InputMaybe<TagParentConnectFieldInput>
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>
  create?: InputMaybe<TagParentCreateFieldInput>
  delete?: InputMaybe<TagParentDeleteFieldInput>
  disconnect?: InputMaybe<TagParentDisconnectFieldInput>
  update?: InputMaybe<TagParentUpdateConnectionInput>
  where?: InputMaybe<TagParentConnectionWhere>
}

export type TagRelationInput = {
  children?: InputMaybe<Array<TagChildrenCreateFieldInput>>
  owner?: InputMaybe<TagOwnerCreateFieldInput>
  parent?: InputMaybe<TagParentCreateFieldInput>
}

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: InputMaybe<SortDirection>
  isRoot?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TagTagChildrenAggregationSelection = {
  __typename?: 'TagTagChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagTagChildrenNodeAggregateSelection>
}

export type TagTagChildrenNodeAggregateSelection = {
  __typename?: 'TagTagChildrenNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagTagParentAggregationSelection = {
  __typename?: 'TagTagParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagTagParentNodeAggregateSelection>
}

export type TagTagParentNodeAggregateSelection = {
  __typename?: 'TagTagParentNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type TagUpdateInput = {
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TagOwnerUpdateFieldInput>
  parent?: InputMaybe<TagParentUpdateFieldInput>
}

export type TagUserOwnerAggregationSelection = {
  __typename?: 'TagUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagUserOwnerNodeAggregateSelection>
}

export type TagUserOwnerNodeAggregateSelection = {
  __typename?: 'TagUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type TagWhere = {
  AND?: InputMaybe<Array<TagWhere>>
  OR?: InputMaybe<Array<TagWhere>>
  childrenAggregate?: InputMaybe<TagChildrenAggregateInput>
  childrenConnection_ALL?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<TagChildrenConnectionWhere>
  /** Return Tags where all of the related Tags match this filter */
  children_ALL?: InputMaybe<TagWhere>
  /** Return Tags where none of the related Tags match this filter */
  children_NONE?: InputMaybe<TagWhere>
  /** Return Tags where one of the related Tags match this filter */
  children_SINGLE?: InputMaybe<TagWhere>
  /** Return Tags where some of the related Tags match this filter */
  children_SOME?: InputMaybe<TagWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<TagOwnerAggregateInput>
  ownerConnection?: InputMaybe<TagOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TagOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  parent?: InputMaybe<TagWhere>
  parentAggregate?: InputMaybe<TagParentAggregateInput>
  parentConnection?: InputMaybe<TagParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>
  parent_NOT?: InputMaybe<TagWhere>
}

export type TagsConnection = {
  __typename?: 'TagsConnection'
  edges: Array<TagEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TypeBase = {
  id: Scalars['ID']
  kind: TypeKind
  name: Scalars['String']
  owner: User
  ownerConnection: TypeBaseOwnerConnection
}

export type TypeBaseOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type TypeBaseOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type TypeBaseConnectInput = {
  _on?: InputMaybe<TypeBaseImplementationsConnectInput>
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type TypeBaseConnectWhere = {
  node: TypeBaseWhere
}

export type TypeBaseCreateInput = {
  ActionType?: InputMaybe<ActionTypeCreateInput>
  AppType?: InputMaybe<AppTypeCreateInput>
  ArrayType?: InputMaybe<ArrayTypeCreateInput>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeCreateInput>
  ElementType?: InputMaybe<ElementTypeCreateInput>
  EnumType?: InputMaybe<EnumTypeCreateInput>
  InterfaceType?: InputMaybe<InterfaceTypeCreateInput>
  LambdaType?: InputMaybe<LambdaTypeCreateInput>
  PageType?: InputMaybe<PageTypeCreateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeCreateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeCreateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeCreateInput>
  UnionType?: InputMaybe<UnionTypeCreateInput>
}

export type TypeBaseDeleteInput = {
  _on?: InputMaybe<TypeBaseImplementationsDeleteInput>
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type TypeBaseDisconnectInput = {
  _on?: InputMaybe<TypeBaseImplementationsDisconnectInput>
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type TypeBaseImplementationsConnectInput = {
  ActionType?: InputMaybe<Array<ActionTypeConnectInput>>
  AppType?: InputMaybe<Array<AppTypeConnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeConnectInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeConnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeConnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeConnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeConnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeConnectInput>>
  PageType?: InputMaybe<Array<PageTypeConnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeConnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeConnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeConnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeConnectInput>>
}

export type TypeBaseImplementationsDeleteInput = {
  ActionType?: InputMaybe<Array<ActionTypeDeleteInput>>
  AppType?: InputMaybe<Array<AppTypeDeleteInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDeleteInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDeleteInput>>
  ElementType?: InputMaybe<Array<ElementTypeDeleteInput>>
  EnumType?: InputMaybe<Array<EnumTypeDeleteInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDeleteInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDeleteInput>>
  PageType?: InputMaybe<Array<PageTypeDeleteInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDeleteInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDeleteInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDeleteInput>>
  UnionType?: InputMaybe<Array<UnionTypeDeleteInput>>
}

export type TypeBaseImplementationsDisconnectInput = {
  ActionType?: InputMaybe<Array<ActionTypeDisconnectInput>>
  AppType?: InputMaybe<Array<AppTypeDisconnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDisconnectInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDisconnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeDisconnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeDisconnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDisconnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDisconnectInput>>
  PageType?: InputMaybe<Array<PageTypeDisconnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDisconnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDisconnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDisconnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeDisconnectInput>>
}

export type TypeBaseImplementationsUpdateInput = {
  ActionType?: InputMaybe<ActionTypeUpdateInput>
  AppType?: InputMaybe<AppTypeUpdateInput>
  ArrayType?: InputMaybe<ArrayTypeUpdateInput>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeUpdateInput>
  ElementType?: InputMaybe<ElementTypeUpdateInput>
  EnumType?: InputMaybe<EnumTypeUpdateInput>
  InterfaceType?: InputMaybe<InterfaceTypeUpdateInput>
  LambdaType?: InputMaybe<LambdaTypeUpdateInput>
  PageType?: InputMaybe<PageTypeUpdateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeUpdateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeUpdateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeUpdateInput>
  UnionType?: InputMaybe<UnionTypeUpdateInput>
}

export type TypeBaseImplementationsWhere = {
  ActionType?: InputMaybe<ActionTypeWhere>
  AppType?: InputMaybe<AppTypeWhere>
  ArrayType?: InputMaybe<ArrayTypeWhere>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>
  ElementType?: InputMaybe<ElementTypeWhere>
  EnumType?: InputMaybe<EnumTypeWhere>
  InterfaceType?: InputMaybe<InterfaceTypeWhere>
  LambdaType?: InputMaybe<LambdaTypeWhere>
  PageType?: InputMaybe<PageTypeWhere>
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>
  RenderPropsType?: InputMaybe<RenderPropsTypeWhere>
  UnionType?: InputMaybe<UnionTypeWhere>
}

export type TypeBaseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TypeBaseSort objects to sort TypeBases by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<TypeBaseSort>>>
}

export type TypeBaseOwnerAggregateInput = {
  AND?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>
  OR?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<TypeBaseOwnerNodeAggregationWhereInput>
}

export type TypeBaseOwnerConnectFieldInput = {
  connect?: InputMaybe<UserConnectInput>
  where?: InputMaybe<UserConnectWhere>
}

export type TypeBaseOwnerConnectOrCreateFieldInput = {
  onCreate: TypeBaseOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type TypeBaseOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type TypeBaseOwnerConnection = {
  __typename?: 'TypeBaseOwnerConnection'
  edges: Array<TypeBaseOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TypeBaseOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type TypeBaseOwnerConnectionWhere = {
  AND?: InputMaybe<Array<TypeBaseOwnerConnectionWhere>>
  OR?: InputMaybe<Array<TypeBaseOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type TypeBaseOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type TypeBaseOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type TypeBaseOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type TypeBaseOwnerFieldInput = {
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

export type TypeBaseOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TypeBaseOwnerRelationship = {
  __typename?: 'TypeBaseOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type TypeBaseOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type TypeBaseOwnerUpdateFieldInput = {
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  delete?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  disconnect?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  update?: InputMaybe<TypeBaseOwnerUpdateConnectionInput>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

/** Fields to sort TypeBases by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeBaseSort object. */
export type TypeBaseSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TypeBaseUpdateInput = {
  _on?: InputMaybe<TypeBaseImplementationsUpdateInput>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type TypeBaseWhere = {
  _on?: InputMaybe<TypeBaseImplementationsWhere>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<TypeBaseOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
}

export enum TypeKind {
  ActionType = 'ActionType',
  AppType = 'AppType',
  ArrayType = 'ArrayType',
  CodeMirrorType = 'CodeMirrorType',
  ElementType = 'ElementType',
  EnumType = 'EnumType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  PageType = 'PageType',
  PrimitiveType = 'PrimitiveType',
  ReactNodeType = 'ReactNodeType',
  RenderPropsType = 'RenderPropsType',
  UnionType = 'UnionType',
}

export type TypeReference = {
  __typename?: 'TypeReference'
  /** The type of resource - Atom, InterfaceType, etc. */
  label: Scalars['String']
  /** The name of the resource referencing the type */
  name: Scalars['String']
}

export type TypeReferenceAggregateSelection = {
  __typename?: 'TypeReferenceAggregateSelection'
  count: Scalars['Int']
  label: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TypeReferenceCreateInput = {
  label: Scalars['String']
  name: Scalars['String']
}

export type TypeReferenceEdge = {
  __typename?: 'TypeReferenceEdge'
  cursor: Scalars['String']
  node: TypeReference
}

export type TypeReferenceOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TypeReferenceSort objects to sort TypeReferences by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TypeReferenceSort>>
}

/** Fields to sort TypeReferences by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeReferenceSort object. */
export type TypeReferenceSort = {
  label?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TypeReferenceUpdateInput = {
  label?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type TypeReferenceWhere = {
  AND?: InputMaybe<Array<TypeReferenceWhere>>
  OR?: InputMaybe<Array<TypeReferenceWhere>>
  label?: InputMaybe<Scalars['String']>
  label_CONTAINS?: InputMaybe<Scalars['String']>
  label_ENDS_WITH?: InputMaybe<Scalars['String']>
  label_IN?: InputMaybe<Array<Scalars['String']>>
  label_NOT?: InputMaybe<Scalars['String']>
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  label_STARTS_WITH?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type TypeReferencesConnection = {
  __typename?: 'TypeReferencesConnection'
  edges: Array<TypeReferenceEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

/** Allows picking one of a set of types */
export type UnionType = TypeBase &
  WithDescendants & {
    __typename?: 'UnionType'
    descendantTypesIds: Array<Scalars['ID']>
    id: Scalars['ID']
    kind: TypeKind
    name: Scalars['String']
    owner: User
    ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>
    ownerConnection: TypeBaseOwnerConnection
    typesOfUnionType: Array<TypeBase>
    typesOfUnionTypeConnection: UnionTypeTypesOfUnionTypeConnection
  }

/** Allows picking one of a set of types */
export type UnionTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionSort>>
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeAggregateSelection = {
  __typename?: 'UnionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type UnionTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeConnectFieldInput>
  >
}

export type UnionTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type UnionTypeCreateInput = {
  id: Scalars['ID']
  kind?: TypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeFieldInput>
}

export type UnionTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>
  >
}

export type UnionTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>
  >
}

export type UnionTypeEdge = {
  __typename?: 'UnionTypeEdge'
  cursor: Scalars['String']
  node: UnionType
}

export type UnionTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more UnionTypeSort objects to sort UnionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UnionTypeSort>>
}

export type UnionTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UnionTypeOwnerNodeAggregationWhereInput>
}

export type UnionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UnionTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCreateFieldInput>
  >
}

/** Fields to sort UnionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnionTypeSort object. */
export type UnionTypeSort = {
  id?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type UnionTypeTypesOfUnionTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type UnionTypeTypesOfUnionTypeConnection = {
  __typename?: 'UnionTypeTypesOfUnionTypeConnection'
  edges: Array<UnionTypeTypesOfUnionTypeRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UnionTypeTypesOfUnionTypeConnectionSort = {
  node?: InputMaybe<TypeBaseSort>
}

export type UnionTypeTypesOfUnionTypeConnectionWhere = {
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>
  node?: InputMaybe<TypeBaseWhere>
  node_NOT?: InputMaybe<TypeBaseWhere>
}

export type UnionTypeTypesOfUnionTypeCreateFieldInput = {
  node: TypeBaseCreateInput
}

export type UnionTypeTypesOfUnionTypeDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeTypesOfUnionTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeTypesOfUnionTypeFieldInput = {
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
}

export type UnionTypeTypesOfUnionTypeRelationship = {
  __typename?: 'UnionTypeTypesOfUnionTypeRelationship'
  cursor: Scalars['String']
  node: TypeBase
}

export type UnionTypeTypesOfUnionTypeUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>
}

export type UnionTypeTypesOfUnionTypeUpdateFieldInput = {
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeUpdateConnectionInput>
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUpdateFieldInput>
  >
}

export type UnionTypeUserOwnerAggregationSelection = {
  __typename?: 'UnionTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UnionTypeUserOwnerNodeAggregateSelection>
}

export type UnionTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'UnionTypeUserOwnerNodeAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type UnionTypeWhere = {
  AND?: InputMaybe<Array<UnionTypeWhere>>
  OR?: InputMaybe<Array<UnionTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  kind?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT?: InputMaybe<TypeKind>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  name?: InputMaybe<Scalars['String']>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypesConnection = {
  __typename?: 'UnionTypesConnection'
  edges: Array<UnionTypeEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UpdateActionTypesMutationResponse = {
  __typename?: 'UpdateActionTypesMutationResponse'
  actionTypes: Array<ActionType>
  info: UpdateInfo
}

export type UpdateAppTypesMutationResponse = {
  __typename?: 'UpdateAppTypesMutationResponse'
  appTypes: Array<AppType>
  info: UpdateInfo
}

export type UpdateAppsMutationResponse = {
  __typename?: 'UpdateAppsMutationResponse'
  apps: Array<App>
  info: UpdateInfo
}

export type UpdateArrayTypesMutationResponse = {
  __typename?: 'UpdateArrayTypesMutationResponse'
  arrayTypes: Array<ArrayType>
  info: UpdateInfo
}

export type UpdateAtomsMutationResponse = {
  __typename?: 'UpdateAtomsMutationResponse'
  atoms: Array<Atom>
  info: UpdateInfo
}

export type UpdateCodeMirrorTypesMutationResponse = {
  __typename?: 'UpdateCodeMirrorTypesMutationResponse'
  codeMirrorTypes: Array<CodeMirrorType>
  info: UpdateInfo
}

export type UpdateComponentsMutationResponse = {
  __typename?: 'UpdateComponentsMutationResponse'
  components: Array<Component>
  info: UpdateInfo
}

export type UpdateCreateInfosMutationResponse = {
  __typename?: 'UpdateCreateInfosMutationResponse'
  createInfos: Array<CreateInfo>
  info: UpdateInfo
}

export type UpdateCustomActionsMutationResponse = {
  __typename?: 'UpdateCustomActionsMutationResponse'
  customActions: Array<CustomAction>
  info: UpdateInfo
}

export type UpdateDeleteInfosMutationResponse = {
  __typename?: 'UpdateDeleteInfosMutationResponse'
  deleteInfos: Array<DeleteInfo>
  info: UpdateInfo
}

export type UpdateDomainMutationInput = {
  appId: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type UpdateDomainsMutationResponse = {
  __typename?: 'UpdateDomainsMutationResponse'
  domains: Array<Domain>
  info: UpdateInfo
}

export type UpdateElementTypesMutationResponse = {
  __typename?: 'UpdateElementTypesMutationResponse'
  elementTypes: Array<ElementType>
  info: UpdateInfo
}

export type UpdateElementsMutationResponse = {
  __typename?: 'UpdateElementsMutationResponse'
  elements: Array<Element>
  info: UpdateInfo
}

export type UpdateEnumTypeValuesMutationResponse = {
  __typename?: 'UpdateEnumTypeValuesMutationResponse'
  enumTypeValues: Array<EnumTypeValue>
  info: UpdateInfo
}

export type UpdateEnumTypesMutationResponse = {
  __typename?: 'UpdateEnumTypesMutationResponse'
  enumTypes: Array<EnumType>
  info: UpdateInfo
}

export type UpdateExecuteCommandResponsesMutationResponse = {
  __typename?: 'UpdateExecuteCommandResponsesMutationResponse'
  executeCommandResponses: Array<ExecuteCommandResponse>
  info: UpdateInfo
}

export type UpdateHooksMutationResponse = {
  __typename?: 'UpdateHooksMutationResponse'
  hooks: Array<Hook>
  info: UpdateInfo
}

export type UpdateInfo = {
  __typename?: 'UpdateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  nodesDeleted: Scalars['Int']
  relationshipsCreated: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type UpdateInterfaceTypesMutationResponse = {
  __typename?: 'UpdateInterfaceTypesMutationResponse'
  info: UpdateInfo
  interfaceTypes: Array<InterfaceType>
}

export type UpdateLambdaTypesMutationResponse = {
  __typename?: 'UpdateLambdaTypesMutationResponse'
  info: UpdateInfo
  lambdaTypes: Array<LambdaType>
}

export type UpdatePageTypesMutationResponse = {
  __typename?: 'UpdatePageTypesMutationResponse'
  info: UpdateInfo
  pageTypes: Array<PageType>
}

export type UpdatePagesMutationResponse = {
  __typename?: 'UpdatePagesMutationResponse'
  info: UpdateInfo
  pages: Array<Page>
}

export type UpdatePipelineActionsMutationResponse = {
  __typename?: 'UpdatePipelineActionsMutationResponse'
  info: UpdateInfo
  pipelineActions: Array<PipelineAction>
}

export type UpdatePrimitiveTypesMutationResponse = {
  __typename?: 'UpdatePrimitiveTypesMutationResponse'
  info: UpdateInfo
  primitiveTypes: Array<PrimitiveType>
}

export type UpdatePropMapBindingsMutationResponse = {
  __typename?: 'UpdatePropMapBindingsMutationResponse'
  info: UpdateInfo
  propMapBindings: Array<PropMapBinding>
}

export type UpdatePropsMutationResponse = {
  __typename?: 'UpdatePropsMutationResponse'
  info: UpdateInfo
  props: Array<Prop>
}

export type UpdateReactNodeTypesMutationResponse = {
  __typename?: 'UpdateReactNodeTypesMutationResponse'
  info: UpdateInfo
  reactNodeTypes: Array<ReactNodeType>
}

export type UpdateRenderPropsTypesMutationResponse = {
  __typename?: 'UpdateRenderPropsTypesMutationResponse'
  info: UpdateInfo
  renderPropsTypes: Array<RenderPropsType>
}

export type UpdateResetDatabaseMutationResponsesMutationResponse = {
  __typename?: 'UpdateResetDatabaseMutationResponsesMutationResponse'
  info: UpdateInfo
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
}

export type UpdateResourceActionsMutationResponse = {
  __typename?: 'UpdateResourceActionsMutationResponse'
  info: UpdateInfo
  resourceActions: Array<ResourceAction>
}

export type UpdateResourcesMutationResponse = {
  __typename?: 'UpdateResourcesMutationResponse'
  info: UpdateInfo
  resources: Array<Resource>
}

export type UpdateStoresMutationResponse = {
  __typename?: 'UpdateStoresMutationResponse'
  info: UpdateInfo
  stores: Array<Store>
}

export type UpdateTagGraphOptionsMutationResponse = {
  __typename?: 'UpdateTagGraphOptionsMutationResponse'
  info: UpdateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type UpdateTagsMutationResponse = {
  __typename?: 'UpdateTagsMutationResponse'
  info: UpdateInfo
  tags: Array<Tag>
}

export type UpdateTypeReferencesMutationResponse = {
  __typename?: 'UpdateTypeReferencesMutationResponse'
  info: UpdateInfo
  typeReferences: Array<TypeReference>
}

export type UpdateUnionTypesMutationResponse = {
  __typename?: 'UpdateUnionTypesMutationResponse'
  info: UpdateInfo
  unionTypes: Array<UnionType>
}

export type UpdateVercelDomainConfigDataMutationResponse = {
  __typename?: 'UpdateVercelDomainConfigDataMutationResponse'
  info: UpdateInfo
  vercelDomainConfigData: Array<VercelDomainConfigData>
}

export type UpdateVercelProjectDomainDataMutationResponse = {
  __typename?: 'UpdateVercelProjectDomainDataMutationResponse'
  info: UpdateInfo
  vercelProjectDomainData: Array<VercelProjectDomainData>
}

export type User = {
  __typename?: 'User'
  apps: Array<App>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  appsConnection: UserAppsConnection
  auth0Id: Scalars['String']
  components: Array<Component>
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>
  componentsConnection: UserComponentsConnection
  elements: Array<Element>
  elementsAggregate?: Maybe<UserElementElementsAggregationSelection>
  elementsConnection: UserElementsConnection
  email: Scalars['String']
  id: Scalars['ID']
  roles: Array<Role>
  tags: Array<Tag>
  tagsAggregate?: Maybe<UserTagTagsAggregationSelection>
  tagsConnection: UserTagsConnection
  types: Array<TypeBase>
  typesConnection: UserTypesConnection
  username: Scalars['String']
}

export type UserAppsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type UserAppsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<AppWhere>
}

export type UserAppsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserAppsConnectionSort>>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserComponentsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}

export type UserComponentsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ComponentWhere>
}

export type UserComponentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserComponentsConnectionSort>>
  where?: InputMaybe<UserComponentsConnectionWhere>
}

export type UserElementsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type UserElementsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type UserElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserElementsConnectionSort>>
  where?: InputMaybe<UserElementsConnectionWhere>
}

export type UserTagsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type UserTagsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<TagWhere>
}

export type UserTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserTagsConnectionSort>>
  where?: InputMaybe<UserTagsConnectionWhere>
}

export type UserTypesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
}

export type UserTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<UserTypesConnectionSort>>
  where?: InputMaybe<UserTypesConnectionWhere>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  auth0Id: StringAggregateSelectionNonNullable
  count: Scalars['Int']
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type UserAppAppsAggregationSelection = {
  __typename?: 'UserAppAppsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserAppAppsNodeAggregateSelection>
}

export type UserAppAppsNodeAggregateSelection = {
  __typename?: 'UserAppAppsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
}

export type UserAppsAggregateInput = {
  AND?: InputMaybe<Array<UserAppsAggregateInput>>
  OR?: InputMaybe<Array<UserAppsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UserAppsNodeAggregationWhereInput>
}

export type UserAppsConnectFieldInput = {
  connect?: InputMaybe<Array<AppConnectInput>>
  where?: InputMaybe<AppConnectWhere>
}

export type UserAppsConnectOrCreateFieldInput = {
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate
  where: AppConnectOrCreateWhere
}

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type UserAppsConnection = {
  __typename?: 'UserAppsConnection'
  edges: Array<UserAppsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserAppsConnectionSort = {
  node?: InputMaybe<AppSort>
}

export type UserAppsConnectionWhere = {
  AND?: InputMaybe<Array<UserAppsConnectionWhere>>
  OR?: InputMaybe<Array<UserAppsConnectionWhere>>
  node?: InputMaybe<AppWhere>
  node_NOT?: InputMaybe<AppWhere>
}

export type UserAppsCreateFieldInput = {
  node: AppCreateInput
}

export type UserAppsDeleteFieldInput = {
  delete?: InputMaybe<AppDeleteInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserAppsDisconnectFieldInput = {
  disconnect?: InputMaybe<AppDisconnectInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserAppsFieldInput = {
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
}

export type UserAppsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserAppsRelationship = {
  __typename?: 'UserAppsRelationship'
  cursor: Scalars['String']
  node: App
}

export type UserAppsUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type UserAppsUpdateFieldInput = {
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
  delete?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  update?: InputMaybe<UserAppsUpdateConnectionInput>
  where?: InputMaybe<UserAppsConnectionWhere>
}

export type UserComponentComponentsAggregationSelection = {
  __typename?: 'UserComponentComponentsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserComponentComponentsNodeAggregateSelection>
}

export type UserComponentComponentsNodeAggregateSelection = {
  __typename?: 'UserComponentComponentsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type UserComponentsAggregateInput = {
  AND?: InputMaybe<Array<UserComponentsAggregateInput>>
  OR?: InputMaybe<Array<UserComponentsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UserComponentsNodeAggregationWhereInput>
}

export type UserComponentsConnectFieldInput = {
  connect?: InputMaybe<Array<ComponentConnectInput>>
  where?: InputMaybe<ComponentConnectWhere>
}

export type UserComponentsConnectOrCreateFieldInput = {
  onCreate: UserComponentsConnectOrCreateFieldInputOnCreate
  where: ComponentConnectOrCreateWhere
}

export type UserComponentsConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type UserComponentsConnection = {
  __typename?: 'UserComponentsConnection'
  edges: Array<UserComponentsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>
}

export type UserComponentsConnectionWhere = {
  AND?: InputMaybe<Array<UserComponentsConnectionWhere>>
  OR?: InputMaybe<Array<UserComponentsConnectionWhere>>
  node?: InputMaybe<ComponentWhere>
  node_NOT?: InputMaybe<ComponentWhere>
}

export type UserComponentsCreateFieldInput = {
  node: ComponentCreateInput
}

export type UserComponentsDeleteFieldInput = {
  delete?: InputMaybe<ComponentDeleteInput>
  where?: InputMaybe<UserComponentsConnectionWhere>
}

export type UserComponentsDisconnectFieldInput = {
  disconnect?: InputMaybe<ComponentDisconnectInput>
  where?: InputMaybe<UserComponentsConnectionWhere>
}

export type UserComponentsFieldInput = {
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>
}

export type UserComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserComponentsRelationship = {
  __typename?: 'UserComponentsRelationship'
  cursor: Scalars['String']
  node: Component
}

export type UserComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type UserComponentsUpdateFieldInput = {
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>
  delete?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
  update?: InputMaybe<UserComponentsUpdateConnectionInput>
  where?: InputMaybe<UserComponentsConnectionWhere>
}

export type UserConnectInput = {
  apps?: InputMaybe<Array<UserAppsConnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  elements?: InputMaybe<Array<UserElementsConnectFieldInput>>
  tags?: InputMaybe<Array<UserTagsConnectFieldInput>>
  types?: InputMaybe<Array<UserTypesConnectFieldInput>>
}

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere
}

export type UserConnectWhere = {
  node: UserWhere
}

export type UserCreateInput = {
  apps?: InputMaybe<UserAppsFieldInput>
  auth0Id: Scalars['String']
  components?: InputMaybe<UserComponentsFieldInput>
  elements?: InputMaybe<UserElementsFieldInput>
  email: Scalars['String']
  roles: Array<Role>
  tags?: InputMaybe<UserTagsFieldInput>
  types?: InputMaybe<UserTypesFieldInput>
  username: Scalars['String']
}

export type UserDeleteInput = {
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
  elements?: InputMaybe<Array<UserElementsDeleteFieldInput>>
  tags?: InputMaybe<Array<UserTagsDeleteFieldInput>>
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
  elements?: InputMaybe<Array<UserElementsDisconnectFieldInput>>
  tags?: InputMaybe<Array<UserTagsDisconnectFieldInput>>
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['String']
  node: User
}

export type UserElementElementsAggregationSelection = {
  __typename?: 'UserElementElementsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserElementElementsNodeAggregateSelection>
}

export type UserElementElementsNodeAggregateSelection = {
  __typename?: 'UserElementElementsNodeAggregateSelection'
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type UserElementsAggregateInput = {
  AND?: InputMaybe<Array<UserElementsAggregateInput>>
  OR?: InputMaybe<Array<UserElementsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UserElementsNodeAggregationWhereInput>
}

export type UserElementsConnectFieldInput = {
  connect?: InputMaybe<Array<ElementConnectInput>>
  where?: InputMaybe<ElementConnectWhere>
}

export type UserElementsConnectOrCreateFieldInput = {
  onCreate: UserElementsConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type UserElementsConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type UserElementsConnection = {
  __typename?: 'UserElementsConnection'
  edges: Array<UserElementsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserElementsConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type UserElementsConnectionWhere = {
  AND?: InputMaybe<Array<UserElementsConnectionWhere>>
  OR?: InputMaybe<Array<UserElementsConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type UserElementsCreateFieldInput = {
  node: ElementCreateInput
}

export type UserElementsDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<UserElementsConnectionWhere>
}

export type UserElementsDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<UserElementsConnectionWhere>
}

export type UserElementsFieldInput = {
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>
}

export type UserElementsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserElementsRelationship = {
  __typename?: 'UserElementsRelationship'
  cursor: Scalars['String']
  node: Element
}

export type UserElementsUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type UserElementsUpdateFieldInput = {
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>
  delete?: InputMaybe<Array<UserElementsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserElementsDisconnectFieldInput>>
  update?: InputMaybe<UserElementsUpdateConnectionInput>
  where?: InputMaybe<UserElementsConnectionWhere>
}

export type UserOnCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
}

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  auth0Id?: InputMaybe<SortDirection>
  email?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  username?: InputMaybe<SortDirection>
}

export type UserTagTagsAggregationSelection = {
  __typename?: 'UserTagTagsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserTagTagsNodeAggregateSelection>
}

export type UserTagTagsNodeAggregateSelection = {
  __typename?: 'UserTagTagsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type UserTagsAggregateInput = {
  AND?: InputMaybe<Array<UserTagsAggregateInput>>
  OR?: InputMaybe<Array<UserTagsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<UserTagsNodeAggregationWhereInput>
}

export type UserTagsConnectFieldInput = {
  connect?: InputMaybe<Array<TagConnectInput>>
  where?: InputMaybe<TagConnectWhere>
}

export type UserTagsConnectOrCreateFieldInput = {
  onCreate: UserTagsConnectOrCreateFieldInputOnCreate
  where: TagConnectOrCreateWhere
}

export type UserTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type UserTagsConnection = {
  __typename?: 'UserTagsConnection'
  edges: Array<UserTagsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserTagsConnectionSort = {
  node?: InputMaybe<TagSort>
}

export type UserTagsConnectionWhere = {
  AND?: InputMaybe<Array<UserTagsConnectionWhere>>
  OR?: InputMaybe<Array<UserTagsConnectionWhere>>
  node?: InputMaybe<TagWhere>
  node_NOT?: InputMaybe<TagWhere>
}

export type UserTagsCreateFieldInput = {
  node: TagCreateInput
}

export type UserTagsDeleteFieldInput = {
  delete?: InputMaybe<TagDeleteInput>
  where?: InputMaybe<UserTagsConnectionWhere>
}

export type UserTagsDisconnectFieldInput = {
  disconnect?: InputMaybe<TagDisconnectInput>
  where?: InputMaybe<UserTagsConnectionWhere>
}

export type UserTagsFieldInput = {
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>
}

export type UserTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserTagsRelationship = {
  __typename?: 'UserTagsRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type UserTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type UserTagsUpdateFieldInput = {
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>
  delete?: InputMaybe<Array<UserTagsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserTagsDisconnectFieldInput>>
  update?: InputMaybe<UserTagsUpdateConnectionInput>
  where?: InputMaybe<UserTagsConnectionWhere>
}

export type UserTypesConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type UserTypesConnection = {
  __typename?: 'UserTypesConnection'
  edges: Array<UserTypesRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserTypesConnectionSort = {
  node?: InputMaybe<TypeBaseSort>
}

export type UserTypesConnectionWhere = {
  AND?: InputMaybe<Array<UserTypesConnectionWhere>>
  OR?: InputMaybe<Array<UserTypesConnectionWhere>>
  node?: InputMaybe<TypeBaseWhere>
  node_NOT?: InputMaybe<TypeBaseWhere>
}

export type UserTypesCreateFieldInput = {
  node: TypeBaseCreateInput
}

export type UserTypesDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>
  where?: InputMaybe<UserTypesConnectionWhere>
}

export type UserTypesDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>
  where?: InputMaybe<UserTypesConnectionWhere>
}

export type UserTypesFieldInput = {
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>
}

export type UserTypesRelationship = {
  __typename?: 'UserTypesRelationship'
  cursor: Scalars['String']
  node: TypeBase
}

export type UserTypesUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>
}

export type UserTypesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>
  delete?: InputMaybe<Array<UserTypesDeleteFieldInput>>
  disconnect?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
  update?: InputMaybe<UserTypesUpdateConnectionInput>
  where?: InputMaybe<UserTypesConnectionWhere>
}

export type UserUniqueWhere = {
  auth0Id?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  username?: InputMaybe<Scalars['String']>
}

export type UserUpdateInput = {
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>
  auth0Id?: InputMaybe<Scalars['String']>
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>
  elements?: InputMaybe<Array<UserElementsUpdateFieldInput>>
  email?: InputMaybe<Scalars['String']>
  roles?: InputMaybe<Array<Role>>
  tags?: InputMaybe<Array<UserTagsUpdateFieldInput>>
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>
  username?: InputMaybe<Scalars['String']>
}

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>
  OR?: InputMaybe<Array<UserWhere>>
  appsAggregate?: InputMaybe<UserAppsAggregateInput>
  appsConnection_ALL?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_NONE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SINGLE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SOME?: InputMaybe<UserAppsConnectionWhere>
  /** Return Users where all of the related Apps match this filter */
  apps_ALL?: InputMaybe<AppWhere>
  /** Return Users where none of the related Apps match this filter */
  apps_NONE?: InputMaybe<AppWhere>
  /** Return Users where one of the related Apps match this filter */
  apps_SINGLE?: InputMaybe<AppWhere>
  /** Return Users where some of the related Apps match this filter */
  apps_SOME?: InputMaybe<AppWhere>
  auth0Id?: InputMaybe<Scalars['String']>
  auth0Id_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_ENDS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_IN?: InputMaybe<Array<Scalars['String']>>
  auth0Id_NOT?: InputMaybe<Scalars['String']>
  auth0Id_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  auth0Id_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_STARTS_WITH?: InputMaybe<Scalars['String']>
  componentsAggregate?: InputMaybe<UserComponentsAggregateInput>
  componentsConnection_ALL?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_NONE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SINGLE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SOME?: InputMaybe<UserComponentsConnectionWhere>
  /** Return Users where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>
  /** Return Users where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>
  /** Return Users where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>
  /** Return Users where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>
  elementsAggregate?: InputMaybe<UserElementsAggregateInput>
  elementsConnection_ALL?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_NONE?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_SINGLE?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_SOME?: InputMaybe<UserElementsConnectionWhere>
  /** Return Users where all of the related Elements match this filter */
  elements_ALL?: InputMaybe<ElementWhere>
  /** Return Users where none of the related Elements match this filter */
  elements_NONE?: InputMaybe<ElementWhere>
  /** Return Users where one of the related Elements match this filter */
  elements_SINGLE?: InputMaybe<ElementWhere>
  /** Return Users where some of the related Elements match this filter */
  elements_SOME?: InputMaybe<ElementWhere>
  email?: InputMaybe<Scalars['String']>
  email_CONTAINS?: InputMaybe<Scalars['String']>
  email_ENDS_WITH?: InputMaybe<Scalars['String']>
  email_IN?: InputMaybe<Array<Scalars['String']>>
  email_NOT?: InputMaybe<Scalars['String']>
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  email_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  email_STARTS_WITH?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  roles?: InputMaybe<Array<Role>>
  roles_INCLUDES?: InputMaybe<Role>
  roles_NOT?: InputMaybe<Array<Role>>
  roles_NOT_INCLUDES?: InputMaybe<Role>
  tagsAggregate?: InputMaybe<UserTagsAggregateInput>
  tagsConnection_ALL?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_NONE?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_SINGLE?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_SOME?: InputMaybe<UserTagsConnectionWhere>
  /** Return Users where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>
  /** Return Users where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>
  /** Return Users where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>
  /** Return Users where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>
  username?: InputMaybe<Scalars['String']>
  username_CONTAINS?: InputMaybe<Scalars['String']>
  username_ENDS_WITH?: InputMaybe<Scalars['String']>
  username_IN?: InputMaybe<Array<Scalars['String']>>
  username_NOT?: InputMaybe<Scalars['String']>
  username_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  username_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  username_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  username_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  username_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type UsersConnection = {
  __typename?: 'UsersConnection'
  edges: Array<UserEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type VercelDomainConfigData = {
  __typename?: 'VercelDomainConfigData'
  misconfigured: Scalars['Boolean']
}

export type VercelDomainConfigDataAggregateSelection = {
  __typename?: 'VercelDomainConfigDataAggregateSelection'
  count: Scalars['Int']
}

export type VercelDomainConfigDataConnection = {
  __typename?: 'VercelDomainConfigDataConnection'
  edges: Array<VercelDomainConfigDataEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type VercelDomainConfigDataCreateInput = {
  misconfigured: Scalars['Boolean']
}

export type VercelDomainConfigDataEdge = {
  __typename?: 'VercelDomainConfigDataEdge'
  cursor: Scalars['String']
  node: VercelDomainConfigData
}

export type VercelDomainConfigDataOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more VercelDomainConfigDataSort objects to sort VercelDomainConfigData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelDomainConfigDataSort>>
}

/** Fields to sort VercelDomainConfigData by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelDomainConfigDataSort object. */
export type VercelDomainConfigDataSort = {
  misconfigured?: InputMaybe<SortDirection>
}

export type VercelDomainConfigDataUpdateInput = {
  misconfigured?: InputMaybe<Scalars['Boolean']>
}

export type VercelDomainConfigDataWhere = {
  AND?: InputMaybe<Array<VercelDomainConfigDataWhere>>
  OR?: InputMaybe<Array<VercelDomainConfigDataWhere>>
  misconfigured?: InputMaybe<Scalars['Boolean']>
  misconfigured_NOT?: InputMaybe<Scalars['Boolean']>
}

export type VercelProjectDomainData = {
  __typename?: 'VercelProjectDomainData'
  verified: Scalars['Boolean']
}

export type VercelProjectDomainDataAggregateSelection = {
  __typename?: 'VercelProjectDomainDataAggregateSelection'
  count: Scalars['Int']
}

export type VercelProjectDomainDataConnection = {
  __typename?: 'VercelProjectDomainDataConnection'
  edges: Array<VercelProjectDomainDataEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type VercelProjectDomainDataCreateInput = {
  verified: Scalars['Boolean']
}

export type VercelProjectDomainDataEdge = {
  __typename?: 'VercelProjectDomainDataEdge'
  cursor: Scalars['String']
  node: VercelProjectDomainData
}

export type VercelProjectDomainDataOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more VercelProjectDomainDataSort objects to sort VercelProjectDomainData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelProjectDomainDataSort>>
}

/** Fields to sort VercelProjectDomainData by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelProjectDomainDataSort object. */
export type VercelProjectDomainDataSort = {
  verified?: InputMaybe<SortDirection>
}

export type VercelProjectDomainDataUpdateInput = {
  verified?: InputMaybe<Scalars['Boolean']>
}

export type VercelProjectDomainDataWhere = {
  AND?: InputMaybe<Array<VercelProjectDomainDataWhere>>
  OR?: InputMaybe<Array<VercelProjectDomainDataWhere>>
  verified?: InputMaybe<Scalars['Boolean']>
  verified_NOT?: InputMaybe<Scalars['Boolean']>
}

export type WithDescendants = {
  descendantTypesIds: Array<Scalars['ID']>
}

export type WithOwner = {
  owner: User
  ownerConnection: WithOwnerOwnerConnection
}

export type WithOwnerOwnerConnectFieldInput = {
  connect?: InputMaybe<UserConnectInput>
  where?: InputMaybe<UserConnectWhere>
}

export type WithOwnerOwnerConnectOrCreateFieldInput = {
  onCreate: WithOwnerOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type WithOwnerOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type WithOwnerOwnerConnection = {
  __typename?: 'WithOwnerOwnerConnection'
  edges: Array<WithOwnerOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type WithOwnerOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type WithOwnerOwnerConnectionWhere = {
  AND?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>
  OR?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type WithOwnerOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type WithOwnerOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type WithOwnerOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type WithOwnerOwnerFieldInput = {
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>
}

export type WithOwnerOwnerRelationship = {
  __typename?: 'WithOwnerOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type WithOwnerOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type WithOwnerOwnerUpdateFieldInput = {
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  delete?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
  disconnect?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
  update?: InputMaybe<WithOwnerOwnerUpdateConnectionInput>
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type GetRedirectedAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}>

export type GetRedirectedAppsQuery = {
  __typename?: 'Query'
  apps: Array<{ __typename?: 'App' } & RedirectedAppFragment>
}

export type GetAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}>

export type GetAppsQuery = {
  __typename?: 'Query'
  apps: Array<{ __typename?: 'App' } & AppPreviewFragment>
}

export type ResetDatabaseMutationVariables = Exact<{ [key: string]: never }>

export type ResetDatabaseMutation = {
  __typename?: 'Mutation'
  resetDatabase?: {
    __typename?: 'ResetDatabaseMutationResponse'
    success?: boolean | null
  } | null
}

export type ExecuteCommandMutationVariables = Exact<{
  input: ExecuteCommandInput
}>

export type ExecuteCommandMutation = {
  __typename?: 'Mutation'
  executeCommand: {
    __typename?: 'ExecuteCommandResponse'
    success: boolean
    data: string
    handler: ExecuteCommandHandler
  }
}

export type CreateAppsMutationVariables = Exact<{
  input: Array<AppCreateInput> | AppCreateInput
}>

export type CreateAppsMutation = {
  __typename?: 'Mutation'
  createApps: {
    __typename?: 'CreateAppsMutationResponse'
    apps: Array<{ __typename?: 'App' } & AppPreviewFragment>
  }
}

export type UpdateAppsMutationVariables = Exact<{
  where: AppWhere
  update: AppUpdateInput
}>

export type UpdateAppsMutation = {
  __typename?: 'Mutation'
  updateApps: {
    __typename?: 'UpdateAppsMutationResponse'
    apps: Array<{ __typename?: 'App' } & AppPreviewFragment>
  }
}

export type DeleteAppsMutationVariables = Exact<{
  where: AppWhere
  delete?: InputMaybe<AppDeleteInput>
}>

export type DeleteAppsMutation = {
  __typename?: 'Mutation'
  deleteApps: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type CreateAtomsMutationVariables = Exact<{
  input: Array<AtomCreateInput> | AtomCreateInput
}>

export type CreateAtomsMutation = {
  __typename?: 'Mutation'
  createAtoms: {
    __typename?: 'CreateAtomsMutationResponse'
    info: {
      __typename?: 'CreateInfo'
      nodesCreated: number
      relationshipsCreated: number
    }
    atoms: Array<{ __typename?: 'Atom' } & AtomFragment>
  }
}

export type DeleteAtomsMutationVariables = Exact<{
  where: AtomWhere
}>

export type DeleteAtomsMutation = {
  __typename?: 'Mutation'
  deleteAtoms: {
    __typename?: 'DeleteInfo'
    nodesDeleted: number
    relationshipsDeleted: number
  }
}

export type GetAtomsQueryVariables = Exact<{
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
}>

export type GetAtomsQuery = {
  __typename?: 'Query'
  atoms: Array<{ __typename?: 'Atom' } & AtomFragment>
}

export type UpdateAtomsMutationVariables = Exact<{
  where?: InputMaybe<AtomWhere>
  update?: InputMaybe<AtomUpdateInput>
}>

export type UpdateAtomsMutation = {
  __typename?: 'Mutation'
  updateAtoms: {
    __typename?: 'UpdateAtomsMutationResponse'
    atoms: Array<{ __typename?: 'Atom' } & AtomFragment>
  }
}

export type GetPageBuilderQueryVariables = Exact<{
  appId: Scalars['ID']
  pageId: Scalars['ID']
  typeIds?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type GetPageBuilderQuery = {
  __typename?: 'Query'
  apps: Array<{ __typename?: 'App' } & PageBuilderAppFragment>
  stores: Array<{ __typename?: 'Store' } & StoreFragment>
  components: Array<{ __typename?: 'Component' } & ComponentFragment>
  primitiveTypes: Array<
    { __typename?: 'PrimitiveType' } & Type_PrimitiveType_Fragment
  >
  arrayTypes: Array<{ __typename?: 'ArrayType' } & Type_ArrayType_Fragment>
  unionTypes: Array<{ __typename?: 'UnionType' } & Type_UnionType_Fragment>
  interfaceTypes: Array<
    { __typename?: 'InterfaceType' } & Type_InterfaceType_Fragment
  >
  elementTypes: Array<
    { __typename?: 'ElementType' } & Type_ElementType_Fragment
  >
  renderPropsTypes: Array<
    { __typename?: 'RenderPropsType' } & Type_RenderPropsType_Fragment
  >
  reactNodeTypes: Array<
    { __typename?: 'ReactNodeType' } & Type_ReactNodeType_Fragment
  >
  enumTypes: Array<{ __typename?: 'EnumType' } & Type_EnumType_Fragment>
  lambdaTypes: Array<{ __typename?: 'LambdaType' } & Type_LambdaType_Fragment>
  pageTypes: Array<{ __typename?: 'PageType' } & Type_PageType_Fragment>
  appTypes: Array<{ __typename?: 'AppType' } & Type_AppType_Fragment>
  actionTypes: Array<{ __typename?: 'ActionType' } & Type_ActionType_Fragment>
  codeMirrorTypes: Array<
    { __typename?: 'CodeMirrorType' } & Type_CodeMirrorType_Fragment
  >
}

export type CreateComponentsMutationVariables = Exact<{
  input: Array<ComponentCreateInput> | ComponentCreateInput
}>

export type CreateComponentsMutation = {
  __typename?: 'Mutation'
  createComponents: {
    __typename?: 'CreateComponentsMutationResponse'
    components: Array<{ __typename?: 'Component' } & ComponentFragment>
  }
}

export type DeleteComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}>

export type DeleteComponentsMutation = {
  __typename?: 'Mutation'
  deleteComponents: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type UpdateComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>
  update?: InputMaybe<ComponentUpdateInput>
}>

export type UpdateComponentsMutation = {
  __typename?: 'Mutation'
  updateComponents: {
    __typename?: 'UpdateComponentsMutationResponse'
    components: Array<{ __typename?: 'Component' } & ComponentFragment>
  }
}

export type GetComponentsQueryVariables = Exact<{
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}>

export type GetComponentsQuery = {
  __typename?: 'Query'
  components: Array<{ __typename?: 'Component' } & ComponentFragment>
}

export type GetDomainQueryVariables = Exact<{
  options?: InputMaybe<DomainOptions>
  where?: InputMaybe<DomainWhere>
}>

export type GetDomainQuery = {
  __typename?: 'Query'
  domains: Array<{ __typename?: 'Domain' } & DomainFragment>
}

export type CreateDomainMutationVariables = Exact<{
  input: CreateDomainMutationInput
}>

export type CreateDomainMutation = {
  __typename?: 'Mutation'
  createDomain: { __typename?: 'Domain' } & DomainFragment
}

export type UpdateDomainMutationVariables = Exact<{
  input: UpdateDomainMutationInput
}>

export type UpdateDomainMutation = {
  __typename?: 'Mutation'
  updateDomain: { __typename?: 'Domain' } & DomainFragment
}

export type DeleteDomainMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteDomainMutation = {
  __typename?: 'Mutation'
  deleteDomain: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type GetElementGraphQueryVariables = Exact<{
  input: ElementGraphInput
}>

export type GetElementGraphQuery = {
  __typename?: 'Query'
  elementGraph: { __typename?: 'ElementGraph' } & ElementGraphFragment
}

export type CreateElementsMutationVariables = Exact<{
  input: Array<ElementCreateInput> | ElementCreateInput
}>

export type CreateElementsMutation = {
  __typename?: 'Mutation'
  createElements: {
    __typename?: 'CreateElementsMutationResponse'
    elements: Array<{ __typename?: 'Element' } & ElementFragment>
  }
}

export type DeleteElementsMutationVariables = Exact<{
  where: ElementWhere
  delete?: InputMaybe<ElementDeleteInput>
}>

export type DeleteElementsMutation = {
  __typename?: 'Mutation'
  deleteElements: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type UpdateElementsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
}>

export type UpdateElementsMutation = {
  __typename?: 'Mutation'
  updateElements: {
    __typename?: 'UpdateElementsMutationResponse'
    elements: Array<{ __typename?: 'Element' } & ElementFragment>
  }
}

export type MoveElementsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
}>

export type MoveElementsMutation = {
  __typename?: 'Mutation'
  updateElements: {
    __typename?: 'UpdateElementsMutationResponse'
    elements: Array<{ __typename?: 'Element' } & ElementFragment>
  }
}

export type GetElementsQueryVariables = Exact<{
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}>

export type GetElementsQuery = {
  __typename?: 'Query'
  elements: Array<{ __typename?: 'Element' } & ElementFragment>
}

export type CreateHooksMutationVariables = Exact<{
  input: Array<HookCreateInput> | HookCreateInput
}>

export type CreateHooksMutation = {
  __typename?: 'Mutation'
  createHooks: {
    __typename?: 'CreateHooksMutationResponse'
    hooks: Array<{ __typename?: 'Hook' } & HookFragment>
  }
}

export type DeleteHooksMutationVariables = Exact<{
  where: HookWhere
}>

export type DeleteHooksMutation = {
  __typename?: 'Mutation'
  deleteHooks: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type CreatePropMapBindingsMutationVariables = Exact<{
  input: Array<PropMapBindingCreateInput> | PropMapBindingCreateInput
}>

export type CreatePropMapBindingsMutation = {
  __typename?: 'Mutation'
  createPropMapBindings: {
    __typename?: 'CreatePropMapBindingsMutationResponse'
    propMapBindings: Array<
      { __typename?: 'PropMapBinding' } & PropMapBindingFragment
    >
  }
}

export type UpdatePropMapBindingsMutationVariables = Exact<{
  where: PropMapBindingWhere
  update: PropMapBindingUpdateInput
}>

export type UpdatePropMapBindingsMutation = {
  __typename?: 'Mutation'
  updatePropMapBindings: {
    __typename?: 'UpdatePropMapBindingsMutationResponse'
    propMapBindings: Array<
      { __typename?: 'PropMapBinding' } & PropMapBindingFragment
    >
  }
}

export type DeletePropMapBindingsMutationVariables = Exact<{
  where: PropMapBindingWhere
}>

export type DeletePropMapBindingsMutation = {
  __typename?: 'Mutation'
  deletePropMapBindings: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type GetPropMapBindingsQueryVariables = Exact<{
  options?: InputMaybe<PropMapBindingOptions>
  where?: InputMaybe<PropMapBindingWhere>
}>

export type GetPropMapBindingsQuery = {
  __typename?: 'Query'
  propMapBindings: Array<
    { __typename?: 'PropMapBinding' } & PropMapBindingFragment
  >
}

export type CreatePagesMutationVariables = Exact<{
  input: Array<PageCreateInput> | PageCreateInput
}>

export type CreatePagesMutation = {
  __typename?: 'Mutation'
  createPages: {
    __typename?: 'CreatePagesMutationResponse'
    pages: Array<{ __typename?: 'Page' } & PageFragment>
  }
}

export type DeletePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>
  delete?: InputMaybe<PageDeleteInput>
}>

export type DeletePagesMutation = {
  __typename?: 'Mutation'
  deletePages: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type UpdatePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>
  update?: InputMaybe<PageUpdateInput>
}>

export type UpdatePagesMutation = {
  __typename?: 'Mutation'
  updatePages: {
    __typename?: 'UpdatePagesMutationResponse'
    pages: Array<{ __typename?: 'Page' } & PageFragment>
  }
}

export type GetPagesQueryVariables = Exact<{
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}>

export type GetPagesQuery = {
  __typename?: 'Query'
  pages: Array<{ __typename?: 'Page' } & PageFragment>
}

export type GetResourcesQueryVariables = Exact<{
  options?: InputMaybe<ResourceOptions>
  where?: InputMaybe<ResourceWhere>
}>

export type GetResourcesQuery = {
  __typename?: 'Query'
  resources: Array<{ __typename?: 'Resource' } & ResourceFragment>
}

export type CreateResourcesMutationVariables = Exact<{
  input: Array<ResourceCreateInput> | ResourceCreateInput
}>

export type CreateResourcesMutation = {
  __typename?: 'Mutation'
  createResources: {
    __typename?: 'CreateResourcesMutationResponse'
    resources: Array<{ __typename?: 'Resource' } & ResourceFragment>
  }
}

export type UpdateResourceMutationVariables = Exact<{
  where?: InputMaybe<ResourceWhere>
  update?: InputMaybe<ResourceUpdateInput>
}>

export type UpdateResourceMutation = {
  __typename?: 'Mutation'
  updateResources: {
    __typename?: 'UpdateResourcesMutationResponse'
    resources: Array<{ __typename?: 'Resource' } & ResourceFragment>
  }
}

export type DeleteResourcesMutationVariables = Exact<{
  where?: InputMaybe<ResourceWhere>
}>

export type DeleteResourcesMutation = {
  __typename?: 'Mutation'
  deleteResources: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type CreateCustomActionsMutationVariables = Exact<{
  input: Array<CustomActionCreateInput> | CustomActionCreateInput
}>

export type CreateCustomActionsMutation = {
  __typename?: 'Mutation'
  createCustomActions: {
    __typename?: 'CreateCustomActionsMutationResponse'
    customActions: Array<
      { __typename?: 'CustomAction' } & Action_CustomAction_Fragment
    >
  }
}

export type CreateResourceActionsMutationVariables = Exact<{
  input: Array<ResourceActionCreateInput> | ResourceActionCreateInput
}>

export type CreateResourceActionsMutation = {
  __typename?: 'Mutation'
  createResourceActions: {
    __typename?: 'CreateResourceActionsMutationResponse'
    resourceActions: Array<
      { __typename?: 'ResourceAction' } & Action_ResourceAction_Fragment
    >
  }
}

export type CreatePipelineActionsMutationVariables = Exact<{
  input: Array<PipelineActionCreateInput> | PipelineActionCreateInput
}>

export type CreatePipelineActionsMutation = {
  __typename?: 'Mutation'
  createPipelineActions: {
    __typename?: 'CreatePipelineActionsMutationResponse'
    pipelineActions: Array<
      { __typename?: 'PipelineAction' } & Action_PipelineAction_Fragment
    >
  }
}

export type DeleteCustomActionsMutationVariables = Exact<{
  where: CustomActionWhere
}>

export type DeleteCustomActionsMutation = {
  __typename?: 'Mutation'
  deleteCustomActions: {
    __typename?: 'DeleteInfo'
    nodesDeleted: number
    relationshipsDeleted: number
  }
}

export type DeleteResourceActionsMutationVariables = Exact<{
  where: ResourceActionWhere
}>

export type DeleteResourceActionsMutation = {
  __typename?: 'Mutation'
  deleteResourceActions: {
    __typename?: 'DeleteInfo'
    nodesDeleted: number
    relationshipsDeleted: number
  }
}

export type DeletePipelineActionsMutationVariables = Exact<{
  where: PipelineActionWhere
}>

export type DeletePipelineActionsMutation = {
  __typename?: 'Mutation'
  deletePipelineActions: {
    __typename?: 'DeleteInfo'
    nodesDeleted: number
    relationshipsDeleted: number
  }
}

export type GetActionsQueryVariables = Exact<{
  storeId?: InputMaybe<Scalars['ID']>
}>

export type GetActionsQuery = {
  __typename?: 'Query'
  customActions: Array<
    { __typename?: 'CustomAction' } & Action_CustomAction_Fragment
  >
  resourceActions: Array<
    { __typename?: 'ResourceAction' } & Action_ResourceAction_Fragment
  >
  pipelineActions: Array<
    { __typename?: 'PipelineAction' } & Action_PipelineAction_Fragment
  >
}

export type CreateStoresMutationVariables = Exact<{
  input: Array<StoreCreateInput> | StoreCreateInput
}>

export type CreateStoresMutation = {
  __typename?: 'Mutation'
  createStores: {
    __typename?: 'CreateStoresMutationResponse'
    info: {
      __typename?: 'CreateInfo'
      nodesCreated: number
      relationshipsCreated: number
    }
    stores: Array<{ __typename?: 'Store' } & StoreFragment>
  }
}

export type DeleteStoresMutationVariables = Exact<{
  where?: InputMaybe<StoreWhere>
  delete?: InputMaybe<StoreDeleteInput>
}>

export type DeleteStoresMutation = {
  __typename?: 'Mutation'
  deleteStores: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type GetStoresQueryVariables = Exact<{
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
}>

export type GetStoresQuery = {
  __typename?: 'Query'
  stores: Array<{ __typename?: 'Store' } & StoreFragment>
}

export type UpdateStoresMutationVariables = Exact<{
  where?: InputMaybe<StoreWhere>
  update?: InputMaybe<StoreUpdateInput>
}>

export type UpdateStoresMutation = {
  __typename?: 'Mutation'
  updateStores: {
    __typename?: 'UpdateStoresMutationResponse'
    stores: Array<{ __typename?: 'Store' } & StoreFragment>
  }
}

export type UpdateCustomActionsMutationVariables = Exact<{
  connect?: InputMaybe<CustomActionConnectInput>
  create?: InputMaybe<CustomActionRelationInput>
  delete?: InputMaybe<CustomActionDeleteInput>
  disconnect?: InputMaybe<CustomActionDisconnectInput>
  update?: InputMaybe<CustomActionUpdateInput>
  where?: InputMaybe<CustomActionWhere>
}>

export type UpdateCustomActionsMutation = {
  __typename?: 'Mutation'
  updateCustomActions: {
    __typename?: 'UpdateCustomActionsMutationResponse'
    customActions: Array<
      { __typename?: 'CustomAction' } & Action_CustomAction_Fragment
    >
  }
}

export type UpdateResourceActionsMutationVariables = Exact<{
  connect?: InputMaybe<ResourceActionConnectInput>
  create?: InputMaybe<ResourceActionRelationInput>
  delete?: InputMaybe<ResourceActionDeleteInput>
  disconnect?: InputMaybe<ResourceActionDisconnectInput>
  update?: InputMaybe<ResourceActionUpdateInput>
  where?: InputMaybe<ResourceActionWhere>
}>

export type UpdateResourceActionsMutation = {
  __typename?: 'Mutation'
  updateResourceActions: {
    __typename?: 'UpdateResourceActionsMutationResponse'
    resourceActions: Array<
      { __typename?: 'ResourceAction' } & Action_ResourceAction_Fragment
    >
  }
}

export type UpdatePipelineActionsMutationVariables = Exact<{
  connect?: InputMaybe<PipelineActionConnectInput>
  create?: InputMaybe<PipelineActionRelationInput>
  delete?: InputMaybe<PipelineActionDeleteInput>
  disconnect?: InputMaybe<PipelineActionDisconnectInput>
  update?: InputMaybe<PipelineActionUpdateInput>
  where?: InputMaybe<PipelineActionWhere>
}>

export type UpdatePipelineActionsMutation = {
  __typename?: 'Mutation'
  updatePipelineActions: {
    __typename?: 'UpdatePipelineActionsMutationResponse'
    pipelineActions: Array<
      { __typename?: 'PipelineAction' } & Action_PipelineAction_Fragment
    >
  }
}

export type CreateTagsMutationVariables = Exact<{
  input: Array<TagCreateInput> | TagCreateInput
}>

export type CreateTagsMutation = {
  __typename?: 'Mutation'
  createTags: {
    __typename?: 'CreateTagsMutationResponse'
    tags: Array<{ __typename?: 'Tag' } & TagFragment>
  }
}

export type UpdateTagsMutationVariables = Exact<{
  where: TagWhere
  update: TagUpdateInput
}>

export type UpdateTagsMutation = {
  __typename?: 'Mutation'
  updateTags: {
    __typename?: 'UpdateTagsMutationResponse'
    tags: Array<{ __typename?: 'Tag' } & TagFragment>
  }
}

export type DeleteTagsMutationVariables = Exact<{
  where: TagWhere
}>

export type DeleteTagsMutation = {
  __typename?: 'Mutation'
  deleteTags: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type GetTagsQueryVariables = Exact<{
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}>

export type GetTagsQuery = {
  __typename?: 'Query'
  tags: Array<{ __typename?: 'Tag' } & TagFragment>
}

export type GetTagGraphsQueryVariables = Exact<{ [key: string]: never }>

export type GetTagGraphsQuery = {
  __typename?: 'Query'
  tagGraphs: Array<{
    __typename?: 'TagGraph'
    id: string
    isRoot: boolean
    name: string
    descendants: Array<string>
  }>
}

export type CreatePrimitiveTypesMutationVariables = Exact<{
  input: Array<PrimitiveTypeCreateInput> | PrimitiveTypeCreateInput
}>

export type CreatePrimitiveTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreatePrimitiveTypesMutationResponse'
    types: Array<{ __typename?: 'PrimitiveType' } & Type_PrimitiveType_Fragment>
  }
}

export type CreateArrayTypesMutationVariables = Exact<{
  input: Array<ArrayTypeCreateInput> | ArrayTypeCreateInput
}>

export type CreateArrayTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateArrayTypesMutationResponse'
    types: Array<{ __typename?: 'ArrayType' } & Type_ArrayType_Fragment>
  }
}

export type CreateUnionTypesMutationVariables = Exact<{
  input: Array<UnionTypeCreateInput> | UnionTypeCreateInput
}>

export type CreateUnionTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateUnionTypesMutationResponse'
    types: Array<{ __typename?: 'UnionType' } & Type_UnionType_Fragment>
  }
}

export type CreateInterfaceTypesMutationVariables = Exact<{
  input: Array<InterfaceTypeCreateInput> | InterfaceTypeCreateInput
}>

export type CreateInterfaceTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateInterfaceTypesMutationResponse'
    types: Array<{ __typename?: 'InterfaceType' } & Type_InterfaceType_Fragment>
  }
}

export type CreateElementTypesMutationVariables = Exact<{
  input: Array<ElementTypeCreateInput> | ElementTypeCreateInput
}>

export type CreateElementTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateElementTypesMutationResponse'
    types: Array<{ __typename?: 'ElementType' } & Type_ElementType_Fragment>
  }
}

export type CreateRenderPropsTypesMutationVariables = Exact<{
  input: Array<RenderPropsTypeCreateInput> | RenderPropsTypeCreateInput
}>

export type CreateRenderPropsTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateRenderPropsTypesMutationResponse'
    types: Array<
      { __typename?: 'RenderPropsType' } & Type_RenderPropsType_Fragment
    >
  }
}

export type CreateReactNodeTypesMutationVariables = Exact<{
  input: Array<ReactNodeTypeCreateInput> | ReactNodeTypeCreateInput
}>

export type CreateReactNodeTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateReactNodeTypesMutationResponse'
    types: Array<{ __typename?: 'ReactNodeType' } & Type_ReactNodeType_Fragment>
  }
}

export type CreateEnumTypesMutationVariables = Exact<{
  input: Array<EnumTypeCreateInput> | EnumTypeCreateInput
}>

export type CreateEnumTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateEnumTypesMutationResponse'
    types: Array<{ __typename?: 'EnumType' } & Type_EnumType_Fragment>
  }
}

export type CreateLambdaTypesMutationVariables = Exact<{
  input: Array<LambdaTypeCreateInput> | LambdaTypeCreateInput
}>

export type CreateLambdaTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateLambdaTypesMutationResponse'
    types: Array<{ __typename?: 'LambdaType' } & Type_LambdaType_Fragment>
  }
}

export type CreatePageTypesMutationVariables = Exact<{
  input: Array<PageTypeCreateInput> | PageTypeCreateInput
}>

export type CreatePageTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreatePageTypesMutationResponse'
    types: Array<{ __typename?: 'PageType' } & Type_PageType_Fragment>
  }
}

export type CreateAppTypesMutationVariables = Exact<{
  input: Array<AppTypeCreateInput> | AppTypeCreateInput
}>

export type CreateAppTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateAppTypesMutationResponse'
    types: Array<{ __typename?: 'AppType' } & Type_AppType_Fragment>
  }
}

export type CreateActionTypesMutationVariables = Exact<{
  input: Array<ActionTypeCreateInput> | ActionTypeCreateInput
}>

export type CreateActionTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateActionTypesMutationResponse'
    types: Array<{ __typename?: 'ActionType' } & Type_ActionType_Fragment>
  }
}

export type CreateCodeMirrorTypesMutationVariables = Exact<{
  input: Array<CodeMirrorTypeCreateInput> | CodeMirrorTypeCreateInput
}>

export type CreateCodeMirrorTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'CreateCodeMirrorTypesMutationResponse'
    types: Array<
      { __typename?: 'CodeMirrorType' } & Type_CodeMirrorType_Fragment
    >
  }
}

export type DeletePrimitiveTypesMutationVariables = Exact<{
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  where?: InputMaybe<PrimitiveTypeWhere>
}>

export type DeletePrimitiveTypesMutation = {
  __typename?: 'Mutation'
  deletePrimitiveTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteArrayTypesMutationVariables = Exact<{
  delete?: InputMaybe<ArrayTypeDeleteInput>
  where?: InputMaybe<ArrayTypeWhere>
}>

export type DeleteArrayTypesMutation = {
  __typename?: 'Mutation'
  deleteArrayTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteReactNodeTypesMutationVariables = Exact<{
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
  where?: InputMaybe<ReactNodeTypeWhere>
}>

export type DeleteReactNodeTypesMutation = {
  __typename?: 'Mutation'
  deleteReactNodeTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteUnionTypesMutationVariables = Exact<{
  delete?: InputMaybe<UnionTypeDeleteInput>
  where?: InputMaybe<UnionTypeWhere>
}>

export type DeleteUnionTypesMutation = {
  __typename?: 'Mutation'
  deleteUnionTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteInterfaceTypesMutationVariables = Exact<{
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type DeleteInterfaceTypesMutation = {
  __typename?: 'Mutation'
  deleteInterfaceTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteElementTypesMutationVariables = Exact<{
  delete?: InputMaybe<ElementTypeDeleteInput>
  where?: InputMaybe<ElementTypeWhere>
}>

export type DeleteElementTypesMutation = {
  __typename?: 'Mutation'
  deleteElementTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteRenderPropsTypesMutationVariables = Exact<{
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  where?: InputMaybe<RenderPropsTypeWhere>
}>

export type DeleteRenderPropsTypesMutation = {
  __typename?: 'Mutation'
  deleteRenderPropsTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteEnumTypesMutationVariables = Exact<{
  delete?: InputMaybe<EnumTypeDeleteInput>
  where?: InputMaybe<EnumTypeWhere>
}>

export type DeleteEnumTypesMutation = {
  __typename?: 'Mutation'
  deleteEnumTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
  deleteEnumTypeValues: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type DeleteLambdaTypesMutationVariables = Exact<{
  delete?: InputMaybe<LambdaTypeDeleteInput>
  where?: InputMaybe<LambdaTypeWhere>
}>

export type DeleteLambdaTypesMutation = {
  __typename?: 'Mutation'
  deleteLambdaTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeletePageTypesMutationVariables = Exact<{
  delete?: InputMaybe<PageTypeDeleteInput>
  where?: InputMaybe<PageTypeWhere>
}>

export type DeletePageTypesMutation = {
  __typename?: 'Mutation'
  deletePageTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteAppTypesMutationVariables = Exact<{
  delete?: InputMaybe<AppTypeDeleteInput>
  where?: InputMaybe<AppTypeWhere>
}>

export type DeleteAppTypesMutation = {
  __typename?: 'Mutation'
  deleteAppTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteActionTypesMutationVariables = Exact<{
  delete?: InputMaybe<ActionTypeDeleteInput>
  where?: InputMaybe<ActionTypeWhere>
}>

export type DeleteActionTypesMutation = {
  __typename?: 'Mutation'
  deleteActionTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type DeleteCodeMirrorTypesMutationVariables = Exact<{
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
  where?: InputMaybe<CodeMirrorTypeWhere>
}>

export type DeleteCodeMirrorTypesMutation = {
  __typename?: 'Mutation'
  deleteCodeMirrorTypes: {
    __typename?: 'DeleteInfo'
    relationshipsDeleted: number
    nodesDeleted: number
  }
}

export type UpsertFieldMutationVariables = Exact<{
  interfaceTypeId: Scalars['ID']
  fieldTypeId: Scalars['ID']
  field: FieldCreateInput
}>

export type UpsertFieldMutation = {
  __typename?: 'Mutation'
  upsertField: { __typename?: 'InterfaceType' } & InterfaceTypeFragment
}

export type DeleteFieldMutationVariables = Exact<{
  interfaceId: Scalars['ID']
  where: FieldWhere
}>

export type DeleteFieldMutation = {
  __typename?: 'Mutation'
  updateInterfaceTypes: {
    __typename?: 'UpdateInterfaceTypesMutationResponse'
    interfaceTypes: Array<
      { __typename?: 'InterfaceType' } & InterfaceTypeFragment
    >
  }
}

export type GetTypesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type GetTypesQuery = {
  __typename?: 'Query'
  primitiveTypes: Array<
    { __typename?: 'PrimitiveType' } & Type_PrimitiveType_Fragment
  >
  arrayTypes: Array<{ __typename?: 'ArrayType' } & Type_ArrayType_Fragment>
  unionTypes: Array<{ __typename?: 'UnionType' } & Type_UnionType_Fragment>
  interfaceTypes: Array<
    { __typename?: 'InterfaceType' } & Type_InterfaceType_Fragment
  >
  elementTypes: Array<
    { __typename?: 'ElementType' } & Type_ElementType_Fragment
  >
  renderPropsTypes: Array<
    { __typename?: 'RenderPropsType' } & Type_RenderPropsType_Fragment
  >
  reactNodeTypes: Array<
    { __typename?: 'ReactNodeType' } & Type_ReactNodeType_Fragment
  >
  enumTypes: Array<{ __typename?: 'EnumType' } & Type_EnumType_Fragment>
  lambdaTypes: Array<{ __typename?: 'LambdaType' } & Type_LambdaType_Fragment>
  pageTypes: Array<{ __typename?: 'PageType' } & Type_PageType_Fragment>
  appTypes: Array<{ __typename?: 'AppType' } & Type_AppType_Fragment>
  actionTypes: Array<{ __typename?: 'ActionType' } & Type_ActionType_Fragment>
  codeMirrorTypes: Array<
    { __typename?: 'CodeMirrorType' } & Type_CodeMirrorType_Fragment
  >
}

export type GetDescendantsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type GetDescendantsQuery = {
  __typename?: 'Query'
  arrayTypes: Array<{
    __typename?: 'ArrayType'
    descendantTypesIds: Array<string>
  }>
  unionTypes: Array<{
    __typename?: 'UnionType'
    descendantTypesIds: Array<string>
  }>
  interfaceTypes: Array<{
    __typename?: 'InterfaceType'
    descendantTypesIds: Array<string>
  }>
}

export type GetPrimitiveTypesQueryVariables = Exact<{
  options?: InputMaybe<PrimitiveTypeOptions>
  where?: InputMaybe<PrimitiveTypeWhere>
}>

export type GetPrimitiveTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'PrimitiveType' } & Type_PrimitiveType_Fragment>
}

export type GetArrayTypesQueryVariables = Exact<{
  options?: InputMaybe<ArrayTypeOptions>
  where?: InputMaybe<ArrayTypeWhere>
}>

export type GetArrayTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'ArrayType' } & Type_ArrayType_Fragment>
}

export type GetUnionTypesQueryVariables = Exact<{
  options?: InputMaybe<UnionTypeOptions>
  where?: InputMaybe<UnionTypeWhere>
}>

export type GetUnionTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'UnionType' } & Type_UnionType_Fragment>
}

export type GetInterfaceTypesQueryVariables = Exact<{
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type GetInterfaceTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'InterfaceType' } & Type_InterfaceType_Fragment>
}

export type GetElementTypesQueryVariables = Exact<{
  options?: InputMaybe<ElementTypeOptions>
  where?: InputMaybe<ElementTypeWhere>
}>

export type GetElementTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'ElementType' } & Type_ElementType_Fragment>
}

export type GetRenderPropsTypesQueryVariables = Exact<{
  options?: InputMaybe<RenderPropsTypeOptions>
  where?: InputMaybe<RenderPropsTypeWhere>
}>

export type GetRenderPropsTypesQuery = {
  __typename?: 'Query'
  types: Array<
    { __typename?: 'RenderPropsType' } & Type_RenderPropsType_Fragment
  >
}

export type GetReactNodeTypesQueryVariables = Exact<{
  options?: InputMaybe<ReactNodeTypeOptions>
  where?: InputMaybe<ReactNodeTypeWhere>
}>

export type GetReactNodeTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'ReactNodeType' } & ReactNodeTypeFragment>
}

export type GetEnumTypesQueryVariables = Exact<{
  options?: InputMaybe<EnumTypeOptions>
  where?: InputMaybe<EnumTypeWhere>
}>

export type GetEnumTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'EnumType' } & Type_EnumType_Fragment>
}

export type GetLambdaTypesQueryVariables = Exact<{
  options?: InputMaybe<LambdaTypeOptions>
  where?: InputMaybe<LambdaTypeWhere>
}>

export type GetLambdaTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'LambdaType' } & Type_LambdaType_Fragment>
}

export type GetPageTypesQueryVariables = Exact<{
  options?: InputMaybe<PageTypeOptions>
  where?: InputMaybe<PageTypeWhere>
}>

export type GetPageTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'PageType' } & Type_PageType_Fragment>
}

export type GetAppTypesQueryVariables = Exact<{
  options?: InputMaybe<AppTypeOptions>
  where?: InputMaybe<AppTypeWhere>
}>

export type GetAppTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'AppType' } & Type_AppType_Fragment>
}

export type GetActionTypesQueryVariables = Exact<{
  options?: InputMaybe<ActionTypeOptions>
  where?: InputMaybe<ActionTypeWhere>
}>

export type GetActionTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'ActionType' } & Type_ActionType_Fragment>
}

export type GetCodeMirrorTypesQueryVariables = Exact<{
  options?: InputMaybe<CodeMirrorTypeOptions>
  where?: InputMaybe<CodeMirrorTypeWhere>
}>

export type GetCodeMirrorTypesQuery = {
  __typename?: 'Query'
  types: Array<{ __typename?: 'CodeMirrorType' } & Type_CodeMirrorType_Fragment>
}

export type InterfaceForm_GetAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}>

export type InterfaceForm_GetAppsQuery = {
  __typename?: 'Query'
  apps: Array<{ __typename?: 'App'; id: string; name: string }>
}

export type InterfaceForm_GetAtomsQueryVariables = Exact<{
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}>

export type InterfaceForm_GetAtomsQuery = {
  __typename?: 'Query'
  atoms: Array<{
    __typename?: 'Atom'
    id: string
    name: string
    type: AtomType
  }>
}

export type InterfaceForm_GetStoresQueryVariables = Exact<{
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}>

export type InterfaceForm_GetStoresQuery = {
  __typename?: 'Query'
  stores: Array<{ __typename?: 'Store'; id: string; name: string }>
}

export type InterfaceForm_GetResourceQueryVariables = Exact<{
  options?: InputMaybe<ResourceOptions>
  where?: InputMaybe<ResourceWhere>
}>

export type InterfaceForm_GetResourceQuery = {
  __typename?: 'Query'
  resources: Array<{ __typename?: 'Resource'; id: string; name: string }>
}

export type InterfaceForm_GetComponentsQueryVariables = Exact<{
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}>

export type InterfaceForm_GetComponentsQuery = {
  __typename?: 'Query'
  components: Array<{
    __typename?: 'Component'
    id: string
    name: string
    descendantComponentIds: Array<string>
  }>
}

export type InterfaceForm_GetPagesQueryVariables = Exact<{
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}>

export type InterfaceForm_GetPagesQuery = {
  __typename?: 'Query'
  pages: Array<{ __typename?: 'Page'; id: string; name: string }>
}

export type IsTypeDescendantOfQueryVariables = Exact<{
  descendantTypeId: Scalars['ID']
  parentTypeId: Scalars['ID']
}>

export type IsTypeDescendantOfQuery = {
  __typename?: 'Query'
  isTypeDescendantOf?: boolean | null
}

export type GetTypeReferencesQueryVariables = Exact<{
  typeId: Scalars['ID']
}>

export type GetTypeReferencesQuery = {
  __typename?: 'Query'
  getTypeReferences?: Array<{
    __typename?: 'TypeReference'
    name: string
    label: string
  }> | null
}

export type UpdatePrimitiveTypesMutationVariables = Exact<{
  connect?: InputMaybe<PrimitiveTypeConnectInput>
  create?: InputMaybe<PrimitiveTypeRelationInput>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>
  update?: InputMaybe<PrimitiveTypeUpdateInput>
  where?: InputMaybe<PrimitiveTypeWhere>
}>

export type UpdatePrimitiveTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdatePrimitiveTypesMutationResponse'
    types: Array<{ __typename?: 'PrimitiveType' } & Type_PrimitiveType_Fragment>
  }
}

export type UpdateArrayTypesMutationVariables = Exact<{
  connect?: InputMaybe<ArrayTypeConnectInput>
  create?: InputMaybe<ArrayTypeRelationInput>
  delete?: InputMaybe<ArrayTypeDeleteInput>
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>
  update?: InputMaybe<ArrayTypeUpdateInput>
  where?: InputMaybe<ArrayTypeWhere>
}>

export type UpdateArrayTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateArrayTypesMutationResponse'
    types: Array<{ __typename?: 'ArrayType' } & Type_ArrayType_Fragment>
  }
}

export type UpdateUnionTypesMutationVariables = Exact<{
  connect?: InputMaybe<UnionTypeConnectInput>
  create?: InputMaybe<UnionTypeRelationInput>
  delete?: InputMaybe<UnionTypeDeleteInput>
  disconnect?: InputMaybe<UnionTypeDisconnectInput>
  update?: InputMaybe<UnionTypeUpdateInput>
  where?: InputMaybe<UnionTypeWhere>
}>

export type UpdateUnionTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateUnionTypesMutationResponse'
    types: Array<{ __typename?: 'UnionType' } & Type_UnionType_Fragment>
  }
}

export type UpdateInterfaceTypesMutationVariables = Exact<{
  connect?: InputMaybe<InterfaceTypeConnectInput>
  create?: InputMaybe<InterfaceTypeRelationInput>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  update?: InputMaybe<InterfaceTypeUpdateInput>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type UpdateInterfaceTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateInterfaceTypesMutationResponse'
    types: Array<{ __typename?: 'InterfaceType' } & Type_InterfaceType_Fragment>
  }
}

export type UpdateReactNodeTypesMutationVariables = Exact<{
  connect?: InputMaybe<ReactNodeTypeConnectInput>
  create?: InputMaybe<ReactNodeTypeRelationInput>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>
  update?: InputMaybe<ReactNodeTypeUpdateInput>
  where?: InputMaybe<ReactNodeTypeWhere>
}>

export type UpdateReactNodeTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateReactNodeTypesMutationResponse'
    types: Array<{ __typename?: 'ReactNodeType' } & Type_ReactNodeType_Fragment>
  }
}

export type UpdateElementTypesMutationVariables = Exact<{
  connect?: InputMaybe<ElementTypeConnectInput>
  create?: InputMaybe<ElementTypeRelationInput>
  delete?: InputMaybe<ElementTypeDeleteInput>
  disconnect?: InputMaybe<ElementTypeDisconnectInput>
  update?: InputMaybe<ElementTypeUpdateInput>
  where?: InputMaybe<ElementTypeWhere>
}>

export type UpdateElementTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateElementTypesMutationResponse'
    types: Array<{ __typename?: 'ElementType' } & Type_ElementType_Fragment>
  }
}

export type UpdateRenderPropsTypesMutationVariables = Exact<{
  connect?: InputMaybe<RenderPropsTypeConnectInput>
  create?: InputMaybe<RenderPropsTypeRelationInput>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>
  update?: InputMaybe<RenderPropsTypeUpdateInput>
  where?: InputMaybe<RenderPropsTypeWhere>
}>

export type UpdateRenderPropsTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateRenderPropsTypesMutationResponse'
    types: Array<
      { __typename?: 'RenderPropsType' } & Type_RenderPropsType_Fragment
    >
  }
}

export type UpdateEnumTypesMutationVariables = Exact<{
  connect?: InputMaybe<EnumTypeConnectInput>
  create?: InputMaybe<EnumTypeRelationInput>
  delete?: InputMaybe<EnumTypeDeleteInput>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
  update?: InputMaybe<EnumTypeUpdateInput>
  where?: InputMaybe<EnumTypeWhere>
}>

export type UpdateEnumTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateEnumTypesMutationResponse'
    types: Array<{ __typename?: 'EnumType' } & Type_EnumType_Fragment>
  }
}

export type UpdateLambdaTypesMutationVariables = Exact<{
  connect?: InputMaybe<LambdaTypeConnectInput>
  create?: InputMaybe<LambdaTypeRelationInput>
  delete?: InputMaybe<LambdaTypeDeleteInput>
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>
  update?: InputMaybe<LambdaTypeUpdateInput>
  where?: InputMaybe<LambdaTypeWhere>
}>

export type UpdateLambdaTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateLambdaTypesMutationResponse'
    types: Array<{ __typename?: 'LambdaType' } & Type_LambdaType_Fragment>
  }
}

export type UpdatePageTypesMutationVariables = Exact<{
  connect?: InputMaybe<PageTypeConnectInput>
  create?: InputMaybe<PageTypeRelationInput>
  delete?: InputMaybe<PageTypeDeleteInput>
  disconnect?: InputMaybe<PageTypeDisconnectInput>
  update?: InputMaybe<PageTypeUpdateInput>
  where?: InputMaybe<PageTypeWhere>
}>

export type UpdatePageTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdatePageTypesMutationResponse'
    types: Array<{ __typename?: 'PageType' } & Type_PageType_Fragment>
  }
}

export type UpdateAppTypesMutationVariables = Exact<{
  connect?: InputMaybe<AppTypeConnectInput>
  create?: InputMaybe<AppTypeRelationInput>
  delete?: InputMaybe<AppTypeDeleteInput>
  disconnect?: InputMaybe<AppTypeDisconnectInput>
  update?: InputMaybe<AppTypeUpdateInput>
  where?: InputMaybe<AppTypeWhere>
}>

export type UpdateAppTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateAppTypesMutationResponse'
    types: Array<{ __typename?: 'AppType' } & Type_AppType_Fragment>
  }
}

export type UpdateActionTypesMutationVariables = Exact<{
  connect?: InputMaybe<ActionTypeConnectInput>
  create?: InputMaybe<ActionTypeRelationInput>
  delete?: InputMaybe<ActionTypeDeleteInput>
  disconnect?: InputMaybe<ActionTypeDisconnectInput>
  update?: InputMaybe<ActionTypeUpdateInput>
  where?: InputMaybe<ActionTypeWhere>
}>

export type UpdateActionTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateActionTypesMutationResponse'
    types: Array<{ __typename?: 'ActionType' } & Type_ActionType_Fragment>
  }
}

export type UpdateCodeMirrorTypesMutationVariables = Exact<{
  connect?: InputMaybe<CodeMirrorTypeConnectInput>
  create?: InputMaybe<CodeMirrorTypeRelationInput>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>
  update?: InputMaybe<CodeMirrorTypeUpdateInput>
  where?: InputMaybe<CodeMirrorTypeWhere>
}>

export type UpdateCodeMirrorTypesMutation = {
  __typename?: 'Mutation'
  types: {
    __typename?: 'UpdateCodeMirrorTypesMutationResponse'
    types: Array<
      { __typename?: 'CodeMirrorType' } & Type_CodeMirrorType_Fragment
    >
  }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User' } & UserFragment>
}

type ActionBase_CustomAction_Fragment = {
  __typename: 'CustomAction'
  id: string
  name: string
  type: ActionKind
  runOnInit: boolean
  store: { __typename?: 'Store'; id: string; name: string }
}

type ActionBase_PipelineAction_Fragment = {
  __typename: 'PipelineAction'
  id: string
  name: string
  type: ActionKind
  runOnInit: boolean
  store: { __typename?: 'Store'; id: string; name: string }
}

type ActionBase_ResourceAction_Fragment = {
  __typename: 'ResourceAction'
  id: string
  name: string
  type: ActionKind
  runOnInit: boolean
  store: { __typename?: 'Store'; id: string; name: string }
}

export type ActionBaseFragment =
  | ActionBase_CustomAction_Fragment
  | ActionBase_PipelineAction_Fragment
  | ActionBase_ResourceAction_Fragment

type Action_CustomAction_Fragment = {
  __typename?: 'CustomAction'
} & CustomActionFragment &
  ActionBase_CustomAction_Fragment

type Action_PipelineAction_Fragment = {
  __typename?: 'PipelineAction'
} & PipelineActionFragment &
  ActionBase_PipelineAction_Fragment

type Action_ResourceAction_Fragment = {
  __typename?: 'ResourceAction'
} & ResourceActionFragment &
  ActionBase_ResourceAction_Fragment

export type ActionFragment =
  | Action_CustomAction_Fragment
  | Action_PipelineAction_Fragment
  | Action_ResourceAction_Fragment

export type CustomActionFragment = {
  __typename?: 'CustomAction'
  code: string
} & ActionBase_CustomAction_Fragment

export type PipelineActionFragment = {
  __typename?: 'PipelineAction'
  actions: Array<
    | { __typename?: 'CustomAction'; id: string }
    | { __typename?: 'PipelineAction'; id: string }
    | { __typename?: 'ResourceAction'; id: string }
  >
} & ActionBase_PipelineAction_Fragment

export type ResourceActionFragment = {
  __typename?: 'ResourceAction'
  successAction:
    | ({ __typename?: 'CustomAction' } & ActionBase_CustomAction_Fragment)
    | ({ __typename?: 'PipelineAction' } & ActionBase_PipelineAction_Fragment)
    | ({ __typename?: 'ResourceAction' } & ActionBase_ResourceAction_Fragment)
  errorAction:
    | ({ __typename?: 'CustomAction' } & ActionBase_CustomAction_Fragment)
    | ({ __typename?: 'PipelineAction' } & ActionBase_PipelineAction_Fragment)
    | ({ __typename?: 'ResourceAction' } & ActionBase_ResourceAction_Fragment)
  resource: { __typename?: 'Resource' } & ResourceFragment
  config: { __typename?: 'Prop'; id: string; data: string }
} & ActionBase_ResourceAction_Fragment

export type RedirectedAppFragment = {
  __typename?: 'App'
  id: string
  name: string
  slug: string
  owner: { __typename?: 'User'; username: string }
}

export type AppPreviewFragment = {
  __typename?: 'App'
  id: string
  name: string
  slug: string
  owner: { __typename?: 'User'; id: string }
  pages: Array<{ __typename?: 'Page' } & PageFragment>
  store: { __typename?: 'Store'; id: string }
}

export type AppFragment = {
  __typename?: 'App'
  id: string
  name: string
  slug: string
  owner: { __typename?: 'User'; id: string }
  pages: Array<{ __typename?: 'Page' } & PageFragment>
  store: { __typename?: 'Store'; id: string }
}

export type PageBuilderAppFragment = {
  __typename?: 'App'
  id: string
  name: string
  slug: string
  owner: { __typename?: 'User'; id: string }
  pages: Array<{
    __typename?: 'Page'
    id: string
    name: string
    slug: string
    rootElement: {
      __typename?: 'Element'
      descendantElements?: Array<
        { __typename?: 'Element' } & ElementFragment
      > | null
    } & ElementFragment
    app: { __typename?: 'App'; id: string }
  }>
  store: { __typename?: 'Store' } & StoreFragment
}

export type AtomFragment = {
  __typename?: 'Atom'
  icon?: string | null
  id: string
  name: string
  type: AtomType
  tags: Array<{ __typename?: 'Tag'; id: string; name: string }>
  api: { __typename?: 'InterfaceType'; id: string; name: string }
}

export type ComponentFragment = {
  __typename?: 'Component'
  id: string
  name: string
  rootElement: { __typename?: 'Element'; id: string; name?: string | null }
  owner: { __typename?: 'User'; id: string; auth0Id: string }
  api: { __typename?: 'InterfaceType'; id: string; name: string }
}

export type DomainFragment = {
  __typename?: 'Domain'
  id: string
  name: string
  domainConfig: {
    __typename?: 'VercelDomainConfigData'
    misconfigured: boolean
  }
  projectDomain: { __typename?: 'VercelProjectDomainData'; verified: boolean }
}

export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null
  customCss?: string | null
  guiCss?: string | null
  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
  preRenderActionId?: string | null
  postRenderActionId?: string | null
  propTransformationJs?: string | null
  component?: ({ __typename?: 'Component' } & ComponentFragment) | null
  instanceOfComponent?:
    | ({ __typename?: 'Component' } & ComponentFragment)
    | null
  prevSibling?: { __typename?: 'Element'; id: string } | null
  nextSibling?: { __typename?: 'Element'; id: string } | null
  parentElement?: { __typename?: 'Element'; id: string } | null
  childrenRoot?: { __typename?: 'Element'; id: string } | null
  atom?: ({ __typename?: 'Atom' } & AtomFragment) | null
  props?: ({ __typename?: 'Prop' } & PropFragment) | null
  hooks: Array<{ __typename?: 'Hook' } & HookFragment>
  propMapBindings: Array<
    { __typename?: 'PropMapBinding' } & PropMapBindingFragment
  >
  parentElementConnection: {
    __typename?: 'ElementParentElementConnection'
    edges: Array<{
      __typename?: 'ElementParentElementRelationship'
      node: { __typename?: 'Element'; id: string; name?: string | null }
    }>
  }
}

export type ElementGraphFragment = {
  __typename?: 'ElementGraph'
  id: string
  descendants: Array<string>
}

export type HookPropFragment = { __typename?: 'Prop'; id: string; data: string }

export type HookFragment = {
  __typename?: 'Hook'
  id: string
  type: AtomType
  config: { __typename?: 'Prop' } & HookPropFragment
  element: { __typename?: 'Element'; id: string; name?: string | null }
}

export type PageFragment = {
  __typename?: 'Page'
  id: string
  name: string
  slug: string
  app: { __typename?: 'App'; id: string }
  rootElement: { __typename?: 'Element'; id: string; name?: string | null }
}

export type PropFragment = { __typename?: 'Prop'; id: string; data: string }

export type PropMapBindingFragment = {
  __typename?: 'PropMapBinding'
  id: string
  sourceKey: string
  targetKey: string
  element: { __typename?: 'Element'; id: string; name?: string | null }
  targetElement?: {
    __typename?: 'Element'
    id: string
    name?: string | null
  } | null
}

export type ResourceFragment = {
  __typename: 'Resource'
  id: string
  name: string
  type: ResourceType
  config: { __typename?: 'Prop' } & PropFragment
}

export type StoreFragment = {
  __typename?: 'Store'
  id: string
  name: string
  stateApi: { __typename?: 'InterfaceType'; id: string; name: string }
  state: { __typename?: 'Prop' } & PropFragment
  actions: Array<
    | ({ __typename?: 'CustomAction' } & Action_CustomAction_Fragment)
    | ({ __typename?: 'PipelineAction' } & Action_PipelineAction_Fragment)
    | ({ __typename?: 'ResourceAction' } & Action_ResourceAction_Fragment)
  >
}

export type TagFragment = {
  __typename?: 'Tag'
  id: string
  name: string
  isRoot?: boolean | null
  parent?: { __typename?: 'Tag'; id: string } | null
  children: Array<{ __typename?: 'Tag'; id: string }>
}

export type ActionTypeFragment = {
  __typename?: 'ActionType'
} & TypeBase_ActionType_Fragment

export type AppTypeFragment = {
  __typename?: 'AppType'
} & TypeBase_AppType_Fragment

export type ArrayTypeFragment = {
  __typename?: 'ArrayType'
  itemType:
    | { __typename?: 'ActionType'; id: string; name: string }
    | { __typename?: 'AppType'; id: string; name: string }
    | { __typename?: 'ArrayType'; id: string; name: string }
    | { __typename?: 'CodeMirrorType'; id: string; name: string }
    | { __typename?: 'ElementType'; id: string; name: string }
    | { __typename?: 'EnumType'; id: string; name: string }
    | { __typename?: 'InterfaceType'; id: string; name: string }
    | { __typename?: 'LambdaType'; id: string; name: string }
    | { __typename?: 'PageType'; id: string; name: string }
    | { __typename?: 'PrimitiveType'; id: string; name: string }
    | { __typename?: 'ReactNodeType'; id: string; name: string }
    | { __typename?: 'RenderPropsType'; id: string; name: string }
    | { __typename?: 'UnionType'; id: string; name: string }
} & TypeBase_ArrayType_Fragment

export type CodeMirrorTypeFragment = {
  __typename?: 'CodeMirrorType'
  language: CodeMirrorLanguage
} & TypeBase_CodeMirrorType_Fragment

export type ElementTypeFragment = {
  __typename?: 'ElementType'
  elementKind: ElementTypeKind
} & TypeBase_ElementType_Fragment

export type EnumTypeValueFragment = {
  __typename?: 'EnumTypeValue'
  id: string
  name?: string | null
  value: string
}

export type EnumTypeFragment = {
  __typename?: 'EnumType'
  allowedValues: Array<{ __typename?: 'EnumTypeValue' } & EnumTypeValueFragment>
} & TypeBase_EnumType_Fragment

export type FieldFragment = {
  __typename?: 'InterfaceTypeFieldsRelationship'
  id: string
  key: string
  name?: string | null
  description?: string | null
  fieldType:
    | { __typename?: 'ActionType'; id: string }
    | { __typename?: 'AppType'; id: string }
    | { __typename?: 'ArrayType'; id: string }
    | { __typename?: 'CodeMirrorType'; id: string }
    | { __typename?: 'ElementType'; id: string }
    | { __typename?: 'EnumType'; id: string }
    | { __typename?: 'InterfaceType'; id: string }
    | { __typename?: 'LambdaType'; id: string }
    | { __typename?: 'PageType'; id: string }
    | { __typename?: 'PrimitiveType'; id: string }
    | { __typename?: 'ReactNodeType'; id: string }
    | { __typename?: 'RenderPropsType'; id: string }
    | { __typename?: 'UnionType'; id: string }
}

export type InterfaceTypeFragment = {
  __typename?: 'InterfaceType'
  fieldsConnection: {
    __typename?: 'InterfaceTypeFieldsConnection'
    edges: Array<
      { __typename?: 'InterfaceTypeFieldsRelationship' } & FieldFragment
    >
  }
} & TypeBase_InterfaceType_Fragment

export type LambdaTypeFragment = {
  __typename?: 'LambdaType'
} & TypeBase_LambdaType_Fragment

export type PageTypeFragment = {
  __typename?: 'PageType'
} & TypeBase_PageType_Fragment

export type PrimitiveTypeFragment = {
  __typename?: 'PrimitiveType'
  primitiveKind: PrimitiveTypeKind
} & TypeBase_PrimitiveType_Fragment

export type ReactNodeTypeFragment = {
  __typename?: 'ReactNodeType'
} & TypeBase_ReactNodeType_Fragment

export type RenderPropsTypeFragment = {
  __typename?: 'RenderPropsType'
} & TypeBase_RenderPropsType_Fragment

type TypeBase_ActionType_Fragment = {
  __typename: 'ActionType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_AppType_Fragment = {
  __typename: 'AppType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_ArrayType_Fragment = {
  __typename: 'ArrayType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_CodeMirrorType_Fragment = {
  __typename: 'CodeMirrorType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_ElementType_Fragment = {
  __typename: 'ElementType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_EnumType_Fragment = {
  __typename: 'EnumType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_LambdaType_Fragment = {
  __typename: 'LambdaType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_PageType_Fragment = {
  __typename: 'PageType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_PrimitiveType_Fragment = {
  __typename: 'PrimitiveType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_ReactNodeType_Fragment = {
  __typename: 'ReactNodeType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_RenderPropsType_Fragment = {
  __typename: 'RenderPropsType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

type TypeBase_UnionType_Fragment = {
  __typename: 'UnionType'
  kind: TypeKind
  id: string
  name: string
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

export type TypeBaseFragment =
  | TypeBase_ActionType_Fragment
  | TypeBase_AppType_Fragment
  | TypeBase_ArrayType_Fragment
  | TypeBase_CodeMirrorType_Fragment
  | TypeBase_ElementType_Fragment
  | TypeBase_EnumType_Fragment
  | TypeBase_InterfaceType_Fragment
  | TypeBase_LambdaType_Fragment
  | TypeBase_PageType_Fragment
  | TypeBase_PrimitiveType_Fragment
  | TypeBase_ReactNodeType_Fragment
  | TypeBase_RenderPropsType_Fragment
  | TypeBase_UnionType_Fragment

type Type_ActionType_Fragment = {
  __typename?: 'ActionType'
} & TypeBase_ActionType_Fragment &
  ActionTypeFragment

type Type_AppType_Fragment = {
  __typename?: 'AppType'
} & TypeBase_AppType_Fragment &
  AppTypeFragment

type Type_ArrayType_Fragment = {
  __typename?: 'ArrayType'
} & TypeBase_ArrayType_Fragment &
  ArrayTypeFragment

type Type_CodeMirrorType_Fragment = {
  __typename?: 'CodeMirrorType'
} & TypeBase_CodeMirrorType_Fragment &
  CodeMirrorTypeFragment

type Type_ElementType_Fragment = {
  __typename?: 'ElementType'
} & TypeBase_ElementType_Fragment &
  ElementTypeFragment

type Type_EnumType_Fragment = {
  __typename?: 'EnumType'
} & TypeBase_EnumType_Fragment &
  EnumTypeFragment

type Type_InterfaceType_Fragment = {
  __typename?: 'InterfaceType'
} & TypeBase_InterfaceType_Fragment &
  InterfaceTypeFragment

type Type_LambdaType_Fragment = {
  __typename?: 'LambdaType'
} & TypeBase_LambdaType_Fragment &
  LambdaTypeFragment

type Type_PageType_Fragment = {
  __typename?: 'PageType'
} & TypeBase_PageType_Fragment &
  PageTypeFragment

type Type_PrimitiveType_Fragment = {
  __typename?: 'PrimitiveType'
} & TypeBase_PrimitiveType_Fragment &
  PrimitiveTypeFragment

type Type_ReactNodeType_Fragment = {
  __typename?: 'ReactNodeType'
} & TypeBase_ReactNodeType_Fragment

type Type_RenderPropsType_Fragment = {
  __typename?: 'RenderPropsType'
} & TypeBase_RenderPropsType_Fragment &
  RenderPropsTypeFragment

type Type_UnionType_Fragment = {
  __typename?: 'UnionType'
} & TypeBase_UnionType_Fragment &
  UnionTypeFragment

export type TypeFragment =
  | Type_ActionType_Fragment
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_CodeMirrorType_Fragment
  | Type_ElementType_Fragment
  | Type_EnumType_Fragment
  | Type_InterfaceType_Fragment
  | Type_LambdaType_Fragment
  | Type_PageType_Fragment
  | Type_PrimitiveType_Fragment
  | Type_ReactNodeType_Fragment
  | Type_RenderPropsType_Fragment
  | Type_UnionType_Fragment

export type UnionTypeFragment = {
  __typename?: 'UnionType'
  typesOfUnionType: Array<
    | { __typename?: 'ActionType'; id: string; name: string }
    | { __typename?: 'AppType'; id: string; name: string }
    | { __typename?: 'ArrayType'; id: string; name: string }
    | { __typename?: 'CodeMirrorType'; id: string; name: string }
    | { __typename?: 'ElementType'; id: string; name: string }
    | { __typename?: 'EnumType'; id: string; name: string }
    | { __typename?: 'InterfaceType'; id: string; name: string }
    | { __typename?: 'LambdaType'; id: string; name: string }
    | { __typename?: 'PageType'; id: string; name: string }
    | { __typename?: 'PrimitiveType'; id: string; name: string }
    | { __typename?: 'ReactNodeType'; id: string; name: string }
    | { __typename?: 'RenderPropsType'; id: string; name: string }
    | { __typename?: 'UnionType'; id: string; name: string }
  >
} & TypeBase_UnionType_Fragment

export type UserFragment = {
  __typename?: 'User'
  id: string
  username: string
  email: string
  auth0Id: string
  roles: Array<Role>
  apps: Array<{ __typename?: 'App' } & AppFragment>
}
