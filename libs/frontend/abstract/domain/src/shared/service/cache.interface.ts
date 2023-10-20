export interface ICacheService<CreateDTO, Entity> {
  /**
   * Allows an existing model to update its cache
   */
  writeCache(data: Partial<CreateDTO>): Entity
}
