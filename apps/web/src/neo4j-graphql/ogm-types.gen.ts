import { DocumentNode, SelectionSetNode } from 'graphql'

export type Maybe<T> = T | null
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
  /** A date and time, represented as an ISO-8601 string */
  DateTime: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
}

export type Query = {
  __typename?: 'Query'
  edges: Array<Edge>
  edgesCount: Scalars['Int']
  edgesAggregate: EdgeAggregateSelection
  users: Array<User>
  usersCount: Scalars['Int']
  usersAggregate: UserAggregateSelection
  apps: Array<App>
  appsCount: Scalars['Int']
  appsAggregate: AppAggregateSelection
  atoms: Array<Atom>
  atomsCount: Scalars['Int']
  atomsAggregate: AtomAggregateSelection
  createInfos: Array<CreateInfo>
  createInfosCount: Scalars['Int']
  createInfosAggregate: CreateInfoAggregateSelection
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
  importAtomsMutationResponsesCount: Scalars['Int']
  importAtomsMutationResponsesAggregate: ImportAtomsMutationResponseAggregateSelection
  pages: Array<Page>
  pagesCount: Scalars['Int']
  pagesAggregate: PageAggregateSelection
  deleteFieldResponses: Array<DeleteFieldResponse>
  deleteFieldResponsesCount: Scalars['Int']
  deleteFieldResponsesAggregate: DeleteFieldResponseAggregateSelection
  typeReferences: Array<TypeReference>
  typeReferencesCount: Scalars['Int']
  typeReferencesAggregate: TypeReferenceAggregateSelection
  interfaceTypeEdges: Array<InterfaceTypeEdge>
  interfaceTypeEdgesCount: Scalars['Int']
  interfaceTypeEdgesAggregate: InterfaceTypeEdgeAggregateSelection
  typeGraphs: Array<TypeGraph>
  typeGraphsCount: Scalars['Int']
  typeGraphsAggregate: TypeGraphAggregateSelection
  primitiveTypes: Array<PrimitiveType>
  primitiveTypesCount: Scalars['Int']
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection
  arrayTypes: Array<ArrayType>
  arrayTypesCount: Scalars['Int']
  arrayTypesAggregate: ArrayTypeAggregateSelection
  unionTypes: Array<UnionType>
  unionTypesCount: Scalars['Int']
  unionTypesAggregate: UnionTypeAggregateSelection
  interfaceTypes: Array<InterfaceType>
  interfaceTypesCount: Scalars['Int']
  interfaceTypesAggregate: InterfaceTypeAggregateSelection
  elementTypes: Array<ElementType>
  elementTypesCount: Scalars['Int']
  elementTypesAggregate: ElementTypeAggregateSelection
  renderPropsTypes: Array<RenderPropsType>
  renderPropsTypesCount: Scalars['Int']
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection
  reactNodeTypes: Array<ReactNodeType>
  reactNodeTypesCount: Scalars['Int']
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection
  enumTypes: Array<EnumType>
  enumTypesCount: Scalars['Int']
  enumTypesAggregate: EnumTypeAggregateSelection
  enumTypeValues: Array<EnumTypeValue>
  enumTypeValuesCount: Scalars['Int']
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection
  lambdaTypes: Array<LambdaType>
  lambdaTypesCount: Scalars['Int']
  lambdaTypesAggregate: LambdaTypeAggregateSelection
  pageTypes: Array<PageType>
  pageTypesCount: Scalars['Int']
  pageTypesAggregate: PageTypeAggregateSelection
  appTypes: Array<AppType>
  appTypesCount: Scalars['Int']
  appTypesAggregate: AppTypeAggregateSelection
  monacoTypes: Array<MonacoType>
  monacoTypesCount: Scalars['Int']
  monacoTypesAggregate: MonacoTypeAggregateSelection
  tags: Array<Tag>
  tagsCount: Scalars['Int']
  tagsAggregate: TagAggregateSelection
  tagEdges: Array<TagEdge>
  tagEdgesCount: Scalars['Int']
  tagEdgesAggregate: TagEdgeAggregateSelection
  tagGraphs?: Maybe<TagGraph>
  tagGraphsCount: Scalars['Int']
  tagGraphsAggregate: TagGraphAggregateSelection
  elements: Array<Element>
  elementsCount: Scalars['Int']
  elementsAggregate: ElementAggregateSelection
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']>
  getField: InterfaceTypeEdge
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>
}

export type QueryEdgesArgs = {
  where?: Maybe<EdgeWhere>
  options?: Maybe<EdgeOptions>
}

export type QueryEdgesCountArgs = {
  where?: Maybe<EdgeWhere>
}

export type QueryEdgesAggregateArgs = {
  where?: Maybe<EdgeWhere>
}

export type QueryUsersArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type QueryUsersCountArgs = {
  where?: Maybe<UserWhere>
}

export type QueryUsersAggregateArgs = {
  where?: Maybe<UserWhere>
}

export type QueryAppsArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type QueryAppsCountArgs = {
  where?: Maybe<AppWhere>
}

export type QueryAppsAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type QueryAtomsArgs = {
  where?: Maybe<AtomWhere>
  options?: Maybe<AtomOptions>
}

export type QueryAtomsCountArgs = {
  where?: Maybe<AtomWhere>
}

export type QueryAtomsAggregateArgs = {
  where?: Maybe<AtomWhere>
}

export type QueryCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
  options?: Maybe<CreateInfoOptions>
}

export type QueryCreateInfosCountArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type QueryCreateInfosAggregateArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type QueryImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
  options?: Maybe<ImportAtomsMutationResponseOptions>
}

export type QueryImportAtomsMutationResponsesCountArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type QueryImportAtomsMutationResponsesAggregateArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type QueryPagesArgs = {
  where?: Maybe<PageWhere>
  options?: Maybe<PageOptions>
}

export type QueryPagesCountArgs = {
  where?: Maybe<PageWhere>
}

export type QueryPagesAggregateArgs = {
  where?: Maybe<PageWhere>
}

export type QueryDeleteFieldResponsesArgs = {
  where?: Maybe<DeleteFieldResponseWhere>
  options?: Maybe<DeleteFieldResponseOptions>
}

export type QueryDeleteFieldResponsesCountArgs = {
  where?: Maybe<DeleteFieldResponseWhere>
}

export type QueryDeleteFieldResponsesAggregateArgs = {
  where?: Maybe<DeleteFieldResponseWhere>
}

export type QueryTypeReferencesArgs = {
  where?: Maybe<TypeReferenceWhere>
  options?: Maybe<TypeReferenceOptions>
}

export type QueryTypeReferencesCountArgs = {
  where?: Maybe<TypeReferenceWhere>
}

export type QueryTypeReferencesAggregateArgs = {
  where?: Maybe<TypeReferenceWhere>
}

export type QueryInterfaceTypeEdgesArgs = {
  where?: Maybe<InterfaceTypeEdgeWhere>
  options?: Maybe<InterfaceTypeEdgeOptions>
}

export type QueryInterfaceTypeEdgesCountArgs = {
  where?: Maybe<InterfaceTypeEdgeWhere>
}

export type QueryInterfaceTypeEdgesAggregateArgs = {
  where?: Maybe<InterfaceTypeEdgeWhere>
}

export type QueryTypeGraphsArgs = {
  where?: Maybe<TypeGraphWhere>
  options?: Maybe<TypeGraphOptions>
}

export type QueryTypeGraphsCountArgs = {
  where?: Maybe<TypeGraphWhere>
}

export type QueryTypeGraphsAggregateArgs = {
  where?: Maybe<TypeGraphWhere>
}

export type QueryPrimitiveTypesArgs = {
  where?: Maybe<PrimitiveTypeWhere>
  options?: Maybe<PrimitiveTypeOptions>
}

export type QueryPrimitiveTypesCountArgs = {
  where?: Maybe<PrimitiveTypeWhere>
}

export type QueryPrimitiveTypesAggregateArgs = {
  where?: Maybe<PrimitiveTypeWhere>
}

export type QueryArrayTypesArgs = {
  where?: Maybe<ArrayTypeWhere>
  options?: Maybe<ArrayTypeOptions>
}

export type QueryArrayTypesCountArgs = {
  where?: Maybe<ArrayTypeWhere>
}

export type QueryArrayTypesAggregateArgs = {
  where?: Maybe<ArrayTypeWhere>
}

export type QueryUnionTypesArgs = {
  where?: Maybe<UnionTypeWhere>
  options?: Maybe<UnionTypeOptions>
}

export type QueryUnionTypesCountArgs = {
  where?: Maybe<UnionTypeWhere>
}

export type QueryUnionTypesAggregateArgs = {
  where?: Maybe<UnionTypeWhere>
}

export type QueryInterfaceTypesArgs = {
  where?: Maybe<InterfaceTypeWhere>
  options?: Maybe<InterfaceTypeOptions>
}

export type QueryInterfaceTypesCountArgs = {
  where?: Maybe<InterfaceTypeWhere>
}

export type QueryInterfaceTypesAggregateArgs = {
  where?: Maybe<InterfaceTypeWhere>
}

export type QueryElementTypesArgs = {
  where?: Maybe<ElementTypeWhere>
  options?: Maybe<ElementTypeOptions>
}

export type QueryElementTypesCountArgs = {
  where?: Maybe<ElementTypeWhere>
}

export type QueryElementTypesAggregateArgs = {
  where?: Maybe<ElementTypeWhere>
}

export type QueryRenderPropsTypesArgs = {
  where?: Maybe<RenderPropsTypeWhere>
  options?: Maybe<RenderPropsTypeOptions>
}

export type QueryRenderPropsTypesCountArgs = {
  where?: Maybe<RenderPropsTypeWhere>
}

export type QueryRenderPropsTypesAggregateArgs = {
  where?: Maybe<RenderPropsTypeWhere>
}

export type QueryReactNodeTypesArgs = {
  where?: Maybe<ReactNodeTypeWhere>
  options?: Maybe<ReactNodeTypeOptions>
}

export type QueryReactNodeTypesCountArgs = {
  where?: Maybe<ReactNodeTypeWhere>
}

export type QueryReactNodeTypesAggregateArgs = {
  where?: Maybe<ReactNodeTypeWhere>
}

export type QueryEnumTypesArgs = {
  where?: Maybe<EnumTypeWhere>
  options?: Maybe<EnumTypeOptions>
}

export type QueryEnumTypesCountArgs = {
  where?: Maybe<EnumTypeWhere>
}

export type QueryEnumTypesAggregateArgs = {
  where?: Maybe<EnumTypeWhere>
}

export type QueryEnumTypeValuesArgs = {
  where?: Maybe<EnumTypeValueWhere>
  options?: Maybe<EnumTypeValueOptions>
}

export type QueryEnumTypeValuesCountArgs = {
  where?: Maybe<EnumTypeValueWhere>
}

export type QueryEnumTypeValuesAggregateArgs = {
  where?: Maybe<EnumTypeValueWhere>
}

export type QueryLambdaTypesArgs = {
  where?: Maybe<LambdaTypeWhere>
  options?: Maybe<LambdaTypeOptions>
}

export type QueryLambdaTypesCountArgs = {
  where?: Maybe<LambdaTypeWhere>
}

export type QueryLambdaTypesAggregateArgs = {
  where?: Maybe<LambdaTypeWhere>
}

export type QueryPageTypesArgs = {
  where?: Maybe<PageTypeWhere>
  options?: Maybe<PageTypeOptions>
}

export type QueryPageTypesCountArgs = {
  where?: Maybe<PageTypeWhere>
}

export type QueryPageTypesAggregateArgs = {
  where?: Maybe<PageTypeWhere>
}

export type QueryAppTypesArgs = {
  where?: Maybe<AppTypeWhere>
  options?: Maybe<AppTypeOptions>
}

export type QueryAppTypesCountArgs = {
  where?: Maybe<AppTypeWhere>
}

export type QueryAppTypesAggregateArgs = {
  where?: Maybe<AppTypeWhere>
}

export type QueryMonacoTypesArgs = {
  where?: Maybe<MonacoTypeWhere>
  options?: Maybe<MonacoTypeOptions>
}

export type QueryMonacoTypesCountArgs = {
  where?: Maybe<MonacoTypeWhere>
}

export type QueryMonacoTypesAggregateArgs = {
  where?: Maybe<MonacoTypeWhere>
}

export type QueryTagsArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type QueryTagsCountArgs = {
  where?: Maybe<TagWhere>
}

export type QueryTagsAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type QueryTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
  options?: Maybe<TagEdgeOptions>
}

export type QueryTagEdgesCountArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type QueryTagEdgesAggregateArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type QueryTagGraphsCountArgs = {
  where?: Maybe<TagGraphWhere>
}

export type QueryTagGraphsAggregateArgs = {
  where?: Maybe<TagGraphWhere>
}

export type QueryElementsArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type QueryElementsCountArgs = {
  where?: Maybe<ElementWhere>
}

export type QueryElementsAggregateArgs = {
  where?: Maybe<ElementWhere>
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
  importAtoms?: Maybe<ImportAtomsMutationResponse>
  upsertFieldEdge: InterfaceTypeEdge
  deleteFieldEdge: DeleteFieldResponse
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
  createImportAtomsMutationResponses: CreateImportAtomsMutationResponsesMutationResponse
  deleteImportAtomsMutationResponses: DeleteInfo
  updateImportAtomsMutationResponses: UpdateImportAtomsMutationResponsesMutationResponse
  createPages: CreatePagesMutationResponse
  deletePages: DeleteInfo
  updatePages: UpdatePagesMutationResponse
  createDeleteFieldResponses: CreateDeleteFieldResponsesMutationResponse
  deleteDeleteFieldResponses: DeleteInfo
  updateDeleteFieldResponses: UpdateDeleteFieldResponsesMutationResponse
  createTypeReferences: CreateTypeReferencesMutationResponse
  deleteTypeReferences: DeleteInfo
  updateTypeReferences: UpdateTypeReferencesMutationResponse
  createInterfaceTypeEdges: CreateInterfaceTypeEdgesMutationResponse
  deleteInterfaceTypeEdges: DeleteInfo
  updateInterfaceTypeEdges: UpdateInterfaceTypeEdgesMutationResponse
  createTypeGraphs: CreateTypeGraphsMutationResponse
  deleteTypeGraphs: DeleteInfo
  updateTypeGraphs: UpdateTypeGraphsMutationResponse
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
  createTags: CreateTagsMutationResponse
  deleteTags: DeleteInfo
  updateTags: UpdateTagsMutationResponse
  createTagEdges: CreateTagEdgesMutationResponse
  deleteTagEdges: DeleteInfo
  updateTagEdges: UpdateTagEdgesMutationResponse
  createTagGraphs: CreateTagGraphsMutationResponse
  deleteTagGraphs: DeleteInfo
  updateTagGraphs: UpdateTagGraphsMutationResponse
  createElements: CreateElementsMutationResponse
  deleteElements: DeleteInfo
  updateElements: UpdateElementsMutationResponse
}

export type MutationImportAtomsArgs = {
  input: ImportAtomsInput
}

export type MutationUpsertFieldEdgeArgs = {
  input: UpsertFieldInput
  isCreating: Scalars['Boolean']
}

export type MutationDeleteFieldEdgeArgs = {
  input: DeleteFieldInput
}

export type MutationCreateEdgesArgs = {
  input: Array<EdgeCreateInput>
}

export type MutationDeleteEdgesArgs = {
  where?: Maybe<EdgeWhere>
}

export type MutationUpdateEdgesArgs = {
  where?: Maybe<EdgeWhere>
  update?: Maybe<EdgeUpdateInput>
}

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>
}

export type MutationDeleteUsersArgs = {
  where?: Maybe<UserWhere>
  delete?: Maybe<UserDeleteInput>
}

export type MutationUpdateUsersArgs = {
  where?: Maybe<UserWhere>
  update?: Maybe<UserUpdateInput>
  connect?: Maybe<UserConnectInput>
  disconnect?: Maybe<UserDisconnectInput>
  create?: Maybe<UserRelationInput>
  delete?: Maybe<UserDeleteInput>
  connectOrCreate?: Maybe<UserConnectOrCreateInput>
}

export type MutationCreateAppsArgs = {
  input: Array<AppCreateInput>
}

export type MutationDeleteAppsArgs = {
  where?: Maybe<AppWhere>
  delete?: Maybe<AppDeleteInput>
}

export type MutationUpdateAppsArgs = {
  where?: Maybe<AppWhere>
  update?: Maybe<AppUpdateInput>
  connect?: Maybe<AppConnectInput>
  disconnect?: Maybe<AppDisconnectInput>
  create?: Maybe<AppRelationInput>
  delete?: Maybe<AppDeleteInput>
  connectOrCreate?: Maybe<AppConnectOrCreateInput>
}

export type MutationCreateAtomsArgs = {
  input: Array<AtomCreateInput>
}

export type MutationDeleteAtomsArgs = {
  where?: Maybe<AtomWhere>
  delete?: Maybe<AtomDeleteInput>
}

export type MutationUpdateAtomsArgs = {
  where?: Maybe<AtomWhere>
  update?: Maybe<AtomUpdateInput>
  connect?: Maybe<AtomConnectInput>
  disconnect?: Maybe<AtomDisconnectInput>
  create?: Maybe<AtomRelationInput>
  delete?: Maybe<AtomDeleteInput>
  connectOrCreate?: Maybe<AtomConnectOrCreateInput>
}

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>
}

export type MutationDeleteCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
}

export type MutationUpdateCreateInfosArgs = {
  where?: Maybe<CreateInfoWhere>
  update?: Maybe<CreateInfoUpdateInput>
}

export type MutationCreateImportAtomsMutationResponsesArgs = {
  input: Array<ImportAtomsMutationResponseCreateInput>
}

export type MutationDeleteImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
}

export type MutationUpdateImportAtomsMutationResponsesArgs = {
  where?: Maybe<ImportAtomsMutationResponseWhere>
  update?: Maybe<ImportAtomsMutationResponseUpdateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
}

export type MutationDeletePagesArgs = {
  where?: Maybe<PageWhere>
  delete?: Maybe<PageDeleteInput>
}

export type MutationUpdatePagesArgs = {
  where?: Maybe<PageWhere>
  update?: Maybe<PageUpdateInput>
  connect?: Maybe<PageConnectInput>
  disconnect?: Maybe<PageDisconnectInput>
  create?: Maybe<PageRelationInput>
  delete?: Maybe<PageDeleteInput>
  connectOrCreate?: Maybe<PageConnectOrCreateInput>
}

export type MutationCreateDeleteFieldResponsesArgs = {
  input: Array<DeleteFieldResponseCreateInput>
}

export type MutationDeleteDeleteFieldResponsesArgs = {
  where?: Maybe<DeleteFieldResponseWhere>
}

