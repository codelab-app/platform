'use client'

import type {
  IRuntimeElementModel,
  MoveData,
} from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useDomainStore, useStore } from '@codelab/frontend/infra/mobx'
import { SelectExcludeDescendantsElements } from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectLinkElement } from '../../components/SelectLinkElement'
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
    const { elementService, rendererService } = useStore()
    const { atomDomainService } = useDomainStore()
    const elementTree = rendererService.activeElementTree
    const element = runtimeElement.element.current

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

      const parentElementModel =
        elementService.elementDomainService.elements.get(parentElement.id)

      const prevSiblingModel = elementService.elementDomainService.elements.get(
        prevSibling.id,
      )

      await elementService.move({
        element,
        nextSibling: prevSiblingModel,
        parentElement: parentElementModel,
      })

      return Promise.resolve()
    }

    const elementAtomRequiredParents = atomDomainService.atoms
      .get(element.renderType.id)
      ?.requiredParents.map((parent) => parent.id)

    const elementOptions = elementAtomRequiredParents?.length
      ? elementTree?.elements
          .filter((el) =>
            elementAtomRequiredParents.includes(el.renderType.id || ''),
          )
          .map(mapElementOption)
      : elementTree?.elements.map(mapElementOption)

    return (
      <div key={element.id}>
        <MoveElementAutoForm<MoveData>
          autosave
          model={model as MoveData}
          onSubmit={onSubmit}
          onSubmitError={createFormErrorNotificationHandler({
            title: 'Error while moving element',
          })}
          schema={moveElementSchema}
          uiKey={MODEL_ACTION.MoveElement.key}
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
      </div>
    )
  },
)
