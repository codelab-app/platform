import { PageType } from '@codelab/frontend/abstract/types'
import { DataNode } from 'antd/lib/tree'
import Link from 'next/link'
import tw from 'twin.macro'
import { StateStore } from '../../../../store'

const BlueLink = tw.a`text-blue-700`

type StoreActionsColumnProps = {
  store: DataNode
  stateStore: StateStore
}

export const StoreActionsColumn = ({ store }: StoreActionsColumnProps) => {
  return (
    <Link
      href={{
        pathname: PageType.StoreActions,
        query: { storeId: store.key },
      }}
    >
      <BlueLink>View Actions</BlueLink>
    </Link>
  )
}
