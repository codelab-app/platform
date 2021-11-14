import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectComponent } from '../../../store'
import { CreateComponentForm } from './CreateComponentForm'
import { useCreateComponentForm } from './useCreateComponentForm'

export const CreateComponentModal = () => {
  const { actionType } = useSelector(selectComponent)

  const {
    state: { isLoading },
    formProps,
    reset,
  } = useCreateComponentForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Create',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Create component</span>,
      }}
      renderForm={() => <CreateComponentForm {...formProps} />}
    />
  )
}
