'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { SelectDefaultValue } from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  ModalForm,
} from '@codelab/frontend-presentation-components-form'
import type { IUpdateFieldData } from '@codelab/shared/abstract/core'
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
import { TypeSelect } from '../select-types'
import { useUpdateFieldModal } from './update-field.state'

export const UpdateFieldModal = observer(() => {
  const updateFieldModal = useUpdateFieldModal()
  const fieldService = useFieldService()
  const { typeDomainService } = useDomainStore()
  const closeModal = () => updateFieldModal.close()
  const field = updateFieldModal.data

  const onSubmit = (input: IUpdateFieldData) => {
    if (!field) {
      throw new Error('Updated field is not set')
    }

    const validationRules = filterValidationRules(
      input.validationRules,
      typeDomainService.primitiveKind(input.fieldType),
    )

    void fieldService.update({ ...input, validationRules })

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update"
      onCancel={closeModal}
      open={updateFieldModal.isOpen}
      title={<span className="font-semibold">Update field</span>}
      uiKey={UiKey.UpdateFieldModal}
    >
      <ModalForm.Form<IUpdateFieldData>
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
          // where we dont set a default value like ReactNodeType, InterfaceType
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
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating field',
        })}
        onSubmitSuccess={closeModal}
        schema={createFieldSchema}
      >
        <AutoFields fields={['key', 'name', 'description']} />
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
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
