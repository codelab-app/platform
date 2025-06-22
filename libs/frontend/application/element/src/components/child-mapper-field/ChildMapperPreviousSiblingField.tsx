import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { GuaranteedProps } from 'uniforms'

import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import { connectField } from 'uniforms'

import { SelectLinkElement } from '../SelectLinkElement'

type ChildMapperPreviousSiblingFieldProps = GuaranteedProps<unknown> & {
  element: IElementModel
}

export const ChildMapperPreviousSiblingField =
  connectField<ChildMapperPreviousSiblingFieldProps>(
    ({ element }) => {
      return (
        <SelectLinkElement
          elementOptions={element.children.map(mapElementOption)}
          name="id"
          targetElementId={element.id}
        />
      )
    },
    { initialValue: false, kind: 'node' },
  )
