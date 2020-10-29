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
};

/** Generated Date object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDate = {
  __typename?: '_Neo4jDate';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Date value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Date input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Date value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/date/#functions-date-create-string). */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated DateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDateTime = {
  __typename?: '_Neo4jDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) DateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated DateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) DateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/datetime/#functions-datetime-create-string). */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalDateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalDateTime = {
  __typename?: '_Neo4jLocalDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalDateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalDateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalDateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localdatetime/#functions-localdatetime-create-string). */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalTime = {
  __typename?: '_Neo4jLocalTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localtime/#functions-localtime-create-string). */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Point object type for Neo4j [Spatial fields](https://grandstack.io/docs/graphql-spatial-types#using-point-in-queries). */
export type _Neo4jPoint = {
  __typename?: '_Neo4jPoint';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

export type _Neo4jPointDistanceFilter = {
  point: _Neo4jPointInput;
  distance: Scalars['Float'];
};

/** Generated Point input object for Neo4j [Spatial field arguments](https://grandstack.io/docs/graphql-spatial-types/#point-query-arguments). */
export type _Neo4jPointInput = {
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

/** Generated Time object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jTime = {
  __typename?: '_Neo4jTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Time value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Time input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Time value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/time/#functions-time-create-string). */
  formatted?: Maybe<Scalars['String']>;
};

export type _NodeFilter = {
  AND?: Maybe<Array<_NodeFilter>>;
  OR?: Maybe<Array<_NodeFilter>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  type?: Maybe<NodeType>;
  type_not?: Maybe<NodeType>;
  type_in?: Maybe<Array<NodeType>>;
  type_not_in?: Maybe<Array<NodeType>>;
};

export type _NodeInput = {
  id: Scalars['ID'];
};

export enum _NodeOrdering {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  type_asc = 'type_asc',
  type_desc = 'type_desc',
  _id_asc = '_id_asc',
  _id_desc = '_id_desc'
}

export enum _RelationDirections {
  IN = 'IN',
  OUT = 'OUT'
}

export type Node = {
  __typename?: 'Node';
  id: Scalars['ID'];
  type: NodeType;
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
};

export type NodeCreateInput = {
  type: NodeType;
};

export enum NodeType {
  REACT_BUTTON = 'REACT_BUTTON',
  REACT_DIV = 'REACT_DIV'
}


export type Prop = {
  __typename?: 'Prop';
  id: Scalars['ID'];
  values: Scalars['JSONObject'];
};

export type Query = {
  __typename?: 'Query';
  getNode: Node;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for Node type nodes. */
  Node?: Maybe<Array<Maybe<Node>>>;
  prop: Prop;
};


export type QueryGetNodeArgs = {
  filter?: Maybe<_NodeFilter>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<NodeType>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_NodeOrdering>>>;
  filter?: Maybe<_NodeFilter>;
};


export type QueryPropArgs = {
  id: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  nodeCreate: Node;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a Node node. */
  CreateNode?: Maybe<Node>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a Node node. */
  UpdateNode?: Maybe<Node>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a Node node. */
  DeleteNode?: Maybe<Node>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a Node node. */
  MergeNode?: Maybe<Node>;
};


export type MutationNodeCreateArgs = {
  input: NodeCreateInput;
};


export type MutationCreateNodeArgs = {
  id?: Maybe<Scalars['ID']>;
  type: NodeType;
};


export type MutationUpdateNodeArgs = {
  id: Scalars['ID'];
  type?: Maybe<NodeType>;
};


export type MutationDeleteNodeArgs = {
  id: Scalars['ID'];
};


export type MutationMergeNodeArgs = {
  id: Scalars['ID'];
  type?: Maybe<NodeType>;
};

export type NodeCreateMutationVariables = Exact<{
  type: NodeType;
}>;


export type NodeCreateMutation = (
  { __typename?: 'Mutation' }
  & { CreateNode?: Maybe<(
    { __typename?: 'Node' }
    & Pick<Node, 'id' | 'type'>
  )> }
);

export type NodeDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NodeDeleteMutation = (
  { __typename?: 'Mutation' }
  & { DeleteNode?: Maybe<(
    { __typename?: 'Node' }
    & Pick<Node, 'id'>
  )> }
);

export type NodesQueryVariables = Exact<{ [key: string]: never; }>;


export type NodesQuery = (
  { __typename?: 'Query' }
  & { Node?: Maybe<Array<Maybe<(
    { __typename?: 'Node' }
    & Pick<Node, 'id' | 'type'>
  )>>> }
);


export const NodeCreateDocument = gql`
    mutation nodeCreate($type: NodeType!) {
  CreateNode(type: $type) {
    id
    type
  }
}
    `;
export type NodeCreateMutationFn = Apollo.MutationFunction<NodeCreateMutation, NodeCreateMutationVariables>;

/**
 * __useNodeCreateMutation__
 *
 * To run a mutation, you first call `useNodeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNodeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nodeCreateMutation, { data, loading, error }] = useNodeCreateMutation({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useNodeCreateMutation(baseOptions?: Apollo.MutationHookOptions<NodeCreateMutation, NodeCreateMutationVariables>) {
        return Apollo.useMutation<NodeCreateMutation, NodeCreateMutationVariables>(NodeCreateDocument, baseOptions);
      }
export type NodeCreateMutationHookResult = ReturnType<typeof useNodeCreateMutation>;
export type NodeCreateMutationResult = Apollo.MutationResult<NodeCreateMutation>;
export type NodeCreateMutationOptions = Apollo.BaseMutationOptions<NodeCreateMutation, NodeCreateMutationVariables>;
export const NodeDeleteDocument = gql`
    mutation nodeDelete($id: ID!) {
  DeleteNode(id: $id) {
    id
  }
}
    `;
export type NodeDeleteMutationFn = Apollo.MutationFunction<NodeDeleteMutation, NodeDeleteMutationVariables>;

/**
 * __useNodeDeleteMutation__
 *
 * To run a mutation, you first call `useNodeDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNodeDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nodeDeleteMutation, { data, loading, error }] = useNodeDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNodeDeleteMutation(baseOptions?: Apollo.MutationHookOptions<NodeDeleteMutation, NodeDeleteMutationVariables>) {
        return Apollo.useMutation<NodeDeleteMutation, NodeDeleteMutationVariables>(NodeDeleteDocument, baseOptions);
      }
export type NodeDeleteMutationHookResult = ReturnType<typeof useNodeDeleteMutation>;
export type NodeDeleteMutationResult = Apollo.MutationResult<NodeDeleteMutation>;
export type NodeDeleteMutationOptions = Apollo.BaseMutationOptions<NodeDeleteMutation, NodeDeleteMutationVariables>;
export const NodesDocument = gql`
    query nodes {
  Node {
    id
    type
  }
}
    `;

/**
 * __useNodesQuery__
 *
 * To run a query within a React component, call `useNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNodesQuery(baseOptions?: Apollo.QueryHookOptions<NodesQuery, NodesQueryVariables>) {
        return Apollo.useQuery<NodesQuery, NodesQueryVariables>(NodesDocument, baseOptions);
      }
export function useNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NodesQuery, NodesQueryVariables>) {
          return Apollo.useLazyQuery<NodesQuery, NodesQueryVariables>(NodesDocument, baseOptions);
        }
export type NodesQueryHookResult = ReturnType<typeof useNodesQuery>;
export type NodesLazyQueryHookResult = ReturnType<typeof useNodesLazyQuery>;
export type NodesQueryResult = Apollo.QueryResult<NodesQuery, NodesQueryVariables>;