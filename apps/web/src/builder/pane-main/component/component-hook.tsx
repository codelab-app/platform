import { ControlPosition, DraggableEventHandler } from 'react-draggable'
import {
  BuilderFragmentsFragment,
  GetBuilderGql,
  useGetBuilderQuery,
  useSetBuilderMutation,
} from '@codelab/generated'

interface UseComponent {
  position: ControlPosition
  windowPosition: ControlPosition
  isDragging: boolean
  onStart: DraggableEventHandler
  onDrag: DraggableEventHandler
  onStop: DraggableEventHandler
  loading: boolean
}

export const useComponent = (): UseComponent => {
  const { data, loading } = useGetBuilderQuery()
  const [setBuilder] = useSetBuilderMutation({
    refetchQueries: [{ query: GetBuilderGql }],
  })

  const builder: BuilderFragmentsFragment | undefined = data?.getBuilder

  // console.log(data, loading)

  if (!builder || loading) {
    return {
      loading: true,
    } as any
  }

  return {
    loading: false,
    ...builder,
    onStart: (e, _data) => {
      console.log('onStart')
      // layout.setPaneVisibility('none')
    },
    onDrag: (e, _data) => {
      console.log('onDrag', e, data)
      // setGrid({
      //   windowPosition: {
      //     x: (e as MouseEvent).clientX,
      //     y: (e as MouseEvent).clientY,
      //   },
      // })
    },
    onStop: (e, _data) => {
      console.log('onStop')
      // setComponent({
      //   ...component,
      //   isDragging: false,
      //   position: { x: 0, y: 0 },
      // })
    },
  }
}
