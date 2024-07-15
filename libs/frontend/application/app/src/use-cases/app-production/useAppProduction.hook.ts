import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IAppProductionDto,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { v4 } from 'uuid'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppProduction = (appProductionData: IAppProductionDto) => {
  const { rendererService } = useStore()
  const domainStore = useDomainStore()
  const { appName, pageName } = appProductionData

  console.debug('useAppProduction', { appName, pageName })

  const app = hydrateAppProductionData(appProductionData, domainStore)
  const page = app.pageByName(pageName)

  const renderer = rendererService.hydrate({
    containerNode: page,
    id: page.id,
    rendererType: RendererType.Production,
  })

  console.debug(renderer)

  rendererService.setActiveRenderer(rendererRef(renderer.id))
  void renderer.expressionTransformer.init()

  return {
    app,
    elementTree: page,
    page,
    renderer,
  }
}

const hydrateAppProductionData = (
  data: IAppProductionDto,
  domainStore: IDomainStore,
) => {
  const entity = { id: v4() }

  // use a dummy api to avoid typing issues
  data.atoms.forEach((atom) =>
    domainStore.atomDomainService.hydrate({ ...atom, api: entity }),
  )

  data.components.forEach((component) =>
    // use a dummy api to avoid typing issues
    domainStore.componentDomainService.hydrate({ ...component, api: entity }),
  )

  data.elements.forEach((element) =>
    domainStore.elementDomainService.hydrate(element),
  )

  data.pages.forEach((page) => domainStore.pageDomainService.hydrate(page))

  // data.props.forEach((prop) => domainStore.propService.add(prop))

  data.stores.forEach((store) => domainStore.storeDomainService.hydrate(store))

  data.actions.forEach((action) =>
    domainStore.actionDomainService.hydrate(action),
  )

  return domainStore.appDomainService.hydrate(data.app)
}
