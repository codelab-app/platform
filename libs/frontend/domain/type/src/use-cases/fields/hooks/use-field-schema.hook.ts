import type {
  ICreateFieldData,
  IUpdateFieldData,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { JSONSchemaType } from 'ajv'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update field schema with validation rules against duplicated action and state names
 */
export const useFieldSchema = (
  schema: JSONSchemaType<ICreateFieldData | IUpdateFieldData>,
) => {
  const { fieldService, storeService } = useStore()

  return useMemo(() => {
    const interfaceId =
      fieldService.createForm.interface?.id ??
      fieldService.updateForm.field?.api.current.id

    const parentStore = storeService.storesList.find(
      ({ api }) => api.id === interfaceId,
    )

    const forbiddenValues = Object.keys(parentStore?.state ?? {}).filter(
      (fieldName) => fieldName !== fieldService.updateForm.field?.key,
    )

    return {
      ...schema,
      properties: {
        ...schema.properties,
        key: {
          ...schema.properties.key,
          forbiddenValues,
        },
      },
    }
  }, [
    schema,
    fieldService.createForm.interface,
    fieldService.updateForm.field,
    storeService.storesList,
  ])
}
