export const evaluateRenderIfPropKey = (
  renderIfKey: string | undefined | null,
  props: Record<string, any> | undefined | null,
) => {
  if (!props) {
    return false
  }

  if (!renderIfKey) {
    return true
  }

  const value = props[renderIfKey]

  if (typeof value === 'string') {
    // Evaluate 'false' as false
    if (value.trim().toLowerCase() === 'false') {
      return false
    }
  }

  return !!value
}
