import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { GetComponentsList } from './GetComponentsList'
import { TagsWithComponentsList } from './TagsWithComponentsList'

export const ConfigPaneComponentTabContainer = observer(() => {
  /**
   * TODO:
   * handle dnd to page
   * handle dnd to tree
   */
  const { atomService, componentService, builderService } = useStore()

  const [, { isLoading: isLoadingAtoms }] = useStatefulExecutor(
    () => atomService.getAll(),
    {
      executeOnMount: true,
    },
  )

  const [, { isLoading: isLoadingComponents }] = useStatefulExecutor(() =>
    componentService.getAll(),
  )

  const isLoading = isLoadingAtoms || isLoadingComponents

  if (isLoading) {
    return <Spin />
  }

  return (
    <TagsWithComponentsList
      tagsWithComponents={builderService.tagsWithComponents}
    />
  )
})
