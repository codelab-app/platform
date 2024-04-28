/* eslint-disable @typescript-eslint/no-explicit-any */
import isFunction from 'lodash/isFunction'
import React from 'react'
import { useRecoilState } from 'recoil'
import { stateAtomFamily } from './state-atom-family'
import type { StateProps } from './StateProps'

// https://stackoverflow.com/questions/11547672/how-to-stringify-event-object
const eventSafeStringify = (event: any) => {
  const obj: Record<string, unknown> = {}

  for (const key in event) {
    obj[key] = event[key]
  }

  return JSON.stringify(
    obj,
    (key, value) => {
      if (value instanceof Node) {
        return 'Node'
      }

      if (value instanceof Window) {
        return 'Window'
      }

      return value
    },
    ' ',
  )
}

/**
 * @deprecated Saving it for an example of how to integrate custom components
 */
export const State = ({
  children,
  eventKey,
  identifier,
  propKey,
  setterLambda,
  ...props
}: React.PropsWithChildren<StateProps> & Record<string, any>) => {
  const [state, setState] = useRecoilState(stateAtomFamily(identifier))
  const executeLambda = (args: unknown) => Promise.resolve()

  const childProps: Record<string, unknown> = {
    // Pass all props down to the children, so that we can stack State elements
    ...props,
  }

  if (propKey) {
    childProps[propKey] = state
  }

  if (eventKey) {
    childProps[eventKey] = (error: unknown) => {
      // Call the lambda if we have one
      if (setterLambda) {
        executeLambda({
          variables: {
            input: {
              lambdaId: setterLambda,
              payload: eventSafeStringify({
                event: error,
                previousState: state,
              }),
            },
          },
        })
          // .then((r: unknown) => {
          //   const payload = r.data?.executeLambda?.payload
          //
          //   if (payload !== undefined) {
          //     try {
          //       const newState = JSON.parse(payload)
          //       setState(newState)
          //     } catch (err) {
          //       console.error('Error while updating state ', err)
          //     }
          //   }
          // })
          .catch((err: unknown) => console.error(err))
      } else {
        // If not - directly set the state
        setState(error)
      }

      // Pass the event up, so that we can nest State elements
      if (props[eventKey] && isFunction(props[eventKey])) {
        props[eventKey](error)
      }
    }
  }

  return (
    <>
      {React.Children.map(children, (child: any) =>
        child ? React.cloneElement(child, childProps) : null,
      )}
    </>
  )
}
