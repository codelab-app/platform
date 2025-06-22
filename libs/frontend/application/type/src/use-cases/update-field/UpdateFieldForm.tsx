'use client'

import type { IFieldModel } from '@codelab/frontend-abstract-domain'

import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { AutoField, AutoFields } from 'uniforms-antd'

import {
  canSetDefaultValue,
  createFieldSchema,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from '../create-field'
import { useFieldSchema } from '../hooks'
import { IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { IFieldUpdateFormData } from '@codelab/shared-abstract-core'
import { titleCase } from '@codelab/shared-utils'

export interface UpdateFieldFormProps extends IFormController {
  disabled?: boolean
  field: IFieldModel
  onSubmit(data: IFieldUpdateFormData): void
}

export const UpdateFieldForm = ({
  disabled,
  field,
  onSubmit,
  onSubmitSuccess,
  submitRef,
}: UpdateFieldFormProps) => {
  const { typeDomainService } = useDomainStore()
  const fieldSchema = useFieldSchema(createFieldSchema, field)

  return (
    <Form<IFieldUpdateFormData>
      disabled={disabled}
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
      onSubmit={async (data) => {
        onSubmit(data ?? field.toJson)
      }}
      onSubmitSuccess={onSubmitSuccess}
      schema={fieldSchema}
      submitRef={submitRef}
      successMessage="Field updated successfully"
      uiKey={UiKey.FieldFormUpdate}
    >
      <AutoFields
        omitFields={['prevSibling', 'validationRules', 'fieldType']}
      />
      <AutoField
        disabled={disabled}
        name="fieldType.id"
        optionFilterProp="label"
        options={typeDomainService.options}
        showSearch
      />

      <AutoField
        name="prevSibling.id"
        optionFilterProp="label"
        options={field.api.current.fields
          .filter((sibling) => sibling.id !== field.id)
          .map((sibling) => ({
            label: sibling.name ?? titleCase(sibling.key),
            value: sibling.id,
          }))}
        showSearch
      />

      <DisplayIfField<IFieldUpdateFormData>
        condition={({ model }) =>
          Boolean(
            model.fieldType.id &&
              typeDomainService.types.has(model.fieldType.id),
          )
        }
      >
        <DisplayIfField<IFieldUpdateFormData>
          condition={({ model }) =>
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IFieldUpdateFormData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<IFieldUpdateFormData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateFormData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateFormData>
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