export type MutationUpdateDeleteFieldResponsesArgs = {
  where?: Maybe<DeleteFieldResponseWhere>
  update?: Maybe<DeleteFieldResponseUpdateInput>
}

export type MutationCreateTypeReferencesArgs = {
  input: Array<TypeReferenceCreateInput>
}

export type MutationDeleteTypeReferencesArgs = {
  where?: Maybe<TypeReferenceWhere>
}

export type MutationUpdateTypeReferencesArgs = {
  where?: Maybe<TypeReferenceWhere>
  update?: Maybe<TypeReferenceUpdateInput>
}

export type MutationCreateInterfaceTypeEdgesArgs = {
  input: Array<InterfaceTypeEdgeCreateInput>
}

export type MutationDeleteInterfaceTypeEdgesArgs = {
  where?: Maybe<InterfaceTypeEdgeWhere>
}

export type MutationUpdateInterfaceTypeEdgesArgs = {
  where?: Maybe<InterfaceTypeEdgeWhere>
  update?: Maybe<InterfaceTypeEdgeUpdateInput>
}

export type MutationCreateTypeGraphsArgs = {
  input: Array<TypeGraphCreateInput>
}

export type MutationDeleteTypeGraphsArgs = {
  where?: Maybe<TypeGraphWhere>
}

export type MutationUpdateTypeGraphsArgs = {
  where?: Maybe<TypeGraphWhere>
  update?: Maybe<TypeGraphUpdateInput>
}

export type MutationCreatePrimitiveTypesArgs = {
  input: Array<PrimitiveTypeCreateInput>
}

export type MutationDeletePrimitiveTypesArgs = {
  where?: Maybe<PrimitiveTypeWhere>
  delete?: Maybe<PrimitiveTypeDeleteInput>
}

export type MutationUpdatePrimitiveTypesArgs = {
  where?: Maybe<PrimitiveTypeWhere>
  update?: Maybe<PrimitiveTypeUpdateInput>
  connect?: Maybe<PrimitiveTypeConnectInput>
  disconnect?: Maybe<PrimitiveTypeDisconnectInput>
  create?: Maybe<PrimitiveTypeRelationInput>
  delete?: Maybe<PrimitiveTypeDeleteInput>
  connectOrCreate?: Maybe<PrimitiveTypeConnectOrCreateInput>
}

export type MutationCreateArrayTypesArgs = {
  input: Array<ArrayTypeCreateInput>
}

export type MutationDeleteArrayTypesArgs = {
  where?: Maybe<ArrayTypeWhere>
  delete?: Maybe<ArrayTypeDeleteInput>
}

export type MutationUpdateArrayTypesArgs = {
  where?: Maybe<ArrayTypeWhere>
  update?: Maybe<ArrayTypeUpdateInput>
  connect?: Maybe<ArrayTypeConnectInput>
  disconnect?: Maybe<ArrayTypeDisconnectInput>
  create?: Maybe<ArrayTypeRelationInput>
  delete?: Maybe<ArrayTypeDeleteInput>
  connectOrCreate?: Maybe<ArrayTypeConnectOrCreateInput>
}

export type MutationCreateUnionTypesArgs = {
  input: Array<UnionTypeCreateInput>
}

export type MutationDeleteUnionTypesArgs = {
  where?: Maybe<UnionTypeWhere>
  delete?: Maybe<UnionTypeDeleteInput>
}

export type MutationUpdateUnionTypesArgs = {
  where?: Maybe<UnionTypeWhere>
  update?: Maybe<UnionTypeUpdateInput>
  connect?: Maybe<UnionTypeConnectInput>
  disconnect?: Maybe<UnionTypeDisconnectInput>
  create?: Maybe<UnionTypeRelationInput>
  delete?: Maybe<UnionTypeDeleteInput>
  connectOrCreate?: Maybe<UnionTypeConnectOrCreateInput>
}

export type MutationCreateInterfaceTypesArgs = {
  input: Array<InterfaceTypeCreateInput>
}

export type MutationDeleteInterfaceTypesArgs = {
  where?: Maybe<InterfaceTypeWhere>
  delete?: Maybe<InterfaceTypeDeleteInput>
}

export type MutationUpdateInterfaceTypesArgs = {
  where?: Maybe<InterfaceTypeWhere>
  update?: Maybe<InterfaceTypeUpdateInput>
  connect?: Maybe<InterfaceTypeConnectInput>
  disconnect?: Maybe<InterfaceTypeDisconnectInput>
  create?: Maybe<InterfaceTypeRelationInput>
  delete?: Maybe<InterfaceTypeDeleteInput>
  connectOrCreate?: Maybe<InterfaceTypeConnectOrCreateInput>
}

export type MutationCreateElementTypesArgs = {
  input: Array<ElementTypeCreateInput>
}

export type MutationDeleteElementTypesArgs = {
  where?: Maybe<ElementTypeWhere>
  delete?: Maybe<ElementTypeDeleteInput>
}

export type MutationUpdateElementTypesArgs = {
  where?: Maybe<ElementTypeWhere>
  update?: Maybe<ElementTypeUpdateInput>
  connect?: Maybe<ElementTypeConnectInput>
  disconnect?: Maybe<ElementTypeDisconnectInput>
  create?: Maybe<ElementTypeRelationInput>
  delete?: Maybe<ElementTypeDeleteInput>
  connectOrCreate?: Maybe<ElementTypeConnectOrCreateInput>
}

export type MutationCreateRenderPropsTypesArgs = {
  input: Array<RenderPropsTypeCreateInput>
}

export type MutationDeleteRenderPropsTypesArgs = {
  where?: Maybe<RenderPropsTypeWhere>
  delete?: Maybe<RenderPropsTypeDeleteInput>
}

export type MutationUpdateRenderPropsTypesArgs = {
  where?: Maybe<RenderPropsTypeWhere>
  update?: Maybe<RenderPropsTypeUpdateInput>
  connect?: Maybe<RenderPropsTypeConnectInput>
  disconnect?: Maybe<RenderPropsTypeDisconnectInput>
  create?: Maybe<RenderPropsTypeRelationInput>
  delete?: Maybe<RenderPropsTypeDeleteInput>
  connectOrCreate?: Maybe<RenderPropsTypeConnectOrCreateInput>
}

export type MutationCreateReactNodeTypesArgs = {
  input: Array<ReactNodeTypeCreateInput>
}

export type MutationDeleteReactNodeTypesArgs = {
  where?: Maybe<ReactNodeTypeWhere>
  delete?: Maybe<ReactNodeTypeDeleteInput>
}

export type MutationUpdateReactNodeTypesArgs = {
  where?: Maybe<ReactNodeTypeWhere>
  update?: Maybe<ReactNodeTypeUpdateInput>
  connect?: Maybe<ReactNodeTypeConnectInput>
  disconnect?: Maybe<ReactNodeTypeDisconnectInput>
  create?: Maybe<ReactNodeTypeRelationInput>
  delete?: Maybe<ReactNodeTypeDeleteInput>
  connectOrCreate?: Maybe<ReactNodeTypeConnectOrCreateInput>
}

export type MutationCreateEnumTypesArgs = {
  input: Array<EnumTypeCreateInput>
}

export type MutationDeleteEnumTypesArgs = {
  where?: Maybe<EnumTypeWhere>
  delete?: Maybe<EnumTypeDeleteInput>
}

export type MutationUpdateEnumTypesArgs = {
  where?: Maybe<EnumTypeWhere>
  update?: Maybe<EnumTypeUpdateInput>
  connect?: Maybe<EnumTypeConnectInput>
  disconnect?: Maybe<EnumTypeDisconnectInput>
  create?: Maybe<EnumTypeRelationInput>
  delete?: Maybe<EnumTypeDeleteInput>
  connectOrCreate?: Maybe<EnumTypeConnectOrCreateInput>
}

export type MutationCreateEnumTypeValuesArgs = {
  input: Array<EnumTypeValueCreateInput>
}

export type MutationDeleteEnumTypeValuesArgs = {
  where?: Maybe<EnumTypeValueWhere>
  delete?: Maybe<EnumTypeValueDeleteInput>
}

export type MutationUpdateEnumTypeValuesArgs = {
  where?: Maybe<EnumTypeValueWhere>
  update?: Maybe<EnumTypeValueUpdateInput>
  connect?: Maybe<EnumTypeValueConnectInput>
  disconnect?: Maybe<EnumTypeValueDisconnectInput>
  create?: Maybe<EnumTypeValueRelationInput>
  delete?: Maybe<EnumTypeValueDeleteInput>
  connectOrCreate?: Maybe<EnumTypeValueConnectOrCreateInput>
}

export type MutationCreateLambdaTypesArgs = {
  input: Array<LambdaTypeCreateInput>
}

export type MutationDeleteLambdaTypesArgs = {
  where?: Maybe<LambdaTypeWhere>
  delete?: Maybe<LambdaTypeDeleteInput>
}

export type MutationUpdateLambdaTypesArgs = {
  where?: Maybe<LambdaTypeWhere>
  update?: Maybe<LambdaTypeUpdateInput>
  connect?: Maybe<LambdaTypeConnectInput>
  disconnect?: Maybe<LambdaTypeDisconnectInput>
  create?: Maybe<LambdaTypeRelationInput>
  delete?: Maybe<LambdaTypeDeleteInput>
  connectOrCreate?: Maybe<LambdaTypeConnectOrCreateInput>
}

export type MutationCreatePageTypesArgs = {
  input: Array<PageTypeCreateInput>
}

export type MutationDeletePageTypesArgs = {
  where?: Maybe<PageTypeWhere>
  delete?: Maybe<PageTypeDeleteInput>
}

export type MutationUpdatePageTypesArgs = {
  where?: Maybe<PageTypeWhere>
  update?: Maybe<PageTypeUpdateInput>
  connect?: Maybe<PageTypeConnectInput>
  disconnect?: Maybe<PageTypeDisconnectInput>
  create?: Maybe<PageTypeRelationInput>
  delete?: Maybe<PageTypeDeleteInput>
  connectOrCreate?: Maybe<PageTypeConnectOrCreateInput>
}

export type MutationCreateAppTypesArgs = {
  input: Array<AppTypeCreateInput>
}

export type MutationDeleteAppTypesArgs = {
  where?: Maybe<AppTypeWhere>
  delete?: Maybe<AppTypeDeleteInput>
}

export type MutationUpdateAppTypesArgs = {
  where?: Maybe<AppTypeWhere>
  update?: Maybe<AppTypeUpdateInput>
  connect?: Maybe<AppTypeConnectInput>
  disconnect?: Maybe<AppTypeDisconnectInput>
  create?: Maybe<AppTypeRelationInput>
  delete?: Maybe<AppTypeDeleteInput>
  connectOrCreate?: Maybe<AppTypeConnectOrCreateInput>
}

export type MutationCreateMonacoTypesArgs = {
  input: Array<MonacoTypeCreateInput>
}

export type MutationDeleteMonacoTypesArgs = {
  where?: Maybe<MonacoTypeWhere>
  delete?: Maybe<MonacoTypeDeleteInput>
}

export type MutationUpdateMonacoTypesArgs = {
  where?: Maybe<MonacoTypeWhere>
  update?: Maybe<MonacoTypeUpdateInput>
  connect?: Maybe<MonacoTypeConnectInput>
  disconnect?: Maybe<MonacoTypeDisconnectInput>
  create?: Maybe<MonacoTypeRelationInput>
  delete?: Maybe<MonacoTypeDeleteInput>
  connectOrCreate?: Maybe<MonacoTypeConnectOrCreateInput>
}

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>
}

export type MutationDeleteTagsArgs = {
  where?: Maybe<TagWhere>
  delete?: Maybe<TagDeleteInput>
}

export type MutationUpdateTagsArgs = {
  where?: Maybe<TagWhere>
  update?: Maybe<TagUpdateInput>
  connect?: Maybe<TagConnectInput>
  disconnect?: Maybe<TagDisconnectInput>
  create?: Maybe<TagRelationInput>
  delete?: Maybe<TagDeleteInput>
  connectOrCreate?: Maybe<TagConnectOrCreateInput>
}

export type MutationCreateTagEdgesArgs = {
  input: Array<TagEdgeCreateInput>
}

export type MutationDeleteTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
}

export type MutationUpdateTagEdgesArgs = {
  where?: Maybe<TagEdgeWhere>
  update?: Maybe<TagEdgeUpdateInput>
}

export type MutationCreateTagGraphsArgs = {
  input: Array<TagGraphCreateInput>
}

export type MutationDeleteTagGraphsArgs = {
  where?: Maybe<TagGraphWhere>
}

export type MutationUpdateTagGraphsArgs = {
  where?: Maybe<TagGraphWhere>
  update?: Maybe<TagGraphUpdateInput>
}

export type MutationCreateElementsArgs = {
  input: Array<ElementCreateInput>
}

