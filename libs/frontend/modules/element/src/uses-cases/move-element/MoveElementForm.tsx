import { BaseMutationOptions } from '@apollo/client'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import { useMoveElementMutation } from '@codelab/shared/codegen/graphql'
import React, { useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { moveElementSchema, MoveElementSchemaType } from './moveElementSchema'

export type MoveElementFormProps =
  UniFormUseCaseProps<MoveElementSchemaType> & {
    initialData: { order: number; parentElementId: string } | undefined
    elementId: string
    parentElementOptions: Array<{ value: string; label: string }>
    refetchQueries?: BaseMutationOptions['refetchQueries']
  }

/** Not intended to be used in a modal */
export const MoveElementForm = ({
  initialData: initialDataProp,
  refetchQueries,
  elementId,
  parentElementOptions,
  ...props
}: MoveElementFormProps) => {
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: initialData } = useRef(initialDataProp)

  const [mutate, { loading: loadingMutation, error, data }] =
    useMoveElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: refetchQueries,
    })

  if (!initialData) {
    return null
  }

  const onSubmit = (submitData: MoveElementSchemaType) => {
    return mutate({
      variables: {
        input: { elementId, moveData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<MoveElementSchemaType>
        key={elementId}
        autosave={true}
        autosaveDelay={500}
        schema={moveElementSchema}
        model={{
          parentElementId: initialData?.parentElementId,
          order: initialData?.order,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['parentElementId']} />

        <SelectField
          name="parentElementId"
          label="Parent element"
          showSearch={true}
          optionFilterProp="label"
          options={parentElementOptions}
        />
      </FormUniforms>

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: loadingMutation,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
