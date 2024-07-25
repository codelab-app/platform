import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  DisplayIfField,
  ModalForm,
} from '@codelab/frontend-presentation-components-form'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { ICreateFieldData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { SelectDefaultValue } from '../../interface-form'
import { TypeSelect } from '../select-types'
import { createFieldSchema } from './create-field.schema'
import { useCreateFieldModal } from './create-field.state'
import {
  canSetDefaultValue,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from './field-utils'

export const CreateFieldModal = observer(() => {
  const { fieldService, typeService } = useStore()
  const createFieldModal = useCreateFieldModal()
  const closeModal = () => createFieldModal.close()
  const interfaceTypeId = createFieldModal.data?.id

  const onSubmit = (input: ICreateFieldData) => {
    if (!interfaceTypeId) {
      throw new Error('Missing interface type id')
    }

    const validationRules = filterValidationRules(
      input.validationRules,
      typeService.primitiveKind(input.fieldType),
    )

    void fieldService.create({ ...input, validationRules })

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Create"
      onCancel={closeModal}
      open={fieldService.createModal.isOpen}
      title={<span className="font-semibold">Create field</span>}
    >
      <ModalForm.Form<ICreateFieldData>
        model={{
          id: v4(),
          interfaceTypeId,
        }}
        modelTransform={(mode, model) => {
          // This automatically sets the `defaultValue` to be nullable for types
          // where we dont set a default value like ReactNodeType, InterfaceType
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
          title: 'Error while creating field',
        })}
        onSubmitSuccess={closeModal}
        schema={createFieldSchema}
        uiKey={MODEL_ACTION.CreateField.key}
      >
        <AutoFields
          omitFields={[
            'fieldType',
            'validationRules',
            'interfaceTypeId',
            'defaultValues',
          ]}
        />
        <TypeSelect label="Type" name="fieldType" />
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) =>
            !isBoolean(typeService, model.fieldType) &&
            canSetDefaultValue(typeService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) => isPrimitive(typeService, model.fieldType)}
        >
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) => isString(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) => isInteger(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) => isFloat(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) =>
            canSetDefaultValue(typeService, model.fieldType)
          }
        >
          <SelectDefaultValue />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
