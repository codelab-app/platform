import React, { useEffect, useState } from 'react'
import { EventObject, Sender, State } from 'xstate'
import GeneratedForm, { FormEvent, FormProps } from './GeneratedForm'

export type GeneratedXStateFormProps<
  T extends object,
  TEvent extends EventObject
> = Omit<FormProps<T>, 'onSubmit' | 'formData' | 'onChange'> & {
  send: Sender<TEvent>
  createSubmitEvent: (submitEvent: FormEvent<T>) => TEvent
  initialFormData?: T
  xStateOptions?:
    | {
        storeStateInXState: true
        createChangeEvent: (changeEvent: FormEvent<T>) => TEvent
        state: State<any>
        contextKey?: string
      }
    | {
        storeStateInXState: false
        createChangeEvent?: never
        state?: never
        contextKey?: never
      }
}

/**
 * {@see GeneratedForm} wrapper with XState integration, pass xStateOptions to configure how to store the form data in xState
 */
const GeneratedXStateForm = <T extends object, TEvent extends EventObject>({
  send,
  createSubmitEvent,
  initialFormData,
  xStateOptions: {
    contextKey = 'formData',
    createChangeEvent,
    state,
    storeStateInXState,
  } = { storeStateInXState: false },
  ...props
}: GeneratedXStateFormProps<T, TEvent>) => {
  const onSubmit = (e: FormEvent<T>) => {
    send(createSubmitEvent(e))
  }
  // The state is needed, because the rjsf doesn't keep any state. Every time this re-renders, the input values get lost
  // Use this as a backup state in case we don't provide one in the props
  const [localStateFormData, setStateFormData] = useState<T>(
    initialFormData as T,
  )

  let formData = localStateFormData
  let setFormData = ({ data }: FormEvent<T>) => setStateFormData(data)

  if (storeStateInXState && state && createChangeEvent && contextKey) {
    formData = state.context[contextKey]
    setFormData = (e: FormEvent<T>) => send(createChangeEvent(e))
  }

  useEffect(() => {
    // Update the form state with the initial state, in case we're using XState to manage it
    if (initialFormData) setFormData({ data: initialFormData })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GeneratedForm<T>
      formData={formData}
      onChange={setFormData}
      onSubmit={onSubmit}
      {...props}
    />
  )
}

export default GeneratedXStateForm
