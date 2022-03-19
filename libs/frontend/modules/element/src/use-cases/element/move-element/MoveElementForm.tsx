import { UseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import { SelectExcludeDescendantsElements } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementModel, ElementStore } from '../../../store'
import { mapElementOption } from '../../../utils/elementOptions'
import { moveElementSchema } from './moveElementSchema'
import { MoveData } from './types'

export type MoveElementFormProps = Omit<
  UseCaseFormWithRef<MoveData>,
  'onSubmit'
> & {
  element: ElementModel
  elementStore: ElementStore
  trackPromises?: UseTrackLoadingPromises
}

/** Not intended to be used in a modal */
export const MoveElementForm = observer(
  ({ element, elementStore, trackPromises }: MoveElementFormProps) => {
    const { trackPromise } = trackPromises ?? {}

    // Cache it only once, don't pass it with every change to the form, because that will cause lag when auto-saving
    const { current: model } = useRef({
      parentElementId: element.parentElement?.id,
      order: element.order,
    })

    const onSubmit = (data: MoveData) => {
      const promise = elementStore.moveElement(element.id, data)

      if (trackPromise) {
        trackPromise(promise)
      }

      return promise
    }

    const elementOptions =
      elementStore.elementTree.elementsList.map(mapElementOption)

    return (
      <Form<MoveData>
        autosave
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving element',
        })}
        onSubmitSuccess={[]}
        schema={moveElementSchema}
        submitRef={undefined}
      >
        <AutoFields omitFields={['parentElementId']} />
        <AutoField
          component={observer((props) => (
            <SelectExcludeDescendantsElements
              allElementOptions={elementOptions}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(props as any)}
            />
          ))}
          name="parentElementId"
        />
      </Form>
    )
  },
)
