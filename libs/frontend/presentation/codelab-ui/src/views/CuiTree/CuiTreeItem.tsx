import type { MouseEvent, ReactNode } from 'react'

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import classNames from 'classnames'

import type { Variant } from '../../abstract'

import { variantColors } from '../../abstract'
import { CuiHighlightedText } from '../../components'

interface CuiTreeItemProps {
  highlight?: {
    primaryTitle?: string
    secondaryTitle?: string
  }
  icon?: ReactNode
  primaryTitle?: string
  secondaryTitle?: string
  selectedKey?: number | string
  tag?: ReactNode
  toolbar?: ReactNode
  variant?: Variant
  onClick?(e: MouseEvent<HTMLDivElement>): void
}

export const CuiTreeItem = ({
  highlight,
  icon,
  onClick,
  primaryTitle,
  secondaryTitle,
  selectedKey,
  tag,
  toolbar,
  variant,
}: CuiTreeItemProps) => {
  return (
    <div
      className={classNames(
        'h-full flex flex-row justify-between overflow-hidden',
        CuiTestId.cuiTreeItem(),
        variantColors[variant ?? 'primary'],
      )}
      data-selected-key={selectedKey}
      data-testid={CuiTestId.cuiTreeItem()}
      onClick={onClick}
    >
      <div className="flex h-full flex-row justify-start overflow-hidden">
        <div className="shrink-0">{icon}</div>
        <div
          className={`
            flex h-full min-w-1/3
            flex-row justify-start overflow-hidden
            pl-2
          `}
        >
          <p className="m-0 truncate">
            <span
              className="font-semibold"
              data-testid={CuiTestId.cuiTreeItemPrimaryTitle(
                primaryTitle || '',
              )}
            >
              <CuiHighlightedText
                highlight={highlight?.primaryTitle}
                text={primaryTitle}
              />
            </span>
            {secondaryTitle && (
              <span
                className="pl-2 font-normal"
                data-testid={CuiTestId.cuiTreeItemSecondaryTitle(
                  secondaryTitle || '',
                )}
              >
                <CuiHighlightedText
                  highlight={highlight?.secondaryTitle}
                  text={secondaryTitle}
                />
              </span>
            )}
          </p>
        </div>
        <div className="shrink-0 pl-2">{tag}</div>
      </div>
      <div className="shrink-0 text-black">{toolbar}</div>
    </div>
  )
}
