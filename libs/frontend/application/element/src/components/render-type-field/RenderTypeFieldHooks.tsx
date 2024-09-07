import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import {
  mapAtomOptions,
  mapComponentOptions,
} from '@codelab/frontend-domain-atom/store'
import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import React, { useCallback, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

const isComponentType = (id: string, components: Array<SelectOption>) => {
  return Boolean(components.find((option) => option.value === id))
}

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
  const { componentList } = componentDomainService
  const { atomsList } = atomDomainService
  const fallbackAtoms = atomsList.map(mapAtomOptions)
  const fallbackComponents = componentList.map(mapComponentOptions)
  const componentOptions = components ?? fallbackComponents
  const atomOptions = atoms ?? fallbackAtoms
  const options = [...componentOptions, ...atomOptions]

  const optionsWithImage = options.map(({ label, value }) => {
    const isComponent = isComponentType(value as string, componentOptions)
    const style = { paddingRight: 8 }

    const icon = isComponent ? (
      <CodeSandboxOutlined style={style} />
    ) : (
      <DeploymentUnitOutlined style={style} />
    )

    return {
      __typename: isComponent
        ? IElementRenderTypeKind.Component
        : IElementRenderTypeKind.Atom,
      label: (
        <>
          {icon} {label}
        </>
      ),
      text: label,
      value: value,
    }
  })

  return optionsWithImage
}
