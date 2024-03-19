import { useStore } from '@codelab/frontend/application/shared/store'
import type {
  ICreateFieldData,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'
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
    const renderer = rendererService.activeRenderer?.current
    const runtimeStore = renderer?.runtimeContainerNode?.runtimeStore

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
