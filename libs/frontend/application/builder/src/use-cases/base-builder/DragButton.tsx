import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { RefObject } from 'react'

import DragOutlined from '@ant-design/icons/DragOutlined'
import { BuilderDndAction } from '@codelab/frontend/abstract/application'
import { DRAG_OVERLAY_ID } from '@codelab/frontend-application-dnd/components'
import { useTypedDraggable } from '@codelab/frontend-application-dnd/hooks'

const DragButtonContent = () => (
  <div className="flex size-7 items-center justify-center align-middle">
    <div
      className={`
        flex size-5 items-center
        justify-center rounded-full align-middle
      `}
      style={{ backgroundColor: '#375583', color: 'white' }}
    >
      <DragOutlined color="white" />
    </div>
  </div>
)

export const DragButton = ({ element }: { element: IElementModel }) => {
  const { active, attributes, listeners, setNodeRef } = useTypedDraggable({
    data: {
      action: BuilderDndAction.MoveElement,
      internalUseOnlyDragData: {
        overlayRenderer: (ref?: RefObject<HTMLDivElement>) => (
          <div id={DRAG_OVERLAY_ID} ref={ref}>
            <DragButtonContent />
          </div>
        ),
      },
    },
    id: element.id,
  })

  const style = {
    cursor: 'grab',
    opacity: active?.id === element.id ? 0.5 : 1,
  }

  return (
    <div
      id={`drag-button-${element.id}`}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}
      ref={setNodeRef}
    >
      <DragButtonContent />
    </div>
  )
}
