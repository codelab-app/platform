import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TagsWithComponentsList } from './TagsWithComponentsList'

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

  const [, { isLoading: isLoadingAtoms }] = useStatefulExecutor(
    () => atomService.getAll(),
    {
      executeOnMount: true,
    },
  )

  // const [, { isLoading: isLoadingComponents }] = useStatefulExecutor(() =>
  //   componentService.getAll(),
  // )

  const [, { isLoading: isLoadingUsecaseTags }] = useStatefulExecutor(
    () => tagService.getAll(),
    {
      executeOnMount: true,
    },
  )

  // eslint-disable-next-line no-inline-comments
  const isLoading = isLoadingAtoms || isLoadingUsecaseTags // isLoadingComponents

  if (isLoading) {
    return <Spin />
  }

  return (
    <TagsWithComponentsList
      tagsWithComponents={builderService.tagsWithComponents}
    />
  )
})
