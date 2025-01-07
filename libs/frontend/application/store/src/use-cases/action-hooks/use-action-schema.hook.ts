import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

import { useActionService } from '../../services/action.service'

/**
 * @param schema
 * @returns create/update action schema with validation rules against duplicated action and state names
 */
export const useActionSchema = (
  schema: JSONSchemaType<ICreateActionData | IUpdateActionData>,
) => {
  const { rendererService } = useApplicationStore()
  const { actionId } = useUrlPathParams()
  const { actionDomainService } = useDomainStore()
  const action = actionDomainService.actions.get(actionId)

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
