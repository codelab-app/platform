import { SubmitController } from '@codelab/frontend/abstract/props'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

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
