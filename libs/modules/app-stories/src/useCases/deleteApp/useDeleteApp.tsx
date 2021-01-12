import { Modal } from 'antd'
import { useEffect, useRef } from 'react'
import { useAppMachine } from '@codelab/modules/app-stories'

export const useDeleteApp = () => {
  const appMachine = useAppMachine()
  const loading = appMachine.state.value?.deletingApp === 'loading'

  const modalRef = useRef<ReturnType<typeof Modal.confirm>>()
  const destroyModal = () => {
    modalRef.current?.destroy()
    modalRef.current = undefined
  }

  const onDeleteConfirmed = (id: string) =>
    appMachine.send({ type: 'ON_DELETE_APP', data: { id } })

  const handleDeleteClick = (app: { id: string; title: string }) => {
    modalRef.current = Modal.confirm({
      title: `Are you sure you want to delete the app "${app.title}"`,
      content: 'This action is not reversible',
      okType: 'danger',
      okText: 'Delete app',
      onOk: () => {
        onDeleteConfirmed(app.id)

        return new Promise(() => {
          // Return a promise to not close the modal right away. We will destroy it later
        })
      },
      visible: true,
      okButtonProps: { loading },
    })
  }

  // Check if the app is deleted and destroy the modal if it is
  if (
    !appMachine.state.value?.deletingApp &&
    appMachine.state.value !== 'deletingApp' &&
    modalRef.current
  ) {
    destroyModal()
  }

  // Update the modal loading button
  useEffect(() => modalRef.current?.update({ okButtonProps: { loading } }), [
    loading,
  ])

  // Destroy modal if we unmount this component
  useEffect(() => {
    return () => destroyModal()
  }, [])

  return { handleDeleteClick }
}
