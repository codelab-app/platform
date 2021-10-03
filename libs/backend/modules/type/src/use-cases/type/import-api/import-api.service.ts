import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphType,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import {
  ITypeEdge,
  TypeEdgeKind,
  TypeKind,
  User,
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
import { UpdateTypeService } from '../update-type'
import { ImportApiRequest } from './import-api.request'

// Stored by Name
type TypesCache = Map<string, Pick<DgraphType<any>, 'name' | 'uid'>>

/**
 * This service is essentially a wrapper around createField & createType. We transform the graph vertices/edges back into fields & types
 */
@Injectable()
export class ImportApiService
  implements UseCasePort<ImportApiRequest, CreateResponse>
{
  constructor(
    private dgraph: DgraphRepository,
    private createTypeService: CreateTypeService,
    private getFieldService: GetFieldService,
    private createFieldService: CreateFieldService,
    private updateTypeService: UpdateTypeService,
    private updateFieldService: UpdateFieldService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportApiRequest): Promise<CreateResponse> {
    const {
      input: { api, typeGraph },
      currentUser,
    } = request

    const { vertices = [], edges = [] } = typeGraph
    const typesCache = await this.getTypesCache(vertices.map((v) => v.name))

    /**
     * Create vertices and create a mapping of old to new id's
     */
    const verticesIdMap = await vertices.reduce(async (vertexIdMap, vertex) => {
      // We would want to map the old vertex ids to current ids

      const currentVertexId = await this.createTypeIfMissing(
        vertex as TypeVertex,
        currentUser,
        typesCache,
      )

      ;(await vertexIdMap).set(vertex.id, currentVertexId)

      return vertexIdMap
    }, Promise.resolve(new Map<string, string>()))

    await Promise.all(
      edges.map(async (edge) => {
        /**
         * Edge could be either field or array
         */
        if (edge.kind === TypeEdgeKind.Field && edge.field) {
          const interfaceId = verticesIdMap.get(edge.source)
          const existingTypeId = verticesIdMap.get(edge.target)

          if (!interfaceId || !existingTypeId) {
            console.log(edge)
            throw new Error('Incorrect interface id to assign to')
          }

          await this.upsertField(interfaceId, edge, existingTypeId, currentUser)
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

          await this.createTypeService.execute({
            input: createArrayTypeInput,
            currentUser,
          })
        }
      }),
    )

    const interfaceId = verticesIdMap.get(api)

    if (!interfaceId) {
      throw new Error('Seeder not returning an interface')
    }

    return { id: interfaceId }
  }

  private async getTypesCache(names: Array<string>): Promise<TypesCache> {
    return this.dgraph.transactionWrapper(async (txn) => {
      const items = await this.dgraph.getAllNamed<
        Pick<DgraphType<any>, 'name' | 'uid'>
      >(
        txn,
        `{
           q(func: type(${
             DgraphEntityType.Type
           })) @filter(eq(name, ["${names.join('","')}"]) AND has(name)) {
              uid
              name
           }
      }`,
        'q',
      )

      return new Map(items.map((item) => [item.name, item]))
    })
  }

  /**
   * Returns existing type id if already existing, otherwise return created id
   */
  private async createTypeIfMissing(
    vertex: TypeVertex,
    currentUser: User,
    typesCache: TypesCache,
  ) {
    // this.logger.debug(vertex, 'Create or Get')

    const typeData = CreateTypeFactory.toCreateInput(vertex)
    // We assume name is constant for primitive
    const existingType = typesCache.get(typeData.name)

    if (existingType) {
      return existingType.uid
    }

    const createdType = await this.createTypeService.execute({
      input: typeData,
      currentUser,
    })

    // this.logger.debug(createdType.id, 'Type Created')

    return createdType.id
  }

  private async upsertField(
    interfaceId: string,
    edge: ITypeEdge,
    existingTypeId: string,
    currentUser: User,
  ) {
    if (!edge?.field?.key) {
      throw new Error('Missing key')
    }

    // Check if field exists already
    const existingField = await this.getFieldService.execute({
      input: {
        byInterface: {
          interfaceId,
          fieldKey: edge.field?.key ?? '',
        },
      },
    })

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
        currentUser,
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
      currentUser,
    }

    const { id } = await this.createFieldService.execute(createFieldInput)

    return id
  }
}
