import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { appSchema } from './type-defs/appSchema'
import { atomSchema } from './type-defs/atomSchema'
import { pageSchema } from './type-defs/pageSchema'
import { userSchema } from './type-defs/userSchema'

export default print(gql`
  scalar JSON
  scalar JSONObject

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

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
