import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCreateActionForm } from './create-action.state'

interface ICreateActionProps {
  store: IStoreModel
}

export const CreateActionButton = observer<ICreateActionProps>(({ store }) => {
  const createActionForm = useCreateActionForm()
  // const store = builderService.selectedNode?.current.runtimeStore.store.current

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={(event) => {
        event.stopPropagation()
        createActionForm.open(store)
      }}
      size="small"
    >
      Action
    </Button>
  )
})
