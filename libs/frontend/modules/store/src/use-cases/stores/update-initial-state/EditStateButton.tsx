import { EditFilled } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { useCurrentStore } from '../../../hooks'
import { WithStoreService } from '../../../store'

export const EditStateButton = observer<WithStoreService>(
  ({ storeService }) => {
    const router = useRouter()
    const { store } = useCurrentStore(storeService)

    const onClick = () =>
      router.push({
        pathname: PageType.InterfaceDetail,
        query: { interfaceId: store?.state.id },
      })

    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<EditFilled />}
        onClick={onClick}
        type="primary"
      >
        Edit State
      </Button>
    )
  },
)
