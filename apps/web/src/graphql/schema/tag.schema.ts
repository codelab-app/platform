import { gql } from 'apollo-server-micro'

export const tagSchema = gql`
  type Tag {
    id: ID! @id
    name: String!
    isRoot: Boolean
    parent: Tag @relationship(type: "Children", direction: IN)
    children: [Tag!] @relationship(type: "Children", direction: OUT)
  }

  # should be removed, added as a workaround to fix the build issue
  type TagGraphOptions @exclude {
    sort: Int
    limit: Int
  }

  type TagEdge {
    source: ID!
    target: ID!
  }

  # Have ogm generation issue if using type
  type TagGraph @exclude {
    """
    All descendant Elements or Components, at any level
    """
    vertices: [Tag!]!
    """
    All the links connecting the descendant elements/components
    """
    edges: [TagEdge!]!
  }

  type Query {
    tagGraphs: TagGraph
      @cypher(
        statement: """
        MATCH (t:Tag)
        OPTIONAL MATCH path = (:Tag)<-[:Children]-(:Tag)
        WITH
        properties(t) as vertices,
        [relation in relationships(path) |
        {
        source: properties(startNode(relation)).id,
        target: properties(endNode(relation)).id
        }
        ] as edges
        WITH
        collect(DISTINCT vertices) as groupedVerticesArrays,
        collect(DISTINCT edges) as groupedEdgesArrays
        WITH
        apoc.coll.toSet(reduce(accumulator = [], v IN groupedVerticesArrays | accumulator + v)) as mergedVertices,
        apoc.coll.toSet(reduce(accumulator = [], e IN groupedEdgesArrays | accumulator + e)) as mergedEdges
        RETURN {vertices:mergedVertices, edges:mergedEdges}
        """
      )
  }
`
