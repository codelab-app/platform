import { Entity } from '@codelab/shared/abstract/types'

/**
 * This is the port that our hooks needs to implement
 */
export interface Lambda extends Entity {
  // ownerId: Auth0UserId
  name: string
  body: string
}
