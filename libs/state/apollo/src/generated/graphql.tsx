import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  jsonb: any;
  vertex_type_enum: any;
};

export type Query = {
  __typename?: 'Query';
  getAll: Array<VertexEntity>;
  /** fetch data from the table: "edge" */
  edge: Array<Edge>;
  /** fetch aggregated fields from the table: "edge" */
  edge_aggregate: Edge_Aggregate;
  /** fetch data from the table: "edge" using primary key columns */
  edge_by_pk?: Maybe<Edge>;
  /** fetch data from the table: "graph" */
  graph: Array<Graph>;
  /** fetch aggregated fields from the table: "graph" */
  graph_aggregate: Graph_Aggregate;
  /** fetch data from the table: "graph" using primary key columns */
  graph_by_pk?: Maybe<Graph>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vertex" */
  vertex: Array<Vertex>;
  /** fetch aggregated fields from the table: "vertex" */
  vertex_aggregate: Vertex_Aggregate;
  /** fetch data from the table: "vertex" using primary key columns */
  vertex_by_pk?: Maybe<Vertex>;
};


export type QueryEdgeArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


export type QueryEdge_AggregateArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


export type QueryEdge_By_PkArgs = {
  id: Scalars['String'];
};


export type QueryGraphArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


export type QueryGraph_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


export type QueryGraph_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type QueryUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type QueryUser_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryVertexArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


export type QueryVertex_AggregateArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


export type QueryVertex_By_PkArgs = {
  id: Scalars['String'];
};

