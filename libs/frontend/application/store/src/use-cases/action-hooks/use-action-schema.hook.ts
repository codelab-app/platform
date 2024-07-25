import { useStore } from '@codelab/frontend/infra/mobx'
import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update action schema with validation rules against duplicated action and state names
 */
export const useActionSchema = (
  schema: JSONSchemaType<ICreateActionData | IUpdateActionData>,
) => {
  const { actionService, rendererService } = useStore()

  return useMemo(() => {
    const renderer = rendererService.activeRenderer?.current
    const runtimeStore = renderer?.runtimeContainerNode?.runtimeStore

    const forbiddenValues = Object.keys(runtimeStore?.state ?? {}).filter(
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
