import type { SubmitController } from '@codelab/frontend-abstract-types'
import type { Maybe, Nullable } from '@codelab/shared-abstract-types'

export const setSubmitControllerRef =
  (submitButtonRef: Maybe<React.MutableRefObject<Maybe<SubmitController>>>) =>
  (submitButton: Nullable<HTMLButtonElement>) => {
    if (!submitButtonRef) {
      return
    }

    submitButtonRef.current = submitButton
      ? {
          submit: () => {
            submitButton.click()
          },
        }
      : undefined
  }
