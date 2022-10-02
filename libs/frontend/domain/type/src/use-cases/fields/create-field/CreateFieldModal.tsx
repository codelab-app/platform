import {
  ICreateFieldDTO,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
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

const generateDefaultFormModel = () =>
  ({
    id: v4(),
    key: '',
    fieldType: '',
  } as ICreateFieldDTO)

// TODO: Find a better place for this function
export const modifyNestedKey = (
  obj: any,
  is: Array<string>,
  value: any,
): any => {
  if (is.length === 1 && value !== undefined) {
    return (obj[is[0]] = value)
  } else if (is.length === 0) {
    return obj
  } else {
    return modifyNestedKey(obj[is[0]], is.slice(1), value)
  }
}

export const filterValidationRules = (
  rules: Nullish<IValidationRules>,
  primitiveKind: Nullish<Omit<PrimitiveTypeKind, 'Boolean'>>,
) => {
  if (!rules) {
    return {}
  }

  const { general } = rules

  const rest =
    primitiveKind === 'String'
      ? { String: rules.String }
      : primitiveKind === 'Float'
      ? { Float: rules.Float }
      : primitiveKind === 'Integer'
      ? { Integer: rules.Integer }
      : {}

  return {
    general,
    ...rest,
  }
}

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.fieldCreateModal.close()

    const [model, setModel] = React.useState<ICreateFieldDTO>(
      generateDefaultFormModel(),
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
            ...model,
          }}
          onChange={(key, value) => {
            setModel((prev) => {
              const newVal: ICreateFieldDTO = {
                ...prev,
                validationRules: {
                  general: {
                    ...prev?.validationRules?.general,
                  },
                  [PrimitiveTypeKind.String]: {
                    ...prev?.validationRules?.String,
                  },
                  [PrimitiveTypeKind.Float]: {
                    ...prev?.validationRules?.Float,
                  },
                  [PrimitiveTypeKind.Integer]: {
                    ...prev?.validationRules?.Integer,
                  },
                },
              }

              modifyNestedKey(newVal, key.split('.'), value)

              return newVal
            })
          }}
          onSubmit={(input) =>
            typeService.addField(
              typeService.fieldCreateModal?.interface?.id as string,
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
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={() => {
            setModel(generateDefaultFormModel())
            closeModal()
          }}
          schema={createFieldSchema}
        >
          <AutoFields omitFields={['fieldType', 'validationRules']} />
          <TypeSelect
            label="Type"
            name="fieldType"
            types={typeService.typesList}
          />

          <AutoFields fields={['validationRules.general']} />

          {model.fieldType &&
            typeService.primitiveKind(model.fieldType) === 'String' && (
              <AutoFields fields={['validationRules.String']} />
            )}

          {model.fieldType &&
            typeService.primitiveKind(model.fieldType) === 'Integer' && (
              <AutoFields fields={['validationRules.Integer']} />
            )}

          {model.fieldType &&
            typeService.primitiveKind(model.fieldType) === 'Float' && (
              <AutoFields fields={['validationRules.Float']} />
            )}
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
