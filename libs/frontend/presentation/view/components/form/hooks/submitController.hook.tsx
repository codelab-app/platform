import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type React from 'react'

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
