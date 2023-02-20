export const regeneratePages = (pages: Array<string>, domain: string) => {
  return fetch(`https://${domain}/api/regenerate?pages=${pages.join(',')}`)
}
