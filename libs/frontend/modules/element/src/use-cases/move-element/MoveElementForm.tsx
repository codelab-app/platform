import { BaseMutationOptions } from '@apollo/client'
import { SelectAnyElement } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/view/components'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementTreeGraphql } from '../../tree'
import { useMoveElementMutation } from './MoveElement.api.graphql.gen'
import { MoveElementSchema, moveElementSchema } from './moveElementSchema'

export type MoveElementFormProps = UniFormUseCaseProps<MoveElementSchema> & {
  elementId: string
  tree: ElementTreeGraphql
  refetchQueries?: BaseMutationOptions['refetchQueries']
  loadingStateKey?: string
}

/** Not intended to be used in a modal */
export const MoveElementForm = ({
  refetchQueries,
  elementId,
  tree,
  loadingStateKey,
  ...props
}: MoveElementFormProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const {
    current: { parentElementId, order },
  } = useRef({
    parentElementId: tree.getParentOf(elementId, tree.isElementPredicate)?.id,
    order: tree.getOrderInParent(elementId),
  })

  const [mutate] = useMoveElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: refetchQueries,
  })

  const onSubmit = (submitData: MoveElementSchema) => {
    const promise = mutate({
      variables: {
        input: { elementId, moveData: { ...submitData } },
      },
    })

    if (loadingStateKey) {
      trackPromise(promise)
    }

    return promise
  }

  return (
    <>
      <FormUniforms<MoveElementSchema>
        key={elementId}
        autosave={true}
        autosaveDelay={200}
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
    </>
  )
}
