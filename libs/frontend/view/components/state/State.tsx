/* eslint-disable @typescript-eslint/no-explicit-any */
import isFunction from 'lodash/isFunction'
import React from 'react'
import { useRecoilState } from 'recoil'
import { stateAtomFamily } from './stateAtomFamily'
import type { StateProps } from './StateProps'

// https://stackoverflow.com/questions/11547672/how-to-stringify-event-object
const eventSafeStringify = (e: any) => {
  const obj: Record<string, unknown> = {}

  for (const k in e) {
    obj[k] = e[k]
  }

  return JSON.stringify(
    obj,
    (k, v) => {
      if (v instanceof Node) {
        return 'Node'
      }

      if (v instanceof Window) {
        return 'Window'
      }

      return v
    },
    ' ',
  )
}

/**
 * @deprecated Saving it for an example of how to integrate custom components
 */
export const State = ({
  eventKey,
  propKey,
  identifier,
  setterLambda,
  children,
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
    childProps[eventKey] = (e: unknown) => {
      // Call the lambda if we have one
      if (setterLambda) {
        executeLambda({
          variables: {
            input: {
              lambdaId: setterLambda,
              payload: eventSafeStringify({ event: e, previousState: state }),
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
        setState(e)
      }

      // Pass the event up, so that we can nest State elements
      if (props[eventKey] && isFunction(props[eventKey])) {
        props[eventKey](e)
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