export type UserEntity = IUser & {
  __typename?: 'UserEntity';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type IUser = {
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type VertexEntity = IVertex & {
  __typename?: 'VertexEntity';
  id: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
};

export type IVertex = {
  id: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
};


export type GraphEntity = IGraph & {
  __typename?: 'GraphEntity';
  id: Scalars['Int'];
  vertices?: Maybe<Array<VertexEntity>>;
  edges?: Maybe<Array<EdgeEntity>>;
  user?: Maybe<UserEntity>;
};

export type IGraph = {
  id: Scalars['Int'];
  vertices?: Maybe<Array<VertexEntity>>;
  edges?: Maybe<Array<EdgeEntity>>;
  user?: Maybe<UserEntity>;
};

export type EdgeEntity = IEdge & {
  __typename?: 'EdgeEntity';
  id: Scalars['String'];
  source: Scalars['String'];
  target: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
};

export type IEdge = {
  id: Scalars['String'];
  source: Scalars['String'];
  target: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** delete data from the table: "edge" */
  delete_edge?: Maybe<Edge_Mutation_Response>;
  /** delete single row from the table: "edge" */
  delete_edge_by_pk?: Maybe<Edge>;
  /** delete data from the table: "graph" */
  delete_graph?: Maybe<Graph_Mutation_Response>;
  /** delete single row from the table: "graph" */
  delete_graph_by_pk?: Maybe<Graph>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "vertex" */
  delete_vertex?: Maybe<Vertex_Mutation_Response>;
  /** delete single row from the table: "vertex" */
  delete_vertex_by_pk?: Maybe<Vertex>;
  /** insert data into the table: "edge" */
  insert_edge?: Maybe<Edge_Mutation_Response>;
  /** insert a single row into the table: "edge" */
  insert_edge_one?: Maybe<Edge>;
  /** insert data into the table: "graph" */
  insert_graph?: Maybe<Graph_Mutation_Response>;
  /** insert a single row into the table: "graph" */
  insert_graph_one?: Maybe<Graph>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "vertex" */
  insert_vertex?: Maybe<Vertex_Mutation_Response>;
  /** insert a single row into the table: "vertex" */
  insert_vertex_one?: Maybe<Vertex>;
  /** update data of the table: "edge" */
  update_edge?: Maybe<Edge_Mutation_Response>;
  /** update single row of the table: "edge" */
  update_edge_by_pk?: Maybe<Edge>;
  /** update data of the table: "graph" */
  update_graph?: Maybe<Graph_Mutation_Response>;
  /** update single row of the table: "graph" */
  update_graph_by_pk?: Maybe<Graph>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "vertex" */
  update_vertex?: Maybe<Vertex_Mutation_Response>;
  /** update single row of the table: "vertex" */
  update_vertex_by_pk?: Maybe<Vertex>;
};


export type MutationDelete_EdgeArgs = {
  where: Edge_Bool_Exp;
};


export type MutationDelete_Edge_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationDelete_GraphArgs = {
  where: Graph_Bool_Exp;
};


export type MutationDelete_Graph_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationDelete_UserArgs = {
  where: User_Bool_Exp;
};


export type MutationDelete_User_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationDelete_VertexArgs = {
  where: Vertex_Bool_Exp;
};


export type MutationDelete_Vertex_By_PkArgs = {
  id: Scalars['String'];
};


export type MutationInsert_EdgeArgs = {
  objects: Array<Edge_Insert_Input>;
  on_conflict?: Maybe<Edge_On_Conflict>;
};


export type MutationInsert_Edge_OneArgs = {
  object: Edge_Insert_Input;
  on_conflict?: Maybe<Edge_On_Conflict>;
};


export type MutationInsert_GraphArgs = {
  objects: Array<Graph_Insert_Input>;
  on_conflict?: Maybe<Graph_On_Conflict>;
};


export type MutationInsert_Graph_OneArgs = {
  object: Graph_Insert_Input;
  on_conflict?: Maybe<Graph_On_Conflict>;
};


export type MutationInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


export type MutationInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


export type MutationInsert_VertexArgs = {
  objects: Array<Vertex_Insert_Input>;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};


export type MutationInsert_Vertex_OneArgs = {
  object: Vertex_Insert_Input;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};


export type MutationUpdate_EdgeArgs = {
  _append?: Maybe<Edge_Append_Input>;
  _delete_at_path?: Maybe<Edge_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Edge_Delete_Elem_Input>;
  _delete_key?: Maybe<Edge_Delete_Key_Input>;
  _inc?: Maybe<Edge_Inc_Input>;
  _prepend?: Maybe<Edge_Prepend_Input>;
  _set?: Maybe<Edge_Set_Input>;
  where: Edge_Bool_Exp;
};


export type MutationUpdate_Edge_By_PkArgs = {
  _append?: Maybe<Edge_Append_Input>;
  _delete_at_path?: Maybe<Edge_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Edge_Delete_Elem_Input>;
  _delete_key?: Maybe<Edge_Delete_Key_Input>;
  _inc?: Maybe<Edge_Inc_Input>;
  _prepend?: Maybe<Edge_Prepend_Input>;
  _set?: Maybe<Edge_Set_Input>;
  pk_columns: Edge_Pk_Columns_Input;
};


export type MutationUpdate_GraphArgs = {
  _inc?: Maybe<Graph_Inc_Input>;
  _set?: Maybe<Graph_Set_Input>;
  where: Graph_Bool_Exp;
};


export type MutationUpdate_Graph_By_PkArgs = {
  _inc?: Maybe<Graph_Inc_Input>;
  _set?: Maybe<Graph_Set_Input>;
  pk_columns: Graph_Pk_Columns_Input;
};


export type MutationUpdate_UserArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


export type MutationUpdate_User_By_PkArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


export type MutationUpdate_VertexArgs = {
  _append?: Maybe<Vertex_Append_Input>;
  _delete_at_path?: Maybe<Vertex_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Vertex_Delete_Elem_Input>;
  _delete_key?: Maybe<Vertex_Delete_Key_Input>;
  _inc?: Maybe<Vertex_Inc_Input>;
  _prepend?: Maybe<Vertex_Prepend_Input>;
  _set?: Maybe<Vertex_Set_Input>;
  where: Vertex_Bool_Exp;
};


export type MutationUpdate_Vertex_By_PkArgs = {
  _append?: Maybe<Vertex_Append_Input>;
  _delete_at_path?: Maybe<Vertex_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Vertex_Delete_Elem_Input>;
  _delete_key?: Maybe<Vertex_Delete_Key_Input>;
  _inc?: Maybe<Vertex_Inc_Input>;
  _prepend?: Maybe<Vertex_Prepend_Input>;
  _set?: Maybe<Vertex_Set_Input>;
  pk_columns: Vertex_Pk_Columns_Input;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** fetch data from the table: "edge" */
  edge: Array<Edge>;
  /** fetch aggregated fields from the table: "edge" */
  edge_aggregate: Edge_Aggregate;
  /** fetch data from the table: "edge" using primary key columns */
  edge_by_pk?: Maybe<Edge>;
  /** fetch data from the table: "graph" */
  graph: Array<Graph>;
  /** fetch aggregated fields from the table: "graph" */
  graph_aggregate: Graph_Aggregate;
  /** fetch data from the table: "graph" using primary key columns */
  graph_by_pk?: Maybe<Graph>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vertex" */
  vertex: Array<Vertex>;
  /** fetch aggregated fields from the table: "vertex" */
  vertex_aggregate: Vertex_Aggregate;
  /** fetch data from the table: "vertex" using primary key columns */
  vertex_by_pk?: Maybe<Vertex>;
};


export type SubscriptionEdgeArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


export type SubscriptionEdge_AggregateArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


export type SubscriptionEdge_By_PkArgs = {
  id: Scalars['String'];
};


export type SubscriptionGraphArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


export type SubscriptionGraph_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


export type SubscriptionGraph_By_PkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type SubscriptionUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type SubscriptionUser_By_PkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionVertexArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


export type SubscriptionVertex_AggregateArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


export type SubscriptionVertex_By_PkArgs = {
  id: Scalars['String'];
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "edge" */
export type Edge = {
  __typename?: 'edge';
  graphId?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  props: Scalars['jsonb'];
  source: Scalars['String'];
  target: Scalars['String'];
};


/** columns and relationships of "edge" */
export type EdgePropsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "edge" */
export type Edge_Aggregate = {
  __typename?: 'edge_aggregate';
  aggregate?: Maybe<Edge_Aggregate_Fields>;
  nodes: Array<Edge>;
};

/** aggregate fields of "edge" */
export type Edge_Aggregate_Fields = {
  __typename?: 'edge_aggregate_fields';
  avg?: Maybe<Edge_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Edge_Max_Fields>;
  min?: Maybe<Edge_Min_Fields>;
  stddev?: Maybe<Edge_Stddev_Fields>;
  stddev_pop?: Maybe<Edge_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Edge_Stddev_Samp_Fields>;
  sum?: Maybe<Edge_Sum_Fields>;
  var_pop?: Maybe<Edge_Var_Pop_Fields>;
  var_samp?: Maybe<Edge_Var_Samp_Fields>;
  variance?: Maybe<Edge_Variance_Fields>;
};


/** aggregate fields of "edge" */
export type Edge_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Edge_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "edge" */
export type Edge_Aggregate_Order_By = {
  avg?: Maybe<Edge_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Edge_Max_Order_By>;
  min?: Maybe<Edge_Min_Order_By>;
  stddev?: Maybe<Edge_Stddev_Order_By>;
  stddev_pop?: Maybe<Edge_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Edge_Stddev_Samp_Order_By>;
  sum?: Maybe<Edge_Sum_Order_By>;
  var_pop?: Maybe<Edge_Var_Pop_Order_By>;
  var_samp?: Maybe<Edge_Var_Samp_Order_By>;
  variance?: Maybe<Edge_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Edge_Append_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "edge" */
export type Edge_Arr_Rel_Insert_Input = {
  data: Array<Edge_Insert_Input>;
  on_conflict?: Maybe<Edge_On_Conflict>;
};

/** aggregate avg on columns */
export type Edge_Avg_Fields = {
  __typename?: 'edge_avg_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "edge" */
export type Edge_Avg_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "edge". All fields are combined with a logical 'AND'. */
export type Edge_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Edge_Bool_Exp>>>;
  _not?: Maybe<Edge_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Edge_Bool_Exp>>>;
  graphId?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  props?: Maybe<Jsonb_Comparison_Exp>;
  source?: Maybe<String_Comparison_Exp>;
  target?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "edge" */
export enum Edge_Constraint {
  /** unique or primary key constraint */
  PK_bf6f43c9af56d05094d8c57b311 = 'PK_bf6f43c9af56d05094d8c57b311'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Edge_Delete_At_Path_Input = {
  props?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Edge_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Edge_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "edge" */
export type Edge_Inc_Input = {
  graphId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "edge" */
export type Edge_Insert_Input = {
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['jsonb']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Edge_Max_Fields = {
  __typename?: 'edge_max_fields';
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "edge" */
export type Edge_Max_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Edge_Min_Fields = {
  __typename?: 'edge_min_fields';
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "edge" */
export type Edge_Min_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** response of any mutation on the table "edge" */
export type Edge_Mutation_Response = {
  __typename?: 'edge_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Edge>;
};

/** input type for inserting object relation for remote table "edge" */
export type Edge_Obj_Rel_Insert_Input = {
  data: Edge_Insert_Input;
  on_conflict?: Maybe<Edge_On_Conflict>;
};

/** on conflict condition type for table "edge" */
export type Edge_On_Conflict = {
  constraint: Edge_Constraint;
  update_columns: Array<Edge_Update_Column>;
  where?: Maybe<Edge_Bool_Exp>;
};

/** ordering options when selecting data from "edge" */
export type Edge_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  props?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** primary key columns input for table: "edge" */
export type Edge_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Edge_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "edge" */
export enum Edge_Select_Column {
  /** column name */
  graphId = 'graphId',
  /** column name */
  id = 'id',
  /** column name */
  props = 'props',
  /** column name */
  source = 'source',
  /** column name */
  target = 'target'
}

/** input type for updating data in table "edge" */
export type Edge_Set_Input = {
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['jsonb']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Edge_Stddev_Fields = {
  __typename?: 'edge_stddev_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "edge" */
export type Edge_Stddev_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Edge_Stddev_Pop_Fields = {
  __typename?: 'edge_stddev_pop_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "edge" */
export type Edge_Stddev_Pop_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Edge_Stddev_Samp_Fields = {
  __typename?: 'edge_stddev_samp_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "edge" */
export type Edge_Stddev_Samp_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Edge_Sum_Fields = {
  __typename?: 'edge_sum_fields';
  graphId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "edge" */
export type Edge_Sum_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** update columns of table "edge" */
export enum Edge_Update_Column {
  /** column name */
  graphId = 'graphId',
  /** column name */
  id = 'id',
  /** column name */
  props = 'props',
  /** column name */
  source = 'source',
  /** column name */
  target = 'target'
}

/** aggregate var_pop on columns */
export type Edge_Var_Pop_Fields = {
  __typename?: 'edge_var_pop_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "edge" */
export type Edge_Var_Pop_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Edge_Var_Samp_Fields = {
  __typename?: 'edge_var_samp_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "edge" */
export type Edge_Var_Samp_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Edge_Variance_Fields = {
  __typename?: 'edge_variance_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "edge" */
export type Edge_Variance_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** columns and relationships of "graph" */
export type Graph = {
  __typename?: 'graph';
  id: Scalars['Int'];
  label: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "graph" */
export type Graph_Aggregate = {
  __typename?: 'graph_aggregate';
  aggregate?: Maybe<Graph_Aggregate_Fields>;
  nodes: Array<Graph>;
};

/** aggregate fields of "graph" */
export type Graph_Aggregate_Fields = {
  __typename?: 'graph_aggregate_fields';
  avg?: Maybe<Graph_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Graph_Max_Fields>;
  min?: Maybe<Graph_Min_Fields>;
  stddev?: Maybe<Graph_Stddev_Fields>;
  stddev_pop?: Maybe<Graph_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Graph_Stddev_Samp_Fields>;
  sum?: Maybe<Graph_Sum_Fields>;
  var_pop?: Maybe<Graph_Var_Pop_Fields>;
  var_samp?: Maybe<Graph_Var_Samp_Fields>;
  variance?: Maybe<Graph_Variance_Fields>;
};


/** aggregate fields of "graph" */
export type Graph_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Graph_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "graph" */
export type Graph_Aggregate_Order_By = {
  avg?: Maybe<Graph_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Graph_Max_Order_By>;
  min?: Maybe<Graph_Min_Order_By>;
  stddev?: Maybe<Graph_Stddev_Order_By>;
  stddev_pop?: Maybe<Graph_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Graph_Stddev_Samp_Order_By>;
  sum?: Maybe<Graph_Sum_Order_By>;
  var_pop?: Maybe<Graph_Var_Pop_Order_By>;
  var_samp?: Maybe<Graph_Var_Samp_Order_By>;
  variance?: Maybe<Graph_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "graph" */
export type Graph_Arr_Rel_Insert_Input = {
  data: Array<Graph_Insert_Input>;
  on_conflict?: Maybe<Graph_On_Conflict>;
};

/** aggregate avg on columns */
export type Graph_Avg_Fields = {
  __typename?: 'graph_avg_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "graph" */
export type Graph_Avg_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "graph". All fields are combined with a logical 'AND'. */
export type Graph_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Graph_Bool_Exp>>>;
  _not?: Maybe<Graph_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Graph_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  label?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "graph" */
export enum Graph_Constraint {
  /** unique or primary key constraint */
  PK_eb3e36eefae596e0ba9122fff16 = 'PK_eb3e36eefae596e0ba9122fff16'
}

/** input type for incrementing integer column in table "graph" */
export type Graph_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "graph" */
export type Graph_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Graph_Max_Fields = {
  __typename?: 'graph_max_fields';
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "graph" */
export type Graph_Max_Order_By = {
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Graph_Min_Fields = {
  __typename?: 'graph_min_fields';
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "graph" */
export type Graph_Min_Order_By = {
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** response of any mutation on the table "graph" */
export type Graph_Mutation_Response = {
  __typename?: 'graph_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Graph>;
};

/** input type for inserting object relation for remote table "graph" */
export type Graph_Obj_Rel_Insert_Input = {
  data: Graph_Insert_Input;
  on_conflict?: Maybe<Graph_On_Conflict>;
};

/** on conflict condition type for table "graph" */
export type Graph_On_Conflict = {
  constraint: Graph_Constraint;
  update_columns: Array<Graph_Update_Column>;
  where?: Maybe<Graph_Bool_Exp>;
};

/** ordering options when selecting data from "graph" */
export type Graph_Order_By = {
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** primary key columns input for table: "graph" */
export type Graph_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "graph" */
export enum Graph_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  userId = 'userId'
}

/** input type for updating data in table "graph" */
export type Graph_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Graph_Stddev_Fields = {
  __typename?: 'graph_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "graph" */
export type Graph_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Graph_Stddev_Pop_Fields = {
  __typename?: 'graph_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "graph" */
export type Graph_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Graph_Stddev_Samp_Fields = {
  __typename?: 'graph_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "graph" */
export type Graph_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Graph_Sum_Fields = {
  __typename?: 'graph_sum_fields';
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "graph" */
export type Graph_Sum_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** update columns of table "graph" */
export enum Graph_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  userId = 'userId'
}

/** aggregate var_pop on columns */
export type Graph_Var_Pop_Fields = {
  __typename?: 'graph_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "graph" */
export type Graph_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Graph_Var_Samp_Fields = {
  __typename?: 'graph_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "graph" */
export type Graph_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Graph_Variance_Fields = {
  __typename?: 'graph_variance_fields';
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "graph" */
export type Graph_Variance_Order_By = {
  id?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  asc = 'asc',
  /** in the ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in the descending order, nulls first */
  desc = 'desc',
  /** in the descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in the descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last'
}

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  id: Scalars['Int'];
  username: Scalars['String'];
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
  stddev?: Maybe<User_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Sum_Order_By>;
  var_pop?: Maybe<User_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Var_Samp_Order_By>;
  variance?: Maybe<User_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  PK_cace4a159ff9f2512dd42373760 = 'PK_cace4a159ff9f2512dd42373760'
}

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  username = 'username'
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "vertex" */
export type Vertex = {
  __typename?: 'vertex';
  graphId?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  props: Scalars['jsonb'];
  type: Scalars['vertex_type_enum'];
};


/** columns and relationships of "vertex" */
export type VertexPropsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "vertex" */
export type Vertex_Aggregate = {
  __typename?: 'vertex_aggregate';
  aggregate?: Maybe<Vertex_Aggregate_Fields>;
  nodes: Array<Vertex>;
};

/** aggregate fields of "vertex" */
export type Vertex_Aggregate_Fields = {
  __typename?: 'vertex_aggregate_fields';
  avg?: Maybe<Vertex_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Vertex_Max_Fields>;
  min?: Maybe<Vertex_Min_Fields>;
  stddev?: Maybe<Vertex_Stddev_Fields>;
  stddev_pop?: Maybe<Vertex_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vertex_Stddev_Samp_Fields>;
  sum?: Maybe<Vertex_Sum_Fields>;
  var_pop?: Maybe<Vertex_Var_Pop_Fields>;
  var_samp?: Maybe<Vertex_Var_Samp_Fields>;
  variance?: Maybe<Vertex_Variance_Fields>;
};


/** aggregate fields of "vertex" */
export type Vertex_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Vertex_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "vertex" */
export type Vertex_Aggregate_Order_By = {
  avg?: Maybe<Vertex_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Vertex_Max_Order_By>;
  min?: Maybe<Vertex_Min_Order_By>;
  stddev?: Maybe<Vertex_Stddev_Order_By>;
  stddev_pop?: Maybe<Vertex_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Vertex_Stddev_Samp_Order_By>;
  sum?: Maybe<Vertex_Sum_Order_By>;
  var_pop?: Maybe<Vertex_Var_Pop_Order_By>;
  var_samp?: Maybe<Vertex_Var_Samp_Order_By>;
  variance?: Maybe<Vertex_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vertex_Append_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "vertex" */
export type Vertex_Arr_Rel_Insert_Input = {
  data: Array<Vertex_Insert_Input>;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};

/** aggregate avg on columns */
export type Vertex_Avg_Fields = {
  __typename?: 'vertex_avg_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "vertex" */
export type Vertex_Avg_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "vertex". All fields are combined with a logical 'AND'. */
export type Vertex_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Vertex_Bool_Exp>>>;
  _not?: Maybe<Vertex_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Vertex_Bool_Exp>>>;
  graphId?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  props?: Maybe<Jsonb_Comparison_Exp>;
  type?: Maybe<Vertex_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "vertex" */
export enum Vertex_Constraint {
  /** unique or primary key constraint */
  PK_c8ba7ae73ad81b9f3991ad76684 = 'PK_c8ba7ae73ad81b9f3991ad76684'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vertex_Delete_At_Path_Input = {
  props?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vertex_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vertex_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "vertex" */
export type Vertex_Inc_Input = {
  graphId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "vertex" */
export type Vertex_Insert_Input = {
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['vertex_type_enum']>;
};

/** aggregate max on columns */
export type Vertex_Max_Fields = {
  __typename?: 'vertex_max_fields';
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "vertex" */
export type Vertex_Max_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Vertex_Min_Fields = {
  __typename?: 'vertex_min_fields';
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "vertex" */
export type Vertex_Min_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "vertex" */
export type Vertex_Mutation_Response = {
  __typename?: 'vertex_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Vertex>;
};

/** input type for inserting object relation for remote table "vertex" */
export type Vertex_Obj_Rel_Insert_Input = {
  data: Vertex_Insert_Input;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};

/** on conflict condition type for table "vertex" */
export type Vertex_On_Conflict = {
  constraint: Vertex_Constraint;
  update_columns: Array<Vertex_Update_Column>;
  where?: Maybe<Vertex_Bool_Exp>;
};

/** ordering options when selecting data from "vertex" */
export type Vertex_Order_By = {
  graphId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  props?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: "vertex" */
export type Vertex_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vertex_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "vertex" */
export enum Vertex_Select_Column {
  /** column name */
  graphId = 'graphId',
  /** column name */
  id = 'id',
  /** column name */
  props = 'props',
  /** column name */
  type = 'type'
}

/** input type for updating data in table "vertex" */
export type Vertex_Set_Input = {
  graphId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  props?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['vertex_type_enum']>;
};

/** aggregate stddev on columns */
export type Vertex_Stddev_Fields = {
  __typename?: 'vertex_stddev_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "vertex" */
export type Vertex_Stddev_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Vertex_Stddev_Pop_Fields = {
  __typename?: 'vertex_stddev_pop_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "vertex" */
export type Vertex_Stddev_Pop_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Vertex_Stddev_Samp_Fields = {
  __typename?: 'vertex_stddev_samp_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "vertex" */
export type Vertex_Stddev_Samp_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Vertex_Sum_Fields = {
  __typename?: 'vertex_sum_fields';
  graphId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "vertex" */
export type Vertex_Sum_Order_By = {
  graphId?: Maybe<Order_By>;
};


/** expression to compare columns of type vertex_type_enum. All fields are combined with logical 'AND'. */
export type Vertex_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['vertex_type_enum']>;
  _gt?: Maybe<Scalars['vertex_type_enum']>;
  _gte?: Maybe<Scalars['vertex_type_enum']>;
  _in?: Maybe<Array<Scalars['vertex_type_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['vertex_type_enum']>;
  _lte?: Maybe<Scalars['vertex_type_enum']>;
  _neq?: Maybe<Scalars['vertex_type_enum']>;
  _nin?: Maybe<Array<Scalars['vertex_type_enum']>>;
};

/** update columns of table "vertex" */
export enum Vertex_Update_Column {
  /** column name */
  graphId = 'graphId',
  /** column name */
  id = 'id',
  /** column name */
  props = 'props',
  /** column name */
  type = 'type'
}

/** aggregate var_pop on columns */
export type Vertex_Var_Pop_Fields = {
  __typename?: 'vertex_var_pop_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "vertex" */
export type Vertex_Var_Pop_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Vertex_Var_Samp_Fields = {
  __typename?: 'vertex_var_samp_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "vertex" */
export type Vertex_Var_Samp_Order_By = {
  graphId?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Vertex_Variance_Fields = {
  __typename?: 'vertex_variance_fields';
  graphId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "vertex" */
export type Vertex_Variance_Order_By = {
  graphId?: Maybe<Order_By>;
};

export type GraphsQueryVariables = Exact<{ [key: string]: never; }>;


export type GraphsQuery = (
  { __typename?: 'Query' }
  & { graph: Array<(
    { __typename?: 'graph' }
    & Pick<Graph, 'id' | 'label'>
  )> }
);

export type CreateGraphMutationVariables = Exact<{
  input: Graph_Insert_Input;
}>;


export type CreateGraphMutation = (
  { __typename?: 'Mutation' }
  & { insert_graph_one?: Maybe<(
    { __typename?: 'graph' }
    & Pick<Graph, 'id'>
  )> }
);


export const GraphsDocument = gql`
    query graphs {
  graph {
    id
    label
  }
}
    `;

/**
 * __useGraphsQuery__
 *
 * To run a query within a React component, call `useGraphsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGraphsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGraphsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGraphsQuery(baseOptions?: Apollo.QueryHookOptions<GraphsQuery, GraphsQueryVariables>) {
        return Apollo.useQuery<GraphsQuery, GraphsQueryVariables>(GraphsDocument, baseOptions);
      }
export function useGraphsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GraphsQuery, GraphsQueryVariables>) {
          return Apollo.useLazyQuery<GraphsQuery, GraphsQueryVariables>(GraphsDocument, baseOptions);
        }
export type GraphsQueryHookResult = ReturnType<typeof useGraphsQuery>;
export type GraphsLazyQueryHookResult = ReturnType<typeof useGraphsLazyQuery>;
export type GraphsQueryResult = Apollo.QueryResult<GraphsQuery, GraphsQueryVariables>;
export const CreateGraphDocument = gql`
    mutation createGraph($input: graph_insert_input!) {
  insert_graph_one(object: $input) {
    id
  }
}
    `;
export type CreateGraphMutationFn = Apollo.MutationFunction<CreateGraphMutation, CreateGraphMutationVariables>;

/**
 * __useCreateGraphMutation__
 *
 * To run a mutation, you first call `useCreateGraphMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGraphMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGraphMutation, { data, loading, error }] = useCreateGraphMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGraphMutation(baseOptions?: Apollo.MutationHookOptions<CreateGraphMutation, CreateGraphMutationVariables>) {
        return Apollo.useMutation<CreateGraphMutation, CreateGraphMutationVariables>(CreateGraphDocument, baseOptions);
      }
export type CreateGraphMutationHookResult = ReturnType<typeof useCreateGraphMutation>;
export type CreateGraphMutationResult = Apollo.MutationResult<CreateGraphMutation>;
export type CreateGraphMutationOptions = Apollo.BaseMutationOptions<CreateGraphMutation, CreateGraphMutationVariables>;