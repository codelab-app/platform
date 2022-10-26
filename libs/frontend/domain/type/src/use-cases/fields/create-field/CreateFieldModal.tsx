import {
  ICreateFieldDTO,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'
import { transformInput } from './field-utils'

export interface CreateFieldModalProps {
  typeService: ITypeService
  fieldService: IFieldService
}

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ fieldService, typeService }) => {
    const closeModal = () => fieldService.createModal.close()
    const interfaceTypeId = fieldService.createModal.interface?.id

    const onSubmit = (input: ICreateFieldDTO) => {
      if (!interfaceTypeId) {
        throw new Error('Missing interface type id')
      }

      return fieldService.create([transformInput(typeService, input)])
    }

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={fieldService.createModal.isOpen}
      >
        <ModalForm.Form<ICreateFieldDTO>
          model={{
            id: v4(),
            interfaceTypeId,
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
          <TypeSelect
            label="Type"
            name="fieldType"
            types={typeService.typesList}
          />
          <AutoFields fields={['validationRules.general']} />
          <DisplayIfField<ICreateFieldDTO>
            condition={({ model }) => isPrimitive(typeService, model.fieldType)}
          >
            <DisplayIfField<ICreateFieldDTO>
              condition={({ model }) => isString(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[
                  `validationRules.${PrimitiveTypeKind.String}`,
                  `defaultValues.${PrimitiveTypeKind.String}`,
                ]}
              />
            </DisplayIfField>
            <DisplayIfField<ICreateFieldDTO>
              condition={({ model }) => isInteger(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[
                  `validationRules.${PrimitiveTypeKind.Integer}`,
                  `defaultValues.${PrimitiveTypeKind.Integer}`,
                ]}
              />
            </DisplayIfField>
            <DisplayIfField<ICreateFieldDTO>
              condition={({ model }) => isFloat(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[
                  `validationRules.${PrimitiveTypeKind.Float}`,
                  `defaultValues.${PrimitiveTypeKind.Float}`,
                ]}
              />
            </DisplayIfField>
            <DisplayIfField<ICreateFieldDTO>
              condition={({ model }) => isBoolean(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[`defaultValues.${PrimitiveTypeKind.Boolean}`]}
              />
            </DisplayIfField>
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
