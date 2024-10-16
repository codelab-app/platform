import type {
  CreateElementData,
  CreateElementProperties,
  IFormService,
} from '@codelab/frontend/abstract/application'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useFormState } from '@codelab/frontend-application-shared-store/ui'

export const useCreateElementForm = (): IFormService<
  CreateElementData,
  CreateElementData & CreateElementProperties
> =>
  useFormState<CreateElementData, CreateElementData & CreateElementProperties>(
    UiKey.ElementFormCreate,
    (data) => {
      return {
        ...data,
        elementOptions: data.elementOptions,
        parentElement:
          data.selectedElement &&
          data.elementTree.elements.includes(data.selectedElement)
            ? data.selectedElement
            : data.elementTree.rootElement.current,
      }
    },
  )
