'use client'

import type { ICreateFieldData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { SelectDefaultValue } from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useFieldService, useTypeService } from '../../services'
import { useFieldSchema } from '../hooks'
import { TypeSelect } from '../select-types'
import { createFieldSchema } from './create-field.schema'
import { useCreateFieldForm } from './create-field.state'
import {
  canSetDefaultValue,
  filterValidationRules,
  isBoolean,
  isFloat,
  isInteger,
  isPrimitive,
  isString,
} from './field-utils'

export const CreateFieldForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const fieldService = useFieldService()
    const { typeDomainService } = useDomainStore()
    const typeService = useTypeService()
    const fieldSchema = useFieldSchema(createFieldSchema)
    const createFieldForm = useCreateFieldForm()
    const closeForm = () => createFieldForm.close()
    const interfaceTypeId = createFieldForm.data?.id

    const onSubmit = (input: ICreateFieldData) => {
      if (!interfaceTypeId) {
        throw new Error('Missing interface type id')
      }

      const validationRules = filterValidationRules(
        input.validationRules,
        typeDomainService.primitiveKind(input.fieldType),
      )

      void fieldService.create({ ...input, validationRules })

      onSubmitSuccess?.()
      closeForm()

      return Promise.resolve()
    }

    return (
      <Form<ICreateFieldData>
        model={{
          id: v4(),
          interfaceTypeId,
        }}
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
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating field',
        })}
        onSubmitSuccess={closeForm}
        schema={fieldSchema}
        submitRef={submitRef}
        uiKey={UiKey.FieldFormCreate}
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
            !isBoolean(typeDomainService, model.fieldType) &&
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <AutoFields fields={['validationRules.general']} />
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) =>
            isPrimitive(typeDomainService, model.fieldType)
          }
        >
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isString(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.String}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isInteger(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Integer}`]}
            />
          </DisplayIfField>
          <DisplayIfField<ICreateFieldData>
            condition={({ model }) =>
              isFloat(typeDomainService, model.fieldType)
            }
          >
            <AutoFields
              fields={[`validationRules.${PrimitiveTypeKind.Number}`]}
            />
          </DisplayIfField>
        </DisplayIfField>
        <DisplayIfField<ICreateFieldData>
          condition={({ model }) =>
            canSetDefaultValue(typeDomainService, model.fieldType)
          }
        >
          <SelectDefaultValue />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Field" />
        </DisplayIf>
      </Form>
    )
  },
)
