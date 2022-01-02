import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

/** This object is used to control form submission imperatively */
export interface SubmitController {
  submit: () => void
}

export const setSubmitControllerRef =
  (submitButtonRef: Maybe<React.MutableRefObject<Maybe<SubmitController>>>) =>
  (submitButton: Nullable<HTMLButtonElement>) => {
    if (!submitButtonRef) {
      return
    }

    // eslint-disable-next-line no-param-reassign
    submitButtonRef.current = submitButton
      ? {
          submit: () => submitButton.click(),
        }
      : undefined
  }
