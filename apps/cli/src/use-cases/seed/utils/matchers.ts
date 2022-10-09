const arrowFnReturnReactNode = /^\(.+\).+=>.+ReactNode$/
const es5FnReturnReactNode = /^function(.+): ReactNode$/
/**
 * These are used to match for types we want to ignore for union types
 */
const arrayTypeRegex = /\[.+\]|<.+>/
const functionTypeRegex = /function|=>/

export const unionTypeRegex = /(function|=>|<|[?.;]|[[]])/

export const skippedTypeRegex = new RegExp(
  `/${arrayTypeRegex}|${functionTypeRegex}/`,
)

export const isPrimitiveTypesRegex = /(boolean|number|string|integer)/

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
export const isInterfaceTypeRegex = /^\{.+}$/

export const reactNodeTypeRegex = /^ReactNode$/

export const renderPropsRegexes = [arrowFnReturnReactNode, es5FnReturnReactNode]