export type MutationDeleteElementsArgs = {
  where?: Maybe<ElementWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type MutationUpdateElementsArgs = {
  where?: Maybe<ElementWhere>
  update?: Maybe<ElementUpdateInput>
  connect?: Maybe<ElementConnectInput>
  disconnect?: Maybe<ElementDisconnectInput>
  create?: Maybe<ElementRelationInput>
  delete?: Maybe<ElementDeleteInput>
  connectOrCreate?: Maybe<ElementConnectOrCreateInput>
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

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type AnyType =
  | ElementType
  | ArrayType
  | UnionType
  | EnumType
  | LambdaType
  | PageType
  | AppType
  | MonacoType
  | InterfaceType
  | PrimitiveType
  | RenderPropsType

export type TagVertex = Tag

/**
 * Connection between two types in a TypeGraph.
 * Can be:
 * Array -> ArrayItem (Edge)
 * Interface -> Field type - (InterfaceTypeEdge)
 * Union -> Union member (Edge)
 */
export type TypeEdge = Edge | InterfaceTypeEdge

export type Field = {
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type IEdge = {
  source: Scalars['String']
  target: Scalars['String']
}

export type IElementGraph = {
  root?: Maybe<Element>
  vertices?: Maybe<Array<Element>>
}

export type IGraph = {
  vertices: Array<TagVertex>
  edges: Array<TagEdge>
}

export type TypeBase = {
  owner?: Maybe<User>
  ownerConnection: TypeBaseOwnerConnection
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
}

export type TypeBaseOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type TypeBaseOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  name: Scalars['String']
  owner?: Maybe<Array<Maybe<User>>>
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  pages?: Maybe<Array<Maybe<Page>>>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  ownerConnection: AppOwnerConnection
  pagesConnection: AppPagesConnection
}

export type AppOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type AppOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

export type AppPagesArgs = {
  where?: Maybe<PageWhere>
  options?: Maybe<PageOptions>
}

export type AppPagesAggregateArgs = {
  where?: Maybe<PageWhere>
}

export type AppOwnerConnectionArgs = {
  where?: Maybe<AppOwnerConnectionWhere>
  sort?: Maybe<Array<AppOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AppPagesConnectionArgs = {
  where?: Maybe<AppPagesConnectionWhere>
  sort?: Maybe<Array<AppPagesConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AppAggregateSelection = {
  __typename?: 'AppAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
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

/** Allows picking a app from the list of apps */
export type AppType = TypeBase & {
  __typename?: 'AppType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<AppTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Allows picking a app from the list of apps */
export type AppTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AppTypeAggregateSelection = {
  __typename?: 'AppTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type AppTypeUserOwnerAggregationSelection = {
  __typename?: 'AppTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>
}

export type AppTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'AppTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

export type AppUserOwnerAggregationSelection = {
  __typename?: 'AppUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  __typename?: 'AppUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = TypeBase & {
  __typename?: 'ArrayType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<ArrayTypeUserOwnerAggregationSelection>
  itemType?: Maybe<Array<TypeBase>>
  ownerConnection: TypeBaseOwnerConnection
  itemTypeConnection: ArrayTypeItemTypeConnection
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeArgs = {
  options?: Maybe<QueryOptions>
  where?: Maybe<TypeBaseWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayTypeItemTypeConnectionArgs = {
  where?: Maybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeAggregateSelection = {
  __typename?: 'ArrayTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

export type Atom = {
  __typename?: 'Atom'
  id: Scalars['ID']
  name: Scalars['String']
  type: AtomType
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  apiConnection: AtomApiConnection
}

export type AtomApiArgs = {
  where?: Maybe<InterfaceTypeWhere>
  options?: Maybe<InterfaceTypeOptions>
}

export type AtomApiAggregateArgs = {
  where?: Maybe<InterfaceTypeWhere>
}

export type AtomApiConnectionArgs = {
  where?: Maybe<AtomApiConnectionWhere>
  sort?: Maybe<Array<AtomApiConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type AtomAggregateSelection = {
  __typename?: 'AtomAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
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

export type CreateCreateInfosMutationResponse = {
  __typename?: 'CreateCreateInfosMutationResponse'
  info: CreateInfo
  createInfos: Array<CreateInfo>
}

export type CreateDeleteFieldResponsesMutationResponse = {
  __typename?: 'CreateDeleteFieldResponsesMutationResponse'
  info: CreateInfo
  deleteFieldResponses: Array<DeleteFieldResponse>
}

export type CreateEdgesMutationResponse = {
  __typename?: 'CreateEdgesMutationResponse'
  info: CreateInfo
  edges: Array<Edge>
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

export type CreateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'CreateImportAtomsMutationResponsesMutationResponse'
  info: CreateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
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
  bookmark: StringAggregateSelection
  nodesCreated: IntAggregateSelection
  relationshipsCreated: IntAggregateSelection
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

export type CreateTagEdgesMutationResponse = {
  __typename?: 'CreateTagEdgesMutationResponse'
  info: CreateInfo
  tagEdges: Array<TagEdge>
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

export type CreateTypeGraphsMutationResponse = {
  __typename?: 'CreateTypeGraphsMutationResponse'
  info: CreateInfo
  typeGraphs: Array<TypeGraph>
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

export type DateTimeAggregateSelection = {
  __typename?: 'DateTimeAggregateSelection'
  min?: Maybe<Scalars['DateTime']>
  max?: Maybe<Scalars['DateTime']>
}

export type DeleteFieldResponse = {
  __typename?: 'DeleteFieldResponse'
  deletedEdgesCount: Scalars['Int']
}

export type DeleteFieldResponseAggregateSelection = {
  __typename?: 'DeleteFieldResponseAggregateSelection'
  count: Scalars['Int']
  deletedEdgesCount: IntAggregateSelection
}

export type DeleteInfo = {
  __typename?: 'DeleteInfo'
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
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
  source: StringAggregateSelection
  target: StringAggregateSelection
}

export type Element = {
  __typename?: 'Element'
  id: Scalars['ID']
  name: Scalars['String']
  ownerId: Scalars['String']
  graph: IElementGraph
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
  parent?: Maybe<Element>
  parentAggregate?: Maybe<ElementElementParentAggregationSelection>
  children?: Maybe<Array<Element>>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  parentConnection: ElementParentConnection
  childrenConnection: ElementChildrenConnection
}

export type ElementParentArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementParentAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementChildrenArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementChildrenAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementParentConnectionArgs = {
  where?: Maybe<ElementParentConnectionWhere>
  sort?: Maybe<Array<ElementParentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementChildrenConnectionArgs = {
  where?: Maybe<ElementChildrenConnectionWhere>
  sort?: Maybe<Array<ElementChildrenConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementChildrenConnection = {
  __typename?: 'ElementChildrenConnection'
  edges: Array<ElementChildrenRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type ElementChildrenRelationship = {
  __typename?: 'ElementChildrenRelationship'
  cursor: Scalars['String']
  node: Element
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
}

export type ElementElementParentAggregationSelection = {
  __typename?: 'ElementElementParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentNodeAggregateSelection>
}

export type ElementElementParentNodeAggregateSelection = {
  __typename?: 'ElementElementParentNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
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
  graph: TypeGraph
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind
  owner?: Maybe<User>
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
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
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
  where?: Maybe<UserWhere>
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
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementTypeAggregateSelection = {
  __typename?: 'ElementTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type ElementTypeUserOwnerAggregationSelection = {
  __typename?: 'ElementTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>
}

export type ElementTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ElementTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<EnumTypeUserOwnerAggregationSelection>
  allowedValues?: Maybe<Array<EnumTypeValue>>
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
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesArgs = {
  where?: Maybe<EnumTypeValueWhere>
  options?: Maybe<EnumTypeValueOptions>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesAggregateArgs = {
  where?: Maybe<EnumTypeValueWhere>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumTypeAllowedValuesConnectionArgs = {
  where?: Maybe<EnumTypeAllowedValuesConnectionWhere>
  sort?: Maybe<Array<EnumTypeAllowedValuesConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type EnumTypeAggregateSelection = {
  __typename?: 'EnumTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
  value: StringAggregateSelection
}

export type EnumTypeUserOwnerAggregationSelection = {
  __typename?: 'EnumTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>
}

export type EnumTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'EnumTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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
  where?: Maybe<EnumTypeWhere>
  options?: Maybe<EnumTypeOptions>
}

export type EnumTypeValueEnumTypeAggregateArgs = {
  where?: Maybe<EnumTypeWhere>
}

export type EnumTypeValueEnumTypeConnectionArgs = {
  where?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
  sort?: Maybe<Array<EnumTypeValueEnumTypeConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type EnumTypeValueAggregateSelection = {
  __typename?: 'EnumTypeValueAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
  value: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type EnumTypeValueEnumTypeRelationship = {
  __typename?: 'EnumTypeValueEnumTypeRelationship'
  cursor: Scalars['String']
  node: EnumType
}

export type IdAggregateSelection = {
  __typename?: 'IDAggregateSelection'
  shortest?: Maybe<Scalars['ID']>
  longest?: Maybe<Scalars['ID']>
}

export type ImportAtomsMutationResponse = {
  __typename?: 'ImportAtomsMutationResponse'
  atoms?: Maybe<Array<Atom>>
}

export type ImportAtomsMutationResponseAggregateSelection = {
  __typename?: 'ImportAtomsMutationResponseAggregateSelection'
  count: Scalars['Int']
}

export type IntAggregateSelection = {
  __typename?: 'IntAggregateSelection'
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
  average?: Maybe<Scalars['Float']>
  sum?: Maybe<Scalars['Int']>
}

/** Represents an object type with multiple fields */
export type InterfaceType = TypeBase & {
  __typename?: 'InterfaceType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<InterfaceTypeUserOwnerAggregationSelection>
  apiofAtoms?: Maybe<Array<Atom>>
  apiofAtomsAggregate?: Maybe<InterfaceTypeAtomApiofAtomsAggregationSelection>
  fields?: Maybe<Array<TypeBase>>
  ownerConnection: TypeBaseOwnerConnection
  apiofAtomsConnection: InterfaceTypeApiofAtomsConnection
  fieldsConnection: InterfaceTypeFieldsConnection
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiofAtomsArgs = {
  where?: Maybe<AtomWhere>
  options?: Maybe<AtomOptions>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiofAtomsAggregateArgs = {
  where?: Maybe<AtomWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsArgs = {
  options?: Maybe<QueryOptions>
  where?: Maybe<TypeBaseWhere>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiofAtomsConnectionArgs = {
  where?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  sort?: Maybe<Array<InterfaceTypeApiofAtomsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeFieldsConnectionArgs = {
  where?: Maybe<InterfaceTypeFieldsConnectionWhere>
  sort?: Maybe<Array<InterfaceTypeFieldsConnectionSort>>
}

export type InterfaceTypeAggregateSelection = {
  __typename?: 'InterfaceTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type InterfaceTypeApiofAtomsConnection = {
  __typename?: 'InterfaceTypeApiofAtomsConnection'
  edges: Array<InterfaceTypeApiofAtomsRelationship>
  totalCount: Scalars['Int']
  pageInfo: PageInfo
}

export type InterfaceTypeApiofAtomsRelationship = {
  __typename?: 'InterfaceTypeApiofAtomsRelationship'
  cursor: Scalars['String']
  node: Atom
}

export type InterfaceTypeAtomApiofAtomsAggregationSelection = {
  __typename?: 'InterfaceTypeAtomApiofAtomsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeAtomApiofAtomsNodeAggregateSelection>
}

export type InterfaceTypeAtomApiofAtomsNodeAggregateSelection = {
  __typename?: 'InterfaceTypeAtomApiofAtomsNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
}

/**
 * Connection between an Interface Type and its fields types.
 * The field data is stored as relationship properties and we retreive them along with the relation itself.
 */
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
  source: StringAggregateSelection
  target: StringAggregateSelection
  key: StringAggregateSelection
  name: StringAggregateSelection
  description: StringAggregateSelection
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
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

/** Allows picking a lambda */
export type LambdaType = TypeBase & {
  __typename?: 'LambdaType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<LambdaTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a lambda */
export type LambdaTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Allows picking a lambda */
export type LambdaTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type LambdaTypeAggregateSelection = {
  __typename?: 'LambdaTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type LambdaTypeUserOwnerAggregationSelection = {
  __typename?: 'LambdaTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>
}

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'LambdaTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

/** Allows editing the value using a monaco editor */
export type MonacoType = TypeBase & {
  __typename?: 'MonacoType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  language: MonacoLanguage
  owner?: Maybe<User>
  ownerAggregate?: Maybe<MonacoTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type MonacoTypeAggregateSelection = {
  __typename?: 'MonacoTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type MonacoTypeUserOwnerAggregationSelection = {
  __typename?: 'MonacoTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<MonacoTypeUserOwnerNodeAggregateSelection>
}

export type MonacoTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'MonacoTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['ID']
  name: Scalars['String']
  rootElement?: Maybe<Element>
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  app?: Maybe<App>
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  rootElementConnection: PageRootElementConnection
  appConnection: PageAppConnection
}

export type PageRootElementArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type PageRootElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type PageAppArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type PageAppAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type PageRootElementConnectionArgs = {
  where?: Maybe<PageRootElementConnectionWhere>
  sort?: Maybe<Array<PageRootElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PageAppConnectionArgs = {
  where?: Maybe<PageAppConnectionWhere>
  sort?: Maybe<Array<PageAppConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PageAggregateSelection = {
  __typename?: 'PageAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type PageAppAppAggregationSelection = {
  __typename?: 'PageAppAppAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageAppAppNodeAggregateSelection>
}

export type PageAppAppNodeAggregateSelection = {
  __typename?: 'PageAppAppNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
  ownerId: StringAggregateSelection
  createdAt: DateTimeAggregateSelection
  updatedAt: DateTimeAggregateSelection
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
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<PageTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Allows picking a page from the list of pages */
export type PageTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PageTypeAggregateSelection = {
  __typename?: 'PageTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type PageTypeUserOwnerAggregationSelection = {
  __typename?: 'PageTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>
}

export type PageTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PageTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = TypeBase & {
  __typename?: 'PrimitiveType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  primitiveKind: PrimitiveTypeKind
  owner?: Maybe<User>
  ownerAggregate?: Maybe<PrimitiveTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PrimitiveTypeAggregateSelection = {
  __typename?: 'PrimitiveTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type PrimitiveTypeUserOwnerAggregationSelection = {
  __typename?: 'PrimitiveTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>
}

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'PrimitiveTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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
  graph: TypeGraph
  owner?: Maybe<User>
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
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
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
  where?: Maybe<UserWhere>
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
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ReactNodeTypeAggregateSelection = {
  __typename?: 'ReactNodeTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type ReactNodeTypeUserOwnerAggregationSelection = {
  __typename?: 'ReactNodeTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>
}

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'ReactNodeTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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
  graph: TypeGraph
  owner?: Maybe<User>
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
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
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
  where?: Maybe<UserWhere>
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
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type RenderPropsTypeAggregateSelection = {
  __typename?: 'RenderPropsTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type RenderPropsTypeUserOwnerAggregationSelection = {
  __typename?: 'RenderPropsTypeUserOwnerAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<RenderPropsTypeUserOwnerNodeAggregateSelection>
}

export type RenderPropsTypeUserOwnerNodeAggregateSelection = {
  __typename?: 'RenderPropsTypeUserOwnerNodeAggregateSelection'
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection'
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
  children?: Maybe<Array<Maybe<Tag>>>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  parentConnection: TagParentConnection
  childrenConnection: TagChildrenConnection
}

export type TagParentArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type TagParentAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type TagChildrenArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type TagChildrenAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type TagParentConnectionArgs = {
  where?: Maybe<TagParentConnectionWhere>
  sort?: Maybe<Array<TagParentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type TagChildrenConnectionArgs = {
  where?: Maybe<TagChildrenConnectionWhere>
  sort?: Maybe<Array<TagChildrenConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type TagAggregateSelection = {
  __typename?: 'TagAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  source: Scalars['ID']
  target: Scalars['ID']
}

export type TagEdgeAggregateSelection = {
  __typename?: 'TagEdgeAggregateSelection'
  count: Scalars['Int']
  source: IdAggregateSelection
  target: IdAggregateSelection
}

export type TagGraph = IGraph & {
  __typename?: 'TagGraph'
  /** All descendant Elements or Components, at any level */
  vertices: Array<Tag>
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>
}

export type TagGraphAggregateSelection = {
  __typename?: 'TagGraphAggregateSelection'
  count: Scalars['Int']
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
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type TagTagParentAggregationSelection = {
  __typename?: 'TagTagParentAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<TagTagParentNodeAggregateSelection>
}

export type TagTagParentNodeAggregateSelection = {
  __typename?: 'TagTagParentNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
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

export type TypeGraph = {
  __typename?: 'TypeGraph'
  vertices: Array<AnyType>
  edges: Array<TypeEdge>
}

export type TypeGraphAggregateSelection = {
  __typename?: 'TypeGraphAggregateSelection'
  count: Scalars['Int']
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
  name: StringAggregateSelection
  label: StringAggregateSelection
}

/** Allows picking one of a set of types */
export type UnionType = TypeBase & {
  __typename?: 'UnionType'
  id: Scalars['ID']
  name: Scalars['String']
  graph: TypeGraph
  owner?: Maybe<User>
  ownerAggregate?: Maybe<UnionTypeUserOwnerAggregationSelection>
  typesOfUnionType?: Maybe<Array<TypeBase>>
  ownerConnection: TypeBaseOwnerConnection
  typesOfUnionTypeConnection: UnionTypeTypesOfUnionTypeConnection
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeArgs = {
  options?: Maybe<QueryOptions>
  where?: Maybe<TypeBaseWhere>
}

/** Allows picking one of a set of types */
export type UnionTypeOwnerConnectionArgs = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  sort?: Maybe<Array<TypeBaseOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

/** Allows picking one of a set of types */
export type UnionTypeTypesOfUnionTypeConnectionArgs = {
  where?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeAggregateSelection = {
  __typename?: 'UnionTypeAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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

export type UpdateCreateInfosMutationResponse = {
  __typename?: 'UpdateCreateInfosMutationResponse'
  info: UpdateInfo
  createInfos: Array<CreateInfo>
}

export type UpdateDeleteFieldResponsesMutationResponse = {
  __typename?: 'UpdateDeleteFieldResponsesMutationResponse'
  info: UpdateInfo
  deleteFieldResponses: Array<DeleteFieldResponse>
}

export type UpdateEdgesMutationResponse = {
  __typename?: 'UpdateEdgesMutationResponse'
  info: UpdateInfo
  edges: Array<Edge>
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

export type UpdateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'UpdateImportAtomsMutationResponsesMutationResponse'
  info: UpdateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
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

export type UpdateTagEdgesMutationResponse = {
  __typename?: 'UpdateTagEdgesMutationResponse'
  info: UpdateInfo
  tagEdges: Array<TagEdge>
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

export type UpdateTypeGraphsMutationResponse = {
  __typename?: 'UpdateTypeGraphsMutationResponse'
  info: UpdateInfo
  typeGraphs: Array<TypeGraph>
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
  apps?: Maybe<Array<Maybe<App>>>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  appsConnection: UserAppsConnection
}

export type UserAppsArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type UserAppsAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type UserAppsConnectionArgs = {
  where?: Maybe<UserAppsConnectionWhere>
  sort?: Maybe<Array<UserAppsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
}

export type UserAppAppsAggregationSelection = {
  __typename?: 'UserAppAppsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserAppAppsNodeAggregateSelection>
}

export type UserAppAppsNodeAggregateSelection = {
  __typename?: 'UserAppAppsNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
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

export type AppConnectInput = {
  owner?: Maybe<Array<AppOwnerConnectFieldInput>>
  pages?: Maybe<Array<AppPagesConnectFieldInput>>
}

export type AppConnectOrCreateInput = {
  owner?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
  pages?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppConnectOrCreateWhere = {
  node: AppUniqueWhere
}

export type AppConnectWhere = {
  node: AppWhere
}

export type AppCreateInput = {
  name: Scalars['String']
  owner?: Maybe<AppOwnerFieldInput>
  pages?: Maybe<AppPagesFieldInput>
}

export type AppDeleteInput = {
  owner?: Maybe<Array<AppOwnerDeleteFieldInput>>
  pages?: Maybe<Array<AppPagesDeleteFieldInput>>
}

export type AppDisconnectInput = {
  owner?: Maybe<Array<AppOwnerDisconnectFieldInput>>
  pages?: Maybe<Array<AppPagesDisconnectFieldInput>>
}

export type AppOptions = {
  /** Specify one or more AppSort objects to sort Apps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AppSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AppOwnerAggregateInput>>
  OR?: Maybe<Array<AppOwnerAggregateInput>>
  node?: Maybe<AppOwnerNodeAggregationWhereInput>
}

export type AppOwnerConnectFieldInput = {
  where?: Maybe<UserConnectWhere>
  connect?: Maybe<Array<UserConnectInput>>
}

export type AppOwnerConnectionSort = {
  node?: Maybe<UserSort>
}

export type AppOwnerConnectionWhere = {
  AND?: Maybe<Array<AppOwnerConnectionWhere>>
  OR?: Maybe<Array<AppOwnerConnectionWhere>>
  node?: Maybe<UserWhere>
  node_NOT?: Maybe<UserWhere>
}

export type AppOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: AppOwnerConnectOrCreateFieldInputOnCreate
}

export type AppOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserCreateInput
}

export type AppOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type AppOwnerDeleteFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  delete?: Maybe<UserDeleteInput>
}

export type AppOwnerDisconnectFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  disconnect?: Maybe<UserDisconnectInput>
}

export type AppOwnerFieldInput = {
  create?: Maybe<Array<AppOwnerCreateFieldInput>>
  connect?: Maybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
}

export type AppOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<AppOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<AppOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AppOwnerUpdateConnectionInput = {
  node?: Maybe<UserUpdateInput>
}

export type AppOwnerUpdateFieldInput = {
  where?: Maybe<AppOwnerConnectionWhere>
  update?: Maybe<AppOwnerUpdateConnectionInput>
  connect?: Maybe<Array<AppOwnerConnectFieldInput>>
  disconnect?: Maybe<Array<AppOwnerDisconnectFieldInput>>
  create?: Maybe<Array<AppOwnerCreateFieldInput>>
  delete?: Maybe<Array<AppOwnerDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<AppOwnerConnectOrCreateFieldInput>>
}

export type AppPagesAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AppPagesAggregateInput>>
  OR?: Maybe<Array<AppPagesAggregateInput>>
  node?: Maybe<AppPagesNodeAggregationWhereInput>
}

export type AppPagesConnectFieldInput = {
  where?: Maybe<PageConnectWhere>
  connect?: Maybe<Array<PageConnectInput>>
}

export type AppPagesConnectionSort = {
  node?: Maybe<PageSort>
}

export type AppPagesConnectionWhere = {
  AND?: Maybe<Array<AppPagesConnectionWhere>>
  OR?: Maybe<Array<AppPagesConnectionWhere>>
  node?: Maybe<PageWhere>
  node_NOT?: Maybe<PageWhere>
}

export type AppPagesConnectOrCreateFieldInput = {
  where: PageConnectOrCreateWhere
  onCreate: AppPagesConnectOrCreateFieldInputOnCreate
}

export type AppPagesConnectOrCreateFieldInputOnCreate = {
  node: PageCreateInput
}

export type AppPagesCreateFieldInput = {
  node: PageCreateInput
}

export type AppPagesDeleteFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  delete?: Maybe<PageDeleteInput>
}

export type AppPagesDisconnectFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  disconnect?: Maybe<PageDisconnectInput>
}

export type AppPagesFieldInput = {
  create?: Maybe<Array<AppPagesCreateFieldInput>>
  connect?: Maybe<Array<AppPagesConnectFieldInput>>
  connectOrCreate?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppPagesNodeAggregationWhereInput = {
  AND?: Maybe<Array<AppPagesNodeAggregationWhereInput>>
  OR?: Maybe<Array<AppPagesNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AppPagesUpdateConnectionInput = {
  node?: Maybe<PageUpdateInput>
}

export type AppPagesUpdateFieldInput = {
  where?: Maybe<AppPagesConnectionWhere>
  update?: Maybe<AppPagesUpdateConnectionInput>
  connect?: Maybe<Array<AppPagesConnectFieldInput>>
  disconnect?: Maybe<Array<AppPagesDisconnectFieldInput>>
  create?: Maybe<Array<AppPagesCreateFieldInput>>
  delete?: Maybe<Array<AppPagesDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<AppPagesConnectOrCreateFieldInput>>
}

export type AppRelationInput = {
  owner?: Maybe<Array<AppOwnerCreateFieldInput>>
  pages?: Maybe<Array<AppPagesCreateFieldInput>>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type AppTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type AppTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type AppTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type AppTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type AppTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type AppTypeOptions = {
  /** Specify one or more AppTypeSort objects to sort AppTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AppTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AppTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AppTypeOwnerAggregateInput>>
  OR?: Maybe<Array<AppTypeOwnerAggregateInput>>
  node?: Maybe<AppTypeOwnerNodeAggregationWhereInput>
}

export type AppTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<AppTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AppTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type AppTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type AppTypeWhere = {
  OR?: Maybe<Array<AppTypeWhere>>
  AND?: Maybe<Array<AppTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<AppTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type AppUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type AppUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<Array<AppOwnerUpdateFieldInput>>
  pages?: Maybe<Array<AppPagesUpdateFieldInput>>
}

export type AppWhere = {
  OR?: Maybe<Array<AppWhere>>
  AND?: Maybe<Array<AppWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<AppOwnerAggregateInput>
  pages?: Maybe<PageWhere>
  pages_NOT?: Maybe<PageWhere>
  pagesAggregate?: Maybe<AppPagesAggregateInput>
  ownerConnection?: Maybe<AppOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<AppOwnerConnectionWhere>
  pagesConnection?: Maybe<AppPagesConnectionWhere>
  pagesConnection_NOT?: Maybe<AppPagesConnectionWhere>
}

export type ArrayTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  itemType?: Maybe<Array<ArrayTypeItemTypeConnectFieldInput>>
}

export type ArrayTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ArrayTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
  itemType?: Maybe<ArrayTypeItemTypeFieldInput>
}

export type ArrayTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  itemType?: Maybe<Array<ArrayTypeItemTypeDeleteFieldInput>>
}

export type ArrayTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  itemType?: Maybe<Array<ArrayTypeItemTypeDisconnectFieldInput>>
}

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: Maybe<TypeBaseConnectInput>
  where?: Maybe<TypeBaseConnectWhere>
}

export type ArrayTypeItemTypeConnectionWhere = {
  AND?: Maybe<Array<ArrayTypeItemTypeConnectionWhere>>
  OR?: Maybe<Array<ArrayTypeItemTypeConnectionWhere>>
  node?: Maybe<TypeBaseWhere>
  node_NOT?: Maybe<TypeBaseWhere>
}

export type ArrayTypeItemTypeCreateFieldInput = {
  node: TypeBaseCreateInput
}

export type ArrayTypeItemTypeDeleteFieldInput = {
  delete?: Maybe<TypeBaseDeleteInput>
  where?: Maybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeItemTypeDisconnectFieldInput = {
  disconnect?: Maybe<TypeBaseDisconnectInput>
  where?: Maybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeItemTypeFieldInput = {
  create?: Maybe<Array<ArrayTypeItemTypeCreateFieldInput>>
  connect?: Maybe<Array<ArrayTypeItemTypeConnectFieldInput>>
}

export type ArrayTypeItemTypeUpdateConnectionInput = {
  node?: Maybe<TypeBaseUpdateInput>
}

export type ArrayTypeItemTypeUpdateFieldInput = {
  connect?: Maybe<Array<ArrayTypeItemTypeConnectFieldInput>>
  create?: Maybe<Array<ArrayTypeItemTypeCreateFieldInput>>
  delete?: Maybe<Array<ArrayTypeItemTypeDeleteFieldInput>>
  disconnect?: Maybe<Array<ArrayTypeItemTypeDisconnectFieldInput>>
  update?: Maybe<ArrayTypeItemTypeUpdateConnectionInput>
  where?: Maybe<ArrayTypeItemTypeConnectionWhere>
}

export type ArrayTypeOptions = {
  /** Specify one or more ArrayTypeSort objects to sort ArrayTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ArrayTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ArrayTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ArrayTypeOwnerAggregateInput>>
  OR?: Maybe<Array<ArrayTypeOwnerAggregateInput>>
  node?: Maybe<ArrayTypeOwnerNodeAggregationWhereInput>
}

export type ArrayTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<ArrayTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ArrayTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
  itemType?: Maybe<Array<ArrayTypeItemTypeCreateFieldInput>>
}

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type ArrayTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
  itemType?: Maybe<Array<ArrayTypeItemTypeUpdateFieldInput>>
}

export type ArrayTypeWhere = {
  OR?: Maybe<Array<ArrayTypeWhere>>
  AND?: Maybe<Array<ArrayTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<ArrayTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
  itemTypeConnection?: Maybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_NOT?: Maybe<ArrayTypeItemTypeConnectionWhere>
}

export type AtomApiAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AtomApiAggregateInput>>
  OR?: Maybe<Array<AtomApiAggregateInput>>
  node?: Maybe<AtomApiNodeAggregationWhereInput>
}

export type AtomApiConnectFieldInput = {
  where?: Maybe<InterfaceTypeConnectWhere>
  connect?: Maybe<InterfaceTypeConnectInput>
}

export type AtomApiConnectionSort = {
  node?: Maybe<InterfaceTypeSort>
}

export type AtomApiConnectionWhere = {
  AND?: Maybe<Array<AtomApiConnectionWhere>>
  OR?: Maybe<Array<AtomApiConnectionWhere>>
  node?: Maybe<InterfaceTypeWhere>
  node_NOT?: Maybe<InterfaceTypeWhere>
}

export type AtomApiConnectOrCreateFieldInput = {
  where: InterfaceTypeConnectOrCreateWhere
  onCreate: AtomApiConnectOrCreateFieldInputOnCreate
}

export type AtomApiConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeCreateInput
}

export type AtomApiCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type AtomApiDeleteFieldInput = {
  where?: Maybe<AtomApiConnectionWhere>
  delete?: Maybe<InterfaceTypeDeleteInput>
}

export type AtomApiDisconnectFieldInput = {
  where?: Maybe<AtomApiConnectionWhere>
  disconnect?: Maybe<InterfaceTypeDisconnectInput>
}

export type AtomApiFieldInput = {
  create?: Maybe<AtomApiCreateFieldInput>
  connect?: Maybe<AtomApiConnectFieldInput>
  connectOrCreate?: Maybe<AtomApiConnectOrCreateFieldInput>
}

export type AtomApiNodeAggregationWhereInput = {
  AND?: Maybe<Array<AtomApiNodeAggregationWhereInput>>
  OR?: Maybe<Array<AtomApiNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type AtomApiUpdateConnectionInput = {
  node?: Maybe<InterfaceTypeUpdateInput>
}

export type AtomApiUpdateFieldInput = {
  where?: Maybe<AtomApiConnectionWhere>
  update?: Maybe<AtomApiUpdateConnectionInput>
  connect?: Maybe<AtomApiConnectFieldInput>
  disconnect?: Maybe<AtomApiDisconnectFieldInput>
  create?: Maybe<AtomApiCreateFieldInput>
  delete?: Maybe<AtomApiDeleteFieldInput>
  connectOrCreate?: Maybe<AtomApiConnectOrCreateFieldInput>
}

export type AtomConnectInput = {
  api?: Maybe<AtomApiConnectFieldInput>
}

export type AtomConnectOrCreateInput = {
  api?: Maybe<AtomApiConnectOrCreateFieldInput>
}

export type AtomConnectOrCreateWhere = {
  node: AtomUniqueWhere
}

export type AtomConnectWhere = {
  node: AtomWhere
}

export type AtomCreateInput = {
  name: Scalars['String']
  type: AtomType
  api?: Maybe<AtomApiFieldInput>
}

export type AtomDeleteInput = {
  api?: Maybe<AtomApiDeleteFieldInput>
}

export type AtomDisconnectInput = {
  api?: Maybe<AtomApiDisconnectFieldInput>
}

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AtomSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AtomRelationInput = {
  api?: Maybe<AtomApiCreateFieldInput>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  type?: Maybe<SortDirection>
}

export type AtomUniqueWhere = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type AtomUpdateInput = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
  api?: Maybe<AtomApiUpdateFieldInput>
}

export type AtomWhere = {
  OR?: Maybe<Array<AtomWhere>>
  AND?: Maybe<Array<AtomWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
  type_NOT?: Maybe<AtomType>
  type_IN?: Maybe<Array<Maybe<AtomType>>>
  type_NOT_IN?: Maybe<Array<Maybe<AtomType>>>
  api?: Maybe<InterfaceTypeWhere>
  api_NOT?: Maybe<InterfaceTypeWhere>
  apiAggregate?: Maybe<AtomApiAggregateInput>
  apiConnection?: Maybe<AtomApiConnectionWhere>
  apiConnection_NOT?: Maybe<AtomApiConnectionWhere>
}

export type CreateInfoCreateInput = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoOptions = {
  /** Specify one or more CreateInfoSort objects to sort CreateInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<CreateInfoSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort CreateInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one CreateInfoSort object. */
export type CreateInfoSort = {
  bookmark?: Maybe<SortDirection>
  nodesCreated?: Maybe<SortDirection>
  relationshipsCreated?: Maybe<SortDirection>
}

export type CreateInfoUpdateInput = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated?: Maybe<Scalars['Int']>
  relationshipsCreated?: Maybe<Scalars['Int']>
}

export type CreateInfoWhere = {
  OR?: Maybe<Array<CreateInfoWhere>>
  AND?: Maybe<Array<CreateInfoWhere>>
  bookmark?: Maybe<Scalars['String']>
  bookmark_NOT?: Maybe<Scalars['String']>
  bookmark_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  bookmark_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  bookmark_CONTAINS?: Maybe<Scalars['String']>
  bookmark_NOT_CONTAINS?: Maybe<Scalars['String']>
  bookmark_STARTS_WITH?: Maybe<Scalars['String']>
  bookmark_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  bookmark_ENDS_WITH?: Maybe<Scalars['String']>
  bookmark_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  nodesCreated?: Maybe<Scalars['Int']>
  nodesCreated_NOT?: Maybe<Scalars['Int']>
  nodesCreated_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesCreated_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesCreated_LT?: Maybe<Scalars['Int']>
  nodesCreated_LTE?: Maybe<Scalars['Int']>
  nodesCreated_GT?: Maybe<Scalars['Int']>
  nodesCreated_GTE?: Maybe<Scalars['Int']>
  relationshipsCreated?: Maybe<Scalars['Int']>
  relationshipsCreated_NOT?: Maybe<Scalars['Int']>
  relationshipsCreated_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsCreated_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsCreated_LT?: Maybe<Scalars['Int']>
  relationshipsCreated_LTE?: Maybe<Scalars['Int']>
  relationshipsCreated_GT?: Maybe<Scalars['Int']>
  relationshipsCreated_GTE?: Maybe<Scalars['Int']>
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
  sort?: Maybe<Array<Maybe<DeleteFieldResponseSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort DeleteFieldResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteFieldResponseSort object. */
export type DeleteFieldResponseSort = {
  deletedEdgesCount?: Maybe<SortDirection>
}

export type DeleteFieldResponseUpdateInput = {
  deletedEdgesCount?: Maybe<Scalars['Int']>
}

export type DeleteFieldResponseWhere = {
  OR?: Maybe<Array<DeleteFieldResponseWhere>>
  AND?: Maybe<Array<DeleteFieldResponseWhere>>
  deletedEdgesCount?: Maybe<Scalars['Int']>
  deletedEdgesCount_NOT?: Maybe<Scalars['Int']>
  deletedEdgesCount_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  deletedEdgesCount_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  deletedEdgesCount_LT?: Maybe<Scalars['Int']>
  deletedEdgesCount_LTE?: Maybe<Scalars['Int']>
  deletedEdgesCount_GT?: Maybe<Scalars['Int']>
  deletedEdgesCount_GTE?: Maybe<Scalars['Int']>
}

export type EdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
}

export type EdgeOptions = {
  /** Specify one or more EdgeSort objects to sort Edges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<EdgeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort Edges by. The order in which sorts are applied is not guaranteed when specifying many fields in one EdgeSort object. */
export type EdgeSort = {
  source?: Maybe<SortDirection>
  target?: Maybe<SortDirection>
}

export type EdgeUpdateInput = {
  source?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type EdgeWhere = {
  OR?: Maybe<Array<EdgeWhere>>
  AND?: Maybe<Array<EdgeWhere>>
  source?: Maybe<Scalars['String']>
  source_NOT?: Maybe<Scalars['String']>
  source_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  source_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  source_CONTAINS?: Maybe<Scalars['String']>
  source_NOT_CONTAINS?: Maybe<Scalars['String']>
  source_STARTS_WITH?: Maybe<Scalars['String']>
  source_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  source_ENDS_WITH?: Maybe<Scalars['String']>
  source_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  target_NOT?: Maybe<Scalars['String']>
  target_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  target_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  target_CONTAINS?: Maybe<Scalars['String']>
  target_NOT_CONTAINS?: Maybe<Scalars['String']>
  target_STARTS_WITH?: Maybe<Scalars['String']>
  target_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  target_ENDS_WITH?: Maybe<Scalars['String']>
  target_NOT_ENDS_WITH?: Maybe<Scalars['String']>
}

export type ElementChildrenAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementChildrenAggregateInput>>
  OR?: Maybe<Array<ElementChildrenAggregateInput>>
  node?: Maybe<ElementChildrenNodeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<Array<ElementConnectInput>>
}

export type ElementChildrenConnectionSort = {
  node?: Maybe<ElementSort>
}

export type ElementChildrenConnectionWhere = {
  AND?: Maybe<Array<ElementChildrenConnectionWhere>>
  OR?: Maybe<Array<ElementChildrenConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementChildrenConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementChildrenDeleteFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementChildrenDisconnectFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementChildrenFieldInput = {
  create?: Maybe<Array<ElementChildrenCreateFieldInput>>
  connect?: Maybe<Array<ElementChildrenConnectFieldInput>>
  connectOrCreate?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementChildrenNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementChildrenNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementChildrenNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type ElementChildrenUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type ElementChildrenUpdateFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  update?: Maybe<ElementChildrenUpdateConnectionInput>
  connect?: Maybe<Array<ElementChildrenConnectFieldInput>>
  disconnect?: Maybe<Array<ElementChildrenDisconnectFieldInput>>
  create?: Maybe<Array<ElementChildrenCreateFieldInput>>
  delete?: Maybe<Array<ElementChildrenDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementConnectInput = {
  parent?: Maybe<ElementParentConnectFieldInput>
  children?: Maybe<Array<ElementChildrenConnectFieldInput>>
}

export type ElementConnectOrCreateInput = {
  parent?: Maybe<ElementParentConnectOrCreateFieldInput>
  children?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
}

export type ElementConnectOrCreateWhere = {
  node: ElementUniqueWhere
}

export type ElementConnectWhere = {
  node: ElementWhere
}

export type ElementCreateInput = {
  name: Scalars['String']
  ownerId: Scalars['String']
  parent?: Maybe<ElementParentFieldInput>
  children?: Maybe<ElementChildrenFieldInput>
}

export type ElementDeleteInput = {
  parent?: Maybe<ElementParentDeleteFieldInput>
  children?: Maybe<Array<ElementChildrenDeleteFieldInput>>
}

export type ElementDisconnectInput = {
  parent?: Maybe<ElementParentDisconnectFieldInput>
  children?: Maybe<Array<ElementChildrenDisconnectFieldInput>>
}

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementParentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementParentAggregateInput>>
  OR?: Maybe<Array<ElementParentAggregateInput>>
  node?: Maybe<ElementParentNodeAggregationWhereInput>
}

export type ElementParentConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type ElementParentConnectionSort = {
  node?: Maybe<ElementSort>
}

export type ElementParentConnectionWhere = {
  AND?: Maybe<Array<ElementParentConnectionWhere>>
  OR?: Maybe<Array<ElementParentConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementParentConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementParentConnectOrCreateFieldInputOnCreate
}

export type ElementParentConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ElementParentCreateFieldInput = {
  node: ElementCreateInput
}

export type ElementParentDeleteFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementParentDisconnectFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementParentFieldInput = {
  create?: Maybe<ElementParentCreateFieldInput>
  connect?: Maybe<ElementParentConnectFieldInput>
  connectOrCreate?: Maybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementParentNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementParentNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementParentNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type ElementParentUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type ElementParentUpdateFieldInput = {
  where?: Maybe<ElementParentConnectionWhere>
  update?: Maybe<ElementParentUpdateConnectionInput>
  connect?: Maybe<ElementParentConnectFieldInput>
  disconnect?: Maybe<ElementParentDisconnectFieldInput>
  create?: Maybe<ElementParentCreateFieldInput>
  delete?: Maybe<ElementParentDeleteFieldInput>
  connectOrCreate?: Maybe<ElementParentConnectOrCreateFieldInput>
}

export type ElementRelationInput = {
  parent?: Maybe<ElementParentCreateFieldInput>
  children?: Maybe<Array<ElementChildrenCreateFieldInput>>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  ownerId?: Maybe<SortDirection>
  createdAt?: Maybe<SortDirection>
  updatedAt?: Maybe<SortDirection>
}

export type ElementTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type ElementTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ElementTypeCreateInput = {
  name: Scalars['String']
  elementKind: ElementTypeKind
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type ElementTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type ElementTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ElementTypeOptions = {
  /** Specify one or more ElementTypeSort objects to sort ElementTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementTypeOwnerAggregateInput>>
  OR?: Maybe<Array<ElementTypeOwnerAggregateInput>>
  node?: Maybe<ElementTypeOwnerNodeAggregationWhereInput>
}

export type ElementTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ElementTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  elementKind?: Maybe<SortDirection>
}

export type ElementTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  elementKind?: Maybe<ElementTypeKind>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type ElementTypeWhere = {
  OR?: Maybe<Array<ElementTypeWhere>>
  AND?: Maybe<Array<ElementTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  elementKind?: Maybe<ElementTypeKind>
  elementKind_NOT?: Maybe<ElementTypeKind>
  elementKind_IN?: Maybe<Array<Maybe<ElementTypeKind>>>
  elementKind_NOT_IN?: Maybe<Array<Maybe<ElementTypeKind>>>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<ElementTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type ElementUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
  parent?: Maybe<ElementParentUpdateFieldInput>
  children?: Maybe<Array<ElementChildrenUpdateFieldInput>>
}

export type ElementWhere = {
  OR?: Maybe<Array<ElementWhere>>
  AND?: Maybe<Array<ElementWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
  ownerId_NOT?: Maybe<Scalars['String']>
  ownerId_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  ownerId_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  ownerId_CONTAINS?: Maybe<Scalars['String']>
  ownerId_NOT_CONTAINS?: Maybe<Scalars['String']>
  ownerId_STARTS_WITH?: Maybe<Scalars['String']>
  ownerId_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  ownerId_ENDS_WITH?: Maybe<Scalars['String']>
  ownerId_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_NOT?: Maybe<Scalars['DateTime']>
  createdAt_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  createdAt_NOT_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_NOT?: Maybe<Scalars['DateTime']>
  updatedAt_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updatedAt_NOT_IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  parent?: Maybe<ElementWhere>
  parent_NOT?: Maybe<ElementWhere>
  parentAggregate?: Maybe<ElementParentAggregateInput>
  children?: Maybe<ElementWhere>
  children_NOT?: Maybe<ElementWhere>
  childrenAggregate?: Maybe<ElementChildrenAggregateInput>
  parentConnection?: Maybe<ElementParentConnectionWhere>
  parentConnection_NOT?: Maybe<ElementParentConnectionWhere>
  childrenConnection?: Maybe<ElementChildrenConnectionWhere>
  childrenConnection_NOT?: Maybe<ElementChildrenConnectionWhere>
}

export type EnumTypeAllowedValuesAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<EnumTypeAllowedValuesAggregateInput>>
  OR?: Maybe<Array<EnumTypeAllowedValuesAggregateInput>>
  node?: Maybe<EnumTypeAllowedValuesNodeAggregationWhereInput>
}

export type EnumTypeAllowedValuesConnectFieldInput = {
  where?: Maybe<EnumTypeValueConnectWhere>
  connect?: Maybe<Array<EnumTypeValueConnectInput>>
}

export type EnumTypeAllowedValuesConnectionSort = {
  node?: Maybe<EnumTypeValueSort>
}

export type EnumTypeAllowedValuesConnectionWhere = {
  AND?: Maybe<Array<EnumTypeAllowedValuesConnectionWhere>>
  OR?: Maybe<Array<EnumTypeAllowedValuesConnectionWhere>>
  node?: Maybe<EnumTypeValueWhere>
  node_NOT?: Maybe<EnumTypeValueWhere>
}

export type EnumTypeAllowedValuesCreateFieldInput = {
  node: EnumTypeValueCreateInput
}

export type EnumTypeAllowedValuesDeleteFieldInput = {
  where?: Maybe<EnumTypeAllowedValuesConnectionWhere>
  delete?: Maybe<EnumTypeValueDeleteInput>
}

export type EnumTypeAllowedValuesDisconnectFieldInput = {
  where?: Maybe<EnumTypeAllowedValuesConnectionWhere>
  disconnect?: Maybe<EnumTypeValueDisconnectInput>
}

export type EnumTypeAllowedValuesFieldInput = {
  create?: Maybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  connect?: Maybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
}

export type EnumTypeAllowedValuesNodeAggregationWhereInput = {
  AND?: Maybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  OR?: Maybe<Array<EnumTypeAllowedValuesNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  value_EQUAL?: Maybe<Scalars['String']>
  value_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  value_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  value_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  value_GT?: Maybe<Scalars['Int']>
  value_AVERAGE_GT?: Maybe<Scalars['Float']>
  value_LONGEST_GT?: Maybe<Scalars['Int']>
  value_SHORTEST_GT?: Maybe<Scalars['Int']>
  value_GTE?: Maybe<Scalars['Int']>
  value_AVERAGE_GTE?: Maybe<Scalars['Float']>
  value_LONGEST_GTE?: Maybe<Scalars['Int']>
  value_SHORTEST_GTE?: Maybe<Scalars['Int']>
  value_LT?: Maybe<Scalars['Int']>
  value_AVERAGE_LT?: Maybe<Scalars['Float']>
  value_LONGEST_LT?: Maybe<Scalars['Int']>
  value_SHORTEST_LT?: Maybe<Scalars['Int']>
  value_LTE?: Maybe<Scalars['Int']>
  value_AVERAGE_LTE?: Maybe<Scalars['Float']>
  value_LONGEST_LTE?: Maybe<Scalars['Int']>
  value_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type EnumTypeAllowedValuesUpdateConnectionInput = {
  node?: Maybe<EnumTypeValueUpdateInput>
}

export type EnumTypeAllowedValuesUpdateFieldInput = {
  where?: Maybe<EnumTypeAllowedValuesConnectionWhere>
  update?: Maybe<EnumTypeAllowedValuesUpdateConnectionInput>
  connect?: Maybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
  disconnect?: Maybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
  create?: Maybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  delete?: Maybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
}

export type EnumTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  allowedValues?: Maybe<Array<EnumTypeAllowedValuesConnectFieldInput>>
}

export type EnumTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere
}

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere
}

export type EnumTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
  allowedValues?: Maybe<EnumTypeAllowedValuesFieldInput>
}

export type EnumTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  allowedValues?: Maybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
}

export type EnumTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  allowedValues?: Maybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
}

export type EnumTypeOptions = {
  /** Specify one or more EnumTypeSort objects to sort EnumTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<EnumTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type EnumTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<EnumTypeOwnerAggregateInput>>
  OR?: Maybe<Array<EnumTypeOwnerAggregateInput>>
  node?: Maybe<EnumTypeOwnerNodeAggregationWhereInput>
}

export type EnumTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<EnumTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type EnumTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
  allowedValues?: Maybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
}

/** Fields to sort EnumTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeSort object. */
export type EnumTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type EnumTypeUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type EnumTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
  allowedValues?: Maybe<Array<EnumTypeAllowedValuesUpdateFieldInput>>
}

export type EnumTypeValueConnectInput = {
  enumType?: Maybe<EnumTypeValueEnumTypeConnectFieldInput>
}

export type EnumTypeValueConnectOrCreateInput = {
  enumType?: Maybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueConnectWhere = {
  node: EnumTypeValueWhere
}

export type EnumTypeValueCreateInput = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  value: Scalars['String']
  enumType?: Maybe<EnumTypeValueEnumTypeFieldInput>
}

export type EnumTypeValueDeleteInput = {
  enumType?: Maybe<EnumTypeValueEnumTypeDeleteFieldInput>
}

export type EnumTypeValueDisconnectInput = {
  enumType?: Maybe<EnumTypeValueEnumTypeDisconnectFieldInput>
}

export type EnumTypeValueEnumTypeAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  OR?: Maybe<Array<EnumTypeValueEnumTypeAggregateInput>>
  node?: Maybe<EnumTypeValueEnumTypeNodeAggregationWhereInput>
}

export type EnumTypeValueEnumTypeConnectFieldInput = {
  where?: Maybe<EnumTypeConnectWhere>
  connect?: Maybe<EnumTypeConnectInput>
}

export type EnumTypeValueEnumTypeConnectionSort = {
  node?: Maybe<EnumTypeSort>
}

export type EnumTypeValueEnumTypeConnectionWhere = {
  AND?: Maybe<Array<EnumTypeValueEnumTypeConnectionWhere>>
  OR?: Maybe<Array<EnumTypeValueEnumTypeConnectionWhere>>
  node?: Maybe<EnumTypeWhere>
  node_NOT?: Maybe<EnumTypeWhere>
}

export type EnumTypeValueEnumTypeConnectOrCreateFieldInput = {
  where: EnumTypeConnectOrCreateWhere
  onCreate: EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate
}

export type EnumTypeValueEnumTypeConnectOrCreateFieldInputOnCreate = {
  node: EnumTypeCreateInput
}

export type EnumTypeValueEnumTypeCreateFieldInput = {
  node: EnumTypeCreateInput
}

export type EnumTypeValueEnumTypeDeleteFieldInput = {
  where?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
  delete?: Maybe<EnumTypeDeleteInput>
}

export type EnumTypeValueEnumTypeDisconnectFieldInput = {
  where?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
  disconnect?: Maybe<EnumTypeDisconnectInput>
}

export type EnumTypeValueEnumTypeFieldInput = {
  create?: Maybe<EnumTypeValueEnumTypeCreateFieldInput>
  connect?: Maybe<EnumTypeValueEnumTypeConnectFieldInput>
  connectOrCreate?: Maybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueEnumTypeNodeAggregationWhereInput = {
  AND?: Maybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  OR?: Maybe<Array<EnumTypeValueEnumTypeNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type EnumTypeValueEnumTypeUpdateConnectionInput = {
  node?: Maybe<EnumTypeUpdateInput>
}

export type EnumTypeValueEnumTypeUpdateFieldInput = {
  where?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
  update?: Maybe<EnumTypeValueEnumTypeUpdateConnectionInput>
  connect?: Maybe<EnumTypeValueEnumTypeConnectFieldInput>
  disconnect?: Maybe<EnumTypeValueEnumTypeDisconnectFieldInput>
  create?: Maybe<EnumTypeValueEnumTypeCreateFieldInput>
  delete?: Maybe<EnumTypeValueEnumTypeDeleteFieldInput>
  connectOrCreate?: Maybe<EnumTypeValueEnumTypeConnectOrCreateFieldInput>
}

export type EnumTypeValueOptions = {
  /** Specify one or more EnumTypeValueSort objects to sort EnumTypeValues by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<EnumTypeValueSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type EnumTypeValueRelationInput = {
  enumType?: Maybe<EnumTypeValueEnumTypeCreateFieldInput>
}

/** Fields to sort EnumTypeValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one EnumTypeValueSort object. */
export type EnumTypeValueSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  value?: Maybe<SortDirection>
}

export type EnumTypeValueUpdateInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  enumType?: Maybe<EnumTypeValueEnumTypeUpdateFieldInput>
}

export type EnumTypeValueWhere = {
  OR?: Maybe<Array<EnumTypeValueWhere>>
  AND?: Maybe<Array<EnumTypeValueWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  value_NOT?: Maybe<Scalars['String']>
  value_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  value_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  value_CONTAINS?: Maybe<Scalars['String']>
  value_NOT_CONTAINS?: Maybe<Scalars['String']>
  value_STARTS_WITH?: Maybe<Scalars['String']>
  value_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  value_ENDS_WITH?: Maybe<Scalars['String']>
  value_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  enumType?: Maybe<EnumTypeWhere>
  enumType_NOT?: Maybe<EnumTypeWhere>
  enumTypeAggregate?: Maybe<EnumTypeValueEnumTypeAggregateInput>
  enumTypeConnection?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
  enumTypeConnection_NOT?: Maybe<EnumTypeValueEnumTypeConnectionWhere>
}

export type EnumTypeWhere = {
  OR?: Maybe<Array<EnumTypeWhere>>
  AND?: Maybe<Array<EnumTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<EnumTypeOwnerAggregateInput>
  allowedValues?: Maybe<EnumTypeValueWhere>
  allowedValues_NOT?: Maybe<EnumTypeValueWhere>
  allowedValuesAggregate?: Maybe<EnumTypeAllowedValuesAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
  allowedValuesConnection?: Maybe<EnumTypeAllowedValuesConnectionWhere>
  allowedValuesConnection_NOT?: Maybe<EnumTypeAllowedValuesConnectionWhere>
}

export type FieldCreateInput = {
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type FieldSort = {
  key?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  description?: Maybe<SortDirection>
}

export type FieldUpdateInput = {
  key?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type FieldWhere = {
  OR?: Maybe<Array<FieldWhere>>
  AND?: Maybe<Array<FieldWhere>>
  key?: Maybe<Scalars['String']>
  key_NOT?: Maybe<Scalars['String']>
  key_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  key_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  key_CONTAINS?: Maybe<Scalars['String']>
  key_NOT_CONTAINS?: Maybe<Scalars['String']>
  key_STARTS_WITH?: Maybe<Scalars['String']>
  key_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  key_ENDS_WITH?: Maybe<Scalars['String']>
  key_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  description_NOT?: Maybe<Scalars['String']>
  description_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  description_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  description_CONTAINS?: Maybe<Scalars['String']>
  description_NOT_CONTAINS?: Maybe<Scalars['String']>
  description_STARTS_WITH?: Maybe<Scalars['String']>
  description_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  description_ENDS_WITH?: Maybe<Scalars['String']>
  description_NOT_ENDS_WITH?: Maybe<Scalars['String']>
}

export type ImportAtomsInput = {
  payload?: Maybe<Array<Scalars['JSONObject']>>
}

export type ImportAtomsMutationResponseCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type ImportAtomsMutationResponseOptions = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ImportAtomsMutationResponseUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type ImportAtomsMutationResponseWhere = {
  OR?: Maybe<Array<ImportAtomsMutationResponseWhere>>
  AND?: Maybe<Array<ImportAtomsMutationResponseWhere>>
}

export type InterfaceTypeApiofAtomsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<InterfaceTypeApiofAtomsAggregateInput>>
  OR?: Maybe<Array<InterfaceTypeApiofAtomsAggregateInput>>
  node?: Maybe<InterfaceTypeApiofAtomsNodeAggregationWhereInput>
}

export type InterfaceTypeApiofAtomsConnectFieldInput = {
  where?: Maybe<AtomConnectWhere>
  connect?: Maybe<Array<AtomConnectInput>>
}

export type InterfaceTypeApiofAtomsConnectionSort = {
  node?: Maybe<AtomSort>
}

export type InterfaceTypeApiofAtomsConnectionWhere = {
  AND?: Maybe<Array<InterfaceTypeApiofAtomsConnectionWhere>>
  OR?: Maybe<Array<InterfaceTypeApiofAtomsConnectionWhere>>
  node?: Maybe<AtomWhere>
  node_NOT?: Maybe<AtomWhere>
}

export type InterfaceTypeApiofAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: InterfaceTypeApiofAtomsConnectOrCreateFieldInputOnCreate
}

export type InterfaceTypeApiofAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomCreateInput
}

export type InterfaceTypeApiofAtomsCreateFieldInput = {
  node: AtomCreateInput
}

export type InterfaceTypeApiofAtomsDeleteFieldInput = {
  where?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  delete?: Maybe<AtomDeleteInput>
}

export type InterfaceTypeApiofAtomsDisconnectFieldInput = {
  where?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  disconnect?: Maybe<AtomDisconnectInput>
}

export type InterfaceTypeApiofAtomsFieldInput = {
  create?: Maybe<Array<InterfaceTypeApiofAtomsCreateFieldInput>>
  connect?: Maybe<Array<InterfaceTypeApiofAtomsConnectFieldInput>>
  connectOrCreate?: Maybe<
    Array<InterfaceTypeApiofAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeApiofAtomsNodeAggregationWhereInput = {
  AND?: Maybe<Array<InterfaceTypeApiofAtomsNodeAggregationWhereInput>>
  OR?: Maybe<Array<InterfaceTypeApiofAtomsNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type InterfaceTypeApiofAtomsUpdateConnectionInput = {
  node?: Maybe<AtomUpdateInput>
}

export type InterfaceTypeApiofAtomsUpdateFieldInput = {
  where?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  update?: Maybe<InterfaceTypeApiofAtomsUpdateConnectionInput>
  connect?: Maybe<Array<InterfaceTypeApiofAtomsConnectFieldInput>>
  disconnect?: Maybe<Array<InterfaceTypeApiofAtomsDisconnectFieldInput>>
  create?: Maybe<Array<InterfaceTypeApiofAtomsCreateFieldInput>>
  delete?: Maybe<Array<InterfaceTypeApiofAtomsDeleteFieldInput>>
  connectOrCreate?: Maybe<
    Array<InterfaceTypeApiofAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsConnectFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsConnectOrCreateFieldInput>>
}

export type InterfaceTypeConnectOrCreateWhere = {
  node: InterfaceTypeUniqueWhere
}

export type InterfaceTypeConnectWhere = {
  node: InterfaceTypeWhere
}

export type InterfaceTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
  apiofAtoms?: Maybe<InterfaceTypeApiofAtomsFieldInput>
  fields?: Maybe<InterfaceTypeFieldsFieldInput>
}

export type InterfaceTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsDeleteFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
}

export type InterfaceTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsDisconnectFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
}

export type InterfaceTypeEdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type InterfaceTypeEdgeOptions = {
  /** Specify one or more InterfaceTypeEdgeSort objects to sort InterfaceTypeEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<InterfaceTypeEdgeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort InterfaceTypeEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeEdgeSort object. */
export type InterfaceTypeEdgeSort = {
  source?: Maybe<SortDirection>
  target?: Maybe<SortDirection>
  key?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  description?: Maybe<SortDirection>
}

export type InterfaceTypeEdgeUpdateInput = {
  source?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type InterfaceTypeEdgeWhere = {
  OR?: Maybe<Array<InterfaceTypeEdgeWhere>>
  AND?: Maybe<Array<InterfaceTypeEdgeWhere>>
  source?: Maybe<Scalars['String']>
  source_NOT?: Maybe<Scalars['String']>
  source_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  source_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  source_CONTAINS?: Maybe<Scalars['String']>
  source_NOT_CONTAINS?: Maybe<Scalars['String']>
  source_STARTS_WITH?: Maybe<Scalars['String']>
  source_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  source_ENDS_WITH?: Maybe<Scalars['String']>
  source_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  target_NOT?: Maybe<Scalars['String']>
  target_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  target_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  target_CONTAINS?: Maybe<Scalars['String']>
  target_NOT_CONTAINS?: Maybe<Scalars['String']>
  target_STARTS_WITH?: Maybe<Scalars['String']>
  target_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  target_ENDS_WITH?: Maybe<Scalars['String']>
  target_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  key_NOT?: Maybe<Scalars['String']>
  key_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  key_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  key_CONTAINS?: Maybe<Scalars['String']>
  key_NOT_CONTAINS?: Maybe<Scalars['String']>
  key_STARTS_WITH?: Maybe<Scalars['String']>
  key_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  key_ENDS_WITH?: Maybe<Scalars['String']>
  key_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  description_NOT?: Maybe<Scalars['String']>
  description_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  description_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  description_CONTAINS?: Maybe<Scalars['String']>
  description_NOT_CONTAINS?: Maybe<Scalars['String']>
  description_STARTS_WITH?: Maybe<Scalars['String']>
  description_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  description_ENDS_WITH?: Maybe<Scalars['String']>
  description_NOT_ENDS_WITH?: Maybe<Scalars['String']>
}

export type InterfaceTypeFieldsConnectFieldInput = {
  connect?: Maybe<TypeBaseConnectInput>
  edge: FieldCreateInput
  where?: Maybe<TypeBaseConnectWhere>
}

export type InterfaceTypeFieldsConnectionSort = {
  edge?: Maybe<FieldSort>
}

export type InterfaceTypeFieldsConnectionWhere = {
  AND?: Maybe<Array<InterfaceTypeFieldsConnectionWhere>>
  OR?: Maybe<Array<InterfaceTypeFieldsConnectionWhere>>
  edge?: Maybe<FieldWhere>
  edge_NOT?: Maybe<FieldWhere>
  node?: Maybe<TypeBaseWhere>
  node_NOT?: Maybe<TypeBaseWhere>
}

export type InterfaceTypeFieldsCreateFieldInput = {
  node: TypeBaseCreateInput
  edge: FieldCreateInput
}

export type InterfaceTypeFieldsDeleteFieldInput = {
  delete?: Maybe<TypeBaseDeleteInput>
  where?: Maybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeFieldsDisconnectFieldInput = {
  disconnect?: Maybe<TypeBaseDisconnectInput>
  where?: Maybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeFieldsFieldInput = {
  create?: Maybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  connect?: Maybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeFieldsUpdateConnectionInput = {
  edge?: Maybe<FieldUpdateInput>
  node?: Maybe<TypeBaseUpdateInput>
}

export type InterfaceTypeFieldsUpdateFieldInput = {
  connect?: Maybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  create?: Maybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  delete?: Maybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
  disconnect?: Maybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
  update?: Maybe<InterfaceTypeFieldsUpdateConnectionInput>
  where?: Maybe<InterfaceTypeFieldsConnectionWhere>
}

export type InterfaceTypeOptions = {
  /** Specify one or more InterfaceTypeSort objects to sort InterfaceTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<InterfaceTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type InterfaceTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<InterfaceTypeOwnerAggregateInput>>
  OR?: Maybe<Array<InterfaceTypeOwnerAggregateInput>>
  node?: Maybe<InterfaceTypeOwnerNodeAggregationWhereInput>
}

export type InterfaceTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<InterfaceTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type InterfaceTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsCreateFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsCreateFieldInput>>
}

/** Fields to sort InterfaceTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one InterfaceTypeSort object. */
export type InterfaceTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type InterfaceTypeUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type InterfaceTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
  apiofAtoms?: Maybe<Array<InterfaceTypeApiofAtomsUpdateFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsUpdateFieldInput>>
}

export type InterfaceTypeWhere = {
  OR?: Maybe<Array<InterfaceTypeWhere>>
  AND?: Maybe<Array<InterfaceTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<InterfaceTypeOwnerAggregateInput>
  apiofAtoms?: Maybe<AtomWhere>
  apiofAtoms_NOT?: Maybe<AtomWhere>
  apiofAtomsAggregate?: Maybe<InterfaceTypeApiofAtomsAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
  apiofAtomsConnection?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  apiofAtomsConnection_NOT?: Maybe<InterfaceTypeApiofAtomsConnectionWhere>
  fieldsConnection?: Maybe<InterfaceTypeFieldsConnectionWhere>
  fieldsConnection_NOT?: Maybe<InterfaceTypeFieldsConnectionWhere>
}

export type LambdaTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type LambdaTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type LambdaTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type LambdaTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type LambdaTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type LambdaTypeOptions = {
  /** Specify one or more LambdaTypeSort objects to sort LambdaTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<LambdaTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type LambdaTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<LambdaTypeOwnerAggregateInput>>
  OR?: Maybe<Array<LambdaTypeOwnerAggregateInput>>
  node?: Maybe<LambdaTypeOwnerNodeAggregationWhereInput>
}

export type LambdaTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<LambdaTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type LambdaTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type LambdaTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type LambdaTypeWhere = {
  OR?: Maybe<Array<LambdaTypeWhere>>
  AND?: Maybe<Array<LambdaTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<LambdaTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type MonacoTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type MonacoTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type MonacoTypeCreateInput = {
  name: Scalars['String']
  language: MonacoLanguage
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type MonacoTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type MonacoTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type MonacoTypeOptions = {
  /** Specify one or more MonacoTypeSort objects to sort MonacoTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<MonacoTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type MonacoTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<MonacoTypeOwnerAggregateInput>>
  OR?: Maybe<Array<MonacoTypeOwnerAggregateInput>>
  node?: Maybe<MonacoTypeOwnerNodeAggregationWhereInput>
}

export type MonacoTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type MonacoTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort MonacoTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one MonacoTypeSort object. */
export type MonacoTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  language?: Maybe<SortDirection>
}

export type MonacoTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  language?: Maybe<MonacoLanguage>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type MonacoTypeWhere = {
  OR?: Maybe<Array<MonacoTypeWhere>>
  AND?: Maybe<Array<MonacoTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  language?: Maybe<MonacoLanguage>
  language_NOT?: Maybe<MonacoLanguage>
  language_IN?: Maybe<Array<Maybe<MonacoLanguage>>>
  language_NOT_IN?: Maybe<Array<Maybe<MonacoLanguage>>>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<MonacoTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type PageAppAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PageAppAggregateInput>>
  OR?: Maybe<Array<PageAppAggregateInput>>
  node?: Maybe<PageAppNodeAggregationWhereInput>
}

export type PageAppConnectFieldInput = {
  where?: Maybe<AppConnectWhere>
  connect?: Maybe<AppConnectInput>
}

export type PageAppConnectionSort = {
  node?: Maybe<AppSort>
}

export type PageAppConnectionWhere = {
  AND?: Maybe<Array<PageAppConnectionWhere>>
  OR?: Maybe<Array<PageAppConnectionWhere>>
  node?: Maybe<AppWhere>
  node_NOT?: Maybe<AppWhere>
}

export type PageAppConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: PageAppConnectOrCreateFieldInputOnCreate
}

export type PageAppConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type PageAppCreateFieldInput = {
  node: AppCreateInput
}

export type PageAppDeleteFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  delete?: Maybe<AppDeleteInput>
}

export type PageAppDisconnectFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  disconnect?: Maybe<AppDisconnectInput>
}

export type PageAppFieldInput = {
  create?: Maybe<PageAppCreateFieldInput>
  connect?: Maybe<PageAppConnectFieldInput>
  connectOrCreate?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageAppNodeAggregationWhereInput = {
  AND?: Maybe<Array<PageAppNodeAggregationWhereInput>>
  OR?: Maybe<Array<PageAppNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PageAppUpdateConnectionInput = {
  node?: Maybe<AppUpdateInput>
}

export type PageAppUpdateFieldInput = {
  where?: Maybe<PageAppConnectionWhere>
  update?: Maybe<PageAppUpdateConnectionInput>
  connect?: Maybe<PageAppConnectFieldInput>
  disconnect?: Maybe<PageAppDisconnectFieldInput>
  create?: Maybe<PageAppCreateFieldInput>
  delete?: Maybe<PageAppDeleteFieldInput>
  connectOrCreate?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectInput = {
  rootElement?: Maybe<PageRootElementConnectFieldInput>
  app?: Maybe<PageAppConnectFieldInput>
}

export type PageConnectOrCreateInput = {
  rootElement?: Maybe<PageRootElementConnectOrCreateFieldInput>
  app?: Maybe<PageAppConnectOrCreateFieldInput>
}

export type PageConnectOrCreateWhere = {
  node: PageUniqueWhere
}

export type PageConnectWhere = {
  node: PageWhere
}

export type PageCreateInput = {
  name: Scalars['String']
  rootElement?: Maybe<PageRootElementFieldInput>
  app?: Maybe<PageAppFieldInput>
}

export type PageDeleteInput = {
  rootElement?: Maybe<PageRootElementDeleteFieldInput>
  app?: Maybe<PageAppDeleteFieldInput>
}

export type PageDisconnectInput = {
  rootElement?: Maybe<PageRootElementDisconnectFieldInput>
  app?: Maybe<PageAppDisconnectFieldInput>
}

export type PageOptions = {
  /** Specify one or more PageSort objects to sort Pages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PageSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PageRelationInput = {
  rootElement?: Maybe<PageRootElementCreateFieldInput>
  app?: Maybe<PageAppCreateFieldInput>
}

export type PageRootElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PageRootElementAggregateInput>>
  OR?: Maybe<Array<PageRootElementAggregateInput>>
  node?: Maybe<PageRootElementNodeAggregationWhereInput>
}

export type PageRootElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type PageRootElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type PageRootElementConnectionWhere = {
  AND?: Maybe<Array<PageRootElementConnectionWhere>>
  OR?: Maybe<Array<PageRootElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type PageRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PageRootElementConnectOrCreateFieldInputOnCreate
}

export type PageRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type PageRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PageRootElementDeleteFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type PageRootElementDisconnectFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type PageRootElementFieldInput = {
  create?: Maybe<PageRootElementCreateFieldInput>
  connect?: Maybe<PageRootElementConnectFieldInput>
  connectOrCreate?: Maybe<PageRootElementConnectOrCreateFieldInput>
}

export type PageRootElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<PageRootElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<PageRootElementNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
  ownerId_EQUAL?: Maybe<Scalars['String']>
  ownerId_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  ownerId_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  ownerId_GT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GT?: Maybe<Scalars['Int']>
  ownerId_GTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_GTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_GTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_GTE?: Maybe<Scalars['Int']>
  ownerId_LT?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LT?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LT?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LT?: Maybe<Scalars['Int']>
  ownerId_LTE?: Maybe<Scalars['Int']>
  ownerId_AVERAGE_LTE?: Maybe<Scalars['Float']>
  ownerId_LONGEST_LTE?: Maybe<Scalars['Int']>
  ownerId_SHORTEST_LTE?: Maybe<Scalars['Int']>
  createdAt_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  createdAt_GT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GT?: Maybe<Scalars['DateTime']>
  createdAt_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  createdAt_LT?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LT?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LT?: Maybe<Scalars['DateTime']>
  createdAt_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  createdAt_MAX_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_EQUAL?: Maybe<Scalars['DateTime']>
  updatedAt_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GT?: Maybe<Scalars['DateTime']>
  updatedAt_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_GTE?: Maybe<Scalars['DateTime']>
  updatedAt_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LT?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LT?: Maybe<Scalars['DateTime']>
  updatedAt_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MIN_LTE?: Maybe<Scalars['DateTime']>
  updatedAt_MAX_LTE?: Maybe<Scalars['DateTime']>
}

export type PageRootElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type PageRootElementUpdateFieldInput = {
  where?: Maybe<PageRootElementConnectionWhere>
  update?: Maybe<PageRootElementUpdateConnectionInput>
  connect?: Maybe<PageRootElementConnectFieldInput>
  disconnect?: Maybe<PageRootElementDisconnectFieldInput>
  create?: Maybe<PageRootElementCreateFieldInput>
  delete?: Maybe<PageRootElementDeleteFieldInput>
  connectOrCreate?: Maybe<PageRootElementConnectOrCreateFieldInput>
}

/** Fields to sort Pages by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageSort object. */
export type PageSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type PageTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type PageTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PageTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type PageTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type PageTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type PageTypeOptions = {
  /** Specify one or more PageTypeSort objects to sort PageTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PageTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PageTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PageTypeOwnerAggregateInput>>
  OR?: Maybe<Array<PageTypeOwnerAggregateInput>>
  node?: Maybe<PageTypeOwnerNodeAggregationWhereInput>
}

export type PageTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<PageTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PageTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type PageTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type PageTypeWhere = {
  OR?: Maybe<Array<PageTypeWhere>>
  AND?: Maybe<Array<PageTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<PageTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type PageUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type PageUpdateInput = {
  name?: Maybe<Scalars['String']>
  rootElement?: Maybe<PageRootElementUpdateFieldInput>
  app?: Maybe<PageAppUpdateFieldInput>
}

export type PageWhere = {
  OR?: Maybe<Array<PageWhere>>
  AND?: Maybe<Array<PageWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  rootElement?: Maybe<ElementWhere>
  rootElement_NOT?: Maybe<ElementWhere>
  rootElementAggregate?: Maybe<PageRootElementAggregateInput>
  app?: Maybe<AppWhere>
  app_NOT?: Maybe<AppWhere>
  appAggregate?: Maybe<PageAppAggregateInput>
  rootElementConnection?: Maybe<PageRootElementConnectionWhere>
  rootElementConnection_NOT?: Maybe<PageRootElementConnectionWhere>
  appConnection?: Maybe<PageAppConnectionWhere>
  appConnection_NOT?: Maybe<PageAppConnectionWhere>
}

export type PrimitiveTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type PrimitiveTypeCreateInput = {
  name: Scalars['String']
  primitiveKind: PrimitiveTypeKind
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type PrimitiveTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type PrimitiveTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type PrimitiveTypeOptions = {
  /** Specify one or more PrimitiveTypeSort objects to sort PrimitiveTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PrimitiveTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PrimitiveTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PrimitiveTypeOwnerAggregateInput>>
  OR?: Maybe<Array<PrimitiveTypeOwnerAggregateInput>>
  node?: Maybe<PrimitiveTypeOwnerNodeAggregationWhereInput>
}

export type PrimitiveTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<PrimitiveTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PrimitiveTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  primitiveKind?: Maybe<SortDirection>
}

export type PrimitiveTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  primitiveKind?: Maybe<PrimitiveTypeKind>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type PrimitiveTypeWhere = {
  OR?: Maybe<Array<PrimitiveTypeWhere>>
  AND?: Maybe<Array<PrimitiveTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  primitiveKind?: Maybe<PrimitiveTypeKind>
  primitiveKind_NOT?: Maybe<PrimitiveTypeKind>
  primitiveKind_IN?: Maybe<Array<Maybe<PrimitiveTypeKind>>>
  primitiveKind_NOT_IN?: Maybe<Array<Maybe<PrimitiveTypeKind>>>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<PrimitiveTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type QueryOptions = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type ReactNodeTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type ReactNodeTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type ReactNodeTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type ReactNodeTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type ReactNodeTypeOptions = {
  /** Specify one or more ReactNodeTypeSort objects to sort ReactNodeTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ReactNodeTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ReactNodeTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ReactNodeTypeOwnerAggregateInput>>
  OR?: Maybe<Array<ReactNodeTypeOwnerAggregateInput>>
  node?: Maybe<ReactNodeTypeOwnerNodeAggregationWhereInput>
}

export type ReactNodeTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<ReactNodeTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ReactNodeTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type ReactNodeTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type ReactNodeTypeWhere = {
  OR?: Maybe<Array<ReactNodeTypeWhere>>
  AND?: Maybe<Array<ReactNodeTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<ReactNodeTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type RenderPropsTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
}

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type RenderPropsTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
}

export type RenderPropsTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
}

export type RenderPropsTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
}

export type RenderPropsTypeOptions = {
  /** Specify one or more RenderPropsTypeSort objects to sort RenderPropsTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<RenderPropsTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RenderPropsTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<RenderPropsTypeOwnerAggregateInput>>
  OR?: Maybe<Array<RenderPropsTypeOwnerAggregateInput>>
  node?: Maybe<RenderPropsTypeOwnerNodeAggregationWhereInput>
}

export type RenderPropsTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<RenderPropsTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type RenderPropsTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
}

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type RenderPropsTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type RenderPropsTypeWhere = {
  OR?: Maybe<Array<RenderPropsTypeWhere>>
  AND?: Maybe<Array<RenderPropsTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<RenderPropsTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type TagChildrenAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<TagChildrenAggregateInput>>
  OR?: Maybe<Array<TagChildrenAggregateInput>>
  node?: Maybe<TagChildrenNodeAggregationWhereInput>
}

export type TagChildrenConnectFieldInput = {
  where?: Maybe<TagConnectWhere>
  connect?: Maybe<Array<TagConnectInput>>
}

export type TagChildrenConnectionSort = {
  node?: Maybe<TagSort>
}

export type TagChildrenConnectionWhere = {
  AND?: Maybe<Array<TagChildrenConnectionWhere>>
  OR?: Maybe<Array<TagChildrenConnectionWhere>>
  node?: Maybe<TagWhere>
  node_NOT?: Maybe<TagWhere>
}

export type TagChildrenConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagChildrenConnectOrCreateFieldInputOnCreate
}

export type TagChildrenConnectOrCreateFieldInputOnCreate = {
  node: TagCreateInput
}

export type TagChildrenCreateFieldInput = {
  node: TagCreateInput
}

export type TagChildrenDeleteFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  delete?: Maybe<TagDeleteInput>
}

export type TagChildrenDisconnectFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  disconnect?: Maybe<TagDisconnectInput>
}

export type TagChildrenFieldInput = {
  create?: Maybe<Array<TagChildrenCreateFieldInput>>
  connect?: Maybe<Array<TagChildrenConnectFieldInput>>
  connectOrCreate?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagChildrenNodeAggregationWhereInput = {
  AND?: Maybe<Array<TagChildrenNodeAggregationWhereInput>>
  OR?: Maybe<Array<TagChildrenNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type TagChildrenUpdateConnectionInput = {
  node?: Maybe<TagUpdateInput>
}

export type TagChildrenUpdateFieldInput = {
  where?: Maybe<TagChildrenConnectionWhere>
  update?: Maybe<TagChildrenUpdateConnectionInput>
  connect?: Maybe<Array<TagChildrenConnectFieldInput>>
  disconnect?: Maybe<Array<TagChildrenDisconnectFieldInput>>
  create?: Maybe<Array<TagChildrenCreateFieldInput>>
  delete?: Maybe<Array<TagChildrenDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectInput = {
  parent?: Maybe<TagParentConnectFieldInput>
  children?: Maybe<Array<TagChildrenConnectFieldInput>>
}

export type TagConnectOrCreateInput = {
  parent?: Maybe<TagParentConnectOrCreateFieldInput>
  children?: Maybe<Array<TagChildrenConnectOrCreateFieldInput>>
}

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere
}

export type TagConnectWhere = {
  node: TagWhere
}

export type TagCreateInput = {
  name: Scalars['String']
  isRoot?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagParentFieldInput>
  children?: Maybe<TagChildrenFieldInput>
}

export type TagDeleteInput = {
  parent?: Maybe<TagParentDeleteFieldInput>
  children?: Maybe<Array<TagChildrenDeleteFieldInput>>
}

export type TagDisconnectInput = {
  parent?: Maybe<TagParentDisconnectFieldInput>
  children?: Maybe<Array<TagChildrenDisconnectFieldInput>>
}

export type TagEdgeCreateInput = {
  source: Scalars['ID']
  target: Scalars['ID']
}

export type TagEdgeOptions = {
  /** Specify one or more TagEdgeSort objects to sort TagEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TagEdgeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort TagEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagEdgeSort object. */
export type TagEdgeSort = {
  source?: Maybe<SortDirection>
  target?: Maybe<SortDirection>
}

export type TagEdgeUpdateInput = {
  source?: Maybe<Scalars['ID']>
  target?: Maybe<Scalars['ID']>
}

export type TagEdgeWhere = {
  OR?: Maybe<Array<TagEdgeWhere>>
  AND?: Maybe<Array<TagEdgeWhere>>
  source?: Maybe<Scalars['ID']>
  source_NOT?: Maybe<Scalars['ID']>
  source_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  source_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  source_CONTAINS?: Maybe<Scalars['ID']>
  source_NOT_CONTAINS?: Maybe<Scalars['ID']>
  source_STARTS_WITH?: Maybe<Scalars['ID']>
  source_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  source_ENDS_WITH?: Maybe<Scalars['ID']>
  source_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  target?: Maybe<Scalars['ID']>
  target_NOT?: Maybe<Scalars['ID']>
  target_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  target_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  target_CONTAINS?: Maybe<Scalars['ID']>
  target_NOT_CONTAINS?: Maybe<Scalars['ID']>
  target_STARTS_WITH?: Maybe<Scalars['ID']>
  target_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  target_ENDS_WITH?: Maybe<Scalars['ID']>
  target_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
}

export type TagGraphCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type TagGraphUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type TagGraphWhere = {
  OR?: Maybe<Array<TagGraphWhere>>
  AND?: Maybe<Array<TagGraphWhere>>
}

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TagSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type TagParentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<TagParentAggregateInput>>
  OR?: Maybe<Array<TagParentAggregateInput>>
  node?: Maybe<TagParentNodeAggregationWhereInput>
}

export type TagParentConnectFieldInput = {
  where?: Maybe<TagConnectWhere>
  connect?: Maybe<TagConnectInput>
}

export type TagParentConnectionSort = {
  node?: Maybe<TagSort>
}

export type TagParentConnectionWhere = {
  AND?: Maybe<Array<TagParentConnectionWhere>>
  OR?: Maybe<Array<TagParentConnectionWhere>>
  node?: Maybe<TagWhere>
  node_NOT?: Maybe<TagWhere>
}

export type TagParentConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: TagParentConnectOrCreateFieldInputOnCreate
}

export type TagParentConnectOrCreateFieldInputOnCreate = {
  node: TagCreateInput
}

export type TagParentCreateFieldInput = {
  node: TagCreateInput
}

export type TagParentDeleteFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  delete?: Maybe<TagDeleteInput>
}

export type TagParentDisconnectFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  disconnect?: Maybe<TagDisconnectInput>
}

export type TagParentFieldInput = {
  create?: Maybe<TagParentCreateFieldInput>
  connect?: Maybe<TagParentConnectFieldInput>
  connectOrCreate?: Maybe<TagParentConnectOrCreateFieldInput>
}

export type TagParentNodeAggregationWhereInput = {
  AND?: Maybe<Array<TagParentNodeAggregationWhereInput>>
  OR?: Maybe<Array<TagParentNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type TagParentUpdateConnectionInput = {
  node?: Maybe<TagUpdateInput>
}

export type TagParentUpdateFieldInput = {
  where?: Maybe<TagParentConnectionWhere>
  update?: Maybe<TagParentUpdateConnectionInput>
  connect?: Maybe<TagParentConnectFieldInput>
  disconnect?: Maybe<TagParentDisconnectFieldInput>
  create?: Maybe<TagParentCreateFieldInput>
  delete?: Maybe<TagParentDeleteFieldInput>
  connectOrCreate?: Maybe<TagParentConnectOrCreateFieldInput>
}

export type TagRelationInput = {
  parent?: Maybe<TagParentCreateFieldInput>
  children?: Maybe<Array<TagChildrenCreateFieldInput>>
}

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  isRoot?: Maybe<SortDirection>
}

export type TagUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type TagUpdateInput = {
  name?: Maybe<Scalars['String']>
  isRoot?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagParentUpdateFieldInput>
  children?: Maybe<Array<TagChildrenUpdateFieldInput>>
}

export type TagWhere = {
  OR?: Maybe<Array<TagWhere>>
  AND?: Maybe<Array<TagWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  isRoot?: Maybe<Scalars['Boolean']>
  isRoot_NOT?: Maybe<Scalars['Boolean']>
  parent?: Maybe<TagWhere>
  parent_NOT?: Maybe<TagWhere>
  parentAggregate?: Maybe<TagParentAggregateInput>
  children?: Maybe<TagWhere>
  children_NOT?: Maybe<TagWhere>
  childrenAggregate?: Maybe<TagChildrenAggregateInput>
  parentConnection?: Maybe<TagParentConnectionWhere>
  parentConnection_NOT?: Maybe<TagParentConnectionWhere>
  childrenConnection?: Maybe<TagChildrenConnectionWhere>
  childrenConnection_NOT?: Maybe<TagChildrenConnectionWhere>
}

export type TypeBaseConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  _on?: Maybe<TypeBaseImplementationsConnectInput>
}

export type TypeBaseConnectWhere = {
  node: TypeBaseWhere
}

export type TypeBaseCreateInput = {
  PrimitiveType?: Maybe<PrimitiveTypeCreateInput>
  ArrayType?: Maybe<ArrayTypeCreateInput>
  UnionType?: Maybe<UnionTypeCreateInput>
  InterfaceType?: Maybe<InterfaceTypeCreateInput>
  ElementType?: Maybe<ElementTypeCreateInput>
  RenderPropsType?: Maybe<RenderPropsTypeCreateInput>
  ReactNodeType?: Maybe<ReactNodeTypeCreateInput>
  EnumType?: Maybe<EnumTypeCreateInput>
  LambdaType?: Maybe<LambdaTypeCreateInput>
  PageType?: Maybe<PageTypeCreateInput>
  AppType?: Maybe<AppTypeCreateInput>
  MonacoType?: Maybe<MonacoTypeCreateInput>
}

export type TypeBaseDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  _on?: Maybe<TypeBaseImplementationsDeleteInput>
}

export type TypeBaseDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  _on?: Maybe<TypeBaseImplementationsDisconnectInput>
}

export type TypeBaseImplementationsConnectInput = {
  PrimitiveType?: Maybe<Array<PrimitiveTypeConnectInput>>
  ArrayType?: Maybe<Array<ArrayTypeConnectInput>>
  UnionType?: Maybe<Array<UnionTypeConnectInput>>
  InterfaceType?: Maybe<Array<InterfaceTypeConnectInput>>
  ElementType?: Maybe<Array<ElementTypeConnectInput>>
  RenderPropsType?: Maybe<Array<RenderPropsTypeConnectInput>>
  ReactNodeType?: Maybe<Array<ReactNodeTypeConnectInput>>
  EnumType?: Maybe<Array<EnumTypeConnectInput>>
  LambdaType?: Maybe<Array<LambdaTypeConnectInput>>
  PageType?: Maybe<Array<PageTypeConnectInput>>
  AppType?: Maybe<Array<AppTypeConnectInput>>
  MonacoType?: Maybe<Array<MonacoTypeConnectInput>>
}

export type TypeBaseImplementationsDeleteInput = {
  PrimitiveType?: Maybe<Array<PrimitiveTypeDeleteInput>>
  ArrayType?: Maybe<Array<ArrayTypeDeleteInput>>
  UnionType?: Maybe<Array<UnionTypeDeleteInput>>
  InterfaceType?: Maybe<Array<InterfaceTypeDeleteInput>>
  ElementType?: Maybe<Array<ElementTypeDeleteInput>>
  RenderPropsType?: Maybe<Array<RenderPropsTypeDeleteInput>>
  ReactNodeType?: Maybe<Array<ReactNodeTypeDeleteInput>>
  EnumType?: Maybe<Array<EnumTypeDeleteInput>>
  LambdaType?: Maybe<Array<LambdaTypeDeleteInput>>
  PageType?: Maybe<Array<PageTypeDeleteInput>>
  AppType?: Maybe<Array<AppTypeDeleteInput>>
  MonacoType?: Maybe<Array<MonacoTypeDeleteInput>>
}

export type TypeBaseImplementationsDisconnectInput = {
  PrimitiveType?: Maybe<Array<PrimitiveTypeDisconnectInput>>
  ArrayType?: Maybe<Array<ArrayTypeDisconnectInput>>
  UnionType?: Maybe<Array<UnionTypeDisconnectInput>>
  InterfaceType?: Maybe<Array<InterfaceTypeDisconnectInput>>
  ElementType?: Maybe<Array<ElementTypeDisconnectInput>>
  RenderPropsType?: Maybe<Array<RenderPropsTypeDisconnectInput>>
  ReactNodeType?: Maybe<Array<ReactNodeTypeDisconnectInput>>
  EnumType?: Maybe<Array<EnumTypeDisconnectInput>>
  LambdaType?: Maybe<Array<LambdaTypeDisconnectInput>>
  PageType?: Maybe<Array<PageTypeDisconnectInput>>
  AppType?: Maybe<Array<AppTypeDisconnectInput>>
  MonacoType?: Maybe<Array<MonacoTypeDisconnectInput>>
}

export type TypeBaseImplementationsUpdateInput = {
  PrimitiveType?: Maybe<PrimitiveTypeUpdateInput>
  ArrayType?: Maybe<ArrayTypeUpdateInput>
  UnionType?: Maybe<UnionTypeUpdateInput>
  InterfaceType?: Maybe<InterfaceTypeUpdateInput>
  ElementType?: Maybe<ElementTypeUpdateInput>
  RenderPropsType?: Maybe<RenderPropsTypeUpdateInput>
  ReactNodeType?: Maybe<ReactNodeTypeUpdateInput>
  EnumType?: Maybe<EnumTypeUpdateInput>
  LambdaType?: Maybe<LambdaTypeUpdateInput>
  PageType?: Maybe<PageTypeUpdateInput>
  AppType?: Maybe<AppTypeUpdateInput>
  MonacoType?: Maybe<MonacoTypeUpdateInput>
}

export type TypeBaseImplementationsWhere = {
  PrimitiveType?: Maybe<PrimitiveTypeWhere>
  ArrayType?: Maybe<ArrayTypeWhere>
  UnionType?: Maybe<UnionTypeWhere>
  InterfaceType?: Maybe<InterfaceTypeWhere>
  ElementType?: Maybe<ElementTypeWhere>
  RenderPropsType?: Maybe<RenderPropsTypeWhere>
  ReactNodeType?: Maybe<ReactNodeTypeWhere>
  EnumType?: Maybe<EnumTypeWhere>
  LambdaType?: Maybe<LambdaTypeWhere>
  PageType?: Maybe<PageTypeWhere>
  AppType?: Maybe<AppTypeWhere>
  MonacoType?: Maybe<MonacoTypeWhere>
}

export type TypeBaseOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<TypeBaseOwnerAggregateInput>>
  OR?: Maybe<Array<TypeBaseOwnerAggregateInput>>
  node?: Maybe<TypeBaseOwnerNodeAggregationWhereInput>
}

export type TypeBaseOwnerConnectFieldInput = {
  where?: Maybe<UserConnectWhere>
  connect?: Maybe<UserConnectInput>
}

export type TypeBaseOwnerConnectionSort = {
  node?: Maybe<UserSort>
}

export type TypeBaseOwnerConnectionWhere = {
  AND?: Maybe<Array<TypeBaseOwnerConnectionWhere>>
  OR?: Maybe<Array<TypeBaseOwnerConnectionWhere>>
  node?: Maybe<UserWhere>
  node_NOT?: Maybe<UserWhere>
}

export type TypeBaseOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: TypeBaseOwnerConnectOrCreateFieldInputOnCreate
}

export type TypeBaseOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserCreateInput
}

export type TypeBaseOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type TypeBaseOwnerDeleteFieldInput = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  delete?: Maybe<UserDeleteInput>
}

export type TypeBaseOwnerDisconnectFieldInput = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  disconnect?: Maybe<UserDisconnectInput>
}

export type TypeBaseOwnerFieldInput = {
  create?: Maybe<TypeBaseOwnerCreateFieldInput>
  connect?: Maybe<TypeBaseOwnerConnectFieldInput>
  connectOrCreate?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type TypeBaseOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<TypeBaseOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type TypeBaseOwnerUpdateConnectionInput = {
  node?: Maybe<UserUpdateInput>
}

export type TypeBaseOwnerUpdateFieldInput = {
  where?: Maybe<TypeBaseOwnerConnectionWhere>
  update?: Maybe<TypeBaseOwnerUpdateConnectionInput>
  connect?: Maybe<TypeBaseOwnerConnectFieldInput>
  disconnect?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  create?: Maybe<TypeBaseOwnerCreateFieldInput>
  delete?: Maybe<TypeBaseOwnerDeleteFieldInput>
  connectOrCreate?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type TypeBaseUpdateInput = {
  name?: Maybe<Scalars['String']>
  _on?: Maybe<TypeBaseImplementationsUpdateInput>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
}

export type TypeBaseWhere = {
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  _on?: Maybe<TypeBaseImplementationsWhere>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<TypeBaseOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
}

export type TypeGraphCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type TypeGraphOptions = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type TypeGraphUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type TypeGraphWhere = {
  OR?: Maybe<Array<TypeGraphWhere>>
  AND?: Maybe<Array<TypeGraphWhere>>
}

export type TypeReferenceCreateInput = {
  name: Scalars['String']
  label: Scalars['String']
}

export type TypeReferenceOptions = {
  /** Specify one or more TypeReferenceSort objects to sort TypeReferences by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TypeReferenceSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort TypeReferences by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeReferenceSort object. */
export type TypeReferenceSort = {
  name?: Maybe<SortDirection>
  label?: Maybe<SortDirection>
}

export type TypeReferenceUpdateInput = {
  name?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
}

export type TypeReferenceWhere = {
  OR?: Maybe<Array<TypeReferenceWhere>>
  AND?: Maybe<Array<TypeReferenceWhere>>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  label_NOT?: Maybe<Scalars['String']>
  label_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  label_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  label_CONTAINS?: Maybe<Scalars['String']>
  label_NOT_CONTAINS?: Maybe<Scalars['String']>
  label_STARTS_WITH?: Maybe<Scalars['String']>
  label_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  label_ENDS_WITH?: Maybe<Scalars['String']>
  label_NOT_ENDS_WITH?: Maybe<Scalars['String']>
}

export type UnionTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  typesOfUnionType?: Maybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
}

export type UnionTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
}

export type UnionTypeCreateInput = {
  name: Scalars['String']
  owner?: Maybe<TypeBaseOwnerFieldInput>
  typesOfUnionType?: Maybe<UnionTypeTypesOfUnionTypeFieldInput>
}

export type UnionTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  typesOfUnionType?: Maybe<Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>>
}

export type UnionTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  typesOfUnionType?: Maybe<Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>>
}

export type UnionTypeOptions = {
  /** Specify one or more UnionTypeSort objects to sort UnionTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<UnionTypeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UnionTypeOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<UnionTypeOwnerAggregateInput>>
  OR?: Maybe<Array<UnionTypeOwnerAggregateInput>>
  node?: Maybe<UnionTypeOwnerNodeAggregationWhereInput>
}

export type UnionTypeOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<UnionTypeOwnerNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  auth0Id_EQUAL?: Maybe<Scalars['String']>
  auth0Id_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  auth0Id_GT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GT?: Maybe<Scalars['Int']>
  auth0Id_GTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_GTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_GTE?: Maybe<Scalars['Int']>
  auth0Id_LT?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LT?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LT?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LT?: Maybe<Scalars['Int']>
  auth0Id_LTE?: Maybe<Scalars['Int']>
  auth0Id_AVERAGE_LTE?: Maybe<Scalars['Float']>
  auth0Id_LONGEST_LTE?: Maybe<Scalars['Int']>
  auth0Id_SHORTEST_LTE?: Maybe<Scalars['Int']>
  email_EQUAL?: Maybe<Scalars['String']>
  email_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  email_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  email_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  email_GT?: Maybe<Scalars['Int']>
  email_AVERAGE_GT?: Maybe<Scalars['Float']>
  email_LONGEST_GT?: Maybe<Scalars['Int']>
  email_SHORTEST_GT?: Maybe<Scalars['Int']>
  email_GTE?: Maybe<Scalars['Int']>
  email_AVERAGE_GTE?: Maybe<Scalars['Float']>
  email_LONGEST_GTE?: Maybe<Scalars['Int']>
  email_SHORTEST_GTE?: Maybe<Scalars['Int']>
  email_LT?: Maybe<Scalars['Int']>
  email_AVERAGE_LT?: Maybe<Scalars['Float']>
  email_LONGEST_LT?: Maybe<Scalars['Int']>
  email_SHORTEST_LT?: Maybe<Scalars['Int']>
  email_LTE?: Maybe<Scalars['Int']>
  email_AVERAGE_LTE?: Maybe<Scalars['Float']>
  email_LONGEST_LTE?: Maybe<Scalars['Int']>
  email_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type UnionTypeRelationInput = {
  owner?: Maybe<TypeBaseOwnerCreateFieldInput>
  typesOfUnionType?: Maybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
}

/** Fields to sort UnionTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnionTypeSort object. */
export type UnionTypeSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type UnionTypeTypesOfUnionTypeConnectFieldInput = {
  connect?: Maybe<TypeBaseConnectInput>
  where?: Maybe<TypeBaseConnectWhere>
}

export type UnionTypeTypesOfUnionTypeConnectionWhere = {
  AND?: Maybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>
  OR?: Maybe<Array<UnionTypeTypesOfUnionTypeConnectionWhere>>
  node?: Maybe<TypeBaseWhere>
  node_NOT?: Maybe<TypeBaseWhere>
}

export type UnionTypeTypesOfUnionTypeCreateFieldInput = {
  node: TypeBaseCreateInput
}

export type UnionTypeTypesOfUnionTypeDeleteFieldInput = {
  delete?: Maybe<TypeBaseDeleteInput>
  where?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeTypesOfUnionTypeDisconnectFieldInput = {
  disconnect?: Maybe<TypeBaseDisconnectInput>
  where?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeTypesOfUnionTypeFieldInput = {
  create?: Maybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
  connect?: Maybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
}

export type UnionTypeTypesOfUnionTypeUpdateConnectionInput = {
  node?: Maybe<TypeBaseUpdateInput>
}

export type UnionTypeTypesOfUnionTypeUpdateFieldInput = {
  connect?: Maybe<Array<UnionTypeTypesOfUnionTypeConnectFieldInput>>
  create?: Maybe<Array<UnionTypeTypesOfUnionTypeCreateFieldInput>>
  delete?: Maybe<Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>>
  disconnect?: Maybe<Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>>
  update?: Maybe<UnionTypeTypesOfUnionTypeUpdateConnectionInput>
  where?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UnionTypeUpdateInput = {
  name?: Maybe<Scalars['String']>
  owner?: Maybe<TypeBaseOwnerUpdateFieldInput>
  typesOfUnionType?: Maybe<Array<UnionTypeTypesOfUnionTypeUpdateFieldInput>>
}

export type UnionTypeWhere = {
  OR?: Maybe<Array<UnionTypeWhere>>
  AND?: Maybe<Array<UnionTypeWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_NOT?: Maybe<Scalars['String']>
  name_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  name_CONTAINS?: Maybe<Scalars['String']>
  name_NOT_CONTAINS?: Maybe<Scalars['String']>
  name_STARTS_WITH?: Maybe<Scalars['String']>
  name_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  name_ENDS_WITH?: Maybe<Scalars['String']>
  name_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<UnionTypeOwnerAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
  typesOfUnionTypeConnection?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NOT?: Maybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UpsertFieldInput = {
  interfaceTypeId: Scalars['ID']
  targetTypeId: Scalars['ID']
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type UserAppsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<UserAppsAggregateInput>>
  OR?: Maybe<Array<UserAppsAggregateInput>>
  node?: Maybe<UserAppsNodeAggregationWhereInput>
}

export type UserAppsConnectFieldInput = {
  where?: Maybe<AppConnectWhere>
  connect?: Maybe<Array<AppConnectInput>>
}

export type UserAppsConnectionSort = {
  node?: Maybe<AppSort>
}

export type UserAppsConnectionWhere = {
  AND?: Maybe<Array<UserAppsConnectionWhere>>
  OR?: Maybe<Array<UserAppsConnectionWhere>>
  node?: Maybe<AppWhere>
  node_NOT?: Maybe<AppWhere>
}

export type UserAppsConnectOrCreateFieldInput = {
  where: AppConnectOrCreateWhere
  onCreate: UserAppsConnectOrCreateFieldInputOnCreate
}

export type UserAppsConnectOrCreateFieldInputOnCreate = {
  node: AppCreateInput
}

export type UserAppsCreateFieldInput = {
  node: AppCreateInput
}

export type UserAppsDeleteFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  delete?: Maybe<AppDeleteInput>
}

export type UserAppsDisconnectFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  disconnect?: Maybe<AppDisconnectInput>
}

export type UserAppsFieldInput = {
  create?: Maybe<Array<UserAppsCreateFieldInput>>
  connect?: Maybe<Array<UserAppsConnectFieldInput>>
  connectOrCreate?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserAppsNodeAggregationWhereInput = {
  AND?: Maybe<Array<UserAppsNodeAggregationWhereInput>>
  OR?: Maybe<Array<UserAppsNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  name_EQUAL?: Maybe<Scalars['String']>
  name_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  name_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  name_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  name_GT?: Maybe<Scalars['Int']>
  name_AVERAGE_GT?: Maybe<Scalars['Float']>
  name_LONGEST_GT?: Maybe<Scalars['Int']>
  name_SHORTEST_GT?: Maybe<Scalars['Int']>
  name_GTE?: Maybe<Scalars['Int']>
  name_AVERAGE_GTE?: Maybe<Scalars['Float']>
  name_LONGEST_GTE?: Maybe<Scalars['Int']>
  name_SHORTEST_GTE?: Maybe<Scalars['Int']>
  name_LT?: Maybe<Scalars['Int']>
  name_AVERAGE_LT?: Maybe<Scalars['Float']>
  name_LONGEST_LT?: Maybe<Scalars['Int']>
  name_SHORTEST_LT?: Maybe<Scalars['Int']>
  name_LTE?: Maybe<Scalars['Int']>
  name_AVERAGE_LTE?: Maybe<Scalars['Float']>
  name_LONGEST_LTE?: Maybe<Scalars['Int']>
  name_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type UserAppsUpdateConnectionInput = {
  node?: Maybe<AppUpdateInput>
}

export type UserAppsUpdateFieldInput = {
  where?: Maybe<UserAppsConnectionWhere>
  update?: Maybe<UserAppsUpdateConnectionInput>
  connect?: Maybe<Array<UserAppsConnectFieldInput>>
  disconnect?: Maybe<Array<UserAppsDisconnectFieldInput>>
  create?: Maybe<Array<UserAppsCreateFieldInput>>
  delete?: Maybe<Array<UserAppsDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
}

export type UserConnectInput = {
  apps?: Maybe<Array<UserAppsConnectFieldInput>>
}

export type UserConnectOrCreateInput = {
  apps?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
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
  apps?: Maybe<UserAppsFieldInput>
}

export type UserDeleteInput = {
  apps?: Maybe<Array<UserAppsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: Maybe<Array<UserAppsDisconnectFieldInput>>
}

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<UserSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UserRelationInput = {
  apps?: Maybe<Array<UserAppsCreateFieldInput>>
}

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: Maybe<SortDirection>
  auth0Id?: Maybe<SortDirection>
  email?: Maybe<SortDirection>
}

export type UserUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type UserUpdateInput = {
  auth0Id?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  apps?: Maybe<Array<UserAppsUpdateFieldInput>>
}

export type UserWhere = {
  OR?: Maybe<Array<UserWhere>>
  AND?: Maybe<Array<UserWhere>>
  id?: Maybe<Scalars['ID']>
  id_NOT?: Maybe<Scalars['ID']>
  id_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_NOT_IN?: Maybe<Array<Maybe<Scalars['ID']>>>
  id_CONTAINS?: Maybe<Scalars['ID']>
  id_NOT_CONTAINS?: Maybe<Scalars['ID']>
  id_STARTS_WITH?: Maybe<Scalars['ID']>
  id_NOT_STARTS_WITH?: Maybe<Scalars['ID']>
  id_ENDS_WITH?: Maybe<Scalars['ID']>
  id_NOT_ENDS_WITH?: Maybe<Scalars['ID']>
  auth0Id?: Maybe<Scalars['String']>
  auth0Id_NOT?: Maybe<Scalars['String']>
  auth0Id_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  auth0Id_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  auth0Id_CONTAINS?: Maybe<Scalars['String']>
  auth0Id_NOT_CONTAINS?: Maybe<Scalars['String']>
  auth0Id_STARTS_WITH?: Maybe<Scalars['String']>
  auth0Id_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  auth0Id_ENDS_WITH?: Maybe<Scalars['String']>
  auth0Id_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_NOT?: Maybe<Scalars['String']>
  email_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  email_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  email_CONTAINS?: Maybe<Scalars['String']>
  email_NOT_CONTAINS?: Maybe<Scalars['String']>
  email_STARTS_WITH?: Maybe<Scalars['String']>
  email_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  email_ENDS_WITH?: Maybe<Scalars['String']>
  email_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  apps?: Maybe<AppWhere>
  apps_NOT?: Maybe<AppWhere>
  appsAggregate?: Maybe<UserAppsAggregateInput>
  appsConnection?: Maybe<UserAppsConnectionWhere>
  appsConnection_NOT?: Maybe<UserAppsConnectionWhere>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface EdgeAggregateInput {
  count?: boolean
  source?: StringAggregateInput
  target?: StringAggregateInput
}

export declare class EdgeModel {
  public find(args?: {
    where?: EdgeWhere

    options?: EdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Edge>>

  public count(args?: { where?: EdgeWhere }): Promise<number>

  public create(args: {
    input: Array<EdgeCreateInput>
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

    aggregate: EdgeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<EdgeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface UserAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  auth0Id?: StringAggregateInput
  email?: StringAggregateInput
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere

    options?: UserOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<User>>

  public count(args?: { where?: UserWhere }): Promise<number>

  public create(args: {
    input: Array<UserCreateInput>
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

    aggregate: UserAggregateInput
    context?: any
    rootValue?: any
  }): Promise<UserAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface AppAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class AppModel {
  public find(args?: {
    where?: AppWhere

    options?: AppOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<App>>

  public count(args?: { where?: AppWhere }): Promise<number>

  public create(args: {
    input: Array<AppCreateInput>
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

    aggregate: AppAggregateInput
    context?: any
    rootValue?: any
  }): Promise<AppAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface AtomAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class AtomModel {
  public find(args?: {
    where?: AtomWhere

    options?: AtomOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Atom>>

  public count(args?: { where?: AtomWhere }): Promise<number>

  public create(args: {
    input: Array<AtomCreateInput>
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

    aggregate: AtomAggregateInput
    context?: any
    rootValue?: any
  }): Promise<AtomAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface CreateInfoAggregateInput {
  count?: boolean
  bookmark?: StringAggregateInput
  nodesCreated?: IntAggregateInput
  relationshipsCreated?: IntAggregateInput
}

export declare class CreateInfoModel {
  public find(args?: {
    where?: CreateInfoWhere

    options?: CreateInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<CreateInfo>>

  public count(args?: { where?: CreateInfoWhere }): Promise<number>

  public create(args: {
    input: Array<CreateInfoCreateInput>
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

    aggregate: CreateInfoAggregateInput
    context?: any
    rootValue?: any
  }): Promise<CreateInfoAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ImportAtomsMutationResponseAggregateInput {
  count?: boolean
}

export declare class ImportAtomsMutationResponseModel {
  public find(args?: {
    where?: ImportAtomsMutationResponseWhere

    options?: ImportAtomsMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ImportAtomsMutationResponse>>

  public count(args?: {
    where?: ImportAtomsMutationResponseWhere
  }): Promise<number>

  public create(args: {
    input: Array<ImportAtomsMutationResponseCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateImportAtomsMutationResponsesMutationResponse>

  public update(args: {
    where?: ImportAtomsMutationResponseWhere
    update?: ImportAtomsMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateImportAtomsMutationResponsesMutationResponse>

  public delete(args: {
    where?: ImportAtomsMutationResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: ImportAtomsMutationResponseWhere

    aggregate: ImportAtomsMutationResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ImportAtomsMutationResponseAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PageAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class PageModel {
  public find(args?: {
    where?: PageWhere

    options?: PageOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Page>>

  public count(args?: { where?: PageWhere }): Promise<number>

  public create(args: {
    input: Array<PageCreateInput>
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

    aggregate: PageAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PageAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DeleteFieldResponseAggregateInput {
  count?: boolean
  deletedEdgesCount?: IntAggregateInput
}

export declare class DeleteFieldResponseModel {
  public find(args?: {
    where?: DeleteFieldResponseWhere

    options?: DeleteFieldResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<DeleteFieldResponse>>

  public count(args?: { where?: DeleteFieldResponseWhere }): Promise<number>

  public create(args: {
    input: Array<DeleteFieldResponseCreateInput>
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

    aggregate: DeleteFieldResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<DeleteFieldResponseAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TypeReferenceAggregateInput {
  count?: boolean
  name?: StringAggregateInput
  label?: StringAggregateInput
}

export declare class TypeReferenceModel {
  public find(args?: {
    where?: TypeReferenceWhere

    options?: TypeReferenceOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TypeReference>>

  public count(args?: { where?: TypeReferenceWhere }): Promise<number>

  public create(args: {
    input: Array<TypeReferenceCreateInput>
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

    aggregate: TypeReferenceAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TypeReferenceAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface InterfaceTypeEdgeAggregateInput {
  count?: boolean
  source?: StringAggregateInput
  target?: StringAggregateInput
  key?: StringAggregateInput
  name?: StringAggregateInput
  description?: StringAggregateInput
}

export declare class InterfaceTypeEdgeModel {
  public find(args?: {
    where?: InterfaceTypeEdgeWhere

    options?: InterfaceTypeEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<InterfaceTypeEdge>>

  public count(args?: { where?: InterfaceTypeEdgeWhere }): Promise<number>

  public create(args: {
    input: Array<InterfaceTypeEdgeCreateInput>
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

    aggregate: InterfaceTypeEdgeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeEdgeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TypeGraphAggregateInput {
  count?: boolean
}

export declare class TypeGraphModel {
  public find(args?: {
    where?: TypeGraphWhere

    options?: TypeGraphOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TypeGraph>>

  public count(args?: { where?: TypeGraphWhere }): Promise<number>

  public create(args: {
    input: Array<TypeGraphCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTypeGraphsMutationResponse>

  public update(args: {
    where?: TypeGraphWhere
    update?: TypeGraphUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTypeGraphsMutationResponse>

  public delete(args: {
    where?: TypeGraphWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: TypeGraphWhere

    aggregate: TypeGraphAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TypeGraphAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PrimitiveTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class PrimitiveTypeModel {
  public find(args?: {
    where?: PrimitiveTypeWhere

    options?: PrimitiveTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<PrimitiveType>>

  public count(args?: { where?: PrimitiveTypeWhere }): Promise<number>

  public create(args: {
    input: Array<PrimitiveTypeCreateInput>
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

    aggregate: PrimitiveTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PrimitiveTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ArrayTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class ArrayTypeModel {
  public find(args?: {
    where?: ArrayTypeWhere

    options?: ArrayTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ArrayType>>

  public count(args?: { where?: ArrayTypeWhere }): Promise<number>

  public create(args: {
    input: Array<ArrayTypeCreateInput>
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

    aggregate: ArrayTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ArrayTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface UnionTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class UnionTypeModel {
  public find(args?: {
    where?: UnionTypeWhere

    options?: UnionTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<UnionType>>

  public count(args?: { where?: UnionTypeWhere }): Promise<number>

  public create(args: {
    input: Array<UnionTypeCreateInput>
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

    aggregate: UnionTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<UnionTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface InterfaceTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class InterfaceTypeModel {
  public find(args?: {
    where?: InterfaceTypeWhere

    options?: InterfaceTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<InterfaceType>>

  public count(args?: { where?: InterfaceTypeWhere }): Promise<number>

  public create(args: {
    input: Array<InterfaceTypeCreateInput>
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

    aggregate: InterfaceTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<InterfaceTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ElementTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class ElementTypeModel {
  public find(args?: {
    where?: ElementTypeWhere

    options?: ElementTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ElementType>>

  public count(args?: { where?: ElementTypeWhere }): Promise<number>

  public create(args: {
    input: Array<ElementTypeCreateInput>
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

    aggregate: ElementTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ElementTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface RenderPropsTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class RenderPropsTypeModel {
  public find(args?: {
    where?: RenderPropsTypeWhere

    options?: RenderPropsTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<RenderPropsType>>

  public count(args?: { where?: RenderPropsTypeWhere }): Promise<number>

  public create(args: {
    input: Array<RenderPropsTypeCreateInput>
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

    aggregate: RenderPropsTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<RenderPropsTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface ReactNodeTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class ReactNodeTypeModel {
  public find(args?: {
    where?: ReactNodeTypeWhere

    options?: ReactNodeTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ReactNodeType>>

  public count(args?: { where?: ReactNodeTypeWhere }): Promise<number>

  public create(args: {
    input: Array<ReactNodeTypeCreateInput>
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

    aggregate: ReactNodeTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ReactNodeTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface EnumTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class EnumTypeModel {
  public find(args?: {
    where?: EnumTypeWhere

    options?: EnumTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<EnumType>>

  public count(args?: { where?: EnumTypeWhere }): Promise<number>

  public create(args: {
    input: Array<EnumTypeCreateInput>
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

    aggregate: EnumTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface EnumTypeValueAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
  value?: StringAggregateInput
}

export declare class EnumTypeValueModel {
  public find(args?: {
    where?: EnumTypeValueWhere

    options?: EnumTypeValueOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<EnumTypeValue>>

  public count(args?: { where?: EnumTypeValueWhere }): Promise<number>

  public create(args: {
    input: Array<EnumTypeValueCreateInput>
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

    aggregate: EnumTypeValueAggregateInput
    context?: any
    rootValue?: any
  }): Promise<EnumTypeValueAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface LambdaTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class LambdaTypeModel {
  public find(args?: {
    where?: LambdaTypeWhere

    options?: LambdaTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<LambdaType>>

  public count(args?: { where?: LambdaTypeWhere }): Promise<number>

  public create(args: {
    input: Array<LambdaTypeCreateInput>
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

    aggregate: LambdaTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<LambdaTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface PageTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class PageTypeModel {
  public find(args?: {
    where?: PageTypeWhere

    options?: PageTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<PageType>>

  public count(args?: { where?: PageTypeWhere }): Promise<number>

  public create(args: {
    input: Array<PageTypeCreateInput>
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

    aggregate: PageTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PageTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface AppTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class AppTypeModel {
  public find(args?: {
    where?: AppTypeWhere

    options?: AppTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<AppType>>

  public count(args?: { where?: AppTypeWhere }): Promise<number>

  public create(args: {
    input: Array<AppTypeCreateInput>
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

    aggregate: AppTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<AppTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface MonacoTypeAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class MonacoTypeModel {
  public find(args?: {
    where?: MonacoTypeWhere

    options?: MonacoTypeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<MonacoType>>

  public count(args?: { where?: MonacoTypeWhere }): Promise<number>

  public create(args: {
    input: Array<MonacoTypeCreateInput>
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

    aggregate: MonacoTypeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<MonacoTypeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere

    options?: TagOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Tag>>

  public count(args?: { where?: TagWhere }): Promise<number>

  public create(args: {
    input: Array<TagCreateInput>
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

    aggregate: TagAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagEdgeAggregateInput {
  count?: boolean
  source?: IdAggregateInput
  target?: IdAggregateInput
}

export declare class TagEdgeModel {
  public find(args?: {
    where?: TagEdgeWhere

    options?: TagEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TagEdge>>

  public count(args?: { where?: TagEdgeWhere }): Promise<number>

  public create(args: {
    input: Array<TagEdgeCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateTagEdgesMutationResponse>

  public update(args: {
    where?: TagEdgeWhere
    update?: TagEdgeUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateTagEdgesMutationResponse>

  public delete(args: {
    where?: TagEdgeWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: TagEdgeWhere

    aggregate: TagEdgeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagEdgeAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface TagGraphAggregateInput {
  count?: boolean
}

export declare class TagGraphModel {
  public find(args?: {
    where?: TagGraphWhere

    options?: TagGraphOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TagGraph>>

  public count(args?: { where?: TagGraphWhere }): Promise<number>

  public create(args: {
    input: Array<TagGraphCreateInput>
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

    aggregate: TagGraphAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagGraphAggregateSelection>
}

export interface StringAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IdAggregateInput {
  shortest?: boolean
  longest?: boolean
}
export interface IntAggregateInput {
  max?: boolean
  min?: boolean
  average?: boolean
  sum?: boolean
}
export interface DateTimeAggregateInput {
  min?: boolean
  max?: boolean
}
export interface ElementAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
  ownerId?: StringAggregateInput
  createdAt?: DateTimeAggregateInput
  updatedAt?: DateTimeAggregateInput
}

export declare class ElementModel {
  public find(args?: {
    where?: ElementWhere

    options?: ElementOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Element>>

  public count(args?: { where?: ElementWhere }): Promise<number>

  public create(args: {
    input: Array<ElementCreateInput>
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

    aggregate: ElementAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ElementAggregateSelection>
}

export interface ModelMap {
  Edge: EdgeModel
  User: UserModel
  App: AppModel
  Atom: AtomModel
  CreateInfo: CreateInfoModel
  ImportAtomsMutationResponse: ImportAtomsMutationResponseModel
  Page: PageModel
  DeleteFieldResponse: DeleteFieldResponseModel
  TypeReference: TypeReferenceModel
  InterfaceTypeEdge: InterfaceTypeEdgeModel
  TypeGraph: TypeGraphModel
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
  Tag: TagModel
  TagEdge: TagEdgeModel
  TagGraph: TagGraphModel
  Element: ElementModel
}
