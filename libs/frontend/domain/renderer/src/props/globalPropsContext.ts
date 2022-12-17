import type { IPropDataByElementId } from '@codelab/frontend/abstract/core'
import type { ReactElement } from 'react'
import React, { createContext } from 'react'

/**
 * Keep a context for props within the Renderer so props can be accessed by descendants (without modifying props in other elements within the tree)
 *
 * Previously descendant bound props
 */
export const GlobalPropsContext = createContext<IPropDataByElementId>({})

export const withGlobalPropsProvider =
  (extraProps: IPropDataByElementId) => (children: ReactElement) =>
    React.createElement(
      GlobalPropsContext.Provider,
      { value: extraProps },
      children,
    )
