import { ElementTree } from '@codelab/shared/core'
import React, { useContext } from 'react'

export interface SelectElementContext {
  tree: ElementTree
}

const SelectElementContext = React.createContext<SelectElementContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
})

export const SelectElementProvider = ({
  tree,
  children,
}: React.PropsWithChildren<{ tree: ElementTree }>) => (
  <SelectElementContext.Provider value={{ tree }}>
    {children}
  </SelectElementContext.Provider>
)

export const useSelectElementContext = () => {
  return useContext(SelectElementContext)
}
