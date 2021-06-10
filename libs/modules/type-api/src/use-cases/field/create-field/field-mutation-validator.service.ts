import { Injectable } from '@nestjs/common'
import { Interface } from '../../../models'
import { GetInterfaceService } from '../../interface'
import { GetFieldService } from '../get-field'
import { CreateFieldInput, CreateTypeInput } from './create-field.input'
import { MAX_ARRAY_DEPTH } from './create-field.service'

export interface FieldMutationValidationContext {
  foundInterface?: Interface
}

@Injectable()
export class FieldMutationValidator {
  constructor(
    private getFieldService: GetFieldService,
    private getInterfaceService: GetInterfaceService,
  ) {}

  async validate(
    {
      type,
      key,
      interfaceId,
    }: Pick<CreateFieldInput, 'type' | 'key' | 'interfaceId'>,
    existingFieldId?: string,
  ): Promise<FieldMutationValidationContext> {
    //Check if we have a duplicate key
    const foundDuplicate = await this.getFieldService.execute({
      input: { byInterface: { interfaceId, fieldKey: key } },
    })

    if (foundDuplicate && foundDuplicate.id !== existingFieldId) {
      throw new Error(`Field with key ${key} already exists`)
    }

    return await this.validateType(type)
  }

  async validateType(
    {
      arrayType,
      enumType,
      unitType,
      simpleType,
      interfaceType,
    }: CreateTypeInput,
    iteration = 0,
  ) {
    if (iteration > MAX_ARRAY_DEPTH) {
      throw new Error('Type too nested')
    }

    //Accept only one and no more type
    const numberOfTypeFields = [
      interfaceType,
      arrayType,
      enumType,
      unitType,
      simpleType,
    ].filter((t) => !!t).length

    if (numberOfTypeFields < 1) {
      throw new Error('At least one type input must be provided')
    } else if (numberOfTypeFields > 1) {
      throw new Error('No more than one type input must be provided')
    }

    //Check if the interface exists if it's an interface type
    if (interfaceType) {
      const foundInterface = await this.getInterfaceService.execute({
        input: { interfaceId: interfaceType.interfaceId },
      })

      if (!foundInterface) {
        throw new Error("Interface doesn't exist")
      }

      return { foundInterface }
    } else if (arrayType) {
      await this.validateType(arrayType.type, iteration + 1)
    }

    return {}
  }
}
