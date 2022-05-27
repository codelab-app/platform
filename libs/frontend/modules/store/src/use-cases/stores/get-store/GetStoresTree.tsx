import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { Tree, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { TreeItemTitle } from './StoreTreeItem'

export const GetStoresTree = observer<WithServices<STORE_SERVICE>>(
  ({ storeService }) => {
    const currentStoreId = useCurrentStoreId()

    const [getStores, { isLoading }] = useStatefulExecutor(() =>
      storeService.getAll(),
    )

    useEffect(() => {
      getStores()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const storesTrees: Array<TreeDataNode> = storeService.roots.map(
      (r) => r.antdNode,
    )

    return (
      <Spinner isLoading={isLoading}>
        <Tree
          activeKey={currentStoreId}
          blockNode
          defaultExpandAll
          titleRender={(node) => (
            <TreeItemTitle node={node} storeService={storeService} />
          )}
          treeData={storesTrees}
        />
      </Spinner>
    )
  },
)
