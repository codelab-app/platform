import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { Tree, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithStoreService } from '../../../store'
import { TreeItemTitle } from './StoreTreeItem'

export const GetStoresTree = observer<WithStoreService>(({ storeService }) => {
  const currentStoreId = useCurrentStoreId()

  const [getStores, { isLoading }] = useLoadingState(() =>
    storeService.getAll(),
  )

  useEffect(() => {
    getStores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const storesTrees: Array<TreeDataNode> = storeService.antdTree

  return (
    <Spinner isLoading={isLoading}>
      <Tree
        activeKey={currentStoreId}
        blockNode
        defaultExpandAll
        titleRender={(node) => (
          <TreeItemTitle node={node} storeService={storeService} />
        )}
        treeData={storesTrees ? storesTrees : []}
      />
    </Spinner>
  )
})
