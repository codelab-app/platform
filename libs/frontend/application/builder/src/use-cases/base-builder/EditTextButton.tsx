import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

import CheckOutlined from '@ant-design/icons/CheckOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'

export const EditTextButton = ({
  runtimeElement,
}: {
  runtimeElement: IRuntimeElementModel
}) => {
  if (runtimeElement.element.current.children.length !== 0) {
    return null
  }

  return (
    <div
      className={`
        flex size-7 cursor-pointer
        items-center justify-center align-middle
      `}
      onClick={(event) => {
        event.stopPropagation()
        runtimeElement.setIsTextContentEditable(
          !runtimeElement.isTextContentEditable,
        )
      }}
    >
      <div
        aria-label="Toggle Content Editing"
        className={`
          flex size-5 items-center
          justify-center rounded-full align-middle
        `}
        style={{ backgroundColor: '#375583', color: 'white' }}
      >
        {runtimeElement.isTextContentEditable ? (
          <CheckOutlined />
        ) : (
          <EditOutlined />
        )}
      </div>
    </div>
  )
}
