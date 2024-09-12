import type {
  IFieldNodeData,
  IStoreModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import {
  CuiEmpty,
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { observer } from 'mobx-react-lite'
import { useAsyncFn, useMount } from 'react-use'
import { StateTreeItem } from './StateTreeItem'

export const StateTreeView = observer<{ store: IStoreModel }>(({ store }) => {
  const typeService = useTypeService()

  const [{ loading, value: type }, getOne] = useAsyncFn(
    async () => (await typeService.getAll([store.api.id]))[0],
  )

  useMount(() => {
    void getOne()
  })

  const treeData = type?.kind === 'InterfaceType' ? type.fieldsTree : []

  return (
    <CuiSkeletonWrapper isLoading={loading}>
      {treeData.length > 0 ? (
        <CuiTree<ITreeNode<IFieldNodeData>>
          titleRender={(node) => {
            return <StateTreeItem data={node} />
          }}
          treeData={treeData}
        />
      ) : (
        <CuiEmpty />
      )}
    </CuiSkeletonWrapper>
  )
})
