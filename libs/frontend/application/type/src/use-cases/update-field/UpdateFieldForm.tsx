'use client'
import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { IFieldUpdateData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { SelectDefaultValue } from '@codelab/frontend/presentation/components/interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
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
  field: IFieldModel
}

export const UpdateFieldForm = observer<UpdateFieldFormProps>(
  ({ field, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const fieldService = useFieldService()
    const { typeDomainService } = useDomainStore()
    const fieldSchema = useFieldSchema(createFieldSchema, field)

    const onSubmit = (input: IFieldUpdateData) => {
      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      return fieldService.update({ ...input, validationRules })
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
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={fieldSchema}
        submitRef={submitRef}
        successMessage="Field updated successfully"
        uiKey={UiKey.FieldFormUpdate}
      >
        <AutoFields fields={['id', 'key', 'name', 'description']} />
        <TypeSelect label="Type" name="fieldType" />
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
