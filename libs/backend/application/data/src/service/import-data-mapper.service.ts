import type {
  IApiImport,
  IAppAggregateExport,
  IAppAggregateImport,
  IComponentAggregateExport,
  IComponentAggregateImport,
} from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Injectable, Scope } from '@nestjs/common'

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ImportDataMapperService {
  constructor(private authService: AuthDomainService) {}

  getAppImportData(appExport: IAppAggregateExport) {
    const owner = this.authService.currentUser
    const { app, domains } = appExport

    const pages: IAppAggregateImport['pages'] = appExport.pages.map((page) => ({
      ...page,
      owner,
      store: {
        actions: page.store.actions,
        api: {
          ...page.store.api,
          owner,
          types: page.store.api.types.map((type) => ({
            ...type,
            owner,
          })),
        },
        store: page.store.store,
      },
    }))

    const components = appExport.components.map((component) => {
      return this.getComponentImportData(component)
    })

    const resources = appExport.resources.map((resource) => ({
      ...resource,
      owner,
    }))

    const appImport: IAppAggregateImport = {
      app,
      components,
      domains,
      pages,
      resources,
    }

    return appImport
  }

  getComponentImportData(componentExport: IComponentAggregateExport) {
    const owner = this.authService.currentUser
    const { api, component, elements, store } = componentExport

    const apiImport: IApiImport = {
      ...api,
      owner,
      types: api.types.map((type) => ({ ...type, owner })),
    }

    const componentImport: IComponentAggregateImport = {
      api: apiImport,
      component: { ...component, owner },
      elements,
      store: {
        actions: store.actions,
        api: {
          ...store.api,
          owner,
          types: store.api.types.map((type) => ({
            ...type,
            owner,
          })),
        },
        store: store.store,
      },
    }

    return componentImport
  }
}
