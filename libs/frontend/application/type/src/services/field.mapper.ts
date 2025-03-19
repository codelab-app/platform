import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { IFieldCreateData, IFieldDto } from '@codelab/shared/abstract/core'

import { isDefined } from 'remeda'

export const fieldMapper = {
  mapDataToDto: (fieldData: IFieldCreateData) => {
    return {
      ...fieldData,
      api: { id: fieldData.interfaceTypeId },
      defaultValues: isDefined(fieldData.defaultValues)
        ? JSON.stringify(fieldData.defaultValues)
        : null,
      fieldType: { id: fieldData.fieldType },
      validationRules: fieldData.validationRules
        ? JSON.stringify(fieldData.validationRules)
        : null,
    }
  },

  mapFieldToDto: (field: IFieldModel): IFieldDto => {
    return {
      api: { id: field.api.id },
      defaultValues: field.defaultValues
        ? JSON.stringify(field.defaultValues)
        : null,
      description: field.description,
      fieldType: { id: field.type.id },
      id: field.id,
      key: field.key,
      name: field.name,
      validationRules: field.validationRules
        ? JSON.stringify(field.validationRules)
        : null,
    }
  },
}
