/**
 * These enum node types are related to Mongoose
 */
export enum ModelType {
  /**
   * Mongoose Model
   */
  Model = 'Model',
  /**
   * Mongoose Schema
   */
  Schema = 'Schema',
}

export type ModelTypeLiteral = keyof typeof ModelType
