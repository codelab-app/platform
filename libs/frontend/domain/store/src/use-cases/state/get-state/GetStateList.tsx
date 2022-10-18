import {
  IFieldService,
  IInterfaceType,
  IStore,
} from '@codelab/frontend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/codegen'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetStateItem } from './GetStateItem'

export interface GetStateTreeProps {
  store: IStore
  fieldService: IFieldService
}

export const GetStateList = observer<GetStateTreeProps>(
  ({ store, fieldService }) => {
    const api = store.api.current as Maybe<IInterfaceType>

    return (
      <List
        dataSource={api?.fields}
        renderItem={(field) => (
          <GetStateItem
            field={field}
            fieldService={fieldService}
            store={store}
          />
        )}
        size="small"
      />
    )
  },
)
