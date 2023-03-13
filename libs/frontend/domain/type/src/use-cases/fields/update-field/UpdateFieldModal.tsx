import type {
  IFieldService,
  ITypeService,
  IUpdateFieldData,
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
  fieldService: IFieldService
  typeService: ITypeService
}>(({ fieldService, typeService }) => {
  const closeModal = () => fieldService.updateModal.close()
  const field = fieldService.updateModal.field

  const onSubmit = (input: IUpdateFieldData) => {
    if (!field) {
      throw new Error('Updated field is not set')
    }

    const validationRules = filterValidationRules(
      input.validationRules,
      typeService.primitiveKind(input.fieldType),
    )

    return fieldService.update({ ...input, validationRules })
  }

  return (
    <ModalForm.Modal
      className="update-field-modal"
      okText="Update"
      onCancel={closeModal}
      open={fieldService.updateModal.isOpen}
      title={<span css={tw`font-semibold`}>Update field</span>}
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
            !isInterfaceType(typeService, model.fieldType)
          }
        >
          <SelectDefaultValue typeService={typeService} />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
