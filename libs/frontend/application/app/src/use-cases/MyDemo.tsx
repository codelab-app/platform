import { useApplicationStore } from '@codelab/frontend/infra/mobx'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { useBuilderService } from '@codelab/frontend-application-builder/services'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { useElementService } from '@codelab/frontend-application-element/services'

export const Demo = () => {
  const builderService = useBuilderService()
  const atomService = useAtomService()
  const componentService = useComponentService()
  const elementService = useElementService()
  const { rendererService } = useApplicationStore()
}
