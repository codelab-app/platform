import { SelectionSetNode, DocumentNode } from 'graphql'
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
  elementGraph: ElementGraph
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
  resetDatabaseMutationResponsesAggregate: ResetDatabaseMutationResponseAggregateSelection
  edges: Array<Edge>
  edgesAggregate: EdgeAggregateSelection
  users: Array<User>
  usersAggregate: UserAggregateSelection
  apps: Array<App>
  appsAggregate: AppAggregateSelection
  atoms: Array<Atom>
  atomsAggregate: AtomAggregateSelection
  createInfos: Array<CreateInfo>
  createInfosAggregate: CreateInfoAggregateSelection
  pages: Array<Page>
  pagesAggregate: PageAggregateSelection
  typeReferences: Array<TypeReference>
  typeReferencesAggregate: TypeReferenceAggregateSelection
  interfaceTypeEdges: Array<InterfaceTypeEdge>
  interfaceTypeEdgesAggregate: InterfaceTypeEdgeAggregateSelection
  primitiveTypes: Array<PrimitiveType>
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection
  arrayTypes: Array<ArrayType>
  arrayTypesAggregate: ArrayTypeAggregateSelection
  unionTypes: Array<UnionType>
  unionTypesAggregate: UnionTypeAggregateSelection
  interfaceTypes: Array<InterfaceType>
  interfaceTypesAggregate: InterfaceTypeAggregateSelection
  elementTypes: Array<ElementType>
  elementTypesAggregate: ElementTypeAggregateSelection
  renderPropsTypes: Array<RenderPropsType>
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection
  reactNodeTypes: Array<ReactNodeType>
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection
  enumTypes: Array<EnumType>
  enumTypesAggregate: EnumTypeAggregateSelection
  enumTypeValues: Array<EnumTypeValue>
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection
  lambdaTypes: Array<LambdaType>
  lambdaTypesAggregate: LambdaTypeAggregateSelection
  pageTypes: Array<PageType>
  pageTypesAggregate: PageTypeAggregateSelection
  appTypes: Array<AppType>
  appTypesAggregate: AppTypeAggregateSelection
  monacoTypes: Array<MonacoType>
  monacoTypesAggregate: MonacoTypeAggregateSelection
  deleteFieldResponses: Array<DeleteFieldResponse>
  deleteFieldResponsesAggregate: DeleteFieldResponseAggregateSelection
  tags: Array<Tag>
  tagsAggregate: TagAggregateSelection
  tagGraphOptions: Array<TagGraphOptions>
  tagGraphOptionsAggregate: TagGraphOptionsAggregateSelection
  tagGraphs: Array<TagGraph>
  tagGraphsAggregate: TagGraphAggregateSelection
  elementEdges: Array<ElementEdge>
  elementEdgesAggregate: ElementEdgeAggregateSelection
  elementGraphs: Array<ElementGraph>
  elementGraphsAggregate: ElementGraphAggregateSelection
  elements: Array<Element>
  elementsAggregate: ElementAggregateSelection
  deleteElementsInfos: Array<DeleteElementsInfo>
  deleteElementsInfosAggregate: DeleteElementsInfoAggregateSelection
  props: Array<Prop>
  propsAggregate: PropAggregateSelection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate: PropMapBindingAggregateSelection
  hooks: Array<Hook>
  hooksAggregate: HookAggregateSelection
  components: Array<Component>
  componentsAggregate: ComponentAggregateSelection
  actions: Array<Action>
  actionsAggregate: ActionAggregateSelection
  stores: Array<Store>
  storesAggregate: StoreAggregateSelection
  deleteInfos: Array<DeleteInfo>
  deleteInfosAggregate: DeleteInfoAggregateSelection
  resources: Array<Resource>
  resourcesAggregate: ResourceAggregateSelection
  operations: Array<Operation>
  operationsAggregate: OperationAggregateSelection
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']>
  getField: InterfaceTypeEdge
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>
}

export type QueryElementGraphArgs = {
  input: ElementGraphInput
}

export type QueryResetDatabaseMutationResponsesArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
  options?: InputMaybe<ResetDatabaseMutationResponseOptions>
}

export type QueryResetDatabaseMutationResponsesAggregateArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryEdgesArgs = {
  where?: InputMaybe<EdgeWhere>
  options?: InputMaybe<EdgeOptions>
}

export type QueryEdgesAggregateArgs = {
  where?: InputMaybe<EdgeWhere>
}

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
}

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>
}

export type QueryAppsArgs = {
  where?: InputMaybe<AppWhere>
  options?: InputMaybe<AppOptions>
}

export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryAtomsArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
}

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
  options?: InputMaybe<CreateInfoOptions>
}

export type QueryCreateInfosAggregateArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryPagesArgs = {
  where?: InputMaybe<PageWhere>
  options?: InputMaybe<PageOptions>
}

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryTypeReferencesArgs = {
  where?: InputMaybe<TypeReferenceWhere>
  options?: InputMaybe<TypeReferenceOptions>
}

export type QueryTypeReferencesAggregateArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryInterfaceTypeEdgesArgs = {
  where?: InputMaybe<InterfaceTypeEdgeWhere>
  options?: InputMaybe<InterfaceTypeEdgeOptions>
}

export type QueryInterfaceTypeEdgesAggregateArgs = {
  where?: InputMaybe<InterfaceTypeEdgeWhere>
}

export type QueryPrimitiveTypesArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
  options?: InputMaybe<PrimitiveTypeOptions>
}

export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryArrayTypesArgs = {
  where?: InputMaybe<ArrayTypeWhere>
  options?: InputMaybe<ArrayTypeOptions>
}

export type QueryArrayTypesAggregateArgs = {
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryUnionTypesArgs = {
  where?: InputMaybe<UnionTypeWhere>
  options?: InputMaybe<UnionTypeOptions>
}

export type QueryUnionTypesAggregateArgs = {
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryInterfaceTypesArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
}

export type QueryInterfaceTypesAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryElementTypesArgs = {
  where?: InputMaybe<ElementTypeWhere>
  options?: InputMaybe<ElementTypeOptions>
}

export type QueryElementTypesAggregateArgs = {
  where?: InputMaybe<ElementTypeWhere>
}

export type QueryRenderPropsTypesArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
  options?: InputMaybe<RenderPropsTypeOptions>
}

export type QueryRenderPropsTypesAggregateArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryReactNodeTypesArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
  options?: InputMaybe<ReactNodeTypeOptions>
}

export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryEnumTypesArgs = {
  where?: InputMaybe<EnumTypeWhere>
  options?: InputMaybe<EnumTypeOptions>
}

export type QueryEnumTypesAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryEnumTypeValuesArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
  options?: InputMaybe<EnumTypeValueOptions>
}

export type QueryEnumTypeValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryLambdaTypesArgs = {
  where?: InputMaybe<LambdaTypeWhere>
  options?: InputMaybe<LambdaTypeOptions>
}

export type QueryLambdaTypesAggregateArgs = {
  where?: InputMaybe<LambdaTypeWhere>
}

export type QueryPageTypesArgs = {
  where?: InputMaybe<PageTypeWhere>
  options?: InputMaybe<PageTypeOptions>
}

export type QueryPageTypesAggregateArgs = {
  where?: InputMaybe<PageTypeWhere>
}

export type QueryAppTypesArgs = {
  where?: InputMaybe<AppTypeWhere>
  options?: InputMaybe<AppTypeOptions>
}

export type QueryAppTypesAggregateArgs = {
  where?: InputMaybe<AppTypeWhere>
}

export type QueryMonacoTypesArgs = {
  where?: InputMaybe<MonacoTypeWhere>
  options?: InputMaybe<MonacoTypeOptions>
}

export type QueryMonacoTypesAggregateArgs = {
  where?: InputMaybe<MonacoTypeWhere>
}

export type QueryDeleteFieldResponsesArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
  options?: InputMaybe<DeleteFieldResponseOptions>
}

export type QueryDeleteFieldResponsesAggregateArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>
  options?: InputMaybe<TagOptions>
}

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
}

export type QueryTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
  options?: InputMaybe<TagGraphOptionsOptions>
}

export type QueryTagGraphOptionsAggregateArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagGraphsAggregateArgs = {
  where?: InputMaybe<TagGraphWhere>
}

export type QueryElementEdgesArgs = {
  where?: InputMaybe<ElementEdgeWhere>
  options?: InputMaybe<ElementEdgeOptions>
}

export type QueryElementEdgesAggregateArgs = {
  where?: InputMaybe<ElementEdgeWhere>
}

export type QueryElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>
  options?: InputMaybe<ElementGraphOptions>
}

export type QueryElementGraphsAggregateArgs = {
  where?: InputMaybe<ElementGraphWhere>
}

export type QueryElementsArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
}

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryDeleteElementsInfosArgs = {
  where?: InputMaybe<DeleteElementsInfoWhere>
  options?: InputMaybe<DeleteElementsInfoOptions>
}

export type QueryDeleteElementsInfosAggregateArgs = {
  where?: InputMaybe<DeleteElementsInfoWhere>
}

export type QueryPropsArgs = {
  where?: InputMaybe<PropWhere>
  options?: InputMaybe<PropOptions>
}

export type QueryPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>
}

export type QueryPropMapBindingsArgs = {
  where?: InputMaybe<PropMapBindingWhere>
  options?: InputMaybe<PropMapBindingOptions>
}

export type QueryPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryHooksArgs = {
  where?: InputMaybe<HookWhere>
  options?: InputMaybe<HookOptions>
}

export type QueryHooksAggregateArgs = {
  where?: InputMaybe<HookWhere>
}

export type QueryComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
}

export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
}

export type QueryActionsArgs = {
  where?: InputMaybe<ActionWhere>
  options?: InputMaybe<ActionOptions>
}

export type QueryActionsAggregateArgs = {
  where?: InputMaybe<ActionWhere>
}

export type QueryStoresArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
}

export type QueryStoresAggregateArgs = {
  where?: InputMaybe<StoreWhere>
}

export type QueryDeleteInfosArgs = {
  where?: InputMaybe<DeleteInfoWhere>
  options?: InputMaybe<DeleteInfoOptions>
}

export type QueryDeleteInfosAggregateArgs = {
  where?: InputMaybe<DeleteInfoWhere>
}

export type QueryResourcesArgs = {
  where?: InputMaybe<ResourceWhere>
  options?: InputMaybe<ResourceOptions>
}

export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
}

export type QueryOperationsArgs = {
  where?: InputMaybe<OperationWhere>
  options?: InputMaybe<OperationOptions>
}

export type QueryOperationsAggregateArgs = {
  where?: InputMaybe<OperationWhere>
}

export type QueryIsTypeDescendantOfArgs = {
  parentTypeId: Scalars['ID']
  descendantTypeId: Scalars['ID']
}

export type QueryGetFieldArgs = {
  interfaceId: Scalars['ID']
  key: Scalars['String']
}

export type QueryGetTypeReferencesArgs = {
  typeId: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  upsertFieldEdge: InterfaceTypeEdge
  deleteFieldEdge: DeleteFieldResponse
  deleteElementsSubgraph: DeleteElementsInfo
  deleteStoresSubgraph: DeleteInfo
  createResetDatabaseMutationResponses: CreateResetDatabaseMutationResponsesMutationResponse
  deleteResetDatabaseMutationResponses: DeleteInfo
  updateResetDatabaseMutationResponses: UpdateResetDatabaseMutationResponsesMutationResponse
  createEdges: CreateEdgesMutationResponse
  deleteEdges: DeleteInfo
  updateEdges: UpdateEdgesMutationResponse
  createUsers: CreateUsersMutationResponse
  deleteUsers: DeleteInfo
  updateUsers: UpdateUsersMutationResponse
  createApps: CreateAppsMutationResponse
  deleteApps: DeleteInfo
  updateApps: UpdateAppsMutationResponse
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
  createInterfaceTypeEdges: CreateInterfaceTypeEdgesMutationResponse
  deleteInterfaceTypeEdges: DeleteInfo
  updateInterfaceTypeEdges: UpdateInterfaceTypeEdgesMutationResponse
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
  createMonacoTypes: CreateMonacoTypesMutationResponse
  deleteMonacoTypes: DeleteInfo
  updateMonacoTypes: UpdateMonacoTypesMutationResponse
  createDeleteFieldResponses: CreateDeleteFieldResponsesMutationResponse
  deleteDeleteFieldResponses: DeleteInfo
  updateDeleteFieldResponses: UpdateDeleteFieldResponsesMutationResponse
  createTags: CreateTagsMutationResponse
  deleteTags: DeleteInfo
  updateTags: UpdateTagsMutationResponse
  createTagGraphOptions: CreateTagGraphOptionsMutationResponse
  deleteTagGraphOptions: DeleteInfo
  updateTagGraphOptions: UpdateTagGraphOptionsMutationResponse
  createTagGraphs: CreateTagGraphsMutationResponse
  deleteTagGraphs: DeleteInfo
  updateTagGraphs: UpdateTagGraphsMutationResponse
  createElementEdges: CreateElementEdgesMutationResponse
  deleteElementEdges: DeleteInfo
  updateElementEdges: UpdateElementEdgesMutationResponse
  createElementGraphs: CreateElementGraphsMutationResponse
  deleteElementGraphs: DeleteInfo
  updateElementGraphs: UpdateElementGraphsMutationResponse
  createElements: CreateElementsMutationResponse
  deleteElements: DeleteInfo
  updateElements: UpdateElementsMutationResponse
  createDeleteElementsInfos: CreateDeleteElementsInfosMutationResponse
  deleteDeleteElementsInfos: DeleteInfo
  updateDeleteElementsInfos: UpdateDeleteElementsInfosMutationResponse
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
  createActions: CreateActionsMutationResponse
  deleteActions: DeleteInfo
  updateActions: UpdateActionsMutationResponse
  createStores: CreateStoresMutationResponse
  deleteStores: DeleteInfo
  updateStores: UpdateStoresMutationResponse
  createDeleteInfos: CreateDeleteInfosMutationResponse
  deleteDeleteInfos: DeleteInfo
  updateDeleteInfos: UpdateDeleteInfosMutationResponse
  createResources: CreateResourcesMutationResponse
  deleteResources: DeleteInfo
  updateResources: UpdateResourcesMutationResponse
  createOperations: CreateOperationsMutationResponse
  deleteOperations: DeleteInfo
  updateOperations: UpdateOperationsMutationResponse
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>
}

export type MutationUpsertFieldEdgeArgs = {
  input: UpsertFieldInput
  isCreating: Scalars['Boolean']
}

export type MutationDeleteFieldEdgeArgs = {
  input: DeleteFieldInput
}

export type MutationDeleteElementsSubgraphArgs = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationDeleteStoresSubgraphArgs = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<StoreWhere>
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

export type MutationCreateEdgesArgs = {
  input: Array<EdgeCreateInput>
}

export type MutationDeleteEdgesArgs = {
  where?: InputMaybe<EdgeWhere>
}

export type MutationUpdateEdgesArgs = {
  where?: InputMaybe<EdgeWhere>
  update?: InputMaybe<EdgeUpdateInput>
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

export type MutationCreateInterfaceTypeEdgesArgs = {
  input: Array<InterfaceTypeEdgeCreateInput>
}

export type MutationDeleteInterfaceTypeEdgesArgs = {
  where?: InputMaybe<InterfaceTypeEdgeWhere>
}

export type MutationUpdateInterfaceTypeEdgesArgs = {
  where?: InputMaybe<InterfaceTypeEdgeWhere>
  update?: InputMaybe<InterfaceTypeEdgeUpdateInput>
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

export type MutationCreateMonacoTypesArgs = {
  input: Array<MonacoTypeCreateInput>
}

export type MutationDeleteMonacoTypesArgs = {
  where?: InputMaybe<MonacoTypeWhere>
  delete?: InputMaybe<MonacoTypeDeleteInput>
}

export type MutationUpdateMonacoTypesArgs = {
  where?: InputMaybe<MonacoTypeWhere>
  update?: InputMaybe<MonacoTypeUpdateInput>
  connect?: InputMaybe<MonacoTypeConnectInput>
  disconnect?: InputMaybe<MonacoTypeDisconnectInput>
  create?: InputMaybe<MonacoTypeRelationInput>
  delete?: InputMaybe<MonacoTypeDeleteInput>
  connectOrCreate?: InputMaybe<MonacoTypeConnectOrCreateInput>
}

export type MutationCreateDeleteFieldResponsesArgs = {
  input: Array<DeleteFieldResponseCreateInput>
}

export type MutationDeleteDeleteFieldResponsesArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type MutationUpdateDeleteFieldResponsesArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
  update?: InputMaybe<DeleteFieldResponseUpdateInput>
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

export type MutationCreateTagGraphOptionsArgs = {
  input: Array<TagGraphOptionsCreateInput>
}

export type MutationDeleteTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type MutationUpdateTagGraphOptionsArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
  update?: InputMaybe<TagGraphOptionsUpdateInput>
}

export type MutationCreateTagGraphsArgs = {
  input: Array<TagGraphCreateInput>
}

export type MutationDeleteTagGraphsArgs = {
  where?: InputMaybe<TagGraphWhere>
}

export type MutationUpdateTagGraphsArgs = {
  where?: InputMaybe<TagGraphWhere>
  update?: InputMaybe<TagGraphUpdateInput>
}

export type MutationCreateElementEdgesArgs = {
  input: Array<ElementEdgeCreateInput>
}

export type MutationDeleteElementEdgesArgs = {
  where?: InputMaybe<ElementEdgeWhere>
}

export type MutationUpdateElementEdgesArgs = {
  where?: InputMaybe<ElementEdgeWhere>
  update?: InputMaybe<ElementEdgeUpdateInput>
}

export type MutationCreateElementGraphsArgs = {
  input: Array<ElementGraphCreateInput>
}

export type MutationDeleteElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>
}

