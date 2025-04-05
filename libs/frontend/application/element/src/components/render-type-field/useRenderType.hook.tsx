import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useAsyncFn } from 'react-use'

export const useLoadOptions = (parentElementId?: string) => {
  const atomService = useAtomService()
  const { componentDomainService, elementDomainService } = useDomainStore()
  const parentElement = elementDomainService.maybeElement(parentElementId)
  const parentAtom = parentElement?.renderType.current as IAtomModel

  const [atoms, loadAtomOptions] = useAsyncFn(
    () => atomService.getSelectAtomOptions(parentAtom),
    [parentAtom],
  )

  // const [components, loadComponentOptions] = useAsyncFn(() =>
  //   getSelectComponentOptions(componentDomainService),
  // )

  // useEffect(() => {
  //   void Promise.all([loadComponentOptions(), loadAtomOptions()])
  // }, [loadComponentOptions, loadAtomOptions])

  return { atoms: [], components: componentDomainService.componentList }
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
