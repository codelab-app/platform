import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Tree, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithStoreService } from '../../../store'
import { TreeItemTitle } from './StoreTreeItem'

export const GetStoresTree = observer<WithStoreService>(({ storeService }) => {
  const [getStores] = useLoadingState(() => storeService.getTree())

  useEffect(() => {
    getStores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const storesTrees: Array<TreeDataNode> = storeService.storesTree.antdTree

  return (
    <Tree
      blockNode
      className="draggable-tree"
      titleRender={(node) => (
        <TreeItemTitle node={node} storeService={storeService} />
      )}
      treeData={storesTrees ? storesTrees : []}
    />
  )
})
