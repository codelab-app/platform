import { UserComponent, useNode } from '@craftjs/core'
import React from 'react'
import { AtomType } from '../interfaces'
import { elementTypeMap } from './elementTypeMap'

type ResolverComponentType = React.ComponentType | string | UserComponent
interface CraftJsOptions {
  withWrapper?: boolean
}

const isUserComponent = (cmt: ResolverComponentType): cmt is UserComponent => {
  return (cmt as UserComponent).craft !== undefined
}

// to support backward compatibility recommend using this wrapper to integrate elements with craftjs
export const connectCraftJs = (
  Cmt: ResolverComponentType,
  options: CraftJsOptions = {},
): UserComponent | string => {
  const ConnectedCmt: UserComponent = ({ children, ...props }) => {
    const {
      connectors: { connect, drag },
    } = useNode()
    const { withWrapper = false } = options

    // 1. reason to use div-wrapper https://github.com/prevwong/craft.js/issues/161
    // 2. reason to not use div-wrapper: antd cmts support refs and for some cmts it's crucial to not have wrapper (for ex. Grid Rows and Cols)
    return withWrapper ? (
      <div ref={(ref) => connect(drag(ref))}>
        React.createElement(Cmt, props, children)
      </div>
    ) : (
      React.createElement(
        Cmt,
        {
          ...props,

          ref: (ref: any) => {
            connect(drag(ref))
          },
        },
        children,
      )
    )
  }

  if (isUserComponent(Cmt)) {
    ConnectedCmt.craft = Cmt.craft
  }

  return ConnectedCmt
}

export const craftjsResolver: Record<AtomType, ResolverComponentType> = {
  ...elementTypeMap,
  [AtomType.ReactGridRow]: connectCraftJs(
    elementTypeMap[AtomType.ReactGridRow],
  ),
  [AtomType.ReactGridCol]: connectCraftJs(
    elementTypeMap[AtomType.ReactGridCol],
  ),
}
