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
  jsonb: any
  uuid: any
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _nin?: Maybe<Array<Scalars['Int']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>
  _is_null?: Maybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>
}

/** columns and relationships of "apps" */
export type Apps = {
  __typename?: 'apps'
  id: Scalars['uuid']
  name: Scalars['String']
  /** An array relationship */
  pages: Array<Pages>
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate
  /** An object relationship */
  user: Users
  userId: Scalars['String']
}

/** columns and relationships of "apps" */
export type AppsPagesArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

/** columns and relationships of "apps" */
export type AppsPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

/** aggregated selection of "apps" */
export type Apps_Aggregate = {
  __typename?: 'apps_aggregate'
  aggregate?: Maybe<Apps_Aggregate_Fields>
  nodes: Array<Apps>
}

/** aggregate fields of "apps" */
export type Apps_Aggregate_Fields = {
  __typename?: 'apps_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Apps_Max_Fields>
  min?: Maybe<Apps_Min_Fields>
}

/** aggregate fields of "apps" */
export type Apps_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Apps_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "apps" */
export type Apps_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Apps_Max_Order_By>
  min?: Maybe<Apps_Min_Order_By>
}

/** input type for inserting array relation for remote table "apps" */
export type Apps_Arr_Rel_Insert_Input = {
  data: Array<Apps_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Apps_On_Conflict>
}

/** Boolean expression to filter rows from the table "apps". All fields are combined with a logical 'AND'. */
export type Apps_Bool_Exp = {
  _and?: Maybe<Array<Apps_Bool_Exp>>
  _not?: Maybe<Apps_Bool_Exp>
  _or?: Maybe<Array<Apps_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  pages?: Maybe<Pages_Bool_Exp>
  user?: Maybe<Users_Bool_Exp>
  userId?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "apps" */
export enum Apps_Constraint {
  /** unique or primary key constraint */
  AppsPkey = 'apps_pkey',
}

/** input type for inserting data into table "apps" */
export type Apps_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  pages?: Maybe<Pages_Arr_Rel_Insert_Input>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  userId?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Apps_Max_Fields = {
  __typename?: 'apps_max_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "apps" */
export type Apps_Max_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  userId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Apps_Min_Fields = {
  __typename?: 'apps_min_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "apps" */
export type Apps_Min_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  userId?: Maybe<Order_By>
}

/** response of any mutation on the table "apps" */
export type Apps_Mutation_Response = {
  __typename?: 'apps_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Apps>
}

/** input type for inserting object relation for remote table "apps" */
export type Apps_Obj_Rel_Insert_Input = {
  data: Apps_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Apps_On_Conflict>
}

/** on conflict condition type for table "apps" */
export type Apps_On_Conflict = {
  constraint: Apps_Constraint
  update_columns: Array<Apps_Update_Column>
  where?: Maybe<Apps_Bool_Exp>
}

/** Ordering options when selecting data from "apps". */
export type Apps_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  pages_aggregate?: Maybe<Pages_Aggregate_Order_By>
  user?: Maybe<Users_Order_By>
  userId?: Maybe<Order_By>
}

/** primary key columns input for table: apps */
export type Apps_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "apps" */
export enum Apps_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
}

/** input type for updating data in table "apps" */
export type Apps_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** update columns of table "apps" */
export enum Apps_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
}

/** columns and relationships of "atom_types" */
export type Atom_Types = {
  __typename?: 'atom_types'
  description?: Maybe<Scalars['String']>
  value: Scalars['String']
}

/** aggregated selection of "atom_types" */
export type Atom_Types_Aggregate = {
  __typename?: 'atom_types_aggregate'
  aggregate?: Maybe<Atom_Types_Aggregate_Fields>
  nodes: Array<Atom_Types>
}

/** aggregate fields of "atom_types" */
export type Atom_Types_Aggregate_Fields = {
  __typename?: 'atom_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Atom_Types_Max_Fields>
  min?: Maybe<Atom_Types_Min_Fields>
}

