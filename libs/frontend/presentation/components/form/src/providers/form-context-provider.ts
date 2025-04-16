'use client'

import type { IRuntimeModel } from '@codelab/frontend-abstract-application'
import type { IElementTree } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'

import { createContext, useContext } from 'react'

export interface FormContextValue {
  elementTree: Maybe<IElementTree>
  selectedNode: Maybe<IRuntimeModel>
}

const FormContext = createContext<FormContextValue>({
  elementTree: undefined,
  selectedNode: undefined,
})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => {
  return useContext(FormContext)
}
