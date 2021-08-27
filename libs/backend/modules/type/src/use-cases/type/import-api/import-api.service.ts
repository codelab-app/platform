import { UseCasePort } from '@codelab/backend/abstract/core'
import { TypeEdgeKind, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import {
  CreateFieldRequest,
  CreateFieldService,
} from '../../field/create-field'
import { CreateTypeInput, CreateTypeService } from '../create-type'
import { ImportApiInput } from './import-api.input'

@Injectable()
export class ImportApiService implements UseCasePort<ImportApiInput, void> {
  constructor(
    private createTypeService: CreateTypeService,
    private createFieldService: CreateFieldService,
  ) {}

  async execute(request: ImportApiInput): Promise<void> {
    const { vertices = [], edges = [] } = request

    /**
     * Create vertices and create a mapping of old to new id's
     */
    const verticesIdMap = await vertices.reduce(async (vertexIdMap, vertex) => {
      const { id } = await this.createTypeService.execute(vertex)

      ;(await vertexIdMap).set(vertex.id, id)

      return vertexIdMap
    }, Promise.resolve(new Map<string, string>()))

    /**
     * Create those fields using the id map
     */
    await Promise.all(
      edges.map(async (edge) => {
        /**
         * Edge could be either field or array
         */
        if (edge.kind === TypeEdgeKind.Field && edge.field) {
          const interfaceId = verticesIdMap.get(edge.source)
          const existingTypeId = verticesIdMap.get(edge.target)

          if (!interfaceId || !existingTypeId) {
            throw new Error('Incorrect interface id to assign to')
          }

          const createFieldInput: CreateFieldRequest = {
            input: {
              key: edge.field?.key,
              name: `${edge.field?.name}`,
              description: `${edge.field?.description}`,
              interfaceId,
              type: {
                existingTypeId,
              },
            },
          }

          const { id } = await this.createFieldService.execute(createFieldInput)
          console.log(id)
        }

        if (edge.kind === TypeEdgeKind.ArrayItem) {
          const arrayTypeId = verticesIdMap.get(edge.target)

          if (!arrayTypeId) {
            throw new Error('Incorrect array type id')
          }

          const createArrayTypeInput: CreateTypeInput = {
            name: '// TODO: Add interface name here',
            typeKind: TypeKind.ArrayType,
            arrayType: {
              itemTypeId: arrayTypeId,
            },
          }

          const { id } = await this.createTypeService.execute(
            createArrayTypeInput,
          )
        }
      }),
    )
  }
}
