import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { pageSchema } from './page.schema'
import { tagSchema } from './tag.schema'
import { typeSchema } from './type'
import { userSchema } from './user.schema'

export default print(gql`
  ${commonSchema}

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

  ${typeSchema}

  ${tagSchema}

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
