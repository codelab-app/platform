import {
  IFieldService,
  ITypeService,
  IUpdateFieldDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullable } from '@codelab/shared/abstract/types'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema, filterValidationRules } from '../create-field'

export const UpdateFieldModal = observer<{
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeService, fieldService }) => {
  const closeModal = () => fieldService.updateModal.close()
  const [model, setModel] = useState<Nullable<IUpdateFieldDTO>>(null)

  useEffect(() => {
    const field = fieldService.updateModal.field
    const interfaceTypeId = fieldService.updateModal.interface?.id

    if (!field || !interfaceTypeId) {
      return
    }

    setModel({
      interfaceTypeId,
      id: field.id,
      name: field.name,
      key: field.key,
      fieldType: field.type.id,
      description: field.description,
      validationRules: field.validationRules,
      defaultValues: JSON.stringify(field.defaultValues),
    })
  }, [
    fieldService.updateModal.field,
    fieldService.updateModal.field?.validationRules,
  ])

  useAsync(() => typeService.getAll(), [])

  if (!model) {
    return null
  }

  return (
    <ModalForm.Modal
      className="update-field-modal"
      okText="Update"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Update field</span>}
      visible={fieldService.updateModal.isOpen}
    >
      <ModalForm.Form<Omit<IUpdateFieldDTO, 'interfaceTypeId'>>
        model={model}
        onChange={(key, value) => {
          setModel((prev) => prev && set(cloneDeep(prev), key, value))
        }}
        onSubmit={(input) => {
          const interfaceTypeId = fieldService.updateModal.interface?.id

          if (!interfaceTypeId) {
            throw new Error('Missing interface type id')
          }

          return fieldService.update(model, {
            ...input,
            key: model.key,
            interfaceTypeId,
            validationRules: filterValidationRules(
              input.validationRules,
              typeService.primitiveKind(input.fieldType),
            ),
          })
        }}
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

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) ===
            PrimitiveTypeKind.String && (
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) ===
            PrimitiveTypeKind.Integer && (
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) ===
            PrimitiveTypeKind.Float && (
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Float}`]}
            />
          )}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
