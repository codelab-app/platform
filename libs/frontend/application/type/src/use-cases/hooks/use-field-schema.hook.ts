import type { IFieldModel } from '@codelab/frontend-abstract-domain'
import type {
  IFieldCreateFormData,
  IFieldUpdateData,
} from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import { useMemo } from 'react'

/**
 * @param schema
 * @returns create/update field schema with validation rules against duplicated action and state names
 */
export const useFieldSchema = (
  schema: JSONSchemaType<IFieldCreateFormData | IFieldUpdateData>,
  updatedField?: IFieldModel,
) => {
  const { rendererService } = useApplicationStore()
  const { storeDomainService } = useDomainStore()

  return useMemo(() => {
    const renderer = rendererService.activeRenderer?.current
    const runtimeStore = renderer?.runtimeContainerNode.runtimeStore

    const forbiddenValues = Object.keys(runtimeStore?.state ?? {}).filter(
      (fieldName) => fieldName !== updatedField?.key,
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
  }, [schema, updatedField, storeDomainService.storesList])
}
