export const arrowFnReturnReactNode = /^\(.+\).+=>.+ReactNode$/
export const es5FnReturnReactNode = /^function(.+): ReactNode$/

/**
 * These are used to match for types we want to ignore for union types
 */
const arrayTypeRegex = /(\[.+\]|<.+>)/

/**
 * Use non greedy for () matching
 *
 * (^function\(.*?\)) - function()
 * ((\(.*?\)) => [any|boolean]) - () => any
 */

export const functionTypeRegex =
  // /(^function\(.*?\))|((\(.*?\)) => [any|boolean|void])/
  /(^function\(.*?\))|((\(.*?\)) => \w)/

// export const unionTypeRegex = /(function|=>|<|[?.;]|[[]])/
export const unionTypeRegex = /\|/

// export const skippedTypeRegex = new RegExp(
//   `/${arrayTypeRegex}|${functionTypeRegex}/`,
// )

export const primitiveTypesRegex = /^(boolean|number|string|integer)$/

export const containsInterfaceTypeRegex = /\{.+\}/

/**
 * {left?: ReactNode, right?: ReactNode}
 * ->
 * left?: ReactNode, right?: ReactNode
 *
 * (?:\{) - Non-capturing {
 * (.*)   - Match everything
 * (?:\}) - Non-capturing }
 */
export const stripBracketsRegex = /(?:\{)(.*)(?:\})/

/* *
 * Used for single items
 */
export const interfaceTypeRegex = /^\{.+}$/

/**
 * : ReactNode|HTMLElement
 * => ReactNode|HTMLElement
 * ReactNode
 */
export const reactNodeTypeRegex = /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/

export const renderPropRegexes = [arrowFnReturnReactNode, es5FnReturnReactNode]
