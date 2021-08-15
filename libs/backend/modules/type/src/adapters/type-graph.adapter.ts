import { BaseAdapter } from '@codelab/backend/abstract/core'
import {
  breadthFirstTraversal,
  DgraphInterfaceType,
  DgraphType,
  isDgraphArrayType,
  isDgraphInterfaceType,
} from '@codelab/backend/infra'
import { TypeEdgeKind } from '@codelab/shared/graph'
import { Injectable } from '@nestjs/common'
import { TypeEdge, TypeGraph, TypeUnion } from '../models'
import { FieldAdapter } from './field.adapter'
import { TypeAdapterFactory } from './type-adapter.factory'

@Injectable()
export class TypeGraphAdapter extends BaseAdapter<
  DgraphInterfaceType,
  TypeGraph
> {
  constructor(
    private mapperFactory: TypeAdapterFactory,
    private fieldAdapter: FieldAdapter,
  ) {
    super()
  }

  async mapItem(dgraphInterface: DgraphInterfaceType) {
    if (!isDgraphInterfaceType(dgraphInterface)) {
      throw new Error('Only Interface types can be converted to a graph')
    }

    const vertices = new Map<string, TypeUnion>()
    const edges = new Map<string, TypeEdge>()
    const rootMapper = this.mapperFactory.getMapper(dgraphInterface)
    vertices.set(dgraphInterface.uid, await rootMapper.map(dgraphInterface))

    await breadthFirstTraversal<DgraphType<any>>({
      root: dgraphInterface,
      extractId: (el) => el.uid,
      visit: async (type) => {
        if (isDgraphInterfaceType(type)) {
          const fields = type.fields || []

          // We need to add the child types before the edges, because cytoscape complains otherwise
          for (const field of fields) {
            const mapper = this.mapperFactory.getMapper(field.type)

            vertices.set(field.type.uid, await mapper.map(field.type))

            const fieldModel = await this.fieldAdapter.map(field)

            edges.set(
              field.uid,
              new TypeEdge(
                type.uid,
                field.type.uid,
                TypeEdgeKind.Field,
                fieldModel,
              ),
            )
          }

          return fields
            .map((f) => f.type)
            .slice()
            .sort((a, b) => b.uid.localeCompare(a.uid))
        }

        if (isDgraphArrayType(type)) {
          const itemType = type.itemType
          const mapper = this.mapperFactory.getMapper(itemType)

          vertices.set(itemType.uid, await mapper.map(itemType))
          edges.set(
            type.uid + '-' + itemType.uid,
            new TypeEdge(type.uid, itemType.uid, TypeEdgeKind.ArrayItem),
          )

          return [itemType]
        }

        return undefined
      },
    })

    return new TypeGraph(
      Array.from(vertices.values()),
      Array.from(edges.values()),
    )
  }
}
