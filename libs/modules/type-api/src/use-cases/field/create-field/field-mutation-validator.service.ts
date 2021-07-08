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

/**
 * Throws Error if:
 * - There is no other field with that key in the same interface
 * - The specified existingTypeId exists and will not create a recursive type
 */
@Injectable()
export class FieldMutationValidator {
  constructor(
    private getFieldService: GetFieldService,
    private getDgraphType: GetDgraphTypeService,
  ) {}

  async validate(
    { type: { existingTypeId, newType }, key, interfaceId }: Input,
    existingFieldId?: string,
  ): Promise<FieldMutationValidationContext> {
    await this.validateNoDuplicateKey(interfaceId, key, existingFieldId)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    // If we specify an existing type, check if it exists
    if (existingTypeId) {
      const existingType = await this.getDgraphType.execute({
        typeId: existingTypeId,
      })

      if (!existingType) {
        throw new Error('Type not found')
      }

      checkForRecursion(interfaceId, existingType)

      return { existingType }
    }

    return { existingType: undefined }
  }

  /**
   * throws Error if there is a field with the same key in that interface
   */
  private async validateNoDuplicateKey(
    interfaceId: string,
    key: string,
    existingFieldId: string | undefined,
  ) {
    const foundDuplicate = await this.getFieldService.execute({
      input: { byInterface: { interfaceId, fieldKey: key } },
    })

    if (foundDuplicate && foundDuplicate.id !== existingFieldId) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }
}
