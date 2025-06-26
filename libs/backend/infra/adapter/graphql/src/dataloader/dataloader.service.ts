import type { IDataLoaders } from './dataloader.interface'
import type { TypeFragment } from '@codelab/shared-infra-gqlgen'

import { ElementDependantTypesService } from '@codelab/backend-domain-element'
import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly elementDependantTypesService: ElementDependantTypesService,
  ) {}

  getLoaders(): IDataLoaders {
    return {
      elementDependantTypesLoader: this.createElementDependantTypesLoader(),
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
        // Enable caching for the duration of the request
        cache: true,
        // Batch scheduling function (default uses process.nextTick)
        batchScheduleFn: (callback) => process.nextTick(callback),
      },
    )
  }

}