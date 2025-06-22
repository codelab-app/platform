import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  IFieldCreateData,
  IFieldUpdateData,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import { uniformSchemaFactory } from '@codelab/frontend/presentation/components/interface-form'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'
import { useAsync } from 'react-use'

import { useTypeService } from '../../services/field.service'
import { createFieldSchema } from '../create-field'

/**
 * @param schema
 * @returns create/update field schema with validation rules against duplicated action and state names
 */
export const useFieldSchema = (
  schema: JSONSchemaType<IFieldCreateData | IFieldUpdateData>,
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

export const useFieldFormSchema = (
  model: IFieldCreateData,
): JSONSchemaType<IFieldCreateData | IFieldUpdateData> => {
  const { typeDomainService } = useDomainStore()
  const typeService = useTypeService()
  const fieldSchema = useFieldSchema(createFieldSchema)

  const { value: fieldTypeModel } = useAsync(async () => {
    if (!model.fieldType) {
      return null
    }

    return typeDomainService.types.has(model.fieldType)
      ? typeDomainService.type(model.fieldType)
      : await typeService.getOne(model.fieldType)
  }, [model.fieldType])

  const schema = useMemo(() => {
    return {
      ...fieldSchema,
      properties: {
        ...fieldSchema.properties,
        ...(fieldTypeModel
          ? {
              defaultValues: fieldTypeModel.toJsonSchema({
                fieldName: 'Default Value',
                uniformSchema: uniformSchemaFactory,
                validationRules: model.validationRules,
              }),
            }
          : null),
      },
      required:
        model.validationRules?.general?.nullable === false
          ? ['id', 'key', 'fieldType', 'defaultValues']
          : ['id', 'key', 'fieldType'],
    }
  }, [fieldTypeModel, model.validationRules])

  return schema as JSONSchemaType<IFieldCreateData | IFieldUpdateData>
}
