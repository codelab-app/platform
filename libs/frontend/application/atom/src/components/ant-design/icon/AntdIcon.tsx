// eslint-disable-next-line @codelab/ant-design-icon-import
import type AntdIcons from '@ant-design/icons'
import type { IconProps } from '@ant-design/icons/lib/components/IconBase'
import { createElement } from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: keyof typeof AntdIcons | null
}

export const AntdIcon: React.FC<_IconProps> = ({ name, ...props }) => {
  // const icon = name && AntdIcons[name]

  // if (!icon) {
  //   return null
  // }

  // return createElement(icon as (props: IconProps) => ReactElement, props)
  return createElement('ReactFragment', props)
}
