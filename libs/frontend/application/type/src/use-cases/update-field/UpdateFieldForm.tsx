import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { IUpdateFieldData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { SelectDefaultValue } from '../../interface-form'
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

interface UpdateFieldFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const UpdateFieldForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: UpdateFieldFormProps) => {
    const { fieldService, typeService } = useStore()
    const fieldSchema = useFieldSchema(createFieldSchema)
    const closeForm = () => fieldService.updateForm.close()
    const field = fieldService.updateForm.field

    const onSubmit = (input: IUpdateFieldData) => {
      if (!field) {
        throw new Error('Updated field is not set')
      }

      const validationRules = filterValidationRules(
        input.validationRules,
        typeService.primitiveKind(input.fieldType),
      )

      void fieldService.update({ ...input, validationRules })

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<IUpdateFieldData>
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
            !canSetDefaultValue(typeService, model.fieldType)
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
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating field',
        })}
        onSubmitSuccess={closeForm}
        schema={fieldSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.UpdateField.key}
      >
        <AutoFields fields={['id', 'key', 'name', 'description']} />
        <TypeSelect label="Type" name="fieldType" />
        <DisplayIfField<IUpdateFieldData>
          condition={({ model }) =>
            !isBoolean(typeService, model.fieldType) &&
            canSetDefaultValue(typeService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IUpdateFieldData>
          condition={({ model }) => isPrimitive(typeService, model.fieldType)}
        >
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) => isString(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) => isInteger(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldData>
            condition={({ model }) => isFloat(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>

        <DisplayIfField<IUpdateFieldData>
          condition={({ model }) =>
            canSetDefaultValue(typeService, model.fieldType)
          }
        >
          <SelectDefaultValue />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Field" />
        </DisplayIf>
      </Form>
    )
  },
)
