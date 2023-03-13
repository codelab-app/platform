import type {
  IElementTree,
  IPropData,
  IStore,
} from '@codelab/frontend/abstract/core'
import { createContext, useContext } from 'react'

export interface FormContextValue {
  allowExpressions?: boolean
  appStore?: IStore
  autocomplete?: IPropData
  elementTree?: IElementTree
}

const FormContext = createContext<FormContextValue>({})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
