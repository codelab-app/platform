import {
  CreateComponentElementForm,
  CreateComponentElementFormProps,
} from '@codelab/frontend/modules/component'
import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'

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
