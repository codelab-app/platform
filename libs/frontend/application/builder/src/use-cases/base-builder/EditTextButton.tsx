import type { IElementModel } from '@codelab/frontend-abstract-domain'

import CheckOutlined from '@ant-design/icons/CheckOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'

export const EditTextButton = ({ element }: { element: IElementModel }) => {
  if (element.children.length !== 0) {
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
        element.setIsTextContentEditable(!element.isTextContentEditable)
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
        {element.isTextContentEditable ? <CheckOutlined /> : <EditOutlined />}
      </div>
    </div>
  )
}
