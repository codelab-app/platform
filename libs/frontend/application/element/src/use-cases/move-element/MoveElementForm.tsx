'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { MoveData } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { SelectExcludeDescendantsElements } from '@codelab/frontend/presentation/components/interface-form'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'

import { SelectLinkElement } from '../../components/SelectLinkElement'
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
    const { rendererService } = useApplicationStore()
    const { atomDomainService, elementDomainService } = useDomainStore()
    const elementTree = rendererService.activeElementTree
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
          errorMessage="Error while moving element"
          model={model as MoveData}
          onSubmit={onSubmit}
          schema={moveElementSchema}
          uiKey={UiKey.ElementFormMove}
        >
          <AutoFields omitFields={['parentElement', 'prevSibling']} />
          <AutoField
            component={observer((props) => {
              return (
                <SelectExcludeDescendantsElements
                  allowClear={false}
                  elementOptions={elementOptions}
                  targetElementId={element.id}
                  // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
                  {...(props as any)}
                />
              )
            })}
            name="parentElement.id"
          />
          <SelectLinkElement
            elementOptions={elementOptions}
            name="prevSibling.id"
          />
        </MoveElementAutoForm>
      </div>
    )
  },
)
