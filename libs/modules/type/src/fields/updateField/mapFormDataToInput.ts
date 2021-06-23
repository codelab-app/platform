import { UpdateFieldInput } from '@codelab/codegen/graphql'
import { mapFormDataToInput as mapCreateInput } from '../createField/mapFormDataToInput'
import { UpdateFieldSchemaType } from './updateFieldSchema'

export const mapFormDataToInput = (
  formData: UpdateFieldSchemaType,
  fieldId: string,
  interfaceId: string,
): UpdateFieldInput => {
  const createInput = mapCreateInput(formData, interfaceId)

  return {
    fieldId,
    updateData: {
      ...createInput,
    },
  }
}
