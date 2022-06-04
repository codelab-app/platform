import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import {
  FieldModals,
  fieldRef,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/modules/type'
import {
  ListItemCreateButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IStateNode, IStore, ITypeKind } from '@codelab/shared/abstract/core'
import styled from '@emotion/styled'
import { Tree } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

const StateTitle = styled.div`
  max-width: 100px;
`

type StateTreeItemProp = WithServices<TYPE_SERVICE> & {
  node: IStateNode
  interfaceRef: Ref<InterfaceType>
}

const StateTreeItem = observer<StateTreeItemProp>(
  ({ node, typeService, interfaceRef }) => {
    const onCreate = () => null

    const onEdit = () => {
      console.log(typeService.typesList.map((x) => x.id))
      typeService.fieldUpdateModal.open({
        field: fieldRef(node.key),
        interface: interfaceRef,
      })
    }

    const onDelete = () => null

    return (
      <div css={tw`flex justify-between`}>
        <StateTitle>{node.title}</StateTitle>
        <div>
          {node.type.current.kind === ITypeKind.InterfaceType && (
            <ListItemCreateButton onClick={onCreate} />
          )}
          <ListItemEditButton onClick={onEdit} />
          <ListItemDeleteButton onClick={onDelete} />
        </div>
      </div>
    )
  },
)

export type GetStateTreeProps = WithServices<TYPE_SERVICE> & { store: IStore }

export const GetStateTree = observer<GetStateTreeProps>(
  ({ store, typeService }) => {
    const stateFields = store.stateApi.current.fieldList.map((f) => f.antdNode)

    return (
      <>
        <Tree
          blockNode
          titleRender={(node) => (
            <StateTreeItem
              interfaceRef={typeRef(store.stateApi.id) as Ref<InterfaceType>}
              node={node}
              typeService={typeService}
            />
          )}
          treeData={stateFields}
        />
        <FieldModals
          type={store.stateApi.current as InterfaceType}
          typeService={typeService}
        />
      </>
    )
  },
)
