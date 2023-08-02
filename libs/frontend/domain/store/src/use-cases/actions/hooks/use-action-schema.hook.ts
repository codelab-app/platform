import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { JSONSchemaType } from 'ajv'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update action schema with validation rules against duplicated action and state names
 */
export const useActionSchema = (
  schema: JSONSchemaType<ICreateActionData | IUpdateActionData>,
) => {
  const { actionService } = useStore()

  return useMemo(() => {
    const store =
      actionService.createForm.store ??
      actionService.updateForm.action?.store.current

    const forbiddenValues = Object.keys(store?.state ?? {}).filter(
      (fieldName) => fieldName !== actionService.updateForm.action?.name,
    )

    return {
      ...schema,
      properties: {
        ...schema.properties,
        name: {
          ...schema.properties.name,
          forbiddenValues,
        },
      },
    }
  }, [schema, actionService.createForm.store, actionService.updateForm.action])
}
