export const makeTagConnectData = (ids: Array<string>) =>
  ids.map((id) => ({ where: { node: { id } } }))