/** aggregate fields of "atom_types" */
export type Atom_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Atom_Types_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "atom_types". All fields are combined with a logical 'AND'. */
export type Atom_Types_Bool_Exp = {
  _and?: Maybe<Array<Atom_Types_Bool_Exp>>
  _not?: Maybe<Atom_Types_Bool_Exp>
  _or?: Maybe<Array<Atom_Types_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "atom_types" */
export enum Atom_Types_Constraint {
  /** unique or primary key constraint */
  VertexTypePkey = 'vertexType_pkey',
}

/** input type for inserting data into table "atom_types" */
export type Atom_Types_Insert_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Atom_Types_Max_Fields = {
  __typename?: 'atom_types_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Atom_Types_Min_Fields = {
  __typename?: 'atom_types_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "atom_types" */
export type Atom_Types_Mutation_Response = {
  __typename?: 'atom_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Atom_Types>
}

/** input type for inserting object relation for remote table "atom_types" */
export type Atom_Types_Obj_Rel_Insert_Input = {
  data: Atom_Types_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Atom_Types_On_Conflict>
}

/** on conflict condition type for table "atom_types" */
export type Atom_Types_On_Conflict = {
  constraint: Atom_Types_Constraint
  update_columns: Array<Atom_Types_Update_Column>
  where?: Maybe<Atom_Types_Bool_Exp>
}

/** Ordering options when selecting data from "atom_types". */
export type Atom_Types_Order_By = {
  description?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: atom_types */
export type Atom_Types_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "atom_types" */
export enum Atom_Types_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "atom_types" */
export type Atom_Types_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "atom_types" */
export enum Atom_Types_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** columns and relationships of "atoms" */
export type Atoms = {
  __typename?: 'atoms'
  /** An object relationship */
  atomType: Atom_Types
  /** An object relationship */
  component: Components
  component_id: Scalars['uuid']
  id: Scalars['uuid']
  type: Scalars['String']
}

/** aggregated selection of "atoms" */
export type Atoms_Aggregate = {
  __typename?: 'atoms_aggregate'
  aggregate?: Maybe<Atoms_Aggregate_Fields>
  nodes: Array<Atoms>
}

/** aggregate fields of "atoms" */
export type Atoms_Aggregate_Fields = {
  __typename?: 'atoms_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Atoms_Max_Fields>
  min?: Maybe<Atoms_Min_Fields>
}

/** aggregate fields of "atoms" */
export type Atoms_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Atoms_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "atoms" */
export type Atoms_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Atoms_Max_Order_By>
  min?: Maybe<Atoms_Min_Order_By>
}

/** input type for inserting array relation for remote table "atoms" */
export type Atoms_Arr_Rel_Insert_Input = {
  data: Array<Atoms_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Atoms_On_Conflict>
}

/** Boolean expression to filter rows from the table "atoms". All fields are combined with a logical 'AND'. */
export type Atoms_Bool_Exp = {
  _and?: Maybe<Array<Atoms_Bool_Exp>>
  _not?: Maybe<Atoms_Bool_Exp>
  _or?: Maybe<Array<Atoms_Bool_Exp>>
  atomType?: Maybe<Atom_Types_Bool_Exp>
  component?: Maybe<Components_Bool_Exp>
  component_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  type?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "atoms" */
export enum Atoms_Constraint {
  /** unique or primary key constraint */
  VerticesPkey = 'vertices_pkey',
}

/** input type for inserting data into table "atoms" */
export type Atoms_Insert_Input = {
  atomType?: Maybe<Atom_Types_Obj_Rel_Insert_Input>
  component?: Maybe<Components_Obj_Rel_Insert_Input>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Atoms_Max_Fields = {
  __typename?: 'atoms_max_fields'
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "atoms" */
export type Atoms_Max_Order_By = {
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Atoms_Min_Fields = {
  __typename?: 'atoms_min_fields'
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "atoms" */
export type Atoms_Min_Order_By = {
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** response of any mutation on the table "atoms" */
export type Atoms_Mutation_Response = {
  __typename?: 'atoms_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Atoms>
}

/** input type for inserting object relation for remote table "atoms" */
export type Atoms_Obj_Rel_Insert_Input = {
  data: Atoms_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Atoms_On_Conflict>
}

/** on conflict condition type for table "atoms" */
export type Atoms_On_Conflict = {
  constraint: Atoms_Constraint
  update_columns: Array<Atoms_Update_Column>
  where?: Maybe<Atoms_Bool_Exp>
}

/** Ordering options when selecting data from "atoms". */
export type Atoms_Order_By = {
  atomType?: Maybe<Atom_Types_Order_By>
  component?: Maybe<Components_Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** primary key columns input for table: atoms */
export type Atoms_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "atoms" */
export enum Atoms_Select_Column {
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "atoms" */
export type Atoms_Set_Input = {
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
}

/** update columns of table "atoms" */
export enum Atoms_Update_Column {
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
}

/** columns and relationships of "attributes" */
export type Attributes = {
  __typename?: 'attributes'
  /** An object relationship */
  atom_type: Atom_Types
  id: Scalars['uuid']
  key: Scalars['String']
  type: Scalars['String']
}

/** aggregated selection of "attributes" */
export type Attributes_Aggregate = {
  __typename?: 'attributes_aggregate'
  aggregate?: Maybe<Attributes_Aggregate_Fields>
  nodes: Array<Attributes>
}

/** aggregate fields of "attributes" */
export type Attributes_Aggregate_Fields = {
  __typename?: 'attributes_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Attributes_Max_Fields>
  min?: Maybe<Attributes_Min_Fields>
}

/** aggregate fields of "attributes" */
export type Attributes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Attributes_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "attributes". All fields are combined with a logical 'AND'. */
export type Attributes_Bool_Exp = {
  _and?: Maybe<Array<Attributes_Bool_Exp>>
  _not?: Maybe<Attributes_Bool_Exp>
  _or?: Maybe<Array<Attributes_Bool_Exp>>
  atom_type?: Maybe<Atom_Types_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  key?: Maybe<String_Comparison_Exp>
  type?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "attributes" */
export enum Attributes_Constraint {
  /** unique or primary key constraint */
  AttributesPkey = 'attributes_pkey',
}

/** input type for inserting data into table "attributes" */
export type Attributes_Insert_Input = {
  atom_type?: Maybe<Atom_Types_Obj_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Attributes_Max_Fields = {
  __typename?: 'attributes_max_fields'
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Attributes_Min_Fields = {
  __typename?: 'attributes_min_fields'
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "attributes" */
export type Attributes_Mutation_Response = {
  __typename?: 'attributes_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Attributes>
}

/** on conflict condition type for table "attributes" */
export type Attributes_On_Conflict = {
  constraint: Attributes_Constraint
  update_columns: Array<Attributes_Update_Column>
  where?: Maybe<Attributes_Bool_Exp>
}

/** Ordering options when selecting data from "attributes". */
export type Attributes_Order_By = {
  atom_type?: Maybe<Atom_Types_Order_By>
  id?: Maybe<Order_By>
  key?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** primary key columns input for table: attributes */
export type Attributes_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "attributes" */
export enum Attributes_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "attributes" */
export type Attributes_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** update columns of table "attributes" */
export enum Attributes_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Type = 'type',
}

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories'
  id: Scalars['uuid']
  /** An array relationship */
  tags: Array<Tags>
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate
}

/** columns and relationships of "categories" */
export type CategoriesTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

/** columns and relationships of "categories" */
export type CategoriesTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate'
  aggregate?: Maybe<Categories_Aggregate_Fields>
  nodes: Array<Categories>
}

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Categories_Max_Fields>
  min?: Maybe<Categories_Min_Fields>
}

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Categories_Bool_Exp>>
  _not?: Maybe<Categories_Bool_Exp>
  _or?: Maybe<Array<Categories_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  tags?: Maybe<Tags_Bool_Exp>
}

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey',
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  tags?: Maybe<Tags_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields'
  id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields'
  id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Categories>
}

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint
  update_columns: Array<Categories_Update_Column>
  where?: Maybe<Categories_Bool_Exp>
}

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  id?: Maybe<Order_By>
  tags_aggregate?: Maybe<Tags_Aggregate_Order_By>
}

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  id?: Maybe<Scalars['uuid']>
}

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  Id = 'id',
}

/** columns and relationships of "component_elements" */
export type Component_Elements = {
  __typename?: 'component_elements'
  /** An object relationship */
  atom: Atoms
  atom_id: Scalars['uuid']
  /** An object relationship */
  component: Components
  componentId: Scalars['uuid']
  id: Scalars['uuid']
  label: Scalars['String']
  /** An array relationship */
  sourceLinks: Array<Component_Links>
  /** An aggregate relationship */
  sourceLinks_aggregate: Component_Links_Aggregate
  /** An array relationship */
  targetLinks: Array<Component_Links>
  /** An aggregate relationship */
  targetLinks_aggregate: Component_Links_Aggregate
}

/** columns and relationships of "component_elements" */
export type Component_ElementsSourceLinksArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** columns and relationships of "component_elements" */
export type Component_ElementsSourceLinks_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** columns and relationships of "component_elements" */
export type Component_ElementsTargetLinksArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** columns and relationships of "component_elements" */
export type Component_ElementsTargetLinks_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** aggregated selection of "component_elements" */
export type Component_Elements_Aggregate = {
  __typename?: 'component_elements_aggregate'
  aggregate?: Maybe<Component_Elements_Aggregate_Fields>
  nodes: Array<Component_Elements>
}

/** aggregate fields of "component_elements" */
export type Component_Elements_Aggregate_Fields = {
  __typename?: 'component_elements_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Component_Elements_Max_Fields>
  min?: Maybe<Component_Elements_Min_Fields>
}

/** aggregate fields of "component_elements" */
export type Component_Elements_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Elements_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "component_elements" */
export type Component_Elements_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Component_Elements_Max_Order_By>
  min?: Maybe<Component_Elements_Min_Order_By>
}

/** input type for inserting array relation for remote table "component_elements" */
export type Component_Elements_Arr_Rel_Insert_Input = {
  data: Array<Component_Elements_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Component_Elements_On_Conflict>
}

/** Boolean expression to filter rows from the table "component_elements". All fields are combined with a logical 'AND'. */
export type Component_Elements_Bool_Exp = {
  _and?: Maybe<Array<Component_Elements_Bool_Exp>>
  _not?: Maybe<Component_Elements_Bool_Exp>
  _or?: Maybe<Array<Component_Elements_Bool_Exp>>
  atom?: Maybe<Atoms_Bool_Exp>
  atom_id?: Maybe<Uuid_Comparison_Exp>
  component?: Maybe<Components_Bool_Exp>
  componentId?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
  sourceLinks?: Maybe<Component_Links_Bool_Exp>
  targetLinks?: Maybe<Component_Links_Bool_Exp>
}

/** unique or primary key constraints on table "component_elements" */
export enum Component_Elements_Constraint {
  /** unique or primary key constraint */
  ComponentElementsPkey = 'component_elements_pkey',
}

/** input type for inserting data into table "component_elements" */
export type Component_Elements_Insert_Input = {
  atom?: Maybe<Atoms_Obj_Rel_Insert_Input>
  atom_id?: Maybe<Scalars['uuid']>
  component?: Maybe<Components_Obj_Rel_Insert_Input>
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  sourceLinks?: Maybe<Component_Links_Arr_Rel_Insert_Input>
  targetLinks?: Maybe<Component_Links_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Component_Elements_Max_Fields = {
  __typename?: 'component_elements_max_fields'
  atom_id?: Maybe<Scalars['uuid']>
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "component_elements" */
export type Component_Elements_Max_Order_By = {
  atom_id?: Maybe<Order_By>
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Component_Elements_Min_Fields = {
  __typename?: 'component_elements_min_fields'
  atom_id?: Maybe<Scalars['uuid']>
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "component_elements" */
export type Component_Elements_Min_Order_By = {
  atom_id?: Maybe<Order_By>
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** response of any mutation on the table "component_elements" */
export type Component_Elements_Mutation_Response = {
  __typename?: 'component_elements_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Component_Elements>
}

/** input type for inserting object relation for remote table "component_elements" */
export type Component_Elements_Obj_Rel_Insert_Input = {
  data: Component_Elements_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Component_Elements_On_Conflict>
}

/** on conflict condition type for table "component_elements" */
export type Component_Elements_On_Conflict = {
  constraint: Component_Elements_Constraint
  update_columns: Array<Component_Elements_Update_Column>
  where?: Maybe<Component_Elements_Bool_Exp>
}

/** Ordering options when selecting data from "component_elements". */
export type Component_Elements_Order_By = {
  atom?: Maybe<Atoms_Order_By>
  atom_id?: Maybe<Order_By>
  component?: Maybe<Components_Order_By>
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  sourceLinks_aggregate?: Maybe<Component_Links_Aggregate_Order_By>
  targetLinks_aggregate?: Maybe<Component_Links_Aggregate_Order_By>
}

/** primary key columns input for table: component_elements */
export type Component_Elements_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "component_elements" */
export enum Component_Elements_Select_Column {
  /** column name */
  AtomId = 'atom_id',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "component_elements" */
export type Component_Elements_Set_Input = {
  atom_id?: Maybe<Scalars['uuid']>
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** update columns of table "component_elements" */
export enum Component_Elements_Update_Column {
  /** column name */
  AtomId = 'atom_id',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** columns and relationships of "component_links" */
export type Component_Links = {
  __typename?: 'component_links'
  /** An object relationship */
  category?: Maybe<Categories>
  category_id?: Maybe<Scalars['uuid']>
  /** An object relationship */
  component: Components
  component_id: Scalars['uuid']
  id: Scalars['uuid']
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  /** An object relationship */
  sourceElement: Component_Elements
  sourceElementId: Scalars['uuid']
  /** An object relationship */
  targetElement?: Maybe<Component_Elements>
  targetElementId?: Maybe<Scalars['uuid']>
}

/** columns and relationships of "component_links" */
export type Component_LinksPropsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "component_links" */
export type Component_Links_Aggregate = {
  __typename?: 'component_links_aggregate'
  aggregate?: Maybe<Component_Links_Aggregate_Fields>
  nodes: Array<Component_Links>
}

/** aggregate fields of "component_links" */
export type Component_Links_Aggregate_Fields = {
  __typename?: 'component_links_aggregate_fields'
  avg?: Maybe<Component_Links_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Component_Links_Max_Fields>
  min?: Maybe<Component_Links_Min_Fields>
  stddev?: Maybe<Component_Links_Stddev_Fields>
  stddev_pop?: Maybe<Component_Links_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Component_Links_Stddev_Samp_Fields>
  sum?: Maybe<Component_Links_Sum_Fields>
  var_pop?: Maybe<Component_Links_Var_Pop_Fields>
  var_samp?: Maybe<Component_Links_Var_Samp_Fields>
  variance?: Maybe<Component_Links_Variance_Fields>
}

/** aggregate fields of "component_links" */
export type Component_Links_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Links_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "component_links" */
export type Component_Links_Aggregate_Order_By = {
  avg?: Maybe<Component_Links_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Component_Links_Max_Order_By>
  min?: Maybe<Component_Links_Min_Order_By>
  stddev?: Maybe<Component_Links_Stddev_Order_By>
  stddev_pop?: Maybe<Component_Links_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Component_Links_Stddev_Samp_Order_By>
  sum?: Maybe<Component_Links_Sum_Order_By>
  var_pop?: Maybe<Component_Links_Var_Pop_Order_By>
  var_samp?: Maybe<Component_Links_Var_Samp_Order_By>
  variance?: Maybe<Component_Links_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Component_Links_Append_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "component_links" */
export type Component_Links_Arr_Rel_Insert_Input = {
  data: Array<Component_Links_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Component_Links_On_Conflict>
}

/** aggregate avg on columns */
export type Component_Links_Avg_Fields = {
  __typename?: 'component_links_avg_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "component_links" */
export type Component_Links_Avg_Order_By = {
  order?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "component_links". All fields are combined with a logical 'AND'. */
export type Component_Links_Bool_Exp = {
  _and?: Maybe<Array<Component_Links_Bool_Exp>>
  _not?: Maybe<Component_Links_Bool_Exp>
  _or?: Maybe<Array<Component_Links_Bool_Exp>>
  category?: Maybe<Categories_Bool_Exp>
  category_id?: Maybe<Uuid_Comparison_Exp>
  component?: Maybe<Components_Bool_Exp>
  component_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  order?: Maybe<Int_Comparison_Exp>
  props?: Maybe<Jsonb_Comparison_Exp>
  sourceElement?: Maybe<Component_Elements_Bool_Exp>
  sourceElementId?: Maybe<Uuid_Comparison_Exp>
  targetElement?: Maybe<Component_Elements_Bool_Exp>
  targetElementId?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "component_links" */
export enum Component_Links_Constraint {
  /** unique or primary key constraint */
  VertexEdgeTypePkey = 'vertex_edge_type_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Component_Links_Delete_At_Path_Input = {
  props?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Component_Links_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Component_Links_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "component_links" */
export type Component_Links_Inc_Input = {
  order?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "component_links" */
export type Component_Links_Insert_Input = {
  category?: Maybe<Categories_Obj_Rel_Insert_Input>
  category_id?: Maybe<Scalars['uuid']>
  component?: Maybe<Components_Obj_Rel_Insert_Input>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  sourceElement?: Maybe<Component_Elements_Obj_Rel_Insert_Input>
  sourceElementId?: Maybe<Scalars['uuid']>
  targetElement?: Maybe<Component_Elements_Obj_Rel_Insert_Input>
  targetElementId?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Component_Links_Max_Fields = {
  __typename?: 'component_links_max_fields'
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  sourceElementId?: Maybe<Scalars['uuid']>
  targetElementId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "component_links" */
export type Component_Links_Max_Order_By = {
  category_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  sourceElementId?: Maybe<Order_By>
  targetElementId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Component_Links_Min_Fields = {
  __typename?: 'component_links_min_fields'
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  sourceElementId?: Maybe<Scalars['uuid']>
  targetElementId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "component_links" */
export type Component_Links_Min_Order_By = {
  category_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  sourceElementId?: Maybe<Order_By>
  targetElementId?: Maybe<Order_By>
}

/** response of any mutation on the table "component_links" */
export type Component_Links_Mutation_Response = {
  __typename?: 'component_links_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Component_Links>
}

/** on conflict condition type for table "component_links" */
export type Component_Links_On_Conflict = {
  constraint: Component_Links_Constraint
  update_columns: Array<Component_Links_Update_Column>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** Ordering options when selecting data from "component_links". */
export type Component_Links_Order_By = {
  category?: Maybe<Categories_Order_By>
  category_id?: Maybe<Order_By>
  component?: Maybe<Components_Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  props?: Maybe<Order_By>
  sourceElement?: Maybe<Component_Elements_Order_By>
  sourceElementId?: Maybe<Order_By>
  targetElement?: Maybe<Component_Elements_Order_By>
  targetElementId?: Maybe<Order_By>
}

/** primary key columns input for table: component_links */
export type Component_Links_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Component_Links_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** select columns of table "component_links" */
export enum Component_Links_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'sourceElementId',
  /** column name */
  TargetElementId = 'targetElementId',
}

/** input type for updating data in table "component_links" */
export type Component_Links_Set_Input = {
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  sourceElementId?: Maybe<Scalars['uuid']>
  targetElementId?: Maybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type Component_Links_Stddev_Fields = {
  __typename?: 'component_links_stddev_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "component_links" */
export type Component_Links_Stddev_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Component_Links_Stddev_Pop_Fields = {
  __typename?: 'component_links_stddev_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "component_links" */
export type Component_Links_Stddev_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Component_Links_Stddev_Samp_Fields = {
  __typename?: 'component_links_stddev_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "component_links" */
export type Component_Links_Stddev_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Component_Links_Sum_Fields = {
  __typename?: 'component_links_sum_fields'
  order?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "component_links" */
export type Component_Links_Sum_Order_By = {
  order?: Maybe<Order_By>
}

/** update columns of table "component_links" */
export enum Component_Links_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'sourceElementId',
  /** column name */
  TargetElementId = 'targetElementId',
}

/** aggregate var_pop on columns */
export type Component_Links_Var_Pop_Fields = {
  __typename?: 'component_links_var_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "component_links" */
export type Component_Links_Var_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Component_Links_Var_Samp_Fields = {
  __typename?: 'component_links_var_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "component_links" */
export type Component_Links_Var_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Component_Links_Variance_Fields = {
  __typename?: 'component_links_variance_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "component_links" */
export type Component_Links_Variance_Order_By = {
  order?: Maybe<Order_By>
}

/** columns and relationships of "components" */
export type Components = {
  __typename?: 'components'
  /** fetch data from the table: "component_elements" */
  component_elements: Array<Component_Elements>
  /** An aggregate relationship */
  component_elements_aggregate: Component_Elements_Aggregate
  /** An array relationship */
  component_links: Array<Component_Links>
  /** An aggregate relationship */
  component_links_aggregate: Component_Links_Aggregate
  id: Scalars['uuid']
  label: Scalars['String']
  /** An object relationship */
  library: Libraries
  libraryId: Scalars['uuid']
  /** An array relationship */
  vertices: Array<Atoms>
  /** An aggregate relationship */
  vertices_aggregate: Atoms_Aggregate
}

/** columns and relationships of "components" */
export type ComponentsComponent_ElementsArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

/** columns and relationships of "components" */
export type ComponentsComponent_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

/** columns and relationships of "components" */
export type ComponentsComponent_LinksArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** columns and relationships of "components" */
export type ComponentsComponent_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

/** columns and relationships of "components" */
export type ComponentsVerticesArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

/** columns and relationships of "components" */
export type ComponentsVertices_AggregateArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

/** aggregated selection of "components" */
export type Components_Aggregate = {
  __typename?: 'components_aggregate'
  aggregate?: Maybe<Components_Aggregate_Fields>
  nodes: Array<Components>
}

/** aggregate fields of "components" */
export type Components_Aggregate_Fields = {
  __typename?: 'components_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Components_Max_Fields>
  min?: Maybe<Components_Min_Fields>
}

/** aggregate fields of "components" */
export type Components_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Components_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "components" */
export type Components_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Components_Max_Order_By>
  min?: Maybe<Components_Min_Order_By>
}

/** input type for inserting array relation for remote table "components" */
export type Components_Arr_Rel_Insert_Input = {
  data: Array<Components_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Components_On_Conflict>
}

/** Boolean expression to filter rows from the table "components". All fields are combined with a logical 'AND'. */
export type Components_Bool_Exp = {
  _and?: Maybe<Array<Components_Bool_Exp>>
  _not?: Maybe<Components_Bool_Exp>
  _or?: Maybe<Array<Components_Bool_Exp>>
  component_elements?: Maybe<Component_Elements_Bool_Exp>
  component_links?: Maybe<Component_Links_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
  library?: Maybe<Libraries_Bool_Exp>
  libraryId?: Maybe<Uuid_Comparison_Exp>
  vertices?: Maybe<Atoms_Bool_Exp>
}

/** unique or primary key constraints on table "components" */
export enum Components_Constraint {
  /** unique or primary key constraint */
  ComponentsPkey = 'components_pkey',
}

/** input type for inserting data into table "components" */
export type Components_Insert_Input = {
  component_elements?: Maybe<Component_Elements_Arr_Rel_Insert_Input>
  component_links?: Maybe<Component_Links_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  library?: Maybe<Libraries_Obj_Rel_Insert_Input>
  libraryId?: Maybe<Scalars['uuid']>
  vertices?: Maybe<Atoms_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Components_Max_Fields = {
  __typename?: 'components_max_fields'
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "components" */
export type Components_Max_Order_By = {
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Components_Min_Fields = {
  __typename?: 'components_min_fields'
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "components" */
export type Components_Min_Order_By = {
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
}

/** response of any mutation on the table "components" */
export type Components_Mutation_Response = {
  __typename?: 'components_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Components>
}

/** input type for inserting object relation for remote table "components" */
export type Components_Obj_Rel_Insert_Input = {
  data: Components_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Components_On_Conflict>
}

/** on conflict condition type for table "components" */
export type Components_On_Conflict = {
  constraint: Components_Constraint
  update_columns: Array<Components_Update_Column>
  where?: Maybe<Components_Bool_Exp>
}

/** Ordering options when selecting data from "components". */
export type Components_Order_By = {
  component_elements_aggregate?: Maybe<Component_Elements_Aggregate_Order_By>
  component_links_aggregate?: Maybe<Component_Links_Aggregate_Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  library?: Maybe<Libraries_Order_By>
  libraryId?: Maybe<Order_By>
  vertices_aggregate?: Maybe<Atoms_Aggregate_Order_By>
}

/** primary key columns input for table: components */
export type Components_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "components" */
export enum Components_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  LibraryId = 'libraryId',
}

/** input type for updating data in table "components" */
export type Components_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** update columns of table "components" */
export enum Components_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  LibraryId = 'libraryId',
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>
  _eq?: Maybe<Scalars['jsonb']>
  _gt?: Maybe<Scalars['jsonb']>
  _gte?: Maybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>
  _in?: Maybe<Array<Scalars['jsonb']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['jsonb']>
  _lte?: Maybe<Scalars['jsonb']>
  _neq?: Maybe<Scalars['jsonb']>
  _nin?: Maybe<Array<Scalars['jsonb']>>
}

/** columns and relationships of "lambdas" */
export type Lambdas = {
  __typename?: 'lambdas'
  body: Scalars['String']
  id: Scalars['uuid']
  /** An object relationship */
  library: Libraries
  libraryId: Scalars['uuid']
  name: Scalars['String']
  /** An array relationship */
  prop_values: Array<Prop_Values>
  /** An aggregate relationship */
  prop_values_aggregate: Prop_Values_Aggregate
}

/** columns and relationships of "lambdas" */
export type LambdasProp_ValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** columns and relationships of "lambdas" */
export type LambdasProp_Values_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** aggregated selection of "lambdas" */
export type Lambdas_Aggregate = {
  __typename?: 'lambdas_aggregate'
  aggregate?: Maybe<Lambdas_Aggregate_Fields>
  nodes: Array<Lambdas>
}

/** aggregate fields of "lambdas" */
export type Lambdas_Aggregate_Fields = {
  __typename?: 'lambdas_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Lambdas_Max_Fields>
  min?: Maybe<Lambdas_Min_Fields>
}

/** aggregate fields of "lambdas" */
export type Lambdas_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Lambdas_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "lambdas" */
export type Lambdas_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Lambdas_Max_Order_By>
  min?: Maybe<Lambdas_Min_Order_By>
}

/** input type for inserting array relation for remote table "lambdas" */
export type Lambdas_Arr_Rel_Insert_Input = {
  data: Array<Lambdas_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Lambdas_On_Conflict>
}

/** Boolean expression to filter rows from the table "lambdas". All fields are combined with a logical 'AND'. */
export type Lambdas_Bool_Exp = {
  _and?: Maybe<Array<Lambdas_Bool_Exp>>
  _not?: Maybe<Lambdas_Bool_Exp>
  _or?: Maybe<Array<Lambdas_Bool_Exp>>
  body?: Maybe<String_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  library?: Maybe<Libraries_Bool_Exp>
  libraryId?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  prop_values?: Maybe<Prop_Values_Bool_Exp>
}

/** unique or primary key constraints on table "lambdas" */
export enum Lambdas_Constraint {
  /** unique or primary key constraint */
  LambdasPkey = 'lambdas_pkey',
}

/** input type for inserting data into table "lambdas" */
export type Lambdas_Insert_Input = {
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  library?: Maybe<Libraries_Obj_Rel_Insert_Input>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  prop_values?: Maybe<Prop_Values_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Lambdas_Max_Fields = {
  __typename?: 'lambdas_max_fields'
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "lambdas" */
export type Lambdas_Max_Order_By = {
  body?: Maybe<Order_By>
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Lambdas_Min_Fields = {
  __typename?: 'lambdas_min_fields'
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "lambdas" */
export type Lambdas_Min_Order_By = {
  body?: Maybe<Order_By>
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** response of any mutation on the table "lambdas" */
export type Lambdas_Mutation_Response = {
  __typename?: 'lambdas_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Lambdas>
}

/** input type for inserting object relation for remote table "lambdas" */
export type Lambdas_Obj_Rel_Insert_Input = {
  data: Lambdas_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Lambdas_On_Conflict>
}

/** on conflict condition type for table "lambdas" */
export type Lambdas_On_Conflict = {
  constraint: Lambdas_Constraint
  update_columns: Array<Lambdas_Update_Column>
  where?: Maybe<Lambdas_Bool_Exp>
}

/** Ordering options when selecting data from "lambdas". */
export type Lambdas_Order_By = {
  body?: Maybe<Order_By>
  id?: Maybe<Order_By>
  library?: Maybe<Libraries_Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
  prop_values_aggregate?: Maybe<Prop_Values_Aggregate_Order_By>
}

/** primary key columns input for table: lambdas */
export type Lambdas_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "lambdas" */
export enum Lambdas_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "lambdas" */
export type Lambdas_Set_Input = {
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "lambdas" */
export enum Lambdas_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

/** columns and relationships of "libraries" */
export type Libraries = {
  __typename?: 'libraries'
  /** An array relationship */
  components: Array<Components>
  /** An aggregate relationship */
  components_aggregate: Components_Aggregate
  id: Scalars['uuid']
  /** An array relationship */
  lambdas: Array<Lambdas>
  /** An aggregate relationship */
  lambdas_aggregate: Lambdas_Aggregate
  name?: Maybe<Scalars['String']>
  /** An array relationship */
  props: Array<Props>
  /** An aggregate relationship */
  props_aggregate: Props_Aggregate
  /** An array relationship */
  styles: Array<Styles>
  /** An aggregate relationship */
  styles_aggregate: Styles_Aggregate
  /** An object relationship */
  user: Users
  userId: Scalars['String']
}

/** columns and relationships of "libraries" */
export type LibrariesComponentsArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesComponents_AggregateArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesLambdasArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesLambdas_AggregateArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesPropsArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesProps_AggregateArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesStylesArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

/** columns and relationships of "libraries" */
export type LibrariesStyles_AggregateArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

/** aggregated selection of "libraries" */
export type Libraries_Aggregate = {
  __typename?: 'libraries_aggregate'
  aggregate?: Maybe<Libraries_Aggregate_Fields>
  nodes: Array<Libraries>
}

/** aggregate fields of "libraries" */
export type Libraries_Aggregate_Fields = {
  __typename?: 'libraries_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Libraries_Max_Fields>
  min?: Maybe<Libraries_Min_Fields>
}

/** aggregate fields of "libraries" */
export type Libraries_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Libraries_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "libraries" */
export type Libraries_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Libraries_Max_Order_By>
  min?: Maybe<Libraries_Min_Order_By>
}

/** input type for inserting array relation for remote table "libraries" */
export type Libraries_Arr_Rel_Insert_Input = {
  data: Array<Libraries_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Libraries_On_Conflict>
}

/** Boolean expression to filter rows from the table "libraries". All fields are combined with a logical 'AND'. */
export type Libraries_Bool_Exp = {
  _and?: Maybe<Array<Libraries_Bool_Exp>>
  _not?: Maybe<Libraries_Bool_Exp>
  _or?: Maybe<Array<Libraries_Bool_Exp>>
  components?: Maybe<Components_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  lambdas?: Maybe<Lambdas_Bool_Exp>
  name?: Maybe<String_Comparison_Exp>
  props?: Maybe<Props_Bool_Exp>
  styles?: Maybe<Styles_Bool_Exp>
  user?: Maybe<Users_Bool_Exp>
  userId?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "libraries" */
export enum Libraries_Constraint {
  /** unique or primary key constraint */
  LibrariesPkey = 'libraries_pkey',
}

/** input type for inserting data into table "libraries" */
export type Libraries_Insert_Input = {
  components?: Maybe<Components_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  lambdas?: Maybe<Lambdas_Arr_Rel_Insert_Input>
  name?: Maybe<Scalars['String']>
  props?: Maybe<Props_Arr_Rel_Insert_Input>
  styles?: Maybe<Styles_Arr_Rel_Insert_Input>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  userId?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Libraries_Max_Fields = {
  __typename?: 'libraries_max_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "libraries" */
export type Libraries_Max_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  userId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Libraries_Min_Fields = {
  __typename?: 'libraries_min_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "libraries" */
export type Libraries_Min_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  userId?: Maybe<Order_By>
}

/** response of any mutation on the table "libraries" */
export type Libraries_Mutation_Response = {
  __typename?: 'libraries_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Libraries>
}

/** input type for inserting object relation for remote table "libraries" */
export type Libraries_Obj_Rel_Insert_Input = {
  data: Libraries_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Libraries_On_Conflict>
}

/** on conflict condition type for table "libraries" */
export type Libraries_On_Conflict = {
  constraint: Libraries_Constraint
  update_columns: Array<Libraries_Update_Column>
  where?: Maybe<Libraries_Bool_Exp>
}

/** Ordering options when selecting data from "libraries". */
export type Libraries_Order_By = {
  components_aggregate?: Maybe<Components_Aggregate_Order_By>
  id?: Maybe<Order_By>
  lambdas_aggregate?: Maybe<Lambdas_Aggregate_Order_By>
  name?: Maybe<Order_By>
  props_aggregate?: Maybe<Props_Aggregate_Order_By>
  styles_aggregate?: Maybe<Styles_Aggregate_Order_By>
  user?: Maybe<Users_Order_By>
  userId?: Maybe<Order_By>
}

/** primary key columns input for table: libraries */
export type Libraries_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "libraries" */
export enum Libraries_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
}

/** input type for updating data in table "libraries" */
export type Libraries_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

/** update columns of table "libraries" */
export enum Libraries_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "apps" */
  delete_apps?: Maybe<Apps_Mutation_Response>
  /** delete single row from the table: "apps" */
  delete_apps_by_pk?: Maybe<Apps>
  /** delete data from the table: "atom_types" */
  delete_atom_types?: Maybe<Atom_Types_Mutation_Response>
  /** delete single row from the table: "atom_types" */
  delete_atom_types_by_pk?: Maybe<Atom_Types>
  /** delete data from the table: "atoms" */
  delete_atoms?: Maybe<Atoms_Mutation_Response>
  /** delete single row from the table: "atoms" */
  delete_atoms_by_pk?: Maybe<Atoms>
  /** delete data from the table: "attributes" */
  delete_attributes?: Maybe<Attributes_Mutation_Response>
  /** delete single row from the table: "attributes" */
  delete_attributes_by_pk?: Maybe<Attributes>
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>
  /** delete data from the table: "component_elements" */
  delete_component_elements?: Maybe<Component_Elements_Mutation_Response>
  /** delete single row from the table: "component_elements" */
  delete_component_elements_by_pk?: Maybe<Component_Elements>
  /** delete data from the table: "component_links" */
  delete_component_links?: Maybe<Component_Links_Mutation_Response>
  /** delete single row from the table: "component_links" */
  delete_component_links_by_pk?: Maybe<Component_Links>
  /** delete data from the table: "components" */
  delete_components?: Maybe<Components_Mutation_Response>
  /** delete single row from the table: "components" */
  delete_components_by_pk?: Maybe<Components>
  /** delete data from the table: "lambdas" */
  delete_lambdas?: Maybe<Lambdas_Mutation_Response>
  /** delete single row from the table: "lambdas" */
  delete_lambdas_by_pk?: Maybe<Lambdas>
  /** delete data from the table: "libraries" */
  delete_libraries?: Maybe<Libraries_Mutation_Response>
  /** delete single row from the table: "libraries" */
  delete_libraries_by_pk?: Maybe<Libraries>
  /** delete data from the table: "page_elements" */
  delete_page_elements?: Maybe<Page_Elements_Mutation_Response>
  /** delete single row from the table: "page_elements" */
  delete_page_elements_by_pk?: Maybe<Page_Elements>
  /** delete data from the table: "page_links" */
  delete_page_links?: Maybe<Page_Links_Mutation_Response>
  /** delete single row from the table: "page_links" */
  delete_page_links_by_pk?: Maybe<Page_Links>
  /** delete data from the table: "pages" */
  delete_pages?: Maybe<Pages_Mutation_Response>
  /** delete single row from the table: "pages" */
  delete_pages_by_pk?: Maybe<Pages>
  /** delete data from the table: "prop_element" */
  delete_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** delete single row from the table: "prop_element" */
  delete_prop_element_by_pk?: Maybe<Prop_Element>
  /** delete data from the table: "prop_value_tag" */
  delete_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** delete single row from the table: "prop_value_tag" */
  delete_prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** delete data from the table: "prop_value_types" */
  delete_prop_value_types?: Maybe<Prop_Value_Types_Mutation_Response>
  /** delete single row from the table: "prop_value_types" */
  delete_prop_value_types_by_pk?: Maybe<Prop_Value_Types>
  /** delete data from the table: "prop_values" */
  delete_prop_values?: Maybe<Prop_Values_Mutation_Response>
  /** delete single row from the table: "prop_values" */
  delete_prop_values_by_pk?: Maybe<Prop_Values>
  /** delete data from the table: "props" */
  delete_props?: Maybe<Props_Mutation_Response>
  /** delete single row from the table: "props" */
  delete_props_by_pk?: Maybe<Props>
  /** delete data from the table: "styles" */
  delete_styles?: Maybe<Styles_Mutation_Response>
  /** delete single row from the table: "styles" */
  delete_styles_by_pk?: Maybe<Styles>
  /** delete data from the table: "tags" */
  delete_tags?: Maybe<Tags_Mutation_Response>
  /** delete single row from the table: "tags" */
  delete_tags_by_pk?: Maybe<Tags>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert data into the table: "apps" */
  insert_apps?: Maybe<Apps_Mutation_Response>
  /** insert a single row into the table: "apps" */
  insert_apps_one?: Maybe<Apps>
  /** insert data into the table: "atom_types" */
  insert_atom_types?: Maybe<Atom_Types_Mutation_Response>
  /** insert a single row into the table: "atom_types" */
  insert_atom_types_one?: Maybe<Atom_Types>
  /** insert data into the table: "atoms" */
  insert_atoms?: Maybe<Atoms_Mutation_Response>
  /** insert a single row into the table: "atoms" */
  insert_atoms_one?: Maybe<Atoms>
  /** insert data into the table: "attributes" */
  insert_attributes?: Maybe<Attributes_Mutation_Response>
  /** insert a single row into the table: "attributes" */
  insert_attributes_one?: Maybe<Attributes>
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>
  /** insert data into the table: "component_elements" */
  insert_component_elements?: Maybe<Component_Elements_Mutation_Response>
  /** insert a single row into the table: "component_elements" */
  insert_component_elements_one?: Maybe<Component_Elements>
  /** insert data into the table: "component_links" */
  insert_component_links?: Maybe<Component_Links_Mutation_Response>
  /** insert a single row into the table: "component_links" */
  insert_component_links_one?: Maybe<Component_Links>
  /** insert data into the table: "components" */
  insert_components?: Maybe<Components_Mutation_Response>
  /** insert a single row into the table: "components" */
  insert_components_one?: Maybe<Components>
  /** insert data into the table: "lambdas" */
  insert_lambdas?: Maybe<Lambdas_Mutation_Response>
  /** insert a single row into the table: "lambdas" */
  insert_lambdas_one?: Maybe<Lambdas>
  /** insert data into the table: "libraries" */
  insert_libraries?: Maybe<Libraries_Mutation_Response>
  /** insert a single row into the table: "libraries" */
  insert_libraries_one?: Maybe<Libraries>
  /** insert data into the table: "page_elements" */
  insert_page_elements?: Maybe<Page_Elements_Mutation_Response>
  /** insert a single row into the table: "page_elements" */
  insert_page_elements_one?: Maybe<Page_Elements>
  /** insert data into the table: "page_links" */
  insert_page_links?: Maybe<Page_Links_Mutation_Response>
  /** insert a single row into the table: "page_links" */
  insert_page_links_one?: Maybe<Page_Links>
  /** insert data into the table: "pages" */
  insert_pages?: Maybe<Pages_Mutation_Response>
  /** insert a single row into the table: "pages" */
  insert_pages_one?: Maybe<Pages>
  /** insert data into the table: "prop_element" */
  insert_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** insert a single row into the table: "prop_element" */
  insert_prop_element_one?: Maybe<Prop_Element>
  /** insert data into the table: "prop_value_tag" */
  insert_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** insert a single row into the table: "prop_value_tag" */
  insert_prop_value_tag_one?: Maybe<Prop_Value_Tag>
  /** insert data into the table: "prop_value_types" */
  insert_prop_value_types?: Maybe<Prop_Value_Types_Mutation_Response>
  /** insert a single row into the table: "prop_value_types" */
  insert_prop_value_types_one?: Maybe<Prop_Value_Types>
  /** insert data into the table: "prop_values" */
  insert_prop_values?: Maybe<Prop_Values_Mutation_Response>
  /** insert a single row into the table: "prop_values" */
  insert_prop_values_one?: Maybe<Prop_Values>
  /** insert data into the table: "props" */
  insert_props?: Maybe<Props_Mutation_Response>
  /** insert a single row into the table: "props" */
  insert_props_one?: Maybe<Props>
  /** insert data into the table: "styles" */
  insert_styles?: Maybe<Styles_Mutation_Response>
  /** insert a single row into the table: "styles" */
  insert_styles_one?: Maybe<Styles>
  /** insert data into the table: "tags" */
  insert_tags?: Maybe<Tags_Mutation_Response>
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update data of the table: "apps" */
  update_apps?: Maybe<Apps_Mutation_Response>
  /** update single row of the table: "apps" */
  update_apps_by_pk?: Maybe<Apps>
  /** update data of the table: "atom_types" */
  update_atom_types?: Maybe<Atom_Types_Mutation_Response>
  /** update single row of the table: "atom_types" */
  update_atom_types_by_pk?: Maybe<Atom_Types>
  /** update data of the table: "atoms" */
  update_atoms?: Maybe<Atoms_Mutation_Response>
  /** update single row of the table: "atoms" */
  update_atoms_by_pk?: Maybe<Atoms>
  /** update data of the table: "attributes" */
  update_attributes?: Maybe<Attributes_Mutation_Response>
  /** update single row of the table: "attributes" */
  update_attributes_by_pk?: Maybe<Attributes>
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>
  /** update data of the table: "component_elements" */
  update_component_elements?: Maybe<Component_Elements_Mutation_Response>
  /** update single row of the table: "component_elements" */
  update_component_elements_by_pk?: Maybe<Component_Elements>
  /** update data of the table: "component_links" */
  update_component_links?: Maybe<Component_Links_Mutation_Response>
  /** update single row of the table: "component_links" */
  update_component_links_by_pk?: Maybe<Component_Links>
  /** update data of the table: "components" */
  update_components?: Maybe<Components_Mutation_Response>
  /** update single row of the table: "components" */
  update_components_by_pk?: Maybe<Components>
  /** update data of the table: "lambdas" */
  update_lambdas?: Maybe<Lambdas_Mutation_Response>
  /** update single row of the table: "lambdas" */
  update_lambdas_by_pk?: Maybe<Lambdas>
  /** update data of the table: "libraries" */
  update_libraries?: Maybe<Libraries_Mutation_Response>
  /** update single row of the table: "libraries" */
  update_libraries_by_pk?: Maybe<Libraries>
  /** update data of the table: "page_elements" */
  update_page_elements?: Maybe<Page_Elements_Mutation_Response>
  /** update single row of the table: "page_elements" */
  update_page_elements_by_pk?: Maybe<Page_Elements>
  /** update data of the table: "page_links" */
  update_page_links?: Maybe<Page_Links_Mutation_Response>
  /** update single row of the table: "page_links" */
  update_page_links_by_pk?: Maybe<Page_Links>
  /** update data of the table: "pages" */
  update_pages?: Maybe<Pages_Mutation_Response>
  /** update single row of the table: "pages" */
  update_pages_by_pk?: Maybe<Pages>
  /** update data of the table: "prop_element" */
  update_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** update single row of the table: "prop_element" */
  update_prop_element_by_pk?: Maybe<Prop_Element>
  /** update data of the table: "prop_value_tag" */
  update_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** update single row of the table: "prop_value_tag" */
  update_prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** update data of the table: "prop_value_types" */
  update_prop_value_types?: Maybe<Prop_Value_Types_Mutation_Response>
  /** update single row of the table: "prop_value_types" */
  update_prop_value_types_by_pk?: Maybe<Prop_Value_Types>
  /** update data of the table: "prop_values" */
  update_prop_values?: Maybe<Prop_Values_Mutation_Response>
  /** update single row of the table: "prop_values" */
  update_prop_values_by_pk?: Maybe<Prop_Values>
  /** update data of the table: "props" */
  update_props?: Maybe<Props_Mutation_Response>
  /** update single row of the table: "props" */
  update_props_by_pk?: Maybe<Props>
  /** update data of the table: "styles" */
  update_styles?: Maybe<Styles_Mutation_Response>
  /** update single row of the table: "styles" */
  update_styles_by_pk?: Maybe<Styles>
  /** update data of the table: "tags" */
  update_tags?: Maybe<Tags_Mutation_Response>
  /** update single row of the table: "tags" */
  update_tags_by_pk?: Maybe<Tags>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
}

/** mutation root */
export type Mutation_RootDelete_AppsArgs = {
  where: Apps_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Apps_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Atom_TypesArgs = {
  where: Atom_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Atom_Types_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_AtomsArgs = {
  where: Atoms_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Atoms_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_AttributesArgs = {
  where: Attributes_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Attributes_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Component_ElementsArgs = {
  where: Component_Elements_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Component_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Component_LinksArgs = {
  where: Component_Links_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Component_Links_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_ComponentsArgs = {
  where: Components_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Components_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_LambdasArgs = {
  where: Lambdas_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Lambdas_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_LibrariesArgs = {
  where: Libraries_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Libraries_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Page_ElementsArgs = {
  where: Page_Elements_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Page_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Page_LinksArgs = {
  where: Page_Links_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Page_Links_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_PagesArgs = {
  where: Pages_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Pages_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_ElementArgs = {
  where: Prop_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_TagArgs = {
  where: Prop_Value_Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_TypesArgs = {
  where: Prop_Value_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_Types_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Prop_ValuesArgs = {
  where: Prop_Values_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Values_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_PropsArgs = {
  where: Props_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Props_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_StylesArgs = {
  where: Styles_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Styles_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_TagsArgs = {
  where: Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tags_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_AppsArgs = {
  objects: Array<Apps_Insert_Input>
  on_conflict?: Maybe<Apps_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Apps_OneArgs = {
  object: Apps_Insert_Input
  on_conflict?: Maybe<Apps_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atom_TypesArgs = {
  objects: Array<Atom_Types_Insert_Input>
  on_conflict?: Maybe<Atom_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atom_Types_OneArgs = {
  object: Atom_Types_Insert_Input
  on_conflict?: Maybe<Atom_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_AtomsArgs = {
  objects: Array<Atoms_Insert_Input>
  on_conflict?: Maybe<Atoms_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atoms_OneArgs = {
  object: Atoms_Insert_Input
  on_conflict?: Maybe<Atoms_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_AttributesArgs = {
  objects: Array<Attributes_Insert_Input>
  on_conflict?: Maybe<Attributes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Attributes_OneArgs = {
  object: Attributes_Insert_Input
  on_conflict?: Maybe<Attributes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_ElementsArgs = {
  objects: Array<Component_Elements_Insert_Input>
  on_conflict?: Maybe<Component_Elements_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_Elements_OneArgs = {
  object: Component_Elements_Insert_Input
  on_conflict?: Maybe<Component_Elements_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_LinksArgs = {
  objects: Array<Component_Links_Insert_Input>
  on_conflict?: Maybe<Component_Links_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_Links_OneArgs = {
  object: Component_Links_Insert_Input
  on_conflict?: Maybe<Component_Links_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ComponentsArgs = {
  objects: Array<Components_Insert_Input>
  on_conflict?: Maybe<Components_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Components_OneArgs = {
  object: Components_Insert_Input
  on_conflict?: Maybe<Components_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LambdasArgs = {
  objects: Array<Lambdas_Insert_Input>
  on_conflict?: Maybe<Lambdas_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Lambdas_OneArgs = {
  object: Lambdas_Insert_Input
  on_conflict?: Maybe<Lambdas_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LibrariesArgs = {
  objects: Array<Libraries_Insert_Input>
  on_conflict?: Maybe<Libraries_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Libraries_OneArgs = {
  object: Libraries_Insert_Input
  on_conflict?: Maybe<Libraries_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_ElementsArgs = {
  objects: Array<Page_Elements_Insert_Input>
  on_conflict?: Maybe<Page_Elements_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_Elements_OneArgs = {
  object: Page_Elements_Insert_Input
  on_conflict?: Maybe<Page_Elements_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_LinksArgs = {
  objects: Array<Page_Links_Insert_Input>
  on_conflict?: Maybe<Page_Links_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_Links_OneArgs = {
  object: Page_Links_Insert_Input
  on_conflict?: Maybe<Page_Links_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_PagesArgs = {
  objects: Array<Pages_Insert_Input>
  on_conflict?: Maybe<Pages_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Pages_OneArgs = {
  object: Pages_Insert_Input
  on_conflict?: Maybe<Pages_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_ElementArgs = {
  objects: Array<Prop_Element_Insert_Input>
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Element_OneArgs = {
  object: Prop_Element_Insert_Input
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_TagArgs = {
  objects: Array<Prop_Value_Tag_Insert_Input>
  on_conflict?: Maybe<Prop_Value_Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_Tag_OneArgs = {
  object: Prop_Value_Tag_Insert_Input
  on_conflict?: Maybe<Prop_Value_Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_TypesArgs = {
  objects: Array<Prop_Value_Types_Insert_Input>
  on_conflict?: Maybe<Prop_Value_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_Types_OneArgs = {
  object: Prop_Value_Types_Insert_Input
  on_conflict?: Maybe<Prop_Value_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_ValuesArgs = {
  objects: Array<Prop_Values_Insert_Input>
  on_conflict?: Maybe<Prop_Values_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Values_OneArgs = {
  object: Prop_Values_Insert_Input
  on_conflict?: Maybe<Prop_Values_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_PropsArgs = {
  objects: Array<Props_Insert_Input>
  on_conflict?: Maybe<Props_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Props_OneArgs = {
  object: Props_Insert_Input
  on_conflict?: Maybe<Props_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_StylesArgs = {
  objects: Array<Styles_Insert_Input>
  on_conflict?: Maybe<Styles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Styles_OneArgs = {
  object: Styles_Insert_Input
  on_conflict?: Maybe<Styles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
  objects: Array<Tags_Insert_Input>
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
  object: Tags_Insert_Input
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_AppsArgs = {
  _set?: Maybe<Apps_Set_Input>
  where: Apps_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Apps_By_PkArgs = {
  _set?: Maybe<Apps_Set_Input>
  pk_columns: Apps_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Atom_TypesArgs = {
  _set?: Maybe<Atom_Types_Set_Input>
  where: Atom_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Atom_Types_By_PkArgs = {
  _set?: Maybe<Atom_Types_Set_Input>
  pk_columns: Atom_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_AtomsArgs = {
  _set?: Maybe<Atoms_Set_Input>
  where: Atoms_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Atoms_By_PkArgs = {
  _set?: Maybe<Atoms_Set_Input>
  pk_columns: Atoms_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_AttributesArgs = {
  _set?: Maybe<Attributes_Set_Input>
  where: Attributes_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Attributes_By_PkArgs = {
  _set?: Maybe<Attributes_Set_Input>
  pk_columns: Attributes_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: Maybe<Categories_Set_Input>
  where: Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: Maybe<Categories_Set_Input>
  pk_columns: Categories_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Component_ElementsArgs = {
  _set?: Maybe<Component_Elements_Set_Input>
  where: Component_Elements_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Component_Elements_By_PkArgs = {
  _set?: Maybe<Component_Elements_Set_Input>
  pk_columns: Component_Elements_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Component_LinksArgs = {
  _append?: Maybe<Component_Links_Append_Input>
  _delete_at_path?: Maybe<Component_Links_Delete_At_Path_Input>
  _delete_elem?: Maybe<Component_Links_Delete_Elem_Input>
  _delete_key?: Maybe<Component_Links_Delete_Key_Input>
  _inc?: Maybe<Component_Links_Inc_Input>
  _prepend?: Maybe<Component_Links_Prepend_Input>
  _set?: Maybe<Component_Links_Set_Input>
  where: Component_Links_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Component_Links_By_PkArgs = {
  _append?: Maybe<Component_Links_Append_Input>
  _delete_at_path?: Maybe<Component_Links_Delete_At_Path_Input>
  _delete_elem?: Maybe<Component_Links_Delete_Elem_Input>
  _delete_key?: Maybe<Component_Links_Delete_Key_Input>
  _inc?: Maybe<Component_Links_Inc_Input>
  _prepend?: Maybe<Component_Links_Prepend_Input>
  _set?: Maybe<Component_Links_Set_Input>
  pk_columns: Component_Links_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_ComponentsArgs = {
  _set?: Maybe<Components_Set_Input>
  where: Components_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Components_By_PkArgs = {
  _set?: Maybe<Components_Set_Input>
  pk_columns: Components_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LambdasArgs = {
  _set?: Maybe<Lambdas_Set_Input>
  where: Lambdas_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Lambdas_By_PkArgs = {
  _set?: Maybe<Lambdas_Set_Input>
  pk_columns: Lambdas_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LibrariesArgs = {
  _set?: Maybe<Libraries_Set_Input>
  where: Libraries_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Libraries_By_PkArgs = {
  _set?: Maybe<Libraries_Set_Input>
  pk_columns: Libraries_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Page_ElementsArgs = {
  _set?: Maybe<Page_Elements_Set_Input>
  where: Page_Elements_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Page_Elements_By_PkArgs = {
  _set?: Maybe<Page_Elements_Set_Input>
  pk_columns: Page_Elements_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Page_LinksArgs = {
  _append?: Maybe<Page_Links_Append_Input>
  _delete_at_path?: Maybe<Page_Links_Delete_At_Path_Input>
  _delete_elem?: Maybe<Page_Links_Delete_Elem_Input>
  _delete_key?: Maybe<Page_Links_Delete_Key_Input>
  _inc?: Maybe<Page_Links_Inc_Input>
  _prepend?: Maybe<Page_Links_Prepend_Input>
  _set?: Maybe<Page_Links_Set_Input>
  where: Page_Links_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Page_Links_By_PkArgs = {
  _append?: Maybe<Page_Links_Append_Input>
  _delete_at_path?: Maybe<Page_Links_Delete_At_Path_Input>
  _delete_elem?: Maybe<Page_Links_Delete_Elem_Input>
  _delete_key?: Maybe<Page_Links_Delete_Key_Input>
  _inc?: Maybe<Page_Links_Inc_Input>
  _prepend?: Maybe<Page_Links_Prepend_Input>
  _set?: Maybe<Page_Links_Set_Input>
  pk_columns: Page_Links_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PagesArgs = {
  _set?: Maybe<Pages_Set_Input>
  where: Pages_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Pages_By_PkArgs = {
  _set?: Maybe<Pages_Set_Input>
  pk_columns: Pages_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_ElementArgs = {
  _set?: Maybe<Prop_Element_Set_Input>
  where: Prop_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Element_By_PkArgs = {
  _set?: Maybe<Prop_Element_Set_Input>
  pk_columns: Prop_Element_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_TagArgs = {
  _set?: Maybe<Prop_Value_Tag_Set_Input>
  where: Prop_Value_Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_Tag_By_PkArgs = {
  _set?: Maybe<Prop_Value_Tag_Set_Input>
  pk_columns: Prop_Value_Tag_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_TypesArgs = {
  _set?: Maybe<Prop_Value_Types_Set_Input>
  where: Prop_Value_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_Types_By_PkArgs = {
  _set?: Maybe<Prop_Value_Types_Set_Input>
  pk_columns: Prop_Value_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_ValuesArgs = {
  _set?: Maybe<Prop_Values_Set_Input>
  where: Prop_Values_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Values_By_PkArgs = {
  _set?: Maybe<Prop_Values_Set_Input>
  pk_columns: Prop_Values_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PropsArgs = {
  _set?: Maybe<Props_Set_Input>
  where: Props_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Props_By_PkArgs = {
  _set?: Maybe<Props_Set_Input>
  pk_columns: Props_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_StylesArgs = {
  _set?: Maybe<Styles_Set_Input>
  where: Styles_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Styles_By_PkArgs = {
  _set?: Maybe<Styles_Set_Input>
  pk_columns: Styles_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_TagsArgs = {
  _set?: Maybe<Tags_Set_Input>
  where: Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tags_By_PkArgs = {
  _set?: Maybe<Tags_Set_Input>
  pk_columns: Tags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "page_elements" */
export type Page_Elements = {
  __typename?: 'page_elements'
  /** An object relationship */
  component: Components
  componentId: Scalars['uuid']
  id: Scalars['uuid']
  name?: Maybe<Scalars['String']>
  /** An object relationship */
  page: Pages
  pageId: Scalars['uuid']
  /** An array relationship */
  props: Array<Prop_Element>
  /** An aggregate relationship */
  props_aggregate: Prop_Element_Aggregate
}

/** columns and relationships of "page_elements" */
export type Page_ElementsPropsArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** columns and relationships of "page_elements" */
export type Page_ElementsProps_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** aggregated selection of "page_elements" */
export type Page_Elements_Aggregate = {
  __typename?: 'page_elements_aggregate'
  aggregate?: Maybe<Page_Elements_Aggregate_Fields>
  nodes: Array<Page_Elements>
}

/** aggregate fields of "page_elements" */
export type Page_Elements_Aggregate_Fields = {
  __typename?: 'page_elements_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Page_Elements_Max_Fields>
  min?: Maybe<Page_Elements_Min_Fields>
}

/** aggregate fields of "page_elements" */
export type Page_Elements_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Elements_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "page_elements" */
export type Page_Elements_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Page_Elements_Max_Order_By>
  min?: Maybe<Page_Elements_Min_Order_By>
}

/** input type for inserting array relation for remote table "page_elements" */
export type Page_Elements_Arr_Rel_Insert_Input = {
  data: Array<Page_Elements_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Page_Elements_On_Conflict>
}

/** Boolean expression to filter rows from the table "page_elements". All fields are combined with a logical 'AND'. */
export type Page_Elements_Bool_Exp = {
  _and?: Maybe<Array<Page_Elements_Bool_Exp>>
  _not?: Maybe<Page_Elements_Bool_Exp>
  _or?: Maybe<Array<Page_Elements_Bool_Exp>>
  component?: Maybe<Components_Bool_Exp>
  componentId?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  page?: Maybe<Pages_Bool_Exp>
  pageId?: Maybe<Uuid_Comparison_Exp>
  props?: Maybe<Prop_Element_Bool_Exp>
}

/** unique or primary key constraints on table "page_elements" */
export enum Page_Elements_Constraint {
  /** unique or primary key constraint */
  ElementsPkey = 'elements_pkey',
}

/** input type for inserting data into table "page_elements" */
export type Page_Elements_Insert_Input = {
  component?: Maybe<Components_Obj_Rel_Insert_Input>
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  page?: Maybe<Pages_Obj_Rel_Insert_Input>
  pageId?: Maybe<Scalars['uuid']>
  props?: Maybe<Prop_Element_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Page_Elements_Max_Fields = {
  __typename?: 'page_elements_max_fields'
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  pageId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "page_elements" */
export type Page_Elements_Max_Order_By = {
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  pageId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Page_Elements_Min_Fields = {
  __typename?: 'page_elements_min_fields'
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  pageId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "page_elements" */
export type Page_Elements_Min_Order_By = {
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  pageId?: Maybe<Order_By>
}

/** response of any mutation on the table "page_elements" */
export type Page_Elements_Mutation_Response = {
  __typename?: 'page_elements_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Page_Elements>
}

/** input type for inserting object relation for remote table "page_elements" */
export type Page_Elements_Obj_Rel_Insert_Input = {
  data: Page_Elements_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Page_Elements_On_Conflict>
}

/** on conflict condition type for table "page_elements" */
export type Page_Elements_On_Conflict = {
  constraint: Page_Elements_Constraint
  update_columns: Array<Page_Elements_Update_Column>
  where?: Maybe<Page_Elements_Bool_Exp>
}

/** Ordering options when selecting data from "page_elements". */
export type Page_Elements_Order_By = {
  component?: Maybe<Components_Order_By>
  componentId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  page?: Maybe<Pages_Order_By>
  pageId?: Maybe<Order_By>
  props_aggregate?: Maybe<Prop_Element_Aggregate_Order_By>
}

/** primary key columns input for table: page_elements */
export type Page_Elements_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "page_elements" */
export enum Page_Elements_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PageId = 'pageId',
}

/** input type for updating data in table "page_elements" */
export type Page_Elements_Set_Input = {
  componentId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  pageId?: Maybe<Scalars['uuid']>
}

/** update columns of table "page_elements" */
export enum Page_Elements_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PageId = 'pageId',
}

/** columns and relationships of "page_links" */
export type Page_Links = {
  __typename?: 'page_links'
  id: Scalars['uuid']
  order?: Maybe<Scalars['Int']>
  /** An object relationship */
  page: Pages
  pageId: Scalars['uuid']
  props?: Maybe<Scalars['jsonb']>
  /** An object relationship */
  sourceElement: Page_Elements
  source_element_id: Scalars['uuid']
  /** An object relationship */
  targetElement: Page_Elements
  target_element_id: Scalars['uuid']
}

/** columns and relationships of "page_links" */
export type Page_LinksPropsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "page_links" */
export type Page_Links_Aggregate = {
  __typename?: 'page_links_aggregate'
  aggregate?: Maybe<Page_Links_Aggregate_Fields>
  nodes: Array<Page_Links>
}

/** aggregate fields of "page_links" */
export type Page_Links_Aggregate_Fields = {
  __typename?: 'page_links_aggregate_fields'
  avg?: Maybe<Page_Links_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Page_Links_Max_Fields>
  min?: Maybe<Page_Links_Min_Fields>
  stddev?: Maybe<Page_Links_Stddev_Fields>
  stddev_pop?: Maybe<Page_Links_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Page_Links_Stddev_Samp_Fields>
  sum?: Maybe<Page_Links_Sum_Fields>
  var_pop?: Maybe<Page_Links_Var_Pop_Fields>
  var_samp?: Maybe<Page_Links_Var_Samp_Fields>
  variance?: Maybe<Page_Links_Variance_Fields>
}

/** aggregate fields of "page_links" */
export type Page_Links_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Links_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "page_links" */
export type Page_Links_Aggregate_Order_By = {
  avg?: Maybe<Page_Links_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Page_Links_Max_Order_By>
  min?: Maybe<Page_Links_Min_Order_By>
  stddev?: Maybe<Page_Links_Stddev_Order_By>
  stddev_pop?: Maybe<Page_Links_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Page_Links_Stddev_Samp_Order_By>
  sum?: Maybe<Page_Links_Sum_Order_By>
  var_pop?: Maybe<Page_Links_Var_Pop_Order_By>
  var_samp?: Maybe<Page_Links_Var_Samp_Order_By>
  variance?: Maybe<Page_Links_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Page_Links_Append_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "page_links" */
export type Page_Links_Arr_Rel_Insert_Input = {
  data: Array<Page_Links_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Page_Links_On_Conflict>
}

/** aggregate avg on columns */
export type Page_Links_Avg_Fields = {
  __typename?: 'page_links_avg_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "page_links" */
export type Page_Links_Avg_Order_By = {
  order?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "page_links". All fields are combined with a logical 'AND'. */
export type Page_Links_Bool_Exp = {
  _and?: Maybe<Array<Page_Links_Bool_Exp>>
  _not?: Maybe<Page_Links_Bool_Exp>
  _or?: Maybe<Array<Page_Links_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  order?: Maybe<Int_Comparison_Exp>
  page?: Maybe<Pages_Bool_Exp>
  pageId?: Maybe<Uuid_Comparison_Exp>
  props?: Maybe<Jsonb_Comparison_Exp>
  sourceElement?: Maybe<Page_Elements_Bool_Exp>
  source_element_id?: Maybe<Uuid_Comparison_Exp>
  targetElement?: Maybe<Page_Elements_Bool_Exp>
  target_element_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "page_links" */
export enum Page_Links_Constraint {
  /** unique or primary key constraint */
  PageLinksPkey = 'page_links_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Page_Links_Delete_At_Path_Input = {
  props?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Page_Links_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Page_Links_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "page_links" */
export type Page_Links_Inc_Input = {
  order?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "page_links" */
export type Page_Links_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  page?: Maybe<Pages_Obj_Rel_Insert_Input>
  pageId?: Maybe<Scalars['uuid']>
  props?: Maybe<Scalars['jsonb']>
  sourceElement?: Maybe<Page_Elements_Obj_Rel_Insert_Input>
  source_element_id?: Maybe<Scalars['uuid']>
  targetElement?: Maybe<Page_Elements_Obj_Rel_Insert_Input>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Page_Links_Max_Fields = {
  __typename?: 'page_links_max_fields'
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  pageId?: Maybe<Scalars['uuid']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "page_links" */
export type Page_Links_Max_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  pageId?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Page_Links_Min_Fields = {
  __typename?: 'page_links_min_fields'
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  pageId?: Maybe<Scalars['uuid']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "page_links" */
export type Page_Links_Min_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  pageId?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** response of any mutation on the table "page_links" */
export type Page_Links_Mutation_Response = {
  __typename?: 'page_links_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Page_Links>
}

/** on conflict condition type for table "page_links" */
export type Page_Links_On_Conflict = {
  constraint: Page_Links_Constraint
  update_columns: Array<Page_Links_Update_Column>
  where?: Maybe<Page_Links_Bool_Exp>
}

/** Ordering options when selecting data from "page_links". */
export type Page_Links_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  page?: Maybe<Pages_Order_By>
  pageId?: Maybe<Order_By>
  props?: Maybe<Order_By>
  sourceElement?: Maybe<Page_Elements_Order_By>
  source_element_id?: Maybe<Order_By>
  targetElement?: Maybe<Page_Elements_Order_By>
  target_element_id?: Maybe<Order_By>
}

/** primary key columns input for table: page_links */
export type Page_Links_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Page_Links_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** select columns of table "page_links" */
export enum Page_Links_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  PageId = 'pageId',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** input type for updating data in table "page_links" */
export type Page_Links_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  pageId?: Maybe<Scalars['uuid']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type Page_Links_Stddev_Fields = {
  __typename?: 'page_links_stddev_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "page_links" */
export type Page_Links_Stddev_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Page_Links_Stddev_Pop_Fields = {
  __typename?: 'page_links_stddev_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "page_links" */
export type Page_Links_Stddev_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Page_Links_Stddev_Samp_Fields = {
  __typename?: 'page_links_stddev_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "page_links" */
export type Page_Links_Stddev_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Page_Links_Sum_Fields = {
  __typename?: 'page_links_sum_fields'
  order?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "page_links" */
export type Page_Links_Sum_Order_By = {
  order?: Maybe<Order_By>
}

/** update columns of table "page_links" */
export enum Page_Links_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  PageId = 'pageId',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** aggregate var_pop on columns */
export type Page_Links_Var_Pop_Fields = {
  __typename?: 'page_links_var_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "page_links" */
export type Page_Links_Var_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Page_Links_Var_Samp_Fields = {
  __typename?: 'page_links_var_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "page_links" */
export type Page_Links_Var_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Page_Links_Variance_Fields = {
  __typename?: 'page_links_variance_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "page_links" */
export type Page_Links_Variance_Order_By = {
  order?: Maybe<Order_By>
}

/** columns and relationships of "pages" */
export type Pages = {
  __typename?: 'pages'
  /** An object relationship */
  app: Apps
  appId: Scalars['uuid']
  /** An array relationship */
  elements: Array<Page_Elements>
  /** An aggregate relationship */
  elements_aggregate: Page_Elements_Aggregate
  id: Scalars['uuid']
  name: Scalars['String']
  /** An object relationship */
  owner: Users
  ownerId: Scalars['String']
  /** An array relationship */
  page_links: Array<Page_Links>
  /** An aggregate relationship */
  page_links_aggregate: Page_Links_Aggregate
}

/** columns and relationships of "pages" */
export type PagesElementsArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

/** columns and relationships of "pages" */
export type PagesElements_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

/** columns and relationships of "pages" */
export type PagesPage_LinksArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

/** columns and relationships of "pages" */
export type PagesPage_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

/** aggregated selection of "pages" */
export type Pages_Aggregate = {
  __typename?: 'pages_aggregate'
  aggregate?: Maybe<Pages_Aggregate_Fields>
  nodes: Array<Pages>
}

/** aggregate fields of "pages" */
export type Pages_Aggregate_Fields = {
  __typename?: 'pages_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Pages_Max_Fields>
  min?: Maybe<Pages_Min_Fields>
}

/** aggregate fields of "pages" */
export type Pages_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Pages_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "pages" */
export type Pages_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Pages_Max_Order_By>
  min?: Maybe<Pages_Min_Order_By>
}

/** input type for inserting array relation for remote table "pages" */
export type Pages_Arr_Rel_Insert_Input = {
  data: Array<Pages_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Pages_On_Conflict>
}

/** Boolean expression to filter rows from the table "pages". All fields are combined with a logical 'AND'. */
export type Pages_Bool_Exp = {
  _and?: Maybe<Array<Pages_Bool_Exp>>
  _not?: Maybe<Pages_Bool_Exp>
  _or?: Maybe<Array<Pages_Bool_Exp>>
  app?: Maybe<Apps_Bool_Exp>
  appId?: Maybe<Uuid_Comparison_Exp>
  elements?: Maybe<Page_Elements_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  owner?: Maybe<Users_Bool_Exp>
  ownerId?: Maybe<String_Comparison_Exp>
  page_links?: Maybe<Page_Links_Bool_Exp>
}

/** unique or primary key constraints on table "pages" */
export enum Pages_Constraint {
  /** unique or primary key constraint */
  PagesPkey = 'pages_pkey',
}

/** input type for inserting data into table "pages" */
export type Pages_Insert_Input = {
  app?: Maybe<Apps_Obj_Rel_Insert_Input>
  appId?: Maybe<Scalars['uuid']>
  elements?: Maybe<Page_Elements_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  owner?: Maybe<Users_Obj_Rel_Insert_Input>
  ownerId?: Maybe<Scalars['String']>
  page_links?: Maybe<Page_Links_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Pages_Max_Fields = {
  __typename?: 'pages_max_fields'
  appId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "pages" */
export type Pages_Max_Order_By = {
  appId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  ownerId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Pages_Min_Fields = {
  __typename?: 'pages_min_fields'
  appId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "pages" */
export type Pages_Min_Order_By = {
  appId?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  ownerId?: Maybe<Order_By>
}

/** response of any mutation on the table "pages" */
export type Pages_Mutation_Response = {
  __typename?: 'pages_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Pages>
}

/** input type for inserting object relation for remote table "pages" */
export type Pages_Obj_Rel_Insert_Input = {
  data: Pages_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Pages_On_Conflict>
}

/** on conflict condition type for table "pages" */
export type Pages_On_Conflict = {
  constraint: Pages_Constraint
  update_columns: Array<Pages_Update_Column>
  where?: Maybe<Pages_Bool_Exp>
}

/** Ordering options when selecting data from "pages". */
export type Pages_Order_By = {
  app?: Maybe<Apps_Order_By>
  appId?: Maybe<Order_By>
  elements_aggregate?: Maybe<Page_Elements_Aggregate_Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  owner?: Maybe<Users_Order_By>
  ownerId?: Maybe<Order_By>
  page_links_aggregate?: Maybe<Page_Links_Aggregate_Order_By>
}

/** primary key columns input for table: pages */
export type Pages_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "pages" */
export enum Pages_Select_Column {
  /** column name */
  AppId = 'appId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
}

/** input type for updating data in table "pages" */
export type Pages_Set_Input = {
  appId?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
}

/** update columns of table "pages" */
export enum Pages_Update_Column {
  /** column name */
  AppId = 'appId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
}

/** columns and relationships of "prop_element" */
export type Prop_Element = {
  __typename?: 'prop_element'
  /** An object relationship */
  element: Page_Elements
  element_id: Scalars['uuid']
  /** An object relationship */
  prop: Props
  prop_id: Scalars['uuid']
}

/** aggregated selection of "prop_element" */
export type Prop_Element_Aggregate = {
  __typename?: 'prop_element_aggregate'
  aggregate?: Maybe<Prop_Element_Aggregate_Fields>
  nodes: Array<Prop_Element>
}

/** aggregate fields of "prop_element" */
export type Prop_Element_Aggregate_Fields = {
  __typename?: 'prop_element_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Element_Max_Fields>
  min?: Maybe<Prop_Element_Min_Fields>
}

/** aggregate fields of "prop_element" */
export type Prop_Element_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Element_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "prop_element" */
export type Prop_Element_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Prop_Element_Max_Order_By>
  min?: Maybe<Prop_Element_Min_Order_By>
}

/** input type for inserting array relation for remote table "prop_element" */
export type Prop_Element_Arr_Rel_Insert_Input = {
  data: Array<Prop_Element_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** Boolean expression to filter rows from the table "prop_element". All fields are combined with a logical 'AND'. */
export type Prop_Element_Bool_Exp = {
  _and?: Maybe<Array<Prop_Element_Bool_Exp>>
  _not?: Maybe<Prop_Element_Bool_Exp>
  _or?: Maybe<Array<Prop_Element_Bool_Exp>>
  element?: Maybe<Page_Elements_Bool_Exp>
  element_id?: Maybe<Uuid_Comparison_Exp>
  prop?: Maybe<Props_Bool_Exp>
  prop_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_element" */
export enum Prop_Element_Constraint {
  /** unique or primary key constraint */
  PropElementPkey = 'prop_element_pkey',
}

/** input type for inserting data into table "prop_element" */
export type Prop_Element_Insert_Input = {
  element?: Maybe<Page_Elements_Obj_Rel_Insert_Input>
  element_id?: Maybe<Scalars['uuid']>
  prop?: Maybe<Props_Obj_Rel_Insert_Input>
  prop_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Element_Max_Fields = {
  __typename?: 'prop_element_max_fields'
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "prop_element" */
export type Prop_Element_Max_Order_By = {
  element_id?: Maybe<Order_By>
  prop_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Prop_Element_Min_Fields = {
  __typename?: 'prop_element_min_fields'
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "prop_element" */
export type Prop_Element_Min_Order_By = {
  element_id?: Maybe<Order_By>
  prop_id?: Maybe<Order_By>
}

/** response of any mutation on the table "prop_element" */
export type Prop_Element_Mutation_Response = {
  __typename?: 'prop_element_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Element>
}

/** on conflict condition type for table "prop_element" */
export type Prop_Element_On_Conflict = {
  constraint: Prop_Element_Constraint
  update_columns: Array<Prop_Element_Update_Column>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** Ordering options when selecting data from "prop_element". */
export type Prop_Element_Order_By = {
  element?: Maybe<Page_Elements_Order_By>
  element_id?: Maybe<Order_By>
  prop?: Maybe<Props_Order_By>
  prop_id?: Maybe<Order_By>
}

/** primary key columns input for table: prop_element */
export type Prop_Element_Pk_Columns_Input = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

/** select columns of table "prop_element" */
export enum Prop_Element_Select_Column {
  /** column name */
  ElementId = 'element_id',
  /** column name */
  PropId = 'prop_id',
}

/** input type for updating data in table "prop_element" */
export type Prop_Element_Set_Input = {
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop_element" */
export enum Prop_Element_Update_Column {
  /** column name */
  ElementId = 'element_id',
  /** column name */
  PropId = 'prop_id',
}

/** columns and relationships of "prop_value_tag" */
export type Prop_Value_Tag = {
  __typename?: 'prop_value_tag'
  /** An object relationship */
  prop_value: Prop_Values
  prop_value_id: Scalars['uuid']
  /** An object relationship */
  tag: Tags
  tag_id: Scalars['uuid']
}

/** aggregated selection of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate = {
  __typename?: 'prop_value_tag_aggregate'
  aggregate?: Maybe<Prop_Value_Tag_Aggregate_Fields>
  nodes: Array<Prop_Value_Tag>
}

/** aggregate fields of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate_Fields = {
  __typename?: 'prop_value_tag_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Value_Tag_Max_Fields>
  min?: Maybe<Prop_Value_Tag_Min_Fields>
}

/** aggregate fields of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "prop_value_tag" */
export type Prop_Value_Tag_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Prop_Value_Tag_Max_Order_By>
  min?: Maybe<Prop_Value_Tag_Min_Order_By>
}

/** input type for inserting array relation for remote table "prop_value_tag" */
export type Prop_Value_Tag_Arr_Rel_Insert_Input = {
  data: Array<Prop_Value_Tag_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Value_Tag_On_Conflict>
}

/** Boolean expression to filter rows from the table "prop_value_tag". All fields are combined with a logical 'AND'. */
export type Prop_Value_Tag_Bool_Exp = {
  _and?: Maybe<Array<Prop_Value_Tag_Bool_Exp>>
  _not?: Maybe<Prop_Value_Tag_Bool_Exp>
  _or?: Maybe<Array<Prop_Value_Tag_Bool_Exp>>
  prop_value?: Maybe<Prop_Values_Bool_Exp>
  prop_value_id?: Maybe<Uuid_Comparison_Exp>
  tag?: Maybe<Tags_Bool_Exp>
  tag_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_value_tag" */
export enum Prop_Value_Tag_Constraint {
  /** unique or primary key constraint */
  PropValueTagPkey = 'prop_value_tag_pkey',
}

/** input type for inserting data into table "prop_value_tag" */
export type Prop_Value_Tag_Insert_Input = {
  prop_value?: Maybe<Prop_Values_Obj_Rel_Insert_Input>
  prop_value_id?: Maybe<Scalars['uuid']>
  tag?: Maybe<Tags_Obj_Rel_Insert_Input>
  tag_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Value_Tag_Max_Fields = {
  __typename?: 'prop_value_tag_max_fields'
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "prop_value_tag" */
export type Prop_Value_Tag_Max_Order_By = {
  prop_value_id?: Maybe<Order_By>
  tag_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Prop_Value_Tag_Min_Fields = {
  __typename?: 'prop_value_tag_min_fields'
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "prop_value_tag" */
export type Prop_Value_Tag_Min_Order_By = {
  prop_value_id?: Maybe<Order_By>
  tag_id?: Maybe<Order_By>
}

/** response of any mutation on the table "prop_value_tag" */
export type Prop_Value_Tag_Mutation_Response = {
  __typename?: 'prop_value_tag_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Value_Tag>
}

/** on conflict condition type for table "prop_value_tag" */
export type Prop_Value_Tag_On_Conflict = {
  constraint: Prop_Value_Tag_Constraint
  update_columns: Array<Prop_Value_Tag_Update_Column>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** Ordering options when selecting data from "prop_value_tag". */
export type Prop_Value_Tag_Order_By = {
  prop_value?: Maybe<Prop_Values_Order_By>
  prop_value_id?: Maybe<Order_By>
  tag?: Maybe<Tags_Order_By>
  tag_id?: Maybe<Order_By>
}

/** primary key columns input for table: prop_value_tag */
export type Prop_Value_Tag_Pk_Columns_Input = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

/** select columns of table "prop_value_tag" */
export enum Prop_Value_Tag_Select_Column {
  /** column name */
  PropValueId = 'prop_value_id',
  /** column name */
  TagId = 'tag_id',
}

/** input type for updating data in table "prop_value_tag" */
export type Prop_Value_Tag_Set_Input = {
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop_value_tag" */
export enum Prop_Value_Tag_Update_Column {
  /** column name */
  PropValueId = 'prop_value_id',
  /** column name */
  TagId = 'tag_id',
}

/** columns and relationships of "prop_value_types" */
export type Prop_Value_Types = {
  __typename?: 'prop_value_types'
  description?: Maybe<Scalars['String']>
  /** An array relationship */
  prop_values: Array<Prop_Values>
  /** An aggregate relationship */
  prop_values_aggregate: Prop_Values_Aggregate
  value: Scalars['String']
}

/** columns and relationships of "prop_value_types" */
export type Prop_Value_TypesProp_ValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** columns and relationships of "prop_value_types" */
export type Prop_Value_TypesProp_Values_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** aggregated selection of "prop_value_types" */
export type Prop_Value_Types_Aggregate = {
  __typename?: 'prop_value_types_aggregate'
  aggregate?: Maybe<Prop_Value_Types_Aggregate_Fields>
  nodes: Array<Prop_Value_Types>
}

/** aggregate fields of "prop_value_types" */
export type Prop_Value_Types_Aggregate_Fields = {
  __typename?: 'prop_value_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Value_Types_Max_Fields>
  min?: Maybe<Prop_Value_Types_Min_Fields>
}

/** aggregate fields of "prop_value_types" */
export type Prop_Value_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Value_Types_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "prop_value_types". All fields are combined with a logical 'AND'. */
export type Prop_Value_Types_Bool_Exp = {
  _and?: Maybe<Array<Prop_Value_Types_Bool_Exp>>
  _not?: Maybe<Prop_Value_Types_Bool_Exp>
  _or?: Maybe<Array<Prop_Value_Types_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  prop_values?: Maybe<Prop_Values_Bool_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_value_types" */
export enum Prop_Value_Types_Constraint {
  /** unique or primary key constraint */
  PropValueTypesPkey = 'prop_value_types_pkey',
}

/** input type for inserting data into table "prop_value_types" */
export type Prop_Value_Types_Insert_Input = {
  description?: Maybe<Scalars['String']>
  prop_values?: Maybe<Prop_Values_Arr_Rel_Insert_Input>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Prop_Value_Types_Max_Fields = {
  __typename?: 'prop_value_types_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Prop_Value_Types_Min_Fields = {
  __typename?: 'prop_value_types_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "prop_value_types" */
export type Prop_Value_Types_Mutation_Response = {
  __typename?: 'prop_value_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Value_Types>
}

/** input type for inserting object relation for remote table "prop_value_types" */
export type Prop_Value_Types_Obj_Rel_Insert_Input = {
  data: Prop_Value_Types_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Value_Types_On_Conflict>
}

/** on conflict condition type for table "prop_value_types" */
export type Prop_Value_Types_On_Conflict = {
  constraint: Prop_Value_Types_Constraint
  update_columns: Array<Prop_Value_Types_Update_Column>
  where?: Maybe<Prop_Value_Types_Bool_Exp>
}

/** Ordering options when selecting data from "prop_value_types". */
export type Prop_Value_Types_Order_By = {
  description?: Maybe<Order_By>
  prop_values_aggregate?: Maybe<Prop_Values_Aggregate_Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: prop_value_types */
export type Prop_Value_Types_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "prop_value_types" */
export enum Prop_Value_Types_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "prop_value_types" */
export type Prop_Value_Types_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "prop_value_types" */
export enum Prop_Value_Types_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** columns and relationships of "prop_values" */
export type Prop_Values = {
  __typename?: 'prop_values'
  id: Scalars['uuid']
  /** An object relationship */
  lambda?: Maybe<Lambdas>
  /** This is used as a value */
  lambdaId?: Maybe<Scalars['uuid']>
  name: Scalars['String']
  /** This is the prop that owns this value */
  parentPropId: Scalars['uuid']
  /** An object relationship */
  prop: Props
  /** An object relationship */
  propByValuePropId?: Maybe<Props>
  /** An array relationship */
  prop_value_tags: Array<Prop_Value_Tag>
  /** An aggregate relationship */
  prop_value_tags_aggregate: Prop_Value_Tag_Aggregate
  /** An object relationship */
  prop_value_type: Prop_Value_Types
  type: Scalars['String']
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Scalars['uuid']>
}

/** columns and relationships of "prop_values" */
export type Prop_ValuesProp_Value_TagsArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** columns and relationships of "prop_values" */
export type Prop_ValuesProp_Value_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** aggregated selection of "prop_values" */
export type Prop_Values_Aggregate = {
  __typename?: 'prop_values_aggregate'
  aggregate?: Maybe<Prop_Values_Aggregate_Fields>
  nodes: Array<Prop_Values>
}

/** aggregate fields of "prop_values" */
export type Prop_Values_Aggregate_Fields = {
  __typename?: 'prop_values_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Values_Max_Fields>
  min?: Maybe<Prop_Values_Min_Fields>
}

/** aggregate fields of "prop_values" */
export type Prop_Values_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Values_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "prop_values" */
export type Prop_Values_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Prop_Values_Max_Order_By>
  min?: Maybe<Prop_Values_Min_Order_By>
}

/** input type for inserting array relation for remote table "prop_values" */
export type Prop_Values_Arr_Rel_Insert_Input = {
  data: Array<Prop_Values_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Values_On_Conflict>
}

/** Boolean expression to filter rows from the table "prop_values". All fields are combined with a logical 'AND'. */
export type Prop_Values_Bool_Exp = {
  _and?: Maybe<Array<Prop_Values_Bool_Exp>>
  _not?: Maybe<Prop_Values_Bool_Exp>
  _or?: Maybe<Array<Prop_Values_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  lambda?: Maybe<Lambdas_Bool_Exp>
  lambdaId?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  parentPropId?: Maybe<Uuid_Comparison_Exp>
  prop?: Maybe<Props_Bool_Exp>
  propByValuePropId?: Maybe<Props_Bool_Exp>
  prop_value_tags?: Maybe<Prop_Value_Tag_Bool_Exp>
  prop_value_type?: Maybe<Prop_Value_Types_Bool_Exp>
  type?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
  valuePropId?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_values" */
export enum Prop_Values_Constraint {
  /** unique or primary key constraint */
  PropValuesPkey = 'prop_values_pkey',
}

/** input type for inserting data into table "prop_values" */
export type Prop_Values_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  lambda?: Maybe<Lambdas_Obj_Rel_Insert_Input>
  /** This is used as a value */
  lambdaId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Scalars['uuid']>
  prop?: Maybe<Props_Obj_Rel_Insert_Input>
  propByValuePropId?: Maybe<Props_Obj_Rel_Insert_Input>
  prop_value_tags?: Maybe<Prop_Value_Tag_Arr_Rel_Insert_Input>
  prop_value_type?: Maybe<Prop_Value_Types_Obj_Rel_Insert_Input>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Values_Max_Fields = {
  __typename?: 'prop_values_max_fields'
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambdaId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "prop_values" */
export type Prop_Values_Max_Order_By = {
  id?: Maybe<Order_By>
  /** This is used as a value */
  lambdaId?: Maybe<Order_By>
  name?: Maybe<Order_By>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Order_By>
  type?: Maybe<Order_By>
  value?: Maybe<Order_By>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Prop_Values_Min_Fields = {
  __typename?: 'prop_values_min_fields'
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambdaId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "prop_values" */
export type Prop_Values_Min_Order_By = {
  id?: Maybe<Order_By>
  /** This is used as a value */
  lambdaId?: Maybe<Order_By>
  name?: Maybe<Order_By>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Order_By>
  type?: Maybe<Order_By>
  value?: Maybe<Order_By>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Order_By>
}

/** response of any mutation on the table "prop_values" */
export type Prop_Values_Mutation_Response = {
  __typename?: 'prop_values_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Values>
}

/** input type for inserting object relation for remote table "prop_values" */
export type Prop_Values_Obj_Rel_Insert_Input = {
  data: Prop_Values_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Values_On_Conflict>
}

/** on conflict condition type for table "prop_values" */
export type Prop_Values_On_Conflict = {
  constraint: Prop_Values_Constraint
  update_columns: Array<Prop_Values_Update_Column>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** Ordering options when selecting data from "prop_values". */
export type Prop_Values_Order_By = {
  id?: Maybe<Order_By>
  lambda?: Maybe<Lambdas_Order_By>
  lambdaId?: Maybe<Order_By>
  name?: Maybe<Order_By>
  parentPropId?: Maybe<Order_By>
  prop?: Maybe<Props_Order_By>
  propByValuePropId?: Maybe<Props_Order_By>
  prop_value_tags_aggregate?: Maybe<Prop_Value_Tag_Aggregate_Order_By>
  prop_value_type?: Maybe<Prop_Value_Types_Order_By>
  type?: Maybe<Order_By>
  value?: Maybe<Order_By>
  valuePropId?: Maybe<Order_By>
}

/** primary key columns input for table: prop_values */
export type Prop_Values_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "prop_values" */
export enum Prop_Values_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LambdaId = 'lambdaId',
  /** column name */
  Name = 'name',
  /** column name */
  ParentPropId = 'parentPropId',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value',
  /** column name */
  ValuePropId = 'valuePropId',
}

/** input type for updating data in table "prop_values" */
export type Prop_Values_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambdaId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parentPropId?: Maybe<Scalars['uuid']>
  type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  valuePropId?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop_values" */
export enum Prop_Values_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LambdaId = 'lambdaId',
  /** column name */
  Name = 'name',
  /** column name */
  ParentPropId = 'parentPropId',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value',
  /** column name */
  ValuePropId = 'valuePropId',
}

/** columns and relationships of "props" */
export type Props = {
  __typename?: 'props'
  id: Scalars['uuid']
  /** An object relationship */
  library: Libraries
  libraryId: Scalars['uuid']
  /** An array relationship */
  propValuesByValuePropId: Array<Prop_Values>
  /** An aggregate relationship */
  propValuesByValuePropId_aggregate: Prop_Values_Aggregate
  /** An array relationship */
  prop_elements: Array<Prop_Element>
  /** An aggregate relationship */
  prop_elements_aggregate: Prop_Element_Aggregate
  /** An array relationship */
  prop_values: Array<Prop_Values>
  /** An aggregate relationship */
  prop_values_aggregate: Prop_Values_Aggregate
}

/** columns and relationships of "props" */
export type PropsPropValuesByValuePropIdArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** columns and relationships of "props" */
export type PropsPropValuesByValuePropId_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** columns and relationships of "props" */
export type PropsProp_ElementsArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** columns and relationships of "props" */
export type PropsProp_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** columns and relationships of "props" */
export type PropsProp_ValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** columns and relationships of "props" */
export type PropsProp_Values_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

/** aggregated selection of "props" */
export type Props_Aggregate = {
  __typename?: 'props_aggregate'
  aggregate?: Maybe<Props_Aggregate_Fields>
  nodes: Array<Props>
}

/** aggregate fields of "props" */
export type Props_Aggregate_Fields = {
  __typename?: 'props_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Props_Max_Fields>
  min?: Maybe<Props_Min_Fields>
}

/** aggregate fields of "props" */
export type Props_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Props_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "props" */
export type Props_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Props_Max_Order_By>
  min?: Maybe<Props_Min_Order_By>
}

/** input type for inserting array relation for remote table "props" */
export type Props_Arr_Rel_Insert_Input = {
  data: Array<Props_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Props_On_Conflict>
}

/** Boolean expression to filter rows from the table "props". All fields are combined with a logical 'AND'. */
export type Props_Bool_Exp = {
  _and?: Maybe<Array<Props_Bool_Exp>>
  _not?: Maybe<Props_Bool_Exp>
  _or?: Maybe<Array<Props_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  library?: Maybe<Libraries_Bool_Exp>
  libraryId?: Maybe<Uuid_Comparison_Exp>
  propValuesByValuePropId?: Maybe<Prop_Values_Bool_Exp>
  prop_elements?: Maybe<Prop_Element_Bool_Exp>
  prop_values?: Maybe<Prop_Values_Bool_Exp>
}

/** unique or primary key constraints on table "props" */
export enum Props_Constraint {
  /** unique or primary key constraint */
  PropsPkey = 'props_pkey',
}

/** input type for inserting data into table "props" */
export type Props_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  library?: Maybe<Libraries_Obj_Rel_Insert_Input>
  libraryId?: Maybe<Scalars['uuid']>
  propValuesByValuePropId?: Maybe<Prop_Values_Arr_Rel_Insert_Input>
  prop_elements?: Maybe<Prop_Element_Arr_Rel_Insert_Input>
  prop_values?: Maybe<Prop_Values_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Props_Max_Fields = {
  __typename?: 'props_max_fields'
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "props" */
export type Props_Max_Order_By = {
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Props_Min_Fields = {
  __typename?: 'props_min_fields'
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "props" */
export type Props_Min_Order_By = {
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
}

/** response of any mutation on the table "props" */
export type Props_Mutation_Response = {
  __typename?: 'props_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Props>
}

/** input type for inserting object relation for remote table "props" */
export type Props_Obj_Rel_Insert_Input = {
  data: Props_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Props_On_Conflict>
}

/** on conflict condition type for table "props" */
export type Props_On_Conflict = {
  constraint: Props_Constraint
  update_columns: Array<Props_Update_Column>
  where?: Maybe<Props_Bool_Exp>
}

/** Ordering options when selecting data from "props". */
export type Props_Order_By = {
  id?: Maybe<Order_By>
  library?: Maybe<Libraries_Order_By>
  libraryId?: Maybe<Order_By>
  propValuesByValuePropId_aggregate?: Maybe<Prop_Values_Aggregate_Order_By>
  prop_elements_aggregate?: Maybe<Prop_Element_Aggregate_Order_By>
  prop_values_aggregate?: Maybe<Prop_Values_Aggregate_Order_By>
}

/** primary key columns input for table: props */
export type Props_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "props" */
export enum Props_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
}

/** input type for updating data in table "props" */
export type Props_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
}

/** update columns of table "props" */
export enum Props_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
}

export type Query_Root = {
  __typename?: 'query_root'
  /** An array relationship */
  apps: Array<Apps>
  /** An aggregate relationship */
  apps_aggregate: Apps_Aggregate
  /** fetch data from the table: "apps" using primary key columns */
  apps_by_pk?: Maybe<Apps>
  /** fetch data from the table: "atom_types" */
  atom_types: Array<Atom_Types>
  /** fetch aggregated fields from the table: "atom_types" */
  atom_types_aggregate: Atom_Types_Aggregate
  /** fetch data from the table: "atom_types" using primary key columns */
  atom_types_by_pk?: Maybe<Atom_Types>
  /** fetch data from the table: "atoms" */
  atoms: Array<Atoms>
  /** fetch aggregated fields from the table: "atoms" */
  atoms_aggregate: Atoms_Aggregate
  /** fetch data from the table: "atoms" using primary key columns */
  atoms_by_pk?: Maybe<Atoms>
  /** fetch data from the table: "attributes" */
  attributes: Array<Attributes>
  /** fetch aggregated fields from the table: "attributes" */
  attributes_aggregate: Attributes_Aggregate
  /** fetch data from the table: "attributes" using primary key columns */
  attributes_by_pk?: Maybe<Attributes>
  /** fetch data from the table: "categories" */
  categories: Array<Categories>
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>
  /** fetch data from the table: "component_elements" */
  component_elements: Array<Component_Elements>
  /** An aggregate relationship */
  component_elements_aggregate: Component_Elements_Aggregate
  /** fetch data from the table: "component_elements" using primary key columns */
  component_elements_by_pk?: Maybe<Component_Elements>
  /** An array relationship */
  component_links: Array<Component_Links>
  /** An aggregate relationship */
  component_links_aggregate: Component_Links_Aggregate
  /** fetch data from the table: "component_links" using primary key columns */
  component_links_by_pk?: Maybe<Component_Links>
  /** An array relationship */
  components: Array<Components>
  /** An aggregate relationship */
  components_aggregate: Components_Aggregate
  /** fetch data from the table: "components" using primary key columns */
  components_by_pk?: Maybe<Components>
  /** An array relationship */
  lambdas: Array<Lambdas>
  /** An aggregate relationship */
  lambdas_aggregate: Lambdas_Aggregate
  /** fetch data from the table: "lambdas" using primary key columns */
  lambdas_by_pk?: Maybe<Lambdas>
  /** An array relationship */
  libraries: Array<Libraries>
  /** An aggregate relationship */
  libraries_aggregate: Libraries_Aggregate
  /** fetch data from the table: "libraries" using primary key columns */
  libraries_by_pk?: Maybe<Libraries>
  /** fetch data from the table: "page_elements" */
  page_elements: Array<Page_Elements>
  /** fetch aggregated fields from the table: "page_elements" */
  page_elements_aggregate: Page_Elements_Aggregate
  /** fetch data from the table: "page_elements" using primary key columns */
  page_elements_by_pk?: Maybe<Page_Elements>
  /** An array relationship */
  page_links: Array<Page_Links>
  /** An aggregate relationship */
  page_links_aggregate: Page_Links_Aggregate
  /** fetch data from the table: "page_links" using primary key columns */
  page_links_by_pk?: Maybe<Page_Links>
  /** An array relationship */
  pages: Array<Pages>
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate
  /** fetch data from the table: "pages" using primary key columns */
  pages_by_pk?: Maybe<Pages>
  /** fetch data from the table: "prop_element" */
  prop_element: Array<Prop_Element>
  /** fetch aggregated fields from the table: "prop_element" */
  prop_element_aggregate: Prop_Element_Aggregate
  /** fetch data from the table: "prop_element" using primary key columns */
  prop_element_by_pk?: Maybe<Prop_Element>
  /** fetch data from the table: "prop_value_tag" */
  prop_value_tag: Array<Prop_Value_Tag>
  /** fetch aggregated fields from the table: "prop_value_tag" */
  prop_value_tag_aggregate: Prop_Value_Tag_Aggregate
  /** fetch data from the table: "prop_value_tag" using primary key columns */
  prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** fetch data from the table: "prop_value_types" */
  prop_value_types: Array<Prop_Value_Types>
  /** fetch aggregated fields from the table: "prop_value_types" */
  prop_value_types_aggregate: Prop_Value_Types_Aggregate
  /** fetch data from the table: "prop_value_types" using primary key columns */
  prop_value_types_by_pk?: Maybe<Prop_Value_Types>
  /** An array relationship */
  prop_values: Array<Prop_Values>
  /** An aggregate relationship */
  prop_values_aggregate: Prop_Values_Aggregate
  /** fetch data from the table: "prop_values" using primary key columns */
  prop_values_by_pk?: Maybe<Prop_Values>
  /** An array relationship */
  props: Array<Props>
  /** An aggregate relationship */
  props_aggregate: Props_Aggregate
  /** fetch data from the table: "props" using primary key columns */
  props_by_pk?: Maybe<Props>
  /** An array relationship */
  styles: Array<Styles>
  /** An aggregate relationship */
  styles_aggregate: Styles_Aggregate
  /** fetch data from the table: "styles" using primary key columns */
  styles_by_pk?: Maybe<Styles>
  /** An array relationship */
  tags: Array<Tags>
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

export type Query_RootAppsArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

export type Query_RootApps_AggregateArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

export type Query_RootApps_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAtom_TypesArgs = {
  distinct_on?: Maybe<Array<Atom_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Types_Order_By>>
  where?: Maybe<Atom_Types_Bool_Exp>
}

export type Query_RootAtom_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Types_Order_By>>
  where?: Maybe<Atom_Types_Bool_Exp>
}

export type Query_RootAtom_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootAtomsArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

export type Query_RootAtoms_AggregateArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

export type Query_RootAtoms_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAttributesArgs = {
  distinct_on?: Maybe<Array<Attributes_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attributes_Order_By>>
  where?: Maybe<Attributes_Bool_Exp>
}

export type Query_RootAttributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Attributes_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attributes_Order_By>>
  where?: Maybe<Attributes_Bool_Exp>
}

export type Query_RootAttributes_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Query_RootCategories_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponent_ElementsArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

export type Query_RootComponent_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

export type Query_RootComponent_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponent_LinksArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

export type Query_RootComponent_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

export type Query_RootComponent_Links_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponentsArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

export type Query_RootComponents_AggregateArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

export type Query_RootComponents_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLambdasArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

export type Query_RootLambdas_AggregateArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

export type Query_RootLambdas_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLibrariesArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

export type Query_RootLibraries_AggregateArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

export type Query_RootLibraries_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPage_ElementsArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

export type Query_RootPage_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

export type Query_RootPage_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPage_LinksArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

export type Query_RootPage_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

export type Query_RootPage_Links_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPagesArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

export type Query_RootPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

export type Query_RootPages_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootProp_ElementArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Query_RootProp_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Query_RootProp_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

export type Query_RootProp_Value_TagArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Query_RootProp_Value_Tag_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Query_RootProp_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

export type Query_RootProp_Value_TypesArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Types_Order_By>>
  where?: Maybe<Prop_Value_Types_Bool_Exp>
}

export type Query_RootProp_Value_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Types_Order_By>>
  where?: Maybe<Prop_Value_Types_Bool_Exp>
}

export type Query_RootProp_Value_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootProp_ValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

export type Query_RootProp_Values_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

export type Query_RootProp_Values_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPropsArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

export type Query_RootProps_AggregateArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

export type Query_RootProps_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootStylesArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

export type Query_RootStyles_AggregateArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

export type Query_RootStyles_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootTags_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']
}

/** columns and relationships of "styles" */
export type Styles = {
  __typename?: 'styles'
  id: Scalars['uuid']
  /** An object relationship */
  library: Libraries
  libraryId: Scalars['uuid']
  name: Scalars['String']
}

/** aggregated selection of "styles" */
export type Styles_Aggregate = {
  __typename?: 'styles_aggregate'
  aggregate?: Maybe<Styles_Aggregate_Fields>
  nodes: Array<Styles>
}

/** aggregate fields of "styles" */
export type Styles_Aggregate_Fields = {
  __typename?: 'styles_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Styles_Max_Fields>
  min?: Maybe<Styles_Min_Fields>
}

/** aggregate fields of "styles" */
export type Styles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Styles_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "styles" */
export type Styles_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Styles_Max_Order_By>
  min?: Maybe<Styles_Min_Order_By>
}

/** input type for inserting array relation for remote table "styles" */
export type Styles_Arr_Rel_Insert_Input = {
  data: Array<Styles_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Styles_On_Conflict>
}

/** Boolean expression to filter rows from the table "styles". All fields are combined with a logical 'AND'. */
export type Styles_Bool_Exp = {
  _and?: Maybe<Array<Styles_Bool_Exp>>
  _not?: Maybe<Styles_Bool_Exp>
  _or?: Maybe<Array<Styles_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  library?: Maybe<Libraries_Bool_Exp>
  libraryId?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "styles" */
export enum Styles_Constraint {
  /** unique or primary key constraint */
  StylesPkey = 'styles_pkey',
}

/** input type for inserting data into table "styles" */
export type Styles_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  library?: Maybe<Libraries_Obj_Rel_Insert_Input>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Styles_Max_Fields = {
  __typename?: 'styles_max_fields'
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "styles" */
export type Styles_Max_Order_By = {
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Styles_Min_Fields = {
  __typename?: 'styles_min_fields'
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "styles" */
export type Styles_Min_Order_By = {
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** response of any mutation on the table "styles" */
export type Styles_Mutation_Response = {
  __typename?: 'styles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Styles>
}

/** on conflict condition type for table "styles" */
export type Styles_On_Conflict = {
  constraint: Styles_Constraint
  update_columns: Array<Styles_Update_Column>
  where?: Maybe<Styles_Bool_Exp>
}

/** Ordering options when selecting data from "styles". */
export type Styles_Order_By = {
  id?: Maybe<Order_By>
  library?: Maybe<Libraries_Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** primary key columns input for table: styles */
export type Styles_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "styles" */
export enum Styles_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "styles" */
export type Styles_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "styles" */
export enum Styles_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** An array relationship */
  apps: Array<Apps>
  /** An aggregate relationship */
  apps_aggregate: Apps_Aggregate
  /** fetch data from the table: "apps" using primary key columns */
  apps_by_pk?: Maybe<Apps>
  /** fetch data from the table: "atom_types" */
  atom_types: Array<Atom_Types>
  /** fetch aggregated fields from the table: "atom_types" */
  atom_types_aggregate: Atom_Types_Aggregate
  /** fetch data from the table: "atom_types" using primary key columns */
  atom_types_by_pk?: Maybe<Atom_Types>
  /** fetch data from the table: "atoms" */
  atoms: Array<Atoms>
  /** fetch aggregated fields from the table: "atoms" */
  atoms_aggregate: Atoms_Aggregate
  /** fetch data from the table: "atoms" using primary key columns */
  atoms_by_pk?: Maybe<Atoms>
  /** fetch data from the table: "attributes" */
  attributes: Array<Attributes>
  /** fetch aggregated fields from the table: "attributes" */
  attributes_aggregate: Attributes_Aggregate
  /** fetch data from the table: "attributes" using primary key columns */
  attributes_by_pk?: Maybe<Attributes>
  /** fetch data from the table: "categories" */
  categories: Array<Categories>
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>
  /** fetch data from the table: "component_elements" */
  component_elements: Array<Component_Elements>
  /** An aggregate relationship */
  component_elements_aggregate: Component_Elements_Aggregate
  /** fetch data from the table: "component_elements" using primary key columns */
  component_elements_by_pk?: Maybe<Component_Elements>
  /** An array relationship */
  component_links: Array<Component_Links>
  /** An aggregate relationship */
  component_links_aggregate: Component_Links_Aggregate
  /** fetch data from the table: "component_links" using primary key columns */
  component_links_by_pk?: Maybe<Component_Links>
  /** An array relationship */
  components: Array<Components>
  /** An aggregate relationship */
  components_aggregate: Components_Aggregate
  /** fetch data from the table: "components" using primary key columns */
  components_by_pk?: Maybe<Components>
  /** An array relationship */
  lambdas: Array<Lambdas>
  /** An aggregate relationship */
  lambdas_aggregate: Lambdas_Aggregate
  /** fetch data from the table: "lambdas" using primary key columns */
  lambdas_by_pk?: Maybe<Lambdas>
  /** An array relationship */
  libraries: Array<Libraries>
  /** An aggregate relationship */
  libraries_aggregate: Libraries_Aggregate
  /** fetch data from the table: "libraries" using primary key columns */
  libraries_by_pk?: Maybe<Libraries>
  /** fetch data from the table: "page_elements" */
  page_elements: Array<Page_Elements>
  /** fetch aggregated fields from the table: "page_elements" */
  page_elements_aggregate: Page_Elements_Aggregate
  /** fetch data from the table: "page_elements" using primary key columns */
  page_elements_by_pk?: Maybe<Page_Elements>
  /** An array relationship */
  page_links: Array<Page_Links>
  /** An aggregate relationship */
  page_links_aggregate: Page_Links_Aggregate
  /** fetch data from the table: "page_links" using primary key columns */
  page_links_by_pk?: Maybe<Page_Links>
  /** An array relationship */
  pages: Array<Pages>
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate
  /** fetch data from the table: "pages" using primary key columns */
  pages_by_pk?: Maybe<Pages>
  /** fetch data from the table: "prop_element" */
  prop_element: Array<Prop_Element>
  /** fetch aggregated fields from the table: "prop_element" */
  prop_element_aggregate: Prop_Element_Aggregate
  /** fetch data from the table: "prop_element" using primary key columns */
  prop_element_by_pk?: Maybe<Prop_Element>
  /** fetch data from the table: "prop_value_tag" */
  prop_value_tag: Array<Prop_Value_Tag>
  /** fetch aggregated fields from the table: "prop_value_tag" */
  prop_value_tag_aggregate: Prop_Value_Tag_Aggregate
  /** fetch data from the table: "prop_value_tag" using primary key columns */
  prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** fetch data from the table: "prop_value_types" */
  prop_value_types: Array<Prop_Value_Types>
  /** fetch aggregated fields from the table: "prop_value_types" */
  prop_value_types_aggregate: Prop_Value_Types_Aggregate
  /** fetch data from the table: "prop_value_types" using primary key columns */
  prop_value_types_by_pk?: Maybe<Prop_Value_Types>
  /** An array relationship */
  prop_values: Array<Prop_Values>
  /** An aggregate relationship */
  prop_values_aggregate: Prop_Values_Aggregate
  /** fetch data from the table: "prop_values" using primary key columns */
  prop_values_by_pk?: Maybe<Prop_Values>
  /** An array relationship */
  props: Array<Props>
  /** An aggregate relationship */
  props_aggregate: Props_Aggregate
  /** fetch data from the table: "props" using primary key columns */
  props_by_pk?: Maybe<Props>
  /** An array relationship */
  styles: Array<Styles>
  /** An aggregate relationship */
  styles_aggregate: Styles_Aggregate
  /** fetch data from the table: "styles" using primary key columns */
  styles_by_pk?: Maybe<Styles>
  /** An array relationship */
  tags: Array<Tags>
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

export type Subscription_RootAppsArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

export type Subscription_RootApps_AggregateArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

export type Subscription_RootApps_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAtom_TypesArgs = {
  distinct_on?: Maybe<Array<Atom_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Types_Order_By>>
  where?: Maybe<Atom_Types_Bool_Exp>
}

export type Subscription_RootAtom_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Types_Order_By>>
  where?: Maybe<Atom_Types_Bool_Exp>
}

export type Subscription_RootAtom_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootAtomsArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

export type Subscription_RootAtoms_AggregateArgs = {
  distinct_on?: Maybe<Array<Atoms_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atoms_Order_By>>
  where?: Maybe<Atoms_Bool_Exp>
}

export type Subscription_RootAtoms_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAttributesArgs = {
  distinct_on?: Maybe<Array<Attributes_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attributes_Order_By>>
  where?: Maybe<Attributes_Bool_Exp>
}

export type Subscription_RootAttributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Attributes_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attributes_Order_By>>
  where?: Maybe<Attributes_Bool_Exp>
}

export type Subscription_RootAttributes_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponent_ElementsArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

export type Subscription_RootComponent_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Elements_Order_By>>
  where?: Maybe<Component_Elements_Bool_Exp>
}

export type Subscription_RootComponent_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponent_LinksArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

export type Subscription_RootComponent_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Links_Order_By>>
  where?: Maybe<Component_Links_Bool_Exp>
}

export type Subscription_RootComponent_Links_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponentsArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

export type Subscription_RootComponents_AggregateArgs = {
  distinct_on?: Maybe<Array<Components_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Components_Order_By>>
  where?: Maybe<Components_Bool_Exp>
}

export type Subscription_RootComponents_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLambdasArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

export type Subscription_RootLambdas_AggregateArgs = {
  distinct_on?: Maybe<Array<Lambdas_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambdas_Order_By>>
  where?: Maybe<Lambdas_Bool_Exp>
}

export type Subscription_RootLambdas_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLibrariesArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

export type Subscription_RootLibraries_AggregateArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

export type Subscription_RootLibraries_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPage_ElementsArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

export type Subscription_RootPage_Elements_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Elements_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Elements_Order_By>>
  where?: Maybe<Page_Elements_Bool_Exp>
}

export type Subscription_RootPage_Elements_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPage_LinksArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

export type Subscription_RootPage_Links_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Links_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Links_Order_By>>
  where?: Maybe<Page_Links_Bool_Exp>
}

export type Subscription_RootPage_Links_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPagesArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

export type Subscription_RootPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Pages_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Pages_Order_By>>
  where?: Maybe<Pages_Bool_Exp>
}

export type Subscription_RootPages_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootProp_ElementArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Subscription_RootProp_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Subscription_RootProp_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

export type Subscription_RootProp_Value_TagArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Subscription_RootProp_Value_Tag_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Subscription_RootProp_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

export type Subscription_RootProp_Value_TypesArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Types_Order_By>>
  where?: Maybe<Prop_Value_Types_Bool_Exp>
}

export type Subscription_RootProp_Value_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Types_Order_By>>
  where?: Maybe<Prop_Value_Types_Bool_Exp>
}

export type Subscription_RootProp_Value_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootProp_ValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

export type Subscription_RootProp_Values_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Values_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Values_Order_By>>
  where?: Maybe<Prop_Values_Bool_Exp>
}

export type Subscription_RootProp_Values_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPropsArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

export type Subscription_RootProps_AggregateArgs = {
  distinct_on?: Maybe<Array<Props_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Props_Order_By>>
  where?: Maybe<Props_Bool_Exp>
}

export type Subscription_RootProps_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootStylesArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

export type Subscription_RootStyles_AggregateArgs = {
  distinct_on?: Maybe<Array<Styles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Styles_Order_By>>
  where?: Maybe<Styles_Bool_Exp>
}

export type Subscription_RootStyles_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootTags_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']
}

/** columns and relationships of "tags" */
export type Tags = {
  __typename?: 'tags'
  /** An object relationship */
  category?: Maybe<Categories>
  category_id?: Maybe<Scalars['uuid']>
  id: Scalars['uuid']
  label: Scalars['String']
  /** An array relationship */
  prop_value_tags: Array<Prop_Value_Tag>
  /** An aggregate relationship */
  prop_value_tags_aggregate: Prop_Value_Tag_Aggregate
}

/** columns and relationships of "tags" */
export type TagsProp_Value_TagsArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** columns and relationships of "tags" */
export type TagsProp_Value_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** aggregated selection of "tags" */
export type Tags_Aggregate = {
  __typename?: 'tags_aggregate'
  aggregate?: Maybe<Tags_Aggregate_Fields>
  nodes: Array<Tags>
}

/** aggregate fields of "tags" */
export type Tags_Aggregate_Fields = {
  __typename?: 'tags_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Tags_Max_Fields>
  min?: Maybe<Tags_Min_Fields>
}

/** aggregate fields of "tags" */
export type Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tags_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "tags" */
export type Tags_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Tags_Max_Order_By>
  min?: Maybe<Tags_Min_Order_By>
}

/** input type for inserting array relation for remote table "tags" */
export type Tags_Arr_Rel_Insert_Input = {
  data: Array<Tags_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: Maybe<Array<Tags_Bool_Exp>>
  _not?: Maybe<Tags_Bool_Exp>
  _or?: Maybe<Array<Tags_Bool_Exp>>
  category?: Maybe<Categories_Bool_Exp>
  category_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
  prop_value_tags?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** unique or primary key constraints on table "tags" */
export enum Tags_Constraint {
  /** unique or primary key constraint */
  TagsPkey = 'tags_pkey',
}

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
  category?: Maybe<Categories_Obj_Rel_Insert_Input>
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  prop_value_tags?: Maybe<Prop_Value_Tag_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Tags_Max_Fields = {
  __typename?: 'tags_max_fields'
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "tags" */
export type Tags_Max_Order_By = {
  category_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Tags_Min_Fields = {
  __typename?: 'tags_min_fields'
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "tags" */
export type Tags_Min_Order_By = {
  category_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
  __typename?: 'tags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tags>
}

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
  data: Tags_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** on conflict condition type for table "tags" */
export type Tags_On_Conflict = {
  constraint: Tags_Constraint
  update_columns: Array<Tags_Update_Column>
  where?: Maybe<Tags_Bool_Exp>
}

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  category?: Maybe<Categories_Order_By>
  category_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  prop_value_tags_aggregate?: Maybe<Prop_Value_Tag_Aggregate_Order_By>
}

/** primary key columns input for table: tags */
export type Tags_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "tags" */
export type Tags_Set_Input = {
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** update columns of table "tags" */
export enum Tags_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  /** An array relationship */
  apps: Array<Apps>
  /** An aggregate relationship */
  apps_aggregate: Apps_Aggregate
  id: Scalars['String']
  /** An array relationship */
  libraries: Array<Libraries>
  /** An aggregate relationship */
  libraries_aggregate: Libraries_Aggregate
  name?: Maybe<Scalars['String']>
}

/** columns and relationships of "users" */
export type UsersAppsArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersApps_AggregateArgs = {
  distinct_on?: Maybe<Array<Apps_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Apps_Order_By>>
  where?: Maybe<Apps_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersLibrariesArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersLibraries_AggregateArgs = {
  distinct_on?: Maybe<Array<Libraries_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Libraries_Order_By>>
  where?: Maybe<Libraries_Bool_Exp>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>
  _not?: Maybe<Users_Bool_Exp>
  _or?: Maybe<Array<Users_Bool_Exp>>
  apps?: Maybe<Apps_Bool_Exp>
  id?: Maybe<String_Comparison_Exp>
  libraries?: Maybe<Libraries_Bool_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  apps?: Maybe<Apps_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['String']>
  libraries?: Maybe<Libraries_Arr_Rel_Insert_Input>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns: Array<Users_Update_Column>
  where?: Maybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  apps_aggregate?: Maybe<Apps_Aggregate_Order_By>
  id?: Maybe<Order_By>
  libraries_aggregate?: Maybe<Libraries_Aggregate_Order_By>
  name?: Maybe<Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>
  _gt?: Maybe<Scalars['uuid']>
  _gte?: Maybe<Scalars['uuid']>
  _in?: Maybe<Array<Scalars['uuid']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['uuid']>
  _lte?: Maybe<Scalars['uuid']>
  _neq?: Maybe<Scalars['uuid']>
  _nin?: Maybe<Array<Scalars['uuid']>>
}

export type CreateAppMutationVariables = Exact<{
  input: Apps_Insert_Input
}>

export type CreateAppMutation = { __typename?: 'mutation_root' } & {
  insert_apps_one?: Maybe<{ __typename?: 'apps' } & Pick<Apps, 'id'>>
}

export type DeleteAppMutationVariables = Exact<{
  id: Scalars['uuid']
}>

export type DeleteAppMutation = { __typename?: 'mutation_root' } & {
  delete_apps_by_pk?: Maybe<{ __typename?: 'apps' } & Pick<Apps, 'id'>>
}

export type EditAppMutationVariables = Exact<{
  input: Apps_Set_Input
  id: Scalars['uuid']
}>

export type EditAppMutation = { __typename?: 'mutation_root' } & {
  update_apps_by_pk?: Maybe<{ __typename?: 'apps' } & Pick<Apps, 'id' | 'name'>>
}

export type GetAppsListQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsListQuery = { __typename?: 'query_root' } & {
  apps: Array<
    { __typename?: 'apps' } & Pick<Apps, 'id' | 'name'> & {
        pages: Array<{ __typename?: 'pages' } & Pick<Pages, 'id'>>
      }
  >
}

export const CreateAppGql = gql`
  mutation CreateApp($input: apps_insert_input!) {
    insert_apps_one(object: $input) {
      id
    }
  }
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
  mutation DeleteApp($id: uuid!) {
    delete_apps_by_pk(id: $id) {
      id
    }
  }
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
export const EditAppGql = gql`
  mutation EditApp($input: apps_set_input!, $id: uuid!) {
    update_apps_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      name
    }
  }
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
export const GetAppsListGql = gql`
  query GetAppsList {
    apps {
      id
      name
      pages {
        id
      }
    }
  }
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

export const CreateApp = gql`
  mutation CreateApp($input: apps_insert_input!) {
    insert_apps_one(object: $input) {
      id
    }
  }
`
export const DeleteApp = gql`
  mutation DeleteApp($id: uuid!) {
    delete_apps_by_pk(id: $id) {
      id
    }
  }
`
export const EditApp = gql`
  mutation EditApp($input: apps_set_input!, $id: uuid!) {
    update_apps_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      name
    }
  }
`
export const GetAppsList = gql`
  query GetAppsList {
    apps {
      id
      name
      pages {
        id
      }
    }
  }
`
