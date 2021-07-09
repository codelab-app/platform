import { BaseMutationOptions } from '@apollo/client'
import {
  ElementFragment,
  useGetAtomsQuery,
  useUpdateElementMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import React, { useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import {
  updateElementSchema,
  UpdateElementSchemaType,
} from './updateElementSchema'

export type UpdateElementFormProps =
  UniFormUseCaseProps<UpdateElementSchemaType> & {
    initialData: Pick<ElementFragment, 'id' | 'name' | 'atom'>
    refetchQueries?: BaseMutationOptions['refetchQueries']
  }

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  initialData,
  refetchQueries,
  ...props
}: UpdateElementFormProps) => {
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: element } = useRef(initialData)
  const { data: atoms } = useGetAtomsQuery()

  const [mutate, { loading: updating, error, data }] = useUpdateElementMutation(
    {
      awaitRefetchQueries: true,
      refetchQueries: refetchQueries,
    },
  )

  if (!element) {
    return null
  }

  const onSubmit = (submitData: UpdateElementSchemaType) => {
    return mutate({
      variables: {
        input: { elementId: element.id, updateData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<UpdateElementSchemaType>
        key={element.id}
        autosave={true}
        autosaveDelay={500}
        schema={updateElementSchema}
        model={{
          atomId: element.atom?.id,
          name: element.name,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['atomId']} />

        <SelectField
          name="atomId"
          label="Atom"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          options={atoms?.atoms.map((atom) => ({
            label: atom.label,
            value: atom.id,
          }))}
        />
      </FormUniforms>

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: updating,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
