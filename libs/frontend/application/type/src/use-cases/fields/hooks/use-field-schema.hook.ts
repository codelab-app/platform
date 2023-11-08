import type {
  ICreateFieldData,
  IUpdateFieldData,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { JSONSchemaType } from 'ajv'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update field schema with validation rules against duplicated action and state names
 */
export const useFieldSchema = (
  schema: JSONSchemaType<ICreateFieldData | IUpdateFieldData>,
) => {
  const { fieldService, rendererService, storeService } = useStore()

  return useMemo(() => {
    const interfaceId =
      fieldService.createForm.interface?.id ??
      fieldService.updateForm.field?.api.current.id

    const parentStore = storeService.storeDomainService.storesList.find(
      ({ api }) => api.id === interfaceId,
    )

    const runtimeStore = parentStore
      ? rendererService.runtimeStore(parentStore)
      : undefined

    const forbiddenValues = Object.keys(runtimeStore?.state ?? {}).filter(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    schema,
    fieldService.createForm.interface,
    fieldService.updateForm.field,
    storeService.storeDomainService.storesList,
  ])
}
