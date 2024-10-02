'use client'

import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { MutableRefObject } from 'react'

import { createContext } from 'react'

import type { SetIsLoading } from '../components/utils'

export interface IModalFormContext {
  isLoading: boolean
  setIsLoading: SetIsLoading
  submitRef: Maybe<MutableRefObject<Maybe<SubmitController>>>
}

export const initialContext: IModalFormContext = {
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    throw new Error('ModalFormContext is not initialized')
  },
  submitRef: undefined,
}

export const ModalFormContext = createContext(initialContext)
