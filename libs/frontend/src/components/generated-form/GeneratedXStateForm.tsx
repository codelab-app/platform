import React, { useState } from 'react'
import { EventObject, Sender } from 'xstate'
import GeneratedForm, { FormEvent, FormProps } from './GeneratedForm'

export type GeneratedXStateFormProps<
  T extends object,
  TEvent extends EventObject
> = Omit<FormProps<T>, 'onSubmit'> & {
  send: Sender<TEvent>
  createSubmitEvent: (submitEvent: FormEvent<T>) => TEvent
  initialState?: T
}

/**
 * {@see GeneratedForm} wrapper with XState integration
 */
const GeneratedXStateForm = <T extends object, TEvent extends EventObject>({
  send,
  createSubmitEvent,
  initialState,
  formData,
  onChange,
  ...props
}: GeneratedXStateFormProps<T, TEvent>) => {
  const onSubmit = (e: FormEvent<T>) => {
    send(createSubmitEvent(e))
  }
  // The state is needed, because the rjsf doesn't keep any state. Every time this re-renders, the input values get lost
  // Use this as a backup state in case we don't provide one in the props
  const [stateFormData, setStateFormData] = useState<T | undefined>(
    initialState,
  )

  return (
    <GeneratedForm<T>
      formData={formData || stateFormData}
      onChange={(e) => {
        if (onChange) onChange(e)
        else setStateFormData(e.data)
      }}
      onSubmit={onSubmit}
      {...props}
    />
  )
}

export default GeneratedXStateForm
