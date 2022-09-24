import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateFieldDTO, ITypeService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'

export interface CreateFieldModalProps {
  typeService: ITypeService
}

const generateDefaultFormData = () => ({
  id: v4(),
  key: '',
  fieldType: '',
})

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.fieldCreateModal.close()

    const [data, setData] = React.useState<ICreateFieldDTO>(
      generateDefaultFormData(),
    )

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={typeService.fieldCreateModal.isOpen}
      >
        <ModalForm.Form<ICreateFieldDTO>
          model={{
            ...data,
          }}
          onChange={(key, value) => {
            setData((prev) => {
              // TODO: definetly improve this (works for only 1 level of nesting)
              const rootKey = key.split('.')[0]
              const nestedKey = key.split('.')[1]

              const valueToSet = nestedKey
                ? { ...(prev as any)[rootKey], [nestedKey]: value }
                : value

              return { ...prev, [rootKey]: valueToSet }
            })
          }}
          onSubmit={(input) =>
            typeService.addField(
              typeService.fieldCreateModal?.interface?.id as string,
              input,
            )
          }
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={() => {
            setData(generateDefaultFormData())
            closeModal()
          }}
          schema={createFieldSchema}
        >
          <AutoFields
            omitFields={[
              'fieldType',
              'generalValidationRules',
              'stringValidationRules',
              'integerValidationRules',
              'floatValidationRules',
            ]}
          />
          <TypeSelect
            label="Type"
            name="fieldType"
            types={typeService.typesList}
          />

          <AutoFields fields={['generalValidationRules']} />

          {data.fieldType &&
            typeService.primitiveKind(data.fieldType) === 'String' && (
              <AutoFields fields={['stringValidationRules']} />
            )}

          {data.fieldType &&
            typeService.primitiveKind(data.fieldType) === 'Integer' && (
              <AutoFields fields={['integerValidationRules']} />
            )}

          {data.fieldType &&
            typeService.primitiveKind(data.fieldType) === 'Float' && (
              <AutoFields fields={['floatValidationRules']} />
            )}
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
