import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import {
  CreateComponentElementForm,
  CreateComponentElementFormProps,
} from './CreateComponentElementForm'

export const CreateComponentElementModal = (
  props: CreateComponentElementFormProps,
) => {
  return (
    <CrudModal
      entityType={EntityType.Element}
      actionType={ActionType.Create}
      okText={'Create'}
      renderForm={() => (
        <CreateComponentElementForm initialData={props.initialData} />
      )}
    />
  )
}
