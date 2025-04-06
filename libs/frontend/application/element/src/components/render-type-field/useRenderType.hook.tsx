import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import {
  type IAtomModel,
  type IElementModel,
  isAtom,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const useLoadOptions = ({
  parentComponent,
  parentElement,
}: {
  parentElement?: IElementModel
  parentComponent?: IRef
}) => {
  const { atomDomainService, componentDomainService } = useDomainStore()

  const parentAtom =
    parentElement?.renderType.current &&
    isAtom(parentElement.renderType.current)
      ? (parentElement.renderType.current as IAtomModel)
      : undefined

  const components = componentDomainService.getSelectOptions(parentComponent)
  const atoms = atomDomainService.getSelectOptions(parentAtom)

  return { atoms, components }
}

export const useRenderTypeSelectOptions = (
  components?: Array<SelectOption>,
  atoms?: Array<SelectOption>,
) => {
  const { atomDomainService, componentDomainService } = useDomainStore()

  const options = [
    ...componentDomainService.getRenderTypeOptions(components),
    ...atomDomainService.getRenderTypeOptions(atoms),
  ]

  return options.map(({ icon: Icon, text, ...rest }) => {
    return {
      ...rest,
      label: (
        <>
          <Icon className="pr-2" /> {text}
        </>
      ),
      text,
    }
  })
}
