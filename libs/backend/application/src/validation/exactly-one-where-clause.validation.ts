import { get, has } from 'lodash'

/**
 *
 * Assumes request structure follows `where.input.where.param`
 *
 * @param keys An array required keys, use lodash dot format
 * @param request Request object
 *
 * @returns Only return if validation passes, otherwise throw
 */
export const exactlyOneWhereClause = <
  TRequest extends { input: { where: Record<string, any> } },
>(
  request: TRequest,
  keys: Array<keyof TRequest['input']['where']>,
) => {
  if (!has(request, 'input')) {
    throw new Error('Must provide a request, missing "input" key')
  }

  if (!has(request, 'input.where')) {
    throw new Error('Must provide a where clause, missing "input.where" key')
  }

  const PARAMETER_COUNT = 0

  const parameterCount = keys.reduce((_parameterCount, key) => {
    const parameter = get(request, `input.where.${key}`)

    return parameter ? _parameterCount + 1 : _parameterCount
  }, PARAMETER_COUNT)

  if (parameterCount < 1) {
    throw new Error('At least 1 where clause must be provided must be ')
  }

  if (parameterCount > 1) {
    throw new Error('At least 1 where clause must be provided must be ')
  }

  return true
}
