import type { SelectionSetNode, DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
};

export type Query = {
  __typename?: "Query";
  elementGraph: ElementGraph;
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>;
  resetDatabaseMutationResponsesAggregate: ResetDatabaseMutationResponseAggregateSelection;
  resetDatabaseMutationResponsesConnection: ResetDatabaseMutationResponsesConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
  apps: Array<App>;
  appsAggregate: AppAggregateSelection;
  appsConnection: AppsConnection;
  atoms: Array<Atom>;
  atomsAggregate: AtomAggregateSelection;
  atomsConnection: AtomsConnection;
  createInfos: Array<CreateInfo>;
  createInfosAggregate: CreateInfoAggregateSelection;
  createInfosConnection: CreateInfosConnection;
  pages: Array<Page>;
  pagesAggregate: PageAggregateSelection;
  pagesConnection: PagesConnection;
  typeReferences: Array<TypeReference>;
  typeReferencesAggregate: TypeReferenceAggregateSelection;
  typeReferencesConnection: TypeReferencesConnection;
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
  renderPropsTypes: Array<RenderPropsType>;
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection;
  renderPropsTypesConnection: RenderPropsTypesConnection;
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
  tagGraphOptions: Array<TagGraphOptions>;
  tagGraphOptionsAggregate: TagGraphOptionsAggregateSelection;
  tagGraphOptionsConnection: TagGraphOptionsConnection;
  tagGraphs: Array<TagGraph>;
  tagGraphsAggregate: TagGraphAggregateSelection;
  tagGraphsConnection: TagGraphsConnection;
  elementGraphs: Array<ElementGraph>;
  elementGraphsAggregate: ElementGraphAggregateSelection;
  elementGraphsConnection: ElementGraphsConnection;
  elements: Array<Element>;
  elementsAggregate: ElementAggregateSelection;
  elementsConnection: ElementsConnection;
  props: Array<Prop>;
  propsAggregate: PropAggregateSelection;
  propsConnection: PropsConnection;
  propMapBindings: Array<PropMapBinding>;
  propMapBindingsAggregate: PropMapBindingAggregateSelection;
  propMapBindingsConnection: PropMapBindingsConnection;
  hooks: Array<Hook>;
  hooksAggregate: HookAggregateSelection;
  hooksConnection: HooksConnection;
  components: Array<Component>;
  componentsAggregate: ComponentAggregateSelection;
  componentsConnection: ComponentsConnection;
  stores: Array<Store>;
  storesAggregate: StoreAggregateSelection;
  storesConnection: StoresConnection;
  customActions: Array<CustomAction>;
  customActionsAggregate: CustomActionAggregateSelection;
  customActionsConnection: CustomActionsConnection;
  resourceActions: Array<ResourceAction>;
  resourceActionsAggregate: ResourceActionAggregateSelection;
  resourceActionsConnection: ResourceActionsConnection;
  pipelineActions: Array<PipelineAction>;
  pipelineActionsAggregate: PipelineActionAggregateSelection;
  pipelineActionsConnection: PipelineActionsConnection;
  resources: Array<Resource>;
  resourcesAggregate: ResourceAggregateSelection;
  resourcesConnection: ResourcesConnection;
  vercelDomainConfigData: Array<VercelDomainConfigData>;
  vercelDomainConfigDataAggregate: VercelDomainConfigDataAggregateSelection;
  vercelDomainConfigDataConnection: VercelDomainConfigDataConnection;
  vercelProjectDomainData: Array<VercelProjectDomainData>;
  vercelProjectDomainDataAggregate: VercelProjectDomainDataAggregateSelection;
  vercelProjectDomainDataConnection: VercelProjectDomainDataConnection;
  domains: Array<Domain>;
  domainsAggregate: DomainAggregateSelection;
  domainsConnection: DomainsConnection;
  deleteInfos: Array<DeleteInfo>;
  deleteInfosAggregate: DeleteInfoAggregateSelection;
  deleteInfosConnection: DeleteInfosConnection;
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars["Boolean"]>;
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>;
};

export type QueryElementGraphArgs = {
  input: ElementGraphInput;
};

export type QueryResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>;
  options?: InputMaybe<ResetDatabaseMutationResponseOptions>;
};

export type QueryResetDatabaseMutationResponsesAggregateArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>;
};

export type QueryResetDatabaseMutationResponsesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>;
  sort?: InputMaybe<Array<InputMaybe<ResetDatabaseMutationResponseSort>>>;
};

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
};

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};

export type QueryUsersConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<AppWhere>;
  sort?: InputMaybe<Array<InputMaybe<AppSort>>>;
};

export type QueryAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
};

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
};

export type QueryAtomsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<AtomWhere>;
  sort?: InputMaybe<Array<InputMaybe<AtomSort>>>;
};

export type QueryCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>;
  options?: InputMaybe<CreateInfoOptions>;
};

export type QueryCreateInfosAggregateArgs = {
  where?: InputMaybe<CreateInfoWhere>;
};

export type QueryCreateInfosConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<CreateInfoWhere>;
  sort?: InputMaybe<Array<InputMaybe<CreateInfoSort>>>;
};

export type QueryPagesArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
};

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>;
};

export type QueryPagesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TypeReferenceWhere>;
  sort?: InputMaybe<Array<InputMaybe<TypeReferenceSort>>>;
};

export type QueryPrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
  options?: InputMaybe<PrimitiveTypeOptions>;
};

export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>;
};

export type QueryPrimitiveTypesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ElementTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<ElementTypeSort>>>;
};

export type QueryRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>;
  options?: InputMaybe<RenderPropsTypeOptions>;
};

export type QueryRenderPropsTypesAggregateArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>;
};

export type QueryRenderPropsTypesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<RenderPropsTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<RenderPropsTypeSort>>>;
};

export type QueryReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
  options?: InputMaybe<ReactNodeTypeOptions>;
};

export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>;
};

export type QueryReactNodeTypesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TagWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>;
};

export type QueryTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>;
  options?: InputMaybe<TagGraphOptionsOptions>;
};

export type QueryTagGraphOptionsAggregateArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>;
};

export type QueryTagGraphOptionsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TagGraphOptionsWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagGraphOptionsSort>>>;
};

export type QueryTagGraphsAggregateArgs = {
  where?: InputMaybe<TagGraphWhere>;
};

export type QueryTagGraphsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TagGraphWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagGraphSort>>>;
};

export type QueryElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>;
  options?: InputMaybe<ElementGraphOptions>;
};

export type QueryElementGraphsAggregateArgs = {
  where?: InputMaybe<ElementGraphWhere>;
};

export type QueryElementGraphsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ElementGraphWhere>;
  sort?: InputMaybe<Array<InputMaybe<ElementGraphSort>>>;
};

export type QueryElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
};

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
};

export type QueryElementsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<PropWhere>;
  sort?: InputMaybe<Array<InputMaybe<PropSort>>>;
};

export type QueryPropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
  options?: InputMaybe<PropMapBindingOptions>;
};

export type QueryPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
};

export type QueryPropMapBindingsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<PropMapBindingWhere>;
  sort?: InputMaybe<Array<InputMaybe<PropMapBindingSort>>>;
};

export type QueryHooksArgs = {
  where?: InputMaybe<HookWhere>;
  options?: InputMaybe<HookOptions>;
};

export type QueryHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>;
};

export type QueryHooksConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<StoreWhere>;
  sort?: InputMaybe<Array<InputMaybe<StoreSort>>>;
};

export type QueryCustomActionsArgs = {
  where?: InputMaybe<CustomActionWhere>;
  options?: InputMaybe<CustomActionOptions>;
};

export type QueryCustomActionsAggregateArgs = {
  where?: InputMaybe<CustomActionWhere>;
};

export type QueryCustomActionsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<CustomActionWhere>;
  sort?: InputMaybe<Array<InputMaybe<CustomActionSort>>>;
};

export type QueryResourceActionsArgs = {
  where?: InputMaybe<ResourceActionWhere>;
  options?: InputMaybe<ResourceActionOptions>;
};

export type QueryResourceActionsAggregateArgs = {
  where?: InputMaybe<ResourceActionWhere>;
};

export type QueryResourceActionsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ResourceActionWhere>;
  sort?: InputMaybe<Array<InputMaybe<ResourceActionSort>>>;
};

export type QueryPipelineActionsArgs = {
  where?: InputMaybe<PipelineActionWhere>;
  options?: InputMaybe<PipelineActionOptions>;
};

export type QueryPipelineActionsAggregateArgs = {
  where?: InputMaybe<PipelineActionWhere>;
};

export type QueryPipelineActionsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<PipelineActionWhere>;
  sort?: InputMaybe<Array<InputMaybe<PipelineActionSort>>>;
};

export type QueryResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
};

export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
};

export type QueryResourcesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ResourceWhere>;
  sort?: InputMaybe<Array<InputMaybe<ResourceSort>>>;
};

export type QueryVercelDomainConfigDataArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>;
  options?: InputMaybe<VercelDomainConfigDataOptions>;
};

export type QueryVercelDomainConfigDataAggregateArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>;
};

export type QueryVercelDomainConfigDataConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<VercelDomainConfigDataWhere>;
  sort?: InputMaybe<Array<InputMaybe<VercelDomainConfigDataSort>>>;
};

export type QueryVercelProjectDomainDataArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>;
  options?: InputMaybe<VercelProjectDomainDataOptions>;
};

export type QueryVercelProjectDomainDataAggregateArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>;
};

export type QueryVercelProjectDomainDataConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<VercelProjectDomainDataWhere>;
  sort?: InputMaybe<Array<InputMaybe<VercelProjectDomainDataSort>>>;
};

export type QueryDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  options?: InputMaybe<DomainOptions>;
};

export type QueryDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>;
};

export type QueryDomainsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<DomainWhere>;
  sort?: InputMaybe<Array<InputMaybe<DomainSort>>>;
};

export type QueryDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>;
  options?: InputMaybe<DeleteInfoOptions>;
};

export type QueryDeleteInfosAggregateArgs = {
  where?: InputMaybe<DeleteInfoWhere>;
};

export type QueryDeleteInfosConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<DeleteInfoWhere>;
  sort?: InputMaybe<Array<InputMaybe<DeleteInfoSort>>>;
};

export type QueryIsTypeDescendantOfArgs = {
  parentTypeId: Scalars["ID"];
  descendantTypeId: Scalars["ID"];
};

export type QueryGetTypeReferencesArgs = {
  typeId: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  upsertField: InterfaceType;
  createDomain: Domain;
  updateDomain: Domain;
  deleteDomain: DeleteInfo;
  createResetDatabaseMutationResponses: CreateResetDatabaseMutationResponsesMutationResponse;
  deleteResetDatabaseMutationResponses: DeleteInfo;
  updateResetDatabaseMutationResponses: UpdateResetDatabaseMutationResponsesMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteUsers: DeleteInfo;
  updateUsers: UpdateUsersMutationResponse;
  createApps: CreateAppsMutationResponse;
  deleteApps: DeleteInfo;
  updateApps: UpdateAppsMutationResponse;
  createAtoms: CreateAtomsMutationResponse;
  deleteAtoms: DeleteInfo;
  updateAtoms: UpdateAtomsMutationResponse;
  createCreateInfos: CreateCreateInfosMutationResponse;
  deleteCreateInfos: DeleteInfo;
  updateCreateInfos: UpdateCreateInfosMutationResponse;
  createPages: CreatePagesMutationResponse;
  deletePages: DeleteInfo;
  updatePages: UpdatePagesMutationResponse;
  createTypeReferences: CreateTypeReferencesMutationResponse;
  deleteTypeReferences: DeleteInfo;
  updateTypeReferences: UpdateTypeReferencesMutationResponse;
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
  createRenderPropsTypes: CreateRenderPropsTypesMutationResponse;
  deleteRenderPropsTypes: DeleteInfo;
  updateRenderPropsTypes: UpdateRenderPropsTypesMutationResponse;
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
  createTagGraphOptions: CreateTagGraphOptionsMutationResponse;
  deleteTagGraphOptions: DeleteInfo;
  updateTagGraphOptions: UpdateTagGraphOptionsMutationResponse;
  createTagGraphs: CreateTagGraphsMutationResponse;
  deleteTagGraphs: DeleteInfo;
  updateTagGraphs: UpdateTagGraphsMutationResponse;
  createElementGraphs: CreateElementGraphsMutationResponse;
  deleteElementGraphs: DeleteInfo;
  updateElementGraphs: UpdateElementGraphsMutationResponse;
  createElements: CreateElementsMutationResponse;
  deleteElements: DeleteInfo;
  updateElements: UpdateElementsMutationResponse;
  createProps: CreatePropsMutationResponse;
  deleteProps: DeleteInfo;
  updateProps: UpdatePropsMutationResponse;
  createPropMapBindings: CreatePropMapBindingsMutationResponse;
  deletePropMapBindings: DeleteInfo;
  updatePropMapBindings: UpdatePropMapBindingsMutationResponse;
  createHooks: CreateHooksMutationResponse;
  deleteHooks: DeleteInfo;
  updateHooks: UpdateHooksMutationResponse;
  createComponents: CreateComponentsMutationResponse;
  deleteComponents: DeleteInfo;
  updateComponents: UpdateComponentsMutationResponse;
  createStores: CreateStoresMutationResponse;
  deleteStores: DeleteInfo;
  updateStores: UpdateStoresMutationResponse;
  createCustomActions: CreateCustomActionsMutationResponse;
  deleteCustomActions: DeleteInfo;
  updateCustomActions: UpdateCustomActionsMutationResponse;
  createResourceActions: CreateResourceActionsMutationResponse;
  deleteResourceActions: DeleteInfo;
  updateResourceActions: UpdateResourceActionsMutationResponse;
  createPipelineActions: CreatePipelineActionsMutationResponse;
  deletePipelineActions: DeleteInfo;
  updatePipelineActions: UpdatePipelineActionsMutationResponse;
  createResources: CreateResourcesMutationResponse;
  deleteResources: DeleteInfo;
  updateResources: UpdateResourcesMutationResponse;
  createVercelDomainConfigData: CreateVercelDomainConfigDataMutationResponse;
  deleteVercelDomainConfigData: DeleteInfo;
  updateVercelDomainConfigData: UpdateVercelDomainConfigDataMutationResponse;
  createVercelProjectDomainData: CreateVercelProjectDomainDataMutationResponse;
  deleteVercelProjectDomainData: DeleteInfo;
  updateVercelProjectDomainData: UpdateVercelProjectDomainDataMutationResponse;
  createDomains: CreateDomainsMutationResponse;
  deleteDomains: DeleteInfo;
  updateDomains: UpdateDomainsMutationResponse;
  createDeleteInfos: CreateDeleteInfosMutationResponse;
  deleteDeleteInfos: DeleteInfo;
  updateDeleteInfos: UpdateDeleteInfosMutationResponse;
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>;
};

export type MutationUpsertFieldArgs = {
  interfaceTypeId: Scalars["ID"];
  fieldTypeId: Scalars["ID"];
  field: FieldCreateInput;
};

export type MutationCreateDomainArgs = {
  input?: InputMaybe<CreateDomainMutationInput>;
};

export type MutationUpdateDomainArgs = {
  input?: InputMaybe<UpdateDomainMutationInput>;
};

export type MutationDeleteDomainArgs = {
  id: Scalars["String"];
};

export type MutationCreateResetDatabaseMutationResponsesArgs = {
  input: Array<ResetDatabaseMutationResponseCreateInput>;
};

export type MutationDeleteResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>;
};

export type MutationUpdateResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>;
  update?: InputMaybe<ResetDatabaseMutationResponseUpdateInput>;
};

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};

export type MutationDeleteUsersArgs = {
  where?: InputMaybe<UserWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};

export type MutationUpdateUsersArgs = {
  where?: InputMaybe<UserWhere>;
  update?: InputMaybe<UserUpdateInput>;
  connect?: InputMaybe<UserConnectInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
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

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>;
};

export type MutationDeleteCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>;
};

export type MutationUpdateCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>;
  update?: InputMaybe<CreateInfoUpdateInput>;
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

export type MutationCreateRenderPropsTypesArgs = {
  input: Array<RenderPropsTypeCreateInput>;
};

export type MutationDeleteRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>;
  delete?: InputMaybe<RenderPropsTypeDeleteInput>;
};

export type MutationUpdateRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>;
  update?: InputMaybe<RenderPropsTypeUpdateInput>;
  connect?: InputMaybe<RenderPropsTypeConnectInput>;
  disconnect?: InputMaybe<RenderPropsTypeDisconnectInput>;
  create?: InputMaybe<RenderPropsTypeRelationInput>;
  delete?: InputMaybe<RenderPropsTypeDeleteInput>;
  connectOrCreate?: InputMaybe<RenderPropsTypeConnectOrCreateInput>;
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

export type MutationCreateTagGraphOptionsArgs = {
  input: Array<TagGraphOptionsCreateInput>;
};

export type MutationDeleteTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>;
};

export type MutationUpdateTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>;
  update?: InputMaybe<TagGraphOptionsUpdateInput>;
};

export type MutationCreateTagGraphsArgs = {
  input: Array<TagGraphCreateInput>;
};

export type MutationDeleteTagGraphsArgs = {
  where?: InputMaybe<TagGraphWhere>;
};

export type MutationUpdateTagGraphsArgs = {
  where?: InputMaybe<TagGraphWhere>;
  update?: InputMaybe<TagGraphUpdateInput>;
};

export type MutationCreateElementGraphsArgs = {
  input: Array<ElementGraphCreateInput>;
};

export type MutationDeleteElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>;
};

export type MutationUpdateElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>;
  update?: InputMaybe<ElementGraphUpdateInput>;
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

export type MutationCreatePropMapBindingsArgs = {
  input: Array<PropMapBindingCreateInput>;
};

export type MutationDeletePropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
  delete?: InputMaybe<PropMapBindingDeleteInput>;
};

export type MutationUpdatePropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
  update?: InputMaybe<PropMapBindingUpdateInput>;
  connect?: InputMaybe<PropMapBindingConnectInput>;
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>;
  create?: InputMaybe<PropMapBindingRelationInput>;
  delete?: InputMaybe<PropMapBindingDeleteInput>;
  connectOrCreate?: InputMaybe<PropMapBindingConnectOrCreateInput>;
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

export type MutationCreateCustomActionsArgs = {
  input: Array<CustomActionCreateInput>;
};

export type MutationDeleteCustomActionsArgs = {
  where?: InputMaybe<CustomActionWhere>;
  delete?: InputMaybe<CustomActionDeleteInput>;
};

export type MutationUpdateCustomActionsArgs = {
  where?: InputMaybe<CustomActionWhere>;
  update?: InputMaybe<CustomActionUpdateInput>;
  connect?: InputMaybe<CustomActionConnectInput>;
  disconnect?: InputMaybe<CustomActionDisconnectInput>;
  create?: InputMaybe<CustomActionRelationInput>;
  delete?: InputMaybe<CustomActionDeleteInput>;
  connectOrCreate?: InputMaybe<CustomActionConnectOrCreateInput>;
};

export type MutationCreateResourceActionsArgs = {
  input: Array<ResourceActionCreateInput>;
};

export type MutationDeleteResourceActionsArgs = {
  where?: InputMaybe<ResourceActionWhere>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
};

export type MutationUpdateResourceActionsArgs = {
  where?: InputMaybe<ResourceActionWhere>;
  update?: InputMaybe<ResourceActionUpdateInput>;
  connect?: InputMaybe<ResourceActionConnectInput>;
  disconnect?: InputMaybe<ResourceActionDisconnectInput>;
  create?: InputMaybe<ResourceActionRelationInput>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
  connectOrCreate?: InputMaybe<ResourceActionConnectOrCreateInput>;
};

export type MutationCreatePipelineActionsArgs = {
  input: Array<PipelineActionCreateInput>;
};

export type MutationDeletePipelineActionsArgs = {
  where?: InputMaybe<PipelineActionWhere>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
};

export type MutationUpdatePipelineActionsArgs = {
  where?: InputMaybe<PipelineActionWhere>;
  update?: InputMaybe<PipelineActionUpdateInput>;
  connect?: InputMaybe<PipelineActionConnectInput>;
  disconnect?: InputMaybe<PipelineActionDisconnectInput>;
  create?: InputMaybe<PipelineActionRelationInput>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
  connectOrCreate?: InputMaybe<PipelineActionConnectOrCreateInput>;
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

export type MutationCreateVercelDomainConfigDataArgs = {
  input: Array<VercelDomainConfigDataCreateInput>;
};

export type MutationDeleteVercelDomainConfigDataArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>;
};

export type MutationUpdateVercelDomainConfigDataArgs = {
  where?: InputMaybe<VercelDomainConfigDataWhere>;
  update?: InputMaybe<VercelDomainConfigDataUpdateInput>;
};

export type MutationCreateVercelProjectDomainDataArgs = {
  input: Array<VercelProjectDomainDataCreateInput>;
};

export type MutationDeleteVercelProjectDomainDataArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>;
};

export type MutationUpdateVercelProjectDomainDataArgs = {
  where?: InputMaybe<VercelProjectDomainDataWhere>;
  update?: InputMaybe<VercelProjectDomainDataUpdateInput>;
};

export type MutationCreateDomainsArgs = {
  input: Array<DomainCreateInput>;
};

export type MutationDeleteDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  delete?: InputMaybe<DomainDeleteInput>;
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

export type MutationCreateDeleteInfosArgs = {
  input: Array<DeleteInfoCreateInput>;
};

export type MutationDeleteDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>;
};

export type MutationUpdateDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>;
  update?: InputMaybe<DeleteInfoUpdateInput>;
};

export enum ActionKind {
  /** Action with custom code */
  CustomAction = "CustomAction",
  /** Action responsible for fetching data from a resource */
  ResourceAction = "ResourceAction",
  /** Represents a list of actions that runs in a certain order */
  PipelineAction = "PipelineAction",
}

export enum AtomType {
  HookQueryLambda = "HookQueryLambda",
  HookQueryConfig = "HookQueryConfig",
  HookGraphqlQuery = "HookGraphqlQuery",
  HookGraphqlMutation = "HookGraphqlMutation",
  HookRecoilState = "HookRecoilState",
  HookQueryPage = "HookQueryPage",
  HookQueryPages = "HookQueryPages",
  HookRouter = "HookRouter",
  AntDesignAffix = "AntDesignAffix",
  AntDesignAlert = "AntDesignAlert",
  AntDesignAnchor = "AntDesignAnchor",
  AntDesignAnchorLink = "AntDesignAnchorLink",
  AntDesignAutoComplete = "AntDesignAutoComplete",
  AntDesignAvatar = "AntDesignAvatar",
  AntDesignBackTop = "AntDesignBackTop",
  AntDesignBadge = "AntDesignBadge",
  AntDesignBreadcrumb = "AntDesignBreadcrumb",
  AntDesignBreadcrumbItem = "AntDesignBreadcrumbItem",
  AntDesignButton = "AntDesignButton",
  AntDesignCalendar = "AntDesignCalendar",
  AntDesignCard = "AntDesignCard",
  AntDesignCardGrid = "AntDesignCardGrid",
  AntDesignCardMeta = "AntDesignCardMeta",
  AntDesignCarousel = "AntDesignCarousel",
  AntDesignCascader = "AntDesignCascader",
  AntDesignCheckbox = "AntDesignCheckbox",
  AntDesignCollapse = "AntDesignCollapse",
  AntDesignCollapsePanel = "AntDesignCollapsePanel",
  AntDesignComment = "AntDesignComment",
  AntDesignConfigProvider = "AntDesignConfigProvider",
  AntDesignDatePicker = "AntDesignDatePicker",
  AntDesignDescriptions = "AntDesignDescriptions",
  AntDesignDescriptionsItem = "AntDesignDescriptionsItem",
  AntDesignDivider = "AntDesignDivider",
  AntDesignDrawer = "AntDesignDrawer",
  AntDesignDropdown = "AntDesignDropdown",
  AntDesignEmpty = "AntDesignEmpty",
  AntDesignForm = "AntDesignForm",
  AntDesignFormItem = "AntDesignFormItem",
  AntDesignFormItemHook = "AntDesignFormItemHook",
  AntDesignFormList = "AntDesignFormList",
  AntDesignGridCol = "AntDesignGridCol",
  AntDesignGridRow = "AntDesignGridRow",
  AntDesignIcon = "AntDesignIcon",
  AntDesignInput = "AntDesignInput",
  AntDesignInputNumber = "AntDesignInputNumber",
  AntDesignLayout = "AntDesignLayout",
  AntDesignLayoutContent = "AntDesignLayoutContent",
  AntDesignLayoutFooter = "AntDesignLayoutFooter",
  AntDesignLayoutHeader = "AntDesignLayoutHeader",
  AntDesignLayoutSider = "AntDesignLayoutSider",
  AntDesignList = "AntDesignList",
  AntDesignListItem = "AntDesignListItem",
  AntDesignListItemMeta = "AntDesignListItemMeta",
  AntDesignMapper = "AntDesignMapper",
  AntDesignMentions = "AntDesignMentions",
  AntDesignMentionsOption = "AntDesignMentionsOption",
  AntDesignMenu = "AntDesignMenu",
  AntDesignMenuItem = "AntDesignMenuItem",
  AntDesignMenuItemGroup = "AntDesignMenuItemGroup",
  AntDesignMenuSubMenu = "AntDesignMenuSubMenu",
  AntDesignModal = "AntDesignModal",
  AntDesignPageHeader = "AntDesignPageHeader",
  AntDesignPageContainer = "AntDesignPageContainer",
  AntDesignPagination = "AntDesignPagination",
  AntDesignPopconfirm = "AntDesignPopconfirm",
  AntDesignPopover = "AntDesignPopover",
  AntDesignProgress = "AntDesignProgress",
  AntDesignProvider = "AntDesignProvider",
  AntDesignRglContainer = "AntDesignRglContainer",
  AntDesignRglItem = "AntDesignRglItem",
  AntDesignRglResponsiveContainer = "AntDesignRglResponsiveContainer",
  AntDesignRadio = "AntDesignRadio",
  AntDesignRadioGroup = "AntDesignRadioGroup",
  AntDesignRate = "AntDesignRate",
  AntDesignRenderComponent = "AntDesignRenderComponent",
  AntDesignRenderContainer = "AntDesignRenderContainer",
  AntDesignResult = "AntDesignResult",
  AntDesignSelect = "AntDesignSelect",
  AntDesignSelectOption = "AntDesignSelectOption",
  AntDesignSkeleton = "AntDesignSkeleton",
  AntDesignSlider = "AntDesignSlider",
  AntDesignSpace = "AntDesignSpace",
  AntDesignSpin = "AntDesignSpin",
  AntDesignStatistic = "AntDesignStatistic",
  AntDesignSteps = "AntDesignSteps",
  AntDesignStepsStep = "AntDesignStepsStep",
  AntDesignSwitch = "AntDesignSwitch",
  AntDesignTable = "AntDesignTable",
  AntDesignTabs = "AntDesignTabs",
  AntDesignTabsTabPane = "AntDesignTabsTabPane",
  AntDesignTag = "AntDesignTag",
  AntDesignTimePicker = "AntDesignTimePicker",
  AntDesignTimeline = "AntDesignTimeline",
  AntDesignTimelineItem = "AntDesignTimelineItem",
  AntDesignTooltip = "AntDesignTooltip",
  AntDesignTransfer = "AntDesignTransfer",
  AntDesignTree = "AntDesignTree",
  AntDesignTreeNode = "AntDesignTreeNode",
  AntDesignTreeSelect = "AntDesignTreeSelect",
  AntDesignTypography = "AntDesignTypography",
  AntDesignTypographyParagraph = "AntDesignTypographyParagraph",
  AntDesignTypographyText = "AntDesignTypographyText",
  AntDesignTypographyTitle = "AntDesignTypographyTitle",
  AntDesignUpload = "AntDesignUpload",
  AntDesignImage = "AntDesignImage",
  MuiAccordion = "MuiAccordion",
  MuiAccordionActions = "MuiAccordionActions",
  MuiAccordionDetails = "MuiAccordionDetails",
  MuiAccordionSummary = "MuiAccordionSummary",
  MuiAlert = "MuiAlert",
  MuiAlertTitle = "MuiAlertTitle",
  MuiAppBar = "MuiAppBar",
  MuiAutocomplete = "MuiAutocomplete",
  MuiAvatar = "MuiAvatar",
  MuiAvatarGroup = "MuiAvatarGroup",
  MuiBackdrop = "MuiBackdrop",
  MuiBadge = "MuiBadge",
  MuiBadgeUnstyled = "MuiBadgeUnstyled",
  MuiBottomNavigation = "MuiBottomNavigation",
  MuiBottomNavigationAction = "MuiBottomNavigationAction",
  MuiBox = "MuiBox",
  MuiBreadcrumbs = "MuiBreadcrumbs",
  MuiButton = "MuiButton",
  MuiButtonBase = "MuiButtonBase",
  MuiButtonGroup = "MuiButtonGroup",
  MuiButtonUnstyled = "MuiButtonUnstyled",
  MuiCalendarPicker = "MuiCalendarPicker",
  MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton",
  MuiCard = "MuiCard",
  MuiCardActionArea = "MuiCardActionArea",
  MuiCardActions = "MuiCardActions",
  MuiCardContent = "MuiCardContent",
  MuiCardHeader = "MuiCardHeader",
  MuiCardMedia = "MuiCardMedia",
  MuiCheckbox = "MuiCheckbox",
  MuiChip = "MuiChip",
  MuiCircularProgress = "MuiCircularProgress",
  MuiClickAwayListener = "MuiClickAwayListener",
  MuiClockPicker = "MuiClockPicker",
  MuiCollapse = "MuiCollapse",
  MuiContainer = "MuiContainer",
  MuiCssBaseline = "MuiCssBaseline",
  MuiDataGrid = "MuiDataGrid",
  MuiGridColDef = "MuiGridColDef",
  MuiDatePicker = "MuiDatePicker",
  MuiDateRangePicker = "MuiDateRangePicker",
  MuiDateRangePickerDay = "MuiDateRangePickerDay",
  MuiDateTimePicker = "MuiDateTimePicker",
  MuiDesktopDatePicker = "MuiDesktopDatePicker",
  MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker",
  MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker",
  MuiDesktopTimePicker = "MuiDesktopTimePicker",
  MuiDialog = "MuiDialog",
  MuiDialogActions = "MuiDialogActions",
  MuiDialogContent = "MuiDialogContent",
  MuiDialogContentText = "MuiDialogContentText",
  MuiDialogTitle = "MuiDialogTitle",
  MuiDivider = "MuiDivider",
  MuiDrawer = "MuiDrawer",
  MuiFab = "MuiFab",
  MuiFade = "MuiFade",
  MuiFilledInput = "MuiFilledInput",
  MuiFormControl = "MuiFormControl",
  MuiFormControlLabel = "MuiFormControlLabel",
  MuiFormControlUnstyled = "MuiFormControlUnstyled",
  MuiFormGroup = "MuiFormGroup",
  MuiFormHelperText = "MuiFormHelperText",
  MuiFormLabel = "MuiFormLabel",
  MuiGlobalStyles = "MuiGlobalStyles",
  MuiGrid = "MuiGrid",
  MuiGrow = "MuiGrow",
  MuiHidden = "MuiHidden",
  MuiIcon = "MuiIcon",
  MuiIconButton = "MuiIconButton",
  MuiImageList = "MuiImageList",
  MuiImageListItem = "MuiImageListItem",
  MuiImageListItemBar = "MuiImageListItemBar",
  MuiInput = "MuiInput",
  MuiInputAdornment = "MuiInputAdornment",
  MuiInputBase = "MuiInputBase",
  MuiInputLabel = "MuiInputLabel",
  MuiLinearProgress = "MuiLinearProgress",
  MuiLink = "MuiLink",
  MuiList = "MuiList",
  MuiListItem = "MuiListItem",
  MuiListItemAvatar = "MuiListItemAvatar",
  MuiListItemButton = "MuiListItemButton",
  MuiListItemIcon = "MuiListItemIcon",
  MuiListItemSecondaryAction = "MuiListItemSecondaryAction",
  MuiListItemText = "MuiListItemText",
  MuiListSubheader = "MuiListSubheader",
  MuiLoadingButton = "MuiLoadingButton",
  MuiMasonry = "MuiMasonry",
  MuiMasonryItem = "MuiMasonryItem",
  MuiMenu = "MuiMenu",
  MuiMenuItem = "MuiMenuItem",
  MuiMenuList = "MuiMenuList",
  MuiMobileDatePicker = "MuiMobileDatePicker",
  MuiMobileDateRangePicker = "MuiMobileDateRangePicker",
  MuiMobileDateTimePicker = "MuiMobileDateTimePicker",
  MuiMobileStepper = "MuiMobileStepper",
  MuiMobileTimePicker = "MuiMobileTimePicker",
  MuiModal = "MuiModal",
  MuiModalUnstyled = "MuiModalUnstyled",
  MuiMonthPicker = "MuiMonthPicker",
  MuiNativeSelect = "MuiNativeSelect",
  MuiNoSsr = "MuiNoSsr",
  MuiOutlinedInput = "MuiOutlinedInput",
  MuiPagination = "MuiPagination",
  MuiPaginationItem = "MuiPaginationItem",
  MuiPaper = "MuiPaper",
  MuiPickersDay = "MuiPickersDay",
  MuiPopover = "MuiPopover",
  MuiPopper = "MuiPopper",
  MuiPortal = "MuiPortal",
  MuiRadio = "MuiRadio",
  MuiRadioGroup = "MuiRadioGroup",
  MuiRating = "MuiRating",
  MuiScopedCssBaseline = "MuiScopedCssBaseline",
  MuiSelect = "MuiSelect",
  MuiSkeleton = "MuiSkeleton",
  MuiSlide = "MuiSlide",
  MuiSlider = "MuiSlider",
  MuiSliderUnstyled = "MuiSliderUnstyled",
  MuiSnackbar = "MuiSnackbar",
  MuiSnackbarContent = "MuiSnackbarContent",
  MuiSpeedDial = "MuiSpeedDial",
  MuiSpeedDialAction = "MuiSpeedDialAction",
  MuiSpeedDialIcon = "MuiSpeedDialIcon",
  MuiStack = "MuiStack",
  MuiStaticDatePicker = "MuiStaticDatePicker",
  MuiStaticDateRangePicker = "MuiStaticDateRangePicker",
  MuiStaticDateTimePicker = "MuiStaticDateTimePicker",
  MuiStaticTimePicker = "MuiStaticTimePicker",
  MuiStep = "MuiStep",
  MuiStepButton = "MuiStepButton",
  MuiStepConnector = "MuiStepConnector",
  MuiStepContent = "MuiStepContent",
  MuiStepIcon = "MuiStepIcon",
  MuiStepLabel = "MuiStepLabel",
  MuiStepper = "MuiStepper",
  MuiSvgIcon = "MuiSvgIcon",
  MuiSwipeableDrawer = "MuiSwipeableDrawer",
  MuiSwitch = "MuiSwitch",
  MuiSwitchUnstyled = "MuiSwitchUnstyled",
  MuiTab = "MuiTab",
  MuiTabContext = "MuiTabContext",
  MuiTabList = "MuiTabList",
  MuiTabPanel = "MuiTabPanel",
  MuiTabScrollButton = "MuiTabScrollButton",
  MuiTable = "MuiTable",
  MuiTableBody = "MuiTableBody",
  MuiTableCell = "MuiTableCell",
  MuiTableContainer = "MuiTableContainer",
  MuiTableFooter = "MuiTableFooter",
  MuiTableHead = "MuiTableHead",
  MuiTablePagination = "MuiTablePagination",
  MuiTableRow = "MuiTableRow",
  MuiTableSortLabel = "MuiTableSortLabel",
  MuiTabs = "MuiTabs",
  MuiTextField = "MuiTextField",
  MuiTextareaAutosize = "MuiTextareaAutosize",
  MuiTimePicker = "MuiTimePicker",
  MuiTimeline = "MuiTimeline",
  MuiTimelineConnector = "MuiTimelineConnector",
  MuiTimelineContent = "MuiTimelineContent",
  MuiTimelineDot = "MuiTimelineDot",
  MuiTimelineItem = "MuiTimelineItem",
  MuiTimelineOppositeContent = "MuiTimelineOppositeContent",
  MuiTimelineSeparator = "MuiTimelineSeparator",
  MuiToggleButton = "MuiToggleButton",
  MuiToggleButtonGroup = "MuiToggleButtonGroup",
  MuiToolbar = "MuiToolbar",
  MuiTooltip = "MuiTooltip",
  MuiTreeItem = "MuiTreeItem",
  MuiTreeView = "MuiTreeView",
  MuiTypography = "MuiTypography",
  MuiUnstableTrapFocus = "MuiUnstableTrapFocus",
  MuiYearPicker = "MuiYearPicker",
  MuiZoom = "MuiZoom",
  Query = "Query",
  TextList = "TextList",
  Text = "Text",
  Script = "Script",
  State = "State",
  ReactFragment = "ReactFragment",
  HtmlA = "HtmlA",
  HtmlP = "HtmlP",
  HtmlVideo = "HtmlVideo",
  HtmlUList = "HtmlUList",
  HtmlTrack = "HtmlTrack",
  HtmlTitle = "HtmlTitle",
  HtmlTime = "HtmlTime",
  HtmlTextarea = "HtmlTextarea",
  HtmlTemplate = "HtmlTemplate",
  HtmlTableRow = "HtmlTableRow",
  HtmlTable = "HtmlTable",
  HtmlTableCol = "HtmlTableCol",
  HtmlTableCell = "HtmlTableCell",
  HtmlTableCaption = "HtmlTableCaption",
  HtmlStyle = "HtmlStyle",
  HtmlSpan = "HtmlSpan",
  HtmlSource = "HtmlSource",
  HtmlSelect = "HtmlSelect",
  HtmlQuote = "HtmlQuote",
  HtmlProgress = "HtmlProgress",
  HtmlPre = "HtmlPre",
  HtmlPicture = "HtmlPicture",
  HtmlParam = "HtmlParam",
  HtmlOutput = "HtmlOutput",
  HtmlOption = "HtmlOption",
  HtmlOptgroup = "HtmlOptgroup",
  HtmlObject = "HtmlObject",
  HtmlOList = "HtmlOList",
  HtmlMeter = "HtmlMeter",
  HtmlMeta = "HtmlMeta",
  HtmlMap = "HtmlMap",
  HtmlLink = "HtmlLink",
  HtmlLegend = "HtmlLegend",
  HtmlLabel = "HtmlLabel",
  HtmlLi = "HtmlLi",
  HtmlInput = "HtmlInput",
  HtmlImage = "HtmlImage",
  HtmlIframe = "HtmlIframe",
  HtmlH1 = "HtmlH1",
  HtmlH2 = "HtmlH2",
  HtmlH3 = "HtmlH3",
  HtmlH4 = "HtmlH4",
  HtmlH5 = "HtmlH5",
  HtmlH6 = "HtmlH6",
  HtmlHead = "HtmlHead",
  HtmlHr = "HtmlHr",
  HtmlFrameset = "HtmlFrameset",
  HtmlFrame = "HtmlFrame",
  HtmlForm = "HtmlForm",
  HtmlFont = "HtmlFont",
  HtmlFieldset = "HtmlFieldset",
  HtmlEmbed = "HtmlEmbed",
  HtmlDiv = "HtmlDiv",
  HtmlDialog = "HtmlDialog",
  HtmlDetails = "HtmlDetails",
  HtmlDatalist = "HtmlDatalist",
  HtmlData = "HtmlData",
  HtmlDList = "HtmlDList",
  HtmlCanvas = "HtmlCanvas",
  HtmlButton = "HtmlButton",
  HtmlBase = "HtmlBase",
  HtmlBr = "HtmlBr",
  HtmlAudio = "HtmlAudio",
  HtmlArea = "HtmlArea",
  HtmlFooter = "HtmlFooter",
  HtmlAside = "HtmlAside",
  HtmlHeader = "HtmlHeader",
  HtmlMain = "HtmlMain",
  HtmlNav = "HtmlNav",
  HtmlSection = "HtmlSection",
  HtmlCode = "HtmlCode",
  HtmlEm = "HtmlEm",
  HtmlI = "HtmlI",
  HtmlS = "HtmlS",
  HtmlSmall = "HtmlSmall",
  HtmlStrong = "HtmlStrong",
  HtmlSub = "HtmlSub",
  HtmlSup = "HtmlSup",
}

export enum CodeMirrorLanguage {
  Typescript = "Typescript",
  Javascript = "Javascript",
  Css = "Css",
  Json = "Json",
  Graphql = "Graphql",
  CssInJs = "CssInJs",
}

export enum ElementTypeKind {
  /** Pick any element in the current tree */
  AllElements = "AllElements",
  /** Pick any element from the descendants of the current element */
  DescendantsOnly = "DescendantsOnly",
  /** Pick any element from the children of the current element */
  ChildrenOnly = "ChildrenOnly",
  /** Pick parents and siblings of parents of elements (used to move element) */
  ExcludeDescendantsElements = "ExcludeDescendantsElements",
}

export enum PrimitiveTypeKind {
  String = "String",
  Integer = "Integer",
  Float = "Float",
  Boolean = "Boolean",
}

export enum ResourceType {
  GraphQl = "GraphQL",
  Rest = "Rest",
}

export enum Role {
  User = "User",
  Admin = "Admin",
}

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export enum TypeKind {
  PrimitiveType = "PrimitiveType",
  EnumType = "EnumType",
  ArrayType = "ArrayType",
  InterfaceType = "InterfaceType",
  LambdaType = "LambdaType",
  ElementType = "ElementType",
  RenderPropsType = "RenderPropsType",
  ReactNodeType = "ReactNodeType",
  UnionType = "UnionType",
  CodeMirrorType = "CodeMirrorType",
  PageType = "PageType",
  AppType = "AppType",
  ActionType = "ActionType",
}

export type AnyAction = PipelineAction | ResourceAction | CustomAction;

export type ActionBase = {
  store: Store;
  storeConnection: ActionBaseStoreConnection;
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit: Scalars["Boolean"];
  type: ActionKind;
};

export type ActionsPipeLine = {
  orders?: Maybe<Array<Scalars["String"]>>;
};

export type Field = {
  id: Scalars["ID"];
  key: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type ParentOfElement = {
  order?: Maybe<Scalars["Int"]>;
};

export type TypeBase = {
  owner: User;
  ownerConnection: TypeBaseOwnerConnection;
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
};

export type TypeBaseOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TypeBaseOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type WithDescendants = {
  descendantTypesIds: Array<Scalars["ID"]>;
};

export type WithOwner = {
  owner: User;
  ownerConnection: WithOwnerOwnerConnection;
};

export type ActionBaseStoreConnection = {
  __typename?: "ActionBaseStoreConnection";
  edges: Array<ActionBaseStoreRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ActionBaseStoreRelationship = {
  __typename?: "ActionBaseStoreRelationship";
  cursor: Scalars["String"];
  node: Store;
};

/** Allows picking a action from the list of actions */
export type ActionType = TypeBase & {
  __typename?: "ActionType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<ActionTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a action from the list of actions */
export type ActionTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type ActionTypeAggregateSelection = {
  __typename?: "ActionTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ActionTypeEdge = {
  __typename?: "ActionTypeEdge";
  cursor: Scalars["String"];
  node: ActionType;
};

export type ActionTypesConnection = {
  __typename?: "ActionTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ActionTypeEdge>;
};

export type ActionTypeUserOwnerAggregationSelection = {
  __typename?: "ActionTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ActionTypeUserOwnerNodeAggregateSelection>;
};

export type ActionTypeUserOwnerNodeAggregateSelection = {
  __typename?: "ActionTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type App = WithOwner & {
  __typename?: "App";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  owner: User;
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>;
  pages: Array<Page>;
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>;
  store: Store;
  storeAggregate?: Maybe<AppStoreStoreAggregationSelection>;
  domains: Array<Domain>;
  domainsAggregate?: Maybe<AppDomainDomainsAggregationSelection>;
  ownerConnection: WithOwnerOwnerConnection;
  pagesConnection: AppPagesConnection;
  storeConnection: AppStoreConnection;
  domainsConnection: AppDomainsConnection;
};

export type AppOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppPagesArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppDomainsArgs = {
  where?: InputMaybe<DomainWhere>;
  options?: InputMaybe<DomainOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppDomainsAggregateArgs = {
  where?: InputMaybe<DomainWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AppOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};

export type AppPagesConnectionArgs = {
  where?: InputMaybe<AppPagesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<AppPagesConnectionSort>>;
};

export type AppStoreConnectionArgs = {
  where?: InputMaybe<AppStoreConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<AppStoreConnectionSort>>;
};

export type AppDomainsConnectionArgs = {
  where?: InputMaybe<AppDomainsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<AppDomainsConnectionSort>>;
};

export type AppAggregateSelection = {
  __typename?: "AppAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type AppDomainDomainsAggregationSelection = {
  __typename?: "AppDomainDomainsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AppDomainDomainsNodeAggregateSelection>;
};

export type AppDomainDomainsNodeAggregateSelection = {
  __typename?: "AppDomainDomainsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AppDomainsConnection = {
  __typename?: "AppDomainsConnection";
  edges: Array<AppDomainsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type AppDomainsRelationship = {
  __typename?: "AppDomainsRelationship";
  cursor: Scalars["String"];
  node: Domain;
};

export type AppEdge = {
  __typename?: "AppEdge";
  cursor: Scalars["String"];
  node: App;
};

export type AppPagePagesAggregationSelection = {
  __typename?: "AppPagePagesAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AppPagePagesNodeAggregateSelection>;
};

export type AppPagePagesNodeAggregateSelection = {
  __typename?: "AppPagePagesNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type AppPagesConnection = {
  __typename?: "AppPagesConnection";
  edges: Array<AppPagesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type AppPagesRelationship = {
  __typename?: "AppPagesRelationship";
  cursor: Scalars["String"];
  node: Page;
};

export type AppsConnection = {
  __typename?: "AppsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<AppEdge>;
};

export type AppStoreConnection = {
  __typename?: "AppStoreConnection";
  edges: Array<AppStoreRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type AppStoreRelationship = {
  __typename?: "AppStoreRelationship";
  cursor: Scalars["String"];
  node: Store;
};

export type AppStoreStoreAggregationSelection = {
  __typename?: "AppStoreStoreAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AppStoreStoreNodeAggregateSelection>;
};

export type AppStoreStoreNodeAggregateSelection = {
  __typename?: "AppStoreStoreNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

/** Allows picking a app from the list of apps */
export type AppType = TypeBase & {
  __typename?: "AppType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Allows picking a app from the list of apps */
export type AppTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a app from the list of apps */
export type AppTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a app from the list of apps */
export type AppTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type AppTypeAggregateSelection = {
  __typename?: "AppTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AppTypeEdge = {
  __typename?: "AppTypeEdge";
  cursor: Scalars["String"];
  node: AppType;
};

export type AppTypesConnection = {
  __typename?: "AppTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<AppTypeEdge>;
};

export type AppTypeUserOwnerAggregationSelection = {
  __typename?: "AppTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>;
};

export type AppTypeUserOwnerNodeAggregateSelection = {
  __typename?: "AppTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type AppUserOwnerAggregationSelection = {
  __typename?: "AppUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AppUserOwnerNodeAggregateSelection>;
};

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: "AppUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = TypeBase &
  WithDescendants & {
    __typename?: "ArrayType";
    id: Scalars["ID"];
    name: Scalars["String"];
    descendantTypesIds: Array<Scalars["ID"]>;
    kind: TypeKind;
    owner: User;
    ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>;
    itemType: TypeBase;
    ownerConnection: TypeBaseOwnerConnection;
    itemTypeConnection: ArrayTypeItemTypeConnection;
  };

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeArgs = {
  options?: InputMaybe<TypeBaseOptions>;
  where?: InputMaybe<TypeBaseWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeConnectionArgs = {
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ArrayTypeItemTypeConnectionSort>>;
};

export type ArrayTypeAggregateSelection = {
  __typename?: "ArrayTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ArrayTypeEdge = {
  __typename?: "ArrayTypeEdge";
  cursor: Scalars["String"];
  node: ArrayType;
};

export type ArrayTypeItemTypeConnection = {
  __typename?: "ArrayTypeItemTypeConnection";
  edges: Array<ArrayTypeItemTypeRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ArrayTypeItemTypeRelationship = {
  __typename?: "ArrayTypeItemTypeRelationship";
  cursor: Scalars["String"];
  node: TypeBase;
};

export type ArrayTypesConnection = {
  __typename?: "ArrayTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ArrayTypeEdge>;
};

export type ArrayTypeUserOwnerAggregationSelection = {
  __typename?: "ArrayTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ArrayTypeUserOwnerNodeAggregateSelection>;
};

export type ArrayTypeUserOwnerNodeAggregateSelection = {
  __typename?: "ArrayTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Atom = {
  __typename?: "Atom";
  id: Scalars["ID"];
  name: Scalars["String"];
  icon?: Maybe<Scalars["String"]>;
  type: AtomType;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>;
  api: InterfaceType;
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>;
  tagsConnection: AtomTagsConnection;
  apiConnection: AtomApiConnection;
};

export type AtomTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AtomTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AtomApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AtomApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type AtomTagsConnectionArgs = {
  where?: InputMaybe<AtomTagsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<AtomTagsConnectionSort>>;
};

export type AtomApiConnectionArgs = {
  where?: InputMaybe<AtomApiConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<AtomApiConnectionSort>>;
};

export type AtomAggregateSelection = {
  __typename?: "AtomAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
};

export type AtomApiConnection = {
  __typename?: "AtomApiConnection";
  edges: Array<AtomApiRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type AtomApiRelationship = {
  __typename?: "AtomApiRelationship";
  cursor: Scalars["String"];
  node: InterfaceType;
};

export type AtomEdge = {
  __typename?: "AtomEdge";
  cursor: Scalars["String"];
  node: Atom;
};

export type AtomInterfaceTypeApiAggregationSelection = {
  __typename?: "AtomInterfaceTypeApiAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AtomInterfaceTypeApiNodeAggregateSelection>;
};

export type AtomInterfaceTypeApiNodeAggregateSelection = {
  __typename?: "AtomInterfaceTypeApiNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type AtomsConnection = {
  __typename?: "AtomsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<AtomEdge>;
};

export type AtomTagsConnection = {
  __typename?: "AtomTagsConnection";
  edges: Array<AtomTagsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type AtomTagsRelationship = {
  __typename?: "AtomTagsRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type AtomTagTagsAggregationSelection = {
  __typename?: "AtomTagTagsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<AtomTagTagsNodeAggregateSelection>;
};

export type AtomTagTagsNodeAggregateSelection = {
  __typename?: "AtomTagTagsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

/** Allows editing the value using a code mirror editor */
export type CodeMirrorType = TypeBase & {
  __typename?: "CodeMirrorType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  language: CodeMirrorLanguage;
  owner: User;
  ownerAggregate?: Maybe<CodeMirrorTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows editing the value using a code mirror editor */
export type CodeMirrorTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type CodeMirrorTypeAggregateSelection = {
  __typename?: "CodeMirrorTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type CodeMirrorTypeEdge = {
  __typename?: "CodeMirrorTypeEdge";
  cursor: Scalars["String"];
  node: CodeMirrorType;
};

export type CodeMirrorTypesConnection = {
  __typename?: "CodeMirrorTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CodeMirrorTypeEdge>;
};

export type CodeMirrorTypeUserOwnerAggregationSelection = {
  __typename?: "CodeMirrorTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<CodeMirrorTypeUserOwnerNodeAggregateSelection>;
};

export type CodeMirrorTypeUserOwnerNodeAggregateSelection = {
  __typename?: "CodeMirrorTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Component = WithOwner & {
  __typename?: "Component";
  id: Scalars["ID"];
  name: Scalars["String"];
  descendantComponentIds: Array<Scalars["ID"]>;
  rootElement: Element;
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>;
  api: InterfaceType;
  apiAggregate?: Maybe<ComponentInterfaceTypeApiAggregationSelection>;
  owner: User;
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>;
  rootElementConnection: ComponentRootElementConnection;
  apiConnection: ComponentApiConnection;
  ownerConnection: WithOwnerOwnerConnection;
};

export type ComponentRootElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ComponentRootElementConnectionArgs = {
  where?: InputMaybe<ComponentRootElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ComponentRootElementConnectionSort>>;
};

export type ComponentApiConnectionArgs = {
  where?: InputMaybe<ComponentApiConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ComponentApiConnectionSort>>;
};

export type ComponentOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};

export type ComponentAggregateSelection = {
  __typename?: "ComponentAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ComponentApiConnection = {
  __typename?: "ComponentApiConnection";
  edges: Array<ComponentApiRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ComponentApiRelationship = {
  __typename?: "ComponentApiRelationship";
  cursor: Scalars["String"];
  node: InterfaceType;
};

export type ComponentEdge = {
  __typename?: "ComponentEdge";
  cursor: Scalars["String"];
  node: Component;
};

export type ComponentElementRootElementAggregationSelection = {
  __typename?: "ComponentElementRootElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ComponentElementRootElementNodeAggregateSelection>;
};

export type ComponentElementRootElementNodeAggregateSelection = {
  __typename?: "ComponentElementRootElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ComponentInterfaceTypeApiAggregationSelection = {
  __typename?: "ComponentInterfaceTypeApiAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ComponentInterfaceTypeApiNodeAggregateSelection>;
};

export type ComponentInterfaceTypeApiNodeAggregateSelection = {
  __typename?: "ComponentInterfaceTypeApiNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ComponentRootElementConnection = {
  __typename?: "ComponentRootElementConnection";
  edges: Array<ComponentRootElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ComponentRootElementRelationship = {
  __typename?: "ComponentRootElementRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type ComponentsConnection = {
  __typename?: "ComponentsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ComponentEdge>;
};

export type ComponentUserOwnerAggregationSelection = {
  __typename?: "ComponentUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ComponentUserOwnerNodeAggregateSelection>;
};

export type ComponentUserOwnerNodeAggregateSelection = {
  __typename?: "ComponentUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type CreateActionTypesMutationResponse = {
  __typename?: "CreateActionTypesMutationResponse";
  info: CreateInfo;
  actionTypes: Array<ActionType>;
};

export type CreateAppsMutationResponse = {
  __typename?: "CreateAppsMutationResponse";
  info: CreateInfo;
  apps: Array<App>;
};

export type CreateAppTypesMutationResponse = {
  __typename?: "CreateAppTypesMutationResponse";
  info: CreateInfo;
  appTypes: Array<AppType>;
};

export type CreateArrayTypesMutationResponse = {
  __typename?: "CreateArrayTypesMutationResponse";
  info: CreateInfo;
  arrayTypes: Array<ArrayType>;
};

export type CreateAtomsMutationResponse = {
  __typename?: "CreateAtomsMutationResponse";
  info: CreateInfo;
  atoms: Array<Atom>;
};

export type CreateCodeMirrorTypesMutationResponse = {
  __typename?: "CreateCodeMirrorTypesMutationResponse";
  info: CreateInfo;
  codeMirrorTypes: Array<CodeMirrorType>;
};

export type CreateComponentsMutationResponse = {
  __typename?: "CreateComponentsMutationResponse";
  info: CreateInfo;
  components: Array<Component>;
};

export type CreateCreateInfosMutationResponse = {
  __typename?: "CreateCreateInfosMutationResponse";
  info: CreateInfo;
  createInfos: Array<CreateInfo>;
};

export type CreateCustomActionsMutationResponse = {
  __typename?: "CreateCustomActionsMutationResponse";
  info: CreateInfo;
  customActions: Array<CustomAction>;
};

export type CreateDeleteInfosMutationResponse = {
  __typename?: "CreateDeleteInfosMutationResponse";
  info: CreateInfo;
  deleteInfos: Array<DeleteInfo>;
};

export type CreateDomainsMutationResponse = {
  __typename?: "CreateDomainsMutationResponse";
  info: CreateInfo;
  domains: Array<Domain>;
};

export type CreateElementGraphsMutationResponse = {
  __typename?: "CreateElementGraphsMutationResponse";
  info: CreateInfo;
  elementGraphs: Array<ElementGraph>;
};

export type CreateElementsMutationResponse = {
  __typename?: "CreateElementsMutationResponse";
  info: CreateInfo;
  elements: Array<Element>;
};

export type CreateElementTypesMutationResponse = {
  __typename?: "CreateElementTypesMutationResponse";
  info: CreateInfo;
  elementTypes: Array<ElementType>;
};

export type CreateEnumTypesMutationResponse = {
  __typename?: "CreateEnumTypesMutationResponse";
  info: CreateInfo;
  enumTypes: Array<EnumType>;
};

export type CreateEnumTypeValuesMutationResponse = {
  __typename?: "CreateEnumTypeValuesMutationResponse";
  info: CreateInfo;
  enumTypeValues: Array<EnumTypeValue>;
};

export type CreateHooksMutationResponse = {
  __typename?: "CreateHooksMutationResponse";
  info: CreateInfo;
  hooks: Array<Hook>;
};

export type CreateInfo = {
  __typename?: "CreateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateInfoAggregateSelection = {
  __typename?: "CreateInfoAggregateSelection";
  count: Scalars["Int"];
  bookmark: StringAggregateSelectionNullable;
  nodesCreated: IntAggregateSelectionNonNullable;
  relationshipsCreated: IntAggregateSelectionNonNullable;
};

export type CreateInfoEdge = {
  __typename?: "CreateInfoEdge";
  cursor: Scalars["String"];
  node: CreateInfo;
};

export type CreateInfosConnection = {
  __typename?: "CreateInfosConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CreateInfoEdge>;
};

export type CreateInterfaceTypesMutationResponse = {
  __typename?: "CreateInterfaceTypesMutationResponse";
  info: CreateInfo;
  interfaceTypes: Array<InterfaceType>;
};

export type CreateLambdaTypesMutationResponse = {
  __typename?: "CreateLambdaTypesMutationResponse";
  info: CreateInfo;
  lambdaTypes: Array<LambdaType>;
};

export type CreatePagesMutationResponse = {
  __typename?: "CreatePagesMutationResponse";
  info: CreateInfo;
  pages: Array<Page>;
};

export type CreatePageTypesMutationResponse = {
  __typename?: "CreatePageTypesMutationResponse";
  info: CreateInfo;
  pageTypes: Array<PageType>;
};

export type CreatePipelineActionsMutationResponse = {
  __typename?: "CreatePipelineActionsMutationResponse";
  info: CreateInfo;
  pipelineActions: Array<PipelineAction>;
};

export type CreatePrimitiveTypesMutationResponse = {
  __typename?: "CreatePrimitiveTypesMutationResponse";
  info: CreateInfo;
  primitiveTypes: Array<PrimitiveType>;
};

export type CreatePropMapBindingsMutationResponse = {
  __typename?: "CreatePropMapBindingsMutationResponse";
  info: CreateInfo;
  propMapBindings: Array<PropMapBinding>;
};

export type CreatePropsMutationResponse = {
  __typename?: "CreatePropsMutationResponse";
  info: CreateInfo;
  props: Array<Prop>;
};

export type CreateReactNodeTypesMutationResponse = {
  __typename?: "CreateReactNodeTypesMutationResponse";
  info: CreateInfo;
  reactNodeTypes: Array<ReactNodeType>;
};

export type CreateRenderPropsTypesMutationResponse = {
  __typename?: "CreateRenderPropsTypesMutationResponse";
  info: CreateInfo;
  renderPropsTypes: Array<RenderPropsType>;
};

export type CreateResetDatabaseMutationResponsesMutationResponse = {
  __typename?: "CreateResetDatabaseMutationResponsesMutationResponse";
  info: CreateInfo;
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>;
};

export type CreateResourceActionsMutationResponse = {
  __typename?: "CreateResourceActionsMutationResponse";
  info: CreateInfo;
  resourceActions: Array<ResourceAction>;
};

export type CreateResourcesMutationResponse = {
  __typename?: "CreateResourcesMutationResponse";
  info: CreateInfo;
  resources: Array<Resource>;
};

export type CreateStoresMutationResponse = {
  __typename?: "CreateStoresMutationResponse";
  info: CreateInfo;
  stores: Array<Store>;
};

export type CreateTagGraphOptionsMutationResponse = {
  __typename?: "CreateTagGraphOptionsMutationResponse";
  info: CreateInfo;
  tagGraphOptions: Array<TagGraphOptions>;
};

export type CreateTagGraphsMutationResponse = {
  __typename?: "CreateTagGraphsMutationResponse";
  info: CreateInfo;
  tagGraphs: Array<TagGraph>;
};

export type CreateTagsMutationResponse = {
  __typename?: "CreateTagsMutationResponse";
  info: CreateInfo;
  tags: Array<Tag>;
};

export type CreateTypeReferencesMutationResponse = {
  __typename?: "CreateTypeReferencesMutationResponse";
  info: CreateInfo;
  typeReferences: Array<TypeReference>;
};

export type CreateUnionTypesMutationResponse = {
  __typename?: "CreateUnionTypesMutationResponse";
  info: CreateInfo;
  unionTypes: Array<UnionType>;
};

export type CreateUsersMutationResponse = {
  __typename?: "CreateUsersMutationResponse";
  info: CreateInfo;
  users: Array<User>;
};

export type CreateVercelDomainConfigDataMutationResponse = {
  __typename?: "CreateVercelDomainConfigDataMutationResponse";
  info: CreateInfo;
  vercelDomainConfigData: Array<VercelDomainConfigData>;
};

export type CreateVercelProjectDomainDataMutationResponse = {
  __typename?: "CreateVercelProjectDomainDataMutationResponse";
  info: CreateInfo;
  vercelProjectDomainData: Array<VercelProjectDomainData>;
};

export type CustomAction = ActionBase & {
  __typename?: "CustomAction";
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit: Scalars["Boolean"];
  /** Code to run when action is triggered */
  code: Scalars["String"];
  type: ActionKind;
  store: Store;
  storeAggregate?: Maybe<CustomActionStoreStoreAggregationSelection>;
  storeConnection: ActionBaseStoreConnection;
};

export type CustomActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type CustomActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type CustomActionStoreConnectionArgs = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>;
};

export type CustomActionAggregateSelection = {
  __typename?: "CustomActionAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  code: StringAggregateSelectionNonNullable;
};

export type CustomActionEdge = {
  __typename?: "CustomActionEdge";
  cursor: Scalars["String"];
  node: CustomAction;
};

export type CustomActionsConnection = {
  __typename?: "CustomActionsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CustomActionEdge>;
};

export type CustomActionStoreStoreAggregationSelection = {
  __typename?: "CustomActionStoreStoreAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<CustomActionStoreStoreNodeAggregateSelection>;
};

export type CustomActionStoreStoreNodeAggregateSelection = {
  __typename?: "CustomActionStoreStoreNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type DeleteInfo = {
  __typename?: "DeleteInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type DeleteInfoAggregateSelection = {
  __typename?: "DeleteInfoAggregateSelection";
  count: Scalars["Int"];
  bookmark: StringAggregateSelectionNullable;
  nodesDeleted: IntAggregateSelectionNonNullable;
  relationshipsDeleted: IntAggregateSelectionNonNullable;
};

export type DeleteInfoEdge = {
  __typename?: "DeleteInfoEdge";
  cursor: Scalars["String"];
  node: DeleteInfo;
};

export type DeleteInfosConnection = {
  __typename?: "DeleteInfosConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<DeleteInfoEdge>;
};

export type Domain = {
  __typename?: "Domain";
  id: Scalars["ID"];
  name: Scalars["String"];
  domainConfig: VercelDomainConfigData;
  projectDomain: VercelProjectDomainData;
  app: App;
  appAggregate?: Maybe<DomainAppAppAggregationSelection>;
  appConnection: DomainAppConnection;
};

export type DomainAppArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type DomainAppAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type DomainAppConnectionArgs = {
  where?: InputMaybe<DomainAppConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<DomainAppConnectionSort>>;
};

export type DomainAggregateSelection = {
  __typename?: "DomainAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type DomainAppAppAggregationSelection = {
  __typename?: "DomainAppAppAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<DomainAppAppNodeAggregateSelection>;
};

export type DomainAppAppNodeAggregateSelection = {
  __typename?: "DomainAppAppNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type DomainAppConnection = {
  __typename?: "DomainAppConnection";
  edges: Array<DomainAppRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type DomainAppRelationship = {
  __typename?: "DomainAppRelationship";
  cursor: Scalars["String"];
  node: App;
};

export type DomainEdge = {
  __typename?: "DomainEdge";
  cursor: Scalars["String"];
  node: Domain;
};

export type DomainsConnection = {
  __typename?: "DomainsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<DomainEdge>;
};

export type Element = {
  __typename?: "Element";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  customCss?: Maybe<Scalars["String"]>;
  guiCss?: Maybe<Scalars["String"]>;
  propTransformationJs?: Maybe<Scalars["String"]>;
  renderForEachPropKey?: Maybe<Scalars["String"]>;
  renderIfPropKey?: Maybe<Scalars["String"]>;
  preRenderActionId?: Maybe<Scalars["String"]>;
  postRenderActionId?: Maybe<Scalars["String"]>;
  descendantElements: Array<Element>;
  nextSibling?: Maybe<Element>;
  nextSiblingAggregate?: Maybe<ElementElementNextSiblingAggregationSelection>;
  prevSibling?: Maybe<Element>;
  prevSiblingAggregate?: Maybe<ElementElementPrevSiblingAggregationSelection>;
  firstChild?: Maybe<Element>;
  firstChildAggregate?: Maybe<ElementElementFirstChildAggregationSelection>;
  parent?: Maybe<Element>;
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>;
  children: Array<Element>;
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>;
  page?: Maybe<Page>;
  pageAggregate?: Maybe<ElementPagePageAggregationSelection>;
  props?: Maybe<Prop>;
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>;
  parentElement?: Maybe<Element>;
  parentElementAggregate?: Maybe<ElementElementParentElementAggregationSelection>;
  parentComponent?: Maybe<Component>;
  parentComponentAggregate?: Maybe<ElementComponentParentComponentAggregationSelection>;
  componentRenderType?: Maybe<Component>;
  componentRenderTypeAggregate?: Maybe<ElementComponentComponentRenderTypeAggregationSelection>;
  atomRenderType?: Maybe<Atom>;
  atomRenderTypeAggregate?: Maybe<ElementAtomAtomRenderTypeAggregationSelection>;
  hooks: Array<Hook>;
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>;
  propMapBindings: Array<PropMapBinding>;
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingPropMapBindingsAggregationSelection>;
  nextSiblingConnection: ElementNextSiblingConnection;
  prevSiblingConnection: ElementPrevSiblingConnection;
  firstChildConnection: ElementFirstChildConnection;
  parentConnection: ElementParentConnection;
  childrenConnection: ElementChildrenConnection;
  pageConnection: ElementPageConnection;
  propsConnection: ElementPropsConnection;
  parentElementConnection: ElementParentElementConnection;
  parentComponentConnection: ElementParentComponentConnection;
  componentRenderTypeConnection: ElementComponentRenderTypeConnection;
  atomRenderTypeConnection: ElementAtomRenderTypeConnection;
  hooksConnection: ElementHooksConnection;
  propMapBindingsConnection: ElementPropMapBindingsConnection;
};

export type ElementNextSiblingArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementNextSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPrevSiblingArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPrevSiblingAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementFirstChildArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementFirstChildAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementChildrenArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementChildrenAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPageArgs = {
  where?: InputMaybe<PageWhere>;
  options?: InputMaybe<PageOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPageAggregateArgs = {
  where?: InputMaybe<PageWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPropsArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentComponentArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementParentComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementComponentRenderTypeArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementComponentRenderTypeAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementAtomRenderTypeArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementAtomRenderTypeAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementHooksArgs = {
  where?: InputMaybe<HookWhere>;
  options?: InputMaybe<HookOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
  options?: InputMaybe<PropMapBindingOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ElementNextSiblingConnectionArgs = {
  where?: InputMaybe<ElementNextSiblingConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementNextSiblingConnectionSort>>;
};

export type ElementPrevSiblingConnectionArgs = {
  where?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementPrevSiblingConnectionSort>>;
};

export type ElementFirstChildConnectionArgs = {
  where?: InputMaybe<ElementFirstChildConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementFirstChildConnectionSort>>;
};

export type ElementParentConnectionArgs = {
  where?: InputMaybe<ElementParentConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementParentConnectionSort>>;
};

export type ElementChildrenConnectionArgs = {
  where?: InputMaybe<ElementChildrenConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementChildrenConnectionSort>>;
};

export type ElementPageConnectionArgs = {
  where?: InputMaybe<ElementPageConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementPageConnectionSort>>;
};

export type ElementPropsConnectionArgs = {
  where?: InputMaybe<ElementPropsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementPropsConnectionSort>>;
};

export type ElementParentElementConnectionArgs = {
  where?: InputMaybe<ElementParentElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementParentElementConnectionSort>>;
};

export type ElementParentComponentConnectionArgs = {
  where?: InputMaybe<ElementParentComponentConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementParentComponentConnectionSort>>;
};

export type ElementComponentRenderTypeConnectionArgs = {
  where?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementComponentRenderTypeConnectionSort>>;
};

export type ElementAtomRenderTypeConnectionArgs = {
  where?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementAtomRenderTypeConnectionSort>>;
};

export type ElementHooksConnectionArgs = {
  where?: InputMaybe<ElementHooksConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementHooksConnectionSort>>;
};

export type ElementPropMapBindingsConnectionArgs = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ElementPropMapBindingsConnectionSort>>;
};

export type ElementAggregateSelection = {
  __typename?: "ElementAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementAtomAtomRenderTypeAggregationSelection = {
  __typename?: "ElementAtomAtomRenderTypeAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementAtomAtomRenderTypeNodeAggregateSelection>;
};

export type ElementAtomAtomRenderTypeNodeAggregateSelection = {
  __typename?: "ElementAtomAtomRenderTypeNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
};

export type ElementAtomRenderTypeConnection = {
  __typename?: "ElementAtomRenderTypeConnection";
  edges: Array<ElementAtomRenderTypeRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementAtomRenderTypeRelationship = {
  __typename?: "ElementAtomRenderTypeRelationship";
  cursor: Scalars["String"];
  node: Atom;
};

export type ElementChildrenConnection = {
  __typename?: "ElementChildrenConnection";
  edges: Array<ElementChildrenRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementChildrenRelationship = ParentOfElement & {
  __typename?: "ElementChildrenRelationship";
  cursor: Scalars["String"];
  node: Element;
  order?: Maybe<Scalars["Int"]>;
};

export type ElementComponentComponentRenderTypeAggregationSelection = {
  __typename?: "ElementComponentComponentRenderTypeAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementComponentComponentRenderTypeNodeAggregateSelection>;
};

export type ElementComponentComponentRenderTypeNodeAggregateSelection = {
  __typename?: "ElementComponentComponentRenderTypeNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ElementComponentParentComponentAggregationSelection = {
  __typename?: "ElementComponentParentComponentAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementComponentParentComponentNodeAggregateSelection>;
};

export type ElementComponentParentComponentNodeAggregateSelection = {
  __typename?: "ElementComponentParentComponentNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ElementComponentRenderTypeConnection = {
  __typename?: "ElementComponentRenderTypeConnection";
  edges: Array<ElementComponentRenderTypeRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementComponentRenderTypeRelationship = {
  __typename?: "ElementComponentRenderTypeRelationship";
  cursor: Scalars["String"];
  node: Component;
};

export type ElementEdge = {
  __typename?: "ElementEdge";
  cursor: Scalars["String"];
  node: Element;
};

export type ElementElementChildrenAggregationSelection = {
  __typename?: "ElementElementChildrenAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>;
  edge?: Maybe<ElementElementChildrenEdgeAggregateSelection>;
};

export type ElementElementChildrenEdgeAggregateSelection = {
  __typename?: "ElementElementChildrenEdgeAggregateSelection";
  order: IntAggregateSelectionNullable;
};

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: "ElementElementChildrenNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementElementFirstChildAggregationSelection = {
  __typename?: "ElementElementFirstChildAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementFirstChildNodeAggregateSelection>;
};

export type ElementElementFirstChildNodeAggregateSelection = {
  __typename?: "ElementElementFirstChildNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementElementNextSiblingAggregationSelection = {
  __typename?: "ElementElementNextSiblingAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementNextSiblingNodeAggregateSelection>;
};

export type ElementElementNextSiblingNodeAggregateSelection = {
  __typename?: "ElementElementNextSiblingNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementElementParentAggregationSelection = {
  __typename?: "ElementElementParentAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementParentNodeAggregateSelection>;
};

export type ElementElementParentElementAggregationSelection = {
  __typename?: "ElementElementParentElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementParentElementNodeAggregateSelection>;
  edge?: Maybe<ElementElementParentElementEdgeAggregateSelection>;
};

export type ElementElementParentElementEdgeAggregateSelection = {
  __typename?: "ElementElementParentElementEdgeAggregateSelection";
  order: IntAggregateSelectionNullable;
};

export type ElementElementParentElementNodeAggregateSelection = {
  __typename?: "ElementElementParentElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementElementParentNodeAggregateSelection = {
  __typename?: "ElementElementParentNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementElementPrevSiblingAggregationSelection = {
  __typename?: "ElementElementPrevSiblingAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementElementPrevSiblingNodeAggregateSelection>;
};

export type ElementElementPrevSiblingNodeAggregateSelection = {
  __typename?: "ElementElementPrevSiblingNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type ElementFirstChildConnection = {
  __typename?: "ElementFirstChildConnection";
  edges: Array<ElementFirstChildRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementFirstChildRelationship = {
  __typename?: "ElementFirstChildRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type ElementGraph = {
  __typename?: "ElementGraph";
  id: Scalars["ID"];
  descendants: Array<Scalars["ID"]>;
};

export type ElementGraphAggregateSelection = {
  __typename?: "ElementGraphAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
};

export type ElementGraphEdge = {
  __typename?: "ElementGraphEdge";
  cursor: Scalars["String"];
  node: ElementGraph;
};

export type ElementGraphsConnection = {
  __typename?: "ElementGraphsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ElementGraphEdge>;
};

export type ElementHookHooksAggregationSelection = {
  __typename?: "ElementHookHooksAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementHookHooksNodeAggregateSelection>;
};

export type ElementHookHooksNodeAggregateSelection = {
  __typename?: "ElementHookHooksNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
};

export type ElementHooksConnection = {
  __typename?: "ElementHooksConnection";
  edges: Array<ElementHooksRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementHooksRelationship = {
  __typename?: "ElementHooksRelationship";
  cursor: Scalars["String"];
  node: Hook;
};

export type ElementNextSiblingConnection = {
  __typename?: "ElementNextSiblingConnection";
  edges: Array<ElementNextSiblingRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementNextSiblingRelationship = {
  __typename?: "ElementNextSiblingRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type ElementPageConnection = {
  __typename?: "ElementPageConnection";
  edges: Array<ElementPageRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementPagePageAggregationSelection = {
  __typename?: "ElementPagePageAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementPagePageNodeAggregateSelection>;
};

export type ElementPagePageNodeAggregateSelection = {
  __typename?: "ElementPagePageNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type ElementPageRelationship = {
  __typename?: "ElementPageRelationship";
  cursor: Scalars["String"];
  node: Page;
};

export type ElementParentComponentConnection = {
  __typename?: "ElementParentComponentConnection";
  edges: Array<ElementParentComponentRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementParentComponentRelationship = {
  __typename?: "ElementParentComponentRelationship";
  cursor: Scalars["String"];
  node: Component;
};

export type ElementParentConnection = {
  __typename?: "ElementParentConnection";
  edges: Array<ElementParentRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementParentElementConnection = {
  __typename?: "ElementParentElementConnection";
  edges: Array<ElementParentElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementParentElementRelationship = ParentOfElement & {
  __typename?: "ElementParentElementRelationship";
  cursor: Scalars["String"];
  node: Element;
  order?: Maybe<Scalars["Int"]>;
};

export type ElementParentRelationship = {
  __typename?: "ElementParentRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type ElementPrevSiblingConnection = {
  __typename?: "ElementPrevSiblingConnection";
  edges: Array<ElementPrevSiblingRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementPrevSiblingRelationship = {
  __typename?: "ElementPrevSiblingRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type ElementPropMapBindingPropMapBindingsAggregationSelection = {
  __typename?: "ElementPropMapBindingPropMapBindingsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementPropMapBindingPropMapBindingsNodeAggregateSelection>;
};

export type ElementPropMapBindingPropMapBindingsNodeAggregateSelection = {
  __typename?: "ElementPropMapBindingPropMapBindingsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  sourceKey: StringAggregateSelectionNonNullable;
  targetKey: StringAggregateSelectionNonNullable;
};

export type ElementPropMapBindingsConnection = {
  __typename?: "ElementPropMapBindingsConnection";
  edges: Array<ElementPropMapBindingsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementPropMapBindingsRelationship = {
  __typename?: "ElementPropMapBindingsRelationship";
  cursor: Scalars["String"];
  node: PropMapBinding;
};

export type ElementPropPropsAggregationSelection = {
  __typename?: "ElementPropPropsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementPropPropsNodeAggregateSelection>;
};

export type ElementPropPropsNodeAggregateSelection = {
  __typename?: "ElementPropPropsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ElementPropsConnection = {
  __typename?: "ElementPropsConnection";
  edges: Array<ElementPropsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ElementPropsRelationship = {
  __typename?: "ElementPropsRelationship";
  cursor: Scalars["String"];
  node: Prop;
};

export type ElementsConnection = {
  __typename?: "ElementsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ElementEdge>;
};

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
export type ElementType = TypeBase & {
  __typename?: "ElementType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind;
  owner: User;
  ownerAggregate?: Maybe<ElementTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

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
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type ElementTypeAggregateSelection = {
  __typename?: "ElementTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ElementTypeEdge = {
  __typename?: "ElementTypeEdge";
  cursor: Scalars["String"];
  node: ElementType;
};

export type ElementTypesConnection = {
  __typename?: "ElementTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ElementTypeEdge>;
};

export type ElementTypeUserOwnerAggregationSelection = {
  __typename?: "ElementTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>;
};

export type ElementTypeUserOwnerNodeAggregateSelection = {
  __typename?: "ElementTypeUserOwnerNodeAggregateSelection";
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
export type EnumType = TypeBase & {
  __typename?: "EnumType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>;
  allowedValues: Array<EnumTypeValue>;
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
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
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  options?: InputMaybe<EnumTypeValueOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesConnectionArgs = {
  where?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<EnumTypeAllowedValuesConnectionSort>>;
};

export type EnumTypeAggregateSelection = {
  __typename?: "EnumTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type EnumTypeAllowedValuesConnection = {
  __typename?: "EnumTypeAllowedValuesConnection";
  edges: Array<EnumTypeAllowedValuesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type EnumTypeAllowedValuesRelationship = {
  __typename?: "EnumTypeAllowedValuesRelationship";
  cursor: Scalars["String"];
  node: EnumTypeValue;
};

export type EnumTypeEdge = {
  __typename?: "EnumTypeEdge";
  cursor: Scalars["String"];
  node: EnumType;
};

export type EnumTypeEnumTypeValueAllowedValuesAggregationSelection = {
  __typename?: "EnumTypeEnumTypeValueAllowedValuesAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection>;
};

export type EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection = {
  __typename?: "EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  value: StringAggregateSelectionNonNullable;
};

export type EnumTypesConnection = {
  __typename?: "EnumTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<EnumTypeEdge>;
};

export type EnumTypeUserOwnerAggregationSelection = {
  __typename?: "EnumTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>;
};

export type EnumTypeUserOwnerNodeAggregateSelection = {
  __typename?: "EnumTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type EnumTypeValue = {
  __typename?: "EnumTypeValue";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  value: Scalars["String"];
  enumType?: Maybe<EnumType>;
  enumTypeAggregate?: Maybe<EnumTypeValueEnumTypeEnumTypeAggregationSelection>;
  enumTypeConnection: EnumTypeValueEnumTypeConnection;
};

export type EnumTypeValueEnumTypeArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  options?: InputMaybe<EnumTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type EnumTypeValueEnumTypeAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type EnumTypeValueEnumTypeConnectionArgs = {
  where?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionSort>>;
};

export type EnumTypeValueAggregateSelection = {
  __typename?: "EnumTypeValueAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  value: StringAggregateSelectionNonNullable;
};

export type EnumTypeValueEdge = {
  __typename?: "EnumTypeValueEdge";
  cursor: Scalars["String"];
  node: EnumTypeValue;
};

export type EnumTypeValueEnumTypeConnection = {
  __typename?: "EnumTypeValueEnumTypeConnection";
  edges: Array<EnumTypeValueEnumTypeRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type EnumTypeValueEnumTypeEnumTypeAggregationSelection = {
  __typename?: "EnumTypeValueEnumTypeEnumTypeAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection>;
};

export type EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection = {
  __typename?: "EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type EnumTypeValueEnumTypeRelationship = {
  __typename?: "EnumTypeValueEnumTypeRelationship";
  cursor: Scalars["String"];
  node: EnumType;
};

export type EnumTypeValuesConnection = {
  __typename?: "EnumTypeValuesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<EnumTypeValueEdge>;
};

export type Hook = {
  __typename?: "Hook";
  id: Scalars["ID"];
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
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type HookConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type HookElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type HookElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type HookConfigConnectionArgs = {
  where?: InputMaybe<HookConfigConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<HookConfigConnectionSort>>;
};

export type HookElementConnectionArgs = {
  where?: InputMaybe<HookElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<HookElementConnectionSort>>;
};

export type HookAggregateSelection = {
  __typename?: "HookAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
};

export type HookConfigConnection = {
  __typename?: "HookConfigConnection";
  edges: Array<HookConfigRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type HookConfigRelationship = {
  __typename?: "HookConfigRelationship";
  cursor: Scalars["String"];
  node: Prop;
};

export type HookEdge = {
  __typename?: "HookEdge";
  cursor: Scalars["String"];
  node: Hook;
};

export type HookElementConnection = {
  __typename?: "HookElementConnection";
  edges: Array<HookElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type HookElementElementAggregationSelection = {
  __typename?: "HookElementElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<HookElementElementNodeAggregateSelection>;
};

export type HookElementElementNodeAggregateSelection = {
  __typename?: "HookElementElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type HookElementRelationship = {
  __typename?: "HookElementRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type HookPropConfigAggregationSelection = {
  __typename?: "HookPropConfigAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<HookPropConfigNodeAggregateSelection>;
};

export type HookPropConfigNodeAggregateSelection = {
  __typename?: "HookPropConfigNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type HooksConnection = {
  __typename?: "HooksConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<HookEdge>;
};

export type IdAggregateSelectionNonNullable = {
  __typename?: "IDAggregateSelectionNonNullable";
  shortest: Scalars["ID"];
  longest: Scalars["ID"];
};

export type IntAggregateSelectionNonNullable = {
  __typename?: "IntAggregateSelectionNonNullable";
  max: Scalars["Int"];
  min: Scalars["Int"];
  average: Scalars["Float"];
  sum: Scalars["Int"];
};

export type IntAggregateSelectionNullable = {
  __typename?: "IntAggregateSelectionNullable";
  max?: Maybe<Scalars["Int"]>;
  min?: Maybe<Scalars["Int"]>;
  average?: Maybe<Scalars["Float"]>;
  sum?: Maybe<Scalars["Int"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceType = TypeBase &
  WithDescendants & {
    __typename?: "InterfaceType";
    id: Scalars["ID"];
    name: Scalars["String"];
    descendantTypesIds: Array<Scalars["ID"]>;
    kind: TypeKind;
    fieldFor: Array<TypeBase>;
    owner: User;
    ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>;
    apiOfAtoms: Array<Atom>;
    apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>;
    fields: Array<TypeBase>;
    ownerConnection: TypeBaseOwnerConnection;
    apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection;
    fieldsConnection: InterfaceTypeFieldsConnection;
  };

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsArgs = {
  where?: InputMaybe<AtomWhere>;
  options?: InputMaybe<AtomOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsArgs = {
  options?: InputMaybe<TypeBaseOptions>;
  where?: InputMaybe<TypeBaseWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionSort>>;
};

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsConnectionArgs = {
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<InterfaceTypeFieldsConnectionSort>>;
};

export type InterfaceTypeAggregateSelection = {
  __typename?: "InterfaceTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type InterfaceTypeApiOfAtomsConnection = {
  __typename?: "InterfaceTypeApiOfAtomsConnection";
  edges: Array<InterfaceTypeApiOfAtomsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type InterfaceTypeApiOfAtomsRelationship = {
  __typename?: "InterfaceTypeApiOfAtomsRelationship";
  cursor: Scalars["String"];
  node: Atom;
};

export type InterfaceTypeAtomApiOfAtomsAggregationSelection = {
  __typename?: "InterfaceTypeAtomApiOfAtomsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<InterfaceTypeAtomApiOfAtomsNodeAggregateSelection>;
};

export type InterfaceTypeAtomApiOfAtomsNodeAggregateSelection = {
  __typename?: "InterfaceTypeAtomApiOfAtomsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  icon: StringAggregateSelectionNullable;
};

export type InterfaceTypeEdge = {
  __typename?: "InterfaceTypeEdge";
  cursor: Scalars["String"];
  node: InterfaceType;
};

export type InterfaceTypeFieldsConnection = {
  __typename?: "InterfaceTypeFieldsConnection";
  edges: Array<InterfaceTypeFieldsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type InterfaceTypeFieldsRelationship = Field & {
  __typename?: "InterfaceTypeFieldsRelationship";
  cursor: Scalars["String"];
  node: TypeBase;
  id: Scalars["ID"];
  key: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type InterfaceTypesConnection = {
  __typename?: "InterfaceTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<InterfaceTypeEdge>;
};

export type InterfaceTypeUserOwnerAggregationSelection = {
  __typename?: "InterfaceTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<InterfaceTypeUserOwnerNodeAggregateSelection>;
};

export type InterfaceTypeUserOwnerNodeAggregateSelection = {
  __typename?: "InterfaceTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

/** Allows picking a lambda */
export type LambdaType = TypeBase & {
  __typename?: "LambdaType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Allows picking a lambda */
export type LambdaTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a lambda */
export type LambdaTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a lambda */
export type LambdaTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type LambdaTypeAggregateSelection = {
  __typename?: "LambdaTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type LambdaTypeEdge = {
  __typename?: "LambdaTypeEdge";
  cursor: Scalars["String"];
  node: LambdaType;
};

export type LambdaTypesConnection = {
  __typename?: "LambdaTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<LambdaTypeEdge>;
};

export type LambdaTypeUserOwnerAggregationSelection = {
  __typename?: "LambdaTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>;
};

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  __typename?: "LambdaTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Page = {
  __typename?: "Page";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  rootElement: Element;
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>;
  app: App;
  appAggregate?: Maybe<PageAppAppAggregationSelection>;
  rootElementConnection: PageRootElementConnection;
  appConnection: PageAppConnection;
};

export type PageRootElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PageRootElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PageAppArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PageAppAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PageRootElementConnectionArgs = {
  where?: InputMaybe<PageRootElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<PageRootElementConnectionSort>>;
};

export type PageAppConnectionArgs = {
  where?: InputMaybe<PageAppConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<PageAppConnectionSort>>;
};

export type PageAggregateSelection = {
  __typename?: "PageAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type PageAppAppAggregationSelection = {
  __typename?: "PageAppAppAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PageAppAppNodeAggregateSelection>;
};

export type PageAppAppNodeAggregateSelection = {
  __typename?: "PageAppAppNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type PageAppConnection = {
  __typename?: "PageAppConnection";
  edges: Array<PageAppRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PageAppRelationship = {
  __typename?: "PageAppRelationship";
  cursor: Scalars["String"];
  node: App;
};

export type PageEdge = {
  __typename?: "PageEdge";
  cursor: Scalars["String"];
  node: Page;
};

export type PageElementRootElementAggregationSelection = {
  __typename?: "PageElementRootElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PageElementRootElementNodeAggregateSelection>;
};

export type PageElementRootElementNodeAggregateSelection = {
  __typename?: "PageElementRootElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type PageRootElementConnection = {
  __typename?: "PageRootElementConnection";
  edges: Array<PageRootElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PageRootElementRelationship = {
  __typename?: "PageRootElementRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type PagesConnection = {
  __typename?: "PagesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PageEdge>;
};

/** Allows picking a page from the list of pages */
export type PageType = TypeBase & {
  __typename?: "PageType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Allows picking a page from the list of pages */
export type PageTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a page from the list of pages */
export type PageTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking a page from the list of pages */
export type PageTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type PageTypeAggregateSelection = {
  __typename?: "PageTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PageTypeEdge = {
  __typename?: "PageTypeEdge";
  cursor: Scalars["String"];
  node: PageType;
};

export type PageTypesConnection = {
  __typename?: "PageTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PageTypeEdge>;
};

export type PageTypeUserOwnerAggregationSelection = {
  __typename?: "PageTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>;
};

export type PageTypeUserOwnerNodeAggregateSelection = {
  __typename?: "PageTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type PipelineAction = ActionBase & {
  __typename?: "PipelineAction";
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit: Scalars["Boolean"];
  type: ActionKind;
  store: Store;
  storeAggregate?: Maybe<PipelineActionStoreStoreAggregationSelection>;
  /** List of actions to run in order */
  actions: Array<AnyAction>;
  storeConnection: ActionBaseStoreConnection;
  actionsConnection: PipelineActionActionsConnection;
};

export type PipelineActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PipelineActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PipelineActionActionsArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PipelineActionStoreConnectionArgs = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>;
};

export type PipelineActionActionsConnectionArgs = {
  where?: InputMaybe<PipelineActionActionsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<PipelineActionActionsConnectionSort>>;
};

export type PipelineActionActionsConnection = {
  __typename?: "PipelineActionActionsConnection";
  edges: Array<PipelineActionActionsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PipelineActionActionsRelationship = ActionsPipeLine & {
  __typename?: "PipelineActionActionsRelationship";
  cursor: Scalars["String"];
  node: AnyAction;
  orders?: Maybe<Array<Scalars["String"]>>;
};

export type PipelineActionAggregateSelection = {
  __typename?: "PipelineActionAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PipelineActionEdge = {
  __typename?: "PipelineActionEdge";
  cursor: Scalars["String"];
  node: PipelineAction;
};

export type PipelineActionsConnection = {
  __typename?: "PipelineActionsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PipelineActionEdge>;
};

export type PipelineActionStoreStoreAggregationSelection = {
  __typename?: "PipelineActionStoreStoreAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PipelineActionStoreStoreNodeAggregateSelection>;
};

export type PipelineActionStoreStoreNodeAggregateSelection = {
  __typename?: "PipelineActionStoreStoreNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = TypeBase & {
  __typename?: "PrimitiveType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  primitiveKind: PrimitiveTypeKind;
  owner: User;
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type PrimitiveTypeAggregateSelection = {
  __typename?: "PrimitiveTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PrimitiveTypeEdge = {
  __typename?: "PrimitiveTypeEdge";
  cursor: Scalars["String"];
  node: PrimitiveType;
};

export type PrimitiveTypesConnection = {
  __typename?: "PrimitiveTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PrimitiveTypeEdge>;
};

export type PrimitiveTypeUserOwnerAggregationSelection = {
  __typename?: "PrimitiveTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>;
};

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  __typename?: "PrimitiveTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Prop = {
  __typename?: "Prop";
  id: Scalars["ID"];
  data: Scalars["String"];
};

export type PropAggregateSelection = {
  __typename?: "PropAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type PropEdge = {
  __typename?: "PropEdge";
  cursor: Scalars["String"];
  node: Prop;
};

export type PropMapBinding = {
  __typename?: "PropMapBinding";
  id: Scalars["ID"];
  sourceKey: Scalars["String"];
  targetKey: Scalars["String"];
  element: Element;
  elementAggregate?: Maybe<PropMapBindingElementElementAggregationSelection>;
  targetElement?: Maybe<Element>;
  targetElementAggregate?: Maybe<PropMapBindingElementTargetElementAggregationSelection>;
  elementConnection: PropMapBindingElementConnection;
  targetElementConnection: PropMapBindingTargetElementConnection;
};

export type PropMapBindingElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PropMapBindingElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PropMapBindingTargetElementArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PropMapBindingTargetElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type PropMapBindingElementConnectionArgs = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<PropMapBindingElementConnectionSort>>;
};

export type PropMapBindingTargetElementConnectionArgs = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<PropMapBindingTargetElementConnectionSort>>;
};

export type PropMapBindingAggregateSelection = {
  __typename?: "PropMapBindingAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  sourceKey: StringAggregateSelectionNonNullable;
  targetKey: StringAggregateSelectionNonNullable;
};

export type PropMapBindingEdge = {
  __typename?: "PropMapBindingEdge";
  cursor: Scalars["String"];
  node: PropMapBinding;
};

export type PropMapBindingElementConnection = {
  __typename?: "PropMapBindingElementConnection";
  edges: Array<PropMapBindingElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PropMapBindingElementElementAggregationSelection = {
  __typename?: "PropMapBindingElementElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PropMapBindingElementElementNodeAggregateSelection>;
};

export type PropMapBindingElementElementNodeAggregateSelection = {
  __typename?: "PropMapBindingElementElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type PropMapBindingElementRelationship = {
  __typename?: "PropMapBindingElementRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type PropMapBindingElementTargetElementAggregationSelection = {
  __typename?: "PropMapBindingElementTargetElementAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<PropMapBindingElementTargetElementNodeAggregateSelection>;
};

export type PropMapBindingElementTargetElementNodeAggregateSelection = {
  __typename?: "PropMapBindingElementTargetElementNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type PropMapBindingsConnection = {
  __typename?: "PropMapBindingsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PropMapBindingEdge>;
};

export type PropMapBindingTargetElementConnection = {
  __typename?: "PropMapBindingTargetElementConnection";
  edges: Array<PropMapBindingTargetElementRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PropMapBindingTargetElementRelationship = {
  __typename?: "PropMapBindingTargetElementRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type PropsConnection = {
  __typename?: "PropsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<PropEdge>;
};

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
export type ReactNodeType = TypeBase & {
  __typename?: "ReactNodeType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<ReactNodeTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

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
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type ReactNodeTypeAggregateSelection = {
  __typename?: "ReactNodeTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ReactNodeTypeEdge = {
  __typename?: "ReactNodeTypeEdge";
  cursor: Scalars["String"];
  node: ReactNodeType;
};

export type ReactNodeTypesConnection = {
  __typename?: "ReactNodeTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ReactNodeTypeEdge>;
};

export type ReactNodeTypeUserOwnerAggregationSelection = {
  __typename?: "ReactNodeTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>;
};

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  __typename?: "ReactNodeTypeUserOwnerNodeAggregateSelection";
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
 * - RenderPropsType: Component select box, results it '(props) => ReactNode' value
 * - ReactNodeType: Component select box, results it 'ReactNode' value
 * - ElementType: Current tree element select box, results it 'ReactNode' value
 */
export type RenderPropsType = TypeBase & {
  __typename?: "RenderPropsType";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: TypeKind;
  owner: User;
  ownerAggregate?: Maybe<RenderPropsTypeUserOwnerAggregationSelection>;
  ownerConnection: TypeBaseOwnerConnection;
};

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
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

export type RenderPropsTypeAggregateSelection = {
  __typename?: "RenderPropsTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type RenderPropsTypeEdge = {
  __typename?: "RenderPropsTypeEdge";
  cursor: Scalars["String"];
  node: RenderPropsType;
};

export type RenderPropsTypesConnection = {
  __typename?: "RenderPropsTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<RenderPropsTypeEdge>;
};

export type RenderPropsTypeUserOwnerAggregationSelection = {
  __typename?: "RenderPropsTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<RenderPropsTypeUserOwnerNodeAggregateSelection>;
};

export type RenderPropsTypeUserOwnerNodeAggregateSelection = {
  __typename?: "RenderPropsTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type ResetDatabaseMutationResponse = {
  __typename?: "ResetDatabaseMutationResponse";
  success?: Maybe<Scalars["Boolean"]>;
};

export type ResetDatabaseMutationResponseAggregateSelection = {
  __typename?: "ResetDatabaseMutationResponseAggregateSelection";
  count: Scalars["Int"];
};

export type ResetDatabaseMutationResponseEdge = {
  __typename?: "ResetDatabaseMutationResponseEdge";
  cursor: Scalars["String"];
  node: ResetDatabaseMutationResponse;
};

export type ResetDatabaseMutationResponsesConnection = {
  __typename?: "ResetDatabaseMutationResponsesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ResetDatabaseMutationResponseEdge>;
};

export type Resource = WithOwner & {
  __typename?: "Resource";
  id: Scalars["ID"];
  name: Scalars["String"];
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
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceConfigConnectionArgs = {
  where?: InputMaybe<ResourceConfigConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ResourceConfigConnectionSort>>;
};

export type ResourceOwnerConnectionArgs = {
  where?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<WithOwnerOwnerConnectionSort>>;
};

export type ResourceAction = ActionBase & {
  __typename?: "ResourceAction";
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit: Scalars["Boolean"];
  type: ActionKind;
  store: Store;
  storeAggregate?: Maybe<ResourceActionStoreStoreAggregationSelection>;
  /** Response handlers */
  successAction: AnyAction;
  errorAction: AnyAction;
  /** Resource to fetch data from */
  resource: Resource;
  resourceAggregate?: Maybe<ResourceActionResourceResourceAggregationSelection>;
  config: Prop;
  configAggregate?: Maybe<ResourceActionPropConfigAggregationSelection>;
  storeConnection: ActionBaseStoreConnection;
  successActionConnection: ResourceActionSuccessActionConnection;
  errorActionConnection: ResourceActionErrorActionConnection;
  resourceConnection: ResourceActionResourceConnection;
  configConnection: ResourceActionConfigConnection;
};

export type ResourceActionStoreArgs = {
  where?: InputMaybe<StoreWhere>;
  options?: InputMaybe<StoreOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionSuccessActionArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionErrorActionArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionResourceArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionResourceAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionConfigArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionConfigAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionStoreConnectionArgs = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ActionBaseStoreConnectionSort>>;
};

export type ResourceActionSuccessActionConnectionArgs = {
  where?: InputMaybe<ResourceActionSuccessActionConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionErrorActionConnectionArgs = {
  where?: InputMaybe<ResourceActionErrorActionConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionResourceConnectionArgs = {
  where?: InputMaybe<ResourceActionResourceConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ResourceActionResourceConnectionSort>>;
};

export type ResourceActionConfigConnectionArgs = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<ResourceActionConfigConnectionSort>>;
};

export type ResourceActionAggregateSelection = {
  __typename?: "ResourceActionAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ResourceActionConfigConnection = {
  __typename?: "ResourceActionConfigConnection";
  edges: Array<ResourceActionConfigRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResourceActionConfigRelationship = {
  __typename?: "ResourceActionConfigRelationship";
  cursor: Scalars["String"];
  node: Prop;
};

export type ResourceActionEdge = {
  __typename?: "ResourceActionEdge";
  cursor: Scalars["String"];
  node: ResourceAction;
};

export type ResourceActionErrorActionConnection = {
  __typename?: "ResourceActionErrorActionConnection";
  edges: Array<ResourceActionErrorActionRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResourceActionErrorActionRelationship = {
  __typename?: "ResourceActionErrorActionRelationship";
  cursor: Scalars["String"];
  node: AnyAction;
};

export type ResourceActionPropConfigAggregationSelection = {
  __typename?: "ResourceActionPropConfigAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResourceActionPropConfigNodeAggregateSelection>;
};

export type ResourceActionPropConfigNodeAggregateSelection = {
  __typename?: "ResourceActionPropConfigNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ResourceActionResourceConnection = {
  __typename?: "ResourceActionResourceConnection";
  edges: Array<ResourceActionResourceRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResourceActionResourceRelationship = {
  __typename?: "ResourceActionResourceRelationship";
  cursor: Scalars["String"];
  node: Resource;
};

export type ResourceActionResourceResourceAggregationSelection = {
  __typename?: "ResourceActionResourceResourceAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResourceActionResourceResourceNodeAggregateSelection>;
};

export type ResourceActionResourceResourceNodeAggregateSelection = {
  __typename?: "ResourceActionResourceResourceNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ResourceActionsConnection = {
  __typename?: "ResourceActionsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ResourceActionEdge>;
};

export type ResourceActionStoreStoreAggregationSelection = {
  __typename?: "ResourceActionStoreStoreAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResourceActionStoreStoreNodeAggregateSelection>;
};

export type ResourceActionStoreStoreNodeAggregateSelection = {
  __typename?: "ResourceActionStoreStoreNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ResourceActionSuccessActionConnection = {
  __typename?: "ResourceActionSuccessActionConnection";
  edges: Array<ResourceActionSuccessActionRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResourceActionSuccessActionRelationship = {
  __typename?: "ResourceActionSuccessActionRelationship";
  cursor: Scalars["String"];
  node: AnyAction;
};

export type ResourceAggregateSelection = {
  __typename?: "ResourceAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type ResourceConfigConnection = {
  __typename?: "ResourceConfigConnection";
  edges: Array<ResourceConfigRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type ResourceConfigRelationship = {
  __typename?: "ResourceConfigRelationship";
  cursor: Scalars["String"];
  node: Prop;
};

export type ResourceEdge = {
  __typename?: "ResourceEdge";
  cursor: Scalars["String"];
  node: Resource;
};

export type ResourcePropConfigAggregationSelection = {
  __typename?: "ResourcePropConfigAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResourcePropConfigNodeAggregateSelection>;
};

export type ResourcePropConfigNodeAggregateSelection = {
  __typename?: "ResourcePropConfigNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type ResourcesConnection = {
  __typename?: "ResourcesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ResourceEdge>;
};

export type ResourceUserOwnerAggregationSelection = {
  __typename?: "ResourceUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<ResourceUserOwnerNodeAggregateSelection>;
};

export type ResourceUserOwnerNodeAggregateSelection = {
  __typename?: "ResourceUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type Store = {
  __typename?: "Store";
  id: Scalars["ID"];
  name: Scalars["String"];
  state: Prop;
  stateAggregate?: Maybe<StorePropStateAggregationSelection>;
  app: App;
  appAggregate?: Maybe<StoreAppAppAggregationSelection>;
  stateApi: InterfaceType;
  stateApiAggregate?: Maybe<StoreInterfaceTypeStateApiAggregationSelection>;
  actions: Array<AnyAction>;
  stateConnection: StoreStateConnection;
  appConnection: StoreAppConnection;
  stateApiConnection: StoreStateApiConnection;
  actionsConnection: StoreActionsConnection;
};

export type StoreStateArgs = {
  where?: InputMaybe<PropWhere>;
  options?: InputMaybe<PropOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreStateAggregateArgs = {
  where?: InputMaybe<PropWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreAppArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreAppAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreStateApiArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  options?: InputMaybe<InterfaceTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreStateApiAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreActionsArgs = {
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<AnyActionWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreStateConnectionArgs = {
  where?: InputMaybe<StoreStateConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<StoreStateConnectionSort>>;
};

export type StoreAppConnectionArgs = {
  where?: InputMaybe<StoreAppConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<StoreAppConnectionSort>>;
};

export type StoreStateApiConnectionArgs = {
  where?: InputMaybe<StoreStateApiConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<StoreStateApiConnectionSort>>;
};

export type StoreActionsConnectionArgs = {
  where?: InputMaybe<StoreActionsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type StoreActionsConnection = {
  __typename?: "StoreActionsConnection";
  edges: Array<StoreActionsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type StoreActionsRelationship = {
  __typename?: "StoreActionsRelationship";
  cursor: Scalars["String"];
  node: AnyAction;
};

export type StoreAggregateSelection = {
  __typename?: "StoreAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type StoreAppAppAggregationSelection = {
  __typename?: "StoreAppAppAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<StoreAppAppNodeAggregateSelection>;
};

export type StoreAppAppNodeAggregateSelection = {
  __typename?: "StoreAppAppNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type StoreAppConnection = {
  __typename?: "StoreAppConnection";
  edges: Array<StoreAppRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type StoreAppRelationship = {
  __typename?: "StoreAppRelationship";
  cursor: Scalars["String"];
  node: App;
};

export type StoreEdge = {
  __typename?: "StoreEdge";
  cursor: Scalars["String"];
  node: Store;
};

export type StoreInterfaceTypeStateApiAggregationSelection = {
  __typename?: "StoreInterfaceTypeStateApiAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<StoreInterfaceTypeStateApiNodeAggregateSelection>;
};

export type StoreInterfaceTypeStateApiNodeAggregateSelection = {
  __typename?: "StoreInterfaceTypeStateApiNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type StorePropStateAggregationSelection = {
  __typename?: "StorePropStateAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<StorePropStateNodeAggregateSelection>;
};

export type StorePropStateNodeAggregateSelection = {
  __typename?: "StorePropStateNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  data: StringAggregateSelectionNonNullable;
};

export type StoresConnection = {
  __typename?: "StoresConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<StoreEdge>;
};

export type StoreStateApiConnection = {
  __typename?: "StoreStateApiConnection";
  edges: Array<StoreStateApiRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type StoreStateApiRelationship = {
  __typename?: "StoreStateApiRelationship";
  cursor: Scalars["String"];
  node: InterfaceType;
};

export type StoreStateConnection = {
  __typename?: "StoreStateConnection";
  edges: Array<StoreStateRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type StoreStateRelationship = {
  __typename?: "StoreStateRelationship";
  cursor: Scalars["String"];
  node: Prop;
};

export type StringAggregateSelectionNonNullable = {
  __typename?: "StringAggregateSelectionNonNullable";
  shortest: Scalars["String"];
  longest: Scalars["String"];
};

export type StringAggregateSelectionNullable = {
  __typename?: "StringAggregateSelectionNullable";
  shortest?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  name: Scalars["String"];
  isRoot?: Maybe<Scalars["Boolean"]>;
  parent?: Maybe<Tag>;
  parentAggregate?: Maybe<TagTagParentAggregationSelection>;
  children: Array<Tag>;
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>;
  owner: User;
  ownerAggregate?: Maybe<TagUserOwnerAggregationSelection>;
  parentConnection: TagParentConnection;
  childrenConnection: TagChildrenConnection;
  ownerConnection: TagOwnerConnection;
};

export type TagParentArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagParentAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagChildrenArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagChildrenAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagParentConnectionArgs = {
  where?: InputMaybe<TagParentConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TagParentConnectionSort>>;
};

export type TagChildrenConnectionArgs = {
  where?: InputMaybe<TagChildrenConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TagChildrenConnectionSort>>;
};

export type TagOwnerConnectionArgs = {
  where?: InputMaybe<TagOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TagOwnerConnectionSort>>;
};

export type TagAggregateSelection = {
  __typename?: "TagAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagChildrenConnection = {
  __typename?: "TagChildrenConnection";
  edges: Array<TagChildrenRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TagChildrenRelationship = {
  __typename?: "TagChildrenRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type TagEdge = {
  __typename?: "TagEdge";
  cursor: Scalars["String"];
  node: Tag;
};

export type TagGraph = {
  __typename?: "TagGraph";
  id: Scalars["ID"];
  name: Scalars["String"];
  descendants: Array<Scalars["ID"]>;
  isRoot: Scalars["Boolean"];
};

export type TagGraphAggregateSelection = {
  __typename?: "TagGraphAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagGraphEdge = {
  __typename?: "TagGraphEdge";
  cursor: Scalars["String"];
  node: TagGraph;
};

export type TagGraphOptions = {
  __typename?: "TagGraphOptions";
  sort?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type TagGraphOptionsAggregateSelection = {
  __typename?: "TagGraphOptionsAggregateSelection";
  count: Scalars["Int"];
  sort: IntAggregateSelectionNullable;
  limit: IntAggregateSelectionNullable;
};

export type TagGraphOptionsConnection = {
  __typename?: "TagGraphOptionsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TagGraphOptionsEdge>;
};

export type TagGraphOptionsEdge = {
  __typename?: "TagGraphOptionsEdge";
  cursor: Scalars["String"];
  node: TagGraphOptions;
};

export type TagGraphsConnection = {
  __typename?: "TagGraphsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TagGraphEdge>;
};

export type TagOwnerConnection = {
  __typename?: "TagOwnerConnection";
  edges: Array<TagOwnerRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TagOwnerRelationship = {
  __typename?: "TagOwnerRelationship";
  cursor: Scalars["String"];
  node: User;
};

export type TagParentConnection = {
  __typename?: "TagParentConnection";
  edges: Array<TagParentRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TagParentRelationship = {
  __typename?: "TagParentRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type TagsConnection = {
  __typename?: "TagsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TagEdge>;
};

export type TagTagChildrenAggregationSelection = {
  __typename?: "TagTagChildrenAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<TagTagChildrenNodeAggregateSelection>;
};

export type TagTagChildrenNodeAggregateSelection = {
  __typename?: "TagTagChildrenNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagTagParentAggregationSelection = {
  __typename?: "TagTagParentAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<TagTagParentNodeAggregateSelection>;
};

export type TagTagParentNodeAggregateSelection = {
  __typename?: "TagTagParentNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TagUserOwnerAggregationSelection = {
  __typename?: "TagUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<TagUserOwnerNodeAggregateSelection>;
};

export type TagUserOwnerNodeAggregateSelection = {
  __typename?: "TagUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type TypeBaseOwnerConnection = {
  __typename?: "TypeBaseOwnerConnection";
  edges: Array<TypeBaseOwnerRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TypeBaseOwnerRelationship = {
  __typename?: "TypeBaseOwnerRelationship";
  cursor: Scalars["String"];
  node: User;
};

export type TypeReference = {
  __typename?: "TypeReference";
  /** The name of the resource referencing the type */
  name: Scalars["String"];
  /** The type of resource - Atom, InterfaceType, etc. */
  label: Scalars["String"];
};

export type TypeReferenceAggregateSelection = {
  __typename?: "TypeReferenceAggregateSelection";
  count: Scalars["Int"];
  name: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type TypeReferenceEdge = {
  __typename?: "TypeReferenceEdge";
  cursor: Scalars["String"];
  node: TypeReference;
};

export type TypeReferencesConnection = {
  __typename?: "TypeReferencesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TypeReferenceEdge>;
};

/** Allows picking one of a set of types */
export type UnionType = TypeBase &
  WithDescendants & {
    __typename?: "UnionType";
    id: Scalars["ID"];
    name: Scalars["String"];
    descendantTypesIds: Array<Scalars["ID"]>;
    kind: TypeKind;
    owner: User;
    ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>;
    typesOfUnionType: Array<TypeBase>;
    ownerConnection: TypeBaseOwnerConnection;
    typesOfUnionTypeConnection: UnionTypeTypesOfUnionTypeConnection;
  };

/** Allows picking one of a set of types */
export type UnionTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking one of a set of types */
export type UnionTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeArgs = {
  options?: InputMaybe<TypeBaseOptions>;
  where?: InputMaybe<TypeBaseWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>;
};

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionSort>>;
};

export type UnionTypeAggregateSelection = {
  __typename?: "UnionTypeAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UnionTypeEdge = {
  __typename?: "UnionTypeEdge";
  cursor: Scalars["String"];
  node: UnionType;
};

export type UnionTypesConnection = {
  __typename?: "UnionTypesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<UnionTypeEdge>;
};

export type UnionTypeTypesOfUnionTypeConnection = {
  __typename?: "UnionTypeTypesOfUnionTypeConnection";
  edges: Array<UnionTypeTypesOfUnionTypeRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UnionTypeTypesOfUnionTypeRelationship = {
  __typename?: "UnionTypeTypesOfUnionTypeRelationship";
  cursor: Scalars["String"];
  node: TypeBase;
};

export type UnionTypeUserOwnerAggregationSelection = {
  __typename?: "UnionTypeUserOwnerAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<UnionTypeUserOwnerNodeAggregateSelection>;
};

export type UnionTypeUserOwnerNodeAggregateSelection = {
  __typename?: "UnionTypeUserOwnerNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UpdateActionTypesMutationResponse = {
  __typename?: "UpdateActionTypesMutationResponse";
  info: UpdateInfo;
  actionTypes: Array<ActionType>;
};

export type UpdateAppsMutationResponse = {
  __typename?: "UpdateAppsMutationResponse";
  info: UpdateInfo;
  apps: Array<App>;
};

export type UpdateAppTypesMutationResponse = {
  __typename?: "UpdateAppTypesMutationResponse";
  info: UpdateInfo;
  appTypes: Array<AppType>;
};

export type UpdateArrayTypesMutationResponse = {
  __typename?: "UpdateArrayTypesMutationResponse";
  info: UpdateInfo;
  arrayTypes: Array<ArrayType>;
};

export type UpdateAtomsMutationResponse = {
  __typename?: "UpdateAtomsMutationResponse";
  info: UpdateInfo;
  atoms: Array<Atom>;
};

export type UpdateCodeMirrorTypesMutationResponse = {
  __typename?: "UpdateCodeMirrorTypesMutationResponse";
  info: UpdateInfo;
  codeMirrorTypes: Array<CodeMirrorType>;
};

export type UpdateComponentsMutationResponse = {
  __typename?: "UpdateComponentsMutationResponse";
  info: UpdateInfo;
  components: Array<Component>;
};

export type UpdateCreateInfosMutationResponse = {
  __typename?: "UpdateCreateInfosMutationResponse";
  info: UpdateInfo;
  createInfos: Array<CreateInfo>;
};

export type UpdateCustomActionsMutationResponse = {
  __typename?: "UpdateCustomActionsMutationResponse";
  info: UpdateInfo;
  customActions: Array<CustomAction>;
};

export type UpdateDeleteInfosMutationResponse = {
  __typename?: "UpdateDeleteInfosMutationResponse";
  info: UpdateInfo;
  deleteInfos: Array<DeleteInfo>;
};

export type UpdateDomainsMutationResponse = {
  __typename?: "UpdateDomainsMutationResponse";
  info: UpdateInfo;
  domains: Array<Domain>;
};

export type UpdateElementGraphsMutationResponse = {
  __typename?: "UpdateElementGraphsMutationResponse";
  info: UpdateInfo;
  elementGraphs: Array<ElementGraph>;
};

export type UpdateElementsMutationResponse = {
  __typename?: "UpdateElementsMutationResponse";
  info: UpdateInfo;
  elements: Array<Element>;
};

export type UpdateElementTypesMutationResponse = {
  __typename?: "UpdateElementTypesMutationResponse";
  info: UpdateInfo;
  elementTypes: Array<ElementType>;
};

export type UpdateEnumTypesMutationResponse = {
  __typename?: "UpdateEnumTypesMutationResponse";
  info: UpdateInfo;
  enumTypes: Array<EnumType>;
};

export type UpdateEnumTypeValuesMutationResponse = {
  __typename?: "UpdateEnumTypeValuesMutationResponse";
  info: UpdateInfo;
  enumTypeValues: Array<EnumTypeValue>;
};

export type UpdateHooksMutationResponse = {
  __typename?: "UpdateHooksMutationResponse";
  info: UpdateInfo;
  hooks: Array<Hook>;
};

export type UpdateInfo = {
  __typename?: "UpdateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  nodesDeleted: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type UpdateInterfaceTypesMutationResponse = {
  __typename?: "UpdateInterfaceTypesMutationResponse";
  info: UpdateInfo;
  interfaceTypes: Array<InterfaceType>;
};

export type UpdateLambdaTypesMutationResponse = {
  __typename?: "UpdateLambdaTypesMutationResponse";
  info: UpdateInfo;
  lambdaTypes: Array<LambdaType>;
};

export type UpdatePagesMutationResponse = {
  __typename?: "UpdatePagesMutationResponse";
  info: UpdateInfo;
  pages: Array<Page>;
};

export type UpdatePageTypesMutationResponse = {
  __typename?: "UpdatePageTypesMutationResponse";
  info: UpdateInfo;
  pageTypes: Array<PageType>;
};

export type UpdatePipelineActionsMutationResponse = {
  __typename?: "UpdatePipelineActionsMutationResponse";
  info: UpdateInfo;
  pipelineActions: Array<PipelineAction>;
};

export type UpdatePrimitiveTypesMutationResponse = {
  __typename?: "UpdatePrimitiveTypesMutationResponse";
  info: UpdateInfo;
  primitiveTypes: Array<PrimitiveType>;
};

export type UpdatePropMapBindingsMutationResponse = {
  __typename?: "UpdatePropMapBindingsMutationResponse";
  info: UpdateInfo;
  propMapBindings: Array<PropMapBinding>;
};

export type UpdatePropsMutationResponse = {
  __typename?: "UpdatePropsMutationResponse";
  info: UpdateInfo;
  props: Array<Prop>;
};

export type UpdateReactNodeTypesMutationResponse = {
  __typename?: "UpdateReactNodeTypesMutationResponse";
  info: UpdateInfo;
  reactNodeTypes: Array<ReactNodeType>;
};

export type UpdateRenderPropsTypesMutationResponse = {
  __typename?: "UpdateRenderPropsTypesMutationResponse";
  info: UpdateInfo;
  renderPropsTypes: Array<RenderPropsType>;
};

export type UpdateResetDatabaseMutationResponsesMutationResponse = {
  __typename?: "UpdateResetDatabaseMutationResponsesMutationResponse";
  info: UpdateInfo;
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>;
};

export type UpdateResourceActionsMutationResponse = {
  __typename?: "UpdateResourceActionsMutationResponse";
  info: UpdateInfo;
  resourceActions: Array<ResourceAction>;
};

export type UpdateResourcesMutationResponse = {
  __typename?: "UpdateResourcesMutationResponse";
  info: UpdateInfo;
  resources: Array<Resource>;
};

export type UpdateStoresMutationResponse = {
  __typename?: "UpdateStoresMutationResponse";
  info: UpdateInfo;
  stores: Array<Store>;
};

export type UpdateTagGraphOptionsMutationResponse = {
  __typename?: "UpdateTagGraphOptionsMutationResponse";
  info: UpdateInfo;
  tagGraphOptions: Array<TagGraphOptions>;
};

export type UpdateTagGraphsMutationResponse = {
  __typename?: "UpdateTagGraphsMutationResponse";
  info: UpdateInfo;
  tagGraphs: Array<TagGraph>;
};

export type UpdateTagsMutationResponse = {
  __typename?: "UpdateTagsMutationResponse";
  info: UpdateInfo;
  tags: Array<Tag>;
};

export type UpdateTypeReferencesMutationResponse = {
  __typename?: "UpdateTypeReferencesMutationResponse";
  info: UpdateInfo;
  typeReferences: Array<TypeReference>;
};

export type UpdateUnionTypesMutationResponse = {
  __typename?: "UpdateUnionTypesMutationResponse";
  info: UpdateInfo;
  unionTypes: Array<UnionType>;
};

export type UpdateUsersMutationResponse = {
  __typename?: "UpdateUsersMutationResponse";
  info: UpdateInfo;
  users: Array<User>;
};

export type UpdateVercelDomainConfigDataMutationResponse = {
  __typename?: "UpdateVercelDomainConfigDataMutationResponse";
  info: UpdateInfo;
  vercelDomainConfigData: Array<VercelDomainConfigData>;
};

export type UpdateVercelProjectDomainDataMutationResponse = {
  __typename?: "UpdateVercelProjectDomainDataMutationResponse";
  info: UpdateInfo;
  vercelProjectDomainData: Array<VercelProjectDomainData>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  auth0Id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  roles: Array<Role>;
  types: Array<TypeBase>;
  apps: Array<App>;
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>;
  elements: Array<Element>;
  elementsAggregate?: Maybe<UserElementElementsAggregationSelection>;
  components: Array<Component>;
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<UserTagTagsAggregationSelection>;
  typesConnection: UserTypesConnection;
  appsConnection: UserAppsConnection;
  elementsConnection: UserElementsConnection;
  componentsConnection: UserComponentsConnection;
  tagsConnection: UserTagsConnection;
};

export type UserTypesArgs = {
  options?: InputMaybe<TypeBaseOptions>;
  where?: InputMaybe<TypeBaseWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserAppsArgs = {
  where?: InputMaybe<AppWhere>;
  options?: InputMaybe<AppOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserElementsArgs = {
  where?: InputMaybe<ElementWhere>;
  options?: InputMaybe<ElementOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserComponentsArgs = {
  where?: InputMaybe<ComponentWhere>;
  options?: InputMaybe<ComponentOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type UserTypesConnectionArgs = {
  where?: InputMaybe<UserTypesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UserTypesConnectionSort>>;
};

export type UserAppsConnectionArgs = {
  where?: InputMaybe<UserAppsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UserAppsConnectionSort>>;
};

export type UserElementsConnectionArgs = {
  where?: InputMaybe<UserElementsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UserElementsConnectionSort>>;
};

export type UserComponentsConnectionArgs = {
  where?: InputMaybe<UserComponentsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UserComponentsConnectionSort>>;
};

export type UserTagsConnectionArgs = {
  where?: InputMaybe<UserTagsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<UserTagsConnectionSort>>;
};

export type UserAggregateSelection = {
  __typename?: "UserAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  auth0Id: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UserAppAppsAggregationSelection = {
  __typename?: "UserAppAppsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<UserAppAppsNodeAggregateSelection>;
};

export type UserAppAppsNodeAggregateSelection = {
  __typename?: "UserAppAppsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
};

export type UserAppsConnection = {
  __typename?: "UserAppsConnection";
  edges: Array<UserAppsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UserAppsRelationship = {
  __typename?: "UserAppsRelationship";
  cursor: Scalars["String"];
  node: App;
};

export type UserComponentComponentsAggregationSelection = {
  __typename?: "UserComponentComponentsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<UserComponentComponentsNodeAggregateSelection>;
};

export type UserComponentComponentsNodeAggregateSelection = {
  __typename?: "UserComponentComponentsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UserComponentsConnection = {
  __typename?: "UserComponentsConnection";
  edges: Array<UserComponentsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UserComponentsRelationship = {
  __typename?: "UserComponentsRelationship";
  cursor: Scalars["String"];
  node: Component;
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: Scalars["String"];
  node: User;
};

export type UserElementElementsAggregationSelection = {
  __typename?: "UserElementElementsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<UserElementElementsNodeAggregateSelection>;
};

export type UserElementElementsNodeAggregateSelection = {
  __typename?: "UserElementElementsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
  customCss: StringAggregateSelectionNullable;
  guiCss: StringAggregateSelectionNullable;
  propTransformationJs: StringAggregateSelectionNullable;
  renderForEachPropKey: StringAggregateSelectionNullable;
  renderIfPropKey: StringAggregateSelectionNullable;
  preRenderActionId: StringAggregateSelectionNullable;
  postRenderActionId: StringAggregateSelectionNullable;
};

export type UserElementsConnection = {
  __typename?: "UserElementsConnection";
  edges: Array<UserElementsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UserElementsRelationship = {
  __typename?: "UserElementsRelationship";
  cursor: Scalars["String"];
  node: Element;
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type UserTagsConnection = {
  __typename?: "UserTagsConnection";
  edges: Array<UserTagsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UserTagsRelationship = {
  __typename?: "UserTagsRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type UserTagTagsAggregationSelection = {
  __typename?: "UserTagTagsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<UserTagTagsNodeAggregateSelection>;
};

export type UserTagTagsNodeAggregateSelection = {
  __typename?: "UserTagTagsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UserTypesConnection = {
  __typename?: "UserTypesConnection";
  edges: Array<UserTypesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type UserTypesRelationship = {
  __typename?: "UserTypesRelationship";
  cursor: Scalars["String"];
  node: TypeBase;
};

export type VercelDomainConfigData = {
  __typename?: "VercelDomainConfigData";
  misconfigured: Scalars["Boolean"];
};

export type VercelDomainConfigDataAggregateSelection = {
  __typename?: "VercelDomainConfigDataAggregateSelection";
  count: Scalars["Int"];
};

export type VercelDomainConfigDataConnection = {
  __typename?: "VercelDomainConfigDataConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<VercelDomainConfigDataEdge>;
};

export type VercelDomainConfigDataEdge = {
  __typename?: "VercelDomainConfigDataEdge";
  cursor: Scalars["String"];
  node: VercelDomainConfigData;
};

export type VercelProjectDomainData = {
  __typename?: "VercelProjectDomainData";
  verified: Scalars["Boolean"];
};

export type VercelProjectDomainDataAggregateSelection = {
  __typename?: "VercelProjectDomainDataAggregateSelection";
  count: Scalars["Int"];
};

export type VercelProjectDomainDataConnection = {
  __typename?: "VercelProjectDomainDataConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<VercelProjectDomainDataEdge>;
};

export type VercelProjectDomainDataEdge = {
  __typename?: "VercelProjectDomainDataEdge";
  cursor: Scalars["String"];
  node: VercelProjectDomainData;
};

export type WithOwnerOwnerConnection = {
  __typename?: "WithOwnerOwnerConnection";
  edges: Array<WithOwnerOwnerRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type WithOwnerOwnerRelationship = {
  __typename?: "WithOwnerOwnerRelationship";
  cursor: Scalars["String"];
  node: User;
};

export type ActionBaseStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>;
  connect?: InputMaybe<StoreConnectInput>;
};

export type ActionBaseStoreConnectionSort = {
  node?: InputMaybe<StoreSort>;
};

export type ActionBaseStoreConnectionWhere = {
  AND?: InputMaybe<Array<ActionBaseStoreConnectionWhere>>;
  OR?: InputMaybe<Array<ActionBaseStoreConnectionWhere>>;
  node?: InputMaybe<StoreWhere>;
  node_NOT?: InputMaybe<StoreWhere>;
};

export type ActionBaseStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere;
  onCreate: ActionBaseStoreConnectOrCreateFieldInputOnCreate;
};

export type ActionBaseStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput;
};

export type ActionBaseStoreCreateFieldInput = {
  node: StoreCreateInput;
};

export type ActionBaseStoreDeleteFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};

export type ActionBaseStoreDisconnectFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
};

export type ActionBaseStoreFieldInput = {
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>;
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>;
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>;
};

export type ActionBaseStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>;
};

export type ActionBaseStoreUpdateFieldInput = {
  where?: InputMaybe<ActionBaseStoreConnectionWhere>;
  update?: InputMaybe<ActionBaseStoreUpdateConnectionInput>;
  connect?: InputMaybe<ActionBaseStoreConnectFieldInput>;
  disconnect?: InputMaybe<ActionBaseStoreDisconnectFieldInput>;
  create?: InputMaybe<ActionBaseStoreCreateFieldInput>;
  delete?: InputMaybe<ActionBaseStoreDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>;
};

export type ActionsPipeLineCreateInput = {
  orders?: InputMaybe<Array<Scalars["String"]>>;
};

export type ActionsPipeLineSort = {
  orders?: InputMaybe<SortDirection>;
};

export type ActionsPipeLineUpdateInput = {
  orders?: InputMaybe<Array<Scalars["String"]>>;
  orders_POP?: InputMaybe<Scalars["Int"]>;
  orders_PUSH?: InputMaybe<Array<Scalars["String"]>>;
};

export type ActionsPipeLineWhere = {
  OR?: InputMaybe<Array<ActionsPipeLineWhere>>;
  AND?: InputMaybe<Array<ActionsPipeLineWhere>>;
  orders?: InputMaybe<Array<Scalars["String"]>>;
  orders_NOT?: InputMaybe<Array<Scalars["String"]>>;
  orders_INCLUDES?: InputMaybe<Scalars["String"]>;
  orders_NOT_INCLUDES?: InputMaybe<Scalars["String"]>;
};

export type ActionTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type ActionTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type ActionTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type ActionTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type ActionTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type ActionTypeOptions = {
  /** Specify one or more ActionTypeSort objects to sort ActionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ActionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ActionTypeOwnerAggregateInput>>;
  node?: InputMaybe<ActionTypeOwnerNodeAggregationWhereInput>;
};

export type ActionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ActionTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ActionTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort ActionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionTypeSort object. */
export type ActionTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ActionTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type ActionTypeWhere = {
  OR?: InputMaybe<Array<ActionTypeWhere>>;
  AND?: InputMaybe<Array<ActionTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ActionTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type AnyActionWhere = {
  PipelineAction?: InputMaybe<PipelineActionWhere>;
  ResourceAction?: InputMaybe<ResourceActionWhere>;
  CustomAction?: InputMaybe<CustomActionWhere>;
};

export type AppConnectInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>;
  store?: InputMaybe<AppStoreConnectFieldInput>;
  domains?: InputMaybe<Array<AppDomainsConnectFieldInput>>;
};

export type AppConnectOrCreateInput = {
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>;
  store?: InputMaybe<AppStoreConnectOrCreateFieldInput>;
  domains?: InputMaybe<Array<AppDomainsConnectOrCreateFieldInput>>;
};

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere;
};

export type AppConnectWhere = {
  node: AppWhere;
};

export type AppCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
  pages?: InputMaybe<AppPagesFieldInput>;
  store?: InputMaybe<AppStoreFieldInput>;
  domains?: InputMaybe<AppDomainsFieldInput>;
};

export type AppDeleteInput = {
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>;
  store?: InputMaybe<AppStoreDeleteFieldInput>;
  domains?: InputMaybe<Array<AppDomainsDeleteFieldInput>>;
};

export type AppDisconnectInput = {
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>;
  store?: InputMaybe<AppStoreDisconnectFieldInput>;
  domains?: InputMaybe<Array<AppDomainsDisconnectFieldInput>>;
};

export type AppDomainsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AppDomainsAggregateInput>>;
  OR?: InputMaybe<Array<AppDomainsAggregateInput>>;
  node?: InputMaybe<AppDomainsNodeAggregationWhereInput>;
};

export type AppDomainsConnectFieldInput = {
  where?: InputMaybe<DomainConnectWhere>;
  connect?: InputMaybe<Array<DomainConnectInput>>;
};

export type AppDomainsConnectionSort = {
  node?: InputMaybe<DomainSort>;
};

export type AppDomainsConnectionWhere = {
  AND?: InputMaybe<Array<AppDomainsConnectionWhere>>;
  OR?: InputMaybe<Array<AppDomainsConnectionWhere>>;
  node?: InputMaybe<DomainWhere>;
  node_NOT?: InputMaybe<DomainWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type AppOptions = {
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type AppOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AppOwnerAggregateInput>>;
  OR?: InputMaybe<Array<AppOwnerAggregateInput>>;
  node?: InputMaybe<AppOwnerNodeAggregationWhereInput>;
};

export type AppOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type AppPagesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AppPagesAggregateInput>>;
  OR?: InputMaybe<Array<AppPagesAggregateInput>>;
  node?: InputMaybe<AppPagesNodeAggregationWhereInput>;
};

export type AppPagesConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>;
  connect?: InputMaybe<Array<PageConnectInput>>;
};

export type AppPagesConnectionSort = {
  node?: InputMaybe<PageSort>;
};

export type AppPagesConnectionWhere = {
  AND?: InputMaybe<Array<AppPagesConnectionWhere>>;
  OR?: InputMaybe<Array<AppPagesConnectionWhere>>;
  node?: InputMaybe<PageWhere>;
  node_NOT?: InputMaybe<PageWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  store?: InputMaybe<AppStoreCreateFieldInput>;
  domains?: InputMaybe<Array<AppDomainsCreateFieldInput>>;
};

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  slug?: InputMaybe<SortDirection>;
};

export type AppStoreAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AppStoreAggregateInput>>;
  OR?: InputMaybe<Array<AppStoreAggregateInput>>;
  node?: InputMaybe<AppStoreNodeAggregationWhereInput>;
};

export type AppStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>;
  connect?: InputMaybe<StoreConnectInput>;
};

export type AppStoreConnectionSort = {
  node?: InputMaybe<StoreSort>;
};

export type AppStoreConnectionWhere = {
  AND?: InputMaybe<Array<AppStoreConnectionWhere>>;
  OR?: InputMaybe<Array<AppStoreConnectionWhere>>;
  node?: InputMaybe<StoreWhere>;
  node_NOT?: InputMaybe<StoreWhere>;
};

export type AppStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere;
  onCreate: AppStoreConnectOrCreateFieldInputOnCreate;
};

export type AppStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput;
};

export type AppStoreCreateFieldInput = {
  node: StoreCreateInput;
};

export type AppStoreDeleteFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>;
  delete?: InputMaybe<StoreDeleteInput>;
};

export type AppStoreDisconnectFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>;
  disconnect?: InputMaybe<StoreDisconnectInput>;
};

export type AppStoreFieldInput = {
  create?: InputMaybe<AppStoreCreateFieldInput>;
  connect?: InputMaybe<AppStoreConnectFieldInput>;
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>;
};

export type AppStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppStoreNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type AppStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>;
};

export type AppStoreUpdateFieldInput = {
  where?: InputMaybe<AppStoreConnectionWhere>;
  update?: InputMaybe<AppStoreUpdateConnectionInput>;
  connect?: InputMaybe<AppStoreConnectFieldInput>;
  disconnect?: InputMaybe<AppStoreDisconnectFieldInput>;
  create?: InputMaybe<AppStoreCreateFieldInput>;
  delete?: InputMaybe<AppStoreDeleteFieldInput>;
  connectOrCreate?: InputMaybe<AppStoreConnectOrCreateFieldInput>;
};

export type AppTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type AppTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type AppTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type AppTypeOptions = {
  /** Specify one or more AppTypeSort objects to sort AppTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AppTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type AppTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AppTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<AppTypeOwnerAggregateInput>>;
  node?: InputMaybe<AppTypeOwnerNodeAggregationWhereInput>;
};

export type AppTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<AppTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type AppTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type AppTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type AppTypeWhere = {
  OR?: InputMaybe<Array<AppTypeWhere>>;
  AND?: InputMaybe<Array<AppTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type AppUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>;
  store?: InputMaybe<AppStoreUpdateFieldInput>;
  domains?: InputMaybe<Array<AppDomainsUpdateFieldInput>>;
};

export type AppWhere = {
  OR?: InputMaybe<Array<AppWhere>>;
  AND?: InputMaybe<Array<AppWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  slug_NOT?: InputMaybe<Scalars["String"]>;
  slug_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>;
  /** @deprecated Use `pages_SOME` instead. */
  pages?: InputMaybe<PageWhere>;
  /** @deprecated Use `pages_NONE` instead. */
  pages_NOT?: InputMaybe<PageWhere>;
  pagesAggregate?: InputMaybe<AppPagesAggregateInput>;
  /** Return Apps where all of the related Pages match this filter */
  pages_ALL?: InputMaybe<PageWhere>;
  /** Return Apps where none of the related Pages match this filter */
  pages_NONE?: InputMaybe<PageWhere>;
  /** Return Apps where one of the related Pages match this filter */
  pages_SINGLE?: InputMaybe<PageWhere>;
  /** Return Apps where some of the related Pages match this filter */
  pages_SOME?: InputMaybe<PageWhere>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<AppStoreAggregateInput>;
  /** @deprecated Use `domains_SOME` instead. */
  domains?: InputMaybe<DomainWhere>;
  /** @deprecated Use `domains_NONE` instead. */
  domains_NOT?: InputMaybe<DomainWhere>;
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
  /** @deprecated Use `pagesConnection_SOME` instead. */
  pagesConnection?: InputMaybe<AppPagesConnectionWhere>;
  /** @deprecated Use `pagesConnection_NONE` instead. */
  pagesConnection_NOT?: InputMaybe<AppPagesConnectionWhere>;
  pagesConnection_ALL?: InputMaybe<AppPagesConnectionWhere>;
  pagesConnection_NONE?: InputMaybe<AppPagesConnectionWhere>;
  pagesConnection_SINGLE?: InputMaybe<AppPagesConnectionWhere>;
  pagesConnection_SOME?: InputMaybe<AppPagesConnectionWhere>;
  storeConnection?: InputMaybe<AppStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<AppStoreConnectionWhere>;
  /** @deprecated Use `domainsConnection_SOME` instead. */
  domainsConnection?: InputMaybe<AppDomainsConnectionWhere>;
  /** @deprecated Use `domainsConnection_NONE` instead. */
  domainsConnection_NOT?: InputMaybe<AppDomainsConnectionWhere>;
  domainsConnection_ALL?: InputMaybe<AppDomainsConnectionWhere>;
  domainsConnection_NONE?: InputMaybe<AppDomainsConnectionWhere>;
  domainsConnection_SINGLE?: InputMaybe<AppDomainsConnectionWhere>;
  domainsConnection_SOME?: InputMaybe<AppDomainsConnectionWhere>;
};

export type ArrayTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
};

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type ArrayTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeFieldInput>;
};

export type ArrayTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>;
};

export type ArrayTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>;
};

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>;
  where?: InputMaybe<TypeBaseConnectWhere>;
};

export type ArrayTypeItemTypeConnectionSort = {
  node?: InputMaybe<TypeBaseSort>;
};

export type ArrayTypeItemTypeConnectionWhere = {
  AND?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ArrayTypeItemTypeConnectionWhere>>;
  node?: InputMaybe<TypeBaseWhere>;
  node_NOT?: InputMaybe<TypeBaseWhere>;
};

export type ArrayTypeItemTypeCreateFieldInput = {
  node: TypeBaseCreateInput;
};

export type ArrayTypeItemTypeDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeItemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeItemTypeFieldInput = {
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
};

export type ArrayTypeItemTypeUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>;
};

export type ArrayTypeItemTypeUpdateFieldInput = {
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>;
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
  delete?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>;
  disconnect?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>;
  update?: InputMaybe<ArrayTypeItemTypeUpdateConnectionInput>;
  where?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type ArrayTypeOptions = {
  /** Specify one or more ArrayTypeSort objects to sort ArrayTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ArrayTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ArrayTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ArrayTypeOwnerAggregateInput>>;
  node?: InputMaybe<ArrayTypeOwnerNodeAggregationWhereInput>;
};

export type ArrayTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ArrayTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>;
};

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ArrayTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
  itemType?: InputMaybe<ArrayTypeItemTypeUpdateFieldInput>;
};

export type ArrayTypeWhere = {
  OR?: InputMaybe<Array<ArrayTypeWhere>>;
  AND?: InputMaybe<Array<ArrayTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  itemTypeConnection?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
  itemTypeConnection_NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>;
};

export type AtomApiAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AtomApiAggregateInput>>;
  OR?: InputMaybe<Array<AtomApiAggregateInput>>;
  node?: InputMaybe<AtomApiNodeAggregationWhereInput>;
};

export type AtomApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
};

export type AtomApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type AtomApiConnectionWhere = {
  AND?: InputMaybe<Array<AtomApiConnectionWhere>>;
  OR?: InputMaybe<Array<AtomApiConnectionWhere>>;
  node?: InputMaybe<InterfaceTypeWhere>;
  node_NOT?: InputMaybe<InterfaceTypeWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  tags?: InputMaybe<Array<AtomTagsConnectFieldInput>>;
  api?: InputMaybe<AtomApiConnectFieldInput>;
};

export type AtomConnectOrCreateInput = {
  tags?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>;
  api?: InputMaybe<AtomApiConnectOrCreateFieldInput>;
};

export type AtomConnectOrCreateWhere = {
  node: AtomUniqueWhere;
};

export type AtomConnectWhere = {
  node: AtomWhere;
};

export type AtomCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  icon?: InputMaybe<Scalars["String"]>;
  type: AtomType;
  tags?: InputMaybe<AtomTagsFieldInput>;
  api?: InputMaybe<AtomApiFieldInput>;
};

export type AtomDeleteInput = {
  tags?: InputMaybe<Array<AtomTagsDeleteFieldInput>>;
  api?: InputMaybe<AtomApiDeleteFieldInput>;
};

export type AtomDisconnectInput = {
  tags?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>;
  api?: InputMaybe<AtomApiDisconnectFieldInput>;
};

export type AtomOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  icon?: InputMaybe<Scalars["String"]>;
};

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AtomSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type AtomRelationInput = {
  tags?: InputMaybe<Array<AtomTagsCreateFieldInput>>;
  api?: InputMaybe<AtomApiCreateFieldInput>;
};

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  icon?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type AtomTagsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<AtomTagsAggregateInput>>;
  OR?: InputMaybe<Array<AtomTagsAggregateInput>>;
  node?: InputMaybe<AtomTagsNodeAggregationWhereInput>;
};

export type AtomTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
};

export type AtomTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type AtomTagsConnectionWhere = {
  AND?: InputMaybe<Array<AtomTagsConnectionWhere>>;
  OR?: InputMaybe<Array<AtomTagsConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<AtomType>;
};

export type AtomUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  icon?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<AtomType>;
  tags?: InputMaybe<Array<AtomTagsUpdateFieldInput>>;
  api?: InputMaybe<AtomApiUpdateFieldInput>;
};

export type AtomWhere = {
  OR?: InputMaybe<Array<AtomWhere>>;
  AND?: InputMaybe<Array<AtomWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  icon?: InputMaybe<Scalars["String"]>;
  icon_NOT?: InputMaybe<Scalars["String"]>;
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  icon_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  icon_CONTAINS?: InputMaybe<Scalars["String"]>;
  icon_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  icon_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  icon_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<AtomType>;
  type_NOT?: InputMaybe<AtomType>;
  type_IN?: InputMaybe<Array<AtomType>>;
  type_NOT_IN?: InputMaybe<Array<AtomType>>;
  /** @deprecated Use `tags_SOME` instead. */
  tags?: InputMaybe<TagWhere>;
  /** @deprecated Use `tags_NONE` instead. */
  tags_NOT?: InputMaybe<TagWhere>;
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
  /** @deprecated Use `tagsConnection_SOME` instead. */
  tagsConnection?: InputMaybe<AtomTagsConnectionWhere>;
  /** @deprecated Use `tagsConnection_NONE` instead. */
  tagsConnection_NOT?: InputMaybe<AtomTagsConnectionWhere>;
  tagsConnection_ALL?: InputMaybe<AtomTagsConnectionWhere>;
  tagsConnection_NONE?: InputMaybe<AtomTagsConnectionWhere>;
  tagsConnection_SINGLE?: InputMaybe<AtomTagsConnectionWhere>;
  tagsConnection_SOME?: InputMaybe<AtomTagsConnectionWhere>;
  apiConnection?: InputMaybe<AtomApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<AtomApiConnectionWhere>;
};

export type CodeMirrorTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type CodeMirrorTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type CodeMirrorTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  language: CodeMirrorLanguage;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type CodeMirrorTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type CodeMirrorTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type CodeMirrorTypeOptions = {
  /** Specify one or more CodeMirrorTypeSort objects to sort CodeMirrorTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CodeMirrorTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type CodeMirrorTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerAggregateInput>>;
  node?: InputMaybe<CodeMirrorTypeOwnerNodeAggregationWhereInput>;
};

export type CodeMirrorTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CodeMirrorTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type CodeMirrorTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort CodeMirrorTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one CodeMirrorTypeSort object. */
export type CodeMirrorTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  language?: InputMaybe<SortDirection>;
};

export type CodeMirrorTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  language?: InputMaybe<CodeMirrorLanguage>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type CodeMirrorTypeWhere = {
  OR?: InputMaybe<Array<CodeMirrorTypeWhere>>;
  AND?: InputMaybe<Array<CodeMirrorTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  language?: InputMaybe<CodeMirrorLanguage>;
  language_NOT?: InputMaybe<CodeMirrorLanguage>;
  language_IN?: InputMaybe<Array<CodeMirrorLanguage>>;
  language_NOT_IN?: InputMaybe<Array<CodeMirrorLanguage>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<CodeMirrorTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type ComponentApiAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ComponentApiAggregateInput>>;
  OR?: InputMaybe<Array<ComponentApiAggregateInput>>;
  node?: InputMaybe<ComponentApiNodeAggregationWhereInput>;
};

export type ComponentApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
};

export type ComponentApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type ComponentApiConnectionWhere = {
  AND?: InputMaybe<Array<ComponentApiConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentApiConnectionWhere>>;
  node?: InputMaybe<InterfaceTypeWhere>;
  node_NOT?: InputMaybe<InterfaceTypeWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type ComponentConnectInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>;
  api?: InputMaybe<ComponentApiConnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectFieldInput>;
};

export type ComponentConnectOrCreateInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>;
  api?: InputMaybe<ComponentApiConnectOrCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerConnectOrCreateFieldInput>;
};

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere;
};

export type ComponentConnectWhere = {
  node: ComponentWhere;
};

export type ComponentCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  rootElement?: InputMaybe<ComponentRootElementFieldInput>;
  api?: InputMaybe<ComponentApiFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerFieldInput>;
};

export type ComponentDeleteInput = {
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>;
  api?: InputMaybe<ComponentApiDeleteFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDeleteFieldInput>;
};

export type ComponentDisconnectInput = {
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>;
  api?: InputMaybe<ComponentApiDisconnectFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerDisconnectFieldInput>;
};

export type ComponentOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ComponentOptions = {
  /** Specify one or more ComponentSort objects to sort Components by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ComponentSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ComponentOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ComponentOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ComponentOwnerAggregateInput>>;
  node?: InputMaybe<ComponentOwnerNodeAggregationWhereInput>;
};

export type ComponentOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ComponentOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ComponentRelationInput = {
  rootElement?: InputMaybe<ComponentRootElementCreateFieldInput>;
  api?: InputMaybe<ComponentApiCreateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerCreateFieldInput>;
};

export type ComponentRootElementAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ComponentRootElementAggregateInput>>;
  OR?: InputMaybe<Array<ComponentRootElementAggregateInput>>;
  node?: InputMaybe<ComponentRootElementNodeAggregationWhereInput>;
};

export type ComponentRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type ComponentRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ComponentRootElementConnectionWhere = {
  AND?: InputMaybe<Array<ComponentRootElementConnectionWhere>>;
  OR?: InputMaybe<Array<ComponentRootElementConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
};

export type ComponentUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>;
  api?: InputMaybe<ComponentApiUpdateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
};

export type ComponentWhere = {
  OR?: InputMaybe<Array<ComponentWhere>>;
  AND?: InputMaybe<Array<ComponentWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  rootElement?: InputMaybe<ElementWhere>;
  rootElement_NOT?: InputMaybe<ElementWhere>;
  rootElementAggregate?: InputMaybe<ComponentRootElementAggregateInput>;
  api?: InputMaybe<InterfaceTypeWhere>;
  api_NOT?: InputMaybe<InterfaceTypeWhere>;
  apiAggregate?: InputMaybe<ComponentApiAggregateInput>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ComponentOwnerAggregateInput>;
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>;
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>;
  apiConnection?: InputMaybe<ComponentApiConnectionWhere>;
  apiConnection_NOT?: InputMaybe<ComponentApiConnectionWhere>;
  ownerConnection?: InputMaybe<WithOwnerOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<WithOwnerOwnerConnectionWhere>;
};

export type CreateDomainMutationInput = {
  name: Scalars["String"];
  appId: Scalars["String"];
};

export type CreateInfoCreateInput = {
  bookmark?: InputMaybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateInfoOptions = {
  /** Specify one or more CreateInfoSort objects to sort CreateInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CreateInfoSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort CreateInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one CreateInfoSort object. */
export type CreateInfoSort = {
  bookmark?: InputMaybe<SortDirection>;
  nodesCreated?: InputMaybe<SortDirection>;
  relationshipsCreated?: InputMaybe<SortDirection>;
};

export type CreateInfoUpdateInput = {
  bookmark?: InputMaybe<Scalars["String"]>;
  nodesCreated?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated?: InputMaybe<Scalars["Int"]>;
  nodesCreated_INCREMENT?: InputMaybe<Scalars["Int"]>;
  nodesCreated_DECREMENT?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_INCREMENT?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_DECREMENT?: InputMaybe<Scalars["Int"]>;
};

export type CreateInfoWhere = {
  OR?: InputMaybe<Array<CreateInfoWhere>>;
  AND?: InputMaybe<Array<CreateInfoWhere>>;
  bookmark?: InputMaybe<Scalars["String"]>;
  bookmark_NOT?: InputMaybe<Scalars["String"]>;
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  bookmark_CONTAINS?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  bookmark_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  nodesCreated?: InputMaybe<Scalars["Int"]>;
  nodesCreated_NOT?: InputMaybe<Scalars["Int"]>;
  nodesCreated_IN?: InputMaybe<Array<Scalars["Int"]>>;
  nodesCreated_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  nodesCreated_LT?: InputMaybe<Scalars["Int"]>;
  nodesCreated_LTE?: InputMaybe<Scalars["Int"]>;
  nodesCreated_GT?: InputMaybe<Scalars["Int"]>;
  nodesCreated_GTE?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_NOT?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_IN?: InputMaybe<Array<Scalars["Int"]>>;
  relationshipsCreated_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  relationshipsCreated_LT?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_LTE?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_GT?: InputMaybe<Scalars["Int"]>;
  relationshipsCreated_GTE?: InputMaybe<Scalars["Int"]>;
};

export type CustomActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>;
};

export type CustomActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>;
};

export type CustomActionConnectOrCreateWhere = {
  node: CustomActionUniqueWhere;
};

export type CustomActionConnectWhere = {
  node: CustomActionWhere;
};

export type CustomActionCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
  code: Scalars["String"];
  type?: ActionKind;
  store?: InputMaybe<ActionBaseStoreFieldInput>;
};

export type CustomActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>;
};

export type CustomActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>;
};

export type CustomActionOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
  code: Scalars["String"];
};

export type CustomActionOptions = {
  /** Specify one or more CustomActionSort objects to sort CustomActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CustomActionSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type CustomActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>;
};

/** Fields to sort CustomActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one CustomActionSort object. */
export type CustomActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  runOnInit?: InputMaybe<SortDirection>;
  code?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type CustomActionStoreAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<CustomActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<CustomActionStoreAggregateInput>>;
  node?: InputMaybe<CustomActionStoreNodeAggregationWhereInput>;
};

export type CustomActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CustomActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CustomActionStoreNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type CustomActionUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type CustomActionUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  code?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ActionKind>;
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>;
};

export type CustomActionWhere = {
  OR?: InputMaybe<Array<CustomActionWhere>>;
  AND?: InputMaybe<Array<CustomActionWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  runOnInit_NOT?: InputMaybe<Scalars["Boolean"]>;
  code?: InputMaybe<Scalars["String"]>;
  code_NOT?: InputMaybe<Scalars["String"]>;
  code_IN?: InputMaybe<Array<Scalars["String"]>>;
  code_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  code_CONTAINS?: InputMaybe<Scalars["String"]>;
  code_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  code_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  code_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  code_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  code_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ActionKind>;
  type_NOT?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  type_NOT_IN?: InputMaybe<Array<ActionKind>>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<CustomActionStoreAggregateInput>;
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>;
};

export type DeleteInfoCreateInput = {
  bookmark?: InputMaybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type DeleteInfoOptions = {
  /** Specify one or more DeleteInfoSort objects to sort DeleteInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteInfoSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort DeleteInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteInfoSort object. */
export type DeleteInfoSort = {
  bookmark?: InputMaybe<SortDirection>;
  nodesDeleted?: InputMaybe<SortDirection>;
  relationshipsDeleted?: InputMaybe<SortDirection>;
};

export type DeleteInfoUpdateInput = {
  bookmark?: InputMaybe<Scalars["String"]>;
  nodesDeleted?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_INCREMENT?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_DECREMENT?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_INCREMENT?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_DECREMENT?: InputMaybe<Scalars["Int"]>;
};

export type DeleteInfoWhere = {
  OR?: InputMaybe<Array<DeleteInfoWhere>>;
  AND?: InputMaybe<Array<DeleteInfoWhere>>;
  bookmark?: InputMaybe<Scalars["String"]>;
  bookmark_NOT?: InputMaybe<Scalars["String"]>;
  bookmark_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  bookmark_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  bookmark_CONTAINS?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  bookmark_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  bookmark_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  nodesDeleted?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_NOT?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_IN?: InputMaybe<Array<Scalars["Int"]>>;
  nodesDeleted_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  nodesDeleted_LT?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_LTE?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_GT?: InputMaybe<Scalars["Int"]>;
  nodesDeleted_GTE?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_NOT?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_IN?: InputMaybe<Array<Scalars["Int"]>>;
  relationshipsDeleted_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  relationshipsDeleted_LT?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_LTE?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_GT?: InputMaybe<Scalars["Int"]>;
  relationshipsDeleted_GTE?: InputMaybe<Scalars["Int"]>;
};

export type DomainAppAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<DomainAppAggregateInput>>;
  OR?: InputMaybe<Array<DomainAppAggregateInput>>;
  node?: InputMaybe<DomainAppNodeAggregationWhereInput>;
};

export type DomainAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<AppConnectInput>;
};

export type DomainAppConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type DomainAppConnectionWhere = {
  AND?: InputMaybe<Array<DomainAppConnectionWhere>>;
  OR?: InputMaybe<Array<DomainAppConnectionWhere>>;
  node?: InputMaybe<AppWhere>;
  node_NOT?: InputMaybe<AppWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id: Scalars["ID"];
  name: Scalars["String"];
  app?: InputMaybe<DomainAppFieldInput>;
};

export type DomainDeleteInput = {
  app?: InputMaybe<DomainAppDeleteFieldInput>;
};

export type DomainDisconnectInput = {
  app?: InputMaybe<DomainAppDisconnectFieldInput>;
};

export type DomainOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type DomainOptions = {
  /** Specify one or more DomainSort objects to sort Domains by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DomainSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
};

export type DomainUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  app?: InputMaybe<DomainAppUpdateFieldInput>;
};

export type DomainWhere = {
  OR?: InputMaybe<Array<DomainWhere>>;
  AND?: InputMaybe<Array<DomainWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  app?: InputMaybe<AppWhere>;
  app_NOT?: InputMaybe<AppWhere>;
  appAggregate?: InputMaybe<DomainAppAggregateInput>;
  appConnection?: InputMaybe<DomainAppConnectionWhere>;
  appConnection_NOT?: InputMaybe<DomainAppConnectionWhere>;
};

export type ElementAtomRenderTypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementAtomRenderTypeAggregateInput>>;
  OR?: InputMaybe<Array<ElementAtomRenderTypeAggregateInput>>;
  node?: InputMaybe<ElementAtomRenderTypeNodeAggregationWhereInput>;
};

export type ElementAtomRenderTypeConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<AtomConnectInput>;
};

export type ElementAtomRenderTypeConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type ElementAtomRenderTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementAtomRenderTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ElementAtomRenderTypeConnectionWhere>>;
  node?: InputMaybe<AtomWhere>;
  node_NOT?: InputMaybe<AtomWhere>;
};

export type ElementAtomRenderTypeConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere;
  onCreate: ElementAtomRenderTypeConnectOrCreateFieldInputOnCreate;
};

export type ElementAtomRenderTypeConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput;
};

export type ElementAtomRenderTypeCreateFieldInput = {
  node: AtomCreateInput;
};

export type ElementAtomRenderTypeDeleteFieldInput = {
  where?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  delete?: InputMaybe<AtomDeleteInput>;
};

export type ElementAtomRenderTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  disconnect?: InputMaybe<AtomDisconnectInput>;
};

export type ElementAtomRenderTypeFieldInput = {
  create?: InputMaybe<ElementAtomRenderTypeCreateFieldInput>;
  connect?: InputMaybe<ElementAtomRenderTypeConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementAtomRenderTypeConnectOrCreateFieldInput>;
};

export type ElementAtomRenderTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementAtomRenderTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementAtomRenderTypeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  icon_EQUAL?: InputMaybe<Scalars["String"]>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  icon_GT?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  icon_GTE?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  icon_LT?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  icon_LTE?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementAtomRenderTypeUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>;
};

export type ElementAtomRenderTypeUpdateFieldInput = {
  where?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  update?: InputMaybe<ElementAtomRenderTypeUpdateConnectionInput>;
  connect?: InputMaybe<ElementAtomRenderTypeConnectFieldInput>;
  disconnect?: InputMaybe<ElementAtomRenderTypeDisconnectFieldInput>;
  create?: InputMaybe<ElementAtomRenderTypeCreateFieldInput>;
  delete?: InputMaybe<ElementAtomRenderTypeDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementAtomRenderTypeConnectOrCreateFieldInput>;
};

export type ElementChildrenAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementChildrenAggregateInput>>;
  OR?: InputMaybe<Array<ElementChildrenAggregateInput>>;
  node?: InputMaybe<ElementChildrenNodeAggregationWhereInput>;
  edge?: InputMaybe<ElementChildrenEdgeAggregationWhereInput>;
};

export type ElementChildrenConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<Array<ElementConnectInput>>;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementChildrenConnectionSort = {
  edge?: InputMaybe<ParentOfElementSort>;
  node?: InputMaybe<ElementSort>;
};

export type ElementChildrenConnectionWhere = {
  AND?: InputMaybe<Array<ElementChildrenConnectionWhere>>;
  OR?: InputMaybe<Array<ElementChildrenConnectionWhere>>;
  edge?: InputMaybe<ParentOfElementWhere>;
  edge_NOT?: InputMaybe<ParentOfElementWhere>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
};

export type ElementChildrenConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate;
};

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementChildrenDeleteFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementChildrenDisconnectFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementChildrenEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>;
  order_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  order_MIN_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_MAX_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_SUM_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_GT?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  order_MIN_GT?: InputMaybe<Scalars["Int"]>;
  order_MAX_GT?: InputMaybe<Scalars["Int"]>;
  order_SUM_GT?: InputMaybe<Scalars["Int"]>;
  order_GTE?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  order_MIN_GTE?: InputMaybe<Scalars["Int"]>;
  order_MAX_GTE?: InputMaybe<Scalars["Int"]>;
  order_SUM_GTE?: InputMaybe<Scalars["Int"]>;
  order_LT?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  order_MIN_LT?: InputMaybe<Scalars["Int"]>;
  order_MAX_LT?: InputMaybe<Scalars["Int"]>;
  order_SUM_LT?: InputMaybe<Scalars["Int"]>;
  order_LTE?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  order_MIN_LTE?: InputMaybe<Scalars["Int"]>;
  order_MAX_LTE?: InputMaybe<Scalars["Int"]>;
  order_SUM_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementChildrenFieldInput = {
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>;
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>;
};

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementChildrenUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
  edge?: InputMaybe<ParentOfElementUpdateInput>;
};

export type ElementChildrenUpdateFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>;
  update?: InputMaybe<ElementChildrenUpdateConnectionInput>;
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>;
  disconnect?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>;
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>;
  delete?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>;
};

export type ElementComponentRenderTypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementComponentRenderTypeAggregateInput>>;
  OR?: InputMaybe<Array<ElementComponentRenderTypeAggregateInput>>;
  node?: InputMaybe<ElementComponentRenderTypeNodeAggregationWhereInput>;
};

export type ElementComponentRenderTypeConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<ComponentConnectInput>;
};

export type ElementComponentRenderTypeConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type ElementComponentRenderTypeConnectionWhere = {
  AND?: InputMaybe<Array<ElementComponentRenderTypeConnectionWhere>>;
  OR?: InputMaybe<Array<ElementComponentRenderTypeConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
  node_NOT?: InputMaybe<ComponentWhere>;
};

export type ElementComponentRenderTypeConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere;
  onCreate: ElementComponentRenderTypeConnectOrCreateFieldInputOnCreate;
};

export type ElementComponentRenderTypeConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput;
};

export type ElementComponentRenderTypeCreateFieldInput = {
  node: ComponentCreateInput;
};

export type ElementComponentRenderTypeDeleteFieldInput = {
  where?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  delete?: InputMaybe<ComponentDeleteInput>;
};

export type ElementComponentRenderTypeDisconnectFieldInput = {
  where?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  disconnect?: InputMaybe<ComponentDisconnectInput>;
};

export type ElementComponentRenderTypeFieldInput = {
  create?: InputMaybe<ElementComponentRenderTypeCreateFieldInput>;
  connect?: InputMaybe<ElementComponentRenderTypeConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementComponentRenderTypeConnectOrCreateFieldInput>;
};

export type ElementComponentRenderTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementComponentRenderTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementComponentRenderTypeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementComponentRenderTypeUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>;
};

export type ElementComponentRenderTypeUpdateFieldInput = {
  where?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  update?: InputMaybe<ElementComponentRenderTypeUpdateConnectionInput>;
  connect?: InputMaybe<ElementComponentRenderTypeConnectFieldInput>;
  disconnect?: InputMaybe<ElementComponentRenderTypeDisconnectFieldInput>;
  create?: InputMaybe<ElementComponentRenderTypeCreateFieldInput>;
  delete?: InputMaybe<ElementComponentRenderTypeDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementComponentRenderTypeConnectOrCreateFieldInput>;
};

export type ElementConnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingConnectFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildConnectFieldInput>;
  parent?: InputMaybe<ElementParentConnectFieldInput>;
  children?: InputMaybe<Array<ElementChildrenConnectFieldInput>>;
  page?: InputMaybe<ElementPageConnectFieldInput>;
  props?: InputMaybe<ElementPropsConnectFieldInput>;
  parentElement?: InputMaybe<ElementParentElementConnectFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentConnectFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeConnectFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeConnectFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksConnectFieldInput>>;
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>;
};

export type ElementConnectOrCreateInput = {
  nextSibling?: InputMaybe<ElementNextSiblingConnectOrCreateFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingConnectOrCreateFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildConnectOrCreateFieldInput>;
  parent?: InputMaybe<ElementParentConnectOrCreateFieldInput>;
  children?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>;
  page?: InputMaybe<ElementPageConnectOrCreateFieldInput>;
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>;
  parentElement?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentConnectOrCreateFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeConnectOrCreateFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeConnectOrCreateFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>;
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >;
};

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere;
};

export type ElementConnectWhere = {
  node: ElementWhere;
};

export type ElementCreateInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  customCss?: InputMaybe<Scalars["String"]>;
  guiCss?: InputMaybe<Scalars["String"]>;
  propTransformationJs?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey?: InputMaybe<Scalars["String"]>;
  renderIfPropKey?: InputMaybe<Scalars["String"]>;
  preRenderActionId?: InputMaybe<Scalars["String"]>;
  postRenderActionId?: InputMaybe<Scalars["String"]>;
  nextSibling?: InputMaybe<ElementNextSiblingFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildFieldInput>;
  parent?: InputMaybe<ElementParentFieldInput>;
  children?: InputMaybe<ElementChildrenFieldInput>;
  page?: InputMaybe<ElementPageFieldInput>;
  props?: InputMaybe<ElementPropsFieldInput>;
  parentElement?: InputMaybe<ElementParentElementFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeFieldInput>;
  hooks?: InputMaybe<ElementHooksFieldInput>;
  propMapBindings?: InputMaybe<ElementPropMapBindingsFieldInput>;
};

export type ElementDeleteInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDeleteFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingDeleteFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildDeleteFieldInput>;
  parent?: InputMaybe<ElementParentDeleteFieldInput>;
  children?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>;
  page?: InputMaybe<ElementPageDeleteFieldInput>;
  props?: InputMaybe<ElementPropsDeleteFieldInput>;
  parentElement?: InputMaybe<ElementParentElementDeleteFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentDeleteFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeDeleteFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeDeleteFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksDeleteFieldInput>>;
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>;
};

export type ElementDisconnectInput = {
  nextSibling?: InputMaybe<ElementNextSiblingDisconnectFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingDisconnectFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildDisconnectFieldInput>;
  parent?: InputMaybe<ElementParentDisconnectFieldInput>;
  children?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>;
  page?: InputMaybe<ElementPageDisconnectFieldInput>;
  props?: InputMaybe<ElementPropsDisconnectFieldInput>;
  parentElement?: InputMaybe<ElementParentElementDisconnectFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentDisconnectFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeDisconnectFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeDisconnectFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>;
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsDisconnectFieldInput>
  >;
};

export type ElementFirstChildAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementFirstChildAggregateInput>>;
  OR?: InputMaybe<Array<ElementFirstChildAggregateInput>>;
  node?: InputMaybe<ElementFirstChildNodeAggregationWhereInput>;
};

export type ElementFirstChildConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type ElementFirstChildConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementFirstChildConnectionWhere = {
  AND?: InputMaybe<Array<ElementFirstChildConnectionWhere>>;
  OR?: InputMaybe<Array<ElementFirstChildConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type ElementGraphCreateInput = {
  id: Scalars["ID"];
  descendants: Array<Scalars["ID"]>;
};

export type ElementGraphInput = {
  rootId: Scalars["String"];
};

export type ElementGraphOptions = {
  /** Specify one or more ElementGraphSort objects to sort ElementGraphs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementGraphSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort ElementGraphs by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementGraphSort object. */
export type ElementGraphSort = {
  id?: InputMaybe<SortDirection>;
};

export type ElementGraphUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  descendants?: InputMaybe<Array<Scalars["ID"]>>;
  descendants_POP?: InputMaybe<Scalars["Int"]>;
  descendants_PUSH?: InputMaybe<Array<Scalars["ID"]>>;
};

export type ElementGraphWhere = {
  OR?: InputMaybe<Array<ElementGraphWhere>>;
  AND?: InputMaybe<Array<ElementGraphWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  descendants?: InputMaybe<Array<Scalars["ID"]>>;
  descendants_NOT?: InputMaybe<Array<Scalars["ID"]>>;
  descendants_INCLUDES?: InputMaybe<Scalars["ID"]>;
  descendants_NOT_INCLUDES?: InputMaybe<Scalars["ID"]>;
};

export type ElementHooksAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementHooksAggregateInput>>;
  OR?: InputMaybe<Array<ElementHooksAggregateInput>>;
  node?: InputMaybe<ElementHooksNodeAggregationWhereInput>;
};

export type ElementHooksConnectFieldInput = {
  where?: InputMaybe<HookConnectWhere>;
  connect?: InputMaybe<Array<HookConnectInput>>;
};

export type ElementHooksConnectionSort = {
  node?: InputMaybe<HookSort>;
};

export type ElementHooksConnectionWhere = {
  AND?: InputMaybe<Array<ElementHooksConnectionWhere>>;
  OR?: InputMaybe<Array<ElementHooksConnectionWhere>>;
  node?: InputMaybe<HookWhere>;
  node_NOT?: InputMaybe<HookWhere>;
};

export type ElementHooksConnectOrCreateFieldInput = {
  where: HookConnectOrCreateWhere;
  onCreate: ElementHooksConnectOrCreateFieldInputOnCreate;
};

export type ElementHooksConnectOrCreateFieldInputOnCreate = {
  node: HookOnCreateInput;
};

export type ElementHooksCreateFieldInput = {
  node: HookCreateInput;
};

export type ElementHooksDeleteFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>;
  delete?: InputMaybe<HookDeleteInput>;
};

export type ElementHooksDisconnectFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>;
  disconnect?: InputMaybe<HookDisconnectInput>;
};

export type ElementHooksFieldInput = {
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>;
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>;
};

export type ElementHooksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementHooksNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
};

export type ElementHooksUpdateConnectionInput = {
  node?: InputMaybe<HookUpdateInput>;
};

export type ElementHooksUpdateFieldInput = {
  where?: InputMaybe<ElementHooksConnectionWhere>;
  update?: InputMaybe<ElementHooksUpdateConnectionInput>;
  connect?: InputMaybe<Array<ElementHooksConnectFieldInput>>;
  disconnect?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>;
  create?: InputMaybe<Array<ElementHooksCreateFieldInput>>;
  delete?: InputMaybe<Array<ElementHooksDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>;
};

export type ElementNextSiblingAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementNextSiblingAggregateInput>>;
  OR?: InputMaybe<Array<ElementNextSiblingAggregateInput>>;
  node?: InputMaybe<ElementNextSiblingNodeAggregationWhereInput>;
};

export type ElementNextSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type ElementNextSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementNextSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<ElementNextSiblingConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  customCss?: InputMaybe<Scalars["String"]>;
  guiCss?: InputMaybe<Scalars["String"]>;
  propTransformationJs?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey?: InputMaybe<Scalars["String"]>;
  renderIfPropKey?: InputMaybe<Scalars["String"]>;
  preRenderActionId?: InputMaybe<Scalars["String"]>;
  postRenderActionId?: InputMaybe<Scalars["String"]>;
};

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ElementPageAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementPageAggregateInput>>;
  OR?: InputMaybe<Array<ElementPageAggregateInput>>;
  node?: InputMaybe<ElementPageNodeAggregationWhereInput>;
};

export type ElementPageConnectFieldInput = {
  where?: InputMaybe<PageConnectWhere>;
  connect?: InputMaybe<PageConnectInput>;
};

export type ElementPageConnectionSort = {
  node?: InputMaybe<PageSort>;
};

export type ElementPageConnectionWhere = {
  AND?: InputMaybe<Array<ElementPageConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPageConnectionWhere>>;
  node?: InputMaybe<PageWhere>;
  node_NOT?: InputMaybe<PageWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementParentAggregateInput>>;
  OR?: InputMaybe<Array<ElementParentAggregateInput>>;
  node?: InputMaybe<ElementParentNodeAggregationWhereInput>;
};

export type ElementParentComponentAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementParentComponentAggregateInput>>;
  OR?: InputMaybe<Array<ElementParentComponentAggregateInput>>;
  node?: InputMaybe<ElementParentComponentNodeAggregationWhereInput>;
};

export type ElementParentComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<ComponentConnectInput>;
};

export type ElementParentComponentConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type ElementParentComponentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentComponentConnectionWhere>>;
  OR?: InputMaybe<Array<ElementParentComponentConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
  node_NOT?: InputMaybe<ComponentWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
};

export type ElementParentConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementParentConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentConnectionWhere>>;
  OR?: InputMaybe<Array<ElementParentConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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

export type ElementParentElementAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementParentElementAggregateInput>>;
  OR?: InputMaybe<Array<ElementParentElementAggregateInput>>;
  node?: InputMaybe<ElementParentElementNodeAggregationWhereInput>;
  edge?: InputMaybe<ElementParentElementEdgeAggregationWhereInput>;
};

export type ElementParentElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementParentElementConnectionSort = {
  edge?: InputMaybe<ParentOfElementSort>;
  node?: InputMaybe<ElementSort>;
};

export type ElementParentElementConnectionWhere = {
  AND?: InputMaybe<Array<ElementParentElementConnectionWhere>>;
  OR?: InputMaybe<Array<ElementParentElementConnectionWhere>>;
  edge?: InputMaybe<ParentOfElementWhere>;
  edge_NOT?: InputMaybe<ParentOfElementWhere>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
};

export type ElementParentElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: ElementParentElementConnectOrCreateFieldInputOnCreate;
};

export type ElementParentElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementParentElementCreateFieldInput = {
  node: ElementCreateInput;
  edge?: InputMaybe<ParentOfElementCreateInput>;
};

export type ElementParentElementDeleteFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type ElementParentElementDisconnectFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type ElementParentElementEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>;
  order_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  order_MIN_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_MAX_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_SUM_EQUAL?: InputMaybe<Scalars["Int"]>;
  order_GT?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  order_MIN_GT?: InputMaybe<Scalars["Int"]>;
  order_MAX_GT?: InputMaybe<Scalars["Int"]>;
  order_SUM_GT?: InputMaybe<Scalars["Int"]>;
  order_GTE?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  order_MIN_GTE?: InputMaybe<Scalars["Int"]>;
  order_MAX_GTE?: InputMaybe<Scalars["Int"]>;
  order_SUM_GTE?: InputMaybe<Scalars["Int"]>;
  order_LT?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  order_MIN_LT?: InputMaybe<Scalars["Int"]>;
  order_MAX_LT?: InputMaybe<Scalars["Int"]>;
  order_SUM_LT?: InputMaybe<Scalars["Int"]>;
  order_LTE?: InputMaybe<Scalars["Int"]>;
  order_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  order_MIN_LTE?: InputMaybe<Scalars["Int"]>;
  order_MAX_LTE?: InputMaybe<Scalars["Int"]>;
  order_SUM_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementParentElementFieldInput = {
  create?: InputMaybe<ElementParentElementCreateFieldInput>;
  connect?: InputMaybe<ElementParentElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>;
};

export type ElementParentElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementParentElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
  edge?: InputMaybe<ParentOfElementUpdateInput>;
};

export type ElementParentElementUpdateFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>;
  update?: InputMaybe<ElementParentElementUpdateConnectionInput>;
  connect?: InputMaybe<ElementParentElementConnectFieldInput>;
  disconnect?: InputMaybe<ElementParentElementDisconnectFieldInput>;
  create?: InputMaybe<ElementParentElementCreateFieldInput>;
  delete?: InputMaybe<ElementParentElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>;
};

export type ElementParentFieldInput = {
  create?: InputMaybe<ElementParentCreateFieldInput>;
  connect?: InputMaybe<ElementParentConnectFieldInput>;
  connectOrCreate?: InputMaybe<ElementParentConnectOrCreateFieldInput>;
};

export type ElementParentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementParentNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type ElementPrevSiblingAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>;
  OR?: InputMaybe<Array<ElementPrevSiblingAggregateInput>>;
  node?: InputMaybe<ElementPrevSiblingNodeAggregationWhereInput>;
};

export type ElementPrevSiblingConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type ElementPrevSiblingConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type ElementPrevSiblingConnectionWhere = {
  AND?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPrevSiblingConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type ElementPropMapBindingsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>;
  OR?: InputMaybe<Array<ElementPropMapBindingsAggregateInput>>;
  node?: InputMaybe<ElementPropMapBindingsNodeAggregationWhereInput>;
};

export type ElementPropMapBindingsConnectFieldInput = {
  where?: InputMaybe<PropMapBindingConnectWhere>;
  connect?: InputMaybe<Array<PropMapBindingConnectInput>>;
};

export type ElementPropMapBindingsConnectionSort = {
  node?: InputMaybe<PropMapBindingSort>;
};

export type ElementPropMapBindingsConnectionWhere = {
  AND?: InputMaybe<Array<ElementPropMapBindingsConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPropMapBindingsConnectionWhere>>;
  node?: InputMaybe<PropMapBindingWhere>;
  node_NOT?: InputMaybe<PropMapBindingWhere>;
};

export type ElementPropMapBindingsConnectOrCreateFieldInput = {
  where: PropMapBindingConnectOrCreateWhere;
  onCreate: ElementPropMapBindingsConnectOrCreateFieldInputOnCreate;
};

export type ElementPropMapBindingsConnectOrCreateFieldInputOnCreate = {
  node: PropMapBindingOnCreateInput;
};

export type ElementPropMapBindingsCreateFieldInput = {
  node: PropMapBindingCreateInput;
};

export type ElementPropMapBindingsDeleteFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  delete?: InputMaybe<PropMapBindingDeleteInput>;
};

export type ElementPropMapBindingsDisconnectFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  disconnect?: InputMaybe<PropMapBindingDisconnectInput>;
};

export type ElementPropMapBindingsFieldInput = {
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>;
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >;
};

export type ElementPropMapBindingsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  sourceKey_EQUAL?: InputMaybe<Scalars["String"]>;
  sourceKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  sourceKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  sourceKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  sourceKey_GT?: InputMaybe<Scalars["Int"]>;
  sourceKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  sourceKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  sourceKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  sourceKey_GTE?: InputMaybe<Scalars["Int"]>;
  sourceKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  sourceKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  sourceKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  sourceKey_LT?: InputMaybe<Scalars["Int"]>;
  sourceKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  sourceKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  sourceKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  sourceKey_LTE?: InputMaybe<Scalars["Int"]>;
  sourceKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  sourceKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  sourceKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  targetKey_EQUAL?: InputMaybe<Scalars["String"]>;
  targetKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  targetKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  targetKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  targetKey_GT?: InputMaybe<Scalars["Int"]>;
  targetKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  targetKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  targetKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  targetKey_GTE?: InputMaybe<Scalars["Int"]>;
  targetKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  targetKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  targetKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  targetKey_LT?: InputMaybe<Scalars["Int"]>;
  targetKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  targetKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  targetKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  targetKey_LTE?: InputMaybe<Scalars["Int"]>;
  targetKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  targetKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  targetKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementPropMapBindingsUpdateConnectionInput = {
  node?: InputMaybe<PropMapBindingUpdateInput>;
};

export type ElementPropMapBindingsUpdateFieldInput = {
  where?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  update?: InputMaybe<ElementPropMapBindingsUpdateConnectionInput>;
  connect?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<ElementPropMapBindingsDisconnectFieldInput>>;
  create?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>;
  delete?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >;
};

export type ElementPropsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementPropsAggregateInput>>;
  OR?: InputMaybe<Array<ElementPropsAggregateInput>>;
  node?: InputMaybe<ElementPropsNodeAggregationWhereInput>;
};

export type ElementPropsConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
};

export type ElementPropsConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ElementPropsConnectionWhere = {
  AND?: InputMaybe<Array<ElementPropsConnectionWhere>>;
  OR?: InputMaybe<Array<ElementPropsConnectionWhere>>;
  node?: InputMaybe<PropWhere>;
  node_NOT?: InputMaybe<PropWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  data_EQUAL?: InputMaybe<Scalars["String"]>;
  data_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_GT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  data_GTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_LT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  data_LTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  children?: InputMaybe<Array<ElementChildrenCreateFieldInput>>;
  page?: InputMaybe<ElementPageCreateFieldInput>;
  props?: InputMaybe<ElementPropsCreateFieldInput>;
  parentElement?: InputMaybe<ElementParentElementCreateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentCreateFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeCreateFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeCreateFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksCreateFieldInput>>;
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>;
};

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  customCss?: InputMaybe<SortDirection>;
  guiCss?: InputMaybe<SortDirection>;
  propTransformationJs?: InputMaybe<SortDirection>;
  renderForEachPropKey?: InputMaybe<SortDirection>;
  renderIfPropKey?: InputMaybe<SortDirection>;
  preRenderActionId?: InputMaybe<SortDirection>;
  postRenderActionId?: InputMaybe<SortDirection>;
};

export type ElementTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type ElementTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  elementKind: ElementTypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type ElementTypeOptions = {
  /** Specify one or more ElementTypeSort objects to sort ElementTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ElementTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ElementTypeOwnerAggregateInput>>;
  node?: InputMaybe<ElementTypeOwnerNodeAggregationWhereInput>;
};

export type ElementTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ElementTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  elementKind?: InputMaybe<SortDirection>;
};

export type ElementTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  elementKind?: InputMaybe<ElementTypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type ElementTypeWhere = {
  OR?: InputMaybe<Array<ElementTypeWhere>>;
  AND?: InputMaybe<Array<ElementTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  elementKind?: InputMaybe<ElementTypeKind>;
  elementKind_NOT?: InputMaybe<ElementTypeKind>;
  elementKind_IN?: InputMaybe<Array<ElementTypeKind>>;
  elementKind_NOT_IN?: InputMaybe<Array<ElementTypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type ElementUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  customCss?: InputMaybe<Scalars["String"]>;
  guiCss?: InputMaybe<Scalars["String"]>;
  propTransformationJs?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey?: InputMaybe<Scalars["String"]>;
  renderIfPropKey?: InputMaybe<Scalars["String"]>;
  preRenderActionId?: InputMaybe<Scalars["String"]>;
  postRenderActionId?: InputMaybe<Scalars["String"]>;
  nextSibling?: InputMaybe<ElementNextSiblingUpdateFieldInput>;
  prevSibling?: InputMaybe<ElementPrevSiblingUpdateFieldInput>;
  firstChild?: InputMaybe<ElementFirstChildUpdateFieldInput>;
  parent?: InputMaybe<ElementParentUpdateFieldInput>;
  children?: InputMaybe<Array<ElementChildrenUpdateFieldInput>>;
  page?: InputMaybe<ElementPageUpdateFieldInput>;
  props?: InputMaybe<ElementPropsUpdateFieldInput>;
  parentElement?: InputMaybe<ElementParentElementUpdateFieldInput>;
  parentComponent?: InputMaybe<ElementParentComponentUpdateFieldInput>;
  componentRenderType?: InputMaybe<ElementComponentRenderTypeUpdateFieldInput>;
  atomRenderType?: InputMaybe<ElementAtomRenderTypeUpdateFieldInput>;
  hooks?: InputMaybe<Array<ElementHooksUpdateFieldInput>>;
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsUpdateFieldInput>>;
};

export type ElementWhere = {
  OR?: InputMaybe<Array<ElementWhere>>;
  AND?: InputMaybe<Array<ElementWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  customCss?: InputMaybe<Scalars["String"]>;
  customCss_NOT?: InputMaybe<Scalars["String"]>;
  customCss_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  customCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  customCss_CONTAINS?: InputMaybe<Scalars["String"]>;
  customCss_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  customCss_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  customCss_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  customCss_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  customCss_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  guiCss?: InputMaybe<Scalars["String"]>;
  guiCss_NOT?: InputMaybe<Scalars["String"]>;
  guiCss_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  guiCss_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  guiCss_CONTAINS?: InputMaybe<Scalars["String"]>;
  guiCss_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  guiCss_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  guiCss_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  guiCss_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  guiCss_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  propTransformationJs?: InputMaybe<Scalars["String"]>;
  propTransformationJs_NOT?: InputMaybe<Scalars["String"]>;
  propTransformationJs_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  propTransformationJs_NOT_IN?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>>
  >;
  propTransformationJs_CONTAINS?: InputMaybe<Scalars["String"]>;
  propTransformationJs_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  propTransformationJs_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  propTransformationJs_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  propTransformationJs_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  propTransformationJs_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_NOT?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  renderForEachPropKey_NOT_IN?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>>
  >;
  renderForEachPropKey_CONTAINS?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  renderIfPropKey?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_NOT?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  renderIfPropKey_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  renderIfPropKey_CONTAINS?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  preRenderActionId?: InputMaybe<Scalars["String"]>;
  preRenderActionId_NOT?: InputMaybe<Scalars["String"]>;
  preRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  preRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  preRenderActionId_CONTAINS?: InputMaybe<Scalars["String"]>;
  preRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  preRenderActionId_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  preRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  preRenderActionId_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  preRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  postRenderActionId?: InputMaybe<Scalars["String"]>;
  postRenderActionId_NOT?: InputMaybe<Scalars["String"]>;
  postRenderActionId_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  postRenderActionId_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  postRenderActionId_CONTAINS?: InputMaybe<Scalars["String"]>;
  postRenderActionId_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  postRenderActionId_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  postRenderActionId_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  postRenderActionId_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  postRenderActionId_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
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
  /** @deprecated Use `children_SOME` instead. */
  children?: InputMaybe<ElementWhere>;
  /** @deprecated Use `children_NONE` instead. */
  children_NOT?: InputMaybe<ElementWhere>;
  childrenAggregate?: InputMaybe<ElementChildrenAggregateInput>;
  /** Return Elements where all of the related Elements match this filter */
  children_ALL?: InputMaybe<ElementWhere>;
  /** Return Elements where none of the related Elements match this filter */
  children_NONE?: InputMaybe<ElementWhere>;
  /** Return Elements where one of the related Elements match this filter */
  children_SINGLE?: InputMaybe<ElementWhere>;
  /** Return Elements where some of the related Elements match this filter */
  children_SOME?: InputMaybe<ElementWhere>;
  page?: InputMaybe<PageWhere>;
  page_NOT?: InputMaybe<PageWhere>;
  pageAggregate?: InputMaybe<ElementPageAggregateInput>;
  props?: InputMaybe<PropWhere>;
  props_NOT?: InputMaybe<PropWhere>;
  propsAggregate?: InputMaybe<ElementPropsAggregateInput>;
  parentElement?: InputMaybe<ElementWhere>;
  parentElement_NOT?: InputMaybe<ElementWhere>;
  parentElementAggregate?: InputMaybe<ElementParentElementAggregateInput>;
  parentComponent?: InputMaybe<ComponentWhere>;
  parentComponent_NOT?: InputMaybe<ComponentWhere>;
  parentComponentAggregate?: InputMaybe<ElementParentComponentAggregateInput>;
  componentRenderType?: InputMaybe<ComponentWhere>;
  componentRenderType_NOT?: InputMaybe<ComponentWhere>;
  componentRenderTypeAggregate?: InputMaybe<ElementComponentRenderTypeAggregateInput>;
  atomRenderType?: InputMaybe<AtomWhere>;
  atomRenderType_NOT?: InputMaybe<AtomWhere>;
  atomRenderTypeAggregate?: InputMaybe<ElementAtomRenderTypeAggregateInput>;
  /** @deprecated Use `hooks_SOME` instead. */
  hooks?: InputMaybe<HookWhere>;
  /** @deprecated Use `hooks_NONE` instead. */
  hooks_NOT?: InputMaybe<HookWhere>;
  hooksAggregate?: InputMaybe<ElementHooksAggregateInput>;
  /** Return Elements where all of the related Hooks match this filter */
  hooks_ALL?: InputMaybe<HookWhere>;
  /** Return Elements where none of the related Hooks match this filter */
  hooks_NONE?: InputMaybe<HookWhere>;
  /** Return Elements where one of the related Hooks match this filter */
  hooks_SINGLE?: InputMaybe<HookWhere>;
  /** Return Elements where some of the related Hooks match this filter */
  hooks_SOME?: InputMaybe<HookWhere>;
  /** @deprecated Use `propMapBindings_SOME` instead. */
  propMapBindings?: InputMaybe<PropMapBindingWhere>;
  /** @deprecated Use `propMapBindings_NONE` instead. */
  propMapBindings_NOT?: InputMaybe<PropMapBindingWhere>;
  propMapBindingsAggregate?: InputMaybe<ElementPropMapBindingsAggregateInput>;
  /** Return Elements where all of the related PropMapBindings match this filter */
  propMapBindings_ALL?: InputMaybe<PropMapBindingWhere>;
  /** Return Elements where none of the related PropMapBindings match this filter */
  propMapBindings_NONE?: InputMaybe<PropMapBindingWhere>;
  /** Return Elements where one of the related PropMapBindings match this filter */
  propMapBindings_SINGLE?: InputMaybe<PropMapBindingWhere>;
  /** Return Elements where some of the related PropMapBindings match this filter */
  propMapBindings_SOME?: InputMaybe<PropMapBindingWhere>;
  nextSiblingConnection?: InputMaybe<ElementNextSiblingConnectionWhere>;
  nextSiblingConnection_NOT?: InputMaybe<ElementNextSiblingConnectionWhere>;
  prevSiblingConnection?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  prevSiblingConnection_NOT?: InputMaybe<ElementPrevSiblingConnectionWhere>;
  firstChildConnection?: InputMaybe<ElementFirstChildConnectionWhere>;
  firstChildConnection_NOT?: InputMaybe<ElementFirstChildConnectionWhere>;
  parentConnection?: InputMaybe<ElementParentConnectionWhere>;
  parentConnection_NOT?: InputMaybe<ElementParentConnectionWhere>;
  /** @deprecated Use `childrenConnection_SOME` instead. */
  childrenConnection?: InputMaybe<ElementChildrenConnectionWhere>;
  /** @deprecated Use `childrenConnection_NONE` instead. */
  childrenConnection_NOT?: InputMaybe<ElementChildrenConnectionWhere>;
  childrenConnection_ALL?: InputMaybe<ElementChildrenConnectionWhere>;
  childrenConnection_NONE?: InputMaybe<ElementChildrenConnectionWhere>;
  childrenConnection_SINGLE?: InputMaybe<ElementChildrenConnectionWhere>;
  childrenConnection_SOME?: InputMaybe<ElementChildrenConnectionWhere>;
  pageConnection?: InputMaybe<ElementPageConnectionWhere>;
  pageConnection_NOT?: InputMaybe<ElementPageConnectionWhere>;
  propsConnection?: InputMaybe<ElementPropsConnectionWhere>;
  propsConnection_NOT?: InputMaybe<ElementPropsConnectionWhere>;
  parentElementConnection?: InputMaybe<ElementParentElementConnectionWhere>;
  parentElementConnection_NOT?: InputMaybe<ElementParentElementConnectionWhere>;
  parentComponentConnection?: InputMaybe<ElementParentComponentConnectionWhere>;
  parentComponentConnection_NOT?: InputMaybe<ElementParentComponentConnectionWhere>;
  componentRenderTypeConnection?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  componentRenderTypeConnection_NOT?: InputMaybe<ElementComponentRenderTypeConnectionWhere>;
  atomRenderTypeConnection?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  atomRenderTypeConnection_NOT?: InputMaybe<ElementAtomRenderTypeConnectionWhere>;
  /** @deprecated Use `hooksConnection_SOME` instead. */
  hooksConnection?: InputMaybe<ElementHooksConnectionWhere>;
  /** @deprecated Use `hooksConnection_NONE` instead. */
  hooksConnection_NOT?: InputMaybe<ElementHooksConnectionWhere>;
  hooksConnection_ALL?: InputMaybe<ElementHooksConnectionWhere>;
  hooksConnection_NONE?: InputMaybe<ElementHooksConnectionWhere>;
  hooksConnection_SINGLE?: InputMaybe<ElementHooksConnectionWhere>;
  hooksConnection_SOME?: InputMaybe<ElementHooksConnectionWhere>;
  /** @deprecated Use `propMapBindingsConnection_SOME` instead. */
  propMapBindingsConnection?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  /** @deprecated Use `propMapBindingsConnection_NONE` instead. */
  propMapBindingsConnection_NOT?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  propMapBindingsConnection_ALL?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  propMapBindingsConnection_NONE?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  propMapBindingsConnection_SINGLE?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
  propMapBindingsConnection_SOME?: InputMaybe<ElementPropMapBindingsConnectionWhere>;
};

export type EnumTypeAllowedValuesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeAllowedValuesAggregateInput>>;
  node?: InputMaybe<EnumTypeAllowedValuesNodeAggregationWhereInput>;
};

export type EnumTypeAllowedValuesConnectFieldInput = {
  where?: InputMaybe<EnumTypeValueConnectWhere>;
  connect?: InputMaybe<Array<EnumTypeValueConnectInput>>;
};

export type EnumTypeAllowedValuesConnectionSort = {
  node?: InputMaybe<EnumTypeValueSort>;
};

export type EnumTypeAllowedValuesConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>;
  OR?: InputMaybe<Array<EnumTypeAllowedValuesConnectionWhere>>;
  node?: InputMaybe<EnumTypeValueWhere>;
  node_NOT?: InputMaybe<EnumTypeValueWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  value_EQUAL?: InputMaybe<Scalars["String"]>;
  value_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  value_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  value_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  value_GT?: InputMaybe<Scalars["Int"]>;
  value_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  value_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  value_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  value_GTE?: InputMaybe<Scalars["Int"]>;
  value_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  value_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  value_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  value_LT?: InputMaybe<Scalars["Int"]>;
  value_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  value_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  value_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  value_LTE?: InputMaybe<Scalars["Int"]>;
  value_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  value_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  value_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>;
};

export type EnumTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere;
};

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere;
};

export type EnumTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>;
};

export type EnumTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>;
};

export type EnumTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>;
};

export type EnumTypeOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type EnumTypeOptions = {
  /** Specify one or more EnumTypeSort objects to sort EnumTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EnumTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type EnumTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeOwnerAggregateInput>>;
  node?: InputMaybe<EnumTypeOwnerNodeAggregationWhereInput>;
};

export type EnumTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type EnumTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>;
};

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type EnumTypeUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type EnumTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  value: Scalars["String"];
  enumType?: InputMaybe<EnumTypeValueEnumTypeFieldInput>;
};

export type EnumTypeValueDeleteInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDeleteFieldInput>;
};

export type EnumTypeValueDisconnectInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeDisconnectFieldInput>;
};

export type EnumTypeValueEnumTypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>;
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeAggregateInput>>;
  node?: InputMaybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>;
};

export type EnumTypeValueEnumTypeConnectFieldInput = {
  where?: InputMaybe<EnumTypeConnectWhere>;
  connect?: InputMaybe<EnumTypeConnectInput>;
};

export type EnumTypeValueEnumTypeConnectionSort = {
  node?: InputMaybe<EnumTypeSort>;
};

export type EnumTypeValueEnumTypeConnectionWhere = {
  AND?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>;
  OR?: InputMaybe<Array<EnumTypeValueEnumTypeConnectionWhere>>;
  node?: InputMaybe<EnumTypeWhere>;
  node_NOT?: InputMaybe<EnumTypeWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type EnumTypeValueRelationInput = {
  enumType?: InputMaybe<EnumTypeValueEnumTypeCreateFieldInput>;
};

/** Fields to sort EnumTypeValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeValueSort object. */
export type EnumTypeValueSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  value?: InputMaybe<SortDirection>;
};

export type EnumTypeValueUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
  enumType?: InputMaybe<EnumTypeValueEnumTypeUpdateFieldInput>;
};

export type EnumTypeValueWhere = {
  OR?: InputMaybe<Array<EnumTypeValueWhere>>;
  AND?: InputMaybe<Array<EnumTypeValueWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
  value_NOT?: InputMaybe<Scalars["String"]>;
  value_IN?: InputMaybe<Array<Scalars["String"]>>;
  value_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  value_CONTAINS?: InputMaybe<Scalars["String"]>;
  value_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  value_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  value_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  value_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  value_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  enumType?: InputMaybe<EnumTypeWhere>;
  enumType_NOT?: InputMaybe<EnumTypeWhere>;
  enumTypeAggregate?: InputMaybe<EnumTypeValueEnumTypeAggregateInput>;
  enumTypeConnection?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
  enumTypeConnection_NOT?: InputMaybe<EnumTypeValueEnumTypeConnectionWhere>;
};

export type EnumTypeWhere = {
  OR?: InputMaybe<Array<EnumTypeWhere>>;
  AND?: InputMaybe<Array<EnumTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>;
  /** @deprecated Use `allowedValues_SOME` instead. */
  allowedValues?: InputMaybe<EnumTypeValueWhere>;
  /** @deprecated Use `allowedValues_NONE` instead. */
  allowedValues_NOT?: InputMaybe<EnumTypeValueWhere>;
  allowedValuesAggregate?: InputMaybe<EnumTypeAllowedValuesAggregateInput>;
  /** Return EnumTypes where all of the related EnumTypeValues match this filter */
  allowedValues_ALL?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where none of the related EnumTypeValues match this filter */
  allowedValues_NONE?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where one of the related EnumTypeValues match this filter */
  allowedValues_SINGLE?: InputMaybe<EnumTypeValueWhere>;
  /** Return EnumTypes where some of the related EnumTypeValues match this filter */
  allowedValues_SOME?: InputMaybe<EnumTypeValueWhere>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  /** @deprecated Use `allowedValuesConnection_SOME` instead. */
  allowedValuesConnection?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  /** @deprecated Use `allowedValuesConnection_NONE` instead. */
  allowedValuesConnection_NOT?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  allowedValuesConnection_ALL?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  allowedValuesConnection_NONE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  allowedValuesConnection_SINGLE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
  allowedValuesConnection_SOME?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>;
};

export type FieldCreateInput = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  key: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type FieldSort = {
  id?: InputMaybe<SortDirection>;
  key?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
};

export type FieldUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  key?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
};

export type FieldWhere = {
  OR?: InputMaybe<Array<FieldWhere>>;
  AND?: InputMaybe<Array<FieldWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  key?: InputMaybe<Scalars["String"]>;
  key_NOT?: InputMaybe<Scalars["String"]>;
  key_IN?: InputMaybe<Array<Scalars["String"]>>;
  key_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  key_CONTAINS?: InputMaybe<Scalars["String"]>;
  key_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  key_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  key_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  key_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  key_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  description_NOT?: InputMaybe<Scalars["String"]>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
};

export type HookConfigAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<HookConfigAggregateInput>>;
  OR?: InputMaybe<Array<HookConfigAggregateInput>>;
  node?: InputMaybe<HookConfigNodeAggregationWhereInput>;
};

export type HookConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
};

export type HookConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type HookConfigConnectionWhere = {
  AND?: InputMaybe<Array<HookConfigConnectionWhere>>;
  OR?: InputMaybe<Array<HookConfigConnectionWhere>>;
  node?: InputMaybe<PropWhere>;
  node_NOT?: InputMaybe<PropWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  data_EQUAL?: InputMaybe<Scalars["String"]>;
  data_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_GT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  data_GTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_LT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  data_LTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type HookConnectOrCreateWhere = {
  node: HookUniqueWhere;
};

export type HookConnectWhere = {
  node: HookWhere;
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
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<HookElementAggregateInput>>;
  OR?: InputMaybe<Array<HookElementAggregateInput>>;
  node?: InputMaybe<HookElementNodeAggregationWhereInput>;
};

export type HookElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type HookElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type HookElementConnectionWhere = {
  AND?: InputMaybe<Array<HookElementConnectionWhere>>;
  OR?: InputMaybe<Array<HookElementConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type HookOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars["Boolean"]>;
};

export type HookOptions = {
  /** Specify one or more HookSort objects to sort Hooks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HookSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
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

export type HookUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type HookUpdateInput = {
  type?: InputMaybe<AtomType>;
  config?: InputMaybe<HookConfigUpdateFieldInput>;
  element?: InputMaybe<HookElementUpdateFieldInput>;
};

export type HookWhere = {
  OR?: InputMaybe<Array<HookWhere>>;
  AND?: InputMaybe<Array<HookWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<AtomType>;
  type_NOT?: InputMaybe<AtomType>;
  type_IN?: InputMaybe<Array<AtomType>>;
  type_NOT_IN?: InputMaybe<Array<AtomType>>;
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

export type InterfaceTypeApiOfAtomsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>;
  node?: InputMaybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>;
};

export type InterfaceTypeApiOfAtomsConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>;
  connect?: InputMaybe<Array<AtomConnectInput>>;
};

export type InterfaceTypeApiOfAtomsConnectionSort = {
  node?: InputMaybe<AtomSort>;
};

export type InterfaceTypeApiOfAtomsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>;
  node?: InputMaybe<AtomWhere>;
  node_NOT?: InputMaybe<AtomWhere>;
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
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >;
};

export type InterfaceTypeApiOfAtomsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  icon_EQUAL?: InputMaybe<Scalars["String"]>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  icon_GT?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  icon_GTE?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  icon_LT?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  icon_LTE?: InputMaybe<Scalars["Int"]>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  icon_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  connectOrCreate?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >;
};

export type InterfaceTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
};

export type InterfaceTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
  apiOfAtoms?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >;
};

export type InterfaceTypeConnectOrCreateWhere = {
  node: InterfaceTypeUniqueWhere;
};

export type InterfaceTypeConnectWhere = {
  node: InterfaceTypeWhere;
};

export type InterfaceTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
  apiOfAtoms?: InputMaybe<InterfaceTypeApiOfAtomsFieldInput>;
  fields?: InputMaybe<InterfaceTypeFieldsFieldInput>;
};

export type InterfaceTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>;
};

export type InterfaceTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>;
};

export type InterfaceTypeFieldsConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>;
  edge: FieldCreateInput;
  where?: InputMaybe<TypeBaseConnectWhere>;
};

export type InterfaceTypeFieldsConnectionSort = {
  edge?: InputMaybe<FieldSort>;
  node?: InputMaybe<TypeBaseSort>;
};

export type InterfaceTypeFieldsConnectionWhere = {
  AND?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>;
  OR?: InputMaybe<Array<InterfaceTypeFieldsConnectionWhere>>;
  edge?: InputMaybe<FieldWhere>;
  edge_NOT?: InputMaybe<FieldWhere>;
  node?: InputMaybe<TypeBaseWhere>;
  node_NOT?: InputMaybe<TypeBaseWhere>;
};

export type InterfaceTypeFieldsCreateFieldInput = {
  node: TypeBaseCreateInput;
  edge: FieldCreateInput;
};

export type InterfaceTypeFieldsDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>;
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
};

export type InterfaceTypeFieldsDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>;
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
};

export type InterfaceTypeFieldsFieldInput = {
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>;
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
};

export type InterfaceTypeFieldsUpdateConnectionInput = {
  edge?: InputMaybe<FieldUpdateInput>;
  node?: InputMaybe<TypeBaseUpdateInput>;
};

export type InterfaceTypeFieldsUpdateFieldInput = {
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>;
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>;
  delete?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>;
  update?: InputMaybe<InterfaceTypeFieldsUpdateConnectionInput>;
  where?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
};

export type InterfaceTypeOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type InterfaceTypeOptions = {
  /** Specify one or more InterfaceTypeSort objects to sort InterfaceTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InterfaceTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type InterfaceTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<InterfaceTypeOwnerAggregateInput>>;
  node?: InputMaybe<InterfaceTypeOwnerNodeAggregationWhereInput>;
};

export type InterfaceTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type InterfaceTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
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
  id?: InputMaybe<Scalars["ID"]>;
};

export type InterfaceTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>;
  fields?: InputMaybe<Array<InterfaceTypeFieldsUpdateFieldInput>>;
};

export type InterfaceTypeWhere = {
  OR?: InputMaybe<Array<InterfaceTypeWhere>>;
  AND?: InputMaybe<Array<InterfaceTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>;
  /** @deprecated Use `apiOfAtoms_SOME` instead. */
  apiOfAtoms?: InputMaybe<AtomWhere>;
  /** @deprecated Use `apiOfAtoms_NONE` instead. */
  apiOfAtoms_NOT?: InputMaybe<AtomWhere>;
  apiOfAtomsAggregate?: InputMaybe<InterfaceTypeApiOfAtomsAggregateInput>;
  /** Return InterfaceTypes where all of the related Atoms match this filter */
  apiOfAtoms_ALL?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where none of the related Atoms match this filter */
  apiOfAtoms_NONE?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where one of the related Atoms match this filter */
  apiOfAtoms_SINGLE?: InputMaybe<AtomWhere>;
  /** Return InterfaceTypes where some of the related Atoms match this filter */
  apiOfAtoms_SOME?: InputMaybe<AtomWhere>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  /** @deprecated Use `apiOfAtomsConnection_SOME` instead. */
  apiOfAtomsConnection?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** @deprecated Use `apiOfAtomsConnection_NONE` instead. */
  apiOfAtomsConnection_NOT?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  apiOfAtomsConnection_ALL?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  apiOfAtomsConnection_NONE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  apiOfAtomsConnection_SINGLE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  apiOfAtomsConnection_SOME?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>;
  /** @deprecated Use `fieldsConnection_SOME` instead. */
  fieldsConnection?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  /** @deprecated Use `fieldsConnection_NONE` instead. */
  fieldsConnection_NOT?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  fieldsConnection_ALL?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  fieldsConnection_NONE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  fieldsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
  fieldsConnection_SOME?: InputMaybe<InterfaceTypeFieldsConnectionWhere>;
};

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type LambdaTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type LambdaTypeOptions = {
  /** Specify one or more LambdaTypeSort objects to sort LambdaTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LambdaTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type LambdaTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<LambdaTypeOwnerAggregateInput>>;
  node?: InputMaybe<LambdaTypeOwnerNodeAggregationWhereInput>;
};

export type LambdaTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type LambdaTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type LambdaTypeWhere = {
  OR?: InputMaybe<Array<LambdaTypeWhere>>;
  AND?: InputMaybe<Array<LambdaTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type PageAppAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PageAppAggregateInput>>;
  OR?: InputMaybe<Array<PageAppAggregateInput>>;
  node?: InputMaybe<PageAppNodeAggregationWhereInput>;
};

export type PageAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<AppConnectInput>;
};

export type PageAppConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type PageAppConnectionWhere = {
  AND?: InputMaybe<Array<PageAppConnectionWhere>>;
  OR?: InputMaybe<Array<PageAppConnectionWhere>>;
  node?: InputMaybe<AppWhere>;
  node_NOT?: InputMaybe<AppWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
};

export type PageConnectOrCreateInput = {
  rootElement?: InputMaybe<PageRootElementConnectOrCreateFieldInput>;
  app?: InputMaybe<PageAppConnectOrCreateFieldInput>;
};

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere;
};

export type PageConnectWhere = {
  node: PageWhere;
};

export type PageCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
  rootElement?: InputMaybe<PageRootElementFieldInput>;
  app?: InputMaybe<PageAppFieldInput>;
};

export type PageDeleteInput = {
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>;
  app?: InputMaybe<PageAppDeleteFieldInput>;
};

export type PageDisconnectInput = {
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>;
  app?: InputMaybe<PageAppDisconnectFieldInput>;
};

export type PageOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type PageOptions = {
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PageRelationInput = {
  rootElement?: InputMaybe<PageRootElementCreateFieldInput>;
  app?: InputMaybe<PageAppCreateFieldInput>;
};

export type PageRootElementAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PageRootElementAggregateInput>>;
  OR?: InputMaybe<Array<PageRootElementAggregateInput>>;
  node?: InputMaybe<PageRootElementNodeAggregationWhereInput>;
};

export type PageRootElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type PageRootElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type PageRootElementConnectionWhere = {
  AND?: InputMaybe<Array<PageRootElementConnectionWhere>>;
  OR?: InputMaybe<Array<PageRootElementConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  name?: InputMaybe<SortDirection>;
  slug?: InputMaybe<SortDirection>;
};

export type PageTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type PageTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type PageTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type PageTypeOptions = {
  /** Specify one or more PageTypeSort objects to sort PageTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PageTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PageTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PageTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<PageTypeOwnerAggregateInput>>;
  node?: InputMaybe<PageTypeOwnerNodeAggregationWhereInput>;
};

export type PageTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PageTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type PageTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type PageTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type PageTypeWhere = {
  OR?: InputMaybe<Array<PageTypeWhere>>;
  AND?: InputMaybe<Array<PageTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type PageUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>;
  app?: InputMaybe<PageAppUpdateFieldInput>;
};

export type PageWhere = {
  OR?: InputMaybe<Array<PageWhere>>;
  AND?: InputMaybe<Array<PageWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  slug_NOT?: InputMaybe<Scalars["String"]>;
  slug_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  rootElement?: InputMaybe<ElementWhere>;
  rootElement_NOT?: InputMaybe<ElementWhere>;
  rootElementAggregate?: InputMaybe<PageRootElementAggregateInput>;
  app?: InputMaybe<AppWhere>;
  app_NOT?: InputMaybe<AppWhere>;
  appAggregate?: InputMaybe<PageAppAggregateInput>;
  rootElementConnection?: InputMaybe<PageRootElementConnectionWhere>;
  rootElementConnection_NOT?: InputMaybe<PageRootElementConnectionWhere>;
  appConnection?: InputMaybe<PageAppConnectionWhere>;
  appConnection_NOT?: InputMaybe<PageAppConnectionWhere>;
};

export type ParentOfElementCreateInput = {
  order?: InputMaybe<Scalars["Int"]>;
};

export type ParentOfElementSort = {
  order?: InputMaybe<SortDirection>;
};

export type ParentOfElementUpdateInput = {
  order?: InputMaybe<Scalars["Int"]>;
  order_INCREMENT?: InputMaybe<Scalars["Int"]>;
  order_DECREMENT?: InputMaybe<Scalars["Int"]>;
};

export type ParentOfElementWhere = {
  OR?: InputMaybe<Array<ParentOfElementWhere>>;
  AND?: InputMaybe<Array<ParentOfElementWhere>>;
  order?: InputMaybe<Scalars["Int"]>;
  order_NOT?: InputMaybe<Scalars["Int"]>;
  order_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  order_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  order_LT?: InputMaybe<Scalars["Int"]>;
  order_LTE?: InputMaybe<Scalars["Int"]>;
  order_GT?: InputMaybe<Scalars["Int"]>;
  order_GTE?: InputMaybe<Scalars["Int"]>;
};

export type PipelineActionActionsConnectInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >;
};

export type PipelineActionActionsConnectionSort = {
  edge?: InputMaybe<ActionsPipeLineSort>;
};

export type PipelineActionActionsConnectionWhere = {
  CustomAction?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>;
  ResourceAction?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>;
  PipelineAction?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>;
};

export type PipelineActionActionsConnectOrCreateInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionCreateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >;
};

export type PipelineActionActionsCreateInput = {
  CustomAction?: InputMaybe<PipelineActionActionsCustomActionFieldInput>;
  ResourceAction?: InputMaybe<PipelineActionActionsResourceActionFieldInput>;
  PipelineAction?: InputMaybe<PipelineActionActionsPipelineActionFieldInput>;
};

export type PipelineActionActionsCustomActionConnectFieldInput = {
  where?: InputMaybe<CustomActionConnectWhere>;
  connect?: InputMaybe<Array<CustomActionConnectInput>>;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsCustomActionConnectionWhere = {
  OR?: InputMaybe<Array<PipelineActionActionsCustomActionConnectionWhere>>;
  AND?: InputMaybe<Array<PipelineActionActionsCustomActionConnectionWhere>>;
  node?: InputMaybe<CustomActionWhere>;
  node_NOT?: InputMaybe<CustomActionWhere>;
  edge?: InputMaybe<ActionsPipeLineWhere>;
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>;
};

export type PipelineActionActionsCustomActionConnectOrCreateFieldInput = {
  where: CustomActionConnectOrCreateWhere;
  onCreate: PipelineActionActionsCustomActionConnectOrCreateFieldInputOnCreate;
};

export type PipelineActionActionsCustomActionConnectOrCreateFieldInputOnCreate =
  {
    node: CustomActionOnCreateInput;
    edge?: InputMaybe<ActionsPipeLineCreateInput>;
  };

export type PipelineActionActionsCustomActionCreateFieldInput = {
  node: CustomActionCreateInput;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsCustomActionDeleteFieldInput = {
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>;
  delete?: InputMaybe<CustomActionDeleteInput>;
};

export type PipelineActionActionsCustomActionDisconnectFieldInput = {
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>;
  disconnect?: InputMaybe<CustomActionDisconnectInput>;
};

export type PipelineActionActionsCustomActionFieldInput = {
  create?: InputMaybe<Array<PipelineActionActionsCustomActionCreateFieldInput>>;
  connect?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsCustomActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>;
  node?: InputMaybe<CustomActionUpdateInput>;
};

export type PipelineActionActionsCustomActionUpdateFieldInput = {
  where?: InputMaybe<PipelineActionActionsCustomActionConnectionWhere>;
  update?: InputMaybe<PipelineActionActionsCustomActionUpdateConnectionInput>;
  connect?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectFieldInput>
  >;
  disconnect?: InputMaybe<
    Array<PipelineActionActionsCustomActionDisconnectFieldInput>
  >;
  create?: InputMaybe<Array<PipelineActionActionsCustomActionCreateFieldInput>>;
  delete?: InputMaybe<Array<PipelineActionActionsCustomActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsCustomActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsDeleteInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionDeleteFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionDeleteFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDeleteFieldInput>
  >;
};

export type PipelineActionActionsDisconnectInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionDisconnectFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionDisconnectFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDisconnectFieldInput>
  >;
};

export type PipelineActionActionsPipelineActionConnectFieldInput = {
  where?: InputMaybe<PipelineActionConnectWhere>;
  connect?: InputMaybe<Array<PipelineActionConnectInput>>;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsPipelineActionConnectionWhere = {
  OR?: InputMaybe<Array<PipelineActionActionsPipelineActionConnectionWhere>>;
  AND?: InputMaybe<Array<PipelineActionActionsPipelineActionConnectionWhere>>;
  node?: InputMaybe<PipelineActionWhere>;
  node_NOT?: InputMaybe<PipelineActionWhere>;
  edge?: InputMaybe<ActionsPipeLineWhere>;
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>;
};

export type PipelineActionActionsPipelineActionConnectOrCreateFieldInput = {
  where: PipelineActionConnectOrCreateWhere;
  onCreate: PipelineActionActionsPipelineActionConnectOrCreateFieldInputOnCreate;
};

export type PipelineActionActionsPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    node: PipelineActionOnCreateInput;
    edge?: InputMaybe<ActionsPipeLineCreateInput>;
  };

export type PipelineActionActionsPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsPipelineActionDeleteFieldInput = {
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
};

export type PipelineActionActionsPipelineActionDisconnectFieldInput = {
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>;
  disconnect?: InputMaybe<PipelineActionDisconnectInput>;
};

export type PipelineActionActionsPipelineActionFieldInput = {
  create?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >;
  connect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsPipelineActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>;
  node?: InputMaybe<PipelineActionUpdateInput>;
};

export type PipelineActionActionsPipelineActionUpdateFieldInput = {
  where?: InputMaybe<PipelineActionActionsPipelineActionConnectionWhere>;
  update?: InputMaybe<PipelineActionActionsPipelineActionUpdateConnectionInput>;
  connect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectFieldInput>
  >;
  disconnect?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDisconnectFieldInput>
  >;
  create?: InputMaybe<
    Array<PipelineActionActionsPipelineActionCreateFieldInput>
  >;
  delete?: InputMaybe<
    Array<PipelineActionActionsPipelineActionDeleteFieldInput>
  >;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsResourceActionConnectFieldInput = {
  where?: InputMaybe<ResourceActionConnectWhere>;
  connect?: InputMaybe<Array<ResourceActionConnectInput>>;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsResourceActionConnectionWhere = {
  OR?: InputMaybe<Array<PipelineActionActionsResourceActionConnectionWhere>>;
  AND?: InputMaybe<Array<PipelineActionActionsResourceActionConnectionWhere>>;
  node?: InputMaybe<ResourceActionWhere>;
  node_NOT?: InputMaybe<ResourceActionWhere>;
  edge?: InputMaybe<ActionsPipeLineWhere>;
  edge_NOT?: InputMaybe<ActionsPipeLineWhere>;
};

export type PipelineActionActionsResourceActionConnectOrCreateFieldInput = {
  where: ResourceActionConnectOrCreateWhere;
  onCreate: PipelineActionActionsResourceActionConnectOrCreateFieldInputOnCreate;
};

export type PipelineActionActionsResourceActionConnectOrCreateFieldInputOnCreate =
  {
    node: ResourceActionOnCreateInput;
    edge?: InputMaybe<ActionsPipeLineCreateInput>;
  };

export type PipelineActionActionsResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput;
  edge?: InputMaybe<ActionsPipeLineCreateInput>;
};

export type PipelineActionActionsResourceActionDeleteFieldInput = {
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
};

export type PipelineActionActionsResourceActionDisconnectFieldInput = {
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>;
  disconnect?: InputMaybe<ResourceActionDisconnectInput>;
};

export type PipelineActionActionsResourceActionFieldInput = {
  create?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >;
  connect?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsResourceActionUpdateConnectionInput = {
  edge?: InputMaybe<ActionsPipeLineUpdateInput>;
  node?: InputMaybe<ResourceActionUpdateInput>;
};

export type PipelineActionActionsResourceActionUpdateFieldInput = {
  where?: InputMaybe<PipelineActionActionsResourceActionConnectionWhere>;
  update?: InputMaybe<PipelineActionActionsResourceActionUpdateConnectionInput>;
  connect?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectFieldInput>
  >;
  disconnect?: InputMaybe<
    Array<PipelineActionActionsResourceActionDisconnectFieldInput>
  >;
  create?: InputMaybe<
    Array<PipelineActionActionsResourceActionCreateFieldInput>
  >;
  delete?: InputMaybe<
    Array<PipelineActionActionsResourceActionDeleteFieldInput>
  >;
  connectOrCreate?: InputMaybe<
    Array<PipelineActionActionsResourceActionConnectOrCreateFieldInput>
  >;
};

export type PipelineActionActionsUpdateInput = {
  CustomAction?: InputMaybe<
    Array<PipelineActionActionsCustomActionUpdateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<PipelineActionActionsResourceActionUpdateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<PipelineActionActionsPipelineActionUpdateFieldInput>
  >;
};

export type PipelineActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>;
  actions?: InputMaybe<PipelineActionActionsConnectInput>;
};

export type PipelineActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>;
  actions?: InputMaybe<PipelineActionActionsConnectOrCreateInput>;
};

export type PipelineActionConnectOrCreateWhere = {
  node: PipelineActionUniqueWhere;
};

export type PipelineActionConnectWhere = {
  node: PipelineActionWhere;
};

export type PipelineActionCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
  type?: ActionKind;
  store?: InputMaybe<ActionBaseStoreFieldInput>;
  actions?: InputMaybe<PipelineActionActionsCreateInput>;
};

export type PipelineActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>;
  actions?: InputMaybe<PipelineActionActionsDeleteInput>;
};

export type PipelineActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>;
  actions?: InputMaybe<PipelineActionActionsDisconnectInput>;
};

export type PipelineActionOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
};

export type PipelineActionOptions = {
  /** Specify one or more PipelineActionSort objects to sort PipelineActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PipelineActionSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PipelineActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>;
  actions?: InputMaybe<PipelineActionActionsCreateFieldInput>;
};

/** Fields to sort PipelineActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one PipelineActionSort object. */
export type PipelineActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  runOnInit?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type PipelineActionStoreAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PipelineActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<PipelineActionStoreAggregateInput>>;
  node?: InputMaybe<PipelineActionStoreNodeAggregationWhereInput>;
};

export type PipelineActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PipelineActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PipelineActionStoreNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type PipelineActionUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type PipelineActionUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<ActionKind>;
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>;
  actions?: InputMaybe<PipelineActionActionsUpdateInput>;
};

export type PipelineActionWhere = {
  OR?: InputMaybe<Array<PipelineActionWhere>>;
  AND?: InputMaybe<Array<PipelineActionWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  runOnInit_NOT?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<ActionKind>;
  type_NOT?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  type_NOT_IN?: InputMaybe<Array<ActionKind>>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<PipelineActionStoreAggregateInput>;
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>;
  /** @deprecated Use `actionsConnection_SOME` instead. */
  actionsConnection?: InputMaybe<PipelineActionActionsConnectionWhere>;
  /** @deprecated Use `actionsConnection_NONE` instead. */
  actionsConnection_NOT?: InputMaybe<PipelineActionActionsConnectionWhere>;
  actionsConnection_ALL?: InputMaybe<PipelineActionActionsConnectionWhere>;
  actionsConnection_NONE?: InputMaybe<PipelineActionActionsConnectionWhere>;
  actionsConnection_SINGLE?: InputMaybe<PipelineActionActionsConnectionWhere>;
  actionsConnection_SOME?: InputMaybe<PipelineActionActionsConnectionWhere>;
};

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type PrimitiveTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  primitiveKind: PrimitiveTypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type PrimitiveTypeOptions = {
  /** Specify one or more PrimitiveTypeSort objects to sort PrimitiveTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PrimitiveTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PrimitiveTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<PrimitiveTypeOwnerAggregateInput>>;
  node?: InputMaybe<PrimitiveTypeOwnerNodeAggregationWhereInput>;
};

export type PrimitiveTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
  primitiveKind?: InputMaybe<SortDirection>;
};

export type PrimitiveTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  primitiveKind?: InputMaybe<PrimitiveTypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type PrimitiveTypeWhere = {
  OR?: InputMaybe<Array<PrimitiveTypeWhere>>;
  AND?: InputMaybe<Array<PrimitiveTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  primitiveKind?: InputMaybe<PrimitiveTypeKind>;
  primitiveKind_NOT?: InputMaybe<PrimitiveTypeKind>;
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>;
  primitiveKind_NOT_IN?: InputMaybe<Array<PrimitiveTypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type PropConnectOrCreateWhere = {
  node: PropUniqueWhere;
};

export type PropConnectWhere = {
  node: PropWhere;
};

export type PropCreateInput = {
  data?: Scalars["String"];
};

export type PropMapBindingConnectInput = {
  element?: InputMaybe<PropMapBindingElementConnectFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>;
};

export type PropMapBindingConnectOrCreateInput = {
  element?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>;
};

export type PropMapBindingConnectOrCreateWhere = {
  node: PropMapBindingUniqueWhere;
};

export type PropMapBindingConnectWhere = {
  node: PropMapBindingWhere;
};

export type PropMapBindingCreateInput = {
  sourceKey: Scalars["String"];
  targetKey: Scalars["String"];
  element?: InputMaybe<PropMapBindingElementFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementFieldInput>;
};

export type PropMapBindingDeleteInput = {
  element?: InputMaybe<PropMapBindingElementDeleteFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>;
};

export type PropMapBindingDisconnectInput = {
  element?: InputMaybe<PropMapBindingElementDisconnectFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>;
};

export type PropMapBindingElementAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PropMapBindingElementAggregateInput>>;
  OR?: InputMaybe<Array<PropMapBindingElementAggregateInput>>;
  node?: InputMaybe<PropMapBindingElementNodeAggregationWhereInput>;
};

export type PropMapBindingElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type PropMapBindingElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type PropMapBindingElementConnectionWhere = {
  AND?: InputMaybe<Array<PropMapBindingElementConnectionWhere>>;
  OR?: InputMaybe<Array<PropMapBindingElementConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
};

export type PropMapBindingElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: PropMapBindingElementConnectOrCreateFieldInputOnCreate;
};

export type PropMapBindingElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type PropMapBindingElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type PropMapBindingElementDeleteFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type PropMapBindingElementDisconnectFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type PropMapBindingElementFieldInput = {
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>;
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>;
};

export type PropMapBindingElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PropMapBindingElementNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type PropMapBindingElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type PropMapBindingElementUpdateFieldInput = {
  where?: InputMaybe<PropMapBindingElementConnectionWhere>;
  update?: InputMaybe<PropMapBindingElementUpdateConnectionInput>;
  connect?: InputMaybe<PropMapBindingElementConnectFieldInput>;
  disconnect?: InputMaybe<PropMapBindingElementDisconnectFieldInput>;
  create?: InputMaybe<PropMapBindingElementCreateFieldInput>;
  delete?: InputMaybe<PropMapBindingElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PropMapBindingElementConnectOrCreateFieldInput>;
};

export type PropMapBindingOnCreateInput = {
  sourceKey: Scalars["String"];
  targetKey: Scalars["String"];
};

export type PropMapBindingOptions = {
  /** Specify one or more PropMapBindingSort objects to sort PropMapBindings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropMapBindingSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PropMapBindingRelationInput = {
  element?: InputMaybe<PropMapBindingElementCreateFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>;
};

/** Fields to sort PropMapBindings by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropMapBindingSort object. */
export type PropMapBindingSort = {
  id?: InputMaybe<SortDirection>;
  sourceKey?: InputMaybe<SortDirection>;
  targetKey?: InputMaybe<SortDirection>;
};

export type PropMapBindingTargetElementAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>;
  OR?: InputMaybe<Array<PropMapBindingTargetElementAggregateInput>>;
  node?: InputMaybe<PropMapBindingTargetElementNodeAggregationWhereInput>;
};

export type PropMapBindingTargetElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<ElementConnectInput>;
};

export type PropMapBindingTargetElementConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type PropMapBindingTargetElementConnectionWhere = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementConnectionWhere>>;
  OR?: InputMaybe<Array<PropMapBindingTargetElementConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
};

export type PropMapBindingTargetElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere;
  onCreate: PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate;
};

export type PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput;
};

export type PropMapBindingTargetElementCreateFieldInput = {
  node: ElementCreateInput;
};

export type PropMapBindingTargetElementDeleteFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
  delete?: InputMaybe<ElementDeleteInput>;
};

export type PropMapBindingTargetElementDisconnectFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
  disconnect?: InputMaybe<ElementDisconnectInput>;
};

export type PropMapBindingTargetElementFieldInput = {
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>;
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>;
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>;
};

export type PropMapBindingTargetElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type PropMapBindingTargetElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>;
};

export type PropMapBindingTargetElementUpdateFieldInput = {
  where?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
  update?: InputMaybe<PropMapBindingTargetElementUpdateConnectionInput>;
  connect?: InputMaybe<PropMapBindingTargetElementConnectFieldInput>;
  disconnect?: InputMaybe<PropMapBindingTargetElementDisconnectFieldInput>;
  create?: InputMaybe<PropMapBindingTargetElementCreateFieldInput>;
  delete?: InputMaybe<PropMapBindingTargetElementDeleteFieldInput>;
  connectOrCreate?: InputMaybe<PropMapBindingTargetElementConnectOrCreateFieldInput>;
};

export type PropMapBindingUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type PropMapBindingUpdateInput = {
  sourceKey?: InputMaybe<Scalars["String"]>;
  targetKey?: InputMaybe<Scalars["String"]>;
  element?: InputMaybe<PropMapBindingElementUpdateFieldInput>;
  targetElement?: InputMaybe<PropMapBindingTargetElementUpdateFieldInput>;
};

export type PropMapBindingWhere = {
  OR?: InputMaybe<Array<PropMapBindingWhere>>;
  AND?: InputMaybe<Array<PropMapBindingWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  sourceKey?: InputMaybe<Scalars["String"]>;
  sourceKey_NOT?: InputMaybe<Scalars["String"]>;
  sourceKey_IN?: InputMaybe<Array<Scalars["String"]>>;
  sourceKey_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  sourceKey_CONTAINS?: InputMaybe<Scalars["String"]>;
  sourceKey_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  sourceKey_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  sourceKey_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  sourceKey_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  sourceKey_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  targetKey?: InputMaybe<Scalars["String"]>;
  targetKey_NOT?: InputMaybe<Scalars["String"]>;
  targetKey_IN?: InputMaybe<Array<Scalars["String"]>>;
  targetKey_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  targetKey_CONTAINS?: InputMaybe<Scalars["String"]>;
  targetKey_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  targetKey_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  targetKey_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  targetKey_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  targetKey_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  element?: InputMaybe<ElementWhere>;
  element_NOT?: InputMaybe<ElementWhere>;
  elementAggregate?: InputMaybe<PropMapBindingElementAggregateInput>;
  targetElement?: InputMaybe<ElementWhere>;
  targetElement_NOT?: InputMaybe<ElementWhere>;
  targetElementAggregate?: InputMaybe<PropMapBindingTargetElementAggregateInput>;
  elementConnection?: InputMaybe<PropMapBindingElementConnectionWhere>;
  elementConnection_NOT?: InputMaybe<PropMapBindingElementConnectionWhere>;
  targetElementConnection?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
  targetElementConnection_NOT?: InputMaybe<PropMapBindingTargetElementConnectionWhere>;
};

export type PropOnCreateInput = {
  data?: Scalars["String"];
};

export type PropOptions = {
  /** Specify one or more PropSort objects to sort Props by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PropSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Props by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropSort object. */
export type PropSort = {
  id?: InputMaybe<SortDirection>;
  data?: InputMaybe<SortDirection>;
};

export type PropUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type PropUpdateInput = {
  data?: InputMaybe<Scalars["String"]>;
};

export type PropWhere = {
  OR?: InputMaybe<Array<PropWhere>>;
  AND?: InputMaybe<Array<PropWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  data?: InputMaybe<Scalars["String"]>;
  data_NOT?: InputMaybe<Scalars["String"]>;
  data_IN?: InputMaybe<Array<Scalars["String"]>>;
  data_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  data_CONTAINS?: InputMaybe<Scalars["String"]>;
  data_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  data_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  data_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  data_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  data_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
};

export type QueryOptions = {
  offset?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type ReactNodeTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type ReactNodeTypeOptions = {
  /** Specify one or more ReactNodeTypeSort objects to sort ReactNodeTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ReactNodeTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ReactNodeTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ReactNodeTypeOwnerAggregateInput>>;
  node?: InputMaybe<ReactNodeTypeOwnerNodeAggregationWhereInput>;
};

export type ReactNodeTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type ReactNodeTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type ReactNodeTypeWhere = {
  OR?: InputMaybe<Array<ReactNodeTypeWhere>>;
  AND?: InputMaybe<Array<ReactNodeTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type RenderPropsTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
};

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type RenderPropsTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
};

export type RenderPropsTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
};

export type RenderPropsTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
};

export type RenderPropsTypeOptions = {
  /** Specify one or more RenderPropsTypeSort objects to sort RenderPropsTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RenderPropsTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type RenderPropsTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<RenderPropsTypeOwnerAggregateInput>>;
  node?: InputMaybe<RenderPropsTypeOwnerNodeAggregationWhereInput>;
};

export type RenderPropsTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type RenderPropsTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
};

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type RenderPropsTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type RenderPropsTypeWhere = {
  OR?: InputMaybe<Array<RenderPropsTypeWhere>>;
  AND?: InputMaybe<Array<RenderPropsTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<RenderPropsTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type ResetDatabaseMutationResponseCreateInput = {
  success?: InputMaybe<Scalars["Boolean"]>;
};

export type ResetDatabaseMutationResponseOptions = {
  /** Specify one or more ResetDatabaseMutationResponseSort objects to sort ResetDatabaseMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResetDatabaseMutationResponseSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort ResetDatabaseMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResetDatabaseMutationResponseSort object. */
export type ResetDatabaseMutationResponseSort = {
  success?: InputMaybe<SortDirection>;
};

export type ResetDatabaseMutationResponseUpdateInput = {
  success?: InputMaybe<Scalars["Boolean"]>;
};

export type ResetDatabaseMutationResponseWhere = {
  OR?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>;
  AND?: InputMaybe<Array<ResetDatabaseMutationResponseWhere>>;
  success?: InputMaybe<Scalars["Boolean"]>;
  success_NOT?: InputMaybe<Scalars["Boolean"]>;
};

export type ResourceActionConfigAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResourceActionConfigAggregateInput>>;
  OR?: InputMaybe<Array<ResourceActionConfigAggregateInput>>;
  node?: InputMaybe<ResourceActionConfigNodeAggregationWhereInput>;
};

export type ResourceActionConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
};

export type ResourceActionConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ResourceActionConfigConnectionWhere = {
  AND?: InputMaybe<Array<ResourceActionConfigConnectionWhere>>;
  OR?: InputMaybe<Array<ResourceActionConfigConnectionWhere>>;
  node?: InputMaybe<PropWhere>;
  node_NOT?: InputMaybe<PropWhere>;
};

export type ResourceActionConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: ResourceActionConfigConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionConfigConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type ResourceActionConfigCreateFieldInput = {
  node: PropCreateInput;
};

export type ResourceActionConfigDeleteFieldInput = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>;
};

export type ResourceActionConfigDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>;
};

export type ResourceActionConfigFieldInput = {
  create?: InputMaybe<ResourceActionConfigCreateFieldInput>;
  connect?: InputMaybe<ResourceActionConfigConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>;
};

export type ResourceActionConfigNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionConfigNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceActionConfigNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  data_EQUAL?: InputMaybe<Scalars["String"]>;
  data_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_GT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  data_GTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_LT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  data_LTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ResourceActionConfigUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type ResourceActionConfigUpdateFieldInput = {
  where?: InputMaybe<ResourceActionConfigConnectionWhere>;
  update?: InputMaybe<ResourceActionConfigUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionConfigConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionConfigDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionConfigCreateFieldInput>;
  delete?: InputMaybe<ResourceActionConfigDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>;
};

export type ResourceActionConnectInput = {
  store?: InputMaybe<ActionBaseStoreConnectFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionConnectInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionConnectInput>;
  resource?: InputMaybe<ResourceActionResourceConnectFieldInput>;
  config?: InputMaybe<ResourceActionConfigConnectFieldInput>;
};

export type ResourceActionConnectOrCreateInput = {
  store?: InputMaybe<ActionBaseStoreConnectOrCreateFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionConnectOrCreateInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionConnectOrCreateInput>;
  resource?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>;
  config?: InputMaybe<ResourceActionConfigConnectOrCreateFieldInput>;
};

export type ResourceActionConnectOrCreateWhere = {
  node: ResourceActionUniqueWhere;
};

export type ResourceActionConnectWhere = {
  node: ResourceActionWhere;
};

export type ResourceActionCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
  type?: ActionKind;
  store?: InputMaybe<ActionBaseStoreFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionCreateInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionCreateInput>;
  resource?: InputMaybe<ResourceActionResourceFieldInput>;
  config?: InputMaybe<ResourceActionConfigFieldInput>;
};

export type ResourceActionDeleteInput = {
  store?: InputMaybe<ActionBaseStoreDeleteFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionDeleteInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionDeleteInput>;
  resource?: InputMaybe<ResourceActionResourceDeleteFieldInput>;
  config?: InputMaybe<ResourceActionConfigDeleteFieldInput>;
};

export type ResourceActionDisconnectInput = {
  store?: InputMaybe<ActionBaseStoreDisconnectFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionDisconnectInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionDisconnectInput>;
  resource?: InputMaybe<ResourceActionResourceDisconnectFieldInput>;
  config?: InputMaybe<ResourceActionConfigDisconnectFieldInput>;
};

export type ResourceActionErrorActionConnectInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>;
};

export type ResourceActionErrorActionConnectionWhere = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>;
};

export type ResourceActionErrorActionConnectOrCreateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<ResourceActionErrorActionCustomActionCreateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<ResourceActionErrorActionResourceActionCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<ResourceActionErrorActionPipelineActionCreateFieldInput>
  >;
};

export type ResourceActionErrorActionCreateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionFieldInput>;
};

export type ResourceActionErrorActionCustomActionConnectFieldInput = {
  where?: InputMaybe<CustomActionConnectWhere>;
  connect?: InputMaybe<CustomActionConnectInput>;
};

export type ResourceActionErrorActionCustomActionConnectionWhere = {
  OR?: InputMaybe<Array<ResourceActionErrorActionCustomActionConnectionWhere>>;
  AND?: InputMaybe<Array<ResourceActionErrorActionCustomActionConnectionWhere>>;
  node?: InputMaybe<CustomActionWhere>;
  node_NOT?: InputMaybe<CustomActionWhere>;
};

export type ResourceActionErrorActionCustomActionConnectOrCreateFieldInput = {
  where: CustomActionConnectOrCreateWhere;
  onCreate: ResourceActionErrorActionCustomActionConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionErrorActionCustomActionConnectOrCreateFieldInputOnCreate =
  {
    node: CustomActionOnCreateInput;
  };

export type ResourceActionErrorActionCustomActionCreateFieldInput = {
  node: CustomActionCreateInput;
};

export type ResourceActionErrorActionCustomActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>;
  delete?: InputMaybe<CustomActionDeleteInput>;
};

export type ResourceActionErrorActionCustomActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>;
  disconnect?: InputMaybe<CustomActionDisconnectInput>;
};

export type ResourceActionErrorActionCustomActionFieldInput = {
  create?: InputMaybe<ResourceActionErrorActionCustomActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>;
};

export type ResourceActionErrorActionCustomActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionCustomActionConnectionWhere>;
  update?: InputMaybe<ResourceActionErrorActionCustomActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionErrorActionCustomActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionErrorActionCustomActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionErrorActionCustomActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionErrorActionCustomActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionCustomActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionDeleteInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionDeleteFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionDeleteFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionDeleteFieldInput>;
};

export type ResourceActionErrorActionDisconnectInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionDisconnectFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionDisconnectFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionDisconnectFieldInput>;
};

export type ResourceActionErrorActionPipelineActionConnectFieldInput = {
  where?: InputMaybe<PipelineActionConnectWhere>;
  connect?: InputMaybe<PipelineActionConnectInput>;
};

export type ResourceActionErrorActionPipelineActionConnectionWhere = {
  OR?: InputMaybe<
    Array<ResourceActionErrorActionPipelineActionConnectionWhere>
  >;
  AND?: InputMaybe<
    Array<ResourceActionErrorActionPipelineActionConnectionWhere>
  >;
  node?: InputMaybe<PipelineActionWhere>;
  node_NOT?: InputMaybe<PipelineActionWhere>;
};

export type ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput = {
  where: PipelineActionConnectOrCreateWhere;
  onCreate: ResourceActionErrorActionPipelineActionConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionErrorActionPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    node: PipelineActionOnCreateInput;
  };

export type ResourceActionErrorActionPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput;
};

export type ResourceActionErrorActionPipelineActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
};

export type ResourceActionErrorActionPipelineActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>;
  disconnect?: InputMaybe<PipelineActionDisconnectInput>;
};

export type ResourceActionErrorActionPipelineActionFieldInput = {
  create?: InputMaybe<ResourceActionErrorActionPipelineActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>;
};

export type ResourceActionErrorActionPipelineActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionPipelineActionConnectionWhere>;
  update?: InputMaybe<ResourceActionErrorActionPipelineActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionErrorActionPipelineActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionErrorActionPipelineActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionErrorActionPipelineActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionErrorActionPipelineActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionResourceActionConnectFieldInput = {
  where?: InputMaybe<ResourceActionConnectWhere>;
  connect?: InputMaybe<ResourceActionConnectInput>;
};

export type ResourceActionErrorActionResourceActionConnectionWhere = {
  OR?: InputMaybe<
    Array<ResourceActionErrorActionResourceActionConnectionWhere>
  >;
  AND?: InputMaybe<
    Array<ResourceActionErrorActionResourceActionConnectionWhere>
  >;
  node?: InputMaybe<ResourceActionWhere>;
  node_NOT?: InputMaybe<ResourceActionWhere>;
};

export type ResourceActionErrorActionResourceActionConnectOrCreateFieldInput = {
  where: ResourceActionConnectOrCreateWhere;
  onCreate: ResourceActionErrorActionResourceActionConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionErrorActionResourceActionConnectOrCreateFieldInputOnCreate =
  {
    node: ResourceActionOnCreateInput;
  };

export type ResourceActionErrorActionResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput;
};

export type ResourceActionErrorActionResourceActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
};

export type ResourceActionErrorActionResourceActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>;
  disconnect?: InputMaybe<ResourceActionDisconnectInput>;
};

export type ResourceActionErrorActionResourceActionFieldInput = {
  create?: InputMaybe<ResourceActionErrorActionResourceActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>;
};

export type ResourceActionErrorActionResourceActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionErrorActionResourceActionConnectionWhere>;
  update?: InputMaybe<ResourceActionErrorActionResourceActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionErrorActionResourceActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionErrorActionResourceActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionErrorActionResourceActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionErrorActionResourceActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionErrorActionResourceActionConnectOrCreateFieldInput>;
};

export type ResourceActionErrorActionUpdateInput = {
  CustomAction?: InputMaybe<ResourceActionErrorActionCustomActionUpdateFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionErrorActionResourceActionUpdateFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionErrorActionPipelineActionUpdateFieldInput>;
};

export type ResourceActionOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  runOnInit?: Scalars["Boolean"];
};

export type ResourceActionOptions = {
  /** Specify one or more ResourceActionSort objects to sort ResourceActions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceActionSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ResourceActionRelationInput = {
  store?: InputMaybe<ActionBaseStoreCreateFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionCreateFieldInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionCreateFieldInput>;
  resource?: InputMaybe<ResourceActionResourceCreateFieldInput>;
  config?: InputMaybe<ResourceActionConfigCreateFieldInput>;
};

export type ResourceActionResourceAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResourceActionResourceAggregateInput>>;
  OR?: InputMaybe<Array<ResourceActionResourceAggregateInput>>;
  node?: InputMaybe<ResourceActionResourceNodeAggregationWhereInput>;
};

export type ResourceActionResourceConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>;
  connect?: InputMaybe<ResourceConnectInput>;
};

export type ResourceActionResourceConnectionSort = {
  node?: InputMaybe<ResourceSort>;
};

export type ResourceActionResourceConnectionWhere = {
  AND?: InputMaybe<Array<ResourceActionResourceConnectionWhere>>;
  OR?: InputMaybe<Array<ResourceActionResourceConnectionWhere>>;
  node?: InputMaybe<ResourceWhere>;
  node_NOT?: InputMaybe<ResourceWhere>;
};

export type ResourceActionResourceConnectOrCreateFieldInput = {
  where: ResourceConnectOrCreateWhere;
  onCreate: ResourceActionResourceConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionResourceConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput;
};

export type ResourceActionResourceCreateFieldInput = {
  node: ResourceCreateInput;
};

export type ResourceActionResourceDeleteFieldInput = {
  where?: InputMaybe<ResourceActionResourceConnectionWhere>;
  delete?: InputMaybe<ResourceDeleteInput>;
};

export type ResourceActionResourceDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionResourceConnectionWhere>;
  disconnect?: InputMaybe<ResourceDisconnectInput>;
};

export type ResourceActionResourceFieldInput = {
  create?: InputMaybe<ResourceActionResourceCreateFieldInput>;
  connect?: InputMaybe<ResourceActionResourceConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>;
};

export type ResourceActionResourceNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionResourceNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceActionResourceNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ResourceActionResourceUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>;
};

export type ResourceActionResourceUpdateFieldInput = {
  where?: InputMaybe<ResourceActionResourceConnectionWhere>;
  update?: InputMaybe<ResourceActionResourceUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionResourceConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionResourceDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionResourceCreateFieldInput>;
  delete?: InputMaybe<ResourceActionResourceDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionResourceConnectOrCreateFieldInput>;
};

/** Fields to sort ResourceActions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceActionSort object. */
export type ResourceActionSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  runOnInit?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type ResourceActionStoreAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResourceActionStoreAggregateInput>>;
  OR?: InputMaybe<Array<ResourceActionStoreAggregateInput>>;
  node?: InputMaybe<ResourceActionStoreNodeAggregationWhereInput>;
};

export type ResourceActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceActionStoreNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceActionStoreNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type ResourceActionSuccessActionConnectInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>;
};

export type ResourceActionSuccessActionConnectionWhere = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>;
};

export type ResourceActionSuccessActionConnectOrCreateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionCreateFieldInput = {
  CustomAction?: InputMaybe<
    Array<ResourceActionSuccessActionCustomActionCreateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionCreateFieldInput>
  >;
};

export type ResourceActionSuccessActionCreateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionFieldInput>;
};

export type ResourceActionSuccessActionCustomActionConnectFieldInput = {
  where?: InputMaybe<CustomActionConnectWhere>;
  connect?: InputMaybe<CustomActionConnectInput>;
};

export type ResourceActionSuccessActionCustomActionConnectionWhere = {
  OR?: InputMaybe<
    Array<ResourceActionSuccessActionCustomActionConnectionWhere>
  >;
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionCustomActionConnectionWhere>
  >;
  node?: InputMaybe<CustomActionWhere>;
  node_NOT?: InputMaybe<CustomActionWhere>;
};

export type ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput = {
  where: CustomActionConnectOrCreateWhere;
  onCreate: ResourceActionSuccessActionCustomActionConnectOrCreateFieldInputOnCreate;
};

export type ResourceActionSuccessActionCustomActionConnectOrCreateFieldInputOnCreate =
  {
    node: CustomActionOnCreateInput;
  };

export type ResourceActionSuccessActionCustomActionCreateFieldInput = {
  node: CustomActionCreateInput;
};

export type ResourceActionSuccessActionCustomActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>;
  delete?: InputMaybe<CustomActionDeleteInput>;
};

export type ResourceActionSuccessActionCustomActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>;
  disconnect?: InputMaybe<CustomActionDisconnectInput>;
};

export type ResourceActionSuccessActionCustomActionFieldInput = {
  create?: InputMaybe<ResourceActionSuccessActionCustomActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>;
};

export type ResourceActionSuccessActionCustomActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionCustomActionConnectionWhere>;
  update?: InputMaybe<ResourceActionSuccessActionCustomActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionSuccessActionCustomActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionSuccessActionCustomActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionSuccessActionCustomActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionSuccessActionCustomActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionCustomActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionDeleteInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionDeleteFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionDeleteFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionDeleteFieldInput>;
};

export type ResourceActionSuccessActionDisconnectInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionDisconnectFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionDisconnectFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionDisconnectFieldInput>;
};

export type ResourceActionSuccessActionPipelineActionConnectFieldInput = {
  where?: InputMaybe<PipelineActionConnectWhere>;
  connect?: InputMaybe<PipelineActionConnectInput>;
};

export type ResourceActionSuccessActionPipelineActionConnectionWhere = {
  OR?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionConnectionWhere>
  >;
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionPipelineActionConnectionWhere>
  >;
  node?: InputMaybe<PipelineActionWhere>;
  node_NOT?: InputMaybe<PipelineActionWhere>;
};

export type ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput =
  {
    where: PipelineActionConnectOrCreateWhere;
    onCreate: ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInputOnCreate;
  };

export type ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInputOnCreate =
  {
    node: PipelineActionOnCreateInput;
  };

export type ResourceActionSuccessActionPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput;
};

export type ResourceActionSuccessActionPipelineActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
};

export type ResourceActionSuccessActionPipelineActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>;
  disconnect?: InputMaybe<PipelineActionDisconnectInput>;
};

export type ResourceActionSuccessActionPipelineActionFieldInput = {
  create?: InputMaybe<ResourceActionSuccessActionPipelineActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>;
};

export type ResourceActionSuccessActionPipelineActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectionWhere>;
  update?: InputMaybe<ResourceActionSuccessActionPipelineActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionSuccessActionPipelineActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionSuccessActionPipelineActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionSuccessActionPipelineActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionPipelineActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionResourceActionConnectFieldInput = {
  where?: InputMaybe<ResourceActionConnectWhere>;
  connect?: InputMaybe<ResourceActionConnectInput>;
};

export type ResourceActionSuccessActionResourceActionConnectionWhere = {
  OR?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionConnectionWhere>
  >;
  AND?: InputMaybe<
    Array<ResourceActionSuccessActionResourceActionConnectionWhere>
  >;
  node?: InputMaybe<ResourceActionWhere>;
  node_NOT?: InputMaybe<ResourceActionWhere>;
};

export type ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput =
  {
    where: ResourceActionConnectOrCreateWhere;
    onCreate: ResourceActionSuccessActionResourceActionConnectOrCreateFieldInputOnCreate;
  };

export type ResourceActionSuccessActionResourceActionConnectOrCreateFieldInputOnCreate =
  {
    node: ResourceActionOnCreateInput;
  };

export type ResourceActionSuccessActionResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput;
};

export type ResourceActionSuccessActionResourceActionDeleteFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
};

export type ResourceActionSuccessActionResourceActionDisconnectFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>;
  disconnect?: InputMaybe<ResourceActionDisconnectInput>;
};

export type ResourceActionSuccessActionResourceActionFieldInput = {
  create?: InputMaybe<ResourceActionSuccessActionResourceActionCreateFieldInput>;
  connect?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>;
};

export type ResourceActionSuccessActionResourceActionUpdateFieldInput = {
  where?: InputMaybe<ResourceActionSuccessActionResourceActionConnectionWhere>;
  update?: InputMaybe<ResourceActionSuccessActionResourceActionUpdateConnectionInput>;
  connect?: InputMaybe<ResourceActionSuccessActionResourceActionConnectFieldInput>;
  disconnect?: InputMaybe<ResourceActionSuccessActionResourceActionDisconnectFieldInput>;
  create?: InputMaybe<ResourceActionSuccessActionResourceActionCreateFieldInput>;
  delete?: InputMaybe<ResourceActionSuccessActionResourceActionDeleteFieldInput>;
  connectOrCreate?: InputMaybe<ResourceActionSuccessActionResourceActionConnectOrCreateFieldInput>;
};

export type ResourceActionSuccessActionUpdateInput = {
  CustomAction?: InputMaybe<ResourceActionSuccessActionCustomActionUpdateFieldInput>;
  ResourceAction?: InputMaybe<ResourceActionSuccessActionResourceActionUpdateFieldInput>;
  PipelineAction?: InputMaybe<ResourceActionSuccessActionPipelineActionUpdateFieldInput>;
};

export type ResourceActionUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type ResourceActionUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<ActionKind>;
  store?: InputMaybe<ActionBaseStoreUpdateFieldInput>;
  successAction?: InputMaybe<ResourceActionSuccessActionUpdateInput>;
  errorAction?: InputMaybe<ResourceActionErrorActionUpdateInput>;
  resource?: InputMaybe<ResourceActionResourceUpdateFieldInput>;
  config?: InputMaybe<ResourceActionConfigUpdateFieldInput>;
};

export type ResourceActionWhere = {
  OR?: InputMaybe<Array<ResourceActionWhere>>;
  AND?: InputMaybe<Array<ResourceActionWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  runOnInit?: InputMaybe<Scalars["Boolean"]>;
  runOnInit_NOT?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<ActionKind>;
  type_NOT?: InputMaybe<ActionKind>;
  type_IN?: InputMaybe<Array<ActionKind>>;
  type_NOT_IN?: InputMaybe<Array<ActionKind>>;
  store?: InputMaybe<StoreWhere>;
  store_NOT?: InputMaybe<StoreWhere>;
  storeAggregate?: InputMaybe<ResourceActionStoreAggregateInput>;
  resource?: InputMaybe<ResourceWhere>;
  resource_NOT?: InputMaybe<ResourceWhere>;
  resourceAggregate?: InputMaybe<ResourceActionResourceAggregateInput>;
  config?: InputMaybe<PropWhere>;
  config_NOT?: InputMaybe<PropWhere>;
  configAggregate?: InputMaybe<ResourceActionConfigAggregateInput>;
  storeConnection?: InputMaybe<ActionBaseStoreConnectionWhere>;
  storeConnection_NOT?: InputMaybe<ActionBaseStoreConnectionWhere>;
  successActionConnection?: InputMaybe<ResourceActionSuccessActionConnectionWhere>;
  successActionConnection_NOT?: InputMaybe<ResourceActionSuccessActionConnectionWhere>;
  errorActionConnection?: InputMaybe<ResourceActionErrorActionConnectionWhere>;
  errorActionConnection_NOT?: InputMaybe<ResourceActionErrorActionConnectionWhere>;
  resourceConnection?: InputMaybe<ResourceActionResourceConnectionWhere>;
  resourceConnection_NOT?: InputMaybe<ResourceActionResourceConnectionWhere>;
  configConnection?: InputMaybe<ResourceActionConfigConnectionWhere>;
  configConnection_NOT?: InputMaybe<ResourceActionConfigConnectionWhere>;
};

export type ResourceConfigAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResourceConfigAggregateInput>>;
  OR?: InputMaybe<Array<ResourceConfigAggregateInput>>;
  node?: InputMaybe<ResourceConfigNodeAggregationWhereInput>;
};

export type ResourceConfigConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
};

export type ResourceConfigConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type ResourceConfigConnectionWhere = {
  AND?: InputMaybe<Array<ResourceConfigConnectionWhere>>;
  OR?: InputMaybe<Array<ResourceConfigConnectionWhere>>;
  node?: InputMaybe<PropWhere>;
  node_NOT?: InputMaybe<PropWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  data_EQUAL?: InputMaybe<Scalars["String"]>;
  data_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_GT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  data_GTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_LT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  data_LTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id: Scalars["ID"];
  name: Scalars["String"];
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
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ResourceOptions = {
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type ResourceOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<ResourceOwnerAggregateInput>>;
  OR?: InputMaybe<Array<ResourceOwnerAggregateInput>>;
  node?: InputMaybe<ResourceOwnerNodeAggregationWhereInput>;
};

export type ResourceOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ResourceOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
};

export type ResourceUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ResourceType>;
  config?: InputMaybe<ResourceConfigUpdateFieldInput>;
  owner?: InputMaybe<WithOwnerOwnerUpdateFieldInput>;
};

export type ResourceWhere = {
  OR?: InputMaybe<Array<ResourceWhere>>;
  AND?: InputMaybe<Array<ResourceWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ResourceType>;
  type_NOT?: InputMaybe<ResourceType>;
  type_IN?: InputMaybe<Array<ResourceType>>;
  type_NOT_IN?: InputMaybe<Array<ResourceType>>;
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

export type StoreActionsConnectInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionConnectFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionConnectFieldInput>
  >;
};

export type StoreActionsConnectionWhere = {
  CustomAction?: InputMaybe<StoreActionsCustomActionConnectionWhere>;
  ResourceAction?: InputMaybe<StoreActionsResourceActionConnectionWhere>;
  PipelineAction?: InputMaybe<StoreActionsPipelineActionConnectionWhere>;
};

export type StoreActionsConnectOrCreateInput = {
  CustomAction?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsCreateFieldInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionCreateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionCreateFieldInput>
  >;
};

export type StoreActionsCreateInput = {
  CustomAction?: InputMaybe<StoreActionsCustomActionFieldInput>;
  ResourceAction?: InputMaybe<StoreActionsResourceActionFieldInput>;
  PipelineAction?: InputMaybe<StoreActionsPipelineActionFieldInput>;
};

export type StoreActionsCustomActionConnectFieldInput = {
  where?: InputMaybe<CustomActionConnectWhere>;
  connect?: InputMaybe<Array<CustomActionConnectInput>>;
};

export type StoreActionsCustomActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsCustomActionConnectionWhere>>;
  AND?: InputMaybe<Array<StoreActionsCustomActionConnectionWhere>>;
  node?: InputMaybe<CustomActionWhere>;
  node_NOT?: InputMaybe<CustomActionWhere>;
};

export type StoreActionsCustomActionConnectOrCreateFieldInput = {
  where: CustomActionConnectOrCreateWhere;
  onCreate: StoreActionsCustomActionConnectOrCreateFieldInputOnCreate;
};

export type StoreActionsCustomActionConnectOrCreateFieldInputOnCreate = {
  node: CustomActionOnCreateInput;
};

export type StoreActionsCustomActionCreateFieldInput = {
  node: CustomActionCreateInput;
};

export type StoreActionsCustomActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>;
  delete?: InputMaybe<CustomActionDeleteInput>;
};

export type StoreActionsCustomActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>;
  disconnect?: InputMaybe<CustomActionDisconnectInput>;
};

export type StoreActionsCustomActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>;
  connect?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsCustomActionUpdateConnectionInput = {
  node?: InputMaybe<CustomActionUpdateInput>;
};

export type StoreActionsCustomActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsCustomActionConnectionWhere>;
  update?: InputMaybe<StoreActionsCustomActionUpdateConnectionInput>;
  connect?: InputMaybe<Array<StoreActionsCustomActionConnectFieldInput>>;
  disconnect?: InputMaybe<Array<StoreActionsCustomActionDisconnectFieldInput>>;
  create?: InputMaybe<Array<StoreActionsCustomActionCreateFieldInput>>;
  delete?: InputMaybe<Array<StoreActionsCustomActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsCustomActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsDeleteInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionDeleteFieldInput>>;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionDeleteFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionDeleteFieldInput>
  >;
};

export type StoreActionsDisconnectInput = {
  CustomAction?: InputMaybe<
    Array<StoreActionsCustomActionDisconnectFieldInput>
  >;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionDisconnectFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionDisconnectFieldInput>
  >;
};

export type StoreActionsPipelineActionConnectFieldInput = {
  where?: InputMaybe<PipelineActionConnectWhere>;
  connect?: InputMaybe<Array<PipelineActionConnectInput>>;
};

export type StoreActionsPipelineActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsPipelineActionConnectionWhere>>;
  AND?: InputMaybe<Array<StoreActionsPipelineActionConnectionWhere>>;
  node?: InputMaybe<PipelineActionWhere>;
  node_NOT?: InputMaybe<PipelineActionWhere>;
};

export type StoreActionsPipelineActionConnectOrCreateFieldInput = {
  where: PipelineActionConnectOrCreateWhere;
  onCreate: StoreActionsPipelineActionConnectOrCreateFieldInputOnCreate;
};

export type StoreActionsPipelineActionConnectOrCreateFieldInputOnCreate = {
  node: PipelineActionOnCreateInput;
};

export type StoreActionsPipelineActionCreateFieldInput = {
  node: PipelineActionCreateInput;
};

export type StoreActionsPipelineActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>;
  delete?: InputMaybe<PipelineActionDeleteInput>;
};

export type StoreActionsPipelineActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>;
  disconnect?: InputMaybe<PipelineActionDisconnectInput>;
};

export type StoreActionsPipelineActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsPipelineActionCreateFieldInput>>;
  connect?: InputMaybe<Array<StoreActionsPipelineActionConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsPipelineActionUpdateConnectionInput = {
  node?: InputMaybe<PipelineActionUpdateInput>;
};

export type StoreActionsPipelineActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsPipelineActionConnectionWhere>;
  update?: InputMaybe<StoreActionsPipelineActionUpdateConnectionInput>;
  connect?: InputMaybe<Array<StoreActionsPipelineActionConnectFieldInput>>;
  disconnect?: InputMaybe<
    Array<StoreActionsPipelineActionDisconnectFieldInput>
  >;
  create?: InputMaybe<Array<StoreActionsPipelineActionCreateFieldInput>>;
  delete?: InputMaybe<Array<StoreActionsPipelineActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsPipelineActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsResourceActionConnectFieldInput = {
  where?: InputMaybe<ResourceActionConnectWhere>;
  connect?: InputMaybe<Array<ResourceActionConnectInput>>;
};

export type StoreActionsResourceActionConnectionWhere = {
  OR?: InputMaybe<Array<StoreActionsResourceActionConnectionWhere>>;
  AND?: InputMaybe<Array<StoreActionsResourceActionConnectionWhere>>;
  node?: InputMaybe<ResourceActionWhere>;
  node_NOT?: InputMaybe<ResourceActionWhere>;
};

export type StoreActionsResourceActionConnectOrCreateFieldInput = {
  where: ResourceActionConnectOrCreateWhere;
  onCreate: StoreActionsResourceActionConnectOrCreateFieldInputOnCreate;
};

export type StoreActionsResourceActionConnectOrCreateFieldInputOnCreate = {
  node: ResourceActionOnCreateInput;
};

export type StoreActionsResourceActionCreateFieldInput = {
  node: ResourceActionCreateInput;
};

export type StoreActionsResourceActionDeleteFieldInput = {
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>;
  delete?: InputMaybe<ResourceActionDeleteInput>;
};

export type StoreActionsResourceActionDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>;
  disconnect?: InputMaybe<ResourceActionDisconnectInput>;
};

export type StoreActionsResourceActionFieldInput = {
  create?: InputMaybe<Array<StoreActionsResourceActionCreateFieldInput>>;
  connect?: InputMaybe<Array<StoreActionsResourceActionConnectFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsResourceActionUpdateConnectionInput = {
  node?: InputMaybe<ResourceActionUpdateInput>;
};

export type StoreActionsResourceActionUpdateFieldInput = {
  where?: InputMaybe<StoreActionsResourceActionConnectionWhere>;
  update?: InputMaybe<StoreActionsResourceActionUpdateConnectionInput>;
  connect?: InputMaybe<Array<StoreActionsResourceActionConnectFieldInput>>;
  disconnect?: InputMaybe<
    Array<StoreActionsResourceActionDisconnectFieldInput>
  >;
  create?: InputMaybe<Array<StoreActionsResourceActionCreateFieldInput>>;
  delete?: InputMaybe<Array<StoreActionsResourceActionDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<
    Array<StoreActionsResourceActionConnectOrCreateFieldInput>
  >;
};

export type StoreActionsUpdateInput = {
  CustomAction?: InputMaybe<Array<StoreActionsCustomActionUpdateFieldInput>>;
  ResourceAction?: InputMaybe<
    Array<StoreActionsResourceActionUpdateFieldInput>
  >;
  PipelineAction?: InputMaybe<
    Array<StoreActionsPipelineActionUpdateFieldInput>
  >;
};

export type StoreAppAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<StoreAppAggregateInput>>;
  OR?: InputMaybe<Array<StoreAppAggregateInput>>;
  node?: InputMaybe<StoreAppNodeAggregationWhereInput>;
};

export type StoreAppConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<AppConnectInput>;
};

export type StoreAppConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type StoreAppConnectionWhere = {
  AND?: InputMaybe<Array<StoreAppConnectionWhere>>;
  OR?: InputMaybe<Array<StoreAppConnectionWhere>>;
  node?: InputMaybe<AppWhere>;
  node_NOT?: InputMaybe<AppWhere>;
};

export type StoreAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere;
  onCreate: StoreAppConnectOrCreateFieldInputOnCreate;
};

export type StoreAppConnectOrCreateFieldInputOnCreate = {
  node: AppOnCreateInput;
};

export type StoreAppCreateFieldInput = {
  node: AppCreateInput;
};

export type StoreAppDeleteFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>;
  delete?: InputMaybe<AppDeleteInput>;
};

export type StoreAppDisconnectFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>;
  disconnect?: InputMaybe<AppDisconnectInput>;
};

export type StoreAppFieldInput = {
  create?: InputMaybe<StoreAppCreateFieldInput>;
  connect?: InputMaybe<StoreAppConnectFieldInput>;
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>;
};

export type StoreAppNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StoreAppNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type StoreAppUpdateConnectionInput = {
  node?: InputMaybe<AppUpdateInput>;
};

export type StoreAppUpdateFieldInput = {
  where?: InputMaybe<StoreAppConnectionWhere>;
  update?: InputMaybe<StoreAppUpdateConnectionInput>;
  connect?: InputMaybe<StoreAppConnectFieldInput>;
  disconnect?: InputMaybe<StoreAppDisconnectFieldInput>;
  create?: InputMaybe<StoreAppCreateFieldInput>;
  delete?: InputMaybe<StoreAppDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StoreAppConnectOrCreateFieldInput>;
};

export type StoreConnectInput = {
  state?: InputMaybe<StoreStateConnectFieldInput>;
  app?: InputMaybe<StoreAppConnectFieldInput>;
  stateApi?: InputMaybe<StoreStateApiConnectFieldInput>;
  actions?: InputMaybe<StoreActionsConnectInput>;
};

export type StoreConnectOrCreateInput = {
  state?: InputMaybe<StoreStateConnectOrCreateFieldInput>;
  app?: InputMaybe<StoreAppConnectOrCreateFieldInput>;
  stateApi?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>;
  actions?: InputMaybe<StoreActionsConnectOrCreateInput>;
};

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere;
};

export type StoreConnectWhere = {
  node: StoreWhere;
};

export type StoreCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  state?: InputMaybe<StoreStateFieldInput>;
  app?: InputMaybe<StoreAppFieldInput>;
  stateApi?: InputMaybe<StoreStateApiFieldInput>;
  actions?: InputMaybe<StoreActionsCreateInput>;
};

export type StoreDeleteInput = {
  state?: InputMaybe<StoreStateDeleteFieldInput>;
  app?: InputMaybe<StoreAppDeleteFieldInput>;
  stateApi?: InputMaybe<StoreStateApiDeleteFieldInput>;
  actions?: InputMaybe<StoreActionsDeleteInput>;
};

export type StoreDisconnectInput = {
  state?: InputMaybe<StoreStateDisconnectFieldInput>;
  app?: InputMaybe<StoreAppDisconnectFieldInput>;
  stateApi?: InputMaybe<StoreStateApiDisconnectFieldInput>;
  actions?: InputMaybe<StoreActionsDisconnectInput>;
};

export type StoreOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type StoreOptions = {
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type StoreRelationInput = {
  state?: InputMaybe<StoreStateCreateFieldInput>;
  app?: InputMaybe<StoreAppCreateFieldInput>;
  stateApi?: InputMaybe<StoreStateApiCreateFieldInput>;
  actions?: InputMaybe<StoreActionsCreateFieldInput>;
};

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type StoreStateAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<StoreStateAggregateInput>>;
  OR?: InputMaybe<Array<StoreStateAggregateInput>>;
  node?: InputMaybe<StoreStateNodeAggregationWhereInput>;
};

export type StoreStateApiAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<StoreStateApiAggregateInput>>;
  OR?: InputMaybe<Array<StoreStateApiAggregateInput>>;
  node?: InputMaybe<StoreStateApiNodeAggregationWhereInput>;
};

export type StoreStateApiConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>;
  connect?: InputMaybe<InterfaceTypeConnectInput>;
};

export type StoreStateApiConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>;
};

export type StoreStateApiConnectionWhere = {
  AND?: InputMaybe<Array<StoreStateApiConnectionWhere>>;
  OR?: InputMaybe<Array<StoreStateApiConnectionWhere>>;
  node?: InputMaybe<InterfaceTypeWhere>;
  node_NOT?: InputMaybe<InterfaceTypeWhere>;
};

export type StoreStateApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere;
  onCreate: StoreStateApiConnectOrCreateFieldInputOnCreate;
};

export type StoreStateApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput;
};

export type StoreStateApiCreateFieldInput = {
  node: InterfaceTypeCreateInput;
};

export type StoreStateApiDeleteFieldInput = {
  where?: InputMaybe<StoreStateApiConnectionWhere>;
  delete?: InputMaybe<InterfaceTypeDeleteInput>;
};

export type StoreStateApiDisconnectFieldInput = {
  where?: InputMaybe<StoreStateApiConnectionWhere>;
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>;
};

export type StoreStateApiFieldInput = {
  create?: InputMaybe<StoreStateApiCreateFieldInput>;
  connect?: InputMaybe<StoreStateApiConnectFieldInput>;
  connectOrCreate?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>;
};

export type StoreStateApiNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreStateApiNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StoreStateApiNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type StoreStateApiUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>;
};

export type StoreStateApiUpdateFieldInput = {
  where?: InputMaybe<StoreStateApiConnectionWhere>;
  update?: InputMaybe<StoreStateApiUpdateConnectionInput>;
  connect?: InputMaybe<StoreStateApiConnectFieldInput>;
  disconnect?: InputMaybe<StoreStateApiDisconnectFieldInput>;
  create?: InputMaybe<StoreStateApiCreateFieldInput>;
  delete?: InputMaybe<StoreStateApiDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StoreStateApiConnectOrCreateFieldInput>;
};

export type StoreStateConnectFieldInput = {
  where?: InputMaybe<PropConnectWhere>;
};

export type StoreStateConnectionSort = {
  node?: InputMaybe<PropSort>;
};

export type StoreStateConnectionWhere = {
  AND?: InputMaybe<Array<StoreStateConnectionWhere>>;
  OR?: InputMaybe<Array<StoreStateConnectionWhere>>;
  node?: InputMaybe<PropWhere>;
  node_NOT?: InputMaybe<PropWhere>;
};

export type StoreStateConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere;
  onCreate: StoreStateConnectOrCreateFieldInputOnCreate;
};

export type StoreStateConnectOrCreateFieldInputOnCreate = {
  node: PropOnCreateInput;
};

export type StoreStateCreateFieldInput = {
  node: PropCreateInput;
};

export type StoreStateDeleteFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>;
};

export type StoreStateDisconnectFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>;
};

export type StoreStateFieldInput = {
  create?: InputMaybe<StoreStateCreateFieldInput>;
  connect?: InputMaybe<StoreStateConnectFieldInput>;
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>;
};

export type StoreStateNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  data_EQUAL?: InputMaybe<Scalars["String"]>;
  data_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  data_GT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  data_GTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  data_LT?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  data_LTE?: InputMaybe<Scalars["Int"]>;
  data_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  data_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  data_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type StoreStateUpdateConnectionInput = {
  node?: InputMaybe<PropUpdateInput>;
};

export type StoreStateUpdateFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>;
  update?: InputMaybe<StoreStateUpdateConnectionInput>;
  connect?: InputMaybe<StoreStateConnectFieldInput>;
  disconnect?: InputMaybe<StoreStateDisconnectFieldInput>;
  create?: InputMaybe<StoreStateCreateFieldInput>;
  delete?: InputMaybe<StoreStateDeleteFieldInput>;
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>;
};

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type StoreUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<StoreStateUpdateFieldInput>;
  app?: InputMaybe<StoreAppUpdateFieldInput>;
  stateApi?: InputMaybe<StoreStateApiUpdateFieldInput>;
  actions?: InputMaybe<StoreActionsUpdateInput>;
};

export type StoreWhere = {
  OR?: InputMaybe<Array<StoreWhere>>;
  AND?: InputMaybe<Array<StoreWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<PropWhere>;
  state_NOT?: InputMaybe<PropWhere>;
  stateAggregate?: InputMaybe<StoreStateAggregateInput>;
  app?: InputMaybe<AppWhere>;
  app_NOT?: InputMaybe<AppWhere>;
  appAggregate?: InputMaybe<StoreAppAggregateInput>;
  stateApi?: InputMaybe<InterfaceTypeWhere>;
  stateApi_NOT?: InputMaybe<InterfaceTypeWhere>;
  stateApiAggregate?: InputMaybe<StoreStateApiAggregateInput>;
  stateConnection?: InputMaybe<StoreStateConnectionWhere>;
  stateConnection_NOT?: InputMaybe<StoreStateConnectionWhere>;
  appConnection?: InputMaybe<StoreAppConnectionWhere>;
  appConnection_NOT?: InputMaybe<StoreAppConnectionWhere>;
  stateApiConnection?: InputMaybe<StoreStateApiConnectionWhere>;
  stateApiConnection_NOT?: InputMaybe<StoreStateApiConnectionWhere>;
  /** @deprecated Use `actionsConnection_SOME` instead. */
  actionsConnection?: InputMaybe<StoreActionsConnectionWhere>;
  /** @deprecated Use `actionsConnection_NONE` instead. */
  actionsConnection_NOT?: InputMaybe<StoreActionsConnectionWhere>;
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>;
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>;
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>;
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>;
};

export type TagChildrenAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TagChildrenAggregateInput>>;
  OR?: InputMaybe<Array<TagChildrenAggregateInput>>;
  node?: InputMaybe<TagChildrenNodeAggregationWhereInput>;
};

export type TagChildrenConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
};

export type TagChildrenConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type TagChildrenConnectionWhere = {
  AND?: InputMaybe<Array<TagChildrenConnectionWhere>>;
  OR?: InputMaybe<Array<TagChildrenConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
};

export type TagConnectOrCreateInput = {
  parent?: InputMaybe<TagParentConnectOrCreateFieldInput>;
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>;
  owner?: InputMaybe<TagOwnerConnectOrCreateFieldInput>;
};

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere;
};

export type TagConnectWhere = {
  node: TagWhere;
};

export type TagCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  parent?: InputMaybe<TagParentFieldInput>;
  children?: InputMaybe<TagChildrenFieldInput>;
  owner?: InputMaybe<TagOwnerFieldInput>;
};

export type TagDeleteInput = {
  parent?: InputMaybe<TagParentDeleteFieldInput>;
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>;
  owner?: InputMaybe<TagOwnerDeleteFieldInput>;
};

export type TagDisconnectInput = {
  parent?: InputMaybe<TagParentDisconnectFieldInput>;
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>;
  owner?: InputMaybe<TagOwnerDisconnectFieldInput>;
};

export type TagGraphCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  descendants: Array<Scalars["ID"]>;
  isRoot: Scalars["Boolean"];
};

export type TagGraphOptionsCreateInput = {
  sort?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type TagGraphOptionsOptions = {
  /** Specify one or more TagGraphOptionsSort objects to sort TagGraphOptions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagGraphOptionsSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort TagGraphOptions by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagGraphOptionsSort object. */
export type TagGraphOptionsSort = {
  sort?: InputMaybe<SortDirection>;
  limit?: InputMaybe<SortDirection>;
};

export type TagGraphOptionsUpdateInput = {
  sort?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  sort_INCREMENT?: InputMaybe<Scalars["Int"]>;
  sort_DECREMENT?: InputMaybe<Scalars["Int"]>;
  limit_INCREMENT?: InputMaybe<Scalars["Int"]>;
  limit_DECREMENT?: InputMaybe<Scalars["Int"]>;
};

export type TagGraphOptionsWhere = {
  OR?: InputMaybe<Array<TagGraphOptionsWhere>>;
  AND?: InputMaybe<Array<TagGraphOptionsWhere>>;
  sort?: InputMaybe<Scalars["Int"]>;
  sort_NOT?: InputMaybe<Scalars["Int"]>;
  sort_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  sort_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  sort_LT?: InputMaybe<Scalars["Int"]>;
  sort_LTE?: InputMaybe<Scalars["Int"]>;
  sort_GT?: InputMaybe<Scalars["Int"]>;
  sort_GTE?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  limit_NOT?: InputMaybe<Scalars["Int"]>;
  limit_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  limit_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  limit_LT?: InputMaybe<Scalars["Int"]>;
  limit_LTE?: InputMaybe<Scalars["Int"]>;
  limit_GT?: InputMaybe<Scalars["Int"]>;
  limit_GTE?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort TagGraphs by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagGraphSort object. */
export type TagGraphSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  isRoot?: InputMaybe<SortDirection>;
};

export type TagGraphUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  descendants?: InputMaybe<Array<Scalars["ID"]>>;
  isRoot?: InputMaybe<Scalars["Boolean"]>;
  descendants_POP?: InputMaybe<Scalars["Int"]>;
  descendants_PUSH?: InputMaybe<Array<Scalars["ID"]>>;
};

export type TagGraphWhere = {
  OR?: InputMaybe<Array<TagGraphWhere>>;
  AND?: InputMaybe<Array<TagGraphWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  descendants?: InputMaybe<Array<Scalars["ID"]>>;
  descendants_NOT?: InputMaybe<Array<Scalars["ID"]>>;
  descendants_INCLUDES?: InputMaybe<Scalars["ID"]>;
  descendants_NOT_INCLUDES?: InputMaybe<Scalars["ID"]>;
  isRoot?: InputMaybe<Scalars["Boolean"]>;
  isRoot_NOT?: InputMaybe<Scalars["Boolean"]>;
};

export type TagOnCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type TagOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TagOwnerAggregateInput>>;
  OR?: InputMaybe<Array<TagOwnerAggregateInput>>;
  node?: InputMaybe<TagOwnerNodeAggregationWhereInput>;
};

export type TagOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
};

export type TagOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type TagOwnerConnectionWhere = {
  AND?: InputMaybe<Array<TagOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<TagOwnerConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TagParentAggregateInput>>;
  OR?: InputMaybe<Array<TagParentAggregateInput>>;
  node?: InputMaybe<TagParentNodeAggregationWhereInput>;
};

export type TagParentConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<TagConnectInput>;
};

export type TagParentConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type TagParentConnectionWhere = {
  AND?: InputMaybe<Array<TagParentConnectionWhere>>;
  OR?: InputMaybe<Array<TagParentConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  isRoot?: InputMaybe<SortDirection>;
};

export type TagUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type TagUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<TagParentUpdateFieldInput>;
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>;
  owner?: InputMaybe<TagOwnerUpdateFieldInput>;
};

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>;
  AND?: InputMaybe<Array<TagWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<TagWhere>;
  parent_NOT?: InputMaybe<TagWhere>;
  parentAggregate?: InputMaybe<TagParentAggregateInput>;
  /** @deprecated Use `children_SOME` instead. */
  children?: InputMaybe<TagWhere>;
  /** @deprecated Use `children_NONE` instead. */
  children_NOT?: InputMaybe<TagWhere>;
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
  parentConnection?: InputMaybe<TagParentConnectionWhere>;
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>;
  /** @deprecated Use `childrenConnection_SOME` instead. */
  childrenConnection?: InputMaybe<TagChildrenConnectionWhere>;
  /** @deprecated Use `childrenConnection_NONE` instead. */
  childrenConnection_NOT?: InputMaybe<TagChildrenConnectionWhere>;
  childrenConnection_ALL?: InputMaybe<TagChildrenConnectionWhere>;
  childrenConnection_NONE?: InputMaybe<TagChildrenConnectionWhere>;
  childrenConnection_SINGLE?: InputMaybe<TagChildrenConnectionWhere>;
  childrenConnection_SOME?: InputMaybe<TagChildrenConnectionWhere>;
  ownerConnection?: InputMaybe<TagOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TagOwnerConnectionWhere>;
};

export type TypeBaseConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  _on?: InputMaybe<TypeBaseImplementationsConnectInput>;
};

export type TypeBaseConnectWhere = {
  node: TypeBaseWhere;
};

export type TypeBaseCreateInput = {
  PrimitiveType?: InputMaybe<PrimitiveTypeCreateInput>;
  ArrayType?: InputMaybe<ArrayTypeCreateInput>;
  UnionType?: InputMaybe<UnionTypeCreateInput>;
  InterfaceType?: InputMaybe<InterfaceTypeCreateInput>;
  ElementType?: InputMaybe<ElementTypeCreateInput>;
  RenderPropsType?: InputMaybe<RenderPropsTypeCreateInput>;
  ReactNodeType?: InputMaybe<ReactNodeTypeCreateInput>;
  EnumType?: InputMaybe<EnumTypeCreateInput>;
  LambdaType?: InputMaybe<LambdaTypeCreateInput>;
  PageType?: InputMaybe<PageTypeCreateInput>;
  AppType?: InputMaybe<AppTypeCreateInput>;
  ActionType?: InputMaybe<ActionTypeCreateInput>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeCreateInput>;
};

export type TypeBaseDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  _on?: InputMaybe<TypeBaseImplementationsDeleteInput>;
};

export type TypeBaseDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  _on?: InputMaybe<TypeBaseImplementationsDisconnectInput>;
};

export type TypeBaseImplementationsConnectInput = {
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeConnectInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeConnectInput>>;
  UnionType?: InputMaybe<Array<UnionTypeConnectInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeConnectInput>>;
  ElementType?: InputMaybe<Array<ElementTypeConnectInput>>;
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeConnectInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeConnectInput>>;
  EnumType?: InputMaybe<Array<EnumTypeConnectInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeConnectInput>>;
  PageType?: InputMaybe<Array<PageTypeConnectInput>>;
  AppType?: InputMaybe<Array<AppTypeConnectInput>>;
  ActionType?: InputMaybe<Array<ActionTypeConnectInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeConnectInput>>;
};

export type TypeBaseImplementationsDeleteInput = {
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDeleteInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeDeleteInput>>;
  UnionType?: InputMaybe<Array<UnionTypeDeleteInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeDeleteInput>>;
  ElementType?: InputMaybe<Array<ElementTypeDeleteInput>>;
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDeleteInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDeleteInput>>;
  EnumType?: InputMaybe<Array<EnumTypeDeleteInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeDeleteInput>>;
  PageType?: InputMaybe<Array<PageTypeDeleteInput>>;
  AppType?: InputMaybe<Array<AppTypeDeleteInput>>;
  ActionType?: InputMaybe<Array<ActionTypeDeleteInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDeleteInput>>;
};

export type TypeBaseImplementationsDisconnectInput = {
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDisconnectInput>>;
  ArrayType?: InputMaybe<Array<ArrayTypeDisconnectInput>>;
  UnionType?: InputMaybe<Array<UnionTypeDisconnectInput>>;
  InterfaceType?: InputMaybe<Array<InterfaceTypeDisconnectInput>>;
  ElementType?: InputMaybe<Array<ElementTypeDisconnectInput>>;
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDisconnectInput>>;
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDisconnectInput>>;
  EnumType?: InputMaybe<Array<EnumTypeDisconnectInput>>;
  LambdaType?: InputMaybe<Array<LambdaTypeDisconnectInput>>;
  PageType?: InputMaybe<Array<PageTypeDisconnectInput>>;
  AppType?: InputMaybe<Array<AppTypeDisconnectInput>>;
  ActionType?: InputMaybe<Array<ActionTypeDisconnectInput>>;
  CodeMirrorType?: InputMaybe<Array<CodeMirrorTypeDisconnectInput>>;
};

export type TypeBaseImplementationsUpdateInput = {
  PrimitiveType?: InputMaybe<PrimitiveTypeUpdateInput>;
  ArrayType?: InputMaybe<ArrayTypeUpdateInput>;
  UnionType?: InputMaybe<UnionTypeUpdateInput>;
  InterfaceType?: InputMaybe<InterfaceTypeUpdateInput>;
  ElementType?: InputMaybe<ElementTypeUpdateInput>;
  RenderPropsType?: InputMaybe<RenderPropsTypeUpdateInput>;
  ReactNodeType?: InputMaybe<ReactNodeTypeUpdateInput>;
  EnumType?: InputMaybe<EnumTypeUpdateInput>;
  LambdaType?: InputMaybe<LambdaTypeUpdateInput>;
  PageType?: InputMaybe<PageTypeUpdateInput>;
  AppType?: InputMaybe<AppTypeUpdateInput>;
  ActionType?: InputMaybe<ActionTypeUpdateInput>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeUpdateInput>;
};

export type TypeBaseImplementationsWhere = {
  PrimitiveType?: InputMaybe<PrimitiveTypeWhere>;
  ArrayType?: InputMaybe<ArrayTypeWhere>;
  UnionType?: InputMaybe<UnionTypeWhere>;
  InterfaceType?: InputMaybe<InterfaceTypeWhere>;
  ElementType?: InputMaybe<ElementTypeWhere>;
  RenderPropsType?: InputMaybe<RenderPropsTypeWhere>;
  ReactNodeType?: InputMaybe<ReactNodeTypeWhere>;
  EnumType?: InputMaybe<EnumTypeWhere>;
  LambdaType?: InputMaybe<LambdaTypeWhere>;
  PageType?: InputMaybe<PageTypeWhere>;
  AppType?: InputMaybe<AppTypeWhere>;
  ActionType?: InputMaybe<ActionTypeWhere>;
  CodeMirrorType?: InputMaybe<CodeMirrorTypeWhere>;
};

export type TypeBaseOptions = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  /** Specify one or more TypeBaseSort objects to sort TypeBases by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<TypeBaseSort>>>;
};

export type TypeBaseOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>;
  OR?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>;
  node?: InputMaybe<TypeBaseOwnerNodeAggregationWhereInput>;
};

export type TypeBaseOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
};

export type TypeBaseOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type TypeBaseOwnerConnectionWhere = {
  AND?: InputMaybe<Array<TypeBaseOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<TypeBaseOwnerConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type TypeBaseOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere;
  onCreate: TypeBaseOwnerConnectOrCreateFieldInputOnCreate;
};

export type TypeBaseOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput;
};

export type TypeBaseOwnerCreateFieldInput = {
  node: UserCreateInput;
};

export type TypeBaseOwnerDeleteFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  delete?: InputMaybe<UserDeleteInput>;
};

export type TypeBaseOwnerDisconnectFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  disconnect?: InputMaybe<UserDisconnectInput>;
};

export type TypeBaseOwnerFieldInput = {
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type TypeBaseOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type TypeBaseOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type TypeBaseOwnerUpdateFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  update?: InputMaybe<TypeBaseOwnerUpdateConnectionInput>;
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  disconnect?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
  delete?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

/** Fields to sort TypeBases by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeBaseSort object. */
export type TypeBaseSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type TypeBaseUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  _on?: InputMaybe<TypeBaseImplementationsUpdateInput>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
};

export type TypeBaseWhere = {
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  _on?: InputMaybe<TypeBaseImplementationsWhere>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<TypeBaseOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
};

export type TypeReferenceCreateInput = {
  name: Scalars["String"];
  label: Scalars["String"];
};

export type TypeReferenceOptions = {
  /** Specify one or more TypeReferenceSort objects to sort TypeReferences by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TypeReferenceSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort TypeReferences by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeReferenceSort object. */
export type TypeReferenceSort = {
  name?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type TypeReferenceUpdateInput = {
  name?: InputMaybe<Scalars["String"]>;
  label?: InputMaybe<Scalars["String"]>;
};

export type TypeReferenceWhere = {
  OR?: InputMaybe<Array<TypeReferenceWhere>>;
  AND?: InputMaybe<Array<TypeReferenceWhere>>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  label?: InputMaybe<Scalars["String"]>;
  label_NOT?: InputMaybe<Scalars["String"]>;
  label_IN?: InputMaybe<Array<Scalars["String"]>>;
  label_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  label_CONTAINS?: InputMaybe<Scalars["String"]>;
  label_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  label_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  label_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
};

export type UnionTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>;
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeConnectFieldInput>
  >;
};

export type UnionTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>;
};

export type UnionTypeCreateInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  kind?: TypeKind;
  owner?: InputMaybe<TypeBaseOwnerFieldInput>;
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeFieldInput>;
};

export type UnionTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>;
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>
  >;
};

export type UnionTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>;
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>
  >;
};

export type UnionTypeOptions = {
  /** Specify one or more UnionTypeSort objects to sort UnionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UnionTypeSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type UnionTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>;
  OR?: InputMaybe<Array<UnionTypeOwnerAggregateInput>>;
  node?: InputMaybe<UnionTypeOwnerNodeAggregationWhereInput>;
};

export type UnionTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  auth0Id_EQUAL?: InputMaybe<Scalars["String"]>;
  auth0Id_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  auth0Id_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  auth0Id_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  auth0Id_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  auth0Id_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  auth0Id_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_EQUAL?: InputMaybe<Scalars["String"]>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  email_GT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  email_GTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  email_LT?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  email_LTE?: InputMaybe<Scalars["Int"]>;
  email_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  email_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  email_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_EQUAL?: InputMaybe<Scalars["String"]>;
  username_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  username_GT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  username_GTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  username_LT?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  username_LTE?: InputMaybe<Scalars["Int"]>;
  username_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  username_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  username_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
};

export type UnionTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>;
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeCreateFieldInput>
  >;
};

/** Fields to sort UnionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnionTypeSort object. */
export type UnionTypeSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type UnionTypeTypesOfUnionTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>;
  where?: InputMaybe<TypeBaseConnectWhere>;
};

export type UnionTypeTypesOfUnionTypeConnectionSort = {
  node?: InputMaybe<TypeBaseSort>;
};

export type UnionTypeTypesOfUnionTypeConnectionWhere = {
  AND?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>;
  OR?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>;
  node?: InputMaybe<TypeBaseWhere>;
  node_NOT?: InputMaybe<TypeBaseWhere>;
};

export type UnionTypeTypesOfUnionTypeCreateFieldInput = {
  node: TypeBaseCreateInput;
};

export type UnionTypeTypesOfUnionTypeDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>;
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
};

export type UnionTypeTypesOfUnionTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>;
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
};

export type UnionTypeTypesOfUnionTypeFieldInput = {
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>;
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>;
};

export type UnionTypeTypesOfUnionTypeUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>;
};

export type UnionTypeTypesOfUnionTypeUpdateFieldInput = {
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>;
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>>;
  update?: InputMaybe<UnionTypeTypesOfUnionTypeUpdateConnectionInput>;
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
};

export type UnionTypeUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>;
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUpdateFieldInput>
  >;
};

export type UnionTypeWhere = {
  OR?: InputMaybe<Array<UnionTypeWhere>>;
  AND?: InputMaybe<Array<UnionTypeWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  kind?: InputMaybe<TypeKind>;
  kind_NOT?: InputMaybe<TypeKind>;
  kind_IN?: InputMaybe<Array<TypeKind>>;
  kind_NOT_IN?: InputMaybe<Array<TypeKind>>;
  owner?: InputMaybe<UserWhere>;
  owner_NOT?: InputMaybe<UserWhere>;
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>;
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>;
  /** @deprecated Use `typesOfUnionTypeConnection_SOME` instead. */
  typesOfUnionTypeConnection?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  /** @deprecated Use `typesOfUnionTypeConnection_NONE` instead. */
  typesOfUnionTypeConnection_NOT?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>;
};

export type UpdateDomainMutationInput = {
  name: Scalars["String"];
  appId: Scalars["String"];
  id: Scalars["ID"];
};

export type UserAppsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<UserAppsAggregateInput>>;
  OR?: InputMaybe<Array<UserAppsAggregateInput>>;
  node?: InputMaybe<UserAppsNodeAggregationWhereInput>;
};

export type UserAppsConnectFieldInput = {
  where?: InputMaybe<AppConnectWhere>;
  connect?: InputMaybe<Array<AppConnectInput>>;
};

export type UserAppsConnectionSort = {
  node?: InputMaybe<AppSort>;
};

export type UserAppsConnectionWhere = {
  AND?: InputMaybe<Array<UserAppsConnectionWhere>>;
  OR?: InputMaybe<Array<UserAppsConnectionWhere>>;
  node?: InputMaybe<AppWhere>;
  node_NOT?: InputMaybe<AppWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type UserComponentsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<UserComponentsAggregateInput>>;
  OR?: InputMaybe<Array<UserComponentsAggregateInput>>;
  node?: InputMaybe<UserComponentsNodeAggregationWhereInput>;
};

export type UserComponentsConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>;
  connect?: InputMaybe<Array<ComponentConnectInput>>;
};

export type UserComponentsConnectionSort = {
  node?: InputMaybe<ComponentSort>;
};

export type UserComponentsConnectionWhere = {
  AND?: InputMaybe<Array<UserComponentsConnectionWhere>>;
  OR?: InputMaybe<Array<UserComponentsConnectionWhere>>;
  node?: InputMaybe<ComponentWhere>;
  node_NOT?: InputMaybe<ComponentWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  tags?: InputMaybe<Array<UserTagsConnectFieldInput>>;
};

export type UserConnectOrCreateInput = {
  apps?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>;
  elements?: InputMaybe<Array<UserElementsConnectOrCreateFieldInput>>;
  components?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>;
  tags?: InputMaybe<Array<UserTagsConnectOrCreateFieldInput>>;
};

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  auth0Id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  roles: Array<Role>;
  types?: InputMaybe<UserTypesFieldInput>;
  apps?: InputMaybe<UserAppsFieldInput>;
  elements?: InputMaybe<UserElementsFieldInput>;
  components?: InputMaybe<UserComponentsFieldInput>;
  tags?: InputMaybe<UserTagsFieldInput>;
};

export type UserDeleteInput = {
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>;
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>;
  elements?: InputMaybe<Array<UserElementsDeleteFieldInput>>;
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>;
  tags?: InputMaybe<Array<UserTagsDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>;
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>;
  elements?: InputMaybe<Array<UserElementsDisconnectFieldInput>>;
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>;
  tags?: InputMaybe<Array<UserTagsDisconnectFieldInput>>;
};

export type UserElementsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<UserElementsAggregateInput>>;
  OR?: InputMaybe<Array<UserElementsAggregateInput>>;
  node?: InputMaybe<UserElementsNodeAggregationWhereInput>;
};

export type UserElementsConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>;
  connect?: InputMaybe<Array<ElementConnectInput>>;
};

export type UserElementsConnectionSort = {
  node?: InputMaybe<ElementSort>;
};

export type UserElementsConnectionWhere = {
  AND?: InputMaybe<Array<UserElementsConnectionWhere>>;
  OR?: InputMaybe<Array<UserElementsConnectionWhere>>;
  node?: InputMaybe<ElementWhere>;
  node_NOT?: InputMaybe<ElementWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_EQUAL?: InputMaybe<Scalars["String"]>;
  customCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  customCss_GT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  customCss_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  customCss_LT?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  customCss_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  customCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  customCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_EQUAL?: InputMaybe<Scalars["String"]>;
  guiCss_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  guiCss_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  guiCss_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  guiCss_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  guiCss_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  guiCss_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  guiCss_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_EQUAL?: InputMaybe<Scalars["String"]>;
  propTransformationJs_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  propTransformationJs_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  propTransformationJs_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderForEachPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderForEachPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderForEachPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_EQUAL?: InputMaybe<Scalars["String"]>;
  renderIfPropKey_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  renderIfPropKey_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  renderIfPropKey_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  preRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  preRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  preRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_EQUAL?: InputMaybe<Scalars["String"]>;
  postRenderActionId_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  postRenderActionId_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  postRenderActionId_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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
  auth0Id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
};

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type UserRelationInput = {
  types?: InputMaybe<Array<UserTypesCreateFieldInput>>;
  apps?: InputMaybe<Array<UserAppsCreateFieldInput>>;
  elements?: InputMaybe<Array<UserElementsCreateFieldInput>>;
  components?: InputMaybe<Array<UserComponentsCreateFieldInput>>;
  tags?: InputMaybe<Array<UserTagsCreateFieldInput>>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>;
  auth0Id?: InputMaybe<SortDirection>;
  email?: InputMaybe<SortDirection>;
  username?: InputMaybe<SortDirection>;
};

export type UserTagsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<UserTagsAggregateInput>>;
  OR?: InputMaybe<Array<UserTagsAggregateInput>>;
  node?: InputMaybe<UserTagsNodeAggregationWhereInput>;
};

export type UserTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
};

export type UserTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type UserTagsConnectionWhere = {
  AND?: InputMaybe<Array<UserTagsConnectionWhere>>;
  OR?: InputMaybe<Array<UserTagsConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
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
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  name_EQUAL?: InputMaybe<Scalars["String"]>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  name_GT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  name_GTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  name_LT?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  name_LTE?: InputMaybe<Scalars["Int"]>;
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
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

export type UserTypesConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>;
  where?: InputMaybe<TypeBaseConnectWhere>;
};

export type UserTypesConnectionSort = {
  node?: InputMaybe<TypeBaseSort>;
};

export type UserTypesConnectionWhere = {
  AND?: InputMaybe<Array<UserTypesConnectionWhere>>;
  OR?: InputMaybe<Array<UserTypesConnectionWhere>>;
  node?: InputMaybe<TypeBaseWhere>;
  node_NOT?: InputMaybe<TypeBaseWhere>;
};

export type UserTypesCreateFieldInput = {
  node: TypeBaseCreateInput;
};

export type UserTypesDeleteFieldInput = {
  delete?: InputMaybe<TypeBaseDeleteInput>;
  where?: InputMaybe<UserTypesConnectionWhere>;
};

export type UserTypesDisconnectFieldInput = {
  disconnect?: InputMaybe<TypeBaseDisconnectInput>;
  where?: InputMaybe<UserTypesConnectionWhere>;
};

export type UserTypesFieldInput = {
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>;
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>;
};

export type UserTypesUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>;
};

export type UserTypesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>;
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserTypesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserTypesDisconnectFieldInput>>;
  update?: InputMaybe<UserTypesUpdateConnectionInput>;
  where?: InputMaybe<UserTypesConnectionWhere>;
};

export type UserUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
  auth0Id?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UserUpdateInput = {
  auth0Id?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
  roles?: InputMaybe<Array<Role>>;
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>;
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>;
  elements?: InputMaybe<Array<UserElementsUpdateFieldInput>>;
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>;
  tags?: InputMaybe<Array<UserTagsUpdateFieldInput>>;
};

export type UserWhere = {
  OR?: InputMaybe<Array<UserWhere>>;
  AND?: InputMaybe<Array<UserWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  auth0Id?: InputMaybe<Scalars["String"]>;
  auth0Id_NOT?: InputMaybe<Scalars["String"]>;
  auth0Id_IN?: InputMaybe<Array<Scalars["String"]>>;
  auth0Id_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  auth0Id_CONTAINS?: InputMaybe<Scalars["String"]>;
  auth0Id_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  auth0Id_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  auth0Id_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  auth0Id_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  auth0Id_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_NOT?: InputMaybe<Scalars["String"]>;
  email_IN?: InputMaybe<Array<Scalars["String"]>>;
  email_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  email_CONTAINS?: InputMaybe<Scalars["String"]>;
  email_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  email_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  email_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
  username_NOT?: InputMaybe<Scalars["String"]>;
  username_IN?: InputMaybe<Array<Scalars["String"]>>;
  username_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  username_CONTAINS?: InputMaybe<Scalars["String"]>;
  username_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  username_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  username_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  username_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  username_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  roles?: InputMaybe<Array<Role>>;
  roles_NOT?: InputMaybe<Array<Role>>;
  roles_INCLUDES?: InputMaybe<Role>;
  roles_NOT_INCLUDES?: InputMaybe<Role>;
  /** @deprecated Use `apps_SOME` instead. */
  apps?: InputMaybe<AppWhere>;
  /** @deprecated Use `apps_NONE` instead. */
  apps_NOT?: InputMaybe<AppWhere>;
  appsAggregate?: InputMaybe<UserAppsAggregateInput>;
  /** Return Users where all of the related Apps match this filter */
  apps_ALL?: InputMaybe<AppWhere>;
  /** Return Users where none of the related Apps match this filter */
  apps_NONE?: InputMaybe<AppWhere>;
  /** Return Users where one of the related Apps match this filter */
  apps_SINGLE?: InputMaybe<AppWhere>;
  /** Return Users where some of the related Apps match this filter */
  apps_SOME?: InputMaybe<AppWhere>;
  /** @deprecated Use `elements_SOME` instead. */
  elements?: InputMaybe<ElementWhere>;
  /** @deprecated Use `elements_NONE` instead. */
  elements_NOT?: InputMaybe<ElementWhere>;
  elementsAggregate?: InputMaybe<UserElementsAggregateInput>;
  /** Return Users where all of the related Elements match this filter */
  elements_ALL?: InputMaybe<ElementWhere>;
  /** Return Users where none of the related Elements match this filter */
  elements_NONE?: InputMaybe<ElementWhere>;
  /** Return Users where one of the related Elements match this filter */
  elements_SINGLE?: InputMaybe<ElementWhere>;
  /** Return Users where some of the related Elements match this filter */
  elements_SOME?: InputMaybe<ElementWhere>;
  /** @deprecated Use `components_SOME` instead. */
  components?: InputMaybe<ComponentWhere>;
  /** @deprecated Use `components_NONE` instead. */
  components_NOT?: InputMaybe<ComponentWhere>;
  componentsAggregate?: InputMaybe<UserComponentsAggregateInput>;
  /** Return Users where all of the related Components match this filter */
  components_ALL?: InputMaybe<ComponentWhere>;
  /** Return Users where none of the related Components match this filter */
  components_NONE?: InputMaybe<ComponentWhere>;
  /** Return Users where one of the related Components match this filter */
  components_SINGLE?: InputMaybe<ComponentWhere>;
  /** Return Users where some of the related Components match this filter */
  components_SOME?: InputMaybe<ComponentWhere>;
  /** @deprecated Use `tags_SOME` instead. */
  tags?: InputMaybe<TagWhere>;
  /** @deprecated Use `tags_NONE` instead. */
  tags_NOT?: InputMaybe<TagWhere>;
  tagsAggregate?: InputMaybe<UserTagsAggregateInput>;
  /** Return Users where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>;
  /** Return Users where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>;
  /** Return Users where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>;
  /** Return Users where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>;
  /** @deprecated Use `typesConnection_SOME` instead. */
  typesConnection?: InputMaybe<UserTypesConnectionWhere>;
  /** @deprecated Use `typesConnection_NONE` instead. */
  typesConnection_NOT?: InputMaybe<UserTypesConnectionWhere>;
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>;
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>;
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>;
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>;
  /** @deprecated Use `appsConnection_SOME` instead. */
  appsConnection?: InputMaybe<UserAppsConnectionWhere>;
  /** @deprecated Use `appsConnection_NONE` instead. */
  appsConnection_NOT?: InputMaybe<UserAppsConnectionWhere>;
  appsConnection_ALL?: InputMaybe<UserAppsConnectionWhere>;
  appsConnection_NONE?: InputMaybe<UserAppsConnectionWhere>;
  appsConnection_SINGLE?: InputMaybe<UserAppsConnectionWhere>;
  appsConnection_SOME?: InputMaybe<UserAppsConnectionWhere>;
  /** @deprecated Use `elementsConnection_SOME` instead. */
  elementsConnection?: InputMaybe<UserElementsConnectionWhere>;
  /** @deprecated Use `elementsConnection_NONE` instead. */
  elementsConnection_NOT?: InputMaybe<UserElementsConnectionWhere>;
  elementsConnection_ALL?: InputMaybe<UserElementsConnectionWhere>;
  elementsConnection_NONE?: InputMaybe<UserElementsConnectionWhere>;
  elementsConnection_SINGLE?: InputMaybe<UserElementsConnectionWhere>;
  elementsConnection_SOME?: InputMaybe<UserElementsConnectionWhere>;
  /** @deprecated Use `componentsConnection_SOME` instead. */
  componentsConnection?: InputMaybe<UserComponentsConnectionWhere>;
  /** @deprecated Use `componentsConnection_NONE` instead. */
  componentsConnection_NOT?: InputMaybe<UserComponentsConnectionWhere>;
  componentsConnection_ALL?: InputMaybe<UserComponentsConnectionWhere>;
  componentsConnection_NONE?: InputMaybe<UserComponentsConnectionWhere>;
  componentsConnection_SINGLE?: InputMaybe<UserComponentsConnectionWhere>;
  componentsConnection_SOME?: InputMaybe<UserComponentsConnectionWhere>;
  /** @deprecated Use `tagsConnection_SOME` instead. */
  tagsConnection?: InputMaybe<UserTagsConnectionWhere>;
  /** @deprecated Use `tagsConnection_NONE` instead. */
  tagsConnection_NOT?: InputMaybe<UserTagsConnectionWhere>;
  tagsConnection_ALL?: InputMaybe<UserTagsConnectionWhere>;
  tagsConnection_NONE?: InputMaybe<UserTagsConnectionWhere>;
  tagsConnection_SINGLE?: InputMaybe<UserTagsConnectionWhere>;
  tagsConnection_SOME?: InputMaybe<UserTagsConnectionWhere>;
};

export type VercelDomainConfigDataCreateInput = {
  misconfigured: Scalars["Boolean"];
};

export type VercelDomainConfigDataOptions = {
  /** Specify one or more VercelDomainConfigDataSort objects to sort VercelDomainConfigData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelDomainConfigDataSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort VercelDomainConfigData by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelDomainConfigDataSort object. */
export type VercelDomainConfigDataSort = {
  misconfigured?: InputMaybe<SortDirection>;
};

export type VercelDomainConfigDataUpdateInput = {
  misconfigured?: InputMaybe<Scalars["Boolean"]>;
};

export type VercelDomainConfigDataWhere = {
  OR?: InputMaybe<Array<VercelDomainConfigDataWhere>>;
  AND?: InputMaybe<Array<VercelDomainConfigDataWhere>>;
  misconfigured?: InputMaybe<Scalars["Boolean"]>;
  misconfigured_NOT?: InputMaybe<Scalars["Boolean"]>;
};

export type VercelProjectDomainDataCreateInput = {
  verified: Scalars["Boolean"];
};

export type VercelProjectDomainDataOptions = {
  /** Specify one or more VercelProjectDomainDataSort objects to sort VercelProjectDomainData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<VercelProjectDomainDataSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort VercelProjectDomainData by. The order in which sorts are applied is not guaranteed when specifying many fields in one VercelProjectDomainDataSort object. */
export type VercelProjectDomainDataSort = {
  verified?: InputMaybe<SortDirection>;
};

export type VercelProjectDomainDataUpdateInput = {
  verified?: InputMaybe<Scalars["Boolean"]>;
};

export type VercelProjectDomainDataWhere = {
  OR?: InputMaybe<Array<VercelProjectDomainDataWhere>>;
  AND?: InputMaybe<Array<VercelProjectDomainDataWhere>>;
  verified?: InputMaybe<Scalars["Boolean"]>;
  verified_NOT?: InputMaybe<Scalars["Boolean"]>;
};

export type WithOwnerOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>;
  connect?: InputMaybe<UserConnectInput>;
};

export type WithOwnerOwnerConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type WithOwnerOwnerConnectionWhere = {
  AND?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>;
  OR?: InputMaybe<Array<WithOwnerOwnerConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
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

export interface ResetDatabaseMutationResponseAggregateSelectionInput {
  count?: boolean;
}

export declare class ResetDatabaseMutationResponseModel {
  public find(args?: {
    where?: ResetDatabaseMutationResponseWhere;

    options?: ResetDatabaseMutationResponseOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ResetDatabaseMutationResponse[]>;
  public create(args: {
    input: ResetDatabaseMutationResponseCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateResetDatabaseMutationResponsesMutationResponse>;
  public update(args: {
    where?: ResetDatabaseMutationResponseWhere;
    update?: ResetDatabaseMutationResponseUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateResetDatabaseMutationResponsesMutationResponse>;
  public delete(args: {
    where?: ResetDatabaseMutationResponseWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ResetDatabaseMutationResponseWhere;

    aggregate: ResetDatabaseMutationResponseAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ResetDatabaseMutationResponseAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface UserAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  auth0Id?: StringAggregateInputNonNullable;
  email?: StringAggregateInputNonNullable;
  username?: StringAggregateInputNonNullable;
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere;

    options?: UserOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<User[]>;
  public create(args: {
    input: UserCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateUsersMutationResponse>;
  public update(args: {
    where?: UserWhere;
    update?: UserUpdateInput;
    connect?: UserConnectInput;
    disconnect?: UserDisconnectInput;
    create?: UserCreateInput;
    connectOrCreate?: UserConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateUsersMutationResponse>;
  public delete(args: {
    where?: UserWhere;
    delete?: UserDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: UserWhere;

    aggregate: UserAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<UserAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface AppAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
  slug?: StringAggregateInputNonNullable;
}

export declare class AppModel {
  public find(args?: {
    where?: AppWhere;

    options?: AppOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<App[]>;
  public create(args: {
    input: AppCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateAppsMutationResponse>;
  public update(args: {
    where?: AppWhere;
    update?: AppUpdateInput;
    connect?: AppConnectInput;
    disconnect?: AppDisconnectInput;
    create?: AppCreateInput;
    connectOrCreate?: AppConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateAppsMutationResponse>;
  public delete(args: {
    where?: AppWhere;
    delete?: AppDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: AppWhere;

    aggregate: AppAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<AppAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface AtomAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
  icon?: StringAggregateInputNullable;
}

export declare class AtomModel {
  public find(args?: {
    where?: AtomWhere;

    options?: AtomOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Atom[]>;
  public create(args: {
    input: AtomCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateAtomsMutationResponse>;
  public update(args: {
    where?: AtomWhere;
    update?: AtomUpdateInput;
    connect?: AtomConnectInput;
    disconnect?: AtomDisconnectInput;
    create?: AtomCreateInput;
    connectOrCreate?: AtomConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateAtomsMutationResponse>;
  public delete(args: {
    where?: AtomWhere;
    delete?: AtomDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: AtomWhere;

    aggregate: AtomAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<AtomAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface CreateInfoAggregateSelectionInput {
  count?: boolean;
  bookmark?: StringAggregateInputNullable;
  nodesCreated?: IntAggregateInputNonNullable;
  relationshipsCreated?: IntAggregateInputNonNullable;
}

export declare class CreateInfoModel {
  public find(args?: {
    where?: CreateInfoWhere;

    options?: CreateInfoOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateInfo[]>;
  public create(args: {
    input: CreateInfoCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCreateInfosMutationResponse>;
  public update(args: {
    where?: CreateInfoWhere;
    update?: CreateInfoUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCreateInfosMutationResponse>;
  public delete(args: {
    where?: CreateInfoWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CreateInfoWhere;

    aggregate: CreateInfoAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CreateInfoAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PageAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
  slug?: StringAggregateInputNonNullable;
}

export declare class PageModel {
  public find(args?: {
    where?: PageWhere;

    options?: PageOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Page[]>;
  public create(args: {
    input: PageCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePagesMutationResponse>;
  public update(args: {
    where?: PageWhere;
    update?: PageUpdateInput;
    connect?: PageConnectInput;
    disconnect?: PageDisconnectInput;
    create?: PageCreateInput;
    connectOrCreate?: PageConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePagesMutationResponse>;
  public delete(args: {
    where?: PageWhere;
    delete?: PageDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PageWhere;

    aggregate: PageAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PageAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface TypeReferenceAggregateSelectionInput {
  count?: boolean;
  name?: StringAggregateInputNonNullable;
  label?: StringAggregateInputNonNullable;
}

export declare class TypeReferenceModel {
  public find(args?: {
    where?: TypeReferenceWhere;

    options?: TypeReferenceOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<TypeReference[]>;
  public create(args: {
    input: TypeReferenceCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTypeReferencesMutationResponse>;
  public update(args: {
    where?: TypeReferenceWhere;
    update?: TypeReferenceUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTypeReferencesMutationResponse>;
  public delete(args: {
    where?: TypeReferenceWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TypeReferenceWhere;

    aggregate: TypeReferenceAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TypeReferenceAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PrimitiveTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class PrimitiveTypeModel {
  public find(args?: {
    where?: PrimitiveTypeWhere;

    options?: PrimitiveTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<PrimitiveType[]>;
  public create(args: {
    input: PrimitiveTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePrimitiveTypesMutationResponse>;
  public update(args: {
    where?: PrimitiveTypeWhere;
    update?: PrimitiveTypeUpdateInput;
    connect?: PrimitiveTypeConnectInput;
    disconnect?: PrimitiveTypeDisconnectInput;
    create?: PrimitiveTypeCreateInput;
    connectOrCreate?: PrimitiveTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePrimitiveTypesMutationResponse>;
  public delete(args: {
    where?: PrimitiveTypeWhere;
    delete?: PrimitiveTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PrimitiveTypeWhere;

    aggregate: PrimitiveTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PrimitiveTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ArrayTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ArrayTypeModel {
  public find(args?: {
    where?: ArrayTypeWhere;

    options?: ArrayTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ArrayType[]>;
  public create(args: {
    input: ArrayTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateArrayTypesMutationResponse>;
  public update(args: {
    where?: ArrayTypeWhere;
    update?: ArrayTypeUpdateInput;
    connect?: ArrayTypeConnectInput;
    disconnect?: ArrayTypeDisconnectInput;
    create?: ArrayTypeCreateInput;
    connectOrCreate?: ArrayTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateArrayTypesMutationResponse>;
  public delete(args: {
    where?: ArrayTypeWhere;
    delete?: ArrayTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ArrayTypeWhere;

    aggregate: ArrayTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ArrayTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface UnionTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class UnionTypeModel {
  public find(args?: {
    where?: UnionTypeWhere;

    options?: UnionTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UnionType[]>;
  public create(args: {
    input: UnionTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateUnionTypesMutationResponse>;
  public update(args: {
    where?: UnionTypeWhere;
    update?: UnionTypeUpdateInput;
    connect?: UnionTypeConnectInput;
    disconnect?: UnionTypeDisconnectInput;
    create?: UnionTypeCreateInput;
    connectOrCreate?: UnionTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateUnionTypesMutationResponse>;
  public delete(args: {
    where?: UnionTypeWhere;
    delete?: UnionTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: UnionTypeWhere;

    aggregate: UnionTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<UnionTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface InterfaceTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class InterfaceTypeModel {
  public find(args?: {
    where?: InterfaceTypeWhere;

    options?: InterfaceTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<InterfaceType[]>;
  public create(args: {
    input: InterfaceTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateInterfaceTypesMutationResponse>;
  public update(args: {
    where?: InterfaceTypeWhere;
    update?: InterfaceTypeUpdateInput;
    connect?: InterfaceTypeConnectInput;
    disconnect?: InterfaceTypeDisconnectInput;
    create?: InterfaceTypeCreateInput;
    connectOrCreate?: InterfaceTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateInterfaceTypesMutationResponse>;
  public delete(args: {
    where?: InterfaceTypeWhere;
    delete?: InterfaceTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: InterfaceTypeWhere;

    aggregate: InterfaceTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<InterfaceTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ElementTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ElementTypeModel {
  public find(args?: {
    where?: ElementTypeWhere;

    options?: ElementTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ElementType[]>;
  public create(args: {
    input: ElementTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateElementTypesMutationResponse>;
  public update(args: {
    where?: ElementTypeWhere;
    update?: ElementTypeUpdateInput;
    connect?: ElementTypeConnectInput;
    disconnect?: ElementTypeDisconnectInput;
    create?: ElementTypeCreateInput;
    connectOrCreate?: ElementTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateElementTypesMutationResponse>;
  public delete(args: {
    where?: ElementTypeWhere;
    delete?: ElementTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ElementTypeWhere;

    aggregate: ElementTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ElementTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface RenderPropsTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class RenderPropsTypeModel {
  public find(args?: {
    where?: RenderPropsTypeWhere;

    options?: RenderPropsTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<RenderPropsType[]>;
  public create(args: {
    input: RenderPropsTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateRenderPropsTypesMutationResponse>;
  public update(args: {
    where?: RenderPropsTypeWhere;
    update?: RenderPropsTypeUpdateInput;
    connect?: RenderPropsTypeConnectInput;
    disconnect?: RenderPropsTypeDisconnectInput;
    create?: RenderPropsTypeCreateInput;
    connectOrCreate?: RenderPropsTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateRenderPropsTypesMutationResponse>;
  public delete(args: {
    where?: RenderPropsTypeWhere;
    delete?: RenderPropsTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: RenderPropsTypeWhere;

    aggregate: RenderPropsTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<RenderPropsTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ReactNodeTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ReactNodeTypeModel {
  public find(args?: {
    where?: ReactNodeTypeWhere;

    options?: ReactNodeTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ReactNodeType[]>;
  public create(args: {
    input: ReactNodeTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateReactNodeTypesMutationResponse>;
  public update(args: {
    where?: ReactNodeTypeWhere;
    update?: ReactNodeTypeUpdateInput;
    connect?: ReactNodeTypeConnectInput;
    disconnect?: ReactNodeTypeDisconnectInput;
    create?: ReactNodeTypeCreateInput;
    connectOrCreate?: ReactNodeTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateReactNodeTypesMutationResponse>;
  public delete(args: {
    where?: ReactNodeTypeWhere;
    delete?: ReactNodeTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ReactNodeTypeWhere;

    aggregate: ReactNodeTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ReactNodeTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface EnumTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class EnumTypeModel {
  public find(args?: {
    where?: EnumTypeWhere;

    options?: EnumTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<EnumType[]>;
  public create(args: {
    input: EnumTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateEnumTypesMutationResponse>;
  public update(args: {
    where?: EnumTypeWhere;
    update?: EnumTypeUpdateInput;
    connect?: EnumTypeConnectInput;
    disconnect?: EnumTypeDisconnectInput;
    create?: EnumTypeCreateInput;
    connectOrCreate?: EnumTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateEnumTypesMutationResponse>;
  public delete(args: {
    where?: EnumTypeWhere;
    delete?: EnumTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: EnumTypeWhere;

    aggregate: EnumTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<EnumTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface EnumTypeValueAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNullable;
  value?: StringAggregateInputNonNullable;
}

export declare class EnumTypeValueModel {
  public find(args?: {
    where?: EnumTypeValueWhere;

    options?: EnumTypeValueOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<EnumTypeValue[]>;
  public create(args: {
    input: EnumTypeValueCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateEnumTypeValuesMutationResponse>;
  public update(args: {
    where?: EnumTypeValueWhere;
    update?: EnumTypeValueUpdateInput;
    connect?: EnumTypeValueConnectInput;
    disconnect?: EnumTypeValueDisconnectInput;
    create?: EnumTypeValueCreateInput;
    connectOrCreate?: EnumTypeValueConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateEnumTypeValuesMutationResponse>;
  public delete(args: {
    where?: EnumTypeValueWhere;
    delete?: EnumTypeValueDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: EnumTypeValueWhere;

    aggregate: EnumTypeValueAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<EnumTypeValueAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface LambdaTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class LambdaTypeModel {
  public find(args?: {
    where?: LambdaTypeWhere;

    options?: LambdaTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<LambdaType[]>;
  public create(args: {
    input: LambdaTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateLambdaTypesMutationResponse>;
  public update(args: {
    where?: LambdaTypeWhere;
    update?: LambdaTypeUpdateInput;
    connect?: LambdaTypeConnectInput;
    disconnect?: LambdaTypeDisconnectInput;
    create?: LambdaTypeCreateInput;
    connectOrCreate?: LambdaTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateLambdaTypesMutationResponse>;
  public delete(args: {
    where?: LambdaTypeWhere;
    delete?: LambdaTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: LambdaTypeWhere;

    aggregate: LambdaTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<LambdaTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PageTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class PageTypeModel {
  public find(args?: {
    where?: PageTypeWhere;

    options?: PageTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<PageType[]>;
  public create(args: {
    input: PageTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePageTypesMutationResponse>;
  public update(args: {
    where?: PageTypeWhere;
    update?: PageTypeUpdateInput;
    connect?: PageTypeConnectInput;
    disconnect?: PageTypeDisconnectInput;
    create?: PageTypeCreateInput;
    connectOrCreate?: PageTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePageTypesMutationResponse>;
  public delete(args: {
    where?: PageTypeWhere;
    delete?: PageTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PageTypeWhere;

    aggregate: PageTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PageTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface AppTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class AppTypeModel {
  public find(args?: {
    where?: AppTypeWhere;

    options?: AppTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<AppType[]>;
  public create(args: {
    input: AppTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateAppTypesMutationResponse>;
  public update(args: {
    where?: AppTypeWhere;
    update?: AppTypeUpdateInput;
    connect?: AppTypeConnectInput;
    disconnect?: AppTypeDisconnectInput;
    create?: AppTypeCreateInput;
    connectOrCreate?: AppTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateAppTypesMutationResponse>;
  public delete(args: {
    where?: AppTypeWhere;
    delete?: AppTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: AppTypeWhere;

    aggregate: AppTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<AppTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ActionTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ActionTypeModel {
  public find(args?: {
    where?: ActionTypeWhere;

    options?: ActionTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ActionType[]>;
  public create(args: {
    input: ActionTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateActionTypesMutationResponse>;
  public update(args: {
    where?: ActionTypeWhere;
    update?: ActionTypeUpdateInput;
    connect?: ActionTypeConnectInput;
    disconnect?: ActionTypeDisconnectInput;
    create?: ActionTypeCreateInput;
    connectOrCreate?: ActionTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateActionTypesMutationResponse>;
  public delete(args: {
    where?: ActionTypeWhere;
    delete?: ActionTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ActionTypeWhere;

    aggregate: ActionTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ActionTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface CodeMirrorTypeAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class CodeMirrorTypeModel {
  public find(args?: {
    where?: CodeMirrorTypeWhere;

    options?: CodeMirrorTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CodeMirrorType[]>;
  public create(args: {
    input: CodeMirrorTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCodeMirrorTypesMutationResponse>;
  public update(args: {
    where?: CodeMirrorTypeWhere;
    update?: CodeMirrorTypeUpdateInput;
    connect?: CodeMirrorTypeConnectInput;
    disconnect?: CodeMirrorTypeDisconnectInput;
    create?: CodeMirrorTypeCreateInput;
    connectOrCreate?: CodeMirrorTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCodeMirrorTypesMutationResponse>;
  public delete(args: {
    where?: CodeMirrorTypeWhere;
    delete?: CodeMirrorTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CodeMirrorTypeWhere;

    aggregate: CodeMirrorTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CodeMirrorTypeAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface TagAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere;

    options?: TagOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Tag[]>;
  public create(args: {
    input: TagCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagsMutationResponse>;
  public update(args: {
    where?: TagWhere;
    update?: TagUpdateInput;
    connect?: TagConnectInput;
    disconnect?: TagDisconnectInput;
    create?: TagCreateInput;
    connectOrCreate?: TagConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagsMutationResponse>;
  public delete(args: {
    where?: TagWhere;
    delete?: TagDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagWhere;

    aggregate: TagAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface TagGraphOptionsAggregateSelectionInput {
  count?: boolean;
  sort?: IntAggregateInputNullable;
  limit?: IntAggregateInputNullable;
}

export declare class TagGraphOptionsModel {
  public find(args?: {
    where?: TagGraphOptionsWhere;

    options?: TagGraphOptionsOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<TagGraphOptions[]>;
  public create(args: {
    input: TagGraphOptionsCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagGraphOptionsMutationResponse>;
  public update(args: {
    where?: TagGraphOptionsWhere;
    update?: TagGraphOptionsUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagGraphOptionsMutationResponse>;
  public delete(args: {
    where?: TagGraphOptionsWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagGraphOptionsWhere;

    aggregate: TagGraphOptionsAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagGraphOptionsAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface TagGraphAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class TagGraphModel {
  public find(args?: {
    where?: TagGraphWhere;

    options?: TagGraphOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<TagGraph[]>;
  public create(args: {
    input: TagGraphCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagGraphsMutationResponse>;
  public update(args: {
    where?: TagGraphWhere;
    update?: TagGraphUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagGraphsMutationResponse>;
  public delete(args: {
    where?: TagGraphWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagGraphWhere;

    aggregate: TagGraphAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagGraphAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ElementGraphAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
}

export declare class ElementGraphModel {
  public find(args?: {
    where?: ElementGraphWhere;

    options?: ElementGraphOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ElementGraph[]>;
  public create(args: {
    input: ElementGraphCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateElementGraphsMutationResponse>;
  public update(args: {
    where?: ElementGraphWhere;
    update?: ElementGraphUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateElementGraphsMutationResponse>;
  public delete(args: {
    where?: ElementGraphWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ElementGraphWhere;

    aggregate: ElementGraphAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ElementGraphAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ElementAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNullable;
  customCss?: StringAggregateInputNullable;
  guiCss?: StringAggregateInputNullable;
  propTransformationJs?: StringAggregateInputNullable;
  renderForEachPropKey?: StringAggregateInputNullable;
  renderIfPropKey?: StringAggregateInputNullable;
  preRenderActionId?: StringAggregateInputNullable;
  postRenderActionId?: StringAggregateInputNullable;
}

export declare class ElementModel {
  public find(args?: {
    where?: ElementWhere;

    options?: ElementOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Element[]>;
  public create(args: {
    input: ElementCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateElementsMutationResponse>;
  public update(args: {
    where?: ElementWhere;
    update?: ElementUpdateInput;
    connect?: ElementConnectInput;
    disconnect?: ElementDisconnectInput;
    create?: ElementCreateInput;
    connectOrCreate?: ElementConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateElementsMutationResponse>;
  public delete(args: {
    where?: ElementWhere;
    delete?: ElementDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ElementWhere;

    aggregate: ElementAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ElementAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PropAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  data?: StringAggregateInputNonNullable;
}

export declare class PropModel {
  public find(args?: {
    where?: PropWhere;

    options?: PropOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Prop[]>;
  public create(args: {
    input: PropCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePropsMutationResponse>;
  public update(args: {
    where?: PropWhere;
    update?: PropUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePropsMutationResponse>;
  public delete(args: {
    where?: PropWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PropWhere;

    aggregate: PropAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PropAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PropMapBindingAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  sourceKey?: StringAggregateInputNonNullable;
  targetKey?: StringAggregateInputNonNullable;
}

export declare class PropMapBindingModel {
  public find(args?: {
    where?: PropMapBindingWhere;

    options?: PropMapBindingOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<PropMapBinding[]>;
  public create(args: {
    input: PropMapBindingCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePropMapBindingsMutationResponse>;
  public update(args: {
    where?: PropMapBindingWhere;
    update?: PropMapBindingUpdateInput;
    connect?: PropMapBindingConnectInput;
    disconnect?: PropMapBindingDisconnectInput;
    create?: PropMapBindingCreateInput;
    connectOrCreate?: PropMapBindingConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePropMapBindingsMutationResponse>;
  public delete(args: {
    where?: PropMapBindingWhere;
    delete?: PropMapBindingDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PropMapBindingWhere;

    aggregate: PropMapBindingAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PropMapBindingAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface HookAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
}

export declare class HookModel {
  public find(args?: {
    where?: HookWhere;

    options?: HookOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Hook[]>;
  public create(args: {
    input: HookCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateHooksMutationResponse>;
  public update(args: {
    where?: HookWhere;
    update?: HookUpdateInput;
    connect?: HookConnectInput;
    disconnect?: HookDisconnectInput;
    create?: HookCreateInput;
    connectOrCreate?: HookConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateHooksMutationResponse>;
  public delete(args: {
    where?: HookWhere;
    delete?: HookDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: HookWhere;

    aggregate: HookAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<HookAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ComponentAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ComponentModel {
  public find(args?: {
    where?: ComponentWhere;

    options?: ComponentOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Component[]>;
  public create(args: {
    input: ComponentCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateComponentsMutationResponse>;
  public update(args: {
    where?: ComponentWhere;
    update?: ComponentUpdateInput;
    connect?: ComponentConnectInput;
    disconnect?: ComponentDisconnectInput;
    create?: ComponentCreateInput;
    connectOrCreate?: ComponentConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateComponentsMutationResponse>;
  public delete(args: {
    where?: ComponentWhere;
    delete?: ComponentDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ComponentWhere;

    aggregate: ComponentAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ComponentAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface StoreAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class StoreModel {
  public find(args?: {
    where?: StoreWhere;

    options?: StoreOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Store[]>;
  public create(args: {
    input: StoreCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateStoresMutationResponse>;
  public update(args: {
    where?: StoreWhere;
    update?: StoreUpdateInput;
    connect?: StoreConnectInput;
    disconnect?: StoreDisconnectInput;
    create?: StoreCreateInput;
    connectOrCreate?: StoreConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateStoresMutationResponse>;
  public delete(args: {
    where?: StoreWhere;
    delete?: StoreDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: StoreWhere;

    aggregate: StoreAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<StoreAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface CustomActionAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
  code?: StringAggregateInputNonNullable;
}

export declare class CustomActionModel {
  public find(args?: {
    where?: CustomActionWhere;

    options?: CustomActionOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CustomAction[]>;
  public create(args: {
    input: CustomActionCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCustomActionsMutationResponse>;
  public update(args: {
    where?: CustomActionWhere;
    update?: CustomActionUpdateInput;
    connect?: CustomActionConnectInput;
    disconnect?: CustomActionDisconnectInput;
    create?: CustomActionCreateInput;
    connectOrCreate?: CustomActionConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCustomActionsMutationResponse>;
  public delete(args: {
    where?: CustomActionWhere;
    delete?: CustomActionDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CustomActionWhere;

    aggregate: CustomActionAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CustomActionAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ResourceActionAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ResourceActionModel {
  public find(args?: {
    where?: ResourceActionWhere;

    options?: ResourceActionOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<ResourceAction[]>;
  public create(args: {
    input: ResourceActionCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateResourceActionsMutationResponse>;
  public update(args: {
    where?: ResourceActionWhere;
    update?: ResourceActionUpdateInput;
    connect?: ResourceActionConnectInput;
    disconnect?: ResourceActionDisconnectInput;
    create?: ResourceActionCreateInput;
    connectOrCreate?: ResourceActionConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateResourceActionsMutationResponse>;
  public delete(args: {
    where?: ResourceActionWhere;
    delete?: ResourceActionDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ResourceActionWhere;

    aggregate: ResourceActionAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ResourceActionAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface PipelineActionAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class PipelineActionModel {
  public find(args?: {
    where?: PipelineActionWhere;

    options?: PipelineActionOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<PipelineAction[]>;
  public create(args: {
    input: PipelineActionCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreatePipelineActionsMutationResponse>;
  public update(args: {
    where?: PipelineActionWhere;
    update?: PipelineActionUpdateInput;
    connect?: PipelineActionConnectInput;
    disconnect?: PipelineActionDisconnectInput;
    create?: PipelineActionCreateInput;
    connectOrCreate?: PipelineActionConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdatePipelineActionsMutationResponse>;
  public delete(args: {
    where?: PipelineActionWhere;
    delete?: PipelineActionDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: PipelineActionWhere;

    aggregate: PipelineActionAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<PipelineActionAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface ResourceAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class ResourceModel {
  public find(args?: {
    where?: ResourceWhere;

    options?: ResourceOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Resource[]>;
  public create(args: {
    input: ResourceCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateResourcesMutationResponse>;
  public update(args: {
    where?: ResourceWhere;
    update?: ResourceUpdateInput;
    connect?: ResourceConnectInput;
    disconnect?: ResourceDisconnectInput;
    create?: ResourceCreateInput;
    connectOrCreate?: ResourceConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateResourcesMutationResponse>;
  public delete(args: {
    where?: ResourceWhere;
    delete?: ResourceDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ResourceWhere;

    aggregate: ResourceAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ResourceAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface VercelDomainConfigDataAggregateSelectionInput {
  count?: boolean;
}

export declare class VercelDomainConfigDataModel {
  public find(args?: {
    where?: VercelDomainConfigDataWhere;

    options?: VercelDomainConfigDataOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<VercelDomainConfigData[]>;
  public create(args: {
    input: VercelDomainConfigDataCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateVercelDomainConfigDataMutationResponse>;
  public update(args: {
    where?: VercelDomainConfigDataWhere;
    update?: VercelDomainConfigDataUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateVercelDomainConfigDataMutationResponse>;
  public delete(args: {
    where?: VercelDomainConfigDataWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: VercelDomainConfigDataWhere;

    aggregate: VercelDomainConfigDataAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<VercelDomainConfigDataAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface VercelProjectDomainDataAggregateSelectionInput {
  count?: boolean;
}

export declare class VercelProjectDomainDataModel {
  public find(args?: {
    where?: VercelProjectDomainDataWhere;

    options?: VercelProjectDomainDataOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<VercelProjectDomainData[]>;
  public create(args: {
    input: VercelProjectDomainDataCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateVercelProjectDomainDataMutationResponse>;
  public update(args: {
    where?: VercelProjectDomainDataWhere;
    update?: VercelProjectDomainDataUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateVercelProjectDomainDataMutationResponse>;
  public delete(args: {
    where?: VercelProjectDomainDataWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: VercelProjectDomainDataWhere;

    aggregate: VercelProjectDomainDataAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<VercelProjectDomainDataAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DomainAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  name?: StringAggregateInputNonNullable;
}

export declare class DomainModel {
  public find(args?: {
    where?: DomainWhere;

    options?: DomainOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Domain[]>;
  public create(args: {
    input: DomainCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDomainsMutationResponse>;
  public update(args: {
    where?: DomainWhere;
    update?: DomainUpdateInput;
    connect?: DomainConnectInput;
    disconnect?: DomainDisconnectInput;
    create?: DomainCreateInput;
    connectOrCreate?: DomainConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDomainsMutationResponse>;
  public delete(args: {
    where?: DomainWhere;
    delete?: DomainDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DomainWhere;

    aggregate: DomainAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DomainAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface IntAggregateInputNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DeleteInfoAggregateSelectionInput {
  count?: boolean;
  bookmark?: StringAggregateInputNullable;
  nodesDeleted?: IntAggregateInputNonNullable;
  relationshipsDeleted?: IntAggregateInputNonNullable;
}

export declare class DeleteInfoModel {
  public find(args?: {
    where?: DeleteInfoWhere;

    options?: DeleteInfoOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<DeleteInfo[]>;
  public create(args: {
    input: DeleteInfoCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDeleteInfosMutationResponse>;
  public update(args: {
    where?: DeleteInfoWhere;
    update?: DeleteInfoUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDeleteInfosMutationResponse>;
  public delete(args: {
    where?: DeleteInfoWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DeleteInfoWhere;

    aggregate: DeleteInfoAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DeleteInfoAggregateSelection>;
}

export interface ModelMap {
  ResetDatabaseMutationResponse: ResetDatabaseMutationResponseModel;
  User: UserModel;
  App: AppModel;
  Atom: AtomModel;
  CreateInfo: CreateInfoModel;
  Page: PageModel;
  TypeReference: TypeReferenceModel;
  PrimitiveType: PrimitiveTypeModel;
  ArrayType: ArrayTypeModel;
  UnionType: UnionTypeModel;
  InterfaceType: InterfaceTypeModel;
  ElementType: ElementTypeModel;
  RenderPropsType: RenderPropsTypeModel;
  ReactNodeType: ReactNodeTypeModel;
  EnumType: EnumTypeModel;
  EnumTypeValue: EnumTypeValueModel;
  LambdaType: LambdaTypeModel;
  PageType: PageTypeModel;
  AppType: AppTypeModel;
  ActionType: ActionTypeModel;
  CodeMirrorType: CodeMirrorTypeModel;
  Tag: TagModel;
  TagGraphOptions: TagGraphOptionsModel;
  TagGraph: TagGraphModel;
  ElementGraph: ElementGraphModel;
  Element: ElementModel;
  Prop: PropModel;
  PropMapBinding: PropMapBindingModel;
  Hook: HookModel;
  Component: ComponentModel;
  Store: StoreModel;
  CustomAction: CustomActionModel;
  ResourceAction: ResourceActionModel;
  PipelineAction: PipelineActionModel;
  Resource: ResourceModel;
  VercelDomainConfigData: VercelDomainConfigDataModel;
  VercelProjectDomainData: VercelProjectDomainDataModel;
  Domain: DomainModel;
  DeleteInfo: DeleteInfoModel;
}
