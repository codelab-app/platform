import { BaseMutationOptions } from '@apollo/client'
import { SelectAnyElement } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useRef } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useMoveElementMutation } from './MoveElement.api.graphql.gen'
import { MoveElementSchema, moveElementSchema } from './moveElementSchema'

export type MoveElementFormProps = UniFormUseCaseProps<MoveElementSchema> & {
  elementId: string
  tree: ElementTree<any, any, any>
  refetchQueries?: BaseMutationOptions['refetchQueries']
}

/** Not intended to be used in a modal */
export const MoveElementForm = ({
  refetchQueries,
  elementId,
  tree,
  ...props
}: MoveElementFormProps) => {
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const {
    current: { parentElementId, order },
  } = useRef({
    parentElementId: tree.getParentOf(elementId, tree.isElementPredicate),
    order: tree.getOrderInParent(elementId),
  })

  const [mutate, { loading: loadingMutation, error, data }] =
    useMoveElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: refetchQueries,
    })

  const onSubmit = (submitData: MoveElementSchema) => {
    return mutate({
      variables: {
        input: { elementId, moveData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<MoveElementSchema>
        key={elementId}
        autosave={true}
        autosaveDelay={500}
        schema={moveElementSchema}
        model={{
          parentElementId,
          order,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['parentElementId']} />
        <AutoField name="parentElementId" component={SelectAnyElement} />
      </FormUniforms>

      <div css={tw`absolute top-0 right-0 m-8`}>
        <StatelessLoadingIndicator
          style={{ display: 'block', margin: '0.5rem' }}
          state={{
            isLoading: loadingMutation,
            isErrored: Boolean(
              error || (data as any)?.errors || (data as any)?.error,
            ),
          }}
        />
      </div>
    </>
  )
}
