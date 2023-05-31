import type {
  IElementTree,
  IPageNodeRef,
} from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { createContext, useContext } from 'react'

export interface FormContextValue {
  elementTree: Maybe<IElementTree>
  selectedNode: Maybe<IPageNodeRef>
}

const FormContext = createContext<FormContextValue>({
  elementTree: undefined,
  selectedNode: undefined,
})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
