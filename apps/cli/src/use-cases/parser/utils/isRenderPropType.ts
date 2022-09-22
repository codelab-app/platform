const findArrowFnReturnReactNode = /^\(.+\).+=>.+ReactNode$/
const findES5FnReturnReactNode = /^function(.+): ReactNode$/

export const isReactNodeTypeRegex = /^ReactNode$/

const renderPropsRegexes = [
  findArrowFnReturnReactNode,
  findES5FnReturnReactNode,
]

// ReactNode is also render props
export const isRenderPropType = (type: string) => {
  return renderPropsRegexes.some((regex) => regex.test(type))
}
