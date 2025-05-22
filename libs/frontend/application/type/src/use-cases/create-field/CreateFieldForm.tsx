'use client'

import type { IFieldCreateData } from '@codelab/shared-abstract-core'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import {
  SelectDefaultValue,
  SelectFieldSibling,
} from '@codelab/frontend-presentation-components-interface-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useFieldService } from '../../services'
import { useFieldSchema } from '../hooks'
import { TypeSelect } from '../select-types'
import { createFieldSchema } from './create-field.schema'
import {
  canSetDefaultValue,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from './field-utils'
import { IInterfaceTypeModel } from '@codelab/frontend-abstract-domain'

interface CreateFieldFormProps extends IFormController {
  interfaceId: string
}

export const CreateFieldForm = observer<CreateFieldFormProps>(
  ({ interfaceId, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const fieldService = useFieldService()
    const { typeDomainService } = useDomainStore()
    const fieldSchema = useFieldSchema(createFieldSchema)
    const fieldModel = { id: v4(), interfaceTypeId: interfaceId }

    const interfaceType =
      typeDomainService.type<IInterfaceTypeModel>(interfaceId)

    const onSubmit = (input: IFieldCreateData) => {
      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      return fieldService.create({ ...input, validationRules })
    }

    return (
      <Form<IFieldCreateData>
        errorMessage="Error while creating field"
        model={fieldModel}
        modelTransform={(mode, model) => {
          // This automatically sets the `defaultValue` to be nullable for types
          // where we dont set a default value like ReactNodeType, InterfaceType
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
        schema={fieldSchema}
        submitRef={submitRef}
        successMessage="Field created successfully"
        uiKey={UiKey.FieldFormCreate}
      >
        <AutoFields
          omitFields={[
            'fieldType',
            'validationRules',
            'interfaceTypeId',
            'defaultValues',
            'prevSibling',
          ]}
        />
        <TypeSelect label="Type" name="fieldType" />
        <SelectFieldSibling
          field={{
            ...fieldModel,
            api: { id: fieldModel.interfaceTypeId },
          }}
          label="Prev Sibling"
          name="prevSibling"
        />
        <DisplayIfField<IFieldCreateData>
          condition={({ model }) =>
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<IFieldCreateData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<IFieldCreateData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldCreateData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<IFieldCreateData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
        <DisplayIfField<IFieldCreateData>
          condition={({ model }) =>
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <SelectDefaultValue />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Create Field" />
        </DisplayIf>
      </Form>
    )
  },
)
