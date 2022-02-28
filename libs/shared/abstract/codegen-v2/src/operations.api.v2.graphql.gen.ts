import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from '@apollo/client'
export type CreateAppsMutationVariables = Exact<{
  input: Array<AppCreateInput> | AppCreateInput
}>

export type CreateAppsMutation = { createApps: { apps: Array<AppFragment> } }

export type UpdateAppsMutationVariables = Exact<{
  where: AppWhere
  update: AppUpdateInput
}>

export type UpdateAppsMutation = {
  updateApps: { apps: Array<AppBaseFragment> }
}

export type DeleteAppsMutationVariables = Exact<{
  where: AppWhere
}>

export type DeleteAppsMutation = { deleteApps: { nodesDeleted: number } }

export type GetAppsQueryVariables = Exact<{
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}>

export type GetAppsQuery = { apps: Array<AppFragment> }

export type AppFragment = {
  id: string
  name: string
  pages?:
    | Array<{
        id: string
        name: string
        rootElement: { id: string; name?: string | null | undefined }
      }>
    | null
    | undefined
}

export type AppBaseFragment = { id: string; name: string }

export type CreateAtomsMutationVariables = Exact<{
  input: Array<AtomCreateInput> | AtomCreateInput
}>

export type CreateAtomsMutation = {
  createAtoms: {
    info: { nodesCreated: number; relationshipsCreated: number }
    atoms: Array<AtomFragment>
  }
}

export type DeleteAtomsMutationVariables = Exact<{
  where: AtomWhere
}>

export type DeleteAtomsMutation = {
  deleteAtoms: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetAtomsQueryVariables = Exact<{
  where?: InputMaybe<AtomWhere>
  options?: InputMaybe<AtomOptions>
}>

export type GetAtomsQuery = { atoms: Array<AtomFragment> }

export type ImportAtomsMutationVariables = Exact<{
  input: ImportAtomsInput
}>

export type ImportAtomsMutation = {
  importAtoms?:
    | { atoms?: Array<{ id: string }> | null | undefined }
    | null
    | undefined
}

export type UpdateAtomsMutationVariables = Exact<{
  where?: InputMaybe<AtomWhere>
  update?: InputMaybe<AtomUpdateInput>
}>

export type UpdateAtomsMutation = {
  updateAtoms: { atoms: Array<AtomFragment> }
}

export type AtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: AtomType
  tags?: Array<{ id: string; name: string }> | null | undefined
  api: { id: string; name: string }
}

export type ComponentFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
  owner: { id: string; auth0Id: string }
}

export type CreateComponentsMutationVariables = Exact<{
  input: Array<ComponentCreateInput> | ComponentCreateInput
}>

export type CreateComponentsMutation = {
  createComponents: { components: Array<ComponentFragment> }
}

export type DeleteComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>
  delete?: InputMaybe<ComponentDeleteInput>
}>

export type DeleteComponentsMutation = {
  deleteComponents: { nodesDeleted: number }
}

export type UpdateComponentsMutationVariables = Exact<{
  where?: InputMaybe<ComponentWhere>
  update?: InputMaybe<ComponentUpdateInput>
}>

export type UpdateComponentsMutation = {
  updateComponents: { components: Array<ComponentFragment> }
}

export type GetComponentsQueryVariables = Exact<{
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}>

export type GetComponentsQuery = { components: Array<ComponentFragment> }

export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  component?: { id: string; name: string } | null | undefined
  instanceOfComponent?: { id: string; name: string } | null | undefined
  parentElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
  atom?: AtomFragment | null | undefined
  props?: PropFragment | null | undefined
  hooks?: Array<HookFragment> | null | undefined
  propMapBindings?: Array<PropMapBindingFragment> | null | undefined
  parentElementConnection: {
    edges: Array<{
      order?: number | null | undefined
      node: { id: string; name?: string | null | undefined }
    }>
  }
}

export type ElementEdgeFragment = {
  source: string
  target: string
  order?: number | null | undefined
}

export type ElementGraphFragment = {
  rootId?: string | null | undefined
  edges: Array<ElementEdgeFragment>
  vertices: Array<ElementFragment>
}

export type PropFragment = { id: string; data: string }

export type HookFragment = {
  id: string
  type: AtomType
  config: PropFragment
  element: { id: string; name?: string | null | undefined }
}

export type PropMapBindingFragment = {
  id: string
  sourceKey: string
  targetKey: string
  element: { id: string; name?: string | null | undefined }
  targetElement?:
    | { id: string; name?: string | null | undefined }
    | null
    | undefined
}

export type CreateElementsMutationVariables = Exact<{
  input: Array<ElementCreateInput> | ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<ElementFragment> }
}

export type DeleteElementsSubgraphMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  delete?: InputMaybe<ElementDeleteInput>
}>

export type DeleteElementsSubgraphMutation = {
  deleteElementsSubgraph: {
    nodesDeleted: number
    deletedIds?: Array<string> | null | undefined
  }
}

export type UpdateElementsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
}>

export type UpdateElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type MoveElementsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
}>

export type MoveElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type ConvertElementsToComponentsMutationVariables = Exact<{
  where?: InputMaybe<ElementWhere>
  update?: InputMaybe<ElementUpdateInput>
}>

export type ConvertElementsToComponentsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type DuplicateElementMutationVariables = Exact<{
  input: DuplicateElementInput
}>

export type DuplicateElementMutation = {
  duplicateElement: { elements: Array<ElementFragment> }
}

export type GetElementsQueryVariables = Exact<{
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}>

export type GetElementsQuery = { elements: Array<ElementFragment> }

export type CreateHooksMutationVariables = Exact<{
  input: Array<HookCreateInput> | HookCreateInput
}>

export type CreateHooksMutation = {
  createHooks: { hooks: Array<HookFragment> }
}

export type DeleteHooksMutationVariables = Exact<{
  where: HookWhere
}>

export type DeleteHooksMutation = { deleteHooks: { nodesDeleted: number } }

export type CreatePropMapBindingsMutationVariables = Exact<{
  input: Array<PropMapBindingCreateInput> | PropMapBindingCreateInput
}>

export type CreatePropMapBindingsMutation = {
  createPropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type UpdatePropMapBindingsMutationVariables = Exact<{
  where: PropMapBindingWhere
  update: PropMapBindingUpdateInput
}>

export type UpdatePropMapBindingsMutation = {
  updatePropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type DeletePropMapBindingsMutationVariables = Exact<{
  where: PropMapBindingWhere
}>

export type DeletePropMapBindingsMutation = {
  deletePropMapBindings: { nodesDeleted: number }
}

export type GetPropMapBindingsQueryVariables = Exact<{
  options?: InputMaybe<PropMapBindingOptions>
  where?: InputMaybe<PropMapBindingWhere>
}>

export type GetPropMapBindingsQuery = {
  propMapBindings: Array<PropMapBindingFragment>
}

export type CreatePagesMutationVariables = Exact<{
  input: Array<PageCreateInput> | PageCreateInput
}>

export type CreatePagesMutation = {
  createPages: { pages: Array<PageFragment> }
}

export type DeletePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>
  delete?: InputMaybe<PageDeleteInput>
}>

export type DeletePagesMutation = { deletePages: { nodesDeleted: number } }

export type UpdatePagesMutationVariables = Exact<{
  where?: InputMaybe<PageWhere>
  update?: InputMaybe<PageUpdateInput>
}>

export type UpdatePagesMutation = {
  updatePages: { pages: Array<PageFragment> }
}

export type GetPagesQueryVariables = Exact<{
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}>

export type GetPagesQuery = { pages: Array<PageFragment> }

export type PageFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
}

export type PageBaseFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
}

export type PageFullFragment = PageBaseFragment

export type TagFragment = {
  id: string
  name: string
  isRoot?: boolean | null | undefined
  children?: Array<{ id: string; name: string }> | null | undefined
}

export type TagEdgeFragment = { source: string; target: string }

export type TagGraphFragment = {
  vertices: Array<TagFragment>
  edges: Array<TagEdgeFragment>
}

export type CreateTagsMutationVariables = Exact<{
  input: Array<TagCreateInput> | TagCreateInput
}>

export type CreateTagsMutation = { createTags: { tags: Array<TagFragment> } }

export type UpdateTagsMutationVariables = Exact<{
  where: TagWhere
  update: TagUpdateInput
}>

export type UpdateTagsMutation = { updateTags: { tags: Array<TagFragment> } }

export type DeleteTagsMutationVariables = Exact<{
  where: TagWhere
}>

export type DeleteTagsMutation = { deleteTags: { nodesDeleted: number } }

export type GetTagsQueryVariables = Exact<{
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}>

