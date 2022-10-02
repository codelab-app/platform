import { SelectExcludeDescendantsElements } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IElementTree,
  MoveData,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils/elementOptions'
import { MoveElementAutoForm } from './MoveElementAutoForm'
import { moveElementSchema } from './moveElementSchema'
import {
  shouldMoveElementAsFirstChild,
  shouldMoveElementAsNextSibling,
} from './utils'

export interface MoveElementFormProps {
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
        prevSiblingId: currentPrevSiblingId,
        parentElementId: currentParentElementId,
      } = model

      const { parentElementId, prevSiblingId } = data

      if (
        shouldMoveElementAsFirstChild(
          currentParentElementId,
          parentElementId,
          currentPrevSiblingId,
          prevSiblingId,
        )
      ) {
        return elementService.moveElementAsFirstChild({
          elementId: element.id,
          parentElementId: String(parentElementId),
        })
      }

      if (shouldMoveElementAsNextSibling(currentPrevSiblingId, prevSiblingId)) {
        return elementService.moveElementAsNextSibling({
          elementId: element.id,
          targetElementId: String(prevSiblingId),
        })
      }

      return Promise.resolve()
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
