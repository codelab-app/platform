import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { appSchema } from './type-defs/appSchema'
import { atomSchema } from './type-defs/atomSchema'
import { pageSchema } from './type-defs/pageSchema'
import { tagEdgeSchema, tagSchema } from './type-defs/tagSchema'
import { userSchema } from './type-defs/userSchema'

export default print(gql`
  scalar JSON
  scalar JSONObject

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

  ${tagSchema}

  ${tagEdgeSchema}

  union TagVertex = Tag

  interface IGraph {
    vertices: [TagVertex!]!
    edges: [TagEdge!]!
  }

  type TagGraph implements IGraph {
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
        MATCH (t:Tag), path = (:Tag)<-[:Children]-(:Tag)
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

  interface IElementGraph {
    root: Element
    vertices: [Element!]
  }

  type Element {
    id: ID! @id
    createdAt: DateTime! @readonly @timestamp(operations: [CREATE])
    updatedAt: DateTime @readonly @timestamp(operations: [UPDATE])

    name: String!
    ownerId: String!
    parent: Element @relationship(type: "PARENT", direction: IN)
    children: [Element!] @relationship(type: "PARENT", direction: OUT)

    # Experimental, does not work
    graph: IElementGraph!
      @cypher(
        statement: """
        MATCH p = (this)-[r:PARENT 0..]->(x)
        WITH collect(DISTINCT id(x)) as vertices, [r in collect(distinct last(r)) | [id(startNode(r)),id(endNode(r))]] as edges
        RETURN vertices, edges
        """
      )
  }
`)
