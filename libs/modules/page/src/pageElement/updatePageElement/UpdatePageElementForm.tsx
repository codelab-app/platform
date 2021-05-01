import React, { useContext, useRef } from 'react'
import { UpdatePageElementInput } from './updatePageElementSchema'
import {
  Page__PageElementFragment,
  RootAppGql,
  useUpdatePageElementMutation,
} from '@codelab/hasura'
import {
  AppContext,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import { PageElementFormBase } from '../createPageElement/PageElementFormBase'

type UpdatePageElementFormProps = UniFormUseCaseProps<UpdatePageElementInput> & {
  pageElement: Page__PageElementFragment
}

/** Not intended to be used in a modal */
export const UpdatePageElementForm = ({
  pageElement: initialPageElement,
  ...props
}: UpdatePageElementFormProps) => {
  //Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: pageElement } = useRef(initialPageElement)
  const { appId, pageId } = useContext(AppContext)

  const [
    mutate,
    { loading: updating, error, data },
  ] = useUpdatePageElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: RootAppGql,
        variables: {
          appId,
          pageId,
        },
      },
    ],
  })

  if (!pageElement) {
    return null
  }

  const onSubmit = (submitData: DeepPartial<UpdatePageElementInput>) => {
    return mutate({
      variables: {
        id: pageElement.id,
        input: submitData,
      },
    })
  }

  return (
    <>
      <PageElementFormBase
        autosave={true}
        autosaveDelay={500}
        onSubmit={onSubmit}
        model={{
          component_id: pageElement.component.id,
          name: pageElement.name || '',
        }}
        {...props}
      />

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
