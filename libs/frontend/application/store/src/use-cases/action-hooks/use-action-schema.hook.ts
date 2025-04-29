import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update action schema with validation rules against duplicated action and state names
 */
export const useActionSchema = (
  schema: JSONSchemaType<ICreateActionData | IUpdateActionData>,
  options?: { actionId?: string },
): JSONSchemaType<ICreateActionData | IUpdateActionData> => {
  const { rendererService } = useApplicationStore()
  const { actionDomainService } = useDomainStore()

  const action = options?.actionId
    ? actionDomainService.actions.get(options.actionId)
    : undefined

  return useMemo(() => {
    const renderer = rendererService.activeRenderer?.current
    const runtimeStore = renderer?.runtimeContainerNode?.runtimeStore

    const forbiddenValues = Object.keys(runtimeStore?.state ?? {}).filter(
      (fieldName) => fieldName !== action?.name,
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
  }, [rendererService.activeRenderer, schema, action?.name])
}
