import { IPropDataByElementId } from '@codelab/shared/abstract/core'
import React, { createContext, ReactElement } from 'react'

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
