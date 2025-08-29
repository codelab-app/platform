'use client'

import type { IFieldModel } from '@codelab/frontend-abstract-domain'
import type { IFormController } from '@codelab/frontend-abstract-types'
import type { IFieldUpdateFormData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { titleCase } from '@codelab/shared-utils'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'

import {
  canSetDefaultValue,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from '../create-field'
import { useForbiddenValues } from '../hooks'
import { updateFieldSchema } from './update-field.schema'

export interface UpdateFieldFormProps extends IFormController {
  disabled?: boolean
  field: IFieldModel
  onSubmit(data: IFieldUpdateFormData): void
}

export const UpdateFieldForm = observer<UpdateFieldFormProps>(
  ({ disabled, field, onSubmit, onSubmitSuccess, submitRef }) => {
    const { typeDomainService } = useDomainStore()
    const forbiddenValues = useForbiddenValues(field)

    return (
      <Form<IFieldUpdateFormData>
        disabled={disabled}
        model={{
          api: {
            id: field.api.id,
          },
          description: field.description,
          fieldType: {
            id: field.type.id,
          },
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
        schema={updateFieldSchema}
        submitRef={submitRef}
        uiKey={UiKey.FieldFormUpdate}
      >
        <AutoFields
          omitFields={['key', 'prevSibling', 'validationRules', 'fieldType']}
        />
        <AutoField forbiddenValues={forbiddenValues} name="key" />

        <AutoField
          disabled={disabled}
          name="fieldType.id"
          optionFilterProp="label"
          options={typeDomainService.options}
          showSearch
        />

        <AutoField
          disabled={disabled}
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
  },
)
