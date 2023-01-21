import type {
  IElementTree,
  IPropData,
  IStore,
} from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { createContext, useContext } from 'react'

export interface FormContextValue {
  autocomplete?: IPropData
  appStore?: IStore
  allowExpressions?: boolean
  elementTree: Maybe<IElementTree>
}

const FormContext = createContext<FormContextValue>({})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
