import { SelectLambda } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { HookType } from '@codelab/shared/enums'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { refetchGetElementQuery } from '../../get-element/GetElement.api.graphql.gen'
import { useAddHookToElementMutation } from './AddHookToElement.api.graphql.gen'
import {
  AddHookToElementSchema,
  addHookToElementSchema,
  mapDataToInput,
  QueryHookVariant,
} from './addHookToElementSchema'

export type AddHookToElementFormProps =
  UniFormUseCaseProps<AddHookToElementSchema> & { elementId: string }

export const DisplayIfType = ({
  type,
  children,
}: React.PropsWithChildren<{
  type: HookType
}>) => (
  <DisplayIfField<AddHookToElementSchema>
    condition={(c) => c.model.type === type}
  >
    {children}
  </DisplayIfField>
)

export const AddHookToElementForm = ({
  elementId,
  ...props
}: AddHookToElementFormProps) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Hook,
    useMutationFunction: useAddHookToElementMutation,
    mutationOptions: {
      refetchQueries: [
        refetchGetElementQuery({
          input: { elementId },
        }),
      ],
    },
    mapVariables: (data: AddHookToElementSchema, state) => ({
      input: mapDataToInput(elementId ?? state.metadata.element.id, data),
    }),
  })

  return (
    <FormUniforms<AddHookToElementSchema>
      onSubmit={handleSubmit}
      schema={addHookToElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['queryHook', 'queryHookVariant']} />

      <DisplayIfType type={HookType.Query}>
        <AutoFields fields={['queryHookVariant']} />

        <DisplayIfField<AddHookToElementSchema>
          condition={(c) =>
            c.model.queryHookVariant === QueryHookVariant.Config
          }
        >
          <AutoFields
            fields={[
              'queryHook.queryKey',
              'queryHook.url',
              'queryHook.method',
              'queryHook.body',
            ]}
          />
        </DisplayIfField>

        <DisplayIfField<AddHookToElementSchema>
          condition={(c) =>
            c.model.queryHookVariant === QueryHookVariant.Lambda
          }
        >
          <AutoFields fields={['queryHook.queryKey']} />{' '}
          <AutoField name="queryHook.lambdaId" component={SelectLambda} />
        </DisplayIfField>
      </DisplayIfType>
    </FormUniforms>
  )
}
