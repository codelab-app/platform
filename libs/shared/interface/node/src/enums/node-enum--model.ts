/**
 * These enum node types are related to Mongoose
 */
export enum NodeTypeModelEnum {
  /**
   * Mongoose Model
   */
  Model = 'Model',
  /**
   * Mongoose Schema
   */
  Schema = 'Schema',
}

export type NodeTypeModelLiteral = keyof typeof NodeTypeModelEnum
