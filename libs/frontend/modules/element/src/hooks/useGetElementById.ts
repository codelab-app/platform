import { useElementGraphContext } from '../providers'

export const useGetElementById = (elementId: string) => {
  const { elementTree } = useElementGraphContext()

  return elementTree.getVertex(elementId)
}
