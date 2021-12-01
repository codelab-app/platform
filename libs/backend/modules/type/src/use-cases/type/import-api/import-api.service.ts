import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import {
  IField,
  IType,
  IUser,
  typeEdgeIsField,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js-http'
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
import { CreateTypeService } from '../create-type'
import { CreateTypeInputFactory } from '../create-type/create-type-input.factory'
import { UpdateTypeService } from '../update-type'
import { ImportApiRequest } from './import-api.request'

// Stored by Name
type TypesCache = Map<string, Pick<IType, 'name' | 'id'>>

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
    const verticesMap = new Map(vertices.map((v) => [v.id, v]))

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
        const sourceTypeKind = verticesMap.get(edge.source)?.typeKind
        const sourceTypeId = verticesIdMap.get(edge.source)
        const targetTypeId = verticesIdMap.get(edge.target)
        let updateTypeMutation: Mutation

        if (!sourceTypeKind || !sourceTypeId) {
          throw new Error("Can't find source type for edge")
        }

        if (!targetTypeId) {
          throw new Error('Incorrect edge target type id')
        }

        // Add field if we have an interface type
        if (
          sourceTypeKind === TypeKind.InterfaceType &&
          typeEdgeIsField(edge)
        ) {
          if (!sourceTypeId || !targetTypeId) {
            console.log(edge)
            throw new Error('Incorrect interface id to assign to')
          }

          await this.upsertField(sourceTypeId, edge, targetTypeId, currentUser)

          return
        } else if (sourceTypeKind === TypeKind.ArrayType) {
          updateTypeMutation = CreateTypeService.createMutation(
            {
              input: {
                arrayType: {
                  itemTypeId: targetTypeId,
                },
              },
              currentUser,
            },
            sourceTypeId,
          )
        } else if (sourceTypeKind === TypeKind.UnionType) {
          updateTypeMutation = CreateTypeService.createMutation(
            {
              input: {
                unionType: {
                  typeIdsOfUnionType: [targetTypeId],
                },
              },
              currentUser,
            },
            sourceTypeId,
          )
        } else {
          throw new Error(`Unknown source type kind of edge ${sourceTypeKind}`)
        }

        await this.dgraph.transactionWrapper((txn) =>
          txn.mutate(updateTypeMutation),
        )
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
      const items = await this.dgraph.getAllNamed<Pick<IType, 'name' | 'id'>>(
        txn,
        `{
           q(func: type(${
             DgraphEntityType.Type
           })) @filter(has(name) AND eq(name, ["${names.join('","')}"])) {
              id: uid
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
    currentUser: IUser,
    typesCache: TypesCache,
  ) {
    // this.logger.debug(vertex, 'Create or Get')

    const typeData = CreateTypeInputFactory.toCreateInput(vertex)
    // We assume name is constant for primitive
    const existingType = typesCache.get(typeData.name)

    if (existingType) {
      return existingType.id
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
    edge: IField,
    existingTypeId: string,
    currentUser: IUser,
  ) {
    if (!edge?.key) {
      throw new Error('Missing key')
    }

    // Check if field exists already
    const existingField = await this.getFieldService.execute({
      input: {
        byInterface: {
          interfaceId,
          fieldKey: edge?.key ?? '',
        },
      },
    })

    if (existingField) {
      const updateFieldInput: UpdateFieldRequest = {
        input: {
          fieldId: existingField.id,
          updateData: {
            key: edge.key,
            description: edge.description ?? '',
            name: edge.name ?? '',
            type: {
              existingTypeId: existingField.target,
            },
          },
        },
        currentUser,
      }

      await this.updateFieldService.execute(updateFieldInput)

      return existingField.id
    }

    const createFieldInput: CreateFieldRequest = {
      input: {
        key: edge?.key,
        name: `${edge?.name}`,
        description: `${edge?.description}`,
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
