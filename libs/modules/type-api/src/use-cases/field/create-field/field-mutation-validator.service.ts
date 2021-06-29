import { BaseDgraphFields } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphTypeUnion } from '../../../models'
import { checkForRecursion } from '../../../recursion-check'
import { GetDgraphTypeService } from '../../type'
import { GetFieldService } from '../get-field'
import { CreateFieldInput } from './create-field.input'

export interface FieldMutationValidationContext {
  existingType?: DgraphTypeUnion
}

type Input = Pick<CreateFieldInput, 'type' | 'key' | 'interfaceId'>

// Separate service, because we can reuse the validation logic  on update and create
@Injectable()
export class FieldMutationValidator {
  constructor(
    private getFieldService: GetFieldService,
    private getDgraphType: GetDgraphTypeService,
  ) {}

  /**
   * Validates that:
   * - There is no other field with that key in the same interface
   * - The specified existingTypeId exists and will not create a recursive type
   */
  async validate(
    { type: { existingTypeId, newType }, key, interfaceId }: Input,
    existingFieldId?: string,
  ): Promise<FieldMutationValidationContext> {
    await this.validateNoDuplicateKey(interfaceId, key, existingFieldId)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error(
        'Either existingTypeId or newType must be provided to create a field',
      )
    }

    // If we specify an existing type, check if it exists
    if (existingTypeId) {
      const existingType = await this.getDgraphType.execute({
        typeId: existingTypeId,
      })

      if (!existingType) {
        throw new Error('Type not found')
      }

      if (interfaceId === existingType[BaseDgraphFields.uid]) {
        throw new Error(
          "Can't add a field of type interface to the same interface",
        )
      }

      checkForRecursion(interfaceId, existingType)

      return { existingType }
    }

    // There is not need to validate newType, because it goes through the createTypeService, which validates it either way

    return { existingType: undefined }
  }

  /**
   * Checks if there is no field with the same key in that interface
   */
  private async validateNoDuplicateKey(
    interfaceId: string,
    key: string,
    existingFieldId: string | undefined,
  ) {
    // Check if we have a duplicate key
    const foundDuplicate = await this.getFieldService.execute({
      input: { byInterface: { interfaceId, fieldKey: key } },
    })

    if (foundDuplicate && foundDuplicate.id !== existingFieldId) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }
}
