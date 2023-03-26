import type { IElementTree, IPropData } from '@codelab/frontend/abstract/core'
import { createContext, useContext } from 'react'

export interface FormContextValue {
  allowExpressions?: boolean
  autocomplete?: IPropData
  elementTree?: IElementTree
}

const FormContext = createContext<FormContextValue>({})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
