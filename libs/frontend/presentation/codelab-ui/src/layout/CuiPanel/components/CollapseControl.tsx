import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'

interface CollapseControlProps {
  collapsed: boolean
  resizeDirection: 'left' | 'right'
  onClick?(): void
}

export const CollapseControl = ({
  collapsed,
  onClick,
  resizeDirection,
}: CollapseControlProps) => {
  return (
    <div className="flex h-full items-center justify-center align-middle">
      <div className="cursor-pointer bg-gray-200" onClick={onClick}>
        <div className="flex space-x-0.5 rounded-r bg-inherit p-0.5 py-3">
          {resizeDirection === 'right' && collapsed && <RightOutlined />}
          {resizeDirection === 'right' && !collapsed && <LeftOutlined />}
          {resizeDirection === 'left' && collapsed && <LeftOutlined />}
          {resizeDirection === 'left' && !collapsed && <RightOutlined />}
        </div>
      </div>
    </div>
  )
}
