export const regenerateAppPages = (appId: string) => {
  return fetch(`api/regenerate?appId=${appId}`)
}

export const regeneratePages = (pageId: string) => {
  return fetch(`api/regenerate?pageId=${pageId}`)
}

export const regenerateAllPages = () => {
  return fetch(`api/regenerate`)
}
