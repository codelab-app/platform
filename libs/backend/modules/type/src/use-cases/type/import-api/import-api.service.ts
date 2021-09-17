import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import {
  ITypeEdge,
  TypeEdgeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TypeVertex } from '../../../domain'
import {
  CreateFieldRequest,
  CreateFieldService,
} from '../../field/create-field'
import { GetFieldService } from '../../field/get-field'
import {
  UpdateFieldRequest,
  UpdateFieldService,
} from '../../field/update-field'
import { CreateTypeInput, CreateTypeService } from '../create-type'
import { CreateTypeFactory } from '../create-type/create-type.factory'
import { GetTypeService } from '../get-type'
import { UpdateTypeService } from '../update-type'
import { ImportApiInput } from './import-api.input'

/**
 * This service is essentially a wrapper around createField & createType. We transform the graph vertices/edges back into fields & types
 */
@Injectable()
export class ImportApiService
  implements UseCasePort<ImportApiInput, CreateResponse>
{
  constructor(
    private createTypeService: CreateTypeService,
    private getFieldService: GetFieldService,
    private createFieldService: CreateFieldService,
    private updateTypeService: UpdateTypeService,
    private getTypeService: GetTypeService,
    private updateFieldService: UpdateFieldService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute({ api, typeGraph }: ImportApiInput): Promise<CreateResponse> {
    const { vertices = [], edges = [] } = typeGraph

    /**
     * Create vertices and create a mapping of old to new id's
     */
    const verticesIdMap = await vertices.reduce(async (vertexIdMap, vertex) => {
      // We would want to map the old vertex ids to current ids

      const currentVertexId = await this.upsertType(vertex as TypeVertex)

      ;(await vertexIdMap).set(vertex.id, currentVertexId)

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

          await this.upsertField(interfaceId, edge, existingTypeId)
          // const createFieldInput: CreateFieldRequest = {
          //   input: {
          //     key: edge.field?.key,
          //     name: `${edge.field?.name}`,
          //     description: `${edge.field?.description}`,
          //     interfaceId,
          //     type: {
          //       existingTypeId,
          //     },
          //   },
          // }
          //
          // const { id } = await this.createFieldService.execute(createFieldInput)
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

    const interfaceId = verticesIdMap.get(api)

    if (!interfaceId) {
      throw new Error('Seeder not returning an interface')
    }

    return { id: interfaceId }
  }

  /**
   * Returns existing type id if already existing, otherwise return created id
   */
  private async upsertType(vertex: TypeVertex) {
    this.logger.debug(vertex, 'Create or Get')

    const typeData = CreateTypeFactory.toCreateInput(vertex)

    // We assume name is constant for primitive
    const existingType = await this.getTypeService.execute({
      input: { where: { name: typeData.name } },
    })

    if (existingType) {
      this.logger.debug(existingType.uid, 'Updating Type')

      await this.updateTypeService.execute({
        typeId: existingType.uid,
        updateData: {
          ...typeData,
        },
      })

      return existingType.uid
    }

    const createdType = await this.createTypeService.execute(typeData)

    this.logger.debug(createdType.id, 'Type Created')

    return createdType.id
  }

  private async upsertField(
    interfaceId: string,
    edge: ITypeEdge,
    existingTypeId: string,
  ) {
    // Check if field exists already
    const existingField = await this.getFieldService.execute({
      input: {
        byInterface: {
          interfaceId,
          fieldKey: edge.field?.key ?? '',
        },
      },
    })

    if (!edge?.field?.key) {
      throw new Error('Missing key')
    }

    if (existingField) {
      const updateFieldInput: UpdateFieldRequest = {
        input: {
          fieldId: existingField.uid,
          updateData: {
            key: edge.field.key,
            description: edge.field.description ?? '',
            name: edge.field.name ?? '',
            type: {
              existingTypeId: existingField.type.uid,
            },
          },
        },
      }

      await this.updateFieldService.execute(updateFieldInput)

      return existingField.uid
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

    return id
  }
}
