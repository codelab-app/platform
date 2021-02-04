import { ControlPosition, DraggableEventHandler } from 'react-draggable'
import { atom, useRecoilState } from 'recoil'
import { useBuilderLayout } from '../../Builder-pane--state'

export const componentState = atom({
  key: 'componentState',
  default: {
    isDragging: false,
    position: {
      x: 0,
      y: 0,
    },
  },
})

interface UseComponent {
  position: ControlPosition
  isDragging: boolean
  onStart: DraggableEventHandler
  onDrag: DraggableEventHandler
  onStop: DraggableEventHandler
}

export const useComponent = (): UseComponent => {
  const [component, setComponent] = useRecoilState(componentState)
  const layout = useBuilderLayout()

  return {
    ...component,
    onStart: () => {
      setComponent({
        ...component,
        isDragging: true,
      })
      // layout.setPane('none')
    },
    onDrag: () => {
      // setComponent({
      //   ...component,
      //   isDragging: false,
      // })
    },
    onStop: (e, data) => {
      setComponent({
        ...component,
        isDragging: false,
        position: { x: 0, y: 0 },
      })
    },
  }
}
