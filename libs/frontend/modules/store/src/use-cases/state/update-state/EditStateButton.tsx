import { EditFilled } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { WithStoreService } from '../../../store'

export const EditStateButton = observer<WithStoreService>(
  ({ storeService }) => {
    const router = useRouter()

    const onClick = () =>
      router.push({
        pathname: PageType.InterfaceDetail,
        query: { interfaceId: storeService.currentStore?.current.stateId },
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
