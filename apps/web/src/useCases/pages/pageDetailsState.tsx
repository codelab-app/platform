import { atom } from 'recoil'
import { useBuilderLayout } from '../../builder/builderPanelState'

interface PageDetailsState {
  action?: CrudAction
  pageId?: string
  visible?: boolean
}

export type CrudAction = 'create' | 'update'

export const pageDetailsState = atom<PageDetailsState>({
  key: 'pageDetails',
  default: {
    /**
     * Whether to show detail view
     */
    visible: false,
    /**
     * To conditionally render the from in the details view
     */
    action: undefined,
    /**
     * id we're updating
     */
    pageId: undefined,
  },
})

export const useCreatePage = () => {
  const layout = useBuilderLayout()

  const createPage = () => {
    layout.details.toggle(true)
  }

  return {
    createPage,
  }
}