export type GetTagsQuery = { tags: Array<TagFragment> }

export type GetTagGraphsQueryVariables = Exact<{ [key: string]: never }>

export type GetTagGraphsQuery = {
  tagGraphs?: TagGraphFragment | null | undefined
}

export type CreatePrimitiveTypesMutationVariables = Exact<{
  input: Array<PrimitiveTypeCreateInput> | PrimitiveTypeCreateInput
}>

export type CreatePrimitiveTypesMutation = {
  createPrimitiveTypes: { primitiveTypes: Array<PrimitiveTypeFragment> }
}

export type CreateArrayTypesMutationVariables = Exact<{
  input: Array<ArrayTypeCreateInput> | ArrayTypeCreateInput
}>

export type CreateArrayTypesMutation = {
  createArrayTypes: { arrayTypes: Array<ArrayTypeFragment> }
}

export type CreateUnionTypesMutationVariables = Exact<{
  input: Array<UnionTypeCreateInput> | UnionTypeCreateInput
}>

export type CreateUnionTypesMutation = {
  createUnionTypes: { unionTypes: Array<UnionTypeFragment> }
}

export type CreateInterfaceTypesMutationVariables = Exact<{
  input: Array<InterfaceTypeCreateInput> | InterfaceTypeCreateInput
}>

export type CreateInterfaceTypesMutation = {
  createInterfaceTypes: { interfaceTypes: Array<InterfaceTypeFragment> }
}

export type CreateElementTypesMutationVariables = Exact<{
  input: Array<ElementTypeCreateInput> | ElementTypeCreateInput
}>

export type CreateElementTypesMutation = {
  createElementTypes: { elementTypes: Array<ElementTypeFragment> }
}

export type CreateRenderPropsTypesMutationVariables = Exact<{
  input: Array<RenderPropsTypeCreateInput> | RenderPropsTypeCreateInput
}>

export type CreateRenderPropsTypesMutation = {
  createRenderPropsTypes: { renderPropsTypes: Array<RenderPropsTypeFragment> }
}

export type CreateEnumTypesMutationVariables = Exact<{
  input: Array<EnumTypeCreateInput> | EnumTypeCreateInput
}>

export type CreateEnumTypesMutation = {
  createEnumTypes: { enumTypes: Array<EnumTypeFragment> }
}

export type CreateLambdaTypesMutationVariables = Exact<{
  input: Array<LambdaTypeCreateInput> | LambdaTypeCreateInput
}>

export type CreateLambdaTypesMutation = {
  createLambdaTypes: { lambdaTypes: Array<LambdaTypeFragment> }
}

export type CreatePageTypesMutationVariables = Exact<{
  input: Array<PageTypeCreateInput> | PageTypeCreateInput
}>

export type CreatePageTypesMutation = {
  createPageTypes: { pageTypes: Array<PageTypeFragment> }
}

export type CreateAppTypesMutationVariables = Exact<{
  input: Array<AppTypeCreateInput> | AppTypeCreateInput
}>

export type CreateAppTypesMutation = {
  createAppTypes: { appTypes: Array<AppTypeFragment> }
}

export type CreateMonacoTypesMutationVariables = Exact<{
  input: Array<MonacoTypeCreateInput> | MonacoTypeCreateInput
}>

export type CreateMonacoTypesMutation = {
  createMonacoTypes: { monacoTypes: Array<MonacoTypeFragment> }
}

export type DeletePrimitiveTypesMutationVariables = Exact<{
  delete?: InputMaybe<PrimitiveTypeDeleteInput>
  where?: InputMaybe<PrimitiveTypeWhere>
}>

