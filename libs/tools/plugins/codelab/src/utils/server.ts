import portfinder from 'portfinder'

export const isPortOpen = async (port: number | undefined) => {
  const nextAvailablePort = await portfinder.getPortPromise({ port })

  return nextAvailablePort === port
}
