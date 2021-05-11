import {
  AppPageContext,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  Page__PageElementFragment,
  refetchGetAppPageQuery,
  useUpdatePageElementMutation,
} from '@codelab/hasura'
import React, { useContext, useRef } from 'react'
import { DeepPartial } from 'uniforms'
import { PageElementFormBase } from '../createPageElement/PageElementFormBase'
import { UpdatePageElementInput } from './updatePageElementSchema'

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
  const { appId, pageId } = useContext(AppPageContext)

  const [
    mutate,
    { loading: updating, error, data },
  ] = useUpdatePageElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetAppPageQuery({
        appId,
        pageId,
      }),
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
