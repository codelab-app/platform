import type {
  ICreateFieldData,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { SelectDefaultValue } from '../../../interface-form'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './create-field.schema'
import {
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isInterfaceType,
  isPrimitive,
  isString,
} from './field-utils'

export interface CreateFieldModalProps {
  typeService: ITypeService
  fieldService: IFieldService
}

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ fieldService, typeService }) => {
    const closeModal = () => fieldService.createModal.close()
    const interfaceTypeId = fieldService.createModal.interface?.id

    const onSubmit = (input: ICreateFieldData) => {
      if (!interfaceTypeId) {
        throw new Error('Missing interface type id')
      }

      const validationRules = filterValidationRules(
        input.validationRules,
        typeService.primitiveKind(input.fieldType),
      )

      return fieldService.create({ ...input, validationRules })
    }

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        open={fieldService.createModal.isOpen}
        title={<span css={tw`font-semibold`}>Create field</span>}
      >
        <ModalForm.Form<ICreateFieldData>
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
          <TypeSelect label="Type" name="fieldType" />
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              Boolean(model.fieldType) &&
              !isBoolean(typeService, model.fieldType)
            }
          >
            <AutoFields fields={['validationRules.general']} />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) => isPrimitive(typeService, model.fieldType)}
          >
            <DisplayIfField<ICreateFieldData>
              condition={({ model }) => isString(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.String}`]}
              />
            </DisplayIfField>
            <DisplayIfField<ICreateFieldData>
              condition={({ model }) => isInteger(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
              />
            </DisplayIfField>
            <DisplayIfField<ICreateFieldData>
              condition={({ model }) => isFloat(typeService, model.fieldType)}
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
              />
            </DisplayIfField>
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              !isInterfaceType(typeService, model.fieldType)
            }
          >
            <SelectDefaultValue typeService={typeService} />
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
