import {
  IFieldService,
  ITypeService,
  IUpdateFieldDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import {
  createFieldSchema,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
  transformInput,
} from '../create-field'

export const UpdateFieldModal = observer<{
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeService, fieldService }) => {
  const closeModal = () => fieldService.updateModal.close()
  const field = fieldService.updateModal.field

  const onSubmit = (input: IUpdateFieldDTO) => {
    if (!field) {
      throw new Error('Updated field is not set')
    }

    return fieldService.update(field, transformInput(typeService, input))
  }

  return (
    <ModalForm.Modal
      className="update-field-modal"
      okText="Update"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Update field</span>}
      visible={fieldService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateFieldDTO>
        model={{
          interfaceTypeId: field?.api.id,
          id: field?.id,
          name: field?.name,
          key: field?.key,
          fieldType: field?.type.id,
          description: field?.description,
          validationRules: field?.validationRules,
          defaultValues:
            field?.type.current.kind === ITypeKind.PrimitiveType
              ? { [field.type.current.primitiveKind]: field.defaultValues }
              : null,
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating field',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={createFieldSchema}
      >
        <AutoFields fields={['key', 'name', 'description']} />
        <TypeSelect
          label="Type"
          name="fieldType"
          types={typeService.typesList}
        />
        <AutoFields fields={['validationRules.general']} />
        <DisplayIfField<IUpdateFieldDTO>
          condition={({ model }) => isPrimitive(typeService, model.fieldType)}
        >
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isString(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[
                `validationRules.${PrimitiveTypeKind.String}`,
                `defaultValues.${PrimitiveTypeKind.String}`,
              ]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isInteger(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[
                `validationRules.${PrimitiveTypeKind.Integer}`,
                `defaultValues.${PrimitiveTypeKind.Integer}`,
              ]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isFloat(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[
                `validationRules.${PrimitiveTypeKind.Float}`,
                `defaultValues.${PrimitiveTypeKind.Float}`,
              ]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldDTO>
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
})
