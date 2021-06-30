import { Injectable } from '@nestjs/common'
import { DgraphTypeUnion } from '../../../models'
import { checkForRecursion } from '../../../recursion-check'
import { GetDgraphTypeService } from '../get-dgraph-type'
import { CreateArrayTypeInput, CreateTypeInput } from './create-type.input'

export interface CreateTypeValidatorContext {
  arrayItemType: DgraphTypeUnion | null
}

@Injectable()
export class CreateTypeValidator {
  constructor(private getDgraphType: GetDgraphTypeService) {}

  /**
   * Validates that:
   * - There is exactly 1 type input
   * - Array item type exists (if applicable)
   * - Array types won't cause a recursive type
   */
  async validate(
    { arrayType, enumType, simpleType, interfaceType }: CreateTypeInput,
    existingTypeId: string | undefined = undefined,
  ): Promise<CreateTypeValidatorContext> {
    // Accept only one and no more type input
    CreateTypeValidator.validateNumberOfInputs([
      arrayType,
      enumType,
      simpleType,
      interfaceType,
    ])

    if (arrayType) {
      return await this.validateArrayType(arrayType, existingTypeId)
    }

    return { arrayItemType: null }
  }

  private async validateArrayType(
    arrayType: CreateArrayTypeInput,
    existingTypeId: string | undefined,
  ) {
    const itemType = await this.getDgraphType.execute({
      typeId: arrayType.itemTypeId,
    })

    if (!itemType) {
      throw new Error('Array item type not found')
    }

    if (existingTypeId) {
      checkForRecursion(existingTypeId, itemType)
    }

    return { arrayItemType: itemType }
  }

  private static validateNumberOfInputs(inputs: Array<any>) {
    const numberOfTypeFields = inputs.filter((t) => !!t).length

    if (numberOfTypeFields < 1) {
      throw new Error('At least one type input must be provided')
    } else if (numberOfTypeFields > 1) {
      throw new Error('No more than one type input must be provided')
    }
  }
}
