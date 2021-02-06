import { GetLayoutGql, useSetLayoutMutation } from '@codelab/generated'

export const useLayout = () => {
  const [setLayout] = useSetLayoutMutation({
    refetchQueries: [
      {
        query: GetLayoutGql,
      },
    ],
  })

  return {
    setLayout,
  }
}
