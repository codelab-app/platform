import { PanelResizeHandle } from 'react-resizable-panels'

export const CuiResizeHandle = () => {
  return (
    <PanelResizeHandle
      className={`
        h-full w-[3px] bg-gray-200
        active:bg-blue-400
        hover:bg-blue-300
      `}
    />
  )
}
