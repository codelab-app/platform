import type {
  IElement,
  IElementService,
  IElementTree,
  MoveData,
} from '@codelab/frontend/abstract/core'
import { SelectExcludeDescendantsElements } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { IEntity } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import type { Ref } from 'react'
import React, { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils'
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
      parentElement: { id: element.parent?.id },
      prevSibling: { id: element.prevSibling?.current.id },
    })

    useEffect(() => {
      model.prevSibling.id = element.prevSibling?.current.id
      model.parentElement.id = element.parent?.id
    }, [element.parent, element.prevSibling])

    const onSubmit = ({ parentElement, prevSibling }: MoveData) => {
      const {
        prevSibling: currentPrevSibling,
        parentElement: currentParentElement,
      } = model

      if (
        shouldMoveElementAsFirstChild(
          currentParentElement,
          parentElement,
          currentPrevSibling,
          prevSibling,
        )
      ) {
        return elementService.moveElementAsFirstChild({
          element,
          parentElement,
        })
      }

      if (shouldMoveElementAsNextSibling(currentPrevSibling, prevSibling)) {
        return elementService.moveElementAsNextSibling({
          element,
          targetElement: prevSibling,
        })
      }

      return Promise.resolve()
    }

    const elementOptions = elementTree.elements.map(mapElementOption)

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
                // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
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
