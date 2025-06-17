'use client'
import type {
  IFieldModel,
  IInterfaceTypeModel,
  ITypeModel,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type {
  IFieldUpdateData,
  IValidationRules,
} from '@codelab/shared-abstract-core'
import type { Nullable, Nullish } from '@codelab/shared-abstract-types'

import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { useMemo, useState } from 'react'
import { useAsync } from 'react-use'
import { AutoFields } from 'uniforms-antd'

import { useFieldService, useTypeService } from '../../services'
import {
  canSetDefaultValue,
  createFieldSchema,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from '../create-field'
import { useFieldSchema } from '../hooks'
import { TypeSelect } from '../select-types'
import { IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { SelectFieldSibling, uniformSchemaFactory } from '@codelab/frontend-presentation-components-interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'

export interface UpdateFieldFormProps extends IFormController {
  field: IFieldModel
}

const getDefaultValuesSchema = (
  type: ITypeModel,
  validationRules: Nullish<IValidationRules>,
) =>
  type.toJsonSchema({
    uniformSchema: uniformSchemaFactory,
    validationRules,
  })

export const UpdateFieldForm = ({
  field,
  onSubmitSuccess,
  showFormControl = true,
  submitRef,
}: UpdateFieldFormProps) => {
  const fieldService = useFieldService()
  const typeService = useTypeService()
  const { typeDomainService } = useDomainStore()
  const fieldSchema = useFieldSchema(createFieldSchema, field)

  /**
   * Previously schema didn't change if user changed the field type, now it changes via React state
   */
  const [defaultValuesSchema, setDefaultValuesSchema] =
    useState<Nullable<JsonSchema>>(null)

  const { loading } = useAsync(
    async () => onFieldTypeChange(field.type.id, field.validationRules),
    [],
  )

  const onFieldTypeChange = async (
    fieldType: string,
    validationRules: Nullish<IValidationRules>,
  ) => {
    if (!typeDomainService.types.has(fieldType)) {
      await typeService.getAll([fieldType])
    }

    const type = typeDomainService.type(fieldType)

    setDefaultValuesSchema(getDefaultValuesSchema(type, validationRules))
  }

  const onSubmit = async (input: IFieldUpdateData) => {
    const validationRules = filterValidationRules(
      input.validationRules,
      typeDomainService.primitiveKind(input.fieldType.id),
    )

    const updatedField = { ...input, validationRules }

    const interfaceType = typeDomainService.type(
      input.api.id,
    ) as IInterfaceTypeModel

    if (updatedField.prevSibling?.id) {
      await fieldService.moveFieldAsNextSibling({
        field: updatedField,
        targetFieldId: updatedField.prevSibling.id,
      })
    } else {
      const firstField = interfaceType.fields.find(
        ({ id, prevSibling }) => id !== updatedField.id && !prevSibling,
      )

      if (firstField) {
        await fieldService.moveFieldAsPrevSibling({
          field: updatedField,
          targetFieldId: firstField.id,
        })
      }
    }

    return fieldService.update({ ...input, validationRules })
  }

  const schema = useMemo(
    () => ({
      ...fieldSchema,
      properties: {
        ...fieldSchema.properties,
        defaultValues: defaultValuesSchema,
      },
    }),
    [defaultValuesSchema],
  )

  if (loading) {
    return null
  }

  return (
    <Form<IFieldUpdateData>
      errorMessage="Error while updating field"
      model={{
        api: field.api,
        description: field.description,
        fieldType: field.type,
        id: field.id,
        key: field.key,
        name: field.name,
        prevSibling: field.prevSibling?.id
          ? { id: field.prevSibling.id }
          : null,
        validationRules: field.validationRules,
      }}
      modelTransform={(mode, model) => {
        // This automatically sets the `defaultValue` to be nullable for types
        // where we don't set a default value like ReactNodeType, InterfaceType
        if (
          mode === 'form' &&
          model.fieldType.id &&
          !canSetDefaultValue(typeDomainService, model.fieldType)
        ) {
          return {
            ...model,
            validationRules: {
              general: {
                nullable: true,
              },
            },
          }
        }

        return model
      }}
      onChangeModel={(model) => {
        console.log(model)

        if (model.fieldType.id) {
          void onFieldTypeChange(model.fieldType.id, model.validationRules)
        }
      }}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={schema}
      submitRef={submitRef}
      successMessage="Field updated successfully"
      uiKey={UiKey.FieldFormUpdate}
    >
      <AutoFields
        fields={['id', 'key', 'name', 'description']}
        omitFields={['prevSibling']}
      />
      <TypeSelect label="Type" name="fieldType" />
      <SelectFieldSibling
        name="prevSibling"
        siblings={field.api.current.fields}
      />

      <DisplayIfField<IFieldUpdateData>
        condition={({ model }) =>
          Boolean(
            model.fieldType.id &&
              typeDomainService.types.has(model.fieldType.id),
          )
        }
      >
        <DisplayIfField<IFieldUpdateData>
          condition={({ model }) =>
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IFieldUpdateData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
      </DisplayIfField>
    </Form>
  )
}
