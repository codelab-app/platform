import {
  DgraphEntity,
  DgraphEntityType,
  DgraphField,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
  jsonMutation,
  NotFoundError,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldValidator } from '../../../domain/field.validator'
import { TypeValidator } from '../../../domain/type.validator'
import { CreateTypeService } from '../../type/create-type'
import { TypeRef } from '../create-field'
import { GetFieldService } from '../get-field'
import { UpdateFieldRequest } from './update-field.request'

@Injectable()
export class UpdateFieldService extends DgraphUseCase<UpdateFieldRequest> {
  constructor(
    dgraph: DgraphRepository,
    private getFieldService: GetFieldService,
    private fieldValidator: FieldValidator,
    private typeValidator: TypeValidator,
    private createTypeService: CreateTypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateFieldRequest, txn: Txn) {
    await this.validate(request)

    const typeId = await this.getTypeId(request.input.updateData.type)

    await this.dgraph.executeMutation(txn, this.createMutation(request, typeId))
  }

  private createMutation(
    {
      input: {
        fieldId,
        updateData: { name, description, key },
      },
    }: UpdateFieldRequest,
    typeId: string,
  ) {
    return jsonMutation<DgraphField>({
      uid: fieldId,
      name,
      key,
      description: description ?? undefined,
      type: {
        uid: typeId,
      },
    })
  }

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
   * - The updated field doesn't exist
   * - There is another field with that key in the same interface
   * - The specified existingTypeId does not exist
   * - The specified existingTypeId causes a recursive type reference
   * - Neither existingTypeId nor newType are provided
   */
  protected async validate({
    input: {
      fieldId,
      updateData: {
        key,
        type: { existingTypeId, newType },
      },
    },
  }: UpdateFieldRequest): Promise<void> {
    const field = await this.dgraph.transactionWrapper<
      DgraphEntity<any> & { '~fields': [{ uid: string }] }
    >((txn) =>
      this.dgraph.getOneOrThrow(
        txn,
        new DgraphQueryBuilder()
          .addTypeFilterDirective(DgraphEntityType.Field)
          .setUidFunc(fieldId)
          .addFields(`~fields { uid }`),
        () => new NotFoundError('Field not found'),
      ),
    )

    const interfaceId = field['~fields'][0].uid

    await this.fieldValidator.keyIsUnique(interfaceId, key, fieldId)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    if (existingTypeId) {
      // If we specify an existing type, check if it exists
      const existingType = await this.typeValidator.typeExists(existingTypeId)

      // And it doesn't cause a recursive loop
      this.typeValidator.notRecursive(interfaceId, existingType)
    }
  }
}
