import React from 'react'
import { SubmitController } from './generated-form'

export const setSubmitControllerRef = (
  submitBtnRef:
    | React.MutableRefObject<SubmitController | undefined>
    | undefined,
) => (sbtn: HTMLButtonElement | null) => {
  // Set the submit controller ref, so that we don't have to expose the whole button ref
  if (!submitBtnRef) return

  // eslint-disable-next-line no-param-reassign
  submitBtnRef.current = sbtn
    ? {
        submit: sbtn.click,
      }
    : undefined
}
