'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { SelectDefaultValue } from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
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
import { useFieldService } from '../../services'
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
  const fieldService = useFieldService()
  const { typeDomainService } = useDomainStore()
  const createFieldModal = useCreateFieldModal()
  const closeModal = () => createFieldModal.close()
  const interfaceTypeId = createFieldModal.data?.id

  const onSubmit = (input: ICreateFieldData) => {
    if (!interfaceTypeId) {
      throw new Error('Missing interface type id')
    }

    const validationRules = filterValidationRules(
      input.validationRules,
      typeDomainService.primitiveKind(input.fieldType),
    )

    void fieldService.create({ ...input, validationRules })

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Create"
      onCancel={closeModal}
      open={createFieldModal.isOpen}
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
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
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
