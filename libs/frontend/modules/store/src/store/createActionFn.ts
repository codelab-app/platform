import { IActionKind, IAnyAction } from '@codelab/shared/abstract/core'
import { set } from 'lodash'

/**
 *
 * @param action action
 * @param context global state
 */
export const createActionFn = (action: IAnyAction, context: any) => {
  switch (action.type) {
    case IActionKind.CustomAction:
      // eslint-disable-next-line no-new-func
      return new Function(action.code).bind(context)

    case IActionKind.ResourceAction:
      return (...args: Array<any>) =>
        action
          .run()
          .then((data) => {
            set(context, `${action.name}.response`, data)

            if (action.successAction.current) {
              return createActionFn(
                action.successAction.current,
                context,
              )(...args)
            }

            return () => null
          })
          .catch((error) => {
            set(context, `${action.name}.error`, error)

            if (action.errorAction.current) {
              return createActionFn(
                action.errorAction.current,
                context,
              )(...args)
            }

            return () => null
          })

    case IActionKind.PipelineAction:
      return (...args: Array<any>) => {
        action.actionsSorted.map(async (a) => {
          const result = createActionFn(a, context)(...args)

          return result instanceof Promise ? await result : result
        })
      }
  }
}
