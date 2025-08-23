// eslint-disable-next-line @codelab/ant-design-icon-import
import type AntdIcons from '@ant-design/icons'
import type { IconProps } from '@ant-design/icons/lib/components/IconBase'

import { createElement, useEffect, useState } from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: keyof typeof AntdIcons
}

const iconCache: Record<
  keyof typeof AntdIcons,
  React.ComponentType<IconProps>
> = {} as never

export const AntdIcon: React.FC<_IconProps> = ({ name, ...props }) => {
  const [IconComponent, setIconComponent] =
    useState<React.ComponentType<IconProps> | null>(iconCache[name])

  useEffect(() => {
    const loadIcon = async () => {
      const iconImport = await import(`@ant-design/icons/es/icons/${name}`)
      const Component = iconImport?.default

      if (Component) {
        iconCache[name] = Component as React.ComponentType<IconProps>
        setIconComponent(Component as React.ComponentType<IconProps>)
        return
      } else {
        setIconComponent(null)
      }
    }

    void loadIcon()
  }, [name])

  return IconComponent ? createElement(IconComponent, props) : null
}
