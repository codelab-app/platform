import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IInterfaceType, IUser, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import { FieldValidator } from '../../../domain/field/field.validator'
import { TypeValidator } from '../../../domain/type.validator'
import { CreateTypeService } from '../../type/create-type'
import { GetTypeGraphService } from '../../type/get-type-graph'
import { TypeRef } from '../create-field'
import { UpdateFieldRequest } from './update-field.request'

@Injectable()
export class UpdateFieldService
  extends DgraphUseCase<UpdateFieldRequest>
  implements UseCasePort<UpdateFieldRequest, void>
{
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private fieldValidator: FieldValidator,
    private typeValidator: TypeValidator,
    private createTypeService: CreateTypeService,
    private getTypeGraphService: GetTypeGraphService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateFieldRequest,
    txn: ITransaction,
  ) {
    const { currentUser, input } = request

    const theInterface = await this.typeRepository.getOne(
      input.interfaceId,
      txn,
    )

    if (!theInterface) {
      throw new Error('Interface not found')
    }

    if (theInterface.typeKind !== TypeKind.InterfaceType) {
      throw new Error("Type is not interface, can't add field to it")
    }

    await this.validate(request, theInterface, txn)

    const field = theInterface.fields.find((f) => f.id === input.fieldId)

    if (!field) {
      throw new Error('Field not found')
    }

    field.target = await this.getTypeId(input.updateData.type, currentUser)
    field.name = input.updateData.name
    field.description = input.updateData.description
    field.key = input.updateData.key

    await this.typeRepository.update(theInterface, txn)
  }

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
   * - The updated field doesn't exist
   * - There is another field with that key in the same interface
   * - The specified existingTypeId does not exist
   * - The specified existingTypeId causes a recursive type reference
   * - Neither existingTypeId nor newType are provided
   */
  protected async validate(
    {
      input: {
        fieldId,
        updateData: {
          key,
          type: { existingTypeId, newType },
        },
        interfaceId,
      },
    }: UpdateFieldRequest,
    theInterface: IInterfaceType,
    txn: ITransaction,
  ): Promise<void> {
    await this.fieldValidator.keyIsUnique(theInterface, key, fieldId)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    if (existingTypeId) {
      // If we specify an existing type, check if it exists
      await this.typeValidator.typeExists(existingTypeId, txn)

      // And it doesn't cause a recursive loop
      const graph = await this.getTypeGraphService.execute({
        input: { where: { id: existingTypeId } },
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
