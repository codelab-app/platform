import {
  refetchGetAppsQuery,
  useDeleteAppMutation,
} from '@codelab/codegen/graphql'
import { createNotificationHandler } from '@codelab/frontend/shared'
import { Modal } from 'antd'

export const useDeleteAppConfirmation = () => {
  const [deleteApp, { loading }] = useDeleteAppMutation()

  const onDeleteConfirmed = (app: { id: string; name: string }) =>
    deleteApp({
      variables: {
        input: {
          appId: app.id,
        },
      },
      refetchQueries: [refetchGetAppsQuery()],
    }).catch(
      createNotificationHandler({
        title: `Error while deleting app '${app.name}'`,
        type: 'error',
      }),
    )

  const openDeleteConfirmation = (app: { id: string; name: string }) => {
    Modal.confirm({
      title: `Are you sure you want to delete the app "${app.name}"`,
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
