import {
  ICreateFieldDTO,
  IFieldService,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import pick from 'lodash/pick'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'

export interface CreateFieldModalProps {
  typeService: ITypeService
  fieldService: IFieldService
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
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.String,
  )

export const isInteger: FieldCondition = (typeService, { fieldType }) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.Integer,
  )

export const isFloat: FieldCondition = (typeService, { fieldType }) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.Float,
  )

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ fieldService, typeService }) => {
    const closeModal = () => fieldService.createModal.close()
    const interfaceTypeId = fieldService.createModal.interface?.id

    const onSubmit = (input: ICreateFieldDTO) => {
      if (!interfaceTypeId) {
        throw new Error('Missing interface type id')
      }

      return fieldService.create([
        {
          ...input,
          validationRules: filterValidationRules(
            input.validationRules,
            typeService.primitiveKind(input.fieldType),
          ),
        },
      ])
    }

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={fieldService.createModal.isOpen}
      >
        <ModalForm.Form<ICreateFieldDTO>
          model={{
            id: v4(),
            interfaceTypeId,
          }}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields
            omitFields={[
              'fieldType',
              'validationRules',
              'interfaceTypeId',
              'defaultValues',
            ]}
          />
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
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
