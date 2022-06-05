import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import {
  CreateFieldModal,
  DeleteFieldModal,
  InterfaceType,
  UpdateFieldModal,
} from '@codelab/frontend/modules/type'
import { IStore } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StateTreeItem } from './StateTreeItem'

export type GetStateTreeProps = WithServices<TYPE_SERVICE> & {
  store: IStore
}

export const GetStateTree = observer<GetStateTreeProps>(
  ({ store, typeService }) => {
    const api = typeService.type(store.stateApiId) as Maybe<InterfaceType>
    const stateFields = api?.fieldList.map((f) => f.antdNode(store.stateApiId))

    return (
      <>
        <Tree
          blockNode
          titleRender={(node) => (
            <StateTreeItem node={node} typeService={typeService} />
          )}
          treeData={stateFields}
        />
        <>
          <CreateFieldModal typeService={typeService} />
          <UpdateFieldModal typeService={typeService} />
          <DeleteFieldModal typeService={typeService} />
        </>
      </>
    )
  },
)
