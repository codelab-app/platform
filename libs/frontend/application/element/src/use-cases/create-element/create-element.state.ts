import type {
  CreateElementData,
  CreateElementProperties,
  IFormService,
} from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateElementForm = (): IFormService<
  CreateElementData,
  CreateElementProperties
> =>
  useFormState<CreateElementData, CreateElementProperties>(
    MODEL_ACTION.CreateElement.key,
    (data) => {
      return {
        parentElement: data?.elementTree
          ? data.selectedElement &&
            data.elementTree.current.elements.includes(
              data.selectedElement.current,
            )
            ? data.selectedElement.current
            : data.elementTree.current.rootElement.current
          : undefined,
      }
    },
  )
