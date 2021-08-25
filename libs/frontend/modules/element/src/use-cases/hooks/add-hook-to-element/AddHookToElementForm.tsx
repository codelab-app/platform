import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  HookType,
  refetchGetElementQuery,
  useAddHookToElementMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  AddHookToElementSchema,
  addHookToElementSchema,
  mapDataToInput,
} from './addHookToElementSchema'

export type AddHookToElementFormProps =
  UniFormUseCaseProps<AddHookToElementSchema> & { elementId: string }

export const DisplayIfType = ({
  type,
  children,
}: React.PropsWithChildren<{ type: HookType }>) => (
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
      <AutoFields omitFields={['queryHook']} />

      <DisplayIfType type={HookType.Query}>
        <AutoFields
          fields={[
            'queryHook.queryKey',
            'queryHook.url',
            'queryHook.method',
            'queryHook.body',
            'queryHook.dataPropKey',
            'queryHook.loadingPropKey',
            'queryHook.errorPropKey',
          ]}
        />
      </DisplayIfType>
    </FormUniforms>
  )
}
