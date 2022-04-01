const TEMPLATE_START = '{{'
const TEMPLATE_END = '}}'

export const hasTemplate = (str: string) => {
  return str.startsWith(TEMPLATE_START) && str.endsWith(TEMPLATE_END)
}

export const getTemplateContent = (str: string) => {
  if (!hasTemplate(str)) {
    return undefined
  }

  return str
    .substring(TEMPLATE_START.length, str.length - TEMPLATE_END.length)
    .trim()
}

export const getTemplateFn = (str: string) => {
  const templateContent = getTemplateContent(str)

  if (!templateContent) {
    return undefined
  }

  // eslint-disable-next-line no-new-func
  return new Function('root', `return ${templateContent}`)
}
