import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { Varient } from '../../abstract'
import { varientColors } from '../../abstract'

interface CuiTreeItemProps {
  icon?: ReactNode
  primaryTitle?: string
  secondaryTitle?: string
  tag?: ReactNode
  toolbar?: ReactNode
  varient?: Varient
}

export const CuiTreeItem = ({
  icon,
  primaryTitle,
  secondaryTitle,
  tag,
  toolbar,
  varient,
}: CuiTreeItemProps) => {
  return (
    <div
      className="codelabui-tree-item"
      css={[
        tw`
      h-full
      flex
      flex-row
      justify-between
      overflow-hidden
    `,
        varientColors[varient ?? 'primary'],
      ]}
      data-cy="codelabui-tree-item"
    >
      <div
        css={tw`
          h-full
          flex
          flex-row
          justify-start
          overflow-hidden
        `}
      >
        <div css={tw`flex-shrink-0`}>{icon}</div>
        <div
          css={tw`
          h-full
          flex
          flex-row
          justify-start
          overflow-hidden
          pl-2
          min-w-1/3
        `}
        >
          <p css={tw`truncate m-0`}>
            <span css={tw`font-semibold`}>{primaryTitle}</span>
            <span css={tw`pl-2 font-normal`}>{secondaryTitle}</span>
          </p>
        </div>
        <div css={tw`flex-shrink-0 pl-2`}>{tag}</div>
      </div>
      <div css={tw`flex-shrink-0 text-black`}>{toolbar}</div>
    </div>
  )
}
