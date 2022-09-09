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
  const {
    atomService,
    // componentService,
    builderService,
    tagService,
  } = useStore()

  const { loading: isLoadingAtoms } = useAsync(() => atomService.getAll(), [])

  const { loading: isLoadingUseCaseTags } = useAsync(
    () => tagService.getAll(),
    [],
  )

  // eslint-disable-next-line no-inline-comments
  const isLoading = isLoadingAtoms || isLoadingUseCaseTags // isLoadingComponents

  if (isLoading) {
    return <Spin />
  }

  return (
    <ComponentsGroupedByTag
      componentsGroupedByTag={builderService.componentsGroupedByTag}
    />
  )
})
