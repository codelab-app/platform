import portfinder from 'portfinder'

export const isPortOpen = async (port: number) => {
  const nextAvailablePort = await portfinder.getPortPromise({ port })

  return nextAvailablePort === port
}
