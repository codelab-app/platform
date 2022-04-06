import * as Types from '@codelab/shared/abstract/codegen'

import {
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_MonacoType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from './fragments/type.fragment.graphql.gen'
import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from './fragments/type-base.fragment.graphql.gen'
import {
  ArrayTypeWithItemTypeFragment,
  ArrayTypeFragment,
} from './fragments/array-type.fragment.graphql.gen'
import { EnumTypeFragment } from './fragments/enum-type.fragment.graphql.gen'
import { EnumTypeValueFragment } from './fragments/enum-type-value.fragment.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeFieldEdgeFragment,
} from './fragments/interface.fragment.graphql.gen'
import { PrimitiveTypeFragment } from './fragments/primitive-type.fragment.graphql.gen'
import { ElementTypeFragment } from './fragments/element-type.fragment.graphql.gen'
import { LambdaTypeFragment } from './fragments/lambda-type.fragment.graphql.gen'
import { RenderPropsTypeFragment } from './fragments/render-props.fragment.graphql.gen'
import {
  UnionTypeWithInnerTypesFragment,
  UnionTypeFragment,
} from './fragments/union-type.fragment.graphql.gen'
import { MonacoTypeFragment } from './fragments/monaco-type.fragment.graphql.gen'
import { PageTypeFragment } from './fragments/page-type.fragment.graphql.gen'
import { AppTypeFragment } from './fragments/app-type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from './fragments/react-node.fragment.v2.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { TypeFragmentDoc } from './fragments/type.fragment.graphql.gen'
import { TypeBaseFragmentDoc } from './fragments/type-base.fragment.graphql.gen'
import {
  ArrayTypeWithItemTypeFragmentDoc,
  ArrayTypeFragmentDoc,
} from './fragments/array-type.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from './fragments/enum-type.fragment.graphql.gen'
import { EnumTypeValueFragmentDoc } from './fragments/enum-type-value.fragment.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './fragments/interface.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './fragments/primitive-type.fragment.graphql.gen'
import { ElementTypeFragmentDoc } from './fragments/element-type.fragment.graphql.gen'
import { LambdaTypeFragmentDoc } from './fragments/lambda-type.fragment.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './fragments/render-props.fragment.graphql.gen'
import {
  UnionTypeWithInnerTypesFragmentDoc,
  UnionTypeFragmentDoc,
} from './fragments/union-type.fragment.graphql.gen'
import { MonacoTypeFragmentDoc } from './fragments/monaco-type.fragment.graphql.gen'
import { PageTypeFragmentDoc } from './fragments/page-type.fragment.graphql.gen'
import { AppTypeFragmentDoc } from './fragments/app-type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from './fragments/react-node.fragment.v2.graphql.gen'
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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>
}

export type Action = {
  body: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  store: Store
  storeAggregate?: Maybe<ActionStoreStoreAggregationSelection>
  storeConnection: ActionStoreConnection
}

export type ActionStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type ActionStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type ActionStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<ActionStoreConnectionSort>>
  where?: InputMaybe<ActionStoreConnectionWhere>
}

export type ActionAggregateSelection = {
  body: StringAggregateSelectionNonNullable
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  body: Scalars['String']
  name: Scalars['String']
  store?: InputMaybe<ActionStoreFieldInput>
}

export type ActionDeleteInput = {
  store?: InputMaybe<ActionStoreDeleteFieldInput>
}

export type ActionDisconnectInput = {
  store?: InputMaybe<ActionStoreDisconnectFieldInput>
}

export type ActionOnCreateInput = {
  body: Scalars['String']
  name: Scalars['String']
}

export type ActionOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ActionSort objects to sort Actions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ActionSort>>
}

export type ActionRelationInput = {
  store?: InputMaybe<ActionStoreCreateFieldInput>
}

/** Fields to sort Actions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ActionSort object. */
export type ActionSort = {
  body?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ActionStoreAggregateInput = {
  AND?: InputMaybe<Array<ActionStoreAggregateInput>>
  OR?: InputMaybe<Array<ActionStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<ActionStoreNodeAggregationWhereInput>
}

export type ActionStoreConnectFieldInput = {
  connect?: InputMaybe<StoreConnectInput>
  where?: InputMaybe<StoreConnectWhere>
}

export type ActionStoreConnectOrCreateFieldInput = {
  onCreate: ActionStoreConnectOrCreateFieldInputOnCreate
  where: StoreConnectOrCreateWhere
}

export type ActionStoreConnectOrCreateFieldInputOnCreate = {
  node: StoreOnCreateInput
}

export type ActionStoreConnection = {
  edges: Array<ActionStoreRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type ActionStoreCreateFieldInput = {
  node: StoreCreateInput
}

export type ActionStoreDeleteFieldInput = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<ActionStoreConnectionWhere>
}

export type ActionStoreDisconnectFieldInput = {
  disconnect?: InputMaybe<StoreDisconnectInput>
  where?: InputMaybe<ActionStoreConnectionWhere>
}

export type ActionStoreFieldInput = {
  connect?: InputMaybe<ActionStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionStoreConnectOrCreateFieldInput>
  create?: InputMaybe<ActionStoreCreateFieldInput>
}

export type ActionStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ActionStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<ActionStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  initialState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  initialState_EQUAL?: InputMaybe<Scalars['String']>
  initialState_GT?: InputMaybe<Scalars['Int']>
  initialState_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  initialState_LT?: InputMaybe<Scalars['Int']>
  initialState_LTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type ActionStoreRelationship = {
  cursor: Scalars['String']
  node: Store
}

export type ActionStoreStoreAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ActionStoreStoreNodeAggregateSelection>
}

export type ActionStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  initialState: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ActionStoreUpdateConnectionInput = {
  node?: InputMaybe<StoreUpdateInput>
}

export type ActionStoreUpdateFieldInput = {
  connect?: InputMaybe<ActionStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<ActionStoreConnectOrCreateFieldInput>
  create?: InputMaybe<ActionStoreCreateFieldInput>
  delete?: InputMaybe<ActionStoreDeleteFieldInput>
  disconnect?: InputMaybe<ActionStoreDisconnectFieldInput>
  update?: InputMaybe<ActionStoreUpdateConnectionInput>
  where?: InputMaybe<ActionStoreConnectionWhere>
}

export type ActionUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ActionUpdateInput = {
  body?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  store?: InputMaybe<ActionStoreUpdateFieldInput>
}

export type ActionWhere = {
  AND?: InputMaybe<Array<ActionWhere>>
  OR?: InputMaybe<Array<ActionWhere>>
  body?: InputMaybe<Scalars['String']>
  body_CONTAINS?: InputMaybe<Scalars['String']>
  body_ENDS_WITH?: InputMaybe<Scalars['String']>
  body_IN?: InputMaybe<Array<Scalars['String']>>
  body_NOT?: InputMaybe<Scalars['String']>
  body_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  body_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  body_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  body_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  body_STARTS_WITH?: InputMaybe<Scalars['String']>
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
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<ActionStoreAggregateInput>
  storeConnection?: InputMaybe<ActionStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<ActionStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
}

export type AnyType =
  | AppType
  | ArrayType
  | ElementType
  | EnumType
  | InterfaceType
  | LambdaType
  | MonacoType
  | PageType
  | PrimitiveType
  | ReactNodeType
  | RenderPropsType
  | UnionType

export type App = {
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
  ownerAggregate?: Maybe<AppUserOwnerAggregationSelection>
  ownerConnection: AppOwnerConnection
  pages: Array<Page>
  pagesAggregate?: Maybe<AppPagePagesAggregationSelection>
  pagesConnection: AppPagesConnection
  rootProviderElement: Element
  rootProviderElementAggregate?: Maybe<AppElementRootProviderElementAggregationSelection>
  rootProviderElementConnection: AppRootProviderElementConnection
  store?: Maybe<Store>
  storeAggregate?: Maybe<AppStoreStoreAggregationSelection>
  storeConnection: AppStoreConnection
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
  sort?: InputMaybe<Array<AppOwnerConnectionSort>>
  where?: InputMaybe<AppOwnerConnectionWhere>
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

export type AppRootProviderElementArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type AppRootProviderElementAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ElementWhere>
}

export type AppRootProviderElementConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<AppRootProviderElementConnectionSort>>
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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

export type AppElementRootProviderElementAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AppElementRootProviderElementNodeAggregateSelection>
}

export type AppElementRootProviderElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type AppOnCreateInput = {
  name: Scalars['String']
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

export type AppOwnerConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>
  where?: InputMaybe<UserConnectWhere>
}

export type AppOwnerConnectOrCreateFieldInput = {
  onCreate: AppOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type AppOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type AppOwnerConnection = {
  edges: Array<AppOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type AppOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type AppOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppOwnerFieldInput = {
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
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
}

export type AppOwnerRelationship = {
  cursor: Scalars['String']
  node: User
}

export type AppOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type AppOwnerUpdateFieldInput = {
  connect?: InputMaybe<Array<AppOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<AppOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  delete?: InputMaybe<Array<AppOwnerDeleteFieldInput>>
  disconnect?: InputMaybe<Array<AppOwnerDisconnectFieldInput>>
  update?: InputMaybe<AppOwnerUpdateConnectionInput>
  where?: InputMaybe<AppOwnerConnectionWhere>
}

export type AppPagePagesAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AppPagePagesNodeAggregateSelection>
}

export type AppPagePagesNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

export type AppPagesRelationship = {
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
  owner?: InputMaybe<Array<AppOwnerCreateFieldInput>>
  pages?: InputMaybe<Array<AppPagesCreateFieldInput>>
  rootProviderElement?: InputMaybe<AppRootProviderElementCreateFieldInput>
  store?: InputMaybe<AppStoreCreateFieldInput>
}

export type AppRootProviderElementAggregateInput = {
  AND?: InputMaybe<Array<AppRootProviderElementAggregateInput>>
  OR?: InputMaybe<Array<AppRootProviderElementAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<AppRootProviderElementNodeAggregationWhereInput>
}

export type AppRootProviderElementConnectFieldInput = {
  connect?: InputMaybe<ElementConnectInput>
  where?: InputMaybe<ElementConnectWhere>
}

export type AppRootProviderElementConnectOrCreateFieldInput = {
  onCreate: AppRootProviderElementConnectOrCreateFieldInputOnCreate
  where: ElementConnectOrCreateWhere
}

export type AppRootProviderElementConnectOrCreateFieldInputOnCreate = {
  node: ElementOnCreateInput
}

export type AppRootProviderElementConnection = {
  edges: Array<AppRootProviderElementRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type AppRootProviderElementCreateFieldInput = {
  node: ElementCreateInput
}

export type AppRootProviderElementDeleteFieldInput = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
}

export type AppRootProviderElementDisconnectFieldInput = {
  disconnect?: InputMaybe<ElementDisconnectInput>
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
}

export type AppRootProviderElementFieldInput = {
  connect?: InputMaybe<AppRootProviderElementConnectFieldInput>
  connectOrCreate?: InputMaybe<AppRootProviderElementConnectOrCreateFieldInput>
  create?: InputMaybe<AppRootProviderElementCreateFieldInput>
}

export type AppRootProviderElementNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AppRootProviderElementNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<AppRootProviderElementNodeAggregationWhereInput>>
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type AppRootProviderElementRelationship = {
  cursor: Scalars['String']
  node: Element
}

export type AppRootProviderElementUpdateConnectionInput = {
  node?: InputMaybe<ElementUpdateInput>
}

export type AppRootProviderElementUpdateFieldInput = {
  connect?: InputMaybe<AppRootProviderElementConnectFieldInput>
  connectOrCreate?: InputMaybe<AppRootProviderElementConnectOrCreateFieldInput>
  create?: InputMaybe<AppRootProviderElementCreateFieldInput>
  delete?: InputMaybe<AppRootProviderElementDeleteFieldInput>
  disconnect?: InputMaybe<AppRootProviderElementDisconnectFieldInput>
  update?: InputMaybe<AppRootProviderElementUpdateConnectionInput>
  where?: InputMaybe<AppRootProviderElementConnectionWhere>
}

/** Fields to sort Apps by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppSort object. */
export type AppSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
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
  initialState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  initialState_EQUAL?: InputMaybe<Scalars['String']>
  initialState_GT?: InputMaybe<Scalars['Int']>
  initialState_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  initialState_LT?: InputMaybe<Scalars['Int']>
  initialState_LTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  cursor: Scalars['String']
  node: Store
}

export type AppStoreStoreAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AppStoreStoreNodeAggregateSelection>
}

export type AppStoreStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  initialState: StringAggregateSelectionNonNullable
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
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AppTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type AppTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type AppTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type AppTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type AppTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type AppTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort AppTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one AppTypeSort object. */
export type AppTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type AppTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type AppTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AppTypeUserOwnerNodeAggregateSelection>
}

export type AppTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<AppTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return AppTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return AppTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return AppTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return AppTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
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

export type AppUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AppUserOwnerNodeAggregateSelection>
}

