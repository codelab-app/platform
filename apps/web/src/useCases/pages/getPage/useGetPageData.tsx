import { PropsWithIds } from '@codelab/frontend'
import { useGetPageQuery } from '@codelab/generated'

export const usePage = ({ pageId }: PropsWithIds<'pageId'>) => {
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
