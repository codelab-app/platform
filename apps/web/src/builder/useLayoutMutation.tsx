import {
  GetLayoutGql,
  Layout,
  LayoutPaneVisibility,
  LayoutTab,
  useSetLayoutMutation,
} from '@codelab/generated'

export type UseLayoutMutation = (
  layout?: Layout,
) => {
  toggleTab: (tab: LayoutTab) => void
  setLayout: ReturnType<typeof useSetLayoutMutation>[0]
  setPaneVisibility: (pane: LayoutPaneVisibility) => void
}

export const useLayoutMutation: UseLayoutMutation = (layout?: Layout) => {
  const [setLayout] = useSetLayoutMutation({
    refetchQueries: [
      {
        query: GetLayoutGql,
      },
    ],
  })

  const setPaneVisibility = (pane: LayoutPaneVisibility) =>
    setLayout({
      variables: {
        input: { paneVisibility: pane },
      },
    })

  return {
    setPaneVisibility,
    setLayout,
    toggleTab: (tab: LayoutTab) => {
      if (!layout) {
        throw new Error('Layout is missing')
      }

      console.log('toggleTab to', tab)
      // If same tab we just toggle main pane
      if (layout.tab === tab) {
        return setPaneVisibility(
          layout.paneVisibility === LayoutPaneVisibility.None
            ? LayoutPaneVisibility.Main
            : LayoutPaneVisibility.None,
        )
      }

      // If different tab
      return setLayout({
        variables: {
          input: {
            tab,
            paneVisibility: LayoutPaneVisibility.Main,
          },
        },
      })
    },
  }
}
