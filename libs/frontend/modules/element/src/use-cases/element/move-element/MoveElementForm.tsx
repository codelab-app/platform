import {
  SelectAnyElement,
  SelectElementProvider,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useElementGraphContext } from '../../../providers'
import { useMoveElementMutation } from '../../../store'
import { MoveElementSchema, moveElementSchema } from './moveElementSchema'

export type MoveElementFormProps = UniFormUseCaseProps<MoveElementSchema> & {
  elementId: string
  tree: ElementTree
  trackPromises?: UseTrackLoadingPromises
}

/** Not intended to be used in a modal */
export const MoveElementForm = ({
  elementId,
  tree,
  trackPromises,
  ...props
}: MoveElementFormProps) => {
  const { elementTree } = useElementGraphContext()
  const { trackPromise } = trackPromises ?? {}

  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const {
    current: { parentElementId, order },
  } = useRef({
    parentElementId: tree.getParentOf(elementId)?.id,
    order: tree.getOrderInParent(elementId),
  })

  const [mutate] = useMoveElementMutation()

  const onSubmit = (submitData: MoveElementSchema) => {
    const promise = mutate({
      variables: {
        input: { elementId, moveData: { ...submitData } },
      },
    }).unwrap()

    if (trackPromise) {
      trackPromise(promise)
    }

    return promise
  }

  return (
    <SelectElementProvider
      tree={elementTree ?? new ElementTree({ edges: [], vertices: [] })}
    >
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
      </FormUniforms>{' '}
    </SelectElementProvider>
  )
}
