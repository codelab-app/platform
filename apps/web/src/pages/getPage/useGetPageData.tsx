import { useGetPageQuery } from '@codelab/generated'

export interface GetPageDataProps {
  pageId: string
}

export const useGetPageData = ({ pageId }: GetPageDataProps) => {
  const { data } = useGetPageQuery({
    variables: {
      input: {
        pageId,
      },
    },
  })

  const layoutGraph = data?.getPage.graphs.filter(
    (graph) => graph.type === 'Layout',
  )?.[0]

  return {
    layoutGraph,
    page: data?.getPage,
  }
}
