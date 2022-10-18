import {
  ICreateFieldDTO,
  IFieldService,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'

export interface CreateFieldModalProps {
  typeService: ITypeService
  fieldService: IFieldService
}

const generateDefaultFormModel = () =>
  ({
    id: v4(),
    key: '',
    fieldType: '',
  } as ICreateFieldDTO)

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
  ({ fieldService, typeService }) => {
    const closeModal = () => fieldService.createModal.close()

    const [model, setModel] = React.useState<ICreateFieldDTO>(
      generateDefaultFormModel(),
    )

    useAsync(() => typeService.getAll(), [])

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={fieldService.createModal.isOpen}
      >
        <ModalForm.Form<Omit<ICreateFieldDTO, 'interfaceTypeId'>>
          model={{
            ...model,
          }}
          onChange={(key, value) => {
            setModel((prev) => set(cloneDeep(prev), key, value))
          }}
          onSubmit={(input) => {
            const interfaceTypeId = fieldService.createModal.interface?.id

            if (!interfaceTypeId) {
              throw new Error('Missing interface type id')
            }

            return fieldService.create([
              {
                ...input,
                interfaceTypeId,
                validationRules: filterValidationRules(
                  input.validationRules,
                  typeService.primitiveKind(input.fieldType),
                ),
              },
            ])
          }}
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
  },
)
