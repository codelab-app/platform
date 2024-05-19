import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  mapAtomOptions,
  mapComponentOptions,
} from '@codelab/frontend/domain/atom'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import type { DefaultOptionType } from 'antd/lib/select'
import React, { useCallback } from 'react'

const isComponentType = (id: string, components: Array<DefaultOptionType>) => {
  return Boolean(components.find((option) => option.value === id))
}

export const useLoadOptions = (parentAtom?: IAtomModel) => {
  const { atomService, componentService } = useStore()

  const [atoms, loadAtomOptions] = useAsync(() =>
    atomService.getSelectAtomOptions(parentAtom),
  )

  const [components, loadComponentOptions] = useAsync(() =>
    componentService.getSelectComponentOptions(),
  )

  const loadOptionsIfNeeded = useCallback(() => {
    if (
      components.status === 'not-executed' ||
      atoms.status === 'not-executed'
    ) {
      void Promise.all([
        loadComponentOptions.execute(),
        loadAtomOptions.execute(),
      ])
    }
  }, [atoms, components, loadAtomOptions, loadComponentOptions])

  return { atoms, components, loadOptionsIfNeeded }
}

export const useRenderTypeSelectOptions = (
  components?: Array<DefaultOptionType>,
  atoms?: Array<DefaultOptionType>,
) => {
  const { atomService, componentService } = useStore()
  const { componentList } = componentService.componentDomainService
  const { atomsList } = atomService.atomDomainService
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
