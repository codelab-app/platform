import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { IUser } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldValidator } from '../../../domain/field/field.validator'
import { TypeValidator } from '../../../domain/type.validator'
import { CreateTypeService } from '../../type/create-type'
import { GetTypeGraphService } from '../../type/get-type-graph'
import { TypeRef } from './create-field.input'
import { CreateFieldRequest } from './create-field.request'

@Injectable()
export class CreateFieldService extends DgraphCreateUseCase<CreateFieldRequest> {
  constructor(
    dgraph: DgraphRepository,
    private fieldValidator: FieldValidator,
    private typeValidator: TypeValidator,
    private createTypeService: CreateTypeService,
    private getTypeGraphService: GetTypeGraphService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: CreateFieldRequest, txn: Txn) {
    const {
      input: { type },
      currentUser,
    } = request

    await this.validate(request)

    const typeId = await this.getTypeId(type, currentUser)

    return this.dgraph.create(txn, (blankNodeUid) =>
      CreateFieldService.createMutation(request, typeId, blankNodeUid),
    )
  }

  private static createMutation(
    { input: { key, interfaceId, name, description } }: CreateFieldRequest,
    typeId: string,
    blankNodeUid: string,
  ) {
    return jsonMutation({
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
  private async getTypeId(type: TypeRef, currentUser: IUser) {
    let typeId = type.existingTypeId

    // Check if we specify an existing type, if not - create a new one and get its ID
    if (!typeId) {
      if (!type.newType) {
        throw new Error('Either newType or existingTypeId must be provided')
      }

      const createdType = await this.createTypeService.execute({
        input: type.newType,
        currentUser,
      })

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
      interfaceId, // the interface we're adding the field to
      key,
      type: { existingTypeId, newType }, // the type of the field we're creating now
    },
    currentUser,
  }: CreateFieldRequest): Promise<void> {
    await this.fieldValidator.keyIsUnique(interfaceId, key)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    /**
     * {type: Interface, id: 01, fields: [{type: }]}
     * {type: Array, id: 02, itemType: 01}
     *
     */

    // If we specify an existing type, check if it exists and that we don't cause a recursive type reference
    if (existingTypeId) {
      await this.typeValidator.typeExists(existingTypeId)

      const graph = await this.getTypeGraphService.execute({
        input: { where: { id: existingTypeId } },
        currentUser,
      })

      if (!graph) {
        // Shouldn't happen, we check in typeValidator.typeExists
        throw new Error('Type graph not found')
      }

      const existingTypeTree = new TypeTree(graph)
      this.typeValidator.notRecursive(interfaceId, existingTypeTree)
    }
  }
}
