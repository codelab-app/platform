import React from 'react'

/** This object is used to control form submission imperatively */
export interface SubmitController {
  submit: () => void
}

export const setSubmitControllerRef = (
  submitBtnRef:
    | React.MutableRefObject<SubmitController | undefined>
    | undefined,
) => (sbtn: HTMLButtonElement | null) => {
  if (!submitBtnRef) return

  // eslint-disable-next-line no-param-reassign
  submitBtnRef.current = sbtn
    ? {
        submit: () => sbtn.click(),
      }
    : undefined
}
