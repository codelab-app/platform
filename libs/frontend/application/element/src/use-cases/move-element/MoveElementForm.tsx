'use client'

import type { IRuntimeElementModel } from '@codelab/frontend-abstract-application'
import type { MoveData } from '@codelab/frontend-abstract-domain'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { IElementTypeKind } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { AutoField } from 'uniforms-antd'

import { useElementService } from '../../services'
import { moveElementSchema } from './move-element.schema'
import { MoveElementAutoForm } from './MoveElementAutoForm'

export interface MoveElementFormProps {
  runtimeElement: IRuntimeElementModel
}

/**
 * When we move, we can change
 *
 * 1) parent
 * 2) sibling
 * 3) or both
 *
 * Not intended to be used in a modal
 */
export const MoveElementForm = observer<MoveElementFormProps>(
  ({ runtimeElement }) => {
    const { elementDomainService } = useDomainStore()
    const element = runtimeElement.element.current
    const elementService = useElementService()

    // Cache it only once, don't pass it with every change to the form, because that will cause lag when auto-saving
    const { current: model } = useRef({
      parentElement: { id: element.parentElement?.current.id },
      prevSibling: { id: element.prevSibling?.current.id },
    })

    useEffect(() => {
      model.prevSibling.id = element.prevSibling?.current.id
      model.parentElement.id = element.parentElement?.id
    }, [element.parentElement, element.prevSibling])

    /**
     * We either set the target parent, which adds as firstChild in move. Or we set the target sibling, which adds as sibling
     */
    const onSubmit = async ({ parentElement, prevSibling }: MoveData) => {
      /**
       * Create new model of desired state
       */

      const parentElementModel = elementDomainService.elements.get(
        parentElement.id,
      )

      const prevSiblingModel = elementDomainService.elements.get(prevSibling.id)

      await elementService.move({
        element,
        nextSibling: prevSiblingModel,
        parentElement: parentElementModel,
      })

      return Promise.resolve()
    }

    return (
      <div key={element.id}>
        <MoveElementAutoForm<MoveData>
          autosave
          errorMessage="Error while moving element"
          model={model as MoveData}
          onSubmit={onSubmit}
          schema={moveElementSchema}
          uiKey={UiKey.ElementFormMove}
        >
          <AutoField
            allowClear={false}
            name="parentElement.id"
            options={elementDomainService.getSelectOptions(
              element,
              IElementTypeKind.ExcludeDescendantsElements,
              [element.id],
            )}
          />
          <AutoField
            name="prevSibling.id"
            options={
              element.parentElement?.current
                ? elementDomainService.getSelectOptions(
                    element,
                    IElementTypeKind.ExcludeDescendantsElements,
                    [element.id, element.closestContainerNode.rootElement.id],
                  )
                : []
            }
          />
        </MoveElementAutoForm>
      </div>
    )
  },
)
