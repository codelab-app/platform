import {
  ICreateFieldDTO,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import pick from 'lodash/pick'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'

export interface CreateFieldModalProps {
  typeService: ITypeService
}

type FieldCondition = (
  typeService: ITypeService,
  model: DeepPartial<ICreateFieldDTO>,
) => boolean

export const filterValidationRules = (
  rules: Nullish<IValidationRules>,
  primitiveKind: Nullish<Omit<PrimitiveTypeKind, 'Boolean'>>,
) => {
  if (!rules) {
    return {}
  }

  const { general } = rules

  const rest = primitiveKind
    ? pick(rules, primitiveKind as keyof typeof rules)
    : {}

  return { general, ...rest }
}

export const isString: FieldCondition = (typeService, { fieldType }) =>
  Boolean(fieldType && typeService.primitiveKind(fieldType))

export const isInteger: FieldCondition = (typeService, { fieldType }) =>
  Boolean(fieldType && typeService.primitiveKind(fieldType))

export const isFloat: FieldCondition = (typeService, { fieldType }) =>
  Boolean(fieldType && typeService.primitiveKind(fieldType))

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.fieldCreateModal.close()

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={typeService.fieldCreateModal.isOpen}
      >
        <ModalForm.Form<ICreateFieldDTO>
          model={{}}
          onSubmit={(input) =>
            typeService.addField(
              typeService.fieldCreateModal.interface?.id as string,
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
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields omitFields={['fieldType', 'validationRules']} />
          <TypeSelect
            label="Type"
            name="fieldType"
            types={typeService.typesList}
          />
          <AutoFields fields={['validationRules.general']} />
          <DisplayIfField<ICreateFieldDTO>
            condition={(context) => isString(typeService, context.model)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldDTO>
            condition={(context) => isInteger(typeService, context.model)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldDTO>
            condition={(context) => isFloat(typeService, context.model)}
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Float}`]}
            />
          </DisplayIfField>{' '}
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
