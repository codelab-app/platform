import {
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  PageElementFragment,
  UpdatePageElementData,
  useUpdatePageElementMutation,
} from '@codelab/graphql'
import React, { useRef } from 'react'
import { PageElementFormBase } from '../createPageElement/PageElementFormBase'

type UpdatePageElementFormProps = UniFormUseCaseProps<UpdatePageElementData> & {
  pageElement: PageElementFragment
}

/** Not intended to be used in a modal */
export const UpdatePageElementForm = ({
  pageElement: initialPageElement,
  ...props
}: UpdatePageElementFormProps) => {
  //Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: pageElement } = useRef(initialPageElement)

  const [mutate, { loading: updating, error, data }] =
    useUpdatePageElementMutation({
      // awaitRefetchQueries: true,
      // refetchQueries: [
      //   refetchGetAppPageQuery({
      //     appId,
      //     pageId,
      //   }),
      // ],
    })

  if (!pageElement) {
    return null
  }

  const onSubmit = (submitData: UpdatePageElementData) => {
    return mutate({
      variables: {
        input: { pageElementId: pageElement.id, updateData: { ...submitData } },
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
          atomId: pageElement.atom?.id,
          name: pageElement.name,
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
