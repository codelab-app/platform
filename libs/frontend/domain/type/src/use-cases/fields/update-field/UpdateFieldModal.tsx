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
import { SelectDefaultValue } from '../../../interface-form'
import { TypeSelect } from '../../../shared'
import {
  createFieldSchema,
  filterValidationRules,
  isFloat,
  isInteger,
  isInterfaceType,
  isPrimitive,
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

    const validationRules = filterValidationRules(
      input.validationRules,
      typeService.primitiveKind(input.fieldType),
    )

    return fieldService.update(field, { ...input, validationRules })
  }

  return (
    <ModalForm.Modal
      className="update-field-modal"
      okText="Update"
      onCancel={closeModal}
      open={fieldService.updateModal.isOpen}
      title={<span css={tw`font-semibold`}>Update field</span>}
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
          defaultValues: field?.defaultValues,
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
        <TypeSelect label="Type" name="fieldType" />
        <AutoFields fields={['validationRules.general']} />
        <DisplayIfField<IUpdateFieldDTO>
          condition={({ model }) => isPrimitive(typeService, model.fieldType)}
        >
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isString(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isInteger(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IUpdateFieldDTO>
            condition={({ model }) => isFloat(typeService, model.fieldType)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Float}`]}
            />
          </DisplayIfField>
        </DisplayIfField>

        <DisplayIfField<IUpdateFieldDTO>
          condition={({ model }) =>
            !isInterfaceType(typeService, model.fieldType)
          }
        >
          <SelectDefaultValue typeService={typeService} />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
