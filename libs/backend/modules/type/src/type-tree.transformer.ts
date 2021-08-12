import {
  breadthFirstTraversal,
  CytoscapeService,
  DgraphInterfaceType,
  DgraphType,
  isDgraphArrayType,
  isDgraphInterfaceType,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import cytoscape, { Core } from 'cytoscape'
import { FieldMapper, TypeMapperFactory } from './mappers'
import { Type, TypeEdge, TypeEdgeKind, TypeGraph } from './models'

@Injectable()
export class TypeTreeTransformer {
  constructor(
    private typeMapperFactory: TypeMapperFactory,
    private cytoscapeService: CytoscapeService,
    private fieldMapper: FieldMapper,
  ) {}

  /**
   * Transforms a {@link DgraphInterfaceType} to an {@link TypeGraph}
   * @param root
   */
  async toGraph(root: DgraphInterfaceType) {
    return this.cyToGraph(await this.toCytoscape(root))
  }

  async toCytoscape(root: DgraphInterfaceType) {
    const cy = cytoscape()

    cy.add({
      data: {
        id: root.uid,
        type: root,
      },
    })

    await breadthFirstTraversal<DgraphType<any>>({
      root,
      extractId: (el) => el.uid,
      visit: async (type) => {
        if (isDgraphInterfaceType(type)) {
          const fields = (type as DgraphInterfaceType).fields || []

          // We need to add the child types before the edges, because cytoscape complains otherwise
          fields.forEach((field) => {
            if (cy.getElementById(field.type.uid).empty()) {
              cy.add({
                data: {
                  id: field.type.uid,
                  parent: type.uid,
                  type: field.type,
                },
              })
            }

            if (cy.getElementById(field.uid).empty()) {
              cy.add({
                data: {
                  id: field.uid,
                  source: type.uid,
                  target: field.type.uid,
                  kind: TypeEdgeKind.Field,
                  field,
                },
              })
            }
          })

          return fields
            .map((f) => f.type)
            .slice()
            .sort((a, b) => b.uid.localeCompare(a.uid))
        }

        if (isDgraphArrayType(type)) {
          const itemType = type.itemType

          // We need to add the child type before the edge, because cytoscape complains otherwise
          if (cy.getElementById(itemType.uid).empty()) {
            cy.add({
              data: {
                id: itemType.uid,
                parent: type.uid,
                type: itemType,
              },
            })
          }

          cy.add({
            data: {
              source: type.uid,
              target: itemType.uid,
              kind: TypeEdgeKind.ArrayItem,
            },
          })

          return [itemType]
        }

        return undefined
      },
    })

    return cy
  }

  async cyToGraph(cy: Core): Promise<TypeGraph> {
    const { edges, vertices } = await this.cytoscapeService.treeToGraph<
      Type,
      TypeEdge
    >(
      cy,
      (node) => {
        const typeMapper = this.typeMapperFactory.getMapper(node.type)

        return typeMapper.map(node.type)
      },
      async (edgeData) => {
        const field = edgeData.field
          ? await this.fieldMapper.map(edgeData.field)
          : undefined

        return new TypeEdge(
          edgeData.source,
          edgeData.target,
          edgeData.kind,
          field,
        )
      },
    )

    return new TypeGraph(vertices, edges)
  }
}
