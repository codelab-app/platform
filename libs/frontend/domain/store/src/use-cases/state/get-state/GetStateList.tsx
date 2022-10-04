import { IStore, ITypeService } from '@codelab/frontend/abstract/core'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { Maybe } from '@codelab/shared/abstract/codegen'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetStateItem } from './GetStateItem'

export interface GetStateTreeProps {
  store: IStore
  typeService: ITypeService
}

export const GetStateList = observer<GetStateTreeProps>(
  ({ store, typeService }) => {
    const api = typeService.type(store.apiId) as Maybe<InterfaceType>

    return (
      <List
        dataSource={api?.fieldList}
        renderItem={(field) => (
          <GetStateItem field={field} store={store} typeService={typeService} />
        )}
        size="small"
      />
    )
  },
)
