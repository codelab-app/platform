import { gql } from 'apollo-server-micro'

// relationships
const CHILD_OF_ELEMENT = 'CHILD_OF_ELEMENT'
const INSTANCE_OF_COMPONENT = 'INSTANCE_OF_COMPONENT'
const COMPONENT_TAGGED_WITH = 'COMPONENT_TAGGED_WITH'
const RENDER_ATOM = 'RENDER_ATOM'
const BIND_PROPS_TO_ELEMENT = 'BIND_PROPS_TO_ELEMENT'
// relationships properties
const CHILD_OF_ELEMENT_PROPERTIES = 'ChildOfElement'

const graphCypher = `
    MATCH path = (this)<-[:CHILD_OF_ELEMENT *]-(child:Element)
    WITH 
        properties(this) as rootElement,
        collect(DISTINCT properties(child))  as vertices,
        [relation in relationships(path) |
              {
                source: properties(endNode(relation)).id,
                target: properties(startNode(relation)).id,
                order:  properties(relation).order
              }
        ] as edges
    WITH 
      rootElement,
      collect(DISTINCT vertices) as groupedVerticesArrays,
      collect(DISTINCT edges) as groupedEdgesArrays
    WITH 
      rootElement,
      apoc.coll.toSet(reduce(accumulator = [], v IN groupedVerticesArrays | accumulator + v)) as mergedVertices,
      apoc.coll.toSet(reduce(accumulator = [], e IN groupedEdgesArrays | accumulator + e)) as mergedEdges
      RETURN {vertices:mergedVertices+[rootElement]  , edges:mergedEdges}
`

export const elementSchema = gql`
  type ElementEdge {
    source: String!
    target: String!
    order: Int!
  }

  type IElementGraph {
    vertices: [Element!]
    edges: [ElementEdge!]
  }

  type PropMapBinding {
    id: ID! @id
    targetElement: Element 
      @relationship(
        type: "${BIND_PROPS_TO_ELEMENT}", 
        direction: OUT
      )
    sourceKey: String! # Set to '*' to bind all incoming props
    targetKey: String! # Set to '*' to spread the incoming props to the outgoing ones
  }

  interface ${CHILD_OF_ELEMENT_PROPERTIES} @relationshipProperties {
    order: Int!
  }

  type Element {
    id: ID! @id
    
    children: [Element!]
      @relationship(
        type: "${CHILD_OF_ELEMENT}", 
        properties: "${CHILD_OF_ELEMENT_PROPERTIES}", 
        direction: IN 
      )

    parentElement: Element
      @relationship(
        type: "${CHILD_OF_ELEMENT}", 
        properties: "${CHILD_OF_ELEMENT_PROPERTIES}", 
        direction: OUT 
      )


    # fixedId: String!, // This could be no longer needed with neo4j
    name: String
    css: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfPropKey: String

    instanceOfComponent: Element
      @relationship(
        type: "${INSTANCE_OF_COMPONENT}", 
        direction: OUT
      )

    # Marks this element as a component
    componentTag: Tag @relationship(type: "${COMPONENT_TAGGED_WITH}", direction: OUT)

    atom: Atom @relationship(type: "${RENDER_ATOM}", direction: OUT)

    props: String
    hooks: [String!]
    propMapBindings: [PropMapBinding!]

    graph: IElementGraph @cypher(statement: """${graphCypher}""")
  }
`
