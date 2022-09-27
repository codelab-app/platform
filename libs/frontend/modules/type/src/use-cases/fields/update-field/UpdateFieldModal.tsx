import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeService, IUpdateFieldDTO } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema, modifyNestedKey } from '../create-field'

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
          setModel((prev) => {
            if (!prev) {
              return prev
            }

            const newVal: IUpdateFieldDTO = {
              ...prev,
              validationRules: {
                general: {
                  ...prev.validationRules.general,
                },
                string: {
                  ...prev.validationRules.string,
                },
                float: {
                  ...prev.validationRules.float,
                },
                integer: {
                  ...prev.validationRules.integer,
                },
              },
            }

            modifyNestedKey(newVal, key.split('.'), value)

            return newVal
          })
        }}
        onSubmit={(input) =>
          typeService.updateField(
            typeService.fieldUpdateModal?.interface?.id as string,
            model.key,
            input,
          )
        }
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

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'String' && (
            <AutoFields fields={['validationRules.string']} />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'Integer' && (
            <AutoFields fields={['validationRules.integer']} />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'Float' && (
            <AutoFields fields={['validationRules.float']} />
          )}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
