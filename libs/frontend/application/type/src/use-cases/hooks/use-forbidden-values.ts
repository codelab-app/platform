import type { IFieldModel } from '@codelab/frontend-abstract-domain'

import { useApplicationStore } from '@codelab/frontend-infra-mobx-context'

export const useForbiddenValues = (updatedField?: IFieldModel) => {
  const { rendererService } = useApplicationStore()
  const renderer = rendererService.activeRenderer?.current
  const runtimeNode = renderer?.runtimeContainerNode

  return Object.keys(runtimeNode?.runtimeStore.state ?? {}).filter(
    (fieldName) => fieldName !== updatedField?.key,
  )
}
