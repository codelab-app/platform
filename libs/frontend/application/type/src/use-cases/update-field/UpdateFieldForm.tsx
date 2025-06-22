'use client'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IFieldCreateData,
  IFieldUpdateData,
} from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { SelectFieldSibling } from '@codelab/frontend/presentation/components/interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'

import { useFieldService } from '../../services'
import {
  canSetDefaultValue,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from '../create-field'
import { useFieldFormSchema } from '../hooks'
import { TypeSelect } from '../select-types'

export interface UpdateFieldFormProps extends IFormController {
  field: IFieldModel
}

export const UpdateFieldForm = observer<UpdateFieldFormProps>(
  ({ field, onSubmitSuccess, submitRef }) => {
    const fieldService = useFieldService()
    const { typeDomainService } = useDomainStore()

    const [fieldModel, setFieldModel] = useState<IFieldCreateData>({
      defaultValues: field.defaultValues,
      description: field.description,
      fieldType: field.type.id,
      id: field.id,
      interfaceTypeId: field.api.id,
      key: field.key,
      name: field.name,
      prevSibling: field.prevSibling,
      validationRules: field.validationRules,
    })

    const schema = useFieldFormSchema(fieldModel)

    const onSubmit = async (input: IFieldUpdateData) => {
      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      const updatedField = { ...input, validationRules }

      const interfaceType = typeDomainService.type(
        input.interfaceTypeId,
      ) as IInterfaceTypeModel

      if (updatedField.prevSibling?.id) {
        await fieldService.moveFieldAsNextSibling({
          field: updatedField,
          targetFieldId: updatedField.prevSibling.id,
        })
      } else {
        const firstField = interfaceType.fields.find(
          ({ id, prevSibling }) => id !== updatedField.id && !prevSibling,
        )

        if (firstField) {
          await fieldService.moveFieldAsPrevSibling({
            field: updatedField,
            targetFieldId: firstField.id,
          })
        }
      }

      return fieldService.update({ ...input, validationRules })
    }

    return (
      <Form<IFieldUpdateData>
        errorMessage="Error while updating field"
        model={fieldModel}
        onChangeModel={(model) => {
          setFieldModel({ ...fieldModel, ...model })
        }}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        successMessage="Field updated successfully"
        uiKey={UiKey.FieldFormUpdate}
      >
        <AutoFields fields={['id', 'key', 'name', 'description']} />
        <TypeSelect label="Type" name="fieldType" />
        <SelectFieldSibling
          field={field}
          name="prevSibling"
          value={
            field.prevSibling?.id ? { id: field.prevSibling.id } : undefined
          }
        />

        <DisplayIfField<IFieldUpdateData>
          condition={({ model }) =>
            Boolean(
              model.fieldType && typeDomainService.types.has(model.fieldType),
            )
          }
        >
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              !isBoolean(typeDomainService, model.fieldType) &&
              canSetDefaultValue(typeDomainService, model.fieldType)
            }
          >
            <AutoFields fields={['validationRules.general']} />
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              isPrimitive(typeDomainService, model.fieldType)
            }
          >
            <DisplayIfField<IFieldUpdateData>
              condition={({ model }) =>
                isString(typeDomainService, model.fieldType)
              }
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.String}`]}
              />
            </DisplayIfField>
            <DisplayIfField<IFieldUpdateData>
              condition={({ model }) =>
                isInteger(typeDomainService, model.fieldType)
              }
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
              />
            </DisplayIfField>
            <DisplayIfField<IFieldUpdateData>
              condition={({ model }) =>
                isFloat(typeDomainService, model.fieldType)
              }
            >
              <AutoFields
                fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
              />
            </DisplayIfField>
          </DisplayIfField>
          <DisplayIfField<IFieldUpdateData>
            condition={({ model }) =>
              canSetDefaultValue(typeDomainService, model.fieldType)
            }
          >
            <AutoField name="defaultValues" />
          </DisplayIfField>
        </DisplayIfField>
      </Form>
    )
  },
)