export type MutationUpdateElementGraphsArgs = {
  where?: InputMaybe<ElementGraphWhere>
  update?: InputMaybe<ElementGraphUpdateInput>
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

export type MutationCreateDeleteElementsInfosArgs = {
  input: Array<DeleteElementsInfoCreateInput>
}

export type MutationDeleteDeleteElementsInfosArgs = {
  where?: InputMaybe<DeleteElementsInfoWhere>
}

export type MutationUpdateDeleteElementsInfosArgs = {
  where?: InputMaybe<DeleteElementsInfoWhere>
  update?: InputMaybe<DeleteElementsInfoUpdateInput>
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

export type MutationCreateActionsArgs = {
  input: Array<ActionCreateInput>
}

export type MutationDeleteActionsArgs = {
  where?: InputMaybe<ActionWhere>
  delete?: InputMaybe<ActionDeleteInput>
}

export type MutationUpdateActionsArgs = {
  where?: InputMaybe<ActionWhere>
  update?: InputMaybe<ActionUpdateInput>
  connect?: InputMaybe<ActionConnectInput>
  disconnect?: InputMaybe<ActionDisconnectInput>
  create?: InputMaybe<ActionRelationInput>
  delete?: InputMaybe<ActionDeleteInput>
  connectOrCreate?: InputMaybe<ActionConnectOrCreateInput>
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

export type MutationCreateOperationsArgs = {
  input: Array<OperationCreateInput>
}

export type MutationDeleteOperationsArgs = {
  where?: InputMaybe<OperationWhere>
  delete?: InputMaybe<OperationDeleteInput>
}

export type MutationUpdateOperationsArgs = {
  where?: InputMaybe<OperationWhere>
  update?: InputMaybe<OperationUpdateInput>
  connect?: InputMaybe<OperationConnectInput>
  disconnect?: InputMaybe<OperationDisconnectInput>
  create?: InputMaybe<OperationRelationInput>
  delete?: InputMaybe<OperationDeleteInput>
  connectOrCreate?: InputMaybe<OperationConnectOrCreateInput>
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
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
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
  MuiBackdropUnstyled = 'MuiBackdropUnstyled',
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

export enum ElementTypeKind {
  /** Pick any element in the current tree */
  AllElements = 'AllElements',
  /** Pick any element from the descendants of the current element */
  DescendantsOnly = 'DescendantsOnly',
  /** Pick any element from the children of the current element */
  ChildrenOnly = 'ChildrenOnly',
  /** Pick parents and siblings of parents of elements (used to move element) */
  ExcludeDescendantsElements = 'ExcludeDescendantsElements',
}

export enum MonacoLanguage {
  Typescript = 'typescript',
  Javascript = 'javascript',
  Css = 'css',
  Json = 'json',
  GraphqlDev = 'graphqlDev',
  CssInJs = 'cssInJs',
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

export type Field = {
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type IEdge = {
  source: Scalars['String']
  target: Scalars['String']
}

export type ParentOfElement = {
  order?: Maybe<Scalars['Int']>
}

export type ParentOfStore = {
  storeKey: Scalars['String']
}

export type StoreResource = {
  resourceKey: Scalars['String']
}

export type TypeBase = {
  owner: User
  ownerConnection: TypeBaseOwnerConnection
  id: Scalars['ID']
  name: Scalars['String']
}

export type TypeBaseOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type TypeBaseOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type WithDescendants = {
  descendantTypesIds: Array<Scalars['ID']>
}

export type Action = {
  __typename?: 'Action'
  id: Scalars['ID']
  name: Scalars['String']
  body: Scalars['String']
  store: Store
  storeAggregate?: Maybe<ActionStoreStoreAggregationSelection>
  storeConnection: ActionStoreConnection
}

export type ActionStoreArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ActionStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ActionStoreConnectionArgs = {
  where?: InputMaybe<ActionStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ActionStoreConnectionSort>>
}

export type ActionAggregateSelection = {
  __typename?: 'ActionAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  body: StringAggregateSelectionNonNullable
}

export type ActionStoreConnection = {
  __typename?: 'ActionStoreConnection'
  edges: Array<ActionStoreRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ActionStoreRelationship = {
  __typename?: 'ActionStoreRelationship'
  cursor: Scalars['String']
  node: Store
}

export type ActionStoreStoreAggregationSelection = {
  __typename?: 'ActionStoreStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ActionStoreStoreNodeAggregateSelection>
}

export type ActionStoreStoreNodeAggregateSelection = {
  __typename?: 'ActionStoreStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  localState: StringAggregateSelectionNonNullable
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  pages: Array<Page>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  rootProviderElement: Element
  rootProviderElementAggregate?: Maybe<AppElementRootProviderElementAggregationSelection>
  store?: Maybe<Store>
  storeAggregate?: Maybe<AppStoreStoreAggregationSelection>
  ownerConnection: AppOwnerConnection
  pagesConnection: AppPagesConnection
  rootProviderElementConnection: AppRootProviderElementConnection
  storeConnection: AppStoreConnection
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

export type AppRootProviderElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type AppRootProviderElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
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

export type AppOwnerConnectionArgs = {
  where?: InputMaybe<AppOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppOwnerConnectionSort>>
}

export type AppPagesConnectionArgs = {
  where?: InputMaybe<AppPagesConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppPagesConnectionSort>>
}

export type AppRootProviderElementConnectionArgs = {
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppRootProviderElementConnectionSort>>
}

export type AppStoreConnectionArgs = {
  where?: InputMaybe<AppStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<AppStoreConnectionSort>>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppElementRootProviderElementAggregationSelection = {
  __typename?: 'AppElementRootProviderElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppElementRootProviderElementNodeAggregateSelection>
}

export type AppElementRootProviderElementNodeAggregateSelection = {
  __typename?: 'AppElementRootProviderElementNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type AppOwnerConnection = {
  __typename?: 'AppOwnerConnection'
  edges: Array<AppOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppOwnerRelationship = {
  __typename?: 'AppOwnerRelationship'
  cursor: Scalars['String']
  node: User
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

export type AppRootProviderElementConnection = {
  __typename?: 'AppRootProviderElementConnection'
  edges: Array<AppRootProviderElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type AppRootProviderElementRelationship = {
  __typename?: 'AppRootProviderElementRelationship'
  cursor: Scalars['String']
  node: Element
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
  localState: StringAggregateSelectionNonNullable
}

/** Allows picking a app from the list of apps */
export type AppType = TypeBase & {
  __typename?: 'AppType'
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type AppTypeAggregateSelection = {
  __typename?: 'AppTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = TypeBase &
  WithDescendants & {
    __typename?: 'ArrayType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    owner: User
    ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>
    itemType: TypeBase
    ownerConnection: TypeBaseOwnerConnection
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
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
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
  sort?: InputMaybe<Array<ArrayTypeItemTypeConnectionSort>>
}

export type ArrayTypeAggregateSelection = {
  __typename?: 'ArrayTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  node: TypeBase
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
}

export type Atom = {
  __typename?: 'Atom'
  id: Scalars['ID']
  name: Scalars['String']
  type: AtomType
  tags: Array<Tag>
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  tagsConnection: AtomTagsConnection
  apiConnection: AtomApiConnection
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

export type AtomAggregateSelection = {
  __typename?: 'AtomAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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

export type Component = {
  __typename?: 'Component'
  id: Scalars['ID']
  name: Scalars['String']
  rootElement: Element
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>
  owner: User
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>
  rootElementConnection: ComponentRootElementConnection
  ownerConnection: ComponentOwnerConnection
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

export type ComponentOwnerConnectionArgs = {
  where?: InputMaybe<ComponentOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ComponentOwnerConnectionSort>>
}

export type ComponentAggregateSelection = {
  __typename?: 'ComponentAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ComponentOwnerConnection = {
  __typename?: 'ComponentOwnerConnection'
  edges: Array<ComponentOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ComponentOwnerRelationship = {
  __typename?: 'ComponentOwnerRelationship'
  cursor: Scalars['String']
  node: User
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
}

export type CreateActionsMutationResponse = {
  __typename?: 'CreateActionsMutationResponse'
  info: CreateInfo
  actions: Array<Action>
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

export type CreateDeleteElementsInfosMutationResponse = {
  __typename?: 'CreateDeleteElementsInfosMutationResponse'
  info: CreateInfo
  deleteElementsInfos: Array<DeleteElementsInfo>
}

export type CreateDeleteFieldResponsesMutationResponse = {
  __typename?: 'CreateDeleteFieldResponsesMutationResponse'
  info: CreateInfo
  deleteFieldResponses: Array<DeleteFieldResponse>
}

export type CreateDeleteInfosMutationResponse = {
  __typename?: 'CreateDeleteInfosMutationResponse'
  info: CreateInfo
  deleteInfos: Array<DeleteInfo>
}

export type CreateEdgesMutationResponse = {
  __typename?: 'CreateEdgesMutationResponse'
  info: CreateInfo
  edges: Array<Edge>
}

export type CreateElementEdgesMutationResponse = {
  __typename?: 'CreateElementEdgesMutationResponse'
  info: CreateInfo
  elementEdges: Array<ElementEdge>
}

export type CreateElementGraphsMutationResponse = {
  __typename?: 'CreateElementGraphsMutationResponse'
  info: CreateInfo
  elementGraphs: Array<ElementGraph>
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

export type CreateInterfaceTypeEdgesMutationResponse = {
  __typename?: 'CreateInterfaceTypeEdgesMutationResponse'
  info: CreateInfo
  interfaceTypeEdges: Array<InterfaceTypeEdge>
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

export type CreateMonacoTypesMutationResponse = {
  __typename?: 'CreateMonacoTypesMutationResponse'
  info: CreateInfo
  monacoTypes: Array<MonacoType>
}

export type CreateOperationsMutationResponse = {
  __typename?: 'CreateOperationsMutationResponse'
  info: CreateInfo
  operations: Array<Operation>
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

export type CreateTagGraphOptionsMutationResponse = {
  __typename?: 'CreateTagGraphOptionsMutationResponse'
  info: CreateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type CreateTagGraphsMutationResponse = {
  __typename?: 'CreateTagGraphsMutationResponse'
  info: CreateInfo
  tagGraphs: Array<TagGraph>
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

export type DeleteElementsInfo = {
  __typename?: 'DeleteElementsInfo'
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
  deletedIds: Array<Scalars['String']>
}

export type DeleteElementsInfoAggregateSelection = {
  __typename?: 'DeleteElementsInfoAggregateSelection'
  count: Scalars['Int']
  nodesDeleted: IntAggregateSelectionNonNullable
  relationshipsDeleted: IntAggregateSelectionNonNullable
}

export type DeleteFieldResponse = {
  __typename?: 'DeleteFieldResponse'
  deletedEdgesCount: Scalars['Int']
}

export type DeleteFieldResponseAggregateSelection = {
  __typename?: 'DeleteFieldResponseAggregateSelection'
  count: Scalars['Int']
  deletedEdgesCount: IntAggregateSelectionNonNullable
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

/** Simplest implementation of an IEdge with no additional fields */
export type Edge = IEdge & {
  __typename?: 'Edge'
  source: Scalars['String']
  target: Scalars['String']
}

export type EdgeAggregateSelection = {
  __typename?: 'EdgeAggregateSelection'
  count: Scalars['Int']
  source: StringAggregateSelectionNonNullable
  target: StringAggregateSelectionNonNullable
}

export type Element = {
  __typename?: 'Element'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  css?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  children: Array<Element>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  props?: Maybe<Prop>
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>
  parentElement?: Maybe<Element>
  parentElementAggregate?: Maybe<ElementElementParentElementAggregationSelection>
  instanceOfComponent?: Maybe<Component>
  instanceOfComponentAggregate?: Maybe<ElementComponentInstanceOfComponentAggregationSelection>
  component?: Maybe<Component>
  componentAggregate?: Maybe<ElementComponentComponentAggregationSelection>
  atom?: Maybe<Atom>
  atomAggregate?: Maybe<ElementAtomAtomAggregationSelection>
  hooks: Array<Hook>
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingPropMapBindingsAggregationSelection>
  childrenConnection: ElementChildrenConnection
  propsConnection: ElementPropsConnection
  parentElementConnection: ElementParentElementConnection
  instanceOfComponentConnection: ElementInstanceOfComponentConnection
  componentConnection: ElementComponentConnection
  atomConnection: ElementAtomConnection
  hooksConnection: ElementHooksConnection
  propMapBindingsConnection: ElementPropMapBindingsConnection
}

export type ElementChildrenArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementChildrenAggregateArgs = {
  where?: InputMaybe<ElementWhere>
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

export type ElementParentElementArgs = {
  where?: InputMaybe<ElementWhere>
  options?: InputMaybe<ElementOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementParentElementAggregateArgs = {
  where?: InputMaybe<ElementWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementInstanceOfComponentArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementInstanceOfComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementComponentArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementComponentAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementAtomArgs = {
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ElementAtomAggregateArgs = {
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

export type ElementChildrenConnectionArgs = {
  where?: InputMaybe<ElementChildrenConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementChildrenConnectionSort>>
}

export type ElementPropsConnectionArgs = {
  where?: InputMaybe<ElementPropsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementPropsConnectionSort>>
}

export type ElementParentElementConnectionArgs = {
  where?: InputMaybe<ElementParentElementConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementParentElementConnectionSort>>
}

export type ElementInstanceOfComponentConnectionArgs = {
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementInstanceOfComponentConnectionSort>>
}

export type ElementComponentConnectionArgs = {
  where?: InputMaybe<ElementComponentConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementComponentConnectionSort>>
}

export type ElementAtomConnectionArgs = {
  where?: InputMaybe<ElementAtomConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ElementAtomConnectionSort>>
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
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementAtomAtomAggregationSelection = {
  __typename?: 'ElementAtomAtomAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementAtomAtomNodeAggregateSelection>
}

export type ElementAtomAtomNodeAggregateSelection = {
  __typename?: 'ElementAtomAtomNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementAtomConnection = {
  __typename?: 'ElementAtomConnection'
  edges: Array<ElementAtomRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementAtomRelationship = {
  __typename?: 'ElementAtomRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type ElementChildrenConnection = {
  __typename?: 'ElementChildrenConnection'
  edges: Array<ElementChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementChildrenRelationship = ParentOfElement & {
  __typename?: 'ElementChildrenRelationship'
  cursor: Scalars['String']
  node: Element
  order?: Maybe<Scalars['Int']>
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

export type ElementComponentConnection = {
  __typename?: 'ElementComponentConnection'
  edges: Array<ElementComponentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
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

export type ElementComponentRelationship = {
  __typename?: 'ElementComponentRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementEdge = {
  __typename?: 'ElementEdge'
  source: Scalars['String']
  target: Scalars['String']
  order?: Maybe<Scalars['Int']>
}

export type ElementEdgeAggregateSelection = {
  __typename?: 'ElementEdgeAggregateSelection'
  count: Scalars['Int']
  source: StringAggregateSelectionNonNullable
  target: StringAggregateSelectionNonNullable
  order: IntAggregateSelectionNullable
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
  edge?: Maybe<ElementElementChildrenEdgeAggregateSelection>
}

export type ElementElementChildrenEdgeAggregateSelection = {
  __typename?: 'ElementElementChildrenEdgeAggregateSelection'
  order: IntAggregateSelectionNullable
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementParentElementAggregationSelection = {
  __typename?: 'ElementElementParentElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentElementNodeAggregateSelection>
  edge?: Maybe<ElementElementParentElementEdgeAggregateSelection>
}

export type ElementElementParentElementEdgeAggregateSelection = {
  __typename?: 'ElementElementParentElementEdgeAggregateSelection'
  order: IntAggregateSelectionNullable
}

export type ElementElementParentElementNodeAggregateSelection = {
  __typename?: 'ElementElementParentElementNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementGraph = {
  __typename?: 'ElementGraph'
  id: Scalars['ID']
  descendants: Array<Scalars['ID']>
}

export type ElementGraphAggregateSelection = {
  __typename?: 'ElementGraphAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
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

export type ElementInstanceOfComponentConnection = {
  __typename?: 'ElementInstanceOfComponentConnection'
  edges: Array<ElementInstanceOfComponentRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementInstanceOfComponentRelationship = {
  __typename?: 'ElementInstanceOfComponentRelationship'
  cursor: Scalars['String']
  node: Component
}

export type ElementParentElementConnection = {
  __typename?: 'ElementParentElementConnection'
  edges: Array<ElementParentElementRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementParentElementRelationship = ParentOfElement & {
  __typename?: 'ElementParentElementRelationship'
  cursor: Scalars['String']
  node: Element
  order?: Maybe<Scalars['Int']>
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
  id: Scalars['ID']
  name: Scalars['String']
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ElementTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type ElementTypeAggregateSelection = {
  __typename?: 'ElementTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumType = TypeBase & {
  __typename?: 'EnumType'
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>
  allowedValues: Array<EnumTypeValue>
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
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
}

export type EnumTypeValue = {
  __typename?: 'EnumTypeValue'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
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
  name: StringAggregateSelectionNullable
  value: StringAggregateSelectionNonNullable
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
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
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

export type IntAggregateSelectionNullable = {
  __typename?: 'IntAggregateSelectionNullable'
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
  average?: Maybe<Scalars['Float']>
  sum?: Maybe<Scalars['Int']>
}

/** Represents an object type with multiple fields */
export type InterfaceType = TypeBase &
  WithDescendants & {
    __typename?: 'InterfaceType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    owner: User
    ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>
    apiOfAtoms: Array<Atom>
    apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>
    fields: Array<TypeBase>
    ownerConnection: TypeBaseOwnerConnection
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
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
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
}

/** Concrete Field type implementation */
export type InterfaceTypeEdge = Field &
  IEdge & {
    __typename?: 'InterfaceTypeEdge'
    source: Scalars['String']
    target: Scalars['String']
    key: Scalars['String']
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
  }

export type InterfaceTypeEdgeAggregateSelection = {
  __typename?: 'InterfaceTypeEdgeAggregateSelection'
  count: Scalars['Int']
  source: StringAggregateSelectionNonNullable
  target: StringAggregateSelectionNonNullable
  key: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  description: StringAggregateSelectionNullable
}

export type InterfaceTypeFieldsConnection = {
  __typename?: 'InterfaceTypeFieldsConnection'
  edges: Array<InterfaceTypeFieldsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type InterfaceTypeFieldsRelationship = Field & {
  __typename?: 'InterfaceTypeFieldsRelationship'
  cursor: Scalars['String']
  node: TypeBase
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
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
}

/** Allows picking a lambda */
export type LambdaType = TypeBase & {
  __typename?: 'LambdaType'
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type LambdaTypeAggregateSelection = {
  __typename?: 'LambdaTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

/** Allows editing the value using a monaco editor */
export type MonacoType = TypeBase & {
  __typename?: 'MonacoType'
  id: Scalars['ID']
  name: Scalars['String']
  language: MonacoLanguage
  owner: User
  ownerAggregate?: Maybe<MonacoTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerArgs = {
  where?: InputMaybe<UserWhere>
  options?: InputMaybe<UserOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerAggregateArgs = {
  where?: InputMaybe<UserWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type MonacoTypeAggregateSelection = {
  __typename?: 'MonacoTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type MonacoTypeUserOwnerAggregationSelection = {
  __typename?: 'MonacoTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<MonacoTypeUserOwnerNodeAggregateSelection>
}

export type MonacoTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'MonacoTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
}

export type Operation = {
  __typename?: 'Operation'
  id: Scalars['ID']
  name: Scalars['String']
  runOnInit: Scalars['Boolean']
  config: Scalars['String']
  resource: Resource
  resourceAggregate?: Maybe<OperationResourceResourceAggregationSelection>
  resourceConnection: OperationResourceConnection
}

export type OperationResourceArgs = {
  where?: InputMaybe<ResourceWhere>
  options?: InputMaybe<ResourceOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type OperationResourceAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type OperationResourceConnectionArgs = {
  where?: InputMaybe<OperationResourceConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<OperationResourceConnectionSort>>
}

export type OperationAggregateSelection = {
  __typename?: 'OperationAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  config: StringAggregateSelectionNonNullable
}

export type OperationResourceConnection = {
  __typename?: 'OperationResourceConnection'
  edges: Array<OperationResourceRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type OperationResourceRelationship = {
  __typename?: 'OperationResourceRelationship'
  cursor: Scalars['String']
  node: Resource
}

export type OperationResourceResourceAggregationSelection = {
  __typename?: 'OperationResourceResourceAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<OperationResourceResourceNodeAggregateSelection>
}

export type OperationResourceResourceNodeAggregateSelection = {
  __typename?: 'OperationResourceResourceNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  config: StringAggregateSelectionNonNullable
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['ID']
  name: Scalars['String']
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

export type PageElementRootElementAggregationSelection = {
  __typename?: 'PageElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageElementRootElementNodeAggregateSelection>
}

export type PageElementRootElementNodeAggregateSelection = {
  __typename?: 'PageElementRootElementNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
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

/** Allows picking a page from the list of pages */
export type PageType = TypeBase & {
  __typename?: 'PageType'
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type PageTypeAggregateSelection = {
  __typename?: 'PageTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = TypeBase & {
  __typename?: 'PrimitiveType'
  id: Scalars['ID']
  name: Scalars['String']
  primitiveKind: PrimitiveTypeKind
  owner: User
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
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
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type PrimitiveTypeAggregateSelection = {
  __typename?: 'PrimitiveTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
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
  css: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type ReactNodeTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type ReactNodeTypeAggregateSelection = {
  __typename?: 'ReactNodeTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
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
 * - ElementType: Current tree element select box, results it 'ReactNod' value
 */
export type RenderPropsTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

export type RenderPropsTypeAggregateSelection = {
  __typename?: 'RenderPropsTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

export type ResetDatabaseMutationResponse = {
  __typename?: 'ResetDatabaseMutationResponse'
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseAggregateSelection = {
  __typename?: 'ResetDatabaseMutationResponseAggregateSelection'
  count: Scalars['Int']
}

export type Resource = {
  __typename?: 'Resource'
  id: Scalars['ID']
  name: Scalars['String']
  config: Scalars['String']
  type: ResourceType
  operations: Array<Operation>
  operationsAggregate?: Maybe<ResourceOperationOperationsAggregationSelection>
  operationsConnection: ResourceOperationsConnection
}

export type ResourceOperationsArgs = {
  where?: InputMaybe<OperationWhere>
  options?: InputMaybe<OperationOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceOperationsAggregateArgs = {
  where?: InputMaybe<OperationWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type ResourceOperationsConnectionArgs = {
  where?: InputMaybe<ResourceOperationsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<ResourceOperationsConnectionSort>>
}

export type ResourceAggregateSelection = {
  __typename?: 'ResourceAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  config: StringAggregateSelectionNonNullable
}

export type ResourceOperationOperationsAggregationSelection = {
  __typename?: 'ResourceOperationOperationsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ResourceOperationOperationsNodeAggregateSelection>
}

export type ResourceOperationOperationsNodeAggregateSelection = {
  __typename?: 'ResourceOperationOperationsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  config: StringAggregateSelectionNonNullable
}

export type ResourceOperationsConnection = {
  __typename?: 'ResourceOperationsConnection'
  edges: Array<ResourceOperationsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ResourceOperationsRelationship = {
  __typename?: 'ResourceOperationsRelationship'
  cursor: Scalars['String']
  node: Operation
}

export type Store = {
  __typename?: 'Store'
  id: Scalars['ID']
  name: Scalars['String']
  localState: Scalars['String']
  descendants: Array<Store>
  state: InterfaceType
  stateAggregate?: Maybe<StoreInterfaceTypeStateAggregationSelection>
  actions: Array<Action>
  actionsAggregate?: Maybe<StoreActionActionsAggregationSelection>
  parentStore?: Maybe<Store>
  parentStoreAggregate?: Maybe<StoreStoreParentStoreAggregationSelection>
  children: Array<Store>
  childrenAggregate?: Maybe<StoreStoreChildrenAggregationSelection>
  resources: Array<Resource>
  resourcesAggregate?: Maybe<StoreResourceResourcesAggregationSelection>
  stateConnection: StoreStateConnection
  actionsConnection: StoreActionsConnection
  parentStoreConnection: StoreParentStoreConnection
  childrenConnection: StoreChildrenConnection
  resourcesConnection: StoreResourcesConnection
}

export type StoreStateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  options?: InputMaybe<InterfaceTypeOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreStateAggregateArgs = {
  where?: InputMaybe<InterfaceTypeWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreActionsArgs = {
  where?: InputMaybe<ActionWhere>
  options?: InputMaybe<ActionOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreActionsAggregateArgs = {
  where?: InputMaybe<ActionWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreParentStoreArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreParentStoreAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreChildrenArgs = {
  where?: InputMaybe<StoreWhere>
  options?: InputMaybe<StoreOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreChildrenAggregateArgs = {
  where?: InputMaybe<StoreWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreResourcesArgs = {
  where?: InputMaybe<ResourceWhere>
  options?: InputMaybe<ResourceOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type StoreStateConnectionArgs = {
  where?: InputMaybe<StoreStateConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreStateConnectionSort>>
}

export type StoreActionsConnectionArgs = {
  where?: InputMaybe<StoreActionsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreActionsConnectionSort>>
}

export type StoreParentStoreConnectionArgs = {
  where?: InputMaybe<StoreParentStoreConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreParentStoreConnectionSort>>
}

export type StoreChildrenConnectionArgs = {
  where?: InputMaybe<StoreChildrenConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreChildrenConnectionSort>>
}

export type StoreResourcesConnectionArgs = {
  where?: InputMaybe<StoreResourcesConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<StoreResourcesConnectionSort>>
}

export type StoreActionActionsAggregationSelection = {
  __typename?: 'StoreActionActionsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreActionActionsNodeAggregateSelection>
}

export type StoreActionActionsNodeAggregateSelection = {
  __typename?: 'StoreActionActionsNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  body: StringAggregateSelectionNonNullable
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
  node: Action
}

export type StoreAggregateSelection = {
  __typename?: 'StoreAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  localState: StringAggregateSelectionNonNullable
}

export type StoreChildrenConnection = {
  __typename?: 'StoreChildrenConnection'
  edges: Array<StoreChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreChildrenRelationship = ParentOfStore & {
  __typename?: 'StoreChildrenRelationship'
  cursor: Scalars['String']
  node: Store
  storeKey: Scalars['String']
}

export type StoreInterfaceTypeStateAggregationSelection = {
  __typename?: 'StoreInterfaceTypeStateAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreInterfaceTypeStateNodeAggregateSelection>
}

export type StoreInterfaceTypeStateNodeAggregateSelection = {
  __typename?: 'StoreInterfaceTypeStateNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreParentStoreConnection = {
  __typename?: 'StoreParentStoreConnection'
  edges: Array<StoreParentStoreRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreParentStoreRelationship = ParentOfStore & {
  __typename?: 'StoreParentStoreRelationship'
  cursor: Scalars['String']
  node: Store
  storeKey: Scalars['String']
}

export type StoreResourceResourcesAggregationSelection = {
  __typename?: 'StoreResourceResourcesAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreResourceResourcesNodeAggregateSelection>
  edge?: Maybe<StoreResourceResourcesEdgeAggregateSelection>
}

export type StoreResourceResourcesEdgeAggregateSelection = {
  __typename?: 'StoreResourceResourcesEdgeAggregateSelection'
  resourceKey: StringAggregateSelectionNonNullable
}

export type StoreResourceResourcesNodeAggregateSelection = {
  __typename?: 'StoreResourceResourcesNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  config: StringAggregateSelectionNonNullable
}

export type StoreResourcesConnection = {
  __typename?: 'StoreResourcesConnection'
  edges: Array<StoreResourcesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreResourcesRelationship = StoreResource & {
  __typename?: 'StoreResourcesRelationship'
  cursor: Scalars['String']
  node: Resource
  resourceKey: Scalars['String']
}

export type StoreStateConnection = {
  __typename?: 'StoreStateConnection'
  edges: Array<StoreStateRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type StoreStateRelationship = {
  __typename?: 'StoreStateRelationship'
  cursor: Scalars['String']
  node: InterfaceType
}

export type StoreStoreChildrenAggregationSelection = {
  __typename?: 'StoreStoreChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreStoreChildrenNodeAggregateSelection>
  edge?: Maybe<StoreStoreChildrenEdgeAggregateSelection>
}

export type StoreStoreChildrenEdgeAggregateSelection = {
  __typename?: 'StoreStoreChildrenEdgeAggregateSelection'
  storeKey: StringAggregateSelectionNonNullable
}

export type StoreStoreChildrenNodeAggregateSelection = {
  __typename?: 'StoreStoreChildrenNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  localState: StringAggregateSelectionNonNullable
}

export type StoreStoreParentStoreAggregationSelection = {
  __typename?: 'StoreStoreParentStoreAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<StoreStoreParentStoreNodeAggregateSelection>
  edge?: Maybe<StoreStoreParentStoreEdgeAggregateSelection>
}

export type StoreStoreParentStoreEdgeAggregateSelection = {
  __typename?: 'StoreStoreParentStoreEdgeAggregateSelection'
  storeKey: StringAggregateSelectionNonNullable
}

export type StoreStoreParentStoreNodeAggregateSelection = {
  __typename?: 'StoreStoreParentStoreNodeAggregateSelection'
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
  localState: StringAggregateSelectionNonNullable
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
  parent?: Maybe<Tag>
  parentAggregate?: Maybe<TagTagParentAggregationSelection>
  children: Array<Tag>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  parentConnection: TagParentConnection
  childrenConnection: TagChildrenConnection
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

export type TagGraph = {
  __typename?: 'TagGraph'
  id: Scalars['ID']
  name: Scalars['String']
  descendants: Array<Scalars['ID']>
  isRoot: Scalars['Boolean']
}

export type TagGraphAggregateSelection = {
  __typename?: 'TagGraphAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagGraphOptions = {
  __typename?: 'TagGraphOptions'
  sort?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsAggregateSelection = {
  __typename?: 'TagGraphOptionsAggregateSelection'
  count: Scalars['Int']
  sort: IntAggregateSelectionNullable
  limit: IntAggregateSelectionNullable
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

export type TypeBaseOwnerConnection = {
  __typename?: 'TypeBaseOwnerConnection'
  edges: Array<TypeBaseOwnerRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type TypeBaseOwnerRelationship = {
  __typename?: 'TypeBaseOwnerRelationship'
  cursor: Scalars['String']
  node: User
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

/** Allows picking one of a set of types */
export type UnionType = TypeBase &
  WithDescendants & {
    __typename?: 'UnionType'
    id: Scalars['ID']
    name: Scalars['String']
    descendantTypesIds: Array<Scalars['ID']>
    owner: User
    ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>
    typesOfUnionType: Array<TypeBase>
    ownerConnection: TypeBaseOwnerConnection
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
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
  directed?: InputMaybe<Scalars['Boolean']>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  where?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectionSort>>
}

export type UnionTypeAggregateSelection = {
  __typename?: 'UnionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  node: TypeBase
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
}

export type UpdateActionsMutationResponse = {
  __typename?: 'UpdateActionsMutationResponse'
  info: UpdateInfo
  actions: Array<Action>
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

export type UpdateDeleteElementsInfosMutationResponse = {
  __typename?: 'UpdateDeleteElementsInfosMutationResponse'
  info: UpdateInfo
  deleteElementsInfos: Array<DeleteElementsInfo>
}

export type UpdateDeleteFieldResponsesMutationResponse = {
  __typename?: 'UpdateDeleteFieldResponsesMutationResponse'
  info: UpdateInfo
  deleteFieldResponses: Array<DeleteFieldResponse>
}

export type UpdateDeleteInfosMutationResponse = {
  __typename?: 'UpdateDeleteInfosMutationResponse'
  info: UpdateInfo
  deleteInfos: Array<DeleteInfo>
}

export type UpdateEdgesMutationResponse = {
  __typename?: 'UpdateEdgesMutationResponse'
  info: UpdateInfo
  edges: Array<Edge>
}

export type UpdateElementEdgesMutationResponse = {
  __typename?: 'UpdateElementEdgesMutationResponse'
  info: UpdateInfo
  elementEdges: Array<ElementEdge>
}

export type UpdateElementGraphsMutationResponse = {
  __typename?: 'UpdateElementGraphsMutationResponse'
  info: UpdateInfo
  elementGraphs: Array<ElementGraph>
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

export type UpdateInterfaceTypeEdgesMutationResponse = {
  __typename?: 'UpdateInterfaceTypeEdgesMutationResponse'
  info: UpdateInfo
  interfaceTypeEdges: Array<InterfaceTypeEdge>
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

export type UpdateMonacoTypesMutationResponse = {
  __typename?: 'UpdateMonacoTypesMutationResponse'
  info: UpdateInfo
  monacoTypes: Array<MonacoType>
}

export type UpdateOperationsMutationResponse = {
  __typename?: 'UpdateOperationsMutationResponse'
  info: UpdateInfo
  operations: Array<Operation>
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

export type UpdateTagGraphOptionsMutationResponse = {
  __typename?: 'UpdateTagGraphOptionsMutationResponse'
  info: UpdateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type UpdateTagGraphsMutationResponse = {
  __typename?: 'UpdateTagGraphsMutationResponse'
  info: UpdateInfo
  tagGraphs: Array<TagGraph>
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

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  auth0Id: Scalars['String']
  email: Scalars['String']
  types: Array<TypeBase>
  apps: Array<App>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  components: Array<Component>
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>
  typesConnection: UserTypesConnection
  appsConnection: UserAppsConnection
  componentsConnection: UserComponentsConnection
}

export type UserTypesArgs = {
  options?: InputMaybe<TypeBaseOptions>
  where?: InputMaybe<TypeBaseWhere>
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

export type UserComponentsArgs = {
  where?: InputMaybe<ComponentWhere>
  options?: InputMaybe<ComponentOptions>
  directed?: InputMaybe<Scalars['Boolean']>
}

export type UserComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
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

export type UserComponentsConnectionArgs = {
  where?: InputMaybe<UserComponentsConnectionWhere>
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<Array<UserComponentsConnectionSort>>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
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

export type UserTypesConnection = {
  __typename?: 'UserTypesConnection'
  edges: Array<UserTypesRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type UserTypesRelationship = {
  __typename?: 'UserTypesRelationship'
  cursor: Scalars['String']
  node: TypeBase
}

export type ActionConnectInput = {
  store?: InputMaybe<ActionStoreConnectFieldInput>
}

export type ActionConnectOrCreateInput = {
  store?: InputMaybe<ActionStoreConnectOrCreateFieldInput>
}

export type ActionConnectOrCreateWhere = {
  node: ActionUniqueWhere
}

export type ActionConnectWhere = {
  node: ActionWhere
}

export type ActionCreateInput = {
  name: Scalars['String']
  body: Scalars['String']
  store?: InputMaybe<ActionStoreFieldInput>
}

export type ActionDeleteInput = {
  store?: InputMaybe<ActionStoreDeleteFieldInput>
}

export type ActionDisconnectInput = {
  store?: InputMaybe<ActionStoreDisconnectFieldInput>
}

export type ActionOnCreateInput = {
  name: Scalars['String']
  body: Scalars['String']
}

export type ActionOptions = {
  /** Specify one or more ActionSort objects to sort Actions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ActionRelationInput = {
  store?: InputMaybe<ActionStoreCreateFieldInput>
}

/** Fields to sort Actions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionSort object. */
export type ActionSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  body?: InputMaybe<SortDirection>
}

export type ActionStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ActionStoreAggregateInput>>
  OR?: InputMaybe<Array<ActionStoreAggregateInput>>
  node?: InputMaybe<ActionStoreNodeAggregationWhereInput>
}

export type ActionStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>
  connect?: InputMaybe<StoreConnectInput>
}

export type ActionStoreConnectionSort = {
  node?: InputMaybe<StoreSort>
}

export type ActionStoreConnectionWhere = {
  AND?: InputMaybe<Array<ActionStoreConnectionWhere>>
  OR?: InputMaybe<Array<ActionStoreConnectionWhere>>
  node?: InputMaybe<StoreWhere>
  node_NOT?: InputMaybe<StoreWhere>
}

export type ActionStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere
  onCreate: ActionStoreConnectOrCreateFieldInputOnCreate
}

export type ActionStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type ActionStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type ActionStoreDeleteFieldInput = {
  where?: InputMaybe<ActionStoreConnectionWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type ActionStoreDisconnectFieldInput = {
  where?: InputMaybe<ActionStoreConnectionWhere>
  disconnect?: InputMaybe<StoreDisconnectInput>
}

export type ActionStoreFieldInput = {
  create?: InputMaybe<ActionStoreCreateFieldInput>
  connect?: InputMaybe<ActionStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionStoreConnectOrCreateFieldInput>
}

export type ActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ActionStoreNodeAggregationWhereInput>>
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
  localState_EQUAL?: InputMaybe<Scalars['String']>
  localState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  localState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_GT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  localState_GTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  localState_LT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  localState_LTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ActionStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type ActionStoreUpdateFieldInput = {
  where?: InputMaybe<ActionStoreConnectionWhere>
  update?: InputMaybe<ActionStoreUpdateConnectionInput>
  connect?: InputMaybe<ActionStoreConnectFieldInput>
  disconnect?: InputMaybe<ActionStoreDisconnectFieldInput>
  create?: InputMaybe<ActionStoreCreateFieldInput>
  delete?: InputMaybe<ActionStoreDeleteFieldInput>
  connectOrCreate?: InputMaybe<ActionStoreConnectOrCreateFieldInput>
}

export type ActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ActionUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  body?: InputMaybe<Scalars['String']>
  store?: InputMaybe<ActionStoreUpdateFieldInput>
}

export type ActionWhere = {
  OR?: InputMaybe<Array<ActionWhere>>
  AND?: InputMaybe<Array<ActionWhere>>
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
  body?: InputMaybe<Scalars['String']>
  body_NOT?: InputMaybe<Scalars['String']>
  body_IN?: InputMaybe<Array<Scalars['String']>>
  body_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  body_CONTAINS?: InputMaybe<Scalars['String']>
  body_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  body_STARTS_WITH?: InputMaybe<Scalars['String']>
  body_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  body_ENDS_WITH?: InputMaybe<Scalars['String']>
  body_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  store?: InputMaybe<StoreWhere>
  store_NOT?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<ActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionStoreConnectionWhere>
}

export type AppConnectInput = {
  owner?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  pages?: InputMaybe<Array<AppPagesConnectFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementConnectFieldInput>
  store?: InputMaybe<AppStoreConnectFieldInput>
}

export type AppConnectOrCreateInput = {
  owner?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  pages?: InputMaybe<Array<AppPagesConnectOrCreateFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementConnectOrCreateFieldInput>
  store?: InputMaybe<AppStoreConnectOrCreateFieldInput>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<AppOwnerFieldInput>
  pages?: InputMaybe<AppPagesFieldInput>
  rootProviderElement?: InputMaybe<AppRootProviderElementFieldInput>
  store?: InputMaybe<AppStoreFieldInput>
}

export type AppDeleteInput = {
  owner?: InputMaybe<Array<AppOwnerDeleteFieldInput>>
  pages?: InputMaybe<Array<AppPagesDeleteFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementDeleteFieldInput>
  store?: InputMaybe<AppStoreDeleteFieldInput>
}

export type AppDisconnectInput = {
  owner?: InputMaybe<Array<AppOwnerDisconnectFieldInput>>
  pages?: InputMaybe<Array<AppPagesDisconnectFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementDisconnectFieldInput>
  store?: InputMaybe<AppStoreDisconnectFieldInput>
}

export type AppOnCreateInput = {
  name: Scalars['String']
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

export type AppOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<Array<UserConnectInput>>
}

export type AppOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type AppOwnerConnectionWhere = {
  AND?: InputMaybe<Array<AppOwnerConnectionWhere>>
  OR?: InputMaybe<Array<AppOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type AppOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: AppOwnerConnectOrCreateFieldInputOnCreate
}

export type AppOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type AppOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type AppOwnerDeleteFieldInput = {
  where?: InputMaybe<AppOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type AppOwnerDisconnectFieldInput = {
  where?: InputMaybe<AppOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type AppOwnerFieldInput = {
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
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
}

export type AppOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type AppOwnerUpdateFieldInput = {
  where?: InputMaybe<AppOwnerConnectionWhere>
  update?: InputMaybe<AppOwnerUpdateConnectionInput>
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  disconnect?: InputMaybe<Array<AppOwnerDisconnectFieldInput>>
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  delete?: InputMaybe<Array<AppOwnerDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
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
  owner?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementCreateFieldInput>
  store?: InputMaybe<AppStoreCreateFieldInput>
}

export type AppRootProviderElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<AppRootProviderElementAggregateInput>>
  OR?: InputMaybe<Array<AppRootProviderElementAggregateInput>>
  node?: InputMaybe<AppRootProviderElementNodeAggregationWhereInput>
}

export type AppRootProviderElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
}

export type AppRootProviderElementConnectionSort = {
  node?: InputMaybe<ElementSort>
}

export type AppRootProviderElementConnectionWhere = {
  AND?: InputMaybe<Array<AppRootProviderElementConnectionWhere>>
  OR?: InputMaybe<Array<AppRootProviderElementConnectionWhere>>
  node?: InputMaybe<ElementWhere>
  node_NOT?: InputMaybe<ElementWhere>
}

export type AppRootProviderElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: AppRootProviderElementConnectOrCreateFieldInputOnCreate
}

export type AppRootProviderElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type AppRootProviderElementCreateFieldInput = {
  node: ElementCreateInput
}

export type AppRootProviderElementDeleteFieldInput = {
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type AppRootProviderElementDisconnectFieldInput = {
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type AppRootProviderElementFieldInput = {
  create?: InputMaybe<AppRootProviderElementCreateFieldInput>
  connect?: InputMaybe<AppRootProviderElementConnectFieldInput>
  connectOrCreate?: InputMaybe<AppRootProviderElementConnectOrCreateFieldInput>
}

export type AppRootProviderElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppRootProviderElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppRootProviderElementNodeAggregationWhereInput>>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
}

export type AppRootProviderElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type AppRootProviderElementUpdateFieldInput = {
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
  update?: InputMaybe<AppRootProviderElementUpdateConnectionInput>
  connect?: InputMaybe<AppRootProviderElementConnectFieldInput>
  disconnect?: InputMaybe<AppRootProviderElementDisconnectFieldInput>
  create?: InputMaybe<AppRootProviderElementCreateFieldInput>
  delete?: InputMaybe<AppRootProviderElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<AppRootProviderElementConnectOrCreateFieldInput>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
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
  localState_EQUAL?: InputMaybe<Scalars['String']>
  localState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  localState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_GT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  localState_GTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  localState_LT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  localState_LTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type AppTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type AppTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type AppTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type AppTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type AppUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type AppUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<AppOwnerUpdateFieldInput>>
  pages?: InputMaybe<Array<AppPagesUpdateFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementUpdateFieldInput>
  store?: InputMaybe<AppStoreUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>
  /** Return Apps where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return Apps where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return Apps where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return Apps where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
  pages?: InputMaybe<PageWhere>
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
  rootProviderElement?: InputMaybe<ElementWhere>
  rootProviderElement_NOT?: InputMaybe<ElementWhere>
  rootProviderElementAggregate?: InputMaybe<AppRootProviderElementAggregateInput>
  store?: InputMaybe<StoreWhere>
  store_NOT?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<AppStoreAggregateInput>
  ownerConnection?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_ALL?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<AppOwnerConnectionWhere>
  pagesConnection?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_NOT?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_ALL?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_NONE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SINGLE?: InputMaybe<AppPagesConnectionWhere>
  pagesConnection_SOME?: InputMaybe<AppPagesConnectionWhere>
  rootProviderElementConnection?: InputMaybe<AppRootProviderElementConnectionWhere>
  rootProviderElementConnection_NOT?: InputMaybe<AppRootProviderElementConnectionWhere>
  storeConnection?: InputMaybe<AppStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<AppStoreConnectionWhere>
}

export type ArrayTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>
}

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ArrayTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeFieldInput>
}

export type ArrayTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeDeleteFieldInput>
}

export type ArrayTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeDisconnectFieldInput>
}

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
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
  create?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
  connect?: InputMaybe<ArrayTypeItemTypeConnectFieldInput>
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
}

export type ArrayTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeCreateFieldInput>
}

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ArrayTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
  itemType?: InputMaybe<ArrayTypeItemTypeUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  itemTypeConnection?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_NOT?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
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
}

export type AtomConnectOrCreateInput = {
  tags?: InputMaybe<Array<AtomTagsConnectOrCreateFieldInput>>
  api?: InputMaybe<AtomApiConnectOrCreateFieldInput>
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
  type: AtomType
  tags?: InputMaybe<AtomTagsFieldInput>
  api?: InputMaybe<AtomApiFieldInput>
}

export type AtomDeleteInput = {
  tags?: InputMaybe<Array<AtomTagsDeleteFieldInput>>
  api?: InputMaybe<AtomApiDeleteFieldInput>
}

export type AtomDisconnectInput = {
  tags?: InputMaybe<Array<AtomTagsDisconnectFieldInput>>
  api?: InputMaybe<AtomApiDisconnectFieldInput>
}

export type AtomOnCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
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
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
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
}

export type AtomUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AtomType>
  tags?: InputMaybe<Array<AtomTagsUpdateFieldInput>>
  api?: InputMaybe<AtomApiUpdateFieldInput>
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
  type?: InputMaybe<AtomType>
  type_NOT?: InputMaybe<AtomType>
  type_IN?: InputMaybe<Array<AtomType>>
  type_NOT_IN?: InputMaybe<Array<AtomType>>
  tags?: InputMaybe<TagWhere>
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
  tagsConnection?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_NOT?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_ALL?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_NONE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SINGLE?: InputMaybe<AtomTagsConnectionWhere>
  tagsConnection_SOME?: InputMaybe<AtomTagsConnectionWhere>
  apiConnection?: InputMaybe<AtomApiConnectionWhere>
  apiConnection_NOT?: InputMaybe<AtomApiConnectionWhere>
}

export type ComponentConnectInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>
  owner?: InputMaybe<ComponentOwnerConnectFieldInput>
}

export type ComponentConnectOrCreateInput = {
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
  owner?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
}

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere
}

export type ComponentConnectWhere = {
  node: ComponentWhere
}

export type ComponentCreateInput = {
  name: Scalars['String']
  rootElement?: InputMaybe<ComponentRootElementFieldInput>
  owner?: InputMaybe<ComponentOwnerFieldInput>
}

export type ComponentDeleteInput = {
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>
  owner?: InputMaybe<ComponentOwnerDeleteFieldInput>
}

export type ComponentDisconnectInput = {
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>
  owner?: InputMaybe<ComponentOwnerDisconnectFieldInput>
}

export type ComponentOnCreateInput = {
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

export type ComponentOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<UserConnectInput>
}

export type ComponentOwnerConnectionSort = {
  node?: InputMaybe<UserSort>
}

export type ComponentOwnerConnectionWhere = {
  AND?: InputMaybe<Array<ComponentOwnerConnectionWhere>>
  OR?: InputMaybe<Array<ComponentOwnerConnectionWhere>>
  node?: InputMaybe<UserWhere>
  node_NOT?: InputMaybe<UserWhere>
}

export type ComponentOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: ComponentOwnerConnectOrCreateFieldInputOnCreate
}

export type ComponentOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type ComponentOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type ComponentOwnerDeleteFieldInput = {
  where?: InputMaybe<ComponentOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type ComponentOwnerDisconnectFieldInput = {
  where?: InputMaybe<ComponentOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type ComponentOwnerFieldInput = {
  create?: InputMaybe<ComponentOwnerCreateFieldInput>
  connect?: InputMaybe<ComponentOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
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
}

export type ComponentOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type ComponentOwnerUpdateFieldInput = {
  where?: InputMaybe<ComponentOwnerConnectionWhere>
  update?: InputMaybe<ComponentOwnerUpdateConnectionInput>
  connect?: InputMaybe<ComponentOwnerConnectFieldInput>
  disconnect?: InputMaybe<ComponentOwnerDisconnectFieldInput>
  create?: InputMaybe<ComponentOwnerCreateFieldInput>
  delete?: InputMaybe<ComponentOwnerDeleteFieldInput>
  connectOrCreate?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
}

export type ComponentRelationInput = {
  rootElement?: InputMaybe<ComponentRootElementCreateFieldInput>
  owner?: InputMaybe<ComponentOwnerCreateFieldInput>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  name?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>
  owner?: InputMaybe<ComponentOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ComponentOwnerAggregateInput>
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>
  ownerConnection?: InputMaybe<ComponentOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<ComponentOwnerConnectionWhere>
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

export type DeleteElementsInfoCreateInput = {
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
  deletedIds: Array<Scalars['String']>
}

export type DeleteElementsInfoOptions = {
  /** Specify one or more DeleteElementsInfoSort objects to sort DeleteElementsInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteElementsInfoSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort DeleteElementsInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteElementsInfoSort object. */
export type DeleteElementsInfoSort = {
  nodesDeleted?: InputMaybe<SortDirection>
  relationshipsDeleted?: InputMaybe<SortDirection>
}

export type DeleteElementsInfoUpdateInput = {
  nodesDeleted?: InputMaybe<Scalars['Int']>
  relationshipsDeleted?: InputMaybe<Scalars['Int']>
  deletedIds?: InputMaybe<Array<Scalars['String']>>
}

export type DeleteElementsInfoWhere = {
  OR?: InputMaybe<Array<DeleteElementsInfoWhere>>
  AND?: InputMaybe<Array<DeleteElementsInfoWhere>>
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
  deletedIds?: InputMaybe<Array<Scalars['String']>>
  deletedIds_NOT?: InputMaybe<Array<Scalars['String']>>
  deletedIds_INCLUDES?: InputMaybe<Scalars['String']>
  deletedIds_NOT_INCLUDES?: InputMaybe<Scalars['String']>
}

export type DeleteFieldInput = {
  interfaceId: Scalars['ID']
  key: Scalars['String']
}

export type DeleteFieldResponseCreateInput = {
  deletedEdgesCount: Scalars['Int']
}

export type DeleteFieldResponseOptions = {
  /** Specify one or more DeleteFieldResponseSort objects to sort DeleteFieldResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteFieldResponseSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort DeleteFieldResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteFieldResponseSort object. */
export type DeleteFieldResponseSort = {
  deletedEdgesCount?: InputMaybe<SortDirection>
}

export type DeleteFieldResponseUpdateInput = {
  deletedEdgesCount?: InputMaybe<Scalars['Int']>
}

export type DeleteFieldResponseWhere = {
  OR?: InputMaybe<Array<DeleteFieldResponseWhere>>
  AND?: InputMaybe<Array<DeleteFieldResponseWhere>>
  deletedEdgesCount?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_NOT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_IN?: InputMaybe<Array<Scalars['Int']>>
  deletedEdgesCount_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
  deletedEdgesCount_LT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_LTE?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_GT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_GTE?: InputMaybe<Scalars['Int']>
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

export type EdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
}

export type EdgeOptions = {
  /** Specify one or more EdgeSort objects to sort Edges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EdgeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort Edges by. The order in which sorts are applied is not guaranteed when specifying many fields in one EdgeSort object. */
export type EdgeSort = {
  source?: InputMaybe<SortDirection>
  target?: InputMaybe<SortDirection>
}

export type EdgeUpdateInput = {
  source?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
}

export type EdgeWhere = {
  OR?: InputMaybe<Array<EdgeWhere>>
  AND?: InputMaybe<Array<EdgeWhere>>
  source?: InputMaybe<Scalars['String']>
  source_NOT?: InputMaybe<Scalars['String']>
  source_IN?: InputMaybe<Array<Scalars['String']>>
  source_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  source_CONTAINS?: InputMaybe<Scalars['String']>
  source_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  source_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_ENDS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  target_NOT?: InputMaybe<Scalars['String']>
  target_IN?: InputMaybe<Array<Scalars['String']>>
  target_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  target_CONTAINS?: InputMaybe<Scalars['String']>
  target_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  target_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_ENDS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
}

export type ElementAtomAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementAtomAggregateInput>>
  OR?: InputMaybe<Array<ElementAtomAggregateInput>>
  node?: InputMaybe<ElementAtomNodeAggregationWhereInput>
}

export type ElementAtomConnectFieldInput = {
  where?: InputMaybe<AtomConnectWhere>
  connect?: InputMaybe<AtomConnectInput>
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

export type ElementAtomConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: ElementAtomConnectOrCreateFieldInputOnCreate
}

export type ElementAtomConnectOrCreateFieldInputOnCreate = {
  node: AtomOnCreateInput
}

export type ElementAtomCreateFieldInput = {
  node: AtomCreateInput
}

export type ElementAtomDeleteFieldInput = {
  where?: InputMaybe<ElementAtomConnectionWhere>
  delete?: InputMaybe<AtomDeleteInput>
}

export type ElementAtomDisconnectFieldInput = {
  where?: InputMaybe<ElementAtomConnectionWhere>
  disconnect?: InputMaybe<AtomDisconnectInput>
}

export type ElementAtomFieldInput = {
  create?: InputMaybe<ElementAtomCreateFieldInput>
  connect?: InputMaybe<ElementAtomConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
}

export type ElementAtomNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementAtomNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementAtomNodeAggregationWhereInput>>
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

export type ElementAtomUpdateConnectionInput = {
  node?: InputMaybe<AtomUpdateInput>
}

export type ElementAtomUpdateFieldInput = {
  where?: InputMaybe<ElementAtomConnectionWhere>
  update?: InputMaybe<ElementAtomUpdateConnectionInput>
  connect?: InputMaybe<ElementAtomConnectFieldInput>
  disconnect?: InputMaybe<ElementAtomDisconnectFieldInput>
  create?: InputMaybe<ElementAtomCreateFieldInput>
  delete?: InputMaybe<ElementAtomDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
}

export type ElementChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementChildrenAggregateInput>>
  OR?: InputMaybe<Array<ElementChildrenAggregateInput>>
  node?: InputMaybe<ElementChildrenNodeAggregationWhereInput>
  edge?: InputMaybe<ElementChildrenEdgeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<Array<ElementConnectInput>>
  edge?: InputMaybe<ParentOfElementCreateInput>
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

export type ElementChildrenConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
  edge?: InputMaybe<ParentOfElementCreateInput>
}

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput
  edge?: InputMaybe<ParentOfElementCreateInput>
}

export type ElementChildrenDeleteFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementChildrenDisconnectFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementChildrenEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  order_EQUAL?: InputMaybe<Scalars['Int']>
  order_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  order_MIN_EQUAL?: InputMaybe<Scalars['Int']>
  order_MAX_EQUAL?: InputMaybe<Scalars['Int']>
  order_SUM_EQUAL?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  order_MIN_GT?: InputMaybe<Scalars['Int']>
  order_MAX_GT?: InputMaybe<Scalars['Int']>
  order_SUM_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
  order_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  order_MIN_GTE?: InputMaybe<Scalars['Int']>
  order_MAX_GTE?: InputMaybe<Scalars['Int']>
  order_SUM_GTE?: InputMaybe<Scalars['Int']>
  order_LT?: InputMaybe<Scalars['Int']>
  order_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  order_MIN_LT?: InputMaybe<Scalars['Int']>
  order_MAX_LT?: InputMaybe<Scalars['Int']>
  order_SUM_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  order_MIN_LTE?: InputMaybe<Scalars['Int']>
  order_MAX_LTE?: InputMaybe<Scalars['Int']>
  order_SUM_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementChildrenFieldInput = {
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementChildrenNodeAggregationWhereInput>>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
}

export type ElementChildrenUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
  edge?: InputMaybe<ParentOfElementUpdateInput>
}

export type ElementChildrenUpdateFieldInput = {
  where?: InputMaybe<ElementChildrenConnectionWhere>
  update?: InputMaybe<ElementChildrenUpdateConnectionInput>
  connect?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  disconnect?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  create?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementComponentAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementComponentAggregateInput>>
  OR?: InputMaybe<Array<ElementComponentAggregateInput>>
  node?: InputMaybe<ElementComponentNodeAggregationWhereInput>
}

export type ElementComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>
  connect?: InputMaybe<ComponentConnectInput>
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

export type ElementComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementComponentConnectOrCreateFieldInputOnCreate
}

export type ElementComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementComponentDeleteFieldInput = {
  where?: InputMaybe<ElementComponentConnectionWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type ElementComponentDisconnectFieldInput = {
  where?: InputMaybe<ElementComponentConnectionWhere>
  disconnect?: InputMaybe<ComponentDisconnectInput>
}

export type ElementComponentFieldInput = {
  create?: InputMaybe<ElementComponentCreateFieldInput>
  connect?: InputMaybe<ElementComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
}

export type ElementComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementComponentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementComponentNodeAggregationWhereInput>>
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

export type ElementComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementComponentUpdateFieldInput = {
  where?: InputMaybe<ElementComponentConnectionWhere>
  update?: InputMaybe<ElementComponentUpdateConnectionInput>
  connect?: InputMaybe<ElementComponentConnectFieldInput>
  disconnect?: InputMaybe<ElementComponentDisconnectFieldInput>
  create?: InputMaybe<ElementComponentCreateFieldInput>
  delete?: InputMaybe<ElementComponentDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
}

export type ElementConnectInput = {
  children?: InputMaybe<Array<ElementChildrenConnectFieldInput>>
  props?: InputMaybe<ElementPropsConnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  component?: InputMaybe<ElementComponentConnectFieldInput>
  atom?: InputMaybe<ElementAtomConnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
}

export type ElementConnectOrCreateInput = {
  children?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  component?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
  atom?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
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
  name?: InputMaybe<Scalars['String']>
  css?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  children?: InputMaybe<ElementChildrenFieldInput>
  props?: InputMaybe<ElementPropsFieldInput>
  parentElement?: InputMaybe<ElementParentElementFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentFieldInput>
  component?: InputMaybe<ElementComponentFieldInput>
  atom?: InputMaybe<ElementAtomFieldInput>
  hooks?: InputMaybe<ElementHooksFieldInput>
  propMapBindings?: InputMaybe<ElementPropMapBindingsFieldInput>
}

export type ElementDeleteInput = {
  children?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  props?: InputMaybe<ElementPropsDeleteFieldInput>
  parentElement?: InputMaybe<ElementParentElementDeleteFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDeleteFieldInput>
  component?: InputMaybe<ElementComponentDeleteFieldInput>
  atom?: InputMaybe<ElementAtomDeleteFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
}

export type ElementDisconnectInput = {
  children?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  props?: InputMaybe<ElementPropsDisconnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementDisconnectFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDisconnectFieldInput>
  component?: InputMaybe<ElementComponentDisconnectFieldInput>
  atom?: InputMaybe<ElementAtomDisconnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsDisconnectFieldInput>
  >
}

export type ElementEdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
  order?: InputMaybe<Scalars['Int']>
}

export type ElementEdgeOptions = {
  /** Specify one or more ElementEdgeSort objects to sort ElementEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementEdgeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort ElementEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementEdgeSort object. */
export type ElementEdgeSort = {
  source?: InputMaybe<SortDirection>
  target?: InputMaybe<SortDirection>
  order?: InputMaybe<SortDirection>
}

export type ElementEdgeUpdateInput = {
  source?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Scalars['Int']>
}

export type ElementEdgeWhere = {
  OR?: InputMaybe<Array<ElementEdgeWhere>>
  AND?: InputMaybe<Array<ElementEdgeWhere>>
  source?: InputMaybe<Scalars['String']>
  source_NOT?: InputMaybe<Scalars['String']>
  source_IN?: InputMaybe<Array<Scalars['String']>>
  source_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  source_CONTAINS?: InputMaybe<Scalars['String']>
  source_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  source_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_ENDS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  target_NOT?: InputMaybe<Scalars['String']>
  target_IN?: InputMaybe<Array<Scalars['String']>>
  target_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  target_CONTAINS?: InputMaybe<Scalars['String']>
  target_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  target_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_ENDS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Scalars['Int']>
  order_NOT?: InputMaybe<Scalars['Int']>
  order_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  order_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  order_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
}

export type ElementGraphCreateInput = {
  id: Scalars['ID']
  descendants: Array<Scalars['ID']>
}

export type ElementGraphInput = {
  rootId: Scalars['String']
}

export type ElementGraphOptions = {
  /** Specify one or more ElementGraphSort objects to sort ElementGraphs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementGraphSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort ElementGraphs by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementGraphSort object. */
export type ElementGraphSort = {
  id?: InputMaybe<SortDirection>
}

export type ElementGraphUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  descendants?: InputMaybe<Array<Scalars['ID']>>
}

export type ElementGraphWhere = {
  OR?: InputMaybe<Array<ElementGraphWhere>>
  AND?: InputMaybe<Array<ElementGraphWhere>>
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
  descendants?: InputMaybe<Array<Scalars['ID']>>
  descendants_NOT?: InputMaybe<Array<Scalars['ID']>>
  descendants_INCLUDES?: InputMaybe<Scalars['ID']>
  descendants_NOT_INCLUDES?: InputMaybe<Scalars['ID']>
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

export type ElementInstanceOfComponentAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementInstanceOfComponentAggregateInput>>
  OR?: InputMaybe<Array<ElementInstanceOfComponentAggregateInput>>
  node?: InputMaybe<ElementInstanceOfComponentNodeAggregationWhereInput>
}

export type ElementInstanceOfComponentConnectFieldInput = {
  where?: InputMaybe<ComponentConnectWhere>
  connect?: InputMaybe<ComponentConnectInput>
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

export type ElementInstanceOfComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate
}

export type ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentOnCreateInput
}

export type ElementInstanceOfComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementInstanceOfComponentDeleteFieldInput = {
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}

export type ElementInstanceOfComponentDisconnectFieldInput = {
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  disconnect?: InputMaybe<ComponentDisconnectInput>
}

export type ElementInstanceOfComponentFieldInput = {
  create?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  connect?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
}

export type ElementInstanceOfComponentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
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

export type ElementInstanceOfComponentUpdateConnectionInput = {
  node?: InputMaybe<ComponentUpdateInput>
}

export type ElementInstanceOfComponentUpdateFieldInput = {
  where?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  update?: InputMaybe<ElementInstanceOfComponentUpdateConnectionInput>
  connect?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  disconnect?: InputMaybe<ElementInstanceOfComponentDisconnectFieldInput>
  create?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  delete?: InputMaybe<ElementInstanceOfComponentDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
}

export type ElementOnCreateInput = {
  name?: InputMaybe<Scalars['String']>
  css?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ElementSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ElementParentElementAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ElementParentElementAggregateInput>>
  OR?: InputMaybe<Array<ElementParentElementAggregateInput>>
  node?: InputMaybe<ElementParentElementNodeAggregationWhereInput>
  edge?: InputMaybe<ElementParentElementEdgeAggregationWhereInput>
}

export type ElementParentElementConnectFieldInput = {
  where?: InputMaybe<ElementConnectWhere>
  connect?: InputMaybe<ElementConnectInput>
  edge?: InputMaybe<ParentOfElementCreateInput>
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

export type ElementParentElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementParentElementConnectOrCreateFieldInputOnCreate
}

export type ElementParentElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
  edge?: InputMaybe<ParentOfElementCreateInput>
}

export type ElementParentElementCreateFieldInput = {
  node: ElementCreateInput
  edge?: InputMaybe<ParentOfElementCreateInput>
}

export type ElementParentElementDeleteFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>
  delete?: InputMaybe<ElementDeleteInput>
}

export type ElementParentElementDisconnectFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>
  disconnect?: InputMaybe<ElementDisconnectInput>
}

export type ElementParentElementEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  order_EQUAL?: InputMaybe<Scalars['Int']>
  order_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  order_MIN_EQUAL?: InputMaybe<Scalars['Int']>
  order_MAX_EQUAL?: InputMaybe<Scalars['Int']>
  order_SUM_EQUAL?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  order_MIN_GT?: InputMaybe<Scalars['Int']>
  order_MAX_GT?: InputMaybe<Scalars['Int']>
  order_SUM_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
  order_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  order_MIN_GTE?: InputMaybe<Scalars['Int']>
  order_MAX_GTE?: InputMaybe<Scalars['Int']>
  order_SUM_GTE?: InputMaybe<Scalars['Int']>
  order_LT?: InputMaybe<Scalars['Int']>
  order_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  order_MIN_LT?: InputMaybe<Scalars['Int']>
  order_MAX_LT?: InputMaybe<Scalars['Int']>
  order_SUM_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  order_MIN_LTE?: InputMaybe<Scalars['Int']>
  order_MAX_LTE?: InputMaybe<Scalars['Int']>
  order_SUM_LTE?: InputMaybe<Scalars['Int']>
}

export type ElementParentElementFieldInput = {
  create?: InputMaybe<ElementParentElementCreateFieldInput>
  connect?: InputMaybe<ElementParentElementConnectFieldInput>
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
}

export type ElementParentElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ElementParentElementNodeAggregationWhereInput>>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
}

export type ElementParentElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
  edge?: InputMaybe<ParentOfElementUpdateInput>
}

export type ElementParentElementUpdateFieldInput = {
  where?: InputMaybe<ElementParentElementConnectionWhere>
  update?: InputMaybe<ElementParentElementUpdateConnectionInput>
  connect?: InputMaybe<ElementParentElementConnectFieldInput>
  disconnect?: InputMaybe<ElementParentElementDisconnectFieldInput>
  create?: InputMaybe<ElementParentElementCreateFieldInput>
  delete?: InputMaybe<ElementParentElementDeleteFieldInput>
  connectOrCreate?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
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
  children?: InputMaybe<Array<ElementChildrenCreateFieldInput>>
  props?: InputMaybe<ElementPropsCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementCreateFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  component?: InputMaybe<ElementComponentCreateFieldInput>
  atom?: InputMaybe<ElementAtomCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  css?: InputMaybe<SortDirection>
  propTransformationJs?: InputMaybe<SortDirection>
  renderForEachPropKey?: InputMaybe<SortDirection>
  renderIfPropKey?: InputMaybe<SortDirection>
}

export type ElementTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ElementTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  elementKind: ElementTypeKind
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type ElementTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  elementKind?: InputMaybe<SortDirection>
}

export type ElementTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  elementKind?: InputMaybe<ElementTypeKind>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  elementKind?: InputMaybe<ElementTypeKind>
  elementKind_NOT?: InputMaybe<ElementTypeKind>
  elementKind_IN?: InputMaybe<Array<ElementTypeKind>>
  elementKind_NOT_IN?: InputMaybe<Array<ElementTypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  css?: InputMaybe<Scalars['String']>
  propTransformationJs?: InputMaybe<Scalars['String']>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
  children?: InputMaybe<Array<ElementChildrenUpdateFieldInput>>
  props?: InputMaybe<ElementPropsUpdateFieldInput>
  parentElement?: InputMaybe<ElementParentElementUpdateFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentUpdateFieldInput>
  component?: InputMaybe<ElementComponentUpdateFieldInput>
  atom?: InputMaybe<ElementAtomUpdateFieldInput>
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
  css?: InputMaybe<Scalars['String']>
  css_NOT?: InputMaybe<Scalars['String']>
  css_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  css_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  css_CONTAINS?: InputMaybe<Scalars['String']>
  css_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  css_STARTS_WITH?: InputMaybe<Scalars['String']>
  css_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  css_ENDS_WITH?: InputMaybe<Scalars['String']>
  css_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
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
  children?: InputMaybe<ElementWhere>
  children_NOT?: InputMaybe<ElementWhere>
  childrenAggregate?: InputMaybe<ElementChildrenAggregateInput>
  /** Return Elements where all of the related Elements match this filter */
  children_ALL?: InputMaybe<ElementWhere>
  /** Return Elements where none of the related Elements match this filter */
  children_NONE?: InputMaybe<ElementWhere>
  /** Return Elements where one of the related Elements match this filter */
  children_SINGLE?: InputMaybe<ElementWhere>
  /** Return Elements where some of the related Elements match this filter */
  children_SOME?: InputMaybe<ElementWhere>
  props?: InputMaybe<PropWhere>
  props_NOT?: InputMaybe<PropWhere>
  propsAggregate?: InputMaybe<ElementPropsAggregateInput>
  parentElement?: InputMaybe<ElementWhere>
  parentElement_NOT?: InputMaybe<ElementWhere>
  parentElementAggregate?: InputMaybe<ElementParentElementAggregateInput>
  instanceOfComponent?: InputMaybe<ComponentWhere>
  instanceOfComponent_NOT?: InputMaybe<ComponentWhere>
  instanceOfComponentAggregate?: InputMaybe<ElementInstanceOfComponentAggregateInput>
  component?: InputMaybe<ComponentWhere>
  component_NOT?: InputMaybe<ComponentWhere>
  componentAggregate?: InputMaybe<ElementComponentAggregateInput>
  atom?: InputMaybe<AtomWhere>
  atom_NOT?: InputMaybe<AtomWhere>
  atomAggregate?: InputMaybe<ElementAtomAggregateInput>
  hooks?: InputMaybe<HookWhere>
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
  propMapBindings?: InputMaybe<PropMapBindingWhere>
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
  childrenConnection?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_NOT?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_ALL?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<ElementChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<ElementChildrenConnectionWhere>
  propsConnection?: InputMaybe<ElementPropsConnectionWhere>
  propsConnection_NOT?: InputMaybe<ElementPropsConnectionWhere>
  parentElementConnection?: InputMaybe<ElementParentElementConnectionWhere>
  parentElementConnection_NOT?: InputMaybe<ElementParentElementConnectionWhere>
  instanceOfComponentConnection?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  instanceOfComponentConnection_NOT?: InputMaybe<ElementInstanceOfComponentConnectionWhere>
  componentConnection?: InputMaybe<ElementComponentConnectionWhere>
  componentConnection_NOT?: InputMaybe<ElementComponentConnectionWhere>
  atomConnection?: InputMaybe<ElementAtomConnectionWhere>
  atomConnection_NOT?: InputMaybe<ElementAtomConnectionWhere>
  hooksConnection?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_NOT?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_ALL?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_NONE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SINGLE?: InputMaybe<ElementHooksConnectionWhere>
  hooksConnection_SOME?: InputMaybe<ElementHooksConnectionWhere>
  propMapBindingsConnection?: InputMaybe<ElementPropMapBindingsConnectionWhere>
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
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
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
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>
}

export type EnumTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
}

export type EnumTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type EnumTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
}

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type EnumTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type EnumTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  name?: InputMaybe<Scalars['String']>
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
  name?: InputMaybe<SortDirection>
  value?: InputMaybe<SortDirection>
}

export type EnumTypeValueUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>
  allowedValues?: InputMaybe<EnumTypeValueWhere>
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
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  allowedValuesConnection?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_NOT?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_ALL?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_NONE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SINGLE?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_SOME?: InputMaybe<EnumTypeAllowedValuesConnectionWhere>
}

export type FieldCreateInput = {
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type FieldSort = {
  key?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  description?: InputMaybe<SortDirection>
}

export type FieldUpdateInput = {
  key?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type FieldWhere = {
  OR?: InputMaybe<Array<FieldWhere>>
  AND?: InputMaybe<Array<FieldWhere>>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
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
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  apiOfAtoms?: InputMaybe<InterfaceTypeApiOfAtomsFieldInput>
  fields?: InputMaybe<InterfaceTypeFieldsFieldInput>
}

export type InterfaceTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
}

export type InterfaceTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
}

export type InterfaceTypeEdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type InterfaceTypeEdgeOptions = {
  /** Specify one or more InterfaceTypeEdgeSort objects to sort InterfaceTypeEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InterfaceTypeEdgeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort InterfaceTypeEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeEdgeSort object. */
export type InterfaceTypeEdgeSort = {
  source?: InputMaybe<SortDirection>
  target?: InputMaybe<SortDirection>
  key?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  description?: InputMaybe<SortDirection>
}

export type InterfaceTypeEdgeUpdateInput = {
  source?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  key?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type InterfaceTypeEdgeWhere = {
  OR?: InputMaybe<Array<InterfaceTypeEdgeWhere>>
  AND?: InputMaybe<Array<InterfaceTypeEdgeWhere>>
  source?: InputMaybe<Scalars['String']>
  source_NOT?: InputMaybe<Scalars['String']>
  source_IN?: InputMaybe<Array<Scalars['String']>>
  source_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  source_CONTAINS?: InputMaybe<Scalars['String']>
  source_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  source_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_ENDS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  target_NOT?: InputMaybe<Scalars['String']>
  target_IN?: InputMaybe<Array<Scalars['String']>>
  target_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  target_CONTAINS?: InputMaybe<Scalars['String']>
  target_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  target_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_ENDS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
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
}

export type InterfaceTypeFieldsConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  edge: FieldCreateInput
  where?: InputMaybe<TypeBaseConnectWhere>
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
  node: TypeBaseCreateInput
  edge: FieldCreateInput
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
  create?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  connect?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
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
}

export type InterfaceTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
}

/** Fields to sort InterfaceTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeSort object. */
export type InterfaceTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type InterfaceTypeUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type InterfaceTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>
  apiOfAtoms?: InputMaybe<AtomWhere>
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
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  apiOfAtomsConnection?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_NOT?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_ALL?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_NONE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SINGLE?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_SOME?: InputMaybe<InterfaceTypeApiOfAtomsConnectionWhere>
  fieldsConnection?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_NOT?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_ALL?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_NONE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SINGLE?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_SOME?: InputMaybe<InterfaceTypeFieldsConnectionWhere>
}

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type LambdaTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type LambdaTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type MonacoTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type MonacoTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type MonacoTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  language: MonacoLanguage
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type MonacoTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type MonacoTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
}

export type MonacoTypeOptions = {
  /** Specify one or more MonacoTypeSort objects to sort MonacoTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MonacoTypeSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type MonacoTypeOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<MonacoTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<MonacoTypeOwnerAggregateInput>>
  node?: InputMaybe<MonacoTypeOwnerNodeAggregationWhereInput>
}

export type MonacoTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
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
}

export type MonacoTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort MonacoTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one MonacoTypeSort object. */
export type MonacoTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  language?: InputMaybe<SortDirection>
}

export type MonacoTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  language?: InputMaybe<MonacoLanguage>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type MonacoTypeWhere = {
  OR?: InputMaybe<Array<MonacoTypeWhere>>
  AND?: InputMaybe<Array<MonacoTypeWhere>>
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
  language?: InputMaybe<MonacoLanguage>
  language_NOT?: InputMaybe<MonacoLanguage>
  language_IN?: InputMaybe<Array<MonacoLanguage>>
  language_NOT_IN?: InputMaybe<Array<MonacoLanguage>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<MonacoTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type OperationConnectInput = {
  resource?: InputMaybe<OperationResourceConnectFieldInput>
}

export type OperationConnectOrCreateInput = {
  resource?: InputMaybe<OperationResourceConnectOrCreateFieldInput>
}

export type OperationConnectOrCreateWhere = {
  node: OperationUniqueWhere
}

export type OperationConnectWhere = {
  node: OperationWhere
}

export type OperationCreateInput = {
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
  config?: Scalars['String']
  resource?: InputMaybe<OperationResourceFieldInput>
}

export type OperationDeleteInput = {
  resource?: InputMaybe<OperationResourceDeleteFieldInput>
}

export type OperationDisconnectInput = {
  resource?: InputMaybe<OperationResourceDisconnectFieldInput>
}

export type OperationOnCreateInput = {
  name: Scalars['String']
  runOnInit?: Scalars['Boolean']
  config?: Scalars['String']
}

export type OperationOptions = {
  /** Specify one or more OperationSort objects to sort Operations by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<OperationSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type OperationRelationInput = {
  resource?: InputMaybe<OperationResourceCreateFieldInput>
}

export type OperationResourceAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<OperationResourceAggregateInput>>
  OR?: InputMaybe<Array<OperationResourceAggregateInput>>
  node?: InputMaybe<OperationResourceNodeAggregationWhereInput>
}

export type OperationResourceConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>
  connect?: InputMaybe<ResourceConnectInput>
}

export type OperationResourceConnectionSort = {
  node?: InputMaybe<ResourceSort>
}

export type OperationResourceConnectionWhere = {
  AND?: InputMaybe<Array<OperationResourceConnectionWhere>>
  OR?: InputMaybe<Array<OperationResourceConnectionWhere>>
  node?: InputMaybe<ResourceWhere>
  node_NOT?: InputMaybe<ResourceWhere>
}

export type OperationResourceConnectOrCreateFieldInput = {
  where: ResourceConnectOrCreateWhere
  onCreate: OperationResourceConnectOrCreateFieldInputOnCreate
}

export type OperationResourceConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput
}

export type OperationResourceCreateFieldInput = {
  node: ResourceCreateInput
}

export type OperationResourceDeleteFieldInput = {
  where?: InputMaybe<OperationResourceConnectionWhere>
  delete?: InputMaybe<ResourceDeleteInput>
}

export type OperationResourceDisconnectFieldInput = {
  where?: InputMaybe<OperationResourceConnectionWhere>
  disconnect?: InputMaybe<ResourceDisconnectInput>
}

export type OperationResourceFieldInput = {
  create?: InputMaybe<OperationResourceCreateFieldInput>
  connect?: InputMaybe<OperationResourceConnectFieldInput>
  connectOrCreate?: InputMaybe<OperationResourceConnectOrCreateFieldInput>
}

export type OperationResourceNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<OperationResourceNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<OperationResourceNodeAggregationWhereInput>>
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
  config_EQUAL?: InputMaybe<Scalars['String']>
  config_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  config_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_GT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  config_LONGEST_GT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  config_GTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  config_LT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  config_LONGEST_LT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  config_LTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type OperationResourceUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>
}

export type OperationResourceUpdateFieldInput = {
  where?: InputMaybe<OperationResourceConnectionWhere>
  update?: InputMaybe<OperationResourceUpdateConnectionInput>
  connect?: InputMaybe<OperationResourceConnectFieldInput>
  disconnect?: InputMaybe<OperationResourceDisconnectFieldInput>
  create?: InputMaybe<OperationResourceCreateFieldInput>
  delete?: InputMaybe<OperationResourceDeleteFieldInput>
  connectOrCreate?: InputMaybe<OperationResourceConnectOrCreateFieldInput>
}

/** Fields to sort Operations by. The order in which sorts are applied is not guaranteed when specifying many fields in one OperationSort object. */
export type OperationSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  runOnInit?: InputMaybe<SortDirection>
  config?: InputMaybe<SortDirection>
}

export type OperationUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type OperationUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  runOnInit?: InputMaybe<Scalars['Boolean']>
  config?: InputMaybe<Scalars['String']>
  resource?: InputMaybe<OperationResourceUpdateFieldInput>
}

export type OperationWhere = {
  OR?: InputMaybe<Array<OperationWhere>>
  AND?: InputMaybe<Array<OperationWhere>>
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
  runOnInit?: InputMaybe<Scalars['Boolean']>
  runOnInit_NOT?: InputMaybe<Scalars['Boolean']>
  config?: InputMaybe<Scalars['String']>
  config_NOT?: InputMaybe<Scalars['String']>
  config_IN?: InputMaybe<Array<Scalars['String']>>
  config_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  config_CONTAINS?: InputMaybe<Scalars['String']>
  config_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  config_STARTS_WITH?: InputMaybe<Scalars['String']>
  config_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  config_ENDS_WITH?: InputMaybe<Scalars['String']>
  config_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  resource?: InputMaybe<ResourceWhere>
  resource_NOT?: InputMaybe<ResourceWhere>
  resourceAggregate?: InputMaybe<OperationResourceAggregateInput>
  resourceConnection?: InputMaybe<OperationResourceConnectionWhere>
  resourceConnection_NOT?: InputMaybe<OperationResourceConnectionWhere>
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
  name: Scalars['String']
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
  name: Scalars['String']
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
}

export type PageTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PageTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type PageTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type PageTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type PageTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageUpdateInput = {
  name?: InputMaybe<Scalars['String']>
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
  OR?: InputMaybe<Array<ParentOfElementWhere>>
  AND?: InputMaybe<Array<ParentOfElementWhere>>
  order?: InputMaybe<Scalars['Int']>
  order_NOT?: InputMaybe<Scalars['Int']>
  order_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  order_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  order_LT?: InputMaybe<Scalars['Int']>
  order_LTE?: InputMaybe<Scalars['Int']>
  order_GT?: InputMaybe<Scalars['Int']>
  order_GTE?: InputMaybe<Scalars['Int']>
}

export type ParentOfStoreCreateInput = {
  storeKey: Scalars['String']
}

export type ParentOfStoreSort = {
  storeKey?: InputMaybe<SortDirection>
}

export type ParentOfStoreUpdateInput = {
  storeKey?: InputMaybe<Scalars['String']>
}

export type ParentOfStoreWhere = {
  OR?: InputMaybe<Array<ParentOfStoreWhere>>
  AND?: InputMaybe<Array<ParentOfStoreWhere>>
  storeKey?: InputMaybe<Scalars['String']>
  storeKey_NOT?: InputMaybe<Scalars['String']>
  storeKey_IN?: InputMaybe<Array<Scalars['String']>>
  storeKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  storeKey_CONTAINS?: InputMaybe<Scalars['String']>
  storeKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  storeKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  storeKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  storeKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  storeKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
}

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PrimitiveTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  primitiveKind: PrimitiveTypeKind
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  primitiveKind?: InputMaybe<SortDirection>
}

export type PrimitiveTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_NOT?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  primitiveKind_NOT_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ReactNodeTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ReactNodeTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type RenderPropsTypeConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
}

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type RenderPropsTypeCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type RenderPropsTypeDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
}

export type RenderPropsTypeDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
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
}

export type RenderPropsTypeRelationInput = {
  owner?: InputMaybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type RenderPropsTypeUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<RenderPropsTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
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

export type ResourceConnectInput = {
  operations?: InputMaybe<Array<ResourceOperationsConnectFieldInput>>
}

export type ResourceConnectOrCreateInput = {
  operations?: InputMaybe<Array<ResourceOperationsConnectOrCreateFieldInput>>
}

export type ResourceConnectOrCreateWhere = {
  node: ResourceUniqueWhere
}

export type ResourceConnectWhere = {
  node: ResourceWhere
}

export type ResourceCreateInput = {
  name: Scalars['String']
  config?: Scalars['String']
  type: ResourceType
  operations?: InputMaybe<ResourceOperationsFieldInput>
}

export type ResourceDeleteInput = {
  operations?: InputMaybe<Array<ResourceOperationsDeleteFieldInput>>
}

export type ResourceDisconnectInput = {
  operations?: InputMaybe<Array<ResourceOperationsDisconnectFieldInput>>
}

export type ResourceOnCreateInput = {
  name: Scalars['String']
  config?: Scalars['String']
}

export type ResourceOperationsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<ResourceOperationsAggregateInput>>
  OR?: InputMaybe<Array<ResourceOperationsAggregateInput>>
  node?: InputMaybe<ResourceOperationsNodeAggregationWhereInput>
}

export type ResourceOperationsConnectFieldInput = {
  where?: InputMaybe<OperationConnectWhere>
  connect?: InputMaybe<Array<OperationConnectInput>>
}

export type ResourceOperationsConnectionSort = {
  node?: InputMaybe<OperationSort>
}

export type ResourceOperationsConnectionWhere = {
  AND?: InputMaybe<Array<ResourceOperationsConnectionWhere>>
  OR?: InputMaybe<Array<ResourceOperationsConnectionWhere>>
  node?: InputMaybe<OperationWhere>
  node_NOT?: InputMaybe<OperationWhere>
}

export type ResourceOperationsConnectOrCreateFieldInput = {
  where: OperationConnectOrCreateWhere
  onCreate: ResourceOperationsConnectOrCreateFieldInputOnCreate
}

export type ResourceOperationsConnectOrCreateFieldInputOnCreate = {
  node: OperationOnCreateInput
}

export type ResourceOperationsCreateFieldInput = {
  node: OperationCreateInput
}

export type ResourceOperationsDeleteFieldInput = {
  where?: InputMaybe<ResourceOperationsConnectionWhere>
  delete?: InputMaybe<OperationDeleteInput>
}

export type ResourceOperationsDisconnectFieldInput = {
  where?: InputMaybe<ResourceOperationsConnectionWhere>
  disconnect?: InputMaybe<OperationDisconnectInput>
}

export type ResourceOperationsFieldInput = {
  create?: InputMaybe<Array<ResourceOperationsCreateFieldInput>>
  connect?: InputMaybe<Array<ResourceOperationsConnectFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ResourceOperationsConnectOrCreateFieldInput>
  >
}

export type ResourceOperationsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ResourceOperationsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ResourceOperationsNodeAggregationWhereInput>>
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
  config_EQUAL?: InputMaybe<Scalars['String']>
  config_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  config_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_GT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  config_LONGEST_GT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  config_GTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  config_LT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  config_LONGEST_LT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  config_LTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type ResourceOperationsUpdateConnectionInput = {
  node?: InputMaybe<OperationUpdateInput>
}

export type ResourceOperationsUpdateFieldInput = {
  where?: InputMaybe<ResourceOperationsConnectionWhere>
  update?: InputMaybe<ResourceOperationsUpdateConnectionInput>
  connect?: InputMaybe<Array<ResourceOperationsConnectFieldInput>>
  disconnect?: InputMaybe<Array<ResourceOperationsDisconnectFieldInput>>
  create?: InputMaybe<Array<ResourceOperationsCreateFieldInput>>
  delete?: InputMaybe<Array<ResourceOperationsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<
    Array<ResourceOperationsConnectOrCreateFieldInput>
  >
}

export type ResourceOptions = {
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type ResourceRelationInput = {
  operations?: InputMaybe<Array<ResourceOperationsCreateFieldInput>>
}

/** Fields to sort Resources by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceSort object. */
export type ResourceSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  config?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type ResourceUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ResourceUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  config?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ResourceType>
  operations?: InputMaybe<Array<ResourceOperationsUpdateFieldInput>>
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
  config?: InputMaybe<Scalars['String']>
  config_NOT?: InputMaybe<Scalars['String']>
  config_IN?: InputMaybe<Array<Scalars['String']>>
  config_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  config_CONTAINS?: InputMaybe<Scalars['String']>
  config_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  config_STARTS_WITH?: InputMaybe<Scalars['String']>
  config_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  config_ENDS_WITH?: InputMaybe<Scalars['String']>
  config_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ResourceType>
  type_NOT?: InputMaybe<ResourceType>
  type_IN?: InputMaybe<Array<ResourceType>>
  type_NOT_IN?: InputMaybe<Array<ResourceType>>
  operations?: InputMaybe<OperationWhere>
  operations_NOT?: InputMaybe<OperationWhere>
  operationsAggregate?: InputMaybe<ResourceOperationsAggregateInput>
  /** Return Resources where all of the related Operations match this filter */
  operations_ALL?: InputMaybe<OperationWhere>
  /** Return Resources where none of the related Operations match this filter */
  operations_NONE?: InputMaybe<OperationWhere>
  /** Return Resources where one of the related Operations match this filter */
  operations_SINGLE?: InputMaybe<OperationWhere>
  /** Return Resources where some of the related Operations match this filter */
  operations_SOME?: InputMaybe<OperationWhere>
  operationsConnection?: InputMaybe<ResourceOperationsConnectionWhere>
  operationsConnection_NOT?: InputMaybe<ResourceOperationsConnectionWhere>
  operationsConnection_ALL?: InputMaybe<ResourceOperationsConnectionWhere>
  operationsConnection_NONE?: InputMaybe<ResourceOperationsConnectionWhere>
  operationsConnection_SINGLE?: InputMaybe<ResourceOperationsConnectionWhere>
  operationsConnection_SOME?: InputMaybe<ResourceOperationsConnectionWhere>
}

export type StoreActionsAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreActionsAggregateInput>>
  OR?: InputMaybe<Array<StoreActionsAggregateInput>>
  node?: InputMaybe<StoreActionsNodeAggregationWhereInput>
}

export type StoreActionsConnectFieldInput = {
  where?: InputMaybe<ActionConnectWhere>
  connect?: InputMaybe<Array<ActionConnectInput>>
}

export type StoreActionsConnectionSort = {
  node?: InputMaybe<ActionSort>
}

export type StoreActionsConnectionWhere = {
  AND?: InputMaybe<Array<StoreActionsConnectionWhere>>
  OR?: InputMaybe<Array<StoreActionsConnectionWhere>>
  node?: InputMaybe<ActionWhere>
  node_NOT?: InputMaybe<ActionWhere>
}

export type StoreActionsConnectOrCreateFieldInput = {
  where: ActionConnectOrCreateWhere
  onCreate: StoreActionsConnectOrCreateFieldInputOnCreate
}

export type StoreActionsConnectOrCreateFieldInputOnCreate = {
  node: ActionOnCreateInput
}

export type StoreActionsCreateFieldInput = {
  node: ActionCreateInput
}

export type StoreActionsDeleteFieldInput = {
  where?: InputMaybe<StoreActionsConnectionWhere>
  delete?: InputMaybe<ActionDeleteInput>
}

export type StoreActionsDisconnectFieldInput = {
  where?: InputMaybe<StoreActionsConnectionWhere>
  disconnect?: InputMaybe<ActionDisconnectInput>
}

export type StoreActionsFieldInput = {
  create?: InputMaybe<Array<StoreActionsCreateFieldInput>>
  connect?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
}

export type StoreActionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreActionsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreActionsNodeAggregationWhereInput>>
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
  body_EQUAL?: InputMaybe<Scalars['String']>
  body_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  body_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  body_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  body_GT?: InputMaybe<Scalars['Int']>
  body_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  body_LONGEST_GT?: InputMaybe<Scalars['Int']>
  body_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  body_GTE?: InputMaybe<Scalars['Int']>
  body_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  body_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  body_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  body_LT?: InputMaybe<Scalars['Int']>
  body_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  body_LONGEST_LT?: InputMaybe<Scalars['Int']>
  body_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  body_LTE?: InputMaybe<Scalars['Int']>
  body_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  body_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  body_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreActionsUpdateConnectionInput = {
  node?: InputMaybe<ActionUpdateInput>
}

export type StoreActionsUpdateFieldInput = {
  where?: InputMaybe<StoreActionsConnectionWhere>
  update?: InputMaybe<StoreActionsUpdateConnectionInput>
  connect?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsDisconnectFieldInput>>
  create?: InputMaybe<Array<StoreActionsCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
}

export type StoreChildrenAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreChildrenAggregateInput>>
  OR?: InputMaybe<Array<StoreChildrenAggregateInput>>
  node?: InputMaybe<StoreChildrenNodeAggregationWhereInput>
  edge?: InputMaybe<StoreChildrenEdgeAggregationWhereInput>
}

export type StoreChildrenConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>
  connect?: InputMaybe<Array<StoreConnectInput>>
  edge: ParentOfStoreCreateInput
}

export type StoreChildrenConnectionSort = {
  edge?: InputMaybe<ParentOfStoreSort>
  node?: InputMaybe<StoreSort>
}

export type StoreChildrenConnectionWhere = {
  AND?: InputMaybe<Array<StoreChildrenConnectionWhere>>
  OR?: InputMaybe<Array<StoreChildrenConnectionWhere>>
  edge?: InputMaybe<ParentOfStoreWhere>
  edge_NOT?: InputMaybe<ParentOfStoreWhere>
  node?: InputMaybe<StoreWhere>
  node_NOT?: InputMaybe<StoreWhere>
}

export type StoreChildrenConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere
  onCreate: StoreChildrenConnectOrCreateFieldInputOnCreate
}

export type StoreChildrenConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
  edge: ParentOfStoreCreateInput
}

export type StoreChildrenCreateFieldInput = {
  node: StoreCreateInput
  edge: ParentOfStoreCreateInput
}

export type StoreChildrenDeleteFieldInput = {
  where?: InputMaybe<StoreChildrenConnectionWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type StoreChildrenDisconnectFieldInput = {
  where?: InputMaybe<StoreChildrenConnectionWhere>
  disconnect?: InputMaybe<StoreDisconnectInput>
}

export type StoreChildrenEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreChildrenEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreChildrenEdgeAggregationWhereInput>>
  storeKey_EQUAL?: InputMaybe<Scalars['String']>
  storeKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_GT?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_GTE?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LT?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_LTE?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreChildrenFieldInput = {
  create?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
  connect?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
}

export type StoreChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreChildrenNodeAggregationWhereInput>>
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
  localState_EQUAL?: InputMaybe<Scalars['String']>
  localState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  localState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_GT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  localState_GTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  localState_LT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  localState_LTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreChildrenUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
  edge?: InputMaybe<ParentOfStoreUpdateInput>
}

export type StoreChildrenUpdateFieldInput = {
  where?: InputMaybe<StoreChildrenConnectionWhere>
  update?: InputMaybe<StoreChildrenUpdateConnectionInput>
  connect?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  disconnect?: InputMaybe<Array<StoreChildrenDisconnectFieldInput>>
  create?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<StoreChildrenDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
}

export type StoreConnectInput = {
  state?: InputMaybe<StoreStateConnectFieldInput>
  actions?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreConnectFieldInput>
  children?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesConnectFieldInput>>
}

export type StoreConnectOrCreateInput = {
  state?: InputMaybe<StoreStateConnectOrCreateFieldInput>
  actions?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
  children?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesConnectOrCreateFieldInput>>
}

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere
}

export type StoreConnectWhere = {
  node: StoreWhere
}

export type StoreCreateInput = {
  name: Scalars['String']
  localState?: Scalars['String']
  state?: InputMaybe<StoreStateFieldInput>
  actions?: InputMaybe<StoreActionsFieldInput>
  parentStore?: InputMaybe<StoreParentStoreFieldInput>
  children?: InputMaybe<StoreChildrenFieldInput>
  resources?: InputMaybe<StoreResourcesFieldInput>
}

export type StoreDeleteInput = {
  state?: InputMaybe<StoreStateDeleteFieldInput>
  actions?: InputMaybe<Array<StoreActionsDeleteFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreDeleteFieldInput>
  children?: InputMaybe<Array<StoreChildrenDeleteFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesDeleteFieldInput>>
}

export type StoreDisconnectInput = {
  state?: InputMaybe<StoreStateDisconnectFieldInput>
  actions?: InputMaybe<Array<StoreActionsDisconnectFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreDisconnectFieldInput>
  children?: InputMaybe<Array<StoreChildrenDisconnectFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesDisconnectFieldInput>>
}

export type StoreOnCreateInput = {
  name: Scalars['String']
  localState?: Scalars['String']
}

export type StoreOptions = {
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type StoreParentStoreAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreParentStoreAggregateInput>>
  OR?: InputMaybe<Array<StoreParentStoreAggregateInput>>
  node?: InputMaybe<StoreParentStoreNodeAggregationWhereInput>
  edge?: InputMaybe<StoreParentStoreEdgeAggregationWhereInput>
}

export type StoreParentStoreConnectFieldInput = {
  where?: InputMaybe<StoreConnectWhere>
  connect?: InputMaybe<StoreConnectInput>
  edge: ParentOfStoreCreateInput
}

export type StoreParentStoreConnectionSort = {
  edge?: InputMaybe<ParentOfStoreSort>
  node?: InputMaybe<StoreSort>
}

export type StoreParentStoreConnectionWhere = {
  AND?: InputMaybe<Array<StoreParentStoreConnectionWhere>>
  OR?: InputMaybe<Array<StoreParentStoreConnectionWhere>>
  edge?: InputMaybe<ParentOfStoreWhere>
  edge_NOT?: InputMaybe<ParentOfStoreWhere>
  node?: InputMaybe<StoreWhere>
  node_NOT?: InputMaybe<StoreWhere>
}

export type StoreParentStoreConnectOrCreateFieldInput = {
  where: StoreConnectOrCreateWhere
  onCreate: StoreParentStoreConnectOrCreateFieldInputOnCreate
}

export type StoreParentStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
  edge: ParentOfStoreCreateInput
}

export type StoreParentStoreCreateFieldInput = {
  node: StoreCreateInput
  edge: ParentOfStoreCreateInput
}

export type StoreParentStoreDeleteFieldInput = {
  where?: InputMaybe<StoreParentStoreConnectionWhere>
  delete?: InputMaybe<StoreDeleteInput>
}

export type StoreParentStoreDisconnectFieldInput = {
  where?: InputMaybe<StoreParentStoreConnectionWhere>
  disconnect?: InputMaybe<StoreDisconnectInput>
}

export type StoreParentStoreEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreParentStoreEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreParentStoreEdgeAggregationWhereInput>>
  storeKey_EQUAL?: InputMaybe<Scalars['String']>
  storeKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_GT?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_GTE?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LT?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_LTE?: InputMaybe<Scalars['Int']>
  storeKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  storeKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreParentStoreFieldInput = {
  create?: InputMaybe<StoreParentStoreCreateFieldInput>
  connect?: InputMaybe<StoreParentStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
}

export type StoreParentStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreParentStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreParentStoreNodeAggregationWhereInput>>
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
  localState_EQUAL?: InputMaybe<Scalars['String']>
  localState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  localState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  localState_GT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  localState_GTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  localState_LT?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  localState_LTE?: InputMaybe<Scalars['Int']>
  localState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  localState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  localState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreParentStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
  edge?: InputMaybe<ParentOfStoreUpdateInput>
}

export type StoreParentStoreUpdateFieldInput = {
  where?: InputMaybe<StoreParentStoreConnectionWhere>
  update?: InputMaybe<StoreParentStoreUpdateConnectionInput>
  connect?: InputMaybe<StoreParentStoreConnectFieldInput>
  disconnect?: InputMaybe<StoreParentStoreDisconnectFieldInput>
  create?: InputMaybe<StoreParentStoreCreateFieldInput>
  delete?: InputMaybe<StoreParentStoreDeleteFieldInput>
  connectOrCreate?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
}

export type StoreRelationInput = {
  state?: InputMaybe<StoreStateCreateFieldInput>
  actions?: InputMaybe<Array<StoreActionsCreateFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreCreateFieldInput>
  children?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesCreateFieldInput>>
}

export type StoreResourceCreateInput = {
  resourceKey: Scalars['String']
}

export type StoreResourcesAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreResourcesAggregateInput>>
  OR?: InputMaybe<Array<StoreResourcesAggregateInput>>
  node?: InputMaybe<StoreResourcesNodeAggregationWhereInput>
  edge?: InputMaybe<StoreResourcesEdgeAggregationWhereInput>
}

export type StoreResourcesConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>
  connect?: InputMaybe<Array<ResourceConnectInput>>
  edge: StoreResourceCreateInput
}

export type StoreResourcesConnectionSort = {
  edge?: InputMaybe<StoreResourceSort>
  node?: InputMaybe<ResourceSort>
}

export type StoreResourcesConnectionWhere = {
  AND?: InputMaybe<Array<StoreResourcesConnectionWhere>>
  OR?: InputMaybe<Array<StoreResourcesConnectionWhere>>
  edge?: InputMaybe<StoreResourceWhere>
  edge_NOT?: InputMaybe<StoreResourceWhere>
  node?: InputMaybe<ResourceWhere>
  node_NOT?: InputMaybe<ResourceWhere>
}

export type StoreResourcesConnectOrCreateFieldInput = {
  where: ResourceConnectOrCreateWhere
  onCreate: StoreResourcesConnectOrCreateFieldInputOnCreate
}

export type StoreResourcesConnectOrCreateFieldInputOnCreate = {
  node: ResourceOnCreateInput
  edge: StoreResourceCreateInput
}

export type StoreResourcesCreateFieldInput = {
  node: ResourceCreateInput
  edge: StoreResourceCreateInput
}

export type StoreResourcesDeleteFieldInput = {
  where?: InputMaybe<StoreResourcesConnectionWhere>
  delete?: InputMaybe<ResourceDeleteInput>
}

export type StoreResourcesDisconnectFieldInput = {
  where?: InputMaybe<StoreResourcesConnectionWhere>
  disconnect?: InputMaybe<ResourceDisconnectInput>
}

export type StoreResourcesEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreResourcesEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreResourcesEdgeAggregationWhereInput>>
  resourceKey_EQUAL?: InputMaybe<Scalars['String']>
  resourceKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  resourceKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  resourceKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  resourceKey_GT?: InputMaybe<Scalars['Int']>
  resourceKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  resourceKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  resourceKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  resourceKey_GTE?: InputMaybe<Scalars['Int']>
  resourceKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  resourceKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  resourceKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  resourceKey_LT?: InputMaybe<Scalars['Int']>
  resourceKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  resourceKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  resourceKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  resourceKey_LTE?: InputMaybe<Scalars['Int']>
  resourceKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  resourceKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  resourceKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreResourcesFieldInput = {
  create?: InputMaybe<Array<StoreResourcesCreateFieldInput>>
  connect?: InputMaybe<Array<StoreResourcesConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreResourcesConnectOrCreateFieldInput>>
}

export type StoreResourcesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreResourcesNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreResourcesNodeAggregationWhereInput>>
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
  config_EQUAL?: InputMaybe<Scalars['String']>
  config_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  config_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  config_GT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  config_LONGEST_GT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  config_GTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  config_LT?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  config_LONGEST_LT?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  config_LTE?: InputMaybe<Scalars['Int']>
  config_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  config_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  config_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreResourceSort = {
  resourceKey?: InputMaybe<SortDirection>
}

export type StoreResourcesUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>
  edge?: InputMaybe<StoreResourceUpdateInput>
}

export type StoreResourcesUpdateFieldInput = {
  where?: InputMaybe<StoreResourcesConnectionWhere>
  update?: InputMaybe<StoreResourcesUpdateConnectionInput>
  connect?: InputMaybe<Array<StoreResourcesConnectFieldInput>>
  disconnect?: InputMaybe<Array<StoreResourcesDisconnectFieldInput>>
  create?: InputMaybe<Array<StoreResourcesCreateFieldInput>>
  delete?: InputMaybe<Array<StoreResourcesDeleteFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreResourcesConnectOrCreateFieldInput>>
}

export type StoreResourceUpdateInput = {
  resourceKey?: InputMaybe<Scalars['String']>
}

export type StoreResourceWhere = {
  OR?: InputMaybe<Array<StoreResourceWhere>>
  AND?: InputMaybe<Array<StoreResourceWhere>>
  resourceKey?: InputMaybe<Scalars['String']>
  resourceKey_NOT?: InputMaybe<Scalars['String']>
  resourceKey_IN?: InputMaybe<Array<Scalars['String']>>
  resourceKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  resourceKey_CONTAINS?: InputMaybe<Scalars['String']>
  resourceKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  resourceKey_STARTS_WITH?: InputMaybe<Scalars['String']>
  resourceKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  resourceKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  resourceKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
}

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  localState?: InputMaybe<SortDirection>
}

export type StoreStateAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<StoreStateAggregateInput>>
  OR?: InputMaybe<Array<StoreStateAggregateInput>>
  node?: InputMaybe<StoreStateNodeAggregationWhereInput>
}

export type StoreStateConnectFieldInput = {
  where?: InputMaybe<InterfaceTypeConnectWhere>
  connect?: InputMaybe<InterfaceTypeConnectInput>
}

export type StoreStateConnectionSort = {
  node?: InputMaybe<InterfaceTypeSort>
}

export type StoreStateConnectionWhere = {
  AND?: InputMaybe<Array<StoreStateConnectionWhere>>
  OR?: InputMaybe<Array<StoreStateConnectionWhere>>
  node?: InputMaybe<InterfaceTypeWhere>
  node_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: StoreStateConnectOrCreateFieldInputOnCreate
}

export type StoreStateConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type StoreStateCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type StoreStateDeleteFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>
  delete?: InputMaybe<InterfaceTypeDeleteInput>
}

export type StoreStateDisconnectFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
}

export type StoreStateFieldInput = {
  create?: InputMaybe<StoreStateCreateFieldInput>
  connect?: InputMaybe<StoreStateConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>
}

export type StoreStateNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreStateNodeAggregationWhereInput>>
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

export type StoreStateUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
}

export type StoreStateUpdateFieldInput = {
  where?: InputMaybe<StoreStateConnectionWhere>
  update?: InputMaybe<StoreStateUpdateConnectionInput>
  connect?: InputMaybe<StoreStateConnectFieldInput>
  disconnect?: InputMaybe<StoreStateDisconnectFieldInput>
  create?: InputMaybe<StoreStateCreateFieldInput>
  delete?: InputMaybe<StoreStateDeleteFieldInput>
  connectOrCreate?: InputMaybe<StoreStateConnectOrCreateFieldInput>
}

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type StoreUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  localState?: InputMaybe<Scalars['String']>
  state?: InputMaybe<StoreStateUpdateFieldInput>
  actions?: InputMaybe<Array<StoreActionsUpdateFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreUpdateFieldInput>
  children?: InputMaybe<Array<StoreChildrenUpdateFieldInput>>
  resources?: InputMaybe<Array<StoreResourcesUpdateFieldInput>>
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
  localState?: InputMaybe<Scalars['String']>
  localState_NOT?: InputMaybe<Scalars['String']>
  localState_IN?: InputMaybe<Array<Scalars['String']>>
  localState_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  localState_CONTAINS?: InputMaybe<Scalars['String']>
  localState_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  localState_STARTS_WITH?: InputMaybe<Scalars['String']>
  localState_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  localState_ENDS_WITH?: InputMaybe<Scalars['String']>
  localState_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  state?: InputMaybe<InterfaceTypeWhere>
  state_NOT?: InputMaybe<InterfaceTypeWhere>
  stateAggregate?: InputMaybe<StoreStateAggregateInput>
  actions?: InputMaybe<ActionWhere>
  actions_NOT?: InputMaybe<ActionWhere>
  actionsAggregate?: InputMaybe<StoreActionsAggregateInput>
  /** Return Stores where all of the related Actions match this filter */
  actions_ALL?: InputMaybe<ActionWhere>
  /** Return Stores where none of the related Actions match this filter */
  actions_NONE?: InputMaybe<ActionWhere>
  /** Return Stores where one of the related Actions match this filter */
  actions_SINGLE?: InputMaybe<ActionWhere>
  /** Return Stores where some of the related Actions match this filter */
  actions_SOME?: InputMaybe<ActionWhere>
  parentStore?: InputMaybe<StoreWhere>
  parentStore_NOT?: InputMaybe<StoreWhere>
  parentStoreAggregate?: InputMaybe<StoreParentStoreAggregateInput>
  children?: InputMaybe<StoreWhere>
  children_NOT?: InputMaybe<StoreWhere>
  childrenAggregate?: InputMaybe<StoreChildrenAggregateInput>
  /** Return Stores where all of the related Stores match this filter */
  children_ALL?: InputMaybe<StoreWhere>
  /** Return Stores where none of the related Stores match this filter */
  children_NONE?: InputMaybe<StoreWhere>
  /** Return Stores where one of the related Stores match this filter */
  children_SINGLE?: InputMaybe<StoreWhere>
  /** Return Stores where some of the related Stores match this filter */
  children_SOME?: InputMaybe<StoreWhere>
  resources?: InputMaybe<ResourceWhere>
  resources_NOT?: InputMaybe<ResourceWhere>
  resourcesAggregate?: InputMaybe<StoreResourcesAggregateInput>
  /** Return Stores where all of the related Resources match this filter */
  resources_ALL?: InputMaybe<ResourceWhere>
  /** Return Stores where none of the related Resources match this filter */
  resources_NONE?: InputMaybe<ResourceWhere>
  /** Return Stores where one of the related Resources match this filter */
  resources_SINGLE?: InputMaybe<ResourceWhere>
  /** Return Stores where some of the related Resources match this filter */
  resources_SOME?: InputMaybe<ResourceWhere>
  stateConnection?: InputMaybe<StoreStateConnectionWhere>
  stateConnection_NOT?: InputMaybe<StoreStateConnectionWhere>
  actionsConnection?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_NOT?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>
  parentStoreConnection?: InputMaybe<StoreParentStoreConnectionWhere>
  parentStoreConnection_NOT?: InputMaybe<StoreParentStoreConnectionWhere>
  childrenConnection?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_NOT?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_ALL?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<StoreChildrenConnectionWhere>
  resourcesConnection?: InputMaybe<StoreResourcesConnectionWhere>
  resourcesConnection_NOT?: InputMaybe<StoreResourcesConnectionWhere>
  resourcesConnection_ALL?: InputMaybe<StoreResourcesConnectionWhere>
  resourcesConnection_NONE?: InputMaybe<StoreResourcesConnectionWhere>
  resourcesConnection_SINGLE?: InputMaybe<StoreResourcesConnectionWhere>
  resourcesConnection_SOME?: InputMaybe<StoreResourcesConnectionWhere>
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
}

export type TagConnectOrCreateInput = {
  parent?: InputMaybe<TagParentConnectOrCreateFieldInput>
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere
}

export type TagConnectWhere = {
  node: TagWhere
}

export type TagCreateInput = {
  name: Scalars['String']
  parent?: InputMaybe<TagParentFieldInput>
  children?: InputMaybe<TagChildrenFieldInput>
}

export type TagDeleteInput = {
  parent?: InputMaybe<TagParentDeleteFieldInput>
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
}

export type TagDisconnectInput = {
  parent?: InputMaybe<TagParentDisconnectFieldInput>
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
}

export type TagGraphCreateInput = {
  id: Scalars['ID']
  name: Scalars['String']
  descendants: Array<Scalars['ID']>
  isRoot: Scalars['Boolean']
}

export type TagGraphOptionsCreateInput = {
  sort?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
}

export type TagGraphOptionsOptions = {
  /** Specify one or more TagGraphOptionsSort objects to sort TagGraphOptions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagGraphOptionsSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** Fields to sort TagGraphOptions by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagGraphOptionsSort object. */
export type TagGraphOptionsSort = {
  sort?: InputMaybe<SortDirection>
  limit?: InputMaybe<SortDirection>
}

export type TagGraphOptionsUpdateInput = {
  sort?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
}

export type TagGraphOptionsWhere = {
  OR?: InputMaybe<Array<TagGraphOptionsWhere>>
  AND?: InputMaybe<Array<TagGraphOptionsWhere>>
  sort?: InputMaybe<Scalars['Int']>
  sort_NOT?: InputMaybe<Scalars['Int']>
  sort_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  sort_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  sort_LT?: InputMaybe<Scalars['Int']>
  sort_LTE?: InputMaybe<Scalars['Int']>
  sort_GT?: InputMaybe<Scalars['Int']>
  sort_GTE?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
  limit_NOT?: InputMaybe<Scalars['Int']>
  limit_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  limit_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  limit_LT?: InputMaybe<Scalars['Int']>
  limit_LTE?: InputMaybe<Scalars['Int']>
  limit_GT?: InputMaybe<Scalars['Int']>
  limit_GTE?: InputMaybe<Scalars['Int']>
}

export type TagGraphUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  descendants?: InputMaybe<Array<Scalars['ID']>>
  isRoot?: InputMaybe<Scalars['Boolean']>
}

export type TagGraphWhere = {
  OR?: InputMaybe<Array<TagGraphWhere>>
  AND?: InputMaybe<Array<TagGraphWhere>>
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
  descendants?: InputMaybe<Array<Scalars['ID']>>
  descendants_NOT?: InputMaybe<Array<Scalars['ID']>>
  descendants_INCLUDES?: InputMaybe<Scalars['ID']>
  descendants_NOT_INCLUDES?: InputMaybe<Scalars['ID']>
  isRoot?: InputMaybe<Scalars['Boolean']>
  isRoot_NOT?: InputMaybe<Scalars['Boolean']>
}

export type TagOnCreateInput = {
  name: Scalars['String']
}

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  name?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<TagParentUpdateFieldInput>
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>
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
  children?: InputMaybe<TagWhere>
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
  parentConnection?: InputMaybe<TagParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>
  childrenConnection?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_NOT?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_ALL?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<TagChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<TagChildrenConnectionWhere>
}

export type TypeBaseConnectInput = {
  owner?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  _on?: InputMaybe<TypeBaseImplementationsConnectInput>
}

export type TypeBaseConnectWhere = {
  node: TypeBaseWhere
}

export type TypeBaseCreateInput = {
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
  MonacoType?: InputMaybe<MonacoTypeCreateInput>
}

export type TypeBaseDeleteInput = {
  owner?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  _on?: InputMaybe<TypeBaseImplementationsDeleteInput>
}

export type TypeBaseDisconnectInput = {
  owner?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  _on?: InputMaybe<TypeBaseImplementationsDisconnectInput>
}

export type TypeBaseImplementationsConnectInput = {
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
  MonacoType?: InputMaybe<Array<MonacoTypeConnectInput>>
}

export type TypeBaseImplementationsDeleteInput = {
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
  MonacoType?: InputMaybe<Array<MonacoTypeDeleteInput>>
}

export type TypeBaseImplementationsDisconnectInput = {
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
  MonacoType?: InputMaybe<Array<MonacoTypeDisconnectInput>>
}

export type TypeBaseImplementationsUpdateInput = {
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
  MonacoType?: InputMaybe<MonacoTypeUpdateInput>
}

export type TypeBaseImplementationsWhere = {
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
  MonacoType?: InputMaybe<MonacoTypeWhere>
}

export type TypeBaseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TypeBaseSort objects to sort TypeBases by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<TypeBaseSort>>>
}

export type TypeBaseOwnerAggregateInput = {
  count?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  AND?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>
  OR?: InputMaybe<Array<TypeBaseOwnerAggregateInput>>
  node?: InputMaybe<TypeBaseOwnerNodeAggregationWhereInput>
}

export type TypeBaseOwnerConnectFieldInput = {
  where?: InputMaybe<UserConnectWhere>
  connect?: InputMaybe<UserConnectInput>
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

export type TypeBaseOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: TypeBaseOwnerConnectOrCreateFieldInputOnCreate
}

export type TypeBaseOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type TypeBaseOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type TypeBaseOwnerDeleteFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  delete?: InputMaybe<UserDeleteInput>
}

export type TypeBaseOwnerDisconnectFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  disconnect?: InputMaybe<UserDisconnectInput>
}

export type TypeBaseOwnerFieldInput = {
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type TypeBaseOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
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
}

export type TypeBaseOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type TypeBaseOwnerUpdateFieldInput = {
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
  update?: InputMaybe<TypeBaseOwnerUpdateConnectionInput>
  connect?: InputMaybe<TypeBaseOwnerConnectFieldInput>
  disconnect?: InputMaybe<TypeBaseOwnerDisconnectFieldInput>
  create?: InputMaybe<TypeBaseOwnerCreateFieldInput>
  delete?: InputMaybe<TypeBaseOwnerDeleteFieldInput>
  connectOrCreate?: InputMaybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

/** Fields to sort TypeBases by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeBaseSort object. */
export type TypeBaseSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TypeBaseUpdateInput = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  _on?: InputMaybe<TypeBaseImplementationsUpdateInput>
  owner?: InputMaybe<TypeBaseOwnerUpdateFieldInput>
}

export type TypeBaseWhere = {
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
  _on?: InputMaybe<TypeBaseImplementationsWhere>
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<TypeBaseOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
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
  name?: InputMaybe<SortDirection>
}

export type UnionTypeTypesOfUnionTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
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
  create?: InputMaybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
  connect?: InputMaybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
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
  owner?: InputMaybe<UserWhere>
  owner_NOT?: InputMaybe<UserWhere>
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>
  ownerConnection?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<TypeBaseOwnerConnectionWhere>
  typesOfUnionTypeConnection?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NOT?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UpsertFieldInput = {
  interfaceTypeId: Scalars['ID']
  targetTypeId: Scalars['ID']
  targetKey?: InputMaybe<Scalars['String']>
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
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
  components?: InputMaybe<Array<UserComponentsConnectFieldInput>>
}

export type UserConnectOrCreateInput = {
  apps?: InputMaybe<Array<UserAppsConnectOrCreateFieldInput>>
  components?: InputMaybe<Array<UserComponentsConnectOrCreateFieldInput>>
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
  types?: InputMaybe<UserTypesFieldInput>
  apps?: InputMaybe<UserAppsFieldInput>
  components?: InputMaybe<UserComponentsFieldInput>
}

export type UserDeleteInput = {
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
}

export type UserOnCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
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
  components?: InputMaybe<Array<UserComponentsCreateFieldInput>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>
  auth0Id?: InputMaybe<SortDirection>
  email?: InputMaybe<SortDirection>
}

export type UserTypesConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
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
  create?: InputMaybe<Array<UserTypesCreateFieldInput>>
  connect?: InputMaybe<Array<UserTypesConnectFieldInput>>
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
  id?: InputMaybe<Scalars['ID']>
  auth0Id?: InputMaybe<Scalars['String']>
}

export type UserUpdateInput = {
  auth0Id?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>
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
  apps?: InputMaybe<AppWhere>
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
  components?: InputMaybe<ComponentWhere>
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
  typesConnection?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_NOT?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>
  appsConnection?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_NOT?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_ALL?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_NONE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SINGLE?: InputMaybe<UserAppsConnectionWhere>
  appsConnection_SOME?: InputMaybe<UserAppsConnectionWhere>
  componentsConnection?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_NOT?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_ALL?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_NONE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SINGLE?: InputMaybe<UserComponentsConnectionWhere>
  componentsConnection_SOME?: InputMaybe<UserComponentsConnectionWhere>
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ResetDatabaseMutationResponseWhere

    aggregate: ResetDatabaseMutationResponseAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ResetDatabaseMutationResponseAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface EdgeAggregateSelectionInput {
  count?: boolean
  source?: StringAggregateInputNonNullable
  target?: StringAggregateInputNonNullable
}

export declare class EdgeModel {
  public find(args?: {
    where?: EdgeWhere

    options?: EdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Edge[]>
  public create(args: {
    input: EdgeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateEdgesMutationResponse>
  public update(args: {
    where?: EdgeWhere
    update?: EdgeUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateEdgesMutationResponse>
  public delete(args: {
    where?: EdgeWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: EdgeWhere

    aggregate: EdgeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<EdgeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface UserAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  auth0Id?: StringAggregateInputNonNullable
  email?: StringAggregateInputNonNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: UserWhere

    aggregate: UserAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<UserAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface AppAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AppWhere

    aggregate: AppAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AppAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface AtomAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AtomWhere

    aggregate: AtomAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AtomAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: CreateInfoWhere

    aggregate: CreateInfoAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<CreateInfoAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PageWhere

    aggregate: PageAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PageAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TypeReferenceWhere

    aggregate: TypeReferenceAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TypeReferenceAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface InterfaceTypeEdgeAggregateSelectionInput {
  count?: boolean
  source?: StringAggregateInputNonNullable
  target?: StringAggregateInputNonNullable
  key?: StringAggregateInputNonNullable
  name?: StringAggregateInputNullable
  description?: StringAggregateInputNullable
}

export declare class InterfaceTypeEdgeModel {
  public find(args?: {
    where?: InterfaceTypeEdgeWhere

    options?: InterfaceTypeEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeEdge[]>
  public create(args: {
    input: InterfaceTypeEdgeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateInterfaceTypeEdgesMutationResponse>
  public update(args: {
    where?: InterfaceTypeEdgeWhere
    update?: InterfaceTypeEdgeUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateInterfaceTypeEdgesMutationResponse>
  public delete(args: {
    where?: InterfaceTypeEdgeWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: InterfaceTypeEdgeWhere

    aggregate: InterfaceTypeEdgeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeEdgeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PrimitiveTypeWhere

    aggregate: PrimitiveTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PrimitiveTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ArrayTypeWhere

    aggregate: ArrayTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ArrayTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: UnionTypeWhere

    aggregate: UnionTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<UnionTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: InterfaceTypeWhere

    aggregate: InterfaceTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementTypeWhere

    aggregate: ElementTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: RenderPropsTypeWhere

    aggregate: RenderPropsTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<RenderPropsTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ReactNodeTypeWhere

    aggregate: ReactNodeTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ReactNodeTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: EnumTypeWhere

    aggregate: EnumTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
  name?: StringAggregateInputNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: EnumTypeValueWhere

    aggregate: EnumTypeValueAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeValueAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: LambdaTypeWhere

    aggregate: LambdaTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<LambdaTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PageTypeWhere

    aggregate: PageTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PageTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: AppTypeWhere

    aggregate: AppTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<AppTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface MonacoTypeAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class MonacoTypeModel {
  public find(args?: {
    where?: MonacoTypeWhere

    options?: MonacoTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<MonacoType[]>
  public create(args: {
    input: MonacoTypeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateMonacoTypesMutationResponse>
  public update(args: {
    where?: MonacoTypeWhere
    update?: MonacoTypeUpdateInput
    connect?: MonacoTypeConnectInput
    disconnect?: MonacoTypeDisconnectInput
    create?: MonacoTypeCreateInput
    connectOrCreate?: MonacoTypeConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateMonacoTypesMutationResponse>
  public delete(args: {
    where?: MonacoTypeWhere
    delete?: MonacoTypeDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: MonacoTypeWhere

    aggregate: MonacoTypeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<MonacoTypeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface DeleteFieldResponseAggregateSelectionInput {
  count?: boolean
  deletedEdgesCount?: IntAggregateInputNonNullable
}

export declare class DeleteFieldResponseModel {
  public find(args?: {
    where?: DeleteFieldResponseWhere

    options?: DeleteFieldResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<DeleteFieldResponse[]>
  public create(args: {
    input: DeleteFieldResponseCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateDeleteFieldResponsesMutationResponse>
  public update(args: {
    where?: DeleteFieldResponseWhere
    update?: DeleteFieldResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateDeleteFieldResponsesMutationResponse>
  public delete(args: {
    where?: DeleteFieldResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: DeleteFieldResponseWhere

    aggregate: DeleteFieldResponseAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<DeleteFieldResponseAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TagWhere

    aggregate: TagAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TagAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagGraphOptionsAggregateSelectionInput {
  count?: boolean
  sort?: IntAggregateInputNullable
  limit?: IntAggregateInputNullable
}

export declare class TagGraphOptionsModel {
  public find(args?: {
    where?: TagGraphOptionsWhere

    options?: TagGraphOptionsOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<TagGraphOptions[]>
  public create(args: {
    input: TagGraphOptionsCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagGraphOptionsMutationResponse>
  public update(args: {
    where?: TagGraphOptionsWhere
    update?: TagGraphOptionsUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagGraphOptionsMutationResponse>
  public delete(args: {
    where?: TagGraphOptionsWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TagGraphOptionsWhere

    aggregate: TagGraphOptionsAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TagGraphOptionsAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagGraphAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
}

export declare class TagGraphModel {
  public find(args?: {
    where?: TagGraphWhere

    options?: TagGraphOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<TagGraph[]>
  public create(args: {
    input: TagGraphCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagGraphsMutationResponse>
  public update(args: {
    where?: TagGraphWhere
    update?: TagGraphUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagGraphsMutationResponse>
  public delete(args: {
    where?: TagGraphWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: TagGraphWhere

    aggregate: TagGraphAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<TagGraphAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementEdgeAggregateSelectionInput {
  count?: boolean
  source?: StringAggregateInputNonNullable
  target?: StringAggregateInputNonNullable
  order?: IntAggregateInputNullable
}

export declare class ElementEdgeModel {
  public find(args?: {
    where?: ElementEdgeWhere

    options?: ElementEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ElementEdge[]>
  public create(args: {
    input: ElementEdgeCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateElementEdgesMutationResponse>
  public update(args: {
    where?: ElementEdgeWhere
    update?: ElementEdgeUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateElementEdgesMutationResponse>
  public delete(args: {
    where?: ElementEdgeWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementEdgeWhere

    aggregate: ElementEdgeAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementEdgeAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementGraphAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
}

export declare class ElementGraphModel {
  public find(args?: {
    where?: ElementGraphWhere

    options?: ElementGraphOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<ElementGraph[]>
  public create(args: {
    input: ElementGraphCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateElementGraphsMutationResponse>
  public update(args: {
    where?: ElementGraphWhere
    update?: ElementGraphUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateElementGraphsMutationResponse>
  public delete(args: {
    where?: ElementGraphWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementGraphWhere

    aggregate: ElementGraphAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementGraphAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNullable
  css?: StringAggregateInputNullable
  propTransformationJs?: StringAggregateInputNullable
  renderForEachPropKey?: StringAggregateInputNullable
  renderIfPropKey?: StringAggregateInputNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ElementWhere

    aggregate: ElementAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ElementAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DeleteElementsInfoAggregateSelectionInput {
  count?: boolean
  nodesDeleted?: IntAggregateInputNonNullable
  relationshipsDeleted?: IntAggregateInputNonNullable
}

export declare class DeleteElementsInfoModel {
  public find(args?: {
    where?: DeleteElementsInfoWhere

    options?: DeleteElementsInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<DeleteElementsInfo[]>
  public create(args: {
    input: DeleteElementsInfoCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateDeleteElementsInfosMutationResponse>
  public update(args: {
    where?: DeleteElementsInfoWhere
    update?: DeleteElementsInfoUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateDeleteElementsInfosMutationResponse>
  public delete(args: {
    where?: DeleteElementsInfoWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: DeleteElementsInfoWhere

    aggregate: DeleteElementsInfoAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<DeleteElementsInfoAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PropWhere

    aggregate: PropAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PropAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: PropMapBindingWhere

    aggregate: PropMapBindingAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<PropMapBindingAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: HookWhere

    aggregate: HookAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<HookAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ComponentWhere

    aggregate: ComponentAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ComponentAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ActionAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  body?: StringAggregateInputNonNullable
}

export declare class ActionModel {
  public find(args?: {
    where?: ActionWhere

    options?: ActionOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Action[]>
  public create(args: {
    input: ActionCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateActionsMutationResponse>
  public update(args: {
    where?: ActionWhere
    update?: ActionUpdateInput
    connect?: ActionConnectInput
    disconnect?: ActionDisconnectInput
    create?: ActionCreateInput
    connectOrCreate?: ActionConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateActionsMutationResponse>
  public delete(args: {
    where?: ActionWhere
    delete?: ActionDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ActionWhere

    aggregate: ActionAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ActionAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface StoreAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  localState?: StringAggregateInputNonNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: StoreWhere

    aggregate: StoreAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<StoreAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: DeleteInfoWhere

    aggregate: DeleteInfoAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<DeleteInfoAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ResourceAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  config?: StringAggregateInputNonNullable
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
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: ResourceWhere

    aggregate: ResourceAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<ResourceAggregateSelection>
}

export interface StringAggregateInputNonNullable {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInputNonNullable {
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
export interface IntAggregateInputNullable {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface OperationAggregateSelectionInput {
  count?: boolean
  id?: IdAggregateInputNonNullable
  name?: StringAggregateInputNonNullable
  config?: StringAggregateInputNonNullable
}

export declare class OperationModel {
  public find(args?: {
    where?: OperationWhere

    options?: OperationOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Operation[]>
  public create(args: {
    input: OperationCreateInput[]
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateOperationsMutationResponse>
  public update(args: {
    where?: OperationWhere
    update?: OperationUpdateInput
    connect?: OperationConnectInput
    disconnect?: OperationDisconnectInput
    create?: OperationCreateInput
    connectOrCreate?: OperationConnectOrCreateInput
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateOperationsMutationResponse>
  public delete(args: {
    where?: OperationWhere
    delete?: OperationDeleteInput
    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
  public aggregate(args: {
    where?: OperationWhere

    aggregate: OperationAggregateSelectionInput
    context?: any
    rootValue?: any
  }): Promise<OperationAggregateSelection>
}

export interface ModelMap {
  ResetDatabaseMutationResponse: ResetDatabaseMutationResponseModel
  Edge: EdgeModel
  User: UserModel
  App: AppModel
  Atom: AtomModel
  CreateInfo: CreateInfoModel
  Page: PageModel
  TypeReference: TypeReferenceModel
  InterfaceTypeEdge: InterfaceTypeEdgeModel
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
  MonacoType: MonacoTypeModel
  DeleteFieldResponse: DeleteFieldResponseModel
  Tag: TagModel
  TagGraphOptions: TagGraphOptionsModel
  TagGraph: TagGraphModel
  ElementEdge: ElementEdgeModel
  ElementGraph: ElementGraphModel
  Element: ElementModel
  DeleteElementsInfo: DeleteElementsInfoModel
  Prop: PropModel
  PropMapBinding: PropMapBindingModel
  Hook: HookModel
  Component: ComponentModel
  Action: ActionModel
  Store: StoreModel
  DeleteInfo: DeleteInfoModel
  Resource: ResourceModel
  Operation: OperationModel
}