export type AppUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type AppWhere = {
  AND?: InputMaybe<Array<AppWhere>>
  OR?: InputMaybe<Array<AppWhere>>
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
  ownerAggregate?: InputMaybe<AppOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<AppOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<AppOwnerConnectionWhere>
  /** Return Apps where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return Apps where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return Apps where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return Apps where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
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
  rootProviderElement?: InputMaybe<ElementWhere>
  rootProviderElementAggregate?: InputMaybe<AppRootProviderElementAggregateInput>
  rootProviderElementConnection?: InputMaybe<AppRootProviderElementConnectionWhere>
  rootProviderElementConnection_NOT?: InputMaybe<AppRootProviderElementConnectionWhere>
  rootProviderElement_NOT?: InputMaybe<ElementWhere>
  store?: InputMaybe<StoreWhere>
  storeAggregate?: InputMaybe<AppStoreAggregateInput>
  storeConnection?: InputMaybe<AppStoreConnectionWhere>
  storeConnection_NOT?: InputMaybe<AppStoreConnectionWhere>
  store_NOT?: InputMaybe<StoreWhere>
}

/**
 * ArrayType Allows defining a variable number of items of a given type.
 * Contains a reference to another type which is the array item type.
 */
export type ArrayType = TypeBase &
  WithDescendants & {
    descendantTypesIds: Array<Scalars['ID']>
    graph: TypeGraph
    id: Scalars['ID']
    itemType: Array<TypeBase>
    itemTypeConnection: ArrayTypeItemTypeConnection
    name: Scalars['String']
    owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ArrayTypeConnectInput = {
  itemType?: InputMaybe<Array<ArrayTypeItemTypeConnectFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type ArrayTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type ArrayTypeCreateInput = {
  itemType?: InputMaybe<ArrayTypeItemTypeFieldInput>
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ArrayTypeDeleteInput = {
  itemType?: InputMaybe<Array<ArrayTypeItemTypeDeleteFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type ArrayTypeDisconnectInput = {
  itemType?: InputMaybe<Array<ArrayTypeItemTypeDisconnectFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
}

export type ArrayTypeItemTypeConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type ArrayTypeItemTypeConnection = {
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
  connect?: InputMaybe<Array<ArrayTypeItemTypeConnectFieldInput>>
  create?: InputMaybe<Array<ArrayTypeItemTypeCreateFieldInput>>
}

export type ArrayTypeItemTypeRelationship = {
  cursor: Scalars['String']
  node: TypeBase
}

export type ArrayTypeItemTypeUpdateConnectionInput = {
  node?: InputMaybe<TypeBaseUpdateInput>
}

export type ArrayTypeItemTypeUpdateFieldInput = {
  connect?: InputMaybe<Array<ArrayTypeItemTypeConnectFieldInput>>
  create?: InputMaybe<Array<ArrayTypeItemTypeCreateFieldInput>>
  delete?: InputMaybe<Array<ArrayTypeItemTypeDeleteFieldInput>>
  disconnect?: InputMaybe<Array<ArrayTypeItemTypeDisconnectFieldInput>>
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
}

export type ArrayTypeRelationInput = {
  itemType?: InputMaybe<Array<ArrayTypeItemTypeCreateFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort ArrayTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArrayTypeSort object. */
export type ArrayTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ArrayTypeUpdateInput = {
  itemType?: InputMaybe<Array<ArrayTypeItemTypeUpdateFieldInput>>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type ArrayTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ArrayTypeUserOwnerNodeAggregateSelection>
}

export type ArrayTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  itemTypeConnection_ALL?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_NONE?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_SINGLE?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
  itemTypeConnection_SOME?: InputMaybe<ArrayTypeItemTypeConnectionWhere>
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
  ownerAggregate?: InputMaybe<ArrayTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return ArrayTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return ArrayTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return ArrayTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return ArrayTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type Atom = {
  api: InterfaceType
  apiAggregate?: Maybe<AtomInterfaceTypeApiAggregationSelection>
  apiConnection: AtomApiConnection
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
  count: Scalars['Int']
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

export type AtomInterfaceTypeApiAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AtomInterfaceTypeApiNodeAggregateSelection>
}

export type AtomInterfaceTypeApiNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type AtomOnCreateInput = {
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
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  type?: InputMaybe<SortDirection>
}

export type AtomTagTagsAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<AtomTagTagsNodeAggregateSelection>
}

export type AtomTagTagsNodeAggregateSelection = {
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
  State = 'State',
  Text = 'Text',
  TextList = 'TextList',
}

export type AtomUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type AtomUpdateInput = {
  api?: InputMaybe<AtomApiUpdateFieldInput>
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

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  ownerAggregate?: Maybe<ComponentUserOwnerAggregationSelection>
  ownerConnection: ComponentOwnerConnection
  rootElement: Element
  rootElementAggregate?: Maybe<ComponentElementRootElementAggregationSelection>
  rootElementConnection: ComponentRootElementConnection
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
  sort?: InputMaybe<Array<ComponentOwnerConnectionSort>>
  where?: InputMaybe<ComponentOwnerConnectionWhere>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ComponentConnectInput = {
  owner?: InputMaybe<ComponentOwnerConnectFieldInput>
  rootElement?: InputMaybe<ComponentRootElementConnectFieldInput>
}

export type ComponentConnectOrCreateInput = {
  owner?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
  rootElement?: InputMaybe<ComponentRootElementConnectOrCreateFieldInput>
}

export type ComponentConnectOrCreateWhere = {
  node: ComponentUniqueWhere
}

export type ComponentConnectWhere = {
  node: ComponentWhere
}

export type ComponentCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<ComponentOwnerFieldInput>
  rootElement?: InputMaybe<ComponentRootElementFieldInput>
}

export type ComponentDeleteInput = {
  owner?: InputMaybe<ComponentOwnerDeleteFieldInput>
  rootElement?: InputMaybe<ComponentRootElementDeleteFieldInput>
}

export type ComponentDisconnectInput = {
  owner?: InputMaybe<ComponentOwnerDisconnectFieldInput>
  rootElement?: InputMaybe<ComponentRootElementDisconnectFieldInput>
}

export type ComponentElementRootElementAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ComponentElementRootElementNodeAggregateSelection>
}

export type ComponentElementRootElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ComponentOnCreateInput = {
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

export type ComponentOwnerConnectFieldInput = {
  connect?: InputMaybe<UserConnectInput>
  where?: InputMaybe<UserConnectWhere>
}

export type ComponentOwnerConnectOrCreateFieldInput = {
  onCreate: ComponentOwnerConnectOrCreateFieldInputOnCreate
  where: UserConnectOrCreateWhere
}

export type ComponentOwnerConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput
}

export type ComponentOwnerConnection = {
  edges: Array<ComponentOwnerRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type ComponentOwnerCreateFieldInput = {
  node: UserCreateInput
}

export type ComponentOwnerDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>
  where?: InputMaybe<ComponentOwnerConnectionWhere>
}

export type ComponentOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>
  where?: InputMaybe<ComponentOwnerConnectionWhere>
}

export type ComponentOwnerFieldInput = {
  connect?: InputMaybe<ComponentOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentOwnerCreateFieldInput>
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
}

export type ComponentOwnerRelationship = {
  cursor: Scalars['String']
  node: User
}

export type ComponentOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type ComponentOwnerUpdateFieldInput = {
  connect?: InputMaybe<ComponentOwnerConnectFieldInput>
  connectOrCreate?: InputMaybe<ComponentOwnerConnectOrCreateFieldInput>
  create?: InputMaybe<ComponentOwnerCreateFieldInput>
  delete?: InputMaybe<ComponentOwnerDeleteFieldInput>
  disconnect?: InputMaybe<ComponentOwnerDisconnectFieldInput>
  update?: InputMaybe<ComponentOwnerUpdateConnectionInput>
  where?: InputMaybe<ComponentOwnerConnectionWhere>
}

export type ComponentRelationInput = {
  owner?: InputMaybe<ComponentOwnerCreateFieldInput>
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<ComponentOwnerUpdateFieldInput>
  rootElement?: InputMaybe<ComponentRootElementUpdateFieldInput>
}

export type ComponentUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ComponentUserOwnerNodeAggregateSelection>
}

export type ComponentUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type ComponentWhere = {
  AND?: InputMaybe<Array<ComponentWhere>>
  OR?: InputMaybe<Array<ComponentWhere>>
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
  ownerConnection?: InputMaybe<ComponentOwnerConnectionWhere>
  ownerConnection_NOT?: InputMaybe<ComponentOwnerConnectionWhere>
  owner_NOT?: InputMaybe<UserWhere>
  rootElement?: InputMaybe<ElementWhere>
  rootElementAggregate?: InputMaybe<ComponentRootElementAggregateInput>
  rootElementConnection?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElementConnection_NOT?: InputMaybe<ComponentRootElementConnectionWhere>
  rootElement_NOT?: InputMaybe<ElementWhere>
}

export type CreateActionsMutationResponse = {
  actions: Array<Action>
  info: CreateInfo
}

export type CreateAppTypesMutationResponse = {
  appTypes: Array<AppType>
  info: CreateInfo
}

export type CreateAppsMutationResponse = {
  apps: Array<App>
  info: CreateInfo
}

export type CreateArrayTypesMutationResponse = {
  arrayTypes: Array<ArrayType>
  info: CreateInfo
}

export type CreateAtomsMutationResponse = {
  atoms: Array<Atom>
  info: CreateInfo
}

export type CreateComponentsMutationResponse = {
  components: Array<Component>
  info: CreateInfo
}

export type CreateCreateInfosMutationResponse = {
  createInfos: Array<CreateInfo>
  info: CreateInfo
}

export type CreateDeleteFieldResponsesMutationResponse = {
  deleteFieldResponses: Array<DeleteFieldResponse>
  info: CreateInfo
}

export type CreateEdgesMutationResponse = {
  edges: Array<Edge>
  info: CreateInfo
}

export type CreateElementTypesMutationResponse = {
  elementTypes: Array<ElementType>
  info: CreateInfo
}

export type CreateElementsMutationResponse = {
  elements: Array<Element>
  info: CreateInfo
}

export type CreateEnumTypeValuesMutationResponse = {
  enumTypeValues: Array<EnumTypeValue>
  info: CreateInfo
}

export type CreateEnumTypesMutationResponse = {
  enumTypes: Array<EnumType>
  info: CreateInfo
}

export type CreateExportAdminDataResponsesMutationResponse = {
  exportAdminDataResponses: Array<ExportAdminDataResponse>
  info: CreateInfo
}

export type CreateHooksMutationResponse = {
  hooks: Array<Hook>
  info: CreateInfo
}

export type CreateImportDataMutationResponsesMutationResponse = {
  importDataMutationResponses: Array<ImportDataMutationResponse>
  info: CreateInfo
}

export type CreateInfo = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  relationshipsCreated: Scalars['Int']
}

export type CreateInfoAggregateSelection = {
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

export type CreateInterfaceTypesMutationResponse = {
  info: CreateInfo
  interfaceTypes: Array<InterfaceType>
}

export type CreateLambdaTypesMutationResponse = {
  info: CreateInfo
  lambdaTypes: Array<LambdaType>
}

export type CreateMonacoTypesMutationResponse = {
  info: CreateInfo
  monacoTypes: Array<MonacoType>
}

export type CreatePageTypesMutationResponse = {
  info: CreateInfo
  pageTypes: Array<PageType>
}

export type CreatePagesMutationResponse = {
  info: CreateInfo
  pages: Array<Page>
}

export type CreatePrimitiveTypesMutationResponse = {
  info: CreateInfo
  primitiveTypes: Array<PrimitiveType>
}

export type CreatePropMapBindingsMutationResponse = {
  info: CreateInfo
  propMapBindings: Array<PropMapBinding>
}

export type CreatePropsMutationResponse = {
  info: CreateInfo
  props: Array<Prop>
}

export type CreateReactNodeTypesMutationResponse = {
  info: CreateInfo
  reactNodeTypes: Array<ReactNodeType>
}

export type CreateRenderPropsTypesMutationResponse = {
  info: CreateInfo
  renderPropsTypes: Array<RenderPropsType>
}

export type CreateResetDatabaseMutationResponsesMutationResponse = {
  info: CreateInfo
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
}

export type CreateStoresMutationResponse = {
  info: CreateInfo
  stores: Array<Store>
}

export type CreateTagGraphOptionsMutationResponse = {
  info: CreateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type CreateTagsMutationResponse = {
  info: CreateInfo
  tags: Array<Tag>
}

export type CreateTypeReferencesMutationResponse = {
  info: CreateInfo
  typeReferences: Array<TypeReference>
}

export type CreateUnionTypesMutationResponse = {
  info: CreateInfo
  unionTypes: Array<UnionType>
}

export type DeleteElementsInfo = {
  deletedIds: Array<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type DeleteFieldInput = {
  interfaceId: Scalars['ID']
  key: Scalars['String']
}

export type DeleteFieldResponse = {
  deletedEdgesCount: Scalars['Int']
}

export type DeleteFieldResponseAggregateSelection = {
  count: Scalars['Int']
  deletedEdgesCount: IntAggregateSelectionNonNullable
}

export type DeleteFieldResponseCreateInput = {
  deletedEdgesCount: Scalars['Int']
}

export type DeleteFieldResponseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more DeleteFieldResponseSort objects to sort DeleteFieldResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeleteFieldResponseSort>>
}

/** Fields to sort DeleteFieldResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeleteFieldResponseSort object. */
export type DeleteFieldResponseSort = {
  deletedEdgesCount?: InputMaybe<SortDirection>
}

export type DeleteFieldResponseUpdateInput = {
  deletedEdgesCount?: InputMaybe<Scalars['Int']>
}

export type DeleteFieldResponseWhere = {
  AND?: InputMaybe<Array<DeleteFieldResponseWhere>>
  OR?: InputMaybe<Array<DeleteFieldResponseWhere>>
  deletedEdgesCount?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_GT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_GTE?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_IN?: InputMaybe<Array<Scalars['Int']>>
  deletedEdgesCount_LT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_LTE?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_NOT?: InputMaybe<Scalars['Int']>
  deletedEdgesCount_NOT_IN?: InputMaybe<Array<Scalars['Int']>>
}

export type DeleteInfo = {
  bookmark?: Maybe<Scalars['String']>
  nodesDeleted: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

/** Simplest implementation of an IEdge with no additional fields */
export type Edge = IEdge & {
  source: Scalars['String']
  target: Scalars['String']
}

export type EdgeAggregateSelection = {
  count: Scalars['Int']
  source: StringAggregateSelectionNonNullable
  target: StringAggregateSelectionNonNullable
}

export type EdgeCreateInput = {
  source: Scalars['String']
  target: Scalars['String']
}

export type EdgeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more EdgeSort objects to sort Edges by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EdgeSort>>
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
  AND?: InputMaybe<Array<EdgeWhere>>
  OR?: InputMaybe<Array<EdgeWhere>>
  source?: InputMaybe<Scalars['String']>
  source_CONTAINS?: InputMaybe<Scalars['String']>
  source_ENDS_WITH?: InputMaybe<Scalars['String']>
  source_IN?: InputMaybe<Array<Scalars['String']>>
  source_NOT?: InputMaybe<Scalars['String']>
  source_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  source_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  source_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  source_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  source_STARTS_WITH?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  target_CONTAINS?: InputMaybe<Scalars['String']>
  target_ENDS_WITH?: InputMaybe<Scalars['String']>
  target_IN?: InputMaybe<Array<Scalars['String']>>
  target_NOT?: InputMaybe<Scalars['String']>
  target_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  target_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  target_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  target_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  target_STARTS_WITH?: InputMaybe<Scalars['String']>
}

export type Element = {
  atom?: Maybe<Atom>
  atomAggregate?: Maybe<ElementAtomAtomAggregationSelection>
  atomConnection: ElementAtomConnection
  children: Array<Element>
  childrenAggregate?: Maybe<ElementElementChildrenAggregationSelection>
  childrenConnection: ElementChildrenConnection
  component?: Maybe<Component>
  componentAggregate?: Maybe<ElementComponentComponentAggregationSelection>
  componentConnection: ElementComponentConnection
  css?: Maybe<Scalars['String']>
  hooks: Array<Hook>
  hooksAggregate?: Maybe<ElementHookHooksAggregationSelection>
  hooksConnection: ElementHooksConnection
  id: Scalars['ID']
  instanceOfComponent?: Maybe<Component>
  instanceOfComponentAggregate?: Maybe<ElementComponentInstanceOfComponentAggregationSelection>
  instanceOfComponentConnection: ElementInstanceOfComponentConnection
  name?: Maybe<Scalars['String']>
  parentElement?: Maybe<Element>
  parentElementAggregate?: Maybe<ElementElementParentElementAggregationSelection>
  parentElementConnection: ElementParentElementConnection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate?: Maybe<ElementPropMapBindingPropMapBindingsAggregationSelection>
  propMapBindingsConnection: ElementPropMapBindingsConnection
  propTransformationJs?: Maybe<Scalars['String']>
  props?: Maybe<Prop>
  propsAggregate?: Maybe<ElementPropPropsAggregationSelection>
  propsConnection: ElementPropsConnection
  renderForEachPropKey?: Maybe<Scalars['String']>
  renderIfPropKey?: Maybe<Scalars['String']>
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

export type ElementAggregateSelection = {
  count: Scalars['Int']
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
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
  count: Scalars['Int']
  node?: Maybe<ElementAtomAtomNodeAggregateSelection>
}

export type ElementAtomAtomNodeAggregateSelection = {
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  cursor: Scalars['String']
  node: Element
  order?: Maybe<Scalars['Int']>
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
  count: Scalars['Int']
  node?: Maybe<ElementComponentComponentNodeAggregateSelection>
}

export type ElementComponentComponentNodeAggregateSelection = {
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
  count: Scalars['Int']
  node?: Maybe<ElementComponentInstanceOfComponentNodeAggregateSelection>
}

export type ElementComponentInstanceOfComponentNodeAggregateSelection = {
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
  component?: InputMaybe<ElementComponentConnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsConnectFieldInput>>
  props?: InputMaybe<ElementPropsConnectFieldInput>
}

export type ElementConnectOrCreateInput = {
  atom?: InputMaybe<ElementAtomConnectOrCreateFieldInput>
  children?: InputMaybe<Array<ElementChildrenConnectOrCreateFieldInput>>
  component?: InputMaybe<ElementComponentConnectOrCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksConnectOrCreateFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentConnectOrCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementConnectOrCreateFieldInput>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsConnectOrCreateFieldInput>
  >
  props?: InputMaybe<ElementPropsConnectOrCreateFieldInput>
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
  component?: InputMaybe<ElementComponentFieldInput>
  css?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<ElementHooksFieldInput>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentFieldInput>
  name?: InputMaybe<Scalars['String']>
  parentElement?: InputMaybe<ElementParentElementFieldInput>
  propMapBindings?: InputMaybe<ElementPropMapBindingsFieldInput>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<ElementPropsFieldInput>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
}

export type ElementDeleteInput = {
  atom?: InputMaybe<ElementAtomDeleteFieldInput>
  children?: InputMaybe<Array<ElementChildrenDeleteFieldInput>>
  component?: InputMaybe<ElementComponentDeleteFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDeleteFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDeleteFieldInput>
  parentElement?: InputMaybe<ElementParentElementDeleteFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsDeleteFieldInput>>
  props?: InputMaybe<ElementPropsDeleteFieldInput>
}

export type ElementDisconnectInput = {
  atom?: InputMaybe<ElementAtomDisconnectFieldInput>
  children?: InputMaybe<Array<ElementChildrenDisconnectFieldInput>>
  component?: InputMaybe<ElementComponentDisconnectFieldInput>
  hooks?: InputMaybe<Array<ElementHooksDisconnectFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentDisconnectFieldInput>
  parentElement?: InputMaybe<ElementParentElementDisconnectFieldInput>
  propMapBindings?: InputMaybe<
    Array<ElementPropMapBindingsDisconnectFieldInput>
  >
  props?: InputMaybe<ElementPropsDisconnectFieldInput>
}

export type ElementEdge = {
  order?: Maybe<Scalars['Int']>
  source: Scalars['String']
  target: Scalars['String']
}

export type ElementElementChildrenAggregationSelection = {
  count: Scalars['Int']
  edge?: Maybe<ElementElementChildrenEdgeAggregateSelection>
  node?: Maybe<ElementElementChildrenNodeAggregateSelection>
}

export type ElementElementChildrenEdgeAggregateSelection = {
  order: IntAggregateSelectionNullable
}

export type ElementElementChildrenNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementElementParentElementAggregationSelection = {
  count: Scalars['Int']
  edge?: Maybe<ElementElementParentElementEdgeAggregateSelection>
  node?: Maybe<ElementElementParentElementNodeAggregateSelection>
}

export type ElementElementParentElementEdgeAggregateSelection = {
  order: IntAggregateSelectionNullable
}

export type ElementElementParentElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

export type ElementGraph = {
  edges: Array<ElementEdge>
  vertices: Array<Element>
}

export type ElementGraphInput = {
  rootId: Scalars['String']
}

export type ElementHookHooksAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ElementHookHooksNodeAggregateSelection>
}

export type ElementHookHooksNodeAggregateSelection = {
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

export type ElementOnCreateInput = {
  css?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type ElementPropMapBindingPropMapBindingsAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ElementPropMapBindingPropMapBindingsNodeAggregateSelection>
}

export type ElementPropMapBindingPropMapBindingsNodeAggregateSelection = {
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
  count: Scalars['Int']
  node?: Maybe<ElementPropPropsNodeAggregateSelection>
}

export type ElementPropPropsNodeAggregateSelection = {
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
  component?: InputMaybe<ElementComponentCreateFieldInput>
  hooks?: InputMaybe<Array<ElementHooksCreateFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentCreateFieldInput>
  parentElement?: InputMaybe<ElementParentElementCreateFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsCreateFieldInput>>
  props?: InputMaybe<ElementPropsCreateFieldInput>
}

/** Fields to sort Elements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementSort object. */
export type ElementSort = {
  css?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
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
  /** Allows scoping the type of element to only descendants, children or all elements */
  elementKind: ElementTypeKind
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ElementTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type ElementTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type ElementTypeCreateInput = {
  elementKind: ElementTypeKind
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ElementTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type ElementTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type ElementTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort ElementTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ElementTypeSort object. */
export type ElementTypeSort = {
  elementKind?: InputMaybe<SortDirection>
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ElementTypeUpdateInput = {
  elementKind?: InputMaybe<ElementTypeKind>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type ElementTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ElementTypeUserOwnerNodeAggregateSelection>
}

export type ElementTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<ElementTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return ElementTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return ElementTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return ElementTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return ElementTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type ElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type ElementUpdateInput = {
  atom?: InputMaybe<ElementAtomUpdateFieldInput>
  children?: InputMaybe<Array<ElementChildrenUpdateFieldInput>>
  component?: InputMaybe<ElementComponentUpdateFieldInput>
  css?: InputMaybe<Scalars['String']>
  hooks?: InputMaybe<Array<ElementHooksUpdateFieldInput>>
  instanceOfComponent?: InputMaybe<ElementInstanceOfComponentUpdateFieldInput>
  name?: InputMaybe<Scalars['String']>
  parentElement?: InputMaybe<ElementParentElementUpdateFieldInput>
  propMapBindings?: InputMaybe<Array<ElementPropMapBindingsUpdateFieldInput>>
  propTransformationJs?: InputMaybe<Scalars['String']>
  props?: InputMaybe<ElementPropsUpdateFieldInput>
  renderForEachPropKey?: InputMaybe<Scalars['String']>
  renderIfPropKey?: InputMaybe<Scalars['String']>
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
  css?: InputMaybe<Scalars['String']>
  css_CONTAINS?: InputMaybe<Scalars['String']>
  css_ENDS_WITH?: InputMaybe<Scalars['String']>
  css_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  css_NOT?: InputMaybe<Scalars['String']>
  css_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  css_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  css_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  css_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  css_STARTS_WITH?: InputMaybe<Scalars['String']>
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
  parentElement?: InputMaybe<ElementWhere>
  parentElementAggregate?: InputMaybe<ElementParentElementAggregateInput>
  parentElementConnection?: InputMaybe<ElementParentElementConnectionWhere>
  parentElementConnection_NOT?: InputMaybe<ElementParentElementConnectionWhere>
  parentElement_NOT?: InputMaybe<ElementWhere>
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
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 */
export type EnumType = TypeBase & {
  allowedValues: Array<EnumTypeValue>
  allowedValuesAggregate?: Maybe<EnumTypeEnumTypeValueAllowedValuesAggregationSelection>
  allowedValuesConnection: EnumTypeAllowedValuesConnection
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type EnumTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type EnumTypeConnectOrCreateWhere = {
  node: EnumTypeUniqueWhere
}

export type EnumTypeConnectWhere = {
  node: EnumTypeWhere
}

export type EnumTypeCreateInput = {
  allowedValues?: InputMaybe<EnumTypeAllowedValuesFieldInput>
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type EnumTypeDeleteInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDeleteFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type EnumTypeDisconnectInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesDisconnectFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
}

export type EnumTypeEnumTypeValueAllowedValuesAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection>
}

export type EnumTypeEnumTypeValueAllowedValuesNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  value: StringAggregateSelectionNonNullable
}

export type EnumTypeOnCreateInput = {
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
}

export type EnumTypeRelationInput = {
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesCreateFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
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
  allowedValues?: InputMaybe<Array<EnumTypeAllowedValuesUpdateFieldInput>>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type EnumTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<EnumTypeUserOwnerNodeAggregateSelection>
}

export type EnumTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type EnumTypeValue = {
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
  count: Scalars['Int']
  node?: Maybe<EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection>
}

export type EnumTypeValueEnumTypeEnumTypeNodeAggregateSelection = {
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
  ownerAggregate?: InputMaybe<EnumTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return EnumTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return EnumTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return EnumTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return EnumTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type ExportAdminDataResponse = {
  result: Scalars['JSONObject']
}

export type ExportAdminDataResponseAggregateSelection = {
  count: Scalars['Int']
}

export type ExportAdminDataResponseCreateInput = {
  result: Scalars['JSONObject']
}

export type ExportAdminDataResponseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ExportAdminDataResponseSort objects to sort ExportAdminDataResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ExportAdminDataResponseSort>>
}

/** Fields to sort ExportAdminDataResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ExportAdminDataResponseSort object. */
export type ExportAdminDataResponseSort = {
  result?: InputMaybe<SortDirection>
}

export type ExportAdminDataResponseUpdateInput = {
  result?: InputMaybe<Scalars['JSONObject']>
}

export type ExportAdminDataResponseWhere = {
  AND?: InputMaybe<Array<ExportAdminDataResponseWhere>>
  OR?: InputMaybe<Array<ExportAdminDataResponseWhere>>
  result?: InputMaybe<Scalars['JSONObject']>
}

export type Field = {
  description?: Maybe<Scalars['String']>
  key: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export type FieldCreateInput = {
  description?: InputMaybe<Scalars['String']>
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
}

export type FieldSort = {
  description?: InputMaybe<SortDirection>
  key?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type FieldUpdateInput = {
  description?: InputMaybe<Scalars['String']>
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
  count: Scalars['Int']
  node?: Maybe<HookElementElementNodeAggregateSelection>
}

export type HookElementElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  count: Scalars['Int']
  node?: Maybe<HookPropConfigNodeAggregateSelection>
}

export type HookPropConfigNodeAggregateSelection = {
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

export type IdAggregateSelectionNonNullable = {
  longest: Scalars['ID']
  shortest: Scalars['ID']
}

export type IEdge = {
  source: Scalars['String']
  target: Scalars['String']
}

export type ImportAdminDataInput = {
  payload: Scalars['JSONObject']
}

export type ImportDataMutationResponse = {
  result: Scalars['Boolean']
}

export type ImportDataMutationResponseAggregateSelection = {
  count: Scalars['Int']
}

export type ImportDataMutationResponseCreateInput = {
  result: Scalars['Boolean']
}

export type ImportDataMutationResponseOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more ImportDataMutationResponseSort objects to sort ImportDataMutationResponses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ImportDataMutationResponseSort>>
}

/** Fields to sort ImportDataMutationResponses by. The order in which sorts are applied is not guaranteed when specifying many fields in one ImportDataMutationResponseSort object. */
export type ImportDataMutationResponseSort = {
  result?: InputMaybe<SortDirection>
}

export type ImportDataMutationResponseUpdateInput = {
  result?: InputMaybe<Scalars['Boolean']>
}

export type ImportDataMutationResponseWhere = {
  AND?: InputMaybe<Array<ImportDataMutationResponseWhere>>
  OR?: InputMaybe<Array<ImportDataMutationResponseWhere>>
  result?: InputMaybe<Scalars['Boolean']>
  result_NOT?: InputMaybe<Scalars['Boolean']>
}

export type IntAggregateSelectionNonNullable = {
  average: Scalars['Float']
  max: Scalars['Int']
  min: Scalars['Int']
  sum: Scalars['Int']
}

export type IntAggregateSelectionNullable = {
  average?: Maybe<Scalars['Float']>
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
  sum?: Maybe<Scalars['Int']>
}

/** Represents an object type with multiple fields */
export type InterfaceType = TypeBase &
  WithDescendants & {
    apiOfAtoms: Array<Atom>
    apiOfAtomsAggregate?: Maybe<InterfaceTypeAtomApiOfAtomsAggregationSelection>
    apiOfAtomsConnection: InterfaceTypeApiOfAtomsConnection
    descendantTypesIds: Array<Scalars['ID']>
    fields: Array<TypeBase>
    fieldsConnection: InterfaceTypeFieldsConnection
    graph: TypeGraph
    id: Scalars['ID']
    name: Scalars['String']
    owner: Array<User>
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
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeAtomApiOfAtomsNodeAggregateSelection>
}

export type InterfaceTypeAtomApiOfAtomsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type InterfaceTypeConnectInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsConnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsConnectFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type InterfaceTypeConnectOrCreateInput = {
  apiOfAtoms?: InputMaybe<
    Array<InterfaceTypeApiOfAtomsConnectOrCreateFieldInput>
  >
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
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
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type InterfaceTypeDeleteInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDeleteFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDeleteFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type InterfaceTypeDisconnectInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsDisconnectFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsDisconnectFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
}

/**
 * Connection between an Interface Type and its fields types.
 * The field data is stored as relationship properties and we retreive them along with the relation itself.
 */
export type InterfaceTypeEdge = Field &
  IEdge & {
    description?: Maybe<Scalars['String']>
    key: Scalars['String']
    name?: Maybe<Scalars['String']>
    source: Scalars['String']
    target: Scalars['String']
  }

export type InterfaceTypeFieldsConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  edge: FieldCreateInput
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type InterfaceTypeFieldsConnection = {
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
  cursor: Scalars['String']
  description?: Maybe<Scalars['String']>
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
}

export type InterfaceTypeRelationInput = {
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsCreateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsCreateFieldInput>>
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
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
  apiOfAtoms?: InputMaybe<Array<InterfaceTypeApiOfAtomsUpdateFieldInput>>
  fields?: InputMaybe<Array<InterfaceTypeFieldsUpdateFieldInput>>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type InterfaceTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<InterfaceTypeUserOwnerNodeAggregateSelection>
}

export type InterfaceTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<InterfaceTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return InterfaceTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return InterfaceTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return InterfaceTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return InterfaceTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

/** Allows picking a lambda */
export type LambdaType = TypeBase & {
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type LambdaTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type LambdaTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type LambdaTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type LambdaTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type LambdaTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type LambdaTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort LambdaTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one LambdaTypeSort object. */
export type LambdaTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type LambdaTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type LambdaTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<LambdaTypeUserOwnerNodeAggregateSelection>
}

export type LambdaTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<LambdaTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return LambdaTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return LambdaTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return LambdaTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return LambdaTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export enum MonacoLanguage {
  Css = 'css',
  CssInJs = 'cssInJs',
  GraphqlDev = 'graphqlDev',
  Javascript = 'javascript',
  Json = 'json',
  Typescript = 'typescript',
}

/** Allows editing the value using a monaco editor */
export type MonacoType = TypeBase & {
  graph: TypeGraph
  id: Scalars['ID']
  language: MonacoLanguage
  name: Scalars['String']
  owner: Array<User>
  ownerAggregate?: Maybe<MonacoTypeUserOwnerAggregationSelection>
  ownerConnection: TypeBaseOwnerConnection
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<UserWhere>
}

/** Allows editing the value using a monaco editor */
export type MonacoTypeOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<TypeBaseOwnerConnectionSort>>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

export type MonacoTypeAggregateSelection = {
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type MonacoTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type MonacoTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type MonacoTypeCreateInput = {
  language: MonacoLanguage
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type MonacoTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type MonacoTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
}

export type MonacoTypeOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more MonacoTypeSort objects to sort MonacoTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MonacoTypeSort>>
}

export type MonacoTypeOwnerAggregateInput = {
  AND?: InputMaybe<Array<MonacoTypeOwnerAggregateInput>>
  OR?: InputMaybe<Array<MonacoTypeOwnerAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<MonacoTypeOwnerNodeAggregationWhereInput>
}

export type MonacoTypeOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<MonacoTypeOwnerNodeAggregationWhereInput>>
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
}

export type MonacoTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort MonacoTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one MonacoTypeSort object. */
export type MonacoTypeSort = {
  id?: InputMaybe<SortDirection>
  language?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type MonacoTypeUpdateInput = {
  language?: InputMaybe<MonacoLanguage>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type MonacoTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<MonacoTypeUserOwnerNodeAggregateSelection>
}

export type MonacoTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type MonacoTypeWhere = {
  AND?: InputMaybe<Array<MonacoTypeWhere>>
  OR?: InputMaybe<Array<MonacoTypeWhere>>
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
  language?: InputMaybe<MonacoLanguage>
  language_IN?: InputMaybe<Array<MonacoLanguage>>
  language_NOT?: InputMaybe<MonacoLanguage>
  language_NOT_IN?: InputMaybe<Array<MonacoLanguage>>
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
  ownerAggregate?: InputMaybe<MonacoTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return MonacoTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return MonacoTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return MonacoTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return MonacoTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type Mutation = {
  createActions: CreateActionsMutationResponse
  createAppTypes: CreateAppTypesMutationResponse
  createApps: CreateAppsMutationResponse
  createArrayTypes: CreateArrayTypesMutationResponse
  createAtoms: CreateAtomsMutationResponse
  createComponents: CreateComponentsMutationResponse
  createCreateInfos: CreateCreateInfosMutationResponse
  createDeleteFieldResponses: CreateDeleteFieldResponsesMutationResponse
  createEdges: CreateEdgesMutationResponse
  createElementTypes: CreateElementTypesMutationResponse
  createElements: CreateElementsMutationResponse
  createEnumTypeValues: CreateEnumTypeValuesMutationResponse
  createEnumTypes: CreateEnumTypesMutationResponse
  createExportAdminDataResponses: CreateExportAdminDataResponsesMutationResponse
  createHooks: CreateHooksMutationResponse
  createImportDataMutationResponses: CreateImportDataMutationResponsesMutationResponse
  createInterfaceTypes: CreateInterfaceTypesMutationResponse
  createLambdaTypes: CreateLambdaTypesMutationResponse
  createMonacoTypes: CreateMonacoTypesMutationResponse
  createPageTypes: CreatePageTypesMutationResponse
  createPages: CreatePagesMutationResponse
  createPrimitiveTypes: CreatePrimitiveTypesMutationResponse
  createPropMapBindings: CreatePropMapBindingsMutationResponse
  createProps: CreatePropsMutationResponse
  createReactNodeTypes: CreateReactNodeTypesMutationResponse
  createRenderPropsTypes: CreateRenderPropsTypesMutationResponse
  createResetDatabaseMutationResponses: CreateResetDatabaseMutationResponsesMutationResponse
  createStores: CreateStoresMutationResponse
  createTagGraphOptions: CreateTagGraphOptionsMutationResponse
  createTags: CreateTagsMutationResponse
  createTypeReferences: CreateTypeReferencesMutationResponse
  createUnionTypes: CreateUnionTypesMutationResponse
  deleteActions: DeleteInfo
  deleteAppTypes: DeleteInfo
  deleteApps: DeleteInfo
  deleteArrayTypes: DeleteInfo
  deleteAtoms: DeleteInfo
  deleteComponents: DeleteInfo
  deleteCreateInfos: DeleteInfo
  deleteDeleteFieldResponses: DeleteInfo
  deleteEdges: DeleteInfo
  deleteElementTypes: DeleteInfo
  deleteElements: DeleteInfo
  deleteElementsSubgraph: DeleteElementsInfo
  deleteEnumTypeValues: DeleteInfo
  deleteEnumTypes: DeleteInfo
  deleteExportAdminDataResponses: DeleteInfo
  deleteFieldEdge: DeleteFieldResponse
  deleteHooks: DeleteInfo
  deleteImportDataMutationResponses: DeleteInfo
  deleteInterfaceTypes: DeleteInfo
  deleteLambdaTypes: DeleteInfo
  deleteMonacoTypes: DeleteInfo
  deletePageTypes: DeleteInfo
  deletePages: DeleteInfo
  deletePrimitiveTypes: DeleteInfo
  deletePropMapBindings: DeleteInfo
  deleteProps: DeleteInfo
  deleteReactNodeTypes: DeleteInfo
  deleteRenderPropsTypes: DeleteInfo
  deleteResetDatabaseMutationResponses: DeleteInfo
  deleteStores: DeleteInfo
  deleteStoresSubgraph: DeleteInfo
  deleteTagGraphOptions: DeleteInfo
  deleteTags: DeleteInfo
  deleteTypeReferences: DeleteInfo
  deleteUnionTypes: DeleteInfo
  deleteUsers: DeleteInfo
  importAdminData?: Maybe<ImportDataMutationResponse>
  importTypeGraph: TypeGraph
  resetDatabase?: Maybe<ResetDatabaseMutationResponse>
  updateActions: UpdateActionsMutationResponse
  updateAppTypes: UpdateAppTypesMutationResponse
  updateApps: UpdateAppsMutationResponse
  updateArrayTypes: UpdateArrayTypesMutationResponse
  updateAtoms: UpdateAtomsMutationResponse
  updateComponents: UpdateComponentsMutationResponse
  updateCreateInfos: UpdateCreateInfosMutationResponse
  updateDeleteFieldResponses: UpdateDeleteFieldResponsesMutationResponse
  updateEdges: UpdateEdgesMutationResponse
  updateElementTypes: UpdateElementTypesMutationResponse
  updateElements: UpdateElementsMutationResponse
  updateEnumTypeValues: UpdateEnumTypeValuesMutationResponse
  updateEnumTypes: UpdateEnumTypesMutationResponse
  updateExportAdminDataResponses: UpdateExportAdminDataResponsesMutationResponse
  updateHooks: UpdateHooksMutationResponse
  updateImportDataMutationResponses: UpdateImportDataMutationResponsesMutationResponse
  updateInterfaceTypes: UpdateInterfaceTypesMutationResponse
  updateLambdaTypes: UpdateLambdaTypesMutationResponse
  updateMonacoTypes: UpdateMonacoTypesMutationResponse
  updatePageTypes: UpdatePageTypesMutationResponse
  updatePages: UpdatePagesMutationResponse
  updatePrimitiveTypes: UpdatePrimitiveTypesMutationResponse
  updatePropMapBindings: UpdatePropMapBindingsMutationResponse
  updateProps: UpdatePropsMutationResponse
  updateReactNodeTypes: UpdateReactNodeTypesMutationResponse
  updateRenderPropsTypes: UpdateRenderPropsTypesMutationResponse
  updateResetDatabaseMutationResponses: UpdateResetDatabaseMutationResponsesMutationResponse
  updateStores: UpdateStoresMutationResponse
  updateTagGraphOptions: UpdateTagGraphOptionsMutationResponse
  updateTags: UpdateTagsMutationResponse
  updateTypeReferences: UpdateTypeReferencesMutationResponse
  updateUnionTypes: UpdateUnionTypesMutationResponse
  upsertFieldEdge: InterfaceTypeEdge
}

export type MutationCreateActionsArgs = {
  input: Array<ActionCreateInput>
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

export type MutationCreateComponentsArgs = {
  input: Array<ComponentCreateInput>
}

export type MutationCreateCreateInfosArgs = {
  input: Array<CreateInfoCreateInput>
}

export type MutationCreateDeleteFieldResponsesArgs = {
  input: Array<DeleteFieldResponseCreateInput>
}

export type MutationCreateEdgesArgs = {
  input: Array<EdgeCreateInput>
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

export type MutationCreateExportAdminDataResponsesArgs = {
  input: Array<ExportAdminDataResponseCreateInput>
}

export type MutationCreateHooksArgs = {
  input: Array<HookCreateInput>
}

export type MutationCreateImportDataMutationResponsesArgs = {
  input: Array<ImportDataMutationResponseCreateInput>
}

export type MutationCreateInterfaceTypesArgs = {
  input: Array<InterfaceTypeCreateInput>
}

export type MutationCreateLambdaTypesArgs = {
  input: Array<LambdaTypeCreateInput>
}

export type MutationCreateMonacoTypesArgs = {
  input: Array<MonacoTypeCreateInput>
}

export type MutationCreatePageTypesArgs = {
  input: Array<PageTypeCreateInput>
}

export type MutationCreatePagesArgs = {
  input: Array<PageCreateInput>
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

export type MutationDeleteActionsArgs = {
  delete?: InputMaybe<ActionDeleteInput>
  where?: InputMaybe<ActionWhere>
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

export type MutationDeleteComponentsArgs = {
  delete?: InputMaybe<ComponentDeleteInput>
  where?: InputMaybe<ComponentWhere>
}

export type MutationDeleteCreateInfosArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type MutationDeleteDeleteFieldResponsesArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type MutationDeleteEdgesArgs = {
  where?: InputMaybe<EdgeWhere>
}

export type MutationDeleteElementTypesArgs = {
  delete?: InputMaybe<ElementTypeDeleteInput>
  where?: InputMaybe<ElementTypeWhere>
}

export type MutationDeleteElementsArgs = {
  delete?: InputMaybe<ElementDeleteInput>
  where?: InputMaybe<ElementWhere>
}

export type MutationDeleteElementsSubgraphArgs = {
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

export type MutationDeleteExportAdminDataResponsesArgs = {
  where?: InputMaybe<ExportAdminDataResponseWhere>
}

export type MutationDeleteFieldEdgeArgs = {
  input: DeleteFieldInput
}

export type MutationDeleteHooksArgs = {
  delete?: InputMaybe<HookDeleteInput>
  where?: InputMaybe<HookWhere>
}

export type MutationDeleteImportDataMutationResponsesArgs = {
  where?: InputMaybe<ImportDataMutationResponseWhere>
}

export type MutationDeleteInterfaceTypesArgs = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type MutationDeleteLambdaTypesArgs = {
  delete?: InputMaybe<LambdaTypeDeleteInput>
  where?: InputMaybe<LambdaTypeWhere>
}

export type MutationDeleteMonacoTypesArgs = {
  delete?: InputMaybe<MonacoTypeDeleteInput>
  where?: InputMaybe<MonacoTypeWhere>
}

export type MutationDeletePageTypesArgs = {
  delete?: InputMaybe<PageTypeDeleteInput>
  where?: InputMaybe<PageTypeWhere>
}

export type MutationDeletePagesArgs = {
  delete?: InputMaybe<PageDeleteInput>
  where?: InputMaybe<PageWhere>
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

export type MutationDeleteStoresArgs = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<StoreWhere>
}

export type MutationDeleteStoresSubgraphArgs = {
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

export type MutationImportAdminDataArgs = {
  input: ImportAdminDataInput
}

export type MutationImportTypeGraphArgs = {
  payload: Scalars['JSONObject']
}

export type MutationUpdateActionsArgs = {
  connect?: InputMaybe<ActionConnectInput>
  connectOrCreate?: InputMaybe<ActionConnectOrCreateInput>
  create?: InputMaybe<ActionRelationInput>
  delete?: InputMaybe<ActionDeleteInput>
  disconnect?: InputMaybe<ActionDisconnectInput>
  update?: InputMaybe<ActionUpdateInput>
  where?: InputMaybe<ActionWhere>
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

export type MutationUpdateDeleteFieldResponsesArgs = {
  update?: InputMaybe<DeleteFieldResponseUpdateInput>
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type MutationUpdateEdgesArgs = {
  update?: InputMaybe<EdgeUpdateInput>
  where?: InputMaybe<EdgeWhere>
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

export type MutationUpdateExportAdminDataResponsesArgs = {
  update?: InputMaybe<ExportAdminDataResponseUpdateInput>
  where?: InputMaybe<ExportAdminDataResponseWhere>
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

export type MutationUpdateImportDataMutationResponsesArgs = {
  update?: InputMaybe<ImportDataMutationResponseUpdateInput>
  where?: InputMaybe<ImportDataMutationResponseWhere>
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

export type MutationUpdateMonacoTypesArgs = {
  connect?: InputMaybe<MonacoTypeConnectInput>
  connectOrCreate?: InputMaybe<MonacoTypeConnectOrCreateInput>
  create?: InputMaybe<MonacoTypeRelationInput>
  delete?: InputMaybe<MonacoTypeDeleteInput>
  disconnect?: InputMaybe<MonacoTypeDisconnectInput>
  update?: InputMaybe<MonacoTypeUpdateInput>
  where?: InputMaybe<MonacoTypeWhere>
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

export type MutationUpsertFieldEdgeArgs = {
  input: UpsertFieldInput
  isCreating: Scalars['Boolean']
}

export type Page = {
  app: App
  appAggregate?: Maybe<PageAppAppAggregationSelection>
  appConnection: PageAppConnection
  id: Scalars['ID']
  name: Scalars['String']
  rootElement: Element
  rootElementAggregate?: Maybe<PageElementRootElementAggregationSelection>
  rootElementConnection: PageRootElementConnection
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
  count: Scalars['Int']
  node?: Maybe<PageAppAppNodeAggregateSelection>
}

export type PageAppAppNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

export type PageAppRelationship = {
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
  name: Scalars['String']
  rootElement?: InputMaybe<PageRootElementFieldInput>
}

export type PageDeleteInput = {
  app?: InputMaybe<PageAppDeleteFieldInput>
  rootElement?: InputMaybe<PageRootElementDeleteFieldInput>
}

export type PageDisconnectInput = {
  app?: InputMaybe<PageAppDisconnectFieldInput>
  rootElement?: InputMaybe<PageRootElementDisconnectFieldInput>
}

export type PageElementRootElementAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<PageElementRootElementNodeAggregateSelection>
}

export type PageElementRootElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
  propTransformationJs: StringAggregateSelectionNullable
  renderForEachPropKey: StringAggregateSelectionNullable
  renderIfPropKey: StringAggregateSelectionNullable
}

/** Pagination information (Relay) */
export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type PageOnCreateInput = {
  name: Scalars['String']
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
}

/** Allows picking a page from the list of pages */
export type PageType = TypeBase & {
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PageTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type PageTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type PageTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type PageTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type PageTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type PageTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort PageTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PageTypeSort object. */
export type PageTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type PageTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type PageTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<PageTypeUserOwnerNodeAggregateSelection>
}

export type PageTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<PageTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return PageTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return PageTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return PageTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return PageTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type PageUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type PageUpdateInput = {
  app?: InputMaybe<PageAppUpdateFieldInput>
  name?: InputMaybe<Scalars['String']>
  rootElement?: InputMaybe<PageRootElementUpdateFieldInput>
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

export type ParentOfStore = {
  storeKey: Scalars['String']
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
  AND?: InputMaybe<Array<ParentOfStoreWhere>>
  OR?: InputMaybe<Array<ParentOfStoreWhere>>
  storeKey?: InputMaybe<Scalars['String']>
  storeKey_CONTAINS?: InputMaybe<Scalars['String']>
  storeKey_ENDS_WITH?: InputMaybe<Scalars['String']>
  storeKey_IN?: InputMaybe<Array<Scalars['String']>>
  storeKey_NOT?: InputMaybe<Scalars['String']>
  storeKey_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  storeKey_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  storeKey_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  storeKey_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  storeKey_STARTS_WITH?: InputMaybe<Scalars['String']>
}

/** Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean */
export type PrimitiveType = TypeBase & {
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type PrimitiveTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type PrimitiveTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type PrimitiveTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  primitiveKind: PrimitiveTypeKind
}

export type PrimitiveTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type PrimitiveTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type PrimitiveTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort PrimitiveTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PrimitiveTypeSort object. */
export type PrimitiveTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
  primitiveKind?: InputMaybe<SortDirection>
}

export type PrimitiveTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
}

export type PrimitiveTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<PrimitiveTypeUserOwnerNodeAggregateSelection>
}

export type PrimitiveTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<PrimitiveTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return PrimitiveTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return PrimitiveTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return PrimitiveTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return PrimitiveTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
  primitiveKind?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_IN?: InputMaybe<Array<PrimitiveTypeKind>>
  primitiveKind_NOT?: InputMaybe<PrimitiveTypeKind>
  primitiveKind_NOT_IN?: InputMaybe<Array<PrimitiveTypeKind>>
}

export type Prop = {
  data: Scalars['String']
  id: Scalars['ID']
}

export type PropAggregateSelection = {
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

export type PropMapBinding = {
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
  count: Scalars['Int']
  node?: Maybe<PropMapBindingElementElementNodeAggregateSelection>
}

export type PropMapBindingElementElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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
  cursor: Scalars['String']
  node: Element
}

export type PropMapBindingElementTargetElementAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<PropMapBindingElementTargetElementNodeAggregateSelection>
}

export type PropMapBindingElementTargetElementNodeAggregateSelection = {
  css: StringAggregateSelectionNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNullable
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
  css_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  css_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  css_EQUAL?: InputMaybe<Scalars['String']>
  css_GT?: InputMaybe<Scalars['Int']>
  css_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_LONGEST_GT?: InputMaybe<Scalars['Int']>
  css_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  css_LONGEST_LT?: InputMaybe<Scalars['Int']>
  css_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  css_LT?: InputMaybe<Scalars['Int']>
  css_LTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  css_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type Query = {
  actions: Array<Action>
  actionsAggregate: ActionAggregateSelection
  appTypes: Array<AppType>
  appTypesAggregate: AppTypeAggregateSelection
  apps: Array<App>
  appsAggregate: AppAggregateSelection
  arrayTypes: Array<ArrayType>
  arrayTypesAggregate: ArrayTypeAggregateSelection
  atoms: Array<Atom>
  atomsAggregate: AtomAggregateSelection
  components: Array<Component>
  componentsAggregate: ComponentAggregateSelection
  createInfos: Array<CreateInfo>
  createInfosAggregate: CreateInfoAggregateSelection
  deleteFieldResponses: Array<DeleteFieldResponse>
  deleteFieldResponsesAggregate: DeleteFieldResponseAggregateSelection
  edges: Array<Edge>
  edgesAggregate: EdgeAggregateSelection
  elementGraph: ElementGraph
  elementTypes: Array<ElementType>
  elementTypesAggregate: ElementTypeAggregateSelection
  elements: Array<Element>
  elementsAggregate: ElementAggregateSelection
  enumTypeValues: Array<EnumTypeValue>
  enumTypeValuesAggregate: EnumTypeValueAggregateSelection
  enumTypes: Array<EnumType>
  enumTypesAggregate: EnumTypeAggregateSelection
  exportAdminData: ExportAdminDataResponse
  exportAdminDataResponses: Array<ExportAdminDataResponse>
  exportAdminDataResponsesAggregate: ExportAdminDataResponseAggregateSelection
  exportGraph?: Maybe<Scalars['JSONObject']>
  getField: InterfaceTypeEdge
  /**
   * Returns a list of all Type and Atom entities that reference the type with the given id
   * This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
   */
  getTypeReferences?: Maybe<Array<TypeReference>>
  hooks: Array<Hook>
  hooksAggregate: HookAggregateSelection
  importDataMutationResponses: Array<ImportDataMutationResponse>
  importDataMutationResponsesAggregate: ImportDataMutationResponseAggregateSelection
  interfaceTypes: Array<InterfaceType>
  interfaceTypesAggregate: InterfaceTypeAggregateSelection
  /** Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion */
  isTypeDescendantOf?: Maybe<Scalars['Boolean']>
  lambdaTypes: Array<LambdaType>
  lambdaTypesAggregate: LambdaTypeAggregateSelection
  monacoTypes: Array<MonacoType>
  monacoTypesAggregate: MonacoTypeAggregateSelection
  pageTypes: Array<PageType>
  pageTypesAggregate: PageTypeAggregateSelection
  pages: Array<Page>
  pagesAggregate: PageAggregateSelection
  primitiveTypes: Array<PrimitiveType>
  primitiveTypesAggregate: PrimitiveTypeAggregateSelection
  propMapBindings: Array<PropMapBinding>
  propMapBindingsAggregate: PropMapBindingAggregateSelection
  props: Array<Prop>
  propsAggregate: PropAggregateSelection
  reactNodeTypes: Array<ReactNodeType>
  reactNodeTypesAggregate: ReactNodeTypeAggregateSelection
  renderPropsTypes: Array<RenderPropsType>
  renderPropsTypesAggregate: RenderPropsTypeAggregateSelection
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
  resetDatabaseMutationResponsesAggregate: ResetDatabaseMutationResponseAggregateSelection
  stores: Array<Store>
  storesAggregate: StoreAggregateSelection
  tagGraphOptions: Array<TagGraphOptions>
  tagGraphOptionsAggregate: TagGraphOptionsAggregateSelection
  tagGraphs: Array<TagGraph>
  tags: Array<Tag>
  tagsAggregate: TagAggregateSelection
  typeReferences: Array<TypeReference>
  typeReferencesAggregate: TypeReferenceAggregateSelection
  unionTypes: Array<UnionType>
  unionTypesAggregate: UnionTypeAggregateSelection
  users: Array<User>
  usersAggregate: UserAggregateSelection
}

export type QueryActionsArgs = {
  options?: InputMaybe<ActionOptions>
  where?: InputMaybe<ActionWhere>
}

export type QueryActionsAggregateArgs = {
  where?: InputMaybe<ActionWhere>
}

export type QueryAppTypesArgs = {
  options?: InputMaybe<AppTypeOptions>
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppTypesAggregateArgs = {
  where?: InputMaybe<AppTypeWhere>
}

export type QueryAppsArgs = {
  options?: InputMaybe<AppOptions>
  where?: InputMaybe<AppWhere>
}

export type QueryAppsAggregateArgs = {
  where?: InputMaybe<AppWhere>
}

export type QueryArrayTypesArgs = {
  options?: InputMaybe<ArrayTypeOptions>
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryArrayTypesAggregateArgs = {
  where?: InputMaybe<ArrayTypeWhere>
}

export type QueryAtomsArgs = {
  options?: InputMaybe<AtomOptions>
  where?: InputMaybe<AtomWhere>
}

export type QueryAtomsAggregateArgs = {
  where?: InputMaybe<AtomWhere>
}

export type QueryComponentsArgs = {
  options?: InputMaybe<ComponentOptions>
  where?: InputMaybe<ComponentWhere>
}

export type QueryComponentsAggregateArgs = {
  where?: InputMaybe<ComponentWhere>
}

export type QueryCreateInfosArgs = {
  options?: InputMaybe<CreateInfoOptions>
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryCreateInfosAggregateArgs = {
  where?: InputMaybe<CreateInfoWhere>
}

export type QueryDeleteFieldResponsesArgs = {
  options?: InputMaybe<DeleteFieldResponseOptions>
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type QueryDeleteFieldResponsesAggregateArgs = {
  where?: InputMaybe<DeleteFieldResponseWhere>
}

export type QueryEdgesArgs = {
  options?: InputMaybe<EdgeOptions>
  where?: InputMaybe<EdgeWhere>
}

export type QueryEdgesAggregateArgs = {
  where?: InputMaybe<EdgeWhere>
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

export type QueryElementsArgs = {
  options?: InputMaybe<ElementOptions>
  where?: InputMaybe<ElementWhere>
}

export type QueryElementsAggregateArgs = {
  where?: InputMaybe<ElementWhere>
}

export type QueryEnumTypeValuesArgs = {
  options?: InputMaybe<EnumTypeValueOptions>
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypeValuesAggregateArgs = {
  where?: InputMaybe<EnumTypeValueWhere>
}

export type QueryEnumTypesArgs = {
  options?: InputMaybe<EnumTypeOptions>
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryEnumTypesAggregateArgs = {
  where?: InputMaybe<EnumTypeWhere>
}

export type QueryExportAdminDataResponsesArgs = {
  options?: InputMaybe<ExportAdminDataResponseOptions>
  where?: InputMaybe<ExportAdminDataResponseWhere>
}

export type QueryExportAdminDataResponsesAggregateArgs = {
  where?: InputMaybe<ExportAdminDataResponseWhere>
}

export type QueryExportGraphArgs = {
  typeId: Scalars['ID']
}

export type QueryGetFieldArgs = {
  interfaceId: Scalars['ID']
  key: Scalars['String']
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

export type QueryImportDataMutationResponsesArgs = {
  options?: InputMaybe<ImportDataMutationResponseOptions>
  where?: InputMaybe<ImportDataMutationResponseWhere>
}

export type QueryImportDataMutationResponsesAggregateArgs = {
  where?: InputMaybe<ImportDataMutationResponseWhere>
}

export type QueryInterfaceTypesArgs = {
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type QueryInterfaceTypesAggregateArgs = {
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

export type QueryMonacoTypesArgs = {
  options?: InputMaybe<MonacoTypeOptions>
  where?: InputMaybe<MonacoTypeWhere>
}

export type QueryMonacoTypesAggregateArgs = {
  where?: InputMaybe<MonacoTypeWhere>
}

export type QueryPageTypesArgs = {
  options?: InputMaybe<PageTypeOptions>
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPageTypesAggregateArgs = {
  where?: InputMaybe<PageTypeWhere>
}

export type QueryPagesArgs = {
  options?: InputMaybe<PageOptions>
  where?: InputMaybe<PageWhere>
}

export type QueryPagesAggregateArgs = {
  where?: InputMaybe<PageWhere>
}

export type QueryPrimitiveTypesArgs = {
  options?: InputMaybe<PrimitiveTypeOptions>
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPrimitiveTypesAggregateArgs = {
  where?: InputMaybe<PrimitiveTypeWhere>
}

export type QueryPropMapBindingsArgs = {
  options?: InputMaybe<PropMapBindingOptions>
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropMapBindingsAggregateArgs = {
  where?: InputMaybe<PropMapBindingWhere>
}

export type QueryPropsArgs = {
  options?: InputMaybe<PropOptions>
  where?: InputMaybe<PropWhere>
}

export type QueryPropsAggregateArgs = {
  where?: InputMaybe<PropWhere>
}

export type QueryReactNodeTypesArgs = {
  options?: InputMaybe<ReactNodeTypeOptions>
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryReactNodeTypesAggregateArgs = {
  where?: InputMaybe<ReactNodeTypeWhere>
}

export type QueryRenderPropsTypesArgs = {
  options?: InputMaybe<RenderPropsTypeOptions>
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryRenderPropsTypesAggregateArgs = {
  where?: InputMaybe<RenderPropsTypeWhere>
}

export type QueryResetDatabaseMutationResponsesArgs = {
  options?: InputMaybe<ResetDatabaseMutationResponseOptions>
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryResetDatabaseMutationResponsesAggregateArgs = {
  where?: InputMaybe<ResetDatabaseMutationResponseWhere>
}

export type QueryStoresArgs = {
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type QueryStoresAggregateArgs = {
  where?: InputMaybe<StoreWhere>
}

export type QueryTagGraphOptionsArgs = {
  options?: InputMaybe<TagGraphOptionsOptions>
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagGraphOptionsAggregateArgs = {
  where?: InputMaybe<TagGraphOptionsWhere>
}

export type QueryTagsArgs = {
  options?: InputMaybe<TagOptions>
  where?: InputMaybe<TagWhere>
}

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>
}

export type QueryTypeReferencesArgs = {
  options?: InputMaybe<TypeReferenceOptions>
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryTypeReferencesAggregateArgs = {
  where?: InputMaybe<TypeReferenceWhere>
}

export type QueryUnionTypesArgs = {
  options?: InputMaybe<UnionTypeOptions>
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUnionTypesAggregateArgs = {
  where?: InputMaybe<UnionTypeWhere>
}

export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>
  where?: InputMaybe<UserWhere>
}

export type QueryUsersAggregateArgs = {
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
export type ReactNodeType = TypeBase & {
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type ReactNodeTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type ReactNodeTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type ReactNodeTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type ReactNodeTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type ReactNodeTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type ReactNodeTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort ReactNodeTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one ReactNodeTypeSort object. */
export type ReactNodeTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type ReactNodeTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type ReactNodeTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<ReactNodeTypeUserOwnerNodeAggregateSelection>
}

export type ReactNodeTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<ReactNodeTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return ReactNodeTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return ReactNodeTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return ReactNodeTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return ReactNodeTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
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
  graph: TypeGraph
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type RenderPropsTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type RenderPropsTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type RenderPropsTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
}

export type RenderPropsTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type RenderPropsTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
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
}

export type RenderPropsTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
}

/** Fields to sort RenderPropsTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one RenderPropsTypeSort object. */
export type RenderPropsTypeSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type RenderPropsTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
}

export type RenderPropsTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<RenderPropsTypeUserOwnerNodeAggregateSelection>
}

export type RenderPropsTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<RenderPropsTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return RenderPropsTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return RenderPropsTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return RenderPropsTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return RenderPropsTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

export type ResetDatabaseMutationResponse = {
  success?: Maybe<Scalars['Boolean']>
}

export type ResetDatabaseMutationResponseAggregateSelection = {
  count: Scalars['Int']
}

export type ResetDatabaseMutationResponseCreateInput = {
  success?: InputMaybe<Scalars['Boolean']>
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

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type Store = {
  actions: Array<Action>
  actionsAggregate?: Maybe<StoreActionActionsAggregationSelection>
  actionsConnection: StoreActionsConnection
  children: Array<Store>
  childrenAggregate?: Maybe<StoreStoreChildrenAggregationSelection>
  childrenConnection: StoreChildrenConnection
  descendants: Array<Store>
  id: Scalars['ID']
  initialState: Scalars['String']
  name: Scalars['String']
  parentStore?: Maybe<Store>
  parentStoreAggregate?: Maybe<StoreStoreParentStoreAggregationSelection>
  parentStoreConnection: StoreParentStoreConnection
  state: InterfaceType
  stateAggregate?: Maybe<StoreInterfaceTypeStateAggregationSelection>
  stateConnection: StoreStateConnection
}

export type StoreActionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<ActionOptions>
  where?: InputMaybe<ActionWhere>
}

export type StoreActionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<ActionWhere>
}

export type StoreActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreActionsConnectionSort>>
  where?: InputMaybe<StoreActionsConnectionWhere>
}

export type StoreChildrenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type StoreChildrenAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type StoreChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreChildrenConnectionSort>>
  where?: InputMaybe<StoreChildrenConnectionWhere>
}

export type StoreParentStoreArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<StoreOptions>
  where?: InputMaybe<StoreWhere>
}

export type StoreParentStoreAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<StoreWhere>
}

export type StoreParentStoreConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreParentStoreConnectionSort>>
  where?: InputMaybe<StoreParentStoreConnectionWhere>
}

export type StoreStateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  options?: InputMaybe<InterfaceTypeOptions>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>
  where?: InputMaybe<InterfaceTypeWhere>
}

export type StoreStateConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  directed?: InputMaybe<Scalars['Boolean']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Array<StoreStateConnectionSort>>
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreActionActionsAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<StoreActionActionsNodeAggregateSelection>
}

export type StoreActionActionsNodeAggregateSelection = {
  body: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreActionsAggregateInput = {
  AND?: InputMaybe<Array<StoreActionsAggregateInput>>
  OR?: InputMaybe<Array<StoreActionsAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  node?: InputMaybe<StoreActionsNodeAggregationWhereInput>
}

export type StoreActionsConnectFieldInput = {
  connect?: InputMaybe<Array<ActionConnectInput>>
  where?: InputMaybe<ActionConnectWhere>
}

export type StoreActionsConnectOrCreateFieldInput = {
  onCreate: StoreActionsConnectOrCreateFieldInputOnCreate
  where: ActionConnectOrCreateWhere
}

export type StoreActionsConnectOrCreateFieldInputOnCreate = {
  node: ActionOnCreateInput
}

export type StoreActionsConnection = {
  edges: Array<StoreActionsRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type StoreActionsCreateFieldInput = {
  node: ActionCreateInput
}

export type StoreActionsDeleteFieldInput = {
  delete?: InputMaybe<ActionDeleteInput>
  where?: InputMaybe<StoreActionsConnectionWhere>
}

export type StoreActionsDisconnectFieldInput = {
  disconnect?: InputMaybe<ActionDisconnectInput>
  where?: InputMaybe<StoreActionsConnectionWhere>
}

export type StoreActionsFieldInput = {
  connect?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<StoreActionsCreateFieldInput>>
}

export type StoreActionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreActionsNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreActionsNodeAggregationWhereInput>>
  body_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  body_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  body_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  body_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  body_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  body_EQUAL?: InputMaybe<Scalars['String']>
  body_GT?: InputMaybe<Scalars['Int']>
  body_GTE?: InputMaybe<Scalars['Int']>
  body_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  body_LONGEST_GT?: InputMaybe<Scalars['Int']>
  body_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  body_LONGEST_LT?: InputMaybe<Scalars['Int']>
  body_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  body_LT?: InputMaybe<Scalars['Int']>
  body_LTE?: InputMaybe<Scalars['Int']>
  body_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  body_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  body_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  body_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  body_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type StoreActionsRelationship = {
  cursor: Scalars['String']
  node: Action
}

export type StoreActionsUpdateConnectionInput = {
  node?: InputMaybe<ActionUpdateInput>
}

export type StoreActionsUpdateFieldInput = {
  connect?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<StoreActionsCreateFieldInput>>
  delete?: InputMaybe<Array<StoreActionsDeleteFieldInput>>
  disconnect?: InputMaybe<Array<StoreActionsDisconnectFieldInput>>
  update?: InputMaybe<StoreActionsUpdateConnectionInput>
  where?: InputMaybe<StoreActionsConnectionWhere>
}

export type StoreAggregateSelection = {
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  initialState: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreChildrenAggregateInput = {
  AND?: InputMaybe<Array<StoreChildrenAggregateInput>>
  OR?: InputMaybe<Array<StoreChildrenAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  edge?: InputMaybe<StoreChildrenEdgeAggregationWhereInput>
  node?: InputMaybe<StoreChildrenNodeAggregationWhereInput>
}

export type StoreChildrenConnectFieldInput = {
  connect?: InputMaybe<Array<StoreConnectInput>>
  edge: ParentOfStoreCreateInput
  where?: InputMaybe<StoreConnectWhere>
}

export type StoreChildrenConnectOrCreateFieldInput = {
  onCreate: StoreChildrenConnectOrCreateFieldInputOnCreate
  where: StoreConnectOrCreateWhere
}

export type StoreChildrenConnectOrCreateFieldInputOnCreate = {
  edge: ParentOfStoreCreateInput
  node: StoreOnCreateInput
}

export type StoreChildrenConnection = {
  edges: Array<StoreChildrenRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type StoreChildrenCreateFieldInput = {
  edge: ParentOfStoreCreateInput
  node: StoreCreateInput
}

export type StoreChildrenDeleteFieldInput = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<StoreChildrenConnectionWhere>
}

export type StoreChildrenDisconnectFieldInput = {
  disconnect?: InputMaybe<StoreDisconnectInput>
  where?: InputMaybe<StoreChildrenConnectionWhere>
}

export type StoreChildrenEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreChildrenEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreChildrenEdgeAggregationWhereInput>>
  storeKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  storeKey_EQUAL?: InputMaybe<Scalars['String']>
  storeKey_GT?: InputMaybe<Scalars['Int']>
  storeKey_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  storeKey_LT?: InputMaybe<Scalars['Int']>
  storeKey_LTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreChildrenFieldInput = {
  connect?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
}

export type StoreChildrenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreChildrenNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreChildrenNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  initialState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  initialState_EQUAL?: InputMaybe<Scalars['String']>
  initialState_GT?: InputMaybe<Scalars['Int']>
  initialState_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  initialState_LT?: InputMaybe<Scalars['Int']>
  initialState_LTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type StoreChildrenRelationship = ParentOfStore & {
  cursor: Scalars['String']
  node: Store
  storeKey: Scalars['String']
}

export type StoreChildrenUpdateConnectionInput = {
  edge?: InputMaybe<ParentOfStoreUpdateInput>
  node?: InputMaybe<StoreUpdateInput>
}

export type StoreChildrenUpdateFieldInput = {
  connect?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
  delete?: InputMaybe<Array<StoreChildrenDeleteFieldInput>>
  disconnect?: InputMaybe<Array<StoreChildrenDisconnectFieldInput>>
  update?: InputMaybe<StoreChildrenUpdateConnectionInput>
  where?: InputMaybe<StoreChildrenConnectionWhere>
}

export type StoreConnectInput = {
  actions?: InputMaybe<Array<StoreActionsConnectFieldInput>>
  children?: InputMaybe<Array<StoreChildrenConnectFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreConnectFieldInput>
  state?: InputMaybe<StoreStateConnectFieldInput>
}

export type StoreConnectOrCreateInput = {
  actions?: InputMaybe<Array<StoreActionsConnectOrCreateFieldInput>>
  children?: InputMaybe<Array<StoreChildrenConnectOrCreateFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
  state?: InputMaybe<StoreStateConnectOrCreateFieldInput>
}

export type StoreConnectOrCreateWhere = {
  node: StoreUniqueWhere
}

export type StoreConnectWhere = {
  node: StoreWhere
}

export type StoreCreateInput = {
  actions?: InputMaybe<StoreActionsFieldInput>
  children?: InputMaybe<StoreChildrenFieldInput>
  initialState?: Scalars['String']
  name: Scalars['String']
  parentStore?: InputMaybe<StoreParentStoreFieldInput>
  state?: InputMaybe<StoreStateFieldInput>
}

export type StoreDeleteInput = {
  actions?: InputMaybe<Array<StoreActionsDeleteFieldInput>>
  children?: InputMaybe<Array<StoreChildrenDeleteFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreDeleteFieldInput>
  state?: InputMaybe<StoreStateDeleteFieldInput>
}

export type StoreDisconnectInput = {
  actions?: InputMaybe<Array<StoreActionsDisconnectFieldInput>>
  children?: InputMaybe<Array<StoreChildrenDisconnectFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreDisconnectFieldInput>
  state?: InputMaybe<StoreStateDisconnectFieldInput>
}

export type StoreInterfaceTypeStateAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<StoreInterfaceTypeStateNodeAggregateSelection>
}

export type StoreInterfaceTypeStateNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreOnCreateInput = {
  initialState?: Scalars['String']
  name: Scalars['String']
}

export type StoreOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more StoreSort objects to sort Stores by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StoreSort>>
}

export type StoreParentStoreAggregateInput = {
  AND?: InputMaybe<Array<StoreParentStoreAggregateInput>>
  OR?: InputMaybe<Array<StoreParentStoreAggregateInput>>
  count?: InputMaybe<Scalars['Int']>
  count_GT?: InputMaybe<Scalars['Int']>
  count_GTE?: InputMaybe<Scalars['Int']>
  count_LT?: InputMaybe<Scalars['Int']>
  count_LTE?: InputMaybe<Scalars['Int']>
  edge?: InputMaybe<StoreParentStoreEdgeAggregationWhereInput>
  node?: InputMaybe<StoreParentStoreNodeAggregationWhereInput>
}

export type StoreParentStoreConnectFieldInput = {
  connect?: InputMaybe<StoreConnectInput>
  edge: ParentOfStoreCreateInput
  where?: InputMaybe<StoreConnectWhere>
}

export type StoreParentStoreConnectOrCreateFieldInput = {
  onCreate: StoreParentStoreConnectOrCreateFieldInputOnCreate
  where: StoreConnectOrCreateWhere
}

export type StoreParentStoreConnectOrCreateFieldInputOnCreate = {
  edge: ParentOfStoreCreateInput
  node: StoreOnCreateInput
}

export type StoreParentStoreConnection = {
  edges: Array<StoreParentStoreRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type StoreParentStoreCreateFieldInput = {
  edge: ParentOfStoreCreateInput
  node: StoreCreateInput
}

export type StoreParentStoreDeleteFieldInput = {
  delete?: InputMaybe<StoreDeleteInput>
  where?: InputMaybe<StoreParentStoreConnectionWhere>
}

export type StoreParentStoreDisconnectFieldInput = {
  disconnect?: InputMaybe<StoreDisconnectInput>
  where?: InputMaybe<StoreParentStoreConnectionWhere>
}

export type StoreParentStoreEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreParentStoreEdgeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreParentStoreEdgeAggregationWhereInput>>
  storeKey_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  storeKey_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  storeKey_EQUAL?: InputMaybe<Scalars['String']>
  storeKey_GT?: InputMaybe<Scalars['Int']>
  storeKey_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  storeKey_LT?: InputMaybe<Scalars['Int']>
  storeKey_LTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  storeKey_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
}

export type StoreParentStoreFieldInput = {
  connect?: InputMaybe<StoreParentStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
  create?: InputMaybe<StoreParentStoreCreateFieldInput>
}

export type StoreParentStoreNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StoreParentStoreNodeAggregationWhereInput>>
  OR?: InputMaybe<Array<StoreParentStoreNodeAggregationWhereInput>>
  id_EQUAL?: InputMaybe<Scalars['ID']>
  initialState_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_GTE?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LT?: InputMaybe<Scalars['Float']>
  initialState_AVERAGE_LTE?: InputMaybe<Scalars['Float']>
  initialState_EQUAL?: InputMaybe<Scalars['String']>
  initialState_GT?: InputMaybe<Scalars['Int']>
  initialState_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LT?: InputMaybe<Scalars['Int']>
  initialState_LONGEST_LTE?: InputMaybe<Scalars['Int']>
  initialState_LT?: InputMaybe<Scalars['Int']>
  initialState_LTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_GTE?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LT?: InputMaybe<Scalars['Int']>
  initialState_SHORTEST_LTE?: InputMaybe<Scalars['Int']>
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

export type StoreParentStoreRelationship = ParentOfStore & {
  cursor: Scalars['String']
  node: Store
  storeKey: Scalars['String']
}

export type StoreParentStoreUpdateConnectionInput = {
  edge?: InputMaybe<ParentOfStoreUpdateInput>
  node?: InputMaybe<StoreUpdateInput>
}

export type StoreParentStoreUpdateFieldInput = {
  connect?: InputMaybe<StoreParentStoreConnectFieldInput>
  connectOrCreate?: InputMaybe<StoreParentStoreConnectOrCreateFieldInput>
  create?: InputMaybe<StoreParentStoreCreateFieldInput>
  delete?: InputMaybe<StoreParentStoreDeleteFieldInput>
  disconnect?: InputMaybe<StoreParentStoreDisconnectFieldInput>
  update?: InputMaybe<StoreParentStoreUpdateConnectionInput>
  where?: InputMaybe<StoreParentStoreConnectionWhere>
}

export type StoreRelationInput = {
  actions?: InputMaybe<Array<StoreActionsCreateFieldInput>>
  children?: InputMaybe<Array<StoreChildrenCreateFieldInput>>
  parentStore?: InputMaybe<StoreParentStoreCreateFieldInput>
  state?: InputMaybe<StoreStateCreateFieldInput>
}

/** Fields to sort Stores by. The order in which sorts are applied is not guaranteed when specifying many fields in one StoreSort object. */
export type StoreSort = {
  id?: InputMaybe<SortDirection>
  initialState?: InputMaybe<SortDirection>
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

export type StoreStateConnectFieldInput = {
  connect?: InputMaybe<InterfaceTypeConnectInput>
  where?: InputMaybe<InterfaceTypeConnectWhere>
}

export type StoreStateConnectOrCreateFieldInput = {
  onCreate: StoreStateConnectOrCreateFieldInputOnCreate
  where: InterfaceTypeConnectOrCreateWhere
}

export type StoreStateConnectOrCreateFieldInputOnCreate = {
  node: InterfaceTypeOnCreateInput
}

export type StoreStateConnection = {
  edges: Array<StoreStateRelationship>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type StoreStateCreateFieldInput = {
  node: InterfaceTypeCreateInput
}

export type StoreStateDeleteFieldInput = {
  delete?: InputMaybe<InterfaceTypeDeleteInput>
  where?: InputMaybe<StoreStateConnectionWhere>
}

export type StoreStateDisconnectFieldInput = {
  disconnect?: InputMaybe<InterfaceTypeDisconnectInput>
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

export type StoreStateRelationship = {
  cursor: Scalars['String']
  node: InterfaceType
}

export type StoreStateUpdateConnectionInput = {
  node?: InputMaybe<InterfaceTypeUpdateInput>
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

export type StoreStoreChildrenAggregationSelection = {
  count: Scalars['Int']
  edge?: Maybe<StoreStoreChildrenEdgeAggregateSelection>
  node?: Maybe<StoreStoreChildrenNodeAggregateSelection>
}

export type StoreStoreChildrenEdgeAggregateSelection = {
  storeKey: StringAggregateSelectionNonNullable
}

export type StoreStoreChildrenNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  initialState: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreStoreParentStoreAggregationSelection = {
  count: Scalars['Int']
  edge?: Maybe<StoreStoreParentStoreEdgeAggregateSelection>
  node?: Maybe<StoreStoreParentStoreNodeAggregateSelection>
}

export type StoreStoreParentStoreEdgeAggregateSelection = {
  storeKey: StringAggregateSelectionNonNullable
}

export type StoreStoreParentStoreNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  initialState: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type StoreUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
}

export type StoreUpdateInput = {
  actions?: InputMaybe<Array<StoreActionsUpdateFieldInput>>
  children?: InputMaybe<Array<StoreChildrenUpdateFieldInput>>
  initialState?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  parentStore?: InputMaybe<StoreParentStoreUpdateFieldInput>
  state?: InputMaybe<StoreStateUpdateFieldInput>
}

export type StoreWhere = {
  AND?: InputMaybe<Array<StoreWhere>>
  OR?: InputMaybe<Array<StoreWhere>>
  actionsAggregate?: InputMaybe<StoreActionsAggregateInput>
  actionsConnection_ALL?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_NONE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SINGLE?: InputMaybe<StoreActionsConnectionWhere>
  actionsConnection_SOME?: InputMaybe<StoreActionsConnectionWhere>
  /** Return Stores where all of the related Actions match this filter */
  actions_ALL?: InputMaybe<ActionWhere>
  /** Return Stores where none of the related Actions match this filter */
  actions_NONE?: InputMaybe<ActionWhere>
  /** Return Stores where one of the related Actions match this filter */
  actions_SINGLE?: InputMaybe<ActionWhere>
  /** Return Stores where some of the related Actions match this filter */
  actions_SOME?: InputMaybe<ActionWhere>
  childrenAggregate?: InputMaybe<StoreChildrenAggregateInput>
  childrenConnection_ALL?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_NONE?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_SINGLE?: InputMaybe<StoreChildrenConnectionWhere>
  childrenConnection_SOME?: InputMaybe<StoreChildrenConnectionWhere>
  /** Return Stores where all of the related Stores match this filter */
  children_ALL?: InputMaybe<StoreWhere>
  /** Return Stores where none of the related Stores match this filter */
  children_NONE?: InputMaybe<StoreWhere>
  /** Return Stores where one of the related Stores match this filter */
  children_SINGLE?: InputMaybe<StoreWhere>
  /** Return Stores where some of the related Stores match this filter */
  children_SOME?: InputMaybe<StoreWhere>
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
  initialState?: InputMaybe<Scalars['String']>
  initialState_CONTAINS?: InputMaybe<Scalars['String']>
  initialState_ENDS_WITH?: InputMaybe<Scalars['String']>
  initialState_IN?: InputMaybe<Array<Scalars['String']>>
  initialState_NOT?: InputMaybe<Scalars['String']>
  initialState_NOT_CONTAINS?: InputMaybe<Scalars['String']>
  initialState_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>
  initialState_NOT_IN?: InputMaybe<Array<Scalars['String']>>
  initialState_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>
  initialState_STARTS_WITH?: InputMaybe<Scalars['String']>
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
  parentStore?: InputMaybe<StoreWhere>
  parentStoreAggregate?: InputMaybe<StoreParentStoreAggregateInput>
  parentStoreConnection?: InputMaybe<StoreParentStoreConnectionWhere>
  parentStoreConnection_NOT?: InputMaybe<StoreParentStoreConnectionWhere>
  parentStore_NOT?: InputMaybe<StoreWhere>
  state?: InputMaybe<InterfaceTypeWhere>
  stateAggregate?: InputMaybe<StoreStateAggregateInput>
  stateConnection?: InputMaybe<StoreStateConnectionWhere>
  stateConnection_NOT?: InputMaybe<StoreStateConnectionWhere>
  state_NOT?: InputMaybe<InterfaceTypeWhere>
}

export type StringAggregateSelectionNonNullable = {
  longest: Scalars['String']
  shortest: Scalars['String']
}

export type StringAggregateSelectionNullable = {
  longest?: Maybe<Scalars['String']>
  shortest?: Maybe<Scalars['String']>
}

export type Tag = {
  children: Array<Tag>
  childrenAggregate?: Maybe<TagTagChildrenAggregationSelection>
  childrenConnection: TagChildrenConnection
  id: Scalars['ID']
  isRoot?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
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
  parent?: InputMaybe<TagParentConnectFieldInput>
}

export type TagConnectOrCreateInput = {
  children?: InputMaybe<Array<TagChildrenConnectOrCreateFieldInput>>
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
  isRoot?: InputMaybe<Scalars['Boolean']>
  name: Scalars['String']
  parent?: InputMaybe<TagParentFieldInput>
}

export type TagDeleteInput = {
  children?: InputMaybe<Array<TagChildrenDeleteFieldInput>>
  parent?: InputMaybe<TagParentDeleteFieldInput>
}

export type TagDisconnectInput = {
  children?: InputMaybe<Array<TagChildrenDisconnectFieldInput>>
  parent?: InputMaybe<TagParentDisconnectFieldInput>
}

export type TagGraph = {
  descendants: Array<Scalars['ID']>
  id: Scalars['ID']
  name: Scalars['String']
}

export type TagGraphOptions = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['Int']>
}

export type TagGraphOptionsAggregateSelection = {
  count: Scalars['Int']
  limit: IntAggregateSelectionNullable
  sort: IntAggregateSelectionNullable
}

export type TagGraphOptionsCreateInput = {
  limit?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Scalars['Int']>
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
  isRoot?: InputMaybe<Scalars['Boolean']>
  name: Scalars['String']
}

export type TagOptions = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>
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
  parent?: InputMaybe<TagParentCreateFieldInput>
}

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  id?: InputMaybe<SortDirection>
  isRoot?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TagTagChildrenAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<TagTagChildrenNodeAggregateSelection>
}

export type TagTagChildrenNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagTagParentAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<TagTagParentNodeAggregateSelection>
}

export type TagTagParentNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TagUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type TagUpdateInput = {
  children?: InputMaybe<Array<TagChildrenUpdateFieldInput>>
  isRoot?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<TagParentUpdateFieldInput>
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
  isRoot?: InputMaybe<Scalars['Boolean']>
  isRoot_NOT?: InputMaybe<Scalars['Boolean']>
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
  parent?: InputMaybe<TagWhere>
  parentAggregate?: InputMaybe<TagParentAggregateInput>
  parentConnection?: InputMaybe<TagParentConnectionWhere>
  parentConnection_NOT?: InputMaybe<TagParentConnectionWhere>
  parent_NOT?: InputMaybe<TagWhere>
}

export type TypeBase = {
  id: Scalars['ID']
  name: Scalars['String']
  owner: Array<User>
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
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
}

export type TypeBaseConnectWhere = {
  node: TypeBaseWhere
}

export type TypeBaseCreateInput = {
  AppType?: InputMaybe<AppTypeCreateInput>
  ArrayType?: InputMaybe<ArrayTypeCreateInput>
  ElementType?: InputMaybe<ElementTypeCreateInput>
  EnumType?: InputMaybe<EnumTypeCreateInput>
  InterfaceType?: InputMaybe<InterfaceTypeCreateInput>
  LambdaType?: InputMaybe<LambdaTypeCreateInput>
  MonacoType?: InputMaybe<MonacoTypeCreateInput>
  PageType?: InputMaybe<PageTypeCreateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeCreateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeCreateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeCreateInput>
  UnionType?: InputMaybe<UnionTypeCreateInput>
}

export type TypeBaseDeleteInput = {
  _on?: InputMaybe<TypeBaseImplementationsDeleteInput>
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
}

export type TypeBaseDisconnectInput = {
  _on?: InputMaybe<TypeBaseImplementationsDisconnectInput>
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
}

export type TypeBaseImplementationsConnectInput = {
  AppType?: InputMaybe<Array<AppTypeConnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeConnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeConnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeConnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeConnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeConnectInput>>
  MonacoType?: InputMaybe<Array<MonacoTypeConnectInput>>
  PageType?: InputMaybe<Array<PageTypeConnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeConnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeConnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeConnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeConnectInput>>
}

export type TypeBaseImplementationsDeleteInput = {
  AppType?: InputMaybe<Array<AppTypeDeleteInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDeleteInput>>
  ElementType?: InputMaybe<Array<ElementTypeDeleteInput>>
  EnumType?: InputMaybe<Array<EnumTypeDeleteInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDeleteInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDeleteInput>>
  MonacoType?: InputMaybe<Array<MonacoTypeDeleteInput>>
  PageType?: InputMaybe<Array<PageTypeDeleteInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDeleteInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDeleteInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDeleteInput>>
  UnionType?: InputMaybe<Array<UnionTypeDeleteInput>>
}

export type TypeBaseImplementationsDisconnectInput = {
  AppType?: InputMaybe<Array<AppTypeDisconnectInput>>
  ArrayType?: InputMaybe<Array<ArrayTypeDisconnectInput>>
  ElementType?: InputMaybe<Array<ElementTypeDisconnectInput>>
  EnumType?: InputMaybe<Array<EnumTypeDisconnectInput>>
  InterfaceType?: InputMaybe<Array<InterfaceTypeDisconnectInput>>
  LambdaType?: InputMaybe<Array<LambdaTypeDisconnectInput>>
  MonacoType?: InputMaybe<Array<MonacoTypeDisconnectInput>>
  PageType?: InputMaybe<Array<PageTypeDisconnectInput>>
  PrimitiveType?: InputMaybe<Array<PrimitiveTypeDisconnectInput>>
  ReactNodeType?: InputMaybe<Array<ReactNodeTypeDisconnectInput>>
  RenderPropsType?: InputMaybe<Array<RenderPropsTypeDisconnectInput>>
  UnionType?: InputMaybe<Array<UnionTypeDisconnectInput>>
}

export type TypeBaseImplementationsUpdateInput = {
  AppType?: InputMaybe<AppTypeUpdateInput>
  ArrayType?: InputMaybe<ArrayTypeUpdateInput>
  ElementType?: InputMaybe<ElementTypeUpdateInput>
  EnumType?: InputMaybe<EnumTypeUpdateInput>
  InterfaceType?: InputMaybe<InterfaceTypeUpdateInput>
  LambdaType?: InputMaybe<LambdaTypeUpdateInput>
  MonacoType?: InputMaybe<MonacoTypeUpdateInput>
  PageType?: InputMaybe<PageTypeUpdateInput>
  PrimitiveType?: InputMaybe<PrimitiveTypeUpdateInput>
  ReactNodeType?: InputMaybe<ReactNodeTypeUpdateInput>
  RenderPropsType?: InputMaybe<RenderPropsTypeUpdateInput>
  UnionType?: InputMaybe<UnionTypeUpdateInput>
}

export type TypeBaseImplementationsWhere = {
  AppType?: InputMaybe<AppTypeWhere>
  ArrayType?: InputMaybe<ArrayTypeWhere>
  ElementType?: InputMaybe<ElementTypeWhere>
  EnumType?: InputMaybe<EnumTypeWhere>
  InterfaceType?: InputMaybe<InterfaceTypeWhere>
  LambdaType?: InputMaybe<LambdaTypeWhere>
  MonacoType?: InputMaybe<MonacoTypeWhere>
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
  connect?: InputMaybe<Array<UserConnectInput>>
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
  connect?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
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
}

export type TypeBaseOwnerRelationship = {
  cursor: Scalars['String']
  node: User
}

export type TypeBaseOwnerUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>
}

export type TypeBaseOwnerUpdateFieldInput = {
  connect?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
  connectOrCreate?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
  create?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
  delete?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
  disconnect?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
  update?: InputMaybe<TypeBaseOwnerUpdateConnectionInput>
  where?: InputMaybe<TypeBaseOwnerConnectionWhere>
}

/** Fields to sort TypeBases by. The order in which sorts are applied is not guaranteed when specifying many fields in one TypeBaseSort object. */
export type TypeBaseSort = {
  id?: InputMaybe<SortDirection>
  name?: InputMaybe<SortDirection>
}

export type TypeBaseUpdateInput = {
  _on?: InputMaybe<TypeBaseImplementationsUpdateInput>
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
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
  ownerAggregate?: InputMaybe<TypeBaseOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return TypeBases where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return TypeBases where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return TypeBases where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return TypeBases where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
}

/**
 * Connection between two types in a TypeGraph.
 * Can be:
 * Array -> ArrayItem (Edge)
 * Interface -> Field type - (InterfaceTypeEdge)
 * Union -> Union member (Edge)
 */
export type TypeEdge = Edge | InterfaceTypeEdge

export type TypeGraph = {
  edges: Array<TypeEdge>
  vertices: Array<AnyType>
}

export type TypeReference = {
  /** The type of resource - Atom, InterfaceType, etc. */
  label: Scalars['String']
  /** The name of the resource referencing the type */
  name: Scalars['String']
}

export type TypeReferenceAggregateSelection = {
  count: Scalars['Int']
  label: StringAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type TypeReferenceCreateInput = {
  label: Scalars['String']
  name: Scalars['String']
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

/** Allows picking one of a set of types */
export type UnionType = TypeBase &
  WithDescendants & {
    descendantTypesIds: Array<Scalars['ID']>
    graph: TypeGraph
    id: Scalars['ID']
    name: Scalars['String']
    owner: Array<User>
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
  count: Scalars['Int']
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
}

export type UnionTypeConnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectFieldInput>>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeConnectFieldInput>
  >
}

export type UnionTypeConnectOrCreateInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerConnectOrCreateFieldInput>>
}

export type UnionTypeCreateInput = {
  name: Scalars['String']
  owner?: InputMaybe<TypeBaseOwnerFieldInput>
  typesOfUnionType?: InputMaybe<UnionTypeTypesOfUnionTypeFieldInput>
}

export type UnionTypeDeleteInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDeleteFieldInput>>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDeleteFieldInput>
  >
}

export type UnionTypeDisconnectInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerDisconnectFieldInput>>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeDisconnectFieldInput>
  >
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
}

export type UnionTypeRelationInput = {
  owner?: InputMaybe<Array<TypeBaseOwnerCreateFieldInput>>
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

export type UnionTypeTypesOfUnionTypeConnection = {
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
  name?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Array<TypeBaseOwnerUpdateFieldInput>>
  typesOfUnionType?: InputMaybe<
    Array<UnionTypeTypesOfUnionTypeUpdateFieldInput>
  >
}

export type UnionTypeUserOwnerAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<UnionTypeUserOwnerNodeAggregateSelection>
}

export type UnionTypeUserOwnerNodeAggregateSelection = {
  auth0Id: StringAggregateSelectionNonNullable
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
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
  ownerAggregate?: InputMaybe<UnionTypeOwnerAggregateInput>
  ownerConnection_ALL?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_NONE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SINGLE?: InputMaybe<TypeBaseOwnerConnectionWhere>
  ownerConnection_SOME?: InputMaybe<TypeBaseOwnerConnectionWhere>
  /** Return UnionTypes where all of the related Users match this filter */
  owner_ALL?: InputMaybe<UserWhere>
  /** Return UnionTypes where none of the related Users match this filter */
  owner_NONE?: InputMaybe<UserWhere>
  /** Return UnionTypes where one of the related Users match this filter */
  owner_SINGLE?: InputMaybe<UserWhere>
  /** Return UnionTypes where some of the related Users match this filter */
  owner_SOME?: InputMaybe<UserWhere>
  typesOfUnionTypeConnection_ALL?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_NONE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SINGLE?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
  typesOfUnionTypeConnection_SOME?: InputMaybe<UnionTypeTypesOfUnionTypeConnectionWhere>
}

export type UpdateActionsMutationResponse = {
  actions: Array<Action>
  info: UpdateInfo
}

export type UpdateAppTypesMutationResponse = {
  appTypes: Array<AppType>
  info: UpdateInfo
}

export type UpdateAppsMutationResponse = {
  apps: Array<App>
  info: UpdateInfo
}

export type UpdateArrayTypesMutationResponse = {
  arrayTypes: Array<ArrayType>
  info: UpdateInfo
}

export type UpdateAtomsMutationResponse = {
  atoms: Array<Atom>
  info: UpdateInfo
}

export type UpdateComponentsMutationResponse = {
  components: Array<Component>
  info: UpdateInfo
}

export type UpdateCreateInfosMutationResponse = {
  createInfos: Array<CreateInfo>
  info: UpdateInfo
}

export type UpdateDeleteFieldResponsesMutationResponse = {
  deleteFieldResponses: Array<DeleteFieldResponse>
  info: UpdateInfo
}

export type UpdateEdgesMutationResponse = {
  edges: Array<Edge>
  info: UpdateInfo
}

export type UpdateElementTypesMutationResponse = {
  elementTypes: Array<ElementType>
  info: UpdateInfo
}

export type UpdateElementsMutationResponse = {
  elements: Array<Element>
  info: UpdateInfo
}

export type UpdateEnumTypeValuesMutationResponse = {
  enumTypeValues: Array<EnumTypeValue>
  info: UpdateInfo
}

export type UpdateEnumTypesMutationResponse = {
  enumTypes: Array<EnumType>
  info: UpdateInfo
}

export type UpdateExportAdminDataResponsesMutationResponse = {
  exportAdminDataResponses: Array<ExportAdminDataResponse>
  info: UpdateInfo
}

export type UpdateHooksMutationResponse = {
  hooks: Array<Hook>
  info: UpdateInfo
}

export type UpdateImportDataMutationResponsesMutationResponse = {
  importDataMutationResponses: Array<ImportDataMutationResponse>
  info: UpdateInfo
}

export type UpdateInfo = {
  bookmark?: Maybe<Scalars['String']>
  nodesCreated: Scalars['Int']
  nodesDeleted: Scalars['Int']
  relationshipsCreated: Scalars['Int']
  relationshipsDeleted: Scalars['Int']
}

export type UpdateInterfaceTypesMutationResponse = {
  info: UpdateInfo
  interfaceTypes: Array<InterfaceType>
}

export type UpdateLambdaTypesMutationResponse = {
  info: UpdateInfo
  lambdaTypes: Array<LambdaType>
}

export type UpdateMonacoTypesMutationResponse = {
  info: UpdateInfo
  monacoTypes: Array<MonacoType>
}

export type UpdatePageTypesMutationResponse = {
  info: UpdateInfo
  pageTypes: Array<PageType>
}

export type UpdatePagesMutationResponse = {
  info: UpdateInfo
  pages: Array<Page>
}

export type UpdatePrimitiveTypesMutationResponse = {
  info: UpdateInfo
  primitiveTypes: Array<PrimitiveType>
}

export type UpdatePropMapBindingsMutationResponse = {
  info: UpdateInfo
  propMapBindings: Array<PropMapBinding>
}

export type UpdatePropsMutationResponse = {
  info: UpdateInfo
  props: Array<Prop>
}

export type UpdateReactNodeTypesMutationResponse = {
  info: UpdateInfo
  reactNodeTypes: Array<ReactNodeType>
}

export type UpdateRenderPropsTypesMutationResponse = {
  info: UpdateInfo
  renderPropsTypes: Array<RenderPropsType>
}

export type UpdateResetDatabaseMutationResponsesMutationResponse = {
  info: UpdateInfo
  resetDatabaseMutationResponses: Array<ResetDatabaseMutationResponse>
}

export type UpdateStoresMutationResponse = {
  info: UpdateInfo
  stores: Array<Store>
}

export type UpdateTagGraphOptionsMutationResponse = {
  info: UpdateInfo
  tagGraphOptions: Array<TagGraphOptions>
}

export type UpdateTagsMutationResponse = {
  info: UpdateInfo
  tags: Array<Tag>
}

export type UpdateTypeReferencesMutationResponse = {
  info: UpdateInfo
  typeReferences: Array<TypeReference>
}

export type UpdateUnionTypesMutationResponse = {
  info: UpdateInfo
  unionTypes: Array<UnionType>
}

export type UpsertFieldInput = {
  description?: InputMaybe<Scalars['String']>
  interfaceTypeId: Scalars['ID']
  key: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  targetKey?: InputMaybe<Scalars['String']>
  targetTypeId: Scalars['ID']
}

export type User = {
  apps: Array<App>
  appsAggregate?: Maybe<UserAppAppsAggregationSelection>
  appsConnection: UserAppsConnection
  auth0Id: Scalars['String']
  components: Array<Component>
  componentsAggregate?: Maybe<UserComponentComponentsAggregationSelection>
  componentsConnection: UserComponentsConnection
  email: Scalars['String']
  id: Scalars['ID']
  types: Array<TypeBase>
  typesConnection: UserTypesConnection
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
  auth0Id: StringAggregateSelectionNonNullable
  count: Scalars['Int']
  email: StringAggregateSelectionNonNullable
  id: IdAggregateSelectionNonNullable
}

export type UserAppAppsAggregationSelection = {
  count: Scalars['Int']
  node?: Maybe<UserAppAppsNodeAggregateSelection>
}

export type UserAppAppsNodeAggregateSelection = {
  id: IdAggregateSelectionNonNullable
  name: StringAggregateSelectionNonNullable
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
}

export type UserAppsRelationship = {
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
  count: Scalars['Int']
  node?: Maybe<UserComponentComponentsNodeAggregateSelection>
}

export type UserComponentComponentsNodeAggregateSelection = {
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
  email: Scalars['String']
  types?: InputMaybe<UserTypesFieldInput>
}

export type UserDeleteInput = {
  apps?: InputMaybe<Array<UserAppsDeleteFieldInput>>
  components?: InputMaybe<Array<UserComponentsDeleteFieldInput>>
  types?: InputMaybe<Array<UserTypesDeleteFieldInput>>
}

export type UserDisconnectInput = {
  apps?: InputMaybe<Array<UserAppsDisconnectFieldInput>>
  components?: InputMaybe<Array<UserComponentsDisconnectFieldInput>>
  types?: InputMaybe<Array<UserTypesDisconnectFieldInput>>
}

export type UserOnCreateInput = {
  auth0Id: Scalars['String']
  email: Scalars['String']
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
}

export type UserTypesConnectFieldInput = {
  connect?: InputMaybe<TypeBaseConnectInput>
  where?: InputMaybe<TypeBaseConnectWhere>
}

export type UserTypesConnection = {
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
}

export type UserUpdateInput = {
  apps?: InputMaybe<Array<UserAppsUpdateFieldInput>>
  auth0Id?: InputMaybe<Scalars['String']>
  components?: InputMaybe<Array<UserComponentsUpdateFieldInput>>
  email?: InputMaybe<Scalars['String']>
  types?: InputMaybe<Array<UserTypesUpdateFieldInput>>
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
  typesConnection_ALL?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_NONE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SINGLE?: InputMaybe<UserTypesConnectionWhere>
  typesConnection_SOME?: InputMaybe<UserTypesConnectionWhere>
}

export type WithDescendants = {
  descendantTypesIds: Array<Scalars['ID']>
}

export type GetTypesQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetTypesQuery = {
  primitiveTypes: Array<Type_PrimitiveType_Fragment>
  arrayTypes: Array<Type_ArrayType_Fragment>
  unionTypes: Array<Type_UnionType_Fragment>
  interfaceTypes: Array<Type_InterfaceType_Fragment>
  elementTypes: Array<Type_ElementType_Fragment>
  renderPropsTypes: Array<Type_RenderPropsType_Fragment>
  enumTypes: Array<Type_EnumType_Fragment>
  lambdaTypes: Array<Type_LambdaType_Fragment>
  pageTypes: Array<Type_PageType_Fragment>
  appTypes: Array<Type_AppType_Fragment>
  monacoTypes: Array<Type_MonacoType_Fragment>
}

export type GetPrimitiveTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PrimitiveTypeOptions>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export type GetPrimitiveTypesQuery = {
  types: Array<Type_PrimitiveType_Fragment>
}

export type GetArrayTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ArrayTypeOptions>
  where?: Types.InputMaybe<Types.ArrayTypeWhere>
}>

export type GetArrayTypesQuery = { types: Array<Type_ArrayType_Fragment> }

export type GetUnionTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.UnionTypeOptions>
  where?: Types.InputMaybe<Types.UnionTypeWhere>
}>

export type GetUnionTypesQuery = { types: Array<Type_UnionType_Fragment> }

export type GetInterfaceTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.InterfaceTypeOptions>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type GetInterfaceTypesQuery = {
  types: Array<Type_InterfaceType_Fragment>
}

export type GetElementTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementTypeOptions>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type GetElementTypesQuery = { types: Array<Type_ElementType_Fragment> }

export type GetRenderPropsTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.RenderPropsTypeOptions>
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>
}>

export type GetRenderPropsTypesQuery = {
  types: Array<Type_RenderPropsType_Fragment>
}

export type GetReactNodeTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ReactNodeTypeOptions>
  where?: Types.InputMaybe<Types.ReactNodeTypeWhere>
}>

export type GetReactNodeTypesQuery = { types: Array<ReactNodeTypeFragment> }

export type GetEnumTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.EnumTypeOptions>
  where?: Types.InputMaybe<Types.EnumTypeWhere>
}>

export type GetEnumTypesQuery = { types: Array<Type_EnumType_Fragment> }

export type GetLambdaTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.LambdaTypeOptions>
  where?: Types.InputMaybe<Types.LambdaTypeWhere>
}>

export type GetLambdaTypesQuery = { types: Array<Type_LambdaType_Fragment> }

export type GetPageTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageTypeOptions>
  where?: Types.InputMaybe<Types.PageTypeWhere>
}>

export type GetPageTypesQuery = { types: Array<Type_PageType_Fragment> }

export type GetAppTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppTypeOptions>
  where?: Types.InputMaybe<Types.AppTypeWhere>
}>

export type GetAppTypesQuery = { types: Array<Type_AppType_Fragment> }

export type GetMonacoTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.MonacoTypeOptions>
  where?: Types.InputMaybe<Types.MonacoTypeWhere>
}>

export type GetMonacoTypesQuery = { types: Array<Type_MonacoType_Fragment> }

export const GetTypesDocument = gql`
  query GetTypes($ids: [ID!]) {
    primitiveTypes(where: { id_IN: $ids }) {
      ...Type
    }
    arrayTypes(where: { id_IN: $ids }) {
      ...Type
    }
    unionTypes(where: { id_IN: $ids }) {
      ...Type
    }
    interfaceTypes(where: { id_IN: $ids }) {
      ...Type
    }
    elementTypes(where: { id_IN: $ids }) {
      ...Type
    }
    renderPropsTypes(where: { id_IN: $ids }) {
      ...Type
    }
    enumTypes(where: { id_IN: $ids }) {
      ...Type
    }
    lambdaTypes(where: { id_IN: $ids }) {
      ...Type
    }
    pageTypes(where: { id_IN: $ids }) {
      ...Type
    }
    appTypes(where: { id_IN: $ids }) {
      ...Type
    }
    monacoTypes(where: { id_IN: $ids }) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetPrimitiveTypesDocument = gql`
  query GetPrimitiveTypes(
    $options: PrimitiveTypeOptions
    $where: PrimitiveTypeWhere
  ) {
    types: primitiveTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetArrayTypesDocument = gql`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetUnionTypesDocument = gql`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetInterfaceTypesDocument = gql`
  query GetInterfaceTypes(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetElementTypesDocument = gql`
  query GetElementTypes(
    $options: ElementTypeOptions
    $where: ElementTypeWhere
  ) {
    types: elementTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetRenderPropsTypesDocument = gql`
  query GetRenderPropsTypes(
    $options: RenderPropsTypeOptions
    $where: RenderPropsTypeWhere
  ) {
    types: renderPropsTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetReactNodeTypesDocument = gql`
  query GetReactNodeTypes(
    $options: ReactNodeTypeOptions
    $where: ReactNodeTypeWhere
  ) {
    types: reactNodeTypes(where: $where, options: $options) {
      ...ReactNodeType
    }
  }
  ${ReactNodeTypeFragmentDoc}
  ${TypeBaseFragmentDoc}
`
export const GetEnumTypesDocument = gql`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetLambdaTypesDocument = gql`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetPageTypesDocument = gql`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetAppTypesDocument = gql`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetMonacoTypesDocument = gql`
  query GetMonacoTypes($options: MonacoTypeOptions, $where: MonacoTypeWhere) {
    types: monacoTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetTypes(
      variables?: GetTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypesQuery>(GetTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTypes',
        'query',
      )
    },
    GetPrimitiveTypes(
      variables?: GetPrimitiveTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPrimitiveTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPrimitiveTypesQuery>(
            GetPrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPrimitiveTypes',
        'query',
      )
    },
    GetArrayTypes(
      variables?: GetArrayTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetArrayTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetArrayTypesQuery>(GetArrayTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetArrayTypes',
        'query',
      )
    },
    GetUnionTypes(
      variables?: GetUnionTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUnionTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUnionTypesQuery>(GetUnionTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUnionTypes',
        'query',
      )
    },
    GetInterfaceTypes(
      variables?: GetInterfaceTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetInterfaceTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetInterfaceTypesQuery>(
            GetInterfaceTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetInterfaceTypes',
        'query',
      )
    },
    GetElementTypes(
      variables?: GetElementTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementTypesQuery>(
            GetElementTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetElementTypes',
        'query',
      )
    },
    GetRenderPropsTypes(
      variables?: GetRenderPropsTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderPropsTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderPropsTypesQuery>(
            GetRenderPropsTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderPropsTypes',
        'query',
      )
    },
    GetReactNodeTypes(
      variables?: GetReactNodeTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetReactNodeTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetReactNodeTypesQuery>(
            GetReactNodeTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetReactNodeTypes',
        'query',
      )
    },
    GetEnumTypes(
      variables?: GetEnumTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetEnumTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEnumTypesQuery>(GetEnumTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetEnumTypes',
        'query',
      )
    },
    GetLambdaTypes(
      variables?: GetLambdaTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetLambdaTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLambdaTypesQuery>(
            GetLambdaTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetLambdaTypes',
        'query',
      )
    },
    GetPageTypes(
      variables?: GetPageTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPageTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPageTypesQuery>(GetPageTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPageTypes',
        'query',
      )
    },
    GetAppTypes(
      variables?: GetAppTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppTypesQuery>(GetAppTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAppTypes',
        'query',
      )
    },
    GetMonacoTypes(
      variables?: GetMonacoTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetMonacoTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMonacoTypesQuery>(
            GetMonacoTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetMonacoTypes',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
