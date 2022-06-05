import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/modules/type'
import {
  ListItemCreateButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import {
  IInterfaceType,
  IStateNode,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import styled from '@emotion/styled'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

const StateTitle = styled.div`
  max-width: 100px;
`

export interface StateTreeItemProp extends WithServices<TYPE_SERVICE> {
  node: IStateNode
}

export const StateTreeItem = observer<StateTreeItemProp>(
  ({ node, typeService }) => {
    const onCreate = () =>
      typeService.fieldCreateModal.open(
        typeRef(node.type.id) as Ref<IInterfaceType>,
      )

    const onEdit = () => {
      typeService.fieldUpdateModal.open({
        field: fieldRef(node.key),
        interface: typeRef(node.interfaceId) as Ref<IInterfaceType>,
      })
    }

    const onDelete = () => {
      typeService.fieldDeleteModal.open({
        field: fieldRef(node.key),
        interface: typeRef(node.interfaceId) as Ref<IInterfaceType>,
      })
    }

    return (
      <div css={tw`flex justify-between`}>
        <StateTitle>{node.title}</StateTitle>
        <div>
          {node.type.kind === ITypeKind.InterfaceType ? (
            <ListItemCreateButton onClick={onCreate} />
          ) : (
            <ListItemEditButton onClick={onEdit} />
          )}
          <ListItemDeleteButton onClick={onDelete} />
        </div>
      </div>
    )
  },
)
