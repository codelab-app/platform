import { IPropData, IStore } from '@codelab/frontend/abstract/core'
import { createContext, useContext } from 'react'

export interface FormContextValue {
  autocomplete?: IPropData
  appStore?: IStore
  allowExpressions?: boolean
}

const FormContext = createContext<FormContextValue>({})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
