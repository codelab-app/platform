import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  ITransaction,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import {
  IArrayType,
  IField,
  IInterfaceType,
  IType,
  IUnionType,
  TypeKind,
  TypeSchema,
} from '@codelab/shared/abstract/core'
import { EntityLike } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import R from 'ramda'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { CreateTypeInputFactory } from '../create-type/create-type-input.factory'
import { ImportTypeRequest } from './import-type.request'

const makePlaceholder = R.pipe(
  CreateTypeInputFactory.toCreateInput,
  CreateTypeInputFactory.toType,
  TypeSchema.parse.bind(TypeSchema),
)

/**
 * This service is essentially a wrapper around createField & createType. We transform the graph vertices/edges back into fields & types
 */
@Injectable()
export class ImportTypeService extends DgraphUseCase<
  ImportTypeRequest,
  CreateResponse
> {
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: ImportTypeRequest,
    txn: ITransaction,
  ): Promise<CreateResponse> {
    const {
      input: { id, typeGraph },
    } = request

    // Get all types that we already have and create placeholders for the ones we don't
    const { payloadIdToType } = await this.getExistingTypesOrCreatePlaceholders(
      typeGraph.vertices ?? [],
      txn,
    )

    // Update all existing and placeholder types as needed
    const tree = new TypeTree(typeGraph)

    // We need to update only types that have relationships to other types
    // the rest is handled by the placeholder creation
    const typesToUpdate = tree.getAllVertices(
      (t) =>
        t.typeKind === TypeKind.UnionType ||
        t.typeKind === TypeKind.InterfaceType ||
        t.typeKind === TypeKind.ArrayType,
    )

    const getActualId = (typeId: string) => {
      const actualId = payloadIdToType.get(typeId)?.id

      if (!actualId) {
        throw new Error(
          `Type ${typeId} not found and a placeholder was not created`,
        )
      }

      return actualId
    }

    for (const typeToUpdate of typesToUpdate) {
      const actualTypeToUpdateId = getActualId(typeToUpdate.id)
      const kind = typeToUpdate.typeKind

      if (kind === TypeKind.InterfaceType) {
        let newFields: Array<IField> = typeToUpdate.fields

        if (!newFields?.length) {
          // for backwards compatibility
          newFields = tree.getFields(typeToUpdate.id)
        }

        const updated: IInterfaceType = {
          ...typeToUpdate,
          id: actualTypeToUpdateId,
          fields: newFields.map((f) => ({
            ...f,
            source: getActualId(f.source),
            target: getActualId(f.target),
            id: '',
          })),
        }

        await this.typeRepository.update(updated, txn)
        continue
      }

      if (kind === TypeKind.ArrayType) {
        const itemId =
          typeToUpdate.itemType?.id ??
          tree.getArrayItemType(typeToUpdate.id)?.id // for backwards compatibility

        const actualItemId = getActualId(itemId)

        const updated: IArrayType = {
          ...typeToUpdate,
          id: actualTypeToUpdateId,
          itemType: { id: actualItemId },
        }

        await this.typeRepository.update(updated, txn)
        continue
      }

      if (kind === TypeKind.UnionType) {
        let newTypesOfUnionType: Array<EntityLike> =
          typeToUpdate.typesOfUnionType

        if (!newTypesOfUnionType?.length) {
          // for backwards compatibility
          newTypesOfUnionType = tree.getUnionItemTypes(typeToUpdate.id)
        }

        const updated: IUnionType = {
          ...typeToUpdate,
          id: actualTypeToUpdateId,
          typesOfUnionType: newTypesOfUnionType.map((t) => ({
            id: getActualId(t.id),
          })),
        }

        await this.typeRepository.update(updated, txn)
        continue
      }

      throw new Error(`Unknown source type kind of edge ${kind}`)
    }

    const interfaceId = payloadIdToType.get(id)?.id

    if (!interfaceId) {
      throw new Error('Seeder not returning an interface')
    }

    return { id: interfaceId }
  }

  /**
   * Gets all existing types by name
   * Creates placeholder types for missing types
   * Placeholder types are created with the minimal required fields for the given type
   *
   * @returns a map of the payload type id and the placeholder/existing type
   */
  private async getExistingTypesOrCreatePlaceholders(
    payloadTypes: Array<IType>,
    transaction: ITransaction,
  ) {
    const existingByName = await this.getExistingTypesByName(
      payloadTypes,
      transaction,
    )

    const payloadIdToType = await this.createTypesIfMissing(
      payloadTypes,
      existingByName,
      transaction,
    )

    return { payloadIdToType }
  }

  private async createTypesIfMissing(
    payloadTypes: Array<IType>,
    existingByName: Map<string, IType>,
    transaction: ITransaction,
  ): Promise<Map<string, IType>> {
    const payloadIdToType = new Map<string, IType>()
    const getExisting = (type: IType) => existingByName.get(type.name)

    await Promise.all(
      payloadTypes.map(async (payloadType) => {
        const existing = getExisting(payloadType)

        if (existing) {
          payloadIdToType.set(payloadType.id, existing)

          return
        }

        const placeholder = makePlaceholder(payloadType)

        const { id } = await this.typeRepository.create(
          placeholder,
          transaction,
        )

        const created = await this.typeRepository.getOne(id, transaction)

        if (!created) {
          throw new Error('Type not created')
        }

        payloadIdToType.set(payloadType.id, created)
      }),
    )

    return payloadIdToType
  }

  private async getExistingTypesByName(
    payloadTypes: Array<IType>,
    transaction: ITransaction,
  ): Promise<Map<string, IType>> {
    const existingTypes = await this.typeRepository.getTypesByExactNames(
      payloadTypes.map((type) => type.name),
      transaction,
    )

    return new Map(existingTypes.map((e) => [e.name, e]))
  }
}
