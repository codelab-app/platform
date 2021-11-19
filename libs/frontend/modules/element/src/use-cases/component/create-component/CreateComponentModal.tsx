import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import tw from 'twin.macro'
import { useComponentState } from '../../../hooks/useComponentState'
import { CreateComponentForm } from './CreateComponentForm'
import { useCreateComponentForm } from './useCreateComponentForm'

export const CreateComponentModal = () => {
  const { actionType } = useComponentState()

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
