import {
  IFieldService,
  ITypeService,
  IUpdateFieldDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import {
  createFieldSchema,
  filterValidationRules,
  isFloat,
  isInteger,
  isString,
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

    return fieldService.update(field, {
      ...input,
      validationRules: filterValidationRules(
        input.validationRules,
        typeService.primitiveKind(input.fieldType),
      ),
    })
  }

  const model = {
    interfaceTypeId: field?.api.id,
    id: field?.id,
    name: field?.name,
    key: field?.key,
    fieldType: field?.type.id,
    description: field?.description,
    validationRules: field?.validationRules,
    defaultValues: JSON.stringify(field?.defaultValues),
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
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating field',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={createFieldSchema}
      >
        <AutoFields fields={['key', 'name', 'description', 'defaultValues']} />
        <TypeSelect
          label="Type"
          name="fieldType"
          types={typeService.typesList}
        />

        <AutoFields fields={['validationRules.general']} />

        <DisplayIfField<IUpdateFieldDTO>
          condition={(context) => isString(typeService, context.model)}
        >
          <AutoFields
            fields={[`validationRules.${PrimitiveTypeKind.String}`]}
          />
        </DisplayIfField>
        <DisplayIfField<IUpdateFieldDTO>
          condition={(context) => isInteger(typeService, context.model)}
        >
          <AutoFields
            fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
          />
        </DisplayIfField>
        <DisplayIfField<IUpdateFieldDTO>
          condition={(context) => isFloat(typeService, context.model)}
        >
          <AutoFields fields={[`validationRules.${PrimitiveTypeKind.Float}`]} />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
