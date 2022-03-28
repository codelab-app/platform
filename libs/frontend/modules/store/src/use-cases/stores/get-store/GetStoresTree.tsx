import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Tree, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithStoreService } from '../../../store'
import { TreeItemTitle } from './StoreTreeItem'

export const GetStoresTree = observer<WithStoreService>(({ storeService }) => {
  const [getStores, { isLoading }] = useLoadingState(() =>
    storeService.getTree(),
  )

  useEffect(() => {
    getStores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const storesTrees: Array<TreeDataNode> = storeService.storesTree.antdTree

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Tree
        activeKey={storeService.currentStoreId}
        blockNode
        defaultExpandAll
        titleRender={(node) => (
          <TreeItemTitle node={node} storeService={storeService} />
        )}
        treeData={storesTrees ? storesTrees : []}
      />
    </SpinnerWrapper>
  )
})
