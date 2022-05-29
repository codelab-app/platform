import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { IStore } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { storeRef } from '../../../store'

export type StoreListItemProps = WithServices<STORE_SERVICE> & {
  store: IStore
}

export const StoreListItem = observer<StoreListItemProps>(
  ({ store, storeService }) => {
    const onAddChild = () => storeService.createModal.open()
    const onEdit = () => storeService.updateModal.open(storeRef(`${store.id}`))

    const href = {
      pathname: PageType.Store,
      query: { storeId: store.id },
    }

    return (
      <div css={tw`flex flex-row  items-center`}>
        <Link href={href}>
          <a css={tw`flex-grow`}>{store.name}</a>
        </Link>
      </div>
    )
  },
)