export type DeletePrimitiveTypesMutation = {
  deletePrimitiveTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteArrayTypesMutationVariables = Exact<{
  delete?: InputMaybe<ArrayTypeDeleteInput>
  where?: InputMaybe<ArrayTypeWhere>
}>

export type DeleteArrayTypesMutation = {
  deleteArrayTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteUnionTypesMutationVariables = Exact<{
  delete?: InputMaybe<UnionTypeDeleteInput>
  where?: InputMaybe<UnionTypeWhere>
}>

export type DeleteUnionTypesMutation = {
  deleteUnionTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteInterfaceTypesMutationVariables = Exact<{
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type DeleteInterfaceTypesMutation = {
  deleteInterfaceTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteElementTypesMutationVariables = Exact<{
  delete?: InputMaybe<ElementTypeDeleteInput>
  where?: InputMaybe<ElementTypeWhere>
}>

export type DeleteElementTypesMutation = {
  deleteElementTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteRenderPropsTypesMutationVariables = Exact<{
  delete?: InputMaybe<RenderPropsTypeDeleteInput>
  where?: InputMaybe<RenderPropsTypeWhere>
}>

export type DeleteRenderPropsTypesMutation = {
  deleteRenderPropsTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteEnumTypesMutationVariables = Exact<{
  delete?: InputMaybe<EnumTypeDeleteInput>
  where?: InputMaybe<EnumTypeWhere>
}>

export type DeleteEnumTypesMutation = {
  deleteEnumTypes: { relationshipsDeleted: number; nodesDeleted: number }
  deleteEnumTypeValues: { nodesDeleted: number }
}

export type DeleteLambdaTypesMutationVariables = Exact<{
  delete?: InputMaybe<LambdaTypeDeleteInput>
  where?: InputMaybe<LambdaTypeWhere>
}>

export type DeleteLambdaTypesMutation = {
  deleteLambdaTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeletePageTypesMutationVariables = Exact<{
  delete?: InputMaybe<PageTypeDeleteInput>
  where?: InputMaybe<PageTypeWhere>
}>

export type DeletePageTypesMutation = {
  deletePageTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteAppTypesMutationVariables = Exact<{
  delete?: InputMaybe<AppTypeDeleteInput>
  where?: InputMaybe<AppTypeWhere>
}>

export type DeleteAppTypesMutation = {
  deleteAppTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteMonacoTypesMutationVariables = Exact<{
  delete?: InputMaybe<MonacoTypeDeleteInput>
  where?: InputMaybe<MonacoTypeWhere>
}>

export type DeleteMonacoTypesMutation = {
  deleteMonacoTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type AppTypeFragment = TypeBase_AppType_Fragment

export type ArrayTypeWithItemTypeFragment = {
  itemType?:
    | Array<
        | TypeBase_AppType_Fragment
        | TypeBase_ArrayType_Fragment
        | TypeBase_ElementType_Fragment
        | TypeBase_EnumType_Fragment
        | TypeBase_InterfaceType_Fragment
        | TypeBase_LambdaType_Fragment
        | TypeBase_MonacoType_Fragment
        | TypeBase_PageType_Fragment
        | TypeBase_PrimitiveType_Fragment
        | TypeBase_ReactNodeType_Fragment
        | TypeBase_RenderPropsType_Fragment
        | TypeBase_UnionType_Fragment
      >
    | null
    | undefined
} & ArrayTypeFragment

export type ArrayTypeFragment = TypeBase_ArrayType_Fragment

export type ElementTypeFragment = {
  elementKind: ElementTypeKind
} & TypeBase_ElementType_Fragment

export type EnumTypeFragment = {
  allowedValues?: Array<EnumTypeValueFragment> | null | undefined
} & TypeBase_EnumType_Fragment

export type EnumTypeValueFragment = {
  id: string
  name?: string | null | undefined
  value: string
}

type Field_InterfaceTypeEdge_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

type Field_InterfaceTypeFieldsRelationship_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type FieldFragment =
  | Field_InterfaceTypeEdge_Fragment
  | Field_InterfaceTypeFieldsRelationship_Fragment

export type InterfaceTypeEdgeFragment = {
  target: string
  source: string
} & Field_InterfaceTypeEdge_Fragment

export type InterfaceTypeFragment = TypeBase_InterfaceType_Fragment

export type InterfaceTypeFieldEdgeFragment = {
  key: string
  description?: string | null | undefined
  cursor: string
  name?: string | null | undefined
  node:
    | (TypeBase_AppType_Fragment & AppTypeFragment)
    | (TypeBase_ArrayType_Fragment & ArrayTypeFragment)
    | (TypeBase_ElementType_Fragment & ElementTypeFragment)
    | (TypeBase_EnumType_Fragment & EnumTypeFragment)
    | TypeBase_InterfaceType_Fragment
    | (TypeBase_LambdaType_Fragment & LambdaTypeFragment)
    | (TypeBase_MonacoType_Fragment & MonacoTypeFragment)
    | (TypeBase_PageType_Fragment & PageTypeFragment)
    | (TypeBase_PrimitiveType_Fragment & PrimitiveTypeFragment)
    | TypeBase_ReactNodeType_Fragment
    | (TypeBase_RenderPropsType_Fragment & RenderPropsTypeFragment)
    | (TypeBase_UnionType_Fragment & UnionTypeFragment)
}

export type InterfaceTypeWithFieldsFragment = {
  fieldsConnection: {
    totalCount: number
    edges: Array<InterfaceTypeFieldEdgeFragment>
  }
} & InterfaceTypeFragment

export type InterfaceTypeWithGraphFragment = {
  graph: TypeGraphFragment
} & InterfaceTypeFragment

export type LambdaTypeFragment = TypeBase_LambdaType_Fragment

export type MonacoTypeFragment = {
  language: MonacoLanguage
} & TypeBase_MonacoType_Fragment

export type PageTypeFragment = TypeBase_PageType_Fragment

export type PrimitiveTypeFragment = {
  primitiveKind: PrimitiveTypeKind
} & TypeBase_PrimitiveType_Fragment

export type RenderPropsTypeFragment = TypeBase_RenderPropsType_Fragment

type Type_AppType_Fragment = TypeBase_AppType_Fragment & AppTypeFragment

type Type_ArrayType_Fragment = TypeBase_ArrayType_Fragment &
  ArrayTypeWithItemTypeFragment

type Type_ElementType_Fragment = TypeBase_ElementType_Fragment &
  ElementTypeFragment

type Type_EnumType_Fragment = TypeBase_EnumType_Fragment & EnumTypeFragment

type Type_InterfaceType_Fragment = TypeBase_InterfaceType_Fragment &
  InterfaceTypeWithFieldsFragment

type Type_LambdaType_Fragment = TypeBase_LambdaType_Fragment &
  LambdaTypeFragment

type Type_MonacoType_Fragment = TypeBase_MonacoType_Fragment &
  MonacoTypeFragment

type Type_PageType_Fragment = TypeBase_PageType_Fragment & PageTypeFragment

type Type_PrimitiveType_Fragment = TypeBase_PrimitiveType_Fragment &
  PrimitiveTypeFragment

type Type_ReactNodeType_Fragment = TypeBase_ReactNodeType_Fragment

type Type_RenderPropsType_Fragment = TypeBase_RenderPropsType_Fragment &
  RenderPropsTypeFragment

type Type_UnionType_Fragment = TypeBase_UnionType_Fragment &
  UnionTypeWithInnerTypesFragment

export type TypeFragment =
  | Type_AppType_Fragment
  | Type_ArrayType_Fragment
  | Type_ElementType_Fragment
  | Type_EnumType_Fragment
  | Type_InterfaceType_Fragment
  | Type_LambdaType_Fragment
  | Type_MonacoType_Fragment
  | Type_PageType_Fragment
  | Type_PrimitiveType_Fragment
  | Type_ReactNodeType_Fragment
  | Type_RenderPropsType_Fragment
  | Type_UnionType_Fragment

type TypeNonRecursive_AppType_Fragment = TypeBase_AppType_Fragment &
  AppTypeFragment

type TypeNonRecursive_ArrayType_Fragment = TypeBase_ArrayType_Fragment &
  ArrayTypeFragment

type TypeNonRecursive_ElementType_Fragment = TypeBase_ElementType_Fragment &
  ElementTypeFragment

type TypeNonRecursive_EnumType_Fragment = TypeBase_EnumType_Fragment &
  EnumTypeFragment

type TypeNonRecursive_InterfaceType_Fragment = TypeBase_InterfaceType_Fragment &
  InterfaceTypeFragment

type TypeNonRecursive_LambdaType_Fragment = TypeBase_LambdaType_Fragment &
  LambdaTypeFragment

type TypeNonRecursive_MonacoType_Fragment = TypeBase_MonacoType_Fragment &
  MonacoTypeFragment

type TypeNonRecursive_PageType_Fragment = TypeBase_PageType_Fragment &
  PageTypeFragment

type TypeNonRecursive_PrimitiveType_Fragment = TypeBase_PrimitiveType_Fragment &
  PrimitiveTypeFragment

type TypeNonRecursive_ReactNodeType_Fragment = TypeBase_ReactNodeType_Fragment

type TypeNonRecursive_RenderPropsType_Fragment =
  TypeBase_RenderPropsType_Fragment & RenderPropsTypeFragment

type TypeNonRecursive_UnionType_Fragment = TypeBase_UnionType_Fragment &
  UnionTypeFragment

export type TypeNonRecursiveFragment =
  | TypeNonRecursive_AppType_Fragment
  | TypeNonRecursive_ArrayType_Fragment
  | TypeNonRecursive_ElementType_Fragment
  | TypeNonRecursive_EnumType_Fragment
  | TypeNonRecursive_InterfaceType_Fragment
  | TypeNonRecursive_LambdaType_Fragment
  | TypeNonRecursive_MonacoType_Fragment
  | TypeNonRecursive_PageType_Fragment
  | TypeNonRecursive_PrimitiveType_Fragment
  | TypeNonRecursive_ReactNodeType_Fragment
  | TypeNonRecursive_RenderPropsType_Fragment
  | TypeNonRecursive_UnionType_Fragment

type TypeBase_AppType_Fragment = {
  id: string
  name: string
  typeKind: 'AppType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_ArrayType_Fragment = {
  id: string
  name: string
  typeKind: 'ArrayType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_ElementType_Fragment = {
  id: string
  name: string
  typeKind: 'ElementType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_EnumType_Fragment = {
  id: string
  name: string
  typeKind: 'EnumType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_InterfaceType_Fragment = {
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_LambdaType_Fragment = {
  id: string
  name: string
  typeKind: 'LambdaType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_MonacoType_Fragment = {
  id: string
  name: string
  typeKind: 'MonacoType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_PageType_Fragment = {
  id: string
  name: string
  typeKind: 'PageType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_PrimitiveType_Fragment = {
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_ReactNodeType_Fragment = {
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_RenderPropsType_Fragment = {
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

type TypeBase_UnionType_Fragment = {
  id: string
  name: string
  typeKind: 'UnionType'
  owner?: { id: string; auth0Id: string } | null | undefined
}

export type TypeBaseFragment =
  | TypeBase_AppType_Fragment
  | TypeBase_ArrayType_Fragment
  | TypeBase_ElementType_Fragment
  | TypeBase_EnumType_Fragment
  | TypeBase_InterfaceType_Fragment
  | TypeBase_LambdaType_Fragment
  | TypeBase_MonacoType_Fragment
  | TypeBase_PageType_Fragment
  | TypeBase_PrimitiveType_Fragment
  | TypeBase_ReactNodeType_Fragment
  | TypeBase_RenderPropsType_Fragment
  | TypeBase_UnionType_Fragment

type TypeEdge_Edge_Fragment = { source: string; target: string }

type TypeEdge_InterfaceTypeEdge_Fragment = {
  source: string
  target: string
} & Field_InterfaceTypeEdge_Fragment

export type TypeEdgeFragment =
  | TypeEdge_Edge_Fragment
  | TypeEdge_InterfaceTypeEdge_Fragment

export type TypeGraphFragment = {
  edges: Array<TypeEdge_Edge_Fragment | TypeEdge_InterfaceTypeEdge_Fragment>
  vertices: Array<
    | TypeNonRecursive_AppType_Fragment
    | TypeNonRecursive_ArrayType_Fragment
    | TypeNonRecursive_ElementType_Fragment
    | TypeNonRecursive_EnumType_Fragment
    | TypeNonRecursive_InterfaceType_Fragment
    | TypeNonRecursive_LambdaType_Fragment
    | TypeNonRecursive_MonacoType_Fragment
    | TypeNonRecursive_PageType_Fragment
    | TypeNonRecursive_PrimitiveType_Fragment
    | TypeNonRecursive_RenderPropsType_Fragment
    | TypeNonRecursive_UnionType_Fragment
  >
}

export type UnionTypeWithInnerTypesFragment = {
  typesOfUnionType?:
    | Array<
        | TypeBase_AppType_Fragment
        | TypeBase_ArrayType_Fragment
        | TypeBase_ElementType_Fragment
        | TypeBase_EnumType_Fragment
        | TypeBase_InterfaceType_Fragment
        | TypeBase_LambdaType_Fragment
        | TypeBase_MonacoType_Fragment
        | TypeBase_PageType_Fragment
        | TypeBase_PrimitiveType_Fragment
        | TypeBase_ReactNodeType_Fragment
        | TypeBase_RenderPropsType_Fragment
        | TypeBase_UnionType_Fragment
      >
    | null
    | undefined
} & UnionTypeFragment

export type UnionTypeFragment = TypeBase_UnionType_Fragment

export type GetPrimitiveTypesQueryVariables = Exact<{
  options?: InputMaybe<PrimitiveTypeOptions>
  where?: InputMaybe<PrimitiveTypeWhere>
}>

export type GetPrimitiveTypesQuery = { types: Array<PrimitiveTypeFragment> }

export type GetArrayTypesQueryVariables = Exact<{
  options?: InputMaybe<ArrayTypeOptions>
  where?: InputMaybe<ArrayTypeWhere>
}>

export type GetArrayTypesQuery = { types: Array<ArrayTypeWithItemTypeFragment> }

export type GetUnionTypesQueryVariables = Exact<{
  options?: InputMaybe<UnionTypeOptions>
  where?: InputMaybe<UnionTypeWhere>
}>

export type GetUnionTypesQuery = { types: Array<UnionTypeFragment> }

export type GetInterfaceTypesQueryVariables = Exact<{
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type GetInterfaceTypesQuery = { types: Array<InterfaceTypeFragment> }

export type GetInterfaceTypesWithFieldsQueryVariables = Exact<{
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type GetInterfaceTypesWithFieldsQuery = {
  types: Array<InterfaceTypeWithFieldsFragment>
}

export type GetInterfaceTypeGraphsQueryVariables = Exact<{
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}>

export type GetInterfaceTypeGraphsQuery = {
  types: Array<InterfaceTypeWithGraphFragment>
}

export type GetElementTypesQueryVariables = Exact<{
  options?: InputMaybe<ElementTypeOptions>
  where?: InputMaybe<ElementTypeWhere>
}>

export type GetElementTypesQuery = { types: Array<ElementTypeFragment> }

export type GetRenderPropsTypesQueryVariables = Exact<{
  options?: InputMaybe<RenderPropsTypeOptions>
  where?: InputMaybe<RenderPropsTypeWhere>
}>

export type GetRenderPropsTypesQuery = { types: Array<RenderPropsTypeFragment> }

export type GetEnumTypesQueryVariables = Exact<{
  options?: InputMaybe<EnumTypeOptions>
  where?: InputMaybe<EnumTypeWhere>
}>

export type GetEnumTypesQuery = { types: Array<EnumTypeFragment> }

export type GetLambdaTypesQueryVariables = Exact<{
  options?: InputMaybe<LambdaTypeOptions>
  where?: InputMaybe<LambdaTypeWhere>
}>

export type GetLambdaTypesQuery = { types: Array<LambdaTypeFragment> }

export type GetPageTypesQueryVariables = Exact<{
  options?: InputMaybe<PageTypeOptions>
  where?: InputMaybe<PageTypeWhere>
}>

export type GetPageTypesQuery = { types: Array<PageTypeFragment> }

export type GetAppTypesQueryVariables = Exact<{
  options?: InputMaybe<AppTypeOptions>
  where?: InputMaybe<AppTypeWhere>
}>

export type GetAppTypesQuery = { types: Array<AppTypeFragment> }

export type GetMonacoTypesQueryVariables = Exact<{
  options?: InputMaybe<MonacoTypeOptions>
  where?: InputMaybe<MonacoTypeWhere>
}>

export type GetMonacoTypesQuery = { types: Array<MonacoTypeFragment> }

export type CreateFieldMutationVariables = Exact<{
  input: UpsertFieldInput
}>

export type CreateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type UpdateFieldMutationVariables = Exact<{
  input: UpsertFieldInput
}>

export type UpdateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type DeleteFieldMutationVariables = Exact<{
  input: DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteFieldEdge: { deletedEdgesCount: number }
}

export type IsTypeDescendantOfQueryVariables = Exact<{
  descendantTypeId: Scalars['ID']
  parentTypeId: Scalars['ID']
}>

export type IsTypeDescendantOfQuery = {
  isTypeDescendantOf?: boolean | null | undefined
}

export type GetTypeReferencesQueryVariables = Exact<{
  typeId: Scalars['ID']
}>

export type GetTypeReferencesQuery = {
  getTypeReferences?: Array<{ name: string; label: string }> | null | undefined
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
  updatePrimitiveTypes: { primitiveTypes: Array<PrimitiveTypeFragment> }
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
  updateArrayTypes: { arrayTypes: Array<ArrayTypeFragment> }
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
  updateUnionTypes: { unionTypes: Array<UnionTypeFragment> }
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
  updateInterfaceTypes: { interfaceTypes: Array<InterfaceTypeFragment> }
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
  updateElementTypes: { elementTypes: Array<ElementTypeFragment> }
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
  updateRenderPropsTypes: { renderPropsTypes: Array<RenderPropsTypeFragment> }
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
  updateEnumTypes: { enumTypes: Array<EnumTypeFragment> }
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
  updateLambdaTypes: { lambdaTypes: Array<LambdaTypeFragment> }
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
  updatePageTypes: { pageTypes: Array<PageTypeFragment> }
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
  updateAppTypes: { appTypes: Array<AppTypeFragment> }
}

export type UpdateMonacoTypesMutationVariables = Exact<{
  connect?: InputMaybe<MonacoTypeConnectInput>
  create?: InputMaybe<MonacoTypeRelationInput>
  delete?: InputMaybe<MonacoTypeDeleteInput>
  disconnect?: InputMaybe<MonacoTypeDisconnectInput>
  update?: InputMaybe<MonacoTypeUpdateInput>
  where?: InputMaybe<MonacoTypeWhere>
}>

export type UpdateMonacoTypesMutation = {
  updateMonacoTypes: { monacoTypes: Array<MonacoTypeFragment> }
}

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    pages {
      id
      name
      rootElement {
        id
        name
      }
    }
  }
`
export const AppBaseFragmentDoc = gql`
  fragment AppBase on App {
    id
    name
  }
`
export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    id
    name
    rootElement {
      id
      name
    }
    owner {
      id
      auth0Id
    }
  }
`
export const ElementEdgeFragmentDoc = gql`
  fragment ElementEdge on ElementEdge {
    source
    target
    order
  }
`
export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    __typename
    id
    name
    type
    tags {
      id
      name
    }
    api {
      id
      name
    }
  }
`
export const PropFragmentDoc = gql`
  fragment Prop on Prop {
    id
    data
  }
`
export const HookFragmentDoc = gql`
  fragment Hook on Hook {
    id
    type
    config {
      ...Prop
    }
    element {
      id
      name
    }
  }
  ${PropFragmentDoc}
`
export const PropMapBindingFragmentDoc = gql`
  fragment PropMapBinding on PropMapBinding {
    id
    sourceKey
    element {
      id
      name
    }
    targetElement {
      id
      name
    }
    targetKey
  }
`
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    css
    component {
      id
      name
    }
    instanceOfComponent {
      id
      name
    }
    parentElement {
      id
      name
    }
    atom {
      ...Atom
    }
    props {
      ...Prop
    }
    hooks {
      ...Hook
    }
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      ...PropMapBinding
    }
    propTransformationJs
    parentElementConnection {
      edges {
        node {
          id
          name
        }
        order
      }
    }
  }
  ${AtomFragmentDoc}
  ${PropFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
export const ElementGraphFragmentDoc = gql`
  fragment ElementGraph on ElementGraph {
    edges {
      ...ElementEdge
    }
    vertices {
      ...Element
    }
    rootId
  }
  ${ElementEdgeFragmentDoc}
  ${ElementFragmentDoc}
`
export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
  }
  ${PageBaseFragmentDoc}
`
export const TagFragmentDoc = gql`
  fragment Tag on Tag {
    id
    name
    isRoot
    children {
      id
      name
    }
  }
`
export const TagEdgeFragmentDoc = gql`
  fragment TagEdge on TagEdge {
    source
    target
  }
`
export const TagGraphFragmentDoc = gql`
  fragment TagGraph on TagGraph {
    vertices {
      ...Tag
    }
    edges {
      ...TagEdge
    }
  }
  ${TagFragmentDoc}
  ${TagEdgeFragmentDoc}
`
export const FieldFragmentDoc = gql`
  fragment Field on Field {
    key
    name
    description
  }
`
export const InterfaceTypeEdgeFragmentDoc = gql`
  fragment InterfaceTypeEdge on InterfaceTypeEdge {
    ...Field
    target
    source
  }
  ${FieldFragmentDoc}
`
export const TypeBaseFragmentDoc = gql`
  fragment TypeBase on TypeBase {
    typeKind: __typename
    id
    owner {
      id
      auth0Id
    }
    name
  }
`
export const InterfaceTypeFragmentDoc = gql`
  fragment InterfaceType on InterfaceType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const TypeEdgeFragmentDoc = gql`
  fragment TypeEdge on TypeEdge {
    ... on InterfaceTypeEdge {
      ...Field
    }
    ... on IEdge {
      source
      target
    }
  }
  ${FieldFragmentDoc}
`
export const ArrayTypeFragmentDoc = gql`
  fragment ArrayType on ArrayType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const EnumTypeValueFragmentDoc = gql`
  fragment EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
export const EnumTypeFragmentDoc = gql`
  fragment EnumType on EnumType {
    ...TypeBase
    allowedValues {
      ...EnumTypeValue
    }
  }
  ${TypeBaseFragmentDoc}
  ${EnumTypeValueFragmentDoc}
`
export const PrimitiveTypeFragmentDoc = gql`
  fragment PrimitiveType on PrimitiveType {
    ...TypeBase
    primitiveKind
  }
  ${TypeBaseFragmentDoc}
`
export const ElementTypeFragmentDoc = gql`
  fragment ElementType on ElementType {
    ...TypeBase
    elementKind
  }
  ${TypeBaseFragmentDoc}
`
export const LambdaTypeFragmentDoc = gql`
  fragment LambdaType on LambdaType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const RenderPropsTypeFragmentDoc = gql`
  fragment RenderPropsType on RenderPropsType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const UnionTypeFragmentDoc = gql`
  fragment UnionType on UnionType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const MonacoTypeFragmentDoc = gql`
  fragment MonacoType on MonacoType {
    ...TypeBase
    language
  }
  ${TypeBaseFragmentDoc}
`
export const PageTypeFragmentDoc = gql`
  fragment PageType on PageType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const AppTypeFragmentDoc = gql`
  fragment AppType on AppType {
    ...TypeBase
  }
  ${TypeBaseFragmentDoc}
`
export const TypeNonRecursiveFragmentDoc = gql`
  fragment TypeNonRecursive on TypeBase {
    ...TypeBase
    ...ArrayType
    ...EnumType
    ...InterfaceType
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...RenderPropsType
    ...UnionType
    ...MonacoType
    ...PageType
    ...AppType
  }
  ${TypeBaseFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const TypeGraphFragmentDoc = gql`
  fragment TypeGraph on TypeGraph {
    edges {
      ...TypeEdge
    }
    vertices {
      ...TypeNonRecursive
    }
  }
  ${TypeEdgeFragmentDoc}
  ${TypeNonRecursiveFragmentDoc}
`
export const InterfaceTypeWithGraphFragmentDoc = gql`
  fragment InterfaceTypeWithGraph on InterfaceType {
    ...InterfaceType
    graph {
      ...TypeGraph
    }
  }
  ${InterfaceTypeFragmentDoc}
  ${TypeGraphFragmentDoc}
`
export const ArrayTypeWithItemTypeFragmentDoc = gql`
  fragment ArrayTypeWithItemType on ArrayType {
    ...ArrayType
    itemType {
      ... on TypeBase {
        ...TypeBase
      }
    }
  }
  ${ArrayTypeFragmentDoc}
  ${TypeBaseFragmentDoc}
`
export const InterfaceTypeFieldEdgeFragmentDoc = gql`
  fragment InterfaceTypeFieldEdge on InterfaceTypeFieldsRelationship {
    key
    description
    cursor
    name
    node {
      ...TypeBase
      ...ArrayType
      ...EnumType
      ...PrimitiveType
      ...ElementType
      ...LambdaType
      ...RenderPropsType
      ...UnionType
      ...MonacoType
      ...PageType
      ...AppType
    }
  }
  ${TypeBaseFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const InterfaceTypeWithFieldsFragmentDoc = gql`
  fragment InterfaceTypeWithFields on InterfaceType {
    ...InterfaceType
    fieldsConnection {
      edges {
        ...InterfaceTypeFieldEdge
      }
      totalCount
    }
  }
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
`
export const UnionTypeWithInnerTypesFragmentDoc = gql`
  fragment UnionTypeWithInnerTypes on UnionType {
    ...UnionType
    typesOfUnionType {
      ... on TypeBase {
        ...TypeBase
      }
    }
  }
  ${UnionTypeFragmentDoc}
  ${TypeBaseFragmentDoc}
`
export const TypeFragmentDoc = gql`
  fragment Type on TypeBase {
    ...TypeBase
    ...ArrayTypeWithItemType
    ...EnumType
    ...InterfaceTypeWithFields
    ...PrimitiveType
    ...ElementType
    ...LambdaType
    ...RenderPropsType
    ...UnionTypeWithInnerTypes
    ...MonacoType
    ...PageType
    ...AppType
  }
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${InterfaceTypeWithFieldsFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const CreateAppsGql = gql`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...App
      }
    }
  }
  ${AppFragmentDoc}
`
export const UpdateAppsGql = gql`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(where: $where, update: $update) {
      apps {
        ...AppBase
      }
    }
  }
  ${AppBaseFragmentDoc}
`
export const DeleteAppsGql = gql`
  mutation DeleteApps($where: AppWhere!) {
    deleteApps(where: $where) {
      nodesDeleted
    }
  }
`
export const GetAppsGql = gql`
  query GetApps($options: AppOptions, $where: AppWhere) {
    apps: apps(options: $options, where: $where) {
      ...App
    }
  }
  ${AppFragmentDoc}
`
export const CreateAtomsGql = gql`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`
export const DeleteAtomsGql = gql`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetAtomsGql = gql`
  query GetAtoms($where: AtomWhere, $options: AtomOptions) {
    atoms(where: $where, options: $options) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`
export const ImportAtomsGql = gql`
  mutation ImportAtoms($input: ImportAtomsInput!) {
    importAtoms(input: $input) {
      atoms {
        id
      }
    }
  }
`
export const UpdateAtomsGql = gql`
  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
    updateAtoms(update: $update, where: $where) {
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`
export const CreateComponentsGql = gql`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const DeleteComponentsGql = gql`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdateComponentsGql = gql`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(where: $where, update: $update) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const GetComponentsGql = gql`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
`
export const CreateElementsGql = gql`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DeleteElementsSubgraphGql = gql`
  mutation DeleteElementsSubgraph(
    $where: ElementWhere
    $delete: ElementDeleteInput
  ) {
    deleteElementsSubgraph(where: $where, delete: $delete) {
      nodesDeleted
      deletedIds
    }
  }
`
export const UpdateElementsGql = gql`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const MoveElementsGql = gql`
  mutation MoveElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const ConvertElementsToComponentsGql = gql`
  mutation ConvertElementsToComponents(
    $where: ElementWhere
    $update: ElementUpdateInput
  ) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DuplicateElementGql = gql`
  mutation DuplicateElement($input: DuplicateElementInput!) {
    duplicateElement(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementsGql = gql`
  query GetElements($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const CreateHooksGql = gql`
  mutation CreateHooks($input: [HookCreateInput!]!) {
    createHooks(input: $input) {
      hooks {
        ...Hook
      }
    }
  }
  ${HookFragmentDoc}
`
export const DeleteHooksGql = gql`
  mutation DeleteHooks($where: HookWhere!) {
    deleteHooks(where: $where) {
      nodesDeleted
    }
  }
`
export const CreatePropMapBindingsGql = gql`
  mutation CreatePropMapBindings($input: [PropMapBindingCreateInput!]!) {
    createPropMapBindings(input: $input) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const UpdatePropMapBindingsGql = gql`
  mutation UpdatePropMapBindings(
    $where: PropMapBindingWhere!
    $update: PropMapBindingUpdateInput!
  ) {
    updatePropMapBindings(where: $where, update: $update) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const DeletePropMapBindingsGql = gql`
  mutation DeletePropMapBindings($where: PropMapBindingWhere!) {
    deletePropMapBindings(where: $where) {
      nodesDeleted
    }
  }
`
export const GetPropMapBindingsGql = gql`
  query GetPropMapBindings(
    $options: PropMapBindingOptions
    $where: PropMapBindingWhere
  ) {
    propMapBindings(options: $options, where: $where) {
      ...PropMapBinding
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const CreatePagesGql = gql`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const DeletePagesGql = gql`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePagesGql = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(where: $where, update: $update) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const GetPagesGql = gql`
  query GetPages($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      ...Page
    }
  }
  ${PageFragmentDoc}
`
export const CreateTagsGql = gql`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const UpdateTagsGql = gql`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(where: $where, update: $update) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const DeleteTagsGql = gql`
  mutation DeleteTags($where: TagWhere!) {
    deleteTags(where: $where) {
      nodesDeleted
    }
  }
`
export const GetTagsGql = gql`
  query GetTags($options: TagOptions, $where: TagWhere) {
    tags: tags(options: $options, where: $where) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export const GetTagGraphsGql = gql`
  query GetTagGraphs {
    tagGraphs {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`
export const CreatePrimitiveTypesGql = gql`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    createPrimitiveTypes(input: $input) {
      primitiveTypes {
        ...PrimitiveType
      }
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const CreateArrayTypesGql = gql`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    createArrayTypes(input: $input) {
      arrayTypes {
        ...ArrayType
      }
    }
  }
  ${ArrayTypeFragmentDoc}
`
export const CreateUnionTypesGql = gql`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    createUnionTypes(input: $input) {
      unionTypes {
        ...UnionType
      }
    }
  }
  ${UnionTypeFragmentDoc}
`
export const CreateInterfaceTypesGql = gql`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    createInterfaceTypes(input: $input) {
      interfaceTypes {
        ...InterfaceType
      }
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const CreateElementTypesGql = gql`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    createElementTypes(input: $input) {
      elementTypes {
        ...ElementType
      }
    }
  }
  ${ElementTypeFragmentDoc}
`
export const CreateRenderPropsTypesGql = gql`
  mutation CreateRenderPropsTypes($input: [RenderPropsTypeCreateInput!]!) {
    createRenderPropsTypes(input: $input) {
      renderPropsTypes {
        ...RenderPropsType
      }
    }
  }
  ${RenderPropsTypeFragmentDoc}
`
export const CreateEnumTypesGql = gql`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    createEnumTypes(input: $input) {
      enumTypes {
        ...EnumType
      }
    }
  }
  ${EnumTypeFragmentDoc}
`
export const CreateLambdaTypesGql = gql`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    createLambdaTypes(input: $input) {
      lambdaTypes {
        ...LambdaType
      }
    }
  }
  ${LambdaTypeFragmentDoc}
`
export const CreatePageTypesGql = gql`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    createPageTypes(input: $input) {
      pageTypes {
        ...PageType
      }
    }
  }
  ${PageTypeFragmentDoc}
`
export const CreateAppTypesGql = gql`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    createAppTypes(input: $input) {
      appTypes {
        ...AppType
      }
    }
  }
  ${AppTypeFragmentDoc}
`
export const CreateMonacoTypesGql = gql`
  mutation CreateMonacoTypes($input: [MonacoTypeCreateInput!]!) {
    createMonacoTypes(input: $input) {
      monacoTypes {
        ...MonacoType
      }
    }
  }
  ${MonacoTypeFragmentDoc}
`
export const DeletePrimitiveTypesGql = gql`
  mutation DeletePrimitiveTypes(
    $delete: PrimitiveTypeDeleteInput
    $where: PrimitiveTypeWhere
  ) {
    deletePrimitiveTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteArrayTypesGql = gql`
  mutation DeleteArrayTypes(
    $delete: ArrayTypeDeleteInput
    $where: ArrayTypeWhere
  ) {
    deleteArrayTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteUnionTypesGql = gql`
  mutation DeleteUnionTypes(
    $delete: UnionTypeDeleteInput
    $where: UnionTypeWhere
  ) {
    deleteUnionTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteInterfaceTypesGql = gql`
  mutation DeleteInterfaceTypes(
    $delete: InterfaceTypeDeleteInput
    $where: InterfaceTypeWhere
  ) {
    deleteInterfaceTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteElementTypesGql = gql`
  mutation DeleteElementTypes(
    $delete: ElementTypeDeleteInput
    $where: ElementTypeWhere
  ) {
    deleteElementTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteRenderPropsTypesGql = gql`
  mutation DeleteRenderPropsTypes(
    $delete: RenderPropsTypeDeleteInput
    $where: RenderPropsTypeWhere
  ) {
    deleteRenderPropsTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteEnumTypesGql = gql`
  mutation DeleteEnumTypes(
    $delete: EnumTypeDeleteInput
    $where: EnumTypeWhere
  ) {
    deleteEnumTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
    deleteEnumTypeValues(where: { enumType: $where }) {
      nodesDeleted
    }
  }
`
export const DeleteLambdaTypesGql = gql`
  mutation DeleteLambdaTypes(
    $delete: LambdaTypeDeleteInput
    $where: LambdaTypeWhere
  ) {
    deleteLambdaTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeletePageTypesGql = gql`
  mutation DeletePageTypes(
    $delete: PageTypeDeleteInput
    $where: PageTypeWhere
  ) {
    deletePageTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteAppTypesGql = gql`
  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
    deleteAppTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteMonacoTypesGql = gql`
  mutation DeleteMonacoTypes(
    $delete: MonacoTypeDeleteInput
    $where: MonacoTypeWhere
  ) {
    deleteMonacoTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const GetPrimitiveTypesGql = gql`
  query GetPrimitiveTypes(
    $options: PrimitiveTypeOptions
    $where: PrimitiveTypeWhere
  ) {
    types: primitiveTypes(where: $where, options: $options) {
      ...PrimitiveType
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const GetArrayTypesGql = gql`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(where: $where, options: $options) {
      ...ArrayTypeWithItemType
    }
  }
  ${ArrayTypeWithItemTypeFragmentDoc}
`
export const GetUnionTypesGql = gql`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(where: $where, options: $options) {
      ...UnionType
    }
  }
  ${UnionTypeFragmentDoc}
`
export const GetInterfaceTypesGql = gql`
  query GetInterfaceTypes(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceType
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const GetInterfaceTypesWithFieldsGql = gql`
  query GetInterfaceTypesWithFields(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceTypeWithFields
    }
  }
  ${InterfaceTypeWithFieldsFragmentDoc}
`
export const GetInterfaceTypeGraphsGql = gql`
  query GetInterfaceTypeGraphs(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceTypeWithGraph
    }
  }
  ${InterfaceTypeWithGraphFragmentDoc}
`
export const GetElementTypesGql = gql`
  query GetElementTypes(
    $options: ElementTypeOptions
    $where: ElementTypeWhere
  ) {
    types: elementTypes(where: $where, options: $options) {
      ...ElementType
    }
  }
  ${ElementTypeFragmentDoc}
`
export const GetRenderPropsTypesGql = gql`
  query GetRenderPropsTypes(
    $options: RenderPropsTypeOptions
    $where: RenderPropsTypeWhere
  ) {
    types: renderPropsTypes(where: $where, options: $options) {
      ...RenderPropsType
    }
  }
  ${RenderPropsTypeFragmentDoc}
`
export const GetEnumTypesGql = gql`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(where: $where, options: $options) {
      ...EnumType
    }
  }
  ${EnumTypeFragmentDoc}
`
export const GetLambdaTypesGql = gql`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(where: $where, options: $options) {
      ...LambdaType
    }
  }
  ${LambdaTypeFragmentDoc}
`
export const GetPageTypesGql = gql`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(where: $where, options: $options) {
      ...PageType
    }
  }
  ${PageTypeFragmentDoc}
`
export const GetAppTypesGql = gql`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(where: $where, options: $options) {
      ...AppType
    }
  }
  ${AppTypeFragmentDoc}
`
export const GetMonacoTypesGql = gql`
  query GetMonacoTypes($options: MonacoTypeOptions, $where: MonacoTypeWhere) {
    types: monacoTypes(where: $where, options: $options) {
      ...MonacoType
    }
  }
  ${MonacoTypeFragmentDoc}
`
export const CreateFieldGql = gql`
  mutation CreateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: true) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
`
export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: false) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
`
export const DeleteFieldGql = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteFieldEdge(input: $input) {
      deletedEdgesCount
    }
  }
`
export const IsTypeDescendantOfGql = gql`
  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
    isTypeDescendantOf(
      descendantTypeId: $descendantTypeId
      parentTypeId: $parentTypeId
    )
  }
`
export const GetTypeReferencesGql = gql`
  query GetTypeReferences($typeId: ID!) {
    getTypeReferences(typeId: $typeId) {
      name
      label
    }
  }
`
export const UpdatePrimitiveTypesGql = gql`
  mutation UpdatePrimitiveTypes(
    $connect: PrimitiveTypeConnectInput
    $create: PrimitiveTypeRelationInput
    $delete: PrimitiveTypeDeleteInput
    $disconnect: PrimitiveTypeDisconnectInput
    $update: PrimitiveTypeUpdateInput
    $where: PrimitiveTypeWhere
  ) {
    updatePrimitiveTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      primitiveTypes {
        ...PrimitiveType
      }
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const UpdateArrayTypesGql = gql`
  mutation UpdateArrayTypes(
    $connect: ArrayTypeConnectInput
    $create: ArrayTypeRelationInput
    $delete: ArrayTypeDeleteInput
    $disconnect: ArrayTypeDisconnectInput
    $update: ArrayTypeUpdateInput
    $where: ArrayTypeWhere
  ) {
    updateArrayTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      arrayTypes {
        ...ArrayType
      }
    }
  }
  ${ArrayTypeFragmentDoc}
`
export const UpdateUnionTypesGql = gql`
  mutation UpdateUnionTypes(
    $connect: UnionTypeConnectInput
    $create: UnionTypeRelationInput
    $delete: UnionTypeDeleteInput
    $disconnect: UnionTypeDisconnectInput
    $update: UnionTypeUpdateInput
    $where: UnionTypeWhere
  ) {
    updateUnionTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      unionTypes {
        ...UnionType
      }
    }
  }
  ${UnionTypeFragmentDoc}
`
export const UpdateInterfaceTypesGql = gql`
  mutation UpdateInterfaceTypes(
    $connect: InterfaceTypeConnectInput
    $create: InterfaceTypeRelationInput
    $delete: InterfaceTypeDeleteInput
    $disconnect: InterfaceTypeDisconnectInput
    $update: InterfaceTypeUpdateInput
    $where: InterfaceTypeWhere
  ) {
    updateInterfaceTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      interfaceTypes {
        ...InterfaceType
      }
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const UpdateElementTypesGql = gql`
  mutation UpdateElementTypes(
    $connect: ElementTypeConnectInput
    $create: ElementTypeRelationInput
    $delete: ElementTypeDeleteInput
    $disconnect: ElementTypeDisconnectInput
    $update: ElementTypeUpdateInput
    $where: ElementTypeWhere
  ) {
    updateElementTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      elementTypes {
        ...ElementType
      }
    }
  }
  ${ElementTypeFragmentDoc}
`
export const UpdateRenderPropsTypesGql = gql`
  mutation UpdateRenderPropsTypes(
    $connect: RenderPropsTypeConnectInput
    $create: RenderPropsTypeRelationInput
    $delete: RenderPropsTypeDeleteInput
    $disconnect: RenderPropsTypeDisconnectInput
    $update: RenderPropsTypeUpdateInput
    $where: RenderPropsTypeWhere
  ) {
    updateRenderPropsTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      renderPropsTypes {
        ...RenderPropsType
      }
    }
  }
  ${RenderPropsTypeFragmentDoc}
`
export const UpdateEnumTypesGql = gql`
  mutation UpdateEnumTypes(
    $connect: EnumTypeConnectInput
    $create: EnumTypeRelationInput
    $delete: EnumTypeDeleteInput
    $disconnect: EnumTypeDisconnectInput
    $update: EnumTypeUpdateInput
    $where: EnumTypeWhere
  ) {
    updateEnumTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      enumTypes {
        ...EnumType
      }
    }
  }
  ${EnumTypeFragmentDoc}
`
export const UpdateLambdaTypesGql = gql`
  mutation UpdateLambdaTypes(
    $connect: LambdaTypeConnectInput
    $create: LambdaTypeRelationInput
    $delete: LambdaTypeDeleteInput
    $disconnect: LambdaTypeDisconnectInput
    $update: LambdaTypeUpdateInput
    $where: LambdaTypeWhere
  ) {
    updateLambdaTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      lambdaTypes {
        ...LambdaType
      }
    }
  }
  ${LambdaTypeFragmentDoc}
`
export const UpdatePageTypesGql = gql`
  mutation UpdatePageTypes(
    $connect: PageTypeConnectInput
    $create: PageTypeRelationInput
    $delete: PageTypeDeleteInput
    $disconnect: PageTypeDisconnectInput
    $update: PageTypeUpdateInput
    $where: PageTypeWhere
  ) {
    updatePageTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      pageTypes {
        ...PageType
      }
    }
  }
  ${PageTypeFragmentDoc}
`
export const UpdateAppTypesGql = gql`
  mutation UpdateAppTypes(
    $connect: AppTypeConnectInput
    $create: AppTypeRelationInput
    $delete: AppTypeDeleteInput
    $disconnect: AppTypeDisconnectInput
    $update: AppTypeUpdateInput
    $where: AppTypeWhere
  ) {
    updateAppTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      appTypes {
        ...AppType
      }
    }
  }
  ${AppTypeFragmentDoc}
`
export const UpdateMonacoTypesGql = gql`
  mutation UpdateMonacoTypes(
    $connect: MonacoTypeConnectInput
    $create: MonacoTypeRelationInput
    $delete: MonacoTypeDeleteInput
    $disconnect: MonacoTypeDisconnectInput
    $update: MonacoTypeUpdateInput
    $where: MonacoTypeWhere
  ) {
    updateMonacoTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      monacoTypes {
        ...MonacoType
      }
    }
  }
  ${MonacoTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateApps(
      variables: CreateAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAppsMutation>(CreateAppsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateApps',
      )
    },
    UpdateApps(
      variables: UpdateAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAppsMutation>(UpdateAppsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateApps',
      )
    },
    DeleteApps(
      variables: DeleteAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAppsMutation>(DeleteAppsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteApps',
      )
    },
    GetApps(
      variables?: GetAppsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppsQuery>(GetAppsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetApps',
      )
    },
    CreateAtoms(
      variables: CreateAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAtomsMutation>(CreateAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateAtoms',
      )
    },
    DeleteAtoms(
      variables: DeleteAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAtomsMutation>(DeleteAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteAtoms',
      )
    },
    GetAtoms(
      variables?: GetAtomsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAtomsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAtomsQuery>(GetAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAtoms',
      )
    },
    ImportAtoms(
      variables: ImportAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ImportAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ImportAtomsMutation>(ImportAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ImportAtoms',
      )
    },
    UpdateAtoms(
      variables?: UpdateAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAtomsMutation>(UpdateAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateAtoms',
      )
    },
    CreateComponents(
      variables: CreateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateComponentsMutation>(
            CreateComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateComponents',
      )
    },
    DeleteComponents(
      variables?: DeleteComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteComponentsMutation>(
            DeleteComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteComponents',
      )
    },
    UpdateComponents(
      variables?: UpdateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateComponentsMutation>(
            UpdateComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateComponents',
      )
    },
    GetComponents(
      variables?: GetComponentsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetComponentsQuery>(GetComponentsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetComponents',
      )
    },
    CreateElements(
      variables: CreateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateElementsMutation>(CreateElementsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateElements',
      )
    },
    DeleteElementsSubgraph(
      variables?: DeleteElementsSubgraphMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteElementsSubgraphMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementsSubgraphMutation>(
            DeleteElementsSubgraphGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElementsSubgraph',
      )
    },
    UpdateElements(
      variables?: UpdateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateElementsMutation>(UpdateElementsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateElements',
      )
    },
    MoveElements(
      variables?: MoveElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<MoveElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MoveElementsMutation>(MoveElementsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MoveElements',
      )
    },
    ConvertElementsToComponents(
      variables?: ConvertElementsToComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ConvertElementsToComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ConvertElementsToComponentsMutation>(
            ConvertElementsToComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ConvertElementsToComponents',
      )
    },
    DuplicateElement(
      variables: DuplicateElementMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DuplicateElementMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DuplicateElementMutation>(
            DuplicateElementGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DuplicateElement',
      )
    },
    GetElements(
      variables?: GetElementsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementsQuery>(GetElementsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetElements',
      )
    },
    CreateHooks(
      variables: CreateHooksMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateHooksMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateHooksMutation>(CreateHooksGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateHooks',
      )
    },
    DeleteHooks(
      variables: DeleteHooksMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteHooksMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteHooksMutation>(DeleteHooksGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteHooks',
      )
    },
    CreatePropMapBindings(
      variables: CreatePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePropMapBindingsMutation>(
            CreatePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePropMapBindings',
      )
    },
    UpdatePropMapBindings(
      variables: UpdatePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePropMapBindingsMutation>(
            UpdatePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePropMapBindings',
      )
    },
    DeletePropMapBindings(
      variables: DeletePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePropMapBindingsMutation>(
            DeletePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePropMapBindings',
      )
    },
    GetPropMapBindings(
      variables?: GetPropMapBindingsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPropMapBindingsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPropMapBindingsQuery>(
            GetPropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPropMapBindings',
      )
    },
    CreatePages(
      variables: CreatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePagesMutation>(CreatePagesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreatePages',
      )
    },
    DeletePages(
      variables?: DeletePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePagesMutation>(DeletePagesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeletePages',
      )
    },
    UpdatePages(
      variables?: UpdatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePagesMutation>(UpdatePagesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdatePages',
      )
    },
    GetPages(
      variables?: GetPagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPagesQuery>(GetPagesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPages',
      )
    },
    CreateTags(
      variables: CreateTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateTagsMutation>(CreateTagsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateTags',
      )
    },
    UpdateTags(
      variables: UpdateTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTagsMutation>(UpdateTagsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateTags',
      )
    },
    DeleteTags(
      variables: DeleteTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteTagsMutation>(DeleteTagsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteTags',
      )
    },
    GetTags(
      variables?: GetTagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTagsQuery>(GetTagsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTags',
      )
    },
    GetTagGraphs(
      variables?: GetTagGraphsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTagGraphsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTagGraphsQuery>(GetTagGraphsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTagGraphs',
      )
    },
    CreatePrimitiveTypes(
      variables: CreatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePrimitiveTypesMutation>(
            CreatePrimitiveTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePrimitiveTypes',
      )
    },
    CreateArrayTypes(
      variables: CreateArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateArrayTypesMutation>(
            CreateArrayTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateArrayTypes',
      )
    },
    CreateUnionTypes(
      variables: CreateUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUnionTypesMutation>(
            CreateUnionTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateUnionTypes',
      )
    },
    CreateInterfaceTypes(
      variables: CreateInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateInterfaceTypesMutation>(
            CreateInterfaceTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateInterfaceTypes',
      )
    },
    CreateElementTypes(
      variables: CreateElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateElementTypesMutation>(
            CreateElementTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateElementTypes',
      )
    },
    CreateRenderPropsTypes(
      variables: CreateRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateRenderPropsTypesMutation>(
            CreateRenderPropsTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateRenderPropsTypes',
      )
    },
    CreateEnumTypes(
      variables: CreateEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateEnumTypesMutation>(
            CreateEnumTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateEnumTypes',
      )
    },
    CreateLambdaTypes(
      variables: CreateLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateLambdaTypesMutation>(
            CreateLambdaTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateLambdaTypes',
      )
    },
    CreatePageTypes(
      variables: CreatePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePageTypesMutation>(
            CreatePageTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePageTypes',
      )
    },
    CreateAppTypes(
      variables: CreateAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAppTypesMutation>(CreateAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateAppTypes',
      )
    },
    CreateMonacoTypes(
      variables: CreateMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateMonacoTypesMutation>(
            CreateMonacoTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMonacoTypes',
      )
    },
    DeletePrimitiveTypes(
      variables?: DeletePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePrimitiveTypesMutation>(
            DeletePrimitiveTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePrimitiveTypes',
      )
    },
    DeleteArrayTypes(
      variables?: DeleteArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteArrayTypesMutation>(
            DeleteArrayTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteArrayTypes',
      )
    },
    DeleteUnionTypes(
      variables?: DeleteUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUnionTypesMutation>(
            DeleteUnionTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteUnionTypes',
      )
    },
    DeleteInterfaceTypes(
      variables?: DeleteInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteInterfaceTypesMutation>(
            DeleteInterfaceTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteInterfaceTypes',
      )
    },
    DeleteElementTypes(
      variables?: DeleteElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementTypesMutation>(
            DeleteElementTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElementTypes',
      )
    },
    DeleteRenderPropsTypes(
      variables?: DeleteRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRenderPropsTypesMutation>(
            DeleteRenderPropsTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteRenderPropsTypes',
      )
    },
    DeleteEnumTypes(
      variables?: DeleteEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteEnumTypesMutation>(
            DeleteEnumTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteEnumTypes',
      )
    },
    DeleteLambdaTypes(
      variables?: DeleteLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteLambdaTypesMutation>(
            DeleteLambdaTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteLambdaTypes',
      )
    },
    DeletePageTypes(
      variables?: DeletePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePageTypesMutation>(
            DeletePageTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePageTypes',
      )
    },
    DeleteAppTypes(
      variables?: DeleteAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAppTypesMutation>(DeleteAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteAppTypes',
      )
    },
    DeleteMonacoTypes(
      variables?: DeleteMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteMonacoTypesMutation>(
            DeleteMonacoTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteMonacoTypes',
      )
    },
    GetPrimitiveTypes(
      variables?: GetPrimitiveTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPrimitiveTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPrimitiveTypesQuery>(
            GetPrimitiveTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPrimitiveTypes',
      )
    },
    GetArrayTypes(
      variables?: GetArrayTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetArrayTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetArrayTypesQuery>(GetArrayTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetArrayTypes',
      )
    },
    GetUnionTypes(
      variables?: GetUnionTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUnionTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUnionTypesQuery>(GetUnionTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUnionTypes',
      )
    },
    GetInterfaceTypes(
      variables?: GetInterfaceTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetInterfaceTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetInterfaceTypesQuery>(
            GetInterfaceTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetInterfaceTypes',
      )
    },
    GetInterfaceTypesWithFields(
      variables?: GetInterfaceTypesWithFieldsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetInterfaceTypesWithFieldsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetInterfaceTypesWithFieldsQuery>(
            GetInterfaceTypesWithFieldsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetInterfaceTypesWithFields',
      )
    },
    GetInterfaceTypeGraphs(
      variables?: GetInterfaceTypeGraphsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetInterfaceTypeGraphsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetInterfaceTypeGraphsQuery>(
            GetInterfaceTypeGraphsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetInterfaceTypeGraphs',
      )
    },
    GetElementTypes(
      variables?: GetElementTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementTypesQuery>(GetElementTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetElementTypes',
      )
    },
    GetRenderPropsTypes(
      variables?: GetRenderPropsTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderPropsTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderPropsTypesQuery>(
            GetRenderPropsTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderPropsTypes',
      )
    },
    GetEnumTypes(
      variables?: GetEnumTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetEnumTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEnumTypesQuery>(GetEnumTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetEnumTypes',
      )
    },
    GetLambdaTypes(
      variables?: GetLambdaTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetLambdaTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLambdaTypesQuery>(GetLambdaTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetLambdaTypes',
      )
    },
    GetPageTypes(
      variables?: GetPageTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPageTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPageTypesQuery>(GetPageTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPageTypes',
      )
    },
    GetAppTypes(
      variables?: GetAppTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppTypesQuery>(GetAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAppTypes',
      )
    },
    GetMonacoTypes(
      variables?: GetMonacoTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetMonacoTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMonacoTypesQuery>(GetMonacoTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetMonacoTypes',
      )
    },
    CreateField(
      variables: CreateFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateFieldMutation>(CreateFieldGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateField',
      )
    },
    UpdateField(
      variables: UpdateFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateFieldMutation>(UpdateFieldGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateField',
      )
    },
    DeleteField(
      variables: DeleteFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteFieldMutation>(DeleteFieldGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteField',
      )
    },
    IsTypeDescendantOf(
      variables: IsTypeDescendantOfQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<IsTypeDescendantOfQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IsTypeDescendantOfQuery>(
            IsTypeDescendantOfGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'IsTypeDescendantOf',
      )
    },
    GetTypeReferences(
      variables: GetTypeReferencesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTypeReferencesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypeReferencesQuery>(
            GetTypeReferencesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetTypeReferences',
      )
    },
    UpdatePrimitiveTypes(
      variables?: UpdatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePrimitiveTypesMutation>(
            UpdatePrimitiveTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePrimitiveTypes',
      )
    },
    UpdateArrayTypes(
      variables?: UpdateArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateArrayTypesMutation>(
            UpdateArrayTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateArrayTypes',
      )
    },
    UpdateUnionTypes(
      variables?: UpdateUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUnionTypesMutation>(
            UpdateUnionTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateUnionTypes',
      )
    },
    UpdateInterfaceTypes(
      variables?: UpdateInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateInterfaceTypesMutation>(
            UpdateInterfaceTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateInterfaceTypes',
      )
    },
    UpdateElementTypes(
      variables?: UpdateElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateElementTypesMutation>(
            UpdateElementTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateElementTypes',
      )
    },
    UpdateRenderPropsTypes(
      variables?: UpdateRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateRenderPropsTypesMutation>(
            UpdateRenderPropsTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateRenderPropsTypes',
      )
    },
    UpdateEnumTypes(
      variables?: UpdateEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateEnumTypesMutation>(
            UpdateEnumTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateEnumTypes',
      )
    },
    UpdateLambdaTypes(
      variables?: UpdateLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateLambdaTypesMutation>(
            UpdateLambdaTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateLambdaTypes',
      )
    },
    UpdatePageTypes(
      variables?: UpdatePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePageTypesMutation>(
            UpdatePageTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePageTypes',
      )
    },
    UpdateAppTypes(
      variables?: UpdateAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAppTypesMutation>(UpdateAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateAppTypes',
      )
    },
    UpdateMonacoTypes(
      variables?: UpdateMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateMonacoTypesMutation>(
            UpdateMonacoTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateMonacoTypes',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
