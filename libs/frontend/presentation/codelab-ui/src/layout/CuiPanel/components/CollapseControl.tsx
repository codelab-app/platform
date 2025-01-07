import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import clsx from 'clsx'

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
    <div
      className={`
        relative z-20 flex
        h-full items-center justify-center
        align-middle
      `}
    >
      <div className="w-4 cursor-pointer bg-gray-200" onClick={onClick}>
        <div className="flex justify-center rounded-r bg-inherit py-3">
          {resizeDirection === 'right' && collapsed && <RightOutlined />}
          {resizeDirection === 'right' && !collapsed && <LeftOutlined />}
          {resizeDirection === 'left' && collapsed && <LeftOutlined />}
          {resizeDirection === 'left' && !collapsed && <RightOutlined />}
        </div>
      </div>
    </div>
  )
}

CollapseControl.displayName = 'CollapseControl'
