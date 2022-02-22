import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { elementSchema } from './elementSchema'
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

  ${elementSchema}

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
`)
