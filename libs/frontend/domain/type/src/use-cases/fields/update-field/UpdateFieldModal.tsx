import { ITypeService, IUpdateFieldDTO } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullable } from '@codelab/shared/abstract/types'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema, filterValidationRules } from '../create-field'

export const UpdateFieldModal = observer<{
  typeService: ITypeService
}>(({ typeService }) => {
  const closeModal = () => typeService.fieldUpdateModal.close()
  const [model, setModel] = useState<Nullable<IUpdateFieldDTO>>(null)

  useEffect(() => {
    const field = typeService.fieldUpdateModal.field

    if (!field) {
      return
    }

    setModel({
      id: field.id,
      name: field.name,
      key: field.key,
      fieldType: field.type.id,
      description: field.description,
      validationRules: field.validationRules,
      defaultValues: JSON.stringify(field.defaultValues),
    })
  }, [
    typeService.fieldUpdateModal.field,
    typeService.fieldUpdateModal.field?.validationRules,
  ])

  if (!model) {
    return null
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
        onChange={(key, value) => {
          setModel((prev) => prev && set(cloneDeep(prev), key, value))
        }}
        onSubmit={(input) =>
          typeService.updateField(
            typeService.fieldUpdateModal?.interface?.id as string,
            model.key,
            {
              ...input,
              validationRules: filterValidationRules(
                input.validationRules,
                typeService.primitiveKind(input.fieldType),
              ),
            },
          )
        }
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
