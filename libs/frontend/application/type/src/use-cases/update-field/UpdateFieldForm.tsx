'use client'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type { IFieldUpdateData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectDefaultValue,
  SelectFieldSibling,
  uniformSchemaFactory,
} from '@codelab/frontend/presentation/components/interface-form'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
import { AutoFields } from 'uniforms-antd'

import { useFieldService } from '../../services'
import {
  canSetDefaultValue,
  createFieldSchema,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from '../create-field'
import { useFieldSchema } from '../hooks'
import { TypeSelect } from '../select-types'

export interface UpdateFieldFormProps extends IFormController {
  field: IFieldModel
}

export const UpdateFieldForm = ({
  field,
  onSubmitSuccess,
  showFormControl = true,
  submitRef,
}: UpdateFieldFormProps) => {
  const fieldService = useFieldService()
  const { typeDomainService } = useDomainStore()
  const fieldSchema = useFieldSchema(createFieldSchema, field)
  const type = field.type.current as IInterfaceTypeModel

  const onSubmit = async (input: IFieldUpdateData) => {
    console.log('onSubmit', input)

    const validationRules = filterValidationRules(
      input.validationRules,
      typeDomainService.primitiveKind(input.fieldType),
    )

    const updatedField = { ...input, validationRules }

    const interfaceType = typeDomainService.type(
      input.interfaceTypeId,
    ) as IInterfaceTypeModel

    const firstField = interfaceType.fields.find(
      ({ prevSibling }) => !prevSibling,
    )

    if (updatedField.prevSibling?.id) {
      await fieldService.moveFieldAsNextSibling({
        field: updatedField,
        targetFieldId: updatedField.prevSibling.id,
      })
    } else if (firstField) {
      await fieldService.moveFieldAsPrevSibling({
        field: updatedField,
        targetFieldId: firstField.id,
      })
    }

    return fieldService.update({ ...input, validationRules })
  }

  /**
   * Each type has a different way of creating default values based on validation rules
   */
  const defaultValues = type.toJsonSchema({
    uniformSchema: uniformSchemaFactory,
    validationRules: field.validationRules,
  })

  const schema = {
    ...fieldSchema,
    properties: { ...fieldSchema.properties, defaultValues },
  }

  return (
    <Form<IFieldUpdateData>
      errorMessage="Error while updating field"
      model={{
        defaultValues: field.defaultValues,
        description: field.description,
        fieldType: field.type.id,
        id: field.id,
        interfaceTypeId: field.api.id,
        key: field.key,
        name: field.name,
        prevSibling: field.prevSibling,
        validationRules: field.validationRules,
      }}
      modelTransform={(mode, model) => {
        // This automatically sets the `defaultValue` to be nullable for types
        // where we don't set a default value like ReactNodeType, InterfaceType
        if (
          mode === 'form' &&
          model.fieldType &&
          !canSetDefaultValue(typeDomainService, model.fieldType)
        ) {
          return {
            ...model,
            validationRules: {
              general: {
                nullable: true,
              },
            },
          }
        }

        return model
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
      <SelectFieldSibling field={field} name="prevSibling" />

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
          condition={({ model }) => isFloat(typeDomainService, model.fieldType)}
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
        <SelectDefaultValue />
      </DisplayIfField>

      <DisplayIf condition={showFormControl}>
        <FormController onCancel={onSubmitSuccess} submitLabel="Update Field" />
      </DisplayIf>
    </Form>
  )
}
