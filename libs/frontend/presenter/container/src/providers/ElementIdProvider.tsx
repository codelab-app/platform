import React, { PropsWithChildren, useContext } from 'react'

type IElementIdContext = {
  elementId: string
}

const ElementIdContext = React.createContext<IElementIdContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  elementId: null!,
})

export const ElementIdProvider = ({
  children,
  elementId,
}: PropsWithChildren<{ elementId: string }>) => {
  return (
    <ElementIdContext.Provider
      value={{
        elementId,
      }}
    >
      {children}
    </ElementIdContext.Provider>
  )
}

export const useElementIdContext = () => useContext(ElementIdContext)
