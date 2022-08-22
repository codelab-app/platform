import { SelectExcludeDescendantsElements } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IElementTree,
  MoveData,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { mapElementOption } from '../../../utils/elementOptions'
import { moveElementSchema } from './moveElementSchema'

export type MoveElementFormProps = {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  elementService: IElementService
  /**
   * The element tree is specific to which view we're looking at (i.e. Page, Component)
   */
  elementTree: IElementTree
}

/** Not intended to be used in a modal */
export const MoveElementForm = observer<MoveElementFormProps>(
  ({ element, elementService, trackPromises, elementTree }) => {
    const { trackPromise } = trackPromises ?? {}

    // Cache it only once, don't pass it with every change to the form, because that will cause lag when auto-saving
    const { current: model } = useRef({
      parentElementId: element.parentElement?.id,
    })

    const onSubmit = (data: MoveData) => {
      const promise = elementService.moveElement(
        element.id,
        data.parentElementId,
        data.order,
      )

      if (trackPromise) {
        trackPromise(promise)
      }

      return promise
    }

    const elementOptions = elementTree.elementsList.map(mapElementOption)

    return (
      <Form<MoveData>
        autosave
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving element',
        })}
        schema={moveElementSchema}
      >
        <AutoFields omitFields={['parentElementId']} />
        <AutoField
          component={observer((props) => (
            <SelectExcludeDescendantsElements
              allElementOptions={elementOptions}
              targetElementId={element.id}
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
