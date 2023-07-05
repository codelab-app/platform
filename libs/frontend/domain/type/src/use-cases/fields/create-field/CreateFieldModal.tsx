import type { ICreateFieldData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { DisplayIfField, ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { SelectDefaultValue } from '../../../interface-form'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './create-field.schema'
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
  const closeModal = () => fieldService.createModal.close()
  const interfaceTypeId = fieldService.createModal.interface?.id

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
      className="create-field-modal"
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
        onSubmitError={createNotificationHandler({
          title: 'Error while creating field',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={createFieldSchema}
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
          <SelectDefaultValue typeService={typeService} />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
