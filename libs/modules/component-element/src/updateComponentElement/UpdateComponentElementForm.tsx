import {
  ComponentContext,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  __ComponentElementFragment,
  refetchGetComponentDetailQuery,
  useUpdateComponentElementMutation,
} from '@codelab/hasura'
import React, { useContext, useRef } from 'react'
import { DeepPartial } from 'uniforms'
import { CreateComponentElementFormBase } from '../createComponentElement/CreateComponentElementFormBase'
import { UpdateComponentElementInput } from './updateComponentElementSchema'

type UpdateComponentElementFormProps = UniFormUseCaseProps<UpdateComponentElementInput> & {
  componentElement: __ComponentElementFragment
}

/** Not intended to be used in a modal */
export const UpdateComponentElementForm = ({
  componentElement: initialComponentElement,
  ...props
}: UpdateComponentElementFormProps) => {
  //Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: componentElement } = useRef(initialComponentElement)
  const { componentId } = useContext(ComponentContext)

  const [mutate, { loading, error, data }] = useUpdateComponentElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetComponentDetailQuery({ componentId })],
  })

  const onSubmit = (submitData: DeepPartial<UpdateComponentElementInput>) => {
    return mutate({
      variables: {
        componentElementId: componentElement.id,
        input: submitData,
      },
    })
  }

  return (
    <>
      <CreateComponentElementFormBase
        onSubmit={onSubmit}
        autosave={true}
        autosaveDelay={500}
        model={{
          atom_id: componentElement.atom?.id,
          // label: componentElement.label,
        }}
        {...props}
      />

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: loading,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
