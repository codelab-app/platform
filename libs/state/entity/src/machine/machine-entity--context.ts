export type Entity = Record<any, any>

export interface ContextEntity {
  // For creating/editing
  current: Entity
  item: Entity
  list: Array<Entity>
}
