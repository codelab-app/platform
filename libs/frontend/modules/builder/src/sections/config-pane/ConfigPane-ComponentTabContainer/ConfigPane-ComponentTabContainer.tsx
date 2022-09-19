import { useStore } from '@codelab/frontend/presenter/container'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { ComponentsGroupedByTag } from './ComponentsGroupedByTag'

export const ConfigPaneComponentTabContainer = observer(() => {
  /**
   * TODO:
   * handle component
   */
  const { atomService, builderService } = useStore()
  const { loading } = useAsync(() => atomService.getAll(), [])

  // const { loading: isLoadingUseCaseTags } = useAsync(
  //   () => tagService.getAll(),
  //   [],
  // )

  if (loading) {
    return <Spin />
  }

  return (
    <ComponentsGroupedByTag
      componentsGroupedByCategory={builderService.componentsGroupedByCategory}
    />
  )
})
