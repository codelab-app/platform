export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  baseTypes: GetBaseTypesReturn;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
  apps: Array<App>;
  appsAggregate: AppAggregateSelection;
  appsConnection: AppsConnection;
  fields: Array<Field>;
  fieldsAggregate: FieldAggregateSelection;
  fieldsConnection: FieldsConnection;
  atoms: Array<Atom>;
  atomsAggregate: AtomAggregateSelection;
  atomsConnection: AtomsConnection;
  pages: Array<Page>;
  pagesAggregate: PageAggregateSelection;
  pagesConnection: PagesConnection;
  typeReferences: Array<TypeReference>;
  typeReferencesAggregate: TypeReferenceAggregateSelection;
  typeReferencesConnection: TypeReferencesConnection;
  getBaseTypesReturns: Array<GetBaseTypesReturn>;
  getBaseTypesReturnsAggregate: GetBaseTypesReturnAggregateSelection;
  getBaseTypesReturnsConnection: GetBaseTypesReturnsConnection;
  primitiveTypes: Array<PrimitiveType>;
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection;
  primitiveTypesConnection: PrimitiveTypesConnection;
  arrayTypes: Array<ArrayType>;
  arrayTypesAggregate: ArrayTypeAggregateSelection;
  arrayTypesConnection: ArrayTypesConnection;
  unionTypes: Array<UnionType>;
  unionTypesAggregate: UnionTypeAggregateSelection;
  unionTypesConnection: UnionTypesConnection;
  interfaceTypes: Array<InterfaceType>;
  interfaceTypesAggregate: InterfaceTypeAggregateSelection;
  interfaceTypesConnection: InterfaceTypesConnection;
  elementTypes: Array<ElementType>;
  elementTypesAggregate: ElementTypeAggregateSelection;
  elementTypesConnection: ElementTypesConnection;
  renderPropTypes: Array<RenderPropType>;
  renderPropTypesAggregate: RenderPropTypeAggregateSelection;
  renderPropTypesConnection: RenderPropTypesConnection;
  reactNodeTypes: Array<ReactNodeType>;
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection;
  reactNodeTypesConnection: ReactNodeTypesConnection;
  enumTypes: Array<EnumType>;
  enumTypesAggregate: EnumTypeAggregateSelection;
  enumTypesConnection: EnumTypesConnection;
  enumTypeValues: Array<EnumTypeValue>;
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection;
  enumTypeValuesConnection: EnumTypeValuesConnection;
  lambdaTypes: Array<LambdaType>;
  lambdaTypesAggregate: LambdaTypeAggregateSelection;
  lambdaTypesConnection: LambdaTypesConnection;
  pageTypes: Array<PageType>;
  pageTypesAggregate: PageTypeAggregateSelection;
  pageTypesConnection: PageTypesConnection;
  appTypes: Array<AppType>;
  appTypesAggregate: AppTypeAggregateSelection;
  appTypesConnection: AppTypesConnection;
  actionTypes: Array<ActionType>;
  actionTypesAggregate: ActionTypeAggregateSelection;
  actionTypesConnection: ActionTypesConnection;
  codeMirrorTypes: Array<CodeMirrorType>;
  codeMirrorTypesAggregate: CodeMirrorTypeAggregateSelection;
  codeMirrorTypesConnection: CodeMirrorTypesConnection;
  tags: Array<Tag>;
  tagsAggregate: TagAggregateSelection;
  tagsConnection: TagsConnection;
  elements: Array<Element>;
  elementsAggregate: ElementAggregateSelection;
  elementsConnection: ElementsConnection;
  props: Array<Prop>;
  propsAggregate: PropAggregateSelection;
  propsConnection: PropsConnection;
  hooks: Array<Hook>;
  hooksAggregate: HookAggregateSelection;
  hooksConnection: HooksConnection;
  components: Array<Component>;
  componentsAggregate: ComponentAggregateSelection;
  componentsConnection: ComponentsConnection;
  stores: Array<Store>;
  storesAggregate: StoreAggregateSelection;
  storesConnection: StoresConnection;
  codeActions: Array<CodeAction>;
  codeActionsAggregate: CodeActionAggregateSelection;
  codeActionsConnection: CodeActionsConnection;
  apiActions: Array<ApiAction>;
  apiActionsAggregate: ApiActionAggregateSelection;
  apiActionsConnection: ApiActionsConnection;
  resources: Array<Resource>;
  resourcesAggregate: ResourceAggregateSelection;
  resourcesConnection: ResourcesConnection;
  domains: Array<Domain>;
  domainsAggregate: DomainAggregateSelection;
  domainsConnection: DomainsConnection;
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>;
};


export type QueryBaseTypesArgs = {
  options?: InputMaybe<GetBaseTypesOptions>;
};


export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserWhere>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};


export type QueryAppsArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
};


export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>;
};


export type QueryAppsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AppWhere>;
  sort?: InputMaybe<Array<InputMaybe<AppSort>>>;
};


export type QueryFieldsArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
};


export type QueryFieldsAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
};


export type QueryFieldsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<FieldWhere>;
  sort?: InputMaybe<Array<InputMaybe<FieldSort>>>;
};


export type QueryAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
};


export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
};


export type QueryAtomsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AtomWhere>;
  sort?: InputMaybe<Array<InputMaybe<AtomSort>>>;
};


export type QueryPagesArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
};


export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>;
};


export type QueryPagesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PageWhere>;
  sort?: InputMaybe<Array<InputMaybe<PageSort>>>;
};


export type QueryTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>;
  options?: InputMaybe<TypeReferenceOptions>;
};


export type QueryTypeReferencesAggregateArgs = {
  where?: InputMaybe<TypeReferenceWhere>;
};


export type QueryTypeReferencesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TypeReferenceWhere>;
  sort?: InputMaybe<Array<InputMaybe<TypeReferenceSort>>>;
};


export type QueryGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>;
  options?: InputMaybe<GetBaseTypesReturnOptions>;
};


export type QueryGetBaseTypesReturnsAggregateArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>;
};


export type QueryGetBaseTypesReturnsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<GetBaseTypesReturnWhere>;
  sort?: InputMaybe<Array<InputMaybe<GetBaseTypesReturnSort>>>;
};


export type QueryPrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
  options?: InputMaybe<PrimitiveTypeOptions>;
};


export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
};


export type QueryPrimitiveTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PrimitiveTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<PrimitiveTypeSort>>>;
};


export type QueryArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>;
  options?: InputMaybe<ArrayTypeOptions>;
};


export type QueryArrayTypesAggregateArgs = {
  where?: InputMaybe<ArrayTypeWhere>;
};


export type QueryArrayTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ArrayTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<ArrayTypeSort>>>;
};


export type QueryUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>;
  options?: InputMaybe<UnionTypeOptions>;
};


export type QueryUnionTypesAggregateArgs = {
  where?: InputMaybe<UnionTypeWhere>;
};


export type QueryUnionTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UnionTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<UnionTypeSort>>>;
};


export type QueryInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
};


export type QueryInterfaceTypesAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
};


export type QueryInterfaceTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<InterfaceTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<InterfaceTypeSort>>>;
};


export type QueryElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>;
  options?: InputMaybe<ElementTypeOptions>;
};


export type QueryElementTypesAggregateArgs = {
  where?: InputMaybe<ElementTypeWhere>;
};


export type QueryElementTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ElementTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<ElementTypeSort>>>;
};


export type QueryRenderPropTypesArgs = {
  where?: InputMaybe<RenderPropTypeWhere>;
  options?: InputMaybe<RenderPropTypeOptions>;
};


export type QueryRenderPropTypesAggregateArgs = {
  where?: InputMaybe<RenderPropTypeWhere>;
};


export type QueryRenderPropTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<RenderPropTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<RenderPropTypeSort>>>;
};


export type QueryReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
  options?: InputMaybe<ReactNodeTypeOptions>;
};


export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
};


export type QueryReactNodeTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ReactNodeTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<ReactNodeTypeSort>>>;
};


export type QueryEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  options?: InputMaybe<EnumTypeOptions>;
};


export type QueryEnumTypesAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>;
};


export type QueryEnumTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<EnumTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<EnumTypeSort>>>;
};


export type QueryEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  options?: InputMaybe<EnumTypeValueOptions>;
};


export type QueryEnumTypeValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
};


export type QueryEnumTypeValuesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<EnumTypeValueWhere>;
  sort?: InputMaybe<Array<InputMaybe<EnumTypeValueSort>>>;
};


export type QueryLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>;
  options?: InputMaybe<LambdaTypeOptions>;
};


export type QueryLambdaTypesAggregateArgs = {
  where?: InputMaybe<LambdaTypeWhere>;
};


export type QueryLambdaTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LambdaTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<LambdaTypeSort>>>;
};


export type QueryPageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>;
  options?: InputMaybe<PageTypeOptions>;
};


export type QueryPageTypesAggregateArgs = {
  where?: InputMaybe<PageTypeWhere>;
};


export type QueryPageTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PageTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<PageTypeSort>>>;
};


export type QueryAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>;
  options?: InputMaybe<AppTypeOptions>;
};


export type QueryAppTypesAggregateArgs = {
  where?: InputMaybe<AppTypeWhere>;
};


export type QueryAppTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AppTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<AppTypeSort>>>;
};


export type QueryActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>;
  options?: InputMaybe<ActionTypeOptions>;
};


export type QueryActionTypesAggregateArgs = {
  where?: InputMaybe<ActionTypeWhere>;
};


export type QueryActionTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ActionTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<ActionTypeSort>>>;
};


export type QueryCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>;
  options?: InputMaybe<CodeMirrorTypeOptions>;
};


export type QueryCodeMirrorTypesAggregateArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>;
};


export type QueryCodeMirrorTypesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CodeMirrorTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<CodeMirrorTypeSort>>>;
};


export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
};


export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
};


export type QueryTagsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TagWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>;
};


export type QueryElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
};


export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
};


export type QueryElementsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ElementWhere>;
  sort?: InputMaybe<Array<InputMaybe<ElementSort>>>;
};


export type QueryPropsArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
};


export type QueryPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>;
};


export type QueryPropsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PropWhere>;
  sort?: InputMaybe<Array<InputMaybe<PropSort>>>;
};


export type QueryHooksArgs = {
  where?: InputMaybe<HookWhere>;
  options?: InputMaybe<HookOptions>;
};


export type QueryHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>;
};


export type QueryHooksConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<HookWhere>;
  sort?: InputMaybe<Array<InputMaybe<HookSort>>>;
};


export type QueryComponentsArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
};


export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
};


export type QueryComponentsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ComponentWhere>;
  sort?: InputMaybe<Array<InputMaybe<ComponentSort>>>;
};


export type QueryStoresArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
};


export type QueryStoresAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
};


export type QueryStoresConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<StoreWhere>;
  sort?: InputMaybe<Array<InputMaybe<StoreSort>>>;
};


export type QueryCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>;
  options?: InputMaybe<CodeActionOptions>;
};


export type QueryCodeActionsAggregateArgs = {
  where?: InputMaybe<CodeActionWhere>;
};


export type QueryCodeActionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CodeActionWhere>;
  sort?: InputMaybe<Array<InputMaybe<CodeActionSort>>>;
};


export type QueryApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>;
  options?: InputMaybe<ApiActionOptions>;
};


export type QueryApiActionsAggregateArgs = {
  where?: InputMaybe<ApiActionWhere>;
};


export type QueryApiActionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ApiActionWhere>;
  sort?: InputMaybe<Array<InputMaybe<ApiActionSort>>>;
};


export type QueryResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
};


export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
};


export type QueryResourcesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ResourceWhere>;
  sort?: InputMaybe<Array<InputMaybe<ResourceSort>>>;
};


export type QueryDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  options?: InputMaybe<DomainOptions>;
};


export type QueryDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>;
};


export type QueryDomainsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DomainWhere>;
  sort?: InputMaybe<Array<InputMaybe<DomainSort>>>;
};


export type QueryIsTypeDescendantOfArgs = {
  parentTypeId: Scalars['ID']['input'];
  descendantTypeId: Scalars['ID']['input'];
};


export type QueryGetTypeReferencesArgs = {
  typeId: Scalars['ID']['input'];
};

export type Mutation = {
  createDomains: CreateDomainsMutationResponse;
  updateDomains: UpdateDomainsMutationResponse;
  deleteDomains: DeleteInfo;
  createUsers: CreateUsersMutationResponse;
  deleteUsers: DeleteInfo;
  createApps: CreateAppsMutationResponse;
  deleteApps: DeleteInfo;
  updateApps: UpdateAppsMutationResponse;
  createFields: CreateFieldsMutationResponse;
  deleteFields: DeleteInfo;
  updateFields: UpdateFieldsMutationResponse;
  createAtoms: CreateAtomsMutationResponse;
  deleteAtoms: DeleteInfo;
  updateAtoms: UpdateAtomsMutationResponse;
  createPages: CreatePagesMutationResponse;
  deletePages: DeleteInfo;
  updatePages: UpdatePagesMutationResponse;
  createTypeReferences: CreateTypeReferencesMutationResponse;
  deleteTypeReferences: DeleteInfo;
  updateTypeReferences: UpdateTypeReferencesMutationResponse;
  createGetBaseTypesReturns: CreateGetBaseTypesReturnsMutationResponse;
  deleteGetBaseTypesReturns: DeleteInfo;
  updateGetBaseTypesReturns: UpdateGetBaseTypesReturnsMutationResponse;
  createPrimitiveTypes: CreatePrimitiveTypesMutationResponse;
  deletePrimitiveTypes: DeleteInfo;
  updatePrimitiveTypes: UpdatePrimitiveTypesMutationResponse;
  createArrayTypes: CreateArrayTypesMutationResponse;
  deleteArrayTypes: DeleteInfo;
  updateArrayTypes: UpdateArrayTypesMutationResponse;
  createUnionTypes: CreateUnionTypesMutationResponse;
  deleteUnionTypes: DeleteInfo;
  updateUnionTypes: UpdateUnionTypesMutationResponse;
  createInterfaceTypes: CreateInterfaceTypesMutationResponse;
  deleteInterfaceTypes: DeleteInfo;
  updateInterfaceTypes: UpdateInterfaceTypesMutationResponse;
  createElementTypes: CreateElementTypesMutationResponse;
  deleteElementTypes: DeleteInfo;
  updateElementTypes: UpdateElementTypesMutationResponse;
  createRenderPropTypes: CreateRenderPropTypesMutationResponse;
  deleteRenderPropTypes: DeleteInfo;
  updateRenderPropTypes: UpdateRenderPropTypesMutationResponse;
  createReactNodeTypes: CreateReactNodeTypesMutationResponse;
  deleteReactNodeTypes: DeleteInfo;
  updateReactNodeTypes: UpdateReactNodeTypesMutationResponse;
  createEnumTypes: CreateEnumTypesMutationResponse;
  deleteEnumTypes: DeleteInfo;
  updateEnumTypes: UpdateEnumTypesMutationResponse;
  createEnumTypeValues: CreateEnumTypeValuesMutationResponse;
  deleteEnumTypeValues: DeleteInfo;
  updateEnumTypeValues: UpdateEnumTypeValuesMutationResponse;
  createLambdaTypes: CreateLambdaTypesMutationResponse;
  deleteLambdaTypes: DeleteInfo;
  updateLambdaTypes: UpdateLambdaTypesMutationResponse;
  createPageTypes: CreatePageTypesMutationResponse;
  deletePageTypes: DeleteInfo;
  updatePageTypes: UpdatePageTypesMutationResponse;
  createAppTypes: CreateAppTypesMutationResponse;
  deleteAppTypes: DeleteInfo;
  updateAppTypes: UpdateAppTypesMutationResponse;
  createActionTypes: CreateActionTypesMutationResponse;
  deleteActionTypes: DeleteInfo;
  updateActionTypes: UpdateActionTypesMutationResponse;
  createCodeMirrorTypes: CreateCodeMirrorTypesMutationResponse;
  deleteCodeMirrorTypes: DeleteInfo;
  updateCodeMirrorTypes: UpdateCodeMirrorTypesMutationResponse;
  createTags: CreateTagsMutationResponse;
  deleteTags: DeleteInfo;
  updateTags: UpdateTagsMutationResponse;
  createElements: CreateElementsMutationResponse;
  deleteElements: DeleteInfo;
  updateElements: UpdateElementsMutationResponse;
  createProps: CreatePropsMutationResponse;
  deleteProps: DeleteInfo;
  updateProps: UpdatePropsMutationResponse;
  createHooks: CreateHooksMutationResponse;
  deleteHooks: DeleteInfo;
  updateHooks: UpdateHooksMutationResponse;
  createComponents: CreateComponentsMutationResponse;
  deleteComponents: DeleteInfo;
  updateComponents: UpdateComponentsMutationResponse;
  createStores: CreateStoresMutationResponse;
  deleteStores: DeleteInfo;
  updateStores: UpdateStoresMutationResponse;
  createCodeActions: CreateCodeActionsMutationResponse;
  deleteCodeActions: DeleteInfo;
  updateCodeActions: UpdateCodeActionsMutationResponse;
  createApiActions: CreateApiActionsMutationResponse;
  deleteApiActions: DeleteInfo;
  updateApiActions: UpdateApiActionsMutationResponse;
  createResources: CreateResourcesMutationResponse;
  deleteResources: DeleteInfo;
  updateResources: UpdateResourcesMutationResponse;
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>;
};


export type MutationCreateDomainsArgs = {
  input: Array<DomainCreateInput>;
};


export type MutationUpdateDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  update?: InputMaybe<DomainUpdateInput>;
  connect?: InputMaybe<DomainConnectInput>;
  disconnect?: InputMaybe<DomainDisconnectInput>;
  create?: InputMaybe<DomainRelationInput>;
  delete?: InputMaybe<DomainDeleteInput>;
  connectOrCreate?: InputMaybe<DomainConnectOrCreateInput>;
};


export type MutationDeleteDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  delete?: InputMaybe<DomainDeleteInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationDeleteUsersArgs = {
  where?: InputMaybe<UserWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};


export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>;
};


export type MutationDeleteAppsArgs = {
  where?: InputMaybe<AppWhere>;
  delete?: InputMaybe<AppDeleteInput>;
};


export type MutationUpdateAppsArgs = {
  where?: InputMaybe<AppWhere>;
  update?: InputMaybe<AppUpdateInput>;
  connect?: InputMaybe<AppConnectInput>;
  disconnect?: InputMaybe<AppDisconnectInput>;
  create?: InputMaybe<AppRelationInput>;
  delete?: InputMaybe<AppDeleteInput>;
  connectOrCreate?: InputMaybe<AppConnectOrCreateInput>;
};


export type MutationCreateFieldsArgs = {
  input: Array<FieldCreateInput>;
};


export type MutationDeleteFieldsArgs = {
  where?: InputMaybe<FieldWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};


export type MutationUpdateFieldsArgs = {
  where?: InputMaybe<FieldWhere>;
  update?: InputMaybe<FieldUpdateInput>;
  connect?: InputMaybe<FieldConnectInput>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
  create?: InputMaybe<FieldRelationInput>;
  delete?: InputMaybe<FieldDeleteInput>;
  connectOrCreate?: InputMaybe<FieldConnectOrCreateInput>;
};


export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>;
};


export type MutationDeleteAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};


export type MutationUpdateAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  update?: InputMaybe<AtomUpdateInput>;
  connect?: InputMaybe<AtomConnectInput>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
  create?: InputMaybe<AtomRelationInput>;
  delete?: InputMaybe<AtomDeleteInput>;
  connectOrCreate?: InputMaybe<AtomConnectOrCreateInput>;
};


export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>;
};


export type MutationDeletePagesArgs = {
  where?: InputMaybe<PageWhere>;
  delete?: InputMaybe<PageDeleteInput>;
};


export type MutationUpdatePagesArgs = {
  where?: InputMaybe<PageWhere>;
  update?: InputMaybe<PageUpdateInput>;
  connect?: InputMaybe<PageConnectInput>;
  disconnect?: InputMaybe<PageDisconnectInput>;
  create?: InputMaybe<PageRelationInput>;
  delete?: InputMaybe<PageDeleteInput>;
  connectOrCreate?: InputMaybe<PageConnectOrCreateInput>;
};


export type MutationCreateTypeReferencesArgs = {
  input: Array<TypeReferenceCreateInput>;
};


export type MutationDeleteTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>;
};


export type MutationUpdateTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>;
  update?: InputMaybe<TypeReferenceUpdateInput>;
};


export type MutationCreateGetBaseTypesReturnsArgs = {
  input: Array<GetBaseTypesReturnCreateInput>;
};


export type MutationDeleteGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>;
};


export type MutationUpdateGetBaseTypesReturnsArgs = {
  where?: InputMaybe<GetBaseTypesReturnWhere>;
  update?: InputMaybe<GetBaseTypesReturnUpdateInput>;
};


export type MutationCreatePrimitiveTypesArgs = {
  input: Array<PrimitiveTypeCreateInput>;
};


export type MutationDeletePrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
  delete?: InputMaybe<PrimitiveTypeDeleteInput>;
};


export type MutationUpdatePrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
  update?: InputMaybe<PrimitiveTypeUpdateInput>;
  connect?: InputMaybe<PrimitiveTypeConnectInput>;
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>;
  create?: InputMaybe<PrimitiveTypeRelationInput>;
  delete?: InputMaybe<PrimitiveTypeDeleteInput>;
  connectOrCreate?: InputMaybe<PrimitiveTypeConnectOrCreateInput>;
};


export type MutationCreateArrayTypesArgs = {
  input: Array<ArrayTypeCreateInput>;
};


export type MutationDeleteArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>;
  delete?: InputMaybe<ArrayTypeDeleteInput>;
};


export type MutationUpdateArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>;
  update?: InputMaybe<ArrayTypeUpdateInput>;
  connect?: InputMaybe<ArrayTypeConnectInput>;
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>;
  create?: InputMaybe<ArrayTypeRelationInput>;
  delete?: InputMaybe<ArrayTypeDeleteInput>;
  connectOrCreate?: InputMaybe<ArrayTypeConnectOrCreateInput>;
};


export type MutationCreateUnionTypesArgs = {
  input: Array<UnionTypeCreateInput>;
};


export type MutationDeleteUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>;
  delete?: InputMaybe<UnionTypeDeleteInput>;
};


export type MutationUpdateUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>;
  update?: InputMaybe<UnionTypeUpdateInput>;
  connect?: InputMaybe<UnionTypeConnectInput>;
  disconnect?: InputMaybe<UnionTypeDisconnectInput>;
  create?: InputMaybe<UnionTypeRelationInput>;
  delete?: InputMaybe<UnionTypeDeleteInput>;
  connectOrCreate?: InputMaybe<UnionTypeConnectOrCreateInput>;
};


export type MutationCreateInterfaceTypesArgs = {
  input: Array<InterfaceTypeCreateInput>;
};


export type MutationDeleteInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};


export type MutationUpdateInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  update?: InputMaybe<InterfaceTypeUpdateInput>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
  create?: InputMaybe<InterfaceTypeRelationInput>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
  connectOrCreate?: InputMaybe<InterfaceTypeConnectOrCreateInput>;
};


export type MutationCreateElementTypesArgs = {
  input: Array<ElementTypeCreateInput>;
};


export type MutationDeleteElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>;
  delete?: InputMaybe<ElementTypeDeleteInput>;
};


export type MutationUpdateElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>;
  update?: InputMaybe<ElementTypeUpdateInput>;
  connect?: InputMaybe<ElementTypeConnectInput>;
  disconnect?: InputMaybe<ElementTypeDisconnectInput>;
  create?: InputMaybe<ElementTypeRelationInput>;
  delete?: InputMaybe<ElementTypeDeleteInput>;
  connectOrCreate?: InputMaybe<ElementTypeConnectOrCreateInput>;
};


export type MutationCreateRenderPropTypesArgs = {
  input: Array<RenderPropTypeCreateInput>;
};


export type MutationDeleteRenderPropTypesArgs = {
  where?: InputMaybe<RenderPropTypeWhere>;
  delete?: InputMaybe<RenderPropTypeDeleteInput>;
};


export type MutationUpdateRenderPropTypesArgs = {
  where?: InputMaybe<RenderPropTypeWhere>;
  update?: InputMaybe<RenderPropTypeUpdateInput>;
  connect?: InputMaybe<RenderPropTypeConnectInput>;
  disconnect?: InputMaybe<RenderPropTypeDisconnectInput>;
  create?: InputMaybe<RenderPropTypeRelationInput>;
  delete?: InputMaybe<RenderPropTypeDeleteInput>;
  connectOrCreate?: InputMaybe<RenderPropTypeConnectOrCreateInput>;
};


export type MutationCreateReactNodeTypesArgs = {
  input: Array<ReactNodeTypeCreateInput>;
};


export type MutationDeleteReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
  delete?: InputMaybe<ReactNodeTypeDeleteInput>;
};


export type MutationUpdateReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
  update?: InputMaybe<ReactNodeTypeUpdateInput>;
  connect?: InputMaybe<ReactNodeTypeConnectInput>;
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>;
  create?: InputMaybe<ReactNodeTypeRelationInput>;
  delete?: InputMaybe<ReactNodeTypeDeleteInput>;
  connectOrCreate?: InputMaybe<ReactNodeTypeConnectOrCreateInput>;
};


export type MutationCreateEnumTypesArgs = {
  input: Array<EnumTypeCreateInput>;
};


export type MutationDeleteEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  delete?: InputMaybe<EnumTypeDeleteInput>;
};


export type MutationUpdateEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  update?: InputMaybe<EnumTypeUpdateInput>;
  connect?: InputMaybe<EnumTypeConnectInput>;
  disconnect?: InputMaybe<EnumTypeDisconnectInput>;
  create?: InputMaybe<EnumTypeRelationInput>;
  delete?: InputMaybe<EnumTypeDeleteInput>;
  connectOrCreate?: InputMaybe<EnumTypeConnectOrCreateInput>;
};


export type MutationCreateEnumTypeValuesArgs = {
  input: Array<EnumTypeValueCreateInput>;
};


export type MutationDeleteEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  delete?: InputMaybe<EnumTypeValueDeleteInput>;
};


export type MutationUpdateEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  update?: InputMaybe<EnumTypeValueUpdateInput>;
  connect?: InputMaybe<EnumTypeValueConnectInput>;
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>;
  create?: InputMaybe<EnumTypeValueRelationInput>;
  delete?: InputMaybe<EnumTypeValueDeleteInput>;
  connectOrCreate?: InputMaybe<EnumTypeValueConnectOrCreateInput>;
};


export type MutationCreateLambdaTypesArgs = {
  input: Array<LambdaTypeCreateInput>;
};


export type MutationDeleteLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>;
  delete?: InputMaybe<LambdaTypeDeleteInput>;
};


export type MutationUpdateLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>;
  update?: InputMaybe<LambdaTypeUpdateInput>;
  connect?: InputMaybe<LambdaTypeConnectInput>;
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>;
  create?: InputMaybe<LambdaTypeRelationInput>;
  delete?: InputMaybe<LambdaTypeDeleteInput>;
  connectOrCreate?: InputMaybe<LambdaTypeConnectOrCreateInput>;
};


export type MutationCreatePageTypesArgs = {
  input: Array<PageTypeCreateInput>;
};


export type MutationDeletePageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>;
  delete?: InputMaybe<PageTypeDeleteInput>;
};


export type MutationUpdatePageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>;
  update?: InputMaybe<PageTypeUpdateInput>;
  connect?: InputMaybe<PageTypeConnectInput>;
  disconnect?: InputMaybe<PageTypeDisconnectInput>;
  create?: InputMaybe<PageTypeRelationInput>;
  delete?: InputMaybe<PageTypeDeleteInput>;
  connectOrCreate?: InputMaybe<PageTypeConnectOrCreateInput>;
};


export type MutationCreateAppTypesArgs = {
  input: Array<AppTypeCreateInput>;
};


export type MutationDeleteAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>;
  delete?: InputMaybe<AppTypeDeleteInput>;
};


export type MutationUpdateAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>;
  update?: InputMaybe<AppTypeUpdateInput>;
  connect?: InputMaybe<AppTypeConnectInput>;
  disconnect?: InputMaybe<AppTypeDisconnectInput>;
  create?: InputMaybe<AppTypeRelationInput>;
  delete?: InputMaybe<AppTypeDeleteInput>;
  connectOrCreate?: InputMaybe<AppTypeConnectOrCreateInput>;
};


export type MutationCreateActionTypesArgs = {
  input: Array<ActionTypeCreateInput>;
};


export type MutationDeleteActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>;
  delete?: InputMaybe<ActionTypeDeleteInput>;
};


export type MutationUpdateActionTypesArgs = {
  where?: InputMaybe<ActionTypeWhere>;
  update?: InputMaybe<ActionTypeUpdateInput>;
  connect?: InputMaybe<ActionTypeConnectInput>;
  disconnect?: InputMaybe<ActionTypeDisconnectInput>;
  create?: InputMaybe<ActionTypeRelationInput>;
  delete?: InputMaybe<ActionTypeDeleteInput>;
  connectOrCreate?: InputMaybe<ActionTypeConnectOrCreateInput>;
};


export type MutationCreateCodeMirrorTypesArgs = {
  input: Array<CodeMirrorTypeCreateInput>;
};


export type MutationDeleteCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>;
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>;
};


export type MutationUpdateCodeMirrorTypesArgs = {
  where?: InputMaybe<CodeMirrorTypeWhere>;
  update?: InputMaybe<CodeMirrorTypeUpdateInput>;
  connect?: InputMaybe<CodeMirrorTypeConnectInput>;
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>;
  create?: InputMaybe<CodeMirrorTypeRelationInput>;
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>;
  connectOrCreate?: InputMaybe<CodeMirrorTypeConnectOrCreateInput>;
};


export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>;
};


export type MutationDeleteTagsArgs = {
  where?: InputMaybe<TagWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};


export type MutationUpdateTagsArgs = {
  where?: InputMaybe<TagWhere>;
  update?: InputMaybe<TagUpdateInput>;
  connect?: InputMaybe<TagConnectInput>;
  disconnect?: InputMaybe<TagDisconnectInput>;
  create?: InputMaybe<TagRelationInput>;
  delete?: InputMaybe<TagDeleteInput>;
  connectOrCreate?: InputMaybe<TagConnectOrCreateInput>;
};


export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>;
};


export type MutationDeleteElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};


export type MutationUpdateElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  update?: InputMaybe<ElementUpdateInput>;
  connect?: InputMaybe<ElementConnectInput>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
  create?: InputMaybe<ElementRelationInput>;
  delete?: InputMaybe<ElementDeleteInput>;
  connectOrCreate?: InputMaybe<ElementConnectOrCreateInput>;
};


export type MutationCreatePropsArgs = {
  input: Array<PropCreateInput>;
};


export type MutationDeletePropsArgs = {
  where?: InputMaybe<PropWhere>;
};


export type MutationUpdatePropsArgs = {
  where?: InputMaybe<PropWhere>;
  update?: InputMaybe<PropUpdateInput>;
};


export type MutationCreateHooksArgs = {
  input: Array<HookCreateInput>;
};


export type MutationDeleteHooksArgs = {
  where?: InputMaybe<HookWhere>;
  delete?: InputMaybe<HookDeleteInput>;
};


export type MutationUpdateHooksArgs = {
  where?: InputMaybe<HookWhere>;
  update?: InputMaybe<HookUpdateInput>;
  connect?: InputMaybe<HookConnectInput>;
  disconnect?: InputMaybe<HookDisconnectInput>;
  create?: InputMaybe<HookRelationInput>;
  delete?: InputMaybe<HookDeleteInput>;
  connectOrCreate?: InputMaybe<HookConnectOrCreateInput>;
};


export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>;
};


export type MutationDeleteComponentsArgs = {
  where?: InputMaybe<ComponentWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};


export type MutationUpdateComponentsArgs = {
  where?: InputMaybe<ComponentWhere>;
  update?: InputMaybe<ComponentUpdateInput>;
  connect?: InputMaybe<ComponentConnectInput>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
  create?: InputMaybe<ComponentRelationInput>;
  delete?: InputMaybe<ComponentDeleteInput>;
  connectOrCreate?: InputMaybe<ComponentConnectOrCreateInput>;
};


export type MutationCreateStoresArgs = {
  input: Array<StoreCreateInput>;
};


export type MutationDeleteStoresArgs = {
  where?: InputMaybe<StoreWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};


export type MutationUpdateStoresArgs = {
  where?: InputMaybe<StoreWhere>;
  update?: InputMaybe<StoreUpdateInput>;
  connect?: InputMaybe<StoreConnectInput>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
  create?: InputMaybe<StoreRelationInput>;
  delete?: InputMaybe<StoreDeleteInput>;
  connectOrCreate?: InputMaybe<StoreConnectOrCreateInput>;
};


export type MutationCreateCodeActionsArgs = {
  input: Array<CodeActionCreateInput>;
};


export type MutationDeleteCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>;
  delete?: InputMaybe<CodeActionDeleteInput>;
};


export type MutationUpdateCodeActionsArgs = {
  where?: InputMaybe<CodeActionWhere>;
  update?: InputMaybe<CodeActionUpdateInput>;
  connect?: InputMaybe<CodeActionConnectInput>;
  disconnect?: InputMaybe<CodeActionDisconnectInput>;
  create?: InputMaybe<CodeActionRelationInput>;
  delete?: InputMaybe<CodeActionDeleteInput>;
  connectOrCreate?: InputMaybe<CodeActionConnectOrCreateInput>;
};


export type MutationCreateApiActionsArgs = {
  input: Array<ApiActionCreateInput>;
};


export type MutationDeleteApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>;
  delete?: InputMaybe<ApiActionDeleteInput>;
};


export type MutationUpdateApiActionsArgs = {
  where?: InputMaybe<ApiActionWhere>;
  update?: InputMaybe<ApiActionUpdateInput>;
  connect?: InputMaybe<ApiActionConnectInput>;
  disconnect?: InputMaybe<ApiActionDisconnectInput>;
  create?: InputMaybe<ApiActionRelationInput>;
  delete?: InputMaybe<ApiActionDeleteInput>;
  connectOrCreate?: InputMaybe<ApiActionConnectOrCreateInput>;
};


export type MutationCreateResourcesArgs = {
  input: Array<ResourceCreateInput>;
};


export type MutationDeleteResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  delete?: InputMaybe<ResourceDeleteInput>;
};


export type MutationUpdateResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  update?: InputMaybe<ResourceUpdateInput>;
  connect?: InputMaybe<ResourceConnectInput>;
  disconnect?: InputMaybe<ResourceDisconnectInput>;
  create?: InputMaybe<ResourceRelationInput>;
  delete?: InputMaybe<ResourceDeleteInput>;
  connectOrCreate?: InputMaybe<ResourceConnectOrCreateInput>;
};

export enum ActionKind {
  /** Action with custom code */
  CodeAction = 'CodeAction',
  /** Action responsible for fetching data from a resource */
  ApiAction = 'ApiAction'
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
  AntDesignCard = 'AntDesignCard',
  AntDesignCardGrid = 'AntDesignCardGrid',
  AntDesignBreadcrumbSeparator = 'AntDesignBreadcrumbSeparator',
  AntDesignButton = 'AntDesignButton',
  AntDesignCalendar = 'AntDesignCalendar',
  AntDesignCollapsePanel = 'AntDesignCollapsePanel',
  AntDesignComment = 'AntDesignComment',
  AntDesignConfigProvider = 'AntDesignConfigProvider',
  AntDesignDatePicker = 'AntDesignDatePicker',
  AntDesignDescriptions = 'AntDesignDescriptions',
  AntDesignCheckbox = 'AntDesignCheckbox',
  AntDesignCheckboxGroup = 'AntDesignCheckboxGroup',
  AntDesignCollapse = 'AntDesignCollapse',
  AntDesignDropdown = 'AntDesignDropdown',
  AntDesignCardMeta = 'AntDesignCardMeta',
  AntDesignForm = 'AntDesignForm',
  AntDesignFormErrorList = 'AntDesignFormErrorList',
  AntDesignFormItem = 'AntDesignFormItem',
  AntDesignDivider = 'AntDesignDivider',
  AntDesignDrawer = 'AntDesignDrawer',
  AntDesignFormProvider = 'AntDesignFormProvider',
  AntDesignDropdownButton = 'AntDesignDropdownButton',
  AntDesignEmpty = 'AntDesignEmpty',
  AntDesignImage = 'AntDesignImage',
  AntDesignDescriptionsItem = 'AntDesignDescriptionsItem',
  AntDesignFormList = 'AntDesignFormList',
  AntDesignCascader = 'AntDesignCascader',
  AntDesignLayoutFooter = 'AntDesignLayoutFooter',
  AntDesignLayoutHeader = 'AntDesignLayoutHeader',
  AntDesignLayoutSider = 'AntDesignLayoutSider',
  AntDesignIcon = 'AntDesignIcon',
  AntDesignInput = 'AntDesignInput',
  AntDesignInputNumber = 'AntDesignInputNumber',
  AntDesignLayout = 'AntDesignLayout',
  AntDesignLayoutContent = 'AntDesignLayoutContent',
  AntDesignMentionsOption = 'AntDesignMentionsOption',
  AntDesignMenu = 'AntDesignMenu',
  AntDesignGridRow = 'AntDesignGridRow',
  AntDesignList = 'AntDesignList',
  AntDesignListItem = 'AntDesignListItem',
  AntDesignMessage = 'AntDesignMessage',
  AntDesignMentions = 'AntDesignMentions',
  AntDesignGridCol = 'AntDesignGridCol',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignNotification = 'AntDesignNotification',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignListItemMeta = 'AntDesignListItemMeta',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignResult = 'AntDesignResult',
  AntDesignModal = 'AntDesignModal',
  AntDesignSegmented = 'AntDesignSegmented',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignStatistic = 'AntDesignStatistic',
  AntDesignSteps = 'AntDesignSteps',
  AntDesignSelectOption = 'AntDesignSelectOption',
  AntDesignSkeleton = 'AntDesignSkeleton',
  AntDesignSlider = 'AntDesignSlider',
  AntDesignSpace = 'AntDesignSpace',
  AntDesignSpin = 'AntDesignSpin',
  AntDesignTag = 'AntDesignTag',
  AntDesignSelect = 'AntDesignSelect',
  AntDesignStepsStep = 'AntDesignStepsStep',
  AntDesignSwitch = 'AntDesignSwitch',
  AntDesignTable = 'AntDesignTable',
  AntDesignTabs = 'AntDesignTabs',
  AntDesignTabsTabPane = 'AntDesignTabsTabPane',
  AntDesignTreeSelect = 'AntDesignTreeSelect',
  AntDesignTimeline = 'AntDesignTimeline',
  AntDesignTimelineItem = 'AntDesignTimelineItem',
  AntDesignTooltip = 'AntDesignTooltip',
  AntDesignTransfer = 'AntDesignTransfer',
  AntDesignTree = 'AntDesignTree',
  AntDesignTimePicker = 'AntDesignTimePicker',
  AntDesignTypographyParagraph = 'AntDesignTypographyParagraph',
  AntDesignTypographyText = 'AntDesignTypographyText',
  AntDesignTypographyTitle = 'AntDesignTypographyTitle',
  AntDesignUpload = 'AntDesignUpload',
  AntDesignCarousel = 'AntDesignCarousel',
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
  GridLayout = 'GridLayout',
  HookGraphqlQuery = 'HookGraphqlQuery',
  HookGraphqlMutation = 'HookGraphqlMutation',
  HookRecoilState = 'HookRecoilState',
  HookRouter = 'HookRouter',
  HookQueryLambda = 'HookQueryLambda',
  HookQueryConfig = 'HookQueryConfig',
  HookQueryPages = 'HookQueryPages',
  HookQueryPage = 'HookQueryPage',
  ReactFragment = 'ReactFragment',
  HtmlA = 'HtmlA',
  HtmlAbbr = 'HtmlAbbr',
  HtmlArea = 'HtmlArea',
  HtmlArticle = 'HtmlArticle',
  HtmlAside = 'HtmlAside',
  HtmlAudio = 'HtmlAudio',
  HtmlB = 'HtmlB',
  HtmlBase = 'HtmlBase',
  HtmlBdo = 'HtmlBdo',
  HtmlBlockquote = 'HtmlBlockquote',
  HtmlBr = 'HtmlBr',
  HtmlButton = 'HtmlButton',
  HtmlCanvas = 'HtmlCanvas',
  HtmlCite = 'HtmlCite',
  HtmlCode = 'HtmlCode',
  HtmlCol = 'HtmlCol',
  HtmlDl = 'HtmlDl',
  HtmlData = 'HtmlData',
  HtmlDatalist = 'HtmlDatalist',
  HtmlDetails = 'HtmlDetails',
  HtmlDfn = 'HtmlDfn',
  HtmlDialog = 'HtmlDialog',
  HtmlDiv = 'HtmlDiv',
  HtmlEm = 'HtmlEm',
  HtmlEmbed = 'HtmlEmbed',
  HtmlFieldset = 'HtmlFieldset',
  HtmlFooter = 'HtmlFooter',
  HtmlForm = 'HtmlForm',
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
  HtmlImg = 'HtmlImg',
  HtmlInput = 'HtmlInput',
  HtmlKbd = 'HtmlKbd',
  HtmlLabel = 'HtmlLabel',
  HtmlLegend = 'HtmlLegend',
  HtmlLi = 'HtmlLi',
  HtmlLink = 'HtmlLink',
  HtmlMain = 'HtmlMain',
  HtmlMath = 'HtmlMath',
  HtmlMark = 'HtmlMark',
  HtmlMap = 'HtmlMap',
  HtmlMeta = 'HtmlMeta',
  HtmlMeter = 'HtmlMeter',
  HtmlNav = 'HtmlNav',
  HtmlNoscript = 'HtmlNoscript',
  HtmlOl = 'HtmlOl',
  HtmlObject = 'HtmlObject',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlOption = 'HtmlOption',
  HtmlOutput = 'HtmlOutput',
  HtmlP = 'HtmlP',
  HtmlParam = 'HtmlParam',
  HtmlPicture = 'HtmlPicture',
  HtmlPre = 'HtmlPre',
  HtmlProgress = 'HtmlProgress',
  HtmlQ = 'HtmlQ',
  HtmlRuby = 'HtmlRuby',
  HtmlS = 'HtmlS',
  HtmlSamp = 'HtmlSamp',
  HtmlScript = 'HtmlScript',
  HtmlSection = 'HtmlSection',
  HtmlSelect = 'HtmlSelect',
  HtmlSmall = 'HtmlSmall',
  HtmlSource = 'HtmlSource',
  HtmlSpan = 'HtmlSpan',
  HtmlStrong = 'HtmlStrong',
  HtmlStyle = 'HtmlStyle',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
  HtmlSvg = 'HtmlSvg',
  HtmlTable = 'HtmlTable',
  HtmlCaption = 'HtmlCaption',
  HtmlTd = 'HtmlTd',
  HtmlTh = 'HtmlTh',
  HtmlTr = 'HtmlTr',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTime = 'HtmlTime',
  HtmlTitle = 'HtmlTitle',
  HtmlTrack = 'HtmlTrack',
  HtmlU = 'HtmlU',
  HtmlUl = 'HtmlUl',
  HtmlVar = 'HtmlVar',
  HtmlVideo = 'HtmlVideo',
  HtmlWbr = 'HtmlWbr',
  ExternalComponent = 'ExternalComponent'
}

export enum CodeMirrorLanguage {
  Typescript = 'Typescript',
  Javascript = 'Javascript',
  Css = 'Css',
  Json = 'Json',
  Graphql = 'Graphql',
  CssInJs = 'CssInJs'
}

export enum ElementTypeKind {
  AllElements = 'AllElements',
  ChildrenOnly = 'ChildrenOnly',
  DescendantsOnly = 'DescendantsOnly',
  ExcludeDescendantsElements = 'ExcludeDescendantsElements'
}

export enum PageKind {
  Provider = 'Provider',
  InternalServerError = 'InternalServerError',
  NotFound = 'NotFound',
  Regular = 'Regular'
}

export enum PrimitiveTypeKind {
  String = 'String',
  Integer = 'Integer',
  Boolean = 'Boolean',
  Number = 'Number'
}

export enum RenderTypeKind {
  Atom = 'Atom',
  Component = 'Component'
}

export enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest'
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  ASC = 'ASC',
  /** Sort by field values in descending order. */
  DESC = 'DESC'
}

export enum TypeKind {
  PrimitiveType = 'PrimitiveType',
  EnumType = 'EnumType',
  ArrayType = 'ArrayType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  ElementType = 'ElementType',
  RenderPropType = 'RenderPropType',
  ReactNodeType = 'ReactNodeType',
  UnionType = 'UnionType',
  CodeMirrorType = 'CodeMirrorType',
  PageType = 'PageType',
  AppType = 'AppType',
  ActionType = 'ActionType'
}

export type AnyAction = ApiAction | CodeAction;

export type AnyType = PrimitiveType | ArrayType | UnionType | InterfaceType | ElementType | RenderPropType | ReactNodeType | EnumType | LambdaType | PageType | AppType | ActionType | CodeMirrorType;

export type BaseAction = {
  store: Store;
  element?: Maybe<Element>;
  storeConnection: BaseActionStoreConnection;
  elementConnection: BaseActionElementConnection;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: ActionKind;
};


export type BaseActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BaseActionElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BaseActionStoreConnectionArgs = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionStoreConnectionSort>>;
};


export type BaseActionElementConnectionArgs = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionElementConnectionSort>>;
};

export type IBaseType = {
  owner: User;
  ownerConnection: IBaseTypeOwnerConnection;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
};


export type IBaseTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IBaseTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type WithDescendants = {
  descendantTypesIds: Array<Scalars['ID']['output']>;
};

export type WithOwner = {
  owner: User;
  ownerConnection: WithOwnerOwnerConnection;
};

/** Allows picking a action from the list of actions */
export type ActionType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<ActionTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Allows picking a action from the list of actions */
export type ActionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a action from the list of actions */
export type ActionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a action from the list of actions */
export type ActionTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type ActionTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ActionTypeEdge = {
  cursor: Scalars['String']['output'];
  node: ActionType;
};

export type ActionTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ActionTypeEdge>;
};

export type ActionTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ActionTypeUserOwnerNodeAggregateSelection>;
};

export type ActionTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type ApiAction = BaseAction & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: ActionKind;
  store: Store;
  storeAggregate?: Maybe<ApiActionStoreStoreAggregationSelection>;
  element?: Maybe<Element>;
  elementAggregate?: Maybe<ApiActionElementElementAggregationSelection>;
  /** Response handlers */
  successAction?: Maybe<AnyAction>;
  errorAction?: Maybe<AnyAction>;
  /** Resource to fetch data from */
  resource: Resource;
  resourceAggregate?: Maybe<ApiActionResourceResourceAggregationSelection>;
  config: Prop;
  configAggregate?: Maybe<ApiActionPropConfigAggregationSelection>;
  storeConnection: BaseActionStoreConnection;
  elementConnection: BaseActionElementConnection;
  successActionConnection: ApiActionSuccessActionConnection;
  errorActionConnection: ApiActionErrorActionConnection;
  resourceConnection: ApiActionResourceConnection;
  configConnection: ApiActionConfigConnection;
};


export type ApiActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionSuccessActionArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionErrorActionArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionResourceArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionResourceAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionConfigArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionStoreConnectionArgs = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionStoreConnectionSort>>;
};


export type ApiActionElementConnectionArgs = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionElementConnectionSort>>;
};


export type ApiActionSuccessActionConnectionArgs = {
  where?: InputMaybe<ApiActionSuccessActionConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionErrorActionConnectionArgs = {
  where?: InputMaybe<ApiActionErrorActionConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiActionResourceConnectionArgs = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ApiActionResourceConnectionSort>>;
};


export type ApiActionConfigConnectionArgs = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ApiActionConfigConnectionSort>>;
};

export type ApiActionAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ApiActionConfigConnection = {
  edges: Array<ApiActionConfigRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ApiActionConfigRelationship = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type ApiActionEdge = {
  cursor: Scalars['String']['output'];
  node: ApiAction;
};

export type ApiActionElementElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ApiActionElementElementNodeAggregateSelection>;
};

export type ApiActionElementElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ApiActionErrorActionConnection = {
  edges: Array<ApiActionErrorActionRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ApiActionErrorActionRelationship = {
  cursor: Scalars['String']['output'];
  node: AnyAction;
};

export type ApiActionPropConfigAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ApiActionPropConfigNodeAggregateSelection>;
};

export type ApiActionPropConfigNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ApiActionResourceConnection = {
  edges: Array<ApiActionResourceRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ApiActionResourceRelationship = {
  cursor: Scalars['String']['output'];
  node: Resource;
};

export type ApiActionResourceResourceAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ApiActionResourceResourceNodeAggregateSelection>;
};

export type ApiActionResourceResourceNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ApiActionsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ApiActionEdge>;
};

export type ApiActionStoreStoreAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ApiActionStoreStoreNodeAggregateSelection>;
};

export type ApiActionStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ApiActionSuccessActionConnection = {
  edges: Array<ApiActionSuccessActionRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ApiActionSuccessActionRelationship = {
  cursor: Scalars['String']['output'];
  node: AnyAction;
};

export type App = WithOwner & {
  id: Scalars['ID']['output'];
  _compoundName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  owner: User;
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>;
  pages: Array<Page>;
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>;
  domains: Array<Domain>;
  domainsAggregate?: Maybe<AppDomainDomainsAggregationSelection>;
  ownerConnection: WithOwnerOwnerConnection;
  pagesConnection: AppPagesConnection;
  domainsConnection: AppDomainsConnection;
};


export type AppOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppPagesArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  options?: InputMaybe<DomainOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AppOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};


export type AppPagesConnectionArgs = {
  where?: InputMaybe<AppPagesConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AppPagesConnectionSort>>;
};


export type AppDomainsConnectionArgs = {
  where?: InputMaybe<AppDomainsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AppDomainsConnectionSort>>;
};

export type AppAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
};

export type AppDomainDomainsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AppDomainDomainsNodeAggregateSelection>;
};

export type AppDomainDomainsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AppDomainsConnection = {
  edges: Array<AppDomainsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AppDomainsRelationship = {
  cursor: Scalars['String']['output'];
  node: Domain;
};

export type AppEdge = {
  cursor: Scalars['String']['output'];
  node: App;
};

export type AppPagePagesAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AppPagePagesNodeAggregateSelection>;
};

export type AppPagePagesNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
  url: StringAggregateSelectionNonNullable;
};

export type AppPagesConnection = {
  edges: Array<AppPagesRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AppPagesRelationship = {
  cursor: Scalars['String']['output'];
  node: Page;
};

export type AppsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<AppEdge>;
};

/** Allows picking a app from the list of apps */
export type AppType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Allows picking a app from the list of apps */
export type AppTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a app from the list of apps */
export type AppTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a app from the list of apps */
export type AppTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type AppTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AppTypeEdge = {
  cursor: Scalars['String']['output'];
  node: AppType;
};

export type AppTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<AppTypeEdge>;
};

export type AppTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>;
};

export type AppTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type AppUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AppUserOwnerNodeAggregateSelection>;
};

export type AppUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = IBaseType & WithDescendants & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  descendantTypesIds: Array<Scalars['ID']['output']>;
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>;
  fieldRefs: Array<Field>;
  fieldRefsAggregate?: Maybe<ArrayTypeFieldFieldRefsAggregationSelection>;
  itemType: IBaseType;
  ownerConnection: IBaseTypeOwnerConnection;
  fieldRefsConnection: ArrayTypeFieldRefsConnection;
  itemTypeConnection: ArrayTypeItemTypeConnection;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeFieldRefsArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeFieldRefsAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeArgs = {
  options?: InputMaybe<IBaseTypeOptions>;
  where?: InputMaybe<IBaseTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeFieldRefsConnectionArgs = {
  where?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ArrayTypeFieldRefsConnectionSort>>;
};


/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeConnectionArgs = {
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ArrayTypeItemTypeConnectionSort>>;
};

export type ArrayTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ArrayTypeEdge = {
  cursor: Scalars['String']['output'];
  node: ArrayType;
};

export type ArrayTypeFieldFieldRefsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ArrayTypeFieldFieldRefsNodeAggregateSelection>;
};

export type ArrayTypeFieldFieldRefsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type ArrayTypeFieldRefsConnection = {
  edges: Array<ArrayTypeFieldRefsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ArrayTypeFieldRefsRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type ArrayTypeItemTypeConnection = {
  edges: Array<ArrayTypeItemTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ArrayTypeItemTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: IBaseType;
};

export type ArrayTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ArrayTypeEdge>;
};

export type ArrayTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ArrayTypeUserOwnerNodeAggregateSelection>;
};

export type ArrayTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Atom = WithOwner & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  externalJsSource?: Maybe<Scalars['String']['output']>;
  externalCssSource?: Maybe<Scalars['String']['output']>;
  externalSourceType?: Maybe<Scalars['String']['output']>;
  type: AtomType;
  owner: User;
  ownerAggregate?: Maybe<AtomUserOwnerAggregationSelection>;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>;
  api: InterfaceType;
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>;
  requiredParents: Array<Atom>;
  requiredParentsAggregate?: Maybe<AtomAtomRequiredParentsAggregationSelection>;
  suggestedChildren: Array<Atom>;
  suggestedChildrenAggregate?: Maybe<AtomAtomSuggestedChildrenAggregationSelection>;
  ownerConnection: WithOwnerOwnerConnection;
  tagsConnection: AtomTagsConnection;
  apiConnection: AtomApiConnection;
  requiredParentsConnection: AtomRequiredParentsConnection;
  suggestedChildrenConnection: AtomSuggestedChildrenConnection;
};


export type AtomOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomRequiredParentsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomRequiredParentsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomSuggestedChildrenArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomSuggestedChildrenAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AtomOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};


export type AtomTagsConnectionArgs = {
  where?: InputMaybe<AtomTagsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AtomTagsConnectionSort>>;
};


export type AtomApiConnectionArgs = {
  where?: InputMaybe<AtomApiConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AtomApiConnectionSort>>;
};


export type AtomRequiredParentsConnectionArgs = {
  where?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AtomRequiredParentsConnectionSort>>;
};


export type AtomSuggestedChildrenConnectionArgs = {
  where?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<AtomSuggestedChildrenConnectionSort>>;
};

export type AtomAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type AtomApiConnection = {
  edges: Array<AtomApiRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AtomApiRelationship = {
  cursor: Scalars['String']['output'];
  node: InterfaceType;
};

export type AtomAtomRequiredParentsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AtomAtomRequiredParentsNodeAggregateSelection>;
};

export type AtomAtomRequiredParentsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type AtomAtomSuggestedChildrenAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AtomAtomSuggestedChildrenNodeAggregateSelection>;
};

export type AtomAtomSuggestedChildrenNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type AtomEdge = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type AtomInterfaceTypeApiAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AtomInterfaceTypeApiNodeAggregateSelection>;
};

export type AtomInterfaceTypeApiNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AtomRequiredParentsConnection = {
  edges: Array<AtomRequiredParentsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AtomRequiredParentsRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type AtomsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<AtomEdge>;
};

export type AtomSuggestedChildrenConnection = {
  edges: Array<AtomSuggestedChildrenRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AtomSuggestedChildrenRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type AtomTagsConnection = {
  edges: Array<AtomTagsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type AtomTagsRelationship = {
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type AtomTagTagsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AtomTagTagsNodeAggregateSelection>;
};

export type AtomTagTagsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AtomUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<AtomUserOwnerNodeAggregateSelection>;
};

export type AtomUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type BaseActionElementConnection = {
  edges: Array<BaseActionElementRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type BaseActionElementRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type BaseActionStoreConnection = {
  edges: Array<BaseActionStoreRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type BaseActionStoreRelationship = {
  cursor: Scalars['String']['output'];
  node: Store;
};

export type BaseType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<BaseTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


export type BaseTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BaseTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BaseTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type BaseTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<BaseTypeUserOwnerNodeAggregateSelection>;
};

export type BaseTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type CodeAction = BaseAction & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Code to run when action is triggered */
  code: Scalars['String']['output'];
  type: ActionKind;
  store: Store;
  storeAggregate?: Maybe<CodeActionStoreStoreAggregationSelection>;
  element?: Maybe<Element>;
  elementAggregate?: Maybe<CodeActionElementElementAggregationSelection>;
  storeConnection: BaseActionStoreConnection;
  elementConnection: BaseActionElementConnection;
};


export type CodeActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CodeActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CodeActionElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CodeActionElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CodeActionStoreConnectionArgs = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionStoreConnectionSort>>;
};


export type CodeActionElementConnectionArgs = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<BaseActionElementConnectionSort>>;
};

export type CodeActionAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  code: StringAggregateSelectionNonNullable;
};

export type CodeActionEdge = {
  cursor: Scalars['String']['output'];
  node: CodeAction;
};

export type CodeActionElementElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<CodeActionElementElementNodeAggregateSelection>;
};

export type CodeActionElementElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type CodeActionsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<CodeActionEdge>;
};

export type CodeActionStoreStoreAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<CodeActionStoreStoreNodeAggregateSelection>;
};

export type CodeActionStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

/** Allows editing the value using a code mirror editor */
export type CodeMirrorType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  language: CodeMirrorLanguage;
  owner: User;
  ownerAggregate?: Maybe<CodeMirrorTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type CodeMirrorTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type CodeMirrorTypeEdge = {
  cursor: Scalars['String']['output'];
  node: CodeMirrorType;
};

export type CodeMirrorTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<CodeMirrorTypeEdge>;
};

export type CodeMirrorTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<CodeMirrorTypeUserOwnerNodeAggregateSelection>;
};

export type CodeMirrorTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Component = WithOwner & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  keyGenerator?: Maybe<Scalars['String']['output']>;
  rootElement: Element;
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>;
  api: InterfaceType;
  apiAggregate?: Maybe<ComponentInterfaceTypeApiAggregationSelection>;
  owner: User;
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>;
  store: Store;
  storeAggregate?: Maybe<ComponentStoreStoreAggregationSelection>;
  props: Prop;
  propsAggregate?: Maybe<ComponentPropPropsAggregationSelection>;
  childrenContainerElement: Element;
  childrenContainerElementAggregate?: Maybe<ComponentElementChildrenContainerElementAggregationSelection>;
  rootElementConnection: ComponentRootElementConnection;
  apiConnection: ComponentApiConnection;
  ownerConnection: WithOwnerOwnerConnection;
  storeConnection: ComponentStoreConnection;
  propsConnection: ComponentPropsConnection;
  childrenContainerElementConnection: ComponentChildrenContainerElementConnection;
};


export type ComponentRootElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentPropsArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentChildrenContainerElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentChildrenContainerElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentRootElementConnectionArgs = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ComponentRootElementConnectionSort>>;
};


export type ComponentApiConnectionArgs = {
  where?: InputMaybe<ComponentApiConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ComponentApiConnectionSort>>;
};


export type ComponentOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};


export type ComponentStoreConnectionArgs = {
  where?: InputMaybe<ComponentStoreConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ComponentStoreConnectionSort>>;
};


export type ComponentPropsConnectionArgs = {
  where?: InputMaybe<ComponentPropsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ComponentPropsConnectionSort>>;
};


export type ComponentChildrenContainerElementConnectionArgs = {
  where?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ComponentChildrenContainerElementConnectionSort>>;
};

export type ComponentAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  keyGenerator: StringAggregateSelectionNullable;
};

export type ComponentApiConnection = {
  edges: Array<ComponentApiRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ComponentApiRelationship = {
  cursor: Scalars['String']['output'];
  node: InterfaceType;
};

export type ComponentChildrenContainerElementConnection = {
  edges: Array<ComponentChildrenContainerElementRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ComponentChildrenContainerElementRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ComponentEdge = {
  cursor: Scalars['String']['output'];
  node: Component;
};

export type ComponentElementChildrenContainerElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentElementChildrenContainerElementNodeAggregateSelection>;
};

export type ComponentElementChildrenContainerElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ComponentElementRootElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentElementRootElementNodeAggregateSelection>;
};

export type ComponentElementRootElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ComponentInterfaceTypeApiAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentInterfaceTypeApiNodeAggregateSelection>;
};

export type ComponentInterfaceTypeApiNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ComponentPropPropsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentPropPropsNodeAggregateSelection>;
};

export type ComponentPropPropsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ComponentPropsConnection = {
  edges: Array<ComponentPropsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ComponentPropsRelationship = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type ComponentRootElementConnection = {
  edges: Array<ComponentRootElementRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ComponentRootElementRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ComponentsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ComponentEdge>;
};

export type ComponentStoreConnection = {
  edges: Array<ComponentStoreRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ComponentStoreRelationship = {
  cursor: Scalars['String']['output'];
  node: Store;
};

export type ComponentStoreStoreAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentStoreStoreNodeAggregateSelection>;
};

export type ComponentStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ComponentUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ComponentUserOwnerNodeAggregateSelection>;
};

export type ComponentUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type CreateActionTypesMutationResponse = {
  info: CreateInfo;
  actionTypes: Array<ActionType>;
};

export type CreateApiActionsMutationResponse = {
  info: CreateInfo;
  apiActions: Array<ApiAction>;
};

export type CreateAppsMutationResponse = {
  info: CreateInfo;
  apps: Array<App>;
};

export type CreateAppTypesMutationResponse = {
  info: CreateInfo;
  appTypes: Array<AppType>;
};

export type CreateArrayTypesMutationResponse = {
  info: CreateInfo;
  arrayTypes: Array<ArrayType>;
};

export type CreateAtomsMutationResponse = {
  info: CreateInfo;
  atoms: Array<Atom>;
};

export type CreateCodeActionsMutationResponse = {
  info: CreateInfo;
  codeActions: Array<CodeAction>;
};

export type CreateCodeMirrorTypesMutationResponse = {
  info: CreateInfo;
  codeMirrorTypes: Array<CodeMirrorType>;
};

export type CreateComponentsMutationResponse = {
  info: CreateInfo;
  components: Array<Component>;
};

export type CreateDomainsMutationResponse = {
  info: CreateInfo;
  domains: Array<Domain>;
};

export type CreateElementsMutationResponse = {
  info: CreateInfo;
  elements: Array<Element>;
};

export type CreateElementTypesMutationResponse = {
  info: CreateInfo;
  elementTypes: Array<ElementType>;
};

export type CreateEnumTypesMutationResponse = {
  info: CreateInfo;
  enumTypes: Array<EnumType>;
};

export type CreateEnumTypeValuesMutationResponse = {
  info: CreateInfo;
  enumTypeValues: Array<EnumTypeValue>;
};

export type CreateFieldsMutationResponse = {
  info: CreateInfo;
  fields: Array<Field>;
};

export type CreateGetBaseTypesReturnsMutationResponse = {
  info: CreateInfo;
  getBaseTypesReturns: Array<GetBaseTypesReturn>;
};

export type CreateHooksMutationResponse = {
  info: CreateInfo;
  hooks: Array<Hook>;
};

export type CreateInfo = {
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateInterfaceTypesMutationResponse = {
  info: CreateInfo;
  interfaceTypes: Array<InterfaceType>;
};

export type CreateLambdaTypesMutationResponse = {
  info: CreateInfo;
  lambdaTypes: Array<LambdaType>;
};

export type CreatePagesMutationResponse = {
  info: CreateInfo;
  pages: Array<Page>;
};

export type CreatePageTypesMutationResponse = {
  info: CreateInfo;
  pageTypes: Array<PageType>;
};

export type CreatePrimitiveTypesMutationResponse = {
  info: CreateInfo;
  primitiveTypes: Array<PrimitiveType>;
};

export type CreatePropsMutationResponse = {
  info: CreateInfo;
  props: Array<Prop>;
};

export type CreateReactNodeTypesMutationResponse = {
  info: CreateInfo;
  reactNodeTypes: Array<ReactNodeType>;
};

export type CreateRenderPropTypesMutationResponse = {
  info: CreateInfo;
  renderPropTypes: Array<RenderPropType>;
};

export type CreateResourcesMutationResponse = {
  info: CreateInfo;
  resources: Array<Resource>;
};

export type CreateStoresMutationResponse = {
  info: CreateInfo;
  stores: Array<Store>;
};

export type CreateTagsMutationResponse = {
  info: CreateInfo;
  tags: Array<Tag>;
};

export type CreateTypeReferencesMutationResponse = {
  info: CreateInfo;
  typeReferences: Array<TypeReference>;
};

export type CreateUnionTypesMutationResponse = {
  info: CreateInfo;
  unionTypes: Array<UnionType>;
};

export type CreateUsersMutationResponse = {
  info: CreateInfo;
  users: Array<User>;
};

export type DeleteInfo = {
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type Domain = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  domainConfig: VercelDomainConfig;
  projectDomain: VercelProjectDomain;
  app: App;
  appAggregate?: Maybe<DomainAppAppAggregationSelection>;
  appConnection: DomainAppConnection;
};


export type DomainAppArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DomainAppAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DomainAppConnectionArgs = {
  where?: InputMaybe<DomainAppConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<DomainAppConnectionSort>>;
};

export type DomainAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type DomainAppAppAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<DomainAppAppNodeAggregateSelection>;
};

export type DomainAppAppNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
};

export type DomainAppConnection = {
  edges: Array<DomainAppRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type DomainAppRelationship = {
  cursor: Scalars['String']['output'];
  node: App;
};

export type DomainEdge = {
  cursor: Scalars['String']['output'];
  node: Domain;
};

export type DomainsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<DomainEdge>;
};

export type Element = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  customCss?: Maybe<Scalars['String']['output']>;
  guiCss?: Maybe<Scalars['String']['output']>;
  propTransformationJs?: Maybe<Scalars['String']['output']>;
  renderForEachPropKey?: Maybe<Scalars['String']['output']>;
  renderIfExpression?: Maybe<Scalars['String']['output']>;
  renderType?: Maybe<RenderType>;
  descendantElements: Array<Element>;
  nextSibling?: Maybe<Element>;
  nextSiblingAggregate?: Maybe<ElementElementNextSiblingAggregationSelection>;
  prevSibling?: Maybe<Element>;
  prevSiblingAggregate?: Maybe<ElementElementPrevSiblingAggregationSelection>;
  firstChild?: Maybe<Element>;
  firstChildAggregate?: Maybe<ElementElementFirstChildAggregationSelection>;
  parent?: Maybe<Element>;
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>;
  page?: Maybe<Page>;
  pageAggregate?: Maybe<ElementPagePageAggregationSelection>;
  props: Prop;
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>;
  parentComponent?: Maybe<Component>;
  parentComponentAggregate?: Maybe<ElementComponentParentComponentAggregationSelection>;
  preRenderAction?: Maybe<BaseAction>;
  postRenderAction?: Maybe<BaseAction>;
  renderComponentType?: Maybe<Component>;
  renderComponentTypeAggregate?: Maybe<ElementComponentRenderComponentTypeAggregationSelection>;
  renderAtomType?: Maybe<Atom>;
  renderAtomTypeAggregate?: Maybe<ElementAtomRenderAtomTypeAggregationSelection>;
  nextSiblingConnection: ElementNextSiblingConnection;
  prevSiblingConnection: ElementPrevSiblingConnection;
  firstChildConnection: ElementFirstChildConnection;
  parentConnection: ElementParentConnection;
  pageConnection: ElementPageConnection;
  propsConnection: ElementPropsConnection;
  parentComponentConnection: ElementParentComponentConnection;
  preRenderActionConnection: ElementPreRenderActionConnection;
  postRenderActionConnection: ElementPostRenderActionConnection;
  renderComponentTypeConnection: ElementRenderComponentTypeConnection;
  renderAtomTypeConnection: ElementRenderAtomTypeConnection;
};


export type ElementNextSiblingArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementNextSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPrevSiblingArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPrevSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementFirstChildArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementFirstChildAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementParentArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementParentAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPageArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPageAggregateArgs = {
  where?: InputMaybe<PageWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPropsArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementParentComponentArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementParentComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPreRenderActionArgs = {
  options?: InputMaybe<BaseActionOptions>;
  where?: InputMaybe<BaseActionWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementPostRenderActionArgs = {
  options?: InputMaybe<BaseActionOptions>;
  where?: InputMaybe<BaseActionWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementRenderComponentTypeArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementRenderComponentTypeAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementRenderAtomTypeArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementRenderAtomTypeAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ElementNextSiblingConnectionArgs = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementNextSiblingConnectionSort>>;
};


export type ElementPrevSiblingConnectionArgs = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementPrevSiblingConnectionSort>>;
};


export type ElementFirstChildConnectionArgs = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementFirstChildConnectionSort>>;
};


export type ElementParentConnectionArgs = {
  where?: InputMaybe<ElementParentConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementParentConnectionSort>>;
};


export type ElementPageConnectionArgs = {
  where?: InputMaybe<ElementPageConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementPageConnectionSort>>;
};


export type ElementPropsConnectionArgs = {
  where?: InputMaybe<ElementPropsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementPropsConnectionSort>>;
};


export type ElementParentComponentConnectionArgs = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementParentComponentConnectionSort>>;
};


export type ElementPreRenderActionConnectionArgs = {
  where?: InputMaybe<ElementPreRenderActionConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementPreRenderActionConnectionSort>>;
};


export type ElementPostRenderActionConnectionArgs = {
  where?: InputMaybe<ElementPostRenderActionConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementPostRenderActionConnectionSort>>;
};


export type ElementRenderComponentTypeConnectionArgs = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementRenderComponentTypeConnectionSort>>;
};


export type ElementRenderAtomTypeConnectionArgs = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ElementRenderAtomTypeConnectionSort>>;
};

export type ElementAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ElementAtomRenderAtomTypeAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementAtomRenderAtomTypeNodeAggregateSelection>;
};

export type ElementAtomRenderAtomTypeNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type ElementComponentParentComponentAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementComponentParentComponentNodeAggregateSelection>;
};

export type ElementComponentParentComponentNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  keyGenerator: StringAggregateSelectionNullable;
};

export type ElementComponentRenderComponentTypeAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementComponentRenderComponentTypeNodeAggregateSelection>;
};

export type ElementComponentRenderComponentTypeNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  keyGenerator: StringAggregateSelectionNullable;
};

export type ElementEdge = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ElementElementFirstChildAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementElementFirstChildNodeAggregateSelection>;
};

export type ElementElementFirstChildNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ElementElementNextSiblingAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementElementNextSiblingNodeAggregateSelection>;
};

export type ElementElementNextSiblingNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ElementElementParentAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementElementParentNodeAggregateSelection>;
};

export type ElementElementParentNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ElementElementPrevSiblingAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementElementPrevSiblingNodeAggregateSelection>;
};

export type ElementElementPrevSiblingNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type ElementFirstChildConnection = {
  edges: Array<ElementFirstChildRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementFirstChildRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ElementNextSiblingConnection = {
  edges: Array<ElementNextSiblingRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementNextSiblingRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ElementPageConnection = {
  edges: Array<ElementPageRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementPagePageAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementPagePageNodeAggregateSelection>;
};

export type ElementPagePageNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
  url: StringAggregateSelectionNonNullable;
};

export type ElementPageRelationship = {
  cursor: Scalars['String']['output'];
  node: Page;
};

export type ElementParentComponentConnection = {
  edges: Array<ElementParentComponentRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementParentComponentRelationship = {
  cursor: Scalars['String']['output'];
  node: Component;
};

export type ElementParentConnection = {
  edges: Array<ElementParentRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementParentRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ElementPostRenderActionConnection = {
  edges: Array<ElementPostRenderActionRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementPostRenderActionRelationship = {
  cursor: Scalars['String']['output'];
  node: BaseAction;
};

export type ElementPreRenderActionConnection = {
  edges: Array<ElementPreRenderActionRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementPreRenderActionRelationship = {
  cursor: Scalars['String']['output'];
  node: BaseAction;
};

export type ElementPrevSiblingConnection = {
  edges: Array<ElementPrevSiblingRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementPrevSiblingRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type ElementPropPropsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementPropPropsNodeAggregateSelection>;
};

export type ElementPropPropsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ElementPropsConnection = {
  edges: Array<ElementPropsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementPropsRelationship = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type ElementRenderAtomTypeConnection = {
  edges: Array<ElementRenderAtomTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementRenderAtomTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type ElementRenderComponentTypeConnection = {
  edges: Array<ElementRenderComponentTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ElementRenderComponentTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: Component;
};

export type ElementsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ElementEdge>;
};

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind;
  owner: User;
  ownerAggregate?: Maybe<ElementTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ElementTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type ElementTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ElementTypeEdge = {
  cursor: Scalars['String']['output'];
  node: ElementType;
};

export type ElementTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ElementTypeEdge>;
};

export type ElementTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>;
};

export type ElementTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>;
  fieldRefs: Array<Field>;
  fieldRefsAggregate?: Maybe<EnumTypeFieldFieldRefsAggregationSelection>;
  allowedValues: Array<EnumTypeValue>;
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
  fieldRefsConnection: EnumTypeFieldRefsConnection;
  allowedValuesConnection: EnumTypeAllowedValuesConnection;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeFieldRefsArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeFieldRefsAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  options?: InputMaybe<EnumTypeValueOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeFieldRefsConnectionArgs = {
  where?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<EnumTypeFieldRefsConnectionSort>>;
};


/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesConnectionArgs = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<EnumTypeAllowedValuesConnectionSort>>;
};

export type EnumTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type EnumTypeAllowedValuesConnection = {
  edges: Array<EnumTypeAllowedValuesRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type EnumTypeAllowedValuesRelationship = {
  cursor: Scalars['String']['output'];
  node: EnumTypeValue;
};

export type EnumTypeEdge = {
  cursor: Scalars['String']['output'];
  node: EnumType;
};

export type EnumTypeEnumTypeValueAllowedValuesAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection>;
};

export type EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNonNullable;
};

export type EnumTypeFieldFieldRefsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<EnumTypeFieldFieldRefsNodeAggregateSelection>;
};

export type EnumTypeFieldFieldRefsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type EnumTypeFieldRefsConnection = {
  edges: Array<EnumTypeFieldRefsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type EnumTypeFieldRefsRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type EnumTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<EnumTypeEdge>;
};

export type EnumTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>;
};

export type EnumTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type EnumTypeValue = {
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
  enumType?: Maybe<EnumType>;
  enumTypeAggregate?: Maybe<EnumTypeValueEnumTypeEnumTypeAggregationSelection>;
  enumTypeConnection: EnumTypeValueEnumTypeConnection;
};


export type EnumTypeValueEnumTypeArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  options?: InputMaybe<EnumTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type EnumTypeValueEnumTypeAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type EnumTypeValueEnumTypeConnectionArgs = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionSort>>;
};

export type EnumTypeValueAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNonNullable;
};

export type EnumTypeValueEdge = {
  cursor: Scalars['String']['output'];
  node: EnumTypeValue;
};

export type EnumTypeValueEnumTypeConnection = {
  edges: Array<EnumTypeValueEnumTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type EnumTypeValueEnumTypeEnumTypeAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection>;
};

export type EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type EnumTypeValueEnumTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: EnumType;
};

export type EnumTypeValuesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<EnumTypeValueEdge>;
};

export type Field = {
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  validationRules?: Maybe<Scalars['String']['output']>;
  defaultValues?: Maybe<Scalars['String']['output']>;
  nextSibling?: Maybe<Field>;
  nextSiblingAggregate?: Maybe<FieldFieldNextSiblingAggregationSelection>;
  prevSibling?: Maybe<Field>;
  prevSiblingAggregate?: Maybe<FieldFieldPrevSiblingAggregationSelection>;
  fieldType: IBaseType;
  api: InterfaceType;
  apiAggregate?: Maybe<FieldInterfaceTypeApiAggregationSelection>;
  nextSiblingConnection: FieldNextSiblingConnection;
  prevSiblingConnection: FieldPrevSiblingConnection;
  fieldTypeConnection: FieldFieldTypeConnection;
  apiConnection: FieldApiConnection;
};


export type FieldNextSiblingArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldNextSiblingAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldPrevSiblingArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldPrevSiblingAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldFieldTypeArgs = {
  options?: InputMaybe<IBaseTypeOptions>;
  where?: InputMaybe<IBaseTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type FieldNextSiblingConnectionArgs = {
  where?: InputMaybe<FieldNextSiblingConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<FieldNextSiblingConnectionSort>>;
};


export type FieldPrevSiblingConnectionArgs = {
  where?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<FieldPrevSiblingConnectionSort>>;
};


export type FieldFieldTypeConnectionArgs = {
  where?: InputMaybe<FieldFieldTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<FieldFieldTypeConnectionSort>>;
};


export type FieldApiConnectionArgs = {
  where?: InputMaybe<FieldApiConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<FieldApiConnectionSort>>;
};

export type FieldAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type FieldApiConnection = {
  edges: Array<FieldApiRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type FieldApiRelationship = {
  cursor: Scalars['String']['output'];
  node: InterfaceType;
};

export type FieldEdge = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type FieldFieldNextSiblingAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<FieldFieldNextSiblingNodeAggregateSelection>;
};

export type FieldFieldNextSiblingNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type FieldFieldPrevSiblingAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<FieldFieldPrevSiblingNodeAggregateSelection>;
};

export type FieldFieldPrevSiblingNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type FieldFieldTypeConnection = {
  edges: Array<FieldFieldTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type FieldFieldTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: IBaseType;
};

export type FieldInterfaceTypeApiAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<FieldInterfaceTypeApiNodeAggregateSelection>;
};

export type FieldInterfaceTypeApiNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type FieldNextSiblingConnection = {
  edges: Array<FieldNextSiblingRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type FieldNextSiblingRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type FieldPrevSiblingConnection = {
  edges: Array<FieldPrevSiblingRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type FieldPrevSiblingRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type FieldsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<FieldEdge>;
};

export type GetBaseTypesReturn = {
  totalCount: Scalars['Int']['output'];
  items: Array<BaseType>;
};

export type GetBaseTypesReturnAggregateSelection = {
  count: Scalars['Int']['output'];
  totalCount: IntAggregateSelectionNonNullable;
};

export type GetBaseTypesReturnEdge = {
  cursor: Scalars['String']['output'];
  node: GetBaseTypesReturn;
};

export type GetBaseTypesReturnsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<GetBaseTypesReturnEdge>;
};

export type Hook = {
  id: Scalars['ID']['output'];
  type: AtomType;
  config: Prop;
  configAggregate?: Maybe<HookPropConfigAggregationSelection>;
  element: Element;
  elementAggregate?: Maybe<HookElementElementAggregationSelection>;
  configConnection: HookConfigConnection;
  elementConnection: HookElementConnection;
};


export type HookConfigArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type HookConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type HookElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type HookElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type HookConfigConnectionArgs = {
  where?: InputMaybe<HookConfigConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<HookConfigConnectionSort>>;
};


export type HookElementConnectionArgs = {
  where?: InputMaybe<HookElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<HookElementConnectionSort>>;
};

export type HookAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
};

export type HookConfigConnection = {
  edges: Array<HookConfigRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type HookConfigRelationship = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type HookEdge = {
  cursor: Scalars['String']['output'];
  node: Hook;
};

export type HookElementConnection = {
  edges: Array<HookElementRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type HookElementElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<HookElementElementNodeAggregateSelection>;
};

export type HookElementElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type HookElementRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type HookPropConfigAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<HookPropConfigNodeAggregateSelection>;
};

export type HookPropConfigNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type HooksConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<HookEdge>;
};

export type IBaseTypeOwnerConnection = {
  edges: Array<IBaseTypeOwnerRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type IBaseTypeOwnerRelationship = {
  cursor: Scalars['String']['output'];
  node: User;
};

export type IdAggregateSelectionNonNullable = {
  shortest: Scalars['ID']['output'];
  longest: Scalars['ID']['output'];
};

export type IntAggregateSelectionNonNullable = {
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
  average: Scalars['Float']['output'];
  sum: Scalars['Int']['output'];
};

/** Represents an object type with multiple fields */
export type InterfaceType = IBaseType & WithDescendants & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  descendantTypesIds: Array<Scalars['ID']['output']>;
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>;
  fieldRefs: Array<Field>;
  fieldRefsAggregate?: Maybe<InterfaceTypeFieldFieldRefsAggregationSelection>;
  apiOfAtoms: Array<Atom>;
  apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>;
  fields: Array<Field>;
  fieldsAggregate?: Maybe<InterfaceTypeFieldFieldsAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
  fieldRefsConnection: InterfaceTypeFieldRefsConnection;
  apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection;
  fieldsConnection: InterfaceTypeFieldsConnection;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldRefsArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldRefsAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsArgs = {
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsAggregateArgs = {
  where?: InputMaybe<FieldWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldRefsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InterfaceTypeFieldRefsConnectionSort>>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionSort>>;
};


/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InterfaceTypeFieldsConnectionSort>>;
};

export type InterfaceTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type InterfaceTypeApiOfAtomsConnection = {
  edges: Array<InterfaceTypeApiOfAtomsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type InterfaceTypeApiOfAtomsRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type InterfaceTypeAtomApiOfAtomsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<InterfaceTypeAtomApiOfAtomsNodeAggregateSelection>;
};

export type InterfaceTypeAtomApiOfAtomsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type InterfaceTypeEdge = {
  cursor: Scalars['String']['output'];
  node: InterfaceType;
};

export type InterfaceTypeFieldFieldRefsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<InterfaceTypeFieldFieldRefsNodeAggregateSelection>;
};

export type InterfaceTypeFieldFieldRefsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type InterfaceTypeFieldFieldsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<InterfaceTypeFieldFieldsNodeAggregateSelection>;
};

export type InterfaceTypeFieldFieldsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  key: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  description: StringAggregateSelectionNullable;
  validationRules: StringAggregateSelectionNullable;
  defaultValues: StringAggregateSelectionNullable;
};

export type InterfaceTypeFieldRefsConnection = {
  edges: Array<InterfaceTypeFieldRefsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type InterfaceTypeFieldRefsRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type InterfaceTypeFieldsConnection = {
  edges: Array<InterfaceTypeFieldsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type InterfaceTypeFieldsRelationship = {
  cursor: Scalars['String']['output'];
  node: Field;
};

export type InterfaceTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<InterfaceTypeEdge>;
};

export type InterfaceTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<InterfaceTypeUserOwnerNodeAggregateSelection>;
};

export type InterfaceTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/** Allows picking a lambda */
export type LambdaType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Allows picking a lambda */
export type LambdaTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a lambda */
export type LambdaTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a lambda */
export type LambdaTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type LambdaTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type LambdaTypeEdge = {
  cursor: Scalars['String']['output'];
  node: LambdaType;
};

export type LambdaTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<LambdaTypeEdge>;
};

export type LambdaTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>;
};

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Page = {
  id: Scalars['ID']['output'];
  _compoundName: Scalars['String']['output'];
  url: Scalars['String']['output'];
  kind: PageKind;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  rootElement: Element;
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>;
  app: App;
  appAggregate?: Maybe<PageAppAppAggregationSelection>;
  store: Store;
  storeAggregate?: Maybe<PageStoreStoreAggregationSelection>;
  pageContentContainer?: Maybe<Element>;
  pageContentContainerAggregate?: Maybe<PageElementPageContentContainerAggregationSelection>;
  rootElementConnection: PageRootElementConnection;
  appConnection: PageAppConnection;
  storeConnection: PageStoreConnection;
  pageContentContainerConnection: PagePageContentContainerConnection;
};


export type PageRootElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageAppArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageAppAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PagePageContentContainerArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PagePageContentContainerAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageRootElementConnectionArgs = {
  where?: InputMaybe<PageRootElementConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<PageRootElementConnectionSort>>;
};


export type PageAppConnectionArgs = {
  where?: InputMaybe<PageAppConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<PageAppConnectionSort>>;
};


export type PageStoreConnectionArgs = {
  where?: InputMaybe<PageStoreConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<PageStoreConnectionSort>>;
};


export type PagePageContentContainerConnectionArgs = {
  where?: InputMaybe<PagePageContentContainerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<PagePageContentContainerConnectionSort>>;
};

export type PageAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
  url: StringAggregateSelectionNonNullable;
};

export type PageAppAppAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PageAppAppNodeAggregateSelection>;
};

export type PageAppAppNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
};

export type PageAppConnection = {
  edges: Array<PageAppRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type PageAppRelationship = {
  cursor: Scalars['String']['output'];
  node: App;
};

export type PageEdge = {
  cursor: Scalars['String']['output'];
  node: Page;
};

export type PageElementPageContentContainerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PageElementPageContentContainerNodeAggregateSelection>;
};

export type PageElementPageContentContainerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type PageElementRootElementAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PageElementRootElementNodeAggregateSelection>;
};

export type PageElementRootElementNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

/** Pagination information (Relay) */
export type PageInfo = {
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  endCursor?: Maybe<Scalars['String']['output']>;
};

export type PagePageContentContainerConnection = {
  edges: Array<PagePageContentContainerRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type PagePageContentContainerRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type PageRootElementConnection = {
  edges: Array<PageRootElementRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type PageRootElementRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type PagesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<PageEdge>;
};

export type PageStoreConnection = {
  edges: Array<PageStoreRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type PageStoreRelationship = {
  cursor: Scalars['String']['output'];
  node: Store;
};

export type PageStoreStoreAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PageStoreStoreNodeAggregateSelection>;
};

export type PageStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

/** Allows picking a page from the list of pages */
export type PageType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Allows picking a page from the list of pages */
export type PageTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a page from the list of pages */
export type PageTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking a page from the list of pages */
export type PageTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type PageTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PageTypeEdge = {
  cursor: Scalars['String']['output'];
  node: PageType;
};

export type PageTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<PageTypeEdge>;
};

export type PageTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>;
};

export type PageTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  primitiveKind: PrimitiveTypeKind;
  owner: User;
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type PrimitiveTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PrimitiveTypeEdge = {
  cursor: Scalars['String']['output'];
  node: PrimitiveType;
};

export type PrimitiveTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<PrimitiveTypeEdge>;
};

export type PrimitiveTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>;
};

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Prop = {
  id: Scalars['ID']['output'];
  data: Scalars['String']['output'];
};

export type PropAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type PropEdge = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type PropsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<PropEdge>;
};

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<ReactNodeTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a React node: `ReactNode`
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type ReactNodeTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type ReactNodeTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ReactNodeTypeEdge = {
  cursor: Scalars['String']['output'];
  node: ReactNodeType;
};

export type ReactNodeTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ReactNodeTypeEdge>;
};

export type ReactNodeTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>;
};

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropType = IBaseType & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<RenderPropTypeUserOwnerAggregationSelection>;
  ownerConnection: IBaseTypeOwnerConnection;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * Allows picking a Component from the list of components.
 * It is passed to the rendered element as a function that takes props as input
 * and returns a React element: '(props) => ReactNode'
 * Prop values for this type have the shape of TypedValue in order to
 * be distinguished from other element types.
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};

export type RenderPropTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type RenderPropTypeEdge = {
  cursor: Scalars['String']['output'];
  node: RenderPropType;
};

export type RenderPropTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<RenderPropTypeEdge>;
};

export type RenderPropTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<RenderPropTypeUserOwnerNodeAggregateSelection>;
};

export type RenderPropTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type RenderType = {
  id: Scalars['ID']['output'];
  kind: RenderTypeKind;
};

export type ResetDatabaseMutationResponse = {
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Resource = WithOwner & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: ResourceType;
  config: Prop;
  configAggregate?: Maybe<ResourcePropConfigAggregationSelection>;
  owner: User;
  ownerAggregate?: Maybe<ResourceUserOwnerAggregationSelection>;
  configConnection: ResourceConfigConnection;
  ownerConnection: WithOwnerOwnerConnection;
};


export type ResourceConfigArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ResourceConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ResourceOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ResourceOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ResourceConfigConnectionArgs = {
  where?: InputMaybe<ResourceConfigConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ResourceConfigConnectionSort>>;
};


export type ResourceOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};

export type ResourceAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ResourceConfigConnection = {
  edges: Array<ResourceConfigRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type ResourceConfigRelationship = {
  cursor: Scalars['String']['output'];
  node: Prop;
};

export type ResourceEdge = {
  cursor: Scalars['String']['output'];
  node: Resource;
};

export type ResourcePropConfigAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ResourcePropConfigNodeAggregateSelection>;
};

export type ResourcePropConfigNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ResourcesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<ResourceEdge>;
};

export type ResourceUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<ResourceUserOwnerNodeAggregateSelection>;
};

export type ResourceUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Store = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  api: InterfaceType;
  apiAggregate?: Maybe<StoreInterfaceTypeApiAggregationSelection>;
  actions: Array<AnyAction>;
  component?: Maybe<Component>;
  componentAggregate?: Maybe<StoreComponentComponentAggregationSelection>;
  page?: Maybe<Page>;
  pageAggregate?: Maybe<StorePagePageAggregationSelection>;
  apiConnection: StoreApiConnection;
  actionsConnection: StoreActionsConnection;
  componentConnection: StoreComponentConnection;
  pageConnection: StorePageConnection;
};


export type StoreApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreActionsArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreComponentArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StorePageArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StorePageAggregateArgs = {
  where?: InputMaybe<PageWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreApiConnectionArgs = {
  where?: InputMaybe<StoreApiConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<StoreApiConnectionSort>>;
};


export type StoreActionsConnectionArgs = {
  where?: InputMaybe<StoreActionsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StoreComponentConnectionArgs = {
  where?: InputMaybe<StoreComponentConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<StoreComponentConnectionSort>>;
};


export type StorePageConnectionArgs = {
  where?: InputMaybe<StorePageConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<StorePageConnectionSort>>;
};

export type StoreActionsConnection = {
  edges: Array<StoreActionsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type StoreActionsRelationship = {
  cursor: Scalars['String']['output'];
  node: AnyAction;
};

export type StoreAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type StoreApiConnection = {
  edges: Array<StoreApiRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type StoreApiRelationship = {
  cursor: Scalars['String']['output'];
  node: InterfaceType;
};

export type StoreComponentComponentAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<StoreComponentComponentNodeAggregateSelection>;
};

export type StoreComponentComponentNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  keyGenerator: StringAggregateSelectionNullable;
};

export type StoreComponentConnection = {
  edges: Array<StoreComponentRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type StoreComponentRelationship = {
  cursor: Scalars['String']['output'];
  node: Component;
};

export type StoreEdge = {
  cursor: Scalars['String']['output'];
  node: Store;
};

export type StoreInterfaceTypeApiAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<StoreInterfaceTypeApiNodeAggregateSelection>;
};

export type StoreInterfaceTypeApiNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type StorePageConnection = {
  edges: Array<StorePageRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type StorePagePageAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<StorePagePageNodeAggregateSelection>;
};

export type StorePagePageNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
  url: StringAggregateSelectionNonNullable;
};

export type StorePageRelationship = {
  cursor: Scalars['String']['output'];
  node: Page;
};

export type StoresConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<StoreEdge>;
};

export type StringAggregateSelectionNonNullable = {
  shortest: Scalars['String']['output'];
  longest: Scalars['String']['output'];
};

export type StringAggregateSelectionNullable = {
  shortest?: Maybe<Scalars['String']['output']>;
  longest?: Maybe<Scalars['String']['output']>;
};

export type Tag = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  isRoot?: Maybe<Scalars['Boolean']['output']>;
  descendants: Array<Tag>;
  parent?: Maybe<Tag>;
  parentAggregate?: Maybe<TagTagParentAggregationSelection>;
  children: Array<Tag>;
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>;
  owner: User;
  ownerAggregate?: Maybe<TagUserOwnerAggregationSelection>;
  atoms: Array<Atom>;
  atomsAggregate?: Maybe<TagAtomAtomsAggregationSelection>;
  parentConnection: TagParentConnection;
  childrenConnection: TagChildrenConnection;
  ownerConnection: TagOwnerConnection;
  atomsConnection: TagAtomsConnection;
};


export type TagParentArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagParentAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagChildrenArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagChildrenAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TagParentConnectionArgs = {
  where?: InputMaybe<TagParentConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<TagParentConnectionSort>>;
};


export type TagChildrenConnectionArgs = {
  where?: InputMaybe<TagChildrenConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<TagChildrenConnectionSort>>;
};


export type TagOwnerConnectionArgs = {
  where?: InputMaybe<TagOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<TagOwnerConnectionSort>>;
};


export type TagAtomsConnectionArgs = {
  where?: InputMaybe<TagAtomsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<TagAtomsConnectionSort>>;
};

export type TagAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagAtomAtomsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<TagAtomAtomsNodeAggregateSelection>;
};

export type TagAtomAtomsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type TagAtomsConnection = {
  edges: Array<TagAtomsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type TagAtomsRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type TagChildrenConnection = {
  edges: Array<TagChildrenRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type TagChildrenRelationship = {
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type TagEdge = {
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type TagOwnerConnection = {
  edges: Array<TagOwnerRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type TagOwnerRelationship = {
  cursor: Scalars['String']['output'];
  node: User;
};

export type TagParentConnection = {
  edges: Array<TagParentRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type TagParentRelationship = {
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type TagsConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<TagEdge>;
};

export type TagTagChildrenAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<TagTagChildrenNodeAggregateSelection>;
};

export type TagTagChildrenNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagTagParentAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<TagTagParentNodeAggregateSelection>;
};

export type TagTagParentNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<TagUserOwnerNodeAggregateSelection>;
};

export type TagUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type TypeReference = {
  /** The name of the resource referencing the type */
  name: Scalars['String']['output'];
  /** The type of resource - Atom, InterfaceType, etc. */
  label: Scalars['String']['output'];
};

export type TypeReferenceAggregateSelection = {
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type TypeReferenceEdge = {
  cursor: Scalars['String']['output'];
  node: TypeReference;
};

export type TypeReferencesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<TypeReferenceEdge>;
};

/** Allows picking one of a set of types */
export type UnionType = IBaseType & WithDescendants & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  descendantTypesIds: Array<Scalars['ID']['output']>;
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>;
  typesOfUnionType: Array<AnyType>;
  ownerConnection: IBaseTypeOwnerConnection;
  typesOfUnionTypeConnection: UnionTypeTypesOfUnionTypeConnection;
};


/** Allows picking one of a set of types */
export type UnionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking one of a set of types */
export type UnionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<IBaseTypeOwnerConnectionSort>>;
};


/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UnionTypeAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UnionTypeEdge = {
  cursor: Scalars['String']['output'];
  node: UnionType;
};

export type UnionTypesConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<UnionTypeEdge>;
};

export type UnionTypeTypesOfUnionTypeConnection = {
  edges: Array<UnionTypeTypesOfUnionTypeRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UnionTypeTypesOfUnionTypeRelationship = {
  cursor: Scalars['String']['output'];
  node: AnyType;
};

export type UnionTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UnionTypeUserOwnerNodeAggregateSelection>;
};

export type UnionTypeUserOwnerNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UpdateActionTypesMutationResponse = {
  info: UpdateInfo;
  actionTypes: Array<ActionType>;
};

export type UpdateApiActionsMutationResponse = {
  info: UpdateInfo;
  apiActions: Array<ApiAction>;
};

export type UpdateAppsMutationResponse = {
  info: UpdateInfo;
  apps: Array<App>;
};

export type UpdateAppTypesMutationResponse = {
  info: UpdateInfo;
  appTypes: Array<AppType>;
};

export type UpdateArrayTypesMutationResponse = {
  info: UpdateInfo;
  arrayTypes: Array<ArrayType>;
};

export type UpdateAtomsMutationResponse = {
  info: UpdateInfo;
  atoms: Array<Atom>;
};

export type UpdateCodeActionsMutationResponse = {
  info: UpdateInfo;
  codeActions: Array<CodeAction>;
};

export type UpdateCodeMirrorTypesMutationResponse = {
  info: UpdateInfo;
  codeMirrorTypes: Array<CodeMirrorType>;
};

export type UpdateComponentsMutationResponse = {
  info: UpdateInfo;
  components: Array<Component>;
};

export type UpdateDomainsMutationResponse = {
  info: UpdateInfo;
  domains: Array<Domain>;
};

export type UpdateElementsMutationResponse = {
  info: UpdateInfo;
  elements: Array<Element>;
};

export type UpdateElementTypesMutationResponse = {
  info: UpdateInfo;
  elementTypes: Array<ElementType>;
};

export type UpdateEnumTypesMutationResponse = {
  info: UpdateInfo;
  enumTypes: Array<EnumType>;
};

export type UpdateEnumTypeValuesMutationResponse = {
  info: UpdateInfo;
  enumTypeValues: Array<EnumTypeValue>;
};

export type UpdateFieldsMutationResponse = {
  info: UpdateInfo;
  fields: Array<Field>;
};

export type UpdateGetBaseTypesReturnsMutationResponse = {
  info: UpdateInfo;
  getBaseTypesReturns: Array<GetBaseTypesReturn>;
};

export type UpdateHooksMutationResponse = {
  info: UpdateInfo;
  hooks: Array<Hook>;
};

export type UpdateInfo = {
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  nodesDeleted: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type UpdateInterfaceTypesMutationResponse = {
  info: UpdateInfo;
  interfaceTypes: Array<InterfaceType>;
};

export type UpdateLambdaTypesMutationResponse = {
  info: UpdateInfo;
  lambdaTypes: Array<LambdaType>;
};

export type UpdatePagesMutationResponse = {
  info: UpdateInfo;
  pages: Array<Page>;
};

export type UpdatePageTypesMutationResponse = {
  info: UpdateInfo;
  pageTypes: Array<PageType>;
};

export type UpdatePrimitiveTypesMutationResponse = {
  info: UpdateInfo;
  primitiveTypes: Array<PrimitiveType>;
};

export type UpdatePropsMutationResponse = {
  info: UpdateInfo;
  props: Array<Prop>;
};

export type UpdateReactNodeTypesMutationResponse = {
  info: UpdateInfo;
  reactNodeTypes: Array<ReactNodeType>;
};

export type UpdateRenderPropTypesMutationResponse = {
  info: UpdateInfo;
  renderPropTypes: Array<RenderPropType>;
};

export type UpdateResourcesMutationResponse = {
  info: UpdateInfo;
  resources: Array<Resource>;
};

export type UpdateStoresMutationResponse = {
  info: UpdateInfo;
  stores: Array<Store>;
};

export type UpdateTagsMutationResponse = {
  info: UpdateInfo;
  tags: Array<Tag>;
};

export type UpdateTypeReferencesMutationResponse = {
  info: UpdateInfo;
  typeReferences: Array<TypeReference>;
};

export type UpdateUnionTypesMutationResponse = {
  info: UpdateInfo;
  unionTypes: Array<UnionType>;
};

export type User = {
  id: Scalars['ID']['output'];
  auth0Id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  username: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
  types: Array<BaseType>;
  typesAggregate?: Maybe<UserBaseTypeTypesAggregationSelection>;
  apps: Array<App>;
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>;
  elements: Array<Element>;
  elementsAggregate?: Maybe<UserElementElementsAggregationSelection>;
  components: Array<Component>;
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>;
  atoms: Array<Atom>;
  atomsAggregate?: Maybe<UserAtomAtomsAggregationSelection>;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<UserTagTagsAggregationSelection>;
  typesConnection: UserTypesConnection;
  appsConnection: UserAppsConnection;
  elementsConnection: UserElementsConnection;
  componentsConnection: UserComponentsConnection;
  atomsConnection: UserAtomsConnection;
  tagsConnection: UserTagsConnection;
};


export type UserTypesArgs = {
  where?: InputMaybe<BaseTypeWhere>;
  options?: InputMaybe<BaseTypeOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserTypesAggregateArgs = {
  where?: InputMaybe<BaseTypeWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserAppsArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserComponentsArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserTypesConnectionArgs = {
  where?: InputMaybe<UserTypesConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserTypesConnectionSort>>;
};


export type UserAppsConnectionArgs = {
  where?: InputMaybe<UserAppsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserAppsConnectionSort>>;
};


export type UserElementsConnectionArgs = {
  where?: InputMaybe<UserElementsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserElementsConnectionSort>>;
};


export type UserComponentsConnectionArgs = {
  where?: InputMaybe<UserComponentsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserComponentsConnectionSort>>;
};


export type UserAtomsConnectionArgs = {
  where?: InputMaybe<UserAtomsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserAtomsConnectionSort>>;
};


export type UserTagsConnectionArgs = {
  where?: InputMaybe<UserTagsConnectionWhere>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<UserTagsConnectionSort>>;
};

export type UserAggregateSelection = {
  count: Scalars['Int']['output'];
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UserAppAppsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserAppAppsNodeAggregateSelection>;
};

export type UserAppAppsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  _compoundName: StringAggregateSelectionNonNullable;
};

export type UserAppsConnection = {
  edges: Array<UserAppsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserAppsRelationship = {
  cursor: Scalars['String']['output'];
  node: App;
};

export type UserAtomAtomsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserAtomAtomsNodeAggregateSelection>;
};

export type UserAtomAtomsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
  externalJsSource: StringAggregateSelectionNullable;
  externalCssSource: StringAggregateSelectionNullable;
  externalSourceType: StringAggregateSelectionNullable;
};

export type UserAtomsConnection = {
  edges: Array<UserAtomsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserAtomsRelationship = {
  cursor: Scalars['String']['output'];
  node: Atom;
};

export type UserBaseTypeTypesAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserBaseTypeTypesNodeAggregateSelection>;
};

export type UserBaseTypeTypesNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UserComponentComponentsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserComponentComponentsNodeAggregateSelection>;
};

export type UserComponentComponentsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  keyGenerator: StringAggregateSelectionNullable;
};

export type UserComponentsConnection = {
  edges: Array<UserComponentsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserComponentsRelationship = {
  cursor: Scalars['String']['output'];
  node: Component;
};

export type UserEdge = {
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserElementElementsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserElementElementsNodeAggregateSelection>;
};

export type UserElementElementsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfExpression: StringAggregateSelectionNullable;
};

export type UserElementsConnection = {
  edges: Array<UserElementsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserElementsRelationship = {
  cursor: Scalars['String']['output'];
  node: Element;
};

export type UsersConnection = {
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type UserTagsConnection = {
  edges: Array<UserTagsRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserTagsRelationship = {
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type UserTagTagsAggregationSelection = {
  count: Scalars['Int']['output'];
  node?: Maybe<UserTagTagsNodeAggregateSelection>;
};

export type UserTagTagsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UserTypesConnection = {
  edges: Array<UserTypesRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type UserTypesRelationship = {
  cursor: Scalars['String']['output'];
  node: BaseType;
};

export type VercelDomainConfig = {
  misconfigured: Scalars['Boolean']['output'];
};

export type VercelProjectDomain = {
  verified: Scalars['Boolean']['output'];
};

export type WithOwnerOwnerConnection = {
  edges: Array<WithOwnerOwnerRelationship>;
  totalCount: Scalars['Int']['output'];
  pageInfo: PageInfo;
};

export type WithOwnerOwnerRelationship = {
  cursor: Scalars['String']['output'];
  node: User;
};

export type ActionTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type ActionTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type ActionTypeConnectOrCreateWhere = {
  node: ActionTypeUniqueWhere;
};

export type ActionTypeConnectWhere = {
  node: ActionTypeWhere;
};

export type ActionTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type ActionTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type ActionTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type ActionTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type ActionTypeOptions = {
  /** Specify one or more ActionTypeSort objects to sort ActionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ActionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<ActionTypeOwnerAggregateInput>;
  node?: InputMaybe<ActionTypeOwnerNodeAggregationWhereInput>;
};

export type ActionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ActionTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ActionTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort ActionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionTypeSort object. */
export type ActionTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ActionTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ActionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type ActionTypeWhere = {
  OR?: InputMaybe<Array<ActionTypeWhere>>;
  AND?: InputMaybe<Array<ActionTypeWhere>>;
  NOT?: InputMaybe<ActionTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ActionTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type AnyActionWhere = {
  ApiAction?: InputMaybe<ApiActionWhere>;
  CodeAction?: InputMaybe<CodeActionWhere>;
};

export type AnyTypeWhere = {
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>;
  ArrayType?: InputMaybe<ArrayTypeWhere>;
  UnionType?: InputMaybe<UnionTypeWhere>;
  InterfaceType?: InputMaybe<InterfaceTypeWhere>;
  ElementType?: InputMaybe<ElementTypeWhere>;
  RenderPropType?: InputMaybe<RenderPropTypeWhere>;
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>;
  EnumType?: InputMaybe<EnumTypeWhere>;
  LambdaType?: InputMaybe<LambdaTypeWhere>;
  PageType?: InputMaybe<PageTypeWhere>;
  AppType?: InputMaybe<AppTypeWhere>;
  ActionType?: InputMaybe<ActionTypeWhere>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>;
};

export type ApiActionConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ApiActionConfigAggregateInput>>;
  OR?: InputMaybe<Array<ApiActionConfigAggregateInput>>;
  NOT?: InputMaybe<ApiActionConfigAggregateInput>;
  node?: InputMaybe<ApiActionConfigNodeAggregationWhereInput>;
};

export type ApiActionConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ApiActionConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ApiActionConfigConnectionWhere = {
  AND?: InputMaybe<Array<ApiActionConfigConnectionWhere>>;
  OR?: InputMaybe<Array<ApiActionConfigConnectionWhere>>;
  NOT?: InputMaybe<ApiActionConfigConnectionWhere>;
  node?: InputMaybe<PropWhere>;
};

export type ApiActionConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: ApiActionConfigConnectOrCreateFieldInputOnCreate;
};

export type ApiActionConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type ApiActionConfigCreateFieldInput = {
  node: PropCreateInput;
};

export type ApiActionConfigDeleteFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>;
};

export type ApiActionConfigDisconnectFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>;
};

export type ApiActionConfigFieldInput = {
  create?: InputMaybe<ApiActionConfigCreateFieldInput>;
  connect?: InputMaybe<ApiActionConfigConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>;
};

export type ApiActionConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionConfigNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ApiActionConfigNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ApiActionConfigNodeAggregationWhereInput>;
  data_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiActionConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type ApiActionConfigUpdateFieldInput = {
  where?: InputMaybe<ApiActionConfigConnectionWhere>;
  update?: InputMaybe<ApiActionConfigUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionConfigConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionConfigDisconnectFieldInput>;
  create?: InputMaybe<ApiActionConfigCreateFieldInput>;
  delete?: InputMaybe<ApiActionConfigDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>;
};

export type ApiActionConnectInput = {
  store?: InputMaybe<BaseActionStoreConnectFieldInput>;
  element?: InputMaybe<BaseActionElementConnectFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionConnectInput>;
  errorAction?: InputMaybe<ApiActionErrorActionConnectInput>;
  resource?: InputMaybe<ApiActionResourceConnectFieldInput>;
  config?: InputMaybe<ApiActionConfigConnectFieldInput>;
};

export type ApiActionConnectOrCreateInput = {
  store?: InputMaybe<BaseActionStoreConnectOrCreateFieldInput>;
  element?: InputMaybe<BaseActionElementConnectOrCreateFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionConnectOrCreateInput>;
  errorAction?: InputMaybe<ApiActionErrorActionConnectOrCreateInput>;
  resource?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>;
  config?: InputMaybe<ApiActionConfigConnectOrCreateFieldInput>;
};

export type ApiActionConnectOrCreateWhere = {
  node: ApiActionUniqueWhere;
};

export type ApiActionConnectWhere = {
  node: ApiActionWhere;
};

export type ApiActionCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: ActionKind;
  store?: InputMaybe<BaseActionStoreFieldInput>;
  element?: InputMaybe<BaseActionElementFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionCreateInput>;
  errorAction?: InputMaybe<ApiActionErrorActionCreateInput>;
  resource?: InputMaybe<ApiActionResourceFieldInput>;
  config?: InputMaybe<ApiActionConfigFieldInput>;
};

export type ApiActionDeleteInput = {
  store?: InputMaybe<BaseActionStoreDeleteFieldInput>;
  element?: InputMaybe<BaseActionElementDeleteFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionDeleteInput>;
  errorAction?: InputMaybe<ApiActionErrorActionDeleteInput>;
  resource?: InputMaybe<ApiActionResourceDeleteFieldInput>;
  config?: InputMaybe<ApiActionConfigDeleteFieldInput>;
};

export type ApiActionDisconnectInput = {
  store?: InputMaybe<BaseActionStoreDisconnectFieldInput>;
  element?: InputMaybe<BaseActionElementDisconnectFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionDisconnectInput>;
  errorAction?: InputMaybe<ApiActionErrorActionDisconnectInput>;
  resource?: InputMaybe<ApiActionResourceDisconnectFieldInput>;
  config?: InputMaybe<ApiActionConfigDisconnectFieldInput>;
};

export type ApiActionElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ApiActionElementAggregateInput>>;
  OR?: InputMaybe<Array<ApiActionElementAggregateInput>>;
  NOT?: InputMaybe<ApiActionElementAggregateInput>;
  node?: InputMaybe<ApiActionElementNodeAggregationWhereInput>;
};

export type ApiActionElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ApiActionElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ApiActionElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiActionErrorActionApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>;
  connect?: InputMaybe<ApiActionConnectInput>;
};

export type ApiActionErrorActionApiActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionErrorActionApiActionConnectionWhere>>;
  AND?: InputMaybe<Array<ApiActionErrorActionApiActionConnectionWhere>>;
  NOT?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>;
  node?: InputMaybe<ApiActionWhere>;
};

export type ApiActionErrorActionApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere;
  onCreate: ApiActionErrorActionApiActionConnectOrCreateFieldInputOnCreate;
};

export type ApiActionErrorActionApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput;
};

export type ApiActionErrorActionApiActionCreateFieldInput = {
  node: ApiActionCreateInput;
};

export type ApiActionErrorActionApiActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>;
  delete?: InputMaybe<ApiActionDeleteInput>;
};

export type ApiActionErrorActionApiActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>;
  disconnect?: InputMaybe<ApiActionDisconnectInput>;
};

export type ApiActionErrorActionApiActionFieldInput = {
  create?: InputMaybe<ApiActionErrorActionApiActionCreateFieldInput>;
  connect?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionErrorActionApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>;
};

export type ApiActionErrorActionApiActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>;
  update?: InputMaybe<ApiActionErrorActionApiActionUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionErrorActionApiActionDisconnectFieldInput>;
  create?: InputMaybe<ApiActionErrorActionApiActionCreateFieldInput>;
  delete?: InputMaybe<ApiActionErrorActionApiActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionErrorActionCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>;
  connect?: InputMaybe<CodeActionConnectInput>;
};

export type ApiActionErrorActionCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionErrorActionCodeActionConnectionWhere>>;
  AND?: InputMaybe<Array<ApiActionErrorActionCodeActionConnectionWhere>>;
  NOT?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>;
  node?: InputMaybe<CodeActionWhere>;
};

export type ApiActionErrorActionCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere;
  onCreate: ApiActionErrorActionCodeActionConnectOrCreateFieldInputOnCreate;
};

export type ApiActionErrorActionCodeActionConnectOrCreateFieldInputOnCreate = {
  node: CodeActionOnCreateInput;
};

export type ApiActionErrorActionCodeActionCreateFieldInput = {
  node: CodeActionCreateInput;
};

export type ApiActionErrorActionCodeActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>;
  delete?: InputMaybe<CodeActionDeleteInput>;
};

export type ApiActionErrorActionCodeActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>;
  disconnect?: InputMaybe<CodeActionDisconnectInput>;
};

export type ApiActionErrorActionCodeActionFieldInput = {
  create?: InputMaybe<ApiActionErrorActionCodeActionCreateFieldInput>;
  connect?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>;
};

export type ApiActionErrorActionCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>;
};

export type ApiActionErrorActionCodeActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>;
  update?: InputMaybe<ApiActionErrorActionCodeActionUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionErrorActionCodeActionDisconnectFieldInput>;
  create?: InputMaybe<ApiActionErrorActionCodeActionCreateFieldInput>;
  delete?: InputMaybe<ApiActionErrorActionCodeActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>;
};

export type ApiActionErrorActionConnectInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectFieldInput>;
};

export type ApiActionErrorActionConnectionWhere = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectionWhere>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectionWhere>;
};

export type ApiActionErrorActionConnectOrCreateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionConnectOrCreateFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionErrorActionCreateFieldInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionCreateFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionCreateFieldInput>;
};

export type ApiActionErrorActionCreateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionFieldInput>;
};

export type ApiActionErrorActionDeleteInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionDeleteFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionDeleteFieldInput>;
};

export type ApiActionErrorActionDisconnectInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionDisconnectFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionDisconnectFieldInput>;
};

export type ApiActionErrorActionUpdateInput = {
  CodeAction?: InputMaybe<ApiActionErrorActionCodeActionUpdateFieldInput>;
  ApiAction?: InputMaybe<ApiActionErrorActionApiActionUpdateFieldInput>;
};

export type ApiActionOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: ActionKind;
};

export type ApiActionOptions = {
  /** Specify one or more ApiActionSort objects to sort ApiActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ApiActionSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiActionRelationInput = {
  store?: InputMaybe<BaseActionStoreCreateFieldInput>;
  element?: InputMaybe<BaseActionElementCreateFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionCreateFieldInput>;
  errorAction?: InputMaybe<ApiActionErrorActionCreateFieldInput>;
  resource?: InputMaybe<ApiActionResourceCreateFieldInput>;
  config?: InputMaybe<ApiActionConfigCreateFieldInput>;
};

export type ApiActionResourceAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ApiActionResourceAggregateInput>>;
  OR?: InputMaybe<Array<ApiActionResourceAggregateInput>>;
  NOT?: InputMaybe<ApiActionResourceAggregateInput>;
  node?: InputMaybe<ApiActionResourceNodeAggregationWhereInput>;
};

export type ApiActionResourceConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>;
  connect?: InputMaybe<ResourceConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ApiActionResourceConnectionSort = {
  node?: InputMaybe<ResourceSort>;
};

export type ApiActionResourceConnectionWhere = {
  AND?: InputMaybe<Array<ApiActionResourceConnectionWhere>>;
  OR?: InputMaybe<Array<ApiActionResourceConnectionWhere>>;
  NOT?: InputMaybe<ApiActionResourceConnectionWhere>;
  node?: InputMaybe<ResourceWhere>;
};

export type ApiActionResourceConnectOrCreateFieldInput = {
  where: ResourceConnectOrCreateWhere;
  onCreate: ApiActionResourceConnectOrCreateFieldInputOnCreate;
};

export type ApiActionResourceConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput;
};

export type ApiActionResourceCreateFieldInput = {
  node: ResourceCreateInput;
};

export type ApiActionResourceDeleteFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>;
  delete?: InputMaybe<ResourceDeleteInput>;
};

export type ApiActionResourceDisconnectFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>;
  disconnect?: InputMaybe<ResourceDisconnectInput>;
};

export type ApiActionResourceFieldInput = {
  create?: InputMaybe<ApiActionResourceCreateFieldInput>;
  connect?: InputMaybe<ApiActionResourceConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>;
};

export type ApiActionResourceNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionResourceNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ApiActionResourceNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ApiActionResourceNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiActionResourceUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>;
};

export type ApiActionResourceUpdateFieldInput = {
  where?: InputMaybe<ApiActionResourceConnectionWhere>;
  update?: InputMaybe<ApiActionResourceUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionResourceConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionResourceDisconnectFieldInput>;
  create?: InputMaybe<ApiActionResourceCreateFieldInput>;
  delete?: InputMaybe<ApiActionResourceDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionResourceConnectOrCreateFieldInput>;
};

/** Fields to sort ApiActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ApiActionSort object. */
export type ApiActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type ApiActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ApiActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<ApiActionStoreAggregateInput>>;
  NOT?: InputMaybe<ApiActionStoreAggregateInput>;
  node?: InputMaybe<ApiActionStoreNodeAggregationWhereInput>;
};

export type ApiActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ApiActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ApiActionStoreNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ApiActionStoreNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiActionSuccessActionApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>;
  connect?: InputMaybe<ApiActionConnectInput>;
};

export type ApiActionSuccessActionApiActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionSuccessActionApiActionConnectionWhere>>;
  AND?: InputMaybe<Array<ApiActionSuccessActionApiActionConnectionWhere>>;
  NOT?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>;
  node?: InputMaybe<ApiActionWhere>;
};

export type ApiActionSuccessActionApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere;
  onCreate: ApiActionSuccessActionApiActionConnectOrCreateFieldInputOnCreate;
};

export type ApiActionSuccessActionApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput;
};

export type ApiActionSuccessActionApiActionCreateFieldInput = {
  node: ApiActionCreateInput;
};

export type ApiActionSuccessActionApiActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>;
  delete?: InputMaybe<ApiActionDeleteInput>;
};

export type ApiActionSuccessActionApiActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>;
  disconnect?: InputMaybe<ApiActionDisconnectInput>;
};

export type ApiActionSuccessActionApiActionFieldInput = {
  create?: InputMaybe<ApiActionSuccessActionApiActionCreateFieldInput>;
  connect?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionSuccessActionApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>;
};

export type ApiActionSuccessActionApiActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>;
  update?: InputMaybe<ApiActionSuccessActionApiActionUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionSuccessActionApiActionDisconnectFieldInput>;
  create?: InputMaybe<ApiActionSuccessActionApiActionCreateFieldInput>;
  delete?: InputMaybe<ApiActionSuccessActionApiActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionSuccessActionCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>;
  connect?: InputMaybe<CodeActionConnectInput>;
};

export type ApiActionSuccessActionCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<ApiActionSuccessActionCodeActionConnectionWhere>>;
  AND?: InputMaybe<Array<ApiActionSuccessActionCodeActionConnectionWhere>>;
  NOT?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>;
  node?: InputMaybe<CodeActionWhere>;
};

export type ApiActionSuccessActionCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere;
  onCreate: ApiActionSuccessActionCodeActionConnectOrCreateFieldInputOnCreate;
};

export type ApiActionSuccessActionCodeActionConnectOrCreateFieldInputOnCreate = {
  node: CodeActionOnCreateInput;
};

export type ApiActionSuccessActionCodeActionCreateFieldInput = {
  node: CodeActionCreateInput;
};

export type ApiActionSuccessActionCodeActionDeleteFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>;
  delete?: InputMaybe<CodeActionDeleteInput>;
};

export type ApiActionSuccessActionCodeActionDisconnectFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>;
  disconnect?: InputMaybe<CodeActionDisconnectInput>;
};

export type ApiActionSuccessActionCodeActionFieldInput = {
  create?: InputMaybe<ApiActionSuccessActionCodeActionCreateFieldInput>;
  connect?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>;
};

export type ApiActionSuccessActionCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>;
};

export type ApiActionSuccessActionCodeActionUpdateFieldInput = {
  where?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>;
  update?: InputMaybe<ApiActionSuccessActionCodeActionUpdateConnectionInput>;
  connect?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>;
  disconnect?: InputMaybe<ApiActionSuccessActionCodeActionDisconnectFieldInput>;
  create?: InputMaybe<ApiActionSuccessActionCodeActionCreateFieldInput>;
  delete?: InputMaybe<ApiActionSuccessActionCodeActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>;
};

export type ApiActionSuccessActionConnectInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectFieldInput>;
};

export type ApiActionSuccessActionConnectionWhere = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectionWhere>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectionWhere>;
};

export type ApiActionSuccessActionConnectOrCreateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionConnectOrCreateFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionConnectOrCreateFieldInput>;
};

export type ApiActionSuccessActionCreateFieldInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionCreateFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionCreateFieldInput>;
};

export type ApiActionSuccessActionCreateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionFieldInput>;
};

export type ApiActionSuccessActionDeleteInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionDeleteFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionDeleteFieldInput>;
};

export type ApiActionSuccessActionDisconnectInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionDisconnectFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionDisconnectFieldInput>;
};

export type ApiActionSuccessActionUpdateInput = {
  CodeAction?: InputMaybe<ApiActionSuccessActionCodeActionUpdateFieldInput>;
  ApiAction?: InputMaybe<ApiActionSuccessActionApiActionUpdateFieldInput>;
};

export type ApiActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ApiActionUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  store?: InputMaybe<BaseActionStoreUpdateFieldInput>;
  element?: InputMaybe<BaseActionElementUpdateFieldInput>;
  successAction?: InputMaybe<ApiActionSuccessActionUpdateInput>;
  errorAction?: InputMaybe<ApiActionErrorActionUpdateInput>;
  resource?: InputMaybe<ApiActionResourceUpdateFieldInput>;
  config?: InputMaybe<ApiActionConfigUpdateFieldInput>;
};

export type ApiActionWhere = {
  OR?: InputMaybe<Array<ApiActionWhere>>;
  AND?: InputMaybe<Array<ApiActionWhere>>;
  NOT?: InputMaybe<ApiActionWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<ApiActionStoreAggregateInput>;
  element?: InputMaybe<ElementWhere>;
  element_NOT?: InputMaybe<ElementWhere>;
  elementAggregate?: InputMaybe<ApiActionElementAggregateInput>;
  resource?: InputMaybe<ResourceWhere>;
  resource_NOT?: InputMaybe<ResourceWhere>;
  resourceAggregate?: InputMaybe<ApiActionResourceAggregateInput>;
  config?: InputMaybe<PropWhere>;
  config_NOT?: InputMaybe<PropWhere>;
  configAggregate?: InputMaybe<ApiActionConfigAggregateInput>;
  storeConnection?: InputMaybe<BaseActionStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<BaseActionStoreConnectionWhere>;
  elementConnection?: InputMaybe<BaseActionElementConnectionWhere>;
  elementConnection_NOT?: InputMaybe<BaseActionElementConnectionWhere>;
  successActionConnection?: InputMaybe<ApiActionSuccessActionConnectionWhere>;
  successActionConnection_NOT?: InputMaybe<ApiActionSuccessActionConnectionWhere>;
  errorActionConnection?: InputMaybe<ApiActionErrorActionConnectionWhere>;
  errorActionConnection_NOT?: InputMaybe<ApiActionErrorActionConnectionWhere>;
  resourceConnection?: InputMaybe<ApiActionResourceConnectionWhere>;
  resourceConnection_NOT?: InputMaybe<ApiActionResourceConnectionWhere>;
  configConnection?: InputMaybe<ApiActionConfigConnectionWhere>;
  configConnection_NOT?: InputMaybe<ApiActionConfigConnectionWhere>;
};

export type AppConnectInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsConnectFieldInput>>;
};

export type AppConnectOrCreateInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>;
};

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere;
};

export type AppConnectWhere = {
  node: AppWhere;
};

export type AppCreateInput = {
  id: Scalars['ID']['input'];
  _compoundName: Scalars['String']['input'];
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
  pages?: InputMaybe<AppPagesFieldInput>;
  domains?: InputMaybe<AppDomainsFieldInput>;
};

export type AppDeleteInput = {
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsDeleteFieldInput>>;
};

export type AppDisconnectInput = {
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>;
};

export type AppDomainsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AppDomainsAggregateInput>>;
  OR?: InputMaybe<Array<AppDomainsAggregateInput>>;
  NOT?: InputMaybe<AppDomainsAggregateInput>;
  node?: InputMaybe<AppDomainsNodeAggregationWhereInput>;
};

export type AppDomainsConnectFieldInput = {
  where?: InputMaybe<DomainConnectWhere>;
  connect?: InputMaybe<Array<DomainConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AppDomainsConnectionSort = {
  node?: InputMaybe<DomainSort>;
};

export type AppDomainsConnectionWhere = {
  AND?: InputMaybe<Array<AppDomainsConnectionWhere>>;
  OR?: InputMaybe<Array<AppDomainsConnectionWhere>>;
  NOT?: InputMaybe<AppDomainsConnectionWhere>;
  node?: InputMaybe<DomainWhere>;
};

export type AppDomainsConnectOrCreateFieldInput = {
  where: DomainConnectOrCreateWhere;
  onCreate: AppDomainsConnectOrCreateFieldInputOnCreate;
};

export type AppDomainsConnectOrCreateFieldInputOnCreate = {
  node: DomainOnCreateInput;
};

export type AppDomainsCreateFieldInput = {
  node: DomainCreateInput;
};

export type AppDomainsDeleteFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>;
  delete?: InputMaybe<DomainDeleteInput>;
};

export type AppDomainsDisconnectFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>;
  disconnect?: InputMaybe<DomainDisconnectInput>;
};

export type AppDomainsFieldInput = {
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>;
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>;
};

export type AppDomainsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppDomainsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AppDomainsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AppDomainsUpdateConnectionInput = {
  node?: InputMaybe<DomainUpdateInput>;
};

export type AppDomainsUpdateFieldInput = {
  where?: InputMaybe<AppDomainsConnectionWhere>;
  update?: InputMaybe<AppDomainsUpdateConnectionInput>;
  connect?: InputMaybe<Array<AppDomainsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>;
  create?: InputMaybe<Array<AppDomainsCreateFieldInput>>;
  delete?: InputMaybe<Array<AppDomainsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>;
};

export type AppOnCreateInput = {
  id: Scalars['ID']['input'];
  _compoundName: Scalars['String']['input'];
};

export type AppOptions = {
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AppOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AppOwnerAggregateInput>>;
  OR?: InputMaybe<Array<AppOwnerAggregateInput>>;
  NOT?: InputMaybe<AppOwnerAggregateInput>;
  node?: InputMaybe<AppOwnerNodeAggregationWhereInput>;
};

export type AppOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AppOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AppPagesAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AppPagesAggregateInput>>;
  OR?: InputMaybe<Array<AppPagesAggregateInput>>;
  NOT?: InputMaybe<AppPagesAggregateInput>;
  node?: InputMaybe<AppPagesNodeAggregationWhereInput>;
};

export type AppPagesConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>;
  connect?: InputMaybe<Array<PageConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AppPagesConnectionSort = {
  node?: InputMaybe<PageSort>;
};

export type AppPagesConnectionWhere = {
  AND?: InputMaybe<Array<AppPagesConnectionWhere>>;
  OR?: InputMaybe<Array<AppPagesConnectionWhere>>;
  NOT?: InputMaybe<AppPagesConnectionWhere>;
  node?: InputMaybe<PageWhere>;
};

export type AppPagesConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere;
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate;
};

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput;
};

export type AppPagesCreateFieldInput = {
  node: PageCreateInput;
};

export type AppPagesDeleteFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>;
  delete?: InputMaybe<PageDeleteInput>;
};

export type AppPagesDisconnectFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>;
  disconnect?: InputMaybe<PageDisconnectInput>;
};

export type AppPagesFieldInput = {
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>;
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>;
};

export type AppPagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppPagesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AppPagesNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AppPagesUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>;
};

export type AppPagesUpdateFieldInput = {
  where?: InputMaybe<AppPagesConnectionWhere>;
  update?: InputMaybe<AppPagesUpdateConnectionInput>;
  connect?: InputMaybe<Array<AppPagesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<AppPagesDisconnectFieldInput>>;
  create?: InputMaybe<Array<AppPagesCreateFieldInput>>;
  delete?: InputMaybe<Array<AppPagesDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>;
};

export type AppRelationInput = {
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsCreateFieldInput>>;
};

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>;
  _compoundName?: InputMaybe<SortDirection>;
};

export type AppTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type AppTypeConnectOrCreateWhere = {
  node: AppTypeUniqueWhere;
};

export type AppTypeConnectWhere = {
  node: AppTypeWhere;
};

export type AppTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type AppTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type AppTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type AppTypeOptions = {
  /** Specify one or more AppTypeSort objects to sort AppTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AppTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AppTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<AppTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<AppTypeOwnerAggregateInput>;
  node?: InputMaybe<AppTypeOwnerNodeAggregationWhereInput>;
};

export type AppTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AppTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AppTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type AppTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AppTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type AppTypeWhere = {
  OR?: InputMaybe<Array<AppTypeWhere>>;
  AND?: InputMaybe<Array<AppTypeWhere>>;
  NOT?: InputMaybe<AppTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
};

export type AppUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>;
  domains?: InputMaybe<Array<AppDomainsUpdateFieldInput>>;
};

export type AppWhere = {
  OR?: InputMaybe<Array<AppWhere>>;
  AND?: InputMaybe<Array<AppWhere>>;
  NOT?: InputMaybe<AppWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
  _compoundName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  _compoundName_MATCHES?: InputMaybe<Scalars['String']['input']>;
  _compoundName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  _compoundName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  _compoundName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>;
  pagesAggregate?: InputMaybe<AppPagesAggregateInput>;
  /** Return Apps where all of the related Pages match this filter */
  pages_ALL?: InputMaybe<PageWhere>;
  /** Return Apps where none of the related Pages match this filter */
  pages_NONE?: InputMaybe<PageWhere>;
  /** Return Apps where one of the related Pages match this filter */
  pages_SINGLE?: InputMaybe<PageWhere>;
  /** Return Apps where some of the related Pages match this filter */
  pages_SOME?: InputMaybe<PageWhere>;
  domainsAggregate?: InputMaybe<AppDomainsAggregateInput>;
  /** Return Apps where all of the related Domains match this filter */
  domains_ALL?: InputMaybe<DomainWhere>;
  /** Return Apps where none of the related Domains match this filter */
  domains_NONE?: InputMaybe<DomainWhere>;
  /** Return Apps where one of the related Domains match this filter */
  domains_SINGLE?: InputMaybe<DomainWhere>;
  /** Return Apps where some of the related Domains match this filter */
  domains_SOME?: InputMaybe<DomainWhere>;
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  /** Return Apps where all of the related AppPagesConnections match this filter */
  pagesConnection_ALL?: InputMaybe<AppPagesConnectionWhere>;
  /** Return Apps where none of the related AppPagesConnections match this filter */
  pagesConnection_NONE?: InputMaybe<AppPagesConnectionWhere>;
  /** Return Apps where one of the related AppPagesConnections match this filter */
  pagesConnection_SINGLE?: InputMaybe<AppPagesConnectionWhere>;
  /** Return Apps where some of the related AppPagesConnections match this filter */
  pagesConnection_SOME?: InputMaybe<AppPagesConnectionWhere>;
  /** Return Apps where all of the related AppDomainsConnections match this filter */
  domainsConnection_ALL?: InputMaybe<AppDomainsConnectionWhere>;
  /** Return Apps where none of the related AppDomainsConnections match this filter */
  domainsConnection_NONE?: InputMaybe<AppDomainsConnectionWhere>;
  /** Return Apps where one of the related AppDomainsConnections match this filter */
  domainsConnection_SINGLE?: InputMaybe<AppDomainsConnectionWhere>;
  /** Return Apps where some of the related AppDomainsConnections match this filter */
  domainsConnection_SOME?: InputMaybe<AppDomainsConnectionWhere>;
};

export type ArrayTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  fieldRefs?: InputMaybe<Array<ArrayTypeFieldRefsConnectFieldInput>>;
  itemType?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
};

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type ArrayTypeConnectOrCreateWhere = {
  node: ArrayTypeUniqueWhere;
};

export type ArrayTypeConnectWhere = {
  node: ArrayTypeWhere;
};

export type ArrayTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
  fieldRefs?: InputMaybe<ArrayTypeFieldRefsFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeFieldInput>;
};

export type ArrayTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  fieldRefs?: InputMaybe<Array<ArrayTypeFieldRefsDeleteFieldInput>>;
  itemType?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>;
};

export type ArrayTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  fieldRefs?: InputMaybe<Array<ArrayTypeFieldRefsDisconnectFieldInput>>;
  itemType?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>;
};

export type ArrayTypeFieldRefsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ArrayTypeFieldRefsAggregateInput>>;
  OR?: InputMaybe<Array<ArrayTypeFieldRefsAggregateInput>>;
  NOT?: InputMaybe<ArrayTypeFieldRefsAggregateInput>;
  node?: InputMaybe<ArrayTypeFieldRefsNodeAggregationWhereInput>;
};

export type ArrayTypeFieldRefsConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<Array<FieldConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ArrayTypeFieldRefsConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type ArrayTypeFieldRefsConnectionWhere = {
  AND?: InputMaybe<Array<ArrayTypeFieldRefsConnectionWhere>>;
  OR?: InputMaybe<Array<ArrayTypeFieldRefsConnectionWhere>>;
  NOT?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type ArrayTypeFieldRefsCreateFieldInput = {
  node: FieldCreateInput;
};

export type ArrayTypeFieldRefsDeleteFieldInput = {
  where?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type ArrayTypeFieldRefsDisconnectFieldInput = {
  where?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type ArrayTypeFieldRefsFieldInput = {
  create?: InputMaybe<Array<ArrayTypeFieldRefsCreateFieldInput>>;
  connect?: InputMaybe<Array<ArrayTypeFieldRefsConnectFieldInput>>;
};

export type ArrayTypeFieldRefsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ArrayTypeFieldRefsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ArrayTypeFieldRefsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ArrayTypeFieldRefsNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ArrayTypeFieldRefsUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type ArrayTypeFieldRefsUpdateFieldInput = {
  where?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  update?: InputMaybe<ArrayTypeFieldRefsUpdateConnectionInput>;
  connect?: InputMaybe<Array<ArrayTypeFieldRefsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<ArrayTypeFieldRefsDisconnectFieldInput>>;
  create?: InputMaybe<Array<ArrayTypeFieldRefsCreateFieldInput>>;
  delete?: InputMaybe<Array<ArrayTypeFieldRefsDeleteFieldInput>>;
};

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: InputMaybe<IBaseTypeConnectInput>;
  where?: InputMaybe<IBaseTypeConnectWhere>;
};

export type ArrayTypeItemTypeConnectionSort = {
  node?: InputMaybe<IBaseTypeSort>;
};

export type ArrayTypeItemTypeConnectionWhere = {
  AND?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>;
  NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
  node?: InputMaybe<IBaseTypeWhere>;
};

export type ArrayTypeItemTypeCreateFieldInput = {
  node: IBaseTypeCreateInput;
};

export type ArrayTypeItemTypeDeleteFieldInput = {
  delete?: InputMaybe<IBaseTypeDeleteInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeItemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<IBaseTypeDisconnectInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeItemTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
};

export type ArrayTypeItemTypeUpdateConnectionInput = {
  node?: InputMaybe<IBaseTypeUpdateInput>;
};

export type ArrayTypeItemTypeUpdateFieldInput = {
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
  delete?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>;
  disconnect?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>;
  update?: InputMaybe<ArrayTypeItemTypeUpdateConnectionInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type ArrayTypeOptions = {
  /** Specify one or more ArrayTypeSort objects to sort ArrayTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ArrayTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArrayTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<ArrayTypeOwnerAggregateInput>;
  node?: InputMaybe<ArrayTypeOwnerNodeAggregationWhereInput>;
};

export type ArrayTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ArrayTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ArrayTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  fieldRefs?: InputMaybe<Array<ArrayTypeFieldRefsCreateFieldInput>>;
  itemType?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
};

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ArrayTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ArrayTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
  fieldRefs?: InputMaybe<Array<ArrayTypeFieldRefsUpdateFieldInput>>;
  itemType?: InputMaybe<ArrayTypeItemTypeUpdateFieldInput>;
};

export type ArrayTypeWhere = {
  OR?: InputMaybe<Array<ArrayTypeWhere>>;
  AND?: InputMaybe<Array<ArrayTypeWhere>>;
  NOT?: InputMaybe<ArrayTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>;
  fieldRefsAggregate?: InputMaybe<ArrayTypeFieldRefsAggregateInput>;
  /** Return ArrayTypes where all of the related Fields match this filter */
  fieldRefs_ALL?: InputMaybe<FieldWhere>;
  /** Return ArrayTypes where none of the related Fields match this filter */
  fieldRefs_NONE?: InputMaybe<FieldWhere>;
  /** Return ArrayTypes where one of the related Fields match this filter */
  fieldRefs_SINGLE?: InputMaybe<FieldWhere>;
  /** Return ArrayTypes where some of the related Fields match this filter */
  fieldRefs_SOME?: InputMaybe<FieldWhere>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  /** Return ArrayTypes where all of the related ArrayTypeFieldRefsConnections match this filter */
  fieldRefsConnection_ALL?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  /** Return ArrayTypes where none of the related ArrayTypeFieldRefsConnections match this filter */
  fieldRefsConnection_NONE?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  /** Return ArrayTypes where one of the related ArrayTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SINGLE?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  /** Return ArrayTypes where some of the related ArrayTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SOME?: InputMaybe<ArrayTypeFieldRefsConnectionWhere>;
  itemTypeConnection?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
  itemTypeConnection_NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type AtomApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AtomApiAggregateInput>>;
  OR?: InputMaybe<Array<AtomApiAggregateInput>>;
  NOT?: InputMaybe<AtomApiAggregateInput>;
  node?: InputMaybe<AtomApiNodeAggregationWhereInput>;
};

export type AtomApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AtomApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type AtomApiConnectionWhere = {
  AND?: InputMaybe<Array<AtomApiConnectionWhere>>;
  OR?: InputMaybe<Array<AtomApiConnectionWhere>>;
  NOT?: InputMaybe<AtomApiConnectionWhere>;
  node?: InputMaybe<InterfaceTypeWhere>;
};

export type AtomApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: AtomApiConnectOrCreateFieldInputOnCreate;
};

export type AtomApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type AtomApiCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type AtomApiDeleteFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type AtomApiDisconnectFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type AtomApiFieldInput = {
  create?: InputMaybe<AtomApiCreateFieldInput>;
  connect?: InputMaybe<AtomApiConnectFieldInput>;
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>;
};

export type AtomApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AtomApiNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AtomApiNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type AtomApiUpdateFieldInput = {
  where?: InputMaybe<AtomApiConnectionWhere>;
  update?: InputMaybe<AtomApiUpdateConnectionInput>;
  connect?: InputMaybe<AtomApiConnectFieldInput>;
  disconnect?: InputMaybe<AtomApiDisconnectFieldInput>;
  create?: InputMaybe<AtomApiCreateFieldInput>;
  delete?: InputMaybe<AtomApiDeleteFieldInput>;
  connectOrCreate?: InputMaybe<AtomApiConnectOrCreateFieldInput>;
};

export type AtomConnectInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  tags?: InputMaybe<Array<AtomTagsConnectFieldInput>>;
  api?: InputMaybe<AtomApiConnectFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsConnectFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenConnectFieldInput>>;
};

export type AtomConnectOrCreateInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
  tags?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>;
  api?: InputMaybe<AtomApiConnectOrCreateFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsConnectOrCreateFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenConnectOrCreateFieldInput>>;
};

export type AtomConnectOrCreateWhere = {
  node: AtomUniqueWhere;
};

export type AtomConnectWhere = {
  node: AtomWhere;
};

export type AtomCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  externalJsSource?: InputMaybe<Scalars['String']['input']>;
  externalCssSource?: InputMaybe<Scalars['String']['input']>;
  externalSourceType?: InputMaybe<Scalars['String']['input']>;
  type: AtomType;
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
  tags?: InputMaybe<AtomTagsFieldInput>;
  api?: InputMaybe<AtomApiFieldInput>;
  requiredParents?: InputMaybe<AtomRequiredParentsFieldInput>;
  suggestedChildren?: InputMaybe<AtomSuggestedChildrenFieldInput>;
};

export type AtomDeleteInput = {
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
  tags?: InputMaybe<Array<AtomTagsDeleteFieldInput>>;
  api?: InputMaybe<AtomApiDeleteFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsDeleteFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenDeleteFieldInput>>;
};

export type AtomDisconnectInput = {
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
  tags?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>;
  api?: InputMaybe<AtomApiDisconnectFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsDisconnectFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenDisconnectFieldInput>>;
};

export type AtomOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  externalJsSource?: InputMaybe<Scalars['String']['input']>;
  externalCssSource?: InputMaybe<Scalars['String']['input']>;
  externalSourceType?: InputMaybe<Scalars['String']['input']>;
  type: AtomType;
};

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AtomSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AtomOwnerAggregateInput>>;
  OR?: InputMaybe<Array<AtomOwnerAggregateInput>>;
  NOT?: InputMaybe<AtomOwnerAggregateInput>;
  node?: InputMaybe<AtomOwnerNodeAggregationWhereInput>;
};

export type AtomOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AtomOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AtomOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomRelationInput = {
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
  tags?: InputMaybe<Array<AtomTagsCreateFieldInput>>;
  api?: InputMaybe<AtomApiCreateFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsCreateFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenCreateFieldInput>>;
};

export type AtomRequiredParentsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AtomRequiredParentsAggregateInput>>;
  OR?: InputMaybe<Array<AtomRequiredParentsAggregateInput>>;
  NOT?: InputMaybe<AtomRequiredParentsAggregateInput>;
  node?: InputMaybe<AtomRequiredParentsNodeAggregationWhereInput>;
};

export type AtomRequiredParentsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AtomRequiredParentsConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type AtomRequiredParentsConnectionWhere = {
  AND?: InputMaybe<Array<AtomRequiredParentsConnectionWhere>>;
  OR?: InputMaybe<Array<AtomRequiredParentsConnectionWhere>>;
  NOT?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type AtomRequiredParentsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: AtomRequiredParentsConnectOrCreateFieldInputOnCreate;
};

export type AtomRequiredParentsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type AtomRequiredParentsCreateFieldInput = {
  node: AtomCreateInput;
};

export type AtomRequiredParentsDeleteFieldInput = {
  where?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type AtomRequiredParentsDisconnectFieldInput = {
  where?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type AtomRequiredParentsFieldInput = {
  create?: InputMaybe<Array<AtomRequiredParentsCreateFieldInput>>;
  connect?: InputMaybe<Array<AtomRequiredParentsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomRequiredParentsConnectOrCreateFieldInput>>;
};

export type AtomRequiredParentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomRequiredParentsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AtomRequiredParentsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AtomRequiredParentsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomRequiredParentsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type AtomRequiredParentsUpdateFieldInput = {
  where?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  update?: InputMaybe<AtomRequiredParentsUpdateConnectionInput>;
  connect?: InputMaybe<Array<AtomRequiredParentsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<AtomRequiredParentsDisconnectFieldInput>>;
  create?: InputMaybe<Array<AtomRequiredParentsCreateFieldInput>>;
  delete?: InputMaybe<Array<AtomRequiredParentsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomRequiredParentsConnectOrCreateFieldInput>>;
};

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  icon?: InputMaybe<SortDirection>;
  externalJsSource?: InputMaybe<SortDirection>;
  externalCssSource?: InputMaybe<SortDirection>;
  externalSourceType?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type AtomSuggestedChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AtomSuggestedChildrenAggregateInput>>;
  OR?: InputMaybe<Array<AtomSuggestedChildrenAggregateInput>>;
  NOT?: InputMaybe<AtomSuggestedChildrenAggregateInput>;
  node?: InputMaybe<AtomSuggestedChildrenNodeAggregationWhereInput>;
};

export type AtomSuggestedChildrenConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AtomSuggestedChildrenConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type AtomSuggestedChildrenConnectionWhere = {
  AND?: InputMaybe<Array<AtomSuggestedChildrenConnectionWhere>>;
  OR?: InputMaybe<Array<AtomSuggestedChildrenConnectionWhere>>;
  NOT?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type AtomSuggestedChildrenConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: AtomSuggestedChildrenConnectOrCreateFieldInputOnCreate;
};

export type AtomSuggestedChildrenConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type AtomSuggestedChildrenCreateFieldInput = {
  node: AtomCreateInput;
};

export type AtomSuggestedChildrenDeleteFieldInput = {
  where?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type AtomSuggestedChildrenDisconnectFieldInput = {
  where?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type AtomSuggestedChildrenFieldInput = {
  create?: InputMaybe<Array<AtomSuggestedChildrenCreateFieldInput>>;
  connect?: InputMaybe<Array<AtomSuggestedChildrenConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomSuggestedChildrenConnectOrCreateFieldInput>>;
};

export type AtomSuggestedChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomSuggestedChildrenNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AtomSuggestedChildrenNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AtomSuggestedChildrenNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomSuggestedChildrenUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type AtomSuggestedChildrenUpdateFieldInput = {
  where?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  update?: InputMaybe<AtomSuggestedChildrenUpdateConnectionInput>;
  connect?: InputMaybe<Array<AtomSuggestedChildrenConnectFieldInput>>;
  disconnect?: InputMaybe<Array<AtomSuggestedChildrenDisconnectFieldInput>>;
  create?: InputMaybe<Array<AtomSuggestedChildrenCreateFieldInput>>;
  delete?: InputMaybe<Array<AtomSuggestedChildrenDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomSuggestedChildrenConnectOrCreateFieldInput>>;
};

export type AtomTagsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<AtomTagsAggregateInput>>;
  OR?: InputMaybe<Array<AtomTagsAggregateInput>>;
  NOT?: InputMaybe<AtomTagsAggregateInput>;
  node?: InputMaybe<AtomTagsNodeAggregationWhereInput>;
};

export type AtomTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type AtomTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type AtomTagsConnectionWhere = {
  AND?: InputMaybe<Array<AtomTagsConnectionWhere>>;
  OR?: InputMaybe<Array<AtomTagsConnectionWhere>>;
  NOT?: InputMaybe<AtomTagsConnectionWhere>;
  node?: InputMaybe<TagWhere>;
};

export type AtomTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: AtomTagsConnectOrCreateFieldInputOnCreate;
};

export type AtomTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type AtomTagsCreateFieldInput = {
  node: TagCreateInput;
};

export type AtomTagsDeleteFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type AtomTagsDisconnectFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>;
  disconnect?: InputMaybe<TagDisconnectInput>;
};

export type AtomTagsFieldInput = {
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>;
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>;
};

export type AtomTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AtomTagsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AtomTagsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AtomTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type AtomTagsUpdateFieldInput = {
  where?: InputMaybe<AtomTagsConnectionWhere>;
  update?: InputMaybe<AtomTagsUpdateConnectionInput>;
  connect?: InputMaybe<Array<AtomTagsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>;
  create?: InputMaybe<Array<AtomTagsCreateFieldInput>>;
  delete?: InputMaybe<Array<AtomTagsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>;
};

export type AtomUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  externalSourceType?: InputMaybe<Scalars['String']['input']>;
};

export type AtomUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  externalJsSource?: InputMaybe<Scalars['String']['input']>;
  externalCssSource?: InputMaybe<Scalars['String']['input']>;
  externalSourceType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AtomType>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
  tags?: InputMaybe<Array<AtomTagsUpdateFieldInput>>;
  api?: InputMaybe<AtomApiUpdateFieldInput>;
  requiredParents?: InputMaybe<Array<AtomRequiredParentsUpdateFieldInput>>;
  suggestedChildren?: InputMaybe<Array<AtomSuggestedChildrenUpdateFieldInput>>;
};

export type AtomWhere = {
  OR?: InputMaybe<Array<AtomWhere>>;
  AND?: InputMaybe<Array<AtomWhere>>;
  NOT?: InputMaybe<AtomWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_MATCHES?: InputMaybe<Scalars['String']['input']>;
  icon_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  icon_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  icon_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalJsSource?: InputMaybe<Scalars['String']['input']>;
  externalJsSource_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalJsSource_MATCHES?: InputMaybe<Scalars['String']['input']>;
  externalJsSource_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  externalJsSource_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalJsSource_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalCssSource?: InputMaybe<Scalars['String']['input']>;
  externalCssSource_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalCssSource_MATCHES?: InputMaybe<Scalars['String']['input']>;
  externalCssSource_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  externalCssSource_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalCssSource_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalSourceType?: InputMaybe<Scalars['String']['input']>;
  externalSourceType_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalSourceType_MATCHES?: InputMaybe<Scalars['String']['input']>;
  externalSourceType_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  externalSourceType_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  externalSourceType_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AtomType>;
  type_IN?: InputMaybe<Array<AtomType>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<AtomOwnerAggregateInput>;
  tagsAggregate?: InputMaybe<AtomTagsAggregateInput>;
  /** Return Atoms where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>;
  /** Return Atoms where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>;
  /** Return Atoms where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>;
  /** Return Atoms where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>;
  api?: InputMaybe<InterfaceTypeWhere>;
  api_NOT?: InputMaybe<InterfaceTypeWhere>;
  apiAggregate?: InputMaybe<AtomApiAggregateInput>;
  requiredParentsAggregate?: InputMaybe<AtomRequiredParentsAggregateInput>;
  /** Return Atoms where all of the related Atoms match this filter */
  requiredParents_ALL?: InputMaybe<AtomWhere>;
  /** Return Atoms where none of the related Atoms match this filter */
  requiredParents_NONE?: InputMaybe<AtomWhere>;
  /** Return Atoms where one of the related Atoms match this filter */
  requiredParents_SINGLE?: InputMaybe<AtomWhere>;
  /** Return Atoms where some of the related Atoms match this filter */
  requiredParents_SOME?: InputMaybe<AtomWhere>;
  suggestedChildrenAggregate?: InputMaybe<AtomSuggestedChildrenAggregateInput>;
  /** Return Atoms where all of the related Atoms match this filter */
  suggestedChildren_ALL?: InputMaybe<AtomWhere>;
  /** Return Atoms where none of the related Atoms match this filter */
  suggestedChildren_NONE?: InputMaybe<AtomWhere>;
  /** Return Atoms where one of the related Atoms match this filter */
  suggestedChildren_SINGLE?: InputMaybe<AtomWhere>;
  /** Return Atoms where some of the related Atoms match this filter */
  suggestedChildren_SOME?: InputMaybe<AtomWhere>;
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  /** Return Atoms where all of the related AtomTagsConnections match this filter */
  tagsConnection_ALL?: InputMaybe<AtomTagsConnectionWhere>;
  /** Return Atoms where none of the related AtomTagsConnections match this filter */
  tagsConnection_NONE?: InputMaybe<AtomTagsConnectionWhere>;
  /** Return Atoms where one of the related AtomTagsConnections match this filter */
  tagsConnection_SINGLE?: InputMaybe<AtomTagsConnectionWhere>;
  /** Return Atoms where some of the related AtomTagsConnections match this filter */
  tagsConnection_SOME?: InputMaybe<AtomTagsConnectionWhere>;
  apiConnection?: InputMaybe<AtomApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<AtomApiConnectionWhere>;
  /** Return Atoms where all of the related AtomRequiredParentsConnections match this filter */
  requiredParentsConnection_ALL?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  /** Return Atoms where none of the related AtomRequiredParentsConnections match this filter */
  requiredParentsConnection_NONE?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  /** Return Atoms where one of the related AtomRequiredParentsConnections match this filter */
  requiredParentsConnection_SINGLE?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  /** Return Atoms where some of the related AtomRequiredParentsConnections match this filter */
  requiredParentsConnection_SOME?: InputMaybe<AtomRequiredParentsConnectionWhere>;
  /** Return Atoms where all of the related AtomSuggestedChildrenConnections match this filter */
  suggestedChildrenConnection_ALL?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  /** Return Atoms where none of the related AtomSuggestedChildrenConnections match this filter */
  suggestedChildrenConnection_NONE?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  /** Return Atoms where one of the related AtomSuggestedChildrenConnections match this filter */
  suggestedChildrenConnection_SINGLE?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
  /** Return Atoms where some of the related AtomSuggestedChildrenConnections match this filter */
  suggestedChildrenConnection_SOME?: InputMaybe<AtomSuggestedChildrenConnectionWhere>;
};

export type BaseActionConnectInput = {
  store?: InputMaybe<BaseActionStoreConnectFieldInput>;
  element?: InputMaybe<BaseActionElementConnectFieldInput>;
  _on?: InputMaybe<BaseActionImplementationsConnectInput>;
};

export type BaseActionConnectWhere = {
  node: BaseActionWhere;
};

export type BaseActionCreateInput = {
  CodeAction?: InputMaybe<CodeActionCreateInput>;
  ApiAction?: InputMaybe<ApiActionCreateInput>;
};

export type BaseActionDeleteInput = {
  store?: InputMaybe<BaseActionStoreDeleteFieldInput>;
  element?: InputMaybe<BaseActionElementDeleteFieldInput>;
  _on?: InputMaybe<BaseActionImplementationsDeleteInput>;
};

export type BaseActionDisconnectInput = {
  store?: InputMaybe<BaseActionStoreDisconnectFieldInput>;
  element?: InputMaybe<BaseActionElementDisconnectFieldInput>;
  _on?: InputMaybe<BaseActionImplementationsDisconnectInput>;
};

export type BaseActionElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<BaseActionElementAggregateInput>>;
  OR?: InputMaybe<Array<BaseActionElementAggregateInput>>;
  NOT?: InputMaybe<BaseActionElementAggregateInput>;
  node?: InputMaybe<BaseActionElementNodeAggregationWhereInput>;
};

export type BaseActionElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type BaseActionElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type BaseActionElementConnectionWhere = {
  AND?: InputMaybe<Array<BaseActionElementConnectionWhere>>;
  OR?: InputMaybe<Array<BaseActionElementConnectionWhere>>;
  NOT?: InputMaybe<BaseActionElementConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type BaseActionElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: BaseActionElementConnectOrCreateFieldInputOnCreate;
};

export type BaseActionElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type BaseActionElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type BaseActionElementDeleteFieldInput = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type BaseActionElementDisconnectFieldInput = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type BaseActionElementFieldInput = {
  create?: InputMaybe<BaseActionElementCreateFieldInput>;
  connect?: InputMaybe<BaseActionElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<BaseActionElementConnectOrCreateFieldInput>;
};

export type BaseActionElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BaseActionElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BaseActionElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BaseActionElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type BaseActionElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type BaseActionElementUpdateFieldInput = {
  where?: InputMaybe<BaseActionElementConnectionWhere>;
  update?: InputMaybe<BaseActionElementUpdateConnectionInput>;
  connect?: InputMaybe<BaseActionElementConnectFieldInput>;
  disconnect?: InputMaybe<BaseActionElementDisconnectFieldInput>;
  create?: InputMaybe<BaseActionElementCreateFieldInput>;
  delete?: InputMaybe<BaseActionElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<BaseActionElementConnectOrCreateFieldInput>;
};

export type BaseActionImplementationsConnectInput = {
  CodeAction?: InputMaybe<Array<CodeActionConnectInput>>;
  ApiAction?: InputMaybe<Array<ApiActionConnectInput>>;
};

export type BaseActionImplementationsDeleteInput = {
  CodeAction?: InputMaybe<Array<CodeActionDeleteInput>>;
  ApiAction?: InputMaybe<Array<ApiActionDeleteInput>>;
};

export type BaseActionImplementationsDisconnectInput = {
  CodeAction?: InputMaybe<Array<CodeActionDisconnectInput>>;
  ApiAction?: InputMaybe<Array<ApiActionDisconnectInput>>;
};

export type BaseActionImplementationsUpdateInput = {
  CodeAction?: InputMaybe<CodeActionUpdateInput>;
  ApiAction?: InputMaybe<ApiActionUpdateInput>;
};

export type BaseActionImplementationsWhere = {
  CodeAction?: InputMaybe<CodeActionWhere>;
  ApiAction?: InputMaybe<ApiActionWhere>;
};

export type BaseActionOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more BaseActionSort objects to sort BaseActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<BaseActionSort>>>;
};

/** Fields to sort BaseActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one BaseActionSort object. */
export type BaseActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type BaseActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<BaseActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<BaseActionStoreAggregateInput>>;
  NOT?: InputMaybe<BaseActionStoreAggregateInput>;
  node?: InputMaybe<BaseActionStoreNodeAggregationWhereInput>;
};

export type BaseActionStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>;
  connect?: InputMaybe<StoreConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type BaseActionStoreConnectionSort = {
  node?: InputMaybe<StoreSort>;
};

export type BaseActionStoreConnectionWhere = {
  AND?: InputMaybe<Array<BaseActionStoreConnectionWhere>>;
  OR?: InputMaybe<Array<BaseActionStoreConnectionWhere>>;
  NOT?: InputMaybe<BaseActionStoreConnectionWhere>;
  node?: InputMaybe<StoreWhere>;
};

export type BaseActionStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere;
  onCreate: BaseActionStoreConnectOrCreateFieldInputOnCreate;
};

export type BaseActionStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput;
};

export type BaseActionStoreCreateFieldInput = {
  node: StoreCreateInput;
};

export type BaseActionStoreDeleteFieldInput = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};

export type BaseActionStoreDisconnectFieldInput = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
};

export type BaseActionStoreFieldInput = {
  create?: InputMaybe<BaseActionStoreCreateFieldInput>;
  connect?: InputMaybe<BaseActionStoreConnectFieldInput>;
  connectOrCreate?: InputMaybe<BaseActionStoreConnectOrCreateFieldInput>;
};

export type BaseActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BaseActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BaseActionStoreNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BaseActionStoreNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type BaseActionStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>;
};

export type BaseActionStoreUpdateFieldInput = {
  where?: InputMaybe<BaseActionStoreConnectionWhere>;
  update?: InputMaybe<BaseActionStoreUpdateConnectionInput>;
  connect?: InputMaybe<BaseActionStoreConnectFieldInput>;
  disconnect?: InputMaybe<BaseActionStoreDisconnectFieldInput>;
  create?: InputMaybe<BaseActionStoreCreateFieldInput>;
  delete?: InputMaybe<BaseActionStoreDeleteFieldInput>;
  connectOrCreate?: InputMaybe<BaseActionStoreConnectOrCreateFieldInput>;
};

export type BaseActionUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  _on?: InputMaybe<BaseActionImplementationsUpdateInput>;
  store?: InputMaybe<BaseActionStoreUpdateFieldInput>;
  element?: InputMaybe<BaseActionElementUpdateFieldInput>;
};

export type BaseActionWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  _on?: InputMaybe<BaseActionImplementationsWhere>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<BaseActionStoreAggregateInput>;
  element?: InputMaybe<ElementWhere>;
  element_NOT?: InputMaybe<ElementWhere>;
  elementAggregate?: InputMaybe<BaseActionElementAggregateInput>;
  storeConnection?: InputMaybe<BaseActionStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<BaseActionStoreConnectionWhere>;
  elementConnection?: InputMaybe<BaseActionElementConnectionWhere>;
  elementConnection_NOT?: InputMaybe<BaseActionElementConnectionWhere>;
};

export type BaseTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type BaseTypeConnectOrCreateWhere = {
  node: BaseTypeUniqueWhere;
};

export type BaseTypeConnectWhere = {
  node: BaseTypeWhere;
};

export type BaseTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type BaseTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type BaseTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type BaseTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind: TypeKind;
};

export type BaseTypeOptions = {
  /** Specify one or more BaseTypeSort objects to sort BaseTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BaseTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type BaseTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<BaseTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<BaseTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<BaseTypeOwnerAggregateInput>;
  node?: InputMaybe<BaseTypeOwnerNodeAggregationWhereInput>;
};

export type BaseTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BaseTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BaseTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BaseTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

/** Fields to sort BaseTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one BaseTypeSort object. */
export type BaseTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type BaseTypesWhere = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BaseTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BaseTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type BaseTypeWhere = {
  OR?: InputMaybe<Array<BaseTypeWhere>>;
  AND?: InputMaybe<Array<BaseTypeWhere>>;
  NOT?: InputMaybe<BaseTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<BaseTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type CodeActionConnectInput = {
  store?: InputMaybe<BaseActionStoreConnectFieldInput>;
  element?: InputMaybe<BaseActionElementConnectFieldInput>;
};

export type CodeActionConnectOrCreateInput = {
  store?: InputMaybe<BaseActionStoreConnectOrCreateFieldInput>;
  element?: InputMaybe<BaseActionElementConnectOrCreateFieldInput>;
};

export type CodeActionConnectOrCreateWhere = {
  node: CodeActionUniqueWhere;
};

export type CodeActionConnectWhere = {
  node: CodeActionWhere;
};

export type CodeActionCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  code: Scalars['String']['input'];
  type?: ActionKind;
  store?: InputMaybe<BaseActionStoreFieldInput>;
  element?: InputMaybe<BaseActionElementFieldInput>;
};

export type CodeActionDeleteInput = {
  store?: InputMaybe<BaseActionStoreDeleteFieldInput>;
  element?: InputMaybe<BaseActionElementDeleteFieldInput>;
};

export type CodeActionDisconnectInput = {
  store?: InputMaybe<BaseActionStoreDisconnectFieldInput>;
  element?: InputMaybe<BaseActionElementDisconnectFieldInput>;
};

export type CodeActionElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<CodeActionElementAggregateInput>>;
  OR?: InputMaybe<Array<CodeActionElementAggregateInput>>;
  NOT?: InputMaybe<CodeActionElementAggregateInput>;
  node?: InputMaybe<CodeActionElementNodeAggregationWhereInput>;
};

export type CodeActionElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeActionElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CodeActionElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CodeActionElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CodeActionOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  code: Scalars['String']['input'];
  type?: ActionKind;
};

export type CodeActionOptions = {
  /** Specify one or more CodeActionSort objects to sort CodeActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeActionSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CodeActionRelationInput = {
  store?: InputMaybe<BaseActionStoreCreateFieldInput>;
  element?: InputMaybe<BaseActionElementCreateFieldInput>;
};

/** Fields to sort CodeActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeActionSort object. */
export type CodeActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  code?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type CodeActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<CodeActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<CodeActionStoreAggregateInput>>;
  NOT?: InputMaybe<CodeActionStoreAggregateInput>;
  node?: InputMaybe<CodeActionStoreNodeAggregationWhereInput>;
};

export type CodeActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CodeActionStoreNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CodeActionStoreNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CodeActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CodeActionUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  store?: InputMaybe<BaseActionStoreUpdateFieldInput>;
  element?: InputMaybe<BaseActionElementUpdateFieldInput>;
};

export type CodeActionWhere = {
  OR?: InputMaybe<Array<CodeActionWhere>>;
  AND?: InputMaybe<Array<CodeActionWhere>>;
  NOT?: InputMaybe<CodeActionWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_MATCHES?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<CodeActionStoreAggregateInput>;
  element?: InputMaybe<ElementWhere>;
  element_NOT?: InputMaybe<ElementWhere>;
  elementAggregate?: InputMaybe<CodeActionElementAggregateInput>;
  storeConnection?: InputMaybe<BaseActionStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<BaseActionStoreConnectionWhere>;
  elementConnection?: InputMaybe<BaseActionElementConnectionWhere>;
  elementConnection_NOT?: InputMaybe<BaseActionElementConnectionWhere>;
};

export type CodeMirrorTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type CodeMirrorTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type CodeMirrorTypeConnectOrCreateWhere = {
  node: CodeMirrorTypeUniqueWhere;
};

export type CodeMirrorTypeConnectWhere = {
  node: CodeMirrorTypeWhere;
};

export type CodeMirrorTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  language: CodeMirrorLanguage;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type CodeMirrorTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type CodeMirrorTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type CodeMirrorTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  language: CodeMirrorLanguage;
};

export type CodeMirrorTypeOptions = {
  /** Specify one or more CodeMirrorTypeSort objects to sort CodeMirrorTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeMirrorTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CodeMirrorTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<CodeMirrorTypeOwnerAggregateInput>;
  node?: InputMaybe<CodeMirrorTypeOwnerNodeAggregationWhereInput>;
};

export type CodeMirrorTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CodeMirrorTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CodeMirrorTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort CodeMirrorTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeMirrorTypeSort object. */
export type CodeMirrorTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  language?: InputMaybe<SortDirection>;
};

export type CodeMirrorTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CodeMirrorTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<CodeMirrorLanguage>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type CodeMirrorTypeWhere = {
  OR?: InputMaybe<Array<CodeMirrorTypeWhere>>;
  AND?: InputMaybe<Array<CodeMirrorTypeWhere>>;
  NOT?: InputMaybe<CodeMirrorTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  language?: InputMaybe<CodeMirrorLanguage>;
  language_IN?: InputMaybe<Array<CodeMirrorLanguage>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<CodeMirrorTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type ComponentApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentApiAggregateInput>>;
  OR?: InputMaybe<Array<ComponentApiAggregateInput>>;
  NOT?: InputMaybe<ComponentApiAggregateInput>;
  node?: InputMaybe<ComponentApiNodeAggregationWhereInput>;
};

export type ComponentApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ComponentApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type ComponentApiConnectionWhere = {
  AND?: InputMaybe<Array<ComponentApiConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentApiConnectionWhere>>;
  NOT?: InputMaybe<ComponentApiConnectionWhere>;
  node?: InputMaybe<InterfaceTypeWhere>;
};

export type ComponentApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: ComponentApiConnectOrCreateFieldInputOnCreate;
};

export type ComponentApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type ComponentApiCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type ComponentApiDeleteFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type ComponentApiDisconnectFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type ComponentApiFieldInput = {
  create?: InputMaybe<ComponentApiCreateFieldInput>;
  connect?: InputMaybe<ComponentApiConnectFieldInput>;
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>;
};

export type ComponentApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentApiNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentApiNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type ComponentApiUpdateFieldInput = {
  where?: InputMaybe<ComponentApiConnectionWhere>;
  update?: InputMaybe<ComponentApiUpdateConnectionInput>;
  connect?: InputMaybe<ComponentApiConnectFieldInput>;
  disconnect?: InputMaybe<ComponentApiDisconnectFieldInput>;
  create?: InputMaybe<ComponentApiCreateFieldInput>;
  delete?: InputMaybe<ComponentApiDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ComponentApiConnectOrCreateFieldInput>;
};

export type ComponentChildrenContainerElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentChildrenContainerElementAggregateInput>>;
  OR?: InputMaybe<Array<ComponentChildrenContainerElementAggregateInput>>;
  NOT?: InputMaybe<ComponentChildrenContainerElementAggregateInput>;
  node?: InputMaybe<ComponentChildrenContainerElementNodeAggregationWhereInput>;
};

export type ComponentChildrenContainerElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ComponentChildrenContainerElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ComponentChildrenContainerElementConnectionWhere = {
  AND?: InputMaybe<Array<ComponentChildrenContainerElementConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentChildrenContainerElementConnectionWhere>>;
  NOT?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ComponentChildrenContainerElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ComponentChildrenContainerElementConnectOrCreateFieldInputOnCreate;
};

export type ComponentChildrenContainerElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ComponentChildrenContainerElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type ComponentChildrenContainerElementDeleteFieldInput = {
  where?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ComponentChildrenContainerElementDisconnectFieldInput = {
  where?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ComponentChildrenContainerElementFieldInput = {
  create?: InputMaybe<ComponentChildrenContainerElementCreateFieldInput>;
  connect?: InputMaybe<ComponentChildrenContainerElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<ComponentChildrenContainerElementConnectOrCreateFieldInput>;
};

export type ComponentChildrenContainerElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentChildrenContainerElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentChildrenContainerElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentChildrenContainerElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentChildrenContainerElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ComponentChildrenContainerElementUpdateFieldInput = {
  where?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  update?: InputMaybe<ComponentChildrenContainerElementUpdateConnectionInput>;
  connect?: InputMaybe<ComponentChildrenContainerElementConnectFieldInput>;
  disconnect?: InputMaybe<ComponentChildrenContainerElementDisconnectFieldInput>;
  create?: InputMaybe<ComponentChildrenContainerElementCreateFieldInput>;
  delete?: InputMaybe<ComponentChildrenContainerElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ComponentChildrenContainerElementConnectOrCreateFieldInput>;
};

export type ComponentConnectInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>;
  api?: InputMaybe<ComponentApiConnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  store?: InputMaybe<ComponentStoreConnectFieldInput>;
  props?: InputMaybe<ComponentPropsConnectFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementConnectFieldInput>;
};

export type ComponentConnectOrCreateInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>;
  api?: InputMaybe<ComponentApiConnectOrCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
  store?: InputMaybe<ComponentStoreConnectOrCreateFieldInput>;
  props?: InputMaybe<ComponentPropsConnectOrCreateFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementConnectOrCreateFieldInput>;
};

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere;
};

export type ComponentConnectWhere = {
  node: ComponentWhere;
};

export type ComponentCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  keyGenerator?: InputMaybe<Scalars['String']['input']>;
  rootElement?: InputMaybe<ComponentRootElementFieldInput>;
  api?: InputMaybe<ComponentApiFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
  store?: InputMaybe<ComponentStoreFieldInput>;
  props?: InputMaybe<ComponentPropsFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementFieldInput>;
};

export type ComponentDeleteInput = {
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>;
  api?: InputMaybe<ComponentApiDeleteFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
  store?: InputMaybe<ComponentStoreDeleteFieldInput>;
  props?: InputMaybe<ComponentPropsDeleteFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementDeleteFieldInput>;
};

export type ComponentDisconnectInput = {
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>;
  api?: InputMaybe<ComponentApiDisconnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
  store?: InputMaybe<ComponentStoreDisconnectFieldInput>;
  props?: InputMaybe<ComponentPropsDisconnectFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementDisconnectFieldInput>;
};

export type ComponentOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  keyGenerator?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentOptions = {
  /** Specify one or more ComponentSort objects to sort Components by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ComponentSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ComponentOwnerAggregateInput>>;
  NOT?: InputMaybe<ComponentOwnerAggregateInput>;
  node?: InputMaybe<ComponentOwnerNodeAggregationWhereInput>;
};

export type ComponentOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentPropsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentPropsAggregateInput>>;
  OR?: InputMaybe<Array<ComponentPropsAggregateInput>>;
  NOT?: InputMaybe<ComponentPropsAggregateInput>;
  node?: InputMaybe<ComponentPropsNodeAggregationWhereInput>;
};

export type ComponentPropsConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ComponentPropsConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ComponentPropsConnectionWhere = {
  AND?: InputMaybe<Array<ComponentPropsConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentPropsConnectionWhere>>;
  NOT?: InputMaybe<ComponentPropsConnectionWhere>;
  node?: InputMaybe<PropWhere>;
};

export type ComponentPropsConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: ComponentPropsConnectOrCreateFieldInputOnCreate;
};

export type ComponentPropsConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type ComponentPropsCreateFieldInput = {
  node: PropCreateInput;
};

export type ComponentPropsDeleteFieldInput = {
  where?: InputMaybe<ComponentPropsConnectionWhere>;
};

export type ComponentPropsDisconnectFieldInput = {
  where?: InputMaybe<ComponentPropsConnectionWhere>;
};

export type ComponentPropsFieldInput = {
  create?: InputMaybe<ComponentPropsCreateFieldInput>;
  connect?: InputMaybe<ComponentPropsConnectFieldInput>;
  connectOrCreate?: InputMaybe<ComponentPropsConnectOrCreateFieldInput>;
};

export type ComponentPropsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentPropsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentPropsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentPropsNodeAggregationWhereInput>;
  data_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentPropsUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type ComponentPropsUpdateFieldInput = {
  where?: InputMaybe<ComponentPropsConnectionWhere>;
  update?: InputMaybe<ComponentPropsUpdateConnectionInput>;
  connect?: InputMaybe<ComponentPropsConnectFieldInput>;
  disconnect?: InputMaybe<ComponentPropsDisconnectFieldInput>;
  create?: InputMaybe<ComponentPropsCreateFieldInput>;
  delete?: InputMaybe<ComponentPropsDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ComponentPropsConnectOrCreateFieldInput>;
};

export type ComponentRelationInput = {
  rootElement?: InputMaybe<ComponentRootElementCreateFieldInput>;
  api?: InputMaybe<ComponentApiCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
  store?: InputMaybe<ComponentStoreCreateFieldInput>;
  props?: InputMaybe<ComponentPropsCreateFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementCreateFieldInput>;
};

export type ComponentRootElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentRootElementAggregateInput>>;
  OR?: InputMaybe<Array<ComponentRootElementAggregateInput>>;
  NOT?: InputMaybe<ComponentRootElementAggregateInput>;
  node?: InputMaybe<ComponentRootElementNodeAggregationWhereInput>;
};

export type ComponentRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ComponentRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ComponentRootElementConnectionWhere = {
  AND?: InputMaybe<Array<ComponentRootElementConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentRootElementConnectionWhere>>;
  NOT?: InputMaybe<ComponentRootElementConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ComponentRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ComponentRootElementConnectOrCreateFieldInputOnCreate;
};

export type ComponentRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ComponentRootElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type ComponentRootElementDeleteFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ComponentRootElementDisconnectFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ComponentRootElementFieldInput = {
  create?: InputMaybe<ComponentRootElementCreateFieldInput>;
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>;
};

export type ComponentRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentRootElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentRootElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ComponentRootElementUpdateFieldInput = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>;
  update?: InputMaybe<ComponentRootElementUpdateConnectionInput>;
  connect?: InputMaybe<ComponentRootElementConnectFieldInput>;
  disconnect?: InputMaybe<ComponentRootElementDisconnectFieldInput>;
  create?: InputMaybe<ComponentRootElementCreateFieldInput>;
  delete?: InputMaybe<ComponentRootElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>;
};

/** Fields to sort Components by. The order in which sorts are applied is not guaranteed when specifying many fields in one ComponentSort object. */
export type ComponentSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  keyGenerator?: InputMaybe<SortDirection>;
};

export type ComponentStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ComponentStoreAggregateInput>>;
  OR?: InputMaybe<Array<ComponentStoreAggregateInput>>;
  NOT?: InputMaybe<ComponentStoreAggregateInput>;
  node?: InputMaybe<ComponentStoreNodeAggregationWhereInput>;
};

export type ComponentStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>;
  connect?: InputMaybe<StoreConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ComponentStoreConnectionSort = {
  node?: InputMaybe<StoreSort>;
};

export type ComponentStoreConnectionWhere = {
  AND?: InputMaybe<Array<ComponentStoreConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentStoreConnectionWhere>>;
  NOT?: InputMaybe<ComponentStoreConnectionWhere>;
  node?: InputMaybe<StoreWhere>;
};

export type ComponentStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere;
  onCreate: ComponentStoreConnectOrCreateFieldInputOnCreate;
};

export type ComponentStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput;
};

export type ComponentStoreCreateFieldInput = {
  node: StoreCreateInput;
};

export type ComponentStoreDeleteFieldInput = {
  where?: InputMaybe<ComponentStoreConnectionWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};

export type ComponentStoreDisconnectFieldInput = {
  where?: InputMaybe<ComponentStoreConnectionWhere>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
};

export type ComponentStoreFieldInput = {
  create?: InputMaybe<ComponentStoreCreateFieldInput>;
  connect?: InputMaybe<ComponentStoreConnectFieldInput>;
  connectOrCreate?: InputMaybe<ComponentStoreConnectOrCreateFieldInput>;
};

export type ComponentStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentStoreNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ComponentStoreNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>;
};

export type ComponentStoreUpdateFieldInput = {
  where?: InputMaybe<ComponentStoreConnectionWhere>;
  update?: InputMaybe<ComponentStoreUpdateConnectionInput>;
  connect?: InputMaybe<ComponentStoreConnectFieldInput>;
  disconnect?: InputMaybe<ComponentStoreDisconnectFieldInput>;
  create?: InputMaybe<ComponentStoreCreateFieldInput>;
  delete?: InputMaybe<ComponentStoreDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ComponentStoreConnectOrCreateFieldInput>;
};

export type ComponentUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  keyGenerator?: InputMaybe<Scalars['String']['input']>;
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>;
  api?: InputMaybe<ComponentApiUpdateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
  store?: InputMaybe<ComponentStoreUpdateFieldInput>;
  props?: InputMaybe<ComponentPropsUpdateFieldInput>;
  childrenContainerElement?: InputMaybe<ComponentChildrenContainerElementUpdateFieldInput>;
};

export type ComponentWhere = {
  OR?: InputMaybe<Array<ComponentWhere>>;
  AND?: InputMaybe<Array<ComponentWhere>>;
  NOT?: InputMaybe<ComponentWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  keyGenerator?: InputMaybe<Scalars['String']['input']>;
  keyGenerator_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keyGenerator_MATCHES?: InputMaybe<Scalars['String']['input']>;
  keyGenerator_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  keyGenerator_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  keyGenerator_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  rootElement?: InputMaybe<ElementWhere>;
  rootElement_NOT?: InputMaybe<ElementWhere>;
  rootElementAggregate?: InputMaybe<ComponentRootElementAggregateInput>;
  api?: InputMaybe<InterfaceTypeWhere>;
  api_NOT?: InputMaybe<InterfaceTypeWhere>;
  apiAggregate?: InputMaybe<ComponentApiAggregateInput>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ComponentOwnerAggregateInput>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<ComponentStoreAggregateInput>;
  props?: InputMaybe<PropWhere>;
  props_NOT?: InputMaybe<PropWhere>;
  propsAggregate?: InputMaybe<ComponentPropsAggregateInput>;
  childrenContainerElement?: InputMaybe<ElementWhere>;
  childrenContainerElement_NOT?: InputMaybe<ElementWhere>;
  childrenContainerElementAggregate?: InputMaybe<ComponentChildrenContainerElementAggregateInput>;
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>;
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>;
  apiConnection?: InputMaybe<ComponentApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<ComponentApiConnectionWhere>;
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  storeConnection?: InputMaybe<ComponentStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<ComponentStoreConnectionWhere>;
  propsConnection?: InputMaybe<ComponentPropsConnectionWhere>;
  propsConnection_NOT?: InputMaybe<ComponentPropsConnectionWhere>;
  childrenContainerElementConnection?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
  childrenContainerElementConnection_NOT?: InputMaybe<ComponentChildrenContainerElementConnectionWhere>;
};

export type DomainAppAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<DomainAppAggregateInput>>;
  OR?: InputMaybe<Array<DomainAppAggregateInput>>;
  NOT?: InputMaybe<DomainAppAggregateInput>;
  node?: InputMaybe<DomainAppNodeAggregationWhereInput>;
};

export type DomainAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<AppConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type DomainAppConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type DomainAppConnectionWhere = {
  AND?: InputMaybe<Array<DomainAppConnectionWhere>>;
  OR?: InputMaybe<Array<DomainAppConnectionWhere>>;
  NOT?: InputMaybe<DomainAppConnectionWhere>;
  node?: InputMaybe<AppWhere>;
};

export type DomainAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere;
  onCreate: DomainAppConnectOrCreateFieldInputOnCreate;
};

export type DomainAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput;
};

export type DomainAppCreateFieldInput = {
  node: AppCreateInput;
};

export type DomainAppDeleteFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>;
  delete?: InputMaybe<AppDeleteInput>;
};

export type DomainAppDisconnectFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>;
  disconnect?: InputMaybe<AppDisconnectInput>;
};

export type DomainAppFieldInput = {
  create?: InputMaybe<DomainAppCreateFieldInput>;
  connect?: InputMaybe<DomainAppConnectFieldInput>;
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>;
};

export type DomainAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<DomainAppNodeAggregationWhereInput>>;
  NOT?: InputMaybe<DomainAppNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type DomainAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>;
};

export type DomainAppUpdateFieldInput = {
  where?: InputMaybe<DomainAppConnectionWhere>;
  update?: InputMaybe<DomainAppUpdateConnectionInput>;
  connect?: InputMaybe<DomainAppConnectFieldInput>;
  disconnect?: InputMaybe<DomainAppDisconnectFieldInput>;
  create?: InputMaybe<DomainAppCreateFieldInput>;
  delete?: InputMaybe<DomainAppDeleteFieldInput>;
  connectOrCreate?: InputMaybe<DomainAppConnectOrCreateFieldInput>;
};

export type DomainConnectInput = {
  app?: InputMaybe<DomainAppConnectFieldInput>;
};

export type DomainConnectOrCreateInput = {
  app?: InputMaybe<DomainAppConnectOrCreateFieldInput>;
};

export type DomainConnectOrCreateWhere = {
  node: DomainUniqueWhere;
};

export type DomainConnectWhere = {
  node: DomainWhere;
};

export type DomainCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  app?: InputMaybe<DomainAppFieldInput>;
};

export type DomainDeleteInput = {
  app?: InputMaybe<DomainAppDeleteFieldInput>;
};

export type DomainDisconnectInput = {
  app?: InputMaybe<DomainAppDisconnectFieldInput>;
};

export type DomainOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type DomainOptions = {
  /** Specify one or more DomainSort objects to sort Domains by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DomainSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DomainRelationInput = {
  app?: InputMaybe<DomainAppCreateFieldInput>;
};

/** Fields to sort Domains by. The order in which sorts are applied is not guaranteed when specifying many fields in one DomainSort object. */
export type DomainSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type DomainUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DomainUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  app?: InputMaybe<DomainAppUpdateFieldInput>;
};

export type DomainWhere = {
  OR?: InputMaybe<Array<DomainWhere>>;
  AND?: InputMaybe<Array<DomainWhere>>;
  NOT?: InputMaybe<DomainWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  app?: InputMaybe<AppWhere>;
  app_NOT?: InputMaybe<AppWhere>;
  appAggregate?: InputMaybe<DomainAppAggregateInput>;
  appConnection?: InputMaybe<DomainAppConnectionWhere>;
  appConnection_NOT?: InputMaybe<DomainAppConnectionWhere>;
};

export type ElementConnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingConnectFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildConnectFieldInput>;
  parent?: InputMaybe<ElementParentConnectFieldInput>;
  page?: InputMaybe<ElementPageConnectFieldInput>;
  props?: InputMaybe<ElementPropsConnectFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentConnectFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionConnectFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionConnectFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>;
};

export type ElementConnectOrCreateInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>;
  parent?: InputMaybe<ElementParentConnectOrCreateFieldInput>;
  page?: InputMaybe<ElementPageConnectOrCreateFieldInput>;
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>;
};

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere;
};

export type ElementConnectWhere = {
  node: ElementWhere;
};

export type ElementCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  customCss?: InputMaybe<Scalars['String']['input']>;
  guiCss?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<ElementNextSiblingFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildFieldInput>;
  parent?: InputMaybe<ElementParentFieldInput>;
  page?: InputMaybe<ElementPageFieldInput>;
  props?: InputMaybe<ElementPropsFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeFieldInput>;
};

export type ElementDeleteInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDeleteFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingDeleteFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildDeleteFieldInput>;
  parent?: InputMaybe<ElementParentDeleteFieldInput>;
  page?: InputMaybe<ElementPageDeleteFieldInput>;
  props?: InputMaybe<ElementPropsDeleteFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentDeleteFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionDeleteFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionDeleteFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeDeleteFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeDeleteFieldInput>;
};

export type ElementDisconnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDisconnectFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildDisconnectFieldInput>;
  parent?: InputMaybe<ElementParentDisconnectFieldInput>;
  page?: InputMaybe<ElementPageDisconnectFieldInput>;
  props?: InputMaybe<ElementPropsDisconnectFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentDisconnectFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionDisconnectFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionDisconnectFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeDisconnectFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeDisconnectFieldInput>;
};

export type ElementFirstChildAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementFirstChildAggregateInput>>;
  OR?: InputMaybe<Array<ElementFirstChildAggregateInput>>;
  NOT?: InputMaybe<ElementFirstChildAggregateInput>;
  node?: InputMaybe<ElementFirstChildNodeAggregationWhereInput>;
};

export type ElementFirstChildConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementFirstChildConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementFirstChildConnectionWhere = {
  AND?: InputMaybe<Array<ElementFirstChildConnectionWhere>>;
  OR?: InputMaybe<Array<ElementFirstChildConnectionWhere>>;
  NOT?: InputMaybe<ElementFirstChildConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ElementFirstChildConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementFirstChildConnectOrCreateFieldInputOnCreate;
};

export type ElementFirstChildConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ElementFirstChildCreateFieldInput = {
  node: ElementCreateInput;
};

export type ElementFirstChildDeleteFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementFirstChildDisconnectFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementFirstChildFieldInput = {
  create?: InputMaybe<ElementFirstChildCreateFieldInput>;
  connect?: InputMaybe<ElementFirstChildConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>;
};

export type ElementFirstChildNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementFirstChildNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementFirstChildNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementFirstChildNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementFirstChildUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ElementFirstChildUpdateFieldInput = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>;
  update?: InputMaybe<ElementFirstChildUpdateConnectionInput>;
  connect?: InputMaybe<ElementFirstChildConnectFieldInput>;
  disconnect?: InputMaybe<ElementFirstChildDisconnectFieldInput>;
  create?: InputMaybe<ElementFirstChildCreateFieldInput>;
  delete?: InputMaybe<ElementFirstChildDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>;
};

export type ElementNextSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementNextSiblingAggregateInput>>;
  OR?: InputMaybe<Array<ElementNextSiblingAggregateInput>>;
  NOT?: InputMaybe<ElementNextSiblingAggregateInput>;
  node?: InputMaybe<ElementNextSiblingNodeAggregationWhereInput>;
};

export type ElementNextSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementNextSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementNextSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>;
  NOT?: InputMaybe<ElementNextSiblingConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ElementNextSiblingConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementNextSiblingConnectOrCreateFieldInputOnCreate;
};

export type ElementNextSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ElementNextSiblingCreateFieldInput = {
  node: ElementCreateInput;
};

export type ElementNextSiblingDeleteFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementNextSiblingDisconnectFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementNextSiblingFieldInput = {
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>;
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>;
};

export type ElementNextSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementNextSiblingNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementNextSiblingNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementNextSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ElementNextSiblingUpdateFieldInput = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>;
  update?: InputMaybe<ElementNextSiblingUpdateConnectionInput>;
  connect?: InputMaybe<ElementNextSiblingConnectFieldInput>;
  disconnect?: InputMaybe<ElementNextSiblingDisconnectFieldInput>;
  create?: InputMaybe<ElementNextSiblingCreateFieldInput>;
  delete?: InputMaybe<ElementNextSiblingDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>;
};

export type ElementOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  customCss?: InputMaybe<Scalars['String']['input']>;
  guiCss?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression?: InputMaybe<Scalars['String']['input']>;
};

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementPageAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementPageAggregateInput>>;
  OR?: InputMaybe<Array<ElementPageAggregateInput>>;
  NOT?: InputMaybe<ElementPageAggregateInput>;
  node?: InputMaybe<ElementPageNodeAggregationWhereInput>;
};

export type ElementPageConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>;
  connect?: InputMaybe<PageConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementPageConnectionSort = {
  node?: InputMaybe<PageSort>;
};

export type ElementPageConnectionWhere = {
  AND?: InputMaybe<Array<ElementPageConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPageConnectionWhere>>;
  NOT?: InputMaybe<ElementPageConnectionWhere>;
  node?: InputMaybe<PageWhere>;
};

export type ElementPageConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere;
  onCreate: ElementPageConnectOrCreateFieldInputOnCreate;
};

export type ElementPageConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput;
};

export type ElementPageCreateFieldInput = {
  node: PageCreateInput;
};

export type ElementPageDeleteFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>;
  delete?: InputMaybe<PageDeleteInput>;
};

export type ElementPageDisconnectFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>;
  disconnect?: InputMaybe<PageDisconnectInput>;
};

export type ElementPageFieldInput = {
  create?: InputMaybe<ElementPageCreateFieldInput>;
  connect?: InputMaybe<ElementPageConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>;
};

export type ElementPageNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementPageNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementPageNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementPageUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>;
};

export type ElementPageUpdateFieldInput = {
  where?: InputMaybe<ElementPageConnectionWhere>;
  update?: InputMaybe<ElementPageUpdateConnectionInput>;
  connect?: InputMaybe<ElementPageConnectFieldInput>;
  disconnect?: InputMaybe<ElementPageDisconnectFieldInput>;
  create?: InputMaybe<ElementPageCreateFieldInput>;
  delete?: InputMaybe<ElementPageDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementPageConnectOrCreateFieldInput>;
};

export type ElementParentAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementParentAggregateInput>>;
  OR?: InputMaybe<Array<ElementParentAggregateInput>>;
  NOT?: InputMaybe<ElementParentAggregateInput>;
  node?: InputMaybe<ElementParentNodeAggregationWhereInput>;
};

export type ElementParentComponentAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementParentComponentAggregateInput>>;
  OR?: InputMaybe<Array<ElementParentComponentAggregateInput>>;
  NOT?: InputMaybe<ElementParentComponentAggregateInput>;
  node?: InputMaybe<ElementParentComponentNodeAggregationWhereInput>;
};

export type ElementParentComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<ComponentConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementParentComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type ElementParentComponentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentComponentConnectionWhere>>;
  OR?: InputMaybe<Array<ElementParentComponentConnectionWhere>>;
  NOT?: InputMaybe<ElementParentComponentConnectionWhere>;
  node?: InputMaybe<ComponentWhere>;
};

export type ElementParentComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere;
  onCreate: ElementParentComponentConnectOrCreateFieldInputOnCreate;
};

export type ElementParentComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput;
};

export type ElementParentComponentCreateFieldInput = {
  node: ComponentCreateInput;
};

export type ElementParentComponentDeleteFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};

export type ElementParentComponentDisconnectFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
};

export type ElementParentComponentFieldInput = {
  create?: InputMaybe<ElementParentComponentCreateFieldInput>;
  connect?: InputMaybe<ElementParentComponentConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>;
};

export type ElementParentComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentComponentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementParentComponentNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementParentComponentNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementParentComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type ElementParentComponentUpdateFieldInput = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>;
  update?: InputMaybe<ElementParentComponentUpdateConnectionInput>;
  connect?: InputMaybe<ElementParentComponentConnectFieldInput>;
  disconnect?: InputMaybe<ElementParentComponentDisconnectFieldInput>;
  create?: InputMaybe<ElementParentComponentCreateFieldInput>;
  delete?: InputMaybe<ElementParentComponentDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>;
};

export type ElementParentConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementParentConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementParentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentConnectionWhere>>;
  OR?: InputMaybe<Array<ElementParentConnectionWhere>>;
  NOT?: InputMaybe<ElementParentConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ElementParentConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementParentConnectOrCreateFieldInputOnCreate;
};

export type ElementParentConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ElementParentCreateFieldInput = {
  node: ElementCreateInput;
};

export type ElementParentDeleteFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementParentDisconnectFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementParentFieldInput = {
  create?: InputMaybe<ElementParentCreateFieldInput>;
  connect?: InputMaybe<ElementParentConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>;
};

export type ElementParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementParentNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementParentUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ElementParentUpdateFieldInput = {
  where?: InputMaybe<ElementParentConnectionWhere>;
  update?: InputMaybe<ElementParentUpdateConnectionInput>;
  connect?: InputMaybe<ElementParentConnectFieldInput>;
  disconnect?: InputMaybe<ElementParentDisconnectFieldInput>;
  create?: InputMaybe<ElementParentCreateFieldInput>;
  delete?: InputMaybe<ElementParentDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>;
};

export type ElementPostRenderActionConnectFieldInput = {
  connect?: InputMaybe<BaseActionConnectInput>;
  where?: InputMaybe<BaseActionConnectWhere>;
};

export type ElementPostRenderActionConnectionSort = {
  node?: InputMaybe<BaseActionSort>;
};

export type ElementPostRenderActionConnectionWhere = {
  AND?: InputMaybe<Array<ElementPostRenderActionConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPostRenderActionConnectionWhere>>;
  NOT?: InputMaybe<ElementPostRenderActionConnectionWhere>;
  node?: InputMaybe<BaseActionWhere>;
};

export type ElementPostRenderActionCreateFieldInput = {
  node: BaseActionCreateInput;
};

export type ElementPostRenderActionDeleteFieldInput = {
  delete?: InputMaybe<BaseActionDeleteInput>;
  where?: InputMaybe<ElementPostRenderActionConnectionWhere>;
};

export type ElementPostRenderActionDisconnectFieldInput = {
  disconnect?: InputMaybe<BaseActionDisconnectInput>;
  where?: InputMaybe<ElementPostRenderActionConnectionWhere>;
};

export type ElementPostRenderActionFieldInput = {
  create?: InputMaybe<ElementPostRenderActionCreateFieldInput>;
  connect?: InputMaybe<ElementPostRenderActionConnectFieldInput>;
};

export type ElementPostRenderActionUpdateConnectionInput = {
  node?: InputMaybe<BaseActionUpdateInput>;
};

export type ElementPostRenderActionUpdateFieldInput = {
  connect?: InputMaybe<ElementPostRenderActionConnectFieldInput>;
  create?: InputMaybe<ElementPostRenderActionCreateFieldInput>;
  delete?: InputMaybe<ElementPostRenderActionDeleteFieldInput>;
  disconnect?: InputMaybe<ElementPostRenderActionDisconnectFieldInput>;
  update?: InputMaybe<ElementPostRenderActionUpdateConnectionInput>;
  where?: InputMaybe<ElementPostRenderActionConnectionWhere>;
};

export type ElementPreRenderActionConnectFieldInput = {
  connect?: InputMaybe<BaseActionConnectInput>;
  where?: InputMaybe<BaseActionConnectWhere>;
};

export type ElementPreRenderActionConnectionSort = {
  node?: InputMaybe<BaseActionSort>;
};

export type ElementPreRenderActionConnectionWhere = {
  AND?: InputMaybe<Array<ElementPreRenderActionConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPreRenderActionConnectionWhere>>;
  NOT?: InputMaybe<ElementPreRenderActionConnectionWhere>;
  node?: InputMaybe<BaseActionWhere>;
};

export type ElementPreRenderActionCreateFieldInput = {
  node: BaseActionCreateInput;
};

export type ElementPreRenderActionDeleteFieldInput = {
  delete?: InputMaybe<BaseActionDeleteInput>;
  where?: InputMaybe<ElementPreRenderActionConnectionWhere>;
};

export type ElementPreRenderActionDisconnectFieldInput = {
  disconnect?: InputMaybe<BaseActionDisconnectInput>;
  where?: InputMaybe<ElementPreRenderActionConnectionWhere>;
};

export type ElementPreRenderActionFieldInput = {
  create?: InputMaybe<ElementPreRenderActionCreateFieldInput>;
  connect?: InputMaybe<ElementPreRenderActionConnectFieldInput>;
};

export type ElementPreRenderActionUpdateConnectionInput = {
  node?: InputMaybe<BaseActionUpdateInput>;
};

export type ElementPreRenderActionUpdateFieldInput = {
  connect?: InputMaybe<ElementPreRenderActionConnectFieldInput>;
  create?: InputMaybe<ElementPreRenderActionCreateFieldInput>;
  delete?: InputMaybe<ElementPreRenderActionDeleteFieldInput>;
  disconnect?: InputMaybe<ElementPreRenderActionDisconnectFieldInput>;
  update?: InputMaybe<ElementPreRenderActionUpdateConnectionInput>;
  where?: InputMaybe<ElementPreRenderActionConnectionWhere>;
};

export type ElementPrevSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>;
  OR?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>;
  NOT?: InputMaybe<ElementPrevSiblingAggregateInput>;
  node?: InputMaybe<ElementPrevSiblingNodeAggregationWhereInput>;
};

export type ElementPrevSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementPrevSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementPrevSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>;
  NOT?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type ElementPrevSiblingConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementPrevSiblingConnectOrCreateFieldInputOnCreate;
};

export type ElementPrevSiblingConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type ElementPrevSiblingCreateFieldInput = {
  node: ElementCreateInput;
};

export type ElementPrevSiblingDeleteFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementPrevSiblingDisconnectFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementPrevSiblingFieldInput = {
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>;
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>;
};

export type ElementPrevSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementPrevSiblingNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementPrevSiblingNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementPrevSiblingUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type ElementPrevSiblingUpdateFieldInput = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  update?: InputMaybe<ElementPrevSiblingUpdateConnectionInput>;
  connect?: InputMaybe<ElementPrevSiblingConnectFieldInput>;
  disconnect?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>;
  create?: InputMaybe<ElementPrevSiblingCreateFieldInput>;
  delete?: InputMaybe<ElementPrevSiblingDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>;
};

export type ElementPropsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementPropsAggregateInput>>;
  OR?: InputMaybe<Array<ElementPropsAggregateInput>>;
  NOT?: InputMaybe<ElementPropsAggregateInput>;
  node?: InputMaybe<ElementPropsNodeAggregationWhereInput>;
};

export type ElementPropsConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementPropsConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ElementPropsConnectionWhere = {
  AND?: InputMaybe<Array<ElementPropsConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPropsConnectionWhere>>;
  NOT?: InputMaybe<ElementPropsConnectionWhere>;
  node?: InputMaybe<PropWhere>;
};

export type ElementPropsConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: ElementPropsConnectOrCreateFieldInputOnCreate;
};

export type ElementPropsConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type ElementPropsCreateFieldInput = {
  node: PropCreateInput;
};

export type ElementPropsDeleteFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>;
};

export type ElementPropsDisconnectFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>;
};

export type ElementPropsFieldInput = {
  create?: InputMaybe<ElementPropsCreateFieldInput>;
  connect?: InputMaybe<ElementPropsConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>;
};

export type ElementPropsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementPropsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementPropsNodeAggregationWhereInput>;
  data_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementPropsUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type ElementPropsUpdateFieldInput = {
  where?: InputMaybe<ElementPropsConnectionWhere>;
  update?: InputMaybe<ElementPropsUpdateConnectionInput>;
  connect?: InputMaybe<ElementPropsConnectFieldInput>;
  disconnect?: InputMaybe<ElementPropsDisconnectFieldInput>;
  create?: InputMaybe<ElementPropsCreateFieldInput>;
  delete?: InputMaybe<ElementPropsDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementPropsConnectOrCreateFieldInput>;
};

export type ElementRelationInput = {
  nextSibling?: InputMaybe<ElementNextSiblingCreateFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingCreateFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildCreateFieldInput>;
  parent?: InputMaybe<ElementParentCreateFieldInput>;
  page?: InputMaybe<ElementPageCreateFieldInput>;
  props?: InputMaybe<ElementPropsCreateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentCreateFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionCreateFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionCreateFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>;
};

export type ElementRenderAtomTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementRenderAtomTypeAggregateInput>>;
  OR?: InputMaybe<Array<ElementRenderAtomTypeAggregateInput>>;
  NOT?: InputMaybe<ElementRenderAtomTypeAggregateInput>;
  node?: InputMaybe<ElementRenderAtomTypeNodeAggregationWhereInput>;
};

export type ElementRenderAtomTypeConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<AtomConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementRenderAtomTypeConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type ElementRenderAtomTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementRenderAtomTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ElementRenderAtomTypeConnectionWhere>>;
  NOT?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type ElementRenderAtomTypeConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: ElementRenderAtomTypeConnectOrCreateFieldInputOnCreate;
};

export type ElementRenderAtomTypeConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type ElementRenderAtomTypeCreateFieldInput = {
  node: AtomCreateInput;
};

export type ElementRenderAtomTypeDeleteFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type ElementRenderAtomTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type ElementRenderAtomTypeFieldInput = {
  create?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>;
  connect?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>;
};

export type ElementRenderAtomTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementRenderAtomTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementRenderAtomTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementRenderAtomTypeNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementRenderAtomTypeUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type ElementRenderAtomTypeUpdateFieldInput = {
  where?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  update?: InputMaybe<ElementRenderAtomTypeUpdateConnectionInput>;
  connect?: InputMaybe<ElementRenderAtomTypeConnectFieldInput>;
  disconnect?: InputMaybe<ElementRenderAtomTypeDisconnectFieldInput>;
  create?: InputMaybe<ElementRenderAtomTypeCreateFieldInput>;
  delete?: InputMaybe<ElementRenderAtomTypeDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementRenderAtomTypeConnectOrCreateFieldInput>;
};

export type ElementRenderComponentTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementRenderComponentTypeAggregateInput>>;
  OR?: InputMaybe<Array<ElementRenderComponentTypeAggregateInput>>;
  NOT?: InputMaybe<ElementRenderComponentTypeAggregateInput>;
  node?: InputMaybe<ElementRenderComponentTypeNodeAggregationWhereInput>;
};

export type ElementRenderComponentTypeConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<ComponentConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ElementRenderComponentTypeConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type ElementRenderComponentTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementRenderComponentTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ElementRenderComponentTypeConnectionWhere>>;
  NOT?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  node?: InputMaybe<ComponentWhere>;
};

export type ElementRenderComponentTypeConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere;
  onCreate: ElementRenderComponentTypeConnectOrCreateFieldInputOnCreate;
};

export type ElementRenderComponentTypeConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput;
};

export type ElementRenderComponentTypeCreateFieldInput = {
  node: ComponentCreateInput;
};

export type ElementRenderComponentTypeDeleteFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};

export type ElementRenderComponentTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
};

export type ElementRenderComponentTypeFieldInput = {
  create?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>;
  connect?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>;
};

export type ElementRenderComponentTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementRenderComponentTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementRenderComponentTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementRenderComponentTypeNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementRenderComponentTypeUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type ElementRenderComponentTypeUpdateFieldInput = {
  where?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  update?: InputMaybe<ElementRenderComponentTypeUpdateConnectionInput>;
  connect?: InputMaybe<ElementRenderComponentTypeConnectFieldInput>;
  disconnect?: InputMaybe<ElementRenderComponentTypeDisconnectFieldInput>;
  create?: InputMaybe<ElementRenderComponentTypeCreateFieldInput>;
  delete?: InputMaybe<ElementRenderComponentTypeDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementRenderComponentTypeConnectOrCreateFieldInput>;
};

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  customCss?: InputMaybe<SortDirection>;
  guiCss?: InputMaybe<SortDirection>;
  propTransformationJs?: InputMaybe<SortDirection>;
  renderForEachPropKey?: InputMaybe<SortDirection>;
  renderIfExpression?: InputMaybe<SortDirection>;
};

export type ElementTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type ElementTypeConnectOrCreateWhere = {
  node: ElementTypeUniqueWhere;
};

export type ElementTypeConnectWhere = {
  node: ElementTypeWhere;
};

export type ElementTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  elementKind: ElementTypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type ElementTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  elementKind: ElementTypeKind;
};

export type ElementTypeOptions = {
  /** Specify one or more ElementTypeSort objects to sort ElementTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<ElementTypeOwnerAggregateInput>;
  node?: InputMaybe<ElementTypeOwnerNodeAggregationWhereInput>;
};

export type ElementTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ElementTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ElementTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  elementKind?: InputMaybe<SortDirection>;
};

export type ElementTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ElementTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  elementKind?: InputMaybe<ElementTypeKind>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type ElementTypeWhere = {
  OR?: InputMaybe<Array<ElementTypeWhere>>;
  AND?: InputMaybe<Array<ElementTypeWhere>>;
  NOT?: InputMaybe<ElementTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  elementKind?: InputMaybe<ElementTypeKind>;
  elementKind_IN?: InputMaybe<Array<ElementTypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ElementUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  customCss?: InputMaybe<Scalars['String']['input']>;
  guiCss?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<ElementNextSiblingUpdateFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingUpdateFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildUpdateFieldInput>;
  parent?: InputMaybe<ElementParentUpdateFieldInput>;
  page?: InputMaybe<ElementPageUpdateFieldInput>;
  props?: InputMaybe<ElementPropsUpdateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentUpdateFieldInput>;
  preRenderAction?: InputMaybe<ElementPreRenderActionUpdateFieldInput>;
  postRenderAction?: InputMaybe<ElementPostRenderActionUpdateFieldInput>;
  renderComponentType?: InputMaybe<ElementRenderComponentTypeUpdateFieldInput>;
  renderAtomType?: InputMaybe<ElementRenderAtomTypeUpdateFieldInput>;
};

export type ElementWhere = {
  OR?: InputMaybe<Array<ElementWhere>>;
  AND?: InputMaybe<Array<ElementWhere>>;
  NOT?: InputMaybe<ElementWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  customCss?: InputMaybe<Scalars['String']['input']>;
  customCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  customCss_MATCHES?: InputMaybe<Scalars['String']['input']>;
  customCss_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  customCss_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  customCss_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  guiCss?: InputMaybe<Scalars['String']['input']>;
  guiCss_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  guiCss_MATCHES?: InputMaybe<Scalars['String']['input']>;
  guiCss_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  guiCss_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  guiCss_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  propTransformationJs_MATCHES?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  propTransformationJs_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  renderForEachPropKey_MATCHES?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  renderForEachPropKey_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  renderIfExpression_MATCHES?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  renderIfExpression_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<ElementWhere>;
  nextSibling_NOT?: InputMaybe<ElementWhere>;
  nextSiblingAggregate?: InputMaybe<ElementNextSiblingAggregateInput>;
  prevSibling?: InputMaybe<ElementWhere>;
  prevSibling_NOT?: InputMaybe<ElementWhere>;
  prevSiblingAggregate?: InputMaybe<ElementPrevSiblingAggregateInput>;
  firstChild?: InputMaybe<ElementWhere>;
  firstChild_NOT?: InputMaybe<ElementWhere>;
  firstChildAggregate?: InputMaybe<ElementFirstChildAggregateInput>;
  parent?: InputMaybe<ElementWhere>;
  parent_NOT?: InputMaybe<ElementWhere>;
  parentAggregate?: InputMaybe<ElementParentAggregateInput>;
  page?: InputMaybe<PageWhere>;
  page_NOT?: InputMaybe<PageWhere>;
  pageAggregate?: InputMaybe<ElementPageAggregateInput>;
  props?: InputMaybe<PropWhere>;
  props_NOT?: InputMaybe<PropWhere>;
  propsAggregate?: InputMaybe<ElementPropsAggregateInput>;
  parentComponent?: InputMaybe<ComponentWhere>;
  parentComponent_NOT?: InputMaybe<ComponentWhere>;
  parentComponentAggregate?: InputMaybe<ElementParentComponentAggregateInput>;
  renderComponentType?: InputMaybe<ComponentWhere>;
  renderComponentType_NOT?: InputMaybe<ComponentWhere>;
  renderComponentTypeAggregate?: InputMaybe<ElementRenderComponentTypeAggregateInput>;
  renderAtomType?: InputMaybe<AtomWhere>;
  renderAtomType_NOT?: InputMaybe<AtomWhere>;
  renderAtomTypeAggregate?: InputMaybe<ElementRenderAtomTypeAggregateInput>;
  nextSiblingConnection?: InputMaybe<ElementNextSiblingConnectionWhere>;
  nextSiblingConnection_NOT?: InputMaybe<ElementNextSiblingConnectionWhere>;
  prevSiblingConnection?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  prevSiblingConnection_NOT?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  firstChildConnection?: InputMaybe<ElementFirstChildConnectionWhere>;
  firstChildConnection_NOT?: InputMaybe<ElementFirstChildConnectionWhere>;
  parentConnection?: InputMaybe<ElementParentConnectionWhere>;
  parentConnection_NOT?: InputMaybe<ElementParentConnectionWhere>;
  pageConnection?: InputMaybe<ElementPageConnectionWhere>;
  pageConnection_NOT?: InputMaybe<ElementPageConnectionWhere>;
  propsConnection?: InputMaybe<ElementPropsConnectionWhere>;
  propsConnection_NOT?: InputMaybe<ElementPropsConnectionWhere>;
  parentComponentConnection?: InputMaybe<ElementParentComponentConnectionWhere>;
  parentComponentConnection_NOT?: InputMaybe<ElementParentComponentConnectionWhere>;
  preRenderActionConnection?: InputMaybe<ElementPreRenderActionConnectionWhere>;
  preRenderActionConnection_NOT?: InputMaybe<ElementPreRenderActionConnectionWhere>;
  postRenderActionConnection?: InputMaybe<ElementPostRenderActionConnectionWhere>;
  postRenderActionConnection_NOT?: InputMaybe<ElementPostRenderActionConnectionWhere>;
  renderComponentTypeConnection?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  renderComponentTypeConnection_NOT?: InputMaybe<ElementRenderComponentTypeConnectionWhere>;
  renderAtomTypeConnection?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
  renderAtomTypeConnection_NOT?: InputMaybe<ElementRenderAtomTypeConnectionWhere>;
};

export type EnumTypeAllowedValuesAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>;
  NOT?: InputMaybe<EnumTypeAllowedValuesAggregateInput>;
  node?: InputMaybe<EnumTypeAllowedValuesNodeAggregationWhereInput>;
};

export type EnumTypeAllowedValuesConnectFieldInput = {
  where?: InputMaybe<EnumTypeValueConnectWhere>;
  connect?: InputMaybe<Array<EnumTypeValueConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type EnumTypeAllowedValuesConnectionSort = {
  node?: InputMaybe<EnumTypeValueSort>;
};

export type EnumTypeAllowedValuesConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>;
  OR?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>;
  NOT?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  node?: InputMaybe<EnumTypeValueWhere>;
};

export type EnumTypeAllowedValuesCreateFieldInput = {
  node: EnumTypeValueCreateInput;
};

export type EnumTypeAllowedValuesDeleteFieldInput = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  delete?: InputMaybe<EnumTypeValueDeleteInput>;
};

export type EnumTypeAllowedValuesDisconnectFieldInput = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  disconnect?: InputMaybe<EnumTypeValueDisconnectInput>;
};

export type EnumTypeAllowedValuesFieldInput = {
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>;
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>;
};

export type EnumTypeAllowedValuesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EnumTypeAllowedValuesNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeAllowedValuesUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeValueUpdateInput>;
};

export type EnumTypeAllowedValuesUpdateFieldInput = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  update?: InputMaybe<EnumTypeAllowedValuesUpdateConnectionInput>;
  connect?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>;
  create?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>;
  delete?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>;
};

export type EnumTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  fieldRefs?: InputMaybe<Array<EnumTypeFieldRefsConnectFieldInput>>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>;
};

export type EnumTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere;
};

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere;
};

export type EnumTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
  fieldRefs?: InputMaybe<EnumTypeFieldRefsFieldInput>;
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>;
};

export type EnumTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  fieldRefs?: InputMaybe<Array<EnumTypeFieldRefsDeleteFieldInput>>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>;
};

export type EnumTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  fieldRefs?: InputMaybe<Array<EnumTypeFieldRefsDisconnectFieldInput>>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>;
};

export type EnumTypeFieldRefsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<EnumTypeFieldRefsAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeFieldRefsAggregateInput>>;
  NOT?: InputMaybe<EnumTypeFieldRefsAggregateInput>;
  node?: InputMaybe<EnumTypeFieldRefsNodeAggregationWhereInput>;
};

export type EnumTypeFieldRefsConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<Array<FieldConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type EnumTypeFieldRefsConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type EnumTypeFieldRefsConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeFieldRefsConnectionWhere>>;
  OR?: InputMaybe<Array<EnumTypeFieldRefsConnectionWhere>>;
  NOT?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type EnumTypeFieldRefsCreateFieldInput = {
  node: FieldCreateInput;
};

export type EnumTypeFieldRefsDeleteFieldInput = {
  where?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type EnumTypeFieldRefsDisconnectFieldInput = {
  where?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type EnumTypeFieldRefsFieldInput = {
  create?: InputMaybe<Array<EnumTypeFieldRefsCreateFieldInput>>;
  connect?: InputMaybe<Array<EnumTypeFieldRefsConnectFieldInput>>;
};

export type EnumTypeFieldRefsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeFieldRefsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<EnumTypeFieldRefsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EnumTypeFieldRefsNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeFieldRefsUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type EnumTypeFieldRefsUpdateFieldInput = {
  where?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  update?: InputMaybe<EnumTypeFieldRefsUpdateConnectionInput>;
  connect?: InputMaybe<Array<EnumTypeFieldRefsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<EnumTypeFieldRefsDisconnectFieldInput>>;
  create?: InputMaybe<Array<EnumTypeFieldRefsCreateFieldInput>>;
  delete?: InputMaybe<Array<EnumTypeFieldRefsDeleteFieldInput>>;
};

export type EnumTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type EnumTypeOptions = {
  /** Specify one or more EnumTypeSort objects to sort EnumTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<EnumTypeOwnerAggregateInput>;
  node?: InputMaybe<EnumTypeOwnerNodeAggregationWhereInput>;
};

export type EnumTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EnumTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  fieldRefs?: InputMaybe<Array<EnumTypeFieldRefsCreateFieldInput>>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>;
};

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type EnumTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type EnumTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
  fieldRefs?: InputMaybe<Array<EnumTypeFieldRefsUpdateFieldInput>>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesUpdateFieldInput>>;
};

export type EnumTypeValueConnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>;
};

export type EnumTypeValueConnectOrCreateInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>;
};

export type EnumTypeValueConnectWhere = {
  node: EnumTypeValueWhere;
};

export type EnumTypeValueCreateInput = {
  id: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
  enumType?: InputMaybe<EnumTypeValueEnumTypeFieldInput>;
};

export type EnumTypeValueDeleteInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>;
};

export type EnumTypeValueDisconnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>;
};

export type EnumTypeValueEnumTypeAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>;
  NOT?: InputMaybe<EnumTypeValueEnumTypeAggregateInput>;
  node?: InputMaybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>;
};

export type EnumTypeValueEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>;
  connect?: InputMaybe<EnumTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type EnumTypeValueEnumTypeConnectionSort = {
  node?: InputMaybe<EnumTypeSort>;
};

export type EnumTypeValueEnumTypeConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>;
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>;
  NOT?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  node?: InputMaybe<EnumTypeWhere>;
};

export type EnumTypeValueEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere;
  onCreate: EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate;
};

export type EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeOnCreateInput;
};

export type EnumTypeValueEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput;
};

export type EnumTypeValueEnumTypeDeleteFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  delete?: InputMaybe<EnumTypeDeleteInput>;
};

export type EnumTypeValueEnumTypeDisconnectFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  disconnect?: InputMaybe<EnumTypeDisconnectInput>;
};

export type EnumTypeValueEnumTypeFieldInput = {
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>;
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>;
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>;
};

export type EnumTypeValueEnumTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeValueEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>;
};

export type EnumTypeValueEnumTypeUpdateFieldInput = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  update?: InputMaybe<EnumTypeValueEnumTypeUpdateConnectionInput>;
  connect?: InputMaybe<EnumTypeValueEnumTypeConnectFieldInput>;
  disconnect?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>;
  create?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>;
  delete?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>;
  connectOrCreate?: InputMaybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>;
};

export type EnumTypeValueOptions = {
  /** Specify one or more EnumTypeValueSort objects to sort EnumTypeValues by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeValueSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type EnumTypeValueRelationInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>;
};

/** Fields to sort EnumTypeValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeValueSort object. */
export type EnumTypeValueSort = {
  id?: InputMaybe<SortDirection>;
  key?: InputMaybe<SortDirection>;
  value?: InputMaybe<SortDirection>;
};

export type EnumTypeValueUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  enumType?: InputMaybe<EnumTypeValueEnumTypeUpdateFieldInput>;
};

export type EnumTypeValueWhere = {
  OR?: InputMaybe<Array<EnumTypeValueWhere>>;
  AND?: InputMaybe<Array<EnumTypeValueWhere>>;
  NOT?: InputMaybe<EnumTypeValueWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  key_MATCHES?: InputMaybe<Scalars['String']['input']>;
  key_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  key_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  key_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  value_MATCHES?: InputMaybe<Scalars['String']['input']>;
  value_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  value_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  value_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  enumType?: InputMaybe<EnumTypeWhere>;
  enumType_NOT?: InputMaybe<EnumTypeWhere>;
  enumTypeAggregate?: InputMaybe<EnumTypeValueEnumTypeAggregateInput>;
  enumTypeConnection?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  enumTypeConnection_NOT?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
};

export type EnumTypeWhere = {
  OR?: InputMaybe<Array<EnumTypeWhere>>;
  AND?: InputMaybe<Array<EnumTypeWhere>>;
  NOT?: InputMaybe<EnumTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>;
  fieldRefsAggregate?: InputMaybe<EnumTypeFieldRefsAggregateInput>;
  /** Return EnumTypes where all of the related Fields match this filter */
  fieldRefs_ALL?: InputMaybe<FieldWhere>;
  /** Return EnumTypes where none of the related Fields match this filter */
  fieldRefs_NONE?: InputMaybe<FieldWhere>;
  /** Return EnumTypes where one of the related Fields match this filter */
  fieldRefs_SINGLE?: InputMaybe<FieldWhere>;
  /** Return EnumTypes where some of the related Fields match this filter */
  fieldRefs_SOME?: InputMaybe<FieldWhere>;
  allowedValuesAggregate?: InputMaybe<EnumTypeAllowedValuesAggregateInput>;
  /** Return EnumTypes where all of the related EnumTypeValues match this filter */
  allowedValues_ALL?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where none of the related EnumTypeValues match this filter */
  allowedValues_NONE?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where one of the related EnumTypeValues match this filter */
  allowedValues_SINGLE?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where some of the related EnumTypeValues match this filter */
  allowedValues_SOME?: InputMaybe<EnumTypeValueWhere>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  /** Return EnumTypes where all of the related EnumTypeFieldRefsConnections match this filter */
  fieldRefsConnection_ALL?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  /** Return EnumTypes where none of the related EnumTypeFieldRefsConnections match this filter */
  fieldRefsConnection_NONE?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  /** Return EnumTypes where one of the related EnumTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SINGLE?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  /** Return EnumTypes where some of the related EnumTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SOME?: InputMaybe<EnumTypeFieldRefsConnectionWhere>;
  /** Return EnumTypes where all of the related EnumTypeAllowedValuesConnections match this filter */
  allowedValuesConnection_ALL?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  /** Return EnumTypes where none of the related EnumTypeAllowedValuesConnections match this filter */
  allowedValuesConnection_NONE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  /** Return EnumTypes where one of the related EnumTypeAllowedValuesConnections match this filter */
  allowedValuesConnection_SINGLE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  /** Return EnumTypes where some of the related EnumTypeAllowedValuesConnections match this filter */
  allowedValuesConnection_SOME?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
};

export type FieldApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<FieldApiAggregateInput>>;
  OR?: InputMaybe<Array<FieldApiAggregateInput>>;
  NOT?: InputMaybe<FieldApiAggregateInput>;
  node?: InputMaybe<FieldApiNodeAggregationWhereInput>;
};

export type FieldApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type FieldApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type FieldApiConnectionWhere = {
  AND?: InputMaybe<Array<FieldApiConnectionWhere>>;
  OR?: InputMaybe<Array<FieldApiConnectionWhere>>;
  NOT?: InputMaybe<FieldApiConnectionWhere>;
  node?: InputMaybe<InterfaceTypeWhere>;
};

export type FieldApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: FieldApiConnectOrCreateFieldInputOnCreate;
};

export type FieldApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type FieldApiCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type FieldApiDeleteFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type FieldApiDisconnectFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type FieldApiFieldInput = {
  create?: InputMaybe<FieldApiCreateFieldInput>;
  connect?: InputMaybe<FieldApiConnectFieldInput>;
  connectOrCreate?: InputMaybe<FieldApiConnectOrCreateFieldInput>;
};

export type FieldApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FieldApiNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<FieldApiNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FieldApiNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type FieldApiUpdateFieldInput = {
  where?: InputMaybe<FieldApiConnectionWhere>;
  update?: InputMaybe<FieldApiUpdateConnectionInput>;
  connect?: InputMaybe<FieldApiConnectFieldInput>;
  disconnect?: InputMaybe<FieldApiDisconnectFieldInput>;
  create?: InputMaybe<FieldApiCreateFieldInput>;
  delete?: InputMaybe<FieldApiDeleteFieldInput>;
  connectOrCreate?: InputMaybe<FieldApiConnectOrCreateFieldInput>;
};

export type FieldConnectInput = {
  nextSibling?: InputMaybe<FieldNextSiblingConnectFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingConnectFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeConnectFieldInput>;
  api?: InputMaybe<FieldApiConnectFieldInput>;
};

export type FieldConnectOrCreateInput = {
  api?: InputMaybe<FieldApiConnectOrCreateFieldInput>;
};

export type FieldConnectWhere = {
  node: FieldWhere;
};

export type FieldCreateInput = {
  id: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  validationRules?: InputMaybe<Scalars['String']['input']>;
  defaultValues?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<FieldNextSiblingFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeFieldInput>;
  api?: InputMaybe<FieldApiFieldInput>;
};

export type FieldDeleteInput = {
  nextSibling?: InputMaybe<FieldNextSiblingDeleteFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingDeleteFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeDeleteFieldInput>;
  api?: InputMaybe<FieldApiDeleteFieldInput>;
};

export type FieldDisconnectInput = {
  nextSibling?: InputMaybe<FieldNextSiblingDisconnectFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingDisconnectFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeDisconnectFieldInput>;
  api?: InputMaybe<FieldApiDisconnectFieldInput>;
};

export type FieldFieldTypeConnectFieldInput = {
  connect?: InputMaybe<IBaseTypeConnectInput>;
  where?: InputMaybe<IBaseTypeConnectWhere>;
};

export type FieldFieldTypeConnectionSort = {
  node?: InputMaybe<IBaseTypeSort>;
};

export type FieldFieldTypeConnectionWhere = {
  AND?: InputMaybe<Array<FieldFieldTypeConnectionWhere>>;
  OR?: InputMaybe<Array<FieldFieldTypeConnectionWhere>>;
  NOT?: InputMaybe<FieldFieldTypeConnectionWhere>;
  node?: InputMaybe<IBaseTypeWhere>;
};

export type FieldFieldTypeCreateFieldInput = {
  node: IBaseTypeCreateInput;
};

export type FieldFieldTypeDeleteFieldInput = {
  delete?: InputMaybe<IBaseTypeDeleteInput>;
  where?: InputMaybe<FieldFieldTypeConnectionWhere>;
};

export type FieldFieldTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<IBaseTypeDisconnectInput>;
  where?: InputMaybe<FieldFieldTypeConnectionWhere>;
};

export type FieldFieldTypeFieldInput = {
  create?: InputMaybe<FieldFieldTypeCreateFieldInput>;
  connect?: InputMaybe<FieldFieldTypeConnectFieldInput>;
};

export type FieldFieldTypeUpdateConnectionInput = {
  node?: InputMaybe<IBaseTypeUpdateInput>;
};

export type FieldFieldTypeUpdateFieldInput = {
  connect?: InputMaybe<FieldFieldTypeConnectFieldInput>;
  create?: InputMaybe<FieldFieldTypeCreateFieldInput>;
  delete?: InputMaybe<FieldFieldTypeDeleteFieldInput>;
  disconnect?: InputMaybe<FieldFieldTypeDisconnectFieldInput>;
  update?: InputMaybe<FieldFieldTypeUpdateConnectionInput>;
  where?: InputMaybe<FieldFieldTypeConnectionWhere>;
};

export type FieldNextSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<FieldNextSiblingAggregateInput>>;
  OR?: InputMaybe<Array<FieldNextSiblingAggregateInput>>;
  NOT?: InputMaybe<FieldNextSiblingAggregateInput>;
  node?: InputMaybe<FieldNextSiblingNodeAggregationWhereInput>;
};

export type FieldNextSiblingConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<FieldConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type FieldNextSiblingConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type FieldNextSiblingConnectionWhere = {
  AND?: InputMaybe<Array<FieldNextSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<FieldNextSiblingConnectionWhere>>;
  NOT?: InputMaybe<FieldNextSiblingConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type FieldNextSiblingCreateFieldInput = {
  node: FieldCreateInput;
};

export type FieldNextSiblingDeleteFieldInput = {
  where?: InputMaybe<FieldNextSiblingConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type FieldNextSiblingDisconnectFieldInput = {
  where?: InputMaybe<FieldNextSiblingConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type FieldNextSiblingFieldInput = {
  create?: InputMaybe<FieldNextSiblingCreateFieldInput>;
  connect?: InputMaybe<FieldNextSiblingConnectFieldInput>;
};

export type FieldNextSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FieldNextSiblingNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<FieldNextSiblingNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FieldNextSiblingNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldNextSiblingUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type FieldNextSiblingUpdateFieldInput = {
  where?: InputMaybe<FieldNextSiblingConnectionWhere>;
  update?: InputMaybe<FieldNextSiblingUpdateConnectionInput>;
  connect?: InputMaybe<FieldNextSiblingConnectFieldInput>;
  disconnect?: InputMaybe<FieldNextSiblingDisconnectFieldInput>;
  create?: InputMaybe<FieldNextSiblingCreateFieldInput>;
  delete?: InputMaybe<FieldNextSiblingDeleteFieldInput>;
};

export type FieldOptions = {
  /** Specify one or more FieldSort objects to sort Fields by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<FieldSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldPrevSiblingAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<FieldPrevSiblingAggregateInput>>;
  OR?: InputMaybe<Array<FieldPrevSiblingAggregateInput>>;
  NOT?: InputMaybe<FieldPrevSiblingAggregateInput>;
  node?: InputMaybe<FieldPrevSiblingNodeAggregationWhereInput>;
};

export type FieldPrevSiblingConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<FieldConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type FieldPrevSiblingConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type FieldPrevSiblingConnectionWhere = {
  AND?: InputMaybe<Array<FieldPrevSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<FieldPrevSiblingConnectionWhere>>;
  NOT?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type FieldPrevSiblingCreateFieldInput = {
  node: FieldCreateInput;
};

export type FieldPrevSiblingDeleteFieldInput = {
  where?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type FieldPrevSiblingDisconnectFieldInput = {
  where?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type FieldPrevSiblingFieldInput = {
  create?: InputMaybe<FieldPrevSiblingCreateFieldInput>;
  connect?: InputMaybe<FieldPrevSiblingConnectFieldInput>;
};

export type FieldPrevSiblingNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FieldPrevSiblingNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<FieldPrevSiblingNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FieldPrevSiblingNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldPrevSiblingUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type FieldPrevSiblingUpdateFieldInput = {
  where?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  update?: InputMaybe<FieldPrevSiblingUpdateConnectionInput>;
  connect?: InputMaybe<FieldPrevSiblingConnectFieldInput>;
  disconnect?: InputMaybe<FieldPrevSiblingDisconnectFieldInput>;
  create?: InputMaybe<FieldPrevSiblingCreateFieldInput>;
  delete?: InputMaybe<FieldPrevSiblingDeleteFieldInput>;
};

export type FieldRelationInput = {
  nextSibling?: InputMaybe<FieldNextSiblingCreateFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingCreateFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeCreateFieldInput>;
  api?: InputMaybe<FieldApiCreateFieldInput>;
};

/** Fields to sort Fields by. The order in which sorts are applied is not guaranteed when specifying many fields in one FieldSort object. */
export type FieldSort = {
  id?: InputMaybe<SortDirection>;
  key?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  validationRules?: InputMaybe<SortDirection>;
  defaultValues?: InputMaybe<SortDirection>;
};

export type FieldUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  validationRules?: InputMaybe<Scalars['String']['input']>;
  defaultValues?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<FieldNextSiblingUpdateFieldInput>;
  prevSibling?: InputMaybe<FieldPrevSiblingUpdateFieldInput>;
  fieldType?: InputMaybe<FieldFieldTypeUpdateFieldInput>;
  api?: InputMaybe<FieldApiUpdateFieldInput>;
};

export type FieldWhere = {
  OR?: InputMaybe<Array<FieldWhere>>;
  AND?: InputMaybe<Array<FieldWhere>>;
  NOT?: InputMaybe<FieldWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  key_MATCHES?: InputMaybe<Scalars['String']['input']>;
  key_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  key_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  key_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_MATCHES?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  validationRules?: InputMaybe<Scalars['String']['input']>;
  validationRules_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  validationRules_MATCHES?: InputMaybe<Scalars['String']['input']>;
  validationRules_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  validationRules_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  validationRules_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  defaultValues?: InputMaybe<Scalars['String']['input']>;
  defaultValues_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  defaultValues_MATCHES?: InputMaybe<Scalars['String']['input']>;
  defaultValues_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  defaultValues_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  defaultValues_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  nextSibling?: InputMaybe<FieldWhere>;
  nextSibling_NOT?: InputMaybe<FieldWhere>;
  nextSiblingAggregate?: InputMaybe<FieldNextSiblingAggregateInput>;
  prevSibling?: InputMaybe<FieldWhere>;
  prevSibling_NOT?: InputMaybe<FieldWhere>;
  prevSiblingAggregate?: InputMaybe<FieldPrevSiblingAggregateInput>;
  api?: InputMaybe<InterfaceTypeWhere>;
  api_NOT?: InputMaybe<InterfaceTypeWhere>;
  apiAggregate?: InputMaybe<FieldApiAggregateInput>;
  nextSiblingConnection?: InputMaybe<FieldNextSiblingConnectionWhere>;
  nextSiblingConnection_NOT?: InputMaybe<FieldNextSiblingConnectionWhere>;
  prevSiblingConnection?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  prevSiblingConnection_NOT?: InputMaybe<FieldPrevSiblingConnectionWhere>;
  fieldTypeConnection?: InputMaybe<FieldFieldTypeConnectionWhere>;
  fieldTypeConnection_NOT?: InputMaybe<FieldFieldTypeConnectionWhere>;
  apiConnection?: InputMaybe<FieldApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<FieldApiConnectionWhere>;
};

export type GetBaseTypesOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BaseTypesWhere>;
};

export type GetBaseTypesReturnCreateInput = {
  totalCount: Scalars['Int']['input'];
};

export type GetBaseTypesReturnOptions = {
  /** Specify one or more GetBaseTypesReturnSort objects to sort GetBaseTypesReturns by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GetBaseTypesReturnSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Fields to sort GetBaseTypesReturns by. The order in which sorts are applied is not guaranteed when specifying many fields in one GetBaseTypesReturnSort object. */
export type GetBaseTypesReturnSort = {
  totalCount?: InputMaybe<SortDirection>;
};

export type GetBaseTypesReturnUpdateInput = {
  totalCount?: InputMaybe<Scalars['Int']['input']>;
  totalCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  totalCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
};

export type GetBaseTypesReturnWhere = {
  OR?: InputMaybe<Array<GetBaseTypesReturnWhere>>;
  AND?: InputMaybe<Array<GetBaseTypesReturnWhere>>;
  NOT?: InputMaybe<GetBaseTypesReturnWhere>;
  totalCount?: InputMaybe<Scalars['Int']['input']>;
  totalCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalCount_LT?: InputMaybe<Scalars['Int']['input']>;
  totalCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  totalCount_GT?: InputMaybe<Scalars['Int']['input']>;
  totalCount_GTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HookConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<HookConfigAggregateInput>>;
  OR?: InputMaybe<Array<HookConfigAggregateInput>>;
  NOT?: InputMaybe<HookConfigAggregateInput>;
  node?: InputMaybe<HookConfigNodeAggregationWhereInput>;
};

export type HookConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type HookConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type HookConfigConnectionWhere = {
  AND?: InputMaybe<Array<HookConfigConnectionWhere>>;
  OR?: InputMaybe<Array<HookConfigConnectionWhere>>;
  NOT?: InputMaybe<HookConfigConnectionWhere>;
  node?: InputMaybe<PropWhere>;
};

export type HookConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: HookConfigConnectOrCreateFieldInputOnCreate;
};

export type HookConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type HookConfigCreateFieldInput = {
  node: PropCreateInput;
};

export type HookConfigDeleteFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>;
};

export type HookConfigDisconnectFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>;
};

export type HookConfigFieldInput = {
  create?: InputMaybe<HookConfigCreateFieldInput>;
  connect?: InputMaybe<HookConfigConnectFieldInput>;
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>;
};

export type HookConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<HookConfigNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HookConfigNodeAggregationWhereInput>;
  data_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HookConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type HookConfigUpdateFieldInput = {
  where?: InputMaybe<HookConfigConnectionWhere>;
  update?: InputMaybe<HookConfigUpdateConnectionInput>;
  connect?: InputMaybe<HookConfigConnectFieldInput>;
  disconnect?: InputMaybe<HookConfigDisconnectFieldInput>;
  create?: InputMaybe<HookConfigCreateFieldInput>;
  delete?: InputMaybe<HookConfigDeleteFieldInput>;
  connectOrCreate?: InputMaybe<HookConfigConnectOrCreateFieldInput>;
};

export type HookConnectInput = {
  config?: InputMaybe<HookConfigConnectFieldInput>;
  element?: InputMaybe<HookElementConnectFieldInput>;
};

export type HookConnectOrCreateInput = {
  config?: InputMaybe<HookConfigConnectOrCreateFieldInput>;
  element?: InputMaybe<HookElementConnectOrCreateFieldInput>;
};

export type HookCreateInput = {
  type: AtomType;
  config?: InputMaybe<HookConfigFieldInput>;
  element?: InputMaybe<HookElementFieldInput>;
};

export type HookDeleteInput = {
  config?: InputMaybe<HookConfigDeleteFieldInput>;
  element?: InputMaybe<HookElementDeleteFieldInput>;
};

export type HookDisconnectInput = {
  config?: InputMaybe<HookConfigDisconnectFieldInput>;
  element?: InputMaybe<HookElementDisconnectFieldInput>;
};

export type HookElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<HookElementAggregateInput>>;
  OR?: InputMaybe<Array<HookElementAggregateInput>>;
  NOT?: InputMaybe<HookElementAggregateInput>;
  node?: InputMaybe<HookElementNodeAggregationWhereInput>;
};

export type HookElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type HookElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type HookElementConnectionWhere = {
  AND?: InputMaybe<Array<HookElementConnectionWhere>>;
  OR?: InputMaybe<Array<HookElementConnectionWhere>>;
  NOT?: InputMaybe<HookElementConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type HookElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: HookElementConnectOrCreateFieldInputOnCreate;
};

export type HookElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type HookElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type HookElementDeleteFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type HookElementDisconnectFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type HookElementFieldInput = {
  create?: InputMaybe<HookElementCreateFieldInput>;
  connect?: InputMaybe<HookElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>;
};

export type HookElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<HookElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HookElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HookElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type HookElementUpdateFieldInput = {
  where?: InputMaybe<HookElementConnectionWhere>;
  update?: InputMaybe<HookElementUpdateConnectionInput>;
  connect?: InputMaybe<HookElementConnectFieldInput>;
  disconnect?: InputMaybe<HookElementDisconnectFieldInput>;
  create?: InputMaybe<HookElementCreateFieldInput>;
  delete?: InputMaybe<HookElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<HookElementConnectOrCreateFieldInput>;
};

export type HookOptions = {
  /** Specify one or more HookSort objects to sort Hooks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HookSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type HookRelationInput = {
  config?: InputMaybe<HookConfigCreateFieldInput>;
  element?: InputMaybe<HookElementCreateFieldInput>;
};

/** Fields to sort Hooks by. The order in which sorts are applied is not guaranteed when specifying many fields in one HookSort object. */
export type HookSort = {
  id?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type HookUpdateInput = {
  type?: InputMaybe<AtomType>;
  config?: InputMaybe<HookConfigUpdateFieldInput>;
  element?: InputMaybe<HookElementUpdateFieldInput>;
};

export type HookWhere = {
  OR?: InputMaybe<Array<HookWhere>>;
  AND?: InputMaybe<Array<HookWhere>>;
  NOT?: InputMaybe<HookWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<AtomType>;
  type_IN?: InputMaybe<Array<AtomType>>;
  config?: InputMaybe<PropWhere>;
  config_NOT?: InputMaybe<PropWhere>;
  configAggregate?: InputMaybe<HookConfigAggregateInput>;
  element?: InputMaybe<ElementWhere>;
  element_NOT?: InputMaybe<ElementWhere>;
  elementAggregate?: InputMaybe<HookElementAggregateInput>;
  configConnection?: InputMaybe<HookConfigConnectionWhere>;
  configConnection_NOT?: InputMaybe<HookConfigConnectionWhere>;
  elementConnection?: InputMaybe<HookElementConnectionWhere>;
  elementConnection_NOT?: InputMaybe<HookElementConnectionWhere>;
};

export type IBaseTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  _on?: InputMaybe<IBaseTypeImplementationsConnectInput>;
};

export type IBaseTypeConnectWhere = {
  node: IBaseTypeWhere;
};

export type IBaseTypeCreateInput = {
  BaseType?: InputMaybe<BaseTypeCreateInput>;
  PrimitiveType?: InputMaybe<PrimitiveTypeCreateInput>;
  ArrayType?: InputMaybe<ArrayTypeCreateInput>;
  UnionType?: InputMaybe<UnionTypeCreateInput>;
  InterfaceType?: InputMaybe<InterfaceTypeCreateInput>;
  ElementType?: InputMaybe<ElementTypeCreateInput>;
  RenderPropType?: InputMaybe<RenderPropTypeCreateInput>;
  ReactNodeType?: InputMaybe<ReactNodeTypeCreateInput>;
  EnumType?: InputMaybe<EnumTypeCreateInput>;
  LambdaType?: InputMaybe<LambdaTypeCreateInput>;
  PageType?: InputMaybe<PageTypeCreateInput>;
  AppType?: InputMaybe<AppTypeCreateInput>;
  ActionType?: InputMaybe<ActionTypeCreateInput>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeCreateInput>;
};

export type IBaseTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  _on?: InputMaybe<IBaseTypeImplementationsDeleteInput>;
};

export type IBaseTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  _on?: InputMaybe<IBaseTypeImplementationsDisconnectInput>;
};

export type IBaseTypeImplementationsConnectInput = {
  BaseType?: InputMaybe<Array<BaseTypeConnectInput>>;
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeConnectInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeConnectInput>>;
  UnionType?: InputMaybe<Array<UnionTypeConnectInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeConnectInput>>;
  ElementType?: InputMaybe<Array<ElementTypeConnectInput>>;
  RenderPropType?: InputMaybe<Array<RenderPropTypeConnectInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeConnectInput>>;
  EnumType?: InputMaybe<Array<EnumTypeConnectInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeConnectInput>>;
  PageType?: InputMaybe<Array<PageTypeConnectInput>>;
  AppType?: InputMaybe<Array<AppTypeConnectInput>>;
  ActionType?: InputMaybe<Array<ActionTypeConnectInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeConnectInput>>;
};

export type IBaseTypeImplementationsDeleteInput = {
  BaseType?: InputMaybe<Array<BaseTypeDeleteInput>>;
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDeleteInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeDeleteInput>>;
  UnionType?: InputMaybe<Array<UnionTypeDeleteInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeDeleteInput>>;
  ElementType?: InputMaybe<Array<ElementTypeDeleteInput>>;
  RenderPropType?: InputMaybe<Array<RenderPropTypeDeleteInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDeleteInput>>;
  EnumType?: InputMaybe<Array<EnumTypeDeleteInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeDeleteInput>>;
  PageType?: InputMaybe<Array<PageTypeDeleteInput>>;
  AppType?: InputMaybe<Array<AppTypeDeleteInput>>;
  ActionType?: InputMaybe<Array<ActionTypeDeleteInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDeleteInput>>;
};

export type IBaseTypeImplementationsDisconnectInput = {
  BaseType?: InputMaybe<Array<BaseTypeDisconnectInput>>;
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDisconnectInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeDisconnectInput>>;
  UnionType?: InputMaybe<Array<UnionTypeDisconnectInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeDisconnectInput>>;
  ElementType?: InputMaybe<Array<ElementTypeDisconnectInput>>;
  RenderPropType?: InputMaybe<Array<RenderPropTypeDisconnectInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDisconnectInput>>;
  EnumType?: InputMaybe<Array<EnumTypeDisconnectInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeDisconnectInput>>;
  PageType?: InputMaybe<Array<PageTypeDisconnectInput>>;
  AppType?: InputMaybe<Array<AppTypeDisconnectInput>>;
  ActionType?: InputMaybe<Array<ActionTypeDisconnectInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDisconnectInput>>;
};

export type IBaseTypeImplementationsUpdateInput = {
  BaseType?: InputMaybe<BaseTypeUpdateInput>;
  PrimitiveType?: InputMaybe<PrimitiveTypeUpdateInput>;
  ArrayType?: InputMaybe<ArrayTypeUpdateInput>;
  UnionType?: InputMaybe<UnionTypeUpdateInput>;
  InterfaceType?: InputMaybe<InterfaceTypeUpdateInput>;
  ElementType?: InputMaybe<ElementTypeUpdateInput>;
  RenderPropType?: InputMaybe<RenderPropTypeUpdateInput>;
  ReactNodeType?: InputMaybe<ReactNodeTypeUpdateInput>;
  EnumType?: InputMaybe<EnumTypeUpdateInput>;
  LambdaType?: InputMaybe<LambdaTypeUpdateInput>;
  PageType?: InputMaybe<PageTypeUpdateInput>;
  AppType?: InputMaybe<AppTypeUpdateInput>;
  ActionType?: InputMaybe<ActionTypeUpdateInput>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeUpdateInput>;
};

export type IBaseTypeImplementationsWhere = {
  BaseType?: InputMaybe<BaseTypeWhere>;
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>;
  ArrayType?: InputMaybe<ArrayTypeWhere>;
  UnionType?: InputMaybe<UnionTypeWhere>;
  InterfaceType?: InputMaybe<InterfaceTypeWhere>;
  ElementType?: InputMaybe<ElementTypeWhere>;
  RenderPropType?: InputMaybe<RenderPropTypeWhere>;
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>;
  EnumType?: InputMaybe<EnumTypeWhere>;
  LambdaType?: InputMaybe<LambdaTypeWhere>;
  PageType?: InputMaybe<PageTypeWhere>;
  AppType?: InputMaybe<AppTypeWhere>;
  ActionType?: InputMaybe<ActionTypeWhere>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>;
};

export type IBaseTypeOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more IBaseTypeSort objects to sort IBaseTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<IBaseTypeSort>>>;
};

export type IBaseTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<IBaseTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<IBaseTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<IBaseTypeOwnerAggregateInput>;
  node?: InputMaybe<IBaseTypeOwnerNodeAggregationWhereInput>;
};

export type IBaseTypeOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type IBaseTypeOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type IBaseTypeOwnerConnectionWhere = {
  AND?: InputMaybe<Array<IBaseTypeOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<IBaseTypeOwnerConnectionWhere>>;
  NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  node?: InputMaybe<UserWhere>;
};

export type IBaseTypeOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere;
  onCreate: IBaseTypeOwnerConnectOrCreateFieldInputOnCreate;
};

export type IBaseTypeOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput;
};

export type IBaseTypeOwnerCreateFieldInput = {
  node: UserCreateInput;
};

export type IBaseTypeOwnerDeleteFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};

export type IBaseTypeOwnerDisconnectFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  disconnect?: InputMaybe<UserDisconnectInput>;
};

export type IBaseTypeOwnerFieldInput = {
  create?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  connect?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  connectOrCreate?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type IBaseTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<IBaseTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<IBaseTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<IBaseTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type IBaseTypeOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type IBaseTypeOwnerUpdateFieldInput = {
  where?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  update?: InputMaybe<IBaseTypeOwnerUpdateConnectionInput>;
  connect?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  disconnect?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  create?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  delete?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  connectOrCreate?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

/** Fields to sort IBaseTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one IBaseTypeSort object. */
export type IBaseTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type IBaseTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  _on?: InputMaybe<IBaseTypeImplementationsUpdateInput>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type IBaseTypeWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  _on?: InputMaybe<IBaseTypeImplementationsWhere>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<IBaseTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type InterfaceTypeApiOfAtomsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>;
  NOT?: InputMaybe<InterfaceTypeApiOfAtomsAggregateInput>;
  node?: InputMaybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>;
};

export type InterfaceTypeApiOfAtomsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type InterfaceTypeApiOfAtomsConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type InterfaceTypeApiOfAtomsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>;
  NOT?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate;
};

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type InterfaceTypeApiOfAtomsCreateFieldInput = {
  node: AtomCreateInput;
};

export type InterfaceTypeApiOfAtomsDeleteFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type InterfaceTypeApiOfAtomsDisconnectFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type InterfaceTypeApiOfAtomsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>;
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>>;
};

export type InterfaceTypeApiOfAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type InterfaceTypeApiOfAtomsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type InterfaceTypeApiOfAtomsUpdateFieldInput = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  update?: InputMaybe<InterfaceTypeApiOfAtomsUpdateConnectionInput>;
  connect?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>;
  create?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>;
  delete?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>>;
};

export type InterfaceTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  fieldRefs?: InputMaybe<Array<InterfaceTypeFieldRefsConnectFieldInput>>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
};

export type InterfaceTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>>;
};

export type InterfaceTypeConnectOrCreateWhere = {
  node: InterfaceTypeUniqueWhere;
};

export type InterfaceTypeConnectWhere = {
  node: InterfaceTypeWhere;
};

export type InterfaceTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
  fieldRefs?: InputMaybe<InterfaceTypeFieldRefsFieldInput>;
  apiOfAtoms?: InputMaybe<InterfaceTypeApiOfAtomsFieldInput>;
  fields?: InputMaybe<InterfaceTypeFieldsFieldInput>;
};

export type InterfaceTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  fieldRefs?: InputMaybe<Array<InterfaceTypeFieldRefsDeleteFieldInput>>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>;
};

export type InterfaceTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  fieldRefs?: InputMaybe<Array<InterfaceTypeFieldRefsDisconnectFieldInput>>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>;
};

export type InterfaceTypeFieldRefsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<InterfaceTypeFieldRefsAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldRefsAggregateInput>>;
  NOT?: InputMaybe<InterfaceTypeFieldRefsAggregateInput>;
  node?: InputMaybe<InterfaceTypeFieldRefsNodeAggregationWhereInput>;
};

export type InterfaceTypeFieldRefsConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<Array<FieldConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type InterfaceTypeFieldRefsConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type InterfaceTypeFieldRefsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeFieldRefsConnectionWhere>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldRefsConnectionWhere>>;
  NOT?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type InterfaceTypeFieldRefsCreateFieldInput = {
  node: FieldCreateInput;
};

export type InterfaceTypeFieldRefsDeleteFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type InterfaceTypeFieldRefsDisconnectFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type InterfaceTypeFieldRefsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeFieldRefsCreateFieldInput>>;
  connect?: InputMaybe<Array<InterfaceTypeFieldRefsConnectFieldInput>>;
};

export type InterfaceTypeFieldRefsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeFieldRefsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldRefsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<InterfaceTypeFieldRefsNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type InterfaceTypeFieldRefsUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type InterfaceTypeFieldRefsUpdateFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  update?: InputMaybe<InterfaceTypeFieldRefsUpdateConnectionInput>;
  connect?: InputMaybe<Array<InterfaceTypeFieldRefsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<InterfaceTypeFieldRefsDisconnectFieldInput>>;
  create?: InputMaybe<Array<InterfaceTypeFieldRefsCreateFieldInput>>;
  delete?: InputMaybe<Array<InterfaceTypeFieldRefsDeleteFieldInput>>;
};

export type InterfaceTypeFieldsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<InterfaceTypeFieldsAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldsAggregateInput>>;
  NOT?: InputMaybe<InterfaceTypeFieldsAggregateInput>;
  node?: InputMaybe<InterfaceTypeFieldsNodeAggregationWhereInput>;
};

export type InterfaceTypeFieldsConnectFieldInput = {
  where?: InputMaybe<FieldConnectWhere>;
  connect?: InputMaybe<Array<FieldConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type InterfaceTypeFieldsConnectionSort = {
  node?: InputMaybe<FieldSort>;
};

export type InterfaceTypeFieldsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>;
  NOT?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  node?: InputMaybe<FieldWhere>;
};

export type InterfaceTypeFieldsCreateFieldInput = {
  node: FieldCreateInput;
};

export type InterfaceTypeFieldsDeleteFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  delete?: InputMaybe<FieldDeleteInput>;
};

export type InterfaceTypeFieldsDisconnectFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  disconnect?: InputMaybe<FieldDisconnectInput>;
};

export type InterfaceTypeFieldsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>;
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
};

export type InterfaceTypeFieldsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<InterfaceTypeFieldsNodeAggregationWhereInput>;
  key_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  key_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  key_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  key_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  validationRules_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  validationRules_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  validationRules_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type InterfaceTypeFieldsUpdateConnectionInput = {
  node?: InputMaybe<FieldUpdateInput>;
};

export type InterfaceTypeFieldsUpdateFieldInput = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  update?: InputMaybe<InterfaceTypeFieldsUpdateConnectionInput>;
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>;
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>;
  delete?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>;
};

export type InterfaceTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type InterfaceTypeOptions = {
  /** Specify one or more InterfaceTypeSort objects to sort InterfaceTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InterfaceTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type InterfaceTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<InterfaceTypeOwnerAggregateInput>;
  node?: InputMaybe<InterfaceTypeOwnerNodeAggregationWhereInput>;
};

export type InterfaceTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<InterfaceTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type InterfaceTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  fieldRefs?: InputMaybe<Array<InterfaceTypeFieldRefsCreateFieldInput>>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>;
};

/** Fields to sort InterfaceTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeSort object. */
export type InterfaceTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type InterfaceTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type InterfaceTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
  fieldRefs?: InputMaybe<Array<InterfaceTypeFieldRefsUpdateFieldInput>>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsUpdateFieldInput>>;
};

export type InterfaceTypeWhere = {
  OR?: InputMaybe<Array<InterfaceTypeWhere>>;
  AND?: InputMaybe<Array<InterfaceTypeWhere>>;
  NOT?: InputMaybe<InterfaceTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>;
  fieldRefsAggregate?: InputMaybe<InterfaceTypeFieldRefsAggregateInput>;
  /** Return InterfaceTypes where all of the related Fields match this filter */
  fieldRefs_ALL?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where none of the related Fields match this filter */
  fieldRefs_NONE?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where one of the related Fields match this filter */
  fieldRefs_SINGLE?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where some of the related Fields match this filter */
  fieldRefs_SOME?: InputMaybe<FieldWhere>;
  apiOfAtomsAggregate?: InputMaybe<InterfaceTypeApiOfAtomsAggregateInput>;
  /** Return InterfaceTypes where all of the related Atoms match this filter */
  apiOfAtoms_ALL?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where none of the related Atoms match this filter */
  apiOfAtoms_NONE?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where one of the related Atoms match this filter */
  apiOfAtoms_SINGLE?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where some of the related Atoms match this filter */
  apiOfAtoms_SOME?: InputMaybe<AtomWhere>;
  fieldsAggregate?: InputMaybe<InterfaceTypeFieldsAggregateInput>;
  /** Return InterfaceTypes where all of the related Fields match this filter */
  fields_ALL?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where none of the related Fields match this filter */
  fields_NONE?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where one of the related Fields match this filter */
  fields_SINGLE?: InputMaybe<FieldWhere>;
  /** Return InterfaceTypes where some of the related Fields match this filter */
  fields_SOME?: InputMaybe<FieldWhere>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  /** Return InterfaceTypes where all of the related InterfaceTypeFieldRefsConnections match this filter */
  fieldRefsConnection_ALL?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  /** Return InterfaceTypes where none of the related InterfaceTypeFieldRefsConnections match this filter */
  fieldRefsConnection_NONE?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  /** Return InterfaceTypes where one of the related InterfaceTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  /** Return InterfaceTypes where some of the related InterfaceTypeFieldRefsConnections match this filter */
  fieldRefsConnection_SOME?: InputMaybe<InterfaceTypeFieldRefsConnectionWhere>;
  /** Return InterfaceTypes where all of the related InterfaceTypeApiOfAtomsConnections match this filter */
  apiOfAtomsConnection_ALL?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** Return InterfaceTypes where none of the related InterfaceTypeApiOfAtomsConnections match this filter */
  apiOfAtomsConnection_NONE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** Return InterfaceTypes where one of the related InterfaceTypeApiOfAtomsConnections match this filter */
  apiOfAtomsConnection_SINGLE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** Return InterfaceTypes where some of the related InterfaceTypeApiOfAtomsConnections match this filter */
  apiOfAtomsConnection_SOME?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** Return InterfaceTypes where all of the related InterfaceTypeFieldsConnections match this filter */
  fieldsConnection_ALL?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  /** Return InterfaceTypes where none of the related InterfaceTypeFieldsConnections match this filter */
  fieldsConnection_NONE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  /** Return InterfaceTypes where one of the related InterfaceTypeFieldsConnections match this filter */
  fieldsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  /** Return InterfaceTypes where some of the related InterfaceTypeFieldsConnections match this filter */
  fieldsConnection_SOME?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
};

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type LambdaTypeConnectOrCreateWhere = {
  node: LambdaTypeUniqueWhere;
};

export type LambdaTypeConnectWhere = {
  node: LambdaTypeWhere;
};

export type LambdaTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type LambdaTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type LambdaTypeOptions = {
  /** Specify one or more LambdaTypeSort objects to sort LambdaTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LambdaTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type LambdaTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<LambdaTypeOwnerAggregateInput>;
  node?: InputMaybe<LambdaTypeOwnerNodeAggregationWhereInput>;
};

export type LambdaTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LambdaTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type LambdaTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LambdaTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type LambdaTypeWhere = {
  OR?: InputMaybe<Array<LambdaTypeWhere>>;
  AND?: InputMaybe<Array<LambdaTypeWhere>>;
  NOT?: InputMaybe<LambdaTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type PageAppAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PageAppAggregateInput>>;
  OR?: InputMaybe<Array<PageAppAggregateInput>>;
  NOT?: InputMaybe<PageAppAggregateInput>;
  node?: InputMaybe<PageAppNodeAggregationWhereInput>;
};

export type PageAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<AppConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type PageAppConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type PageAppConnectionWhere = {
  AND?: InputMaybe<Array<PageAppConnectionWhere>>;
  OR?: InputMaybe<Array<PageAppConnectionWhere>>;
  NOT?: InputMaybe<PageAppConnectionWhere>;
  node?: InputMaybe<AppWhere>;
};

export type PageAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere;
  onCreate: PageAppConnectOrCreateFieldInputOnCreate;
};

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput;
};

export type PageAppCreateFieldInput = {
  node: AppCreateInput;
};

export type PageAppDeleteFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>;
  delete?: InputMaybe<AppDeleteInput>;
};

export type PageAppDisconnectFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>;
  disconnect?: InputMaybe<AppDisconnectInput>;
};

export type PageAppFieldInput = {
  create?: InputMaybe<PageAppCreateFieldInput>;
  connect?: InputMaybe<PageAppConnectFieldInput>;
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>;
};

export type PageAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PageAppNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PageAppNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PageAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>;
};

export type PageAppUpdateFieldInput = {
  where?: InputMaybe<PageAppConnectionWhere>;
  update?: InputMaybe<PageAppUpdateConnectionInput>;
  connect?: InputMaybe<PageAppConnectFieldInput>;
  disconnect?: InputMaybe<PageAppDisconnectFieldInput>;
  create?: InputMaybe<PageAppCreateFieldInput>;
  delete?: InputMaybe<PageAppDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PageAppConnectOrCreateFieldInput>;
};

export type PageConnectInput = {
  rootElement?: InputMaybe<PageRootElementConnectFieldInput>;
  app?: InputMaybe<PageAppConnectFieldInput>;
  store?: InputMaybe<PageStoreConnectFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerConnectFieldInput>;
};

export type PageConnectOrCreateInput = {
  rootElement?: InputMaybe<PageRootElementConnectOrCreateFieldInput>;
  app?: InputMaybe<PageAppConnectOrCreateFieldInput>;
  store?: InputMaybe<PageStoreConnectOrCreateFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerConnectOrCreateFieldInput>;
};

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere;
};

export type PageConnectWhere = {
  node: PageWhere;
};

export type PageCreateInput = {
  id: Scalars['ID']['input'];
  _compoundName: Scalars['String']['input'];
  url: Scalars['String']['input'];
  kind: PageKind;
  rootElement?: InputMaybe<PageRootElementFieldInput>;
  app?: InputMaybe<PageAppFieldInput>;
  store?: InputMaybe<PageStoreFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerFieldInput>;
};

export type PageDeleteInput = {
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>;
  app?: InputMaybe<PageAppDeleteFieldInput>;
  store?: InputMaybe<PageStoreDeleteFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerDeleteFieldInput>;
};

export type PageDisconnectInput = {
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>;
  app?: InputMaybe<PageAppDisconnectFieldInput>;
  store?: InputMaybe<PageStoreDisconnectFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerDisconnectFieldInput>;
};

export type PageOnCreateInput = {
  id: Scalars['ID']['input'];
  _compoundName: Scalars['String']['input'];
  url: Scalars['String']['input'];
  kind: PageKind;
};

export type PageOptions = {
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PagePageContentContainerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PagePageContentContainerAggregateInput>>;
  OR?: InputMaybe<Array<PagePageContentContainerAggregateInput>>;
  NOT?: InputMaybe<PagePageContentContainerAggregateInput>;
  node?: InputMaybe<PagePageContentContainerNodeAggregationWhereInput>;
};

export type PagePageContentContainerConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type PagePageContentContainerConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type PagePageContentContainerConnectionWhere = {
  AND?: InputMaybe<Array<PagePageContentContainerConnectionWhere>>;
  OR?: InputMaybe<Array<PagePageContentContainerConnectionWhere>>;
  NOT?: InputMaybe<PagePageContentContainerConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type PagePageContentContainerConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: PagePageContentContainerConnectOrCreateFieldInputOnCreate;
};

export type PagePageContentContainerConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type PagePageContentContainerCreateFieldInput = {
  node: ElementCreateInput;
};

export type PagePageContentContainerDeleteFieldInput = {
  where?: InputMaybe<PagePageContentContainerConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type PagePageContentContainerDisconnectFieldInput = {
  where?: InputMaybe<PagePageContentContainerConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type PagePageContentContainerFieldInput = {
  create?: InputMaybe<PagePageContentContainerCreateFieldInput>;
  connect?: InputMaybe<PagePageContentContainerConnectFieldInput>;
  connectOrCreate?: InputMaybe<PagePageContentContainerConnectOrCreateFieldInput>;
};

export type PagePageContentContainerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PagePageContentContainerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PagePageContentContainerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PagePageContentContainerNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PagePageContentContainerUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type PagePageContentContainerUpdateFieldInput = {
  where?: InputMaybe<PagePageContentContainerConnectionWhere>;
  update?: InputMaybe<PagePageContentContainerUpdateConnectionInput>;
  connect?: InputMaybe<PagePageContentContainerConnectFieldInput>;
  disconnect?: InputMaybe<PagePageContentContainerDisconnectFieldInput>;
  create?: InputMaybe<PagePageContentContainerCreateFieldInput>;
  delete?: InputMaybe<PagePageContentContainerDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PagePageContentContainerConnectOrCreateFieldInput>;
};

export type PageRelationInput = {
  rootElement?: InputMaybe<PageRootElementCreateFieldInput>;
  app?: InputMaybe<PageAppCreateFieldInput>;
  store?: InputMaybe<PageStoreCreateFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerCreateFieldInput>;
};

export type PageRootElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PageRootElementAggregateInput>>;
  OR?: InputMaybe<Array<PageRootElementAggregateInput>>;
  NOT?: InputMaybe<PageRootElementAggregateInput>;
  node?: InputMaybe<PageRootElementNodeAggregationWhereInput>;
};

export type PageRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type PageRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type PageRootElementConnectionWhere = {
  AND?: InputMaybe<Array<PageRootElementConnectionWhere>>;
  OR?: InputMaybe<Array<PageRootElementConnectionWhere>>;
  NOT?: InputMaybe<PageRootElementConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type PageRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate;
};

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type PageRootElementDeleteFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type PageRootElementDisconnectFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type PageRootElementFieldInput = {
  create?: InputMaybe<PageRootElementCreateFieldInput>;
  connect?: InputMaybe<PageRootElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>;
};

export type PageRootElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PageRootElementNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PageRootElementNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PageRootElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type PageRootElementUpdateFieldInput = {
  where?: InputMaybe<PageRootElementConnectionWhere>;
  update?: InputMaybe<PageRootElementUpdateConnectionInput>;
  connect?: InputMaybe<PageRootElementConnectFieldInput>;
  disconnect?: InputMaybe<PageRootElementDisconnectFieldInput>;
  create?: InputMaybe<PageRootElementCreateFieldInput>;
  delete?: InputMaybe<PageRootElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PageRootElementConnectOrCreateFieldInput>;
};

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: InputMaybe<SortDirection>;
  _compoundName?: InputMaybe<SortDirection>;
  url?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type PageStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PageStoreAggregateInput>>;
  OR?: InputMaybe<Array<PageStoreAggregateInput>>;
  NOT?: InputMaybe<PageStoreAggregateInput>;
  node?: InputMaybe<PageStoreNodeAggregationWhereInput>;
};

export type PageStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>;
  connect?: InputMaybe<StoreConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type PageStoreConnectionSort = {
  node?: InputMaybe<StoreSort>;
};

export type PageStoreConnectionWhere = {
  AND?: InputMaybe<Array<PageStoreConnectionWhere>>;
  OR?: InputMaybe<Array<PageStoreConnectionWhere>>;
  NOT?: InputMaybe<PageStoreConnectionWhere>;
  node?: InputMaybe<StoreWhere>;
};

export type PageStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere;
  onCreate: PageStoreConnectOrCreateFieldInputOnCreate;
};

export type PageStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput;
};

export type PageStoreCreateFieldInput = {
  node: StoreCreateInput;
};

export type PageStoreDeleteFieldInput = {
  where?: InputMaybe<PageStoreConnectionWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};

export type PageStoreDisconnectFieldInput = {
  where?: InputMaybe<PageStoreConnectionWhere>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
};

export type PageStoreFieldInput = {
  create?: InputMaybe<PageStoreCreateFieldInput>;
  connect?: InputMaybe<PageStoreConnectFieldInput>;
  connectOrCreate?: InputMaybe<PageStoreConnectOrCreateFieldInput>;
};

export type PageStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PageStoreNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PageStoreNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PageStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>;
};

export type PageStoreUpdateFieldInput = {
  where?: InputMaybe<PageStoreConnectionWhere>;
  update?: InputMaybe<PageStoreUpdateConnectionInput>;
  connect?: InputMaybe<PageStoreConnectFieldInput>;
  disconnect?: InputMaybe<PageStoreDisconnectFieldInput>;
  create?: InputMaybe<PageStoreCreateFieldInput>;
  delete?: InputMaybe<PageStoreDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PageStoreConnectOrCreateFieldInput>;
};

export type PageTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type PageTypeConnectOrCreateWhere = {
  node: PageTypeUniqueWhere;
};

export type PageTypeConnectWhere = {
  node: PageTypeWhere;
};

export type PageTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type PageTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type PageTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type PageTypeOptions = {
  /** Specify one or more PageTypeSort objects to sort PageTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PageTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PageTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<PageTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<PageTypeOwnerAggregateInput>;
  node?: InputMaybe<PageTypeOwnerNodeAggregationWhereInput>;
};

export type PageTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PageTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PageTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type PageTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PageTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type PageTypeWhere = {
  OR?: InputMaybe<Array<PageTypeWhere>>;
  AND?: InputMaybe<Array<PageTypeWhere>>;
  NOT?: InputMaybe<PageTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
};

export type PageUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<PageKind>;
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>;
  app?: InputMaybe<PageAppUpdateFieldInput>;
  store?: InputMaybe<PageStoreUpdateFieldInput>;
  pageContentContainer?: InputMaybe<PagePageContentContainerUpdateFieldInput>;
};

export type PageWhere = {
  OR?: InputMaybe<Array<PageWhere>>;
  AND?: InputMaybe<Array<PageWhere>>;
  NOT?: InputMaybe<PageWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  _compoundName?: InputMaybe<Scalars['String']['input']>;
  _compoundName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  _compoundName_MATCHES?: InputMaybe<Scalars['String']['input']>;
  _compoundName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  _compoundName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  _compoundName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  url_MATCHES?: InputMaybe<Scalars['String']['input']>;
  url_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  url_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  url_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<PageKind>;
  kind_IN?: InputMaybe<Array<PageKind>>;
  rootElement?: InputMaybe<ElementWhere>;
  rootElement_NOT?: InputMaybe<ElementWhere>;
  rootElementAggregate?: InputMaybe<PageRootElementAggregateInput>;
  app?: InputMaybe<AppWhere>;
  app_NOT?: InputMaybe<AppWhere>;
  appAggregate?: InputMaybe<PageAppAggregateInput>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<PageStoreAggregateInput>;
  pageContentContainer?: InputMaybe<ElementWhere>;
  pageContentContainer_NOT?: InputMaybe<ElementWhere>;
  pageContentContainerAggregate?: InputMaybe<PagePageContentContainerAggregateInput>;
  rootElementConnection?: InputMaybe<PageRootElementConnectionWhere>;
  rootElementConnection_NOT?: InputMaybe<PageRootElementConnectionWhere>;
  appConnection?: InputMaybe<PageAppConnectionWhere>;
  appConnection_NOT?: InputMaybe<PageAppConnectionWhere>;
  storeConnection?: InputMaybe<PageStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<PageStoreConnectionWhere>;
  pageContentContainerConnection?: InputMaybe<PagePageContentContainerConnectionWhere>;
  pageContentContainerConnection_NOT?: InputMaybe<PagePageContentContainerConnectionWhere>;
};

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type PrimitiveTypeConnectOrCreateWhere = {
  node: PrimitiveTypeUniqueWhere;
};

export type PrimitiveTypeConnectWhere = {
  node: PrimitiveTypeWhere;
};

export type PrimitiveTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  primitiveKind: PrimitiveTypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type PrimitiveTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  primitiveKind: PrimitiveTypeKind;
};

export type PrimitiveTypeOptions = {
  /** Specify one or more PrimitiveTypeSort objects to sort PrimitiveTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PrimitiveTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PrimitiveTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<PrimitiveTypeOwnerAggregateInput>;
  node?: InputMaybe<PrimitiveTypeOwnerNodeAggregationWhereInput>;
};

export type PrimitiveTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PrimitiveTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  primitiveKind?: InputMaybe<SortDirection>;
};

export type PrimitiveTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  primitiveKind?: InputMaybe<PrimitiveTypeKind>;
};

export type PrimitiveTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  primitiveKind?: InputMaybe<PrimitiveTypeKind>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type PrimitiveTypeWhere = {
  OR?: InputMaybe<Array<PrimitiveTypeWhere>>;
  AND?: InputMaybe<Array<PrimitiveTypeWhere>>;
  NOT?: InputMaybe<PrimitiveTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  primitiveKind?: InputMaybe<PrimitiveTypeKind>;
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type PropConnectOrCreateWhere = {
  node: PropUniqueWhere;
};

export type PropConnectWhere = {
  node: PropWhere;
};

export type PropCreateInput = {
  id: Scalars['ID']['input'];
  data: Scalars['String']['input'];
};

export type PropOnCreateInput = {
  id: Scalars['ID']['input'];
  data: Scalars['String']['input'];
};

export type PropOptions = {
  /** Specify one or more PropSort objects to sort Props by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Fields to sort Props by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropSort object. */
export type PropSort = {
  id?: InputMaybe<SortDirection>;
  data?: InputMaybe<SortDirection>;
};

export type PropUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PropUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
};

export type PropWhere = {
  OR?: InputMaybe<Array<PropWhere>>;
  AND?: InputMaybe<Array<PropWhere>>;
  NOT?: InputMaybe<PropWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  data_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  data_MATCHES?: InputMaybe<Scalars['String']['input']>;
  data_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  data_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  data_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type QueryOptions = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type ReactNodeTypeConnectOrCreateWhere = {
  node: ReactNodeTypeUniqueWhere;
};

export type ReactNodeTypeConnectWhere = {
  node: ReactNodeTypeWhere;
};

export type ReactNodeTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type ReactNodeTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type ReactNodeTypeOptions = {
  /** Specify one or more ReactNodeTypeSort objects to sort ReactNodeTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ReactNodeTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ReactNodeTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<ReactNodeTypeOwnerAggregateInput>;
  node?: InputMaybe<ReactNodeTypeOwnerNodeAggregationWhereInput>;
};

export type ReactNodeTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ReactNodeTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ReactNodeTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ReactNodeTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type ReactNodeTypeWhere = {
  OR?: InputMaybe<Array<ReactNodeTypeWhere>>;
  AND?: InputMaybe<Array<ReactNodeTypeWhere>>;
  NOT?: InputMaybe<ReactNodeTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type RenderPropTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
};

export type RenderPropTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
};

export type RenderPropTypeConnectOrCreateWhere = {
  node: RenderPropTypeUniqueWhere;
};

export type RenderPropTypeConnectWhere = {
  node: RenderPropTypeWhere;
};

export type RenderPropTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
};

export type RenderPropTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
};

export type RenderPropTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
};

export type RenderPropTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type RenderPropTypeOptions = {
  /** Specify one or more RenderPropTypeSort objects to sort RenderPropTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RenderPropTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type RenderPropTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<RenderPropTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<RenderPropTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<RenderPropTypeOwnerAggregateInput>;
  node?: InputMaybe<RenderPropTypeOwnerNodeAggregationWhereInput>;
};

export type RenderPropTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RenderPropTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<RenderPropTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RenderPropTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RenderPropTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
};

/** Fields to sort RenderPropTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropTypeSort object. */
export type RenderPropTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type RenderPropTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RenderPropTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
};

export type RenderPropTypeWhere = {
  OR?: InputMaybe<Array<RenderPropTypeWhere>>;
  AND?: InputMaybe<Array<RenderPropTypeWhere>>;
  NOT?: InputMaybe<RenderPropTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<RenderPropTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
};

export type ResourceConfigAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ResourceConfigAggregateInput>>;
  OR?: InputMaybe<Array<ResourceConfigAggregateInput>>;
  NOT?: InputMaybe<ResourceConfigAggregateInput>;
  node?: InputMaybe<ResourceConfigNodeAggregationWhereInput>;
};

export type ResourceConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type ResourceConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ResourceConfigConnectionWhere = {
  AND?: InputMaybe<Array<ResourceConfigConnectionWhere>>;
  OR?: InputMaybe<Array<ResourceConfigConnectionWhere>>;
  NOT?: InputMaybe<ResourceConfigConnectionWhere>;
  node?: InputMaybe<PropWhere>;
};

export type ResourceConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: ResourceConfigConnectOrCreateFieldInputOnCreate;
};

export type ResourceConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type ResourceConfigCreateFieldInput = {
  node: PropCreateInput;
};

export type ResourceConfigDeleteFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>;
};

export type ResourceConfigDisconnectFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>;
};

export type ResourceConfigFieldInput = {
  create?: InputMaybe<ResourceConfigCreateFieldInput>;
  connect?: InputMaybe<ResourceConfigConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>;
};

export type ResourceConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceConfigNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ResourceConfigNodeAggregationWhereInput>;
  data_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  data_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  data_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  data_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ResourceConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type ResourceConfigUpdateFieldInput = {
  where?: InputMaybe<ResourceConfigConnectionWhere>;
  update?: InputMaybe<ResourceConfigUpdateConnectionInput>;
  connect?: InputMaybe<ResourceConfigConnectFieldInput>;
  disconnect?: InputMaybe<ResourceConfigDisconnectFieldInput>;
  create?: InputMaybe<ResourceConfigCreateFieldInput>;
  delete?: InputMaybe<ResourceConfigDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>;
};

export type ResourceConnectInput = {
  config?: InputMaybe<ResourceConfigConnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
};

export type ResourceConnectOrCreateInput = {
  config?: InputMaybe<ResourceConfigConnectOrCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
};

export type ResourceConnectOrCreateWhere = {
  node: ResourceUniqueWhere;
};

export type ResourceConnectWhere = {
  node: ResourceWhere;
};

export type ResourceCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: ResourceType;
  config?: InputMaybe<ResourceConfigFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
};

export type ResourceDeleteInput = {
  config?: InputMaybe<ResourceConfigDeleteFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
};

export type ResourceDisconnectInput = {
  config?: InputMaybe<ResourceConfigDisconnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
};

export type ResourceOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: ResourceType;
};

export type ResourceOptions = {
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ResourceOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<ResourceOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ResourceOwnerAggregateInput>>;
  NOT?: InputMaybe<ResourceOwnerAggregateInput>;
  node?: InputMaybe<ResourceOwnerNodeAggregationWhereInput>;
};

export type ResourceOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ResourceOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ResourceRelationInput = {
  config?: InputMaybe<ResourceConfigCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
};

/** Fields to sort Resources by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceSort object. */
export type ResourceSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type ResourceUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ResourceUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ResourceType>;
  config?: InputMaybe<ResourceConfigUpdateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
};

export type ResourceWhere = {
  OR?: InputMaybe<Array<ResourceWhere>>;
  AND?: InputMaybe<Array<ResourceWhere>>;
  NOT?: InputMaybe<ResourceWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ResourceType>;
  type_IN?: InputMaybe<Array<ResourceType>>;
  config?: InputMaybe<PropWhere>;
  config_NOT?: InputMaybe<PropWhere>;
  configAggregate?: InputMaybe<ResourceConfigAggregateInput>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ResourceOwnerAggregateInput>;
  configConnection?: InputMaybe<ResourceConfigConnectionWhere>;
  configConnection_NOT?: InputMaybe<ResourceConfigConnectionWhere>;
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
};

export type StoreActionsApiActionConnectFieldInput = {
  where?: InputMaybe<ApiActionConnectWhere>;
  connect?: InputMaybe<Array<ApiActionConnectInput>>;
};

export type StoreActionsApiActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsApiActionConnectionWhere>>;
  AND?: InputMaybe<Array<StoreActionsApiActionConnectionWhere>>;
  NOT?: InputMaybe<StoreActionsApiActionConnectionWhere>;
  node?: InputMaybe<ApiActionWhere>;
};

export type StoreActionsApiActionConnectOrCreateFieldInput = {
  where: ApiActionConnectOrCreateWhere;
  onCreate: StoreActionsApiActionConnectOrCreateFieldInputOnCreate;
};

export type StoreActionsApiActionConnectOrCreateFieldInputOnCreate = {
  node: ApiActionOnCreateInput;
};

export type StoreActionsApiActionCreateFieldInput = {
  node: ApiActionCreateInput;
};

export type StoreActionsApiActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>;
  delete?: InputMaybe<ApiActionDeleteInput>;
};

export type StoreActionsApiActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>;
  disconnect?: InputMaybe<ApiActionDisconnectInput>;
};

export type StoreActionsApiActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>;
  connect?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<StoreActionsApiActionConnectOrCreateFieldInput>>;
};

export type StoreActionsApiActionUpdateConnectionInput = {
  node?: InputMaybe<ApiActionUpdateInput>;
};

export type StoreActionsApiActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsApiActionConnectionWhere>;
  update?: InputMaybe<StoreActionsApiActionUpdateConnectionInput>;
  connect?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>;
  disconnect?: InputMaybe<Array<StoreActionsApiActionDisconnectFieldInput>>;
  create?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>;
  delete?: InputMaybe<Array<StoreActionsApiActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<StoreActionsApiActionConnectOrCreateFieldInput>>;
};

export type StoreActionsCodeActionConnectFieldInput = {
  where?: InputMaybe<CodeActionConnectWhere>;
  connect?: InputMaybe<Array<CodeActionConnectInput>>;
};

export type StoreActionsCodeActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsCodeActionConnectionWhere>>;
  AND?: InputMaybe<Array<StoreActionsCodeActionConnectionWhere>>;
  NOT?: InputMaybe<StoreActionsCodeActionConnectionWhere>;
  node?: InputMaybe<CodeActionWhere>;
};

export type StoreActionsCodeActionConnectOrCreateFieldInput = {
  where: CodeActionConnectOrCreateWhere;
  onCreate: StoreActionsCodeActionConnectOrCreateFieldInputOnCreate;
};

export type StoreActionsCodeActionConnectOrCreateFieldInputOnCreate = {
  node: CodeActionOnCreateInput;
};

export type StoreActionsCodeActionCreateFieldInput = {
  node: CodeActionCreateInput;
};

export type StoreActionsCodeActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>;
  delete?: InputMaybe<CodeActionDeleteInput>;
};

export type StoreActionsCodeActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>;
  disconnect?: InputMaybe<CodeActionDisconnectInput>;
};

export type StoreActionsCodeActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>;
  connect?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<StoreActionsCodeActionConnectOrCreateFieldInput>>;
};

export type StoreActionsCodeActionUpdateConnectionInput = {
  node?: InputMaybe<CodeActionUpdateInput>;
};

export type StoreActionsCodeActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsCodeActionConnectionWhere>;
  update?: InputMaybe<StoreActionsCodeActionUpdateConnectionInput>;
  connect?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>;
  disconnect?: InputMaybe<Array<StoreActionsCodeActionDisconnectFieldInput>>;
  create?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>;
  delete?: InputMaybe<Array<StoreActionsCodeActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<StoreActionsCodeActionConnectOrCreateFieldInput>>;
};

export type StoreActionsConnectInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionConnectFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionConnectFieldInput>>;
};

export type StoreActionsConnectionWhere = {
  CodeAction?: InputMaybe<StoreActionsCodeActionConnectionWhere>;
  ApiAction?: InputMaybe<StoreActionsApiActionConnectionWhere>;
};

export type StoreActionsConnectOrCreateInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionConnectOrCreateFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionConnectOrCreateFieldInput>>;
};

export type StoreActionsCreateFieldInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionCreateFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionCreateFieldInput>>;
};

export type StoreActionsCreateInput = {
  CodeAction?: InputMaybe<StoreActionsCodeActionFieldInput>;
  ApiAction?: InputMaybe<StoreActionsApiActionFieldInput>;
};

export type StoreActionsDeleteInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionDeleteFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionDeleteFieldInput>>;
};

export type StoreActionsDisconnectInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionDisconnectFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionDisconnectFieldInput>>;
};

export type StoreActionsUpdateInput = {
  CodeAction?: InputMaybe<Array<StoreActionsCodeActionUpdateFieldInput>>;
  ApiAction?: InputMaybe<Array<StoreActionsApiActionUpdateFieldInput>>;
};

export type StoreApiAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<StoreApiAggregateInput>>;
  OR?: InputMaybe<Array<StoreApiAggregateInput>>;
  NOT?: InputMaybe<StoreApiAggregateInput>;
  node?: InputMaybe<StoreApiNodeAggregationWhereInput>;
};

export type StoreApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type StoreApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type StoreApiConnectionWhere = {
  AND?: InputMaybe<Array<StoreApiConnectionWhere>>;
  OR?: InputMaybe<Array<StoreApiConnectionWhere>>;
  NOT?: InputMaybe<StoreApiConnectionWhere>;
  node?: InputMaybe<InterfaceTypeWhere>;
};

export type StoreApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: StoreApiConnectOrCreateFieldInputOnCreate;
};

export type StoreApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type StoreApiCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type StoreApiDeleteFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type StoreApiDisconnectFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type StoreApiFieldInput = {
  create?: InputMaybe<StoreApiCreateFieldInput>;
  connect?: InputMaybe<StoreApiConnectFieldInput>;
  connectOrCreate?: InputMaybe<StoreApiConnectOrCreateFieldInput>;
};

export type StoreApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreApiNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StoreApiNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StoreApiNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type StoreApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type StoreApiUpdateFieldInput = {
  where?: InputMaybe<StoreApiConnectionWhere>;
  update?: InputMaybe<StoreApiUpdateConnectionInput>;
  connect?: InputMaybe<StoreApiConnectFieldInput>;
  disconnect?: InputMaybe<StoreApiDisconnectFieldInput>;
  create?: InputMaybe<StoreApiCreateFieldInput>;
  delete?: InputMaybe<StoreApiDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StoreApiConnectOrCreateFieldInput>;
};

export type StoreComponentAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<StoreComponentAggregateInput>>;
  OR?: InputMaybe<Array<StoreComponentAggregateInput>>;
  NOT?: InputMaybe<StoreComponentAggregateInput>;
  node?: InputMaybe<StoreComponentNodeAggregationWhereInput>;
};

export type StoreComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<ComponentConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type StoreComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type StoreComponentConnectionWhere = {
  AND?: InputMaybe<Array<StoreComponentConnectionWhere>>;
  OR?: InputMaybe<Array<StoreComponentConnectionWhere>>;
  NOT?: InputMaybe<StoreComponentConnectionWhere>;
  node?: InputMaybe<ComponentWhere>;
};

export type StoreComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere;
  onCreate: StoreComponentConnectOrCreateFieldInputOnCreate;
};

export type StoreComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput;
};

export type StoreComponentCreateFieldInput = {
  node: ComponentCreateInput;
};

export type StoreComponentDeleteFieldInput = {
  where?: InputMaybe<StoreComponentConnectionWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};

export type StoreComponentDisconnectFieldInput = {
  where?: InputMaybe<StoreComponentConnectionWhere>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
};

export type StoreComponentFieldInput = {
  create?: InputMaybe<StoreComponentCreateFieldInput>;
  connect?: InputMaybe<StoreComponentConnectFieldInput>;
  connectOrCreate?: InputMaybe<StoreComponentConnectOrCreateFieldInput>;
};

export type StoreComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreComponentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StoreComponentNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StoreComponentNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type StoreComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type StoreComponentUpdateFieldInput = {
  where?: InputMaybe<StoreComponentConnectionWhere>;
  update?: InputMaybe<StoreComponentUpdateConnectionInput>;
  connect?: InputMaybe<StoreComponentConnectFieldInput>;
  disconnect?: InputMaybe<StoreComponentDisconnectFieldInput>;
  create?: InputMaybe<StoreComponentCreateFieldInput>;
  delete?: InputMaybe<StoreComponentDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StoreComponentConnectOrCreateFieldInput>;
};

export type StoreConnectInput = {
  api?: InputMaybe<StoreApiConnectFieldInput>;
  actions?: InputMaybe<StoreActionsConnectInput>;
  component?: InputMaybe<StoreComponentConnectFieldInput>;
  page?: InputMaybe<StorePageConnectFieldInput>;
};

export type StoreConnectOrCreateInput = {
  api?: InputMaybe<StoreApiConnectOrCreateFieldInput>;
  actions?: InputMaybe<StoreActionsConnectOrCreateInput>;
  component?: InputMaybe<StoreComponentConnectOrCreateFieldInput>;
  page?: InputMaybe<StorePageConnectOrCreateFieldInput>;
};

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere;
};

export type StoreConnectWhere = {
  node: StoreWhere;
};

export type StoreCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  api?: InputMaybe<StoreApiFieldInput>;
  actions?: InputMaybe<StoreActionsCreateInput>;
  component?: InputMaybe<StoreComponentFieldInput>;
  page?: InputMaybe<StorePageFieldInput>;
};

export type StoreDeleteInput = {
  api?: InputMaybe<StoreApiDeleteFieldInput>;
  actions?: InputMaybe<StoreActionsDeleteInput>;
  component?: InputMaybe<StoreComponentDeleteFieldInput>;
  page?: InputMaybe<StorePageDeleteFieldInput>;
};

export type StoreDisconnectInput = {
  api?: InputMaybe<StoreApiDisconnectFieldInput>;
  actions?: InputMaybe<StoreActionsDisconnectInput>;
  component?: InputMaybe<StoreComponentDisconnectFieldInput>;
  page?: InputMaybe<StorePageDisconnectFieldInput>;
};

export type StoreOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type StoreOptions = {
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StorePageAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<StorePageAggregateInput>>;
  OR?: InputMaybe<Array<StorePageAggregateInput>>;
  NOT?: InputMaybe<StorePageAggregateInput>;
  node?: InputMaybe<StorePageNodeAggregationWhereInput>;
};

export type StorePageConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>;
  connect?: InputMaybe<PageConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type StorePageConnectionSort = {
  node?: InputMaybe<PageSort>;
};

export type StorePageConnectionWhere = {
  AND?: InputMaybe<Array<StorePageConnectionWhere>>;
  OR?: InputMaybe<Array<StorePageConnectionWhere>>;
  NOT?: InputMaybe<StorePageConnectionWhere>;
  node?: InputMaybe<PageWhere>;
};

export type StorePageConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere;
  onCreate: StorePageConnectOrCreateFieldInputOnCreate;
};

export type StorePageConnectOrCreateFieldInputOnCreate = {
  node: PageOnCreateInput;
};

export type StorePageCreateFieldInput = {
  node: PageCreateInput;
};

export type StorePageDeleteFieldInput = {
  where?: InputMaybe<StorePageConnectionWhere>;
  delete?: InputMaybe<PageDeleteInput>;
};

export type StorePageDisconnectFieldInput = {
  where?: InputMaybe<StorePageConnectionWhere>;
  disconnect?: InputMaybe<PageDisconnectInput>;
};

export type StorePageFieldInput = {
  create?: InputMaybe<StorePageCreateFieldInput>;
  connect?: InputMaybe<StorePageConnectFieldInput>;
  connectOrCreate?: InputMaybe<StorePageConnectOrCreateFieldInput>;
};

export type StorePageNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StorePageNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StorePageNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StorePageNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type StorePageUpdateConnectionInput = {
  node?: InputMaybe<PageUpdateInput>;
};

export type StorePageUpdateFieldInput = {
  where?: InputMaybe<StorePageConnectionWhere>;
  update?: InputMaybe<StorePageUpdateConnectionInput>;
  connect?: InputMaybe<StorePageConnectFieldInput>;
  disconnect?: InputMaybe<StorePageDisconnectFieldInput>;
  create?: InputMaybe<StorePageCreateFieldInput>;
  delete?: InputMaybe<StorePageDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StorePageConnectOrCreateFieldInput>;
};

export type StoreRelationInput = {
  api?: InputMaybe<StoreApiCreateFieldInput>;
  actions?: InputMaybe<StoreActionsCreateFieldInput>;
  component?: InputMaybe<StoreComponentCreateFieldInput>;
  page?: InputMaybe<StorePageCreateFieldInput>;
};

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StoreUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  api?: InputMaybe<StoreApiUpdateFieldInput>;
  actions?: InputMaybe<StoreActionsUpdateInput>;
  component?: InputMaybe<StoreComponentUpdateFieldInput>;
  page?: InputMaybe<StorePageUpdateFieldInput>;
};

export type StoreWhere = {
  OR?: InputMaybe<Array<StoreWhere>>;
  AND?: InputMaybe<Array<StoreWhere>>;
  NOT?: InputMaybe<StoreWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  api?: InputMaybe<InterfaceTypeWhere>;
  api_NOT?: InputMaybe<InterfaceTypeWhere>;
  apiAggregate?: InputMaybe<StoreApiAggregateInput>;
  component?: InputMaybe<ComponentWhere>;
  component_NOT?: InputMaybe<ComponentWhere>;
  componentAggregate?: InputMaybe<StoreComponentAggregateInput>;
  page?: InputMaybe<PageWhere>;
  page_NOT?: InputMaybe<PageWhere>;
  pageAggregate?: InputMaybe<StorePageAggregateInput>;
  apiConnection?: InputMaybe<StoreApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<StoreApiConnectionWhere>;
  /** Return Stores where all of the related StoreActionsConnections match this filter */
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>;
  /** Return Stores where none of the related StoreActionsConnections match this filter */
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>;
  /** Return Stores where one of the related StoreActionsConnections match this filter */
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>;
  /** Return Stores where some of the related StoreActionsConnections match this filter */
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>;
  componentConnection?: InputMaybe<StoreComponentConnectionWhere>;
  componentConnection_NOT?: InputMaybe<StoreComponentConnectionWhere>;
  pageConnection?: InputMaybe<StorePageConnectionWhere>;
  pageConnection_NOT?: InputMaybe<StorePageConnectionWhere>;
};

export type TagAtomsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<TagAtomsAggregateInput>>;
  OR?: InputMaybe<Array<TagAtomsAggregateInput>>;
  NOT?: InputMaybe<TagAtomsAggregateInput>;
  node?: InputMaybe<TagAtomsNodeAggregationWhereInput>;
};

export type TagAtomsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type TagAtomsConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type TagAtomsConnectionWhere = {
  AND?: InputMaybe<Array<TagAtomsConnectionWhere>>;
  OR?: InputMaybe<Array<TagAtomsConnectionWhere>>;
  NOT?: InputMaybe<TagAtomsConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type TagAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: TagAtomsConnectOrCreateFieldInputOnCreate;
};

export type TagAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type TagAtomsCreateFieldInput = {
  node: AtomCreateInput;
};

export type TagAtomsDeleteFieldInput = {
  where?: InputMaybe<TagAtomsConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type TagAtomsDisconnectFieldInput = {
  where?: InputMaybe<TagAtomsConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type TagAtomsFieldInput = {
  create?: InputMaybe<Array<TagAtomsCreateFieldInput>>;
  connect?: InputMaybe<Array<TagAtomsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagAtomsConnectOrCreateFieldInput>>;
};

export type TagAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagAtomsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagAtomsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TagAtomsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type TagAtomsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type TagAtomsUpdateFieldInput = {
  where?: InputMaybe<TagAtomsConnectionWhere>;
  update?: InputMaybe<TagAtomsUpdateConnectionInput>;
  connect?: InputMaybe<Array<TagAtomsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TagAtomsDisconnectFieldInput>>;
  create?: InputMaybe<Array<TagAtomsCreateFieldInput>>;
  delete?: InputMaybe<Array<TagAtomsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagAtomsConnectOrCreateFieldInput>>;
};

export type TagChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<TagChildrenAggregateInput>>;
  OR?: InputMaybe<Array<TagChildrenAggregateInput>>;
  NOT?: InputMaybe<TagChildrenAggregateInput>;
  node?: InputMaybe<TagChildrenNodeAggregationWhereInput>;
};

export type TagChildrenConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type TagChildrenConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type TagChildrenConnectionWhere = {
  AND?: InputMaybe<Array<TagChildrenConnectionWhere>>;
  OR?: InputMaybe<Array<TagChildrenConnectionWhere>>;
  NOT?: InputMaybe<TagChildrenConnectionWhere>;
  node?: InputMaybe<TagWhere>;
};

export type TagChildrenConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: TagChildrenConnectOrCreateFieldInputOnCreate;
};

export type TagChildrenConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type TagChildrenCreateFieldInput = {
  node: TagCreateInput;
};

export type TagChildrenDeleteFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type TagChildrenDisconnectFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>;
  disconnect?: InputMaybe<TagDisconnectInput>;
};

export type TagChildrenFieldInput = {
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>;
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>;
};

export type TagChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagChildrenNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TagChildrenNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type TagChildrenUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type TagChildrenUpdateFieldInput = {
  where?: InputMaybe<TagChildrenConnectionWhere>;
  update?: InputMaybe<TagChildrenUpdateConnectionInput>;
  connect?: InputMaybe<Array<TagChildrenConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>;
  create?: InputMaybe<Array<TagChildrenCreateFieldInput>>;
  delete?: InputMaybe<Array<TagChildrenDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>;
};

export type TagConnectInput = {
  parent?: InputMaybe<TagParentConnectFieldInput>;
  children?: InputMaybe<Array<TagChildrenConnectFieldInput>>;
  owner?: InputMaybe<TagOwnerConnectFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsConnectFieldInput>>;
};

export type TagConnectOrCreateInput = {
  parent?: InputMaybe<TagParentConnectOrCreateFieldInput>;
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>;
  owner?: InputMaybe<TagOwnerConnectOrCreateFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsConnectOrCreateFieldInput>>;
};

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere;
};

export type TagConnectWhere = {
  node: TagWhere;
};

export type TagCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  parent?: InputMaybe<TagParentFieldInput>;
  children?: InputMaybe<TagChildrenFieldInput>;
  owner?: InputMaybe<TagOwnerFieldInput>;
  atoms?: InputMaybe<TagAtomsFieldInput>;
};

export type TagDeleteInput = {
  parent?: InputMaybe<TagParentDeleteFieldInput>;
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>;
  owner?: InputMaybe<TagOwnerDeleteFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsDeleteFieldInput>>;
};

export type TagDisconnectInput = {
  parent?: InputMaybe<TagParentDisconnectFieldInput>;
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>;
  owner?: InputMaybe<TagOwnerDisconnectFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsDisconnectFieldInput>>;
};

export type TagOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type TagOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<TagOwnerAggregateInput>>;
  OR?: InputMaybe<Array<TagOwnerAggregateInput>>;
  NOT?: InputMaybe<TagOwnerAggregateInput>;
  node?: InputMaybe<TagOwnerNodeAggregationWhereInput>;
};

export type TagOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type TagOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type TagOwnerConnectionWhere = {
  AND?: InputMaybe<Array<TagOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<TagOwnerConnectionWhere>>;
  NOT?: InputMaybe<TagOwnerConnectionWhere>;
  node?: InputMaybe<UserWhere>;
};

export type TagOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere;
  onCreate: TagOwnerConnectOrCreateFieldInputOnCreate;
};

export type TagOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput;
};

export type TagOwnerCreateFieldInput = {
  node: UserCreateInput;
};

export type TagOwnerDeleteFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};

export type TagOwnerDisconnectFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>;
  disconnect?: InputMaybe<UserDisconnectInput>;
};

export type TagOwnerFieldInput = {
  create?: InputMaybe<TagOwnerCreateFieldInput>;
  connect?: InputMaybe<TagOwnerConnectFieldInput>;
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>;
};

export type TagOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TagOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type TagOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type TagOwnerUpdateFieldInput = {
  where?: InputMaybe<TagOwnerConnectionWhere>;
  update?: InputMaybe<TagOwnerUpdateConnectionInput>;
  connect?: InputMaybe<TagOwnerConnectFieldInput>;
  disconnect?: InputMaybe<TagOwnerDisconnectFieldInput>;
  create?: InputMaybe<TagOwnerCreateFieldInput>;
  delete?: InputMaybe<TagOwnerDeleteFieldInput>;
  connectOrCreate?: InputMaybe<TagOwnerConnectOrCreateFieldInput>;
};

export type TagParentAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<TagParentAggregateInput>>;
  OR?: InputMaybe<Array<TagParentAggregateInput>>;
  NOT?: InputMaybe<TagParentAggregateInput>;
  node?: InputMaybe<TagParentNodeAggregationWhereInput>;
};

export type TagParentConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<TagConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type TagParentConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type TagParentConnectionWhere = {
  AND?: InputMaybe<Array<TagParentConnectionWhere>>;
  OR?: InputMaybe<Array<TagParentConnectionWhere>>;
  NOT?: InputMaybe<TagParentConnectionWhere>;
  node?: InputMaybe<TagWhere>;
};

export type TagParentConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: TagParentConnectOrCreateFieldInputOnCreate;
};

export type TagParentConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type TagParentCreateFieldInput = {
  node: TagCreateInput;
};

export type TagParentDeleteFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type TagParentDisconnectFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>;
  disconnect?: InputMaybe<TagDisconnectInput>;
};

export type TagParentFieldInput = {
  create?: InputMaybe<TagParentCreateFieldInput>;
  connect?: InputMaybe<TagParentConnectFieldInput>;
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>;
};

export type TagParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagParentNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TagParentNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type TagParentUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type TagParentUpdateFieldInput = {
  where?: InputMaybe<TagParentConnectionWhere>;
  update?: InputMaybe<TagParentUpdateConnectionInput>;
  connect?: InputMaybe<TagParentConnectFieldInput>;
  disconnect?: InputMaybe<TagParentDisconnectFieldInput>;
  create?: InputMaybe<TagParentCreateFieldInput>;
  delete?: InputMaybe<TagParentDeleteFieldInput>;
  connectOrCreate?: InputMaybe<TagParentConnectOrCreateFieldInput>;
};

export type TagRelationInput = {
  parent?: InputMaybe<TagParentCreateFieldInput>;
  children?: InputMaybe<Array<TagChildrenCreateFieldInput>>;
  owner?: InputMaybe<TagOwnerCreateFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsCreateFieldInput>>;
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  isRoot?: InputMaybe<SortDirection>;
};

export type TagUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TagUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<TagParentUpdateFieldInput>;
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>;
  owner?: InputMaybe<TagOwnerUpdateFieldInput>;
  atoms?: InputMaybe<Array<TagAtomsUpdateFieldInput>>;
};

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>;
  AND?: InputMaybe<Array<TagWhere>>;
  NOT?: InputMaybe<TagWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<TagWhere>;
  parent_NOT?: InputMaybe<TagWhere>;
  parentAggregate?: InputMaybe<TagParentAggregateInput>;
  childrenAggregate?: InputMaybe<TagChildrenAggregateInput>;
  /** Return Tags where all of the related Tags match this filter */
  children_ALL?: InputMaybe<TagWhere>;
  /** Return Tags where none of the related Tags match this filter */
  children_NONE?: InputMaybe<TagWhere>;
  /** Return Tags where one of the related Tags match this filter */
  children_SINGLE?: InputMaybe<TagWhere>;
  /** Return Tags where some of the related Tags match this filter */
  children_SOME?: InputMaybe<TagWhere>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<TagOwnerAggregateInput>;
  atomsAggregate?: InputMaybe<TagAtomsAggregateInput>;
  /** Return Tags where all of the related Atoms match this filter */
  atoms_ALL?: InputMaybe<AtomWhere>;
  /** Return Tags where none of the related Atoms match this filter */
  atoms_NONE?: InputMaybe<AtomWhere>;
  /** Return Tags where one of the related Atoms match this filter */
  atoms_SINGLE?: InputMaybe<AtomWhere>;
  /** Return Tags where some of the related Atoms match this filter */
  atoms_SOME?: InputMaybe<AtomWhere>;
  parentConnection?: InputMaybe<TagParentConnectionWhere>;
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>;
  /** Return Tags where all of the related TagChildrenConnections match this filter */
  childrenConnection_ALL?: InputMaybe<TagChildrenConnectionWhere>;
  /** Return Tags where none of the related TagChildrenConnections match this filter */
  childrenConnection_NONE?: InputMaybe<TagChildrenConnectionWhere>;
  /** Return Tags where one of the related TagChildrenConnections match this filter */
  childrenConnection_SINGLE?: InputMaybe<TagChildrenConnectionWhere>;
  /** Return Tags where some of the related TagChildrenConnections match this filter */
  childrenConnection_SOME?: InputMaybe<TagChildrenConnectionWhere>;
  ownerConnection?: InputMaybe<TagOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TagOwnerConnectionWhere>;
  /** Return Tags where all of the related TagAtomsConnections match this filter */
  atomsConnection_ALL?: InputMaybe<TagAtomsConnectionWhere>;
  /** Return Tags where none of the related TagAtomsConnections match this filter */
  atomsConnection_NONE?: InputMaybe<TagAtomsConnectionWhere>;
  /** Return Tags where one of the related TagAtomsConnections match this filter */
  atomsConnection_SINGLE?: InputMaybe<TagAtomsConnectionWhere>;
  /** Return Tags where some of the related TagAtomsConnections match this filter */
  atomsConnection_SOME?: InputMaybe<TagAtomsConnectionWhere>;
};

export type TypeReferenceCreateInput = {
  name: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export type TypeReferenceOptions = {
  /** Specify one or more TypeReferenceSort objects to sort TypeReferences by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TypeReferenceSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Fields to sort TypeReferences by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeReferenceSort object. */
export type TypeReferenceSort = {
  name?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type TypeReferenceUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type TypeReferenceWhere = {
  OR?: InputMaybe<Array<TypeReferenceWhere>>;
  AND?: InputMaybe<Array<TypeReferenceWhere>>;
  NOT?: InputMaybe<TypeReferenceWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  label_MATCHES?: InputMaybe<Scalars['String']['input']>;
  label_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type UnionTypeConnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeConnectInput>;
};

export type UnionTypeConnectOrCreateInput = {
  owner?: InputMaybe<IBaseTypeOwnerConnectOrCreateFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeConnectOrCreateInput>;
};

export type UnionTypeConnectOrCreateWhere = {
  node: UnionTypeUniqueWhere;
};

export type UnionTypeConnectWhere = {
  node: UnionTypeWhere;
};

export type UnionTypeCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
  owner?: InputMaybe<IBaseTypeOwnerFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeCreateInput>;
};

export type UnionTypeDeleteInput = {
  owner?: InputMaybe<IBaseTypeOwnerDeleteFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeDeleteInput>;
};

export type UnionTypeDisconnectInput = {
  owner?: InputMaybe<IBaseTypeOwnerDisconnectFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeDisconnectInput>;
};

export type UnionTypeOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  kind?: TypeKind;
};

export type UnionTypeOptions = {
  /** Specify one or more UnionTypeSort objects to sort UnionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UnionTypeSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UnionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>;
  NOT?: InputMaybe<UnionTypeOwnerAggregateInput>;
  node?: InputMaybe<UnionTypeOwnerNodeAggregationWhereInput>;
};

export type UnionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UnionTypeOwnerNodeAggregationWhereInput>;
  auth0Id_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  auth0Id_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  auth0Id_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UnionTypeRelationInput = {
  owner?: InputMaybe<IBaseTypeOwnerCreateFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeCreateFieldInput>;
};

/** Fields to sort UnionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnionTypeSort object. */
export type UnionTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput = {
  where?: InputMaybe<ActionTypeConnectWhere>;
  connect?: InputMaybe<Array<ActionTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeActionTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>;
  node?: InputMaybe<ActionTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput = {
  where: ActionTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInputOnCreate = {
  node: ActionTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput = {
  node: ActionTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>;
  delete?: InputMaybe<ActionTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>;
  disconnect?: InputMaybe<ActionTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeActionTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeActionTypeUpdateConnectionInput = {
  node?: InputMaybe<ActionTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeActionTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput = {
  where?: InputMaybe<AppTypeConnectWhere>;
  connect?: InputMaybe<Array<AppTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeAppTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>;
  node?: InputMaybe<AppTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput = {
  where: AppTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInputOnCreate = {
  node: AppTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput = {
  node: AppTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>;
  delete?: InputMaybe<AppTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>;
  disconnect?: InputMaybe<AppTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeAppTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeAppTypeUpdateConnectionInput = {
  node?: InputMaybe<AppTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeAppTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput = {
  where?: InputMaybe<ArrayTypeConnectWhere>;
  connect?: InputMaybe<Array<ArrayTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>;
  node?: InputMaybe<ArrayTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput = {
  where: ArrayTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInputOnCreate = {
  node: ArrayTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput = {
  node: ArrayTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>;
  delete?: InputMaybe<ArrayTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>;
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeUpdateConnectionInput = {
  node?: InputMaybe<ArrayTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeArrayTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput = {
  where?: InputMaybe<CodeMirrorTypeConnectWhere>;
  connect?: InputMaybe<Array<CodeMirrorTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>;
  node?: InputMaybe<CodeMirrorTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput = {
  where: CodeMirrorTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInputOnCreate = {
  node: CodeMirrorTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput = {
  node: CodeMirrorTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>;
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>;
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateConnectionInput = {
  node?: InputMaybe<CodeMirrorTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeConnectInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeConnectionWhere = {
  PrimitiveType?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>;
  ArrayType?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeConnectionWhere>;
  UnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>;
  InterfaceType?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>;
  ElementType?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>;
  RenderPropType?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>;
  ReactNodeType?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>;
  EnumType?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>;
  LambdaType?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>;
  PageType?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>;
  AppType?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeConnectionWhere>;
  ActionType?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeConnectionWhere>;
  CodeMirrorType?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectionWhere>;
};

export type UnionTypeTypesOfUnionTypeConnectOrCreateInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeConnectOrCreateFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeConnectOrCreateFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeConnectOrCreateFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeCreateFieldInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeCreateFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeCreateFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeCreateFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeCreateFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeCreateInput = {
  PrimitiveType?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeFieldInput>;
  ArrayType?: InputMaybe<UnionTypeTypesOfUnionTypeArrayTypeFieldInput>;
  UnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeFieldInput>;
  InterfaceType?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeFieldInput>;
  ElementType?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeFieldInput>;
  RenderPropType?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeFieldInput>;
  ReactNodeType?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeFieldInput>;
  EnumType?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeFieldInput>;
  LambdaType?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeFieldInput>;
  PageType?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeFieldInput>;
  AppType?: InputMaybe<UnionTypeTypesOfUnionTypeAppTypeFieldInput>;
  ActionType?: InputMaybe<UnionTypeTypesOfUnionTypeActionTypeFieldInput>;
  CodeMirrorType?: InputMaybe<UnionTypeTypesOfUnionTypeCodeMirrorTypeFieldInput>;
};

export type UnionTypeTypesOfUnionTypeDeleteInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeDeleteFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeDeleteFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDeleteFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeDeleteFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDeleteFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeDisconnectInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeDisconnectFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeDisconnectFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeDisconnectFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeDisconnectFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeDisconnectFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput = {
  where?: InputMaybe<ElementTypeConnectWhere>;
  connect?: InputMaybe<Array<ElementTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeElementTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>;
  node?: InputMaybe<ElementTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput = {
  where: ElementTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInputOnCreate = {
  node: ElementTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput = {
  node: ElementTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>;
  delete?: InputMaybe<ElementTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>;
  disconnect?: InputMaybe<ElementTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeElementTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeElementTypeUpdateConnectionInput = {
  node?: InputMaybe<ElementTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeElementTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeElementTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>;
  connect?: InputMaybe<Array<EnumTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>;
  node?: InputMaybe<EnumTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>;
  delete?: InputMaybe<EnumTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>;
  disconnect?: InputMaybe<EnumTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeUpdateConnectionInput = {
  node?: InputMaybe<EnumTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeEnumTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeEnumTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<Array<InterfaceTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>;
  node?: InputMaybe<InterfaceTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeInterfaceTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeInterfaceTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput = {
  where?: InputMaybe<LambdaTypeConnectWhere>;
  connect?: InputMaybe<Array<LambdaTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>;
  node?: InputMaybe<LambdaTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput = {
  where: LambdaTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInputOnCreate = {
  node: LambdaTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput = {
  node: LambdaTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>;
  delete?: InputMaybe<LambdaTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>;
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeUpdateConnectionInput = {
  node?: InputMaybe<LambdaTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeLambdaTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeLambdaTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypePageTypeConnectFieldInput = {
  where?: InputMaybe<PageTypeConnectWhere>;
  connect?: InputMaybe<Array<PageTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypePageTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>;
  node?: InputMaybe<PageTypeWhere>;
};

export type UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput = {
  where: PageTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInputOnCreate = {
  node: PageTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypePageTypeCreateFieldInput = {
  node: PageTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>;
  delete?: InputMaybe<PageTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>;
  disconnect?: InputMaybe<PageTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypePageTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypePageTypeUpdateConnectionInput = {
  node?: InputMaybe<PageTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypePageTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypePageTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput = {
  where?: InputMaybe<PrimitiveTypeConnectWhere>;
  connect?: InputMaybe<Array<PrimitiveTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>;
  node?: InputMaybe<PrimitiveTypeWhere>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput = {
  where: PrimitiveTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInputOnCreate = {
  node: PrimitiveTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput = {
  node: PrimitiveTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>;
  delete?: InputMaybe<PrimitiveTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>;
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeUpdateConnectionInput = {
  node?: InputMaybe<PrimitiveTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypePrimitiveTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypePrimitiveTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput = {
  where?: InputMaybe<ReactNodeTypeConnectWhere>;
  connect?: InputMaybe<Array<ReactNodeTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>;
  node?: InputMaybe<ReactNodeTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput = {
  where: ReactNodeTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInputOnCreate = {
  node: ReactNodeTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput = {
  node: ReactNodeTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>;
  delete?: InputMaybe<ReactNodeTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>;
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeUpdateConnectionInput = {
  node?: InputMaybe<ReactNodeTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeReactNodeTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeReactNodeTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeConnectFieldInput = {
  where?: InputMaybe<RenderPropTypeConnectWhere>;
  connect?: InputMaybe<Array<RenderPropTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>;
  node?: InputMaybe<RenderPropTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInput = {
  where: RenderPropTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInputOnCreate = {
  node: RenderPropTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeCreateFieldInput = {
  node: RenderPropTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>;
  delete?: InputMaybe<RenderPropTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>;
  disconnect?: InputMaybe<RenderPropTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeUpdateConnectionInput = {
  node?: InputMaybe<RenderPropTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeRenderPropTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeRenderPropTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput = {
  where?: InputMaybe<UnionTypeConnectWhere>;
  connect?: InputMaybe<Array<UnionTypeConnectInput>>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere = {
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>>;
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>>;
  NOT?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>;
  node?: InputMaybe<UnionTypeWhere>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput = {
  where: UnionTypeConnectOrCreateWhere;
  onCreate: UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInputOnCreate;
};

export type UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInputOnCreate = {
  node: UnionTypeOnCreateInput;
};

export type UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput = {
  node: UnionTypeCreateInput;
};

export type UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>;
  delete?: InputMaybe<UnionTypeDeleteInput>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>;
  disconnect?: InputMaybe<UnionTypeDisconnectInput>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeUpdateConnectionInput = {
  node?: InputMaybe<UnionTypeUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeUnionTypeUpdateFieldInput = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeConnectionWhere>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeUnionTypeUpdateConnectionInput>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeDisconnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeConnectOrCreateFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeUpdateInput = {
  PrimitiveType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePrimitiveTypeUpdateFieldInput>>;
  ArrayType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeArrayTypeUpdateFieldInput>>;
  UnionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeUnionTypeUpdateFieldInput>>;
  InterfaceType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeInterfaceTypeUpdateFieldInput>>;
  ElementType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeElementTypeUpdateFieldInput>>;
  RenderPropType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeRenderPropTypeUpdateFieldInput>>;
  ReactNodeType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeReactNodeTypeUpdateFieldInput>>;
  EnumType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeEnumTypeUpdateFieldInput>>;
  LambdaType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeLambdaTypeUpdateFieldInput>>;
  PageType?: InputMaybe<Array<UnionTypeTypesOfUnionTypePageTypeUpdateFieldInput>>;
  AppType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeAppTypeUpdateFieldInput>>;
  ActionType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeActionTypeUpdateFieldInput>>;
  CodeMirrorType?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCodeMirrorTypeUpdateFieldInput>>;
};

export type UnionTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UnionTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<IBaseTypeOwnerUpdateFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeUpdateInput>;
};

export type UnionTypeWhere = {
  OR?: InputMaybe<Array<UnionTypeWhere>>;
  AND?: InputMaybe<Array<UnionTypeWhere>>;
  NOT?: InputMaybe<UnionTypeWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_MATCHES?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<IBaseTypeOwnerConnectionWhere>;
  /** Return UnionTypes where all of the related UnionTypeTypesOfUnionTypeConnections match this filter */
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  /** Return UnionTypes where none of the related UnionTypeTypesOfUnionTypeConnections match this filter */
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  /** Return UnionTypes where one of the related UnionTypeTypesOfUnionTypeConnections match this filter */
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  /** Return UnionTypes where some of the related UnionTypeTypesOfUnionTypeConnections match this filter */
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
};

export type UserAppsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserAppsAggregateInput>>;
  OR?: InputMaybe<Array<UserAppsAggregateInput>>;
  NOT?: InputMaybe<UserAppsAggregateInput>;
  node?: InputMaybe<UserAppsNodeAggregationWhereInput>;
};

export type UserAppsConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<Array<AppConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserAppsConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type UserAppsConnectionWhere = {
  AND?: InputMaybe<Array<UserAppsConnectionWhere>>;
  OR?: InputMaybe<Array<UserAppsConnectionWhere>>;
  NOT?: InputMaybe<UserAppsConnectionWhere>;
  node?: InputMaybe<AppWhere>;
};

export type UserAppsConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere;
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate;
};

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput;
};

export type UserAppsCreateFieldInput = {
  node: AppCreateInput;
};

export type UserAppsDeleteFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>;
  delete?: InputMaybe<AppDeleteInput>;
};

export type UserAppsDisconnectFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>;
  disconnect?: InputMaybe<AppDisconnectInput>;
};

export type UserAppsFieldInput = {
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>;
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>;
};

export type UserAppsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserAppsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserAppsNodeAggregationWhereInput>;
  _compoundName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  _compoundName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  _compoundName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserAppsUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>;
};

export type UserAppsUpdateFieldInput = {
  where?: InputMaybe<UserAppsConnectionWhere>;
  update?: InputMaybe<UserAppsUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserAppsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserAppsDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserAppsCreateFieldInput>>;
  delete?: InputMaybe<Array<UserAppsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>;
};

export type UserAtomsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserAtomsAggregateInput>>;
  OR?: InputMaybe<Array<UserAtomsAggregateInput>>;
  NOT?: InputMaybe<UserAtomsAggregateInput>;
  node?: InputMaybe<UserAtomsNodeAggregationWhereInput>;
};

export type UserAtomsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserAtomsConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type UserAtomsConnectionWhere = {
  AND?: InputMaybe<Array<UserAtomsConnectionWhere>>;
  OR?: InputMaybe<Array<UserAtomsConnectionWhere>>;
  NOT?: InputMaybe<UserAtomsConnectionWhere>;
  node?: InputMaybe<AtomWhere>;
};

export type UserAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: UserAtomsConnectOrCreateFieldInputOnCreate;
};

export type UserAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type UserAtomsCreateFieldInput = {
  node: AtomCreateInput;
};

export type UserAtomsDeleteFieldInput = {
  where?: InputMaybe<UserAtomsConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type UserAtomsDisconnectFieldInput = {
  where?: InputMaybe<UserAtomsConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type UserAtomsFieldInput = {
  create?: InputMaybe<Array<UserAtomsCreateFieldInput>>;
  connect?: InputMaybe<Array<UserAtomsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserAtomsConnectOrCreateFieldInput>>;
};

export type UserAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAtomsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserAtomsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserAtomsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  icon_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  icon_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  icon_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalJsSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalJsSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalCssSource_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalCssSource_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  externalSourceType_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  externalSourceType_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserAtomsUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type UserAtomsUpdateFieldInput = {
  where?: InputMaybe<UserAtomsConnectionWhere>;
  update?: InputMaybe<UserAtomsUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserAtomsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserAtomsDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserAtomsCreateFieldInput>>;
  delete?: InputMaybe<Array<UserAtomsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserAtomsConnectOrCreateFieldInput>>;
};

export type UserComponentsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserComponentsAggregateInput>>;
  OR?: InputMaybe<Array<UserComponentsAggregateInput>>;
  NOT?: InputMaybe<UserComponentsAggregateInput>;
  node?: InputMaybe<UserComponentsNodeAggregationWhereInput>;
};

export type UserComponentsConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<Array<ComponentConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type UserComponentsConnectionWhere = {
  AND?: InputMaybe<Array<UserComponentsConnectionWhere>>;
  OR?: InputMaybe<Array<UserComponentsConnectionWhere>>;
  NOT?: InputMaybe<UserComponentsConnectionWhere>;
  node?: InputMaybe<ComponentWhere>;
};

export type UserComponentsConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere;
  onCreate: UserComponentsConnectOrCreateFieldInputOnCreate;
};

export type UserComponentsConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput;
};

export type UserComponentsCreateFieldInput = {
  node: ComponentCreateInput;
};

export type UserComponentsDeleteFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};

export type UserComponentsDisconnectFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
};

export type UserComponentsFieldInput = {
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>;
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>;
};

export type UserComponentsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserComponentsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserComponentsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  keyGenerator_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  keyGenerator_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserComponentsUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type UserComponentsUpdateFieldInput = {
  where?: InputMaybe<UserComponentsConnectionWhere>;
  update?: InputMaybe<UserComponentsUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserComponentsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserComponentsCreateFieldInput>>;
  delete?: InputMaybe<Array<UserComponentsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>;
};

export type UserConnectInput = {
  types?: InputMaybe<Array<UserTypesConnectFieldInput>>;
  apps?: InputMaybe<Array<UserAppsConnectFieldInput>>;
  elements?: InputMaybe<Array<UserElementsConnectFieldInput>>;
  components?: InputMaybe<Array<UserComponentsConnectFieldInput>>;
  atoms?: InputMaybe<Array<UserAtomsConnectFieldInput>>;
  tags?: InputMaybe<Array<UserTagsConnectFieldInput>>;
};

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  id: Scalars['ID']['input'];
  auth0Id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  roles?: InputMaybe<Array<Role>>;
  types?: InputMaybe<UserTypesFieldInput>;
  apps?: InputMaybe<UserAppsFieldInput>;
  elements?: InputMaybe<UserElementsFieldInput>;
  components?: InputMaybe<UserComponentsFieldInput>;
  atoms?: InputMaybe<UserAtomsFieldInput>;
  tags?: InputMaybe<UserTagsFieldInput>;
};

export type UserDeleteInput = {
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>;
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>;
  elements?: InputMaybe<Array<UserElementsDeleteFieldInput>>;
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>;
  atoms?: InputMaybe<Array<UserAtomsDeleteFieldInput>>;
  tags?: InputMaybe<Array<UserTagsDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>;
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>;
  elements?: InputMaybe<Array<UserElementsDisconnectFieldInput>>;
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>;
  atoms?: InputMaybe<Array<UserAtomsDisconnectFieldInput>>;
  tags?: InputMaybe<Array<UserTagsDisconnectFieldInput>>;
};

export type UserElementsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserElementsAggregateInput>>;
  OR?: InputMaybe<Array<UserElementsAggregateInput>>;
  NOT?: InputMaybe<UserElementsAggregateInput>;
  node?: InputMaybe<UserElementsNodeAggregationWhereInput>;
};

export type UserElementsConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<Array<ElementConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserElementsConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type UserElementsConnectionWhere = {
  AND?: InputMaybe<Array<UserElementsConnectionWhere>>;
  OR?: InputMaybe<Array<UserElementsConnectionWhere>>;
  NOT?: InputMaybe<UserElementsConnectionWhere>;
  node?: InputMaybe<ElementWhere>;
};

export type UserElementsConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: UserElementsConnectOrCreateFieldInputOnCreate;
};

export type UserElementsConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type UserElementsCreateFieldInput = {
  node: ElementCreateInput;
};

export type UserElementsDeleteFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type UserElementsDisconnectFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type UserElementsFieldInput = {
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>;
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>;
};

export type UserElementsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserElementsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserElementsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  customCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  customCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  customCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  guiCss_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  guiCss_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  guiCss_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  propTransformationJs_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  propTransformationJs_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderForEachPropKey_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderForEachPropKey_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  renderIfExpression_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  renderIfExpression_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserElementsUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type UserElementsUpdateFieldInput = {
  where?: InputMaybe<UserElementsConnectionWhere>;
  update?: InputMaybe<UserElementsUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserElementsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserElementsDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserElementsCreateFieldInput>>;
  delete?: InputMaybe<Array<UserElementsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>;
};

export type UserOnCreateInput = {
  id: Scalars['ID']['input'];
  auth0Id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  roles?: InputMaybe<Array<Role>>;
};

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>;
  auth0Id?: InputMaybe<SortDirection>;
  email?: InputMaybe<SortDirection>;
  username?: InputMaybe<SortDirection>;
};

export type UserTagsAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserTagsAggregateInput>>;
  OR?: InputMaybe<Array<UserTagsAggregateInput>>;
  NOT?: InputMaybe<UserTagsAggregateInput>;
  node?: InputMaybe<UserTagsNodeAggregationWhereInput>;
};

export type UserTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type UserTagsConnectionWhere = {
  AND?: InputMaybe<Array<UserTagsConnectionWhere>>;
  OR?: InputMaybe<Array<UserTagsConnectionWhere>>;
  NOT?: InputMaybe<UserTagsConnectionWhere>;
  node?: InputMaybe<TagWhere>;
};

export type UserTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: UserTagsConnectOrCreateFieldInputOnCreate;
};

export type UserTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type UserTagsCreateFieldInput = {
  node: TagCreateInput;
};

export type UserTagsDeleteFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type UserTagsDisconnectFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>;
  disconnect?: InputMaybe<TagDisconnectInput>;
};

export type UserTagsFieldInput = {
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>;
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>;
};

export type UserTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserTagsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserTagsNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type UserTagsUpdateFieldInput = {
  where?: InputMaybe<UserTagsConnectionWhere>;
  update?: InputMaybe<UserTagsUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserTagsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserTagsDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserTagsCreateFieldInput>>;
  delete?: InputMaybe<Array<UserTagsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>;
};

export type UserTypesAggregateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  AND?: InputMaybe<Array<UserTypesAggregateInput>>;
  OR?: InputMaybe<Array<UserTypesAggregateInput>>;
  NOT?: InputMaybe<UserTypesAggregateInput>;
  node?: InputMaybe<UserTypesNodeAggregationWhereInput>;
};

export type UserTypesConnectFieldInput = {
  where?: InputMaybe<BaseTypeConnectWhere>;
  connect?: InputMaybe<Array<BaseTypeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type UserTypesConnectionSort = {
  node?: InputMaybe<BaseTypeSort>;
};

export type UserTypesConnectionWhere = {
  AND?: InputMaybe<Array<UserTypesConnectionWhere>>;
  OR?: InputMaybe<Array<UserTypesConnectionWhere>>;
  NOT?: InputMaybe<UserTypesConnectionWhere>;
  node?: InputMaybe<BaseTypeWhere>;
};

export type UserTypesConnectOrCreateFieldInput = {
  where: BaseTypeConnectOrCreateWhere;
  onCreate: UserTypesConnectOrCreateFieldInputOnCreate;
};

export type UserTypesConnectOrCreateFieldInputOnCreate = {
  node: BaseTypeOnCreateInput;
};

export type UserTypesCreateFieldInput = {
  node: BaseTypeCreateInput;
};

export type UserTypesDeleteFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>;
  delete?: InputMaybe<BaseTypeDeleteInput>;
};

export type UserTypesDisconnectFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>;
  disconnect?: InputMaybe<BaseTypeDisconnectInput>;
};

export type UserTypesFieldInput = {
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>;
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTypesConnectOrCreateFieldInput>>;
};

export type UserTypesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTypesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserTypesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserTypesNodeAggregationWhereInput>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserTypesUpdateConnectionInput = {
  node?: InputMaybe<BaseTypeUpdateInput>;
};

export type UserTypesUpdateFieldInput = {
  where?: InputMaybe<UserTypesConnectionWhere>;
  update?: InputMaybe<UserTypesUpdateConnectionInput>;
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<UserTypesDisconnectFieldInput>>;
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserTypesDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTypesConnectOrCreateFieldInput>>;
};

export type UserUniqueWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  auth0Id?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  auth0Id?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Role>>;
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>;
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>;
  elements?: InputMaybe<Array<UserElementsUpdateFieldInput>>;
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>;
  atoms?: InputMaybe<Array<UserAtomsUpdateFieldInput>>;
  tags?: InputMaybe<Array<UserTagsUpdateFieldInput>>;
};

export type UserWhere = {
  OR?: InputMaybe<Array<UserWhere>>;
  AND?: InputMaybe<Array<UserWhere>>;
  NOT?: InputMaybe<UserWhere>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  auth0Id?: InputMaybe<Scalars['String']['input']>;
  auth0Id_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  auth0Id_MATCHES?: InputMaybe<Scalars['String']['input']>;
  auth0Id_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  auth0Id_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  auth0Id_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  email_MATCHES?: InputMaybe<Scalars['String']['input']>;
  email_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  username_MATCHES?: InputMaybe<Scalars['String']['input']>;
  username_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  username_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  username_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Role>>;
  roles_INCLUDES?: InputMaybe<Role>;
  typesAggregate?: InputMaybe<UserTypesAggregateInput>;
  /** Return Users where all of the related BaseTypes match this filter */
  types_ALL?: InputMaybe<BaseTypeWhere>;
  /** Return Users where none of the related BaseTypes match this filter */
  types_NONE?: InputMaybe<BaseTypeWhere>;
  /** Return Users where one of the related BaseTypes match this filter */
  types_SINGLE?: InputMaybe<BaseTypeWhere>;
  /** Return Users where some of the related BaseTypes match this filter */
  types_SOME?: InputMaybe<BaseTypeWhere>;
  appsAggregate?: InputMaybe<UserAppsAggregateInput>;
  /** Return Users where all of the related Apps match this filter */
  apps_ALL?: InputMaybe<AppWhere>;
  /** Return Users where none of the related Apps match this filter */
  apps_NONE?: InputMaybe<AppWhere>;
  /** Return Users where one of the related Apps match this filter */
  apps_SINGLE?: InputMaybe<AppWhere>;
  /** Return Users where some of the related Apps match this filter */
  apps_SOME?: InputMaybe<AppWhere>;
  elementsAggregate?: InputMaybe<UserElementsAggregateInput>;
  /** Return Users where all of the related Elements match this filter */
  elements_ALL?: InputMaybe<ElementWhere>;
  /** Return Users where none of the related Elements match this filter */
  elements_NONE?: InputMaybe<ElementWhere>;
  /** Return Users where one of the related Elements match this filter */
  elements_SINGLE?: InputMaybe<ElementWhere>;
  /** Return Users where some of the related Elements match this filter */
  elements_SOME?: InputMaybe<ElementWhere>;
  componentsAggregate?: InputMaybe<UserComponentsAggregateInput>;
  /** Return Users where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>;
  /** Return Users where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>;
  /** Return Users where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return Users where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>;
  atomsAggregate?: InputMaybe<UserAtomsAggregateInput>;
  /** Return Users where all of the related Atoms match this filter */
  atoms_ALL?: InputMaybe<AtomWhere>;
  /** Return Users where none of the related Atoms match this filter */
  atoms_NONE?: InputMaybe<AtomWhere>;
  /** Return Users where one of the related Atoms match this filter */
  atoms_SINGLE?: InputMaybe<AtomWhere>;
  /** Return Users where some of the related Atoms match this filter */
  atoms_SOME?: InputMaybe<AtomWhere>;
  tagsAggregate?: InputMaybe<UserTagsAggregateInput>;
  /** Return Users where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>;
  /** Return Users where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>;
  /** Return Users where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>;
  /** Return Users where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>;
  /** Return Users where all of the related UserTypesConnections match this filter */
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>;
  /** Return Users where none of the related UserTypesConnections match this filter */
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>;
  /** Return Users where one of the related UserTypesConnections match this filter */
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>;
  /** Return Users where some of the related UserTypesConnections match this filter */
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>;
  /** Return Users where all of the related UserAppsConnections match this filter */
  appsConnection_ALL?: InputMaybe<UserAppsConnectionWhere>;
  /** Return Users where none of the related UserAppsConnections match this filter */
  appsConnection_NONE?: InputMaybe<UserAppsConnectionWhere>;
  /** Return Users where one of the related UserAppsConnections match this filter */
  appsConnection_SINGLE?: InputMaybe<UserAppsConnectionWhere>;
  /** Return Users where some of the related UserAppsConnections match this filter */
  appsConnection_SOME?: InputMaybe<UserAppsConnectionWhere>;
  /** Return Users where all of the related UserElementsConnections match this filter */
  elementsConnection_ALL?: InputMaybe<UserElementsConnectionWhere>;
  /** Return Users where none of the related UserElementsConnections match this filter */
  elementsConnection_NONE?: InputMaybe<UserElementsConnectionWhere>;
  /** Return Users where one of the related UserElementsConnections match this filter */
  elementsConnection_SINGLE?: InputMaybe<UserElementsConnectionWhere>;
  /** Return Users where some of the related UserElementsConnections match this filter */
  elementsConnection_SOME?: InputMaybe<UserElementsConnectionWhere>;
  /** Return Users where all of the related UserComponentsConnections match this filter */
  componentsConnection_ALL?: InputMaybe<UserComponentsConnectionWhere>;
  /** Return Users where none of the related UserComponentsConnections match this filter */
  componentsConnection_NONE?: InputMaybe<UserComponentsConnectionWhere>;
  /** Return Users where one of the related UserComponentsConnections match this filter */
  componentsConnection_SINGLE?: InputMaybe<UserComponentsConnectionWhere>;
  /** Return Users where some of the related UserComponentsConnections match this filter */
  componentsConnection_SOME?: InputMaybe<UserComponentsConnectionWhere>;
  /** Return Users where all of the related UserAtomsConnections match this filter */
  atomsConnection_ALL?: InputMaybe<UserAtomsConnectionWhere>;
  /** Return Users where none of the related UserAtomsConnections match this filter */
  atomsConnection_NONE?: InputMaybe<UserAtomsConnectionWhere>;
  /** Return Users where one of the related UserAtomsConnections match this filter */
  atomsConnection_SINGLE?: InputMaybe<UserAtomsConnectionWhere>;
  /** Return Users where some of the related UserAtomsConnections match this filter */
  atomsConnection_SOME?: InputMaybe<UserAtomsConnectionWhere>;
  /** Return Users where all of the related UserTagsConnections match this filter */
  tagsConnection_ALL?: InputMaybe<UserTagsConnectionWhere>;
  /** Return Users where none of the related UserTagsConnections match this filter */
  tagsConnection_NONE?: InputMaybe<UserTagsConnectionWhere>;
  /** Return Users where one of the related UserTagsConnections match this filter */
  tagsConnection_SINGLE?: InputMaybe<UserTagsConnectionWhere>;
  /** Return Users where some of the related UserTagsConnections match this filter */
  tagsConnection_SOME?: InputMaybe<UserTagsConnectionWhere>;
};

export type WithOwnerOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
};

export type WithOwnerOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type WithOwnerOwnerConnectionWhere = {
  AND?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>;
  NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  node?: InputMaybe<UserWhere>;
};

export type WithOwnerOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere;
  onCreate: WithOwnerOwnerConnectOrCreateFieldInputOnCreate;
};

export type WithOwnerOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput;
};

export type WithOwnerOwnerCreateFieldInput = {
  node: UserCreateInput;
};

export type WithOwnerOwnerDeleteFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};

export type WithOwnerOwnerDisconnectFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  disconnect?: InputMaybe<UserDisconnectInput>;
};

export type WithOwnerOwnerFieldInput = {
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
};

export type WithOwnerOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type WithOwnerOwnerUpdateFieldInput = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  update?: InputMaybe<WithOwnerOwnerUpdateConnectionInput>;
  connect?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  disconnect?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
  create?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
  delete?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
  connectOrCreate?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
};

type BaseAction_ApiAction_Fragment = { __typename: 'ApiAction', id: string, name: string, type: ActionKind, store: { id: string, name: string } };

type BaseAction_CodeAction_Fragment = { __typename: 'CodeAction', id: string, name: string, type: ActionKind, store: { id: string, name: string } };

export type BaseActionFragment = BaseAction_ApiAction_Fragment | BaseAction_CodeAction_Fragment;

type Action_ApiAction_Fragment = (
  ApiActionFragment
  & BaseAction_ApiAction_Fragment
);

type Action_CodeAction_Fragment = (
  CodeActionFragment
  & BaseAction_CodeAction_Fragment
);

export type ActionFragment = Action_ApiAction_Fragment | Action_CodeAction_Fragment;

export type ApiActionFragment = (
  { successAction?: BaseAction_ApiAction_Fragment | BaseAction_CodeAction_Fragment | null, errorAction?: BaseAction_ApiAction_Fragment | BaseAction_CodeAction_Fragment | null, resource: ResourceFragment, config: { id: string, data: string } }
  & BaseAction_ApiAction_Fragment
);

export type CodeActionFragment = (
  { code: string }
  & BaseAction_CodeAction_Fragment
);

export type AppPreviewFragment = { id: string, name: string, slug: string, owner: OwnerFragment, pages: Array<{ id: string }> };

export type AppFragment = { id: string, name: string, slug: string, owner: OwnerFragment, pages: Array<PageFragment>, domains: Array<DomainFragment> };

export type PageBuilderAppFragment = { id: string, name: string, slug: string, owner: OwnerFragment, pages: Array<BuilderPageFragment> };

export type AtomFragment = { icon?: string | null, id: string, name: string, type: AtomType, externalCssSource?: string | null, externalJsSource?: string | null, externalSourceType?: string | null, owner: OwnerFragment, tags: Array<TagFragment>, api: InterfaceTypeFragment, suggestedChildren: Array<{ id: string, name: string, type: AtomType }>, requiredParents: Array<{ id: string, name: string, type: AtomType }> };

export type RenderAtomFragment = { icon?: string | null, id: string, name: string, type: AtomType };

export type RenderedComponentFragment = (
  { rootElement: (
    { descendantElements: Array<ElementFragment> }
    & ElementFragment
  ) }
  & ComponentFragment
);

export type ComponentFragment = { id: string, name: string, keyGenerator?: string | null, rootElement: { id: string, name: string }, owner: OwnerFragment, api: InterfaceTypeFragment, props: PropFragment, childrenContainerElement: { id: string }, store: StoreFragment };

export type DomainFragment = { id: string, name: string, app: { id: string }, domainConfig: { misconfigured: boolean }, projectDomain: { verified: boolean } };

export type ElementFragment = { __typename: 'Element', id: string, name: string, customCss?: string | null, guiCss?: string | null, renderForEachPropKey?: string | null, renderIfExpression?: string | null, propTransformationJs?: string | null, page?: { id: string } | null, renderComponentType?: { id: string } | null, renderAtomType?: AtomFragment | null, renderType?: { id: string, kind: RenderTypeKind } | null, prevSibling?: { id: string } | null, nextSibling?: { id: string } | null, parentComponent?: { id: string } | null, parent?: { id: string } | null, firstChild?: { id: string } | null, props: PropFragment, preRenderAction?: { id: string } | { id: string } | null, postRenderAction?: { id: string } | { id: string } | null };

export type HookPropFragment = { id: string, data: string };

export type HookFragment = { id: string, type: AtomType, config: HookPropFragment, element: { id: string, name: string } };

export type PageFragment = { id: string, name: string, slug: string, kind: PageKind, url: string, app: { id: string }, rootElement: (
    { descendantElements: Array<ElementFragment> }
    & ElementFragment
  ), pageContentContainer?: { id: string } | null, store: StoreFragment };

export type BuilderPageFragment = { id: string, name: string, slug: string, kind: PageKind, url: string, rootElement: (
    { descendantElements: Array<ElementFragment> }
    & ElementFragment
  ), app: { id: string }, store: StoreFragment, pageContentContainer?: { id: string } | null };

export type PropFragment = { id: string, data: string };

export type ResourceFragment = { id: string, name: string, type: ResourceType, config: PropFragment, owner: { id: string, auth0Id: string } };

export type StoreFragment = { id: string, name: string, api: InterfaceTypeFragment, component?: { id: string } | null, page?: { id: string } | null, actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment> };

export type TagFragment = { id: string, name: string, isRoot?: boolean | null, parent?: { id: string } | null, children: Array<{ id: string }>, descendants: Array<{ id: string }>, owner: OwnerFragment };

export type TagPreviewFragment = { id: string, name: string };

export type ActionTypeFragment = BaseType_ActionType_Fragment;

export type AppTypeFragment = BaseType_AppType_Fragment;

export type ArrayTypeFragment = (
  { itemType: { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } | { id: string, name: string, kind: TypeKind } }
  & BaseType_ArrayType_Fragment
);

type BaseType_ActionType_Fragment = { __typename: 'ActionType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_AppType_Fragment = { __typename: 'AppType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_ArrayType_Fragment = { __typename: 'ArrayType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_BaseType_Fragment = { __typename: 'BaseType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_CodeMirrorType_Fragment = { __typename: 'CodeMirrorType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_ElementType_Fragment = { __typename: 'ElementType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_EnumType_Fragment = { __typename: 'EnumType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_InterfaceType_Fragment = { __typename: 'InterfaceType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_LambdaType_Fragment = { __typename: 'LambdaType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_PageType_Fragment = { __typename: 'PageType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_PrimitiveType_Fragment = { __typename: 'PrimitiveType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_ReactNodeType_Fragment = { __typename: 'ReactNodeType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_RenderPropType_Fragment = { __typename: 'RenderPropType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

type BaseType_UnionType_Fragment = { __typename: 'UnionType', kind: TypeKind, id: string, name: string, owner: OwnerFragment };

export type BaseTypeFragment = BaseType_ActionType_Fragment | BaseType_AppType_Fragment | BaseType_ArrayType_Fragment | BaseType_BaseType_Fragment | BaseType_CodeMirrorType_Fragment | BaseType_ElementType_Fragment | BaseType_EnumType_Fragment | BaseType_InterfaceType_Fragment | BaseType_LambdaType_Fragment | BaseType_PageType_Fragment | BaseType_PrimitiveType_Fragment | BaseType_ReactNodeType_Fragment | BaseType_RenderPropType_Fragment | BaseType_UnionType_Fragment;

export type CodeMirrorTypeFragment = (
  { language: CodeMirrorLanguage }
  & BaseType_CodeMirrorType_Fragment
);

export type ElementTypeFragment = (
  { elementKind: ElementTypeKind }
  & BaseType_ElementType_Fragment
);

export type EnumTypeValueFragment = { id: string, key: string, value: string };

export type EnumTypeFragment = (
  { allowedValues: Array<EnumTypeValueFragment> }
  & BaseType_EnumType_Fragment
);

export type FieldFragment = { id: string, key: string, name?: string | null, description?: string | null, validationRules?: string | null, defaultValues?: string | null, prevSibling?: { id: string } | null, nextSibling?: { id: string } | null, fieldType: { __typename: 'ActionType', id: string, kind: TypeKind, name: string } | { __typename: 'AppType', id: string, kind: TypeKind, name: string } | { __typename: 'ArrayType', id: string, kind: TypeKind, name: string } | { __typename: 'BaseType', id: string, kind: TypeKind, name: string } | { __typename: 'CodeMirrorType', id: string, kind: TypeKind, name: string } | { __typename: 'ElementType', id: string, kind: TypeKind, name: string } | { __typename: 'EnumType', id: string, kind: TypeKind, name: string } | { __typename: 'InterfaceType', id: string, kind: TypeKind, name: string } | { __typename: 'LambdaType', id: string, kind: TypeKind, name: string } | { __typename: 'PageType', id: string, kind: TypeKind, name: string } | { __typename: 'PrimitiveType', id: string, kind: TypeKind, name: string } | { __typename: 'ReactNodeType', id: string, kind: TypeKind, name: string } | { __typename: 'RenderPropType', id: string, kind: TypeKind, name: string } | { __typename: 'UnionType', id: string, kind: TypeKind, name: string }, api: { id: string } };

export type InterfaceTypeFragment = (
  { fields: Array<FieldFragment> }
  & BaseType_InterfaceType_Fragment
);

export type LambdaTypeFragment = BaseType_LambdaType_Fragment;

export type PageTypeFragment = BaseType_PageType_Fragment;

export type PrimitiveTypeFragment = (
  { primitiveKind: PrimitiveTypeKind }
  & BaseType_PrimitiveType_Fragment
);

export type ReactNodeTypeFragment = BaseType_ReactNodeType_Fragment;

export type RenderPropTypeFragment = BaseType_RenderPropType_Fragment;

type Type_ActionType_Fragment = ActionTypeFragment;

type Type_AppType_Fragment = AppTypeFragment;

type Type_ArrayType_Fragment = ArrayTypeFragment;

type Type_BaseType_Fragment = {};

type Type_CodeMirrorType_Fragment = CodeMirrorTypeFragment;

type Type_ElementType_Fragment = ElementTypeFragment;

type Type_EnumType_Fragment = EnumTypeFragment;

type Type_InterfaceType_Fragment = InterfaceTypeFragment;

type Type_LambdaType_Fragment = LambdaTypeFragment;

type Type_PageType_Fragment = PageTypeFragment;

type Type_PrimitiveType_Fragment = PrimitiveTypeFragment;

type Type_ReactNodeType_Fragment = ReactNodeTypeFragment;

type Type_RenderPropType_Fragment = RenderPropTypeFragment;

type Type_UnionType_Fragment = UnionTypeFragment;

export type TypeFragment = Type_ActionType_Fragment | Type_AppType_Fragment | Type_ArrayType_Fragment | Type_BaseType_Fragment | Type_CodeMirrorType_Fragment | Type_ElementType_Fragment | Type_EnumType_Fragment | Type_InterfaceType_Fragment | Type_LambdaType_Fragment | Type_PageType_Fragment | Type_PrimitiveType_Fragment | Type_ReactNodeType_Fragment | Type_RenderPropType_Fragment | Type_UnionType_Fragment;

export type UnionTypeFragment = (
  { typesOfUnionType: Array<{ id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string }> }
  & BaseType_UnionType_Fragment
);

export type OwnerFragment = { auth0Id: string };

export type UserFragment = { id: string, username: string, email: string, auth0Id: string, roles?: Array<Role> | null, apps: Array<AppFragment> };

export type ResetDatabaseMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetDatabaseMutation = { resetDatabase?: { success?: boolean | null } | null };

export type CreateAppsMutationVariables = Exact<{
  input: Array<AppCreateInput> | AppCreateInput;
}>;


export type CreateAppsMutation = { createApps: { apps: Array<{ id: string }> } };

export type UpdateAppsMutationVariables = Exact<{
  where: AppWhere;
  update: AppUpdateInput;
}>;


export type UpdateAppsMutation = { updateApps: { apps: Array<{ id: string }> } };

export type DeleteAppsMutationVariables = Exact<{
  where: AppWhere;
  delete?: InputMaybe<AppDeleteInput>;
}>;


export type DeleteAppsMutation = { deleteApps: { nodesDeleted: number } };

export type GetAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>;
  where?: InputMaybe<AppWhere>;
}>;


export type GetAppsQuery = { aggregate: { count: number }, items: Array<AppFragment> };

export type CreateAtomsMutationVariables = Exact<{
  input: Array<AtomCreateInput> | AtomCreateInput;
}>;


export type CreateAtomsMutation = { createAtoms: { info: { nodesCreated: number, relationshipsCreated: number }, atoms: Array<{ id: string }> } };

export type DeleteAtomsMutationVariables = Exact<{
  where: AtomWhere;
}>;


export type DeleteAtomsMutation = { deleteAtoms: { nodesDeleted: number, relationshipsDeleted: number } };

export type GetAtomsQueryVariables = Exact<{
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
}>;


export type GetAtomsQuery = { aggregate: { count: number }, items: Array<AtomFragment> };

export type GetAtomOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAtomOptionsQuery = { atoms: Array<{ id: string, name: string, type: AtomType }> };

export type UpdateAtomsMutationVariables = Exact<{
  where?: InputMaybe<AtomWhere>;
  update?: InputMaybe<AtomUpdateInput>;
}>;


export type UpdateAtomsMutation = { updateAtoms: { atoms: Array<{ id: string }> } };

export type CreateComponentsMutationVariables = Exact<{
  input: Array<ComponentCreateInput> | ComponentCreateInput;
}>;


export type CreateComponentsMutation = { createComponents: { components: Array<{ id: string }> } };

export type DeleteComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
}>;


export type DeleteComponentsMutation = { deleteComponents: { nodesDeleted: number } };

export type UpdateComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>;
  update?: InputMaybe<ComponentUpdateInput>;
}>;


export type UpdateComponentsMutation = { updateComponents: { components: Array<{ id: string }> } };

export type GetComponentsQueryVariables = Exact<{
  options?: InputMaybe<ComponentOptions>;
  where?: InputMaybe<ComponentWhere>;
}>;


export type GetComponentsQuery = { aggregate: { count: number }, items: Array<RenderedComponentFragment> };

export type GetDomainsQueryVariables = Exact<{
  options?: InputMaybe<DomainOptions>;
  where?: InputMaybe<DomainWhere>;
}>;


export type GetDomainsQuery = { aggregate: { count: number }, items: Array<DomainFragment> };

export type CreateDomainsMutationVariables = Exact<{
  input: Array<DomainCreateInput> | DomainCreateInput;
}>;


export type CreateDomainsMutation = { createDomains: { domains: Array<{ id: string }> } };

export type UpdateDomainsMutationVariables = Exact<{
  where: DomainWhere;
  update: DomainUpdateInput;
}>;


export type UpdateDomainsMutation = { updateDomains: { domains: Array<{ id: string }> } };

export type DeleteDomainsMutationVariables = Exact<{
  where: DomainWhere;
}>;


export type DeleteDomainsMutation = { deleteDomains: { nodesDeleted: number } };

export type CreateElementsMutationVariables = Exact<{
  input: Array<ElementCreateInput> | ElementCreateInput;
}>;


export type CreateElementsMutation = { createElements: { elements: Array<{ id: string }> } };

export type DeleteElementsMutationVariables = Exact<{
  where: ElementWhere;
  delete?: InputMaybe<ElementDeleteInput>;
}>;


export type DeleteElementsMutation = { deleteElements: { nodesDeleted: number } };

export type UpdateElementsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>;
  update?: InputMaybe<ElementUpdateInput>;
}>;


export type UpdateElementsMutation = { updateElements: { elements: Array<{ id: string }> } };

export type GetElementsQueryVariables = Exact<{
  options?: InputMaybe<ElementOptions>;
  where?: InputMaybe<ElementWhere>;
}>;


export type GetElementsQuery = { aggregate: { count: number }, items: Array<ElementFragment> };

export type CreateHooksMutationVariables = Exact<{
  input: Array<HookCreateInput> | HookCreateInput;
}>;


export type CreateHooksMutation = { createHooks: { hooks: Array<HookFragment> } };

export type DeleteHooksMutationVariables = Exact<{
  where: HookWhere;
}>;


export type DeleteHooksMutation = { deleteHooks: { nodesDeleted: number } };

export type CreatePagesMutationVariables = Exact<{
  input: Array<PageCreateInput> | PageCreateInput;
}>;


export type CreatePagesMutation = { createPages: { pages: Array<{ id: string }> } };

export type DeletePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>;
  delete?: InputMaybe<PageDeleteInput>;
}>;


export type DeletePagesMutation = { deletePages: { nodesDeleted: number } };

export type UpdatePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>;
  update?: InputMaybe<PageUpdateInput>;
}>;


export type UpdatePagesMutation = { updatePages: { pages: Array<{ id: string }> } };

export type GetPagesQueryVariables = Exact<{
  options?: InputMaybe<PageOptions>;
  where?: InputMaybe<PageWhere>;
}>;


export type GetPagesQuery = { aggregate: { count: number }, items: Array<PageFragment> };

export type GetRenderedPageAndCommonAppDataQueryVariables = Exact<{
  appId: Scalars['ID']['input'];
  pageId: Scalars['ID']['input'];
}>;


export type GetRenderedPageAndCommonAppDataQuery = { apps: Array<PageBuilderAppFragment>, resources: Array<ResourceFragment> };

export type GetRenderedPageQueryVariables = Exact<{
  pageId: Scalars['ID']['input'];
}>;


export type GetRenderedPageQuery = { pages: Array<BuilderPageFragment> };

export type CreatePropsMutationVariables = Exact<{
  input: Array<PropCreateInput> | PropCreateInput;
}>;


export type CreatePropsMutation = { createProps: { props: Array<{ id: string }> } };

export type UpdatePropsMutationVariables = Exact<{
  where?: InputMaybe<PropWhere>;
  update?: InputMaybe<PropUpdateInput>;
}>;


export type UpdatePropsMutation = { updateProps: { props: Array<{ id: string }> } };

export type DeletePropsMutationVariables = Exact<{
  where: PropWhere;
}>;


export type DeletePropsMutation = { deleteProps: { nodesDeleted: number } };

export type GetPropsQueryVariables = Exact<{
  options?: InputMaybe<PropOptions>;
  where?: InputMaybe<PropWhere>;
}>;


export type GetPropsQuery = { aggregate: { count: number }, items: Array<PropFragment> };

export type GetResourcesQueryVariables = Exact<{
  options?: InputMaybe<ResourceOptions>;
  where?: InputMaybe<ResourceWhere>;
}>;


export type GetResourcesQuery = { aggregate: { count: number }, items: Array<ResourceFragment> };

export type CreateResourcesMutationVariables = Exact<{
  input: Array<ResourceCreateInput> | ResourceCreateInput;
}>;


export type CreateResourcesMutation = { createResources: { resources: Array<{ id: string }> } };

export type UpdateResourceMutationVariables = Exact<{
  where?: InputMaybe<ResourceWhere>;
  update?: InputMaybe<ResourceUpdateInput>;
}>;


export type UpdateResourceMutation = { updateResources: { resources: Array<{ id: string }> } };

export type DeleteResourcesMutationVariables = Exact<{
  where?: InputMaybe<ResourceWhere>;
}>;


export type DeleteResourcesMutation = { deleteResources: { nodesDeleted: number } };

export type CreateCodeActionsMutationVariables = Exact<{
  input: Array<CodeActionCreateInput> | CodeActionCreateInput;
}>;


export type CreateCodeActionsMutation = { createCodeActions: { codeActions: Array<{ id: string }> } };

export type CreateApiActionsMutationVariables = Exact<{
  input: Array<ApiActionCreateInput> | ApiActionCreateInput;
}>;


export type CreateApiActionsMutation = { createApiActions: { apiActions: Array<{ id: string }> } };

export type DeleteCodeActionsMutationVariables = Exact<{
  where: CodeActionWhere;
  delete?: InputMaybe<CodeActionDeleteInput>;
}>;


export type DeleteCodeActionsMutation = { deleteCodeActions: { nodesDeleted: number, relationshipsDeleted: number } };

export type DeleteApiActionsMutationVariables = Exact<{
  where: ApiActionWhere;
  delete?: InputMaybe<ApiActionDeleteInput>;
}>;


export type DeleteApiActionsMutation = { deleteApiActions: { nodesDeleted: number, relationshipsDeleted: number } };

export type GetActionsQueryVariables = Exact<{
  codeActionWhere?: InputMaybe<CodeActionWhere>;
  apiActionWhere?: InputMaybe<ApiActionWhere>;
}>;


export type GetActionsQuery = { codeActions: Array<Action_CodeAction_Fragment>, apiActions: Array<Action_ApiAction_Fragment> };

export type CreateStoresMutationVariables = Exact<{
  input: Array<StoreCreateInput> | StoreCreateInput;
}>;


export type CreateStoresMutation = { createStores: { info: { nodesCreated: number, relationshipsCreated: number }, stores: Array<{ id: string }> } };

export type DeleteStoresMutationVariables = Exact<{
  where?: InputMaybe<StoreWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
}>;


export type DeleteStoresMutation = { deleteStores: { nodesDeleted: number } };

export type GetStoresQueryVariables = Exact<{
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
}>;


export type GetStoresQuery = { aggregate: { count: number }, items: Array<StoreFragment> };

export type UpdateStoresMutationVariables = Exact<{
  where?: InputMaybe<StoreWhere>;
  update?: InputMaybe<StoreUpdateInput>;
}>;


export type UpdateStoresMutation = { updateStores: { stores: Array<{ id: string }> } };

export type UpdateCodeActionsMutationVariables = Exact<{
  connect?: InputMaybe<CodeActionConnectInput>;
  create?: InputMaybe<CodeActionRelationInput>;
  delete?: InputMaybe<CodeActionDeleteInput>;
  disconnect?: InputMaybe<CodeActionDisconnectInput>;
  update?: InputMaybe<CodeActionUpdateInput>;
  where?: InputMaybe<CodeActionWhere>;
}>;


export type UpdateCodeActionsMutation = { updateCodeActions: { codeActions: Array<{ id: string }> } };

export type UpdateApiActionsMutationVariables = Exact<{
  connect?: InputMaybe<ApiActionConnectInput>;
  create?: InputMaybe<ApiActionRelationInput>;
  delete?: InputMaybe<ApiActionDeleteInput>;
  disconnect?: InputMaybe<ApiActionDisconnectInput>;
  update?: InputMaybe<ApiActionUpdateInput>;
  where?: InputMaybe<ApiActionWhere>;
}>;


export type UpdateApiActionsMutation = { updateApiActions: { apiActions: Array<{ id: string }> } };

export type CreateTagsMutationVariables = Exact<{
  input: Array<TagCreateInput> | TagCreateInput;
}>;


export type CreateTagsMutation = { createTags: { tags: Array<{ id: string }> } };

export type UpdateTagsMutationVariables = Exact<{
  where: TagWhere;
  update: TagUpdateInput;
}>;


export type UpdateTagsMutation = { updateTags: { tags: Array<{ id: string }> } };

export type DeleteTagsMutationVariables = Exact<{
  where: TagWhere;
}>;


export type DeleteTagsMutation = { deleteTags: { nodesDeleted: number } };

export type GetTagsQueryVariables = Exact<{
  options?: InputMaybe<TagOptions>;
  where?: InputMaybe<TagWhere>;
}>;


export type GetTagsQuery = { aggregate: { count: number }, items: Array<TagFragment> };

export type CreatePrimitiveTypesMutationVariables = Exact<{
  input: Array<PrimitiveTypeCreateInput> | PrimitiveTypeCreateInput;
}>;


export type CreatePrimitiveTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateArrayTypesMutationVariables = Exact<{
  input: Array<ArrayTypeCreateInput> | ArrayTypeCreateInput;
}>;


export type CreateArrayTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateUnionTypesMutationVariables = Exact<{
  input: Array<UnionTypeCreateInput> | UnionTypeCreateInput;
}>;


export type CreateUnionTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateInterfaceTypesMutationVariables = Exact<{
  input: Array<InterfaceTypeCreateInput> | InterfaceTypeCreateInput;
}>;


export type CreateInterfaceTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateElementTypesMutationVariables = Exact<{
  input: Array<ElementTypeCreateInput> | ElementTypeCreateInput;
}>;


export type CreateElementTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateRenderPropTypesMutationVariables = Exact<{
  input: Array<RenderPropTypeCreateInput> | RenderPropTypeCreateInput;
}>;


export type CreateRenderPropTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateReactNodeTypesMutationVariables = Exact<{
  input: Array<ReactNodeTypeCreateInput> | ReactNodeTypeCreateInput;
}>;


export type CreateReactNodeTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateEnumTypesMutationVariables = Exact<{
  input: Array<EnumTypeCreateInput> | EnumTypeCreateInput;
}>;


export type CreateEnumTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateLambdaTypesMutationVariables = Exact<{
  input: Array<LambdaTypeCreateInput> | LambdaTypeCreateInput;
}>;


export type CreateLambdaTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreatePageTypesMutationVariables = Exact<{
  input: Array<PageTypeCreateInput> | PageTypeCreateInput;
}>;


export type CreatePageTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateAppTypesMutationVariables = Exact<{
  input: Array<AppTypeCreateInput> | AppTypeCreateInput;
}>;


export type CreateAppTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateActionTypesMutationVariables = Exact<{
  input: Array<ActionTypeCreateInput> | ActionTypeCreateInput;
}>;


export type CreateActionTypesMutation = { types: { types: Array<{ id: string }> } };

export type CreateCodeMirrorTypesMutationVariables = Exact<{
  input: Array<CodeMirrorTypeCreateInput> | CodeMirrorTypeCreateInput;
}>;


export type CreateCodeMirrorTypesMutation = { types: { types: Array<{ id: string }> } };

export type DeletePrimitiveTypesMutationVariables = Exact<{
  delete?: InputMaybe<PrimitiveTypeDeleteInput>;
  where?: InputMaybe<PrimitiveTypeWhere>;
}>;


export type DeletePrimitiveTypesMutation = { deletePrimitiveTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteArrayTypesMutationVariables = Exact<{
  delete?: InputMaybe<ArrayTypeDeleteInput>;
  where?: InputMaybe<ArrayTypeWhere>;
}>;


export type DeleteArrayTypesMutation = { deleteArrayTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteReactNodeTypesMutationVariables = Exact<{
  delete?: InputMaybe<ReactNodeTypeDeleteInput>;
  where?: InputMaybe<ReactNodeTypeWhere>;
}>;


export type DeleteReactNodeTypesMutation = { deleteReactNodeTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteUnionTypesMutationVariables = Exact<{
  delete?: InputMaybe<UnionTypeDeleteInput>;
  where?: InputMaybe<UnionTypeWhere>;
}>;


export type DeleteUnionTypesMutation = { deleteUnionTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteInterfaceTypesMutationVariables = Exact<{
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
  where?: InputMaybe<InterfaceTypeWhere>;
}>;


export type DeleteInterfaceTypesMutation = { deleteInterfaceTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteElementTypesMutationVariables = Exact<{
  delete?: InputMaybe<ElementTypeDeleteInput>;
  where?: InputMaybe<ElementTypeWhere>;
}>;


export type DeleteElementTypesMutation = { deleteElementTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteRenderPropTypesMutationVariables = Exact<{
  delete?: InputMaybe<RenderPropTypeDeleteInput>;
  where?: InputMaybe<RenderPropTypeWhere>;
}>;


export type DeleteRenderPropTypesMutation = { deleteRenderPropTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteEnumTypesMutationVariables = Exact<{
  delete?: InputMaybe<EnumTypeDeleteInput>;
  where?: InputMaybe<EnumTypeWhere>;
}>;


export type DeleteEnumTypesMutation = { deleteEnumTypes: { relationshipsDeleted: number, nodesDeleted: number }, deleteEnumTypeValues: { nodesDeleted: number } };

export type DeleteLambdaTypesMutationVariables = Exact<{
  delete?: InputMaybe<LambdaTypeDeleteInput>;
  where?: InputMaybe<LambdaTypeWhere>;
}>;


export type DeleteLambdaTypesMutation = { deleteLambdaTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeletePageTypesMutationVariables = Exact<{
  delete?: InputMaybe<PageTypeDeleteInput>;
  where?: InputMaybe<PageTypeWhere>;
}>;


export type DeletePageTypesMutation = { deletePageTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteAppTypesMutationVariables = Exact<{
  delete?: InputMaybe<AppTypeDeleteInput>;
  where?: InputMaybe<AppTypeWhere>;
}>;


export type DeleteAppTypesMutation = { deleteAppTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteActionTypesMutationVariables = Exact<{
  delete?: InputMaybe<ActionTypeDeleteInput>;
  where?: InputMaybe<ActionTypeWhere>;
}>;


export type DeleteActionTypesMutation = { deleteActionTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteCodeMirrorTypesMutationVariables = Exact<{
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>;
  where?: InputMaybe<CodeMirrorTypeWhere>;
}>;


export type DeleteCodeMirrorTypesMutation = { deleteCodeMirrorTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type CreateFieldsMutationVariables = Exact<{
  input: Array<FieldCreateInput> | FieldCreateInput;
}>;


export type CreateFieldsMutation = { createFields: { fields: Array<{ id: string }> } };

export type UpdateFieldsMutationVariables = Exact<{
  where: FieldWhere;
  update: FieldUpdateInput;
}>;


export type UpdateFieldsMutation = { updateFields: { fields: Array<{ id: string }> } };

export type DeleteFieldsMutationVariables = Exact<{
  where: FieldWhere;
}>;


export type DeleteFieldsMutation = { deleteFields: { nodesDeleted: number } };

export type GetFieldsQueryVariables = Exact<{
  where?: InputMaybe<FieldWhere>;
  options?: InputMaybe<FieldOptions>;
}>;


export type GetFieldsQuery = { aggregate: { count: number }, items: Array<FieldFragment> };

export type GetBaseTypesQueryVariables = Exact<{
  options?: InputMaybe<GetBaseTypesOptions>;
}>;


export type GetBaseTypesQuery = { baseTypes: { totalCount: number, items: Array<BaseType_BaseType_Fragment> } };

export type GetTypesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetTypesQuery = { primitiveTypes: Array<Type_PrimitiveType_Fragment>, arrayTypes: Array<Type_ArrayType_Fragment>, unionTypes: Array<Type_UnionType_Fragment>, interfaceTypes: Array<Type_InterfaceType_Fragment>, elementTypes: Array<Type_ElementType_Fragment>, renderPropTypes: Array<Type_RenderPropType_Fragment>, reactNodeTypes: Array<Type_ReactNodeType_Fragment>, enumTypes: Array<Type_EnumType_Fragment>, lambdaTypes: Array<Type_LambdaType_Fragment>, pageTypes: Array<Type_PageType_Fragment>, appTypes: Array<Type_AppType_Fragment>, actionTypes: Array<Type_ActionType_Fragment>, codeMirrorTypes: Array<Type_CodeMirrorType_Fragment> };

export type GetDescendantsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetDescendantsQuery = { arrayTypes: Array<{ descendantTypesIds: Array<string> }>, unionTypes: Array<{ descendantTypesIds: Array<string> }>, interfaceTypes: Array<{ descendantTypesIds: Array<string> }> };

export type GetPrimitiveTypesQueryVariables = Exact<{
  options?: InputMaybe<PrimitiveTypeOptions>;
  where?: InputMaybe<PrimitiveTypeWhere>;
}>;


export type GetPrimitiveTypesQuery = { types: Array<Type_PrimitiveType_Fragment> };

export type GetArrayTypesQueryVariables = Exact<{
  options?: InputMaybe<ArrayTypeOptions>;
  where?: InputMaybe<ArrayTypeWhere>;
}>;


export type GetArrayTypesQuery = { types: Array<Type_ArrayType_Fragment> };

export type GetUnionTypesQueryVariables = Exact<{
  options?: InputMaybe<UnionTypeOptions>;
  where?: InputMaybe<UnionTypeWhere>;
}>;


export type GetUnionTypesQuery = { types: Array<Type_UnionType_Fragment> };

export type GetInterfaceTypesQueryVariables = Exact<{
  options?: InputMaybe<InterfaceTypeOptions>;
  where?: InputMaybe<InterfaceTypeWhere>;
}>;


export type GetInterfaceTypesQuery = { types: Array<Type_InterfaceType_Fragment> };

export type GetElementTypesQueryVariables = Exact<{
  options?: InputMaybe<ElementTypeOptions>;
  where?: InputMaybe<ElementTypeWhere>;
}>;


export type GetElementTypesQuery = { types: Array<Type_ElementType_Fragment> };

export type GetRenderPropTypesQueryVariables = Exact<{
  options?: InputMaybe<RenderPropTypeOptions>;
  where?: InputMaybe<RenderPropTypeWhere>;
}>;


export type GetRenderPropTypesQuery = { types: Array<Type_RenderPropType_Fragment> };

export type GetReactNodeTypesQueryVariables = Exact<{
  options?: InputMaybe<ReactNodeTypeOptions>;
  where?: InputMaybe<ReactNodeTypeWhere>;
}>;


export type GetReactNodeTypesQuery = { types: Array<ReactNodeTypeFragment> };

export type GetEnumTypesQueryVariables = Exact<{
  options?: InputMaybe<EnumTypeOptions>;
  where?: InputMaybe<EnumTypeWhere>;
}>;


export type GetEnumTypesQuery = { types: Array<Type_EnumType_Fragment> };

export type GetLambdaTypesQueryVariables = Exact<{
  options?: InputMaybe<LambdaTypeOptions>;
  where?: InputMaybe<LambdaTypeWhere>;
}>;


export type GetLambdaTypesQuery = { types: Array<Type_LambdaType_Fragment> };

export type GetPageTypesQueryVariables = Exact<{
  options?: InputMaybe<PageTypeOptions>;
  where?: InputMaybe<PageTypeWhere>;
}>;


export type GetPageTypesQuery = { types: Array<Type_PageType_Fragment> };

export type GetAppTypesQueryVariables = Exact<{
  options?: InputMaybe<AppTypeOptions>;
  where?: InputMaybe<AppTypeWhere>;
}>;


export type GetAppTypesQuery = { types: Array<Type_AppType_Fragment> };

export type GetActionTypesQueryVariables = Exact<{
  options?: InputMaybe<ActionTypeOptions>;
  where?: InputMaybe<ActionTypeWhere>;
}>;


export type GetActionTypesQuery = { types: Array<Type_ActionType_Fragment> };

export type GetCodeMirrorTypesQueryVariables = Exact<{
  options?: InputMaybe<CodeMirrorTypeOptions>;
  where?: InputMaybe<CodeMirrorTypeWhere>;
}>;


export type GetCodeMirrorTypesQuery = { types: Array<Type_CodeMirrorType_Fragment> };

export type GetTypeOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTypeOptionsQuery = { baseTypes: { items: Array<{ id: string, name: string, kind: TypeKind }> } };

export type InterfaceForm_GetAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>;
  where?: InputMaybe<AppWhere>;
}>;


export type InterfaceForm_GetAppsQuery = { apps: Array<{ id: string, name: string }> };

export type InterfaceForm_GetAtomsQueryVariables = Exact<{
  options?: InputMaybe<AtomOptions>;
  where?: InputMaybe<AtomWhere>;
}>;


export type InterfaceForm_GetAtomsQuery = { atoms: Array<{ id: string, name: string, type: AtomType }> };

export type InterfaceForm_GetActionsQueryVariables = Exact<{
  appId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type InterfaceForm_GetActionsQuery = { codeActions: Array<{ id: string, name: string }>, apiActions: Array<{ id: string, name: string }> };

export type InterfaceForm_GetStoresQueryVariables = Exact<{
  options?: InputMaybe<StoreOptions>;
  where?: InputMaybe<StoreWhere>;
}>;


export type InterfaceForm_GetStoresQuery = { stores: Array<{ id: string, name: string }> };

export type InterfaceForm_GetResourceQueryVariables = Exact<{
  options?: InputMaybe<ResourceOptions>;
  where?: InputMaybe<ResourceWhere>;
}>;


export type InterfaceForm_GetResourceQuery = { resources: Array<{ id: string, name: string }> };

export type InterfaceForm_GetPagesQueryVariables = Exact<{
  options?: InputMaybe<PageOptions>;
  where?: InputMaybe<PageWhere>;
}>;


export type InterfaceForm_GetPagesQuery = { pages: Array<{ id: string, name: string }> };

export type IsTypeDescendantOfQueryVariables = Exact<{
  descendantTypeId: Scalars['ID']['input'];
  parentTypeId: Scalars['ID']['input'];
}>;


export type IsTypeDescendantOfQuery = { isTypeDescendantOf?: boolean | null };

export type GetTypeReferencesQueryVariables = Exact<{
  typeId: Scalars['ID']['input'];
}>;


export type GetTypeReferencesQuery = { getTypeReferences?: Array<{ name: string, label: string }> | null };

export type UpdatePrimitiveTypesMutationVariables = Exact<{
  connect?: InputMaybe<PrimitiveTypeConnectInput>;
  create?: InputMaybe<PrimitiveTypeRelationInput>;
  delete?: InputMaybe<PrimitiveTypeDeleteInput>;
  disconnect?: InputMaybe<PrimitiveTypeDisconnectInput>;
  update?: InputMaybe<PrimitiveTypeUpdateInput>;
  where?: InputMaybe<PrimitiveTypeWhere>;
}>;


export type UpdatePrimitiveTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateArrayTypesMutationVariables = Exact<{
  connect?: InputMaybe<ArrayTypeConnectInput>;
  create?: InputMaybe<ArrayTypeRelationInput>;
  delete?: InputMaybe<ArrayTypeDeleteInput>;
  disconnect?: InputMaybe<ArrayTypeDisconnectInput>;
  update?: InputMaybe<ArrayTypeUpdateInput>;
  where?: InputMaybe<ArrayTypeWhere>;
}>;


export type UpdateArrayTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateUnionTypesMutationVariables = Exact<{
  connect?: InputMaybe<UnionTypeConnectInput>;
  create?: InputMaybe<UnionTypeRelationInput>;
  delete?: InputMaybe<UnionTypeDeleteInput>;
  disconnect?: InputMaybe<UnionTypeDisconnectInput>;
  update?: InputMaybe<UnionTypeUpdateInput>;
  where?: InputMaybe<UnionTypeWhere>;
}>;


export type UpdateUnionTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateInterfaceTypesMutationVariables = Exact<{
  connect?: InputMaybe<InterfaceTypeConnectInput>;
  create?: InputMaybe<InterfaceTypeRelationInput>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
  update?: InputMaybe<InterfaceTypeUpdateInput>;
  where?: InputMaybe<InterfaceTypeWhere>;
}>;


export type UpdateInterfaceTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateReactNodeTypesMutationVariables = Exact<{
  connect?: InputMaybe<ReactNodeTypeConnectInput>;
  create?: InputMaybe<ReactNodeTypeRelationInput>;
  delete?: InputMaybe<ReactNodeTypeDeleteInput>;
  disconnect?: InputMaybe<ReactNodeTypeDisconnectInput>;
  update?: InputMaybe<ReactNodeTypeUpdateInput>;
  where?: InputMaybe<ReactNodeTypeWhere>;
}>;


export type UpdateReactNodeTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateElementTypesMutationVariables = Exact<{
  connect?: InputMaybe<ElementTypeConnectInput>;
  create?: InputMaybe<ElementTypeRelationInput>;
  delete?: InputMaybe<ElementTypeDeleteInput>;
  disconnect?: InputMaybe<ElementTypeDisconnectInput>;
  update?: InputMaybe<ElementTypeUpdateInput>;
  where?: InputMaybe<ElementTypeWhere>;
}>;


export type UpdateElementTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateRenderPropTypesMutationVariables = Exact<{
  connect?: InputMaybe<RenderPropTypeConnectInput>;
  create?: InputMaybe<RenderPropTypeRelationInput>;
  delete?: InputMaybe<RenderPropTypeDeleteInput>;
  disconnect?: InputMaybe<RenderPropTypeDisconnectInput>;
  update?: InputMaybe<RenderPropTypeUpdateInput>;
  where?: InputMaybe<RenderPropTypeWhere>;
}>;


export type UpdateRenderPropTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateEnumTypesMutationVariables = Exact<{
  connect?: InputMaybe<EnumTypeConnectInput>;
  create?: InputMaybe<EnumTypeRelationInput>;
  delete?: InputMaybe<EnumTypeDeleteInput>;
  disconnect?: InputMaybe<EnumTypeDisconnectInput>;
  update?: InputMaybe<EnumTypeUpdateInput>;
  where?: InputMaybe<EnumTypeWhere>;
}>;


export type UpdateEnumTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateLambdaTypesMutationVariables = Exact<{
  connect?: InputMaybe<LambdaTypeConnectInput>;
  create?: InputMaybe<LambdaTypeRelationInput>;
  delete?: InputMaybe<LambdaTypeDeleteInput>;
  disconnect?: InputMaybe<LambdaTypeDisconnectInput>;
  update?: InputMaybe<LambdaTypeUpdateInput>;
  where?: InputMaybe<LambdaTypeWhere>;
}>;


export type UpdateLambdaTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdatePageTypesMutationVariables = Exact<{
  connect?: InputMaybe<PageTypeConnectInput>;
  create?: InputMaybe<PageTypeRelationInput>;
  delete?: InputMaybe<PageTypeDeleteInput>;
  disconnect?: InputMaybe<PageTypeDisconnectInput>;
  update?: InputMaybe<PageTypeUpdateInput>;
  where?: InputMaybe<PageTypeWhere>;
}>;


export type UpdatePageTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateAppTypesMutationVariables = Exact<{
  connect?: InputMaybe<AppTypeConnectInput>;
  create?: InputMaybe<AppTypeRelationInput>;
  delete?: InputMaybe<AppTypeDeleteInput>;
  disconnect?: InputMaybe<AppTypeDisconnectInput>;
  update?: InputMaybe<AppTypeUpdateInput>;
  where?: InputMaybe<AppTypeWhere>;
}>;


export type UpdateAppTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateActionTypesMutationVariables = Exact<{
  connect?: InputMaybe<ActionTypeConnectInput>;
  create?: InputMaybe<ActionTypeRelationInput>;
  delete?: InputMaybe<ActionTypeDeleteInput>;
  disconnect?: InputMaybe<ActionTypeDisconnectInput>;
  update?: InputMaybe<ActionTypeUpdateInput>;
  where?: InputMaybe<ActionTypeWhere>;
}>;


export type UpdateActionTypesMutation = { types: { types: Array<{ id: string }> } };

export type UpdateCodeMirrorTypesMutationVariables = Exact<{
  connect?: InputMaybe<CodeMirrorTypeConnectInput>;
  create?: InputMaybe<CodeMirrorTypeRelationInput>;
  delete?: InputMaybe<CodeMirrorTypeDeleteInput>;
  disconnect?: InputMaybe<CodeMirrorTypeDisconnectInput>;
  update?: InputMaybe<CodeMirrorTypeUpdateInput>;
  where?: InputMaybe<CodeMirrorTypeWhere>;
}>;


export type UpdateCodeMirrorTypesMutation = { types: { types: Array<{ id: string }> } };

export type GetUsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhere>;
}>;


export type GetUsersQuery = { users: Array<UserFragment> };

export type CreateUserMutationVariables = Exact<{
  input: Array<UserCreateInput> | UserCreateInput;
}>;


export type CreateUserMutation = { createUsers: { users: Array<{ id: string, email: string }> } };
