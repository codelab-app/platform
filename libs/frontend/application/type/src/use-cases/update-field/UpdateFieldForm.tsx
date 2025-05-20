'use client'
import type {
  type IFieldModel,
  type IInterfaceTypeModel,
  ITypeModel,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type {
  IFieldUpdateData,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectDefaultValue,
  SelectFieldSibling,
  uniformSchemaFactory,
} from '@codelab/frontend/presentation/components/interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
import { observer } from 'mobx-react-lite'
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

export const UpdateFieldForm = observer(
  ({
    field,
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: UpdateFieldFormProps) => {
    const fieldService = useFieldService()
    const typeService = useTypeService()
    const { typeDomainService } = useDomainStore()
    const fieldSchema = useFieldSchema(createFieldSchema, field)

    const [defaultValuesSchema, setDefaultValuesSchema] =
      useState<Nullable<JsonSchema>>(null)

    const { loading } = useAsync(async () => {
      if (!typeDomainService.types.has(field.type.id)) {
        await typeService.getAll([field.type.id])
      }

      setDefaultValuesSchema(
        getDefaultValuesSchema(field.type.current, field.validationRules),
      )
    }, [])

    const onSubmit = async (input: IFieldUpdateData) => {
      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      const updatedField = { ...input, validationRules }

      const interfaceType = typeDomainService.type(
        input.interfaceTypeId,
      ) as IInterfaceTypeModel

      const firstField = interfaceType.fields.find(
        ({ prevSibling }) => !prevSibling,
      )

      if (updatedField.prevSibling?.id) {
        await fieldService.moveFieldAsNextSibling({
          field: updatedField,
          targetFieldId: updatedField.prevSibling.id,
        })
      } else if (firstField) {
        await fieldService.moveFieldAsPrevSibling({
          field: updatedField,
          targetFieldId: firstField.id,
        })
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
          defaultValues: field.defaultValues,
          description: field.description,
          fieldType: field.type.id,
          id: field.id,
          interfaceTypeId: field.api.id,
          key: field.key,
          name: field.name,
          prevSibling: field.prevSibling,
          validationRules: field.validationRules,
        }}
        modelTransform={(mode, model) => {
          // This automatically sets the `defaultValue` to be nullable for types
          // where we don't set a default value like ReactNodeType, InterfaceType
          if (
            mode === 'form' &&
            model.fieldType &&
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
          if (model.fieldType) {
            const newFieldType = typeDomainService.type(model.fieldType)

            setDefaultValuesSchema(
              getDefaultValuesSchema(newFieldType, model.validationRules),
            )
          }
        }}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        successMessage="Field updated successfully"
        uiKey={UiKey.FieldFormUpdate}
      >
        <AutoFields fields={['id', 'key', 'name', 'description']} />
        <TypeSelect label="Type" name="fieldType" />
        <SelectFieldSibling field={field} name="prevSibling" />

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

        <DisplayIfField<IFieldUpdateData>
          condition={({ model }) =>
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <SelectDefaultValue />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController
            onCancel={onSubmitSuccess}
            submitLabel="Update Field"
          />
        </DisplayIf>
      </Form>
    )
  },
)
