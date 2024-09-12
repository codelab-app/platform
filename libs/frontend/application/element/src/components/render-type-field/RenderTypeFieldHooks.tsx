import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'

export const useLoadOptions = (parentAtom?: IAtomModel) => {
  const atomService = useAtomService()
  const { componentDomainService } = useDomainStore()

  const [atoms, loadAtomOptions] = useAsyncFn(() =>
    atomService.getSelectAtomOptions(parentAtom),
  )

  const [components, loadComponentOptions] = useAsyncFn(() =>
    getSelectComponentOptions(componentDomainService),
  )

  useEffect(() => {
    void Promise.all([loadComponentOptions(), loadAtomOptions()])
  }, [loadComponentOptions, loadAtomOptions])

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
    }
  })
}
