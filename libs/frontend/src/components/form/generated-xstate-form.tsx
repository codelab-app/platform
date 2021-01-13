import React, { useState } from 'react'
import { EventObject, Sender } from 'xstate'
import GeneratedForm, { FormEvent, FormProps } from './generated-form'

export interface GeneratedXStateFormProps<
  T extends object,
  TEvent extends EventObject
> extends Omit<FormProps<T>, 'onSubmit' | 'onChange' | 'formData'> {
  send: Sender<TEvent>
  createEvent: (submitEvent: FormEvent<T>) => TEvent
  initialState?: T
}

/**
 * {@see GeneratedForm} wrapper with XState integration
 */
const GeneratedXStateForm = <T extends object, TEvent extends EventObject>({
  send,
  createEvent,
  initialState,
  ...props
}: GeneratedXStateFormProps<T, TEvent>) => {
  const onSubmit = (e: FormEvent<T>) => {
    send(createEvent(e))
  }
  // TODO store state in xstate
  // The state is needed, because the rjsf doesn't keep any state. Every time this re-renders, the input values get lost
  const [formData, setFormData] = useState<T | undefined>(initialState)

  return (
    <GeneratedForm<T>
      formData={formData}
      onChange={({ data }) => setFormData(data)}
      onSubmit={onSubmit}
      {...props}
    />
  )
}

export default GeneratedXStateForm
