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
import React, { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils/elementOptions'
import { MoveElementAutoForm } from './MoveElementAutoForm'
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
      parentElementId: element.parentId,
      prevSiblingId: element.prevSiblingId,
    })

    useEffect(() => {
      model.prevSiblingId = element.prevSiblingId
      model.parentElementId = element.parentId
    }, [element.parentId, element.prevSiblingId])

    const onSubmit = (data: MoveData) => {
      const {
        prevSiblingId: currentPrevsiblingId,
        parentElementId: currentParentElementId,
      } = model

      const { parentElementId, prevSiblingId } = data
      const changePrevSibling = currentPrevsiblingId !== prevSiblingId
      const changeParent = currentParentElementId !== parentElementId

      // check this first because change parent could trigger change in prev to undefined

      if (changeParent) {
        // change parent
        elementService.moveAsRoot(element.id, parentElementId)

        return
      }

      // clear link element
      if (changePrevSibling && prevSiblingId) {
        elementService.moveElementNextTo(element.id, prevSiblingId)

        return
      }

      // clear linked by, move to the root
      if (changePrevSibling && !prevSiblingId && element.parentId) {
        elementService.moveAsRoot(element.id, element.parentId)

        return
      }
    }

    const elementOptions = elementTree.elementsList.map(mapElementOption)

    return (
      <MoveElementAutoForm<MoveData>
        autosave
        cssString={`
          & .ant-form-item-explain {
            display: none !important;
          }
        `}
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving element',
        })}
        schema={moveElementSchema}
      >
        <AutoFields omitFields={['parentElementId', 'prevSiblingId']} />
        <AutoField
          component={observer((props) => {
            return (
              <SelectExcludeDescendantsElements
                allElementOptions={elementOptions}
                allowClear={false}
                targetElementId={element.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...(props as any)}
              />
            )
          })}
          name="parentElementId"
        />
        <SelectLinkElement
          allElementOptions={elementOptions}
          name="prevSiblingId"
        />
      </MoveElementAutoForm>
    )
  },
)
