'use client'

import type { IFieldCreateFormData } from '@codelab/shared-abstract-core'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useForbiddenValues } from '../hooks'
import { createFieldSchema } from './create-field.schema'
import {
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from './field-utils'

interface CreateFieldFormProps extends IFormController {
  disabled: boolean
  interfaceId: string
  onSubmit(data: IFieldCreateFormData): void
}

export const CreateFieldForm = observer<CreateFieldFormProps>(
  ({ disabled, interfaceId, onSubmit, onSubmitSuccess, submitRef }) => {
    const { typeDomainService } = useDomainStore()
    const forbiddenValues = useForbiddenValues()

    const formModel = useMemo(
      () =>
        ({
          api: { id: interfaceId },
          id: v4(),
        } as IFieldCreateFormData),
      [],
    )

    return (
      <Form<IFieldCreateFormData>
        disabled={disabled}
        model={formModel}
        onSubmit={async (input: IFieldCreateFormData) => {
          const validationRules = filterValidationRules(
            input.validationRules,
            typeDomainService.primitiveKind(input.fieldType.id),
          )

          onSubmit({ ...input, validationRules })
        }}
        onSubmitSuccess={onSubmitSuccess}
        schema={createFieldSchema}
        submitRef={submitRef}
        uiKey={UiKey.FieldFormCreate}
      >
        <AutoFields
          omitFields={['key', 'fieldType', 'api', 'validationRules']}
        />
        <AutoField forbiddenValues={forbiddenValues} name="key" />
        <AutoField
          disabled={disabled}
          name="fieldType.id"
          optionFilterProp="label"
          options={typeDomainService.options}
          showSearch
        />
        <DisplayIfField<IFieldCreateFormData>
          condition={({ model }) =>
            !isBoolean(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IFieldCreateFormData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<IFieldCreateFormData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldCreateFormData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldCreateFormData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
      </Form>
    )
  },
)
