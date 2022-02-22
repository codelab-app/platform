import { UseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import {
  SelectAnyElement,
  SelectElementProvider,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useElementGraphContext } from '../../../providers'
import { useUpdateElementsMutation } from '../../../store'
import { moveElementSchema } from './moveElementSchema'
import { MoveData } from './types'

export type MoveElementFormProps = Omit<
  UseCaseFormWithRef<MoveData>,
  'onSubmit'
> & {
  elementId: string
  tree: ElementTree
  trackPromises?: UseTrackLoadingPromises
}

/** Not intended to be used in a modal */
export const MoveElementForm = ({
  elementId,
  tree,
  trackPromises,
}: MoveElementFormProps) => {
  const { elementTree } = useElementGraphContext()
  const { trackPromise } = trackPromises ?? {}

  // Cache it only once, don't pass it with every change to the form, because that will cause lag when auto-saving
  const {
    current: { parentElementId, order },
  } = useRef({
    parentElementId: tree.getParentOf(elementId)?.id,
    order: tree.getOrderInParent(elementId),
  })

  const [mutate] = useUpdateElementsMutation()

  const onSubmit = (submitData: MoveData) => {
    const promise = mutate({
      variables: {
        where: { id: elementId },
        update: {
          parentElement: {
            disconnect: { where: {} },
            connect: {
              edge: { order: submitData.order },
              where: { node: { id: submitData.parentElementId } },
            },
          },
        },
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
      <Form<MoveData>
        autosave
        key={elementId}
        model={{
          parentElementId,
          order,
        }}
        onSubmit={onSubmit}
        onSubmitError={[
          createNotificationHandler({
            title: 'Error while moving element',
          }),
        ]}
        onSubmitSuccess={[]}
        schema={moveElementSchema}
        submitRef={undefined}
      >
        <AutoFields omitFields={['parentElementId']} />
        <AutoField component={SelectAnyElement} name="parentElementId" />
      </Form>
    </SelectElementProvider>
  )
}
