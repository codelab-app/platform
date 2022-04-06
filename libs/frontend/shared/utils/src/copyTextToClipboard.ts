export const copyTextToClipboard = async (text: string) => {
  // eslint-disable-next-line no-restricted-globals
  await navigator.clipboard.writeText(text)
}
