import { useAtomService } from '@codelab/frontend-application-atom/services'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'

export const Demo = () => {
  const { builderService } = useApplicationStore()
  const atomService = useAtomService()
  const componentService = useComponentService()
  const elementService = useElementService()
  const { rendererService } = useApplicationStore()
}
