import { IInterfaceType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { GetFieldService } from '../../use-cases/field/get-field'

@Injectable()
export class FieldValidator {
  constructor(private getFieldService: GetFieldService) {}

  /** Throws error if the field doesn't exist */
  async exists(fieldId: string) {
    const field = await this.getFieldService.execute({
      input: { byId: { fieldId } },
    })

    if (!field) {
      throw new Error('Field not found')
    }

    return field
  }

  /**
   * Throws Error if there is a field with the same key in that interface
   */
  async keyIsUnique(
    theInterface: IInterfaceType,
    key: string,
    existingFieldId?: string,
  ) {
    const foundDuplicate = theInterface.fields.find(
      (f) => f.key === key && f.id !== existingFieldId,
    )

    if (foundDuplicate) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }
}
