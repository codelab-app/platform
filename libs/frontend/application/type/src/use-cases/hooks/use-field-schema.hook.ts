import type {
  ICreateFieldData,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

import { useCreateFieldForm } from '../create-field'
import { useUpdateFieldForm } from '../update-field'

/**
 * @param schema
 * @returns create/update field schema with validation rules against duplicated action and state names
 */
export const useFieldSchema = (
  schema: JSONSchemaType<ICreateFieldData | IUpdateFieldData>,
) => {
  const { rendererService } = useApplicationStore()
  const updateFieldForm = useUpdateFieldForm()
  const createFieldForm = useCreateFieldForm()
  const { storeDomainService } = useDomainStore()

  return useMemo(() => {
    const renderer = rendererService.activeRenderer?.current
    const runtimeStore = renderer?.runtimeContainerNode?.runtimeStore

    const forbiddenValues = Object.keys(runtimeStore?.state ?? {}).filter(
      (fieldName) => fieldName !== updateFieldForm.data?.key,
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
    createFieldForm.data,
    updateFieldForm.data,
    storeDomainService.storesList,
  ])
}
