import { useStore } from '@codelab/frontend/presenter/container'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ComponentsGroupedByTag } from './ComponentsGroupedByTag'

export const ConfigPaneComponentTabContainer = observer(() => {
  /**
   * TODO:
   * handle component
   */
  const { atomService, builderService } = useStore()
  const [{ status }, getAllAtoms] = useAsync(() => atomService.getAll())

  // const { loading: isLoadingUseCaseTags } = useAsync(
  //   () => tagService.getAll(),
  //   [],
  // )

  useMountEffect(getAllAtoms.execute)

  if (status === 'loading') {
    return <Spin />
  }

  return (
    <ComponentsGroupedByTag
      componentsGroupedByCategory={builderService.componentsGroupedByCategory}
    />
  )
})
