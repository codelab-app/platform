import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'

/**
 * Testing out using other state management for UI state
 */

export const useCreateAppModal = () => useModalState(MODEL_ACTION.CreateApp.key)

export const useUpdateAppModal = () => useModalState(MODEL_ACTION.UpdateApp.key)

export const useDeleteAppModal = () => useModalState(MODEL_ACTION.DeleteApp.key)

export const useBuildAppModal = () => useModalState(MODEL_ACTION.BuildApp.key)
