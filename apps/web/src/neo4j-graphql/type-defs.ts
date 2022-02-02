import { gql } from 'apollo-server-micro'

export default gql`
  type User @exclude(operations: [CREATE, UPDATE, DELETE]) {
    apps: [App] @relationship(type: "OWNED_BY", direction: IN)
  }

  type App {
    id: ID! @id
    owner: [User] @relationship(type: "OWNED_BY", direction: OUT)
    createdAt: DateTime! @readonly @timestamp(operations: [CREATE])
    updatedAt: DateTime @readonly @timestamp(operations: [UPDATE])

    name: String!
    ownerId: String!

    pages: [Page] @relationship(type: "PAGES", direction: IN)
  }

  type Page {
    id: ID! @id
    createdAt: DateTime! @readonly @timestamp(operations: [CREATE])
    updatedAt: DateTime @readonly @timestamp(operations: [UPDATE])

    name: String!
    ownerId: String!

    app: App @relationship(type: "PAGES", direction: OUT)
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
`
