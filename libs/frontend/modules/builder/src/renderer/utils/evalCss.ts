export const evalCss = (props: Record<string, any>, cssString?: string) => {
  if (!cssString) {
    return ''
  }

  try {
    return eval(`\`${cssString}\``)
  } catch (e) {
    console.warn(`Couldn't parse css`, cssString, e)
  }

  return ''
}
