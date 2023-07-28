import type { IElement, MoveData } from '@codelab/frontend/abstract/core'
import { SelectExcludeDescendantsElements } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils'
import { moveElementSchema } from './move-element.schema'
import { MoveElementAutoForm } from './MoveElementAutoForm'
import {
  shouldMoveElementAsFirstChild,
  shouldMoveElementAsNextSibling,
} from './utils'

export interface MoveElementFormProps {
  element: IElement
}

/** Not intended to be used in a modal */
export const MoveElementForm = observer<MoveElementFormProps>(({ element }) => {
  const { atomService, builderService, elementService } = useStore()
  const elementTree = builderService.activeElementTree

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
      parentElement: currentParentElement,
      prevSibling: currentPrevSibling,
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

  const elementAtomRequiredParents = atomService.atoms
    .get(element.renderType?.id || '')
    ?.requiredParents.map((parent) => parent.id)

  const elementOptions = elementAtomRequiredParents?.length
    ? elementTree?.elements
        .filter((el) =>
          elementAtomRequiredParents.includes(el.renderType?.id || ''),
        )
        .map(mapElementOption)
    : elementTree?.elements.map(mapElementOption)

  return (
    <MoveElementAutoForm<MoveData>
      autosave
      key={element.id}
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createNotificationHandler({
        title: 'Error while moving element',
      })}
      schema={moveElementSchema}
    >
      <AutoFields omitFields={['parentElement', 'prevSibling']} />
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
        name="parentElement.id"
      />
      <SelectLinkElement
        allElementOptions={elementOptions}
        name="prevSibling.id"
      />
    </MoveElementAutoForm>
  )
})
