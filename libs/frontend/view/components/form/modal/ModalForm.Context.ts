import { SubmitController } from '@codelab/frontend/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import { createContext, MutableRefObject } from 'react'
import { SetIsLoading } from '../components/utils'

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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  submitRef: null!,
}

export const ModalFormContext = createContext(initialContext)
