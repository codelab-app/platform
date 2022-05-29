import { EditFilled } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { IStore } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import tw from 'twin.macro'

export const EditStateButton = observer<{ store: IStore }>(({ store }) => {
  const router = useRouter()

  const onClick = () =>
    router.push({
      pathname: PageType.InterfaceDetail,
      query: { interfaceId: store.stateApi.id },
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
})
