import {
  IElementService,
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
  elementService: IElementService
}>(({ typeService, elementService }) => {
  const closeModal = () => typeService.fieldUpdateModal.close()
  const interfaceId = typeService.fieldUpdateModal.interface?.id
  const field = typeService.fieldUpdateModal.field

  if (!field || !interfaceId) {
    return null
  }

  const model = {
    id: field.id,
    name: field.name,
    key: field.key,
    fieldType: field.type.id,
    description: field.description,
    validationRules: field.validationRules,
    defaultValues: JSON.stringify(field.defaultValues),
  }

  const onSubmit = async (input: IUpdateFieldDTO) => {
    const data: IUpdateFieldDTO = {
      ...input,
      validationRules: filterValidationRules(
        input.validationRules,
        typeService.primitiveKind(input.fieldType),
      ),
    }

    return Promise.all([
      typeService.updateField(interfaceId, field.key, data),
      elementService.updateAtomPropKey(interfaceId, field.key, data.key),
    ])
  }

  return (
    <ModalForm.Modal
      className="update-field-modal"
      okText="Update"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Update field</span>}
      visible={typeService.fieldUpdateModal.isOpen}
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
