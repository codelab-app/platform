import React from 'react'

/** This object is used to control form submission imperatively */
export interface SubmitController {
  submit: () => void
}

export const setSubmitControllerRef = (
  submitButtonRef:
    | React.MutableRefObject<SubmitController | undefined>
    | undefined,
) => (submitButton: HTMLButtonElement | null) => {
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
