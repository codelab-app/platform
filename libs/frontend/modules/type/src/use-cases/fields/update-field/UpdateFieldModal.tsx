import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeService, IUpdateFieldDTO } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from '../create-field'

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

    const validationSchema = JSON.parse(field.validationSchema || '{}')

    setModel({
      id: field.id,
      name: field.name,
      key: field.key,
      fieldType: field.type.id,
      description: field.description,
      validationSchema: { ...validationSchema },
    })
  }, [
    typeService.fieldUpdateModal.field,
    typeService.fieldUpdateModal.field?.validationSchema,
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
            // TODO: definetly improve this (works for only 1 level of nesting)

            if (!prev) {
              return prev
            }

            if (key.split('.')[0] === 'validationSchema') {
              const nestedKey = key.split('.')[1]

              return {
                ...prev,
                validationSchema: {
                  ...prev.validationSchema,
                  [nestedKey]: value,
                },
              }
            }

            return { ...prev, [key]: value }
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

        <AutoFields fields={['validationSchema.nullable']} />

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'String' && (
            <AutoFields
              fields={[
                'validationSchema.minLength',
                'validationSchema.maxLength',
                'validationSchema.pattern',
              ]}
            />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'Integer' && (
            <AutoFields
              fields={[
                'validationSchema.minimum',
                'validationSchema.maximum',
                'validationSchema.exclusiveMaximum',
                'validationSchema.exclusiveMinimum',
                'validationSchema.multipleOf',
              ]}
            />
          )}

        {model.fieldType &&
          typeService.primitiveKind(model.fieldType) === 'Float' && (
            <AutoFields
              fields={[
                'validationSchema.minimum',
                'validationSchema.maximum',
                'validationSchema.exclusiveMaximum',
                'validationSchema.exclusiveMinimum',
                'validationSchema.multipleOf',
              ]}
            />
          )}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
