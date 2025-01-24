import type { IElementModel } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useDeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'

export const DeleteButton = ({ element }: { element: IElementModel }) => {
  const deleteElementModal = useDeleteElementModal()

  return (
    <div
      className={`
        flex size-7 cursor-pointer
        items-center justify-center align-middle
      `}
      onClick={(event) => {
        event.stopPropagation()
        deleteElementModal.open(element)
      }}
    >
      <div
        className={`
          flex size-5 items-center
          justify-center rounded-full align-middle
        `}
        style={{ backgroundColor: '#375583', color: 'red' }}
      >
        <DeleteOutlined />
      </div>
    </div>
  )
}
