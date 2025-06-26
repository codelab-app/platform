# DataLoader Usage Guide

## Overview
DataLoader is integrated into the GraphQL context to solve the N+1 query problem by batching and caching database/API requests within a single GraphQL request.

## How to Use DataLoader in Resolvers

### 1. Add a new loader to DataLoaderService

Edit `dataloader.service.ts` to add your specific loader:

```typescript
@Injectable()
export class DataLoaderService {
  constructor(
    // Inject your services here
    private readonly userService: UserService,
    private readonly pageService: PageService,
  ) {}

  getLoaders(): IDataLoaders {
    const loaders: IDataLoaders = {
      userLoader: this.createUserLoader(),
      pageLoader: this.createPageLoader(),
    }
    
    return loaders
  }

  private createUserLoader(): DataLoader<string, User> {
    return this.createBatchLoader(async (userIds: ReadonlyArray<string>) => {
      const users = await this.userService.findByIds(userIds as string[])
      const userMap = new Map(users.map(user => [user.id, user]))
      return userIds.map(id => userMap.get(id) || new Error(`User ${id} not found`))
    })
  }

  private createPageLoader(): DataLoader<string, Page> {
    return this.createBatchLoader(async (pageIds: ReadonlyArray<string>) => {
      const pages = await this.pageService.findByIds(pageIds as string[])
      const pageMap = new Map(pages.map(page => [page.id, page]))
      return pageIds.map(id => pageMap.get(id) || new Error(`Page ${id} not found`))
    })
  }
}
```

### 2. Use the loader in your resolver

```typescript
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import type { GqlContext } from '@codelab/backend-abstract-types'

@Resolver(() => Element)
export class ElementResolver {
  @ResolveField('owner', () => User)
  async owner(
    @Parent() element: Element,
    @Context() context: GqlContext,
  ): Promise<User> {
    // Use the dataloader instead of direct service call
    return context.loaders.userLoader.load(element.ownerId)
  }

  @ResolveField('page', () => Page)
  async page(
    @Parent() element: Element,
    @Context() context: GqlContext,
  ): Promise<Page> {
    // This will batch all page requests in the current GraphQL query
    return context.loaders.pageLoader.load(element.pageId)
  }
}
```

### 3. Update the DataLoader interface

Add your new loader types to `dataloader.interface.ts`:

```typescript
import type DataLoader from 'dataloader'
import type { User, Page } from '@your-domain-types'

export interface IDataLoaders {
  userLoader: DataLoader<string, User>
  pageLoader: DataLoader<string, Page>
  // Add more loaders as needed
}
```

## Benefits

1. **Batching**: Multiple requests for the same resource type are combined into a single database query
2. **Caching**: Results are cached per-request, preventing duplicate fetches within the same GraphQL request
3. **Performance**: Significantly reduces database round trips in nested GraphQL queries

## Important Notes

- DataLoader instances are created per-request to ensure proper isolation
- The batch function must return results in the same order as the input keys
- Use `Error` objects for missing entities to maintain array order
- DataLoader only caches within a single request (not across requests)