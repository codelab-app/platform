import type {
  ElementFragment,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'

import { ElementDependantTypesService } from '@codelab/backend-domain-element'
import { PageElementsService } from '@codelab/backend-domain-page'
import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

import type { IDataLoaders } from './dataloader.interface'

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly elementDependantTypesService: ElementDependantTypesService,
    private readonly pageElementsService: PageElementsService,
  ) {}

  getLoaders(): IDataLoaders {
    return {
      elementDependantTypesLoader: this.createElementDependantTypesLoader(),
      pageElementsLoader: this.createPageElementsLoader(),
    }
  }

  private createElementDependantTypesLoader(): DataLoader<
    string,
    Array<TypeFragment>
  > {
    return new DataLoader<string, Array<TypeFragment>>(
      async (elementIds: ReadonlyArray<string>) => {
        try {
          // Use the new batch method that fetches all data in a single query
          const resultMap =
            await this.elementDependantTypesService.getDependantTypesBatch(
              elementIds,
            )

          // DataLoader expects results in the same order as input keys
          return elementIds.map((id) => resultMap.get(id) || [])
        } catch (error) {
          console.error('Error fetching dependant types batch:', error)

          // Return empty arrays for all elements on error
          return elementIds.map(() => [])
        }
      },
      {
        // Batch scheduling function (default uses process.nextTick)
        batchScheduleFn: (callback) => process.nextTick(callback),

        // Enable caching for the duration of the request
        cache: true,
      },
    )
  }

  private createPageElementsLoader(): DataLoader<
    string,
    Array<ElementFragment>
  > {
    return new DataLoader<string, Array<ElementFragment>>(
      async (pageIds: ReadonlyArray<string>) => {
        try {
          // Use the new batch method that fetches all elements in a single query
          const resultMap = await this.pageElementsService.getElementsBatch(
            pageIds,
          )

          // DataLoader expects results in the same order as input keys
          return pageIds.map((id) => resultMap.get(id) || [])
        } catch (error) {
          console.error('Error fetching page elements batch:', error)

          // Return empty arrays for all pages on error
          return pageIds.map(() => [])
        }
      },
      {
        // Batch scheduling function (default uses process.nextTick)
        batchScheduleFn: (callback) => process.nextTick(callback),

        // Enable caching for the duration of the request
        cache: true,
      },
    )
  }
}
