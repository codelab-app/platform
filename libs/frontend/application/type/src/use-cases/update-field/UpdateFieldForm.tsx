'use client'
import type { IUpdateFieldData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { SelectDefaultValue } from '@codelab/frontend/presentation/components/interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useFieldService } from '../../services'
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
  id: string
}

export const UpdateFieldForm = observer<UpdateFieldFormProps>(
  ({ id, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const fieldService = useFieldService()
    const { fieldDomainService, typeDomainService } = useDomainStore()
    const field = fieldDomainService.fields.get(id)
    const fieldSchema = useFieldSchema(createFieldSchema, field)

    const onSubmit = (input: IUpdateFieldData) => {
      if (!field) {
        throw new Error('Updated field is not set')
      }

      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      return fieldService.update({ ...input, validationRules })
    }

    return (
      <Form<IUpdateFieldData>
        errorMessage="Error while updating field"
        model={{
          defaultValues: field?.defaultValues,
          description: field?.description,
          fieldType: field?.type.id,
          id: field?.id,
          interfaceTypeId: field?.api.id,
          key: field?.key,
          name: field?.name,
          validationRules: field?.validationRules,
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
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={fieldSchema}
        submitRef={submitRef}
        successMessage="Field updated successfully"
        uiKey={UiKey.FieldFormUpdate}
      >
        <AutoFields fields={['id', 'key', 'name', 'description']} />
        <TypeSelect label="Type" name="fieldType" />
        <DisplayIfField<IUpdateFieldData>
          condition={({ model }) =>
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IUpdateFieldData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>

        <DisplayIfField<IUpdateFieldData>
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
