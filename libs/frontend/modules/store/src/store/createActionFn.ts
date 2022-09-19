import { IActionKind, IAnyAction } from '@codelab/shared/abstract/core'
import { set } from 'lodash'

/**
 *
 * @param action action
 * @param context global state
 */
export const createActionFn = (action: IAnyAction, context: any) => {
  switch (action.type) {
    case IActionKind.CodeAction:
      // eslint-disable-next-line no-eval
      return eval(`(${action.code})`).bind(context)

    case IActionKind.ApiAction:
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
  }
}
