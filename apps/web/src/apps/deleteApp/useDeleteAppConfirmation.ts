import { Modal } from 'antd'
import { notifications } from '../../../../../libs/frontend/src/utils/notifications'
import { GetAppsGql, useDeleteAppMutation } from '@codelab/generated'

export const useDeleteAppConfirmation = () => {
  const [deleteApp, { loading }] = useDeleteAppMutation()

  const onDeleteConfirmed = (app: { id: string; title: string }) =>
    deleteApp({
      variables: {
        input: {
          id: app.id,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GetAppsGql,
        },
      ],
    }).catch(
      notifications({
        title: `Error while deleting app '${app.title}'`,
        type: 'error',
      }),
    )

  const openDeleteConfirmation = (app: { id: string; title: string }) => {
    Modal.confirm({
      title: `Are you sure you want to delete the app "${app.title}"`,
      content: 'This action is not reversible',
      okType: 'danger',
      okText: 'Delete app',
      onOk: () => {
        return onDeleteConfirmed(app)
      },
      visible: true,
      okButtonProps: { loading },
    })
  }

  return { openDeleteConfirmation }
}
