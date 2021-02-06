import { ControlPosition, DraggableEventHandler } from 'react-draggable'
import { atom, useRecoilState } from 'recoil'
import { useBuilderLayout } from '../../Builder-pane--state'

/**
 * React Draggable Grid, this is the component the user adds to the UI
 */
export const gridState = atom({
  key: 'gridState',
  default: {
    // Position relative to the window
    windowPosition: {
      x: 0,
      y: 0,
    },
  },
})

export const componentState = atom({
  key: 'componentState',
  default: {
    isDragging: false,
    // Position relative to the current React Draggable Grid
    position: {
      x: 0,
      y: 0,
    },
  },
})

interface UseComponent {
  position: ControlPosition
  windowPosition: ControlPosition
  isDragging: boolean
  onStart: DraggableEventHandler
  onDrag: DraggableEventHandler
  onStop: DraggableEventHandler
}

export const useComponent = (): UseComponent => {
  const [component, setComponent] = useRecoilState(componentState)
  const [grid, setGrid] = useRecoilState(gridState)
  const layout = useBuilderLayout()

  return {
    ...component,
    windowPosition: grid.windowPosition,
    onStart: (e, data) => {
      setComponent({
        ...component,
        isDragging: true,
      })
      // layout.setPaneVisibility('none')
    },
    onDrag: (e, data) => {
      console.log(e, data)
      setGrid({
        windowPosition: {
          x: (e as MouseEvent).clientX,
          y: (e as MouseEvent).clientY,
        },
      })
    },
    onStop: (e, data) => {
      console.log('stop!')
      setComponent({
        ...component,
        isDragging: false,
        position: { x: 0, y: 0 },
      })
    },
  }
}
