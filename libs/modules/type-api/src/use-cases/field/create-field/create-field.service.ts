import {
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphInterfaceType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldValidator } from '../../../field.validator'
import { TypeValidator } from '../../../type.validator'
import { CreateTypeService } from '../../type'
import { TypeRef } from './create-field.input'
import { CreateFieldRequest } from './create-field.request'

@Injectable()
export class CreateFieldService extends DgraphCreateUseCase<CreateFieldRequest> {
  constructor(
    dgraph: DgraphRepository,
    private fieldValidator: FieldValidator,
    private typeValidator: TypeValidator,
    private createTypeService: CreateTypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: CreateFieldRequest, txn: Txn) {
    const {
      input: { type },
    } = request

    await this.validate(request)

    const typeId = await this.getTypeId(type)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, typeId, blankNodeUid),
    )
  }

  private createMutation(
    { input: { key, interfaceId, name, description } }: CreateFieldRequest,
    typeId: string,
    blankNodeUid: string,
  ) {
    return jsonMutation<DgraphInterfaceType>({
      uid: interfaceId,
      fields: {
        uid: blankNodeUid,
        'dgraph.type': [DgraphEntityType.Field],
        name,
        key,
        description: description ?? undefined,
        type: { uid: typeId },
      },
    })
  }

  // TODO make this in one txn
  private async getTypeId(type: TypeRef) {
    let typeId = type.existingTypeId

    // Check if we specify an existing type, if not - create a new one and get its ID
    if (!typeId) {
      if (!type.newType) {
        throw new Error('Either newType or existingTypeId must be provided')
      }

      const createdType = await this.createTypeService.execute(type.newType)

      typeId = createdType.id
    }

    return typeId
  }

  /**
   * Throws Error if:
   * - There is another field with that key in the same interface
   * - The specified existingTypeId does not exist
   * - The specified existingTypeId causes a recursive type reference
   * - Neither existingTypeId nor newType are provided
   */
  protected async validate({
    input: {
      interfaceId,
      key,
      type: { existingTypeId, newType },
    },
  }: CreateFieldRequest): Promise<void> {
    await this.fieldValidator.keyIsUnique(interfaceId, key)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    // If we specify an existing type, check if it exists
    if (existingTypeId) {
      const existingType = await this.typeValidator.typeExists(existingTypeId)

      this.typeValidator.notRecursive(interfaceId, existingType)
    }
  }
}
