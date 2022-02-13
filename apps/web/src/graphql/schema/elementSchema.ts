import { gql } from 'apollo-server-micro'

export const elementEdgeSchema = gql`
  type ElementEdge {
    source: String!
    target: String!
    order: Int!
  }
`

export const elementGraphSchema = gql`
  type ElementGraph {
    edges: [ElementEdge!]!
    vertices: [Element!]!
  }
`

export const propsMapBindingSchema = gql`
  type PropMapBinding {
    id: ID! @id
    targetElement: Element
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: OUT)
    sourceKey: String! # Set to '*' to bind all incoming props
    targetKey: String! # Set to '*' to spread the incoming props to the outgoing ones
  }
`

export const elementSchema = gql`
  interface ParentOfElement @relationshipProperties {
    order: Int!
  }

  type Element {
    id: ID! @id

    children: [Element!]
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: OUT
      )

    parentElement: Element
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: IN
      )

    # fixedId: String!, // This could be no longer needed with neo4j
    name: String
    css: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfPropKey: String

    instanceOfComponent: Element
      @relationship(type: "INSTANCE_OF_COMPONENT", direction: OUT)

    # Marks this element as a component
    componentTag: Tag
      @relationship(type: "COMPONENT_TAGGED_WITH", direction: OUT)

    atom: Atom @relationship(type: "RENDER_ATOM", direction: OUT)

    props: String
    hooks: [String!]
    propMapBindings: [PropMapBinding!]

    graph: ElementGraph
      @cypher(
        statement: """
        CALL apoc.path.subgraphAll(this, {relationshipFilter: 'PARENT_OF_ELEMENT>'}
        ) YIELD nodes, relationships
        RETURN {
          vertices: [node in nodes | properties(node)],
          edges: [rel in relationships | {
              source: startNode(rel).id,
              target: endNode(rel).id,
              order: properties(rel).order
            }
          ]
        }
        """
      )
  }
`

export const elementMutationsSchema = gql`
  type DuplicateElementMutationResponse
    @exclude(operations: [CREATE, READ, UPDATE, DELETE]) {
    elements: [Element!]!
  }

  type Mutation {
    duplicateElement(elementId: String!): DuplicateElementMutationResponse!
      @cypher(
        statement: """
        MATCH (parentNode:Element)-[rootLink:PARENT_OF_ELEMENT]->(element:Element {id: $elementId})
        CALL apoc.path.subgraphAll(element,
                                  {relationshipFilter: 'PARENT_OF_ELEMENT>' }
        ) YIELD nodes, relationships
        CALL apoc.refactor.cloneSubgraph(
          nodes + [parentNode],
          relationships + [rootLink],
          {
            skipProperties:['id'],
            standinNodes:[[parentNode,parentNode]]
          }
        )
        YIELD input, output as createdNode, error
        SET createdNode.id = apoc.create.uuid()
        WITH createdNode
        MATCH (createdNode)<-[r:PARENT_OF_ELEMENT]-(p:Element)
        WITH {order:r.order} as edge,
          apoc.map.merge(createdNode,{
          parentElement:{id:p.id,name:properties(p).name},
          parentElementConnection:{
            edges: [{order:r.order}]
          }
        }) as createdNode
        RETURN  {elements: collect(createdNode)}
        """
      )
  }
`
