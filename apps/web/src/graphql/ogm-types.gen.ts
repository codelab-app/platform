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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
}

export type Query = {
  __typename?: 'Query'
  elementGraph: ElementGraph
  resetDataMutationResponses: Array<ResetDataMutationResponse>
  resetDataMutationResponsesCount: Scalars['Int']
  resetDataMutationResponsesAggregate: ResetDataMutationResponseAggregateSelection
  importDataMutationResponses: Array<ImportDataMutationResponse>
  importDataMutationResponsesCount: Scalars['Int']
  importDataMutationResponsesAggregate: ImportDataMutationResponseAggregateSelection
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
  tagGraphOptions: Array<TagGraphOptions>
  tagGraphOptionsCount: Scalars['Int']
  tagGraphOptionsAggregate: TagGraphOptionsAggregateSelection
  tagEdges: Array<TagEdge>
  tagEdgesCount: Scalars['Int']
  tagEdgesAggregate: TagEdgeAggregateSelection
  tagGraphs?: Maybe<TagGraph>
  tagGraphsCount: Scalars['Int']
  tagGraphsAggregate: TagGraphAggregateSelection
  elementEdges: Array<ElementEdge>
  elementEdgesCount: Scalars['Int']
  elementEdgesAggregate: ElementEdgeAggregateSelection
  elementGraphs: Array<ElementGraph>
  elementGraphsCount: Scalars['Int']
  elementGraphsAggregate: ElementGraphAggregateSelection
  props: Array<Prop>
  propsCount: Scalars['Int']
  propsAggregate: PropAggregateSelection
  hooks: Array<Hook>
  hooksCount: Scalars['Int']
  hooksAggregate: HookAggregateSelection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsCount: Scalars['Int']
  propMapBindingsAggregate: PropMapBindingAggregateSelection
  elements: Array<Element>
  elementsCount: Scalars['Int']
  elementsAggregate: ElementAggregateSelection
  duplicateElementMutationResponses: Array<DuplicateElementMutationResponse>
  duplicateElementMutationResponsesCount: Scalars['Int']
  duplicateElementMutationResponsesAggregate: DuplicateElementMutationResponseAggregateSelection
  deleteElementsInfos: Array<DeleteElementsInfo>
  deleteElementsInfosCount: Scalars['Int']
  deleteElementsInfosAggregate: DeleteElementsInfoAggregateSelection
  components: Array<Component>
  componentsCount: Scalars['Int']
  componentsAggregate: ComponentAggregateSelection
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

export type QueryResetDataMutationResponsesArgs = {
  where?: Maybe<ResetDataMutationResponseWhere>
  options?: Maybe<ResetDataMutationResponseOptions>
}

export type QueryResetDataMutationResponsesCountArgs = {
  where?: Maybe<ResetDataMutationResponseWhere>
}

export type QueryResetDataMutationResponsesAggregateArgs = {
  where?: Maybe<ResetDataMutationResponseWhere>
}

export type QueryImportDataMutationResponsesArgs = {
  where?: Maybe<ImportDataMutationResponseWhere>
  options?: Maybe<ImportDataMutationResponseOptions>
}

export type QueryImportDataMutationResponsesCountArgs = {
  where?: Maybe<ImportDataMutationResponseWhere>
}

export type QueryImportDataMutationResponsesAggregateArgs = {
  where?: Maybe<ImportDataMutationResponseWhere>
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

export type QueryTagGraphOptionsArgs = {
  where?: Maybe<TagGraphOptionsWhere>
  options?: Maybe<TagGraphOptionsOptions>
}

export type QueryTagGraphOptionsCountArgs = {
  where?: Maybe<TagGraphOptionsWhere>
}

export type QueryTagGraphOptionsAggregateArgs = {
  where?: Maybe<TagGraphOptionsWhere>
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

export type QueryElementEdgesArgs = {
  where?: Maybe<ElementEdgeWhere>
  options?: Maybe<ElementEdgeOptions>
}

export type QueryElementEdgesCountArgs = {
  where?: Maybe<ElementEdgeWhere>
}

export type QueryElementEdgesAggregateArgs = {
  where?: Maybe<ElementEdgeWhere>
}

export type QueryElementGraphsArgs = {
  where?: Maybe<ElementGraphWhere>
  options?: Maybe<ElementGraphOptions>
}

export type QueryElementGraphsCountArgs = {
  where?: Maybe<ElementGraphWhere>
}

export type QueryElementGraphsAggregateArgs = {
  where?: Maybe<ElementGraphWhere>
}

export type QueryPropsArgs = {
  where?: Maybe<PropWhere>
  options?: Maybe<PropOptions>
}

export type QueryPropsCountArgs = {
  where?: Maybe<PropWhere>
}

export type QueryPropsAggregateArgs = {
  where?: Maybe<PropWhere>
}

export type QueryHooksArgs = {
  where?: Maybe<HookWhere>
  options?: Maybe<HookOptions>
}

export type QueryHooksCountArgs = {
  where?: Maybe<HookWhere>
}

export type QueryHooksAggregateArgs = {
  where?: Maybe<HookWhere>
}

export type QueryPropMapBindingsArgs = {
  where?: Maybe<PropMapBindingWhere>
  options?: Maybe<PropMapBindingOptions>
}

export type QueryPropMapBindingsCountArgs = {
  where?: Maybe<PropMapBindingWhere>
}

export type QueryPropMapBindingsAggregateArgs = {
  where?: Maybe<PropMapBindingWhere>
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

export type QueryDuplicateElementMutationResponsesArgs = {
  where?: Maybe<DuplicateElementMutationResponseWhere>
  options?: Maybe<DuplicateElementMutationResponseOptions>
}

export type QueryDuplicateElementMutationResponsesCountArgs = {
  where?: Maybe<DuplicateElementMutationResponseWhere>
}

export type QueryDuplicateElementMutationResponsesAggregateArgs = {
  where?: Maybe<DuplicateElementMutationResponseWhere>
}

export type QueryDeleteElementsInfosArgs = {
  where?: Maybe<DeleteElementsInfoWhere>
  options?: Maybe<DeleteElementsInfoOptions>
}

export type QueryDeleteElementsInfosCountArgs = {
  where?: Maybe<DeleteElementsInfoWhere>
}

export type QueryDeleteElementsInfosAggregateArgs = {
  where?: Maybe<DeleteElementsInfoWhere>
}

export type QueryComponentsArgs = {
  where?: Maybe<ComponentWhere>
  options?: Maybe<ComponentOptions>
}

export type QueryComponentsCountArgs = {
  where?: Maybe<ComponentWhere>
}

export type QueryComponentsAggregateArgs = {
  where?: Maybe<ComponentWhere>
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
  resetData?: Maybe<ResetDataMutationResponse>
  importAdminData?: Maybe<ImportDataMutationResponse>
  importAtoms?: Maybe<ImportAtomsMutationResponse>
  upsertFieldEdge: InterfaceTypeEdge
  deleteFieldEdge: DeleteFieldResponse
  duplicateElement: DuplicateElementMutationResponse
  deleteElementsSubgraph: DeleteElementsInfo
  createResetDataMutationResponses: CreateResetDataMutationResponsesMutationResponse
  deleteResetDataMutationResponses: DeleteInfo
  updateResetDataMutationResponses: UpdateResetDataMutationResponsesMutationResponse
  createImportDataMutationResponses: CreateImportDataMutationResponsesMutationResponse
  deleteImportDataMutationResponses: DeleteInfo
  updateImportDataMutationResponses: UpdateImportDataMutationResponsesMutationResponse
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
  createTagGraphOptions: CreateTagGraphOptionsMutationResponse
  deleteTagGraphOptions: DeleteInfo
  updateTagGraphOptions: UpdateTagGraphOptionsMutationResponse
  createTagEdges: CreateTagEdgesMutationResponse
  deleteTagEdges: DeleteInfo
  updateTagEdges: UpdateTagEdgesMutationResponse
  createTagGraphs: CreateTagGraphsMutationResponse
  deleteTagGraphs: DeleteInfo
  updateTagGraphs: UpdateTagGraphsMutationResponse
  createElementEdges: CreateElementEdgesMutationResponse
  deleteElementEdges: DeleteInfo
  updateElementEdges: UpdateElementEdgesMutationResponse
  createElementGraphs: CreateElementGraphsMutationResponse
  deleteElementGraphs: DeleteInfo
  updateElementGraphs: UpdateElementGraphsMutationResponse
  createProps: CreatePropsMutationResponse
  deleteProps: DeleteInfo
  updateProps: UpdatePropsMutationResponse
  createHooks: CreateHooksMutationResponse
  deleteHooks: DeleteInfo
  updateHooks: UpdateHooksMutationResponse
  createPropMapBindings: CreatePropMapBindingsMutationResponse
  deletePropMapBindings: DeleteInfo
  updatePropMapBindings: UpdatePropMapBindingsMutationResponse
  createElements: CreateElementsMutationResponse
  deleteElements: DeleteInfo
  updateElements: UpdateElementsMutationResponse
  createDuplicateElementMutationResponses: CreateDuplicateElementMutationResponsesMutationResponse
  deleteDuplicateElementMutationResponses: DeleteInfo
  updateDuplicateElementMutationResponses: UpdateDuplicateElementMutationResponsesMutationResponse
  createDeleteElementsInfos: CreateDeleteElementsInfosMutationResponse
  deleteDeleteElementsInfos: DeleteInfo
  updateDeleteElementsInfos: UpdateDeleteElementsInfosMutationResponse
  createComponents: CreateComponentsMutationResponse
  deleteComponents: DeleteInfo
  updateComponents: UpdateComponentsMutationResponse
}

export type MutationImportAdminDataArgs = {
  input: ImportAdminDataInput
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

export type MutationDuplicateElementArgs = {
  input: DuplicateElementInput
}

export type MutationDeleteElementsSubgraphArgs = {
  delete?: Maybe<ElementDeleteInput>
  where?: Maybe<ElementWhere>
}

export type MutationCreateResetDataMutationResponsesArgs = {
  input: Array<ResetDataMutationResponseCreateInput>
}

export type MutationDeleteResetDataMutationResponsesArgs = {
  where?: Maybe<ResetDataMutationResponseWhere>
}

export type MutationUpdateResetDataMutationResponsesArgs = {
  where?: Maybe<ResetDataMutationResponseWhere>
  update?: Maybe<ResetDataMutationResponseUpdateInput>
}

export type MutationCreateImportDataMutationResponsesArgs = {
  input: Array<ImportDataMutationResponseCreateInput>
}

export type MutationDeleteImportDataMutationResponsesArgs = {
  where?: Maybe<ImportDataMutationResponseWhere>
}

export type MutationUpdateImportDataMutationResponsesArgs = {
  where?: Maybe<ImportDataMutationResponseWhere>
  update?: Maybe<ImportDataMutationResponseUpdateInput>
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

export type MutationCreateTagGraphOptionsArgs = {
  input: Array<TagGraphOptionsCreateInput>
}

export type MutationDeleteTagGraphOptionsArgs = {
  where?: Maybe<TagGraphOptionsWhere>
}

export type MutationUpdateTagGraphOptionsArgs = {
  where?: Maybe<TagGraphOptionsWhere>
  update?: Maybe<TagGraphOptionsUpdateInput>
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

export type MutationCreateElementEdgesArgs = {
  input: Array<ElementEdgeCreateInput>
}

export type MutationDeleteElementEdgesArgs = {
  where?: Maybe<ElementEdgeWhere>
}

export type MutationUpdateElementEdgesArgs = {
  where?: Maybe<ElementEdgeWhere>
  update?: Maybe<ElementEdgeUpdateInput>
}

export type MutationCreateElementGraphsArgs = {
  input: Array<ElementGraphCreateInput>
}

export type MutationDeleteElementGraphsArgs = {
  where?: Maybe<ElementGraphWhere>
}

export type MutationUpdateElementGraphsArgs = {
  where?: Maybe<ElementGraphWhere>
  update?: Maybe<ElementGraphUpdateInput>
}

export type MutationCreatePropsArgs = {
  input: Array<PropCreateInput>
}

export type MutationDeletePropsArgs = {
  where?: Maybe<PropWhere>
}

export type MutationUpdatePropsArgs = {
  where?: Maybe<PropWhere>
  update?: Maybe<PropUpdateInput>
}

export type MutationCreateHooksArgs = {
  input: Array<HookCreateInput>
}

export type MutationDeleteHooksArgs = {
  where?: Maybe<HookWhere>
  delete?: Maybe<HookDeleteInput>
}

export type MutationUpdateHooksArgs = {
  where?: Maybe<HookWhere>
  update?: Maybe<HookUpdateInput>
  connect?: Maybe<HookConnectInput>
  disconnect?: Maybe<HookDisconnectInput>
  create?: Maybe<HookRelationInput>
  delete?: Maybe<HookDeleteInput>
  connectOrCreate?: Maybe<HookConnectOrCreateInput>
}

export type MutationCreatePropMapBindingsArgs = {
  input: Array<PropMapBindingCreateInput>
}

export type MutationDeletePropMapBindingsArgs = {
  where?: Maybe<PropMapBindingWhere>
  delete?: Maybe<PropMapBindingDeleteInput>
}

export type MutationUpdatePropMapBindingsArgs = {
  where?: Maybe<PropMapBindingWhere>
  update?: Maybe<PropMapBindingUpdateInput>
  connect?: Maybe<PropMapBindingConnectInput>
  disconnect?: Maybe<PropMapBindingDisconnectInput>
  create?: Maybe<PropMapBindingRelationInput>
  delete?: Maybe<PropMapBindingDeleteInput>
  connectOrCreate?: Maybe<PropMapBindingConnectOrCreateInput>
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

export type MutationCreateDuplicateElementMutationResponsesArgs = {
  input: Array<DuplicateElementMutationResponseCreateInput>
}

export type MutationDeleteDuplicateElementMutationResponsesArgs = {
  where?: Maybe<DuplicateElementMutationResponseWhere>
}

export type MutationUpdateDuplicateElementMutationResponsesArgs = {
  where?: Maybe<DuplicateElementMutationResponseWhere>
  update?: Maybe<DuplicateElementMutationResponseUpdateInput>
}

export type MutationCreateDeleteElementsInfosArgs = {
  input: Array<DeleteElementsInfoCreateInput>
}

export type MutationDeleteDeleteElementsInfosArgs = {
  where?: Maybe<DeleteElementsInfoWhere>
}

export type MutationUpdateDeleteElementsInfosArgs = {
  where?: Maybe<DeleteElementsInfoWhere>
  update?: Maybe<DeleteElementsInfoUpdateInput>
}

export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>
}

export type MutationDeleteComponentsArgs = {
  where?: Maybe<ComponentWhere>
  delete?: Maybe<ComponentDeleteInput>
}

export type MutationUpdateComponentsArgs = {
  where?: Maybe<ComponentWhere>
  update?: Maybe<ComponentUpdateInput>
  connect?: Maybe<ComponentConnectInput>
  disconnect?: Maybe<ComponentDisconnectInput>
  create?: Maybe<ComponentRelationInput>
  delete?: Maybe<ComponentDeleteInput>
  connectOrCreate?: Maybe<ComponentConnectOrCreateInput>
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

export type ParentOfElement = {
  order?: Maybe<Scalars['Int']>
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
  pages?: Maybe<Array<Page>>
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
  tags?: Maybe<Array<Tag>>
  tagsAggregate?: Maybe<AtomTagTagsAggregationSelection>
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  tagsConnection: AtomTagsConnection
  apiConnection: AtomApiConnection
}

export type AtomTagsArgs = {
  where?: Maybe<TagWhere>
  options?: Maybe<TagOptions>
}

export type AtomTagsAggregateArgs = {
  where?: Maybe<TagWhere>
}

export type AtomApiArgs = {
  where?: Maybe<InterfaceTypeWhere>
  options?: Maybe<InterfaceTypeOptions>
}

export type AtomApiAggregateArgs = {
  where?: Maybe<InterfaceTypeWhere>
}

export type AtomTagsConnectionArgs = {
  where?: Maybe<AtomTagsConnectionWhere>
  sort?: Maybe<Array<AtomTagsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
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
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ComponentRootElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ComponentOwnerArgs = {
  where?: Maybe<UserWhere>
  options?: Maybe<UserOptions>
}

export type ComponentOwnerAggregateArgs = {
  where?: Maybe<UserWhere>
}

export type ComponentRootElementConnectionArgs = {
  where?: Maybe<ComponentRootElementConnectionWhere>
  sort?: Maybe<Array<ComponentRootElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ComponentOwnerConnectionArgs = {
  where?: Maybe<ComponentOwnerConnectionWhere>
  sort?: Maybe<Array<ComponentOwnerConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ComponentAggregateSelection = {
  __typename?: 'ComponentAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
}

export type ComponentElementRootElementAggregationSelection = {
  __typename?: 'ComponentElementRootElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ComponentElementRootElementNodeAggregateSelection>
}

export type ComponentElementRootElementNodeAggregateSelection = {
  __typename?: 'ComponentElementRootElementNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
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
  id: IdAggregateSelection
  auth0Id: StringAggregateSelection
  email: StringAggregateSelection
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

export type CreateDuplicateElementMutationResponsesMutationResponse = {
  __typename?: 'CreateDuplicateElementMutationResponsesMutationResponse'
  info: CreateInfo
  duplicateElementMutationResponses: Array<DuplicateElementMutationResponse>
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

export type CreateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'CreateImportAtomsMutationResponsesMutationResponse'
  info: CreateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
}

export type CreateImportDataMutationResponsesMutationResponse = {
  __typename?: 'CreateImportDataMutationResponsesMutationResponse'
  info: CreateInfo
  importDataMutationResponses: Array<ImportDataMutationResponse>
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

export type CreateResetDataMutationResponsesMutationResponse = {
  __typename?: 'CreateResetDataMutationResponsesMutationResponse'
  info: CreateInfo
  resetDataMutationResponses: Array<ResetDataMutationResponse>
}

export type CreateTagEdgesMutationResponse = {
  __typename?: 'CreateTagEdgesMutationResponse'
  info: CreateInfo
  tagEdges: Array<TagEdge>
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

export type DeleteElementsInfo = {
  __typename?: 'DeleteElementsInfo'
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
  deletedIds?: Maybe<Array<Scalars['String']>>
}

export type DeleteElementsInfoAggregateSelection = {
  __typename?: 'DeleteElementsInfoAggregateSelection'
  count: Scalars['Int']
  nodesDeleted: IntAggregateSelection
  relationshipsDeleted: IntAggregateSelection
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

export type DuplicateElementMutationResponse = {
  __typename?: 'DuplicateElementMutationResponse'
  elements: Array<Element>
}

export type DuplicateElementMutationResponseAggregateSelection = {
  __typename?: 'DuplicateElementMutationResponseAggregateSelection'
  count: Scalars['Int']
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
  name?: Maybe<Scalars['String']>
  css?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  children?: Maybe<Array<Element>>
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
  hooks?: Maybe<Array<Hook>>
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>
  propMapBindings?: Maybe<Array<PropMapBinding>>
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
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementChildrenAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementPropsArgs = {
  where?: Maybe<PropWhere>
  options?: Maybe<PropOptions>
}

export type ElementPropsAggregateArgs = {
  where?: Maybe<PropWhere>
}

export type ElementParentElementArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type ElementParentElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type ElementInstanceOfComponentArgs = {
  where?: Maybe<ComponentWhere>
  options?: Maybe<ComponentOptions>
}

export type ElementInstanceOfComponentAggregateArgs = {
  where?: Maybe<ComponentWhere>
}

export type ElementComponentArgs = {
  where?: Maybe<ComponentWhere>
  options?: Maybe<ComponentOptions>
}

export type ElementComponentAggregateArgs = {
  where?: Maybe<ComponentWhere>
}

export type ElementAtomArgs = {
  where?: Maybe<AtomWhere>
  options?: Maybe<AtomOptions>
}

export type ElementAtomAggregateArgs = {
  where?: Maybe<AtomWhere>
}

export type ElementHooksArgs = {
  where?: Maybe<HookWhere>
  options?: Maybe<HookOptions>
}

export type ElementHooksAggregateArgs = {
  where?: Maybe<HookWhere>
}

export type ElementPropMapBindingsArgs = {
  where?: Maybe<PropMapBindingWhere>
  options?: Maybe<PropMapBindingOptions>
}

export type ElementPropMapBindingsAggregateArgs = {
  where?: Maybe<PropMapBindingWhere>
}

export type ElementChildrenConnectionArgs = {
  where?: Maybe<ElementChildrenConnectionWhere>
  sort?: Maybe<Array<ElementChildrenConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementPropsConnectionArgs = {
  where?: Maybe<ElementPropsConnectionWhere>
  sort?: Maybe<Array<ElementPropsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementParentElementConnectionArgs = {
  where?: Maybe<ElementParentElementConnectionWhere>
  sort?: Maybe<Array<ElementParentElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementInstanceOfComponentConnectionArgs = {
  where?: Maybe<ElementInstanceOfComponentConnectionWhere>
  sort?: Maybe<Array<ElementInstanceOfComponentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementComponentConnectionArgs = {
  where?: Maybe<ElementComponentConnectionWhere>
  sort?: Maybe<Array<ElementComponentConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementAtomConnectionArgs = {
  where?: Maybe<ElementAtomConnectionWhere>
  sort?: Maybe<Array<ElementAtomConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementHooksConnectionArgs = {
  where?: Maybe<ElementHooksConnectionWhere>
  sort?: Maybe<Array<ElementHooksConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementPropMapBindingsConnectionArgs = {
  where?: Maybe<ElementPropMapBindingsConnectionWhere>
  sort?: Maybe<Array<ElementPropMapBindingsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type ElementAggregateSelection = {
  __typename?: 'ElementAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
}

export type ElementAtomAtomAggregationSelection = {
  __typename?: 'ElementAtomAtomAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementAtomAtomNodeAggregateSelection>
}

export type ElementAtomAtomNodeAggregateSelection = {
  __typename?: 'ElementAtomAtomNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  source: StringAggregateSelection
  target: StringAggregateSelection
  order: IntAggregateSelection
}

export type ElementElementChildrenAggregationSelection = {
  __typename?: 'ElementElementChildrenAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
  edge?: Maybe<ElementElementChildrenEdgeAggregateSelection>
}

export type ElementElementChildrenEdgeAggregateSelection = {
  __typename?: 'ElementElementChildrenEdgeAggregateSelection'
  order: IntAggregateSelection
}

export type ElementElementChildrenNodeAggregateSelection = {
  __typename?: 'ElementElementChildrenNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
}

export type ElementElementParentElementAggregationSelection = {
  __typename?: 'ElementElementParentElementAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementElementParentElementNodeAggregateSelection>
  edge?: Maybe<ElementElementParentElementEdgeAggregateSelection>
}

export type ElementElementParentElementEdgeAggregateSelection = {
  __typename?: 'ElementElementParentElementEdgeAggregateSelection'
  order: IntAggregateSelection
}

export type ElementElementParentElementNodeAggregateSelection = {
  __typename?: 'ElementElementParentElementNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
}

export type ElementGraph = {
  __typename?: 'ElementGraph'
  rootId?: Maybe<Scalars['String']>
  edges: Array<ElementEdge>
  vertices: Array<Element>
}

export type ElementGraphAggregateSelection = {
  __typename?: 'ElementGraphAggregateSelection'
  count: Scalars['Int']
  rootId: StringAggregateSelection
}

export type ElementHookHooksAggregationSelection = {
  __typename?: 'ElementHookHooksAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<ElementHookHooksNodeAggregateSelection>
}

export type ElementHookHooksNodeAggregateSelection = {
  __typename?: 'ElementHookHooksNodeAggregateSelection'
  id: IdAggregateSelection
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
  id: IdAggregateSelection
  sourceKey: StringAggregateSelection
  targetKey: StringAggregateSelection
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
  id: IdAggregateSelection
  data: StringAggregateSelection
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
  where?: Maybe<PropWhere>
  options?: Maybe<PropOptions>
}

export type HookConfigAggregateArgs = {
  where?: Maybe<PropWhere>
}

export type HookElementArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type HookElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type HookConfigConnectionArgs = {
  where?: Maybe<HookConfigConnectionWhere>
  sort?: Maybe<Array<HookConfigConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type HookElementConnectionArgs = {
  where?: Maybe<HookElementConnectionWhere>
  sort?: Maybe<Array<HookElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type HookAggregateSelection = {
  __typename?: 'HookAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
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
  id: IdAggregateSelection
  data: StringAggregateSelection
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

export type ImportDataMutationResponse = {
  __typename?: 'ImportDataMutationResponse'
  result: Scalars['Boolean']
}

export type ImportDataMutationResponseAggregateSelection = {
  __typename?: 'ImportDataMutationResponseAggregateSelection'
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
  apiOfAtoms?: Maybe<Array<Atom>>
  apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>
  fields?: Maybe<Array<TypeBase>>
  ownerConnection: TypeBaseOwnerConnection
  apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection
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
export type InterfaceTypeApiOfAtomsArgs = {
  where?: Maybe<AtomWhere>
  options?: Maybe<AtomOptions>
}

/** Represents an object type with multiple fields */
export type InterfaceTypeApiOfAtomsAggregateArgs = {
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
export type InterfaceTypeApiOfAtomsConnectionArgs = {
  where?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
  sort?: Maybe<Array<InterfaceTypeApiOfAtomsConnectionSort>>
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
  rootElement: Element
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  app: App
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
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
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

export type Prop = {
  __typename?: 'Prop'
  id: Scalars['ID']
  data: Scalars['String']
}

export type PropAggregateSelection = {
  __typename?: 'PropAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  data: StringAggregateSelection
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
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type PropMapBindingElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type PropMapBindingTargetElementArgs = {
  where?: Maybe<ElementWhere>
  options?: Maybe<ElementOptions>
}

export type PropMapBindingTargetElementAggregateArgs = {
  where?: Maybe<ElementWhere>
}

export type PropMapBindingElementConnectionArgs = {
  where?: Maybe<PropMapBindingElementConnectionWhere>
  sort?: Maybe<Array<PropMapBindingElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PropMapBindingTargetElementConnectionArgs = {
  where?: Maybe<PropMapBindingTargetElementConnectionWhere>
  sort?: Maybe<Array<PropMapBindingTargetElementConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type PropMapBindingAggregateSelection = {
  __typename?: 'PropMapBindingAggregateSelection'
  count: Scalars['Int']
  id: IdAggregateSelection
  sourceKey: StringAggregateSelection
  targetKey: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
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
  id: IdAggregateSelection
  name: StringAggregateSelection
  css: StringAggregateSelection
  propTransformationJs: StringAggregateSelection
  renderForEachPropKey: StringAggregateSelection
  renderIfPropKey: StringAggregateSelection
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

export type ResetDataMutationResponse = {
  __typename?: 'ResetDataMutationResponse'
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDataMutationResponseAggregateSelection = {
  __typename?: 'ResetDataMutationResponseAggregateSelection'
  count: Scalars['Int']
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
  children?: Maybe<Array<Tag>>
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

export type TagGraph = {
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

export type TagGraphOptions = {
  __typename?: 'TagGraphOptions'
  sort?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsAggregateSelection = {
  __typename?: 'TagGraphOptionsAggregateSelection'
  count: Scalars['Int']
  sort: IntAggregateSelection
  limit: IntAggregateSelection
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

export type UpdateDuplicateElementMutationResponsesMutationResponse = {
  __typename?: 'UpdateDuplicateElementMutationResponsesMutationResponse'
  info: UpdateInfo
  duplicateElementMutationResponses: Array<DuplicateElementMutationResponse>
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

export type UpdateImportAtomsMutationResponsesMutationResponse = {
  __typename?: 'UpdateImportAtomsMutationResponsesMutationResponse'
  info: UpdateInfo
  importAtomsMutationResponses: Array<ImportAtomsMutationResponse>
}

export type UpdateImportDataMutationResponsesMutationResponse = {
  __typename?: 'UpdateImportDataMutationResponsesMutationResponse'
  info: UpdateInfo
  importDataMutationResponses: Array<ImportDataMutationResponse>
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

export type UpdateResetDataMutationResponsesMutationResponse = {
  __typename?: 'UpdateResetDataMutationResponsesMutationResponse'
  info: UpdateInfo
  resetDataMutationResponses: Array<ResetDataMutationResponse>
}

export type UpdateTagEdgesMutationResponse = {
  __typename?: 'UpdateTagEdgesMutationResponse'
  info: UpdateInfo
  tagEdges: Array<TagEdge>
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
  components?: Maybe<Array<Maybe<Component>>>
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>
  appsConnection: UserAppsConnection
  componentsConnection: UserComponentsConnection
}

export type UserAppsArgs = {
  where?: Maybe<AppWhere>
  options?: Maybe<AppOptions>
}

export type UserAppsAggregateArgs = {
  where?: Maybe<AppWhere>
}

export type UserComponentsArgs = {
  where?: Maybe<ComponentWhere>
  options?: Maybe<ComponentOptions>
}

export type UserComponentsAggregateArgs = {
  where?: Maybe<ComponentWhere>
}

export type UserAppsConnectionArgs = {
  where?: Maybe<UserAppsConnectionWhere>
  sort?: Maybe<Array<UserAppsConnectionSort>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}

export type UserComponentsConnectionArgs = {
  where?: Maybe<UserComponentsConnectionWhere>
  sort?: Maybe<Array<UserComponentsConnectionSort>>
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

export type UserComponentComponentsAggregationSelection = {
  __typename?: 'UserComponentComponentsAggregationSelection'
  count: Scalars['Int']
  node?: Maybe<UserComponentComponentsNodeAggregateSelection>
}

export type UserComponentComponentsNodeAggregateSelection = {
  __typename?: 'UserComponentComponentsNodeAggregateSelection'
  id: IdAggregateSelection
  name: StringAggregateSelection
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
  tags?: Maybe<Array<AtomTagsConnectFieldInput>>
  api?: Maybe<AtomApiConnectFieldInput>
}

export type AtomConnectOrCreateInput = {
  tags?: Maybe<Array<AtomTagsConnectOrCreateFieldInput>>
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
  tags?: Maybe<AtomTagsFieldInput>
  api?: Maybe<AtomApiFieldInput>
}

export type AtomDeleteInput = {
  tags?: Maybe<Array<AtomTagsDeleteFieldInput>>
  api?: Maybe<AtomApiDeleteFieldInput>
}

export type AtomDisconnectInput = {
  tags?: Maybe<Array<AtomTagsDisconnectFieldInput>>
  api?: Maybe<AtomApiDisconnectFieldInput>
}

export type AtomOptions = {
  /** Specify one or more AtomSort objects to sort Atoms by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<AtomSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type AtomRelationInput = {
  tags?: Maybe<Array<AtomTagsCreateFieldInput>>
  api?: Maybe<AtomApiCreateFieldInput>
}

/** Fields to sort Atoms by. The order in which sorts are applied is not guaranteed when specifying many fields in one AtomSort object. */
export type AtomSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  type?: Maybe<SortDirection>
}

export type AtomTagsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<AtomTagsAggregateInput>>
  OR?: Maybe<Array<AtomTagsAggregateInput>>
  node?: Maybe<AtomTagsNodeAggregationWhereInput>
}

export type AtomTagsConnectFieldInput = {
  where?: Maybe<TagConnectWhere>
  connect?: Maybe<Array<TagConnectInput>>
}

export type AtomTagsConnectionSort = {
  node?: Maybe<TagSort>
}

export type AtomTagsConnectionWhere = {
  AND?: Maybe<Array<AtomTagsConnectionWhere>>
  OR?: Maybe<Array<AtomTagsConnectionWhere>>
  node?: Maybe<TagWhere>
  node_NOT?: Maybe<TagWhere>
}

export type AtomTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere
  onCreate: AtomTagsConnectOrCreateFieldInputOnCreate
}

export type AtomTagsConnectOrCreateFieldInputOnCreate = {
  node: TagCreateInput
}

export type AtomTagsCreateFieldInput = {
  node: TagCreateInput
}

export type AtomTagsDeleteFieldInput = {
  where?: Maybe<AtomTagsConnectionWhere>
  delete?: Maybe<TagDeleteInput>
}

export type AtomTagsDisconnectFieldInput = {
  where?: Maybe<AtomTagsConnectionWhere>
  disconnect?: Maybe<TagDisconnectInput>
}

export type AtomTagsFieldInput = {
  create?: Maybe<Array<AtomTagsCreateFieldInput>>
  connect?: Maybe<Array<AtomTagsConnectFieldInput>>
  connectOrCreate?: Maybe<Array<AtomTagsConnectOrCreateFieldInput>>
}

export type AtomTagsNodeAggregationWhereInput = {
  AND?: Maybe<Array<AtomTagsNodeAggregationWhereInput>>
  OR?: Maybe<Array<AtomTagsNodeAggregationWhereInput>>
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

export type AtomTagsUpdateConnectionInput = {
  node?: Maybe<TagUpdateInput>
}

export type AtomTagsUpdateFieldInput = {
  where?: Maybe<AtomTagsConnectionWhere>
  update?: Maybe<AtomTagsUpdateConnectionInput>
  connect?: Maybe<Array<AtomTagsConnectFieldInput>>
  disconnect?: Maybe<Array<AtomTagsDisconnectFieldInput>>
  create?: Maybe<Array<AtomTagsCreateFieldInput>>
  delete?: Maybe<Array<AtomTagsDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<AtomTagsConnectOrCreateFieldInput>>
}

export type AtomUniqueWhere = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type AtomUpdateInput = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<AtomType>
  tags?: Maybe<Array<AtomTagsUpdateFieldInput>>
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
  tags?: Maybe<TagWhere>
  tags_NOT?: Maybe<TagWhere>
  tagsAggregate?: Maybe<AtomTagsAggregateInput>
  api?: Maybe<InterfaceTypeWhere>
  api_NOT?: Maybe<InterfaceTypeWhere>
  apiAggregate?: Maybe<AtomApiAggregateInput>
  tagsConnection?: Maybe<AtomTagsConnectionWhere>
  tagsConnection_NOT?: Maybe<AtomTagsConnectionWhere>
  apiConnection?: Maybe<AtomApiConnectionWhere>
  apiConnection_NOT?: Maybe<AtomApiConnectionWhere>
}

export type ComponentConnectInput = {
  rootElement?: Maybe<ComponentRootElementConnectFieldInput>
  owner?: Maybe<ComponentOwnerConnectFieldInput>
}

export type ComponentConnectOrCreateInput = {
  rootElement?: Maybe<ComponentRootElementConnectOrCreateFieldInput>
  owner?: Maybe<ComponentOwnerConnectOrCreateFieldInput>
}

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere
}

export type ComponentConnectWhere = {
  node: ComponentWhere
}

export type ComponentCreateInput = {
  name: Scalars['String']
  rootElement?: Maybe<ComponentRootElementFieldInput>
  owner?: Maybe<ComponentOwnerFieldInput>
}

export type ComponentDeleteInput = {
  rootElement?: Maybe<ComponentRootElementDeleteFieldInput>
  owner?: Maybe<ComponentOwnerDeleteFieldInput>
}

export type ComponentDisconnectInput = {
  rootElement?: Maybe<ComponentRootElementDisconnectFieldInput>
  owner?: Maybe<ComponentOwnerDisconnectFieldInput>
}

export type ComponentOptions = {
  /** Specify one or more ComponentSort objects to sort Components by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ComponentSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ComponentOwnerAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ComponentOwnerAggregateInput>>
  OR?: Maybe<Array<ComponentOwnerAggregateInput>>
  node?: Maybe<ComponentOwnerNodeAggregationWhereInput>
}

export type ComponentOwnerConnectFieldInput = {
  where?: Maybe<UserConnectWhere>
  connect?: Maybe<UserConnectInput>
}

export type ComponentOwnerConnectionSort = {
  node?: Maybe<UserSort>
}

export type ComponentOwnerConnectionWhere = {
  AND?: Maybe<Array<ComponentOwnerConnectionWhere>>
  OR?: Maybe<Array<ComponentOwnerConnectionWhere>>
  node?: Maybe<UserWhere>
  node_NOT?: Maybe<UserWhere>
}

export type ComponentOwnerConnectOrCreateFieldInput = {
  where: UserConnectOrCreateWhere
  onCreate: ComponentOwnerConnectOrCreateFieldInputOnCreate
}

export type ComponentOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserCreateInput
}

export type ComponentOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type ComponentOwnerDeleteFieldInput = {
  where?: Maybe<ComponentOwnerConnectionWhere>
  delete?: Maybe<UserDeleteInput>
}

export type ComponentOwnerDisconnectFieldInput = {
  where?: Maybe<ComponentOwnerConnectionWhere>
  disconnect?: Maybe<UserDisconnectInput>
}

export type ComponentOwnerFieldInput = {
  create?: Maybe<ComponentOwnerCreateFieldInput>
  connect?: Maybe<ComponentOwnerConnectFieldInput>
  connectOrCreate?: Maybe<ComponentOwnerConnectOrCreateFieldInput>
}

export type ComponentOwnerNodeAggregationWhereInput = {
  AND?: Maybe<Array<ComponentOwnerNodeAggregationWhereInput>>
  OR?: Maybe<Array<ComponentOwnerNodeAggregationWhereInput>>
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

export type ComponentOwnerUpdateConnectionInput = {
  node?: Maybe<UserUpdateInput>
}

export type ComponentOwnerUpdateFieldInput = {
  where?: Maybe<ComponentOwnerConnectionWhere>
  update?: Maybe<ComponentOwnerUpdateConnectionInput>
  connect?: Maybe<ComponentOwnerConnectFieldInput>
  disconnect?: Maybe<ComponentOwnerDisconnectFieldInput>
  create?: Maybe<ComponentOwnerCreateFieldInput>
  delete?: Maybe<ComponentOwnerDeleteFieldInput>
  connectOrCreate?: Maybe<ComponentOwnerConnectOrCreateFieldInput>
}

export type ComponentRelationInput = {
  rootElement?: Maybe<ComponentRootElementCreateFieldInput>
  owner?: Maybe<ComponentOwnerCreateFieldInput>
}

export type ComponentRootElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ComponentRootElementAggregateInput>>
  OR?: Maybe<Array<ComponentRootElementAggregateInput>>
  node?: Maybe<ComponentRootElementNodeAggregationWhereInput>
}

export type ComponentRootElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type ComponentRootElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type ComponentRootElementConnectionWhere = {
  AND?: Maybe<Array<ComponentRootElementConnectionWhere>>
  OR?: Maybe<Array<ComponentRootElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ComponentRootElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ComponentRootElementConnectOrCreateFieldInputOnCreate
}

export type ComponentRootElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type ComponentRootElementCreateFieldInput = {
  node: ElementCreateInput
}

export type ComponentRootElementDeleteFieldInput = {
  where?: Maybe<ComponentRootElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ComponentRootElementDisconnectFieldInput = {
  where?: Maybe<ComponentRootElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ComponentRootElementFieldInput = {
  create?: Maybe<ComponentRootElementCreateFieldInput>
  connect?: Maybe<ComponentRootElementConnectFieldInput>
  connectOrCreate?: Maybe<ComponentRootElementConnectOrCreateFieldInput>
}

export type ComponentRootElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<ComponentRootElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<ComponentRootElementNodeAggregationWhereInput>>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ComponentRootElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type ComponentRootElementUpdateFieldInput = {
  where?: Maybe<ComponentRootElementConnectionWhere>
  update?: Maybe<ComponentRootElementUpdateConnectionInput>
  connect?: Maybe<ComponentRootElementConnectFieldInput>
  disconnect?: Maybe<ComponentRootElementDisconnectFieldInput>
  create?: Maybe<ComponentRootElementCreateFieldInput>
  delete?: Maybe<ComponentRootElementDeleteFieldInput>
  connectOrCreate?: Maybe<ComponentRootElementConnectOrCreateFieldInput>
}

/** Fields to sort Components by. The order in which sorts are applied is not guaranteed when specifying many fields in one ComponentSort object. */
export type ComponentSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
}

export type ComponentUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type ComponentUpdateInput = {
  name?: Maybe<Scalars['String']>
  rootElement?: Maybe<ComponentRootElementUpdateFieldInput>
  owner?: Maybe<ComponentOwnerUpdateFieldInput>
}

export type ComponentWhere = {
  OR?: Maybe<Array<ComponentWhere>>
  AND?: Maybe<Array<ComponentWhere>>
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
  rootElementAggregate?: Maybe<ComponentRootElementAggregateInput>
  owner?: Maybe<UserWhere>
  owner_NOT?: Maybe<UserWhere>
  ownerAggregate?: Maybe<ComponentOwnerAggregateInput>
  rootElementConnection?: Maybe<ComponentRootElementConnectionWhere>
  rootElementConnection_NOT?: Maybe<ComponentRootElementConnectionWhere>
  ownerConnection?: Maybe<ComponentOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<ComponentOwnerConnectionWhere>
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

export type DeleteElementsInfoCreateInput = {
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
  deletedIds?: Maybe<Array<Scalars['String']>>
}

export type DeleteElementsInfoOptions = {
  /** Specify one or more DeleteElementsInfoSort objects to sort DeleteElementsInfos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<DeleteElementsInfoSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort DeleteElementsInfos by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteElementsInfoSort object. */
export type DeleteElementsInfoSort = {
  nodesDeleted?: Maybe<SortDirection>
  relationshipsDeleted?: Maybe<SortDirection>
}

export type DeleteElementsInfoUpdateInput = {
  nodesDeleted?: Maybe<Scalars['Int']>
  relationshipsDeleted?: Maybe<Scalars['Int']>
  deletedIds?: Maybe<Array<Scalars['String']>>
}

export type DeleteElementsInfoWhere = {
  OR?: Maybe<Array<DeleteElementsInfoWhere>>
  AND?: Maybe<Array<DeleteElementsInfoWhere>>
  nodesDeleted?: Maybe<Scalars['Int']>
  nodesDeleted_NOT?: Maybe<Scalars['Int']>
  nodesDeleted_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesDeleted_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  nodesDeleted_LT?: Maybe<Scalars['Int']>
  nodesDeleted_LTE?: Maybe<Scalars['Int']>
  nodesDeleted_GT?: Maybe<Scalars['Int']>
  nodesDeleted_GTE?: Maybe<Scalars['Int']>
  relationshipsDeleted?: Maybe<Scalars['Int']>
  relationshipsDeleted_NOT?: Maybe<Scalars['Int']>
  relationshipsDeleted_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsDeleted_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  relationshipsDeleted_LT?: Maybe<Scalars['Int']>
  relationshipsDeleted_LTE?: Maybe<Scalars['Int']>
  relationshipsDeleted_GT?: Maybe<Scalars['Int']>
  relationshipsDeleted_GTE?: Maybe<Scalars['Int']>
  deletedIds?: Maybe<Array<Scalars['String']>>
  deletedIds_NOT?: Maybe<Array<Scalars['String']>>
  deletedIds_INCLUDES?: Maybe<Scalars['String']>
  deletedIds_NOT_INCLUDES?: Maybe<Scalars['String']>
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

export type DuplicateElementInput = {
  elementId: Scalars['String']
}

export type DuplicateElementMutationResponseCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type DuplicateElementMutationResponseOptions = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type DuplicateElementMutationResponseUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: Maybe<Scalars['Boolean']>
}

export type DuplicateElementMutationResponseWhere = {
  OR?: Maybe<Array<DuplicateElementMutationResponseWhere>>
  AND?: Maybe<Array<DuplicateElementMutationResponseWhere>>
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

export type ElementAtomAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementAtomAggregateInput>>
  OR?: Maybe<Array<ElementAtomAggregateInput>>
  node?: Maybe<ElementAtomNodeAggregationWhereInput>
}

export type ElementAtomConnectFieldInput = {
  where?: Maybe<AtomConnectWhere>
  connect?: Maybe<AtomConnectInput>
}

export type ElementAtomConnectionSort = {
  node?: Maybe<AtomSort>
}

export type ElementAtomConnectionWhere = {
  AND?: Maybe<Array<ElementAtomConnectionWhere>>
  OR?: Maybe<Array<ElementAtomConnectionWhere>>
  node?: Maybe<AtomWhere>
  node_NOT?: Maybe<AtomWhere>
}

export type ElementAtomConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: ElementAtomConnectOrCreateFieldInputOnCreate
}

export type ElementAtomConnectOrCreateFieldInputOnCreate = {
  node: AtomCreateInput
}

export type ElementAtomCreateFieldInput = {
  node: AtomCreateInput
}

export type ElementAtomDeleteFieldInput = {
  where?: Maybe<ElementAtomConnectionWhere>
  delete?: Maybe<AtomDeleteInput>
}

export type ElementAtomDisconnectFieldInput = {
  where?: Maybe<ElementAtomConnectionWhere>
  disconnect?: Maybe<AtomDisconnectInput>
}

export type ElementAtomFieldInput = {
  create?: Maybe<ElementAtomCreateFieldInput>
  connect?: Maybe<ElementAtomConnectFieldInput>
  connectOrCreate?: Maybe<ElementAtomConnectOrCreateFieldInput>
}

export type ElementAtomNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementAtomNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementAtomNodeAggregationWhereInput>>
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

export type ElementAtomUpdateConnectionInput = {
  node?: Maybe<AtomUpdateInput>
}

export type ElementAtomUpdateFieldInput = {
  where?: Maybe<ElementAtomConnectionWhere>
  update?: Maybe<ElementAtomUpdateConnectionInput>
  connect?: Maybe<ElementAtomConnectFieldInput>
  disconnect?: Maybe<ElementAtomDisconnectFieldInput>
  create?: Maybe<ElementAtomCreateFieldInput>
  delete?: Maybe<ElementAtomDeleteFieldInput>
  connectOrCreate?: Maybe<ElementAtomConnectOrCreateFieldInput>
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
  edge?: Maybe<ElementChildrenEdgeAggregationWhereInput>
}

export type ElementChildrenConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<Array<ElementConnectInput>>
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementChildrenConnectionSort = {
  edge?: Maybe<ParentOfElementSort>
  node?: Maybe<ElementSort>
}

export type ElementChildrenConnectionWhere = {
  AND?: Maybe<Array<ElementChildrenConnectionWhere>>
  OR?: Maybe<Array<ElementChildrenConnectionWhere>>
  edge?: Maybe<ParentOfElementWhere>
  edge_NOT?: Maybe<ParentOfElementWhere>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementChildrenConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementChildrenConnectOrCreateFieldInputOnCreate
}

export type ElementChildrenConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementChildrenCreateFieldInput = {
  node: ElementCreateInput
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementChildrenDeleteFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementChildrenDisconnectFieldInput = {
  where?: Maybe<ElementChildrenConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementChildrenEdgeAggregationWhereInput = {
  AND?: Maybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  OR?: Maybe<Array<ElementChildrenEdgeAggregationWhereInput>>
  order_EQUAL?: Maybe<Scalars['Int']>
  order_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  order_MIN_EQUAL?: Maybe<Scalars['Int']>
  order_MAX_EQUAL?: Maybe<Scalars['Int']>
  order_SUM_EQUAL?: Maybe<Scalars['Int']>
  order_GT?: Maybe<Scalars['Int']>
  order_AVERAGE_GT?: Maybe<Scalars['Float']>
  order_MIN_GT?: Maybe<Scalars['Int']>
  order_MAX_GT?: Maybe<Scalars['Int']>
  order_SUM_GT?: Maybe<Scalars['Int']>
  order_GTE?: Maybe<Scalars['Int']>
  order_AVERAGE_GTE?: Maybe<Scalars['Float']>
  order_MIN_GTE?: Maybe<Scalars['Int']>
  order_MAX_GTE?: Maybe<Scalars['Int']>
  order_SUM_GTE?: Maybe<Scalars['Int']>
  order_LT?: Maybe<Scalars['Int']>
  order_AVERAGE_LT?: Maybe<Scalars['Float']>
  order_MIN_LT?: Maybe<Scalars['Int']>
  order_MAX_LT?: Maybe<Scalars['Int']>
  order_SUM_LT?: Maybe<Scalars['Int']>
  order_LTE?: Maybe<Scalars['Int']>
  order_AVERAGE_LTE?: Maybe<Scalars['Float']>
  order_MIN_LTE?: Maybe<Scalars['Int']>
  order_MAX_LTE?: Maybe<Scalars['Int']>
  order_SUM_LTE?: Maybe<Scalars['Int']>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ElementChildrenUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
  edge?: Maybe<ParentOfElementUpdateInput>
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

export type ElementComponentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementComponentAggregateInput>>
  OR?: Maybe<Array<ElementComponentAggregateInput>>
  node?: Maybe<ElementComponentNodeAggregationWhereInput>
}

export type ElementComponentConnectFieldInput = {
  where?: Maybe<ComponentConnectWhere>
  connect?: Maybe<ComponentConnectInput>
}

export type ElementComponentConnectionSort = {
  node?: Maybe<ComponentSort>
}

export type ElementComponentConnectionWhere = {
  AND?: Maybe<Array<ElementComponentConnectionWhere>>
  OR?: Maybe<Array<ElementComponentConnectionWhere>>
  node?: Maybe<ComponentWhere>
  node_NOT?: Maybe<ComponentWhere>
}

export type ElementComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementComponentConnectOrCreateFieldInputOnCreate
}

export type ElementComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentCreateInput
}

export type ElementComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementComponentDeleteFieldInput = {
  where?: Maybe<ElementComponentConnectionWhere>
  delete?: Maybe<ComponentDeleteInput>
}

export type ElementComponentDisconnectFieldInput = {
  where?: Maybe<ElementComponentConnectionWhere>
  disconnect?: Maybe<ComponentDisconnectInput>
}

export type ElementComponentFieldInput = {
  create?: Maybe<ElementComponentCreateFieldInput>
  connect?: Maybe<ElementComponentConnectFieldInput>
  connectOrCreate?: Maybe<ElementComponentConnectOrCreateFieldInput>
}

export type ElementComponentNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementComponentNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementComponentNodeAggregationWhereInput>>
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

export type ElementComponentUpdateConnectionInput = {
  node?: Maybe<ComponentUpdateInput>
}

export type ElementComponentUpdateFieldInput = {
  where?: Maybe<ElementComponentConnectionWhere>
  update?: Maybe<ElementComponentUpdateConnectionInput>
  connect?: Maybe<ElementComponentConnectFieldInput>
  disconnect?: Maybe<ElementComponentDisconnectFieldInput>
  create?: Maybe<ElementComponentCreateFieldInput>
  delete?: Maybe<ElementComponentDeleteFieldInput>
  connectOrCreate?: Maybe<ElementComponentConnectOrCreateFieldInput>
}

export type ElementConnectInput = {
  children?: Maybe<Array<ElementChildrenConnectFieldInput>>
  props?: Maybe<ElementPropsConnectFieldInput>
  parentElement?: Maybe<ElementParentElementConnectFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentConnectFieldInput>
  component?: Maybe<ElementComponentConnectFieldInput>
  atom?: Maybe<ElementAtomConnectFieldInput>
  hooks?: Maybe<Array<ElementHooksConnectFieldInput>>
  propMapBindings?: Maybe<Array<ElementPropMapBindingsConnectFieldInput>>
}

export type ElementConnectOrCreateInput = {
  children?: Maybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  props?: Maybe<ElementPropsConnectOrCreateFieldInput>
  parentElement?: Maybe<ElementParentElementConnectOrCreateFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  component?: Maybe<ElementComponentConnectOrCreateFieldInput>
  atom?: Maybe<ElementAtomConnectOrCreateFieldInput>
  hooks?: Maybe<Array<ElementHooksConnectOrCreateFieldInput>>
  propMapBindings?: Maybe<
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
  name?: Maybe<Scalars['String']>
  css?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  children?: Maybe<ElementChildrenFieldInput>
  props?: Maybe<ElementPropsFieldInput>
  parentElement?: Maybe<ElementParentElementFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentFieldInput>
  component?: Maybe<ElementComponentFieldInput>
  atom?: Maybe<ElementAtomFieldInput>
  hooks?: Maybe<ElementHooksFieldInput>
  propMapBindings?: Maybe<ElementPropMapBindingsFieldInput>
}

export type ElementDeleteInput = {
  children?: Maybe<Array<ElementChildrenDeleteFieldInput>>
  props?: Maybe<ElementPropsDeleteFieldInput>
  parentElement?: Maybe<ElementParentElementDeleteFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentDeleteFieldInput>
  component?: Maybe<ElementComponentDeleteFieldInput>
  atom?: Maybe<ElementAtomDeleteFieldInput>
  hooks?: Maybe<Array<ElementHooksDeleteFieldInput>>
  propMapBindings?: Maybe<Array<ElementPropMapBindingsDeleteFieldInput>>
}

export type ElementDisconnectInput = {
  children?: Maybe<Array<ElementChildrenDisconnectFieldInput>>
  props?: Maybe<ElementPropsDisconnectFieldInput>
  parentElement?: Maybe<ElementParentElementDisconnectFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentDisconnectFieldInput>
  component?: Maybe<ElementComponentDisconnectFieldInput>
  atom?: Maybe<ElementAtomDisconnectFieldInput>
  hooks?: Maybe<Array<ElementHooksDisconnectFieldInput>>
  propMapBindings?: Maybe<Array<ElementPropMapBindingsDisconnectFieldInput>>
}

export type ElementEdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
  order?: Maybe<Scalars['Int']>
}

export type ElementEdgeOptions = {
  /** Specify one or more ElementEdgeSort objects to sort ElementEdges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementEdgeSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort ElementEdges by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementEdgeSort object. */
export type ElementEdgeSort = {
  source?: Maybe<SortDirection>
  target?: Maybe<SortDirection>
  order?: Maybe<SortDirection>
}

export type ElementEdgeUpdateInput = {
  source?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
}

export type ElementEdgeWhere = {
  OR?: Maybe<Array<ElementEdgeWhere>>
  AND?: Maybe<Array<ElementEdgeWhere>>
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
  order?: Maybe<Scalars['Int']>
  order_NOT?: Maybe<Scalars['Int']>
  order_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  order_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  order_LT?: Maybe<Scalars['Int']>
  order_LTE?: Maybe<Scalars['Int']>
  order_GT?: Maybe<Scalars['Int']>
  order_GTE?: Maybe<Scalars['Int']>
}

export type ElementGraphCreateInput = {
  rootId?: Maybe<Scalars['String']>
}

export type ElementGraphInput = {
  rootId: Scalars['String']
}

export type ElementGraphOptions = {
  /** Specify one or more ElementGraphSort objects to sort ElementGraphs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementGraphSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort ElementGraphs by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementGraphSort object. */
export type ElementGraphSort = {
  rootId?: Maybe<SortDirection>
}

export type ElementGraphUpdateInput = {
  rootId?: Maybe<Scalars['String']>
}

export type ElementGraphWhere = {
  OR?: Maybe<Array<ElementGraphWhere>>
  AND?: Maybe<Array<ElementGraphWhere>>
  rootId?: Maybe<Scalars['String']>
  rootId_NOT?: Maybe<Scalars['String']>
  rootId_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  rootId_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  rootId_CONTAINS?: Maybe<Scalars['String']>
  rootId_NOT_CONTAINS?: Maybe<Scalars['String']>
  rootId_STARTS_WITH?: Maybe<Scalars['String']>
  rootId_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  rootId_ENDS_WITH?: Maybe<Scalars['String']>
  rootId_NOT_ENDS_WITH?: Maybe<Scalars['String']>
}

export type ElementHooksAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementHooksAggregateInput>>
  OR?: Maybe<Array<ElementHooksAggregateInput>>
  node?: Maybe<ElementHooksNodeAggregationWhereInput>
}

export type ElementHooksConnectFieldInput = {
  where?: Maybe<HookConnectWhere>
  connect?: Maybe<Array<HookConnectInput>>
}

export type ElementHooksConnectionSort = {
  node?: Maybe<HookSort>
}

export type ElementHooksConnectionWhere = {
  AND?: Maybe<Array<ElementHooksConnectionWhere>>
  OR?: Maybe<Array<ElementHooksConnectionWhere>>
  node?: Maybe<HookWhere>
  node_NOT?: Maybe<HookWhere>
}

export type ElementHooksConnectOrCreateFieldInput = {
  where: HookConnectOrCreateWhere
  onCreate: ElementHooksConnectOrCreateFieldInputOnCreate
}

export type ElementHooksConnectOrCreateFieldInputOnCreate = {
  node: HookCreateInput
}

export type ElementHooksCreateFieldInput = {
  node: HookCreateInput
}

export type ElementHooksDeleteFieldInput = {
  where?: Maybe<ElementHooksConnectionWhere>
  delete?: Maybe<HookDeleteInput>
}

export type ElementHooksDisconnectFieldInput = {
  where?: Maybe<ElementHooksConnectionWhere>
  disconnect?: Maybe<HookDisconnectInput>
}

export type ElementHooksFieldInput = {
  create?: Maybe<Array<ElementHooksCreateFieldInput>>
  connect?: Maybe<Array<ElementHooksConnectFieldInput>>
  connectOrCreate?: Maybe<Array<ElementHooksConnectOrCreateFieldInput>>
}

export type ElementHooksNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementHooksNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementHooksNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
}

export type ElementHooksUpdateConnectionInput = {
  node?: Maybe<HookUpdateInput>
}

export type ElementHooksUpdateFieldInput = {
  where?: Maybe<ElementHooksConnectionWhere>
  update?: Maybe<ElementHooksUpdateConnectionInput>
  connect?: Maybe<Array<ElementHooksConnectFieldInput>>
  disconnect?: Maybe<Array<ElementHooksDisconnectFieldInput>>
  create?: Maybe<Array<ElementHooksCreateFieldInput>>
  delete?: Maybe<Array<ElementHooksDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<ElementHooksConnectOrCreateFieldInput>>
}

export type ElementInstanceOfComponentAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementInstanceOfComponentAggregateInput>>
  OR?: Maybe<Array<ElementInstanceOfComponentAggregateInput>>
  node?: Maybe<ElementInstanceOfComponentNodeAggregationWhereInput>
}

export type ElementInstanceOfComponentConnectFieldInput = {
  where?: Maybe<ComponentConnectWhere>
  connect?: Maybe<ComponentConnectInput>
}

export type ElementInstanceOfComponentConnectionSort = {
  node?: Maybe<ComponentSort>
}

export type ElementInstanceOfComponentConnectionWhere = {
  AND?: Maybe<Array<ElementInstanceOfComponentConnectionWhere>>
  OR?: Maybe<Array<ElementInstanceOfComponentConnectionWhere>>
  node?: Maybe<ComponentWhere>
  node_NOT?: Maybe<ComponentWhere>
}

export type ElementInstanceOfComponentConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate
}

export type ElementInstanceOfComponentConnectOrCreateFieldInputOnCreate = {
  node: ComponentCreateInput
}

export type ElementInstanceOfComponentCreateFieldInput = {
  node: ComponentCreateInput
}

export type ElementInstanceOfComponentDeleteFieldInput = {
  where?: Maybe<ElementInstanceOfComponentConnectionWhere>
  delete?: Maybe<ComponentDeleteInput>
}

export type ElementInstanceOfComponentDisconnectFieldInput = {
  where?: Maybe<ElementInstanceOfComponentConnectionWhere>
  disconnect?: Maybe<ComponentDisconnectInput>
}

export type ElementInstanceOfComponentFieldInput = {
  create?: Maybe<ElementInstanceOfComponentCreateFieldInput>
  connect?: Maybe<ElementInstanceOfComponentConnectFieldInput>
  connectOrCreate?: Maybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
}

export type ElementInstanceOfComponentNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementInstanceOfComponentNodeAggregationWhereInput>>
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

export type ElementInstanceOfComponentUpdateConnectionInput = {
  node?: Maybe<ComponentUpdateInput>
}

export type ElementInstanceOfComponentUpdateFieldInput = {
  where?: Maybe<ElementInstanceOfComponentConnectionWhere>
  update?: Maybe<ElementInstanceOfComponentUpdateConnectionInput>
  connect?: Maybe<ElementInstanceOfComponentConnectFieldInput>
  disconnect?: Maybe<ElementInstanceOfComponentDisconnectFieldInput>
  create?: Maybe<ElementInstanceOfComponentCreateFieldInput>
  delete?: Maybe<ElementInstanceOfComponentDeleteFieldInput>
  connectOrCreate?: Maybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
}

export type ElementOptions = {
  /** Specify one or more ElementSort objects to sort Elements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ElementSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ElementParentElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementParentElementAggregateInput>>
  OR?: Maybe<Array<ElementParentElementAggregateInput>>
  node?: Maybe<ElementParentElementNodeAggregationWhereInput>
  edge?: Maybe<ElementParentElementEdgeAggregationWhereInput>
}

export type ElementParentElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementParentElementConnectionSort = {
  edge?: Maybe<ParentOfElementSort>
  node?: Maybe<ElementSort>
}

export type ElementParentElementConnectionWhere = {
  AND?: Maybe<Array<ElementParentElementConnectionWhere>>
  OR?: Maybe<Array<ElementParentElementConnectionWhere>>
  edge?: Maybe<ParentOfElementWhere>
  edge_NOT?: Maybe<ParentOfElementWhere>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type ElementParentElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: ElementParentElementConnectOrCreateFieldInputOnCreate
}

export type ElementParentElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementParentElementCreateFieldInput = {
  node: ElementCreateInput
  edge?: Maybe<ParentOfElementCreateInput>
}

export type ElementParentElementDeleteFieldInput = {
  where?: Maybe<ElementParentElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type ElementParentElementDisconnectFieldInput = {
  where?: Maybe<ElementParentElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type ElementParentElementEdgeAggregationWhereInput = {
  AND?: Maybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  OR?: Maybe<Array<ElementParentElementEdgeAggregationWhereInput>>
  order_EQUAL?: Maybe<Scalars['Int']>
  order_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  order_MIN_EQUAL?: Maybe<Scalars['Int']>
  order_MAX_EQUAL?: Maybe<Scalars['Int']>
  order_SUM_EQUAL?: Maybe<Scalars['Int']>
  order_GT?: Maybe<Scalars['Int']>
  order_AVERAGE_GT?: Maybe<Scalars['Float']>
  order_MIN_GT?: Maybe<Scalars['Int']>
  order_MAX_GT?: Maybe<Scalars['Int']>
  order_SUM_GT?: Maybe<Scalars['Int']>
  order_GTE?: Maybe<Scalars['Int']>
  order_AVERAGE_GTE?: Maybe<Scalars['Float']>
  order_MIN_GTE?: Maybe<Scalars['Int']>
  order_MAX_GTE?: Maybe<Scalars['Int']>
  order_SUM_GTE?: Maybe<Scalars['Int']>
  order_LT?: Maybe<Scalars['Int']>
  order_AVERAGE_LT?: Maybe<Scalars['Float']>
  order_MIN_LT?: Maybe<Scalars['Int']>
  order_MAX_LT?: Maybe<Scalars['Int']>
  order_SUM_LT?: Maybe<Scalars['Int']>
  order_LTE?: Maybe<Scalars['Int']>
  order_AVERAGE_LTE?: Maybe<Scalars['Float']>
  order_MIN_LTE?: Maybe<Scalars['Int']>
  order_MAX_LTE?: Maybe<Scalars['Int']>
  order_SUM_LTE?: Maybe<Scalars['Int']>
}

export type ElementParentElementFieldInput = {
  create?: Maybe<ElementParentElementCreateFieldInput>
  connect?: Maybe<ElementParentElementConnectFieldInput>
  connectOrCreate?: Maybe<ElementParentElementConnectOrCreateFieldInput>
}

export type ElementParentElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementParentElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementParentElementNodeAggregationWhereInput>>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ElementParentElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
  edge?: Maybe<ParentOfElementUpdateInput>
}

export type ElementParentElementUpdateFieldInput = {
  where?: Maybe<ElementParentElementConnectionWhere>
  update?: Maybe<ElementParentElementUpdateConnectionInput>
  connect?: Maybe<ElementParentElementConnectFieldInput>
  disconnect?: Maybe<ElementParentElementDisconnectFieldInput>
  create?: Maybe<ElementParentElementCreateFieldInput>
  delete?: Maybe<ElementParentElementDeleteFieldInput>
  connectOrCreate?: Maybe<ElementParentElementConnectOrCreateFieldInput>
}

export type ElementPropMapBindingsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementPropMapBindingsAggregateInput>>
  OR?: Maybe<Array<ElementPropMapBindingsAggregateInput>>
  node?: Maybe<ElementPropMapBindingsNodeAggregationWhereInput>
}

export type ElementPropMapBindingsConnectFieldInput = {
  where?: Maybe<PropMapBindingConnectWhere>
  connect?: Maybe<Array<PropMapBindingConnectInput>>
}

export type ElementPropMapBindingsConnectionSort = {
  node?: Maybe<PropMapBindingSort>
}

export type ElementPropMapBindingsConnectionWhere = {
  AND?: Maybe<Array<ElementPropMapBindingsConnectionWhere>>
  OR?: Maybe<Array<ElementPropMapBindingsConnectionWhere>>
  node?: Maybe<PropMapBindingWhere>
  node_NOT?: Maybe<PropMapBindingWhere>
}

export type ElementPropMapBindingsConnectOrCreateFieldInput = {
  where: PropMapBindingConnectOrCreateWhere
  onCreate: ElementPropMapBindingsConnectOrCreateFieldInputOnCreate
}

export type ElementPropMapBindingsConnectOrCreateFieldInputOnCreate = {
  node: PropMapBindingCreateInput
}

export type ElementPropMapBindingsCreateFieldInput = {
  node: PropMapBindingCreateInput
}

export type ElementPropMapBindingsDeleteFieldInput = {
  where?: Maybe<ElementPropMapBindingsConnectionWhere>
  delete?: Maybe<PropMapBindingDeleteInput>
}

export type ElementPropMapBindingsDisconnectFieldInput = {
  where?: Maybe<ElementPropMapBindingsConnectionWhere>
  disconnect?: Maybe<PropMapBindingDisconnectInput>
}

export type ElementPropMapBindingsFieldInput = {
  create?: Maybe<Array<ElementPropMapBindingsCreateFieldInput>>
  connect?: Maybe<Array<ElementPropMapBindingsConnectFieldInput>>
  connectOrCreate?: Maybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
}

export type ElementPropMapBindingsNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementPropMapBindingsNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  sourceKey_EQUAL?: Maybe<Scalars['String']>
  sourceKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  sourceKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  sourceKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  sourceKey_GT?: Maybe<Scalars['Int']>
  sourceKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  sourceKey_LONGEST_GT?: Maybe<Scalars['Int']>
  sourceKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  sourceKey_GTE?: Maybe<Scalars['Int']>
  sourceKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  sourceKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  sourceKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  sourceKey_LT?: Maybe<Scalars['Int']>
  sourceKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  sourceKey_LONGEST_LT?: Maybe<Scalars['Int']>
  sourceKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  sourceKey_LTE?: Maybe<Scalars['Int']>
  sourceKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  sourceKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  sourceKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  targetKey_EQUAL?: Maybe<Scalars['String']>
  targetKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  targetKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  targetKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  targetKey_GT?: Maybe<Scalars['Int']>
  targetKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  targetKey_LONGEST_GT?: Maybe<Scalars['Int']>
  targetKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  targetKey_GTE?: Maybe<Scalars['Int']>
  targetKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  targetKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  targetKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  targetKey_LT?: Maybe<Scalars['Int']>
  targetKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  targetKey_LONGEST_LT?: Maybe<Scalars['Int']>
  targetKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  targetKey_LTE?: Maybe<Scalars['Int']>
  targetKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  targetKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  targetKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ElementPropMapBindingsUpdateConnectionInput = {
  node?: Maybe<PropMapBindingUpdateInput>
}

export type ElementPropMapBindingsUpdateFieldInput = {
  where?: Maybe<ElementPropMapBindingsConnectionWhere>
  update?: Maybe<ElementPropMapBindingsUpdateConnectionInput>
  connect?: Maybe<Array<ElementPropMapBindingsConnectFieldInput>>
  disconnect?: Maybe<Array<ElementPropMapBindingsDisconnectFieldInput>>
  create?: Maybe<Array<ElementPropMapBindingsCreateFieldInput>>
  delete?: Maybe<Array<ElementPropMapBindingsDeleteFieldInput>>
  connectOrCreate?: Maybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
}

export type ElementPropsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<ElementPropsAggregateInput>>
  OR?: Maybe<Array<ElementPropsAggregateInput>>
  node?: Maybe<ElementPropsNodeAggregationWhereInput>
}

export type ElementPropsConnectFieldInput = {
  where?: Maybe<PropConnectWhere>
}

export type ElementPropsConnectionSort = {
  node?: Maybe<PropSort>
}

export type ElementPropsConnectionWhere = {
  AND?: Maybe<Array<ElementPropsConnectionWhere>>
  OR?: Maybe<Array<ElementPropsConnectionWhere>>
  node?: Maybe<PropWhere>
  node_NOT?: Maybe<PropWhere>
}

export type ElementPropsConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: ElementPropsConnectOrCreateFieldInputOnCreate
}

export type ElementPropsConnectOrCreateFieldInputOnCreate = {
  node: PropCreateInput
}

export type ElementPropsCreateFieldInput = {
  node: PropCreateInput
}

export type ElementPropsDeleteFieldInput = {
  where?: Maybe<ElementPropsConnectionWhere>
}

export type ElementPropsDisconnectFieldInput = {
  where?: Maybe<ElementPropsConnectionWhere>
}

export type ElementPropsFieldInput = {
  create?: Maybe<ElementPropsCreateFieldInput>
  connect?: Maybe<ElementPropsConnectFieldInput>
  connectOrCreate?: Maybe<ElementPropsConnectOrCreateFieldInput>
}

export type ElementPropsNodeAggregationWhereInput = {
  AND?: Maybe<Array<ElementPropsNodeAggregationWhereInput>>
  OR?: Maybe<Array<ElementPropsNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  data_EQUAL?: Maybe<Scalars['String']>
  data_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  data_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  data_GT?: Maybe<Scalars['Int']>
  data_AVERAGE_GT?: Maybe<Scalars['Float']>
  data_LONGEST_GT?: Maybe<Scalars['Int']>
  data_SHORTEST_GT?: Maybe<Scalars['Int']>
  data_GTE?: Maybe<Scalars['Int']>
  data_AVERAGE_GTE?: Maybe<Scalars['Float']>
  data_LONGEST_GTE?: Maybe<Scalars['Int']>
  data_SHORTEST_GTE?: Maybe<Scalars['Int']>
  data_LT?: Maybe<Scalars['Int']>
  data_AVERAGE_LT?: Maybe<Scalars['Float']>
  data_LONGEST_LT?: Maybe<Scalars['Int']>
  data_SHORTEST_LT?: Maybe<Scalars['Int']>
  data_LTE?: Maybe<Scalars['Int']>
  data_AVERAGE_LTE?: Maybe<Scalars['Float']>
  data_LONGEST_LTE?: Maybe<Scalars['Int']>
  data_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type ElementPropsUpdateConnectionInput = {
  node?: Maybe<PropUpdateInput>
}

export type ElementPropsUpdateFieldInput = {
  where?: Maybe<ElementPropsConnectionWhere>
  update?: Maybe<ElementPropsUpdateConnectionInput>
  connect?: Maybe<ElementPropsConnectFieldInput>
  disconnect?: Maybe<ElementPropsDisconnectFieldInput>
  create?: Maybe<ElementPropsCreateFieldInput>
  delete?: Maybe<ElementPropsDeleteFieldInput>
  connectOrCreate?: Maybe<ElementPropsConnectOrCreateFieldInput>
}

export type ElementRelationInput = {
  children?: Maybe<Array<ElementChildrenCreateFieldInput>>
  props?: Maybe<ElementPropsCreateFieldInput>
  parentElement?: Maybe<ElementParentElementCreateFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentCreateFieldInput>
  component?: Maybe<ElementComponentCreateFieldInput>
  atom?: Maybe<ElementAtomCreateFieldInput>
  hooks?: Maybe<Array<ElementHooksCreateFieldInput>>
  propMapBindings?: Maybe<Array<ElementPropMapBindingsCreateFieldInput>>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  id?: Maybe<SortDirection>
  name?: Maybe<SortDirection>
  css?: Maybe<SortDirection>
  propTransformationJs?: Maybe<SortDirection>
  renderForEachPropKey?: Maybe<SortDirection>
  renderIfPropKey?: Maybe<SortDirection>
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
  css?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  children?: Maybe<Array<ElementChildrenUpdateFieldInput>>
  props?: Maybe<ElementPropsUpdateFieldInput>
  parentElement?: Maybe<ElementParentElementUpdateFieldInput>
  instanceOfComponent?: Maybe<ElementInstanceOfComponentUpdateFieldInput>
  component?: Maybe<ElementComponentUpdateFieldInput>
  atom?: Maybe<ElementAtomUpdateFieldInput>
  hooks?: Maybe<Array<ElementHooksUpdateFieldInput>>
  propMapBindings?: Maybe<Array<ElementPropMapBindingsUpdateFieldInput>>
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
  css?: Maybe<Scalars['String']>
  css_NOT?: Maybe<Scalars['String']>
  css_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  css_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  css_CONTAINS?: Maybe<Scalars['String']>
  css_NOT_CONTAINS?: Maybe<Scalars['String']>
  css_STARTS_WITH?: Maybe<Scalars['String']>
  css_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  css_ENDS_WITH?: Maybe<Scalars['String']>
  css_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  propTransformationJs?: Maybe<Scalars['String']>
  propTransformationJs_NOT?: Maybe<Scalars['String']>
  propTransformationJs_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  propTransformationJs_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  propTransformationJs_CONTAINS?: Maybe<Scalars['String']>
  propTransformationJs_NOT_CONTAINS?: Maybe<Scalars['String']>
  propTransformationJs_STARTS_WITH?: Maybe<Scalars['String']>
  propTransformationJs_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  propTransformationJs_ENDS_WITH?: Maybe<Scalars['String']>
  propTransformationJs_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderForEachPropKey_NOT?: Maybe<Scalars['String']>
  renderForEachPropKey_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  renderForEachPropKey_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  renderForEachPropKey_CONTAINS?: Maybe<Scalars['String']>
  renderForEachPropKey_NOT_CONTAINS?: Maybe<Scalars['String']>
  renderForEachPropKey_STARTS_WITH?: Maybe<Scalars['String']>
  renderForEachPropKey_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  renderForEachPropKey_ENDS_WITH?: Maybe<Scalars['String']>
  renderForEachPropKey_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
  renderIfPropKey_NOT?: Maybe<Scalars['String']>
  renderIfPropKey_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  renderIfPropKey_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  renderIfPropKey_CONTAINS?: Maybe<Scalars['String']>
  renderIfPropKey_NOT_CONTAINS?: Maybe<Scalars['String']>
  renderIfPropKey_STARTS_WITH?: Maybe<Scalars['String']>
  renderIfPropKey_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  renderIfPropKey_ENDS_WITH?: Maybe<Scalars['String']>
  renderIfPropKey_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  children?: Maybe<ElementWhere>
  children_NOT?: Maybe<ElementWhere>
  childrenAggregate?: Maybe<ElementChildrenAggregateInput>
  props?: Maybe<PropWhere>
  props_NOT?: Maybe<PropWhere>
  propsAggregate?: Maybe<ElementPropsAggregateInput>
  parentElement?: Maybe<ElementWhere>
  parentElement_NOT?: Maybe<ElementWhere>
  parentElementAggregate?: Maybe<ElementParentElementAggregateInput>
  instanceOfComponent?: Maybe<ComponentWhere>
  instanceOfComponent_NOT?: Maybe<ComponentWhere>
  instanceOfComponentAggregate?: Maybe<ElementInstanceOfComponentAggregateInput>
  component?: Maybe<ComponentWhere>
  component_NOT?: Maybe<ComponentWhere>
  componentAggregate?: Maybe<ElementComponentAggregateInput>
  atom?: Maybe<AtomWhere>
  atom_NOT?: Maybe<AtomWhere>
  atomAggregate?: Maybe<ElementAtomAggregateInput>
  hooks?: Maybe<HookWhere>
  hooks_NOT?: Maybe<HookWhere>
  hooksAggregate?: Maybe<ElementHooksAggregateInput>
  propMapBindings?: Maybe<PropMapBindingWhere>
  propMapBindings_NOT?: Maybe<PropMapBindingWhere>
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingsAggregateInput>
  childrenConnection?: Maybe<ElementChildrenConnectionWhere>
  childrenConnection_NOT?: Maybe<ElementChildrenConnectionWhere>
  propsConnection?: Maybe<ElementPropsConnectionWhere>
  propsConnection_NOT?: Maybe<ElementPropsConnectionWhere>
  parentElementConnection?: Maybe<ElementParentElementConnectionWhere>
  parentElementConnection_NOT?: Maybe<ElementParentElementConnectionWhere>
  instanceOfComponentConnection?: Maybe<ElementInstanceOfComponentConnectionWhere>
  instanceOfComponentConnection_NOT?: Maybe<ElementInstanceOfComponentConnectionWhere>
  componentConnection?: Maybe<ElementComponentConnectionWhere>
  componentConnection_NOT?: Maybe<ElementComponentConnectionWhere>
  atomConnection?: Maybe<ElementAtomConnectionWhere>
  atomConnection_NOT?: Maybe<ElementAtomConnectionWhere>
  hooksConnection?: Maybe<ElementHooksConnectionWhere>
  hooksConnection_NOT?: Maybe<ElementHooksConnectionWhere>
  propMapBindingsConnection?: Maybe<ElementPropMapBindingsConnectionWhere>
  propMapBindingsConnection_NOT?: Maybe<ElementPropMapBindingsConnectionWhere>
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

export type HookConfigAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<HookConfigAggregateInput>>
  OR?: Maybe<Array<HookConfigAggregateInput>>
  node?: Maybe<HookConfigNodeAggregationWhereInput>
}

export type HookConfigConnectFieldInput = {
  where?: Maybe<PropConnectWhere>
}

export type HookConfigConnectionSort = {
  node?: Maybe<PropSort>
}

export type HookConfigConnectionWhere = {
  AND?: Maybe<Array<HookConfigConnectionWhere>>
  OR?: Maybe<Array<HookConfigConnectionWhere>>
  node?: Maybe<PropWhere>
  node_NOT?: Maybe<PropWhere>
}

export type HookConfigConnectOrCreateFieldInput = {
  where: PropConnectOrCreateWhere
  onCreate: HookConfigConnectOrCreateFieldInputOnCreate
}

export type HookConfigConnectOrCreateFieldInputOnCreate = {
  node: PropCreateInput
}

export type HookConfigCreateFieldInput = {
  node: PropCreateInput
}

export type HookConfigDeleteFieldInput = {
  where?: Maybe<HookConfigConnectionWhere>
}

export type HookConfigDisconnectFieldInput = {
  where?: Maybe<HookConfigConnectionWhere>
}

export type HookConfigFieldInput = {
  create?: Maybe<HookConfigCreateFieldInput>
  connect?: Maybe<HookConfigConnectFieldInput>
  connectOrCreate?: Maybe<HookConfigConnectOrCreateFieldInput>
}

export type HookConfigNodeAggregationWhereInput = {
  AND?: Maybe<Array<HookConfigNodeAggregationWhereInput>>
  OR?: Maybe<Array<HookConfigNodeAggregationWhereInput>>
  id_EQUAL?: Maybe<Scalars['ID']>
  data_EQUAL?: Maybe<Scalars['String']>
  data_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  data_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  data_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  data_GT?: Maybe<Scalars['Int']>
  data_AVERAGE_GT?: Maybe<Scalars['Float']>
  data_LONGEST_GT?: Maybe<Scalars['Int']>
  data_SHORTEST_GT?: Maybe<Scalars['Int']>
  data_GTE?: Maybe<Scalars['Int']>
  data_AVERAGE_GTE?: Maybe<Scalars['Float']>
  data_LONGEST_GTE?: Maybe<Scalars['Int']>
  data_SHORTEST_GTE?: Maybe<Scalars['Int']>
  data_LT?: Maybe<Scalars['Int']>
  data_AVERAGE_LT?: Maybe<Scalars['Float']>
  data_LONGEST_LT?: Maybe<Scalars['Int']>
  data_SHORTEST_LT?: Maybe<Scalars['Int']>
  data_LTE?: Maybe<Scalars['Int']>
  data_AVERAGE_LTE?: Maybe<Scalars['Float']>
  data_LONGEST_LTE?: Maybe<Scalars['Int']>
  data_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type HookConfigUpdateConnectionInput = {
  node?: Maybe<PropUpdateInput>
}

export type HookConfigUpdateFieldInput = {
  where?: Maybe<HookConfigConnectionWhere>
  update?: Maybe<HookConfigUpdateConnectionInput>
  connect?: Maybe<HookConfigConnectFieldInput>
  disconnect?: Maybe<HookConfigDisconnectFieldInput>
  create?: Maybe<HookConfigCreateFieldInput>
  delete?: Maybe<HookConfigDeleteFieldInput>
  connectOrCreate?: Maybe<HookConfigConnectOrCreateFieldInput>
}

export type HookConnectInput = {
  config?: Maybe<HookConfigConnectFieldInput>
  element?: Maybe<HookElementConnectFieldInput>
}

export type HookConnectOrCreateInput = {
  config?: Maybe<HookConfigConnectOrCreateFieldInput>
  element?: Maybe<HookElementConnectOrCreateFieldInput>
}

export type HookConnectOrCreateWhere = {
  node: HookUniqueWhere
}

export type HookConnectWhere = {
  node: HookWhere
}

export type HookCreateInput = {
  type: AtomType
  config?: Maybe<HookConfigFieldInput>
  element?: Maybe<HookElementFieldInput>
}

export type HookDeleteInput = {
  config?: Maybe<HookConfigDeleteFieldInput>
  element?: Maybe<HookElementDeleteFieldInput>
}

export type HookDisconnectInput = {
  config?: Maybe<HookConfigDisconnectFieldInput>
  element?: Maybe<HookElementDisconnectFieldInput>
}

export type HookElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<HookElementAggregateInput>>
  OR?: Maybe<Array<HookElementAggregateInput>>
  node?: Maybe<HookElementNodeAggregationWhereInput>
}

export type HookElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type HookElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type HookElementConnectionWhere = {
  AND?: Maybe<Array<HookElementConnectionWhere>>
  OR?: Maybe<Array<HookElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type HookElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: HookElementConnectOrCreateFieldInputOnCreate
}

export type HookElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type HookElementCreateFieldInput = {
  node: ElementCreateInput
}

export type HookElementDeleteFieldInput = {
  where?: Maybe<HookElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type HookElementDisconnectFieldInput = {
  where?: Maybe<HookElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type HookElementFieldInput = {
  create?: Maybe<HookElementCreateFieldInput>
  connect?: Maybe<HookElementConnectFieldInput>
  connectOrCreate?: Maybe<HookElementConnectOrCreateFieldInput>
}

export type HookElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<HookElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<HookElementNodeAggregationWhereInput>>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type HookElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type HookElementUpdateFieldInput = {
  where?: Maybe<HookElementConnectionWhere>
  update?: Maybe<HookElementUpdateConnectionInput>
  connect?: Maybe<HookElementConnectFieldInput>
  disconnect?: Maybe<HookElementDisconnectFieldInput>
  create?: Maybe<HookElementCreateFieldInput>
  delete?: Maybe<HookElementDeleteFieldInput>
  connectOrCreate?: Maybe<HookElementConnectOrCreateFieldInput>
}

export type HookOptions = {
  /** Specify one or more HookSort objects to sort Hooks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<HookSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type HookRelationInput = {
  config?: Maybe<HookConfigCreateFieldInput>
  element?: Maybe<HookElementCreateFieldInput>
}

/** Fields to sort Hooks by. The order in which sorts are applied is not guaranteed when specifying many fields in one HookSort object. */
export type HookSort = {
  id?: Maybe<SortDirection>
  type?: Maybe<SortDirection>
}

export type HookUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type HookUpdateInput = {
  type?: Maybe<AtomType>
  config?: Maybe<HookConfigUpdateFieldInput>
  element?: Maybe<HookElementUpdateFieldInput>
}

export type HookWhere = {
  OR?: Maybe<Array<HookWhere>>
  AND?: Maybe<Array<HookWhere>>
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
  type?: Maybe<AtomType>
  type_NOT?: Maybe<AtomType>
  type_IN?: Maybe<Array<Maybe<AtomType>>>
  type_NOT_IN?: Maybe<Array<Maybe<AtomType>>>
  config?: Maybe<PropWhere>
  config_NOT?: Maybe<PropWhere>
  configAggregate?: Maybe<HookConfigAggregateInput>
  element?: Maybe<ElementWhere>
  element_NOT?: Maybe<ElementWhere>
  elementAggregate?: Maybe<HookElementAggregateInput>
  configConnection?: Maybe<HookConfigConnectionWhere>
  configConnection_NOT?: Maybe<HookConfigConnectionWhere>
  elementConnection?: Maybe<HookElementConnectionWhere>
  elementConnection_NOT?: Maybe<HookElementConnectionWhere>
}

export type ImportAdminDataInput = {
  payload?: Maybe<Array<Scalars['JSONObject']>>
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

export type ImportDataMutationResponseCreateInput = {
  result: Scalars['Boolean']
}

export type ImportDataMutationResponseOptions = {
  /** Specify one or more ImportDataMutationResponseSort objects to sort ImportDataMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ImportDataMutationResponseSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort ImportDataMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ImportDataMutationResponseSort object. */
export type ImportDataMutationResponseSort = {
  result?: Maybe<SortDirection>
}

export type ImportDataMutationResponseUpdateInput = {
  result?: Maybe<Scalars['Boolean']>
}

export type ImportDataMutationResponseWhere = {
  OR?: Maybe<Array<ImportDataMutationResponseWhere>>
  AND?: Maybe<Array<ImportDataMutationResponseWhere>>
  result?: Maybe<Scalars['Boolean']>
  result_NOT?: Maybe<Scalars['Boolean']>
}

export type InterfaceTypeApiOfAtomsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  OR?: Maybe<Array<InterfaceTypeApiOfAtomsAggregateInput>>
  node?: Maybe<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>
}

export type InterfaceTypeApiOfAtomsConnectFieldInput = {
  where?: Maybe<AtomConnectWhere>
  connect?: Maybe<Array<AtomConnectInput>>
}

export type InterfaceTypeApiOfAtomsConnectionSort = {
  node?: Maybe<AtomSort>
}

export type InterfaceTypeApiOfAtomsConnectionWhere = {
  AND?: Maybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>
  OR?: Maybe<Array<InterfaceTypeApiOfAtomsConnectionWhere>>
  node?: Maybe<AtomWhere>
  node_NOT?: Maybe<AtomWhere>
}

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInput = {
  where: AtomConnectOrCreateWhere
  onCreate: InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate
}

export type InterfaceTypeApiOfAtomsConnectOrCreateFieldInputOnCreate = {
  node: AtomCreateInput
}

export type InterfaceTypeApiOfAtomsCreateFieldInput = {
  node: AtomCreateInput
}

export type InterfaceTypeApiOfAtomsDeleteFieldInput = {
  where?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
  delete?: Maybe<AtomDeleteInput>
}

export type InterfaceTypeApiOfAtomsDisconnectFieldInput = {
  where?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
  disconnect?: Maybe<AtomDisconnectInput>
}

export type InterfaceTypeApiOfAtomsFieldInput = {
  create?: Maybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  connect?: Maybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  connectOrCreate?: Maybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeApiOfAtomsNodeAggregationWhereInput = {
  AND?: Maybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
  OR?: Maybe<Array<InterfaceTypeApiOfAtomsNodeAggregationWhereInput>>
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

export type InterfaceTypeApiOfAtomsUpdateConnectionInput = {
  node?: Maybe<AtomUpdateInput>
}

export type InterfaceTypeApiOfAtomsUpdateFieldInput = {
  where?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
  update?: Maybe<InterfaceTypeApiOfAtomsUpdateConnectionInput>
  connect?: Maybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  disconnect?: Maybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  create?: Maybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  delete?: Maybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  connectOrCreate?: Maybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
}

export type InterfaceTypeConnectInput = {
  owner?: Maybe<TypeBaseOwnerConnectFieldInput>
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsConnectFieldInput>>
}

export type InterfaceTypeConnectOrCreateInput = {
  owner?: Maybe<TypeBaseOwnerConnectOrCreateFieldInput>
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>>
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
  apiOfAtoms?: Maybe<InterfaceTypeApiOfAtomsFieldInput>
  fields?: Maybe<InterfaceTypeFieldsFieldInput>
}

export type InterfaceTypeDeleteInput = {
  owner?: Maybe<TypeBaseOwnerDeleteFieldInput>
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  fields?: Maybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
}

export type InterfaceTypeDisconnectInput = {
  owner?: Maybe<TypeBaseOwnerDisconnectFieldInput>
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
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
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
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
  apiOfAtoms?: Maybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>
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
  apiOfAtoms?: Maybe<AtomWhere>
  apiOfAtoms_NOT?: Maybe<AtomWhere>
  apiOfAtomsAggregate?: Maybe<InterfaceTypeApiOfAtomsAggregateInput>
  ownerConnection?: Maybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NOT?: Maybe<TypeBaseOwnerConnectionWhere>
  apiOfAtomsConnection?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
  apiOfAtomsConnection_NOT?: Maybe<InterfaceTypeApiOfAtomsConnectionWhere>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
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

export type ParentOfElementCreateInput = {
  order?: Maybe<Scalars['Int']>
}

export type ParentOfElementSort = {
  order?: Maybe<SortDirection>
}

export type ParentOfElementUpdateInput = {
  order?: Maybe<Scalars['Int']>
}

export type ParentOfElementWhere = {
  OR?: Maybe<Array<ParentOfElementWhere>>
  AND?: Maybe<Array<ParentOfElementWhere>>
  order?: Maybe<Scalars['Int']>
  order_NOT?: Maybe<Scalars['Int']>
  order_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  order_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  order_LT?: Maybe<Scalars['Int']>
  order_LTE?: Maybe<Scalars['Int']>
  order_GT?: Maybe<Scalars['Int']>
  order_GTE?: Maybe<Scalars['Int']>
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
  element?: Maybe<PropMapBindingElementConnectFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementConnectFieldInput>
}

export type PropMapBindingConnectOrCreateInput = {
  element?: Maybe<PropMapBindingElementConnectOrCreateFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
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
  element?: Maybe<PropMapBindingElementFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementFieldInput>
}

export type PropMapBindingDeleteInput = {
  element?: Maybe<PropMapBindingElementDeleteFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementDeleteFieldInput>
}

export type PropMapBindingDisconnectInput = {
  element?: Maybe<PropMapBindingElementDisconnectFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementDisconnectFieldInput>
}

export type PropMapBindingElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PropMapBindingElementAggregateInput>>
  OR?: Maybe<Array<PropMapBindingElementAggregateInput>>
  node?: Maybe<PropMapBindingElementNodeAggregationWhereInput>
}

export type PropMapBindingElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type PropMapBindingElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type PropMapBindingElementConnectionWhere = {
  AND?: Maybe<Array<PropMapBindingElementConnectionWhere>>
  OR?: Maybe<Array<PropMapBindingElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type PropMapBindingElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PropMapBindingElementConnectOrCreateFieldInputOnCreate
}

export type PropMapBindingElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type PropMapBindingElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingElementDeleteFieldInput = {
  where?: Maybe<PropMapBindingElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type PropMapBindingElementDisconnectFieldInput = {
  where?: Maybe<PropMapBindingElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type PropMapBindingElementFieldInput = {
  create?: Maybe<PropMapBindingElementCreateFieldInput>
  connect?: Maybe<PropMapBindingElementConnectFieldInput>
  connectOrCreate?: Maybe<PropMapBindingElementConnectOrCreateFieldInput>
}

export type PropMapBindingElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<PropMapBindingElementNodeAggregationWhereInput>>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PropMapBindingElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type PropMapBindingElementUpdateFieldInput = {
  where?: Maybe<PropMapBindingElementConnectionWhere>
  update?: Maybe<PropMapBindingElementUpdateConnectionInput>
  connect?: Maybe<PropMapBindingElementConnectFieldInput>
  disconnect?: Maybe<PropMapBindingElementDisconnectFieldInput>
  create?: Maybe<PropMapBindingElementCreateFieldInput>
  delete?: Maybe<PropMapBindingElementDeleteFieldInput>
  connectOrCreate?: Maybe<PropMapBindingElementConnectOrCreateFieldInput>
}

export type PropMapBindingOptions = {
  /** Specify one or more PropMapBindingSort objects to sort PropMapBindings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PropMapBindingSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type PropMapBindingRelationInput = {
  element?: Maybe<PropMapBindingElementCreateFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementCreateFieldInput>
}

/** Fields to sort PropMapBindings by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropMapBindingSort object. */
export type PropMapBindingSort = {
  id?: Maybe<SortDirection>
  sourceKey?: Maybe<SortDirection>
  targetKey?: Maybe<SortDirection>
}

export type PropMapBindingTargetElementAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<PropMapBindingTargetElementAggregateInput>>
  OR?: Maybe<Array<PropMapBindingTargetElementAggregateInput>>
  node?: Maybe<PropMapBindingTargetElementNodeAggregationWhereInput>
}

export type PropMapBindingTargetElementConnectFieldInput = {
  where?: Maybe<ElementConnectWhere>
  connect?: Maybe<ElementConnectInput>
}

export type PropMapBindingTargetElementConnectionSort = {
  node?: Maybe<ElementSort>
}

export type PropMapBindingTargetElementConnectionWhere = {
  AND?: Maybe<Array<PropMapBindingTargetElementConnectionWhere>>
  OR?: Maybe<Array<PropMapBindingTargetElementConnectionWhere>>
  node?: Maybe<ElementWhere>
  node_NOT?: Maybe<ElementWhere>
}

export type PropMapBindingTargetElementConnectOrCreateFieldInput = {
  where: ElementConnectOrCreateWhere
  onCreate: PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate
}

export type PropMapBindingTargetElementConnectOrCreateFieldInputOnCreate = {
  node: ElementCreateInput
}

export type PropMapBindingTargetElementCreateFieldInput = {
  node: ElementCreateInput
}

export type PropMapBindingTargetElementDeleteFieldInput = {
  where?: Maybe<PropMapBindingTargetElementConnectionWhere>
  delete?: Maybe<ElementDeleteInput>
}

export type PropMapBindingTargetElementDisconnectFieldInput = {
  where?: Maybe<PropMapBindingTargetElementConnectionWhere>
  disconnect?: Maybe<ElementDisconnectInput>
}

export type PropMapBindingTargetElementFieldInput = {
  create?: Maybe<PropMapBindingTargetElementCreateFieldInput>
  connect?: Maybe<PropMapBindingTargetElementConnectFieldInput>
  connectOrCreate?: Maybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
}

export type PropMapBindingTargetElementNodeAggregationWhereInput = {
  AND?: Maybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
  OR?: Maybe<Array<PropMapBindingTargetElementNodeAggregationWhereInput>>
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
  css_EQUAL?: Maybe<Scalars['String']>
  css_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  css_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  css_GT?: Maybe<Scalars['Int']>
  css_AVERAGE_GT?: Maybe<Scalars['Float']>
  css_LONGEST_GT?: Maybe<Scalars['Int']>
  css_SHORTEST_GT?: Maybe<Scalars['Int']>
  css_GTE?: Maybe<Scalars['Int']>
  css_AVERAGE_GTE?: Maybe<Scalars['Float']>
  css_LONGEST_GTE?: Maybe<Scalars['Int']>
  css_SHORTEST_GTE?: Maybe<Scalars['Int']>
  css_LT?: Maybe<Scalars['Int']>
  css_AVERAGE_LT?: Maybe<Scalars['Float']>
  css_LONGEST_LT?: Maybe<Scalars['Int']>
  css_SHORTEST_LT?: Maybe<Scalars['Int']>
  css_LTE?: Maybe<Scalars['Int']>
  css_AVERAGE_LTE?: Maybe<Scalars['Float']>
  css_LONGEST_LTE?: Maybe<Scalars['Int']>
  css_SHORTEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_EQUAL?: Maybe<Scalars['String']>
  propTransformationJs_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  propTransformationJs_GT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GT?: Maybe<Scalars['Int']>
  propTransformationJs_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_GTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_GTE?: Maybe<Scalars['Int']>
  propTransformationJs_LT?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LT?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LT?: Maybe<Scalars['Int']>
  propTransformationJs_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_AVERAGE_LTE?: Maybe<Scalars['Float']>
  propTransformationJs_LONGEST_LTE?: Maybe<Scalars['Int']>
  propTransformationJs_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_EQUAL?: Maybe<Scalars['String']>
  renderForEachPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderForEachPropKey_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderForEachPropKey_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderForEachPropKey_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderForEachPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderForEachPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_EQUAL?: Maybe<Scalars['String']>
  renderIfPropKey_AVERAGE_EQUAL?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_EQUAL?: Maybe<Scalars['Int']>
  renderIfPropKey_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GT?: Maybe<Scalars['Int']>
  renderIfPropKey_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_GTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_GTE?: Maybe<Scalars['Int']>
  renderIfPropKey_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LT?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LT?: Maybe<Scalars['Int']>
  renderIfPropKey_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_AVERAGE_LTE?: Maybe<Scalars['Float']>
  renderIfPropKey_LONGEST_LTE?: Maybe<Scalars['Int']>
  renderIfPropKey_SHORTEST_LTE?: Maybe<Scalars['Int']>
}

export type PropMapBindingTargetElementUpdateConnectionInput = {
  node?: Maybe<ElementUpdateInput>
}

export type PropMapBindingTargetElementUpdateFieldInput = {
  where?: Maybe<PropMapBindingTargetElementConnectionWhere>
  update?: Maybe<PropMapBindingTargetElementUpdateConnectionInput>
  connect?: Maybe<PropMapBindingTargetElementConnectFieldInput>
  disconnect?: Maybe<PropMapBindingTargetElementDisconnectFieldInput>
  create?: Maybe<PropMapBindingTargetElementCreateFieldInput>
  delete?: Maybe<PropMapBindingTargetElementDeleteFieldInput>
  connectOrCreate?: Maybe<PropMapBindingTargetElementConnectOrCreateFieldInput>
}

export type PropMapBindingUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type PropMapBindingUpdateInput = {
  sourceKey?: Maybe<Scalars['String']>
  targetKey?: Maybe<Scalars['String']>
  element?: Maybe<PropMapBindingElementUpdateFieldInput>
  targetElement?: Maybe<PropMapBindingTargetElementUpdateFieldInput>
}

export type PropMapBindingWhere = {
  OR?: Maybe<Array<PropMapBindingWhere>>
  AND?: Maybe<Array<PropMapBindingWhere>>
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
  sourceKey?: Maybe<Scalars['String']>
  sourceKey_NOT?: Maybe<Scalars['String']>
  sourceKey_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  sourceKey_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  sourceKey_CONTAINS?: Maybe<Scalars['String']>
  sourceKey_NOT_CONTAINS?: Maybe<Scalars['String']>
  sourceKey_STARTS_WITH?: Maybe<Scalars['String']>
  sourceKey_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  sourceKey_ENDS_WITH?: Maybe<Scalars['String']>
  sourceKey_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  targetKey?: Maybe<Scalars['String']>
  targetKey_NOT?: Maybe<Scalars['String']>
  targetKey_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  targetKey_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  targetKey_CONTAINS?: Maybe<Scalars['String']>
  targetKey_NOT_CONTAINS?: Maybe<Scalars['String']>
  targetKey_STARTS_WITH?: Maybe<Scalars['String']>
  targetKey_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  targetKey_ENDS_WITH?: Maybe<Scalars['String']>
  targetKey_NOT_ENDS_WITH?: Maybe<Scalars['String']>
  element?: Maybe<ElementWhere>
  element_NOT?: Maybe<ElementWhere>
  elementAggregate?: Maybe<PropMapBindingElementAggregateInput>
  targetElement?: Maybe<ElementWhere>
  targetElement_NOT?: Maybe<ElementWhere>
  targetElementAggregate?: Maybe<PropMapBindingTargetElementAggregateInput>
  elementConnection?: Maybe<PropMapBindingElementConnectionWhere>
  elementConnection_NOT?: Maybe<PropMapBindingElementConnectionWhere>
  targetElementConnection?: Maybe<PropMapBindingTargetElementConnectionWhere>
  targetElementConnection_NOT?: Maybe<PropMapBindingTargetElementConnectionWhere>
}

export type PropOptions = {
  /** Specify one or more PropSort objects to sort Props by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<PropSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort Props by. The order in which sorts are applied is not guaranteed when specifying many fields in one PropSort object. */
export type PropSort = {
  id?: Maybe<SortDirection>
  data?: Maybe<SortDirection>
}

export type PropUniqueWhere = {
  id?: Maybe<Scalars['ID']>
}

export type PropUpdateInput = {
  data?: Maybe<Scalars['String']>
}

export type PropWhere = {
  OR?: Maybe<Array<PropWhere>>
  AND?: Maybe<Array<PropWhere>>
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
  data?: Maybe<Scalars['String']>
  data_NOT?: Maybe<Scalars['String']>
  data_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  data_NOT_IN?: Maybe<Array<Maybe<Scalars['String']>>>
  data_CONTAINS?: Maybe<Scalars['String']>
  data_NOT_CONTAINS?: Maybe<Scalars['String']>
  data_STARTS_WITH?: Maybe<Scalars['String']>
  data_NOT_STARTS_WITH?: Maybe<Scalars['String']>
  data_ENDS_WITH?: Maybe<Scalars['String']>
  data_NOT_ENDS_WITH?: Maybe<Scalars['String']>
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

export type ResetDataMutationResponseCreateInput = {
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDataMutationResponseOptions = {
  /** Specify one or more ResetDataMutationResponseSort objects to sort ResetDataMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<ResetDataMutationResponseSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort ResetDataMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResetDataMutationResponseSort object. */
export type ResetDataMutationResponseSort = {
  success?: Maybe<SortDirection>
}

export type ResetDataMutationResponseUpdateInput = {
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDataMutationResponseWhere = {
  OR?: Maybe<Array<ResetDataMutationResponseWhere>>
  AND?: Maybe<Array<ResetDataMutationResponseWhere>>
  success?: Maybe<Scalars['Boolean']>
  success_NOT?: Maybe<Scalars['Boolean']>
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

export type TagGraphOptionsCreateInput = {
  sort?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsOptions = {
  /** Specify one or more TagGraphOptionsSort objects to sort TagGraphOptions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<TagGraphOptionsSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

/** Fields to sort TagGraphOptions by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagGraphOptionsSort object. */
export type TagGraphOptionsSort = {
  sort?: Maybe<SortDirection>
  limit?: Maybe<SortDirection>
}

export type TagGraphOptionsUpdateInput = {
  sort?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsWhere = {
  OR?: Maybe<Array<TagGraphOptionsWhere>>
  AND?: Maybe<Array<TagGraphOptionsWhere>>
  sort?: Maybe<Scalars['Int']>
  sort_NOT?: Maybe<Scalars['Int']>
  sort_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  sort_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  sort_LT?: Maybe<Scalars['Int']>
  sort_LTE?: Maybe<Scalars['Int']>
  sort_GT?: Maybe<Scalars['Int']>
  sort_GTE?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  limit_NOT?: Maybe<Scalars['Int']>
  limit_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  limit_NOT_IN?: Maybe<Array<Maybe<Scalars['Int']>>>
  limit_LT?: Maybe<Scalars['Int']>
  limit_LTE?: Maybe<Scalars['Int']>
  limit_GT?: Maybe<Scalars['Int']>
  limit_GTE?: Maybe<Scalars['Int']>
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

export type UserComponentsAggregateInput = {
  count?: Maybe<Scalars['Int']>
  count_LT?: Maybe<Scalars['Int']>
  count_LTE?: Maybe<Scalars['Int']>
  count_GT?: Maybe<Scalars['Int']>
  count_GTE?: Maybe<Scalars['Int']>
  AND?: Maybe<Array<UserComponentsAggregateInput>>
  OR?: Maybe<Array<UserComponentsAggregateInput>>
  node?: Maybe<UserComponentsNodeAggregationWhereInput>
}

export type UserComponentsConnectFieldInput = {
  where?: Maybe<ComponentConnectWhere>
  connect?: Maybe<Array<ComponentConnectInput>>
}

export type UserComponentsConnectionSort = {
  node?: Maybe<ComponentSort>
}

export type UserComponentsConnectionWhere = {
  AND?: Maybe<Array<UserComponentsConnectionWhere>>
  OR?: Maybe<Array<UserComponentsConnectionWhere>>
  node?: Maybe<ComponentWhere>
  node_NOT?: Maybe<ComponentWhere>
}

export type UserComponentsConnectOrCreateFieldInput = {
  where: ComponentConnectOrCreateWhere
  onCreate: UserComponentsConnectOrCreateFieldInputOnCreate
}

export type UserComponentsConnectOrCreateFieldInputOnCreate = {
  node: ComponentCreateInput
}

export type UserComponentsCreateFieldInput = {
  node: ComponentCreateInput
}

export type UserComponentsDeleteFieldInput = {
  where?: Maybe<UserComponentsConnectionWhere>
  delete?: Maybe<ComponentDeleteInput>
}

export type UserComponentsDisconnectFieldInput = {
  where?: Maybe<UserComponentsConnectionWhere>
  disconnect?: Maybe<ComponentDisconnectInput>
}

export type UserComponentsFieldInput = {
  create?: Maybe<Array<UserComponentsCreateFieldInput>>
  connect?: Maybe<Array<UserComponentsConnectFieldInput>>
  connectOrCreate?: Maybe<Array<UserComponentsConnectOrCreateFieldInput>>
}

export type UserComponentsNodeAggregationWhereInput = {
  AND?: Maybe<Array<UserComponentsNodeAggregationWhereInput>>
  OR?: Maybe<Array<UserComponentsNodeAggregationWhereInput>>
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

export type UserComponentsUpdateConnectionInput = {
  node?: Maybe<ComponentUpdateInput>
}

export type UserComponentsUpdateFieldInput = {
  where?: Maybe<UserComponentsConnectionWhere>
  update?: Maybe<UserComponentsUpdateConnectionInput>
  connect?: Maybe<Array<UserComponentsConnectFieldInput>>
  disconnect?: Maybe<Array<UserComponentsDisconnectFieldInput>>
  create?: Maybe<Array<UserComponentsCreateFieldInput>>
  delete?: Maybe<Array<UserComponentsDeleteFieldInput>>
  connectOrCreate?: Maybe<Array<UserComponentsConnectOrCreateFieldInput>>
}

export type UserConnectInput = {
  apps?: Maybe<Array<UserAppsConnectFieldInput>>
  components?: Maybe<Array<UserComponentsConnectFieldInput>>
}

export type UserConnectOrCreateInput = {
  apps?: Maybe<Array<UserAppsConnectOrCreateFieldInput>>
  components?: Maybe<Array<UserComponentsConnectOrCreateFieldInput>>
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
  components?: Maybe<UserComponentsFieldInput>
}

export type UserDeleteInput = {
  apps?: Maybe<Array<UserAppsDeleteFieldInput>>
  components?: Maybe<Array<UserComponentsDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: Maybe<Array<UserAppsDisconnectFieldInput>>
  components?: Maybe<Array<UserComponentsDisconnectFieldInput>>
}

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: Maybe<Array<Maybe<UserSort>>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type UserRelationInput = {
  apps?: Maybe<Array<UserAppsCreateFieldInput>>
  components?: Maybe<Array<UserComponentsCreateFieldInput>>
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
  components?: Maybe<Array<UserComponentsUpdateFieldInput>>
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
  components?: Maybe<ComponentWhere>
  components_NOT?: Maybe<ComponentWhere>
  componentsAggregate?: Maybe<UserComponentsAggregateInput>
  appsConnection?: Maybe<UserAppsConnectionWhere>
  appsConnection_NOT?: Maybe<UserAppsConnectionWhere>
  componentsConnection?: Maybe<UserComponentsConnectionWhere>
  componentsConnection_NOT?: Maybe<UserComponentsConnectionWhere>
}

export interface ResetDataMutationResponseAggregateInput {
  count?: boolean
}

export declare class ResetDataMutationResponseModel {
  public find(args?: {
    where?: ResetDataMutationResponseWhere

    options?: ResetDataMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ResetDataMutationResponse>>

  public count(args?: {
    where?: ResetDataMutationResponseWhere
  }): Promise<number>

  public create(args: {
    input: Array<ResetDataMutationResponseCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateResetDataMutationResponsesMutationResponse>

  public update(args: {
    where?: ResetDataMutationResponseWhere
    update?: ResetDataMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateResetDataMutationResponsesMutationResponse>

  public delete(args: {
    where?: ResetDataMutationResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: ResetDataMutationResponseWhere

    aggregate: ResetDataMutationResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ResetDataMutationResponseAggregateSelection>
}

export interface ImportDataMutationResponseAggregateInput {
  count?: boolean
}

export declare class ImportDataMutationResponseModel {
  public find(args?: {
    where?: ImportDataMutationResponseWhere

    options?: ImportDataMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ImportDataMutationResponse>>

  public count(args?: {
    where?: ImportDataMutationResponseWhere
  }): Promise<number>

  public create(args: {
    input: Array<ImportDataMutationResponseCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateImportDataMutationResponsesMutationResponse>

  public update(args: {
    where?: ImportDataMutationResponseWhere
    update?: ImportDataMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateImportDataMutationResponsesMutationResponse>

  public delete(args: {
    where?: ImportDataMutationResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: ImportDataMutationResponseWhere

    aggregate: ImportDataMutationResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ImportDataMutationResponseAggregateSelection>
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
export interface TagGraphOptionsAggregateInput {
  count?: boolean
  sort?: IntAggregateInput
  limit?: IntAggregateInput
}

export declare class TagGraphOptionsModel {
  public find(args?: {
    where?: TagGraphOptionsWhere

    options?: TagGraphOptionsOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<TagGraphOptions>>

  public count(args?: { where?: TagGraphOptionsWhere }): Promise<number>

  public create(args: {
    input: Array<TagGraphOptionsCreateInput>
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

    aggregate: TagGraphOptionsAggregateInput
    context?: any
    rootValue?: any
  }): Promise<TagGraphOptionsAggregateSelection>
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
export interface ElementEdgeAggregateInput {
  count?: boolean
  source?: StringAggregateInput
  target?: StringAggregateInput
  order?: IntAggregateInput
}

export declare class ElementEdgeModel {
  public find(args?: {
    where?: ElementEdgeWhere

    options?: ElementEdgeOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ElementEdge>>

  public count(args?: { where?: ElementEdgeWhere }): Promise<number>

  public create(args: {
    input: Array<ElementEdgeCreateInput>
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

    aggregate: ElementEdgeAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ElementEdgeAggregateSelection>
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
export interface ElementGraphAggregateInput {
  count?: boolean
  rootId?: StringAggregateInput
}

export declare class ElementGraphModel {
  public find(args?: {
    where?: ElementGraphWhere

    options?: ElementGraphOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<ElementGraph>>

  public count(args?: { where?: ElementGraphWhere }): Promise<number>

  public create(args: {
    input: Array<ElementGraphCreateInput>
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

    aggregate: ElementGraphAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ElementGraphAggregateSelection>
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
export interface PropAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  data?: StringAggregateInput
}

export declare class PropModel {
  public find(args?: {
    where?: PropWhere

    options?: PropOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Prop>>

  public count(args?: { where?: PropWhere }): Promise<number>

  public create(args: {
    input: Array<PropCreateInput>
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

    aggregate: PropAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PropAggregateSelection>
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
export interface HookAggregateInput {
  count?: boolean
  id?: IdAggregateInput
}

export declare class HookModel {
  public find(args?: {
    where?: HookWhere

    options?: HookOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Hook>>

  public count(args?: { where?: HookWhere }): Promise<number>

  public create(args: {
    input: Array<HookCreateInput>
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

    aggregate: HookAggregateInput
    context?: any
    rootValue?: any
  }): Promise<HookAggregateSelection>
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
export interface PropMapBindingAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  sourceKey?: StringAggregateInput
  targetKey?: StringAggregateInput
}

export declare class PropMapBindingModel {
  public find(args?: {
    where?: PropMapBindingWhere

    options?: PropMapBindingOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<PropMapBinding>>

  public count(args?: { where?: PropMapBindingWhere }): Promise<number>

  public create(args: {
    input: Array<PropMapBindingCreateInput>
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

    aggregate: PropMapBindingAggregateInput
    context?: any
    rootValue?: any
  }): Promise<PropMapBindingAggregateSelection>
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
export interface ElementAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
  css?: StringAggregateInput
  propTransformationJs?: StringAggregateInput
  renderForEachPropKey?: StringAggregateInput
  renderIfPropKey?: StringAggregateInput
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
export interface DuplicateElementMutationResponseAggregateInput {
  count?: boolean
}

export declare class DuplicateElementMutationResponseModel {
  public find(args?: {
    where?: DuplicateElementMutationResponseWhere

    options?: DuplicateElementMutationResponseOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<DuplicateElementMutationResponse>>

  public count(args?: {
    where?: DuplicateElementMutationResponseWhere
  }): Promise<number>

  public create(args: {
    input: Array<DuplicateElementMutationResponseCreateInput>
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<CreateDuplicateElementMutationResponsesMutationResponse>

  public update(args: {
    where?: DuplicateElementMutationResponseWhere
    update?: DuplicateElementMutationResponseUpdateInput

    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<UpdateDuplicateElementMutationResponsesMutationResponse>

  public delete(args: {
    where?: DuplicateElementMutationResponseWhere

    context?: any
    rootValue: any
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>

  public aggregate(args: {
    where?: DuplicateElementMutationResponseWhere

    aggregate: DuplicateElementMutationResponseAggregateInput
    context?: any
    rootValue?: any
  }): Promise<DuplicateElementMutationResponseAggregateSelection>
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
export interface DeleteElementsInfoAggregateInput {
  count?: boolean
  nodesDeleted?: IntAggregateInput
  relationshipsDeleted?: IntAggregateInput
}

export declare class DeleteElementsInfoModel {
  public find(args?: {
    where?: DeleteElementsInfoWhere

    options?: DeleteElementsInfoOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<DeleteElementsInfo>>

  public count(args?: { where?: DeleteElementsInfoWhere }): Promise<number>

  public create(args: {
    input: Array<DeleteElementsInfoCreateInput>
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

    aggregate: DeleteElementsInfoAggregateInput
    context?: any
    rootValue?: any
  }): Promise<DeleteElementsInfoAggregateSelection>
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
export interface ComponentAggregateInput {
  count?: boolean
  id?: IdAggregateInput
  name?: StringAggregateInput
}

export declare class ComponentModel {
  public find(args?: {
    where?: ComponentWhere

    options?: ComponentOptions
    selectionSet?: string | DocumentNode | SelectionSetNode
    args?: any
    context?: any
    rootValue?: any
  }): Promise<Array<Component>>

  public count(args?: { where?: ComponentWhere }): Promise<number>

  public create(args: {
    input: Array<ComponentCreateInput>
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

    aggregate: ComponentAggregateInput
    context?: any
    rootValue?: any
  }): Promise<ComponentAggregateSelection>
}

export interface ModelMap {
  ResetDataMutationResponse: ResetDataMutationResponseModel
  ImportDataMutationResponse: ImportDataMutationResponseModel
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
  TagGraphOptions: TagGraphOptionsModel
  TagEdge: TagEdgeModel
  TagGraph: TagGraphModel
  ElementEdge: ElementEdgeModel
  ElementGraph: ElementGraphModel
  Prop: PropModel
  Hook: HookModel
  PropMapBinding: PropMapBindingModel
  Element: ElementModel
  DuplicateElementMutationResponse: DuplicateElementMutationResponseModel
  DeleteElementsInfo: DeleteElementsInfoModel
  Component: ComponentModel
}
