import type { SelectionSetNode, DocumentNode } from 'graphql'
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
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number
}

export type Query = {
  __typename?: 'Query'
  baseTypes: Array<BaseType>
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
  resetDatabaseMutationResponsesAggregate: ResetDatabaseMutationResponseAggregateSelection
  resetDatabaseMutationResponsesConnection: ResetDatabaseMutationResponsesConnection
  users: Array<User>
  usersAggregate: UserAggregateSelection
  usersConnection: UsersConnection
  apps: Array<App>
  appsAggregate: AppAggregateSelection
  appsConnection: AppsConnection
  fields: Array<Field>
  fieldsAggregate: FieldAggregateSelection
  fieldsConnection: FieldsConnection
  atoms: Array<Atom>
  atomsAggregate: AtomAggregateSelection
  atomsConnection: AtomsConnection
  createInfos: Array<CreateInfo>
  createInfosAggregate: CreateInfoAggregateSelection
  createInfosConnection: CreateInfosConnection
  pages: Array<Page>
  pagesAggregate: PageAggregateSelection
  pagesConnection: PagesConnection
  typeReferences: Array<TypeReference>
  typeReferencesAggregate: TypeReferenceAggregateSelection
  typeReferencesConnection: TypeReferencesConnection
  getBaseTypesReturns: Array<GetBaseTypesReturn>
  getBaseTypesReturnsAggregate: GetBaseTypesReturnAggregateSelection
  getBaseTypesReturnsConnection: GetBaseTypesReturnsConnection
  baseTypesAggregate: BaseTypeAggregateSelection
  baseTypesConnection: BaseTypesConnection
  primitiveTypes: Array<PrimitiveType>
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection
  primitiveTypesConnection: PrimitiveTypesConnection
  arrayTypes: Array<ArrayType>
  arrayTypesAggregate: ArrayTypeAggregateSelection
  arrayTypesConnection: ArrayTypesConnection
  unionTypes: Array<UnionType>
  unionTypesAggregate: UnionTypeAggregateSelection
  unionTypesConnection: UnionTypesConnection
  interfaceTypes: Array<InterfaceType>
  interfaceTypesAggregate: InterfaceTypeAggregateSelection
  interfaceTypesConnection: InterfaceTypesConnection
  elementTypes: Array<ElementType>
  elementTypesAggregate: ElementTypeAggregateSelection
  elementTypesConnection: ElementTypesConnection
  renderPropsTypes: Array<RenderPropsType>
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection
  renderPropsTypesConnection: RenderPropsTypesConnection
  reactNodeTypes: Array<ReactNodeType>
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection
  reactNodeTypesConnection: ReactNodeTypesConnection
  enumTypes: Array<EnumType>
  enumTypesAggregate: EnumTypeAggregateSelection
  enumTypesConnection: EnumTypesConnection
  enumTypeValues: Array<EnumTypeValue>
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection
  enumTypeValuesConnection: EnumTypeValuesConnection
  lambdaTypes: Array<LambdaType>
  lambdaTypesAggregate: LambdaTypeAggregateSelection
  lambdaTypesConnection: LambdaTypesConnection
  pageTypes: Array<PageType>
  pageTypesAggregate: PageTypeAggregateSelection
  pageTypesConnection: PageTypesConnection
  appTypes: Array<AppType>
  appTypesAggregate: AppTypeAggregateSelection
  appTypesConnection: AppTypesConnection
  actionTypes: Array<ActionType>
  actionTypesAggregate: ActionTypeAggregateSelection
  actionTypesConnection: ActionTypesConnection
  codeMirrorTypes: Array<CodeMirrorType>
  codeMirrorTypesAggregate: CodeMirrorTypeAggregateSelection
  codeMirrorTypesConnection: CodeMirrorTypesConnection
  tags: Array<Tag>
  tagsAggregate: TagAggregateSelection
  tagsConnection: TagsConnection
  elements: Array<Element>
  elementsAggregate: ElementAggregateSelection
  elementsConnection: ElementsConnection
  props: Array<Prop>
  propsAggregate: PropAggregateSelection
  propsConnection: PropsConnection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate: PropMapBindingAggregateSelection
  propMapBindingsConnection: PropMapBindingsConnection
  hooks: Array<Hook>
  hooksAggregate: HookAggregateSelection
  hooksConnection: HooksConnection
  components: Array<Component>
  componentsAggregate: ComponentAggregateSelection
  componentsConnection: ComponentsConnection
  stores: Array<Store>
  storesAggregate: StoreAggregateSelection
  storesConnection: StoresConnection
  codeActions: Array<CodeAction>
  codeActionsAggregate: CodeActionAggregateSelection
  codeActionsConnection: CodeActionsConnection
  apiActions: Array<ApiAction>
  apiActionsAggregate: ApiActionAggregateSelection
  apiActionsConnection: ApiActionsConnection
  resources: Array<Resource>
  resourcesAggregate: ResourceAggregateSelection
  resourcesConnection: ResourcesConnection
  deleteInfos: Array<DeleteInfo>
  deleteInfosAggregate: DeleteInfoAggregateSelection
  deleteInfosConnection: DeleteInfosConnection
  vercelDomainConfigs: Array<VercelDomainConfig>
  vercelDomainConfigsAggregate: VercelDomainConfigAggregateSelection
  vercelDomainConfigsConnection: VercelDomainConfigsConnection
  vercelProjectDomains: Array<VercelProjectDomain>
  vercelProjectDomainsAggregate: VercelProjectDomainAggregateSelection
  vercelProjectDomainsConnection: VercelProjectDomainsConnection
  domains: Array<Domain>
  domainsAggregate: DomainAggregateSelection
  domainsConnection: DomainsConnection
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']>
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>
}

export type QueryBaseTypesArgs = {
  where?: InputMaybe<BaseTypeWhere>
  options?: InputMaybe<BaseTypeOptions>
}

export type QueryResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
  options?: InputMaybe<ResetDatabaseMutationResponseOptions>
}

export type QueryResetDatabaseMutationResponsesAggregateArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryResetDatabaseMutationResponsesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
  sort?: InputMaybe<Array<InputMaybe<ResetDatabaseMutationResponseSort>>>
}

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
}

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>
}

export type QueryUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<UserWhere>
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>
}

export type QueryAppsArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
}

export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryAppsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<AppWhere>
  sort?: InputMaybe<Array<InputMaybe<AppSort>>>
}

export type QueryFieldsArgs = {
  where?: InputMaybe<FieldWhere>
  options?: InputMaybe<FieldOptions>
}

export type QueryFieldsAggregateArgs = {
  where?: InputMaybe<FieldWhere>
}

export type QueryFieldsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<FieldWhere>
  sort?: InputMaybe<Array<InputMaybe<FieldSort>>>
}

export type QueryAtomsArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
}

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<AtomWhere>
  sort?: InputMaybe<Array<InputMaybe<AtomSort>>>
}

export type QueryCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
  options?: InputMaybe<CreateInfoOptions>
}

export type QueryCreateInfosAggregateArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryCreateInfosConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<CreateInfoWhere>
  sort?: InputMaybe<Array<InputMaybe<CreateInfoSort>>>
}

export type QueryPagesArgs = {
  where?: InputMaybe<PageWhere>
  options?: InputMaybe<PageOptions>
}

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryPagesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<PageWhere>
  sort?: InputMaybe<Array<InputMaybe<PageSort>>>
}

export type QueryTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>
  options?: InputMaybe<TypeReferenceOptions>
}

export type QueryTypeReferencesAggregateArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryTypeReferencesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<TypeReferenceWhere>
  sort?: InputMaybe<Array<InputMaybe<TypeReferenceSort>>>
}

export type QueryGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>
  options?: InputMaybe<GetBaseTypesReturnOptions>
}

export type QueryGetBaseTypesReturnsAggregateArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>
}

export type QueryGetBaseTypesReturnsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<GetBaseTypesReturnWhere>
  sort?: InputMaybe<Array<InputMaybe<GetBaseTypesReturnSort>>>
}

export type QueryBaseTypesAggregateArgs = {
  where?: InputMaybe<BaseTypeWhere>
}

export type QueryBaseTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<BaseTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<BaseTypeSort>>>
}

export type QueryPrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
  options?: InputMaybe<PrimitiveTypeOptions>
}

export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPrimitiveTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<PrimitiveTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<PrimitiveTypeSort>>>
}

export type QueryArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>
  options?: InputMaybe<ArrayTypeOptions>
}

export type QueryArrayTypesAggregateArgs = {
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryArrayTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ArrayTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<ArrayTypeSort>>>
}

export type QueryUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>
  options?: InputMaybe<UnionTypeOptions>
}

export type QueryUnionTypesAggregateArgs = {
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUnionTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<UnionTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<UnionTypeSort>>>
}

export type QueryInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
}

export type QueryInterfaceTypesAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryInterfaceTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<InterfaceTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<InterfaceTypeSort>>>
}

export type QueryElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>
  options?: InputMaybe<ElementTypeOptions>
}

export type QueryElementTypesAggregateArgs = {
  where?: InputMaybe<ElementTypeWhere>
}

export type QueryElementTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ElementTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<ElementTypeSort>>>
}

export type QueryRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
  options?: InputMaybe<RenderPropsTypeOptions>
}

export type QueryRenderPropsTypesAggregateArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryRenderPropsTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<RenderPropsTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<RenderPropsTypeSort>>>
}

export type QueryReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
  options?: InputMaybe<ReactNodeTypeOptions>
}

export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryReactNodeTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ReactNodeTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<ReactNodeTypeSort>>>
}

export type QueryEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>
  options?: InputMaybe<EnumTypeOptions>
}

export type QueryEnumTypesAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryEnumTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<EnumTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<EnumTypeSort>>>
}

export type QueryEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  options?: InputMaybe<EnumTypeValueOptions>
}

export type QueryEnumTypeValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypeValuesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<EnumTypeValueWhere>
  sort?: InputMaybe<Array<InputMaybe<EnumTypeValueSort>>>
}

export type QueryLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>
  options?: InputMaybe<LambdaTypeOptions>
}

export type QueryLambdaTypesAggregateArgs = {
  where?: InputMaybe<LambdaTypeWhere>
}

export type QueryLambdaTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<LambdaTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<LambdaTypeSort>>>
}

export type QueryPageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>
  options?: InputMaybe<PageTypeOptions>
}

export type QueryPageTypesAggregateArgs = {
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPageTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<PageTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<PageTypeSort>>>
}

export type QueryAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>
  options?: InputMaybe<AppTypeOptions>
}

export type QueryAppTypesAggregateArgs = {
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<AppTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<AppTypeSort>>>
}

export type QueryActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>
  options?: InputMaybe<ActionTypeOptions>
}

export type QueryActionTypesAggregateArgs = {
  where?: InputMaybe<ActionTypeWhere>
}

export type QueryActionTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ActionTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<ActionTypeSort>>>
}

export type QueryCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>
  options?: InputMaybe<CodeMirrorTypeOptions>
}

export type QueryCodeMirrorTypesAggregateArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>
}

export type QueryCodeMirrorTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<CodeMirrorTypeWhere>
  sort?: InputMaybe<Array<InputMaybe<CodeMirrorTypeSort>>>
}

export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
}

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
}

export type QueryTagsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<TagWhere>
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>
}

export type QueryElementsArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
}

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ElementWhere>
  sort?: InputMaybe<Array<InputMaybe<ElementSort>>>
}

export type QueryPropsArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
}

export type QueryPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>
}

export type QueryPropsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<PropWhere>
  sort?: InputMaybe<Array<InputMaybe<PropSort>>>
}

export type QueryPropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  options?: InputMaybe<PropMapBindingOptions>
}

export type QueryPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropMapBindingsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<PropMapBindingWhere>
  sort?: InputMaybe<Array<InputMaybe<PropMapBindingSort>>>
}

export type QueryHooksArgs = {
  where?: InputMaybe<HookWhere>
  options?: InputMaybe<HookOptions>
}

export type QueryHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>
}

export type QueryHooksConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<HookWhere>
  sort?: InputMaybe<Array<InputMaybe<HookSort>>>
}

export type QueryComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
}

export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
}

export type QueryComponentsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ComponentWhere>
  sort?: InputMaybe<Array<InputMaybe<ComponentSort>>>
}

export type QueryStoresArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
}

export type QueryStoresAggregateArgs = {
  where?: InputMaybe<StoreWhere>
}

export type QueryStoresConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<StoreWhere>
  sort?: InputMaybe<Array<InputMaybe<StoreSort>>>
}

export type QueryCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>
  options?: InputMaybe<CodeActionOptions>
}

export type QueryCodeActionsAggregateArgs = {
  where?: InputMaybe<CodeActionWhere>
}

export type QueryCodeActionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<CodeActionWhere>
  sort?: InputMaybe<Array<InputMaybe<CodeActionSort>>>
}

export type QueryApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>
  options?: InputMaybe<ApiActionOptions>
}

export type QueryApiActionsAggregateArgs = {
  where?: InputMaybe<ApiActionWhere>
}

export type QueryApiActionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ApiActionWhere>
  sort?: InputMaybe<Array<InputMaybe<ApiActionSort>>>
}

export type QueryResourcesArgs = {
  where?: InputMaybe<ResourceWhere>
  options?: InputMaybe<ResourceOptions>
}

export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
}

export type QueryResourcesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<ResourceWhere>
  sort?: InputMaybe<Array<InputMaybe<ResourceSort>>>
}

export type QueryDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>
  options?: InputMaybe<DeleteInfoOptions>
}

export type QueryDeleteInfosAggregateArgs = {
  where?: InputMaybe<DeleteInfoWhere>
}

export type QueryDeleteInfosConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<DeleteInfoWhere>
  sort?: InputMaybe<Array<InputMaybe<DeleteInfoSort>>>
}

export type QueryVercelDomainConfigsArgs = {
  where?: InputMaybe<VercelDomainConfigWhere>
  options?: InputMaybe<VercelDomainConfigOptions>
}

export type QueryVercelDomainConfigsAggregateArgs = {
  where?: InputMaybe<VercelDomainConfigWhere>
}

export type QueryVercelDomainConfigsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<VercelDomainConfigWhere>
  sort?: InputMaybe<Array<InputMaybe<VercelDomainConfigSort>>>
}

export type QueryVercelProjectDomainsArgs = {
  where?: InputMaybe<VercelProjectDomainWhere>
  options?: InputMaybe<VercelProjectDomainOptions>
}

export type QueryVercelProjectDomainsAggregateArgs = {
  where?: InputMaybe<VercelProjectDomainWhere>
}

export type QueryVercelProjectDomainsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<VercelProjectDomainWhere>
  sort?: InputMaybe<Array<InputMaybe<VercelProjectDomainSort>>>
}

export type QueryDomainsArgs = {
  where?: InputMaybe<DomainWhere>
  options?: InputMaybe<DomainOptions>
}

export type QueryDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>
}

export type QueryDomainsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  where?: InputMaybe<DomainWhere>
  sort?: InputMaybe<Array<InputMaybe<DomainSort>>>
}

export type QueryIsTypeDescendantOfArgs = {
  parentTypeId: Scalars['ID']
  descendantTypeId: Scalars['ID']
}

export type QueryGetTypeReferencesArgs = {
  typeId: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  createDomains: CreateDomainsMutationResponse
  updateDomains: UpdateDomainsMutationResponse
  deleteDomains: DeleteInfo
  createResetDatabaseMutationResponses: CreateResetDatabaseMutationResponsesMutationResponse
  deleteResetDatabaseMutationResponses: DeleteInfo
  updateResetDatabaseMutationResponses: UpdateResetDatabaseMutationResponsesMutationResponse
  createUsers: CreateUsersMutationResponse
  deleteUsers: DeleteInfo
  updateUsers: UpdateUsersMutationResponse
  createApps: CreateAppsMutationResponse
  deleteApps: DeleteInfo
  updateApps: UpdateAppsMutationResponse
  createFields: CreateFieldsMutationResponse
  deleteFields: DeleteInfo
  updateFields: UpdateFieldsMutationResponse
  createAtoms: CreateAtomsMutationResponse
  deleteAtoms: DeleteInfo
  updateAtoms: UpdateAtomsMutationResponse
  createCreateInfos: CreateCreateInfosMutationResponse
  deleteCreateInfos: DeleteInfo
  updateCreateInfos: UpdateCreateInfosMutationResponse
  createPages: CreatePagesMutationResponse
  deletePages: DeleteInfo
  updatePages: UpdatePagesMutationResponse
  createTypeReferences: CreateTypeReferencesMutationResponse
  deleteTypeReferences: DeleteInfo
  updateTypeReferences: UpdateTypeReferencesMutationResponse
  createGetBaseTypesReturns: CreateGetBaseTypesReturnsMutationResponse
  deleteGetBaseTypesReturns: DeleteInfo
  updateGetBaseTypesReturns: UpdateGetBaseTypesReturnsMutationResponse
  createBaseTypes: CreateBaseTypesMutationResponse
  deleteBaseTypes: DeleteInfo
  updateBaseTypes: UpdateBaseTypesMutationResponse
  createPrimitiveTypes: CreatePrimitiveTypesMutationResponse
  deletePrimitiveTypes: DeleteInfo
  updatePrimitiveTypes: UpdatePrimitiveTypesMutationResponse
  createArrayTypes: CreateArrayTypesMutationResponse
  deleteArrayTypes: DeleteInfo
  updateArrayTypes: UpdateArrayTypesMutationResponse
  createUnionTypes: CreateUnionTypesMutationResponse
  deleteUnionTypes: DeleteInfo
  updateUnionTypes: UpdateUnionTypesMutationResponse
  createInterfaceTypes: CreateInterfaceTypesMutationResponse
  deleteInterfaceTypes: DeleteInfo
  updateInterfaceTypes: UpdateInterfaceTypesMutationResponse
  createElementTypes: CreateElementTypesMutationResponse
  deleteElementTypes: DeleteInfo
  updateElementTypes: UpdateElementTypesMutationResponse
  createRenderPropsTypes: CreateRenderPropsTypesMutationResponse
  deleteRenderPropsTypes: DeleteInfo
  updateRenderPropsTypes: UpdateRenderPropsTypesMutationResponse
  createReactNodeTypes: CreateReactNodeTypesMutationResponse
  deleteReactNodeTypes: DeleteInfo
  updateReactNodeTypes: UpdateReactNodeTypesMutationResponse
  createEnumTypes: CreateEnumTypesMutationResponse
  deleteEnumTypes: DeleteInfo
  updateEnumTypes: UpdateEnumTypesMutationResponse
  createEnumTypeValues: CreateEnumTypeValuesMutationResponse
  deleteEnumTypeValues: DeleteInfo
  updateEnumTypeValues: UpdateEnumTypeValuesMutationResponse
  createLambdaTypes: CreateLambdaTypesMutationResponse
  deleteLambdaTypes: DeleteInfo
  updateLambdaTypes: UpdateLambdaTypesMutationResponse
  createPageTypes: CreatePageTypesMutationResponse
  deletePageTypes: DeleteInfo
  updatePageTypes: UpdatePageTypesMutationResponse
  createAppTypes: CreateAppTypesMutationResponse
  deleteAppTypes: DeleteInfo
  updateAppTypes: UpdateAppTypesMutationResponse
  createActionTypes: CreateActionTypesMutationResponse
  deleteActionTypes: DeleteInfo
  updateActionTypes: UpdateActionTypesMutationResponse
  createCodeMirrorTypes: CreateCodeMirrorTypesMutationResponse
  deleteCodeMirrorTypes: DeleteInfo
  updateCodeMirrorTypes: UpdateCodeMirrorTypesMutationResponse
  createTags: CreateTagsMutationResponse
  deleteTags: DeleteInfo
  updateTags: UpdateTagsMutationResponse
  createElements: CreateElementsMutationResponse
  deleteElements: DeleteInfo
  updateElements: UpdateElementsMutationResponse
  createProps: CreatePropsMutationResponse
  deleteProps: DeleteInfo
  updateProps: UpdatePropsMutationResponse
  createPropMapBindings: CreatePropMapBindingsMutationResponse
  deletePropMapBindings: DeleteInfo
  updatePropMapBindings: UpdatePropMapBindingsMutationResponse
  createHooks: CreateHooksMutationResponse
  deleteHooks: DeleteInfo
  updateHooks: UpdateHooksMutationResponse
  createComponents: CreateComponentsMutationResponse
  deleteComponents: DeleteInfo
  updateComponents: UpdateComponentsMutationResponse
  createStores: CreateStoresMutationResponse
  deleteStores: DeleteInfo
  updateStores: UpdateStoresMutationResponse
  createCodeActions: CreateCodeActionsMutationResponse
  deleteCodeActions: DeleteInfo
  updateCodeActions: UpdateCodeActionsMutationResponse
  createApiActions: CreateApiActionsMutationResponse
  deleteApiActions: DeleteInfo
  updateApiActions: UpdateApiActionsMutationResponse
  createResources: CreateResourcesMutationResponse
  deleteResources: DeleteInfo
  updateResources: UpdateResourcesMutationResponse
  createDeleteInfos: CreateDeleteInfosMutationResponse
  deleteDeleteInfos: DeleteInfo
  updateDeleteInfos: UpdateDeleteInfosMutationResponse
  createVercelDomainConfigs: CreateVercelDomainConfigsMutationResponse
  deleteVercelDomainConfigs: DeleteInfo
  updateVercelDomainConfigs: UpdateVercelDomainConfigsMutationResponse
  createVercelProjectDomains: CreateVercelProjectDomainsMutationResponse
  deleteVercelProjectDomains: DeleteInfo
  updateVercelProjectDomains: UpdateVercelProjectDomainsMutationResponse
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>
}

export type MutationCreateDomainsArgs = {
  input: Array<DomainCreateInput>
}

export type MutationUpdateDomainsArgs = {
  where?: InputMaybe<DomainWhere>
  update?: InputMaybe<DomainUpdateInput>
  connect?: InputMaybe<DomainConnectInput>
  disconnect?: InputMaybe<DomainDisconnectInput>
  create?: InputMaybe<DomainRelationInput>
  delete?: InputMaybe<DomainDeleteInput>
  connectOrCreate?: InputMaybe<DomainConnectOrCreateInput>
}

export type MutationDeleteDomainsArgs = {
  where?: InputMaybe<DomainWhere>
  delete?: InputMaybe<DomainDeleteInput>
}

export type MutationCreateResetDatabaseMutationResponsesArgs = {
  input: Array<ResetDatabaseMutationResponseCreateInput>
}

export type MutationDeleteResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type MutationUpdateResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
  update?: InputMaybe<ResetDatabaseMutationResponseUpdateInput>
}

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>
}

export type MutationDeleteUsersArgs = {
  where?: InputMaybe<UserWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type MutationUpdateUsersArgs = {
  where?: InputMaybe<UserWhere>
  update?: InputMaybe<UserUpdateInput>
  connect?: InputMaybe<UserConnectInput>
  disconnect?: InputMaybe<UserDisconnectInput>
  create?: InputMaybe<UserRelationInput>
  delete?: InputMaybe<UserDeleteInput>
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>
}

export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>
}

export type MutationDeleteAppsArgs = {
  where?: InputMaybe<AppWhere>
  delete?: InputMaybe<AppDeleteInput>
}

export type MutationUpdateAppsArgs = {
  where?: InputMaybe<AppWhere>
  update?: InputMaybe<AppUpdateInput>
  connect?: InputMaybe<AppConnectInput>
  disconnect?: InputMaybe<AppDisconnectInput>
  create?: InputMaybe<AppRelationInput>
  delete?: InputMaybe<AppDeleteInput>
  connectOrCreate?: InputMaybe<AppConnectOrCreateInput>
}

export type MutationCreateFieldsArgs = {
  input: Array<FieldCreateInput>
}

export type MutationDeleteFieldsArgs = {
  where?: InputMaybe<FieldWhere>
  delete?: InputMaybe<FieldDeleteInput>
}

export type MutationUpdateFieldsArgs = {
  where?: InputMaybe<FieldWhere>
  update?: InputMaybe<FieldUpdateInput>
  connect?: InputMaybe<FieldConnectInput>
  disconnect?: InputMaybe<FieldDisconnectInput>
  create?: InputMaybe<FieldRelationInput>
  delete?: InputMaybe<FieldDeleteInput>
  connectOrCreate?: InputMaybe<FieldConnectOrCreateInput>
}

export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>
}

export type MutationDeleteAtomsArgs = {
  where?: InputMaybe<AtomWhere>
  delete?: InputMaybe<AtomDeleteInput>
}

export type MutationUpdateAtomsArgs = {
  where?: InputMaybe<AtomWhere>
  update?: InputMaybe<AtomUpdateInput>
  connect?: InputMaybe<AtomConnectInput>
  disconnect?: InputMaybe<AtomDisconnectInput>
  create?: InputMaybe<AtomRelationInput>
  delete?: InputMaybe<AtomDeleteInput>
  connectOrCreate?: InputMaybe<AtomConnectOrCreateInput>
}

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>
}

export type MutationDeleteCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type MutationUpdateCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
  update?: InputMaybe<CreateInfoUpdateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
}

export type MutationDeletePagesArgs = {
  where?: InputMaybe<PageWhere>
  delete?: InputMaybe<PageDeleteInput>
}

export type MutationUpdatePagesArgs = {
  where?: InputMaybe<PageWhere>
  update?: InputMaybe<PageUpdateInput>
  connect?: InputMaybe<PageConnectInput>
  disconnect?: InputMaybe<PageDisconnectInput>
  create?: InputMaybe<PageRelationInput>
  delete?: InputMaybe<PageDeleteInput>
  connectOrCreate?: InputMaybe<PageConnectOrCreateInput>
}

export type MutationCreateTypeReferencesArgs = {
  input: Array<TypeReferenceCreateInput>
}

export type MutationDeleteTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type MutationUpdateTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>
  update?: InputMaybe<TypeReferenceUpdateInput>
}

export type MutationCreateGetBaseTypesReturnsArgs = {
  input: Array<GetBaseTypesReturnCreateInput>
}

export type MutationDeleteGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>
}

export type MutationUpdateGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>
  update?: InputMaybe<GetBaseTypesReturnUpdateInput>
}

export type MutationCreateBaseTypesArgs = {
  input: Array<BaseTypeCreateInput>
}

export type MutationDeleteBaseTypesArgs = {
  where?: InputMaybe<BaseTypeWhere>
  delete?: InputMaybe<BaseTypeDeleteInput>
}

export type MutationUpdateBaseTypesArgs = {
  where?: InputMaybe<BaseTypeWhere>
  update?: InputMaybe<BaseTypeUpdateInput>
  connect?: InputMaybe<BaseTypeConnectInput>
  disconnect?: InputMaybe<BaseTypeDisconnectInput>
  create?: InputMaybe<BaseTypeRelationInput>
  delete?: InputMaybe<BaseTypeDeleteInput>
  connectOrCreate?: InputMaybe<BaseTypeConnectOrCreateInput>
}

export type MutationCreatePrimitiveTypesArgs = {
  input: Array<PrimitiveTypeCreateInput>
}

export type MutationDeletePrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
}

export type MutationUpdatePrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
  update?: InputMaybe<PrimitiveTypeUpdateInput>
  connect?: InputMaybe<PrimitiveTypeConnectInput>
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>
  create?: InputMaybe<PrimitiveTypeRelationInput>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  connectOrCreate?: InputMaybe<PrimitiveTypeConnectOrCreateInput>
}

export type MutationCreateArrayTypesArgs = {
  input: Array<ArrayTypeCreateInput>
}

export type MutationDeleteArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>
  delete?: InputMaybe<ArrayTypeDeleteInput>
}

export type MutationUpdateArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>
  update?: InputMaybe<ArrayTypeUpdateInput>
  connect?: InputMaybe<ArrayTypeConnectInput>
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>
  create?: InputMaybe<ArrayTypeRelationInput>
  delete?: InputMaybe<ArrayTypeDeleteInput>
  connectOrCreate?: InputMaybe<ArrayTypeConnectOrCreateInput>
}

export type MutationCreateUnionTypesArgs = {
  input: Array<UnionTypeCreateInput>
}

export type MutationDeleteUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>
  delete?: InputMaybe<UnionTypeDeleteInput>
}

export type MutationUpdateUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>
  update?: InputMaybe<UnionTypeUpdateInput>
  connect?: InputMaybe<UnionTypeConnectInput>
  disconnect?: InputMaybe<UnionTypeDisconnectInput>
  create?: InputMaybe<UnionTypeRelationInput>
  delete?: InputMaybe<UnionTypeDeleteInput>
  connectOrCreate?: InputMaybe<UnionTypeConnectOrCreateInput>
}

export type MutationCreateInterfaceTypesArgs = {
  input: Array<InterfaceTypeCreateInput>
}

export type MutationDeleteInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type MutationUpdateInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  update?: InputMaybe<InterfaceTypeUpdateInput>
  connect?: InputMaybe<InterfaceTypeConnectInput>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
  create?: InputMaybe<InterfaceTypeRelationInput>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  connectOrCreate?: InputMaybe<InterfaceTypeConnectOrCreateInput>
}

export type MutationCreateElementTypesArgs = {
  input: Array<ElementTypeCreateInput>
}

export type MutationDeleteElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>
  delete?: InputMaybe<ElementTypeDeleteInput>
}

export type MutationUpdateElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>
  update?: InputMaybe<ElementTypeUpdateInput>
  connect?: InputMaybe<ElementTypeConnectInput>
  disconnect?: InputMaybe<ElementTypeDisconnectInput>
  create?: InputMaybe<ElementTypeRelationInput>
  delete?: InputMaybe<ElementTypeDeleteInput>
  connectOrCreate?: InputMaybe<ElementTypeConnectOrCreateInput>
}

export type MutationCreateRenderPropsTypesArgs = {
  input: Array<RenderPropsTypeCreateInput>
}

export type MutationDeleteRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
}

export type MutationUpdateRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
  update?: InputMaybe<RenderPropsTypeUpdateInput>
  connect?: InputMaybe<RenderPropsTypeConnectInput>
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>
  create?: InputMaybe<RenderPropsTypeRelationInput>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  connectOrCreate?: InputMaybe<RenderPropsTypeConnectOrCreateInput>
}

export type MutationCreateReactNodeTypesArgs = {
  input: Array<ReactNodeTypeCreateInput>
}

export type MutationDeleteReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
}

export type MutationUpdateReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
  update?: InputMaybe<ReactNodeTypeUpdateInput>
  connect?: InputMaybe<ReactNodeTypeConnectInput>
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>
  create?: InputMaybe<ReactNodeTypeRelationInput>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
  connectOrCreate?: InputMaybe<ReactNodeTypeConnectOrCreateInput>
}

export type MutationCreateEnumTypesArgs = {
  input: Array<EnumTypeCreateInput>
}

export type MutationDeleteEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>
  delete?: InputMaybe<EnumTypeDeleteInput>
}

export type MutationUpdateEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>
  update?: InputMaybe<EnumTypeUpdateInput>
  connect?: InputMaybe<EnumTypeConnectInput>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
  create?: InputMaybe<EnumTypeRelationInput>
  delete?: InputMaybe<EnumTypeDeleteInput>
  connectOrCreate?: InputMaybe<EnumTypeConnectOrCreateInput>
}

export type MutationCreateEnumTypeValuesArgs = {
  input: Array<EnumTypeValueCreateInput>
}

export type MutationDeleteEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  delete?: InputMaybe<EnumTypeValueDeleteInput>
}

export type MutationUpdateEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  update?: InputMaybe<EnumTypeValueUpdateInput>
  connect?: InputMaybe<EnumTypeValueConnectInput>
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>
  create?: InputMaybe<EnumTypeValueRelationInput>
  delete?: InputMaybe<EnumTypeValueDeleteInput>
  connectOrCreate?: InputMaybe<EnumTypeValueConnectOrCreateInput>
}

export type MutationCreateLambdaTypesArgs = {
  input: Array<LambdaTypeCreateInput>
}

export type MutationDeleteLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>
  delete?: InputMaybe<LambdaTypeDeleteInput>
}

export type MutationUpdateLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>
  update?: InputMaybe<LambdaTypeUpdateInput>
  connect?: InputMaybe<LambdaTypeConnectInput>
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>
  create?: InputMaybe<LambdaTypeRelationInput>
  delete?: InputMaybe<LambdaTypeDeleteInput>
  connectOrCreate?: InputMaybe<LambdaTypeConnectOrCreateInput>
}

export type MutationCreatePageTypesArgs = {
  input: Array<PageTypeCreateInput>
}

export type MutationDeletePageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>
  delete?: InputMaybe<PageTypeDeleteInput>
}

export type MutationUpdatePageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>
  update?: InputMaybe<PageTypeUpdateInput>
  connect?: InputMaybe<PageTypeConnectInput>
  disconnect?: InputMaybe<PageTypeDisconnectInput>
  create?: InputMaybe<PageTypeRelationInput>
  delete?: InputMaybe<PageTypeDeleteInput>
  connectOrCreate?: InputMaybe<PageTypeConnectOrCreateInput>
}

export type MutationCreateAppTypesArgs = {
  input: Array<AppTypeCreateInput>
}

export type MutationDeleteAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>
  delete?: InputMaybe<AppTypeDeleteInput>
}

export type MutationUpdateAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>
  update?: InputMaybe<AppTypeUpdateInput>
  connect?: InputMaybe<AppTypeConnectInput>
  disconnect?: InputMaybe<AppTypeDisconnectInput>
  create?: InputMaybe<AppTypeRelationInput>
  delete?: InputMaybe<AppTypeDeleteInput>
  connectOrCreate?: InputMaybe<AppTypeConnectOrCreateInput>
}

export type MutationCreateActionTypesArgs = {
  input: Array<ActionTypeCreateInput>
}

export type MutationDeleteActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>
  delete?: InputMaybe<ActionTypeDeleteInput>
}

export type MutationUpdateActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>
  update?: InputMaybe<ActionTypeUpdateInput>
  connect?: InputMaybe<ActionTypeConnectInput>
  disconnect?: InputMaybe<ActionTypeDisconnectInput>
  create?: InputMaybe<ActionTypeRelationInput>
  delete?: InputMaybe<ActionTypeDeleteInput>
  connectOrCreate?: InputMaybe<ActionTypeConnectOrCreateInput>
}

export type MutationCreateCodeMirrorTypesArgs = {
  input: Array<CodeMirrorTypeCreateInput>
}

export type MutationDeleteCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
}

export type MutationUpdateCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>
  update?: InputMaybe<CodeMirrorTypeUpdateInput>
  connect?: InputMaybe<CodeMirrorTypeConnectInput>
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>
  create?: InputMaybe<CodeMirrorTypeRelationInput>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
  connectOrCreate?: InputMaybe<CodeMirrorTypeConnectOrCreateInput>
}

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>
}

export type MutationDeleteTagsArgs = {
  where?: InputMaybe<TagWhere>
  delete?: InputMaybe<TagDeleteInput>
}

export type MutationUpdateTagsArgs = {
  where?: InputMaybe<TagWhere>
  update?: InputMaybe<TagUpdateInput>
  connect?: InputMaybe<TagConnectInput>
  disconnect?: InputMaybe<TagDisconnectInput>
  create?: InputMaybe<TagRelationInput>
  delete?: InputMaybe<TagDeleteInput>
  connectOrCreate?: InputMaybe<TagConnectOrCreateInput>
}

export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>
}

export type MutationDeleteElementsArgs = {
  where?: InputMaybe<ElementWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type MutationUpdateElementsArgs = {
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
  connect?: InputMaybe<ElementConnectInput>
  disconnect?: InputMaybe<ElementDisconnectInput>
  create?: InputMaybe<ElementRelationInput>
  delete?: InputMaybe<ElementDeleteInput>
  connectOrCreate?: InputMaybe<ElementConnectOrCreateInput>
}

export type MutationCreatePropsArgs = {
  input: Array<PropCreateInput>
}

export type MutationDeletePropsArgs = {
  where?: InputMaybe<PropWhere>
}

export type MutationUpdatePropsArgs = {
  where?: InputMaybe<PropWhere>
  update?: InputMaybe<PropUpdateInput>
}

export type MutationCreatePropMapBindingsArgs = {
  input: Array<PropMapBindingCreateInput>
}

export type MutationDeletePropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  delete?: InputMaybe<PropMapBindingDeleteInput>
}

export type MutationUpdatePropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  update?: InputMaybe<PropMapBindingUpdateInput>
  connect?: InputMaybe<PropMapBindingConnectInput>
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>
  create?: InputMaybe<PropMapBindingRelationInput>
  delete?: InputMaybe<PropMapBindingDeleteInput>
  connectOrCreate?: InputMaybe<PropMapBindingConnectOrCreateInput>
}

export type MutationCreateHooksArgs = {
  input: Array<HookCreateInput>
}

export type MutationDeleteHooksArgs = {
  where?: InputMaybe<HookWhere>
  delete?: InputMaybe<HookDeleteInput>
}

export type MutationUpdateHooksArgs = {
  where?: InputMaybe<HookWhere>
  update?: InputMaybe<HookUpdateInput>
  connect?: InputMaybe<HookConnectInput>
  disconnect?: InputMaybe<HookDisconnectInput>
  create?: InputMaybe<HookRelationInput>
  delete?: InputMaybe<HookDeleteInput>
  connectOrCreate?: InputMaybe<HookConnectOrCreateInput>
}

export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>
}

export type MutationDeleteComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type MutationUpdateComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  update?: InputMaybe<ComponentUpdateInput>
  connect?: InputMaybe<ComponentConnectInput>
  disconnect?: InputMaybe<ComponentDisconnectInput>
  create?: InputMaybe<ComponentRelationInput>
  delete?: InputMaybe<ComponentDeleteInput>
  connectOrCreate?: InputMaybe<ComponentConnectOrCreateInput>
}

export type MutationCreateStoresArgs = {
  input: Array<StoreCreateInput>
}

export type MutationDeleteStoresArgs = {
  where?: InputMaybe<StoreWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type MutationUpdateStoresArgs = {
  where?: InputMaybe<StoreWhere>
  update?: InputMaybe<StoreUpdateInput>
  connect?: InputMaybe<StoreConnectInput>
  disconnect?: InputMaybe<StoreDisconnectInput>
  create?: InputMaybe<StoreRelationInput>
  delete?: InputMaybe<StoreDeleteInput>
  connectOrCreate?: InputMaybe<StoreConnectOrCreateInput>
}

export type MutationCreateCodeActionsArgs = {
  input: Array<CodeActionCreateInput>
}

export type MutationDeleteCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>
  delete?: InputMaybe<CodeActionDeleteInput>
}

export type MutationUpdateCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>
  update?: InputMaybe<CodeActionUpdateInput>
  connect?: InputMaybe<CodeActionConnectInput>
  disconnect?: InputMaybe<CodeActionDisconnectInput>
  create?: InputMaybe<CodeActionRelationInput>
  delete?: InputMaybe<CodeActionDeleteInput>
  connectOrCreate?: InputMaybe<CodeActionConnectOrCreateInput>
}

export type MutationCreateApiActionsArgs = {
  input: Array<ApiActionCreateInput>
}

export type MutationDeleteApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>
  delete?: InputMaybe<ApiActionDeleteInput>
}

export type MutationUpdateApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>
  update?: InputMaybe<ApiActionUpdateInput>
  connect?: InputMaybe<ApiActionConnectInput>
  disconnect?: InputMaybe<ApiActionDisconnectInput>
  create?: InputMaybe<ApiActionRelationInput>
  delete?: InputMaybe<ApiActionDeleteInput>
  connectOrCreate?: InputMaybe<ApiActionConnectOrCreateInput>
}

export type MutationCreateResourcesArgs = {
  input: Array<ResourceCreateInput>
}

export type MutationDeleteResourcesArgs = {
  where?: InputMaybe<ResourceWhere>
  delete?: InputMaybe<ResourceDeleteInput>
}

export type MutationUpdateResourcesArgs = {
  where?: InputMaybe<ResourceWhere>
  update?: InputMaybe<ResourceUpdateInput>
  connect?: InputMaybe<ResourceConnectInput>
  disconnect?: InputMaybe<ResourceDisconnectInput>
  create?: InputMaybe<ResourceRelationInput>
  delete?: InputMaybe<ResourceDeleteInput>
  connectOrCreate?: InputMaybe<ResourceConnectOrCreateInput>
}

export type MutationCreateDeleteInfosArgs = {
  input: Array<DeleteInfoCreateInput>
}

export type MutationDeleteDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>
}

export type MutationUpdateDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>
  update?: InputMaybe<DeleteInfoUpdateInput>
}

export type MutationCreateVercelDomainConfigsArgs = {
  input: Array<VercelDomainConfigCreateInput>
}

export type MutationDeleteVercelDomainConfigsArgs = {
  where?: InputMaybe<VercelDomainConfigWhere>
}

export type MutationUpdateVercelDomainConfigsArgs = {
  where?: InputMaybe<VercelDomainConfigWhere>
  update?: InputMaybe<VercelDomainConfigUpdateInput>
}

export type MutationCreateVercelProjectDomainsArgs = {
  input: Array<VercelProjectDomainCreateInput>
}

export type MutationDeleteVercelProjectDomainsArgs = {
  where?: InputMaybe<VercelProjectDomainWhere>
}

export type MutationUpdateVercelProjectDomainsArgs = {
  where?: InputMaybe<VercelProjectDomainWhere>
  update?: InputMaybe<VercelProjectDomainUpdateInput>
}

export enum ActionKind {
  /** Action with custom code */
  CodeAction = 'CodeAction',
  /** Action responsible for fetching data from a resource */
  ApiAction = 'ApiAction',
}

export enum AtomType {
  HookQueryLambda = 'HookQueryLambda',
  HookQueryConfig = 'HookQueryConfig',
  HookGraphqlQuery = 'HookGraphqlQuery',
  HookGraphqlMutation = 'HookGraphqlMutation',
  HookRecoilState = 'HookRecoilState',
  HookQueryPage = 'HookQueryPage',
  HookQueryPages = 'HookQueryPages',
  HookRouter = 'HookRouter',
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
  AntDesignBreadcrumbSeparator = 'AntDesignBreadcrumbSeparator',
  AntDesignButton = 'AntDesignButton',
  AntDesignCalendar = 'AntDesignCalendar',
  AntDesignCard = 'AntDesignCard',
  AntDesignCardGrid = 'AntDesignCardGrid',
  AntDesignCardMeta = 'AntDesignCardMeta',
  AntDesignCarousel = 'AntDesignCarousel',
  AntDesignCascader = 'AntDesignCascader',
  AntDesignCheckbox = 'AntDesignCheckbox',
  AntDesignCheckboxGroup = 'AntDesignCheckboxGroup',
  AntDesignCollapse = 'AntDesignCollapse',
  AntDesignCollapsePanel = 'AntDesignCollapsePanel',
  AntDesignComment = 'AntDesignComment',
  AntDesignConfigProvider = 'AntDesignConfigProvider',
  AntDesignDatePicker = 'AntDesignDatePicker',
  AntDesignDescriptions = 'AntDesignDescriptions',
  AntDesignDescriptionsItem = 'AntDesignDescriptionsItem',
  AntDesignDivider = 'AntDesignDivider',
  AntDesignDrawer = 'AntDesignDrawer',
  AntDesignMessage = 'AntDesignMessage',
  AntDesignDropdown = 'AntDesignDropdown',
  AntDesignDropdownButton = 'AntDesignDropdownButton',
  AntDesignEmpty = 'AntDesignEmpty',
  AntDesignForm = 'AntDesignForm',
  AntDesignFormItem = 'AntDesignFormItem',
  AntDesignFormItemHook = 'AntDesignFormItemHook',
  AntDesignFormList = 'AntDesignFormList',
  AntDesignFormErrorList = 'AntDesignFormErrorList',
  AntDesignFormProvider = 'AntDesignFormProvider',
  AntDesignGridCol = 'AntDesignGridCol',
  AntDesignGridRow = 'AntDesignGridRow',
  AntDesignIcon = 'AntDesignIcon',
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
  AntDesignNotification = 'AntDesignNotification',
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignSegmented = 'AntDesignSegmented',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
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
  AntDesignImage = 'AntDesignImage',
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
  MuiGridColDef = 'MuiGridColDef',
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
  TextList = 'TextList',
  Text = 'Text',
  Script = 'Script',
  State = 'State',
  ReactFragment = 'ReactFragment',
  HtmlA = 'HtmlA',
  HtmlP = 'HtmlP',
  HtmlVideo = 'HtmlVideo',
  HtmlUList = 'HtmlUList',
  HtmlTrack = 'HtmlTrack',
  HtmlTitle = 'HtmlTitle',
  HtmlTime = 'HtmlTime',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTable = 'HtmlTable',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlStyle = 'HtmlStyle',
  HtmlSpan = 'HtmlSpan',
  HtmlSource = 'HtmlSource',
  HtmlSelect = 'HtmlSelect',
  HtmlQuote = 'HtmlQuote',
  HtmlProgress = 'HtmlProgress',
  HtmlPre = 'HtmlPre',
  HtmlPicture = 'HtmlPicture',
  HtmlParam = 'HtmlParam',
  HtmlOutput = 'HtmlOutput',
  HtmlOption = 'HtmlOption',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlObject = 'HtmlObject',
  HtmlOList = 'HtmlOList',
  HtmlMeter = 'HtmlMeter',
  HtmlMeta = 'HtmlMeta',
  HtmlMap = 'HtmlMap',
  HtmlLink = 'HtmlLink',
  HtmlLegend = 'HtmlLegend',
  HtmlLabel = 'HtmlLabel',
  HtmlLi = 'HtmlLi',
  HtmlInput = 'HtmlInput',
  HtmlImage = 'HtmlImage',
  HtmlIframe = 'HtmlIframe',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHr = 'HtmlHr',
  HtmlFrameset = 'HtmlFrameset',
  HtmlFrame = 'HtmlFrame',
  HtmlForm = 'HtmlForm',
  HtmlFont = 'HtmlFont',
  HtmlFieldset = 'HtmlFieldset',
  HtmlEmbed = 'HtmlEmbed',
  HtmlDiv = 'HtmlDiv',
  HtmlDialog = 'HtmlDialog',
  HtmlDetails = 'HtmlDetails',
  HtmlDatalist = 'HtmlDatalist',
  HtmlData = 'HtmlData',
  HtmlDList = 'HtmlDList',
  HtmlCanvas = 'HtmlCanvas',
  HtmlButton = 'HtmlButton',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlAudio = 'HtmlAudio',
  HtmlArea = 'HtmlArea',
  HtmlFooter = 'HtmlFooter',
  HtmlAside = 'HtmlAside',
  HtmlHeader = 'HtmlHeader',
  HtmlMain = 'HtmlMain',
  HtmlNav = 'HtmlNav',
  HtmlSection = 'HtmlSection',
  HtmlCode = 'HtmlCode',
  HtmlEm = 'HtmlEm',
  HtmlI = 'HtmlI',
  HtmlS = 'HtmlS',
  HtmlSmall = 'HtmlSmall',
  HtmlStrong = 'HtmlStrong',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
}

export enum CodeMirrorLanguage {
  Typescript = 'Typescript',
  Javascript = 'Javascript',
  Css = 'Css',
  Json = 'Json',
  Graphql = 'Graphql',
  CssInJs = 'CssInJs',
}

export enum ElementTypeKind {
  AllElements = 'AllElements',
  ChildrenOnly = 'ChildrenOnly',
  DescendantsOnly = 'DescendantsOnly',
  ExcludeDescendantsElements = 'ExcludeDescendantsElements',
}

export enum PrimitiveTypeKind {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
}

export enum ResourceType {
  GraphQl = 'GraphQL',
  Rest = 'Rest',
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export enum TypeKind {
  PrimitiveType = 'PrimitiveType',
  EnumType = 'EnumType',
  ArrayType = 'ArrayType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  ElementType = 'ElementType',
  RenderPropsType = 'RenderPropsType',
  ReactNodeType = 'ReactNodeType',
  UnionType = 'UnionType',
  CodeMirrorType = 'CodeMirrorType',
  PageType = 'PageType',
  AppType = 'AppType',
  ActionType = 'ActionType',
}

export type AnyAction = ApiAction | CodeAction

export type AnyType =
  | PrimitiveType
  | ArrayType
  | UnionType
  | InterfaceType
  | ElementType
  | RenderPropsType
  | ReactNodeType
  | EnumType
  | LambdaType
  | PageType
  | AppType
  | ActionType
  | CodeMirrorType

export type ActionBase = {
  store: Store
  storeConnection: ActionBaseStoreConnection
  id: Scalars['ID']
  name: Scalars['String']
  type: ActionKind
}

export type IBaseType = {
  owner: User
  ownerConnection: IBaseTypeOwnerConnection
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
}

export type IBaseTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type IBaseTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type WithDescendants = {
  descendantTypesIds: Array<Scalars['ID']>
}

export type WithOwner = {
  owner: User
  ownerConnection: WithOwnerOwnerConnection
}

export type ActionBaseStoreConnection = {
  __typename?: 'ActionBaseStoreConnection'
  edges: Array<ActionBaseStoreRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ActionBaseStoreRelationship = {
  __typename?: 'ActionBaseStoreRelationship'
  cursor: Scalars['String']
  node: Store
}

/** Allows picking a action from the list of actions */
export type ActionType = IBaseType & {
  __typename?: 'ActionType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<ActionTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type ActionTypeAggregateSelection = {
  __typename?: 'ActionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ActionTypeEdge = {
  __typename?: 'ActionTypeEdge'
  cursor: Scalars['String']
  node: ActionType
}

export type ActionTypesConnection = {
  __typename?: 'ActionTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ActionTypeEdge>
}

export type ActionTypeUserOwnerAggregationSelection = {
  __typename?: 'ActionTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ActionTypeUserOwnerNodeAggregateSelection>
}

export type ActionTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ActionTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ApiAction = ActionBase & {
  __typename?: 'ApiAction'
  id: Scalars['ID']
  name: Scalars['String']
  type: ActionKind
  store: Store
  storeAggregate?: Maybe<ApiActionStoreStoreAggregationSelection>
  /** Response handlers */
  successAction?: Maybe<AnyAction>
  errorAction?: Maybe<AnyAction>
  /** Resource to fetch data from */
  resource: Resource
  resourceAggregate?: Maybe<ApiActionResourceResourceAggregationSelection>
  config: Prop
  configAggregate?: Maybe<ApiActionPropConfigAggregationSelection>
  storeConnection: ActionBaseStoreConnection
  successActionConnection: ApiActionSuccessActionConnection
  errorActionConnection: ApiActionErrorActionConnection
  resourceConnection: ApiActionResourceConnection
  configConnection: ApiActionConfigConnection
}

export type ApiActionStoreArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionSuccessActionArgs = {
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionErrorActionArgs = {
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionResourceArgs = {
  where?: InputMaybe<ResourceWhere>
  options?: InputMaybe<ResourceOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionResourceAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionConfigArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionStoreConnectionArgs = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>
}

export type ApiActionSuccessActionConnectionArgs = {
  where?: InputMaybe<ApiActionSuccessActionConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionErrorActionConnectionArgs = {
  where?: InputMaybe<ApiActionErrorActionConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ApiActionResourceConnectionArgs = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ApiActionResourceConnectionSort>>
}

export type ApiActionConfigConnectionArgs = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ApiActionConfigConnectionSort>>
}

export type ApiActionAggregateSelection = {
  __typename?: 'ApiActionAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ApiActionConfigConnection = {
  __typename?: 'ApiActionConfigConnection'
  edges: Array<ApiActionConfigRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ApiActionConfigRelationship = {
  __typename?: 'ApiActionConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ApiActionEdge = {
  __typename?: 'ApiActionEdge'
  cursor: Scalars['String']
  node: ApiAction
}

export type ApiActionErrorActionConnection = {
  __typename?: 'ApiActionErrorActionConnection'
  edges: Array<ApiActionErrorActionRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ApiActionErrorActionRelationship = {
  __typename?: 'ApiActionErrorActionRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type ApiActionPropConfigAggregationSelection = {
  __typename?: 'ApiActionPropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ApiActionPropConfigNodeAggregateSelection>
}

export type ApiActionPropConfigNodeAggregateSelection = {
  __typename?: 'ApiActionPropConfigNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  data: StringAggregateSelectionNonNullable
}

export type ApiActionResourceConnection = {
  __typename?: 'ApiActionResourceConnection'
  edges: Array<ApiActionResourceRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ApiActionResourceRelationship = {
  __typename?: 'ApiActionResourceRelationship'
  cursor: Scalars['String']
  node: Resource
}

export type ApiActionResourceResourceAggregationSelection = {
  __typename?: 'ApiActionResourceResourceAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ApiActionResourceResourceNodeAggregateSelection>
}

export type ApiActionResourceResourceNodeAggregateSelection = {
  __typename?: 'ApiActionResourceResourceNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ApiActionsConnection = {
  __typename?: 'ApiActionsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ApiActionEdge>
}

export type ApiActionStoreStoreAggregationSelection = {
  __typename?: 'ApiActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ApiActionStoreStoreNodeAggregateSelection>
}

export type ApiActionStoreStoreNodeAggregateSelection = {
  __typename?: 'ApiActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ApiActionSuccessActionConnection = {
  __typename?: 'ApiActionSuccessActionConnection'
  edges: Array<ApiActionSuccessActionRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ApiActionSuccessActionRelationship = {
  __typename?: 'ApiActionSuccessActionRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type App = WithOwner & {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  pages: Array<Page>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  store: Store
  storeAggregate?: Maybe<AppStoreStoreAggregationSelection>
  domains: Array<Domain>
  domainsAggregate?: Maybe<AppDomainDomainsAggregationSelection>
  ownerConnection: WithOwnerOwnerConnection
  pagesConnection: AppPagesConnection
  storeConnection: AppStoreConnection
  domainsConnection: AppDomainsConnection
}

export type AppOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppPagesArgs = {
  where?: InputMaybe<PageWhere>
  options?: InputMaybe<PageOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppStoreArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppDomainsArgs = {
  where?: InputMaybe<DomainWhere>
  options?: InputMaybe<DomainOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
}

export type AppPagesConnectionArgs = {
  where?: InputMaybe<AppPagesConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppPagesConnectionSort>>
}

export type AppStoreConnectionArgs = {
  where?: InputMaybe<AppStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppStoreConnectionSort>>
}

export type AppDomainsConnectionArgs = {
  where?: InputMaybe<AppDomainsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppDomainsConnectionSort>>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
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

export type AppDomainsConnection = {
  __typename?: 'AppDomainsConnection'
  edges: Array<AppDomainsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppDomainsRelationship = {
  __typename?: 'AppDomainsRelationship'
  cursor: Scalars['String']
  node: Domain
}

export type AppEdge = {
  __typename?: 'AppEdge'
  cursor: Scalars['String']
  node: App
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
  getServerSideProps: StringAggregateSelectionNullable
}

export type AppPagesConnection = {
  __typename?: 'AppPagesConnection'
  edges: Array<AppPagesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppPagesRelationship = {
  __typename?: 'AppPagesRelationship'
  cursor: Scalars['String']
  node: Page
}

export type AppsConnection = {
  __typename?: 'AppsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<AppEdge>
}

export type AppStoreConnection = {
  __typename?: 'AppStoreConnection'
  edges: Array<AppStoreRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
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

/** Allows picking a app from the list of apps */
export type AppType = IBaseType & {
  __typename?: 'AppType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type AppTypeAggregateSelection = {
  __typename?: 'AppTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppTypeEdge = {
  __typename?: 'AppTypeEdge'
  cursor: Scalars['String']
  node: AppType
}

export type AppTypesConnection = {
  __typename?: 'AppTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<AppTypeEdge>
}

export type AppTypeUserOwnerAggregationSelection = {
  __typename?: 'AppTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>
}

export type AppTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'AppTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type AppUserOwnerAggregationSelection = {
  __typename?: 'AppUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: 'AppUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = IBaseType &
  WithDescendants & {
    __typename?: 'ArrayType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    kind: TypeKind
    owner: User
    ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>
    itemType: AnyType
    ownerConnection: IBaseTypeOwnerConnection
    itemTypeConnection: ArrayTypeItemTypeConnection
  }

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeArgs = {
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeConnectionArgs = {
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ArrayTypeAggregateSelection = {
  __typename?: 'ArrayTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ArrayTypeEdge = {
  __typename?: 'ArrayTypeEdge'
  cursor: Scalars['String']
  node: ArrayType
}

export type ArrayTypeItemTypeConnection = {
  __typename?: 'ArrayTypeItemTypeConnection'
  edges: Array<ArrayTypeItemTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ArrayTypeItemTypeRelationship = {
  __typename?: 'ArrayTypeItemTypeRelationship'
  cursor: Scalars['String']
  node: AnyType
}

export type ArrayTypesConnection = {
  __typename?: 'ArrayTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ArrayTypeEdge>
}

export type ArrayTypeUserOwnerAggregationSelection = {
  __typename?: 'ArrayTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ArrayTypeUserOwnerNodeAggregateSelection>
}

export type ArrayTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ArrayTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type Atom = {
  __typename?: 'Atom'
  id: Scalars['ID']
  name: Scalars['String']
  icon?: Maybe<Scalars['String']>
  type: AtomType
  tags: Array<Tag>
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  allowedChildren: Array<Atom>
  allowedChildrenAggregate?: Maybe<AtomAtomAllowedChildrenAggregationSelection>
  tagsConnection: AtomTagsConnection
  apiConnection: AtomApiConnection
  allowedChildrenConnection: AtomAllowedChildrenConnection
}

export type AtomTagsArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomAllowedChildrenArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomAllowedChildrenAggregateArgs = {
  where?: InputMaybe<AtomWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AtomTagsConnectionArgs = {
  where?: InputMaybe<AtomTagsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AtomTagsConnectionSort>>
}

export type AtomApiConnectionArgs = {
  where?: InputMaybe<AtomApiConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AtomApiConnectionSort>>
}

export type AtomAllowedChildrenConnectionArgs = {
  where?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AtomAllowedChildrenConnectionSort>>
}

export type AtomAggregateSelection = {
  __typename?: 'AtomAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  icon: StringAggregateSelectionNullable
}

export type AtomAllowedChildrenConnection = {
  __typename?: 'AtomAllowedChildrenConnection'
  edges: Array<AtomAllowedChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AtomAllowedChildrenRelationship = {
  __typename?: 'AtomAllowedChildrenRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type AtomApiConnection = {
  __typename?: 'AtomApiConnection'
  edges: Array<AtomApiRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AtomApiRelationship = {
  __typename?: 'AtomApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type AtomAtomAllowedChildrenAggregationSelection = {
  __typename?: 'AtomAtomAllowedChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AtomAtomAllowedChildrenNodeAggregateSelection>
}

export type AtomAtomAllowedChildrenNodeAggregateSelection = {
  __typename?: 'AtomAtomAllowedChildrenNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  icon: StringAggregateSelectionNullable
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

export type AtomsConnection = {
  __typename?: 'AtomsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<AtomEdge>
}

export type AtomTagsConnection = {
  __typename?: 'AtomTagsConnection'
  edges: Array<AtomTagsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AtomTagsRelationship = {
  __typename?: 'AtomTagsRelationship'
  cursor: Scalars['String']
  node: Tag
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

export type BaseType = IBaseType & {
  __typename?: 'BaseType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<BaseTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

export type BaseTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type BaseTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type BaseTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type BaseTypeAggregateSelection = {
  __typename?: 'BaseTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type BaseTypeEdge = {
  __typename?: 'BaseTypeEdge'
  cursor: Scalars['String']
  node: BaseType
}

export type BaseTypesConnection = {
  __typename?: 'BaseTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<BaseTypeEdge>
}

export type BaseTypeUserOwnerAggregationSelection = {
  __typename?: 'BaseTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<BaseTypeUserOwnerNodeAggregateSelection>
}

export type BaseTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'BaseTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type CodeAction = ActionBase & {
  __typename?: 'CodeAction'
  id: Scalars['ID']
  name: Scalars['String']
  /** Code to run when action is triggered */
  code: Scalars['String']
  type: ActionKind
  store: Store
  storeAggregate?: Maybe<CodeActionStoreStoreAggregationSelection>
  storeConnection: ActionBaseStoreConnection
}

export type CodeActionStoreArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type CodeActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type CodeActionStoreConnectionArgs = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>
}

export type CodeActionAggregateSelection = {
  __typename?: 'CodeActionAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  code: StringAggregateSelectionNonNullable
}

export type CodeActionEdge = {
  __typename?: 'CodeActionEdge'
  cursor: Scalars['String']
  node: CodeAction
}

export type CodeActionsConnection = {
  __typename?: 'CodeActionsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<CodeActionEdge>
}

export type CodeActionStoreStoreAggregationSelection = {
  __typename?: 'CodeActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<CodeActionStoreStoreNodeAggregateSelection>
}

export type CodeActionStoreStoreNodeAggregateSelection = {
  __typename?: 'CodeActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorType = IBaseType & {
  __typename?: 'CodeMirrorType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  language: CodeMirrorLanguage
  owner: User
  ownerAggregate?: Maybe<CodeMirrorTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type CodeMirrorTypeAggregateSelection = {
  __typename?: 'CodeMirrorTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type CodeMirrorTypeEdge = {
  __typename?: 'CodeMirrorTypeEdge'
  cursor: Scalars['String']
  node: CodeMirrorType
}

export type CodeMirrorTypesConnection = {
  __typename?: 'CodeMirrorTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<CodeMirrorTypeEdge>
}

export type CodeMirrorTypeUserOwnerAggregationSelection = {
  __typename?: 'CodeMirrorTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<CodeMirrorTypeUserOwnerNodeAggregateSelection>
}

export type CodeMirrorTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'CodeMirrorTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type Component = WithOwner & {
  __typename?: 'Component'
  id: Scalars['ID']
  name: Scalars['String']
  descendantComponentIds: Array<Scalars['ID']>
  rootElement: Element
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>
  api: InterfaceType
  apiAggregate?: Maybe<ComponentInterfaceTypeApiAggregationSelection>
  owner: User
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>
  rootElementConnection: ComponentRootElementConnection
  apiConnection: ComponentApiConnection
  ownerConnection: WithOwnerOwnerConnection
}

export type ComponentRootElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ComponentRootElementConnectionArgs = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ComponentRootElementConnectionSort>>
}

export type ComponentApiConnectionArgs = {
  where?: InputMaybe<ComponentApiConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ComponentApiConnectionSort>>
}

export type ComponentOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
}

export type ComponentAggregateSelection = {
  __typename?: 'ComponentAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ComponentApiConnection = {
  __typename?: 'ComponentApiConnection'
  edges: Array<ComponentApiRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ComponentApiRelationship = {
  __typename?: 'ComponentApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
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
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
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

export type ComponentRootElementConnection = {
  __typename?: 'ComponentRootElementConnection'
  edges: Array<ComponentRootElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ComponentRootElementRelationship = {
  __typename?: 'ComponentRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ComponentsConnection = {
  __typename?: 'ComponentsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ComponentEdge>
}

export type ComponentUserOwnerAggregationSelection = {
  __typename?: 'ComponentUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ComponentUserOwnerNodeAggregateSelection>
}

export type ComponentUserOwnerNodeAggregateSelection = {
  __typename?: 'ComponentUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type CreateActionTypesMutationResponse = {
  __typename?: 'CreateActionTypesMutationResponse'
  info: CreateInfo
  actionTypes: Array<ActionType>
}

export type CreateApiActionsMutationResponse = {
  __typename?: 'CreateApiActionsMutationResponse'
  info: CreateInfo
  apiActions: Array<ApiAction>
}

export type CreateAppsMutationResponse = {
  __typename?: 'CreateAppsMutationResponse'
  info: CreateInfo
  apps: Array<App>
}

export type CreateAppTypesMutationResponse = {
  __typename?: 'CreateAppTypesMutationResponse'
  info: CreateInfo
  appTypes: Array<AppType>
}

export type CreateArrayTypesMutationResponse = {
  __typename?: 'CreateArrayTypesMutationResponse'
  info: CreateInfo
  arrayTypes: Array<ArrayType>
}

export type CreateAtomsMutationResponse = {
  __typename?: 'CreateAtomsMutationResponse'
  info: CreateInfo
  atoms: Array<Atom>
}

export type CreateBaseTypesMutationResponse = {
  __typename?: 'CreateBaseTypesMutationResponse'
  info: CreateInfo
  baseTypes: Array<BaseType>
}

export type CreateCodeActionsMutationResponse = {
  __typename?: 'CreateCodeActionsMutationResponse'
  info: CreateInfo
  codeActions: Array<CodeAction>
}

export type CreateCodeMirrorTypesMutationResponse = {
  __typename?: 'CreateCodeMirrorTypesMutationResponse'
  info: CreateInfo
  codeMirrorTypes: Array<CodeMirrorType>
}

export type CreateComponentsMutationResponse = {
  __typename?: 'CreateComponentsMutationResponse'
  info: CreateInfo
  components: Array<Component>
}

export type CreateCreateInfosMutationResponse = {
  __typename?: 'CreateCreateInfosMutationResponse'
  info: CreateInfo
  createInfos: Array<CreateInfo>
}

export type CreateDeleteInfosMutationResponse = {
  __typename?: 'CreateDeleteInfosMutationResponse'
  info: CreateInfo
  deleteInfos: Array<DeleteInfo>
}

export type CreateDomainsMutationResponse = {
  __typename?: 'CreateDomainsMutationResponse'
  info: CreateInfo
  domains: Array<Domain>
}

export type CreateElementsMutationResponse = {
  __typename?: 'CreateElementsMutationResponse'
  info: CreateInfo
  elements: Array<Element>
}

export type CreateElementTypesMutationResponse = {
  __typename?: 'CreateElementTypesMutationResponse'
  info: CreateInfo
  elementTypes: Array<ElementType>
}

export type CreateEnumTypesMutationResponse = {
  __typename?: 'CreateEnumTypesMutationResponse'
  info: CreateInfo
  enumTypes: Array<EnumType>
}

export type CreateEnumTypeValuesMutationResponse = {
  __typename?: 'CreateEnumTypeValuesMutationResponse'
  info: CreateInfo
  enumTypeValues: Array<EnumTypeValue>
}

export type CreateFieldsMutationResponse = {
  __typename?: 'CreateFieldsMutationResponse'
  info: CreateInfo
  fields: Array<Field>
}

export type CreateGetBaseTypesReturnsMutationResponse = {
  __typename?: 'CreateGetBaseTypesReturnsMutationResponse'
  info: CreateInfo
  getBaseTypesReturns: Array<GetBaseTypesReturn>
}

export type CreateHooksMutationResponse = {
  __typename?: 'CreateHooksMutationResponse'
  info: CreateInfo
  hooks: Array<Hook>
}

export type CreateInfo = {
  __typename?: 'CreateInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoAggregateSelection = {
  __typename?: 'CreateInfoAggregateSelection'
  count: Scalars['Int']
  bookmark: StringAggregateSelectionNullable
  nodesCreated: IntAggregateSelectionNonNullable
  relationshipsCreated: IntAggregateSelectionNonNullable
}

export type CreateInfoEdge = {
  __typename?: 'CreateInfoEdge'
  cursor: Scalars['String']
  node: CreateInfo
}

export type CreateInfosConnection = {
  __typename?: 'CreateInfosConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<CreateInfoEdge>
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

export type CreatePagesMutationResponse = {
  __typename?: 'CreatePagesMutationResponse'
  info: CreateInfo
  pages: Array<Page>
}

export type CreatePageTypesMutationResponse = {
  __typename?: 'CreatePageTypesMutationResponse'
  info: CreateInfo
  pageTypes: Array<PageType>
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

export type CreateVercelDomainConfigsMutationResponse = {
  __typename?: 'CreateVercelDomainConfigsMutationResponse'
  info: CreateInfo
  vercelDomainConfigs: Array<VercelDomainConfig>
}

export type CreateVercelProjectDomainsMutationResponse = {
  __typename?: 'CreateVercelProjectDomainsMutationResponse'
  info: CreateInfo
  vercelProjectDomains: Array<VercelProjectDomain>
}

export type DeleteInfo = {
  __typename?: 'DeleteInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type DeleteInfoAggregateSelection = {
  __typename?: 'DeleteInfoAggregateSelection'
  count: Scalars['Int']
  bookmark: StringAggregateSelectionNullable
  nodesDeleted: IntAggregateSelectionNonNullable
  relationshipsDeleted: IntAggregateSelectionNonNullable
}

export type DeleteInfoEdge = {
  __typename?: 'DeleteInfoEdge'
  cursor: Scalars['String']
  node: DeleteInfo
}

export type DeleteInfosConnection = {
  __typename?: 'DeleteInfosConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<DeleteInfoEdge>
}

export type Domain = {
  __typename?: 'Domain'
  id: Scalars['ID']
  name: Scalars['String']
  domainConfig: VercelDomainConfig
  projectDomain: VercelProjectDomain
  app: App
  appAggregate?: Maybe<DomainAppAppAggregationSelection>
  appConnection: DomainAppConnection
}

export type DomainAppArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type DomainAppAggregateArgs = {
  where?: InputMaybe<AppWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type DomainAppConnectionArgs = {
  where?: InputMaybe<DomainAppConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<DomainAppConnectionSort>>
}

export type DomainAggregateSelection = {
  __typename?: 'DomainAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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

export type DomainAppConnection = {
  __typename?: 'DomainAppConnection'
  edges: Array<DomainAppRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type DomainAppRelationship = {
  __typename?: 'DomainAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type DomainEdge = {
  __typename?: 'DomainEdge'
  cursor: Scalars['String']
  node: Domain
}

export type DomainsConnection = {
  __typename?: 'DomainsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<DomainEdge>
}

export type Element = {
  __typename?: 'Element'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  customCss?: Maybe<Scalars['String']>
  guiCss?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  preRenderActionId?: Maybe<Scalars['String']>
  postRenderActionId?: Maybe<Scalars['String']>
  descendantElements: Array<Element>
  nextSibling?: Maybe<Element>
  nextSiblingAggregate?: Maybe<ElementElementNextSiblingAggregationSelection>
  prevSibling?: Maybe<Element>
  prevSiblingAggregate?: Maybe<ElementElementPrevSiblingAggregationSelection>
  firstChild?: Maybe<Element>
  firstChildAggregate?: Maybe<ElementElementFirstChildAggregationSelection>
  parent?: Maybe<Element>
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>
  page?: Maybe<Page>
  pageAggregate?: Maybe<ElementPagePageAggregationSelection>
  props?: Maybe<Prop>
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>
  parentComponent?: Maybe<Component>
  parentComponentAggregate?: Maybe<ElementComponentParentComponentAggregationSelection>
  renderComponentType?: Maybe<Component>
  renderComponentTypeAggregate?: Maybe<ElementComponentRenderComponentTypeAggregationSelection>
  renderAtomType?: Maybe<Atom>
  renderAtomTypeAggregate?: Maybe<ElementAtomRenderAtomTypeAggregationSelection>
  hooks: Array<Hook>
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingPropMapBindingsAggregationSelection>
  nextSiblingConnection: ElementNextSiblingConnection
  prevSiblingConnection: ElementPrevSiblingConnection
  firstChildConnection: ElementFirstChildConnection
  parentConnection: ElementParentConnection
  pageConnection: ElementPageConnection
  propsConnection: ElementPropsConnection
  parentComponentConnection: ElementParentComponentConnection
  renderComponentTypeConnection: ElementRenderComponentTypeConnection
  renderAtomTypeConnection: ElementRenderAtomTypeConnection
  hooksConnection: ElementHooksConnection
  propMapBindingsConnection: ElementPropMapBindingsConnection
}

export type ElementNextSiblingArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementNextSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPrevSiblingArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPrevSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementFirstChildArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementFirstChildAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementParentArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementParentAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPageArgs = {
  where?: InputMaybe<PageWhere>
  options?: InputMaybe<PageOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPageAggregateArgs = {
  where?: InputMaybe<PageWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPropsArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementParentComponentArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementParentComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementRenderComponentTypeArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementRenderComponentTypeAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementRenderAtomTypeArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementRenderAtomTypeAggregateArgs = {
  where?: InputMaybe<AtomWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementHooksArgs = {
  where?: InputMaybe<HookWhere>
  options?: InputMaybe<HookOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  options?: InputMaybe<PropMapBindingOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementNextSiblingConnectionArgs = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementNextSiblingConnectionSort>>
}

export type ElementPrevSiblingConnectionArgs = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementPrevSiblingConnectionSort>>
}

export type ElementFirstChildConnectionArgs = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementFirstChildConnectionSort>>
}

export type ElementParentConnectionArgs = {
  where?: InputMaybe<ElementParentConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementParentConnectionSort>>
}

export type ElementPageConnectionArgs = {
  where?: InputMaybe<ElementPageConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementPageConnectionSort>>
}

export type ElementPropsConnectionArgs = {
  where?: InputMaybe<ElementPropsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementPropsConnectionSort>>
}

export type ElementParentComponentConnectionArgs = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementParentComponentConnectionSort>>
}

export type ElementRenderComponentTypeConnectionArgs = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementRenderComponentTypeConnectionSort>>
}

export type ElementRenderAtomTypeConnectionArgs = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementRenderAtomTypeConnectionSort>>
}

export type ElementHooksConnectionArgs = {
  where?: InputMaybe<ElementHooksConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementHooksConnectionSort>>
}

export type ElementPropMapBindingsConnectionArgs = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementPropMapBindingsConnectionSort>>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type ElementAtomRenderAtomTypeAggregationSelection = {
  __typename?: 'ElementAtomRenderAtomTypeAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementAtomRenderAtomTypeNodeAggregateSelection>
}

export type ElementAtomRenderAtomTypeNodeAggregateSelection = {
  __typename?: 'ElementAtomRenderAtomTypeNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  icon: StringAggregateSelectionNullable
}

export type ElementComponentParentComponentAggregationSelection = {
  __typename?: 'ElementComponentParentComponentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementComponentParentComponentNodeAggregateSelection>
}

export type ElementComponentParentComponentNodeAggregateSelection = {
  __typename?: 'ElementComponentParentComponentNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementComponentRenderComponentTypeAggregationSelection = {
  __typename?: 'ElementComponentRenderComponentTypeAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementComponentRenderComponentTypeNodeAggregateSelection>
}

export type ElementComponentRenderComponentTypeNodeAggregateSelection = {
  __typename?: 'ElementComponentRenderComponentTypeNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementEdge = {
  __typename?: 'ElementEdge'
  cursor: Scalars['String']
  node: Element
}

export type ElementElementFirstChildAggregationSelection = {
  __typename?: 'ElementElementFirstChildAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementFirstChildNodeAggregateSelection>
}

export type ElementElementFirstChildNodeAggregateSelection = {
  __typename?: 'ElementElementFirstChildNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type ElementElementNextSiblingAggregationSelection = {
  __typename?: 'ElementElementNextSiblingAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementNextSiblingNodeAggregateSelection>
}

export type ElementElementNextSiblingNodeAggregateSelection = {
  __typename?: 'ElementElementNextSiblingNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type ElementElementParentAggregationSelection = {
  __typename?: 'ElementElementParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentNodeAggregateSelection>
}

export type ElementElementParentNodeAggregateSelection = {
  __typename?: 'ElementElementParentNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type ElementElementPrevSiblingAggregationSelection = {
  __typename?: 'ElementElementPrevSiblingAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementPrevSiblingNodeAggregateSelection>
}

export type ElementElementPrevSiblingNodeAggregateSelection = {
  __typename?: 'ElementElementPrevSiblingNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type ElementFirstChildConnection = {
  __typename?: 'ElementFirstChildConnection'
  edges: Array<ElementFirstChildRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementFirstChildRelationship = {
  __typename?: 'ElementFirstChildRelationship'
  cursor: Scalars['String']
  node: Element
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

export type ElementHooksConnection = {
  __typename?: 'ElementHooksConnection'
  edges: Array<ElementHooksRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementHooksRelationship = {
  __typename?: 'ElementHooksRelationship'
  cursor: Scalars['String']
  node: Hook
}

export type ElementNextSiblingConnection = {
  __typename?: 'ElementNextSiblingConnection'
  edges: Array<ElementNextSiblingRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementNextSiblingRelationship = {
  __typename?: 'ElementNextSiblingRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementPageConnection = {
  __typename?: 'ElementPageConnection'
  edges: Array<ElementPageRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
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
  getServerSideProps: StringAggregateSelectionNullable
}

export type ElementPageRelationship = {
  __typename?: 'ElementPageRelationship'
  cursor: Scalars['String']
  node: Page
}

export type ElementParentComponentConnection = {
  __typename?: 'ElementParentComponentConnection'
  edges: Array<ElementParentComponentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementParentComponentRelationship = {
  __typename?: 'ElementParentComponentRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementParentConnection = {
  __typename?: 'ElementParentConnection'
  edges: Array<ElementParentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementParentRelationship = {
  __typename?: 'ElementParentRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementPrevSiblingConnection = {
  __typename?: 'ElementPrevSiblingConnection'
  edges: Array<ElementPrevSiblingRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementPrevSiblingRelationship = {
  __typename?: 'ElementPrevSiblingRelationship'
  cursor: Scalars['String']
  node: Element
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

export type ElementPropMapBindingsConnection = {
  __typename?: 'ElementPropMapBindingsConnection'
  edges: Array<ElementPropMapBindingsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementPropMapBindingsRelationship = {
  __typename?: 'ElementPropMapBindingsRelationship'
  cursor: Scalars['String']
  node: PropMapBinding
}

export type ElementPropPropsAggregationSelection = {
  __typename?: 'ElementPropPropsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementPropPropsNodeAggregateSelection>
}

export type ElementPropPropsNodeAggregateSelection = {
  __typename?: 'ElementPropPropsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  data: StringAggregateSelectionNonNullable
}

export type ElementPropsConnection = {
  __typename?: 'ElementPropsConnection'
  edges: Array<ElementPropsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementPropsRelationship = {
  __typename?: 'ElementPropsRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ElementRenderAtomTypeConnection = {
  __typename?: 'ElementRenderAtomTypeConnection'
  edges: Array<ElementRenderAtomTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementRenderAtomTypeRelationship = {
  __typename?: 'ElementRenderAtomTypeRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type ElementRenderComponentTypeConnection = {
  __typename?: 'ElementRenderComponentTypeConnection'
  edges: Array<ElementRenderComponentTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementRenderComponentTypeRelationship = {
  __typename?: 'ElementRenderComponentTypeRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementsConnection = {
  __typename?: 'ElementsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ElementEdge>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementType = IBaseType & {
  __typename?: 'ElementType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind
  owner: User
  ownerAggregate?: Maybe<ElementTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type ElementTypeAggregateSelection = {
  __typename?: 'ElementTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementTypeEdge = {
  __typename?: 'ElementTypeEdge'
  cursor: Scalars['String']
  node: ElementType
}

export type ElementTypesConnection = {
  __typename?: 'ElementTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ElementTypeEdge>
}

export type ElementTypeUserOwnerAggregationSelection = {
  __typename?: 'ElementTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>
}

export type ElementTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ElementTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumType = IBaseType & {
  __typename?: 'EnumType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>
  allowedValues: Array<EnumTypeValue>
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
  allowedValuesConnection: EnumTypeAllowedValuesConnection
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  options?: InputMaybe<EnumTypeValueOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesConnectionArgs = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<EnumTypeAllowedValuesConnectionSort>>
}

export type EnumTypeAggregateSelection = {
  __typename?: 'EnumTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type EnumTypeAllowedValuesConnection = {
  __typename?: 'EnumTypeAllowedValuesConnection'
  edges: Array<EnumTypeAllowedValuesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type EnumTypeAllowedValuesRelationship = {
  __typename?: 'EnumTypeAllowedValuesRelationship'
  cursor: Scalars['String']
  node: EnumTypeValue
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
  key: StringAggregateSelectionNonNullable
  value: StringAggregateSelectionNonNullable
}

export type EnumTypesConnection = {
  __typename?: 'EnumTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<EnumTypeEdge>
}

export type EnumTypeUserOwnerAggregationSelection = {
  __typename?: 'EnumTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>
}

export type EnumTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'EnumTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type EnumTypeValue = {
  __typename?: 'EnumTypeValue'
  id: Scalars['ID']
  key: Scalars['String']
  value: Scalars['String']
  enumType?: Maybe<EnumType>
  enumTypeAggregate?: Maybe<EnumTypeValueEnumTypeEnumTypeAggregationSelection>
  enumTypeConnection: EnumTypeValueEnumTypeConnection
}

export type EnumTypeValueEnumTypeArgs = {
  where?: InputMaybe<EnumTypeWhere>
  options?: InputMaybe<EnumTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type EnumTypeValueEnumTypeAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type EnumTypeValueEnumTypeConnectionArgs = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionSort>>
}

export type EnumTypeValueAggregateSelection = {
  __typename?: 'EnumTypeValueAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  key: StringAggregateSelectionNonNullable
  value: StringAggregateSelectionNonNullable
}

export type EnumTypeValueEdge = {
  __typename?: 'EnumTypeValueEdge'
  cursor: Scalars['String']
  node: EnumTypeValue
}

export type EnumTypeValueEnumTypeConnection = {
  __typename?: 'EnumTypeValueEnumTypeConnection'
  edges: Array<EnumTypeValueEnumTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
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

export type EnumTypeValueEnumTypeRelationship = {
  __typename?: 'EnumTypeValueEnumTypeRelationship'
  cursor: Scalars['String']
  node: EnumType
}

export type EnumTypeValuesConnection = {
  __typename?: 'EnumTypeValuesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<EnumTypeValueEdge>
}

export type Field = {
  __typename?: 'Field'
  id: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  validationRules?: Maybe<Scalars['String']>
  defaultValues?: Maybe<Scalars['String']>
  fieldType: IBaseType
  api: InterfaceType
  apiAggregate?: Maybe<FieldInterfaceTypeApiAggregationSelection>
  fieldTypeConnection: FieldFieldTypeConnection
  apiConnection: FieldApiConnection
}

export type FieldFieldTypeArgs = {
  options?: InputMaybe<IBaseTypeOptions>
  where?: InputMaybe<IBaseTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type FieldApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type FieldApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type FieldFieldTypeConnectionArgs = {
  where?: InputMaybe<FieldFieldTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<FieldFieldTypeConnectionSort>>
}

export type FieldApiConnectionArgs = {
  where?: InputMaybe<FieldApiConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<FieldApiConnectionSort>>
}

export type FieldAggregateSelection = {
  __typename?: 'FieldAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  key: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  description: StringAggregateSelectionNullable
  validationRules: StringAggregateSelectionNullable
  defaultValues: StringAggregateSelectionNullable
}

export type FieldApiConnection = {
  __typename?: 'FieldApiConnection'
  edges: Array<FieldApiRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type FieldApiRelationship = {
  __typename?: 'FieldApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type FieldEdge = {
  __typename?: 'FieldEdge'
  cursor: Scalars['String']
  node: Field
}

export type FieldFieldTypeConnection = {
  __typename?: 'FieldFieldTypeConnection'
  edges: Array<FieldFieldTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type FieldFieldTypeRelationship = {
  __typename?: 'FieldFieldTypeRelationship'
  cursor: Scalars['String']
  node: IBaseType
}

export type FieldInterfaceTypeApiAggregationSelection = {
  __typename?: 'FieldInterfaceTypeApiAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<FieldInterfaceTypeApiNodeAggregateSelection>
}

export type FieldInterfaceTypeApiNodeAggregateSelection = {
  __typename?: 'FieldInterfaceTypeApiNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type FieldsConnection = {
  __typename?: 'FieldsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<FieldEdge>
}

export type GetBaseTypesReturn = {
  __typename?: 'GetBaseTypesReturn'
  totalCount: Scalars['Int']
  items: Array<BaseType>
}

export type GetBaseTypesReturnAggregateSelection = {
  __typename?: 'GetBaseTypesReturnAggregateSelection'
  count: Scalars['Int']
  totalCount: IntAggregateSelectionNonNullable
}

export type GetBaseTypesReturnEdge = {
  __typename?: 'GetBaseTypesReturnEdge'
  cursor: Scalars['String']
  node: GetBaseTypesReturn
}

export type GetBaseTypesReturnsConnection = {
  __typename?: 'GetBaseTypesReturnsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<GetBaseTypesReturnEdge>
}

export type Hook = {
  __typename?: 'Hook'
  id: Scalars['ID']
  type: AtomType
  config: Prop
  configAggregate?: Maybe<HookPropConfigAggregationSelection>
  element: Element
  elementAggregate?: Maybe<HookElementElementAggregationSelection>
  configConnection: HookConfigConnection
  elementConnection: HookElementConnection
}

export type HookConfigArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type HookConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type HookElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type HookElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type HookConfigConnectionArgs = {
  where?: InputMaybe<HookConfigConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<HookConfigConnectionSort>>
}

export type HookElementConnectionArgs = {
  where?: InputMaybe<HookElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<HookElementConnectionSort>>
}

export type HookAggregateSelection = {
  __typename?: 'HookAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
}

export type HookConfigConnection = {
  __typename?: 'HookConfigConnection'
  edges: Array<HookConfigRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type HookConfigRelationship = {
  __typename?: 'HookConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type HookEdge = {
  __typename?: 'HookEdge'
  cursor: Scalars['String']
  node: Hook
}

export type HookElementConnection = {
  __typename?: 'HookElementConnection'
  edges: Array<HookElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type HookElementElementAggregationSelection = {
  __typename?: 'HookElementElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<HookElementElementNodeAggregateSelection>
}

export type HookElementElementNodeAggregateSelection = {
  __typename?: 'HookElementElementNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type HookElementRelationship = {
  __typename?: 'HookElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type HookPropConfigAggregationSelection = {
  __typename?: 'HookPropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<HookPropConfigNodeAggregateSelection>
}

export type HookPropConfigNodeAggregateSelection = {
  __typename?: 'HookPropConfigNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  data: StringAggregateSelectionNonNullable
}

export type HooksConnection = {
  __typename?: 'HooksConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<HookEdge>
}

export type IBaseTypeOwnerConnection = {
  __typename?: 'IBaseTypeOwnerConnection'
  edges: Array<IBaseTypeOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type IBaseTypeOwnerRelationship = {
  __typename?: 'IBaseTypeOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable'
  shortest: Scalars['ID']
  longest: Scalars['ID']
}

export type IntAggregateSelectionNonNullable = {
  __typename?: 'IntAggregateSelectionNonNullable'
  max: Scalars['Int']
  min: Scalars['Int']
  average: Scalars['Float']
  sum: Scalars['Int']
}

/** Represents an object type with multiple fields */
export type InterfaceType = IBaseType &
  WithDescendants & {
    __typename?: 'InterfaceType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    kind: TypeKind
    owner: User
    ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>
    apiOfAtoms: Array<Atom>
    apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>
    fields: Array<Field>
    fieldsAggregate?: Maybe<InterfaceTypeFieldFieldsAggregationSelection>
    ownerConnection: IBaseTypeOwnerConnection
    apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection
    fieldsConnection: InterfaceTypeFieldsConnection
  }

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsArgs = {
  where?: InputMaybe<FieldWhere>
  options?: InputMaybe<FieldOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsAggregateArgs = {
  where?: InputMaybe<FieldWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionSort>>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<InterfaceTypeFieldsConnectionSort>>
}

export type InterfaceTypeAggregateSelection = {
  __typename?: 'InterfaceTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type InterfaceTypeApiOfAtomsConnection = {
  __typename?: 'InterfaceTypeApiOfAtomsConnection'
  edges: Array<InterfaceTypeApiOfAtomsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type InterfaceTypeApiOfAtomsRelationship = {
  __typename?: 'InterfaceTypeApiOfAtomsRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type InterfaceTypeAtomApiOfAtomsAggregationSelection = {
  __typename?: 'InterfaceTypeAtomApiOfAtomsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeAtomApiOfAtomsNodeAggregateSelection>
}

export type InterfaceTypeAtomApiOfAtomsNodeAggregateSelection = {
  __typename?: 'InterfaceTypeAtomApiOfAtomsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  icon: StringAggregateSelectionNullable
}

export type InterfaceTypeEdge = {
  __typename?: 'InterfaceTypeEdge'
  cursor: Scalars['String']
  node: InterfaceType
}

export type InterfaceTypeFieldFieldsAggregationSelection = {
  __typename?: 'InterfaceTypeFieldFieldsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeFieldFieldsNodeAggregateSelection>
}

export type InterfaceTypeFieldFieldsNodeAggregateSelection = {
  __typename?: 'InterfaceTypeFieldFieldsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  key: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  description: StringAggregateSelectionNullable
  validationRules: StringAggregateSelectionNullable
  defaultValues: StringAggregateSelectionNullable
}

export type InterfaceTypeFieldsConnection = {
  __typename?: 'InterfaceTypeFieldsConnection'
  edges: Array<InterfaceTypeFieldsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type InterfaceTypeFieldsRelationship = {
  __typename?: 'InterfaceTypeFieldsRelationship'
  cursor: Scalars['String']
  node: Field
}

export type InterfaceTypesConnection = {
  __typename?: 'InterfaceTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<InterfaceTypeEdge>
}

export type InterfaceTypeUserOwnerAggregationSelection = {
  __typename?: 'InterfaceTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeUserOwnerNodeAggregateSelection>
}

export type InterfaceTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'InterfaceTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

/** Allows picking a lambda */
export type LambdaType = IBaseType & {
  __typename?: 'LambdaType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Allows picking a lambda */
export type LambdaTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type LambdaTypeAggregateSelection = {
  __typename?: 'LambdaTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type LambdaTypeEdge = {
  __typename?: 'LambdaTypeEdge'
  cursor: Scalars['String']
  node: LambdaType
}

export type LambdaTypesConnection = {
  __typename?: 'LambdaTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<LambdaTypeEdge>
}

export type LambdaTypeUserOwnerAggregationSelection = {
  __typename?: 'LambdaTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>
}

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'LambdaTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  getServerSideProps?: Maybe<Scalars['String']>
  isProvider: Scalars['Boolean']
  rootElement: Element
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  app: App
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  rootElementConnection: PageRootElementConnection
  appConnection: PageAppConnection
}

export type PageRootElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PageRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PageAppArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PageAppAggregateArgs = {
  where?: InputMaybe<AppWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PageRootElementConnectionArgs = {
  where?: InputMaybe<PageRootElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<PageRootElementConnectionSort>>
}

export type PageAppConnectionArgs = {
  where?: InputMaybe<PageAppConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<PageAppConnectionSort>>
}

export type PageAggregateSelection = {
  __typename?: 'PageAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  slug: StringAggregateSelectionNonNullable
  getServerSideProps: StringAggregateSelectionNullable
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

export type PageAppConnection = {
  __typename?: 'PageAppConnection'
  edges: Array<PageAppRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PageAppRelationship = {
  __typename?: 'PageAppRelationship'
  cursor: Scalars['String']
  node: App
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
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type PageRootElementConnection = {
  __typename?: 'PageRootElementConnection'
  edges: Array<PageRootElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PageRootElementRelationship = {
  __typename?: 'PageRootElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PagesConnection = {
  __typename?: 'PagesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<PageEdge>
}

/** Allows picking a page from the list of pages */
export type PageType = IBaseType & {
  __typename?: 'PageType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type PageTypeAggregateSelection = {
  __typename?: 'PageTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PageTypeEdge = {
  __typename?: 'PageTypeEdge'
  cursor: Scalars['String']
  node: PageType
}

export type PageTypesConnection = {
  __typename?: 'PageTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<PageTypeEdge>
}

export type PageTypeUserOwnerAggregationSelection = {
  __typename?: 'PageTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>
}

export type PageTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PageTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = IBaseType & {
  __typename?: 'PrimitiveType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  primitiveKind: PrimitiveTypeKind
  owner: User
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type PrimitiveTypeAggregateSelection = {
  __typename?: 'PrimitiveTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PrimitiveTypeEdge = {
  __typename?: 'PrimitiveTypeEdge'
  cursor: Scalars['String']
  node: PrimitiveType
}

export type PrimitiveTypesConnection = {
  __typename?: 'PrimitiveTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<PrimitiveTypeEdge>
}

export type PrimitiveTypeUserOwnerAggregationSelection = {
  __typename?: 'PrimitiveTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>
}

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PrimitiveTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type Prop = {
  __typename?: 'Prop'
  id: Scalars['ID']
  data: Scalars['String']
}

export type PropAggregateSelection = {
  __typename?: 'PropAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  data: StringAggregateSelectionNonNullable
}

export type PropEdge = {
  __typename?: 'PropEdge'
  cursor: Scalars['String']
  node: Prop
}

export type PropMapBinding = {
  __typename?: 'PropMapBinding'
  id: Scalars['ID']
  sourceKey: Scalars['String']
  targetKey: Scalars['String']
  element: Element
  elementAggregate?: Maybe<PropMapBindingElementElementAggregationSelection>
  targetElement?: Maybe<Element>
  targetElementAggregate?: Maybe<PropMapBindingElementTargetElementAggregationSelection>
  elementConnection: PropMapBindingElementConnection
  targetElementConnection: PropMapBindingTargetElementConnection
}

export type PropMapBindingElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PropMapBindingElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PropMapBindingTargetElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PropMapBindingTargetElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type PropMapBindingElementConnectionArgs = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<PropMapBindingElementConnectionSort>>
}

export type PropMapBindingTargetElementConnectionArgs = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<PropMapBindingTargetElementConnectionSort>>
}

export type PropMapBindingAggregateSelection = {
  __typename?: 'PropMapBindingAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  sourceKey: StringAggregateSelectionNonNullable
  targetKey: StringAggregateSelectionNonNullable
}

export type PropMapBindingEdge = {
  __typename?: 'PropMapBindingEdge'
  cursor: Scalars['String']
  node: PropMapBinding
}

export type PropMapBindingElementConnection = {
  __typename?: 'PropMapBindingElementConnection'
  edges: Array<PropMapBindingElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PropMapBindingElementElementAggregationSelection = {
  __typename?: 'PropMapBindingElementElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PropMapBindingElementElementNodeAggregateSelection>
}

export type PropMapBindingElementElementNodeAggregateSelection = {
  __typename?: 'PropMapBindingElementElementNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
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
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type PropMapBindingsConnection = {
  __typename?: 'PropMapBindingsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<PropMapBindingEdge>
}

export type PropMapBindingTargetElementConnection = {
  __typename?: 'PropMapBindingTargetElementConnection'
  edges: Array<PropMapBindingTargetElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type PropMapBindingTargetElementRelationship = {
  __typename?: 'PropMapBindingTargetElementRelationship'
  cursor: Scalars['String']
  node: Element
}

export type PropsConnection = {
  __typename?: 'PropsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<PropEdge>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeType = IBaseType & {
  __typename?: 'ReactNodeType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<ReactNodeTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type ReactNodeTypeAggregateSelection = {
  __typename?: 'ReactNodeTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ReactNodeTypeEdge = {
  __typename?: 'ReactNodeTypeEdge'
  cursor: Scalars['String']
  node: ReactNodeType
}

export type ReactNodeTypesConnection = {
  __typename?: 'ReactNodeTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ReactNodeTypeEdge>
}

export type ReactNodeTypeUserOwnerAggregationSelection = {
  __typename?: 'ReactNodeTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>
}

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ReactNodeTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
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
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropsType = IBaseType & {
  __typename?: 'RenderPropsType'
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner: User
  ownerAggregate?: Maybe<RenderPropsTypeUserOwnerAggregationSelection>
  ownerConnection: IBaseTypeOwnerConnection
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
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropsTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
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
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropsTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
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
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropsTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

export type RenderPropsTypeAggregateSelection = {
  __typename?: 'RenderPropsTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type RenderPropsTypeEdge = {
  __typename?: 'RenderPropsTypeEdge'
  cursor: Scalars['String']
  node: RenderPropsType
}

export type RenderPropsTypesConnection = {
  __typename?: 'RenderPropsTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<RenderPropsTypeEdge>
}

export type RenderPropsTypeUserOwnerAggregationSelection = {
  __typename?: 'RenderPropsTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<RenderPropsTypeUserOwnerNodeAggregateSelection>
}

export type RenderPropsTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'RenderPropsTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type ResetDatabaseMutationResponse = {
  __typename?: 'ResetDatabaseMutationResponse'
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseAggregateSelection = {
  __typename?: 'ResetDatabaseMutationResponseAggregateSelection'
  count: Scalars['Int']
}

export type ResetDatabaseMutationResponseEdge = {
  __typename?: 'ResetDatabaseMutationResponseEdge'
  cursor: Scalars['String']
  node: ResetDatabaseMutationResponse
}

export type ResetDatabaseMutationResponsesConnection = {
  __typename?: 'ResetDatabaseMutationResponsesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ResetDatabaseMutationResponseEdge>
}

export type Resource = WithOwner & {
  __typename?: 'Resource'
  id: Scalars['ID']
  name: Scalars['String']
  type: ResourceType
  config: Prop
  configAggregate?: Maybe<ResourcePropConfigAggregationSelection>
  owner: User
  ownerAggregate?: Maybe<ResourceUserOwnerAggregationSelection>
  configConnection: ResourceConfigConnection
  ownerConnection: WithOwnerOwnerConnection
}

export type ResourceConfigArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceConfigConnectionArgs = {
  where?: InputMaybe<ResourceConfigConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ResourceConfigConnectionSort>>
}

export type ResourceOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>
}

export type ResourceAggregateSelection = {
  __typename?: 'ResourceAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ResourceConfigConnection = {
  __typename?: 'ResourceConfigConnection'
  edges: Array<ResourceConfigRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ResourceConfigRelationship = {
  __typename?: 'ResourceConfigRelationship'
  cursor: Scalars['String']
  node: Prop
}

export type ResourceEdge = {
  __typename?: 'ResourceEdge'
  cursor: Scalars['String']
  node: Resource
}

export type ResourcePropConfigAggregationSelection = {
  __typename?: 'ResourcePropConfigAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourcePropConfigNodeAggregateSelection>
}

export type ResourcePropConfigNodeAggregateSelection = {
  __typename?: 'ResourcePropConfigNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  data: StringAggregateSelectionNonNullable
}

export type ResourcesConnection = {
  __typename?: 'ResourcesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<ResourceEdge>
}

export type ResourceUserOwnerAggregationSelection = {
  __typename?: 'ResourceUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceUserOwnerNodeAggregateSelection>
}

export type ResourceUserOwnerNodeAggregateSelection = {
  __typename?: 'ResourceUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type Store = {
  __typename?: 'Store'
  id: Scalars['ID']
  name: Scalars['String']
  app: App
  appAggregate?: Maybe<StoreAppAppAggregationSelection>
  api: InterfaceType
  apiAggregate?: Maybe<StoreInterfaceTypeApiAggregationSelection>
  actions: Array<AnyAction>
  appConnection: StoreAppConnection
  apiConnection: StoreApiConnection
  actionsConnection: StoreActionsConnection
}

export type StoreAppArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreAppAggregateArgs = {
  where?: InputMaybe<AppWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreActionsArgs = {
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyActionWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreAppConnectionArgs = {
  where?: InputMaybe<StoreAppConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreAppConnectionSort>>
}

export type StoreApiConnectionArgs = {
  where?: InputMaybe<StoreApiConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreApiConnectionSort>>
}

export type StoreActionsConnectionArgs = {
  where?: InputMaybe<StoreActionsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreActionsConnection = {
  __typename?: 'StoreActionsConnection'
  edges: Array<StoreActionsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreActionsRelationship = {
  __typename?: 'StoreActionsRelationship'
  cursor: Scalars['String']
  node: AnyAction
}

export type StoreAggregateSelection = {
  __typename?: 'StoreAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreApiConnection = {
  __typename?: 'StoreApiConnection'
  edges: Array<StoreApiRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreApiRelationship = {
  __typename?: 'StoreApiRelationship'
  cursor: Scalars['String']
  node: InterfaceType
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

export type StoreAppConnection = {
  __typename?: 'StoreAppConnection'
  edges: Array<StoreAppRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreAppRelationship = {
  __typename?: 'StoreAppRelationship'
  cursor: Scalars['String']
  node: App
}

export type StoreEdge = {
  __typename?: 'StoreEdge'
  cursor: Scalars['String']
  node: Store
}

export type StoreInterfaceTypeApiAggregationSelection = {
  __typename?: 'StoreInterfaceTypeApiAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreInterfaceTypeApiNodeAggregateSelection>
}

export type StoreInterfaceTypeApiNodeAggregateSelection = {
  __typename?: 'StoreInterfaceTypeApiNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoresConnection = {
  __typename?: 'StoresConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<StoreEdge>
}

export type StringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable'
  shortest: Scalars['String']
  longest: Scalars['String']
}

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable'
  shortest?: Maybe<Scalars['String']>
  longest?: Maybe<Scalars['String']>
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['ID']
  name: Scalars['String']
  isRoot?: Maybe<Scalars['Boolean']>
  descendants: Array<Tag>
  parent?: Maybe<Tag>
  parentAggregate?: Maybe<TagTagParentAggregationSelection>
  children: Array<Tag>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  owner: User
  ownerAggregate?: Maybe<TagUserOwnerAggregationSelection>
  parentConnection: TagParentConnection
  childrenConnection: TagChildrenConnection
  ownerConnection: TagOwnerConnection
}

export type TagParentArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagParentAggregateArgs = {
  where?: InputMaybe<TagWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagChildrenArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagChildrenAggregateArgs = {
  where?: InputMaybe<TagWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TagParentConnectionArgs = {
  where?: InputMaybe<TagParentConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TagParentConnectionSort>>
}

export type TagChildrenConnectionArgs = {
  where?: InputMaybe<TagChildrenConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TagChildrenConnectionSort>>
}

export type TagOwnerConnectionArgs = {
  where?: InputMaybe<TagOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TagOwnerConnectionSort>>
}

export type TagAggregateSelection = {
  __typename?: 'TagAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagChildrenConnection = {
  __typename?: 'TagChildrenConnection'
  edges: Array<TagChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TagChildrenRelationship = {
  __typename?: 'TagChildrenRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagEdge = {
  __typename?: 'TagEdge'
  cursor: Scalars['String']
  node: Tag
}

export type TagOwnerConnection = {
  __typename?: 'TagOwnerConnection'
  edges: Array<TagOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TagOwnerRelationship = {
  __typename?: 'TagOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type TagParentConnection = {
  __typename?: 'TagParentConnection'
  edges: Array<TagParentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TagParentRelationship = {
  __typename?: 'TagParentRelationship'
  cursor: Scalars['String']
  node: Tag
}

export type TagsConnection = {
  __typename?: 'TagsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<TagEdge>
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

export type TagUserOwnerAggregationSelection = {
  __typename?: 'TagUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagUserOwnerNodeAggregateSelection>
}

export type TagUserOwnerNodeAggregateSelection = {
  __typename?: 'TagUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type TypeReference = {
  __typename?: 'TypeReference'
  /** The name of the resource referencing the type */
  name: Scalars['String']
  /** The type of resource - Atom, InterfaceType, etc. */
  label: Scalars['String']
}

export type TypeReferenceAggregateSelection = {
  __typename?: 'TypeReferenceAggregateSelection'
  count: Scalars['Int']
  name: StringAggregateSelectionNonNullable
  label: StringAggregateSelectionNonNullable
}

export type TypeReferenceEdge = {
  __typename?: 'TypeReferenceEdge'
  cursor: Scalars['String']
  node: TypeReference
}

export type TypeReferencesConnection = {
  __typename?: 'TypeReferencesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<TypeReferenceEdge>
}

/** Allows picking one of a set of types */
export type UnionType = IBaseType &
  WithDescendants & {
    __typename?: 'UnionType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    kind: TypeKind
    owner: User
    ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>
    typesOfUnionType: Array<AnyType>
    ownerConnection: IBaseTypeOwnerConnection
    typesOfUnionTypeConnection: UnionTypeTypesOfUnionTypeConnection
  }

/** Allows picking one of a set of types */
export type UnionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeArgs = {
  options?: InputMaybe<QueryOptions>
  where?: InputMaybe<AnyTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UnionTypeAggregateSelection = {
  __typename?: 'UnionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type UnionTypeEdge = {
  __typename?: 'UnionTypeEdge'
  cursor: Scalars['String']
  node: UnionType
}

export type UnionTypesConnection = {
  __typename?: 'UnionTypesConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<UnionTypeEdge>
}

export type UnionTypeTypesOfUnionTypeConnection = {
  __typename?: 'UnionTypeTypesOfUnionTypeConnection'
  edges: Array<UnionTypeTypesOfUnionTypeRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UnionTypeTypesOfUnionTypeRelationship = {
  __typename?: 'UnionTypeTypesOfUnionTypeRelationship'
  cursor: Scalars['String']
  node: AnyType
}

export type UnionTypeUserOwnerAggregationSelection = {
  __typename?: 'UnionTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UnionTypeUserOwnerNodeAggregateSelection>
}

export type UnionTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'UnionTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  username: StringAggregateSelectionNonNullable
}

export type UpdateActionTypesMutationResponse = {
  __typename?: 'UpdateActionTypesMutationResponse'
  info: UpdateInfo
  actionTypes: Array<ActionType>
}

export type UpdateApiActionsMutationResponse = {
  __typename?: 'UpdateApiActionsMutationResponse'
  info: UpdateInfo
  apiActions: Array<ApiAction>
}

export type UpdateAppsMutationResponse = {
  __typename?: 'UpdateAppsMutationResponse'
  info: UpdateInfo
  apps: Array<App>
}

export type UpdateAppTypesMutationResponse = {
  __typename?: 'UpdateAppTypesMutationResponse'
  info: UpdateInfo
  appTypes: Array<AppType>
}

export type UpdateArrayTypesMutationResponse = {
  __typename?: 'UpdateArrayTypesMutationResponse'
  info: UpdateInfo
  arrayTypes: Array<ArrayType>
}

export type UpdateAtomsMutationResponse = {
  __typename?: 'UpdateAtomsMutationResponse'
  info: UpdateInfo
  atoms: Array<Atom>
}

export type UpdateBaseTypesMutationResponse = {
  __typename?: 'UpdateBaseTypesMutationResponse'
  info: UpdateInfo
  baseTypes: Array<BaseType>
}

export type UpdateCodeActionsMutationResponse = {
  __typename?: 'UpdateCodeActionsMutationResponse'
  info: UpdateInfo
  codeActions: Array<CodeAction>
}

export type UpdateCodeMirrorTypesMutationResponse = {
  __typename?: 'UpdateCodeMirrorTypesMutationResponse'
  info: UpdateInfo
  codeMirrorTypes: Array<CodeMirrorType>
}

export type UpdateComponentsMutationResponse = {
  __typename?: 'UpdateComponentsMutationResponse'
  info: UpdateInfo
  components: Array<Component>
}

export type UpdateCreateInfosMutationResponse = {
  __typename?: 'UpdateCreateInfosMutationResponse'
  info: UpdateInfo
  createInfos: Array<CreateInfo>
}

export type UpdateDeleteInfosMutationResponse = {
  __typename?: 'UpdateDeleteInfosMutationResponse'
  info: UpdateInfo
  deleteInfos: Array<DeleteInfo>
}

export type UpdateDomainsMutationResponse = {
  __typename?: 'UpdateDomainsMutationResponse'
  info: UpdateInfo
  domains: Array<Domain>
}

export type UpdateElementsMutationResponse = {
  __typename?: 'UpdateElementsMutationResponse'
  info: UpdateInfo
  elements: Array<Element>
}

export type UpdateElementTypesMutationResponse = {
  __typename?: 'UpdateElementTypesMutationResponse'
  info: UpdateInfo
  elementTypes: Array<ElementType>
}

export type UpdateEnumTypesMutationResponse = {
  __typename?: 'UpdateEnumTypesMutationResponse'
  info: UpdateInfo
  enumTypes: Array<EnumType>
}

export type UpdateEnumTypeValuesMutationResponse = {
  __typename?: 'UpdateEnumTypeValuesMutationResponse'
  info: UpdateInfo
  enumTypeValues: Array<EnumTypeValue>
}

export type UpdateFieldsMutationResponse = {
  __typename?: 'UpdateFieldsMutationResponse'
  info: UpdateInfo
  fields: Array<Field>
}

export type UpdateGetBaseTypesReturnsMutationResponse = {
  __typename?: 'UpdateGetBaseTypesReturnsMutationResponse'
  info: UpdateInfo
  getBaseTypesReturns: Array<GetBaseTypesReturn>
}

export type UpdateHooksMutationResponse = {
  __typename?: 'UpdateHooksMutationResponse'
  info: UpdateInfo
  hooks: Array<Hook>
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

export type UpdatePagesMutationResponse = {
  __typename?: 'UpdatePagesMutationResponse'
  info: UpdateInfo
  pages: Array<Page>
}

export type UpdatePageTypesMutationResponse = {
  __typename?: 'UpdatePageTypesMutationResponse'
  info: UpdateInfo
  pageTypes: Array<PageType>
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

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse'
  info: UpdateInfo
  users: Array<User>
}

export type UpdateVercelDomainConfigsMutationResponse = {
  __typename?: 'UpdateVercelDomainConfigsMutationResponse'
  info: UpdateInfo
  vercelDomainConfigs: Array<VercelDomainConfig>
}

export type UpdateVercelProjectDomainsMutationResponse = {
  __typename?: 'UpdateVercelProjectDomainsMutationResponse'
  info: UpdateInfo
  vercelProjectDomains: Array<VercelProjectDomain>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  auth0Id: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  roles: Array<Scalars['String']>
  types: Array<BaseType>
  typesAggregate?: Maybe<UserBaseTypeTypesAggregationSelection>
  apps: Array<App>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  elements: Array<Element>
  elementsAggregate?: Maybe<UserElementElementsAggregationSelection>
  components: Array<Component>
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>
  tags: Array<Tag>
  tagsAggregate?: Maybe<UserTagTagsAggregationSelection>
  typesConnection: UserTypesConnection
  appsConnection: UserAppsConnection
  elementsConnection: UserElementsConnection
  componentsConnection: UserComponentsConnection
  tagsConnection: UserTagsConnection
}

export type UserTypesArgs = {
  where?: InputMaybe<BaseTypeWhere>
  options?: InputMaybe<BaseTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserTypesAggregateArgs = {
  where?: InputMaybe<BaseTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserAppsArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserElementsArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserTagsArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserTypesConnectionArgs = {
  where?: InputMaybe<UserTypesConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserTypesConnectionSort>>
}

export type UserAppsConnectionArgs = {
  where?: InputMaybe<UserAppsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserAppsConnectionSort>>
}

export type UserElementsConnectionArgs = {
  where?: InputMaybe<UserElementsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserElementsConnectionSort>>
}

export type UserComponentsConnectionArgs = {
  where?: InputMaybe<UserComponentsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserComponentsConnectionSort>>
}

export type UserTagsConnectionArgs = {
  where?: InputMaybe<UserTagsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserTagsConnectionSort>>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
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

export type UserAppsConnection = {
  __typename?: 'UserAppsConnection'
  edges: Array<UserAppsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserAppsRelationship = {
  __typename?: 'UserAppsRelationship'
  cursor: Scalars['String']
  node: App
}

export type UserBaseTypeTypesAggregationSelection = {
  __typename?: 'UserBaseTypeTypesAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserBaseTypeTypesNodeAggregateSelection>
}

export type UserBaseTypeTypesNodeAggregateSelection = {
  __typename?: 'UserBaseTypeTypesNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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

export type UserComponentsConnection = {
  __typename?: 'UserComponentsConnection'
  edges: Array<UserComponentsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserComponentsRelationship = {
  __typename?: 'UserComponentsRelationship'
  cursor: Scalars['String']
  node: Component
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
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  customCss: StringAggregateSelectionNullable
  guiCss: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
  preRenderActionId: StringAggregateSelectionNullable
  postRenderActionId: StringAggregateSelectionNullable
}

export type UserElementsConnection = {
  __typename?: 'UserElementsConnection'
  edges: Array<UserElementsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserElementsRelationship = {
  __typename?: 'UserElementsRelationship'
  cursor: Scalars['String']
  node: Element
}

export type UsersConnection = {
  __typename?: 'UsersConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UserTagsConnection = {
  __typename?: 'UserTagsConnection'
  edges: Array<UserTagsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserTagsRelationship = {
  __typename?: 'UserTagsRelationship'
  cursor: Scalars['String']
  node: Tag
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

export type UserTypesConnection = {
  __typename?: 'UserTypesConnection'
  edges: Array<UserTypesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserTypesRelationship = {
  __typename?: 'UserTypesRelationship'
  cursor: Scalars['String']
  node: BaseType
}

export type VercelDomainConfig = {
  __typename?: 'VercelDomainConfig'
  misconfigured: Scalars['Boolean']
}

export type VercelDomainConfigAggregateSelection = {
  __typename?: 'VercelDomainConfigAggregateSelection'
  count: Scalars['Int']
}

export type VercelDomainConfigEdge = {
  __typename?: 'VercelDomainConfigEdge'
  cursor: Scalars['String']
  node: VercelDomainConfig
}

export type VercelDomainConfigsConnection = {
  __typename?: 'VercelDomainConfigsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<VercelDomainConfigEdge>
}

export type VercelProjectDomain = {
  __typename?: 'VercelProjectDomain'
  verified: Scalars['Boolean']
}

export type VercelProjectDomainAggregateSelection = {
  __typename?: 'VercelProjectDomainAggregateSelection'
  count: Scalars['Int']
}

export type VercelProjectDomainEdge = {
  __typename?: 'VercelProjectDomainEdge'
  cursor: Scalars['String']
  node: VercelProjectDomain
}

export type VercelProjectDomainsConnection = {
  __typename?: 'VercelProjectDomainsConnection'
  totalCount: Scalars['Int']
  pageInfo: PageInfo
  edges: Array<VercelProjectDomainEdge>
}

export type WithOwnerOwnerConnection = {
  __typename?: 'WithOwnerOwnerConnection'
  edges: Array<WithOwnerOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type WithOwnerOwnerRelationship = {
  __typename?: 'WithOwnerOwnerRelationship'
  cursor: Scalars['String']
  node: User
}

export type ActionBaseStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>
  connect?: InputMaybe<StoreConnectInput>
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

export type ActionBaseStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere
  onCreate: ActionBaseStoreConnectOrCreateFieldInputOnCreate
}

export type ActionBaseStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type ActionBaseStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type ActionBaseStoreDeleteFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type ActionBaseStoreDisconnectFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
  disconnect?: InputMaybe<StoreDisconnectInput>
}

export type ActionBaseStoreFieldInput = {
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
}

export type ActionBaseStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type ActionBaseStoreUpdateFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>
  update?: InputMaybe<ActionBaseStoreUpdateConnectionInput>
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>
  disconnect?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>
  delete?: InputMaybe<ActionBaseStoreDeleteFieldInput>
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
}

export type ActionTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type ActionTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type ActionTypeConnectOrCreateWhere = {
  node: ActionTypeUniqueWhere
}

export type ActionTypeConnectWhere = {
  node: ActionTypeWhere
}

export type ActionTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type ActionTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type ActionTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type ActionTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ActionTypeOptions = {
  /** Specify one or more ActionTypeSort objects to sort ActionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ActionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>
  node?: InputMaybe<ActionTypeOwnerNodeAggregationWhereInput>
}

export type ActionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ActionTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort ActionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionTypeSort object. */
export type ActionTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type ActionTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ActionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type ActionTypeWhere = {
  OR?: InputMaybe<Array<ActionTypeWhere>>
  AND?: InputMaybe<Array<ActionTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ActionTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type AnyActionWhere = {
  ApiAction?: InputMaybe<ApiActionWhere>
  CodeAction?: InputMaybe<CodeActionWhere>
}

export type AnyTypeWhere = {
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>
  ArrayType?: InputMaybe<ArrayTypeWhere>
  UnionType?: InputMaybe<UnionTypeWhere>
  InterfaceType?: InputMaybe<InterfaceTypeWhere>
  ElementType?: InputMaybe<ElementTypeWhere>
  RenderPropsType?: InputMaybe<RenderPropsTypeWhere>
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>
  EnumType?: InputMaybe<EnumTypeWhere>
  LambdaType?: InputMaybe<LambdaTypeWhere>
  PageType?: InputMaybe<PageTypeWhere>
  AppType?: InputMaybe<AppTypeWhere>
  ActionType?: InputMaybe<ActionTypeWhere>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>
}

export type ApiActionConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ApiActionConfigAggregateInput>>
  OR?: InputMaybe<Array<ApiActionConfigAggregateInput>>
  node?: InputMaybe<ApiActionConfigNodeAggregationWhereInput>
}

export type ApiActionConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
}

export type ApiActionConfigConnectionSort = {
  node?: InputMaybe<PropSort>
}

export type ApiActionConfigConnectionWhere = {
  AND?: InputMaybe<Array<ApiActionConfigConnectionWhere>>
  OR?: InputMaybe<Array<ApiActionConfigConnectionWhere>>
  node?: InputMaybe<PropWhere>
  node_NOT?: InputMaybe<PropWhere>
}

export type ApiActionConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: ApiActionConfigConnectOrCreateFieldInputOnCreate
}

export type ApiActionConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
}

export type ApiActionConfigCreateFieldInput = {
  node: PropCreateInput
}

export type ApiActionConfigDeleteFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>
}

export type ApiActionConfigDisconnectFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>
}

export type ApiActionConfigFieldInput = {
  create?: InputMaybe<ApiActionConfigCreateFieldInput>
  connect?: InputMaybe<ApiActionConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>
}

export type ApiActionConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ApiActionConfigNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ApiActionConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ApiActionConfigUpdateFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>
  update?: InputMaybe<ApiActionConfigUpdateConnectionInput>
  connect?: InputMaybe<ApiActionConfigConnectFieldInput>
  disconnect?: InputMaybe<ApiActionConfigDisconnectFieldInput>
  create?: InputMaybe<ApiActionConfigCreateFieldInput>
  delete?: InputMaybe<ApiActionConfigDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>
}

export type ApiActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionConnectInput>
  errorAction?: InputMaybe<ApiActionErrorActionConnectInput>
  resource?: InputMaybe<ApiActionResourceConnectFieldInput>
  config?: InputMaybe<ApiActionConfigConnectFieldInput>
}

export type ApiActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionConnectOrCreateInput>
  errorAction?: InputMaybe<ApiActionErrorActionConnectOrCreateInput>
  resource?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>
  config?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>
}

export type ApiActionConnectOrCreateWhere = {
  node: ApiActionUniqueWhere
}

export type ApiActionConnectWhere = {
  node: ApiActionWhere
}

export type ApiActionCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  type?: ActionKind
  store?: InputMaybe<ActionBaseStoreFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionCreateInput>
  errorAction?: InputMaybe<ApiActionErrorActionCreateInput>
  resource?: InputMaybe<ApiActionResourceFieldInput>
  config?: InputMaybe<ApiActionConfigFieldInput>
}

export type ApiActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionDeleteInput>
  errorAction?: InputMaybe<ApiActionErrorActionDeleteInput>
  resource?: InputMaybe<ApiActionResourceDeleteFieldInput>
  config?: InputMaybe<ApiActionConfigDeleteFieldInput>
}

export type ApiActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionDisconnectInput>
  errorAction?: InputMaybe<ApiActionErrorActionDisconnectInput>
  resource?: InputMaybe<ApiActionResourceDisconnectFieldInput>
  config?: InputMaybe<ApiActionConfigDisconnectFieldInput>
}

export type ApiActionErrorActionApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>
  connect?: InputMaybe<ApiActionConnectInput>
}

export type ApiActionErrorActionApiActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionErrorActionApiActionConnectionWhere>>
  AND?: InputMaybe<Array<ApiActionErrorActionApiActionConnectionWhere>>
  node?: InputMaybe<ApiActionWhere>
  node_NOT?: InputMaybe<ApiActionWhere>
}

export type ApiActionErrorActionApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere
  onCreate: ApiActionErrorActionApiActionConnectOrCreateFieldInputOnCreate
}

export type ApiActionErrorActionApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput
}

export type ApiActionErrorActionApiActionCreateFieldInput = {
  node: ApiActionCreateInput
}

export type ApiActionErrorActionApiActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>
  delete?: InputMaybe<ApiActionDeleteInput>
}

export type ApiActionErrorActionApiActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>
  disconnect?: InputMaybe<ApiActionDisconnectInput>
}

export type ApiActionErrorActionApiActionFieldInput = {
  create?: InputMaybe<ApiActionErrorActionApiActionCreateFieldInput>
  connect?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionErrorActionApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>
}

export type ApiActionErrorActionApiActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>
  update?: InputMaybe<ApiActionErrorActionApiActionUpdateConnectionInput>
  connect?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>
  disconnect?: InputMaybe<ApiActionErrorActionApiActionDisconnectFieldInput>
  create?: InputMaybe<ApiActionErrorActionApiActionCreateFieldInput>
  delete?: InputMaybe<ApiActionErrorActionApiActionDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionErrorActionCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>
  connect?: InputMaybe<CodeActionConnectInput>
}

export type ApiActionErrorActionCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionErrorActionCodeActionConnectionWhere>>
  AND?: InputMaybe<Array<ApiActionErrorActionCodeActionConnectionWhere>>
  node?: InputMaybe<CodeActionWhere>
  node_NOT?: InputMaybe<CodeActionWhere>
}

export type ApiActionErrorActionCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere
  onCreate: ApiActionErrorActionCodeActionConnectOrCreateFieldInputOnCreate
}

export type ApiActionErrorActionCodeActionConnectOrCreateFieldInputOnCreate = {
  node: CodeActionOnCreateInput
}

export type ApiActionErrorActionCodeActionCreateFieldInput = {
  node: CodeActionCreateInput
}

export type ApiActionErrorActionCodeActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>
  delete?: InputMaybe<CodeActionDeleteInput>
}

export type ApiActionErrorActionCodeActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>
  disconnect?: InputMaybe<CodeActionDisconnectInput>
}

export type ApiActionErrorActionCodeActionFieldInput = {
  create?: InputMaybe<ApiActionErrorActionCodeActionCreateFieldInput>
  connect?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>
}

export type ApiActionErrorActionCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>
}

export type ApiActionErrorActionCodeActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>
  update?: InputMaybe<ApiActionErrorActionCodeActionUpdateConnectionInput>
  connect?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>
  disconnect?: InputMaybe<ApiActionErrorActionCodeActionDisconnectFieldInput>
  create?: InputMaybe<ApiActionErrorActionCodeActionCreateFieldInput>
  delete?: InputMaybe<ApiActionErrorActionCodeActionDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>
}

export type ApiActionErrorActionConnectInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>
}

export type ApiActionErrorActionConnectionWhere = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>
}

export type ApiActionErrorActionConnectOrCreateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionErrorActionCreateFieldInput = {
  CodeAction?: InputMaybe<Array<ApiActionErrorActionCodeActionCreateFieldInput>>
  ApiAction?: InputMaybe<Array<ApiActionErrorActionApiActionCreateFieldInput>>
}

export type ApiActionErrorActionCreateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionFieldInput>
}

export type ApiActionErrorActionDeleteInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionDeleteFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionDeleteFieldInput>
}

export type ApiActionErrorActionDisconnectInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionDisconnectFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionDisconnectFieldInput>
}

export type ApiActionErrorActionUpdateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionUpdateFieldInput>
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionUpdateFieldInput>
}

export type ApiActionOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ApiActionOptions = {
  /** Specify one or more ApiActionSort objects to sort ApiActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ApiActionSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ApiActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionCreateFieldInput>
  errorAction?: InputMaybe<ApiActionErrorActionCreateFieldInput>
  resource?: InputMaybe<ApiActionResourceCreateFieldInput>
  config?: InputMaybe<ApiActionConfigCreateFieldInput>
}

export type ApiActionResourceAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ApiActionResourceAggregateInput>>
  OR?: InputMaybe<Array<ApiActionResourceAggregateInput>>
  node?: InputMaybe<ApiActionResourceNodeAggregationWhereInput>
}

export type ApiActionResourceConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>
  connect?: InputMaybe<ResourceConnectInput>
}

export type ApiActionResourceConnectionSort = {
  node?: InputMaybe<ResourceSort>
}

export type ApiActionResourceConnectionWhere = {
  AND?: InputMaybe<Array<ApiActionResourceConnectionWhere>>
  OR?: InputMaybe<Array<ApiActionResourceConnectionWhere>>
  node?: InputMaybe<ResourceWhere>
  node_NOT?: InputMaybe<ResourceWhere>
}

export type ApiActionResourceConnectOrCreateFieldInput = {
  where: ResourceConnectOrCreateWhere
  onCreate: ApiActionResourceConnectOrCreateFieldInputOnCreate
}

export type ApiActionResourceConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput
}

export type ApiActionResourceCreateFieldInput = {
  node: ResourceCreateInput
}

export type ApiActionResourceDeleteFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>
  delete?: InputMaybe<ResourceDeleteInput>
}

export type ApiActionResourceDisconnectFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>
  disconnect?: InputMaybe<ResourceDisconnectInput>
}

export type ApiActionResourceFieldInput = {
  create?: InputMaybe<ApiActionResourceCreateFieldInput>
  connect?: InputMaybe<ApiActionResourceConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>
}

export type ApiActionResourceNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionResourceNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ApiActionResourceNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ApiActionResourceUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>
}

export type ApiActionResourceUpdateFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>
  update?: InputMaybe<ApiActionResourceUpdateConnectionInput>
  connect?: InputMaybe<ApiActionResourceConnectFieldInput>
  disconnect?: InputMaybe<ApiActionResourceDisconnectFieldInput>
  create?: InputMaybe<ApiActionResourceCreateFieldInput>
  delete?: InputMaybe<ApiActionResourceDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>
}

/** Fields to sort ApiActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ApiActionSort object. */
export type ApiActionSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type ApiActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ApiActionStoreAggregateInput>>
  OR?: InputMaybe<Array<ApiActionStoreAggregateInput>>
  node?: InputMaybe<ApiActionStoreNodeAggregationWhereInput>
}

export type ApiActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ApiActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ApiActionSuccessActionApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>
  connect?: InputMaybe<ApiActionConnectInput>
}

export type ApiActionSuccessActionApiActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionSuccessActionApiActionConnectionWhere>>
  AND?: InputMaybe<Array<ApiActionSuccessActionApiActionConnectionWhere>>
  node?: InputMaybe<ApiActionWhere>
  node_NOT?: InputMaybe<ApiActionWhere>
}

export type ApiActionSuccessActionApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere
  onCreate: ApiActionSuccessActionApiActionConnectOrCreateFieldInputOnCreate
}

export type ApiActionSuccessActionApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput
}

export type ApiActionSuccessActionApiActionCreateFieldInput = {
  node: ApiActionCreateInput
}

export type ApiActionSuccessActionApiActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>
  delete?: InputMaybe<ApiActionDeleteInput>
}

export type ApiActionSuccessActionApiActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>
  disconnect?: InputMaybe<ApiActionDisconnectInput>
}

export type ApiActionSuccessActionApiActionFieldInput = {
  create?: InputMaybe<ApiActionSuccessActionApiActionCreateFieldInput>
  connect?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionSuccessActionApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>
}

export type ApiActionSuccessActionApiActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>
  update?: InputMaybe<ApiActionSuccessActionApiActionUpdateConnectionInput>
  connect?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>
  disconnect?: InputMaybe<ApiActionSuccessActionApiActionDisconnectFieldInput>
  create?: InputMaybe<ApiActionSuccessActionApiActionCreateFieldInput>
  delete?: InputMaybe<ApiActionSuccessActionApiActionDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionSuccessActionCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>
  connect?: InputMaybe<CodeActionConnectInput>
}

export type ApiActionSuccessActionCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionSuccessActionCodeActionConnectionWhere>>
  AND?: InputMaybe<Array<ApiActionSuccessActionCodeActionConnectionWhere>>
  node?: InputMaybe<CodeActionWhere>
  node_NOT?: InputMaybe<CodeActionWhere>
}

export type ApiActionSuccessActionCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere
  onCreate: ApiActionSuccessActionCodeActionConnectOrCreateFieldInputOnCreate
}

export type ApiActionSuccessActionCodeActionConnectOrCreateFieldInputOnCreate =
  {
    node: CodeActionOnCreateInput
  }

export type ApiActionSuccessActionCodeActionCreateFieldInput = {
  node: CodeActionCreateInput
}

export type ApiActionSuccessActionCodeActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>
  delete?: InputMaybe<CodeActionDeleteInput>
}

export type ApiActionSuccessActionCodeActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>
  disconnect?: InputMaybe<CodeActionDisconnectInput>
}

export type ApiActionSuccessActionCodeActionFieldInput = {
  create?: InputMaybe<ApiActionSuccessActionCodeActionCreateFieldInput>
  connect?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>
  connectOrCreate?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>
}

export type ApiActionSuccessActionCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>
}

export type ApiActionSuccessActionCodeActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>
  update?: InputMaybe<ApiActionSuccessActionCodeActionUpdateConnectionInput>
  connect?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>
  disconnect?: InputMaybe<ApiActionSuccessActionCodeActionDisconnectFieldInput>
  create?: InputMaybe<ApiActionSuccessActionCodeActionCreateFieldInput>
  delete?: InputMaybe<ApiActionSuccessActionCodeActionDeleteFieldInput>
  connectOrCreate?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>
}

export type ApiActionSuccessActionConnectInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>
}

export type ApiActionSuccessActionConnectionWhere = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>
}

export type ApiActionSuccessActionConnectOrCreateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>
}

export type ApiActionSuccessActionCreateFieldInput = {
  CodeAction?: InputMaybe<
    Array<ApiActionSuccessActionCodeActionCreateFieldInput>
  >
  ApiAction?: InputMaybe<Array<ApiActionSuccessActionApiActionCreateFieldInput>>
}

export type ApiActionSuccessActionCreateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionFieldInput>
}

export type ApiActionSuccessActionDeleteInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionDeleteFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionDeleteFieldInput>
}

export type ApiActionSuccessActionDisconnectInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionDisconnectFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionDisconnectFieldInput>
}

export type ApiActionSuccessActionUpdateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionUpdateFieldInput>
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionUpdateFieldInput>
}

export type ApiActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ApiActionUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ActionKind>
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>
  successAction?: InputMaybe<ApiActionSuccessActionUpdateInput>
  errorAction?: InputMaybe<ApiActionErrorActionUpdateInput>
  resource?: InputMaybe<ApiActionResourceUpdateFieldInput>
  config?: InputMaybe<ApiActionConfigUpdateFieldInput>
}

export type ApiActionWhere = {
  OR?: InputMaybe<Array<ApiActionWhere>>
  AND?: InputMaybe<Array<ApiActionWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ActionKind>
  type_NOT?: InputMaybe<ActionKind>
  type_IN?: InputMaybe<Array<ActionKind>>
  type_NOT_IN?: InputMaybe<Array<ActionKind>>
  store?: InputMaybe<StoreWhere>
  store_NOT?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<ApiActionStoreAggregateInput>
  resource?: InputMaybe<ResourceWhere>
  resource_NOT?: InputMaybe<ResourceWhere>
  resourceAggregate?: InputMaybe<ApiActionResourceAggregateInput>
  config?: InputMaybe<PropWhere>
  config_NOT?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<ApiActionConfigAggregateInput>
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>
  successActionConnection?: InputMaybe<ApiActionSuccessActionConnectionWhere>
  successActionConnection_NOT?: InputMaybe<ApiActionSuccessActionConnectionWhere>
  errorActionConnection?: InputMaybe<ApiActionErrorActionConnectionWhere>
  errorActionConnection_NOT?: InputMaybe<ApiActionErrorActionConnectionWhere>
  resourceConnection?: InputMaybe<ApiActionResourceConnectionWhere>
  resourceConnection_NOT?: InputMaybe<ApiActionResourceConnectionWhere>
  configConnection?: InputMaybe<ApiActionConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<ApiActionConfigConnectionWhere>
}

export type AppConnectInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>
  store?: InputMaybe<AppStoreConnectFieldInput>
  domains?: InputMaybe<Array<AppDomainsConnectFieldInput>>
}

export type AppConnectOrCreateInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  store?: InputMaybe<AppStoreConnectOrCreateFieldInput>
  domains?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
  pages?: InputMaybe<AppPagesFieldInput>
  store?: InputMaybe<AppStoreFieldInput>
  domains?: InputMaybe<AppDomainsFieldInput>
}

export type AppDeleteInput = {
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  store?: InputMaybe<AppStoreDeleteFieldInput>
  domains?: InputMaybe<Array<AppDomainsDeleteFieldInput>>
}

export type AppDisconnectInput = {
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  store?: InputMaybe<AppStoreDisconnectFieldInput>
  domains?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>
}

export type AppDomainsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppDomainsAggregateInput>>
  OR?: InputMaybe<Array<AppDomainsAggregateInput>>
  node?: InputMaybe<AppDomainsNodeAggregationWhereInput>
}

export type AppDomainsConnectFieldInput = {
  where?: InputMaybe<DomainConnectWhere>
  connect?: InputMaybe<Array<DomainConnectInput>>
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

export type AppDomainsConnectOrCreateFieldInput = {
  where: DomainConnectOrCreateWhere
  onCreate: AppDomainsConnectOrCreateFieldInputOnCreate
}

export type AppDomainsConnectOrCreateFieldInputOnCreate = {
  node: DomainOnCreateInput
}

export type AppDomainsCreateFieldInput = {
  node: DomainCreateInput
}

export type AppDomainsDeleteFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>
  delete?: InputMaybe<DomainDeleteInput>
}

export type AppDomainsDisconnectFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>
  disconnect?: InputMaybe<DomainDisconnectInput>
}

export type AppDomainsFieldInput = {
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
}

export type AppDomainsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppDomainsUpdateConnectionInput = {
  node?: InputMaybe<DomainUpdateInput>
}

export type AppDomainsUpdateFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>
  update?: InputMaybe<AppDomainsUpdateConnectionInput>
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>
  disconnect?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>
  delete?: InputMaybe<Array<AppDomainsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>
}

export type AppOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
}

export type AppOptions = {
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type AppOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppOwnerAggregateInput>>
  OR?: InputMaybe<Array<AppOwnerAggregateInput>>
  node?: InputMaybe<AppOwnerNodeAggregationWhereInput>
}

export type AppOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppPagesAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppPagesAggregateInput>>
  OR?: InputMaybe<Array<AppPagesAggregateInput>>
  node?: InputMaybe<AppPagesNodeAggregationWhereInput>
}

export type AppPagesConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>
  connect?: InputMaybe<Array<PageConnectInput>>
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

export type AppPagesConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate
}

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput
}

export type AppPagesCreateFieldInput = {
  node: PageCreateInput
}

export type AppPagesDeleteFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>
  delete?: InputMaybe<PageDeleteInput>
}

export type AppPagesDisconnectFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>
  disconnect?: InputMaybe<PageDisconnectInput>
}

export type AppPagesFieldInput = {
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppPagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_EQUAL?: InputMaybe<Scalars['String']>
  getServerSideProps_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  getServerSideProps_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppPagesUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>
}

export type AppPagesUpdateFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>
  update?: InputMaybe<AppPagesUpdateConnectionInput>
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>
  disconnect?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>
  delete?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppRelationInput = {
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>
  store?: InputMaybe<AppStoreCreateFieldInput>
  domains?: InputMaybe<Array<AppDomainsCreateFieldInput>>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  slug?: InputMaybe<SortDirection>
}

export type AppStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppStoreAggregateInput>>
  OR?: InputMaybe<Array<AppStoreAggregateInput>>
  node?: InputMaybe<AppStoreNodeAggregationWhereInput>
}

export type AppStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>
  connect?: InputMaybe<StoreConnectInput>
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

export type AppStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere
  onCreate: AppStoreConnectOrCreateFieldInputOnCreate
}

export type AppStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type AppStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type AppStoreDeleteFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type AppStoreDisconnectFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>
  disconnect?: InputMaybe<StoreDisconnectInput>
}

export type AppStoreFieldInput = {
  create?: InputMaybe<AppStoreCreateFieldInput>
  connect?: InputMaybe<AppStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>
}

export type AppStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type AppStoreUpdateFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>
  update?: InputMaybe<AppStoreUpdateConnectionInput>
  connect?: InputMaybe<AppStoreConnectFieldInput>
  disconnect?: InputMaybe<AppStoreDisconnectFieldInput>
  create?: InputMaybe<AppStoreCreateFieldInput>
  delete?: InputMaybe<AppStoreDeleteFieldInput>
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>
}

export type AppTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type AppTypeConnectOrCreateWhere = {
  node: AppTypeUniqueWhere
}

export type AppTypeConnectWhere = {
  node: AppTypeWhere
}

export type AppTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type AppTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type AppTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type AppTypeOptions = {
  /** Specify one or more AppTypeSort objects to sort AppTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type AppTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<AppTypeOwnerAggregateInput>>
  node?: InputMaybe<AppTypeOwnerNodeAggregationWhereInput>
}

export type AppTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AppTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type AppTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type AppTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type AppTypeWhere = {
  OR?: InputMaybe<Array<AppTypeWhere>>
  AND?: InputMaybe<Array<AppTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type AppUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>
  store?: InputMaybe<AppStoreUpdateFieldInput>
  domains?: InputMaybe<Array<AppDomainsUpdateFieldInput>>
}

export type AppWhere = {
  OR?: InputMaybe<Array<AppWhere>>
  AND?: InputMaybe<Array<AppWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  slug_NOT?: InputMaybe<Scalars['String']>
  slug_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  slug_CONTAINS?: InputMaybe<Scalars['String']>
  slug_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  slug_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>
  /** @deprecated Use `pages_SOME` instead. */
  pages?: InputMaybe<PageWhere>
  /** @deprecated Use `pages_NONE` instead. */
  pages_NOT?: InputMaybe<PageWhere>
  pagesAggregate?: InputMaybe<AppPagesAggregateInput>
  /** Return Apps where all of the related Pages match this filter */
  pages_ALL?: InputMaybe<PageWhere>
  /** Return Apps where none of the related Pages match this filter */
  pages_NONE?: InputMaybe<PageWhere>
  /** Return Apps where one of the related Pages match this filter */
  pages_SINGLE?: InputMaybe<PageWhere>
  /** Return Apps where some of the related Pages match this filter */
  pages_SOME?: InputMaybe<PageWhere>
  store?: InputMaybe<StoreWhere>
  store_NOT?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<AppStoreAggregateInput>
  /** @deprecated Use `domains_SOME` instead. */
  domains?: InputMaybe<DomainWhere>
  /** @deprecated Use `domains_NONE` instead. */
  domains_NOT?: InputMaybe<DomainWhere>
  domainsAggregate?: InputMaybe<AppDomainsAggregateInput>
  /** Return Apps where all of the related Domains match this filter */
  domains_ALL?: InputMaybe<DomainWhere>
  /** Return Apps where none of the related Domains match this filter */
  domains_NONE?: InputMaybe<DomainWhere>
  /** Return Apps where one of the related Domains match this filter */
  domains_SINGLE?: InputMaybe<DomainWhere>
  /** Return Apps where some of the related Domains match this filter */
  domains_SOME?: InputMaybe<DomainWhere>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
  /** @deprecated Use `pagesConnection_SOME` instead. */
  pagesConnection?: InputMaybe<AppPagesConnectionWhere>
  /** @deprecated Use `pagesConnection_NONE` instead. */
  pagesConnection_NOT?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_ALL?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_NONE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SINGLE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SOME?: InputMaybe<AppPagesConnectionWhere>
  storeConnection?: InputMaybe<AppStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<AppStoreConnectionWhere>
  /** @deprecated Use `domainsConnection_SOME` instead. */
  domainsConnection?: InputMaybe<AppDomainsConnectionWhere>
  /** @deprecated Use `domainsConnection_NONE` instead. */
  domainsConnection_NOT?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_ALL?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_NONE?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_SINGLE?: InputMaybe<AppDomainsConnectionWhere>
  domainsConnection_SOME?: InputMaybe<AppDomainsConnectionWhere>
}

export type ArrayTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeConnectInput>
}

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeConnectOrCreateInput>
}

export type ArrayTypeConnectOrCreateWhere = {
  node: ArrayTypeUniqueWhere
}

export type ArrayTypeConnectWhere = {
  node: ArrayTypeWhere
}

export type ArrayTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeCreateInput>
}

export type ArrayTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeDeleteInput>
}

export type ArrayTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeDisconnectInput>
}

export type ArrayTypeItemTypeActionTypeConnectFieldInput = {
  where?: InputMaybe<ActionTypeConnectWhere>
  connect?: InputMaybe<ActionTypeConnectInput>
}

export type ArrayTypeItemTypeActionTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeActionTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeActionTypeConnectionWhere>>
  node?: InputMaybe<ActionTypeWhere>
  node_NOT?: InputMaybe<ActionTypeWhere>
}

export type ArrayTypeItemTypeActionTypeConnectOrCreateFieldInput = {
  where: ActionTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeActionTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeActionTypeConnectOrCreateFieldInputOnCreate = {
  node: ActionTypeOnCreateInput
}

export type ArrayTypeItemTypeActionTypeCreateFieldInput = {
  node: ActionTypeCreateInput
}

export type ArrayTypeItemTypeActionTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeActionTypeConnectionWhere>
  delete?: InputMaybe<ActionTypeDeleteInput>
}

export type ArrayTypeItemTypeActionTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeActionTypeConnectionWhere>
  disconnect?: InputMaybe<ActionTypeDisconnectInput>
}

export type ArrayTypeItemTypeActionTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeActionTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeActionTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeActionTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeActionTypeUpdateConnectionInput = {
  node?: InputMaybe<ActionTypeUpdateInput>
}

export type ArrayTypeItemTypeActionTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeActionTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeActionTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeActionTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeActionTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeActionTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeActionTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeActionTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeAppTypeConnectFieldInput = {
  where?: InputMaybe<AppTypeConnectWhere>
  connect?: InputMaybe<AppTypeConnectInput>
}

export type ArrayTypeItemTypeAppTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeAppTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeAppTypeConnectionWhere>>
  node?: InputMaybe<AppTypeWhere>
  node_NOT?: InputMaybe<AppTypeWhere>
}

export type ArrayTypeItemTypeAppTypeConnectOrCreateFieldInput = {
  where: AppTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeAppTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeAppTypeConnectOrCreateFieldInputOnCreate = {
  node: AppTypeOnCreateInput
}

export type ArrayTypeItemTypeAppTypeCreateFieldInput = {
  node: AppTypeCreateInput
}

export type ArrayTypeItemTypeAppTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeAppTypeConnectionWhere>
  delete?: InputMaybe<AppTypeDeleteInput>
}

export type ArrayTypeItemTypeAppTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeAppTypeConnectionWhere>
  disconnect?: InputMaybe<AppTypeDisconnectInput>
}

export type ArrayTypeItemTypeAppTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeAppTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeAppTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeAppTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeAppTypeUpdateConnectionInput = {
  node?: InputMaybe<AppTypeUpdateInput>
}

export type ArrayTypeItemTypeAppTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeAppTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeAppTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeAppTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeAppTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeAppTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeAppTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeAppTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeArrayTypeConnectFieldInput = {
  where?: InputMaybe<ArrayTypeConnectWhere>
  connect?: InputMaybe<ArrayTypeConnectInput>
}

export type ArrayTypeItemTypeArrayTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeArrayTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeArrayTypeConnectionWhere>>
  node?: InputMaybe<ArrayTypeWhere>
  node_NOT?: InputMaybe<ArrayTypeWhere>
}

export type ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInput = {
  where: ArrayTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInputOnCreate = {
  node: ArrayTypeOnCreateInput
}

export type ArrayTypeItemTypeArrayTypeCreateFieldInput = {
  node: ArrayTypeCreateInput
}

export type ArrayTypeItemTypeArrayTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectionWhere>
  delete?: InputMaybe<ArrayTypeDeleteInput>
}

export type ArrayTypeItemTypeArrayTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectionWhere>
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>
}

export type ArrayTypeItemTypeArrayTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeArrayTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeArrayTypeUpdateConnectionInput = {
  node?: InputMaybe<ArrayTypeUpdateInput>
}

export type ArrayTypeItemTypeArrayTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeArrayTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeArrayTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeArrayTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeArrayTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeConnectFieldInput = {
  where?: InputMaybe<CodeMirrorTypeConnectWhere>
  connect?: InputMaybe<CodeMirrorTypeConnectInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>>
  node?: InputMaybe<CodeMirrorTypeWhere>
  node_NOT?: InputMaybe<CodeMirrorTypeWhere>
}

export type ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInput = {
  where: CodeMirrorTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate = {
  node: CodeMirrorTypeOnCreateInput
}

export type ArrayTypeItemTypeCodeMirrorTypeCreateFieldInput = {
  node: CodeMirrorTypeCreateInput
}

export type ArrayTypeItemTypeCodeMirrorTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeUpdateConnectionInput = {
  node?: InputMaybe<CodeMirrorTypeUpdateInput>
}

export type ArrayTypeItemTypeCodeMirrorTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeConnectInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeConnectFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeConnectFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeConnectFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeConnectFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectFieldInput>
}

export type ArrayTypeItemTypeConnectionWhere = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectionWhere>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectionWhere>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectionWhere>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectionWhere>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeConnectionWhere>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectionWhere>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectionWhere>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectionWhere>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeConnectionWhere>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeConnectionWhere>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeConnectionWhere>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectionWhere>
}

export type ArrayTypeItemTypeConnectOrCreateInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeConnectOrCreateFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeConnectOrCreateFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeConnectOrCreateFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeConnectOrCreateFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeConnectOrCreateFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeCreateFieldInput = {
  PrimitiveType?: InputMaybe<
    Array<ArrayTypeItemTypePrimitiveTypeCreateFieldInput>
  >
  ArrayType?: InputMaybe<Array<ArrayTypeItemTypeArrayTypeCreateFieldInput>>
  UnionType?: InputMaybe<Array<ArrayTypeItemTypeUnionTypeCreateFieldInput>>
  InterfaceType?: InputMaybe<
    Array<ArrayTypeItemTypeInterfaceTypeCreateFieldInput>
  >
  ElementType?: InputMaybe<Array<ArrayTypeItemTypeElementTypeCreateFieldInput>>
  RenderPropsType?: InputMaybe<
    Array<ArrayTypeItemTypeRenderPropsTypeCreateFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<ArrayTypeItemTypeReactNodeTypeCreateFieldInput>
  >
  EnumType?: InputMaybe<Array<ArrayTypeItemTypeEnumTypeCreateFieldInput>>
  LambdaType?: InputMaybe<Array<ArrayTypeItemTypeLambdaTypeCreateFieldInput>>
  PageType?: InputMaybe<Array<ArrayTypeItemTypePageTypeCreateFieldInput>>
  AppType?: InputMaybe<Array<ArrayTypeItemTypeAppTypeCreateFieldInput>>
  ActionType?: InputMaybe<Array<ArrayTypeItemTypeActionTypeCreateFieldInput>>
  CodeMirrorType?: InputMaybe<
    Array<ArrayTypeItemTypeCodeMirrorTypeCreateFieldInput>
  >
}

export type ArrayTypeItemTypeCreateInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeFieldInput>
}

export type ArrayTypeItemTypeDeleteInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeDeleteFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeDeleteFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeDeleteFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeDeleteFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeDeleteFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeDeleteFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeDeleteFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeDeleteFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeDeleteFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeDeleteFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeDeleteFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeDeleteFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeDeleteFieldInput>
}

export type ArrayTypeItemTypeDisconnectInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeDisconnectFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeDisconnectFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeDisconnectFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeDisconnectFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeDisconnectFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeDisconnectFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeDisconnectFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeDisconnectFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeDisconnectFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeDisconnectFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeDisconnectFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeDisconnectFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeDisconnectFieldInput>
}

export type ArrayTypeItemTypeElementTypeConnectFieldInput = {
  where?: InputMaybe<ElementTypeConnectWhere>
  connect?: InputMaybe<ElementTypeConnectInput>
}

export type ArrayTypeItemTypeElementTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeElementTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeElementTypeConnectionWhere>>
  node?: InputMaybe<ElementTypeWhere>
  node_NOT?: InputMaybe<ElementTypeWhere>
}

export type ArrayTypeItemTypeElementTypeConnectOrCreateFieldInput = {
  where: ElementTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeElementTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeElementTypeConnectOrCreateFieldInputOnCreate = {
  node: ElementTypeOnCreateInput
}

export type ArrayTypeItemTypeElementTypeCreateFieldInput = {
  node: ElementTypeCreateInput
}

export type ArrayTypeItemTypeElementTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeElementTypeConnectionWhere>
  delete?: InputMaybe<ElementTypeDeleteInput>
}

export type ArrayTypeItemTypeElementTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeElementTypeConnectionWhere>
  disconnect?: InputMaybe<ElementTypeDisconnectInput>
}

export type ArrayTypeItemTypeElementTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeElementTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeElementTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeElementTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeElementTypeUpdateConnectionInput = {
  node?: InputMaybe<ElementTypeUpdateInput>
}

export type ArrayTypeItemTypeElementTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeElementTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeElementTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeElementTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeElementTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeElementTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeElementTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeElementTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>
  connect?: InputMaybe<EnumTypeConnectInput>
}

export type ArrayTypeItemTypeEnumTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeEnumTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeEnumTypeConnectionWhere>>
  node?: InputMaybe<EnumTypeWhere>
  node_NOT?: InputMaybe<EnumTypeWhere>
}

export type ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeOnCreateInput
}

export type ArrayTypeItemTypeEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput
}

export type ArrayTypeItemTypeEnumTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectionWhere>
  delete?: InputMaybe<EnumTypeDeleteInput>
}

export type ArrayTypeItemTypeEnumTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectionWhere>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
}

export type ArrayTypeItemTypeEnumTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeEnumTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>
}

export type ArrayTypeItemTypeEnumTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeEnumTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeEnumTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeEnumTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeEnumTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeEnumTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeInterfaceTypeConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
}

export type ArrayTypeItemTypeInterfaceTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeInterfaceTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeInterfaceTypeConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type ArrayTypeItemTypeInterfaceTypeCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type ArrayTypeItemTypeInterfaceTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type ArrayTypeItemTypeInterfaceTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type ArrayTypeItemTypeInterfaceTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeInterfaceTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeInterfaceTypeUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type ArrayTypeItemTypeInterfaceTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeInterfaceTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeInterfaceTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeInterfaceTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeInterfaceTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeInterfaceTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeLambdaTypeConnectFieldInput = {
  where?: InputMaybe<LambdaTypeConnectWhere>
  connect?: InputMaybe<LambdaTypeConnectInput>
}

export type ArrayTypeItemTypeLambdaTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeLambdaTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeLambdaTypeConnectionWhere>>
  node?: InputMaybe<LambdaTypeWhere>
  node_NOT?: InputMaybe<LambdaTypeWhere>
}

export type ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInput = {
  where: LambdaTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInputOnCreate = {
  node: LambdaTypeOnCreateInput
}

export type ArrayTypeItemTypeLambdaTypeCreateFieldInput = {
  node: LambdaTypeCreateInput
}

export type ArrayTypeItemTypeLambdaTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectionWhere>
  delete?: InputMaybe<LambdaTypeDeleteInput>
}

export type ArrayTypeItemTypeLambdaTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectionWhere>
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>
}

export type ArrayTypeItemTypeLambdaTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeLambdaTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeLambdaTypeUpdateConnectionInput = {
  node?: InputMaybe<LambdaTypeUpdateInput>
}

export type ArrayTypeItemTypeLambdaTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeLambdaTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeLambdaTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeLambdaTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeLambdaTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeLambdaTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypePageTypeConnectFieldInput = {
  where?: InputMaybe<PageTypeConnectWhere>
  connect?: InputMaybe<PageTypeConnectInput>
}

export type ArrayTypeItemTypePageTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypePageTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypePageTypeConnectionWhere>>
  node?: InputMaybe<PageTypeWhere>
  node_NOT?: InputMaybe<PageTypeWhere>
}

export type ArrayTypeItemTypePageTypeConnectOrCreateFieldInput = {
  where: PageTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypePageTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypePageTypeConnectOrCreateFieldInputOnCreate = {
  node: PageTypeOnCreateInput
}

export type ArrayTypeItemTypePageTypeCreateFieldInput = {
  node: PageTypeCreateInput
}

export type ArrayTypeItemTypePageTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePageTypeConnectionWhere>
  delete?: InputMaybe<PageTypeDeleteInput>
}

export type ArrayTypeItemTypePageTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePageTypeConnectionWhere>
  disconnect?: InputMaybe<PageTypeDisconnectInput>
}

export type ArrayTypeItemTypePageTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypePageTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypePageTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypePageTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypePageTypeUpdateConnectionInput = {
  node?: InputMaybe<PageTypeUpdateInput>
}

export type ArrayTypeItemTypePageTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePageTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypePageTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypePageTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypePageTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypePageTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypePageTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypePageTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypePrimitiveTypeConnectFieldInput = {
  where?: InputMaybe<PrimitiveTypeConnectWhere>
  connect?: InputMaybe<PrimitiveTypeConnectInput>
}

export type ArrayTypeItemTypePrimitiveTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypePrimitiveTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypePrimitiveTypeConnectionWhere>>
  node?: InputMaybe<PrimitiveTypeWhere>
  node_NOT?: InputMaybe<PrimitiveTypeWhere>
}

export type ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInput = {
  where: PrimitiveTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInputOnCreate = {
  node: PrimitiveTypeOnCreateInput
}

export type ArrayTypeItemTypePrimitiveTypeCreateFieldInput = {
  node: PrimitiveTypeCreateInput
}

export type ArrayTypeItemTypePrimitiveTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectionWhere>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
}

export type ArrayTypeItemTypePrimitiveTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectionWhere>
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>
}

export type ArrayTypeItemTypePrimitiveTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypePrimitiveTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypePrimitiveTypeUpdateConnectionInput = {
  node?: InputMaybe<PrimitiveTypeUpdateInput>
}

export type ArrayTypeItemTypePrimitiveTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypePrimitiveTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypePrimitiveTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypePrimitiveTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypePrimitiveTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypePrimitiveTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeReactNodeTypeConnectFieldInput = {
  where?: InputMaybe<ReactNodeTypeConnectWhere>
  connect?: InputMaybe<ReactNodeTypeConnectInput>
}

export type ArrayTypeItemTypeReactNodeTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeReactNodeTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeReactNodeTypeConnectionWhere>>
  node?: InputMaybe<ReactNodeTypeWhere>
  node_NOT?: InputMaybe<ReactNodeTypeWhere>
}

export type ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInput = {
  where: ReactNodeTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInputOnCreate = {
  node: ReactNodeTypeOnCreateInput
}

export type ArrayTypeItemTypeReactNodeTypeCreateFieldInput = {
  node: ReactNodeTypeCreateInput
}

export type ArrayTypeItemTypeReactNodeTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectionWhere>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
}

export type ArrayTypeItemTypeReactNodeTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectionWhere>
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>
}

export type ArrayTypeItemTypeReactNodeTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeReactNodeTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeReactNodeTypeUpdateConnectionInput = {
  node?: InputMaybe<ReactNodeTypeUpdateInput>
}

export type ArrayTypeItemTypeReactNodeTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeReactNodeTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeReactNodeTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeReactNodeTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeReactNodeTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeReactNodeTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeRenderPropsTypeConnectFieldInput = {
  where?: InputMaybe<RenderPropsTypeConnectWhere>
  connect?: InputMaybe<RenderPropsTypeConnectInput>
}

export type ArrayTypeItemTypeRenderPropsTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>>
  node?: InputMaybe<RenderPropsTypeWhere>
  node_NOT?: InputMaybe<RenderPropsTypeWhere>
}

export type ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInput = {
  where: RenderPropsTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInputOnCreate =
  {
    node: RenderPropsTypeOnCreateInput
  }

export type ArrayTypeItemTypeRenderPropsTypeCreateFieldInput = {
  node: RenderPropsTypeCreateInput
}

export type ArrayTypeItemTypeRenderPropsTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
}

export type ArrayTypeItemTypeRenderPropsTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>
}

export type ArrayTypeItemTypeRenderPropsTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeRenderPropsTypeUpdateConnectionInput = {
  node?: InputMaybe<RenderPropsTypeUpdateInput>
}

export type ArrayTypeItemTypeRenderPropsTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeUnionTypeConnectFieldInput = {
  where?: InputMaybe<UnionTypeConnectWhere>
  connect?: InputMaybe<UnionTypeConnectInput>
}

export type ArrayTypeItemTypeUnionTypeConnectionWhere = {
  OR?: InputMaybe<Array<ArrayTypeItemTypeUnionTypeConnectionWhere>>
  AND?: InputMaybe<Array<ArrayTypeItemTypeUnionTypeConnectionWhere>>
  node?: InputMaybe<UnionTypeWhere>
  node_NOT?: InputMaybe<UnionTypeWhere>
}

export type ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInput = {
  where: UnionTypeConnectOrCreateWhere
  onCreate: ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInputOnCreate
}

export type ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInputOnCreate = {
  node: UnionTypeOnCreateInput
}

export type ArrayTypeItemTypeUnionTypeCreateFieldInput = {
  node: UnionTypeCreateInput
}

export type ArrayTypeItemTypeUnionTypeDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectionWhere>
  delete?: InputMaybe<UnionTypeDeleteInput>
}

export type ArrayTypeItemTypeUnionTypeDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectionWhere>
  disconnect?: InputMaybe<UnionTypeDisconnectInput>
}

export type ArrayTypeItemTypeUnionTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeUnionTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeUnionTypeUpdateConnectionInput = {
  node?: InputMaybe<UnionTypeUpdateInput>
}

export type ArrayTypeItemTypeUnionTypeUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectionWhere>
  update?: InputMaybe<ArrayTypeItemTypeUnionTypeUpdateConnectionInput>
  connect?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectFieldInput>
  disconnect?: InputMaybe<ArrayTypeItemTypeUnionTypeDisconnectFieldInput>
  create?: InputMaybe<ArrayTypeItemTypeUnionTypeCreateFieldInput>
  delete?: InputMaybe<ArrayTypeItemTypeUnionTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ArrayTypeItemTypeUnionTypeConnectOrCreateFieldInput>
}

export type ArrayTypeItemTypeUpdateInput = {
  PrimitiveType?: InputMaybe<ArrayTypeItemTypePrimitiveTypeUpdateFieldInput>
  ArrayType?: InputMaybe<ArrayTypeItemTypeArrayTypeUpdateFieldInput>
  UnionType?: InputMaybe<ArrayTypeItemTypeUnionTypeUpdateFieldInput>
  InterfaceType?: InputMaybe<ArrayTypeItemTypeInterfaceTypeUpdateFieldInput>
  ElementType?: InputMaybe<ArrayTypeItemTypeElementTypeUpdateFieldInput>
  RenderPropsType?: InputMaybe<ArrayTypeItemTypeRenderPropsTypeUpdateFieldInput>
  ReactNodeType?: InputMaybe<ArrayTypeItemTypeReactNodeTypeUpdateFieldInput>
  EnumType?: InputMaybe<ArrayTypeItemTypeEnumTypeUpdateFieldInput>
  LambdaType?: InputMaybe<ArrayTypeItemTypeLambdaTypeUpdateFieldInput>
  PageType?: InputMaybe<ArrayTypeItemTypePageTypeUpdateFieldInput>
  AppType?: InputMaybe<ArrayTypeItemTypeAppTypeUpdateFieldInput>
  ActionType?: InputMaybe<ArrayTypeItemTypeActionTypeUpdateFieldInput>
  CodeMirrorType?: InputMaybe<ArrayTypeItemTypeCodeMirrorTypeUpdateFieldInput>
}

export type ArrayTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ArrayTypeOptions = {
  /** Specify one or more ArrayTypeSort objects to sort ArrayTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ArrayTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ArrayTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>
  node?: InputMaybe<ArrayTypeOwnerNodeAggregationWhereInput>
}

export type ArrayTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ArrayTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
}

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type ArrayTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ArrayTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeUpdateInput>
}

export type ArrayTypeWhere = {
  OR?: InputMaybe<Array<ArrayTypeWhere>>
  AND?: InputMaybe<Array<ArrayTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  itemTypeConnection?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
}

export type AtomAllowedChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AtomAllowedChildrenAggregateInput>>
  OR?: InputMaybe<Array<AtomAllowedChildrenAggregateInput>>
  node?: InputMaybe<AtomAllowedChildrenNodeAggregationWhereInput>
}

export type AtomAllowedChildrenConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>
  connect?: InputMaybe<Array<AtomConnectInput>>
}

export type AtomAllowedChildrenConnectionSort = {
  node?: InputMaybe<AtomSort>
}

export type AtomAllowedChildrenConnectionWhere = {
  AND?: InputMaybe<Array<AtomAllowedChildrenConnectionWhere>>
  OR?: InputMaybe<Array<AtomAllowedChildrenConnectionWhere>>
  node?: InputMaybe<AtomWhere>
  node_NOT?: InputMaybe<AtomWhere>
}

export type AtomAllowedChildrenConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: AtomAllowedChildrenConnectOrCreateFieldInputOnCreate
}

export type AtomAllowedChildrenConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type AtomAllowedChildrenCreateFieldInput = {
  node: AtomCreateInput
}

export type AtomAllowedChildrenDeleteFieldInput = {
  where?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  delete?: InputMaybe<AtomDeleteInput>
}

export type AtomAllowedChildrenDisconnectFieldInput = {
  where?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  disconnect?: InputMaybe<AtomDisconnectInput>
}

export type AtomAllowedChildrenFieldInput = {
  create?: InputMaybe<Array<AtomAllowedChildrenCreateFieldInput>>
  connect?: InputMaybe<Array<AtomAllowedChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<AtomAllowedChildrenConnectOrCreateFieldInput>
  >
}

export type AtomAllowedChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomAllowedChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AtomAllowedChildrenNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  icon_EQUAL?: InputMaybe<Scalars['String']>
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_GT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  icon_GTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  icon_LT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  icon_LTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AtomAllowedChildrenUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type AtomAllowedChildrenUpdateFieldInput = {
  where?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  update?: InputMaybe<AtomAllowedChildrenUpdateConnectionInput>
  connect?: InputMaybe<Array<AtomAllowedChildrenConnectFieldInput>>
  disconnect?: InputMaybe<Array<AtomAllowedChildrenDisconnectFieldInput>>
  create?: InputMaybe<Array<AtomAllowedChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<AtomAllowedChildrenDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<AtomAllowedChildrenConnectOrCreateFieldInput>
  >
}

export type AtomApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AtomApiAggregateInput>>
  OR?: InputMaybe<Array<AtomApiAggregateInput>>
  node?: InputMaybe<AtomApiNodeAggregationWhereInput>
}

export type AtomApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
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

export type AtomApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: AtomApiConnectOrCreateFieldInputOnCreate
}

export type AtomApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type AtomApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type AtomApiDeleteFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type AtomApiDisconnectFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type AtomApiFieldInput = {
  create?: InputMaybe<AtomApiCreateFieldInput>
  connect?: InputMaybe<AtomApiConnectFieldInput>
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>
}

export type AtomApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AtomApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type AtomApiUpdateFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>
  update?: InputMaybe<AtomApiUpdateConnectionInput>
  connect?: InputMaybe<AtomApiConnectFieldInput>
  disconnect?: InputMaybe<AtomApiDisconnectFieldInput>
  create?: InputMaybe<AtomApiCreateFieldInput>
  delete?: InputMaybe<AtomApiDeleteFieldInput>
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>
}

export type AtomConnectInput = {
  tags?: InputMaybe<Array<AtomTagsConnectFieldInput>>
  api?: InputMaybe<AtomApiConnectFieldInput>
  allowedChildren?: InputMaybe<Array<AtomAllowedChildrenConnectFieldInput>>
}

export type AtomConnectOrCreateInput = {
  tags?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
  api?: InputMaybe<AtomApiConnectOrCreateFieldInput>
  allowedChildren?: InputMaybe<
    Array<AtomAllowedChildrenConnectOrCreateFieldInput>
  >
}

export type AtomConnectOrCreateWhere = {
  node: AtomUniqueWhere
}

export type AtomConnectWhere = {
  node: AtomWhere
}

export type AtomCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  icon?: InputMaybe<Scalars['String']>
  type: AtomType
  tags?: InputMaybe<AtomTagsFieldInput>
  api?: InputMaybe<AtomApiFieldInput>
  allowedChildren?: InputMaybe<AtomAllowedChildrenFieldInput>
}

export type AtomDeleteInput = {
  tags?: InputMaybe<Array<AtomTagsDeleteFieldInput>>
  api?: InputMaybe<AtomApiDeleteFieldInput>
  allowedChildren?: InputMaybe<Array<AtomAllowedChildrenDeleteFieldInput>>
}

export type AtomDisconnectInput = {
  tags?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>
  api?: InputMaybe<AtomApiDisconnectFieldInput>
  allowedChildren?: InputMaybe<Array<AtomAllowedChildrenDisconnectFieldInput>>
}

export type AtomOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  icon?: InputMaybe<Scalars['String']>
}

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AtomSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type AtomRelationInput = {
  tags?: InputMaybe<Array<AtomTagsCreateFieldInput>>
  api?: InputMaybe<AtomApiCreateFieldInput>
  allowedChildren?: InputMaybe<Array<AtomAllowedChildrenCreateFieldInput>>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  icon?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type AtomTagsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AtomTagsAggregateInput>>
  OR?: InputMaybe<Array<AtomTagsAggregateInput>>
  node?: InputMaybe<AtomTagsNodeAggregationWhereInput>
}

export type AtomTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>
  connect?: InputMaybe<Array<TagConnectInput>>
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

export type AtomTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: AtomTagsConnectOrCreateFieldInputOnCreate
}

export type AtomTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type AtomTagsCreateFieldInput = {
  node: TagCreateInput
}

export type AtomTagsDeleteFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>
  delete?: InputMaybe<TagDeleteInput>
}

export type AtomTagsDisconnectFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>
  disconnect?: InputMaybe<TagDisconnectInput>
}

export type AtomTagsFieldInput = {
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
}

export type AtomTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type AtomTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type AtomTagsUpdateFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>
  update?: InputMaybe<AtomTagsUpdateConnectionInput>
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>
  disconnect?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>
  delete?: InputMaybe<Array<AtomTagsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
}

export type AtomUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
}

export type AtomUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  icon?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
  tags?: InputMaybe<Array<AtomTagsUpdateFieldInput>>
  api?: InputMaybe<AtomApiUpdateFieldInput>
  allowedChildren?: InputMaybe<Array<AtomAllowedChildrenUpdateFieldInput>>
}

export type AtomWhere = {
  OR?: InputMaybe<Array<AtomWhere>>
  AND?: InputMaybe<Array<AtomWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  icon?: InputMaybe<Scalars['String']>
  icon_NOT?: InputMaybe<Scalars['String']>
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  icon_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  icon_CONTAINS?: InputMaybe<Scalars['String']>
  icon_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  icon_STARTS_WITH?: InputMaybe<Scalars['String']>
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  icon_ENDS_WITH?: InputMaybe<Scalars['String']>
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
  type_NOT?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<AtomType>>
  type_NOT_IN?: InputMaybe<Array<AtomType>>
  /** @deprecated Use `tags_SOME` instead. */
  tags?: InputMaybe<TagWhere>
  /** @deprecated Use `tags_NONE` instead. */
  tags_NOT?: InputMaybe<TagWhere>
  tagsAggregate?: InputMaybe<AtomTagsAggregateInput>
  /** Return Atoms where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>
  /** Return Atoms where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>
  /** Return Atoms where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>
  /** Return Atoms where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>
  api?: InputMaybe<InterfaceTypeWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<AtomApiAggregateInput>
  /** @deprecated Use `allowedChildren_SOME` instead. */
  allowedChildren?: InputMaybe<AtomWhere>
  /** @deprecated Use `allowedChildren_NONE` instead. */
  allowedChildren_NOT?: InputMaybe<AtomWhere>
  allowedChildrenAggregate?: InputMaybe<AtomAllowedChildrenAggregateInput>
  /** Return Atoms where all of the related Atoms match this filter */
  allowedChildren_ALL?: InputMaybe<AtomWhere>
  /** Return Atoms where none of the related Atoms match this filter */
  allowedChildren_NONE?: InputMaybe<AtomWhere>
  /** Return Atoms where one of the related Atoms match this filter */
  allowedChildren_SINGLE?: InputMaybe<AtomWhere>
  /** Return Atoms where some of the related Atoms match this filter */
  allowedChildren_SOME?: InputMaybe<AtomWhere>
  /** @deprecated Use `tagsConnection_SOME` instead. */
  tagsConnection?: InputMaybe<AtomTagsConnectionWhere>
  /** @deprecated Use `tagsConnection_NONE` instead. */
  tagsConnection_NOT?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_ALL?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_NONE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SINGLE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SOME?: InputMaybe<AtomTagsConnectionWhere>
  apiConnection?: InputMaybe<AtomApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<AtomApiConnectionWhere>
  /** @deprecated Use `allowedChildrenConnection_SOME` instead. */
  allowedChildrenConnection?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  /** @deprecated Use `allowedChildrenConnection_NONE` instead. */
  allowedChildrenConnection_NOT?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  allowedChildrenConnection_ALL?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  allowedChildrenConnection_NONE?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  allowedChildrenConnection_SINGLE?: InputMaybe<AtomAllowedChildrenConnectionWhere>
  allowedChildrenConnection_SOME?: InputMaybe<AtomAllowedChildrenConnectionWhere>
}

export type BaseTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type BaseTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type BaseTypeConnectOrCreateWhere = {
  node: BaseTypeUniqueWhere
}

export type BaseTypeConnectWhere = {
  node: BaseTypeWhere
}

export type BaseTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type BaseTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type BaseTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type BaseTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type BaseTypeOptions = {
  /** Specify one or more BaseTypeSort objects to sort BaseTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BaseTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type BaseTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<BaseTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<BaseTypeOwnerAggregateInput>>
  node?: InputMaybe<BaseTypeOwnerNodeAggregationWhereInput>
}

export type BaseTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BaseTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<BaseTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type BaseTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort BaseTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one BaseTypeSort object. */
export type BaseTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type BaseTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type BaseTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type BaseTypeWhere = {
  OR?: InputMaybe<Array<BaseTypeWhere>>
  AND?: InputMaybe<Array<BaseTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<BaseTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type CodeActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>
}

export type CodeActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>
}

export type CodeActionConnectOrCreateWhere = {
  node: CodeActionUniqueWhere
}

export type CodeActionConnectWhere = {
  node: CodeActionWhere
}

export type CodeActionCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  code: Scalars['String']
  type?: ActionKind
  store?: InputMaybe<ActionBaseStoreFieldInput>
}

export type CodeActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>
}

export type CodeActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>
}

export type CodeActionOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  code: Scalars['String']
}

export type CodeActionOptions = {
  /** Specify one or more CodeActionSort objects to sort CodeActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeActionSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type CodeActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>
}

/** Fields to sort CodeActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeActionSort object. */
export type CodeActionSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  code?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type CodeActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<CodeActionStoreAggregateInput>>
  OR?: InputMaybe<Array<CodeActionStoreAggregateInput>>
  node?: InputMaybe<CodeActionStoreNodeAggregationWhereInput>
}

export type CodeActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<CodeActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type CodeActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type CodeActionUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  code?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ActionKind>
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>
}

export type CodeActionWhere = {
  OR?: InputMaybe<Array<CodeActionWhere>>
  AND?: InputMaybe<Array<CodeActionWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  code?: InputMaybe<Scalars['String']>
  code_NOT?: InputMaybe<Scalars['String']>
  code_IN?: InputMaybe<Array<Scalars['String']>>
  code_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  code_CONTAINS?: InputMaybe<Scalars['String']>
  code_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  code_STARTS_WITH?: InputMaybe<Scalars['String']>
  code_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  code_ENDS_WITH?: InputMaybe<Scalars['String']>
  code_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ActionKind>
  type_NOT?: InputMaybe<ActionKind>
  type_IN?: InputMaybe<Array<ActionKind>>
  type_NOT_IN?: InputMaybe<Array<ActionKind>>
  store?: InputMaybe<StoreWhere>
  store_NOT?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<CodeActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>
}

export type CodeMirrorTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type CodeMirrorTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type CodeMirrorTypeConnectOrCreateWhere = {
  node: CodeMirrorTypeUniqueWhere
}

export type CodeMirrorTypeConnectWhere = {
  node: CodeMirrorTypeWhere
}

export type CodeMirrorTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  language: CodeMirrorLanguage
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type CodeMirrorTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type CodeMirrorTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type CodeMirrorTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type CodeMirrorTypeOptions = {
  /** Specify one or more CodeMirrorTypeSort objects to sort CodeMirrorTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeMirrorTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type CodeMirrorTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>
  node?: InputMaybe<CodeMirrorTypeOwnerNodeAggregationWhereInput>
}

export type CodeMirrorTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type CodeMirrorTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort CodeMirrorTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeMirrorTypeSort object. */
export type CodeMirrorTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  language?: InputMaybe<SortDirection>
}

export type CodeMirrorTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type CodeMirrorTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  language?: InputMaybe<CodeMirrorLanguage>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type CodeMirrorTypeWhere = {
  OR?: InputMaybe<Array<CodeMirrorTypeWhere>>
  AND?: InputMaybe<Array<CodeMirrorTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  language?: InputMaybe<CodeMirrorLanguage>
  language_NOT?: InputMaybe<CodeMirrorLanguage>
  language_IN?: InputMaybe<Array<CodeMirrorLanguage>>
  language_NOT_IN?: InputMaybe<Array<CodeMirrorLanguage>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<CodeMirrorTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type ComponentApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ComponentApiAggregateInput>>
  OR?: InputMaybe<Array<ComponentApiAggregateInput>>
  node?: InputMaybe<ComponentApiNodeAggregationWhereInput>
}

export type ComponentApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
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

export type ComponentApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: ComponentApiConnectOrCreateFieldInputOnCreate
}

export type ComponentApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type ComponentApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type ComponentApiDeleteFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type ComponentApiDisconnectFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type ComponentApiFieldInput = {
  create?: InputMaybe<ComponentApiCreateFieldInput>
  connect?: InputMaybe<ComponentApiConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
}

export type ComponentApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type ComponentApiUpdateFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>
  update?: InputMaybe<ComponentApiUpdateConnectionInput>
  connect?: InputMaybe<ComponentApiConnectFieldInput>
  disconnect?: InputMaybe<ComponentApiDisconnectFieldInput>
  create?: InputMaybe<ComponentApiCreateFieldInput>
  delete?: InputMaybe<ComponentApiDeleteFieldInput>
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
}

export type ComponentConnectInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>
  api?: InputMaybe<ComponentApiConnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>
}

export type ComponentConnectOrCreateInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
  api?: InputMaybe<ComponentApiConnectOrCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
}

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere
}

export type ComponentConnectWhere = {
  node: ComponentWhere
}

export type ComponentCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  rootElement?: InputMaybe<ComponentRootElementFieldInput>
  api?: InputMaybe<ComponentApiFieldInput>
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
}

export type ComponentDeleteInput = {
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>
  api?: InputMaybe<ComponentApiDeleteFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
}

export type ComponentDisconnectInput = {
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>
  api?: InputMaybe<ComponentApiDisconnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
}

export type ComponentOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ComponentOptions = {
  /** Specify one or more ComponentSort objects to sort Components by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ComponentSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ComponentOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ComponentOwnerAggregateInput>>
  OR?: InputMaybe<Array<ComponentOwnerAggregateInput>>
  node?: InputMaybe<ComponentOwnerNodeAggregationWhereInput>
}

export type ComponentOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentRelationInput = {
  rootElement?: InputMaybe<ComponentRootElementCreateFieldInput>
  api?: InputMaybe<ComponentApiCreateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>
}

export type ComponentRootElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ComponentRootElementAggregateInput>>
  OR?: InputMaybe<Array<ComponentRootElementAggregateInput>>
  node?: InputMaybe<ComponentRootElementNodeAggregationWhereInput>
}

export type ComponentRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type ComponentRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ComponentRootElementConnectOrCreateFieldInputOnCreate
}

export type ComponentRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ComponentRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type ComponentRootElementDeleteFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ComponentRootElementDisconnectFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ComponentRootElementFieldInput = {
  create?: InputMaybe<ComponentRootElementCreateFieldInput>
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
}

export type ComponentRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ComponentRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ComponentRootElementUpdateFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>
  update?: InputMaybe<ComponentRootElementUpdateConnectionInput>
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>
  disconnect?: InputMaybe<ComponentRootElementDisconnectFieldInput>
  create?: InputMaybe<ComponentRootElementCreateFieldInput>
  delete?: InputMaybe<ComponentRootElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
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
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>
  api?: InputMaybe<ComponentApiUpdateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
}

export type ComponentWhere = {
  OR?: InputMaybe<Array<ComponentWhere>>
  AND?: InputMaybe<Array<ComponentWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<ElementWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<ComponentRootElementAggregateInput>
  api?: InputMaybe<InterfaceTypeWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<ComponentApiAggregateInput>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ComponentOwnerAggregateInput>
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>
  apiConnection?: InputMaybe<ComponentApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<ComponentApiConnectionWhere>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type CreateInfoCreateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoOptions = {
  /** Specify one or more CreateInfoSort objects to sort CreateInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CreateInfoSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  nodesCreated_INCREMENT?: InputMaybe<Scalars['Int']>
  nodesCreated_DECREMENT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_INCREMENT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_DECREMENT?: InputMaybe<Scalars['Int']>
}

export type CreateInfoWhere = {
  OR?: InputMaybe<Array<CreateInfoWhere>>
  AND?: InputMaybe<Array<CreateInfoWhere>>
  bookmark?: InputMaybe<Scalars['String']>
  bookmark_NOT?: InputMaybe<Scalars['String']>
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  nodesCreated?: InputMaybe<Scalars['Int']>
  nodesCreated_NOT?: InputMaybe<Scalars['Int']>
  nodesCreated_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesCreated_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesCreated_LT?: InputMaybe<Scalars['Int']>
  nodesCreated_LTE?: InputMaybe<Scalars['Int']>
  nodesCreated_GT?: InputMaybe<Scalars['Int']>
  nodesCreated_GTE?: InputMaybe<Scalars['Int']>
  relationshipsCreated?: InputMaybe<Scalars['Int']>
  relationshipsCreated_NOT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsCreated_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsCreated_LT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_LTE?: InputMaybe<Scalars['Int']>
  relationshipsCreated_GT?: InputMaybe<Scalars['Int']>
  relationshipsCreated_GTE?: InputMaybe<Scalars['Int']>
}

export type DeleteInfoCreateInput = {
  bookmark?: InputMaybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type DeleteInfoOptions = {
  /** Specify one or more DeleteInfoSort objects to sort DeleteInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteInfoSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  nodesDeleted_INCREMENT?: InputMaybe<Scalars['Int']>
  nodesDeleted_DECREMENT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_INCREMENT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_DECREMENT?: InputMaybe<Scalars['Int']>
}

export type DeleteInfoWhere = {
  OR?: InputMaybe<Array<DeleteInfoWhere>>
  AND?: InputMaybe<Array<DeleteInfoWhere>>
  bookmark?: InputMaybe<Scalars['String']>
  bookmark_NOT?: InputMaybe<Scalars['String']>
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  bookmark_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  bookmark_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  bookmark_ENDS_WITH?: InputMaybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  nodesDeleted?: InputMaybe<Scalars['Int']>
  nodesDeleted_NOT?: InputMaybe<Scalars['Int']>
  nodesDeleted_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesDeleted_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  nodesDeleted_LT?: InputMaybe<Scalars['Int']>
  nodesDeleted_LTE?: InputMaybe<Scalars['Int']>
  nodesDeleted_GT?: InputMaybe<Scalars['Int']>
  nodesDeleted_GTE?: InputMaybe<Scalars['Int']>
  relationshipsDeleted?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_NOT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsDeleted_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  relationshipsDeleted_LT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_LTE?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_GT?: InputMaybe<Scalars['Int']>
  relationshipsDeleted_GTE?: InputMaybe<Scalars['Int']>
}

export type DomainAppAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<DomainAppAggregateInput>>
  OR?: InputMaybe<Array<DomainAppAggregateInput>>
  node?: InputMaybe<DomainAppNodeAggregationWhereInput>
}

export type DomainAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>
  connect?: InputMaybe<AppConnectInput>
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

export type DomainAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: DomainAppConnectOrCreateFieldInputOnCreate
}

export type DomainAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type DomainAppCreateFieldInput = {
  node: AppCreateInput
}

export type DomainAppDeleteFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>
  delete?: InputMaybe<AppDeleteInput>
}

export type DomainAppDisconnectFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>
  disconnect?: InputMaybe<AppDisconnectInput>
}

export type DomainAppFieldInput = {
  create?: InputMaybe<DomainAppCreateFieldInput>
  connect?: InputMaybe<DomainAppConnectFieldInput>
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>
}

export type DomainAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type DomainAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type DomainAppUpdateFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>
  update?: InputMaybe<DomainAppUpdateConnectionInput>
  connect?: InputMaybe<DomainAppConnectFieldInput>
  disconnect?: InputMaybe<DomainAppDisconnectFieldInput>
  create?: InputMaybe<DomainAppCreateFieldInput>
  delete?: InputMaybe<DomainAppDeleteFieldInput>
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>
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
  id: Scalars['ID']
  name: Scalars['String']
  app?: InputMaybe<DomainAppFieldInput>
}

export type DomainDeleteInput = {
  app?: InputMaybe<DomainAppDeleteFieldInput>
}

export type DomainDisconnectInput = {
  app?: InputMaybe<DomainAppDisconnectFieldInput>
}

export type DomainOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type DomainOptions = {
  /** Specify one or more DomainSort objects to sort Domains by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DomainSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  app?: InputMaybe<DomainAppUpdateFieldInput>
}

export type DomainWhere = {
  OR?: InputMaybe<Array<DomainWhere>>
  AND?: InputMaybe<Array<DomainWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  app?: InputMaybe<AppWhere>
  app_NOT?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<DomainAppAggregateInput>
  appConnection?: InputMaybe<DomainAppConnectionWhere>
  appConnection_NOT?: InputMaybe<DomainAppConnectionWhere>
}

export type ElementConnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  firstChild?: InputMaybe<ElementFirstChildConnectFieldInput>
  parent?: InputMaybe<ElementParentConnectFieldInput>
  page?: InputMaybe<ElementPageConnectFieldInput>
  props?: InputMaybe<ElementPropsConnectFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentConnectFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
}

export type ElementConnectOrCreateInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
  firstChild?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>
  parent?: InputMaybe<ElementParentConnectOrCreateFieldInput>
  page?: InputMaybe<ElementPageConnectOrCreateFieldInput>
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
}

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere
}

export type ElementConnectWhere = {
  node: ElementWhere
}

export type ElementCreateInput = {
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  postRenderActionId?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementNextSiblingFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingFieldInput>
  firstChild?: InputMaybe<ElementFirstChildFieldInput>
  parent?: InputMaybe<ElementParentFieldInput>
  page?: InputMaybe<ElementPageFieldInput>
  props?: InputMaybe<ElementPropsFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeFieldInput>
  hooks?: InputMaybe<ElementHooksFieldInput>
  propMapBindings?: InputMaybe<ElementPropMapBindingsFieldInput>
}

export type ElementDeleteInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDeleteFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingDeleteFieldInput>
  firstChild?: InputMaybe<ElementFirstChildDeleteFieldInput>
  parent?: InputMaybe<ElementParentDeleteFieldInput>
  page?: InputMaybe<ElementPageDeleteFieldInput>
  props?: InputMaybe<ElementPropsDeleteFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentDeleteFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeDeleteFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeDeleteFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
}

export type ElementDisconnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDisconnectFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>
  firstChild?: InputMaybe<ElementFirstChildDisconnectFieldInput>
  parent?: InputMaybe<ElementParentDisconnectFieldInput>
  page?: InputMaybe<ElementPageDisconnectFieldInput>
  props?: InputMaybe<ElementPropsDisconnectFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentDisconnectFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeDisconnectFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeDisconnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsDisconnectFieldInput>
  >
}

export type ElementFirstChildAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementFirstChildAggregateInput>>
  OR?: InputMaybe<Array<ElementFirstChildAggregateInput>>
  node?: InputMaybe<ElementFirstChildNodeAggregationWhereInput>
}

export type ElementFirstChildConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
}

export type ElementFirstChildConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementFirstChildConnectionWhere = {
  AND?: InputMaybe<Array<ElementFirstChildConnectionWhere>>
  OR?: InputMaybe<Array<ElementFirstChildConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementFirstChildConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementFirstChildConnectOrCreateFieldInputOnCreate
}

export type ElementFirstChildConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementFirstChildCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementFirstChildDeleteFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementFirstChildDisconnectFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementFirstChildFieldInput = {
  create?: InputMaybe<ElementFirstChildCreateFieldInput>
  connect?: InputMaybe<ElementFirstChildConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>
}

export type ElementFirstChildNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementFirstChildNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementFirstChildNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementFirstChildUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementFirstChildUpdateFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>
  update?: InputMaybe<ElementFirstChildUpdateConnectionInput>
  connect?: InputMaybe<ElementFirstChildConnectFieldInput>
  disconnect?: InputMaybe<ElementFirstChildDisconnectFieldInput>
  create?: InputMaybe<ElementFirstChildCreateFieldInput>
  delete?: InputMaybe<ElementFirstChildDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>
}

export type ElementHooksAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementHooksAggregateInput>>
  OR?: InputMaybe<Array<ElementHooksAggregateInput>>
  node?: InputMaybe<ElementHooksNodeAggregationWhereInput>
}

export type ElementHooksConnectFieldInput = {
  where?: InputMaybe<HookConnectWhere>
  connect?: InputMaybe<Array<HookConnectInput>>
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

export type ElementHooksConnectOrCreateFieldInput = {
  where: HookConnectOrCreateWhere
  onCreate: ElementHooksConnectOrCreateFieldInputOnCreate
}

export type ElementHooksConnectOrCreateFieldInputOnCreate = {
  node: HookOnCreateInput
}

export type ElementHooksCreateFieldInput = {
  node: HookCreateInput
}

export type ElementHooksDeleteFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>
  delete?: InputMaybe<HookDeleteInput>
}

export type ElementHooksDisconnectFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>
  disconnect?: InputMaybe<HookDisconnectInput>
}

export type ElementHooksFieldInput = {
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
}

export type ElementHooksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
}

export type ElementHooksUpdateConnectionInput = {
  node?: InputMaybe<HookUpdateInput>
}

export type ElementHooksUpdateFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>
  update?: InputMaybe<ElementHooksUpdateConnectionInput>
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  disconnect?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  delete?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
}

export type ElementNextSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementNextSiblingAggregateInput>>
  OR?: InputMaybe<Array<ElementNextSiblingAggregateInput>>
  node?: InputMaybe<ElementNextSiblingNodeAggregationWhereInput>
}

export type ElementNextSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type ElementNextSiblingConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementNextSiblingConnectOrCreateFieldInputOnCreate
}

export type ElementNextSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementNextSiblingCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementNextSiblingDeleteFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementNextSiblingDisconnectFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementNextSiblingFieldInput = {
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
}

export type ElementNextSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementNextSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementNextSiblingUpdateFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>
  update?: InputMaybe<ElementNextSiblingUpdateConnectionInput>
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>
  disconnect?: InputMaybe<ElementNextSiblingDisconnectFieldInput>
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>
  delete?: InputMaybe<ElementNextSiblingDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>
}

export type ElementOnCreateInput = {
  id: Scalars['ID']
  name?: InputMaybe<Scalars['String']>
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  postRenderActionId?: InputMaybe<Scalars['String']>
}

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ElementPageAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementPageAggregateInput>>
  OR?: InputMaybe<Array<ElementPageAggregateInput>>
  node?: InputMaybe<ElementPageNodeAggregationWhereInput>
}

export type ElementPageConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>
  connect?: InputMaybe<PageConnectInput>
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

export type ElementPageConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere
  onCreate: ElementPageConnectOrCreateFieldInputOnCreate
}

export type ElementPageConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput
}

export type ElementPageCreateFieldInput = {
  node: PageCreateInput
}

export type ElementPageDeleteFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>
  delete?: InputMaybe<PageDeleteInput>
}

export type ElementPageDisconnectFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>
  disconnect?: InputMaybe<PageDisconnectInput>
}

export type ElementPageFieldInput = {
  create?: InputMaybe<ElementPageCreateFieldInput>
  connect?: InputMaybe<ElementPageConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>
}

export type ElementPageNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_EQUAL?: InputMaybe<Scalars['String']>
  getServerSideProps_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  getServerSideProps_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  getServerSideProps_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  getServerSideProps_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  getServerSideProps_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  getServerSideProps_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPageUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>
}

export type ElementPageUpdateFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>
  update?: InputMaybe<ElementPageUpdateConnectionInput>
  connect?: InputMaybe<ElementPageConnectFieldInput>
  disconnect?: InputMaybe<ElementPageDisconnectFieldInput>
  create?: InputMaybe<ElementPageCreateFieldInput>
  delete?: InputMaybe<ElementPageDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>
}

export type ElementParentAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementParentAggregateInput>>
  OR?: InputMaybe<Array<ElementParentAggregateInput>>
  node?: InputMaybe<ElementParentNodeAggregationWhereInput>
}

export type ElementParentComponentAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementParentComponentAggregateInput>>
  OR?: InputMaybe<Array<ElementParentComponentAggregateInput>>
  node?: InputMaybe<ElementParentComponentNodeAggregationWhereInput>
}

export type ElementParentComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>
  connect?: InputMaybe<ComponentConnectInput>
}

export type ElementParentComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>
}

export type ElementParentComponentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentComponentConnectionWhere>>
  OR?: InputMaybe<Array<ElementParentComponentConnectionWhere>>
  node?: InputMaybe<ComponentWhere>
  node_NOT?: InputMaybe<ComponentWhere>
}

export type ElementParentComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementParentComponentConnectOrCreateFieldInputOnCreate
}

export type ElementParentComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementParentComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementParentComponentDeleteFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type ElementParentComponentDisconnectFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>
  disconnect?: InputMaybe<ComponentDisconnectInput>
}

export type ElementParentComponentFieldInput = {
  create?: InputMaybe<ElementParentComponentCreateFieldInput>
  connect?: InputMaybe<ElementParentComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>
}

export type ElementParentComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentComponentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentComponentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementParentComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementParentComponentUpdateFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>
  update?: InputMaybe<ElementParentComponentUpdateConnectionInput>
  connect?: InputMaybe<ElementParentComponentConnectFieldInput>
  disconnect?: InputMaybe<ElementParentComponentDisconnectFieldInput>
  create?: InputMaybe<ElementParentComponentCreateFieldInput>
  delete?: InputMaybe<ElementParentComponentDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>
}

export type ElementParentConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
}

export type ElementParentConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type ElementParentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentConnectionWhere>>
  OR?: InputMaybe<Array<ElementParentConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type ElementParentConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementParentConnectOrCreateFieldInputOnCreate
}

export type ElementParentConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementParentCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementParentDeleteFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementParentDisconnectFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementParentFieldInput = {
  create?: InputMaybe<ElementParentCreateFieldInput>
  connect?: InputMaybe<ElementParentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementParentUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementParentUpdateFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>
  update?: InputMaybe<ElementParentUpdateConnectionInput>
  connect?: InputMaybe<ElementParentConnectFieldInput>
  disconnect?: InputMaybe<ElementParentDisconnectFieldInput>
  create?: InputMaybe<ElementParentCreateFieldInput>
  delete?: InputMaybe<ElementParentDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementPrevSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>
  OR?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>
  node?: InputMaybe<ElementPrevSiblingNodeAggregationWhereInput>
}

export type ElementPrevSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type ElementPrevSiblingConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementPrevSiblingConnectOrCreateFieldInputOnCreate
}

export type ElementPrevSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type ElementPrevSiblingCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementPrevSiblingDeleteFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementPrevSiblingDisconnectFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementPrevSiblingFieldInput = {
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
}

export type ElementPrevSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPrevSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type ElementPrevSiblingUpdateFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>
  update?: InputMaybe<ElementPrevSiblingUpdateConnectionInput>
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>
  disconnect?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>
  delete?: InputMaybe<ElementPrevSiblingDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>
}

export type ElementPropMapBindingsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>
  OR?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>
  node?: InputMaybe<ElementPropMapBindingsNodeAggregationWhereInput>
}

export type ElementPropMapBindingsConnectFieldInput = {
  where?: InputMaybe<PropMapBindingConnectWhere>
  connect?: InputMaybe<Array<PropMapBindingConnectInput>>
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

export type ElementPropMapBindingsConnectOrCreateFieldInput = {
  where: PropMapBindingConnectOrCreateWhere
  onCreate: ElementPropMapBindingsConnectOrCreateFieldInputOnCreate
}

export type ElementPropMapBindingsConnectOrCreateFieldInputOnCreate = {
  node: PropMapBindingOnCreateInput
}

export type ElementPropMapBindingsCreateFieldInput = {
  node: PropMapBindingCreateInput
}

export type ElementPropMapBindingsDeleteFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  delete?: InputMaybe<PropMapBindingDeleteInput>
}

export type ElementPropMapBindingsDisconnectFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>
}

export type ElementPropMapBindingsFieldInput = {
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
}

export type ElementPropMapBindingsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  sourceKey_EQUAL?: InputMaybe<Scalars['String']>
  sourceKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  sourceKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  sourceKey_GT?: InputMaybe<Scalars['Int']>
  sourceKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  sourceKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  sourceKey_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  sourceKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  sourceKey_LT?: InputMaybe<Scalars['Int']>
  sourceKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  sourceKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  sourceKey_LTE?: InputMaybe<Scalars['Int']>
  sourceKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  sourceKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  sourceKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  targetKey_EQUAL?: InputMaybe<Scalars['String']>
  targetKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  targetKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  targetKey_GT?: InputMaybe<Scalars['Int']>
  targetKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  targetKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  targetKey_GTE?: InputMaybe<Scalars['Int']>
  targetKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  targetKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  targetKey_LT?: InputMaybe<Scalars['Int']>
  targetKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  targetKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  targetKey_LTE?: InputMaybe<Scalars['Int']>
  targetKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  targetKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  targetKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPropMapBindingsUpdateConnectionInput = {
  node?: InputMaybe<PropMapBindingUpdateInput>
}

export type ElementPropMapBindingsUpdateFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  update?: InputMaybe<ElementPropMapBindingsUpdateConnectionInput>
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  disconnect?: InputMaybe<Array<ElementPropMapBindingsDisconnectFieldInput>>
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
  delete?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
}

export type ElementPropsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementPropsAggregateInput>>
  OR?: InputMaybe<Array<ElementPropsAggregateInput>>
  node?: InputMaybe<ElementPropsNodeAggregationWhereInput>
}

export type ElementPropsConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
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

export type ElementPropsConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: ElementPropsConnectOrCreateFieldInputOnCreate
}

export type ElementPropsConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
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
  create?: InputMaybe<ElementPropsCreateFieldInput>
  connect?: InputMaybe<ElementPropsConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
}

export type ElementPropsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementPropsUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ElementPropsUpdateFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>
  update?: InputMaybe<ElementPropsUpdateConnectionInput>
  connect?: InputMaybe<ElementPropsConnectFieldInput>
  disconnect?: InputMaybe<ElementPropsDisconnectFieldInput>
  create?: InputMaybe<ElementPropsCreateFieldInput>
  delete?: InputMaybe<ElementPropsDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
}

export type ElementRelationInput = {
  nextSibling?: InputMaybe<ElementNextSiblingCreateFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingCreateFieldInput>
  firstChild?: InputMaybe<ElementFirstChildCreateFieldInput>
  parent?: InputMaybe<ElementParentCreateFieldInput>
  page?: InputMaybe<ElementPageCreateFieldInput>
  props?: InputMaybe<ElementPropsCreateFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentCreateFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
}

export type ElementRenderAtomTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementRenderAtomTypeAggregateInput>>
  OR?: InputMaybe<Array<ElementRenderAtomTypeAggregateInput>>
  node?: InputMaybe<ElementRenderAtomTypeNodeAggregationWhereInput>
}

export type ElementRenderAtomTypeConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>
  connect?: InputMaybe<AtomConnectInput>
}

export type ElementRenderAtomTypeConnectionSort = {
  node?: InputMaybe<AtomSort>
}

export type ElementRenderAtomTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementRenderAtomTypeConnectionWhere>>
  OR?: InputMaybe<Array<ElementRenderAtomTypeConnectionWhere>>
  node?: InputMaybe<AtomWhere>
  node_NOT?: InputMaybe<AtomWhere>
}

export type ElementRenderAtomTypeConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: ElementRenderAtomTypeConnectOrCreateFieldInputOnCreate
}

export type ElementRenderAtomTypeConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type ElementRenderAtomTypeCreateFieldInput = {
  node: AtomCreateInput
}

export type ElementRenderAtomTypeDeleteFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  delete?: InputMaybe<AtomDeleteInput>
}

export type ElementRenderAtomTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  disconnect?: InputMaybe<AtomDisconnectInput>
}

export type ElementRenderAtomTypeFieldInput = {
  create?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>
  connect?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>
}

export type ElementRenderAtomTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementRenderAtomTypeNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementRenderAtomTypeNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  icon_EQUAL?: InputMaybe<Scalars['String']>
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_GT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  icon_GTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  icon_LT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  icon_LTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementRenderAtomTypeUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type ElementRenderAtomTypeUpdateFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  update?: InputMaybe<ElementRenderAtomTypeUpdateConnectionInput>
  connect?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>
  disconnect?: InputMaybe<ElementRenderAtomTypeDisconnectFieldInput>
  create?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>
  delete?: InputMaybe<ElementRenderAtomTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>
}

export type ElementRenderComponentTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementRenderComponentTypeAggregateInput>>
  OR?: InputMaybe<Array<ElementRenderComponentTypeAggregateInput>>
  node?: InputMaybe<ElementRenderComponentTypeNodeAggregationWhereInput>
}

export type ElementRenderComponentTypeConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>
  connect?: InputMaybe<ComponentConnectInput>
}

export type ElementRenderComponentTypeConnectionSort = {
  node?: InputMaybe<ComponentSort>
}

export type ElementRenderComponentTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementRenderComponentTypeConnectionWhere>>
  OR?: InputMaybe<Array<ElementRenderComponentTypeConnectionWhere>>
  node?: InputMaybe<ComponentWhere>
  node_NOT?: InputMaybe<ComponentWhere>
}

export type ElementRenderComponentTypeConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementRenderComponentTypeConnectOrCreateFieldInputOnCreate
}

export type ElementRenderComponentTypeConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementRenderComponentTypeCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementRenderComponentTypeDeleteFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type ElementRenderComponentTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  disconnect?: InputMaybe<ComponentDisconnectInput>
}

export type ElementRenderComponentTypeFieldInput = {
  create?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>
  connect?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>
}

export type ElementRenderComponentTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementRenderComponentTypeNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementRenderComponentTypeNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementRenderComponentTypeUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementRenderComponentTypeUpdateFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  update?: InputMaybe<ElementRenderComponentTypeUpdateConnectionInput>
  connect?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>
  disconnect?: InputMaybe<ElementRenderComponentTypeDisconnectFieldInput>
  create?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>
  delete?: InputMaybe<ElementRenderComponentTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  customCss?: InputMaybe<SortDirection>
  guiCss?: InputMaybe<SortDirection>
  propTransformationJs?: InputMaybe<SortDirection>
  renderForEachPropKey?: InputMaybe<SortDirection>
  renderIfPropKey?: InputMaybe<SortDirection>
  preRenderActionId?: InputMaybe<SortDirection>
  postRenderActionId?: InputMaybe<SortDirection>
}

export type ElementTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type ElementTypeConnectOrCreateWhere = {
  node: ElementTypeUniqueWhere
}

export type ElementTypeConnectWhere = {
  node: ElementTypeWhere
}

export type ElementTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  elementKind: ElementTypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type ElementTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ElementTypeOptions = {
  /** Specify one or more ElementTypeSort objects to sort ElementTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ElementTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>
  node?: InputMaybe<ElementTypeOwnerNodeAggregationWhereInput>
}

export type ElementTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  elementKind?: InputMaybe<SortDirection>
}

export type ElementTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  elementKind?: InputMaybe<ElementTypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type ElementTypeWhere = {
  OR?: InputMaybe<Array<ElementTypeWhere>>
  AND?: InputMaybe<Array<ElementTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  elementKind?: InputMaybe<ElementTypeKind>
  elementKind_NOT?: InputMaybe<ElementTypeKind>
  elementKind_IN?: InputMaybe<Array<ElementTypeKind>>
  elementKind_NOT_IN?: InputMaybe<Array<ElementTypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  customCss?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  postRenderActionId?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementNextSiblingUpdateFieldInput>
  prevSibling?: InputMaybe<ElementPrevSiblingUpdateFieldInput>
  firstChild?: InputMaybe<ElementFirstChildUpdateFieldInput>
  parent?: InputMaybe<ElementParentUpdateFieldInput>
  page?: InputMaybe<ElementPageUpdateFieldInput>
  props?: InputMaybe<ElementPropsUpdateFieldInput>
  parentComponent?: InputMaybe<ElementParentComponentUpdateFieldInput>
  renderComponentType?: InputMaybe<ElementRenderComponentTypeUpdateFieldInput>
  renderAtomType?: InputMaybe<ElementRenderAtomTypeUpdateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksUpdateFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsUpdateFieldInput>>
}

export type ElementWhere = {
  OR?: InputMaybe<Array<ElementWhere>>
  AND?: InputMaybe<Array<ElementWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  customCss?: InputMaybe<Scalars['String']>
  customCss_NOT?: InputMaybe<Scalars['String']>
  customCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  customCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  customCss_CONTAINS?: InputMaybe<Scalars['String']>
  customCss_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  customCss_STARTS_WITH?: InputMaybe<Scalars['String']>
  customCss_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  customCss_ENDS_WITH?: InputMaybe<Scalars['String']>
  customCss_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  guiCss?: InputMaybe<Scalars['String']>
  guiCss_NOT?: InputMaybe<Scalars['String']>
  guiCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  guiCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  guiCss_CONTAINS?: InputMaybe<Scalars['String']>
  guiCss_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  guiCss_STARTS_WITH?: InputMaybe<Scalars['String']>
  guiCss_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  guiCss_ENDS_WITH?: InputMaybe<Scalars['String']>
  guiCss_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT?: InputMaybe<Scalars['String']>
  propTransformationJs_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  propTransformationJs_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  propTransformationJs_CONTAINS?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  propTransformationJs_STARTS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_ENDS_WITH?: InputMaybe<Scalars['String']>
  propTransformationJs_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT?: InputMaybe<Scalars['String']>
  renderForEachPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderForEachPropKey_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderForEachPropKey_CONTAINS?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  renderForEachPropKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderForEachPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT?: InputMaybe<Scalars['String']>
  renderIfPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderIfPropKey_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  renderIfPropKey_CONTAINS?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  renderIfPropKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  renderIfPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT?: InputMaybe<Scalars['String']>
  preRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  preRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  preRenderActionId_CONTAINS?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  preRenderActionId_STARTS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_ENDS_WITH?: InputMaybe<Scalars['String']>
  preRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT?: InputMaybe<Scalars['String']>
  postRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postRenderActionId_CONTAINS?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  postRenderActionId_STARTS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_ENDS_WITH?: InputMaybe<Scalars['String']>
  postRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  nextSibling?: InputMaybe<ElementWhere>
  nextSibling_NOT?: InputMaybe<ElementWhere>
  nextSiblingAggregate?: InputMaybe<ElementNextSiblingAggregateInput>
  prevSibling?: InputMaybe<ElementWhere>
  prevSibling_NOT?: InputMaybe<ElementWhere>
  prevSiblingAggregate?: InputMaybe<ElementPrevSiblingAggregateInput>
  firstChild?: InputMaybe<ElementWhere>
  firstChild_NOT?: InputMaybe<ElementWhere>
  firstChildAggregate?: InputMaybe<ElementFirstChildAggregateInput>
  parent?: InputMaybe<ElementWhere>
  parent_NOT?: InputMaybe<ElementWhere>
  parentAggregate?: InputMaybe<ElementParentAggregateInput>
  page?: InputMaybe<PageWhere>
  page_NOT?: InputMaybe<PageWhere>
  pageAggregate?: InputMaybe<ElementPageAggregateInput>
  props?: InputMaybe<PropWhere>
  props_NOT?: InputMaybe<PropWhere>
  propsAggregate?: InputMaybe<ElementPropsAggregateInput>
  parentComponent?: InputMaybe<ComponentWhere>
  parentComponent_NOT?: InputMaybe<ComponentWhere>
  parentComponentAggregate?: InputMaybe<ElementParentComponentAggregateInput>
  renderComponentType?: InputMaybe<ComponentWhere>
  renderComponentType_NOT?: InputMaybe<ComponentWhere>
  renderComponentTypeAggregate?: InputMaybe<ElementRenderComponentTypeAggregateInput>
  renderAtomType?: InputMaybe<AtomWhere>
  renderAtomType_NOT?: InputMaybe<AtomWhere>
  renderAtomTypeAggregate?: InputMaybe<ElementRenderAtomTypeAggregateInput>
  /** @deprecated Use `hooks_SOME` instead. */
  hooks?: InputMaybe<HookWhere>
  /** @deprecated Use `hooks_NONE` instead. */
  hooks_NOT?: InputMaybe<HookWhere>
  hooksAggregate?: InputMaybe<ElementHooksAggregateInput>
  /** Return Elements where all of the related Hooks match this filter */
  hooks_ALL?: InputMaybe<HookWhere>
  /** Return Elements where none of the related Hooks match this filter */
  hooks_NONE?: InputMaybe<HookWhere>
  /** Return Elements where one of the related Hooks match this filter */
  hooks_SINGLE?: InputMaybe<HookWhere>
  /** Return Elements where some of the related Hooks match this filter */
  hooks_SOME?: InputMaybe<HookWhere>
  /** @deprecated Use `propMapBindings_SOME` instead. */
  propMapBindings?: InputMaybe<PropMapBindingWhere>
  /** @deprecated Use `propMapBindings_NONE` instead. */
  propMapBindings_NOT?: InputMaybe<PropMapBindingWhere>
  propMapBindingsAggregate?: InputMaybe<ElementPropMapBindingsAggregateInput>
  /** Return Elements where all of the related PropMapBindings match this filter */
  propMapBindings_ALL?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where none of the related PropMapBindings match this filter */
  propMapBindings_NONE?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where one of the related PropMapBindings match this filter */
  propMapBindings_SINGLE?: InputMaybe<PropMapBindingWhere>
  /** Return Elements where some of the related PropMapBindings match this filter */
  propMapBindings_SOME?: InputMaybe<PropMapBindingWhere>
  nextSiblingConnection?: InputMaybe<ElementNextSiblingConnectionWhere>
  nextSiblingConnection_NOT?: InputMaybe<ElementNextSiblingConnectionWhere>
  prevSiblingConnection?: InputMaybe<ElementPrevSiblingConnectionWhere>
  prevSiblingConnection_NOT?: InputMaybe<ElementPrevSiblingConnectionWhere>
  firstChildConnection?: InputMaybe<ElementFirstChildConnectionWhere>
  firstChildConnection_NOT?: InputMaybe<ElementFirstChildConnectionWhere>
  parentConnection?: InputMaybe<ElementParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<ElementParentConnectionWhere>
  pageConnection?: InputMaybe<ElementPageConnectionWhere>
  pageConnection_NOT?: InputMaybe<ElementPageConnectionWhere>
  propsConnection?: InputMaybe<ElementPropsConnectionWhere>
  propsConnection_NOT?: InputMaybe<ElementPropsConnectionWhere>
  parentComponentConnection?: InputMaybe<ElementParentComponentConnectionWhere>
  parentComponentConnection_NOT?: InputMaybe<ElementParentComponentConnectionWhere>
  renderComponentTypeConnection?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  renderComponentTypeConnection_NOT?: InputMaybe<ElementRenderComponentTypeConnectionWhere>
  renderAtomTypeConnection?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  renderAtomTypeConnection_NOT?: InputMaybe<ElementRenderAtomTypeConnectionWhere>
  /** @deprecated Use `hooksConnection_SOME` instead. */
  hooksConnection?: InputMaybe<ElementHooksConnectionWhere>
  /** @deprecated Use `hooksConnection_NONE` instead. */
  hooksConnection_NOT?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_ALL?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_NONE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SINGLE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SOME?: InputMaybe<ElementHooksConnectionWhere>
  /** @deprecated Use `propMapBindingsConnection_SOME` instead. */
  propMapBindingsConnection?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  /** @deprecated Use `propMapBindingsConnection_NONE` instead. */
  propMapBindingsConnection_NOT?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_ALL?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_NONE?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_SINGLE?: InputMaybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_SOME?: InputMaybe<ElementPropMapBindingsConnectionWhere>
}

export type EnumTypeAllowedValuesAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>
  node?: InputMaybe<EnumTypeAllowedValuesNodeAggregationWhereInput>
}

export type EnumTypeAllowedValuesConnectFieldInput = {
  where?: InputMaybe<EnumTypeValueConnectWhere>
  connect?: InputMaybe<Array<EnumTypeValueConnectInput>>
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
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  delete?: InputMaybe<EnumTypeValueDeleteInput>
}

export type EnumTypeAllowedValuesDisconnectFieldInput = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>
}

export type EnumTypeAllowedValuesFieldInput = {
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
}

export type EnumTypeAllowedValuesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  key_EQUAL?: InputMaybe<Scalars['String']>
  key_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  key_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  key_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  key_GT?: InputMaybe<Scalars['Int']>
  key_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  key_LONGEST_GT?: InputMaybe<Scalars['Int']>
  key_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  key_GTE?: InputMaybe<Scalars['Int']>
  key_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  key_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  key_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  key_LT?: InputMaybe<Scalars['Int']>
  key_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  key_LONGEST_LT?: InputMaybe<Scalars['Int']>
  key_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  key_LTE?: InputMaybe<Scalars['Int']>
  key_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  key_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  key_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  value_EQUAL?: InputMaybe<Scalars['String']>
  value_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  value_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  value_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  value_GT?: InputMaybe<Scalars['Int']>
  value_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  value_LONGEST_GT?: InputMaybe<Scalars['Int']>
  value_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  value_GTE?: InputMaybe<Scalars['Int']>
  value_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  value_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  value_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  value_LT?: InputMaybe<Scalars['Int']>
  value_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  value_LONGEST_LT?: InputMaybe<Scalars['Int']>
  value_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  value_LTE?: InputMaybe<Scalars['Int']>
  value_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  value_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  value_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeAllowedValuesUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeValueUpdateInput>
}

export type EnumTypeAllowedValuesUpdateFieldInput = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  update?: InputMaybe<EnumTypeAllowedValuesUpdateConnectionInput>
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
  disconnect?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  delete?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
}

export type EnumTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
}

export type EnumTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere
}

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere
}

export type EnumTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>
}

export type EnumTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
}

export type EnumTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
}

export type EnumTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type EnumTypeOptions = {
  /** Specify one or more EnumTypeSort objects to sort EnumTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type EnumTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>
  node?: InputMaybe<EnumTypeOwnerNodeAggregationWhereInput>
}

export type EnumTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
}

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type EnumTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type EnumTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesUpdateFieldInput>>
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
  id: Scalars['ID']
  key: Scalars['String']
  value: Scalars['String']
  enumType?: InputMaybe<EnumTypeValueEnumTypeFieldInput>
}

export type EnumTypeValueDeleteInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>
}

export type EnumTypeValueDisconnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>
}

export type EnumTypeValueEnumTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  node?: InputMaybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>
}

export type EnumTypeValueEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>
  connect?: InputMaybe<EnumTypeConnectInput>
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

export type EnumTypeValueEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere
  onCreate: EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate
}

export type EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeOnCreateInput
}

export type EnumTypeValueEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput
}

export type EnumTypeValueEnumTypeDeleteFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  delete?: InputMaybe<EnumTypeDeleteInput>
}

export type EnumTypeValueEnumTypeDisconnectFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
}

export type EnumTypeValueEnumTypeFieldInput = {
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueEnumTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type EnumTypeValueEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>
}

export type EnumTypeValueEnumTypeUpdateFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  update?: InputMaybe<EnumTypeValueEnumTypeUpdateConnectionInput>
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>
  disconnect?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
  delete?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueOptions = {
  /** Specify one or more EnumTypeValueSort objects to sort EnumTypeValues by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeValueSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type EnumTypeValueRelationInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>
}

/** Fields to sort EnumTypeValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeValueSort object. */
export type EnumTypeValueSort = {
  id?: InputMaybe<SortDirection>
  key?: InputMaybe<SortDirection>
  value?: InputMaybe<SortDirection>
}

export type EnumTypeValueUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
  enumType?: InputMaybe<EnumTypeValueEnumTypeUpdateFieldInput>
}

export type EnumTypeValueWhere = {
  OR?: InputMaybe<Array<EnumTypeValueWhere>>
  AND?: InputMaybe<Array<EnumTypeValueWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  key_NOT?: InputMaybe<Scalars['String']>
  key_IN?: InputMaybe<Array<Scalars['String']>>
  key_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  key_CONTAINS?: InputMaybe<Scalars['String']>
  key_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  key_STARTS_WITH?: InputMaybe<Scalars['String']>
  key_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  key_ENDS_WITH?: InputMaybe<Scalars['String']>
  key_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
  value_NOT?: InputMaybe<Scalars['String']>
  value_IN?: InputMaybe<Array<Scalars['String']>>
  value_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  value_CONTAINS?: InputMaybe<Scalars['String']>
  value_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  value_STARTS_WITH?: InputMaybe<Scalars['String']>
  value_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  value_ENDS_WITH?: InputMaybe<Scalars['String']>
  value_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  enumType?: InputMaybe<EnumTypeWhere>
  enumType_NOT?: InputMaybe<EnumTypeWhere>
  enumTypeAggregate?: InputMaybe<EnumTypeValueEnumTypeAggregateInput>
  enumTypeConnection?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
  enumTypeConnection_NOT?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeWhere = {
  OR?: InputMaybe<Array<EnumTypeWhere>>
  AND?: InputMaybe<Array<EnumTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>
  /** @deprecated Use `allowedValues_SOME` instead. */
  allowedValues?: InputMaybe<EnumTypeValueWhere>
  /** @deprecated Use `allowedValues_NONE` instead. */
  allowedValues_NOT?: InputMaybe<EnumTypeValueWhere>
  allowedValuesAggregate?: InputMaybe<EnumTypeAllowedValuesAggregateInput>
  /** Return EnumTypes where all of the related EnumTypeValues match this filter */
  allowedValues_ALL?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where none of the related EnumTypeValues match this filter */
  allowedValues_NONE?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where one of the related EnumTypeValues match this filter */
  allowedValues_SINGLE?: InputMaybe<EnumTypeValueWhere>
  /** Return EnumTypes where some of the related EnumTypeValues match this filter */
  allowedValues_SOME?: InputMaybe<EnumTypeValueWhere>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  /** @deprecated Use `allowedValuesConnection_SOME` instead. */
  allowedValuesConnection?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  /** @deprecated Use `allowedValuesConnection_NONE` instead. */
  allowedValuesConnection_NOT?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_ALL?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_NONE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SINGLE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SOME?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

export type FieldApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<FieldApiAggregateInput>>
  OR?: InputMaybe<Array<FieldApiAggregateInput>>
  node?: InputMaybe<FieldApiNodeAggregationWhereInput>
}

export type FieldApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
}

export type FieldApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type FieldApiConnectionWhere = {
  AND?: InputMaybe<Array<FieldApiConnectionWhere>>
  OR?: InputMaybe<Array<FieldApiConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type FieldApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: FieldApiConnectOrCreateFieldInputOnCreate
}

export type FieldApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type FieldApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type FieldApiDeleteFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type FieldApiDisconnectFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type FieldApiFieldInput = {
  create?: InputMaybe<FieldApiCreateFieldInput>
  connect?: InputMaybe<FieldApiConnectFieldInput>
  connectOrCreate?: InputMaybe<FieldApiConnectOrCreateFieldInput>
}

export type FieldApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FieldApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<FieldApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type FieldApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type FieldApiUpdateFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>
  update?: InputMaybe<FieldApiUpdateConnectionInput>
  connect?: InputMaybe<FieldApiConnectFieldInput>
  disconnect?: InputMaybe<FieldApiDisconnectFieldInput>
  create?: InputMaybe<FieldApiCreateFieldInput>
  delete?: InputMaybe<FieldApiDeleteFieldInput>
  connectOrCreate?: InputMaybe<FieldApiConnectOrCreateFieldInput>
}

export type FieldConnectInput = {
  fieldType?: InputMaybe<FieldFieldTypeConnectFieldInput>
  api?: InputMaybe<FieldApiConnectFieldInput>
}

export type FieldConnectOrCreateInput = {
  api?: InputMaybe<FieldApiConnectOrCreateFieldInput>
}

export type FieldConnectWhere = {
  node: FieldWhere
}

export type FieldCreateInput = {
  id: Scalars['ID']
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  validationRules?: InputMaybe<Scalars['String']>
  defaultValues?: InputMaybe<Scalars['String']>
  fieldType?: InputMaybe<FieldFieldTypeFieldInput>
  api?: InputMaybe<FieldApiFieldInput>
}

export type FieldDeleteInput = {
  fieldType?: InputMaybe<FieldFieldTypeDeleteFieldInput>
  api?: InputMaybe<FieldApiDeleteFieldInput>
}

export type FieldDisconnectInput = {
  fieldType?: InputMaybe<FieldFieldTypeDisconnectFieldInput>
  api?: InputMaybe<FieldApiDisconnectFieldInput>
}

export type FieldFieldTypeConnectFieldInput = {
  connect?: InputMaybe<IBaseTypeConnectInput>
  where?: InputMaybe<IBaseTypeConnectWhere>
}

export type FieldFieldTypeConnectionSort = {
  node?: InputMaybe<IBaseTypeSort>
}

export type FieldFieldTypeConnectionWhere = {
  AND?: InputMaybe<Array<FieldFieldTypeConnectionWhere>>
  OR?: InputMaybe<Array<FieldFieldTypeConnectionWhere>>
  node?: InputMaybe<IBaseTypeWhere>
  node_NOT?: InputMaybe<IBaseTypeWhere>
}

export type FieldFieldTypeCreateFieldInput = {
  node: IBaseTypeCreateInput
}

export type FieldFieldTypeDeleteFieldInput = {
  delete?: InputMaybe<IBaseTypeDeleteInput>
  where?: InputMaybe<FieldFieldTypeConnectionWhere>
}

export type FieldFieldTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<IBaseTypeDisconnectInput>
  where?: InputMaybe<FieldFieldTypeConnectionWhere>
}

export type FieldFieldTypeFieldInput = {
  create?: InputMaybe<FieldFieldTypeCreateFieldInput>
  connect?: InputMaybe<FieldFieldTypeConnectFieldInput>
}

export type FieldFieldTypeUpdateConnectionInput = {
  node?: InputMaybe<IBaseTypeUpdateInput>
}

export type FieldFieldTypeUpdateFieldInput = {
  connect?: InputMaybe<FieldFieldTypeConnectFieldInput>
  create?: InputMaybe<FieldFieldTypeCreateFieldInput>
  delete?: InputMaybe<FieldFieldTypeDeleteFieldInput>
  disconnect?: InputMaybe<FieldFieldTypeDisconnectFieldInput>
  update?: InputMaybe<FieldFieldTypeUpdateConnectionInput>
  where?: InputMaybe<FieldFieldTypeConnectionWhere>
}

export type FieldOptions = {
  /** Specify one or more FieldSort objects to sort Fields by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<FieldSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type FieldRelationInput = {
  fieldType?: InputMaybe<FieldFieldTypeCreateFieldInput>
  api?: InputMaybe<FieldApiCreateFieldInput>
}

/** Fields to sort Fields by. The order in which sorts are applied is not guaranteed when specifying many fields in one FieldSort object. */
export type FieldSort = {
  id?: InputMaybe<SortDirection>
  key?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  description?: InputMaybe<SortDirection>
  validationRules?: InputMaybe<SortDirection>
  defaultValues?: InputMaybe<SortDirection>
}

export type FieldUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  validationRules?: InputMaybe<Scalars['String']>
  defaultValues?: InputMaybe<Scalars['String']>
  fieldType?: InputMaybe<FieldFieldTypeUpdateFieldInput>
  api?: InputMaybe<FieldApiUpdateFieldInput>
}

export type FieldWhere = {
  OR?: InputMaybe<Array<FieldWhere>>
  AND?: InputMaybe<Array<FieldWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  key?: InputMaybe<Scalars['String']>
  key_NOT?: InputMaybe<Scalars['String']>
  key_IN?: InputMaybe<Array<Scalars['String']>>
  key_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  key_CONTAINS?: InputMaybe<Scalars['String']>
  key_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  key_STARTS_WITH?: InputMaybe<Scalars['String']>
  key_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  key_ENDS_WITH?: InputMaybe<Scalars['String']>
  key_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  description_NOT?: InputMaybe<Scalars['String']>
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  description_CONTAINS?: InputMaybe<Scalars['String']>
  description_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  description_STARTS_WITH?: InputMaybe<Scalars['String']>
  description_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  description_ENDS_WITH?: InputMaybe<Scalars['String']>
  description_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  validationRules?: InputMaybe<Scalars['String']>
  validationRules_NOT?: InputMaybe<Scalars['String']>
  validationRules_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  validationRules_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  validationRules_CONTAINS?: InputMaybe<Scalars['String']>
  validationRules_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  validationRules_STARTS_WITH?: InputMaybe<Scalars['String']>
  validationRules_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  validationRules_ENDS_WITH?: InputMaybe<Scalars['String']>
  validationRules_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  defaultValues?: InputMaybe<Scalars['String']>
  defaultValues_NOT?: InputMaybe<Scalars['String']>
  defaultValues_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  defaultValues_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  defaultValues_CONTAINS?: InputMaybe<Scalars['String']>
  defaultValues_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  defaultValues_STARTS_WITH?: InputMaybe<Scalars['String']>
  defaultValues_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  defaultValues_ENDS_WITH?: InputMaybe<Scalars['String']>
  defaultValues_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  api?: InputMaybe<InterfaceTypeWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<FieldApiAggregateInput>
  fieldTypeConnection?: InputMaybe<FieldFieldTypeConnectionWhere>
  fieldTypeConnection_NOT?: InputMaybe<FieldFieldTypeConnectionWhere>
  apiConnection?: InputMaybe<FieldApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<FieldApiConnectionWhere>
}

export type GetBaseTypesReturnCreateInput = {
  totalCount: Scalars['Int']
}

export type GetBaseTypesReturnOptions = {
  /** Specify one or more GetBaseTypesReturnSort objects to sort GetBaseTypesReturns by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GetBaseTypesReturnSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort GetBaseTypesReturns by. The order in which sorts are applied is not guaranteed when specifying many fields in one GetBaseTypesReturnSort object. */
export type GetBaseTypesReturnSort = {
  totalCount?: InputMaybe<SortDirection>
}

export type GetBaseTypesReturnUpdateInput = {
  totalCount?: InputMaybe<Scalars['Int']>
  totalCount_INCREMENT?: InputMaybe<Scalars['Int']>
  totalCount_DECREMENT?: InputMaybe<Scalars['Int']>
}

export type GetBaseTypesReturnWhere = {
  OR?: InputMaybe<Array<GetBaseTypesReturnWhere>>
  AND?: InputMaybe<Array<GetBaseTypesReturnWhere>>
  totalCount?: InputMaybe<Scalars['Int']>
  totalCount_NOT?: InputMaybe<Scalars['Int']>
  totalCount_IN?: InputMaybe<Array<Scalars['Int']>>
  totalCount_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  totalCount_LT?: InputMaybe<Scalars['Int']>
  totalCount_LTE?: InputMaybe<Scalars['Int']>
  totalCount_GT?: InputMaybe<Scalars['Int']>
  totalCount_GTE?: InputMaybe<Scalars['Int']>
}

export type HookConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<HookConfigAggregateInput>>
  OR?: InputMaybe<Array<HookConfigAggregateInput>>
  node?: InputMaybe<HookConfigNodeAggregationWhereInput>
}

export type HookConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
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

export type HookConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: HookConfigConnectOrCreateFieldInputOnCreate
}

export type HookConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
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
  create?: InputMaybe<HookConfigCreateFieldInput>
  connect?: InputMaybe<HookConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>
}

export type HookConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type HookConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type HookConfigUpdateFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>
  update?: InputMaybe<HookConfigUpdateConnectionInput>
  connect?: InputMaybe<HookConfigConnectFieldInput>
  disconnect?: InputMaybe<HookConfigDisconnectFieldInput>
  create?: InputMaybe<HookConfigCreateFieldInput>
  delete?: InputMaybe<HookConfigDeleteFieldInput>
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>
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
  type: AtomType
  config?: InputMaybe<HookConfigFieldInput>
  element?: InputMaybe<HookElementFieldInput>
}

export type HookDeleteInput = {
  config?: InputMaybe<HookConfigDeleteFieldInput>
  element?: InputMaybe<HookElementDeleteFieldInput>
}

export type HookDisconnectInput = {
  config?: InputMaybe<HookConfigDisconnectFieldInput>
  element?: InputMaybe<HookElementDisconnectFieldInput>
}

export type HookElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<HookElementAggregateInput>>
  OR?: InputMaybe<Array<HookElementAggregateInput>>
  node?: InputMaybe<HookElementNodeAggregationWhereInput>
}

export type HookElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type HookElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: HookElementConnectOrCreateFieldInputOnCreate
}

export type HookElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type HookElementCreateFieldInput = {
  node: ElementCreateInput
}

export type HookElementDeleteFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type HookElementDisconnectFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type HookElementFieldInput = {
  create?: InputMaybe<HookElementCreateFieldInput>
  connect?: InputMaybe<HookElementConnectFieldInput>
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>
}

export type HookElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type HookElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type HookElementUpdateFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>
  update?: InputMaybe<HookElementUpdateConnectionInput>
  connect?: InputMaybe<HookElementConnectFieldInput>
  disconnect?: InputMaybe<HookElementDisconnectFieldInput>
  create?: InputMaybe<HookElementCreateFieldInput>
  delete?: InputMaybe<HookElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>
}

export type HookOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>
}

export type HookOptions = {
  /** Specify one or more HookSort objects to sort Hooks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HookSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  type?: InputMaybe<AtomType>
  config?: InputMaybe<HookConfigUpdateFieldInput>
  element?: InputMaybe<HookElementUpdateFieldInput>
}

export type HookWhere = {
  OR?: InputMaybe<Array<HookWhere>>
  AND?: InputMaybe<Array<HookWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  type?: InputMaybe<AtomType>
  type_NOT?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<AtomType>>
  type_NOT_IN?: InputMaybe<Array<AtomType>>
  config?: InputMaybe<PropWhere>
  config_NOT?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<HookConfigAggregateInput>
  element?: InputMaybe<ElementWhere>
  element_NOT?: InputMaybe<ElementWhere>
  elementAggregate?: InputMaybe<HookElementAggregateInput>
  configConnection?: InputMaybe<HookConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<HookConfigConnectionWhere>
  elementConnection?: InputMaybe<HookElementConnectionWhere>
  elementConnection_NOT?: InputMaybe<HookElementConnectionWhere>
}

export type IBaseTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  _on?: InputMaybe<IBaseTypeImplementationsConnectInput>
}

export type IBaseTypeConnectWhere = {
  node: IBaseTypeWhere
}

export type IBaseTypeCreateInput = {
  BaseType?: InputMaybe<BaseTypeCreateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeCreateInput>
  ArrayType?: InputMaybe<ArrayTypeCreateInput>
  UnionType?: InputMaybe<UnionTypeCreateInput>
  InterfaceType?: InputMaybe<InterfaceTypeCreateInput>
  ElementType?: InputMaybe<ElementTypeCreateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeCreateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeCreateInput>
  EnumType?: InputMaybe<EnumTypeCreateInput>
  LambdaType?: InputMaybe<LambdaTypeCreateInput>
  PageType?: InputMaybe<PageTypeCreateInput>
  AppType?: InputMaybe<AppTypeCreateInput>
  ActionType?: InputMaybe<ActionTypeCreateInput>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeCreateInput>
}

export type IBaseTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  _on?: InputMaybe<IBaseTypeImplementationsDeleteInput>
}

export type IBaseTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  _on?: InputMaybe<IBaseTypeImplementationsDisconnectInput>
}

export type IBaseTypeImplementationsConnectInput = {
  BaseType?: InputMaybe<Array<BaseTypeConnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeConnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeConnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeConnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeConnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeConnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeConnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeConnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeConnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeConnectInput>>
  PageType?: InputMaybe<Array<PageTypeConnectInput>>
  AppType?: InputMaybe<Array<AppTypeConnectInput>>
  ActionType?: InputMaybe<Array<ActionTypeConnectInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeConnectInput>>
}

export type IBaseTypeImplementationsDeleteInput = {
  BaseType?: InputMaybe<Array<BaseTypeDeleteInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDeleteInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDeleteInput>>
  UnionType?: InputMaybe<Array<UnionTypeDeleteInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDeleteInput>>
  ElementType?: InputMaybe<Array<ElementTypeDeleteInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDeleteInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDeleteInput>>
  EnumType?: InputMaybe<Array<EnumTypeDeleteInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDeleteInput>>
  PageType?: InputMaybe<Array<PageTypeDeleteInput>>
  AppType?: InputMaybe<Array<AppTypeDeleteInput>>
  ActionType?: InputMaybe<Array<ActionTypeDeleteInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDeleteInput>>
}

export type IBaseTypeImplementationsDisconnectInput = {
  BaseType?: InputMaybe<Array<BaseTypeDisconnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDisconnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDisconnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeDisconnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDisconnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeDisconnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDisconnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDisconnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeDisconnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDisconnectInput>>
  PageType?: InputMaybe<Array<PageTypeDisconnectInput>>
  AppType?: InputMaybe<Array<AppTypeDisconnectInput>>
  ActionType?: InputMaybe<Array<ActionTypeDisconnectInput>>
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDisconnectInput>>
}

export type IBaseTypeImplementationsUpdateInput = {
  BaseType?: InputMaybe<BaseTypeUpdateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeUpdateInput>
  ArrayType?: InputMaybe<ArrayTypeUpdateInput>
  UnionType?: InputMaybe<UnionTypeUpdateInput>
  InterfaceType?: InputMaybe<InterfaceTypeUpdateInput>
  ElementType?: InputMaybe<ElementTypeUpdateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeUpdateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeUpdateInput>
  EnumType?: InputMaybe<EnumTypeUpdateInput>
  LambdaType?: InputMaybe<LambdaTypeUpdateInput>
  PageType?: InputMaybe<PageTypeUpdateInput>
  AppType?: InputMaybe<AppTypeUpdateInput>
  ActionType?: InputMaybe<ActionTypeUpdateInput>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeUpdateInput>
}

export type IBaseTypeImplementationsWhere = {
  BaseType?: InputMaybe<BaseTypeWhere>
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>
  ArrayType?: InputMaybe<ArrayTypeWhere>
  UnionType?: InputMaybe<UnionTypeWhere>
  InterfaceType?: InputMaybe<InterfaceTypeWhere>
  ElementType?: InputMaybe<ElementTypeWhere>
  RenderPropsType?: InputMaybe<RenderPropsTypeWhere>
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>
  EnumType?: InputMaybe<EnumTypeWhere>
  LambdaType?: InputMaybe<LambdaTypeWhere>
  PageType?: InputMaybe<PageTypeWhere>
  AppType?: InputMaybe<AppTypeWhere>
  ActionType?: InputMaybe<ActionTypeWhere>
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>
}

export type IBaseTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more IBaseTypeSort objects to sort IBaseTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<IBaseTypeSort>>>
}

export type IBaseTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<IBaseTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<IBaseTypeOwnerAggregateInput>>
  node?: InputMaybe<IBaseTypeOwnerNodeAggregationWhereInput>
}

export type IBaseTypeOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<UserConnectInput>
}

export type IBaseTypeOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type IBaseTypeOwnerConnectionWhere = {
  AND?: InputMaybe<Array<IBaseTypeOwnerConnectionWhere>>
  OR?: InputMaybe<Array<IBaseTypeOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type IBaseTypeOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: IBaseTypeOwnerConnectOrCreateFieldInputOnCreate
}

export type IBaseTypeOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type IBaseTypeOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type IBaseTypeOwnerDeleteFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type IBaseTypeOwnerDisconnectFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type IBaseTypeOwnerFieldInput = {
  create?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  connect?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type IBaseTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IBaseTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<IBaseTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type IBaseTypeOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type IBaseTypeOwnerUpdateFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  update?: InputMaybe<IBaseTypeOwnerUpdateConnectionInput>
  connect?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  disconnect?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  create?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  delete?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  connectOrCreate?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

/** Fields to sort IBaseTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one IBaseTypeSort object. */
export type IBaseTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type IBaseTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  _on?: InputMaybe<IBaseTypeImplementationsUpdateInput>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type IBaseTypeWhere = {
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  _on?: InputMaybe<IBaseTypeImplementationsWhere>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<IBaseTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type InterfaceTypeApiOfAtomsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  node?: InputMaybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>
}

export type InterfaceTypeApiOfAtomsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>
  connect?: InputMaybe<Array<AtomConnectInput>>
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

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate
}

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type InterfaceTypeApiOfAtomsCreateFieldInput = {
  node: AtomCreateInput
}

export type InterfaceTypeApiOfAtomsDeleteFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  delete?: InputMaybe<AtomDeleteInput>
}

export type InterfaceTypeApiOfAtomsDisconnectFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  disconnect?: InputMaybe<AtomDisconnectInput>
}

export type InterfaceTypeApiOfAtomsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeApiOfAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  icon_EQUAL?: InputMaybe<Scalars['String']>
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  icon_GT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  icon_GTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  icon_LT?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  icon_LTE?: InputMaybe<Scalars['Int']>
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeApiOfAtomsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type InterfaceTypeApiOfAtomsUpdateFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  update?: InputMaybe<InterfaceTypeApiOfAtomsUpdateConnectionInput>
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  disconnect?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  delete?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
  apiOfAtoms?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeConnectOrCreateWhere = {
  node: InterfaceTypeUniqueWhere
}

export type InterfaceTypeConnectWhere = {
  node: InterfaceTypeWhere
}

export type InterfaceTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
  apiOfAtoms?: InputMaybe<InterfaceTypeApiOfAtomsFieldInput>
  fields?: InputMaybe<InterfaceTypeFieldsFieldInput>
}

export type InterfaceTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
}

export type InterfaceTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
}

export type InterfaceTypeFieldsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<InterfaceTypeFieldsAggregateInput>>
  OR?: InputMaybe<Array<InterfaceTypeFieldsAggregateInput>>
  node?: InputMaybe<InterfaceTypeFieldsNodeAggregationWhereInput>
}

export type InterfaceTypeFieldsConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>
  connect?: InputMaybe<Array<FieldConnectInput>>
}

export type InterfaceTypeFieldsConnectionSort = {
  node?: InputMaybe<FieldSort>
}

export type InterfaceTypeFieldsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>
  OR?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>
  node?: InputMaybe<FieldWhere>
  node_NOT?: InputMaybe<FieldWhere>
}

export type InterfaceTypeFieldsCreateFieldInput = {
  node: FieldCreateInput
}

export type InterfaceTypeFieldsDeleteFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  delete?: InputMaybe<FieldDeleteInput>
}

export type InterfaceTypeFieldsDisconnectFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  disconnect?: InputMaybe<FieldDisconnectInput>
}

export type InterfaceTypeFieldsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeFieldsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<InterfaceTypeFieldsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  key_EQUAL?: InputMaybe<Scalars['String']>
  key_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  key_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  key_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  key_GT?: InputMaybe<Scalars['Int']>
  key_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  key_LONGEST_GT?: InputMaybe<Scalars['Int']>
  key_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  key_GTE?: InputMaybe<Scalars['Int']>
  key_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  key_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  key_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  key_LT?: InputMaybe<Scalars['Int']>
  key_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  key_LONGEST_LT?: InputMaybe<Scalars['Int']>
  key_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  key_LTE?: InputMaybe<Scalars['Int']>
  key_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  key_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  key_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  description_EQUAL?: InputMaybe<Scalars['String']>
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  description_GT?: InputMaybe<Scalars['Int']>
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  description_GTE?: InputMaybe<Scalars['Int']>
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  description_LT?: InputMaybe<Scalars['Int']>
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  description_LTE?: InputMaybe<Scalars['Int']>
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  validationRules_EQUAL?: InputMaybe<Scalars['String']>
  validationRules_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  validationRules_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  validationRules_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  validationRules_GT?: InputMaybe<Scalars['Int']>
  validationRules_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  validationRules_LONGEST_GT?: InputMaybe<Scalars['Int']>
  validationRules_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  validationRules_GTE?: InputMaybe<Scalars['Int']>
  validationRules_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  validationRules_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  validationRules_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  validationRules_LT?: InputMaybe<Scalars['Int']>
  validationRules_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  validationRules_LONGEST_LT?: InputMaybe<Scalars['Int']>
  validationRules_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  validationRules_LTE?: InputMaybe<Scalars['Int']>
  validationRules_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  validationRules_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  validationRules_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  defaultValues_EQUAL?: InputMaybe<Scalars['String']>
  defaultValues_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  defaultValues_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  defaultValues_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  defaultValues_GT?: InputMaybe<Scalars['Int']>
  defaultValues_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  defaultValues_LONGEST_GT?: InputMaybe<Scalars['Int']>
  defaultValues_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  defaultValues_GTE?: InputMaybe<Scalars['Int']>
  defaultValues_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  defaultValues_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  defaultValues_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  defaultValues_LT?: InputMaybe<Scalars['Int']>
  defaultValues_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  defaultValues_LONGEST_LT?: InputMaybe<Scalars['Int']>
  defaultValues_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  defaultValues_LTE?: InputMaybe<Scalars['Int']>
  defaultValues_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  defaultValues_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  defaultValues_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeFieldsUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>
}

export type InterfaceTypeFieldsUpdateFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  update?: InputMaybe<InterfaceTypeFieldsUpdateConnectionInput>
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  disconnect?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  delete?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
}

export type InterfaceTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type InterfaceTypeOptions = {
  /** Specify one or more InterfaceTypeSort objects to sort InterfaceTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InterfaceTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>
  node?: InputMaybe<InterfaceTypeOwnerNodeAggregationWhereInput>
}

export type InterfaceTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type InterfaceTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
}

/** Fields to sort InterfaceTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeSort object. */
export type InterfaceTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type InterfaceTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type InterfaceTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsUpdateFieldInput>>
}

export type InterfaceTypeWhere = {
  OR?: InputMaybe<Array<InterfaceTypeWhere>>
  AND?: InputMaybe<Array<InterfaceTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>
  /** @deprecated Use `apiOfAtoms_SOME` instead. */
  apiOfAtoms?: InputMaybe<AtomWhere>
  /** @deprecated Use `apiOfAtoms_NONE` instead. */
  apiOfAtoms_NOT?: InputMaybe<AtomWhere>
  apiOfAtomsAggregate?: InputMaybe<InterfaceTypeApiOfAtomsAggregateInput>
  /** Return InterfaceTypes where all of the related Atoms match this filter */
  apiOfAtoms_ALL?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where none of the related Atoms match this filter */
  apiOfAtoms_NONE?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where one of the related Atoms match this filter */
  apiOfAtoms_SINGLE?: InputMaybe<AtomWhere>
  /** Return InterfaceTypes where some of the related Atoms match this filter */
  apiOfAtoms_SOME?: InputMaybe<AtomWhere>
  /** @deprecated Use `fields_SOME` instead. */
  fields?: InputMaybe<FieldWhere>
  /** @deprecated Use `fields_NONE` instead. */
  fields_NOT?: InputMaybe<FieldWhere>
  fieldsAggregate?: InputMaybe<InterfaceTypeFieldsAggregateInput>
  /** Return InterfaceTypes where all of the related Fields match this filter */
  fields_ALL?: InputMaybe<FieldWhere>
  /** Return InterfaceTypes where none of the related Fields match this filter */
  fields_NONE?: InputMaybe<FieldWhere>
  /** Return InterfaceTypes where one of the related Fields match this filter */
  fields_SINGLE?: InputMaybe<FieldWhere>
  /** Return InterfaceTypes where some of the related Fields match this filter */
  fields_SOME?: InputMaybe<FieldWhere>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  /** @deprecated Use `apiOfAtomsConnection_SOME` instead. */
  apiOfAtomsConnection?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  /** @deprecated Use `apiOfAtomsConnection_NONE` instead. */
  apiOfAtomsConnection_NOT?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_ALL?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_NONE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SINGLE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SOME?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  /** @deprecated Use `fieldsConnection_SOME` instead. */
  fieldsConnection?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  /** @deprecated Use `fieldsConnection_NONE` instead. */
  fieldsConnection_NOT?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_ALL?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_NONE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SOME?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type LambdaTypeConnectOrCreateWhere = {
  node: LambdaTypeUniqueWhere
}

export type LambdaTypeConnectWhere = {
  node: LambdaTypeWhere
}

export type LambdaTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type LambdaTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type LambdaTypeOptions = {
  /** Specify one or more LambdaTypeSort objects to sort LambdaTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LambdaTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type LambdaTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>
  node?: InputMaybe<LambdaTypeOwnerNodeAggregationWhereInput>
}

export type LambdaTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type LambdaTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type LambdaTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type LambdaTypeWhere = {
  OR?: InputMaybe<Array<LambdaTypeWhere>>
  AND?: InputMaybe<Array<LambdaTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type PageAppAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PageAppAggregateInput>>
  OR?: InputMaybe<Array<PageAppAggregateInput>>
  node?: InputMaybe<PageAppNodeAggregationWhereInput>
}

export type PageAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>
  connect?: InputMaybe<AppConnectInput>
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

export type PageAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: PageAppConnectOrCreateFieldInputOnCreate
}

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type PageAppCreateFieldInput = {
  node: AppCreateInput
}

export type PageAppDeleteFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>
  delete?: InputMaybe<AppDeleteInput>
}

export type PageAppDisconnectFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>
  disconnect?: InputMaybe<AppDisconnectInput>
}

export type PageAppFieldInput = {
  create?: InputMaybe<PageAppCreateFieldInput>
  connect?: InputMaybe<PageAppConnectFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
}

export type PageAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type PageAppUpdateFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>
  update?: InputMaybe<PageAppUpdateConnectionInput>
  connect?: InputMaybe<PageAppConnectFieldInput>
  disconnect?: InputMaybe<PageAppDisconnectFieldInput>
  create?: InputMaybe<PageAppCreateFieldInput>
  delete?: InputMaybe<PageAppDeleteFieldInput>
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectInput = {
  rootElement?: InputMaybe<PageRootElementConnectFieldInput>
  app?: InputMaybe<PageAppConnectFieldInput>
}

export type PageConnectOrCreateInput = {
  rootElement?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
  app?: InputMaybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere
}

export type PageConnectWhere = {
  node: PageWhere
}

export type PageCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  getServerSideProps?: InputMaybe<Scalars['String']>
  isProvider?: Scalars['Boolean']
  rootElement?: InputMaybe<PageRootElementFieldInput>
  app?: InputMaybe<PageAppFieldInput>
}

export type PageDeleteInput = {
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>
  app?: InputMaybe<PageAppDeleteFieldInput>
}

export type PageDisconnectInput = {
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>
  app?: InputMaybe<PageAppDisconnectFieldInput>
}

export type PageOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  getServerSideProps?: InputMaybe<Scalars['String']>
  isProvider?: Scalars['Boolean']
}

export type PageOptions = {
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type PageRelationInput = {
  rootElement?: InputMaybe<PageRootElementCreateFieldInput>
  app?: InputMaybe<PageAppCreateFieldInput>
}

export type PageRootElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PageRootElementAggregateInput>>
  OR?: InputMaybe<Array<PageRootElementAggregateInput>>
  node?: InputMaybe<PageRootElementNodeAggregationWhereInput>
}

export type PageRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type PageRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate
}

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PageRootElementDeleteFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type PageRootElementDisconnectFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type PageRootElementFieldInput = {
  create?: InputMaybe<PageRootElementCreateFieldInput>
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
}

export type PageRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PageRootElementUpdateFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>
  update?: InputMaybe<PageRootElementUpdateConnectionInput>
  connect?: InputMaybe<PageRootElementConnectFieldInput>
  disconnect?: InputMaybe<PageRootElementDisconnectFieldInput>
  create?: InputMaybe<PageRootElementCreateFieldInput>
  delete?: InputMaybe<PageRootElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>
}

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  slug?: InputMaybe<SortDirection>
  getServerSideProps?: InputMaybe<SortDirection>
  isProvider?: InputMaybe<SortDirection>
}

export type PageTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type PageTypeConnectOrCreateWhere = {
  node: PageTypeUniqueWhere
}

export type PageTypeConnectWhere = {
  node: PageTypeWhere
}

export type PageTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type PageTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type PageTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type PageTypeOptions = {
  /** Specify one or more PageTypeSort objects to sort PageTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type PageTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PageTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<PageTypeOwnerAggregateInput>>
  node?: InputMaybe<PageTypeOwnerNodeAggregationWhereInput>
}

export type PageTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PageTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type PageTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type PageTypeWhere = {
  OR?: InputMaybe<Array<PageTypeWhere>>
  AND?: InputMaybe<Array<PageTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  getServerSideProps?: InputMaybe<Scalars['String']>
  isProvider?: InputMaybe<Scalars['Boolean']>
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>
  app?: InputMaybe<PageAppUpdateFieldInput>
}

export type PageWhere = {
  OR?: InputMaybe<Array<PageWhere>>
  AND?: InputMaybe<Array<PageWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  slug_NOT?: InputMaybe<Scalars['String']>
  slug_IN?: InputMaybe<Array<Scalars['String']>>
  slug_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  slug_CONTAINS?: InputMaybe<Scalars['String']>
  slug_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  slug_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  slug_ENDS_WITH?: InputMaybe<Scalars['String']>
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  getServerSideProps?: InputMaybe<Scalars['String']>
  getServerSideProps_NOT?: InputMaybe<Scalars['String']>
  getServerSideProps_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  getServerSideProps_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  getServerSideProps_CONTAINS?: InputMaybe<Scalars['String']>
  getServerSideProps_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  getServerSideProps_STARTS_WITH?: InputMaybe<Scalars['String']>
  getServerSideProps_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  getServerSideProps_ENDS_WITH?: InputMaybe<Scalars['String']>
  getServerSideProps_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  isProvider?: InputMaybe<Scalars['Boolean']>
  isProvider_NOT?: InputMaybe<Scalars['Boolean']>
  rootElement?: InputMaybe<ElementWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<PageRootElementAggregateInput>
  app?: InputMaybe<AppWhere>
  app_NOT?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<PageAppAggregateInput>
  rootElementConnection?: InputMaybe<PageRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<PageRootElementConnectionWhere>
  appConnection?: InputMaybe<PageAppConnectionWhere>
  appConnection_NOT?: InputMaybe<PageAppConnectionWhere>
}

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type PrimitiveTypeConnectOrCreateWhere = {
  node: PrimitiveTypeUniqueWhere
}

export type PrimitiveTypeConnectWhere = {
  node: PrimitiveTypeWhere
}

export type PrimitiveTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  primitiveKind: PrimitiveTypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type PrimitiveTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type PrimitiveTypeOptions = {
  /** Specify one or more PrimitiveTypeSort objects to sort PrimitiveTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PrimitiveTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type PrimitiveTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>
  node?: InputMaybe<PrimitiveTypeOwnerNodeAggregationWhereInput>
}

export type PrimitiveTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
  primitiveKind?: InputMaybe<SortDirection>
}

export type PrimitiveTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
}

export type PrimitiveTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type PrimitiveTypeWhere = {
  OR?: InputMaybe<Array<PrimitiveTypeWhere>>
  AND?: InputMaybe<Array<PrimitiveTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_NOT?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  primitiveKind_NOT_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
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
  sourceKey: Scalars['String']
  targetKey: Scalars['String']
  element?: InputMaybe<PropMapBindingElementFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementFieldInput>
}

export type PropMapBindingDeleteInput = {
  element?: InputMaybe<PropMapBindingElementDeleteFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>
}

export type PropMapBindingDisconnectInput = {
  element?: InputMaybe<PropMapBindingElementDisconnectFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>
}

export type PropMapBindingElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PropMapBindingElementAggregateInput>>
  OR?: InputMaybe<Array<PropMapBindingElementAggregateInput>>
  node?: InputMaybe<PropMapBindingElementNodeAggregationWhereInput>
}

export type PropMapBindingElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type PropMapBindingElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PropMapBindingElementConnectOrCreateFieldInputOnCreate
}

export type PropMapBindingElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PropMapBindingElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingElementDeleteFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type PropMapBindingElementDisconnectFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type PropMapBindingElementFieldInput = {
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>
}

export type PropMapBindingElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PropMapBindingElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PropMapBindingElementUpdateFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>
  update?: InputMaybe<PropMapBindingElementUpdateConnectionInput>
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>
  disconnect?: InputMaybe<PropMapBindingElementDisconnectFieldInput>
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>
  delete?: InputMaybe<PropMapBindingElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>
}

export type PropMapBindingOnCreateInput = {
  sourceKey: Scalars['String']
  targetKey: Scalars['String']
}

export type PropMapBindingOptions = {
  /** Specify one or more PropMapBindingSort objects to sort PropMapBindings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropMapBindingSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>
  OR?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>
  node?: InputMaybe<PropMapBindingTargetElementNodeAggregationWhereInput>
}

export type PropMapBindingTargetElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
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

export type PropMapBindingTargetElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate
}

export type PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type PropMapBindingTargetElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingTargetElementDeleteFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type PropMapBindingTargetElementDisconnectFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type PropMapBindingTargetElementFieldInput = {
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
}

export type PropMapBindingTargetElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type PropMapBindingTargetElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type PropMapBindingTargetElementUpdateFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  update?: InputMaybe<PropMapBindingTargetElementUpdateConnectionInput>
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>
  disconnect?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>
  delete?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
}

export type PropMapBindingUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PropMapBindingUpdateInput = {
  sourceKey?: InputMaybe<Scalars['String']>
  targetKey?: InputMaybe<Scalars['String']>
  element?: InputMaybe<PropMapBindingElementUpdateFieldInput>
  targetElement?: InputMaybe<PropMapBindingTargetElementUpdateFieldInput>
}

export type PropMapBindingWhere = {
  OR?: InputMaybe<Array<PropMapBindingWhere>>
  AND?: InputMaybe<Array<PropMapBindingWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  sourceKey?: InputMaybe<Scalars['String']>
  sourceKey_NOT?: InputMaybe<Scalars['String']>
  sourceKey_IN?: InputMaybe<Array<Scalars['String']>>
  sourceKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  sourceKey_CONTAINS?: InputMaybe<Scalars['String']>
  sourceKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  sourceKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  sourceKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  targetKey?: InputMaybe<Scalars['String']>
  targetKey_NOT?: InputMaybe<Scalars['String']>
  targetKey_IN?: InputMaybe<Array<Scalars['String']>>
  targetKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  targetKey_CONTAINS?: InputMaybe<Scalars['String']>
  targetKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  targetKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  targetKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  targetKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  targetKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  element?: InputMaybe<ElementWhere>
  element_NOT?: InputMaybe<ElementWhere>
  elementAggregate?: InputMaybe<PropMapBindingElementAggregateInput>
  targetElement?: InputMaybe<ElementWhere>
  targetElement_NOT?: InputMaybe<ElementWhere>
  targetElementAggregate?: InputMaybe<PropMapBindingTargetElementAggregateInput>
  elementConnection?: InputMaybe<PropMapBindingElementConnectionWhere>
  elementConnection_NOT?: InputMaybe<PropMapBindingElementConnectionWhere>
  targetElementConnection?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
  targetElementConnection_NOT?: InputMaybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropOnCreateInput = {
  data?: Scalars['String']
}

export type PropOptions = {
  /** Specify one or more PropSort objects to sort Props by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort Props by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropSort object. */
export type PropSort = {
  id?: InputMaybe<SortDirection>
  data?: InputMaybe<SortDirection>
}

export type PropUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PropUpdateInput = {
  data?: InputMaybe<Scalars['String']>
}

export type PropWhere = {
  OR?: InputMaybe<Array<PropWhere>>
  AND?: InputMaybe<Array<PropWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  data?: InputMaybe<Scalars['String']>
  data_NOT?: InputMaybe<Scalars['String']>
  data_IN?: InputMaybe<Array<Scalars['String']>>
  data_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  data_CONTAINS?: InputMaybe<Scalars['String']>
  data_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  data_STARTS_WITH?: InputMaybe<Scalars['String']>
  data_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  data_ENDS_WITH?: InputMaybe<Scalars['String']>
  data_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
}

export type QueryOptions = {
  offset?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
}

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type ReactNodeTypeConnectOrCreateWhere = {
  node: ReactNodeTypeUniqueWhere
}

export type ReactNodeTypeConnectWhere = {
  node: ReactNodeTypeWhere
}

export type ReactNodeTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type ReactNodeTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ReactNodeTypeOptions = {
  /** Specify one or more ReactNodeTypeSort objects to sort ReactNodeTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ReactNodeTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ReactNodeTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>
  node?: InputMaybe<ReactNodeTypeOwnerNodeAggregationWhereInput>
}

export type ReactNodeTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type ReactNodeTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ReactNodeTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type ReactNodeTypeWhere = {
  OR?: InputMaybe<Array<ReactNodeTypeWhere>>
  AND?: InputMaybe<Array<ReactNodeTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type RenderPropsTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
}

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
}

export type RenderPropsTypeConnectOrCreateWhere = {
  node: RenderPropsTypeUniqueWhere
}

export type RenderPropsTypeConnectWhere = {
  node: RenderPropsTypeWhere
}

export type RenderPropsTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
}

export type RenderPropsTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
}

export type RenderPropsTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
}

export type RenderPropsTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type RenderPropsTypeOptions = {
  /** Specify one or more RenderPropsTypeSort objects to sort RenderPropsTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RenderPropsTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type RenderPropsTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>
  node?: InputMaybe<RenderPropsTypeOwnerNodeAggregationWhereInput>
}

export type RenderPropsTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type RenderPropsTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
}

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type RenderPropsTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type RenderPropsTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
}

export type RenderPropsTypeWhere = {
  OR?: InputMaybe<Array<RenderPropsTypeWhere>>
  AND?: InputMaybe<Array<RenderPropsTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<RenderPropsTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
}

export type ResetDatabaseMutationResponseCreateInput = {
  success?: InputMaybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseOptions = {
  /** Specify one or more ResetDatabaseMutationResponseSort objects to sort ResetDatabaseMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResetDatabaseMutationResponseSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort ResetDatabaseMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResetDatabaseMutationResponseSort object. */
export type ResetDatabaseMutationResponseSort = {
  success?: InputMaybe<SortDirection>
}

export type ResetDatabaseMutationResponseUpdateInput = {
  success?: InputMaybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseWhere = {
  OR?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>
  AND?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>
  success?: InputMaybe<Scalars['Boolean']>
  success_NOT?: InputMaybe<Scalars['Boolean']>
}

export type ResourceConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ResourceConfigAggregateInput>>
  OR?: InputMaybe<Array<ResourceConfigAggregateInput>>
  node?: InputMaybe<ResourceConfigNodeAggregationWhereInput>
}

export type ResourceConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>
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

export type ResourceConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: ResourceConfigConnectOrCreateFieldInputOnCreate
}

export type ResourceConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput
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
  create?: InputMaybe<ResourceConfigCreateFieldInput>
  connect?: InputMaybe<ResourceConfigConnectFieldInput>
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>
}

export type ResourceConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  data_EQUAL?: InputMaybe<Scalars['String']>
  data_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  data_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  data_GT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  data_LONGEST_GT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  data_GTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  data_LT?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  data_LONGEST_LT?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  data_LTE?: InputMaybe<Scalars['Int']>
  data_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  data_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  data_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ResourceConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>
}

export type ResourceConfigUpdateFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>
  update?: InputMaybe<ResourceConfigUpdateConnectionInput>
  connect?: InputMaybe<ResourceConfigConnectFieldInput>
  disconnect?: InputMaybe<ResourceConfigDisconnectFieldInput>
  create?: InputMaybe<ResourceConfigCreateFieldInput>
  delete?: InputMaybe<ResourceConfigDeleteFieldInput>
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>
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
  id: Scalars['ID']
  name: Scalars['String']
  type: ResourceType
  config?: InputMaybe<ResourceConfigFieldInput>
  owner?: InputMaybe<WithOwnerOwnerFieldInput>
}

export type ResourceDeleteInput = {
  config?: InputMaybe<ResourceConfigDeleteFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
}

export type ResourceDisconnectInput = {
  config?: InputMaybe<ResourceConfigDisconnectFieldInput>
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
}

export type ResourceOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type ResourceOptions = {
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ResourceOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ResourceOwnerAggregateInput>>
  OR?: InputMaybe<Array<ResourceOwnerAggregateInput>>
  node?: InputMaybe<ResourceOwnerNodeAggregationWhereInput>
}

export type ResourceOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type ResourceUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ResourceUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ResourceType>
  config?: InputMaybe<ResourceConfigUpdateFieldInput>
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>
}

export type ResourceWhere = {
  OR?: InputMaybe<Array<ResourceWhere>>
  AND?: InputMaybe<Array<ResourceWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ResourceType>
  type_NOT?: InputMaybe<ResourceType>
  type_IN?: InputMaybe<Array<ResourceType>>
  type_NOT_IN?: InputMaybe<Array<ResourceType>>
  config?: InputMaybe<PropWhere>
  config_NOT?: InputMaybe<PropWhere>
  configAggregate?: InputMaybe<ResourceConfigAggregateInput>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ResourceOwnerAggregateInput>
  configConnection?: InputMaybe<ResourceConfigConnectionWhere>
  configConnection_NOT?: InputMaybe<ResourceConfigConnectionWhere>
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>
}

export type StoreActionsApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>
  connect?: InputMaybe<Array<ApiActionConnectInput>>
}

export type StoreActionsApiActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsApiActionConnectionWhere>>
  AND?: InputMaybe<Array<StoreActionsApiActionConnectionWhere>>
  node?: InputMaybe<ApiActionWhere>
  node_NOT?: InputMaybe<ApiActionWhere>
}

export type StoreActionsApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere
  onCreate: StoreActionsApiActionConnectOrCreateFieldInputOnCreate
}

export type StoreActionsApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput
}

export type StoreActionsApiActionCreateFieldInput = {
  node: ApiActionCreateInput
}

export type StoreActionsApiActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>
  delete?: InputMaybe<ApiActionDeleteInput>
}

export type StoreActionsApiActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>
  disconnect?: InputMaybe<ApiActionDisconnectInput>
}

export type StoreActionsApiActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>
  connect?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsApiActionConnectOrCreateFieldInput>
  >
}

export type StoreActionsApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>
}

export type StoreActionsApiActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>
  update?: InputMaybe<StoreActionsApiActionUpdateConnectionInput>
  connect?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsApiActionDisconnectFieldInput>>
  create?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsApiActionDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsApiActionConnectOrCreateFieldInput>
  >
}

export type StoreActionsCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>
  connect?: InputMaybe<Array<CodeActionConnectInput>>
}

export type StoreActionsCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsCodeActionConnectionWhere>>
  AND?: InputMaybe<Array<StoreActionsCodeActionConnectionWhere>>
  node?: InputMaybe<CodeActionWhere>
  node_NOT?: InputMaybe<CodeActionWhere>
}

export type StoreActionsCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere
  onCreate: StoreActionsCodeActionConnectOrCreateFieldInputOnCreate
}

export type StoreActionsCodeActionConnectOrCreateFieldInputOnCreate = {
  node: CodeActionOnCreateInput
}

export type StoreActionsCodeActionCreateFieldInput = {
  node: CodeActionCreateInput
}

export type StoreActionsCodeActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>
  delete?: InputMaybe<CodeActionDeleteInput>
}

export type StoreActionsCodeActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>
  disconnect?: InputMaybe<CodeActionDisconnectInput>
}

export type StoreActionsCodeActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>
  connect?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCodeActionConnectOrCreateFieldInput>
  >
}

export type StoreActionsCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>
}

export type StoreActionsCodeActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>
  update?: InputMaybe<StoreActionsCodeActionUpdateConnectionInput>
  connect?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsCodeActionDisconnectFieldInput>>
  create?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsCodeActionDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCodeActionConnectOrCreateFieldInput>
  >
}

export type StoreActionsConnectInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>
  ApiAction?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>
}

export type StoreActionsConnectionWhere = {
  CodeAction?: InputMaybe<StoreActionsCodeActionConnectionWhere>
  ApiAction?: InputMaybe<StoreActionsApiActionConnectionWhere>
}

export type StoreActionsConnectOrCreateInput = {
  CodeAction?: InputMaybe<
    Array<StoreActionsCodeActionConnectOrCreateFieldInput>
  >
  ApiAction?: InputMaybe<Array<StoreActionsApiActionConnectOrCreateFieldInput>>
}

export type StoreActionsCreateFieldInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>
  ApiAction?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>
}

export type StoreActionsCreateInput = {
  CodeAction?: InputMaybe<StoreActionsCodeActionFieldInput>
  ApiAction?: InputMaybe<StoreActionsApiActionFieldInput>
}

export type StoreActionsDeleteInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionDeleteFieldInput>>
  ApiAction?: InputMaybe<Array<StoreActionsApiActionDeleteFieldInput>>
}

export type StoreActionsDisconnectInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionDisconnectFieldInput>>
  ApiAction?: InputMaybe<Array<StoreActionsApiActionDisconnectFieldInput>>
}

export type StoreActionsUpdateInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionUpdateFieldInput>>
  ApiAction?: InputMaybe<Array<StoreActionsApiActionUpdateFieldInput>>
}

export type StoreApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreApiAggregateInput>>
  OR?: InputMaybe<Array<StoreApiAggregateInput>>
  node?: InputMaybe<StoreApiNodeAggregationWhereInput>
}

export type StoreApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
}

export type StoreApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type StoreApiConnectionWhere = {
  AND?: InputMaybe<Array<StoreApiConnectionWhere>>
  OR?: InputMaybe<Array<StoreApiConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type StoreApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: StoreApiConnectOrCreateFieldInputOnCreate
}

export type StoreApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type StoreApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type StoreApiDeleteFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type StoreApiDisconnectFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type StoreApiFieldInput = {
  create?: InputMaybe<StoreApiCreateFieldInput>
  connect?: InputMaybe<StoreApiConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreApiConnectOrCreateFieldInput>
}

export type StoreApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreApiNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreApiNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type StoreApiUpdateFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>
  update?: InputMaybe<StoreApiUpdateConnectionInput>
  connect?: InputMaybe<StoreApiConnectFieldInput>
  disconnect?: InputMaybe<StoreApiDisconnectFieldInput>
  create?: InputMaybe<StoreApiCreateFieldInput>
  delete?: InputMaybe<StoreApiDeleteFieldInput>
  connectOrCreate?: InputMaybe<StoreApiConnectOrCreateFieldInput>
}

export type StoreAppAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreAppAggregateInput>>
  OR?: InputMaybe<Array<StoreAppAggregateInput>>
  node?: InputMaybe<StoreAppNodeAggregationWhereInput>
}

export type StoreAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>
  connect?: InputMaybe<AppConnectInput>
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

export type StoreAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: StoreAppConnectOrCreateFieldInputOnCreate
}

export type StoreAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type StoreAppCreateFieldInput = {
  node: AppCreateInput
}

export type StoreAppDeleteFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>
  delete?: InputMaybe<AppDeleteInput>
}

export type StoreAppDisconnectFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>
  disconnect?: InputMaybe<AppDisconnectInput>
}

export type StoreAppFieldInput = {
  create?: InputMaybe<StoreAppCreateFieldInput>
  connect?: InputMaybe<StoreAppConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>
}

export type StoreAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type StoreAppUpdateFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>
  update?: InputMaybe<StoreAppUpdateConnectionInput>
  connect?: InputMaybe<StoreAppConnectFieldInput>
  disconnect?: InputMaybe<StoreAppDisconnectFieldInput>
  create?: InputMaybe<StoreAppCreateFieldInput>
  delete?: InputMaybe<StoreAppDeleteFieldInput>
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>
}

export type StoreConnectInput = {
  app?: InputMaybe<StoreAppConnectFieldInput>
  api?: InputMaybe<StoreApiConnectFieldInput>
  actions?: InputMaybe<StoreActionsConnectInput>
}

export type StoreConnectOrCreateInput = {
  app?: InputMaybe<StoreAppConnectOrCreateFieldInput>
  api?: InputMaybe<StoreApiConnectOrCreateFieldInput>
  actions?: InputMaybe<StoreActionsConnectOrCreateInput>
}

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere
}

export type StoreConnectWhere = {
  node: StoreWhere
}

export type StoreCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  app?: InputMaybe<StoreAppFieldInput>
  api?: InputMaybe<StoreApiFieldInput>
  actions?: InputMaybe<StoreActionsCreateInput>
}

export type StoreDeleteInput = {
  app?: InputMaybe<StoreAppDeleteFieldInput>
  api?: InputMaybe<StoreApiDeleteFieldInput>
  actions?: InputMaybe<StoreActionsDeleteInput>
}

export type StoreDisconnectInput = {
  app?: InputMaybe<StoreAppDisconnectFieldInput>
  api?: InputMaybe<StoreApiDisconnectFieldInput>
  actions?: InputMaybe<StoreActionsDisconnectInput>
}

export type StoreOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type StoreOptions = {
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type StoreRelationInput = {
  app?: InputMaybe<StoreAppCreateFieldInput>
  api?: InputMaybe<StoreApiCreateFieldInput>
  actions?: InputMaybe<StoreActionsCreateFieldInput>
}

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type StoreUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  app?: InputMaybe<StoreAppUpdateFieldInput>
  api?: InputMaybe<StoreApiUpdateFieldInput>
  actions?: InputMaybe<StoreActionsUpdateInput>
}

export type StoreWhere = {
  OR?: InputMaybe<Array<StoreWhere>>
  AND?: InputMaybe<Array<StoreWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  app?: InputMaybe<AppWhere>
  app_NOT?: InputMaybe<AppWhere>
  appAggregate?: InputMaybe<StoreAppAggregateInput>
  api?: InputMaybe<InterfaceTypeWhere>
  api_NOT?: InputMaybe<InterfaceTypeWhere>
  apiAggregate?: InputMaybe<StoreApiAggregateInput>
  appConnection?: InputMaybe<StoreAppConnectionWhere>
  appConnection_NOT?: InputMaybe<StoreAppConnectionWhere>
  apiConnection?: InputMaybe<StoreApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<StoreApiConnectionWhere>
  /** @deprecated Use `actionsConnection_SOME` instead. */
  actionsConnection?: InputMaybe<StoreActionsConnectionWhere>
  /** @deprecated Use `actionsConnection_NONE` instead. */
  actionsConnection_NOT?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>
}

export type TagChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<TagChildrenAggregateInput>>
  OR?: InputMaybe<Array<TagChildrenAggregateInput>>
  node?: InputMaybe<TagChildrenNodeAggregationWhereInput>
}

export type TagChildrenConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>
  connect?: InputMaybe<Array<TagConnectInput>>
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

export type TagChildrenConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagChildrenConnectOrCreateFieldInputOnCreate
}

export type TagChildrenConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type TagChildrenCreateFieldInput = {
  node: TagCreateInput
}

export type TagChildrenDeleteFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>
  delete?: InputMaybe<TagDeleteInput>
}

export type TagChildrenDisconnectFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>
  disconnect?: InputMaybe<TagDisconnectInput>
}

export type TagChildrenFieldInput = {
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagChildrenUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type TagChildrenUpdateFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>
  update?: InputMaybe<TagChildrenUpdateConnectionInput>
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  disconnect?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectInput = {
  parent?: InputMaybe<TagParentConnectFieldInput>
  children?: InputMaybe<Array<TagChildrenConnectFieldInput>>
  owner?: InputMaybe<TagOwnerConnectFieldInput>
}

export type TagConnectOrCreateInput = {
  parent?: InputMaybe<TagParentConnectOrCreateFieldInput>
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
  owner?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
}

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere
}

export type TagConnectWhere = {
  node: TagWhere
}

export type TagCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  parent?: InputMaybe<TagParentFieldInput>
  children?: InputMaybe<TagChildrenFieldInput>
  owner?: InputMaybe<TagOwnerFieldInput>
}

export type TagDeleteInput = {
  parent?: InputMaybe<TagParentDeleteFieldInput>
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
  owner?: InputMaybe<TagOwnerDeleteFieldInput>
}

export type TagDisconnectInput = {
  parent?: InputMaybe<TagParentDisconnectFieldInput>
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
  owner?: InputMaybe<TagOwnerDisconnectFieldInput>
}

export type TagOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type TagOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<TagOwnerAggregateInput>>
  OR?: InputMaybe<Array<TagOwnerAggregateInput>>
  node?: InputMaybe<TagOwnerNodeAggregationWhereInput>
}

export type TagOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<UserConnectInput>
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

export type TagOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: TagOwnerConnectOrCreateFieldInputOnCreate
}

export type TagOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type TagOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type TagOwnerDeleteFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type TagOwnerDisconnectFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type TagOwnerFieldInput = {
  create?: InputMaybe<TagOwnerCreateFieldInput>
  connect?: InputMaybe<TagOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
}

export type TagOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type TagOwnerUpdateFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>
  update?: InputMaybe<TagOwnerUpdateConnectionInput>
  connect?: InputMaybe<TagOwnerConnectFieldInput>
  disconnect?: InputMaybe<TagOwnerDisconnectFieldInput>
  create?: InputMaybe<TagOwnerCreateFieldInput>
  delete?: InputMaybe<TagOwnerDeleteFieldInput>
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>
}

export type TagParentAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<TagParentAggregateInput>>
  OR?: InputMaybe<Array<TagParentAggregateInput>>
  node?: InputMaybe<TagParentNodeAggregationWhereInput>
}

export type TagParentConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>
  connect?: InputMaybe<TagConnectInput>
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

export type TagParentConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagParentConnectOrCreateFieldInputOnCreate
}

export type TagParentConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type TagParentCreateFieldInput = {
  node: TagCreateInput
}

export type TagParentDeleteFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>
  delete?: InputMaybe<TagDeleteInput>
}

export type TagParentDisconnectFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>
  disconnect?: InputMaybe<TagDisconnectInput>
}

export type TagParentFieldInput = {
  create?: InputMaybe<TagParentCreateFieldInput>
  connect?: InputMaybe<TagParentConnectFieldInput>
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>
}

export type TagParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type TagParentUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type TagParentUpdateFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>
  update?: InputMaybe<TagParentUpdateConnectionInput>
  connect?: InputMaybe<TagParentConnectFieldInput>
  disconnect?: InputMaybe<TagParentDisconnectFieldInput>
  create?: InputMaybe<TagParentCreateFieldInput>
  delete?: InputMaybe<TagParentDeleteFieldInput>
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>
}

export type TagRelationInput = {
  parent?: InputMaybe<TagParentCreateFieldInput>
  children?: InputMaybe<Array<TagChildrenCreateFieldInput>>
  owner?: InputMaybe<TagOwnerCreateFieldInput>
}

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  isRoot?: InputMaybe<SortDirection>
}

export type TagUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type TagUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<TagParentUpdateFieldInput>
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>
  owner?: InputMaybe<TagOwnerUpdateFieldInput>
}

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>
  AND?: InputMaybe<Array<TagWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<TagWhere>
  parent_NOT?: InputMaybe<TagWhere>
  parentAggregate?: InputMaybe<TagParentAggregateInput>
  /** @deprecated Use `children_SOME` instead. */
  children?: InputMaybe<TagWhere>
  /** @deprecated Use `children_NONE` instead. */
  children_NOT?: InputMaybe<TagWhere>
  childrenAggregate?: InputMaybe<TagChildrenAggregateInput>
  /** Return Tags where all of the related Tags match this filter */
  children_ALL?: InputMaybe<TagWhere>
  /** Return Tags where none of the related Tags match this filter */
  children_NONE?: InputMaybe<TagWhere>
  /** Return Tags where one of the related Tags match this filter */
  children_SINGLE?: InputMaybe<TagWhere>
  /** Return Tags where some of the related Tags match this filter */
  children_SOME?: InputMaybe<TagWhere>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<TagOwnerAggregateInput>
  parentConnection?: InputMaybe<TagParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>
  /** @deprecated Use `childrenConnection_SOME` instead. */
  childrenConnection?: InputMaybe<TagChildrenConnectionWhere>
  /** @deprecated Use `childrenConnection_NONE` instead. */
  childrenConnection_NOT?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_ALL?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<TagChildrenConnectionWhere>
  ownerConnection?: InputMaybe<TagOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TagOwnerConnectionWhere>
}

export type TypeReferenceCreateInput = {
  name: Scalars['String']
  label: Scalars['String']
}

export type TypeReferenceOptions = {
  /** Specify one or more TypeReferenceSort objects to sort TypeReferences by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TypeReferenceSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort TypeReferences by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeReferenceSort object. */
export type TypeReferenceSort = {
  name?: InputMaybe<SortDirection>
  label?: InputMaybe<SortDirection>
}

export type TypeReferenceUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  label?: InputMaybe<Scalars['String']>
}

export type TypeReferenceWhere = {
  OR?: InputMaybe<Array<TypeReferenceWhere>>
  AND?: InputMaybe<Array<TypeReferenceWhere>>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  label?: InputMaybe<Scalars['String']>
  label_NOT?: InputMaybe<Scalars['String']>
  label_IN?: InputMaybe<Array<Scalars['String']>>
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  label_CONTAINS?: InputMaybe<Scalars['String']>
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  label_STARTS_WITH?: InputMaybe<Scalars['String']>
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  label_ENDS_WITH?: InputMaybe<Scalars['String']>
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
}

export type UnionTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeConnectInput>
}

export type UnionTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeConnectOrCreateInput>
}

export type UnionTypeConnectOrCreateWhere = {
  node: UnionTypeUniqueWhere
}

export type UnionTypeConnectWhere = {
  node: UnionTypeWhere
}

export type UnionTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  kind?: TypeKind
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeCreateInput>
}

export type UnionTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeDeleteInput>
}

export type UnionTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeDisconnectInput>
}

export type UnionTypeOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type UnionTypeOptions = {
  /** Specify one or more UnionTypeSort objects to sort UnionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UnionTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type UnionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>
  node?: InputMaybe<UnionTypeOwnerNodeAggregationWhereInput>
}

export type UnionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  auth0Id_EQUAL?: InputMaybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  auth0Id_GT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  auth0Id_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  auth0Id_LT?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  auth0Id_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  email_EQUAL?: InputMaybe<Scalars['String']>
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  email_GT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  email_GTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  email_LT?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  email_LTE?: InputMaybe<Scalars['Int']>
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  username_EQUAL?: InputMaybe<Scalars['String']>
  username_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  username_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  username_GT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  username_LONGEST_GT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  username_GTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  username_LT?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  username_LONGEST_LT?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  username_LTE?: InputMaybe<Scalars['Int']>
  username_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  username_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  username_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UnionTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeCreateFieldInput>
}

/** Fields to sort UnionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnionTypeSort object. */
export type UnionTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  kind?: InputMaybe<SortDirection>
}

export type UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput = {
  where?: InputMaybe<ActionTypeConnectWhere>
  connect?: InputMaybe<Array<ActionTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeActionTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>>
  node?: InputMaybe<ActionTypeWhere>
  node_NOT?: InputMaybe<ActionTypeWhere>
}

export type UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput = {
  where: ActionTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInputOnCreate =
  {
    node: ActionTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput = {
  node: ActionTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>
  delete?: InputMaybe<ActionTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>
  disconnect?: InputMaybe<ActionTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeActionTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeActionTypeUpdateConnectionInput = {
  node?: InputMaybe<ActionTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeActionTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput = {
  where?: InputMaybe<AppTypeConnectWhere>
  connect?: InputMaybe<Array<AppTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeAppTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>>
  node?: InputMaybe<AppTypeWhere>
  node_NOT?: InputMaybe<AppTypeWhere>
}

export type UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput = {
  where: AppTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInputOnCreate =
  {
    node: AppTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput = {
  node: AppTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>
  delete?: InputMaybe<AppTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>
  disconnect?: InputMaybe<AppTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeAppTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeAppTypeUpdateConnectionInput = {
  node?: InputMaybe<AppTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeAppTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeUpdateConnectionInput>
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput>
  >
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput = {
  where?: InputMaybe<ArrayTypeConnectWhere>
  connect?: InputMaybe<Array<ArrayTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>>
  node?: InputMaybe<ArrayTypeWhere>
  node_NOT?: InputMaybe<ArrayTypeWhere>
}

export type UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput = {
  where: ArrayTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInputOnCreate =
  {
    node: ArrayTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput = {
  node: ArrayTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>
  delete?: InputMaybe<ArrayTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeArrayTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeArrayTypeUpdateConnectionInput = {
  node?: InputMaybe<ArrayTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeArrayTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput>
  >
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput = {
  where?: InputMaybe<CodeMirrorTypeConnectWhere>
  connect?: InputMaybe<Array<CodeMirrorTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>>
  AND?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>
  >
  node?: InputMaybe<CodeMirrorTypeWhere>
  node_NOT?: InputMaybe<CodeMirrorTypeWhere>
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput = {
  where: CodeMirrorTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate =
  {
    node: CodeMirrorTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput = {
  node: CodeMirrorTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateConnectionInput = {
  node?: InputMaybe<CodeMirrorTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeConnectInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>
  >
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeConnectionWhere = {
  PrimitiveType?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>
  ArrayType?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>
  UnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>
  InterfaceType?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>
  ElementType?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>
  RenderPropsType?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  ReactNodeType?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>
  EnumType?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>
  LambdaType?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>
  PageType?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>
  AppType?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>
  ActionType?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>
  CodeMirrorType?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>
}

export type UnionTypeTypesOfUnionTypeConnectOrCreateInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>
  >
  AppType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>
  >
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeCreateFieldInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeCreateFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>
  >
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeCreateInput = {
  PrimitiveType?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeFieldInput>
  ArrayType?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeFieldInput>
  UnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeFieldInput>
  InterfaceType?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeFieldInput>
  ElementType?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeFieldInput>
  RenderPropsType?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeFieldInput>
  ReactNodeType?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeFieldInput>
  EnumType?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeFieldInput>
  LambdaType?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeFieldInput>
  PageType?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeFieldInput>
  AppType?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeFieldInput>
  ActionType?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeFieldInput>
  CodeMirrorType?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeFieldInput>
}

export type UnionTypeTypesOfUnionTypeDeleteInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeDeleteFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput>
  >
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput>>
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeDisconnectInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeDisconnectFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput>
  >
  AppType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput>
  >
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput = {
  where?: InputMaybe<ElementTypeConnectWhere>
  connect?: InputMaybe<Array<ElementTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeElementTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>>
  node?: InputMaybe<ElementTypeWhere>
  node_NOT?: InputMaybe<ElementTypeWhere>
}

export type UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput = {
  where: ElementTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInputOnCreate =
  {
    node: ElementTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput = {
  node: ElementTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>
  delete?: InputMaybe<ElementTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>
  disconnect?: InputMaybe<ElementTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeElementTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeElementTypeUpdateConnectionInput = {
  node?: InputMaybe<ElementTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeElementTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>
  connect?: InputMaybe<Array<EnumTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>>
  node?: InputMaybe<EnumTypeWhere>
  node_NOT?: InputMaybe<EnumTypeWhere>
}

export type UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInputOnCreate =
  {
    node: EnumTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>
  delete?: InputMaybe<EnumTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>
  disconnect?: InputMaybe<EnumTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeEnumTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeEnumTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput>
  >
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<Array<InterfaceTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInputOnCreate =
  {
    node: InterfaceTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeInterfaceTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput = {
  where?: InputMaybe<LambdaTypeConnectWhere>
  connect?: InputMaybe<Array<LambdaTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>>
  node?: InputMaybe<LambdaTypeWhere>
  node_NOT?: InputMaybe<LambdaTypeWhere>
}

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput = {
  where: LambdaTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInputOnCreate =
  {
    node: LambdaTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput = {
  node: LambdaTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>
  delete?: InputMaybe<LambdaTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeLambdaTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeLambdaTypeUpdateConnectionInput = {
  node?: InputMaybe<LambdaTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeLambdaTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypePageTypeConnectFieldInput = {
  where?: InputMaybe<PageTypeConnectWhere>
  connect?: InputMaybe<Array<PageTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypePageTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>>
  node?: InputMaybe<PageTypeWhere>
  node_NOT?: InputMaybe<PageTypeWhere>
}

export type UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput = {
  where: PageTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInputOnCreate =
  {
    node: PageTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypePageTypeCreateFieldInput = {
  node: PageTypeCreateInput
}

export type UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>
  delete?: InputMaybe<PageTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>
  disconnect?: InputMaybe<PageTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypePageTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypePageTypeUpdateConnectionInput = {
  node?: InputMaybe<PageTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypePageTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput>
  >
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput = {
  where?: InputMaybe<PrimitiveTypeConnectWhere>
  connect?: InputMaybe<Array<PrimitiveTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>>
  node?: InputMaybe<PrimitiveTypeWhere>
  node_NOT?: InputMaybe<PrimitiveTypeWhere>
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput = {
  where: PrimitiveTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInputOnCreate =
  {
    node: PrimitiveTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput = {
  node: PrimitiveTypeCreateInput
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeUpdateConnectionInput = {
  node?: InputMaybe<PrimitiveTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypePrimitiveTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput = {
  where?: InputMaybe<ReactNodeTypeConnectWhere>
  connect?: InputMaybe<Array<ReactNodeTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>>
  node?: InputMaybe<ReactNodeTypeWhere>
  node_NOT?: InputMaybe<ReactNodeTypeWhere>
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput = {
  where: ReactNodeTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInputOnCreate =
  {
    node: ReactNodeTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput = {
  node: ReactNodeTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>
  delete?: InputMaybe<ReactNodeTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeUpdateConnectionInput = {
  node?: InputMaybe<ReactNodeTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeReactNodeTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeConnectFieldInput = {
  where?: InputMaybe<RenderPropsTypeConnectWhere>
  connect?: InputMaybe<Array<RenderPropsTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere = {
  OR?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  >
  AND?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  >
  node?: InputMaybe<RenderPropsTypeWhere>
  node_NOT?: InputMaybe<RenderPropsTypeWhere>
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInput =
  {
    where: RenderPropsTypeConnectOrCreateWhere
    onCreate: UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInputOnCreate
  }

export type UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInputOnCreate =
  {
    node: RenderPropsTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeRenderPropsTypeCreateFieldInput = {
  node: RenderPropsTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeFieldInput = {
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeCreateFieldInput>
  >
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeUpdateConnectionInput = {
  node?: InputMaybe<RenderPropsTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeRenderPropsTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropsTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeDisconnectFieldInput>
  >
  create?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeCreateFieldInput>
  >
  delete?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeDeleteFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput = {
  where?: InputMaybe<UnionTypeConnectWhere>
  connect?: InputMaybe<Array<UnionTypeConnectInput>>
}

export type UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>>
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>>
  node?: InputMaybe<UnionTypeWhere>
  node_NOT?: InputMaybe<UnionTypeWhere>
}

export type UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput = {
  where: UnionTypeConnectOrCreateWhere
  onCreate: UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInputOnCreate
}

export type UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInputOnCreate =
  {
    node: UnionTypeOnCreateInput
  }

export type UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput = {
  node: UnionTypeCreateInput
}

export type UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>
  delete?: InputMaybe<UnionTypeDeleteInput>
}

export type UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>
  disconnect?: InputMaybe<UnionTypeDisconnectInput>
}

export type UnionTypeTypesOfUnionTypeUnionTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>
  >
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeUnionTypeUpdateConnectionInput = {
  node?: InputMaybe<UnionTypeUpdateInput>
}

export type UnionTypeTypesOfUnionTypeUnionTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>
  update?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeUpdateConnectionInput>
  connect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>
  >
  disconnect?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput>
  >
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>>
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>
  >
}

export type UnionTypeTypesOfUnionTypeUpdateInput = {
  PrimitiveType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePrimitiveTypeUpdateFieldInput>
  >
  ArrayType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeArrayTypeUpdateFieldInput>
  >
  UnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUnionTypeUpdateFieldInput>
  >
  InterfaceType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeInterfaceTypeUpdateFieldInput>
  >
  ElementType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeElementTypeUpdateFieldInput>
  >
  RenderPropsType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeRenderPropsTypeUpdateFieldInput>
  >
  ReactNodeType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeReactNodeTypeUpdateFieldInput>
  >
  EnumType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeEnumTypeUpdateFieldInput>
  >
  LambdaType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeLambdaTypeUpdateFieldInput>
  >
  PageType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypePageTypeUpdateFieldInput>
  >
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeUpdateFieldInput>>
  ActionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeActionTypeUpdateFieldInput>
  >
  CodeMirrorType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateFieldInput>
  >
}

export type UnionTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type UnionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUpdateInput>
}

export type UnionTypeWhere = {
  OR?: InputMaybe<Array<UnionTypeWhere>>
  AND?: InputMaybe<Array<UnionTypeWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  name_NOT?: InputMaybe<Scalars['String']>
  name_IN?: InputMaybe<Array<Scalars['String']>>
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  name_CONTAINS?: InputMaybe<Scalars['String']>
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  name_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  name_ENDS_WITH?: InputMaybe<Scalars['String']>
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  kind?: InputMaybe<TypeKind>
  kind_NOT?: InputMaybe<TypeKind>
  kind_IN?: InputMaybe<Array<TypeKind>>
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>
  /** @deprecated Use `typesOfUnionTypeConnection_SOME` instead. */
  typesOfUnionTypeConnection?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  /** @deprecated Use `typesOfUnionTypeConnection_NONE` instead. */
  typesOfUnionTypeConnection_NOT?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UserAppsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UserAppsAggregateInput>>
  OR?: InputMaybe<Array<UserAppsAggregateInput>>
  node?: InputMaybe<UserAppsNodeAggregationWhereInput>
}

export type UserAppsConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>
  connect?: InputMaybe<Array<AppConnectInput>>
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

export type UserAppsConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate
}

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput
}

export type UserAppsCreateFieldInput = {
  node: AppCreateInput
}

export type UserAppsDeleteFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>
  delete?: InputMaybe<AppDeleteInput>
}

export type UserAppsDisconnectFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>
  disconnect?: InputMaybe<AppDisconnectInput>
}

export type UserAppsFieldInput = {
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserAppsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  slug_EQUAL?: InputMaybe<Scalars['String']>
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  slug_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  slug_GT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  slug_GTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  slug_LT?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LT?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  slug_LTE?: InputMaybe<Scalars['Int']>
  slug_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  slug_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  slug_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserAppsUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>
}

export type UserAppsUpdateFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>
  update?: InputMaybe<UserAppsUpdateConnectionInput>
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>
  disconnect?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>
  delete?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserComponentsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UserComponentsAggregateInput>>
  OR?: InputMaybe<Array<UserComponentsAggregateInput>>
  node?: InputMaybe<UserComponentsNodeAggregationWhereInput>
}

export type UserComponentsConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>
  connect?: InputMaybe<Array<ComponentConnectInput>>
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

export type UserComponentsConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: UserComponentsConnectOrCreateFieldInputOnCreate
}

export type UserComponentsConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type UserComponentsCreateFieldInput = {
  node: ComponentCreateInput
}

export type UserComponentsDeleteFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type UserComponentsDisconnectFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>
  disconnect?: InputMaybe<ComponentDisconnectInput>
}

export type UserComponentsFieldInput = {
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
}

export type UserComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type UserComponentsUpdateFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>
  update?: InputMaybe<UserComponentsUpdateConnectionInput>
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  disconnect?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>
  delete?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
}

export type UserConnectInput = {
  types?: InputMaybe<Array<UserTypesConnectFieldInput>>
  apps?: InputMaybe<Array<UserAppsConnectFieldInput>>
  elements?: InputMaybe<Array<UserElementsConnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsConnectFieldInput>>
  tags?: InputMaybe<Array<UserTagsConnectFieldInput>>
}

export type UserConnectOrCreateInput = {
  types?: InputMaybe<Array<UserTypesConnectOrCreateFieldInput>>
  apps?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  elements?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>
  components?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
  tags?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>
}

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere
}

export type UserConnectWhere = {
  node: UserWhere
}

export type UserCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  roles: Array<Scalars['String']>
  types?: InputMaybe<UserTypesFieldInput>
  apps?: InputMaybe<UserAppsFieldInput>
  elements?: InputMaybe<UserElementsFieldInput>
  components?: InputMaybe<UserComponentsFieldInput>
  tags?: InputMaybe<UserTagsFieldInput>
}

export type UserDeleteInput = {
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  elements?: InputMaybe<Array<UserElementsDeleteFieldInput>>
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
  tags?: InputMaybe<Array<UserTagsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  elements?: InputMaybe<Array<UserElementsDisconnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
  tags?: InputMaybe<Array<UserTagsDisconnectFieldInput>>
}

export type UserElementsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UserElementsAggregateInput>>
  OR?: InputMaybe<Array<UserElementsAggregateInput>>
  node?: InputMaybe<UserElementsNodeAggregationWhereInput>
}

export type UserElementsConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<Array<ElementConnectInput>>
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

export type UserElementsConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: UserElementsConnectOrCreateFieldInputOnCreate
}

export type UserElementsConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type UserElementsCreateFieldInput = {
  node: ElementCreateInput
}

export type UserElementsDeleteFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type UserElementsDisconnectFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type UserElementsFieldInput = {
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>
}

export type UserElementsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_EQUAL?: InputMaybe<Scalars['String']>
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  customCss_GT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  customCss_GTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  customCss_LT?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  customCss_LTE?: InputMaybe<Scalars['Int']>
  customCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  customCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  customCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_EQUAL?: InputMaybe<Scalars['String']>
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  guiCss_GT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  guiCss_GTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  guiCss_LT?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  guiCss_LTE?: InputMaybe<Scalars['Int']>
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  guiCss_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_EQUAL?: InputMaybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  propTransformationJs_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  propTransformationJs_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  propTransformationJs_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: InputMaybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  renderIfPropKey_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  preRenderActionId_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  preRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  preRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_EQUAL?: InputMaybe<Scalars['String']>
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  postRenderActionId_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  postRenderActionId_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  postRenderActionId_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserElementsUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type UserElementsUpdateFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>
  update?: InputMaybe<UserElementsUpdateConnectionInput>
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>
  disconnect?: InputMaybe<Array<UserElementsDisconnectFieldInput>>
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>
  delete?: InputMaybe<Array<UserElementsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>
}

export type UserOnCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  roles: Array<Scalars['String']>
}

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type UserRelationInput = {
  types?: InputMaybe<Array<UserTypesCreateFieldInput>>
  apps?: InputMaybe<Array<UserAppsCreateFieldInput>>
  elements?: InputMaybe<Array<UserElementsCreateFieldInput>>
  components?: InputMaybe<Array<UserComponentsCreateFieldInput>>
  tags?: InputMaybe<Array<UserTagsCreateFieldInput>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>
  auth0Id?: InputMaybe<SortDirection>
  email?: InputMaybe<SortDirection>
  username?: InputMaybe<SortDirection>
}

export type UserTagsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UserTagsAggregateInput>>
  OR?: InputMaybe<Array<UserTagsAggregateInput>>
  node?: InputMaybe<UserTagsNodeAggregationWhereInput>
}

export type UserTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>
  connect?: InputMaybe<Array<TagConnectInput>>
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

export type UserTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: UserTagsConnectOrCreateFieldInputOnCreate
}

export type UserTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput
}

export type UserTagsCreateFieldInput = {
  node: TagCreateInput
}

export type UserTagsDeleteFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>
  delete?: InputMaybe<TagDeleteInput>
}

export type UserTagsDisconnectFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>
  disconnect?: InputMaybe<TagDisconnectInput>
}

export type UserTagsFieldInput = {
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>
}

export type UserTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>
}

export type UserTagsUpdateFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>
  update?: InputMaybe<UserTagsUpdateConnectionInput>
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>
  disconnect?: InputMaybe<Array<UserTagsDisconnectFieldInput>>
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>
  delete?: InputMaybe<Array<UserTagsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>
}

export type UserTypesAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<UserTypesAggregateInput>>
  OR?: InputMaybe<Array<UserTypesAggregateInput>>
  node?: InputMaybe<UserTypesNodeAggregationWhereInput>
}

export type UserTypesConnectFieldInput = {
  where?: InputMaybe<BaseTypeConnectWhere>
  connect?: InputMaybe<Array<BaseTypeConnectInput>>
}

export type UserTypesConnectionSort = {
  node?: InputMaybe<BaseTypeSort>
}

export type UserTypesConnectionWhere = {
  AND?: InputMaybe<Array<UserTypesConnectionWhere>>
  OR?: InputMaybe<Array<UserTypesConnectionWhere>>
  node?: InputMaybe<BaseTypeWhere>
  node_NOT?: InputMaybe<BaseTypeWhere>
}

export type UserTypesConnectOrCreateFieldInput = {
  where: BaseTypeConnectOrCreateWhere
  onCreate: UserTypesConnectOrCreateFieldInputOnCreate
}

export type UserTypesConnectOrCreateFieldInputOnCreate = {
  node: BaseTypeOnCreateInput
}

export type UserTypesCreateFieldInput = {
  node: BaseTypeCreateInput
}

export type UserTypesDeleteFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>
  delete?: InputMaybe<BaseTypeDeleteInput>
}

export type UserTypesDisconnectFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>
  disconnect?: InputMaybe<BaseTypeDisconnectInput>
}

export type UserTypesFieldInput = {
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTypesConnectOrCreateFieldInput>>
}

export type UserTypesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTypesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<UserTypesNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  name_EQUAL?: InputMaybe<Scalars['String']>
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  name_GT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  name_GTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  name_LT?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  name_LTE?: InputMaybe<Scalars['Int']>
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type UserTypesUpdateConnectionInput = {
  node?: InputMaybe<BaseTypeUpdateInput>
}

export type UserTypesUpdateFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>
  update?: InputMaybe<UserTypesUpdateConnectionInput>
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>
  disconnect?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>
  delete?: InputMaybe<Array<UserTypesDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<UserTypesConnectOrCreateFieldInput>>
}

export type UserUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  auth0Id?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type UserUpdateInput = {
  auth0Id?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
  roles?: InputMaybe<Array<Scalars['String']>>
  roles_POP?: InputMaybe<Scalars['Int']>
  roles_PUSH?: InputMaybe<Array<Scalars['String']>>
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>
  elements?: InputMaybe<Array<UserElementsUpdateFieldInput>>
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>
  tags?: InputMaybe<Array<UserTagsUpdateFieldInput>>
}

export type UserWhere = {
  OR?: InputMaybe<Array<UserWhere>>
  AND?: InputMaybe<Array<UserWhere>>
  id?: InputMaybe<Scalars['ID']>
  id_NOT?: InputMaybe<Scalars['ID']>
  id_IN?: InputMaybe<Array<Scalars['ID']>>
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>
  id_CONTAINS?: InputMaybe<Scalars['ID']>
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>
  auth0Id?: InputMaybe<Scalars['String']>
  auth0Id_NOT?: InputMaybe<Scalars['String']>
  auth0Id_IN?: InputMaybe<Array<Scalars['String']>>
  auth0Id_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  auth0Id_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  auth0Id_STARTS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_ENDS_WITH?: InputMaybe<Scalars['String']>
  auth0Id_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  email_NOT?: InputMaybe<Scalars['String']>
  email_IN?: InputMaybe<Array<Scalars['String']>>
  email_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  email_CONTAINS?: InputMaybe<Scalars['String']>
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  email_STARTS_WITH?: InputMaybe<Scalars['String']>
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  email_ENDS_WITH?: InputMaybe<Scalars['String']>
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
  username_NOT?: InputMaybe<Scalars['String']>
  username_IN?: InputMaybe<Array<Scalars['String']>>
  username_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  username_CONTAINS?: InputMaybe<Scalars['String']>
  username_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  username_STARTS_WITH?: InputMaybe<Scalars['String']>
  username_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  username_ENDS_WITH?: InputMaybe<Scalars['String']>
  username_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  roles?: InputMaybe<Array<Scalars['String']>>
  roles_NOT?: InputMaybe<Array<Scalars['String']>>
  roles_INCLUDES?: InputMaybe<Scalars['String']>
  roles_NOT_INCLUDES?: InputMaybe<Scalars['String']>
  /** @deprecated Use `types_SOME` instead. */
  types?: InputMaybe<BaseTypeWhere>
  /** @deprecated Use `types_NONE` instead. */
  types_NOT?: InputMaybe<BaseTypeWhere>
  typesAggregate?: InputMaybe<UserTypesAggregateInput>
  /** Return Users where all of the related BaseTypes match this filter */
  types_ALL?: InputMaybe<BaseTypeWhere>
  /** Return Users where none of the related BaseTypes match this filter */
  types_NONE?: InputMaybe<BaseTypeWhere>
  /** Return Users where one of the related BaseTypes match this filter */
  types_SINGLE?: InputMaybe<BaseTypeWhere>
  /** Return Users where some of the related BaseTypes match this filter */
  types_SOME?: InputMaybe<BaseTypeWhere>
  /** @deprecated Use `apps_SOME` instead. */
  apps?: InputMaybe<AppWhere>
  /** @deprecated Use `apps_NONE` instead. */
  apps_NOT?: InputMaybe<AppWhere>
  appsAggregate?: InputMaybe<UserAppsAggregateInput>
  /** Return Users where all of the related Apps match this filter */
  apps_ALL?: InputMaybe<AppWhere>
  /** Return Users where none of the related Apps match this filter */
  apps_NONE?: InputMaybe<AppWhere>
  /** Return Users where one of the related Apps match this filter */
  apps_SINGLE?: InputMaybe<AppWhere>
  /** Return Users where some of the related Apps match this filter */
  apps_SOME?: InputMaybe<AppWhere>
  /** @deprecated Use `elements_SOME` instead. */
  elements?: InputMaybe<ElementWhere>
  /** @deprecated Use `elements_NONE` instead. */
  elements_NOT?: InputMaybe<ElementWhere>
  elementsAggregate?: InputMaybe<UserElementsAggregateInput>
  /** Return Users where all of the related Elements match this filter */
  elements_ALL?: InputMaybe<ElementWhere>
  /** Return Users where none of the related Elements match this filter */
  elements_NONE?: InputMaybe<ElementWhere>
  /** Return Users where one of the related Elements match this filter */
  elements_SINGLE?: InputMaybe<ElementWhere>
  /** Return Users where some of the related Elements match this filter */
  elements_SOME?: InputMaybe<ElementWhere>
  /** @deprecated Use `components_SOME` instead. */
  components?: InputMaybe<ComponentWhere>
  /** @deprecated Use `components_NONE` instead. */
  components_NOT?: InputMaybe<ComponentWhere>
  componentsAggregate?: InputMaybe<UserComponentsAggregateInput>
  /** Return Users where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>
  /** Return Users where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>
  /** Return Users where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>
  /** Return Users where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>
  /** @deprecated Use `tags_SOME` instead. */
  tags?: InputMaybe<TagWhere>
  /** @deprecated Use `tags_NONE` instead. */
  tags_NOT?: InputMaybe<TagWhere>
  tagsAggregate?: InputMaybe<UserTagsAggregateInput>
  /** Return Users where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>
  /** Return Users where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>
  /** Return Users where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>
  /** Return Users where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>
  /** @deprecated Use `typesConnection_SOME` instead. */
  typesConnection?: InputMaybe<UserTypesConnectionWhere>
  /** @deprecated Use `typesConnection_NONE` instead. */
  typesConnection_NOT?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>
  /** @deprecated Use `appsConnection_SOME` instead. */
  appsConnection?: InputMaybe<UserAppsConnectionWhere>
  /** @deprecated Use `appsConnection_NONE` instead. */
  appsConnection_NOT?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_ALL?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_NONE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SINGLE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SOME?: InputMaybe<UserAppsConnectionWhere>
  /** @deprecated Use `elementsConnection_SOME` instead. */
  elementsConnection?: InputMaybe<UserElementsConnectionWhere>
  /** @deprecated Use `elementsConnection_NONE` instead. */
  elementsConnection_NOT?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_ALL?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_NONE?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_SINGLE?: InputMaybe<UserElementsConnectionWhere>
  elementsConnection_SOME?: InputMaybe<UserElementsConnectionWhere>
  /** @deprecated Use `componentsConnection_SOME` instead. */
  componentsConnection?: InputMaybe<UserComponentsConnectionWhere>
  /** @deprecated Use `componentsConnection_NONE` instead. */
  componentsConnection_NOT?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_ALL?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_NONE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SINGLE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SOME?: InputMaybe<UserComponentsConnectionWhere>
  /** @deprecated Use `tagsConnection_SOME` instead. */
  tagsConnection?: InputMaybe<UserTagsConnectionWhere>
  /** @deprecated Use `tagsConnection_NONE` instead. */
  tagsConnection_NOT?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_ALL?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_NONE?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_SINGLE?: InputMaybe<UserTagsConnectionWhere>
  tagsConnection_SOME?: InputMaybe<UserTagsConnectionWhere>
}

export type VercelDomainConfigCreateInput = {
  misconfigured: Scalars['Boolean']
}

export type VercelDomainConfigOptions = {
  /** Specify one or more VercelDomainConfigSort objects to sort VercelDomainConfigs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelDomainConfigSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort VercelDomainConfigs by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelDomainConfigSort object. */
export type VercelDomainConfigSort = {
  misconfigured?: InputMaybe<SortDirection>
}

export type VercelDomainConfigUpdateInput = {
  misconfigured?: InputMaybe<Scalars['Boolean']>
}

export type VercelDomainConfigWhere = {
  OR?: InputMaybe<Array<VercelDomainConfigWhere>>
  AND?: InputMaybe<Array<VercelDomainConfigWhere>>
  misconfigured?: InputMaybe<Scalars['Boolean']>
  misconfigured_NOT?: InputMaybe<Scalars['Boolean']>
}

export type VercelProjectDomainCreateInput = {
  verified: Scalars['Boolean']
}

export type VercelProjectDomainOptions = {
  /** Specify one or more VercelProjectDomainSort objects to sort VercelProjectDomains by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelProjectDomainSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort VercelProjectDomains by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelProjectDomainSort object. */
export type VercelProjectDomainSort = {
  verified?: InputMaybe<SortDirection>
}

export type VercelProjectDomainUpdateInput = {
  verified?: InputMaybe<Scalars['Boolean']>
}

export type VercelProjectDomainWhere = {
  OR?: InputMaybe<Array<VercelProjectDomainWhere>>
  AND?: InputMaybe<Array<VercelProjectDomainWhere>>
  verified?: InputMaybe<Scalars['Boolean']>
  verified_NOT?: InputMaybe<Scalars['Boolean']>
}

export type WithOwnerOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<UserConnectInput>
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

export type WithOwnerOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: WithOwnerOwnerConnectOrCreateFieldInputOnCreate
}

export type WithOwnerOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type WithOwnerOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type WithOwnerOwnerDeleteFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type WithOwnerOwnerDisconnectFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type WithOwnerOwnerFieldInput = {
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
}

export type WithOwnerOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type WithOwnerOwnerUpdateFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>
  update?: InputMaybe<WithOwnerOwnerUpdateConnectionInput>
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>
  disconnect?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>
  delete?: InputMaybe<WithOwnerOwnerDeleteFieldInput>
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>
}

export interface ResetDatabaseMutationResponseAggregateSelectionInput {
  count?: boolean
}

export declare class ResetDatabaseMutationResponseModel {
  public find(args?: {
    where?: ResetDatabaseMutationResponseWhere

    options?: ResetDatabaseMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ResetDatabaseMutationResponse[]>
  public create(args: {
    input: ResetDatabaseMutationResponseCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateResetDatabaseMutationResponsesMutationResponse>
  public update(args: {
    where?: ResetDatabaseMutationResponseWhere
    update?: ResetDatabaseMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateResetDatabaseMutationResponsesMutationResponse>
  public delete(args: {
    where?: ResetDatabaseMutationResponseWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ResetDatabaseMutationResponseWhere

    aggregate: ResetDatabaseMutationResponseAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ResetDatabaseMutationResponseAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface UserAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  auth0Id?: StringAggregateInputNonNullable
  email?: StringAggregateInputNonNullable
  username?: StringAggregateInputNonNullable
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere

    options?: UserOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<User[]>
  public create(args: {
    input: UserCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateUsersMutationResponse>
  public update(args: {
    where?: UserWhere
    update?: UserUpdateInput
    connect?: UserConnectInput
    disconnect?: UserDisconnectInput
    create?: UserCreateInput
    connectOrCreate?: UserConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateUsersMutationResponse>
  public delete(args: {
    where?: UserWhere
    delete?: UserDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: UserWhere

    aggregate: UserAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<UserAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface AppAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  slug?: StringAggregateInputNonNullable
}

export declare class AppModel {
  public find(args?: {
    where?: AppWhere

    options?: AppOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<App[]>
  public create(args: {
    input: AppCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateAppsMutationResponse>
  public update(args: {
    where?: AppWhere
    update?: AppUpdateInput
    connect?: AppConnectInput
    disconnect?: AppDisconnectInput
    create?: AppCreateInput
    connectOrCreate?: AppConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateAppsMutationResponse>
  public delete(args: {
    where?: AppWhere
    delete?: AppDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AppWhere

    aggregate: AppAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AppAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface FieldAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  key?: StringAggregateInputNonNullable
  name?: StringAggregateInputNullable
  description?: StringAggregateInputNullable
  validationRules?: StringAggregateInputNullable
  defaultValues?: StringAggregateInputNullable
}

export declare class FieldModel {
  public find(args?: {
    where?: FieldWhere

    options?: FieldOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Field[]>
  public create(args: {
    input: FieldCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateFieldsMutationResponse>
  public update(args: {
    where?: FieldWhere
    update?: FieldUpdateInput
    connect?: FieldConnectInput
    disconnect?: FieldDisconnectInput
    create?: FieldCreateInput
    connectOrCreate?: FieldConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateFieldsMutationResponse>
  public delete(args: {
    where?: FieldWhere
    delete?: FieldDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: FieldWhere

    aggregate: FieldAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<FieldAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface AtomAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  icon?: StringAggregateInputNullable
}

export declare class AtomModel {
  public find(args?: {
    where?: AtomWhere

    options?: AtomOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Atom[]>
  public create(args: {
    input: AtomCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateAtomsMutationResponse>
  public update(args: {
    where?: AtomWhere
    update?: AtomUpdateInput
    connect?: AtomConnectInput
    disconnect?: AtomDisconnectInput
    create?: AtomCreateInput
    connectOrCreate?: AtomConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateAtomsMutationResponse>
  public delete(args: {
    where?: AtomWhere
    delete?: AtomDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AtomWhere

    aggregate: AtomAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AtomAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface CreateInfoAggregateSelectionInput {
  count?: boolean
  bookmark?: StringAggregateInputNullable
  nodesCreated?: IntAggregateInputNonNullable
  relationshipsCreated?: IntAggregateInputNonNullable
}

export declare class CreateInfoModel {
  public find(args?: {
    where?: CreateInfoWhere

    options?: CreateInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateInfo[]>
  public create(args: {
    input: CreateInfoCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateCreateInfosMutationResponse>
  public update(args: {
    where?: CreateInfoWhere
    update?: CreateInfoUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateCreateInfosMutationResponse>
  public delete(args: {
    where?: CreateInfoWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: CreateInfoWhere

    aggregate: CreateInfoAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<CreateInfoAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PageAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  slug?: StringAggregateInputNonNullable
  getServerSideProps?: StringAggregateInputNullable
}

export declare class PageModel {
  public find(args?: {
    where?: PageWhere

    options?: PageOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Page[]>
  public create(args: {
    input: PageCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePagesMutationResponse>
  public update(args: {
    where?: PageWhere
    update?: PageUpdateInput
    connect?: PageConnectInput
    disconnect?: PageDisconnectInput
    create?: PageCreateInput
    connectOrCreate?: PageConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePagesMutationResponse>
  public delete(args: {
    where?: PageWhere
    delete?: PageDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PageWhere

    aggregate: PageAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PageAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TypeReferenceAggregateSelectionInput {
  count?: boolean
  name?: StringAggregateInputNonNullable
  label?: StringAggregateInputNonNullable
}

export declare class TypeReferenceModel {
  public find(args?: {
    where?: TypeReferenceWhere

    options?: TypeReferenceOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<TypeReference[]>
  public create(args: {
    input: TypeReferenceCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTypeReferencesMutationResponse>
  public update(args: {
    where?: TypeReferenceWhere
    update?: TypeReferenceUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTypeReferencesMutationResponse>
  public delete(args: {
    where?: TypeReferenceWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TypeReferenceWhere

    aggregate: TypeReferenceAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TypeReferenceAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface GetBaseTypesReturnAggregateSelectionInput {
  count?: boolean
  totalCount?: IntAggregateInputNonNullable
}

export declare class GetBaseTypesReturnModel {
  public find(args?: {
    where?: GetBaseTypesReturnWhere

    options?: GetBaseTypesReturnOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<GetBaseTypesReturn[]>
  public create(args: {
    input: GetBaseTypesReturnCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateGetBaseTypesReturnsMutationResponse>
  public update(args: {
    where?: GetBaseTypesReturnWhere
    update?: GetBaseTypesReturnUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateGetBaseTypesReturnsMutationResponse>
  public delete(args: {
    where?: GetBaseTypesReturnWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: GetBaseTypesReturnWhere

    aggregate: GetBaseTypesReturnAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<GetBaseTypesReturnAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface BaseTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class BaseTypeModel {
  public find(args?: {
    where?: BaseTypeWhere

    options?: BaseTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<BaseType[]>
  public create(args: {
    input: BaseTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateBaseTypesMutationResponse>
  public update(args: {
    where?: BaseTypeWhere
    update?: BaseTypeUpdateInput
    connect?: BaseTypeConnectInput
    disconnect?: BaseTypeDisconnectInput
    create?: BaseTypeCreateInput
    connectOrCreate?: BaseTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateBaseTypesMutationResponse>
  public delete(args: {
    where?: BaseTypeWhere
    delete?: BaseTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: BaseTypeWhere

    aggregate: BaseTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<BaseTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PrimitiveTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class PrimitiveTypeModel {
  public find(args?: {
    where?: PrimitiveTypeWhere

    options?: PrimitiveTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<PrimitiveType[]>
  public create(args: {
    input: PrimitiveTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePrimitiveTypesMutationResponse>
  public update(args: {
    where?: PrimitiveTypeWhere
    update?: PrimitiveTypeUpdateInput
    connect?: PrimitiveTypeConnectInput
    disconnect?: PrimitiveTypeDisconnectInput
    create?: PrimitiveTypeCreateInput
    connectOrCreate?: PrimitiveTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePrimitiveTypesMutationResponse>
  public delete(args: {
    where?: PrimitiveTypeWhere
    delete?: PrimitiveTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PrimitiveTypeWhere

    aggregate: PrimitiveTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PrimitiveTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ArrayTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ArrayTypeModel {
  public find(args?: {
    where?: ArrayTypeWhere

    options?: ArrayTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ArrayType[]>
  public create(args: {
    input: ArrayTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateArrayTypesMutationResponse>
  public update(args: {
    where?: ArrayTypeWhere
    update?: ArrayTypeUpdateInput
    connect?: ArrayTypeConnectInput
    disconnect?: ArrayTypeDisconnectInput
    create?: ArrayTypeCreateInput
    connectOrCreate?: ArrayTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateArrayTypesMutationResponse>
  public delete(args: {
    where?: ArrayTypeWhere
    delete?: ArrayTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ArrayTypeWhere

    aggregate: ArrayTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ArrayTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface UnionTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class UnionTypeModel {
  public find(args?: {
    where?: UnionTypeWhere

    options?: UnionTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UnionType[]>
  public create(args: {
    input: UnionTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateUnionTypesMutationResponse>
  public update(args: {
    where?: UnionTypeWhere
    update?: UnionTypeUpdateInput
    connect?: UnionTypeConnectInput
    disconnect?: UnionTypeDisconnectInput
    create?: UnionTypeCreateInput
    connectOrCreate?: UnionTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateUnionTypesMutationResponse>
  public delete(args: {
    where?: UnionTypeWhere
    delete?: UnionTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: UnionTypeWhere

    aggregate: UnionTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<UnionTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface InterfaceTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class InterfaceTypeModel {
  public find(args?: {
    where?: InterfaceTypeWhere

    options?: InterfaceTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<InterfaceType[]>
  public create(args: {
    input: InterfaceTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateInterfaceTypesMutationResponse>
  public update(args: {
    where?: InterfaceTypeWhere
    update?: InterfaceTypeUpdateInput
    connect?: InterfaceTypeConnectInput
    disconnect?: InterfaceTypeDisconnectInput
    create?: InterfaceTypeCreateInput
    connectOrCreate?: InterfaceTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateInterfaceTypesMutationResponse>
  public delete(args: {
    where?: InterfaceTypeWhere
    delete?: InterfaceTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: InterfaceTypeWhere

    aggregate: InterfaceTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ElementTypeModel {
  public find(args?: {
    where?: ElementTypeWhere

    options?: ElementTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ElementType[]>
  public create(args: {
    input: ElementTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateElementTypesMutationResponse>
  public update(args: {
    where?: ElementTypeWhere
    update?: ElementTypeUpdateInput
    connect?: ElementTypeConnectInput
    disconnect?: ElementTypeDisconnectInput
    create?: ElementTypeCreateInput
    connectOrCreate?: ElementTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateElementTypesMutationResponse>
  public delete(args: {
    where?: ElementTypeWhere
    delete?: ElementTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementTypeWhere

    aggregate: ElementTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface RenderPropsTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class RenderPropsTypeModel {
  public find(args?: {
    where?: RenderPropsTypeWhere

    options?: RenderPropsTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<RenderPropsType[]>
  public create(args: {
    input: RenderPropsTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateRenderPropsTypesMutationResponse>
  public update(args: {
    where?: RenderPropsTypeWhere
    update?: RenderPropsTypeUpdateInput
    connect?: RenderPropsTypeConnectInput
    disconnect?: RenderPropsTypeDisconnectInput
    create?: RenderPropsTypeCreateInput
    connectOrCreate?: RenderPropsTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateRenderPropsTypesMutationResponse>
  public delete(args: {
    where?: RenderPropsTypeWhere
    delete?: RenderPropsTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: RenderPropsTypeWhere

    aggregate: RenderPropsTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<RenderPropsTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ReactNodeTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ReactNodeTypeModel {
  public find(args?: {
    where?: ReactNodeTypeWhere

    options?: ReactNodeTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ReactNodeType[]>
  public create(args: {
    input: ReactNodeTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateReactNodeTypesMutationResponse>
  public update(args: {
    where?: ReactNodeTypeWhere
    update?: ReactNodeTypeUpdateInput
    connect?: ReactNodeTypeConnectInput
    disconnect?: ReactNodeTypeDisconnectInput
    create?: ReactNodeTypeCreateInput
    connectOrCreate?: ReactNodeTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateReactNodeTypesMutationResponse>
  public delete(args: {
    where?: ReactNodeTypeWhere
    delete?: ReactNodeTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ReactNodeTypeWhere

    aggregate: ReactNodeTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ReactNodeTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface EnumTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class EnumTypeModel {
  public find(args?: {
    where?: EnumTypeWhere

    options?: EnumTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<EnumType[]>
  public create(args: {
    input: EnumTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateEnumTypesMutationResponse>
  public update(args: {
    where?: EnumTypeWhere
    update?: EnumTypeUpdateInput
    connect?: EnumTypeConnectInput
    disconnect?: EnumTypeDisconnectInput
    create?: EnumTypeCreateInput
    connectOrCreate?: EnumTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateEnumTypesMutationResponse>
  public delete(args: {
    where?: EnumTypeWhere
    delete?: EnumTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: EnumTypeWhere

    aggregate: EnumTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface EnumTypeValueAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  key?: StringAggregateInputNonNullable
  value?: StringAggregateInputNonNullable
}

export declare class EnumTypeValueModel {
  public find(args?: {
    where?: EnumTypeValueWhere

    options?: EnumTypeValueOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<EnumTypeValue[]>
  public create(args: {
    input: EnumTypeValueCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateEnumTypeValuesMutationResponse>
  public update(args: {
    where?: EnumTypeValueWhere
    update?: EnumTypeValueUpdateInput
    connect?: EnumTypeValueConnectInput
    disconnect?: EnumTypeValueDisconnectInput
    create?: EnumTypeValueCreateInput
    connectOrCreate?: EnumTypeValueConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateEnumTypeValuesMutationResponse>
  public delete(args: {
    where?: EnumTypeValueWhere
    delete?: EnumTypeValueDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: EnumTypeValueWhere

    aggregate: EnumTypeValueAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeValueAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface LambdaTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class LambdaTypeModel {
  public find(args?: {
    where?: LambdaTypeWhere

    options?: LambdaTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<LambdaType[]>
  public create(args: {
    input: LambdaTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateLambdaTypesMutationResponse>
  public update(args: {
    where?: LambdaTypeWhere
    update?: LambdaTypeUpdateInput
    connect?: LambdaTypeConnectInput
    disconnect?: LambdaTypeDisconnectInput
    create?: LambdaTypeCreateInput
    connectOrCreate?: LambdaTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateLambdaTypesMutationResponse>
  public delete(args: {
    where?: LambdaTypeWhere
    delete?: LambdaTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: LambdaTypeWhere

    aggregate: LambdaTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<LambdaTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PageTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class PageTypeModel {
  public find(args?: {
    where?: PageTypeWhere

    options?: PageTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<PageType[]>
  public create(args: {
    input: PageTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePageTypesMutationResponse>
  public update(args: {
    where?: PageTypeWhere
    update?: PageTypeUpdateInput
    connect?: PageTypeConnectInput
    disconnect?: PageTypeDisconnectInput
    create?: PageTypeCreateInput
    connectOrCreate?: PageTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePageTypesMutationResponse>
  public delete(args: {
    where?: PageTypeWhere
    delete?: PageTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PageTypeWhere

    aggregate: PageTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PageTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface AppTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class AppTypeModel {
  public find(args?: {
    where?: AppTypeWhere

    options?: AppTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<AppType[]>
  public create(args: {
    input: AppTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateAppTypesMutationResponse>
  public update(args: {
    where?: AppTypeWhere
    update?: AppTypeUpdateInput
    connect?: AppTypeConnectInput
    disconnect?: AppTypeDisconnectInput
    create?: AppTypeCreateInput
    connectOrCreate?: AppTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateAppTypesMutationResponse>
  public delete(args: {
    where?: AppTypeWhere
    delete?: AppTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AppTypeWhere

    aggregate: AppTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AppTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ActionTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ActionTypeModel {
  public find(args?: {
    where?: ActionTypeWhere

    options?: ActionTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ActionType[]>
  public create(args: {
    input: ActionTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateActionTypesMutationResponse>
  public update(args: {
    where?: ActionTypeWhere
    update?: ActionTypeUpdateInput
    connect?: ActionTypeConnectInput
    disconnect?: ActionTypeDisconnectInput
    create?: ActionTypeCreateInput
    connectOrCreate?: ActionTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateActionTypesMutationResponse>
  public delete(args: {
    where?: ActionTypeWhere
    delete?: ActionTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ActionTypeWhere

    aggregate: ActionTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ActionTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface CodeMirrorTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class CodeMirrorTypeModel {
  public find(args?: {
    where?: CodeMirrorTypeWhere

    options?: CodeMirrorTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CodeMirrorType[]>
  public create(args: {
    input: CodeMirrorTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateCodeMirrorTypesMutationResponse>
  public update(args: {
    where?: CodeMirrorTypeWhere
    update?: CodeMirrorTypeUpdateInput
    connect?: CodeMirrorTypeConnectInput
    disconnect?: CodeMirrorTypeDisconnectInput
    create?: CodeMirrorTypeCreateInput
    connectOrCreate?: CodeMirrorTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateCodeMirrorTypesMutationResponse>
  public delete(args: {
    where?: CodeMirrorTypeWhere
    delete?: CodeMirrorTypeDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: CodeMirrorTypeWhere

    aggregate: CodeMirrorTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<CodeMirrorTypeAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere

    options?: TagOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Tag[]>
  public create(args: {
    input: TagCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagsMutationResponse>
  public update(args: {
    where?: TagWhere
    update?: TagUpdateInput
    connect?: TagConnectInput
    disconnect?: TagDisconnectInput
    create?: TagCreateInput
    connectOrCreate?: TagConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagsMutationResponse>
  public delete(args: {
    where?: TagWhere
    delete?: TagDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TagWhere

    aggregate: TagAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TagAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNullable
  customCss?: StringAggregateInputNullable
  guiCss?: StringAggregateInputNullable
  propTransformationJs?: StringAggregateInputNullable
  renderForEachPropKey?: StringAggregateInputNullable
  renderIfPropKey?: StringAggregateInputNullable
  preRenderActionId?: StringAggregateInputNullable
  postRenderActionId?: StringAggregateInputNullable
}

export declare class ElementModel {
  public find(args?: {
    where?: ElementWhere

    options?: ElementOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Element[]>
  public create(args: {
    input: ElementCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateElementsMutationResponse>
  public update(args: {
    where?: ElementWhere
    update?: ElementUpdateInput
    connect?: ElementConnectInput
    disconnect?: ElementDisconnectInput
    create?: ElementCreateInput
    connectOrCreate?: ElementConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateElementsMutationResponse>
  public delete(args: {
    where?: ElementWhere
    delete?: ElementDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementWhere

    aggregate: ElementAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PropAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  data?: StringAggregateInputNonNullable
}

export declare class PropModel {
  public find(args?: {
    where?: PropWhere

    options?: PropOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Prop[]>
  public create(args: {
    input: PropCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePropsMutationResponse>
  public update(args: {
    where?: PropWhere
    update?: PropUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePropsMutationResponse>
  public delete(args: {
    where?: PropWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PropWhere

    aggregate: PropAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PropAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PropMapBindingAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  sourceKey?: StringAggregateInputNonNullable
  targetKey?: StringAggregateInputNonNullable
}

export declare class PropMapBindingModel {
  public find(args?: {
    where?: PropMapBindingWhere

    options?: PropMapBindingOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<PropMapBinding[]>
  public create(args: {
    input: PropMapBindingCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreatePropMapBindingsMutationResponse>
  public update(args: {
    where?: PropMapBindingWhere
    update?: PropMapBindingUpdateInput
    connect?: PropMapBindingConnectInput
    disconnect?: PropMapBindingDisconnectInput
    create?: PropMapBindingCreateInput
    connectOrCreate?: PropMapBindingConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdatePropMapBindingsMutationResponse>
  public delete(args: {
    where?: PropMapBindingWhere
    delete?: PropMapBindingDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PropMapBindingWhere

    aggregate: PropMapBindingAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PropMapBindingAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface HookAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
}

export declare class HookModel {
  public find(args?: {
    where?: HookWhere

    options?: HookOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Hook[]>
  public create(args: {
    input: HookCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateHooksMutationResponse>
  public update(args: {
    where?: HookWhere
    update?: HookUpdateInput
    connect?: HookConnectInput
    disconnect?: HookDisconnectInput
    create?: HookCreateInput
    connectOrCreate?: HookConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateHooksMutationResponse>
  public delete(args: {
    where?: HookWhere
    delete?: HookDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: HookWhere

    aggregate: HookAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<HookAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ComponentAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ComponentModel {
  public find(args?: {
    where?: ComponentWhere

    options?: ComponentOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Component[]>
  public create(args: {
    input: ComponentCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateComponentsMutationResponse>
  public update(args: {
    where?: ComponentWhere
    update?: ComponentUpdateInput
    connect?: ComponentConnectInput
    disconnect?: ComponentDisconnectInput
    create?: ComponentCreateInput
    connectOrCreate?: ComponentConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateComponentsMutationResponse>
  public delete(args: {
    where?: ComponentWhere
    delete?: ComponentDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ComponentWhere

    aggregate: ComponentAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ComponentAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface StoreAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class StoreModel {
  public find(args?: {
    where?: StoreWhere

    options?: StoreOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Store[]>
  public create(args: {
    input: StoreCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateStoresMutationResponse>
  public update(args: {
    where?: StoreWhere
    update?: StoreUpdateInput
    connect?: StoreConnectInput
    disconnect?: StoreDisconnectInput
    create?: StoreCreateInput
    connectOrCreate?: StoreConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateStoresMutationResponse>
  public delete(args: {
    where?: StoreWhere
    delete?: StoreDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: StoreWhere

    aggregate: StoreAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<StoreAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface CodeActionAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  code?: StringAggregateInputNonNullable
}

export declare class CodeActionModel {
  public find(args?: {
    where?: CodeActionWhere

    options?: CodeActionOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CodeAction[]>
  public create(args: {
    input: CodeActionCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateCodeActionsMutationResponse>
  public update(args: {
    where?: CodeActionWhere
    update?: CodeActionUpdateInput
    connect?: CodeActionConnectInput
    disconnect?: CodeActionDisconnectInput
    create?: CodeActionCreateInput
    connectOrCreate?: CodeActionConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateCodeActionsMutationResponse>
  public delete(args: {
    where?: CodeActionWhere
    delete?: CodeActionDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: CodeActionWhere

    aggregate: CodeActionAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<CodeActionAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ApiActionAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ApiActionModel {
  public find(args?: {
    where?: ApiActionWhere

    options?: ApiActionOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ApiAction[]>
  public create(args: {
    input: ApiActionCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateApiActionsMutationResponse>
  public update(args: {
    where?: ApiActionWhere
    update?: ApiActionUpdateInput
    connect?: ApiActionConnectInput
    disconnect?: ApiActionDisconnectInput
    create?: ApiActionCreateInput
    connectOrCreate?: ApiActionConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateApiActionsMutationResponse>
  public delete(args: {
    where?: ApiActionWhere
    delete?: ApiActionDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ApiActionWhere

    aggregate: ApiActionAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ApiActionAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ResourceAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class ResourceModel {
  public find(args?: {
    where?: ResourceWhere

    options?: ResourceOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Resource[]>
  public create(args: {
    input: ResourceCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateResourcesMutationResponse>
  public update(args: {
    where?: ResourceWhere
    update?: ResourceUpdateInput
    connect?: ResourceConnectInput
    disconnect?: ResourceDisconnectInput
    create?: ResourceCreateInput
    connectOrCreate?: ResourceConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateResourcesMutationResponse>
  public delete(args: {
    where?: ResourceWhere
    delete?: ResourceDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ResourceWhere

    aggregate: ResourceAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ResourceAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DeleteInfoAggregateSelectionInput {
  count?: boolean
  bookmark?: StringAggregateInputNullable
  nodesDeleted?: IntAggregateInputNonNullable
  relationshipsDeleted?: IntAggregateInputNonNullable
}

export declare class DeleteInfoModel {
  public find(args?: {
    where?: DeleteInfoWhere

    options?: DeleteInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<DeleteInfo[]>
  public create(args: {
    input: DeleteInfoCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateDeleteInfosMutationResponse>
  public update(args: {
    where?: DeleteInfoWhere
    update?: DeleteInfoUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateDeleteInfosMutationResponse>
  public delete(args: {
    where?: DeleteInfoWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: DeleteInfoWhere

    aggregate: DeleteInfoAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<DeleteInfoAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface VercelDomainConfigAggregateSelectionInput {
  count?: boolean
}

export declare class VercelDomainConfigModel {
  public find(args?: {
    where?: VercelDomainConfigWhere

    options?: VercelDomainConfigOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<VercelDomainConfig[]>
  public create(args: {
    input: VercelDomainConfigCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateVercelDomainConfigsMutationResponse>
  public update(args: {
    where?: VercelDomainConfigWhere
    update?: VercelDomainConfigUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateVercelDomainConfigsMutationResponse>
  public delete(args: {
    where?: VercelDomainConfigWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: VercelDomainConfigWhere

    aggregate: VercelDomainConfigAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<VercelDomainConfigAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface VercelProjectDomainAggregateSelectionInput {
  count?: boolean
}

export declare class VercelProjectDomainModel {
  public find(args?: {
    where?: VercelProjectDomainWhere

    options?: VercelProjectDomainOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<VercelProjectDomain[]>
  public create(args: {
    input: VercelProjectDomainCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateVercelProjectDomainsMutationResponse>
  public update(args: {
    where?: VercelProjectDomainWhere
    update?: VercelProjectDomainUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateVercelProjectDomainsMutationResponse>
  public delete(args: {
    where?: VercelProjectDomainWhere

    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: VercelProjectDomainWhere

    aggregate: VercelProjectDomainAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<VercelProjectDomainAggregateSelection>
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface StringAggregateInputNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInputNonNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DomainAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class DomainModel {
  public find(args?: {
    where?: DomainWhere

    options?: DomainOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Domain[]>
  public create(args: {
    input: DomainCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateDomainsMutationResponse>
  public update(args: {
    where?: DomainWhere
    update?: DomainUpdateInput
    connect?: DomainConnectInput
    disconnect?: DomainDisconnectInput
    create?: DomainCreateInput
    connectOrCreate?: DomainConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateDomainsMutationResponse>
  public delete(args: {
    where?: DomainWhere
    delete?: DomainDeleteInput
    context?: any
    rootValue?: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: DomainWhere

    aggregate: DomainAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<DomainAggregateSelection>
}

export interface ModelMap {
  ResetDatabaseMutationResponse: ResetDatabaseMutationResponseModel
  User: UserModel
  App: AppModel
  Field: FieldModel
  Atom: AtomModel
  CreateInfo: CreateInfoModel
  Page: PageModel
  TypeReference: TypeReferenceModel
  GetBaseTypesReturn: GetBaseTypesReturnModel
  BaseType: BaseTypeModel
  PrimitiveType: PrimitiveTypeModel
  ArrayType: ArrayTypeModel
  UnionType: UnionTypeModel
  InterfaceType: InterfaceTypeModel
  ElementType: ElementTypeModel
  RenderPropsType: RenderPropsTypeModel
  ReactNodeType: ReactNodeTypeModel
  EnumType: EnumTypeModel
  EnumTypeValue: EnumTypeValueModel
  LambdaType: LambdaTypeModel
  PageType: PageTypeModel
  AppType: AppTypeModel
  ActionType: ActionTypeModel
  CodeMirrorType: CodeMirrorTypeModel
  Tag: TagModel
  Element: ElementModel
  Prop: PropModel
  PropMapBinding: PropMapBindingModel
  Hook: HookModel
  Component: ComponentModel
  Store: StoreModel
  CodeAction: CodeActionModel
  ApiAction: ApiActionModel
  Resource: ResourceModel
  DeleteInfo: DeleteInfoModel
  VercelDomainConfig: VercelDomainConfigModel
  VercelProjectDomain: VercelProjectDomainModel
  Domain: DomainModel
}
