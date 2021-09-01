import { BaseAdapter } from '@codelab/backend/abstract/core'
import {
  DgraphInterfaceType,
  DgraphType,
  isDgraphArrayType,
  isDgraphInterfaceType,
} from '@codelab/backend/infra'
import { breadthFirstTraversal } from '@codelab/backend/shared/generic'
import { TypeEdgeKind } from '@codelab/shared/enums'
import { Injectable } from '@nestjs/common'
import { TypeEdge, TypeGraph, TypeVertex } from '../../domain'
import { FieldAdapter } from './field.adapter'
import { TypeAdapterFactory } from './type-adapter.factory'

@Injectable()
export class TypeGraphAdapter extends BaseAdapter<
  DgraphInterfaceType,
  Promise<TypeGraph>
> {
  constructor(
    private typeAdapter: TypeAdapterFactory,
    private fieldAdapter: FieldAdapter,
  ) {
    super()
  }

  async mapItem(dgraphInterface: DgraphInterfaceType) {
    if (!isDgraphInterfaceType(dgraphInterface)) {
      throw new Error('Only Interface types can be converted to a graph')
    }

    const vertices = new Map<string, TypeVertex>()
    const edges = new Map<string, TypeEdge>()
    const rootMapper = this.typeAdapter.getMapper(dgraphInterface)
    vertices.set(dgraphInterface.uid, await rootMapper.mapItem(dgraphInterface))

    await breadthFirstTraversal<DgraphType<any>>({
      root: dgraphInterface,
      extractId: (el) => el.uid,
      visit: async (type) => {
        if (isDgraphInterfaceType(type)) {
          const fields = type.fields || []

          // We need to add the child types before the edges, because cytoscape complains otherwise
          for (const field of fields) {
            const typeAdapter = this.typeAdapter.getMapper(field.type)

            vertices.set(field.type.uid, await typeAdapter.mapItem(field.type))

            const fieldModel = await this.fieldAdapter.mapItem(field)

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
          const mapper = this.typeAdapter.getMapper(itemType)

          vertices.set(itemType.uid, await mapper.mapItem(itemType))
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
