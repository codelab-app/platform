export const makeTagConnectData = (ids: Array<string>) => {
  return ids.map((id) => {
    return {
      where: {
        node: {
          id,
        },
      },
    }
  })
}
